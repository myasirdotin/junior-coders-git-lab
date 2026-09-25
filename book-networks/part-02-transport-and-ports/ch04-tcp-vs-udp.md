# Chapter 4: Transport Protocols: TCP vs. UDP 🚚⚡

IP addresses get packets from Computer A to Computer B across the globe. But what happens once they arrive? Does the application need every single byte delivered with zero errors, or does it need lightning-fast speed above all else?

This brings us to the two great workhorses of the Transport Layer (Layer 4): **TCP** and **UDP**.

---

## 💡 The Mental Model: Certified Registered Mail vs. A Radio Broadcast

- **TCP (Transmission Control Protocol)** is like **Certified Mail with Signature Confirmation**:
  - The sender calls the recipient to verify they are ready.
  - Every single letter is numbered.
  - The recipient signs a return receipt for each letter.
  - If letter #4 is missing in transit, the sender automatically resends it.
  - Guaranteed delivery, exact order, zero loss.
- **UDP (User Datagram Protocol)** is like a **Live Radio Broadcaster**:
  - The speaker speaks into the microphone and broadcasts outward.
  - If static or a bird disrupts 0.1 seconds of audio, the host doesn't pause the whole show to repeat the word.
  - Speed is paramount; old audio is useless.
  - Maximum speed, minimal delay, no delivery guarantees.

---

## 🤝 The TCP 3-Way Handshake (Establishing Trust)

Before TCP transfers a single byte of application data, it must establish a reliable virtual connection using three synchronized packets:

```
    Client (Browser)                              Server (Web Server)
           │                                              │
           │  1. [SYN] Seq=1000                           │
           ├─────────────────────────────────────────────►│
           │     "Can we talk? My start sequence is 1000" │
           │                                              │
           │  2. [SYN-ACK] Seq=5000, Ack=1001             │
           │◄─────────────────────────────────────────────┤
           │     "Yes! I got 1000. My sequence is 5000"   │
           │                                              │
           │  3. [ACK] Seq=1001, Ack=5001                 │
           ├─────────────────────────────────────────────►│
           │     "Acknowledged! Connection ESTABLISHED"   │
           │                                              │
      [ESTABLISHED]                                  [ESTABLISHED]
           │                                              │
           │  ====== Application Data (HTTP) ======>      │
```

### Key Features of TCP:
1. **Reliability**: Positive acknowledgment (ACK) and Automatic Repeat Request (ARQ).
2. **Ordered Delivery**: Packets that arrive out of order are reassembled based on sequence numbers.
3. **Flow Control & Congestion Control**: Sliding window sizing prevents a fast sender from drowning a slow receiver or a congested network router.

---

## 🚀 UDP: Lightweight Datagram Delivery

UDP eliminates handshakes, acknowledgments, and retransmissions. It attaches an ultra-thin 8-byte header and launches the packet into the network:

```
 ┌───────────────────────────────┬───────────────────────────────┐
 │ Source Port (16 bits)         │ Destination Port (16 bits)    │
 ├───────────────────────────────┼───────────────────────────────┤
 │ Length (16 bits)              │ Checksum (16 bits)            │
 └───────────────────────────────┴───────────────────────────────┘
  (Total UDP Header: Only 8 Bytes vs TCP's 20-60 Bytes!)
```

### When to Use TCP vs. UDP:

| Feature | TCP (Transmission Control Protocol) | UDP (User Datagram Protocol) |
| :--- | :--- | :--- |
| **Connection** | Connection-oriented (Handshake required) | Connectionless (Fire and forget) |
| **Reliability** | 100% Guaranteed delivery & ordering | Best-effort; packets may be dropped |
| **Speed** | Slower (acknowledgments & overhead) | Ultra fast (minimal latency) |
| **Header Size** | 20 to 60 bytes | Exactly 8 bytes |
| **Ideal For** | Web browsing (HTTP/HTTPS), Email, File downloads, Financial transactions | Live video streaming (Twitch/YouTube Live), Online gaming, VoIP phone calls, DNS lookups, HTTP/3 (QUIC) |

---

## 🧠 Checkpoint Quiz

1. **What are the three steps of the TCP 3-way handshake?**
   - *Answer: SYN (Synchronize), SYN-ACK (Synchronize-Acknowledge), ACK (Acknowledge).*
2. **Why does live video streaming prefer UDP over TCP?**
   - *Answer: Because in live streaming, a dropped frame is instantly obsolete. Halting the video stream to wait for a retransmitted frame would cause stuttering and buffering.*
3. **What is the size of a standard UDP header compared to TCP?**
   - *Answer: A UDP header is only 8 bytes, while a standard TCP header is at least 20 bytes.*

---

## 🎯 Hands-On Mission

In the Network Studio Lab or your local machine, observe your computer's active TCP connections:
```bash
# View active TCP connections and listening ports
netstat -an | findstr /i "established listening"
```
Notice how many connections are in the `ESTABLISHED` state right now!
