# Chapter 18: Issues, Milestones & GitHub Project Boards 📋🎯

---

## 1. 🌟 Real-Life Situation: The School Science Exhibition Kanban Board

Imagine preparing a school exhibition booth with three teammates:
- If you rely only on verbal memory:
  - Someone forgets to buy poster boards!
  - Two people accidentally write the exact same chemistry summary!
  - Nobody knows who is supposed to bring the microscope on Thursday!
- To prevent this confusion, your teacher sets up a physical whiteboard divided into three columns:
  - **To Do (Backlog)**
  - **In Progress (Doing right now)**
  - **Done (Finished & Checked!)**
- Each task is written on a colorful sticky note with a student's name on it:
  - `[Zainab: Design Poster Headline]`
  - `[Yasir: Build Working Battery Circuit]`

In software engineering, GitHub provides this exact productivity powerhouse through **GitHub Issues** and **GitHub Projects**!

---

## 2. 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- Create and organize bug reports and feature requests using **GitHub Issues**.
- Categorize tasks with descriptive **Labels** (`bug`, `enhancement`, `documentation`).
- Assign issues to specific team members.
- Organize tasks into **Milestones** with realistic deadlines.
- Automatically close issues using smart commit keywords (`fixes #12`, `closes #4`).
- Set up an interactive **Kanban Board** using GitHub Projects.

---

## 3. 👁️ Visual Concept Explanation

### The GitHub Kanban Board Architecture

```text
┌─────────────────────────┐  ┌─────────────────────────┐  ┌─────────────────────────┐
│       📋 TO DO          │  │     ⚡ IN PROGRESS       │  │        ✅ DONE          │
├─────────────────────────┤  ├─────────────────────────┤  ├─────────────────────────┤
│ [Issue #14]             │  │ [Issue #12]             │  │ [Issue #10]             │
│ Add dark mode toggle    │  │ Fix mobile header       │  │ Create initial README   │
│ Assignee: Yasir         │  │ Assignee: Zainab        │  │ Assignee: Alex          │
│ Label: [enhancement]    │  │ Label: [bug] [priority] │  │ Label: [documentation]  │
└─────────────────────────┘  └─────────────────────────┘  └─────────────────────────┘
```

---

## 4. 💻 Code Example: Linking Commits to Issues Automatically

When you create an Issue on GitHub, it receives a unique tracking number (e.g. `#12`).
Git and GitHub have a magical automation superpower:

```bash
# When committing code that solves Issue #12, mention it in your commit message:
git commit -m "fix: Resolve mobile navigation overflow (fixes #12)"

# Push your commit to GitHub:
git push origin main
```

**What happens on GitHub?**
1. GitHub automatically links your commit inside the Issue thread.
2. The moment your commit merges into `main`, GitHub automatically moves Issue #12 into the **Done** column and marks it **CLOSED**! 🎉

### Magic Closing Keywords Recognized by GitHub:
- `fixes #12` / `fixed #12`
- `closes #12` / `closed #12`
- `resolves #12` / `resolved #12`

---

## 5. 🔍 Code Explanation: Writing a Professional Bug Report

When you discover a bug, don't just write: *"The site is broken."*
Write a structured, helpful bug report:

```markdown
### 🐛 Bug Description
When clicking the "Submit Registration" button on mobile screens under 480px, the confirmation modal opens behind the navigation bar.

### 👣 Steps to Reproduce
1. Open `index.html` on a smartphone or Chrome DevTools mobile mode.
2. Scroll to the bottom and tap "Submit".
3. Notice that the green modal is obscured by the header.

### 📱 Environment
- Device: iPhone 13 / Chrome 124
- Operating System: iOS 17

### 🎯 Expected Behavior
The modal should appear with a high `z-index` in the center of the viewport above all headers.
```

---

## 6. 🌍 Real-World Connection: Agile Software Development

- Top software organizations (like Spotify, Airbnb, and Uber) organize their engineering sprints around task boards like this.
- Teams hold daily 10-minute "Standup" meetings where every developer points to the board and answers 3 questions:
  1. *What did I complete yesterday?*
  2. *What will I work on today?*
  3. *Are there any blockers preventing me from finishing my task?*
- Clear organization eliminates stress, fosters team harmony, and exemplifies the Islamic principle of **Quality and Order (*Niẓām & Iḥsān*)**.

---

## 7. ⚠️ Common Beginner Traps

1. **Working on a task without assigning yourself first**:
   - If two teammates start coding the exact same feature without checking the board, one person’s work will be wasted!
   - *Rule*: Always assign the issue to yourself before creating your feature branch.
2. **Leaving closed issues empty**:
   - When closing an issue, always leave a brief courteous comment thanking contributors or linking the merged PR.

---

## 8. 🔮 Predict the Output

A developer writes:
`git commit -m "style: Update logo border (see #7)"`
(Notice they wrote `"see #7"`, NOT `"closes #7"`).

**Question**: Will GitHub automatically close Issue #7 when this commit is pushed?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> No! GitHub will link the commit to the issue so people can read it, but it will NOT close it! GitHub only closes issues if you use action verbs like <code>closes #7</code> or <code>fixes #7</code>!
</details>

---

## 9. 🕵️ Code Detective: The Abandoned Feature

A coding team was building a neighborhood clinic portal. After 3 weeks, nobody knew what features were finished, what was broken, or what to code next.

- **The Diagnosis**: The team wrote code, but never created a GitHub Project board or issues.
- **The Remedy**: The team spent 30 minutes creating 10 discrete issues, tagged them with labels (`frontend`, `database`, `security`), assigned them, and regained complete clarity!

---

## 10. 🏆 5 Levels of Mastery Exercises

### 🟢 Level 1: Recall
1. What is a GitHub Issue?
2. Name three standard labels used on GitHub Issues.
3. What keyword automatically closes Issue #5 when a commit is merged?

### 🟡 Level 2: Understand
4. How does a 3-column Kanban board (To Do, In Progress, Done) prevent duplicate work in a student team?
5. Why are clear reproduction steps essential when reporting a software bug?

### 🟠 Level 3: Apply
6. Open your GitHub repository, click the **Issues** tab, and create two issues:
   - One `enhancement`: *"Add footer copyright and contact email"*.
   - One `documentation`: *"Add team member biographies to README"*.

### 🔵 Level 4: Think & Troubleshoot
7. Create a feature branch, fix one of the issues, commit with `closes #1`, push, and verify that the issue closed automatically on GitHub!

### 🟣 Level 5: Create & Build
8. Create a GitHub Project board for a community initiative (e.g., *Dal Lake Clean Water Awareness Portal*). Create 6 cards spanning research, UI design, HTML markup, and deployment.
