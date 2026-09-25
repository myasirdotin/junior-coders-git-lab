# Chapter 7: SQL Injection & Parameterized Defense 💉🗄️

Your database holds user records, grades, passwords, and private messages. If a web application pastes user input directly into an SQL command string, an attacker can manipulate the query's logic, dump the entire database, or delete all tables.

This is **SQL Injection (SQLi)**—and learning how to neutralize it completely is the sacred duty of every backend developer.

---

## 💡 The Mental Model: The Tricky Bank Slip

Imagine filling out a withdrawal slip at a bank with a pre-printed form:
- Pre-printed form: *"Please transfer $ [ Amount ] from Account [ Number ] to [ Payee ]"*
- Normal customer writes:
  - Amount: `50`
  - Account: `1234`
  - Payee: `Bookstore`
- An attacker writes:
  - Account: `1234 OR 1=1; TRANSFER ALL MONEY TO Attacker; --`
- If the clerk mechanically reads the text as a continuous set of commands without separating the data from the instructions, the bank is emptied!

---

## 💥 Anatomy of a Vulnerable SQL Query

Consider a vulnerable login script in PHP:

```php
// ❌ DANGEROUS VULNERABLE CODE: Direct String Concatenation!
$user = $_POST['username'];
$pass = $_POST['password'];

$sql = "SELECT * FROM users WHERE username = '$user' AND password = '$pass'";
```

Now imagine the attacker enters this into the username field:
```sql
admin' OR '1'='1' --
```

Look at what the server constructs and sends to MySQL:
```sql
SELECT * FROM users WHERE username = 'admin' OR '1'='1' --' AND password = '...'
```

### What Just Happened?
1. The single quote `'` closes the username string early.
2. `OR '1'='1'` makes the condition **always True**!
3. `--` is an SQL comment symbol, telling the database engine to **ignore the rest of the query** (including the password check)!
4. The database logs the attacker in as `admin` without requiring any password!

---

## 🛡️ The Silver Bullet: Prepared Statements (Parameterization)

How do we eliminate SQL injection forever?  
**Never concatenate user input into the SQL query string!**

Use **Prepared Statements** (parameterized queries). In a prepared statement, the database pre-compiles the SQL query structure *first*, and only then safely inserts the parameters as pure literal values:

```php
// ✅ 100% SECURE: Prepared Statement using PHP PDO
$stmt = $pdo->prepare("SELECT id, username, password_hash FROM users WHERE username = :username");

// Bind user input strictly as a parameter (never parsed as code!)
$stmt->execute([':username' => $user]);
$userData = $stmt->fetch();

// Verify password hash separately using bcrypt / argon2:
if ($userData && password_verify($pass, $userData['password_hash'])) {
    // Authenticated safely!
}
```

### Why Prepared Statements Are Invulnerable:
Even if the attacker enters `admin' OR '1'='1' --`, the database treats that entire string as the literal literal name of an account! It looks for a user whose actual username is literally `"admin' OR '1'='1' --"`. Finding none, it safely returns zero rows!

---

## 🧠 Checkpoint Quiz

1. **Why does string concatenation in SQL queries lead to vulnerabilities?**
   - *Answer: Because user input is mixed directly into the SQL command interpreter, allowing special characters like single quotes to break out of data context and execute unauthorized commands.*
2. **What does the SQL sequence `' OR '1'='1' --` do in a vulnerable query?**
   - *Answer: It forces the WHERE condition to evaluate to True and comments out the remainder of the query, bypassing authentication.*
3. **What is the definitive defense against SQL Injection?**
   - *Answer: Parameterized queries / Prepared statements with separate data binding.*

---

## 🎯 Hands-On Mission

Visit the **SQL Injection Visualizer** in our Cybersecurity Lab Studio:
1. Toggle between the Vulnerable Concatenation query and the Secure Prepared Statement.
2. Watch how the database engine separates the compiled execution tree from the parameter data!
