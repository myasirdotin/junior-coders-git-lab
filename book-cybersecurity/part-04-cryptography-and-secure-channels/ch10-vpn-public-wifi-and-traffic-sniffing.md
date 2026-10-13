# Chapter 10: Public Wi-Fi, VPNs & Traffic Sniffing 📡

## 🌟 Real-Life Story

Imagine sending a **postcard**. Every person who handles it, from the postbox to the sorting office to the delivery van, can read what you wrote. Now imagine putting the card in a **sealed envelope**. People can still see the address on the front, but not the message inside. Finally, imagine putting that envelope inside a **locked courier bag** that only opens at the courier's office in another city. People on the way cannot even see the final address. Data on the internet can travel in all three ways: as a postcard (HTTP), an envelope (HTTPS) or a courier bag (a VPN).

## 🎯 What You Will Learn

- Explain why open public Wi-Fi can let others see or change your traffic.
- Describe **sniffing**, **man-in-the-middle** and **evil twin** attacks in simple words.
- Explain what HTTPS protects, and what it does not hide.
- Describe what a **VPN** does, and how to choose and use one wisely.

## 📡 Wi-Fi Is a Shared Room

Wi-Fi sends data by radio. Every device in range "hears" the radio signals, a bit like people in one room hearing every conversation. Normally a device ignores messages not meant for it. But with special software, a device can listen to everything nearby. This is called **sniffing** (or packet sniffing). A **packet** is a small piece of data travelling across a network.

On an **open** network (one with no Wi-Fi password), the radio signals themselves are not encrypted. On those networks, anything sent as plain HTTP could be read by someone nearby.

```
[ Your phone ] ── plain HTTP ──► [ Router ]
                   │
                   │ (radio heard by
                   ▼  everyone nearby)
          [ Someone listening ]
          can read and copy it
```

Network staff use sniffing tools, such as Wireshark, to fix problems on networks **they are responsible for**. Capturing other people's traffic without permission is illegal.

## 🕵️ Two Tricks to Know

### Man-in-the-middle (MITM)
A **man-in-the-middle** attack means someone secretly sits between you and the website. They pass messages back and forth, so everything seems normal. But they can read, and sometimes change, what passes through.

### The evil twin
An **evil twin** is a fake Wi-Fi hotspot with the same name as a real one, such as `City_Library_Free_WiFi`. Phones often join known names automatically. Once you are connected, all your traffic flows through the faker's device: a perfect man-in-the-middle.

**Defence:** ask staff for the exact network name. Turn off "auto-join" for public networks. Forget networks you no longer use.

## 🔒 How HTTPS Protects You

**HTTPS** is HTTP inside an encrypted connection called **TLS** (Transport Layer Security). You learned in Chapter 9 that TLS agrees a secret key and then encrypts everything. TLS also checks the website's **certificate**: a digital ID card that proves the site really owns its name. That check makes man-in-the-middle tricks fail. Your browser shows a big warning instead.

Here is what a listener on the same Wi-Fi can see:

| What is visible? | Plain HTTP | HTTPS | HTTPS through a VPN |
| :--- | :--- | :--- | :--- |
| Page content, forms, passwords | ✅ Yes | ❌ No | ❌ No |
| Full address, e.g. `/results?id=42` | ✅ Yes | ❌ No | ❌ No |
| Site name, e.g. `library.example.org` | ✅ Yes | Usually yes | ❌ No (only the VPN server) |
| That you are online, and how much data | ✅ Yes | ✅ Yes | ✅ Yes |

So with HTTPS, the network can usually see *which site* you visit, but not *what you do there*.

> ⚠️ **Never click past a certificate warning** on public Wi-Fi. It may be the exact moment a man-in-the-middle is trying to step in.

## 🚇 VPNs: An Encrypted Tunnel

A **VPN** (Virtual Private Network) creates an encrypted tunnel from your device to a VPN server somewhere else. All your traffic goes through the tunnel first.

```
[ You ] ══ encrypted ══► [ VPN server ]
             tunnel            │
                               ▼
                         [ Internet ]
```

### What a VPN does
- **Protects you on public Wi-Fi:** the local network sees only scrambled data going to the VPN server.
- **Hides your home internet address (IP address)** from the websites you visit. They see the VPN server's address instead.
- Organisations use VPNs so staff can reach internal systems safely from home.

### What a VPN does not do
- It does **not** make you anonymous. The VPN company can see where your traffic goes, so you are moving your trust from the Wi-Fi owner to the VPN company.
- It does **not** stop phishing, malware or weak passwords.
- It does **not** replace HTTPS. Use both.

> ⚠️ **Choosing a VPN (*Amānah*)**: many "free VPN" apps pay for themselves by collecting and selling what you do online. Choose a well-known provider whose privacy claims have been checked by independent auditors, or the VPN your school provides. Follow your school's and family's rules about VPN use.

## 🏠 What to Do at Home

- Set your home router to **WPA3**, or **WPA2 (AES)** if WPA3 is not available. Never use WEP or an open network.
- Change the router's default admin password.
- On public Wi-Fi, use only HTTPS sites and avoid logging in to important accounts if you can.
- Use your phone's mobile data for anything sensitive when unsure.
- Turn off auto-join for public networks.
- Never ignore certificate warnings.

## ⚠️ Common Mistake

**Mistake:** "The café Wi-Fi has a password printed on the wall, so it is private."

**What happens:** everyone in the café has the same password. Anyone on that network can still try tricks such as setting up an evil twin with the same name and password.

**Fixed thinking:** treat every shared network as public. Rely on HTTPS (and a trusted VPN if you have one), not on the Wi-Fi password.

## ✍️ Try It

With a parent's permission, check your home Wi-Fi security.

1. On Windows, open **Settings → Network & Internet → Wi-Fi → (your network) properties**.
2. Find the **Security type**.
3. Write it down: is it WPA3, WPA2 or something older?

*Hint:* on a phone, the security type is often shown in the network details when you tap the network name.

## 📝 Recap

- Wi-Fi is like a shared room: nearby devices can hear the radio signals.
- Sniffing, man-in-the-middle and evil twin attacks target unprotected traffic.
- HTTPS encrypts content and checks the site's certificate, but the site name is usually still visible.
- A VPN tunnels all traffic to a VPN server; it moves trust to the VPN company and does not make you anonymous.
- Use WPA3 or WPA2 at home and never click past certificate warnings.

## 🏆 Practice

### 🟢 Level 1: Recall
What is an "evil twin" Wi-Fi network?

<details>
<summary>Show answer</summary>

A fake Wi-Fi hotspot that copies the name of a real network, so that devices join it and send all their traffic through the faker's device.

</details>

### 🟡 Level 2: Apply
Hamza is on the open library Wi-Fi. He visits `https://school.example.org/marks`. Someone nearby is sniffing. What can they probably see, and what can they not see?

<details>
<summary>Show answer</summary>

**Can probably see:** that Hamza is connected, how much data he uses, and the site name `school.example.org`.

**Cannot see:** the page path `/marks`, his password, his marks or anything he types, because HTTPS encrypts them.

</details>

### 🔴 Level 3: Challenge
Write a "Safe Public Wi-Fi" card for students going on a school trip.

1. Give at least five short rules.
2. Explain in one sentence what HTTPS does and what it does not hide.
3. Explain in one sentence what a VPN adds, and one thing it does not do.

<details>
<summary>Show one possible answer</summary>

**Safe Public Wi-Fi**
1. Ask staff for the exact network name.
2. Turn off auto-join for public networks.
3. Only use sites that show HTTPS.
4. Never click past a certificate warning.
5. Save important logins for mobile data or home.
6. Log out when you finish, and forget the network afterwards.

**HTTPS** hides what you send and read, but people on the network can usually still see which site you visit.

**A VPN** hides even the site name from the local network, but it does not stop phishing or make you anonymous to the VPN company.

</details>
