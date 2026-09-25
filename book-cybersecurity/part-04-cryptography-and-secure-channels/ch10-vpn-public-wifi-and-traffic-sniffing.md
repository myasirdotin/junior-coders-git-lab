# Chapter 10: Public Wi-Fi, VPNs & Traffic Sniffing 📡🛡️

When you connect your laptop or smartphone to free, open Wi-Fi at a local cafe, airport, or hotel, you are broadcasting your radio signals across an open room shared by total strangers.

Without proper cryptographic defense, an attacker on the same Wi-Fi network can intercept unencrypted data packets, inject malicious ads, or redirect your traffic to clone websites.

---

## 📡 The Danger: Packet Sniffing & Man-in-the-Middle (MITM)

On an unencrypted or open Wi-Fi network, an attacker using a packet analyzer (like Wireshark) can set their wireless network card to **promiscuous mode**:
- Normally, a network card ignores packets addressed to other devices.
- In promiscuous mode, the card captures **every radio packet flying through the room**!

```
[ Your Phone ] ────── (Unencrypted HTTP Packet) ──────► [ Coffee Shop Router ]
                               │
                               ▼
               [ Attacker Laptop (Packet Sniffer) ]
               Reads session cookies, passwords, and browsing history!
```

### The Rogue Access Point (The "Evil Twin")
An attacker can set up a portable Wi-Fi hotspot with the exact same name as the airport Wi-Fi (*"Free_Airport_WiFi"*). Unsuspecting devices connect automatically, routing all their internet traffic directly through the attacker's laptop!

---

## 🛡️ How HTTPS Protects You from Wi-Fi Sniffers

When you connect via **HTTPS (TLS 1.3)**:
- Even if an attacker sniffs every radio packet in the air, your data is wrapped inside unbroken mathematical encryption.
- All the attacker sees is garbled random hex ciphertext!
- They cannot read your passwords, view your form submissions, or tamper with the web pages you receive.

---

## 🚇 Virtual Private Networks (VPNs): The Encrypted Tunnel

While HTTPS encrypts the content of your web requests, your local ISP or Wi-Fi router can still observe:
- Which domain names you look up (DNS queries)
- The destination IP addresses you connect to
- The timing and volume of your traffic

A **Virtual Private Network (VPN)** establishes an encrypted point-to-point tunnel between your device and a remote VPN server:

```
[ Your Device ] ──═══ (Encrypted VPN Tunnel) ═══► [ VPN Server ] ──► [ Internet ]
```

### Benefits of a Reputable VPN:
1. **Masks Your Local IP**: Websites see the IP address of the VPN server, not your home address.
2. **Secures Public Wi-Fi**: All traffic leaving your laptop is encrypted before hitting the local cafe router.
3. **Bypasses Censorship**: Allows citizens and journalists in oppressive regions to access uncensored educational materials.

> ⚠️ **Choosing a VPN (*Amānah*)**: A VPN provider can theoretically see your unencrypted DNS requests. Never use shady "Free VPN" apps that sell your browsing logs or inject adware. Choose audited, zero-log, privacy-respecting providers.

---

## 🧠 Checkpoint Quiz

1. **What is a "Man-in-the-Middle" (MITM) attack?**
   - *Answer: An attack where a malicious third party secretly intercepts, relays, and potentially alters communications between two parties who believe they are communicating directly.*
2. **What does an attacker see when sniffing traffic from an HTTPS-secured website?**
   - *Answer: Only unreadable encrypted ciphertext and connection metadata; they cannot read payloads, passwords, or session cookies.*
3. **What is an "Evil Twin" Wi-Fi attack?**
   - *Answer: A rogue wireless access point set up by an attacker that impersonates the name (SSID) of a legitimate network to fool nearby devices into connecting through it.*

---

## 🎯 Hands-On Mission

Check your network security settings: Ensure that your home Wi-Fi router is configured with **WPA3** (or WPA2-AES) rather than obsolete WEP or open unencrypted security!
