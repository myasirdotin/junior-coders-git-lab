# Chapter 7: Boolean Logic

---

## 🌟 Real-Life Story

**The Weekend Playground Puzzle**

Solve this real-life permission puzzle:
> *"You may go outside to ride your bike IF: It is NOT raining AND your math homework is completed."*

Under what exact scenario can you ride your bike?
- Scenario A: It is raining, homework is done ──> ❌ Stay inside!
- Scenario B: Not raining, homework is NOT done ──> ❌ Stay inside!
- Scenario C: Not raining AND homework is done ──> ✅ Yes! Ride your bike!

This is **Boolean Logic** in action!

---

## 🎯 What You Will Learn

By the end of this chapter, you will be able to:
- Combine multiple conditions using the **Logical AND (`&&`)** operator.
- Combine alternative conditions using the **Logical OR (`||`)** operator.
- Invert boolean values using the **Logical NOT (`!`)** operator.
- Understand truth tables and evaluate complex logic expressions.
- Build a Smart School Field Trip Eligibility Checker.

---

## Concept Explanation

### The 3 Logical Operators in JavaScript

| Operator | Name | Rule | Example |
| :--- | :--- | :--- | :--- |
| **`&&`** | **AND** | `true` **ONLY if BOTH** sides are true | `hasTicket && isOldEnough` |
| **`||`** | **OR** | `true` if **AT LEAST ONE** side is true | `isWeekend || isHoliday` |
| **`!`** | **NOT** | **Flips** `true` to `false`, and `false` to `true` | `!isRaining` |

### Truth Table Reference

```text
AND (&&): true only if BOTH are true
  true  && true   ──> true   ✓ passes
  true  && false  ──> false
  false && true   ──> false
  false && false  ──> false

OR (||): true if AT LEAST ONE is true
  true  || true   ──> true
  true  || false  ──> true
  false || true   ──> true
  false || false  ──> false  ✗ both false

NOT (!): flips the value
  !true   ──> false
  !false  ──> true
```

---

## 🌍 Real-World Connection: Library & Discounts

- **School Library**: You can borrow a laptop if you are a student `&&` your library account has no fines.
- **Bus Pass**: You qualify for a discounted ticket if you are under 12 `||` you are a senior citizen over 65.
- **Door Alarm**: The alarm sounds if the door opens `&& !isAuthorizedUser`!

---

## Code Example: Coding Club Admission

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

Output:

```text
Welcome to the Junior Coders Club! 🚀
```

---

## Line-by-Line Explanation

- Line 6: Evaluates 3 boolean checks:
  1. `studentAge >= 11` (12 >= 11 is `true`).
  2. `hasParentPermission` is `true`.
  3. `!isSuspended` (NOT false is `true`!).
- Because all three sides evaluate to `true`, `true && true && true` is `true`!
- The welcome message executes seamlessly.

---

## 🔮 Predict the Output

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

## Think Like a Programmer: The Library Borrowing Rule

Write the boolean expression for this rule before writing any JavaScript:
> *"A student can borrow a book if the book is in stock (`isAvailable`) AND the student currently has fewer than 3 books checked out (`booksCheckedOut < 3`)."*

---

## Coding Challenge: Robotics Lab Access Safety Check

Write a program that checks whether a student can operate high-precision robotics lab equipment:
- Can operate if `age >= 14` OR `hasSafetySupervisorWithThem === true`.
- Print a clear message explaining why they were granted access or advised to wait for certified supervision.

---

## Mini Project: Smart Eligibility Checker

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

## ⚠️ Common Mistake

**The Accidental Reset**

A student wrote this check to see if today is a holiday:

```javascript
let isHoliday = true;
if (isHoliday = false) {
  console.log("School today!");
}
```

- **What happens**: Nothing prints at all, and no error appears. These silent bugs are the hardest to spot.
- **Find the mistake**: Look inside `if (isHoliday = false)`!
- **Explain the mistake**: A single equals sign resets `isHoliday` to `false`. That turns the condition into `if (false)`, so the message never prints!
- **Fix the code**: Use triple equals or the NOT operator:
  ```javascript
  if (isHoliday === false) { // OR: if (!isHoliday)
    console.log("School today!");
  }
  ```

---

## ✍️ Try It

Open your console:
1. Test: `console.log(true && false);` -> What prints?
2. Test: `console.log(true || false);` -> What prints?
3. Test: `console.log(!false);` -> What prints?
4. Test: `console.log((5 > 2) && (10 < 20));` -> What prints?

> 💡 **Hint:** Use the truth tables above. You should get `false`, `true`, `true` and `true`. For step 4, work out each bracket first.

---

## 📝 Recap

- Boolean logic evaluates complex conditions into single `true` or `false` outcomes.
- `&&` (AND) requires all conditions to be `true`.
- `||` (OR) requires at least one condition to be `true`.
- `!` (NOT) inverts the truth value of an expression.
- Group operations with parentheses `(...)` for clarity.

**Check yourself:**

- [ ] I can combine conditions using `&&`.
- [ ] I can combine alternative choices using `||`.
- [ ] I know how to flip a boolean using `!`.
- [ ] I can solve multi-part logic puzzles on paper.

---

## 📖 Key Terms

| Term | What It Means |
| :--- | :--- |
| **Boolean Logic** | Combining `true` / `false` values with the operators AND, OR and NOT. |
| **Logical AND (`&&`)** | Operator returning true if and only if all operands are true. |
| **Logical OR (`||`)** | Operator returning true if at least one operand is true. |
| **Logical NOT (`!`)** | Unary operator that negates the boolean value of its operand. |
| **Short-Circuit Evaluation**| When JavaScript stops evaluating an expression as soon as the outcome is certain. |

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. What does `true && false` give? (a) `true` (b) `false` (c) `undefined` (d) `null`
2. Fill in the blank: the symbol for logical NOT is ______.

<details>
<summary>Show answer</summary>

1. **(b)** `false`. AND needs both sides to be true.
2. `!`

</details>

### 🟡 Level 2: Apply
1. Write an expression that is `true` when the number in `x` is between 1 and 100 (including 1 and 100).
2. Work out this expression step by step: `(10 > 5 && 3 < 1) || (8 === 8)`

<details>
<summary>Show answer</summary>

1. `x >= 1 && x <= 100`. With `let x = 100;` it gives `true`.
2. `10 > 5` is `true`, `3 < 1` is `false`, so the first bracket is `false`.
   `8 === 8` is `true`. Then `false || true` is **`true`**.

</details>

### 🔴 Level 3: Challenge
Write a "Science Lab Door Scanner":
1. Create `hasKeycard` (boolean), `codeAttempt` (number) and `isEmergencyOverride` (boolean).
2. The door opens if the student has a keycard AND typed the correct code (4321).
3. The door also opens if `isEmergencyOverride` is true.
4. Otherwise, print a polite "access denied" message.

<details>
<summary>Show one possible answer</summary>

```javascript
let hasKeycard = true;
let codeAttempt = 4321;
let isEmergencyOverride = false;

const correctCode = 4321;

if ((hasKeycard && codeAttempt === correctCode) || isEmergencyOverride) {
  console.log("Door unlocked. Welcome to the science lab!");
} else {
  console.log("Access denied. Please ask your teacher for help.");
}
```

Output:

```text
Door unlocked. Welcome to the science lab!
```

Change `codeAttempt` to `1111` and the output becomes `Access denied. Please ask your teacher for help.`

</details>
