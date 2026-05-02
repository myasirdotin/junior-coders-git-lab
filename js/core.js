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
                { name: 'Lessons', url: 'learningjs.html' },
                { name: 'Playground', url: 'playground.html' },
                { name: 'Exercises', url: 'exercises.html' },
                { name: 'Glossary', url: 'glossary.html' },
                { name: 'Quiz', url: 'quiz.html' }
            ]
        }
    };

    // --- Utility Functions ---
    const getBaseUrl = () => {
        const path = window.location.pathname;
        if (path.includes('Learning HTML')) return '../';
        if (path.includes('Learning CSS')) return '../';
        if (path.includes('Learning JS')) return '../';
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
                <a href="index.html" class="${currentPath === 'index.html' ? 'active' : ''}">Home</a>
                <a href="Learning HTML/learninghtml.html">HTML</a>
                <a href="Learning CSS/learningcss.html">CSS</a>
                <a href="Learning JS/learningjs.html">JavaScript</a>
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

    // --- Initialization ---
    document.addEventListener('DOMContentLoaded', () => {
        initTheme();
        injectNavigation();
        injectFooter();

        // Global Event Delegation
        document.body.addEventListener('click', (e) => {
            if (e.target.closest('.theme-toggle')) {
                toggleTheme();
            }
        });
    });

})();