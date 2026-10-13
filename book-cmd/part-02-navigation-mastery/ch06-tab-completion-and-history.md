# Chapter 6: The Developer Superpowers: Tab Completion & History

## 🌟 Real-Life Story

Hafsa is writing a report in the school library. When she starts typing a long word on her tablet, the keyboard guesses it, and she taps the guess. When she needs a sentence she wrote earlier, she scrolls back instead of writing it again. The terminal has both of these helpers. They save time, and they stop spelling mistakes before they happen.

> **Key Idea**: Good terminal users rarely type long names in full. They press <kbd>Tab</kbd> to finish names, and the arrow keys to bring back earlier commands.

## 🎯 What You Will Learn

- Finish file and folder names with <kbd>Tab</kbd> in CMD, PowerShell and Git Bash.
- Use <kbd>Tab</kbd> as a quick check that a name really exists.
- Bring back earlier commands with the <kbd>↑</kbd> and <kbd>↓</kbd> arrow keys.
- Show your command history as a list.
- Use the most helpful keyboard shortcuts, including the <kbd>Ctrl</kbd> + <kbd>C</kbd> "stop" key.

## ⌨️ Superpower 1: Tab Completion

**Tab completion** means the terminal finishes a name for you. You type the first few letters, then press the <kbd>Tab</kbd> key.

Suppose your practice folder holds a folder called `science-fair-2026-project`. That is 25 letters. Here is the quick way.

**CMD**: type `cd sci`, then press <kbd>Tab</kbd>.

```text
C:\JuniorCoders\practice>cd sci          ← what you type
C:\JuniorCoders\practice>cd science-fair-2026-project   ← after Tab
```

**PowerShell**: type `cd sci`, then press <kbd>Tab</kbd>.

```text
PS C:\JuniorCoders\practice> cd sci       ← what you type
PS C:\JuniorCoders\practice> cd .\science-fair-2026-project\   ← after Tab
```

PowerShell adds `.\` at the start ("in this folder") and `\` at the end ("it is a folder"). Both are correct. Press <kbd>Enter</kbd> to run the command.

If the name has a space, Tab adds the quotes for you: `cd "my notes"`.

### When several names match

Suppose you have `day-01`, `day-02` and `day-03`.

- **CMD and PowerShell**: press <kbd>Tab</kbd> again and again. Each press shows the next match. <kbd>Shift</kbd> + <kbd>Tab</kbd> goes back.
- **PowerShell extra**: press <kbd>Ctrl</kbd> + <kbd>Space</kbd> to see **all** matches in a small menu. Pick one with the arrow keys.

> [!NOTE]
> **Git Bash / macOS**: one <kbd>Tab</kbd> finishes the name when there is only one match. If there are several, press <kbd>Tab</kbd> **twice** to list them all. Then type one more letter and press <kbd>Tab</kbd> again.

> [!TIP]
> **Tab is a spelling check.** If you press <kbd>Tab</kbd> and nothing changes, no file or folder starts with those letters **here**. Check your spelling, or check where you are standing.

## 🕰️ Superpower 2: Command History

The terminal remembers the commands you ran in this window. This list is called the **history**.

| Key or command | CMD | PowerShell | Git Bash / macOS |
| :--- | :--- | :--- | :--- |
| Previous command | <kbd>↑</kbd> | <kbd>↑</kbd> | <kbd>↑</kbd> |
| Next command | <kbd>↓</kbd> | <kbd>↓</kbd> | <kbd>↓</kbd> |
| Pop-up list | <kbd>F7</kbd> | (none) | (none) |
| Print the list | `doskey /history` | `history` | `history` |
| Search the history | (none) | <kbd>Ctrl</kbd> + <kbd>R</kbd> | <kbd>Ctrl</kbd> + <kbd>R</kbd> |

Pressing <kbd>↑</kbd> puts the last command back on the line. It does **not** run it yet. You can change it first, then press <kbd>Enter</kbd>.

### Printing the history

Amina ran three commands: `cd C:\JuniorCoders\practice`, `dir` and `cls`. Now she prints her history.

**CMD**:

```text
C:\JuniorCoders\practice>doskey /history
cd C:\JuniorCoders\practice
dir
cls
doskey /history
```

**PowerShell**:

```text
PS C:\JuniorCoders\practice> history

  Id CommandLine
  -- -----------
   1 cd C:\JuniorCoders\practice
   2 dir
   3 cls
```

Each window keeps its own history. In CMD, closing the window forgets it. PowerShell keeps a copy, so <kbd>↑</kbd> can bring back commands even after you reopen it.

### Why this matters

In Chapter 11 you will start a small web server with a long command. You will stop it, change your page, and start it again many times. Instead of retyping, you will press <kbd>↑</kbd> and <kbd>Enter</kbd>. Two key presses!

## ⚡ Helpful Keyboard Shortcuts

| Shortcut | What it does | Works in |
| :--- | :--- | :--- |
| <kbd>Ctrl</kbd> + <kbd>C</kbd> | **Stop.** Cancels the line you are typing, or stops a running command | CMD, PowerShell, Git Bash |
| <kbd>Esc</kbd> | Wipes the line you are typing, without running it | CMD, PowerShell |
| <kbd>Home</kbd> / <kbd>End</kbd> | Jumps to the start / end of the line | CMD, PowerShell, Git Bash |
| <kbd>Ctrl</kbd> + <kbd>A</kbd> / <kbd>Ctrl</kbd> + <kbd>E</kbd> | Jumps to the start / end of the line | Git Bash, macOS |
| <kbd>Ctrl</kbd> + <kbd>L</kbd> | Clears the screen | PowerShell, Git Bash |

When you press <kbd>Ctrl</kbd> + <kbd>C</kbd> on a half-typed line in CMD, you see `^C` and a fresh prompt. Nothing was run.

```text
C:\JuniorCoders\practice>dir /w scie^C
C:\JuniorCoders\practice>
```

## ⚠️ Common Mistake

**Pressing Tab in the wrong folder.** Bilal is in his home folder. He types `cd sci` and presses <kbd>Tab</kbd>. Nothing happens. He thinks Tab is broken.

```text
C:\Users\Bilal>cd sci
```

Tab only looks in the **current** folder, or in the folder your path points to. The folder is in `C:\JuniorCoders\practice`. The fix is to go there first, or type the path and then press Tab:

```text
C:\Users\Bilal>cd C:\JuniorCoders\practice\sci          ← then press Tab
C:\Users\Bilal>cd C:\JuniorCoders\practice\science-fair-2026-project
```

**Pressing Enter too fast after ↑.** The arrow brings back an old command, and a quick <kbd>Enter</kbd> runs it again. Always read the line before you press Enter, especially if it changes files.

## ✍️ Try It

1. In File Explorer, make a folder called `science-fair-2026-project` inside `C:\JuniorCoders\practice`.
2. In the terminal, go to `C:\JuniorCoders\practice`.
3. Type `cd sci` and press <kbd>Tab</kbd>, then <kbd>Enter</kbd>.
4. Run `cd ..`, then `dir`, then `cls`.
5. Press <kbd>↑</kbd> three times. Watch the commands come back in reverse order.
6. Print your history (`doskey /history` in CMD, `history` in PowerShell).

*Hint*: If Tab does not finish the name, check your spelling and your current folder.

## 📝 Recap

- <kbd>Tab</kbd> finishes file and folder names. Press it again to see other matches.
- If Tab does nothing, the name does not exist where you are looking.
- <kbd>↑</kbd> and <kbd>↓</kbd> bring back earlier commands. Read them before you press Enter.
- `doskey /history` (CMD) and `history` (PowerShell, Git Bash) print your history.
- <kbd>Ctrl</kbd> + <kbd>C</kbd> is the stop key. <kbd>Esc</kbd> wipes the line in CMD and PowerShell.

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which key finishes a half-typed file or folder name?
2. How do you bring back the last command without typing it again?
3. Which key combination stops a running command?

<details>
<summary>Show answer</summary>

1. <kbd>Tab</kbd>.
2. Press the <kbd>↑</kbd> (Up arrow) key.
3. <kbd>Ctrl</kbd> + <kbd>C</kbd>.

</details>

### 🟡 Level 2: Apply
A folder contains `report-maths.txt`, `report-science.txt` and `reading-list.txt`.

1. You type `dir rep` in CMD and press <kbd>Tab</kbd>. Which name appears first?
2. What do you press to see the next match?
3. What is the shortest start you could type so that one <kbd>Tab</kbd> finishes `reading-list.txt` straight away?

<details>
<summary>Show answer</summary>

1. `report-maths.txt` (matches come in alphabetical order).
2. <kbd>Tab</kbd> again (or <kbd>Shift</kbd> + <kbd>Tab</kbd> to go back).
3. `rea`. Both `rep...` and `rea...` start with `re`, so you need the third letter.

</details>

### 🔴 Level 3: Challenge
Web servers often run on Linux, where `Report.txt` and `report.txt` are two **different** files. Capital letters matter there.

1. How does Tab completion help you avoid mistakes with capital letters?
2. How does it help with long paths like `C:\JuniorCoders\practice\science-fair-2026-project\results`?
3. Write a short rule for your class about using Tab.

<details>
<summary>Show one possible answer</summary>

1. Tab copies the real name exactly, with the right capitals. You cannot misspell it.
2. You type only a few letters of each folder and press Tab each time. Every part is checked as you go. If one part is wrong, Tab stops working right there, so you find the mistake early.
3. *"Type three letters, press Tab. If Tab does nothing, stop and check: is the name right, and am I in the right folder?"*

</details>
