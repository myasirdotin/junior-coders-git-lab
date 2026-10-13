# Chapter 13: Capstone Challenge 1: The 60-Second Full-Stack Scaffolder

## 🌟 Real-Life Story

Before a community food drive, volunteers set up the hall. One group puts out tables. Another labels the boxes: rice, lentils, flour, tinned food. A third puts up signs. Because everyone follows a plan, the hall is ready in minutes. Starting a website is the same. Before writing any content, a developer sets up the folders and empty files, called the **scaffold**. Like the scaffolding on a building, it is the frame that everything else hangs on.

> **Key Idea**: Put all your skills together. Using only the terminal, build the full structure of a website, write its first page, check it, and open it in VS Code. No mouse!

## 🎯 What You Will Learn

- Plan a project's folders and files before typing.
- Combine `cd`, `mkdir`, empty files, `echo`, `>` and `>>` in one task.
- Check a finished structure with `tree /f`, `dir /s /b` or `ls -Recurse -Name`.
- Open the finished project in VS Code and view it on a local server.

## The Mission

A community charity called **Kindness Pantry** shares food with families in need. They need a simple website. Your job is to build its scaffold inside `C:\JuniorCoders\practice`:

```text
kindness-pantry
├── index.html
├── contact.html
├── README.md
├── css
│   ├── style.css
│   └── reset.css
├── js
│   └── app.js
└── assets
    └── images
```

**Rule**: no File Explorer and no mouse until the very end.

## The Plan

Good builders plan first. Here are the steps, with the chapter where you learned each skill.

1. Go to the practice folder (Chapter 4).
2. Make the project folder and go into it (Chapter 7).
3. Make all the subfolders (Chapter 7).
4. Make the empty files (Chapter 7).
5. Write a starter `README.md` and `index.html` (Chapter 12).
6. Check the structure (Chapters 3 and 7).
7. Open it in VS Code and on a local server (Chapters 10 and 11).

## Solution in CMD

Lines starting with `::` are **comments**. They are notes for people. CMD ignores them. You do not need to type them.

```text
:: 1. Go to the practice folder
cd C:\JuniorCoders\practice

:: 2. Make the project folder and go in
mkdir kindness-pantry
cd kindness-pantry

:: 3. Make all subfolders (CMD makes assets too)
mkdir css js assets\images

:: 4. Make the empty files
type nul > contact.html
type nul > css\style.css
type nul > css\reset.css
type nul > js\app.js

:: 5. Write README.md and index.html
echo # Kindness Pantry> README.md
echo ^<!DOCTYPE html^> > index.html
echo ^<html lang="en"^> >> index.html
echo ^<h1^>Welcome to Kindness Pantry^</h1^> >> index.html
echo ^</html^> >> index.html
```

In CMD, `<` and `>` have special jobs. The `^` sign before each one says *"this is just a normal letter"*. The last `>` or `>>` on each line, without `^`, is the real redirect.

Now print the page to check it:

```text
C:\JuniorCoders\practice\kindness-pantry>type index.html
<!DOCTYPE html>
<html lang="en">
<h1>Welcome to Kindness Pantry</h1>
</html>
```

## Solution in PowerShell

The steps are in the same order as the CMD solution. Watch for the commas when making folders and files, and the quotes around the text.

```text
cd C:\JuniorCoders\practice
mkdir kindness-pantry
cd kindness-pantry
mkdir css, js, assets\images
New-Item contact.html, css\style.css, css\reset.css, js\app.js
echo '# Kindness Pantry' > README.md
echo '<!DOCTYPE html>' > index.html
echo '<html lang="en">' >> index.html
echo '<h1>Welcome to Kindness Pantry</h1>' >> index.html
echo '</html>' >> index.html
```

`New-Item` can make several files at once when you separate the names with commas. The single quotes `'...'` keep the `<`, `>` and `#` signs as plain text, so no `^` is needed.

> [!NOTE]
> **Git Bash / macOS**:
> ```text
> cd /c/JuniorCoders/practice
> mkdir kindness-pantry && cd kindness-pantry
> mkdir -p css js assets/images
> touch contact.html css/style.css css/reset.css js/app.js
> echo "# Kindness Pantry" > README.md
> echo '<h1>Welcome to Kindness Pantry</h1>' > index.html
> ```
> `&&` means *"if the first command worked, run the second"*. On a Mac, start with `cd ~` and work in a practice folder in your home folder.

## Checking Your Work

The `tree /f` command draws the folder as a tree, with **f**iles included. It works in both CMD and PowerShell:

```text
...\kindness-pantry>tree /f
Folder PATH listing
Volume serial number is 1A2B-3C4D
C:.
│   contact.html
│   index.html
│   README.md
│
├───assets
│   └───images
├───css
│       reset.css
│       style.css
│
└───js
        app.js
```

`C:.` means *"this folder"*. Compare the tree with the plan at the top. Everything is there.

You can also use `dir /s /b` (CMD) or `ls -Recurse -Name` (PowerShell) from Chapter 7.

> [!NOTE]
> **Git Bash / macOS**: `ls -R` lists every folder and its contents.

## Final Step: Open and View

```text
code .
php -S localhost:8000
```

`code .` opens the project in VS Code. Check the side bar matches your tree. Then start the server and visit `http://localhost:8000` to see your heading. Stop the server with <kbd>Ctrl</kbd> + <kbd>C</kbd> when you are done.

## Mastery Levels

Time yourself. Focus on **correct** first, then on **fast**.

- 🥉 **Apprentice**: the whole scaffold is correct, with no errors.
- 🥈 **Proficient**: correct in under 2 minutes.
- 🥇 **Master**: correct in under 60 seconds, using <kbd>Tab</kbd> and <kbd>↑</kbd> to save typing.

Type every command yourself. Copying and pasting builds nothing in your memory, and honest practice is part of academic integrity.

## ⚠️ Common Mistake

**Forgetting to `cd` into the project folder.** Hamza makes `kindness-pantry`, but forgets `cd kindness-pantry`. All his `css`, `js` and `index.html` land in `C:\JuniorCoders\practice` instead.

```text
C:\JuniorCoders\practice>mkdir kindness-pantry

C:\JuniorCoders\practice>mkdir css js assets\images
```

Look at the prompt! It still says `practice`. The fix: check the prompt before each step. To tidy up, move the items into the project folder with `move` (Chapter 8), for example `move css kindness-pantry\`.

**Using `>` for every line of `index.html`.** Only the last line survives. The first line uses `>`; every line after it uses `>>` (Chapter 12).

## ✍️ Try It

Build a second scaffold for a **community garden** website, called `green-corner`:

```text
green-corner
├── index.html
├── volunteers.html
├── css
│   └── style.css
└── images
```

Write `<h1>Green Corner Community Garden</h1>` into `index.html`. Check it with `tree /f`.

*Hint*: Follow the same seven-step plan. In CMD, remember `^` before `<` and `>` inside the text.

## 📝 Recap

- A **scaffold** is a project's frame: its folders and starting files.
- Plan the tree first, then build it step by step.
- CMD needs `^` before `<` and `>` inside `echo` text. PowerShell needs quotes instead.
- `>` starts a file, `>>` adds each next line.
- `tree /f` draws your finished structure so you can compare it with the plan.

## 🏆 Practice

### 🟢 Level 1: Recall
1. What is a project scaffold?
2. Which command draws a folder as a tree, including files?
3. In CMD, why do we write `^<h1^>` instead of `<h1>` after `echo`?

<details>
<summary>Show answer</summary>

1. The starting structure of a project: its folders and empty files, ready to be filled.
2. `tree /f` (in CMD and PowerShell).
3. `<` and `>` are redirect signs in CMD. The `^` tells CMD to treat them as normal letters, so they are written into the file.

</details>

### 🟡 Level 2: Apply
Write the commands (CMD **or** PowerShell) to build this inside your practice folder:

```text
study-planner
├── index.html
├── css
│   └── planner.css
└── js
    └── timer.js
```

<details>
<summary>Show answer</summary>

CMD:

```text
cd C:\JuniorCoders\practice
mkdir study-planner
cd study-planner
mkdir css js
type nul > index.html
type nul > css\planner.css
type nul > js\timer.js
tree /f
```

PowerShell:

```text
cd C:\JuniorCoders\practice
mkdir study-planner
cd study-planner
mkdir css, js
New-Item index.html, css\planner.css, js\timer.js
tree /f
```

</details>

### 🔴 Level 3: Challenge
Your school's science club wants a website for its annual fair. Design and build it.

1. Draw the tree first. It must include a home page, a page for projects, a page for the fair timetable, a `css` folder with one style file, and an `images` folder with a `projects` folder inside.
2. Build it with the terminal only.
3. Write a heading into the home page and a title line into `README.md`.
4. Check it with `tree /f`, open it with `code .`, and view it on a local server.

<details>
<summary>Show one possible answer</summary>

Plan:

```text
science-fair
├── index.html
├── projects.html
├── timetable.html
├── README.md
├── css
│   └── style.css
└── images
    └── projects
```

PowerShell:

```text
cd C:\JuniorCoders\practice
mkdir science-fair
cd science-fair
mkdir css, images\projects
New-Item projects.html, timetable.html, css\style.css
echo '# Science Fair Website' > README.md
echo '<h1>Annual Science Fair</h1>' > index.html
tree /f
code .
php -S localhost:8000
```

In CMD, use `mkdir css images\projects`, `type nul >` for each empty file, and `echo ^<h1^>Annual Science Fair^</h1^> > index.html`. Stop the server with <kbd>Ctrl</kbd> + <kbd>C</kbd>.

</details>
