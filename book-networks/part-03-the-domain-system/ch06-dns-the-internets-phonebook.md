# Chapter 6: DNS — The Internet's Global Phonebook

## 🌟 Real-Life Story

Bilal wants a copy of *The Canon of Medicine* by Ibn Sina. He asks the librarian at the front desk. She checks her notes first. If the answer is not there, she phones the national library, which sends her to the medicine section, which sends her to the special collection. Finally someone says, "Shelf 4, Row B." She tells Bilal and writes it in her notes for the next student. That is how **DNS** finds the address of a website.

## 🎯 What You Will Learn

- Explain why we need **DNS** to turn names into IP addresses.
- Read a domain name from right to left and name its parts.
- Describe the four kinds of DNS servers in a lookup.
- Recognise common record types: **A**, **AAAA**, **CNAME**, **MX**, **TXT** and **NS**.
- Explain **TTL** and caching, and look up records with `nslookup`.

---

## Why Do We Need DNS?

People remember names, like `example.org`. Routers only understand numbers, like `203.0.113.10` (Chapter 3).

The **Domain Name System** (DNS) connects the two. It is a huge, shared database spread across many servers in the world. When you type a name, DNS finds the matching IP address, usually in a few milliseconds.

DNS lookups usually travel over **UDP port 53** (Chapters 4 and 5). UDP fits well: a question and an answer are small, and a quick retry is easy if one is lost. Large answers can use TCP port 53 instead.

---

## Reading a Domain Name

A domain name is read from **right to left**, from the most general part to the most specific.

```
learn . school . example . org .
  │       │        │       │   │
  │       │        │       │   └ root
  │       │        │       └ TLD
  │       │        └ domain
  │       └ subdomain
  └ sub-subdomain
```

- The **root** is written as a dot at the very end. We usually leave it out.
- The **TLD** (Top-Level Domain) is the last word, like `.org`, `.com` or a country code like `.pk`.
- The **domain** is the name an organisation registers, like `example.org`.
- Anything further left is a **subdomain**, which the owner can create freely.

The DNS tree looks like this:

```
              . (root)
         ┌────┴─────┐
       .com       .org
                    │
               example.org
                    │
            school.example.org
```

---

## The Four Servers in a Lookup

1. **Recursive resolver.** This is the "front desk librarian". Your ISP, school or a public service runs it. It does all the asking for you.
2. **Root name server.** It knows where every TLD lives. There are 13 root server names (`a.root-servers.net` to `m.root-servers.net`). They are copied onto more than a thousand machines around the world. Your question goes to the nearest copy, a trick called **anycast**.
3. **TLD name server.** For `.org`, it knows which servers hold the records for `example.org`.
4. **Authoritative name server.** It holds the real, official records for the domain. It gives the final answer.

```
 You ──► Resolver ──► Root
            │  "ask .org"
            ├────────► .org TLD
            │  "ask ns1.example.org"
            ├────────► Authoritative
            │  "203.0.113.10"
 You ◄──────┘  (answer is cached)
```

The resolver saves each answer in its **cache** (short-term memory). The next person who asks gets the answer at once.

---

## Common DNS Record Types

A domain's settings are stored as **records**. Each record has a type.

| Type | What it does | Example |
| :--- | :--- | :--- |
| **A** | Name → IPv4 address | `example.org` → `203.0.113.10` |
| **AAAA** | Name → IPv6 address | `example.org` → `2001:db8::10` |
| **CNAME** | Name → another name (an alias) | `www.example.org` → `example.org` |
| **MX** | Where email for the domain goes | `mail.example.org`, preference 10 |
| **TXT** | Free text, often to prove you own a domain or protect email | `"v=spf1 mx -all"` |
| **NS** | Which servers are authoritative | `ns1.example.org` |

For MX records, a **lower** preference number means "try this mail server first".

---

## TTL: Time To Live and Caching

Every record comes with a **TTL** (Time To Live). It is a number of seconds. It tells resolvers how long they may keep the answer in their cache.

- `TTL 3600` means "you may reuse this for 1 hour".
- `TTL 300` means "check again after 5 minutes".

A long TTL makes lookups faster and reduces traffic. A short TTL means changes spread faster.

> 💡 **Developer tip:** Before moving a website to a new server, lower its TTL to `300` a day or two early. When you change the IP address, most resolvers will notice within minutes.

---

## See It Yourself: `nslookup`

On Windows, run in Command Prompt or PowerShell:

```
nslookup example.org
```

Example output (addresses changed to documentation addresses; yours will differ):

```
Server:  UnKnown
Address:  192.168.1.1

Non-authoritative answer:
Name:    example.org
Addresses:  2001:db8::10
          203.0.113.10
```

How to read it:

- `Server` and `Address` show **your resolver**. Here it is the home router. `UnKnown` only means the resolver has no name of its own.
- `Non-authoritative answer` means the answer came from a resolver's cache, not straight from the official server.
- `Addresses` lists the AAAA (IPv6) and A (IPv4) records.

To ask for one record type, add `-type=`:

```
nslookup -type=mx school.example.org
```

Example output (sample domain):

```
Non-authoritative answer:
school.example.org  MX preference = 10, mail exchanger = mail.school.example.org
```

### Seeing the TTL in PowerShell

PowerShell's `Resolve-DnsName` also shows the TTL:

```
Resolve-DnsName example.org -Type A
```

Example output (addresses changed to documentation addresses):

```
Name          Type   TTL   Section    IPAddress
----          ----   ---   -------    ---------
example.org   A      113   Answer     203.0.113.10
```

Run it twice, a few seconds apart. The TTL counts **down**, because the resolver is reusing its cached copy.

Windows keeps its own small DNS cache too. `ipconfig /displaydns` shows it, and `ipconfig /flushdns` clears it.

On macOS and Linux, you can also use `dig example.org`.

---

## ⚠️ Common Mistake

**Expecting a DNS change to appear everywhere at once.**

- ❌ Wrong: "I changed my A record. Why do some students still reach the old server?"
- What happens: resolvers keep the old answer until its TTL runs out.
- ✅ Right: lower the TTL before the change, then wait. On your own PC, `ipconfig /flushdns` clears the local copy.

**Pointing a CNAME at an IP address.**

- ❌ Wrong: `www.example.org  CNAME  203.0.113.10`
- ✅ Right: a CNAME must point to a **name**. Use an A record for an IP address: `www.example.org  A  203.0.113.10`.

---

## ✍️ Try It

Run `nslookup example.org` and `nslookup -type=ns example.org`.
Write down your resolver's address, the A and AAAA answers, and the names of the authoritative servers.

> 💡 Hint: the NS answer lines look like `example.org  nameserver = ...`.

---

## 📝 Recap

- DNS turns names into IP addresses, mostly over UDP port 53.
- Names are read right to left: root, TLD, domain, subdomain.
- A lookup goes resolver → root → TLD → authoritative server, and the answer is cached.
- A = IPv4, AAAA = IPv6, CNAME = alias, MX = mail, TXT = text, NS = name servers.
- **TTL** says how many seconds an answer may be cached.

---

## 🏆 Practice

### 🟢 Level 1: Recall
What is the difference between an **A** record and a **CNAME** record? Which server gives the final, official answer?

<details>
<summary>Show answer</summary>

An **A** record maps a name straight to an IPv4 address. A **CNAME** maps a name to *another name*.
The **authoritative name server** gives the final, official answer.

</details>

### 🟡 Level 2: Apply
A record has `TTL 7200`. A resolver fetched it at 09:00.
1. Until what time may the resolver reuse it?
2. The owner changes the IP address at 09:30. When will this resolver see the new address at the latest?

<details>
<summary>Show answer</summary>

1. 7200 seconds = 2 hours, so until **11:00**.
2. At the latest **11:00**, when the cached copy expires and the resolver asks again.

</details>

### 🔴 Level 3: Challenge
A charity, `relief.example.org`, is setting up its DNS. Write the records it needs:
1. The website on IPv4 `198.51.100.20` and IPv6 `2001:db8::20`.
2. `www.relief.example.org` as an alias of the main name.
3. Email delivered to `mail.relief.example.org`.
4. Choose a TTL for each and explain your choice.

<details>
<summary>Show one possible answer</summary>

```
relief.example.org      A      198.51.100.20
relief.example.org      AAAA   2001:db8::20
www.relief.example.org  CNAME  relief.example.org
relief.example.org      MX 10  mail.relief.example.org
```

TTL `3600` (1 hour) for all of them is a good normal choice: fast for visitors, and changes still spread within an hour.
Before a planned move, lower the A and AAAA TTL to `300`.

</details>
