# Chapter 8: Undoing Mistakes Safely (`restore`, `reset`, `revert`)

---

## 🌟 Real-Life Story

**The Eraser, the Tray, and the Published Correction**

You write a science report in pencil, dislike a sentence, and rub it out with an eraser. Later you put the report in the teacher's tray, notice your roll number is missing, and simply take it back out. But once the report is printed in the school newspaper, you cannot secretly erase it from every copy. The honest way (*Ṣidq*, truthfulness) is to print a **correction notice** in the next issue. Git has a tool for each of these three moments.

---

## 🎯 What You Will Learn

- Discard unsaved edits in a file with `git restore <file>`.
- Take a file out of the staging area with `git restore --staged <file>`.
- Undo a commit safely with `git revert`, which adds a new "undo" commit.
- Compare `git reset --soft` and `git reset --hard`, and know why `--hard` is dangerous.

---

## Three Levels of Undo

Each mistake lives in a different place, so each has its own tool:

```text
Where is the mistake?        Use this
-----------------------      -------------------------
Edited, not staged      ->   git restore <file>
Staged (git add done)   ->   git restore --staged <file>
Already committed       ->   git revert <hash>
```

Remember the three trees from Chapter 2: the **working tree** (your files), the **staging area** (the box), and the **repository** (the saved commits).

---

## Example 1: Throw Away an Edit with `git restore`

Zainab's `index.html` was committed. She adds a silly test line and wants it gone. First she checks the status:

```bash
git status
```

```text
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   index.html

no changes added to commit (use "git add" and/or "git commit -a")
```

Git even suggests the command. She runs it and checks again:

```bash
git restore index.html
git status
```

```text
On branch main
nothing to commit, working tree clean
```

The file is back to its last committed version. To restore **every** changed file at once, use `git restore .` (the dot means "this whole folder").

> ⚠️ `git restore <file>` throws your edits away for good. They were never committed, so Git cannot bring them back.

---

## Example 2: Unstage a File with `git restore --staged`

Zainab ran `git add .` and accidentally staged `notes.txt`:

```bash
git status
```

```text
On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	new file:   notes.txt
```

She takes it out of the box. Her file stays safe on disk:

```bash
git restore --staged notes.txt
git status
```

```text
On branch main
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	notes.txt

nothing added to commit but untracked files present (use "git add" to track)
```

---

## Example 3: Undo a Commit with `git revert`

Zainab committed a banner with the wrong event date. She finds its **hash** (the commit's ID) with `git log --oneline`:

```text
db01d89 Add donation banner
a6e7603 Add home page
```

She reverts that one commit. The `--no-edit` option tells Git to use its ready-made message instead of opening an editor:

```bash
git revert --no-edit db01d89
```

```text
[main 8f47f6b] Revert "Add donation banner"
 Date: Tue Oct 13 08:05:00 2026 +0530
 1 file changed, 1 deletion(-)
```

Now look at the history:

```text
8f47f6b Revert "Add donation banner"
db01d89 Add donation banner
a6e7603 Add home page
```

Git did **not** delete `db01d89`. It added a new commit that does the exact opposite. The history stays honest: anyone can see what happened and when.

---

## How `git reset` Is Different

`git reset` moves your branch **backwards**, as if later commits never happened. `HEAD~1` means "one commit before the current one".

| Command | Commit removed from history? | Your changes |
|---|---|---|
| `git reset --soft HEAD~1` | Yes | Kept, and still staged |
| `git reset --hard HEAD~1` | Yes | **Deleted** from your files |

After `git reset --soft HEAD~1`, the work is still waiting in the box:

```text
On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	modified:   index.html
```

After `git reset --hard HEAD~1`, Git prints the commit you are now on, and the work is gone:

```text
HEAD is now at 8f47f6b Revert "Add donation banner"
```

- Use `git revert` for commits other people may already have (you will share commits with others from Chapter 14).
- Use `git reset --soft` only for your own commits that nobody else has seen yet.
- Treat `git reset --hard` as a danger zone. It is one of the few Git commands that can destroy work for good.

**A bit of history:** `git restore` arrived in Git 2.23 (2019). Before that, people used `git checkout -- <file>`, the older form you may still see online.

---

## 🌍 Real-World Connection

**GitLab's 2017 database incident.** On 31 January 2017, an engineer at GitLab (a company that hosts code, like GitHub) deleted data from the wrong database server by mistake. It was a server command, not a Git command. Several of their backups turned out not to work, and about six hours of user data was lost. GitLab shared the whole recovery live and then published an honest report of what went wrong. Owning a mistake in public, instead of hiding it, is the same spirit as `git revert`.

---

## 🔮 Predict the Output

You have a brand-new file `secret_notes.txt` that you have **never** added or committed. You run:

```bash
git restore secret_notes.txt
```

**Question:** Does Git delete the file?

<details>
<summary>👀 Click to check your answer</summary>

**No.** Git does not know this file, so it prints an error and changes nothing:

```text
error: pathspec 'secret_notes.txt' did not match any file(s) known to git
```

`git restore` only works on files Git already tracks.

</details>

---

## 🕵️ Code Detective: The Panic Reset

Omar made a commit with a small typo. In a hurry he ran `git reset --hard HEAD~1`. The commit vanished, but so did 40 lines of new code he had **not** committed yet.

- **What went wrong?** `--hard` resets your files too, and uncommitted lines have no saved copy.
- **The safer fix:** `git revert <hash>` to undo the commit, or `git reset --soft HEAD~1` to keep the work. Even better: commit or stash (Chapter 9) your unfinished work before any reset.

---

## ⚠️ Common Mistake

**Mistake 1: Using `git reset --hard` while you have unsaved work.**

Wrong:

```bash
git reset --hard HEAD~1
```

What happens: Git prints `HEAD is now at ...`, and every uncommitted change in your files is wiped. There is no undo button for those lines.

Fixed version: keep your work and only undo the commit.

```bash
git reset --soft HEAD~1
```

**Mistake 2: Reverting the wrong commit.**

Wrong: typing a hash from memory, such as `git revert a6e7603`, when you meant the banner commit.

What happens: Git undoes your home page instead of the banner.

Fixed version: always look first, then copy the exact hash.

```bash
git log --oneline -n 3
git revert --no-edit db01d89
```

---

## ✍️ Try It

In a practice folder (not a real project):

1. Create a repository with `git init`, add `index.html` with one line, and commit it.
2. Add a silly line to `index.html`. Run `git status` and read the red `modified:` line.
3. Throw the edit away and prove the file is clean again.

<details>
<summary>Hint</summary>

Git prints the command for you in step 2: `git restore index.html`. Then run `git status` and look for `nothing to commit, working tree clean`.

</details>

---

## 📝 Recap

- `git restore <file>` throws away edits that are not staged. They cannot come back.
- `git restore --staged <file>` takes a file out of the box but keeps your work.
- `git revert <hash>` undoes a commit by adding a new opposite commit. History stays honest.
- `git reset --soft` removes a commit but keeps the changes staged.
- `git reset --hard` removes the commit **and** your changes. Use it only when you are sure.

---

## 🏆 Practice

### 🟢 Level 1: Recall

1. Which modern command throws away unstaged changes in a file?
2. Which command removes a file from the staging area without deleting its contents?
3. What is the main difference between `git revert` and `git reset`?

<details>
<summary>Show answer</summary>

1. `git restore <file>`
2. `git restore --staged <file>`
3. `git revert` adds a **new** commit that undoes an old one, so history is kept. `git reset` moves the branch **back**, so later commits disappear from the history.

</details>

### 🟡 Level 2: Apply

1. Why is `git revert` safe on a branch other people share, while `git reset` can cause trouble?
2. How does `git restore` help you experiment without fear?
3. Add a silly paragraph to `index.html`, see it in `git status`, then remove it with Git. Which two commands did you use?

<details>
<summary>Show answer</summary>

1. Teammates may already have the old commits. `git revert` only adds a commit, so everyone's history still matches. `git reset` removes commits, so your history no longer matches theirs.
2. You can try any change. If it does not work, one command brings back the last committed version.
3. `git status` (shows `modified:   index.html`), then `git restore index.html`. A final `git status` shows `nothing to commit, working tree clean`.

</details>

### 🔴 Level 3: Challenge

Build a clean "audit trail" (a record that shows every change honestly):

1. In a practice repository, commit a file `banner.html` with the message `Add science fair banner`.
2. Pretend you found a mistake in the banner. Undo that commit **without** deleting it from history.
3. Run `git log --oneline` and check that both commits are listed.
4. Extra: explain in one sentence what happens to staged files after `git reset --soft HEAD~1` and after `git reset --hard HEAD~1`.

<details>
<summary>Show one possible answer</summary>

```bash
git add banner.html
git commit -m "Add science fair banner"
git log --oneline
git revert --no-edit <hash-of-banner-commit>
git log --oneline
```

The log shows `Revert "Add science fair banner"` above `Add science fair banner`. Your hashes will be different.

Extra: after `--soft`, the changes stay in your files and stay staged. After `--hard`, the changes are deleted from your files and from the staging area.

</details>
