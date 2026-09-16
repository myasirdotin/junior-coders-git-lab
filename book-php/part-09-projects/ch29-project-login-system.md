# Project 3: Authentication & Session System 🔐🚪

---

## 1. 🌟 Project Overview

In this capstone project, you will build a complete **User Authentication System** with session tracking.
HTTP is a stateless protocol: it forgets who you are the moment a new page loads. PHP Sessions solve this by maintaining encrypted session IDs in cookies, allowing users to log in, navigate restricted dashboards, and log out securely.

### Key Features You Will Build:
- **Secure Login Flow (`login.php`)**: Validates credentials and initializes `$_SESSION`.
- **Session Authentication Guard (`dashboard.php`)**: Protects private pages from unauthorized access.
- **Member Dashboard**: Displays personalized user greeting and login timestamp.
- **Secure Logout Engine (`logout.php`)**: Unsets variables and completely destroys the session.

---

## 2. 🎯 Learning Outcomes Applied

- Chapter 8: If/Else decision logic.
- Chapter 13: `session_start()`, `header()`, and `exit`.
- Chapter 18: POST superglobals for password confidentiality.

---

## 3. 💻 Complete Production Code

### File 1: `login.php`

```php
<?php
  // 1. MUST be the very first statement on the page!
  session_start();

  // If already logged in, skip login page and go straight to dashboard!
  if (isset($_SESSION["logged_in"]) && $_SESSION["logged_in"] === true) {
    header("Location: dashboard.php");
    exit;
  }

  // Pre-registered student credentials (in real life: verified against MySQL DB)
  $validCredentials = [
    "admin@school.edu"   => "Class9Admin!",
    "student@school.edu" => "JuniorCoder2026"
  ];

  $error = "";

  if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = trim($_POST["email"] ?? "");
    $password = $_POST["password"] ?? "";

    if (isset($validCredentials[$email]) && $validCredentials[$email] === $password) {
      // 2. Set session variables
      $_SESSION["logged_in"] = true;
      $_SESSION["user_email"] = $email;
      $_SESSION["login_time"] = date("g:i A");

      // 3. Redirect to protected dashboard
      header("Location: dashboard.php");
      exit;
    } else {
      $error = "Invalid email or password combination!";
    }
  }
?>
<!DOCTYPE html>
<html>
<head>
  <title>Portal Login</title>
  <style>
    body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 90vh; background: #f1f5f9; margin:0; }
    .login-box { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); width: 320px; }
    input { width: 100%; padding: 10px; margin: 8px 0 16px; border: 1px solid #cbd5e1; border-radius: 6px; box-sizing: border-box; }
    button { width: 100%; background: #7c3aed; color: white; border: none; padding: 10px; border-radius: 6px; font-weight: bold; cursor: pointer; }
  </style>
</head>
<body>
  <div class="login-box">
    <h2 style="color:#7c3aed; margin-top:0;">Student Portal</h2>
    <?php if ($error): ?>
      <p style="color:red; font-size:0.85rem;"><?= $error ?></p>
    <?php endif; ?>
    <form action="login.php" method="POST">
      <label>Email:</label>
      <input type="email" name="email" value="student@school.edu" required>
      <label>Password:</label>
      <input type="password" name="password" value="JuniorCoder2026" required>
      <button type="submit">Sign In</button>
    </form>
  </div>
</body>
</html>
```

### File 2: `dashboard.php` (The Protected Member Area)

```php
<?php
  session_start();

  // 🛡️ SECURITY GUARD: Kick unauthorized visitors out!
  if (!isset($_SESSION["logged_in"]) || $_SESSION["logged_in"] !== true) {
    header("Location: login.php");
    exit;
  }
?>
<!DOCTYPE html>
<html>
<head>
  <title>Member Dashboard</title>
  <style>
    body { font-family: sans-serif; max-width: 600px; margin: 40px auto; padding: 20px; }
    .secret-box { background: #f5f3ff; border: 2px solid #7c3aed; border-radius: 8px; padding: 20px; margin: 20px 0; }
    .btn-logout { background: #dc2626; color: white; text-decoration: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; display: inline-block; }
  </style>
</head>
<body>

  <h1>Welcome, <?= htmlspecialchars($_SESSION["user_email"]) ?>! 🎉</h1>
  <p>Session initialized today at: <strong><?= $_SESSION["login_time"] ?></strong></p>

  <div class="secret-box">
    <h3>🔒 Restricted Member Content</h3>
    <p>This confidential exam preparation material is only visible because your session has been verified by the server!</p>
  </div>

  <a href="logout.php" class="btn-logout">Sign Out</a>

</body>
</html>
```

### File 3: `logout.php`

```php
<?php
  // 1. Resume active session
  session_start();

  // 2. Unset all session variables
  $_SESSION = [];

  // 3. Delete session cookie from browser
  if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
      $params["path"], $params["domain"],
      $params["secure"], $params["httponly"]
    );
  }

  // 4. Destroy server session file
  session_destroy();

  // 5. Redirect back to login screen
  header("Location: login.php");
  exit;
?>
```

---

## 4. 🧪 Project Verification Checklist

- [ ] Try opening `dashboard.php` directly in an incognito window: verify you are instantly bounced back to `login.php`.
- [ ] Log in with `student@school.edu` and `JuniorCoder2026`: verify you are welcomed into `dashboard.php`.
- [ ] Click **Sign Out**: verify your session is erased and you return to `login.php`.
