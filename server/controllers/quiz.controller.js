// =====================================================
// server/controllers/quiz.controller.js (LowDB version)
// =====================================================
const { db, nextId } = require('../database/db');

function submitAttempt(req, res) {
  try {
    const { mode, chapterId = 0, score, correct, wrong, skipped, total, timeSpent = 0 } = req.body;
    if (!mode || total === undefined)
      return res.status(400).json({ success: false, message: 'Thiếu thông tin kết quả quiz.' });

    const attempt = {
      id: nextId('quiz_attempts'),
      user_id: req.user.id, mode, chapter_id: chapterId,
      score: score || 0, correct: correct || 0, wrong: wrong || 0,
      skipped: skipped || 0, total, time_spent: timeSpent,
      created_at: new Date().toISOString(),
    };
    db.get('quiz_attempts').push(attempt).write();
    return res.status(201).json({ success: true, attemptId: attempt.id, message: 'Đã lưu kết quả!' });
  } catch (err) {
    console.error('[submitAttempt]', err);
    return res.status(500).json({ success: false, message: 'Lỗi máy chủ.' });
  }
}

function getHistory(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const attempts = db.get('quiz_attempts')
      .filter({ user_id: req.user.id })
      .orderBy(['created_at'], ['desc'])
      .take(limit)
      .value();
    return res.json({ success: true, attempts });
  } catch (err) {
    console.error('[getHistory]', err);
    return res.status(500).json({ success: false, message: 'Lỗi máy chủ.' });
  }
}

function getStats(req, res) {
  try {
    const attempts = db.get('quiz_attempts').filter({ user_id: req.user.id }).value();
    const total    = attempts.length;
    const best     = total ? Math.max(...attempts.map(a => a.score)) : 0;
    const avgAcc   = total ? Math.round(attempts.reduce((s, a) => s + (a.total > 0 ? (a.correct / a.total * 100) : 0), 0) / total) : 0;
    const recent   = attempts.slice(-7).reverse();
    return res.json({ success: true, stats: { totalAttempts: total, bestScore: best, avgAccuracy: avgAcc, recent } });
  } catch (err) {
    console.error('[getStats]', err);
    return res.status(500).json({ success: false, message: 'Lỗi máy chủ.' });
  }
}

module.exports = { submitAttempt, getHistory, getStats };
