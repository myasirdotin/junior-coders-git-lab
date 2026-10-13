# Chapter 13: What is GitHub? Cloud Repositories & SSH ☁️

---

## 🌟 Real-Life Story

**The Central City Public Library**

You keep a notebook of your science ideas on your desk at home. It is safe, until your computer's disk stops working one day. Now imagine taking a copy to the city library. The library keeps a safe copy, and you send it your new pages whenever you write them. Trusted classmates can read your notebook there, report typos and suggest ideas. **GitHub is that library for code.**

---

## 🎯 What You Will Learn

- Explain the difference between **Git** (the tool on your computer) and **GitHub** (a website that stores repositories online).
- Describe the difference between **public** and **private** repositories.
- Compare the two ways to prove who you are to GitHub: **tokens** and **SSH keys**.
- Generate an **SSH key** and add its public half to a GitHub account.
- Follow the age rule and stay safe when you sign up for online services.

---

> **Age check:** GitHub accounts are only for people aged **13 or older**. If you are younger, do not sign up on your own. You can still learn everything in Chapters 13–19: practise on your own computer with a "pretend GitHub" folder (Chapter 14 shows how), or use a classroom setup that your teacher manages.

---

## ☁️ Git vs. GitHub: What's the Difference?

A **remote repository** (or just **remote**) is a copy of your repository that lives somewhere else, usually on a server on the internet. GitHub is the most popular place to keep remotes.

| Feature | Git ⚙️ | GitHub ☁️ |
| :--- | :--- | :--- |
| **What is it?** | A program you run in the terminal | A website that hosts repositories |
| **Where does it run?** | On your own computer | On GitHub's servers |
| **Needs internet?** | **No.** Works fully offline | **Yes**, to send or receive work |
| **Made by** | Linus Torvalds (2005) | Chris Wanstrath, PJ Hyett, Tom Preston-Werner and Scott Chacon (2008) |
| **Main job** | Track versions and history | Back up code, share it, work in teams |

Git is free, open-source software. GitHub is a company, owned by Microsoft since 2018. Other websites host Git repositories too, such as GitLab, Bitbucket and Codeberg.

---

## 🔓 Public vs. Private Repositories

- **Public repositories**
  - Anyone can view the code and suggest improvements.
  - Good for open-source tools, tutorials and student portfolios.
- **Private repositories**
  - Only you and the people you invite can see them.
  - Good for unfinished work, or work that is not ready to share.

Even in a private repository, never store passwords or secret keys (remember `.gitignore` from Chapter 5).

---

## 🔑 Proving Who You Are: Tokens and SSH Keys

Since **August 2021**, GitHub no longer accepts your website password when you push from the terminal. You need one of these instead:

| Method | What it is | Good for |
| :--- | :--- | :--- |
| **Git Credential Manager** | A helper that opens a browser sign-in window and remembers you. It comes with Git for Windows. | The easiest start on Windows (HTTPS addresses) |
| **Personal Access Token (PAT)** | A long secret code you create on GitHub and use instead of a password | HTTPS addresses, set by hand |
| **SSH key** | A pair of matching keys: a **private key** that stays on your computer and a **public key** you give to GitHub | SSH addresses, no typing each time |

Think of an SSH key like a padlock and its key. You give GitHub the **padlock** (public key). Only your computer has the **key** that opens it (private key).

### Making an SSH key (Git Bash)

```bash
ssh-keygen -t ed25519 -C "zainab@example.org"
```

Press **Enter** to accept the default file. You may type a **passphrase** (a password that protects the key) or press Enter twice for none. Git Bash then shows something like this:

```text
Generating public/private ed25519 key pair.
Your identification has been saved in /c/Users/zainab/.ssh/id_ed25519
Your public key has been saved in /c/Users/zainab/.ssh/id_ed25519.pub
The key fingerprint is:
```

Two files now exist in the `.ssh` folder:

```text
📁 .ssh/
   ├── id_ed25519       🔒 private: never share
   └── id_ed25519.pub   🔓 public: give to GitHub
```

Show the public key and copy it:

```bash
cat ~/.ssh/id_ed25519.pub
clip < ~/.ssh/id_ed25519.pub
```

```text
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAA... zainab@example.org
```

The `clip` line copies the key to the clipboard on Windows. Your key's letters will be different.

### Adding the key to GitHub (13+ only)

1. Sign in to [github.com](https://github.com).
2. Click your profile picture ➔ **Settings** ➔ **SSH and GPG keys**.
3. Click **New SSH key**.
4. Give it a title (for example *"School Laptop"*), paste the key and click **Add SSH key**.

### Testing the connection

```bash
ssh -T git@github.com
```

The first time, SSH asks if you trust GitHub's server. Type `yes`. Then you should see:

```text
Hi zainab-codes! You've successfully authenticated, but GitHub does not provide shell access.
```

Your computer and GitHub can now talk safely. 🎉

---

## 🌍 Real-World Connection: The Open Source Revolution

- GitHub reports well over **100 million developers** and hundreds of millions of repositories.
- Well-known projects live there, such as the VS Code editor and the Python language (`python/cpython`).
- Sharing useful, free tools on GitHub is a way to practise **Beneficial Knowledge (*'Ilm Nāfi'*)**: knowledge that helps people in education, health and science.

---

## 🔮 Predict the Output

You are on a train with no Wi-Fi. You write code and run:

```bash
git add .
git commit -m "Add bus timetable page"
```

**Question**: Will `git commit` work without internet?

<details>
<summary>👀 Click to check your answer</summary>

**Answer:** Yes. Git works fully offline, and the commit is saved in your local repository. You only need internet later, when you send your commits to GitHub (Chapter 14).

</details>

---

## 🕵️ Code Detective: The Password Failure

A student pushed to an HTTPS address and typed their GitHub website password. Git replied:

```text
remote: Support for password authentication was removed on August 13, 2021.
fatal: Authentication failed for 'https://github.com/zainab-codes/eco-club.git/'
```

- **Why?** GitHub stopped accepting website passwords in the terminal in 2021, to keep accounts safer.
- **The fix:** sign in through Git Credential Manager's browser window, use a Personal Access Token, or set up an SSH key as shown above.

---

## ⚠️ Common Mistake

**Mistake 1: Sharing the private key instead of the public key.**

- ❌ **Wrong:** pasting the contents of `id_ed25519` (no `.pub`) into GitHub or an email.
- **What happens:** GitHub refuses it as a key. Worse, anyone who sees it can pretend to be you.
- ✅ **Fixed:** only ever share the file ending in **`.pub`**. If your private key leaks, delete that key on GitHub and make a new pair.

**Mistake 2: Thinking Git and GitHub are the same thing.**

- ❌ **Wrong:** "I can't use Git, because I don't have a GitHub account."
- **What happens:** you skip learning a tool that works perfectly without any account.
- ✅ **Fixed:** Git runs on your computer for everyone. GitHub is one optional place to store a copy online.

---

## ✍️ Try It

Prove that Git does not need the internet:

1. Turn off Wi-Fi (or unplug the network cable).
2. In a practice repository, change a file, then run `git add .` and `git commit -m "Test offline commit"`.
3. Run `git log --oneline` and check that your commit is at the top.
4. Turn Wi-Fi back on.

<details>
<summary>Hint</summary>

Run `git status` before and after the commit. Before, the file is listed as modified. After, Git says `nothing to commit, working tree clean`. No step needed the internet.

</details>

---

## 📝 Recap

- **Git** is a program on your computer. **GitHub** is a website that stores copies of repositories.
- A **remote** is a copy of your repository kept somewhere else.
- Public repositories can be seen by anyone; private ones only by people you invite.
- GitHub does not accept website passwords in the terminal. Use Git Credential Manager, a token or an SSH key.
- Share only the **`.pub`** (public) key. Keep the private key secret.
- GitHub accounts are for ages **13+**. Younger students practise locally or in a teacher-managed classroom.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Explain in one sentence the difference between Git and GitHub.
2. Can you use Git on a desert island with no internet?
3. Which SSH key file is safe to give GitHub: `id_ed25519` or `id_ed25519.pub`?

<details>
<summary>Show answer</summary>

1. Git is a program that tracks versions on your own computer; GitHub is a website that stores and shares Git repositories online.
2. Yes. Every Git command for saving and viewing history (`add`, `commit`, `log`, `diff`, branches) works offline.
3. `id_ed25519.pub`, the public key. The file without `.pub` is private and must never be shared.

</details>

### 🟡 Level 2: Apply
4. Why did GitHub stop accepting plain passwords in the terminal?
5. What is the difference between a public and a private repository?
6. Your school club wants to store (a) a free study-timer website for all students and (b) a draft quiz for next week's test. Which should be public and which private?

<details>
<summary>Show answer</summary>

4. Passwords are often reused and easy to steal. Tokens and SSH keys are long, random and can be removed one by one, so a leak does less damage.
5. Anyone can view a public repository. Only the owner and invited people can view a private one.
6. (a) The study timer can be **public**, so other students can use and improve it. (b) The quiz should be **private**, so nobody sees the questions early.

</details>

### 🔴 Level 3: Challenge
Get your computer ready to talk to GitHub safely.

1. Check for existing keys with `ls -la ~/.ssh` in Git Bash.
2. If there is no `id_ed25519.pub`, make one with `ssh-keygen -t ed25519 -C "you@example.org"`.
3. If you are 13 or older and have a GitHub account, add the public key and run `ssh -T git@github.com`. If you are younger, stop after step 2 and show your teacher the two key files.
4. **Think:** your laptop is lost. How do you stop anyone using it to push to your repositories?
5. **Write:** a short paragraph on how an honest GitHub portfolio (your own work, credited sources) shows real skill.

<details>
<summary>Show one possible answer</summary>

1–2. After `ssh-keygen`, `ls -la ~/.ssh` lists `id_ed25519` and `id_ed25519.pub`.

3. A working test prints `Hi <your-username>! You've successfully authenticated, but GitHub does not provide shell access.`

4. On another computer, sign in to GitHub ➔ **Settings** ➔ **SSH and GPG keys** and **delete** the lost laptop's key. Also change your GitHub password. The key on the laptop is then useless.

5. Example: *"My GitHub portfolio shows the projects I really built, step by step, in my commit history. I credit any code or images I borrowed. This is honest (Ṣidq) and lets teachers see my true skills."*

</details>
