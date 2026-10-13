# Chapter 2: Your First PHP Script 🚀

---

## 🌟 Real-Life Story

Think about your school's loudspeaker system. The principal switches the microphone **on**, which is like `<?php`. She speaks a clear sentence, which is like `echo "Assembly begins in 10 minutes.";`. She pauses at the end of the sentence, which is like the semicolon `;`. Then she switches the microphone **off**, which is like `?>`. Every classroom hears only the words, never the switch.

---

## 🎯 What You Will Learn

- Open and close PHP blocks with `<?php` and `?>`.
- Print text, numbers and HTML tags with `echo`.
- End every statement with a semicolon (`;`).
- Write single-line and multi-line comments.
- Tell which parts of PHP care about capital letters and which do not.

---

## 👁️ Visual Concept Explanation

A **statement** is one complete instruction to PHP, like one sentence in English.

### Anatomy of a Basic PHP Statement

```text
<?php echo "Welcome to Junior Coders!";
└─┬─┘ └┬─┘ └────────────┬────────────┘│
  1    2                3             4

1 <?php  starts PHP code
2 echo   prints output
3 "..."  the message sent to the browser
4 ;      ends the instruction
```

A **string** is a piece of text inside quotes, such as `"Hello"`.

### Case Sensitivity in PHP: What Matters?

**Case-sensitive** means PHP treats `A` and `a` as different.

```text
┌─────────────────────────────────────┐
│ CASE-INSENSITIVE: PHP does not care │
├─────────────────────────────────────┤
│ • Keywords: echo, ECHO, Echo        │
│ • Control: if, ELSE, while          │
│ • Functions: date(), DATE()         │
│ • Classes: Student vs student       │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ CASE-SENSITIVE: PHP cares           │
├─────────────────────────────────────┤
│ • Variables: $name vs $Name         │
│ • Constants: SITE_URL               │
│ • Array keys: $user['id']           │
└─────────────────────────────────────┘
```

You will meet variables, functions and the other items in later chapters. For now, remember: always write keywords like `echo` in lowercase.

---

## 💻 Code Example: Writing and Documenting PHP

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

Output (the HTML that PHP sends, all on one line):

```text
Hello, World!<br><h2>Backend Web Development is Fun!</h2><p style='color: #7c3aed;'>Styled directly from PHP echo!</p>Current Year: 2026<br>Calculation (15 * 4): 60
```

The browser turns this HTML into a heading, a purple paragraph and line breaks.

---

## 🔍 Code Explanation: Breaking It Down Line by Line

- `//`: Starts a **single-line comment**. A **comment** is a note for humans; PHP skips it.
- `#`: Another way to write a single-line comment.
- `/* ... */`: Wraps a **multi-line comment** that can cover many lines.
- `echo`: Prints strings and numbers into the page.
- `"<br>"`: An HTML line break, so the browser starts a new line.
- `echo 15 * 4;`: PHP works out the sum (`60`) on the server and prints only the answer.
- `;`: Every PHP statement must end with a semicolon.

---

## 🌍 Real-World Connection: Comments in Large Teams

Big PHP projects such as WordPress have hundreds of people working on the same code.
- Comments explain **why** a piece of code was written. Without them, others waste hours guessing.
- Good developers write code for **humans first** and computers second.

---

## 🔮 Predict the Output

Look at this PHP code:

```php
<?php
  echo "Hello ";
  ECHO "Class ";
  Echo "9!";
?>
```

**Question**: Will PHP show an error because `echo` is written in three different ways?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> No error. It prints <code>Hello Class 9!</code> because PHP keywords are case-insensitive. Still, always write <code>echo</code> in lowercase. That is the normal style.
</details>

---

## 🕵️ Code Detective: The Broken Quotation

```php
<?php
  // Find the bug in this script:
  echo 'It's a fine day to code PHP!';
?>
```

- **Find the mistake**: The apostrophe in `It's` closes the single-quoted string too early.
- **Explain the mistake**: PHP thinks the string is just `'It'`. The rest, `s a fine day...`, is not valid code, so PHP stops with a parse error.
- **Fix**:
  ```php
  // Option A: Use double quotes
  echo "It's a fine day to code PHP!";
  // Option B: Escape the single quote with a backslash
  echo 'It\'s a fine day to code PHP!';
  ```
  Both print: `It's a fine day to code PHP!`

---

## ⚠️ Common Mistake

**1. Forgetting the semicolon.**

- ❌ *Wrong*:
  ```php
  <?php
  echo "Hello World"
  echo "Next Line";
  ```
- 😕 *What happens*: PHP stops with an error and prints nothing else:
  ```text
  Parse error: syntax error, unexpected token "echo", expecting "," or ";" in hello.php on line 3
  ```
  Notice the error points to line 3, the line *after* the real mistake.
- ✅ *Fixed*: `echo "Hello World";` (add the `;`).

**2. Double quotes inside double quotes.**

- ❌ *Wrong*: `echo "<h1 class="title">Hello</h1>";`
- 😕 *What happens*: The string ends at `class=`, so PHP shows a parse error.
- ✅ *Fixed*: Use single quotes inside (`echo "<h1 class='title'>Hello</h1>";`) or escape them with a backslash (`echo "<h1 class=\"title\">Hello</h1>";`). The second prints `<h1 class="title">Hello</h1>`.

---

## ✍️ Try It

Open the [PHP Console](../studios/php-console/) and type:

```php
<?php
echo "Name: Maryam";
echo "<br>";
echo "Books read this term: ";
echo 4 * 3;
```

Output:

```text
Name: Maryam<br>Books read this term: 12
```

*Hint*: Change the name to your own and the sum to `5 * 3`. Then remove one semicolon and read the error message.

---

## 📝 Recap

- PHP code goes between `<?php` and `?>`. In a file that is only PHP, you may leave out the final `?>`.
- `echo` prints text, numbers and HTML into the page.
- Every statement ends with `;`. A missing one causes a parse error.
- Comments (`//`, `#`, `/* ... */`) are notes for humans; PHP skips them.
- Keywords like `echo` ignore capital letters, but variables do not.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which command prints data to the web page?
2. What symbol ends every PHP statement?
3. Name two ways to write a single-line comment.

<details>
<summary>Show answer</summary>

1. `echo`
2. The semicolon `;`
3. `//` and `#`

</details>

### 🟡 Level 2: Apply
1. Why does `echo 10 + 20;` print `30`, but `echo "10 + 20";` prints `10 + 20`?
2. Fix this line so it prints `Ali's book`: `echo 'Ali's book';`

<details>
<summary>Show answer</summary>

1. Without quotes, PHP works out the sum. With quotes, it is a string, so PHP prints the text exactly.
2. `echo "Ali's book";` or `echo 'Ali\'s book';`

</details>

### 🔴 Level 3: Challenge
Build `my-card.php`:

1. Use separate `echo` statements to print a `<div>` card.
2. Inside, print your name in an `<h2>`, and your class and school in a `<p>`.
3. Print today's date in another `<p>`.
4. Extra: print a small HTML table with the first three rows of the 9 times table. Let PHP work out each answer.
5. Extra: `print` also outputs text. Find one difference between `print` and `echo`.

<details>
<summary>Show one possible answer</summary>

```php
<?php
echo "<div class='card'>";
echo "<h2>Maryam Shah</h2>";
echo "<p>Class 9, Green Valley School</p>";
echo "<p>Date: 13 October 2026</p>";
echo "</div>";
echo "<table>";
echo "<tr><td>9 x 1</td><td>"; echo 9 * 1; echo "</td></tr>";
echo "<tr><td>9 x 2</td><td>"; echo 9 * 2; echo "</td></tr>";
echo "<tr><td>9 x 3</td><td>"; echo 9 * 3; echo "</td></tr>";
echo "</table>";
```

Output:

```text
<div class='card'><h2>Maryam Shah</h2><p>Class 9, Green Valley School</p><p>Date: 13 October 2026</p></div><table><tr><td>9 x 1</td><td>9</td></tr><tr><td>9 x 2</td><td>18</td></tr><tr><td>9 x 3</td><td>27</td></tr></table>
```

`print` takes only one value and always gives back `1`. `echo` can print several values separated by commas and gives back nothing. For printing a page, both work.

</details>
