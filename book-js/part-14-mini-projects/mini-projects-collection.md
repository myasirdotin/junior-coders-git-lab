# Part 14: Mini Projects
# The Complete Collection of 21 Beginner JavaScript Projects 🚀

---

Welcome to the **Coding Workshop**! Here are all 21 mini projects designed specifically for Class 7 coders. Each project comes with an overview, required concepts, complete starter code, and creative extension challenges.

---

## Table of Mini Projects

1. [Project 1: Personalized Greeting Generator](#project-1-personalized-greeting-generator)
2. [Project 2: Simple Calculator](#project-2-simple-calculator)
3. [Project 3: Age in Days, Hours, and Minutes](#project-3-age-in-days-hours-and-minutes)
4. [Project 4: Temperature Converter](#project-4-temperature-converter)
5. [Project 5: Coin Flip Simulator](#project-5-coin-flip-simulator)
6. [Project 6: Grade Calculator](#project-6-grade-calculator)
7. [Project 7: Leap Year Checker](#project-7-leap-year-checker)
8. [Project 8: Multiplication Table Generator](#project-8-multiplication-table-generator)
9. [Project 9: Countdown Timer Simulation](#project-9-countdown-timer-simulation)
10. [Project 10: Prime Number Finder](#project-10-prime-number-finder)
11. [Project 11: Even/Odd Classifier](#project-11-evenodd-classifier)
12. [Project 12: Rock, Paper, Scissors Game](#project-12-rock-paper-scissors-game)
13. [Project 13: Shopping List Manager](#project-13-shopping-list-manager)
14. [Project 14: Student Marks Tracker](#project-14-student-marks-tracker)
15. [Project 15: Word & Letter Counter](#project-15-word--letter-counter)
16. [Project 16: Password Strength Checker](#project-16-password-strength-checker)
17. [Project 17: Interactive Quiz Application](#project-17-interactive-quiz-application)
18. [Project 18: Random Quote Generator](#project-18-random-quote-generator)
19. [Project 19: Digital Clock / Time Formatter](#project-19-digital-clock--time-formatter)
20. [Project 20: Simple Tip Calculator](#project-20-simple-tip-calculator)
21. [Project 21: Number Guessing Game](#project-21-number-guessing-game)

---

### Project 1: Personalized Greeting Generator
- **Concepts:** Variables, `prompt()`, template literals.
```javascript
let name = prompt("Enter your name:") || "Friend";
let hour = new Date().getHours();
let greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";
alert(`${greeting}, ${name}! Welcome to coding! 🚀`);
```

---

### Project 2: Simple Calculator
- **Concepts:** Functions, `switch`, arithmetic operators.
```javascript
function calculate(num1, op, num2) {
    switch (op) {
        case "+": return num1 + num2;
        case "-": return num1 - num2;
        case "*": return num1 * num2;
        case "/": return num2 !== 0 ? num1 / num2 : "Cannot divide by 0!";
        default: return "Invalid Operator";
    }
}
console.log("15 + 27 =", calculate(15, "+", 27));
console.log("50 / 5 =", calculate(50, "/", 5));
```

---

### Project 3: Age in Days, Hours, and Minutes
- **Concepts:** Number conversion, math arithmetic.
```javascript
function calculateLifeStats(ageYears) {
    let days = ageYears * 365.25;
    let hours = days * 24;
    let minutes = hours * 60;
    return `At age ${ageYears}, you have lived approx:\n- ${Math.floor(days)} days\n- ${Math.floor(hours)} hours\n- ${Math.floor(minutes)} minutes!`;
}
console.log(calculateLifeStats(12));
```

---

### Project 4: Temperature Converter
- **Concepts:** Formulas, two-way functions.
```javascript
function cToF(celsius) { return (celsius * 9 / 5) + 32; }
function fToC(fahrenheit) { return (fahrenheit - 32) * 5 / 9; }
console.log(`37°C is ${cToF(37)}°F`);
console.log(`98.6°F is ${fToC(98.6)}°C`);
```

---

### Project 5: Coin Flip Simulator
- **Concepts:** `Math.random()`, conditionals.
```javascript
function flipCoin() {
    return Math.random() < 0.5 ? "Heads 🪙" : "Tails 🪙";
}
let results = { Heads: 0, Tails: 0 };
for (let i = 0; i < 100; i++) {
    flipCoin().includes("Heads") ? results.Heads++ : results.Tails++;
}
console.log("100 Flips Result:", results);
```

---

### Project 6: Grade Calculator
- **Concepts:** `if...else if`, comparison logic.
```javascript
function calculateGrade(score) {
    if (score >= 90) return "A+";
    if (score >= 80) return "A";
    if (score >= 70) return "B";
    if (score >= 60) return "C";
    return "Needs Improvement";
}
console.log("Score 87 receives:", calculateGrade(87));
```

---

### Project 7: Leap Year Checker
- **Concepts:** Modulo operator `%`, compound boolean logic.
```javascript
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}
console.log("Is 2024 a leap year?", isLeapYear(2024)); // true
console.log("Is 2100 a leap year?", isLeapYear(2100)); // false
```

---

### Project 8: Multiplication Table Generator
- **Concepts:** `for` loops, string formatting.
```javascript
function printTable(num) {
    console.log(`=== Table for ${num} ===`);
    for (let i = 1; i <= 10; i++) {
        console.log(`${num} x ${i} = ${num * i}`);
    }
}
printTable(7);
```

---

### Project 9: Countdown Timer Simulation
- **Concepts:** `while` loop, decrements.
```javascript
function launchRocket() {
    let count = 5;
    while (count > 0) {
        console.log(`T-minus: ${count}...`);
        count--;
    }
    console.log("🚀 BLAST OFF INTO SPACE!");
}
launchRocket();
```

---

### Project 10: Prime Number Finder
- **Concepts:** Nested loops or helper functions, modulo.
```javascript
function getPrimes(max) {
    let primes = [];
    for (let i = 2; i <= max; i++) {
        let isPrime = true;
        for (let j = 2; j <= Math.sqrt(i); j++) {
            if (i % j === 0) { isPrime = false; break; }
        }
        if (isPrime) primes.push(i);
    }
    return primes;
}
console.log("Primes up to 50:", getPrimes(50));
```

---

### Project 11: Even/Odd Classifier
- **Concepts:** Array filtering with loops, push.
```javascript
function classifyNumbers(numbers) {
    let evens = [], odds = [];
    for (let n of numbers) {
        n % 2 === 0 ? evens.push(n) : odds.push(n);
    }
    return { evens, odds };
}
console.log(classifyNumbers([12, 5, 8, 9, 21, 34, 40]));
```

---

### Project 12: Rock, Paper, Scissors Game
- **Concepts:** Random choice from array, game logic.
```javascript
function playRPS(userChoice) {
    let options = ["rock", "paper", "scissors"];
    let computerChoice = options[Math.floor(Math.random() * options.length)];
    let u = userChoice.toLowerCase();
    
    if (u === computerChoice) return `Tie! Both picked ${u}.`;
    if ((u === "rock" && computerChoice === "scissors") ||
        (u === "paper" && computerChoice === "rock") ||
        (u === "scissors" && computerChoice === "paper")) {
        return `You Win! ${u} beats ${computerChoice}! 🏆`;
    }
    return `Computer Wins! ${computerChoice} beats ${u}! 💻`;
}
console.log(playRPS("rock"));
```

---

### Project 13: Shopping List Manager
- **Concepts:** Array methods (`push`, `includes`, `indexOf`, `splice`).
```javascript
let cart = [];
function addItem(item) { cart.push(item); console.log(`Added: ${item}`); }
function removeItem(item) {
    let idx = cart.indexOf(item);
    if (idx !== -1) { cart.splice(idx, 1); console.log(`Removed: ${item}`); }
}
addItem("Milk");
addItem("Apples");
removeItem("Milk");
console.log("Current Cart:", cart);
```

---

### Project 14: Student Marks Tracker
- **Concepts:** Arrays of objects, sum, average, min, max.
```javascript
let students = [
    { name: "Ali", score: 85 },
    { name: "Sara", score: 92 },
    { name: "Dev", score: 78 }
];
let total = 0, top = students[0];
for (let s of students) {
    total += s.score;
    if (s.score > top.score) top = s;
}
console.log(`Average: ${(total / students.length).toFixed(1)}% | Topper: ${top.name} (${top.score}%)`);
```

---

### Project 15: Word & Letter Counter
- **Concepts:** String length, `split(" ")`.
```javascript
function analyzeText(text) {
    let clean = text.trim();
    let words = clean.length > 0 ? clean.split(/\s+/).length : 0;
    let characters = clean.length;
    return { words, characters };
}
console.log(analyzeText("JavaScript is super exciting to learn!"));
```

---

### Project 16: Password Strength Checker
- **Concepts:** String methods, regex / checks.
```javascript
function checkPasswordStrength(pw) {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    
    if (score <= 1) return "Weak 🔴";
    if (score <= 3) return "Medium 🟡";
    return "Strong 🟢";
}
console.log("Testing 'pass123':", checkPasswordStrength("pass123"));
console.log("Testing 'SuperSecret#99':", checkPasswordStrength("SuperSecret#99"));
```

---

### Project 17: Interactive Quiz Application
- **Concepts:** Array of question objects, loop, score counter.
```javascript
const quiz = [
    { question: "What does DOM stand for?", answer: "Document Object Model" },
    { question: "What keyword creates a variable that can change?", answer: "let" }
];
let score = 0;
for (let item of quiz) {
    console.log("Q: " + item.question);
    // In real app: check user input against item.answer
}
```

---

### Project 18: Random Quote Generator
- **Concepts:** Arrays, `Math.floor(Math.random() * length)`.
```javascript
const quotes = [
    "The secret of getting ahead is getting started. - Mark Twain",
    "It always seems impossible until it's done. - Nelson Mandela",
    "First, solve the problem. Then, write the code. - John Johnson"
];
function getDailyQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}
console.log("Today's Inspiration:\n" + getDailyQuote());
```

---

### Project 19: Digital Clock / Time Formatter
- **Concepts:** `Date()` object, string padding (`padStart`).
```javascript
function getFormattedTime() {
    let d = new Date();
    let h = String(d.getHours()).padStart(2, '0');
    let m = String(d.getMinutes()).padStart(2, '0');
    let s = String(d.getSeconds()).padStart(2, '0');
    return `${h}:${m}:${s}`;
}
console.log("Current Time:", getFormattedTime());
```

---

### Project 20: Simple Tip Calculator
- **Concepts:** Formulas, rounding with `toFixed(2)`.
```javascript
function calculateTip(billAmount, tipPercent, splitPeople = 1) {
    let tip = billAmount * (tipPercent / 100);
    let total = billAmount + tip;
    let perPerson = total / splitPeople;
    return {
        tipTotal: `$${tip.toFixed(2)}`,
        grandTotal: `$${total.toFixed(2)}`,
        eachPays: `$${perPerson.toFixed(2)}`
    };
}
console.log(calculateTip(85.50, 15, 3));
```

---

### Project 21: Number Guessing Game
- **Concepts:** Random number, loop with guess simulation.
```javascript
function simulateGuessGame(secret, guesses) {
    for (let g of guesses) {
        if (g === secret) {
            console.log(`Guess ${g}: WINNER! That was the secret number! 🎯`);
            return;
        } else if (g < secret) {
            console.log(`Guess ${g}: Too low!`);
        } else {
            console.log(`Guess ${g}: Too high!`);
        }
    }
}
simulateGuessGame(42, [20, 60, 35, 42]);
```
