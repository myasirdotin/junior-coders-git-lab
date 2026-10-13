# Chapter 3: PHP in HTML Templates 🎨

---

## 🌟 Real-Life Story

At the end of term, your school gives out certificates. Each certificate is printed ahead of time with a border, the school logo and the words *"Awarded to ________"*. The printed paper is the same for everyone. On prize day, the teacher writes each student's name and the date in the blank spaces. The printed paper is the **HTML template**, and the teacher's pen is **PHP**.

---

## 🎯 What You Will Learn

- Mix small `<?php ... ?>` blocks into normal HTML pages.
- Use the short echo tag `<?= ... ?>` to print a value.
- Put PHP values inside HTML attributes such as `src`, `alt` and `href`.
- Print the current year so a footer never goes out of date.

---

## 👁️ Visual Concept Explanation

A **template** is a page layout with gaps that get filled in later. A `.php` file can hold normal HTML with small PHP "gaps" inside it.

### The Template Injection Workflow

```text
+------------------------------------------+
| index.php                                |
+------------------------------------------+
| <h1>Welcome to Student Portal</h1>       |
| <div class="user-badge">                 |
|   User: <?= $userName ?>    <-- gap      |
|   Status: <?= $userStatus ?> <-- gap     |
| </div>                                   |
| <footer>                                 |
|   &copy; <?= date('Y') ?>   <-- gap      |
| </footer>                                |
+------------------------------------------+
```

The server fills each gap, then sends plain HTML to the browser.

### Standard Tag vs Short Echo Tag

```text
STANDARD:   <?php echo $studentName; ?>
SHORT ECHO: <?= $studentName ?>
```

Both give exactly the same HTML. The short echo tag is quicker to type and easier to read inside HTML.

> 💡 A word starting with `$`, such as `$studentName`, is a **variable**: a named box that holds a value. Chapter 4 explains variables fully.

---

## 💻 Code Example: Dynamic Student Profile Page

Save this file as `profile.php`:

```php
<?php
  // Prepare the data first
  $studentName = "Amina Tariq";
  $grade = 9;
  $section = "Emerald-A";
  $attendanceRate = 98.5;
  $photo = "images/amina.png";
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title><?= $studentName ?> - Student Portal</title>
</head>
<body>
  <div class="card">
    <img src="<?= $photo ?>" alt="Photo of <?= $studentName ?>">
    <h2><?= $studentName ?></h2>
    <p>Grade <?= $grade ?> &bull; Section <?= $section ?></p>
    <p>Attendance: <strong><?= $attendanceRate ?>%</strong></p>
    <footer>&copy; <?= date("Y") ?> Junior Coders Academy</footer>
  </div>
</body>
</html>
```

Output (in 2026):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Amina Tariq - Student Portal</title>
</head>
<body>
  <div class="card">
    <img src="images/amina.png" alt="Photo of Amina Tariq">
    <h2>Amina Tariq</h2>
    <p>Grade 9 &bull; Section Emerald-A</p>
    <p>Attendance: <strong>98.5%</strong></p>
    <footer>&copy; 2026 Junior Coders Academy</footer>
  </div>
</body>
</html>
```

---

## 🔍 Code Explanation: Breaking It Down Line by Line

- `<?php $studentName = "..."; ?>`: The data is prepared at the top. This keeps the HTML below clean.
- `<title><?= $studentName ?> - ...</title>`: Puts the student's name in the browser tab title.
- `<img src="<?= $photo ?>">`: Puts the image path inside the `src` **attribute** (the extra settings inside an HTML tag).
- `&copy; <?= date("Y") ?>`: `date("Y")` gives the current 4-digit year. The footer updates itself every January.
- The PHP tags disappear in the output. Only the values are left.

> 🔒 Here the values are typed by us, so they are safe to print. When values come from visitors, you must clean them first with `htmlspecialchars()`. Chapter 19 teaches this.

> 💡 Later, in Chapter 8, you will learn `if`. With it, a template can show or hide whole blocks of HTML.

---

## 🌍 Real-World Connection: Modern CMS Themes

A **CMS** (content management system) is a tool for running a website without writing every page by hand. Themes in **WordPress** and **Drupal**, both written in PHP, use this exact pattern:
- A designer builds the HTML and CSS layout.
- A PHP developer replaces sample text with PHP tags, such as WordPress's `the_title()` and `the_content()`.
- Thousands of articles then share one tidy template.

---

## 🔮 Predict the Output

Look at this snippet:

```php
<?php $themeColor = "#7c3aed"; ?>
<button style="background: <?= $themeColor ?>; color: white;">
  Submit
</button>
```

**Question**: What HTML does the browser receive?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> <code>&lt;button style="background: #7c3aed; color: white;"&gt;</code> followed by <code>Submit</code> and <code>&lt;/button&gt;</code>. The PHP tag was replaced on the server by the colour code.
</details>

---

## 🕵️ Code Detective: The Broken Copyright

A developer wanted the footer to show the current year:

```html
<footer>
  <p>&copy; <?php "date('Y')"; ?> Junior Coders</p>
</footer>
```

In the browser, the year was blank: `© Junior Coders`.

- **Find the mistake**: There is no `echo`, and the function call is wrapped in quotes.
- **Explain**: Without `echo` or `<?=`, nothing is printed. Also, `"date('Y')"` in quotes is only text, not a call to `date()`.
- **Fix**:
  ```html
  <footer>
    <p>&copy; <?= date('Y') ?> Junior Coders</p>
  </footer>
  ```

---

## ⚠️ Common Mistake

**Forgetting the `=` in the short echo tag.**

- ❌ *Wrong*: `<p>Hello <? $name ?></p>`
- 😕 *What happens*: `<?` without `=` is an old "short tag" that is switched off in most setups. PHP does not run it. The browser receives the raw text `<? $name ?>` and the name never appears.
- ✅ *Fixed*: `<p>Hello <?= $name ?></p>`. The `=` means "print this".

A second, softer mistake is **spaghetti code**: a whole page written as hundreds of `echo "..."` lines. Write normal HTML and dip into PHP only where a value is needed.

---

## ✍️ Try It

Open the [PHP Console](../studios/php-console/) and type:

```php
<?php
  $schoolName = "Green Valley School";
  $motto = "Learn, Serve, Grow";
?>
<header>
  <h1><?= $schoolName ?></h1>
  <p><?= $motto ?></p>
</header>
<p>Today is <?= date("l") ?>.</p>
```

Output (on a Tuesday):

```text
<header>
  <h1>Green Valley School</h1>
  <p>Learn, Serve, Grow</p>
</header>
<p>Today is Tuesday.</p>
```

*Hint*: `date("l")` (a small L) gives the day name. Try `date("Y")` for the year.

---

## 📝 Recap

- A `.php` file can hold normal HTML with small PHP gaps inside.
- `<?= $value ?>` is the short way to write `<?php echo $value; ?>`.
- PHP values can go inside text, titles and attributes like `src` and `alt`.
- `date("Y")` prints the current year, so footers stay up to date.
- The visitor sees only the finished HTML, never the PHP tags.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. What is the short way to write `<?php echo $val; ?>`?
2. Which letter in `date()` gives the 4-digit year?
3. Can PHP print a value inside an HTML attribute such as `href`?

<details>
<summary>Show answer</summary>

1. `<?= $val ?>`
2. `"Y"`, as in `date("Y")`.
3. Yes, for example `<a href="<?= $link ?>">`.

</details>

### 🟡 Level 2: Apply
1. Why is it better to write normal HTML with small PHP gaps than one giant `echo` with all the HTML inside?
2. A visitor clicks "View Page Source" on `profile.php`. Can they see the name `$studentName`? Why?

<details>
<summary>Show answer</summary>

1. The HTML stays easy to read and edit. You avoid long quoted strings, quote mix-ups and missing semicolons.
2. No. The server replaces every PHP tag with its value before sending the page. They see `Amina Tariq`, not the variable name.

</details>

### 🔴 Level 3: Challenge
Build `book.php`, a card for a library book.

1. At the top, store the book title, author, shelf number and cover image path in variables.
2. Below, write HTML: an `<img>` with `src` and `alt` filled by PHP, an `<h2>` for the title, and a `<p>` for author and shelf.
3. Add a footer with `&copy;` and the current year.
4. Extra: add a second line showing today's day name with `date("l")`.

<details>
<summary>Show one possible answer</summary>

```php
<?php
  $title = "Stars of the Night Sky";
  $author = "Fatima Noor";
  $shelf = "B-12";
  $cover = "covers/stars.png";
?>
<div class="book">
  <img src="<?= $cover ?>" alt="Cover of <?= $title ?>">
  <h2><?= $title ?></h2>
  <p>By <?= $author ?> &bull; Shelf <?= $shelf ?></p>
  <footer>&copy; <?= date("Y") ?> School Library</footer>
</div>
```

Output (in 2026):

```html
<div class="book">
  <img src="covers/stars.png" alt="Cover of Stars of the Night Sky">
  <h2>Stars of the Night Sky</h2>
  <p>By Fatima Noor &bull; Shelf B-12</p>
  <footer>&copy; 2026 School Library</footer>
</div>
```

</details>
