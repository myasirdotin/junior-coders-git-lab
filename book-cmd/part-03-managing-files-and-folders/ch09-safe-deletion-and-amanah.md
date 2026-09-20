# Chapter 9: Safe Deletion & Digital Trust (*Amānah*)

> **Key Idea**: In the terminal, with great speed comes serious moral and practical responsibility (*Amānah*). Unlike graphical File Explorer, terminal deletions bypass the Recycle Bin. Learning safe deletion habits protects your work and your teammates' data.

---

## 1. Deleting Files

To delete a single file:

| Action | Windows Command Prompt (CMD) | Git Bash / Linux |
| :--- | :--- | :--- |
| **Delete a single file** | `del old.txt` | `rm old.txt` |
| **Delete all HTML files** | `del *.html` | `rm *.html` |
| **Ask for confirmation** | `del /p risky.txt` | `rm -i risky.txt` |

> [!CAUTION]
> **No Recycle Bin!** When you press <kbd>Enter</kbd> on `del file.txt` or `rm file.txt`, the operating system immediately marks those hard drive sectors as free. There is no "Restore" button in the terminal!

---

## 2. Deleting Folders

Folders require special deletion commands to prevent accidental destruction of entire sub-trees:

### In Windows CMD:
* **Delete an EMPTY folder**:
  ```text
  rmdir empty-folder
  ```
  *(If the folder has files inside it, CMD will safely refuse to delete it!)*
* **Force delete a folder and all its contents**:
  ```text
  rmdir /s /q unwanted-folder
  ```
  * `/s`: Removes all directories and files in the specified directory in addition to the directory itself.
  * `/q`: Quiet mode (does not prompt for confirmation).

### In Git Bash / Linux:
* **Delete an empty folder**: `rmdir empty-folder`
* **Force delete a folder and all contents**: `rm -rf unwanted-folder`
  * `-r`: Recursive
  * `-f`: Force

> [!WARNING]
> The command `rm -rf /` or deleting system directories like `C:\Windows` is destructive and permanently ruins operating systems. Always verify what directory you are standing in (`cd` or `pwd`) **before** running any recursive deletion!

---

## 3. The 3 Golden Rules of Safe Terminal Housekeeping

1. **Verify Your Location First**: Always run `cd` or `pwd` right before deleting anything to guarantee you aren't in the wrong folder.
2. **List Before You Delete**: If you plan to run `del *.log`, run `dir *.log` first to review exactly which files will be affected!
3. **Use Git Version Control**: When your codebase is tracked by Git, even if you accidentally delete a file, you can immediately resurrect it using `git checkout` or `git restore`.

---

## 4. Digital Trust (*Amānah*) as a Craftsman

In Islamic ethics, our tools, files, and computer equipment are an **Amānah (sacred trust)**:
* Never delete another student's or teacher's files.
* Do not experiment with destructive commands on shared school computers or family laptops.
* Maintain organized backups of valuable assignments.

---

## 5. Review & Practice

### 🟢 Level 1: Recall
1. What command deletes a file in Windows CMD? What command deletes it in Git Bash?
2. What happens if you try to delete a non-empty folder using `rmdir` without flags?
3. Where do files go after you run `del filename.txt` in the terminal? (Hint: Does it go to the Recycle Bin?)

### 🟡 Level 2: Safe Deletion Exercise
In your `practice-lab` folder:
1. Create a dummy file called `junk.txt`.
2. Delete `junk.txt` using the command line.
3. Verify that `dir` no longer lists `junk.txt`.

### 🔴 Level 3: Ethical Case Study
A friend tells you: *"Type `del /s /q *.*` in your root drive to make your computer run twice as fast!"*
Explain why this command is dangerous, what it actually does, and why our code of digital ethics forbids tricking others into running harmful scripts.
