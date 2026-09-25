# Chapter 7: Anatomy of an HTTP Request & Response 📬

The **Hypertext Transfer Protocol (HTTP)** is the foundation of the World Wide Web. Whenever you click a link, submit a form, or fetch data from an API, your browser formats an HTTP Request and sends it to a web server, which replies with an HTTP Response.

Under the hood, HTTP is a straightforward, human-readable text protocol. Let's inspect the raw bytes sent across the wire!

---

## 📨 The HTTP Request: What Your Browser Sends

An HTTP request consists of three distinct parts:
1. **The Request Line**: Method, URI path, and Protocol version.
2. **Request Headers**: Key-value pairs containing metadata about the client.
3. **Empty Line (`\r\n`)**: Signals the end of headers.
4. **Request Body (Optional)**: Payload data (used in POST, PUT, PATCH).

### Example Raw HTTP Request:
```http
POST /api/v1/relief-donations HTTP/1.1
Host: api.humanitarian-aid.org
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Content-Type: application/json
Content-Length: 58
Authorization: Bearer secret_token_xyz

{"beneficiary": "Clean Water Wells", "amount_usd": 250.00}
```

---

## 🏷️ The Standard HTTP Methods (Verbs)

HTTP methods describe the intended action:

| Method | Purpose | Safe? | Idempotent? |
| :--- | :--- | :--- | :--- |
| **`GET`** | Retrieve data (reads only, never modifies) | ✅ Yes | ✅ Yes |
| **`POST`** | Create a new record or trigger an action | ❌ No | ❌ No |
| **`PUT`** | Completely replace an existing record | ❌ No | ✅ Yes |
| **`PATCH`** | Partially update specific fields of a record | ❌ No | ❌ No |
| **`DELETE`** | Remove a resource | ❌ No | ✅ Yes |
| **`HEAD`** | Same as GET, but returns headers only (no body) | ✅ Yes | ✅ Yes |
| **`OPTIONS`**| Asks the server what methods/origins are allowed | ✅ Yes | ✅ Yes |

> 💡 **What is Idempotence?**  
> An operation is **idempotent** if running it 1 time produces the exact same outcome on the server as running it 100 times.  
> - Sending `DELETE /books/42` once deletes the book. Sending it 5 more times still leaves the book deleted.
> - Sending `POST /donations` 5 times might charge your card 5 times!

---

## 📬 The HTTP Response: What the Server Replies

When the server processes the request, it replies with a structured response:
1. **Status Line**: Protocol version, Status Code, and Reason phrase.
2. **Response Headers**: Metadata from the server (content type, caching, date, cookies).
3. **Empty Line (`\r\n`)**.
4. **Response Body**: The requested HTML, JSON, image, or text.

### Example Raw HTTP Response:
```http
HTTP/1.1 200 OK
Date: Fri, 25 Sep 2026 14:20:00 GMT
Server: Apache/2.4.52 (Ubuntu)
Content-Type: application/json; charset=UTF-8
Content-Length: 82
Connection: keep-alive

{"status": "success", "receipt_id": "REC-98214", "message": "Donation recorded"}
```

---

## 🚦 The 5 HTTP Status Code Classes

HTTP status codes are 3-digit numbers grouped into 5 logical categories:

### 1. `1xx` Informational (Hold on)
- `101 Switching Protocols` (Upgrading to WebSocket)

### 2. `2xx` Success (Everything went well!)
- `200 OK`: Request succeeded.
- `201 Created`: Resource successfully created (standard for `POST`).
- `204 No Content`: Action succeeded, but no body returned (common for `DELETE`).

### 3. `3xx` Redirection (Look over there!)
- `301 Moved Permanently`: URL has permanently changed (SEO updates).
- `302 Found`: Temporary redirect.
- `304 Not Modified`: Cached copy in your browser is still fresh.

### 4. `4xx` Client Errors (You made a mistake!)
- `400 Bad Request`: Malformed syntax or invalid parameters.
- `401 Unauthorized`: Authentication missing (need login).
- `403 Forbidden`: Authenticated, but you lack permission to view this resource.
- `404 Not Found`: The requested URL does not exist.
- `429 Too Many Requests`: Rate limit exceeded.

### 5. `5xx` Server Errors (The server crashed!)
- `500 Internal Server Error`: Unhandled bug or exception in backend code.
- `502 Bad Gateway`: Reverse proxy received an invalid response from backend.
- `503 Service Unavailable`: Server overloaded or undergoing maintenance.
- `504 Gateway Timeout`: Upstream server took too long to reply.

---

## 🧠 Checkpoint Quiz

1. **What is the difference between `401 Unauthorized` and `403 Forbidden`?**
   - *Answer: 401 means "Who are you? (You must authenticate)"; 403 means "I know who you are, but you do not have permission to view this".*
2. **Why is `GET` considered a "safe" HTTP method?**
   - *Answer: Because a GET request should only read data without modifying server state.*
3. **What character sequence separates HTTP headers from the request/response body?**
   - *Answer: An empty line composed of Carriage Return and Line Feed (`\r\n\r\n`).*

---

## 🎯 Hands-On Mission

Send a raw HTTP inspection request using `curl`:
```bash
# -i prints the response status line and headers alongside the body
curl -i https://httpbin.org/get
```
Examine the returned headers and status line!
