# Chapter 14: Incident Response & Digital Forensics 🚨

## 🌟 Real-Life Story

Every school practises fire drills. When the alarm rings, nobody panics or argues about what to do. Each class knows its exit, teachers take the register, and one person calls the fire service. Afterwards, the head teacher asks: "What went well? What should we change?" The plan was written **before** any fire. Security teams work the same way. They expect that one day something will go wrong, and they prepare a calm, step-by-step plan for that day.

An **incident** is any event that harms, or threatens, the security of a system: a stolen password, a malware infection, a leaked file. **Incident response** is the plan for handling it. **Digital forensics** is the careful collection of evidence to understand what happened.

## 🎯 What You Will Learn

- List the six phases of incident response and what happens in each.
- Explain why evidence must be protected, and why logs matter.
- Respond correctly to a common student incident: a secret key pushed to GitHub.
- Report a weakness you find in someone else's system, responsibly and honestly.

## ⏱️ The Six Phases of Incident Response

Security teams often follow six phases taught by the **SANS Institute**, a well-known security training organisation. **NIST**, the US standards agency, describes very similar steps.

```
1. Preparation
      │
      ▼
2. Identification
      │
      ▼
3. Containment
      │
      ▼
4. Eradication
      │
      ▼
5. Recovery
      │
      ▼
6. Lessons Learned ──► back to 1
```

### Phase 1: Preparation
Everything you do **before** anything goes wrong. Keep backups (Chapter 12). Turn on logging. Write down who to call and who is in charge. Practise.

### Phase 2: Identification
Notice that something is wrong, and confirm it. Signs include an alert from security software, many failed logins, or a user reporting a strange message.

A **log** is a file where a system records events, one per line. Even a simple script can spot a warning sign in a log. This one counts failed logins (it uses `str_contains()`, which checks whether one string contains another):

```php
<?php
$log = [
    '2026-10-01 08:01 LOGIN_OK   user=aisha',
    '2026-10-01 08:02 LOGIN_FAIL user=admin',
    '2026-10-01 08:02 LOGIN_FAIL user=admin',
    '2026-10-01 08:02 LOGIN_FAIL user=admin',
    '2026-10-01 08:03 LOGIN_OK   user=bilal',
    '2026-10-01 08:03 LOGIN_FAIL user=admin',
];

$fails = [];
foreach ($log as $line) {
    if (str_contains($line, 'LOGIN_FAIL')) {
        $user = substr($line, strpos($line, 'user=') + 5);
        $fails[$user] = ($fails[$user] ?? 0) + 1;
    }
}
foreach ($fails as $user => $count) {
    echo "$user: $count failed logins\n";
    if ($count >= 3) {
        echo "ALERT: check account '$user'\n";
    }
}
```

Output:

```
admin: 4 failed logins
ALERT: check account 'admin'
```

Four failed logins in two minutes on the admin account is worth checking. Without logs, nobody would ever know.

### Phase 3: Containment (stop it spreading)
Limit the damage quickly.

- **Disconnect** the affected device from the network: unplug the cable or turn off Wi-Fi.
- **Do not switch it off straight away** if experts may investigate. A computer's working memory (**RAM**) is wiped when power is lost, and it may hold clues about what was running.
- Lock or reset affected accounts.

For a home or school device, the simple version is: **disconnect, do not delete anything, and tell an adult.**

### Phase 4: Eradication (remove the cause)
Find **how** the attacker got in and close that gap. Remove the malware. Fix the bug. Change every password or key that might have been seen.

### Phase 5: Recovery (return safely)
Restore clean systems and data from backups made **before** the incident. Watch closely for a while in case the problem returns.

### Phase 6: Lessons Learned
Meet and ask: How did it happen? What worked? What will we change? Keep this meeting **blameless**: the goal is to fix the system, not to shame a person. People who fear blame hide mistakes; people who feel safe report them early.

## 🔍 Forensics: Protecting Evidence

**Forensics** means collecting evidence carefully, so the story of what happened can be trusted.

- Write down **what you saw and when**: times, messages, screen text.
- Take photos or screenshots of error messages.
- Do not "tidy up" by deleting files. That destroys evidence.
- Experts copy disks and then work only on the copy. They record a **hash** (Chapter 10) of the copy, so anyone can later check it was not changed.

## 🔑 A Common Student Incident: A Secret on GitHub

Sara pushes her project to a public GitHub repository. Later she notices that `config.php` contains her database password and an API key (an **API key** is a secret code that lets a program use an online service).

| ❌ Risky response | ✅ Correct response |
| :--- | :--- |
| Delete the file in a new commit and hope nobody saw it | **Revoke** (cancel) the key and change the password at once. Automated bots scan public repositories for secrets within minutes |
| Tell nobody | Tell the teacher or project owner |
| Keep secrets in code files | Move secrets to a file listed in `.gitignore`, such as `.env`, and only ever commit an example file without real values |

Deleting the file is not enough: the old commit still contains the secret in the project's history. The key must be treated as stolen.

## 📜 Reporting a Weakness Responsibly (*Ṣidq*)

What if you notice a security problem on someone else's site, such as your school portal?

1. **Stop.** Do not explore further, and do not look at other people's data. Exploring without permission is illegal, even with good intentions.
2. **Write down** simply what you noticed and how, without trying it again.
3. **Report privately** to the owner: a teacher, the IT office, or the contact listed in the site's `/.well-known/security.txt` file, if it has one.
4. **Keep it private** while they fix it. Organisations often ask for up to 90 days.
5. **Be truthful** (*Ṣidq*): report exactly what you did and saw. Honesty is what separates a trusted defender from an intruder.

## 🏠 What to Do at Home

Your family's mini incident plan:

- Know who to tell: a parent, or the IT office at school.
- If a device acts strangely: disconnect it from the internet, do not delete anything, tell an adult.
- If an account is taken over: use the service's official recovery page, change the password and turn on 2FA.
- Change passwords from a **different, healthy** device.
- Keep backups ready (Chapter 12) so recovery is possible.

## ⚠️ Common Mistake

**Mistake:** "My laptop has malware! I will quickly delete the strange files and reinstall everything."

**What happens:** the strange files might be the only clue to **how** the malware got in. Without knowing that, the same hole stays open and the problem returns. Hurried deleting can also wipe your own work that was not backed up.

**Fixed version:** disconnect first, write down what you see, tell an adult or IT staff, and let them decide what to collect before cleaning.

## ✍️ Try It

Write a one-page incident plan for a student coding club.

1. Who is told first if something goes wrong?
2. What are the first three things to do if an API key is pushed to a public repository?
3. Where are the backups, and who can restore them?

*Hint:* follow the six phases in order, starting with Preparation.

## 📝 Recap

- Incident response has six phases: Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned.
- Logs make incidents visible; without them, attacks go unseen.
- Contain first (disconnect), protect evidence, then remove the cause.
- A secret pushed to a public repository must be revoked at once; deleting the file is not enough.
- Report weaknesses privately and honestly; never explore further without permission.

## 🏆 Practice

### 🟢 Level 1: Recall
List the six phases of incident response in order.

<details>
<summary>Show answer</summary>

1. Preparation
2. Identification
3. Containment
4. Eradication
5. Recovery
6. Lessons Learned

</details>

### 🟡 Level 2: Apply
Put each action into the correct phase:

1. Restoring the website from last Tuesday's clean backup.
2. Unplugging the infected computer's network cable.
3. Writing down who to call if the school website is defaced.
4. Removing the outdated plugin that let the attacker in.

<details>
<summary>Show answer</summary>

1. **Recovery**
2. **Containment**
3. **Preparation**
4. **Eradication**

</details>

### 🔴 Level 3: Challenge
Change the log script above so it:

1. Also counts successful logins for each user.
2. Prints an alert only when a user has **3 or more** failed logins **and no** successful login.

Test it with the same log and write down the output.

<details>
<summary>Show one possible answer</summary>

```php
<?php
$log = [
    '2026-10-01 08:01 LOGIN_OK   user=aisha',
    '2026-10-01 08:02 LOGIN_FAIL user=admin',
    '2026-10-01 08:02 LOGIN_FAIL user=admin',
    '2026-10-01 08:02 LOGIN_FAIL user=admin',
    '2026-10-01 08:03 LOGIN_OK   user=bilal',
    '2026-10-01 08:03 LOGIN_FAIL user=admin',
];

$fails = [];
$oks = [];
foreach ($log as $line) {
    $user = substr($line, strpos($line, 'user=') + 5);
    if (str_contains($line, 'LOGIN_FAIL')) {
        $fails[$user] = ($fails[$user] ?? 0) + 1;
    } else {
        $oks[$user] = ($oks[$user] ?? 0) + 1;
    }
}
foreach ($fails as $user => $count) {
    if ($count >= 3 && empty($oks[$user])) {
        echo "ALERT: $user has $count failed logins and no success\n";
    }
}
```

Output:

```
ALERT: admin has 4 failed logins and no success
```

</details>
