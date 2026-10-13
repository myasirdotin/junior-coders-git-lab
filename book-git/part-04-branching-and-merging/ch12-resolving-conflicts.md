# Chapter 12: Resolving Merge Conflicts with Confidence 🕊️

---

## 🌟 Real-Life Story

**Two Authors Edit the Same Line**

You and a classmate are writing the first line of an article for the school magazine. At home you write: "The Srinagar Youth Tech Fest is held every October." At the same time your classmate writes: "The Srinagar Youth Tech Fest takes place every April." A computer cannot know which month is right, and it should not silently throw away one person's work. So Git stops and asks the humans to decide. This is a **merge conflict**: not a crash, but Git protecting your work.

---

## 🎯 What You Will Learn

- Explain why merge conflicts happen and why they are normal.
- Read Git's conflict markers: `<<<<<<<`, `=======` and `>>>>>>>`.
- Fix a conflict in your editor, then stage and commit the result.
- Cancel a confusing merge safely with `git merge --abort`.

---

## 👁️ Anatomy of a Conflict

![Merge Conflict Anatomy](../../assets/diagrams/git/merge-conflict-anatomy.svg)

A conflict happens when **both** branches changed the **same lines** of the same file. Git writes both versions into the file between markers:

```text
<<<<<<< HEAD
<h1>Welcome to Junior Coders Srinagar!</h1>
=======
<h1>Welcome to the Young Developers Club!</h1>
>>>>>>> feature/title
```

- `<<<<<<< HEAD`: the start. Below it is **your** version (the branch you are on).
- `=======`: the divider.
- `>>>>>>> feature/title`: the end. Above it is the **incoming** version (the branch you are merging in).

---

## 💻 Example: Resolving a Conflict Step by Step

On `main`, Zainab changed the title to include the city. On `feature/title`, she changed the same line to use the full club name.

**Step 1.** Standing on `main`, she merges:

```bash
git merge feature/title
```

```text
Auto-merging index.html
CONFLICT (content): Merge conflict in index.html
Automatic merge failed; fix conflicts and then commit the result.
```

**Step 2.** She checks the status:

```bash
git status
```

```text
On branch main
You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)
	both modified:   index.html

no changes added to commit (use "git add" and/or "git commit -a")
```

**Step 3.** She opens `index.html` and sees the markers shown above. She has three choices:

- Keep her version.
- Keep the incoming version.
- Combine both (very common).

She combines them and **deletes all three marker lines**:

```html
<h1>Welcome to Junior Coders Srinagar - Young Developers Club!</h1>
```

**Step 4.** She stages the file. This tells Git: "I fixed this file."

```bash
git add index.html
git status
```

```text
On branch main
All conflicts fixed but you are still merging.
  (use "git commit" to conclude merge)

Changes to be committed:
	modified:   index.html
```

**Step 5.** She finishes the merge with a commit:

```bash
git commit -m "Merge feature/title: combine both titles"
```

```text
[main c57f49e] Merge feature/title: combine both titles
```

The history now shows both lines joined:

```text
*   c57f49e Merge feature/title: combine both titles
|\  
| * bd2bf9d Use full club name
* | 9ab822e Add city to title
|/  
* 0c0ae2a Add title
```

---

## 🔍 The Emergency Exit: `git merge --abort`

If a conflict feels too confusing, or you want to ask your teacher first, run:

```bash
git merge --abort
git status
```

```text
On branch main
nothing to commit, working tree clean
```

Your project goes back to exactly how it was before you typed `git merge`. Nothing is lost. You can try again later.

Editors such as Visual Studio Code show buttons above a conflict: **Accept Current Change**, **Accept Incoming Change** and **Accept Both Changes**. They simply edit the file for you. You still stage and commit afterwards.

---

## 🌍 Real-World Connection

A conflict is a reminder to **talk** to your teammate. Good teams message each other kindly: "Salaam! Our branches both changed the menu styles. Shall we look at them together for two minutes?" Patience and good manners (*Adab*) turn a conflict into teamwork.

---

## 🔮 Predict the Output

A merge conflict happens in `style.css`. You fix the file and delete the marker lines.

**Question:** What must you run before `git commit`?

<details>
<summary>👀 Click to check your answer</summary>

```bash
git add style.css
```

Staging the fixed file tells Git the conflict is solved. Then `git commit` finishes the merge.

</details>

---

## 🕵️ Code Detective: The Broken Page

Hamza fixed a conflict in `app.js` and committed. When he ran the program, it crashed with a `SyntaxError` on line 24.

- **The clue:** line 24 still said `<<<<<<< HEAD`. He forgot to delete a marker.
- **The fix:** open `app.js`, delete every marker line, save, then `git add app.js` and commit the fix.

---

## ⚠️ Common Mistake

**Mistake 1: Leaving conflict markers in the file.**

Wrong: you pick a version but forget a marker, then stage and commit:

```html
<h1>Welcome to Junior Coders Srinagar!</h1>
>>>>>>> feature/title
```

What happens: Git accepts it. Git does not check your code. The marker shows on your web page as strange text, or breaks a script.

Fixed version: search the file for `<<<<<<<`, `=======` and `>>>>>>>` before `git add`, and delete them all:

```html
<h1>Welcome to Junior Coders Srinagar!</h1>
```

**Mistake 2: Panicking and deleting the whole project folder.**

What happens: you lose the `.git` folder and all your history.

Fixed version: stay calm and run `git merge --abort`. Everything returns to how it was before the merge.

---

## ✍️ Try It

Make a conflict on purpose, then fix it:

1. In a practice repository, commit `colour.txt` containing `color = "blue"` on `main`.
2. Create `branch-a` and change the line to `color = "green"`. Commit.
3. Switch to `main` and change the line to `color = "red"`. Commit.
4. Run `git merge branch-a`, fix the file to `color = "teal"`, then stage and commit.

<details>
<summary>Hint</summary>

After step 4's merge, `git status` shows `both modified:   colour.txt`. Open the file, replace everything with `color = "teal"`, then run `git add colour.txt` and `git commit -m "Merge branch-a: use teal"`.

</details>

---

## 📝 Recap

- A conflict happens when two branches change the same lines.
- Git marks both versions with `<<<<<<<`, `=======` and `>>>>>>>`.
- Choose or combine the versions, and delete every marker line.
- `git add` the fixed file, then `git commit` to finish the merge.
- `git merge --abort` cancels the merge and returns you to safety.

---

## 🏆 Practice

### 🟢 Level 1: Recall

1. What does Git put into a file when a merge conflict happens?
2. Which command cancels a merge with conflicts and goes back to safety?
3. Which command tells Git you have finished fixing a conflicted file?

<details>
<summary>Show answer</summary>

1. Conflict markers: `<<<<<<<`, `=======` and `>>>>>>>`, with both versions between them.
2. `git merge --abort`
3. `git add <file>`

</details>

### 🟡 Level 2: Apply

1. Why does Git refuse to guess which version to keep?
2. What do `<<<<<<< HEAD` and `>>>>>>> branch-name` mark?
3. After fixing `about.html`, which two commands finish the merge?

<details>
<summary>Show answer</summary>

1. Only the people know which version is correct. Guessing could silently delete someone's work.
2. `<<<<<<< HEAD` starts your version (the branch you are on). `>>>>>>> branch-name` ends the incoming version from the branch being merged.
3. ```bash
   git add about.html
   git commit -m "Merge feature: fix about page conflict"
   ```

</details>

### 🔴 Level 3: Challenge

Write a "Merge Conflict Survival Guide" for younger students in your computer lab:

1. Write five short numbered steps, from seeing the `CONFLICT` message to the final commit.
2. Add one step that tells them what to do if they feel lost.
3. Extra: explain why editors like Visual Studio Code show buttons such as **Accept Current Change** and **Accept Incoming Change**.

<details>
<summary>Show one possible answer</summary>

1. Stay calm. A conflict is normal, not an error.
2. Run `git status` to see which files say `both modified`.
3. Open each file and find `<<<<<<<`, `=======` and `>>>>>>>`.
4. Keep the right lines (or combine them) and delete every marker.
5. Run `git add <file>`, then `git commit`.

Feeling lost? Run `git merge --abort` and ask your teacher or teammate.

Extra: the buttons save time and avoid typing errors. They pick one side, or both, and remove the markers for you. You still check the result, then stage and commit.

</details>
