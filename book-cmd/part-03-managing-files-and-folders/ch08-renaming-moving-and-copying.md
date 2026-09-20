# Chapter 8: Renaming, Moving & Copying Files

> **Key Idea**: Tidying your codebase is an essential developer habit. Moving, copying, and renaming files from the terminal prevents clumsy drag-and-drop mistakes where files accidentally drop into the wrong subfolder.

---

## 1. Renaming Files

When you want to change a file's name without altering its location:

| Action | Windows Command Prompt (CMD) | Git Bash / macOS / Linux |
| :--- | :--- | :--- |
| **Rename a file** | `ren old-name.txt new-name.txt` | `mv old-name.txt new-name.txt` |
| **Rename a folder** | `ren old-folder new-folder` | `mv old-folder new-folder` |

### Important Difference to Notice:
* In Windows CMD, `ren` is short for **rename**:
  ```text
  ren styles.txt style.css
  ```
* In Git Bash / Linux, there is no separate rename command! The **`mv`** (*Move*) command handles both moving AND renaming:
  ```bash
  mv styles.txt style.css
  ```

---

## 2. Moving Files into Other Folders

Moving a file cuts it from its current folder and pastes it into another:

| Action | Windows Command Prompt | Git Bash / Linux |
| :--- | :--- | :--- |
| **Move file into subfolder** | `move script.js js\` | `mv script.js js/` |
| **Move and rename at once** | `move temp.txt archive\old.txt` | `mv temp.txt archive/old.txt` |
| **Move file up to parent** | `move logo.png ..` | `mv logo.png ..` |

---

## 3. Copying Files

Copying duplicates a file so the original remains completely untouched:

| Action | Windows Command Prompt | Git Bash / Linux |
| :--- | :--- | :--- |
| **Copy a single file** | `copy page.html backup.html` | `cp page.html backup.html` |
| **Copy file into subfolder** | `copy logo.png assets\` | `cp logo.png assets/` |
| **Copy entire folder tree** | `xcopy /e /i src backup_src` | `cp -r src backup_src` |

### Example: Making a Safe Working Backup
Before trying risky CSS modifications on a live landing page, developers often duplicate their stylesheet:
```text
copy style.css style.backup.css
```
Now you can experiment fearlessly knowing your backup is intact!

---

## 4. Summary Rosetta Stone

```
┌─────────────────────────────────┬───────────────────┬───────────────────┐
│ Action                          │ Windows CMD       │ Git Bash / Linux  │
├─────────────────────────────────┼───────────────────┼───────────────────┤
│ Rename file                     │ ren old.js new.js │ mv old.js new.js  │
│ Move file into folder           │ move file.js js\  │ mv file.js js/    │
│ Move file one level up          │ move file.js ..   │ mv file.js ..     │
│ Copy single file                │ copy a.txt b.txt  │ cp a.txt b.txt    │
│ Copy directory recursively      │ xcopy /e /i a b   │ cp -r a b         │
└─────────────────────────────────┴───────────────────┴───────────────────┘
```

---

## 5. Review & Practice

### 🟢 Level 1: Recall
1. What command renames a file in Windows CMD? What command is used in Git Bash?
2. How do you move a file named `banner.png` up into the parent directory?
3. What is the difference between `copy` and `move`?

### 🟡 Level 2: Reorganization Drill
Suppose your folder has `main.css` lying in the root directory.
1. Write the command to move `main.css` into a subfolder named `css`.
2. Write the command to make a backup copy of `index.html` named `index.backup.html`.

### 🔴 Level 3: Defensive Coding (*Amānah*)
If you run `copy source.txt destination.txt` and `destination.txt` already exists, what warning does Windows CMD prompt you with? Why is this confirmation prompt important for protecting user data?
