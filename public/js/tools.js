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
  let activeChapter = -1; // -1 = all
  let initialized = false;

  function init() {
    activeChapter = -1; // Reset to All
    cards = [...window.AppData.FLASHCARDS];
    renderChapterFilter();
    renderCard();
    updateStats();
    if (!initialized) {
      setupControls();
      initialized = true;
    }
    updateFilterUI(); // Ensure correct button is active
  }

  function updateFilterUI() {
    document.querySelectorAll('#fcChapterFilter .chapter-filter-btn').forEach(b => {
      const val = parseInt(b.dataset.ch);
      b.classList.toggle('active', val === activeChapter);
    });
  }

  function renderChapterFilter() {
    const filter = document.getElementById('fcChapterFilter');
    if (!filter) return;
    const chapters = window.AppData.CHAPTERS;
    filter.innerHTML = `<button class="chapter-filter-btn" data-ch="-1" onclick="FlashcardEngine.filterChapter(-1)">Tất cả</button>` +
      chapters.map(c => `<button class="chapter-filter-btn" data-ch="${c.id}" onclick="FlashcardEngine.filterChapter(${c.id})">${c.title}</button>`).join('');
    updateFilterUI();
  }

  function filterChapter(chapterId) {
    activeChapter = parseInt(chapterId);
    updateFilterUI();
    if (activeChapter === -1) { cards = [...window.AppData.FLASHCARDS]; }
    else { cards = window.AppData.FLASHCARDS.filter(c => c.chapter === activeChapter); }
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
    else { cards = activeChapter === -1 ? [...window.AppData.FLASHCARDS] : window.AppData.FLASHCARDS.filter(c => c.chapter === activeChapter); }
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
  let activeChapter = -1;
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
    filter.innerHTML = `<button class="chapter-filter-btn" data-ch="-1" onclick="QuizEngine.filterChapter(-1)">Tất cả</button>` +
      chapters.map(c => `<button class="chapter-filter-btn" data-ch="${c.id}" onclick="QuizEngine.filterChapter(${c.id})">${c.title}</button>`).join('');
    updateFilterUI();
  }

  function updateFilterUI() {
    document.querySelectorAll('#quizChapterFilter .chapter-filter-btn').forEach(b => {
      const val = parseInt(b.dataset.ch);
      b.classList.toggle('active', val === activeChapter);
    });
  }

  function filterChapter(chId) {
    activeChapter = parseInt(chId);
    updateFilterUI();
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
    const pool = activeChapter === -1 ? all : all.filter(q => q.chapter === activeChapter);
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
  let miniCanvas, miniCtx;
  let offsetX = 0, offsetY = 0;
  let scale = 1;
  let dragging = false;
  let lastMouse = { x: 0, y: 0 };
  let nodes = [];
  let hoveredNode = null;
  let tooltip = { el: null, visible: false, x: 0, y: 0 };
  let initialized = false;
  let searchResults = [];

  // Configuration
  const CONFIG = {
    lerpSpeed: 0.12,
    sectorSize: (Math.PI * 2) / 8, // 8 chapters
    spread: 0.85, // 85% of sector
    dist: [0, 320, 220, 160, 120] // distance by level
  };

  function init() {
    canvas = document.getElementById('mindmapCanvas');
    miniCanvas = document.getElementById('mmMinimapCanvas');
    if (!canvas) return;
    
    ctx = canvas.getContext('2d');
    if (miniCanvas) miniCtx = miniCanvas.getContext('2d');

    resizeCanvas();
    renderTopicSelect();
    
    const startData = window.AppData?.MINDMAP_DATA;
    buildNodes(startData);
    
    if (!initialized) {
      setupInteractions();
      setupSearch();
      requestAnimationFrame(animate);
      window.addEventListener('resize', () => { resizeCanvas(); });
      initialized = true;
    }
  }

  function getMindmapData(topicId) {
    const source = window.AppData?.MINDMAP_DATA;
    if (topicId === 'all') return source;
    
    const chapterId = parseInt(topicId, 10);
    const chapter = window.AppData?.CHAPTERS?.find(ch => ch.id === chapterId);
    
    // In our structure, children[chapterId] is the chapter node
    const child = source.children?.find(c => c.id === `c${chapterId}`) || source.children?.[chapterId];
    
    if (!chapter || !child) return source;
    return {
      label: "Tư tưởng Hồ Chí Minh",
      color: "#C41E3A",
      children: [child],
    };
  }

  function renderTopicSelect() {
    const select = document.getElementById('mmTopicSelect');
    if (!select || select.dataset.ready) return;
    const chapters = window.AppData?.CHAPTERS || [];
    select.innerHTML = `<option value="all">🗺️ Toàn bộ hệ thống TTHCM</option>` +
      chapters.map(ch => `<option value="${ch.id}">${ch.icon} ${ch.title}</option>`).join('');
    
    select.addEventListener('change', () => {
      buildNodes(getMindmapData(select.value));
    });
    select.dataset.ready = 'true';
  }

  function setupSearch() {
    const input = document.getElementById('mmSearchInput');
    const resultsBox = document.getElementById('mmSearchResults');
    if (!input || !resultsBox) return;

    input.addEventListener('input', (e) => {
      const term = e.target.value.trim().toLowerCase();
      if (!term) { resultsBox.classList.remove('active'); return; }

      searchResults = nodes.filter(n => n.label.toLowerCase().includes(term)).slice(0, 10);
      if (searchResults.length > 0) {
        resultsBox.innerHTML = searchResults.map(n => `<div class="mm-search-item" onclick="MindmapEngine.focusNode('${n.path.replace(/'/g, "\\'")}')">${n.label} <span style="font-size:0.7rem;opacity:0.6">• ${n.path.split(' > ').slice(1, -1).join(' > ')}</span></div>`).join('');
        resultsBox.classList.add('active');
      } else {
        resultsBox.innerHTML = '<div class="mm-search-item" style="color:var(--text-muted)">Không tìm thấy kết quả</div>';
        resultsBox.classList.add('active');
      }
    });

    document.addEventListener('click', (e) => {
      if (!input.contains(e.target) && !resultsBox.contains(e.target)) resultsBox.classList.remove('active');
    });
  }

  function focusNode(path) {
    const node = nodes.find(n => n.path === path);
    if (!node) return;
    
    // Close search
    document.getElementById('mmSearchResults')?.classList.remove('active');
    document.getElementById('mmSearchInput').value = '';

    // Zoom and Pan
    scale = 1.2;
    offsetX = canvas.width / 2 - (node.x * scale);
    offsetY = canvas.height / 2 - (node.y * scale);
    
    // Highlight effect
    node.isHighlighted = true;
    setTimeout(() => node.isHighlighted = false, 2000);
  }

  function resizeCanvas() {
    const wrap = canvas.parentElement;
    canvas.width = wrap.clientWidth;
    canvas.height = wrap.clientHeight;
    if (miniCanvas) {
      miniCanvas.width = 160;
      miniCanvas.height = 120;
    }
    offsetX = canvas.width / 2;
    offsetY = canvas.height / 2;
  }

  function buildNodes(data) {
    if (!data) return;
    const oldNodes = [...nodes];
    nodes = [];

    if (!window._mmCollapsedState) window._mmCollapsedState = new Set();

    function processNode(item, px, py, pAngle, level, parentId, inheritedColor, path) {
      const nodePath = path === 'root' ? item.label : path + ' > ' + item.label;
      const isCollapsed = window._mmCollapsedState.has(nodePath);
      
      // Calculate target position
      let targetX, targetY, angle = 0;
      if (level === 0) {
        targetX = 0; targetY = 0;
      } else {
        const dist = CONFIG.dist[level] || 150;
        targetX = px + Math.cos(pAngle) * dist;
        targetY = py + Math.sin(pAngle) * dist;
        angle = pAngle;
      }

      // Restore current positions for smooth LERP
      const existing = oldNodes.find(n => n.path === nodePath);
      const curX = existing ? existing.x : px;
      const curY = existing ? existing.y : py;

      const node = {
        id: nodes.length,
        parentId,
        level,
        label: item.label || '',
        color: item.color || inheritedColor || '#ffffff',
        desc: item.desc || '',
        radius: level === 0 ? 50 : (level === 1 ? 36 : 24),
        x: curX,
        y: curY,
        targetX,
        targetY,
        angle,
        path: nodePath,
        isCollapsed,
        isLeaf: !item.children || item.children.length === 0,
      };
      nodes.push(node);

      if (!isCollapsed && item.children && item.children.length > 0) {
        const count = item.children.length;
        const sectorSize = level === 0 ? (Math.PI * 2) / count : CONFIG.sectorSize * 0.7;
        const startAngle = level === 0 ? -Math.PI / 2 : pAngle - sectorSize / 2;
        const angleStep = count > 1 ? sectorSize / (count - 1) : 0;

        item.children.forEach((child, i) => {
          const currentAngle = level === 0 ? (startAngle + i * sectorSize) : (startAngle + i * angleStep);
          // Chapters get their own colors from CHAPTERS data if not in item
          let nodeColor = child.color || item.color || inheritedColor;
          if (level === 0) {
            const chRef = window.AppData.CHAPTERS.find(c => c.id === i);
            if (chRef) nodeColor = chRef.color;
          }
          processNode(child, targetX, targetY, currentAngle, level + 1, node.id, nodeColor, nodePath);
        });
      }
    }

    processNode(data, 0, 0, 0, 0, undefined, data.color, 'root');
  }

  function setupInteractions() {
    canvas.addEventListener('mousedown', (e) => { 
      const pos = getPos(e);
      const worldX = (pos.x - offsetX) / scale;
      const worldY = (pos.y - offsetY) / scale;
      const target = nodes.find(n => Math.hypot(n.x - worldX, n.y - worldY) < n.radius / scale + 10);
      
      if (target) {
        if (!target.isLeaf) {
          if (window._mmCollapsedState.has(target.path)) window._mmCollapsedState.delete(target.path);
          else window._mmCollapsedState.add(target.path);
          buildNodes(getMindmapData(document.getElementById('mmTopicSelect').value));
        } else {
          showDetailPanel(target);
        }
      } else {
        dragging = true; lastMouse = pos; canvas.style.cursor = 'grabbing'; 
      }
    });

    canvas.addEventListener('mousemove', (e) => {
      const pos = getPos(e);
      if (dragging) {
        offsetX += pos.x - lastMouse.x;
        offsetY += pos.y - lastMouse.y;
        lastMouse = pos;
      }
      const found = nodes.find(n => Math.hypot(n.x - worldX, n.y - worldY) < n.radius + 10); // Buffer for small nodes
      
      if (found !== hoveredNode) {
        hoveredNode = found;
        if (found) {
          updateTooltip(found, pos.x, pos.y);
          // Auto-highlight in search results if applicable
        } else {
          hideTooltip();
        }
      } else if (found) {
        updateTooltip(found, pos.x, pos.y);
      }

      canvas.style.cursor = found ? 'pointer' : (dragging ? 'grabbing' : 'grab');
    });

    canvas.addEventListener('click', (e) => {
        if (dragging) return;
        const pos = getMousePos(canvas, e);
        const worldX = (pos.x - offsetX) / scale;
        const worldY = (pos.y - offsetY) / scale;
        const found = nodes.find(n => Math.hypot(n.x - worldX, n.y - worldY) < n.radius + 10);
        if (found) {
            showDetailPanel(found);
            focusNode(found.id);
        }
    });

    canvas.addEventListener('mouseleave', hideTooltip);

    canvas.addEventListener('mouseup', () => dragging = false);
    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const factor = e.deltaY > 0 ? 0.9 : 1.1;
      scale = Math.max(0.2, Math.min(3, scale * factor));
    }, { passive: false });
  }

  function animate() {
    // Lerp positions
    nodes.forEach(n => {
      n.x += (n.targetX - n.x) * CONFIG.lerpSpeed;
      n.y += (n.targetY - n.y) * CONFIG.lerpSpeed;
    });

    draw();
    drawMinimap();
    requestAnimationFrame(animate);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.scale(scale, scale);

    // Draw connections (bezier)
    nodes.forEach(node => {
      if (node.parentId === undefined) return;
      const p = nodes.find(n => n.id === node.parentId);
      if (!p) return;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      const cp1x = p.x + (node.x - p.x) * 0.5;
      const cp2x = p.x + (node.x - p.x) * 0.5;
      ctx.bezierCurveTo(cp1x, p.y, cp2x, node.y, node.x, node.y);
      ctx.strokeStyle = `rgba(${parseInt(node.color.slice(1,3),16)},${parseInt(node.color.slice(3,5),16)},${parseInt(node.color.slice(5,7),16)},0.3)`;
      ctx.lineWidth = 2 / scale;
      ctx.stroke();
    });

    // Draw nodes
    nodes.forEach(node => {
      const isHovered = hoveredNode === node;
      const glowSize = isHovered ? 1.4 : 1.1;
      
      // Node circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.shadowBlur = isHovered ? 25 : 15;
      ctx.shadowColor = node.color;
      ctx.fill();
      
      // Node Border
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Label (Inside for level 0,1. Outside for others)
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `${node.level === 0 ? 'bold' : 'normal'} ${node.level === 0 ? 14 : 11}px sans-serif`;
      
      if (node.level <= 1) {
        // Wrap text inside circle
        const words = node.label.split(' ');
        let line = '', y = node.y - 6;
        if (words.length > 2) {
          ctx.fillText(words.slice(0, 2).join(' '), node.x, y);
          ctx.fillText(words.slice(2).join(' '), node.x, y + 14);
        } else {
          ctx.fillText(node.label, node.x, node.y);
        }
      } else {
        ctx.textBaseline = 'top';
        ctx.fillText(node.label, node.x, node.y + (node.radius + 8));
      }
    });

    ctx.restore();
  }

  function drawMinimap() {
    if (!miniCtx) return;
    miniCtx.clearRect(0, 0, miniCanvas.width, miniCanvas.height);
    miniCtx.fillStyle = 'rgba(0,0,0,0.5)';
    miniCtx.fillRect(0, 0, miniCanvas.width, miniCanvas.height);

    const miniScale = 0.05;
    miniCtx.save();
    miniCtx.translate(miniCanvas.width / 2, miniCanvas.height / 2);
    miniCtx.scale(miniScale, miniScale);

    nodes.forEach(n => {
      miniCtx.beginPath();
      miniCtx.arc(n.x, n.y, n.radius * 2, 0, Math.PI * 2);
      miniCtx.fillStyle = n.color;
      miniCtx.fill();
    });

    // Viewport box
    miniCtx.strokeStyle = 'white';
    miniCtx.lineWidth = 40;
    miniCtx.strokeRect((-offsetX / scale) , (-offsetY / scale), canvas.width/scale, canvas.height/scale);
    miniCtx.restore();
  }

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function showDetailPanel(node) {
    const panel = document.getElementById('mmDetailPanel');
    if (!panel) return;
    panel.querySelector('.mm-panel-title').textContent = node.label;
    panel.querySelector('.mm-panel-desc').textContent = node.desc || 'Nội dung đang được cập nhật cho phần này...';
    panel.querySelector('.mm-panel-badge').style.backgroundColor = node.color;
    panel.classList.add('active');
    
    panel.querySelector('.mm-panel-close').onclick = () => panel.classList.remove('active');
  }

  function updateTooltip(node, x, y) {
    if (!node) { hideTooltip(); return; }
    let el = document.getElementById('mmCanvasTooltip');
    if (!el) {
      el = document.createElement('div');
      el.id = 'mmCanvasTooltip';
      el.className = 'mm-canvas-tooltip';
      document.body.appendChild(el);
    }
    el.innerHTML = `<strong>${node.label}</strong>${node.desc ? '<p>' + node.desc + '</p>' : '<p style="font-style:italic;opacity:0.7">Di chuyển vào sâu hơn để xem chi tiết</p>'}`;
    
    // Position tooltip to avoid edges
    const rect = canvas.getBoundingClientRect();
    let left = x + 20;
    let top = y + 20;
    if (left + 200 > rect.width) left = x - 220;
    
    el.style.left = left + 'px';
    el.style.top = top + 'px';
    el.classList.add('active');
  }

  function hideTooltip() {
    const el = document.getElementById('mmCanvasTooltip');
    if (el) el.classList.remove('active');
  }

  return { init, focusNode };
})();
