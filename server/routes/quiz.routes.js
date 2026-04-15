// =====================================================
// server/routes/quiz.routes.js
// =====================================================
const router = require('express').Router();
const { requireAuth } = require('../middleware/auth');
const ctrl = require('../controllers/quiz.controller');

router.use(requireAuth);
router.post('/submit',  ctrl.submitAttempt);
router.get('/history',  ctrl.getHistory);
router.get('/stats',    ctrl.getStats);

module.exports = router;
