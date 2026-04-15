// =====================================================
// server/controllers/chat.controller.js — Dify + Fallback
// =====================================================
const { db, nextId } = require('../database/db');
const { getAIResponse }  = require('../services/ai.service');
const { isDifyEnabled, askDify, streamDify } = require('../services/dify.service');

function getSessions(req, res) {
  try {
    const sessions = db.get('chat_sessions')
      .filter({ user_id: req.user.id })
      .orderBy(['updated_at'], ['desc'])
      .take(30)
      .map(s => ({
        ...s,
        message_count: db.get('chat_messages').filter({ session_id: s.id }).size().value()
      }))
      .value();
    return res.json({ success: true, sessions });
  } catch (err) {
    console.error('[getSessions]', err);
    return res.status(500).json({ success: false, message: 'Lỗi máy chủ.' });
  }
}

function createSession(req, res) {
  try {
    const { mode = 'qa' } = req.body;
    const id  = 'sess_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
    const now = new Date().toISOString();
    const session = {
      id, user_id: req.user.id,
      title: 'Cuộc trò chuyện mới',
      mode,
      dify_conversation_id: null,  // Dify's own conversation ID for continuity
      created_at: now, updated_at: now
    };
    db.get('chat_sessions').push(session).write();
    return res.status(201).json({ success: true, session: { ...session, message_count: 0 } });
  } catch (err) {
    console.error('[createSession]', err);
    return res.status(500).json({ success: false, message: 'Lỗi máy chủ.' });
  }
}

function getSession(req, res) {
  try {
    const session = db.get('chat_sessions').find({ id: req.params.id, user_id: req.user.id }).value();
    if (!session) return res.status(404).json({ success: false, message: 'Không tìm thấy phiên chat.' });
    const messages = db.get('chat_messages').filter({ session_id: session.id }).orderBy(['created_at'], ['asc']).value();
    return res.json({ success: true, session, messages });
  } catch (err) {
    console.error('[getSession]', err);
    return res.status(500).json({ success: false, message: 'Lỗi máy chủ.' });
  }
}

/**
 * POST /api/chat/sessions/:id/messages — Blocking response (Dify or fallback)
 */
async function sendMessage(req, res) {
  try {
    const { content, mode = 'qa' } = req.body;
    if (!content?.trim()) return res.status(400).json({ success: false, message: 'Nội dung không được trống.' });

    const session = db.get('chat_sessions').find({ id: req.params.id, user_id: req.user.id }).value();
    if (!session) return res.status(404).json({ success: false, message: 'Không tìm thấy phiên chat.' });

    const now = new Date().toISOString();
    // Save user message
    const userMsg = {
      id: nextId('chat_messages'),
      session_id: session.id,
      role: 'user',
      content: content.trim(),
      created_at: now
    };
    db.get('chat_messages').push(userMsg).write();

    // Update session title from first message
    const msgCount = db.get('chat_messages').filter({ session_id: session.id }).size().value();
    const updates  = { updated_at: now };
    if (msgCount === 1) updates.title = content.trim().slice(0, 60);

    let aiContent;
    let difyConvId = session.dify_conversation_id;

    // Try Dify first if configured
    if (isDifyEnabled()) {
      try {
        const difyResult = await askDify(
          content.trim(),
          difyConvId || '',
          `user_${req.user.id}`
        );
        aiContent = difyResult.answer;
        difyConvId = difyResult.conversationId;
        updates.dify_conversation_id = difyConvId;
      } catch (difyErr) {
        console.warn('[Dify] Error, falling back to local AI:', difyErr.message);
        aiContent = getAIResponse(content.trim(), mode);
      }
    } else {
      aiContent = getAIResponse(content.trim(), mode);
    }

    db.get('chat_sessions').find({ id: session.id }).assign(updates).write();

    const aiMsg = {
      id: nextId('chat_messages'),
      session_id: session.id,
      role: 'assistant',
      content: aiContent,
      created_at: new Date().toISOString()
    };
    db.get('chat_messages').push(aiMsg).write();

    return res.json({
      success: true,
      userMessage: userMsg,
      aiMessage: aiMsg,
      powered_by: isDifyEnabled() ? 'dify' : 'local'
    });
  } catch (err) {
    console.error('[sendMessage]', err);
    return res.status(500).json({ success: false, message: 'Lỗi máy chủ.' });
  }
}

/**
 * POST /api/chat/sessions/:id/stream — SSE streaming from Dify
 */
function streamMessage(req, res) {
  const { id: sessionId } = req.params;
  const { content, mode = 'qa' } = req.body;

  if (!content?.trim()) {
    return res.status(400).json({ success: false, message: 'Nội dung không được trống.' });
  }

  const session = db.get('chat_sessions').find({ id: sessionId, user_id: req.user.id }).value();
  if (!session) return res.status(404).json({ success: false, message: 'Không tìm thấy phiên chat.' });

  // Save user message immediately
  const now = new Date().toISOString();
  const userMsg = {
    id: nextId('chat_messages'),
    session_id: session.id,
    role: 'user',
    content: content.trim(),
    created_at: now
  };
  db.get('chat_messages').push(userMsg).write();

  // Update title if first message
  const msgCount = db.get('chat_messages').filter({ session_id: session.id }).size().value();
  if (msgCount === 1) {
    db.get('chat_sessions').find({ id: session.id }).assign({ title: content.trim().slice(0, 60), updated_at: now }).write();
  }

  // Setup SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no'); // For nginx
  res.flushHeaders?.();

  const send = (event, data) => {
    if (!res.writableEnded) {
      res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
    }
  };

  // Send user message confirmation
  send('user_message', { message: userMsg });

  if (!isDifyEnabled()) {
    // Fallback: simulate streaming with local response
    const localResponse = getAIResponse(content.trim(), mode);
    const words = localResponse.split(' ');
    let i = 0;
    const interval = setInterval(() => {
      if (i < words.length) {
        send('chunk', { text: (i > 0 ? ' ' : '') + words[i] });
        i++;
      } else {
        clearInterval(interval);
        const aiMsg = {
          id: nextId('chat_messages'),
          session_id: session.id,
          role: 'assistant',
          content: localResponse,
          created_at: new Date().toISOString()
        };
        db.get('chat_messages').push(aiMsg).write();
        db.get('chat_sessions').find({ id: session.id }).assign({ updated_at: new Date().toISOString() }).write();
        send('done', { message: aiMsg, powered_by: 'local' });
        res.end();
      }
    }, 25);
    req.on('close', () => clearInterval(interval));
    return;
  }

  // Real Dify streaming
  let fullResponse = '';
  streamDify(
    content.trim(),
    session.dify_conversation_id || '',
    `user_${req.user.id}`,
    (chunk) => {
      fullResponse += chunk;
      send('chunk', { text: chunk });
    },
    (newConvId) => {
      // Save AI message to DB
      const aiMsg = {
        id: nextId('chat_messages'),
        session_id: session.id,
        role: 'assistant',
        content: fullResponse,
        created_at: new Date().toISOString()
      };
      db.get('chat_messages').push(aiMsg).write();
      db.get('chat_sessions').find({ id: session.id }).assign({
        updated_at: new Date().toISOString(),
        dify_conversation_id: newConvId
      }).write();
      send('done', { message: aiMsg, powered_by: 'dify' });
      res.end();
    },
    (err) => {
      console.error('[Dify stream error]', err.message);
      // Fallback on stream error
      const fallback = getAIResponse(content.trim(), mode);
      send('chunk', { text: fallback });
      const aiMsg = {
        id: nextId('chat_messages'),
        session_id: session.id,
        role: 'assistant',
        content: fallback,
        created_at: new Date().toISOString()
      };
      db.get('chat_messages').push(aiMsg).write();
      send('done', { message: aiMsg, powered_by: 'local_fallback' });
      res.end();
    }
  );

  req.on('close', () => { /* Connection closed by client */ });
}

function deleteSession(req, res) {
  try {
    const session = db.get('chat_sessions').find({ id: req.params.id, user_id: req.user.id }).value();
    if (!session) return res.status(404).json({ success: false, message: 'Không tìm thấy phiên chat.' });
    db.get('chat_messages').remove({ session_id: session.id }).write();
    db.get('chat_sessions').remove({ id: session.id }).write();
    return res.json({ success: true, message: 'Đã xoá phiên chat.' });
  } catch (err) {
    console.error('[deleteSession]', err);
    return res.status(500).json({ success: false, message: 'Lỗi máy chủ.' });
  }
}

module.exports = { getSessions, createSession, getSession, sendMessage, streamMessage, deleteSession };
