# Chapter 19: Debugging 🐞

---

## 🌟 Real-Life Story

Your bicycle makes a clicking sound on the way to school. You do not throw the bicycle away.
You stop, listen, and turn the wheel slowly to find where the click comes from.
You test one idea at a time: is it the chain, the pedal or the brake?
Finding and fixing a problem in code works the same way. Programmers call it **debugging**.

---

## 🎯 What You Will Learn

- Tell the three kinds of errors apart: syntax, runtime and logic.
- Read an error message to find what went wrong and on which line.
- Use `console.log()` and the rubber duck method to track down bugs.
- Recognise and fix the most common beginner bugs.

---

## ❤️ Why Bugs Happen (And Why That Is Normal)

A **bug** is a mistake in a program that makes it stop or give the wrong answer.

In 1947, the team working with computer pioneer **Grace Hopper** found a real moth trapped inside a relay of the Harvard Mark II computer. It was causing errors. They taped the moth into the logbook with the note: *"First actual case of bug being found."* Hopper loved telling this story, and it made the word "bug" famous.

Every programmer, whether they have been coding for 2 weeks or 20 years, meets bugs every single day.
**A bug is not a failure; it is simply a puzzle waiting for you to solve it!**

---

## 🚨 The Three Types of Programming Errors

To fix a bug quickly, you first need to know what kind of error it is.

### Syntax Errors (Grammar Mistakes)
**Syntax** means the grammar rules of a language. JavaScript cannot read your code because a rule was broken (missing closing bracket, misspelled keyword, missing quote).
- *Example:* `let greeting = "Hello World;` (unclosed quote)
- *What happens:* The code won't even start running!
- *Console says:* `SyntaxError: Invalid or unexpected token`

### Runtime Errors (Crashes While Running)
Your code's grammar is fine, but something impossible was attempted while it was running.
- *Example:* Reading a property of something that is `null` (empty on purpose).
  ```javascript
  let student = null;
  console.log(student.name);
  ```
- *What happens:* The program runs until that exact line, then stops.
- *Console says:* `TypeError: Cannot read properties of null (reading 'name')`

### Logic Errors (The Sneaky Ones!)
The code runs from start to finish with no red error messages, but it gives the **wrong answer**!
- *Example:*
  ```javascript
  function calculateAverage(a, b) {
      return a + b / 2; // Maths bug! Should be (a + b) / 2
  }

  console.log(calculateAverage(4, 6));
  ```
- *Output:* `7`. The average of 4 and 6 is 5.
- *Console says:* Nothing! JavaScript divides before it adds, so it worked out 4 + 3. You must spot the order-of-operations mistake yourself. With `(a + b) / 2` the output is `5`.

---

## 🔍 The Five-Step Debugging Method

Follow this checklist whenever your code doesn't work:

```text
1. Read the error message
        |
        v
2. Find the exact line
        |
        v
3. Print values with console.log()
        |
        v
4. Guess the cause, test a small fix
        |
        v
5. Check it works, remove extra logs
```

### Step 1: Read the Error Message
Don't panic and close the console! Red error messages are your friend. They tell you:
- **What went wrong:** `ReferenceError: score is not defined`
- **Where it happened:** `script.js:24` (line 24!)

### Step 2: Inspect Line 24 (and Line 23!)
Look right at the line reported in the console. If the line looks correct, look at the line **directly above it**. A missing bracket or quote on the previous line often causes an error on the next line!

### Step 3: Use `console.log()` Detective Work
Print your variables at every step of the journey:

```javascript
let marks = [40, 35, 45];
console.log("DEBUG: marks are ->", marks);
let total = marks[0] + marks[1] + marks[2];
console.log("DEBUG: total is ->", total);
```

Output:

```text
DEBUG: marks are -> [ 40, 35, 45 ]
DEBUG: total is -> 120
```

(The browser console shows the array as `(3) [40, 35, 45]`; it means the same thing.)

### 🦆 Step 4: The Rubber Duck Technique
Some programmers keep a rubber duck on their desks. When stuck:
1. Explain the problem out loud to the rubber duck (or a classmate).
2. Explain what every single line of code is supposed to do.
3. Very often, while explaining it out loud, your brain will suddenly say: *"Wait! I never updated the counter variable!"*

Then make **one** small change and run the code again.

### Step 5: Check It Works, Then Tidy Up
Run the program with a few different inputs and check every answer by hand.
When it is right, delete your `DEBUG` lines so the console stays clean.

---

## 🐛 Ten Common JavaScript Bugs for Beginners

| Bug | What it looks like | How to fix |
|---|---|---|
| Misspelled variable | `let score = 10; console.log(Score);` | JS is case-sensitive! Check capital letters. |
| Unclosed string | `let name = "Alex;` | Close the string with the same quote you opened it with. |
| Single `=` in a condition | `if (x = 5)` | Use `===` to compare. Single `=` stores a value. |
| Off-by-one array index | `list[list.length]` | The last item is `list[list.length - 1]`! |
| String + number mix-up | `"10" + 5` gives `"105"` | Use `Number("10") + 5`, which gives `15`. |
| Missing closing `}` | Unmatched braces in functions or loops | Indent neatly so each `{` lines up with its `}`. |
| Property of `null` | `document.getElementById("btn").textContent` gives a TypeError | Does the id match your HTML exactly? Is the script at the bottom of the page? |
| Infinite loop | `while (count < 10) {}` | Make sure `count++` is inside the loop! |
| Variable outside its function | Using a `let` from inside a function, outside it | Return the value from the function instead. |
| Forgetting `return` | The function gives `undefined` | End the function with `return` and the value. |

---

## ⚠️ Common Mistake

**Mixing up strings and numbers.** Anything typed into `prompt()` arrives as a string. Adding to a string joins text instead of adding numbers.

Wrong version:

```javascript
let bonus = "5"; // as if typed into prompt()
console.log(40 + bonus);
```

Output:

```text
405
```

Fixed version: turn the text into a number first.

```javascript
let bonus = "5";
console.log(40 + Number(bonus));
```

Output:

```text
45
```

**Reading one place past the end of an array** is the other classic slip. There is no error, just `undefined`:

```javascript
let books = ["Atlas", "Dictionary", "Poems"];
console.log(books[books.length]);     // undefined
console.log(books[books.length - 1]); // Poems
```

---

## ✍️ Try It

This charity tracker should print `Total raised: Rs 650`, but it prints `Total raised: Rs 450`. Find the bug.

```javascript
let donations = [200, 150, 300];
let total = 0;

for (let i = 1; i < donations.length; i++) {
    total = total + donations[i];
}

console.log("Total raised: Rs " + total);
```

**Hint:** add `console.log("i is", i);` as the first line inside the loop. Which index never appears? Which donation is missing from the total?

---

## 📝 Recap

- A bug is a puzzle, not a failure. Every programmer meets bugs every day.
- **Syntax errors** stop the code before it starts. **Runtime errors** stop it at one line. **Logic errors** give a wrong answer with no message.
- The error message tells you *what* went wrong and *which line*. Also check the line above.
- `console.log()` shows what is really inside your variables.
- Explaining your code out loud often reveals the bug. Change one thing at a time.

**Check yourself:**

- [ ] I open the console to read error messages and line numbers.
- [ ] I use `console.log()` to check values when an answer is wrong.
- [ ] I check the capital letters in every variable name.
- [ ] I explain my code out loud when a bug refuses to show itself.

---

## 🏆 Practice

These three broken programs come from the Hands-On Debugging Clinic. Find each bug before you open the answer.

### 🟢 Level 1: Recall
The Missing Total: this prints `Score is: undefined`. Which keyword is missing inside `addBonus`?

```javascript
function addBonus(score) {
    let final = score + 50;
}

let myFinalScore = addBonus(100);
console.log("Score is: " + myFinalScore); // Prints "Score is: undefined"
```

<details>
<summary>Show answer</summary>

`return`. Without it, the function gives back `undefined`. Add `return final;` as the last line inside the function. Then the output is `Score is: 150`.

</details>

### 🟡 Level 2: Apply
The Broken Club Check: the robotics club is for students aged 12 or over. Why does this always print "Welcome to the robotics club!", even though `studentAge` is 10? Fix it.

```javascript
let studentAge = 10;
if (studentAge = 12) {
    console.log("Welcome to the robotics club!");
} else {
    console.log("You can join when you are 12.");
}
```

<details>
<summary>Show answer</summary>

`studentAge = 12` **stores** 12 in `studentAge` instead of comparing, and 12 counts as true. Use a comparison:

```javascript
let studentAge = 10;
if (studentAge >= 12) {
    console.log("Welcome to the robotics club!");
} else {
    console.log("You can join when you are 12.");
}
```

Output: `You can join when you are 12.`

</details>

### 🔴 Level 3: Challenge
The Silent Loop: what happens when you run this? Fix it, then change the start value to 3 and write down the exact output.

```javascript
let countdown = 5;
while (countdown > 0) {
    console.log("Launch in: " + countdown);
    // Oops!
}
```

<details>
<summary>Show one possible answer</summary>

`countdown` never changes, so `countdown > 0` is always true. It is an infinite loop and the tab freezes. Add `countdown--;` inside the loop:

```javascript
let countdown = 3;
while (countdown > 0) {
    console.log("Launch in: " + countdown);
    countdown--;
}
```

Output:

```text
Launch in: 3
Launch in: 2
Launch in: 1
```

</details>
