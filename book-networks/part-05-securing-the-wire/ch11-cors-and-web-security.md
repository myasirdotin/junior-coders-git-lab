# Chapter 11: CORS, Same-Origin Policy & Web Security

## 🌟 Real-Life Story

In a school, each class keeps its own register. A teacher from class 8A can walk into the office and ask for 8A's register. But a stranger cannot walk in and read 8B's register just because they are in the building. If the office of 8B *wants* to share its register with the library, it writes a note: "The library may read this." Browsers follow the same rule. Pages may only read data from their own **origin**, unless the other server writes a permission note called **CORS**.

## 🎯 What You Will Learn

- Define an **origin** as scheme + host + port.
- Explain what the **Same-Origin Policy** blocks and why.
- Read and write **CORS** headers such as `Access-Control-Allow-Origin`.
- Explain when the browser sends a **preflight** `OPTIONS` request.
- Name three more security headers: **HSTS**, **CSP** and `nosniff`.

---

## The Famous Console Error

Sooner or later, every web developer sees this in the browser console:

```
Access to fetch at 'https://api.example.org/books'
from origin 'http://localhost:3000' has been
blocked by CORS policy: No 'Access-Control-Allow-
Origin' header is present on the requested resource.
```

`fetch` is the browser's JavaScript tool for sending HTTP requests from a page. This error is **not a bug in the browser**. It is a safety rule doing its job.

---

## The Same-Origin Policy

An **origin** is made of three parts:

**Origin = scheme + host + port**

- **Scheme**: `http` or `https`.
- **Host**: the full domain name, such as `school.example.org`.
- **Port**: the port number (Chapter 5). If it is not written, `http` means 80 and `https` means 443.

The **Same-Origin Policy** (SOP) says: JavaScript on a page from one origin may **not read** responses from a different origin.

Why? Imagine you are logged in to your school portal in one tab. In another tab, you open a harmful page. Without SOP, that page's script could send a request to the portal. Your browser would attach your login cookie (Chapter 9), and the script could read your marks. SOP stops the script from reading the answer.

### Same origin or not?

Compared with `https://school.example.org/students`:

| URL | Same origin? | Why |
| :--- | :--- | :--- |
| `https://school.example.org/teachers` | ✅ Yes | Only the path differs |
| `http://school.example.org/students` | ❌ No | Different scheme |
| `https://api.school.example.org/` | ❌ No | Different host |
| `https://school.example.org:8443/` | ❌ No | Different port (8443 vs 443) |

---

## CORS: Permission to Share

Sometimes sharing is wanted. A school's web app at `https://school.example.org` may need data from its own API at `https://api.school.example.org`. These are different origins.

**CORS** (Cross-Origin Resource Sharing) lets the **server** give permission with response headers:

```http
Access-Control-Allow-Origin: https://school.example.org
Access-Control-Allow-Methods: GET, POST
Access-Control-Allow-Headers: Content-Type
```

The browser reads these headers. If the page's origin is allowed, the script may read the response. If not, the browser hides the response and shows the console error.

```
 Page (school.example.org)
        │ fetch
        ▼
 Browser ──request──► API server
        ◄──response── + CORS headers?
        │
  allowed? ── yes ─► page reads data
        └──── no ──► console error
```

### Simple requests and preflight

Some requests are **simple**: a `GET`, `HEAD` or `POST` that uses only basic headers and a basic form-style `Content-Type`. The browser sends them straight away and checks the CORS headers on the reply.

Other requests need a **preflight** first. A preflight is a small `OPTIONS` request that asks, "Am I allowed to send this?" It is needed when the request:

- uses a method such as `PUT`, `PATCH` or `DELETE`,
- sends `Content-Type: application/json`,
- adds a custom header such as `Authorization`.

```
1. Preflight (browser asks)
   OPTIONS /api/donations
   Origin: https://school.example.org
   Access-Control-Request-Method: POST
   Access-Control-Request-Headers: content-type

2. Server answers
   204 No Content
   Access-Control-Allow-Origin: https://school.example.org
   Access-Control-Allow-Methods: GET, POST

3. Browser sends the real POST
```

`Access-Control-Max-Age` tells the browser how many seconds it may remember the answer, so it does not ask before every request.

---

## See It Yourself: A Real CORS Server

You can watch CORS headers with a tiny PHP file and PHP's built-in web server. Save this as `api.php` in an empty folder:

```php
<?php
$allowed = 'http://localhost:3000';
if (($_SERVER['HTTP_ORIGIN'] ?? '') === $allowed) {
    header("Access-Control-Allow-Origin: $allowed");
    header('Vary: Origin');
}
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Max-Age: 600');
    http_response_code(204);
    exit;
}
header('Content-Type: application/json');
echo json_encode(['books' => 1250]);
```

In that folder, start the server with `php -S localhost:8000`. In a **second** terminal, send a preflight as the browser would. `-X OPTIONS` sets the method, `-H` adds headers and `-i` shows response headers:

```
curl.exe -i -X OPTIONS http://localhost:8000/api.php -H "Origin: http://localhost:3000" -H "Access-Control-Request-Method: POST"
```

Output (shortened):

```
HTTP/1.1 204 No Content
X-Powered-By: PHP/8.3.31
Access-Control-Allow-Origin: http://localhost:3000
Vary: Origin
Access-Control-Allow-Methods: GET, POST
Access-Control-Allow-Headers: Content-Type
Access-Control-Max-Age: 600
```

Now pretend to be a page from another origin:

```
curl.exe -i http://localhost:8000/api.php -H "Origin: http://other.example"
```

Output (shortened):

```
HTTP/1.1 200 OK
X-Powered-By: PHP/8.3.31
Content-Type: application/json

{"books":1250}
```

There is **no** `Access-Control-Allow-Origin` line. A browser would hide this response from the other page. But notice: `curl.exe` still printed the data. CORS is enforced by **browsers**, not by the server. That is why private data still needs a real login check on the server.

---

## More Security Headers

| Header | What it does |
| :--- | :--- |
| `Strict-Transport-Security` (HSTS) | Tells the browser: "Only use HTTPS for this site from now on" |
| `Content-Security-Policy` (CSP) | Lists which places scripts, styles and images may load from; blocks injected scripts |
| `X-Content-Type-Options: nosniff` | Stops the browser from guessing a file's type, so a text file is never run as a script |

Example:

```http
Strict-Transport-Security: max-age=31536000
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
```

`'self'` means "only my own origin".

---

## ⚠️ Common Mistake

**Trying to fix CORS in the front-end code.**

- ❌ Wrong: adding `Access-Control-Allow-Origin` to the `fetch` request in JavaScript.
- What happens: nothing changes. The browser only trusts this header when it comes **from the server**.
- ✅ Right: add the CORS headers to the API server's response.

**Allowing everyone with a star.**

- ❌ Wrong: `Access-Control-Allow-Origin: *` on an API that returns private student data.
- What happens: any website may read the public responses. Browsers refuse `*` for requests that carry cookies, so logins may also break.
- ✅ Right: list the exact origins you trust, such as `https://school.example.org`.

---

## ✍️ Try It

Run the PHP demo above. Then edit `$allowed` to `http://localhost:5173` and send the first `curl.exe` command again, still with `Origin: http://localhost:3000`.
Which header disappears? What would the browser do now?

> 💡 Hint: the server only adds `Access-Control-Allow-Origin` when the `Origin` header matches `$allowed` exactly.

---

## 📝 Recap

- An **origin** = scheme + host + port; all three must match.
- The **Same-Origin Policy** stops scripts reading responses from other origins.
- **CORS** headers from the server grant permission; the fix for a CORS error is on the server.
- Non-simple requests (JSON, `Authorization`, `PUT`, `DELETE`) get an `OPTIONS` **preflight** first.
- CORS is a browser rule, not a lock; servers still need real login checks.
- HSTS, CSP and `nosniff` add extra layers of protection.

---

## 🏆 Practice

### 🟢 Level 1: Recall
Which three parts must match for two URLs to have the same origin? Which method does a preflight use?

<details>
<summary>Show answer</summary>

The **scheme**, the **host** and the **port**.
A preflight uses the **`OPTIONS`** method.

</details>

### 🟡 Level 2: Apply
A page at `https://clinic.example.org` calls `https://api.clinic.example.org/visits` with `Content-Type: application/json`.
1. Is this the same origin?
2. Will the browser send a preflight? Why?
3. Which header must the API's response include?

<details>
<summary>Show answer</summary>

1. No. The hosts are different (`api.clinic...` vs `clinic...`).
2. Yes. `application/json` is not a simple content type, so the browser asks first with `OPTIONS`.
3. `Access-Control-Allow-Origin: https://clinic.example.org`, plus `Access-Control-Allow-Headers: Content-Type` in the preflight answer.

</details>

### 🔴 Level 3: Challenge
A charity runs its donation page at `https://give.example.org` and its API at `https://api.give.example.org`.
1. Write the preflight response headers that allow only the donation page to `POST` JSON.
2. Add three security headers to every API response.
3. Explain why the API must still check the user's login even with CORS set correctly.

<details>
<summary>Show one possible answer</summary>

1. Preflight response:

```http
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://give.example.org
Access-Control-Allow-Methods: POST
Access-Control-Allow-Headers: Content-Type
Access-Control-Max-Age: 600
```

2. Security headers:

```http
Strict-Transport-Security: max-age=31536000
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
```

3. CORS only controls what **browsers** let pages read. Tools like `curl.exe` ignore it completely. Only a real login check on the server keeps donors' records safe.

</details>
