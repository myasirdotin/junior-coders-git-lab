# Chapter 18: Superglobals: GET vs POST ⚖️

---

## 🌟 Real-Life Story

Think about sending a postcard. Everyone who carries it, from the mail carrier to the sorting office, can read the words on it. A sealed envelope is different: the letter is inside, out of plain sight. Web forms can send data in the same two ways. **GET** is the postcard, with data written in the address bar. **POST** is the envelope, with data tucked inside the request.

---

## 🎯 What You Will Learn

- Explain what a **superglobal** is in PHP.
- Read values from the address bar with `$_GET`.
- Read submitted form data with `$_POST`.
- Choose GET or POST for a task, based on safety and sharing.
- Explain why POST alone does not protect a password, and what does.

---

## 👁️ Visual Concept Explanation

A **query string** is the part of a URL after the `?`. It holds `name=value` pairs joined by `&`.

### GET vs. POST Superglobals Compared

```text
$_GET
+------------------------------------------+
| search.php?query=robotics&grade=9        |
| - data shows in the address bar          |
| - can be bookmarked and shared           |
| - URL length is limited: keep it small   |
| - never for passwords or private data    |
+------------------------------------------+
$_POST
+------------------------------------------+
| join.php  (no data in the URL)           |
| - data travels in the request body       |
| - cannot be bookmarked                   |
| - can carry more (PHP default: 8 MB)     |
| - use for logins, uploads, saving data   |
+------------------------------------------+
```

The **request body** is the hidden part of the message, after the address.

Spaces and symbols in a URL are **URL-encoded**. A space becomes `%20` (or `+` in form data). PHP decodes them for you, so `$_GET` already holds normal text.

### What is a Superglobal?

A **superglobal** is a built-in PHP array that is available **everywhere**: in normal code and inside functions, with no `global` keyword.
Examples: `$_GET`, `$_POST`, `$_SERVER`, `$_FILES`, `$_SESSION`, `$_COOKIE`.

---

## 💻 Code Example: Demonstrating Both Methods

### The Search Filter (GET in Action)

```php
<!-- search.php -->
<?php
  $query = trim($_GET["q"] ?? "");
  $category = $_GET["cat"] ?? "all";
?>
<form action="search.php" method="GET">
  <input type="text" name="q" placeholder="Search library..."
         value="<?= htmlspecialchars($query) ?>">
  <select name="cat">
    <option value="all">All Books</option>
    <option value="science" <?= $category === 'science' ? 'selected' : '' ?>>
      Science</option>
    <option value="tech" <?= $category === 'tech' ? 'selected' : '' ?>>
      Technology</option>
  </select>
  <button type="submit">Search</button>
</form>

<?php if ($query !== ""): ?>
  <p>Results for: <strong><?= htmlspecialchars($query) ?></strong>
     in: <em><?= htmlspecialchars($category) ?></em></p>
<?php endif; ?>
```

Opening `search.php?q=robotics&cat=tech` prints this line under the form:

```html
  <p>Results for: <strong>robotics</strong>
     in: <em>tech</em></p>
```

### The Library Club Form (POST in Action)

This form **changes data** (it signs a student up), so it uses POST.

```php
<!-- join.php -->
<?php
  if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = trim($_POST["student_name"] ?? "");
    $grade = $_POST["grade"] ?? "";

    if ($name !== "" && $grade !== "") {
      echo "<p>Welcome to the Library Club, "
        . htmlspecialchars($name) . " (Grade "
        . htmlspecialchars($grade) . ")!</p>";
    } else {
      echo "<p>Please enter your name and grade.</p>";
    }
  }
?>
<form action="join.php" method="POST">
  <input type="text" name="student_name" placeholder="Your name" required>
  <input type="number" name="grade" min="6" max="10" required>
  <button type="submit">Join</button>
</form>
```

If Maryam enters grade 8, the page shows:

```html
<p>Welcome to the Library Club, Maryam (Grade 8)!</p>
```

The address bar still shows only `join.php`.

---

## 🔍 Code Explanation: Breaking It Down Line by Line

- `search.php?q=robotics&cat=tech`: `?` starts the query string. Each pair is `name=value`. Pairs are joined by `&`.
- `$_GET["q"]`: PHP takes `"robotics"` out of the URL for you.
- `value="<?= htmlspecialchars($query) ?>"`: Puts the search back into the box, safely escaped.
- `method="POST"` in `join.php`: The data goes in the request body. It does not appear in the address bar, the browser history or a shared link.

---

## 🌍 Real-World Connection: Shareable URLs vs Privacy

- When you search on a search engine or a library catalogue, the URL looks like `search?q=php+tutorials`. You can send that link to a classmate, and they see the same results. That is why searches use GET.
- When you log in or pay at an online bookshop, the details must never sit in the URL. That is why logins and payments use POST, over HTTPS.

---

## 🔮 Predict the Output

A user visits: `http://localhost/view.php?id=42&view=summary`

What does `$_GET['id']` contain?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> The string <code>"42"</code>. Values from the URL are always strings.
</details>

---

## 🕵️ Code Detective: The Broken Password Gate

```html
<!-- A developer wrote this registration form: -->
<form action="register.php" method="GET">
  <input type="password" name="pwd">
  <button type="submit">Create Account</button>
</form>
```

- **Find the security flaw**: The method is `GET`.
- **Explain**: After Submit, the address bar shows `register.php?pwd=MyPassword123`. It is saved in the history and in server logs.
- **Fix**: Change `method="GET"` to `method="POST"`. Also use HTTPS, and store only a hash of the password made with `password_hash()` (Chapter 32 shows this).

---

## ⚠️ Common Mistake

**Thinking POST makes a password safe.**

- ❌ *Wrong idea*: "My login form uses POST, so the password is protected."
- 😕 *What happens*: POST only keeps the password out of the address bar. On plain `http://`, anyone watching the network (for example, on shared Wi-Fi) can still read it.
- ✅ *Fixed*: Use POST **and** HTTPS (`https://`), which encrypts the whole request. On the server, never save or compare a plain password. Save `password_hash($password, PASSWORD_DEFAULT)` and check with `password_verify()`.

A second mistake: using GET for a password form. The password then appears in the URL, the history and the logs.

---

## ✍️ Try It

Save this as `greet.php` in `htdocs`:

```php
<?php
$name = $_GET["name"] ?? "friend";
echo "<p>Assalamu alaikum, " . htmlspecialchars($name) . "!</p>";
```

Open `http://localhost/greet.php?name=Bilal`. You see:

```html
<p>Assalamu alaikum, Bilal!</p>
```

*Hint*: Change the URL to `greet.php?name=Hana%20Ali`. `%20` is a space, so the page greets **Hana Ali**. Remove `?name=...` completely and the page greets **friend**.

---

## 📝 Recap

- **Superglobals** such as `$_GET` and `$_POST` are built-in arrays you can use anywhere.
- `$_GET` reads the query string in the URL. Use it for searches, filters and page links.
- `$_POST` reads data from the request body. Use it for logins, uploads and anything that changes data.
- POST hides data from the URL, but only **HTTPS** encrypts it, and passwords must be stored with `password_hash()`.
- Values from GET and POST are strings: escape them with `htmlspecialchars()` before printing.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Name two differences between `$_GET` and `$_POST`.
2. Can a page opened with GET data be bookmarked?
3. Which symbol joins two pairs in a query string?

<details>
<summary>Show answer</summary>

1. GET data appears in the URL and can be shared; POST data is in the request body. GET is limited by URL length; POST can carry much more.
2. **Yes**, because all the data is in the URL.
3. **`&`** (for example `?q=robots&grade=9`).

</details>

### 🟡 Level 2: Apply
1. Why is GET a good choice for search filters and page numbers?
2. A function needs a form value. Why can it use `$_POST` without writing `global $_POST`?

<details>
<summary>Show answer</summary>

1. The search is stored in the URL, so it can be bookmarked, shared and reloaded. It does not change any data.
2. `$_POST` is a **superglobal**. Superglobals are available inside every function automatically.

</details>

### 🔴 Level 3: Challenge
Build a **Book Catalogue Filter**: `books.php?subject=science&sort=title`.

1. Read `subject` and `sort` with `$_GET`, using `??` defaults `"all"` and `"title"`.
2. Print: *"Showing SUBJECT books, sorted by SORT."* with escaped values.
3. Extra: build `calc.php?a=10&b=5&op=add`. Check that `a` and `b` are numeric with `is_numeric()`, support `add` and `sub`, and print a friendly message when something is missing.
4. Extra: what is `$_REQUEST`, and why do experts prefer `$_GET` or `$_POST`?

<details>
<summary>Show one possible answer</summary>

```php
<?php
$subject = $_GET["subject"] ?? "all";
$sort = $_GET["sort"] ?? "title";
echo "Showing " . htmlspecialchars($subject)
  . " books, sorted by " . htmlspecialchars($sort) . ".";
```

For `books.php?subject=science&sort=title` it prints:

```text
Showing science books, sorted by title.
```

Calculator:

```php
<?php
$a = $_GET["a"] ?? "";
$b = $_GET["b"] ?? "";
$op = $_GET["op"] ?? "add";

if (!is_numeric($a) || !is_numeric($b)) {
  echo "Please give two numbers, like ?a=10&b=5&op=add";
} elseif ($op === "add") {
  echo $a + $b;
} elseif ($op === "sub") {
  echo $a - $b;
} else {
  echo "Unknown operation.";
}
```

For `calc.php?a=10&b=5&op=add` it prints `15`.

`$_REQUEST` mixes GET and POST data (and sometimes cookies) in one array. You cannot tell where a value came from, so a value could be slipped in through the URL when you expected a form. Reading `$_GET` or `$_POST` directly is clearer and safer.

</details>
