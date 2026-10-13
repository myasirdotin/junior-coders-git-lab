# Chapter 14: Capstone Challenge 2: The Broken Asset Path Detective

## 🌟 Real-Life Story

When a patient visits the doctor, the doctor does not guess. She asks questions, looks carefully, and checks the clues. Only then does she decide what to do. After the treatment, she checks again that the patient is better. Fixing a broken website works the same way. In this final chapter you are the detective. You will use clues from the terminal to find what is wrong, fix it, and prove it is fixed.

> **Key Idea**: Troubleshooting is a calm routine: **read** the error, **check** where you are, **list** what is there, **compare** it with what is expected, **fix** one thing at a time, and **check** again.

## 🎯 What You Will Learn

- Follow a six-step detective routine for any terminal problem.
- Understand the most common error messages in CMD and PowerShell.
- Find and fix broken file paths in a real website folder.
- Remove an unwanted folder safely, after checking it first.
- Review everything this book has taught you.

## 🕵️ The Detective Routine

| Step | Ask yourself | Command |
| :--- | :--- | :--- |
| 1. Read | What does the error say, exactly? | (read slowly) |
| 2. Locate | Where am I standing? | `cd` (CMD) / `pwd` (PowerShell) |
| 3. List | What is really here? | `dir`, `tree /f` |
| 4. Compare | What did the page or command expect? | `type file` |
| 5. Fix | What is the smallest change that fixes it? | `mkdir`, `move`, `ren` |
| 6. Check | Did it work? | `dir`, `tree /f`, browser |

## 📚 Error Message Guide

These messages are clues, not disasters. Each one tells you what to check.

| Message | Terminal | Usual meaning |
| :--- | :--- | :--- |
| `'xyz' is not recognized as an internal or external command` | CMD | Typo, or tool not installed / not in PATH |
| `The term 'xyz' is not recognized as the name of a cmdlet` | PowerShell | Same as above |
| `The system cannot find the path specified.` | CMD | A folder in the path does not exist here |
| `Cannot find path '...' because it does not exist.` | PowerShell | Same as above |
| `File Not Found` / `Could Not Find ...` | CMD | No file with that name here |
| `A subdirectory or file css already exists.` | CMD | Nothing to do: it is already there |
| `The directory is not empty.` | CMD | `rmdir` protected a folder that still has files |
| `[404]: GET /...` in a server log | PHP server | The browser asked for a file that is not there |

## 🚨 The Incident Report

The school library's website has arrived in a mess. When you open it, the page has no colours and the logo is missing. Here is the folder:

```text
library-site
├── index.html
├── style.css      ◄── in the wrong place
├── logo.png       ◄── in the wrong place
├── js
│   └── script.js
└── backup
    └── old_styles.css
```

## 🔎 Investigation

### Step 1 and 2: Read and locate

Go to the folder and confirm where you are.

```text
C:\Users\Amina>cd C:\JuniorCoders\practice\library-site

C:\JuniorCoders\practice\library-site>cd
C:\JuniorCoders\practice\library-site
```

### Step 3: List the evidence

```text
C:\JuniorCoders\practice\library-site>dir /b
backup
index.html
js
logo.png
style.css
```

### Step 4: Compare with what the page expects

Print the page to see which paths it uses:

```text
C:\JuniorCoders\practice\library-site>type index.html
<link rel="stylesheet" href="css/style.css">
<img src="assets/logo.png" alt="Library logo">
<script src="js/script.js"></script>
```

The page looks for `css/style.css` and `assets/logo.png`. But `style.css` and `logo.png` are lying in the main folder, and the `css` and `assets` folders do not exist. The browser cannot find them, so it shows no styles and no logo. `js/script.js` is correct.

**Diagnosis**: two files are in the wrong place. The paths in the page are fine.

## 🔧 The Fix in CMD

```text
:: Step 5a: make the missing folders
mkdir css assets

:: Step 5b: move each file to its home
move style.css css\
move logo.png assets\

:: Step 5c: look inside backup BEFORE removing it
dir /b backup
```

`dir /b backup` shows only `old_styles.css`, an old copy nobody needs. Now remove the folder, and answer the question:

```text
C:\JuniorCoders\practice\library-site>rmdir /s backup
backup, Are you sure (Y/N)? Y
```

We list first and let CMD ask. We do not add `/q`.

## 🔧 The Fix in PowerShell

```text
mkdir css, assets
move style.css css\
move logo.png assets\
dir -Name backup
rmdir backup
```

Because `backup` has a file inside, PowerShell shows its **Confirm** question. Read the path, then answer `Y`.

> [!NOTE]
> **Git Bash / macOS**:
> ```text
> mkdir css assets
> mv style.css css/
> mv logo.png assets/
> ls backup
> rm -r -i backup
> ```
> `-i` asks before each item is removed.

## ✅ Step 6: Check

```text
C:\JuniorCoders\practice\library-site>tree /f
Folder PATH listing
Volume serial number is 1A2B-3C4D
C:.
│   index.html
│
├───assets
│       logo.png
│
├───css
│       style.css
│
└───js
        script.js
```

Every path in `index.html` now matches a real file. Start a server with `php -S localhost:8000` and open the page. The colours and logo are back! The log now shows `[200]` for `css/style.css` and `assets/logo.png`. Stop the server with <kbd>Ctrl</kbd> + <kbd>C</kbd>.

## 🎓 What You Have Mastered

Look how far you have come:

- **Finding your way**: `cd`, `cd ..`, `cd \`, `pwd`, drives, relative and absolute paths.
- **Looking around**: `dir`, `ls`, `dir /a`, `tree /f`, `cls`.
- **Building**: `mkdir`, `type nul >`, `New-Item`, `echo` with `>` and `>>`.
- **Organising**: `ren`, `move`, `copy`, `xcopy`.
- **Safe deleting**: list first, `del /p`, `rmdir`, `rmdir /s` with a question.
- **Developer work**: `code .`, `--version`, `where`, `php -S`, <kbd>Ctrl</kbd> + <kbd>C</kbd>, `type`, `findstr`, pipes.

You are ready for the **Git & GitHub** book (`book-git/`). Git is used entirely through the terminal you now know.

## ⚠️ Common Mistake

**Fixing before investigating.** A beginner sees the missing logo and edits `index.html`, changing `assets/logo.png` to `logo.png`. The logo appears. But now the page does not match the project's plan, and the next teammate is confused. A good detective finds the real cause first: the files were in the wrong place.

**Removing a folder without looking inside.** `backup` might have held the only copy of something important. Always `dir` a folder before `rmdir /s`.

## ✍️ Try It

Recreate the messy `library-site` folder in your practice folder, using Chapters 7 and 12. Then solve the case yourself, without looking at the solution. Time how long the six steps take you.

*Hint*: For `index.html`, write the three lines with `echo` and `>>`. In CMD, put `^` before each `<` and `>`.

## 📝 Recap

- Troubleshooting is a routine: read, locate, list, compare, fix, check.
- Error messages are clues. Most mean a typo, a wrong folder, or a missing file.
- Broken links on a page usually mean a file is not where the path says.
- Look inside a folder before removing it, and let the terminal ask you to confirm.
- Always check your fix: with `tree /f`, `dir`, and the browser.

## 🏆 Practice

### 🟢 Level 1: Recall
1. Name the six steps of the detective routine.
2. What does `The system cannot find the path specified.` usually mean?
3. What does `[404]` mean in a server log?

<details>
<summary>Show answer</summary>

1. Read, locate, list, compare, fix, check.
2. A folder in the path you typed does not exist where you are (or it is spelled wrongly).
3. The browser asked for a file that the server could not find.

</details>

### 🟡 Level 2: Apply
The logo shows on your Windows computer. But on the school's web server, which runs Linux, the logo is missing. The server reports **404 Not Found** for `/images/school-logo.png`.

`dir /b images` prints:

```text
School-Logo.PNG
```

1. What is the problem?
2. Give a command that fixes it without changing the HTML.

<details>
<summary>Show answer</summary>

1. The file name does not match. The page asks for `school-logo.png` (all lowercase), but the file is `School-Logo.PNG`. Windows ignores capital letters in file names, so it worked at home. Linux treats them as different names, so the server cannot find the file.
2. From the site folder: `ren images\School-Logo.PNG school-logo.png`.

</details>

### 🔴 Level 3: Challenge
A new case arrives. The page `index.html` in `charity-site` contains:

```html
<link rel="stylesheet" href="css/main.css">
<script src="js/donate.js"></script>
```

The folder holds: `index.html`, `styles` (with `main.css` inside), and `donate.js`.

1. List the clues and write your diagnosis.
2. Write the commands (CMD or PowerShell) that fix the folder without editing `index.html`.
3. Write the commands that check your fix.

<details>
<summary>Show one possible answer</summary>

1. Clues: the page wants `css/main.css`, but the folder is called `styles`. The page wants `js/donate.js`, but there is no `js` folder; `donate.js` sits in the main folder. Diagnosis: one folder has the wrong name and one file is in the wrong place.
2. Fix:

```text
cd C:\JuniorCoders\practice\charity-site
ren styles css
mkdir js
move donate.js js\
```

3. Check:

```text
tree /f
php -S localhost:8000
```

Open `http://localhost:8000`. The log should show `[200]` for `css/main.css` and `js/donate.js`. Stop the server with <kbd>Ctrl</kbd> + <kbd>C</kbd>.

</details>
