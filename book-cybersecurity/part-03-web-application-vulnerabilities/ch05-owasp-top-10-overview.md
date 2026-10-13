# Chapter 5: The OWASP Top 10 — Defending the Web 🌐

## 🌟 Real-Life Story

Before a school opens each morning, the caretaker uses a printed checklist. Are the fire doors closed? Are the gas taps off in the science lab? Is the first-aid box full? He did not invent this list himself. It was written by safety experts who studied many real accidents. Following it means he does not have to remember everything alone. Web developers have a similar checklist, written by experts who studied many real website problems.

## 🎯 What You Will Learn

- Explain what OWASP is and what the **OWASP Top 10** list is for.
- Name the ten risk areas in the 2025 list in simple words.
- Apply the rule "never trust user input" to a form.
- Tell apart **validation**, **escaping** and **parameterization**.

## 🗺️ What Is OWASP?

**OWASP** (the Open Worldwide Application Security Project) is a non-profit community. Its members share free guides and tools about building safe software.

Every few years, OWASP studies data from many real web applications. It then publishes the **OWASP Top 10**: ten of the most important risk areas for websites. The newest edition is the **2025** list. You will also see the older 2021 list quoted online; most of the ideas are the same.

```
┌──────────────────────────────────────────┐
│ A01 Broken Access Control                │
│ A02 Security Misconfiguration            │
│ A03 Software Supply Chain Failures       │
│ A04 Cryptographic Failures               │
│ A05 Injection                            │
│ A06 Insecure Design                      │
│ A07 Authentication Failures              │
│ A08 Software or Data Integrity Failures  │
│ A09 Security Logging & Alerting Failures │
│ A10 Mishandling of Exceptional Conditions│
└──────────────────────────────────────────┘
```

## 📖 The Ten Risks in Plain Words

| Code | Plain meaning | School-portal example |
| :--- | :--- | :--- |
| A01 Broken Access Control | Users can reach things they should not | A student opens another student's report by changing a number in the address (Chapter 8) |
| A02 Security Misconfiguration | Unsafe settings | Error pages show the database password; a default admin password is never changed |
| A03 Software Supply Chain Failures | Problems in code you did not write yourself | An add-on library has a known hole, or a fake package is installed |
| A04 Cryptographic Failures | Secrets not protected properly | Passwords stored as plain text; no HTTPS (Chapters 2, 9, 10) |
| A05 Injection | User text treated as commands | Typed text changes an SQL query or adds a script to a page (Chapters 6, 7) |
| A06 Insecure Design | The plan itself is unsafe | "Forgot password" asks only for a birthday, which classmates know |
| A07 Authentication Failures | Weak logins | No limit on password guesses; no 2FA for admins (Chapter 2) |
| A08 Software or Data Integrity Failures | Trusting things that could be tampered with | Installing an update without checking it really came from the maker |
| A09 Security Logging & Alerting Failures | Nobody notices an attack | No record of failed logins, so a break-in goes unseen (Chapter 13) |
| A10 Mishandling of Exceptional Conditions | Errors handled badly | When the database is busy, the login check crashes and lets people in |

Words to know: a **library** (in coding) is ready-made code you add to your project. An **exception** is an error the program has to deal with while running.

## 🧱 The Core Rule: Never Trust User Input

If you remember one rule from this part of the book, make it this one:

> ⚠️ **All data from outside your program is untrusted until you have checked it.**

"Outside" includes much more than form boxes:

- Form fields (`<input>`, `<textarea>`)
- Values in the address bar, such as `?id=42&search=books`
- **Cookies** (small pieces of data a site stores in your browser)
- Uploaded files, such as `photo.jpg`
- Data sent from other websites and services

Remember: anyone can change what their own browser sends. Hidden form fields and drop-down menus can be edited too. Checks in JavaScript help the user, but only checks on the **server** protect the data.

## 🛡️ Three Shields Against Bad Input

### Shield 1: Validation (is it the right shape?)
**Validation** means checking that data looks the way you expect, *before* you use it. Is the age really a whole number between 5 and 19?

```php
<?php
$inputs = ['14', '250', 'fourteen', '-3'];
foreach ($inputs as $age) {
    $ok = filter_var($age, FILTER_VALIDATE_INT,
        ['options' => ['min_range' => 5, 'max_range' => 19]]);
    echo $age, ' => ', $ok === false ? 'rejected' : 'accepted', "\n";
}
```

Output:

```
14 => accepted
250 => rejected
fourteen => rejected
-3 => rejected
```

It is best to **allow** only what you expect (an "allow list"), rather than trying to list every bad thing.

### Shield 2: Escaping (show it as plain text)
**Escaping** means changing special characters so a browser shows them as text instead of reading them as code. In PHP, `htmlspecialchars()` does this:

```php
<?php
echo htmlspecialchars('<b>Great book!</b>');
```

Output:

```
&lt;b&gt;Great book!&lt;/b&gt;
```

The browser now *shows* the tags as text instead of making the words bold. Chapter 6 uses this to stop script attacks.

### Shield 3: Parameterization (keep data apart from commands)
**Parameterization** means sending the command and the user's data to the database **separately**. The data can never become part of the command. These are called **prepared statements**. Chapter 7 covers them in detail.

| Shield | Question it asks | Used when |
| :--- | :--- | :--- |
| Validation | "Is this the right shape?" | Data arrives |
| Escaping | "Will this show as text only?" | Data is shown on a page |
| Parameterization | "Is data kept apart from commands?" | Data goes into a database query |

## 🏠 What to Do at Home

When you build any form:

- List every place where data enters your program.
- Validate each value on the server: type, length and allowed range.
- Escape every value you print on a page.
- Use prepared statements for every database query.
- Show friendly error messages to users, and keep the detailed errors in a private log.

## ⚠️ Common Mistake

**Mistake:** "My form uses `<input type="number" min="5" max="19">`, so the age is always safe."

**What happens:** those HTML rules only guide honest users in the browser. Anyone can change the page or send a request directly, and your server receives `"fourteen"` or `"250"` anyway.

**Fixed version:** keep the HTML rules for a friendly form, **and** validate again on the server, as in the `filter_var()` example above.

## ✍️ Try It

Take any form you have built in the HTML or PHP tracks, such as a book-review or contact form.

1. List every field.
2. For each, write the rule it must follow (for example: "name: 1–50 letters").
3. Mark where you would escape it when showing it on a page.

*Hint:* hidden fields and the address bar count as input too.

## 📝 Recap

- OWASP is a non-profit community; its Top 10 lists the most important website risk areas.
- In the 2025 list, Broken Access Control is still number one.
- Never trust user input: check it on the server, every time.
- Validation checks the shape, escaping makes text safe to show, parameterization keeps data out of commands.
- Browser checks are for convenience; server checks are for security.

## 🏆 Practice

### 🟢 Level 1: Recall
What is number one (A01) in the OWASP Top 10 for 2025, and what does it mean?

<details>
<summary>Show answer</summary>

**Broken Access Control**: users can see or change things they are not allowed to, such as another person's records.

</details>

### 🟡 Level 2: Apply
For each case, choose the shield that fits best: validation, escaping or parameterization.

1. A comment is shown on the class news page.
2. A "year group" field must be 6, 7, 8, 9 or 10.
3. A search word is used to look up books in the database.

<details>
<summary>Show answer</summary>

1. **Escaping**: the comment is being shown on a page.
2. **Validation**: only allow those five values.
3. **Parameterization**: use a prepared statement for the query.

</details>

### 🔴 Level 3: Challenge
A science-fair sign-up form has: student name, year group (6–10), project title and email.

1. Write a validation rule for each field.
2. Say where escaping is needed.
3. Write the PHP check for the year group using `filter_var()`.

<details>
<summary>Show one possible answer</summary>

1. Rules:
   - Name: required, 1–60 characters.
   - Year group: a whole number from 6 to 10.
   - Project title: required, 1–100 characters.
   - Email: must pass `FILTER_VALIDATE_EMAIL`.
2. Escape the name and title with `htmlspecialchars()` whenever they are shown on the list of entries. Use prepared statements when saving them.
3. Year group check:

```php
$year = filter_var($_POST['year'] ?? '', FILTER_VALIDATE_INT,
    ['options' => ['min_range' => 6, 'max_range' => 10]]);
if ($year === false) {
    echo "Please choose a year group from 6 to 10.";
}
```

</details>
