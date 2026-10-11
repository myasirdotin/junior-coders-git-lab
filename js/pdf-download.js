/**
 * Junior Coders — Unified Lesson & Textbook PDF Download Engine
 * Enables instant one-click downloading of textbook chapters, learning modules,
 * and cheat sheets as crystal-clear, distraction-free educational PDFs.
 */

(function () {
    'use strict';

    // Site root = the folder above /js/, taken from this script's own URL, so it works
    // at a domain root (Vercel) and in a subfolder (http://localhost/junior-coders-git-lab/).
    const SITE_ROOT = document.currentScript && document.currentScript.src
        ? new URL('../', document.currentScript.src).href
        : null;

    /* ── Subject Configurations ── */
    const CONFIG = {
        subjects: {
            html:           { color: '#ea580c', emoji: '🌐', label: 'HTML' },
            css:            { color: '#2563eb', emoji: '🎨', label: 'CSS' },
            javascript:     { color: '#ca8a04', emoji: '⚡', label: 'JavaScript' },
            js:             { color: '#ca8a04', emoji: '⚡', label: 'JavaScript' },
            cmd:            { color: '#10b981', emoji: '💻', label: 'Terminal-CMD' },
            terminal:       { color: '#10b981', emoji: '💻', label: 'Terminal-CMD' },
            git:            { color: '#f05032', emoji: '🐙', label: 'Git-GitHub' },
            github:         { color: '#f05032', emoji: '🐙', label: 'Git-GitHub' },
            php:            { color: '#6d28d9', emoji: '🐘', label: 'PHP' },
            mysql:          { color: '#0284c7', emoji: '🗄️', label: 'MySQL' },
            sql:            { color: '#0284c7', emoji: '🗄️', label: 'SQL' },
            laravel:        { color: '#dc2626', emoji: '🔥', label: 'Laravel' },
            python:         { color: '#3b82f6', emoji: '🐍', label: 'Python' },
            ai:             { color: '#8b5cf6', emoji: '🤖', label: 'AI-Lab' },
            network:        { color: '#0284c7', emoji: '🌐', label: 'Networking' },
            cybersecurity:  { color: '#dc2626', emoji: '🛡️', label: 'Cybersecurity' },
            cyber:          { color: '#dc2626', emoji: '🛡️', label: 'Cybersecurity' },
            default:        { color: '#4f46e5', emoji: '📄', label: 'Lesson' }
        }
    };

    /* ── Detect current subject ── */
    function detectSubject() {
        const text = (document.title + ' ' + location.pathname).toLowerCase();
        for (const [key, val] of Object.entries(CONFIG.subjects)) {
            if (key !== 'default' && text.includes(key)) return val;
        }
        return CONFIG.subjects.default;
    }

    /* ── Get relative root prefix ── */
    function getAssetPrefix() {
        if (SITE_ROOT) return SITE_ROOT;
        const link = document.querySelector('link[href*="styles/"], script[src*="js/"]');
        if (link) {
            const href = link.getAttribute('href') || link.getAttribute('src') || '';
            const match = href.match(/^(.*\/)?(?:styles|js)\//);
            if (match && match[1] !== undefined) {
                return match[1];
            }
        }
        const depth = location.pathname.split('/').filter(Boolean).length;
        return depth > 1 ? '../'.repeat(depth - 1) : './';
    }

    /* ── Inject print stylesheet ── */
    function ensurePrintCSS() {
        if (document.querySelector('link[href*="print.css"]')) return;
        const prefix = getAssetPrefix();
        const link = document.createElement('link');
        link.rel  = 'stylesheet';
        link.href = prefix + 'styles/print.css';
        link.media = 'print';
        link.id   = 'jc-print-stylesheet';
        document.head.appendChild(link);
    }

    /* ── Build friendly descriptive filename for the PDF ── */
    function buildFilename() {
        const isBook = location.pathname.includes('book-') || location.pathname.includes('/book/');
        const subject = detectSubject();

        if (isBook) {
            const activeNav = document.querySelector('.chapter-nav-item.active a, .nav-item.active a');
            const contentHeading = document.querySelector('#chapterContent h1, #chapterBody h1, .chapter-body h1, .book-article h1');
            const breadcrumbPart = document.getElementById('breadcrumbCurrent');

            let rawTitle = '';
            if (contentHeading && contentHeading.textContent.trim().length > 2) {
                rawTitle = contentHeading.textContent.trim();
            } else if (activeNav && activeNav.textContent.trim().length > 2) {
                rawTitle = activeNav.textContent.trim();
            } else if (breadcrumbPart && breadcrumbPart.textContent.trim().length > 2) {
                rawTitle = breadcrumbPart.textContent.trim();
            } else {
                rawTitle = document.title;
            }

            const cleanTitle = rawTitle
                .replace(/^[#\s0-9.►—–-]+/, '')
                .replace(/[^a-zA-Z0-9\s-]/g, '')
                .trim()
                .replace(/\s+/g, '-');

            const activeChMatch = (activeNav ? activeNav.textContent : rawTitle).match(/(?:Chapter|Ch\.?|\b)\s*(\d+)/i);
            const chPrefix = activeChMatch ? `Ch${String(activeChMatch[1]).padStart(2, '0')}-` : '';

            return `JuniorCoders-${subject.label}-${chPrefix}${cleanTitle.substring(0, 45)}.pdf`;
        }

        const modHeader = document.querySelector('.module-header h1, header.module-header h1, h1');
        const raw = modHeader ? modHeader.textContent.trim() : document.title;
        const clean = raw
            .replace(/[^a-zA-Z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-');
        return `JuniorCoders-${clean.substring(0, 50)}.pdf`;
    }

    /* ── User Toast notification ── */
    function showPrintToast() {
        let toast = document.getElementById('pdf-download-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'pdf-download-toast';
            toast.style.cssText = [
                'position: fixed',
                'top: 24px',
                'left: 50%',
                'transform: translateX(-50%)',
                'background: #0f172a',
                'color: #ffffff',
                'padding: 10px 22px',
                'border-radius: 999px',
                'font-size: 0.88rem',
                'font-weight: 600',
                'box-shadow: 0 10px 30px rgba(0,0,0,0.4)',
                'border: 1px solid rgba(255,255,255,0.25)',
                'z-index: 99999',
                'display: flex',
                'align-items: center',
                'gap: 8px',
                'transition: opacity 0.3s ease, transform 0.3s ease',
                'pointer-events: none',
                'font-family: Outfit, -apple-system, sans-serif'
            ].join(';');
            document.body.appendChild(toast);
        }
        toast.innerHTML = '<span>📄</span> <span>Opening Print Dialog... Choose <strong>Save as PDF</strong>!</span>';
        toast.style.opacity = '1';
        setTimeout(() => {
            if (toast) toast.style.opacity = '0';
        }, 4000);
    }

    /* ── Trigger Browser Print / Save as PDF ── */
    function triggerPrint(btn) {
        ensurePrintCSS();
        showPrintToast();

        const originalText = btn ? btn.innerHTML : '';
        if (btn) {
            btn.innerHTML = '<span>⏳</span> <span class="btn-text">Preparing…</span>';
            btn.disabled = true;
        }

        const prevTitle = document.title;
        const pdfName = buildFilename().replace('.pdf', '');
        document.title = pdfName;

        setTimeout(() => {
            window.print();

            setTimeout(() => {
                document.title = prevTitle;
                if (btn) {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }
            }, 1000);
        }, 250);
    }

    /* ── Inject into Textbook Readers ── */
    function injectBookReaderControls() {
        const isBook = location.pathname.includes('book-') || location.pathname.includes('/book/');
        if (!isBook) return;

        const bar = document.querySelector('.reader-controls-right') ||
                    document.querySelector('.reader-meta') ||
                    document.querySelector('.reader-top-links') ||
                    document.querySelector('.chapter-meta');

        if (bar && !document.getElementById('book-download-pdf-btn')) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.id = 'book-download-pdf-btn';
            btn.className = 'book-download-pdf-btn';
            btn.title = 'Download this chapter as an offline study PDF';
            btn.setAttribute('aria-label', 'Download current chapter as PDF');
            btn.innerHTML = `<span class="btn-icon">⬇️</span><span class="btn-text">Download PDF</span>`;
            btn.addEventListener('click', () => triggerPrint(btn));

            const readingBtn = bar.querySelector('#book-reading-mode-btn, .reading-mode-btn, .book-reading-mode-toggle-btn');
            if (readingBtn && readingBtn.parentNode === bar) {
                bar.insertBefore(btn, readingBtn.nextSibling);
            } else {
                bar.appendChild(btn);
            }
        }
    }

    /* ── Inject into Learning Modules ── */
    function injectModuleControls() {
        const isModule = location.pathname.includes('module') || location.pathname.includes('lesson');
        if (!isModule) return;

        const modHeader = document.querySelector('.module-header, header.module-header');
        if (modHeader && !modHeader.querySelector('.module-pdf-btn')) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'module-pdf-btn';
            btn.title = 'Download this lesson as a PDF study guide';
            btn.innerHTML = `<span>⬇️</span> <span>Download Lesson PDF</span>`;
            btn.addEventListener('click', () => triggerPrint(btn));
            modHeader.appendChild(btn);
        }
    }

    /* ── Floating Action Button (FAB) ── */
    function createFAB() {
        const subject = detectSubject();

        const fab = document.createElement('div');
        fab.className   = 'pdf-fab';
        fab.id          = 'pdf-fab';
        fab.setAttribute('role', 'button');
        fab.setAttribute('tabindex', '0');
        fab.setAttribute('aria-label', 'Download this lesson as PDF');
        fab.title = 'Download Lesson as PDF';

        fab.innerHTML = `
            <span class="pdf-fab-icon">${subject.emoji}</span>
            <span class="pdf-fab-label">Download PDF</span>
        `;

        Object.assign(fab.style, {
            position:       'fixed',
            bottom:         '28px',
            right:          '28px',
            zIndex:         '9999',
            display:        'flex',
            alignItems:     'center',
            gap:            '8px',
            background:     subject.color,
            color:          '#ffffff',
            border:         'none',
            borderRadius:   '50px',
            padding:        '11px 20px',
            cursor:         'pointer',
            fontFamily:     "'Outfit', sans-serif",
            fontSize:       '14px',
            fontWeight:     '700',
            boxShadow:      `0 4px 20px ${subject.color}66`,
            transition:     'transform 0.2s ease, box-shadow 0.2s ease, opacity 0.3s ease',
            userSelect:     'none',
            backdropFilter: 'blur(8px)',
        });

        fab.addEventListener('mouseenter', () => {
            fab.style.transform  = 'translateY(-3px) scale(1.04)';
            fab.style.boxShadow  = `0 8px 30px ${subject.color}99`;
        });
        fab.addEventListener('mouseleave', () => {
            fab.style.transform  = 'translateY(0) scale(1)';
            fab.style.boxShadow  = `0 4px 20px ${subject.color}66`;
        });

        function activate() { triggerPrint(fab); }
        fab.addEventListener('click', activate);
        fab.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') activate(); });

        function onScroll() {
            fab.style.opacity       = window.scrollY > 80 ? '1' : '0';
            fab.style.pointerEvents = window.scrollY > 80 ? 'auto' : 'none';
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        return fab;
    }

    /* ── Top Download Bar (on cheatsheets) ── */
    function createTopBar() {
        const subject = detectSubject();

        const bar = document.createElement('div');
        bar.className = 'pdf-download-bar';
        bar.id        = 'pdf-download-bar';

        Object.assign(bar.style, {
            background:     `linear-gradient(135deg, ${subject.color}22, ${subject.color}11)`,
            border:         `1px solid ${subject.color}44`,
            borderRadius:   '12px',
            padding:        '12px 20px',
            margin:         '0 0 20px 0',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            gap:            '12px',
            flexWrap:       'wrap',
        });

        const text = document.createElement('p');
        text.style.cssText = 'margin:0; color: var(--text-secondary,#cbd5e1); font-size:0.9rem;';
        text.innerHTML = `${subject.emoji} <strong style="color:var(--text-primary,#f8fafc)">Save this guide!</strong> Download it as a PDF for offline reference.`;

        const btn = document.createElement('button');
        btn.id = 'pdf-top-btn';
        btn.innerHTML = '⬇️ Download PDF';
        Object.assign(btn.style, {
            background:   subject.color,
            color:        '#ffffff',
            border:       'none',
            borderRadius: '8px',
            padding:      '9px 20px',
            cursor:       'pointer',
            fontFamily:   "'Outfit', sans-serif",
            fontSize:     '0.9rem',
            fontWeight:   '700',
            transition:   'transform 0.15s, box-shadow 0.15s',
            boxShadow:    `0 2px 12px ${subject.color}55`,
            whiteSpace:   'nowrap',
        });

        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px)';
            btn.style.boxShadow = `0 4px 20px ${subject.color}88`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
            btn.style.boxShadow = `0 2px 12px ${subject.color}55`;
        });
        btn.addEventListener('click', () => triggerPrint(btn));

        bar.appendChild(text);
        bar.appendChild(btn);
        return bar;
    }

    /* ── Initialize ── */
    function init() {
        ensurePrintCSS();

        const path     = location.pathname.toLowerCase();
        const isCheat  = path.includes('cheatsheet');
        const isModule = path.includes('module') || path.includes('lesson');
        const isBook   = path.includes('book-') || path.includes('/book/');
        const isHub    = path.includes('learning');

        if (isBook) {
            injectBookReaderControls();
        }

        if (isModule) {
            injectModuleControls();
        }

        if (isCheat || isModule || isHub ||
            path.includes('best-practice') ||
            path.includes('glossary') ||
            path.includes('tips') ||
            path.includes('exercise')) {
            if (!document.getElementById('pdf-fab')) {
                document.body.appendChild(createFAB());
            }
        }

        if (isCheat && !document.getElementById('pdf-download-bar')) {
            const container = document.querySelector(
                '.cheatsheet-container, .cheat-container, main, body'
            );
            const firstChild = container ? container.firstElementChild : null;
            const hero = container ? container.querySelector('.cheat-hero, header') : null;
            const bar = createTopBar();

            if (hero && hero.nextSibling) {
                hero.parentNode.insertBefore(bar, hero.nextSibling);
            } else if (firstChild) {
                container.insertBefore(bar, firstChild.nextSibling);
            } else {
                document.body.insertBefore(bar, document.body.firstChild);
            }
        }
    }

    /* ── Global API ── */
    window.downloadLessonPDF = function (options) {
        const btn = (options && options.button) ? options.button : null;
        triggerPrint(btn);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
