# Chapter 20: Reading Files in PHP 📂📖

---

## 1. 🌟 Real-Life Situation: Opening the Filing Cabinet

Imagine the school administrative office:
- When a new teacher asks for the class attendance register, the secretary walks over to the metal filing cabinet.
- They check the drawer label: *"Class 9 Attendance 2026"* (`file_exists()`).
- They pull out the physical folder, open it on the desk (`fopen()`), and read the student names line by line (`fgets()`).
- Once finished, they close the folder and slide it safely back into the drawer (`fclose()`).

In web development, not all data lives in huge MySQL databases. Simple applications, configuration files, error logs, and CSV spreadsheets are stored directly as **Files** on the server's hard drive!

---

## 2. 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- Read an entire file into memory in one step using `file_get_contents()`.
- Verify file existence before reading using `file_exists()`.
- Open, stream, and read large files line-by-line using `fopen()`, `fgets()`, and `fclose()`.
- Read CSV (Comma Separated Values) data using `fgetcsv()`.
- Prevent security leaks by ensuring visitors cannot read sensitive files outside your root folder.

---

## 3. 👁️ Visual Concept Explanation

### The Two Ways to Read Files in PHP

```text
METHOD 1: ALL-AT-ONCE (For small files < 10MB)
┌─────────────────────────────────────────────────────────────┐
│ $content = file_get_contents("notes.txt");                  │
│ • Reads whole file into one string in 1 line of code        │
│ • Super simple and fast for JSON files, templates, notes    │
└─────────────────────────────────────────────────────────────┘

METHOD 2: LINE-BY-LINE STREAMING (For large logs & CSVs)
┌─────────────────────────────────────────────────────────────┐
│ $handle = fopen("large_log.txt", "r");                      │
│ while (($line = fgets($handle)) !== false) {                │
│   echo $line;                                               │
│ }                                                           │
│ fclose($handle);                                            │
│ • Uses minimal RAM! Reads 1 line at a time from disk        │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. 💻 Code Example: Reading Notes and CSV Spreadsheets

```php
<?php
  // 1. Safe One-Liner with file_get_contents()
  $filename = "announcements.txt";

  echo "<h2>1. School Announcements (file_get_contents)</h2>";
  if (file_exists($filename)) {
    $rawText = file_get_contents($filename);
    // nl2br converts text newlines to HTML <br> tags!
    echo "<div style='background:#f1f5f9; padding:15px; border-radius:8px;'>";
    echo nl2br(htmlspecialchars($rawText));
    echo "</div>";
  } else {
    echo "<p style='color:orange;'>Notice: $filename does not exist yet.</p>";
  }

  // 2. Reading CSV Line-by-Line with fgetcsv()
  $csvFile = "students.csv";
  echo "<h2>2. Student Roster (fgetcsv)</h2>";

  if (file_exists($csvFile)) {
    $handle = fopen($csvFile, "r");
    if ($handle !== false) {
      echo "<table border='1' cellpadding='6' style='border-collapse:collapse;'>";
      echo "<tr><th>ID</th><th>Name</th><th>Grade</th><th>Score</th></tr>";

      while (($row = fgetcsv($handle, 1000, ",")) !== false) {
        // $row is an array: [0 => "101", 1 => "Amina", 2 => "9", 3 => "95"]
        echo "<tr>";
        foreach ($row as $cell) {
          echo "<td>" . htmlspecialchars($cell) . "</td>";
        }
        echo "</tr>";
      }

      echo "</table>";
      fclose($handle); // Always release the file lock!
    }
  }
?>
```

---

## 5. 🔍 Code Explanation: Breaking It Down Line by Line

- `file_exists($filename)`: Verifies the file is present before attempting to read it, preventing ugly PHP warnings.
- `nl2br()`: Translates `\n` newline characters inside the text file into HTML `<br>` tags so line formatting is preserved in the browser.
- `fopen($csvFile, "r")`: Opens the file in read-only mode (`"r"`), returning a resource pointer.
- `fgetcsv($handle)`: Automatically splits comma-delimited lines into clean PHP arrays!
- `fclose($handle)`: Closes the stream, freeing server RAM and releasing system file locks.

---

## 6. 🌍 Real-World Connection: Server Error Logs

Every time a website crashes, web servers write details to `error.log`.
DevOps engineers write PHP scripts that read these log files line-by-line using `fopen()` and `fgets()` to detect crashes and send emergency alerts to developers on Slack or Discord!

---

## 7. ⚠️ Common Beginner Traps

1. **Forgetting `fclose()`**:
   Leaving file pointers open locks files and causes memory leaks.
2. **Directory Traversal Security Flaw**:
   Never let users pass raw file paths:
   ```php
   $page = $_GET['file']; // Hacker passes: ../../etc/passwd !
   include($page); // ❌ Vulnerable to Local File Inclusion (LFI)!
   ```
   *Fix*: Use `basename($page)` or whitelist allowed filenames!

---

## 8. 🔮 Predict the Output

If a file `quote.txt` contains 3 lines of text, how many times will a `while (($line = fgets($file)) !== false)` loop run?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> Exactly 3 times, once for each line, before <code>fgets()</code> hits the End of File (EOF) and returns <code>false</code>.
</details>

---

## 9. 🕵️ Code Detective: The Infinite Loop

```php
<?php
  $f = fopen("data.txt", "r");
  while ($line = fgets($f)) {
    echo $line;
  }
  // The file has a line containing just the character "0"!
?>
```

- **Find the bug**: If a line in the file is `"0"`, PHP evaluates `$line` as false and prematurely stops reading!
- **Explain**: Loose evaluation stops on `"0"`.
- **Fix**: Use strict comparison: `while (($line = fgets($f)) !== false)`.

---

## 10. 🏆 5 Levels of Mastery Exercises

### 🟢 Level 1: Recall
1. What function checks if a file exists on the server?
2. What mode string in `fopen()` opens a file for reading only?
3. What function closes an open file pointer?

### 🟡 Level 2: Understand
4. When should you use `file_get_contents()` versus `fopen()` with `fgets()`?
5. What does the `filesize()` function return?

### 🟠 Level 3: Apply
6. Write a script that reads a text file containing one motivational quote per line, picks one line at random with `rand()`, and displays it as the "Daily Quote".

### 🔵 Level 4: Think & Troubleshoot
7. How does `file()` differ from `file_get_contents()`? (Hint: `file()` reads the entire document directly into an array of lines!).

### 🟣 Level 5: Create & Build
8. Build a CSV Gradebook Viewer: create a file `grades.csv` with 5 students and their subject marks. Write a PHP script that reads the CSV, calculates the class average for each subject, and renders a color-coded HTML report table.
