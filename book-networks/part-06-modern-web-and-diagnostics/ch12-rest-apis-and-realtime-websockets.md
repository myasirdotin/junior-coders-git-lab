# Chapter 12: REST APIs & Real-Time WebSockets ⚡🔄

Modern web applications do not just load static HTML documents. They constantly exchange data in the background using asynchronous APIs and maintain real-time bidirectional communication channels.

In this chapter, we explore how software communicates across the wire: from standard **RESTful APIs** to low-latency **WebSockets**.

---

## 🏛️ REST: Representational State Transfer

A **REST API** uses the existing standards of HTTP to expose data as accessible resources identified by URLs:

### REST Architectural Principles:
1. **Resource-Oriented URLs (Nouns, Not Verbs)**:
   - ✅ Good: `GET /api/v1/relief-camps` (Retrieve list)
   - ✅ Good: `GET /api/v1/relief-camps/42` (Retrieve single camp)
   - ❌ Bad: `/api/v1/getAllReliefCamps` or `/api/v1/deleteCamp?id=42`
2. **Standard HTTP Verbs for Actions**:
   - `GET /books`: Read list
   - `POST /books`: Create new book
   - `PUT /books/15`: Overwrite book #15
   - `DELETE /books/15`: Remove book #15
3. **Stateless**: Every API request must include all necessary authentication tokens (e.g. `Authorization: Bearer jwt_token`).

---

## ⚡ The Limitation of HTTP for Real-Time Apps

HTTP is fundamentally a **Request-Response** protocol:
- The client asks $\rightarrow$ the server responds.
- The server **cannot** spontaneously talk to the client!

In applications like real-time collaborative whiteboards, live emergency alerts, or live sports scores, client **Polling** (sending a `GET` request every 2 seconds) creates massive server overload and latency.

---

## 🔌 WebSockets: Full-Duplex Bi-Directional Streaming

The **WebSocket Protocol (`ws://` and `wss://`)** provides persistent, full-duplex communication over a single TCP socket connection:

1. **The Handshake**: Starts as a standard HTTP/1.1 request with special upgrade headers:
   ```http
   GET /live-chat HTTP/1.1
   Host: server.example.com
   Upgrade: websocket
   Connection: Upgrade
   Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
   Sec-WebSocket-Version: 13
   ```
2. **The Upgrade Response (`101 Switching Protocols`)**:
   ```http
   HTTP/1.1 101 Switching Protocols
   Upgrade: websocket
   Connection: Upgrade
   Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
   ```
3. **Full-Duplex Data Transfer**: The HTTP protocol is dropped! Both client and server can now shoot lightweight data frames to each other instantly with only **2 bytes of overhead**!

---

## 📡 Web Communication Comparison Matrix

| Technology | Direction | Connection | Latency | Best Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **REST (HTTP)** | Client $\rightarrow$ Server | Short-lived / Keep-Alive | Medium (Headers per req) | Standard CRUD, form submissions, public APIs |
| **WebSockets** | Bi-directional ($\leftrightarrow$) | Persistent long-lived TCP | Ultra-low (Sub-millisecond) | Chat apps, live multiplayer, real-time collaboration |
| **Server-Sent Events (SSE)** | Server $\rightarrow$ Client only | Long-lived HTTP connection | Low | Live stock tickers, news feeds, server monitoring |

---

## 🧠 Checkpoint Quiz

1. **In RESTful design, why do we use nouns instead of verbs in URL paths?**
   - *Answer: Because the HTTP method (GET, POST, PUT, DELETE) already defines the verb/action, while the URL defines the resource/entity.*
2. **What HTTP status code signifies a successful WebSocket handshake upgrade?**
   - *Answer: `101 Switching Protocols`.*
3. **When should you choose Server-Sent Events (SSE) over WebSockets?**
   - *Answer: When communication only flows in one direction (server to client), such as live sports scores or notifications, SSE is simpler and runs over standard HTTP.*

---

## 🎯 Hands-On Mission

In the interactive Network Protocol Lab, test simulated WebSocket message exchanges and observe how low-overhead frames differ from traditional HTTP requests!
