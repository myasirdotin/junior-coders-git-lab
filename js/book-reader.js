/**
 * Junior Coders: one shared textbook reader for all books (each book-NAME/index.html).
 *
 * Each book's index.html sets window.JC_BOOK (title, colours, part names, filter groups, links, extras) and loads,
 * in this order: js/vendor/marked-*.min.js, ./chapters-bundle.js, js/book-reader.js, then pdf-download.js,
 * tts-voices.js, book-speaker.js and book-pagination.js. This script builds the whole page (phone bar, sidebar,
 * top links, the shared reader control bar of GEMINI.md §7.5, the chapter area) and loads chapters.
 *
 * The chapter menu is built from the offline bundle (scripts/bundle-books.js), so it always matches the files:
 *   - every part-NN-*\/chNN-*.md is a chapter, shown as "N. Title" (title from its "# Chapter N:" heading), key #chN
 *   - other files are shown only when listed in JC_BOOK.extras (projects, reference, teacher guide), with their key
 * Chapter numbers in the address (#ch4) open that chapter; back/forward move between chapters.
 */
(function () {
  'use strict';
  const B = window.JC_BOOK;
  if (!B) return;
  const DATA = window[B.bundle] || {};
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const EMOJI = /\p{Extended_Pictographic}️?/gu;

  // ── colours: one accent per book, used by styles/book-theme.css ──────────────────────────────────────
  const root = document.documentElement.style;
  root.setProperty('--book-accent', B.color);
  root.setProperty('--primary-blue', B.color);
  root.setProperty('--book-accent-light', B.colorSoft);
  root.setProperty('--primary-blue-light', B.colorSoft);
  root.setProperty('--book-accent-dark', B.colorDark);

  // ── table of contents from the bundle ────────────────────────────────────────────────────────────────
  const titleOf = (md) => {
    const m = String(md).match(/^#\s+(.+)$/m);
    return m ? m[1].trim() : '';
  };
  const shortTitle = (h1) => h1
    .replace(/^Chapter\s+\d+\s*:\s*/i, '')
    .replace(EMOJI, '')
    .split(/\s+[—–]\s+/)[0]
    .replace(/\s+\(`[^)]*\)\s*$/, '')
    .trim();
  const partOf = (file) => file.split('/')[0];
  const extrasByFile = {};
  (B.extras || []).forEach((x) => { extrasByFile[x.file] = x; });

  const minutesFor = (md) => {
    const words = String(md).replace(/<details>[\s\S]*?<\/details>/g, ' ').replace(/<[^>]+>/g, ' ')
      .replace(/[#>*_`|~\[\]()!-]+/g, ' ').split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
    return Math.max(1, Math.ceil(words / 185));
  };
  window.JC_CHAPTER_MINUTES = {};
  const entries = [];
  Object.keys(DATA).sort().forEach((file) => {
    window.JC_CHAPTER_MINUTES[file] = minutesFor(DATA[file]);
    const ch = file.match(/^part-\d+[^/]*\/ch0*(\d+)[^/]*\.md$/);
    if (ch) {
      entries.push({ file, key: 'ch' + ch[1], num: +ch[1], label: ch[1] + '. ' + shortTitle(titleOf(DATA[file])), part: partOf(file) });
    } else if (extrasByFile[file]) {
      const x = extrasByFile[file];
      entries.push({ file, key: x.key, label: x.label, part: /^part-\d+/.test(file) ? partOf(file) : '__more' });
    }
  });
  const partOrder = [...new Set(entries.map((e) => e.part))].sort((a, b) => (a === '__more') - (b === '__more') || a.localeCompare(b, 'en', { numeric: true }));
  const partInfo = (p) => {
    if (p === '__more') return { title: B.moreTitle || 'Reference & Teachers', group: '' };
    const conf = (B.parts || {})[p];
    const n = +(p.match(/^part-0*(\d+)/) || [0, 0])[1];
    const pretty = p.replace(/^part-\d+-/, '').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    return { title: 'Part ' + n + ': ' + (conf ? conf[0] : pretty), group: conf ? conf[1] || '' : '' };
  };

  // ── page skeleton ────────────────────────────────────────────────────────────────────────────────────
  const groups = B.groups || {};
  const groupCount = (g) => entries.filter((e) => partInfo(e.part).group === g).length;
  const tabs = Object.keys(groups).length ? `
        <div class="book-subject-tabs" role="group" aria-label="Show part of the book">
          <button type="button" class="subject-tab active" data-group="all" aria-pressed="true">All (${entries.filter((e) => e.num).length})</button>
          ${Object.entries(groups).map(([g, label]) => `<button type="button" class="subject-tab" data-group="${esc(g)}" aria-pressed="false">${esc(label)} (${groupCount(g)})</button>`).join('')}
        </div>` : '';
  const nav = partOrder.map((p) => {
    const info = partInfo(p);
    const items = entries.filter((e) => e.part === p).sort((a, b) => (a.num || 999) - (b.num || 999) || a.file.localeCompare(b.file))
      .map((e) => {
        const m = e.label.match(/^(\d+)\.\s+(.*)$/);
        const text = m ? `<span class="cn-num">${m[1]}</span><span class="cn-title">${esc(m[2])}</span>` : `<span class="cn-title">${esc(e.label)}</span>`;
        const mins = e.num ? `<span class="cn-time" aria-label="${window.JC_CHAPTER_MINUTES[e.file]} minute read">${window.JC_CHAPTER_MINUTES[e.file]} min</span>` : '';
        return `<li class="chapter-nav-item"><a href="#${esc(e.key)}" data-file="${esc(e.file)}" data-label="${esc(e.label)}">${text}${mins}</a></li>`;
      }).join('');
    return `<div class="part-group" data-group="${esc(info.group)}"><div class="part-title">${esc(info.title)}</div><ul class="chapter-nav-list">${items}</ul></div>`;
  }).join('');
  // links to other sites (e.g. Kotlin Playground) open in a new tab so the reader keeps its place
  const ext = (href) => (/^https?:/.test(href) ? ' target="_blank" rel="noopener"' : '');
  const links = (B.links || []).map((l) => `<a href="${esc(l.href)}"${ext(l.href)} class="btn-action">${esc(l.label)}</a>`).join('');

  // the reader's icons: inline SVG in the text colour, one stroke weight (no emoji anywhere, GEMINI §7c)
  const svg = (d) => `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const ICONS = {
    home: svg('<path d="M3 11 12 3l9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/>'),
    speaker: svg('<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/>'),
    stop: svg('<rect x="6" y="6" width="12" height="12" rx="1.5"/>'),
    pause: svg('<path d="M8 5v14M16 5v14"/>'),
    play: svg('<path d="m7 4 13 8-13 8z"/>'),
    book: svg('<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21z"/><path d="M4 19V5.5"/>'),
    plan: svg('<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M9 12h6M9 16h6"/>'),
    download: svg('<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M4 20h16"/>'),
    warn: svg('<path d="M12 3 2 20h20z"/><path d="M12 9v5M12 17h.01"/>')
  };
  window.JC_ICONS = ICONS;   // js/book-speaker.js and js/pdf-download.js use the same icons

  document.body.classList.add('book-theme-body');
  document.body.insertAdjacentHTML('afterbegin', `
  <div class="book-mobile-bar" id="bookMobileBar">
    <button type="button" class="mobile-sidebar-toggle" id="mobileSidebarToggle" aria-label="Open the chapters menu" aria-controls="bookSidebar">
      <span class="toggle-icon">☰</span><span class="toggle-text">Chapters</span>
    </button>
    <div class="mobile-brand-title">${esc(B.short || B.title)}</div>
    <a href="../index.html" class="mobile-home-link" title="Junior Coders home" aria-label="Junior Coders home">${ICONS.home}</a>
  </div>
  <div class="sidebar-backdrop" id="sidebarBackdrop"></div>
  <div class="book-layout">
    <aside class="book-sidebar" id="bookSidebar" aria-label="Chapters">
      <div class="book-return-bar">
        <a href="../index.html" class="book-back-home"><span class="back-icon" aria-hidden="true">←</span><span>Home</span></a>
        <a href="../library/books/index.html" class="book-back-home"><span>All textbooks</span></a>
        <button type="button" class="sidebar-close-btn" id="sidebarCloseBtn" aria-label="Close the chapters menu">✕</button>
      </div>
      <div class="book-brand">
        <div class="book-brand-text">
          <h1>${esc(B.title)}</h1>
          <p class="book-brand-meta"><span class="book-brand-badge">${esc(B.badge)}</span><span class="book-brand-count">${entries.filter((e) => e.num).length} chapters</span></p>
          <p class="book-brand-sub">${esc(B.subtitle)}</p>
        </div>
      </div>
      ${tabs}
      <div class="sidebar-search">
        <input type="search" id="chapterFilter" placeholder="Find a chapter…" aria-label="Find a chapter" autocomplete="off">
      </div>
      <nav id="sidebarNav">${nav}</nav>
    </aside>
    <main class="book-reader">
      <header class="reader-topbar">
        <div class="breadcrumb">
          <a href="../library/books/index.html">Textbooks</a> <span class="sep">›</span>
          <span class="bc-book">${esc(B.short || B.title)}</span> <span class="sep">›</span>
          <span class="current" id="breadcrumbCurrent"></span>
        </div>
        <div class="reader-actions">${links}</div>
      </header>
      <header class="book-reader-header" id="bookReaderHeader" role="region" aria-label="Reader controls">
        <div class="reader-header-main">
          <div class="reader-controls-left">
            <button type="button" class="book-speaker-btn-main" id="book-speaker-main-btn" title="Read the chapter aloud">
              <span class="btn-icon">${ICONS.speaker}</span><span class="btn-text">Read Chapter</span>
            </button>
            <button type="button" class="book-speaker-btn-stop" id="book-speaker-stop-btn" title="Stop reading">
              <span class="btn-icon">${ICONS.stop}</span><span class="btn-text">Stop</span>
            </button>
            <div class="book-speaker-waveform" id="book-speaker-waveform" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
          </div>
          <div class="reader-divider" aria-hidden="true"></div>
          <div class="reader-status-center">
            <div class="reader-chapter-badge">
              <span class="status-dot" style="background: var(--book-accent);"></span>
              <span class="status-text" id="book-speaker-status-text">Ready to read</span>
            </div>
          </div>
          <div class="reader-divider" aria-hidden="true"></div>
          <div class="reader-controls-right">
            <div class="reader-speed-pill">
              <span class="speed-caption">Speed</span>
              <select class="book-speaker-speed-select" id="book-speaker-speed-select" aria-label="Reading speed">
                <option value="0.85">0.85x</option><option value="1.0" selected>1.0x</option>
                <option value="1.25">1.25x</option><option value="1.5">1.5x</option>
              </select>
            </div>
            <button type="button" class="book-reading-mode-toggle-btn" id="book-reading-mode-btn" title="Reading mode: hide everything except the chapter">
              <span class="btn-icon">${ICONS.book}</span><span class="btn-text">Reading Mode</span>
            </button>
            <button type="button" class="book-lesson-plan-btn" id="book-lesson-plan-btn" title="View & print ready-made 45-minute lesson plan for this chapter">
              <span class="btn-icon">${ICONS.plan}</span><span class="btn-text">Lesson Plan</span>
            </button>
            <button type="button" class="book-download-pdf-btn" id="book-download-pdf-btn" title="Download this chapter as a PDF">
              <span class="btn-icon">${ICONS.download}</span><span class="btn-text">Download PDF</span>
            </button>
          </div>
        </div>
      </header>
      <article class="book-article" id="chapterContent" aria-live="polite"></article>
      ${B.scratchpad ? scratchpadHtml() : ''}
    </main>
  </div>
  <div class="jc-plan-modal-backdrop" id="jcPlanModalBackdrop" style="display:none;" aria-hidden="true">
    <div class="jc-plan-modal" role="dialog" aria-modal="true" aria-label="Lesson Plan">
      <div class="jc-plan-modal-bar">
        <div class="jc-plan-modal-title">
          <span class="jc-plan-pill">Educator Resource</span>
          <span class="jc-plan-sub">45-Minute Classroom Lesson Plan</span>
        </div>
        <div class="jc-plan-modal-actions">
          <button type="button" class="jc-plan-print-btn" id="jcPlanPrintBtn" title="Print or save as 1–2 page clean PDF">
            <span class="btn-icon">${ICONS.download}</span>
            <span>Print / Save PDF</span>
          </button>
          <button type="button" class="jc-plan-close-btn" id="jcPlanCloseBtn" aria-label="Close lesson plan">✕</button>
        </div>
      </div>
      <div class="jc-plan-modal-body" id="jcPlanModalBody"></div>
    </div>
  </div>
  <div class="copy-toast" id="copyToast" role="status" aria-live="polite"></div>`);

  // ── sidebar: filters and search ──────────────────────────────────────────────────────────────────────
  document.querySelectorAll('.subject-tab').forEach((tab) => tab.addEventListener('click', () => {
    const g = tab.dataset.group;
    document.querySelectorAll('.subject-tab').forEach((t) => { t.classList.toggle('active', t === tab); t.setAttribute('aria-pressed', String(t === tab)); });
    document.querySelectorAll('.part-group').forEach((pg) => { pg.style.display = g === 'all' || pg.dataset.group === g ? '' : 'none'; });
  }));
  document.getElementById('chapterFilter').addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    document.querySelectorAll('.chapter-nav-item').forEach((li) => { const a = li.querySelector('a'); li.style.display = !q || ((a && a.dataset.label) || li.textContent).toLowerCase().includes(q) ? '' : 'none'; });
    document.querySelectorAll('.part-group').forEach((pg) => {
      pg.style.display = [...pg.querySelectorAll('.chapter-nav-item')].some((li) => li.style.display !== 'none') ? '' : 'none';
    });
  });

  // ── small helpers ────────────────────────────────────────────────────────────────────────────────────
  let toastTimer = null;
  const toast = (msg) => {
    const t = document.getElementById('copyToast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
  };
  const copy = (text, btn) => {
    const done = () => { btn.classList.add('copied'); btn.textContent = 'Copied ✓'; setTimeout(() => { btn.classList.remove('copied'); btn.textContent = 'Copy'; }, 1800); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, () => toast('Select the code and copy it.'));
    else toast('Select the code and copy it.');
  };

  // Code blocks: language label + Copy (diagrams are restyled by js/book-speaker.js); JS book: "Test in Scratchpad"
  const enhanceCode = (area) => {
    area.querySelectorAll('pre').forEach((pre) => {
      if (pre.closest('.code-wrapper')) return;
      const code = pre.querySelector('code');
      const lang = code && (code.className.match(/language-([\w-]+)/) || [])[1] || 'text';
      const wrap = document.createElement('div');
      wrap.className = 'code-wrapper';
      const head = document.createElement('div');
      head.className = 'code-wrapper-header';
      head.innerHTML = `<span class="code-lang-label">${esc(lang)}</span><span class="code-actions"></span>`;
      const actions = head.querySelector('.code-actions');
      const copyBtn = document.createElement('button');
      copyBtn.type = 'button'; copyBtn.className = 'copy-btn'; copyBtn.textContent = 'Copy';
      copyBtn.addEventListener('click', () => copy((code || pre).innerText, copyBtn));
      actions.appendChild(copyBtn);
      if (B.scratchpad && /^(js|javascript)$/i.test(lang)) {
        const tryBtn = document.createElement('button');
        tryBtn.type = 'button'; tryBtn.className = 'copy-btn btn-try-code'; tryBtn.textContent = 'Test in Scratchpad';
        tryBtn.addEventListener('click', () => {
          const input = document.getElementById('jsCodeInput');
          input.value = (code || pre).innerText;
          input.scrollIntoView({ behavior: 'smooth', block: 'center' });
          input.focus();
          toast('Code copied into the scratchpad. Press Run.');
        });
        actions.prepend(tryBtn);
      }
      pre.parentNode.insertBefore(wrap, pre);
      wrap.appendChild(head);
      wrap.appendChild(pre);
    });
  };

  // "Practice this chapter" box at the end of every chapter that has a tool to practise in
  const practiceBox = () => {
    const p = B.practice;
    if (!p) return '';
    return `<aside class="chapter-practice-box"><span class="cp-icon" aria-hidden="true">${esc(p.icon)}</span>` +
      `<div><strong>Practise this chapter</strong><p>${esc(p.text)}</p></div>` +
      `<a class="cp-btn" href="${esc(p.href)}"${ext(p.href)}>${esc(p.label)}</a></aside>`;
  };

  // ── Teacher Lesson Plan Generator & Modal ─────────────────────────────────────────────────────────
  const generateLessonPlanHtml = (file) => {
    const md = DATA[file] || '';
    if (!md) return '<p>No content available for this chapter.</p>';

    // Chapter Title & Number
    const h1Match = md.match(/^#\s+(Chapter\s+(\d+):\s*(.*))$/m);
    const chNum = h1Match ? h1Match[2] : '';
    const chTitle = h1Match ? h1Match[3].trim().replace(/\s+\(`[^)]*\)\s*$/, '') : (B.short || B.title);

    // Part / Unit
    const partFolder = file.split('/')[0];
    const conf = (B.parts || {})[partFolder];
    const partTitle = conf ? conf[0] : partFolder.replace(/^part-\d+-/, '').replace(/-/g, ' ');

    // Helper to clean markdown snippets
    const clean = (s) => String(s || '')
      .replace(/<details>[\s\S]*?<\/details>/g, ' ')
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/`+([^`]+)`+/g, '$1')
      .replace(/`+/g, '')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/[|]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    // Objectives (from ## What You Will Learn)
    const learnMatch = md.match(/^##\s+What You Will Learn([\s\S]*?)(?=^##\s+)/m);
    const rawLearn = learnMatch ? learnMatch[1] : '';
    const objectives = [];
    rawLearn.split('\n').forEach(l => {
      const m = l.match(/^[-*]\s+(.*)$/);
      if (m) {
        const text = clean(m[1]);
        if (text) objectives.push(text);
      }
    });
    if (!objectives.length) {
      objectives.push(`Understand the foundational concepts and terminology of ${chTitle}.`);
      objectives.push(`Construct working examples following proper structure and syntax.`);
      objectives.push(`Apply computational problem-solving to complete guided and independent practice.`);
    }

    // Story / Hook (from ## Real-Life Story)
    const storyMatch = md.match(/^##\s+Real-Life Story([\s\S]*?)(?=^##\s+)/m);
    let hook = 'Introduce the core computing concept using the chapter opening analogy.';
    if (storyMatch) {
      const paras = storyMatch[1].split(/\n\s*\n/).map(s => clean(s)).filter(Boolean);
      if (paras[0]) hook = paras[0].length > 210 ? paras[0].substring(0, 207) + '...' : paras[0];
    }

    // Misconceptions (from ## Common Mistake)
    const mistakeMatch = md.match(/^##\s+Common Mistake([\s\S]*?)(?=^##\s+)/m);
    let mistake = 'Overlooking syntax rules, file structure, or order of execution.';
    if (mistakeMatch) {
      const paras = mistakeMatch[1].split(/\n\s*\n/).map(s => clean(s)).filter(Boolean);
      if (paras[0]) mistake = paras[0].length > 180 ? paras[0].substring(0, 177) + '...' : paras[0];
    }

    // Hands-on Lab Activity (from ## Try It)
    const tryMatch = md.match(/^##\s+Try It([\s\S]*?)(?=^##\s+)/m);
    let lab = 'Complete the hands-on code trial in the interactive development environment.';
    if (tryMatch) {
      const lines = tryMatch[1].split('\n').map(l => l.trim()).filter(Boolean);
      const action = lines.find(l => /^(\d+\.|\*|-)\s+/.test(l)) || lines[0];
      if (action) {
        const cleaned = clean(action.replace(/^(\d+\.|\*|-)\s+/, ''));
        if (cleaned) lab = cleaned.length > 170 ? cleaned.substring(0, 167) + '...' : cleaned;
      }
    }

    // Plenary Diagnostic Question (from ## Practice Level 1)
    const practiceMatch = md.match(/^##\s+Practice([\s\S]*?)$/m);
    let exitQuestion = `Answer Level 1 Recall questions from Chapter ${chNum} to verify core understanding.`;
    if (practiceMatch) {
      const p1 = practiceMatch[1].match(/###\s+Level 1[\s\S]*?(?=(###\s+Level 2|<details>|$))/i);
      if (p1) {
        const qLine = p1[0].split('\n').map(l => l.trim()).find(l => /^\d+\.\s+/.test(l));
        if (qLine) {
          const cleaned = clean(qLine.replace(/^\d+\.\s+/, ''));
          if (cleaned) exitQuestion = cleaned.length > 130 ? cleaned.substring(0, 127) + '...' : cleaned;
        }
      }
    }

    // Recommended Practice Tool
    const tool = B.practice ? B.practice.label : (B.short || B.title) + ' Development Environment';

    return `
      <article class="jc-lesson-plan-sheet">
        <header class="lps-header">
          <div class="lps-branding">
            <span class="lps-school">Junior Coders &bull; Computer Science Curriculum</span>
            <h1 class="lps-title">Lesson Plan: Chapter ${esc(chNum)} &mdash; ${esc(chTitle)}</h1>
          </div>
          <table class="lps-meta-table">
            <tr>
              <th>Subject &amp; Book</th><td>${esc(B.title)}</td>
              <th>Class / Grade</th><td>${esc(B.grades || 'Grades 6–8')}</td>
            </tr>
            <tr>
              <th>Unit / Module</th><td>${esc(partTitle)}</td>
              <th>Period Duration</th><td>45 Minutes (1 Period)</td>
            </tr>
            <tr>
              <th>Teacher Name</th><td>____________________________________</td>
              <th>Date / Session</th><td>______ / ______ / 2026</td>
            </tr>
          </table>
        </header>

        <section class="lps-section">
          <h2>1. Measurable Learning Objectives (SWBAT)</h2>
          <p class="lps-intro">By the end of this 45-minute period, students will be able to:</p>
          <ol class="lps-objectives">
            ${objectives.map(o => `<li>${esc(o)}</li>`).join('')}
          </ol>
        </section>

        <section class="lps-section">
          <h2>2. Required Teaching Aids &amp; Lab Setup</h2>
          <ul class="lps-materials">
            <li><strong>Computing Devices:</strong> Computer lab workstations with Chrome, Edge, or Firefox.</li>
            <li><strong>Demonstration Screen:</strong> Teacher projector / smartboard displaying ${esc(tool)}.</li>
            <li><strong>Student Materials:</strong> Computer science notebooks for key definitions and code blueprints.</li>
          </ul>
        </section>

        <section class="lps-section">
          <h2>3. 45-Minute Instructional Delivery Plan</h2>
          <table class="lps-timeline-table">
            <thead>
              <tr>
                <th style="width:14%;">Time</th>
                <th style="width:22%;">Phase</th>
                <th style="width:32%;">Teacher Activity</th>
                <th style="width:32%;">Student Activity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>0–8 min</strong></td>
                <td><strong>Hook &amp; Real-World Analogy</strong></td>
                <td>Introduce opening analogy: <em>&ldquo;${esc(hook)}&rdquo;</em></td>
                <td>Pair-share thoughts; connect analogy to computing concept.</td>
              </tr>
              <tr>
                <td><strong>8–20 min</strong></td>
                <td><strong>Direct Instruction &amp; Modeling</strong></td>
                <td>Demonstrate core syntax line-by-line on projector; explain rules and architecture.</td>
                <td>Follow on screens/notebooks; record syntax pattern in notes.</td>
              </tr>
              <tr>
                <td><strong>20–26 min</strong></td>
                <td><strong>Common Misconceptions</strong></td>
                <td>Highlight common pitfall: <em>&ldquo;${esc(mistake)}&rdquo;</em></td>
                <td>Identify flawed pattern in sample code; explain correction.</td>
              </tr>
              <tr>
                <td><strong>26–38 min</strong></td>
                <td><strong>Guided &amp; Independent Lab</strong></td>
                <td>Circulate lab assisting students with task: <em>&ldquo;${esc(lab)}&rdquo;</em></td>
                <td>Code independently or in pairs using ${esc(tool)}; test outputs.</td>
              </tr>
              <tr>
                <td><strong>38–45 min</strong></td>
                <td><strong>Plenary &amp; Exit Ticket</strong></td>
                <td>Check comprehension with diagnostic exit question: <em>&ldquo;${esc(exitQuestion)}&rdquo;</em></td>
                <td>Answer exit question; submit exit slip; copy homework task.</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section class="lps-section">
          <h2>4. Differentiated Instruction Strategies</h2>
          <div class="lps-diff-grid">
            <div class="lps-diff-box">
              <h3>Support (Struggling Learners)</h3>
              <p>Provide pre-scaffolded starter code; pair with a peer navigator; focus on Level 1 Recall questions.</p>
            </div>
            <div class="lps-diff-box">
              <h3>Extension (Fast Finishers)</h3>
              <p>Direct to Level 3 Challenge exercise in the textbook; prompt them to extend the feature with creative variations.</p>
            </div>
          </div>
        </section>

        <section class="lps-section">
          <h2>5. Homework &amp; Notebook Task</h2>
          <p>Complete Level 2 Apply questions from Chapter ${esc(chNum)} Practice into class notebooks, along with a 2-sentence summary of what was learned today.</p>
        </section>

        <section class="lps-section">
          <h2>6. Ethical Stewardship &amp; Values (Amānah &amp; 'Ilm Nāfi')</h2>
          <p>Remind students of digital trust (<em>Amānah</em>): caring for computer lab hardware, practicing academic honesty in writing code, and channeling technical skill toward beneficial knowledge (<em>'Ilm Nāfi'</em>) that serves family and community.</p>
        </section>

        <footer class="lps-footer">
          <div class="lps-signatures">
            <div>
              <span>Teacher's Signature:</span>
              <div class="sig-line">_______________________________________</div>
            </div>
            <div>
              <span>HOD / Coordinator Signature:</span>
              <div class="sig-line">_______________________________________</div>
            </div>
          </div>
          <div class="lps-notes">
            <span>Teacher's Post-Lesson Reflection / Notes:</span>
            <div class="notes-box"></div>
          </div>
        </footer>
      </article>
    `;
  };

  const modalBackdrop = document.getElementById('jcPlanModalBackdrop');
  const modalBody = document.getElementById('jcPlanModalBody');
  const openLessonPlanModal = () => {
    if (!current) return;
    modalBody.innerHTML = generateLessonPlanHtml(current);
    modalBackdrop.style.display = 'flex';
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const closeLessonPlanModal = () => {
    modalBackdrop.style.display = 'none';
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  const printLessonPlanFromModal = () => {
    document.body.classList.add('print-lesson-plan-dialog');
    const prevTitle = document.title;
    const h1Match = (DATA[current] || '').match(/^#\s+(Chapter\s+(\d+):\s*(.*))$/m);
    const cleanTitle = h1Match ? ('Ch' + h1Match[2] + '-' + h1Match[3].replace(/[^a-zA-Z0-9\s-]/g, '').trim().replace(/\s+/g, '-')) : 'LessonPlan';
    document.title = 'JuniorCoders-' + (B.short || B.title) + '-LessonPlan-' + cleanTitle;
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        document.body.classList.remove('print-lesson-plan-dialog');
        document.title = prevTitle;
      }, 1000);
    }, 200);
  };

  const planBtn = document.getElementById('book-lesson-plan-btn');
  if (planBtn) planBtn.addEventListener('click', openLessonPlanModal);
  const closeBtn = document.getElementById('jcPlanCloseBtn');
  if (closeBtn) closeBtn.addEventListener('click', closeLessonPlanModal);
  const printBtn = document.getElementById('jcPlanPrintBtn');
  if (printBtn) printBtn.addEventListener('click', printLessonPlanFromModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeLessonPlanModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.style.display !== 'none') closeLessonPlanModal();
  });

  // ── loading a chapter ────────────────────────────────────────────────────────────────────────────────
  const area = document.getElementById('chapterContent');
  const linkFor = (key) => document.querySelector(`#sidebarNav a[href="#${CSS.escape(key)}"]`);
  let current = '';

  function loadChapter(file, link) {
    const md = DATA[file];
    if (md === undefined) {
      area.innerHTML = '<div class="chapter-error"><h2>This chapter could not be loaded</h2><p>The offline chapter file is missing. Run <code>node scripts/bundle-books.js</code> and reload.</p></div>';
      return;
    }
    current = file;
    window.JC_CURRENT_MINUTES = window.JC_CHAPTER_MINUTES[file];
    document.querySelectorAll('.chapter-nav-item').forEach((li) => li.classList.toggle('active', !!link && li.contains(link)));
    area.innerHTML = window.marked.parse(md) + practiceBox();
    enhanceCode(area);
    if (modalBackdrop && modalBackdrop.style.display !== 'none') {
      modalBody.innerHTML = generateLessonPlanHtml(current);
    }
    const part = link ? link.closest('.part-group').querySelector('.part-title').textContent : '';
    document.getElementById('breadcrumbCurrent').textContent = part;
    if (window.initBookSpeaker) window.initBookSpeaker();
    if (window.renderChapterPagination) setTimeout(window.renderChapterPagination, 30);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
  window.loadChapter = loadChapter;   // used by older scripts and links

  document.getElementById('sidebarNav').addEventListener('click', (e) => {
    const a = e.target.closest('a[data-file]');
    if (!a) return;
    // let the link set #chN in the address (so Back works); load straight away for a snappy feel
    loadChapter(a.dataset.file, a);
  });

  const openFromHash = () => {
    let key = decodeURIComponent(location.hash.slice(1)).toLowerCase();
    // old links (and saved "Continue reading" places) to chapters that were renamed, e.g. JS #p11 -> #ch18
    if (B.oldKeys && B.oldKeys[key]) { key = B.oldKeys[key]; history.replaceState(null, '', '#' + key); }
    const a = key && linkFor(key);
    if (a && a.dataset.file !== current) loadChapter(a.dataset.file, a);
    return !!a;
  };
  window.addEventListener('hashchange', openFromHash);
  if (!openFromHash()) {
    const first = document.querySelector('#sidebarNav a[data-file]');
    if (first) { history.replaceState(null, '', first.getAttribute('href')); loadChapter(first.dataset.file, first); }
  }

  // ── JS book: live scratchpad (runs the student's code in this page, prints console.log) ───────────────
  function scratchpadHtml() {
    return `
      <section class="js-runner-widget" id="jsScratchpad" aria-label="JavaScript scratchpad">
        <div class="js-runner-header">
          <div class="js-runner-title-group"><span class="js-runner-title">JavaScript Scratchpad</span><span class="js-runner-badge">Try it here</span></div>
          <div class="js-runner-actions">
            <button type="button" class="btn-scratchpad-clear" id="jsClearBtn">Clear</button>
            <button type="button" class="btn-scratchpad-run" id="jsRunBtn"><span class="run-icon">▶</span><span>Run</span><span class="shortcut-hint">Ctrl+↵</span></button>
          </div>
        </div>
        <div class="js-editor-container"><textarea id="jsCodeInput" spellcheck="false" aria-label="JavaScript code">console.log("Assalamu alaikum! I am learning JavaScript.");</textarea></div>
        <div class="js-console-wrapper"><div class="js-console-header"><span>Console</span><span class="console-status" id="jsConsoleStatus">Ready</span></div>
          <pre class="js-console-output" id="jsConsoleOutput">Console ready.</pre></div>
      </section>`;
  }
  if (B.scratchpad) {
    const input = document.getElementById('jsCodeInput');
    const out = document.getElementById('jsConsoleOutput');
    const status = document.getElementById('jsConsoleStatus');
    const run = () => {
      const lines = [];
      const fmt = (a) => (typeof a === 'object' && a !== null ? JSON.stringify(a) : String(a));
      const fake = { log: (...a) => lines.push(a.map(fmt).join(' ')), error: (...a) => lines.push('Error: ' + a.map(fmt).join(' ')), warn: (...a) => lines.push('Warning: ' + a.map(fmt).join(' ')) };
      try {
        const result = new Function('console', input.value)(fake);
        out.textContent = lines.length ? lines.join('\n') : result !== undefined ? String(result) : '(The code ran with no output.)';
        status.textContent = 'Ran ✓'; status.className = 'console-status ok';
      } catch (e) {
        out.textContent = (lines.length ? lines.join('\n') + '\n' : '') + e.name + ': ' + e.message;
        status.textContent = 'Error'; status.className = 'console-status error';
      }
    };
    document.getElementById('jsRunBtn').addEventListener('click', run);
    document.getElementById('jsClearBtn').addEventListener('click', () => { input.value = ''; out.textContent = 'Console ready.'; status.textContent = 'Cleared'; status.className = 'console-status'; });
    input.addEventListener('keydown', (e) => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); run(); } });
  }
})();
