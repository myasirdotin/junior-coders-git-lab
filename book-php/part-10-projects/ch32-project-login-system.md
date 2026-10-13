# Chapter 32: Project: Login & Session System 🔐

---

## 🌟 Real-Life Story

At the public library, you show your library card once at the front desk. The librarian checks it and gives you a visitor badge. Now you can walk between the reading rooms, and each room only needs to look at your badge. When you leave, you hand the badge back, and it no longer works. In this project the login page is the front desk, the **session** is the badge, and logging out hands it back.

---

## 🎯 What You Will Learn

- Explain why a website forgets you between pages, and how a **session** fixes it.
- Check a password safely with `password_hash()` and `password_verify()`.
- Protect a private page with a short "guard" at the top.
- Log a user out by clearing and destroying the session.

---

## 🧱 What You Will Build

Four small files in `C:\xampp\htdocs\login-project\`:

| File | Job |
| :--- | :--- |
| `make-hash.php` | Run once to turn a password into a hash |
| `login.php` | The front desk: checks email + password |
| `dashboard.php` | A private page, only for logged-in users |
| `logout.php` | Hands the badge back and returns to login |

It uses ideas from earlier chapters:

| Chapter | Idea used here |
| :--- | :--- |
| 8 | `if` / `else` decisions |
| 13 | `header("Location: ...")` and `exit` |
| 15 | An associative array of users |
| 18–19 | `$_POST`, `trim()`, `htmlspecialchars()` |
| 24 | `password_hash()` and `password_verify()` |

---

## 🎫 New Idea: Sessions

Each page request is separate. The server does not remember that you logged in one click ago. A **session** gives you a memory between pages.

```text
+--------------------------------+
| 1. login.php: password OK      |
|    session_start()             |
|    $_SESSION["user_email"] =.. |
+---------------+----------------+
                | browser keeps a
                | cookie with the
                | session ID
                v
+---------------+----------------+
| 2. dashboard.php               |
|    session_start() finds the   |
|    same $_SESSION data         |
+---------------+----------------+
                v
+---------------+----------------+
| 3. logout.php                  |
|    session_destroy()           |
+--------------------------------+
```

- `session_start()` starts a session, or picks up the one this visitor already has. Call it before any HTML is printed.
- `$_SESSION` is a **superglobal** array (like `$_POST`). What you put in it stays on the **server** for this visitor.
- The browser only gets a **session ID**: a long random code stored in a **cookie** (a small note the browser sends back with every request). The ID is random, not encrypted. Anyone who steals it could act as you, so it must be kept secret, and real sites use HTTPS.

---

## 🗺️ Build Steps

1. **Make the hashes.** Never store a real password. Run `make-hash.php` once and copy each hash into `login.php`.
2. **Build the front desk.** `login.php` finds the user's hash, checks it with `password_verify()`, and saves the email in `$_SESSION`.
3. **Add the guard.** `dashboard.php` sends anyone without a session back to `login.php`.
4. **Hand the badge back.** `logout.php` empties `$_SESSION`, deletes the cookie and destroys the session.

---

## 💻 Step 1: make-hash.php

```php
<?php
// Run once, copy the hash, then delete this file.
echo password_hash("Green-Garden-42", PASSWORD_DEFAULT);
```

Output (yours will be different every time, because each hash gets a new random **salt**, a random extra part mixed in):

```text
$2y$10$RY/2i2N7MaNXXPKuKUbHz.dKVAAtFtKXSPCO5ZPSDXFMy0oLVrjva
```

Both your hash and this one still match the same password. `password_verify()` reads the salt from inside the hash.

---

## 💻 Step 2: login.php

```php
<?php
  session_start();   // must come before any HTML

  // Already logged in? Go straight to the dashboard.
  if (isset($_SESSION["user_email"])) {
    header("Location: dashboard.php");
    exit;
  }

  // Sample users: email => password HASH (never the real password).
  // In a real site these rows come from a database (Chapters 28-29).
  $users = [
    "teacher@example.org" =>
      '$2y$10$RY/2i2N7MaNXXPKuKUbHz.dKVAAtFtKXSPCO5ZPSDXFMy0oLVrjva',
    "student@example.org" =>
      '$2y$10$NINP00RUxp04ERQJEjMXSORHwSjkD0UtQHj0Is07ZfwiXy7gLRk2G',
  ];

  $error = "";
  $email = "";

  if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = trim($_POST["email"] ?? "");
    $password = $_POST["password"] ?? "";
    $hash = $users[$email] ?? null;

    if ($hash !== null && password_verify($password, $hash)) {
      session_regenerate_id(true);   // a fresh badge after login
      $_SESSION["user_email"] = $email;
      $_SESSION["login_time"] = date("g:i A");

      header("Location: dashboard.php");
      exit;
    }
    // Same message for a wrong email or a wrong password
    $error = "Email or password is not correct.";
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Student Portal Login</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      background: #f1f5f9;
      margin: 0;
      padding: 3rem 1rem;
    }
    .login-box {
      background: white;
      max-width: 340px;
      margin: 0 auto;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    input {
      width: 100%;
      padding: 10px;
      margin: 8px 0 16px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      box-sizing: border-box;
    }
    button {
      width: 100%;
      background: #1d4ed8;
      color: white;
      border: none;
      border-radius: 6px;
      padding: 10px;
      font-weight: bold;
      cursor: pointer;
    }
    .error { color: #dc2626; }
  </style>
</head>
<body>
  <main class="login-box">
    <h1>Student Portal</h1>
    <?php if ($error): ?>
      <p class="error"><?= $error ?></p>
    <?php endif; ?>
    <form action="login.php" method="POST">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" required
             value="<?= htmlspecialchars($email) ?>">
      <label for="password">Password</label>
      <input type="password" id="password" name="password" required>
      <button type="submit">Sign In</button>
    </form>
  </main>
</body>
</html>
```

The password field never gets a `value`: we never print a password back into a page.

---

## 💻 Step 3: dashboard.php (the private page)

```php
<?php
  session_start();

  // GUARD: no badge? Back to the front desk.
  if (!isset($_SESSION["user_email"])) {
    header("Location: login.php");
    exit;
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Dashboard</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      max-width: 600px;
      margin: 40px auto;
      padding: 0 20px;
    }
    .private-box {
      background: #eff6ff;
      border: 2px solid #1d4ed8;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .btn-logout {
      background: #dc2626;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      padding: 8px 16px;
      display: inline-block;
    }
  </style>
</head>
<body>
  <h1>Welcome, <?= htmlspecialchars($_SESSION["user_email"]) ?>!</h1>
  <p>Signed in at <?= htmlspecialchars($_SESSION["login_time"]) ?>.</p>

  <div class="private-box">
    <h2>My Study Planner</h2>
    <p>Only signed-in students can see this page.</p>
  </div>

  <a href="logout.php" class="btn-logout">Sign Out</a>
</body>
</html>
```

The `exit` after `header()` matters. Without it, PHP keeps running and would still send the private part of the page.

---

## 💻 Step 4: logout.php

```php
<?php
  session_start();        // pick up the current session

  $_SESSION = [];         // 1. empty the session data

  // 2. tell the browser to delete the session cookie
  $params = session_get_cookie_params();
  setcookie(session_name(), "", time() - 3600,
    $params["path"], $params["domain"],
    $params["secure"], $params["httponly"]
  );

  session_destroy();      // 3. delete the session on the server

  header("Location: login.php");
  exit;
```

A cookie with a time in the past (`time() - 3600`, one hour ago) is deleted by the browser. A file that is only PHP does not need a closing `?>`.

---

## 🔍 How the Password Check Works

Here is the check on its own, with three tries:

```php
<?php
$users = [
  "teacher@example.org" =>
    '$2y$10$RY/2i2N7MaNXXPKuKUbHz.dKVAAtFtKXSPCO5ZPSDXFMy0oLVrjva',
];

$tries = [
  ["teacher@example.org", "Green-Garden-42"],
  ["teacher@example.org", "green-garden-42"],
  ["nobody@example.org", "Green-Garden-42"],
];

foreach ($tries as $try) {
  [$email, $password] = $try;
  $hash = $users[$email] ?? null;
  $ok = $hash !== null && password_verify($password, $hash);
  echo $email . " / " . $password . ": " . ($ok ? "welcome" : "refused") . "\n";
}
```

Output:

```text
teacher@example.org / Green-Garden-42: welcome
teacher@example.org / green-garden-42: refused
nobody@example.org / Green-Garden-42: refused
```

- `[$email, $password] = $try;` copies the two items of `$try` into two variables in one line.
- `$users[$email] ?? null`: an unknown email gives `null` instead of a warning.
- The hash is in **single quotes**. Inside double quotes PHP would see `$RY` as a variable and break the hash.
- `password_verify()` is case-sensitive: one small letter changed, and the password fails.
- The error message is the same for a wrong email and a wrong password, so a stranger cannot learn which emails exist.

---

## 🌍 Real-World Connection: Users in a Database

Real sites keep users in a database table, not in an array. You learned how in Chapters 28 and 29. The lookup uses a **PDO prepared statement**: the email is sent separately from the SQL, so it can never change the command.

```php
// $pdo is the connection from db.php (Chapter 28)
$stmt = $pdo->prepare("SELECT password_hash FROM users WHERE email = ?");
$stmt->execute([$email]);
$hash = $stmt->fetchColumn();   // false if no such user
```

The rest of the login stays the same: `password_verify($password, $hash)`.

---

## ⚠️ Common Mistake

**Storing and comparing real passwords.**

- ❌ *Wrong*:
  ```php
  $users = ["student@example.org" => "Blue-River-17"];
  if ($users[$email] === $password) { /* log in */ }
  ```
- 😕 *What happens*: Anyone who sees the file, a backup or the database learns every password. People reuse passwords, so their other accounts are in danger too. This breaks the trust (*Amānah*) users give you.
- ✅ *Fixed*: Store only `password_hash()` output, and check with `password_verify($password, $hash)`.

A second mistake: forgetting `exit;` after `header("Location: ...")` in the guard. The redirect is sent, but the private page is also sent underneath it.

---

## ✍️ Try It

Save the four files in `C:\xampp\htdocs\login-project\`, start Apache, and test:

- [ ] Open `http://localhost/login-project/dashboard.php` in a private window. You are sent to `login.php`.
- [ ] Sign in with `teacher@example.org` and `Green-Garden-42`. The dashboard welcomes you.
- [ ] Sign out, then try `green-garden-42` (small g). You see the error, and your email stays in the box.
- [ ] After signing out, press the browser's Back button and reload. You are sent to `login.php` again.
- [ ] Open `login.php` and search for `Green-Garden-42`. It is not there: only its hash is.

*Hint*: The student account's hash was made from `Blue-River-17`. Make your own account: run `make-hash.php` with a new password and add a new line to `$users`.

---

## 📝 Recap

- The web forgets you between pages; `session_start()` and `$_SESSION` give each visitor a memory on the server.
- The browser keeps only a random session ID in a cookie, so keep it secret and use HTTPS on real sites.
- Store only password **hashes**; check them with `password_verify()`.
- Every private page starts with a guard: no session, then `header()` and `exit`.
- Log out by emptying `$_SESSION`, deleting the cookie and calling `session_destroy()`.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which function must every page that uses `$_SESSION` call first?
2. Which two functions make and check a password hash?
3. Why do we call `session_regenerate_id(true)` right after a good login?

<details>
<summary>Show answer</summary>

1. `session_start()`.
2. `password_hash()` makes the hash; `password_verify()` checks a typed password against it.
3. It gives the visitor a **new** session ID. If someone had learned the old ID before login, it is now useless.

</details>

### 🟡 Level 2: Apply
Add a second private page, `planner.php`, that shows "Hello, (email)" and only works for logged-in users. Write its PHP part.

<details>
<summary>Show answer</summary>

```php
<?php
session_start();

if (!isset($_SESSION["user_email"])) {
  header("Location: login.php");
  exit;
}

echo "<h1>Hello, " . htmlspecialchars($_SESSION["user_email"]) . "</h1>";
```

The guard is the same three lines as in `dashboard.php`. Every private page needs it; forgetting it on one page leaves that page open.

</details>

### 🔴 Level 3: Challenge
Give each user a **role**: `teacher` or `student`.

1. Change `$users` so each email holds an array with `hash` and `role`.
2. After login, save the role in `$_SESSION["role"]`.
3. Make `marks.php`, a page only teachers may open. Students see "Teachers only." and a link back to the dashboard.
4. Extra: after three wrong passwords in one session, show "Please wait and try again later." and do not check the password.

<details>
<summary>Show one possible answer</summary>

In `login.php`:

```php
<?php
$users = [
  "teacher@example.org" => [
    "hash" => '$2y$10$RY/2i2N7MaNXXPKuKUbHz.dKVAAtFtKXSPCO5ZPSDXFMy0oLVrjva',
    "role" => "teacher",
  ],
  "student@example.org" => [
    "hash" => '$2y$10$NINP00RUxp04ERQJEjMXSORHwSjkD0UtQHj0Is07ZfwiXy7gLRk2G',
    "role" => "student",
  ],
];

$email = "student@example.org";
$password = "Blue-River-17";
$user = $users[$email] ?? null;

if ($user !== null && password_verify($password, $user["hash"])) {
  echo "Logged in as " . $user["role"];
  // real page: $_SESSION["user_email"] = $email;
  //            $_SESSION["role"] = $user["role"];
}
```

Output:

```text
Logged in as student
```

`marks.php`:

```php
<?php
session_start();

if (!isset($_SESSION["user_email"])) {
  header("Location: login.php");
  exit;
}
if (($_SESSION["role"] ?? "") !== "teacher") {
  echo '<p>Teachers only. <a href="dashboard.php">Back</a></p>';
  exit;
}
echo "<h1>Class marks</h1>";
```

For the extra task, count failures in the session: `$_SESSION["fails"] = ($_SESSION["fails"] ?? 0) + 1;` after a wrong password, check `if (($_SESSION["fails"] ?? 0) >= 3)` before `password_verify()`, and reset it to `0` after a good login. A visitor can start a new session to escape this, so real sites also count failures per account in the database.

</details>
