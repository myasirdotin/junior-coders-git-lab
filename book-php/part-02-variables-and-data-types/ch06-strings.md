# Chapter 6: Strings & Operations 🔤

---

## 🌟 Real-Life Story

Imagine threading alphabet beads onto a cord to make a name bracelet. You add an `H`, an `E`, two `L` beads and an `O`, and the cord now spells `HELLO`. If you want a longer word, you clip a second cord onto the first. In PHP, a **string** is like that cord of letters, and the dot `.` is the clip that joins two strings together.

---

## 🎯 What You Will Learn

- Join strings with the dot (`.`) and add to a string with `.=`.
- Choose between single quotes (`'...'`) and double quotes (`"..."`).
- Use escape codes such as `\n`, `\"` and `\$`.
- Use string functions: `strlen()`, `str_replace()`, `strpos()`, `substr()`, `trim()` and case changers.

---

## 👁️ Visual Concept Explanation

A **string** is a row of characters (letters, digits, spaces, symbols). **Concatenation** means joining strings end to end.

### The Golden Rule of Concatenation in PHP

```text
JavaScript: "Hello " + "World"
PHP:        "Hello " . "World"

In PHP, + is only for adding numbers.
```

### Double Quotes vs. Single Quotes

```text
$name = "Ali";

DOUBLE QUOTES "..."
  echo "Hi, $name!";    -> Hi, Ali!
  "Line 1\nLine 2"      -> two lines

SINGLE QUOTES '...'
  echo 'Hi, $name!';    -> Hi, $name!
  'Line 1\nLine 2'      -> Line 1\nLine 2
```

An **escape code** is a backslash plus a letter that means something special inside double quotes:

| Code | Meaning |
| :--- | :--- |
| `\n` | new line |
| `\t` | tab space |
| `\"` | a double quote inside a double-quoted string |
| `\$` | a real dollar sign, not a variable |

Inside single quotes, only `\'` and `\\` work. Everything else is printed exactly as typed.

---

## 💻 Code Example: String Manipulation Laboratory

A **function** is a ready-made command that does a job and gives back an answer, like `strlen($text)`. Chapter 11 shows how to write your own.

```php
<?php
  // 1. Concatenation
  $salutation = "Prof.";
  $teacherName = "Rasool";
  $fullName = $salutation . " " . $teacherName;
  echo "Staff Member: " . $fullName . "<br>";

  // 2. Useful Built-in String Functions
  $quote = "Code is poetry in motion.";

  echo "Original: <em>$quote</em><br>";
  echo "Length: " . strlen($quote) . " characters<br>";
  echo "Word Count: " . str_word_count($quote) . " words<br>";
  echo "Uppercase: " . strtoupper($quote) . "<br>";
  echo "Lowercase: " . strtolower($quote) . "<br>";
  echo "Reversed: " . strrev($quote) . "<br>";

  // 3. Search and Replace
  $updatedQuote = str_replace("poetry", "craft", $quote);
  echo "Replaced: " . $updatedQuote . "<br>";

  // 4. Finding where a word starts
  $pos = strpos($quote, "poetry");
  echo "'poetry' starts at position: $pos<br>";

  // 5. Extracting Substrings
  $sub = substr($quote, 0, 4); // First 4 characters
  echo "Snippet: '$sub'";
?>
```

Output:

```text
Staff Member: Prof. Rasool<br>Original: <em>Code is poetry in motion.</em><br>Length: 25 characters<br>Word Count: 5 words<br>Uppercase: CODE IS POETRY IN MOTION.<br>Lowercase: code is poetry in motion.<br>Reversed: .noitom ni yrteop si edoC<br>Replaced: Code is craft in motion.<br>'poetry' starts at position: 8<br>Snippet: 'Code'
```

---

## 🔍 Code Explanation: Breaking It Down Line by Line

- `$salutation . " " . $teacherName`: Joins three strings into one with the dot (`.`).
- `strlen($quote)`: Counts the characters, including spaces and the full stop (25).
- `str_replace("poetry", "craft", $quote)`: Finds every `"poetry"` and swaps in `"craft"`. The original `$quote` is not changed.
- `strpos($quote, "poetry")`: Gives the **position** where the word starts. Counting starts at 0, so `C` is 0 and `p` is 8. If the word is missing, it gives `false`.
- `substr($quote, 0, 4)`: Cuts out 4 characters starting at position 0, giving `"Code"`.

---

## 🌍 Real-World Connection: Clean Search Boxes

When you type into a library catalogue's search box, the website usually tidies your words first:
- `trim()` removes extra spaces at the start and end.
- `strtolower()` makes everything lowercase, so `"PHP"` also finds `"php"`.
- `substr()` shortens long book descriptions into short previews.

---

## 🔮 Predict the Output

```php
<?php
  $code = "Laravel";
  echo substr($code, 0, 3);
?>
```

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> <code>Lar</code> (start at position 0, take 3 characters).
</details>

---

## 🕵️ Code Detective: The Broken Welcome

```php
<?php
  $user = "Zainab";
  echo 'Welcome back, $user! You have 3 messages.';
?>
```

- **Find the bug**: The string uses single quotes `'...'`.
- **Explain**: Single quotes do not swap in variables. The screen literally says `Welcome back, $user! You have 3 messages.`
- **Fix**: Use double quotes: `echo "Welcome back, $user! You have 3 messages.";` prints `Welcome back, Zainab! You have 3 messages.`

---

## ⚠️ Common Mistake

**1. Using `+` to join strings.**

- ❌ *Wrong*: `$msg = "Hello " + "World";`
- 😕 *What happens*: PHP 8 tries to add two numbers, fails, and stops the script:
  ```text
  Fatal error: Uncaught TypeError: Unsupported operand types: string + string
  ```
- ✅ *Fixed*: `$msg = "Hello " . "World";` gives `Hello World`.

**2. Forgetting that `strpos()` can return `0`.**

- ❌ *Wrong idea*: "If `strpos()` gives 0, the word was not found."
- 😕 *What happens*: `strpos("Junior Coders", "Junior")` is `0`, because the word is at the very start. Only `false` means "not found".
- ✅ *Fixed*: Check with `var_dump()` to see the real value: `int(0)` means found at the start, `bool(false)` means missing. In Chapter 8 you will learn to test this with `!== false`.

---

## ✍️ Try It

Open the [PHP Console](../studios/php-console/) and type:

```php
<?php
$city = "  srinagar  ";
$clean = ucwords(trim($city));
echo "City: " . $clean . "<br>";
echo "Letters: " . strlen($clean);
```

Output:

```text
City: Srinagar<br>Letters: 8
```

*Hint*: `trim()` removes the outside spaces, then `ucwords()` gives each word a capital first letter. Remove `trim()` and see how the letter count changes.

---

## 📝 Recap

- A string is a row of characters. The dot `.` joins strings; `.=` adds to the end of one.
- Double quotes swap in variables and escape codes; single quotes print text exactly.
- Positions in a string start at 0.
- `strlen`, `str_replace`, `strpos`, `substr`, `trim`, `strtoupper`, `strtolower` and `ucwords` cover most daily text jobs.
- `+` is only for numbers. Using it on words stops PHP 8 with an error.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which operator joins strings in PHP?
2. Which function counts the characters in a string?
3. What is the difference between single and double quotes?

<details>
<summary>Show answer</summary>

1. The dot `.`
2. `strlen()`
3. Double quotes swap in variable values and escape codes like `\n`. Single quotes print the text exactly as typed.

</details>

### 🟡 Level 2: Apply
1. What do `strpos("Junior Coders", "Junior")` and `strpos("Junior Coders", "Python")` give?
2. What does `trim("   hello world   ")` give?

<details>
<summary>Show answer</summary>

1. `0` (found at the very start) and `false` (not found). `var_dump()` shows `int(0)` and `bool(false)`.
2. `"hello world"`. Spaces at the two ends are removed; the space in the middle stays.

</details>

### 🔴 Level 3: Challenge
A new student typed her name all in lowercase.

1. Store `"maryam yasir rasool"` in `$fullName`.
2. Use `ucwords()` to give each word a capital letter, and print it.
3. Print her first initial with `substr()`.
4. Extra: a comment box should hide the words `spam` and `junk`. Use `str_replace()` twice to turn `"This spam post is junk and spam."` into stars.
5. Extra: research `htmlspecialchars()`. What does it do to `<script>`, and why does that protect a page? (Chapter 19 uses it every day.)

<details>
<summary>Show one possible answer</summary>

```php
<?php
$fullName = "maryam yasir rasool";
$proper = ucwords($fullName);
echo $proper . "<br>";
echo "Initial: " . substr($proper, 0, 1);
```

Output:

```text
Maryam Yasir Rasool<br>Initial: M
```

Comment filter:

```php
<?php
$comment = "This spam post is junk and spam.";
$clean = str_replace("spam", "***", $comment);
$clean = str_replace("junk", "***", $clean);
echo $clean;
```

Output:

```text
This *** post is *** and ***.
```

`htmlspecialchars("<script>alert(1)</script>")` gives `&lt;script&gt;alert(1)&lt;/script&gt;`. The browser shows the text `<script>` on screen instead of running it as code.

</details>
