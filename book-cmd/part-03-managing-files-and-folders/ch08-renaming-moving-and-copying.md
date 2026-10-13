# Chapter 8: Renaming, Moving & Copying Files

## 🌟 Real-Life Story

Ibrahim helps in the school library after classes. Sometimes a book has the wrong label, so he writes a new one: that is **renaming**. Sometimes a book sits on the wrong shelf, so he carries it to the right one: that is **moving**. When a teacher needs a worksheet for every student, he photocopies it: that is **copying**. The original stays safe. The terminal has a command for each of these jobs.

> **Key Idea**: Renaming, moving and copying from the terminal is exact. You never drop a file into the wrong folder by accident, as can happen when dragging with a mouse.

## 🎯 What You Will Learn

- Rename files and folders with `ren`.
- Move files into another folder, or up to the parent folder, with `move`.
- Copy files, and whole folders, with `copy` (and `xcopy` in CMD).
- Spot the important differences between CMD and PowerShell, especially about overwriting.

All examples happen in `C:\JuniorCoders\practice\library-site`. Make it now and add some files to follow along:

```text
mkdir C:\JuniorCoders\practice\library-site
cd C:\JuniorCoders\practice\library-site
mkdir css js
```

Then make the empty files `styles.txt`, `script.js` and `page.html` (Chapter 7 shows how).

## Renaming: `ren`

`ren` is short for **ren**ame. Pattern: `ren old-name new-name`.

**CMD**:

```text
C:\JuniorCoders\practice\library-site>ren styles.txt style.css

C:\JuniorCoders\practice\library-site>
```

**PowerShell**:

```text
PS C:\JuniorCoders\practice\library-site> ren styles.txt style.css
PS C:\JuniorCoders\practice\library-site>
```

Both print nothing when they succeed. Run `dir` to see the new name. Folders are renamed the same way: `ren old-folder new-folder`.

> [!NOTE]
> **Git Bash / macOS** have no rename command. They use `mv` (move) for both jobs: `mv styles.txt style.css`.

## Moving: `move`

Moving takes a file out of one folder and puts it in another. Pattern: `move file destination`.

**CMD** tells you how many files moved:

```text
C:\JuniorCoders\practice\library-site>move script.js js\
        1 file(s) moved.
```

**PowerShell** says nothing when it works:

```text
PS C:\JuniorCoders\practice\library-site> move script.js js\
PS C:\JuniorCoders\practice\library-site>
```

The `\` after `js` says *"js is a folder"*. It is a good habit, as you will see below.

### More ways to move

| Task | CMD and PowerShell | Git Bash / macOS |
| :--- | :--- | :--- |
| Into a subfolder | `move script.js js\` | `mv script.js js/` |
| Up to the parent folder | `move logo.png ..` | `mv logo.png ..` |
| Move and rename together | `move draft.txt js\notes.txt` | `mv draft.txt js/notes.txt` |

## Copying: `copy`

Copying makes a second file. The original stays where it was. Pattern: `copy original new-copy`.

**CMD**:

```text
C:\JuniorCoders\practice\library-site>copy page.html backup.html
        1 file(s) copied.
```

**PowerShell** is silent again:

```text
PS C:\JuniorCoders\practice\library-site> copy page.html backup.html
PS C:\JuniorCoders\practice\library-site>
```

To copy into a folder, give the folder as the destination: `copy page.html css\`.

### A safe backup before a big change

Before you try a big change to your style file, make a backup copy:

```text
copy style.css style.backup.css
```

Now you can experiment without fear. If things go wrong, the backup is still there.

## Copying a Whole Folder

`copy` in CMD only copies files. For a folder with everything inside, CMD uses `xcopy`. The options are `/e` (include **e**very subfolder, even empty ones) and `/i` (the destination **i**s a folder).

**CMD**:

```text
C:\JuniorCoders\practice>xcopy library-site library-site-backup /e /i
library-site\backup.html
library-site\page.html
library-site\style.css
library-site\js\script.js
4 File(s) copied
```

**PowerShell** uses `copy` with `-Recurse`, which means "go into every subfolder too":

```text
PS C:\JuniorCoders\practice> copy library-site library-site-backup -Recurse
```

> [!NOTE]
> **Git Bash / macOS**: `cp page.html backup.html` copies a file. `cp -r library-site library-site-backup` copies a whole folder (`-r` means recursive, "go into every subfolder").

## Summary Table

| Task | CMD | PowerShell | Git Bash / macOS |
| :--- | :--- | :--- | :--- |
| Rename | `ren a.js b.js` | `ren a.js b.js` | `mv a.js b.js` |
| Move into folder | `move a.js js\` | `move a.js js\` | `mv a.js js/` |
| Move up one level | `move a.js ..` | `move a.js ..` | `mv a.js ..` |
| Copy a file | `copy a.txt b.txt` | `copy a.txt b.txt` | `cp a.txt b.txt` |
| Copy a folder | `xcopy a b /e /i` | `copy a b -Recurse` | `cp -r a b` |

## ⚠️ Common Mistake

**PowerShell copies over a file without asking.** Bilal already has `backup.html` with yesterday's good work. He types:

```text
PS C:\JuniorCoders\practice\library-site> copy page.html backup.html
PS C:\JuniorCoders\practice\library-site>
```

No warning! The old `backup.html` is replaced. In **CMD**, typed at the prompt, `copy` stops and asks first:

```text
C:\JuniorCoders\practice\library-site>copy page.html backup.html
Overwrite backup.html? (Yes/No/All):
```

Type `N` and press Enter to keep the old file. In PowerShell, always run `dir` first to check the new name is free.

**Moving into a folder that does not exist.** Suppose there is **no** `scripts` folder, and you type `move app.js scripts`. The file is not moved. It is **renamed** to a file called `scripts`, with no extension! Add the `\` to be safe:

```text
C:\JuniorCoders\practice\library-site>move app.js scripts\
The system cannot find the path specified.
        0 file(s) moved.
```

The error tells you the folder is missing, and nothing changes. Make the folder with `mkdir scripts`, then move again.

## ✍️ Try It

In `library-site`:

1. Make a file called `catalog-draft.txt`.
2. Rename it to `catalog.txt`.
3. Make a folder called `data` and move `catalog.txt` into it.
4. Copy it back to the main folder as `catalog-copy.txt`.
5. Check with `dir /s /b` (CMD) or `ls -Recurse -Name` (PowerShell).

*Hint*: For step 4, stand in `library-site` and type `copy data\catalog.txt catalog-copy.txt`.

## 📝 Recap

- `ren old new` renames a file or folder.
- `move file folder\` moves a file. `move file ..` moves it up one level.
- `copy original copy` duplicates a file. Use `xcopy /e /i` (CMD) or `copy -Recurse` (PowerShell) for folders.
- CMD prints how many files moved or copied. PowerShell stays silent when it works.
- PowerShell's `copy` overwrites without asking. Check with `dir` first, and end folder names with `\`.

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which command renames a file in CMD and PowerShell? Which one does Git Bash use?
2. How do you move `banner.png` up into the parent folder?
3. What is the difference between `copy` and `move`?

<details>
<summary>Show answer</summary>

1. `ren` in CMD and PowerShell. Git Bash uses `mv`.
2. `move banner.png ..`
3. `copy` makes a second file and leaves the original where it was. `move` takes the file away from its old place.

</details>

### 🟡 Level 2: Apply
Your folder has `main.css` and `index.html` in it, and an empty `css` folder.

1. Move `main.css` into `css`.
2. Make a backup copy of `index.html` called `index.backup.html`.
3. Rename `index.backup.html` to `home-backup.html`.

<details>
<summary>Show answer</summary>

```text
move main.css css\
copy index.html index.backup.html
ren index.backup.html home-backup.html
```

These three lines work in both CMD and PowerShell.

</details>

### 🔴 Level 3: Challenge
Aisha keeps her class newsletter in `newsletter.html`. Her helper wants to save a copy called `newsletter-old.html`, but a file with that name already holds last month's issue.

1. What happens if the helper runs `copy newsletter.html newsletter-old.html` in CMD? And in PowerShell?
2. Why does the CMD question protect people's work?
3. Write three commands that keep **both** old files safe and still make the new backup.

<details>
<summary>Show one possible answer</summary>

1. CMD asks `Overwrite newsletter-old.html? (Yes/No/All):` and waits. PowerShell replaces the file at once, without asking.
2. It gives a moment to stop and think. Last month's issue is someone's work, and keeping it safe is part of our *Amānah* (trust).
3. For example:

```text
dir
ren newsletter-old.html newsletter-september.html
copy newsletter.html newsletter-old.html
```

First list the folder, then give last month's file a clear new name, then make the new copy.

</details>
