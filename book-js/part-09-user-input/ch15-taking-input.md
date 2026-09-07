# Part 9: User Input
# Chapter 15: Taking Input — Making Programs Interactive

---

## 1. Learning Objectives 🎯

By the end of this chapter, you will be able to:
- Prompt users for input in the browser using `prompt()`.
- Alert messages using `alert()` and confirm actions using `confirm()`.
- Understand that `prompt()` ALWAYS returns a string (or `null`).
- Convert text input to numbers using `Number()`, `parseInt()`, or `parseFloat()`.
- Validate user input against empty strings and `NaN` (Not-a-Number).
- Build interactive CLI and dialog workflows.

---

## 2. Warm-Up Activity 🚪

Imagine walking up to a bank ATM:
1. The ATM screen asks: "Please enter your 4-digit PIN."
2. You type your digits and press Enter.
3. The machine reads what you typed, checks if it's valid, and then unlocks your account.

Up until now, our JavaScript variables were hardcoded in our scripts. In this chapter, we open the door for **real human users** to type their own values into our programs!

---

## 3. Concept Explanation 💡

In browser JavaScript, we have three built-in dialog windows:

### 1. `alert(message)`
Displays a pop-up window with a message and an "OK" button:
```javascript
alert("Welcome to the Math Quest Game! 🎮");
```

### 2. `confirm(message)`
Asks a Yes/No question. Returns `true` if user clicks "OK", and `false` if they click "Cancel":
```javascript
let wantsToPlay = confirm("Are you ready to start?");
if (wantsToPlay) {
    console.log("Let's go!");
}
```

### 3. `prompt(message, defaultValue)`
Asks the user to type something into a text field. Returns their text as a **String**:
```javascript
let userName = prompt("What is your name?");
console.log(`Hello, ${userName}!`);
```

### The Critical Number Trap ⚠️:
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

### Validating Input with `isNaN()`:
If a user enters `"banana"` when you ask for age, `Number("banana")` produces `NaN` (Not-a-Number).
```javascript
let score = Number(prompt("Enter test score:"));
if (isNaN(score)) {
    alert("Hey, that was not a valid number!");
}
```

---

## 4. Real-World Example ✈️

Think about booking a flight or cinema ticket:
1. The site asks: "How many tickets would you like to purchase?"
2. The user types `"3"`.
3. If the user accidentally typed `"abc"`, the system immediately shows an alert: "Please enter a valid number of passengers."
4. If valid, the system converts `"3"` to `3` and calculates `3 * ticketPrice`.

---

## 5. Code Example 💻

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
            alert(`Great news ${nameInput}! You qualify for a 50% discount. Ticket price: $${ticketPrice}`);
        } else {
            alert(`Standard ticket price for ${nameInput}: $${ticketPrice}`);
        }
    }
}
```

---

## 6. Line-by-Line Explanation 🔍

- `let nameInput = prompt(...)`: Pops up a dialog box asking for the user's name.
- `if (!nameInput || nameInput.trim() === "")`: Checks if the user clicked "Cancel" (`null`) or typed only whitespace.
- `let age = Number(ageInput)`: Converts the text response into a real numerical float/integer.
- `if (isNaN(age) || age <= 0)`: Guard clause verifying that the input is a genuine number greater than 0.
- `let isStudent = confirm(...)`: Presents an OK/Cancel dialog returning boolean `true` or `false`.
- `alert(...)`: Displays the final result cleanly to the user.

---

## 7. Try It Yourself 🚀

1. Open your browser console on any web page.
2. Run:
   ```javascript
   let favColor = prompt("What is your favorite color?");
   alert(`Your favorite color is ${favColor}! That's a great choice.`);
   ```
3. Notice how execution pauses until you click "OK".

---

## 8. Practice Exercises 📝

### Level 1: Remember
What data type is *always* returned by the `prompt()` function?

### Level 2: Understand
What does the `confirm()` function return when the user clicks "Cancel"?

### Level 3: Apply
Write a script that prompts the user for two numbers, multiplies them, and alerts the product: `"The product of X and Y is Z"`.

### Level 4: Think
Why is checking `isNaN(value)` safer than just doing `if (value === NaN)`? (Hint: in JavaScript, `NaN === NaN` is false!).

### Level 5: Create ⭐
Build a "Tip Calculator":
- Prompt for total restaurant bill.
- Prompt for tip percentage (e.g., 10, 15, or 20).
- Prompt for how many people are splitting the bill.
- Calculate total with tip and per-person cost.
- Alert a clean final summary breakdown.

---

## 9. Predict the Output 🔮

```javascript
let num1 = "10";
let num2 = "20";

console.log(num1 + num2);
console.log(Number(num1) + Number(num2));
console.log(num1 * num2); // Sneaky JavaScript automatic type coercion!
```
*What are the three printed lines?*

---

## 10. Debug It 🐞

Find the errors in this code:
```javascript
let userScore = prompt "Enter your score";
let finalScore = userScore + 10;
alert "Your final score is " + finalScore;
```

---

## 11. Think Like a Programmer 🧠: Defensive Programming

Rule #1 of real-world software engineering:
> **"Never trust user input!"**

Users will:
- Leave fields blank.
- Type words when you asked for numbers.
- Click "Cancel".
- Enter negative ages or emojis.

Always validate and sanitize your input with checks (`isNaN()`, `trim()`, checking for `null`) before performing math or saving data!

---

## 12. Coding Challenge ⭐

Write a "Number Guessing Game":
- Generate a secret random number between 1 and 10: `Math.floor(Math.random() * 10) + 1`.
- Give the player 3 chances using a `while` or `for` loop with `prompt()`.
- Tell them if their guess was "Too High", "Too Low", or "Correct! 🎉".
- If they don't guess in 3 tries, reveal the secret number!

---

## 13. Mini Project: Interactive Story Generator (Mad Libs) 🎭

Create a funny story game:
- Prompt the user for:
  1. A friend's name
  2. An adjective (e.g., "sparkly", "smelly")
  3. An animal
  4. An action verb
  5. A food
- Assemble all responses into a hilarious adventure story and display it using `alert()`!

---

## 14. Chapter Recap 📌

- `alert()` shows a message.
- `confirm()` asks a True/False question.
- `prompt()` collects text input from the user.
- All prompt responses start as strings.
- Use `Number()` or `parseInt()` before doing math.
- Use `isNaN()` to check for invalid numerical entries.

---

## 15. Key Terms 📖

- **Dialog / Modal:** A pop-up window overlaying the browser.
- **Prompt:** A dialog asking for keyboard input.
- **Type Conversion / Casting:** Converting one data type to another.
- **NaN:** "Not-a-Number", produced when parsing invalid text as a number.
- **Input Sanitization:** Cleaning and verifying data before processing.

---

## 16. Self-Assessment Checklist ✅

- [ ] I know how to ask a user for their name using `prompt()`.
- [ ] I always convert numbers using `Number()` before addition.
- [ ] I can check for invalid numbers using `isNaN()`.
- [ ] I understand how `confirm()` returns a boolean.

---

## 17. Homework 📚

1. Write a program that asks for the user's birth year and calculates their approximate age.
2. Ask the user for their favorite pizza topping. If they enter `"pineapple"`, make a funny alert!
3. Build a simple currency converter (e.g., USD to PKR or INR).

---

## 18. Teacher Discussion Questions 💬

1. Why are browser alerts and prompts rarely used in modern consumer web apps like Facebook or Netflix, and what do developers use instead?
2. What happens if a malicious user types code into an input field? (Introduction to cybersecurity awareness).
