# Chapter 8: CSRF & Broken Access Control 🚪🎭

Imagine an attacker who cannot guess your password and cannot inject malicious code into your database, but tricks *your own web browser* into sending commands on your behalf while you are logged in.

This is **Cross-Site Request Forgery (CSRF)**. Combined with **Broken Access Control** (OWASP #1), these vulnerabilities exploit architectural trust gaps in web applications.

---

## 💡 The Mental Model: The Forged Bank Signature

Imagine you are logged into your online bank in Tab 1:
- In Tab 2, you click a link to read an article on a forum.
- The article page silently includes a hidden HTML image tag:
  ```html
  <img src="https://bank.com/transfer?amount=500&to=attacker" style="display:none;">
  ```
- Because your browser has an active session cookie for `bank.com`, the browser automatically attaches your cookie to the request!
- The bank processes the transfer thinking *you* requested it!

This is CSRF: forcing an authenticated user to perform state-changing actions without their knowledge.

---

## 🛡️ Defeating CSRF: The Two Essential Defenses

### 1. Anti-CSRF Synchronizer Tokens
Generate a unique, unpredictable, cryptographically random token tied to the user's current session. Embed it inside every form as a hidden input:

```html
<form action="/transfer" method="POST">
    <!-- Cryptographically secure CSRF Token -->
    <input type="hidden" name="csrf_token" value="9b1deb4d-3b7d-4ba6-9f34-7546a9e80231">
    <input type="number" name="amount" placeholder="Amount">
    <button type="submit">Send</button>
</form>
```
When the form is submitted, the server compares the submitted token with the session token. Because an external attacker site cannot read the token (due to the Same-Origin Policy), unauthorized forged requests fail immediately!

### 2. Modern Cookie Flags: `SameSite=Strict / Lax`
When issuing session cookies, instruct the browser not to send cookies with third-party cross-site requests:
```http
Set-Cookie: session_id=abc987; Secure; HttpOnly; SameSite=Strict
```

---

## 🚪 Broken Access Control & IDOR

**Broken Access Control** occurs when an application fails to verify whether the logged-in user actually owns or has permission to access the requested resource.

### Insecure Direct Object References (IDOR)
Consider this URL:
```
https://school-portal.org/student-report?id=1042
```
If a student changes `id=1042` to `id=1043` in the browser address bar, and the server shows another student's private grades without checking permissions, that is an **IDOR flaw**!

```php
// ❌ VULNERABLE IDOR: Checks who is logged in, but not if they own record!
$report = $db->query("SELECT * FROM reports WHERE id = " . $_GET['id']);

// ✅ SECURE ACCESS CONTROL: Enforce ownership boundary!
$userId = $_SESSION['user_id'];
$reportId = $_GET['id'];

$stmt = $pdo->prepare("SELECT * FROM reports WHERE id = :report_id AND student_id = :user_id");
$stmt->execute([':report_id' => $reportId, ':user_id' => $userId]);
$report = $stmt->fetch();

if (!$report) {
    http_response_code(403);
    die("Access Denied: You do not own this document.");
}
```

---

## 🧠 Checkpoint Quiz

1. **How does an Anti-CSRF token protect web forms from forgery?**
   - *Answer: It adds a secret, random token known only to the user's session and the server; external sites cannot read this token and therefore cannot forge valid requests.*
2. **What does the `SameSite=Strict` cookie attribute do?**
   - *Answer: It prevents the browser from sending the cookie along with any cross-site request originating from external sites.*
3. **What is an Insecure Direct Object Reference (IDOR)?**
   - *Answer: A flaw where an application exposes a direct database key (like an ID in a URL) without verifying whether the requesting user is authorized to access that specific record.*

---

## 🎯 Hands-On Mission

Review your own web projects: Ensure that all sensitive state-changing operations (such as deleting a post or changing account settings) use `POST` instead of `GET`, include CSRF protection, and strictly verify user ownership!
