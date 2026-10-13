# Chapter 6: Crafting Meaningful Commits

---

## 🌟 Real-Life Story

**The Captain's Logbook**

A ship's captain keeps a logbook of the whole voyage. A useless entry says: *"Did some stuff. Moved the ship."* A helpful entry says: *"08:00. Turned 15 degrees east to avoid strong monsoon winds."* Anyone reading it later knows what happened and why. In Git, **a commit message is your entry in the project's logbook**, and the next reader may be you, six months from now.

---

## 🎯 What You Will Learn

- Save staged changes as a commit with `git commit -m`.
- Write clear commit messages in the present tense ("Add", "Fix", "Update").
- Use the **Conventional Commits** labels `feat:`, `fix:`, `docs:` and `style:`.
- Keep each commit to one idea (an **atomic commit**).
- Fix your last commit with `git commit --amend`.

---

## The Shape of a Good Commit Message

```text
 TYPE  DESCRIPTION
 ┌──┐  ┌──────────────────────────┐
 feat: Add attendance table
       └─ present tense verb first
 Keep the whole line under 72 characters.
```

- **Type** says what kind of change it is (see the table below).
- **Description** says what the commit does, starting with a verb in the present tense.

| Type | Use it for | Example |
| :--- | :--- | :--- |
| `feat:` | a new feature | `feat: Add student attendance table` |
| `fix:` | a bug fix | `fix: Close the footer div on mobile` |
| `docs:` | documentation only | `docs: Update setup steps in README` |
| `style:` | look or formatting | `style: Improve button colour contrast` |
| `refactor:` | tidier code, same result | `refactor: Simplify the grade loop` |

### Bad vs. good messages

| Bad message ❌ | Clear message ✅ |
| :--- | :--- |
| `Update stuff` | `feat: Add student attendance table` |
| `Fix bug` | `fix: Close the footer div on mobile` |
| `asdf` | `docs: Update setup steps in README` |
| `Finally done!!!` | `style: Improve button colour contrast` |

**Present tense trick:** a good message completes the sentence *"This commit will…"*

- *This commit will…* **Add student login form** ✅
- *This commit will…* **Added student login form** ❌

---

## Example: Making Commits

The Eco Club website already has a first commit. Now we add a navigation bar.

```bash
git add nav.html style.css
git status
```

```text
On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	new file:   nav.html
	new file:   style.css
```

Both files are staged. Now save them as a commit:

```bash
git commit -m "feat: Add navigation bar with links"
```

```text
[main c3898ce] feat: Add navigation bar with links
 2 files changed, 5 insertions(+)
 create mode 100644 nav.html
 create mode 100644 style.css
```

Your commit ID (here `c3898ce`) will be different. The very first commit in a repository also says `(root-commit)`, like this: `[main (root-commit) b9a401f] Add HTML skeleton for club home page`.

---

## How It Works

- `git commit` takes **only what is in the staging area** and saves it as a new snapshot. It records your name, email and the time.
- `-m "..."` gives the message straight on the command line. Without `-m`, Git opens a text editor.
- `[main c3898ce]` shows the branch and the short commit ID.
- `2 files changed, 5 insertions(+)` counts the lines added (`+`) and removed (`-`).
- After the commit, `git status` says `nothing to commit, working tree clean`.

---

## Fixing the Last Commit with `--amend`

You spot a typo right after committing:

```bash
git commit -m "feat: Add navigation bar wiht links"
git commit --amend -m "feat: Add navigation bar with links"
```

```text
[main ce0aaf0] feat: Add navigation bar with links
 Date: Tue Oct 13 08:06:26 2026 +0530
 2 files changed, 5 insertions(+)
 create mode 100644 nav.html
 create mode 100644 style.css
```

`--amend` **replaces** the last commit with a new one. Notice the ID changed (`ce0aaf0`). You can also use it to add a forgotten file:

```bash
git add contact.html
git commit --amend --no-edit
```

`--no-edit` keeps the old message. Only amend commits that are still on your own computer. Once commits are shared with others (Chapter 14), changing them causes confusion for the team.

---

## 🌍 Real-World Connection

**Atomic commits**

- In science, an atom was once thought to be the smallest piece that cannot be split.
- An **atomic commit** holds **one** logical change and nothing else.
- Fixed a login bug **and** changed the header colours? Make **two** commits.
- If the new colours cause a problem tomorrow, the team can undo just that commit. The login fix stays safe.

---

## 🔮 Predict the Output

A student edits `readme.txt`, forgets `git add`, and runs:

```bash
git commit -m "Update docs"
```

What does Git do?

<details>
<summary>👀 Click to check your answer</summary>

Git refuses to make a commit and shows:

```text
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   readme.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

A commit only saves what is in the staging area. Run `git add readme.txt` first.

</details>

---

## 🕵️ Code Detective

**The Vague History**

A new volunteer joins the school library website team and reads the log:

```text
c4f210a fixed it
89b12a0 update
1104e92 test
33ba9f0 changed things
```

- **The problem:** nobody can tell what changed, which bug was fixed, or which commit broke the book search on Friday.
- **The fix:** clear, respectful (*Adab*) messages such as `fix: Show results when the search box has spaces`. They save everyone hours of detective work.

---

## ⚠️ Common Mistake

**Typing `git commit` without `-m`**

❌ **Wrong:**

```bash
git commit
```

**What happens:** Git opens a text editor inside the terminal. On many computers this is **Vim**, which feels like a trap for beginners. Typing letters does nothing you expect.

✅ **Fixed version:** to escape Vim, press `Esc`, type `:q!` and press `Enter`. Git cancels and prints:

```text
Aborting commit due to empty commit message.
```

Then commit the easy way:

```bash
git commit -m "docs: Add contact details to README"
```

**Past tense messages** (`Added footer`) are the other common slip. Write `Add footer`: the message describes what the commit **does**.

---

## ✍️ Try It

1. In a practice repository, create `index.html` with a heading and commit it.
2. Add a `<p>` line to the file and commit again with a `feat:` message.
3. Run `git log --oneline` to see both commits.

<details>
<summary>Hint</summary>

The pattern each time is: edit → `git add index.html` → `git commit -m "feat: Add welcome paragraph"`. `git log --oneline` shows one line per commit, newest first. You will learn more about `git log` in Chapter 7.

</details>

---

## 📝 Recap

- `git commit -m "message"` saves the staging area as a new snapshot.
- Nothing staged means nothing to commit.
- Start messages with a present tense verb: "Add", "Fix", "Update".
- Labels like `feat:`, `fix:` and `docs:` show the kind of change.
- One idea per commit (atomic) makes undoing easy.
- `git commit --amend` replaces the last commit; use it only before sharing.

---

## 🏆 Practice

### 🟢 Level 1: Recall

1. Which flag lets you type the commit message directly in the terminal?
2. What is an atomic commit?
3. Which command changes the message of the most recent commit?

<details>
<summary>Show answer</summary>

1. `-m`, as in `git commit -m "Add footer"`.
2. A commit that contains one logical change only.
3. `git commit --amend -m "New message"`.

</details>

### 🟡 Level 2: Apply

1. Why do Git teams write "Fix bug" instead of "Fixed bug"?
2. How do clean commits show the Islamic value of excellence (*Iḥsān*)?
3. Rewrite these messages in Conventional Commits style:
   - *"I changed the logo and color of footer"*
   - *"Fixed that broken table thing on mobile"*
   - *"Wrote contact us page"*

<details>
<summary>Show answer</summary>

1. The message describes what the commit **does** when it is applied, like an instruction. It reads like a label on the change: *"This commit will fix bug."*
2. *Iḥsān* means doing work carefully and beautifully, even the parts nobody praises. Clear commits are a gift to your teammates and to your future self.
3. Possible answers. The first message mixes two ideas, so it becomes two commits:
   - `style: Update club logo` and `style: Change footer colour`
   - `fix: Make results table scroll on mobile`
   - `feat: Add contact page`

</details>

### 🔴 Level 3: Challenge

**Build a clean history.**

1. Create a new repository called `bakery-site`.
2. Make three atomic commits:
   - Commit 1: an HTML skeleton.
   - Commit 2: a navigation bar.
   - Commit 3: a welcome banner.
3. After commit 3, you notice you forgot `contact.html`. Add it **into** commit 3 without making a fourth commit.
4. Print `git log --oneline` and check you still have exactly three commits.

<details>
<summary>Show one possible answer</summary>

```bash
mkdir bakery-site
cd bakery-site
git init
echo "<h1>Halal Bakery</h1>" > index.html
git add index.html
git commit -m "feat: Add HTML skeleton"
echo "<nav>Home | Menu</nav>" > nav.html
git add nav.html
git commit -m "feat: Add navigation bar"
echo "<p>Fresh bread every morning</p>" > banner.html
git add banner.html
git commit -m "feat: Add welcome banner"
echo "<p>Contact us</p>" > contact.html
git add contact.html
git commit --amend --no-edit
git log --oneline
```

The log shows three lines, for example:

```text
ded9177 (HEAD -> main) feat: Add welcome banner
518e477 feat: Add navigation bar
d3396d3 feat: Add HTML skeleton
```

Your IDs will be different.

</details>
