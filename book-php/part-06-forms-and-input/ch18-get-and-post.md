# Chapter 18: Superglobals: GET vs POST ⚖️📬

---

## 1. 🌟 Real-Life Situation: Postcard vs. Sealed Envelope

Imagine sending mail to a friend:
1. **The Postcard (`GET`)**:
   - You write a short note on a postcard.
   - Anyone carrying the card—the mail carrier, the delivery driver, your neighbors—can read what is written on it!
   - You would send a vacation greeting on a postcard, but you would **NEVER write your bank account password on a postcard**!
2. **The Sealed Envelope (`POST`)**:
   - You put your letter inside an opaque envelope, seal it with glue, and drop it in the mailbox.
   - The contents are hidden from view inside the body of the delivery.
   - Perfect for confidential documents, secrets, and large parcels!

In web programming, **GET** and **POST** are the two primary HTTP request methods:
- `$_GET` sends data visible in the URL (like the postcard).
- `$_POST` sends data hidden in the request payload (like the sealed envelope).

---

## 2. 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- Understand what **Superglobals** are in PHP.
- Inspect URL query strings using `$_GET`.
- Receive secure form payloads using `$_POST`.
- Choose the correct method for every web scenario based on security and usability.
- Understand URL encoding (`%20` for spaces) and the 2,000-character GET limit.

---

## 3. 👁️ Visual Concept Explanation

### GET vs. POST Superglobals Compared

```text
+-----------------------------------------------------------------------------+
|                                 $_GET                                       |
|  URL: https://srinagar.edu.in/search.php?query=robotics&grade=9             |
|  • Data visible to everyone in address bar                                   |
|  • Can be bookmarked & shared with friends                                  |
|  • Size limit: ~2,048 characters                                            |
|  • NEVER use for passwords or credit cards!                                 |
+-----------------------------------------------------------------------------+
|                                 $_POST                                      |
|  URL: https://srinagar.edu.in/login.php                                     |
|  • Data hidden inside HTTP Request Body                                     |
|  • Cannot be bookmarked directly                                            |
|  • Size limit: Large (default 8MB to 40MB+)                                 |
|  • Mandatory for passwords, file uploads, and data changes                  |
+-----------------------------------------------------------------------------+
```

### What is a Superglobal?
In PHP, superglobals are special built-in arrays that are **automatically available everywhere**—in global code, inside functions, inside classes, without ever needing the `global` keyword!
Examples: `$_GET`, `$_POST`, `$_SERVER`, `$_SESSION`, `$_COOKIE`, `$_FILES`.

---

## 4. 💻 Code Example: Demonstrating Both Methods

### 1. The Search Filter (GET in Action)

```php
<!-- search.php -->
<?php
  $query = $_GET["q"] ?? "";
  $category = $_GET["cat"] ?? "all";
?>
<form action="search.php" method="GET">
  <input type="text" name="q" value="<?= htmlspecialchars($query) ?>" placeholder="Search library...">
  <select name="cat">
    <option value="all">All Books</option>
    <option value="science" <?= $category === 'science' ? 'selected' : '' ?>>Science</option>
    <option value="tech" <?= $category === 'tech' ? 'selected' : '' ?>>Technology</option>
  </select>
  <button type="submit">Search</button>
</form>

<?php if (!empty($query)): ?>
  <p>Search Results for: <strong><?= htmlspecialchars($query) ?></strong> in category: <em><?= htmlspecialchars($category) ?></em></p>
<?php endif; ?>
```

### 2. The Login Form (POST in Action)

```php
<!-- login.php -->
<?php
  if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = $_POST["user_email"] ?? "";
    $password = $_POST["user_password"] ?? "";

    // Secure authentication check
    if ($email === "student@srinagar.edu.in" && $password === "SecretPass2026!") {
      echo "<p style='color:green;'>✅ Access Granted! Welcome to your student portal.</p>";
    } else {
      echo "<p style='color:red;'>❌ Invalid credentials.</p>";
    }
  }
?>
<form action="login.php" method="POST">
  <input type="email" name="user_email" placeholder="Student Email" required><br><br>
  <input type="password" name="user_password" placeholder="Password" required><br><br>
  <button type="submit">Log In</button>
</form>
```

---

## 5. 🔍 Code Explanation: Breaking It Down Line by Line

- `search.php?q=robotics&cat=tech`: The `?` starts the query string. Each parameter is `name=value`, separated by `&`.
- `$_GET["q"]`: PHP automatically extracts `"robotics"` from the URL!
- `method="POST"` in `login.php`: Because the method is `POST`, the password is sent securely inside the HTTP request body. It does **not** appear in the browser address bar or server browser history!

---

## 6. 🌍 Real-World Connection: Shareable URLs vs Security

Think about how you use the web daily:
- When you search on **Google**, the URL is `google.com/search?q=php+tutorials`. You can copy that link and text it to a classmate, and they will see the exact same search! That is why GET is used for searches.
- When you enter your credit card on **Amazon**, you would never want your credit card number in the URL bar where anyone walking behind you could read it! That is why POST is used for payments and logins.

---

## 7. ⚠️ Common Beginner Traps

1. **Using GET for Passwords**:
   Using `method="GET"` on a login form prints passwords directly into the browser history and server access logs! Always use `POST`!
2. **Assuming POST is Encrypted on Its Own**:
   `POST` hides data from the URL, but on plain HTTP, data travels in clear text across Wi-Fi. Always use **HTTPS** (SSL) so the entire request is encrypted!

---

## 8. 🔮 Predict the Output

A user visits: `http://localhost/view.php?id=42&view=summary`

What does `$_GET['id']` contain?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> The string <code>"42"</code>.
</details>

---

## 9. 🕵️ Code Detective: The Broken Password Gate

```html
<!-- Developer wrote this registration form: -->
<form action="register.php" method="GET">
  <input type="password" name="pwd">
  <button type="submit">Create Account</button>
</form>
```

- **Find the critical security flaw**: The method is `GET`!
- **Explain**: When the user clicks submit, the address bar will show `register.php?pwd=MySuperSecretPassword123`!
- **Fix**: Change `method="GET"` to `method="POST"`.

---

## 10. 🏆 5 Levels of Mastery Exercises

### 🟢 Level 1: Recall
1. Name two differences between `$_GET` and `$_POST`.
2. Can a URL using `$_GET` be saved as a browser bookmark?
3. What symbol separates multiple parameters in a GET query string?

### 🟡 Level 2: Understand
4. Why is `GET` ideal for search filters and pagination links?
5. What is a superglobal variable, and why don't you need to write `global $_POST` inside functions?

### 🟠 Level 3: Apply
6. Build a Product Catalog Page that filters products based on URL parameters: `products.php?category=laptops&sort=price_low`. Read both values with `$_GET` and display the filter summary.

### 🔵 Level 4: Think & Troubleshoot
7. What is `$_REQUEST`, and why do cybersecurity experts recommend using explicit `$_GET` or `$_POST` instead of `$_REQUEST`?

### 🟣 Level 5: Create & Build
8. Build a Simple Calculator with URL Query Parameters: `calc.php?a=10&b=5&op=add`. Read parameters safely, validate they are numeric, perform the operation, and handle missing inputs gracefully with default values.
