# Chapter 8: Undoing Mistakes Safely (`restore`, `reset`, `revert`) ↺🛡️

---

## 1. 🌟 Real-Life Situation: The Eraser, The Backspace, and The Published Correction

Imagine writing a science report:
1. **Pencil draft on paper (Working Tree)**: You write a sentence with your pencil, dislike it, and simply use an eraser to wipe it clean.
2. **Placed in the submission tray (Staging Area)**: You put your paper in the teacher's tray, but realize you forgot to write your roll number. You simply pull it back out of the tray to fix it.
3. **Published in the School Newspaper (Committed History)**: The paper is printed and distributed to 500 students. You cannot secretly delete the past! Instead, the respectful and honest way (*Ṣidq*) is to publish an **Official Correction Notice** in tomorrow's issue explaining the updated fact.

In Git, you have three precise tools matching these situations:
- **`git restore`**: Your pencil eraser for unstaged working directory mistakes.
- **`git restore --staged`**: Taking files out of the staging tray.
- **`git revert`**: Creating a safe, transparent reverse commit that undoes a past mistake without rewriting history!

---

## 2. 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- Discard uncommitted edits using `git restore <file>`.
- Unstage files safely using `git restore --staged <file>`.
- Understand the difference between `git reset --soft`, `git reset --mixed`, and `git reset --hard`.
- Safely undo a published commit using `git revert <commit-hash>`.
- Adopt the golden rule: **Never rewrite public shared history!**

---

## 3. 👁️ Visual Concept Explanation

### The Three Undoing Levels

```text
Level 1: Uncommitted text edit in file   ➔  git restore <file>
Level 2: Staged file in the box          ➔  git restore --staged <file>
Level 3: Already committed to history   ➔  git revert <commit-hash> (Generates a clean inverse commit!)
```

---

## 4. 💻 Code Example: Hands-on Undoing

### Scenario 1: You typed bad code in `index.html` and want your last committed version back
```bash
# Discard all unstaged edits to index.html (Permanent discard!)
git restore index.html

# Discard all unstaged edits across the entire project
git restore .
```

### Scenario 2: You ran `git add .` and accidentally staged `.env`
```bash
# Unstage .env without deleting your local credentials
git restore --staged .env
```

### Scenario 3: You made a commit that broke production, and need to reverse it safely
```bash
# Find the bad commit hash
git log --oneline
# Example: 7a3f012 feat: Add broken payment button

# Revert that specific commit
git revert 7a3f012 -m "Revert 'feat: Add broken payment button'"
```
Notice what Git did: It did **not** delete commit `7a3f012`. Instead, it created a brand-new commit that cleanly subtracts the broken lines!

---

## 5. 🔍 Code Explanation: Breaking It Down

- `git restore`: Introduced in Git 2.23 to simplify undoing. It replaces the old, confusing `git checkout -- <file>`.
- `git revert`:
  - The **safest** way to undo commits that have already been pushed to GitHub.
  - Leaves the historical timeline intact, demonstrating accountability and transparent engineering integrity (*Amānah*).
- `git reset --hard`:
  - ⚠️ **DANGER ZONE**: Completely wipes out working directory changes and rewinds commits.
  - Only use this if you are 100% sure you never want to see those uncommitted lines again!

---

## 6. 🌍 Real-World Connection: The Incident at GitLab (2017)

- In 2017, a systems engineer accidentally ran a destructive command on a primary database directory.
- Because GitLab maintains transparent, verifiable version logs and backups, they were able to restore operations and published a world-famous public post-mortem explaining the technical remedy step-by-step.
- Transparently reverting mistakes rather than hiding them builds trust with users, clients, and fellow engineers!

---

## 7. ⚠️ Common Beginner Traps

1. **Running `git reset --hard` when you have uncommitted ideas**:
   - `git reset --hard` is one of the few commands in Git that can cause permanent data loss for code that was never committed!
   - *Rule*: When in doubt, commit or stash your work first before resetting!
2. **Reverting the wrong commit**:
   - Always run `git log -n 3` to verify the exact commit hash before running `git revert`.

---

## 8. 🔮 Predict the Output

You have an untracked, brand-new file named `secret_notes.txt` that you have NEVER committed to Git.
You run: `git restore secret_notes.txt`.

**Question**: Does Git delete `secret_notes.txt`?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> No! Git will print an error: <code>pathspec 'secret_notes.txt' did not match any file(s) known to git</code>. Git only restores files it already knows about in previous commits!
</details>

---

## 9. 🕵️ Code Detective: The Panic Reset

A junior developer pushed a commit to GitHub, realized it had a bug, and ran `git reset --hard HEAD~1` locally.
When they tried to `git push`, GitHub blocked them:

```text
! [rejected] main -> main (fetch first)
error: failed to push some refs
```

- **Why did GitHub reject it?** The developer's local history is now *behind* GitHub's history! Rewriting public history breaks synchronization for teammates.
- **The Proper Fix**: Run `git revert <bad-commit>`! This creates a forward-moving commit that pushes cleanly without any force-push danger!

---

## 10. 🏆 5 Levels of Mastery Exercises

### 🟢 Level 1: Recall
1. What modern command discards unstaged changes in a file?
2. What command removes a file from the staging area without deleting its code?
3. What is the difference between `git revert` and `git reset`?

### 🟡 Level 2: Understand
4. Why is `git revert` safe to use on shared public branches while `git reset` can break a team's workflow?
5. How does `git restore` help developers experiment fearlessly in their local code?

### 🟠 Level 3: Apply
6. Add an intentional silly paragraph to `index.html`. Run `git status` to observe it in red. Then run `git restore index.html` and verify the silly paragraph disappeared!

### 🔵 Level 4: Think & Troubleshoot
7. Explain the difference between `git reset --soft HEAD~1` and `git reset --hard HEAD~1`. What happens to your staged files in each case?

### 🟣 Level 5: Create & Build
8. Simulate a rollback scenario: Make a commit adding a "Feature Banner", discover a mock flaw, run `git revert`, and inspect `git log --oneline` to verify the clean audit trail.
