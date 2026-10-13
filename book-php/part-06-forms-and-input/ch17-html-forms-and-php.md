# Chapter 17: HTML Forms & PHP Processing

---

## 🌟 Real-Life Story

Outside the principal's office hangs a wooden suggestion box. You write an idea on a slip: *"Please add more chess boards to the library."* You drop the slip through the slot. At the end of the day, the principal opens the box and reads every slip. A web form is the slip, pressing Submit drops it in the box, and PHP is the principal who reads it.

---

## 🎯 What You Will Learn

- Connect an HTML `<form>` to a PHP script.
- Set the two key form attributes: `action` and `method`.
- Give every input a `name` so PHP can read it.
- Build a self-submitting form that shows and processes itself in one file.
- Print submitted text safely with `htmlspecialchars()`.

---

## Visual Concept Explanation

A **form** is the part of a page where visitors type or choose things. When they press Submit, the browser sends the data to a PHP script on the server.

### The Form Submission Pipeline

```text
BROWSER (HTML form)
+--------------------------------+
| <form action="save.php"        |
|       method="POST">           |
|   <input name="fullname">      |
|   <button>Submit</button>      |
| </form>                        |
+---------------+----------------+
                | HTTP POST
                v
SERVER (save.php)
+--------------------------------+
| $name = $_POST['fullname'];    |
| echo "Hello, ...";             |
+--------------------------------+
```

`$_POST` is a ready-made array that PHP fills with the form's data. Each key is an input's `name`. Chapter 18 explains it fully.

### The 2 Vital Form Attributes

| Attribute | What It Does | Example |
| :--- | :--- | :--- |
| `action` | The PHP file that receives the data | `action="process.php"` or `action=""` (this same page) |
| `method` | How the data is sent | `method="POST"` or `method="GET"` |

---

## Code Example: An All-in-One Feedback Form

Save this file as `feedback.php` in `htdocs` and open `http://localhost/feedback.php`:

```php
<?php
  $feedbackMessage = "";

  // Was the form submitted with POST?
  if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Read each input by its 'name' attribute
    $studentName = trim($_POST["student_name"] ?? "");
    $category = $_POST["category"] ?? "";
    $comment = trim($_POST["comment"] ?? "");

    if ($studentName !== "" && $comment !== "") {
      $feedbackMessage = "Thank you, $studentName! "
        . "Your feedback about '$category' has been recorded.";
    } else {
      $feedbackMessage = "Please fill in all required fields!";
    }
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Student Feedback</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 500px;
           margin: 40px auto; padding: 20px; }
    .form-group { margin-bottom: 15px; }
    label { display: block; font-weight: 600; margin-bottom: 5px; }
    input, select, textarea { width: 100%; padding: 8px;
           border: 1px solid #ccc; border-radius: 4px;
           box-sizing: border-box; }
    button { background: #7c3aed; color: white; border: none;
             padding: 10px 18px; border-radius: 6px; font-weight: 700; }
    .alert { padding: 12px; border-radius: 6px; margin-bottom: 20px;
             background: #e0e7ff; color: #3730a3; }
  </style>
</head>
<body>

  <h2>Student Feedback Portal</h2>

  <?php if ($feedbackMessage !== ""): ?>
    <div class="alert"><?= htmlspecialchars($feedbackMessage) ?></div>
  <?php endif; ?>

  <!-- The form submits back to this SAME file -->
  <form action="feedback.php" method="POST">
    <div class="form-group">
      <label for="student_name">Your Name:</label>
      <input type="text" id="student_name" name="student_name" required>
    </div>

    <div class="form-group">
      <label for="category">Category:</label>
      <select id="category" name="category">
        <option value="Computer Lab">Computer Lab</option>
        <option value="Cafeteria">Cafeteria</option>
        <option value="Sports Ground">Sports Ground</option>
        <option value="Library">Library</option>
      </select>
    </div>

    <div class="form-group">
      <label for="comment">Your Suggestion:</label>
      <textarea id="comment" name="comment" rows="4" required></textarea>
    </div>

    <button type="submit">Submit Feedback</button>
  </form>

</body>
</html>
```

If Aisha types her name, picks **Library** and writes a suggestion, the message box contains:

```html
<div class="alert">Thank you, Aisha! Your feedback about &#039;Library&#039; has been recorded.</div>
```

The browser shows it as: *Thank you, Aisha! Your feedback about 'Library' has been recorded.*

---

## Code Explanation: Breaking It Down Line by Line

- `if ($_SERVER["REQUEST_METHOD"] === "POST")`: When you first open the page, the method is `GET`, so this block is skipped. After you click Submit, the method is `POST`, so the form is processed.
- `name="student_name"`: **Very important.** PHP ignores the HTML `id`. It reads data only by the `name`: `$_POST["student_name"]`.
- `$_POST["student_name"] ?? ""`: The `??` operator (**null coalescing operator**) means "use the value on the left if it exists, otherwise use the value on the right". It stops a warning when an input is missing.
- `trim(...)`: Removes spaces from both ends, so a name made only of spaces counts as empty.
- `htmlspecialchars(...)`: Turns special characters like `<`, `>` and `'` into safe codes (`&lt;`, `&gt;`, `&#039;`). If a visitor types `<script>`, it is shown as text and never runs. **Use it every time you print something a visitor typed.**
- `action="feedback.php"`: The form posts back to itself, so messages appear above the same form.

---

## 🌍 Real-World Connection: Self-Submitting Forms

Many real sites use forms that submit to themselves:
- Registration pages show errors right above the inputs, without leaving the page.
- When everything is correct, the PHP script saves the data and sends the visitor to a welcome page.

---

## 🔮 Predict the Output

A form has `<input type="text" name="user_age" value="15">` and is submitted with POST. What does `gettype($_POST['user_age'])` return?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> <code>string</code>. PHP receives every text input as a string, even if it looks like a number.
</details>

---

## 🕵️ Code Detective: The Missing Input

```php
<!-- HTML -->
<form action="save.php" method="POST">
  <input type="email" id="email_box">
  <button type="submit">Subscribe</button>
</form>

<!-- save.php -->
<?php
  echo "Subscribing: " . htmlspecialchars($_POST['email_box']);
?>
```

- **Find the bug**: PHP shows `Warning: Undefined array key "email_box"`.
- **Explain**: The input has an `id`, but no `name`. The browser sends only inputs that have a `name`.
- **Fix**: Add `name="email_box"` to the `<input>` tag.

---

## ⚠️ Common Mistake

**Forgetting the `name` attribute.**

- ❌ *Wrong*:
  ```html
  <input type="text" id="username">
  ```
- 😕 *What happens*: The browser does not send this input. `$_POST['username']` does not exist, and PHP warns `Undefined array key "username"`.
- ✅ *Fixed*:
  ```html
  <input type="text" id="username" name="username">
  ```

A second mistake: leaving out `method`. A form with no `method` uses **GET**, so `$_POST` stays empty. Write `method="POST"` when your PHP reads `$_POST`.

---

## ✍️ Try It

Save this as `hello-form.php` in `htdocs` and open `http://localhost/hello-form.php`:

```php
<form action="hello-form.php" method="POST">
  <label for="city">Your city:</label>
  <input type="text" id="city" name="city">
  <button type="submit">Send</button>
</form>
<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $city = trim($_POST["city"] ?? "");
  echo "<p>Greetings to " . htmlspecialchars($city) . "!</p>";
}
```

Type `Srinagar` and press Send. Below the form you see:

```html
<p>Greetings to Srinagar!</p>
```

*Hint*: Now type `<b>Hi</b>` and press Send. Because of `htmlspecialchars()`, you see the tags as plain text, not bold text.

---

## 📝 Recap

- A form's `action` says **where** the data goes; `method` says **how** it is sent.
- PHP reads inputs by their `name`, never by their `id`.
- `$_SERVER["REQUEST_METHOD"] === "POST"` tells you the form was just submitted.
- Form values always arrive as **strings**.
- Print anything a visitor typed through `htmlspecialchars()`.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which form attribute decides where the data is sent?
2. Which input attribute becomes the key in `$_POST`?
3. Which method does a form use if `method` is missing?

<details>
<summary>Show answer</summary>

1. **`action`**.
2. **`name`**.
3. **GET**.

</details>

### 🟡 Level 2: Apply
1. Why do we check `$_SERVER["REQUEST_METHOD"] === "POST"` before reading `$_POST`?
2. Write the PHP line that reads an input named `school` safely (no warning if it is missing) and prints it safely.

<details>
<summary>Show answer</summary>

1. On the first visit the page is opened with GET and no form data exists. The check makes PHP process the form only after Submit is pressed.
2. ```php
   echo htmlspecialchars($_POST["school"] ?? "");
   ```

</details>

### 🔴 Level 3: Challenge
Build a **Science Fair RSVP** form in one file, `rsvp.php`.

1. Add inputs `guest_name` (text) and `guests` (number), and a checkbox `veg_meal` with value `yes`.
2. Make the form post back to `rsvp.php`.
3. After Submit, print: *"Thank you, NAME! Seats saved: N. Vegetarian meal: yes/no."*
4. Escape the name with `htmlspecialchars()`.
5. Extra: add three radio-button science questions (`q1`, `q2`, `q3`) and print a score out of 3.
6. Extra: how would you send several checkbox choices, such as clubs a student joins? (Hint: `name="clubs[]"`.)

<details>
<summary>Show one possible answer</summary>

```php
<form action="rsvp.php" method="POST">
  <label for="guest_name">Name:</label>
  <input type="text" id="guest_name" name="guest_name" required>
  <label for="guests">Seats:</label>
  <input type="number" id="guests" name="guests" min="1" max="5" value="1">
  <label><input type="checkbox" name="veg_meal" value="yes"> Vegetarian meal</label>
  <button type="submit">RSVP</button>
</form>
<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $name = trim($_POST["guest_name"] ?? "");
  $guests = (int) ($_POST["guests"] ?? 1);
  $veg = isset($_POST["veg_meal"]) ? "yes" : "no";
  echo "<p>Thank you, " . htmlspecialchars($name)
    . "! Seats saved: $guests. Vegetarian meal: $veg.</p>";
}
```

With name `Yusuf`, 3 seats and the box ticked, the page prints:

```html
<p>Thank you, Yusuf! Seats saved: 3. Vegetarian meal: yes.</p>
```

An unticked checkbox is **not sent at all**, so `isset()` is the right test. For several choices, `name="clubs[]"` makes `$_POST["clubs"]` an array of the ticked values.

</details>
