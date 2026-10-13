# Chapter 23: Final Project: The Quiz Arena

---

## 🌟 Real-Life Story

At the end of a science course, students often build a working model, such as a small water filter. Every lesson they learned now has a job: measuring, cutting, joining and testing. The model is not a new topic. It is everything they already know, put together carefully. Your final project works the same way. You will build a complete quiz web page from the HTML, CSS and JavaScript you already know.

---

## 🎯 What You Will Learn

- Plan a small web app as three files: HTML for structure, CSS for looks, JavaScript for behaviour.
- Store quiz questions in an array of objects and show them one at a time.
- Build answer buttons with `createElement`, `appendChild` and `addEventListener`.
- Keep track of the app's state (the current question and the score) and reset it safely.
- Put text a user types on the page with `textContent`, never `innerHTML`.

---

## Project Overview

You will build **"The Quiz Arena"**, a five-question quiz about science and coding. It has:

- A start screen that asks for the student's first name.
- Multiple-choice questions stored in an array of objects.
- A progress line ("Question 2 of 5") and a progress bar.
- Instant feedback: green for a correct answer, red for a wrong one, and the correct answer shown.
- A results screen with a short, kind message that uses the student's name.
- A "Try again" button that resets everything without reloading the page.

Every idea comes from earlier chapters: variables, conditions, loops, functions, arrays, objects, strings and the DOM.

---

## Plan the Files

Create a folder called `final-quiz-app` with three files:

```text
final-quiz-app/
├── index.html   (structure: the screens)
├── style.css    (looks: colours, spacing)
└── app.js       (behaviour: questions, score)
```

Keeping the three jobs in three files is called **separation of concerns** (Chapter 16). It makes each file shorter and easier to fix.

---

## Step 1: The HTML Page (`index.html`)

The page has three screens: start, question card and results. Only one is visible at a time. The class `hidden` hides the other two.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz Arena</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="quiz-container">
        <header class="quiz-header">
            <h1 class="logo">Quiz Arena</h1>
            <p id="question-progress">5 questions about science and coding</p>
            <div class="progress-bar-bg">
                <div id="progress-bar-fill"></div>
            </div>
        </header>

        <!-- Start screen -->
        <section id="start-screen" class="card">
            <label for="student-name">Your first name</label>
            <input type="text" id="student-name" maxlength="20" placeholder="For example: Aisha">
            <button id="start-btn" class="btn primary-btn">Start the quiz</button>
        </section>

        <!-- Question card (hidden until the quiz starts) -->
        <main id="quiz-card" class="card hidden">
            <h2 id="question-text">Loading question...</h2>
            <div id="options-container" class="options-grid">
                <!-- JavaScript adds one button per answer here -->
            </div>
            <div class="footer-actions">
                <p id="score-display">Score: 0</p>
                <button id="next-btn" class="btn primary-btn hidden">Next question</button>
            </div>
        </main>

        <!-- Results screen (hidden until the last question) -->
        <section id="results-screen" class="card results-card hidden">
            <h2>Quiz complete!</h2>
            <p id="final-score" class="score-circle">0 / 5</p>
            <p id="feedback-message">Well done for finishing.</p>
            <button id="restart-btn" class="btn secondary-btn">Try again</button>
        </section>
    </div>

    <script src="app.js"></script>
</body>
</html>
```

The `<script>` tag is at the end of `<body>`. So all the elements exist before `app.js` looks for them.

---

## Step 2: The Stylesheet (`style.css`)

The CSS is kept short. The most important rules are `.correct`, `.wrong` and `.hidden`, because JavaScript switches them on and off with `classList`.

```css
* {
    box-sizing: border-box;
    margin: 0;
}

body {
    font-family: "Segoe UI", Arial, sans-serif;
    background: #0f172a;
    color: #f8fafc;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
}

.quiz-container {
    background: #1e293b;
    border-radius: 16px;
    padding: 24px;
    max-width: 600px;
    width: 100%;
}

.logo {
    color: #38bdf8;
    margin-bottom: 8px;
}

#question-progress {
    color: #94a3b8;
}

.progress-bar-bg {
    background: #334155;
    height: 8px;
    border-radius: 4px;
    margin: 8px 0 20px;
    overflow: hidden;
}

#progress-bar-fill {
    background: #38bdf8;
    height: 100%;
    width: 0%;
    transition: width 0.3s;
}

.card label,
.card input {
    display: block;
    width: 100%;
    margin-bottom: 12px;
}

.card input {
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #475569;
    font-size: 1rem;
}

#question-text {
    font-size: 1.25rem;
    margin-bottom: 20px;
}

.options-grid {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
}

.option-btn {
    background: #334155;
    color: #f8fafc;
    border: 2px solid transparent;
    border-radius: 10px;
    padding: 12px 16px;
    font-size: 1rem;
    text-align: left;
    cursor: pointer;
}

.option-btn:hover {
    border-color: #38bdf8;
}

.option-btn.correct {
    background: #166534;
    border-color: #22c55e;
}

.option-btn.wrong {
    background: #991b1b;
    border-color: #ef4444;
}

.footer-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.btn {
    padding: 12px 20px;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
}

.primary-btn {
    background: #38bdf8;
    color: #0f172a;
}

.secondary-btn {
    background: #6366f1;
    color: #ffffff;
}

.results-card {
    text-align: center;
}

.score-circle {
    width: 120px;
    height: 120px;
    line-height: 112px;
    border: 4px solid #38bdf8;
    border-radius: 50%;
    margin: 20px auto;
    font-size: 1.8rem;
    font-weight: bold;
}

#feedback-message {
    margin-bottom: 20px;
}

.hidden {
    display: none;
}
```

---

## Step 3: The JavaScript (`app.js`)

This is the brain of the app. Read the numbered comments: each part has one job.

```javascript
// 1. The questions: an array of objects
// "answer" is the index of the correct option (counting from 0)
const quizData = [
    {
        question: "Which HTML tag makes a numbered list?",
        options: ["<ul>", "<ol>", "<li>", "<dl>"],
        answer: 1
    },
    {
        question: "Which CSS property changes the colour of text?",
        options: ["font-color", "text-style", "color", "background-color"],
        answer: 2
    },
    {
        question: "Which keyword makes a variable that cannot be given a new value?",
        options: ["let", "const", "change", "fixed"],
        answer: 1
    },
    {
        question: "Which planet is closest to the Sun?",
        options: ["Venus", "Earth", "Mars", "Mercury"],
        answer: 3
    },
    {
        question: "Which event happens when a user clicks a button?",
        options: ["hover", "change", "submit", "click"],
        answer: 3
    }
];

// 2. The page elements we need
const startScreen = document.getElementById("start-screen");
const nameInput = document.getElementById("student-name");
const startBtn = document.getElementById("start-btn");
const quizCard = document.getElementById("quiz-card");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const questionProgress = document.getElementById("question-progress");
const progressBarFill = document.getElementById("progress-bar-fill");
const scoreDisplay = document.getElementById("score-display");
const nextBtn = document.getElementById("next-btn");
const resultsScreen = document.getElementById("results-screen");
const finalScore = document.getElementById("final-score");
const feedbackMessage = document.getElementById("feedback-message");
const restartBtn = document.getElementById("restart-btn");

// 3. The state: values that change while the quiz runs
let studentName = "";
let currentIndex = 0;
let score = 0;
let optionButtons = [];

// 4. Show the current question and make one button per option
function loadQuestion() {
    nextBtn.classList.add("hidden");
    optionsContainer.textContent = ""; // removes the old buttons
    optionButtons = [];

    const current = quizData[currentIndex];
    questionText.textContent = current.question;
    questionProgress.textContent = `Question ${currentIndex + 1} of ${quizData.length}`;
    const percent = ((currentIndex + 1) / quizData.length) * 100;
    progressBarFill.style.width = `${percent}%`;

    for (let i = 0; i < current.options.length; i++) {
        const button = document.createElement("button");
        button.classList.add("option-btn");
        button.textContent = current.options[i];
        button.addEventListener("click", function () {
            selectOption(i);
        });
        optionsContainer.appendChild(button);
        optionButtons.push(button);
    }
}

// 5. Check the chosen option
function selectOption(chosen) {
    const current = quizData[currentIndex];

    // Lock all buttons so the answer cannot be changed
    for (let i = 0; i < optionButtons.length; i++) {
        optionButtons[i].disabled = true;
    }

    if (chosen === current.answer) {
        optionButtons[chosen].classList.add("correct");
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
    } else {
        optionButtons[chosen].classList.add("wrong");
        optionButtons[current.answer].classList.add("correct");
    }

    nextBtn.classList.remove("hidden");
}

// 6. Show the results screen
function showResults() {
    quizCard.classList.add("hidden");
    resultsScreen.classList.remove("hidden");
    questionProgress.textContent = "All questions answered";
    finalScore.textContent = `${score} / ${quizData.length}`;

    if (score === quizData.length) {
        feedbackMessage.textContent = `Excellent work, ${studentName}! Every answer was correct.`;
    } else if (score >= 3) {
        feedbackMessage.textContent = `Good work, ${studentName}! Look again at the questions you missed.`;
    } else {
        feedbackMessage.textContent = `Well done for trying, ${studentName}. Read the chapters again and try once more.`;
    }
}

// 7. Start button: read the name, then show the first question
startBtn.addEventListener("click", function () {
    studentName = nameInput.value.trim();
    if (studentName === "") {
        studentName = "friend";
    }
    startScreen.classList.add("hidden");
    quizCard.classList.remove("hidden");
    loadQuestion();
});

// 8. Next button: go to the next question or finish
nextBtn.addEventListener("click", function () {
    currentIndex++;
    if (currentIndex < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

// 9. Try again: reset the state and start from question 1
restartBtn.addEventListener("click", function () {
    currentIndex = 0;
    score = 0;
    scoreDisplay.textContent = "Score: 0";
    resultsScreen.classList.add("hidden");
    quizCard.classList.remove("hidden");
    loadQuestion();
});
```

---

## How the Code Works

- **Part 1, the data:** each question is an object with `question`, `options` (an array) and `answer` (an index). To add a question, you add one object. No other code changes.
- **Part 2, the elements:** `getElementById` finds each element once, and a `const` keeps it ready.
- **Part 3, the state:** `currentIndex` says which question we are on. `score` counts correct answers. `optionButtons` remembers this question's buttons.
- **Part 4, `loadQuestion()`:** setting `textContent` to `""` empties the box, which removes the old buttons. A `for` loop then makes one new button per option. Each button's listener remembers its own `i`, because `let` makes a fresh `i` for every round of the loop.
- **Part 5, `selectOption()`:** every button has a `disabled` property. Setting it to `true` greys the button out and stops further clicks. Then `classList.add` paints the answer green or red.
- **Part 6, `showResults()`:** an `if...else if` chooses a kind message for the score.
- **Parts 7–9, the listeners:** the three buttons connect the screens. "Try again" puts the state back to the start values.

Notice that the options `"<ul>"` and `"<ol>"` appear on the buttons as plain text. That is because `textContent` never turns text into HTML tags.

---

## Testing Checklist

Open `index.html` in your browser and test like a quality checker:

- [ ] Clicking **Start the quiz** with an empty name still works and later says "friend".
- [ ] Every question shows four buttons, and the progress bar grows by one fifth each time.
- [ ] A correct answer turns green and adds 1 to the score.
- [ ] A wrong answer turns red, and the correct answer turns green.
- [ ] After one answer, the other buttons cannot be clicked.
- [ ] The results screen shows the right score and a message with the name.
- [ ] **Try again** starts at question 1 with a score of 0, without reloading the page.
- [ ] The page fits a phone screen (make the browser window narrow to check).

---

## Presenting Your Project

When you show your project to your teacher and classmates:

1. **Explain the data:** show how `quizData` holds the questions as an array of objects.
2. **Explain the listeners:** click an option and show how it calls `selectOption()`.
3. **Explain the safety choice:** say why the name is shown with `textContent`.
4. **Be honest:** say which parts you wrote yourself and which ideas came from this book.

---

## ⚠️ Common Mistake

**Showing typed text with `innerHTML`.**

❌ Wrong:

```javascript
feedbackMessage.innerHTML = "Good work, " + studentName + "!";
```

What happens: `innerHTML` treats the text as HTML. If someone types `<b>Zain</b>` as a name, the browser makes it bold instead of showing the letters. A person with bad intentions could type harmful code in the same way. This attack is called **XSS** (cross-site scripting).

✅ Fixed:

```javascript
feedbackMessage.textContent = "Good work, " + studentName + "!";
```

Now the page shows exactly what was typed: `Good work, <b>Zain</b>!`. Keeping users safe is part of your *Amānah* (trust) as a programmer.

**A second mistake: forgetting to reset the state.** If the "Try again" listener does not set `score = 0`, the old score carries into the new round. Every value in Part 3 needs a fresh start.

---

## ✍️ Try It

Add a **sixth question** about a science or coding topic you studied this year.

> 💡 **Hint:** copy one object in `quizData`, change the question, the four options and the `answer` index. Remember the comma between objects. The progress line will say "of 6" by itself, because it uses `quizData.length`.

---

## 📝 Recap

- A web app is three files: HTML for structure, CSS for looks, JavaScript for behaviour.
- Questions live in an array of objects; adding a question means adding data, not code.
- `createElement`, `appendChild` and `addEventListener` build buttons from the data.
- State variables (`currentIndex`, `score`) track the quiz, and "Try again" must reset them all.
- Use `textContent` for anything a user types, never `innerHTML`.

**Check yourself:**

- [ ] I can explain what each of the nine parts of `app.js` does.
- [ ] I can add a question without changing any function.
- [ ] I can explain why `textContent` is safer than `innerHTML`.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. In `quizData`, what does `answer: 3` mean?
2. Which property locks a button so it cannot be clicked?
3. Why does the name appear with `textContent` and not `innerHTML`?

<details>
<summary>Show answer</summary>

1. The correct option is at index 3, the **fourth** option, because indexes start at 0.
2. `disabled`. Setting `button.disabled = true` locks the button.
3. `textContent` shows text exactly as typed. `innerHTML` would turn typed tags into real HTML, which allows XSS attacks.

</details>

### 🟡 Level 2: Apply
Change the quiz so the score line shows the number of questions answered too, for example `Score: 2 (3 answered)`.

<details>
<summary>Show answer</summary>

Add a new state variable in Part 3:

```javascript
let answered = 0;
```

In `selectOption()`, after the `if...else`, count the answer and update the line:

```javascript
answered++;
scoreDisplay.textContent = `Score: ${score} (${answered} answered)`;
```

You can then remove the old `scoreDisplay.textContent` line inside the `if`. In the "Try again" listener, reset it too:

```javascript
answered = 0;
scoreDisplay.textContent = "Score: 0 (0 answered)";
```

</details>

### 🔴 Level 3: Challenge
Add a **review list** to the results screen. It shows every question the student got wrong, with the correct answer.

1. In `index.html`, add `<ul id="review-list"></ul>` inside the results screen, above the button.
2. In `app.js`, add a state array `missed = []`.
3. In `selectOption()`, when the answer is wrong, push the current question object into `missed`.
4. In `showResults()`, empty the list, then loop over `missed`. For each one, create an `<li>` whose text is the question and its correct option.
5. Reset `missed` in the "Try again" listener.

<details>
<summary>Show one possible answer</summary>

```javascript
// Part 2: one more element
const reviewList = document.getElementById("review-list");

// Part 3: one more state variable
let missed = [];

// In selectOption(), inside the else branch:
missed.push(current);

// At the end of showResults():
reviewList.textContent = "";
for (let i = 0; i < missed.length; i++) {
    const item = document.createElement("li");
    const correctOption = missed[i].options[missed[i].answer];
    item.textContent = `${missed[i].question} Answer: ${correctOption}`;
    reviewList.appendChild(item);
}

// In the "Try again" listener:
missed = [];
```

The text goes in with `textContent`, so options such as `<ol>` show as plain text.

</details>
