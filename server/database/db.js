// =====================================================
// server/database/db.js — LowDB (pure JS, no native compile)
// =====================================================
const low    = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const bcrypt = require('bcryptjs');
const path   = require('path');
const fs     = require('fs');
require('dotenv').config();

// Ensure DB directory exists
const dbDir = path.join(__dirname);
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

const adapter = new FileSync(path.join(__dirname, 'tthcm.json'));
const db = low(adapter);

// ─── Default structure ───────────────────────────
db.defaults({
  users: [],
  chat_sessions: [],
  chat_messages: [],
  quiz_attempts: [],
  flashcard_progress: [],
}).write();

// ─── Seed demo user ─────────────────────────────
function seedDemo() {
  const exists = db.get('users').find({ email: 'demo@tthcm.edu.vn' }).value();
  if (!exists) {
    const hash = bcrypt.hashSync('Demo123!', 10);
    db.get('users').push({
      id: 1,
      name: 'Sinh viên Demo',
      email: 'demo@tthcm.edu.vn',
      password_hash: hash,
      role: 'student',
      avatar: 'SD',
      bio: null,
      is_active: true,
      created_at: new Date().toISOString(),
      last_login: null,
    }).write();
    console.log('✅ Demo seeded: demo@tthcm.edu.vn / Demo123!');
  }
}

seedDemo();
console.log('✅ LowDB initialized:', path.join(__dirname, 'tthcm.json'));

// ─── Helper ID generator ─────────────────────────
function nextId(collection) {
  const items = db.get(collection).value();
  if (!items.length) return 1;
  return Math.max(...items.map(i => i.id || 0)) + 1;
}

module.exports = { db, nextId };
