# Chapter 5: Operators

---

## 🌟 Real-Life Story

**The Candy Jar Remainder**

Imagine you have **7 chocolates** and you want to share them equally with **2 friends**:
- Friend 1 gets 3 chocolates.
- Friend 2 gets 3 chocolates.
- How many chocolates are left over in the jar that cannot be split evenly?
- **Exactly 1 chocolate!**

In school math, you learned long division with remainders. 
In programming, we have a special symbol called the **Modulus Operator (`%`)** that calculates that leftover remainder in one millisecond! `7 % 2 = 1`!

---

## 🎯 What You Will Learn

By the end of this chapter, you will be able to:
- Use arithmetic operators: `+`, `-`, `*`, `/`, and the modulus operator `%` (remainder).
- Use shortcut assignment operators: `+=`, `-=`, `*=`, `/=`.
- Compare values using strict comparison operators: `===`, `!==`, `>`, `<`, `>=`, `<=`.
- Understand why strict equality (`===`) is preferred over loose equality (`==`).
- Build a multi-subject Report Card Calculator.

---

## Concept Explanation

### Arithmetic Operators (Math)
| Operator | Meaning | Example | Result |
| :--- | :--- | :--- | :--- |
| `+` | Addition | `5 + 3` | `8` |
| `-` | Subtraction | `10 - 4` | `6` |
| `*` | Multiplication (Asterisk) | `6 * 4` | `24` |
| `/` | Division (Forward slash) | `20 / 5` | `4` |
| `%` | Modulus (Remainder) | `14 % 4` | `2` (14 divided by 4 is 3 with 2 left over) |
| `**` | Exponent (Power) | `2 ** 3` | `8` (2 × 2 × 2) |

### Assignment Operators (Store & Update)
Instead of writing `score = score + 5;`, programmers use clean shortcuts:
- `x += 5;` (Same as `x = x + 5`)
- `x -= 2;` (Same as `x = x - 2`)
- `x *= 3;` (Same as `x = x * 3`)
- `x++;` (Increases `x` by 1 — called **increment**)
- `x--;` (Decreases `x` by 1 — called **decrement**)

### Comparison Operators (Giving `true` or `false`)
Comparison operators compare two values and always return a **boolean** (`true` or `false`):

| Operator | Meaning | Example | Result |
| :--- | :--- | :--- | :--- |
| `===` | Strict Equal to (Value AND Type match!) | `5 === 5` | `true` |
| `!==` | Strict Not Equal to | `5 !== 3` | `true` |
| `>` | Greater than | `10 > 4` | `true` |
| `<` | Less than | `2 < 8` | `true` |
| `>=` | Greater than or equal to | `5 >= 5` | `true` |
| `<=` | Less than or equal to | `4 <= 3` | `false` |

> ⚠️ **Common Mistake**: 
> A single equals sign (`=`) is used to **ASSIGN** a value (`let x = 5;`). 
> Three equals signs (`===`) are used to **COMPARE** two values (`x === 5`)!

---

## Real-World Example: Even and Odd Numbers

How does your computer know if a number is even or odd?
- Any even number divided by 2 has **0 remainder**!
- If `number % 2 === 0`, the number is **EVEN**!
- If `number % 2 !== 0`, the number is **ODD**!
This simple maths trick powers alternating row colours in tables and fair "take turns" class rotas!

---

## Code Example: Exam Marks Evaluator

Type this into your editor or scratchpad:

```javascript
let mathMarks = 85;
let scienceMarks = 92;
let passThreshold = 40;
let distinctionThreshold = 80;

// 1. Arithmetic
let totalMarks = mathMarks + scienceMarks;
let averageMarks = totalMarks / 2;

console.log("Total Marks:", totalMarks);
console.log("Average:", averageMarks);

// 2. Comparison
console.log("Passed Math?", mathMarks >= passThreshold);
console.log("Earned Distinction?", averageMarks >= distinctionThreshold);

// 3. Modulus
console.log("Is total marks an even number?", totalMarks % 2 === 0);

// 4. Assignment shortcuts
let bonusPoints = 5;
totalMarks += bonusPoints; // adds bonus
console.log("New Total with Bonus:", totalMarks);
```

Output:

```text
Total Marks: 177
Average: 88.5
Passed Math? true
Earned Distinction? true
Is total marks an even number? false
New Total with Bonus: 182
```

---

## Line-by-Line Explanation

- Line 7: `let totalMarks = mathMarks + scienceMarks;` calculates `85 + 92 = 177`.
- Line 8: `let averageMarks = totalMarks / 2;` divides `177 / 2 = 88.5`.
- Line 14: `mathMarks >= passThreshold` checks if `85 >= 40`. It returns boolean `true`!
- Line 22: `totalMarks += bonusPoints;` is shorthand for `totalMarks = totalMarks + 5;`, updating total marks to `182`.

---

## 🔮 Predict the Output

Look at this snippet:

```javascript
let a = 15;
let b = 4;
console.log(a % b);
console.log(a === 15);
```

**Question**: What two values will print in the console?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong>
Line 1 prints: <code>3</code> (15 divided by 4 is 3 with 3 left over)<br>
Line 2 prints: <code>true</code>
</details>

---

## Think Like a Programmer: Even or Odd Algorithm

Before writing code, plan how you would determine whether a user's roll number is even or odd:
1. Input: `rollNumber`.
2. Operation: `rollNumber % 2`.
3. Check: Does the remainder equal `0`?
4. Output: "Even" if true, "Odd" if false.

---

## Coding Challenge: The Sweet Shop Sharing Calculator

Write a program where:
- `totalSweets = 28;`
- `numberOfStudents = 5;`
- Calculate how many sweets each student receives evenly (`Math.floor(totalSweets / numberOfStudents)`). `Math.floor()` rounds a number **down** to a whole number, so `Math.floor(5.6)` gives `5`.
- Calculate how many sweets remain in the jar for the teacher using `%`.
- Print both results!

---

## Mini Project: The Report Card Calculator

Create a program that calculates a student's term report:
- `subject1 = 78`, `subject2 = 88`, `subject3 = 94`
- Calculate `totalMarks` and `averageMarks`.
- Check if `averageMarks >= 80` for "Honors Roll".
- Check if `totalMarks % 2 === 0`.
- Print a beautiful formatted summary card!

---

## ⚠️ Common Mistake

**The Accidental Assignment**

A student wrote this code to check a quiz score:

```javascript
let score = 100;
console.log("Is score 50?", score = 50);
console.log(score);
```

- **What happens**: The console prints `Is score 50? 50` and then `50`. The score was changed by mistake!
- **Find the mistake**: Look at `score = 50`!
- **Explain the mistake**: A single equals sign (`=`) is **assignment**, NOT comparison! It overwrote `score` with `50` instead of checking it.
- **Fix the code**: Use triple equals (`===`):
  ```javascript
  let score = 100;
  console.log("Is score 50?", score === 50);
  console.log(score);
  ```
  Now the output is `Is score 50? false` and then `100`.

---

## ✍️ Try It

Open your console:
1. Calculate `25 % 4` -> Press Enter. (Why is the answer `1`?)
2. Calculate `100 % 10` -> Press Enter. (Why is the answer `0`?)
3. Test strict equality: Type `5 === "5"` -> Press Enter. (Why is the answer `false`?)

> 💡 **Hint:** 25 ÷ 4 = 6 with 1 left over. 100 ÷ 10 has nothing left over. And `"5"` has quotes, so it is a string, not a number.

---

## 📝 Recap

- **Arithmetic operators** perform math: `+`, `-`, `*`, `/`, `%`, `**`.
- **Modulus (`%`)** gives the remainder (the amount left over) after dividing.
- **Assignment shortcuts** (`+=`, `-=`, `*=`, `++`) update variables concisely.
- **Comparison operators** (`===`, `!==`, `>`, `<`, `>=`, `<=`) evaluate to booleans.
- Always use **`===` (strict equality)** to compare both value and data type.

**Check yourself:**

- [ ] I can calculate remainders using `%`.
- [ ] I can update variables using `+=` and `-=`.
- [ ] I know the difference between `=` (assign) and `===` (compare).
- [ ] I can compare two numbers and predict if the result is `true` or `false`.

---

## 📖 Key Terms

| Term | What It Means |
| :--- | :--- |
| **Operator** | A special symbol that performs operations on operands (values). |
| **Modulus (`%`)** | An arithmetic operator yielding the remainder of division. |
| **Assignment Operator** | An operator that assigns a value to its left operand based on the right operand. |
| **Comparison Operator** | An operator comparing operands and returning a boolean result. |
| **Strict Equality (`===`)** | Equality check confirming both value and data type are identical. |

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. What does `10 % 3` give? (a) `3` (b) `1` (c) `0` (d) `3.33`
2. Which comparison operator checks that two values are "not equal"?

<details>
<summary>Show answer</summary>

1. **(b)** `1`. 10 ÷ 3 = 3 with 1 left over.
2. `!==` (strict not equal).

</details>

### 🟡 Level 2: Apply
1. Write one line that checks whether a variable `userAge` is at least 13.
2. After `let total = 10; total -= 4; total *= 2;` what is in `total`?
3. Why is `5 == "5"` true, but `5 === "5"` false?

<details>
<summary>Show answer</summary>

1. `console.log(userAge >= 13);`
2. `12`. First 10 − 4 = 6, then 6 × 2 = 12.
3. `==` changes the string `"5"` into a number before comparing, so it only checks the value. `===` also checks the data type, and a number is not a string. That is why we always use `===`.

</details>

### 🔴 Level 3: Challenge
Write a program that:
1. Stores three numbers in variables.
2. Calculates their sum and their average.
3. Prints whether the sum is greater than 100.

Extra: how could `%` tell you whether a year can be divided by 4 (one rule for leap years)?

<details>
<summary>Show one possible answer</summary>

```javascript
const num1 = 45;
const num2 = 38;
const num3 = 28;

const sum = num1 + num2 + num3;
const average = sum / 3;

console.log("Sum:", sum);
console.log("Average:", average);
console.log("Is the sum more than 100?", sum > 100);
```

Output:

```text
Sum: 111
Average: 37
Is the sum more than 100? true
```

Extra: `year % 4 === 0` is `true` when the year divides by 4 with nothing left over. For example, `2028 % 4 === 0` is `true`.

</details>
