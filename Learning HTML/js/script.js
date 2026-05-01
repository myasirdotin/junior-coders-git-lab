/**
 * Junior Coders - Core Lesson Engine
 * Modernized & Optimized
 */

(function() {
    'use strict';

    const CONFIG = {
        STORAGE_KEYS: {
            THEME: 'jc_theme',
            COMPLETED: 'jc_completed_modules'
        },
        NAV_ITEMS: [
            { name: 'Playground', url: 'index.html' },
            { name: 'Exercises', url: 'exercises.html' },
            { name: 'Syllabus', url: 'learninghtml.html' },
            { name: 'Glossary', url: 'glossary.html' },
            { name: 'Quiz', url: 'quiz.html' }
        ]
    };

    const quizAnswers = {
        1: { 'q1-1': 'b', 'q1-2': 'a', 'q1-3': 'c' },
        2: { 'q2-1': 'a', 'q2-2': 'b', 'q2-3': 'c' }
    };

    // --- Navigation Injection ---
    function injectNavigation() {
        const header = document.createElement('nav');
        header.className = 'top-nav';
        header.id = 'main-nav';
        
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        
        const logo = `<a href="../index.html" class="nav-logo">🚀 Junior Coders</a>`;
        
        const linksHtml = CONFIG.NAV_ITEMS.map(item => `
            <a href="${item.url}" class="${currentPath === item.url ? 'active' : ''}">${item.name}</a>
        `).join('');

        header.innerHTML = `
            ${logo}
            <button class="mobile-toggle" aria-label="Toggle menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div class="nav-links">
                ${linksHtml}
                <button class="theme-toggle btn-primary">Theme</button>
            </div>
        `;

        document.body.prepend(header);

        // Add Toggle Logic
        const toggle = header.querySelector('.mobile-toggle');
        const navLinks = header.querySelector('.nav-links');
        
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });
    }

    // --- Toast Engine ---
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.style.cssText = `
            position: fixed; bottom: 2rem; right: 2rem;
            padding: 1rem 2rem; background: #1e293b; color: white;
            border-left: 4px solid ${type === 'success' ? '#10b981' : '#f43f5e'};
            border-radius: 0.5rem; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.5);
            z-index: 9999; animation: slideIn 0.3s ease-out;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.5s';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }

    // --- Playground Logic ---
    function renderPreview() {
        const editor = document.getElementById('code-editor');
        const preview = document.getElementById('preview');
        if (!editor || !preview) return;

        const content = editor.value;
        const iframe = preview.querySelector('iframe') || document.createElement('iframe');
        
        if (!preview.contains(iframe)) {
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = 'none';
            preview.innerHTML = '';
            preview.appendChild(iframe);
        }

        const doc = iframe.contentWindow.document;
        doc.open();
        doc.write(content);
        doc.close();
    }

    // --- Quiz Logic ---
    function checkQuiz(moduleNum) {
        const answers = quizAnswers[moduleNum];
        if (!answers) return;

        let score = 0;
        let total = 0;

        Object.keys(answers).forEach(qId => {
            total++;
            const selected = document.querySelector(`input[name="${qId}"]:checked`);
            const feedback = selected?.closest('.quiz-question').querySelector('.quiz-feedback');
            
            if (feedback) {
                if (selected?.value === answers[qId]) {
                    score++;
                    feedback.textContent = '✓ Correct!';
                    feedback.className = 'quiz-feedback correct';
                } else {
                    feedback.textContent = '✗ Try again';
                    feedback.className = 'quiz-feedback incorrect';
                }
            }
        });

        showToast(`You scored ${score}/${total}!`, score === total ? 'success' : 'error');
    }

    // --- Initialization ---
    document.addEventListener('DOMContentLoaded', () => {
        injectNavigation();
        
        const editor = document.getElementById('code-editor');
        if (editor) {
            editor.addEventListener('input', renderPreview);
            renderPreview(); // Initial render
        }

        // Event delegation for theme toggle
        document.body.addEventListener('click', (e) => {
            if (e.target.classList.contains('theme-toggle')) {
                const html = document.documentElement;
                const isDark = html.getAttribute('data-theme') === 'dark';
                html.setAttribute('data-theme', isDark ? 'light' : 'dark');
            }
        });
    });

    // Expose functions to global scope
    window.checkQuiz = checkQuiz;
    window.renderPreview = renderPreview;
    window.clearAll = () => {
        const editor = document.getElementById('code-editor');
        if (editor) {
            editor.value = '';
            renderPreview();
        }
    };

})();