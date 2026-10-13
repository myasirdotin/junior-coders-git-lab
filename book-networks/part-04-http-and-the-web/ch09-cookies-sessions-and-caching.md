# Chapter 9: Statelessness, Cookies, Sessions & Web Caching 🍪

## 🌟 Real-Life Story

At a school prize evening, guests leave their coats at the cloakroom. The helper hangs each coat on a numbered hook and gives the guest a small token with the same number. Later, the guest just shows the token, and the helper finds the coat at once. The helper does not need to remember any faces. On the web, the coat is your **session**, kept on the server, and the token is a **cookie**, kept in your browser.

## 🎯 What You Will Learn

- Explain what it means that HTTP is **stateless**.
- Describe how a server sets a **cookie** and how the browser sends it back.
- Explain how a **session** uses a cookie to remember a logged-in user.
- Choose safe cookie flags: `HttpOnly`, `Secure` and `SameSite`.
- Use **caching** headers (`Cache-Control`, `ETag`, `Last-Modified`) and recognise `304 Not Modified`.

---

## 🧠 HTTP Is Stateless

**Stateless** means each HTTP request stands alone. The server does not remember the previous request from the same person.

That is simple and fast, but it causes a problem. You log in on page 1. You click to page 2. Without help, the server has no idea that you are the same person who just logged in.

The fix is **state management**: a way to carry "who you are" from one request to the next. Cookies are the main tool.

---

## 🍪 How Cookies Work

A **cookie** is a small piece of text, up to about 4 KB, that a server asks the browser to store. The server sends it with the `Set-Cookie` response header. After that, the browser adds it to every request to the same site, in a `Cookie` request header.

```
1. Browser                 Server
   POST /login  ───────────►
   (name and password)
2.            ◄─────────── 200 OK
              Set-Cookie: sid=k7Q2xP
3. GET /timetable ─────────►
   Cookie: sid=k7Q2xP
4.            ◄─────────── 200 OK
              (Amina's timetable)
```

The raw headers look like this:

```http
HTTP/1.1 200 OK
Set-Cookie: sid=k7Q2xP; Path=/; Secure; HttpOnly; SameSite=Lax
```

```http
GET /timetable HTTP/1.1
Host: school.example.org
Cookie: sid=k7Q2xP
```

---

## 🗄️ Sessions: The Server's Locker

A **session** is a small record that the server keeps about one visitor, for example "this visitor is Amina in class 8B". The server gives the record a long random ID, the **session ID**. Only the ID goes into the cookie.

```
Browser cookie        Server session store
sid=k7Q2xP  ───────►  k7Q2xP → user: Amina
                               class: 8B
                      p3Lm9Z → user: Yusuf
```

This is safer than putting the data itself in the cookie. A cookie can be read and changed by the person who holds it. A session stays on the server.

Because the session ID works like a key, it must stay secret. Anyone who steals it can pretend to be you.

---

## 🛡️ Safe Cookie Flags (*Amānah*)

Login cookies are a trust (*Amānah*). Protect them with these flags:

| Flag | What it does | What it protects against |
| :--- | :--- | :--- |
| `HttpOnly` | JavaScript on the page cannot read the cookie | **XSS**: an attacker's script injected into a page stealing the cookie |
| `Secure` | Cookie is only sent over encrypted HTTPS (Chapter 10) | Someone on shared Wi-Fi reading it |
| `SameSite=Lax` or `Strict` | Cookie is not sent with requests started by other websites | **CSRF**: another site tricking your browser into sending a request as you |

Also give cookies an end time with `Max-Age` (in seconds) or `Expires`, and delete the session when the user logs out.

---

## ⚡ Web Caching: Don't Download It Twice

A **cache** is a saved copy. If the browser already has a file and it has not changed, downloading it again wastes data, time and electricity. HTTP has headers that tell browsers how long they may reuse a file.

### `Cache-Control`

```http
Cache-Control: public, max-age=31536000, immutable
```

| Directive | Meaning |
| :--- | :--- |
| `max-age=31536000` | Reuse for 31,536,000 seconds (365 days) without asking |
| `immutable` | This exact file will never change |
| `no-cache` | You may keep a copy, but check with the server before each use |
| `no-store` | Never save a copy anywhere (for private records like exam results) |
| `private` | Only the user's own browser may save it, not shared caches |

Long `max-age` values are used for files whose names change when their content changes, such as `app.3f9a1c.js`.

### Checking a saved copy: validation

When a cached copy is too old, the browser does not need to download it again. It can ask, "Has this changed?" This is a **conditional request**.

There are two kinds of fingerprints:

- **ETag** (entity tag): a code that changes whenever the file changes, e.g. `ETag: "v1-a9f2bc"`. The browser asks with `If-None-Match: "v1-a9f2bc"`.
- **Last-Modified**: the date the file last changed. The browser asks with `If-Modified-Since: <that date>`.

If nothing changed, the server replies **`304 Not Modified`** with **no body**. The browser uses its saved copy.

```
Browser                       Server
  │ GET /logo.png               │
  │ If-None-Match: "v1-a9f2bc"  │
  ├────────────────────────────►│
  │ 304 Not Modified (no body)  │
  │◄────────────────────────────┤
```

---

## 🔍 See It Yourself: A Real `304`

First, ask for the headers and find `Last-Modified`. In PowerShell or Command Prompt:

```
curl.exe -sI http://example.org | findstr /i "cache-control last-modified"
```

Example output (yours will differ):

```
last-modified: Fri, 09 Oct 2026 20:19:47 GMT
Cache-Control: max-age=14400
```

`max-age=14400` means browsers may reuse the page for 4 hours. Now send that date back as a conditional request:

```
curl.exe -sI -H "If-Modified-Since: Fri, 09 Oct 2026 20:19:47 GMT" http://example.org
```

- `-H` adds your own request header.

Example output (shortened):

```
HTTP/1.1 304 Not Modified
Date: Tue, 13 Oct 2026 02:42:02 GMT
Connection: keep-alive
```

The server sent no page at all, only "your copy is still good".

### Cookies in the browser

Press **F12**, open the **Application** tab (in Firefox: **Storage**), and choose **Cookies**. You will see each cookie's name, value, expiry and its `HttpOnly`, `Secure` and `SameSite` settings.

---

## ⚠️ Common Mistake

**Storing private data inside the cookie.**

- ❌ Wrong: `Set-Cookie: user=Amina; role=teacher`
- What happens: anyone can edit their own cookies in DevTools and change `role=student` to `role=teacher`.
- ✅ Right: store only a random session ID in the cookie. Keep the user and role on the server.

**Forgetting `HttpOnly` and `Secure` on a login cookie.**

- ❌ Wrong: `Set-Cookie: sid=k7Q2xP`
- ✅ Right: `Set-Cookie: sid=k7Q2xP; Path=/; Secure; HttpOnly; SameSite=Lax`

---

## ✍️ Try It

Run the two `curl.exe` commands above. Use the `last-modified` date that *your* first command prints.
Did you get `304 Not Modified`? Now change the date to one year earlier. What status do you get now, and why?

> 💡 Hint: if the file changed *after* the date you send, the server must send the full page again.

---

## 📝 Recap

- HTTP is **stateless**: each request stands alone.
- A server sets a cookie with `Set-Cookie`; the browser sends it back with `Cookie`.
- A **session** keeps user data on the server; the cookie only holds a random session ID.
- Login cookies need `HttpOnly`, `Secure` and `SameSite`.
- `Cache-Control` sets how long a copy may be reused; `ETag` and `Last-Modified` let the browser check it.
- `304 Not Modified` means "use your saved copy" and has no body.

---

## 🏆 Practice

### 🟢 Level 1: Recall
Why does a website need cookies to keep you logged in? What does the `HttpOnly` flag do?

<details>
<summary>Show answer</summary>

Because HTTP is **stateless**: the server does not remember earlier requests. The cookie carries a session ID with every request, so the server can recognise you.
`HttpOnly` stops JavaScript on the page from reading the cookie, which protects it from theft by injected scripts (XSS).

</details>

### 🟡 Level 2: Apply
Choose a `Cache-Control` value for each file:
1. `app.3f9a1c.js`, whose name changes when its content changes.
2. A student's exam results page.
3. The school news page, which changes a few times a day.

<details>
<summary>Show answer</summary>

1. `Cache-Control: public, max-age=31536000, immutable`
2. `Cache-Control: no-store`
3. `Cache-Control: no-cache` (always check), or a short `max-age` such as `max-age=300`.

</details>

### 🔴 Level 3: Challenge
A library website has a login.
1. Write the `Set-Cookie` header it should send after login. The session should last 2 hours.
2. Write the request the browser sends next for `/my-books`.
3. The logo has `ETag: "logo-v4"`. Write the conditional request header and the server's reply if the logo is unchanged.

<details>
<summary>Show one possible answer</summary>

1. Two hours = 7,200 seconds:

```http
Set-Cookie: sid=R8vT2q; Path=/; Max-Age=7200; Secure; HttpOnly; SameSite=Lax
```

2. The browser adds the cookie:

```http
GET /my-books HTTP/1.1
Host: library.example.org
Cookie: sid=R8vT2q
```

3. Conditional request and reply:

```http
GET /logo.png HTTP/1.1
Host: library.example.org
If-None-Match: "logo-v4"
```

```http
HTTP/1.1 304 Not Modified
ETag: "logo-v4"
```

</details>
