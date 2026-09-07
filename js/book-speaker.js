/**
 * Junior Coders - Book Text-to-Speech (TTS) Engine
 * Adds interactive audio narration to HTML/CSS and JavaScript textbooks.
 */
(function() {
  'use strict';

  let queue = [];
  let currentIndex = -1;
  let isPaused = false;
  let currentRate = 1.0;
  let preferredVoice = null;

  const loadVoices = () => {
    if (!('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    preferredVoice = voices.find(v => v.lang && v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Online'))) ||
                     voices.find(v => v.lang && v.lang.startsWith('en')) ||
                     voices[0] || null;
  };

  if ('speechSynthesis' in window) {
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  const cleanText = (text) => {
    return (text || '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const clearHighlights = () => {
    document.querySelectorAll('.tts-highlight').forEach(el => el.classList.remove('tts-highlight'));
    document.querySelectorAll('.book-section-speaker-btn.active').forEach(b => b.classList.remove('active'));
  };

  const stopSpeech = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    queue = [];
    currentIndex = -1;
    isPaused = false;
    clearHighlights();
    updateToolbarUI('idle');
  };

  const updateToolbarUI = (state, label = '') => {
    const bar = document.getElementById('book-speaker-bar');
    const mainBtn = document.getElementById('book-speaker-main-btn');
    const statusEl = document.getElementById('book-speaker-status-text');
    if (!bar || !mainBtn) return;

    if (state === 'speaking') {
      bar.classList.add('is-speaking');
      mainBtn.innerHTML = `<span>⏸️</span> Pause`;
      if (statusEl) statusEl.textContent = label ? `Reading: "${label}"` : 'Reading chapter...';
    } else if (state === 'paused') {
      bar.classList.remove('is-speaking');
      mainBtn.innerHTML = `<span>▶️</span> Resume`;
      if (statusEl) statusEl.textContent = 'Paused';
    } else {
      bar.classList.remove('is-speaking');
      mainBtn.innerHTML = `<span>🔊</span> Read Chapter`;
      if (statusEl) statusEl.textContent = label || 'Listen to this chapter';
    }
  };

  const playNextInQueue = () => {
    if (currentIndex >= queue.length - 1) {
      stopSpeech();
      updateToolbarUI('idle', 'Finished reading 🎉');
      return;
    }

    currentIndex++;
    const item = queue[currentIndex];

    clearHighlights();
    if (item.el) {
      item.el.classList.add('tts-highlight');
      item.el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    const snippet = item.text.length > 25 ? item.text.substring(0, 25) + '...' : item.text;
    updateToolbarUI('speaking', snippet);

    const utterance = new SpeechSynthesisUtterance(item.text);
    utterance.rate = currentRate;
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onend = () => {
      if (queue.length > 0 && !isPaused) {
        playNextInQueue();
      }
    };

    utterance.onerror = (e) => {
      if (e.error !== 'canceled') {
        playNextInQueue();
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const buildChapterQueue = (contentArea) => {
    const items = [];
    const elements = contentArea.querySelectorAll('h1, h2, h3, p, li, blockquote');

    elements.forEach(el => {
      if (el.closest('.book-speaker-bar') || el.closest('pre') || el.closest('.js-runner-widget')) return;
      const txt = cleanText(el.innerText);
      if (txt.length > 1) {
        items.push({ el, text: txt });
      }
    });

    return items;
  };

  const startChapterSpeech = (contentArea) => {
    stopSpeech();
    queue = buildChapterQueue(contentArea);
    if (queue.length === 0) return;
    currentIndex = -1;
    isPaused = false;
    playNextInQueue();
  };

  const startSectionSpeech = (headingEl, btnEl, contentArea) => {
    stopSpeech();
    btnEl.classList.add('active');

    const items = [];
    items.push({ el: headingEl, text: cleanText(headingEl.innerText) });

    let nextNode = headingEl.nextElementSibling;
    while (nextNode && !['H1', 'H2', 'H3'].includes(nextNode.tagName)) {
      if (!nextNode.closest('pre') && !nextNode.closest('.js-runner-widget')) {
        if (nextNode.tagName === 'P' || nextNode.tagName === 'BLOCKQUOTE') {
          const txt = cleanText(nextNode.innerText);
          if (txt.length > 1) items.push({ el: nextNode, text: txt });
        } else if (nextNode.tagName === 'UL' || nextNode.tagName === 'OL') {
          nextNode.querySelectorAll('li').forEach(li => {
            const txt = cleanText(li.innerText);
            if (txt.length > 1) items.push({ el: li, text: txt });
          });
        }
      }
      nextNode = nextNode.nextElementSibling;
    }

    queue = items;
    currentIndex = -1;
    isPaused = false;
    playNextInQueue();
  };

  window.initBookSpeaker = function() {
    if (!('speechSynthesis' in window)) return;
    stopSpeech();

    const contentArea = document.getElementById('chapterContent');
    if (!contentArea) return;

    // Remove existing bar if any
    const existingBar = contentArea.querySelector('.book-speaker-bar');
    if (existingBar) existingBar.remove();

    // Create Speaker Toolbar
    const bar = document.createElement('div');
    bar.className = 'book-speaker-bar';
    bar.id = 'book-speaker-bar';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Textbook audio narrator');
    bar.innerHTML = `
      <button type="button" class="book-speaker-btn-main" id="book-speaker-main-btn" title="Read chapter aloud">
        <span>🔊</span> Read Chapter
      </button>
      <button type="button" class="book-speaker-btn-stop" id="book-speaker-stop-btn" title="Stop audio">
        <span>⏹️</span> Stop
      </button>
      <select class="book-speaker-speed-select" id="book-speaker-speed-select" title="Narration speed" aria-label="Reading Speed">
        <option value="0.85">0.85x</option>
        <option value="1.0" selected>1.0x</option>
        <option value="1.25">1.25x</option>
      </select>
      <div class="book-speaker-waveform" aria-hidden="true">
        <span></span><span></span><span></span>
      </div>
      <span class="book-speaker-status" id="book-speaker-status-text">Listen to this chapter</span>
    `;

    // Place toolbar at top of content
    contentArea.prepend(bar);

    const mainBtn = bar.querySelector('#book-speaker-main-btn');
    const stopBtn = bar.querySelector('#book-speaker-stop-btn');
    const speedSelect = bar.querySelector('#book-speaker-speed-select');

    mainBtn.addEventListener('click', () => {
      if (window.speechSynthesis.speaking && !isPaused) {
        window.speechSynthesis.pause();
        isPaused = true;
        updateToolbarUI('paused');
      } else if (isPaused) {
        window.speechSynthesis.resume();
        isPaused = false;
        updateToolbarUI('speaking');
      } else {
        startChapterSpeech(contentArea);
      }
    });

    stopBtn.addEventListener('click', stopSpeech);

    speedSelect.addEventListener('change', (e) => {
      currentRate = parseFloat(e.target.value) || 1.0;
      if (window.speechSynthesis.speaking && !isPaused) {
        if (queue[currentIndex]) {
          window.speechSynthesis.cancel();
          currentIndex--;
          playNextInQueue();
        }
      }
    });

    // Add mini speaker buttons next to every h2 & h3 in chapter
    contentArea.querySelectorAll('h2, h3').forEach(heading => {
      if (heading.querySelector('.book-section-speaker-btn')) return;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'book-section-speaker-btn';
      btn.title = 'Listen to this section';
      btn.setAttribute('aria-label', `Listen to: ${heading.innerText}`);
      btn.innerHTML = '🔊';

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (btn.classList.contains('active') && window.speechSynthesis.speaking) {
          stopSpeech();
        } else {
          startSectionSpeech(heading, btn, contentArea);
        }
      });

      heading.appendChild(btn);
    });
  };

  // Cleanup listeners
  window.addEventListener('beforeunload', () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && window.speechSynthesis && window.speechSynthesis.speaking) {
      stopSpeech();
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    window.initBookSpeaker();
  });
})();
