# Project 2: Team Collaboration & Feature Branch Simulation 👥

---

## 🌟 Project Overview

In this project you act out how a real two-person team works on one shared GitHub repository.
Work with a lab partner, or play both roles yourself in two different folders.

> **Age check:** GitHub accounts are only for people aged 13 or older. If you are younger, use a classroom account your teacher manages, or practise with a "remote" folder on your own computer (see the tip below). Never sign up on your own.

You will practise:
1. Adding a teammate as a **collaborator** (a person allowed to push to the repository).
2. Working only on feature branches, never straight on `main`.
3. Opening and reviewing a **Pull Request** with kind, helpful comments (*Adab*).
4. Bringing the team's latest work to your computer with `git pull`.
5. (Optional) Making and solving a **merge conflict** on purpose.

> **Tip: practise without GitHub.** `git init --bare shared.git` makes a "bare" repository: a folder that stores only Git history, with no working files. It acts like a GitHub repository on your own computer. Use its folder path wherever this guide says `git@github.com:...`. You cannot open a Pull Request there, so merge the branch yourself with `git merge`.

---

## 🎯 Scenario and Roles

- **Project:** *Srinagar Heritage Portal*, a small website about the city's historic places.
- **Maryam (Developer A, team lead):** creates the repository, builds the home page and reviews Pull Requests.
- **Bilal (Developer B):** clones the project, builds a "Heritage Landmarks" section on a branch and asks for a review.

---

## 💻 Step-by-Step Lab

### Phase 1: Maryam sets up the project

```bash
mkdir heritage-portal
cd heritage-portal
git init
echo "<h1>Heritage Portal</h1>" > index.html
git add .
git commit -m "feat: Add homepage heading"
git remote add origin git@github.com:maryam-codes/heritage-portal.git
git push -u origin main
```

Output:

```text
Initialized empty Git repository in C:/Users/maryam/heritage-portal/.git/
[main (root-commit) 1e345c7] feat: Add homepage heading
 1 file changed, 1 insertion(+)
 create mode 100644 index.html
To github.com:maryam-codes/heritage-portal.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
```

Your hashes and paths will be different.

**Maryam invites Bilal:** on GitHub open **Settings → Collaborators → Add people** and type Bilal's GitHub username. Bilal accepts the invitation from his email or GitHub notifications.

---

### Phase 2: Bilal clones and makes a branch

```bash
git clone git@github.com:maryam-codes/heritage-portal.git
cd heritage-portal
git switch -c feature/landmarks-guide
```

Output (GitHub also prints a few download progress lines):

```text
Cloning into 'heritage-portal'...
Switched to a new branch 'feature/landmarks-guide'
```

Bilal never codes straight on `main`. He adds this section to the end of `index.html` in his editor:

```html
<section id="landmarks">
  <h2>Heritage Landmarks</h2>
  <ul>
    <li>Shalimar Bagh (Mughal garden)</li>
    <li>Hari Parbat Fort</li>
    <li>Jamia Masjid</li>
  </ul>
</section>
```

Then he commits and pushes his branch:

```bash
git commit -am "feat: Add heritage landmarks section"
git push -u origin feature/landmarks-guide
```

Output:

```text
[feature/landmarks-guide 9b53b1a] feat: Add heritage landmarks section
 1 file changed, 8 insertions(+)
To github.com:maryam-codes/heritage-portal.git
 * [new branch]      feature/landmarks-guide -> feature/landmarks-guide
branch 'feature/landmarks-guide' set up to track 'origin/feature/landmarks-guide'.
```

`-am` works here because `index.html` is already tracked.

---

### Phase 3: Bilal opens a Pull Request

On GitHub:
1. Bilal clicks **Compare & pull request**.
2. Title: `feat: Add heritage landmarks section`.
3. Description:
   > *"As-salamu alaykum! This PR adds a list of heritage landmarks for visitors. I checked it on a laptop and a phone. Ready for review."*
4. He picks Maryam as **Reviewer** and clicks **Create pull request**.

---

### Phase 4: Maryam reviews and asks for one change

1. Maryam opens the **Files changed** tab and reads every line.
2. She comments:
   > *"MashaAllah, a lovely list! Could we also add Pari Mahal?"*
3. Bilal adds `<li>Pari Mahal</li>` on his computer, then runs `git commit -am "feat: Add Pari Mahal to landmarks"` and `git push`.
4. The PR updates by itself with the new commit.
5. Maryam clicks **Review changes → Approve**, then **Merge pull request**.

---

### Phase 5: Both developers update their computers

The merge happened on GitHub, so both computers are now behind. Each developer runs:

```bash
git switch main
git pull
git branch -d feature/landmarks-guide
```

Bilal's output:

```text
Switched to branch 'main'
Your branch is up to date with 'origin/main'.
Updating 1e345c7..2ef6af8
Fast-forward
 index.html | 9 +++++++++
 1 file changed, 9 insertions(+)
Deleted branch feature/landmarks-guide (was d70af73).
```

Notice the second line: Git says "up to date" **before** the pull. It only knows what it fetched last time. That is why you always `git pull` before starting new work (Chapter 15).
Maryam never had the feature branch, so she skips `git branch -d`. (The real output also has a line starting `From github.com:...` that shows what was downloaded.)

---

### Phase 6 (optional): Make and solve a merge conflict

1. **Maryam** changes the heading on `main` to `<h1>Heritage Portal of Srinagar</h1>`, commits and pushes.
2. **Bilal** makes a branch and changes the **same line** to `<h1>Welcome to the Heritage Portal</h1>`:

```bash
git switch -c feature/welcome-heading
git commit -am "feat: Add friendly welcome heading"
```

3. Bilal brings Maryam's latest `main` into his branch:

```bash
git fetch origin
git merge origin/main
```

Output:

```text
Auto-merging index.html
CONFLICT (content): Merge conflict in index.html
Automatic merge failed; fix conflicts and then commit the result.
```

4. The top of `index.html` now shows both versions:

```text
<<<<<<< HEAD
<h1>Welcome to the Heritage Portal</h1>
=======
<h1>Heritage Portal of Srinagar</h1>
>>>>>>> origin/main
```

5. Bilal talks to Maryam, and they agree to keep both ideas. He replaces all five lines with one:

```html
<h1>Welcome to the Heritage Portal of Srinagar</h1>
```

6. He finishes the merge and pushes:

```bash
git add index.html
git commit -m "merge: Combine both heading ideas"
git push -u origin feature/welcome-heading
```

7. He opens a Pull Request, and Maryam reviews and merges it as in Phases 3 and 4.

---

## 🧪 Project Checklist

- [ ] Nobody pushed straight to `main` while building a feature: every change came through a Pull Request.
- [ ] Bilal's branch was pushed and reviewed in a Pull Request.
- [ ] Every review comment was polite, clear and encouraging (*Adab*).
- [ ] After both developers ran `git pull`, `git log --oneline` on `main` shows the same commits on both computers.
- [ ] `git branch` no longer lists the merged feature branch.
- [ ] (Optional) The conflict was solved, and no `<<<<<<<`, `=======` or `>>>>>>>` lines are left in any file.

---

## 📝 Recap

- A team shares one repository; each person works on their own **feature branch**.
- Changes reach `main` through a **Pull Request** that a teammate reviews kindly.
- Pushing more commits to the same branch updates the open PR.
- After a merge on GitHub, everyone runs `git switch main` and `git pull`, then deletes the old branch with `git branch -d`.
- A conflict happens when two people change the same line. Talk, choose the right lines, remove the markers, then `git add` and `git commit`.
