# Chapter 7: Creating Folders & Files at Lightning Speed

> **Key Idea**: Creating a folder in File Explorer requires right-clicking, hovering over "New", clicking "Folder", and typing a name. In the terminal, you can create 5 folders and 3 files in under 2 seconds with a single line of text.

---

## 1. Creating Folders (`mkdir`)

The command to create a new folder is **`mkdir`** (*Make Directory*).

Both Windows CMD and Git Bash / Linux support `mkdir`:
```text
mkdir my-new-project
```

### The Superpower: Creating Multiple Folders at Once
Separate each folder name with a space:
```text
mkdir css js assets docs
```
In less than a millisecond, 4 distinct directories are created!

### Creating Nested Subfolders in Git Bash:
In Git Bash / Linux, pass the `-p` (parents) flag to build an entire nested directory tree in one go:
```bash
mkdir -p my-app/src/components
```

---

## 2. Creating New Files

Creating an empty code file without opening a text editor first:

| Action | Windows Command Prompt (CMD) | Git Bash / macOS / Linux |
| :--- | :--- | :--- |
| **Create empty file** | `type nul > index.html` | `touch index.html` |
| **Create file with text** | `echo hello > welcome.txt` | `echo "hello" > welcome.txt` |
| **Create and open in editor**| `notepad index.html` | `nano index.html` |

### In Windows CMD:
`type nul > index.html`
* `nul` is a special Windows device that produces zero output.
* `>` is the **redirection operator** that streams output into a file.
* This creates a brand new 0-byte file named `index.html`.

### In Git Bash:
`touch index.html`
* `touch` is the classic Unix command that creates an empty file if it does not exist, or updates its timestamp if it already exists.

---

## 3. The 60-Second Web Project Scaffolding Drill

Watch how a web developer sets up a complete website project in just 3 commands:

```text
mkdir portfolio
cd portfolio
mkdir css js images
type nul > index.html
type nul > css\styles.css
type nul > js\app.js
```
*(In Git Bash, you replace `type nul >` with `touch`)*.

What took 20 mouse clicks in File Explorer was finished in 4 lines of clean text!

---

## 4. Review & Practice

### 🟢 Level 1: Recall
1. What command is used to create a new directory in both CMD and Bash?
2. How do you create three folders named `alpha`, `beta`, and `gamma` with a single command?
3. How do you create an empty `index.html` file in Windows CMD? How do you do it in Git Bash?

### 🟡 Level 2: Hands-On Scaffolding
Open your terminal:
1. Move to your `Desktop` folder using `cd Desktop`.
2. Create a folder called `practice-lab` and step into it.
3. In one line, create folders `pages` and `assets`.
4. Create an empty file called `index.html`.
5. Run `dir` (or `ls`) to verify all items were created.

### 🔴 Level 3: Script Analysis
Explain what the `>` symbol does in the command:
`echo Hello Junior Coders > readme.txt`
What happens to the file `readme.txt` if it already exists?
