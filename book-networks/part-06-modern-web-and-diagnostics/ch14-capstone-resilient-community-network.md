# Chapter 14: Capstone: Architecting a Resilient Community Network 🏗️

## 🌟 Real-Life Story

A town is building a new community centre. The architect does not start with bricks. She first asks: who will use it, what must it survive, and where should the doors and locks go? Only then does she draw the plan, room by room. In this capstone, you are the architect. You will plan the network for a town's school, library and charity clinic, using every idea from this book.

## 🎯 What You Will Learn

- Turn real needs (speed, safety, slow connections, failures) into network design choices.
- Plan addresses and subnets for a small cloud network using CIDR.
- Explain, in plain words, the building blocks of a real website: load balancer, bastion host, NAT, CDN and firewall.
- Write the DNS records, HTTPS settings and firewall rules for the design.
- Plan how to diagnose problems when something goes wrong.

---

## 🎯 The Mission: The Oasis Community Portal

The town of Oasis has a school, a public library and a small charity clinic. They want one website, `oasis.example.org`, where:

- students check timetables and library books,
- families book clinic appointments,
- donors give to the clinic's clean-water fund.

### The four requirements

1. **Always available.** If one server breaks, the site must keep working.
2. **Works on slow connections.** Many families use weak mobile signals.
3. **Private and safe (*Amānah*).** Health records and donor details must never travel or sit unprotected.
4. **Easy to fix.** When something goes wrong, staff must be able to find the cause quickly.

---

## 📖 The Building Blocks, in Plain Words

Real websites use a few extra parts. Each one is explained in one sentence here. The rest of the chapter shows where each one fits.

| Term | What it is, in one sentence |
| :--- | :--- |
| **Cloud network (VPC)** | A **Virtual Private Cloud** is a private, fenced-off network that you rent inside a cloud provider's data centre. |
| **Subnet** | A smaller slice of a network's addresses, made with CIDR, like `10.20.1.0/24` (Chapter 3). |
| **Load balancer** | A server that receives every visitor first and shares them out between several web servers, so no single one is overloaded. |
| **Reverse proxy** | A server that answers the public on behalf of the hidden servers behind it; a load balancer is one kind. |
| **Bastion host** | One specially guarded computer that staff must log in to first, before they can reach any other server. |
| **NAT gateway** | A device that lets private servers send requests out to the Internet, for example to download updates, while no one outside can start a connection in (Chapter 3). |
| **Firewall** | A set of rules that allows or blocks traffic by address and port (Chapter 5). |
| **WAF** | A **Web Application Firewall** reads HTTP requests and blocks known attack patterns before they reach the website. |
| **CDN** | A **Content Delivery Network** keeps copies of images, CSS and scripts on servers in many cities, so each visitor downloads them from somewhere nearby. |
| **Anycast** | Many servers share one IP address, and each visitor is routed to the nearest one (Chapter 6). |

---

## 🗺️ The Big Picture

```
 Families, students, donors
            │ HTTPS
            ▼
   [ CDN: images, CSS, JS ]
            │
            ▼
 [ Load balancer + WAF ]
   public 203.0.113.20
       ┌────┴────┐
       ▼         ▼
 [ Web A ]   [ Web B ]
       └────┬────┘
            ▼
     [ Database ]
```

Visitors only ever talk to the CDN and the load balancer. The web servers and the database have **no public addresses**. Two web servers mean that if Web A fails, the load balancer sends everyone to Web B.

---

## 🛠️ Step-by-Step Blueprint

### Step 1: Addresses and subnets

The cloud network gets the private block `10.20.0.0/16`. A /16 has 65,536 addresses. We cut it into /24 subnets of 256 addresses each, one for each job:

| Subnet | CIDR | What lives here | Public? |
| :--- | :--- | :--- | :--- |
| Public | `10.20.1.0/24` | Load balancer, bastion host, NAT gateway | Faces the Internet |
| Web | `10.20.2.0/24` | Web A, Web B | Private |
| Data | `10.20.3.0/24` | Database | Private |

```
10.20.0.0/16  (cloud network)
 ├─ 10.20.1.0/24  public
 ├─ 10.20.2.0/24  web
 └─ 10.20.3.0/24  data
```

Splitting by job lets us put a different firewall rule around each subnet. The database sits deepest, two walls away from the Internet.

### Step 2: Firewall rules

Allow only what is needed. Block everything else.

| From | To | Port | Why |
| :--- | :--- | :--- | :--- |
| Internet | Load balancer | TCP 443, UDP 443 | HTTPS and HTTP/3 |
| Internet | Load balancer | TCP 80 | Only to redirect to HTTPS |
| Load balancer | Web subnet | TCP 443 | Pass visitors on |
| Web subnet | Data subnet | TCP 3306 | Web servers read the database |
| School office `198.51.100.7` | Bastion host | TCP 22 | Staff log in with SSH |
| Bastion host | Web and data subnets | TCP 22 | Staff maintenance |

The database port `3306` is **never** open to the Internet (Chapter 5).

### Step 3: DNS records

```
oasis.example.org      A      203.0.113.20
oasis.example.org      AAAA   2001:db8:20::20
www.oasis.example.org  CNAME  oasis.example.org
oasis.example.org      MX 10  mail.oasis.example.org
```

A TTL of `3600` is fine day to day. Lower it to `300` a day before any planned move (Chapter 6).

### Step 4: HTTPS everywhere

- The load balancer holds a TLS certificate for `oasis.example.org` and renews it automatically (Chapter 10).
- Port 80 only sends a `301 Moved Permanently` to the HTTPS address (Chapter 7).
- HTTP/3 is switched on, so phones that move between Wi-Fi and mobile data keep their connection (Chapter 8).

Security headers on every response (Chapter 11):

```http
Strict-Transport-Security: max-age=31536000
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
Set-Cookie: sid=...; Secure; HttpOnly; SameSite=Lax
```

### Step 5: Fast on slow connections

- **Compression.** The server compresses text with gzip or Brotli, so pages and JSON become much smaller.
- **Caching.** Files like `app.3f9a1c.js` get `Cache-Control: max-age=31536000, immutable`. Clinic records get `no-store` (Chapter 9).
- **CDN.** Images and scripts come from a nearby CDN server, so they travel a shorter distance.
- **Offline reading.** The timetable page can be saved on the phone by a small browser script called a **service worker**, so it opens even with no signal.

### Step 6: A plan for problems

When the clinic says "the site is slow", staff follow the ladder from Chapter 13:

1. `ping` and `tracert -d oasis.example.org` from the clinic: is the path OK?
2. `nslookup oasis.example.org`: does the name give `203.0.113.20`?
3. `curl.exe -I https://oasis.example.org`: what status code comes back?
4. DevTools waterfall: is the delay in the network or in **TTFB** (the server)?

---

## 🌟 The Moral Dimension of Network Engineering

Network engineering is not just moving bits between chips. It is building bridges of trust between people.

When you shrink a page so a family on a weak signal can read a flood warning, when you keep health records behind three walls, and when you lock donors' details inside HTTPS, you are practising *Amānah* (trust) and *Iḥsān* (excellence). May your knowledge be a continuing benefit to others (*'Ilm Nāfi'*).

## 🎓 Textbook Completion Milestone

Congratulations! You have finished all 14 chapters of **Computer Networking & Web Protocols**. Next, try the interactive **Network Lab**, the practice exercises and the quiz in the Learning Networks track.

---

## ⚠️ Common Mistake

**Giving every server a public address.**

- ❌ Wrong: Web A, Web B and the database each get a public IP "to make things easy".
- What happens: anyone on the Internet can knock on the database port and try passwords.
- ✅ Right: only the load balancer (and the bastion host, for one office address) faces the Internet. Everything else stays private.

**Having only one of everything.**

- ❌ Wrong: one web server with no spare.
- What happens: one broken disk takes the whole portal offline.
- ✅ Right: at least two web servers behind a load balancer, plus regular database backups.

---

## ✍️ Try It

Draw the Oasis design from memory on paper, as a text diagram no wider than your notebook page.
Label each box with its subnet, and mark every arrow with its port number.

> 💡 Hint: there are three subnets and five arrows that need ports: 443 (twice), 3306 and 22 (twice).

---

## 📝 Recap

- Start a design from needs: availability, slow connections, privacy and easy fixing.
- Split a private cloud network (VPC) into subnets by job, and guard each with firewall rules.
- Only the load balancer and a guarded bastion host face the Internet.
- DNS, HTTPS, HTTP/3, security headers and caching all play a part.
- Plan diagnostics before trouble starts.

---

## 🏆 Practice

### 🟢 Level 1: Recall
In one sentence each, what is a **load balancer**, a **bastion host** and a **CDN**?

<details>
<summary>Show answer</summary>

- A **load balancer** receives every visitor first and shares them between several servers.
- A **bastion host** is one guarded computer that staff log in to before they can reach any other server.
- A **CDN** keeps copies of files on servers in many places, so visitors download from somewhere nearby.

</details>

### 🟡 Level 2: Apply
The Oasis team wants a fourth subnet for a reporting server, inside `10.20.0.0/16`.
1. Give a suitable /24 subnet that does not overlap the others.
2. How many usable host addresses does it have?
3. Write one firewall rule so the reporting server can read the database.

<details>
<summary>Show answer</summary>

1. `10.20.4.0/24` (any unused `10.20.X.0/24` works).
2. 256 − 2 = **254** usable hosts.
3. `ALLOW  10.20.4.0/24 → 10.20.3.0/24  TCP 3306`

</details>

### 🔴 Level 3: Challenge
Design a smaller network for a village library with a reading room and a staff office.
1. Choose a private block and split it into two subnets. Give each subnet's CIDR and usable host range.
2. List three firewall rules.
3. Write the A record for `library.example.org` using a documentation address.
4. Give two ways to make the library website fast on slow mobile connections.

<details>
<summary>Show one possible answer</summary>

1. Block `192.168.50.0/24`, split into two /25 subnets:

```
192.168.50.0/25    hosts .1 – .126    reading room
192.168.50.128/25  hosts .129 – .254  staff office
```

2. Firewall rules:

```
ALLOW  staff  → Internet       TCP 443
ALLOW  reading room → Internet TCP 443
BLOCK  reading room → staff    all ports
```

3. `library.example.org  A  203.0.113.50`
4. Compress text responses with gzip or Brotli, and give images and scripts long `Cache-Control` lifetimes so returning visitors do not download them again.

</details>
