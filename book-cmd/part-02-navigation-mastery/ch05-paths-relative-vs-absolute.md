# Chapter 5: Relative vs. Absolute Paths

## 🌟 Real-Life Story

Imagine you invite a friend to your home. You can give the **full address**: *"House 4, Lal Chowk, Srinagar, Jammu and Kashmir, India."* Anyone, anywhere, can find it. Or you can give **directions from where they stand**: *"Leave the bakery, turn right, it is the second house."* That only works if your friend is already at the bakery. Paths in a computer come in the same two kinds.

> **Key Idea**: A **path** is the address of a file or folder. An **absolute path** is the full address, starting from the top of the drive. A **relative path** gives directions starting from the folder you are standing in.

## 🎯 What You Will Learn

- Tell an absolute path from a relative path at a glance.
- Use `.`, `..` and the folder separator inside paths.
- Reach the same folder with both kinds of path in CMD and PowerShell.
- Explain why websites must use relative paths for their own files.

## 🗺️ The Map We Will Use

Here is a small website inside the practice folder. We will use it for every example.

```text
C:\
└── JuniorCoders
    └── practice
        └── my-website   ◄── you are here
            ├── index.html
            ├── css
            │   └── style.css
            └── js
                └── app.js
```

## 📮 Absolute Paths: The Full Address

An **absolute path** starts at the **root** of a drive. On Windows it begins with a drive letter, like `C:\`. It works from **anywhere**, because it gives the whole address.

```text
C:\JuniorCoders\practice\my-website\css\style.css
```

Let us list the `css` folder using its absolute path, from a completely different place.

**CMD**:

```text
C:\Users\Amina>dir /b C:\JuniorCoders\practice\my-website\css
style.css
```

**PowerShell**:

```text
PS C:\Users\Amina> dir -Name C:\JuniorCoders\practice\my-website\css
style.css
```

Amina was standing in her home folder. The full address still worked.

## 🧭 Relative Paths: Directions From Here

A **relative path** does **not** start with a drive letter or `\`. The terminal reads it starting from your **current folder**.

Now Amina moves into `my-website` first.

**CMD**:

```text
C:\Users\Amina>cd C:\JuniorCoders\practice\my-website

C:\JuniorCoders\practice\my-website>dir /b css
style.css
```

**PowerShell**:

```text
PS C:\Users\Amina> cd C:\JuniorCoders\practice\my-website
PS C:\JuniorCoders\practice\my-website> dir -Name css
style.css
```

`css` means *"the css folder right here"*. It is short and easy to type.

### Climbing with `..`

From inside the `css` folder, how do you list the `js` folder? Go **up** one level, then **down** into `js`:

```text
C:\JuniorCoders\practice\my-website\css>dir /b ..\js
app.js
```

In PowerShell the command is `dir -Name ..\js`, with the same answer: `app.js`.

## 📊 Comparing Both Kinds

Standing in `C:\JuniorCoders\practice\my-website`:

| Item | Absolute path | Relative path |
| :--- | :--- | :--- |
| `index.html` | `C:\JuniorCoders\practice\my-website\index.html` | `index.html` or `.\index.html` |
| `css` folder | `C:\JuniorCoders\practice\my-website\css` | `css` |
| `style.css` | `C:\JuniorCoders\practice\my-website\css\style.css` | `css\style.css` |
| `practice` folder | `C:\JuniorCoders\practice` | `..` |

## 🔣 Path Symbols

| Symbol | Meaning | Example |
| :--- | :--- | :--- |
| `.` (one dot) | this folder | `.\index.html` |
| `..` (two dots) | the parent folder | `..\js\app.js` |
| `\` at the start | the root of this drive | `\JuniorCoders` |
| `\` in the middle | a separator between names | `css\style.css` |

> [!NOTE]
> **Git Bash / macOS** use forward slashes: `css/style.css`, `../js/app.js`, `./index.html`. An absolute path starts with `/`, such as `/c/JuniorCoders/practice` in Git Bash. PowerShell happily accepts forward slashes too.

## 🌐 Why Web Developers Care

A web page connects to its other files with paths. Here is how `index.html` might load its style file and script:

```html
<link rel="stylesheet" href="css/style.css">
<script src="js/app.js"></script>
```

These are **relative** paths. They mean *"start from the folder where this page is"*.

Now imagine you wrote an absolute path instead:

```html
<link rel="stylesheet" href="C:\JuniorCoders\practice\my-website\css\style.css">
```

It works on your computer only. When the site goes onto a web server, that server has no `C:\JuniorCoders` folder. The link breaks, and the page loses all its styles.

> [!IMPORTANT]
> **Golden rule for websites**: use relative paths to link your own pages, styles, scripts and images. Then the site works on any computer and any server.

## ⚠️ Common Mistake

**Using a relative path from the wrong place.** Amina is in her home folder and types:

```text
C:\Users\Amina>cd css
The system cannot find the path specified.
```

There is no `css` folder **inside her home folder**. A relative path always starts from where you are. Two fixes:

```text
C:\Users\Amina>cd C:\JuniorCoders\practice\my-website\css
```

or first walk to `my-website`, then type `cd css`.

**Starting a relative path with `\`.** `cd \css` means *"the css folder at the top of the drive"*, which does not exist. Leave out the first `\` for a relative path.

## ✍️ Try It

1. Go to `C:\JuniorCoders\practice` using its **absolute** path.
2. Go up to `C:\JuniorCoders` using a **relative** path.
3. Go back into `practice` using a relative path.
4. Check where you are with `cd` (CMD) or `pwd` (PowerShell).

*Hint*: An absolute path starts with `C:\`. A relative path to the parent is just two dots.

## 📝 Recap

- A **path** is an address for a file or folder.
- An **absolute path** starts from the root (`C:\`) and works from anywhere.
- A **relative path** starts from your current folder. It is shorter, but depends on where you stand.
- `.` means this folder and `..` means the parent folder.
- Websites must use relative paths for their own files, so they work on every server.

## 🏆 Practice

### 🟢 Level 1: Recall
1. What is the difference between an absolute path and a relative path?
2. Which kind of path starts with a drive letter like `C:\`?
3. What does a single `.` mean in a path?

<details>
<summary>Show answer</summary>

1. An absolute path gives the full address from the root of the drive. A relative path gives directions from the current folder.
2. An absolute path.
3. The current folder ("this folder").

</details>

### 🟡 Level 2: Apply
Here is a project:

```text
school-portal
├── index.html
├── pages
│   └── about.html
└── assets
    └── logo.png
```

1. The file `about.html` wants to show `logo.png`. What relative path should it use?
2. What relative path takes `about.html` back to `index.html`?

<details>
<summary>Show answer</summary>

1. `../assets/logo.png` (up from `pages` to `school-portal`, then into `assets`). Web pages use forward slashes.
2. `../index.html`

</details>

### 🔴 Level 3: Challenge
A classmate wrote this in a web page:

```html
<img src="C:\Users\Admin\Desktop\school-site\images\banner.jpg" alt="School banner">
```

The page is saved as `C:\Users\Admin\Desktop\school-site\index.html`.

1. Explain why the picture disappears once the site is on a web server.
2. Rewrite the tag with a correct relative path.

<details>
<summary>Show one possible answer</summary>

1. The path points to a folder on the classmate's own computer. The web server has no `C:\Users\Admin\Desktop` folder, and visitors' browsers cannot reach that computer. So the browser cannot find the picture.
2. The page and the `images` folder are both inside `school-site`, so:

```html
<img src="images/banner.jpg" alt="School banner">
```

</details>
