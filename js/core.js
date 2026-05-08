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
            // Home link also points to root index.html
            linksHtml = `<a href="${baseUrl}index.html">Home</a>` + CONFIG.MODULES[currentModule].map(item => `
                <a href="${item.url}" class="${currentPath === item.url ? 'active' : ''}">${item.name}</a>
            `).join('');
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
                <button class="mobile-toggle" id="mobile-toggle" aria-label="Toggle menu">
                    <span></span><span></span><span></span>
                </button>
                <div class="nav-links" id="nav-links">
                    ${linksHtml}
                    <button class="theme-toggle btn-icon" title="Toggle Theme">🌓</button>
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
        
        toggle?.addEventListener('click', () => {
            toggle.classList.toggle('active');
            navLinks?.classList.toggle('open');
            document.body.style.overflow = navLinks?.classList.contains('open') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        navLinks?.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                toggle?.classList.remove('active');
                navLinks.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    function injectFooter() {
        if (document.querySelector('.site-footer')) return;

        const footer = document.createElement('footer');
        footer.className = 'site-footer';
        footer.innerHTML = `
            <div class="footer-content">
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
        const savedTheme = localStorage.getItem(CONFIG.STORAGE_KEYS.THEME) || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem(CONFIG.STORAGE_KEYS.THEME, next);
    }
    window.toggleTheme = toggleTheme;

    // --- Progress Tracking ---
    window.markComplete = (moduleNum) => {
        const currentModule = getCurrentModule();
        if (!currentModule) return;

        const completed = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.COMPLETED) || '[]');
        const moduleKey = `${currentModule}_${moduleNum}`;
        
        if (!completed.includes(moduleKey)) {
            completed.push(moduleKey);
            localStorage.setItem(CONFIG.STORAGE_KEYS.COMPLETED, JSON.stringify(completed));
            window.showToast(`Module ${moduleNum} completed! 🎉`);
            
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
        injectNavigation();
        injectModuleNavigator();
        injectFooter();

        // Global Event Delegation
        document.body.addEventListener('click', (e) => {
            if (e.target.closest('.theme-toggle')) {
                toggleTheme();
            }
        });
    });

})();