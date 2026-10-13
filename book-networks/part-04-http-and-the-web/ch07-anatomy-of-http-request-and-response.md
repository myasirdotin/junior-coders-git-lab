# Chapter 7: Anatomy of an HTTP Request & Response 📬

## 🌟 Real-Life Story

Zainab fills in a book request slip at the library desk. The slip has a clear layout: what she wants, her name and class, and a box for notes. The librarian replies on a return slip: "Found", "Not in stock" or "Ask at the other desk", plus the book itself. Because both slips always follow the same layout, any librarian can handle any request. The web works the same way, using **HTTP**.

## 🎯 What You Will Learn

- Name the parts of an HTTP **request**: request line, headers, blank line and body.
- Name the parts of an HTTP **response**: status line, headers, blank line and body.
- Choose the right **HTTP method** (GET, POST, PUT, PATCH, DELETE) and explain **safe** and **idempotent**.
- Read the five classes of **status codes**.
- Watch a real HTTP conversation with `curl.exe -v`.

---

## 🌐 What Is HTTP?

**HTTP** (Hypertext Transfer Protocol) is the language browsers and web servers use. It is an Application-layer protocol (Chapter 2). It usually runs over a TCP connection to port 80 (Chapters 4 and 5).

Every exchange has two halves:

```
 Browser (client)          Web server
       │   HTTP request        │
       ├──────────────────────►│
       │   HTTP response       │
       │◄──────────────────────┤
```

HTTP/1.1 is plain text, so people can read it. Its secure version, **HTTPS**, wraps the same messages in encryption. Chapter 10 explains how.

---

## 📨 The HTTP Request

A request has four parts:

1. **Request line**: the method, the path and the HTTP version.
2. **Headers**: `Name: value` lines with extra information.
3. **A blank line**: it marks the end of the headers.
4. **Body** (optional): data being sent, such as a form.

Example request: a donation form sends JSON (JavaScript Object Notation, a text format for data):

```http
POST /api/donations HTTP/1.1
Host: relief.example.org
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Content-Type: application/json
Content-Length: 42

{"cause":"Clean Water Wells","amount":250}
```

- `POST` is the method. `/api/donations` is the path on the server.
- `Host` names the website. One server can host many websites, so this header is required in HTTP/1.1.
- `Content-Type` says the body is JSON.
- `Content-Length: 42` is the size of the body in bytes. That body is exactly 42 characters long.

In the raw bytes, each line ends with two characters: **CR LF** (carriage return, line feed), written `\r\n`. The blank line is just `\r\n` on its own.

---

## 🏷️ HTTP Methods

The **method** says what the client wants to do.

| Method | Purpose | Safe? | Idempotent? |
| :--- | :--- | :--- | :--- |
| `GET` | Read data | ✅ Yes | ✅ Yes |
| `POST` | Create something or start an action | ❌ No | ❌ No |
| `PUT` | Replace a whole record | ❌ No | ✅ Yes |
| `PATCH` | Change some fields of a record | ❌ No | ❌ Not guaranteed |
| `DELETE` | Remove something | ❌ No | ✅ Yes |
| `HEAD` | Like GET, but headers only, no body | ✅ Yes | ✅ Yes |
| `OPTIONS` | Ask what is allowed | ✅ Yes | ✅ Yes |

- **Safe** means the request should only read. It must not change anything on the server.
- **Idempotent** means sending it once or ten times leaves the server in the same final state.

> 💡 **Example:** `DELETE /books/42` removes book 42. Sending it again does not remove anything more. But sending `POST /donations` five times could record five donations! That is why browsers warn you before resending a form.

---

## 📬 The HTTP Response

The server's reply also has four parts:

1. **Status line**: the HTTP version, a **status code** and a short reason.
2. **Headers**: information about the reply.
3. **A blank line**.
4. **Body**: the HTML page, JSON, image or file.

Example response:

```http
HTTP/1.1 201 Created
Date: Tue, 13 Oct 2026 09:20:00 GMT
Server: Apache/2.4.58 (Win64)
Content-Type: application/json; charset=UTF-8
Content-Length: 42
Connection: keep-alive

{"status":"success","receipt":"REC-98214"}
```

- `201 Created` means the donation record was made.
- `Content-Type` tells the browser how to read the body.
- `Connection: keep-alive` means the TCP connection stays open for the next request (Chapter 8).

---

## 🚦 The Five Classes of Status Codes

A status code is a 3-digit number. The first digit tells you the class.

| Class | Meaning | Common codes |
| :--- | :--- | :--- |
| `1xx` | Information, keep going | `101 Switching Protocols` |
| `2xx` | Success | `200 OK`, `201 Created`, `204 No Content` |
| `3xx` | Look somewhere else | `301 Moved Permanently`, `302 Found`, `304 Not Modified` |
| `4xx` | The **client** made a mistake | `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `429 Too Many Requests` |
| `5xx` | The **server** failed | `500 Internal Server Error`, `502 Bad Gateway`, `503 Service Unavailable`, `504 Gateway Timeout` |

A few need care:

- `401 Unauthorized` really means "not logged in". The server does not know who you are.
- `403 Forbidden` means "I know who you are, but you are not allowed".
- `304 Not Modified` means "your saved copy is still good" (Chapter 9).
- `502` and `504` come from a **gateway**, a server that passes requests on to another server behind it.

---

## 🔍 See It Yourself: `curl.exe -v`

`curl` is a command-line tool that speaks HTTP. It comes with Windows 10 and 11.

In Windows PowerShell 5, plain `curl` is a nickname (alias) for a different command, `Invoke-WebRequest`. Always type **`curl.exe`** to get the real curl.

```
curl.exe -v -o NUL http://example.org/
```

- `-v` (verbose) shows the request and response headers.
- `-o NUL` throws the page body away, so the screen stays tidy.

Example output (shortened; addresses changed to documentation addresses; yours will differ):

```
*   Trying 203.0.113.10:80...
* Connected to example.org (203.0.113.10) port 80
> GET / HTTP/1.1
> Host: example.org
> User-Agent: curl/8.21.0
> Accept: */*
>
< HTTP/1.1 200 OK
< Date: Tue, 13 Oct 2026 02:39:53 GMT
< Content-Type: text/html; charset=utf-8
< Connection: keep-alive
< Last-Modified: Fri, 09 Oct 2026 20:18:28 GMT
```

How to read it:

- Lines with `*` are curl's own notes. `Trying ...:80` is the TCP connection to port 80.
- Lines with `>` are the **request** that curl sent.
- The empty `>` line is the blank line that ends the headers.
- Lines with `<` are the **response**. `200 OK` means success.

To print only the response headers, use `curl.exe -I http://example.org/`. It sends a `HEAD` request.

---

## ⚠️ Common Mistake

**Using GET to change data.**

- ❌ Wrong: a link like `GET /books/42/delete`.
- What happens: browsers, link checkers and search engines follow GET links freely. One visit could delete the book.
- ✅ Right: use `DELETE /books/42` (or a `POST` from a form). Keep GET for reading only.

**Mixing up 401 and 403.**

- ❌ Wrong: returning `401` to a logged-in student who opens the teachers' page.
- ✅ Right: return `403 Forbidden`. The server knows who they are; they just lack permission.

---

## ✍️ Try It

Run `curl.exe -I http://example.org/` and `curl.exe -I http://example.org/no-such-page`.
Write down the status line of each. Which header tells you what kind of content the page is?

> 💡 Hint: look for the first line starting with `HTTP/1.1`, and for `Content-Type`.

---

## 📝 Recap

- HTTP is the Application-layer language of the web, usually over TCP port 80.
- A request = request line + headers + blank line + optional body.
- A response = status line + headers + blank line + body.
- GET and HEAD are **safe**; GET, PUT and DELETE are **idempotent**; POST is neither.
- Status codes: 1xx info, 2xx success, 3xx redirect, 4xx client error, 5xx server error.
- Use `curl.exe` (not `curl`) in Windows PowerShell 5.

---

## 🏆 Practice

### 🟢 Level 1: Recall
What separates the headers from the body in an HTTP message? What is the difference between `401` and `403`?

<details>
<summary>Show answer</summary>

A **blank line** (a lone `\r\n`, so the headers end with `\r\n\r\n`).
`401 Unauthorized` means "log in first: I don't know who you are". `403 Forbidden` means "I know who you are, but you are not allowed".

</details>

### 🟡 Level 2: Apply
Choose the method and a likely success status code for each:
1. Show the list of library books.
2. Add a new book to the catalogue.
3. Remove book 15 from the catalogue (no body in the reply).

<details>
<summary>Show answer</summary>

1. `GET /books` → `200 OK`
2. `POST /books` → `201 Created`
3. `DELETE /books/15` → `204 No Content`

</details>

### 🔴 Level 3: Challenge
Write a complete raw HTTP/1.1 request that adds a volunteer to `clinic.example.org` at the path `/api/volunteers`. The body is the JSON `{"name":"Hamza","day":"Friday"}`.
1. Include the request line, `Host`, `Content-Type` and `Content-Length`.
2. Write a sensible response with a status line, one header and a JSON body.

<details>
<summary>Show one possible answer</summary>

The body `{"name":"Hamza","day":"Friday"}` is 31 characters, so 31 bytes.

```http
POST /api/volunteers HTTP/1.1
Host: clinic.example.org
Content-Type: application/json
Content-Length: 31

{"name":"Hamza","day":"Friday"}
```

```http
HTTP/1.1 201 Created
Content-Type: application/json

{"id":7,"name":"Hamza","day":"Friday"}
```

</details>
