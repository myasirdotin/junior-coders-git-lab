# Chapter 8: CSRF & Broken Access Control

## 🌟 Real-Life Story

At Zainab's school, the office accepts signed notes from parents. One day a note arrives: "Please let Zainab leave at 11 a.m." The signature looks right, but Zainab's mother never wrote it. A careful office now staples a **numbered slip** to every form it sends home. Only forms with the matching slip are accepted. The office also checks that the parent signing is really **this** child's parent, not just any parent. These two checks are the two halves of this chapter.

## 🎯 What You Will Learn

- Explain **Cross-Site Request Forgery (CSRF)** in plain words.
- Protect forms with a secret **CSRF token** and **SameSite** cookies.
- Explain **Broken Access Control** and **IDOR**.
- Write an ownership check so users only see their own records.

## How a Logged-In Browser Works

When you log in to a website, it gives your browser a **session cookie**: a small value meaning "this visitor is logged in as Zainab". Your browser sends that cookie back automatically with every request to the same site. That is why you do not have to log in on every page.

Automatic is convenient. But it creates a gap: the site sees the cookie and assumes **you** chose to send the request.

## CSRF: The Forged Note

**Cross-Site Request Forgery (CSRF)** means another website tricks your browser into sending a request to a site where you are logged in. "Cross-site" means it comes from a different site. "Forgery" means it pretends to be you.

```
Tab 1: logged in to school portal
Tab 2: you open an unknown page
        │
        │ the page quietly makes your
        │ browser send a request to the
        ▼ school portal
 [ portal sees YOUR cookie ]
        │
        ▼
 "Change email" runs as if you
  asked for it
```

You clicked nothing on the portal, yet an action happened in your name. The attacker never learned your password. They simply borrowed your browser's automatic cookie.

### Which actions are at risk?
Anything that **changes** something: changing an email address, deleting a project, submitting a vote in a class poll, posting a message. Pages that only show data are much less at risk. That is one reason why actions that change data must always use **POST** forms, never plain links (GET).

## Defence 1: A Secret Form Token

A **CSRF token** is a long random value the server creates and keeps in the user's session. The server also puts it in a hidden field in every form it shows. When the form comes back, the server checks the two match.

Another website cannot read your portal's pages, because browsers keep each site's pages private from other sites. This rule is called the **Same-Origin Policy**. So the other site cannot know the token, and its forged request fails.

**Step 1: make the token** (once per session):

```php
<?php
session_start();
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}
```

`random_bytes(32)` makes 32 truly random bytes. `bin2hex()` turns them into 64 readable characters.

**Step 2: put it in the form:**

```php
<form action="change-email.php" method="POST">
  <input type="hidden" name="csrf_token"
         value="<?= htmlspecialchars($_SESSION['csrf_token']) ?>">
  <input type="email" name="email" required>
  <button type="submit">Save</button>
</form>
```

**Step 3: check it** when the form arrives:

```php
<?php
session_start();
$sent = $_POST['csrf_token'] ?? '';
if (!hash_equals($_SESSION['csrf_token'] ?? '', $sent)) {
    http_response_code(403);
    exit('This form has expired. Please reload the page and try again.');
}
// ...safe to change the email now
```

`hash_equals()` compares two strings safely. Here is a quick test:

```php
<?php
$token = bin2hex(random_bytes(32));
echo strlen($token), " characters\n";
var_dump(hash_equals($token, $token));
var_dump(hash_equals($token, 'guess'));
```

Output:

```
64 characters
bool(true)
bool(false)
```

## Defence 2: SameSite Cookies

The `SameSite` setting tells the browser when to send a cookie with requests that start on **other** sites:

```http
Set-Cookie: session_id=abc987; Secure; HttpOnly; SameSite=Lax
```

| Setting | What the browser does |
| :--- | :--- |
| `Strict` | Never sends the cookie with requests that start on other sites |
| `Lax` | Sends it when you follow a normal link to the site; not with POST forms or background requests from other sites |
| `None` | Always sends it (must be `Secure`); avoid for login cookies |

Modern browsers treat cookies as `Lax` when no setting is given, but set it yourself. Use **both** tokens and SameSite: two layers are better than one.

## Broken Access Control

**Access control** means deciding who may see or change each thing. **Broken Access Control** is when the website forgets to check. It is number one (A01) in the OWASP Top 10 (Chapter 5).

### IDOR: changing a number in the address
**IDOR** stands for **Insecure Direct Object Reference**. It means the site uses an ID from the address, but never checks that you are allowed to use that ID.

```
https://school-portal.example.org/report?id=1042
```

Aisha is student 1042. If she changes the address to `id=1043` and sees Bilal's report, the site has an IDOR flaw. Being logged in is not enough. The site must check that **this** report belongs to **this** user.

```php
// ❌ Risky: checks nothing about ownership
// (and glues input into SQL, too!)
$report = $pdo->query("SELECT * FROM reports WHERE id = " . $_GET['id']);
```

```php
// ✅ Safe: the report must belong to the logged-in student
$stmt = $pdo->prepare(
    "SELECT * FROM reports WHERE id = ? AND student_id = ?"
);
$stmt->execute([$_GET['id'] ?? 0, $_SESSION['user_id']]);
$report = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$report) {
    http_response_code(403);
    exit('You do not have permission to view this report.');
}
```

If the report exists but belongs to someone else, the query returns nothing, and the visitor sees "no permission".

### Other access-control checks
- **Roles:** only teachers may edit marks. Check the role on the **server** for every action, not just by hiding the button.
- **Deny by default:** if you are not sure a user is allowed, say no.
- **Check every request:** a hidden page is not a protected page. Anyone can type its address.

## What to Do at Home

- Use POST forms for every action that changes data.
- Add a CSRF token to every POST form and check it with `hash_equals()`.
- Set session cookies to `Secure; HttpOnly; SameSite=Lax` (or `Strict`).
- In every query for a user's own data, add `AND owner_id = ?` with the logged-in user's ID.
- Check roles on the server for every action.

## ⚠️ Common Mistake

**Mistake:** "Only teachers see the *Edit marks* button, so students cannot edit marks."

**What happens:** hiding a button does not protect anything. A student can still send the same request directly, for example by copying the form's address. If the server does not check the role, the change goes through.

**Fixed version:** on the server, before saving:

```php
if (($_SESSION['role'] ?? '') !== 'teacher') {
    http_response_code(403);
    exit('Only teachers can edit marks.');
}
```

## ✍️ Try It

Look at a PHP project of your own that has a login.

1. Find every page that changes data. Does each one use POST and check a CSRF token?
2. Find every page that reads `?id=` from the address. Does its query also check the owner?

*Hint:* search your files for `$_GET['id']`.

## 📝 Recap

- CSRF tricks your browser into sending a request, using your automatic login cookie.
- Fix CSRF with a secret random token in every form, plus SameSite cookies.
- Broken Access Control means the site forgets to check who is allowed; it is OWASP A01.
- IDOR is changing an ID in the address to reach someone else's record.
- Always check ownership and roles on the server, for every request.

## 🏆 Practice

### 🟢 Level 1: Recall
Why can another website not simply copy your form's CSRF token?

<details>
<summary>Show answer</summary>

Because of the browser's **Same-Origin Policy**: one site cannot read the pages of another site. The token is only in your portal's pages and session, so the other site never sees it.

</details>

### 🟡 Level 2: Apply
A library site shows loans at `loans.php?member=55`. The query is:

```php
$stmt = $pdo->prepare("SELECT * FROM loans WHERE member_id = ?");
$stmt->execute([$_GET['member']]);
```

It uses a prepared statement. Is it safe? Explain and fix it.

<details>
<summary>Show answer</summary>

It is safe from SQL injection but **not** from IDOR. Anyone can change `55` to another number and see that member's loans. Use the logged-in member's ID from the session instead of the address:

```php
$stmt = $pdo->prepare("SELECT * FROM loans WHERE member_id = ?");
$stmt->execute([$_SESSION['member_id']]);
```

</details>

### 🔴 Level 3: Challenge
Build a protected "Delete my project" action for a science-fair site.

1. Write the form, with a CSRF token.
2. Write the handler that checks the token.
3. Make sure a student can only delete **their own** project.

<details>
<summary>Show one possible answer</summary>

1. The form:

```php
<form action="delete-project.php" method="POST">
  <input type="hidden" name="csrf_token"
         value="<?= htmlspecialchars($_SESSION['csrf_token']) ?>">
  <input type="hidden" name="project_id" value="<?= (int) $project['id'] ?>">
  <button type="submit">Delete my project</button>
</form>
```

2. and 3. The handler:

```php
<?php
session_start();
if (!hash_equals($_SESSION['csrf_token'] ?? '', $_POST['csrf_token'] ?? '')) {
    http_response_code(403);
    exit('Form expired. Please reload and try again.');
}

$stmt = $pdo->prepare("DELETE FROM projects WHERE id = ? AND student_id = ?");
$stmt->execute([$_POST['project_id'] ?? 0, $_SESSION['user_id']]);

echo $stmt->rowCount() === 1 ? 'Project deleted.' : 'Nothing was deleted.';
```

The `AND student_id = ?` part means another student's project can never be deleted, even if someone changes the hidden `project_id`.

</details>
