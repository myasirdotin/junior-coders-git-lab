# Project 1: Solo Portfolio Repository & GitHub Pages 🎨

---

## 🌟 Project Overview

In this project you use everything from this book to build, save, document and publish your own **portfolio website**: a page that shows what you have learned and built.

> **Age check:** GitHub accounts are only for people aged 13 or older. If you are younger, do Steps 1–4 on your own computer (they need no account), and let your teacher publish Step 5 with a classroom account. Never sign up on your own.

### What you will produce
1. A Git repository on your computer, with your name and email set up.
2. A `.gitignore` file that keeps system and editor files out.
3. A home page, `index.html`.
4. A `README.md` that explains the project.
5. A clean history of at least 4 small commits with clear messages.
6. A live website on GitHub Pages.

---

## 🎯 Chapters You Will Use

- **Chapter 3:** setting your Git name and email.
- **Chapters 4 and 5:** `git init`, staging and `.gitignore`.
- **Chapters 6 and 7:** clear commit messages and `git log --oneline`.
- **Chapter 14:** linking to GitHub and pushing.
- **Chapter 19:** publishing with GitHub Pages.

---

## 💻 Step-by-Step Guide

### Step 1: Create the repository

```bash
mkdir my-portfolio
cd my-portfolio
git init
```

Output (your folder path will be different):

```text
Initialized empty Git repository in C:/Users/you/my-portfolio/.git/
```

### Step 2: Add a `.gitignore` first

Create a file named `.gitignore` with this content:

```text
.DS_Store
Thumbs.db
*.log
.vscode/
.idea/
```

These are system and editor files that do not belong in your project. Commit it:

```bash
git add .gitignore
git commit -m "chore: Ignore system and editor files"
```

Output:

```text
[main (root-commit) f6a93e7] chore: Ignore system and editor files
 1 file changed, 5 insertions(+)
 create mode 100644 .gitignore
```

Your commit hashes will be different from the ones in this guide.

### Step 3: Build the home page

Create `index.html`. Replace "Your Name" with your first name. Do not add your home address, phone number or school name: a public site can be read by anyone (*Amānah*).

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Name | Junior Web Developer</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; line-height: 1.6; color: #1e293b; }
    header { border-bottom: 2px solid #f05032; padding-bottom: 20px; margin-bottom: 30px; }
    h1 { color: #0f172a; margin-bottom: 6px; }
    .badge { background: #ffedd5; color: #c2410c; padding: 4px 10px; border-radius: 999px; font-size: 0.85rem; font-weight: 700; }
    .project-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
  </style>
</head>
<body>
  <header>
    <span class="badge">Student Developer</span>
    <h1>Your Name</h1>
    <p>Learning to build helpful, honest websites for my community.</p>
  </header>

  <main>
    <section>
      <h2>My Projects</h2>
      <div class="project-card">
        <h3>Lake Clean-Up Tracker</h3>
        <p>A page that lists clean-up days and simple tips for keeping our lake clean.</p>
      </div>
      <div class="project-card">
        <h3>Class Library Catalogue</h3>
        <p>A neat table of the books in our class library and who looks after them.</p>
      </div>
    </section>

    <section>
      <h2>Skills</h2>
      <p>HTML &bull; CSS &bull; JavaScript &bull; Git &amp; GitHub</p>
    </section>
  </main>

  <footer>
    <p>Built with care while learning with Junior Coders.</p>
  </footer>
</body>
</html>
```

Commit it:

```bash
git add index.html
git commit -m "feat: Add portfolio home page"
```

### Step 4: Write the README

Create `README.md`. GitHub shows this file on your repository's front page.

```markdown
# Your Name: Student Developer Portfolio

My portfolio website, built while learning HTML, CSS, JavaScript and Git.

Live site: https://your-username.github.io/my-portfolio/

## Skills
- HTML, CSS and JavaScript
- Git and GitHub, with clear commit messages

## How I work
- I build tools that help people and my community.
- I keep private details out of public code (Amānah).
- I write clean, tidy code (Iḥsān).

## Contact
Please contact me through my teacher or open an issue in this repository.
```

Commit it:

```bash
git add README.md
git commit -m "docs: Add README with skills and contact"
```

### Step 5: Push to GitHub and publish

Create an **empty** repository named `my-portfolio` on GitHub (no README, so the histories match). Then link and push. Replace `your-username` with your GitHub username:

```bash
git remote add origin git@github.com:your-username/my-portfolio.git
git push -u origin main
```

The last lines of the output:

```text
To github.com:your-username/my-portfolio.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
```

Now open **Settings → Pages**, choose **Deploy from a branch**, `main`, `/ (root)`, and click **Save**. After a minute or two your site is live at `https://your-username.github.io/my-portfolio/`.

### Step 6: Make one more improvement

Add a third project card to `index.html`. Then:

```bash
git add index.html
git commit -m "feat: Add third project card"
git push
```

Refresh your live site after a minute or two to see the new card.

---

## 🧪 Project Checklist

- [ ] `git log --oneline` shows at least 4 commits, each with a clear message.
- [ ] `git status` says `nothing to commit, working tree clean`.
- [ ] `git status` does not list `Thumbs.db`, `.DS_Store` or `.vscode/`, even if those files exist.
- [ ] On GitHub, the repository front page shows your README.
- [ ] The live GitHub Pages address opens your portfolio with `https`.
- [ ] No private details (home address, phone number, passwords) appear in any file.

After Step 4, `git log --oneline` looks like this (newest first):

```text
a77e124 docs: Add README with skills and contact
e3e275b feat: Add portfolio home page
f6a93e7 chore: Ignore system and editor files
```

---

## 📝 Recap

- Start every project with `git init` and a `.gitignore`.
- Make one small commit for each step, with a clear message.
- A `README.md` tells visitors what the project is.
- `git push -u origin main` sends your work to GitHub, and GitHub Pages makes it a live site.
- Every later `git push` updates the live site.
