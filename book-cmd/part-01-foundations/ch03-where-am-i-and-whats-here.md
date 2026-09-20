# Chapter 3: Where Am I? & What's Here? (Orientation)

> **Key Idea**: Before you run any script, build a project, or initialize Git, you must know your bearings. The two fundamental questions in the terminal are: **"Where am I standing?"** and **"What is in this room?"**

---

## 1. Finding Your Current Location

When working in File Explorer, you look at the address bar at the top of the window. In the terminal, you ask the computer directly:

| Action | Windows Command Prompt (CMD) | Git Bash / macOS / Linux |
| :--- | :--- | :--- |
| **Print Working Directory** | `cd` *(typing `cd` without arguments)* | `pwd` *(Print Working Directory)* |

### Example Output:
In Windows CMD:
```text
C:\xampp\htdocs\my-portfolio> cd
C:\xampp\htdocs\my-portfolio
```
In Git Bash:
```text
user@laptop:~/projects$ pwd
/c/xampp/htdocs/my-portfolio
```

> [!TIP]
> Notice how Git Bash translates Windows drive paths: `C:\xampp\htdocs` becomes `/c/xampp/htdocs`. Git Bash uses Unix forward slashes `/`.

---

## 2. Listing What's in the Room

Now that you know your current folder, how do you see the files and subfolders inside it?

| Action | Windows Command Prompt | Git Bash / Unix |
| :--- | :--- | :--- |
| **Basic Listing** | `dir` | `ls` |
| **Show Hidden Files** | `dir /a:h` | `ls -a` *(or `ls -la`)* |
| **Wide / Compact List** | `dir /w` | `ls` |
| **Sort by Date** | `dir /o:d` | `ls -lt` |

### In Windows CMD (`dir`):
```text
C:\xampp\htdocs\simple-site> dir

 Directory of C:\xampp\htdocs\simple-site

19/09/2026  10:15 AM    <DIR>          .
19/09/2026  10:15 AM    <DIR>          ..
19/09/2026  10:12 AM    <DIR>          css
19/09/2026  10:14 AM    <DIR>          js
19/09/2026  10:16 AM             1,420 index.html
19/09/2026  10:18 AM               850 style.css
               2 File(s)          2,270 bytes
               4 Dir(s)  124,562,812,928 bytes free
```

### Decoding the `dir` Output:
- `<DIR>`: Indicates that the item is a folder (directory).
- Numbers (e.g., `1,420`): File size in bytes.
- The single dot `.`: A shorthand alias for **"the current directory"**.
- The double dot `..`: A shorthand alias for **"the parent directory"** (one level up).

### In Git Bash (`ls -la`):
```text
user@laptop:/c/xampp/htdocs/simple-site$ ls -la
drwxr-xr-x 1 user 197121    0 Sep 19 10:15 .
drwxr-xr-x 1 user 197121    0 Sep 19 10:15 ..
drwxr-xr-x 1 user 197121    0 Sep 19 10:12 css
drwxr-xr-x 1 user 197121    0 Sep 19 10:14 js
-rw-r--r-- 1 user 197121 1420 Sep 19 10:16 index.html
-rw-r--r-- 1 user 197121  850 Sep 19 10:18 style.css
```

---

## 3. The Great Reset: Clearing the Screen

When your terminal window gets cluttered with hundreds of lines of output, reset your canvas back to a clean slate:

| Action | Windows CMD / PowerShell | Git Bash / Unix | Keyboard Shortcut |
| :--- | :--- | :--- | :--- |
| **Clear Screen** | `cls` | `clear` | <kbd>Ctrl</kbd> + <kbd>L</kbd> *(Git Bash & PowerShell)* |

Clearing the screen does **not** erase your files or delete history; it simply rolls the screen down so you can focus with fresh eyes.

---

## 4. Review & Practice

### 🟢 Level 1: Recall
1. What command in Windows CMD prints your current working directory?
2. What command prints the directory in Git Bash / Linux?
3. Which command clears the clutter from your screen in Windows CMD?

### 🟡 Level 2: Interactive Terminal Drill
Open your terminal right now:
1. Run `cd` (or `pwd`). Note down your active directory path.
2. Run `dir` (or `ls`). How many files and directories are listed?
3. What do the special entries `.` and `..` represent?
4. Type `cls` (or `clear`) and hit <kbd>Enter</kbd>.

### 🔴 Level 3: Real-World Investigation
You create a hidden Git repository configuration folder called `.git`.
- Why does running a plain `ls` in Git Bash not show `.git`?
- What exact flag must you pass to `ls` so that hidden configuration folders become visible?
