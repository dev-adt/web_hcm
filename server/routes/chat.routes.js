// =====================================================
// server/routes/chat.routes.js — with stream endpoint
// =====================================================
const router = require('express').Router();
const { requireAuth } = require('../middleware/auth');
const ctrl   = require('../controllers/chat.controller');
const { isDifyEnabled } = require('../services/dify.service');

router.get('/config/ai', (req, res) => {
  res.json({ success: true, dify: isDifyEnabled(), streaming: true });
});

router.get   ('/',                    requireAuth, ctrl.getSessions);
router.post  ('/',                    requireAuth, ctrl.createSession);
router.get   ('/sessions',            requireAuth, ctrl.getSessions);
router.post  ('/sessions',            requireAuth, ctrl.createSession);
router.get   ('/sessions/:id',        requireAuth, ctrl.getSession);
router.post  ('/sessions/:id/messages', requireAuth, ctrl.sendMessage);
router.post  ('/sessions/:id/stream', requireAuth, ctrl.streamMessage);
router.delete('/sessions/:id',        requireAuth, ctrl.deleteSession);
router.get   ('/:id',                 requireAuth, ctrl.getSession);
router.post  ('/:id/messages',        requireAuth, ctrl.sendMessage);
router.post  ('/:id/stream',          requireAuth, ctrl.streamMessage);
router.delete('/:id',                 requireAuth, ctrl.deleteSession);

module.exports = router;
