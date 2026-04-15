// =====================================================
// server/controllers/progress.controller.js (LowDB version)
// =====================================================
const { db } = require('../database/db');

function getFlashcardProgress(req, res) {
  try {
    const progress = db.get('flashcard_progress').filter({ user_id: req.user.id }).value();
    const summary = { known: 0, unknown: 0, skipped: 0 };
    progress.forEach(p => { if (summary[p.status] !== undefined) summary[p.status]++; });
    return res.json({ success: true, progress, summary });
  } catch (err) {
    console.error('[getFlashcardProgress]', err);
    return res.status(500).json({ success: false, message: 'Lỗi máy chủ.' });
  }
}

function updateFlashcardProgress(req, res) {
  try {
    const cardId = parseInt(req.params.cardId);
    const { status } = req.body;
    if (!['known', 'unknown', 'skipped'].includes(status))
      return res.status(400).json({ success: false, message: 'Status không hợp lệ.' });

    const existing = db.get('flashcard_progress').find({ user_id: req.user.id, card_id: cardId }).value();
    const now = new Date().toISOString();
    if (existing) {
      db.get('flashcard_progress').find({ user_id: req.user.id, card_id: cardId }).assign({ status, updated_at: now }).write();
    } else {
      db.get('flashcard_progress').push({ user_id: req.user.id, card_id: cardId, status, updated_at: now }).write();
    }
    return res.json({ success: true, message: 'Đã cập nhật tiến độ.' });
  } catch (err) {
    console.error('[updateFlashcardProgress]', err);
    return res.status(500).json({ success: false, message: 'Lỗi máy chủ.' });
  }
}

function bulkUpdateFlashcardProgress(req, res) {
  try {
    const { updates } = req.body;
    if (!Array.isArray(updates))
      return res.status(400).json({ success: false, message: 'Dữ liệu không hợp lệ.' });
    const now = new Date().toISOString();
    updates.forEach(({ cardId, status }) => {
      if (!['known','unknown','skipped'].includes(status)) return;
      const existing = db.get('flashcard_progress').find({ user_id: req.user.id, card_id: cardId }).value();
      if (existing) {
        db.get('flashcard_progress').find({ user_id: req.user.id, card_id: cardId }).assign({ status, updated_at: now }).write();
      } else {
        db.get('flashcard_progress').push({ user_id: req.user.id, card_id: cardId, status, updated_at: now }).write();
      }
    });
    return res.json({ success: true, message: `Đã cập nhật ${updates.length} thẻ.` });
  } catch (err) {
    console.error('[bulkUpdateFlashcardProgress]', err);
    return res.status(500).json({ success: false, message: 'Lỗi máy chủ.' });
  }
}

function getOverview(req, res) {
  try {
    const uid = req.user.id;
    const knownCards   = db.get('flashcard_progress').filter({ user_id: uid, status: 'known' }).size().value();
    const unknownCards = db.get('flashcard_progress').filter({ user_id: uid, status: 'unknown' }).size().value();
    const attempts  = db.get('quiz_attempts').filter({ user_id: uid }).value();
    const quizAvg   = attempts.length ? Math.round(attempts.reduce((s,a) => s + a.score, 0) / attempts.length) : 0;
    const chatCount = db.get('chat_sessions').filter({ user_id: uid }).size().value();
    return res.json({
      success: true,
      overview: {
        flashcards: { known: knownCards, unknown: unknownCards, total: 20 },
        quiz: { attempts: attempts.length, avgScore: quizAvg },
        chat: { sessions: chatCount },
      }
    });
  } catch (err) {
    console.error('[getOverview]', err);
    return res.status(500).json({ success: false, message: 'Lỗi máy chủ.' });
  }
}

module.exports = { getFlashcardProgress, updateFlashcardProgress, bulkUpdateFlashcardProgress, getOverview };
