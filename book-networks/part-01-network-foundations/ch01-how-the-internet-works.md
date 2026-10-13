# Chapter 1: How the Internet Actually Works

## 🌟 Real-Life Story

Maryam wants to send a 500-page science report to her cousin in another country. The post office only accepts postcards. So she tears out each page and writes three things on it: her address, her cousin's address and a page number. The postcards travel on different vans and planes. Some arrive early and some arrive late. Her cousin sorts them by page number and rebuilds the whole report. That is exactly how the Internet moves your messages.

## 🎯 What You Will Learn

- Explain how **packet switching** breaks data into small pieces and rebuilds it.
- Name the parts of a network: clients, servers, network cards, switches and routers.
- Tell the difference between a **MAC address** and an **IP address**.
- Describe the three ways bits travel: electricity, light and radio waves.
- Run `ping` and read its output line by line.

---

## The Big Idea: Packet Switching

A **network** is two or more devices joined together so they can share data. The **Internet** is a network of networks. It joins millions of smaller networks across the world.

When you send a file, your computer does not send it in one huge piece. It cuts the file into small **packets**. A packet is a small block of data, usually up to about 1,500 bytes. Each packet carries a label, just like Maryam's postcards:

| On the postcard | In a packet |
| :--- | :--- |
| Maryam's address | **Source address** |
| Cousin's address | **Destination address** |
| Page number | **Sequence number** |

Different packets may take different roads. The receiving computer puts them back in order. This idea is called **packet switching**.

Why do this? Two reasons:

1. **Sharing.** Many people can use the same cable at once. One big download does not block everyone else.
2. **Repair.** If one packet is lost, only that small piece is sent again, not the whole file.

Here is the journey a packet takes from your desk to a website:

```
[ Your computer ]
       │  small packets
       ▼
[ Wi-Fi access point or switch ]
       │
       ▼
[ Router at home or school ]
       │
       ▼
[ Internet Service Provider (ISP) ]
       │
       ▼
[ Undersea cables and exchange points ]
       │
       ▼
[ Web server in a data centre ]
```

An **ISP** (Internet Service Provider) is the company that connects your home or school to the Internet.

---

## The Building Blocks of a Network

### Clients and Servers

- A **client** is a device that asks for something. Your laptop, phone or browser is a client.
- A **server** is a computer that waits for requests and answers them. It usually runs all day and all night.

When you open a library website, your browser is the client. The library's computer that sends the page is the server.

### Network Card and MAC Address

Every device that joins a network has a **Network Interface Card** (NIC). This is the chip that sends and receives signals. Each NIC has a **MAC address** (Media Access Control address). It is a 48-bit number, written as six pairs of hexadecimal digits:

```
Example MAC address:  00-1A-2B-3C-4D-5E
```

The factory gives each card its MAC address. Many phones and laptops now show a random MAC address to each Wi-Fi network, to protect your privacy.

### IP Address (a first look)

An **IP address** is a number that tells the Internet *where* a device is, like a postal address. For example, `203.0.113.10`. Your IP address usually changes when you move from home Wi-Fi to school Wi-Fi. Chapter 3 explains IP addresses in detail.

| | MAC address | IP address |
| :--- | :--- | :--- |
| Who gives it | Card maker (or the device) | The network you join |
| Used for | Delivery inside one local network | Delivery across networks |
| Postal idea | The name on your door | Your street address |

### Switches and Routers

- A **switch** joins devices inside one **Local Area Network** (LAN), such as a school computer lab. It sends each packet to the right device using MAC addresses.
- A **router** joins *different* networks together. It links your LAN to the **Wide Area Network** (WAN), which is the wider Internet. It chooses where to send packets using IP addresses.

```
 Lab PC1   Lab PC2   Lab PC3
    │         │         │
    └────┬────┴────┬────┘
         │ SWITCH  │   (inside the LAN)
         └────┬────┘
              │
          [ ROUTER ]   (joins LAN to WAN)
              │
          Internet
```

---

## The Physical Wire: How Bits Move

Computers speak in **bits**: `1`s and `0`s. Bits must travel as real signals. There are three main ways:

1. **Electricity (copper Ethernet cable).** Changes in voltage stand for `1`s and `0`s. One cable run works up to about 100 metres.
2. **Light (fibre-optic cable).** Laser flashes travel through glass threads thinner than a hair. Light in glass moves at about 200,000 km per second. Cables on the ocean floor carry almost all traffic between continents.
3. **Radio waves (Wi-Fi and mobile 4G/5G).** Antennas send signals through the air. Radio is easy to use but can be slowed by walls and distance.

---

## See It Yourself: `ping`

The `ping` command sends a few tiny test packets to another computer. That computer replies. `ping` then shows how long each **round trip** took: from you, to the server, and back again.

On Windows, open **Command Prompt** or **PowerShell** and type:

```
ping example.org
```

Example output (addresses changed to documentation addresses; yours will differ):

```
Pinging example.org [203.0.113.10] with 32 bytes of data:
Reply from 203.0.113.10: bytes=32 time=20ms TTL=60
Reply from 203.0.113.10: bytes=32 time=18ms TTL=60
Reply from 203.0.113.10: bytes=32 time=19ms TTL=60
Reply from 203.0.113.10: bytes=32 time=20ms TTL=60

Ping statistics for 203.0.113.10:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 18ms, Maximum = 20ms, Average = 19ms
```

How to read it:

- `[203.0.113.10]` is the IP address that the name `example.org` turned into.
- `bytes=32` is the size of each test packet.
- `time=20ms` is the round-trip time in **milliseconds** (thousandths of a second).
- `Lost = 0` means every packet came back.
- Ignore `TTL` for now. Chapter 13 explains it.

On macOS or Linux, `ping` keeps going until you press **Ctrl + C**. Use `ping -c 4 example.org` to send just four.

---

## Digital Stewardship (*Amānah*): The Shared Commons

The Internet works only because thousands of universities, companies and countries agree on the same open rules. These rules are called **protocols**. As young developers, we treat this shared network as a trust (*Amānah*):

- We build pages that load quickly and do not waste data.
- We design for people on slow or patchy rural connections.
- We respect the privacy of every packet that passes by.
- We only test networks we own, or that our teacher allows.

---

## ⚠️ Common Mistake

**Thinking `ping` time is one-way.**

- ❌ Wrong idea: "`time=20ms` means my packet reached the server in 20 ms."
- What really happens: 20 ms is the **whole round trip**, there and back.
- ✅ Right idea: "The trip there took roughly half, about 10 ms, and the reply took the rest."

**Thinking "no reply" always means "the server is down".**

- ❌ Wrong idea: `Request timed out.` means the website is broken.
- What really happens: many servers and firewalls block ping on purpose. The website may still open fine in a browser.
- ✅ Right idea: if ping fails, also try the website in a browser before deciding.

---

## ✍️ Try It

Ping `example.org` four times and write down the **Minimum**, **Maximum** and **Average** times.
Then move further from the Wi-Fi access point and ping again. Did the times change?

> 💡 Hint: on Windows, `ping -n 4 example.org` sends exactly four packets. At school, only ping addresses your teacher allows.

---

## 📝 Recap

- The Internet is a network of networks that moves data in small **packets**.
- Packets carry a source, a destination and a sequence number, so they can be rebuilt in order.
- **Clients** ask; **servers** answer.
- A **switch** connects devices inside a LAN using MAC addresses; a **router** joins networks using IP addresses.
- Bits travel as electricity, light or radio waves.
- `ping` measures the **round-trip** time to another computer.

---

## 🏆 Practice

### 🟢 Level 1: Recall
What is **packet switching**, and why do computers split large files into small packets?

<details>
<summary>Show answer</summary>

Packet switching means cutting data into small packets that travel separately and are rebuilt at the other end.
It lets many people share the same cables at once, and if one packet is lost, only that small piece needs to be sent again.

</details>

### 🟡 Level 2: Apply
A student runs `ping example.org` and sees `Lost = 0 (0% loss)` and `Average = 40ms`.
1. Did all packets come back?
2. Roughly how long did the trip *to* the server take?
3. Which device connected the student's school LAN to the Internet?

<details>
<summary>Show answer</summary>

1. Yes. `Lost = 0` means every packet returned.
2. About 20 ms. The 40 ms average is the round trip, so one way is roughly half.
3. The router. It joins the LAN to the WAN.

</details>

### 🔴 Level 3: Challenge
Draw your own school network as a text diagram.
1. Show at least three devices in one lab.
2. Add the switch that joins them.
3. Add the router and the ISP.
4. Label which device uses MAC addresses and which uses IP addresses to choose where packets go.

<details>
<summary>Show one possible answer</summary>

```
 PC1      PC2      Printer
  │        │         │
  └───┬────┴────┬────┘
      │ SWITCH  │  uses MAC addresses
      └───┬─────┘
          │
      [ ROUTER ]   uses IP addresses
          │
      [  ISP  ]
          │
       Internet
```

The switch delivers packets inside the lab using MAC addresses. The router sends packets out to other networks using IP addresses.

</details>
