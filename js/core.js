/**
 * Junior Coders - Core Platform Engine
 * Handles component injection, state, and global interactions.
 */

(function() {
    'use strict';

    const CONFIG = {
        STORAGE_KEYS: {
            THEME: 'jc_theme',
            COMPLETED: 'jc_completed_modules'
        },
        MODULES: {
            'Learning HTML': [
                { name: 'Syllabus', url: 'learninghtml.html' },
                { name: '1: Introduction', url: 'module1.html' },
                { name: '2: Attributes', url: 'module2.html' },
                { name: '3: Headings', url: 'module3.html' },
                { name: '4: Formatting', url: 'module4.html' },
                { name: '5: Links', url: 'module5.html' },
                { name: '6: Images', url: 'module6.html' },
                { name: '7: Tables', url: 'module7.html' },
                { name: '8: Lists', url: 'module8.html' },
                { name: '9: Block/Inline', url: 'module9.html' },
                { name: '10: Class/ID', url: 'module10.html' },
                { name: '11: Forms', url: 'module11.html' },
                { name: '12: Semantics', url: 'module12.html' },
                { name: 'Playground', url: 'playground.html' }
            ],
            'Learning CSS': [
                { name: 'Lessons', url: 'learningcss.html' },
                { name: '1: Intro to CSS', url: 'module1.html' },
                { name: '2: Colors & Text', url: 'module2.html' },
                { name: '3: Box Model', url: 'module3.html' },
                { name: '4: Display & Positioning', url: 'module4.html' },
                { name: '5: Intro to Flexbox', url: 'module5.html' },
                { name: '6: Advanced Flexbox', url: 'module6.html' },
                { name: '7: CSS Grid', url: 'module7.html' },
                { name: '8: Responsive Design', url: 'module8.html' },
                { name: 'Playground', url: 'playground.html' },
                { name: 'Exercises', url: 'exercises.html' },
                { name: 'Glossary', url: 'glossary.html' },
                { name: 'Quiz', url: 'quiz.html' }
            ],
            'Learning JS': [
                { name: 'Syllabus', url: 'learningjs.html' },
                { name: '1: Variables', url: 'module1.html' },
                { name: '2: Operators', url: 'module2.html' },
                { name: '3: Conditionals', url: 'module3.html' },
                { name: '4: Functions', url: 'module4.html' },
                { name: '5: Arrays', url: 'module5.html' },
                { name: '6: Loops', url: 'module6.html' },
                { name: '7: DOM Intro', url: 'module7.html' },
                { name: '8: Objects', url: 'module8.html' },
                { name: '9: Events', url: 'module9.html' },
                { name: 'Playground', url: 'playground.html' },
                { name: 'Exercises', url: 'exercises.html' },
                { name: 'Glossary', url: 'glossary.html' },
                { name: 'Quiz', url: 'quiz.html' }
            ],
            'Learning PHP': [
                { name: 'Syllabus', url: 'learningphp.html' },
                { name: '1: Intro to PHP', url: 'module1.html' },
                { name: '2: Variables & Types', url: 'module2.html' },
                { name: '3: Control Flow', url: 'module3.html' },
                { name: '4: Functions', url: 'module4.html' },
                { name: '5: Arrays', url: 'module5.html' },
                { name: '6: Forms & POST', url: 'module6.html' },
                { name: '7: File I/O', url: 'module7.html' },
                { name: '8: OOP Basics', url: 'module8.html' }
            ],
            'Learning MySQL': [
                { name: 'Syllabus', url: 'learningmysql.html' },
                { name: '1: Intro to Databases', url: 'module1.html' },
                { name: '2: CREATE TABLE', url: 'module2.html' },
                { name: '3: INSERT & SELECT', url: 'module3.html' },
                { name: '4: UPDATE & DELETE', url: 'module4.html' },
                { name: '5: JOINs', url: 'module5.html' },
                { name: '6: Advanced Queries', url: 'module6.html' }
            ],
            'Learning Laravel': [
                { name: 'Syllabus', url: 'learninglaravel.html' },
                { name: '1: Introduction', url: 'module1.html' },
                { name: '2: Routing', url: 'module2.html' },
                { name: '3: Controllers', url: 'module3.html' },
                { name: '4: Blade Templates', url: 'module4.html' },
                { name: '5: Eloquent ORM', url: 'module5.html' },
                { name: '6: Migrations', url: 'module6.html' },
                { name: '7: Forms & Validation', url: 'module7.html' },
                { name: '8: Authentication', url: 'module8.html' }
            ]
        }
    };

    // --- Utility Functions ---
    const getBaseUrl = () => {
        const path = decodeURIComponent(window.location.pathname);
        if (path.includes('Learning HTML/') ||
            path.includes('Learning CSS/') ||
            path.includes('Learning JS/') ||
            path.includes('Learning PHP/') ||
            path.includes('Learning MySQL/') ||
            path.includes('Learning Laravel/')) {
            return '../';
        }
        return './';
    };

    const getCurrentModule = () => {
        const path = decodeURIComponent(window.location.pathname);
        if (path.includes('Learning HTML')) return 'Learning HTML';
        if (path.includes('Learning CSS')) return 'Learning CSS';
        if (path.includes('Learning JS')) return 'Learning JS';
        if (path.includes('Learning PHP')) return 'Learning PHP';
        if (path.includes('Learning MySQL')) return 'Learning MySQL';
        if (path.includes('Learning Laravel')) return 'Learning Laravel';
        return null;
    };

    // --- Centralized State Engine ---
    const JC_State = {
        KEY: 'jc_user_state',

        defaultSchema: {
            theme: 'dark',
            completedModules: [],
            streak: 1,
            lastActiveDay: null,
            lastModule: null,
            lastModulePath: null
        },

        load: function() {
            let state = localStorage.getItem(this.KEY);
            if (state) {
                try {
                    return JSON.parse(state);
                } catch(e) {
                    console.error("Failed to parse state, resetting...", e);
                }
            }

            // Safe Backward-Compatible Migration
            const legacyTheme = localStorage.getItem(CONFIG.STORAGE_KEYS.THEME);
            const legacyCompleted = localStorage.getItem(CONFIG.STORAGE_KEYS.COMPLETED);
            const legacyStreak = localStorage.getItem('jc_daily_streak');
            const legacyLastActive = localStorage.getItem('jc_last_active_day');
            const legacyLastModule = localStorage.getItem('jc_last_module');
            const legacyLastPath = localStorage.getItem('jc_last_module_path');

            const migrated = {
                theme: legacyTheme || 'dark',
                completedModules: legacyCompleted ? JSON.parse(legacyCompleted) : [],
                streak: legacyStreak ? parseInt(legacyStreak) : 1,
                lastActiveDay: legacyLastActive || null,
                lastModule: legacyLastModule || null,
                lastModulePath: legacyLastPath || null
            };

            this.save(migrated);
            return migrated;
        },

        save: function(state) {
            localStorage.setItem(this.KEY, JSON.stringify(state));
            localStorage.setItem(CONFIG.STORAGE_KEYS.COMPLETED, JSON.stringify(state.completedModules));
            localStorage.setItem(CONFIG.STORAGE_KEYS.THEME, state.theme);
            localStorage.setItem('jc_daily_streak', state.streak.toString());
            if (state.lastActiveDay) localStorage.setItem('jc_last_active_day', state.lastActiveDay);
            if (state.lastModule) localStorage.setItem('jc_last_module', state.lastModule);
            if (state.lastModulePath) localStorage.setItem('jc_last_module_path', state.lastModulePath);
        },

        get: function(key) {
            const state = this.load();
            return state[key] !== undefined ? state[key] : this.defaultSchema[key];
        },

        set: function(key, value) {
            const state = this.load();
            state[key] = value;
            this.save(state);
        }
    };

    // --- Gamification Engine ---
    const updateStreak = () => {
        const now = new Date();
        const todayStr = now.toISOString().split('T')[0];

        let streak = JC_State.get('streak');
        const lastActive = JC_State.get('lastActiveDay');

        if (lastActive) {
            if (lastActive !== todayStr) {
                const lastDate = new Date(lastActive);
                const diffTime = Math.abs(now - lastDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                if (diffDays === 1) {
                    streak += 1;
                    JC_State.set('streak', streak);
                    setTimeout(() => {
                        window.showToast(`Daily streak updated! 🔥 ${streak} Days`);
                    }, 1000);
                } else if (diffDays > 1) {
                    streak = 1;
                    JC_State.set('streak', 1);
                }
                JC_State.set('lastActiveDay', todayStr);
            }
        } else {
            JC_State.set('lastActiveDay', todayStr);
            JC_State.set('streak', 1);
        }
        return streak;
    };

    const calculateStats = () => {
        const completed = JC_State.get('completedModules');
        const xp = completed.length * 100;

        let rank = 'Recruit';
        if (xp >= 500) rank = 'Apprentice';
        if (xp >= 1500) rank = 'Coder';
        if (xp >= 2500) rank = 'Master';

        const streak = JC_State.get('streak');
        const lastActiveDay = JC_State.get('lastActiveDay');
        const todayStr = new Date().toISOString().split('T')[0];
        const dailyGoalDone = lastActiveDay === todayStr && completed.length > 0;

        return { xp, count: completed.length, rank, streak, dailyGoalDone };
    };

    const trackVisit = () => {
        const path = window.location.pathname.split('/').pop();
        if (path.includes('module')) {
            JC_State.set('lastModule', path);
            JC_State.set('lastModulePath', window.location.pathname);
        }
    };

    const updateDashboard = () => {
        const stats = calculateStats();
        const lastPath = JC_State.get('lastModulePath');

        const xpEl = document.getElementById('user-xp');
        const countEl = document.getElementById('user-completed');
        const rankEl = document.getElementById('user-rank');
        const streakEl = document.getElementById('user-streak');
        const continueBtn = document.getElementById('continue-mission');
        const dailyFill = document.getElementById('daily-goal-fill');

        if (xpEl) xpEl.textContent = stats.xp;
        if (countEl) countEl.textContent = stats.count;
        if (rankEl) rankEl.textContent = stats.rank;
        if (streakEl) streakEl.textContent = stats.streak;
        if (dailyFill) dailyFill.style.width = stats.dailyGoalDone ? '100%' : '0%';

        if (continueBtn && lastPath) {
            continueBtn.href = lastPath;
            continueBtn.style.display = 'inline-flex';
        }
    };

    // --- Component Injection ---
    function injectNavigation() {
        if (document.getElementById('main-nav')) return;

        const nav = document.createElement('nav');
        nav.className = 'top-nav';
        nav.id = 'main-nav';

        const baseUrl = getBaseUrl();
        const currentModule = getCurrentModule();
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';

        const logo = `<a href="${baseUrl}index.html" class="nav-logo" id="nav-logo">🚀 Junior Coders</a>`;

        // Cheat sheet link for current course (used in module pages)
        const cheatsheetLink = currentModule === 'Learning HTML'    ? 'cheatsheet-html.html'
                             : currentModule === 'Learning CSS'     ? 'cheatsheet-css.html'
                             : currentModule === 'Learning JS'      ? 'cheatsheet-js.html'
                             : currentModule === 'Learning PHP'     ? 'cheatsheet-php.html'
                             : currentModule === 'Learning MySQL'   ? 'cheatsheet-mysql.html'
                             : currentModule === 'Learning Laravel' ? 'cheatsheet-laravel.html'
                             : null;

        // Active-section detection for dropdown highlight
        const cheatPaths = ['cheatsheet-html.html','cheatsheet-css.html','cheatsheet-js.html',
                            'cheatsheet-php.html','cheatsheet-mysql.html','cheatsheet-laravel.html'];
        const isResources = currentPath === 'ai-roadmap.html' || currentPath === 'getting-started.html' || cheatPaths.includes(currentPath);
        const isBackend   = currentModule === 'Learning PHP' || currentModule === 'Learning MySQL' || currentModule === 'Learning Laravel';
        const isFrontend  = !isBackend && !isResources && currentModule !== null && (
            currentModule === 'Learning HTML' || currentModule === 'Learning CSS' || currentModule === 'Learning JS'
        );

        let linksHtml = '';

        if (currentModule) {
            // ── Inside a course: Home | Modules ▾ | Cheat Sheet | AI Roadmap ──
            linksHtml = `
                <a href="${baseUrl}index.html" class="${currentPath === 'index.html' || currentPath === '' ? 'active' : ''}">🏠 Home</a>
                <div class="nav-dropdown">
                    <button class="nav-dropdown-btn" id="modules-dropdown-btn" aria-haspopup="true" aria-expanded="false">
                        📚 Modules <span class="dropdown-arrow">▾</span>
                    </button>
                    <div class="nav-dropdown-content">
                        ${CONFIG.MODULES[currentModule].map(item => `
                            <a href="${item.url}" class="${currentPath === item.url ? 'active' : ''}">${item.name}</a>
                        `).join('')}
                    </div>
                </div>
                ${cheatsheetLink ? `<a href="${cheatsheetLink}" class="${currentPath === cheatsheetLink ? 'active' : ''}">📋 Cheat Sheet</a>` : ''}
                <a href="${baseUrl}ai-roadmap.html" class="${currentPath === 'ai-roadmap.html' ? 'active' : ''}">🤖 AI Roadmap</a>
            `;
        } else {
            // ── Global pages: 3 clean dropdowns ──
            linksHtml = `
                <div class="nav-dropdown">
                    <button class="nav-dropdown-btn ${isFrontend ? 'active-parent' : ''}" id="frontend-dropdown-btn" aria-haspopup="true" aria-expanded="false">
                        🎨 Frontend <span class="dropdown-arrow">▾</span>
                    </button>
                    <div class="nav-dropdown-content nav-dropdown-rich">
                        <div class="dropdown-section-label">Courses</div>
                        <a href="${baseUrl}Learning%20HTML/learninghtml.html">
                            <span class="dd-icon" style="background:rgba(255,107,53,0.15);">🌐</span>
                            <span class="dd-text"><strong>HTML5</strong><small>Structure the web</small></span>
                        </a>
                        <a href="${baseUrl}Learning%20CSS/learningcss.html">
                            <span class="dd-icon" style="background:rgba(59,130,246,0.15);">🎨</span>
                            <span class="dd-text"><strong>Modern CSS</strong><small>Style &amp; layout</small></span>
                        </a>
                        <a href="${baseUrl}Learning%20JS/learningjs.html">
                            <span class="dd-icon" style="background:rgba(234,179,8,0.15);">⚡</span>
                            <span class="dd-text"><strong>JavaScript</strong><small>Logic &amp; interactivity</small></span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href="${baseUrl}master-playground.html" class="${currentPath === 'master-playground.html' ? 'active' : ''}">
                            <span class="dd-icon" style="background:rgba(99,102,241,0.15);">🧪</span>
                            <span class="dd-text"><strong>Code Lab</strong><small>Live IDE playground</small></span>
                        </a>
                    </div>
                </div>
                <div class="nav-dropdown">
                    <button class="nav-dropdown-btn ${isBackend ? 'active-parent' : ''}" id="backend-dropdown-btn" aria-haspopup="true" aria-expanded="false">
                        🗄️ Backend <span class="dropdown-arrow">▾</span>
                    </button>
                    <div class="nav-dropdown-content nav-dropdown-rich">
                        <div class="dropdown-section-label">Server-Side</div>
                        <a href="${baseUrl}Learning%20PHP/learningphp.html">
                            <span class="dd-icon" style="background:rgba(124,58,237,0.15);">🐘</span>
                            <span class="dd-text"><strong>PHP</strong><small>Server scripting</small></span>
                        </a>
                        <a href="${baseUrl}Learning%20MySQL/learningmysql.html">
                            <span class="dd-icon" style="background:rgba(0,180,216,0.15);">🗄️</span>
                            <span class="dd-text"><strong>MySQL</strong><small>Databases &amp; queries</small></span>
                        </a>
                        <a href="${baseUrl}Learning%20Laravel/learninglaravel.html">
                            <span class="dd-icon" style="background:rgba(255,45,32,0.15);">🔥</span>
                            <span class="dd-text"><strong>Laravel</strong><small>PHP framework</small></span>
                        </a>
                    </div>
                </div>
                <div class="nav-dropdown">
                    <button class="nav-dropdown-btn ${isResources ? 'active-parent' : ''}" id="resources-dropdown-btn" aria-haspopup="true" aria-expanded="false">
                        📚 Resources <span class="dropdown-arrow">▾</span>
                    </button>
                    <div class="nav-dropdown-content nav-dropdown-rich">
                        <div class="dropdown-section-label">Pages</div>
                        <a href="${baseUrl}getting-started.html" class="${currentPath === 'getting-started.html' ? 'active' : ''}">
                            <span class="dd-icon" style="background:rgba(16,185,129,0.15);">📖</span>
                            <span class="dd-text"><strong>Getting Started</strong><small>Beginners guide</small></span>
                        </a>
                        <a href="${baseUrl}ai-roadmap.html" class="${currentPath === 'ai-roadmap.html' ? 'active' : ''}">
                            <span class="dd-icon" style="background:rgba(236,72,153,0.15);">🤖</span>
                            <span class="dd-text"><strong>AI Roadmap</strong><small>From coder to AI creator</small></span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <div class="dropdown-section-label">Cheat Sheets</div>
                        <a href="${baseUrl}cheatsheet-html.html" class="${currentPath === 'cheatsheet-html.html' ? 'active' : ''}">🌐 HTML</a>
                        <a href="${baseUrl}cheatsheet-css.html" class="${currentPath === 'cheatsheet-css.html' ? 'active' : ''}">🎨 CSS</a>
                        <a href="${baseUrl}cheatsheet-js.html" class="${currentPath === 'cheatsheet-js.html' ? 'active' : ''}">⚡ JS</a>
                        <a href="${baseUrl}cheatsheet-php.html" class="${currentPath === 'cheatsheet-php.html' ? 'active' : ''}">🐘 PHP</a>
                        <a href="${baseUrl}cheatsheet-mysql.html" class="${currentPath === 'cheatsheet-mysql.html' ? 'active' : ''}">🗄️ MySQL</a>
                        <a href="${baseUrl}cheatsheet-laravel.html" class="${currentPath === 'cheatsheet-laravel.html' ? 'active' : ''}">🔥 Laravel</a>
                    </div>
                </div>
            `;
        }

        nav.innerHTML = `
            <div class="nav-container">
                ${logo}
                <button class="mobile-toggle" id="mobile-toggle" aria-label="Open menu" aria-controls="nav-links" aria-expanded="false">
                    <span class="mobile-toggle-icon" aria-hidden="true"><span></span><span></span><span></span></span>
                </button>
                <div class="nav-links" id="nav-links" role="navigation" aria-label="Main navigation">
                    ${linksHtml}
                    <div class="nav-search" id="nav-search">
                        <input type="text" placeholder="🔍 Search…" class="nav-search-input" id="nav-search-input" autocomplete="off" aria-label="Search courses and modules">
                        <div class="nav-search-results" id="nav-search-results"></div>
                    </div>
                    <div class="nav-mobile-actions" style="display:none;">
                        <span style="font-size:0.85rem; color:var(--text-muted); font-weight:600;">Switch Theme</span>
                        <button class="theme-toggle" type="button" aria-label="Toggle colour theme" title="Toggle Theme">🌓</button>
                    </div>
                </div>
                <div class="nav-right">
                    <div class="nav-search" id="nav-search-desktop">
                        <input type="text" placeholder="🔍 Search…" class="nav-search-input" id="nav-search-input-desktop" autocomplete="off" aria-label="Search courses and modules">
                        <div class="nav-search-results" id="nav-search-results-desktop"></div>
                    </div>
                    <button class="theme-toggle" type="button" aria-label="Toggle colour theme" title="Toggle Theme">🌓</button>
                </div>
            </div>
        `;

        // Backdrop overlay
        const backdrop = document.createElement('div');
        backdrop.className = 'nav-backdrop';
        backdrop.id = 'nav-backdrop';
        document.body.prepend(backdrop);
        document.body.prepend(nav);

        // ── Bottom Nav for Mobile (context-aware) ──
        const coursePageUrl = currentModule === 'Learning HTML'    ? 'learninghtml.html'
                            : currentModule === 'Learning CSS'     ? 'learningcss.html'
                            : currentModule === 'Learning JS'      ? 'learningjs.html'
                            : currentModule === 'Learning PHP'     ? 'learningphp.html'
                            : currentModule === 'Learning MySQL'   ? 'learningmysql.html'
                            : currentModule === 'Learning Laravel' ? 'learninglaravel.html'
                            : null;
        const cheatUrl = currentModule === 'Learning HTML'    ? 'cheatsheet-html.html'
                       : currentModule === 'Learning CSS'     ? 'cheatsheet-css.html'
                       : currentModule === 'Learning JS'      ? 'cheatsheet-js.html'
                       : currentModule === 'Learning PHP'     ? 'cheatsheet-php.html'
                       : currentModule === 'Learning MySQL'   ? 'cheatsheet-mysql.html'
                       : currentModule === 'Learning Laravel' ? 'cheatsheet-laravel.html'
                       : null;

        const bottomNav = document.createElement('div');
        bottomNav.className = 'bottom-nav';
        bottomNav.innerHTML = currentModule ? `
            <div class="bottom-nav-container">
                <a href="${coursePageUrl}" class="tab-item ${currentPath === coursePageUrl ? 'active' : ''}">
                    <span class="tab-icon">📚</span>
                    <span>Course</span>
                </a>
                <a href="${baseUrl}index.html" class="tab-item">
                    <span class="tab-icon">🏠</span>
                    <span>Home</span>
                </a>
                <a href="${baseUrl}${cheatUrl}" class="tab-item ${currentPath === cheatUrl ? 'active' : ''}">
                    <span class="tab-icon">📋</span>
                    <span>Cheat Sheet</span>
                </a>
            </div>
        ` : `
            <div class="bottom-nav-container">
                <a href="${baseUrl}getting-started.html" class="tab-item ${currentPath === 'getting-started.html' ? 'active' : ''}">
                    <span class="tab-icon">📖</span>
                    <span>Basics</span>
                </a>
                <a href="${baseUrl}index.html" class="tab-item ${currentPath === 'index.html' || currentPath === '' ? 'active' : ''}">
                    <span class="tab-icon">🏠</span>
                    <span>Home</span>
                </a>
                <a href="${baseUrl}master-playground.html" class="tab-item ${currentPath === 'master-playground.html' ? 'active' : ''}">
                    <span class="tab-icon">🧪</span>
                    <span>Lab</span>
                </a>
            </div>
        `;
        document.body.appendChild(bottomNav);

        // ── Scroll shadow on nav ──
        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 10);
        }, { passive: true });

        // ── Mobile menu logic ──
        const toggle = document.getElementById('mobile-toggle');
        const navLinks = document.getElementById('nav-links');
        const dropdownButtons = nav.querySelectorAll('.nav-dropdown-btn');

        const openMenu = () => {
            navLinks?.classList.add('open');
            backdrop.classList.add('visible');
            toggle?.classList.add('active');
            toggle?.setAttribute('aria-expanded', 'true');
            toggle?.setAttribute('aria-label', 'Close menu');
            document.body.style.overflow = 'hidden';
        };

        const closeMenu = () => {
            navLinks?.classList.remove('open');
            backdrop.classList.remove('visible');
            toggle?.classList.remove('active');
            toggle?.setAttribute('aria-expanded', 'false');
            toggle?.setAttribute('aria-label', 'Open menu');
            nav.querySelectorAll('.nav-dropdown.active').forEach(d => d.classList.remove('active'));
            dropdownButtons.forEach(b => b.setAttribute('aria-expanded', 'false'));
            document.body.style.overflow = '';
        };

        toggle?.addEventListener('click', () => {
            navLinks?.classList.contains('open') ? closeMenu() : openMenu();
        });

        backdrop.addEventListener('click', closeMenu);
        backdrop.addEventListener('touchstart', closeMenu, { passive: true }); // iOS Safari fix

        // ── Dropdown toggle (desktop click + mobile) ──
        dropdownButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const parent = btn.parentElement;
                const isOpen = parent.classList.contains('active');
                nav.querySelectorAll('.nav-dropdown.active').forEach(d => d.classList.remove('active'));
                dropdownButtons.forEach(b => b.setAttribute('aria-expanded', 'false'));
                if (!isOpen) {
                    parent.classList.add('active');
                    btn.setAttribute('aria-expanded', 'true');
                }
            });
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-dropdown')) {
                nav.querySelectorAll('.nav-dropdown.active').forEach(d => d.classList.remove('active'));
                dropdownButtons.forEach(b => b.setAttribute('aria-expanded', 'false'));
            }
        });

        navLinks?.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key !== 'Escape') return;
            closeMenu();
            toggle?.focus();
        });

        // ── Search (desktop + mobile) ──
        initSearch(baseUrl, 'nav-search-input-desktop', 'nav-search-results-desktop');
        initSearch(baseUrl, 'nav-search-input', 'nav-search-results');
    }

    function injectFooter() {
        if (document.querySelector('.site-footer')) return;

        const footer = document.createElement('footer');
        footer.className = 'site-footer';
        footer.innerHTML = `
            <div class="footer-content">
                <div class="footer-links">
                    <a href="${getBaseUrl()}index.html">Home</a>
                    <a href="${getBaseUrl()}getting-started.html">Getting Started</a>
                    <a href="${getBaseUrl()}contact.html">Contact Us</a>
                </div>
                <div class="credits">Created with ❤️ by <strong>Yasir Rasool</strong></div>
                <p>&copy; ${new Date().getFullYear()} Junior Coders platform. All rights reserved.</p>
            </div>
        `;
        document.body.appendChild(footer);
    }

    // --- Toast Engine ---
    window.showToast = (message, type = 'success') => {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    };

    // --- State Management ---
    function initTheme() {
        const savedTheme = JC_State.get('theme');
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        JC_State.set('theme', next);
    }
    window.toggleTheme = toggleTheme;

    // --- Progress Tracking ---
    function triggerConfetti() {
        if (typeof confetti === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
            script.onload = () => {
                window.confetti({
                    particleCount: 120,
                    spread: 80,
                    origin: { y: 0.6 },
                    colors: ['#6366f1', '#f43f5e', '#10b981', '#f59e0b', '#0ea5e9']
                });
            };
            document.head.appendChild(script);
        } else {
            window.confetti({
                particleCount: 120,
                spread: 80,
                origin: { y: 0.6 },
                colors: ['#6366f1', '#f43f5e', '#10b981', '#f59e0b', '#0ea5e9']
            });
        }
    }

    window.markComplete = (moduleNum) => {
        const currentModule = getCurrentModule();
        if (!currentModule) return;

        const completed = JC_State.get('completedModules');
        const moduleKey = `${currentModule}_${moduleNum}`;

        if (!completed.includes(moduleKey)) {
            completed.push(moduleKey);
            JC_State.set('completedModules', completed);
            window.showToast(`Module ${moduleNum} completed! 🎉`);
            triggerConfetti();

            const progressFill = document.getElementById('progressFill');
            const completedText = document.getElementById('completedModules');
            if (progressFill && completedText) {
                const total = CONFIG.MODULES[currentModule].filter(m => m.name.includes(':')).length || 8;
                const currentCompleted = completed.filter(m => m.startsWith(currentModule)).length;
                const percentage = (currentCompleted / total) * 100;
                progressFill.style.width = percentage + '%';
                completedText.textContent = currentCompleted;
            }
        } else {
            window.showToast('Module already completed!');
        }
    };

    // --- Quiz Logic (Universal) ---
    window.checkQuiz = (moduleNum) => {
        const quizForm = document.getElementById(`quiz-form-${moduleNum}`);
        if (!quizForm) return;

        const questions = quizForm.querySelectorAll('.quiz-question');
        let score = 0;

        questions.forEach(q => {
            const selected = q.querySelector('input[type="radio"]:checked');
            const feedback = q.querySelector('.quiz-feedback');
            const correctAnswer = q.dataset.answer || q.querySelector('input[type="radio"][data-correct]')?.value;

            if (selected && selected.value === correctAnswer) {
                score++;
                if (feedback) { feedback.textContent = '✓ Correct!'; feedback.className = 'quiz-feedback correct'; }
            } else {
                if (feedback) { feedback.textContent = '✗ Try again'; feedback.className = 'quiz-feedback incorrect'; }
            }
        });

        window.showToast(`You scored ${score}/${questions.length}!`, score === questions.length ? 'success' : 'error');
    };

    // --- Search Engine ---
    function buildSearchIndex(baseUrl) {
        const index = [];
        const courseMap = {
            'Learning HTML':   { icon: '🌐', path: 'Learning%20HTML',   home: 'learninghtml.html'   },
            'Learning CSS':    { icon: '🎨', path: 'Learning%20CSS',    home: 'learningcss.html'    },
            'Learning JS':     { icon: '⚡', path: 'Learning%20JS',     home: 'learningjs.html'     },
            'Learning PHP':    { icon: '🐘', path: 'Learning%20PHP',    home: 'learningphp.html'    },
            'Learning MySQL':  { icon: '🗄️', path: 'Learning%20MySQL',  home: 'learningmysql.html'  },
            'Learning Laravel':{ icon: '🔥', path: 'Learning%20Laravel',home: 'learninglaravel.html'},
        };

        Object.entries(courseMap).forEach(([name, c]) => {
            index.push({ label: name, sub: 'Course', icon: c.icon, url: `${baseUrl}${c.path}/${c.home}` });
        });

        Object.entries(CONFIG.MODULES).forEach(([course, modules]) => {
            const c = courseMap[course];
            modules.forEach(mod => {
                if (mod.url === c.home) return;
                index.push({ label: mod.name, sub: course, icon: c.icon, url: `${baseUrl}${c.path}/${mod.url}` });
            });
        });

        [
            { label: 'HTML Cheat Sheet',    sub: 'Cheat Sheets', icon: '📋', url: `${baseUrl}cheatsheet-html.html`    },
            { label: 'CSS Cheat Sheet',     sub: 'Cheat Sheets', icon: '📋', url: `${baseUrl}cheatsheet-css.html`     },
            { label: 'JS Cheat Sheet',      sub: 'Cheat Sheets', icon: '📋', url: `${baseUrl}cheatsheet-js.html`      },
            { label: 'PHP Cheat Sheet',     sub: 'Cheat Sheets', icon: '📋', url: `${baseUrl}cheatsheet-php.html`     },
            { label: 'MySQL Cheat Sheet',   sub: 'Cheat Sheets', icon: '📋', url: `${baseUrl}cheatsheet-mysql.html`   },
            { label: 'Laravel Cheat Sheet', sub: 'Cheat Sheets', icon: '📋', url: `${baseUrl}cheatsheet-laravel.html` },
        ].forEach(item => index.push(item));

        [
            { label: 'AI Roadmap',      sub: 'Pages', icon: '🤖', url: `${baseUrl}ai-roadmap.html`        },
            { label: 'Getting Started', sub: 'Pages', icon: '📖', url: `${baseUrl}getting-started.html`   },
            { label: 'Code Lab',        sub: 'Pages', icon: '🧪', url: `${baseUrl}master-playground.html` },
            { label: 'Home',            sub: 'Pages', icon: '🏠', url: `${baseUrl}index.html`             },
        ].forEach(item => index.push(item));

        return index;
    }

    function initSearch(baseUrl, inputId = 'nav-search-input', resultsId = 'nav-search-results') {
        const input   = document.getElementById(inputId);
        const results = document.getElementById(resultsId);
        if (!input || !results) return;

        const index = buildSearchIndex(baseUrl);

        const render = (q) => {
            const term = q.trim().toLowerCase();
            if (!term) { results.classList.remove('open'); results.innerHTML = ''; return; }
            const hits = index.filter(item =>
                item.label.toLowerCase().includes(term) || item.sub.toLowerCase().includes(term)
            ).slice(0, 9);
            if (hits.length === 0) {
                results.innerHTML = '<div class="search-no-results">No results found 😕</div>';
            } else {
                results.innerHTML = hits.map(item => `
                    <a href="${item.url}" class="search-result-item">
                        <span class="search-result-icon">${item.icon}</span>
                        <span class="search-result-label">${item.label}</span>
                        <span class="search-result-sub">${item.sub}</span>
                    </a>
                `).join('');
            }
            results.classList.add('open');
        };

        input.addEventListener('input', () => render(input.value));
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') { results.classList.remove('open'); input.value = ''; input.blur(); }
            if (e.key === 'Enter') {
                const first = results.querySelector('a.search-result-item');
                if (first) first.click();
            }
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest(`#${input.parentElement?.id || 'nav-search'}`)) {
                results.classList.remove('open');
            }
        });
    }

    function injectModuleNavigator() {
        const currentModule = getCurrentModule();
        if (!currentModule) return;

        const path = window.location.pathname.split('/').pop();
        if (path.includes('learning') || path.includes('index') || path.includes('playground') || path.includes('exercises') || path.includes('glossary') || path.includes('quiz')) return;

        const modules = CONFIG.MODULES[currentModule];
        const currentIndex = modules.findIndex(m => m.url === path);
        if (currentIndex === -1) return;

        const prev = modules[currentIndex - 1];
        const next = modules[currentIndex + 1];

        const moduleMatch = path.match(/module(\d+)/);
        const moduleNum = moduleMatch ? moduleMatch[1] : null;

        const nav = document.createElement('div');
        nav.className = 'module-navigator';
        nav.innerHTML = `
            <a href="${prev ? prev.url : '#'}" class="btn-nav-control prev" ${!prev ? 'disabled' : ''}>
                <span>←</span> Previous
            </a>
            ${moduleNum ? `<button class="btn-nav-control complete" onclick="markComplete('${moduleNum}')">✓ Complete</button>` : ''}
            <a href="${next ? next.url : (
                currentModule === 'Learning HTML'    ? 'learninghtml.html'    :
                currentModule === 'Learning CSS'     ? 'learningcss.html'     :
                currentModule === 'Learning JS'      ? 'learningjs.html'      :
                currentModule === 'Learning PHP'     ? 'learningphp.html'     :
                currentModule === 'Learning MySQL'   ? 'learningmysql.html'   :
                'learninglaravel.html'
            )}" class="btn-nav-control next">
                ${next ? 'Next' : 'Finish'} <span>→</span>
            </a>
        `;

        const container = document.querySelector('.module-container') || document.querySelector('main') || document.body;
        container.appendChild(nav);
    }

    // --- Initialization ---
    document.addEventListener('DOMContentLoaded', () => {
        initTheme();
        updateStreak();
        injectNavigation();
        injectModuleNavigator();
        injectFooter();

        trackVisit();

        if (document.getElementById('user-xp')) {
            updateDashboard();
        }

        document.body.addEventListener('click', (e) => {
            if (e.target.closest('.theme-toggle')) {
                toggleTheme();
            }
        });
    });

})();
