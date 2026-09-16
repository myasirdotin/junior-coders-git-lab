# Project 1: Dynamic Contact Form 📬🛡️

---

## 1. 🌟 Project Overview

In this capstone project, you will build a production-ready, fully responsive **Dynamic Contact Form** in PHP.

### Key Features You Will Build:
- **Clean Responsive UI**: Modern CSS with friendly typography, focus borders, and mobile adaptation.
- **Server-Side Validation**: Rigorous checks for empty inputs, name length, and email format.
- **XSS Sanitization**: Immune to script injection attacks using `htmlspecialchars()` and `trim()`.
- **Sticky Form Fields**: User inputs are preserved if validation fails so users never retype everything.
- **Dynamic Flash Alerts**: Context-aware success and error banners.

---

## 2. 🎯 Learning Outcomes Applied

- Chapter 3: PHP embedded inside HTML templates.
- Chapter 17: HTML Form handling via HTTP POST.
- Chapter 18: Security reasons for using `$_POST`.
- Chapter 19: Form validation, error tracking, and input sanitization.

---

## 3. 💻 Complete Production Code

Save this complete file as `contact.php`:

```php
<?php
  // Initialize state variables
  $name = "";
  $email = "";
  $subject = "";
  $message = "";
  $errors = [];
  $successMsg = "";

  // Process form submission
  if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // 1. Sanitize all incoming text
    $name = trim($_POST["name"] ?? "");
    $email = trim($_POST["email"] ?? "");
    $subject = trim($_POST["subject"] ?? "");
    $message = trim($_POST["message"] ?? "");

    // 2. Validate Name
    if (empty($name)) {
      $errors["name"] = "Full name is required.";
    } elseif (strlen($name) < 2) {
      $errors["name"] = "Name must be at least 2 characters long.";
    }

    // 3. Validate Email
    if (empty($email)) {
      $errors["email"] = "Email address is required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      $errors["email"] = "Please provide a valid email address.";
    }

    // 4. Validate Subject
    if (empty($subject)) {
      $errors["subject"] = "Please select a message subject.";
    }

    // 5. Validate Message
    if (empty($message)) {
      $errors["message"] = "Message body cannot be empty.";
    } elseif (strlen($message) < 10) {
      $errors["message"] = "Message must be at least 10 characters.";
    }

    // 6. Action on Valid Submission
    if (empty($errors)) {
      $successMsg = "Thank you, " . htmlspecialchars($name) . "! Your message has been received. Our team will contact you at " . htmlspecialchars($email) . " within 24 hours.";
      
      // In production: mail($to, $subject, $message, $headers);
      
      // Reset form fields after successful transmission
      $name = "";
      $email = "";
      $subject = "";
      $message = "";
    }
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Us - Junior Coders</title>
  <style>
    :root {
      --primary: #7c3aed;
      --primary-hover: #6d28d9;
      --text: #1e293b;
      --border: #cbd5e1;
      --danger: #dc2626;
      --success-bg: #dcfce7;
      --success-text: #166534;
    }
    body { font-family: 'Outfit', system-ui, sans-serif; background: #f8fafc; color: var(--text); padding: 2rem 1rem; margin: 0; }
    .contact-card { background: white; max-width: 550px; margin: 0 auto; padding: 2.5rem; border-radius: 16px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); }
    h1 { margin-top: 0; color: var(--primary); font-size: 1.8rem; }
    .form-group { margin-bottom: 1.25rem; }
    label { display: block; font-weight: 600; margin-bottom: 0.4rem; font-size: 0.9rem; }
    input, select, textarea { width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 8px; box-sizing: border-box; font-family: inherit; font-size: 0.95rem; }
    input:focus, select:focus, textarea:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(124,58,237,0.15); }
    .input-error { border-color: var(--danger) !important; background: #fff5f5; }
    .err-text { color: var(--danger); font-size: 0.8rem; margin-top: 0.3rem; font-weight: 500; }
    .alert-box { padding: 1rem 1.25rem; border-radius: 8px; margin-bottom: 1.5rem; line-height: 1.5; }
    .alert-success { background: var(--success-bg); color: var(--success-text); border: 1px solid #bbf7d0; }
    .btn-submit { background: var(--primary); color: white; border: none; padding: 0.85rem 1.75rem; border-radius: 8px; font-weight: 700; font-size: 1rem; cursor: pointer; width: 100%; transition: background 0.2s; }
    .btn-submit:hover { background: var(--primary-hover); }
  </style>
</head>
<body>

  <div class="contact-card">
    <h1>Get in Touch 💬</h1>
    <p style="color: #64748b; margin-bottom: 1.5rem;">Have questions about our Class 9 coding curriculum? Send us a note below!</p>

    <?php if ($successMsg): ?>
      <div class="alert-box alert-success">
        <strong>🎉 Message Dispatched!</strong><br>
        <?= $successMsg ?>
      </div>
    <?php endif; ?>

    <form action="" method="POST" novalidate>
      <div class="form-group">
        <label for="name">Full Name *</label>
        <input type="text" id="name" name="name" value="<?= htmlspecialchars($name) ?>" class="<?= isset($errors['name']) ? 'input-error' : '' ?>" placeholder="e.g. Zainab Ali">
        <?php if (isset($errors['name'])): ?>
          <div class="err-text"><?= $errors['name'] ?></div>
        <?php endif; ?>
      </div>

      <div class="form-group">
        <label for="email">Email Address *</label>
        <input type="email" id="email" name="email" value="<?= htmlspecialchars($email) ?>" class="<?= isset($errors['email']) ? 'input-error' : '' ?>" placeholder="you@example.com">
        <?php if (isset($errors['email'])): ?>
          <div class="err-text"><?= $errors['email'] ?></div>
        <?php endif; ?>
      </div>

      <div class="form-group">
        <label for="subject">Topic *</label>
        <select id="subject" name="subject" class="<?= isset($errors['subject']) ? 'input-error' : '' ?>">
          <option value="">-- Choose Subject --</option>
          <option value="Admission" <?= $subject === 'Admission' ? 'selected' : '' ?>>Course Admissions</option>
          <option value="Technical" <?= $subject === 'Technical' ? 'selected' : '' ?>>Technical Support</option>
          <option value="Feedback" <?= $subject === 'Feedback' ? 'selected' : '' ?>>Curriculum Feedback</option>
        </select>
        <?php if (isset($errors['subject'])): ?>
          <div class="err-text"><?= $errors['subject'] ?></div>
        <?php endif; ?>
      </div>

      <div class="form-group">
        <label for="message">Your Message *</label>
        <textarea id="message" name="message" rows="5" class="<?= isset($errors['message']) ? 'input-error' : '' ?>" placeholder="Type your inquiry here..."><?= htmlspecialchars($message) ?></textarea>
        <?php if (isset($errors['message'])): ?>
          <div class="err-text"><?= $errors['message'] ?></div>
        <?php endif; ?>
      </div>

      <button type="submit" class="btn-submit">Send Message 🚀</button>
    </form>
  </div>

</body>
</html>
```

---

## 4. 🧪 Project Verification Checklist

- [ ] Open `contact.php` in your browser.
- [ ] Click **Send Message** with empty fields: verify red error highlights and messages appear.
- [ ] Enter an invalid email like `test@`: verify email validation rejects it.
- [ ] Fill all fields correctly: verify the green success banner appears with your customized name and email!
