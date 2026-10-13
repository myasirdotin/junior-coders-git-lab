# Chapter 4: Transport Protocols: TCP vs. UDP

## 🌟 Real-Life Story

Imagine two ways a school shares news. The first is a signed letter to each parent. Every page is numbered, and the parent signs a slip to say it arrived. If a page is missing, the office sends it again. The second is an announcement over the school loudspeaker. It is instant, but if you missed a word, nobody repeats it. Networks have both kinds of delivery: **TCP** is the signed letter, and **UDP** is the loudspeaker.

## 🎯 What You Will Learn

- Explain what the **Transport layer** (layer 4) adds on top of IP.
- Describe how **TCP** makes delivery reliable with the **3-way handshake**, sequence numbers and acknowledgements.
- Explain why **UDP** is lighter and faster but gives no guarantees.
- Choose TCP or UDP for a given app.
- Read the connection list from `netstat`.

---

## What the Transport Layer Does

IP (layer 3) gets packets from one computer to another. But IP is **best effort**. That means it tries, but packets can be lost, copied twice or arrive out of order. IP does not fix this.

The **Transport layer** sits on top of IP. It has two main protocols:

- **TCP** (Transmission Control Protocol): careful and reliable.
- **UDP** (User Datagram Protocol): light and fast.

Both also carry **port numbers**, which tell the computer *which program* gets the data. Chapter 5 is all about ports.

---

## TCP: The Reliable Courier

Before TCP sends any real data, the two computers agree to talk. This agreement is called the **3-way handshake**. It uses three small messages:

- **SYN** (synchronise): "Can we talk? My numbers start at 1000."
- **SYN-ACK** (synchronise + acknowledge): "Yes. I got 1000. My numbers start at 5000."
- **ACK** (acknowledge): "Got it. Let's begin."

```
 Client                    Server
   │   1. SYN  seq=1000       │
   ├─────────────────────────►│
   │   2. SYN-ACK             │
   │      seq=5000 ack=1001   │
   │◄─────────────────────────┤
   │   3. ACK  ack=5001       │
   ├─────────────────────────►│
   │                          │
 ESTABLISHED          ESTABLISHED
   │ ======= data =========►  │
```

The **ack** number means "I have everything up to here; send the next byte from this number".

### What TCP promises

1. **Reliable delivery.** The receiver sends **acknowledgements** (ACKs). If the sender gets no ACK in time, it sends the data again.
2. **In-order delivery.** Every byte has a **sequence number**. Data that arrives out of order is put back in order.
3. **Flow control.** The receiver says how much it can take. A fast sender cannot flood a slow receiver.
4. **Congestion control.** TCP slows down when the network looks busy, so everyone gets a fair share.

When the conversation ends, each side sends a **FIN** (finish) message to close the connection politely.

TCP's header is **20 to 60 bytes**. That is the cost of all these features.

---

## UDP: The Lightweight Messenger

UDP skips the handshake, the ACKs and the resending. It adds a tiny **8-byte header** and sends the data at once. A UDP message is called a **datagram**.

```
┌──────────────┬──────────────┐
│ Source port  │ Dest. port   │
│   16 bits    │   16 bits    │
├──────────────┼──────────────┤
│ Length       │ Checksum     │
│   16 bits    │   16 bits    │
└──────────────┴──────────────┘
   UDP header = 8 bytes total
```

The **checksum** lets the receiver spot damaged data. But UDP will not ask for it again. If the app needs a missing piece, the app must handle it.

Why would anyone want that? Because in some apps, **late data is useless**. In a live voice call, a word that arrives one second late is worse than a tiny gap. Waiting for a resend would make the sound freeze.

---

## When to Use TCP or UDP

| Feature | TCP | UDP |
| :--- | :--- | :--- |
| Connection | Handshake first | No handshake |
| Reliability | Lost data is resent | Lost data stays lost |
| Order | Always in order | May arrive out of order |
| Speed to start | Slower (1 round trip first) | Instant |
| Header size | 20–60 bytes | 8 bytes |
| Good for | Web pages, email, file downloads, online forms | Voice and video calls, live online lessons, DNS lookups, HTTP/3 (QUIC) |

You will meet DNS in Chapter 6 and HTTP/3 in Chapter 8. HTTP/3 runs over UDP but builds its own reliability on top, so it gets speed *and* safety.

---

## See It Yourself: `netstat`

`netstat` lists the TCP and UDP connections on your computer. On Windows, run:

```
netstat -an
```

- `-a` shows all connections and listening ports.
- `-n` shows numbers instead of names, which is faster.

Example output (shortened; addresses changed to documentation addresses; yours will differ):

```
Active Connections

  Proto  Local Address        Foreign Address      State
  TCP    0.0.0.0:135          0.0.0.0:0            LISTENING
  TCP    192.168.1.7:52814    203.0.113.10:443     ESTABLISHED
  TCP    192.168.1.7:52820    198.51.100.25:443    TIME_WAIT
  UDP    0.0.0.0:5353         *:*
```

How to read it:

- `Proto` is the protocol: TCP or UDP.
- `LISTENING` means a program is waiting for new TCP connections.
- `ESTABLISHED` means the handshake finished and data can flow.
- `TIME_WAIT` means the connection was just closed. Windows waits a short time before reusing it.
- UDP lines have **no state**, because UDP has no connections.

To show only active TCP connections, use `netstat -an | findstr ESTABLISHED`.

---

## ⚠️ Common Mistake

**Thinking UDP is "bad" because it is unreliable.**

- ❌ Wrong: "Always use TCP, it is safer."
- What happens: a live voice call over plain TCP can freeze while it waits for one lost packet.
- ✅ Right: choose by the app's needs. Use TCP when every byte matters. Use UDP when fresh data matters more than perfect data.

**Thinking TCP makes the network itself reliable.**

- ❌ Wrong: "With TCP, packets never get lost."
- ✅ Right: packets still get lost on the network. TCP *notices* the loss and sends them again.

---

## ✍️ Try It

Open a web page in your browser, then quickly run `netstat -an | findstr ESTABLISHED`.
Count how many connections use remote port `443`. Then close the browser, wait a minute, and run it again. What changed?

> 💡 Hint: the remote port is the number after the colon in the `Foreign Address` column.

---

## 📝 Recap

- IP is best effort; the Transport layer adds ports and, with TCP, reliability.
- TCP starts with a 3-way handshake: **SYN, SYN-ACK, ACK**.
- TCP uses sequence numbers and ACKs to resend lost data and keep order.
- UDP has an 8-byte header, no handshake and no resending: fast but no promises.
- Pick TCP for web pages and files; pick UDP for live voice, video and DNS.

---

## 🏆 Practice

### 🟢 Level 1: Recall
Name the three messages of the TCP 3-way handshake, in order. How big is a UDP header?

<details>
<summary>Show answer</summary>

**SYN**, then **SYN-ACK**, then **ACK**.
A UDP header is **8 bytes**. A TCP header is 20 to 60 bytes.

</details>

### 🟡 Level 2: Apply
For each app, choose TCP or UDP and give one reason:
1. Downloading a PDF of the school timetable.
2. A live voice call between two classrooms.
3. Submitting a charity donation form.

<details>
<summary>Show answer</summary>

1. **TCP**: every byte of the PDF must arrive, or the file is broken.
2. **UDP**: late sound is useless; a tiny gap is better than a freeze.
3. **TCP**: the form data must arrive complete and exactly once in order.

</details>

### 🔴 Level 3: Challenge
A client starts a TCP handshake with sequence number `4000`. The server chooses `9000`.
1. Write the three handshake messages with their `seq` and `ack` numbers.
2. The client then sends 100 bytes of data starting at its next sequence number. What `ack` number will the server reply with?

<details>
<summary>Show one possible answer</summary>

1. The handshake:

```
1. SYN      seq=4000
2. SYN-ACK  seq=9000  ack=4001
3. ACK      seq=4001  ack=9001
```

2. The data covers bytes 4001 to 4100. The server replies with **ack=4101**, meaning "send byte 4101 next".

</details>
