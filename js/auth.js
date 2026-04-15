// =====================================================
// AUTH.JS — Authentication: Login, Register, Session
// =====================================================

const Auth = (() => {
  const STORAGE_KEY = 'hcm_user';
  const USERS_KEY = 'hcm_users';

  const defaultUsers = [
    { id: 1, name: 'Demo Student', email: 'demo@hcm.edu.vn', password: 'Demo123!', avatar: 'DS', role: 'student' },
    { id: 2, name: 'Admin', email: 'admin@hcm.edu.vn', password: 'Admin123!', avatar: 'AD', role: 'admin' },
  ];

  function init() {
    if (!localStorage.getItem(USERS_KEY)) {
      localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
    }
  }

  function getUsers() { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); }
  function getCurrentUser() { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); }
  function isLoggedIn() { return !!getCurrentUser(); }

  function login(email, password) {
    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) return { success: false, message: 'Email hoặc mật khẩu không đúng.' };
    const sessionUser = { id: user.id, name: user.name, email: user.email, avatar: user.avatar, role: user.role };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionUser));
    return { success: true, user: sessionUser };
  }

  function register(name, email, password) {
    const users = getUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, message: 'Email này đã được đăng ký.' };
    }
    const initials = name.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    const newUser = { id: Date.now(), name: name.trim(), email: email.toLowerCase(), password, avatar: initials, role: 'student' };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email, avatar: newUser.avatar, role: newUser.role };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionUser));
    return { success: true, user: sessionUser };
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
  }

  return { init, login, register, logout, isLoggedIn, getCurrentUser };
})();

// ─── AUTH UI ───
const AuthUI = (() => {
  let overlay, loginPanel, registerPanel;
  let loginTab, registerTab;

  function init() {
    overlay = document.getElementById('authModal');
    loginPanel = document.getElementById('loginPanel');
    registerPanel = document.getElementById('registerPanel');
    loginTab = document.getElementById('authTabLogin');
    registerTab = document.getElementById('authTabRegister');

    // Close modal
    document.getElementById('authModalClose').addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    // Tabs
    loginTab.addEventListener('click', () => switchTab('login'));
    registerTab.addEventListener('click', () => switchTab('register'));

    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);

    // Register form
    document.getElementById('registerForm').addEventListener('submit', handleRegister);

    // Password toggle
    document.querySelectorAll('.input-toggle-pw').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const inp = e.target.closest('.input-wrapper').querySelector('input');
        const isText = inp.type === 'text';
        inp.type = isText ? 'password' : 'text';
        e.target.textContent = isText ? '👁️' : '🙈';
      });
    });

    // Password strength meter
    const pwInput = document.getElementById('regPassword');
    if (pwInput) pwInput.addEventListener('input', updatePasswordStrength);

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) close();
    });
  }

  function open(tab = 'login') {
    overlay.classList.add('active');
    switchTab(tab);
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    clearErrors();
  }

  function switchTab(tab) {
    if (tab === 'login') {
      loginTab.classList.add('active');
      registerTab.classList.remove('active');
      loginPanel.classList.add('active');
      registerPanel.classList.remove('active');
    } else {
      registerTab.classList.add('active');
      loginTab.classList.remove('active');
      registerPanel.classList.add('active');
      loginPanel.classList.remove('active');
    }
  }

  function handleLogin(e) {
    e.preventDefault();
    clearErrors();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    let valid = true;
    if (!email || !isValidEmail(email)) { showError('loginEmailErr', 'Email không hợp lệ.'); valid = false; }
    if (!password) { showError('loginPassErr', 'Vui lòng nhập mật khẩu.'); valid = false; }
    if (!valid) return;

    const btn = e.target.querySelector('[type=submit]');
    setLoading(btn, true);

    setTimeout(() => {
      const result = Auth.login(email, password);
      setLoading(btn, false);
      if (result.success) {
        close();
        UIController.updateAuthState();
        showToast('✅', `Chào mừng, ${result.user.name}!`, 'success');
        e.target.reset();
      } else {
        showError('loginEmailErr', result.message);
      }
    }, 600);
  }

  function handleRegister(e) {
    e.preventDefault();
    clearErrors();
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirm = document.getElementById('regConfirm').value;
    const agreed = document.getElementById('regAgree').checked;
    let valid = true;

    if (!name || name.length < 2) { showError('regNameErr', 'Họ tên phải có ít nhất 2 ký tự.'); valid = false; }
    if (!email || !isValidEmail(email)) { showError('regEmailErr', 'Email không hợp lệ.'); valid = false; }
    if (!password || password.length < 6) { showError('regPassErr', 'Mật khẩu phải có ít nhất 6 ký tự.'); valid = false; }
    if (password !== confirm) { showError('regConfirmErr', 'Mật khẩu không khớp.'); valid = false; }
    if (!agreed) { showError('regAgreeErr', 'Vui lòng đồng ý với điều khoản.'); valid = false; }
    if (!valid) return;

    const btn = e.target.querySelector('[type=submit]');
    setLoading(btn, true);

    setTimeout(() => {
      const result = Auth.register(name, email, password);
      setLoading(btn, false);
      if (result.success) {
        close();
        UIController.updateAuthState();
        showToast('🎉', `Đăng ký thành công! Chào ${result.user.name}!`, 'success');
        e.target.reset();
      } else {
        showError('regEmailErr', result.message);
      }
    }, 800);
  }

  function updatePasswordStrength() {
    const pw = this.value;
    const bar = document.getElementById('pwStrengthBar');
    const label = document.getElementById('pwStrengthLabel');
    if (!bar) return;
    let score = 0;
    if (pw.length >= 6) score++;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw) && /[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;

    if (!pw) { bar.className = 'pw-strength-fill'; bar.style.width = '0'; label.textContent = ''; label.className = 'pw-strength-label'; }
    else if (score <= 1) { bar.className = 'pw-strength-fill weak'; label.textContent = 'Yếu'; label.className = 'pw-strength-label weak'; }
    else if (score <= 2) { bar.className = 'pw-strength-fill medium'; label.textContent = 'Trung bình'; label.className = 'pw-strength-label medium'; }
    else { bar.className = 'pw-strength-fill strong'; label.textContent = 'Mạnh'; label.className = 'pw-strength-label strong'; }
  }

  function showError(id, msg) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = msg;
    el.style.display = 'block';
    el.closest('.form-group')?.classList.add('has-error');
  }

  function clearErrors() {
    document.querySelectorAll('.form-error').forEach(el => { el.style.display = 'none'; el.textContent = ''; });
    document.querySelectorAll('.form-group.has-error').forEach(el => el.classList.remove('has-error'));
  }

  function setLoading(btn, loading) {
    btn.disabled = loading;
    btn.innerHTML = loading
      ? '<span class="spinner" style="border-top-color:white;"></span> Đang xử lý...'
      : btn.dataset.label || btn.textContent;
    if (!loading && !btn.dataset.label) btn.dataset.label = btn.textContent;
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  return { init, open, close, switchTab };
})();
