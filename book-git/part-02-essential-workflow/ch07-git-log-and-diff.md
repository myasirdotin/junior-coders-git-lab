# Chapter 7: Inspecting History & Differences (`log` & `diff`) 🔍

---

## 🌟 Real-Life Story

**The Flight Recorder**

Every passenger plane carries a flight data recorder. It notes every change in height, speed and every pilot command during the flight. Afterwards, engineers can replay the whole journey instead of guessing. Git gives you two tools like this. **`git log`** is the project's diary of every commit, and **`git diff`** is a magnifying glass that shows exactly which lines changed.

---

## 🎯 What You Will Learn

- Read the project history with `git log` and the short form `git log --oneline`.
- Filter the history by author, by file and by date.
- See unstaged changes line by line with `git diff`.
- See staged changes with `git diff --staged`.
- Leave the `git log` screen with `q`.

---

## 📜 Reading History with `git log`

Our example is a school library website with three commits. Two people worked on it: Zainab and Omar.

```bash
git log
```

```text
commit d6f001ce98483742cffa4ed7c0992c3d0663eac7 (HEAD -> main)
Author: Omar Khan <omar@example.org>
Date:   Tue Oct 13 08:06:46 2026 +0530

    Update opening days

commit e80a3e7833258ea754aa313af019d8b4661ee7c1
Author: Zainab Ahmed <zainab@example.org>
Date:   Tue Oct 13 08:06:46 2026 +0530

    Add heading colour

commit 2c23e920fccfecf7e270d3366c2aa4a3ec76fc5a
Author: Zainab Ahmed <zainab@example.org>
Date:   Tue Oct 13 08:06:45 2026 +0530

    Add library home page
```

The newest commit is at the top. Each one shows its full ID (the long **hash**), the author, the date and the message. `(HEAD -> main)` marks where you are now.

That is a lot of text. The short form shows one line per commit:

```bash
git log --oneline
```

```text
d6f001c (HEAD -> main) Update opening days
e80a3e7 Add heading colour
2c23e92 Add library home page
```

The 7-character code is the start of the hash. It is enough to point to a commit.

### Filtering the history

| Command | What it shows |
| :--- | :--- |
| `git log --oneline -n 2` | only the newest 2 commits |
| `git log --oneline --author="Omar"` | only Omar's commits |
| `git log --oneline -- style.css` | only commits that changed `style.css` |
| `git log --oneline --since="7 days ago"` | commits from the last week |
| `git log --oneline --graph` | a drawing of the history (useful later for branches) |

Try two of them:

```bash
git log --oneline --author="Omar"
```

```text
d6f001c (HEAD -> main) Update opening days
```

```bash
git log --oneline -- style.css
```

```text
e80a3e7 Add heading colour
```

The `--` means "what follows is a file name". `--graph` draws a star `*` for each commit:

```bash
git log --oneline --graph -n 2
```

```text
* d6f001c (HEAD -> main) Update opening days
* e80a3e7 Add heading colour
```

With one straight line of commits the drawing is simple. In Chapter 10 you will see it split into branches.

---

## 🔎 Seeing Changes with `git diff`

Now Zainab changes the heading colour in `style.css` from `blue` to `teal`. She has **not** run `git add` yet.

```bash
git diff
```

```text
diff --git a/style.css b/style.css
index ccf22a0..24cddd2 100644
--- a/style.css
+++ b/style.css
@@ -1,3 +1,3 @@
 h1 {
-  color: blue;
+  color: teal;
 }
```

How to read it:

```text
--- a/style.css   the old version
+++ b/style.css   your new version
@@ -1,3 +1,3 @@   lines 1 to 3
-  color: blue;   removed (red)
+  color: teal;   added (green)
 h1 {             unchanged (context)
```

A changed line shows up as one `-` line plus one `+` line.

### Staged changes need `--staged`

Zainab now stages the file and runs `git diff` again:

```bash
git add style.css
git diff
```

This prints **nothing**. Plain `git diff` compares your files with the **staging area**, and they now match. To see what is about to be committed, add `--staged`:

```bash
git diff --staged
```

```text
diff --git a/style.css b/style.css
index ccf22a0..24cddd2 100644
--- a/style.css
+++ b/style.css
@@ -1,3 +1,3 @@
 h1 {
-  color: blue;
+  color: teal;
 }
```

| Command | Compares |
| :--- | :--- |
| `git diff` | your files ↔ staging area (not yet staged) |
| `git diff --staged` | staging area ↔ last commit (about to be committed) |
| `git diff 2c23e92 d6f001c` | one commit ↔ another commit |

---

## 🔍 How It Works

- When the output is longer than your screen, Git shows it in a **pager** (a viewer that shows one screen at a time). Press `Space` for the next page, `b` to go back, and **`q` to quit**.
- `--oneline` shortens each commit to the short hash and the first line of the message.
- In `git diff`, `-` lines were removed, `+` lines were added, and lines starting with a space are unchanged context, so you can see where the edit happened.
- A good habit: run `git diff --staged` just before every `git commit`. You check exactly what you are about to save.

---

## 🌍 Real-World Connection

**Code reviews**

- Before code goes into hospital systems or flight software, other engineers read it first. This is called a **code review**.
- They read a diff: every red and green line.
- They check that no password was left in, that no test messages like `console.log("here")` remain, and that the code is careful and clear (*Iḥsān*).
- On GitHub, reviews happen in **pull requests**, which you will meet in Chapter 17.

---

## 🔮 Predict the Output

You change `color: blue` to `color: teal` in `style.css`. You have **not** run `git add`. You type `git diff`. Will you see `-  color: blue;` and `+  color: teal;`?

<details>
<summary>👀 Click to check your answer</summary>

**Yes.** Plain `git diff` compares your files with the staging area. Your edit is not staged yet, so it shows up. If you ran `git add style.css` first, `git diff` would print nothing, and you would need `git diff --staged`.

</details>

---

## 🕵️ Code Detective

**The Accidental Deletion**

A student edited `script.js` and, without noticing, selected and deleted a 40-line function. Before committing, she ran `git diff`.

- **The clue:** 40 red `-` lines scrolled past, all from a function she never meant to touch.
- **The rescue:** she did not commit. She brought the file back to its last saved version with `git restore script.js`. You will learn `git restore` properly in Chapter 8.

---

## ⚠️ Common Mistake

**Thinking the terminal froze inside `git log`**

❌ **Wrong:** you run `git log` on a long project. The screen fills up, a `:` or `(END)` appears at the bottom, and typing new commands does nothing. You close the whole terminal window.

**What happens:** you are inside the pager. It is waiting for keys like `Space` or `q`.

✅ **Fixed version:** press **`q`**. You are back at your prompt. For short output, use `git log --oneline -n 5`.

**Seeing nothing from `git diff`** is the other surprise. It does not mean your edits are lost. They are probably staged already, so run `git diff --staged`.

---

## ✍️ Try It

1. In a practice repository with at least one commit, edit `README.md` (add one line).
2. Run `git diff` and find your new line with a `+`.
3. Run `git add README.md`, then `git diff` (empty) and `git diff --staged` (your line again).
4. Commit, then run `git log --oneline`.

<details>
<summary>Hint</summary>

If `git diff` shows nothing in step 2, check that you saved the file in your editor. In step 4 your newest commit should be at the top with `(HEAD -> main)` next to it.

</details>

---

## 📝 Recap

- `git log` shows every commit, newest first; `git log --oneline` shows one line each.
- Filter with `--author`, `-- <file>`, `-n` and `--since`.
- Press `q` to leave the `git log` pager.
- `git diff` shows changes that are not staged; `git diff --staged` shows what will be committed.
- `-` lines were removed, `+` lines were added.

---

## 🏆 Practice

### 🟢 Level 1: Recall

1. Which command shows the commit history?
2. Which key quits the `git log` screen?
3. What does a line starting with `+` mean in `git diff`?

<details>
<summary>Show answer</summary>

1. `git log` (or `git log --oneline` for the short form).
2. `q`
3. A line that was added.

</details>

### 🟡 Level 2: Apply

1. What is the difference between `git diff` and `git diff --staged`?
2. Why is it good practice to read the diff before you commit?
3. Write the commands to: edit `README.md`, see the change, stage it, see the staged change, and commit it.

<details>
<summary>Show answer</summary>

1. `git diff` shows changes you have **not** staged yet. `git diff --staged` shows changes that **are** staged and will go into the next commit.
2. You catch mistakes before they become part of the history: a deleted function, a test message, or a password.
3. Commands:

```bash
echo "Open Monday to Saturday." >> README.md
git diff
git add README.md
git diff --staged
git commit -m "docs: Add opening days to README"
```

</details>

### 🔴 Level 3: Challenge

**Become a history detective.**

1. Show only the commits from the last 7 days, one line each.
2. Show only the commits that changed `index.html`.
3. Compare your oldest and newest commits with `git diff <old> <new>`.
4. Make a shortcut so that typing `git lg` runs `git log --oneline --graph --decorate --all`, then try it.

<details>
<summary>Show one possible answer</summary>

```bash
git log --oneline --since="7 days ago"
git log --oneline -- index.html
git diff 2c23e92 d6f001c
git config --global alias.lg "log --oneline --graph --decorate --all"
git lg
```

Use the hashes from your own `git log --oneline`. An **alias** is a nickname for a longer command. In the library example, `git lg` prints:

```text
* fabef20 (HEAD -> main) Change heading colour to teal
* d6f001c Update opening days
* e80a3e7 Add heading colour
* 2c23e92 Add library home page
```

</details>
