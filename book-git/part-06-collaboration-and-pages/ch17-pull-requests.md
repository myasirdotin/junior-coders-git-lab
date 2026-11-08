# Chapter 17: Pull Requests & Polite Code Reviews

---

## Teacher Lesson Plan

### Classroom Planning & Logistics
| Field | Detail | Field | Detail |
| :--- | :--- | :--- | :--- |
| **Grade / Class** | Grades 7–8 | **Period Duration** | 45 minutes |
| **Unit / Topic** | Collaboration & Publishing | **Setting** | Computer Lab & Projector |
| **Teacher Name** | ____________________ | **Date / Session** | ____ / ____ / 2026 |

### Learning Objectives (SWBAT)
By the end of this 45-minute lesson, students will be able to:
1. Explain what a Pull Request (PR) is and why teams use them.
2. Push a feature branch to GitHub and open a Pull Request.
3. Write a clear, friendly PR description.
4. Review a classmate's code with kindness and respect (Adab).

### Required Materials & Setup
- Computer lab with web browsers installed (Chrome, Edge, or Firefox).
- Teacher projector displaying Git Bash / Terminal repository for live modeling.
- Student notebooks for recording key syntax rules, vocabulary, and reflections.

### 45-Minute Instructional Delivery Plan
| Time | Phase | Teacher Activity | Student Activity |
| :--- | :--- | :--- | :--- |
| **0–8 min** | **Hook & Analogy** | Share the chapter opening analogy: *"Submitting a proposal to the Student Council. You have an idea: a small weather garden in the school courtyard. You do not start digging up the lawn on your own. That would be rude and confusing. I..."* Connect to today's topic. | Discuss in pairs; volunteer real-life parallels and note the learning target. |
| **8–20 min** | **Direct Instruction** | Model core concepts on the screen. Break down syntax line-by-line; explain architectural structure. | Follow along on screens/notebooks; observe syntax rules and active demonstration. |
| **20–26 min** | **Misconceptions & Diagnostics** | Address Common Mistake: *"1. Using git commit -am for a brand-new file."* Conduct rapid check for understanding. | Identify faulty patterns in sample snippets; explain correct approach verbally. |
| **26–38 min** | **Guided Lab Practice** | Circulate lab while students execute the hands-on task: *"Write a PR description (title plus three short parts) for this change: 'I added a 'Back to top' button to the bottom of the library's book list page.' Use the template..."* | Code independently or in pairs using Git Bash / Terminal repository; test variations. |
| **38–45 min** | **Plenary & Exit Ticket** | Review key takeaways. Pose exit question: *"What is a Pull Request?"* Collect summary tickets. | Answer plenary questions; record homework task; submit exit ticket. |

### Differentiated Instruction
- **Support (Struggling Learners):** Provide starter boilerplate or pair with a peer navigator; focus on Level 1 recall and syntax verification.
- **Extension (Fast Finishers):** Assign Level 3 Challenge from the Practice section; encourage adding creative styling or feature extensions.

### Homework & Notebook Task
- Complete Level 2 Apply questions from the chapter Practice section into class notebooks.
- Write a 2-sentence personal explanation of the primary concept taught in this lesson.

### Ethical Stewardship & Digital Values (Amānah & Beneficial Knowledge)
- Emphasize digital trust (*Amānah*): respect school lab hardware, cite code honestly, and apply programming skills toward beneficial knowledge (*'Ilm Nāfi'*).

### Teacher Sign-off & Reflection
- **Teacher Signature:** ___________________________  **HOD / Coordinator Signature:** ___________________________
- **Lesson Reflection / Notes:** _______________________________________________________________________________

---

## Real-Life Story

**Submitting a proposal to the Student Council.**
You have an idea: a small weather garden in the school courtyard.
You do not start digging up the lawn on your own. That would be rude and confusing.
Instead, you write a short proposal: what the garden is, why it helps, and which flowerbed it uses.
The Student Council reads it, praises the idea and asks for one change: "Keep the watering pipe off the path."
You fix that, they approve, and the plan becomes part of the school. In software, this polite conversation is called a **Pull Request**.

> **Age check:** GitHub accounts are only for people aged 13 or older. If you are younger, practise the Git steps locally, or use a classroom account your teacher manages. Never sign up on your own.

---

## What You Will Learn

- Explain what a **Pull Request** (PR) is and why teams use them.
- Push a feature branch to GitHub and open a Pull Request.
- Write a clear, friendly PR description.
- Review a classmate's code with kindness and respect (*Adab*).
- Update an open PR by pushing more commits.

---

## The Pull Request Conversation

A **Pull Request** is a request to merge your branch into another branch (usually `main`).
It is also a conversation page where teammates can read your changes and comment on them before they are merged.

```text
[ your feature branch ]
          │  git push
          ▼
[ GitHub: open Pull Request ]
          │
          ▼
[ teammates read the changes ]
  "Lovely work! One typo on line 12."
          │
          ▼
[ you push a small fix ]
          │
          ▼
[ PR approved and merged into main ]
```

The name sounds odd at first. You are asking the project owner to **pull** your changes into their branch.

---

## Step 1: Push Your Feature Branch

You already know how to make a branch (Chapter 10) and push it (Chapter 14).
Here, Zainab adds a search box to a school's student directory site:

```bash
git switch -c feature/student-search
git add search.js
git commit -m "feat: Add instant name filter to student directory"
git push -u origin feature/student-search
```

Output:

```text
Switched to a new branch 'feature/student-search'
[feature/student-search 63b2c1c] feat: Add instant name filter to student directory
 1 file changed, 1 insertion(+)
 create mode 100644 search.js
To github.com:zainab-codes/school-directory.git
 * [new branch]      feature/student-search -> feature/student-search
branch 'feature/student-search' set up to track 'origin/feature/student-search'.
```

Your commit hash will be different. When you push to GitHub, it also prints a link that starts a pull request for this branch.

---

## Step 2: Open the Pull Request on GitHub

1. Open your repository page on GitHub.
2. A yellow banner appears: *"feature/student-search had recent pushes"*.
3. Click **Compare & pull request**.
4. Check the two branch boxes at the top: **base: main** ← **compare: feature/student-search**.
5. Write a clear title and description, for example:

```markdown
### What does this PR do?
Adds a search box to the student directory.
Teachers can type a name and the list filters at once.

### How was it tested?
- Tried it with 50 sample student names.
- Checked that pressing Escape clears the box.

### Screenshot
(attach a picture of the new search box)
```

6. Click **Create pull request**.

A teammate can now open the **Files changed** tab. There they see every added line in green and every removed line in red, just like `git diff` (Chapter 7).

### Updating an open PR

Did a reviewer ask for a change? You do **not** need a new PR.
Fix the file, commit, and push to the same branch again.
GitHub adds the new commit to the open PR by itself.

---

## The Manners of Code Review (*Adab*)

When a teammate asks you to review their PR, they are trusting you. Be kind, clear and helpful.

1. **Start with what is good.**
   "MashaAllah, this navbar code is very clean!" or "Great job checking empty form fields!"
2. **Talk about the code, never the person.**
   - Unkind: "Why did you write such bad CSS? It looks broken."
   - Kind and useful: "On small screens (under 400px) this card may overflow. What do you think about `flex-wrap: wrap` here?"
3. **Assume good intentions.**
   Everyone is learning. Explain **why** you suggest a change.
4. **Ask, do not order.** "Could we...?" invites a conversation. "Change this." ends one.

---

## Real-World Connection

Many software teams never push straight to `main`.
On GitHub, a repository owner can turn on **branch protection rules**. These rules can require a Pull Request before any change reaches `main`. They can also require one or more teammates to click **Approve** first.
Many teams also run automatic checks on every PR. These programs test the code before a person even reads it.

---

## Predict the Output

You have an open Pull Request for the branch `feature/navbar`.
You notice a small CSS mistake. You fix it, commit, and run `git push`.

**Question:** Do you have to close the old PR and open a new one?

<details>
<summary>Click to check your answer</summary>

**Answer:** No. GitHub sees the new commit on `feature/navbar` and adds it to the open PR. The **Files changed** tab updates for your reviewers.

</details>

---

## Code Detective

**The broken review tone.** A student wrote this on a classmate's PR:

`"Delete this entire file, it is completely wrong and makes no sense."`

- **What is wrong?** It is harsh and does not help. It goes against good character (*Adab* and *Akhlāq*).
- **A better comment:**
  `"Thank you for taking on this hard feature! I think the list might be stored twice here. Shall we sketch another way together at lab time?"`

---

## Common Mistake

**1. Using `git commit -am` for a brand-new file.**

Wrong:

```bash
git switch -c feature/student-search
git commit -am "feat: Add search"
```

What happens: `-a` only stages files Git is **already tracking**. The new file `search.js` is left out. Git prints `nothing added to commit but untracked files present`, and your PR has no search code.

Fixed:

```bash
git add search.js
git commit -m "feat: Add search"
```

**2. One giant PR.**
A PR with 2,000 changed lines across 30 files is very hard to review well. Keep each PR about **one** idea, like "add search box", so a reviewer can read it carefully.

---

## Try It

Write a PR description (title plus three short parts) for this change: *"I added a 'Back to top' button to the bottom of the library's book list page."* Use the template from Step 2.

<details>
<summary>Hint</summary>

Answer three questions: **What** does it do? **How** did you test it? What will the reviewer **see**? Start the title with `feat:`.

</details>

---

## Recap

- A **Pull Request** asks to merge your branch into another branch, usually `main`.
- First push your feature branch with `git push -u origin <branch>`, then click **Compare & pull request**.
- A good PR description says what changed, how you tested it and what it looks like.
- Pushing more commits to the same branch updates the open PR.
- Review with *Adab*: praise first, talk about the code, explain why, ask instead of order.

---

## Practice

### Level 1: Recall
1. What is a Pull Request?
2. Can you add more commits to a PR after it is opened?
3. What does a reviewer do in a software team?

<details>
<summary>Show answer</summary>

1. A request (and a conversation page on GitHub) to merge one branch into another, usually a feature branch into `main`.
2. Yes. Commit and push to the same branch. GitHub adds the commits to the open PR.
3. A reviewer reads the changes, checks they work and are clear, asks questions, suggests kind improvements, and approves when the code is ready.

</details>

### Level 2: Apply
4. Why do many teams stop people pushing straight to `main`?
5. How does a clear PR description save the reviewer time?
6. Rewrite this review comment so it is kind and helpful: `"This colour is ugly."`

<details>
<summary>Show answer</summary>

4. `main` is the working version everyone shares. Sending all changes through PRs means another person checks each change first, so mistakes are caught before they reach everyone.
5. The reviewer knows at once what the change is for, what to look at and how it was tested. They do not have to guess from the code alone.
6. For example: `"Nice layout! The light yellow text on white is hard to read. Could we try a darker colour so everyone can read it easily?"`

</details>

### Level 3: Challenge
Practise the whole PR flow with a partner (or with your teacher's classroom account if you are under 13).

1. In a practice repository on GitHub, create a branch `feature/footer` with `git switch -c`.
2. Add a footer to `index.html`, stage it and commit with a clear message.
3. Push the branch with `-u` and open a Pull Request with a title and a three-part description.
4. Ask your partner to leave one kind comment. Fix what they suggest, commit and push again.
5. Extra: your PR shows *"This branch has conflicts that must be resolved"*. What does it mean, and how do you fix it on your computer?
6. Extra: write a 4-point "Code Review Pledge" for your school coding club, based on patience, kindness and encouragement.

<details>
<summary>Show one possible answer</summary>

Steps 1–4:

```bash
git switch -c feature/footer
git add index.html
git commit -m "feat: Add footer with school contact details"
git push -u origin feature/footer
```

Then click **Compare & pull request**, fill in the description and click **Create pull request**. After the review, edit the file, then `git add index.html`, `git commit -m "fix: ..."`, and `git push`. The PR updates by itself.

Step 5: someone changed the same lines on `main` after you made your branch. Bring `main` into your branch and solve the conflict (Chapter 12):

```bash
git switch main
git pull
git switch feature/footer
git merge main
# edit the file: keep the right lines, remove the <<<<<<< ======= >>>>>>> markers
git add index.html
git commit -m "merge: Bring in latest main and resolve footer conflict"
git push
```

Step 6, a sample pledge:
1. I will start every review by thanking my classmate and naming something good.
2. I will comment on the code, never on the person.
3. I will explain **why** I suggest a change, and ask instead of order.
4. I will be patient with beginners, because I was one too.

</details>
