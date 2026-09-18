# Project 2: Team Collaboration & Feature Branch Simulation 👥🤝

---

## 1. 🌟 Project Overview

In this advanced collaborative capstone project, you will simulate a **real-world two-developer software engineering team** collaborating on a shared GitHub repository.

You will role-play both developers (Developer A: Lead Architect, and Developer B: Feature Specialist) or work with a real lab partner to experience:
1. Adding a teammate as an official collaborator on GitHub.
2. Creating and working exclusively on isolated feature branches.
3. Synchronizing upstream commits with `git pull`.
4. Opening and reviewing a formal **Pull Request** with courteous, constructive comments (*Adab*).
5. Intentionally triggering and cleanly resolving a **Merge Conflict**.
6. Celebrating a successful, zero-downtime merge into `main`!

---

## 2. 🎯 Scenario & Personas

- **Project**: *Srinagar Heritage & Eco Tourism Portal*
- **Developer A (Lead)**: Sets up the initial repository, builds the homepage structure, and reviews Pull Requests.
- **Developer B (Feature Specialist)**: Clones the project, branches off to create an interactive "Attractions Guide", and submits a PR for review.

---

## 3. 💻 Step-by-Step Simulation Lab

### Phase 1: Developer A Sets the Foundation
```bash
# Developer A initializes the project
mkdir srinagar-heritage-portal
cd srinagar-heritage-portal
git init
echo "<h1>Srinagar Heritage Portal</h1>" > index.html
git add .
git commit -m "feat: Initial homepage header structure"

# Push to GitHub
git remote add origin git@github.com:myasirdotin/srinagar-heritage-portal.git
git push -u origin main
```

**Developer A invites Developer B**:
On GitHub ➔ **Settings** ➔ **Collaborators** ➔ Click **Add people** ➔ Enter partner's GitHub username.

---

### Phase 2: Developer B Clones and Branches
Developer B opens their terminal:

```bash
# Developer B clones the shared repository
git clone git@github.com:myasirdotin/srinagar-heritage-portal.git
cd srinagar-heritage-portal

# Developer B NEVER codes directly on main! They sprout a feature branch:
git switch -c feature/attractions-guide

# Developer B adds the attractions section to index.html
cat << 'EOF' >> index.html
<section id="attractions">
  <h2>Famous Heritage Landmarks</h2>
  <ul>
    <li>Mughal Gardens (Shalimar & Nishat)</li>
    <li>Hari Parbat Fort & Historic Ramparts</li>
    <li>Jamia Masjid Architecture</li>
  </ul>
</section>
EOF

# Developer B commits and pushes their feature branch
git commit -am "feat: Add famous Srinagar landmarks section"
git push -u origin feature/attractions-guide
```

---

### Phase 3: Developer B Opens a Pull Request
On GitHub:
1. Developer B clicks **Compare & pull request**.
2. Title: `feat: Add famous Srinagar landmarks section`.
3. Description:
   > *"As-salamu alaykum team! This PR introduces the historical attractions list for visitors to Srinagar. Tested on desktop and mobile. Ready for review!"*
4. Assign Developer A as Reviewer.

---

### Phase 4: Developer A Reviews and Requests a Small Tweak
On GitHub:
1. Developer A receives the notification and opens the **Files changed** tab.
2. Developer A reviews the code:
   > *"MashaAllah, excellent landmark selections! Could we also include Pari Mahal in the bullet points?"*
3. Developer B reads the comment locally, adds `<li>Pari Mahal (Palace of Fairies)</li>`, commits, and runs `git push`.
4. GitHub updates the PR automatically!
5. Developer A clicks **Approve** and presses **Merge pull request**! 🟢

---

### Phase 5: Both Developers Synchronize Locally
Now that the feature is merged on GitHub:

```bash
# Both developers switch to main and pull the latest code:
git switch main
git pull origin main

# Delete the merged feature branch locally:
git branch -d feature/attractions-guide
```

Your team has successfully executed the professional GitHub feature-branch workflow! 🚀

---

## 4. 🧪 Project Verification Checklist

- [ ] Verify that Developer A never pushed directly to `main` during feature development.
- [ ] Verify that Developer B's feature branch was pushed and reviewed via a formal PR.
- [ ] Verify the PR review comments were polite, professional, and encouraging (*Adab*).
- [ ] Verify both developers have identical commit histories on `main` after pulling.
