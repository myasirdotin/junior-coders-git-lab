# Chapter 2: Your First PHP Script 🚀📝

---

## 1. 🌟 Real-Life Situation: The PA System Announcement

Think about your school's Public Address (PA) system. When the principal wants to make an announcement:
1. They press the **Mic Switch ON** (`<?php`).
2. They speak clearly into the microphone: *"Good morning, students! Assembly begins in 10 minutes."* (`echo "Good morning...";`).
3. They end their sentence with a clear pause (`;`).
4. They flip the **Mic Switch OFF** (`?>`).

The speakers throughout the hallways broadcast the voice to every classroom. In PHP:
- `<?php` turns on the PHP microphone.
- `echo` broadcasts words, numbers, and HTML markup to the web page.
- Semicolons (`;`) tell the engine that a command is complete.
- `?>` turns off the PHP microphone.

---

## 2. 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- Correctly open and close PHP blocks using `<?php` and `?>`.
- Output text, numbers, and HTML tags using the `echo` command.
- Master PHP statement termination using semicolons (`;`).
- Write clean single-line and multi-line comments.
- Understand PHP case-sensitivity rules for keywords vs variables.

---

## 3. 👁️ Visual Concept Explanation

### Anatomy of a Basic PHP Statement

```text
  PHP Tag      Command       Output String (Delimited by Quotes)     Semicolon
   ┌─────┐      ┌────┐     ┌─────────────────────────────────────┐      ┌─┐
   │<?php│      │echo│     │ "Welcome to Junior Coders Academy!" │      │;│
   └─────┘      └────┘     └─────────────────────────────────────┘      └─┘
      │           │                          │                           │
  Starts PHP   Built-in                   Message to                 Ends the
  Execution    Output                     Send to Browser            Instruction
```

### Case Sensitivity in PHP: What Matters?

```text
+------------------------------+------------------------------+
|     CASE-INSENSITIVE         |        CASE-SENSITIVE        |
|  (PHP DOES NOT care)         |     (PHP CARES DEEPLY!)      |
+------------------------------+------------------------------+
| • Keywords: echo, ECHO, Echo | • Variables: $name vs $Name  |
| • Control: if, ELSE, while   | • Constants: SITE_URL        |
| • Functions: date(), DATE()  | • Array keys: $user['id']    |
| • Classes: Student vs student|                              |
+------------------------------+------------------------------+
```

---

## 4. 💻 Code Example: Writing and Documenting PHP

Create a file named `hello.php` in your XAMPP `htdocs/` folder:

```php
<?php
  // ============================================
  // Project: First PHP Script
  // Lead Developer: Yasir Rasool (Class 9 CS)
  // ============================================

  // 1. Output plain strings
  echo "Hello, World!";
  echo "<br>";

  // 2. Output HTML elements directly
  echo "<h2>Backend Web Development is Fun!</h2>";
  echo "<p style='color: #7c3aed;'>Styled directly from PHP echo!</p>";

  // 3. Output numeric expressions
  echo "Current Year: ";
  echo 2026;
  echo "<br>";
  echo "Calculation (15 * 4): ";
  echo 15 * 4;

  /*
    Multi-line comment:
    Notice how each statement ends with a semicolon.
    If you forget a semicolon, PHP throws a Parse Error!
  */
?>
```

---

## 5. 🔍 Code Explanation: Breaking It Down Line by Line

- `//`: Starts a **single-line comment**. The server skips these completely.
- `#`: Another syntax for single-line comments (derived from Unix shell scripts).
- `/* ... */`: Encloses a **multi-line comment** block for detailed documentation.
- `echo`: The primary language construct used to print strings and values to the browser output.
- `"<br>"`: Generates an HTML line break so the browser moves the next output to a fresh line.
- `echo 15 * 4;`: Evaluates the arithmetic expression (`60`) on the server and outputs the result.
- `;`: Every individual PHP statement MUST conclude with a semicolon.

---

## 6. 🌍 Real-World Connection: Comments in Large Teams

At software companies like Automattic (makers of WordPress), hundreds of software engineers work on the same PHP codebase simultaneously.
- Without comments explaining **why** a certain algorithm was written, other developers would spend days trying to decipher the code.
- Professional developers write code for **humans first** and computers second!

---

## 7. ⚠️ Common Beginner Traps

1. **The Missing Semicolon**:
   ```php
   echo "Hello World"  // ❌ Fatal Parse Error: syntax error, unexpected token
   echo "Next Line";
   ```
   *Fix*: Always conclude statements with `;`.
2. **Unescaped Quotes**:
   ```php
   echo "<h1 class="title">Hello</h1>"; // ❌ Syntax error!
   ```
   *Fix*: Use single quotes inside double quotes (`"<h1 class='title'>Hello</h1>"`) or escape them with backslashes (`"<h1 class="title">Hello</h1>"`).

---

## 8. 🔮 Predict the Output

Look at this PHP code:

```php
<?php
  echo "Hello ";
  ECHO "Class ";
  Echo "9!";
?>
```

**Question**: Will PHP produce an error because `echo` is written in three different casings?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> No error! It will cleanly output <code>Hello Class 9!</code> because PHP keywords and function names are case-insensitive. However, standard professional practice is to always write <code>echo</code> in all-lowercase.
</details>

---

## 9. 🕵️ Code Detective: The Broken Quotation

```php
<?php
  // Find the bug in this script:
  echo 'It's a fantastic day to code PHP!';
?>
```

- **Find the mistake**: The apostrophe in `It's` prematurely closes the single-quoted string!
- **Explain the mistake**: PHP thinks the string ends at `'It'`, leaving `s a fantastic day to code PHP!';` as illegal, invalid code.
- **Fix**:
  ```php
  // Option A: Use double quotes
  echo "It's a fantastic day to code PHP!";
  // Option B: Escape the single quote with a backslash
  echo 'It's a fantastic day to code PHP!';
  ```

---

## 10. 🏆 5 Levels of Mastery Exercises

### 🟢 Level 1: Recall
1. Which command outputs data to the web page?
2. What symbol ends every standard statement in PHP?
3. Name two ways to write a single-line comment in PHP.

### 🟡 Level 2: Understand
4. Why does `echo 10 + 20;` output `30`, whereas `echo "10 + 20";` outputs `10 + 20`?
5. What happens if you forget to place a closing `?>` tag at the end of a pure PHP file? (Hint: In modern PHP standards, omitting `?>` at the end of pure PHP files is actually recommended!).

### 🟠 Level 3: Apply
6. Write a PHP script that outputs a complete HTML card containing your full name, class, school name, and current date using separate `echo` statements.

### 🔵 Level 4: Think & Troubleshoot
7. Why is `print` sometimes used instead of `echo`, and what is the technical difference between them?

### 🟣 Level 5: Create & Build
8. Build a mini PHP script called `math-card.php` that outputs an HTML table listing the multiplication table of 9 from 1 to 10, computing each answer directly in PHP.
