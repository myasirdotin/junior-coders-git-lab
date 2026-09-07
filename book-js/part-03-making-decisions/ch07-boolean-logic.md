# Chapter 7: Boolean Logic ⚡🧩

---

## 1. 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- Combine multiple conditions using the **Logical AND (`&&`)** operator.
- Combine alternative conditions using the **Logical OR (`||`)** operator.
- Invert boolean values using the **Logical NOT (`!`)** operator.
- Understand truth tables and evaluate complex logic expressions.
- Build a Smart School Field Trip Eligibility Checker.

---

## 2. ☀️ Warm-Up Activity: The Weekend Playground Puzzle

Solve this real-life permission puzzle:
> *"You may go outside to ride your bike IF: It is NOT raining AND your math homework is completed."*

Under what exact scenario can you ride your bike?
- Scenario A: It is raining, homework is done ──> ❌ Stay inside!
- Scenario B: Not raining, homework is NOT done ──> ❌ Stay inside!
- Scenario C: Not raining AND homework is done ──> ✅ Yes! Ride your bike!

This is **Boolean Logic** in action!

---

## 3. 💡 Concept Explanation

### The 3 Logical Operators in JavaScript

| Operator | Name | Rule | Example |
| :--- | :--- | :--- | :--- |
| **`&&`** | **AND** | `true` **ONLY if BOTH** sides are true | `hasTicket && isOldEnough` |
| **`||`** | **OR** | `true` if **AT LEAST ONE** side is true | `isWeekend || isHoliday` |
| **`!`** | **NOT** | **Flips** `true` to `false`, and `false` to `true` | `!isRaining` |

### Truth Table Reference

```text
 1. LOGICAL AND (&&) - The Picky Operator
    true  && true   ──> true   (Only this one passes!)
    true  && false  ──> false
    false && true   ──> false
    false && false  ──> false

 2. LOGICAL OR (||) - The Generous Operator
    true  || true   ──> true
    true  || false  ──> true
    false || true   ──> true
    false || false  ──> false  (Only fails if BOTH are false!)

 3. LOGICAL NOT (!) - The Flipper
    !true   ──> false
    !false  ──> true
```

---

## 4. 🌍 Real-World Connection: Library & Discounts

- **School Library**: You can borrow a laptop if you are a student `&&` your library account has no fines.
- **Bus Pass**: You qualify for a discounted ticket if you are under 12 `||` you are a senior citizen over 65.
- **Door Alarm**: The alarm sounds if the door opens `&& !isAuthorizedUser`!

---

## 5. 💻 Code Example: Coding Club Admission

Type this into your editor or scratchpad:

```javascript
let studentAge = 12;
let hasParentPermission = true;
let isSuspended = false;

// Must be at least 11 AND have permission AND NOT be suspended!
if (studentAge >= 11 && hasParentPermission && !isSuspended) {
  console.log("Welcome to the Junior Coders Club! 🚀");
} else {
  console.log("Sorry, you are not eligible to join at this time.");
}
```

---

## 6. 🔍 Line-by-Line Explanation

- Line 6: Evaluates 3 boolean checks:
  1. `studentAge >= 11` (12 >= 11 is `true`).
  2. `hasParentPermission` is `true`.
  3. `!isSuspended` (NOT false is `true`!).
- Because all three sides evaluate to `true`, `true && true && true` is `true`!
- The welcome message executes seamlessly.

---

## 7. ✍️ Try It Yourself

Open your console:
1. Test: `console.log(true && false);` -> What prints?
2. Test: `console.log(true || false);` -> What prints?
3. Test: `console.log(!false);` -> What prints?
4. Test: `console.log((5 > 2) && (10 < 20));` -> What prints?

---

## 8. 📝 Practice Exercises (5 Levels of Mastery)

### 🟢 Level 1 – Remember (Recall)
1. Multiple Choice: What does `true && false` evaluate to?
   - (a) `true`
   - (b) `false`
   - (c) `undefined`
   - (d) `null`
2. Fill in the blank: The operator used for logical NOT is the symbol ______.

### 🔵 Level 2 – Understand (Comprehension)
3. Explain the difference between `&&` and `||` using your own everyday example.
4. Why is `!isRaining` easier to read than `isRaining === false`?

### 🟡 Level 3 – Apply (Application)
5. Write a boolean expression that evaluates to `true` if a number stored in `x` is between `1` and `100` inclusive.

### 🟣 Level 4 – Think (Analysis)
6. Evaluate this expression step-by-step:
   ```javascript
   (10 > 5 && 3 < 1) || (8 === 8)
   ```
   What does the entire line evaluate to, and why?

### 🔴 Level 5 – Create ⭐ (Challenge)
7. Write a "Secret Agent Security Scanner" program:
   - Agent enters `hasKeycard` (boolean) and `codeAttempt` (number).
   - Door unlocks if `hasKeycard === true` AND `codeAttempt === 007`, OR if `isEmergencyOverride === true`.

---

## 9. 🔮 Predict the Output

Look at this snippet:

```javascript
let sunny = true;
let weekend = false;
console.log(sunny && weekend);
console.log(sunny || weekend);
console.log(!weekend);
```

**Question**: What three boolean values will print in order?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong>
Line 1: <code>false</code> (Both must be true for &&)<br>
Line 2: <code>true</code> (At least one is true for ||)<br>
Line 3: <code>true</code> (!false flips to true)
</details>

---

## 10. 🕵️ Debug It: The Accidental Reset

A student wrote this check to see if today is a holiday:

```javascript
let isHoliday = true;
if (isHoliday = false) {
  console.log("School today!");
}
```

- **Find the mistake**: Look inside `if (isHoliday = false)`!
- **Explain the mistake**: A single equals sign resets `isHoliday` to `false`. That turns the condition into `if (false)`, so the message never prints!
- **Fix the code**: Use triple equals or the NOT operator:
  ```javascript
  if (isHoliday === false) { // OR: if (!isHoliday)
    console.log("School today!");
  }
  ```

---

## 11. 🧭 Think Like a Programmer: The Library Borrowing Rule

Write the boolean expression for this rule before writing any JavaScript:
> *"A student can borrow a book if the book is in stock (`isAvailable`) AND the student currently has fewer than 3 books checked out (`booksCheckedOut < 3`)."*

---

## 12. 🚀 Coding Challenge ⭐: The Movie Ticket Rating Check

Write a program that checks whether a user can purchase a ticket for a PG-13 film:
- Can enter if `age >= 13` OR `hasParentWithThem === true`.
- Print a clear message explaining why they were admitted or turned away.

---

## 13. 🛠️ Mini Project: Smart Eligibility Checker

Build a comprehensive school field trip eligibility checker:
- `isGrade7 = true;`
- `hasPaidFees = true;`
- `hasSignedForm = true;`
- `hasDisciplinaryWarning = false;`

Use `&&`, `||`, and `!` to verify that:
1. The student is in Grade 7.
2. The student has either paid fees OR received a scholarship waiver (`hasPaidFees || hasScholarship`).
3. Has signed permission.
4. Does NOT have a disciplinary warning (`!hasDisciplinaryWarning`).

Print a personalized congratulatory or remediation letter!

---

## 14. 📝 Chapter Recap

- Boolean logic evaluates complex conditions into single `true` or `false` outcomes.
- `&&` (AND) requires all conditions to be `true`.
- `||` (OR) requires at least one condition to be `true`.
- `!` (NOT) inverts the truth value of an expression.
- Group operations with parentheses `(...)` for clarity.

---

## 15. 📖 Key Terms

| Term | What It Means |
| :--- | :--- |
| **Boolean Logic** | A branch of algebra centered on three truth values and operators (AND, OR, NOT). |
| **Logical AND (`&&`)** | Operator returning true if and only if all operands are true. |
| **Logical OR (`||`)** | Operator returning true if at least one operand is true. |
| **Logical NOT (`!`)** | Unary operator that negates the boolean value of its operand. |
| **Short-Circuit Evaluation**| When JavaScript stops evaluating an expression as soon as the outcome is certain. |

---

## 16. ✅ Self-Assessment Checklist

- [ ] I can combine conditions using `&&`.
- [ ] I can combine alternative choices using `||`.
- [ ] I know how to flip a boolean using `!`.
- [ ] I can solve multi-part logic puzzles on paper.

---

## 17. 🏡 Homework

Write three real-life rules from your home or school as boolean logic statements:
1. *"I can play video games IF homework is done AND bedroom is clean."*
2. Write one rule using `||` (OR).
3. Write one rule using `!` (NOT).

---

## 18. 🍎 Teacher Discussion Questions

1. Introduce the concept of "Short-Circuit Evaluation" to advanced students: If the left side of an `&&` is `false`, why does JavaScript not bother checking the right side?
2. Connect Boolean logic to search engine tricks (e.g. typing `dinosaurs AND fossils` in Google Search).
