// =====================================================
// server/routes/progress.routes.js
// =====================================================
const router = require('express').Router();
const { requireAuth } = require('../middleware/auth');
const ctrl = require('../controllers/progress.controller');

router.use(requireAuth);
router.get('/overview',                 ctrl.getOverview);
router.get('/flashcards',               ctrl.getFlashcardProgress);
router.put('/flashcards/:cardId',       ctrl.updateFlashcardProgress);
router.post('/flashcards/bulk',         ctrl.bulkUpdateFlashcardProgress);

module.exports = router;
