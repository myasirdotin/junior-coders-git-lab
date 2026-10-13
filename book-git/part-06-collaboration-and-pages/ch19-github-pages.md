# Chapter 19: Publishing Live Websites with GitHub Pages

---

## 🌟 Real-Life Story

**Opening your own public gallery.**
Imagine you painted watercolours of Dal Lake, Pari Mahal and the snowy Pir Panjal mountains.
Right now they hang in your room, so only your family can see them.
Then your principal offers you a glass-fronted gallery on the main road, free of charge, with your name above the door.
Now anyone passing by can enjoy your work. For websites, **GitHub Pages** is that free public gallery.

> **Age check:** GitHub accounts are only for people aged 13 or older. If you are younger, open your website from your own computer for now, or let your teacher publish it with a classroom account. Never sign up on your own.

---

## 🎯 What You Will Learn

- Explain what GitHub Pages does.
- Turn on GitHub Pages for a repository.
- Read a GitHub Pages web address (URL).
- Explain why the home page must be named `index.html`.
- Update a live website with `git push`.

---

## How GitHub Pages Works

**GitHub Pages** is a free service from GitHub. It takes the HTML, CSS and JavaScript files in a repository and shows them as a real website.
These are **static** files: the server sends them exactly as they are. GitHub Pages cannot run server code like PHP or a MySQL database.

```text
1. You edit files on your computer
   📁 lake-weather/
      ├── index.html  ◀ home page
      └── style.css

2. You push to GitHub
   git push

3. GitHub Pages builds the site
   reads main ➔ copies your files
   ➔ turns on HTTPS

4. The site is live
   https://zainab-codes.github.io/
           lake-weather/
```

### Reading the address

For a project repository the address looks like this:

```text
https://<username>.github.io/<repository>/
```

So user `zainab-codes` with repository `lake-weather` gets `https://zainab-codes.github.io/lake-weather/`.
The `https` part means the connection is encrypted. GitHub sets this up for you on `github.io` addresses.

---

## Turning On GitHub Pages

### Step 1: Name your home page `index.html`
Your repository's top folder needs a file named exactly `index.html`: all lowercase, no spaces.
When a visitor opens your site address, GitHub Pages looks for this file first.

### Step 2: Switch Pages on
1. Open your repository on GitHub.
2. Click the **Settings** tab (in the row of tabs at the top).
3. In the left menu, under **Code and automation**, click **Pages**.
4. Under **Build and deployment**:
   - **Source:** choose `Deploy from a branch`.
   - **Branch:** choose `main`.
   - **Folder:** choose `/ (root)`.
5. Click **Save**.

### Step 3: Visit your site
- Wait a minute or two, then refresh the Pages settings screen. The first time can take up to about 10 minutes.
- A message appears: *"Your site is live at https://username.github.io/repo-name/"*.
- Click the link. Your website is on the internet!

On a free GitHub account, Pages works for **public** repositories. Anything in a public repository can be read by anyone, so never put passwords or private details in it (*Amānah*).

---

## Updating the Live Site

You never upload files by hand. To change your website:

```bash
git commit -am "style: Change background to dark green"
git push
```

After each push to `main`, GitHub Pages rebuilds the site. The new version is usually live within a minute or two.
You can follow each build in the repository's **Actions** tab.

---

## 🌍 Real-World Connection

Many teachers, students and open-source projects publish their websites with GitHub Pages.
Project guides, class notes and student portfolios are common examples.
It is free for public repositories, so anyone with a computer and an account can share useful knowledge with the world.

---

## 🔮 Predict the Output

Your website is live on GitHub Pages.
You change the background to dark green and run:
`git commit -am "style: Change background to dark green"`
You forget to run `git push`. Then you open your site's address.

**Question:** Does the live site show the dark green background?

<details>
<summary>👀 Click to check your answer</summary>

**Answer:** No. The commit exists only on your computer. `git status` shows it:

```text
On branch main
Your branch is ahead of 'origin/main' by 1 commit.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean
```

GitHub Pages only sees commits that are pushed to GitHub. Run `git push` and the site updates.

</details>

---

## 🕵️ Code Detective

**The 404 mystery.** A student turned on GitHub Pages, but the address showed:
`404 - There isn't a GitHub Pages site here.`

- **The clue:** the repository's files were named `My Website.html` and `Style.CSS`.
- **The cause:** there was no `index.html`, so GitHub Pages had no home page to show. (It can also use `index.md` or `README.md`, but this repository had neither.)
- **The cure:** rename `My Website.html` to `index.html`, fix the CSS link to match the file name exactly, commit and push. The site appeared.

---

## ⚠️ Common Mistake

**1. A computer path for an image.**

Wrong:

```html
<img src="C:/Users/Zainab/Desktop/lake.jpg" alt="Dal Lake at sunrise">
```

What happens: on your own computer the picture shows. On the live site it is broken, because visitors' computers do not have your Desktop folder.

Fixed: put the picture inside the repository and use a **relative path** (a path that starts from the page's own folder):

```html
<img src="images/lake.jpg" alt="Dal Lake at sunrise">
```

**2. Wrong capital letters.**

Wrong: the file is `Images/Lake.JPG`, but the HTML says `images/lake.jpg`.

What happens: Windows ignores the difference, so it works on your computer. GitHub Pages treats them as different names, so the live picture is missing.

Fixed: use lowercase names for all files and folders, and copy them exactly into your HTML.

---

## ✍️ Try It

Look at one of your own HTML projects. Find every `src="..."` and `href="..."`.
Check two things: does any path start with `C:/` (or another drive letter)? Does every capital letter match the real file name?

<details>
<summary>Hint</summary>

Use your editor's search (Ctrl + F) and search for `src=` and then `href=`. A safe path looks like `images/photo.jpg` or `style.css`.

</details>

---

## 📝 Recap

- **GitHub Pages** turns a repository of HTML, CSS and JavaScript into a free live website.
- Turn it on in **Settings → Pages**: Deploy from a branch, `main`, `/ (root)`.
- The address is `https://<username>.github.io/<repository>/`.
- The home page must be `index.html`, and file names must match exactly, capitals included.
- Every `git push` to `main` updates the live site. A commit that is not pushed does not.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which free service shows a GitHub repository as a website?
2. What exact name must the home page file have?
3. What happens to your live site after you push new commits to `main`?

<details>
<summary>Show answer</summary>

1. GitHub Pages.
2. `index.html` (all lowercase).
3. GitHub Pages rebuilds the site, and the new version is usually live within a minute or two.

</details>

### 🟡 Level 2: Apply
4. Why does a path like `C:\Users\...` fail on the live site?
5. What does the `https` in the address give your visitors?
6. User `aisha-learns` publishes the repository `science-fair`. What is the site's address?

<details>
<summary>Show answer</summary>

4. That path points to a folder on **your** computer. Visitors' computers do not have it, and the GitHub server does not either. Use a relative path to a file inside the repository.
5. The connection between the visitor and the site is encrypted, so nobody in between can read or change the page on the way.
6. `https://aisha-learns.github.io/science-fair/`

</details>

### 🔴 Level 3: Challenge
Publish one of your own websites (with a classroom account if you are under 13).

1. Pick an HTML and CSS project from earlier in the course. Check that the home page is named `index.html`.
2. Create a new public repository on GitHub and push your project to `main` (Chapter 14).
3. Turn on GitHub Pages and open the live address.
4. Change one heading, commit, push, and watch the live site update.
5. Extra: can GitHub Pages run PHP code or a MySQL database? Explain why or why not.
6. Extra: build a "My Learning Launchpad" page with a short bio and links to all your practice pages, and publish it.

<details>
<summary>Show one possible answer</summary>

```bash
git remote add origin git@github.com:zainab-codes/lake-weather.git
git push -u origin main
```

Then **Settings → Pages → Deploy from a branch → main → / (root) → Save**, and visit `https://zainab-codes.github.io/lake-weather/`.

Step 4:

```bash
git commit -am "feat: Update home page heading"
git push
```

Step 5: No. GitHub Pages only sends **static** files (HTML, CSS, JavaScript, images) to the browser. PHP and MySQL need a server that runs code for each visit, which GitHub Pages does not offer. JavaScript still works because it runs in the visitor's browser.

Step 6: an `index.html` with a heading, a short paragraph about you (no private details like your home address or phone number), and a list of links such as `<a href="weather/index.html">Lake weather page</a>`.

</details>
