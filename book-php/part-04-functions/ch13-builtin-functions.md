# Chapter 13: Top Built-in PHP Functions 🧰⚡

---

## 1. 🌟 Real-Life Situation: The Swiss Army Knife

Imagine camping in the wilderness:
- You don't forge your own steel scissors, carving knife, corkscrew, and can opener from raw iron ore.
- You pull a compact **Swiss Army Knife** out of your pocket!
- The tools have been perfected, tested, and sharpened by master craftsmen over decades.

PHP comes out-of-the-box with over **5,000 built-in functions**!
Whether you need to format dates, inspect variables, redirect a visitor's browser, or terminate script execution, PHP already has an optimized function ready to work for you.

---

## 2. 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- Format timestamps and calculate time differences with `date()` and `time()`.
- Check variable states accurately with `isset()` and `empty()`.
- Control script execution flow using `die()` and `exit()`.
- Inspect and debug memory structures using `print_r()`.
- Send HTTP header commands and page redirects with `header()`.

---

## 3. 👁️ Visual Concept Explanation

### Essential Built-in Categories

```text
┌──────────────────────────────┬──────────────────────────────┐
│ Category                     │ Star Functions               │
├──────────────────────────────┼──────────────────────────────┤
│ 📅 Date & Time               │ date(), time(), strtotime()  │
│ 🔍 Variable Inspection       │ isset(), empty(), is_null()  │
│ 🛑 Execution Control         │ die(), exit(), sleep()       │
│ 🌐 HTTP Headers & Redirects  │ header(), http_response_code()│
└──────────────────────────────┴──────────────────────────────┘
```

### `isset()` vs `empty()`: The Famous Comparison

| Value of `$var` | `isset($var)` | `empty($var)` | Explanation |
| :--- | :--- | :--- | :--- |
| `""` (Empty string) | `true` | `true` | Exists, but has no content |
| `0` (Integer zero) | `true` | `true` | Exists, but zero is falsy |
| `null` | `false` | `true` | Null is considered non-existent & empty |
| `false` | `true` | `true` | Exists as boolean false |
| Not declared at all | `false` | `true` | Does not exist |

---

## 4. 💻 Code Example: Built-in Utility Showcase

```php
<?php
  // 1. Date and Time Functions
  echo "<h2>1. Date & Time Mastery</h2>";
  echo "Today: " . date("l, F j, Y") . "<br>";         // e.g. Wednesday, September 16, 2026
  echo "24-Hour Time: " . date("H:i:s") . "<br>";       // e.g. 09:15:24
  echo "12-Hour Time: " . date("h:i:s A") . "<br>";     // e.g. 09:15:24 AM
  echo "Unix Epoch Timestamp: " . time() . "<br>";      // Seconds since Jan 1, 1970

  // Calculating Future Dates with strtotime()
  $nextFriday = strtotime("next Friday");
  echo "Next Friday's Date: " . date("Y-m-d", $nextFriday) . "<br>";
  $twoWeeksAhead = strtotime("+2 weeks");
  echo "Two Weeks from Now: " . date("Y-m-d", $twoWeeksAhead) . "<br>";

  // 2. Checking Existence with isset() and empty()
  echo "<h2>2. Variable Auditing</h2>";
  $searchQuery = "";
  
  if (isset($searchQuery)) {
    echo "Variable \$searchQuery is set in memory!<br>";
  }
  
  if (empty($searchQuery)) {
    echo "However, \$searchQuery is EMPTY! (User typed nothing)<br>";
  }

  // 3. Page Redirection (Commented so page displays)
  /*
    // To instantly redirect a visitor to a different page:
    header("Location: https://google.com");
    exit; // Always follow header redirects with exit!
  */
?>
```

---

## 5. 🔍 Code Explanation: Breaking It Down Line by Line

- `date("l, F j, Y")`:
  - `l` (lowercase L): Full day name (*"Wednesday"*).
  - `F`: Full month name (*"September"*).
  - `j`: Day of the month without leading zeros (*"16"*).
  - `Y`: 4-digit year (*"2026"*).
- `strtotime("+2 weeks")`: A remarkably intelligent PHP function that parses human English phrases into accurate computer timestamps!
- `isset($var)`: Returns `true` if the variable exists and is not strictly `null`.
- `empty($var)`: Returns `true` if the variable does not exist, is `""`, `0`, `null`, `false`, or `[]`.
- `exit` / `die("Message")`: Stops script execution dead in its tracks.

---

## 6. 🌍 Real-World Connection: Scheduling & Security Guards

- **E-commerce**: Countdown timers like *"Flash sale ends in 4 hours, 12 minutes"* use `time()` differences.
- **Login Guards**: If an unauthorized hacker tries to access `admin.php`, the guard runs:
  ```php
  if (!isset($_SESSION['user'])) {
    header("Location: login.php");
    exit;
  }
  ```

---

## 7. ⚠️ Common Beginner Traps

1. **Output Before `header()`**:
   ```php
   echo "Hello"; // Output sent to browser!
   header("Location: home.php"); // ❌ Warning: Cannot modify header information - headers already sent!
   ```
   *Rule*: `header()` calls MUST occur before ANY HTML tags, spaces, or `echo` statements!
2. **Forgetting `exit` after a redirect**:
   If you redirect without `exit`, malicious visitors can ignore the redirect header and continue running the sensitive code below it!

---

## 8. 🔮 Predict the Output

```php
<?php
  $cart = [];
  var_dump(empty($cart));
?>
```

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> <code>bool(true)</code>! An empty array with 0 items is considered empty in PHP.
</details>

---

## 9. 🕵️ Code Detective: The Flawed Zero Check

```php
<?php
  // Checking if student got 0 on an exam:
  $score = 0;
  if (!empty($score)) {
    echo "Score recorded: $score";
  } else {
    echo "No score entered!";
  }
?>
```

- **Find the bug**: A legitimate score of `0` triggers *"No score entered!"*
- **Explain**: In PHP, `0` is considered `empty()`.
- **Fix**: Use `isset($score) && $score !== ""` or strict checks instead of `empty()`.

---

## 10. 🏆 5 Levels of Mastery Exercises

### 🟢 Level 1: Recall
1. What format letter in `date()` outputs the current hour in 12-hour format?
2. What is the return type of `isset()`?
3. What built-in function terminates script execution and prints a message?

### 🟡 Level 2: Understand
4. Explain why `isset($x)` returns true for `$x = ""` but false for `$x = null`.
5. Why must `header()` be placed before any HTML or output?

### 🟠 Level 3: Apply
6. Write a script that calculates how many days remain until New Year's Eve (`December 31`) using `strtotime()` and `time()`.

### 🔵 Level 4: Think & Troubleshoot
7. How does the Null Coalescing Operator (`$name = $_GET['name'] ?? 'Guest';`) combine `isset()` into a clean one-line shortcut?

### 🟣 Level 5: Create & Build
8. Build a Site Maintenance Guard: check a variable `$isMaintenanceMode = true`. If true, set HTTP status 503 using `http_response_code(503)` and display a styled "Under Scheduled Maintenance" splash page, calling `die()` to protect the site.
