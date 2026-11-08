# Chapter 1: What is the Terminal? Demystifying the Black Window

## Teacher Lesson Plan

### Classroom Planning & Logistics
| Field | Detail | Field | Detail |
| :--- | :--- | :--- | :--- |
| **Grade / Class** | Grades 6–7 | **Period Duration** | 45 minutes |
| **Unit / Topic** | Foundations & Orientation | **Setting** | Computer Lab & Projector |
| **Teacher Name** | ____________________ | **Date / Session** | ____ / ____ / 2026 |

### Learning Objectives (SWBAT)
By the end of this 45-minute lesson, students will be able to:
1. Explain the difference between a GUI and a CLI.
2. Name the three terminals you will meet on a Windows computer.
3. Open Command Prompt and PowerShell, and close them safely.
4. Run your first harmless command and read what the screen prints.

### Required Materials & Setup
- Computer lab with web browsers installed (Chrome, Edge, or Firefox).
- Teacher projector displaying Terminal / Command Prompt (CMD & PowerShell) for live modeling.
- Student notebooks for recording key syntax rules, vocabulary, and reflections.

### 45-Minute Instructional Delivery Plan
| Time | Phase | Teacher Activity | Student Activity |
| :--- | :--- | :--- | :--- |
| **0–8 min** | **Hook & Analogy** | Share the chapter opening analogy: *"Amina wants to borrow a book from the school library. She can walk along the shelves and look at every cover. Or she can go to the desk and say, 'Please give me Science Experiments for Beginners.' ..."* Connect to today's topic. | Discuss in pairs; volunteer real-life parallels and note the learning target. |
| **8–20 min** | **Direct Instruction** | Model core concepts on the screen. Break down syntax line-by-line; explain architectural structure. | Follow along on screens/notebooks; observe syntax rules and active demonstration. |
| **20–26 min** | **Misconceptions & Diagnostics** | Address Common Mistake: *"Typing a sentence instead of a command. A beginner types English words and expects the computer to understand."* Conduct rapid check for understanding. | Identify faulty patterns in sample snippets; explain correct approach verbally. |
| **26–38 min** | **Guided Lab Practice** | Circulate lab while students execute the hands-on task: *"Open both CMD and PowerShell, one after the other. In each one, look at the prompt. Write down the two prompts in your notebook. What is the same? What is different?"* | Code independently or in pairs using Terminal / Command Prompt (CMD & PowerShell); test variations. |
| **38–45 min** | **Plenary & Exit Ticket** | Review key takeaways. Pose exit question: *"What do GUI and CLI stand for?"* Collect summary tickets. | Answer plenary questions; record homework task; submit exit ticket. |

### Differentiated Instruction
- **Support (Struggling Learners):** Provide starter boilerplate or pair with a peer navigator; focus on Level 1 recall and syntax verification.
- **Extension (Fast Finishers):** Assign Level 3 Challenge from the Practice section; encourage adding creative styling or feature extensions.

### Homework & Notebook Task
- Complete Level 2 Apply questions from the chapter Practice section into class notebooks.
- Write a 2-sentence personal explanation of the primary concept taught in this lesson.

### Ethical Stewardship & Digital Values (Amānah & Beneficial Knowledge)
- Emphasize digital trust (*Amānah*): respect school lab hardware, cite code honestly, and apply programming skills toward beneficial knowledge (*'Ilm Nāfi'*).

### Teacher Sign-off & Reflection
- **Teacher Signature:** ___________________________  **HOD / Coordinator Signature:** ___________________________
- **Lesson Reflection / Notes:** _______________________________________________________________________________

---

## Real-Life Story

Amina wants to borrow a book from the school library. She can walk along the shelves and look at every cover. Or she can go to the desk and say, "Please give me *Science Experiments for Beginners*." The librarian brings it straight away. The terminal is like that library desk. You do not click and search. You ask for exactly what you want, in words.

> **Key Idea**: The terminal is not a strange alien screen. It is **File Explorer without the mouse**. It is a direct line to your computer, where you give instructions by typing text instead of clicking.

## What You Will Learn

- Explain the difference between a GUI and a CLI.
- Name the three terminals you will meet on a Windows computer.
- Open Command Prompt and PowerShell, and close them safely.
- Run your first harmless command and read what the screen prints.
- Follow the four safety rules every terminal user keeps.

## GUI vs. CLI: Two Ways to Talk to a Computer

Every day you use a **GUI**. GUI means **Graphical User Interface**. "Graphical" means it uses pictures.

- You move a mouse pointer.
- You double-click yellow folder icons.
- You drag files into the Recycle Bin.
- You right-click to see a menu.

GUIs are friendly. But some jobs need hundreds of clicks. Imagine making 50 folders, one for each student in your class. That is a lot of clicking!

The **CLI** is the other way. CLI means **Command Line Interface**. People also call it the **terminal**, the **console** or the **command prompt**. It uses text only.

- You type a short word called a **command** (for example `mkdir`, short for "make directory").
- You press <kbd>Enter</kbd>.
- The computer does the job in a moment.

| | GUI (Graphical) | CLI (Command Line) |
| :--- | :--- | :--- |
| **You use** | Mouse, icons, windows | Keyboard and text |
| **Speed for repeated jobs** | Slow | Very fast |
| **Needs a screen?** | Yes | Can work on distant computers |
| **Best for** | Browsing, drawing | Git, PHP, servers, tidy work |

## Why Web Developers Learn the Terminal

You may ask: *"I can already click. Why learn typing commands?"* Here are four reasons.

1. **Git**: Saving versions of your website and sharing them on GitHub happens in the terminal.
2. **Local web servers**: To test a PHP website, you start a small server with a command.
3. **Tool installers**: Tools like `npm` and `composer` download helpful code libraries. They are terminal tools.
4. **Cloud servers**: Real websites run on computers far away. They have no mouse and no screen. You manage them by typing commands.

## The Three Terminals on Windows

School labs usually use Windows. A Windows computer has three terminals you will meet.

| Terminal | How to open it | Its prompt looks like |
| :--- | :--- | :--- |
| **Command Prompt (CMD)** | Press <kbd>Win</kbd> + <kbd>R</kbd>, type `cmd`, press <kbd>Enter</kbd> | `C:\Users\Amina>` |
| **PowerShell** | Press <kbd>Win</kbd> + <kbd>R</kbd>, type `powershell`, press <kbd>Enter</kbd> | `PS C:\Users\Amina>` |
| **Git Bash** | Search "Git Bash" in the Start menu (only if Git is installed) | `amina@LAB-PC MINGW64 ~` |

In this book, every command is shown for **CMD** and **PowerShell** side by side. Git Bash and macOS commands appear in a note. On a Mac, the program is called **Terminal**, and it works like Git Bash.

> [!WARNING]
> **Never choose "Run as administrator".** An administrator terminal can change important system files. Everything in this book works in a normal window. If a menu offers "Run as administrator", pick the normal option.

## Your First Command: `ver` and `exit`

Let us open a terminal and ask a harmless question. The command `ver` asks, "Which Windows version is this?" It changes nothing.

**CMD** (type `ver`, then press <kbd>Enter</kbd>):

```text
C:\Users\Amina>ver

Microsoft Windows [Version 10.0.26200.9550]

C:\Users\Amina>
```

The number on your computer may be different. That is fine.

**PowerShell** does not know `ver`. It has its own way to ask:

```text
PS C:\Users\Amina> $PSVersionTable.PSVersion

Major  Minor  Build  Revision
-----  -----  -----  --------
5      1      26100  9549
```

Again, your numbers may be different. Notice that after each command, the prompt comes back. The prompt coming back means: *"Done. I am ready for the next instruction."*

To close either window, type `exit` and press <kbd>Enter</kbd>. The window closes. Nothing is printed.

> [!NOTE]
> **Git Bash / macOS**: there is no `ver` command. Type `uname` to see the system name. Git Bash prints something like `MINGW64_NT-10.0-26200`. A Mac prints `Darwin`. Type `exit` to close.

## Safety and Trust (*Amānah*)

> [!CAUTION]
> **No safety net.** When you delete a file from the terminal, it does **not** go to the Recycle Bin. It is gone.

As developers we keep **Amānah**, which means trust and care. Your computer and your files are a trust. Here are four rules.

1. **Read before you press Enter.** Check every letter you typed.
2. **Never paste commands you do not understand.** Some websites share harmful commands.
3. **Never run the terminal as Administrator.** You do not need it.
4. **Practise only in your own practice folder.** In this book that is `C:\JuniorCoders\practice`. You will make it soon.

## Common Mistake

**Typing a sentence instead of a command.** A beginner types English words and expects the computer to understand.

```text
C:\Users\Amina>show my windows version
'show' is not recognized as an internal or external command,
operable program or batch file.
```

The terminal only knows exact command words. Nothing was harmed. It just did not understand. The fixed version is the real command:

```text
C:\Users\Amina>ver

Microsoft Windows [Version 10.0.26200.9550]
```

## Try It

Open **both** CMD and PowerShell, one after the other. In each one, look at the prompt. Write down the two prompts in your notebook. What is the same? What is different?

*Hint*: Look at the very start of each prompt line. One terminal adds two extra letters.

## Recap

- A **GUI** uses pictures and a mouse. A **CLI** uses typed commands.
- Developers use the terminal for Git, servers, tool installers and cloud computers.
- Windows has three terminals: CMD, PowerShell and Git Bash.
- A command does its job, prints a result, and then the prompt comes back.
- Terminal deletions skip the Recycle Bin. Never run as Administrator. Practise in your own folder.

## Practice

### Level 1: Recall
1. What do **GUI** and **CLI** stand for?
2. Give two reasons why web developers use the command line.
3. What happens to a file you delete from the terminal?

<details>
<summary>Show answer</summary>

1. GUI = **Graphical User Interface**. CLI = **Command Line Interface**.
2. Any two: Git, local web servers, tool installers (`npm`, `composer`), managing cloud servers.
3. It is deleted straight away. It does **not** go to the Recycle Bin, so you cannot restore it from there.

</details>

### Level 2: Apply
1. Press <kbd>Win</kbd> + <kbd>R</kbd>, type `cmd`, and press <kbd>Enter</kbd>.
2. Type `ver` and press <kbd>Enter</kbd>. What does the answer say?
3. Type `exit` and press <kbd>Enter</kbd>. What happens?

<details>
<summary>Show answer</summary>

1. A Command Prompt window opens, showing a prompt like `C:\Users\Amina>`.
2. A line like `Microsoft Windows [Version 10.0.26200.9550]`. Your numbers may differ.
3. The window closes. `exit` does not print anything.

</details>

### Level 3: Challenge
Your teammate needs to set up a project. Compare two ways of explaining it:

1. *"Click the third button on the top right, then drag the blue box to the folder at the bottom."*
2. *"Type `mkdir images` and press Enter."*

Which instruction is less likely to go wrong? Give two reasons. How does this connect to *Iḥsān* (doing work with care and excellence)?

<details>
<summary>Show one possible answer</summary>

The typed command is less likely to go wrong.

- It is **exact**: every letter is written down. "Third button" can mean different buttons on different screens.
- It can be **copied, checked and repeated** the same way every time, even on another computer.
- It does not depend on window size, colours or where icons sit.

*Iḥsān* means doing work carefully and well. Clear, exact instructions respect your teammate's time and avoid mistakes.

</details>
