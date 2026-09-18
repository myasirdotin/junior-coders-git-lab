# Chapter 10: Understanding Branches (`git branch`, `switch`) 🌿🔀

---

## 1. 🌟 Real-Life Situation: The Tree Trunk and Its Boughs

Look at a majestic Chinar tree in the gardens of Srinagar:
- It has a strong, solid **central trunk** that anchors the whole tree.
- From that trunk grow distinct **branches**.
- On one branch, birds build a nest.
- On another branch, fresh green leaves and flowers blossom.
- If a heavy wind breaks a small branch on the left, **the main trunk remains standing strong and unharmed!**

In software engineering, **Branching** is the crown jewel of Git:
- The central trunk is your stable production code (the **`main`** branch).
- When you want to invent a new feature, you don't touch `main`!
- You sprout a new **Feature Branch** (e.g., `feature/navbar`).
- You can write code, make mistakes, test wild designs, and rewrite logic with 100% confidence, knowing that your live website on `main` is completely protected!

---

## 2. 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- Explain what a branch is in Git (a lightweight movable pointer).
- List all local and remote branches (`git branch`, `git branch -a`).
- Create and switch to new branches using `git switch -c` and `git checkout -b`.
- Understand what the `HEAD` pointer represents.
- Delete completed feature branches safely (`git branch -d`).

---

## 3. 👁️ Visual Concept Explanation

### The Branching Timeline

![Git Branching Lifecycle](../../assets/diagrams/git/git-branching-lifecycle.svg)

```text
main:            (C1) ──── (C2) ────────────────────────── (C5) ──── (C6: Merge)
                             \                                        /
feature/navbar:               (C3: Add HTML) ── (C4: Add CSS) ───────┘
```

Notice how `main` and `feature/navbar` can each make progress independently!

---

## 4. 💻 Code Example: Creating & Navigating Branches

```bash
# 1. Check what branch you are currently on
git branch
# Output: * main (The asterisk * shows where HEAD is!)

# 2. Create a new branch AND switch to it immediately
git switch -c feature/dark-mode
# (Or the classic syntax: git checkout -b feature/dark-mode)

# Output: Switched to a new branch 'feature/dark-mode'

# 3. Verify you are on your new branch
git branch
# Output:
# * feature/dark-mode
#   main

# 4. Make an edit and commit on your new branch
git commit -am "feat: Add dark theme toggle and CSS variables"

# 5. Switch back to main whenever you want
git switch main
# Look at your files: the dark mode code is invisible here! main is safe!

# 6. Switch back to your feature branch
git switch feature/dark-mode
# Look at your files: your dark mode code is right back!
```

---

## 5. 🔍 Code Explanation: Breaking It Down

- What is a branch under the hood?
  - In many older tools, creating a branch copied all 50,000 files into a new folder.
  - In Git, a branch is merely a tiny **41-byte text file** inside `.git/refs/heads/` storing a single commit hash! Creating a branch takes **0.001 seconds**, regardless of whether your project has 10 files or 10,000 files!
- `git switch`: Modern, human-friendly command introduced to separate branch switching from file restoring.
- `git branch -d <name>`: Safely deletes a branch only if its changes have already been merged into `main`.
- `git branch -D <name>`: Force-deletes a branch even if unmerged.

---

## 6. 🌍 Real-World Connection: Professional Branch Naming Standards

In major engineering companies:
Developers never name branches random words like `"temp"` or `"stuff"`. They use standardized prefixes:
- `feature/user-login`: For new features.
- `bugfix/mobile-overflow`: For bug corrections.
- `docs/update-readme`: For documentation improvements.
- `refactor/clean-sql-queries`: For code cleanups that don't change behavior.

---

## 7. ⚠️ Common Beginner Traps

1. **Making commits on `main` instead of your feature branch**:
   - Always run `git branch` or `git status` before writing code to confirm which branch you are standing on!
2. **Trying to delete the branch you are currently standing on**:
   - Git will error: `error: cannot delete branch 'feature/nav' checked out at ...`.
   - *Fix*: You must switch to `main` first before deleting your feature branch!

---

## 8. 🔮 Predict the Output

You create a branch named `experiment`, add 5 lines to `index.html`, and commit it.
Then you run: `git switch main`.

**Question**: Will you see those 5 new lines inside `index.html` while standing on `main`?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> No! Git automatically updates your working directory files to match the exact snapshot of whatever branch you switch to! Those 5 lines only exist on <code>experiment</code>.
</details>

---

## 9. 🕵️ Code Detective: The Missing Code Panic

A student was terrified because all their Saturday work disappeared when they opened their laptop on Monday:
- *"Teacher, my entire contact form is gone! The file is empty!"*
- The teacher calmly ran: `git branch`.
- Terminal output: `* main`, but listed in the branch list was `feature/contact-form`!
- The student had simply left their editor on `main`.
- With one command: `git switch feature/contact-form`, all their code was right where they left it!

---

## 10. 🏆 5 Levels of Mastery Exercises

### 🟢 Level 1: Recall
1. What command displays all local branches in your repository?
2. What modern command creates and switches to a new branch in one step?
3. What does the `HEAD` pointer point to in Git?

### 🟡 Level 2: Understand
4. Why is branching considered the safest way to develop new website features?
5. Why are Git branches described as "lightweight"?

### 🟠 Level 3: Apply
6. Create a new branch named `feature/footer-redesign`. Make an edit to the footer of `index.html`, commit it, and switch back to `main`. Compare the file in both branches.

### 🔵 Level 4: Think & Troubleshoot
7. What happens if you try to switch branches while you have unstaged, conflicting edits in your working tree? How does `git stash` solve this?

### 🟣 Level 5: Create & Build
8. Create a repository with a `main` branch and two experimental branches: `design-a` (with blue buttons) and `design-b` (with green buttons). Switch between them and test how the browser displays each version!
