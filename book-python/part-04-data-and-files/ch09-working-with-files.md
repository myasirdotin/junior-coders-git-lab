# Chapter 9: Working with Files & Context Managers

## 🌟 Real-Life Story

In the science lab, each experiment is written in a logbook. When the bell rings, students go home, but the logbook stays on the shelf. Next week, the class opens it and carries on. A Python program is like a lesson that ends at the bell. When it stops, all its variables are wiped from memory. To keep information for next time, a program writes it into a **file**, the computer's logbook.

## 🎯 What You Will Learn

- Open a file with `open()` and choose a mode: read, write or append.
- Use `with` so that files are always closed safely.
- Write lines of text, then read them back all at once or line by line.
- Split each line into pieces of data and calculate with them.
- Recognise `FileNotFoundError` and avoid wiping a file by accident.

## Open, Use, Close

Working with a file is like working with a real notebook:

1. **Open** the notebook: `open()`.
2. **Read** or **write** on its pages.
3. **Close** it so nothing gets damaged.

If a program forgets to close a file, some of the text may never be saved. Python has a safe way to make sure that never happens: the `with` statement.

> 💻 **Where files are saved**: on a computer, files are saved in the folder you run Python from. In the Python Console on this website, files live in the browser's temporary memory. They work the same way, but disappear when you reload the page.

## File Modes

The second argument of `open()` is the **mode**. It says what you plan to do.

| Mode | Name | What it does | If the file does not exist |
| :--- | :--- | :--- | :--- |
| `"r"` | Read | Reads the file | Error: `FileNotFoundError` |
| `"w"` | Write | **Empties** the file, then writes | Creates it |
| `"a"` | Append | Adds to the **end**, keeps old text | Creates it |

We also pass `encoding="utf-8"`. An **encoding** is the rule for storing letters as numbers. UTF-8 can store every language, including Arabic, Urdu and emoji.

## Writing a File with `with`

```python
with open("club_log.txt", "w", encoding="utf-8") as file:
    file.write("Science Club Log\n")
    file.write("Date: 2026-09-25\n")
    file.write("Study kits given out: 150\n")

print("File written and closed.")
```

**Output:**

```text
File written and closed.
```

- `with open(...) as file:` opens the file and calls it `file`. This is called a **context manager**.
- When the indented block ends, Python **closes the file automatically**, even if something goes wrong.
- `.write()` does **not** add a new line for you. The `\n` at the end of each string means "new line". It is called a **newline character**.

## Reading a File

### All at Once with `.read()`

`.read()` gives back the whole file as one string.

```python
with open("club_log.txt", "r", encoding="utf-8") as file:
    content = file.read()

print(content)
print("Characters in file:", len(content))
```

**Output:**

```text
Science Club Log
Date: 2026-09-25
Study kits given out: 150

Characters in file: 60
```

There is a blank line before "Characters": the file ends with `\n`, and `print()` adds another.

### Line by Line with a `for` Loop

A `for` loop over a file gives one line at a time. This is the best way for big files, because Python never holds the whole file in memory.

```python
line_number = 0

with open("club_log.txt", "r", encoding="utf-8") as file:
    for line in file:
        line_number += 1
        print(f"Line {line_number}: {line.strip()}")
```

**Output:**

```text
Line 1: Science Club Log
Line 2: Date: 2026-09-25
Line 3: Study kits given out: 150
```

Each `line` still ends with `\n`. `.strip()` removes it. Without `.strip()`, you would see an empty line after every line.

## Appending: Adding Without Erasing

Mode `"a"` adds new text at the end and keeps everything already there.

```python
with open("club_log.txt", "a", encoding="utf-8") as file:
    file.write("Volunteers: 12\n")

with open("club_log.txt", "r", encoding="utf-8") as file:
    print(file.read())
```

**Output:**

```text
Science Club Log
Date: 2026-09-25
Study kits given out: 150
Volunteers: 12
```

## Turning Lines into Data

Files often store one record per line, with values separated by commas. The string method `.split(",")` cuts a line into a **list** of pieces.

```python
line = "Amina,12,science\n"
parts = line.strip().split(",")
print(parts)
print(parts[0], int(parts[1]) + 1)
```

**Output:**

```text
['Amina', '12', 'science']
Amina 13
```

Every piece is a **string**, so numbers must be converted with `int()` or `float()`. Now we can total a whole file:

```python
with open("reading_log.txt", "w", encoding="utf-8") as file:
    file.write("Amina,12\n")
    file.write("Bilal,30\n")
    file.write("Hana,18\n")

total_pages = 0
with open("reading_log.txt", "r", encoding="utf-8") as file:
    for line in file:
        name, pages = line.strip().split(",")
        total_pages += int(pages)
        print(f"{name} read {pages} pages")

print(f"Class total: {total_pages} pages")
```

**Output:**

```text
Amina read 12 pages
Bilal read 30 pages
Hana read 18 pages
Class total: 60 pages
```

`name, pages = ...` unpacks the two-item list into two variables, just like a tuple. In the next chapter, the `csv` module will do this splitting for us.

## When the File Is Missing

Reading a file that does not exist stops the program:

```python
with open("missing_data.txt", "r", encoding="utf-8") as file:
    print(file.read())
```

**Output:**

```text
FileNotFoundError: [Errno 2] No such file or directory: 'missing_data.txt'
```

Check the file name and the folder first. As a short preview, Python can also **catch** an error with `try` and `except`, and run a friendly message instead of crashing:

```python
try:
    with open("missing_data.txt", "r", encoding="utf-8") as file:
        print(file.read())
except FileNotFoundError:
    print("No data file yet. Starting with an empty log.")
```

**Output:**

```text
No data file yet. Starting with an empty log.
```

The code under `try` runs first. If that exact error happens, Python jumps to the `except` block. You only need this simple form for now.

## Worked Example: Daily Reflection Journal

A student keeps a short daily journal of what she learned. On a computer, the entries could come from `input()`. Here they are in a list of tuples. Append mode keeps every old entry.

```python
journal = "reflections.txt"

entries = [
    ("2026-09-24", "for loops", "my teacher's patience"),
    ("2026-09-25", "writing files", "good health")
]

for date, learned, grateful in entries:
    with open(journal, "a", encoding="utf-8") as file:
        file.write(f"[{date}]\n")
        file.write(f"Learned  : {learned}\n")
        file.write(f"Grateful : {grateful}\n")
        file.write("-" * 24 + "\n")

with open(journal, "r", encoding="utf-8") as file:
    print(file.read())
```

**Output:**

```text
[2026-09-24]
Learned  : for loops
Grateful : my teacher's patience
------------------------
[2026-09-25]
Learned  : writing files
Grateful : good health
------------------------
```

A personal journal is private. Store it only on your own device, and never share another person's notes without permission (*Amānah*).

## ⚠️ Common Mistake

**1. Using `"w"` when you meant `"a"`.** Write mode empties the file first, so the old records are lost.

```python
with open("visits.txt", "w", encoding="utf-8") as f:
    f.write("Monday: 40 visitors\n")

with open("visits.txt", "w", encoding="utf-8") as f:
    f.write("Tuesday: 35 visitors\n")

with open("visits.txt", "r", encoding="utf-8") as f:
    print(f.read())
```

**Output:**

```text
Tuesday: 35 visitors
```

Monday's line has gone! **Fix:** open the second time with `"a"` to add to the end.

**2. Forgetting `\n`.** `file.write("Line 1")` then `file.write("Line 2")` saves `Line 1Line 2` on one line. **Fix:** end each written line with `\n`.

## ✍️ Try It

Write three of your weekly goals to `goals.txt`, one per line. Then read the file back and print each goal with a number in front, like `1. Read 20 pages a day`.

**Hint:** write with mode `"w"` and `\n`; read with a `for` loop, a counter and `.strip()`.

## 📝 Recap

- Files keep data after a program ends. Open them with `open(name, mode, encoding="utf-8")`.
- `"r"` reads, `"w"` empties then writes, `"a"` adds to the end.
- `with open(...) as file:` closes the file automatically.
- `.read()` gives the whole file; a `for` loop gives one line at a time. Use `.strip()` to remove `\n`.
- `.split(",")` turns a line into a list of strings; convert numbers with `int()` or `float()`.

## 🏆 Practice

### 🟢 Level 1: Recall
Which mode would you use to (a) add a new line to an existing log, (b) start a brand-new report, (c) only look at a file?

<details>
<summary>Show answer</summary>

(a) `"a"` append, (b) `"w"` write, (c) `"r"` read.

</details>

### 🟡 Level 2: Apply
Write `"apples\n"`, `"bread\n"` and `"rice\n"` to `pantry.txt`. Then read the file and print how many lines it has.

<details>
<summary>Show answer</summary>

```python
with open("pantry.txt", "w", encoding="utf-8") as f:
    f.write("apples\n")
    f.write("bread\n")
    f.write("rice\n")

count = 0
with open("pantry.txt", "r", encoding="utf-8") as f:
    for line in f:
        count += 1
print("Lines:", count)
```

Output:

```text
Lines: 3
```

</details>

### 🔴 Level 3: Challenge
A weather station saves one reading per line as `day,temperature`.

1. Write these lines to `temps.txt`: `Sat,31`, `Sun,34`, `Mon,29`, `Tue,36`.
2. Read the file. Split each line and convert the temperature to an `int`.
3. Print the hottest day and its temperature, and the average temperature rounded to 1 decimal place.

<details>
<summary>Show one possible answer</summary>

```python
with open("temps.txt", "w", encoding="utf-8") as f:
    f.write("Sat,31\nSun,34\nMon,29\nTue,36\n")

hottest_day = ""
hottest = -100
total = 0
days = 0

with open("temps.txt", "r", encoding="utf-8") as f:
    for line in f:
        day, temp = line.strip().split(",")
        temp = int(temp)
        total += temp
        days += 1
        if temp > hottest:
            hottest = temp
            hottest_day = day

print(f"Hottest: {hottest_day} at {hottest} degrees")
print(f"Average: {round(total / days, 1)} degrees")
```

Output:

```text
Hottest: Tue at 36 degrees
Average: 32.5 degrees
```

</details>
