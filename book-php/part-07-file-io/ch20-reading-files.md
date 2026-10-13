# Chapter 20: Reading Files in PHP 📂

---

## 🌟 Real-Life Story

A teacher asks the school office for the Class 9 attendance register. The secretary first checks the drawer label to see if the folder is there. Then she opens the folder on her desk and reads the names one line at a time. When she is done, she closes the folder and puts it back. PHP reads files on the server in the very same steps: check, open, read, close.

---

## 🎯 What You Will Learn

- Check that a file exists with `file_exists()` before reading it.
- Read a whole file into one string with `file_get_contents()`.
- Read a file line by line with `fopen()`, `fgets()` and `fclose()`.
- Read CSV data (spreadsheet rows) with `fgetcsv()`.
- Stop visitors from choosing which file your script opens.

---

## 👁️ Visual Concept Explanation

Not all data lives in a database. Notes, settings, logs and small tables are often plain **files** on the server's disk.

A **CSV file** (Comma-Separated Values) is a text file where each line is a row and commas separate the columns:

```text
101,Amina,9,95
102,Omar,9,88
```

### The Two Ways to Read Files in PHP

```text
WAY 1: ALL AT ONCE (small files)
+------------------------------------------+
| $text = file_get_contents("notes.txt");  |
| - whole file in one string, one line     |
| - good for notes, JSON, templates        |
+------------------------------------------+

WAY 2: LINE BY LINE (big files, CSV)
+------------------------------------------+
| $h = fopen("log.txt", "r");              |
| while (($line = fgets($h)) !== false) {  |
|   echo $line;                            |
| }                                        |
| fclose($h);                              |
| - holds one line in memory at a time     |
+------------------------------------------+
```

A **file handle** (`$h` above) is PHP's bookmark for an open file. `fgets()` uses it to remember which line comes next.

---

## 💻 Code Example: Reading Notes and a CSV Roster

Put these two files next to your PHP script.

`announcements.txt`:

```text
Science fair on Monday.
Library closes at 3 pm.
```

`students.csv`:

```text
101,Amina,9,95
102,Omar,9,88
```

`read.php`:

```php
<?php
  // 1. Read a whole file with file_get_contents()
  $filename = "announcements.txt";

  echo "<h2>School Announcements</h2>\n";
  if (file_exists($filename)) {
    $rawText = file_get_contents($filename);
    // nl2br() turns each newline into an HTML <br>
    echo nl2br(htmlspecialchars($rawText));
  } else {
    echo "<p>Notice: $filename does not exist yet.</p>\n";
  }

  // 2. Read a CSV file row by row with fgetcsv()
  $csvFile = "students.csv";
  echo "\n<h2>Student Roster</h2>\n";

  if (file_exists($csvFile)) {
    $handle = fopen($csvFile, "r");
    if ($handle !== false) {
      echo "<table border='1'>\n";
      echo "<tr><th>ID</th><th>Name</th><th>Grade</th><th>Score</th></tr>\n";

      while (($row = fgetcsv($handle)) !== false) {
        // $row is an array like ["101", "Amina", "9", "95"]
        echo "<tr>";
        foreach ($row as $cell) {
          echo "<td>" . htmlspecialchars($cell) . "</td>";
        }
        echo "</tr>\n";
      }

      echo "</table>\n";
      fclose($handle); // Close the file when you are done
    }
  }
?>
```

Output:

```html
<h2>School Announcements</h2>
Science fair on Monday.<br />
Library closes at 3 pm.<br />

<h2>Student Roster</h2>
<table border='1'>
<tr><th>ID</th><th>Name</th><th>Grade</th><th>Score</th></tr>
<tr><td>101</td><td>Amina</td><td>9</td><td>95</td></tr>
<tr><td>102</td><td>Omar</td><td>9</td><td>88</td></tr>
</table>
```

---

## 🔍 Code Explanation: Breaking It Down Line by Line

- `file_exists($filename)`: Checks that the file is there before reading. Without it, a missing file gives a warning.
- `nl2br()`: Turns each newline in the text into an HTML `<br />` tag, so the lines stay separate in the browser.
- `htmlspecialchars()`: File text can contain `<` or `>` too. Escape it before printing, just like form input.
- `fopen($csvFile, "r")`: Opens the file for **reading only** (`"r"`). It returns a file handle, or `false` if it fails.
- `fgetcsv($handle)`: Reads the next line and splits it at the commas into an array. At the end of the file it returns `false`.
- `fclose($handle)`: Closes the file and frees the handle.

---

## 🌍 Real-World Connection: Server Error Logs

Web servers write problems into a file such as `error.log`. Such logs can grow very large. Developers write PHP scripts that read them line by line with `fopen()` and `fgets()`, look for errors, and warn the team. Reading line by line means even a huge log never fills the server's memory.

---

## 🔮 Predict the Output

A file `quote.txt` has 3 lines of text. How many times does this loop run?

```php
while (($line = fgets($file)) !== false) { ... }
```

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> Exactly 3 times, once per line. Then <code>fgets()</code> reaches the end of the file (EOF) and returns <code>false</code>.
</details>

---

## 🕵️ Code Detective: The Vanishing Last Line

```php
<?php
  $f = fopen("data.txt", "r");
  while ($line = fgets($f)) {
    echo $line;
  }
  fclose($f);
?>
```

`data.txt` holds the numbers `5`, `3` and `0`, one per line, with no newline after the last `0`.

- **Find the bug**: The script prints `5` and `3`, but the last line `0` never appears.
- **Explain**: The last line is the string `"0"`. PHP treats `"0"` as false in a loose check, so the loop stops early.
- **Fix**: Compare strictly: `while (($line = fgets($f)) !== false)`.

---

## ⚠️ Common Mistake

**Letting the visitor choose the file name.**

- ❌ *Wrong*:
  ```php
  $page = $_GET['file'];   // visitor sends ../config.php
  echo file_get_contents($page);
  ```
- 😕 *What happens*: `../` means "the folder above". A visitor can climb out of your folder and read private files, such as settings with passwords. This is called **directory traversal**.
- ✅ *Fixed*: Accept only names from an **allow list**:
  ```php
  $allowed = ["rules.txt", "timetable.txt"];
  $page = $_GET['file'] ?? "rules.txt";
  if (in_array($page, $allowed, true)) {
    echo nl2br(htmlspecialchars(file_get_contents($page)));
  } else {
    echo "Sorry, that file is not available.";
  }
  ```

A smaller mistake: forgetting `fclose()`. PHP closes files when the script ends, but close each file as soon as you finish. A script that opens many files can run out of handles.

---

## ✍️ Try It

Open the [PHP Console](../studios/php-console/). It cannot read files from your computer, so first write a small file, then read it back:

```php
<?php
file_put_contents("days.txt", "Saturday\nSunday\nMonday\n");

$h = fopen("days.txt", "r");
$count = 0;
while (($line = fgets($h)) !== false) {
  $count++;
  echo "$count: " . trim($line) . "\n";
}
fclose($h);
```

Output:

```text
1: Saturday
2: Sunday
3: Monday
```

*Hint*: `file_put_contents()` writes a file; Chapter 21 explains it. `trim()` removes the newline at the end of each line, so you control the line breaks yourself.

---

## 📝 Recap

- Check with `file_exists()` before you read.
- `file_get_contents()` reads a small file into one string.
- `fopen()` + `fgets()` + `fclose()` read big files one line at a time; `fgetcsv()` splits CSV lines into arrays.
- Always loop with `!== false`, so a line like `"0"` does not stop the loop.
- Escape file text with `htmlspecialchars()`, and never let visitors pick the file path.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which function checks that a file exists?
2. Which mode string opens a file for reading only?
3. Which function closes an open file?

<details>
<summary>Show answer</summary>

1. **`file_exists()`**.
2. **`"r"`**.
3. **`fclose()`**.

</details>

### 🟡 Level 2: Apply
1. When should you choose `file_get_contents()`, and when `fopen()` with `fgets()`?
2. How is `file()` different from `file_get_contents()`?

<details>
<summary>Show answer</summary>

1. Use `file_get_contents()` for small files you need all at once. Use `fopen()` + `fgets()` for big files, such as logs, so only one line is in memory.
2. `file_get_contents()` returns **one string**. `file()` returns an **array**, with one line in each item. For example, `count(file("quotes.txt"))` tells you how many lines the file has.

</details>

### 🔴 Level 3: Challenge
Build a **Thought of the Day** page.

1. Make `thoughts.txt` with one wise saying per line (for example, *"Knowledge grows when it is shared."*).
2. Read the lines into an array with `file()`. Use the flags `FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES`.
3. Pick one line with `rand(0, count($lines) - 1)` and print it, escaped.
4. Show a friendly message if the file is missing.
5. Extra: make `grades.csv` with 5 students and marks in two subjects. Read it with `fgetcsv()` and print the class average for each subject.

<details>
<summary>Show one possible answer</summary>

```php
<?php
$file = "thoughts.txt";

if (file_exists($file)) {
  $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
  $pick = $lines[rand(0, count($lines) - 1)];
  echo "<blockquote>" . htmlspecialchars($pick) . "</blockquote>";
} else {
  echo "<p>No thoughts yet. Please add thoughts.txt.</p>";
}
```

With one line in the file, *Knowledge grows when it is shared.*, it prints:

```html
<blockquote>Knowledge grows when it is shared.</blockquote>
```

Averages (each row: `name,maths,science`):

```php
<?php
$h = fopen("grades.csv", "r");
$mathsTotal = 0;
$scienceTotal = 0;
$students = 0;
while (($row = fgetcsv($h)) !== false) {
  $mathsTotal += (int) $row[1];
  $scienceTotal += (int) $row[2];
  $students++;
}
fclose($h);
echo "Maths average: " . round($mathsTotal / $students, 1) . "\n";
echo "Science average: " . round($scienceTotal / $students, 1) . "\n";
```

For marks 80/70, 90/85, 70/90, 85/75 and 95/80 it prints:

```text
Maths average: 84
Science average: 80
```

</details>
