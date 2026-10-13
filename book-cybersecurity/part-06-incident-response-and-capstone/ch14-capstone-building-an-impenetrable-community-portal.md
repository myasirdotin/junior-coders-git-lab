# Chapter 14: Capstone: Building an Impenetrable Community Portal 🏰

## 🌟 Real-Life Story

An old fort was never safe because of one giant wall. It was safe because of many things working together: a moat, a strong gate, guards who checked every visitor, a locked treasury, and a well inside in case of a long siege. Even then, wise commanders never called a fort "impenetrable". They kept checking the walls and kept improving them. In this capstone you will build that kind of fort for a website. "Impenetrable" is our goal, not a promise: no real system is perfect, but many strong layers make it very hard to break.

Congratulations on reaching the final chapter! You will now bring everything together in one security plan.

## 🎯 What You Will Learn

- Build a **threat model**: what needs protecting, from whom, and what could go wrong.
- Apply every layer from this book to one real-world style project.
- Write secure PHP for logins, queries, output and forms.
- Add security **headers** and check a site against a final audit list.

## 🎯 The Project: Bayt Al-Amanah

**Bayt Al-Amanah** (a made-up charity) runs a website that coordinates food-bank deliveries, interest-free community loans (*Qard Hasan*) and help with medical costs for families in need.

### The threat model
A **threat model** is a short plan that answers four questions.

| Question | Bayt Al-Amanah's answer |
| :--- | :--- |
| What are we protecting? | Family names and addresses, medical notes, grant records, volunteer logins |
| Who might attack? | Fraudsters making fake claims; people wanting personal data; automated bots |
| What could go wrong? | Stolen passwords, injection, one family seeing another's records, a leaked database |
| What will we do? | The six layers below |

Every decision below protects real people. That is the meaning of *Amānah*.

## 🔐 Layer 1: Logins and Passwords (Chapter 2)

- **Password rule:** at least 12 characters, passphrases encouraged, no forced symbols. Check new passwords against a list of common passwords.
- **Storage:** Argon2id through `password_hash()`. Each hash gets its own salt automatically.

```php
<?php
$options = ['memory_cost' => 65536, 'time_cost' => 4, 'threads' => 1];
$hash = password_hash('lamp orbit cedar mild frost', PASSWORD_ARGON2ID, $options);
echo substr($hash, 0, 31), "\n";
var_dump(password_verify('lamp orbit cedar mild frost', $hash));
```

Output:

```
$argon2id$v=19$m=65536,t=4,p=1$
bool(true)
```

The start of the hash records the settings: 65,536 KiB (64 MiB) of memory, 4 passes and 1 thread. The rest is the salt and the hash itself.

- **Slow down guessers:** after 5 failed logins in 15 minutes, pause that account and ask for extra checks.

```php
<?php
function tooManyAttempts(array $failTimes, int $now): bool {
    $recent = 0;
    foreach ($failTimes as $t) {
        if ($now - $t < 900) {   // 900 seconds = 15 minutes
            $recent++;
        }
    }
    return $recent >= 5;
}

$now = 10000;
var_dump(tooManyAttempts([9100, 9500, 9800], $now));
var_dump(tooManyAttempts([9200, 9300, 9400, 9600, 9900], $now));
var_dump(tooManyAttempts([1000, 2000, 3000, 4000, 9900], $now));
```

Output:

```
bool(false)
bool(true)
bool(false)
```

Only the second list has 5 failures inside the last 15 minutes. Old failures from long ago do not count.

- **MFA:** every staff member and volunteer uses an authenticator-app code as well as a password.

## 🗄️ Layer 2: The Database (Chapters 7 and 8)

- **Every** query uses prepared statements. No user input is ever glued into SQL.
- **Every** query for personal data checks ownership or role.

```php
$stmt = $pdo->prepare(
    "SELECT * FROM grant_applications WHERE id = ? AND family_id = ?"
);
$stmt->execute([$_GET['id'] ?? 0, $_SESSION['family_id']]);
$application = $stmt->fetch(PDO::FETCH_ASSOC);
```

- **Least privilege:** the website's database account may `SELECT`, `INSERT` and `UPDATE` the application tables only. It cannot `DROP` (delete) tables or create new users.
- **Medical notes** are encrypted in the database (Chapter 9), with the key stored outside the code.

## 🖥️ Layer 3: Pages and Forms (Chapters 5, 6 and 8)

- **Validate** every input on the server (type, length, allowed values).
- **Escape** every output:

```php
function e($value) {
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}
echo '<p>' . e($volunteerNote) . '</p>';
```

- **CSRF token** in every POST form, checked with `hash_equals()`.
- **Error pages** show a friendly message only. Details go to a private log.

## 🌐 Layer 4: Security Headers and HTTPS (Chapters 6 and 10)

**Headers** are extra instructions the server sends with every page. In PHP they are sent with `header()` before any page content:

```php
<?php
header("Content-Security-Policy: default-src 'self'; script-src 'self'; object-src 'none'; frame-ancestors 'none'");
header("Strict-Transport-Security: max-age=63072000; includeSubDomains");
header("X-Content-Type-Options: nosniff");
header("Referrer-Policy: strict-origin-when-cross-origin");
```

| Header | What it does |
| :--- | :--- |
| `Content-Security-Policy` | Allows scripts only from this site; `frame-ancestors 'none'` stops other sites showing this page inside a hidden frame (a trick called **clickjacking**) |
| `Strict-Transport-Security` (HSTS) | Tells browsers to use HTTPS only, for 2 years (63,072,000 seconds) |
| `X-Content-Type-Options: nosniff` | Stops the browser guessing a file's type, so a text upload is never run as a script |
| `Referrer-Policy` | Shares less of the page address when visitors follow a link to another site |

The session cookie is set like this:

```http
Set-Cookie: session_id=...; Path=/; Secure; HttpOnly; SameSite=Lax
```

Older guides use `X-Frame-Options: DENY` to stop clickjacking. It still works, and you may send both.

## 🧩 Layer 5: Software and Secrets (Chapters 5 and 11)

- Keep PHP, the database and every library **updated**. Remove plugins nobody uses.
- Keep passwords and keys in a `.env` file that is listed in `.gitignore`, never in code.

## 🚨 Layer 6: Logs, Backups and a Plan (Chapters 11 and 13)

- Log logins, failed logins, permission errors and admin actions, without logging passwords.
- Daily backups following 3-2-1, with a test restore every month.
- A written incident plan: who is called, who can switch the site off, who tells families.

## 🌟 The Trustworthy Guardian (*Al-Amīn*)

Before his prophethood, the Prophet Muhammad ﷺ was known in Makkah as **Al-Amīn**: the trustworthy one. People left their valuables with him because they knew he would protect them.

When you:

- choose prepared statements instead of shortcuts,
- hash passwords with slow, salted algorithms,
- check permissions on every request,
- and collect only the data you truly need,

you are keeping an *Amānah* and doing your work with *Iḥsān*: excellence and care, even in places nobody else will see.

## 🎓 Textbook Completion Milestone

Congratulations! You have completed all 14 chapters of **Cybersecurity & Digital Hygiene**. You are ready to explore the **Cybersecurity Lab Studio**, try the practice exercises, and protect the people who trust the websites you build. Use your knowledge only to defend, and always with permission.

## ⚠️ Common Mistake

**Mistake:** "We added a firewall and HTTPS, so the portal is secure. We can stop now."

**What happens:** HTTPS protects data on the way, and a firewall blocks some traffic. Neither one stops a missing ownership check, an unescaped comment or a reused admin password. Attackers look for the one layer you forgot.

**Fixed thinking:** go through **every** layer in this chapter, and check them again after every new feature. Security is a habit, not a single task.

## ✍️ Try It

Take a PHP project you have built, or the project you are building now.

1. Write a four-line threat model using the table above.
2. Go through Layers 1 to 6 and mark each item ✅ done, ⚠️ partly done or ❌ missing.
3. Fix one ❌ today.

*Hint:* start with the highest risk, usually prepared statements or ownership checks.

## 📝 Recap

- A threat model asks: what are we protecting, from whom, what could go wrong, and what will we do?
- Strong logins: long passphrases, Argon2id or bcrypt, limits on guessing, and MFA.
- Safe data: prepared statements, ownership checks, least privilege and encryption for sensitive notes.
- Safe pages: validate input, escape output, CSRF tokens and security headers.
- Updates, secrets kept out of code, logs, backups and an incident plan complete the fort.
- No system is perfect; many layers, checked often, make it very hard to break.

## 🏆 Practice

### 🟢 Level 1: Recall
Name one defence from this chapter for each of these risks:

1. A stolen password.
2. SQL injection.
3. A comment that contains HTML.
4. One family viewing another family's application.

<details>
<summary>Show answer</summary>

1. **MFA** (a code from an authenticator app).
2. **Prepared statements.**
3. **Escaping output** with `htmlspecialchars()`.
4. An **ownership check** in the query (`AND family_id = ?`).

</details>

### 🟡 Level 2: Apply
Explain what each part of this header does:

```http
Strict-Transport-Security: max-age=63072000; includeSubDomains
```

How many days is 63,072,000 seconds?

<details>
<summary>Show answer</summary>

- `Strict-Transport-Security` tells browsers to use **only HTTPS** for this site.
- `max-age=63072000` means "remember this rule for 63,072,000 seconds".
- `includeSubDomains` applies the rule to every subdomain too, such as `volunteers.example.org`.

63,072,000 ÷ 86,400 seconds per day = **730 days** (2 years).

</details>

### 🔴 Level 3: Challenge
Run a full security audit of a "Volunteer Sign-Up" page for Bayt Al-Amanah. The page has a form (name, email, phone, available days), saves to a database, and shows a list of volunteers to coordinators.

1. Write a threat model (four questions).
2. List at least eight checks across the six layers.
3. Write the PHP that saves a sign-up safely: CSRF check, validation, and a prepared statement.
4. Write the PHP line that shows one volunteer's name safely.

<details>
<summary>Show one possible answer</summary>

1. **Threat model:** protecting volunteers' names, emails and phone numbers; from spammers, bots and people collecting contact details; risks are injection, XSS, fake sign-ups and a leaked list; defences below.
2. **Checks:**
   - HTTPS and HSTS on every page.
   - CSRF token in the form.
   - Server-side validation of every field.
   - Prepared statement for the insert.
   - Output escaping on the coordinators' list.
   - Only logged-in coordinators (role check) can see the list.
   - Coordinators use MFA.
   - Limit sign-ups per hour to slow bots.
   - The database user cannot drop tables.
   - Daily backup and a log of who viewed the list.
3. Saving a sign-up:

```php
<?php
session_start();
if (!hash_equals($_SESSION['csrf_token'] ?? '', $_POST['csrf_token'] ?? '')) {
    http_response_code(403);
    exit('Form expired. Please reload and try again.');
}

$name  = trim($_POST['name'] ?? '');
$email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
if ($name === '' || strlen($name) > 60 || $email === false) {
    exit('Please enter your name and a valid email.');
}

$stmt = $pdo->prepare("INSERT INTO volunteers (name, email) VALUES (?, ?)");
$stmt->execute([$name, $email]);
echo 'Thank you for volunteering!';
```

4. Showing a name:

```php
echo htmlspecialchars($volunteer['name'], ENT_QUOTES, 'UTF-8');
```

</details>
