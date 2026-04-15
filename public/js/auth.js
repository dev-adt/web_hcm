// =====================================================
// public/js/auth.js — Auth Manager (API-backed)
// =====================================================

const Auth = (() => {
  const USER_KEY = 'hcm_user';
  let _currentUser = null;

  function init() {
    handleOAuthCallback();

    const stored = localStorage.getItem(USER_KEY);
    if (stored) {
      try { _currentUser = JSON.parse(stored); } catch { _currentUser = null; }
    }
    // Listen for token expiry
    window.addEventListener('auth:expired', () => {
      _currentUser = null;
      localStorage.removeItem(USER_KEY);
      if (typeof UIController !== 'undefined') UIController.updateAuthState();
      showToast('⏳', 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.', 'error');
      AuthUI.open('login');
    });
  }

  function handleOAuthCallback() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (!token) return;

    const payload = decodeJwtPayload(token);
    if (payload) {
      setUser({
        id: payload.id,
        name: payload.name,
        email: payload.email,
        role: payload.role,
        avatar: payload.avatar,
      }, token);
    } else {
      API.setToken(token);
    }

    params.delete('token');
    params.delete('login');
    const cleanUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}${window.location.hash || '#home'}`;
    window.history.replaceState({}, document.title, cleanUrl);

    API.auth.me().then(res => {
      if (!res.success || !res.user) return;
      setUser({
        id: res.user.id,
        name: res.user.name,
        email: res.user.email,
        role: res.user.role,
        avatar: res.user.avatar,
      }, token);
      if (typeof UIController !== 'undefined') UIController.updateAuthState();
      showToast('🎉', `Chào mừng trở lại, ${res.user.name}!`, 'success');
    }).catch(() => {});
  }

  function decodeJwtPayload(token) {
    try {
      const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      const json = decodeURIComponent(atob(base64).split('').map(c =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      ).join(''));
      return JSON.parse(json);
    } catch {
      return null;
    }
  }

  function setUser(user, token) {
    _currentUser = user;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    API.setToken(token);
  }

  function logout() {
    _currentUser = null;
    localStorage.removeItem(USER_KEY);
    API.clearToken();
  }

  function getCurrentUser() { return _currentUser; }
  function isLoggedIn()     { return !!_currentUser && !!API.getToken(); }

  return { init, setUser, logout, getCurrentUser, isLoggedIn };
})();

// ─── Auth UI Controller ─────────────────────────────────
const AuthUI = (() => {
  function init() {
    const modal    = document.getElementById('authModal');
    const closeBtn = document.getElementById('authModalClose');
    const tabLogin = document.getElementById('authTabLogin');
    const tabReg   = document.getElementById('authTabRegister');
    const loginForm = document.getElementById('loginForm');
    const regForm   = document.getElementById('registerForm');
    const pwInput   = document.getElementById('regPassword');

    closeBtn?.addEventListener('click', close);
    modal?.addEventListener('click', (e) => { if (e.target === modal) close(); });

    tabLogin?.addEventListener('click', () => switchTab('login'));
    tabReg?.addEventListener('click',   () => switchTab('register'));

    // Toggle password visibility
    document.querySelectorAll('.input-toggle-pw').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = btn.previousElementSibling || btn.parentElement.querySelector('input[type="password"], input[type="text"]');
        if (!input) return;
        input.type = input.type === 'password' ? 'text' : 'password';
        btn.textContent = input.type === 'password' ? '👁️' : '🙈';
      });
    });

    // Password strength
    pwInput?.addEventListener('input', () => updatePasswordStrength(pwInput.value));

    // Submit handlers
    loginForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      await handleLogin();
    });
    regForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      await handleRegister();
    });

    setupGoogleLogin();
  }

  function open(tab = 'login') {
    const modal = document.getElementById('authModal');
    modal?.classList.add('open');
    switchTab(tab);
    document.body.style.overflow = 'hidden';
  }

  function close() {
    const modal = document.getElementById('authModal');
    modal?.classList.remove('open');
    document.body.style.overflow = '';
    clearErrors();
  }

  function switchTab(tab) {
    const tabs   = document.querySelectorAll('.auth-tab');
    const panels = document.querySelectorAll('.auth-form-panel');
    tabs.forEach(t   => t.classList.toggle('active',   t.id === `authTab${tab.charAt(0).toUpperCase() + tab.slice(1)}`));
    panels.forEach(p => p.classList.toggle('active',   p.id === `${tab}Panel`));
    clearErrors();
  }

  function clearErrors() {
    document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
    document.querySelectorAll('.form-input').forEach(el => el.classList.remove('input-error'));
  }

  function showError(fieldId, msg) {
    const err   = document.getElementById(fieldId);
    const field = document.getElementById(fieldId.replace('Err',''));
    if (err)   err.textContent = msg;
    if (field) field.classList.add('input-error');
  }

  function setLoading(btn, loading) {
    if (loading) {
      btn.disabled = true;
      btn.classList.add('loading');
      btn._origText = btn.textContent;
      btn.textContent = 'Đang xử lý...';
    } else {
      btn.disabled = false;
      btn.classList.remove('loading');
      btn.textContent = btn._origText || btn.dataset.label || 'Gửi';
    }
  }

  async function handleLogin() {
    clearErrors();
    const email    = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const btn      = document.querySelector('#loginForm .auth-submit');

    if (!email)    { showError('loginEmailErr', 'Vui lòng nhập email.'); return; }
    if (!password) { showError('loginPassErr',  'Vui lòng nhập mật khẩu.'); return; }

    setLoading(btn, true);
    const res = await API.auth.login({ email, password });
    setLoading(btn, false);

    if (!res.success) {
      showError('loginPassErr', res.message || 'Đăng nhập thất bại.');
      return;
    }

    Auth.setUser(res.user, res.token);
    UIController.updateAuthState();
    close();
    showToast('🎉', `Chào mừng trở lại, ${res.user.name}!`, 'success');
  }

  async function handleRegister() {
    clearErrors();
    const name     = document.getElementById('regName').value.trim();
    const email    = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirm  = document.getElementById('regConfirm').value;
    const agree    = document.getElementById('regAgree').checked;
    const btn      = document.querySelector('#registerForm .auth-submit');

    let valid = true;
    if (!name || name.length < 2)  { showError('regNameErr',    'Họ tên phải từ 2 ký tự.'); valid = false; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError('regEmailErr', 'Email không hợp lệ.'); valid = false; }
    if (!password || password.length < 6) { showError('regPassErr', 'Mật khẩu phải ít nhất 6 ký tự.'); valid = false; }
    if (password !== confirm)      { showError('regConfirmErr', 'Mật khẩu xác nhận không khớp.'); valid = false; }
    if (!agree)                    { showError('regAgreeErr',   'Vui lòng đồng ý điều khoản.'); valid = false; }
    if (!valid) return;

    setLoading(btn, true);
    const res = await API.auth.register({ name, email, password });
    setLoading(btn, false);

    if (!res.success) {
      showError('regEmailErr', res.message || 'Đăng ký thất bại.');
      return;
    }

    Auth.setUser(res.user, res.token);
    UIController.updateAuthState();
    close();
    showToast('🎉', `Đăng ký thành công! Chào mừng ${res.user.name}!`, 'success');
  }

  async function setupGoogleLogin() {
    const googleBtn = document.getElementById('googleLoginBtn');
    if (!googleBtn) return;

    googleBtn.disabled = true;
    googleBtn.title = 'Đang kiểm tra cấu hình Google...';

    const res = await API.auth.googleStatus();
    if (!res.enabled) {
      googleBtn.style.display = 'none';
      return;
    }

    googleBtn.disabled = false;
    googleBtn.title = 'Đăng nhập bằng Google';
    googleBtn.addEventListener('click', () => {
      window.location.href = '/api/auth/google';
    });
  }

  function updatePasswordStrength(pw) {
    const wrap  = document.getElementById('pwStrengthWrap');
    const label = document.getElementById('pwStrengthLabel');
    if (!wrap) return;
    let score = 0;
    if (pw.length >= 6) score++;
    if (pw.length >= 10) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;

    wrap.className = 'pw-strength';
    if (pw.length === 0) { label.textContent = ''; return; }
    if (score <= 2) { wrap.classList.add('pw-weak');   label.textContent = 'Yếu'; }
    else if (score <= 3) { wrap.classList.add('pw-medium'); label.textContent = 'Trung bình'; }
    else { wrap.classList.add('pw-strong'); label.textContent = 'Mạnh ✓'; }
  }

  return { init, open, close, switchTab };
})();

window.Auth   = Auth;
window.AuthUI = AuthUI;
