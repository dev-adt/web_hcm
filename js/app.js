// =====================================================
// APP.JS — Main Application Controller & Router
// =====================================================

// ─── GLOBAL TOAST ───
function showToast(icon, message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span class="toast-msg">${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => { if (toast.parentNode) toast.remove(); }, 300);
  }, 3500);
}

// ─── ROUTER ───
const Router = (() => {
  const pages = {};
  let currentPage = null;

  function register(id, onEnter) { pages[id] = { id, onEnter }; }

  function navigate(id) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const el = document.getElementById(id + 'Page');
    if (!el) { navigate('home'); return; }
    el.classList.add('active');

    // Update nav links
    document.querySelectorAll('.nav-link').forEach(a => {
      a.classList.toggle('active', a.dataset.page === id);
    });

    currentPage = id;
    if (pages[id]?.onEnter) pages[id].onEnter();

    // Update URL hash
    window.location.hash = id;
    window.scrollTo(0, 0);
  }

  function getCurrentPage() { return currentPage; }

  return { register, navigate, getCurrentPage };
})();

// ─── UI CONTROLLER ───
const UIController = (() => {
  function init() {
    setupNavbar();
    setupScrollReveal();
    setupParticles();
    setupCounters();
    setupAccordions();
    setupCaseStudies();
    updateAuthState();
  }

  function setupNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar?.classList.toggle('scrolled', window.scrollY > 20);
    });

    // Nav links
    document.querySelectorAll('[data-page]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const page = el.dataset.page;
        if (page) {
          Router.navigate(page);
          // Close mobile menu if open
          document.getElementById('mobileMenu')?.classList.remove('open');
        }
      });
    });

    // Hamburger
    document.getElementById('hamburgerBtn')?.addEventListener('click', () => {
      document.getElementById('mobileMenu')?.classList.toggle('open');
    });
  }

  function updateAuthState() {
    const user = Auth.getCurrentUser();
    const loginBtn = document.getElementById('navLoginBtn');
    const registerBtn = document.getElementById('navRegisterBtn');
    const userArea = document.getElementById('userDropdown'); // matches the actual HTML id
    const userAvatarEl = document.getElementById('navUserAvatar');
    const userNameEl = document.getElementById('navUserName');

    if (user) {
      if (loginBtn) loginBtn.style.display = 'none';
      if (registerBtn) registerBtn.style.display = 'none';
      if (userArea) userArea.style.display = 'flex';
      if (userAvatarEl) userAvatarEl.textContent = user.avatar;
      if (userNameEl) userNameEl.textContent = user.name;
    } else {
      if (loginBtn) loginBtn.style.display = '';
      if (registerBtn) registerBtn.style.display = '';
      if (userArea) userArea.style.display = 'none';
    }
  }

  function setupScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  function setupParticles() {
    const containers = document.querySelectorAll('.particles');
    containers.forEach(container => {
      for (let i = 0; i < 20; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = 2 + Math.random() * 4;
        const hue = Math.random() > 0.5 ? '#c41e3a' : '#d4a017';
        p.style.cssText = `width:${size}px;height:${size}px;background:${hue};left:${Math.random()*100}%;animation-duration:${10+Math.random()*20}s;animation-delay:-${Math.random()*20}s;`;
        container.appendChild(p);
      }
    });
  }

  function setupCounters() {
    let started = false;
    const counterSection = document.getElementById('statsSection');
    if (!counterSection) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started) {
        started = true;
        animateCounters();
      }
    }, { threshold: 0.3 });
    observer.observe(counterSection);
  }

  function animateCounters() {
    document.querySelectorAll('.counter').forEach(el => {
      const target = parseInt(el.dataset.target || el.textContent);
      const duration = 2000;
      const start = Date.now();
      function update() {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target).toLocaleString('vi-VN');
        if (progress < 1) requestAnimationFrame(update);
      }
      update();
    });
  }

  function setupAccordions() {
    document.querySelectorAll('.accordion-header').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.accordion-item');
        const isOpen = item.classList.contains('open');
        // Close all
        document.querySelectorAll('.accordion-item.open').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });
  }

  function setupCaseStudies() {
    const { CASE_STUDIES } = window.AppData;
    const container = document.getElementById('caseStudyList');
    if (!container) return;

    container.innerHTML = CASE_STUDIES.map((cs, i) => `
      <div class="case-card" id="caseCard${cs.id}">
        <div class="case-card-header" onclick="toggleCase(${cs.id})">
          <div style="flex:1">
            <div class="case-card-meta">
              ${cs.tags.map(t => `<span class="badge badge-red">${t}</span>`).join('')}
            </div>
            <div class="case-card-title">${cs.title}</div>
            <div class="case-card-preview">${cs.context.slice(0, 120)}...</div>
          </div>
          <span class="case-expand-icon">⌄</span>
        </div>
        <div class="case-card-body">
          <div class="case-body-content">
            <div class="case-section-label context">📋 Tình huống</div>
            <div class="case-context-box">${cs.context}</div>
            <div class="case-section-label question">❓ Câu hỏi phân tích</div>
            <div class="case-question-box">${cs.question}</div>
            <div class="case-section-label analysis">✅ Phân tích theo TTHCM</div>
            <div class="case-analysis-box">${cs.analysis}</div>
          </div>
        </div>
      </div>
    `).join('');
  }

  return { init, updateAuthState };
})();

// Global case toggle
function toggleCase(id) {
  const card = document.getElementById('caseCard' + id);
  card?.classList.toggle('expanded');
}

// ─── HERO SECTION ───
function buildHeroSection() {
  // Floating UI mockup in hero
  const heroVisual = document.getElementById('heroVisual');
  if (!heroVisual) return;
  heroVisual.innerHTML = `
    <div style="
      background: rgba(12,12,22,0.9);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 20px;
      padding: 20px;
      backdrop-filter: blur(20px);
      box-shadow: 0 20px 80px rgba(0,0,0,0.6), 0 0 60px rgba(196,30,58,0.15);
      width: 420px;
    ">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">
        <div style="width:36px;height:36px;background:var(--grad-red);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:16px;">⭐</div>
        <div>
          <div style="font-size:0.8rem;font-weight:700;color:var(--text-200);">Trợ lý AI – TTHCM</div>
          <div style="font-size:0.65rem;color:var(--success);display:flex;align-items:center;gap:4px;"><span style="width:6px;height:6px;background:var(--success);border-radius:50%;display:inline-block;"></span>Đang hoạt động</div>
        </div>
      </div>
      
      <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:12px;margin-bottom:10px;font-size:0.78rem;color:var(--text-400);">
        <span style="color:var(--red-400);font-weight:600;">Bạn:</span> Nguồn gốc của Tư tưởng HCM là gì?
      </div>
      <div style="background:rgba(196,30,58,0.06);border:1px solid rgba(196,30,58,0.15);border-radius:12px;padding:12px;margin-bottom:14px;font-size:0.78rem;color:var(--text-300);line-height:1.6;">
        <span style="color:var(--gold-400);font-weight:600;">AI:</span> Tư tưởng HCM có <strong style="color:var(--text-200);">3 nguồn gốc</strong> chính: ① Truyền thống dân tộc, ② Tinh hoa nhân loại, ③ Chủ nghĩa Mác-Lênin — <em style="color:var(--gold-300);">nguồn gốc chủ yếu nhất</em>! 🌟
      </div>
      
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;">
        ${['Đạo đức HCM', 'Độc lập DT', 'CNXH'].map(t => `<span style="padding:4px 10px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:20px;font-size:0.68rem;color:var(--text-500);">📌 ${t}</span>`).join('')}
      </div>
      
      <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:10px 14px;display:flex;align-items:center;gap:8px;">
        <span style="font-size:0.8rem;color:var(--text-600);flex:1;">Hỏi bất kỳ điều gì...</span>
        <div style="width:30px;height:30px;background:var(--grad-red);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:0.75rem;">➤</div>
      </div>
    </div>
  `;
}

// ─── MAIN INIT ───
document.addEventListener('DOMContentLoaded', () => {
  // Init auth
  Auth.init();

  // Flags to prevent re-initialization on every page visit
  let chatInited = false, fcInited = false, quizInited = false, mmInited = false;

  // Register pages
  Router.register('home', () => { setupHomeAnimations(); });
  Router.register('chat', () => { if (!chatInited) { ChatEngine.init(); chatInited = true; } });
  Router.register('flashcard', () => { if (!fcInited) { FlashcardEngine.init(); fcInited = true; } else { FlashcardEngine.init(); } });
  Router.register('quiz', () => { if (!quizInited) { QuizEngine.init(); quizInited = true; } });
  Router.register('mindmap', () => { setTimeout(() => { MindmapEngine.init(); mmInited = true; }, 150); });
  Router.register('casestudy', () => {});
  Router.register('chapters', () => { buildChaptersPage(); });

  // Init UI
  UIController.init();
  AuthUI.init();

  // Auth buttons
  document.getElementById('navLoginBtn')?.addEventListener('click', () => AuthUI.open('login'));
  document.getElementById('navRegisterBtn')?.addEventListener('click', () => AuthUI.open('register'));
  document.getElementById('heroLoginBtn')?.addEventListener('click', () => {
    if (Auth.isLoggedIn()) Router.navigate('chat');
    else AuthUI.open('register');
  });
  document.getElementById('heroChatBtn')?.addEventListener('click', () => {
    if (Auth.isLoggedIn()) Router.navigate('chat');
    else AuthUI.open('login');
  });

  // Logout
  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    Auth.logout();
    UIController.updateAuthState();
    Router.navigate('home');
    showToast('👋', 'Đã đăng xuất. Hẹn gặp lại bạn!', 'info');
  });

  // User avatar dropdown
  document.getElementById('navUserAvatar')?.addEventListener('click', () => {
    document.getElementById('userDropdown')?.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
    }
  });

  // CTA Cards on home
  document.querySelectorAll('[data-navigate]').forEach(el => {
    el.addEventListener('click', () => {
      const page = el.dataset.navigate;
      if (page) {
        if (!Auth.isLoggedIn() && ['chat','flashcard','quiz','mindmap','casestudy'].includes(page)) {
          AuthUI.open('login');
          showToast('🔒', 'Vui lòng đăng nhập để sử dụng tính năng này.', 'error');
        } else {
          Router.navigate(page);
        }
      }
    });
  });

  // Build hero visual
  buildHeroSection();

  // Initial route
  const hash = window.location.hash.replace('#', '');
  Router.navigate(hash && document.getElementById(hash + 'Page') ? hash : 'home');
});

// Home page specific animations
function setupHomeAnimations() {
  // Tool card hover effects
  document.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// Chapters page
function buildChaptersPage() {
  const grid = document.getElementById('chaptersGrid');
  if (!grid) return;
  const { CHAPTERS, FLASHCARDS, QUIZ_QUESTIONS } = window.AppData;
  grid.innerHTML = CHAPTERS.map(ch => {
    const fcCount = FLASHCARDS.filter(f => f.chapter === ch.id).length;
    const qCount = QUIZ_QUESTIONS.filter(q => q.chapter === ch.id).length;
    return `
      <div class="chapter-card reveal" onclick="Router.navigate('flashcard')">
        <div class="chapter-card-icon">${ch.icon}</div>
        <div class="chapter-card-number">Chương ${ch.id}</div>
        <div class="chapter-card-title">${ch.subtitle}</div>
        <div class="chapter-card-stats">
          <div class="chapter-stat">📚 ${fcCount} flashcard</div>
          <div class="chapter-stat">📝 ${qCount} câu hỏi</div>
        </div>
        <div class="progress-bar" style="margin-top:12px">
          <div class="progress-bar-fill" style="width:${30 + Math.random() * 60}%"></div>
        </div>
      </div>
    `;
  }).join('');

  // Re-observe
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
