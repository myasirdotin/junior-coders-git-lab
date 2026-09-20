# Chapter 10: Launching VS Code & Verifying Developer Tools

> **Key Idea**: The terminal is the central launchpad of your entire developer workspace. With one simple command, you can launch VS Code directly inside your project folder, and inspect every compiler, interpreter, and version control tool installed on your machine.

---

## 1. The Magic Command: `code .`

When opening a project in Visual Studio Code, most beginners open the editor, click `File` ➔ `Open Folder`, and hunt through endless nested menus.

Professional developers do it in 2 seconds from the terminal:
1. Navigate to your project directory:
   ```text
   cd C:\xampp\htdocs\my-portfolio
   ```
2. Type:
   ```text
   code .
   ```
3. Press <kbd>Enter</kbd>.

VS Code immediately launches with `my-portfolio` opened as the workspace root in the Explorer sidebar!

> [!NOTE]
> Remember the lesson on relative paths: `.` means **"the current directory"**. So `code .` literally means: *"Visual Studio Code, please open the folder where I am currently standing!"*

---

## 2. Checking Installed Developer Tool Versions

Before you start writing PHP, JavaScript, or Git commits, you should confirm that your system has the proper tools installed in your system `PATH`:

| Tool | Version Check Command | Expected Output |
| :--- | :--- | :--- |
| **Git** | `git --version` | `git version 2.40.0.windows.1` |
| **Node.js** | `node -v` | `v20.11.0` |
| **npm** | `npm -v` | `10.2.4` |
| **PHP** | `php -v` | `PHP 8.2.12 (cli) ...` |
| **Composer** | `composer --version` | `Composer version 2.6.5 ...` |
| **Python** | `python --version` | `Python 3.11.4` |

---

## 3. What Does "Command Not Recognized" Mean?

If you type `php -v` or `git --version` and see this error:
```text
'php' is not recognized as an internal or external command,
operable program or batch file.
```

Don't panic! This means:
1. The software is either **not yet installed** on your computer, OR
2. The folder where the program lives (e.g., `C:\xampp\php`) has not been added to your Windows **System PATH Environment Variable**.

### Where is a program located?
You can ask Windows CMD where an executable program is stored on disk using **`where`**:
```text
where git
```
*Output: `C:\Program Files\Git\cmd\git.exe`*

In Git Bash / Linux, the equivalent command is **`which`**:
```bash
which git
```

---

## 4. Review & Practice

### 🟢 Level 1: Recall
1. What command launches VS Code with the current directory loaded as the project workspace?
2. What flag is commonly passed to check a software's installed version?
3. Which command in Windows CMD locates where an executable file is installed on your hard drive?

### 🟡 Level 2: Developer Diagnostics Drill
Open your terminal and run version checks for the tools installed on your computer:
1. `git --version`
2. `node -v`
3. `php -v`
Record which tools are available and which ones report "not recognized".

### 🔴 Level 3: Troubleshooting Scenario
A student installed XAMPP, but when they type `php -v` in Command Prompt, it says `command not recognized`. However, if they navigate to `cd C:\xampp\php` and type `php -v`, it works!
Explain why it works inside `C:\xampp\php` but fails everywhere else.
