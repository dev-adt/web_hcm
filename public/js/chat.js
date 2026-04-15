// =====================================================
// public/js/chat.js — AI Chat Engine (API-backed)
// =====================================================

const ChatEngine = (() => {
  let currentSessionId = null;
  let isTyping = false;
  let currentMode = 'qa';
  let recognition = null;
  let isRecording = false;
  let sessions = [];

  function init() {
    setupEventListeners();
    loadSessions();
    showWelcome();
  }

  function setupEventListeners() {
    const textarea  = document.getElementById('chatInput');
    const sendBtn   = document.getElementById('chatSendBtn');
    const newChatBtn= document.getElementById('newChatBtn');
    const toggleBtn = document.getElementById('sidebarToggleBtn');
    const voiceBtn  = document.getElementById('chatVoiceBtn');

    textarea.addEventListener('input', () => {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 180) + 'px';
      sendBtn.disabled = !textarea.value.trim();
    });
    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (textarea.value.trim()) sendMessage(); }
    });
    sendBtn.addEventListener('click', sendMessage);
    newChatBtn.addEventListener('click', newChat);
    toggleBtn.addEventListener('click', () => document.getElementById('chatSidebar').classList.toggle('collapsed'));

    document.querySelectorAll('.mode-pill').forEach(p => {
      p.addEventListener('click', () => {
        document.querySelectorAll('.mode-pill').forEach(x => x.classList.remove('active'));
        p.classList.add('active'); currentMode = p.dataset.mode;
      });
    });

    document.querySelectorAll('.topic-item').forEach(item => {
      item.addEventListener('click', () => {
        const prompt = item.dataset.prompt;
        if (prompt) { document.getElementById('chatInput').value = prompt; document.getElementById('chatInput').dispatchEvent(new Event('input')); sendMessage(); }
      });
    });

    // Voice
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SR(); recognition.lang = 'vi-VN'; recognition.continuous = false; recognition.interimResults = false;
      recognition.onresult = (e) => { textarea.value = e.results[0][0].transcript; textarea.dispatchEvent(new Event('input')); stopRecording(); };
      recognition.onerror = () => stopRecording(); recognition.onend = () => stopRecording();
      voiceBtn.addEventListener('click', () => isRecording ? stopRecording() : startRecording());
    } else { voiceBtn.style.display = 'none'; }
  }

  function startRecording() {
    if (!recognition) return;
    isRecording = true; recognition.start();
    const btn = document.getElementById('chatVoiceBtn');
    btn.classList.add('recording'); btn.title = 'Đang nghe... (click để dừng)';
    showToast('🎤', 'Đang lắng nghe bằng giọng nói...', 'info');
  }
  function stopRecording() {
    isRecording = false; try { recognition?.stop(); } catch {}
    const btn = document.getElementById('chatVoiceBtn');
    btn.classList.remove('recording'); btn.title = 'Nhập bằng giọng nói';
  }

  async function loadSessions() {
    if (!Auth.isLoggedIn()) { renderSessions([]); return; }
    const res = await API.chat.getSessions();
    if (res.success) { sessions = res.sessions; renderSessions(sessions); }
  }

  function renderSessions(list) {
    const el = document.getElementById('chatHistoryList');
    if (!el) return;
    if (!list.length) { el.innerHTML = '<div class="history-item" style="cursor:default">Chưa có lịch sử</div>'; return; }
    el.innerHTML = list.slice(0,15).map(s => `
      <button class="history-item ${s.id === currentSessionId ? 'active':''}" onclick="ChatEngine.loadSession('${s.id}')" title="${escHtml(s.title)}">
        💬 ${escHtml(s.title)}
      </button>
    `).join('');
  }

  async function newChat() {
    currentSessionId = null;
    const el = document.getElementById('chatMessages');
    el.innerHTML = '';
    showWelcome();
    renderSessions(sessions);
  }

  async function sendPrompt(text) {
    document.getElementById('chatInput').value = text;
    document.getElementById('chatInput').dispatchEvent(new Event('input'));
    sendMessage();
  }

  async function sendMessage() {
    const textarea = document.getElementById('chatInput');
    const text = textarea.value.trim();
    if (!text || isTyping) return;

    // Require login
    if (!Auth.isLoggedIn()) {
      AuthUI.open('login');
      showToast('🔒', 'Vui lòng đăng nhập để chat với AI.', 'error');
      return;
    }

    // Remove welcome
    document.querySelector('.chat-welcome')?.remove();

    // Create session if needed
    if (!currentSessionId) {
      const res = await API.chat.createSession(currentMode);
      if (!res.success) { showToast('❌', 'Không thể tạo cuộc trò chuyện.', 'error'); return; }
      currentSessionId = res.session.id;
    }

    // Show user message
    appendMessage({ role: 'user', content: text });
    textarea.value = ''; textarea.style.height = 'auto';
    document.getElementById('chatSendBtn').disabled = true;
    scrollToBottom();

    // Typing indicator
    const typingId = showTypingIndicator();
    isTyping = true;

    // Send to API
    const res = await API.chat.sendMessage(currentSessionId, text, currentMode);
    removeTypingIndicator(typingId);
    isTyping = false;

    if (!res.success) {
      showToast('❌', res.message || 'Lỗi khi gửi tin nhắn.', 'error');
      return;
    }

    appendMessage(res.aiMessage);
    scrollToBottom();
    await loadSessions();
  }

  async function loadSession(id) {
    if (!Auth.isLoggedIn()) return;
    currentSessionId = id;
    const res = await API.chat.getSession(id);
    if (!res.success) { showToast('❌', 'Không thể tải cuộc trò chuyện.', 'error'); return; }
    const el = document.getElementById('chatMessages');
    el.innerHTML = '';
    res.messages.forEach(m => appendMessage(m));
    scrollToBottom();
    renderSessions(sessions);
  }

  function showWelcome() {
    const el = document.getElementById('chatMessages');
    const chips = (window.AppData?.SUGGESTED_PROMPTS || [
      'Nguồn gốc Tư tưởng HCM là gì?',
      '5 đức tính cơ bản đạo đức HCM?',
      'Câu nói nổi tiếng của Hồ Chí Minh?',
      'Đại đoàn kết dân tộc có vai trò gì?',
      'Đảng CSVN thành lập khi nào?',
      'CNXH theo HCM là gì?',
    ]).slice(0,6).map(p => `<button class="chip" onclick="ChatEngine.sendPrompt(this.textContent)">${p}</button>`).join('');

    el.innerHTML = `
      <div class="chat-welcome animate-fade-in">
        <div class="chat-welcome-icon">⭐</div>
        <h2>Trợ lý học Tư tưởng Hồ Chí Minh</h2>
        <p>Hỏi bất kỳ câu hỏi nào về <strong>Tư tưởng Hồ Chí Minh</strong> — từ lý luận, phân tích đến ôn thi. AI sẽ giải đáp tức thì.</p>
        <div class="suggested-chips">${chips}</div>
      </div>
    `;
  }

  function appendMessage(msg) {
    const el = document.getElementById('chatMessages');
    const user = Auth.getCurrentUser();
    const isUser = msg.role === 'user';
    const content = msg.content || msg.text || '';
    const wrapper = document.createElement('div');
    wrapper.className = `message-wrapper ${isUser ? 'user-message' : ''}`;

    if (isUser) {
      wrapper.innerHTML = `
        <div class="message-avatar user-msg-avatar">${user?.avatar || 'U'}</div>
        <div class="message-content">
          <div class="message-bubble user-bubble">${escHtml(content)}</div>
          <div class="message-time" style="text-align:right">${formatTime(msg.created_at)}</div>
        </div>`;
    } else {
      wrapper.innerHTML = `
        <div class="message-avatar ai-avatar">AI</div>
        <div class="message-content">
          <div class="message-bubble ai-bubble md-content">${renderMarkdown(content)}</div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-top:4px">
            <div class="message-actions">
              <button class="msg-action-btn" onclick="this.textContent=this.textContent==='❤️'?'👍':'❤️';this.classList.toggle('liked')">👍</button>
              <button class="msg-action-btn" onclick="navigator.clipboard.writeText(${JSON.stringify(content)}).then(()=>{this.textContent='✅';setTimeout(()=>this.textContent='📋',2000)})">📋</button>
            </div>
            <div class="message-time">${formatTime(msg.created_at)}</div>
          </div>
        </div>`;
    }
    el.appendChild(wrapper);
  }

  function showTypingIndicator() {
    const el = document.getElementById('chatMessages');
    const id = 'typing_' + Date.now();
    const div = document.createElement('div');
    div.className = 'message-wrapper'; div.id = id;
    div.innerHTML = `<div class="message-avatar ai-avatar">AI</div><div class="message-content"><div class="typing-bubble"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div></div>`;
    el.appendChild(div); scrollToBottom(); return id;
  }
  function removeTypingIndicator(id) { document.getElementById(id)?.remove(); }
  function scrollToBottom() { const el = document.getElementById('chatMessages'); el.scrollTop = el.scrollHeight; }

  function renderMarkdown(text) {
    return text
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/\*\*\*(.+?)\*\*\*/g,'<strong><em>$1</em></strong>')
      .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
      .replace(/\*(.+?)\*/g,'<em>$1</em>')
      .replace(/^### (.+)$/gm,'<h3>$1</h3>')
      .replace(/^## (.+)$/gm,'<h2>$1</h2>')
      .replace(/^# (.+)$/gm,'<h2>$1</h2>')
      .replace(/^---$/gm,'<hr>')
      .replace(/^&gt; (.+)$/gm,'<blockquote>$1</blockquote>')
      .replace(/`([^`]+)`/g,'<code>$1</code>')
      .replace(/^\* (.+)$/gm,'<li>$1</li>')
      .replace(/^• (.+)$/gm,'<li>$1</li>')
      .replace(/^\d+\. (.+)$/gm,'<li>$1</li>')
      .replace(/((?:<li>.+<\/li>\n?)+)/g,'<ul>$1</ul>')
      .replace(/^(?!<[hul\/<]|<block|<hr)(.+)$/gm,'<p>$1</p>')
      .replace(/<\/ul>\n<ul>/g,'')
      .replace(/\n/g,'');
  }

  function escHtml(t) { return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function formatTime(d) { if (!d) return new Date().toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'}); return new Date(d).toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'}); }

  return { init, sendPrompt, sendMessage, newChat, loadSession };
})();

window.ChatEngine = ChatEngine;
