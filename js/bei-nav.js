/**
 * Junior Coders - Unified Navigation System (bei-nav.js)
 * Provides global navigation standardization, mobile drawer toggle, theme management,
 * track-aware quick module switcher, and responsive bottom lesson pagers.
 */

(function () {
    'use strict';

    // ═════════════════════════════════════════════════════════════════
    // 1. CURRICULUM REGISTRY (Single Source of Truth)
    // ═════════════════════════════════════════════════════════════════
    const CURRICULUM = {
        js: {
            name: 'JavaScript Track',
            shortName: 'JS Track',
            dir: 'Learning JS',
            syllabus: 'learningjs.html',
            bookDir: 'book-js',
            accent: '#6366f1',
            modules: [
                { num: 1, title: 'Variables, Constants & Data Types', file: 'module1.html', bookCh: 'ch3' },
                { num: 2, title: 'Operators & Expressions', file: 'module2.html', bookCh: 'ch5' },
                { num: 3, title: 'Control Flow & Conditionals', file: 'module3.html', bookCh: 'ch6' },
                { num: 4, title: 'Loops & Iterations', file: 'module4.html', bookCh: 'ch8' },
                { num: 5, title: 'Functions & Scope', file: 'module5.html', bookCh: 'ch10' },
                { num: 6, title: 'Arrays & Data Collections', file: 'module6.html', bookCh: 'ch11' },
                { num: 7, title: 'DOM Manipulation & Dynamic UI', file: 'module7.html', bookCh: 'ch16' },
                { num: 8, title: 'JavaScript Objects & Dossiers', file: 'module8.html', bookCh: 'ch14' },
                { num: 9, title: 'Events & Interactive Apps', file: 'module9.html', bookCh: 'ch17' }
            ]
        },
        html: {
            name: 'HTML5 Foundations',
            shortName: 'HTML Track',
            dir: 'Learning HTML',
            syllabus: 'learninghtml.html',
            bookDir: 'book-html',
            accent: '#ea580c',
            modules: [
                { num: 1, title: 'Welcome to HTML & Page Anatomy', file: 'module1.html', bookCh: 'ch3' },
                { num: 2, title: 'HTML Attributes & Structure', file: 'module2.html', bookCh: 'ch4' },
                { num: 3, title: 'Text Formatting & Headings', file: 'module3.html', bookCh: 'ch5' },
                { num: 4, title: 'Hyperlinks & Navigation Paths', file: 'module4.html', bookCh: 'ch6' },
                { num: 5, title: 'Images & Accessible Media', file: 'module5.html', bookCh: 'ch7' },
                { num: 6, title: 'Lists & Site Navigation Menus', file: 'module6.html', bookCh: 'ch8' },
                { num: 7, title: 'Data Tables & Tabular Layouts', file: 'module7.html', bookCh: 'ch9' },
                { num: 8, title: 'Forms, Inputs & Data Entry', file: 'module8.html', bookCh: 'ch10' },
                { num: 9, title: 'HTML5 Semantic Architecture', file: 'module9.html', bookCh: 'ch11' },
                { num: 10, title: 'Embedded Audio & Video', file: 'module10.html', bookCh: 'ch12' },
                { num: 11, title: 'Meta Tags, Open Graph & SEO', file: 'module11.html', bookCh: 'ch13' },
                { num: 12, title: 'Capstone: Ethical Web Portfolio', file: 'module12.html', bookCh: 'final' }
            ]
        },
        css: {
            name: 'Modern CSS & Layouts',
            shortName: 'CSS Track',
            dir: 'Learning CSS',
            syllabus: 'learningcss.html',
            bookDir: 'book-css',
            accent: '#3b82f6',
            modules: [
                { num: 1, title: 'The Magic of CSS & Syntax', file: 'module1.html', bookCh: 'ch1' },
                { num: 2, title: 'Selectors, Specificity & Cascade', file: 'module2.html', bookCh: 'ch3' },
                { num: 3, title: 'Colors, Typography & Fonts', file: 'module3.html', bookCh: 'ch4' },
                { num: 4, title: 'The Box Model & Spacing', file: 'module4.html', bookCh: 'ch5' },
                { num: 5, title: 'Flexbox Alignment & Layouts', file: 'module5.html', bookCh: 'ch7' },
                { num: 6, title: 'CSS Grid & 2D Layouts', file: 'module6.html', bookCh: 'ch8' },
                { num: 7, title: 'Transitions, Hover & Animation', file: 'module7.html', bookCh: 'ch10' },
                { num: 8, title: 'Responsive Design & Media Queries', file: 'module8.html', bookCh: 'ch11' }
            ]
        },
        python: {
            name: 'Python & Ethical AI',
            shortName: 'Python Track',
            dir: 'Learning Python',
            syllabus: 'learningpython.html',
            bookDir: 'book-python',
            accent: '#10b981',
            modules: [
                { num: 1, title: 'Digital Memory Vault (Variables)', file: 'module1.html', bookCh: 'ch2' },
                { num: 2, title: 'Decisions & Conditionals (If/Else)', file: 'module2.html', bookCh: 'ch4' },
                { num: 3, title: 'Repetition & Loops (For/While)', file: 'module3.html', bookCh: 'ch5' },
                { num: 4, title: 'Functions & Clean Modularity', file: 'module4.html', bookCh: 'ch6' },
                { num: 5, title: 'Data Collections (Lists & Dicts)', file: 'module5.html', bookCh: 'ch7' },
                { num: 6, title: 'File Handling & Ethical Data I/O', file: 'module6.html', bookCh: 'ch9' },
                { num: 7, title: 'Object-Oriented Programming (OOP)', file: 'module7.html', bookCh: 'ch11' },
                { num: 8, title: 'Algorithms, Problem Solving & Capstone', file: 'module8.html', bookCh: 'ch14' }
            ]
        }
    };

    // ═════════════════════════════════════════════════════════════════
    // 2. ROOT PATH RESOLUTION
    // ═════════════════════════════════════════════════════════════════
    function computeRootPath() {
        if (document.body && document.body.dataset.root) {
            return document.body.dataset.root;
        }
        const explicitNav = document.querySelector('.bei-nav, [data-root]');
        if (explicitNav && explicitNav.dataset && explicitNav.dataset.root) {
            return explicitNav.dataset.root;
        }

        // Auto-detect based on script tag source location
        const scripts = document.querySelectorAll('script[src*="bei-nav.js"]');
        if (scripts.length > 0) {
            const src = scripts[scripts.length - 1].getAttribute('src');
            const idx = src.indexOf('js/bei-nav.js');
            if (idx !== -1) {
                return src.substring(0, idx);
            }
        }

        // Fallback: analyze location.pathname depth
        const path = window.location.pathname.replace(/\\/g, '/');
        const segments = path.split('/').filter(Boolean);
        
        // Find if any known parent directory is present
        const knownDirs = ['Learning JS', 'Learning HTML', 'Learning CSS', 'Learning Python', 'studios', 'paths', 'library', 'learn', 'teacher-hub', 'projects', 'book-js', 'book-html', 'book-css', 'book-python'];
        for (let i = 0; i < segments.length; i++) {
            const seg = decodeURIComponent(segments[i]);
            if (knownDirs.some(k => k.toLowerCase() === seg.toLowerCase())) {
                const depth = segments.length - 1 - i;
                return depth === 1 ? '../' : depth === 2 ? '../../' : depth === 3 ? '../../../' : './';
            }
        }

        return './';
    }

    const ROOT = computeRootPath();

    // ═════════════════════════════════════════════════════════════════
    // 3. GLOBAL TOP NAVBAR RENDERER & ENHANCER
    // ═════════════════════════════════════════════════════════════════
    function renderGlobalNav() {
        let nav = document.querySelector('.bei-nav');
        if (!nav) {
            const placeholder = document.getElementById('bei-global-nav');
            if (placeholder) {
                nav = document.createElement('nav');
                nav.className = 'bei-nav';
                placeholder.parentNode.replaceChild(nav, placeholder);
            } else {
                // If body has no nav, inject at the top
                nav = document.createElement('nav');
                nav.className = 'bei-nav';
                document.body.insertBefore(nav, document.body.firstChild);
            }
        }

        // Determine current active section
        const path = window.location.pathname.replace(/\\/g, '/').toLowerCase();
        let activeKey = '';
        if (path.includes('practice-arena.html')) activeKey = 'arena';
        else if (path.includes('/studios/')) activeKey = 'studios';
        else if (path.includes('/books/') || path.includes('/book-')) activeKey = 'textbooks';
        else if (path.includes('/cheatsheet')) activeKey = 'cheatsheets';
        else if (path.includes('/projects/')) activeKey = 'projects';
        else if (path.includes('/paths/')) activeKey = 'paths';
        else if (path.includes('/teacher-hub/')) activeKey = 'teachers';
        else if (path.includes('/learn/') || path.includes('learning')) activeKey = 'learn';

        const navHtml = `
            <div class="container bei-nav-inner">
                <a href="${ROOT}index.html" class="bei-logo">
                    <div class="bei-logo-icon">💻</div>
                    <div class="bei-logo-text">
                        <span class="bei-brand-name">Junior Coders</span>
                        <span class="bei-logo-sub">School Computer Science</span>
                    </div>
                </a>

                <ul class="bei-nav-links">
                    <li><a href="${ROOT}learn/index.html" class="bei-nav-link ${activeKey === 'learn' ? 'active' : ''}"><span class="nav-icon">📚</span><span>Learn</span></a></li>
                    <li><a href="${ROOT}practice-arena.html" class="bei-nav-link ${activeKey === 'arena' ? 'active' : ''}"><span class="nav-icon">⚔️</span><span>Arena</span></a></li>
                    <li><a href="${ROOT}studios/index.html" class="bei-nav-link ${activeKey === 'studios' ? 'active' : ''}"><span class="nav-icon">⚡</span><span>Studios</span></a></li>
                    <li><a href="${ROOT}library/books/index.html" class="bei-nav-link ${activeKey === 'textbooks' ? 'active' : ''}"><span class="nav-icon">📖</span><span>Textbooks</span></a></li>
                    <li><a href="${ROOT}library/cheatsheets/index.html" class="bei-nav-link ${activeKey === 'cheatsheets' ? 'active' : ''}"><span class="nav-icon">📋</span><span>Cheatsheets</span></a></li>
                    <li><a href="${ROOT}projects/index.html" class="bei-nav-link ${activeKey === 'projects' ? 'active' : ''}"><span class="nav-icon">🏆</span><span>Projects</span></a></li>
                    <li><a href="${ROOT}paths/index.html" class="bei-nav-link ${activeKey === 'paths' ? 'active' : ''}"><span class="nav-icon">🗺️</span><span>Pathways</span></a></li>
                    <li><a href="${ROOT}teacher-hub/index.html" class="bei-nav-link ${activeKey === 'teachers' ? 'active' : ''}"><span class="nav-icon">🍎</span><span>Teachers</span></a></li>
                </ul>

                <div class="bei-nav-actions">
                    <button class="theme-toggle-btn" aria-label="Toggle dark/light theme" title="Toggle theme">☀️</button>
                    <a href="${ROOT}studios/web-studio/index.html" class="btn-nav-primary">Launch Studio ⚡</a>
                    <button class="mobile-toggle" aria-label="Toggle navigation menu" aria-expanded="false">☰</button>
                </div>
            </div>
        `;

        nav.innerHTML = navHtml;
        setupNavInteractions(nav);
    }

    // ═════════════════════════════════════════════════════════════════
    // 4. NAVBAR INTERACTION HANDLERS (Theme & Mobile Toggle)
    // ═════════════════════════════════════════════════════════════════
    function setupNavInteractions(nav) {
        // Theme Toggle Sync
        const currentTheme = localStorage.getItem('bei_theme') || document.documentElement.getAttribute('data-theme') || 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
        const themeBtn = nav.querySelector('.theme-toggle-btn');
        if (themeBtn) {
            themeBtn.innerHTML = currentTheme === 'dark' ? '☀️' : '🌙';
            themeBtn.onclick = () => {
                const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                const nextTheme = isDark ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', nextTheme);
                localStorage.setItem('bei_theme', nextTheme);
                themeBtn.innerHTML = nextTheme === 'dark' ? '☀️' : '🌙';
            };
        }

        // Mobile Toggle & Responsive Drawer
        const toggle = nav.querySelector('.mobile-toggle');
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = nav.classList.toggle('mobile-active');
                toggle.classList.toggle('active', isOpen);
                toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
                toggle.innerHTML = isOpen ? '✕' : '☰';
            });

            // Close when clicking nav links
            nav.querySelectorAll('.bei-nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    nav.classList.remove('mobile-active');
                    toggle.classList.remove('active');
                    toggle.innerHTML = '☰';
                    toggle.setAttribute('aria-expanded', 'false');
                });
            });

            // Close on click outside
            document.addEventListener('click', (e) => {
                if (!nav.contains(e.target)) {
                    nav.classList.remove('mobile-active');
                    toggle.classList.remove('active');
                    toggle.innerHTML = '☰';
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });

            // Close on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && nav.classList.contains('mobile-active')) {
                    nav.classList.remove('mobile-active');
                    toggle.classList.remove('active');
                    toggle.innerHTML = '☰';
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }

    // ═════════════════════════════════════════════════════════════════
    // 5. IN-MODULE NAVIGATION: QUICK SWITCHER & BOTTOM PAGER
    // ═════════════════════════════════════════════════════════════════
    function detectTrackInfo() {
        const body = document.body;
        let trackKey = body ? body.dataset.track : null;
        let moduleNum = body ? parseInt(body.dataset.module, 10) : null;

        const path = window.location.pathname.replace(/\\/g, '/');
        const filename = path.split('/').pop().toLowerCase();

        // If not specified in body data attributes, infer from directory and filename
        if (!trackKey) {
            if (path.includes('Learning%20JS') || path.includes('Learning JS')) trackKey = 'js';
            else if (path.includes('Learning%20HTML') || path.includes('Learning HTML')) trackKey = 'html';
            else if (path.includes('Learning%20CSS') || path.includes('Learning CSS')) trackKey = 'css';
            else if (path.includes('Learning%20Python') || path.includes('Learning Python')) trackKey = 'python';
        }

        if (!moduleNum && filename.startsWith('module')) {
            const match = filename.match(/module(\d+)\.html/);
            if (match) moduleNum = parseInt(match[1], 10);
        }

        if (trackKey && CURRICULUM[trackKey]) {
            return {
                track: CURRICULUM[trackKey],
                trackKey,
                moduleNum: moduleNum || 1
            };
        }
        return null;
    }

    function setupModuleNavigation() {
        const info = detectTrackInfo();
        if (!info) return;

        const { track, trackKey, moduleNum } = info;
        const currentMod = track.modules.find(m => m.num === moduleNum) || track.modules[0];
        const prevMod = track.modules.find(m => m.num === moduleNum - 1);
        const nextMod = track.modules.find(m => m.num === moduleNum + 1);

        // 5.1 Build Quick Module Switcher
        const switcherWrap = document.createElement('div');
        switcherWrap.className = 'bei-module-switcher';
        switcherWrap.id = 'beiModuleSwitcher';

        let listItemsHtml = '';
        track.modules.forEach(m => {
            const isActive = m.num === moduleNum;
            listItemsHtml += `
                <a href="${m.file}" class="switcher-module-item ${isActive ? 'active' : ''}">
                    <span class="switcher-mod-number">${m.num}</span>
                    <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${m.title}</span>
                    ${isActive ? '<span style="color: #818cf8; font-size: 0.75rem;">●</span>' : ''}
                </a>
            `;
        });

        switcherWrap.innerHTML = `
            <button class="bei-module-switcher-btn" id="moduleSwitcherToggle" aria-haspopup="true" aria-expanded="false" title="Switch lesson module">
                <span class="switcher-badge">${track.shortName}</span>
                <span>Mod ${currentMod.num}: ${currentMod.title.split('&')[0].trim()}</span>
                <span class="switcher-arrow">▾</span>
            </button>
            <div class="bei-module-switcher-menu" id="moduleSwitcherMenu">
                <div class="switcher-menu-header">
                    <span>${track.name} (1 to ${track.modules.length})</span>
                    <a href="${track.syllabus}">All Modules ↗</a>
                </div>
                <div class="switcher-list">
                    ${listItemsHtml}
                </div>
            </div>
        `;

        // Switcher click interaction
        const switcherBtn = switcherWrap.querySelector('#moduleSwitcherToggle');
        switcherBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = switcherWrap.classList.toggle('open');
            switcherBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        document.addEventListener('click', (e) => {
            if (!switcherWrap.contains(e.target)) {
                switcherWrap.classList.remove('open');
                switcherBtn.setAttribute('aria-expanded', 'false');
            }
        });

        // 5.2 Build Breadcrumb Header Bar
        const topBar = document.createElement('div');
        topBar.className = 'bei-module-nav-bar-top';
        topBar.innerHTML = `
            <div class="bei-track-breadcrumb">
                <a href="${ROOT}index.html"><span>🏠</span> Home</a>
                <span class="breadcrumb-separator">/</span>
                <a href="${track.syllabus}">${track.shortName}</a>
                <span class="breadcrumb-separator">/</span>
                <span class="current-module">Module ${currentMod.num}: ${currentMod.title}</span>
            </div>
        `;
        topBar.appendChild(switcherWrap);

        // Insert at the top of main or module-container
        const main = document.querySelector('main.module-container, main');
        if (main) {
            // Replace any existing lone breadcrumb link
            const oldBreadcrumb = main.querySelector('div[style*="margin-bottom: 1.5rem"] a[href*="learning"], .breadcrumbs');
            if (oldBreadcrumb && oldBreadcrumb.parentElement) {
                oldBreadcrumb.parentElement.replaceWith(topBar);
            } else {
                main.insertBefore(topBar, main.firstChild);
            }
        }

        // 5.3 Build Bottom Lesson Pager Bar
        const pager = document.createElement('nav');
        pager.className = 'bei-lesson-pager';
        pager.setAttribute('aria-label', 'Module lesson pagination');

        const prevHtml = prevMod ? `
            <a href="${prevMod.file}" class="pager-card prev">
                <span class="pager-card-dir">← Previous Module</span>
                <span class="pager-card-title">Module ${prevMod.num}: ${prevMod.title}</span>
            </a>
        ` : `
            <a href="${track.syllabus}" class="pager-card prev" style="opacity: 0.85;">
                <span class="pager-card-dir">← Course Syllabus</span>
                <span class="pager-card-title">${track.name} Overview</span>
            </a>
        `;

        const nextHtml = nextMod ? `
            <a href="${nextMod.file}" class="pager-card next">
                <span class="pager-card-dir">Next Module →</span>
                <span class="pager-card-title">Module ${nextMod.num}: ${nextMod.title}</span>
            </a>
        ` : `
            <a href="${track.syllabus}#cert" class="pager-card next" style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(19, 29, 50, 0.9) 100%); border-color: rgba(16, 185, 129, 0.4);">
                <span class="pager-card-dir" style="color: #34d399;">Track Complete 🎓</span>
                <span class="pager-card-title">Claim Track Certificate →</span>
            </a>
        `;

        const bookAnchor = currentMod.bookCh ? `#${currentMod.bookCh}` : '';
        const companionBookUrl = `${ROOT}${track.bookDir}/index.html${bookAnchor}`;

        pager.innerHTML = `
            <div class="pager-col prev">${prevHtml}</div>
            <div class="pager-col center">
                <a href="${track.syllabus}" class="pager-btn-link" title="View all modules in ${track.name}">
                    <span>📚</span> <span>All Modules</span>
                </a>
                <a href="${companionBookUrl}" target="_blank" class="pager-btn-link" title="Open companion textbook in reader">
                    <span>📖</span> <span>Book Companion ↗</span>
                </a>
            </div>
            <div class="pager-col next">${nextHtml}</div>
        `;

        // Replace any existing module nav footer or append to main
        const existingFooter = document.querySelector('.module-nav-bar, .bei-lesson-pager');
        if (existingFooter) {
            existingFooter.replaceWith(pager);
        } else if (main) {
            main.appendChild(pager);
        }
    }

    // ═════════════════════════════════════════════════════════════════
    // 6. INITIALIZATION ON DOM READY
    // ═════════════════════════════════════════════════════════════════
    function init() {
        renderGlobalNav();
        setupModuleNavigation();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
