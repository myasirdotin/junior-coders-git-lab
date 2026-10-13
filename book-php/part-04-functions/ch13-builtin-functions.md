# Chapter 13: Top Built-in PHP Functions

---

## 🌟 Real-Life Story

On a school nature trip, nobody makes their own scissors, knife and torch from raw metal. A teacher simply opens a ready-made toolkit. Each tool has already been designed, tested and sharpened by experts. PHP comes with a toolkit like this: thousands of **built-in functions** that are ready to use. You will use them to read the date, check variables, stop a script and send a visitor to another page.

---

## 🎯 What You Will Learn

- Format dates and times with `date()`, `time()` and `strtotime()`.
- Check whether a variable has a value with `isset()` and `empty()`.
- Stop a script on purpose with `exit` and `die()`.
- Send a visitor to another page with `header("Location: ...")`.
- Avoid the classic "headers already sent" and "zero is empty" bugs.

---

## Visual Concept Explanation

A **built-in function** is a function that comes with PHP. You call it; you never have to write it.

### Essential Built-in Categories

| Category | Star functions |
| :--- | :--- |
| 📅 Date & time | `date()`, `time()`, `strtotime()` |
| 🔍 Checking variables | `isset()`, `empty()`, `is_null()` |
| 🛑 Stopping a script | `exit`, `die()` |
| 🌐 Headers & redirects | `header()`, `http_response_code()` |

### `isset()` vs `empty()`: The Famous Comparison

| Value of `$var` | `isset($var)` | `empty($var)` | Explanation |
| :--- | :--- | :--- | :--- |
| `""` (empty string) | `true` | `true` | Exists, but has no content |
| `0` (integer zero) | `true` | `true` | Exists, but zero counts as "empty" |
| `"0"` (the text zero) | `true` | `true` | A surprise: the text `"0"` also counts as empty |
| `null` | `false` | `true` | `null` means "no value" |
| `false` | `true` | `true` | Exists as boolean false |
| Not declared at all | `false` | `true` | Does not exist |

---

## Code Example: Built-in Utility Showcase

```php
<?php
  // 1. Date and time functions
  echo "<h2>1. Date & Time</h2>";
  echo "Today: " . date("l, F j, Y") . "<br>";
  echo "24-Hour Time: " . date("H:i:s") . "<br>";
  echo "12-Hour Time: " . date("h:i:s A") . "<br>";
  echo "Unix Timestamp: " . time() . "<br>"; // seconds since 1 Jan 1970

  // Working out future dates with strtotime()
  $nextFriday = strtotime("next Friday");
  echo "Next Friday's Date: " . date("Y-m-d", $nextFriday) . "<br>";
  $twoWeeksAhead = strtotime("+2 weeks");
  echo "Two Weeks from Now: " . date("Y-m-d", $twoWeeksAhead) . "<br>";

  // 2. Checking variables with isset() and empty()
  echo "<h2>2. Checking Variables</h2>";
  $searchQuery = "";

  if (isset($searchQuery)) {
    echo "Variable \$searchQuery is set in memory!<br>";
  }

  if (empty($searchQuery)) {
    echo "However, \$searchQuery is EMPTY! (User typed nothing)<br>";
  }

  // 3. Page redirection (commented out so this page still shows)
  /*
    header("Location: https://example.org/home.php");
    exit; // Always follow a redirect with exit
  */
?>
```

Output (the dates and times depend on when you run it; this run was on 13 October 2026):

```text
<h2>1. Date & Time</h2>Today: Tuesday, October 13, 2026<br>24-Hour Time: 02:37:46<br>12-Hour Time: 02:37:46 AM<br>Unix Timestamp: 1791859066<br>Next Friday's Date: 2026-10-16<br>Two Weeks from Now: 2026-10-27<br><h2>2. Checking Variables</h2>Variable $searchQuery is set in memory!<br>However, $searchQuery is EMPTY! (User typed nothing)<br>
```

---

## Code Explanation: Breaking It Down Line by Line

- `date("l, F j, Y")`:
  - `l` (lowercase L): full day name (*"Tuesday"*).
  - `F`: full month name (*"October"*).
  - `j`: day of the month without a leading zero (*"13"*).
  - `Y`: 4-digit year (*"2026"*).
- `time()`: the **Unix timestamp**, the number of seconds since 1 January 1970. Computers use it to compare times.
- `strtotime("+2 weeks")`: turns an English phrase into a timestamp. `date()` can then format it.
- `\$searchQuery`: the backslash stops PHP from replacing the variable, so the `$` name is printed as text.
- `isset($var)`: `true` if the variable exists and is not `null`.
- `empty($var)`: `true` if the variable does not exist, or is `""`, `"0"`, `0`, `0.0`, `null` or `false`.
- `exit` / `die("Message")`: stops the script right there. `die()` can print a message first.

---

## 🌍 Real-World Connection: Due Dates & Page Guards

- **Library systems**: "Book due back on 2026-10-27" is worked out with `strtotime("+2 weeks")` and `date()`.
- **Page guards**: a teachers-only page checks who is logged in. If nobody is, it sends the visitor to the login page and stops. You will build this in the login project:
  ```php
  if (!isset($teacherName)) {
    header("Location: login.php");
    exit;
  }
  ```

---

## 🔮 Predict the Output

```php
<?php
  $note = "0";
  var_dump(empty($note));
?>
```

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> <code>bool(true)</code>. The text <code>"0"</code> is one of the values PHP treats as empty, even though it is a string with one character in it.
</details>

---

## 🕵️ Code Detective: The Flawed Zero Check

```php
<?php
  // Checking whether a student's exam score was entered:
  $score = 0;
  if (!empty($score)) {
    echo "Score recorded: $score";
  } else {
    echo "No score entered!";
  }
?>
```

Output:

```text
No score entered!
```

- **Find the bug**: A real score of `0` prints *"No score entered!"*
- **Explain**: In PHP, `0` counts as `empty()`.
- **Fix**: Check for "no value" directly: `if ($score !== null)`. A score of 0 now prints `Score recorded: 0`.

---

## ⚠️ Common Mistake

**Printing something before `header()`.**

- ❌ *Wrong*:
  ```php
  <?php
  echo "Hello";
  header("Location: home.php");
  ```
- 😕 *What happens*: PHP shows *Warning: Cannot modify header information - headers already sent*, and the redirect does not happen. Headers travel **before** the page content, so once any output has been sent, it is too late.
- ✅ *Fixed*: Call `header()` before any `echo`, HTML or even a blank line outside `<?php`.
  ```php
  <?php
  header("Location: home.php");
  exit;
  ```

A second mistake: **forgetting `exit` after a redirect**. Without it, the rest of the script still runs on the server and its output is still sent. A visitor whose browser ignores the redirect can read that hidden content.

---

## ✍️ Try It

Open the [PHP Console](../studios/php-console/) and type:

```php
<?php
$lastDay = strtotime("2026-12-31");
echo "The last day of 2026 is a " . date("l", $lastDay) . "<br>";
$name = "";
var_dump(isset($name));
var_dump(empty($name));
```

Output:

```text
The last day of 2026 is a Thursday<br>bool(true)
bool(true)
```

*Hint*: Change `$name` to `"Maryam"` and run again. Which of the two answers changes, and why?

---

## 📝 Recap

- PHP has thousands of ready-made **built-in functions**; look for one before writing your own.
- `date()` formats a time; `time()` gives the current timestamp; `strtotime()` turns words like `"+2 weeks"` into a timestamp.
- `isset()` asks "does it exist and is it not null?"; `empty()` asks "is it missing or falsy?" Remember that `0` and `"0"` are empty.
- `header("Location: ...")` redirects a visitor. It must come before any output, and should be followed by `exit`.
- `exit` and `die()` stop a script immediately.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which `date()` format letter gives the hour in 12-hour format, with a leading zero?
2. What type of value does `isset()` return?
3. Which built-in stops the script and can print a message first?

<details>
<summary>Show answer</summary>

1. **`h`** (for example `02`). `g` gives the same hour without the leading zero.
2. A **boolean**: `true` or `false`.
3. **`die("message")`** (`exit("message")` does the same).

</details>

### 🟡 Level 2: Apply
1. Why does `isset($x)` return `true` for `$x = ""` but `false` for `$x = null`?
2. Why must `header()` be called before any HTML or `echo`?
3. Write two lines that print the weekday of 1 January 2027.

<details>
<summary>Show answer</summary>

1. `isset()` only asks whether the variable exists and is not `null`. An empty string is still a value; `null` means "no value".
2. HTTP headers are sent **before** the page content. Once any output has left, the headers are already gone, so PHP warns *"headers already sent"*.
3. One possible answer:

```php
<?php
$newYear = strtotime("2027-01-01");
echo date("l", $newYear);
```

Output:

```text
Friday
```

</details>

### 🔴 Level 3: Challenge
Build a maintenance guard for the school website.

1. Create `$isMaintenanceMode = true;`.
2. If it is `true`, set the status code with `http_response_code(503);` (503 means "Service Unavailable").
3. Then call `die()` with a short HTML message: "The school website is having scheduled maintenance."
4. After the `if`, print `"Welcome to the school website!"`. Check that it does not appear while maintenance mode is on.
5. Extra: print how many whole days are left until 31 December 2026, using `strtotime()`, `time()` and `floor()` (1 day = 86400 seconds).

<details>
<summary>Show one possible answer</summary>

```php
<?php
$isMaintenanceMode = true;

if ($isMaintenanceMode) {
  http_response_code(503);
  die("<h1>The school website is having scheduled maintenance.</h1>");
}

echo "Welcome to the school website!";
```

Output:

```text
<h1>The school website is having scheduled maintenance.</h1>
```

Set `$isMaintenanceMode = false;` and the page shows `Welcome to the school website!` instead.

Extra:

```php
<?php
$secondsLeft = strtotime("2026-12-31") - time();
echo floor($secondsLeft / 86400) . " days left";
```

The answer depends on today's date. On 13 October 2026 it printed `78 days left`.

</details>
