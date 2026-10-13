*Part 12 · Debugging*
# The Junior Developer's Debugging Playbook 🐞

---

## 🎯 What You Will Learn

- Tell the three kinds of errors apart: syntax, runtime and logic.
- Read an error message to find what went wrong and on which line.
- Use `console.log()` and the rubber duck method to track down bugs.
- Recognise and fix the most common beginner bugs.

---

## ❤️ Why Bugs Happen (And Why That's Completely Normal!)

In 1947, the team working with computer pioneer **Grace Hopper** found a real moth trapped inside a relay of the Harvard Mark II computer. It was causing errors. They taped the moth into the logbook with the note: *"First actual case of bug being found."* Hopper loved telling this story, and it made the word "bug" famous.

Every programmer—whether they have been coding for 2 weeks or 20 years—encounters bugs every single day.
**A bug is not a failure; it is simply a puzzle waiting for you to solve it!**

---

## 🚨 The 3 Types of Programming Errors

To fix a bug quickly, you first need to know what kind of error it is:

### Syntax Errors (Grammar Mistakes)
JavaScript cannot read or parse your code because rules were broken (missing closing bracket, misspelled keyword, missing quote).
- *Example:* `let greeting = "Hello World;` (unclosed quote)
- *What happens:* Code won't even start running!
- *Console says:* `SyntaxError: Invalid or unexpected token`

### Runtime Errors (Crashes While Running)
Your code grammar is valid, but an illegal operation was attempted while running.
- *Example:* Calling a function on something that is `null` or `undefined`.
  ```javascript
  let user = null;
  console.log(user.name);
  ```
- *What happens:* The program runs until that exact line, then halts.
- *Console says:* `TypeError: Cannot read properties of null (reading 'name')`

### Logic Errors (The Sneaky Ones!)
The code runs smoothly from start to finish with zero red error messages, but it produces the **wrong answer**!
- *Example:*
  ```javascript
  function calculateAverage(a, b) {
      return a + b / 2; // Math bug! Should be (a + b) / 2
  }
  ```
- *Console says:* Nothing! JavaScript thinks everything is fine. You must spot the math order of operations issue.

---

## 🔍 The 5-Step Debugging Method

Follow this systematic checklist whenever your code doesn't work:

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
Don't panic and close the console! Red error messages are your friend: they tell you:
- **What went wrong:** `ReferenceError: score is not defined`
- **Where it happened:** `script.js:24` (Line 24!)

### Step 2: Inspect Line 24 (and Line 23!)
Look right at the line reported in the console. If the line looks correct, look at the line **directly above it**—a missing bracket or semicolon on the previous line often triggers an error on the next line!

### Step 3: Use `console.log()` Detective Work
Print your variables at every step of the journey:
```javascript
console.log("DEBUG: input was ->", userInput);
let result = computeScore(userInput);
console.log("DEBUG: output is ->", result);
```

### 🦆 Step 4: The Rubber Duck Technique
Software engineers keep a yellow rubber duck on their desks. When stuck:
1. Explain the problem out loud to the rubber duck (or a classmate).
2. Explain what every single line of code is supposed to do.
3. Very often, while explaining it out loud, your brain will suddenly say: *"Wait! I never updated the counter variable!"*

---

## 🐛 Top 10 Most Common JavaScript Bugs for Beginners

| Bug | What it looks like | How to fix |
|---|---|---|
| 1. Misspelled Variable | `let score = 10; console.log(Score);` | JS is case-sensitive! Check capitalization. |
| 2. Unclosed Strings | `let name = "Alex;` | Match your double, single, or backtick quotes. |
| 3. Single `=` in Conditions | `if (x = 5)` | Use `===` for comparisons! Single `=` assigns values. |
| 4. Off-By-One Array Index | `array[array.length]` | Last item is `array.length - 1`! |
| 5. String + Number Confusion | `"10" + 5 = "105"` | Use `Number("10") + 5 = 15`. |
| 6. Missing Closing `}` | Unmatched braces in functions or loops | Indent properly to align opening & closing braces. |
| 7. Accessing Property on Null | `document.getElementById("btn").click` | Did the ID match your HTML exactly? Is the script loaded at the bottom? |
| 8. Infinite Loop | `while (count < 10) {}` | Make sure `count++` is inside the loop! |
| 9. Variable Scope Error | Accessing function-local `let` outside | Return the value or declare in parent scope. |
| 10. Forgetting `return` | Function outputs `undefined` | Make sure your function explicitly calls `return`. |

---

## 📝 Recap

- A bug is a puzzle, not a failure. Every programmer meets bugs every day.
- **Syntax errors** stop the code before it starts. **Runtime errors** stop it at one line. **Logic errors** give a wrong answer with no message.
- The error message tells you *what* went wrong and *which line*. Also check the line above.
- `console.log()` shows what is really inside your variables.
- Explaining your code out loud often reveals the bug.

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
The Broken Age Gate: why does it always print "You may enter!", even though `userAge` is 14? Fix it so only people aged 18 or over may enter.

```javascript
let userAge = 14;
if (userAge = 18) {
    console.log("You may enter!");
} else {
    console.log("Too young!");
}
```

<details>
<summary>Show answer</summary>

`userAge = 18` **assigns** 18 instead of comparing, and 18 counts as true. Use a comparison:

```javascript
let userAge = 14;
if (userAge >= 18) {
    console.log("You may enter!");
} else {
    console.log("Too young!");
}
```

Output: `Too young!`

</details>

### 🔴 Level 3: Challenge
The Silent Loop: what happens when you run this? Fix it, then change the start value to 3 and write down the exact output.

```javascript
let countdown = 5;
while (countdown > 0) {
    console.log("T-minus: " + countdown);
    // Oops!
}
```

<details>
<summary>Show one possible answer</summary>

`countdown` never changes, so `countdown > 0` is always true. It is an infinite loop and the tab freezes. Add `countdown--;` inside the loop:

```javascript
let countdown = 3;
while (countdown > 0) {
    console.log("T-minus: " + countdown);
    countdown--;
}
```

Output:

```text
T-minus: 3
T-minus: 2
T-minus: 1
```

</details>

---

## ✅ Summary Checklist

- [ ] I always open DevTools Console to read error messages and line numbers.
- [ ] I use `console.log()` to check variable states when math goes wrong.
- [ ] I verify casing on all variable names.
- [ ] I explain my code out loud when a bug refuses to show itself.
