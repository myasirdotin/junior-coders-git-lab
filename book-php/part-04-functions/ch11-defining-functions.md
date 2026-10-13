# Chapter 11: Defining Custom Functions 🧩

---

## 🌟 Real-Life Story

Think of a blender in a kitchen. Inside it are a motor, gears and blades, but you never rewire them to make a smoothie. You put in the fruit, press one button, and the blender runs its whole routine for you. A **function** is your own button in code. You pack some lines into a named block once, then "press" it by its name whenever you need that job done.

---

## 🎯 What You Will Learn

- Define a function with the `function` keyword and call it by its name.
- Explain the **DRY** principle: Don't Repeat Yourself.
- Tell the difference between **local** and **global** scope.
- Reach an outside variable with the `global` keyword, and know why to use it rarely.

---

## 👁️ Visual Concept Explanation

To **call** (or **invoke**) a function means to run it by writing its name followed by `()`.

### Anatomy of a Function Definition and Invocation

```text
function sayHello() {
   │        │     │
   │        │     └ () holds inputs
   │        │       (none here; Ch 12)
   │        └ the function's name
   └ keyword: "a new function"

  echo "Hello World!";   <- the body
}

sayHello();   <- the call: runs the body
```

### Local Scope vs Global Scope

**Scope** means *where a variable can be seen*. A variable made outside every function is **global**. A variable made inside a function is **local**: it lives only inside that function.

```text
+----------------------------------------+
| GLOBAL SCOPE                           |
| $schoolName = "Junior Coders Academy"; |
|                                        |
|  +----------------------------------+  |
|  | function showInfo() LOCAL SCOPE  |  |
|  |  echo $schoolName;  // not seen! |  |
|  |  global $schoolName; // bridge   |  |
|  |  echo $schoolName;  // now seen  |  |
|  +----------------------------------+  |
+----------------------------------------+
```

---

## 💻 Code Example: Function Declaration and Scope

```php
<?php
  // Global variables
  $academyName = "Junior Coders Academy";
  $studentCount = 450;

  // 1. A simple function
  function printDivider() {
    echo "<hr>";
  }

  // 2. A function with a local variable
  function showCampusWelcome() {
    $welcomeMessage = "Welcome to the Class 9 PHP Computer Lab!"; // local
    echo "<p>$welcomeMessage</p>";
  }

  // 3. Reaching global variables with the 'global' keyword
  function displayAcademyStats() {
    global $academyName, $studentCount; // bring them in
    echo "<h3>$academyName</h3>";
    echo "<p>Students enrolled: <strong>$studentCount</strong></p>";
  }

  // Calling our functions
  showCampusWelcome();
  printDivider();
  displayAcademyStats();
  printDivider();
```

Output (what the browser shows):

```text
Welcome to the Class 9 PHP Computer Lab!
────────────────────────────────
Junior Coders Academy

Students enrolled: 450
────────────────────────────────
```

---

## 🔍 Code Explanation: Breaking It Down Line by Line

- `function printDivider() { ... }`: Defines a function. The code inside does **not** run yet. It waits until it is called.
- `printDivider();`: Calls the function, so PHP runs its body. Calling it twice prints two dividers.
- `$welcomeMessage`: A local variable. It is created when `showCampusWelcome()` starts and disappears when the function ends.
- `global $academyName, $studentCount;`: Links these names inside the function to the global variables outside.

---

## 🌍 Real-World Connection: The DRY Principle in Tech

Professional teams follow **DRY**: *Don't Repeat Yourself*.
- Copy the same 10 lines into 5 files, and a bug now hides in 5 places.
- Put those lines in one function, such as `printSchoolFooter()`. When the footer changes, you update **one** place.

---

## 🔮 Predict the Output

```php
<?php
  $val = 10;
  function changeValue() {
    $val = 99;
  }
  changeValue();
  echo $val;
```

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> <code>10</code>. <code>$val = 99;</code> inside the function made a brand-new <strong>local</strong> variable. The global <code>$val</code> outside was not touched.
</details>

---

## 🕵️ Code Detective: The Broken Banner

```php
<?php
  function makeBanner() {
    $banner = "=== JUNIOR CODERS ===";
  }
  makeBanner();
  echo $banner;
```

Output:

```text
Warning: Undefined variable $banner in ... on line 6
```

- **Find the bug**: `$banner` is printed outside the function, where it does not exist.
- **Explain**: `$banner` was local. It disappeared when `makeBanner()` finished.
- **Fix**: Put `echo $banner;` inside the function. (Chapter 12 shows a better way: `return`.)

---

## ⚠️ Common Mistake

**Reading a global variable inside a function without `global`.**

- ❌ *Wrong*:
  ```php
  <?php
  $user = "Sara";
  function greet() {
    echo "Hi, $user";
  }
  greet();
  ```
- 😕 *What happens*: PHP shows `Warning: Undefined variable $user`, then prints `Hi, ` with no name.
- ✅ *Fixed*: Add `global $user;` as the first line inside `greet()`. It prints `Hi, Sara`. (In Chapter 12 you will pass the name in as a parameter, which is cleaner.)

**Two functions with the same name.** Function names are shared across the whole program. Defining `function alert() {}` twice stops the script with `Fatal error: Cannot redeclare alert()`.

---

## ✍️ Try It

Open the [PHP Console](../studios/php-console/) and make a reusable reminder:

```php
<?php
function showReminder() {
  echo "Remember: bring your library book on Friday.<br>";
}

showReminder();
showReminder();
```

Output (what the browser shows):

```text
Remember: bring your library book on Friday.
Remember: bring your library book on Friday.
```

*Hint*: Change the text once inside the function. Both lines change, because there is only one place to edit.

---

## 📝 Recap

- A function is a named block of code; define it once with `function name() { ... }`.
- The body runs only when you call it: `name();`.
- Functions keep code DRY: one place to write, one place to fix.
- Variables made inside a function are local and vanish when it ends.
- `global` lets a function reach an outside variable, but use it rarely.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which keyword starts a function definition?
2. What happens to a local variable when its function finishes?
3. Which keyword lets a function use a variable from the global scope?

<details>
<summary>Show answer</summary>

1. **`function`**.
2. It is **destroyed**; it no longer exists.
3. **`global`**.

</details>

### 🟡 Level 2: Apply
1. Why is copying the same code into many places risky?
2. Can a function call another function inside its body? Write a tiny example.

<details>
<summary>Show answer</summary>

1. If the code has a bug or needs a change, you must find and fix every copy. Missing one leaves the bug behind.
2. **Yes.**
```php
<?php
function line() {
  echo "-----<br>";
}
function title() {
  line();
  echo "Science Fair<br>";
  line();
}
title();
```

Output (what the browser shows):

```text
-----
Science Fair
-----
```

</details>

### 🔴 Level 3: Challenge
Build reusable page parts.

1. Write `renderPageHeader()` that prints a `<header>` with an `<h1>` title and a `<nav>` with 3 links.
2. Write `renderFooter()` that prints a `<footer>` with a copyright line.
3. Call them to build a small page: header, one paragraph, footer.
4. Think: why do many programmers avoid using `global` a lot? (Hint: the function secretly depends on outside variables, so it is harder to reuse and test.)

<details>
<summary>Show one possible answer</summary>

```php
<?php
function renderPageHeader() {
  echo "<header><h1>Green Valley School</h1>";
  echo "<nav><a href='index.php'>Home</a> | ";
  echo "<a href='library.php'>Library</a> | ";
  echo "<a href='contact.php'>Contact</a></nav></header>";
}

function renderFooter() {
  echo "<footer>&copy; 2026 Green Valley School</footer>";
}

renderPageHeader();
echo "<p>Welcome to our science week!</p>";
renderFooter();
```

What the browser shows:

```text
Green Valley School
Home | Library | Contact
Welcome to our science week!
© 2026 Green Valley School
```

**Why avoid `global`:** a function that uses `global` only works if the right outside variable exists with the right name. Moving it to another page can break it silently. Passing values in as parameters (Chapter 12) makes the function's needs clear.

</details>
