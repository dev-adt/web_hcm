// =====================================================
// server.js — Express Production Server
// =====================================================
require('dotenv').config();
const express  = require('express');
const path     = require('path');
const helmet   = require('helmet');
const cors     = require('cors');
const morgan   = require('morgan');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;
const { setupPassport } = require('./server/middleware/passport');

// ─── Security Middleware ───────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
      scriptSrcAttr: ["'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com", "fonts.gstatic.com"],
      fontSrc: ["'self'", "fonts.googleapis.com", "fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      frameSrc: ["'self'", "https://heyzine.com"],
    },
  },
}));

app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? process.env.APP_URL
    : ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
}));

// ─── Rate Limiting ─────────────────────────────────
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: { success: false, message: 'Quá nhiều yêu cầu, vui lòng thử lại sau 15 phút.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: 'Quá nhiều lần thử đăng nhập. Vui lòng thử lại sau 15 phút.' },
});

// ─── Body Parsing ──────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ─── Logging ───────────────────────────────────────
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

// ─── Static Files (Frontend) ──────────────────────
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: process.env.NODE_ENV === 'production' ? '7d' : 0,
  etag: true,
}));

// ─── Passport / Google OAuth ───────────────────────
setupPassport(app);

// ─── API Routes ────────────────────────────────────
app.use('/api/auth',     authLimiter, require('./server/routes/auth.routes'));
app.use('/api/chat',     apiLimiter,  require('./server/routes/chat.routes'));
app.use('/api/quiz',     apiLimiter,  require('./server/routes/quiz.routes'));
app.use('/api/progress', apiLimiter,  require('./server/routes/progress.routes'));

// ─── Health Check ──────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'OK',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

// ─── 404 for unknown API routes ───────────────────
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, message: `Route '${req.originalUrl}' không tồn tại.` });
});

// ─── SPA Fallback — serve index.html ──────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ─── Global Error Handler ──────────────────────────
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production'
      ? 'Đã xảy ra lỗi. Vui lòng thử lại.'
      : err.message,
  });
});

// ─── Start Server ──────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 TTHCM AI Platform đang chạy!`);
  console.log(`   └── http://localhost:${PORT}`);
  console.log(`   └── Môi trường: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   └── Demo: demo@tthcm.edu.vn / Demo123!\n`);
});

module.exports = app;
