/**
 * Junior Coders - Book Text-to-Speech (TTS) & Reading Mode Engine
 * Enhances HTML/CSS and JavaScript textbooks with audio narration and distraction-free reader mode.
 */
(function() {
  'use strict';

  let queue = [];
  let currentIndex = -1;
  let isPaused = false;
  let currentRate = 1.0;
  let preferredVoice = null;

  // Voice Loading
  const loadVoices = () => {
    if (!('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    preferredVoice = voices.find(v => v.lang && v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Online') || v.name.includes('Jenny') || v.name.includes('Guy'))) ||
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
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    queue = [];
    currentIndex = -1;
    isPaused = false;
    clearHighlights();
    updateToolbarUI('idle');
  };

  const updateToolbarUI = (state, label = '') => {
    const header = document.getElementById('bookReaderHeader') || document.getElementById('book-speaker-bar');
    const mainBtn = document.getElementById('book-speaker-main-btn');
    const statusEl = document.getElementById('book-speaker-status-text');
    if (!mainBtn) return;

    if (state === 'speaking') {
      if (header) header.classList.add('is-speaking');
      mainBtn.classList.add('is-playing');
      mainBtn.innerHTML = `<span class="btn-icon">⏸️</span> <span class="btn-text">Pause</span>`;
      if (statusEl) statusEl.textContent = label ? `Reading: "${label}"` : 'Reading chapter...';
    } else if (state === 'paused') {
      if (header) header.classList.remove('is-speaking');
      mainBtn.classList.remove('is-playing');
      mainBtn.innerHTML = `<span class="btn-icon">▶️</span> <span class="btn-text">Resume</span>`;
      if (statusEl) statusEl.textContent = 'Narration paused';
    } else {
      if (header) header.classList.remove('is-speaking');
      mainBtn.classList.remove('is-playing');
      mainBtn.innerHTML = `<span class="btn-icon">🔊</span> <span class="btn-text">Read Chapter</span>`;
      if (statusEl && label) statusEl.textContent = label;
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

    const snippet = item.text.length > 30 ? item.text.substring(0, 30) + '...' : item.text;
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
    if (!contentArea) return items;
    const elements = contentArea.querySelectorAll('h1, h2, h3, p, li, blockquote');

    elements.forEach(el => {
      if (el.closest('.book-reader-header') || el.closest('.book-speaker-bar') || el.closest('pre') || el.closest('.js-runner-widget') || el.closest('.sidebar-search')) return;
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
      if (!nextNode.closest('pre') && !nextNode.closest('.js-runner-widget') && !nextNode.closest('.book-reader-header')) {
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

  // Attach controls to permanent top bar
  const setupPermanentHeaderControls = () => {
    const mainBtn = document.getElementById('book-speaker-main-btn');
    const stopBtn = document.getElementById('book-speaker-stop-btn');
    const speedSelect = document.getElementById('book-speaker-speed-select');
    const readingBtn = document.getElementById('book-reading-mode-btn');

    if (mainBtn && !mainBtn.dataset.bound) {
      mainBtn.dataset.bound = 'true';
      mainBtn.addEventListener('click', () => {
        const contentArea = document.getElementById('chapterContent');
        if (window.speechSynthesis && window.speechSynthesis.speaking && !isPaused) {
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
    }

    if (stopBtn && !stopBtn.dataset.bound) {
      stopBtn.dataset.bound = 'true';
      stopBtn.addEventListener('click', stopSpeech);
    }

    if (speedSelect && !speedSelect.dataset.bound) {
      speedSelect.dataset.bound = 'true';
      speedSelect.addEventListener('change', (e) => {
        currentRate = parseFloat(e.target.value) || 1.0;
        if (window.speechSynthesis && window.speechSynthesis.speaking && !isPaused) {
          if (queue[currentIndex]) {
            window.speechSynthesis.cancel();
            currentIndex--;
            playNextInQueue();
          }
        }
      });
    }

    if (readingBtn && !readingBtn.dataset.bound) {
      readingBtn.dataset.bound = 'true';
      readingBtn.addEventListener('click', () => {
        if (window.toggleReadingMode) {
          window.toggleReadingMode();
        }
      });
    }

    setupMobileDrawer();
  };

  // Mobile Off-Canvas Drawer Setup
  const setupMobileDrawer = () => {
    const toggleBtn = document.getElementById('mobileSidebarToggle');
    const closeBtn = document.getElementById('sidebarCloseBtn');
    const backdrop = document.getElementById('sidebarBackdrop');
    const sidebar = document.getElementById('bookSidebar');

    const openDrawer = () => {
      if (sidebar) sidebar.classList.add('is-open');
      if (backdrop) backdrop.classList.add('is-active');
      document.body.classList.add('sidebar-open');
    };

    const closeDrawer = () => {
      if (sidebar) sidebar.classList.remove('is-open');
      if (backdrop) backdrop.classList.remove('is-active');
      document.body.classList.remove('sidebar-open');
    };

    if (toggleBtn && !toggleBtn.dataset.bound) {
      toggleBtn.dataset.bound = 'true';
      toggleBtn.addEventListener('click', openDrawer);
    }
    if (closeBtn && !closeBtn.dataset.bound) {
      closeBtn.dataset.bound = 'true';
      closeBtn.addEventListener('click', closeDrawer);
    }
    if (backdrop && !backdrop.dataset.bound) {
      backdrop.dataset.bound = 'true';
      backdrop.addEventListener('click', closeDrawer);
    }

    // Auto-close drawer when clicking any chapter nav link on mobile
    document.querySelectorAll('.chapter-nav-item a').forEach(link => {
      if (!link.dataset.drawerBound) {
        link.dataset.drawerBound = 'true';
        link.addEventListener('click', () => {
          if (window.innerWidth <= 900) {
            closeDrawer();
          }
        });
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeDrawer();
      }
    });
  };

  window.initBookSpeaker = function() {
    stopSpeech();
    setupPermanentHeaderControls();

    const contentArea = document.getElementById('chapterContent');
    if (!contentArea) return;

    // Estimate reading time & chapter title
    const firstH1 = contentArea.querySelector('h1');
    const firstH2 = contentArea.querySelector('h2');
    const titleEl = firstH1 || firstH2;
    const chapterName = titleEl ? cleanText(titleEl.innerText).replace(/^[#\s0-9.]+/, '') : 'Chapter';
    
    const text = cleanText(contentArea.innerText);
    const words = text.split(/\s+/).filter(w => w.length > 0).length;
    const minutes = Math.max(1, Math.ceil(words / 185));

    const statusEl = document.getElementById('book-speaker-status-text');
    if (statusEl) {
      statusEl.textContent = `${chapterName} • ⏱️ ${minutes} min read`;
    }

    // Attach Section Speaker buttons next to all h2 and h3 inside chapter
    contentArea.querySelectorAll('h2, h3').forEach(heading => {
      if (heading.querySelector('.book-section-speaker-btn')) return;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'book-section-speaker-btn';
      btn.title = 'Listen to this section';
      btn.setAttribute('aria-label', `Listen to section: ${heading.innerText}`);
      btn.innerHTML = '🔊';

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (btn.classList.contains('active') && window.speechSynthesis && window.speechSynthesis.speaking) {
          stopSpeech();
        } else {
          startSectionSpeech(heading, btn, contentArea);
        }
      });

      heading.appendChild(btn);
    });

    const rmTimeEl = document.getElementById('rm-read-time');
    if (rmTimeEl) {
      rmTimeEl.textContent = `⏱️ ${minutes} min read`;
    }
  };

  // ═══════════════════════════════════════════════════════════════
  // READING MODE ENGINE
  // ═══════════════════════════════════════════════════════════════
  function initBookReadingMode() {
    const STORAGE_KEY_THEME = 'jc_rm_theme';
    const STORAGE_KEY_SIZE = 'jc_rm_size';
    const STORAGE_KEY_FONT = 'jc_rm_font';

    let currentTheme = localStorage.getItem(STORAGE_KEY_THEME) || 'theme-dark';
    let currentSize = parseFloat(localStorage.getItem(STORAGE_KEY_SIZE)) || 1.15;
    let currentFont = localStorage.getItem(STORAGE_KEY_FONT) || 'font-sans';

    let progressBar = document.getElementById('reading-progress-bar');
    if (!progressBar) {
      progressBar = document.createElement('div');
      progressBar.id = 'reading-progress-bar';
      progressBar.setAttribute('aria-hidden', 'true');
      document.body.prepend(progressBar);
    }

    const updateScrollProgress = () => {
      if (!document.body.classList.contains('reading-mode')) return;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = `${Math.min(100, Math.max(0, percent))}%`;
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });

    const getReadingTime = () => {
      const content = document.getElementById('chapterContent') || document.body;
      const text = content ? (content.innerText || '') : '';
      const words = text.trim().split(/\s+/).length;
      const minutes = Math.max(1, Math.ceil(words / 185));
      return `⏱️ ${minutes} min read`;
    };

    let readingBar = document.getElementById('reading-mode-bar');
    if (!readingBar) {
      readingBar = document.createElement('div');
      readingBar.id = 'reading-mode-bar';
      readingBar.className = 'reading-mode-bar';
      readingBar.setAttribute('role', 'toolbar');
      readingBar.setAttribute('aria-label', 'Reading Mode Controls');
      readingBar.innerHTML = `
        <div class="rm-pill-title">
          <span>📖</span>
          <span>Reader View</span>
        </div>
        <span class="rm-read-time" id="rm-read-time">${getReadingTime()}</span>
        <div class="rm-divider"></div>
        <div class="rm-btn-group" title="Adjust text size">
          <button type="button" class="rm-btn" id="rm-font-minus" title="Smaller font size">A-</button>
          <button type="button" class="rm-btn" id="rm-font-plus" title="Larger font size">A+</button>
        </div>
        <div class="rm-divider"></div>
        <div class="rm-btn-group" title="Reading color theme">
          <button type="button" class="rm-theme-dot rm-theme-dark" data-theme="theme-dark" title="Dark Slate Mode"></button>
          <button type="button" class="rm-theme-dot rm-theme-sepia" data-theme="theme-sepia" title="Warm Sepia Paper"></button>
          <button type="button" class="rm-theme-dot rm-theme-light" data-theme="theme-light" title="Clean Light Mode"></button>
        </div>
        <div class="rm-divider"></div>
        <button type="button" class="rm-btn" id="rm-font-toggle" title="Toggle Serif / Sans-Serif font">Serif</button>
        <button type="button" class="rm-exit-btn" id="rm-exit-btn" title="Exit Reading Mode (Esc)">✕ Exit</button>
      `;
      document.body.appendChild(readingBar);
    }

    const applySettings = () => {
      document.body.classList.remove('theme-dark', 'theme-sepia', 'theme-light');
      document.body.classList.add(currentTheme);

      document.body.classList.remove('font-sans', 'font-serif');
      document.body.classList.add(currentFont);

      document.body.style.setProperty('--reading-font-size', `${currentSize}rem`);

      readingBar.querySelectorAll('.rm-theme-dot').forEach(dot => {
        dot.classList.toggle('active', dot.getAttribute('data-theme') === currentTheme);
      });

      const fontToggleBtn = readingBar.querySelector('#rm-font-toggle');
      if (fontToggleBtn) {
        fontToggleBtn.textContent = currentFont === 'font-serif' ? 'Sans' : 'Serif';
      }

      localStorage.setItem(STORAGE_KEY_THEME, currentTheme);
      localStorage.setItem(STORAGE_KEY_SIZE, currentSize);
      localStorage.setItem(STORAGE_KEY_FONT, currentFont);
    };

    const enterReadingMode = () => {
      document.body.classList.add('reading-mode');
      applySettings();
      const timeEl = readingBar.querySelector('#rm-read-time');
      if (timeEl) timeEl.textContent = getReadingTime();
      updateScrollProgress();

      const readingBtn = document.getElementById('book-reading-mode-btn');
      if (readingBtn) readingBtn.classList.add('is-active');
    };

    const exitReadingMode = () => {
      document.body.classList.remove('reading-mode');
      document.body.classList.remove('theme-dark', 'theme-sepia', 'theme-light', 'font-sans', 'font-serif');
      document.body.style.removeProperty('--reading-font-size');

      const readingBtn = document.getElementById('book-reading-mode-btn');
      if (readingBtn) readingBtn.classList.remove('is-active');
    };

    const toggleReadingMode = () => {
      if (document.body.classList.contains('reading-mode')) {
        exitReadingMode();
      } else {
        enterReadingMode();
      }
    };

    readingBar.querySelector('#rm-font-minus')?.addEventListener('click', () => {
      if (currentSize > 0.9) {
        currentSize = Math.round((currentSize - 0.1) * 10) / 10;
        applySettings();
      }
    });

    readingBar.querySelector('#rm-font-plus')?.addEventListener('click', () => {
      if (currentSize < 1.55) {
        currentSize = Math.round((currentSize + 0.1) * 10) / 10;
        applySettings();
      }
    });

    readingBar.querySelectorAll('.rm-theme-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        currentTheme = dot.getAttribute('data-theme');
        applySettings();
      });
    });

    readingBar.querySelector('#rm-font-toggle')?.addEventListener('click', () => {
      currentFont = currentFont === 'font-serif' ? 'font-sans' : 'font-serif';
      applySettings();
    });

    readingBar.querySelector('#rm-exit-btn')?.addEventListener('click', exitReadingMode);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (document.body.classList.contains('reading-mode')) {
          exitReadingMode();
        }
        if (window.speechSynthesis && window.speechSynthesis.speaking) {
          stopSpeech();
        }
      }
    });

    window.toggleReadingMode = toggleReadingMode;
    window.enterReadingMode = enterReadingMode;
    window.exitReadingMode = exitReadingMode;
  }

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  });

  // Auto initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.initBookSpeaker();
      initBookReadingMode();
    });
  } else {
    window.initBookSpeaker();
    initBookReadingMode();
  }
})();
