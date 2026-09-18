# Chapter 9: Stashing Work in Progress (`git stash`) 🗄️⚡

---

## 1. 🌟 Real-Life Situation: An Urgent Interruption at Your Desk

Imagine you are in the middle of building an intricate LEGO castle in your room:
- Pieces are sorted into piles, towers are halfway built, and blueprints are spread across the carpet.
- Suddenly, your mother calls from the kitchen:
  > *"Please help carry the grocery bags inside from the car right now!"*
- You cannot finish the castle in 10 seconds.
- But you also don't want your little brother to accidentally step on your half-built towers while you are outside!
- What do you do? You pick up your unfinished castle, gently set it on a high shelf inside a storage cabinet, do the errand, and when you return, you pull the castle back down to your carpet and continue building exactly where you left off!

**`git stash` is that magical storage cabinet for your code!**

---

## 2. 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- Explain what the Git Stash is and when to use it.
- Shelve unfinished, uncommitted modifications using `git stash`.
- Inspect saved stashes using `git stash list`.
- Restore stashed changes back to your working tree using `git stash pop` and `git stash apply`.
- Discard unwanted stashes using `git stash drop` and `git stash clear`.

---

## 3. 👁️ Visual Concept Explanation

### The Stash Clipboard Lifecycle

```text
Working Tree (Dirty, Unfinished Code)
        │
        ▼  git stash
[ 🗄️ The Secret Stash Drawer (WIP Clipboard) ]   <--- Saves your work safely off to the side!
        │
        ▼  Your Working Tree is now 100% CLEAN! (Switch branches, pull updates, fix urgent bug)
        │
        ▼  git stash pop
Working Tree (Your unfinished code is restored right back into your files!)
```

---

## 4. 💻 Code Example: The 60-Second Stash Workflow

```bash
# 1. You are halfway through coding a new search feature in app.js
git status
# Output: modified: app.js

# 2. An urgent hotfix is needed on main! Stash your half-done search code:
git stash save "WIP: Halfway through search bar filter"

# 3. Check status: your working directory is clean!
git status
# Output: nothing to commit, working tree clean

# 4. View your saved stashes
git stash list
# Output: stash@{0}: WIP: Halfway through search bar filter

# 5. Fix the urgent bug on main, commit it, and push...
# (Bug is fixed!)

# 6. Now bring your unfinished search code back!
git stash pop

# 7. Check status: app.js is modified again, ready for you to finish!
git status
```

---

## 5. 🔍 Code Explanation: Breaking It Down

- `git stash` (or `git stash save "message"`): Takes all tracked modified files and moves them out of your working tree into a temporary storage stack.
- `git stash list`: Shows all shelved stashes with their IDs (`stash@{0}`, `stash@{1}`, etc.).
- `git stash pop`: Restores the most recent stash onto your working tree AND removes it from the stash stack.
- `git stash apply`: Restores the stash onto your working tree, but **keeps** a backup copy in the stash drawer just in case!
- `git stash drop`: Permanently discards a specific stash entry.
- `git stash clear`: Empties the entire stash drawer.

---

## 6. 🌍 Real-World Connection: Switching Context in Agile Teams

In modern software development:
- Developers frequently switch between feature branches, bug reports, and peer reviews.
- Git prevents switching branches (`git switch`) if your current uncommitted changes would conflict with the target branch.
- Instead of making messy temporary commits like `"wip asdf"`, developers run `git stash`, switch branches cleanly, and pop the stash when they return!

---

## 7. ⚠️ Common Beginner Traps

1. **Forgetting that new/untracked files aren't stashed by default**:
   - If you created a brand-new file that has never been tracked, plain `git stash` ignores it!
   - *Fix*: Use `git stash -u` (the `-u` flag stands for **include untracked**).
2. **Forgetting stashed work for months**:
   - Don't treat `git stash` as a long-term archive. It is designed for short-term interruptions (minutes to hours).

---

## 8. 🔮 Predict the Output

You have 1 modified file. You run `git stash`.
Then you run `git status`.

**Question**: What does `git status` output?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> <code>nothing to commit, working tree clean</code>! All your modifications were safely tucked away into the stash!
</details>

---

## 9. 🕵️ Code Detective: The Lost Draft

A junior coder had 300 lines of half-written code in `calculator.js`.
Their teammate asked them to check an urgent issue. The coder didn't know about `git stash`, so they ran `git restore calculator.js` to clear their screen!

- **The Disaster**: All 300 lines were permanently deleted because `git restore` discards uncommitted work!
- **The Moral**: Whenever you need to clear your workspace temporarily, **ALWAYS run `git stash`**, never `git restore`!

---

## 10. 🏆 5 Levels of Mastery Exercises

### 🟢 Level 1: Recall
1. What command shelves unfinished changes to clean your working tree?
2. What command lists all current stashes?
3. What is the difference between `git stash pop` and `git stash apply`?

### 🟡 Level 2: Understand
4. Why is `git stash` cleaner than committing unfinished, non-working code with messages like `"wip broken"`?
5. What flag must you include to stash brand-new untracked files?

### 🟠 Level 3: Apply
6. Make an edit to `index.html`. Run `git stash -u -m "testing stash"`. Verify your working tree is clean. Then run `git stash pop` and verify the edit returned.

### 🔵 Level 4: Think & Troubleshoot
7. Can a stash cause a merge conflict when popped? What happens if the branch you are on modified the exact same lines you stashed?

### 🟣 Level 5: Create & Build
8. Write a 3-step cheat card for junior developers explaining:
   - When to commit.
   - When to stash.
   - When to discard.
