# Chapter 11: Merging Branches (`git merge`)

---

## 🌟 Real-Life Story

**Two Mountain Streams Become One River**

High in the Himalayas, two streams run down different valleys. One carries glacier meltwater; the other comes from a spring. Where the valleys meet, they join into one deeper river that flows on to the Jhelum. In Git, **merging** joins the work from a feature branch back into `main`, so it becomes part of the official project.

---

## 🎯 What You Will Learn

- Merge a finished feature branch into `main` with `git merge`.
- Tell a **fast-forward merge** from a **three-way merge**.
- Follow the golden rule: stand on the branch that **receives** the work.
- Delete branches after merging and check the result with `git log --graph`.

---

## Two Kinds of Merge

### Fast-forward merge

If `main` got **no** new commits while you worked, Git just slides the `main` label forward:

```text
Before:
main:      C1 -- C2
                  \
feature:           C3 -- C4

After a fast-forward:
main:      C1 -- C2 -- C3 -- C4
```

No new commit is needed.

### Three-way merge

If `main` **also** got new commits, Git compares three snapshots:

1. The **common ancestor**: the last commit both branches share (`C2`).
2. The tip of `main` (`C5`).
3. The tip of the feature branch (`C4`).

Then it makes a new **merge commit** (`C6`) with two parents:

```text
main:      C1 -- C2 -- C5 ----- C6
                  \            /
feature:           C3 -- C4 --'
```

---

## Example 1: A Fast-Forward Merge

Zainab built a navigation bar on `feature/navbar`. Nothing new happened on `main` meanwhile.

**Step 1.** Stand on the branch that receives the work:

```bash
git switch main
```

```text
Switched to branch 'main'
```

**Step 2.** Run `git status` and make sure it says `nothing to commit, working tree clean`.

**Step 3.** Merge the feature branch in:

```bash
git merge feature/navbar
```

```text
Updating dab6b86..a307ae2
Fast-forward
 index.html | 4 ++++
 1 file changed, 4 insertions(+)
```

**Step 4.** The work is in `main`, so the old label can go:

```bash
git branch -d feature/navbar
```

```text
Deleted branch feature/navbar (was a307ae2).
```

---

## Example 2: A Three-Way Merge

This time `main` moved on too. On `feat-a` Zainab added `page.html`. On `main` she added `other.html`. Then, standing on `main`:

```bash
git merge --no-edit feat-a
```

```text
Merge made by the 'ort' strategy.
 page.html | 1 +
 1 file changed, 1 insertion(+)
 create mode 100644 page.html
```

`--no-edit` accepts Git's ready-made message. Without it, Git opens a text editor so you can check the message. **ort** is the name of Git's default merge method.

Now look at the picture of the history:

```bash
git log --graph --oneline
```

```text
*   0fb1b5b Merge branch 'feat-a'
|\  
| * a1d6b33 Add gallery page
* | 10454ff Add about page
|/  
* a307ae2 Add navigation bar
* dab6b86 Add home page
```

The two lines split and join again at the merge commit.

---

## How It Works

- **The golden rule:** stand where you want the code to **go**, then invite the branch to come to you.
  - Want the feature in `main`? `git switch main`, then `git merge feature-name`.
  - If you stand on the feature and run `git merge main`, you bring `main` into the feature instead.
- **Fast-forward** creates no extra commit. Git only moves a label.
- **`--no-ff`** ("no fast-forward") forces a merge commit even when a fast-forward was possible. Some teams like it because the graph then shows where each feature began and ended.

---

## 🌍 Real-World Connection

Many teams use **continuous integration** (CI): when work is merged into `main`, a computer automatically runs tests. Some teams also publish the website automatically after the tests pass. So a broken merge into `main` can reach real users quickly. Merging only tested, working code is part of doing your work with excellence (*Iḥsān*).

---

## 🔮 Predict the Output

Branch `nav` has two new commits. `main` has none. You run:

```bash
git switch main
git merge nav
```

Git prints `Fast-forward`.

**Question:** Does Git create a new commit called `Merge branch 'nav'`?

<details>
<summary>👀 Click to check your answer</summary>

**No.** In a fast-forward, Git only moves the `main` label forward to the same commit that `nav` points to. No new commit is made.

</details>

---

## 🕵️ Code Detective: The Ghost Branches

Ahmad merged `feature/header` into `main` last week, but `git branch` still lists it:

```text
  feature/about
  feature/footer
  feature/header
  feature/login
* main
```

- **What happened?** Merging does **not** delete a branch.
- **Good habit:** after merging, run `git branch -d feature/header`. If a branch is not merged yet, Git refuses, so you cannot lose work by accident.

---

## ⚠️ Common Mistake

**Mistake 1: Merging while standing on the wrong branch.**

Wrong (while on `feature/navbar`):

```bash
git merge main
```

What happens: `main` is merged **into your feature**. `main` itself does not get the navigation bar.

Fixed version:

```bash
git switch main
git merge feature/navbar
```

**Mistake 2: Deleting a branch before merging it.**

Wrong:

```bash
git branch -d feature/gallery
```

What happens: Git protects your work and refuses:

```text
error: the branch 'feature/gallery' is not fully merged
```

Fixed version: merge first (`git switch main`, `git merge feature/gallery`), then delete with `-d`.

---

## ✍️ Try It

In a practice repository:

1. Commit a file on `main`.
2. Create branch `feature-gallery`, add `gallery.html`, and commit.
3. Merge it into `main` and delete the branch.

<details>
<summary>Hint</summary>

After committing on `feature-gallery`, run `git switch main`, then `git merge feature-gallery`. You should see `Fast-forward`. Finish with `git branch -d feature-gallery`.

</details>

---

## 📝 Recap

- `git merge <branch>` brings that branch's work into the branch you are on.
- Always switch to the receiving branch (usually `main`) first.
- Fast-forward: Git just moves the label. Three-way: Git makes a merge commit.
- Merging does not delete the branch; use `git branch -d` afterwards.
- `git log --graph --oneline` draws the history so you can see the merge.

---

## 🏆 Practice

### 🟢 Level 1: Recall

1. Which branch should you be on before running `git merge feature-x` to add it to `main`?
2. What is a fast-forward merge?
3. Which command deletes a merged local branch?

<details>
<summary>Show answer</summary>

1. `main` (the branch that receives the work).
2. A merge where `main` had no new commits, so Git only moves the `main` label forward. No merge commit is made.
3. `git branch -d <name>`

</details>

### 🟡 Level 2: Apply

1. When does Git do a three-way merge instead of a fast-forward?
2. Why does a three-way merge need a merge commit?
3. Write the commands to merge `feature-gallery` into `main` and then delete it.

<details>
<summary>Show answer</summary>

1. When both branches have new commits since they split apart.
2. The two lines of history must be joined. The merge commit has two parents and holds the combined snapshot.
3. ```bash
   git switch main
   git merge feature-gallery
   git branch -d feature-gallery
   ```

</details>

### 🔴 Level 3: Challenge

Create a true three-way merge:

1. In a practice repository, commit one file on `main`.
2. Create branch `feat-a` and commit a new file `page.html`.
3. Switch to `main` and commit a **different** new file `other.html`.
4. Merge `feat-a` into `main` and run `git log --graph --oneline`.
5. Extra: how does Git find the "common ancestor" of the two branches?

<details>
<summary>Show one possible answer</summary>

```bash
git switch -c feat-a
git add page.html
git commit -m "Add gallery page"
git switch main
git add other.html
git commit -m "Add about page"
git merge --no-edit feat-a
git log --graph --oneline
```

Git prints `Merge made by the 'ort' strategy.` and the graph shows two lines joining at `Merge branch 'feat-a'`.

Extra: every commit remembers its parent. Git walks back along both branches until it finds the newest commit they both share. That commit is the common ancestor.

</details>
