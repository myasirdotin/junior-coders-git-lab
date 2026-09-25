# Chapter 13: Incident Response & Digital Forensics 🚨🔍

No matter how hardened your defenses are, security professionals operate under the principle of **Assumed Breach**: assume that an attacker has already bypassed the outer perimeter or that a compromised credential exists.

When an intrusion happens, calm, disciplined execution is critical. This is the science of **Incident Response & Digital Forensics**.

---

## ⏱️ The 6 Phases of Incident Response (NIST / SANS)

```
 [ 1. Preparation ] ──► [ 2. Identification ] ──► [ 3. Containment ]
                                                          │
 [ 6. Lessons Learned ] ◄── [ 5. Recovery ] ◄── [ 4. Eradication ]
```

### 1. Preparation
Before any breach occurs: Maintain secure offline backups, configure centralized audit logging, establish incident team roles, and author runbooks.

### 2. Identification (Detection)
Detect the anomaly: An alert from an intrusion detection system (IDS), a spike in failed SSH logins, or an unexpected database dump request.

### 3. Containment (Stop the Bleeding!)
Isolate the compromised system immediately to prevent lateral movement:
- Disconnect the affected server from the network (unplug Ethernet / isolate VPC).
- Do **not** power off the machine immediately! Powering down wipes volatile RAM memory containing active attacker processes, cryptographic keys, and open sockets!

### 4. Eradication (Remove the Infection)
Identify the root vulnerability that allowed the intrusion, wipe malware, close backdoors, and rotate all compromised credentials and API keys.

### 5. Recovery (Safe Return to Service)
Restore clean systems from verified, pre-breach backups. Reconnect to production under close 24/7 monitoring.

### 6. Lessons Learned (Post-Mortem & Amānah)
Conduct a blameless post-mortem analysis:
- How did the attacker enter?
- What controls failed?
- How do we update our architecture to ensure this vulnerability never happens again?

---

## 📜 Ethical Vulnerability Disclosure (*Ṣidq*)

What should you do if you discover a security flaw in someone else's website or school portal?
1. **Never exploit or steal data**: Do not view other students' private records or tamper with live databases.
2. **Document responsibly**: Record the exact steps to reproduce the flaw cleanly.
3. **Contact the security team privately**: Look for a `security.txt` file or email `security@organization.com`.
4. **Give them reasonable time to patch**: Standard industry practice allows 30 to 90 days before any public disclosure.
5. **Honor digital trust**: Transparency and truthfulness (*Ṣidq*) distinguish an ethical security guardian from a criminal.

---

## 🧠 Checkpoint Quiz

1. **Why should you not immediately power down a compromised server during an incident?**
   - *Answer: Because powering off wipes the volatile RAM memory, destroying critical forensic evidence such as active processes, running malware code, open network connections, and encryption keys.*
2. **What is the goal of the "Containment" phase in incident response?**
   - *Answer: To isolate the compromised host from the rest of the network and stop the attacker from expanding laterally or exfiltrating data.*
3. **What is responsible vulnerability disclosure?**
   - *Answer: Privately notifying the software vendor or organization about a flaw without exploiting it or publicly sharing details before a fix is released.*

---

## 🎯 Hands-On Mission

Draft an Incident Response Plan for your student group or coding project: Who is notified if an API secret key is accidentally pushed to a public GitHub repository? (Hint: Invalidate and revoke the key immediately!).
