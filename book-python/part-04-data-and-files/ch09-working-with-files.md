# Chapter 9: Working with Files & Context Managers 📁✍️

When your Python script finishes running, all the variables in memory disappear. To preserve information—like logs, experiment results, or research findings—we must store them persistently on disk in **files**.

---

## 💡 The Mental Model: The Open Notebook

Working with a file in code mirrors working with a physical notebook on your desk:
1. **Open** the notebook (`open()`).
2. **Read** or **Write** on the pages.
3. **Close** the notebook to protect it from damage.

If you forget to close a physical notebook, it can get stained or lost. In programming, forgetting to close files can cause data corruption or memory leaks.

---

## 🛡️ The Modern Way: Context Managers (`with open(...)`)

Python solves the danger of forgotten files with the **`with` statement** (context manager). When the code block finishes or if an error occurs, Python automatically closes the file for you!

```python
# Writing to a text file safely
with open("community_log.txt", "w", encoding="utf-8") as file:
    file.write("Community Center Activity Log\n")
    file.write("Date: 2026-09-25\n")
    file.write("Status: 150 study kits distributed.\n")

print("File written and automatically closed!")
```

### File Modes:
- **`"r"` (Read)**: Opens the file for reading. Raises `FileNotFoundError` if the file doesn't exist.
- **`"w"` (Write)**: Creates a new file or **overwrites** an existing file completely!
- **`"a"` (Append)**: Adds new text to the end of an existing file without deleting past records.

---

## 📖 Reading Files Line by Line

When working with large datasets, loading gigabytes of text into memory at once can freeze your computer. Python allows you to read files cleanly line-by-line:

```python
# Reading and printing lines
with open("community_log.txt", "r", encoding="utf-8") as file:
    for line_number, line in enumerate(file, start=1):
        print(f"Line {line_number}: {line.strip()}")
```

---

## 🛡️ Exception Handling: `try` / `except`

What if the file you want to read has been moved or deleted? Instead of letting your program crash, handle the issue gracefully:

```python
filename = "missing_sensor_data.txt"

try:
    with open(filename, "r", encoding="utf-8") as f:
        content = f.read()
        print(content)
except FileNotFoundError:
    print(f"⚠️ Notice: The file '{filename}' was not found. Initializing fallback defaults.")
except Exception as error:
    print(f"An unexpected error occurred: {error}")
```

---

## 🎯 Hands-On Mission: The Daily Reflection Journal Logger

Write a script that allows a student to log daily learning reflections to a permanent text journal:

```python
journal_file = "study_reflections.txt"

entry_date = input("Enter today's date (YYYY-MM-DD): ").strip()
lesson_learned = input("What beneficial concept did you master today? ").strip()
gratitude_note = input("What is one blessing you are grateful for today? ").strip()

with open(journal_file, "a", encoding="utf-8") as journal:
    journal.write(f"\n[{entry_date}]\n")
    journal.write(f"Learned   : {lesson_learned}\n")
    journal.write(f"Gratitude : {gratitude_note}\n")
    journal.write("-" * 40 + "\n")

print("✨ Your reflection has been safely recorded in", journal_file)
```
