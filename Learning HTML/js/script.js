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

    const elements = {
        preview: document.getElementById('preview'),
        codeEditor: document.getElementById('code-editor')
    };

    function safeGetStorage(key) {
        try {
            return localStorage.getItem(key);
        } catch (error) {
            console.warn('localStorage not available:', error.message);
            return null;
        }
    }

    function safeSetStorage(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            console.warn('Could not save to localStorage:', error.message);
        }
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
        if (existingToast) {
            existingToast.remove();
        }

        const colorMap = {
            success: '#059669',
            error: '#dc2626',
            info: '#2563eb'
        };

        const toast = document.createElement('div');
        toast.className = `toast-notification toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 12px 24px;
            background-color: ${colorMap[type] || colorMap.info};
            color: white;
            border-radius: 8px;
            font-weight: 500;
            z-index: 10000;
            animation: toastSlideIn 0.3s ease;
            max-width: 320px;
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

    function renderPreview() {
        if (!elements.codeEditor || !elements.preview) return;

        const code = elements.codeEditor.value;
        if (code.length > CONFIG.MAX_PREVIEW_LENGTH) {
            elements.preview.innerHTML = `<div class="error-entry">Code is too long. Please limit your HTML to ${CONFIG.MAX_PREVIEW_LENGTH} characters.</div>`;
            return;
        }

        try {
            const previewContainer = document.createElement('div');
            previewContainer.className = 'preview-content';
            previewContainer.innerHTML = sanitizeHTML(code);

            const style = document.createElement('style');
            style.textContent = `
                .preview-content {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 10px;
                    color: #333;
                    line-height: 1.5;
                }
                .preview-content img { max-width: 100%; height: auto; }
                .preview-content table { border-collapse: collapse; width: 100%; }
                .preview-content th, .preview-content td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
                .preview-content th { background-color: #f4f4f4; }
                .preview-content a { color: #0066cc; }
                .preview-content h1, .preview-content h2, .preview-content h3 { margin-top: 0; }
            `;

            elements.preview.innerHTML = '';
            elements.preview.appendChild(style);
            elements.preview.appendChild(previewContainer);
        } catch (error) {
            elements.preview.innerHTML = `<div class="error-entry">Error rendering preview: ${escapeHtml(error.message)}</div>`;
        }
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    const debouncedRenderPreview = debounce(renderPreview, CONFIG.DEBOUNCE_DELAY);

    function clearAll() {
        if (elements.codeEditor) {
            elements.codeEditor.value = '';
        }
        if (elements.preview) {
            elements.preview.innerHTML = '<div class="info-entry">Preview cleared. Start writing HTML code above.</div>';
        }
        showToast('Editor cleared');
    }

    const examples = [
`<h1>Hello, coders!</h1>
<p>Welcome to my first web page.</p>`,
`<h1>My Favorite Animal</h1>
<h2>Why I Like It</h2>
<p>I think it is <strong>awesome</strong> and <em>interesting</em>.</p>`,
`<h2>My Top 3 Snacks</h2>
<ul>
    <li>Apples</li>
    <li>Popcorn</li>
    <li>Cookies</li>
</ul>`,
`<h2>Cool Links</h2>
<p>Read more at <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" rel="noopener">MDN HTML</a>.</p>`,
`<h2>My Schedule</h2>
<table>
    <tr>
        <th>Day</th>
        <th>Plan</th>
    </tr>
    <tr>
        <td>Monday</td>
        <td>Code practice</td>
    </tr>
</table>`
    ];

    let exampleIndex = 0;

    function loadExample() {
        if (!elements.codeEditor) return;
        elements.codeEditor.value = examples[exampleIndex];
        exampleIndex = (exampleIndex + 1) % examples.length;
        renderPreview();
        showToast('Example loaded!', 'success');
    }

    document.addEventListener('keydown', (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
            event.preventDefault();
            renderPreview();
            showToast('Preview rendered');
        }

        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'l' && document.activeElement === elements.codeEditor) {
            event.preventDefault();
            clearAll();
        }

        if (event.key === 'Escape' && document.activeElement !== elements.codeEditor) {
            clearAll();
        }
    });

    if (elements.codeEditor) {
        elements.codeEditor.addEventListener('input', debouncedRenderPreview);
    }

    function checkQuiz(moduleNum) {
        const quizForm = document.getElementById(`quiz-form-${moduleNum}`);
        if (!quizForm) return;

        const questions = quizForm.querySelectorAll('.quiz-question');
        let correct = 0;
        let allAnswered = true;

        questions.forEach((question) => {
            const selected = question.querySelector('input[type="radio"]:checked');
            const feedback = question.querySelector('.quiz-feedback');
            const correctAnswer = question.dataset.answer;

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
                feedback.textContent = 'Not quite. Read the lesson and try again.';
            }
        });

        if (!allAnswered) {
            showToast('Please answer all questions', 'error');
            return;
        }

        const scoreEl = document.getElementById(`quiz-score-${moduleNum}`);
        if (!scoreEl) return;

        scoreEl.textContent = `You scored ${correct} out of ${questions.length}!`;
        scoreEl.classList.add('visible');

        if (correct === questions.length) {
            scoreEl.textContent += ' Perfect score!';
            showToast('Perfect score! Great job!', 'success');
        } else if (correct >= questions.length * 0.7) {
            showToast('Good job! Keep practicing.', 'success');
        } else {
            showToast('Review the module and try again.', 'info');
        }
    }

    function toggleHint(exerciseId, level) {
        const element = document.getElementById(`hint-${exerciseId}-${level}`);
        if (element) {
            element.classList.toggle('visible');
        }
    }

    function toggleSolution(exerciseId) {
        const element = document.getElementById(`solution-${exerciseId}`);
        if (element) {
            element.classList.toggle('visible');
        }
    }

    function filterGlossary() {
        const query = document.getElementById('glossary-search')?.value.toLowerCase() || '';
        const terms = document.querySelectorAll('.glossary-term');
        const letters = document.querySelectorAll('.glossary-letter');

        terms.forEach((term) => {
            term.style.display = term.textContent.toLowerCase().includes(query) ? '' : 'none';
        });

        letters.forEach((letter) => {
            let nextElement = letter.nextElementSibling;
            let hasVisibleTerms = false;

            while (nextElement && !nextElement.classList.contains('glossary-letter')) {
                if (nextElement.classList.contains('glossary-term') && nextElement.style.display !== 'none') {
                    hasVisibleTerms = true;
                }
                nextElement = nextElement.nextElementSibling;
            }

            letter.style.display = hasVisibleTerms ? '' : 'none';
        });
    }

    function markComplete(moduleNum) {
        const completed = JSON.parse(safeGetStorage(CONFIG.STORAGE_KEYS.COMPLETED_MODULES) || '[]');

        if (completed.includes(moduleNum)) {
            showToast('You already completed this module!');
            return;
        }

        completed.push(moduleNum);
        safeSetStorage(CONFIG.STORAGE_KEYS.COMPLETED_MODULES, JSON.stringify(completed));
        safeSetStorage(CONFIG.STORAGE_KEYS.COURSE_PROGRESS, completed.length);
        updateProgressBar();
        showToast(`Module ${moduleNum} completed! Keep going!`, 'success');

        const button = document.querySelector('.complete-btn');
        if (button) {
            button.textContent = 'Completed';
            button.disabled = true;
            button.style.opacity = '0.7';
        }
    }

    function updateProgressBar() {
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        if (!progressFill || !progressText) return;

        const completed = JSON.parse(safeGetStorage(CONFIG.STORAGE_KEYS.COMPLETED_MODULES) || '[]');
        const percentage = Math.round((completed.length / 8) * 100);
        progressFill.style.width = `${percentage}%`;
        progressText.textContent = `${completed.length} of 8 modules completed (${percentage}%)`;
    }

    const exercises = {
        'first-page': {
            title: 'My First Page',
            starterCode: '<!DOCTYPE html>\n<html>\n<head>\n    <title>All About Me</title>\n</head>\n<body>\n    <h1>All About Me</h1>\n    <p>My name is ...</p>\n</body>\n</html>'
        },
        'text-formatting': {
            title: 'Poster Words',
            starterCode: '<h1>My Awesome Poster</h1>\n<h2>Why I Love Coding</h2>\n<p>I think coding is <strong>fun</strong> and <em>creative</em>.</p>\n<p>Today I want to build a <mark>cool web page</mark>.</p>'
        },
        'links-images': {
            title: 'Favorite Things',
            starterCode: '<h1>My Favorite Things</h1>\n<p>Visit <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" rel="noopener">this HTML guide</a>.</p>\n<img src="https://via.placeholder.com/300x180?text=My+Picture" alt="A placeholder picture for my project">\n<p>This picture is part of my page.</p>'
        },
        'lists': {
            title: 'Top 5 List',
            starterCode: '<h1>My Favorite Snacks</h1>\n<ul>\n    <li>Apples</li>\n    <li>Popcorn</li>\n</ul>\n\n<h2>How to Get Ready for School</h2>\n<ol>\n    <li>Wake up</li>\n    <li>Brush teeth</li>\n</ol>'
        },
        'tables': {
            title: 'Weekly Schedule',
            starterCode: '<h1>My Weekly Schedule</h1>\n<table>\n    <tr>\n        <th>Day</th>\n        <th>Activity</th>\n        <th>Time</th>\n    </tr>\n    <tr>\n        <td>Monday</td>\n        <td>Homework</td>\n        <td>4:00 PM</td>\n    </tr>\n</table>'
        },
        'forms': {
            title: 'Club Signup',
            starterCode: '<h1>Join Our Coding Club</h1>\n<form>\n    <label for="name">Name:</label>\n    <input id="name" type="text">\n    <br>\n    <label for="activity">Favorite activity:</label>\n    <input id="activity" type="text">\n    <br>\n    <label for="message">Why do you want to join?</label>\n    <br>\n    <textarea id="message" rows="4" cols="30"></textarea>\n    <br>\n    <button type="submit">Join</button>\n</form>'
        },
        'semantic-page': {
            title: 'Semantic Page',
            starterCode: '<header>\n    <h1>My Animal Club</h1>\n</header>\n<nav>\n    <a href="#about">About</a>\n    <a href="#facts">Facts</a>\n</nav>\n<main>\n    <section id="about">\n        <h2>About</h2>\n        <p>Write your first section here.</p>\n    </section>\n</main>\n<footer>\n    <p>Made by a junior coder.</p>\n</footer>'
        },
        'blog-layout': {
            title: 'Super Fan Page',
            starterCode: '<header>\n    <h1>My Super Fan Page</h1>\n</header>\n<main>\n    <section>\n        <h2>Why I Like It</h2>\n        <p>Write about your topic here.</p>\n    </section>\n    <section>\n        <h2>Top Facts</h2>\n        <ul>\n            <li>Fact one</li>\n            <li>Fact two</li>\n        </ul>\n    </section>\n</main>\n<footer>\n    <p>Thanks for visiting my page.</p>\n</footer>'
        }
    };

    function loadExercise(category) {
        const exercise = exercises[category];
        if (!exercise) {
            showToast('Exercise not found', 'error');
            return;
        }

        safeSetStorage(CONFIG.STORAGE_KEYS.PENDING_EXERCISE, JSON.stringify(exercise));
        window.location.href = 'index.html';
    }

    function restorePendingExercise() {
        const pending = safeGetStorage(CONFIG.STORAGE_KEYS.PENDING_EXERCISE);
        if (!pending || !elements.codeEditor) return;

        try {
            const exercise = JSON.parse(pending);
            elements.codeEditor.value = exercise.starterCode;
            renderPreview();
            showToast(`Exercise loaded: ${exercise.title}`, 'success');
        } catch (error) {
            console.error('Error loading exercise:', error);
        }

        safeSetStorage(CONFIG.STORAGE_KEYS.PENDING_EXERCISE, '');
    }

    if (!document.getElementById('toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            @keyframes toastSlideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes toastSlideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    initTheme();
    document.addEventListener('DOMContentLoaded', updateProgressBar);
    document.addEventListener('DOMContentLoaded', restorePendingExercise);
    document.addEventListener('DOMContentLoaded', () => {
        const searchInput = document.getElementById('glossary-search');
        if (searchInput) {
            searchInput.addEventListener('input', debounce(filterGlossary, 200));
        }
    });

    window.toggleTheme = toggleTheme;
    window.renderPreview = renderPreview;
    window.clearAll = clearAll;
    window.loadExample = loadExample;
    window.checkQuiz = checkQuiz;
    window.toggleHint = toggleHint;
    window.toggleSolution = toggleSolution;
    window.filterGlossary = filterGlossary;
    window.markComplete = markComplete;
    window.loadExercise = loadExercise;
})();
