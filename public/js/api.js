// =====================================================
// public/js/api.js — HTTP API Client
// =====================================================

const API = (() => {
  const BASE = '/api';

  // Storage for JWT token
  let _token = localStorage.getItem('hcm_token') || null;

  function setToken(token) {
    _token = token;
    if (token) localStorage.setItem('hcm_token', token);
    else localStorage.removeItem('hcm_token');
  }
  function getToken() { return _token; }
  function clearToken() { setToken(null); }

  // Core fetch wrapper
  async function request(method, path, body = null, opts = {}) {
    const headers = { 'Content-Type': 'application/json' };
    if (_token) headers['Authorization'] = `Bearer ${_token}`;

    const config = { method, headers };
    if (body) config.body = JSON.stringify(body);

    try {
      const res = await fetch(BASE + path, config);
      const data = await res.json();

      // Token expired — auto logout
      if (res.status === 401 && data.code === 'TOKEN_EXPIRED') {
        clearToken();
        window.dispatchEvent(new CustomEvent('auth:expired'));
        return { success: false, message: data.message };
      }
      return data;
    } catch (err) {
      console.error('[API Error]', method, path, err);
      return { success: false, message: 'Không thể kết nối máy chủ. Vui lòng kiểm tra mạng.' };
    }
  }

  const get    = (path)         => request('GET',    path);
  const post   = (path, body)   => request('POST',   path, body);
  const put    = (path, body)   => request('PUT',    path, body);
  const del    = (path)         => request('DELETE', path);

  // ─── Auth ───────────────────────────────────────
  const auth = {
    register: (data) => post('/auth/register', data),
    login:    (data) => post('/auth/login', data),
    logout:   ()     => { clearToken(); return Promise.resolve({ success: true }); },
    me:       ()     => get('/auth/me'),
    updateProfile: (data) => put('/auth/profile', data),
    googleStatus: () => get('/auth/google/status'),
  };

  // ─── Chat ───────────────────────────────────────
  const chat = {
    getSessions:  ()           => get('/chat/sessions'),
    createSession:(mode)       => post('/chat/sessions', { mode }),
    getSession:   (id)         => get(`/chat/sessions/${id}`),
    sendMessage:  (id, content, mode) => post(`/chat/sessions/${id}/messages`, { content, mode }),
    deleteSession:(id)         => del(`/chat/sessions/${id}`),
  };

  // ─── Quiz ───────────────────────────────────────
  const quiz = {
    submit:  (data)  => post('/quiz/submit', data),
    history: (limit) => get(`/quiz/history?limit=${limit || 20}`),
    stats:   ()      => get('/quiz/stats'),
  };

  // ─── Progress ───────────────────────────────────
  const progress = {
    overview:           ()                     => get('/progress/overview'),
    flashcards:         ()                     => get('/progress/flashcards'),
    updateCard:         (cardId, status)       => put(`/progress/flashcards/${cardId}`, { status }),
    bulkUpdateCards:    (updates)              => post('/progress/flashcards/bulk', { updates }),
  };

  return { setToken, getToken, clearToken, auth, chat, quiz, progress };
})();

// Expose globally
window.API = API;
