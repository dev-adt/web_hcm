// =====================================================
// server/routes/auth.routes.js — with Google OAuth
// =====================================================
const router   = require('express').Router();
const passport = require('passport');
const jwt      = require('jsonwebtoken');
const { requireAuth } = require('../middleware/auth');
const ctrl     = require('../controllers/auth.controller');
const { isGoogleOAuthEnabled } = require('../middleware/passport');

// Standard auth
router.post('/register', ctrl.register);
router.post('/login',    ctrl.login);
router.get ('/me',       requireAuth, ctrl.getMe);
router.put ('/profile',  requireAuth, ctrl.updateProfile);

// Check if Google OAuth is configured
router.get('/google/status', (req, res) => {
  res.json({ enabled: isGoogleOAuthEnabled() });
});

// Google OAuth flow
router.get('/google',
  (req, res, next) => {
    if (!isGoogleOAuthEnabled()) {
      return res.status(503).json({ success: false, message: 'Google OAuth chưa được cấu hình.' });
    }
    passport.authenticate('google', { scope: ['profile', 'email'], session: false })(req, res, next);
  }
);

router.get('/google/callback',
  (req, res, next) => {
    if (!isGoogleOAuthEnabled()) {
      return res.redirect('/?error=oauth_disabled');
    }
    passport.authenticate('google', { session: false, failureRedirect: '/?error=google_auth_failed' })(req, res, next);
  },
  (req, res) => {
    // Generate JWT and redirect to frontend with token
    const { id, name, email, role, avatar } = req.user;
    const payload = { id, name, email, role, avatar };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
      issuer: 'tthcm-ai-platform'
    });

    // Redirect to frontend with token — frontend will store in localStorage
    return res.redirect(`/?token=${encodeURIComponent(token)}&login=google`);
  }
);

module.exports = router;
