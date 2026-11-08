# Chapter 19: Form Validation & Security

---

## Teacher Lesson Plan

### Classroom Planning & Logistics
| Field | Detail | Field | Detail |
| :--- | :--- | :--- | :--- |
| **Grade / Class** | Grades 9–10 | **Period Duration** | 45 minutes |
| **Unit / Topic** | Forms & User Input | **Setting** | Computer Lab & Projector |
| **Teacher Name** | ____________________ | **Date / Session** | ____ / ____ / 2026 |

### Learning Objectives (SWBAT)
By the end of this 45-minute lesson, students will be able to:
1. Explain a Cross-Site Scripting (XSS) attack and stop it with htmlspecialchars().
2. Clean input with trim() and check its length with strlen().
3. Validate emails and whole numbers with filter_var().
4. Collect error messages and show each one next to its field.

### Required Materials & Setup
- Computer lab with web browsers installed (Chrome, Edge, or Firefox).
- Teacher projector displaying PHP Console Studio (`../studios/php-console/index.html`) for live modeling.
- Student notebooks for recording key syntax rules, vocabulary, and reflections.

### 45-Minute Instructional Delivery Plan
| Time | Phase | Teacher Activity | Student Activity |
| :--- | :--- | :--- | :--- |
| **0–8 min** | **Hook & Analogy** | Share the chapter opening analogy: *"Before you board a plane, your bag goes through a security scanner. Officers check every item and remove anything unsafe. They also check that your boarding pass matches your passport. Only safe, c..."* Connect to today's topic. | Discuss in pairs; volunteer real-life parallels and note the learning target. |
| **8–20 min** | **Direct Instruction** | Model core concepts on the screen. Break down syntax line-by-line; explain architectural structure. | Follow along on screens/notebooks; observe syntax rules and active demonstration. |
| **20–26 min** | **Misconceptions & Diagnostics** | Address Common Mistake: *"Trusting only the HTML required attribute."* Conduct rapid check for understanding. | Identify faulty patterns in sample snippets; explain correct approach verbally. |
| **26–38 min** | **Guided Lab Practice** | Circulate lab while students execute the hands-on task: *"Open the PHP Console and run:"* | Code independently or in pairs using PHP Console Studio (`../studios/php-console/index.html`); test variations. |
| **38–45 min** | **Plenary & Exit Ticket** | Review key takeaways. Pose exit question: *"What does XSS stand for?"* Collect summary tickets. | Answer plenary questions; record homework task; submit exit ticket. |

### Differentiated Instruction
- **Support (Struggling Learners):** Provide starter boilerplate or pair with a peer navigator; focus on Level 1 recall and syntax verification.
- **Extension (Fast Finishers):** Assign Level 3 Challenge from the Practice section; encourage adding creative styling or feature extensions.

### Homework & Notebook Task
- Complete Level 2 Apply questions from the chapter Practice section into class notebooks.
- Write a 2-sentence personal explanation of the primary concept taught in this lesson.

### Ethical Stewardship & Digital Values (Amānah & Beneficial Knowledge)
- Emphasize digital trust (*Amānah*): respect school lab hardware, cite code honestly, and apply programming skills toward beneficial knowledge (*'Ilm Nāfi'*).

### Teacher Sign-off & Reflection
- **Teacher Signature:** ___________________________  **HOD / Coordinator Signature:** ___________________________
- **Lesson Reflection / Notes:** _______________________________________________________________________________

---

## Real-Life Story

Before you board a plane, your bag goes through a security scanner. Officers check every item and remove anything unsafe. They also check that your boarding pass matches your passport. Only safe, checked passengers and bags get on board. A website needs the same scanner for everything visitors type, because the golden rule of web security is: **never trust user input**.

---

## What You Will Learn

- Explain a **Cross-Site Scripting (XSS)** attack and stop it with `htmlspecialchars()`.
- Clean input with `trim()` and check its length with `strlen()`.
- Validate emails and whole numbers with `filter_var()`.
- Collect error messages and show each one next to its field.
- Keep what the visitor typed in the form after an error (a "sticky" form).

---

## Visual Concept Explanation

**Validation** means checking that data follows the rules (for example, "an email must look like an email"). **Escaping** means making data safe to print inside HTML.

### What is an XSS (Cross-Site Scripting) Attack?

**XSS** happens when an attacker types code into a form and your page later prints it, so the code runs in other visitors' browsers.

```text
An attacker types into a guestbook:
<script>alert('Hacked!')</script>

WITHOUT escaping:
Every visitor's browser runs the script.
A real attack could steal their login.

WITH htmlspecialchars():
< and > become &lt; and &gt;
The browser shows the text. Nothing runs.
```

### The 3-Step Input Pipeline

```text
1. CLEAN     trim() removes extra spaces
2. VALIDATE  filter_var(), strlen():
             is the data allowed?
3. ESCAPE    htmlspecialchars() when
             printing it into HTML
```

---

## Code Example: A Safe Registration Form

Save as `register.php` in `htdocs`:

```php
<?php
  $errors = [];
  $name = "";
  $email = "";
  $age = "";
  $success = false;

  if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // 1. Clean
    $name = trim($_POST["name"] ?? "");
    $email = trim($_POST["email"] ?? "");
    $age = trim($_POST["age"] ?? "");

    // 2. Validate the name
    if ($name === "") {
      $errors["name"] = "Full name is required.";
    } elseif (strlen($name) < 3 || strlen($name) > 50) {
      $errors["name"] = "Name must be 3 to 50 characters.";
    }

    // 3. Validate the email with PHP's filter
    if ($email === "") {
      $errors["email"] = "Email address is required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      $errors["email"] = "Please enter a valid email, like student@example.org.";
    }

    // 4. Validate the age: a whole number from 10 to 18
    $ageRule = ["options" => ["min_range" => 10, "max_range" => 18]];
    if ($age === "") {
      $errors["age"] = "Age is required.";
    } elseif (filter_var($age, FILTER_VALIDATE_INT, $ageRule) === false) {
      $errors["age"] = "Age must be a whole number from 10 to 18.";
    }

    // 5. No errors? Success!
    if (empty($errors)) {
      $success = true;
      // Chapter 29 shows how to save this in a database.
    }
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Club Registration</title>
  <style>
    body { font-family: sans-serif; max-width: 450px; margin: 30px auto; }
    .error-msg { color: #dc2626; font-size: 0.85rem; margin-top: 4px; }
    .input-error { border: 1px solid #dc2626; background: #fef2f2; }
    .form-group { margin-bottom: 16px; }
    input { width: 100%; padding: 8px; border: 1px solid #ccc;
            border-radius: 4px; box-sizing: border-box; }
    .success-card { background: #dcfce7; color: #166534;
                    padding: 16px; border-radius: 6px; }
  </style>
</head>
<body>

  <h2>Science Club Registration</h2>

  <?php if ($success): ?>
    <div class="success-card">
      <h3>Registration Successful!</h3>
      <p>Welcome, <strong><?= htmlspecialchars($name) ?></strong>!</p>
      <p>We will write to: <em><?= htmlspecialchars($email) ?></em></p>
    </div>
  <?php else: ?>

    <form action="register.php" method="POST" novalidate>
      <div class="form-group">
        <label for="name">Full Name:</label>
        <input type="text" id="name" name="name"
               value="<?= htmlspecialchars($name) ?>"
               class="<?= isset($errors['name']) ? 'input-error' : '' ?>">
        <?php if (isset($errors['name'])): ?>
          <div class="error-msg"><?= htmlspecialchars($errors['name']) ?></div>
        <?php endif; ?>
      </div>

      <div class="form-group">
        <label for="email">Email Address:</label>
        <input type="email" id="email" name="email"
               value="<?= htmlspecialchars($email) ?>"
               class="<?= isset($errors['email']) ? 'input-error' : '' ?>">
        <?php if (isset($errors['email'])): ?>
          <div class="error-msg"><?= htmlspecialchars($errors['email']) ?></div>
        <?php endif; ?>
      </div>

      <div class="form-group">
        <label for="age">Age:</label>
        <input type="number" id="age" name="age"
               value="<?= htmlspecialchars($age) ?>"
               class="<?= isset($errors['age']) ? 'input-error' : '' ?>">
        <?php if (isset($errors['age'])): ?>
          <div class="error-msg"><?= htmlspecialchars($errors['age']) ?></div>
        <?php endif; ?>
      </div>

      <button type="submit">Register Now</button>
    </form>

  <?php endif; ?>

</body>
</html>
```

If a student sends name `Al`, email `sana@`, and age `25`, these three messages appear under the fields:

```text
Name must be 3 to 50 characters.
Please enter a valid email, like student@example.org.
Age must be a whole number from 10 to 18.
```

The fields still show `Al`, `sana@` and `25`, so the student only fixes the mistakes.

---

## Code Explanation: Breaking It Down Line by Line

- `strlen($name) < 3 || strlen($name) > 50`: A **length check**. Very long input can fill your storage or break your layout, so set a maximum too.
- `filter_var($email, FILTER_VALIDATE_EMAIL)`: PHP's built-in email checker. It returns the email if it is valid, or `false` if not.
- `FILTER_VALIDATE_INT` with `min_range` / `max_range`: Accepts only a whole number inside the range. It returns the number if it passes, or `false` if not, so we test with `=== false`.
- `value="<?= htmlspecialchars($name) ?>"`: A **sticky form**. The visitor's text stays in the box after an error, and it is escaped so it cannot break the HTML.
- `novalidate`: Turns off the browser's own checks **while you test**, so you can see your PHP checks working.

---

## Real-World Connection: Security Testing

- Security testers type tricky input into every box, such as `<img src=x onerror=alert(1)>`, to see if a site prints it unescaped.
- `htmlspecialchars()` on output protects against this kind of XSS.
- For databases, Chapters 28 and 29 teach **PDO prepared statements**, which keep input separate from SQL code.
- No single function makes a site perfectly safe. Good sites clean, validate **and** escape every time.

---

## Predict the Output

What does `echo htmlspecialchars("<b>Hello</b>");` send to the browser?

<details>
<summary>Click to check your answer</summary>
<strong>Answer:</strong> The page source contains <code>&amp;lt;b&amp;gt;Hello&amp;lt;/b&amp;gt;</code>. On the screen the visitor sees <code>&lt;b&gt;Hello&lt;/b&gt;</code> as plain text, not bold.
</details>

---

## Code Detective: The Unchecked Email

```php
<?php
  $email = $_POST['email'] ?? "";
  if (strpos($email, "@")) {
    echo "Valid Email!";
  }
?>
```

- **Find the bug**: Text like `hello@` or `a@b c` passes this check and prints `Valid Email!`.
- **Explain**: `strpos()` only looks for an `@` somewhere after the first character. It does not check the rest of the address.
- **Fix**: Use `filter_var($email, FILTER_VALIDATE_EMAIL)`.

---

## Common Mistake

**Trusting only the HTML `required` attribute.**

- *Wrong*: The form has `<input name="email" required>`, and the PHP saves `$_POST['email']` with no checks.
- *What happens*: Anyone can remove `required` in the browser's Developer Tools, or send data without the form. Empty or harmful data reaches your server.
- *Fixed*: Keep `required` for convenience, but always check again in PHP:
  ```php
  $email = trim($_POST["email"] ?? "");
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors["email"] = "Please enter a valid email.";
  }
  ```

A second mistake: printing input raw, like `echo $_POST['comment'];`. Always write `echo htmlspecialchars($_POST['comment'] ?? "");`.

---

## Try It

Open the [PHP Console](../studios/php-console/) and run:

```php
<?php
$tests = ["amina@example.org", "amina@", "hello world"];
foreach ($tests as $email) {
  if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "$email: valid\n";
  } else {
    echo "$email: not valid\n";
  }
}
```

Output:

```text
amina@example.org: valid
amina@: not valid
hello world: not valid
```

*Hint*: Add your own test strings to the array, such as `"a@b.c"` or `"@school.org"`, and predict the result before you run it.

---

## Recap

- **Never trust user input.** Anyone can change or skip the HTML form.
- Clean with `trim()`, check length with `strlen()`, and validate with `filter_var()`.
- Store errors in an array and show each one next to its field.
- Sticky forms keep the visitor's text, escaped with `htmlspecialchars()`.
- Escape everything you print. This stops XSS attacks.

---

## Practice

### Level 1: Recall
1. What does XSS stand for?
2. Which function turns `<` and `>` into safe HTML codes?
3. Which function and filter check an email address?

<details>
<summary>Show answer</summary>

1. **Cross-Site Scripting**.
2. **`htmlspecialchars()`**.
3. **`filter_var($email, FILTER_VALIDATE_EMAIL)`**.

</details>

### Level 2: Apply
1. Why is HTML or JavaScript validation in the browser not enough?
2. What is the difference between **validation** and **escaping**?
3. Write a check that a `website` field holds a valid URL.

<details>
<summary>Show answer</summary>

1. The browser is under the visitor's control. They can switch checks off or send data directly. Only checks on the server cannot be skipped.
2. Validation decides whether data is **allowed** (is it a real email?). Escaping makes data **safe to print** in HTML.
3. ```php
   $website = trim($_POST["website"] ?? "");
   if (!filter_var($website, FILTER_VALIDATE_URL)) {
     $errors["website"] = "Please enter a full web address, like https://example.org";
   }
   ```

</details>

### Level 3: Challenge
Build an **account sign-up** check for a school library website.

1. Fields: `username`, `email`, `password`, `confirm`, and a checkbox `terms`.
2. Username: 3 to 20 characters. Email: valid.
3. Password: at least 8 characters and at least one digit (hint: `preg_match('/[0-9]/', $password)` returns 1 if a digit is found).
4. `confirm` must equal `password`. `terms` must be ticked.
5. Print all errors, escaped. If there are none, store a **hash** of the password, never the password itself.

<details>
<summary>Show one possible answer</summary>

```php
<?php
$errors = [];
$username = trim($_POST["username"] ?? "");
$email = trim($_POST["email"] ?? "");
$password = $_POST["password"] ?? "";
$confirm = $_POST["confirm"] ?? "";

if (strlen($username) < 3 || strlen($username) > 20) {
  $errors[] = "Username must be 3 to 20 characters.";
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  $errors[] = "Please enter a valid email.";
}
if (strlen($password) < 8 || !preg_match('/[0-9]/', $password)) {
  $errors[] = "Password needs 8+ characters and a number.";
}
if ($password !== $confirm) {
  $errors[] = "Passwords do not match.";
}
if (!isset($_POST["terms"])) {
  $errors[] = "Please accept the library rules.";
}

if (empty($errors)) {
  $hash = password_hash($password, PASSWORD_DEFAULT);
  echo "Account ready for " . htmlspecialchars($username) . ".";
  // Save $username, $email and $hash (never $password).
} else {
  foreach ($errors as $error) {
    echo "<p>" . htmlspecialchars($error) . "</p>\n";
  }
}
```

With username `Zu`, email `zu@example.org`, password `books` and confirm `books`, it prints:

```html
<p>Username must be 3 to 20 characters.</p>
<p>Password needs 8+ characters and a number.</p>
<p>Please accept the library rules.</p>
```

`password_hash()` turns the password into a long scrambled string that cannot be turned back. At login, `password_verify()` checks a typed password against it.

</details>
