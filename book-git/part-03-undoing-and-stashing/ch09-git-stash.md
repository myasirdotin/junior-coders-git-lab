# Chapter 9: Stashing Work in Progress (`git stash`) 🗄️

---

## 🌟 Real-Life Story

**An Urgent Interruption at Your Desk**

You are halfway through a model of the solar system on your desk. Pieces are everywhere. Your mother calls: "Please help carry the shopping bags in from the car." You cannot finish in ten seconds, and you do not want the pieces knocked over. So you place the half-built model safely on a high shelf, help, and later bring it back down to carry on. `git stash` is that shelf for your code.

---

## 🎯 What You Will Learn

- Explain what the stash is and when to use it.
- Put unfinished changes aside with `git stash push -m "message"`.
- See saved stashes with `git stash list`.
- Bring work back with `git stash pop` or `git stash apply`.
- Remove stashes with `git stash drop` and `git stash clear`.

---

## 👁️ The Stash Shelf

```text
Working tree: half-done code
      |
      v   git stash push
[ Stash shelf: your work kept safe ]
      |
      v   working tree is clean:
          fix the urgent problem
      |
      v   git stash pop
Working tree: half-done code is back
```

A **stash** is a saved bundle of uncommitted changes. It is not a commit on your branch. It sits on a separate shelf until you take it back.

---

## 💻 Example: The Stash Workflow

Zainab is halfway through a search filter in `app.js`:

```bash
git status
```

```text
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   app.js

no changes added to commit (use "git add" and/or "git commit -a")
```

Her teacher asks for an urgent fix elsewhere. She shelves her work with a clear label:

```bash
git stash push -m "Half-done search filter"
```

```text
Saved working directory and index state On main: Half-done search filter
```

Her working tree is now clean:

```bash
git status
```

```text
On branch main
nothing to commit, working tree clean
```

She can see what is on the shelf:

```bash
git stash list
```

```text
stash@{0}: On main: Half-done search filter
```

She makes the urgent fix and commits it. Then she brings her search code back:

```bash
git stash pop
```

```text
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   app.js

no changes added to commit (use "git add" and/or "git commit -a")
Dropped refs/stash@{0} (dc064b7cd6b2ee5e5300d71501b539a7d3b64ea9)
```

`app.js` is modified again, exactly as she left it.

---

## 🔍 The Stash Commands

| Command | What it does |
|---|---|
| `git stash` | Shelves changes to tracked files, with an automatic label |
| `git stash push -m "msg"` | Same, with your own label |
| `git stash -u` | Also shelves **untracked** (brand-new) files |
| `git stash list` | Shows all stashes: `stash@{0}` is the newest |
| `git stash pop` | Brings the newest stash back **and** removes it from the shelf |
| `git stash apply` | Brings it back but **keeps** a copy on the shelf |
| `git stash drop` | Deletes one stash |
| `git stash clear` | Deletes every stash |

You may see `git stash save "msg"` in older guides. It still works but is deprecated (no longer recommended). Use `git stash push -m "msg"` instead.

---

## 🌍 Real-World Connection

Developers often jump between tasks: a new feature, a bug report, a review of a teammate's work. Git will not let you switch branches (Chapter 10) if your unsaved changes would be overwritten. Instead of making a messy commit such as `"wip asdf"`, they stash, switch, and pop the stash when they return.

---

## 🔮 Predict the Output

You have one modified file. You run `git stash`, then `git status`.

**Question:** What does `git status` print?

<details>
<summary>👀 Click to check your answer</summary>

```text
On branch main
nothing to commit, working tree clean
```

Your change is safe on the stash shelf, so the working tree is clean.

</details>

---

## 🕵️ Code Detective: The Lost Draft

Bilal had 300 lines of half-written code in `planner.js`. A teammate needed his help right away. Bilal did not know about the stash, so he ran `git restore planner.js` to clear his screen.

- **The problem:** `git restore` throws away uncommitted work. All 300 lines were gone for good.
- **The lesson:** to clear your workspace **for a while**, use `git stash`. Use `git restore` only for changes you truly want to throw away.

---

## ⚠️ Common Mistake

**Mistake 1: Expecting a brand-new file to be stashed.**

Wrong: you create `help.html` (never added to Git) and run:

```bash
git stash
```

What happens: if that new file is your only change, Git saves nothing:

```text
No local changes to save
```

Fixed version: add `-u` (include untracked files).

```bash
git stash -u
```

**Mistake 2: Using the stash as long-term storage.** Stashes have no branch and are easy to forget. Use them for minutes or hours. If the work matters for days, commit it on its own branch (Chapter 10).

---

## ✍️ Try It

In a practice repository with at least one commit:

1. Edit a tracked file. Run `git status`.
2. Stash the change with the label `"testing stash"`.
3. Prove the working tree is clean, then bring the change back.

<details>
<summary>Hint</summary>

Use `git stash push -m "testing stash"`, then `git status`, then `git stash pop`. Run `git stash list` at the end: it should be empty.

</details>

---

## 📝 Recap

- `git stash` puts unfinished changes on a shelf and cleans your working tree.
- Label stashes with `git stash push -m "message"`.
- `git stash pop` brings work back and removes the stash; `apply` keeps a copy.
- New, untracked files need `git stash -u`.
- The stash is for short breaks, not long-term storage.

---

## 🏆 Practice

### 🟢 Level 1: Recall

1. Which command shelves unfinished changes and cleans your working tree?
2. Which command lists all stashes?
3. What is the difference between `git stash pop` and `git stash apply`?

<details>
<summary>Show answer</summary>

1. `git stash` (or `git stash push -m "message"` to add a label).
2. `git stash list`
3. `pop` brings the changes back **and** removes the stash. `apply` brings them back but **keeps** the stash on the shelf.

</details>

### 🟡 Level 2: Apply

1. Why is stashing cleaner than committing broken code with a message like `"wip broken"`?
2. Which option must you add to stash brand-new untracked files?
3. Edit `index.html` and also create a new file `about.html`. Write the commands to stash both with the label `testing stash`, check the tree is clean, and bring both back.

<details>
<summary>Show answer</summary>

1. A commit stays in the history forever. A broken "wip" commit makes the history confusing. A stash keeps the history clean.
2. `-u` (include untracked).
3. ```bash
   git stash push -u -m "testing stash"
   git status
   git stash pop
   ```
   The middle `git status` shows `nothing to commit, working tree clean`.

</details>

### 🔴 Level 3: Challenge

1. Can popping a stash cause a conflict? Test it in a practice repository:
   1. Commit `style.txt` containing `color = "blue"`.
   2. Change it to `color = "green"` and stash it.
   3. Change it to `color = "red"` and commit.
   4. Run `git stash pop`. What does Git print? Is the stash still in `git stash list`?
2. Extra: write a three-line "cheat card" for younger students: when to commit, when to stash, when to throw away.

<details>
<summary>Show one possible answer</summary>

1. Yes. Both the stash and the new commit changed the same line, so Git reports a conflict:

   ```text
   Auto-merging style.txt
   CONFLICT (content): Merge conflict in style.txt
   ```

   Git also prints `The stash entry is kept in case you need it again.`, so `git stash list` still shows it. You fix the file the way you will learn in Chapter 12, then remove the stash with `git stash drop`.

2. Cheat card:
   - **Commit** when a small piece of work is finished and working.
   - **Stash** when you must stop for a short while and come back later.
   - **Restore** (throw away) only when you are sure you never want those changes.

</details>
