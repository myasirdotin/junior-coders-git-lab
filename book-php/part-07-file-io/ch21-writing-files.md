# Chapter 21: Writing & Appending Files ✍️

---

## 🌟 Real-Life Story

At the exit of a science museum lies a big guestbook. You write: *"The planets room was amazing! (Ali, Class 9)"*. You do not rub out the hundreds of notes written before yours. You turn to the next empty line and add yours at the end. In PHP, adding to the end of a file is called **appending**, and wiping the page to start again is called **overwriting**.

---

## 🎯 What You Will Learn

- Write and overwrite a file with `file_put_contents()`.
- Add to the end of a file with the `FILE_APPEND` flag.
- Lock a file while writing with `LOCK_EX`.
- Use the `fopen()` modes `"w"` (write) and `"a"` (append).
- Build a guestbook that saves messages safely and prints them safely.

---

## 👁️ Visual Concept Explanation

A **flag** is an extra option you pass to a function to change how it works.

### Overwrite vs. Append

```text
OVERWRITE (the default)
Before: [Entry 1] [Entry 2]
file_put_contents("log.txt", "New");
After:  [New]
        (old entries are gone!)

APPEND (FILE_APPEND flag)
Before: [Entry 1] [Entry 2]
file_put_contents("log.txt", "New",
                  FILE_APPEND);
After:  [Entry 1] [Entry 2] [New]
```

### `fopen()` Write Modes

| Mode | Meaning | If the file exists | If it does not exist |
| :--- | :--- | :--- | :--- |
| `"w"` | write | emptied first | created |
| `"a"` | append | new text goes at the end | created |

```php
<?php
$h = fopen("notes.txt", "a");
fwrite($h, "Bring lab coat" . PHP_EOL);
fclose($h);
```

`fwrite()` writes text through an open file handle. `file_put_contents()` does open, write and close in one step.

---

## 💻 Code Example: An Interactive Guestbook

Save this as `guestbook.php` in `htdocs`:

```php
<?php
  $dataFile = "guestbook.txt";
  $msg = "";

  // Handle a new entry
  if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $visitor = trim($_POST["visitor_name"] ?? "");
    $comment = trim($_POST["visitor_comment"] ?? "");

    // Each entry must stay on ONE line, so turn new lines and "|" into spaces
    $visitor = str_replace(["\r", "\n", "|"], " ", $visitor);
    $comment = str_replace(["\r", "\n", "|"], " ", $comment);

    if ($visitor !== "" && $comment !== ""
        && strlen($visitor) <= 40 && strlen($comment) <= 300) {
      $timestamp = date("Y-m-d H:i");
      $newEntry = "$timestamp | $visitor | $comment" . PHP_EOL;

      // Add to the end, with an exclusive lock
      file_put_contents($dataFile, $newEntry, FILE_APPEND | LOCK_EX);
      $msg = "Thank you for signing the guestbook!";
    } else {
      $msg = "Please write a name (up to 40 letters) and a message (up to 300).";
    }
  }

  // Read existing entries
  $entries = [];
  if (file_exists($dataFile)) {
    $lines = file($dataFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    $entries = array_reverse($lines); // newest first
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Class 9 Guestbook</title>
  <style>
    body { font-family: sans-serif; max-width: 500px; margin: 30px auto; }
    .entry-card { background: #f8fafc; border-left: 4px solid #7c3aed;
                  padding: 10px 14px; margin-bottom: 12px; }
    input, textarea { width: 100%; padding: 8px; margin: 6px 0 14px;
                      box-sizing: border-box; }
  </style>
</head>
<body>

  <h2>Digital Guestbook</h2>

  <?php if ($msg !== ""): ?>
    <p><strong><?= htmlspecialchars($msg) ?></strong></p>
  <?php endif; ?>

  <form action="guestbook.php" method="POST">
    <label for="visitor_name">Your Name:</label>
    <input type="text" id="visitor_name" name="visitor_name" maxlength="40" required>

    <label for="visitor_comment">Message:</label>
    <textarea id="visitor_comment" name="visitor_comment" rows="3"
              maxlength="300" required></textarea>

    <button type="submit">Sign Guestbook</button>
  </form>

  <h3>Recent Messages (<?= count($entries) ?>)</h3>
  <?php foreach ($entries as $line): ?>
    <?php $parts = explode(" | ", $line, 3); ?>
    <div class="entry-card">
      <strong><?= htmlspecialchars($parts[1]) ?></strong>
      <small>(<?= htmlspecialchars($parts[0]) ?>)</small><br>
      <?= htmlspecialchars($parts[2]) ?>
    </div>
  <?php endforeach; ?>

</body>
</html>
```

After Ali and then Sara sign, `guestbook.txt` holds (your times will differ):

```text
2026-10-13 09:15 | Ali | The planets room was amazing!
2026-10-13 09:20 | Sara | I liked the <b>robots</b>.
```

And Sara's card, printed first because it is newest, comes out as:

```html
          <div class="entry-card">
      <strong>Sara</strong>
      <small>(2026-10-13 09:20)</small><br>
      I liked the &lt;b&gt;robots&lt;/b&gt;.    </div>
```

Sara's `<b>` tags are shown as text, not run as HTML.

---

## 🔍 Code Explanation: Breaking It Down Line by Line

- `str_replace(["\r", "\n", "|"], " ", $comment)`: Swaps line breaks and `|` for spaces. Each entry stays on one line, and the `|` separator cannot be faked.
- `strlen($comment) <= 300`: A length limit, so nobody can fill your disk with one giant message.
- `PHP_EOL`: The **end-of-line** constant: `"\r\n"` on Windows and `"\n"` on Linux or macOS.
- `FILE_APPEND`: Adds the text at the end instead of wiping the file.
- `LOCK_EX`: Takes an **exclusive lock** while writing. If two visitors submit at the same moment, the second waits until the first has finished, so lines do not get mixed up.
- `file(...)`: Reads the file into an array, one line per item.
- `array_reverse($lines)`: Returns the array in the opposite order, so the newest message comes first.
- `explode(" | ", $line, 3)`: Splits the line into at most 3 parts: time, name, message.
- **Save raw, escape on output**: We store exactly what was typed and call `htmlspecialchars()` only when printing.

---

## 🌍 Real-World Connection: JSON Files as Tiny Databases

Small projects often save a whole array to a `.json` file. **JSON** is a text format for data that many languages can read.

```php
<?php
$posts = [["title" => "Science Fair Notes"]];
$posts[] = ["title" => "Library Week"];
file_put_contents("posts.json", json_encode($posts, JSON_PRETTY_PRINT));
echo file_get_contents("posts.json");
```

Output:

```text
[
    {
        "title": "Science Fair Notes"
    },
    {
        "title": "Library Week"
    }
]
```

`json_decode(file_get_contents("posts.json"), true)` turns it back into an array. The blog project in Chapter 31 uses this idea.

---

## 🔮 Predict the Output

```php
<?php
  file_put_contents("test.txt", "Alpha");
  file_put_contents("test.txt", "Beta");
  echo file_get_contents("test.txt");
?>
```

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> <code>Beta</code>. Without <code>FILE_APPEND</code>, the second call overwrote the first.
</details>

---

## 🕵️ Code Detective: The Squashed Log

```php
<?php
  file_put_contents("visits.log", "Visit from Room 4", FILE_APPEND);
  file_put_contents("visits.log", "Visit from Room 7", FILE_APPEND);
?>
```

- **Find the bug**: `visits.log` reads: `Visit from Room 4Visit from Room 7`.
- **Explain**: The developer did not add a line ending after each entry.
- **Fix**:
  ```php
  file_put_contents("visits.log", "Visit from Room 4" . PHP_EOL, FILE_APPEND);
  ```

---

## ⚠️ Common Mistake

**Forgetting `FILE_APPEND`.**

- ❌ *Wrong*:
  ```php
  file_put_contents("attendance.txt", "Amina present" . PHP_EOL);
  ```
- 😕 *What happens*: Every call wipes the file first. After the whole class signs in, only the last name is left.
- ✅ *Fixed*:
  ```php
  file_put_contents("attendance.txt", "Amina present" . PHP_EOL, FILE_APPEND | LOCK_EX);
  ```

A second problem: **file permissions**. On Linux servers the web server needs permission to write in the folder. If it does not have it, `file_put_contents()` shows a `Permission denied` warning and returns `false`. Check the return value:

```php
if (file_put_contents("log.txt", "Hi" . PHP_EOL, FILE_APPEND) === false) {
  echo "Could not save. Please tell the teacher.";
}
```

---

## ✍️ Try It

Open the [PHP Console](../studios/php-console/) and run:

```php
<?php
file_put_contents("clean-up.txt", "Volunteers:" . PHP_EOL);
file_put_contents("clean-up.txt", "Hamza" . PHP_EOL, FILE_APPEND);
file_put_contents("clean-up.txt", "Fatima" . PHP_EOL, FILE_APPEND);
echo file_get_contents("clean-up.txt");
```

Output:

```text
Volunteers:
Hamza
Fatima
```

*Hint*: Remove `FILE_APPEND` from the Fatima line and run it again. Predict what is left before you look.

---

## 📝 Recap

- `file_put_contents()` **overwrites** a file, and creates it if it does not exist.
- Add `FILE_APPEND` to add to the end; add `LOCK_EX` so two writers do not clash.
- `fopen()` with `"w"` empties the file; with `"a"` it appends.
- End every line with `PHP_EOL`, and keep each entry on one line.
- Save what visitors type as it is, check its length, and escape it with `htmlspecialchars()` when you print it.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which flag makes `file_put_contents()` add to the end of a file?
2. Which constant gives the right line ending for the server?
3. Which flag locks a file while writing?

<details>
<summary>Show answer</summary>

1. **`FILE_APPEND`**.
2. **`PHP_EOL`**.
3. **`LOCK_EX`**.

</details>

### 🟡 Level 2: Apply
1. Why does a busy guestbook need `LOCK_EX`?
2. What happens when you call `file_put_contents()` on a file that does not exist yet?

<details>
<summary>Show answer</summary>

1. Two visitors might save at the same moment. Without a lock, their lines could mix together. With `LOCK_EX`, one write finishes before the next begins.
2. PHP **creates** the file (as long as the folder exists and PHP may write there).

</details>

### 🔴 Level 3: Challenge
Build a **visitor counter** and a **study to-do list**.

1. `counter.php`: read a number from `counter.txt` (start at 0 if the file is missing), add 1, save it, and print *"You are visitor number N."*
2. `todo.php`: a form with one input `task`. On POST, check the task is 1 to 100 characters, then append it to `tasks.txt`.
3. Below the form, show every task as a checklist (`<input type="checkbox">` + escaped text).

<details>
<summary>Show one possible answer</summary>

```php
<?php
// counter.php
$file = "counter.txt";
$count = file_exists($file) ? (int) file_get_contents($file) : 0;
$count++;
file_put_contents($file, $count, LOCK_EX);
echo "You are visitor number $count.";
```

On the first visit it prints `You are visitor number 1.`, then 2, 3, and so on.

```php
<?php
// todo.php
$file = "tasks.txt";
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $task = trim($_POST["task"] ?? "");
  $task = str_replace(["\r", "\n"], " ", $task);
  if ($task !== "" && strlen($task) <= 100) {
    file_put_contents($file, $task . PHP_EOL, FILE_APPEND | LOCK_EX);
  }
}
$tasks = file_exists($file)
  ? file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES)
  : [];
?>
<form action="todo.php" method="POST">
  <label for="task">New task:</label>
  <input type="text" id="task" name="task" maxlength="100" required>
  <button type="submit">Add</button>
</form>
<?php foreach ($tasks as $t): ?>
  <label><input type="checkbox"> <?= htmlspecialchars($t) ?></label><br>
<?php endforeach; ?>
```

If `tasks.txt` holds `Revise fractions` and `Return library book`, the list prints:

```html
  <label><input type="checkbox"> Revise fractions</label><br>
  <label><input type="checkbox"> Return library book</label><br>
```

</details>
