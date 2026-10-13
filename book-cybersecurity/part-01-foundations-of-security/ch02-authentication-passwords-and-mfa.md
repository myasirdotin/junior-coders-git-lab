# Chapter 2: Authentication, Password Entropy & MFA

## 🌟 Real-Life Story

Bilal's school locker has a three-digit combination lock. That gives only 1,000 possible codes, from 000 to 999. A patient person could try them all in an afternoon. His bicycle lock has six digits: one million codes, which is much harder. And the school office does not trust a code alone. Visitors must also show a signed card at the desk. Longer secrets, plus a second check: that is this whole chapter in one story.

Most break-ins online do not start with clever code. They start with a password that was guessed, stolen or reused.

## 🎯 What You Will Learn

- Calculate password **entropy** and explain why length beats complexity.
- Build a strong **passphrase** and explain why a password manager helps.
- Explain why websites must store **hashes**, not passwords, and what a **salt** does.
- Name the three kinds of login factors and explain **MFA**.

## Password Entropy: Measuring Unpredictability

**Authentication** means proving who you are, for example by typing a password.

**Entropy** measures how unpredictable a password is. It is counted in **bits**. Each extra bit doubles the number of guesses an attacker might need.

> **Entropy = L × log₂(R)**
> L = length (how many characters or words)
> R = pool size (how many choices for each one)

What is log₂(R)? It is "how many times you double 1 to reach R". For example, log₂(8) = 3, because 1 → 2 → 4 → 8. Here are the pools you will use:

| Pool | R | log₂(R) (bits each) |
| :--- | :--- | :--- |
| Digits 0–9 | 10 | about 3.32 |
| Lowercase a–z | 26 | about 4.70 |
| All keyboard characters | 95 | about 6.57 |
| A list of 7,776 words | 7,776 | about 12.9 |

### Worked example
A 6-digit PIN: 6 × 3.32 ≈ **19.9 bits**. Check: 2²⁰ = 1,048,576, close to the 1,000,000 possible PINs.

> ⚠️ **Big rule:** the formula only works if the password is chosen **at random**. A human-chosen word like `sunshine` has 8 × 4.70 ≈ 37.6 bits on paper. But it sits on every list of common passwords, so it falls almost at once.

### How long would guessing take?
Suppose a stolen password list was stored with a fast hash. A strong computer might try about **10 billion guesses per second**. On average it finds the answer after searching half of all choices.

| Password | How it was made | Entropy | Average time at 10 billion/s |
| :--- | :--- | :--- | :--- |
| `123456` | Common password | (on every list) | Instant |
| `sunshine` | Dictionary word | (on every list) | Instant |
| `Tr$8!q2Z` | 8 random keyboard characters | 52.6 bits | About 4 days |
| `lamp orbit cedar mild frost` | 5 random words from 7,776 | 64.6 bits | About 44 years |
| 6 random words from 7,776 | 6 random words | 77.5 bits | About 340,000 years |

So **length beats complexity**. Five or six random words are easier to remember than `Tr$8!q2Z`, and far harder to guess. (Never use the example passphrase above: it is now printed in a book!)

### A password manager
You cannot remember 40 different passphrases. A **password manager** is an app that stores them all in an encrypted vault. You remember one strong passphrase; it remembers the rest and creates new random passwords for you. This also stops **reuse**, where one leaked password unlocks many accounts.

## Storing Passwords: Hashes, Not Plain Text

What if a website's database is stolen? It depends on how passwords were stored.

- ❌ **Plain text** (`secret123`): the thief reads every password directly.
- ❌ **A fast hash** like MD5 or SHA-256: a **hash** turns a password into a fixed "fingerprint" that cannot be turned back (Chapter 10 explains more). But fast hashes can be checked billions of times per second, so guessing is quick.
- ✅ **A slow password hash** like **bcrypt** or **Argon2id**: each guess is made deliberately slow. With bcrypt at normal settings, a strong graphics card manages only thousands of guesses per second, instead of billions.

PHP has this built in. `password_hash()` makes the slow hash and adds a salt for you. `password_verify()` checks a login attempt.

```php
<?php
$hash = password_hash('olive trees bloom', PASSWORD_DEFAULT);
echo substr($hash, 0, 7), " length ", strlen($hash), "\n";

$again = password_hash('olive trees bloom', PASSWORD_DEFAULT);
var_dump($hash === $again);

var_dump(password_verify('olive trees bloom', $hash));
var_dump(password_verify('olive trees bloom!', $hash));
```

Output (PHP 8.3):

```
$2y$10$ length 60
bool(false)
bool(true)
bool(false)
```

- `$2y$10$` means bcrypt with a work setting ("cost") of 10.
- The same password hashed twice gives **different** hashes (`false`). That is the salt at work.
- Only the exact password passes `password_verify()`.

### What is a salt?
A **salt** is a random value made for each user and mixed in before hashing. Two people with the same password get completely different hashes. It also defeats **rainbow tables**, which are huge ready-made lists of passwords and their hashes.

## Multi-Factor Authentication (MFA)

There are three kinds of login **factors**:

1. **Something you know:** a password, PIN or passphrase.
2. **Something you have:** your phone with an authenticator app, or a small hardware security key.
3. **Something you are:** a fingerprint or face scan.

**Multi-Factor Authentication (MFA)** asks for factors from **two or more different kinds**. **2FA** (two-factor) is the most common type.

```
[ password ] + [ 6-digit app code ]
                (changes every 30 s)
        │
        ▼
 [ ACCESS GRANTED ]
```

If someone steals your password, they still need your phone. A password plus a second password is **not** MFA, because both are "something you know".

## What to Do at Home

- Make your main passwords passphrases of 5–6 random words.
- Never reuse a password on two sites.
- Use a password manager, with a passphrase you have never used anywhere else.
- Turn on 2FA for email first. Your email can reset every other account.
- Never tell anyone a login code, even someone who says they are from "support".

## ⚠️ Common Mistake

**Mistake:** "I made my password strong: `Ahmed2012!`"

**What happens:** it follows a pattern people use all the time: a name, a year and a symbol at the end. Guessing tools try exactly these patterns first, so the real strength is far below what the formula suggests.

**Fixed version:** five random words, such as `kettle meadow orbit linen spark` (do not use this one). Random choice is what gives entropy, not clever-looking symbols.

**Developer mistake:** storing `hash('sha256', $password)` in a database. Fixed version: `password_hash($password, PASSWORD_DEFAULT)` and check with `password_verify()`.

## ✍️ Try It

Open the **Password** tab in the Cybersecurity Lab Studio.

1. Type a 6-digit number and note the estimated time.
2. Type four or five random, unrelated words with spaces.
3. Compare the entropy and the time.

*Hint:* add one more random word and watch the bits grow by about 13.

## 📝 Recap

- Entropy = L × log₂(R), but only for randomly chosen passwords.
- Length beats complexity: 5–6 random words are strong and memorable.
- A password manager stops reuse, which is one of the biggest risks.
- Websites must store slow, salted hashes (bcrypt or Argon2id), never plain text or plain SHA-256.
- MFA needs two different kinds of factor; a phone code plus a password is the common form.

## 🏆 Practice

### 🟢 Level 1: Recall
Name the three kinds of authentication factors, with one example of each.

<details>
<summary>Show answer</summary>

- Something you **know**: a password or PIN.
- Something you **have**: a phone with an authenticator app, or a security key.
- Something you **are**: a fingerprint or face scan.

</details>

### 🟡 Level 2: Apply
Use Entropy = L × log₂(R) to compare two randomly chosen passwords:

1. 10 random lowercase letters.
2. 4 random words from a 7,776-word list.

Which is stronger, and by how many bits?

<details>
<summary>Show answer</summary>

1. 10 × 4.70 = **47.0 bits**.
2. 4 × 12.9 = **51.7 bits**.

The four words are stronger by about **4.7 bits**, which means about 26 times as many possible choices (2 multiplied by itself 4.7 times is about 26). They are also much easier to remember.

</details>

### 🔴 Level 3: Challenge
A student club stores member passwords like this:

```php
$stored = hash('sha256', $_POST['password']);
```

1. Explain two problems with this line.
2. Rewrite the line for signing up.
3. Write the line that checks a password at login.

<details>
<summary>Show one possible answer</summary>

1. SHA-256 is **fast**, so a stolen list can be guessed at billions of tries per second. There is **no salt**, so two members with the same password get the same hash, and ready-made tables work.
2. Sign up:

```php
$stored = password_hash($_POST['password'], PASSWORD_DEFAULT);
```

3. Log in:

```php
if (password_verify($_POST['password'], $stored)) {
    echo "Welcome back!";
}
```

</details>
