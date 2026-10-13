# Chapter 2: The OSI & TCP/IP Layer Models

## 🌟 Real-Life Story

Think of a school sending a book parcel to a sister school abroad. The librarian chooses the book and writes a note. A clerk wraps it and numbers the parcels. The post office stamps the city and postcode. A van driver carries it along the road. Each person does one job and passes the parcel on. Nobody needs to know how the others do their work. Networks are built in the same way, in **layers**.

## 🎯 What You Will Learn

- Explain why networks are split into **layers**.
- List the seven layers of the **OSI model** in order.
- Match the four layers of the **TCP/IP model** to the OSI layers.
- Describe **encapsulation**: how each layer wraps the data with its own header.
- Use layers to find where a network problem is.

---

## Why Layers?

When your computer talks to a server far away, many details must work together. There are electrical signals, error checks, addresses, routes and data formats. That is too much for one program to handle.

So engineers split the work into **layers**. A layer is one group of jobs. Each layer:

- does one kind of work,
- takes help from the layer **below** it,
- offers a service to the layer **above** it.

This means one layer can change without breaking the others. For example, you can switch from a cable to Wi-Fi, and your browser still works the same way.

---

## The OSI 7-Layer Model

The **OSI model** (Open Systems Interconnection) is a teaching model made by ISO, an international standards group. It describes network work in seven layers. Layer 1 is at the bottom, closest to the wire.

| Layer | Name | Main job | Data unit | Examples |
| :--- | :--- | :--- | :--- | :--- |
| **7** | Application | Network services for programs | Data | HTTP, DNS, SSH, SMTP |
| **6** | Presentation | Format, compress, encrypt data | Data | JSON, gzip, JPEG, TLS* |
| **5** | Session | Open, keep and close conversations | Data | session setup |
| **4** | Transport | Delivery between programs, ports | Segment / Datagram | TCP, UDP |
| **3** | Network | Addresses and routes across networks | Packet | IP, ICMP, routers |
| **2** | Data Link | Delivery to the next device on the local link | Frame | Ethernet, Wi-Fi, MAC, switches |
| **1** | Physical | Bits as signals | Bits | Cables, fibre, radio |

\* TLS does not fit neatly into one OSI layer. Many books place it at layer 6. You will meet it in Chapter 10.

Most names in the table are taught later in this book. For now, just notice which layer each one lives in.

> 💡 **Memory trick (top to bottom):**
> **A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing.
> (Application, Presentation, Session, Transport, Network, Data Link, Physical)

---

## The TCP/IP 4-Layer Model

The OSI model is great for learning. The real Internet uses a simpler model with four layers. It is called the **TCP/IP model**, after its two most famous protocols.

```
┌──────────────────────────────┐
│ Application  HTTP, DNS, SSH  │ OSI 5-7
├──────────────────────────────┤
│ Transport    TCP, UDP        │ OSI 4
├──────────────────────────────┤
│ Internet     IP, ICMP        │ OSI 3
├──────────────────────────────┤
│ Link         Ethernet, Wi-Fi │ OSI 1-2
└──────────────────────────────┘
```

| TCP/IP layer | Covers OSI layers | Question it answers |
| :--- | :--- | :--- |
| Application | 5, 6, 7 | *What* is the message? |
| Transport | 4 | *Which program* gets it? |
| Internet | 3 | *Which computer* on Earth? |
| Link | 1, 2 | *Which next device* on this wire? |

---

## Encapsulation: Wrapping the Data

When you send a message, the data moves **down** the layers on your computer. Each layer adds a **header**. A header is a small block of instructions for the same layer on the other computer. This wrapping is called **encapsulation**.

```
App data:      [ Salam ]
                   │ + TCP header
                   ▼
Segment:   [TCP|Salam]
                   │ + IP header
                   ▼
Packet:  [IP|TCP|Salam]
                   │ + frame header
                   ▼    and trailer
Frame: [ETH|IP|TCP|Salam|FCS]
```

- The **TCP header** holds port numbers (Chapter 5) and sequence numbers (Chapter 4).
- The **IP header** holds the source and destination IP addresses (Chapter 3).
- The **Ethernet header** holds MAC addresses. The **trailer** holds a check value (FCS) to spot damaged frames.

The receiving computer does the opposite. It removes one header at each layer, going **up**. This is called **decapsulation**. In the end, only the message `Salam` reaches the program.

> 📏 A normal Ethernet frame can carry up to 1,500 bytes of payload. This limit is called the **MTU** (Maximum Transmission Unit). Those 1,500 bytes include the IP and TCP headers, not just your data.

---

## See It Yourself: Layers in `ipconfig`

On Windows, run this in Command Prompt or PowerShell:

```
ipconfig /all
```

Example output (shortened; addresses changed to documentation and sample values; yours will differ):

```
Wireless LAN adapter Wi-Fi:

   Description . . . . . . . : Wireless Network Adapter
   Physical Address. . . . . : 00-1A-2B-3C-4D-5E
   IPv4 Address. . . . . . . : 192.168.1.7(Preferred)
   Subnet Mask . . . . . . . : 255.255.255.0
   Default Gateway . . . . . : 192.168.1.1
   DNS Servers . . . . . . . : 192.0.2.53
```

Each line belongs to a layer:

- `Physical Address` is the MAC address: **Link layer** (OSI 2).
- `IPv4 Address`, `Subnet Mask` and `Default Gateway` belong to the **Internet layer** (OSI 3).
- `DNS Servers` is used by an **Application layer** service (OSI 7).

On macOS or Linux, try `ip addr` (Linux) or `ifconfig` (macOS).

---

## Using Layers to Find Problems

Network engineers often check layers from the bottom up. Fix the lowest broken layer first.

| What you see | Most likely layer |
| :--- | :--- |
| Cable unplugged, Wi-Fi turned off | Physical (1) |
| Connected to Wi-Fi, but no IP address | Network (3), often because the address service failed |
| `ping` works, but the website gives an error page | Application (7) |

---

## ⚠️ Common Mistake

**Mixing up the names of the data units.**

- ❌ Wrong: "The switch reads the packet's MAC address."
- What really happens: MAC addresses live in the **frame** header (layer 2). A packet is the layer 3 unit.
- ✅ Right: "The switch reads the **frame's** MAC address. The router reads the **packet's** IP address."

**Thinking the OSI model is what computers actually run.**

- ❌ Wrong: "My laptop has seven separate network programs, one per layer."
- ✅ Right: OSI is a map for learning and talking about problems. Real systems follow the TCP/IP model.

---

## ✍️ Try It

Run `ipconfig /all` on your computer. Copy four lines from it and label each one with its layer (Link, Internet or Application).

> 💡 Hint: anything with "Address" made of six pairs like `00-1A-...` is a MAC address. Four numbers with dots are IP addresses.

---

## 📝 Recap

- Layers split hard network work into small jobs that can change on their own.
- **OSI** has 7 layers: Application, Presentation, Session, Transport, Network, Data Link, Physical.
- **TCP/IP** has 4 layers: Application, Transport, Internet, Link.
- **Encapsulation** adds a header at each layer going down; **decapsulation** removes them going up.
- Segment = layer 4, packet = layer 3, frame = layer 2.
- When troubleshooting, start at the bottom layer.

---

## 🏆 Practice

### 🟢 Level 1: Recall
At which OSI layer do HTTP, DNS and SSH work? And what is the data unit called at layers 4, 3 and 2?

<details>
<summary>Show answer</summary>

HTTP, DNS and SSH work at the **Application layer** (layer 7).
Layer 4 = **segment** (TCP) or **datagram** (UDP), layer 3 = **packet**, layer 2 = **frame**.

</details>

### 🟡 Level 2: Apply
Match each problem to the most likely layer:
1. A laptop's network cable is cut.
2. The laptop has no IP address after joining Wi-Fi.
3. The website loads but shows `500 Internal Server Error`.

<details>
<summary>Show answer</summary>

1. Physical layer (1): the signal cannot travel.
2. Network layer (3): without an IP address, packets cannot be addressed.
3. Application layer (7): the network works, but the web program on the server failed.

</details>

### 🔴 Level 3: Challenge
A student sends the message `Hello` to a web server.
1. Draw the frame that leaves the computer, showing every header in order.
2. Say which device reads the outer header first: a switch or a router?
3. Explain what the receiving computer does with the headers.

<details>
<summary>Show one possible answer</summary>

1. The frame looks like this:

```
[ETH|IP|TCP|Hello|FCS]
```

2. The **switch** reads the Ethernet header (MAC addresses) first, because it works at layer 2. A router later reads the IP header.
3. The receiver does **decapsulation**. It checks and removes the Ethernet header and trailer, then the IP header, then the TCP header. Only `Hello` reaches the program.

</details>
