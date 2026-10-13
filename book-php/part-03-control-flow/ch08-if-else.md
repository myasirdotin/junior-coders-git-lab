# Chapter 8: If / Else Decisions 🚦

---

## 🌟 Real-Life Story

You walk up to the school library desk with a book. The librarian asks one question: "Do you have your library card?" **If** you do, she stamps the book and you take it home. **Else** she kindly sends you to the office to get a card first. Programs make choices in the same way, using `if` and `else`.

---

## 🎯 What You Will Learn

- Write decisions with `if`, `elseif` and `else`.
- Compare values with `==`, `===`, `!=`, `!==`, `<`, `>`, `<=` and `>=`.
- Explain the difference between loose (`==`) and strict (`===`) equality.
- Join conditions with `&&` (AND), `||` (OR) and `!` (NOT).
- Write a short if/else with the ternary operator `? :`.

---

## 👁️ Visual Concept Explanation

A **condition** is a question whose answer is `true` or `false`, such as `$score >= 50`. A value that is only true or false is called a **boolean**.

### Decision Flowchart

```text
          ┌──────────────────┐
          │   $score >= 50   │
          └────────┬─────────┘
           YES     │     NO
        ┌──────────┴──────────┐
        ▼                     ▼
 ┌──────────────┐     ┌──────────────┐
 │ echo "PASS"  │     │ echo "FAIL"  │
 └──────────────┘     └──────────────┘
```

### Comparison Operators

| Operator | Meaning | Example | Result |
| :--- | :--- | :--- | :--- |
| `==` | equal value | `5 == "5"` | `true` |
| `===` | equal value AND same type | `5 === "5"` | `false` |
| `!=` | not equal | `4 != 5` | `true` |
| `!==` | not identical | `5 !== "5"` | `true` |
| `<` `>` | less / greater than | `3 < 7` | `true` |
| `<=` `>=` | less / greater or equal | `50 >= 50` | `true` |

### Loose (`==`) vs. Strict (`===`) Equality: The Golden Lesson

```text
5 == "5"   --> true  (loose: PHP turns "5"
                      into the number 5)
5 === "5"  --> false (strict: an integer is
                      not the same type as
                      a string)
```

🛡️ **Professional rule:** prefer strict equality (`===`). It avoids surprise bugs.

### Logical Operators

| Operator | Name | True when… |
| :--- | :--- | :--- |
| `&&` | AND | **both** sides are true |
| `\|\|` | OR | **at least one** side is true |
| `!` | NOT | flips true to false, and false to true |

---

## 💻 Code Example: Exam Grading Engine

```php
<?php
  $studentName = "Khadija";
  $score = 87;
  $attendance = 92;

  echo "<h2>Academic Report for $studentName</h2>";

  // Multi-tier grading logic
  if ($score >= 90) {
    $grade = "A+ (Distinction)";
  } elseif ($score >= 80) {
    $grade = "A (Excellent)";
  } elseif ($score >= 70) {
    $grade = "B (Good)";
  } elseif ($score >= 50) {
    $grade = "C (Pass)";
  } else {
    $grade = "F (Needs extra help)";
  }

  echo "<p>Final Score: <strong>$score%</strong></p>";
  echo "<p>Letter Grade: <strong>$grade</strong></p>";

  // Logical operator AND
  if ($score >= 80 && $attendance >= 90) {
    echo "<p>Qualified for the Merit Certificate!</p>";
  }

  // Ternary operator: a short if/else
  // (condition) ? value_if_true : value_if_false;
  $status = ($score >= 50) ? "Passed" : "Retake";
  echo "<p>Official Status: <strong>$status</strong></p>";
```

Output (what the browser shows):

```text
Academic Report for Khadija

Final Score: 87%

Letter Grade: A (Excellent)

Qualified for the Merit Certificate!

Official Status: Passed
```

---

## 🔍 Code Explanation: Breaking It Down Line by Line

- `if ($score >= 90)`: Checks if `$score` is 90 or more. If true, PHP runs that block and **skips every other branch**.
- `elseif (...)`: Checked only when all the conditions above it were false. 87 fails `>= 90` but passes `>= 80`.
- `else`: The safety net. It runs when no condition above was true.
- `&&` (AND): Both `$score >= 80` and `$attendance >= 90` must be true for the certificate message.
- `($score >= 50) ? "Passed" : "Retake"`: The **ternary operator**. It is a one-line if/else that picks one of two values.

---

## 🌍 Real-World Connection: Student Access & Educational Portals

School portals and online academies make decisions on every click:

```php
<?php
  $isEnrolled = true;
  $role = "teacher";

  if (!$isEnrolled) {
    echo "Please enrol to see this course.<br>";
  }
  if ($role === "teacher") {
    echo "Showing the teacher dashboard.";
  }
```

Output (what the browser shows):

```text
Showing the teacher dashboard.
```

Conditions are the digital guards that protect private lessons and student records.

---

## 🔮 Predict the Output

```php
<?php
  $isMember = false;
  $hasVoucher = true;

  if ($isMember || $hasVoucher) {
    echo "Free entry to the book fair!";
  } else {
    echo "Please buy a ticket.";
  }
```

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> <code>Free entry to the book fair!</code> The OR (<code>||</code>) operator needs only one side to be true, and <code>$hasVoucher</code> is true.
</details>

---

## 🕵️ Code Detective: The Broken Age Gate

```php
<?php
  $age = 15;
  if ($age > 18) {
    echo "Adult";
  } else ($age < 18) {
    echo "Minor";
  }
```

Output:

```text
Parse error: syntax error, unexpected token "echo" in ... on line 6
```

- **Find the bug**: `else` cannot have a condition in brackets.
- **Explain**: `else` is a plain fallback with no question. If you need a question, use `elseif`.
- **Fix**: Change `else ($age < 18)` to `else` (or `elseif ($age < 18)`).

---

## ⚠️ Common Mistake

**Using one equals sign inside `if`.**

- ❌ *Wrong*:
  ```php
  <?php
  $role = "student";
  if ($role = "admin") {
    echo "Welcome, admin!";
  }
  ```
- 😕 *What happens*: `=` **stores** "admin" in `$role` instead of comparing. The condition becomes true, and the page prints `Welcome, admin!` for a student.
- ✅ *Fixed*: `if ($role === "admin") {` compares, and prints nothing for a student.

**Mixing up AND and OR.** `&&` needs **every** condition to be true. `||` needs **at least one**.

---

## ✍️ Try It

Open the [PHP Console](../studios/php-console/) and check if a student may borrow another library book:

```php
<?php
$hasCard = true;
$booksBorrowed = 3;

if ($hasCard && $booksBorrowed < 3) {
  echo "You may borrow another book.";
} elseif ($hasCard) {
  echo "Please return a book first (limit is 3).";
} else {
  echo "Please get a library card at the office.";
}
```

Output:

```text
Please return a book first (limit is 3).
```

*Hint*: Change `$booksBorrowed` to `1`, then `$hasCard` to `false`. Predict each message before you run it.

---

## 📝 Recap

- `if` runs code only when its condition is true; `elseif` adds more checks; `else` catches the rest.
- PHP checks branches from top to bottom and runs only the first true one.
- `===` checks value **and** type; prefer it to `==`.
- `&&` means both, `||` means at least one, `!` flips true and false.
- One `=` stores a value; `===` compares two values.
- The ternary `condition ? a : b` is a short if/else that picks a value.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which operator checks that two values are equal in both value and type?
2. What symbol is the logical AND operator?
3. What is the one-line `? :` form of if/else called?

<details>
<summary>Show answer</summary>

1. **`===`** (strict equality).
2. **`&&`**.
3. The **ternary operator**.

</details>

### 🟡 Level 2: Apply
1. Explain why `5 == "5"` is true but `5 === "5"` is false.
2. What does `!` do? What does `var_dump(!true);` print?

<details>
<summary>Show answer</summary>

1. `==` changes the string `"5"` into the number 5 before comparing, so the values match. `===` also compares types: an integer is not a string, so it is false.
2. `!` flips a boolean. `var_dump(!true);` prints `bool(false)`.

</details>

### 🔴 Level 3: Challenge
Build a planetarium ticket price checker.

1. Store `$age` and `$isCommunityDay` (true or false).
2. Under 12 pays Rs 80; 65 or older pays Rs 90; everyone else pays Rs 120.
3. On a community day, everyone gets Rs 20 off.
4. Print the final price.
5. Extra: also print `"Child"`, `"Senior"` or `"Adult"` using `if / elseif / else`.

<details>
<summary>Show one possible answer</summary>

```php
<?php
$age = 10;
$isCommunityDay = true;

if ($age < 12) {
  $price = 80;
  $group = "Child";
} elseif ($age >= 65) {
  $price = 90;
  $group = "Senior";
} else {
  $price = 120;
  $group = "Adult";
}

if ($isCommunityDay) {
  $price -= 20;
}

echo "$group ticket: Rs $price";
```

Output:

```text
Child ticket: Rs 60
```

</details>
