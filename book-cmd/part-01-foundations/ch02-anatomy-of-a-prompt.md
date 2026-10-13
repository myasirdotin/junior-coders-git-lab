# Chapter 2: The Anatomy of a Prompt & Command Grammar

## 🌟 Real-Life Story

Bilal arrives at a big science fair. At the entrance there is a map with a red dot: **"You are here."** Without that dot, the map is not much help. The terminal prompt is that red dot. It tells you where you are standing before you take a step. And when you ask a helper for something, you speak in a clear order: what to do, how to do it, and to what. Commands follow the same order.

> **Key Idea**: Every prompt tells you **who you are** and **where you are standing**. Every command follows a simple sentence pattern: `command + options + target`.

## 🎯 What You Will Learn

- Read each part of a CMD, PowerShell and Git Bash prompt.
- Split any command into its command word, options and target.
- Spot the different option styles: `/w`, `-Name` and `-l`.
- Use quotation marks for names that contain spaces.

## 🔎 Reading the Prompt

When you open a terminal, you see a line of text and a blinking cursor. That line is the **prompt**.

### In Command Prompt (CMD)

```text
C:\Users\Amina>_
```

Let us break it into pieces.

- **`C:`** is the **drive letter**. A drive is a storage space, like a hard disk. Most computers call the main one `C:`.
- **`\`** is the **path separator**. It goes between folder names. Windows uses the backslash `\`.
- **`Users\Amina`** is the **current folder**. You are inside `Amina`, which is inside `Users`.
- **`>`** means *"I am ready for your instruction."*
- **`_`** is the blinking **cursor**. Your typing appears here.

### In PowerShell

```text
PS C:\Users\Amina> _
```

It is almost the same. The letters **`PS`** at the start tell you this is PowerShell. That is helpful, because some commands work differently in each terminal.

> [!NOTE]
> **Git Bash / macOS** prompts look different:
> ```text
> amina@LAB-PC MINGW64 ~
> $ _
> ```
> `amina` is the user name and `LAB-PC` is the computer name. `~` (the **tilde**) is short for your **home folder**, such as `C:\Users\Amina`. The `$` sign means *"ready"*. Git Bash and macOS use forward slashes `/` between folders.

## 🧩 Command Grammar: Command, Options, Target

Every instruction follows the same three-part pattern.

```text
COMMAND     OPTIONS       TARGET
(verb)      (how)         (what)
```

- The **command** is the action word. Example: `dir` means "list a folder".
- An **option** changes *how* the command works. Options are also called **flags** or **switches**.
- The **target** is *what* to act on, often a folder or file name. It is also called an **argument**.

Options and targets are often optional. `dir` alone works too.

### Example in CMD

Amina has a folder called `school-notes`. She asks CMD to list it in a **w**ide layout.

```text
C:\Users\Amina>dir /w school-notes
 Volume in drive C has no label.
 Volume Serial Number is 1A2B-3C4D

 Directory of C:\Users\Amina\school-notes

[.]                [..]               [history]          [maths]
[science]          science-fair.txt   timetable.txt
               2 File(s)              0 bytes
               5 Dir(s)  317,988,884,480 bytes free
```

- Command: `dir`
- Option: `/w` (wide list)
- Target: `school-notes`

Names in square brackets, like `[maths]`, are folders. The rest are files. Your serial number and free space will be different.

### The same idea in PowerShell

PowerShell options start with a hyphen and use a whole word. The option `-Name` asks for names only.

```text
PS C:\Users\Amina> dir -Name school-notes
history
maths
science
science-fair.txt
timetable.txt
```

- Command: `dir`
- Option: `-Name`
- Target: `school-notes`

CMD has the same "names only" idea. It uses the option `/b` (for **b**are).

```text
C:\Users\Amina>dir /b school-notes
history
maths
science
science-fair.txt
timetable.txt
```

## 🔀 Option Styles Compared

Each terminal writes options in its own style.

| Terminal | Option style | Example | Meaning |
| :--- | :--- | :--- | :--- |
| **CMD** | slash `/` | `dir /w` | wide list |
| **PowerShell** | hyphen + word `-Word` | `dir -Name` | names only |
| **Git Bash / macOS** | hyphen + letter `-l` | `ls -l` | long, detailed list |
| **Many modern tools** | two hyphens `--word` | `git --version` | show the version |

> [!TIP]
> PowerShell does not care about capital letters in commands and options. `dir -name` works the same as `dir -Name`.

## 🗂️ Quotation Marks for Spaces

The terminal reads a **space** as a gap *between* parts. So a name with spaces confuses it.

**CMD** quietly makes the wrong thing:

```text
C:\JuniorCoders\practice>mkdir my new project

C:\JuniorCoders\practice>dir /b
my
new
project
```

CMD made **three** folders: `my`, `new` and `project`!

**PowerShell** stops with a red error:

```text
PS C:\JuniorCoders\practice> mkdir my new project
mkdir : A positional parameter cannot be found that accepts argument 'new'.
```

The fix is the same in both. Put **double quotes** around the whole name:

```text
mkdir "my new project"
cd "C:\Program Files"
```

> [!IMPORTANT]
> **Best habit**: avoid spaces in names. Use hyphens (`my-new-project`) or underscores (`my_new_project`). Then you never need quotes.

## ⚠️ Common Mistake

**Forgetting the space after the command word.**

```text
C:\Users\Amina>dir/wschool-notes
Parameter format not correct - "wschool-notes".
```

Without spaces, the terminal cannot tell where the command ends and the target begins. Put one space between each part:

```text
C:\Users\Amina>dir /w school-notes
```

**Mixing option styles.** Typing `dir -w` in CMD prints `File Not Found`, because CMD looks for a file called `-w`. In CMD, use `/w`. In PowerShell, use `-Name`.

## ✍️ Try It

Open CMD. Type `dir /w` and press <kbd>Enter</kbd>. Then type `dir /b` and press <kbd>Enter</kbd>. Compare the two lists. Which one is easier to read? Which one fits more names on the screen?

*Hint*: Both commands list the **current** folder, because you gave no target. They only change *how* the list looks.

## 📝 Recap

- The prompt shows where you are standing, like a "You are here" dot on a map.
- PowerShell prompts start with `PS`. Git Bash prompts end with `$`.
- Commands follow the pattern **command + options + target**.
- CMD options use `/`, PowerShell options use `-Word`, Git Bash options use `-letter`.
- Put names with spaces in double quotes, or better, use hyphens instead of spaces.

## 🏆 Practice

### 🟢 Level 1: Recall
1. Name the three parts of a command.
2. What does `~` (tilde) mean in a Git Bash prompt?
3. Why must names with spaces be wrapped in quotes?

<details>
<summary>Show answer</summary>

1. The **command** (the action), the **options** (how to do it) and the **target** (what to act on).
2. Your **home folder**, for example `C:\Users\Amina`.
3. The terminal treats a space as a gap between parts. Without quotes, one name with spaces becomes several separate names.

</details>

### 🟡 Level 2: Apply
Split each command into its command, options and target.

1. `dir /s /b C:\JuniorCoders`
2. `dir -Name C:\JuniorCoders`
3. `mkdir "School Science Club"`

<details>
<summary>Show answer</summary>

1. Command `dir`; options `/s` and `/b`; target `C:\JuniorCoders`.
2. Command `dir`; option `-Name`; target `C:\JuniorCoders`.
3. Command `mkdir`; no options; target `"School Science Club"` (one name, kept together by the quotes).

</details>

### 🔴 Level 3: Challenge
A club wants a folder for its website. Two names are suggested: `Junior Coders Club` and `junior-coders-club`.

1. Write the `mkdir` command for each name so that it makes **one** folder.
2. Which name is better for a website? Give two reasons.

<details>
<summary>Show one possible answer</summary>

1. `mkdir "Junior Coders Club"` (quotes needed) and `mkdir junior-coders-club` (no quotes needed).
2. `junior-coders-club` is better:
   - In a web address a space turns into `%20`, so the link becomes `Junior%20Coders%20Club`. That is hard to read and type.
   - You never need quotes, so commands are shorter and safer.
   - Using all lowercase avoids mix-ups, because many web servers treat `Club` and `club` as different names.

</details>
