// =====================================================
// server/middleware/passport.js — Google OAuth 2.0
// =====================================================
// Kích hoạt khi có GOOGLE_CLIENT_ID và GOOGLE_CLIENT_SECRET trong .env

const passport   = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const { db, nextId } = require('../database/db');

const GOOGLE_CLIENT_ID     = process.env.GOOGLE_CLIENT_ID     || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
const APP_URL              = process.env.APP_URL || 'http://localhost:3000';

function isGoogleOAuthEnabled() {
  return !!(GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET
    && GOOGLE_CLIENT_ID !== 'YOUR_GOOGLE_CLIENT_ID');
}

function setupPassport(app) {
  if (!isGoogleOAuthEnabled()) {
    console.log('ℹ️  Google OAuth disabled — set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env to enable.');
    return false;
  }

  app.use(passport.initialize());

  passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL:  `${APP_URL}/api/auth/google/callback`,
    scope: ['profile', 'email'],
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const email  = profile.emails?.[0]?.value?.toLowerCase().trim();
      const name   = profile.displayName;
      const avatar = (name || 'G').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
      const googleId = profile.id;

      // Find existing user by Google ID or email
      let user = db.get('users').find({ google_id: googleId }).value()
        || db.get('users').find({ email }).value();

      if (user) {
        // Update Google ID if missing
        if (!user.google_id) {
          db.get('users').find({ id: user.id }).assign({
            google_id: googleId,
            avatar,
            last_login: new Date().toISOString(),
          }).write();
          user = db.get('users').find({ id: user.id }).value();
        } else {
          db.get('users').find({ id: user.id }).assign({ last_login: new Date().toISOString() }).write();
        }
      } else {
        // Create new user
        const newUser = {
          id: nextId('users'),
          name,
          email,
          password_hash: null,
          google_id: googleId,
          role: 'student',
          avatar,
          bio: null,
          is_active: true,
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
        };
        db.get('users').push(newUser).write();
        user = newUser;
      }

      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }));

  console.log('✅ Google OAuth enabled');
  return true;
}

module.exports = { setupPassport, isGoogleOAuthEnabled };
