// =====================================================
// server/middleware/auth.js — JWT Verify Middleware
// =====================================================
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_change_me';

/**
 * Middleware: require valid JWT token
 * Reads from Authorization header OR cookie
 */
function requireAuth(req, res, next) {
  const token = extractToken(req);
  if (!token) {
    return res.status(401).json({ success: false, message: 'Vui lòng đăng nhập để tiếp tục.' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.', code: 'TOKEN_EXPIRED' });
    }
    return res.status(401).json({ success: false, message: 'Token không hợp lệ.' });
  }
}

/**
 * Middleware: optional auth (doesn't block if no token)
 */
function optionalAuth(req, res, next) {
  const token = extractToken(req);
  if (token) {
    try {
      req.user = jwt.verify(token, JWT_SECRET);
    } catch { /* ignore */ }
  }
  next();
}

/**
 * Middleware: require admin role
 */
function requireAdmin(req, res, next) {
  requireAuth(req, res, () => {
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Không có quyền truy cập.' });
    }
    next();
  });
}

function extractToken(req) {
  // 1. Authorization: Bearer <token>
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) return authHeader.slice(7);
  // 2. Cookie: token=<token>
  if (req.cookies?.token) return req.cookies.token;
  // 3. x-auth-token header (legacy)
  if (req.headers['x-auth-token']) return req.headers['x-auth-token'];
  return null;
}

function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    issuer: 'tthcm-ai-platform',
  });
}

module.exports = { requireAuth, optionalAuth, requireAdmin, signToken, extractToken };
