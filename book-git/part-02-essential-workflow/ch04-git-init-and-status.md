# Chapter 4: Initializing Repositories & Checking Status

---

## 🌟 Real-Life Story

**Founding a Club Archive**

Your class starts a new Science & Coding Club. You do not toss meeting notes into random corners of the room. Instead, you buy one sturdy binder, write the club's name on the front, and put it on a special shelf. From that day on, every official club paper goes into that binder. Git works the same way: it does not watch a folder until you say, *"Git, please look after this folder."* The command that says this is **`git init`**.

---

## 🎯 What You Will Learn

- Turn an ordinary folder into a Git repository with `git init`.
- Explain what a **repository** (or "repo") is and what the hidden `.git` folder does.
- Read the messages that `git status` prints.
- Tell the difference between **untracked** and **tracked** files.

---

## Before and After `git init`

A **repository** is a project folder that Git looks after. Git keeps all the history in one hidden folder called `.git`.

```text
BEFORE git init:
📁 eco-club/
   ├── index.html
   └── style.css
   (An ordinary folder. No history.)

AFTER git init:
📁 eco-club/
   ├── 📁 .git/   <-- Git's engine room
   ├── index.html
   └── style.css
   (A Git repository. History is on!)
```

The `.git` folder holds every snapshot, every branch name and every setting for this project. You never edit it by hand. If you delete it, the folder becomes ordinary again and all its history is gone.

---

## Example: Creating Your First Repository

Open your terminal in your practice folder and type these commands:

```bash
mkdir eco-club
cd eco-club
git init
```

Git replies:

```text
Initialized empty Git repository in C:/Users/zainab/practice/eco-club/.git/
```

Your path will be different. Now ask Git how things look:

```bash
git status
```

```text
On branch main

No commits yet

nothing to commit (create/copy files and use "git add" to track)
```

> **Why `main`?** In Chapter 3 you ran `git config --global init.defaultBranch main`. That setting makes every new repository start on a branch called `main`. Without it, Git still uses the older name `master` for the first branch.

Now create a file and check the status again:

```bash
echo "# Eco Club" > README.md
git status
```

```text
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	README.md

nothing added to commit but untracked files present (use "git add" to track)
```

In most terminals, `README.md` appears in **red**. Red in `git status` means "Git sees this, but has not saved it yet."

---

## How It Works

- **`git init`** is short for *initialize* (to set something up for the first time). It creates the hidden `.git` folder and the starting branch.
- **`git status`** is the most useful command in Git. Run it before and after almost every step. It tells you:
  1. Which branch you are on.
  2. Which files are new or changed.
  3. Which files are staged (ready to save) and which are not.
- **Untracked file**: a file in your folder that Git has never saved. If you delete it, Git cannot bring it back.
- **Tracked file**: a file that is part of at least one commit. Git knows its history and can restore it.

Git always gives a hint in brackets, such as `(use "git add <file>..." ...)`. Read these hints. They tell you the next command you probably need.

---

## 🌍 Real-World Connection

**How many `.git` folders should a project have?**

- The rule is simple: **one `.git` folder per project**, in the project's top folder.
- If you run `git init` in a big folder such as `C:\Users\YourName`, Git will try to watch every file in your user folder. `git status` becomes slow and fills with hundreds of untracked files.
- Do not create a repository inside another repository. Professional teams have special tools for that (called *submodules*), but beginners do not need them.

---

## 🔮 Predict the Output

You create a new empty folder. You run `git status` **before** running `git init`. What happens?

<details>
<summary>👀 Click to check your answer</summary>

Git prints an error:

```text
fatal: not a git repository (or any of the parent directories): .git
```

Git commands like `status` only work inside a repository. Run `git init` first.

</details>

---

## 🕵️ Code Detective

**The Invisible Repository**

A student runs `git init`, opens File Explorer and says: *"I don't see any `.git` folder! Did it fail?"*

- **The clue:** names that start with a dot are usually hidden. This protects important folders from being deleted by accident.
- **How to see it:**
  - Windows File Explorer: **View** → **Show** → tick **Hidden items**.
  - In PowerShell: `ls -Force`. In Git Bash: `ls -a`.

In Git Bash, `ls -a` shows:

```text
.
..
.git
README.md
```

Git did not fail. The folder was there all along.

---

## ⚠️ Common Mistake

**Running `git init` in the wrong folder**

❌ **Wrong:** you open a terminal, it starts in your user folder, and you type `git init` straight away.

**What happens:** Git turns your whole user folder into a repository. `git status` lists hundreds of untracked files, such as `Desktop/`, `Documents/` and `Downloads/`.

✅ **Fixed version:** check where you are first, then move into your project folder.

```bash
pwd
cd eco-club
git init
```

If you already ran `git init` in the wrong place, delete only the hidden `.git` folder there. Your files stay safe; only Git's tracking is removed.

**Running `git init` twice in the same folder** is harmless. Git just says `Reinitialized existing Git repository in .../eco-club/.git/` and keeps your history.

---

## ✍️ Try It

1. Make a folder called `library-notes` and move into it.
2. Run `git init`.
3. Run `git status` and read every line.
4. Create a file called `books.txt` with one book title inside.
5. Run `git status` again. Which section is `books.txt` listed under?

<details>
<summary>Hint</summary>

Use `mkdir library-notes`, then `cd library-notes`. To create the file, type `echo "The Water Cycle" > books.txt`. The file should appear under **Untracked files**.

</details>

---

## 📝 Recap

- `git init` turns an ordinary folder into a Git repository.
- All history lives in the hidden `.git` folder. Deleting it removes the history.
- `git status` tells you your branch and which files are new, changed or staged.
- **Untracked** files are files Git has never saved.
- Keep one repository per project, and check your folder before running `git init`.

---

## 🏆 Practice

### 🟢 Level 1: Recall

1. Which command turns an ordinary folder into a Git repository?
2. Which command shows the current state of your project's files?
3. What is an "untracked file"?

<details>
<summary>Show answer</summary>

1. `git init`
2. `git status`
3. A file that is in your project folder, but Git has never saved it in a commit. Git cannot restore it if it is lost.

</details>

### 🟡 Level 2: Apply

1. Why do developers call `git status` their "compass"?
2. Why is the `.git` folder hidden by default?
3. Create a folder named `weather-diary`, turn it into a repository, create `app.js`, and run `git status`. Write down what Git says about `app.js`.

<details>
<summary>Show answer</summary>

1. It tells you where you are (the branch) and what state every file is in. It also suggests the next command. You can always find your way with it.
2. To protect it. If someone deleted it by accident, the whole history of the project would be lost.
3. Commands:

```bash
mkdir weather-diary
cd weather-diary
git init
echo "console.log('Hello');" > app.js
git status
```

`app.js` is listed under **Untracked files**, in red in most terminals.

</details>

### 🔴 Level 3: Challenge

**Clean up and start again properly.**

1. You accidentally ran `git init` on your `Desktop`. Explain how to undo it without losing any desktop files.
2. Then write the list of commands that would:
   - create a new folder called `clean-start`,
   - turn it into a repository,
   - create a `README.md` with a title line,
   - and print the status.
3. Bonus: put those commands into a script file (`start.sh` for Git Bash) so one command sets up a new project.

<details>
<summary>Show one possible answer</summary>

1. Delete only the hidden `.git` folder on the Desktop. In Git Bash: `rm -rf ~/Desktop/.git`. The desktop files are not touched; only Git's tracking disappears.
2. and 3. A script `start.sh`:

```bash
mkdir clean-start
cd clean-start
git init
echo "# Clean Start" > README.md
git status
```

Run it with `bash start.sh`. The last lines show `README.md` under **Untracked files**.

</details>
