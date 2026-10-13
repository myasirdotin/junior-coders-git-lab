# Chapter 3: Setting Up Git & Your Identity 💻

---

## 🌟 Real-Life Story

**Signing Your Work**

When an architect draws the plan for a new school, she signs and dates it. Everyone then knows who made the plan and who can answer questions about it. Git does the same thing for code. Every commit is stamped with a name, an email address and the date and time. So before your first commit, you must tell Git who you are.

---

## 🎯 What You Will Learn

- Check that Git is installed with `git --version`.
- Set your name and email with `git config --global`.
- Set the first branch name of new projects to `main`.
- Read your settings back and fix a wrong one.

---

## 🛠️ Installing Git

Git is free. Download it from the official site, **git-scm.com**, or ask your teacher to install it in the computer lab.

- **Windows**: run the installer and keep the default choices. It also installs **Git Bash**, a terminal for Git.
- **macOS**: type `git --version` in Terminal. If Git is missing, the Mac offers to install it.
- **Linux (Ubuntu)**: `sudo apt install git` (ask an adult or teacher before installing software).

Then open a terminal (PowerShell, Command Prompt, Terminal or Git Bash) and check:

```bash
git --version
```

```text
git version 2.54.0.windows.1
```

Your number may be different. Any recent version works with this book.

---

## 👁️ Your Git "Passport": the `.gitconfig` File

Git keeps your personal settings in a file called `.gitconfig` in your home folder. Think of it as a passport that Git reads every time you commit:

```text
┌────────────────────────────────┐
│ ~/.gitconfig                   │
├────────────────────────────────┤
│ [user]                         │
│     name = Zainab Ahmed        │
│     email = zainab@example.org │
│ [init]                         │
│     defaultBranch = main       │
└────────────────────────────────┘
```

`~` means "your home folder", for example `C:\Users\Zainab` on Windows. When you run `git commit`, Git copies your name and email from this file into the commit.

---

## 💻 Example: One-Time Setup

Run these three commands once on your computer. Use your own name and email.

```bash
git config --global user.name "Zainab Ahmed"
git config --global user.email "zainab@example.org"
git config --global init.defaultBranch main
```

These commands print nothing when they work. Check your settings like this:

```bash
git config --list --global
```

```text
user.name=Zainab Ahmed
user.email=zainab@example.org
init.defaultbranch=main
```

Git shows setting names in small letters, so `defaultBranch` appears as `defaultbranch`. That is normal.

> **Note:** Plain `git config --list` shows *all* settings, including many that came with Git. It is a longer list, but your three lines are in it.

---

## 🔍 How It Works

- `git config`: reads or changes Git settings.
- `--global`: the setting applies to **every** Git project for your user on this computer. You only do this once.
- `user.name`: the name shown next to your commits.
- `user.email`: the email stored in your commits. Later, GitHub uses it to link commits to your account.
- `init.defaultBranch main`: new projects start with a branch called `main`. Without it, Git still uses the older name `master` and prints a hint. This book uses `main`.

**Keep your email private (*Amānah*).** Every commit you share shows its email to anyone who can see the project. Use a school email your teacher gives you, or, once you have a GitHub account, the private "noreply" address GitHub offers in its email settings. Never put a parent's phone number or home address anywhere in Git.

---

## 🌍 Real-World Connection

- When people fix bugs in big open-source projects such as Python or Linux, their names stay in the history for many years.
- Being honest about who wrote what reflects the value of **truthfulness (*Ṣidq*)**. Never commit under another person's name.
- On a shared lab computer, check `git config user.name` first. The last student's name might still be set.

---

## 🔮 Predict the Output

After the setup above, you type:

```bash
git config user.name
```

**Question**: What does Git print?

<details>
<summary>👀 Click to check your answer</summary>

**Answer:** It prints the name you saved, and changes nothing:

```text
Zainab Ahmed
```

Giving a setting name with no value means "show me this setting".

</details>

---

## 🕵️ Code Detective

**The Anonymous Commit**

A student tried to commit on a new computer and saw this:

```text
Author identity unknown

*** Please tell me who you are.

Run

  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"

to set your account's default identity.
Omit --global to set the identity only in this repository.
```

- **What happened?** Git will not make a commit without a name and email. Every change must have an owner.
- **The fix**: run the two `git config --global` commands with your own details, then run `git commit` again.

---

## ⚠️ Common Mistake

**Forgetting quotes around a name with a space**

**Wrong:**

```bash
git config --global user.name Zainab Ahmed
```

**What happens:** there is no error, but Git saves only the first word:

```text
Zainab
```

**Fixed:**

```bash
git config --global user.name "Zainab Ahmed"
```

**Typing a made-up email** such as `asdf@fake.com` is a second common slip. Your commits will not be linked to your account later. Use a real email you are allowed to use, as explained above.

---

## ✍️ Try It

On your own computer (or the lab computer your teacher gives you):

1. Run `git --version`.
2. Set your name, email and `init.defaultBranch main`.
3. Run `git config --list --global` and check all three lines.

<details>
<summary>Hint</summary>

If a line is wrong, just run the same `git config --global ...` command again with the right value. The new value replaces the old one.

</details>

---

## 📝 Recap

- `git --version` checks that Git is installed.
- Git needs your name and email before your first commit.
- `--global` saves a setting once for all your projects, in `~/.gitconfig`.
- `init.defaultBranch main` makes new projects start on `main`.
- Put quotes around values with spaces, and keep personal details private.

---

## 🏆 Practice

### 🟢 Level 1: Recall

1. Which flag makes a `git config` setting apply to all your projects?
2. Which command lists your global settings?
3. What branch name does this book use for new projects?

<details>
<summary>Show answer</summary>

1. `--global`
2. `git config --list --global` (or `git config --list` for every setting)
3. `main`

</details>

### 🟡 Level 2: Apply

1. Why does Git need an email address before you can commit?
2. What is the difference between `--global` settings and settings made inside one project with `--local`?
3. Write the command that changes your saved email to `zainab.ahmed@example.org`.

<details>
<summary>Show answer</summary>

1. Every commit records who made it, so the team knows whom to ask about a change.
2. `--global` applies to all projects for your user. `--local` applies only to the one repository you are in, and it wins over the global value there. (`--local` is the default when you are inside a repository and give no flag.)
3. Run:

```bash
git config --global user.email "zainab.ahmed@example.org"
```

</details>

### 🔴 Level 3: Challenge

Write a one-page setup guide for students in your computer lab.

1. Explain how to install Git on Windows, macOS and Ubuntu Linux.
2. List the three `git config --global` commands, with placeholders for name and email.
3. Add a "check it worked" step.
4. Add a privacy tip about emails.
5. Extra question: if you change your email next month, do your **old** commits change too? Why?

<details>
<summary>Show one possible answer</summary>

**Lab Setup Guide**

1. Install: Windows, download from git-scm.com and keep the defaults. macOS, type `git --version` and accept the install. Ubuntu, a teacher runs `sudo apt install git`.
2. Configure:

```bash
git config --global user.name "Your Name"
git config --global user.email "your-school-email@example.org"
git config --global init.defaultBranch main
```

3. Check: `git config --list --global` shows the three lines.
4. Privacy: use your school email, never a parent's personal details.
5. No. Old commits keep the old email. A commit never changes after it is made; the new email is used only for new commits.

</details>
