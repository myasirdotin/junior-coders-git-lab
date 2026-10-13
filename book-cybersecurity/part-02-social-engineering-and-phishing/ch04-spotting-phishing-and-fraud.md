# Chapter 4: Spotting Phishing, Spoofing & Online Fraud

## 🌟 Real-Life Story

Maryam's grandmother receives a letter that looks like it came from her bank. It has a logo, a stamp and a polite tone. But the return address is a small post box in another city. The letter also says she must "reply today or lose her savings". She shows it to Maryam before doing anything. Together they phone the bank using the number printed on her bank card. The bank says it never sent the letter. Checking the details, and checking another way, saved her.

**Phishing** is the online version of that letter: a fake message made to look real, so that you give away passwords or money. **Spoofing** means faking who a message is from.

## 🎯 What You Will Learn

- Take a phishing email apart and find its warning signs.
- Read a web address correctly and spot lookalike domains.
- Check where a link really goes before clicking it.
- Explain in simple words what SPF, DKIM and DMARC do, and what they cannot do.

## Anatomy of a Phishing Email

Here is a made-up phishing email. Each arrow marks a warning sign, or **red flag**.

```
From: "Junior Coders Academy"
  <alerts@juni0r-coders.example.net>
      ◄── Flag 1: lookalike address
Subject: URGENT: verify within 12 hours!
      ◄── Flag 2: rushing you

Dear Student,
We noticed strange logins on your
account. Verify your details:

[ Secure My Account ]
      ◄── Flag 3: hidden destination
(Real link: http://198.51.100.88/login)

Failure to verify will delete
all your files.
      ◄── Flag 4: a threat

Security Team
      ◄── Flag 5: no real name
```

Notice the zero in `juni0r`. Notice the link goes to a bare number address (an **IP address**) instead of a named site. No real school deletes your work for missing a 12-hour deadline.

## Six Red Flags

### Lookalike domains
A **domain** is the name part of a web or email address, such as `example.org`. Tricksters register names that look almost the same as a real one. This is called **typosquatting**.

| Real | Fake lookalikes |
| :--- | :--- |
| `library.example.org` | `library.examp1e.org` (digit 1 for letter l) |
| | `library-example.org` (a dash makes a different domain) |
| | `example.org.login-check.example.net` |

**How to read an address:** find the first single `/` after `https://`. Look just to the left of it. The last two parts there usually name the real owner. In the third fake, the owner is `example.net`, not `example.org`. Everything to the left of that is just decoration.

### Letters from other alphabets
Some letters in other alphabets look the same as English ones. The Cyrillic letter `а` looks just like the English `a`. So `exаmple.org` written with a Cyrillic `а` looks identical to `example.org`. Browsers turn such names into a special form called **Punycode** so they can be spotted:

```
exаmple.org (with Cyrillic а)
  ──►  xn--exmple-4nf.org
```

If you see `xn--` in an address bar, look carefully.

### Links that hide their destination
In HTML, the text you see on a link and the place it goes can be different. The `href` part is the real destination:

```html
<!-- The visible text says one thing... -->
<a href="https://login.examp1e.net/">
  https://library.example.org/login
</a>
<!-- ...but the href goes somewhere else -->
```

**Defence:** on a computer, **hover** your mouse over a link. The real address appears at the bottom of the window. On a phone, press and hold the link to preview it. Better still, do not use the link at all: type the address you already know.

### Generic greetings
"Dear Customer" or "Dear User" instead of your name. Real services that know you often use your name, though a tidy greeting alone proves nothing.

### Dangerous attachments
Be very careful with files ending in `.exe`, `.scr` or `.vbs`. These are programs, not documents. Watch for double endings such as `timetable.pdf.exe`. Windows hides known file endings by default, so it may show only `timetable.pdf`. Turn on **File name extensions** in File Explorer's View menu to see the full name.

### Pressure, threats and too-good offers
"Act now", "your account will be deleted", or "you have won a free tablet". Strong feelings switch off careful thinking. That is exactly why tricksters use them.

## SPF, DKIM and DMARC

Email was invented without any way to prove who sent a message. Three add-ons, published in a domain's settings, help mail servers check:

- **SPF** (Sender Policy Framework): a list of the servers allowed to send email for a domain.
- **DKIM** (DomainKeys Identified Mail): a digital signature on each email. It proves the message came from that domain and was not changed on the way.
- **DMARC**: tells receiving servers what to do when SPF or DKIM checks fail: let it through, put it in spam, or reject it. It also sends reports to the domain owner.

> ⚠️ **What they cannot do:** these checks prove an email really came from `juni0r-coders.example.net`. They cannot tell you that this domain is a fake. A trickster can set up perfect SPF and DKIM for their own lookalike domain. Your eyes are still needed.

## What to Do at Home

- Read the sender's full address, not just the display name.
- Read the domain from the right, just before the first single `/`.
- Hover or press-and-hold before you tap any link.
- When in doubt, open the website yourself by typing its address or using a bookmark.
- Never open unexpected attachments, even from a friend whose account may have been taken over.
- Report phishing using your email app's "Report phishing" button, then delete it.

## ⚠️ Common Mistake

**Mistake:** "The email has the right logo and a padlock link, so it is genuine."

**What happens:** logos are easy to copy. The padlock (HTTPS) only means the connection is encrypted. It says nothing about who owns the site. A fake site can have a padlock too.

**Fixed thinking:** check the **domain**, not the decoration. Then check another way, such as the official app or website you open yourself.

## ✍️ Try It

Open the **Phishing** tab in the Cybersecurity Lab Studio.

1. Read the sample email.
2. Find the lookalike sender, the hidden link and the pressure words.
3. Write down which flag was easiest to miss.

*Hint:* look at every character of the sender's domain, slowly.

## 📝 Recap

- Phishing is a fake message designed to steal passwords or money.
- Red flags: lookalike domains, hidden link destinations, generic greetings, risky attachments, pressure and threats.
- Read a domain from the right, before the first single `/`.
- SPF, DKIM and DMARC help servers check senders, but a lookalike domain can still pass them.
- The padlock means "encrypted", not "trustworthy".

## 🏆 Practice

### 🟢 Level 1: Recall
How can you find out where a link in an email really goes before clicking it?

<details>
<summary>Show answer</summary>

On a computer, hover the mouse over the link and read the address shown at the bottom of the window. On a phone, press and hold the link to see a preview. The safest choice is to type the known address yourself.

</details>

### 🟡 Level 2: Apply
Which domain really owns each address?

1. `https://example.org/books`
2. `https://example.org.renew-card.example.net/login`
3. `https://books.example.org/renew`

<details>
<summary>Show answer</summary>

1. `example.org`
2. `example.net`: everything before it is decoration, so this is a trap.
3. `example.org`: `books` is just a section (a **subdomain**) of the real site.

</details>

### 🔴 Level 3: Challenge
Write your own made-up phishing email for a class lesson, then a "teacher's answer key".

1. Use only made-up names and `example.org` or `example.net` addresses.
2. Include at least four red flags.
3. In the answer key, list each flag and the safe action a student should take.

<details>
<summary>Show one possible answer</summary>

```
From: "City Library"
  <notice@citylibrary-help.example.net>
Subject: FINAL WARNING: card ends tonight

Dear Member,
Your library card has an unpaid fine.
Pay within 2 hours to keep borrowing:
[ Pay Now ]
(real link: http://203.0.113.5/pay)
Attachment: fine_notice.pdf.exe
```

**Answer key**
1. Sender domain is `example.net`, not the library's real domain: check the address.
2. "Within 2 hours" and "final warning": pressure. Slow down.
3. The link goes to a bare IP address: do not click; visit the library site yourself.
4. `fine_notice.pdf.exe` is a program pretending to be a PDF: never open it.
5. "Dear Member": no name.

**Safe action:** report the email as phishing and ask the library directly.

</details>
