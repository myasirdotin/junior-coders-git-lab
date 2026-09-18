# Git & GitHub Quick Reference Cheatsheet ⚡📖

> **Quick Navigation**: A rapid lookup reference for everyday Git terminal commands, staging, branching, conflict resolution, and GitHub collaboration.

---

## 1. Initial Setup & Identity (One-Time)

```bash
# Check Git version
git --version

# Set global name and email
git config --global user.name "Your Name"
git config --global user.email "your.email@srinagar.edu.in"

# Set modern default branch name
git config --global init.defaultBranch main

# List all configuration settings
git config --list
```

---

## 2. Starting & Inspecting Repositories

```bash
# Initialize a new local repository
git init

# Clone an existing remote repository
git clone https://github.com/username/repository.git

# Check the status of the working tree and staging area
git status

# View compact one-line commit history
git log --oneline

# View commit history with visual branch graphs
git log --oneline --graph --all
```

---

## 3. The Daily Commit Loop (Stage & Commit)

```bash
# Stage a specific file
git add filename.html

# Stage all modified and new files
git add .

# View unstaged differences
git diff

# View staged differences (ready to commit)
git diff --staged

# Commit staged files with a meaningful message
git commit -m "feat: Add user login form"

# Amend the message of the most recent local commit
git commit --amend -m "feat: Add responsive user login form"
```

---

## 4. Undoing Changes & Safety Nets

```bash
# Discard unstaged modifications in a file (Back to last commit)
git restore filename.html

# Unstage a file (Move out of staging area back to working tree)
git restore --staged filename.html

# Temporarily shelve unfinished work
git stash

# Restore shelved work
git stash pop

# Safely undo a published commit by generating a reverse commit
git revert <commit-hash>
```

---

## 5. Branching & Merging

```bash
# List all local branches
git branch

# Create and switch to a new branch
git switch -c feature/new-navbar
# (Or classic syntax: git checkout -b feature/new-navbar)

# Switch back to an existing branch
git switch main

# Merge a completed feature into current branch
git merge feature/new-navbar

# Delete a merged branch
git branch -d feature/new-navbar

# Abort a conflicting merge and return to clean state
git merge --abort
```

---

## 6. Remote Synchronization & GitHub

```bash
# Link local repository to GitHub
git remote add origin git@github.com:username/repository.git

# Verify remote URLs
git remote -v

# Push commits and establish upstream tracking
git push -u origin main

# Standard push (once upstream is set)
git push

# Download remote commits without merging
git fetch origin

# Download and merge remote updates into active branch
git pull origin main
```

---

## 7. Conventional Commit Prefix Guide

| Prefix | When to Use | Example |
| :--- | :--- | :--- |
| `feat:` | A brand-new feature or functionality | `feat: Add student search bar` |
| `fix:` | A bug correction | `fix: Resolve mobile layout overflow` |
| `docs:` | Documentation changes only | `docs: Add deployment instructions to README` |
| `style:`| Code styling, whitespace, CSS formatting | `style: Improve button contrast for accessibility` |
| `refactor:` | Code restructuring with zero behavior change | `refactor: Optimize SQL query joins` |
| `test:` | Adding or fixing test suites | `test: Add validation tests for email format` |
| `chore:` | Build scripts, dependencies, `.gitignore` updates | `chore: Add .DS_Store to .gitignore` |
