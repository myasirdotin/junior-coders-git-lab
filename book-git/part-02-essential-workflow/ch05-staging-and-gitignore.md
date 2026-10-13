# Chapter 5: Staging Changes & The Sacred `.gitignore` 🛡️

---

## 🌟 Real-Life Story

**The Suitcase and the Bin**

You are packing for a school science trip. Into the suitcase go your notebook, your slides and your toothbrush. The banana peel from breakfast and your scrap paper go in the bin, not the suitcase. Your house keys and your private diary stay at home. In Git, **`git add`** puts chosen files into the suitcase, and **`.gitignore`** is the list of things that must never be packed.

---

## 🎯 What You Will Learn

- Stage one file with `git add <file>` and everything with `git add .`.
- Unstage a file without losing your work, using `git restore --staged`.
- Create a **`.gitignore`** file that keeps secrets and junk out of Git.
- Stop tracking a file that was committed by mistake, using `git rm --cached`.
- Explain why guarding passwords and keys is a trust (*Amānah*).

---

## 👁️ The Staging Filter and the `.gitignore` Shield

**Staging** means choosing which changes will go into the next commit. The **staging area** is the waiting room for those changes (you met it in Chapter 2).

```text
Your folder           What happens
-----------           ------------
index.html  -- add -->  STAGING AREA
style.css   -- add -->  STAGING AREA
.env        --+
debug.log   --+-->  .gitignore shield
node_modules/ +     (Git skips them)
```

---

## 💻 Example: Staging Files

We start in a small school library project. It has a page, a stylesheet, a secret file `.env` and a log file.

```bash
git status
```

```text
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.env
	debug.log
	index.html
	style.css

nothing added to commit but untracked files present (use "git add" to track)
```

Stage just one file, then look again:

```bash
git add index.html
git status
```

```text
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   index.html

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.env
	debug.log
	style.css
```

`index.html` moved to **Changes to be committed** (green in most terminals). That is the staging area.

`git add .` stages **everything** in this folder and its sub-folders. The dot `.` means "this folder". Do not run it yet: `.env` holds a password, so we must build the shield first.

---

## 🛡️ Example: Creating a `.gitignore` File

Create a plain text file named exactly `.gitignore` (with the dot, and no `.txt` at the end) in the top folder of the project:

```text
# Secret settings (passwords and keys)
.env

# Log files made by programs
*.log

# Downloaded libraries (can be installed again)
node_modules/
vendor/

# Operating system junk
.DS_Store
Thumbs.db
```

Lines starting with `#` are comments. Now check the status again:

```bash
git status
```

```text
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   index.html

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.gitignore
	style.css
```

`.env` and `debug.log` have disappeared from the list. Git now ignores them. Now `git add .` is safe:

```bash
git add .
git status
```

```text
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   .gitignore
	new file:   index.html
	new file:   style.css
```

If you try to add an ignored file by name, Git warns you:

```bash
git add debug.log
```

```text
The following paths are ignored by one of your .gitignore files:
debug.log
hint: Use -f if you really want to add them.
hint: Disable this message with "git config set advice.addIgnoredFile false"
```

---

## ↩️ Example: Unstaging a File

Say the project already has one commit. You edit `index.html`, stage it, and then change your mind:

```bash
git add index.html
git status
```

```text
On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	modified:   index.html
```

Take it back out of the staging area:

```bash
git restore --staged index.html
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

Your edit is still in the file. Only the "packed" mark was removed.

> **Before the first commit**, `git restore --staged` does not work yet. Git says `fatal: could not resolve 'HEAD'`, because there is no commit to compare with. Use the command Git suggests instead: `git rm --cached index.html`. It also keeps your file.

---

## 🔍 How It Works

- `git add <file>`: copies the file's current content into the staging area.
- `git add .`: stages every new or changed file in this folder and below, except ignored ones.
- `git restore --staged <file>`: unstages the file. The text you wrote is not touched.
- **Patterns** in `.gitignore`:
  - `*.log`: the star `*` means "any name". It ignores `debug.log`, `error.log` and so on.
  - `node_modules/`: the slash at the end means "this whole folder".
- `.gitignore` only affects **untracked** files. A file that is already committed stays tracked (see the Common Mistake below).

---

## 🌍 Real-World Connection

**Leaked secrets and *Amānah***

- Security researchers scan public code websites every year. They find **millions** of passwords and secret keys that people committed by accident.
- Automatic programs search for these leaks all the time. A leaked password can be misused within minutes.
- In Islam, a secret someone trusts you with is an ***Amānah*** (a trust). A website's passwords and its users' data are exactly that.
- So: write the `.gitignore` **before the first commit**. If a secret was ever committed, **change the password or key**. Deleting the file later is not enough, because old commits still contain it.

---

## 🔮 Predict the Output

You have a file named `database.log`. Your `.gitignore` contains `*.log`. You run `git add .` and then `git status`. Will `database.log` be listed under **Changes to be committed**?

<details>
<summary>👀 Click to check your answer</summary>

**No.** `git add .` skips every file that matches a pattern in `.gitignore`. `database.log` does not appear anywhere in `git status`.

</details>

---

## 🕵️ Code Detective

**The Giant Repository**

A student's project took 45 minutes to copy to a new computer. The lead teacher looked inside and found a `node_modules/` folder with 50,000 files in it.

- **The clue:** `node_modules/` (for JavaScript) and `vendor/` (for PHP) hold downloaded libraries. They can be rebuilt any time with `npm install` or `composer install`.
- **The fix:** add `node_modules/` and `vendor/` to `.gitignore`. Keep only your own code in Git.

---

## ⚠️ Common Mistake

**Adding a secret file to `.gitignore` too late**

❌ **Wrong:** you commit `.env` first, and only afterwards add `.env` to `.gitignore`.

**What happens:** nothing changes. Git keeps tracking `.env`, because it is already part of a commit. `git status` does not complain, so the mistake is easy to miss:

```text
On branch main
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.gitignore

nothing added to commit but untracked files present (use "git add" to track)
```

✅ **Fixed version:** tell Git to stop tracking the file, but keep it on your computer:

```bash
git rm --cached .env
git status
```

```text
rm '.env'
On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	deleted:    .env

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.gitignore
```

Then commit with `git add .gitignore` and `git commit -m "Stop tracking .env"`. The file stays on your disk, but the next commits will not include it. The **old** commit still contains the secret, so change that password too.

**Naming the file `gitignore.txt`** is the other common slip. Windows may hide the `.txt` ending. The name must be exactly `.gitignore`.

---

## ✍️ Try It

1. In a practice repository, create `notes.txt`, `test.log` and `.env` (with the line `KEY=practice`).
2. Run `git status` and count the untracked files.
3. Create a `.gitignore` that hides `test.log` and `.env`.
4. Run `git status` again. Which files are left?

<details>
<summary>Hint</summary>

Your `.gitignore` needs two lines: `*.log` and `.env`. At the end, only `.gitignore` and `notes.txt` should be listed as untracked.

</details>

---

## 📝 Recap

- `git add <file>` stages one file; `git add .` stages everything not ignored.
- `git restore --staged <file>` unstages a file and keeps your edits.
- `.gitignore` lists files and folders Git must skip, such as `.env`, `*.log` and `node_modules/`.
- Write `.gitignore` before your first commit. It does not affect files that are already tracked.
- If a secret was committed, use `git rm --cached` and **change the secret**. This is *Amānah*.

---

## 🏆 Practice

### 🟢 Level 1: Recall

1. Which command stages all new and changed files in the current folder?
2. What is the exact name of the file that tells Git what to ignore?
3. How do you unstage a file without losing its edits?

<details>
<summary>Show answer</summary>

1. `git add .`
2. `.gitignore`
3. `git restore --staged <file>` (before the very first commit, use `git rm --cached <file>`).

</details>

### 🟡 Level 2: Apply

1. Why should library folders like `node_modules/` or `vendor/` stay out of Git?
2. Explain how `.gitignore` works as a safety shield for a website.
3. Write a `.gitignore` for a PHP and MySQL school project. It must ignore `.env`, the `vendor/` folder and every database backup ending in `.sql`.

<details>
<summary>Show answer</summary>

1. They are very large and can be downloaded again with `npm install` or `composer install`. Keeping them out makes the repository small and fast.
2. Once a file name or pattern is listed, `git add .` skips it every time. You cannot accidentally commit a password file, even when you are in a hurry.
3. One possible file:

```text
# Secret settings
.env

# Libraries from Composer
vendor/

# Database backups
*.sql
```

</details>

### 🔴 Level 3: Challenge

**The leaked key.** Three commits ago you committed `config.env` with a real secret key in it.

1. Is adding `config.env` to `.gitignore` now enough to protect the key? Explain why.
2. Write the commands that stop Git tracking the file but keep it on your computer.
3. Say what else you must do to keep the trust (*Amānah*).
4. Bonus: write a starter `.gitignore` for Junior Coders projects (HTML, CSS, JavaScript, PHP and Laravel).

<details>
<summary>Show one possible answer</summary>

1. No. `.gitignore` does not affect files that are already tracked. The key also stays inside the three old commits.
2. Commands:

```bash
echo "config.env" >> .gitignore
git rm --cached config.env
git add .gitignore
git commit -m "Stop tracking config.env"
```

3. Treat the key as leaked. Create a new key and switch the old one off. Removing the file from Git does not remove it from the old commits.
4. A starter template:

```text
# Secrets
.env
*.env

# Libraries
node_modules/
vendor/

# Laravel generated files
storage/*.key
public/hot

# Logs and backups
*.log
*.sql

# Operating system and editor files
.DS_Store
Thumbs.db
.vscode/
```

</details>
