# Chapter 23: Errors & Exceptions (try / catch) 🧯

---

## 🌟 Real-Life Story

A school bus driver plans the morning route. Most days nothing goes wrong. One day a road is closed. A careless driver stops in the middle of the street and the whole trip ends there. A careful driver has a plan: take the side road, phone the school and tell the parents calmly, "We will be ten minutes late." Programs meet closed roads too: a missing file, a bad number, damaged data. In this chapter you learn to give PHP a calm plan B.

---

## 🎯 What You Will Learn

- Tell the difference between a **warning** (the script goes on) and a **fatal error** (the script stops).
- Catch problems with `try { } catch (Exception $e) { }` and read them with `$e->getMessage()`.
- Run clean-up code every time with `finally`.
- Stop your own function with `throw new Exception("...")` when it gets a bad value.
- Hide raw errors from visitors on a live site: switch `display_errors` off, log the details and show a friendly message.

---

## 👁️ Two Kinds of Problems: Warnings and Fatal Errors

When something goes wrong, PHP reports it. Two kinds matter most to a beginner:

| Kind | What PHP does | Example |
| :--- | :--- | :--- |
| **Warning** | Prints a message, then **keeps going** | Reading a file that does not exist |
| **Fatal error** | Prints a message, then **stops the script** | Dividing by zero with `intdiv()` |

`intdiv(a, b)` divides two whole numbers and keeps only the whole part: `intdiv(30, 4)` is `7`.

Save this as `problems.php` and run it:

```php
<?php
echo "Start\n";
$text = file_get_contents("timetable.txt");
var_dump($text);
echo "Still running\n";
echo intdiv(10, 0);
echo "Never printed\n";
```

Output (there is no `timetable.txt`; your folder path will be different):

```text
Start

Warning: file_get_contents(timetable.txt): Failed to open stream: No such file or directory in C:\xampp\htdocs\php-lab\problems.php on line 3
bool(false)
Still running

Fatal error: Uncaught DivisionByZeroError: Division by zero in C:\xampp\htdocs\php-lab\problems.php:6
Stack trace:
#0 C:\xampp\htdocs\php-lab\problems.php(6): intdiv(10, 0)
#1 {main}
  thrown in C:\xampp\htdocs\php-lab\problems.php on line 6
```

Read it slowly:

- The **warning** told us the file was missing. `file_get_contents()` returned `false`, and the script carried on.
- The **fatal error** stopped everything. `"Never printed"` really was never printed.
- The fatal error says **Uncaught**. That word is the clue for this chapter. The problem was *thrown*, and nobody *caught* it.

A **stack trace** is the list of function calls that led to the problem. It helps you, the programmer. It should never be shown to visitors (more on that below).

---

## 🧺 Exceptions: Problems You Can Catch

Modern PHP reports many serious problems as **exceptions**. An exception is a message object that PHP *throws* when it cannot continue. If your code *catches* it, the script does not crash. You decide what happens next.

The pattern has two parts:

```text
try {
  risky work      <- PHP tries this
}
catch (Type $e) {
  plan B          <- runs ONLY if a
}                    problem of that
                     Type was thrown
```

The variable `$e` holds the problem. `$e->getMessage()` gives its message as a string. (The arrow `->` asks an object for something; Chapter 24 explains objects fully.)

### Catching a division by zero

A teacher types how many groups to split 30 students into. A visitor might type `0` or a word.

```php
<?php
$inputs = ["5", "abc", "0"];
foreach ($inputs as $groups) {
  try {
    $g = (int) $groups;
    $each = intdiv(30, $g);
    echo "30 students in $g groups: $each each\n";
  } catch (DivisionByZeroError $e) {
    echo "Groups \"$groups\": " . $e->getMessage() . "\n";
  } finally {
    echo "(checked \"$groups\")\n";
  }
}
```

Output:

```text
30 students in 5 groups: 6 each
(checked "5")
Groups "abc": Division by zero
(checked "abc")
Groups "0": Division by zero
(checked "0")
```

- `(int) "abc"` becomes `0`, so `intdiv(30, 0)` throws a `DivisionByZeroError`.
- The `catch` block runs instead of crashing, and the loop moves on to the next value.
- The `finally` block runs **every time**, whether there was a problem or not.

### What `finally` is for

`finally` is for clean-up that must always happen: closing a file you opened, writing "done" in a log, or showing the page footer. Think of it as the bus driver who always parks the bus at the end of the day, whatever happened on the route.

---

## 🚨 Throwing Your Own Exceptions

Your own functions can refuse bad values too. You **throw** an exception with the `throw` keyword:

```php
throw new Exception("Marks must be from 0 to 100.");
```

The word `new` creates a fresh object, here an `Exception` that carries your message. You will build your own classes and objects in Chapter 24.

```php
<?php
function checkMarks(int $marks): int
{
  if ($marks < 0 || $marks > 100) {
    throw new Exception("Marks must be from 0 to 100, not $marks.");
  }
  return $marks;
}

$entries = [85, 120, 64];

foreach ($entries as $m) {
  try {
    $ok = checkMarks($m);
    echo "Saved: $ok\n";
  } catch (Exception $e) {
    echo "Problem: " . $e->getMessage() . "\n";
  } finally {
    echo "Checked entry $m\n";
  }
}
echo "All entries checked.\n";
```

Output:

```text
Saved: 85
Checked entry 85
Problem: Marks must be from 0 to 100, not 120.
Checked entry 120
Saved: 64
Checked entry 64
All entries checked.
```

When `throw` runs, PHP leaves the function **at once**. The `return` line is skipped, and `echo "Saved..."` is skipped too. PHP jumps straight to the matching `catch`.

What if nobody catches it? Call `checkMarks(150);` without `try`, and PHP stops with:

```text
Fatal error: Uncaught Exception: Marks must be from 0 to 100, not 150. in C:\xampp\htdocs\php-lab\marks.php:6
```

### Why throw instead of `echo` an error?

A function that only echoes "Error!" cannot tell the caller that something went wrong. The caller carries on with a bad value. A thrown exception **forces** the caller to deal with it: catch it, or crash loudly. Loud problems get fixed; quiet ones hide for months.

---

## 🏷️ Catching Specific Types

PHP 8.3 throws different **types** of problems. The type name after `catch` decides which ones that block handles.

| Type | When PHP 8.3 throws it | Family |
| :--- | :--- | :--- |
| `Exception` | Your own `throw new Exception(...)` | Exception |
| `JsonException` | Bad JSON, with `JSON_THROW_ON_ERROR` | Exception |
| `ValueError` | A built-in function gets an impossible value | Error |
| `DivisionByZeroError` | `intdiv(x, 0)`, `x % 0`, `x / 0` | Error |

PHP has two families. **Exceptions** are problems your program should expect, like bad data. **Errors** usually mean a mistake in the code. `catch (Exception $e)` catches only the Exception family. To catch both families at once, use `catch (Throwable $e)`.

### `ValueError`: an impossible value

`str_repeat("*", 3)` repeats a string: `***`. Asking for **minus** 3 copies makes no sense:

```php
<?php
try {
  echo str_repeat("*", -3);
} catch (ValueError $e) {
  echo "ValueError: " . $e->getMessage() . "\n";
}
```

Output:

```text
ValueError: str_repeat(): Argument #2 ($times) must be greater than or equal to 0
```

### `JsonException`: damaged JSON

In Chapter 21 you saved data as JSON. Normally `json_decode()` quietly returns `null` when the JSON is damaged, which is easy to miss. Add the flag `JSON_THROW_ON_ERROR` and it throws a `JsonException` instead. The `512` before it is the usual nesting depth; just copy it.

```php
<?php
$text = '{"name": "Maryam", "grade": 7';   // the closing } is missing

var_dump(json_decode($text, true));        // the quiet way

try {
  $data = json_decode($text, true, 512, JSON_THROW_ON_ERROR);
} catch (JsonException $e) {
  echo "Bad JSON: " . $e->getMessage() . "\n";
}
```

Output:

```text
NULL
Bad JSON: Syntax error
```

### One `catch` for two types

The bar `|` means "or":

```php
<?php
function shareEqually(int $items, int $people): int
{
  return intdiv($items, $people);
}

$tests = [[40, 8], [40, 0]];
foreach ($tests as $t) {
  try {
    echo "Each person gets " . shareEqually($t[0], $t[1]) . "\n";
  } catch (DivisionByZeroError | ValueError $e) {
    echo "Cannot share: " . $e->getMessage() . "\n";
  }
}
```

Output:

```text
Each person gets 5
Cannot share: Division by zero
```

---

## 📄 Not Everything Throws: `false` + a Warning

Some older functions do **not** throw. They print a warning and return `false`. `file_get_contents()`, `fopen()` and `file_put_contents()` work this way. A `try`/`catch` around them catches nothing, so you must **check the return value** yourself (as in Chapters 20 and 21):

```php
<?php
$file = "notices.txt";

if (!file_exists($file)) {
  echo "Notices are not available right now.\n";
} else {
  $text = file_get_contents($file);
  if ($text === false) {
    echo "Notices could not be read.\n";
  } else {
    echo $text;
  }
}
```

Output (when `notices.txt` is missing):

```text
Notices are not available right now.
```

| How the function reports a problem | What you write |
| :--- | :--- |
| Throws (`intdiv`, `json_decode` with the flag, your own functions) | `try` / `catch` |
| Returns `false` + a warning (`file_get_contents`, `fopen`) | `if ($x === false)` |

Use `=== false`, not `!$x`. An empty file returns `""`, which is not a failure.

---

## 🛡️ Errors on a Live Website

On **your own computer**, seeing every warning helps you learn and fix bugs. On a **live website**, raw error messages are dangerous. They show folder paths, file names and sometimes database details. An attacker can use those clues.

The rule professionals follow:

```text
Your computer     Live website
-------------     ------------------
display_errors    display_errors
  = On              = Off
                  log_errors = On
                  visitor sees a
                  friendly message
```

These settings live in `php.ini`, the PHP settings file (in XAMPP: `C:\xampp\php\php.ini`):

```ini
display_errors = Off
log_errors = On
error_log = "C:/xampp/php/logs/php_error_log"
```

The details still go somewhere: the **error log**, a private file only the site owner can read. You can write your own lines to it with `error_log("...")`.

### The friendly-message pattern

```php
<?php
function averageMark(array $marks): float
{
  if (count($marks) === 0) {
    throw new Exception("No marks were entered.");
  }
  return array_sum($marks) / count($marks);
}

$classes = [
  "Grade 7 Falcons" => [78, 85, 92],
  "Grade 8 Eagles"  => [],
];

foreach ($classes as $name => $marks) {
  try {
    $avg = averageMark($marks);
    echo "$name: average " . round($avg, 1) . "\n";
  } catch (Exception $e) {
    error_log("averageMark failed for $name: " . $e->getMessage());
    echo "$name: no average yet. Please ask the teacher.\n";
  }
}
```

Output on the page:

```text
Grade 7 Falcons: average 85
Grade 8 Eagles: no average yet. Please ask the teacher.
```

And this line goes to the error log (the date will be yours):

```text
[13-Oct-2026 13:20:21 UTC] averageMark failed for Grade 8 Eagles: No marks were entered.
```

The visitor gets a calm, true message. The site owner gets the details. Nobody sees a stack trace.

---

## 🤝 Amānah: Honest, Calm Messages

A good error message is truthful and kind. It says what went wrong in plain words and what the visitor can do next: "Please try again in a few minutes" or "Please ask the school office." It never blames the visitor, never pretends that nothing happened, and never leaks private details such as file paths or other people's data. Keeping the details in a private log is part of guarding the trust (*Amānah*) people place in your website.

---

## 🔮 Predict the Output

```php
<?php
try {
  echo "A ";
  throw new Exception("stop");
  echo "B ";
} catch (Exception $e) {
  echo "C ";
} finally {
  echo "D";
}
```

<details>
<summary>Show answer</summary>

```text
A C D
```

`B` is skipped because `throw` jumps straight to `catch`. `finally` always runs.

</details>

---

## 🕵️ Code Detective: The catch That Never Catches

```php
<?php
try {
  echo intdiv(20, 0);
} catch (Exception $e) {
  echo "Please enter at least one group.";
}
```

- **Find the bug**: The page still shows *Fatal error: Uncaught DivisionByZeroError*.
- **Explain**: `DivisionByZeroError` belongs to the **Error** family, not the Exception family. `catch (Exception $e)` does not match it.
- **Fix**: Write `catch (DivisionByZeroError $e)`, or `catch (Throwable $e)` to catch both families.

---

## ⚠️ Common Mistake

**An empty `catch` that hides the problem.**

- ❌ *Wrong*:
  ```php
  try {
    $settings = json_decode($text, true, 512, JSON_THROW_ON_ERROR);
  } catch (JsonException $e) {
    // nothing here
  }
  echo $settings["school"];
  ```
- 😕 *What happens*: The problem is swallowed. `$settings` was never set, so the next line gives a new warning, far from the real cause. Nobody knows the settings file is damaged.
- ✅ *Fixed*: Log it, tell the visitor, and give a safe default:
  ```php
  try {
    $settings = json_decode($text, true, 512, JSON_THROW_ON_ERROR);
  } catch (JsonException $e) {
    error_log("Settings damaged: " . $e->getMessage());
    $settings = ["school" => "Our School"];
  }
  echo $settings["school"];
  ```

A second mistake: **showing `$e->getMessage()` to visitors on a live site.** Messages from PHP and databases can contain paths and private details. Log them; show a friendly sentence instead.

---

## ✍️ Try It

Open the [PHP Console](../studios/php-console/) and paste this:

```php
<?php
function minutesPerTopic(int $minutes, int $topics): int
{
  if ($minutes <= 0) {
    throw new Exception("Study time must be more than 0 minutes.");
  }
  return intdiv($minutes, $topics);
}

try {
  echo minutesPerTopic(90, 3) . " minutes each\n";
  echo minutesPerTopic(90, 0) . " minutes each\n";
} catch (DivisionByZeroError $e) {
  echo "Choose at least one topic.\n";
}
```

Output:

```text
30 minutes each
Choose at least one topic.
```

*Hint*: Now change the second call to `minutesPerTopic(0, 3)`. The program crashes with *Uncaught Exception*. Why? Add a second `catch (Exception $e)` block so that it prints the message instead.

---

## 📝 Recap

- A **warning** lets the script continue; a **fatal error** stops it. "Uncaught" means a thrown problem was never caught.
- `try { } catch (Type $e) { }` gives PHP a plan B; `$e->getMessage()` tells you what happened; `finally` always runs.
- `throw new Exception("...")` lets your own function refuse bad values.
- Catch the right type: `ValueError`, `DivisionByZeroError`, `JsonException` (with `JSON_THROW_ON_ERROR`), or `Throwable` for everything.
- Functions such as `file_get_contents()` return `false` with a warning instead of throwing: check them with `=== false`.
- On a live site: `display_errors = Off`, log the details, show visitors a calm, honest message.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which keyword starts the block of code that might fail?
2. Which method gives you the text of a caught exception?
3. Which block runs whether or not a problem happened?
4. What should `display_errors` be on a live website?

<details>
<summary>Show answer</summary>

1. `try`.
2. `$e->getMessage()`.
3. `finally`.
4. `Off` (with `log_errors = On`, so the details go to the private error log).

</details>

### 🟡 Level 2: Apply
1. What does this print?
   ```php
   <?php
   function checkAge(int $age): string
   {
     if ($age < 5) {
       throw new Exception("Too young for school.");
     }
     return "Welcome!";
   }
   try {
     echo checkAge(12) . "\n";
     echo checkAge(3) . "\n";
     echo "Done\n";
   } catch (Exception $e) {
     echo "Sorry: " . $e->getMessage() . "\n";
   }
   ```
2. Why does `try { $t = file_get_contents("x.txt"); } catch (Exception $e) { ... }` not catch a missing file? What should you write instead?

<details>
<summary>Show answer</summary>

1. Output:
   ```text
   Welcome!
   Sorry: Too young for school.
   ```
   `Done` is never printed: the `throw` jumps out of the `try` block at once.
2. `file_get_contents()` does not throw. It shows a warning and returns `false`. Check `file_exists()` first, then test the result with `if ($t === false)`.

</details>

### 🔴 Level 3: Challenge
Build `donation-check.php` for a charity drive.

1. Write `function checkAmount(int $amount): int` that throws `new Exception("Amount must be at least 10.")` when `$amount` is below 10, and returns the amount otherwise.
2. Loop over `[500, 5, 1200]`. Inside `try`, add each good amount to a `$total`.
3. In `catch`, write the message to the log with `error_log()` and print a polite line for the visitor.
4. After the loop, print the total.
5. Extra: read the amounts from the JSON string `'[500, 5, 1200]'` with `JSON_THROW_ON_ERROR`, and catch `JsonException` if the text is damaged.

<details>
<summary>Show one possible answer</summary>

```php
<?php
function checkAmount(int $amount): int
{
  if ($amount < 10) {
    throw new Exception("Amount must be at least 10.");
  }
  return $amount;
}

$total = 0;
try {
  $amounts = json_decode('[500, 5, 1200]', true, 512, JSON_THROW_ON_ERROR);
} catch (JsonException $e) {
  error_log("Donation list damaged: " . $e->getMessage());
  $amounts = [];
}

foreach ($amounts as $a) {
  try {
    $total += checkAmount($a);
  } catch (Exception $e) {
    error_log("Donation of $a refused: " . $e->getMessage());
    echo "One donation of $a could not be accepted. The smallest gift is 10.\n";
  }
}
echo "Total collected: $total\n";
```

Output:

```text
One donation of 5 could not be accepted. The smallest gift is 10.
Total collected: 1700
```

</details>
