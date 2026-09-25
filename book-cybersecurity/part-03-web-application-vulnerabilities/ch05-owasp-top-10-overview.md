# Chapter 5: The OWASP Top 10 — Defending the Web 🛡️🌐

The **Open Web Application Security Project (OWASP)** is an international non-profit foundation dedicated to improving the security of software. Every few years, security researchers worldwide audit millions of web applications to publish the definitive list of the most critical security risks: **The OWASP Top 10**.

For every full-stack developer, understanding this list is the cornerstone of responsible engineering.

---

## 🗺️ The OWASP Top 10 Vulnerability Landscape

Here is the recognized hierarchy of web application security risks:

```
 ┌─────────────────────────────────────────────────────────────┐
 │ A01: Broken Access Control (Unauthorized data viewing/edit) │
 ├─────────────────────────────────────────────────────────────┤
 │ A02: Cryptographic Failures (Plaintext passwords, no TLS)   │
 ├─────────────────────────────────────────────────────────────┤
 │ A03: Injection (SQL Injection, Command Injection, XSS)      │
 ├─────────────────────────────────────────────────────────────┤
 │ A04: Insecure Design (Flawed architectural logic)           │
 ├─────────────────────────────────────────────────────────────┤
 │ A05: Security Misconfiguration (Default passwords, debug on)│
 ├─────────────────────────────────────────────────────────────┤
 │ A06: Vulnerable & Outdated Components (Unpatched npm libs)  │
 ├─────────────────────────────────────────────────────────────┤
 │ A07: Identification & Authentication Failures (Weak 2FA)    │
 ├─────────────────────────────────────────────────────────────┤
 │ A08: Software & Data Integrity Failures (Unsigned updates)  │
 ├─────────────────────────────────────────────────────────────┤
 │ A09: Security Logging & Monitoring Failures (Silent breaches│
 ├─────────────────────────────────────────────────────────────┤
 │ A10: Server-Side Request Forgery (SSRF)                     │
 └─────────────────────────────────────────────────────────────┘
```

---

## 🧱 The Core Philosophy: "Never Trust User Input!"

If there is one axiom every developer must engrave in their mind, it is:
> ⚠️ **All data coming from the outside world is untrusted and potentially hostile until validated and sanitized.**

This includes:
- Form fields (`<input>`, `<textarea>`)
- URL parameters (`?id=42&search=books`)
- HTTP headers (`User-Agent`, `Referer`, `Cookie`)
- File uploads (`photo.jpg`)
- Webhook payloads and third-party APIs

### The Three Defensive Shields:
1. **Validation**: *"Is this data in the expected format?"* (e.g. Is an age field really an integer between 1 and 120?).
2. **Sanitization / Escaping**: *"Strip or encode any executable characters before processing."* (e.g. Turn `<` into `&lt;`).
3. **Parameterization**: *"Keep executable instructions completely separated from user data."* (e.g. SQL Prepared Statements).

---

## 🧠 Checkpoint Quiz

1. **What is the number one vulnerability on the OWASP Top 10?**
   - *Answer: Broken Access Control.*
2. **What does the developer rule "Never trust user input" mean?**
   - *Answer: Any data entering the application from users, URLs, headers, or external APIs must be rigorously validated and sanitized before being processed, displayed, or stored.*
3. **What is the difference between data validation and data escaping?**
   - *Answer: Validation verifies that data conforms to strict rules before acceptance; escaping encodes dangerous characters so they are treated as harmless text rather than executable commands.*

---

## 🎯 Hands-On Mission

Review any form you have written in HTML or PHP. Identify where user input enters your code and list the checks you should perform before saving it to a database!
