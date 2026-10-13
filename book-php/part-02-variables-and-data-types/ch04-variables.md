# Chapter 4: Variables in PHP

---

## 🌟 Real-Life Story

Outside the computer lab, each student has a cubby with a name label on the front. In the morning you put your jacket inside. At lunch you take the jacket out and put a book in its place. The label stays the same, but what is inside changes during the day. In PHP, a **variable** works like that cubby: a labelled box that holds a value you can change.

---

## 🎯 What You Will Learn

- Create variables with the `$` sign and give them a value.
- Follow PHP's rules for naming variables.
- Change a variable's value while the program runs.
- Print variables inside double-quoted strings.

---

## Visual Concept Explanation

To **declare** a variable means to create it. To **assign** means to put a value into it with `=`.

### Anatomy of a PHP Variable Declaration

```text
  $   studentScore   =    95    ;
  │        │         │     │    │
  │        │         │     │    └ ends the
  │        │         │     │      statement
  │        │         │     └ the value
  │        │         └ "store this"
  │        └ the name
  └ every variable starts with $
```

### Official PHP Variable Naming Rules

| Rule | Legal ✅ | Illegal ❌ | Why |
| :--- | :--- | :--- | :--- |
| **Must start with `$`** | `$age`, `$name` | `age`, `name` | Missing the `$` |
| **After `$`: a letter or `_`** | `$_total`, `$user1` | `$1stPlace` | Cannot begin with a number |
| **Only letters, numbers, `_`** | `$user_name`, `$gpaScore` | `$user-name`, `$user@email` | `-` and `@` are not allowed |
| **No spaces** | `$finalExamScore` | `$final exam score` | A space ends the name |
| **Case-sensitive** | `$color` and `$Color` are two different variables | | |

Two common naming styles: **camelCase** (`$firstName`, each new word starts with a capital) and **snake_case** (`$first_name`, words joined by `_`). Pick one style and use it everywhere.

---

## Code Example: Declaring, Updating, and Printing Variables

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

Output:

```text
Student: Hamza Farooq<br>Current Grade: 9 (GPA: 3.84)<br><h3>Promoting Student...</h3>Promoted to Grade: 10 with new GPA: 3.95!<br><p>Welcome Hamza to Class 10!</p>
```

---

## Code Explanation: Breaking It Down Line by Line

- `$firstName = "Hamza";`: Creates the variable `$firstName` and stores the text `"Hamza"` in it.
- `echo "... $firstName ...";`: Inside **double quotes**, PHP replaces each variable with its value. This is called **string interpolation**.
- `$gradeLevel = $gradeLevel + 1;`: Reads the old value (`9`), adds `1`, and stores the new value (`10`) back in the same box.
- `.=`: Adds more text to the end of a string variable without losing what was already there. Chapter 6 covers joining text in detail.

---

## 🌍 Real-World Connection: User Accounts

When you sign up on a school portal or an online library:
- The server uses variables like `$userId`, `$username` and `$email`.
- These hold your details in the server's memory while the page is built. To keep them for later, the server saves them in a database.

---

## 🔮 Predict the Output

```php
<?php
  $points = 50;
  $bonus = 20;
  $points = $points + $bonus;
  $bonus = 0;
  echo $points;
?>
```

**Question**: What is printed: 50, 70, or 0?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> <code>70</code>. Line 3 stores 50 + 20 = 70 in <code>$points</code>. Changing <code>$bonus</code> to 0 later does not change <code>$points</code>, because <code>$points</code> got a copy of the value, not a link to <code>$bonus</code>.
</details>

---

## 🕵️ Code Detective: The Broken Naming

```php
<?php
  $1st_volunteer = "Zayn";
  $volunteer-hours = 5;
  $volunteer status = "Active";
?>
```

- **Find the 3 errors**:
  1. `$1st_volunteer` starts with a number.
  2. `$volunteer-hours` contains a hyphen (`-` means "subtract").
  3. `$volunteer status` contains a space.
- **Fix**:
  ```php
  $volunteer1 = "Zayn";
  $volunteer_hours = 5;
  $volunteer_status = "Active";
  ```

---

## ⚠️ Common Mistake

**1. Forgetting the `$`.**

- ❌ *Wrong*: `score = 100;`
- 😕 *What happens*: PHP does not know `score` is a variable and stops:
  ```text
  Parse error: syntax error, unexpected token "=" in test.php on line 2
  ```
- ✅ *Fixed*: `$score = 100;`

**2. Changing the capital letters.**

- ❌ *Wrong*:
  ```php
  $user = "Ali";
  echo $User;
  ```
- 😕 *What happens*: `$User` is a different, empty variable. PHP prints nothing and warns:
  ```text
  Warning: Undefined variable $User in test.php on line 3
  ```
- ✅ *Fixed*: `echo $user;` prints `Ali`.

---

## ✍️ Try It

Open the [PHP Console](../studios/php-console/) and type:

```php
<?php
$bookTitle = "The Water Cycle";
$pages = 120;
echo "$bookTitle has $pages pages.<br>";
$pages = $pages + 8;
echo "After adding a glossary: $pages pages.";
```

Output:

```text
The Water Cycle has 120 pages.<br>After adding a glossary: 128 pages.
```

*Hint*: Change the title and add a third variable, `$author`. Print it in the first sentence.

---

## 📝 Recap

- A variable is a named box that holds a value. Its name always starts with `$`.
- `=` puts a value into a variable. You can change it later.
- Names use letters, numbers and `_`, and cannot start with a number.
- `$name` and `$Name` are different variables.
- Inside double quotes, PHP replaces variables with their values.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. What character starts every PHP variable name?
2. Are variable names case-sensitive?
3. Which name is valid: `$my_variable`, `$my-variable` or `$my variable`?

<details>
<summary>Show answer</summary>

1. The dollar sign `$`.
2. Yes. `$color` and `$Color` are different.
3. `$my_variable`.

</details>

### 🟡 Level 2: Apply
1. `$name = "Sara";` What do `echo 'Hi $name';` and `echo "Hi $name";` print?
2. Write two lines that store `8` in `$apples`, then add `4` to it.

<details>
<summary>Show answer</summary>

1. Single quotes print the text as it is: `Hi $name`. Double quotes swap in the value: `Hi Sara`.
2. 
   ```php
   $apples = 8;
   $apples = $apples + 4; // now 12
   ```

</details>

### 🔴 Level 3: Challenge
The school is painting a garden wall for a community clean-up day.

1. Store the wall's width (`8`) and height (`5`) in metres in two variables.
2. Work out the perimeter: 2 × (width + height).
3. Work out the area: width × height.
4. Print both with clear labels.
5. Extra: store `1000` rupees and a sample rate `0.012` dollars per rupee. Print how many dollars that is.

<details>
<summary>Show one possible answer</summary>

```php
<?php
$width = 8;
$height = 5;
$perimeter = 2 * ($width + $height);
$area = $width * $height;
echo "Perimeter: $perimeter m<br>";
echo "Area: $area square m";
```

Output:

```text
Perimeter: 26 m<br>Area: 40 square m
```

Extra:

```php
<?php
$rupees = 1000;
$rateToDollar = 0.012; // sample rate, not today's real rate
$dollars = $rupees * $rateToDollar;
echo "$rupees rupees is about $dollars dollars.";
```

Output:

```text
1000 rupees is about 12 dollars.
```

</details>
