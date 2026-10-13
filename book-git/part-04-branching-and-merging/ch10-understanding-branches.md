# Chapter 10: Understanding Branches (`git branch`, `switch`)

---

## 🌟 Real-Life Story

**The Tree Trunk and Its Branches**

Look at a great Chinar tree in a Srinagar garden. It has one strong trunk, and many branches grow from it. Birds may nest on one branch while new leaves open on another. If wind breaks a small branch, the trunk still stands. In Git, the trunk is your stable `main` branch, and each new idea grows on its own branch.

---

## 🎯 What You Will Learn

- Explain what a branch is: a movable label that points to a commit.
- List branches with `git branch` and see which one you are on.
- Create and switch branches with `git switch -c` and `git switch`.
- Explain what `HEAD` means.
- Delete finished branches with `git branch -d`.

---

## The Branching Timeline

![Git Branching Lifecycle](../assets/diagrams/git/git-branching-lifecycle.svg)

```text
main:     C1 -- C2 ---------- C5 -- C6
                 \               /
feature:          C3 -- C4 -----'
```

`main` and `feature` grow at the same time without touching each other. Later, `C6` joins them together. That is a **merge**, which you will learn in Chapter 11.

**HEAD** is Git's "you are here" marker. It points to the branch you are standing on right now.

---

## Example: Creating and Switching Branches

**Step 1.** See which branch you are on. The star `*` marks it:

```bash
git branch
```

```text
* main
```

**Step 2.** Create a new branch **and** move onto it in one step. `-c` means "create":

```bash
git switch -c feature/dark-mode
```

```text
Switched to a new branch 'feature/dark-mode'
```

You will also see the older form `git checkout -b feature/dark-mode`. It does the same job.

**Step 3.** Check again:

```bash
git branch
```

```text
* feature/dark-mode
  main
```

**Step 4.** Add a file and commit it on the new branch:

```bash
git add dark.css
git commit -m "Add dark theme colours"
```

```text
[feature/dark-mode 4e38327] Add dark theme colours
 1 file changed, 1 insertion(+)
 create mode 100644 dark.css
```

**Step 5.** Go back to `main` and list the files (`ls` from the terminal book; on CMD use `dir`):

```bash
git switch main
ls
```

```text
Switched to branch 'main'
index.html
```

`dark.css` is not there. `main` is safe and unchanged.

**Step 6.** Switch back to the feature branch:

```bash
git switch feature/dark-mode
ls
```

```text
Switched to branch 'feature/dark-mode'
dark.css
index.html
```

Your work is right back. Git changes the files in your folder to match the branch you switch to.

---

## How Branches Work

- **A branch is tiny.** Older tools copied the whole project to make a branch. In Git, a branch is just a small file in `.git/refs/heads/` that holds one commit hash (41 bytes). That is why creating one is almost instant, even in a big project.
- **`git switch`** was added in Git 2.23 (2019). It only changes branches. The older `git checkout` did many different jobs, which confused people.
- **`git branch -d <name>`** deletes a branch only if its work is already merged.
- **`git branch -D <name>`** force-deletes a branch even if its work is not merged. Use it with care.

If you try `-d` on a branch that is not merged, Git protects you:

```text
error: the branch 'feature/dark-mode' is not fully merged
hint: If you are sure you want to delete it, run 'git branch -D feature/dark-mode'
```

---

## 🌍 Real-World Connection

Professional teams do not name branches `temp` or `stuff`. Many use a short prefix that says what the branch is for:

- `feature/user-login`: a new feature.
- `bugfix/mobile-overflow`: a bug fix.
- `docs/update-readme`: documentation.
- `refactor/clean-queries`: tidying code without changing what it does.

This is a common habit, not a rule built into Git. Your team decides.

---

## 🔮 Predict the Output

You create a branch `experiment`, add five lines to `index.html`, and commit them there. Then you run `git switch main`.

**Question:** Do you see those five lines in `index.html` while on `main`?

<details>
<summary>👀 Click to check your answer</summary>

**No.** Git changes your files to match the branch you switch to. The five lines only exist on `experiment`. Switch back to `experiment` and they return.

</details>

---

## 🕵️ Code Detective: The Missing Code Panic

On Monday, Maryam cried: "Teacher, my contact form is gone!" The teacher calmly ran `git branch`:

```text
  feature/contact-form
* main
```

Maryam had built the form on `feature/contact-form` on Saturday, but now she was standing on `main`. One command fixed it: `git switch feature/contact-form`. All her code was still there.

---

## ⚠️ Common Mistake

**Mistake 1: Committing on `main` by accident.**

Wrong: you start coding straight away, without checking where you are.

What happens: your unfinished feature lands on `main`, the branch that should stay stable.

Fixed version: check first, then create your branch.

```bash
git branch
git switch -c feature/footer
```

**Mistake 2: Deleting the branch you are standing on.**

Wrong:

```bash
git branch -d feature/dark-mode
```

What happens (while on that branch):

```text
error: cannot delete branch 'feature/dark-mode' used by worktree at 'C:/.../my-project'
```

Fixed version: step off the branch first.

```bash
git switch main
git branch -d feature/dark-mode
```

---

## ✍️ Try It

In a practice repository with at least one commit:

1. Create and switch to a branch called `feature/footer-redesign`.
2. Add a file `footer.html` and commit it.
3. Switch back to `main` and check whether `footer.html` is there.

<details>
<summary>Hint</summary>

`git switch -c feature/footer-redesign`, then `git add footer.html` and `git commit -m "Add footer"`, then `git switch main` and `ls`. The file should only appear on the feature branch.

</details>

---

## 📝 Recap

- A branch is a light label pointing at a commit. Making one is almost instant.
- `git branch` lists branches; the `*` shows where you are (HEAD).
- `git switch -c name` creates a branch and moves onto it; `git switch name` moves between branches.
- Your files change to match the branch you switch to.
- `git branch -d` deletes merged branches; `-D` forces it.

---

## 🏆 Practice

### 🟢 Level 1: Recall

1. Which command lists all local branches?
2. Which modern command creates a new branch and switches to it in one step?
3. What does `HEAD` point to?

<details>
<summary>Show answer</summary>

1. `git branch`
2. `git switch -c <name>` (older form: `git checkout -b <name>`).
3. The branch (and so the commit) you are standing on right now.

</details>

### 🟡 Level 2: Apply

1. Why is a branch a safe place to build a new website feature?
2. Why do people call Git branches "lightweight"?
3. You are on `main`. Write the commands to create `feature/footer-redesign`, commit a change to `index.html` there, and return to `main`.

<details>
<summary>Show answer</summary>

1. Your experiments stay on the branch. `main` keeps working even if the feature breaks.
2. A branch is only a tiny file holding one commit hash. Git does not copy your project.
3. ```bash
   git switch -c feature/footer-redesign
   git add index.html
   git commit -m "Redesign footer"
   git switch main
   ```

</details>

### 🔴 Level 3: Challenge

1. Make a practice repository with `index.html` and `style.css` on `main`.
2. Create branch `design-a` and change the button colour in `style.css` to blue. Commit.
3. Go back to `main`. Create branch `design-b` and make the button green. Commit.
4. Switch between the two branches and refresh the page in your browser each time.
5. Extra: on `design-b`, edit `style.css` but do **not** commit. Try `git switch design-a`. What happens, and how does `git stash` help?

<details>
<summary>Show one possible answer</summary>

```bash
git switch -c design-a
# edit style.css: button { background: blue; }
git add style.css
git commit -m "Make buttons blue"
git switch main
git switch -c design-b
# edit style.css: button { background: green; }
git add style.css
git commit -m "Make buttons green"
git switch design-a
```

The browser shows blue buttons on `design-a` and green on `design-b`.

Extra: Git refuses to switch because your edit would be overwritten:

```text
error: Your local changes to the following files would be overwritten by checkout:
	style.css
Please commit your changes or stash them before you switch branches.
Aborting
```

Run `git stash`, switch, and later come back and run `git stash pop`.

</details>
