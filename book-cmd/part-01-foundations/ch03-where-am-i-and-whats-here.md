# Chapter 3: Where Am I? & What's Here? (Orientation)

## 🌟 Real-Life Story

Imagine you wake up in a new room during a school trip. Before you do anything, you ask two questions. *"Which room am I in?"* and *"What is in this room?"* Only then do you unpack your bag. Good terminal users do the same. Before they create, move or delete anything, they check where they are and what is around them.

> **Key Idea**: The two most important questions in the terminal are **"Where am I standing?"** and **"What is in this folder?"** Ask them before every important command.

## 🎯 What You Will Learn

- Print the folder you are standing in, in CMD, PowerShell and Git Bash.
- List the files and folders in the current folder.
- Read a `dir` listing: folders, file sizes and the special `.` and `..` entries.
- Show hidden folders such as `.git`.
- Clear a crowded screen without losing anything.

## 📍 Where Am I? Printing Your Location

In File Explorer, you look at the address bar at the top. In the terminal, you ask the computer. The folder you are standing in is called the **working directory**. "Directory" is another word for folder.

| Question | CMD | PowerShell |
| :--- | :--- | :--- |
| Where am I? | `cd` (with nothing after it) | `pwd` or `Get-Location` |

`pwd` stands for **p**rint **w**orking **d**irectory.

**CMD**:

```text
C:\JuniorCoders\practice\simple-site>cd
C:\JuniorCoders\practice\simple-site
```

**PowerShell**:

```text
PS C:\JuniorCoders\practice\simple-site> pwd

Path
----
C:\JuniorCoders\practice\simple-site
```

PowerShell prints a small table with the heading `Path`. Both answers say the same place.

"But the prompt already shows where I am!" That is true, most of the time. These commands are useful when the path is very long, or when you need to copy the exact path.

> [!NOTE]
> **Git Bash / macOS**: type `pwd`. Git Bash writes Windows paths in its own style:
> ```text
> $ pwd
> /c/JuniorCoders/practice/simple-site
> ```
> `C:\` becomes `/c/`, and backslashes become forward slashes.

## 📋 What Is Here? Listing a Folder

To see what is inside the current folder, use `dir`. The word comes from **dir**ectory. In PowerShell, `dir` and `ls` both work.

**CMD**:

```text
C:\JuniorCoders\practice\simple-site>dir
 Volume in drive C has no label.
 Volume Serial Number is 1A2B-3C4D

 Directory of C:\JuniorCoders\practice\simple-site

13-10-2026  08:10    <DIR>          .
13-10-2026  08:10    <DIR>          ..
13-10-2026  08:10    <DIR>          css
13-10-2026  08:10             1,420 index.html
13-10-2026  08:10    <DIR>          js
13-10-2026  08:10               850 style.css
               2 File(s)          2,270 bytes
               4 Dir(s)  317,987,721,216 bytes free
```

### Reading the CMD listing

- Each line starts with the **date and time** the item last changed. Your dates will look different.
- **`<DIR>`** means the item is a folder.
- A **number** like `1,420` is a file's size in **bytes**. One byte holds about one letter of text.
- **`.`** (one dot) means *"this folder"*.
- **`..`** (two dots) means *"the folder one level up"*. It is called the **parent** folder.
- The last two lines count the files and folders. They also show the free space on the drive.

**PowerShell**:

```text
PS C:\JuniorCoders\practice\simple-site> ls

    Directory: C:\JuniorCoders\practice\simple-site

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----        13-10-2026     08:10                css
d-----        13-10-2026     08:10                js
-a----        13-10-2026     08:10           1420 index.html
-a----        13-10-2026     08:10            850 style.css
```

### Reading the PowerShell listing

- **`Mode`**: a `d` at the start means **d**irectory (folder). A `-` means a file.
- **`LastWriteTime`**: when the item last changed.
- **`Length`**: the file size in bytes. Folders have no length.
- PowerShell lists folders first, then files. It does not show `.` and `..`, but they still work.

> [!NOTE]
> **Git Bash / macOS**: type `ls` for a short list, or `ls -l` for a long list with sizes and dates. Git Bash marks folders with a `d` at the start of the line, like PowerShell.

## 🙈 Showing Hidden Items

Some folders are **hidden**. They hold settings that you should not change by accident. A common one is `.git`, made by the Git tool. A normal listing does not show it.

| Show hidden items | CMD | PowerShell | Git Bash / macOS |
| :--- | :--- | :--- | :--- |
| Command | `dir /a` | `ls -Force` | `ls -a` |

**PowerShell** with `-Force`:

```text
PS C:\JuniorCoders\practice\simple-site> ls -Force

    Directory: C:\JuniorCoders\practice\simple-site

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d--h--        13-10-2026     08:10                .git
d-----        13-10-2026     08:10                css
d-----        13-10-2026     08:10                js
-a----        13-10-2026     08:10           1420 index.html
-a----        13-10-2026     08:10            850 style.css
```

The `h` in `d--h--` means **h**idden. In CMD, `dir /a:h` lists **only** the hidden items:

```text
C:\JuniorCoders\practice\simple-site>dir /a:h
 Volume in drive C has no label.
 Volume Serial Number is 1A2B-3C4D

 Directory of C:\JuniorCoders\practice\simple-site

13-10-2026  08:10    <DIR>          .git
               0 File(s)              0 bytes
               1 Dir(s)  317,987,713,024 bytes free
```

## 🧹 Clearing the Screen

After many commands, the window gets crowded. You can wipe it clean.

| Clear the screen | CMD | PowerShell | Git Bash / macOS |
| :--- | :--- | :--- | :--- |
| Command | `cls` | `cls` or `clear` | `clear` |
| Shortcut | (none) | <kbd>Ctrl</kbd> + <kbd>L</kbd> | <kbd>Ctrl</kbd> + <kbd>L</kbd> |

The screen becomes empty, with only a fresh prompt at the top. Clearing does **not** delete files. It does not undo commands either. It is like wiping a whiteboard, not throwing away your notebook.

## ⚠️ Common Mistake

**Typing `pwd` in CMD.** CMD does not know `pwd`.

```text
C:\JuniorCoders\practice>pwd
'pwd' is not recognized as an internal or external command,
operable program or batch file.
```

In CMD, type `cd` alone. In PowerShell, `pwd` works.

**Typing `cd` alone in PowerShell.** In Windows PowerShell 5.1 (the one built into Windows), `cd` alone prints nothing. In the newer PowerShell 7, it takes you to your home folder! It does not tell you where you are. In PowerShell, always use `pwd`.

## ✍️ Try It

Make your practice folder now, using the mouse this time. In Chapter 7 you will learn the terminal way.

1. Open File Explorer. Open the `C:` drive (also called *Local Disk (C:)*).
2. Make a new folder called `JuniorCoders`. Inside it, make a folder called `practice`.
3. Open CMD. Type `cd C:\JuniorCoders\practice` and press <kbd>Enter</kbd>. (You will learn `cd` properly in the next chapter.)
4. Type `cd` alone. Then type `dir`. What do you see?

*Hint*: A new folder is empty, but `dir` still lists two entries. Which two?

## 📝 Recap

- The folder you stand in is the **working directory**.
- CMD: `cd` alone prints it. PowerShell and Git Bash: `pwd`.
- `dir` lists a folder. PowerShell also accepts `ls`.
- `<DIR>` (CMD) or a `d` in `Mode` (PowerShell) marks a folder. `.` means this folder, `..` means the parent.
- `dir /a` (CMD) and `ls -Force` (PowerShell) show hidden items.
- `cls` or `clear` wipes the screen but never deletes files.

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which command prints your current folder in CMD? Which one in PowerShell?
2. What do `.` and `..` mean in a listing?
3. Which command clears the screen in CMD?

<details>
<summary>Show answer</summary>

1. CMD: `cd` with nothing after it. PowerShell: `pwd` (or `Get-Location`).
2. `.` is the current folder. `..` is the parent folder, one level up.
3. `cls`.

</details>

### 🟡 Level 2: Apply
Look at this CMD listing.

```text
13-10-2026  09:00    <DIR>          .
13-10-2026  09:00    <DIR>          ..
13-10-2026  09:02    <DIR>          images
13-10-2026  09:05             2,048 report.html
13-10-2026  09:06               512 notes.txt
               2 File(s)          2,560 bytes
               3 Dir(s)  100,000,000,000 bytes free
```

1. How many real folders are inside (not counting `.` and `..`)?
2. Which is the biggest file, and how big is it?
3. Write the PowerShell command that lists the same folder.

<details>
<summary>Show answer</summary>

1. One: `images`. (CMD's count of 3 includes `.` and `..`.)
2. `report.html`, with 2,048 bytes.
3. `ls` (or `dir`).

</details>

### 🔴 Level 3: Challenge
Yusuf's project has a hidden `.git` folder.

1. Why does a plain `dir` or `ls` not show `.git`?
2. Write the command that shows it in CMD, in PowerShell and in Git Bash.
3. Why is it a good idea that such folders are hidden?

<details>
<summary>Show one possible answer</summary>

1. The folder has the **hidden** setting. Normal listings skip hidden items.
2. CMD: `dir /a` (or `dir /a:h` for hidden items only). PowerShell: `ls -Force`. Git Bash: `ls -a`.
3. `.git` holds Git's own records. If people saw it every day, they might change or delete it by mistake. Hiding it protects the project's history.

</details>
