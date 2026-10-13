# Chapter 16: Cloning & Forking Open Source Projects (`clone`, `fork`)

---

## 🌟 Real-Life Story

**Borrowing a Craftsman's Blueprint**

You visit a woodworker in Srinagar and admire the pattern carved on a walnut desk. You politely ask if you may study how it was made. The craftsman gives you a full copy of the plan: "Take it home, learn from it, and build your own bookshelf." You did not take the workshop; you were given a copy to learn from and improve. In Git, **cloning** and **forking** are ways of getting such a copy.

---

## 🎯 What You Will Learn

- Copy a whole repository and its history with `git clone <address>`.
- List what a clone sets up for you: the folder, the full history and the `origin` remote.
- Explain the difference between a **clone** and a **fork**.
- Keep your fork up to date with an `upstream` remote.

---

> **Reminder:** forking needs a GitHub account, which is for ages **13+**. If you are younger, you can practise every command here offline with bare folders (shown below), or in a teacher-managed classroom setup.

---

## Clone vs. Fork

- **Clone** (`git clone`): copies a repository from a remote **to your computer**. You get every file and every commit.
- **Fork** (a GitHub button): copies someone's repository **into your GitHub account**. Forking is a GitHub feature, not a Git command.

```text
1. Original repo  (author/tree-map)
        │  click "Fork" on GitHub
        ▼
2. Your fork      (you/tree-map)
        │  git clone <your fork>
        ▼
3. Your laptop    (edit, commit, test)
        │  git push origin <branch>
        ▼
4. Your fork on GitHub
        │  open a Pull Request
        ▼
5. Author reviews and merges 🎉
```

You open a **pull request** (Chapter 17) to ask the original author to take your change.

---

## Cloning a Repository

```bash
git clone https://github.com/zainab-codes/tree-map.git
cd tree-map
git log --oneline
git remote -v
```

To practise offline, clone a bare folder instead (`git clone ../tree-map.git`). This is the real output from such a clone:

```text
Cloning into 'tree-map'...
done.
```

```text
5627961 Add tree list page
7872ddb Start tree map
```

```text
origin	https://github.com/zainab-codes/tree-map.git (fetch)
origin	https://github.com/zainab-codes/tree-map.git (push)
```

From GitHub, Git also prints progress lines while downloading; your hashes and numbers will differ.

### What `git clone` did for you

1. Made a new folder named after the repository (`tree-map`).
2. Created the hidden `.git` folder inside it.
3. Downloaded **every commit** in the history.
4. Switched to the default branch (`main`) and filled the folder with its files.
5. Saved the address as the remote **`origin`**, with tracking already set up, so `git pull` and `git push` work straight away.

---

## Keeping a Fork Up to Date with `upstream`

After you fork, the original author keeps adding commits. Your fork does not get them by itself. Add the original project as a second remote. By custom it is called **`upstream`**:

```bash
git remote add upstream https://github.com/author/tree-map.git
git remote -v
```

```text
origin	https://github.com/zainab-codes/tree-map.git (fetch)
origin	https://github.com/zainab-codes/tree-map.git (push)
upstream	https://github.com/author/tree-map.git (fetch)
upstream	https://github.com/author/tree-map.git (push)
```

Now fetch the author's new commits, merge them into your `main`, and push them to your fork:

```bash
git switch main
git fetch upstream
git merge upstream/main
git push origin main
```

```text
From ../tree-map
 * [new branch]      main       -> upstream/main
Updating 5627961..3b479e5
Fast-forward
 README.md | 1 +
 1 file changed, 1 insertion(+)
To my-fork.git
   5627961..3b479e5  main -> main
```

(This output is from the offline practice, so the addresses are folder names.)

### Why can't you push straight to someone else's project?

You can only push to repositories where the owner has given you **write access**. Otherwise anyone could change anyone's website. For other people's projects you fork, push to your fork, and open a pull request.

---

## 🌍 Real-World Connection: The Spirit of Open Source

- **Open-source** software is software whose code anyone may read, study and improve.
- Linux runs most of the world's web servers, and Android is built on the Linux kernel.
- Chromium is the open-source base of the Chrome, Edge and Brave browsers.
- PHP and Python are open source, and so is Git itself.
- Studying and improving shared code is a practical way to spread **Beneficial Knowledge (*'Ilm Nāfi'*)**. Always respect each project's licence and credit the authors.

---

## 🔮 Predict the Output

You clone a weather project that the author has worked on for 3 years. You go into the folder and run `git log`.

**Question**: Do you see only the latest version, or the whole 3-year history?

<details>
<summary>👀 Click to check your answer</summary>

**Answer:** The whole history. A clone downloads every commit, so you can look back at any version the author ever committed.

</details>

---

## 🕵️ Code Detective: The Permission Denied Push

A student cloned the Python language's repository, fixed a typo in the documentation, committed, and ran `git push origin main`. GitHub replied:

```text
remote: Permission to python/cpython.git denied to zainab-codes.
fatal: unable to access 'https://github.com/python/cpython.git/': The requested URL returned error: 403
```

- **Why?** The student does not have write access to that repository.
- **The fix:** fork it on GitHub, clone the fork, push the fix to a branch on the fork, and open a pull request. (Big projects also have their own contribution rules; read their `CONTRIBUTING` file first.)

---

## ⚠️ Common Mistake

**Mistake 1: Cloning inside another repository.**

- ❌ **Wrong:** running `git clone ...` while you are still inside your own project folder.
- **What happens:** you get a repository inside a repository. When you run `git add .`, Git warns you:

```text
warning: adding embedded git repository: inner
hint: You've added another git repository inside your current repository.
hint: Clones of the outer repository will not contain the contents of
hint: the embedded repository and will not know how to obtain it.
```

- ✅ **Fixed:** run `cd ..` (or go to your general projects folder) **before** `git clone`. If it already happened, move the cloned folder out of your project.

**Mistake 2: Downloading the ZIP instead of cloning.**

- ❌ **Wrong:** clicking **Code ➔ Download ZIP** on GitHub to start working on a project.
- **What happens:** you get only the files. There is no `.git` folder, so no history, no `origin` and no way to push.
- ✅ **Fixed:** use `git clone <address>` to get the full repository.

---

## ✍️ Try It

Pretend to fork and clone, fully offline.

1. In a `practice` folder, take your `club-remote.git` from Chapter 14 as the "original".
2. Make your "fork": `git clone --bare club-remote.git my-fork.git` (`--bare` makes a copy with history only, like GitHub stores).
3. Clone your fork to work on it: `git clone my-fork.git my-club`.
4. Go into `my-club` and run `git log --oneline` and `git remote -v`.

<details>
<summary>Hint</summary>

`git log --oneline` should show all the commits from the original. `git remote -v` shows `origin` pointing at the full path of `my-fork.git`. Next, try adding `upstream` with `git remote add upstream ../club-remote.git`.

</details>

---

## 📝 Recap

- `git clone <address>` copies a repository and its **whole history** to your computer and sets up `origin`.
- A **fork** is your own copy of someone's repository on GitHub. Forking is a GitHub feature, not a Git command.
- You can only push to repositories where you have write access. For others: fork, push to your fork, open a pull request.
- Add the original project as `upstream`, then `git fetch upstream` and `git merge upstream/main` to stay up to date.
- Clone outside other repositories, and clone rather than downloading a ZIP.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which command downloads a full repository and its history?
2. What is the difference between cloning and clicking "Download ZIP"?
3. What is a fork?

<details>
<summary>Show answer</summary>

1. `git clone <address>`
2. A clone includes the `.git` folder: the full history and a remote called `origin`. A ZIP has only the current files.
3. Your own copy of someone else's repository, made inside your GitHub account with the **Fork** button.

</details>

### 🟡 Level 2: Apply
4. Why do contributors fork a project instead of pushing straight to it?
5. What is the `upstream` remote for?
6. You cloned a project. Which command proves that `origin` was set up for you?

<details>
<summary>Show answer</summary>

4. Most people do not have write access to other people's repositories, which keeps projects safe. A fork is a copy they can push to; from there they ask the owner to merge through a pull request.
5. It points to the **original** project, so you can fetch the author's new commits and keep your fork up to date.
6. `git remote -v`

</details>

### 🔴 Level 3: Challenge
Contribute to a project the safe way.

1. Choose a project to practise on: your offline `club-remote.git`, or (13+) a beginner-friendly educational project on GitHub.
2. Fork it (offline: `git clone --bare`), then clone your fork.
3. Create a feature branch, make a small helpful change (for example, fix a typo in `README.md`), and commit it.
4. Push the branch to your fork with `git push -u origin <branch>`.
5. **Think:** the original project has 10 new commits since you forked. List the commands that bring your fork up to date.
6. **Write:** a short paragraph on how open-source sharing reflects **Beneficial Knowledge (*'Ilm Nāfi'*)**.

<details>
<summary>Show one possible answer</summary>

Steps 2–4 offline:

```bash
git clone --bare club-remote.git my-fork.git
git clone my-fork.git my-club
cd my-club
git switch -c fix/readme-typo
git add README.md
git commit -m "Fix spelling of 'environment' in README"
git push -u origin fix/readme-typo
```

Step 5:

```bash
git remote add upstream ../club-remote.git
git switch main
git fetch upstream
git merge upstream/main
git push origin main
```

Step 6 example: *"Open-source developers share their code freely so others can learn and build useful tools. Every typo fixed or feature added helps people the authors will never meet. That is knowledge that benefits others, as Islam encourages."*

</details>
