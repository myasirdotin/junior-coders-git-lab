# Chapter 5: Ports & Sockets: The Doorways of the Operating System

## 🌟 Real-Life Story

A parcel arrives at a big block of flats. The street address gets the van to the front door. But the building has hundreds of flats. The flat number on the parcel tells the caretaker exactly whose door to knock on. Your computer is that building. The IP address finds the computer, and the **port number** finds the right program inside it.

## 🎯 What You Will Learn

- Explain what a **port** is and why one IP address needs many of them.
- Define a **socket** and a **socket pair**.
- Name the three port ranges and some well-known ports.
- Find which program is using a port with `netstat -ano` and `tasklist`.
- Explain how a **firewall** protects ports.

---

## One Address, Many Programs

Right now, your computer may be running many network programs at once:

- a browser with several tabs open,
- a Quran recitation app playing audio,
- a code editor talking to GitHub,
- a local web server such as Apache in XAMPP.

All of them share **one** IP address. So how does the computer know which incoming data belongs to which program? Each program uses a different **port number**.

A **port** is a number from `0` to `65,535`. It is 16 bits long, so 2¹⁶ = 65,536 values are possible. Ports are part of the TCP and UDP headers you met in Chapter 4.

---

## Sockets and Socket Pairs

A **socket** is one end of a conversation. It is an IP address plus a port:

**Socket = IP address : port**

- `203.0.113.10:443` is a web server's socket.
- `192.168.1.7:52814` is your laptop's socket for one browser connection.

A TCP connection is named by **both** ends. This is called a **socket pair**:

```
Client socket          Server socket
192.168.1.7:52814 ◄──► 203.0.113.10:443
```

Each new connection from your browser uses a different client port. So the server can tell all your tabs apart, even though they come from the same IP address.

---

## The Three Port Ranges

**IANA** (Internet Assigned Numbers Authority) is the group that keeps the official list of ports. It splits them into three ranges.

### Well-known ports (0 – 1,023)

Used by core Internet services. On Linux, a program usually needs administrator rights to listen on these ports.

| Port | Protocol | Used for |
| :--- | :--- | :--- |
| 20, 21 | FTP | Older file transfer |
| 22 | SSH | Secure remote login |
| 25 | SMTP | Sending email between servers |
| 53 | DNS | Turning names into IP addresses |
| 80 | HTTP | Web pages (not encrypted) |
| 443 | HTTPS | Web pages (encrypted) |

### Registered ports (1,024 – 49,151)

Used by apps, databases and development servers. Some common ones:

| Port | Usually used by |
| :--- | :--- |
| 3000 | Node.js development servers |
| 3306 | MySQL and MariaDB databases |
| 5432 | PostgreSQL database |
| 8000 / 8080 | Other web servers, e.g. `php artisan serve` uses 8000 |

These are habits, not rules. Any program can be set to use another free port.

### Dynamic or ephemeral ports (49,152 – 65,535)

**Ephemeral** means short-lived. When your browser opens a connection, the operating system picks a free port from this range for it. When the connection closes, the port is freed. This is the IANA range and the Windows default; Linux uses a slightly different range.

```
Your laptop                 Server
port 52814 ──── request ───► port 443
port 52814 ◄─── reply ────── port 443
(ephemeral)              (well-known)
```

---

## See It Yourself: Who Is Using Port 80?

If XAMPP's Apache will not start, another program may already be using port 80. On Windows, run:

```
netstat -ano | findstr :80
```

- `-o` adds the **PID** (Process ID), the number Windows gives each running program.

Example output (yours will differ):

```
  TCP    0.0.0.0:80      0.0.0.0:0     LISTENING    9096
  TCP    0.0.0.0:8080    0.0.0.0:0     LISTENING    4908
  TCP    [::]:80         [::]:0        LISTENING    9096
```

- `0.0.0.0:80` means "listening on port 80 on every IPv4 address of this computer".
- `[::]:80` is the same for IPv6.
- `9096` is the PID of the program.

Now find the program's name:

```
tasklist /FI "PID eq 9096"
```

Example output:

```
Image Name               PID Session Name   Mem Usage
==================== ======= ============ ===========
httpd.exe               9096 Console        17,488 K
```

`httpd.exe` is Apache. So Apache is the program on port 80.

### Testing a port on a server

PowerShell can test whether a server accepts TCP connections on a port:

```
Test-NetConnection example.org -Port 443
```

Example output (addresses changed to documentation addresses):

```
ComputerName     : example.org
RemoteAddress    : 203.0.113.10
RemotePort       : 443
InterfaceAlias   : Wi-Fi
SourceAddress    : 192.168.1.7
TcpTestSucceeded : True
```

`TcpTestSucceeded : True` means the handshake worked, so something is listening on port 443. Only test servers you own or that your teacher allows.

---

## Port Security & Firewalls (*Amānah*)

Every open, listening port is a door. If a database port is open to the whole Internet, strangers can knock on it.

A **firewall** is a guard that checks each packet's addresses and ports. It allows some and blocks others. A common safe setup:

- ✅ Allow port `443` from anyone, so people can visit the website.
- ❌ Block port `3306` from the Internet, so only the web server itself can reach the database.

Keeping unused doors shut protects the data people trust us with. That is part of our *Amānah*.

---

## ⚠️ Common Mistake

**Searching for `:80` and getting the wrong port.**

- ❌ Wrong: `netstat -ano | findstr :80` and deciding that PID `4908` uses port 80.
- What happens: `findstr :80` also matches `:8080`, `:8000` and even IPv6 addresses that contain `:80`.
- ✅ Right: look carefully at the whole port number, or search with a space after it: `findstr ":80 "`.

**Thinking the client also uses port 443.**

- ❌ Wrong: "My browser sends from port 443 to port 443."
- ✅ Right: the server listens on 443. Your browser uses a temporary **ephemeral** port, such as 52814.

---

## ✍️ Try It

Start Apache in the XAMPP Control Panel. Then run `netstat -ano | findstr ":80 "` and `tasklist` with the PID you find.
Did you see `httpd.exe`? Now stop Apache and run `netstat` again. What disappeared?

> 💡 Hint: if XAMPP is not installed, look for port `443` connections in `netstat -an` instead.

---

## 📝 Recap

- A **port** (0–65,535) picks the program; the IP address picks the computer.
- A **socket** is `IP:port`; a connection is a **socket pair**.
- Well-known ports are 0–1,023 (80 HTTP, 443 HTTPS, 22 SSH, 53 DNS).
- Clients use short-lived **ephemeral** ports; servers listen on fixed ports.
- `netstat -ano` and `tasklist` show which program owns a port.
- Firewalls keep unneeded ports closed.

---

## 🏆 Practice

### 🟢 Level 1: Recall
What is a socket? Give the standard ports for HTTP, HTTPS and SSH.

<details>
<summary>Show answer</summary>

A socket is an IP address plus a port number, for example `192.168.1.7:8080`.
HTTP uses port **80**, HTTPS uses **443** and SSH uses **22**.

</details>

### 🟡 Level 2: Apply
Read this line from `netstat -an`:

```
TCP  192.168.1.7:51200  198.51.100.25:443  ESTABLISHED
```

1. Which side is the client? How do you know?
2. What kind of service is the server probably running?
3. Is port 51200 well-known, registered or ephemeral?

<details>
<summary>Show answer</summary>

1. `192.168.1.7` is the client. It uses a high, temporary port, and it connects *to* the well-known port 443.
2. HTTPS, a secure website, because port 443 is the HTTPS port.
3. Ephemeral (49,152 – 65,535).

</details>

### 🔴 Level 3: Challenge
Your school's web server runs a website and a MySQL database on the same machine.
1. List the two ports it listens on.
2. Write two firewall rules: one allow, one block.
3. Explain why the second rule protects students' data.

<details>
<summary>Show one possible answer</summary>

1. Port **443** (HTTPS website) and port **3306** (MySQL).
2. Rules:

```
ALLOW  TCP 443   from anywhere
BLOCK  TCP 3306  from the Internet
```

3. The website code talks to MySQL from inside the same machine, so outsiders never need port 3306. Blocking it stops strangers from trying to log in to the database where student records are kept.

</details>
