# Chapter 5: Ports & Sockets: The Doorways of the Operating System 🚪🔌

Your computer has a single physical network card and one IP address. Yet at this very second, your laptop might be running:
- A web browser with 10 tabs open
- A background music player streaming audio
- An IDE connected to GitHub
- A local web server like Apache or Node.js

How does your operating system know which incoming packet belongs to which specific program? The answer is **Port Numbers**!

---

## 💡 The Mental Model: The Apartment Building

Think of your computer as a large apartment high-rise:
- **IP Address**: The street address of the building (`123 Knowledge Way`). This gets the delivery truck to the front doors.
- **Port Number**: The apartment room number (`Apt #80`, `Apt #443`, `Apt #3000`). This ensures the package is handed to the right resident!

---

## 🔢 The Anatomy of a Network Socket

In computer science, a **Socket** is the combination of an **IP Address** and a **Port Number**:

$$\text{Socket} = \text{IP Address} : \text{Port Number}$$

For example:
- `198.51.100.4:443` (A secure web server)
- `192.168.1.15:53218` (Your local laptop's ephemeral outgoing socket)

When two computers communicate, they establish a **Socket Pair**:
```
[ Client Socket: 192.168.1.15:53218 ] <========> [ Server Socket: 93.184.216.34:443 ]
```

---

## 🏷️ The 3 Categories of Port Numbers

Port numbers are 16-bit integers ranging from `0` to `65,535`. The Internet Assigned Numbers Authority (IANA) divides them into three official ranges:

### 1. Well-Known Ports (0 – 1,023)
Reserved for fundamental, system-level internet services (requires administrative/root privileges to bind):
- **Port 20 & 21**: FTP (File Transfer Protocol)
- **Port 22**: SSH (Secure Shell)
- **Port 25**: SMTP (Email sending)
- **Port 53**: DNS (Domain Name System)
- **Port 80**: HTTP (Plaintext Web)
- **Port 443**: HTTPS (Encrypted Web with TLS)

### 2. Registered Ports (1,024 – 49,151)
Used by user applications, databases, and development servers:
- **Port 3000**: Default React / Vite / Node.js development port
- **Port 3306**: MySQL Database
- **Port 5432**: PostgreSQL Database
- **Port 6379**: Redis In-Memory Cache
- **Port 8000 / 8080**: Alternative HTTP / Laravel / Python servers

### 3. Dynamic / Ephemeral Ports (49,152 – 65,535)
Temporary ports assigned automatically by your operating system when your client browser opens an outgoing connection. When the tab closes, the OS frees the port for reuse.

---

## 🛡️ Port Security & Firewalls (*Amānah*)

Any port left open and listening to the internet without proper authentication is a potential security vulnerability.
- A **Firewall** acts as a security guard at the building door, inspecting packet headers and blocking unauthorized port access (e.g. blocking external access to database port `3306` while allowing web traffic on port `443`).

---

## 🧠 Checkpoint Quiz

1. **What is a network socket?**
   - *Answer: An endpoint formed by combining an IP address with a port number (e.g., `192.168.1.5:8080`).*
2. **What are the standard ports for HTTP, HTTPS, and SSH?**
   - *Answer: Port 80 (HTTP), Port 443 (HTTPS), Port 22 (SSH).*
3. **Why does your browser use an ephemeral port (e.g. 52410) instead of port 80 when requesting a webpage?**
   - *Answer: Port 80 is reserved for web servers listening for incoming requests; clients use high ephemeral ports to uniquely track their own independent outbound sessions.*

---

## 🎯 Hands-On Mission

Run a local socket inspection in your terminal:
```bash
# On Windows PowerShell:
Get-NetTCPConnection | Select-Object LocalAddress, LocalPort, RemoteAddress, RemotePort, State -First 10
```
Notice how each connection binds a local port to a remote destination port!
