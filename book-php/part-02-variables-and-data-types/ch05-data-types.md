# Chapter 5: Data Types & Inspection 🔍📊

---

## 1. 🌟 Real-Life Situation: Sorting the Recycling Bins

Imagine your school cafeteria with distinct recycling bins:
- One blue bin strictly for **Paper**
- One green bin strictly for **Plastic Bottles**
- One gray bin strictly for **Aluminum Cans**
- One brown compost bin for **Food Scraps**

You cannot throw an apple core into the paper bin—they are completely different materials that require different handling!

In computer programming, every piece of data has a specific **Data Type**:
- Text is treated differently than whole numbers.
- A decimal price is treated differently than a Yes/No toggle.
- PHP automatically determines the data type, but mastering data types is the key to preventing subtle bugs!

---

## 2. 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- Identify and work with the **8 standard PHP data types**.
- Distinguish between scalar, compound, and special types.
- Inspect variables in depth using `var_dump()` and `gettype()`.
- Understand PHP's **type juggling** (automatic type conversion).
- Explicitly cast variables using type casting `(int)`, `(string)`, `(bool)`.

---

## 3. 👁️ Visual Concept Explanation

### The 8 Core PHP Data Types

```text
┌─────────────────────────────────────────────────────────────┐
│                    PHP DATA TYPE FAMILIES                   │
├──────────────────────────────┬──────────────────────────────┤
│ 1. SCALAR TYPES (Single)     │ 2. COMPOUND TYPES (Multi)    │
│ • String: "Class 9", 'PHP'   │ • Array: ["HTML", "PHP"]     │
│ • Integer: 42, -15, 2026     │ • Object: new Student()      │
│ • Float (Double): 3.14, 99.9 │                              │
│ • Boolean: true, false       │                              │
├──────────────────────────────┴──────────────────────────────┤
│ 3. SPECIAL TYPES                                            │
│ • NULL: Variable with no assigned value                     │
│ • Resource: Database link, open file pointer                │
└─────────────────────────────────────────────────────────────┘
```

### The 8 Types Quick Reference

| Data Type | Description | Real-World Example | PHP Syntax |
| :--- | :--- | :--- | :--- |
| **String** | Text characters enclosed in quotes | Student name, address | `$_name = "Sara";` |
| **Integer** | Whole number without decimal points | Age, exam marks, year | `$score = 98;` |
| **Float** | Numbers with fractional/decimal parts | Price, GPA, temperature | `$gpa = 3.92;` |
| **Boolean** | Only two states: `true` or `false` | Logged in, passed exam | `$hasPassed = true;` |
| **Array** | Stores multiple values in one variable | List of subjects | `$subs = ["Math", "CS"];` |
| **Object** | Instance of a user-defined class | Modern OOP blueprint | `$car = new Vehicle();` |
| **NULL** | Represents a variable with no value | Cleared search query | `$search = null;` |
| **Resource** | Special handle to external resource | MySQL DB link, open file | `$f = fopen("log.txt", "r");` |

---

## 4. 💻 Code Example: Inspecting Types with `var_dump()`

```php
<?php
  // Declaring various data types
  $bookTitle = "PHP for Class 9"; // String
  $chapterCount = 26;              // Integer
  $price = 29.99;                  // Float
  $isPublished = true;             // Boolean
  $tags = ["coding", "backend"];   // Array
  $discount = null;                // NULL

  echo "<h2>Variable Inspection Report</h2>";
  echo "<pre>";
  var_dump($bookTitle);
  var_dump($chapterCount);
  var_dump($price);
  var_dump($isPublished);
  var_dump($tags);
  var_dump($discount);
  echo "</pre>";

  // Type Juggling vs Type Casting
  echo "<h3>Type Juggling & Casting</h3>";
  $strNum = "150";
  $calc = $strNum + 50; // Juggles "150" into int 150 -> 200
  echo "Juggled Addition: $calc (Type: " . gettype($calc) . ")<br>";

  // Explicit casting
  $rawGpa = 3.99;
  $truncatedGpa = (int) $rawGpa; // Casts float to int -> 3
  echo "Explicitly Cast GPA to Int: $truncatedGpa";
?>
```

---

## 5. 🔍 Code Explanation: Breaking It Down Line by Line

- `var_dump($variable);`: The ultimate developer diagnostic tool! It prints the **data type**, the **size**, and the **exact value** of any variable.
- `<pre> ... </pre>`: Wraps `var_dump()` in preformatted text tags so arrays and objects display in clean, indented human-readable blocks.
- `$calc = $strNum + 50;`: Because the plus sign (`+`) is strictly an arithmetic operator in PHP, PHP automatically converts the string `"150"` into an integer `150` so it can compute `200`. This automatic conversion is called **type juggling**.
- `(int) $rawGpa`: Explicitly forces PHP to convert a value into an integer, lopping off the decimal fractions.

---

## 6. 🌍 Real-World Connection: Form Inputs Are Always Strings!

Whenever a user submits an HTML form (e.g., typing their age `15` into `<input type="number">`):
- PHP receives it over HTTP as a **String** (`"15"`), NOT an integer!
- Knowing how data types work allows developers to safely validate: `if ((int)$_POST['age'] >= 18)`.

---

## 7. ⚠️ Common Beginner Traps

1. **Boolean `echo` Surprise**:
   ```php
   $isTrue = true;
   $isFalse = false;
   echo $isTrue;  // Prints: 1
   echo $isFalse; // Prints: NOTHING! (empty string)
   ```
   *Fix*: Use `var_dump($isFalse)` to see `bool(false)`.
2. **Float Inaccuracy in Financial Math**:
   Floats in computers cannot represent certain base-10 fractions with infinite precision. For banks and financial apps, developers use integer cents or the `bcmath` extension!

---

## 8. 🔮 Predict the Output

```php
<?php
  $x = "25 apples";
  $total = $x + 5;
  echo $total;
?>
```

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> In PHP 8+, this generates a <strong>Fatal TypeError</strong>! In older PHP 7 versions, it would loosely pull <code>25</code> out and output <code>30</code> with a warning. Modern PHP is much stricter about mixing strings and arithmetic!
</details>

---

## 9. 🕵️ Code Detective: The Mystery Null

```php
<?php
  $userName;
  echo "Welcome, " . $userName;
?>
```

- **Find the bug**: `$userName` was declared without an assignment.
- **Explain**: In PHP, referencing an uninitialized variable triggers a `Warning: Undefined variable $userName` and evaluates to `null`.
- **Fix**:
  ```php
  $userName = "Guest";
  echo "Welcome, " . $userName;
  ```

---

## 10. 🏆 5 Levels of Mastery Exercises

### 🟢 Level 1: Recall
1. Name the four scalar data types in PHP.
2. What built-in PHP function displays both the data type and value of a variable?
3. What is the difference between an integer and a float?

### 🟡 Level 2: Understand
4. What happens when you cast the float `9.99` to an integer using `(int)9.99`? Does it round up or down?
5. Why does `echo false;` output nothing on the screen?

### 🟠 Level 3: Apply
6. Write a script that takes three variables: `$name = "Bilal"`, `$score = "88"`, and `$passed = "true"`. Use explicit type casting to cast `$score` to `int` and `$passed` to `bool`, then inspect all three with `var_dump()`.

### 🔵 Level 4: Think & Troubleshoot
7. What is the difference between `NULL` and an empty string `""`?

### 🟣 Level 5: Create & Build
8. Build a data type quizzer script `type-inspector.php` that stores 6 diverse items in an array, loops through them, and generates an HTML table displaying the item, its `gettype()`, and whether it is numeric via `is_numeric()`.
