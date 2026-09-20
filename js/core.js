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
                { name: '13: Capstone Projects', url: 'module13.html' },
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
            completedChapters: [],
            totalXP: 0,
            streak: 1,
            lastActiveDay: null,
            lastModule: null,
            lastModulePath: null
        },

        load: function() {
            let state = localStorage.getItem(this.KEY);
            if (state) {
                try {
                    const parsed = JSON.parse(state);
                    parsed.completedChapters = parsed.completedChapters || [];
                    parsed.totalXP = typeof parsed.totalXP === 'number' ? parsed.totalXP : 0;
                    return parsed;
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

            const completedList = legacyCompleted ? JSON.parse(legacyCompleted) : [];
            const migrated = {
                theme: legacyTheme || 'dark',
                completedModules: completedList,
                completedChapters: [],
                totalXP: completedList.length * 100,
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
            localStorage.setItem(CONFIG.STORAGE_KEYS.COMPLETED, JSON.stringify(state.completedModules || []));
            localStorage.setItem('jc_completed_chapters', JSON.stringify(state.completedChapters || []));
            localStorage.setItem('jc_total_xp', (state.totalXP || 0).toString());
            localStorage.setItem(CONFIG.STORAGE_KEYS.THEME, state.theme || 'dark');
            localStorage.setItem('jc_daily_streak', (state.streak || 1).toString());
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

    // Expose JC_State globally
    window.JC_State = JC_State;

    // --- XP & Progression Engine ---
    window.awardXP = function(amount, reason = '') {
        const state = JC_State.load();
        state.totalXP = (state.totalXP || 0) + amount;
        JC_State.save(state);
        updateDashboard();
        if (window.showToast) {
            window.showToast(`+${amount} XP! ${reason} 🚀`, 'success');
        }
        return state.totalXP;
    };

    window.markChapterComplete = function(chapterKey, xpBonus = 25) {
        const state = JC_State.load();
        state.completedChapters = state.completedChapters || [];
        if (!state.completedChapters.includes(chapterKey)) {
            state.completedChapters.push(chapterKey);
            state.totalXP = (state.totalXP || 0) + xpBonus;
            const todayStr = new Date().toISOString().split('T')[0];
            state.lastActiveDay = todayStr;
            JC_State.save(state);
            updateDashboard();
            if (window.showToast) {
                window.showToast(`Chapter Completed! +${xpBonus} XP 🎉`, 'success');
            }
            return true;
        }
        return false;
    };

    // --- Universal Exercise Loader ---
    window.loadExerciseToPlayground = function(data) {
        if (!data) return;
        try {
            localStorage.setItem('pendingExercise', JSON.stringify({
                title: data.title || 'Coding Practice',
                html: data.html || data.starterCode || '',
                css: data.css || '',
                js: data.js || '',
                instructions: data.instructions || '',
                level: data.level || 'Practice',
                type: data.type || 'html'
            }));
            const isSub = window.location.pathname.includes('Learning') || window.location.pathname.includes('book');
            const targetUrl = (isSub ? '../' : './') + 'master-playground.html';
            window.location.href = targetUrl;
        } catch(err) {
            console.error('Failed to load exercise to playground:', err);
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
                        window.showToast?.(`Daily streak updated! 🔥 ${streak} Days`);
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
        const state = JC_State.load();
        const completedMods = state.completedModules || [];
        const completedChaps = state.completedChapters || [];
        
        // Base calculated XP or stored totalXP
        const xp = Math.max(state.totalXP || 0, (completedMods.length * 100) + (completedChaps.length * 25));

        let rank = 'Recruit';
        if (xp >= 300) rank = 'Apprentice';
        if (xp >= 700) rank = 'Builder';
        if (xp >= 1400) rank = 'Stylist';
        if (xp >= 2200) rank = 'Architect';
        if (xp >= 3000) rank = 'Master';

        const streak = state.streak || 1;
        const lastActiveDay = state.lastActiveDay;
        const todayStr = new Date().toISOString().split('T')[0];
        const dailyGoalDone = lastActiveDay === todayStr && (completedMods.length > 0 || completedChaps.length > 0 || xp > 0);
        const totalCompleted = completedMods.length + completedChaps.length;

        return { xp, count: totalCompleted, rank, streak, dailyGoalDone };
    };

    const trackVisit = () => {
        const path = window.location.pathname.split('/').pop();
        if (path.includes('module') || path.includes('ch') || path.includes('index.html')) {
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
                            'cheatsheet-cmd.html','cheatsheet-git.html','cheatsheet-php.html','cheatsheet-mysql.html','cheatsheet-laravel.html'];
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
                        🗄️ Backend &amp; Tools <span class="dropdown-arrow">▾</span>
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
                        <div class="dropdown-divider"></div>
                        <div class="dropdown-section-label">Developer Tools</div>
                        <a href="${baseUrl}book-cmd/index.html">
                            <span class="dd-icon" style="background:rgba(16,185,129,0.15);">💻</span>
                            <span class="dd-text"><strong>Terminal &amp; CMD</strong><small>Command prompt &amp; Git Bash</small></span>
                        </a>
                        <a href="${baseUrl}book-git/index.html">
                            <span class="dd-icon" style="background:rgba(240,80,50,0.15);">🐙</span>
                            <span class="dd-text"><strong>Git &amp; GitHub</strong><small>Version control &amp; teamwork</small></span>
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
                        <a href="${baseUrl}cheatsheet-cmd.html" class="${currentPath === 'cheatsheet-cmd.html' ? 'active' : ''}">💻 Terminal &amp; CMD</a>
                        <a href="${baseUrl}cheatsheet-git.html" class="${currentPath === 'cheatsheet-git.html' ? 'active' : ''}">🐙 Git &amp; GitHub</a>
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
                        <span style="font-size:0.85rem; color:var(--text-muted); font-weight:600;">Page Audio &amp; Settings</span>
                        <div style="display:flex; gap:0.5rem; align-items:center; flex-wrap:wrap;">
                            <button class="page-speaker-toggle" type="button" onclick="window.togglePageSpeaker()" aria-label="Listen to page aloud" title="Listen to this page">
                                <span class="speaker-icon">🔊</span>
                                <span class="speaker-text">Listen</span>
                                <div class="speaker-wave" aria-hidden="true"><span></span><span></span><span></span></div>
                            </button>
                            <button class="page-speaker-stop-btn" type="button" onclick="window.stopPageSpeaker()" aria-label="Stop audio narration" title="Stop Reading">⏹️</button>
                            <button class="theme-toggle" type="button" aria-label="Toggle colour theme" title="Toggle Theme">🌓</button>
                            <button class="reading-mode-toggle" type="button" aria-label="Toggle reading mode" title="Reading Mode">📖 Read Mode</button>
                        </div>
                    </div>
                </div>
                <div class="nav-right">
                    <div class="nav-search" id="nav-search-desktop">
                        <input type="text" placeholder="🔍 Search…" class="nav-search-input" id="nav-search-input-desktop" autocomplete="off" aria-label="Search courses and modules">
                        <kbd class="nav-search-kbd" id="nav-search-kbd">Ctrl K</kbd>
                        <div class="nav-search-results" id="nav-search-results-desktop"></div>
                    </div>
                    <button class="page-speaker-toggle" id="page-speaker-toggle" type="button" onclick="window.togglePageSpeaker()" aria-label="Listen to page aloud" title="Listen to this page (Alt+S)">
                        <span class="speaker-icon">🔊</span>
                        <span class="speaker-text">Listen</span>
                        <div class="speaker-wave" aria-hidden="true"><span></span><span></span><span></span></div>
                    </button>
                    <button class="page-speaker-stop-btn" id="page-speaker-stop-btn" type="button" onclick="window.stopPageSpeaker()" aria-label="Stop audio narration" title="Stop Reading">⏹️</button>
                    <button class="reading-mode-toggle" type="button" aria-label="Toggle reading mode" title="Distraction-Free Reading Mode">📖 Read Mode</button>
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
            nav.querySelectorAll('.nav-dropdown.active').forEach(d => d.classList.remove('active'));
            document.querySelectorAll('.nav-search-results.open').forEach(r => r.classList.remove('open'));
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
            <div class="footer-top-gradient" aria-hidden="true"></div>
            <div class="footer-content">
                <div class="footer-links">
                    <a href="${getBaseUrl()}index.html">Home</a>
                    <a href="${getBaseUrl()}getting-started.html">Getting Started</a>
                    <a href="${getBaseUrl()}master-playground.html">Master IDE</a>
                    <a href="${getBaseUrl()}contact.html">Contact Us</a>
                </div>
                <div class="credits">Crafted with excellence (<em>Iḥsān</em>) by <strong>Yasir Rasool</strong></div>
                <p>&copy; ${new Date().getFullYear()} Junior Coders Educational Platform. Dedicated to <em>'Ilm Nāfi'</em> (Beneficial Knowledge).</p>
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
            { label: 'HTML Cheat Sheet',         sub: 'Cheat Sheets', icon: '📋', url: `${baseUrl}cheatsheet-html.html`    },
            { label: 'CSS Cheat Sheet',          sub: 'Cheat Sheets', icon: '📋', url: `${baseUrl}cheatsheet-css.html`     },
            { label: 'JS Cheat Sheet',           sub: 'Cheat Sheets', icon: '📋', url: `${baseUrl}cheatsheet-js.html`      },
            { label: 'Git & GitHub Cheat Sheet', sub: 'Cheat Sheets', icon: '🐙', url: `${baseUrl}cheatsheet-git.html`     },
            { label: 'PHP Cheat Sheet',          sub: 'Cheat Sheets', icon: '📋', url: `${baseUrl}cheatsheet-php.html`     },
            { label: 'MySQL Cheat Sheet',        sub: 'Cheat Sheets', icon: '📋', url: `${baseUrl}cheatsheet-mysql.html`   },
            { label: 'Laravel Cheat Sheet',      sub: 'Cheat Sheets', icon: '📋', url: `${baseUrl}cheatsheet-laravel.html` },
        ].forEach(item => index.push(item));

        // Textbooks & Interactive Playgrounds
        [
            { label: 'HTML Interactive Lab (17 Chapters)', sub: 'Playground', icon: '🧪', url: `${baseUrl}Learning%20HTML/playground.html` },
            { label: 'CSS Interactive Studio',            sub: 'Playground', icon: '🎨', url: `${baseUrl}Learning%20CSS/playground.html` },
            { label: 'JavaScript Playground',              sub: 'Playground', icon: '⚡', url: `${baseUrl}Learning%20JS/playground.html` },
            { label: 'Code Lab (Master IDE)',              sub: 'Playground', icon: '💻', url: `${baseUrl}master-playground.html` },
            { label: 'HTML for Class 6 & 7 (Textbook)',    sub: 'Textbook',   icon: '📖', url: `${baseUrl}book-html/index.html` },
            { label: 'CSS for Class 7 (Textbook)',         sub: 'Textbook',   icon: '📖', url: `${baseUrl}book-css/index.html` },
            { label: 'JavaScript for Class 7 (Textbook)',  sub: 'Textbook',   icon: '📖', url: `${baseUrl}book-js/index.html` },
            { label: 'Git & GitHub Version Control (Textbook)', sub: 'Textbook', icon: '🐙', url: `${baseUrl}book-git/index.html` },
            { label: 'PHP for Class 9 (Textbook)',         sub: 'Textbook',   icon: '📖', url: `${baseUrl}book-php/index.html` },
            { label: 'MySQL for Class 9 (Textbook)',       sub: 'Textbook',   icon: '📖', url: `${baseUrl}book-mysql/index.html` },
            { label: 'Laravel for Class 9 (Textbook)',     sub: 'Textbook',   icon: '📖', url: `${baseUrl}book-laravel/index.html` },
            { label: 'HTML Master Quiz',                   sub: 'Quiz',       icon: '🏆', url: `${baseUrl}Learning%20HTML/quiz.html` },
            { label: 'CSS Master Quiz',                    sub: 'Quiz',       icon: '🏆', url: `${baseUrl}Learning%20CSS/quiz.html` },
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

        const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
        const kbd = document.getElementById('nav-search-kbd');
        if (kbd && isMac) kbd.textContent = '⌘K';

        const index = buildSearchIndex(baseUrl);
        let selectedIndex = -1;

        const updateSelection = (items) => {
            items.forEach((el, idx) => {
                el.classList.toggle('selected', idx === selectedIndex);
                if (idx === selectedIndex) {
                    el.scrollIntoView({ block: 'nearest' });
                }
            });
        };

        const render = (q) => {
            const term = q.trim().toLowerCase();
            selectedIndex = -1;
            if (!term) { results.classList.remove('open'); results.innerHTML = ''; return; }
            const hits = index.filter(item =>
                item.label.toLowerCase().includes(term) || item.sub.toLowerCase().includes(term)
            ).slice(0, 9);
            if (hits.length === 0) {
                results.innerHTML = '<div class="search-no-results">No results found 😕</div>';
            } else {
                results.innerHTML = hits.map((item, idx) => `
                    <a href="${item.url}" class="search-result-item" data-index="${idx}">
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
            const items = results.querySelectorAll('a.search-result-item');
            if (e.key === 'Escape') { 
                results.classList.remove('open'); 
                input.value = ''; 
                input.blur(); 
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (items.length > 0) {
                    selectedIndex = (selectedIndex + 1) % items.length;
                    updateSelection(items);
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (items.length > 0) {
                    selectedIndex = (selectedIndex - 1 + items.length) % items.length;
                    updateSelection(items);
                }
            } else if (e.key === 'Enter') {
                if (selectedIndex >= 0 && items[selectedIndex]) {
                    e.preventDefault();
                    items[selectedIndex].click();
                } else {
                    const first = results.querySelector('a.search-result-item');
                    if (first) first.click();
                }
            }
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest(`#${input.parentElement?.id || 'nav-search'}`)) {
                results.classList.remove('open');
            }
        });
    }

    // Global shortcut Ctrl+K / Cmd+K and /
    document.addEventListener('keydown', (e) => {
        const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
        const isModifier = isMac ? e.metaKey : e.ctrlKey;
        const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
        const isTyping = activeTag === 'input' || activeTag === 'textarea' || document.activeElement.isContentEditable;

        if ((isModifier && e.key.toLowerCase() === 'k') || (!isTyping && e.key === '/')) {
            e.preventDefault();
            const desktopInput = document.getElementById('nav-search-input-desktop');
            const mobileInput = document.getElementById('nav-search-input');
            const target = (desktopInput && window.innerWidth > 900) ? desktopInput : mobileInput;
            if (target) {
                target.focus();
                target.select();
            }
        }
    });

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

    // --- Universal Text-to-Speech Engine for Pages & Lessons ---
    function initPageSpeaker() {
        if (!('speechSynthesis' in window)) return;

        const header = document.querySelector('.module-header');
        const sections = document.querySelectorAll('.content-section');

        // Speaker Engine State
        let queue = [];
        let currentIndex = -1;
        let isPaused = false;
        let currentRate = 1.0;
        let preferredVoice = null;

        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            preferredVoice = voices.find(v => v.lang && v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Online') || v.name.includes('Jenny') || v.name.includes('Guy'))) ||
                             voices.find(v => v.lang && v.lang.startsWith('en')) ||
                             voices[0] || null;
        };
        loadVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }

        const EMOJI_REGEX = /(?:\p{Extended_Pictographic}|\p{Emoji_Presentation}|\p{Emoji_Modifier_Base}|\p{Emoji_Modifier}|[\u{1F1E6}-\u{1F1FF}\u{200D}\u{FE0E}\u{FE0F}\u{20E3}])/gu;

        const cleanText = (text) => {
            return (text || '')
                .replace(/<[^>]*>/g, ' ')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&amp;/g, '&')
                .replace(/&quot;/g, '"')
                .replace(/&apos;/g, "'")
                .replace(EMOJI_REGEX, '')
                .replace(/\s+([,.:;!?])/g, '$1')
                .replace(/\(\s+/g, '(')
                .replace(/\s+\)/g, ')')
                .replace(/\s+/g, ' ')
                .trim();
        };

        const getCleanElementText = (el) => {
            if (!el) return '';
            const clone = el.cloneNode(true);
            clone.querySelectorAll('button, .section-speaker-btn, .book-section-speaker-btn, script, style, .screen-reader-only').forEach(n => n.remove());
            return cleanText(clone.innerText || clone.textContent || '');
        };

        const clearHighlights = () => {
            document.querySelectorAll('.tts-highlight, .tts-page-highlight').forEach(el => {
                el.classList.remove('tts-highlight', 'tts-page-highlight');
            });
            document.querySelectorAll('.section-speaker-btn.active').forEach(b => b.classList.remove('active'));
        };

        const stopSpeech = () => {
            window.speechSynthesis.cancel();
            queue = [];
            currentIndex = -1;
            isPaused = false;
            clearHighlights();
            updateToolbarUI('idle');
        };

        const updateToolbarUI = (state, label = '') => {
            // 1. Update lesson toolbar if present
            const bar = document.getElementById('lesson-speaker-bar');
            const mainBtn = document.getElementById('speaker-main-btn');
            const statusEl = document.getElementById('speaker-status-text');
            if (bar && mainBtn) {
                if (state === 'speaking') {
                    bar.classList.add('is-speaking');
                    mainBtn.innerHTML = `<span>⏸️</span> Pause`;
                    if (statusEl) statusEl.textContent = label ? `Reading: "${label}"` : 'Reading lesson...';
                } else if (state === 'paused') {
                    bar.classList.remove('is-speaking');
                    mainBtn.innerHTML = `<span>▶️</span> Resume`;
                    if (statusEl) statusEl.textContent = 'Paused';
                } else {
                    bar.classList.remove('is-speaking');
                    mainBtn.innerHTML = `<span>🔊</span> Read Lesson`;
                    if (statusEl) statusEl.textContent = label || 'Listen to this lesson';
                }
            }

            // 2. Update global nav speaker buttons
            document.querySelectorAll('.page-speaker-toggle').forEach(btn => {
                const textEl = btn.querySelector('.speaker-text');
                const iconEl = btn.querySelector('.speaker-icon');
                btn.classList.remove('is-speaking', 'is-paused');

                if (state === 'speaking') {
                    btn.classList.add('is-speaking');
                    if (textEl) textEl.textContent = 'Pause';
                    if (iconEl) iconEl.textContent = '⏸️';
                    btn.title = 'Pause narration';
                } else if (state === 'paused') {
                    btn.classList.add('is-paused');
                    if (textEl) textEl.textContent = 'Resume';
                    if (iconEl) iconEl.textContent = '▶️';
                    btn.title = 'Resume narration';
                } else {
                    if (textEl) textEl.textContent = 'Listen';
                    if (iconEl) iconEl.textContent = '🔊';
                    btn.title = 'Listen to this page aloud (Alt+S)';
                }
            });

            // 3. Update global nav stop buttons
            document.querySelectorAll('.page-speaker-stop-btn').forEach(btn => {
                btn.style.display = (state === 'speaking' || state === 'paused') ? 'inline-grid' : 'none';
            });
        };

        const playNextInQueue = () => {
            if (currentIndex >= queue.length - 1) {
                stopSpeech();
                updateToolbarUI('idle', 'Finished reading 🎉');
                if (window.showToast) window.showToast('Finished reading page 🎉', 'success');
                return;
            }

            currentIndex++;
            const item = queue[currentIndex];

            clearHighlights();
            if (item.el) {
                const highlightClass = sections.length > 0 ? 'tts-highlight' : 'tts-page-highlight';
                item.el.classList.add(highlightClass);
                item.el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            const spokenText = cleanText(item.text);
            if (!spokenText) {
                playNextInQueue();
                return;
            }

            const snippet = spokenText.length > 25 ? spokenText.substring(0, 25) + '...' : spokenText;
            updateToolbarUI('speaking', snippet);

            const utterance = new SpeechSynthesisUtterance(spokenText);
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

        const buildLessonQueue = () => {
            const items = [];

            // Title and subtitle
            if (header) {
                const title = header.querySelector('h1');
                const sub = header.querySelector('p');
                if (title) {
                    const txt = getCleanElementText(title);
                    if (txt.length > 1) items.push({ el: title, text: txt });
                }
                if (sub) {
                    const txt = getCleanElementText(sub);
                    if (txt.length > 1) items.push({ el: sub, text: txt });
                }
            }

            // Sections
            sections.forEach(sec => {
                const h2 = sec.querySelector('h2');
                if (h2) {
                    const txt = getCleanElementText(h2);
                    if (txt.length > 1) items.push({ el: h2, text: txt });
                }

                const contentNodes = sec.querySelectorAll('p, li, .quiz-question > p');
                contentNodes.forEach(node => {
                    if (node.closest('#code-editor') || node.closest('.editor-area') || node.closest('.lesson-speaker-bar')) return;
                    const txt = getCleanElementText(node);
                    if (txt.length > 1) {
                        items.push({ el: node, text: txt });
                    }
                });
            });

            return items;
        };

        const buildGeneralPageQueue = () => {
            const items = [];
            const root = document.querySelector('main') || document.querySelector('.container') || document.body;
            if (!root) return items;

            const candidates = root.querySelectorAll('h1, h2, h3, h4, p, li, blockquote');
            const visited = new Set();

            const isExcluded = (el) => {
                return el.closest('nav') || el.closest('#main-nav') || el.closest('.top-nav') ||
                       el.closest('footer') || el.closest('.site-footer') || el.closest('.bottom-nav') ||
                       el.closest('.nav-search') || el.closest('pre') || el.closest('code') ||
                       el.closest('script') || el.closest('style') || el.closest('.ide-editor-panel');
            };

            candidates.forEach(el => {
                if (isExcluded(el) || visited.has(el)) return;
                visited.add(el);

                const txt = getCleanElementText(el);
                if (txt.length > 2 && !txt.startsWith('http')) {
                    items.push({ el, text: txt });
                }
            });

            return items;
        };

        const startSpeech = () => {
            window.speechSynthesis.cancel();
            queue = (sections.length > 0) ? buildLessonQueue() : buildGeneralPageQueue();

            if (queue.length === 0) {
                if (window.showToast) window.showToast('No readable text found on this page 😕', 'info');
                return;
            }
            currentIndex = -1;
            isPaused = false;
            updateToolbarUI('speaking');
            if (window.showToast) window.showToast('Listening to page aloud 🔊 (Press Esc to stop)', 'success');
            playNextInQueue();
        };

        const toggleSpeech = () => {
            if (queue.length > 0) {
                if (isPaused) {
                    window.speechSynthesis.resume();
                    isPaused = false;
                    updateToolbarUI('speaking');
                    if (window.showToast) window.showToast('Speech resumed 🔊', 'success');
                } else {
                    window.speechSynthesis.pause();
                    isPaused = true;
                    updateToolbarUI('paused');
                    if (window.showToast) window.showToast('Speech paused ⏸️', 'info');
                }
            } else {
                startSpeech();
            }
        };

        window.togglePageSpeaker = toggleSpeech;
        window.stopPageSpeaker = stopSpeech;

        const startSectionSpeech = (sectionEl, btnEl) => {
            stopSpeech();
            btnEl.classList.add('active');

            const items = [];
            const h2 = sectionEl.querySelector('h2');
            if (h2) {
                const txt = getCleanElementText(h2);
                if (txt.length > 1) items.push({ el: h2, text: txt });
            }

            const nodes = sectionEl.querySelectorAll('p, li, .quiz-question > p');
            nodes.forEach(node => {
                if (node.closest('#code-editor') || node.closest('.editor-area') || node.closest('.lesson-speaker-bar')) return;
                const txt = getCleanElementText(node);
                if (txt.length > 1) {
                    items.push({ el: node, text: txt });
                }
            });

            queue = items;
            currentIndex = -1;
            isPaused = false;
            playNextInQueue();
        };

        // Create Lesson Toolbar only if on a structured lesson page
        if (header || sections.length > 0) {
            const toolbar = document.createElement('div');
            toolbar.className = 'lesson-speaker-bar';
            toolbar.id = 'lesson-speaker-bar';
            toolbar.setAttribute('role', 'region');
            toolbar.setAttribute('aria-label', 'Lesson audio speaker');
            toolbar.innerHTML = `
                <button type="button" class="speaker-btn-main" id="speaker-main-btn" title="Read this lesson aloud">
                    <span>🔊</span> Read Lesson
                </button>
                <button type="button" class="speaker-btn-stop" id="speaker-stop-btn" title="Stop audio">
                    <span>⏹️</span> Stop
                </button>
                <select class="speaker-speed-select" id="speaker-speed-select" title="Voice speed" aria-label="Reading Speed">
                    <option value="0.85">0.85x</option>
                    <option value="1.0" selected>1.0x</option>
                    <option value="1.25">1.25x</option>
                    <option value="1.5">1.5x</option>
                </select>
                <div class="speaker-status">
                    <span class="speaker-status-dot"></span>
                    <span class="speaker-status-text" id="speaker-status-text">Listen to this lesson</span>
                </div>
            `;

            if (header) {
                header.parentNode.insertBefore(toolbar, header.nextSibling);
            } else if (sections[0]) {
                sections[0].parentNode.insertBefore(toolbar, sections[0]);
            }

            const mainBtn = toolbar.querySelector('#speaker-main-btn');
            const stopBtn = toolbar.querySelector('#speaker-stop-btn');
            const speedSelect = toolbar.querySelector('#speaker-speed-select');

            mainBtn.addEventListener('click', toggleSpeech);
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

            // Add mini speaker buttons next to every section h2
            sections.forEach(sec => {
                const h2 = sec.querySelector('h2');
                if (!h2 || sec.querySelector('.section-speaker-btn')) return;

                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'section-speaker-btn';
                btn.title = 'Listen to this section';
                btn.setAttribute('aria-label', `Listen to section: ${getCleanElementText(h2)}`);
                btn.innerHTML = '🔊';

                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (btn.classList.contains('active') && window.speechSynthesis.speaking) {
                        stopSpeech();
                    } else {
                        startSectionSpeech(sec, btn);
                    }
                });

                h2.appendChild(btn);
            });
        }

        // Stop speech on navigation or Escape key; toggle with Alt+S
        window.addEventListener('beforeunload', () => {
            window.speechSynthesis.cancel();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && window.speechSynthesis.speaking) {
                stopSpeech();
            }
        });
    }

    // --- Reading Mode (Distraction-Free Focus & Typography Engine) ---
    function initReadingMode() {
        const STORAGE_KEY_THEME = 'jc_rm_theme';
        const STORAGE_KEY_SIZE = 'jc_rm_size';
        const STORAGE_KEY_FONT = 'jc_rm_font';

        let currentTheme = localStorage.getItem(STORAGE_KEY_THEME) || 'theme-dark';
        let currentSize = parseFloat(localStorage.getItem(STORAGE_KEY_SIZE)) || 1.15;
        let currentFont = localStorage.getItem(STORAGE_KEY_FONT) || 'font-sans';

        // 1. Create top scroll progress bar
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

        // 2. Calculate reading time estimate
        const getReadingTime = () => {
            const content = document.querySelector('.module-container') || document.querySelector('main') || document.querySelector('.book-content') || document.body;
            const text = content ? (content.innerText || '') : '';
            const words = text.trim().split(/\s+/).length;
            const minutes = Math.max(1, Math.ceil(words / 190));
            return `⏱️ ${minutes} min read`;
        };

        // 3. Create floating reading mode toolbar
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
                <div class="rm-btn-group" title="Adjust font size">
                    <button type="button" class="rm-btn" id="rm-font-minus" title="Smaller text" aria-label="Decrease font size">A-</button>
                    <button type="button" class="rm-btn" id="rm-font-plus" title="Larger text" aria-label="Increase font size">A+</button>
                </div>
                <div class="rm-divider"></div>
                <div class="rm-btn-group" title="Reading theme">
                    <button type="button" class="rm-theme-dot rm-theme-dark" data-theme="theme-dark" title="Dark Slate" aria-label="Dark theme"></button>
                    <button type="button" class="rm-theme-dot rm-theme-sepia" data-theme="theme-sepia" title="Warm Sepia Paper" aria-label="Sepia paper theme"></button>
                    <button type="button" class="rm-theme-dot rm-theme-light" data-theme="theme-light" title="Clean Light" aria-label="Light theme"></button>
                </div>
                <div class="rm-divider"></div>
                <button type="button" class="rm-btn" id="rm-font-toggle" title="Toggle Serif / Sans font" aria-label="Toggle font family">Serif</button>
                <button type="button" class="rm-exit-btn" id="rm-exit-btn" title="Exit reading mode (Esc)">✕ Exit</button>
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
            window.showToast?.('Entered Reading Mode 📖 (Press Esc to exit)', 'info');
        };

        const exitReadingMode = () => {
            document.body.classList.remove('reading-mode');
            document.body.classList.remove('theme-dark', 'theme-sepia', 'theme-light', 'font-sans', 'font-serif');
            document.body.style.removeProperty('--reading-font-size');
            window.showToast?.('Exited Reading Mode', 'info');
        };

        const toggleReadingMode = () => {
            if (document.body.classList.contains('reading-mode')) {
                exitReadingMode();
            } else {
                enterReadingMode();
            }
        };

        // Event Listeners for Toolbar
        readingBar.querySelector('#rm-font-minus')?.addEventListener('click', () => {
            if (currentSize > 0.9) {
                currentSize = Math.round((currentSize - 0.1) * 10) / 10;
                applySettings();
            }
        });

        readingBar.querySelector('#rm-font-plus')?.addEventListener('click', () => {
            if (currentSize < 1.6) {
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

        // Global click listener for any reading-mode-toggle button
        document.body.addEventListener('click', (e) => {
            if (e.target.closest('.reading-mode-toggle') || e.target.closest('.reading-mode-btn')) {
                e.preventDefault();
                toggleReadingMode();
            }
        });

        // Esc key closes reading mode
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.body.classList.contains('reading-mode')) {
                exitReadingMode();
            }
        });

        // Expose globally
        window.toggleReadingMode = toggleReadingMode;
        window.enterReadingMode = enterReadingMode;
        window.exitReadingMode = exitReadingMode;
    }

    // --- Initialization ---
    document.addEventListener('DOMContentLoaded', () => {
        initTheme();
        updateStreak();
        injectNavigation();
        injectModuleNavigator();
        initPageSpeaker();
        initReadingMode();
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

    // --- Homepage Textbook Shelf Utilities ---
    window.scrollBookShelf = function(offset) {
        const track = document.getElementById('bookShelfTrack');
        if (track) {
            track.scrollBy({ left: offset, behavior: 'smooth' });
        }
    };

    window.filterTextbooks = function(category, btnElement) {
        const tabs = document.querySelectorAll('.shelf-tab-btn');
        tabs.forEach(tab => tab.classList.remove('active'));
        if (btnElement) {
            btnElement.classList.add('active');
        }

        const cards = document.querySelectorAll('.compact-book-card');
        cards.forEach(card => {
            const cardCat = card.getAttribute('data-category');
            if (category === 'all' || cardCat === category) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    };

})();

