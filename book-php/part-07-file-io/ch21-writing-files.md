# Chapter 21: Writing & Appending Files ✍️💾

---

## 1. 🌟 Real-Life Situation: The Guestbook at a Museum

Imagine visiting a science museum:
- On a wooden pedestal by the exit sits a large bound leather guestbook.
- When you write your name and note: *"Loved the dinosaur exhibit! — Ali, Class 9"*, you do not erase the 500 signatures written by visitors earlier that morning!
- You flip to the next blank line and **APPEND** your signature at the bottom.

In computer storage:
- **Writing (Overwrite)**: Wipes out whatever was on the paper and starts from scratch.
- **Appending**: Preserves all existing history and writes new entries at the very end!

---

## 2. 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- Write and overwrite files cleanly with `file_put_contents()`.
- Append data to existing files using the `FILE_APPEND` flag.
- Lock files during write operations using `LOCK_EX` to prevent race conditions.
- Work with traditional file writing modes (`"w"`, `"a"`) in `fopen()`.
- Build a persistent visitor log and guestbook system.

---

## 3. 👁️ Visual Concept Explanation

### Overwrite vs. Append

```text
OVERWRITE (Default Mode):
Existing Content: [ Entry 1 ] [ Entry 2 ]
Action: file_put_contents("log.txt", "New Entry");
Result: [ New Entry ]   (All previous entries were destroyed!) 💥

APPEND (FILE_APPEND Flag):
Existing Content: [ Entry 1 ] [ Entry 2 ]
Action: file_put_contents("log.txt", "New Entry", FILE_APPEND);
Result: [ Entry 1 ] [ Entry 2 ] [ New Entry ]  (History preserved!) ✅
```

---

## 4. 💻 Code Example: An Interactive Guestbook

Save this as `guestbook.php`:

```php
<?php
  $dataFile = "guestbook.txt";
  $msg = "";

  // Handle new entry
  if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $visitor = trim(htmlspecialchars($_POST["visitor_name"] ?? ""));
    $comment = trim(htmlspecialchars($_POST["visitor_comment"] ?? ""));

    if (!empty($visitor) && !empty($comment)) {
      $timestamp = date("Y-m-d H:i:s");
      // Format entry as a clean pipe-delimited line
      $newEntry = "$timestamp | $visitor | $comment" . PHP_EOL;

      // Append entry with exclusive file lock
      file_put_contents($dataFile, $newEntry, FILE_APPEND | LOCK_EX);
      $msg = "Thank you for signing the guestbook!";
    }
  }

  // Read existing entries
  $entries = [];
  if (file_exists($dataFile)) {
    $lines = file($dataFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    $entries = array_reverse($lines); // Show newest entries first!
  }
?>
<!DOCTYPE html>
<html>
<head>
  <title>Class 9 Guestbook</title>
  <style>
    body { font-family: sans-serif; max-width: 500px; margin: 30px auto; padding: 20px; }
    .entry-card { background: #f8fafc; border-left: 4px solid #7c3aed; padding: 10px 14px; margin-bottom: 12px; border-radius: 4px; }
    input, textarea { width: 100%; padding: 8px; margin: 6px 0 14px; box-sizing: border-box; }
    button { background: #7c3aed; color: #fff; border: none; padding: 10px 18px; border-radius: 6px; cursor: pointer; }
  </style>
</head>
<body>

  <h2>📖 Digital Guestbook</h2>

  <?php if ($msg): ?>
    <p style="color: green; font-weight: bold;"><?= $msg ?></p>
  <?php endif; ?>

  <form action="" method="POST">
    <label>Your Name:</label>
    <input type="text" name="visitor_name" required>

    <label>Message:</label>
    <textarea name="visitor_comment" rows="3" required></textarea>

    <button type="submit">Sign Guestbook</button>
  </form>

  <hr style="margin: 25px 0;">

  <h3>Recent Messages (<?= count($entries) ?>)</h3>
  <?php foreach ($entries as $e): ?>
    <?php list($time, $author, $text) = explode(" | ", $e, 3); ?>
    <div class="entry-card">
      <strong><?= $author ?></strong> <small style="color:#64748b;">(<?= $time ?>)</small><br>
      <?= $text ?>
    </div>
  <?php endforeach; ?>

</body>
</html>
```

---

## 5. 🔍 Code Explanation: Breaking It Down Line by Line

- `PHP_EOL`: The system-independent **End of Line** constant. On Windows it creates `\r\n`, on Linux/Mac it creates `\n`.
- `FILE_APPEND`: Tells `file_put_contents()` to move the cursor to the end of the file instead of wiping it.
- `LOCK_EX`: Acquires an **Exclusive Lock** on the file while writing. If two visitors hit submit at the exact same millisecond, PHP queues them up safely so their data doesn't get scrambled!
- `file($dataFile, ...)`: Reads the entire text file directly into an array where each line becomes an array element.
- `list($time, $author, $text) = explode(" | ", $e, 3)`: Breaks the line back apart into individual variables!

---

## 6. 🌍 Real-World Connection: JSON Databases

Small web projects often persist data directly to a `.json` file:
```php
$posts = json_decode(file_get_contents("posts.json"), true);
$posts[] = ["title" => "My Day", "likes" => 1];
file_put_contents("posts.json", json_encode($posts, JSON_PRETTY_PRINT));
```
No database server required!

---

## 7. ⚠️ Common Beginner Traps

1. **Accidentally Overwriting**:
   Forgetting `FILE_APPEND` deletes all previous data in the file!
2. **File Permissions (Linux/macOS)**:
   If the web server user (`www-data` or `apache`) does not have write permissions (`chmod 775`), `file_put_contents` throws a `Permission Denied` fatal error!

---

## 8. 🔮 Predict the Output

```php
<?php
  file_put_contents("test.txt", "Alpha");
  file_put_contents("test.txt", "Beta");
  echo file_get_contents("test.txt");
?>
```

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> <code>Beta</code>! Because <code>FILE_APPEND</code> was omitted, the second call overwrote the first call.
</details>

---

## 9. 🕵️ Code Detective: The Scrambled Log

```php
<?php
  // Developer tried to log an access event:
  file_put_contents("hits.log", "User visited page", FILE_APPEND);
  file_put_contents("hits.log", "Another visit", FILE_APPEND);
?>
```

- **Find the bug**: When you open `hits.log`, it reads: `User visited pageAnother visit`.
- **Explain**: The developer forgot to append a newline `\n` or `PHP_EOL`!
- **Fix**:
  ```php
  file_put_contents("hits.log", "User visited page" . PHP_EOL, FILE_APPEND);
  ```

---

## 10. 🏆 5 Levels of Mastery Exercises

### 🟢 Level 1: Recall
1. What flag tells `file_put_contents()` to append data to the end of a file?
2. What constant represents the platform-independent End of Line character?
3. What flag locks a file exclusively while writing?

### 🟡 Level 2: Understand
4. Why is file locking (`LOCK_EX`) crucial on busy websites with multiple visitors?
5. How does `json_encode($data, JSON_PRETTY_PRINT)` make saving arrays to disk easy?

### 🟠 Level 3: Apply
6. Build a Hit Counter: create a script `counter.php` that reads an integer from `counter.txt`, increments it by 1, writes it back, and displays: *"You are visitor #..."*.

### 🔵 Level 4: Think & Troubleshoot
7. What happens if you call `file_put_contents()` on a file that does not exist yet? (Hint: PHP creates it automatically!).

### 🟣 Level 5: Create & Build
8. Build a Persistent To-Do List Application: store tasks in a text file. Allow users to type a task, submit it to append to the file, and display all existing tasks as a checklist.
