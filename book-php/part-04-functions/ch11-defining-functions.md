# Chapter 11: Defining Custom Functions 🧩🛠️

---

## 1. 🌟 Real-Life Situation: The Blender Button

Imagine your kitchen blender:
- Inside the blender base is a complex electrical motor, rotating gears, safety fuses, and sharpened steel blades.
- But when you want to make a fruit smoothie, you don't rewire the motor with pliers every morning!
- You simply put in strawberries, put on the lid, and press one button: **"SMOOTHIE"**.
- The blender runs its complex pre-programmed sequence and delivers a delicious drink.

In computer programming, a **Function** is your very own custom machine button:
- You pack 10 or 20 lines of logic into a named function.
- Whenever you need that task done anywhere in your application, you simply call its name!
- Write once, reuse forever!

---

## 2. 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- Define and invoke custom PHP functions using the `function` keyword.
- Understand the **DRY Principle** (Don't Repeat Yourself).
- Master variable scope: **Local Scope** vs **Global Scope**.
- Access outer variables safely using the `global` keyword.
- Organize your code into clean, modular, reusable building blocks.

---

## 3. 👁️ Visual Concept Explanation

### Anatomy of a Function Definition and Invocation

```text
 Function Keyword     Function Name     Parameter List       Function Body
      ┌──────┐          ┌────────┐           ┌──┐        ┌───────────────────────┐
      │function│          │sayHello│           │()│        │{ echo "Hello World!"; }│
      └──────┘          └────────┘           └──┘        └───────────────────────┘
         ▲                  ▲                  ▲                     ▲
     Declares a        Descriptive         Inputs             The code that executes
     new function      identifier         (if any)            when function is called
```

### Local Scope vs Global Scope

```text
+-------------------------------------------------------------+
|                      GLOBAL SCOPE                           |
|  $schoolName = "Junior Coders Academy";                     |
|                                                             |
|  function showInfo() {                                      |
|    // ❌ Cannot see $schoolName by default!                 |
|    // Variables inside functions live in LOCAL SCOPE!       |
|                                                             |
|    global $schoolName; // 🔑 Bridge to the outside world!   |
|    echo $schoolName;   // ✅ Now visible!                    |
|  }                                                          |
+-------------------------------------------------------------+
```

---

## 4. 💻 Code Example: Function Declaration and Scope

```php
<?php
  // Global variable
  $academyName = "Junior Coders Global";
  $studentCount = 450;

  // 1. Defining a simple function
  function printDivider() {
    echo "<hr style='border:0; border-top:2px dashed #7c3aed; margin:1rem 0;'>";
  }

  // 2. Defining a function with local variables
  function showCampusWelcome() {
    $welcomeMessage = "Welcome to the Class 9 PHP Computer Lab!"; // Local scope
    echo "<p style='color:#7c3aed; font-weight:700;'>$welcomeMessage</p>";
  }

  // 3. Accessing global variables with the 'global' keyword
  function displayAcademyStats() {
    global $academyName, $studentCount; // Import from global scope
    echo "<div class='stats-box'>";
    echo "<h3>$academyName</h3>";
    echo "<p>Total Enrolled Scholars: <strong>$studentCount</strong></p>";
    echo "</div>";
  }

  // Invoking our custom functions
  showCampusWelcome();
  printDivider();
  displayAcademyStats();
  printDivider();
?>
```

---

## 5. 🔍 Code Explanation: Breaking It Down Line by Line

- `function printDivider() { ... }`: Registers a new function in PHP memory. Code inside does NOT run yet—it waits patiently until called!
- `printDivider();`: Invokes the function, causing the server to execute its body.
- `$welcomeMessage`: A local variable. It is created when `showCampusWelcome()` starts, and is erased from RAM when the function finishes. It cannot be accessed outside!
- `global $academyName, $studentCount;`: Instructs PHP to link the local function scope to the outer global variables.

---

## 6. 🌍 Real-World Connection: The DRY Principle in Tech

At Google and Spotify, engineering teams enforce **DRY**: *Don't Repeat Yourself*.
- If you copy and paste the same 10 lines of code in 5 different files, you introduce 5 places where a future bug can hide.
- If you wrap those 10 lines into a function `calculateTax()`, and tax rates change next year, you only update **one single place**!

---

## 7. ⚠️ Common Beginner Traps

1. **Trying to read global variables without `global`**:
   ```php
   $user = "Sara";
   function greet() {
     echo "Hi, $user"; // ⚠️ Warning: Undefined variable $user!
   }
   ```
2. **Naming collisions**:
   Function names in PHP are global. You cannot define two functions with the exact same name:
   ```php
   function alert() {}
   function alert() {} // ❌ Fatal error: Cannot redeclare alert()
   ```

---

## 8. 🔮 Predict the Output

```php
<?php
  $val = 10;
  function changeValue() {
    $val = 99;
  }
  changeValue();
  echo $val;
?>
```

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> <code>10</code>! Because <code>$val = 99;</code> inside the function created a brand-new <strong>local</strong> variable. The outer global <code>$val</code> was completely untouched!
</details>

---

## 9. 🕵️ Code Detective: The Broken Banner

```php
<?php
  function makeBanner() {
    $banner = "=== JUNIOR CODERS ===";
  }
  makeBanner();
  echo $banner;
?>
```

- **Find the bug**: `$banner` is printed outside the function where it does not exist!
- **Explain**: `$banner` is trapped in local scope and was destroyed when `makeBanner()` finished.
- **Fix**: Either have the function `return $banner;` (learned in Ch 12) or echo it directly inside the function!

---

## 10. 🏆 5 Levels of Mastery Exercises

### 🟢 Level 1: Recall
1. What keyword is used to declare a function in PHP?
2. What happens to a local variable when a function finishes executing?
3. What keyword allows a function to access a variable defined in the global scope?

### 🟡 Level 2: Understand
4. Why is code duplication considered dangerous in software engineering?
5. Can a function call another function from inside its own body?

### 🟠 Level 3: Apply
6. Write a function `renderPageHeader()` that outputs an HTML `<header>` with an `<h1>` website title and a `<nav>` with 3 links. Call it twice.

### 🔵 Level 4: Think & Troubleshoot
7. Why is overusing the `global` keyword considered a bad programming practice? (Hint: It creates hidden dependencies and makes functions harder to test!).

### 🟣 Level 5: Create & Build
8. Create a reusable UI component library in PHP: define 3 functions `renderAlert($msg)`, `renderCard($title, $content)`, and `renderFooter()`. Use them to construct a full web page.
