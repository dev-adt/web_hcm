// =====================================================
// server/services/dify.service.js — Dify AI Proxy
// =====================================================
const https = require('https');
const http  = require('http');

const DIFY_API_URL = process.env.DIFY_API_URL || '';
const DIFY_API_KEY = process.env.DIFY_API_KEY || '';
const DIFY_MODE    = process.env.DIFY_CONVERSATION_MODE || 'chat'; // 'chat' | 'completion'

function getDifyEndpoint() {
  const base = DIFY_API_URL.replace(/\/+$/, '');
  const path = DIFY_MODE === 'completion' ? '/completion-messages' : '/chat-messages';
  return new URL(`${base}${path}`);
}

/**
 * Check if Dify is configured
 */
function isDifyEnabled() {
  return !!(DIFY_API_URL && DIFY_API_KEY && DIFY_API_KEY !== 'YOUR_DIFY_API_KEY');
}

/**
 * Send message to Dify API (non-streaming)
 * @param {string} query        - User message
 * @param {string} conversationId - Existing Dify conversation ID (or '')
 * @param {string} userId       - User identifier
 * @returns {Promise<{answer: string, conversationId: string}>}
 */
async function askDify(query, conversationId = '', userId = 'anonymous') {
  if (!isDifyEnabled()) {
    throw new Error('Dify not configured');
  }

  const url = getDifyEndpoint();

  const body = JSON.stringify({
    inputs: {},
    query,
    response_mode: 'blocking',
    conversation_id: conversationId || undefined,
    user: userId,
  });

  return new Promise((resolve, reject) => {
    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DIFY_API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const lib = url.protocol === 'https:' ? https : http;
    const req = lib.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode < 200 || res.statusCode >= 300) {
            reject(new Error(parsed.message || parsed.error || `Dify HTTP ${res.statusCode}`));
          } else if (parsed.answer) {
            resolve({
              answer: parsed.answer,
              conversationId: parsed.conversation_id || conversationId,
            });
          } else if (parsed.message) {
            reject(new Error(parsed.message));
          } else {
            reject(new Error('Unexpected Dify response format'));
          }
        } catch (e) {
          reject(new Error('Failed to parse Dify response'));
        }
      });
    });

    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error('Dify request timeout')); });
    req.write(body);
    req.end();
  });
}

/**
 * Stream response from Dify (SSE)
 * Calls onChunk(text) for each streamed token, then onDone(conversationId)
 */
function streamDify(query, conversationId = '', userId = 'anonymous', onChunk, onDone, onError) {
  if (!isDifyEnabled()) {
    onError(new Error('Dify not configured'));
    return;
  }

  const url = getDifyEndpoint();

  const body = JSON.stringify({
    inputs: {},
    query,
    response_mode: 'streaming',
    conversation_id: conversationId || undefined,
    user: userId,
  });

  const options = {
    hostname: url.hostname,
    port: url.port || (url.protocol === 'https:' ? 443 : 80),
    path: url.pathname + url.search,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${DIFY_API_KEY}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
    },
  };

  const lib = url.protocol === 'https:' ? https : http;
  const req = lib.request(options, (res) => {
    let newConversationId = conversationId;
    let buffer = '';

    if (res.statusCode < 200 || res.statusCode >= 300) {
      let errorBody = '';
      res.on('data', chunk => errorBody += chunk.toString());
      res.on('end', () => {
        try {
          const parsed = JSON.parse(errorBody);
          onError(new Error(parsed.message || parsed.error || `Dify HTTP ${res.statusCode}`));
        } catch {
          onError(new Error(`Dify HTTP ${res.statusCode}`));
        }
      });
      return;
    }

    res.on('data', (chunk) => {
      buffer += chunk.toString();
      const lines = buffer.split('\n');
      buffer = lines.pop(); // Keep incomplete line

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const raw = line.slice(6).trim();
        if (raw === '[DONE]') { onDone(newConversationId); return; }

        try {
          const event = JSON.parse(raw);
          if (event.event === 'message' && event.answer) {
            onChunk(event.answer);
          } else if (event.event === 'message_end') {
            newConversationId = event.conversation_id || newConversationId;
            onDone(newConversationId);
          } else if (event.event === 'error') {
            onError(new Error(event.message || 'Dify stream error'));
          }
        } catch (e) { /* ignore parse errors in stream */ }
      }
    });

    res.on('end', () => { if (buffer) onDone(newConversationId); });
    res.on('error', onError);
  });

  req.on('error', onError);
  req.setTimeout(60000, () => { req.destroy(); onError(new Error('Stream timeout')); });
  req.write(body);
  req.end();
}

module.exports = { isDifyEnabled, askDify, streamDify };
