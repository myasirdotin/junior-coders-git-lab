# Chapter 4: Moving Between Folders (`cd` Mastery)

## 🌟 Real-Life Story

Think of a big school building. To reach the science lab, you walk through the main door, then down a corridor, then into Room 12. To leave, you walk back out the same way, one door at a time. If you get lost, you can always go back to the main entrance. Moving between folders in the terminal works exactly like this.

> **Key Idea**: In File Explorer you double-click a folder to go in, and press the "Up" arrow to go out. In the terminal you use `cd`, which means **c**hange **d**irectory.

## 🎯 What You Will Learn

- Step into a folder with `cd` and step out with `cd ..`.
- Jump several levels up or down in one command.
- Go straight to the top of a drive, or to your home folder.
- Switch to another drive, such as a USB flash drive.
- Read the error message when a folder name is wrong.

## 🚪 Stepping In: `cd folder-name`

To go into a folder inside your current folder, type `cd`, a space and the folder name. The command prints nothing. Instead, **the prompt changes** to show your new place.

**CMD**:

```text
C:\Users\Amina>cd Documents

C:\Users\Amina\Documents>
```

**PowerShell**:

```text
PS C:\Users\Amina> cd Documents
PS C:\Users\Amina\Documents>
```

You can walk through several folders at once. Put a `\` between the names:

```text
C:\Users\Amina>cd Documents\school\science

C:\Users\Amina\Documents\school\science>
```

This works the same in PowerShell. PowerShell also accepts forward slashes: `cd Documents/school/science`.

## 🔙 Stepping Out: `cd ..`

Remember from Chapter 3: `..` means *"the parent folder, one level up"*. So `cd ..` is the terminal's **Back** button. It is the most used move in the whole terminal.

**CMD**:

```text
C:\Users\Amina\Documents\school\science>cd ..

C:\Users\Amina\Documents\school>
```

**PowerShell**:

```text
PS C:\Users\Amina\Documents\school\science> cd ..
PS C:\Users\Amina\Documents\school>
```

### Going up two levels

Join two `..` with a slash:

```text
C:\Users\Amina\Documents\school\science>cd ..\..

C:\Users\Amina\Documents>
```

In PowerShell, both `cd ..\..` and `cd ../..` work.

Here is the path as a ladder. Each `..` climbs one step.

```text
C:\
└── Users
    └── Amina
        └── Documents   ◄── after cd ..\..
            └── school  ◄── after cd ..
                └── science  ◄── start
```

## 🏠 Jumping to the Top or to Home

Sometimes you want to go straight to a well-known place.

| Goal | CMD | PowerShell |
| :--- | :--- | :--- |
| Top of the drive (the **root**) | `cd \` | `cd \` |
| Your home folder | `cd %USERPROFILE%` | `cd ~` |

The **root** is the very top folder of a drive, such as `C:\`.

**CMD**:

```text
C:\Users\Amina\Documents\school>cd \

C:\>cd %USERPROFILE%

C:\Users\Amina>
```

`%USERPROFILE%` is a saved setting in Windows. It holds the path of your home folder.

**PowerShell**:

```text
PS C:\Users\Amina\Documents\school> cd \
PS C:\> cd ~
PS C:\Users\Amina>
```

## 💾 Switching Drives

Your computer may have more than one drive. A USB flash drive often appears as `D:` or `E:`.

**CMD** has a surprise. Typing `cd E:\my-code` while on `C:` does **not** move you to drive E. The prompt stays on `C:`. To switch drives in CMD, type the drive letter and a colon:

```text
C:\Users\Amina>E:

E:\>cd my-code

E:\my-code>
```

Or use the `/d` option, which changes the **d**rive and folder together:

```text
C:\Users\Amina>cd /d E:\my-code

E:\my-code>
```

**PowerShell** is simpler. `cd` changes the drive and the folder at the same time:

```text
PS C:\Users\Amina> cd E:\my-code
PS E:\my-code>
```

> [!NOTE]
> **Git Bash / macOS**: use forward slashes, as in `cd Documents/school` and `cd ../..`. `cd ~` (or just `cd`) goes home. `cd /` goes to the very top. In Git Bash, drive E is `/e/`, so you type `cd /e/my-code`. A Mac has no drive letters; a USB drive appears under `/Volumes/`.

## 📋 Summary Table

| Goal | CMD | PowerShell | Git Bash / macOS |
| :--- | :--- | :--- | :--- |
| Enter a folder | `cd name` | `cd name` | `cd name` |
| Up one level | `cd ..` | `cd ..` | `cd ..` |
| Up two levels | `cd ..\..` | `cd ..\..` | `cd ../..` |
| Top of the drive | `cd \` | `cd \` | `cd /` |
| Home folder | `cd %USERPROFILE%` | `cd ~` | `cd ~` |
| Go to drive E | `E:` or `cd /d E:\` | `cd E:\` | `cd /e/` |

## ⚠️ Common Mistake

**A small spelling mistake in the folder name.**

**CMD**:

```text
C:\Users\Amina>cd Dekstop
The system cannot find the path specified.
```

**PowerShell** prints a red error. The first line says:

```text
cd : Cannot find path 'C:\Users\Amina\Dekstop' because it does not exist.
```

The terminal is not broken. It just cannot find a folder spelled `Dekstop`. Your position did not change. Fix the spelling:

```text
C:\Users\Amina>cd Desktop

C:\Users\Amina\Desktop>
```

**Forgetting the space.** `cd..` happens to work in CMD and PowerShell. But PowerShell rejects `cd..\..` with *"The term 'cd..\..' is not recognized"*. Git Bash rejects even `cd..` with *"command not found"*. Always type the space: `cd ..`.

## ✍️ Try It

Use the practice folder you made in Chapter 3.

1. Open CMD or PowerShell. You start in your home folder.
2. Jump to the root with `cd \`.
3. Walk down with `cd JuniorCoders`, then `cd practice`.
4. Climb back to the root in **one** command.
5. Go home again.

*Hint*: From `C:\JuniorCoders\practice`, you need to climb two levels. Then use the home command from the table.

## 📝 Recap

- `cd name` steps into a folder. The prompt changes to show where you are.
- `cd ..` steps out one level. `cd ..\..` steps out two.
- `cd \` jumps to the top of the drive. `cd ~` (PowerShell) or `cd %USERPROFILE%` (CMD) goes home.
- In CMD, switch drives with `E:` or `cd /d E:\folder`. In PowerShell, `cd E:\folder` is enough.
- A wrong name gives an error but changes nothing. Check the spelling and try again.

## 🏆 Practice

### 🟢 Level 1: Recall
1. What does `cd` stand for?
2. What does `..` mean?
3. How do you jump to the root of the current drive?

<details>
<summary>Show answer</summary>

1. **C**hange **d**irectory.
2. The parent folder, one level up.
3. `cd \` in CMD and PowerShell (`cd /` in Git Bash).

</details>

### 🟡 Level 2: Apply
Your prompt shows `C:\JuniorCoders\practice\lessons\day-01>`.

1. Write the command to move up to `lessons`.
2. Write one command to move up to `C:\JuniorCoders`.
3. Inside `practice` there is also a folder called `assets`. Write one command to go from `day-01` straight into `assets`.

<details>
<summary>Show answer</summary>

1. `cd ..`
2. `cd ..\..\..` (three steps: `lessons`, then `practice`, then `JuniorCoders`).
3. `cd ..\..\assets` (up to `lessons`, up to `practice`, then down into `assets`).

</details>

### 🔴 Level 3: Challenge
Zainab is in CMD at `C:\Users\Zainab>`. She types `cd E:\science-fair` to open her flash drive. She says: *"Nothing happened! It still says `C:\Users\Zainab>`."*

1. Explain what happened.
2. Show her **two** ways to fix it in CMD.
3. What would happen if she typed the same command in PowerShell?

<details>
<summary>Show one possible answer</summary>

1. In CMD, `cd` changes the folder **on drive E** in the background, but it does not switch the window to drive E. She is still on `C:`.
2. Way one: type `E:` and press Enter. She arrives at `E:\science-fair`, because CMD remembered that folder for drive E. Way two: type `cd /d E:\science-fair`.
3. In PowerShell, `cd E:\science-fair` switches the drive and the folder together. The prompt would show `PS E:\science-fair>`.

</details>
