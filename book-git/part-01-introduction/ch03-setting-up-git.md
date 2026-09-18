# Chapter 3: Setting Up Git & Your Identity 💻👤

---

## 1. 🌟 Real-Life Situation: Signing an Official Certificate

When an architect drafts a blueprint for a hospital or school, they don't leave it anonymous. They sign their name and date at the bottom so everyone knows who created the plan, who is responsible for its safety, and who can answer questions about it.

In Git, **every single commit you ever make is permanently stamped with your author identity**:
- Your Name
- Your Email Address
- The Date and Time of the commit

Before you can create your first commit, Git requires you to introduce yourself. Setting up your identity ensures that when your code is uploaded to GitHub, your contributions are properly credited to you!

---

## 2. 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- Verify if Git is installed on your computer (`git --version`).
- Configure your global author name and email using `git config`.
- Set modern Git defaults, such as setting the default branch name to `main`.
- Inspect and edit your Git configuration settings.
- Understand where Git stores global settings (`.gitconfig`).

---

## 3. 👁️ Visual Concept Explanation

### The Anatomy of `.gitconfig`

```text
  ┌─────────────────────────────────────────────────────────────┐
  │ ~/.gitconfig (Your Global Developer Passport)                │
  ├─────────────────────────────────────────────────────────────┤
  │ [user]                                                      │
  │     name = Yasir Rasool                                     │
  │     email = y.rasool@srinagar.edu.in                        │
  │ [init]                                                      │
  │     defaultBranch = main                                    │
  │ [core]                                                      │
  │     editor = code --wait                                    │
  └─────────────────────────────────────────────────────────────┘
```

When you run `git commit`, Git automatically opens this digital passport, copies your name and email, and permanently embeds them into the commit metadata!

---

## 4. 💻 Code Example: Initial One-Time Configuration

Open your terminal (PowerShell, Command Prompt, or Bash) and run these commands:

```bash
# 1. Verify Git is installed
git --version
# Output: git version 2.45.0.windows.1 (or similar)

# 2. Configure your Full Name
git config --global user.name "Yasir Rasool"

# 3. Configure your Email Address
git config --global user.email "y.rasool@srinagar.edu.in"

# 4. Set the default primary branch name to 'main'
git config --global init.defaultBranch main

# 5. Verify your settings
git config --list
```

---

## 5. 🔍 Code Explanation: Breaking It Down

- `--global`: Applies these settings to **all** Git projects on your entire computer. You only have to run this once!
- `user.name`: The human name that appears next to your commits in `git log` and GitHub.
- `user.email`: Should match the email address associated with your GitHub account so GitHub links commits to your profile avatar.
- `init.defaultBranch main`: Ensures that whenever you create a new repository (`git init`), the starting branch is named `main` (the modern universal industry standard).

---

## 6. 🌍 Real-World Connection: Open Source Attribution

- When programmers contribute bug fixes to global projects like Python, Linux, or Laravel, their names and emails remain in the repository history for decades!
- Employers and university admissions officers frequently check GitHub profiles to see verified commit histories, review code quality, and observe collaboration habits.
- Writing your honest, real name embodies the Islamic virtue of **Truthfulness (*Ṣidq*)** and professional pride.

---

## 7. ⚠️ Common Beginner Traps

1. **Typing fake or throwaway emails**:
   - If you type `user.email "asdf@fake.com"`, GitHub won't recognize your commits, and your green contribution squares won't light up!
2. **Forgetting quotes around names with spaces**:
   - `git config --global user.name Yasir Rasool` (May produce an error or only save `Yasir`).
   - *Fix*: Always wrap in quotes: `"Yasir Rasool"`.

---

## 8. 🔮 Predict the Output

If you type:

```bash
git config user.name
```

**Question**: What will Git output on your terminal?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> It will print your configured name (e.g., <code>Yasir Rasool</code>) without modifying anything!
</details>

---

## 9. 🕵️ Code Detective: The Anonymous Commit Warning

A student tried to run `git commit` for the first time and got this error message:

```text
Author identity unknown
*** Please tell me who you are.
Run:
  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"
```

- **What happened?** Git refuses to create an anonymous commit because accountability is essential in software development.
- **The Fix**: Run the two suggested `git config --global` commands, and re-run `git commit`!

---

## 10. 🏆 5 Levels of Mastery Exercises

### 🟢 Level 1: Recall
1. What flag is used with `git config` to apply settings computer-wide?
2. What command lists all current Git configuration values?
3. What is the modern standard default branch name?

### 🟡 Level 2: Understand
4. Why does Git require an email address before allowing commits?
5. What is the difference between global configuration and repository-specific (`--local`) configuration?

### 🟠 Level 3: Apply
6. Open your terminal right now, run `git config --list`, and verify that `user.name`, `user.email`, and `init.defaultBranch` are properly configured.

### 🔵 Level 4: Think & Troubleshoot
7. If you change your email address in the future, will your past commits retroactively change their author email? Why or why not? (Hint: Commits are cryptographically immutable!).

### 🟣 Level 5: Create & Build
8. Write a quick setup guide for students in your computer lab explaining how to install and configure Git on Windows, Mac, or Ubuntu Linux.
