# Chapter 9: HTTP Security Headers 📨

## 🌟 Real-Life Story

When the school office sends a parcel of exam papers to another school, it does not just send the box. It sticks labels on the outside: **"Fragile"**, **"Open only in the exam office"**, **"Do not forward"**. The delivery driver never opens the box, but follows every label. A web page travels the same way. Along with the page, the server sends short labels called **headers**, and the browser obeys them. A few well-chosen labels can stop whole families of attacks before they start.

## 🎯 What You Will Learn

- Explain what HTTP **response headers** are and where to see them.
- Name the main security headers and say what each one blocks.
- Write a simple, safe **Content Security Policy**.
- Turn on HSTS carefully, and set the **Secure**, **HttpOnly** and **SameSite** cookie flags.
- Send security headers from PHP with `header()` and from Apache with `.htaccess`.

## 📨 What Are Response Headers?

When your browser asks for a page, it sends a **request**. The server replies with a **response**. The response has two parts:

```
Browser                         Server
   │  request: "GET /index.php"    │
   │──────────────────────────────►│
   │                               │
   │  response:                    │
   │◄──────────────────────────────│
   │  1. headers (labels)          │
   │  2. body (the HTML page)      │
```

**Headers** are short lines of the form `Name: value`. The visitor never sees them on the page. They tell the browser how to handle what comes next. For example:

```http
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Content-Security-Policy: default-src 'self'
```

The first line says the request worked (`200 OK`). `Content-Type` says "this is an HTML page". The third line is a **security header**: a rule the browser enforces to protect the visitor.

In Chapter 6 you met one security header already: the Content Security Policy against XSS. In Chapter 8 you met the `Set-Cookie` header with `SameSite`. This chapter puts all the important ones together.

## 🔍 How to See a Site's Headers

### In the browser (DevTools)

1. Open the website in Chrome, Edge or Firefox.
2. Press **F12** to open **DevTools** (the browser's built-in developer tools).
3. Click the **Network** tab, then reload the page (**F5**).
4. Click the first row in the list. It is the page itself.
5. Open **Headers** and look under **Response Headers**.

### In the terminal (curl)

`curl` is a small program that fetches web addresses. The `-I` option asks only for the headers. In Windows PowerShell, type `curl.exe`, because plain `curl` may run a different PowerShell command.

```powershell
curl.exe -I https://example.com
```

Output (taken on 13 October 2026; dates and some lines change each time):

```
HTTP/1.1 200 OK
Date: Tue, 13 Oct 2026 13:19:21 GMT
Content-Type: text/html; charset=utf-8
Connection: keep-alive
Server: cloudflare
last-modified: Fri, 09 Oct 2026 20:18:28 GMT
allow: GET, HEAD
Accept-Ranges: bytes
Age: 3972
cf-cache-status: HIT
CF-RAY: a49ea2ad5ed4a7f1-DEL
alt-svc: h3=":443"; ma=86400
```

`example.com` is a simple demonstration page, so it sends **none** of the security headers in this chapter. By the end, you will spot that at a glance.

> 🛡️ **Amānah rule:** looking at headers is harmless, because every browser receives them. Testing a site for weaknesses is different: only test sites you own or have written permission to test.

## 🧱 Content-Security-Policy (CSP)

**What it blocks:** scripts and other files from places you did not approve. It is a strong second layer against **XSS** (Chapter 6).

A CSP is a list of rules. Each rule is called a **directive** and ends with `;`. Here is a simple, safe policy for a small school site that keeps all its files on its own server:

```http
Content-Security-Policy: default-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'
```

| Directive | Meaning |
| :--- | :--- |
| `default-src 'self'` | Scripts, styles, images and fonts may load only from this same site |
| `object-src 'none'` | No old plug-in content (`<object>`, `<embed>`) at all |
| `base-uri 'self'` | Nobody can insert a `<base>` tag that redirects your links elsewhere |
| `frame-ancestors 'none'` | No other site may show this page inside a frame |

With `'self'`, scripts written **inside** the HTML (`<script>...</script>` and `onclick="..."`) are blocked. Only `.js` files from your own site run. That is exactly what stops an injected script.

### Nonces: allowing one script you trust

Sometimes a page really needs one small inline script. A **nonce** ("number used once") is a random value the server makes fresh for **every** page load. It puts the value in the header and on the trusted script tag:

```http
Content-Security-Policy: script-src 'self' 'nonce-k7Qz2pXb9L'
```

```html
<script nonce="k7Qz2pXb9L">
  document.getElementById('year').textContent = '2026';
</script>
```

An attacker cannot guess the next nonce, so their injected script has no matching value and is blocked. In PHP you would make it with `bin2hex(random_bytes(16))`, just like the CSRF token in Chapter 8. Never reuse the same nonce on every page.

> 💡 **Test first:** send the same policy as `Content-Security-Policy-Report-Only`. The browser then only reports problems in the DevTools **Console** and blocks nothing. When the console is clean, switch to the real header.

## 🔒 Strict-Transport-Security (HSTS)

**What it blocks:** someone on the same Wi-Fi quietly switching your visit from `https://` to unprotected `http://`.

```http
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

- **HSTS** tells the browser: "For this site, use HTTPS only. Never plain HTTP."
- `max-age` is how long the browser remembers this rule, in seconds. 31,536,000 seconds = 365 days.
- `includeSubDomains` applies the rule to every subdomain too, such as `library.example.org`.
- Browsers ignore this header if it arrives over plain HTTP. It only works on an HTTPS response.

### Be careful with HSTS

A browser that has seen HSTS will **refuse** plain HTTP for the whole `max-age`. If one subdomain has no HTTPS yet, it stops working for those visitors.

1. Make sure HTTPS works everywhere first.
2. Start small: `max-age=300` (5 minutes). Then raise it step by step to a year.
3. Add `includeSubDomains` only when **every** subdomain has HTTPS.
4. Do not add the extra `preload` word until you are sure. It puts your site on a list built into browsers, and leaving that list takes months.

## 📄 X-Content-Type-Options: nosniff

**What it blocks:** the browser "guessing" a file's type and running it as something dangerous.

```http
X-Content-Type-Options: nosniff
```

Every file is sent with a `Content-Type`, such as `text/plain` or `image/png`. Some browsers used to **sniff**: look inside a file and guess its real type. Imagine a student uploads a "homework.txt" that actually contains JavaScript. A sniffing browser might run it as a script. `nosniff` says: "Trust the `Content-Type` I gave you. Do not guess." The browser then refuses to run a script or style sheet with the wrong type.

This header has only one value, `nosniff`, and is safe to send on every response.

## 🖼️ Clickjacking: frame-ancestors and X-Frame-Options

**What it blocks:** **clickjacking**. Another site loads your page invisibly inside a frame and places it over its own buttons. The visitor thinks they are clicking "Next", but they are really clicking "Delete my project" on your site.

```
 Other site's page (what you see)
 ┌──────────────────────────────┐
 │  [ Next ]                    │
 │   ▲ your real page sits here │
 │   │ invisible, on top:       │
 │  [ Delete my project ]       │
 └──────────────────────────────┘
```

The modern defence is the CSP directive you already saw:

```http
Content-Security-Policy: frame-ancestors 'none'
```

Use `'none'` (no site may frame the page) or `'self'` (only your own site may). Older browsers understand an older header that does the same job:

```http
X-Frame-Options: DENY
```

`DENY` matches `'none'`, and `SAMEORIGIN` matches `'self'`. Sending both is common and harmless. When both are present, modern browsers follow `frame-ancestors`.

## 🔗 Referrer-Policy

**What it blocks:** leaking the full address of your page to other sites.

When a visitor clicks a link to another site, the browser may tell that site which page they came from. This is called the **referrer**. A full address can contain private details, such as `report?id=1042` or a password-reset code.

```http
Referrer-Policy: strict-origin-when-cross-origin
```

This sends the full address within your own site, but only the site name (`https://school-portal.example.org`) to other sites, and nothing at all from HTTPS to HTTP. Modern browsers already use this as their default, but setting it yourself makes it certain. For very private pages, use `no-referrer`.

## 🎛️ Permissions-Policy

**What it blocks:** using powerful browser features your site does not need.

```http
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

The empty brackets `()` mean "allowed for nobody". So even if a harmful script gets into the page, it cannot ask to use the camera, the microphone or the visitor's location. A homework site needs none of these. Turn off what you do not use: that is the principle of **least privilege** (give only the access that is needed).

## 🍪 Cookie Flags: Secure, HttpOnly, SameSite

Cookies are set with the `Set-Cookie` header, and three **flags** (extra settings) protect them:

| Flag | What it blocks | Chapter |
| :--- | :--- | :--- |
| `Secure` | Sending the cookie over plain HTTP, where it can be read on the network | this one |
| `HttpOnly` | JavaScript reading the cookie, so XSS cannot steal the login | 6 |
| `SameSite=Lax` | Sending the cookie with forms from other sites | 8 (CSRF) |

In PHP, set them for the session cookie **before** `session_start()`:

```php
<?php
session_set_cookie_params([
    'secure'   => true,   // only over HTTPS
    'httponly' => true,   // JavaScript cannot read it
    'samesite' => 'Lax',  // not sent with forms from other sites
]);
session_start();
echo "Session started\n";
```

The `Set-Cookie` header this sends (the session ID is random each time):

```http
Set-Cookie: PHPSESSID=ssi4emhp1dnd1gat7828sj055b; path=/; secure; HttpOnly; SameSite=Lax
```

## 🗑️ Old Headers You Can Skip

Old tutorials often list headers that modern browsers no longer use:

- **`X-XSS-Protection`** switched on an "XSS filter" built into old browsers. Edge removed that filter in 2018 and Chrome in 2019; Firefox never had it. The filter could even be misused to cause harm. **Do not rely on it.** Leave the header out, or send `X-XSS-Protection: 0` to turn the old filter off. Your real XSS defences are escaping (Chapter 6) and CSP.
- **`Public-Key-Pins`** and **`Expect-CT`** are also retired. Browsers ignore them.

## 🐘 Setting Headers in PHP

PHP's `header()` function adds one response header. It must run **before** any HTML or `echo`, because headers travel in front of the page.

```php
<?php
// Security headers: send them before any HTML
header("Content-Security-Policy: default-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'");
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Referrer-Policy: strict-origin-when-cross-origin');
header('Permissions-Policy: camera=(), microphone=(), geolocation=()');
?>
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Library</title></head>
<body><h1>Green Valley Library</h1></body>
</html>
```

Run this page with PHP's built-in test server (`php -S 127.0.0.1:8137`) and ask for its headers with `curl.exe -I http://127.0.0.1:8137/index.php`. Output:

```
HTTP/1.1 200 OK
Host: 127.0.0.1:8137
Date: Tue, 13 Oct 2026 13:19:30 GMT
Connection: close
X-Powered-By: PHP/8.3.31
Content-Security-Policy: default-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Content-type: text/html; charset=UTF-8
```

Every header you set is there. HSTS is left out of this test on purpose, because the test server uses plain HTTP. Add it only on a real HTTPS site.

Notice `X-Powered-By: PHP/8.3.31`. It tells everyone your exact PHP version, which helps attackers look up known weaknesses. On a real server, set `expose_php = Off` in `php.ini` to hide it.

## 🪶 Setting Headers in Apache (.htaccess)

If your site runs on Apache (as in XAMPP), you can set the headers once for a whole folder. Apache's **mod_headers** module adds the `Header` command. Put this in a file named `.htaccess` in your site's folder:

```apache
<IfModule mod_headers.c>
  Header set Content-Security-Policy "default-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'"
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "DENY"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set Permissions-Policy "camera=(), microphone=(), geolocation=()"
</IfModule>
```

- `<IfModule mod_headers.c>` means "only if mod_headers is switched on". XAMPP loads it by default.
- `Header set` adds the header, replacing any old value with the same name.
- Write `Header always set` if you also want the header on error pages, such as "404 Not Found".
- Add the HSTS line only on a site that already runs on HTTPS.

Choose **one** place for each header, PHP or Apache. Setting the same header in both can send it twice.

## 🏠 What to Do at Home

- Open your own project in DevTools → Network and list which security headers it sends.
- Add CSP, `nosniff`, `frame-ancestors` (plus `X-Frame-Options`), Referrer-Policy and Permissions-Policy.
- Test a new CSP with `Content-Security-Policy-Report-Only` first.
- Mark session cookies `Secure`, `HttpOnly` and `SameSite=Lax`.
- Turn on HSTS only after HTTPS works everywhere, starting with a small `max-age`.
- Skip `X-XSS-Protection`; it is obsolete.

## ⚠️ Common Mistake

**Mistake 1: calling `header()` after output.**

```php
<?php
echo "<h1>Welcome</h1>\n";
header('X-Content-Type-Options: nosniff');
```

**What happens:** the page starts printing, so the headers have already gone. PHP gives a warning and the header is **not** sent. Running `php late.php` in the terminal prints:

```
<h1>Welcome</h1>
PHP Warning:  Cannot modify header information - headers already sent by (output started at ...\late.php:2) in ...\late.php on line 3

Warning: Cannot modify header information - headers already sent by (output started at ...\late.php:2) in ...\late.php on line 3
```

(The `...` stands for the folder on your computer.) Even a blank line or a space before `<?php` counts as output.

**Fixed version:** send every header first, then the page.

```php
<?php
header('X-Content-Type-Options: nosniff');
echo "<h1>Welcome</h1>\n";
```

**Mistake 2: turning on HSTS for a year on day one.**

A student adds `max-age=31536000; includeSubDomains` while `old.example.org` still has no HTTPS. For a whole year, visitors' browsers refuse to open that subdomain. **Fixed version:** start with `max-age=300`, check every subdomain, then raise it slowly.

## ✍️ Try It

Compare two websites you use for school (for example, your school's site and an online library).

1. Open each in DevTools → **Network**, click the first row, and read the **Response Headers**.
2. Make a small table: for each site, write ✓ or ✗ for CSP, HSTS, `nosniff`, `frame-ancestors` or `X-Frame-Options`, Referrer-Policy and Permissions-Policy.
3. Does either site still send `X-XSS-Protection`?

*Hint:* header names are not case-sensitive, so `strict-transport-security` and `Strict-Transport-Security` are the same header.

## 📝 Recap

- Response headers are `Name: value` labels sent before the page; the browser obeys them.
- CSP limits where scripts and files may come from; nonces allow one trusted inline script.
- HSTS forces HTTPS for `max-age` seconds; start small and be careful with `includeSubDomains`.
- `nosniff` stops type guessing; `frame-ancestors` and `X-Frame-Options` stop clickjacking.
- Referrer-Policy keeps addresses private; Permissions-Policy turns off unneeded features; cookies need `Secure`, `HttpOnly` and `SameSite`.
- Set headers with PHP `header()` before any output, or with `Header set` in `.htaccess`. `X-XSS-Protection` is obsolete.

## 📖 Key Terms

| Term | What It Means |
| :--- | :--- |
| **Response header** | A `Name: value` line the server sends before the page body. |
| **CSP** | Content Security Policy: rules about where scripts and other files may load from. |
| **Nonce** | A random value made fresh for each page load, used to allow one trusted script. |
| **HSTS** | Strict-Transport-Security: makes the browser use HTTPS only for a set time. |
| **MIME sniffing** | A browser guessing a file's type by looking inside it. |
| **Clickjacking** | Hiding a real page in an invisible frame to trick people into clicking it. |
| **Referrer** | The address of the page a visitor came from. |

## 🏆 Practice

### 🟢 Level 1: Recall
Match each header to the attack or problem it helps block:

1. `X-Content-Type-Options: nosniff`
2. `Content-Security-Policy: frame-ancestors 'none'`
3. `Strict-Transport-Security`
4. `Content-Security-Policy: script-src 'self'`

<details>
<summary>Show answer</summary>

1. The browser guessing a file's type and running it as a script (MIME sniffing).
2. Clickjacking: other sites cannot show your page in a frame.
3. Being switched from HTTPS to plain HTTP on the network.
4. Injected inline scripts (XSS), because only script files from your own site may run.

</details>

### 🟡 Level 2: Apply
A classmate's PHP page sends these headers:

```http
X-XSS-Protection: 1; mode=block
Set-Cookie: session=7f3a9c; path=/
```

Explain what is wrong and write better headers.

<details>
<summary>Show answer</summary>

- `X-XSS-Protection` is obsolete. Modern browsers ignore it, so it gives no real protection. Remove it (or send `0`) and use a real CSP.
- The cookie has no flags. It can travel over plain HTTP, be read by JavaScript and be sent with forms from other sites.

Better:

```http
Content-Security-Policy: default-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'
X-Content-Type-Options: nosniff
Set-Cookie: session=7f3a9c; path=/; Secure; HttpOnly; SameSite=Lax
```

</details>

### 🔴 Level 3: Challenge
Your school's science-fair site runs on HTTPS with Apache. It has two subdomains: `fair.example.org` (HTTPS) and `archive.example.org` (still plain HTTP).

1. Write an `.htaccess` block that sends CSP, `nosniff`, both clickjacking headers, Referrer-Policy and Permissions-Policy (no camera, microphone or location).
2. Add an HSTS line that is safe for **now**.
3. Explain what must happen before you can use `includeSubDomains` and a one-year `max-age`.

<details>
<summary>Show one possible answer</summary>

1. and 2.

```apache
<IfModule mod_headers.c>
  Header set Content-Security-Policy "default-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'"
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "DENY"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set Permissions-Policy "camera=(), microphone=(), geolocation=()"
  Header set Strict-Transport-Security "max-age=300"
</IfModule>
```

3. `archive.example.org` must get HTTPS first. With `includeSubDomains`, browsers would refuse to open it over plain HTTP, so it would break for visitors. Once every subdomain works on HTTPS, raise `max-age` step by step (for example a day, a month, then `31536000`) and add `includeSubDomains`.

</details>
