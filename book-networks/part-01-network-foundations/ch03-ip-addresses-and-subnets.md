# Chapter 3: IP Addresses, Subnets & CIDR 🗺️

To deliver a letter, the postal carrier needs a street number, street name, and city. In computer networking, every host attached to an IP network requires a unique logical address: an **Internet Protocol (IP) Address**.

---

## 🔢 IPv4: The 32-Bit Foundation

An **IPv4 address** consists of **32 binary bits**, grouped into **four 8-bit octets** separated by periods. We write them in human-readable dotted-decimal notation:

```
Binary:   11000000 . 10101000 . 00000001 . 00000001
Decimal:    192    .    168   .     1    .     1
```
Because each octet is 8 bits ($2^8 = 256$), values range from `0` to `255`.  
The total number of IPv4 addresses is $2^{32} \approx 4,294,967,296$ (about 4.3 billion).

---

## 🌍 The Address Exhaustion Crisis & IPv6

When IPv4 was created in 1981, 4.3 billion addresses seemed limitless. But with smartphones, laptops, smart TVs, and IoT sensors in every home, IPv4 addresses ran out.

Enter **IPv6**:
- Uses **128 bits** (written as 8 groups of 4 hexadecimal digits).
- Example: `2001:0db8:85a3:0000:0000:8a2e:0370:7334`
- Provides $2^{128} \approx 3.4 \times 10^{38}$ unique addresses—enough to assign thousands of IP addresses to every grain of sand on Earth!

---

## 🏠 Private vs. Public IP Addresses & NAT

To prevent IPv4 exhaustion from breaking the web before IPv6 was fully deployed, engineers designated special **Private IP Address Ranges** (RFC 1918):

| Class | Private Address Range | Typical Usage |
| :--- | :--- | :--- |
| **Class A** | `10.0.0.0` to `10.255.255.255` | Large enterprise networks |
| **Class B** | `172.16.0.0` to `172.31.255.255` | Medium networks, universities |
| **Class C** | `192.168.0.0` to `192.168.255.255` | Home and small office LANs |

### Network Address Translation (NAT)
Your home router receives **one single public IP** from your ISP (e.g. `203.0.113.88`).  
All 15 devices in your house receive private IPs (e.g. `192.168.1.10`, `192.168.1.11`).

When you browse a website, your router swaps your internal private IP with its single public IP, tracks the outgoing connection in a NAT state table, and relays the returned response back to your exact laptop.

```
[ Laptop: 192.168.1.15 ] ──┐
[ Phone:  192.168.1.20 ] ──┼──► [ Home Router NAT: Public 203.0.113.88 ] ──► [ Internet ]
[ TV:     192.168.1.30 ] ──┘
```

---

## ✂️ Subnet Masks & CIDR Notation

Every IP address contains two parts:
1. **Network ID**: Identifies the specific network or street.
2. **Host ID**: Identifies the specific device in that network.

How does a router know where the network ID stops and the host ID begins? The **Subnet Mask**!

### Example: Subnet Mask `255.255.255.0`
- `255.255.255.0` in binary has twenty-four `1`s:
  `11111111.11111111.11111111.00000000`
- In **CIDR notation** (Classless Inter-Domain Routing), we write this as `/24`.

```
IP:           192.168.  1.  50
CIDR:         192.168.  1.  50 / 24
              └──────────────┘ └──┘
                Network ID     Host ID
```

### Quick CIDR Reference Table:
| CIDR Prefix | Subnet Mask | Total IPs | Usable Hosts ($2^H - 2$) |
| :--- | :--- | :--- | :--- |
| `/24` | `255.255.255.0` | 256 | 254 |
| `/25` | `255.255.255.128` | 128 | 126 |
| `/26` | `255.255.255.192` | 64 | 62 |
| `/28` | `255.255.255.240` | 16 | 14 |
| `/30` | `255.255.255.252` | 4 | 2 (Router point-to-point) |

> ⚠️ **Why subtract 2?**  
> 1. The first address (all zeros in host bits) is the **Network Identifier**.
> 2. The last address (all ones in host bits) is the **Broadcast Address** (sent to every device on that subnet).

---

## 🧠 Checkpoint Quiz

1. **What is the purpose of NAT in home routers?**
   - *Answer: NAT allows dozens of internal devices with private IP addresses to share a single public IP address on the global Internet.*
2. **In the subnet `192.168.1.0/24`, what are the network and broadcast addresses?**
   - *Answer: Network address is `192.168.1.0`; broadcast address is `192.168.1.255`.*
3. **How many bits make up an IPv4 address vs an IPv6 address?**
   - *Answer: 32 bits for IPv4; 128 bits for IPv6.*

---

## 🎯 Hands-On Mission

Find your machine's local IP address and gateway in your terminal:
```bash
# On Windows PowerShell:
ipconfig | findstr /i "ipv4 default"

# On Linux or Mac:
ip addr show
```
Notice whether your IP starts with `192.168.x.x` or `10.x.x.x`!
