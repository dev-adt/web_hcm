// =====================================================
// server/controllers/auth.controller.js (LowDB version)
// =====================================================
const bcrypt = require('bcryptjs');
const { db, nextId } = require('../database/db');
const { signToken } = require('../middleware/auth');

async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name?.trim() || name.trim().length < 2)
      return res.status(400).json({ success: false, message: 'Họ tên phải có ít nhất 2 ký tự.' });
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return res.status(400).json({ success: false, message: 'Email không hợp lệ.' });
    if (!password || password.length < 6)
      return res.status(400).json({ success: false, message: 'Mật khẩu phải có ít nhất 6 ký tự.' });

    const emailLow = email.toLowerCase().trim();
    if (db.get('users').find({ email: emailLow }).value())
      return res.status(409).json({ success: false, message: 'Email này đã được đăng ký.' });

    const passwordHash = await bcrypt.hash(password, 12);
    const avatar = name.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    const id = nextId('users');
    const now = new Date().toISOString();
    const user = { id, name: name.trim(), email: emailLow, password_hash: passwordHash, role: 'student', avatar, bio: null, is_active: true, created_at: now, last_login: now };

    db.get('users').push(user).write();

    const payload = { id, name: user.name, email: emailLow, role: 'student', avatar };
    const token = signToken(payload);
    return res.status(201).json({ success: true, message: 'Đăng ký thành công!', token, user: payload });
  } catch (err) {
    console.error('[register]', err);
    return res.status(500).json({ success: false, message: 'Lỗi máy chủ.' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Vui lòng nhập đầy đủ email và mật khẩu.' });

    const user = db.get('users').find({ email: email.toLowerCase().trim(), is_active: true }).value();
    if (!user) return res.status(401).json({ success: false, message: 'Email hoặc mật khẩu không đúng.' });
    if (!user.password_hash) {
      return res.status(400).json({ success: false, message: 'Tài khoản này đăng nhập bằng Google. Vui lòng dùng nút Google.' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Email hoặc mật khẩu không đúng.' });

    db.get('users').find({ id: user.id }).assign({ last_login: new Date().toISOString() }).write();

    const payload = { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar };
    const token = signToken(payload);
    return res.json({ success: true, message: 'Đăng nhập thành công!', token, user: payload });
  } catch (err) {
    console.error('[login]', err);
    return res.status(500).json({ success: false, message: 'Lỗi máy chủ.' });
  }
}

function getMe(req, res) {
  try {
    const user = db.get('users').find({ id: req.user.id }).value();
    if (!user) return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng.' });

    const quizCount = db.get('quiz_attempts').filter({ user_id: req.user.id }).size().value();
    const attempts  = db.get('quiz_attempts').filter({ user_id: req.user.id }).value();
    const bestScore = attempts.length ? Math.max(...attempts.map(a => a.score)) : 0;
    const knownCards = db.get('flashcard_progress').filter({ user_id: req.user.id, status: 'known' }).size().value();
    const chatCount  = db.get('chat_sessions').filter({ user_id: req.user.id }).size().value();

    const { password_hash, ...safeUser } = user;
    return res.json({ success: true, user: { ...safeUser, stats: { quizCount, bestScore, knownCards, chatCount } } });
  } catch (err) {
    console.error('[getMe]', err);
    return res.status(500).json({ success: false, message: 'Lỗi máy chủ.' });
  }
}

async function updateProfile(req, res) {
  try {
    const { name, bio, currentPassword, newPassword } = req.body;
    const user = db.get('users').find({ id: req.user.id }).value();
    if (!user) return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng.' });

    const updates = {};
    if (name?.trim() && name.trim().length >= 2) {
      updates.name = name.trim();
      updates.avatar = name.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    }
    if (bio !== undefined) updates.bio = bio;

    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
      if (!isMatch) return res.status(400).json({ success: false, message: 'Mật khẩu hiện tại không đúng.' });
      if (newPassword.length < 6) return res.status(400).json({ success: false, message: 'Mật khẩu mới phải ít nhất 6 ký tự.' });
      updates.password_hash = await bcrypt.hash(newPassword, 12);
    }

    if (!Object.keys(updates).length)
      return res.status(400).json({ success: false, message: 'Không có thông tin để cập nhật.' });

    db.get('users').find({ id: req.user.id }).assign(updates).write();
    const updated = db.get('users').find({ id: req.user.id }).value();
    const { password_hash, ...safe } = updated;
    return res.json({ success: true, message: 'Cập nhật thành công!', user: safe });
  } catch (err) {
    console.error('[updateProfile]', err);
    return res.status(500).json({ success: false, message: 'Lỗi máy chủ.' });
  }
}

module.exports = { register, login, getMe, updateProfile };
