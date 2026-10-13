# Chapter 10: Launching VS Code & Verifying Developer Tools

## 🌟 Real-Life Story

Before a science lesson, the lab assistant checks the shelf. Is the microscope there? Are the test tubes clean? Is there enough of each liquid? She checks first, so the lesson does not stop halfway. Developers do the same. Before a project starts, they check their tools from the terminal. Then they open their workspace with one short command.

> **Key Idea**: The terminal is the launch pad for your developer tools. One command opens VS Code in your project folder. A few more check that Git, PHP, Node.js and Python are ready.

## 🎯 What You Will Learn

- Open the current folder in VS Code with `code .`.
- Check which version of a tool is installed.
- Understand the "not recognized" error and what it really means.
- Find where a program lives with `where.exe` and `Get-Command`.
- Know what to do (and not do) when a tool is missing.

## 🚀 Opening VS Code: `code .`

**VS Code** (Visual Studio Code) is a free code editor. Many beginners open it, click *File*, then *Open Folder*, and hunt through menus. From the terminal it takes two seconds.

1. Go to your project folder.
2. Type `code .` and press <kbd>Enter</kbd>.

**CMD**:

```text
C:\Users\Amina>cd C:\JuniorCoders\practice\portfolio

C:\JuniorCoders\practice\portfolio>code .

C:\JuniorCoders\practice\portfolio>
```

**PowerShell**:

```text
PS C:\Users\Amina> cd C:\JuniorCoders\practice\portfolio
PS C:\JuniorCoders\practice\portfolio> code .
PS C:\JuniorCoders\practice\portfolio>
```

The terminal prints nothing, and the prompt comes back. A moment later, VS Code opens with `portfolio` in its side bar.

> [!NOTE]
> Remember Chapter 5: `.` means *"this folder"*. So `code .` means *"VS Code, please open the folder I am standing in."* You can also open one file: `code index.html`.

## 🧰 Checking Tool Versions

Every developer tool can tell you its **version** number. A version shows which edition of the tool you have. Most tools use the option `--version`, and some also accept `-v`.

| Tool | What it is for | Command |
| :--- | :--- | :--- |
| Git | Saving versions of your work | `git --version` |
| Node.js | Running JavaScript outside the browser | `node -v` |
| npm | Installing JavaScript libraries | `npm -v` |
| PHP | Running PHP code | `php -v` |
| Python | Running Python code | `python --version` |
| VS Code | Code editor | `code --version` |

These commands look the same in CMD and PowerShell. Here is what one lab computer printed:

```text
C:\JuniorCoders\practice>git --version
git version 2.54.0.windows.1

C:\JuniorCoders\practice>node -v
v24.17.0

C:\JuniorCoders\practice>python --version
Python 3.12.10

C:\JuniorCoders\practice>php -v
PHP 8.3.31 (cli) (built: May  5 2026 17:23:34) (ZTS Visual C++ 2019 x64)
Copyright (c) The PHP Group
Zend Engine v4.3.31, Copyright (c) Zend Technologies
```

Your numbers will probably be different. That is normal. Tools get new versions often. What matters is that each command printed a version, so the tool is ready.

## ❓ "Not Recognized": What It Means

Sometimes you get an error instead of a version.

**CMD**:

```text
C:\JuniorCoders\practice>php -v
'php' is not recognized as an internal or external command,
operable program or batch file.
```

**PowerShell** (first lines of the red message):

```text
PS C:\JuniorCoders\practice> php -v
php : The term 'php' is not recognized as the name of a cmdlet, function, script file, or operable
program. Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
```

Do not worry. Nothing is broken. There are only three common reasons.

1. **A spelling mistake.** Check every letter: `phpp`, `gti` and `pyhton` are easy typos.
2. **The tool is not installed** on this computer.
3. **The tool is installed, but Windows does not know where to look.** Windows keeps a list of folders to search for programs. This list is called the **PATH**. If the tool's folder is not in the PATH, typing its name does not find it.

> [!WARNING]
> **Do not change the PATH or install software yourself on a school computer.** These are system settings. Changing them often needs Administrator rights, and we never run as Administrator. Write down the tool name and the error, and ask your teacher.

## 📍 Where Does a Program Live?

You can ask Windows where it finds a program.

**CMD** uses `where`:

```text
C:\JuniorCoders\practice>where git
C:\Program Files\Git\cmd\git.exe
```

If the program cannot be found:

```text
C:\JuniorCoders\practice>where php
INFO: Could not find files for the given pattern(s).
```

**PowerShell**: careful! In PowerShell, `where` means something else (it filters lists), so `where git` prints nothing. Type `where.exe` instead, or use `Get-Command`:

```text
PS C:\JuniorCoders\practice> where.exe git
C:\Program Files\Git\cmd\git.exe
PS C:\JuniorCoders\practice> Get-Command git

CommandType     Name          Version    Source
-----------     ----          -------    ------
Application     git.exe       2.54.0.1   C:\Program Files\Git\cmd\git.exe
```

The `Source` column shows where the program lives.

> [!NOTE]
> **Git Bash / macOS** use `which`:
> ```text
> $ which git
> /mingw64/bin/git
> ```
> On a Mac, it usually prints `/usr/bin/git`.

## ⚠️ Common Mistake

**Forgetting the dot.** Amina types `code` without the dot:

```text
C:\JuniorCoders\practice\portfolio>code
```

VS Code opens, but it shows whatever it had open last time, not her project. The dot is the important part. Fixed:

```text
C:\JuniorCoders\practice\portfolio>code .
```

**Using one hyphen for a long option.** `git -version` fails, because long word options need **two** hyphens:

```text
C:\JuniorCoders\practice>git -version
unknown option: -version
usage: git [-v | --version] [-h | --help] [-C <path>] [-c <name>=<value>]
...
```

Fixed: `git --version`.

## ✍️ Try It

Make a small "tool check" record for your computer.

1. Run `git --version`, `node -v`, `php -v` and `python --version`.
2. For each one, write **ready** and the version, or **missing**.
3. For any **ready** tool, find where it lives with `where` (CMD) or `where.exe` (PowerShell).
4. Open your practice folder in VS Code with `code .`.

*Hint*: A missing tool is not a failure. It is useful information for your teacher.

## 📝 Recap

- `code .` opens the current folder in VS Code. `.` means "this folder".
- `--version` (or `-v`) shows a tool's version. Different numbers on different computers are normal.
- "Not recognized" means a typo, a missing tool, or a tool that is not in the PATH.
- `where git` (CMD), `where.exe git` or `Get-Command git` (PowerShell), `which git` (Git Bash) show where a program lives.
- Never change the PATH or install software yourself on a school computer. Ask your teacher.

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which command opens VS Code with the current folder loaded?
2. Which option do most tools accept to show their version?
3. Which CMD command shows where a program is stored? Why must PowerShell users type it differently?

<details>
<summary>Show answer</summary>

1. `code .`
2. `--version` (many also accept `-v`).
3. `where`. In PowerShell, `where` is a different command that filters lists, so you type `where.exe` (or use `Get-Command`).

</details>

### 🟡 Level 2: Apply
Hamza runs these commands and sees:

```text
C:\JuniorCoders\practice>git --version
git version 2.54.0.windows.1

C:\JuniorCoders\practice>pyhton --version
'pyhton' is not recognized as an internal or external command,
operable program or batch file.
```

1. Is Git ready?
2. Is Python missing? What should Hamza try first?

<details>
<summary>Show answer</summary>

1. Yes. Git printed a version, so it is installed and found.
2. We cannot tell yet. He typed `pyhton`, which is a spelling mistake. He should first try the correct spelling, `python --version`. Only if that also fails is Python missing or not in the PATH.

</details>

### 🔴 Level 3: Challenge
A student has XAMPP. In CMD, `php -v` says *"not recognized"*. But this works:

```text
C:\Users\Sara>cd C:\xampp\php

C:\xampp\php>php -v
PHP 8.2.12 (cli) ...more details on the same line...
```

1. Why does `php -v` work inside `C:\xampp\php` but nowhere else?
2. Who should fix this on a school computer, and why?
3. Until it is fixed, how can she still run PHP from her project folder?

<details>
<summary>Show one possible answer</summary>

1. CMD always looks in the **current folder** first. `php.exe` is inside `C:\xampp\php`, so it is found there. From other folders, CMD searches only the folders in the PATH, and `C:\xampp\php` is not on that list.
2. The teacher or the school's computer technician. Changing the PATH is a system setting. Students should not change system settings or use Administrator rights.
3. She can type the program's absolute path (Chapter 5): `C:\xampp\php\php.exe -v`. That works from any folder.

</details>
