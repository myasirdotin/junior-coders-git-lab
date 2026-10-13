# Chapter 13: Network Diagnostics & Developer Tools 🛠️

## 🌟 Real-Life Story

When a student feels unwell, the school nurse does not guess. She checks temperature, then pulse, then asks questions, one step at a time, starting with the simplest test. Network engineers work the same way. When "the Internet is not working", they run a few small tests in order. Each test rules something out, until only the real cause is left.

## 🎯 What You Will Learn

- Use `ipconfig`, `ping`, `tracert`, `nslookup`, `curl.exe` and `netstat` on Windows.
- Explain **TTL** and how `tracert` uses it to map a route.
- Follow a step-by-step troubleshooting ladder from the bottom layer up.
- Read the browser's **DevTools Network** panel and its **waterfall**.
- Test responsibly: only on networks you own or have permission to test.

---

## 🛑 First: The Permission Rule

Diagnostic tools are like a doctor's tools: helpful in the right hands. You must **only** test your own devices, your home network, or your school lab network when your teacher allows it. Probing or scanning other people's networks without written permission is wrong, and in many countries it is against the law. Honest testing is part of our *Amānah*.

---

## 🪜 The Troubleshooting Ladder

Start at the bottom layer (Chapter 2). Only move up when a step works.

```
 5. curl.exe   Is the web server OK?  (7)
 4. nslookup   Does the name work?    (7)
 3. ping       Can I reach far away?  (3)
 2. ping gw    Can I reach my router? (3)
 1. ipconfig   Do I have an address?  (3)
 0. Look       Cable in? Wi-Fi on?    (1)
```

The number in brackets is the OSI layer.

---

## 💻 The Tools, One by One

### `ipconfig`: Do I have an address?

```
ipconfig
```

Example output (shortened; yours will differ):

```
Wireless LAN adapter Wi-Fi:

   IPv4 Address. . . . . . . . . . . : 192.168.1.7
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 192.168.1.1
```

If the IPv4 address starts with `169.254`, your computer gave itself an address because no router answered. Check the Wi-Fi or cable. `ipconfig /all` shows more detail, such as your DNS servers.

### `ping`: Can I reach it?

First ping your **default gateway** (your router), then something far away:

```
ping 192.168.1.1
ping example.org
```

Example output for the second one (addresses changed to documentation addresses):

```
Pinging example.org [203.0.113.10] with 32 bytes of data:
Reply from 203.0.113.10: bytes=32 time=20ms TTL=60
Reply from 203.0.113.10: bytes=32 time=19ms TTL=60
Request timed out.
Reply from 203.0.113.10: bytes=32 time=21ms TTL=60

Ping statistics for 203.0.113.10:
    Packets: Sent = 4, Received = 3, Lost = 1 (25% loss),
```

- `time=` is the **round-trip time**: there and back.
- `Request timed out.` means one reply did not come back in time.
- `25% loss` here means 1 of 4 packets was lost. Steady loss suggests a weak or busy link.

### What is TTL?

Every IP packet carries a **TTL** (Time To Live) number. Each router that forwards the packet takes 1 away. If TTL reaches 0, the router throws the packet away and sends back a short "time exceeded" message. This stops lost packets from looping forever.

Computers start packets with a TTL such as 64 or 128. `TTL=60` in the reply suggests the reply started at 64 and passed through about 4 routers.

### `tracert`: Which way do packets go?

`tracert` (trace route) sends packets with TTL 1, then 2, then 3, and so on. Each router where the TTL runs out replies with "time exceeded". So, hop by hop, `tracert` learns every router on the path.

```
tracert -d example.org
```

- `-d` skips looking up router names, so it is much faster.

Example output (addresses changed to documentation and sample addresses):

```
Tracing route to example.org [203.0.113.10]
over a maximum of 30 hops:

  1     3 ms     5 ms     2 ms  192.168.1.1
  2     5 ms     3 ms     2 ms  10.240.15.104
  3     *        *        *     Request timed out.
  4    18 ms    17 ms    18 ms  198.51.100.39
  5    20 ms    19 ms    20 ms  203.0.113.10

Trace complete.
```

- Hop 1 is your router. Hop 2 is often inside your ISP.
- Each hop is tested three times, so there are three times.
- `*` means that router did not reply. Many routers are set to stay quiet. If later hops answer, the path is fine.

On macOS and Linux, the command is `traceroute`.

### `nslookup`: Does the name work?

```
nslookup example.org
```

If you get an address back, DNS works (Chapter 6). If `ping 203.0.113.10` works but `ping example.org` does not, the problem is DNS, not the connection.

### `curl.exe`: Is the web server healthy?

Remember to type `curl.exe`, not `curl`, in Windows PowerShell 5 (Chapter 7).

```
curl.exe -I https://example.org
```

Example output (shortened):

```
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Cache-Control: max-age=14400
```

A `200` means the web server answered properly. A `5xx` code means the network is fine but the server program has a problem.

### `netstat`: What is my computer doing?

```
netstat -ano | findstr LISTENING
```

Example output (shortened):

```
  TCP    0.0.0.0:80     0.0.0.0:0    LISTENING    9096
  TCP    0.0.0.0:443    0.0.0.0:0    LISTENING    9096
  TCP    0.0.0.0:3306   0.0.0.0:0    LISTENING    7120
```

This shows the ports your own computer is listening on, and the PID of each program (Chapter 5).

### A PowerShell shortcut

`Test-NetConnection` checks several things in one go:

```
Test-NetConnection example.org -Port 443
```

The last line, `TcpTestSucceeded : True`, means the TCP handshake on port 443 worked.

---

## 🌐 The Browser's Network Panel

Press **F12** and open the **Network** tab, then reload the page.

```
Name       Status  Type    Size    Time
index      200     doc     12 kB   45 ms
app.js     200     script  (disk)  2 ms
books      201     fetch   1 kB   110 ms
```

- **Status** is the HTTP status code (Chapter 7).
- **Size** `(disk cache)` means the file came from the browser's cache (Chapter 9).
- **Filter** buttons show only `Fetch/XHR` (API calls), `JS`, `CSS`, `Img` or `WS` (WebSockets).

Hover over a row's **Waterfall** bar to see where the time went:

| Part | What it measures |
| :--- | :--- |
| DNS Lookup | Turning the name into an address |
| Initial connection | The TCP handshake |
| SSL | The TLS handshake |
| Waiting for server response (TTFB) | **Time To First Byte**: from sending the request until the first byte of the reply |
| Content Download | Receiving the rest of the reply |

Two more useful settings:

- **Throttling** (the "No throttling" menu) lets you pretend to be on a slow connection, such as 3G. Use it to test your pages for users in rural areas.
- **Preserve log** keeps the list when the page reloads or redirects.

---

## ⚠️ Common Mistake

**Deciding a website is down because ping fails.**

- ❌ Wrong: `ping example.org` shows `Request timed out.` four times, so "the website is down".
- What happens: many servers and firewalls block ping replies on purpose.
- ✅ Right: also try `curl.exe -I` or the browser. Ping only tests one kind of packet.

**Panicking at `*` in tracert.**

- ❌ Wrong: "Hop 3 shows `* * *`, so the route is broken there."
- ✅ Right: if later hops reply, packets are getting through. That router simply does not answer tracert.

---

## ✍️ Try It

On your home network, or your school lab with your teacher's permission, climb the ladder:

1. `ipconfig` — write down your IPv4 address and default gateway.
2. `ping` your gateway, then `ping example.org`.
3. `tracert -d example.org` — how many hops did it take?
4. `curl.exe -I https://example.org` — what status code did you get?

> 💡 Hint: if any step fails, stop there. That is the layer to investigate.

---

## 📝 Recap

- Always get permission before testing a network you do not own.
- Troubleshoot bottom-up: link, address, gateway, far host, DNS, web server.
- `ping` measures round-trip time and loss; `tracert` maps the route using **TTL**.
- `nslookup` tests DNS; `curl.exe -I` tests the web server; `netstat -ano` shows local ports.
- DevTools' Network panel shows status, size, cache use and a timing **waterfall** including TTFB.

---

## 🏆 Practice

### 🟢 Level 1: Recall
Which Windows command maps the routers between you and a server? What does **TTFB** stand for?

<details>
<summary>Show answer</summary>

**`tracert`** (on macOS/Linux: `traceroute`).
**TTFB** = Time To First Byte: the time from sending the request until the first byte of the response arrives.

</details>

### 🟡 Level 2: Apply
A student reports "no Internet". You find:
- `ipconfig` shows `IPv4 Address: 192.168.1.7` and gateway `192.168.1.1`.
- `ping 192.168.1.1` works.
- `ping 203.0.113.10` works.
- `ping example.org` says `Ping request could not find host example.org`.

Which layer or service is failing, and what would you check next?

<details>
<summary>Show answer</summary>

The connection works all the way to a far IP address, so the network is fine. The **name** cannot be turned into an address, so **DNS** is failing.
Next, run `nslookup example.org` and check the DNS servers in `ipconfig /all`. Clearing the cache with `ipconfig /flushdns` may also help.

</details>

### 🔴 Level 3: Challenge
A charity's donation page feels slow. In DevTools, the main request shows: DNS Lookup 5 ms, Initial connection 30 ms, SSL 35 ms, Waiting (TTFB) 1,800 ms, Content Download 20 ms.
1. Add up the total time.
2. Which part is the problem? Is it the network or the server?
3. Suggest two things the developers could check.

<details>
<summary>Show one possible answer</summary>

1. 5 + 30 + 35 + 1,800 + 20 = **1,890 ms**, almost 2 seconds.
2. **TTFB** (1,800 ms) is the problem. DNS, TCP and TLS are all quick, so the network is fine. The **server** is slow to start answering.
3. Check whether a slow database query runs on every page load, and whether the page could be cached (Chapter 9) instead of being built again each time.

</details>
