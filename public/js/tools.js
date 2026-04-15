// =====================================================
// FLASHCARD.JS — Flashcard Study System
// =====================================================

const FlashcardEngine = (() => {
  let cards = [];
  let currentIndex = 0;
  let known = new Set();
  let dontKnow = new Set();
  let isFlipped = false;
  let shuffled = false;
  let activeChapter = 0; // 0 = all
  let initialized = false;

  function init() {
    cards = [...window.AppData.FLASHCARDS];
    renderChapterFilter();
    renderCard();
    updateStats();
    if (!initialized) {
      setupControls();
      initialized = true;
    }
  }

  function renderChapterFilter() {
    const filter = document.getElementById('fcChapterFilter');
    if (!filter) return;
    const chapters = window.AppData.CHAPTERS;
    filter.innerHTML = `<button class="chapter-filter-btn active" data-ch="0" onclick="FlashcardEngine.filterChapter(0)">Tất cả</button>` +
      chapters.map(c => `<button class="chapter-filter-btn" data-ch="${c.id}" onclick="FlashcardEngine.filterChapter(${c.id})">${c.title}</button>`).join('');
  }

  function filterChapter(chapterId) {
    activeChapter = chapterId;
    document.querySelectorAll('#fcChapterFilter .chapter-filter-btn').forEach(b => {
      b.classList.toggle('active', parseInt(b.dataset.ch) === chapterId);
    });
    if (chapterId === 0) { cards = [...window.AppData.FLASHCARDS]; }
    else { cards = window.AppData.FLASHCARDS.filter(c => c.chapter === chapterId); }
    if (shuffled) shuffleCards();
    currentIndex = 0;
    isFlipped = false;
    known.clear();
    dontKnow.clear();
    renderCard();
    updateStats();
  }

  function setupControls() {
    document.getElementById('fcPrevBtn')?.addEventListener('click', prevCard);
    document.getElementById('fcNextBtn')?.addEventListener('click', nextCard);
    document.getElementById('fcFlipBtn')?.addEventListener('click', flipCard);
    document.getElementById('fcShuffleBtn')?.addEventListener('click', toggleShuffle);
    document.getElementById('fcRestartBtn')?.addEventListener('click', restart);
    document.getElementById('fcKnowBtn')?.addEventListener('click', () => markCard(true));
    document.getElementById('fcDontKnowBtn')?.addEventListener('click', () => markCard(false));

    // Click card to flip
    document.getElementById('flashcardWrapper')?.addEventListener('click', flipCard);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!document.querySelector('#flashcardPage.active')) return;
      if (e.key === 'ArrowLeft') prevCard();
      if (e.key === 'ArrowRight') nextCard();
      if (e.key === ' ') { e.preventDefault(); flipCard(); }
      if (e.key === 'k' || e.key === 'K') markCard(true);
      if (e.key === 'd' || e.key === 'D') markCard(false);
    });
  }

  function flipCard() {
    isFlipped = !isFlipped;
    const wrapper = document.getElementById('flashcardWrapper');
    wrapper?.classList.toggle('flipped', isFlipped);
  }

  function prevCard() {
    if (currentIndex > 0) {
      currentIndex--;
      isFlipped = false;
      document.getElementById('flashcardWrapper')?.classList.remove('flipped');
      renderCard();
    }
  }

  function nextCard() {
    if (currentIndex < cards.length - 1) {
      currentIndex++;
      isFlipped = false;
      document.getElementById('flashcardWrapper')?.classList.remove('flipped');
      renderCard();
    } else {
      showCompletionModal();
    }
  }

  function markCard(isKnown) {
    const card = cards[currentIndex];
    if (isKnown) { known.add(card.id); dontKnow.delete(card.id); }
    else { dontKnow.add(card.id); known.delete(card.id); }
    updateStats();
    // Persist to server if logged in
    if (window.Auth?.isLoggedIn() && window.API) {
      const status = isKnown ? 'known' : 'unknown';
      window.API.progress.updateCard(card.id, status).catch(() => {});
    }
    nextCard();
  }

  function renderCard() {
    const card = cards[currentIndex];
    if (!card) return;

    document.getElementById('fcFront').textContent = card.front;
    document.getElementById('fcBack').innerHTML = card.back.replace(/\n/g, '<br>');
    document.getElementById('fcCurrentNum').textContent = currentIndex + 1;
    document.getElementById('fcTotalNum').textContent = cards.length;

    // Nav buttons
    const prevBtn = document.getElementById('fcPrevBtn');
    const nextBtn = document.getElementById('fcNextBtn');
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = false;

    // Progress bar
    const pct = ((currentIndex + 1) / cards.length) * 100;
    const bar = document.getElementById('fcProgressBar');
    if (bar) bar.style.width = pct + '%';

    // Chapter label
    const ch = window.AppData.CHAPTERS.find(c => c.id === card.chapter);
    const chLabel = document.getElementById('fcChapterLabel');
    if (chLabel) chLabel.textContent = ch ? `${ch.title} • ${ch.icon}` : '';
  }

  function updateStats() {
    const knownEl = document.getElementById('fcKnowCount');
    const dontEl = document.getElementById('fcDontKnowCount');
    const skipEl = document.getElementById('fcSkippedCount');
    if (knownEl) knownEl.textContent = known.size;
    if (dontEl) dontEl.textContent = dontKnow.size;
    const skipped = cards.length - known.size - dontKnow.size;
    if (skipEl) skipEl.textContent = Math.max(0, currentIndex - known.size - dontKnow.size);
  }

  function toggleShuffle() {
    shuffled = !shuffled;
    const btn = document.getElementById('fcShuffleBtn');
    if (btn) { btn.style.background = shuffled ? 'rgba(196,30,58,0.15)' : ''; btn.style.borderColor = shuffled ? 'var(--red-500)' : ''; }
    if (shuffled) shuffleCards();
    else { cards = activeChapter === 0 ? [...window.AppData.FLASHCARDS] : window.AppData.FLASHCARDS.filter(c => c.chapter === activeChapter); }
    currentIndex = 0;
    renderCard();
  }

  function shuffleCards() {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
  }

  function restart() {
    currentIndex = 0;
    isFlipped = false;
    known.clear();
    dontKnow.clear();
    if (shuffled) shuffleCards();
    document.getElementById('flashcardWrapper')?.classList.remove('flipped');
    renderCard();
    updateStats();
    showToast('🔄', 'Đã reset! Bắt đầu lại từ đầu.', 'info');
  }

  function showCompletionModal() {
    const total = cards.length;
    const knownCount = known.size;
    const pct = Math.round((knownCount / total) * 100);
    showToast('🎉', `Hoàn thành! Đã nhớ ${knownCount}/${total} thẻ (${pct}%)`, 'success');
  }

  return { init, filterChapter, flipCard, prevCard, nextCard, markCard };
})();


// =====================================================
// QUIZ.JS — Quiz & Trắc nghiệm Engine
// =====================================================

const QuizEngine = (() => {
  let questions = [];
  let currentQ = 0;
  let score = 0;
  let answered = {};
  let timer = null;
  let timeLeft = 0;
  let quizMode = 'practice';
  let quizStarted = false;
  let activeChapter = 0;
  const TIME_PER_Q = 45;

  function init() {
    renderChapterFilter();
    setupModeCards();
    document.getElementById('startQuizBtn')?.addEventListener('click', startQuiz);
    document.getElementById('nextQuizBtn')?.addEventListener('click', nextQuestion);
    document.getElementById('prevQuizBtn')?.addEventListener('click', prevQuestion);
    document.getElementById('skipBtn')?.addEventListener('click', skipQuestion);
    document.getElementById('restartQuizBtn')?.addEventListener('click', restartQuiz);
    document.getElementById('quizReviewBtn')?.addEventListener('click', reviewQuiz);
  }

  function renderChapterFilter() {
    const filter = document.getElementById('quizChapterFilter');
    if (!filter) return;
    const chapters = window.AppData.CHAPTERS;
    filter.innerHTML = `<button class="chapter-filter-btn active" data-ch="0" onclick="QuizEngine.filterChapter(0)">Tất cả</button>` +
      chapters.map(c => `<button class="chapter-filter-btn" data-ch="${c.id}" onclick="QuizEngine.filterChapter(${c.id})">${c.title}</button>`).join('');
  }

  function filterChapter(chId) {
    activeChapter = chId;
    document.querySelectorAll('#quizChapterFilter .chapter-filter-btn').forEach(b => {
      b.classList.toggle('active', parseInt(b.dataset.ch) === chId);
    });
  }

  function setupModeCards() {
    document.querySelectorAll('.quiz-mode-card').forEach(card => {
      card.addEventListener('click', () => {
        selectMode(card.dataset.mode);
      });
    });
    document.querySelector('.quiz-mode-card')?.classList.add('selected');
  }

  function selectMode(mode) {
    quizMode = mode || 'practice';
    document.querySelectorAll('.quiz-mode-card').forEach(card => {
      card.classList.toggle('selected', card.dataset.mode === quizMode);
    });
  }

  function startQuiz() {
    const all = window.AppData.QUIZ_QUESTIONS;
    const pool = activeChapter === 0 ? all : all.filter(q => q.chapter === activeChapter);
    questions = shuffle([...pool]).slice(0, quizMode === 'exam' ? 15 : quizMode === 'practice' ? 10 : pool.length);
    if (questions.length === 0) { showToast('⚠️', 'Không có câu hỏi cho bộ lọc này.', 'error'); return; }

    currentQ = 0;
    score = 0;
    answered = {};
    quizStarted = true;

    document.getElementById('quizStart').style.display = 'none';
    document.getElementById('quizActive').classList.add('visible');
    document.getElementById('quizResult').classList.remove('visible');

    // Show/hide timer based on mode
    const timerWrap = document.getElementById('quizTimerWrap');
    if (timerWrap) timerWrap.style.display = quizMode === 'exam' ? 'flex' : 'none';

    renderQuestion();
    if (quizMode === 'exam') startTimer();
  }

  function startTimer() {
    timeLeft = questions.length * TIME_PER_Q;
    updateTimerDisplay();
    timer = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();
      if (timeLeft <= 0) { clearInterval(timer); finishQuiz(); }
    }, 1000);
  }

  function updateTimerDisplay() {
    const el = document.getElementById('quizTimerDisplay');
    if (!el) return;
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    el.textContent = `${m}:${s.toString().padStart(2,'0')}`;
    el.closest('.quiz-timer')?.classList.toggle('warning', timeLeft <= 120 && timeLeft > 60);
    el.closest('.quiz-timer')?.classList.toggle('danger', timeLeft <= 60);
  }

  function renderQuestion() {
    const q = questions[currentQ];
    if (!q) return;

    // Update header
    document.getElementById('quizProgressText').innerHTML = `Câu <strong>${currentQ + 1}</strong> / ${questions.length}`;
    document.getElementById('quizScoreDisplay').textContent = `${score} điểm`;

    // Progress bar
    const pct = ((currentQ) / questions.length) * 100;
    const pBar = document.getElementById('quizProgressBar');
    if (pBar) pBar.style.width = pct + '%';

    // Question
    document.getElementById('quizQNumber').textContent = `Câu hỏi ${currentQ + 1}`;
    document.getElementById('quizQText').textContent = q.question;

    // Options
    const optionsEl = document.getElementById('quizOptions');
    optionsEl.innerHTML = q.options.map((opt, i) => `
      <button class="quiz-option" data-index="${i}" onclick="QuizEngine.selectOption(${i})">
        <span class="option-letter">${String.fromCharCode(65 + i)}</span>
        <span>${opt}</span>
      </button>
    `).join('');

    // Restore state if already answered
    const prev = answered[currentQ];
    if (prev !== undefined) {
      showAnswer(prev, q.correct, q.explain);
    }

    // Explanation
    const explEl = document.getElementById('quizExplanation');
    explEl?.classList.remove('visible');

    // Dots
    renderDots();

    // Nav buttons
    document.getElementById('prevQuizBtn').disabled = currentQ === 0;
    document.getElementById('nextQuizBtn').textContent = currentQ === questions.length - 1 ? 'Kết thúc' : 'Tiếp theo →';
  }

  function selectOption(optIdx) {
    if (answered[currentQ] !== undefined) return; // Already answered
    const q = questions[currentQ];
    answered[currentQ] = optIdx;
    if (optIdx === q.correct) score += 10;
    showAnswer(optIdx, q.correct, q.explain);
    renderDots();
    document.getElementById('quizScoreDisplay').textContent = `${score} điểm`;
  }

  function showAnswer(selected, correct, explain) {
    const options = document.querySelectorAll('.quiz-option');
    options.forEach((opt, i) => {
      opt.disabled = true;
      if (i === correct) opt.classList.add('correct');
      else if (i === selected && selected !== correct) opt.classList.add('wrong');
    });
    // Show explanation
    const explEl = document.getElementById('quizExplanation');
    if (explEl) {
      document.getElementById('quizExplainText').textContent = explain;
      explEl.classList.add('visible');
    }
  }

  function nextQuestion() {
    if (currentQ < questions.length - 1) { currentQ++; renderQuestion(); }
    else finishQuiz();
  }

  function prevQuestion() {
    if (currentQ > 0) { currentQ--; renderQuestion(); }
  }

  function skipQuestion() {
    if (answered[currentQ] === undefined) answered[currentQ] = -1; // skipped
    renderDots();
    nextQuestion();
  }

  function renderDots() {
    const el = document.getElementById('quizDots');
    if (!el) return;
    el.innerHTML = questions.map((_, i) => {
      let cls = 'quiz-dot';
      if (i === currentQ) cls += ' current';
      else if (answered[i] !== undefined) {
        if (answered[i] === -1) cls += ' skipped';
        else if (answered[i] === questions[i].correct) cls += ' answered-correct';
        else cls += ' answered-wrong';
      }
      return `<div class="${cls}" onclick="QuizEngine.jumpTo(${i})"></div>`;
    }).join('');
  }

  function jumpTo(idx) { currentQ = idx; renderQuestion(); }

  function finishQuiz() {
    clearInterval(timer);
    quizStarted = false;
    document.getElementById('quizActive').classList.remove('visible');

    const total = questions.length;
    const answeredCount = Object.keys(answered).filter(k => answered[k] !== -1).length;
    const correct = Object.keys(answered).filter(k => answered[k] === questions[k].correct).length;
    const wrong = answeredCount - correct;
    const skipped = total - answeredCount;
    const pct = Math.round((correct / total) * 100);

    document.getElementById('resultPercent').textContent = pct + '%';
    document.getElementById('resultCorrect').textContent = correct;
    document.getElementById('resultWrong').textContent = wrong;
    document.getElementById('resultSkipped').textContent = skipped;
    document.getElementById('resultScore').textContent = score;

    let grade, gradeClass;
    if (pct >= 85) { grade = '🏆 Xuất sắc!'; gradeClass = 'excellent'; }
    else if (pct >= 70) { grade = '✅ Khá tốt!'; gradeClass = 'good'; }
    else if (pct >= 50) { grade = '📚 Cần ôn thêm'; gradeClass = 'average'; }
    else { grade = '💪 Hãy cố lên!'; gradeClass = 'poor'; }

    const gradeEl = document.getElementById('resultGrade');
    gradeEl.textContent = grade;
    gradeEl.className = `result-grade ${gradeClass}`;

    const circle = document.getElementById('resultCircle');
    if (circle) circle.style.setProperty('--pct', pct);

    document.getElementById('quizResult').classList.add('visible');

    // Persist to server if logged in
    if (window.Auth?.isLoggedIn() && window.API) {
      window.API.quiz.submit({
        mode: quizMode,
        chapterId: activeChapter,
        score, correct, wrong, skipped, total,
        timeSpent: quizMode === 'exam' ? (questions.length * 45 - timeLeft) : 0,
      }).then(res => {
        if (res.success) showToast('💾', 'Kết quả đã được lưu vào hồ sơ!', 'success');
      }).catch(() => {});
    }
  }

  function restartQuiz() {
    clearInterval(timer);
    document.getElementById('quizResult').classList.remove('visible');
    document.getElementById('quizActive').classList.remove('visible');
    document.getElementById('quizStart').style.display = '';
  }

  function reviewQuiz() {
    // Show quick review
    showToast('📋', 'Xem lại trong phần Tóm tắt câu hỏi ở dưới.', 'info');
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  return { init, filterChapter, selectMode, selectOption, nextQuestion, prevQuestion, skipQuestion, jumpTo, startQuiz };
})();


// =====================================================
// MINDMAP.JS — Interactive Canvas Mindmap
// =====================================================

const MindmapEngine = (() => {
  let canvas, ctx;
  let offsetX = 0, offsetY = 0;
  let scale = 1;
  let dragging = false;
  let lastMouse = { x: 0, y: 0 };
  let nodes = [];
  let hoveredNode = null;
  let activeTopicId = 0;
  let initialized = false;

  const MINDMAP_DATA = {
    0: {
      label: "Tư tưởng Hồ Chí Minh",
      color: "#c41e3a",
      children: [
        { label: "Nguồn gốc", color: "#8b0000", desc: "Dân tộc, nhân loại, Mác-Lênin", children: [
          { label: "Chủ nghĩa Mác-Lênin", color: "#7b0b0b", desc: "Nguồn gốc chủ yếu nhất" },
          { label: "Truyền thống DT", color: "#7b0b0b", desc: "Yêu nước, nhân nghĩa" },
          { label: "Tinh hoa nhân loại", color: "#7b0b0b", desc: "Đông & Tây phương" },
        ]},
        { label: "Độc lập DT & CNXH", color: "#d4a017", desc: "Hai mục tiêu gắn bó hữu cơ", children: [
          { label: "Độc lập hoàn toàn", color: "#b7791f", desc: "Chính trị, KT, VH, QS" },
          { label: "Gắn với tự do, HP", color: "#b7791f", desc: "Dân được hưởng thành quả" },
          { label: "CNXH – con đường", color: "#b7791f", desc: "Quá độ gián tiếp" },
        ]},
        { label: "Đảng Cộng sản VN", color: "#1565c0", desc: "Thành lập 3/2/1930", children: [
          { label: "Nền tảng Mác-Lênin", color: "#0d47a1", desc: "Kim chỉ nam hành động" },
          { label: "Tập trung dân chủ", color: "#0d47a1", desc: "Nguyên tắc cơ bản nhất" },
          { label: "Gắn bó nhân dân", color: "#0d47a1", desc: "Công bộc của dân" },
        ]},
        { label: "Đại đoàn kết DT", color: "#2e7d32", desc: "Chiến lược cơ bản, lâu dài", children: [
          { label: "Liên minh C-N-TT", color: "#1b5e20", desc: "Nền tảng đoàn kết" },
          { label: "Mặt trận DT TN", color: "#1b5e20", desc: "Hình thức tổ chức" },
          { label: "ĐK quốc tế", color: "#1b5e20", desc: "Đoàn kết trong sáng" },
        ]},
        { label: "Nhà nước & DC", color: "#6a1b9a", desc: "Của dân, do dân, vì dân", children: [
          { label: "Dân là chủ", color: "#4a148c", desc: "Quyền lực nhân dân" },
          { label: "Pháp quyền XHCN", color: "#4a148c", desc: "Thượng tôn pháp luật" },
        ]},
        { label: "VH, Đạo đức, CN", color: "#00838f", desc: "Văn hoá soi đường", children: [
          { label: "5 Đức tính", color: "#006064", desc: "Trung-Cần-Liêm-Thương-QT" },
          { label: "Phong cách HCM", color: "#006064", desc: "Tư duy, Diễn đạt, Ứng xử" },
          { label: "Nói đi đôi làm", color: "#006064", desc: "Nguyên tắc đạo đức" },
        ]},
      ]
    }
  };

  function init() {
    canvas = document.getElementById('mindmapCanvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resizeCanvas();
    renderTopicSelect();
    buildNodes(getMindmapData(activeTopicId));
    if (!initialized) {
      setupInteractions();
      animate();
      window.addEventListener('resize', () => { resizeCanvas(); });
      initialized = true;
    } else {
      draw();
    }
  }

  function getMindmapData(topicId) {
    const source = window.AppData?.MINDMAP_DATA || MINDMAP_DATA;
    if (source[topicId]) return source[topicId];
    const root = source[0] || MINDMAP_DATA[0];
    const chapter = window.AppData?.CHAPTERS?.find(ch => ch.id === topicId);
    const child = root.children?.[topicId - 1];
    if (!chapter || !child) return root;
    return {
      label: chapter.title,
      color: child.color || chapter.color || root.color,
      desc: chapter.subtitle,
      children: [child],
    };
  }

  function renderTopicSelect() {
    const select = document.getElementById('mmTopicSelect');
    if (!select || select.dataset.ready) return;
    const chapters = window.AppData?.CHAPTERS || [];
    select.innerHTML = `<option value="0">🗺️ Toàn bộ hệ thống TTHCM</option>` +
      chapters.map(ch => `<option value="${ch.id}">${ch.icon} ${ch.title}</option>`).join('');
    select.addEventListener('change', () => {
      activeTopicId = parseInt(select.value, 10) || 0;
      buildNodes(getMindmapData(activeTopicId));
      scale = 1;
      offsetX = canvas.width / 2;
      offsetY = canvas.height / 2;
      draw();
    });
    select.dataset.ready = 'true';
  }

  function resizeCanvas() {
    const wrap = canvas.parentElement;
    canvas.width = wrap.clientWidth;
    canvas.height = wrap.clientHeight;
    if (nodes.length) {
      offsetX = canvas.width / 2;
      offsetY = canvas.height / 2;
      draw();
    }
  }

  function buildNodes(data) {
    nodes = [];
    const cx = 0, cy = 0;
    const root = { x: cx, y: cy, label: data.label, color: data.color, desc: 'Hệ thống tư tưởng toàn diện', radius: 55, level: 0, id: 0 };
    nodes.push(root);

    const children = data.children || [];
    const angleStep = (Math.PI * 2) / children.length;
    const orbitR = 220;

    children.forEach((child, i) => {
      const angle = angleStep * i - Math.PI / 2;
      const x = Math.cos(angle) * orbitR;
      const y = Math.sin(angle) * orbitR;
      const childNode = { x, y, label: child.label, color: child.color, desc: child.desc || '', radius: 38, level: 1, parentId: 0, id: i + 1 };
      nodes.push(childNode);

      const subChildren = child.children || [];
      const subAngleStep = subChildren.length > 0 ? (Math.PI * 0.7) / Math.max(subChildren.length - 1, 1) : 0;
      const subR = 130;
      subChildren.forEach((sub, j) => {
        const subAngle = angle - (subChildren.length - 1) * subAngleStep * 0.5 + j * subAngleStep;
        const sx = x + Math.cos(subAngle) * subR;
        const sy = y + Math.sin(subAngle) * subR;
        nodes.push({ x: sx, y: sy, label: sub.label, color: sub.color, desc: sub.desc || '', radius: 26, level: 2, parentId: i + 1, id: nodes.length });
      });
    });

    offsetX = canvas.width / 2;
    offsetY = canvas.height / 2;
  }

  function setupInteractions() {
    canvas.addEventListener('mousedown', (e) => { dragging = true; lastMouse = getPos(e); canvas.style.cursor = 'grabbing'; });
    canvas.addEventListener('mousemove', (e) => {
      const pos = getPos(e);
      if (dragging) {
        offsetX += pos.x - lastMouse.x;
        offsetY += pos.y - lastMouse.y;
        lastMouse = pos;
      }
      // Hover detection
      const worldX = (pos.x - offsetX) / scale;
      const worldY = (pos.y - offsetY) / scale;
      const found = nodes.find(n => Math.hypot(n.x - worldX, n.y - worldY) < n.radius + 5);
      if (found !== hoveredNode) {
        hoveredNode = found;
        updateTooltip(found, pos);
      }
    });
    canvas.addEventListener('mouseup', () => { dragging = false; canvas.style.cursor = 'grab'; });
    canvas.addEventListener('mouseleave', () => { dragging = false; hoveredNode = null; updateTooltip(null); });
    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const factor = e.deltaY > 0 ? 0.9 : 1.1;
      scale = Math.max(0.4, Math.min(2.5, scale * factor));
    }, { passive: false });

    // Touch events for mobile
    let lastTouchDist = null;
    canvas.addEventListener('touchstart', (e) => { if (e.touches.length === 1) { dragging = true; lastMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY }; } }, { passive: true });
    canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && dragging) {
        const pos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        offsetX += pos.x - lastMouse.x; offsetY += pos.y - lastMouse.y; lastMouse = pos;
      } else if (e.touches.length === 2) {
        e.preventDefault();
        const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
        if (lastTouchDist) scale = Math.max(0.4, Math.min(2.5, scale * (d / lastTouchDist)));
        lastTouchDist = d;
      }
    }, { passive: false });
    canvas.addEventListener('touchend', () => { dragging = false; lastTouchDist = null; }, { passive: true });

    // Zoom controls
    document.getElementById('mmZoomIn')?.addEventListener('click', () => { scale = Math.min(2.5, scale * 1.2); });
    document.getElementById('mmZoomOut')?.addEventListener('click', () => { scale = Math.max(0.4, scale * 0.8); });
    document.getElementById('mmReset')?.addEventListener('click', () => { scale = 1; offsetX = canvas.width / 2; offsetY = canvas.height / 2; });
  }

  function updateTooltip(node, pos) {
    const tip = document.getElementById('mmTooltip');
    if (!tip) return;
    if (!node || !node.desc) { tip.classList.remove('visible'); return; }
    tip.querySelector('.mm-tooltip-title').textContent = node.label;
    tip.querySelector('.mm-tooltip-desc').textContent = node.desc;
    tip.style.left = (pos?.x || 0) + 16 + 'px';
    tip.style.top = (pos?.y || 0) + 'px';
    tip.classList.add('visible');
  }

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  let animFrame;
  function animate() {
    draw();
    animFrame = requestAnimationFrame(animate);
  }

  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.scale(scale, scale);

    // Draw connections
    nodes.forEach(node => {
      if (node.parentId === undefined) return;
      const parent = nodes.find(n => n.id === node.parentId);
      if (!parent) return;

      ctx.beginPath();
      ctx.moveTo(parent.x, parent.y);
      // Curved connection
      const cx1 = parent.x + (node.x - parent.x) * 0.5;
      const cy1 = parent.y;
      const cx2 = parent.x + (node.x - parent.x) * 0.5;
      const cy2 = node.y;
      ctx.bezierCurveTo(cx1, cy1, cx2, cy2, node.x, node.y);
      ctx.strokeStyle = hexToRgba(node.color, 0.35);
      ctx.lineWidth = node.level === 1 ? 2 : 1.2;
      ctx.stroke();
    });

    // Draw nodes
    nodes.forEach(node => {
      const isHovered = hoveredNode === node;
      const glow = isHovered ? 1.3 : 1;

      // Glow effect
      if (node.level === 0 || isHovered) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 1.4 * glow, 0, Math.PI * 2);
        const glowGrad = ctx.createRadialGradient(node.x, node.y, node.radius * 0.5, node.x, node.y, node.radius * 1.4 * glow);
        glowGrad.addColorStop(0, hexToRgba(node.color, 0.25));
        glowGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGrad;
        ctx.fill();
      }

      // Node circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius * glow, 0, Math.PI * 2);
      const grad = ctx.createRadialGradient(node.x - node.radius * 0.3, node.y - node.radius * 0.3, 0, node.x, node.y, node.radius * glow);
      grad.addColorStop(0, hexToRgba(node.color, 0.9));
      grad.addColorStop(1, hexToRgba(node.color, 0.6));
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = hexToRgba(node.color, isHovered ? 1 : 0.5);
      ctx.lineWidth = isHovered ? 3 : 2;
      ctx.stroke();

      // Label text
      ctx.fillStyle = 'rgba(255,255,255,0.95)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const fontSize = node.level === 0 ? 13 : node.level === 1 ? 10.5 : 9;
      ctx.font = `${node.level <= 1 ? 'bold' : '500'} ${fontSize}px 'Be Vietnam Pro', Inter, sans-serif`;

      // Word wrap
      const words = node.label.split(' ');
      const maxW = node.radius * 1.6;
      let lines = [], line = '';
      words.forEach(word => {
        const test = line ? line + ' ' + word : word;
        if (ctx.measureText(test).width < maxW) { line = test; }
        else { if (line) lines.push(line); line = word; }
      });
      if (line) lines.push(line);

      const lineH = fontSize + 3;
      lines.forEach((l, i) => ctx.fillText(l, node.x, node.y + (i - (lines.length - 1) / 2) * lineH));
    });

    ctx.restore();
  }

  return { init };
})();
