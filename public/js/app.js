// =====================================================
// public/js/app.js — Main Application Controller
// =====================================================

// ─── Global Toast ─────────────────────────────────
function showToast(icon, message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span class="toast-msg">${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.classList.add('removing'); setTimeout(() => toast.remove(), 300); }, 3500);
}
window.showToast = showToast;

// ─── Router ───────────────────────────────────────
const Router = (() => {
  const pages = {};
  let currentPage = null;
  const PROTECTED = ['chat', 'flashcard', 'quiz', 'mindmap', 'casestudy', 'chapters'];

  function register(id, onEnter) { pages[id] = { id, onEnter }; }

  function navigate(id) {
    if (PROTECTED.includes(id) && !Auth.isLoggedIn()) {
      AuthUI.open('login');
      showToast('🔒', 'Vui lòng đăng nhập để truy cập tính năng này.', 'error');
      return;
    }
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const el = document.getElementById(id + 'Page');
    if (!el) { navigate('home'); return; }
    el.classList.add('active');
    document.querySelectorAll('.nav-link').forEach(a => a.classList.toggle('active', a.dataset.page === id));
    currentPage = id;
    if (pages[id]?.onEnter) pages[id].onEnter();
    window.location.hash = id;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  return { register, navigate, getCurrentPage: () => currentPage };
})();
window.Router = Router;

// ─── UI Controller ────────────────────────────────
const UIController = (() => {
  function init() {
    setupNavbar();
    setupScrollReveal();
    setupParticles();
    setupCounters();
    setupAccordions();
    updateAuthState();
    buildHeroVisual();
    setupDataNavigate();
  }

  function setupNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => navbar?.classList.toggle('scrolled', window.scrollY > 10));

    document.querySelectorAll('[data-page]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const page = el.dataset.page;
        if (page) Router.navigate(page);
      });
    });

    document.getElementById('hamburgerBtn')?.addEventListener('click', () => {
      document.getElementById('navLinks')?.classList.toggle('mobile-open');
    });
  }

  function setupDataNavigate() {
    document.querySelectorAll('[data-navigate]').forEach(el => {
      el.addEventListener('click', () => Router.navigate(el.dataset.navigate));
    });
  }

  function updateAuthState() {
    const user = Auth.getCurrentUser();
    const loginBtn  = document.getElementById('navLoginBtn');
    const regBtn    = document.getElementById('navRegisterBtn');
    const userArea  = document.getElementById('userDropdown');
    const avatarEl  = document.getElementById('navUserAvatar');
    const nameEl    = document.getElementById('navUserName');

    if (user) {
      if (loginBtn)  loginBtn.style.display  = 'none';
      if (regBtn)    regBtn.style.display    = 'none';
      if (userArea)  userArea.style.display  = 'flex';
      if (avatarEl)  avatarEl.textContent    = user.avatar || 'U';
      if (nameEl)    nameEl.textContent      = user.name;
    } else {
      if (loginBtn)  loginBtn.style.display  = '';
      if (regBtn)    regBtn.style.display    = '';
      if (userArea)  userArea.style.display  = 'none';
    }
  }

  function setupScrollReveal() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  }

  function setupParticles() {
    document.querySelectorAll('.particles').forEach(container => {
      for (let i = 0; i < 18; i++) {
        const p = document.createElement('div'); p.className = 'particle';
        const size = 2 + Math.random() * 4;
        const hue = Math.random() > 0.5 ? '#c41e3a' : '#d4a017';
        p.style.cssText = `width:${size}px;height:${size}px;background:${hue};left:${Math.random()*100}%;animation-duration:${12+Math.random()*15}s;animation-delay:-${Math.random()*20}s;`;
        container.appendChild(p);
      }
    });
  }

  function setupCounters() {
    let done = false;
    const sec = document.getElementById('statsSection');
    if (!sec) return;
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !done) {
        done = true;
        document.querySelectorAll('.counter').forEach(el => {
          const target = parseInt(el.dataset.target || el.textContent);
          const start = Date.now();
          function tick() {
            const p = Math.min((Date.now() - start) / 2000, 1);
            el.textContent = Math.round((1 - Math.pow(1-p, 3)) * target).toLocaleString();
            if (p < 1) requestAnimationFrame(tick);
          }
          tick();
        });
      }
    }, { threshold: 0.3 });
    obs.observe(sec);
  }

  function setupAccordions() {
    document.querySelectorAll('.accordion-header').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.accordion-item');
        const open = item.classList.contains('open');
        document.querySelectorAll('.accordion-item.open').forEach(i => i.classList.remove('open'));
        if (!open) item.classList.add('open');
      });
    });
  }

  function buildHeroVisual() {
    const el = document.getElementById('heroVisual');
    if (!el) return;
    el.innerHTML = `
      <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:22px;backdrop-filter:blur(20px);box-shadow:0 20px 80px rgba(0,0,0,0.4),0 0 60px rgba(196,30,58,0.2);width:420px;max-width:100%">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:18px">
          <div style="width:38px;height:38px;background:linear-gradient(135deg,#C41E3A,#E05A72);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:0 4px 14px rgba(196,30,58,0.4)">⭐</div>
          <div>
            <div style="font-size:0.82rem;font-weight:800;color:white">Trợ lý AI – TTHCM</div>
            <div style="font-size:0.65rem;color:#6EE7B7;display:flex;align-items:center;gap:4px"><span style="width:6px;height:6px;background:#10B981;border-radius:50%;display:inline-block"></span>Đang hoạt động</div>
          </div>
        </div>
        <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:12px;margin-bottom:10px;font-size:0.78rem;color:rgba(255,255,255,0.65)">
          <span style="color:#FCA5A5;font-weight:600">Bạn:</span> Nguồn gốc của Tư tưởng HCM là gì?
        </div>
        <div style="background:rgba(196,30,58,0.12);border:1px solid rgba(196,30,58,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:0.78rem;color:rgba(255,255,255,0.85);line-height:1.6">
          <span style="color:#FCD34D;font-weight:600">AI:</span> Tư tưởng HCM có <strong style="color:white">3 nguồn gốc</strong>: ① Truyền thống dân tộc ② Tinh hoa nhân loại ③ <em style="color:#FCD34D">Chủ nghĩa Mác-Lênin — nguồn gốc chủ yếu nhất!</em> 🌟
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px">
          ${['Đạo đức HCM','Độc lập DT','CNXH'].map(t=>`<span style="padding:4px 10px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.1);border-radius:20px;font-size:0.68rem;color:rgba(255,255,255,0.5)">📌 ${t}</span>`).join('')}
        </div>
        <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:10px 14px;display:flex;align-items:center;gap:8px">
          <span style="font-size:0.8rem;color:rgba(255,255,255,0.35);flex:1">Hỏi bất kỳ điều gì...</span>
          <div style="width:30px;height:30px;background:linear-gradient(135deg,#C41E3A,#E05A72);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:0.75rem">➤</div>
        </div>
      </div>`;
  }

  return { init, updateAuthState };
})();
window.UIController = UIController;

// ─── Case Studies ─────────────────────────────────
function buildCaseStudies() {
  const container = document.getElementById('caseStudyList');
  if (!container || !window.AppData?.CASE_STUDIES) return;
  container.innerHTML = window.AppData.CASE_STUDIES.map(cs => `
    <div class="case-card" id="caseCard${cs.id}">
      <div class="case-card-header" onclick="this.closest('.case-card').classList.toggle('expanded')">
        <div style="flex:1">
          <div class="case-card-meta">${cs.tags.map(t=>`<span class="badge badge-red">${t}</span>`).join('')}</div>
          <div class="case-card-title">${cs.title}</div>
          <div class="case-card-preview">${cs.context.slice(0,120)}...</div>
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
    </div>`).join('');
}

// ─── Chapters Page ─────────────────────────────────
function buildChaptersPage() {
  const grid = document.getElementById('chaptersGrid');
  if (!grid || !window.AppData) return;
  const { CHAPTERS, CHAPTER_CONTENT, FLASHCARDS, QUIZ_QUESTIONS } = window.AppData;
  grid.innerHTML = CHAPTERS.map(ch => {
    const content = CHAPTER_CONTENT[ch.id] || {};
    const fc = FLASHCARDS.filter(f => f.chapter === ch.id).length;
    const q  = QUIZ_QUESTIONS.filter(q => q.chapter === ch.id).length;
    const keyPoints = (content.keyPoints || []).slice(0, 4).map(point => `
      <div class="chapter-stat" style="display:block;text-align:left">
        <strong>${point.icon || '•'} ${point.title}</strong>
        <div style="margin-top:4px;color:var(--text-muted);line-height:1.5">${point.content}</div>
      </div>
    `).join('');
    const quotes = (content.quotes || []).slice(0, 2).map(qt => `
      <blockquote style="margin:12px 0 0;padding:12px 14px;border-left:3px solid var(--red-500);background:rgba(196,30,58,.06);border-radius:8px">
        <div style="font-style:italic;line-height:1.55">${qt.text}</div>
        <div style="font-size:.78rem;color:var(--text-muted);margin-top:6px">${qt.author || ''}</div>
      </blockquote>
    `).join('');
    const milestones = (content.milestones || []).slice(0, 4).map(ms => `
      <div class="chapter-stat"><strong>${ms.year}</strong>: ${ms.event}</div>
    `).join('');
    return `
      <div class="chapter-card reveal">
        <div class="chapter-card-icon">${ch.icon}</div>
        <div class="chapter-card-number">${ch.id === 0 ? ch.title : 'Chương ' + ch.id}</div>
        <div class="chapter-card-title">${ch.subtitle}</div>
        <p style="font-size:.9rem;line-height:1.65;color:var(--text-secondary);margin:12px 0">${content.summary || ''}</p>
        <div class="chapter-card-stats">
          <div class="chapter-stat">📚 ${fc} flashcard</div>
          <div class="chapter-stat">📝 ${q} câu hỏi</div>
        </div>
        <div style="margin-top:14px;display:grid;gap:10px">${keyPoints}</div>
        ${quotes}
        <div style="margin-top:14px;display:grid;gap:8px">${milestones}</div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px">
          <button type="button" class="btn btn-outline" onclick="openChapterTool(${ch.id}, 'flashcard')">Ôn flashcard</button>
          <button type="button" class="btn btn-primary" onclick="openChapterTool(${ch.id}, 'quiz')">Làm quiz</button>
        </div>
      </div>`;
  }).join('');
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ─── Guide Page Logic ──────────────────────────────
function initGuideScrolling() {
  const links = document.querySelectorAll('.guide-nav-link');
  const sections = document.querySelectorAll('.guide-section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { threshold: 0.1, rootMargin: '-20% 0px -60% 0px' });

  sections.forEach(s => observer.observe(s));
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.getAttribute('href').substring(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function openChapterTool(chapterId, tool) {
  if (!Auth.isLoggedIn()) {
    AuthUI.open('login');
    showToast('🔒', 'Vui lòng đăng nhập để học theo chương.', 'error');
    return;
  }

  Router.navigate(tool);
  window.setTimeout(() => {
    if (tool === 'flashcard') {
      FlashcardEngine.filterChapter(chapterId);
      showToast('📚', `Đã mở flashcard Chương ${chapterId}.`, 'success');
      return;
    }

    if (tool === 'quiz') {
      QuizEngine.filterChapter(chapterId);
      QuizEngine.selectMode('chapter');
      QuizEngine.startQuiz();
      showToast('📝', `Bắt đầu quiz Chương ${chapterId}.`, 'success');
    }
  }, 80);
}
window.openChapterTool = openChapterTool;

// ─── Init ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Init subsystems
  Auth.init();
  UIController.init();
  AuthUI.init();

  // Engine init flags
  let chatInited = false, fcInited = false, quizInited = false, mmInited = false;

  // Register pages
  Router.register('home',       () => {});
  Router.register('chat',       () => { if (!chatInited) { ChatEngine.init(); chatInited = true; } });
  Router.register('flashcard',  () => { FlashcardEngine.init(); fcInited = true; });
  Router.register('quiz',       () => { if (!quizInited) { QuizEngine.init(); quizInited = true; } });
  Router.register('mindmap',    () => { setTimeout(() => { MindmapEngine.init(); }, 120); });
  Router.register('casestudy',  () => { buildCaseStudies(); });
  Router.register('chapters',   () => { buildChaptersPage(); });
  Router.register('guide',      () => { initGuideScrolling(); });

  // Nav auth buttons
  document.getElementById('navLoginBtn')?.addEventListener('click', () => AuthUI.open('login'));
  document.getElementById('navRegisterBtn')?.addEventListener('click', () => AuthUI.open('register'));
  document.getElementById('heroStartBtn')?.addEventListener('click', () => Auth.isLoggedIn() ? Router.navigate('chat') : AuthUI.open('register'));
  document.getElementById('heroChatBtn')?.addEventListener('click', () => Auth.isLoggedIn() ? Router.navigate('chat') : AuthUI.open('login'));

  // Logout
  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    Auth.logout(); UIController.updateAuthState(); Router.navigate('home');
    showToast('👋', 'Đã đăng xuất. Hẹn gặp lại!', 'info');
  });

  // User dropdown
  document.getElementById('navUserAvatar')?.addEventListener('click', () => {
    document.getElementById('userDropdown')?.classList.toggle('open');
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.dropdown')) document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
  });

  // Initial route
  const hash = window.location.hash.replace('#', '');
  if (!Auth.isLoggedIn() && ['chat','flashcard','quiz','mindmap','casestudy','chapters'].includes(hash)) {
    Router.navigate('home');
  } else {
    Router.navigate(document.getElementById(hash + 'Page') ? hash : 'home');
  }
});
