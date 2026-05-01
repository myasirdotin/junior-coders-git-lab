// HTML Learning Platform - Core Script
(function() {
    'use strict';

    const CONFIG = {
        STORAGE_KEYS: {
            THEME: 'htmlPlaygroundTheme',
            COMPLETED_MODULES: 'htmlCompletedModules',
            COURSE_PROGRESS: 'htmlCourseProgress',
            PENDING_EXERCISE: 'pendingHTMLExercise'
        },
        DEBOUNCE_DELAY: 300,
        MAX_PREVIEW_LENGTH: 50000
    };

    // SECURE QUIZ ANSWERS (Hidden from HTML inspection)
    const quizAnswers = {
        1: { 'q1-1': 'b', 'q1-2': 'a', 'q1-3': 'c' }
        // Add future modules here, e.g., 2: { 'q2-1': 'a', ... }
    };

    // Use dynamic getters instead of static variables so the script works on all pages
    function getEditor() { return document.getElementById('code-editor'); }
    function getPreview() { return document.getElementById('preview'); }

    function safeGetStorage(key) {
        try { return localStorage.getItem(key); } 
        catch (error) { return null; }
    }

    function safeSetStorage(key, value) {
        try { localStorage.setItem(key, value); } 
        catch (error) {}
    }

    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    }

    function sanitizeHTML(html) {
        let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        sanitized = sanitized.replace(/\s+on\w+\s*=\s*["'][^"']*["']/gi, '');
        sanitized = sanitized.replace(/\s+on\w+\s*=\s*[^\s>]+/gi, '');
        sanitized = sanitized.replace(/javascript\s*:/gi, '');
        sanitized = sanitized.replace(/data\s*:\s*(?!image\/)[^\s,]+/gi, '');
        return sanitized;
    }

    function showToast(message, type = 'info') {
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) existingToast.remove();

        const colorMap = { success: '#059669', error: '#dc2626', info: '#2563eb' };
        const toast = document.createElement('div');
        toast.className = `toast-notification toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed; bottom: 20px; right: 20px; padding: 12px 24px;
            background-color: ${colorMap[type] || colorMap.info}; color: white;
            border-radius: 8px; font-weight: 500; z-index: 10000;
            animation: toastSlideIn 0.3s ease; max-width: 320px;
        `;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.animation = 'toastSlideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }

    function initTheme() {
        const savedTheme = safeGetStorage(CONFIG.STORAGE_KEYS.THEME);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        updateThemeIcon();
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', nextTheme);
        safeSetStorage(CONFIG.STORAGE_KEYS.THEME, nextTheme);
        updateThemeIcon();
        showToast(`Switched to ${nextTheme} mode`, 'success');
    }

    function updateThemeIcon() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        document.querySelectorAll('.theme-toggle').forEach((button) => {
            button.textContent = isDark ? 'Sun' : 'Moon';
            button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        });
    }

    // SMART NAVIGATION HIGHLIGHTER
    function setActiveNav() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('#main-nav a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath || (currentPath.startsWith('module') && href === 'learninghtml.html')) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
    }

    function renderPreview() {
        const editor = getEditor();
        const preview = getPreview();
        if (!editor || !preview) return;

        const code = editor.value;
        if (code.length > CONFIG.MAX_PREVIEW_LENGTH) {
            preview.innerHTML = `<div class="error-entry">Code is too long.</div>`;
            return;
        }

        try {
            const previewContainer = document.createElement('div');
            previewContainer.className = 'preview-content';
            previewContainer.innerHTML = sanitizeHTML(code);
            
            preview.innerHTML = '';
            preview.appendChild(previewContainer);
        } catch (error) {
            preview.innerHTML = `<div class="error-entry">Error rendering preview</div>`;
        }
    }

    const debouncedRenderPreview = debounce(renderPreview, CONFIG.DEBOUNCE_DELAY);

    function clearAll() {
        const editor = getEditor();
        const preview = getPreview();
        if (editor) editor.value = '';
        if (preview) preview.innerHTML = '<div class="info-entry">Preview cleared. Start writing!</div>';
        showToast('Editor cleared');
    }

    // SECURE QUIZ CHECKER
    function checkQuiz(moduleNum) {
        const quizForm = document.getElementById(`quiz-form-${moduleNum}`);
        if (!quizForm) return;

        const moduleAnswers = quizAnswers[moduleNum];
        if (!moduleAnswers) return;

        const questions = quizForm.querySelectorAll('.quiz-question');
        let correct = 0;
        let allAnswered = true;

        questions.forEach((question) => {
            const questionId = question.dataset.questionId;
            const selected = question.querySelector('input[type="radio"]:checked');
            const feedback = question.querySelector('.quiz-feedback');
            const correctAnswer = moduleAnswers[questionId];

            if (!feedback) return;

            if (!selected) {
                allAnswered = false;
                feedback.className = 'quiz-feedback incorrect';
                feedback.textContent = 'Please select an answer.';
                return;
            }

            if (selected.value === correctAnswer) {
                correct += 1;
                feedback.className = 'quiz-feedback correct';
                feedback.textContent = 'Correct!';
            } else {
                feedback.className = 'quiz-feedback incorrect';
                feedback.textContent = 'Not quite. Try again!';
            }
        });

        if (!allAnswered) {
            showToast('Please answer all questions', 'error');
            return;
        }

        const scoreEl = document.getElementById(`quiz-score-${moduleNum}`);
        if (scoreEl) {
            scoreEl.textContent = `You scored ${correct} out of ${questions.length}!`;
            scoreEl.classList.add('visible');
            if (correct === questions.length) showToast('Perfect score! Great job!', 'success');
        }
    }

    // Initialization
    document.addEventListener('DOMContentLoaded', () => {
        initTheme();
        setActiveNav();
        const editor = getEditor();
        if (editor) editor.addEventListener('input', debouncedRenderPreview);
    });

    window.toggleTheme = toggleTheme;
    window.renderPreview = renderPreview;
    window.clearAll = clearAll;
    window.checkQuiz = checkQuiz;
})();