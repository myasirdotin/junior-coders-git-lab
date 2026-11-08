# Chapter 15: Taking Input — Making Programs Interactive

---

## Teacher Lesson Plan

### Classroom Planning & Logistics
| Field | Detail | Field | Detail |
| :--- | :--- | :--- | :--- |
| **Grade / Class** | Grades 7–8 | **Period Duration** | 45 minutes |
| **Unit / Topic** | User Input & Interaction | **Setting** | Computer Lab & Projector |
| **Teacher Name** | ____________________ | **Date / Session** | ____ / ____ / 2026 |

### Learning Objectives (SWBAT)
By the end of this 45-minute lesson, students will be able to:
1. Prompt users for input in the browser using prompt().
2. Alert messages using alert() and confirm actions using confirm().
3. Understand that prompt() ALWAYS returns a string (or null).
4. Convert text input to numbers using Number(), parseInt(), or parseFloat().

### Required Materials & Setup
- Computer lab with web browsers installed (Chrome, Edge, or Firefox).
- Teacher projector displaying Browser Console and JavaScript Scratchpad for live modeling.
- Student notebooks for recording key syntax rules, vocabulary, and reflections.

### 45-Minute Instructional Delivery Plan
| Time | Phase | Teacher Activity | Student Activity |
| :--- | :--- | :--- | :--- |
| **0–8 min** | **Hook & Analogy** | Share the chapter opening analogy: *"Imagine using the self-checkout machine at your school library: 1. The screen asks: 'Please enter your 4-digit library card number.' 2. You type your digits and press Enter. 3. The machine reads wh..."* Connect to today's topic. | Discuss in pairs; volunteer real-life parallels and note the learning target. |
| **8–20 min** | **Direct Instruction** | Model core concepts on the screen. Break down syntax line-by-line; explain architectural structure. | Follow along on screens/notebooks; observe syntax rules and active demonstration. |
| **20–26 min** | **Misconceptions & Diagnostics** | Address Common Mistake: *"Find the errors in this code:"* Conduct rapid check for understanding. | Identify faulty patterns in sample snippets; explain correct approach verbally. |
| **26–38 min** | **Guided Lab Practice** | Circulate lab while students execute the hands-on task: *"Open your browser console on any web page."* | Code independently or in pairs using Browser Console and JavaScript Scratchpad; test variations. |
| **38–45 min** | **Plenary & Exit Ticket** | Review key takeaways. Pose exit question: *"What data type does prompt() give back when the user types something and clicks OK?"* Collect summary tickets. | Answer plenary questions; record homework task; submit exit ticket. |

### Differentiated Instruction
- **Support (Struggling Learners):** Provide starter boilerplate or pair with a peer navigator; focus on Level 1 recall and syntax verification.
- **Extension (Fast Finishers):** Assign Level 3 Challenge from the Practice section; encourage adding creative styling or feature extensions.

### Homework & Notebook Task
- Complete Level 2 Apply questions from the chapter Practice section into class notebooks.
- Write a 2-sentence personal explanation of the primary concept taught in this lesson.

### Ethical Stewardship & Digital Values (Amānah & Beneficial Knowledge)
- Emphasize digital trust (*Amānah*): respect school lab hardware, cite code honestly, and apply programming skills toward beneficial knowledge (*'Ilm Nāfi'*).

### Teacher Sign-off & Reflection
- **Teacher Signature:** ___________________________  **HOD / Coordinator Signature:** ___________________________
- **Lesson Reflection / Notes:** _______________________________________________________________________________

---

## Real-Life Story

Imagine using the self-checkout machine at your school library:
1. The screen asks: "Please enter your 4-digit library card number."
2. You type your digits and press Enter.
3. The machine reads what you typed, checks if it is valid, and then opens your library account.

Up until now, our JavaScript variables were hardcoded in our scripts. In this chapter, we open the door for **real human users** to type their own values into our programs!

---

## What You Will Learn

By the end of this chapter, you will be able to:
- Prompt users for input in the browser using `prompt()`.
- Alert messages using `alert()` and confirm actions using `confirm()`.
- Understand that `prompt()` ALWAYS returns a string (or `null`).
- Convert text input to numbers using `Number()`, `parseInt()`, or `parseFloat()`.
- Validate user input against empty strings and `NaN` (Not-a-Number).

---

## Concept Explanation

In browser JavaScript, we have three built-in dialog windows:

### `alert(message)`
Displays a pop-up window with a message and an "OK" button:
```javascript
alert("Welcome to the Science Quiz! 🔬");
```

### `confirm(message)`
Asks a Yes/No question. Returns `true` if user clicks "OK", and `false` if they click "Cancel":
```javascript
let wantsToStart = confirm("Are you ready to start?");
if (wantsToStart) {
    console.log("Let's go!");
}
```

### `prompt(message, defaultValue)`
Asks the user to type something into a text field. Returns their text as a **String**:
```javascript
let userName = prompt("What is your name?");
console.log(`Hello, ${userName}!`);
```

### The Critical Number Trap
Because `prompt()` **always** returns a string:
```javascript
let age = prompt("How old are you?"); // user enters 12
console.log(age + 5); // Prints "125", NOT 17! String concatenation!
```
To do math, you **must convert it to a Number**:
```javascript
let age = Number(prompt("How old are you?"));
console.log(age + 5); // Prints 17! Math addition!
```

### Validating Input with `isNaN()`
If a user enters `"banana"` when you ask for age, `Number("banana")` produces `NaN` (Not-a-Number).
```javascript
let score = Number(prompt("Enter test score:"));
if (isNaN(score)) {
    alert("Hey, that was not a valid number!");
}
```

---

## Real-World Example

Think about booking a high-speed train pass or science center ticket:
1. The site asks: "How many tickets would you like to purchase?"
2. The user types `"3"`.
3. If the user accidentally typed `"abc"`, the system immediately shows an alert: "Please enter a valid number of passengers."
4. If valid, the system converts `"3"` to `3` and calculates `3 * ticketPrice`.

---

## Code Example

```javascript
// Interactive Age & Discount Calculator
let nameInput = prompt("Enter your name:");

if (!nameInput || nameInput.trim() === "") {
    alert("Error: You did not enter a name!");
} else {
    let ageInput = prompt(`Hi ${nameInput.trim()}! How old are you?`);
    let age = Number(ageInput);

    if (isNaN(age) || age <= 0) {
        alert("Invalid age entered! Please enter a positive number.");
    } else {
        let ticketPrice = 100;
        let isStudent = confirm("Do you have a valid Student ID card?");

        if (isStudent || age < 18) {
            ticketPrice = ticketPrice * 0.5; // 50% discount
            alert(`Great news ${nameInput}! You qualify for a 50% discount. Ticket price: Rs ${ticketPrice}`);
        } else {
            alert(`Standard ticket price for ${nameInput}: Rs ${ticketPrice}`);
        }
    }
}
```

---

## Line-by-Line Explanation

- `let nameInput = prompt(...)`: Pops up a dialog box asking for the user's name.
- `if (!nameInput || nameInput.trim() === "")`: Checks if the user clicked "Cancel" (`null`) or typed only whitespace.
- `let age = Number(ageInput)`: Converts the text response into a real number (whole or decimal).
- `if (isNaN(age) || age <= 0)`: Guard clause verifying that the input is a genuine number greater than 0.
- `let isStudent = confirm(...)`: Presents an OK/Cancel dialog returning boolean `true` or `false`.
- `alert(...)`: Displays the final result cleanly to the user.

**Example run:** you type `Amina`, then `12`, then click OK. The last alert says:
`Great news Amina! You qualify for a 50% discount. Ticket price: Rs 50`.
If you type `Bilal`, `30` and click Cancel, it says `Standard ticket price for Bilal: Rs 100`.

---

## Predict the Output

```javascript
let num1 = "10";
let num2 = "20";

console.log(num1 + num2);
console.log(Number(num1) + Number(num2));
console.log(num1 * num2); // Sneaky JavaScript automatic type coercion!
```
*What are the three printed lines?*

<details>
<summary>Click to check your answer</summary>

```text
1020
30
200
```

`+` with two strings joins them. After `Number()`, `+` adds them. `*` has no "join" meaning, so JavaScript quietly turns both strings into numbers and multiplies (this is called **type coercion**).

</details>

---

## Think Like a Programmer: Defensive Programming

Rule #1 of real-world software engineering:
> **"Never trust user input!"**

Users will:
- Leave fields blank.
- Type words when you asked for numbers.
- Click "Cancel".
- Enter negative ages or emojis.

Always validate and sanitize your input with checks (`isNaN()`, `trim()`, checking for `null`) before performing math or saving data!

---

## Coding Challenge

Write a "Times-Table Practice Quiz":
- Pick a random number between 1 and 10: `Math.floor(Math.random() * 10) + 1`. (`Math.random()` gives a random decimal from 0 up to, but not including, 1.)
- Ask the student "What is 7 × [number]?" using `prompt()`.
- Give 3 chances using a `for` loop. Say "Too high", "Too low" or "Correct!".
- If all 3 tries are wrong, show the right answer and explain it kindly.

---

## Mini Project: Interactive Story Builder

Create a fill-in-the-words story:
- Prompt the user for:
  1. A friend's name
  2. An adjective (e.g., "sparkly", "brave")
  3. An animal
  4. An action verb
  5. A food
- Assemble all responses into a cheerful adventure story and display it using `alert()`!

---

## Common Mistake

Find the errors in this code:
```javascript
let userScore = prompt "Enter your score";
let finalScore = userScore + 10;
alert "Your final score is " + finalScore;
```

- **What happens**: JavaScript stops at once with `SyntaxError: Unexpected string`.
- **Error 1**: `prompt` and `alert` are functions. They need round brackets: `prompt("...")`, `alert("...")`.
- **Error 2**: `prompt()` always gives a string. If the user types `80`, then `"80" + 10` is `"8010"`, not `90`. Convert first with `Number()`.
- **Fix the code**:
  ```javascript
  let userScore = Number(prompt("Enter your score"));
  let finalScore = userScore + 10;
  alert("Your final score is " + finalScore);
  ```
  If the user types `80`, the alert says `Your final score is 90`.

---

## Try It

1. Open your browser console on any web page.
2. Run:
   ```javascript
   let favColor = prompt("What is your favorite color?");
   alert(`Your favorite color is ${favColor}! That's a great choice.`);
   ```
3. Notice how execution pauses until you click "OK".

> **Hint:** If you click **Cancel** on the prompt, `favColor` becomes `null`, and the alert shows "Your favorite color is null!". That is why we always check input before using it.

---

## Recap

- `alert()` shows a message.
- `confirm()` asks a True/False question.
- `prompt()` collects text input from the user.
- All prompt responses start as strings.
- Use `Number()` or `parseInt()` before doing math.
- Use `isNaN()` to check for invalid numerical entries.

**Check yourself:**

- [ ] I know how to ask a user for their name using `prompt()`.
- [ ] I always convert numbers using `Number()` before addition.
- [ ] I can check for invalid numbers using `isNaN()`.
- [ ] I understand how `confirm()` returns a boolean.

---

## Key Terms

- **Dialog / Modal:** A pop-up window overlaying the browser.
- **Prompt:** A dialog asking for keyboard input.
- **Type Conversion / Casting:** Converting one data type to another.
- **NaN:** "Not-a-Number", produced when parsing invalid text as a number.
- **Input Sanitization:** Cleaning and verifying data before processing.

---

## Practice

### Level 1: Recall
1. What data type does `prompt()` give back when the user types something and clicks OK?
2. What does `confirm()` give back when the user clicks "Cancel"?

<details>
<summary>Show answer</summary>

1. A **string**, even if they typed digits. (If they click Cancel, it gives `null`.)
2. `false`

</details>

### Level 2: Apply
Write a script that asks for two numbers, multiplies them, and shows `"The product of X and Y is Z"` in an alert.

Extra: why is `isNaN(value)` safer than `value === NaN`?

<details>
<summary>Show answer</summary>

```javascript
let a = Number(prompt("Enter the first number:"));
let b = Number(prompt("Enter the second number:"));
alert(`The product of ${a} and ${b} is ${a * b}`);
```

If you type `6` and `7`, the alert says `The product of 6 and 7 is 42`.

Extra: `NaN` is never equal to anything, not even itself. `NaN === NaN` is `false`, so `value === NaN` is always `false`. `isNaN()` is the reliable check.

</details>

### Level 3: Challenge
Build a "Bill Splitter with Tip" for a class lunch:
1. Ask for the total bill.
2. Ask for the tip percentage (10, 15 or 20).
3. Ask how many people are sharing.
4. Check that all three are real numbers, and that people is more than 0.
5. Show the tip, the total and the amount each person pays.

<details>
<summary>Show one possible answer</summary>

```javascript
let bill = Number(prompt("What is the total bill?"));
let tipPercent = Number(prompt("Tip percentage (10, 15 or 20)?"));
let people = Number(prompt("How many people are sharing?"));

if (isNaN(bill) || isNaN(tipPercent) || isNaN(people) || people <= 0) {
    alert("Please enter valid numbers only.");
} else {
    let tip = bill * (tipPercent / 100);
    let total = bill + tip;
    let perPerson = total / people;
    alert(`Bill: Rs ${bill}
Tip (${tipPercent}%): Rs ${tip}
Total: Rs ${total}
Each person pays: Rs ${perPerson}`);
}
```

With `1200`, `10` and `4`, the alert shows:

```text
Bill: Rs 1200
Tip (10%): Rs 120
Total: Rs 1320
Each person pays: Rs 330
```

</details>
