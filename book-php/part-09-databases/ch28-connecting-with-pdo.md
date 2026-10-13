# Chapter 28: Connecting to MySQL with PDO

---

## 🌟 Real-Life Story

The school library keeps thousands of book records in a back room. Students do not walk into that room and dig through the shelves themselves. They go to the front desk. The librarian takes the request, finds the right records and hands back a neat list. If a request makes no sense, the librarian says so politely. In PHP, the back room is the **MySQL database**, and the librarian at the desk is **PDO**.

---

## 🎯 What You Will Learn

- Explain what PDO is and how PHP, PDO and MySQL work together.
- Write a **DSN** and connect to XAMPP's MySQL with `new PDO(...)` inside `try` / `catch`.
- Run fixed SQL with `query()`, and SQL that uses visitor input with `prepare()` + `execute()`.
- Choose between `fetch()`, `fetchAll()` and `fetchColumn()`.
- Show database rows safely in an HTML table with `htmlspecialchars()`.

---

## PHP, PDO and MySQL

Until now your data lived in arrays and files (Chapters 14–21). Real school sites keep it in a **database**: an organised store of tables that many pages can read and change at the same time. The MySQL book teaches the SQL language. This chapter connects PHP to it.

**PDO** stands for **PHP Data Objects**. It is a part of PHP that talks to databases. The same PDO code works with MySQL, MariaDB (the database inside XAMPP), SQLite and others; you mostly change one line to switch.

```text
Browser
  |  GET /students.php
  v
Apache + PHP (your script)
  |  $pdo->query("SELECT ...")
  v
PDO  (the librarian)
  |  SQL over a connection
  v
MySQL / MariaDB server
  |  database: school_db
  v
rows come back to PHP -> HTML -> browser
```

The visitor never talks to the database. Only your PHP code does. That is why the database can stay private.

### Before you start

1. Open the XAMPP Control Panel and start **Apache** and **MySQL**.
2. Create the `school_db` database with its five tables and sample rows. The MySQL book shows how (Chapter 4 creates the database, Chapter 5 the tables, Chapter 9 the rows). You can type the SQL in phpMyAdmin at `http://localhost/phpmyadmin/`.

This chapter uses two of those tables:

```text
students: id, name, grade, gpa,
          class_id, city
books:    id, title, category,
          pages, available
```

---

## The DSN: the Database's Address

A **DSN** (Data Source Name) is one string that tells PDO which database to open:

```text
mysql:host=localhost;dbname=school_db;charset=utf8mb4
```

| Part | Meaning |
| :--- | :--- |
| `mysql:` | The kind of database (MariaDB uses `mysql:` too) |
| `host=localhost` | The computer running MySQL; `localhost` means this one |
| `dbname=school_db` | Which database to open |
| `charset=utf8mb4` | The text encoding: every letter in every language, such as Arabic and Urdu names, and emoji |

Parts are separated by semicolons, with **no spaces**.

---

## Connecting: `db.php`

Every page that needs the database will need the same connection. So we write it once, in `db.php`, and load it with `require` on each page.

```php
<?php
// db.php - one connection for the whole site
$dsn  = "mysql:host=localhost;dbname=school_db;charset=utf8mb4";
$user = "root";   // XAMPP's default user: ONLY on your own computer
$pass = "";       // XAMPP's root has no password: ONLY on your own computer

$options = [
  PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
  $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
  error_log("Database connection failed: " . $e->getMessage());
  http_response_code(503);
  exit("Sorry, the school database is not available right now. Please try again later.");
}
```

Line by line:

- `new PDO(...)`: The **constructor** (Chapter 27) contacts MySQL and logs in straight away. If it works, `$pdo` is your connection object.
- `"root"` and `""`: XAMPP comes with a `root` user that has **no password**. That is acceptable only for practice on your own computer, where nobody else can reach it. A live website uses its own user with a long, strong password, kept outside the public folder.
- `PDO::ERRMODE_EXCEPTION`: Every database problem becomes an exception you can catch (Chapter 23). PHP 8 already does this by default, but writing it makes your intention clear and protects you on older setups.
- `PDO::FETCH_ASSOC`: Rows come back as associative arrays (Chapter 15) such as `["name" => "Zayd"]`.
- `catch (PDOException $e)`: A `PDOException` is the exception type PDO throws. We log the real message for ourselves and show the visitor a calm sentence.
- `http_response_code(503)`: Tells the browser "service unavailable for now".

Test it with `connect-test.php` in the same folder:

```php
<?php
require "db.php";
echo "Connected to school_db!";
```

Output when everything is right:

```text
Connected to school_db!
```

### When the connection fails

The visitor sees only the friendly sentence. The error log (Chapter 23) gets the real reason. The usual ones:

| Message in the log | What to fix |
| :--- | :--- |
| `SQLSTATE[HY000] [2002] No connection could be made because the target machine actively refused it` | MySQL is not running: start it in the XAMPP panel |
| `SQLSTATE[HY000] [1049] Unknown database 'school_db'` | The database does not exist yet, or the name is misspelt |
| `SQLSTATE[HY000] [1045] Access denied for user 'root'@'localhost' (using password: YES)` | Wrong user name or password |

---

## `query()`: SQL With No Visitor Input

When the SQL is **fixed**, with nothing typed by a visitor inside it, use `query()`. It sends the SQL and returns a **statement** object holding the results.

```php
<?php
require "db.php";

$stmt = $pdo->query("SELECT name, city FROM students ORDER BY name");
$students = $stmt->fetchAll();

echo count($students) . " students\n";
foreach ($students as $s) {
  echo $s["name"] . " (" . $s["city"] . ")\n";
}
```

Output (the examples print `\n` new lines; run them with `php file.php` in a terminal, or view the page source in the browser):

```text
8 students
Aisha (Lahore)
Bilal (Lahore)
Fatima (Islamabad)
Hamza (Peshawar)
Khadija (Islamabad)
Maryam (Karachi)
Tariq (Karachi)
Zayd (Lahore)
```

---

## Getting the Rows: `fetch()`, `fetchAll()`, `fetchColumn()`

| Method | Returns | Use it when |
| :--- | :--- | :--- |
| `fetchAll()` | An array of **all** rows | The list is small, e.g. one class |
| `fetch()` | The **next** row, or `false` when there are no more | You want one row, or to loop row by row |
| `fetchColumn()` | The first column of the next row | You need one value, e.g. a `COUNT(*)` |

### One row with `fetch()`

```php
<?php
require "db.php";
$row = $pdo->query("SELECT * FROM students WHERE id = 1")->fetch();
print_r($row);
```

Output:

```text
Array
(
    [id] => 1
    [name] => Zayd
    [grade] => 8
    [gpa] => 3.90
    [class_id] => 2
    [city] => Lahore
)
```

`gpa` is a `DECIMAL(3,2)` column. MySQL sends decimals to PHP as strings, so it prints exactly as stored: `3.90`.

Why did we set `FETCH_ASSOC`? Without it, PDO's default (`FETCH_BOTH`) gives every value **twice**, once by name and once by number:

```text
Array
(
    [name] => Zayd
    [0] => Zayd
    [city] => Lahore
    [1] => Lahore
)
```

### Row by row with `fetch()` in a `while` loop

```php
<?php
require "db.php";
$stmt = $pdo->query("SELECT title, pages FROM books WHERE available = 'Yes' ORDER BY pages");

while ($book = $stmt->fetch()) {
  echo $book["title"] . ": " . $book["pages"] . " pages\n";
}
```

Output:

```text
Arabic Calligraphy Basics: 120 pages
Digital Stewardship: 180 pages
Introduction to Networks: 240 pages
HTML & CSS Architecture: 288 pages
Algorithm Design: 320 pages
Clean Code: 464 pages
```

When the rows run out, `fetch()` returns `false` and the loop stops. This uses little memory, even with thousands of rows.

### One value with `fetchColumn()`

```php
<?php
require "db.php";
$count = $pdo->query("SELECT COUNT(*) FROM books WHERE available = 'Yes'")->fetchColumn();
echo "Books on the shelf: $count";
```

Output:

```text
Books on the shelf: 6
```

---

## `prepare()` + `execute()`: SQL With Visitor Input

Now a visitor chooses which student to see: `student.php?id=3`. The id comes from `$_GET`, so it is **untrusted** (Chapter 19). Never paste it into the SQL text. Instead:

1. `prepare()` the SQL with a `?` **placeholder** where the value will go.
2. `execute()` it, passing the real values in an array.

The SQL and the values travel **separately**. The database treats the value only as data, never as part of the command. This defeats an attack called **SQL injection**, which Chapter 29 shows in detail.

```php
<?php
require "db.php";

// 1. Validate first (Chapter 19): a whole number of 1 or more
$id = filter_var($_GET["id"] ?? "", FILTER_VALIDATE_INT,
  ["options" => ["min_range" => 1]]);

if ($id === false) {
  exit("Please choose a valid student number.");
}

// 2. Prepare with a ? placeholder, then execute with the value
$stmt = $pdo->prepare("SELECT name, grade, city FROM students WHERE id = ?");
$stmt->execute([$id]);
$student = $stmt->fetch();

// 3. fetch() gives false when no row matched
if ($student === false) {
  echo "No student has number $id.";
} else {
  echo htmlspecialchars($student["name"]) . " is in Grade "
    . $student["grade"] . " and lives in "
    . htmlspecialchars($student["city"]) . ".";
}
```

Output for three different addresses:

```text
student.php?id=3
  Bilal is in Grade 9 and lives in Lahore.
student.php?id=42
  No student has number 42.
student.php?id=abc
  Please choose a valid student number.
```

With several values, use several `?` marks. The array gives them **in the same order**:

```php
$stmt = $pdo->prepare("SELECT name FROM students WHERE grade = ? AND city = ?");
$stmt->execute([8, "Lahore"]);
```

| | `query()` | `prepare()` + `execute()` |
| :--- | :--- | :--- |
| SQL text | Complete and fixed | Has `?` placeholders |
| Values from visitors | Never | Yes, passed to `execute()` |
| Example | List all books | One student by id; a search box |

If you are unsure, use `prepare()`. It is never wrong.

---

## Rows Into an HTML Table

A teacher wants an honour roll for one grade: `honour-roll.php?grade=8`. Save this next to `db.php`:

```php
<?php
require "db.php";

$grade = filter_var($_GET["grade"] ?? "", FILTER_VALIDATE_INT,
  ["options" => ["min_range" => 7, "max_range" => 9]]);
if ($grade === false) {
  $grade = 7;   // a safe default
}

$stmt = $pdo->prepare(
  "SELECT name, gpa, city FROM students WHERE grade = ? ORDER BY gpa DESC"
);
$stmt->execute([$grade]);
$students = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Honour Roll</title>
  <style>
    body { font-family: sans-serif; max-width: 480px; margin: 20px auto; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #cbd5e1; padding: 8px; text-align: left; }
    th { background: #e0f2fe; }
  </style>
</head>
<body>
  <h1>Grade <?= $grade ?> Honour Roll</h1>

  <?php if (count($students) === 0): ?>
    <p>No students found for this grade.</p>
  <?php else: ?>
    <table>
      <tr><th>Name</th><th>GPA</th><th>City</th></tr>
      <?php foreach ($students as $s): ?>
        <tr>
          <td><?= htmlspecialchars($s["name"]) ?></td>
          <td><?= htmlspecialchars($s["gpa"]) ?></td>
          <td><?= htmlspecialchars($s["city"]) ?></td>
        </tr>
      <?php endforeach; ?>
    </table>
  <?php endif; ?>
</body>
</html>
```

What the browser shows for `?grade=8`:

```text
Grade 8 Honour Roll

| Name   | GPA  | City      |
|--------|------|-----------|
| Zayd   | 3.90 | Lahore    |
| Fatima | 3.85 | Islamabad |
| Hamza  | 3.20 | Peshawar  |
```

Notice:

- Every value from the database goes through `htmlspecialchars()`. A database can contain text that someone typed long ago. If a name like `<script>...` was saved, escaping stops it from running (**XSS**, Chapter 19).
- `$grade` is safe to print without escaping: `filter_var()` already made it a whole number from 7 to 9.
- The PHP work (connecting, querying) happens at the **top**. The HTML part only loops and prints. This keeps pages tidy.

---

## 🌍 Real-World Connection: Frameworks Use PDO Too

Big PHP frameworks such as **Laravel** hide PDO behind friendlier code: `Student::where('grade', 8)->get()`. Underneath, Laravel still uses PDO with prepared statements. Learning PDO now means you will understand what happens inside those tools later.

---

## 🔮 Predict the Output

The `books` table has 8 rows. What does this print?

```php
<?php
require "db.php";
$stmt = $pdo->query("SELECT title FROM books ORDER BY id");
$first = $stmt->fetch();
$rest = $stmt->fetchAll();
echo $first["title"] . " | " . count($rest);
```

<details>
<summary>Show answer</summary>

```text
Clean Code | 7
```

`fetch()` took the first row. `fetchAll()` then returns only the rows that are **left**: 7 of them. A statement is like a queue; each row can be taken once.

</details>

---

## 🕵️ Code Detective: The Silent Search

```php
<?php
require "db.php";
$stmt = $pdo->prepare("SELECT title FROM books WHERE category = ?");
$books = $stmt->fetchAll();
echo count($books);   // always 0
```

- **Find the bug**: The search always finds 0 books, even for `Ethics`.
- **Explain**: The statement was prepared but never **run**. There is no `execute()`, so there are no rows to fetch.
- **Fix**: Add `$stmt->execute(["Ethics"]);` before `fetchAll()`. It then prints `2`.

---

## ⚠️ Common Mistake

**Gluing visitor input into SQL inside `query()`.**

- ❌ *Wrong*:
  ```php
  $stmt = $pdo->query("SELECT name FROM students WHERE id = " . $_GET["id"]);
  ```
- 😕 *What happens*: The visitor's text becomes part of the SQL command. A visitor can type SQL instead of a number and change what the command does (SQL injection, Chapter 29).
- ✅ *Fixed*: Validate, then use a placeholder:
  ```php
  $stmt = $pdo->prepare("SELECT name FROM students WHERE id = ?");
  $stmt->execute([$id]);
  ```

A second mistake: **printing `$e->getMessage()` from a failed connection to visitors.** The message names your server, user and database. Log it with `error_log()`, and show a friendly sentence.

---

## ✍️ Try It

With XAMPP's Apache and MySQL running and `db.php` saved in `htdocs/php-lab/`, create `shelf.php`:

```php
<?php
require "db.php";
$stmt = $pdo->query("SELECT title, category FROM books WHERE available = 'No'");
foreach ($stmt->fetchAll() as $b) {
  echo htmlspecialchars($b["title"]) . " (" . htmlspecialchars($b["category"]) . ")<br>";
}
```

Open `http://localhost/php-lab/shelf.php`. The page shows the books that are out on loan:

```text
Ethical Technology (Ethics)
Python Data Science (Data)
```

*Hint*: Now change it to use `prepare()` with `WHERE category = ?`, and read the category from `$_GET["cat"]`. Try `shelf.php?cat=Ethics`.

---

## 📝 Recap

- **PDO** is PHP's way of talking to databases; the visitor never reaches the database directly.
- A **DSN** such as `mysql:host=localhost;dbname=school_db;charset=utf8mb4` says which database to open.
- Connect once in `db.php`, inside `try` / `catch (PDOException $e)`. Log the real error; show visitors a calm message.
- XAMPP's `root` user with no password is for your own computer only.
- `query()` is for fixed SQL; `prepare()` + `execute([$value])` is for anything that includes visitor input.
- `fetch()` gives one row (or `false`), `fetchAll()` gives all rows, `fetchColumn()` gives one value. Escape every value you print.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. What does PDO stand for?
2. In the DSN `mysql:host=localhost;dbname=school_db;charset=utf8mb4`, which part names the database?
3. What does `fetch()` return when there are no more rows?
4. Which exception type does PDO throw?

<details>
<summary>Show answer</summary>

1. PHP Data Objects.
2. `dbname=school_db`.
3. `false`.
4. `PDOException`.

</details>

### 🟡 Level 2: Apply
1. A page lists donations for a cause chosen in a drop-down (`$_POST["cause"]`). Should it use `query()` or `prepare()`? Write the two lines that run the SQL.
2. Which fetch method fits each task? (a) Show the total number of students. (b) Show one book by its id. (c) List all students of Grade 9.

<details>
<summary>Show answer</summary>

1. `prepare()`, because the value comes from a visitor:
   ```php
   $stmt = $pdo->prepare("SELECT donor, amount FROM donations WHERE cause = ?");
   $stmt->execute([$cause]);
   ```
2. (a) `fetchColumn()` with `SELECT COUNT(*) FROM students`. (b) `fetch()`. (c) `fetchAll()` (or `fetch()` in a `while` loop).

</details>

### 🔴 Level 3: Challenge
Build `donations.php`, a page for the school's charity drive.

1. `require "db.php";`.
2. Read `$_GET["cause"]`. Accept only `Books`, `Clean Water` or `Food Pantry` (use `in_array()`, Chapter 16); otherwise use `Books`.
3. With `prepare()`, select `donor`, `amount` and `donated_on` from `donations` for that cause, newest first.
4. Show the rows in an HTML table, escaping every value.
5. Under the table, show the total with a second prepared query: `SELECT SUM(amount) FROM donations WHERE cause = ?` and `fetchColumn()`.

<details>
<summary>Show one possible answer</summary>

```php
<?php
require "db.php";

$allowed = ["Books", "Clean Water", "Food Pantry"];
$cause = $_GET["cause"] ?? "Books";
if (!in_array($cause, $allowed, true)) {
  $cause = "Books";
}

$stmt = $pdo->prepare(
  "SELECT donor, amount, donated_on FROM donations
   WHERE cause = ? ORDER BY donated_on DESC"
);
$stmt->execute([$cause]);
$rows = $stmt->fetchAll();

$sum = $pdo->prepare("SELECT SUM(amount) FROM donations WHERE cause = ?");
$sum->execute([$cause]);
$total = $sum->fetchColumn();
?>
<h1>Donations: <?= htmlspecialchars($cause) ?></h1>
<table>
  <tr><th>Donor</th><th>Amount</th><th>Date</th></tr>
  <?php foreach ($rows as $r): ?>
    <tr>
      <td><?= htmlspecialchars($r["donor"]) ?></td>
      <td><?= htmlspecialchars($r["amount"]) ?></td>
      <td><?= htmlspecialchars($r["donated_on"]) ?></td>
    </tr>
  <?php endforeach; ?>
</table>
<p>Total: <?= htmlspecialchars($total) ?></p>
```

For `?cause=Books` the table lists Omar (1000, 2026-09-26), Hafsa (3000, 2026-09-12) and Ahmad (1500, 2026-09-01), and the total is 5500.

</details>
