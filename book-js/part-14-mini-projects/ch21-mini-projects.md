# Chapter 21: Mini Projects 🚀

---

## 🌟 Real-Life Story

A carpentry student first learns each tool on its own: the saw, the drill, the ruler. Then the teacher says, "Now build a small bookshelf." Suddenly the tools work together. The student measures, cuts and joins, one step at a time. This chapter is your bookshelf moment. You already know the tools of JavaScript. Now you will build 21 small, complete programs with them.

---

## 🎯 What You Will Learn

- Combine variables, conditions, loops, functions, arrays and objects in small, complete programs.
- Read working starter code and predict what it prints before you run it.
- Extend a project with your own features, one small step at a time.
- Choose the right tool (loop, array method, object) for each everyday problem.

---

## 🧭 How to Use These Projects

Every project has three parts:

1. **Main ideas:** the chapters it uses, so you can look back if you are stuck.
2. **Starter code:** a complete program. Type it yourself; do not paste it. Typing builds memory.
3. **Output:** exactly what the program prints in the console.

Work like a scientist. Run the code, check the output, then change **one** thing and run it again.

| No. | Project | Main ideas |
|---|---|---|
| 1 | Personal Greeting | functions, `if...else if` |
| 2 | Simple Calculator | functions, `if...else if` |
| 3 | Age in Days, Hours and Minutes | arithmetic, `Math.floor` |
| 4 | Temperature Converter | formulas, two functions |
| 5 | Fair Team Picker | `Math.random`, loops, counters |
| 6 | Grade Calculator | `if...else if` |
| 7 | Leap Year Checker | `%`, `&&`, `\|\|` |
| 8 | Times Table Generator | `for` loop |
| 9 | Rocket Countdown | `while` loop |
| 10 | Prime Number Finder | nested loops, `%` |
| 11 | Even and Odd Sorter | arrays, `push`, `%` |
| 12 | Charity Book Drive Tally | arrays, running total, largest value |
| 13 | School Supplies List | `push`, `includes`, building a new array |
| 14 | Student Marks Tracker | array of objects, average, top score |
| 15 | Word and Letter Counter | `trim`, `split`, `length` |
| 16 | Password Strength Checker | looping over a string, conditions |
| 17 | Console Quiz | array of objects, score counter |
| 18 | Study Tip of the Day | `Math.random`, array index |
| 19 | Seconds to Hours, Minutes, Seconds | `Math.floor`, `%`, two-digit text |
| 20 | Class Trip Cost Splitter | formulas, objects |
| 21 | Number Detective | `while` loop, halving a range |

---

## 🔢 Numbers and Decisions (Projects 1–7)

### Project 1: Personal Greeting

**Main ideas:** functions (Chapter 10), `if...else if` (Chapter 6), template literals (Chapter 13).

The function chooses a greeting from the hour of the day (0 to 23).

```javascript
function greet(name, hour) {
    let greeting = "Good evening";
    if (hour < 12) {
        greeting = "Good morning";
    } else if (hour < 18) {
        greeting = "Good afternoon";
    }
    return `${greeting}, ${name}! Welcome to coding!`;
}

console.log(greet("Aisha", 9));
console.log(greet("Omar", 15));
console.log(greet("Maryam", 20));
```

Output:

```text
Good morning, Aisha! Welcome to coding!
Good afternoon, Omar! Welcome to coding!
Good evening, Maryam! Welcome to coding!
```

**Extend it:** in the browser, ask for the name with `prompt()` (Chapter 15) and show the greeting with `alert()`.

---

### Project 2: Simple Calculator

**Main ideas:** functions, `if...else if`, arithmetic operators (Chapter 5).

```javascript
function calculate(num1, op, num2) {
    if (op === "+") {
        return num1 + num2;
    } else if (op === "-") {
        return num1 - num2;
    } else if (op === "*") {
        return num1 * num2;
    } else if (op === "/") {
        if (num2 === 0) {
            return "Cannot divide by 0!";
        }
        return num1 / num2;
    } else {
        return "Unknown operator";
    }
}

console.log("15 + 27 =", calculate(15, "+", 27));
console.log("50 / 5 =", calculate(50, "/", 5));
console.log("8 / 0 =", calculate(8, "/", 0));
console.log("4 ^ 2 =", calculate(4, "^", 2));
```

Output:

```text
15 + 27 = 42
50 / 5 = 10
8 / 0 = Cannot divide by 0!
4 ^ 2 = Unknown operator
```

**Extend it:** add `"%"` for the remainder.

---

### Project 3: Age in Days, Hours and Minutes

**Main ideas:** arithmetic, `Math.floor` (Chapter 5).

A year is about 365.25 days, because every fourth year has an extra day.

```javascript
function lifeStats(ageYears) {
    let days = Math.floor(ageYears * 365.25);
    let hours = days * 24;
    let minutes = hours * 60;
    console.log(`At age ${ageYears}, you have lived about:`);
    console.log(`- ${days} days`);
    console.log(`- ${hours} hours`);
    console.log(`- ${minutes} minutes`);
}

lifeStats(12);
```

Output:

```text
At age 12, you have lived about:
- 4383 days
- 105192 hours
- 6311520 minutes
```

**Extend it:** also print the number of weeks.

---

### Project 4: Temperature Converter

**Main ideas:** formulas, two functions that undo each other.

```javascript
function cToF(celsius) {
    return (celsius * 9 / 5) + 32;
}

function fToC(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

console.log(`100°C is ${cToF(100)}°F (water boils)`);
console.log(`37°C is ${cToF(37)}°F (body temperature)`);
console.log(`32°F is ${fToC(32)}°C (water freezes)`);
```

Output:

```text
100°C is 212°F (water boils)
37°C is 98.6°F (body temperature)
32°F is 0°C (water freezes)
```

**Extend it:** check that `fToC(cToF(25))` gives back 25.

---

### Project 5: Fair Team Picker

**Main ideas:** `Math.random()` (Chapter 15), conditions, `for` loop, counters.

`Math.random()` gives a number from 0 up to (but not including) 1. Half of those numbers are below 0.5.

```javascript
function pickTeam() {
    if (Math.random() < 0.5) {
        return "Team A";
    }
    return "Team B";
}

let teamA = 0;
let teamB = 0;
for (let i = 0; i < 100; i++) {
    if (pickTeam() === "Team A") {
        teamA++;
    } else {
        teamB++;
    }
}
console.log(`100 students placed: Team A ${teamA}, Team B ${teamB}`);
```

The numbers change every run. One run printed `100 students placed: Team A 47, Team B 53`. Each team gets about half.

**Extend it:** add a third team. Hint: compare with `1 / 3` and `2 / 3`.

---

### Project 6: Grade Calculator

**Main ideas:** `if...else if` with comparisons (Chapter 6). The order matters: check the highest band first.

```javascript
function calculateGrade(score) {
    if (score >= 90) {
        return "A+";
    } else if (score >= 80) {
        return "A";
    } else if (score >= 70) {
        return "B";
    } else if (score >= 60) {
        return "C";
    }
    return "Needs more practice";
}

console.log("Score 87:", calculateGrade(87));
console.log("Score 95:", calculateGrade(95));
console.log("Score 52:", calculateGrade(52));
```

Output:

```text
Score 87: A
Score 95: A+
Score 52: Needs more practice
```

**Extend it:** print "Invalid score" for numbers below 0 or above 100.

---

### Project 7: Leap Year Checker

**Main ideas:** the remainder operator `%`, `&&` and `||` (Chapter 7).

A year is a leap year if it divides by 4 but not by 100, **or** if it divides by 400.

```javascript
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

console.log("2024:", isLeapYear(2024));
console.log("2100:", isLeapYear(2100));
console.log("2000:", isLeapYear(2000));
```

Output:

```text
2024: true
2100: false
2000: true
```

**Extend it:** loop from 2020 to 2040 and print only the leap years.

---

## 🔁 Loops at Work (Projects 8–12)

### Project 8: Times Table Generator

**Main ideas:** `for` loop (Chapter 8), template literals.

```javascript
function printTable(num) {
    console.log(`=== Table of ${num} ===`);
    for (let i = 1; i <= 5; i++) {
        console.log(`${num} x ${i} = ${num * i}`);
    }
}

printTable(7);
```

Output:

```text
=== Table of 7 ===
7 x 1 = 7
7 x 2 = 14
7 x 3 = 21
7 x 4 = 28
7 x 5 = 35
```

**Extend it:** add a second parameter for how many rows to print.

---

### Project 9: Rocket Countdown

**Main ideas:** `while` loop, `count--` (Chapters 5 and 8).

```javascript
function countdown() {
    let count = 5;
    while (count > 0) {
        console.log(`T-minus ${count}...`);
        count--;
    }
    console.log("Lift-off! The science rocket is on its way.");
}

countdown();
```

Output:

```text
T-minus 5...
T-minus 4...
T-minus 3...
T-minus 2...
T-minus 1...
Lift-off! The science rocket is on its way.
```

**Extend it:** let the function take the starting number as a parameter.

---

### Project 10: Prime Number Finder

**Main ideas:** nested loops (Chapter 9), `%`.

A **prime** number has exactly two factors: 1 and itself. To test a number, we try dividing it by smaller numbers. We only need to try divisors whose square is not bigger than the number.

```javascript
function getPrimes(max) {
    let primes = [];
    for (let n = 2; n <= max; n++) {
        let isPrime = true;
        for (let d = 2; d * d <= n; d++) {
            if (n % d === 0) {
                isPrime = false;
            }
        }
        if (isPrime) {
            primes.push(n);
        }
    }
    return primes;
}

console.log("Primes up to 50:", getPrimes(50).join(", "));
```

Output:

```text
Primes up to 50: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47
```

**Extend it:** count how many primes there are below 100 (the answer is 25).

---

### Project 11: Even and Odd Sorter

**Main ideas:** arrays, `push` (Chapter 12), `%`.

```javascript
function sortEvenOdd(numbers) {
    let evens = [];
    let odds = [];
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] % 2 === 0) {
            evens.push(numbers[i]);
        } else {
            odds.push(numbers[i]);
        }
    }
    return { evens: evens, odds: odds };
}

let result = sortEvenOdd([12, 5, 8, 9, 21, 34, 40]);
console.log("Evens:", result.evens.join(", "));
console.log("Odds:", result.odds.join(", "));
```

Output:

```text
Evens: 12, 8, 34, 40
Odds: 5, 9, 21
```

**Extend it:** also return how many numbers were in each group.

---

### Project 12: Charity Book Drive Tally

**Main ideas:** two matching arrays, a running total, finding the largest value.

Four classes collect books for a community library. The goal is 150 books. The same index links a class to its count: `classes[2]` collected `books[2]`.

```javascript
const classes = ["6A", "6B", "7A", "7B"];
const books = [42, 35, 58, 27];
const goal = 150;

let total = 0;
let topIndex = 0;
for (let i = 0; i < books.length; i++) {
    total += books[i];
    if (books[i] > books[topIndex]) {
        topIndex = i;
    }
}

console.log(`Books collected: ${total} of ${goal}`);
console.log(`Most books: class ${classes[topIndex]} with ${books[topIndex]}`);
if (total >= goal) {
    console.log("Goal reached! Thank you, everyone.");
} else {
    console.log(`Still needed: ${goal - total} books`);
}
```

Output:

```text
Books collected: 162 of 150
Most books: class 7A with 58
Goal reached! Thank you, everyone.
```

**Extend it:** print a thank-you line for every class, for example `Thank you, 6A, for 42 books!`.

---

## 📚 Arrays, Strings and Objects (Projects 13–18)

### Project 13: School Supplies List

**Main ideas:** `push`, `includes` (Chapter 12), building a new array with a loop.

To remove an item, we copy every **other** item into a new list.

```javascript
let supplies = [];

function addItem(item) {
    if (supplies.includes(item)) {
        console.log(`${item} is already on the list.`);
    } else {
        supplies.push(item);
        console.log(`Added: ${item}`);
    }
}

function removeItem(item) {
    let kept = [];
    for (let i = 0; i < supplies.length; i++) {
        if (supplies[i] !== item) {
            kept.push(supplies[i]);
        }
    }
    supplies = kept;
    console.log(`Removed: ${item}`);
}

addItem("Notebook");
addItem("Ruler");
addItem("Notebook");
addItem("Glue stick");
removeItem("Ruler");
console.log("List:", supplies.join(", "));
```

Output:

```text
Added: Notebook
Added: Ruler
Notebook is already on the list.
Added: Glue stick
Removed: Ruler
List: Notebook, Glue stick
```

**Extend it:** make `removeItem` say "not on the list" when the item is missing.

---

### Project 14: Student Marks Tracker

**Main ideas:** an array of objects (Chapter 14), a sum, an average, the top score.

```javascript
const students = [
    { name: "Ali", score: 85 },
    { name: "Sara", score: 92 },
    { name: "Dev", score: 78 }
];

let total = 0;
let top = students[0];
for (let i = 0; i < students.length; i++) {
    total += students[i].score;
    if (students[i].score > top.score) {
        top = students[i];
    }
}

console.log(`Average: ${total / students.length}`);
console.log(`Top score: ${top.name} (${top.score})`);
```

Output:

```text
Average: 85
Top score: Sara (92)
```

**Extend it:** count how many students scored 80 or more.

---

### Project 15: Word and Letter Counter

**Main ideas:** `trim`, `split`, `length` (Chapter 13).

`trim()` removes spaces at both ends. `split(" ")` cuts the text at each space into an array of words.

```javascript
function analyzeText(text) {
    let clean = text.trim();
    let words = 0;
    if (clean.length > 0) {
        words = clean.split(" ").length;
    }
    console.log(`Words: ${words}, characters: ${clean.length}`);
}

analyzeText("  JavaScript is fun to learn  ");
analyzeText("");
```

Output:

```text
Words: 5, characters: 26
Words: 0, characters: 0
```

**Extend it:** count how many times the letter "a" appears. Hint: loop over the string with an index.

---

### Project 16: Password Strength Checker

**Main ideas:** looping over a string, conditions, counters.

Letters can be compared like words in a dictionary. So `ch >= "A" && ch <= "Z"` is true for any capital letter. Digits work the same way, from `"0"` to `"9"`.

```javascript
function checkStrength(pw) {
    let hasUpper = false;
    let hasDigit = false;
    for (let i = 0; i < pw.length; i++) {
        let ch = pw[i];
        if (ch >= "A" && ch <= "Z") {
            hasUpper = true;
        }
        if (ch >= "0" && ch <= "9") {
            hasDigit = true;
        }
    }

    let points = 0;
    if (pw.length >= 12) {
        points++;
    }
    if (hasUpper) {
        points++;
    }
    if (hasDigit) {
        points++;
    }

    if (points <= 1) {
        return "Weak";
    } else if (points === 2) {
        return "Medium";
    }
    return "Strong";
}

console.log("pass123:", checkStrength("pass123"));
console.log("Library2024:", checkStrength("Library2024"));
console.log("GreenTreesAndRivers7:", checkStrength("GreenTreesAndRivers7"));
```

Output:

```text
pass123: Weak
Library2024: Medium
GreenTreesAndRivers7: Strong
```

> 🔐 **Amānah (trust):** a password is a secret someone trusts you with. A real app never prints it, never stores it as plain text and never shares it. Here we only test made-up examples.

**Extend it:** add a point for a symbol such as `#` or `!`. Hint: a symbol is a character that is not a letter or a digit.

---

### Project 17: Console Quiz

**Main ideas:** an array of objects, a loop, a score counter.

The student's answers are stored in a second array, in the same order as the questions.

```javascript
const quiz = [
    { question: "Which planet is closest to the Sun?", answer: "Mercury" },
    { question: "What gas do plants take in?", answer: "carbon dioxide" },
    { question: "How many sides does a hexagon have?", answer: "6" }
];
const studentAnswers = ["Mercury", "Carbon Dioxide", "8"];

let score = 0;
for (let i = 0; i < quiz.length; i++) {
    let given = studentAnswers[i].toLowerCase();
    let correct = quiz[i].answer.toLowerCase();
    if (given === correct) {
        score++;
        console.log(`Q${i + 1}: correct`);
    } else {
        console.log(`Q${i + 1}: the answer is ${quiz[i].answer}`);
    }
}
console.log(`You got ${score} of ${quiz.length}.`);
```

Output:

```text
Q1: correct
Q2: correct
Q3: the answer is 6
You got 2 of 3.
```

`toLowerCase()` makes "Carbon Dioxide" match "carbon dioxide". **Extend it:** ask each question with `prompt()` in the browser.

---

### Project 18: Study Tip of the Day

**Main ideas:** `Math.random()`, `Math.floor`, array index.

`Math.floor(Math.random() * tips.length)` gives a whole number from 0 to `tips.length - 1`: a valid index.

```javascript
const tips = [
    "Study in short sessions with small breaks.",
    "Explain a topic to a friend to check you understand it.",
    "Sleep well before a test; your memory needs rest.",
    "Write down one question you still have after each lesson."
];

function tipOfTheDay() {
    let index = Math.floor(Math.random() * tips.length);
    return tips[index];
}

console.log("Today's tip: " + tipOfTheDay());
```

The tip changes from run to run. One run printed `Today's tip: Sleep well before a test; your memory needs rest.`

**Extend it:** add three tips of your own. The code still works, because it uses `tips.length`.

---

## 🧠 Thinking Projects (Projects 19–21)

### Project 19: Seconds to Hours, Minutes, Seconds

**Main ideas:** `Math.floor`, `%`, building text.

A science timer counts seconds. People prefer `hh:mm:ss`. One hour is 3600 seconds and one minute is 60 seconds.

```javascript
function twoDigits(n) {
    if (n < 10) {
        return "0" + n;
    }
    return "" + n;
}

function formatTime(totalSeconds) {
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
    return `${twoDigits(hours)}:${twoDigits(minutes)}:${twoDigits(seconds)}`;
}

console.log("3725 seconds =", formatTime(3725));
console.log("59 seconds =", formatTime(59));
console.log("7200 seconds =", formatTime(7200));
```

Output:

```text
3725 seconds = 01:02:05
59 seconds = 00:00:59
7200 seconds = 02:00:00
```

**Extend it:** write the reverse function: `toSeconds(1, 2, 5)` should return 3725.

---

### Project 20: Class Trip Cost Splitter

**Main ideas:** formulas, returning an object.

A class of 30 visits a planetarium. The bus costs 3600 rupees and each ticket costs 40 rupees. Everyone pays the same fair share, with no hidden extras.

```javascript
function splitTripCost(busCost, ticketPrice, students) {
    let tickets = ticketPrice * students;
    let total = busCost + tickets;
    return { tickets: tickets, total: total, each: total / students };
}

let trip = splitTripCost(3600, 40, 30);
console.log(`Tickets: ${trip.tickets} rupees`);
console.log(`Total: ${trip.total} rupees`);
console.log(`Each student pays: ${trip.each} rupees`);
```

Output:

```text
Tickets: 1200 rupees
Total: 4800 rupees
Each student pays: 160 rupees
```

**Extend it:** use `Math.floor` for shares that do not divide evenly, and print how much is left over.

---

### Project 21: Number Detective

**Main ideas:** `while` loop, a range that shrinks by half.

A friend thinks of a number from 1 to 100. The detective always asks about the **middle** of the numbers still possible. Each answer ("too low" or "too high") throws away half of them. This idea is called **binary search**.

```javascript
function findNumber(secret) {
    let low = 1;
    let high = 100;
    let step = 0;
    let found = false;
    while (found === false) {
        let guess = Math.floor((low + high) / 2);
        step++;
        if (guess === secret) {
            console.log(`Step ${step}: is it ${guess}? Yes, found it.`);
            found = true;
        } else if (guess < secret) {
            console.log(`Step ${step}: is it ${guess}? Too low. Search ${guess + 1} to ${high}.`);
            low = guess + 1;
        } else {
            console.log(`Step ${step}: is it ${guess}? Too high. Search ${low} to ${guess - 1}.`);
            high = guess - 1;
        }
    }
}

findNumber(73);
```

Output:

```text
Step 1: is it 50? Too low. Search 51 to 100.
Step 2: is it 75? Too high. Search 51 to 74.
Step 3: is it 62? Too low. Search 63 to 74.
Step 4: is it 68? Too low. Search 69 to 74.
Step 5: is it 71? Too low. Search 72 to 74.
Step 6: is it 73? Yes, found it.
```

Halving is powerful. For any number from 1 to 100, this detective needs at most 7 steps, because 2⁷ = 128 is more than 100.

**Extend it:** try `findNumber(1)` and `findNumber(100)`. Count the steps each one takes.

---

## ⚠️ Common Mistake

**Putting the running total inside the loop.** Many projects add numbers up (Projects 12 and 14). If the total is created inside the loop, it starts again at 0 every round.

```javascript
const books = [42, 35, 58, 27];
for (let i = 0; i < books.length; i++) {
    let total = 0;
    total += books[i];
    console.log("Total so far:", total);
}
```

Output:

```text
Total so far: 42
Total so far: 35
Total so far: 58
Total so far: 27
```

The "total" is just each number again. Create the total **once, before** the loop:

```javascript
const books = [42, 35, 58, 27];
let total = 0;
for (let i = 0; i < books.length; i++) {
    total += books[i];
    console.log("Total so far:", total);
}
```

Output:

```text
Total so far: 42
Total so far: 77
Total so far: 135
Total so far: 162
```

---

## ✍️ Try It

Pick **one** project above. Type its starter code into the browser console or the Web Studio, run it, and check that your output matches. Then do its **Extend it** task.

> 💡 **Hint:** change one line, run, and check. If the output is wrong, add a `console.log()` to see what is inside each variable (Chapter 19).

---

## 📝 Recap

- Every project uses only ideas from earlier chapters: variables, conditions, loops, functions, arrays, strings and objects.
- Start from working code, run it, then change one thing at a time.
- A running total or a "biggest so far" variable is created **before** the loop and updated **inside** it.
- `%` (remainder) helps with even and odd numbers, leap years and time formatting.
- Halving the range (Project 21) finds an answer very quickly.

---

## 🏆 Practice

### 🟢 Level 1: Recall
Name three projects in this chapter that use the remainder operator `%`, and say what `%` does in each.

<details>
<summary>Show answer</summary>

- **Project 7 (Leap Year):** `year % 4 === 0` checks that the year divides by 4 with nothing left over.
- **Project 11 (Even and Odd):** `numbers[i] % 2 === 0` means the number is even.
- **Project 19 (Time Formatter):** `totalSeconds % 60` gives the seconds left after the full minutes.

Project 10 (Primes) also uses `%` to test for a divisor.

</details>

### 🟡 Level 2: Apply
Extend Project 12. Print the classes that collected **40 books or more**.

<details>
<summary>Show answer</summary>

```javascript
const classes = ["6A", "6B", "7A", "7B"];
const books = [42, 35, 58, 27];

for (let i = 0; i < books.length; i++) {
    if (books[i] >= 40) {
        console.log(`Class ${classes[i]} collected ${books[i]} books.`);
    }
}
```

Output:

```text
Class 6A collected 42 books.
Class 7A collected 58 books.
```

</details>

### 🔴 Level 3: Challenge
Build a **Library Return Checker**. Library books may be kept for 14 days. There are no fines; the program only sends a friendly reminder.

1. Make an array of objects. Each object has a `title` and `daysKept`.
2. Write a function `checkReturn(book)` that returns a message.
3. If `daysKept` is 14 or less, the message says the book is on time.
4. Otherwise it says how many days late the book is and asks the reader to return it soon.
5. Loop over the array and print every message.

<details>
<summary>Show one possible answer</summary>

```javascript
const loans = [
    { title: "Stars and Planets", daysKept: 10 },
    { title: "Healthy Cooking", daysKept: 14 },
    { title: "Rivers of the World", daysKept: 17 }
];

function checkReturn(book) {
    if (book.daysKept <= 14) {
        return `${book.title}: on time. Thank you!`;
    }
    let late = book.daysKept - 14;
    return `${book.title}: ${late} days late. Please return it soon so others can read it.`;
}

for (let i = 0; i < loans.length; i++) {
    console.log(checkReturn(loans[i]));
}
```

Output:

```text
Stars and Planets: on time. Thank you!
Healthy Cooking: on time. Thank you!
Rivers of the World: 3 days late. Please return it soon so others can read it.
```

</details>
