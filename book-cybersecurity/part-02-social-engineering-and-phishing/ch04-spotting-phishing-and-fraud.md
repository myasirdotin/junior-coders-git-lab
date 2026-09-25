# Chapter 4: Spotting Phishing, Spoofing & Online Fraud 🎣🕵️

Over 85% of all cybersecurity breaches begin with a phishing lure. Attackers craft pixel-perfect replicas of popular login pages, banking portals, and university portals to harvest credentials.

Learning to deconstruct and spot these deceptive patterns is a fundamental life skill for every digital citizen.

---

## 🔍 The Anatomy of a Phishing Email

Let's dissect a typical fraudulent email step by step:

```
From: "Junior Coders Academy" <security-alerts@juni0r-coders.net>  ◄── Red Flag #1: Lookalike domain!
To: student@school.edu
Subject: URGENT: Verify your account within 12 hours or lose access! ◄── Red Flag #2: Artificial urgency!

Dear Student,

We noticed suspicious login attempts from unknown IP addresses. 
To safeguard your grades and portfolio, verify your credentials:

[ Click Here to Secure Your Account ] ◄── Red Flag #3: Hidden destination URL!
(Hover reveals destination: http://198.51.100.88/fake-login/index.html)

Failure to verify will result in permanent deletion of your files. ◄── Red Flag #4: Coercive threats!

Warm regards,
Security Team
```

---

## 🚩 The 6 Red Flags of Phishing

### 1. The Lookalike / Typosquatting Domain
Attackers register domains that look nearly identical to legitimate services:
- Legitimate: `paypal.com`
- Fraudulent: `paypaI.com` (using a capital `I` instead of `l`), `pay-pal-security.com`, or `paypa1.com`.

### 2. Homograph Attacks (Punycode)
Using characters from different alphabets (like Cyrillic `а` instead of Latin `a`):
- `gооgle.com` looks identical to `google.com`, but the browser translates it to `xn--ggle-p50aa.com`!

### 3. Mismatched Hyperlink Destinations
In HTML, the text of a link does **not** have to match the actual destination:
```html
<!-- Deceptive HTML Link: Visual text lies to the user! -->
<a href="http://malicious-scam.ru/steal-login">https://mybank.com/login</a>
```
Always **hover your cursor** over links before clicking to inspect the real URL in your browser's bottom status bar!

### 4. Generic Greetings
*"Dear Customer"*, *"Valued User"*, or *"Dear Sir/Madam"* instead of your actual registered name.

### 5. Suspicious Attachments
Files ending in `.exe`, `.scr`, `.vbs`, or double extensions like `receipt.pdf.exe` or macro-enabled documents `invoice.docm`.

### 6. Email Header Verification: SPF, DKIM & DMARC
Modern email servers use cryptographic DNS records to prevent sender spoofing:
- **SPF (Sender Policy Framework)**: Lists which server IPs are allowed to send mail on behalf of the domain.
- **DKIM (DomainKeys Identified Mail)**: Cryptographically signs emails to prove they weren't altered in transit.
- **DMARC**: Instructs receivers to discard unauthenticated emails.

---

## 🧠 Checkpoint Quiz

1. **How can you discover the real destination of a hyperlink in an email before clicking it?**
   - *Answer: Hover your mouse cursor over the link and inspect the actual URL preview displayed in the browser or email client's status bar.*
2. **What is a typosquatting attack?**
   - *Answer: Registering a domain name with subtle misspellings or lookalike characters to deceive users who mistype a URL or glance quickly at an address.*
3. **What do SPF and DKIM records accomplish in email security?**
   - *Answer: They cryptographically verify that an email was genuinely dispatched by an authorized server for that domain, preventing unauthorized sender spoofing.*

---

## 🎯 Hands-On Mission

Visit the **Phishing Detective Lab** in our Cybersecurity Lab Studio:
1. Examine a simulated incoming email message.
2. Click the interactive "Red Flag Detector" to spot the lookalike sender domain, the hidden IP link, and the panic-inducing language!
