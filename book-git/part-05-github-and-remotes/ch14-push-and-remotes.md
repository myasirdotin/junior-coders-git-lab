# Chapter 14: Connecting to Remotes & Pushing Code (`remote`, `push`)

---

## 🌟 Real-Life Story

**Sending Weather Data to the Science Centre**

Your class builds a small weather station in the school garden. It records temperature all day and stores the readings inside. First, you set it up with the science centre's address. Then, at the end of the day, you press **Send** and the readings travel there. Now the whole community can see them. In Git, `git remote add` saves the address, and `git push` sends your commits.

---

## 🎯 What You Will Learn

- Connect a local repository to a remote with `git remote add`.
- Check which remotes are set up with `git remote -v`.
- Send commits to a remote with `git push -u origin main`, and later just `git push`.
- Explain what `origin` and **upstream tracking** (`-u`) mean.
- Practise the whole thing offline with a "pretend GitHub" folder.

---

> **Reminder:** GitHub accounts are for ages **13+**. Younger students can do every step in this chapter with the offline "pretend GitHub" folder below, or in a classroom setup run by a teacher.

---

## The Remote Connection Workflow

![Git Remote Push & Pull](../assets/diagrams/git/git-remote-workflow.svg)

```text
[ Your laptop ]           [ Remote ]
 branch: main             branch: main
     │                         ▲
     ├─ git remote add origin ─┤ address saved
     │                         │
     └─ git push -u origin ────┘ commits sent
        main
```

---

## Practise Offline: A "Pretend GitHub" Folder

A **bare repository** is a repository with no working files, only the history. It is exactly what GitHub keeps on its servers. You can make one in a folder next to your project and use it as your remote. Everyone can do this, with no account and no internet.

```text
📁 practice/
   ├── club-remote.git   (pretend GitHub)
   └── eco-club/         (your project)
```

```bash
cd practice
git init --bare club-remote.git
```

```text
Initialized empty Git repository in C:/Users/zainab/practice/club-remote.git/
```

Your project `eco-club` already has two commits on `main`. Go into it and check its status:

```bash
cd eco-club
git status
```

```text
On branch main
nothing to commit, working tree clean
```

Notice there is no line about `origin` yet: the project does not know any remote.

---

## Linking and Pushing Your Project

### Step 1: Save the remote's address

```bash
git remote add origin ../club-remote.git
git remote -v
```

```text
origin	../club-remote.git (fetch)
origin	../club-remote.git (push)
```

### Step 2: Push your commits

```bash
git push -u origin main
```

```text
To ../club-remote.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
```

### Step 3: Check status again

```bash
git status
```

```text
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

Now `git status` compares your branch with the remote copy too.

### Pushing the next commit

Make another commit, then look at the status:

```text
On branch main
Your branch is ahead of 'origin/main' by 1 commit.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean
```

"Ahead by 1 commit" means the remote does not have your newest commit yet. Because of `-u`, a plain `git push` is enough now:

```bash
git push
```

```text
To ../club-remote.git
   65ca60a..b27eae1  main -> main
```

The two short codes are the old and new commit hashes on the remote. Yours will be different.

---

## The Same Steps with GitHub (13+)

1. Open [github.com/new](https://github.com/new) and name the repository `eco-club`.
2. Leave *"Add a README"*, *".gitignore"* and *"license"* **unticked**. Your local project already has its files.
3. Click **Create repository** and copy its address.
4. Run the same commands, using GitHub's address instead of the folder:

```bash
git remote add origin git@github.com:zainab-codes/eco-club.git
git push -u origin main
```

Over the internet, Git also prints progress lines like these (your numbers will differ):

```text
Enumerating objects: 10, done.
Counting objects: 100% (10/10), done.
Delta compression using up to 8 threads
Compressing objects: 100% (6/6), done.
Writing objects: 100% (10/10), 802 bytes | 267.00 KiB/s, done.
Total 10 (delta 2), reused 0 (delta 0), pack-reused 0 (from 0)
To github.com:zainab-codes/eco-club.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
```

Refresh the GitHub page: your files and full history are online. 🚀

---

## Breaking It Down

- **`origin`** is a nickname for the remote's address. You could pick another name, but almost everyone uses `origin`.
- **`git remote -v`**: `-v` means **verbose** (show more detail). It prints the address used to fetch (download) and to push (upload).
- **`-u`** (long form `--set-upstream`) links your local `main` to `origin/main`. This link is called **upstream tracking**.
  - You need `-u` only on the first push of a branch.
  - After that, `git push` alone knows where to go.
- **`origin/main`** is Git's note of where `main` was on the remote the last time you talked to it.

### Pushing a feature branch

Branches can be pushed too, so a teammate can see them:

```bash
git switch -c feature/footer
git push -u origin feature/footer
```

```text
Switched to a new branch 'feature/footer'
To ../club-remote.git
 * [new branch]      feature/footer -> feature/footer
branch 'feature/footer' set up to track 'origin/feature/footer'.
```

---

## 🌍 Real-World Connection: Distributed Backups

Git is a **distributed** version control system: every copy holds the full history.

- Your laptop has the complete history.
- The remote has the complete history.
- If your laptop breaks, you lose nothing that you pushed. On a new computer, you download the project and its whole history again (Chapter 16).

---

## 🔮 Predict the Output

You pushed once with `git push -u origin main`. Then you make a new commit and type only:

```bash
git push
```

**Question**: Does Git know where to send it, or does it complain?

<details>
<summary>👀 Click to check your answer</summary>

**Answer:** It pushes without complaint. The `-u` flag linked your local `main` to `origin/main`, so Git remembers where it goes.

</details>

---

## 🕵️ Code Detective: The "Remote Origin Already Exists" Error

A student ran `git remote add origin ...` a second time. Git replied:

```text
error: remote origin already exists.
```

- **Why?** The project already had a remote called `origin`.
- **Check it:** run `git remote -v` to see the saved address.
- **Change it:** run `git remote set-url origin <new-address>`.

---

## ⚠️ Common Mistake

**Mistake 1: Creating the GitHub repository with a README, then pushing an existing project.**

- ❌ **Wrong:** ticking *"Add a README"* on GitHub, then running `git push -u origin main` from your project.
- **What happens:** the remote already has a commit your laptop does not have, so Git rejects the push:

```text
 ! [rejected]        main -> main (fetch first)
error: failed to push some refs to 'github.com:zainab-codes/eco-club.git'
```

- ✅ **Fixed:** when you push a project that already exists, create the GitHub repository **empty**. (If it is too late, Chapter 15 shows how to pull first.)

**Mistake 2: A typo in the remote address.**

- ❌ **Wrong:** `git remote add origin ../club-remot.git` (missing "e").
- **What happens:** `git push` fails because nothing exists at that address:

```text
fatal: '../club-remot.git' does not appear to be a git repository
fatal: Could not read from remote repository.
```

- ✅ **Fixed:** you do not need to start again. Correct the address:

```bash
git remote set-url origin ../club-remote.git
```

---

## ✍️ Try It

Make your own offline remote and push to it.

1. In a `practice` folder, run `git init --bare club-remote.git`.
2. Make a project folder next to it, run `git init`, add a `README.md` and commit it.
3. Link it with `git remote add origin ../club-remote.git` and run `git push -u origin main`.
4. Run `git status` and look for `up to date with 'origin/main'`.

<details>
<summary>Hint</summary>

The `../` means "go up one folder". Your project and `club-remote.git` must sit side by side in `practice`. If `git push` says `src refspec main does not match any`, you have not made a commit yet.

</details>

---

## 📝 Recap

- A **remote** is another copy of your repository; `origin` is its usual nickname.
- `git remote add origin <address>` saves the address; `git remote -v` shows it.
- `git push -u origin main` sends your commits and sets up tracking. After that, `git push` is enough.
- `git status` tells you if you are **ahead** of the remote (commits not pushed yet).
- A **bare repository** in another folder is a free, offline "pretend GitHub" for practice.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which command links a local repository to a remote address?
2. What is the usual nickname for the main remote?
3. What does `-u` set up in `git push -u origin main`?

<details>
<summary>Show answer</summary>

1. `git remote add origin <address>`
2. `origin`
3. **Upstream tracking**: it links your local `main` to `origin/main`, so later a plain `git push` (and `git pull`) knows where to go.

</details>

### 🟡 Level 2: Apply
4. Why is a remote copy safer than keeping code only on one flash drive?
5. What does `git remote -v` show?
6. `git status` says `Your branch is ahead of 'origin/main' by 2 commits.` What does it mean, and what should you run?

<details>
<summary>Show answer</summary>

4. A flash drive can be lost or broken, and then the work is gone. With a remote, the full history exists in two places, so one broken copy loses nothing that was pushed.
5. Each remote's nickname and the address it fetches from and pushes to.
6. You have 2 commits that the remote does not have yet. Run `git push` to send them.

</details>

### 🔴 Level 3: Challenge
Set up a club repository with a remote and share a feature branch.

1. Create a bare "pretend GitHub" `club-remote.git` (or, if you are 13+, an empty GitHub repository).
2. Link your practice project to it and push `main` with `-u`.
3. Create a branch `feature/footer`, commit a footer, and push the branch so a teammate could review it.
4. Run `git branch -a` and find your branch on the remote.
5. **Extra:** write a short `README.md` that introduces your project (no personal details like your address or phone number), commit and push it.

<details>
<summary>Show one possible answer</summary>

```bash
git init --bare ../club-remote.git
git remote add origin ../club-remote.git
git push -u origin main
git switch -c feature/footer
git add index.html
git commit -m "Add footer with club name"
git push -u origin feature/footer
git branch -a
```

`git branch -a` lists local branches and remote ones, which start with `remotes/origin/`:

```text
* feature/footer
  main
  remotes/origin/feature/footer
  remotes/origin/main
```

</details>
