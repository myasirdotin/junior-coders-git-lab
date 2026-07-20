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
            ]
        }
    };

    // --- Utility Functions ---
    const getBaseUrl = () => {
        const path = decodeURIComponent(window.location.pathname);
        if (path.includes('Learning HTML/') || 
            path.includes('Learning CSS/') || 
            path.includes('Learning JS/')) {
            return '../';
        }
        return './';
    };

    const getCurrentModule = () => {
        const path = decodeURIComponent(window.location.pathname);
        if (path.includes('Learning HTML')) return 'Learning HTML';
        if (path.includes('Learning CSS')) return 'Learning CSS';
        if (path.includes('Learning JS')) return 'Learning JS';
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
            // Sync with legacy keys to support isolated module index files!
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
        const todayStr = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
        
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

        return { xp, count: completed.length, rank, streak };
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

        if (xpEl) xpEl.textContent = stats.xp;
        if (countEl) countEl.textContent = stats.count;
        if (rankEl) rankEl.textContent = stats.rank;
        if (streakEl) streakEl.textContent = stats.streak;
        
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
        
        // Ensure "Junior Coders" logo always points to root index.html
        const logo = `<a href="${baseUrl}index.html" class="nav-logo">🚀 Junior Coders</a>`;
        
        let linksHtml = '';
        if (currentModule) {
            // Refactored to use a dropdown for module links to keep nav clean
            linksHtml = `
                <a href="${baseUrl}index.html">Home</a>
                <div class="nav-dropdown">
                    <button class="nav-dropdown-btn" id="modules-dropdown-btn">Modules ▾</button>
                    <div class="nav-dropdown-content">
                        ${CONFIG.MODULES[currentModule].map(item => `
                            <a href="${item.url}" class="${currentPath === item.url ? 'active' : ''}">${item.name}</a>
                        `).join('')}
                    </div>
                </div>
            `;
        } else {
            // Root navigation
            linksHtml = `
                <a href="${baseUrl}index.html" class="${currentPath === 'index.html' || currentPath === '' ? 'active' : ''}">Home</a>
                <a href="${baseUrl}getting-started.html" class="${currentPath === 'getting-started.html' ? 'active' : ''}">Basics</a>
                <a href="${baseUrl}master-playground.html" class="${currentPath === 'master-playground.html' ? 'active' : ''}">Code Lab</a>
                <a href="${baseUrl}Learning%20HTML/learninghtml.html">HTML</a>
                <a href="${baseUrl}Learning%20CSS/learningcss.html">CSS</a>
                <a href="${baseUrl}Learning%20JS/learningjs.html">JavaScript</a>
            `;
        }

        nav.innerHTML = `
            <div class="nav-container">
                ${logo}
                <button class="mobile-toggle" id="mobile-toggle" aria-label="Toggle menu" aria-controls="nav-links" aria-expanded="false">
                    <span></span><span></span><span></span>
                </button>
                <div class="nav-links" id="nav-links">
                    ${linksHtml}
                    <button class="theme-toggle btn-icon" type="button" aria-label="Toggle colour theme" title="Toggle Theme">🌓</button>
                </div>
            </div>
        `;

        document.body.prepend(nav);

        // Inject Bottom Nav for Mobile
        const bottomNav = document.createElement('div');
        bottomNav.className = 'bottom-nav';
        bottomNav.innerHTML = `
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

        // Mobile Menu Toggle Logic
        const toggle = document.getElementById('mobile-toggle');
        const navLinks = document.getElementById('nav-links');
        const dropdownBtn = document.getElementById('modules-dropdown-btn');

        const closeMenu = () => {
            toggle?.classList.remove('active');
            navLinks?.classList.remove('open');
            toggle?.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        };
        
        toggle?.addEventListener('click', () => {
            const isOpen = navLinks?.classList.toggle('open') ?? false;
            toggle.classList.toggle('active', isOpen);
            toggle.setAttribute('aria-expanded', String(isOpen));
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Dropdown toggle for mobile
        dropdownBtn?.setAttribute('aria-expanded', 'false');
        dropdownBtn?.setAttribute('aria-haspopup', 'true');
        dropdownBtn?.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024) {
                e.preventDefault();
                const isOpen = dropdownBtn.parentElement.classList.toggle('active');
                dropdownBtn.setAttribute('aria-expanded', String(isOpen));
            }
        });

        // Close menu when clicking a link
        navLinks?.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key !== 'Escape') return;

            closeMenu();
            dropdownBtn?.parentElement.classList.remove('active');
            dropdownBtn?.setAttribute('aria-expanded', 'false');
            toggle?.focus();
        });
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
            
            // Trigger progress update if on syllabus page
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
        
        // Find module number for completion
        const moduleMatch = path.match(/module(\d+)/);
        const moduleNum = moduleMatch ? moduleMatch[1] : null;

        const nav = document.createElement('div');
        nav.className = 'module-navigator';
        nav.innerHTML = `
            <a href="${prev ? prev.url : '#'}" class="btn-nav-control prev" ${!prev ? 'disabled' : ''}>
                <span>←</span> Previous
            </a>
            ${moduleNum ? `<button class="btn-nav-control complete" onclick="markComplete('${moduleNum}')">✓ Complete</button>` : ''}
            <a href="${next ? next.url : (currentModule.includes('HTML') ? 'learninghtml.html' : currentModule.includes('CSS') ? 'learningcss.html' : 'learningjs.html')}" class="btn-nav-control next">
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
        
        // Track the visit for "Continue Mission"
        trackVisit();
        
        // Update Dashboard if on index page
        if (document.getElementById('user-xp')) {
            updateDashboard();
        }

        // Global Event Delegation
        document.body.addEventListener('click', (e) => {
            if (e.target.closest('.theme-toggle')) {
                toggleTheme();
            }
        });
    });

})();
