# Learning Cybersecurity & Digital Hygiene - Domain Guidelines & Standards

This directory contains the interactive student-facing modules, multi-tier exercises, defensive security studios, and reference materials for **Cybersecurity & Digital Hygiene**.

---

## 1. Ethical Alignment (*'Ilm Nāfi'* & *Amānah*)

All modules in this track must strictly follow our core ethical foundation:
- **Defensive Engineering (*Ḥimāyah*)**: Focus exclusively on defensive programming, system hardening, threat mitigation, digital hygiene, and ethical stewardship. We teach vulnerabilities strictly to show developers how to prevent and eliminate them.
- **Sacred Trust (*Amānah*)**: User credentials, private communications, and records entrusted to developers are sacred amānah. Emphasize slow, salted key derivation (Argon2id/bcrypt), 100% parameterized SQL queries, contextual output encoding, and principle of least privilege.
- **Modesty & Privacy (*Ḥayā'*)**: Enforce digital hygiene principles—stripping EXIF coordinates from photo uploads, minimizing unnecessary data collection, and securing personal devices.
- **Strictly Prohibited Topics**:
  - No black-hat malware writing, keylogger creation, ransomware development, or botnet tutorials.
  - No unauthorized penetration testing guides or credential stuffing scripts.
  - No usury/interest calculators (*Ribā*), gambling simulations (*Maysir*), or deceptive dark patterns (*Gharar*).

---

## 2. Pedagogical Architecture

1. **Scaffolded Flow**: CIA Triad & Threat Landscape $\rightarrow$ Cryptographic Primitives (Hashing vs Encryption) $\rightarrow$ Authentication & Key Derivation $\rightarrow$ OWASP Web Defense (SQLi, XSS, CSRF, IDOR) $\rightarrow$ Defensive Infrastructure & Headers $\rightarrow$ Phishing & Social Engineering Defense $\rightarrow$ Personal Digital Hygiene & Privacy $\rightarrow$ Incident Response & 3-2-1 Resiliency.
2. **Three-Tier Mastery Practice**:
   - 🟢 **Level 1 (Recall / Warmup)**: Hashing properties, CIA Triad identification, OWASP terminology.
   - 🟡 **Level 2 (Application / Modification)**: SQLi code conversion to PDO prepared statements, XSS output encoding, password entropy math.
   - 🔴 **Level 3 (Creative Challenge / Architecture)**: Cookie security architecture, anti-CSRF workflow implementation, and defense-in-depth design.
3. **Single Source of Truth**: Modules mirror the textbook chapters in `book-cybersecurity/`.
4. **Engineering Excellence (*Iḥsān*)**: Teach students clean defensive architecture, proactive testing, and responsible disclosure.
