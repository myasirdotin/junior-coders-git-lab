# Chapter 12: Reading File Contents & Output Redirection

## 🌟 Real-Life Story

The school library keeps a daily notebook. Each day the librarian writes one new line at the bottom: when it opened, how many books came back, any problems. She never tears out old pages. When the head teacher asks, "Were there any problems this week?", she runs her finger down the pages and reads only the lines about problems. In this chapter, you will do all of this from the terminal: read a file, add lines to the end, and find just the lines you need.

> **Key Idea**: You can read a short file without opening an editor. You can send a command's output **into** a file with `>` and `>>`. And you can pass one command's output **to** another command with the **pipe** `|`.

## 🎯 What You Will Learn

- Print a file on the screen, all at once or page by page.
- Show only the first or last lines of a file.
- Tell the difference between `>` (replace) and `>>` (add to the end).
- Search for words inside a file.
- Join two commands with a pipe `|`.

## Printing a File on the Screen

| Task | CMD | PowerShell |
| :--- | :--- | :--- |
| Print the whole file | `type log.txt` | `type log.txt` or `Get-Content log.txt` |
| One screen at a time | `more log.txt` | `more log.txt` |
| First 2 lines | (no simple way) | `Get-Content log.txt -Head 2` |
| Last line | (no simple way) | `Get-Content log.txt -Tail 1` |

Here is the library's `log.txt`, printed in **CMD**:

```text
C:\JuniorCoders\practice\library>type log.txt
Library opened
Error: printer offline
Books returned: 12
error: scanner jammed
```

In **PowerShell**, `type` is a short name for `Get-Content`. The result is the same.

For long files, `more` shows one screenful, then waits. Press <kbd>Space</kbd> for the next page, or <kbd>Q</kbd> to stop.

The first and last lines in **PowerShell**:

```text
PS C:\JuniorCoders\practice\library> Get-Content log.txt -Head 2
Library opened
Error: printer offline
PS C:\JuniorCoders\practice\library> Get-Content log.txt -Tail 1
error: scanner jammed
```

`-Tail` is very useful for logs, where the newest lines are at the bottom.

> [!NOTE]
> **Git Bash / macOS**: `cat log.txt` prints a file. `less log.txt` shows it page by page (<kbd>Q</kbd> quits). `head -n 2 log.txt` and `tail -n 1 log.txt` show the first and last lines.

## Redirection: `>` and `>>`

Most commands print their result on the screen. **Redirection** sends that result into a file instead.

- **`>`** creates the file, or **replaces everything** already in it.
- **`>>`** **adds** to the end of the file and keeps what was there.

You met `>` in Chapter 7. Now let us build a file one line at a time.

**CMD**:

```text
C:\JuniorCoders\practice\library>echo Reading Club Project> README.md

C:\JuniorCoders\practice\library>echo Made by Year 7 volunteers>> README.md

C:\JuniorCoders\practice\library>echo License: MIT>> README.md

C:\JuniorCoders\practice\library>type README.md
Reading Club Project
Made by Year 7 volunteers
License: MIT
```

Notice there is no space before `>` and `>>`. In CMD, a space there would be saved at the end of the line.

**PowerShell** (put the text in quotes):

```text
PS C:\JuniorCoders\practice\library> echo 'Reading Club Project' > README.md
PS C:\JuniorCoders\practice\library> echo 'Made by Year 7 volunteers' >> README.md
PS C:\JuniorCoders\practice\library> echo 'License: MIT' >> README.md
PS C:\JuniorCoders\practice\library> type README.md
Reading Club Project
Made by Year 7 volunteers
License: MIT
```

The first command used `>` to start a fresh file. The next two used `>>` to add lines. If you used `>` for all three, only `License: MIT` would be left.

> [!NOTE]
> **Git Bash / macOS** use `>` and `>>` the same way: `echo "License: MIT" >> README.md`.

## Finding Words Inside a File

| Task | CMD | PowerShell |
| :--- | :--- | :--- |
| Find a word | `findstr Error log.txt` | `Select-String Error log.txt` |
| Ignore capital letters | `findstr /i error log.txt` | `Select-String error log.txt` |
| Show line numbers | `findstr /n Error log.txt` | (always shown) |

**CMD** is exact about capital letters unless you add `/i` (**i**gnore case):

```text
C:\JuniorCoders\practice\library>findstr Error log.txt
Error: printer offline

C:\JuniorCoders\practice\library>findstr /i /n error log.txt
2:Error: printer offline
4:error: scanner jammed
```

**PowerShell**'s `Select-String` ignores capital letters by itself. It shows the file name and line number too:

```text
PS C:\JuniorCoders\practice\library> Select-String error log.txt

log.txt:2:Error: printer offline
log.txt:4:error: scanner jammed
```

> [!NOTE]
> **Git Bash / macOS**: `grep Error log.txt` finds a word. `grep -i -n error log.txt` ignores capitals and shows line numbers.

## The Pipe: `|`

The **pipe** sign `|` connects two commands. The output of the first command becomes the input of the second. It is like a water pipe carrying water from one tank to the next. On most keyboards, `|` is <kbd>Shift</kbd> + <kbd>\</kbd>.

**CMD**: print the log, but keep only the lines with "Books":

```text
C:\JuniorCoders\practice\library>type log.txt | findstr Books
Books returned: 12
```

**PowerShell**:

```text
PS C:\JuniorCoders\practice\library> Get-Content log.txt | Select-String Books

Books returned: 12
```

Pipes also work with listings. This shows only the names that contain `html`:

```text
C:\JuniorCoders\practice\library>dir /b | findstr html
index.html
```

In PowerShell: `dir -Name | Select-String html`. And for a very long listing, `dir | more` shows it one page at a time.

## ⚠️ Common Mistake

**Using `>` when you meant `>>`.** Hassan wants to add a line to the library's book list:

```text
C:\JuniorCoders\practice\library>echo The Night Sky Atlas> books.txt
```

The list had 40 titles. Now it has one. There is no warning and no Recycle Bin. Fixed:

```text
C:\JuniorCoders\practice\library>echo The Night Sky Atlas>> books.txt
```

Before using `>`, ask: *"Is this file new, or do I want to replace it?"*

**`#` in PowerShell without quotes.** In PowerShell, `#` starts a **comment**. Everything after it is ignored. Fatima wants her README to start with a title line, `# Reading Club Project`. She types:

```text
PS C:\JuniorCoders\practice\library> echo # Reading Club Project > README.md

cmdlet Write-Output at command pipeline position 1
Supply values for the following parameters:
InputObject[0]:
```

PowerShell saw only `echo` and is now waiting for text. Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to cancel, then use quotes: `echo '# Reading Club Project' > README.md`.

## ✍️ Try It

In `C:\JuniorCoders\practice`, make a folder `library` and go into it. Then:

1. Create `log.txt` with the line `System started` (use `>`).
2. Add `Database connected` and then `Error: backup failed` (use `>>`).
3. Print the whole file.
4. Show only the line with `Error`.

*Hint*: In PowerShell, use quotes around each text. In CMD, leave no space before `>`.

## 📝 Recap

- `type` prints a file in CMD and PowerShell. `more` shows it page by page.
- `Get-Content file -Head N` and `-Tail N` show the first or last lines in PowerShell.
- `>` creates or **replaces** a file. `>>` **adds** to the end.
- `findstr` (CMD) and `Select-String` (PowerShell) find words inside files.
- The pipe `|` sends one command's output into the next command.

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which command prints a file in CMD? Which one in Git Bash?
2. What is the difference between `>` and `>>`?
3. Which command searches inside files in CMD? And in PowerShell?

<details>
<summary>Show answer</summary>

1. `type` in CMD (also in PowerShell). `cat` in Git Bash.
2. `>` replaces everything in the file. `>>` adds new lines at the end and keeps the old ones.
3. `findstr` in CMD. `Select-String` in PowerShell.

</details>

### 🟡 Level 2: Apply
A file `visits.txt` holds:

```text
Monday: 31 visitors
Tuesday: 27 visitors
Wednesday: closed for cleaning
Thursday: 35 visitors
```

1. Write a CMD command that shows only the Wednesday line.
2. Write a PowerShell command that shows only the last two lines.
3. Write a CMD command that adds `Friday: 40 visitors` without losing anything.

<details>
<summary>Show answer</summary>

1. `findstr Wednesday visits.txt` (or `type visits.txt | findstr Wednesday`). Output: `Wednesday: closed for cleaning`.
2. `Get-Content visits.txt -Tail 2`. Output: the Wednesday and Thursday lines.
3. `echo Friday: 40 visitors>> visits.txt`

</details>

### 🔴 Level 3: Challenge
A developer meant to type `echo done >> important-data.sql` but typed `echo done > important-data.sql`.

1. What happened to `important-data.sql`?
2. How could a pipe and `findstr` have helped them check the file **before** changing it?
3. Write two habits that protect files from this mistake. How do they show *Iḥsān* (careful, excellent work)?

<details>
<summary>Show one possible answer</summary>

1. All the data was replaced. The file now holds only the word `done`. It did not go to the Recycle Bin.
2. For example, `type important-data.sql | more` to look at it first, or `findstr done important-data.sql` to see whether the line is already there. Looking first would remind them the file is valuable.
3. Habits:
   - Read the line before pressing Enter, and check `>` versus `>>`.
   - Make a backup copy first: `copy important-data.sql important-data.backup.sql`.

*Iḥsān* means doing work as if it matters, because it does. Slowing down for a second protects other people's data, which is a trust (*Amānah*).

</details>
