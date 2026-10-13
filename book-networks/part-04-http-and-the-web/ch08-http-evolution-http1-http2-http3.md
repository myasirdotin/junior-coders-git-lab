# Chapter 8: The Evolution of HTTP: HTTP/1.1, HTTP/2 & HTTP/3

## 🌟 Real-Life Story

At first, the school canteen had one counter and one queue. If the student in front ordered lunch for the whole class, everyone behind waited. Then the canteen let one helper carry many trays at once, mixing small and big orders. Later, it opened separate paths, so one dropped tray no longer stopped every queue. HTTP grew up in the same three steps: **HTTP/1.1**, **HTTP/2** and **HTTP/3**.

## 🎯 What You Will Learn

- Explain why HTTP/1.0 and HTTP/1.1 became slow for modern pages.
- Describe **head-of-line blocking**.
- Explain how **HTTP/2** uses one connection for many requests (**multiplexing**).
- Explain why **HTTP/3** moved from TCP to **QUIC** over UDP.
- Find which HTTP version a website uses, with DevTools and `curl.exe`.

---

## A Short Timeline

Tim Berners-Lee proposed the World Wide Web in 1989. Early pages were simple documents with text and links. Today a single page may load a hundred files: images, scripts, fonts and stylesheets. HTTP had to change to keep up.

| Year | Version | Big idea |
| :--- | :--- | :--- |
| 1996 | HTTP/1.0 | One TCP connection per file |
| 1997 | HTTP/1.1 | Keep the connection open (`keep-alive`) |
| 2015 | HTTP/2 | Binary frames, many requests at once |
| 2022 | HTTP/3 | Runs over QUIC on UDP |

The *meaning* of HTTP did not change. Methods, status codes and headers (Chapter 7) are the same in every version. What changed is how the messages travel.

---

## HTTP/1.0 and HTTP/1.1: One at a Time

**HTTP/1.0** opened a new TCP connection for every file. A page with 20 icons needed 20 handshakes (Chapter 4). That wasted time.

**HTTP/1.1** added **persistent connections**. The header `Connection: keep-alive` keeps one TCP connection open for many requests, one after another.

### The problem: head-of-line blocking

On one HTTP/1.1 connection, the responses come back **in order**, one at a time. If the first file is big, every small file behind it must wait. This is called **head-of-line blocking**: the item at the front of the line blocks everyone behind it.

```
One HTTP/1.1 connection:
[ big PDF ......... ][css][js][logo]
  everything waits for the big PDF
```

To get around this, browsers open about **six** connections to the same website. This helps, but each connection needs its own handshake and memory on the server.

---

## HTTP/2 (2015): Many Streams on One Connection

HTTP/2 changed how the messages are packed:

1. **Binary frames.** Messages are cut into small binary **frames** instead of plain text lines. Computers read them faster.
2. **Multiplexing.** Each request and response gets its own **stream** number. Frames from many streams are mixed on **one** TCP connection, then sorted at the other end. Multiplexing means "many signals sharing one line".
3. **Header compression (HPACK).** Headers repeat a lot, like `User-Agent` on every request. HPACK sends repeated headers as short codes.
4. **Priority hints.** The browser can say which files matter most, such as the CSS needed to draw the page.

```
One HTTP/2 connection:
[css1][img1][js1][css2][img2][js2]
 frames from 3 streams, mixed
```

Now a big file no longer blocks small ones at the HTTP level.

---

## HTTP/3 (2022): QUIC over UDP

HTTP/2 still had one hidden problem, in the layer below. It runs over **TCP**, and TCP delivers bytes strictly in order. If **one packet** is lost, TCP holds back *all* data behind it, for *every* stream, until the lost packet is resent. On a weak mobile signal this happens often.

**HTTP/3** fixes this by leaving TCP. It runs on **QUIC**, a newer transport protocol built on top of **UDP** (Chapter 4). QUIC does its own resending and ordering, but **separately for each stream**.

```
HTTP/2 stack        HTTP/3 stack
┌────────────┐      ┌────────────┐
│  HTTP/2    │      │  HTTP/3    │
├────────────┤      ├────────────┤
│  TLS       │      │  QUIC      │
├────────────┤      │ (with TLS) │
│  TCP       │      ├────────────┤
├────────────┤      │  UDP       │
│  IP        │      ├────────────┤
└────────────┘      │  IP        │
                    └────────────┘
```

TLS is the encryption layer of HTTPS (Chapter 10). In QUIC, encryption is built in.

### What HTTP/3 gives us

1. **No transport head-of-line blocking.** A lost packet in stream A does not stop stream B.
2. **Faster start.** QUIC sets up the connection and the encryption together, in one round trip. A returning visitor can sometimes send data in the very first packet. This is called **0-RTT** (zero round-trip time).
3. **Connection migration.** A TCP connection is tied to your IP address and port. When your phone moves from school Wi-Fi to mobile data, the address changes and TCP connections break. QUIC names each connection with a **connection ID**, so it can carry on.

---

## Comparison

| Feature | HTTP/1.1 | HTTP/2 | HTTP/3 |
| :--- | :--- | :--- | :--- |
| Transport | TCP | TCP | QUIC over UDP |
| Format | Text | Binary frames | Binary frames |
| Many requests on one connection | ❌ One at a time | ✅ Yes | ✅ Yes |
| Header compression | ❌ None | ✅ HPACK | ✅ QPACK |
| One lost packet stalls all streams | Yes | Yes (TCP) | ❌ No |
| Survives a network change | ❌ No | ❌ No | ✅ Yes |

---

## See It Yourself: Which Version?

### In the browser

1. Open a website and press **F12** to open **DevTools**.
2. Click the **Network** tab and reload the page.
3. Right-click a column heading and tick **Protocol**.

Example (sample rows; yours will differ):

```
Name         Status  Protocol
example.org  200     h2
style.css    200     h2
logo.png     200     h3
```

`http/1.1` means HTTP/1.1, `h2` means HTTP/2 and `h3` means HTTP/3.

### With `curl.exe`

How does a browser learn that a server speaks HTTP/3? The server sends an `alt-svc` (alternative service) header. In PowerShell or Command Prompt:

```
curl.exe -sI https://example.org | findstr /i alt-svc
```

- `-s` is silent mode; `-I` asks for headers only.
- `findstr /i` keeps only lines containing `alt-svc`, ignoring upper or lower case.

Example output:

```
alt-svc: h3=":443"; ma=86400
```

This says: "I also speak **h3** on UDP port **443**. Remember this for **86,400 seconds** (one day)." The next visit can then use HTTP/3.

> 💡 The `curl.exe` built into Windows only speaks HTTP/1.1. Its first line will say `HTTP/1.1 200 OK` even if browsers use HTTP/3. Use DevTools to see the real version.

---

## ⚠️ Common Mistake

**Thinking HTTP/3 is unreliable because it uses UDP.**

- ❌ Wrong: "HTTP/3 uses UDP, so web pages may arrive broken."
- What happens: QUIC adds its own acknowledgements and resending on top of UDP.
- ✅ Right: HTTP/3 is just as reliable as HTTP/2. It only handles losses per stream instead of for the whole connection.

**Thinking a new HTTP version changes your code.**

- ❌ Wrong: "I must rewrite my PHP pages for HTTP/2."
- ✅ Right: methods, headers and status codes stay the same. The web server and browser choose the version for you.

---

## ✍️ Try It

Open three different websites with DevTools' **Protocol** column turned on. For each, write down the protocols you see.
Then run `curl.exe -sI https://example.org | findstr /i alt-svc`. Does the server offer HTTP/3?

> 💡 Hint: the first visit may show `h2`, and a reload may show `h3`, because the browser learned about HTTP/3 from `alt-svc`.

---

## 📝 Recap

- HTTP/1.0 opened a connection per file; HTTP/1.1 kept one open but answered one request at a time.
- **Head-of-line blocking** means one slow item holds up everything behind it.
- HTTP/2 mixes many streams on one TCP connection using binary frames.
- HTTP/3 runs on QUIC over UDP, so one lost packet only delays its own stream.
- QUIC connections survive a change of network using a connection ID.
- Servers advertise HTTP/3 with the `alt-svc` header.

---

## 🏆 Practice

### 🟢 Level 1: Recall
What is **head-of-line blocking**? Which transport does HTTP/3 use instead of TCP?

<details>
<summary>Show answer</summary>

Head-of-line blocking is when the first item in a queue is slow and holds up every item behind it.
HTTP/3 uses **QUIC**, which runs over **UDP**.

</details>

### 🟡 Level 2: Apply
A server sends `alt-svc: h3=":443"; ma=3600`.
1. Which HTTP version is it offering?
2. On which port and which transport?
3. For how long should the browser remember this?

<details>
<summary>Show answer</summary>

1. HTTP/3 (`h3`).
2. Port 443 over UDP (QUIC runs on UDP).
3. 3,600 seconds, which is one hour.

</details>

### 🔴 Level 3: Challenge
A student opens an online lesson page on a bus. The phone switches from bus Wi-Fi to mobile data halfway through.
1. What happens to an HTTP/2 connection? Why?
2. What happens to an HTTP/3 connection? Why?
3. On a weak signal, one packet in ten is lost. Explain which version keeps the page's small files loading more smoothly, and why.

<details>
<summary>Show one possible answer</summary>

1. The HTTP/2 connection breaks. TCP connections are tied to the phone's IP address and port, and the IP address changed. The browser must start a new connection.
2. The HTTP/3 connection usually carries on. QUIC identifies it by a **connection ID**, not by the IP address.
3. HTTP/3. With HTTP/2, each lost packet makes TCP hold back every stream. With HTTP/3, only the stream that lost the packet waits, so other files keep arriving.

</details>
