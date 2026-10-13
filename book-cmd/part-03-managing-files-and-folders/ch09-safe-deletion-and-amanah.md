# Chapter 9: Safe Deletion & Digital Trust (*Amānah*)

## 🌟 Real-Life Story

In the school kitchen garden, Yusuf is asked to pull out the weeds. A careless helper pulls quickly and also pulls out the new bean plants. Yusuf works differently. He looks at each plant first. He checks it really is a weed. Then he pulls out just that one. Deleting files from the terminal needs the same care, because there is no way to put the plant back.

> **Key Idea**: Terminal deletions **skip the Recycle Bin**. The file is gone at once. So we always look first, delete one named item at a time, and work only inside our practice folder.

## 🎯 What You Will Learn

- Delete a single file with `del` in CMD and PowerShell.
- Ask the terminal to confirm before it deletes.
- Remove empty folders, and folders with files, safely.
- Follow the three golden rules of safe deletion.
- Explain why careful deletion is part of *Amānah* (trust).

> [!CAUTION]
> **No Recycle Bin. No undo.** Practise every command in this chapter **only** inside `C:\JuniorCoders\practice`. Never on the desktop, never in Documents, never on a shared computer's folders.

## 🔍 Golden Rule 1: Look Before You Delete

Before every deletion, check **where** you are and **what** is there.

**CMD**:

```text
C:\JuniorCoders\practice>cd
C:\JuniorCoders\practice

C:\JuniorCoders\practice>dir /b
junk.txt
notes.txt
old-drafts
```

**PowerShell**:

```text
PS C:\JuniorCoders\practice> dir -Name
old-drafts
junk.txt
notes.txt
```

Now you know exactly which items exist. You are ready to choose one.

## 🗑️ Deleting One File: `del`

`del` is short for **del**ete. Type it with **one exact file name**.

**CMD** (it prints nothing when it works):

```text
C:\JuniorCoders\practice>del junk.txt

C:\JuniorCoders\practice>dir /b
notes.txt
old-drafts
```

**PowerShell** (also silent):

```text
PS C:\JuniorCoders\practice> del junk.txt
PS C:\JuniorCoders\practice> dir -Name
old-drafts
notes.txt
```

If the file is not there, CMD says so, and nothing else happens:

```text
C:\JuniorCoders\practice>del junk.txt
Could Not Find C:\JuniorCoders\practice\junk.txt
```

### Golden Rule 2: Ask for a "Are you sure?"

Both terminals can ask you before they delete.

**CMD** uses `/p` (for **p**rompt):

```text
C:\JuniorCoders\practice>del /p notes.txt
C:\JuniorCoders\practice\notes.txt, Delete (Y/N)? N
```

**PowerShell** uses `-Confirm`:

```text
PS C:\JuniorCoders\practice> del notes.txt -Confirm

Confirm
Are you sure you want to perform this action?
Performing the operation "Remove File" on target "C:\JuniorCoders\practice\notes.txt".
[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "Y"):
```

Type `N` and press Enter to keep the file. Type `Y` to delete it.

> [!NOTE]
> **Git Bash / macOS**: `rm junk.txt` deletes a file. `rm -i junk.txt` asks first (`-i` means **i**nteractive). Like Windows, `rm` skips the bin.

## 📁 Deleting Folders

### An empty folder: `rmdir`

`rmdir` means **r**e**m**ove **dir**ectory. It only removes **empty** folders. That makes it safe.

**CMD**:

```text
C:\JuniorCoders\practice>rmdir old-drafts
The directory is not empty.
```

CMD refused, because `old-drafts` still has files. Good! It protected you. Look inside first:

```text
C:\JuniorCoders\practice>dir /b old-drafts
draft-1.txt
```

### A folder with files inside

If you have checked and you really want the folder and everything in it gone, use `rmdir /s`. The `/s` means *"with all its **s**ubfolders and files"*. CMD then asks you to be sure:

```text
C:\JuniorCoders\practice>rmdir /s old-drafts
old-drafts, Are you sure (Y/N)? Y

C:\JuniorCoders\practice>
```

> [!WARNING]
> You may see `/q` (quiet) in other guides. It **removes this question**. We do not use it. The question is your last chance to stop.

**PowerShell**: `rmdir old-drafts` works on an empty folder. If the folder has files, PowerShell stops and asks:

```text
PS C:\JuniorCoders\practice> rmdir old-drafts

Confirm
The item at C:\JuniorCoders\practice\old-drafts has children and the Recurse parameter was not specified. If you
continue, all children will be removed with the item. Are you sure you want to continue?
[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "Y"):
```

"Children" means the files and folders inside. Read the path in the message. Answer `Y` only if it is the right folder.

> [!NOTE]
> **Git Bash / macOS**: `rmdir old-drafts` removes an empty folder. `rm -r -i old-drafts` removes a full folder and asks about each item. Never add `-f` (force), which turns off all questions.

## 🛡️ The Three Golden Rules

1. **Check where you are.** Run `cd` (CMD) or `pwd` (PowerShell) first.
2. **List before you delete.** Run `dir` and read the names. Planning to delete all `.log` files with `del *.log`? Run `dir *.log` first. The `*` means "any name", so this shows every file the delete would remove.
3. **Delete one named item at a time,** and let the terminal ask you to confirm.

Later, in the Git book, you will learn to save versions of your work. Git can bring back a file that was saved in a version. Until then, the only safety is care.

## 🤝 Digital Trust (*Amānah*)

In Islam, what is placed in our care is an **Amānah**, a trust. A shared school computer is a trust. So are other people's files.

- Never delete another student's or teacher's files.
- Never try deleting commands on shared or family computers. Use only your practice folder.
- Never pass on a "trick" command to others without understanding it. Tricking someone into harming their computer breaks their trust.
- Keep backups of work that matters, such as homework and projects.

## ⚠️ Common Mistake

**Deleting in the wrong folder.** Bilal wants to tidy his practice folder. But his terminal is still in `C:\Users\Bilal\Documents`. He types `del report.txt` without looking. His real school report is gone, with no Recycle Bin copy.

The fixed habit:

```text
C:\Users\Bilal\Documents>cd C:\JuniorCoders\practice

C:\JuniorCoders\practice>cd
C:\JuniorCoders\practice

C:\JuniorCoders\practice>dir /b report.txt
report.txt

C:\JuniorCoders\practice>del /p report.txt
C:\JuniorCoders\practice\report.txt, Delete (Y/N)? Y
```

Move, check, list, then delete with a question.

## ✍️ Try It

Inside `C:\JuniorCoders\practice`:

1. Make a file called `junk.txt`.
2. List the folder to see it.
3. Delete it with a confirmation question (`/p` or `-Confirm`).
4. List again to check it is gone.

*Hint*: Use `type nul > junk.txt` (CMD) or `New-Item junk.txt` (PowerShell) from Chapter 7.

## 📝 Recap

- `del name` deletes one file. It skips the Recycle Bin.
- `del /p` (CMD) and `del -Confirm` (PowerShell) ask before deleting.
- `rmdir` removes only empty folders. That refusal protects you.
- `rmdir /s` removes a full folder after asking. We never add `/q`.
- Always: check where you are, list first, delete one named item, and only in your practice folder.

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which command deletes a file in CMD and PowerShell? Which one in Git Bash?
2. What happens if you use `rmdir` on a folder that still has files in it?
3. Where does a file go after `del notes.txt`?

<details>
<summary>Show answer</summary>

1. `del` in CMD and PowerShell. `rm` in Git Bash.
2. CMD refuses with `The directory is not empty.` PowerShell stops and asks for confirmation.
3. Nowhere you can reach. It does **not** go to the Recycle Bin. It is gone.

</details>

### 🟡 Level 2: Apply
Your practice folder contains `draft1.txt`, `draft2.txt`, `final.txt` and an empty folder `tmp`.

1. Write the command that shows which files start with `draft`.
2. Write the commands that delete only the two drafts, asking each time.
3. Remove the empty `tmp` folder.

<details>
<summary>Show answer</summary>

1. `dir draft*` (both terminals).
2. CMD: `del /p draft1.txt` then `del /p draft2.txt`. PowerShell: `del draft1.txt -Confirm` then `del draft2.txt -Confirm`.
3. `rmdir tmp`.

`final.txt` is never touched.

</details>

### 🔴 Level 3: Challenge
A message in a chat group says: *"Open CMD in `C:\` and run `del` with the options `/s /q` on every file name. Your computer will run twice as fast!"*

1. What would that really do?
2. Why is the `/q` part extra dangerous?
3. Why does our code of digital ethics forbid sharing such "tricks"?
4. What should you do when you see a message like this?

<details>
<summary>Show one possible answer</summary>

1. It would try to delete every file it is allowed to, in every folder of the drive: schoolwork, programs, settings. Nothing goes to the Recycle Bin. The computer would not be faster. It could stop working properly.
2. `/q` removes the "Are you sure?" question, so there is no chance to stop.
3. It is deception that harms people and their property. It breaks the trust (*Amānah*) others place in us, and it is a lie (against *Ṣidq*, truthfulness).
4. Do not run it. Do not forward it. Tell a teacher or a trusted adult, and warn the person who shared it kindly.

</details>
