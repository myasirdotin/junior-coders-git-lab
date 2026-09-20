# Chapter 4: Moving Between Folders (`cd` Mastery)

> **Key Idea**: Just as you double-click a folder to enter it and click the "Up/Back" arrow in File Explorer to exit, you use the `cd` (**Change Directory**) command to walk through your computer's folder tree.

---

## 1. Stepping In: Entering Subdirectories

To step inside a folder located within your current directory, type `cd` followed by the folder's name:

```text
C:\Users\Student> cd Desktop
C:\Users\Student\Desktop> cd projects
C:\Users\Student\Desktop\projects>
```

You can even leap across multiple nested folders in a single bound:
```text
cd Desktop\projects\my-app
```
*(In Git Bash / Unix, remember to use forward slashes: `cd Desktop/projects/my-app`)*.

---

## 2. The Back Button: Stepping Out (`cd ..`)

This is the single most important navigation pattern in all of computer science:

```text
cd ..
```

* `..` means **"the parent directory"** (one level up).

### Stepping Up Multiple Levels:
Want to step up two levels at once? Chain them together:
* In Windows CMD: `cd ..\..`
* In Git Bash / Linux: `cd ../..`

```text
C:\xampp\htdocs\school-portal\css> cd ..\..
C:\xampp\htdocs>
```

---

## 3. Jumping Directly to the Root (`cd \` or `cd /`)

If you want to instantly leap to the very base of your active drive:
* In Windows CMD: `cd \`
  ```text
  C:\Users\Student\Desktop\projects> cd \
  C:\>
  ```
* In Git Bash: `cd /` (takes you to the Unix root directory).

---

## 4. Switching Drive Letters in Windows

If your PC has a second drive (such as `D:` or `E:` for a flash drive), typing `cd D:\projects` inside Windows CMD will not immediately jump to drive D. 

In Windows CMD, you must switch drives by typing the **drive letter followed by a colon**:
```text
C:\Users\Student> D:
D:\>
```
Once on Drive D, you can navigate freely.

> [!TIP]
> Alternatively, you can tell Windows CMD to change the drive and directory simultaneously using the `/d` switch:
> ```text
> C:\Users\Yasir> cd /d D:\xampp\htdocs
> D:\xampp\htdocs>
> ```

---

## 5. Summary Reference Table

| Navigation Goal | Windows CMD | Git Bash / Linux |
| :--- | :--- | :--- |
| **Enter subfolder** | `cd folder_name` | `cd folder_name` |
| **Step out one level (Up)** | `cd ..` | `cd ..` |
| **Step out two levels** | `cd ..\..` | `cd ../..` |
| **Jump to drive root** | `cd \` | `cd /` |
| **Jump to user home folder** | `cd %USERPROFILE%` | `cd ~` |
| **Switch to Drive D** | `D:` *(or `cd /d D:\...`)* | `cd /d/` |

---

## 6. Review & Practice

### 🟢 Level 1: Recall
1. What does the two-letter command `cd` stand for?
2. What does the special shorthand `..` represent?
3. How do you jump straight to the root of drive `C:` in Windows CMD?

### 🟡 Level 2: Maze Navigation Exercise
Imagine your terminal is currently at:
`C:\xampp\htdocs\junior-coders\lessons\day-01`
1. Write the exact command to move up to `lessons`.
2. From `day-01`, write the command to move up to `htdocs` in a single command.
3. If you have an `assets` folder inside `junior-coders`, write the relative command to move from `day-01` directly to `assets`.

### 🔴 Level 3: Real-World Scenario
A classmate is on Drive `C:` and wants to access their flash drive on `E:`. They typed `cd E:\my-code` and complained: *"The terminal didn't do anything! It still says `C:\Users\Student>`!"*
Explain to your classmate what happened and show them two different ways to solve it.
