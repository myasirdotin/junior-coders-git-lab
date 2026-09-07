# Capstone Project
# Final Project Guide: The Interactive Quiz Arena 🏆

---

## 1. Project Overview 🚀

Congratulations on making it to the grand capstone! 
In this final project, you will combine **HTML structure**, **CSS responsive styling**, and **JavaScript logic, arrays, objects, and event listeners** to build a complete, production-ready web application:

### **"The Interactive Quiz Arena"**
A multi-question quiz platform with:
- Multiple choice questions stored in a clean array of objects
- Real-time score tracking and question progress bar
- Instant visual feedback (green for correct, red for incorrect)
- An animated results screen with performance badge based on score
- A "Play Again" restart mechanism

---

## 2. Project Architecture & File Structure 📁

Create a new folder `final-quiz-app/` with three clean files:
```text
final-quiz-app/
├── index.html        # Semantic layout & quiz containers
├── style.css         # Modern, clean aesthetic with animations
└── app.js            # State management, scorekeeping, and DOM updates
```

---

## 3. Step 1: HTML Semantic Foundation (`index.html`) 🧱

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Class 7 Quiz Arena</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="quiz-container">
        <!-- Header & Progress -->
        <header class="quiz-header">
            <h1 class="logo">⚡ Quiz Arena</h1>
            <div class="progress-box">
                <span id="question-progress">Question 1 of 5</span>
                <div class="progress-bar-bg">
                    <div id="progress-bar-fill"></div>
                </div>
            </div>
        </header>

        <!-- Main Question Card -->
        <main id="quiz-card" class="quiz-card">
            <h2 id="question-text">Loading question...</h2>
            <div id="options-container" class="options-grid">
                <!-- Option buttons injected by JavaScript -->
            </div>
            <div class="footer-actions">
                <p id="score-display">Score: 0</p>
                <button id="next-btn" class="btn primary-btn hidden">Next Question ➡️</button>
            </div>
        </main>

        <!-- Final Results Screen (Hidden initially) -->
        <section id="results-screen" class="results-card hidden">
            <h2>Quiz Complete! 🎉</h2>
            <div class="score-circle">
                <span id="final-score">0 / 5</span>
            </div>
            <p id="feedback-message">Great effort!</p>
            <button id="restart-btn" class="btn secondary-btn">Play Again 🔄</button>
        </section>
    </div>

    <script src="app.js"></script>
</body>
</html>
```

---

## 4. Step 2: Responsive Stylesheet (`style.css`) 🎨

```css
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

body {
    background: linear-gradient(135deg, #1e1b4b, #312e81, #0f172a);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    color: #f8fafc;
}

.quiz-container {
    background: rgba(30, 41, 59, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 30px;
    max-width: 600px;
    width: 100%;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
}

.quiz-header {
    margin-bottom: 25px;
}

.logo {
    font-size: 1.6rem;
    color: #38bdf8;
    margin-bottom: 12px;
}

.progress-box {
    font-size: 0.9rem;
    color: #94a3b8;
}

.progress-bar-bg {
    background: #334155;
    height: 8px;
    border-radius: 4px;
    margin-top: 6px;
    overflow: hidden;
}

#progress-bar-fill {
    background: linear-gradient(90deg, #38bdf8, #818cf8);
    height: 100%;
    width: 20%;
    transition: width 0.3s ease;
}

#question-text {
    font-size: 1.3rem;
    line-height: 1.5;
    margin-bottom: 24px;
    color: #ffffff;
}

.options-grid {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
}

.option-btn {
    background: #334155;
    border: 2px solid transparent;
    color: #f8fafc;
    padding: 14px 20px;
    border-radius: 12px;
    font-size: 1rem;
    text-align: left;
    cursor: pointer;
    transition: all 0.2s ease;
}

.option-btn:hover:not([disabled]) {
    background: #475569;
    transform: translateY(-2px);
    border-color: #38bdf8;
}

.option-btn.correct {
    background: #166534 !important;
    border-color: #22c55e !important;
}

.option-btn.wrong {
    background: #991b1b !important;
    border-color: #ef4444 !important;
}

.footer-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.btn {
    padding: 12px 24px;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: 0.2s;
}

.primary-btn {
    background: #38bdf8;
    color: #0f172a;
}

.primary-btn:hover {
    background: #7dd3fc;
}

.secondary-btn {
    background: #6366f1;
    color: #fff;
    margin-top: 20px;
}

.hidden {
    display: none !important;
}

.results-card {
    text-align: center;
    padding: 20px;
}

.score-circle {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    background: #1e293b;
    border: 4px solid #38bdf8;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.8rem;
    font-weight: bold;
    margin: 20px auto;
    color: #38bdf8;
}
```

---

## 5. Step 3: Complete JavaScript Logic (`app.js`) ⚙️

```javascript
// 1. Questions Database
const quizData = [
    {
        question: "Which HTML tag is used to create a numbered ordered list?",
        options: ["<ul>", "<ol>", "<li>", "<dl>"],
        answer: 1 // index 1 is <ol>
    },
    {
        question: "Which CSS property changes the text color of an element?",
        options: ["font-color", "text-style", "color", "background-color"],
        answer: 2
    },
    {
        question: "What keyword is used to declare a variable whose value CANNOT change?",
        options: ["let", "var", "const", "fixed"],
        answer: 2
    },
    {
        question: "What does `array.length` tell us?",
        options: ["Index of first item", "Total count of items", "Size of memory", "Array speed"],
        answer: 1
    },
    {
        question: "Which event fires when a user clicks a button?",
        options: ["hover", "change", "submit", "click"],
        answer: 3
    }
];

// 2. DOM Elements
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const questionProgress = document.getElementById("question-progress");
const progressBarFill = document.getElementById("progress-bar-fill");
const scoreDisplay = document.getElementById("score-display");
const nextBtn = document.getElementById("next-btn");
const quizCard = document.getElementById("quiz-card");
const resultsScreen = document.getElementById("results-screen");
const finalScore = document.getElementById("final-score");
const feedbackMessage = document.getElementById("feedback-message");
const restartBtn = document.getElementById("restart-btn");

// 3. App State Variables
let currentQuestionIndex = 0;
let score = 0;

// 4. Load Question Function
function loadQuestion() {
    // Reset state for new question
    nextBtn.classList.add("hidden");
    optionsContainer.innerHTML = "";

    const currentQuiz = quizData[currentQuestionIndex];

    // Update Question Title & Progress
    questionText.textContent = currentQuiz.question;
    questionProgress.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
    const progressPercent = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressBarFill.style.width = `${progressPercent}%`;

    // Render Options
    currentQuiz.options.forEach((optionText, index) => {
        const button = document.createElement("button");
        button.classList.add("option-btn");
        button.textContent = optionText;
        button.addEventListener("click", () => handleSelectOption(button, index));
        optionsContainer.appendChild(button);
    });
}

// 5. Handle Option Click
function handleSelectOption(selectedButton, selectedIndex) {
    const currentQuiz = quizData[currentQuestionIndex];
    const allOptionButtons = optionsContainer.querySelectorAll(".option-btn");

    // Disable all buttons to prevent clicking again
    allOptionButtons.forEach(btn => btn.disabled = true);

    if (selectedIndex === currentQuiz.answer) {
        selectedButton.classList.add("correct");
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
    } else {
        selectedButton.classList.add("wrong");
        // Highlight the correct answer in green
        allOptionButtons[currentQuiz.answer].classList.add("correct");
    }

    // Show Next Button
    nextBtn.classList.remove("hidden");
}

// 6. Next Button Click Handler
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showFinalResults();
    }
});

// 7. Show Final Results
function showFinalResults() {
    quizCard.classList.add("hidden");
    resultsScreen.classList.remove("hidden");

    finalScore.textContent = `${score} / ${quizData.length}`;

    if (score === quizData.length) {
        feedbackMessage.textContent = "🏆 Master Coder! Perfect score! You're a JavaScript Wizard!";
    } else if (score >= 3) {
        feedbackMessage.textContent = "🌟 Great job! You have strong web development fundamentals!";
    } else {
        feedbackMessage.textContent = "💪 Good try! Review the book chapters and try again to improve!";
    }
}

// 8. Restart Quiz
restartBtn.addEventListener("click", () => {
    score = 0;
    currentQuestionIndex = 0;
    scoreDisplay.textContent = `Score: 0`;
    resultsScreen.classList.add("hidden");
    quizCard.classList.remove("hidden");
    loadQuestion();
});

// Initial boot
loadQuestion();
```

---

## 6. Testing & Rubric Checklist 📋

- [ ] Does every question show 4 choices cleanly?
- [ ] Does clicking the correct answer turn it green and increase the score?
- [ ] Does clicking the wrong answer turn it red and reveal the correct one?
- [ ] Does the progress bar expand smoothly?
- [ ] Does the results card show personalized feedback based on score?
- [ ] Does "Play Again" completely reset all state variables without needing to reload the browser?

---

## 7. Submission & Presentation Tips 🎤

When presenting your final project to your teacher and classmates:
1. **Explain the data structure:** Show how `quizData` holds questions in an array of objects.
2. **Explain event delegation and listeners:** Demonstrate how clicking an option triggers `handleSelectOption()`.
3. **Show your CSS responsive styling:** Resize your browser to show that the card looks gorgeous on phones and tablets!
