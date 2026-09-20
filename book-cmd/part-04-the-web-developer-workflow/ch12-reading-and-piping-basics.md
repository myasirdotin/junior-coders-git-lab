# Chapter 12: Reading File Contents & Output Redirection

> **Key Idea**: You don't always need to open a text editor just to read a 5-line configuration file or check a log. You can print file contents directly to your terminal screen, and stream output into new files using redirection.

---

## 1. Printing Files to the Screen

To inspect the contents of a text or code file right inside the terminal:

| Action | Windows Command Prompt (CMD) | Git Bash / macOS / Linux |
| :--- | :--- | :--- |
| **Print entire file** | `type filename.txt` | `cat filename.txt` |
| **View page by page** | `more filename.txt` | `less filename.txt` |
| **View first 10 lines** | `powershell -c "gc filename.txt -head 10"` | `head -n 10 filename.txt` |
| **View last 10 lines** | `powershell -c "gc filename.txt -tail 10"` | `tail -n 10 filename.txt` |

### Example in Windows CMD:
```text
C:\xampp\htdocs\my-site> type index.html
<!DOCTYPE html>
<html>
  <head><title>My Site</title></head>
  <body><h1>Welcome to Junior Coders!</h1></body>
</html>
```

---

## 2. Redirection: `>` vs. `>>`

Every command produces output. By default, that output appears on your screen.
Using redirection operators, you can send that output into a file instead!

### 1. The Overwrite Operator (`>`):
Sends output to a file. If the file exists, it **erases its old contents** and writes fresh text:
```text
echo # My Project Title > README.md
```

### 2. The Append Operator (`>>`):
Adds new lines to the **very end** of the file without erasing anything:
```text
echo Author: Yasir Rasool >> README.md
echo License: MIT >> README.md
```

Now let's inspect `README.md`:
```text
type README.md
```
*Output:*
```text
# My Project Title
Author: Yasir Rasool
License: MIT
```

---

## 3. Finding Text inside Files: `findstr` & `grep`

When searching for a specific keyword across dozens of files:

| Action | Windows Command Prompt | Git Bash / Linux |
| :--- | :--- | :--- |
| **Search keyword in file** | `findstr "keyword" file.txt` | `grep "keyword" file.txt` |
| **Case-insensitive search**| `findstr /i "keyword" file.txt` | `grep -i "keyword" file.txt` |
| **Search across all files** | `findstr /s /i "TODO" *.js` | `grep -ri "TODO" *.js` |

---

## 4. Review & Practice

### 🟢 Level 1: Recall
1. What command reads and prints the content of a file in Windows CMD? What command does this in Git Bash?
2. What is the critical difference between `>` and `>>`?
3. Which search tool searches for text inside files in Windows CMD?

### 🟡 Level 2: Log Appender Drill
1. Create a file called `log.txt` with the text: `System started`.
2. Append a second line: `Database connected`.
3. Read the file with `type log.txt` (or `cat log.txt`) to verify both lines exist.

### 🔴 Level 3: Defensive Operation (*Amānah*)
A developer accidentally typed:
`echo "done" > important_data.sql` instead of `echo "done" >> important_data.sql`.
What catastrophic error did they cause to `important_data.sql`? How does this teach us the importance of carefulness (*Iḥsān*) when using `>`?
