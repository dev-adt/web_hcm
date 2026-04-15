-- =====================================================
-- TTHCM AI Platform — Database Schema
-- =====================================================

-- Users
CREATE TABLE IF NOT EXISTS users (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT    NOT NULL,
  email       TEXT    UNIQUE NOT NULL,
  password_hash TEXT  NOT NULL,
  role        TEXT    NOT NULL DEFAULT 'student',
  avatar      TEXT,
  bio         TEXT,
  is_active   INTEGER NOT NULL DEFAULT 1,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login  DATETIME
);

-- Chat sessions
CREATE TABLE IF NOT EXISTS chat_sessions (
  id          TEXT    PRIMARY KEY,
  user_id     INTEGER NOT NULL,
  title       TEXT    DEFAULT 'Cuộc trò chuyện mới',
  mode        TEXT    DEFAULT 'qa',
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Chat messages
CREATE TABLE IF NOT EXISTS chat_messages (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id  TEXT    NOT NULL,
  role        TEXT    NOT NULL CHECK(role IN ('user','assistant')),
  content     TEXT    NOT NULL,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES chat_sessions(id) ON DELETE CASCADE
);

-- Quiz attempts
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id     INTEGER NOT NULL,
  mode        TEXT    NOT NULL,
  chapter_id  INTEGER DEFAULT 0,
  score       INTEGER NOT NULL DEFAULT 0,
  correct     INTEGER NOT NULL DEFAULT 0,
  wrong       INTEGER NOT NULL DEFAULT 0,
  skipped     INTEGER NOT NULL DEFAULT 0,
  total       INTEGER NOT NULL,
  time_spent  INTEGER DEFAULT 0,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Flashcard progress
CREATE TABLE IF NOT EXISTS flashcard_progress (
  user_id     INTEGER NOT NULL,
  card_id     INTEGER NOT NULL,
  status      TEXT    NOT NULL CHECK(status IN ('known','unknown','skipped')),
  updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, card_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_chat_sessions_user ON chat_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user ON quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_flashcard_progress_user ON flashcard_progress(user_id);
