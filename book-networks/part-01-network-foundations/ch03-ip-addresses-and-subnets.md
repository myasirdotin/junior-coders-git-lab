# Chapter 3: IP Addresses, Subnets & CIDR 🗺️

## 🌟 Real-Life Story

A letter needs a full address: the city, the street and the house number. The sorting office first looks at the city and street. Only the local postman cares about the house number. Computer addresses work the same way. One part of an IP address names the **network** (the street). The other part names the **device** (the house).

## 🎯 What You Will Learn

- Read an **IPv4 address** in decimal and in binary.
- Explain why **IPv6** was created and how it is written.
- Tell **private** addresses from **public** ones and explain **NAT**.
- Use a **subnet mask** and **CIDR** notation (like `/24`) to split an address.
- Work out the network address, broadcast address and usable hosts of a subnet.

---

## 🔢 IPv4: Four Numbers, 32 Bits

An **IPv4 address** is 32 bits long. We split it into four groups of 8 bits, called **octets**. Each octet is written as a normal number, with dots in between. This is called **dotted-decimal** notation.

```
Binary:  11000000.10101000.00000001.00000111
Decimal:      192.     168.       1.       7
```

One octet has 8 bits, so it can hold 2⁸ = 256 values: from `0` to `255`. A number like `300` can never appear in an IPv4 address.

All together, IPv4 has 2³² = 4,294,967,296 addresses. That is about 4.3 billion.

### Converting one octet

Each bit in an octet has a place value:

```
128  64  32  16   8   4   2   1
  1   1   0   0   1   0   1   1
```

Add the place values where the bit is `1`: 128 + 64 + 8 + 2 + 1 = **203**. So `11001011` = 203.

---

## 🌍 IPv6: A Much Bigger Address Book

IPv4 was designed in 1981. Nobody imagined phones, laptops and sensors in every home. The free IPv4 addresses ran out.

**IPv6** is the answer:

- It uses **128 bits**.
- It is written as 8 groups of 4 **hexadecimal** digits (0–9 and a–f), with colons.
- It gives 2¹²⁸ addresses, about 3.4 × 10³⁸. That is more than enough for every device we can imagine.

```
Full:   2001:0db8:0000:0000:0000:0000:0000:0001
Short:  2001:db8::1
```

Two rules make it shorter: drop leading zeros in a group, and replace **one** run of all-zero groups with `::`. The `2001:db8::` range is kept for examples in books like this one.

---

## 🏠 Private and Public Addresses, and NAT

Some IPv4 ranges are **private**. They are free to use inside any home, school or office. Routers on the Internet never forward them.

| Private range | CIDR | Typical use |
| :--- | :--- | :--- |
| `10.0.0.0` – `10.255.255.255` | `10.0.0.0/8` | Large organisations |
| `172.16.0.0` – `172.31.255.255` | `172.16.0.0/12` | Medium networks |
| `192.168.0.0` – `192.168.255.255` | `192.168.0.0/16` | Homes and small offices |

A **public** address is unique on the whole Internet. Your ISP usually gives your router one public address, for example `203.0.113.88`.

**NAT** (Network Address Translation) lets many private devices share that one public address. When your laptop sends a packet out, the router swaps the private source address for its public one. It writes the swap in a table. When the reply comes back, it looks up the table and passes the reply to the right device.

```
Laptop  192.168.1.15 ─┐
Tablet  192.168.1.20 ─┼─► Router (NAT)
Printer 192.168.1.30 ─┘   public IP:
                          203.0.113.88
                               │
                               ▼
                           Internet
```

---

## ✂️ Subnet Masks and CIDR

Every IP address has two parts:

1. The **network ID**: which network (the street).
2. The **host ID**: which device on that network (the house).

A **subnet mask** shows where one part ends and the other begins. Its `1` bits cover the network ID. Its `0` bits cover the host ID.

```
Mask 255.255.255.0 in binary:
11111111.11111111.11111111.00000000
└──── 24 ones: network ───┘└ host ┘
```

**CIDR** (Classless Inter-Domain Routing) is a short way to write the mask. You count the `1` bits and write them after a slash. So `255.255.255.0` is written `/24`.

```
192.168.1.7/24
└─network─┘ └ host
 192.168.1    .7
```

### Quick CIDR table

A `/n` prefix leaves (32 − n) host bits. Total addresses = 2 to the power of the host bits.

| CIDR | Subnet mask | Total addresses | Usable hosts |
| :--- | :--- | :--- | :--- |
| `/24` | `255.255.255.0` | 256 | 254 |
| `/25` | `255.255.255.128` | 128 | 126 |
| `/26` | `255.255.255.192` | 64 | 62 |
| `/28` | `255.255.255.240` | 16 | 14 |
| `/30` | `255.255.255.252` | 4 | 2 (a link between two routers) |

> ⚠️ **Why subtract 2?**
> 1. The **first** address (all host bits `0`) is the **network address**. It names the subnet itself.
> 2. The **last** address (all host bits `1`) is the **broadcast address**. A packet sent there reaches every device in the subnet.

### Worked example: splitting a /24 into four /26 subnets

A school has the block `198.51.100.0/24`. It wants four equal subnets: one each for the office, library, science lab and computer lab. Moving from /24 to /26 borrows 2 bits, so 2² = 4 subnets of 64 addresses each.

These results were checked with Python's `ipaddress` module:

```
Subnet             First host     Last host       Broadcast
198.51.100.0/26    198.51.100.1   198.51.100.62   198.51.100.63
198.51.100.64/26   198.51.100.65  198.51.100.126  198.51.100.127
198.51.100.128/26  198.51.100.129 198.51.100.190  198.51.100.191
198.51.100.192/26  198.51.100.193 198.51.100.254  198.51.100.255
```

Each subnet has 64 addresses and 62 usable hosts.

---

## 🔍 See It Yourself: Your Own Address

On Windows, run:

```
ipconfig
```

Example output (shortened; yours will differ):

```
Wireless LAN adapter Wi-Fi:

   IPv6 Address. . . . . . . . . . . : 2001:db8:5c22::7
   IPv4 Address. . . . . . . . . . . : 192.168.1.7
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 192.168.1.1
```

- `IPv4 Address` is your **private** address on this LAN.
- `Subnet Mask 255.255.255.0` means your network is a `/24`.
- `Default Gateway` is your router. Packets for other networks go there.

To show only the useful lines in Command Prompt, try `ipconfig | findstr /i "ipv4 mask gateway"`.

---

## ⚠️ Common Mistake

**Giving a device the network or broadcast address.**

- ❌ Wrong: setting a computer to `192.168.1.0` or `192.168.1.255` in a `/24` network.
- What happens: these two addresses are reserved, so the device cannot talk normally.
- ✅ Right: use a host address from `192.168.1.1` to `192.168.1.254`.

**Thinking a bigger prefix means a bigger network.**

- ❌ Wrong: "/28 is bigger than /24 because 28 > 24."
- ✅ Right: a bigger prefix leaves **fewer** host bits. A /28 has 16 addresses; a /24 has 256.

---

## ✍️ Try It

Run `ipconfig` and find your IPv4 address and subnet mask. Then answer:

1. Is your address private? Which range is it in?
2. What is your network's CIDR prefix?
3. What would the broadcast address of your network be?

> 💡 Hint: for mask `255.255.255.0`, keep the first three octets and put `255` in the last one.

---

## 📝 Recap

- IPv4 addresses have 32 bits in four octets, each from 0 to 255.
- IPv6 addresses have 128 bits, written in hexadecimal groups like `2001:db8::1`.
- Private ranges (`10.x`, `172.16–31.x`, `192.168.x`) are used inside networks; **NAT** shares one public address.
- A subnet mask, or CIDR prefix like `/24`, splits the address into network ID and host ID.
- Usable hosts = total addresses − 2 (network and broadcast).

---

## 🏆 Practice

### 🟢 Level 1: Recall
How many bits are in an IPv4 address and in an IPv6 address? What does NAT do?

<details>
<summary>Show answer</summary>

IPv4 has **32 bits**; IPv6 has **128 bits**.
NAT lets many devices with private addresses share one public address. The router swaps the addresses and remembers each conversation in a table.

</details>

### 🟡 Level 2: Apply
For the subnet `192.168.10.0/24`, write the network address, the broadcast address and the range of usable host addresses.

<details>
<summary>Show answer</summary>

- Network address: `192.168.10.0`
- Broadcast address: `192.168.10.255`
- Usable hosts: `192.168.10.1` to `192.168.10.254` (254 hosts)

</details>

### 🔴 Level 3: Challenge
A community library has the block `203.0.113.0/24`. It needs two equal subnets: one for staff and one for public reading-room computers.
1. Which prefix gives exactly two equal subnets?
2. Write both subnets with their first host, last host and broadcast address.
3. How many usable hosts does each subnet have?

<details>
<summary>Show one possible answer</summary>

1. `/25`. Borrowing 1 bit gives 2¹ = 2 subnets of 128 addresses.
2. The subnets:

```
203.0.113.0/25    hosts .1  – .126  broadcast .127
203.0.113.128/25  hosts .129 – .254 broadcast .255
```

3. Each has 128 − 2 = **126** usable hosts.

</details>
