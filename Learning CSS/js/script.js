// ============================================
// CSS Learning Platform - Core Script
// ============================================

const previewElement = document.getElementById('preview');
const htmlEditor = document.getElementById('html-editor');
const cssEditor = document.getElementById('css-editor');

// ============================================
// Dark Mode
// ============================================
function initTheme() {
    const saved = localStorage.getItem('cssPlaygroundTheme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    updateThemeIcon();
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('cssPlaygroundTheme', next);
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
// Preview Rendering
// ============================================
function renderPreview() {
    if (!htmlEditor || !cssEditor || !previewElement) return;
    const htmlCode = htmlEditor.value;
    const cssCode = cssEditor.value;
    
    try {
        // Basic HTML sanitization - remove script tags for safety
        let sanitizedHTML = htmlCode.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        
        // Create the preview with HTML and CSS combined
        previewElement.innerHTML = sanitizedHTML;
        
        // Add the CSS styles
        const style = document.createElement('style');
        style.textContent = cssCode;
        previewElement.insertBefore(style, previewElement.firstChild);
        
        // Add some basic styling to the preview for better presentation
        const baseStyle = document.createElement('style');
        baseStyle.textContent = `
            body { 
                font-family: Arial, sans-serif; 
                margin: 0; 
                padding: 10px;
                color: #333;
                background: white;
            }
            img { max-width: 100%; height: auto; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f4f4f4; }
        `;
        previewElement.insertBefore(baseStyle, previewElement.firstChild);
    } catch (error) {
        previewElement.innerHTML = '<div class="error-entry">Error rendering preview: ' + error.message + '</div>';
    }
}

function clearAll() {
    if (htmlEditor) htmlEditor.value = '';
    if (cssEditor) cssEditor.value = '';
    if (previewElement) {
        previewElement.innerHTML = '<div class="info-entry">Preview cleared. Start writing HTML and CSS code above.</div>';
    }
}

// ============================================
// Examples
// ============================================
const examples = [
    {
        html: `<!-- Example 1: Basic Styling -->
<div class="container">
  <h1>Hello CSS!</h1>
  <p>This is a styled paragraph.</p>
</div>`,
        css: `.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
}

h1 {
  color: #0891b2;
  text-align: center;
  font-size: 2.5em;
}

p {
  color: #475569;
  font-size: 1.1em;
  line-height: 1.6;
}`
    },
    {
        html: `<!-- Example 2: Flexbox Layout -->
<div class="flex-container">
  <div class="box">Box 1</div>
  <div class="box">Box 2</div>
  <div class="box">Box 3</div>
</div>`,
        css: `.flex-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background-color: #e2e8f0;
  border-radius: 10px;
}

.box {
  background: linear-gradient(135deg, #0891b2, #06b6d4);
  color: white;
  padding: 30px;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}`
    },
    {
        html: `<!-- Example 3: Card Design -->
<div class="card">
  <div class="card-image"></div>
  <div class="card-content">
    <h2>Card Title</h2>
    <p>This is a beautiful card component styled with CSS.</p>
    <button>Learn More</button>
  </div>
</div>`,
        css: `.card {
  max-width: 300px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.card-image {
  height: 150px;
  background: linear-gradient(135deg, #0891b2, #7c3aed);
}

.card-content {
  padding: 20px;
}

.card-content h2 {
  margin: 0 0 10px;
  color: #1e293b;
  font-size: 1.3em;
}

.card-content p {
  color: #64748b;
  font-size: 0.95em;
  line-height: 1.5;
}

.card-content button {
  margin-top: 15px;
  padding: 10px 20px;
  background: #0891b2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.card-content button:hover {
  background: #0e7490;
}`
    },
    {
        html: `<!-- Example 4: CSS Grid -->
<div class="grid-container">
  <div class="grid-item">1</div>
  <div class="grid-item">2</div>
  <div class="grid-item">3</div>
  <div class="grid-item">4</div>
  <div class="grid-item">5</div>
  <div class="grid-item">6</div>
</div>`,
        css: `.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  padding: 20px;
  background-color: #f0f4f8;
  border-radius: 10px;
}

.grid-item {
  background: linear-gradient(135deg, #059669, #10b981);
  color: white;
  padding: 40px 20px;
  border-radius: 8px;
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.grid-item:hover {
  transform: scale(1.05);
}`
    },
    {
        html: `<!-- Example 5: Responsive Navigation -->
<nav class="navbar">
  <div class="logo">MySite</div>
  <ul class="nav-links">
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Services</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>`,
        css: `.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background: #1e293b;
  border-radius: 10px;
}

.logo {
  color: white;
  font-size: 1.5em;
  font-weight: bold;
  color: #06b6d4;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 25px;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: #cbd5e1;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: #06b6d4;
}`
    }
];

let exampleIndex = 0;
function loadExample() {
    if (!htmlEditor || !cssEditor || !previewElement) return;
    htmlEditor.value = examples[exampleIndex].html;
    cssEditor.value = examples[exampleIndex].css;
    exampleIndex = (exampleIndex + 1) % examples.length;
    renderPreview();
    previewElement.innerHTML = '<div class="info-entry">Example loaded. Edit the code to see changes!</div>' + previewElement.innerHTML;
}

// ============================================
// Keyboard Shortcuts
// ============================================
document.addEventListener('keydown', function(e) {
    // Ctrl+Enter or Cmd+Enter to render preview
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        renderPreview();
    }
    // Ctrl+L or Cmd+L to clear (only when editor focused)
    if ((e.ctrlKey || e.metaKey) && e.key === 'l' && (document.activeElement === htmlEditor || document.activeElement === cssEditor)) {
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
    let completed = JSON.parse(localStorage.getItem('cssCompletedModules') || '[]');
    if (!completed.includes(moduleNum)) {
        completed.push(moduleNum);
        localStorage.setItem('cssCompletedModules', JSON.stringify(completed));
        localStorage.setItem('cssCourseProgress', completed.length);
        alert('Module ' + moduleNum + ' completed! Keep going!');
    } else {
        alert('You already completed this module!');
    }
}

// ============================================
// Exercise Loading
// ============================================
function loadExercise(category) {
    const exercise = exercises[category];
    if (!exercise) return;
    localStorage.setItem('pendingCSSExercise', JSON.stringify(exercise));
    window.location.href = "index.html";
}

// Check if returning from exercise load
window.addEventListener('DOMContentLoaded', () => {
    const pending = localStorage.getItem('pendingCSSExercise');
    if (pending && document.getElementById('html-editor')) {
        const exercise = JSON.parse(pending);
        document.getElementById('html-editor').value = exercise.html || '';
        document.getElementById('css-editor').value = exercise.css || '';
        renderPreview();
        localStorage.removeItem('pendingCSSExercise');
    }
});