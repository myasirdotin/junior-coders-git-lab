# Chapter 29: Saving Data Safely with PDO

---

## 🌟 Real-Life Story

The school library keeps a lending register. When Aisha borrows a book, the librarian does two things: writes the loan in the register and takes the book off the shelf. Doing only one of them would cause trouble. A book missing with no record, or a record for a book still on the shelf. A careful librarian also checks every slip before writing in pen, because ink is hard to remove. Saving data in a database needs the same care: check first, write safely, and finish every job completely or not at all.

---

## 🎯 What You Will Learn

- Save a new row from a form with `INSERT` and **named placeholders** such as `:title`.
- Get the new row's number with `lastInsertId()`, and count changed rows with `rowCount()`.
- Change and remove rows safely with `UPDATE` and `DELETE`.
- Explain why building SQL from strings causes **SQL injection**, and how placeholders prevent it.
- Group several changes into one **transaction**, and redirect after `POST` (**PRG**).

---

## Named Placeholders

In Chapter 28 you used `?` placeholders. With many values, it is easy to mix up their order. **Named placeholders** give each value a name that starts with a colon:

```text
? placeholders:
  VALUES (?, ?, ?)
  execute([$t, $c, $p])

named placeholders:
  VALUES (:title, :category, :pages)
  execute(["title"    => $t,
           "category" => $c,
           "pages"    => $p])
```

The keys in the `execute()` array match the names in the SQL. The colon is optional in the keys, so `"title"` and `":title"` both work.

All examples in this chapter start with `require "db.php";`, the connection file from Chapter 28. Each output assumes the **fresh** `school_db` sample rows. The examples change the data, so if you run them one after another, some numbers will differ. You can rebuild the sample rows from the MySQL book at any time.

---

## INSERT: Adding a Row

The library receives a new book from a charity drive:

```php
<?php
require "db.php";

$stmt = $pdo->prepare(
  "INSERT INTO books (title, category, pages, available)
   VALUES (:title, :category, :pages, 'Yes')"
);
$stmt->execute([
  "title"    => "Water for Every Village",
  "category" => "Science",
  "pages"    => 196,
]);

$newId = $pdo->lastInsertId();
echo "Saved book number $newId";
```

Output:

```text
Saved book number 9
```

- The `books` table already had rows 1 to 8. The `id` column is `AUTO_INCREMENT` (MySQL book, Chapter 7), so MySQL gave the new row number `9` by itself.
- `$pdo->lastInsertId()` returns that new number **as a string**: `"9"`. Cast it with `(int)` if you need a number.
- `'Yes'` is written straight into the SQL. That is fine: it is our own fixed text, not visitor input.

---

## INSERT From a Form: Validate, Save, Redirect

Now a librarian adds books through a web form. Three steps, in this order:

1. **Validate** the input (Chapter 19). Placeholders stop SQL injection, but they do not stop nonsense such as `-5` pages.
2. **Save** with a prepared `INSERT`.
3. **Redirect** to a `GET` page.

Save this as `add-book.php` next to `db.php`:

```php
<?php
require "db.php";

$categories = ["Science", "Ethics", "Web", "Programming", "Art"];
$errors = [];
$title = "";
$category = "";
$pages = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  // 1. Validate
  $title = trim($_POST["title"] ?? "");
  $category = $_POST["category"] ?? "";
  $pages = trim($_POST["pages"] ?? "");

  if (strlen($title) < 2 || strlen($title) > 100) {
    $errors[] = "Title must be 2 to 100 characters.";
  }
  if (!in_array($category, $categories, true)) {
    $errors[] = "Please choose a category from the list.";
  }
  $pageCount = filter_var($pages, FILTER_VALIDATE_INT,
    ["options" => ["min_range" => 1, "max_range" => 2000]]);
  if ($pageCount === false) {
    $errors[] = "Pages must be a whole number from 1 to 2000.";
  }

  // 2. Save, only if there were no errors
  if (count($errors) === 0) {
    $stmt = $pdo->prepare(
      "INSERT INTO books (title, category, pages, available)
       VALUES (:title, :category, :pages, 'Yes')"
    );
    $stmt->execute([
      "title"    => $title,
      "category" => $category,
      "pages"    => $pageCount,
    ]);

    // 3. Redirect (PRG): the browser loads a fresh GET page
    header("Location: add-book.php?added=" . $pdo->lastInsertId());
    exit;
  }
}

$added = filter_var($_GET["added"] ?? "", FILTER_VALIDATE_INT);
?>
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Add a Book</title></head>
<body>
  <h1>Add a Library Book</h1>

  <?php if ($added !== false): ?>
    <p>Thank you! Book number <?= $added ?> was saved.</p>
  <?php endif; ?>

  <?php foreach ($errors as $error): ?>
    <p style="color:#b91c1c;"><?= htmlspecialchars($error) ?></p>
  <?php endforeach; ?>

  <form method="POST" action="add-book.php">
    <label for="title">Title</label>
    <input id="title" name="title" value="<?= htmlspecialchars($title) ?>" required>

    <label for="category">Category</label>
    <select id="category" name="category">
      <?php foreach ($categories as $c): ?>
        <option <?= $c === $category ? "selected" : "" ?>><?= htmlspecialchars($c) ?></option>
      <?php endforeach; ?>
    </select>

    <label for="pages">Pages</label>
    <input id="pages" name="pages" type="number" min="1" max="2000"
           value="<?= htmlspecialchars($pages) ?>" required>

    <button type="submit">Save book</button>
  </form>
</body>
</html>
```

After saving "Water for Every Village" (Science, 196 pages), the browser lands on `add-book.php?added=9` and shows:

```text
Thank you! Book number 9 was saved.
```

If the librarian types `0` pages, nothing is saved, and the form comes back with the title still filled in (a **sticky form**; the project in Chapter 30 uses the same idea):

```text
Pages must be a whole number from 1 to 2000.
```

### Why redirect? The PRG pattern

**PRG** means **Post / Redirect / Get**.

```text
Browser             Server
  | POST form ------> | validate, INSERT
  | <---- 302 Location: ?added=9
  | GET ?added=9 ---> | show "Saved!"
```

Without the redirect, the last thing the browser did was a `POST`. If the librarian presses **Refresh**, the browser asks "Send the form again?" One click, and the same book is saved twice. After a redirect, Refresh only repeats the harmless `GET`. Remember from Chapter 13: `header()` comes before any output, and `exit` comes straight after it.

---

## UPDATE and `rowCount()`

A book comes back from loan. Mark it as available:

```php
<?php
require "db.php";

$stmt = $pdo->prepare("UPDATE books SET available = 'Yes' WHERE id = :id");

foreach ([3, 99] as $id) {
  $stmt->execute(["id" => $id]);
  echo "Book $id: " . $stmt->rowCount() . " row(s) updated\n";
}
```

Output:

```text
Book 3: 1 row(s) updated
Book 99: 0 row(s) updated
```

- One prepared statement can be executed **many times** with different values.
- `rowCount()` tells you how many rows the last `UPDATE` or `DELETE` changed. `0` means no book has number 99, so you can tell the librarian "No such book".
- In MySQL, `rowCount()` counts rows that really **changed**. Setting `'Yes'` on a book that is already `'Yes'` counts as `0`.

---

## DELETE

A donation was typed twice by mistake. Remove the extra one:

```php
<?php
require "db.php";

$stmt = $pdo->prepare("DELETE FROM donations WHERE id = :id");
$stmt->execute(["id" => 8]);
echo "Deleted " . $stmt->rowCount() . " donation(s)";
```

Output:

```text
Deleted 1 donation(s)
```

Two safety rules for deleting:

- **Always** include a `WHERE`. `DELETE FROM donations` with no `WHERE` empties the whole table. MySQL does not ask "Are you sure?"
- Delete through a `POST` form with a button, never a plain link. Links are followed by browsers, previews and search robots, so a link could delete data without anyone clicking it.

---

## SQL Injection: Why We Never Build SQL From Strings

This section shows a **dangerous** example so that you can recognise it. Never use it in a real page.

❌ **BAD CODE (do not copy):** a donor search that glues the visitor's text into the SQL.

```php
<?php
require "db.php";

$name = $_GET["donor"] ?? "";   // the visitor types this
// ❌ DANGER: visitor text pasted straight into SQL
$sql = "SELECT donor, amount FROM donations WHERE donor = '$name'";
echo $sql . "\n";
$rows = $pdo->query($sql)->fetchAll();
echo "Found " . count($rows) . " donations\n";
```

A normal visitor types `Sara` and sees 1 donation. An attacker types this instead:

```text
x' OR '1'='1
```

Output:

```text
SELECT donor, amount FROM donations WHERE donor = 'x' OR '1'='1'
Found 8 donations
```

Look at the SQL that was built. The attacker's quote mark **closed** our string early. Their `OR '1'='1'` became part of the **command**. `'1'='1'` is always true, so the database returned every donor's private record. With other inputs an attacker could read other tables, such as user accounts. This is **SQL injection**, one of the most common attacks on websites.

✅ **SAFE CODE:** the same search with a placeholder.

```php
<?php
require "db.php";

$name = $_GET["donor"] ?? "";
$stmt = $pdo->prepare("SELECT donor, amount FROM donations WHERE donor = :donor");
$stmt->execute(["donor" => $name]);
echo "Found " . count($stmt->fetchAll()) . " donations\n";
```

Output for the same attack text:

```text
Found 0 donations
```

The SQL and the value travel separately. The database looks for a donor whose name is literally `x' OR '1'='1`. There is none, so the attack fails.

| Tool | Protects against |
| :--- | :--- |
| Placeholders (`?`, `:name`) | SQL injection (input reaching the **database**) |
| `htmlspecialchars()` | XSS (input reaching the **browser**) |
| Validation (`filter_var`, lengths, lists) | Nonsense and wrong values |

You need all three. They do different jobs.

One limit: placeholders hold **values** only, not table or column names. To let visitors choose a sort column, check their choice against an allow-list (`in_array()`) and only then put your own column name in the SQL.

---

## Transactions: All or Nothing

Lending a book needs **two** changes: mark the book as out, and write the loan. If the first works and the second fails (the server stops, a typo in the SQL), the data is now wrong: the book is "out" with no record of who has it.

A **transaction** groups changes so they succeed **together** or not at all:

| Method | Meaning |
| :--- | :--- |
| `$pdo->beginTransaction()` | Start: changes are now provisional |
| `$pdo->commit()` | Everything worked: make all changes permanent |
| `$pdo->rollBack()` | Something failed: undo every change since the start |

```php
<?php
require "db.php";

function borrowBook(PDO $pdo, int $studentId, int $bookId, string $day): int
{
  $pdo->beginTransaction();
  try {
    // Step 1: take the book off the shelf (only if it is there)
    $stmt = $pdo->prepare(
      "UPDATE books SET available = 'No' WHERE id = :book AND available = 'Yes'"
    );
    $stmt->execute(["book" => $bookId]);
    if ($stmt->rowCount() === 0) {
      throw new Exception("Book $bookId is not on the shelf.");
    }

    // Step 2: write the loan in the register
    $stmt = $pdo->prepare(
      "INSERT INTO loans (student_id, book_id, loan_date, returned)
       VALUES (:student, :book, :day, 'No')"
    );
    $stmt->execute(["student" => $studentId, "book" => $bookId, "day" => $day]);
    $loanId = (int) $pdo->lastInsertId();

    $pdo->commit();       // both steps worked: make them permanent
    return $loanId;
  } catch (Exception $e) {
    $pdo->rollBack();     // something failed: undo every step
    throw $e;             // pass the problem on to the caller
  }
}

$requests = [[6, 4], [7, 5]];   // [student id, book id]
foreach ($requests as $r) {
  try {
    $loanId = borrowBook($pdo, $r[0], $r[1], "2026-10-13");
    echo "Loan $loanId saved: student $r[0] has book $r[1].\n";
  } catch (Exception $e) {
    echo "Sorry: " . $e->getMessage() . "\n";
  }
}
```

Output:

```text
Loan 11 saved: student 6 has book 4.
Sorry: Book 5 is not on the shelf.
```

- `PDO $pdo` in the parameter list means "this must be a PDO object". A function cannot see variables from outside it (Chapter 11), so we pass the connection in as a parameter.
- `WHERE ... AND available = 'Yes'` makes the update succeed only for a book on the shelf. `rowCount()` of `0` means it was already out, so we throw.
- `throw $e;` inside `catch` sends the same problem on, after rolling back. The caller decides what to tell the visitor. A `PDOException` is a kind of `Exception`, so this `catch` handles database errors too.
- In practice you would use `date("Y-m-d")` for today's date. We fixed the date so the output is always the same.

### Breaking it on purpose

What if step 2 fails? Here the table name has a typo:

```php
<?php
require "db.php";

$pdo->beginTransaction();
try {
  $pdo->query("UPDATE books SET available = 'No' WHERE id = 7");
  $pdo->query("INSERT INTO loanz (student_id, book_id) VALUES (2, 7)"); // typo!
  $pdo->commit();
} catch (PDOException $e) {
  $pdo->rollBack();
  echo "Rolled back.\n";
}

$state = $pdo->query("SELECT available FROM books WHERE id = 7")->fetchColumn();
echo "Book 7 available: $state\n";
```

Output:

```text
Rolled back.
Book 7 available: Yes
```

The `UPDATE` did run, but `rollBack()` undid it. The register and the shelf still agree. (MySQL tables use the **InnoDB** storage engine by default, which supports transactions.)

---

## 🤝 Amānah: Stored Data Is a Trust

Every row you save belongs to a real person: a student's name, a family's donation, a borrower's history. Keeping it safe is an *Amānah*, a trust.

- **Collect only what you need.** A library loan needs a student id and a book id, not a home address.
- **Protect the keys.** `db.php` holds the database password. Never share it, post it online or upload it to a public code site. On a live server, use a database user with a strong password and only the rights it needs.
- **Never store real passwords.** Store `password_hash()` results only (Chapter 32).
- **Write carefully.** Placeholders for every value, a `WHERE` on every `UPDATE` and `DELETE`, transactions for jobs with several steps.
- **Keep backups, and delete what you no longer need.** Old data that nobody uses can still leak.
- **Be honest about errors.** Log the details, and tell people calmly when something could not be saved. Never pretend it worked.

---

## ⚠️ Common Mistake

**Thinking `htmlspecialchars()` protects SQL.**

- ❌ *Wrong*:
  ```php
  $name = htmlspecialchars($_GET["donor"]);
  $rows = $pdo->query("SELECT * FROM donations WHERE donor = '$name'");
  ```
- 😕 *What happens*: `htmlspecialchars()` is made for HTML, not SQL. It does nothing for a number written without quotes (`WHERE id = $id`), it changes the stored text (`Qur'an Club` is saved as `Qur&#039;an Club`), and the next query written in a hurry will forget it. SQL needs its own tool.
- ✅ *Fixed*: Placeholders for SQL; `htmlspecialchars()` only when printing:
  ```php
  $stmt = $pdo->prepare("SELECT * FROM donations WHERE donor = :donor");
  $stmt->execute(["donor" => $_GET["donor"] ?? ""]);
  ```

A second mistake: **a placeholder name that does not match the array key**, such as `:title` in the SQL but `"name" => ...` in `execute()`. PDO stops with an error such as `SQLSTATE[HY093]: Invalid parameter number: parameter was not defined`. Check the names letter by letter.

---

## ✍️ Try It

With XAMPP's MySQL running, create `return-book.php`:

```php
<?php
require "db.php";

$bookId = 5;   // later this will come from a POST form
$stmt = $pdo->prepare("UPDATE books SET available = 'Yes' WHERE id = :id");
$stmt->execute(["id" => $bookId]);

if ($stmt->rowCount() === 1) {
  echo "Book $bookId is back on the shelf.";
} else {
  echo "Book $bookId was not changed.";
}
```

The first time you open it, it prints:

```text
Book 5 is back on the shelf.
```

*Hint*: Refresh the page. Now it says `Book 5 was not changed.` Why? (Look back at the note about MySQL's `rowCount()`.) Then make it a `POST` form with a number box for the book id, validated with `filter_var()`.

---

## 📝 Recap

- `INSERT` with named placeholders (`:title`) and an array in `execute()`; `lastInsertId()` gives the new row's id.
- `UPDATE` and `DELETE` always need a `WHERE`; `rowCount()` says how many rows changed.
- Building SQL from strings lets visitors rewrite your command (SQL injection). Placeholders keep values separate.
- Validate first, then save, then redirect: **Post / Redirect / Get** stops double saves on Refresh.
- Transactions (`beginTransaction`, `commit`, `rollBack`) make several changes succeed together or not at all.
- Stored data is an *Amānah*: collect little, protect the password, write carefully, be honest about errors.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which method returns the id of the row you just inserted?
2. Which method tells you how many rows an `UPDATE` changed?
3. What do the letters PRG stand for?
4. Which method undoes every change since `beginTransaction()`?

<details>
<summary>Show answer</summary>

1. `$pdo->lastInsertId()` (it returns a string).
2. `$stmt->rowCount()`.
3. Post / Redirect / Get.
4. `$pdo->rollBack()`.

</details>

### 🟡 Level 2: Apply
1. Rewrite this unsafe line with a named placeholder:
   ```php
   $pdo->query("DELETE FROM loans WHERE id = " . $_POST["loan_id"]);
   ```
2. A visitor submits a donation form and then presses Refresh. The donation is saved twice. What is missing, and where?

<details>
<summary>Show answer</summary>

1. Validate first, then use a placeholder:
   ```php
   $loanId = filter_var($_POST["loan_id"] ?? "", FILTER_VALIDATE_INT,
     ["options" => ["min_range" => 1]]);
   if ($loanId !== false) {
     $stmt = $pdo->prepare("DELETE FROM loans WHERE id = :id");
     $stmt->execute(["id" => $loanId]);
   }
   ```
2. A redirect after the successful `INSERT`: `header("Location: donate.php?thanks=1");` followed by `exit;`. Then Refresh repeats only the `GET`.

</details>

### 🔴 Level 3: Challenge
Build `return-loan.php`, which records a returned book with a transaction.

1. Read `loan_id` from a `POST` form and validate it as a whole number of 1 or more.
2. Start a transaction.
3. Run `UPDATE loans SET returned = 'Yes' WHERE id = :id AND returned = 'No'`. If `rowCount()` is `0`, throw `new Exception("That loan is not open.")`.
4. Find the loan's `book_id` with a prepared `SELECT`, then set that book's `available` to `'Yes'`.
5. Commit, then redirect to `return-loan.php?done=1`. On any problem, roll back and show a friendly message.

<details>
<summary>Show one possible answer</summary>

```php
<?php
require "db.php";
$message = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $loanId = filter_var($_POST["loan_id"] ?? "", FILTER_VALIDATE_INT,
    ["options" => ["min_range" => 1]]);

  if ($loanId === false) {
    $message = "Please enter a valid loan number.";
  } else {
    $pdo->beginTransaction();
    try {
      $stmt = $pdo->prepare(
        "UPDATE loans SET returned = 'Yes' WHERE id = :id AND returned = 'No'"
      );
      $stmt->execute(["id" => $loanId]);
      if ($stmt->rowCount() === 0) {
        throw new Exception("That loan is not open.");
      }

      $stmt = $pdo->prepare("SELECT book_id FROM loans WHERE id = :id");
      $stmt->execute(["id" => $loanId]);
      $bookId = $stmt->fetchColumn();

      $stmt = $pdo->prepare("UPDATE books SET available = 'Yes' WHERE id = :book");
      $stmt->execute(["book" => $bookId]);

      $pdo->commit();
      header("Location: return-loan.php?done=1");
      exit;
    } catch (Exception $e) {
      $pdo->rollBack();
      error_log("Return failed for loan $loanId: " . $e->getMessage());
      $message = "Sorry, that return could not be saved: "
        . "please check the loan number.";
    }
  }
}
?>
<?php if (isset($_GET["done"])): ?>
  <p>Thank you! The book is back on the shelf.</p>
<?php endif; ?>
<p><?= htmlspecialchars($message) ?></p>
<form method="POST">
  <label for="loan_id">Loan number</label>
  <input id="loan_id" name="loan_id" type="number" min="1" required>
  <button type="submit">Record return</button>
</form>
```

With the sample data, loan `2` (Zayd, book 2) is open, so it works. Loan `1` is already returned, so it rolls back and shows the friendly message.

</details>
