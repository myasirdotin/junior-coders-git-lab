# Chapter 5: Operators ➕➖➗

---

## 1. 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- Use arithmetic operators: `+`, `-`, `*`, `/`, and the modulus operator `%` (remainder).
- Use shortcut assignment operators: `+=`, `-=`, `*=`, `/=`.
- Compare values using strict comparison operators: `===`, `!==`, `>`, `<`, `>=`, `<=`.
- Understand why strict equality (`===`) is preferred over loose equality (`==`).
- Build a multi-subject Report Card Calculator.

---

## 2. ☀️ Warm-Up Activity: The Candy Jar Remainder

Imagine you have **7 chocolates** and you want to share them equally with **2 friends**:
- Friend 1 gets 3 chocolates.
- Friend 2 gets 3 chocolates.
- How many chocolates are left over in the jar that cannot be split evenly?
- **Exactly 1 chocolate!**

In school math, you learned long division with remainders. 
In programming, we have a magical symbol called the **Modulus Operator (`%`)** that calculates that leftover remainder in one millisecond! `7 % 2 = 1`!

---

## 3. 💡 Concept Explanation

### 1. Arithmetic Operators (Math)
| Operator | Meaning | Example | Result |
| :--- | :--- | :--- | :--- |
| `+` | Addition | `5 + 3` | `8` |
| `-` | Subtraction | `10 - 4` | `6` |
| `*` | Multiplication (Asterisk) | `6 * 4` | `24` |
| `/` | Division (Forward slash) | `20 / 5` | `4` |
| `%` | Modulus (Remainder) | `14 % 4` | `2` (14 divided by 4 is 3 with 2 left over) |
| `**` | Exponent (Power) | `2 ** 3` | `8` (2 × 2 × 2) |

### 2. Assignment Operators (Store & Update)
Instead of writing `score = score + 5;`, programmers use clean shortcuts:
- `x += 5;` (Same as `x = x + 5`)
- `x -= 2;` (Same as `x = x - 2`)
- `x *= 3;` (Same as `x = x * 3`)
- `x++;` (Increases `x` by 1 — called **increment**)
- `x--;` (Decreases `x` by 1 — called **decrement**)

### 3. Comparison Operators (Giving `true` or `false`)
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

## 4. 🌍 Real-World Example: Even and Odd Numbers

How does your computer know if a number is even or odd?
- Any even number divided by 2 has **0 remainder**!
- If `number % 2 === 0`, the number is **EVEN**!
- If `number % 2 !== 0`, the number is **ODD**!
This simple math trick powers alternating row colors in tables and turn-based games!

---

## 5. 💻 Code Example: Exam Marks Evaluator

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

---

## 6. 🔍 Line-by-Line Explanation

- Line 8: `let totalMarks = mathMarks + scienceMarks;` calculates `85 + 92 = 177`.
- Line 9: `let averageMarks = totalMarks / 2;` divides `177 / 2 = 88.5`.
- Line 15: `mathMarks >= passThreshold` checks if `85 >= 40`. It returns boolean `true`!
- Line 22: `totalMarks += bonusPoints;` is shorthand for `totalMarks = totalMarks + 5;`, updating total marks to `182`.

---

## 7. ✍️ Try It Yourself

Open your console:
1. Calculate `25 % 4` -> Press Enter. (Why is the answer `1`?)
2. Calculate `100 % 10` -> Press Enter. (Why is the answer `0`?)
3. Test strict equality: Type `5 === "5"` -> Press Enter. (Why is the answer `false`?)

---

## 8. 📝 Practice Exercises (5 Levels of Mastery)

### 🟢 Level 1 – Remember (Recall)
1. Multiple Choice: What does `10 % 3` evaluate to?
   - (a) `3`
   - (b) `1`
   - (c) `0`
   - (d) `3.33`
2. What comparison operator checks if two values are "not equal"?

### 🔵 Level 2 – Understand (Comprehension)
3. Explain why `5 == "5"` evaluates to `true`, but `5 === "5"` evaluates to `false`. (Hint: consider data types).
4. What does the operator `+=` accomplish?

### 🟡 Level 3 – Apply (Application)
5. Write a line of code that checks whether a variable `userAge` is at least 13 years old.
6. If `let total = 10; total -= 4; total *= 2;`, what is the final value of `total`?

### 🟣 Level 4 – Think (Analysis)
7. How can you use the modulus operator `%` to determine if a given year is a leap year (or divisible by 4)?

### 🔴 Level 5 – Create ⭐ (Challenge)
8. Write a program that takes three numbers, calculates their sum, average, and checks if the sum is greater than 100.

---

## 9. 🔮 Predict the Output

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

## 10. 🕵️ Debug It: The Accidental Assignment

A student wrote this code to check if a player won:

```javascript
let score = 100;
if (score = 50) {
  console.log("Score is 50!");
}
console.log(score);
```

- **Find the mistake**: Look inside `if (score = 50)`!
- **Explain the mistake**: A single equals sign (`=`) is **assignment**, NOT comparison! It overwrote `score` to `50` instead of checking it!
- **Fix the code**: Use triple equals (`===`):
  ```javascript
  if (score === 50) {
    console.log("Score is 50!");
  }
  ```

---

## 11. 🧭 Think Like a Programmer: Even or Odd Algorithm

Before writing code, plan how you would determine whether a user's roll number is even or odd:
1. Input: `rollNumber`.
2. Operation: `rollNumber % 2`.
3. Check: Does the remainder equal `0`?
4. Output: "Even" if true, "Odd" if false.

---

## 12. 🚀 Coding Challenge ⭐: The Sweet Shop Sharing Calculator

Write a program where:
- `totalSweets = 28;`
- `numberOfStudents = 5;`
- Calculate how many sweets each student receives evenly (`Math.floor(totalSweets / numberOfStudents)`).
- Calculate how many sweets remain in the jar for the teacher using `%`.
- Print both results!

---

## 13. 🛠️ Mini Project: The Report Card Calculator

Create a program that calculates a student's term report:
- `subject1 = 78`, `subject2 = 88`, `subject3 = 94`
- Calculate `totalMarks` and `averageMarks`.
- Check if `averageMarks >= 80` for "Honors Roll".
- Check if `totalMarks % 2 === 0`.
- Print a beautiful formatted summary card!

---

## 14. 📝 Chapter Recap

- **Arithmetic operators** perform math: `+`, `-`, `*`, `/`, `%`, `**`.
- **Modulus (`%`)** returns the remainder of integer division.
- **Assignment shortcuts** (`+=`, `-=`, `*=`, `++`) update variables concisely.
- **Comparison operators** (`===`, `!==`, `>`, `<`, `>=`, `<=`) evaluate to booleans.
- Always use **`===` (strict equality)** to compare both value and data type.

---

## 15. 📖 Key Terms

| Term | What It Means |
| :--- | :--- |
| **Operator** | A special symbol that performs operations on operands (values). |
| **Modulus (`%`)** | An arithmetic operator yielding the remainder of division. |
| **Assignment Operator** | An operator that assigns a value to its left operand based on the right operand. |
| **Comparison Operator** | An operator comparing operands and returning a boolean result. |
| **Strict Equality (`===`)** | Equality check confirming both value and data type are identical. |

---

## 16. ✅ Self-Assessment Checklist

- [ ] I can calculate remainders using `%`.
- [ ] I can update variables using `+=` and `-=`.
- [ ] I know the difference between `=` (assign) and `===` (compare).
- [ ] I can compare two numbers and predict if the result is `true` or `false`.

---

## 17. 🏡 Homework

Write a program that defines two numbers `x = 18` and `y = 5`. Print the output of applying all five arithmetic operators (`+`, `-`, `*`, `/`, `%`) between `x` and `y`.

---

## 18. 🍎 Teacher Discussion Questions

1. Why did JavaScript creators include both `==` (loose) and `===` (strict)? Discuss how automatic type coercion (e.g. converting `"5"` to `5` behind your back) caused bugs in early web development.
2. Ask students how game developers might use the modulus operator `%` to reset a timer or cycle through 4 compass directions (North, East, South, West).
