# Chapter 4: Variables in PHP 📦🏷️

---

## 1. 🌟 Real-Life Situation: The Storage Cubby

Imagine the personal cubbies outside your computer lab:
- Each cubby has a **label** with a student's name on the front: `$student_bag`.
- Inside the cubby, you can place a backpack, a jacket, or a textbook.
- Later in the day, you can take out the jacket and put a lunchbox in its place.
- The cubby label stays the same, but the **content inside changes**!

In PHP, a **Variable** is a named storage container in computer memory:
- In PHP, every variable name starts with a **Dollar Sign (`$`)**.
- You can store numbers, words, or complex data inside it, and change it anytime as your program runs!

---

## 2. 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- Declare and initialize variables using the `$` symbol.
- Strictly adhere to official PHP naming rules and best practices.
- Differentiate between camelCase and snake_case naming conventions.
- Understand variable assignment by value and reassignment.
- Master variable interpolation inside double-quoted strings.

---

## 3. 👁️ Visual Concept Explanation

### Anatomy of a PHP Variable Declaration

```text
Dollar Sign    Variable Identifier    Assignment Operator      Stored Value      Semicolon
    ┌─┐           ┌───────────┐               ┌─┐                ┌─────┐            ┌─┐
    │$│           │studentScore│              │=│                │ 95  │            │;│
    └─┘           └───────────┘               └─┘                └─────┘            └─┘
     ▲                  ▲                      ▲                    ▲                ▲
 Mandatory      Starts with letter          Stores value        Numeric Int       Finishes
 Prefix         or underscore               into variable       Stored Data       Statement
```

### Official PHP Variable Naming Rules

| Rule | Legal Examples ✅ | Illegal Examples ❌ | Reason for Failure |
| :--- | :--- | :--- | :--- |
| **Must start with `$`** | `$age`, `$name` | `age`, `name` | Missing leading `$` prefix |
| **First char after `$` must be letter or `_`** | `$_total`, `$user1` | `$1stPlace` | Cannot begin with a number |
| **Only alphanumeric & underscores** | `$user_name`, `$gpaScore` | `$user-name`, `$user@email` | Hyphens and `@` are illegal |
| **No spaces allowed** | `$finalExamScore` | `$final exam score` | Spaces break the syntax parser |
| **Case-Sensitive!** | `$color` & `$Color` are 2 DIFFERENT variables! | | |

---

## 4. 💻 Code Example: Declaring, Updating, and Printing Variables

```php
<?php
  // 1. Declaring student record variables
  $firstName = "Hamza";
  $lastName = "Farooq";
  $gradeLevel = 9;
  $currentGpa = 3.84;
  $isEnrolled = true;

  // 2. Variable interpolation (Double Quotes)
  echo "Student: $firstName $lastName<br>";
  echo "Current Grade: $gradeLevel (GPA: $currentGpa)<br>";

  // 3. Updating / Reassigning variable values
  echo "<h3>Promoting Student...</h3>";
  $gradeLevel = $gradeLevel + 1; // Now 10
  $currentGpa = 3.95;            // Updated GPA

  echo "Promoted to Grade: $gradeLevel with new GPA: $currentGpa!<br>";

  // 4. String concatenation shorthand (.=)
  $message = "Welcome ";
  $message .= $firstName; // Appends Hamza
  $message .= " to Class 10!";
  echo "<p>$message</p>";
?>
```

---

## 5. 🔍 Code Explanation: Breaking It Down Line by Line

- `$firstName = "Hamza";`: Allocates space in server memory and binds the string `"Hamza"` to `$firstName`.
- `echo "... $firstName ...";`: When using **double quotes**, PHP automatically looks for `$` signs and replaces the variable with its stored value. This magic is called **string interpolation**.
- `$gradeLevel = $gradeLevel + 1;`: Reads the existing value (`9`), adds `1` to it, and saves the new result (`10`) back into `$gradeLevel`.
- `.=`: The concatenation assignment operator. It appends text to an existing string variable without overwriting what was already there!

---

## 6. 🌍 Real-World Connection: User Accounts

When you sign up on Instagram or Discord:
- The backend server creates variables like `$userId`, `$username`, `$email`, and `$accountCreationDate`.
- These variables hold your information temporarily in server RAM while computing your profile, before saving it permanently into a database!

---

## 7. ⚠️ Common Beginner Traps

1. **Forgetting the leading `$`**:
   ```php
   score = 100; // ❌ Fatal error: Uncaught Error: Undefined constant 'score'
   $score = 100; // ✅ Correct!
   ```
2. **Case-Sensitivity Confusion**:
   ```php
   $user = "Ali";
   echo $User; // ⚠️ Warning: Undefined variable $User!
   ```

---

## 8. 🔮 Predict the Output

```php
<?php
  $points = 50;
  $bonus = 20;
  $points = $points + $bonus;
  $bonus = 0;
  echo $points;
?>
```

**Question**: What is output: 50, 70, or 0?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> <code>70</code>! Line 3 adds 50 + 20 to set $points to 70. Setting $bonus to 0 afterward does not change $points because PHP assigns by value!
</details>

---

## 9. 🕵️ Code Detective: The Broken Naming

```php
<?php
  $1st_player = "Zayn";
  $player-score = 500;
  $player status = "Winner";
?>
```

- **Find the 3 errors**:
  1. `$1st_player` starts with a number.
  2. `$player-score` contains a hyphen (`-` is the subtraction operator!).
  3. `$player status` contains a space.
- **Fix**:
  ```php
  $player1 = "Zayn";
  $player_score = 500;
  $player_status = "Winner";
  ```

---

## 10. 🏆 5 Levels of Mastery Exercises

### 🟢 Level 1: Recall
1. What character must precede every PHP variable?
2. Are variable names in PHP case-sensitive or case-insensitive?
3. Which of the following is valid: `$my_variable`, `$my-variable`, or `$my variable`?

### 🟡 Level 2: Understand
4. Explain the difference between assigning by value and what happens when you modify a variable later.
5. Why does `echo '$name';` print `$name` literally, while `echo "$name";` prints the actual value?

### 🟠 Level 3: Apply
6. Create a script calculating the perimeter and area of a rectangle. Store width and height in variables, calculate both metrics, and print formatted results.

### 🔵 Level 4: Think & Troubleshoot
7. If you assign `$a = 10; $b = &$a;`, what does the `&` symbol do, and what happens to `$b` if you change `$a = 25`?

### 🟣 Level 5: Create & Build
8. Write a currency converter script `converter.php` with variables for `$usdAmount` and `$exchangeRate`. Calculate and print the equivalent in Euros, British Pounds, and Indian Rupees (INR) in an HTML table.

