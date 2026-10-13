# Chapter 5: Data Types & Inspection

---

## 🌟 Real-Life Story

Your school canteen has separate recycling bins: blue for paper, green for plastic bottles, grey for cans and brown for food scraps. You would not throw an apple core into the paper bin, because each material is handled differently. Data in a program is sorted the same way. Text, whole numbers, decimals and yes/no answers are different **data types**, and PHP handles each one differently.

---

## 🎯 What You Will Learn

- Name PHP's main data types: string, integer, float, boolean, array, object and null.
- Inspect any variable with `var_dump()` and `gettype()`.
- Explain **type juggling**, when PHP changes a type by itself.
- Change a type on purpose with **casting**, such as `(int)` and `(bool)`.

---

## Visual Concept Explanation

A **data type** tells PHP what kind of value a variable holds, and so what you can do with it.

### The Core PHP Data Types

```text
┌──────────────────────────────────────────┐
│ SCALAR (one value)                       │
│ • String:  "Class 9", 'PHP'              │
│ • Integer: 42, -15, 2026                 │
│ • Float:   3.14, 99.9                    │
│ • Boolean: true, false                   │
├──────────────────────────────────────────┤
│ COMPOUND (many values)                   │
│ • Array:  ["HTML", "PHP"]                │
│ • Object: new Student()                  │
├──────────────────────────────────────────┤
│ SPECIAL                                  │
│ • NULL: no value at all                  │
│ • Resource: an open file or link         │
└──────────────────────────────────────────┘
```

### The 8 Types Quick Reference

| Data Type | Description | Real-World Example | PHP Syntax |
| :--- | :--- | :--- | :--- |
| **String** | Text inside quotes | Student name, address | `$name = "Sara";` |
| **Integer** | Whole number, no decimal point | Age, exam marks, year | `$score = 98;` |
| **Float** | Number with a decimal part | Price, GPA, temperature | `$gpa = 3.92;` |
| **Boolean** | Only `true` or `false` | Logged in, passed exam | `$hasPassed = true;` |
| **Array** | Many values in one variable (Chapter 14) | List of subjects | `$subs = ["Math", "CS"];` |
| **Object** | Made from a class (Chapter 24) | A student record | `$s = new Student();` |
| **NULL** | A variable with no value | Cleared search box | `$search = null;` |
| **Resource** | A handle to something outside PHP (Chapter 20) | An open file | `$f = fopen("log.txt", "r");` |

You will use strings, integers, floats, booleans and null now. Arrays, objects and resources get their own chapters later.

---

## Code Example: Inspecting Types with `var_dump()`

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

Output:

```text
<h2>Variable Inspection Report</h2><pre>string(15) "PHP for Class 9"
int(26)
float(29.99)
bool(true)
array(2) {
  [0]=>
  string(6) "coding"
  [1]=>
  string(7) "backend"
}
NULL
</pre><h3>Type Juggling & Casting</h3>Juggled Addition: 200 (Type: integer)<br>Explicitly Cast GPA to Int: 3
```

---

## Code Explanation: Breaking It Down Line by Line

- `var_dump($variable);`: A tool for developers. It prints the **type**, the **size** and the **exact value** of a variable. `string(15)` means a string of 15 characters.
- `<pre> ... </pre>`: Keeps the line breaks of `var_dump()` so the result is easy to read in a browser.
- `$calc = $strNum + 50;`: `+` only works with numbers, so PHP turns the string `"150"` into the integer `150` and gets `200`. This automatic change is **type juggling**.
- `gettype($calc)`: Gives the type name as text, here `integer`. For a float it says `double`, an old name for the same type.
- `"... (Type: " . gettype($calc) . ")"`: The dot `.` joins pieces of text together. Chapter 6 explains it.
- `(int) $rawGpa`: **Casting** forces a value into a type. `(int)` cuts off the decimal part; it does not round.

---

## 🌍 Real-World Connection: Form Inputs Are Always Strings!

When a visitor types their age `15` into an HTML form:
- PHP receives it as the **string** `"15"`, not the integer `15`.
- That is why developers check and convert form values before using them. Chapters 17–19 show how.

---

## 🔮 Predict the Output

```php
<?php
  $x = "25 apples";
  $total = $x + 5;
  echo $total;
?>
```

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> It prints <code>30</code>, but PHP 8 also shows <code>Warning: A non-numeric value encountered</code>. PHP takes the <code>25</code> from the start of the string and warns you that the rest was ignored. A string with no number at the start, such as <code>"apples"</code>, is worse: <code>"apples" + 5</code> stops the script with a <code>TypeError</code>.
</details>

---

## 🕵️ Code Detective: The Mystery Null

```php
<?php
  $userName;
  echo "Welcome, " . $userName;
?>
```

Output:

```text
Warning: Undefined variable $userName in test.php on line 3
Welcome, 
```

- **Find the bug**: `$userName` is named but never given a value.
- **Explain**: Using a variable with no value gives a warning, and PHP treats it as `null` (nothing).
- **Fix**:
  ```php
  $userName = "Guest";
  echo "Welcome, " . $userName; // Welcome, Guest
  ```

---

## ⚠️ Common Mistake

**Expecting `echo` to show a boolean.**

- ❌ *Wrong*:
  ```php
  $isOpen = true;
  $isClosed = false;
  echo "[", $isOpen, "][", $isClosed, "]";
  ```
- 😕 *What happens*: `true` prints as `1`, and `false` prints as nothing:
  ```text
  [1][]
  ```
- ✅ *Fixed*: Use `var_dump($isClosed);` to see `bool(false)`.

A second trap: floats are not perfectly exact. `0.1 + 0.2 == 0.3` is `false` in PHP, as in most languages. Money apps usually count in whole paise or cents (integers) to avoid this.

---

## ✍️ Try It

Open the [PHP Console](../studios/php-console/) and type:

```php
<?php
$temperature = 21.5;
$city = "Srinagar";
$isRaining = false;
var_dump($temperature);
var_dump($city);
var_dump($isRaining);
echo gettype($temperature);
```

Output:

```text
float(21.5)
string(8) "Srinagar"
bool(false)
double
```

*Hint*: Change `21.5` to `21` and run again. Which type does `var_dump()` show now?

---

## 📝 Recap

- Every value has a **data type**: string, integer, float, boolean, array, object, null or resource.
- `var_dump()` shows the type and value; `gettype()` gives just the type name.
- PHP sometimes changes types by itself (**type juggling**), such as `"150" + 50` = `200`.
- Casting with `(int)`, `(string)` or `(bool)` changes a type on purpose. `(int)` cuts off decimals.
- `echo false` prints nothing, so use `var_dump()` when checking booleans.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Name the four scalar data types.
2. Which function shows both the type and the value of a variable?
3. What is the difference between an integer and a float?

<details>
<summary>Show answer</summary>

1. String, integer, float, boolean.
2. `var_dump()`.
3. An integer is a whole number (`42`). A float has a decimal part (`3.14`).

</details>

### 🟡 Level 2: Apply
1. What is `(int) 9.99`? Does it round up?
2. Is `null` the same as an empty string `""`?

<details>
<summary>Show answer</summary>

1. `9`. Casting to `int` cuts off the decimals; it never rounds up.
2. No. `null` means "no value at all". `""` is a string that happens to be empty. They are loosely equal (`null == ""` is `true`) but not strictly equal (`null === ""` is `false`). Chapter 8 explains `==` and `===`.

</details>

### 🔴 Level 3: Challenge
A form sent three values, all as strings.

1. Store `$name = "Bilal"`, `$score = "88"` and `$passed = "true"`.
2. Cast `$score` to `int` and `$passed` to `bool`.
3. Inspect all three with `var_dump()`.
4. Extra: what does `(bool) "false"` give? Why is that surprising?

<details>
<summary>Show one possible answer</summary>

```php
<?php
$name = "Bilal";
$score = (int) "88";
$passed = (bool) "true";
var_dump($name);
var_dump($score);
var_dump($passed);
var_dump((bool) "false");
```

Output:

```text
string(5) "Bilal"
int(88)
bool(true)
bool(true)
```

`(bool) "false"` is `true`! Any non-empty string except `"0"` becomes `true`. PHP does not read the word inside the quotes.

</details>
