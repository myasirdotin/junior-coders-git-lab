# Chapter 6: Conditions 🚦

---

## 🌟 Real-Life Story

**The Rainy Day Rule**

Think about what you say every morning when looking out the window:
> *"IF it is raining outside, I will carry an umbrella. OTHERWISE, I will wear my sunglasses."*

Notice the decision logic:
- Condition: *Is it raining?*
- Path A (True): Take an umbrella.
- Path B (False): Wear sunglasses.

You never do both at the exact same moment! **In JavaScript, `if...else` statements give computers this exact ability to make intelligent choices!**

---

## 🎯 What You Will Learn

By the end of this chapter, you will be able to:
- Use `if` statements to execute code only when a condition is `true`.
- Use `else` statements to handle the "otherwise" fallback path.
- Chain multiple checks together in order using `else if`.
- Nest conditions inside other conditions for multi-step choices.
- Build a Weather Decision Advisor program.

---

## 💡 Concept Explanation

### The Anatomy of an `if...else` Statement

```javascript
if (condition) {
  // Runs ONLY if condition evaluates to true
} else {
  // Runs ONLY if condition evaluates to false
}
```

### Checking Multiple Conditions with `else if`
When you have more than two possibilities (like letter grades: A, B, C, or Fail), use `else if`:

```javascript
if (marks >= 90) {
  console.log("Grade: A+");
} else if (marks >= 75) {
  console.log("Grade: B");
} else if (marks >= 40) {
  console.log("Grade: C");
} else {
  console.log("Needs Improvement");
}
```
*How the computer reads it*: JavaScript tests each condition from top to bottom. As soon as it finds the **first** matching condition that is `true`, it runs that block and skips all the rest!

### Nested Conditions (Decisions Inside Decisions)
A **nested condition** is an `if` block placed inside another `if` block. It is used when a choice depends on two sequential steps:
```javascript
let hasPermissionSlip = true;
let age = 11;

if (hasPermissionSlip === true) {
  if (age >= 12) {
    console.log("Welcome to the robotics workshop!");
  } else {
    console.log("You have a permission slip, but the workshop is for ages 12 and up.");
  }
}
```

Output:

```text
You have a permission slip, but the workshop is for ages 12 and up.
```

---

## 🌍 Real-World Example: Traffic Light System

At a busy street intersection:
- `if (lightColor === "green")`: Drive forward!
- `else if (lightColor === "yellow")`: Slow down cautiously!
- `else if (lightColor === "red")`: Stop completely!
- `else`: Flashing yellow emergency mode.

---

## 💻 Code Example: The Age Classifier

Type this into your editor or scratchpad:

```javascript
let age = 13;

if (age >= 18) {
  console.log("You are an adult.");
} else if (age >= 13) {
  console.log("You are a teenager!");
} else {
  console.log("You are a child.");
}
```

Output:

```text
You are a teenager!
```

---

## 🔍 Line-by-Line Explanation

- Line 1: `let age = 13;` stores the number 13.
- Line 3: Checks `age >= 18`. Since 13 is not greater than or equal to 18, this evaluates to `false`. JavaScript skips down to line 5.
- Line 5: Checks `age >= 13`. Since 13 is greater than or equal to 13, this evaluates to `true`!
- Line 6: Runs `console.log("You are a teenager!");`.
- Because line 5 matched, JavaScript completely ignores line 7 (`else`) and finishes execution!

---

## 🔮 Predict the Output

Look at this code:

```javascript
let temperature = 30;
if (temperature > 35) {
  console.log("Very hot");
} else if (temperature > 25) {
  console.log("Warm");
} else {
  console.log("Cool");
}
```

**Question**: What will print in the console?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer: "Warm"!</strong> 
30 is not greater than 35 (so "Very hot" is skipped). But 30 IS greater than 25, so "Warm" prints, and the rest is skipped!
</details>

---

## 🧭 Think Like a Programmer: The Climbing Wall Gate

The climbing wall at the sports centre has a safety rule:
- A climber must be at least **120 cm tall**.
- A climber must be at least **8 years old**.
Plan the step-by-step logic to check height and age using nested conditions before coding!

---

## 🚀 Coding Challenge: The Sports Team Eligibility Checker

Write a program that checks if a student can join the Class 7 football team:
- Eligible age range: 11 to 14.
- Must have passed medical clearance (`hasMedicalCheck === true`).
- Print whether they can join or what they are missing!

---

## 🛠️ Mini Project: The Weather Decision Advisor

Build a weather advisor program:
- `isRaining = true;`
- `temperature = 16;`
- Use nested conditions:
  - If it is raining:
    - If cold (< 15°C): `"Wear a heavy raincoat and boots!"`
    - Else: `"Take an umbrella with you!"`
  - If not raining:
    - If hot (> 28°C): `"Wear sunglasses and a t-shirt!"`
    - Else: `"Perfect weather for a walk!"`

---

## ⚠️ Common Mistake

**The Missing Parentheses**

A student wrote this conditional statement. JavaScript refused to run it and showed `SyntaxError: Unexpected identifier 'marks'`:

```javascript
let marks = 55;
if marks >= 40 {
  console.log("Pass");
}
```

- **Find the mistake**: Look at the condition after `if`!
- **Explain the mistake**: In JavaScript, the condition being tested MUST always be wrapped inside **parentheses `(...)`**!
- **Fix the code**:
  ```javascript
  let marks = 55;
  if (marks >= 40) {
    console.log("Pass");
  }
  ```

---

## ✍️ Try It

Copy the Age Classifier from the Code Example above into your console:
1. Change `age` to `9` and re-run. What prints?
2. Change `age` to `21` and re-run. What prints?
3. Notice how the computer dynamically shifts paths based purely on the number inside `age`!

> 💡 **Hint:** Read the conditions from the top. `9` fails `age >= 18` and `age >= 13`, so the `else` runs. `21` passes the very first check.

---

## 📝 Recap

- Conditions evaluate to `true` or `false` to control program execution.
- `if` blocks run code when the condition is met.
- `else` blocks provide the default fallback when the condition is not met.
- `else if` chains multiple mutually-exclusive options in priority order.
- Conditions must always be enclosed in parentheses `(condition)`.

---

## 📖 Key Terms

| Term | What It Means |
| :--- | :--- |
| **Condition** | An expression that evaluates to a boolean value (`true` or `false`). |
| **`if` Statement** | A control flow statement that executes a block of code if its condition is true. |
| **`else` Statement** | The alternative code branch executed when preceding conditions are false. |
| **`else if`** | A secondary condition check evaluated if the previous condition was false. |
| **Nested Condition** | An `if` statement located inside another `if` or `else` statement block. |

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Fill in the blank: the keyword for "otherwise" in JavaScript is ______.
2. If several `else if` conditions are true, which block runs?
   (a) the `else` block (b) the last true one (c) the first true one (d) all of them

<details>
<summary>Show answer</summary>

1. `else`
2. **(c)** The first true one. JavaScript checks from top to bottom and stops at the first match.

</details>

### 🟡 Level 2: Apply
1. Write an `if...else` that checks `temperature > 30`. If true, print `"Stay hydrated!"`; otherwise print `"Pleasant weather!"`.
2. Arrange these lines into a working grading script: `console.log("Pass");` · `} else {` · `if (score >= 50) {` · `console.log("Retake Test");` · `}`

<details>
<summary>Show answer</summary>

1. ```javascript
   let temperature = 34;
   if (temperature > 30) {
     console.log("Stay hydrated!");
   } else {
     console.log("Pleasant weather!");
   }
   ```
   Output: `Stay hydrated!`
2. ```javascript
   let score = 62;
   if (score >= 50) {
     console.log("Pass");
   } else {
     console.log("Retake Test");
   }
   ```
   Output: `Pass`

</details>

### 🔴 Level 3: Challenge
Write a ticket price program for a science discovery centre and planetarium:
1. Under 5: free (Rs 0).
2. 5 to 12: child ticket (Rs 80).
3. 65 or older: senior ticket (Rs 100).
4. Everyone else: standard ticket (Rs 140).
5. Print the age and the price.

<details>
<summary>Show one possible answer</summary>

```javascript
let visitorAge = 9;
let ticketPrice;

if (visitorAge < 5) {
  ticketPrice = 0;
} else if (visitorAge <= 12) {
  ticketPrice = 80;
} else if (visitorAge >= 65) {
  ticketPrice = 100;
} else {
  ticketPrice = 140;
}

console.log("Age:", visitorAge, "| Ticket price: Rs", ticketPrice);
```

Output:

```text
Age: 9 | Ticket price: Rs 80
```

Try other ages: `3` gives Rs 0, `40` gives Rs 140 and `70` gives Rs 100.
Why must `visitorAge < 5` be checked before `visitorAge <= 12`? Because a 3-year-old is also "12 or under", and the first true check wins.

</details>

---

## ✅ Self-Assessment Checklist

- [ ] I can write a basic `if...else` block with correct syntax.
- [ ] I remember to put parentheses around my conditions.
- [ ] I know how to chain multiple checks using `else if`.
- [ ] I can write a nested decision tree.

---

## 🏡 Homework

Write a program that tests an exam mark (0 to 100) and prints:
- 90–100: `"Grade A - Outstanding!"`
- 75–89: `"Grade B - Very Good!"`
- 50–74: `"Grade C - Satisfactory"`
- Below 50: `"Needs Improvement"`

---

## 🍎 Teacher Discussion Questions

1. Ask students to share examples of classroom rules that act like nested conditions (e.g., *"If your assignment is submitted AND it is signed by a parent, you may join the club"*).
2. Discuss why condition order matters in `else if` chains (e.g. what happens if you check `marks >= 40` before checking `marks >= 90`?).
