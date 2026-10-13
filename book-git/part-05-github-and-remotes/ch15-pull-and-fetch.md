# Chapter 15: Staying in Sync: Fetching & Pulling (`fetch`, `pull`)

---

## 🌟 Real-Life Story

**The Morning Noticeboard**

Every morning, teachers pin new notices on the school noticeboard. They might move the science fair or change the exam timetable. If you walk past without reading it, you may prepare for the wrong day. In a team project, teammates push new commits to the remote all the time. **`git pull`** is reading the noticeboard and copying the updates into your own project before you start work.

---

## 🎯 What You Will Learn

- Download teammates' commits and update your files with `git pull`.
- Explain the difference between `git fetch` and `git pull`.
- Describe what a **remote-tracking branch** such as `origin/main` is.
- Fix a **rejected push** by pulling first.
- Use `git stash` to pull safely when you have unfinished changes.

---

> **Reminder:** GitHub accounts are for ages **13+**. If you are younger, practise this chapter with the offline "pretend GitHub" folder from Chapter 14, or in a teacher-managed classroom setup.

---

## `git fetch` vs. `git pull`: Peek or Download Everything

```text
git fetch  = download new commits
             into origin/main only
             (your files do not change)

git merge origin/main
           = add those commits to
             your own branch

git pull   = git fetch + git merge
```

A **remote-tracking branch** like `origin/main` is Git's memory of where `main` was on the remote. It only moves when you talk to the remote (`fetch`, `pull` or `push`).

---

## Watching a Fetch, Step by Step

Your teammate Amina pushed a new page, `about.html`, to the remote. You have not talked to the remote yet:

```bash
git status
```

```text
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

"Up to date" here only means "up to date with what Git last saw". Git does not check the internet by itself. Now fetch:

```bash
git fetch
```

```text
From ../club-remote
   b27eae1..b8fae50  main       -> origin/main
```

```bash
git status
```

```text
On branch main
Your branch is behind 'origin/main' by 1 commit, and can be fast-forwarded.
  (use "git pull" to update your local branch)

nothing to commit, working tree clean
```

Your files have **not** changed yet; `about.html` is not in the folder. You can look at the new commit first:

```bash
git log --oneline main..origin/main
```

```text
b8fae50 Add about page
```

`main..origin/main` means "commits on `origin/main` that are not on my `main`".

---

## Pulling the Updates

```bash
git pull
```

```text
Updating b27eae1..b8fae50
Fast-forward
 about.html | 2 ++
 1 file changed, 2 insertions(+)
 create mode 100644 about.html
```

```bash
git status
```

```text
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

`about.html` is now in your folder. **Fast-forward** (Chapter 11) means you had no new commits of your own, so Git just moved your `main` forward.

### A good start-of-day routine

```bash
git switch main
git pull
git switch -c feature/new-page
```

Pull on `main` first, then start your new branch from the fresh `main`.

---

## 🌍 Real-World Connection: "Pull Before You Push"

Many teams teach new members one habit first:

> **"Pull before you start work, and pull before you push."**

It takes seconds. It means you build on your teammates' latest work, and it makes merge conflicts smaller and rarer.

---

## 🔮 Predict the Output

A teammate added a new image, `logo.svg`, and pushed it. You run `git fetch` (not `pull`).

**Question**: Does `logo.svg` appear in your project folder now?

<details>
<summary>👀 Click to check your answer</summary>

**Answer:** No, not yet. `git fetch` only updates `origin/main`; your files stay the same. `git status` will say your branch is *behind*. Run `git pull` (or `git merge origin/main`) and then `logo.svg` appears.

</details>

---

## 🕵️ Code Detective: The Rejected Push

Zainab committed a change to `style.css` and ran `git push`. Git refused:

```text
To ../club-remote.git
 ! [rejected]        main -> main (fetch first)
error: failed to push some refs to '../club-remote.git'
hint: Updates were rejected because the remote contains work that you do not
hint: have locally. This is usually caused by another repository pushing to
hint: the same ref. If you want to integrate the remote changes, use
hint: 'git pull' before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

- **What happened?** Amina pushed a commit while Zainab was working. Git will not let a push wipe out her work.
- **The fix:** pull first, then push.

```bash
git pull
```

```text
From ../club-remote
   b8fae50..4828937  main       -> origin/main
Merge made by the 'ort' strategy.
 README.md | 1 +
 1 file changed, 1 insertion(+)
```

Both people changed different files, so Git merged them by itself. (Git may open your editor to confirm the merge message; save and close it.) Now `git push` works. If you both changed the same lines, you would get a merge conflict to fix, exactly as in Chapter 12.

---

## ⚠️ Common Mistake

**Mistake 1: Pulling with unsaved changes in the same file.**

- ❌ **Wrong:** you are halfway through editing `index.html`, a teammate has also pushed a change to `index.html`, and you run `git pull`.
- **What happens:** Git stops to protect your work:

```text
error: Your local changes to the following files would be overwritten by merge:
	index.html
Please commit your changes or stash them before you merge.
Aborting
```

- ✅ **Fixed:** put your changes away, pull, then bring them back (`git stash`, Chapter 9):

```bash
git stash
git pull
git stash pop
```

```text
Saved working directory and index state WIP on main: bfccb09 Add more lines
Updating bfccb09..1d4ccc5
Fast-forward
 index.html | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
Auto-merging index.html
```

After `git stash pop`, `git status` shows `index.html` as modified again, now with your teammate's change included too.

**Mistake 2: Pulling while on the wrong branch.**

- ❌ **Wrong:** standing on `feature/profile` and running `git pull origin main`.
- **What happens:** Git merges the remote `main` into `feature/profile`, which may not be what you wanted.
- ✅ **Fixed:** check the first line of `git status` before you pull. To update `main`, run `git switch main` first.

---

## ✍️ Try It

Act as two teammates on one computer.

1. Use the `club-remote.git` and project from Chapter 14.
2. Make a second copy for "Amina": in the `practice` folder run `git clone club-remote.git amina-copy`. (`git clone` copies a remote into a new folder; Chapter 16 explains it fully.)
3. In `amina-copy`, add `about.html`, commit, and `git push`.
4. In your own project, run `git fetch`, then `git status`, then `git pull`.

<details>
<summary>Hint</summary>

After `git fetch`, `git status` should say `behind 'origin/main' by 1 commit`. After `git pull`, `about.html` appears and the status says `up to date`.

</details>

---

## 📝 Recap

- `origin/main` is Git's memory of the remote's `main`. It moves only when you fetch, pull or push.
- `git fetch` downloads new commits but does not change your files.
- `git pull` = `git fetch` + `git merge`: it downloads and updates your branch.
- If the remote has commits you lack, `git push` is **rejected**. Pull first, then push.
- Uncommitted changes in the same file block a pull. Use `git stash`, `git pull`, `git stash pop`.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which command downloads and merges updates from a remote?
2. Which two commands does `git pull` combine?
3. What does Git do if you push while your branch is behind the remote?

<details>
<summary>Show answer</summary>

1. `git pull`
2. `git fetch` and `git merge`
3. It **rejects** the push (`! [rejected] ... (fetch first)`) and tells you to pull first.

</details>

### 🟡 Level 2: Apply
4. Why is `git fetch` safer than `git pull` when you just want to look at a teammate's changes?
5. Why is pulling at the start of a work session good team manners?
6. You run `git fetch` and `git status` says `behind 'origin/main' by 3 commits`. Which command lists those 3 commits?

<details>
<summary>Show answer</summary>

4. `git fetch` never changes your files or branch. You can inspect the new commits with `git log` first, and merge only when you are ready.
5. You start from everyone's latest work, so you do not redo or undo a teammate's changes, and conflicts stay small.
6. `git log --oneline main..origin/main`

</details>

### 🔴 Level 3: Challenge
Handle a busy team day.

1. Using two copies of a project (your project and `amina-copy`), make Amina push a change to `README.md`.
2. Without pulling, commit a change to `style.css` in your copy and try `git push`. Read the error.
3. Fix it so both changes end up on the remote.
4. **Think:** if `git pull` ever leaves you in a merge conflict you are not ready for, which command cancels it? (Chapter 12)
5. **Write:** a four-step "before you code" checklist for your school coding club.

<details>
<summary>Show one possible answer</summary>

2. The push is rejected with `! [rejected]        main -> main (fetch first)`.

3. ```bash
   git pull
   git push
   ```
   `git pull` makes a merge commit joining both changes; `git push` then succeeds.

4. `git merge --abort` puts things back as they were before the merge.

5. Example checklist:
   1. `git switch main`
   2. `git pull`
   3. `git switch -c feature/<what-you-will-do>`
   4. `git status` to check you are on the new branch with a clean folder.

</details>
