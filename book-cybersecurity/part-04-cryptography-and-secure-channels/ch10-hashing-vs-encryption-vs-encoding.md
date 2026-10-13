# Chapter 10: Hashing vs. Encryption vs. Encoding 🔐

## 🌟 Real-Life Story

Think of three things you might do with a school letter. You could **translate** it into Urdu so your grandmother can read it. Anyone who knows both languages can translate it back. You could **lock it in a box** and give the key only to your teacher. Only someone with the key can open it. Or you could **press your thumb in ink** at the bottom. The thumbprint does not contain the letter, but it proves the letter is yours and that nobody swapped the page. Translating, locking and fingerprinting: in computing, these are **encoding**, **encryption** and **hashing**.

People mix up these three all the time. Using the wrong one can leave data wide open.

## 🎯 What You Will Learn

- Tell apart **encoding**, **encryption** and **hashing** by purpose, key and reversibility.
- Show why Base64 is not a way to hide secrets.
- Explain **symmetric** and **asymmetric** encryption in simple words.
- Describe the properties of a good hash, including the **avalanche effect**.

## 🧭 The Three at a Glance

| | Purpose | Needs a key? | Can it be reversed? | Examples |
| :--- | :--- | :--- | :--- | :--- |
| **Encoding** | Change the format so data travels safely | No | Yes, by anyone | Base64, URL encoding |
| **Encryption** | Keep data secret | Yes | Yes, but only with the key | AES, RSA, TLS |
| **Hashing** | Make a fingerprint to check data | No | No (one-way) | SHA-256; bcrypt and Argon2id for passwords |

## 🔤 Encoding: Changing the Format (Not Security)

**Encoding** changes data into another format so it can travel without being damaged. For example, **Base64** turns any bytes, such as a picture, into plain letters and digits that can sit inside an email or a text file.

```php
<?php
echo base64_encode('Hello'), "\n";
echo base64_decode('SGVsbG8='), "\n";
```

Output:

```
SGVsbG8=
Hello
```

> ⚠️ **Base64 is not encryption.** There is no key. Anyone can decode it in a second with free tools. If you see a "hidden" password stored in Base64, it is not hidden at all.

Another common encoding is **URL encoding**: a space becomes `%20` so it can travel safely in a web address.

## 🔒 Encryption: A Lock and a Key

**Encryption** turns readable data (the **plaintext**) into scrambled data (the **ciphertext**) using a **key**. Only someone with the right key can turn it back.

### Symmetric encryption: one shared key
The same key locks and unlocks. **AES** is the most widely used method. It is fast and very strong. Here is AES in PHP:

```php
<?php
$key = random_bytes(32);          // a secret 256-bit key
$iv  = random_bytes(12);          // a fresh random starting value
$secret = 'Meet at the library at 4';

$cipher = openssl_encrypt($secret, 'aes-256-gcm', $key, 0, $iv, $tag);

echo openssl_decrypt($cipher, 'aes-256-gcm', $key, 0, $iv, $tag), "\n";
var_dump(openssl_decrypt($cipher, 'aes-256-gcm', random_bytes(32), 0, $iv, $tag));
```

Output:

```
Meet at the library at 4
bool(false)
```

With the right key, the message comes back. With a wrong key, decryption fails (`false`). The scrambled `$cipher` itself looks like random characters and changes on every run, because the starting value `$iv` is new each time.

The hard part of symmetric encryption is sharing the key safely. If you send the key along with the message, anyone who catches both can read it.

### Asymmetric encryption: a padlock and its key
**Asymmetric** encryption uses a **pair** of keys:

- A **public key**, which you can give to anyone. It works like an open padlock: anyone can snap it shut on a box.
- A **private key**, which you never share. Only it can open that padlock.

RSA and elliptic-curve cryptography (ECC) work this way. It is slower than AES, so real systems combine them. When you visit an HTTPS website, **TLS** uses asymmetric methods to agree a fresh shared key safely, then uses fast symmetric encryption for everything else. Chapter 11 shows why this matters on public Wi-Fi.

## 👆 Hashing: A One-Way Fingerprint

A **hash function** takes input of any length and produces a short, fixed-size fingerprint. SHA-256 always produces 256 bits, shown as **64 hexadecimal characters** (the digits 0–9 and letters a–f).

```php
<?php
echo hash('sha256', 'Bismillah'), "\n";
echo hash('sha256', 'Bismillah!'), "\n";
echo strlen(hash('sha256', 'A whole library of books')), "\n";
```

Output:

```
1c1b72aee1bf62759f34d254e0fb8ce2dafb480d42bc5ab1f5af0bdb6e53d108
0f4fda5d526f94ba2c244a5c7a5bc4d576300a68d9c821bca26dfb716ed0bf74
64
```

Adding one `!` changed 56 of the 64 characters. A long sentence still gives exactly 64 characters.

### Four properties of a good hash
1. **Same in, same out:** the same input always gives the same hash.
2. **One-way:** you cannot work backwards from the hash to the input. It is like baking: you cannot turn a cake back into eggs and flour.
3. **Avalanche effect:** a tiny change in the input changes the hash completely, as you just saw.
4. **Collision resistant:** it is practically impossible to find two different inputs with the same hash. (Collisions must exist in theory, because there are endless inputs and a limited number of hashes. Nobody has ever found one for SHA-256.)

### What hashes are used for
- **Checking downloads:** a website publishes the SHA-256 of a file. After downloading, you hash your copy. If the two match, the file was not damaged or swapped.
- **Storing passwords:** but only with a **slow, salted** password hash such as bcrypt or Argon2id, as in Chapter 2. Plain SHA-256 is too fast for passwords.

## 🧩 Choosing the Right Tool

| Job | Use |
| :--- | :--- |
| Put an image inside a text message format | Encoding (Base64) |
| Send a private message only the receiver can read | Encryption |
| Store user passwords | Password hashing (`password_hash()`) |
| Check a download was not changed | Hashing (SHA-256) |
| Put a space in a web address | Encoding (URL encoding) |

## 🏠 What to Do at Home

- Never use Base64 to "hide" anything secret.
- Store passwords only with `password_hash()`, never with Base64 or plain SHA-256.
- Use HTTPS for every site you build.
- Keep encryption keys out of your code files and out of Git.
- When a download page shows a SHA-256 value, check it.

## ⚠️ Common Mistake

**Mistake:** a student stores passwords like this, thinking it is "encrypted":

```php
// ❌ Encoding is not protection
$stored = base64_encode($password);
```

**What happens:** anyone who sees the database can run `base64_decode()` and read every password in seconds.

**Fixed version:**

```php
// ✅ Slow, salted, one-way password hash
$stored = password_hash($password, PASSWORD_DEFAULT);
```

## ✍️ Try It

Open the **Crypto** tab in the Cybersecurity Lab Studio.

1. Type a short word and look at its SHA-256 hash.
2. Change one letter, or add one full stop.
3. Count roughly how many of the 64 characters changed.

*Hint:* compare the first ten characters of each hash.

## 📝 Recap

- **Encoding** changes the format; anyone can reverse it; it is not security.
- **Encryption** keeps data secret; it can be reversed only with the key.
- Symmetric encryption uses one shared key (AES); asymmetric uses a public and private pair (RSA, ECC).
- **Hashing** makes a one-way, fixed-size fingerprint; a tiny change makes a totally different hash.
- Passwords need slow, salted password hashes, not encoding and not plain SHA-256.

## 🏆 Practice

### 🟢 Level 1: Recall
Which of the three (encoding, encryption, hashing) can be reversed, and what is needed to reverse it?

<details>
<summary>Show answer</summary>

- **Encoding:** reversible by anyone; no key needed.
- **Encryption:** reversible only with the correct key.
- **Hashing:** not reversible; it is one-way.

</details>

### 🟡 Level 2: Apply
A website stores this as a user's password: `b2xpdmUgdHJlZXM=`. It ends in `=` and uses only letters, digits, `+`, `/` and `=`. What is it most likely, and why is it a problem?

<details>
<summary>Show answer</summary>

It is most likely **Base64 encoding**. It decodes to `olive trees`. Anyone who sees it can read the real password, because encoding needs no key. The site should use `password_hash()` instead.

</details>

### 🔴 Level 3: Challenge
A school club website does three jobs. For each, choose encoding, encryption or hashing, and explain your choice in one sentence.

1. Saving members' passwords.
2. Keeping members' medical notes private in the database, readable later by the club nurse.
3. Checking that the club's setup file, downloaded from the internet, has not been changed.

Then write the PHP line for job 1.

<details>
<summary>Show one possible answer</summary>

1. **Password hashing**: the site never needs the real password back, only to check it.
2. **Encryption**: the nurse must be able to read the notes again, so it must be reversible, but only with a key.
3. **Hashing (SHA-256)**: compare the file's hash with the one published by the maker.

```php
$stored = password_hash($_POST['password'], PASSWORD_DEFAULT);
```

</details>
