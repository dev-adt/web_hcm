// =====================================================
// CHAT.JS — AI Chat Engine
// =====================================================

const ChatEngine = (() => {
  let messages = [];
  let currentMode = 'qa';
  let isTyping = false;
  let recognition = null;
  let isRecording = false;
  let chatHistory = [];
  let currentChatId = null;
  const HISTORY_KEY = 'hcm_chat_history';

  function init() {
    loadChatHistory();
    setupEventListeners();
    renderHistory();
    showWelcome();
  }

  function setupEventListeners() {
    const textarea = document.getElementById('chatInput');
    const sendBtn = document.getElementById('chatSendBtn');
    const newChatBtn = document.getElementById('newChatBtn');
    const sidebarToggle = document.getElementById('sidebarToggleBtn');
    const voiceBtn = document.getElementById('chatVoiceBtn');

    // Auto-resize textarea
    textarea.addEventListener('input', () => {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
      sendBtn.disabled = !textarea.value.trim();
    });

    // Send on Enter (Shift+Enter for newline)
    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (textarea.value.trim()) sendMessage();
      }
    });

    sendBtn.addEventListener('click', sendMessage);
    newChatBtn.addEventListener('click', newChat);
    sidebarToggle.addEventListener('click', toggleSidebar);

    // Mode pills
    document.querySelectorAll('.mode-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.mode-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentMode = pill.dataset.mode;
      });
    });

    // Voice input
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SR();
      recognition.lang = 'vi-VN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (e) => {
        textarea.value = e.results[0][0].transcript;
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
        sendBtn.disabled = false;
        stopRecording();
      };
      recognition.onerror = () => stopRecording();
      recognition.onend = () => stopRecording();

      voiceBtn.addEventListener('click', () => {
        if (isRecording) { stopRecording(); } else { startRecording(); }
      });
    } else {
      voiceBtn.style.display = 'none';
    }

    // Topic sidebar items
    document.querySelectorAll('.topic-item').forEach(item => {
      item.addEventListener('click', () => {
        const prompt = item.dataset.prompt;
        if (prompt) {
          document.getElementById('chatInput').value = prompt;
          document.getElementById('chatInput').dispatchEvent(new Event('input'));
          sendMessage();
        }
      });
    });
  }

  function toggleSidebar() {
    const sidebar = document.getElementById('chatSidebar');
    sidebar.classList.toggle('collapsed');
  }

  function startRecording() {
    if (!recognition) return;
    isRecording = true;
    recognition.start();
    const btn = document.getElementById('chatVoiceBtn');
    btn.classList.add('recording');
    btn.title = 'Đang ghi âm... (click để dừng)';
    showToast('🎤', 'Đang lắng nghe...', 'info');
  }

  function stopRecording() {
    if (!recognition) return;
    isRecording = false;
    try { recognition.stop(); } catch (e) {}
    const btn = document.getElementById('chatVoiceBtn');
    btn.classList.remove('recording');
    btn.title = 'Nhập bằng giọng nói';
  }

  function newChat() {
    saveCurrentChat();
    messages = [];
    currentChatId = 'chat_' + Date.now();
    const messagesEl = document.getElementById('chatMessages');
    messagesEl.innerHTML = '';
    showWelcome();
    renderHistory();
  }

  function showWelcome() {
    const messagesEl = document.getElementById('chatMessages');
    const suggesteds = window.AppData.SUGGESTED_PROMPTS;
    const chips = suggesteds.slice(0, 6).map(p =>
      `<button class="chip" onclick="ChatEngine.sendPrompt(this.textContent)">${p}</button>`
    ).join('');

    messagesEl.innerHTML = `
      <div class="chat-welcome animate-fade-in">
        <div class="chat-welcome-icon">⭐</div>
        <h2>Trợ lý học Tư tưởng Hồ Chí Minh</h2>
        <p>Tôi là AI trợ lý chuyên môn học <strong>Tư tưởng Hồ Chí Minh</strong>. Hỏi tôi về bất kỳ nội dung nào trong môn học — từ khái niệm, phân tích đến ôn luyện thi cử.</p>
        <div class="suggested-chips">${chips}</div>
      </div>
    `;
  }

  function sendPrompt(text) {
    document.getElementById('chatInput').value = text;
    document.getElementById('chatInput').dispatchEvent(new Event('input'));
    sendMessage();
  }

  async function sendMessage() {
    const textarea = document.getElementById('chatInput');
    const text = textarea.value.trim();
    if (!text || isTyping) return;

    // Remove welcome screen
    const welcome = document.querySelector('.chat-welcome');
    if (welcome) welcome.remove();

    if (!currentChatId) currentChatId = 'chat_' + Date.now();

    // Add user message
    const userMsg = { role: 'user', text, time: new Date() };
    messages.push(userMsg);
    appendMessage(userMsg);

    // Clear input
    textarea.value = '';
    textarea.style.height = 'auto';
    document.getElementById('chatSendBtn').disabled = true;

    // Scroll to bottom
    scrollToBottom();

    // Show typing indicator
    const typingId = showTypingIndicator();
    isTyping = true;

    // Simulate AI thinking delay (realistic)
    const delay = 800 + Math.random() * 1200;
    await sleep(delay);

    // Get AI response
    const response = getAIResponse(text);
    removeTypingIndicator(typingId);
    isTyping = false;

    const aiMsg = { role: 'assistant', text: response, time: new Date() };
    messages.push(aiMsg);
    appendMessage(aiMsg);
    scrollToBottom();

    // Save to history
    saveCurrentChat();
    renderHistory();
  }

  function getAIResponse(userText) {
    const lower = userText.toLowerCase();
    const { AI_RESPONSES } = window.AppData;

    // Mode-specific prefix
    let modePrefix = '';
    if (currentMode === 'exam') modePrefix = '**[Chế độ Luyện thi]** ';
    if (currentMode === 'explain') modePrefix = '**[Chế độ Giải thích sâu]** ';
    if (currentMode === 'summary') modePrefix = '**[Tóm tắt]** ';

    // Match keywords
    for (const [key, data] of Object.entries(AI_RESPONSES)) {
      if (key === 'default') continue;
      if (data.keywords && data.keywords.some(kw => lower.includes(kw))) {
        return modePrefix + addModeContent(data.response, currentMode, userText);
      }
    }

    // Exam mode: generate quiz question
    if (currentMode === 'exam') {
      return generateExamQuestion(lower);
    }

    return AI_RESPONSES.default.response;
  }

  function addModeContent(baseResponse, mode, question) {
    if (mode === 'exam') {
      return baseResponse + '\n\n---\n### 📝 Câu hỏi ôn tập\nDựa vào nội dung trên, hãy thử trả lời: **' + question + '?**\n\n> 💡 Hãy vào phần **Quiz** để luyện tập với nhiều câu hỏi trắc nghiệm hơn!';
    }
    if (mode === 'summary') {
      return '## 📋 Tóm tắt ngắn gọn\n\n' + baseResponse;
    }
    return baseResponse;
  }

  function generateExamQuestion(text) {
    const questions = window.AppData.QUIZ_QUESTIONS;
    const relevant = questions.filter(q => q.question.toLowerCase().includes(text.split(' ')[0]));
    const q = relevant.length > 0 ? relevant[0] : questions[Math.floor(Math.random() * questions.length)];
    return `## 📝 Câu hỏi luyện thi\n\n**${q.question}**\n\nA. ${q.options[0]}\nB. ${q.options[1]}\nC. ${q.options[2]}\nD. ${q.options[3]}\n\n> Hãy suy nghĩ và trả lời, sau đó tôi sẽ giải thích!\n\n**Đáp án:** ${String.fromCharCode(65 + q.correct)}. ${q.options[q.correct]}\n\n**Giải thích:** ${q.explain}`;
  }

  function appendMessage(msg) {
    const messagesEl = document.getElementById('chatMessages');
    const user = Auth.getCurrentUser();
    const isUser = msg.role === 'user';
    const timeStr = formatTime(msg.time);

    const wrapper = document.createElement('div');
    wrapper.className = `message-wrapper ${isUser ? 'user-message' : ''}`;

    if (isUser) {
      const avatarText = user ? user.avatar : 'U';
      wrapper.innerHTML = `
        <div class="message-avatar user-msg-avatar">${avatarText}</div>
        <div class="message-content">
          <div class="message-bubble user-bubble">${escapeHtml(msg.text)}</div>
          <div class="message-time" style="text-align:right">${timeStr}</div>
        </div>
      `;
    } else {
      wrapper.innerHTML = `
        <div class="message-avatar ai-avatar">AI</div>
        <div class="message-content">
          <div class="message-bubble ai-bubble md-content">${renderMarkdown(msg.text)}</div>
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div class="message-actions">
              <button class="msg-action-btn" title="Thích" onclick="ChatEngine.likeMsg(this)">👍</button>
              <button class="msg-action-btn" title="Không thích" onclick="ChatEngine.dislikeMsg(this)">👎</button>
              <button class="msg-action-btn" title="Sao chép" onclick="ChatEngine.copyMsg(this, '${encodeURIComponent(msg.text)}')">📋</button>
            </div>
            <div class="message-time">${timeStr}</div>
          </div>
        </div>
      `;
    }

    messagesEl.appendChild(wrapper);
  }

  function likeMsg(btn) {
    btn.classList.toggle('liked');
    btn.textContent = btn.classList.contains('liked') ? '❤️' : '👍';
  }

  function dislikeMsg(btn) {
    btn.textContent = '👎';
    showToast('📝', 'Phản hồi đã ghi nhận. Cảm ơn bạn!', 'info');
  }

  function copyMsg(btn, encoded) {
    const text = decodeURIComponent(encoded);
    navigator.clipboard.writeText(text).then(() => {
      btn.classList.add('copied');
      btn.textContent = '✅';
      setTimeout(() => { btn.classList.remove('copied'); btn.textContent = '📋'; }, 2000);
    });
  }

  function showTypingIndicator() {
    const messagesEl = document.getElementById('chatMessages');
    const id = 'typing_' + Date.now();
    const wrapper = document.createElement('div');
    wrapper.className = 'message-wrapper';
    wrapper.id = id;
    wrapper.innerHTML = `
      <div class="message-avatar ai-avatar">AI</div>
      <div class="message-content">
        <div class="typing-bubble">
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
        </div>
      </div>
    `;
    messagesEl.appendChild(wrapper);
    scrollToBottom();
    return id;
  }

  function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  function scrollToBottom() {
    const el = document.getElementById('chatMessages');
    el.scrollTop = el.scrollHeight;
  }

  function saveCurrentChat() {
    if (!currentChatId || messages.length === 0) return;
    const history = loadRawHistory();
    const existing = history.findIndex(h => h.id === currentChatId);
    const preview = messages.find(m => m.role === 'user')?.text || 'Cuộc trò chuyện mới';
    const chatData = { id: currentChatId, preview: preview.slice(0, 50), messages, updatedAt: new Date() };
    if (existing >= 0) { history[existing] = chatData; } else { history.unshift(chatData); }
    if (history.length > 20) history.splice(20);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    chatHistory = history;
  }

  function loadChatHistory() {
    chatHistory = loadRawHistory();
  }

  function loadRawHistory() {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); } catch { return []; }
  }

  function renderHistory() {
    const list = document.getElementById('chatHistoryList');
    if (!list) return;
    if (chatHistory.length === 0) {
      list.innerHTML = '<div class="history-item" style="cursor:default;color:var(--text-600);">Chưa có lịch sử chat</div>';
      return;
    }
    list.innerHTML = chatHistory.slice(0, 10).map(h => `
      <div class="history-item" onclick="ChatEngine.loadChat('${h.id}')" title="${escapeHtml(h.preview)}">
        <span>💬</span>
        <span>${escapeHtml(h.preview)}</span>
      </div>
    `).join('');
  }

  function loadChat(id) {
    const found = chatHistory.find(h => h.id === id);
    if (!found) return;
    saveCurrentChat();
    currentChatId = id;
    messages = found.messages || [];
    const messagesEl = document.getElementById('chatMessages');
    messagesEl.innerHTML = '';
    messages.forEach(m => appendMessage(m));
    scrollToBottom();
  }

  // Minimal markdown renderer
  function renderMarkdown(text) {
    return text
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      // Restore bold/italic markers before escaping interferes
      .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      // Headers
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^# (.+)$/gm, '<h2>$1</h2>')
      // Horizontal rule
      .replace(/^---$/gm, '<hr style="border-color:rgba(255,255,255,0.08);margin:1em 0">')
      // Blockquote
      .replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>')
      // Code inline
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      // Tables (basic)
      .replace(/\|(.+)\|\n\|[-| :]+\|\n((?:\|.+\|\n?)+)/g, (match, header, rows) => {
        const ths = header.split('|').filter(s => s.trim()).map(s => `<th>${s.trim()}</th>`).join('');
        const trs = rows.trim().split('\n').map(row => {
          const tds = row.split('|').filter(s => s.trim()).map(s => `<td>${s.trim()}</td>`).join('');
          return `<tr>${tds}</tr>`;
        }).join('');
        return `<table><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table>`;
      })
      // Lists
      .replace(/^\* (.+)$/gm, '<li>$1</li>')
      .replace(/^• (.+)$/gm, '<li>$1</li>')
      .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
      // Wrap consecutive <li>
      .replace(/((?:<li>.+<\/li>\n?)+)/g, '<ul>$1</ul>')
      // Paragraphs (lines not already wrapped)
      .replace(/^(?!<[htu\/<]|<li|<block|<hr)(.+)$/gm, '<p>$1</p>')
      // Clean up
      .replace(/<\/ul>\n<ul>/g, '')
      .replace(/\n/g, '');
  }

  function escapeHtml(text) {
    return String(text).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function formatTime(date) {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  }

  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  return { init, sendPrompt, sendMessage, likeMsg, dislikeMsg, copyMsg, loadChat, newChat };
})();
