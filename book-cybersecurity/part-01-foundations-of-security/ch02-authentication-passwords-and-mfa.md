# Chapter 2: Authentication, Password Entropy & MFA 🔑🔐

The most common entry point for cyberattacks is not a zero-day software exploit; it is a stolen, guessed, or re-used password.

In this chapter, we explore the mathematics of password entropy, how attackers crack passwords using high-speed GPUs, why plaintext password storage is forbidden, and how Multi-Factor Authentication (MFA) neutralizes credential theft.

---

## 🎲 The Mathematics of Password Entropy

**Entropy** measures the unpredictability or randomness of a password, quantified in **bits**:

$$E = L \times \log_2(R)$$

- $L$ = Length of the password
- $R$ = Size of the character pool (digits = 10, lowercase = 26, mixed alphanumeric + symbols = 95)

### Password Cracking Time on Modern GPUs:
| Password | Length & Pool | Entropy | Time to Crack (RTX 4090 GPU Cluster) |
| :--- | :--- | :--- | :--- |
| `123456` | 6 (Digits only) | ~20 bits | **Instant (0.0001 seconds)** |
| `p@ssword` | 8 (Common word + leetspeak) | ~25 bits | **0.2 seconds** (Dictionary attack) |
| `Summer2026!` | 11 (Cap, number, symbol) | ~45 bits | **2 hours** |
| `correct-horse-battery-staple` | 28 (Passphrase of 4 words) | ~80 bits | **150,000 Years!** |

> 💡 **The Golden Rule of Passwords**: **Length trumps complexity!**  
> A memorable four-word passphrase with spaces (e.g. `olive-trees-bloom-peacefully`) is vastly harder for supercomputers to crack than a short, frustrating jumble like `Tr$8!`.

---

## 🧂 Password Hashing: Never Store Plaintext!

If your database is stolen, what do attackers find?
- ❌ **Disaster**: Storing passwords in plaintext (e.g. `"secret123"`).
- ❌ **Vulnerable**: Using fast mathematical hashing like MD5 or SHA-256 (an attacker's GPU can calculate 50 billion SHA-256 hashes per second!).
- ✅ **Secure (*Amānah*)**: Using slow, memory-hard adaptive hashing algorithms: **bcrypt**, **Argon2id**, or **PBKDF2** with a unique cryptographic **salt**.

```php
// In PHP: bcrypt / Argon2 hashing
$hash = password_hash($userPassword, PASSWORD_ARGON2ID);

// Verifying securely without timing leaks:
if (password_verify($enteredPassword, $hash)) {
    // Authenticated!
}
```

### What is a "Salt"?
A **salt** is a random string generated per user and appended to the password before hashing.  
This guarantees that if two users pick the exact same password, their resulting hashes in the database look completely different, neutralizing pre-computed **Rainbow Table** attacks!

---

## 📲 Multi-Factor Authentication (MFA / 2FA)

Authentication relies on three fundamental factors:
1. **Something you KNOW**: Password, PIN, or passphrase.
2. **Something you HAVE**: Smartphone authenticator app (TOTP), physical FIDO2 security key (YubiKey), or smartcard.
3. **Something you ARE**: Fingerprint, facial recognition, or iris scan.

**True Multi-Factor Authentication** requires credentials from at least **two different categories**.

```
[ Correct Password ] + [ TOTP Authenticator Code (Changes every 30s) ] ──► [ ACCESS GRANTED ]
```
Even if an attacker phishes your password, they cannot log into your account without physical possession of your authenticator device!

---

## 🧠 Checkpoint Quiz

1. **Why is a 4-word passphrase (e.g. `river-forest-falcon-sky`) superior to a short complex password like `P@s1!`?**
   - *Answer: Because password entropy grows exponentially with length; long passphrases provide overwhelming search space while remaining easy for humans to remember.*
2. **What does a cryptographic salt prevent?**
   - *Answer: Salts prevent attackers from using pre-computed rainbow tables and ensure identical passwords produce unique hash outputs in the database.*
3. **What are the three categories of authentication factors?**
   - *Answer: Something you know (password), something you have (hardware key/phone), and something you are (biometrics).*

---

## 🎯 Hands-On Mission

Visit the interactive **Password Entropy Meter** in our Cybersecurity Lab Studio:
1. Test a simple 6-character password and observe the crack time.
2. Test a 20-character passphrase made of four common dictionary words.
3. Observe how entropy jumps from 25 bits to over 85 bits!
