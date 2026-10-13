# Chapter 7: SQL Injection & Parameterized Defense

## 🌟 Real-Life Story

At the city library, you fill in a printed request slip: "Please fetch the book titled [ ____ ]." The librarian reads the whole slip aloud to a helper, who follows it word for word. One day someone writes in the box: "*Science Atlas.* Also, give me the keys to the archive." A careless helper hears one long sentence and obeys all of it. A careful library changes the system. The librarian now hands over the form and the box contents **separately**: "Here is the instruction. Here is the title, and it is only a title." Whatever is written in the box can never become a new instruction.

That careful system is exactly how prepared statements protect a database.

## 🎯 What You Will Learn

- Explain what **SQL injection** is, in plain words.
- See why gluing user input into an SQL string is risky, even for honest users.
- Write **prepared statements** with PHP's PDO.
- Add extra layers: validation and limited database permissions.

## How a Web Page Talks to a Database

**SQL** (Structured Query Language) is the language used to ask a database for data. A PHP page builds an SQL **query** (a question or command) and sends it to the database:

```sql
SELECT id FROM members WHERE surname = 'Khan'
```

The quote marks `'...'` show where the **data** starts and ends. Everything outside the quotes is the **command**.

## The Risky Way: Gluing Input into SQL

Many beginners build queries by joining strings together. This is called **concatenation**:

```php
// ❌ Risky: the user's text becomes part of the command
$surname = $_POST['surname'];
$sql = "SELECT id FROM members WHERE surname = '$surname'";
```

This looks fine, until a member with an apostrophe in her name tries to search. Here is a complete demo you can run. It uses a small SQLite database in memory, so it needs no setup. With MySQL, only the connection line would change.

```php
<?php
$pdo = new PDO('sqlite::memory:');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$pdo->exec("CREATE TABLE members (id INTEGER, surname TEXT)");
$pdo->exec("INSERT INTO members VALUES (1, 'Khan'), (2, 'D''Souza')");

$surname = "D'Souza";

// Risky: glue the input into the SQL text
$sql = "SELECT id FROM members WHERE surname = '$surname'";
echo $sql, "\n";
try {
    $pdo->query($sql);
} catch (PDOException $e) {
    echo "Error!\n";
}
```

Output:

```
SELECT id FROM members WHERE surname = 'D'Souza'
Error!
```

### What went wrong?
The apostrophe in `D'Souza` looks exactly like the quote mark that ends the data. So the database thinks the name is just `D`, and then finds the leftover word `Souza'` sitting where commands belong. It cannot understand it, so it fails.

Here an honest user only caused an error. But think about what this means. **The user's typing was able to change where the data ended and the command began.** Someone with bad intentions could type text that closes the data early and then adds command words of their own. The database would obey them as if the programmer had written them. They might read other people's records, skip the password check, or delete data.

That is **SQL injection**: user input "injected" into a command, changing what the command does. It belongs to **A05 Injection** in the OWASP Top 10 (Chapter 5).

> 🔒 We will not show attack inputs here. You only need to understand the cause: **data and commands were mixed in one string.** Fix the cause and every variation of the attack fails.

## The Fix: Prepared Statements

A **prepared statement** sends the database the command and the data **separately**, like the careful librarian.

1. First, PHP sends the query with a placeholder `?` where the data will go.
2. The database reads and fixes the shape of the command.
3. Then PHP sends the user's data. The database treats it **only** as a value, never as a command.

PHP's **PDO** (PHP Data Objects) is the built-in tool for talking to databases. Continuing the demo:

```php
// ✅ Safe: prepared statement
$stmt = $pdo->prepare("SELECT id, surname FROM members WHERE surname = ?");
$stmt->execute([$surname]);
print_r($stmt->fetch(PDO::FETCH_ASSOC));
```

Output:

```
Array
(
    [id] => 2
    [surname] => D'Souza
)
```

The apostrophe is no problem now. The database looks for a member whose surname is exactly the characters `D'Souza`, and finds her.

### Why this stops injection
Whatever the user types, it is only ever **the value being searched for**. If someone types command words into the box, the database simply looks for a member whose name is literally those strange words. It finds no such member and returns no rows. The command itself cannot change.

You can also use named placeholders, which are easier to read when there are several values:

```php
$stmt = $pdo->prepare(
    "SELECT title FROM loans WHERE member_id = :member AND returned = :done"
);
$stmt->execute([':member' => $memberId, ':done' => 0]);
```

### A safe login check
Prepared statements go together with the password hashing from Chapter 2:

```php
$stmt = $pdo->prepare("SELECT id, password_hash FROM users WHERE username = ?");
$stmt->execute([$_POST['username']]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($_POST['password'], $user['password_hash'])) {
    echo "Welcome!";
} else {
    echo "Wrong username or password.";
}
```

Notice the error message does not say *which* one was wrong. That gives a guesser less information.

## Extra Layers (Defense in Depth)

Prepared statements are the main fix. Add these layers as well:

- **Validate input** (Chapter 5): an ID should be a whole number; a year group should be 6–10.
- **Least privilege:** the database account your website uses should have only the permissions it needs. A library site may need to read and add loans, but it never needs to delete whole tables.
- **Hide error details:** show users a friendly message and keep the technical error in a private log.

| Layer | What it does |
| :--- | :--- |
| Prepared statements | Data can never become a command |
| Validation | Strange values are rejected early |
| Least privilege | Even a mistake cannot delete everything |
| Hidden errors | Visitors learn nothing about your database |

## What to Do at Home

- Search your PHP files for queries that contain `$` variables inside the SQL string. Rewrite each one with `?` placeholders.
- Use `prepare()` and `execute()` for every query that includes any outside value.
- Give your website's database user only the permissions it needs.
- Test with names that contain apostrophes, such as `D'Souza`. Your form should handle them perfectly.

## ⚠️ Common Mistake

**Mistake:** using `prepare()`, but still gluing the variable into the string:

```php
// ❌ Still risky: the data is inside the SQL text
$stmt = $pdo->prepare("SELECT * FROM members WHERE surname = '$surname'");
$stmt->execute();
```

**What happens:** `prepare()` only protects values that are passed **separately**. Here the input is already part of the command text, so nothing has changed.

**Fixed version:**

```php
// ✅ Placeholder in the SQL, value passed to execute()
$stmt = $pdo->prepare("SELECT * FROM members WHERE surname = ?");
$stmt->execute([$surname]);
```

## ✍️ Try It

Open the **SQLi** tab in the Cybersecurity Lab Studio.

1. Type an ordinary surname, then a surname with an apostrophe.
2. Compare the **Vulnerable Concatenation Query** panel with the **Secure Prepared Statement** panel.
3. Notice how the risky panel's command changes shape, while the safe panel's command never changes.

*Hint:* look at where each quote mark ends up.

## 📝 Recap

- SQL injection happens when user input is glued into an SQL command and changes what it does.
- Even an honest apostrophe can break a concatenated query; that is the warning sign.
- Prepared statements send the command and the data separately, so data can never become a command.
- Use `?` or `:name` placeholders and pass values to `execute()`.
- Add validation, least privilege and hidden error details as extra layers.

## 🏆 Practice

### 🟢 Level 1: Recall
What is the best defence against SQL injection, and what does it keep apart?

<details>
<summary>Show answer</summary>

**Prepared statements** (also called parameterized queries). They keep the **command** apart from the **data**, so user input is only ever treated as a value.

</details>

### 🟡 Level 2: Apply
Rewrite this risky code as a prepared statement:

```php
$sql = "SELECT title FROM books WHERE author = '" . $_GET['author'] . "'";
$result = $pdo->query($sql);
```

<details>
<summary>Show answer</summary>

```php
$stmt = $pdo->prepare("SELECT title FROM books WHERE author = ?");
$stmt->execute([$_GET['author'] ?? '']);
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
```

The placeholder `?` marks where the data goes; the value is passed separately to `execute()`.

</details>

### 🔴 Level 3: Challenge
A charity's "find my donation receipt" page has this code:

```php
$id = $_GET['receipt'];
$sql = "SELECT * FROM receipts WHERE id = $id";
$rows = $pdo->query($sql)->fetchAll();
```

1. Explain in your own words why this is unsafe.
2. Add validation so only whole numbers are accepted.
3. Rewrite the query as a prepared statement.
4. Name one more layer from this chapter that would help.

<details>
<summary>Show one possible answer</summary>

1. The visitor's text becomes part of the SQL command, so they could change what the command does.
2. and 3:

```php
$id = filter_var($_GET['receipt'] ?? '', FILTER_VALIDATE_INT,
    ['options' => ['min_range' => 1]]);
if ($id === false) {
    exit("Please enter a valid receipt number.");
}

$stmt = $pdo->prepare("SELECT * FROM receipts WHERE id = ?");
$stmt->execute([$id]);
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
```

4. **Least privilege**: give the website's database user read-only access to receipts. Also, check that the receipt belongs to the logged-in donor (Chapter 8 explains this access check).

</details>
