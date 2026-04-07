// ============================================
// JS Learning Platform - Core Script
// ============================================

const consoleElement = document.getElementById('console');
const codeEditor = document.getElementById('code-editor');

// ============================================
// Dark Mode
// ============================================
function initTheme() {
    const saved = localStorage.getItem('jsPlaygroundTheme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    updateThemeIcon();
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('jsPlaygroundTheme', next);
    updateThemeIcon();
}

function updateThemeIcon() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.querySelectorAll('.theme-toggle').forEach(btn => {
        btn.textContent = isDark ? '☀️' : '🌙';
        btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    });
}

// Initialize theme immediately
initTheme();

// ============================================
// Console Output
// ============================================
if (consoleElement) {
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;

    console.log = function(...args) {
        originalLog.apply(console, args);
        appendToConsole(args, 'log-entry');
    };

    console.warn = function(...args) {
        originalWarn.apply(console, args);
        appendToConsole(args, 'log-entry warning-entry');
    };

    console.error = function(...args) {
        originalError.apply(console, args);
        appendToConsole(args, 'log-entry error-entry');
    };

    function appendToConsole(args, className) {
        const entry = document.createElement('div');
        entry.className = className;
        entry.textContent = args.map(arg =>
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ');
        consoleElement.appendChild(entry);
        consoleElement.scrollTop = consoleElement.scrollHeight;
    }
}

// ============================================
// Code Execution
// ============================================
function runCode() {
    if (!codeEditor || !consoleElement) return;
    const code = codeEditor.value;
    consoleElement.innerHTML = '<div class="info-entry">--- Running code ---</div>';

    try {
        const executeScript = new Function(code);
        executeScript();
    } catch (error) {
        const errorEntry = document.createElement('div');
        errorEntry.className = 'log-entry error-entry';
        errorEntry.textContent = 'Error: ' + error.message;
        consoleElement.appendChild(errorEntry);
        consoleElement.scrollTop = consoleElement.scrollHeight;
    }
}

function clearAll() {
    if (codeEditor) codeEditor.value = '';
    if (consoleElement) consoleElement.innerHTML = '<div class="info-entry">Console cleared.</div>';
}

// ============================================
// Examples
// ============================================
const examples = [
`// Example 1: Variables and Math
let a = 10;
let b = 20;
let sum = a + b;
console.log("The sum of", a, "and", b, "is:", sum);`,

`// Example 2: Loop through an array
let fruits = ["Apple", "Banana", "Cherry"];
console.log("I like these fruits:");
for (let fruit of fruits) {
    console.log("- " + fruit);
}`,

`// Example 3: Function calculation
function calculateArea(radius) {
    return Math.PI * radius * radius;
}
let r = 5;
let area = calculateArea(r);
console.log("Area of circle with radius", r, "is:", area.toFixed(2));`,

`// Example 4: Objects
let student = {
    name: "John",
    grade: "A",
    age: 18
};
console.log("Student Info:", student);`,

`// Example 5: Arrow Functions & Array Methods
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evens = numbers.filter(n => n % 2 === 0);
const doubled = evens.map(n => n * 2);
console.log("Even numbers:", evens);
console.log("Doubled:", doubled);
console.log("Sum:", doubled.reduce((a, b) => a + b, 0));`
];

let exampleIndex = 0;
function loadExample() {
    if (!codeEditor || !consoleElement) return;
    codeEditor.value = examples[exampleIndex];
    exampleIndex = (exampleIndex + 1) % examples.length;
    consoleElement.innerHTML = '<div class="info-entry">Example loaded. Press Ctrl+Enter or click "Run Code" to execute.</div>';
}

// ============================================
// Keyboard Shortcuts
// ============================================
document.addEventListener('keydown', function(e) {
    // Ctrl+Enter or Cmd+Enter to run code
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runCode();
    }
    // Ctrl+L or Cmd+L to clear (only when editor focused)
    if ((e.ctrlKey || e.metaKey) && e.key === 'l' && document.activeElement === codeEditor) {
        e.preventDefault();
        clearAll();
    }
});

// ============================================
// Quiz System
// ============================================
function checkQuiz(moduleNum) {
    const quizForm = document.getElementById('quiz-form-' + moduleNum);
    if (!quizForm) return;

    const questions = quizForm.querySelectorAll('.quiz-question');
    let correct = 0;
    let total = questions.length;

    questions.forEach((q, i) => {
        const selected = q.querySelector('input[type="radio"]:checked');
        const feedback = q.querySelector('.quiz-feedback');
        const correctAnswer = q.dataset.answer;

        if (!feedback) return;

        if (selected && selected.value === correctAnswer) {
            correct++;
            feedback.className = 'quiz-feedback correct';
            feedback.textContent = 'Correct!';
        } else {
            feedback.className = 'quiz-feedback incorrect';
            feedback.textContent = selected
                ? 'Incorrect. The correct answer is: ' + correctAnswer
                : 'Please select an answer.';
        }
    });

    const scoreEl = document.getElementById('quiz-score-' + moduleNum);
    if (scoreEl) {
        scoreEl.textContent = `You scored ${correct} out of ${total}!`;
        scoreEl.classList.add('visible');

        if (correct === total) {
            scoreEl.textContent += ' Perfect score!';
        }
    }
}

// ============================================
// Hint System (for exercises)
// ============================================
function toggleHint(exerciseId, level) {
    const el = document.getElementById('hint-' + exerciseId + '-' + level);
    if (el) el.classList.toggle('visible');
}

function toggleSolution(exerciseId) {
    const el = document.getElementById('solution-' + exerciseId);
    if (el) el.classList.toggle('visible');
}

// ============================================
// Glossary Search
// ============================================
function filterGlossary() {
    const query = document.getElementById('glossary-search')?.value.toLowerCase() || '';
    const terms = document.querySelectorAll('.glossary-term');
    const letters = document.querySelectorAll('.glossary-letter');

    terms.forEach(term => {
        const text = term.textContent.toLowerCase();
        term.style.display = text.includes(query) ? '' : 'none';
    });

    // Hide letter headings if no visible terms under them
    letters.forEach(letter => {
        let nextEl = letter.nextElementSibling;
        let hasVisible = false;
        while (nextEl && !nextEl.classList.contains('glossary-letter')) {
            if (nextEl.classList.contains('glossary-term') && nextEl.style.display !== 'none') {
                hasVisible = true;
            }
            nextEl = nextEl.nextElementSibling;
        }
        letter.style.display = hasVisible ? '' : 'none';
    });
}

// ============================================
// Module Completion (shared)
// ============================================
function markComplete(moduleNum) {
    let completed = JSON.parse(localStorage.getItem('completedModules') || '[]');
    if (!completed.includes(moduleNum)) {
        completed.push(moduleNum);
        localStorage.setItem('completedModules', JSON.stringify(completed));
        localStorage.setItem('jsCourseProgress', completed.length);
        alert('Module ' + moduleNum + ' completed! Keep going!');
    } else {
        alert('You already completed this module!');
    }
}
