# Chapter 10: TLS/SSL, HTTPS & Digital Trust (*Amānah*) 🔐

## 🌟 Real-Life Story

A clinic needs to post a patient's test results to a hospital in another city. Written on an open postcard, every sorting worker could read them. So the clinic and the hospital agree on a shared secret code that nobody else knows, and write in that code. But first the clinic must be sure the reply really comes from the hospital, not an impostor. So the hospital shows an ID card stamped by a trusted office. **HTTPS** does both jobs: it agrees on a secret code, and it checks the ID card.

## 🎯 What You Will Learn

- Explain why plain HTTP is unsafe on shared networks.
- Tell **symmetric** from **asymmetric** cryptography and say why TLS uses both.
- Describe the **TLS 1.3 handshake** in one round trip, using **key exchange** and **signatures**.
- Explain how **certificates** and **Certificate Authorities** prove a website's identity.
- Read a website's certificate with your browser and with PowerShell.

---

## 👀 Why Plain HTTP Is Not Enough

HTTP (Chapter 7) is plain text. Every router and Wi-Fi access point on the way can read it. On a shared Wi-Fi network, a person with a **packet sniffer** (a program that records network traffic) could read:

- passwords typed into login forms,
- session cookies (Chapter 9), which let them pretend to be you,
- private messages and records.

They could even **change** a page on its way to you. This is called a **man-in-the-middle attack**: someone secretly sits between you and the server.

**HTTPS** is HTTP sent inside **TLS** (Transport Layer Security). TLS gives three protections:

| Protection | Meaning |
| :--- | :--- |
| **Confidentiality** | Only you and the server can read the data |
| **Integrity** | Any change on the way is detected |
| **Authentication** | You know you are talking to the real server |

HTTPS uses TCP port **443** (or UDP 443 with HTTP/3). **SSL** is TLS's old name. All SSL versions are broken and switched off today, but people still say "SSL certificate".

---

## 🔑 Two Kinds of Cryptography

**Cryptography** is the science of keeping messages secret and checking that they are real.

### Symmetric: one shared key

Both sides use the **same secret key** to lock (encrypt) and unlock (decrypt). Examples: **AES** and **ChaCha20**. It is very fast, so it is used for all the actual data.

The problem: how do two strangers get the same key, when every message between them can be read?

### Asymmetric: a key pair

Each side has **two keys** that belong together: a **private key**, kept secret, and a **public key**, shared with everyone. Asymmetric cryptography is slower, but it can do two clever things:

1. **Key exchange.** Two sides each make a temporary key pair and swap only the public halves. Each side mixes its own private half with the other's public half. Both get the **same shared secret**. Someone watching sees only the public halves and cannot work it out. TLS 1.3 uses **ECDHE** (Elliptic-Curve Diffie-Hellman, Ephemeral) for this.
2. **Signatures.** The owner of a private key can **sign** data. Anyone with the public key can check the signature. Only the real owner could have made it.

### The paint-mixing picture

```
 Client                  Server
 secret: red          secret: blue
   │ + shared yellow       │
   ▼                       ▼
 orange ───── swap ────► green
   │                       │
 green + red    =    orange + blue
   └──── same brown ───────┘
```

Each side mixes yellow paint with its own secret colour and swaps the result. Each then adds its own secret colour again. Both end up with the same brown. Someone watching sees yellow, orange and green, but cannot un-mix them to find brown. Real key exchange uses maths that is hard to undo instead of paint.

TLS uses both kinds: **asymmetric** for key exchange and signatures at the start, then **symmetric** for the fast bulk data.

---

## 🤝 The TLS 1.3 Handshake

TLS 1.3 sets up a secure connection in **one round trip** (1-RTT), right after the TCP handshake.

```
 Client                     Server
   │ ClientHello               │
   │  cipher list + key share  │
   ├──────────────────────────►│
   │ ServerHello + key share   │
   │ ── now encrypted: ──      │
   │ Certificate               │
   │ CertificateVerify (sign)  │
   │ Finished                  │
   │◄──────────────────────────┤
   │ Finished                  │
   ├──────────────────────────►│
   │ ==== encrypted HTTP ====  │
```

1. **ClientHello.** The client lists the ciphers (encryption methods) it supports and sends its **key share**, the public half of its temporary key.
2. **ServerHello.** The server picks a cipher and sends its own key share. Now both sides can work out the same secret. Everything after this point is encrypted.
3. **Certificate.** The server sends its certificate, which contains its long-term public key.
4. **CertificateVerify.** The server **signs** the handshake with its private key. This proves it really owns the certificate.
5. **Finished.** Both sides send a check value over the whole handshake. If anyone changed a message, the check fails and the connection stops.

The temporary key pairs are thrown away afterwards. So even if the server's private key is stolen one day, old recorded conversations stay secret. This is called **forward secrecy**.

---

## 📜 Certificates and Certificate Authorities

How does your browser know the certificate really belongs to `example.org`?

1. The website owner creates a key pair and sends a request to a **Certificate Authority** (CA). A CA is a trusted organisation that checks domain ownership.
2. The CA checks that the owner controls the domain.
3. The CA **signs** an **X.509 certificate**. It says: "This public key belongs to `example.org`, valid until this date."
4. Your operating system and browser come with a list of trusted **root CAs**. The browser follows the chain of signatures up to one of them.

```
Root CA  (in your OS)
   │ signs
Intermediate CA
   │ signs
example.org certificate
```

If any check fails (wrong name, expired, unknown CA), the browser shows a full-page warning.

---

## 🔍 See It Yourself: Read a Certificate

### In the browser

1. Click the icon to the left of the address bar.
2. Choose **Connection is secure**, then **Certificate is valid**.
3. Look at **Issued To**, **Issued By** and **Valid to**.

### In PowerShell

This short script connects to a site and prints its certificate details:

```powershell
$req = [Net.HttpWebRequest]::Create('https://example.org')
$req.GetResponse().Close()
$cert = $req.ServicePoint.Certificate
$cert.Subject
$cert.Issuer
$cert.GetExpirationDateString()
```

Example output (issuer name and date are sample values; yours will differ):

```
CN=example.org
CN=Example Trust Issuing CA 3, O=Example Trust Ltd, C=US
26-12-2026 03:43:27
```

- `Subject` `CN=example.org` is the name the certificate protects. **CN** means Common Name.
- `Issuer` is the CA that signed it.
- The last line is the expiry date. Many certificates last only about three months and renew automatically.

---

## 🛡️ HTTPS as *Amānah*

People trust us with their passwords, health records and donations. Keeping them private is an *Amānah*. Good practice:

- Serve every page over HTTPS, not only the login page.
- Never ask users to "click through" a certificate warning.
- Renew certificates automatically, so they never expire by surprise.

---

## ⚠️ Common Mistake

**Saying "the browser encrypts the data with the server's public key".**

- ❌ Wrong: "TLS encrypts my password with the website's public key."
- What really happens: in TLS 1.3, the public key in the certificate is used to check a **signature**. The data is encrypted with a **symmetric key** that both sides worked out by key exchange.
- ✅ Right: "Key exchange makes a shared secret; signatures prove identity; symmetric encryption protects the data."

**Thinking the padlock means the website is honest.**

- ❌ Wrong: "It has HTTPS, so it is a safe, trustworthy site."
- ✅ Right: the padlock only means the connection is private and the name matches. A dishonest site can have a valid certificate too. Always check the address.

---

## ✍️ Try It

Check the certificates of two websites your school uses, in the browser or with the PowerShell script.
For each, write the Subject, the Issuer and the expiry date. Which one expires sooner?

> 💡 Hint: change the address inside `Create('...')` in the script. Keep the `https://`.

---

## 📝 Recap

- HTTPS = HTTP inside TLS: confidentiality, integrity and authentication.
- Symmetric keys are fast and protect the data; asymmetric key pairs do key exchange and signatures.
- TLS 1.3 needs one round trip: ClientHello and ServerHello swap key shares, then the server proves its identity.
- A **CA** signs certificates; browsers trust a built-in list of root CAs.
- Temporary keys give **forward secrecy**.

---

## 🏆 Practice

### 🟢 Level 1: Recall
What is the difference between symmetric and asymmetric cryptography? Which one protects the bulk of the data in HTTPS?

<details>
<summary>Show answer</summary>

Symmetric cryptography uses **one shared secret key** for locking and unlocking. Asymmetric cryptography uses a **key pair**: a private key kept secret and a public key shared openly. It is used for key exchange and signatures.
The bulk data is protected by **symmetric** encryption, because it is much faster.

</details>

### 🟡 Level 2: Apply
Put these TLS 1.3 handshake messages in order and say who sends each:
`Finished`, `ClientHello`, `CertificateVerify`, `ServerHello`, `Certificate`, `Finished`.

<details>
<summary>Show answer</summary>

1. `ClientHello`: client
2. `ServerHello`: server
3. `Certificate`: server
4. `CertificateVerify`: server
5. `Finished`: server
6. `Finished`: client

</details>

### 🔴 Level 3: Challenge
A student connects to `library.example.org` on café Wi-Fi. An attacker on the same Wi-Fi tries three tricks. For each, explain which part of TLS stops it.
1. Recording the traffic to read the student's password.
2. Changing a page on its way to the student.
3. Pretending to be `library.example.org` with a home-made certificate.

<details>
<summary>Show one possible answer</summary>

1. **Confidentiality.** The data is encrypted with a symmetric key from the key exchange. The attacker saw only the public key shares and cannot work out the key.
2. **Integrity.** Every encrypted record carries a check value. A changed record fails the check and is rejected.
3. **Authentication.** The home-made certificate is not signed by a CA in the browser's trusted list, so the browser shows a warning and stops. The attacker also cannot make a valid `CertificateVerify` signature for the real certificate without its private key.

</details>
