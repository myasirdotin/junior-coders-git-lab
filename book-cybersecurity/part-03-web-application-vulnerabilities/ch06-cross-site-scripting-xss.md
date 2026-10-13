# Chapter 6: Cross-Site Scripting (XSS) & Frontend Defense 🛡️

## 🌟 Real-Life Story

The community library has a public noticeboard where visitors pin book recommendations. Most notes say things like "*The Secret Garden* is wonderful!" One day someone pins a note written to look official: "LIBRARY NOTICE: hand your library card to the person by the door." Visitors trust the board, so a few people obey. The board itself was not broken. It simply showed a stranger's words as if they came from the library. A careful librarian now reads every note and pins it inside a clear plastic sleeve marked "Visitor note". That sleeve is what this chapter teaches you to build.

## 🎯 What You Will Learn

- Explain what **Cross-Site Scripting (XSS)** is and why it is dangerous.
- Describe the three kinds: stored, reflected and DOM-based.
- Use `htmlspecialchars()` in PHP and `textContent` in JavaScript to show user text safely.
- Explain how a **Content Security Policy** and **HttpOnly** cookies add extra layers.

## 💡 What Is XSS?

A web page is made of HTML. The browser reads HTML and obeys it. Some tags, like `<b>`, only change how text looks. The `<script>` tag is different: it tells the browser to **run JavaScript code**.

**Cross-Site Scripting (XSS)** happens when a website takes text from one user and puts it into a page **as HTML**, without making it safe first. If that text contains a script tag, every visitor's browser runs the stranger's code, as if the website had written it.

Why is that serious? Code running inside a page can do almost anything that page can do. It can read what is on the screen, send requests while the visitor is logged in, or show a fake login box. The visitor sees the real website address, so they have no reason to be suspicious.

In noticeboard terms:

- The noticeboard is the comment section of your website.
- The fake "official" note is a stranger's text containing HTML or script.
- The plastic sleeve is **escaping**: showing text *as text*, never as instructions.

## 🦠 Three Kinds of XSS

### Stored XSS
The harmful text is **saved** in the website's database, for example inside a comment or a profile description. Every visitor who later views that page receives it. This is the most dangerous kind because it reaches many people.

### Reflected XSS
The harmful text is placed in a link, often in the part after `?` in the address. The page copies ("reflects") that text straight back into the HTML. The trickster then persuades someone to click the special link.

Here is the risky pattern on a search page:

```php
<!-- ❌ Risky: prints the search words as raw HTML -->
<h1>Results for: <?php echo $_GET['q']; ?></h1>
```

Whatever is in `q` goes into the page exactly as typed. If it contains tags, the browser obeys them.

### DOM-based XSS
The **DOM** (Document Object Model) is the browser's live model of the page, which JavaScript can change. DOM-based XSS happens entirely in the browser: the page's own JavaScript takes text from the address or a form and inserts it using `innerHTML`.

## 🛡️ Defence 1: Escape Output (the Plastic Sleeve)

**Escaping** (also called output encoding) replaces the special characters of HTML with safe codes called **HTML entities**. The browser then shows them as ordinary characters.

| Character | HTML entity |
| :--- | :--- |
| `<` | `&lt;` |
| `>` | `&gt;` |
| `&` | `&amp;` |
| `"` | `&quot;` |
| `'` | `&#039;` |

### In PHP
```php
<?php
$comment = "Tom's <i>book</i>";
echo htmlspecialchars($comment, ENT_QUOTES, 'UTF-8');
```

Output:

```
Tom&#039;s &lt;i&gt;book&lt;/i&gt;
```

In the browser this displays as `Tom's <i>book</i>`: the tags appear as plain text and do nothing. A script tag would be shown in exactly the same harmless way.

The fixed search page:

```php
<!-- ✅ Safe: the search words are always shown as text -->
<h1>Results for: <?php echo htmlspecialchars($_GET['q'] ?? '', ENT_QUOTES, 'UTF-8'); ?></h1>
```

### In JavaScript
```javascript
const userComment = "<b>Great</b> book";

// ❌ Risky: the browser reads it as HTML
commentDiv.innerHTML = userComment;

// ✅ Safe: the browser shows it as plain text
commentDiv.textContent = userComment;
```

What the reader sees:

- With `innerHTML`: **Great** book (the tag was obeyed, so it could also have been a script).
- With `textContent`: `<b>Great</b> book` (the exact characters, with no effect).

> 💡 **Rule:** escape when you *show* data, not only when you save it. The same text might be shown in many places.

## 🛡️ Defence 2: Content Security Policy (CSP)

A **Content Security Policy** is an instruction the server sends to the browser in an **HTTP header** (extra information sent along with a page). It says which scripts are allowed to run:

```http
Content-Security-Policy: default-src 'self'; script-src 'self'
```

`'self'` means "only scripts from files on this same website". Scripts written directly inside the page's HTML are blocked. So even if a harmful tag slips into a page, the browser refuses to run it.

CSP is a **second layer**, not a replacement for escaping. Defense in depth again!

## 🛡️ Defence 3: HttpOnly Cookies

A **session cookie** is the small value that keeps you logged in. Adding the `HttpOnly` flag means JavaScript cannot read that cookie at all:

```http
Set-Cookie: session_id=abc987; Secure; HttpOnly; SameSite=Lax
```

If an XSS bug ever slips through, the stranger's code still cannot copy your login cookie.

## 🏠 What to Do at Home

- Escape every piece of user text you print with `htmlspecialchars($x, ENT_QUOTES, 'UTF-8')`.
- In JavaScript, use `textContent` for user text. Avoid `innerHTML` unless the HTML is your own.
- Never build HTML by joining strings that contain user input.
- Send a Content Security Policy header on your sites.
- Mark session cookies `HttpOnly` and `Secure`.
- Test only on your own pages or the lab studio.

## ⚠️ Common Mistake

**Mistake:** "I removed the word `<script>` from comments, so my site is safe."

**What happens:** HTML has many other ways to run code, such as event attributes on ordinary tags. Blocking one word is like locking one window and leaving the others open.

**Fixed version:** do not try to list every bad thing. Escape *everything* on output with `htmlspecialchars()` or `textContent`, so no user text is ever read as HTML.

## ✍️ Try It

Open the **XSS** tab in the Cybersecurity Lab Studio.

1. Type `<b>Hello</b>` into the box.
2. Compare the **Vulnerable Output (innerHTML)** panel with the **Secure Output** panel.
3. Write one sentence explaining the difference.

*Hint:* one panel *obeys* the tag; the other *shows* it.

## 📝 Recap

- XSS happens when user text is put into a page as HTML instead of as text.
- Stored XSS is saved and reaches every visitor; reflected XSS comes from a link; DOM-based XSS happens in the browser's own JavaScript.
- The main fix is escaping output: `htmlspecialchars()` in PHP, `textContent` in JavaScript.
- A Content Security Policy and HttpOnly cookies are extra layers.
- Blocking certain words is not enough; escape everything.

## 🏆 Practice

### 🟢 Level 1: Recall
What is the difference between `innerHTML` and `textContent` when showing user text?

<details>
<summary>Show answer</summary>

`innerHTML` reads the text as **HTML**, so any tags in it are obeyed, including script-related ones. `textContent` shows the text **exactly as typed**, so tags appear as harmless characters.

</details>

### 🟡 Level 2: Apply
What exact text does this print?

```php
<?php
echo htmlspecialchars('Q&A <today>', ENT_QUOTES, 'UTF-8');
```

<details>
<summary>Show answer</summary>

```
Q&amp;A &lt;today&gt;
```

`&` becomes `&amp;`, `<` becomes `&lt;` and `>` becomes `&gt;`. The browser will display `Q&A <today>` as plain text.

</details>

### 🔴 Level 3: Challenge
A class guestbook page has this code:

```php
<?php foreach ($messages as $m): ?>
  <p><strong><?php echo $m['name']; ?></strong>: <?php echo $m['text']; ?></p>
<?php endforeach; ?>
```

1. Explain what kind of XSS this page is open to, and why.
2. Rewrite the loop so both values are safe.
3. Suggest one extra layer of defence for the whole site.

<details>
<summary>Show one possible answer</summary>

1. **Stored XSS.** Names and messages are saved, then printed as raw HTML to every visitor.
2. Fixed loop, using a small helper so it is easy to use everywhere:

```php
<?php
function e($value) {
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}
foreach ($messages as $m): ?>
  <p><strong><?= e($m['name']) ?></strong>: <?= e($m['text']) ?></p>
<?php endforeach; ?>
```

3. Send `Content-Security-Policy: default-src 'self'; script-src 'self'` so scripts written inside the page are refused, and mark the session cookie `HttpOnly`.

</details>
