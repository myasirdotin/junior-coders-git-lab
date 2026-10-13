# Chapter 12: REST APIs & Real-Time WebSockets ⚡

## 🌟 Real-Life Story

There are two ways to hear news from the school office. You can walk to the office window and ask, "Any news?" The clerk answers, and you walk away. If you want fresh news, you must keep walking back to ask. Or the office can give your class a walkie-talkie. Now either side can speak at any moment, without anyone walking anywhere. A **REST API** is the office window. A **WebSocket** is the walkie-talkie.

## 🎯 What You Will Learn

- Explain what an **API** is and the main rules of **REST** design.
- Design clean REST URLs using nouns and HTTP methods.
- Explain why plain HTTP is awkward for live updates, and what **polling** costs.
- Describe how a **WebSocket** starts with an HTTP upgrade and then stays open.
- Choose between REST, WebSockets and **Server-Sent Events**.

---

## 🧩 What Is an API?

An **API** (Application Programming Interface) is a set of rules that lets one program ask another program for data or actions. A **web API** does this over HTTP (Chapter 7). Instead of HTML pages, it usually sends data as **JSON**, a simple text format like `{"title":"Book of Optics"}`.

A phone app, a website and a school display screen can all use the same API.

---

## 🏛️ REST: Representational State Transfer

**REST** is a popular style for designing web APIs. It is not a new protocol. It simply uses HTTP the way HTTP was meant to be used.

### Rule 1: URLs name things (nouns)

Each thing the API manages is a **resource**, named by a URL.

- ✅ `GET /api/books` — the list of books
- ✅ `GET /api/books/42` — book number 42
- ❌ `/api/getAllBooks` or `/api/deleteBook?id=42`

### Rule 2: Methods say what to do (verbs)

| Request | Meaning | Typical success code |
| :--- | :--- | :--- |
| `GET /api/books` | List books | `200 OK` |
| `GET /api/books/15` | Read book 15 | `200 OK` |
| `POST /api/books` | Add a new book | `201 Created` |
| `PUT /api/books/15` | Replace book 15 | `200 OK` |
| `PATCH /api/books/15` | Change some fields | `200 OK` |
| `DELETE /api/books/15` | Remove book 15 | `204 No Content` |

### Rule 3: Stateless

Each request carries everything the server needs, including who you are. For example, a login token in a header like `Authorization: Bearer <token>`. The server does not rely on remembering the previous request (Chapter 9).

---

## 🔍 See It Yourself: A Tiny REST API

PHP has a built-in web server, so you can run a real API on your own computer. Save this as `books.php` in an empty folder:

```php
<?php
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $book = json_decode(file_get_contents('php://input'), true);
    http_response_code(201);
    echo json_encode(['id' => 3, 'title' => $book['title']]);
    exit;
}
echo json_encode([
    ['id' => 1, 'title' => 'The Canon of Medicine'],
    ['id' => 2, 'title' => 'Book of Optics'],
]);
```

Start it with `php -S localhost:8000`. In a second terminal, read the list:

```
curl.exe -i http://localhost:8000/books.php
```

Output (shortened):

```
HTTP/1.1 200 OK
X-Powered-By: PHP/8.3.31
Content-Type: application/json

[{"id":1,"title":"The Canon of Medicine"},{"id":2,"title":"Book of Optics"}]
```

Now add a book. Save the body `{"title":"The Book of Healing"}` in a file called `book.json` in the same folder, then run:

```
curl.exe -i -X POST http://localhost:8000/books.php -H "Content-Type: application/json" --data-binary "@book.json"
```

- `-X POST` sets the method.
- `--data-binary "@book.json"` sends the file as the body. Using a file avoids quoting problems in PowerShell.

Output (shortened):

```
HTTP/1.1 201 Created
X-Powered-By: PHP/8.3.31
Content-Type: application/json

{"id":3,"title":"The Book of Healing"}
```

This demo does not save anything; a real API would store the book in a database.

---

## ⏳ The Problem with Live Updates

HTTP is **request–response**. The client asks; the server answers. The server cannot start a conversation on its own.

Imagine a library screen showing which study seats are free. With plain HTTP, the screen must ask again and again: "Any change? Any change?" This is called **polling**.

```
Screen            Server
 │ GET /seats ──►  │  no change
 │ GET /seats ──►  │  no change
 │ GET /seats ──►  │  seat 12 free!
```

Polling every 2 seconds sends full HTTP headers each time, even when nothing changed. With hundreds of screens, this wastes a lot of data and server work. And an update can still arrive up to 2 seconds late.

---

## 🔌 WebSockets: A Two-Way Line

The **WebSocket** protocol keeps one TCP connection open (Chapter 4). Once it is open, **both** sides can send messages at any time. This is called **full-duplex**: both directions work at the same time, like a phone call. The addresses start with `ws://`, or `wss://` for the encrypted version (Chapter 10).

### Step 1: The upgrade request

A WebSocket begins as a normal HTTP/1.1 request that asks to switch protocols:

```http
GET /seats HTTP/1.1
Host: library.example.org
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13
```

### Step 2: The server agrees

```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

`101 Switching Protocols` means "yes, let's switch". The server builds `Sec-WebSocket-Accept` from the client's key using a fixed recipe. This proves it really understands WebSockets. (We checked this pair with Python's `hashlib`.)

### Step 3: Messages in frames

From now on, HTTP is no longer used on this connection. Messages travel in small **frames**. Each frame adds only **2 to 14 bytes** of header, depending on the message size and direction. Messages from the browser add a 4-byte "mask" for safety.

```
Screen                Server
  │◄── {"seat":12,"free":true}
  │◄── {"seat":7,"free":false}
  │── {"hello":"screen-3"} ──►
```

A 23-byte update like `{"seat":12,"free":true}` needs only about 2 extra bytes, instead of hundreds of bytes of HTTP headers.

In DevTools (**F12**), the **Network** tab has a **WS** filter. Click a WebSocket and open **Messages** to see each frame.

---

## 📡 Which One Should I Use?

| Technology | Direction | Connection | Good for |
| :--- | :--- | :--- | :--- |
| **REST** (HTTP) | Client asks, server answers | Short, or kept alive | Forms, lists, saving records |
| **WebSocket** | Both ways, any time | One long-lived TCP connection | Shared class whiteboard, live chat for a study group |
| **Server-Sent Events** (SSE) | Server → client only | One long-lived HTTP response | Flood alerts, bus arrival boards, notice boards |

**Server-Sent Events** keep one HTTP response open and let the server add new events to it. It is simpler than WebSockets when only the server needs to talk.

---

## ⚠️ Common Mistake

**Putting verbs in REST URLs.**

- ❌ Wrong: `POST /api/createBook`, `GET /api/deleteBook?id=15`
- What happens: the method and the URL disagree. A GET that deletes is dangerous, because links are followed freely.
- ✅ Right: `POST /api/books` and `DELETE /api/books/15`.

**Using a WebSocket for everything.**

- ❌ Wrong: loading the whole page, forms and images over a WebSocket.
- ✅ Right: use REST for normal requests. Use a WebSocket only for live, two-way updates. It needs a server that keeps many connections open.

---

## ✍️ Try It

Run the `books.php` demo. Then change it so that a `GET` request returns three books instead of two, and check the change with `curl.exe -i`.

> 💡 Hint: add one more `['id' => 3, 'title' => '...']` line inside the list. Use a real book title from the history of science.

---

## 📝 Recap

- An **API** lets programs talk; web APIs usually send JSON over HTTP.
- **REST** uses nouns in URLs and HTTP methods as verbs, and every request stands alone.
- **Polling** repeats requests and wastes data.
- A **WebSocket** starts with `Upgrade: websocket` and `101 Switching Protocols`, then sends small frames both ways.
- WebSocket frames add only 2–14 bytes each.
- Choose REST for normal requests, WebSockets for two-way live data and SSE for server-only updates.

---

## 🏆 Practice

### 🟢 Level 1: Recall
Why do REST URLs use nouns instead of verbs? Which status code means a WebSocket upgrade succeeded?

<details>
<summary>Show answer</summary>

Because the **HTTP method** (GET, POST, PUT, DELETE) already says *what to do*. The URL only needs to say *which thing*.
A successful upgrade returns **`101 Switching Protocols`**.

</details>

### 🟡 Level 2: Apply
Write the REST request (method and URL) for each action on a community clean-up app:
1. List all clean-up events.
2. Create a new event.
3. Change only the meeting time of event 8.
4. Cancel (remove) event 8.

<details>
<summary>Show answer</summary>

1. `GET /api/events`
2. `POST /api/events`
3. `PATCH /api/events/8`
4. `DELETE /api/events/8`

</details>

### 🔴 Level 3: Challenge
A town wants a bus arrival board at the school gate and a live question channel between a teacher and students in an online lesson.
1. For each, choose REST polling, WebSocket or SSE, and give a reason.
2. The board polls every 5 seconds with 400 bytes of headers per request. How many bytes of headers does it send in one hour?
3. Explain how your choice for the board would reduce this.

<details>
<summary>Show one possible answer</summary>

1. **Bus board: SSE.** Only the server needs to send updates. **Question channel: WebSocket.** Teacher and students both send messages at any time.
2. One hour = 3,600 seconds ÷ 5 = 720 requests. 720 × 400 = **288,000 bytes** of headers (about 288 KB), even if nothing changed.
3. With SSE, the board opens one connection once. After that, the server only sends a small event when a bus time actually changes.

</details>
