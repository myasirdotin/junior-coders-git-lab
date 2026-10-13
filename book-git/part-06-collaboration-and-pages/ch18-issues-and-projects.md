# Chapter 18: Issues, Milestones & GitHub Project Boards 📋

---

## 🌟 Real-Life Story

**The science exhibition task board.**
Four students are preparing a science exhibition stand. If they only rely on memory, someone forgets the poster boards and two people write the same summary.
So their teacher divides a whiteboard into three columns: **To Do**, **In Progress** and **Done**.
Each task goes on a sticky note with one name on it, like "Zainab: design the poster" or "Yasir: build the battery circuit".
Everyone can see who is doing what, and nothing is forgotten. GitHub gives software teams the same board through **Issues** and **Projects**.

> **Age check:** GitHub accounts are only for people aged 13 or older. If you are younger, plan tasks on paper or a class whiteboard, or use a classroom account your teacher manages. Never sign up on your own.

---

## 🎯 What You Will Learn

- Create bug reports and feature requests as **GitHub Issues**.
- Sort issues with **labels**, **assignees** and **milestones**.
- Close an issue automatically with a keyword such as `fixes #12`.
- Plan work on a three-column **GitHub Project** board.
- Write a clear, helpful bug report.

---

## 📌 What Is an Issue?

An **Issue** is a page on GitHub for one task, bug or idea. Each issue gets a number, like `#12`.
You find them in the **Issues** tab of a repository. Anyone working on the project can comment on an issue.

You can give each issue extra details:

| Detail | What it means | Example |
|--------|---------------|---------|
| Label | A coloured tag for the kind of task | `bug`, `enhancement`, `documentation` |
| Assignee | The person doing the task | Zainab |
| Milestone | A group of issues with a target date | "Exhibition Day" |

GitHub gives every new repository some ready-made labels. They include `bug`, `documentation`, `enhancement`, `good first issue` and `help wanted`.

A **milestone** is like a finish line. Put every issue needed for "Exhibition Day" in that milestone. GitHub then shows a progress bar of how many are closed.

---

## 🗂️ The Project Board

A **GitHub Project** is a board for your issues. The column style is called a **Kanban** board (*kanban* is a Japanese word for "signboard"). Each card moves from left to right as the work moves forward.

```text
📋 TO DO
  #14 Add a "Back to top" button
      Yasir · enhancement
⚡ IN PROGRESS
  #12 Fix the mobile header
      Zainab · bug
✅ DONE
  #10 Write the first README
      Aisha · documentation
```

On a phone the board is shown here as a list. On GitHub the three columns sit side by side.

---

## 💻 Closing Issues from a Commit

Mention an issue number in a commit message and GitHub links the two together.
Use a **closing keyword**, and GitHub also closes the issue:

```bash
git commit -am "fix: Stop mobile menu overflowing the screen (fixes #12)"
```

Output:

```text
[main 21056c5] fix: Stop mobile menu overflowing the screen (fixes #12)
 1 file changed, 1 insertion(+)
```

Your commit hash will be different. Git itself does nothing special with `#12`. The magic happens on GitHub.

**What happens on GitHub?**
1. The commit appears inside Issue #12 as a link.
2. When the commit reaches the **default branch** (usually `main`), GitHub closes Issue #12. This happens when you push it there, or when its Pull Request is merged.
3. If the issue is on a Project board, the board's built-in workflow usually moves the card to **Done**.

### Closing keywords GitHub understands

- `close`, `closes`, `closed`
- `fix`, `fixes`, `fixed`
- `resolve`, `resolves`, `resolved`

You can also write them in a Pull Request description, for example `Closes #12`.

---

## 🐛 Writing a Helpful Bug Report

Do not just write "The site is broken." Nobody can fix that. Give the steps, so others can see the bug for themselves:

```markdown
### Bug description
On phone screens under 480px wide, the "Submit Registration"
message opens behind the top menu.

### Steps to see the bug
1. Open index.html in a phone-sized browser window.
2. Scroll to the bottom and tap "Submit".
3. The green message is hidden behind the menu.

### Where it happens
- Phone, Chrome browser

### What should happen
The message should appear in the middle of the screen,
above the menu.
```

---

## 🌍 Real-World Connection

Many software teams plan their work on a task board like this.
Some teams hold a short daily meeting called a **stand-up**. Each person answers three questions:
1. What did I finish yesterday?
2. What will I work on today?
3. Is anything blocking me?

Clear order and fair sharing of work reduce stress. They also show *Iḥsān*: doing every task with care.

---

## 🔮 Predict the Output

A developer writes:
`git commit -m "style: Update logo border (see #7)"`
They wrote `see #7`, **not** `closes #7`. Then they push to `main`.

**Question:** Will GitHub close Issue #7?

<details>
<summary>👀 Click to check your answer</summary>

**Answer:** No. GitHub links the commit inside Issue #7, so people can find it. But `see` is not a closing keyword, so the issue stays open. Only words like `closes #7` or `fixes #7` close it.

</details>

---

## 🕵️ Code Detective

**The abandoned feature.** A team built a neighbourhood clinic booking site. After three weeks, nobody knew what was finished, what was broken or what to do next.

- **The cause:** they wrote code, but never wrote issues or made a board.
- **The cure:** they spent 30 minutes writing 10 small issues. They added labels (`frontend`, `database`, `security`), gave each one an assignee and put them on a board. Now everyone knew the plan.

---

## ⚠️ Common Mistake

**1. Starting work without assigning yourself.**

Wrong: you see issue #14 and start coding at once. A classmate does the same.

What happens: two people build the same feature, and one person's work is wasted.

Fixed: assign the issue to yourself first (and move its card to **In Progress**). Then create your branch.

**2. A keyword with the wrong number.**

Wrong: `git commit -m "fix: Correct footer email (fixes #21)"`, when the footer issue is really `#12`.

What happens: when this reaches `main`, GitHub closes issue #21, a different task that is not done.

Fixed: check the issue number in the Issues tab before you commit. If a wrong issue closes, open it again with **Reopen issue**.

---

## ✍️ Try It

On paper (or in a text file), write a bug report for this problem: *"On the school library site, the 'Search' button does nothing when you press Enter."* Use the four parts from the bug report example.

<details>
<summary>Hint</summary>

The steps should let a stranger see the bug in under a minute: which page to open, what to type, which key to press. Then say what happens and what *should* happen.

</details>

---

## 📝 Recap

- An **Issue** is a numbered page for one task, bug or idea.
- **Labels** say what kind of task it is, **assignees** say who does it, **milestones** group tasks under a target date.
- A **Project** board moves cards from To Do to In Progress to Done.
- `fixes #12` (or `closes`, `resolves`) closes Issue #12 when the commit reaches the default branch.
- A good bug report gives clear steps, where it happens and what should happen.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. What is a GitHub Issue?
2. Name three labels GitHub creates for a new repository.
3. What would you write in a commit message to close Issue #5 when it is merged?

<details>
<summary>Show answer</summary>

1. A numbered page on GitHub for one task, bug or idea, where the team can discuss it.
2. Any three of: `bug`, `documentation`, `duplicate`, `enhancement`, `good first issue`, `help wanted`, `invalid`, `question`, `wontfix`.
3. A closing keyword with the number, for example `fixes #5`, `closes #5` or `resolves #5`.

</details>

### 🟡 Level 2: Apply
4. How does a three-column board stop two students doing the same work?
5. Why do clear "steps to see the bug" matter in a bug report?
6. In your practice repository, create two issues: an `enhancement` called "Add footer with contact email" and a `documentation` issue called "Add team members to README".

<details>
<summary>Show answer</summary>

4. Every task has one card with one name on it. Before starting, you can see whether someone else is already doing it.
5. The person fixing the bug must first see it happen. Clear steps let them repeat it quickly, instead of guessing.
6. Open the **Issues** tab, click **New issue**, type the title and a short description, then pick the label on the right side under **Labels**. Repeat for the second issue.

</details>

### 🔴 Level 3: Challenge
Close an issue from your own commit, then plan a project.

1. In your practice repository, note the number of the "Add footer with contact email" issue (say `#1`).
2. Create a branch with `git switch -c feature/footer`.
3. Add the footer, stage it, and commit with a message that closes the issue.
4. Push the branch, open a Pull Request and merge it into `main`.
5. Open the Issues tab and check that the issue is now closed.
6. Extra: make a GitHub Project board for a community website, such as a "Clean Water Awareness" site for a local lake. Add six cards covering research, design, HTML, CSS, testing and publishing.

<details>
<summary>Show one possible answer</summary>

```bash
git switch -c feature/footer
git add index.html
git commit -m "feat: Add footer with contact email (closes #1)"
git push -u origin feature/footer
```

Then on GitHub: **Compare & pull request**, **Create pull request**, **Merge pull request**. When the merge lands on `main`, issue #1 shows **Closed** with a link to your commit.

Step 6, sample cards:
1. Research: collect three facts about keeping the lake clean.
2. Design: sketch the home page on paper.
3. HTML: build the home page structure.
4. CSS: style the page for phones first.
5. Testing: check every link and the page at phone width.
6. Publishing: put the site live with GitHub Pages (Chapter 19).

</details>
