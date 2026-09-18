# Project 1: Solo Portfolio Repository & GitHub Pages 🎨🚀

---

## 1. 🌟 Project Overview

In this capstone project, you will apply everything you have learned about Git and GitHub to build, version, document, and publish your **Official Junior Developer Portfolio Repository** to the world.

### Deliverables You Will Produce:
1. A fully initialized and configured Git repository.
2. A professional **`README.md`** written in GitHub Flavored Markdown with badges, screenshots, and bio.
3. A robust **`.gitignore`** excluding all unnecessary OS and editor files.
4. An **Atomic Commit History** with at least 5 meaningful commits using Conventional Commits.
5. A live, deployed website published to the world on **GitHub Pages**.

---

## 2. 🎯 Learning Outcomes Applied

- **Chapter 3**: Global Git configuration and identity setup.
- **Chapter 4 & 5**: Repository initialization, atomic staging, and `.gitignore`.
- **Chapter 6 & 7**: Conventional Commits and history verification (`git log --oneline`).
- **Chapter 14**: Remote repository linking and upstream push.
- **Chapter 19**: Deploying live via GitHub Pages.

---

## 3. 💻 Step-by-Step Implementation Guide

### Step 1: Initialize the Project
```bash
mkdir my-developer-portfolio
cd my-developer-portfolio
git init
```

### Step 2: Create the `.gitignore`
Create `.gitignore`:
```text
.DS_Store
Thumbs.db
*.log
.vscode/
.idea/
```
Commit it:
```bash
git add .gitignore
git commit -m "chore: Initialize .gitignore for OS and editor artifacts"
```

### Step 3: Build the Semantic HTML Portfolio
Create `index.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Yasir Rasool | Junior Web Developer</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; line-height: 1.6; color: #1e293b; }
    header { border-bottom: 2px solid #f05032; padding-bottom: 20px; margin-bottom: 30px; }
    h1 { color: #0f172a; margin-bottom: 6px; }
    .badge { background: #ffedd5; color: #c2410c; padding: 4px 10px; border-radius: 999px; font-size: 0.85rem; font-weight: 700; }
    .project-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
    .btn { background: #f05032; color: white; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block; }
  </style>
</head>
<body>
  <header>
    <span class="badge">Srinagar, Jammu &amp; Kashmir</span>
    <h1>Yasir Rasool</h1>
    <p>Aspiring Full-Stack Software Engineer &bull; Building ethical, beneficial web applications.</p>
  </header>

  <main>
    <section>
      <h2>Featured Projects</h2>
      <div class="project-card">
        <h3>1. Srinagar Dal Lake Eco-Monitor</h3>
        <p>A responsive dashboard tracking water purity and educational conservation tips.</p>
      </div>
      <div class="project-card">
        <h3>2. Community Student Library Portal</h3>
        <p>A relational database system managing book lending records with clean SQL architecture.</p>
      </div>
    </section>

    <section>
      <h2>Technical Skills</h2>
      <p>HTML5 &bull; CSS3 &bull; Modern JavaScript &bull; Git &amp; GitHub &bull; PHP &bull; MySQL</p>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 Yasir Rasool. Open source portfolio built with pride in Srinagar.</p>
  </footer>
</body>
</html>
```

Commit it:
```bash
git add index.html
git commit -m "feat: Add semantic portfolio blueprint and basic responsive styling"
```

### Step 4: Add Professional Project Documentation (`README.md`)
Create `README.md`:
```markdown
# Yasir Rasool - Junior Developer Portfolio 🌐🚀

[![GitHub Pages](https://img.shields.io/badge/Live-Demo-brightgreen.svg)](https://myasirdotin.github.io/my-developer-portfolio/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Welcome to my software engineering portfolio repository! I am a student developer based in Srinagar, Jammu and Kashmir, mastering full-stack web engineering.

---

## 🛠️ Tech Stack
- **Frontend**: HTML5, CSS3, Modern ES6+ JavaScript
- **Version Control**: Git, GitHub, Conventional Commits
- **Backend & Database**: PHP, MySQL, Relational Database Modeling

---

## 🌍 Ethical Engineering
All projects in this repository adhere to the **Junior Coders Ethical Guidelines**:
- Prioritizing beneficial, community-focused tools.
- Strict data privacy and secret management (*Amānah*).
- Clean, maintainable, and well-tested code (*Iḥsān*).

---

## 📬 Contact
- **Email**: [y.rasool@srinagar.edu.in](mailto:y.rasool@srinagar.edu.in)
- **GitHub**: [@myasirdotin](https://github.com/myasirdotin)
```

Commit it:
```bash
git add README.md
git commit -m "docs: Add comprehensive project README with tech stack and badges"
```

### Step 5: Push to GitHub & Launch Pages
```bash
# Link to your GitHub account (replace with your username)
git remote add origin git@github.com:myasirdotin/my-developer-portfolio.git

# Push to main
git push -u origin main
```

Now enable **GitHub Pages** under repository **Settings ➔ Pages**!

---

## 4. 🧪 Project Verification Checklist

- [ ] Run `git log --oneline`: verify at least 3 distinct, professional commits.
- [ ] Inspect `.gitignore`: verify no `.DS_Store` or editor junk is tracked.
- [ ] Open the repository on GitHub: verify the `README.md` renders cleanly.
- [ ] Visit the live GitHub Pages link: verify your portfolio opens worldwide via HTTPS!
