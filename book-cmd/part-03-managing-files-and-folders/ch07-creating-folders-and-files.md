# Chapter 7: Creating Folders & Files at Lightning Speed

## 🌟 Real-Life Story

At the start of term, Maryam's teacher asks her to prepare files for the class library project. In File Explorer, each new folder needs a right-click, "New", "Folder", and then typing a name. Ten folders mean forty clicks. Her older brother shows her the terminal. He types one short line and presses Enter. All ten folders appear at once, with neat, correct names.

> **Key Idea**: In the terminal you can create several folders and files with one line. It is fast, exact and easy to repeat.

## 🎯 What You Will Learn

- Make your practice folder with `mkdir`.
- Create one folder, several folders, and folders inside folders.
- Create an empty file in CMD and in PowerShell.
- Create a small text file with one line inside it.
- Build a complete website skeleton in a few lines.

## Creating a Folder: `mkdir`

`mkdir` stands for **m**a**k**e **dir**ectory. It works in CMD, PowerShell and Git Bash.

Let us make the practice folder the terminal way. If you already made it in Chapter 3, you will see a friendly "already exists" message. That is fine.

**CMD**:

```text
C:\Users\Amina>mkdir C:\JuniorCoders\practice

C:\Users\Amina>cd C:\JuniorCoders\practice

C:\JuniorCoders\practice>
```

CMD prints nothing when it succeeds. Silence means success.

**PowerShell**:

```text
PS C:\Users\Amina> mkdir C:\JuniorCoders\practice

    Directory: C:\JuniorCoders

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----        13-10-2026     08:14                practice
```

PowerShell shows a small table of what it made. The `d` in `Mode` tells you it is a folder.

> [!IMPORTANT]
> **From now on, every exercise happens inside `C:\JuniorCoders\practice`.** It is your safe practice space. Nothing important lives there.

## Several Folders at Once

Here CMD and PowerShell are different.

**CMD**: separate the names with **spaces**.

```text
C:\JuniorCoders\practice>mkdir css js images

C:\JuniorCoders\practice>dir /b
css
images
js
```

**PowerShell**: separate the names with **commas**.

```text
PS C:\JuniorCoders\practice> mkdir css, js, images

    Directory: C:\JuniorCoders\practice

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----        13-10-2026     08:14                css
d-----        13-10-2026     08:14                js
d-----        13-10-2026     08:14                images
```

## Folders Inside Folders

You can make a folder **and** the folders around it in one go. CMD and PowerShell both create any missing folders along the path.

```text
C:\JuniorCoders\practice>mkdir assets\images\icons

C:\JuniorCoders\practice>cd assets\images\icons

C:\JuniorCoders\practice\assets\images\icons>
```

The same `mkdir assets\images\icons` works in PowerShell.

> [!NOTE]
> **Git Bash / macOS**: separate names with spaces: `mkdir css js images`. For folders inside folders, add `-p` (for **p**arents): `mkdir -p assets/images/icons`. Without `-p`, Git Bash stops with "No such file or directory".

## Creating an Empty File

An **empty file** has a name but nothing inside (0 bytes). Developers often make empty files first and fill them later.

| Task | CMD | PowerShell |
| :--- | :--- | :--- |
| Make an empty file | `type nul > index.html` | `New-Item index.html` |

**CMD**:

```text
C:\JuniorCoders\practice>type nul > index.html

C:\JuniorCoders\practice>
```

Here is how it works:
- `nul` is a special Windows "nothing" device. Reading it gives no text at all.
- `>` is the **redirect** sign. It sends the result into a file instead of the screen.
- So `type nul > index.html` means *"put nothing into index.html"*. You get a new, empty file.

**PowerShell**:

```text
PS C:\JuniorCoders\practice> New-Item index.html

    Directory: C:\JuniorCoders\practice

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----        13-10-2026     08:14              0 index.html
```

The `Length` is `0`, so the file is empty. A short name for `New-Item` is `ni`.

> [!NOTE]
> **Git Bash / macOS**: `touch index.html` makes an empty file. If the file already exists, `touch` only updates its time. It never empties it.

## A File With One Line Inside

`echo` prints text. With `>` you can send that text into a new file.

**CMD**:

```text
C:\JuniorCoders\practice>echo Science fair notes > notes.txt
```

**PowerShell** (put the text in quotes):

```text
PS C:\JuniorCoders\practice> echo "Science fair notes" > notes.txt
```

To open any file in Notepad and type more, use `notepad notes.txt`. This works in both terminals. You will learn to read files in the terminal in Chapter 12.

## Drill: A Website Skeleton in Six Lines

Watch a whole website skeleton appear.

**CMD**:

```text
mkdir portfolio
cd portfolio
mkdir css js images
type nul > index.html
type nul > css\style.css
type nul > js\app.js
```

**PowerShell**:

```text
mkdir portfolio
cd portfolio
mkdir css, js, images
New-Item index.html
New-Item css\style.css
New-Item js\app.js
```

Check your work with `dir /s /b` (CMD). It lists every folder and file inside, at every level:

```text
C:\JuniorCoders\practice\portfolio>dir /s /b
C:\JuniorCoders\practice\portfolio\css
C:\JuniorCoders\practice\portfolio\images
C:\JuniorCoders\practice\portfolio\index.html
C:\JuniorCoders\practice\portfolio\js
C:\JuniorCoders\practice\portfolio\css\style.css
C:\JuniorCoders\practice\portfolio\js\app.js
```

In PowerShell, type `ls -Recurse -Name`:

```text
PS C:\JuniorCoders\practice\portfolio> ls -Recurse -Name
css
images
js
index.html
css\style.css
js\app.js
```

That would take about twenty clicks in File Explorer.

## ⚠️ Common Mistake

**Using spaces between names in PowerShell.**

```text
PS C:\JuniorCoders\practice> mkdir css js images
mkdir : A positional parameter cannot be found that accepts argument 'js'.
```

PowerShell made nothing. Use commas: `mkdir css, js, images`.

**Using `type nul >` on a file that already has work in it.** The `>` sign **replaces** everything in the file.

```text
C:\JuniorCoders\practice>type nul > notes.txt
```

CMD gives no warning. Your notes are now gone, and the file is empty. Before you create a file, list the folder with `dir` to check the name is free. (PowerShell's `New-Item` is safer: it refuses with *"The file ... already exists."*)

## ✍️ Try It

Inside `C:\JuniorCoders\practice`, build this for a class charity drive:

```text
charity-drive
├── index.html
├── donors.txt
└── pages
    └── about.html
```

*Hint*: Make `charity-drive` and go in. Make the `pages` folder. Then make the three empty files. Finish with `dir /s /b` or `ls -Recurse -Name` to check.

## 📝 Recap

- `mkdir name` makes a folder. Silence in CMD means it worked.
- Several folders: spaces in CMD (`mkdir a b c`), commas in PowerShell (`mkdir a, b, c`).
- `mkdir a\b\c` makes all the missing folders on the way, in both terminals.
- Empty file: `type nul > name` (CMD) or `New-Item name` (PowerShell).
- `>` replaces a file's contents, so check with `dir` before using it.

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which command makes a new folder in CMD and PowerShell?
2. Write one command that makes folders `alpha`, `beta` and `gamma` in CMD. Then write it for PowerShell.
3. How do you make an empty `index.html` in CMD? And in PowerShell?

<details>
<summary>Show answer</summary>

1. `mkdir`.
2. CMD: `mkdir alpha beta gamma`. PowerShell: `mkdir alpha, beta, gamma`.
3. CMD: `type nul > index.html`. PowerShell: `New-Item index.html`.

</details>

### 🟡 Level 2: Apply
In your practice folder:

1. Make a folder called `practice-lab` and go into it.
2. In one line, make the folders `pages` and `assets`.
3. Make an empty file called `index.html`.
4. List the folder to check.

<details>
<summary>Show answer</summary>

CMD:

```text
mkdir practice-lab
cd practice-lab
mkdir pages assets
type nul > index.html
dir /b
```

PowerShell:

```text
mkdir practice-lab
cd practice-lab
mkdir pages, assets
New-Item index.html
dir -Name
```

The list shows `assets`, `index.html` and `pages`.

</details>

### 🔴 Level 3: Challenge
Look at this CMD command:

```text
echo Welcome to the reading club > readme.txt
```

1. What does the `>` sign do here?
2. `readme.txt` already holds a long list of book titles. What happens to that list?
3. Write a safe habit that protects you from this mistake.

<details>
<summary>Show one possible answer</summary>

1. `>` sends the text from `echo` into the file `readme.txt` instead of the screen.
2. The list is **replaced**. The file now holds only `Welcome to the reading club`. There is no warning and no Recycle Bin copy.
3. List the folder first (`dir`) and check the name is not already used. If it is, choose a new name or make a copy first. (Chapter 12 shows `>>`, which adds to the end instead of replacing.)

</details>
