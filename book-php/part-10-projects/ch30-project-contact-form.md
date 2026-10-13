# Chapter 30: Project: Dynamic Contact Form 📬

---

## 🌟 Real-Life Story

At the school office there is a stack of paper contact slips. A parent writes a name, a phone number and a question, then hands it over. A careful clerk checks the slip first: is the name filled in, and does the phone number look real? If something is missing, the clerk hands the slip back with the problem circled. The good slips go into a tray for the head teacher. In this project you build that careful clerk in PHP.

---

## 🎯 What You Will Learn

- Combine a form, validation and output escaping in one working page.
- Keep the visitor's answers in the form when something is wrong (a **sticky form**).
- Show a clear error message under each field that needs fixing.
- Save each good message to a file with `FILE_APPEND | LOCK_EX`.
- Wrap long lines of HTML and CSS so code stays easy to read.

---

## 🧱 What You Will Build

One file, `contact.php`, that does everything:

- **A friendly form** with name, email, topic and message fields that works on a phone.
- **Server-side validation**: empty fields, name length, email format, an allowed topic, message length.
- **Safe output**: every value the visitor typed is printed through `htmlspecialchars()`, so no `<script>` can run (no **XSS**, Chapter 19).
- **Sticky fields**: if validation fails, the visitor's text stays in the boxes.
- **A saved message**: good messages are added to `messages.txt`, one line each.

It uses ideas from earlier chapters:

| Chapter | Idea used here |
| :--- | :--- |
| 3 | PHP inside HTML, `<?= ... ?>`, `if (): ... endif;` |
| 16 | `in_array()` to check the topic |
| 17–18 | Reading `$_POST` after a `POST` form |
| 19 | `trim()`, `filter_var()`, `htmlspecialchars()` |
| 21 | `file_put_contents()` with `FILE_APPEND \| LOCK_EX` |

---

## 🗺️ Build Steps

Build the page in four steps. Test after each one.

```text
+--------------------------------+
| Step 1: start empty variables  |
+---------------+----------------+
                v
+---------------+----------------+
| Step 2: on POST, trim + check  |
|         every field            |
+---------------+----------------+
                v
+---------------+----------------+
| Step 3: no errors? save + thank|
+---------------+----------------+
                v
+---------------+----------------+
| Step 4: HTML form, sticky      |
|         values, error text     |
+--------------------------------+
```

1. **Start empty.** Create `$name`, `$email`, `$subject`, `$message` as empty strings and `$errors` as an empty array. The form can then print them safely on the first visit.
2. **Check the input.** Only when the form was sent (`POST`), read each field with `trim($_POST[...] ?? "")`. Add a message to `$errors["field"]` for each problem.
3. **Save and thank.** If `$errors` is still empty, append the message to `messages.txt` and set a thank-you message.
4. **Draw the form.** Print each saved value inside `value="..."` with `htmlspecialchars()`. Under each field, print its error if there is one.

---

## 💻 Complete Code: contact.php

Save this file as `htdocs/contact-project/contact.php`. Long tags are split over several lines; HTML does not mind.

```php
<?php
  // Step 1: start with empty values
  $name = "";
  $email = "";
  $subject = "";
  $message = "";
  $errors = [];
  $successMsg = "";
  $allowedTopics = ["Admission", "Technical", "Feedback"];

  // Step 2: check the input, only when the form was sent
  if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = trim($_POST["name"] ?? "");
    $email = trim($_POST["email"] ?? "");
    $subject = trim($_POST["subject"] ?? "");
    $message = trim($_POST["message"] ?? "");

    if ($name === "") {
      $errors["name"] = "Full name is required.";
    } elseif (strlen($name) < 2 || strlen($name) > 60) {
      $errors["name"] = "Name must be 2 to 60 characters.";
    }

    if ($email === "") {
      $errors["email"] = "Email address is required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      $errors["email"] = "Please give a valid email address.";
    }

    if (!in_array($subject, $allowedTopics, true)) {
      $errors["subject"] = "Please choose a topic from the list.";
    }

    if (strlen($message) < 10) {
      $errors["message"] = "Message must be at least 10 characters.";
    } elseif (strlen($message) > 1000) {
      $errors["message"] = "Message must be 1000 characters or fewer.";
    }

    // Step 3: no errors? save the message and say thank you
    if (empty($errors)) {
      $record = [
        "sent_at" => date("Y-m-d H:i"),
        "name"    => $name,
        "email"   => $email,
        "subject" => $subject,
        "message" => $message,
      ];
      file_put_contents(
        "messages.txt",
        json_encode($record) . "\n",
        FILE_APPEND | LOCK_EX
      );

      $successMsg = "Thank you, " . htmlspecialchars($name)
        . "! Your message is saved for the school office.";

      // Empty the form for the next message
      $name = $email = $subject = $message = "";
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
      --primary: #1d4ed8;
      --text: #1e293b;
      --border: #cbd5e1;
      --danger: #dc2626;
    }
    body {
      font-family: system-ui, sans-serif;
      background: #f8fafc;
      color: var(--text);
      margin: 0;
      padding: 2rem 1rem;
    }
    .contact-card {
      background: white;
      max-width: 550px;
      margin: 0 auto;
      padding: 2rem;
      border-radius: 16px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
    }
    h1 { margin-top: 0; color: var(--primary); }
    .form-group { margin-bottom: 1.25rem; }
    label { display: block; font-weight: 600; margin-bottom: 0.4rem; }
    input, select, textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--border);
      border-radius: 8px;
      box-sizing: border-box;
      font: inherit;
    }
    input:focus, select:focus, textarea:focus {
      outline: 3px solid rgba(29, 78, 216, 0.25);
      border-color: var(--primary);
    }
    .input-error { border-color: var(--danger); }
    .err-text { color: var(--danger); font-size: 0.85rem; margin-top: 0.3rem; }
    .alert-success {
      background: #dcfce7;
      color: #166534;
      border: 1px solid #bbf7d0;
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1.5rem;
    }
    .btn-submit {
      width: 100%;
      background: var(--primary);
      color: white;
      border: none;
      border-radius: 8px;
      padding: 0.85rem;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <main class="contact-card">
    <h1>Get in Touch</h1>
    <p>Questions about our Class 9 coding course? Send us a note.</p>

    <?php if ($successMsg): ?>
      <div class="alert-success"><?= $successMsg ?></div>
    <?php endif; ?>

    <form action="contact.php" method="POST" novalidate>
      <div class="form-group">
        <label for="name">Full Name *</label>
        <input type="text" id="name" name="name"
               value="<?= htmlspecialchars($name) ?>"
               class="<?= isset($errors['name']) ? 'input-error' : '' ?>"
               placeholder="e.g. Zainab Ali">
        <?php if (isset($errors['name'])): ?>
          <div class="err-text"><?= $errors['name'] ?></div>
        <?php endif; ?>
      </div>

      <div class="form-group">
        <label for="email">Email Address *</label>
        <input type="email" id="email" name="email"
               value="<?= htmlspecialchars($email) ?>"
               class="<?= isset($errors['email']) ? 'input-error' : '' ?>"
               placeholder="you@example.org">
        <?php if (isset($errors['email'])): ?>
          <div class="err-text"><?= $errors['email'] ?></div>
        <?php endif; ?>
      </div>

      <div class="form-group">
        <label for="subject">Topic *</label>
        <select id="subject" name="subject"
                class="<?= isset($errors['subject']) ? 'input-error' : '' ?>">
          <option value="">-- Choose a topic --</option>
          <option value="Admission"
            <?= $subject === 'Admission' ? 'selected' : '' ?>>Course Admissions</option>
          <option value="Technical"
            <?= $subject === 'Technical' ? 'selected' : '' ?>>Technical Help</option>
          <option value="Feedback"
            <?= $subject === 'Feedback' ? 'selected' : '' ?>>Course Feedback</option>
        </select>
        <?php if (isset($errors['subject'])): ?>
          <div class="err-text"><?= $errors['subject'] ?></div>
        <?php endif; ?>
      </div>

      <div class="form-group">
        <label for="message">Your Message *</label>
        <textarea id="message" name="message" rows="5"
                  class="<?= isset($errors['message']) ? 'input-error' : '' ?>"
                  placeholder="Type your question here..."
        ><?= htmlspecialchars($message) ?></textarea>
        <?php if (isset($errors['message'])): ?>
          <div class="err-text"><?= $errors['message'] ?></div>
        <?php endif; ?>
      </div>

      <button type="submit" class="btn-submit">Send Message</button>
    </form>
  </main>
</body>
</html>
```

When Zainab sends a good message, one line is added to `messages.txt`. It is shown here on three lines to fit the page, and your date and time will differ:

```text
{"sent_at":"2026-10-13 09:15","name":"Zainab Ali",
"email":"zainab@example.org","subject":"Feedback",
"message":"The loops chapter really helped me."}
```

---

## 🔍 How the Code Works

- `$allowedTopics` and `in_array($subject, $allowedTopics, true)`: a visitor can change a `<select>` with browser tools and send any text. Checking against a fixed list (an **allow-list**) means only your three topics are accepted.
- `strlen($message) > 1000`: a **maximum length** stops someone filling your file with a huge message.
- `json_encode($record) . "\n"`: turns the array into one line of text. A message with line breaks still stays on one line, because JSON writes a line break as `\n`.
- `FILE_APPEND | LOCK_EX`: adds to the end of the file and locks it while writing, so two messages sent at once do not get mixed (Chapter 21).
- `value="<?= htmlspecialchars($name) ?>"`: the **sticky** value. Escaping it means a name like `"><script>` is shown as text, not run as code.
- `<?= $errors['name'] ?>`: these messages are written by us, not by the visitor, so they are safe to print as they are.
- `action="contact.php"`: the form posts back to the same file. We write the file name ourselves and never print `$_SERVER['PHP_SELF']`.
- `novalidate`: switches off the browser's own checks so you can test that the **server** checks work. Browser checks are helpful, but anyone can skip them.

Here is the validation part on its own, tested with a bad submission:

```php
<?php
// Pretend the visitor sent these values
$_POST = [
  "name"    => " A ",
  "email"   => "test@",
  "subject" => "Other",
  "message" => "Hi",
];
$allowedTopics = ["Admission", "Technical", "Feedback"];
$errors = [];

$name = trim($_POST["name"] ?? "");
$email = trim($_POST["email"] ?? "");
$subject = trim($_POST["subject"] ?? "");
$message = trim($_POST["message"] ?? "");

if ($name === "") {
  $errors["name"] = "Full name is required.";
} elseif (strlen($name) < 2 || strlen($name) > 60) {
  $errors["name"] = "Name must be 2 to 60 characters.";
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  $errors["email"] = "Please give a valid email address.";
}
if (!in_array($subject, $allowedTopics, true)) {
  $errors["subject"] = "Please choose a topic from the list.";
}
if (strlen($message) < 10) {
  $errors["message"] = "Message must be at least 10 characters.";
}

foreach ($errors as $field => $text) {
  echo "$field: $text\n";
}
```

Output:

```text
name: Name must be 2 to 60 characters.
email: Please give a valid email address.
subject: Please choose a topic from the list.
message: Message must be at least 10 characters.
```

---

## 🤝 Amānah: Messages Are a Trust

People trust you with their name, email and question. Keep only what you need, and never show the file to others.

`messages.txt` sits inside `htdocs`, so anyone could open `http://localhost/contact-project/messages.txt`. That is fine on your own computer for practice. On a real website, save the file in a folder **outside** the public web folder, or save the messages in a database with PDO (Chapters 28 and 29).

---

## ⚠️ Common Mistake

**Escaping a value too early, or not at all.**

- ❌ *Wrong*: `$name = htmlspecialchars(trim($_POST["name"]));` and then later `<?= htmlspecialchars($name) ?>` again.
- 😕 *What happens*: The name `Ali & Sons` is escaped twice. The page shows `Ali &amp; Sons`. And the saved file holds `&amp;` instead of the real text.
- ✅ *Fixed*: Keep the real text in your variables and in the file. Escape **once, at the moment you print** into HTML: `<?= htmlspecialchars($name) ?>`.

The opposite mistake is worse: printing `<?= $name ?>` with no escaping at all lets a visitor run their own JavaScript on your page.

---

## ✍️ Try It

Save `contact.php` in `C:\xampp\htdocs\contact-project\`, start Apache, and open `http://localhost/contact-project/contact.php`. Then check each item:

- [ ] Click **Send Message** with all fields empty. Red borders and four error messages appear.
- [ ] Type the email `test@`. The email error appears, and your name stays in its box.
- [ ] Type `<b>Hi</b>` as your name with a bad email. The box shows `<b>Hi</b>` as plain text, not bold.
- [ ] Fill every field correctly. The green thank-you box appears and the form is empty again.
- [ ] Open `messages.txt` in your editor. Your message is there on one line.

*Hint*: If the page shows PHP code instead of the form, you opened the file by double-clicking it. Use `http://localhost/...`.

---

## 📝 Recap

- A contact form needs three jobs: **check** the input, **save** it, and **show** it safely.
- Trim every field, then check emptiness, length, format (`filter_var`) and allowed choices (`in_array`).
- Store errors in an array keyed by field name, and print each one under its field.
- Sticky fields keep the visitor's text; print them with `htmlspecialchars()`.
- Save with `FILE_APPEND | LOCK_EX`, and treat saved messages as a trust (*Amānah*).

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which function checks that an email address has a valid format?
2. Which two flags make `file_put_contents()` add to the end of a file and lock it?
3. What is a "sticky" form field?

<details>
<summary>Show answer</summary>

1. `filter_var($email, FILTER_VALIDATE_EMAIL)`.
2. `FILE_APPEND | LOCK_EX`.
3. A field that keeps what the visitor typed after the page reloads, so they do not type it again.

</details>

### 🟡 Level 2: Apply
Add an optional **phone** field to the form. It may be empty. If it is filled in, it must contain only digits and be 10 digits long. Write the PHP check.

<details>
<summary>Show answer</summary>

```php
<?php
$errors = [];
$phone = trim($_POST["phone"] ?? "98765x3210");

if ($phone !== "" && (!ctype_digit($phone) || strlen($phone) !== 10)) {
  $errors["phone"] = "Phone must be exactly 10 digits.";
}

echo $errors["phone"] ?? "Phone is fine";
```

Output (with the sample value `98765x3210`):

```text
Phone must be exactly 10 digits.
```

`ctype_digit()` is a new built-in function: it returns `true` only when every character of a string is a digit 0–9. In the HTML, add `value="<?= htmlspecialchars($phone) ?>"` so the field is sticky too.

</details>

### 🔴 Level 3: Challenge
Make the form safer and kinder.

1. After a good message is saved, send the browser to `contact.php?sent=1` with `header()` and `exit`, so pressing Refresh does not save the message twice.
2. When `$_GET["sent"]` is `"1"`, show the thank-you box (without the visitor's name).
3. Extra: show a live count under the message box, such as `Characters: 42 / 1000`, worked out in PHP after a failed submit.

<details>
<summary>Show one possible answer</summary>

Replace Step 3's thank-you lines with a redirect:

```php
if (empty($errors)) {
  // ... build $record and file_put_contents() as before ...
  header("Location: contact.php?sent=1");
  exit;
}
```

Above the form, show the message:

```php
<?php if (($_GET["sent"] ?? "") === "1"): ?>
  <div class="alert-success">Thank you! Your message is saved.</div>
<?php endif; ?>
```

Under the textarea, the count:

```php
<?php
$message = "The loops chapter really helped me.";
echo "Characters: " . strlen($message) . " / 1000";
```

Output:

```text
Characters: 35 / 1000
```

This pattern is called **Post/Redirect/Get**: the browser's last request is a harmless `GET`, so Refresh only reloads the page.

</details>
