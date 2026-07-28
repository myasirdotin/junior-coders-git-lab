/**
 * Junior Coders — PDF Download Utility
 * Injects a floating "Download PDF" button on lesson & cheatsheet pages.
 * Uses window.print() + print.css for a clean, zero-dependency PDF export.
 */

(function () {
    'use strict';

    /* ── Configuration ── */
    const CONFIG = {
        // Map page title keywords → accent colours shown on the button
        subjects: {
            html:    { color: '#ea580c', emoji: '🌐' },
            css:     { color: '#2563eb', emoji: '🎨' },
            js:      { color: '#ca8a04', emoji: '⚡' },
            javascript: { color: '#ca8a04', emoji: '⚡' },
            php:     { color: '#6d28d9', emoji: '🐘' },
            mysql:   { color: '#0284c7', emoji: '🗄️' },
            laravel: { color: '#dc2626', emoji: '🔥' },
            default: { color: '#4f46e5', emoji: '📄' },
        }
    };

    /* ── Detect which subject this page belongs to ── */
    function detectSubject() {
        const text = (document.title + ' ' + location.pathname).toLowerCase();
        for (const [key, val] of Object.entries(CONFIG.subjects)) {
            if (key !== 'default' && text.includes(key)) return val;
        }
        return CONFIG.subjects.default;
    }

    /* ── Build a friendly filename ── */
    function buildFilename() {
        // Use <h1> content, fall back to page title
        const h1 = document.querySelector('h1');
        const raw = h1 ? h1.textContent.trim() : document.title;
        return 'JuniorCoders-' + raw
            .replace(/[^a-z0-9\s-]/gi, '')
            .replace(/\s+/g, '-')
            .substring(0, 60) + '.pdf';
    }

    /* ── Inject the print stylesheet if not already present ── */
    function ensurePrintCSS() {
        const existing = document.querySelector('link[href*="print.css"]');
        if (existing) return;

        // Determine relative path depth
        const depth = location.pathname.split('/').filter(Boolean).length;
        const prefix = depth > 1 ? '../'.repeat(depth - 1) : './';

        const link = document.createElement('link');
        link.rel  = 'stylesheet';
        link.href = prefix + 'styles/print.css';
        link.media = 'print';
        document.head.appendChild(link);
    }

    /* ── Trigger the browser's print/save-as-PDF dialog ── */
    function triggerPrint(btn) {
        // Show a brief "preparing" state
        const original = btn.innerHTML;
        btn.innerHTML = '⏳ Preparing…';
        btn.disabled  = true;

        // Set a helpful document title so the browser pre-fills the filename
        const prevTitle  = document.title;
        document.title   = buildFilename().replace('.pdf', '');

        setTimeout(() => {
            window.print();

            // Restore state after print dialog closes
            setTimeout(() => {
                document.title   = prevTitle;
                btn.innerHTML    = original;
                btn.disabled     = false;
            }, 1000);
        }, 200);
    }

    /* ── Create the Floating Action Button (FAB) ── */
    function createFAB() {
        const subject = detectSubject();

        const fab = document.createElement('div');
        fab.className   = 'pdf-fab';
        fab.id          = 'pdf-fab';
        fab.setAttribute('role', 'button');
        fab.setAttribute('tabindex', '0');
        fab.setAttribute('aria-label', 'Download this page as PDF');
        fab.title = 'Download as PDF';

        fab.innerHTML = `
            <span class="pdf-fab-icon">${subject.emoji}</span>
            <span class="pdf-fab-label">Download PDF</span>
        `;

        // Inline styles (self-contained, no extra CSS class needed in screen stylesheet)
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
            padding:        '12px 22px',
            cursor:         'pointer',
            fontFamily:     "'Outfit', sans-serif",
            fontSize:       '15px',
            fontWeight:     '700',
            boxShadow:      `0 4px 24px ${subject.color}66`,
            transition:     'transform 0.2s ease, box-shadow 0.2s ease, opacity 0.3s ease',
            userSelect:     'none',
            backdropFilter: 'blur(8px)',
        });

        // ── Hover effects ──
        fab.addEventListener('mouseenter', () => {
            fab.style.transform  = 'translateY(-3px) scale(1.04)';
            fab.style.boxShadow  = `0 8px 32px ${subject.color}99`;
        });
        fab.addEventListener('mouseleave', () => {
            fab.style.transform  = 'translateY(0) scale(1)';
            fab.style.boxShadow  = `0 4px 24px ${subject.color}66`;
        });

        // ── Click / keyboard activation ──
        function activate() { triggerPrint(fab); }
        fab.addEventListener('click',   activate);
        fab.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') activate(); });

        // ── Scroll: hide when near top, show after 200px ──
        function onScroll() {
            fab.style.opacity   = window.scrollY > 100 ? '1' : '0';
            fab.style.pointerEvents = window.scrollY > 100 ? 'auto' : 'none';
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // set initial state

        return fab;
    }

    /* ── Create the top Download Bar (visible on cheatsheets) ── */
    function createTopBar() {
        const subject = detectSubject();

        const bar = document.createElement('div');
        bar.className = 'pdf-download-bar';
        bar.id        = 'pdf-download-bar';

        Object.assign(bar.style, {
            background:  `linear-gradient(135deg, ${subject.color}22, ${subject.color}11)`,
            border:      `1px solid ${subject.color}44`,
            borderRadius: '12px',
            padding:     '12px 20px',
            margin:      '0 0 20px 0',
            display:     'flex',
            alignItems:  'center',
            justifyContent: 'space-between',
            gap:         '12px',
            flexWrap:    'wrap',
        });

        const text = document.createElement('p');
        text.style.cssText = 'margin:0; color: var(--text-secondary,#cbd5e1); font-size:0.9rem;';
        text.innerHTML = `${subject.emoji} <strong style="color:var(--text-primary,#f8fafc)">Save this cheat sheet!</strong> Download it as a PDF to study offline anytime.`;

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
            btn.style.transform  = 'translateY(-2px)';
            btn.style.boxShadow  = `0 4px 20px ${subject.color}88`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform  = 'translateY(0)';
            btn.style.boxShadow  = `0 2px 12px ${subject.color}55`;
        });
        btn.addEventListener('click', () => triggerPrint(btn));

        bar.appendChild(text);
        bar.appendChild(btn);
        return bar;
    }

    /* ── Decide where to inject & what to inject ── */
    function init() {
        ensurePrintCSS();

        const path      = location.pathname.toLowerCase();
        const isCheat   = path.includes('cheatsheet');
        const isModule  = path.includes('module') || path.includes('lesson');
        const isHub     = path.includes('learninghtml') || path.includes('learningcss') ||
                          path.includes('learningjs')   || path.includes('learningphp') ||
                          path.includes('learning');

        // Always add the FAB (floating button) on content pages
        if (isCheat || isModule || isHub ||
            path.includes('best-practice') ||
            path.includes('glossary') ||
            path.includes('tips') ||
            path.includes('exercise')) {

            document.body.appendChild(createFAB());
        }

        // On cheatsheet pages also inject a top banner bar
        if (isCheat) {
            const container = document.querySelector(
                '.cheatsheet-container, .cheat-container, main, body'
            );
            const firstChild = container ? container.firstElementChild : null;

            // Insert the bar after the hero header
            const hero = container
                ? container.querySelector('.cheat-hero, header')
                : null;

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

    /* ── Wait for DOM ready ── */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
