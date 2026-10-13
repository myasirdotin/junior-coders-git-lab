# Chapter 23: Dates & Times in SQL

> **Key Idea**: Dates are stored as `'YYYY-MM-DD'`. MySQL has functions to get today's date, take a date apart, show it nicely, add days to it and count the days between two dates. With them you can find overdue library books and total donations by month.

---

## 🌟 Real-Life Story

The school librarian stamps a due date inside every book: "Return within 14 days". On Monday mornings she checks her lending cards. Which books are past their due date? By how many days? At the end of the month the charity club also asks her: "How much did we collect in September?" Doing this by hand means counting on a calendar. SQL's date functions do the counting for you, without mistakes.

## 🎯 What You Will Learn

- Choose between `DATE`, `DATETIME` and `TIMESTAMP`, and write dates in `'YYYY-MM-DD'` form.
- Get the current date and time with `CURDATE()` and `NOW()`.
- Take dates apart with `YEAR()`, `MONTH()`, `DAY()`, and show them with `DATE_FORMAT()`.
- Calculate with dates using `DATE_ADD()` and `DATEDIFF()`, for example to find overdue loans.
- Filter by a date range and group rows by month, and translate it all to the SQLite Sandbox.

---

## 📅 The Three Date Types (a Reminder)

Chapter 6 introduced the date and time types. Here they are again:

| Type | Looks like | Use it for |
| :--- | :--- | :--- |
| `DATE` | `2026-09-02` | a day: loan date, donation date |
| `DATETIME` | `2026-09-30 14:40:00` | an exact moment: a visitor signing in |
| `TIMESTAMP` | `2026-09-30 14:40:00` | when a row was created or changed |

`DATETIME` and `TIMESTAMP` look the same. The difference is how they are stored:

- `DATETIME` stores exactly what you give it. It can hold years 1000 to 9999.
- `TIMESTAMP` is saved in **UTC** (world time) and shown in the server's time zone. It only covers 1970 to 2038. It is handy with `DEFAULT CURRENT_TIMESTAMP` to record "when was this row added?"

In `school_db`, `loans.loan_date` and `donations.donated_on` are both `DATE`.

### Always year first: `'YYYY-MM-DD'`

MySQL reads dates as **year-month-day**, with two digits for month and day:

| You mean | Write |
| :--- | :--- |
| 2 September 2026 | `'2026-09-02'` |
| 30 September 2026, 2:40 pm | `'2026-09-30 14:40:00'` |

Dates in quotes look like text, but MySQL compares and sorts them as real dates. Year first also means they sort from oldest to newest.

---

## ⏰ Today and Now: `CURDATE()` and `NOW()`

```sql
SELECT CURDATE(), NOW(), CURTIME();
```

| CURDATE() | NOW() | CURTIME() |
| :--- | :--- | :--- |
| 2026-10-13 | 2026-10-13 18:51:15 | 18:51:15 |

Your answer will show **your** date and time, so it is different every time you run it.

Because the answer changes every day, the examples in this chapter use a fixed "today", **13 October 2026**, written as `'2026-10-13'`. In a real report you would put `CURDATE()` in its place.

---

## 🔍 Taking a Date Apart: `YEAR()`, `MONTH()`, `DAY()`

Each function pulls one number out of a date:

```sql
SELECT donor, donated_on,
       YEAR(donated_on)  AS yr,
       MONTH(donated_on) AS mon,
       DAY(donated_on)   AS dy
FROM donations
ORDER BY donated_on
LIMIT 3;
```

| donor | donated_on | yr | mon | dy |
| :--- | :--- | ---: | ---: | ---: |
| Ahmad | 2026-09-01 | 2026 | 9 | 1 |
| Sara | 2026-09-03 | 2026 | 9 | 3 |
| Ibrahim | 2026-09-07 | 2026 | 9 | 7 |

The answers are plain numbers, so `MONTH(donated_on) = 9` means "in September". Other useful ones: `DAYNAME('2026-10-13')` gives `Tuesday` and `MONTHNAME('2026-10-13')` gives `October`.

---

## 🖨️ Showing Dates Nicely: `DATE_FORMAT()`

`2026-09-01` is clear to a computer. A certificate or a letter home should say "01 September 2026". `DATE_FORMAT(date, pattern)` builds that text. In the pattern, each `%` code is replaced by a part of the date:

| Code | Means | Example |
| :--- | :--- | :--- |
| `%d` | day, 2 digits | `01` |
| `%m` | month, 2 digits | `09` |
| `%M` | month name | `September` |
| `%Y` | year, 4 digits | `2026` |
| `%a` | short day name | `Tue` |
| `%H:%i` | hour and minutes | `14:40` |

```sql
SELECT donor,
       DATE_FORMAT(donated_on, '%d %M %Y') AS nice,
       DATE_FORMAT(donated_on, '%a %d/%m') AS short
FROM donations
ORDER BY donated_on
LIMIT 4;
```

| donor | nice | short |
| :--- | :--- | :--- |
| Ahmad | 01 September 2026 | Tue 01/09 |
| Sara | 03 September 2026 | Thu 03/09 |
| Ibrahim | 07 September 2026 | Mon 07/09 |
| Hafsa | 12 September 2026 | Sat 12/09 |

> 💡 `DATE_FORMAT` gives back **text**. Use it for showing dates, not for sorting. Sort by the real date column, or `'01 September'` and `'03 October'` will sort by their first letters.

---

## ➕ Adding Days: `DATE_ADD()` and a Due Date

The library lends books for **14 days**. `DATE_ADD(date, INTERVAL n unit)` moves a date forward:

```sql
SELECT id, loan_date,
       DATE_ADD(loan_date, INTERVAL 14 DAY) AS due_date
FROM loans
WHERE returned = 'No';
```

| id | loan_date | due_date |
| ---: | :--- | :--- |
| 2 | 2026-09-20 | 2026-10-04 |
| 5 | 2026-09-25 | 2026-10-09 |
| 7 | 2026-09-12 | 2026-09-26 |
| 8 | 2026-09-28 | 2026-10-12 |
| 10 | 2026-10-01 | 2026-10-15 |

MySQL knows how long each month is. 20 September + 14 days correctly becomes 4 October.

The unit can be `DAY`, `WEEK`, `MONTH` or `YEAR`. `DATE_SUB` moves backwards:

| Expression | Result |
| :--- | :--- |
| `DATE_SUB('2026-10-13', INTERVAL 30 DAY)` | `2026-09-13` |
| `DATE_ADD('2026-01-31', INTERVAL 1 MONTH)` | `2026-02-28` |

There is no 31 February, so MySQL uses the last day of February.

---

## ➖ Counting Days: `DATEDIFF()`

`DATEDIFF(later, earlier)` gives the number of days from the second date to the first. Order matters: put the **later** date first to get a positive number.

How long has each unreturned book been out?

```sql
SELECT id, loan_date,
       DATEDIFF('2026-10-13', loan_date) AS days_out
FROM loans
WHERE returned = 'No'
ORDER BY days_out DESC;
```

| id | loan_date | days_out |
| ---: | :--- | ---: |
| 7 | 2026-09-12 | 31 |
| 2 | 2026-09-20 | 23 |
| 5 | 2026-09-25 | 18 |
| 8 | 2026-09-28 | 15 |
| 10 | 2026-10-01 | 12 |

### Putting it together: the overdue report

A loan is **overdue** when it is not returned and its due date is before today. `days_late` counts from the due date:

```sql
SELECT l.id, s.name, l.loan_date,
       DATE_ADD(l.loan_date, INTERVAL 14 DAY) AS due_date,
       DATEDIFF('2026-10-13',
                DATE_ADD(l.loan_date, INTERVAL 14 DAY)) AS days_late
FROM loans l
JOIN students s ON l.student_id = s.id
WHERE l.returned = 'No'
  AND DATE_ADD(l.loan_date, INTERVAL 14 DAY) < '2026-10-13'
ORDER BY days_late DESC;
```

| id | name | loan_date | due_date | days_late |
| ---: | :--- | :--- | :--- | ---: |
| 7 | Tariq | 2026-09-12 | 2026-09-26 | 17 |
| 2 | Zayd | 2026-09-20 | 2026-10-04 | 9 |
| 5 | Bilal | 2026-09-25 | 2026-10-09 | 4 |
| 8 | Aisha | 2026-09-28 | 2026-10-12 | 1 |

Khadija's loan 10 is not on the list. It is due on 15 October, so it is not late yet.

> 🤝 **Kindness and *Amānah*.** This list is for the librarian, to send a polite reminder. It is not for a notice board. Who is late with a book is private information, and we keep it that way.

---

## 🗓️ Filtering by Date Range

`BETWEEN` (Chapter 11) works on dates too. Donations in the first half of September:

```sql
SELECT donor, amount, donated_on
FROM donations
WHERE donated_on BETWEEN '2026-09-01' AND '2026-09-15'
ORDER BY donated_on;
```

| donor | amount | donated_on |
| :--- | ---: | :--- |
| Ahmad | 1500 | 2026-09-01 |
| Sara | 5000 | 2026-09-03 |
| Ibrahim | 2500 | 2026-09-07 |
| Hafsa | 3000 | 2026-09-12 |

Both end dates are included. A "last 21 days" list uses `DATE_SUB` to find the start:

```sql
SELECT donor, DATEDIFF('2026-10-13', donated_on) AS days_ago
FROM donations
WHERE donated_on >= DATE_SUB('2026-10-13', INTERVAL 21 DAY)
ORDER BY donated_on;
```

| donor | days_ago |
| :--- | ---: |
| Omar | 17 |
| Layla | 11 |

---

## 📊 Grouping by Month

The charity club wants totals per month. Group by the year and month together:

```sql
SELECT DATE_FORMAT(donated_on, '%Y-%m') AS month,
       COUNT(*)    AS gifts,
       SUM(amount) AS total
FROM donations
GROUP BY month
ORDER BY month;
```

| month | gifts | total |
| :--- | ---: | ---: |
| 2026-09 | 7 | 25500 |
| 2026-10 | 1 | 2000 |

`'%Y-%m'` gives text like `2026-09`, which sorts in time order because the year comes first.

Why not just `MONTH(donated_on)`? Because September 2026 and September 2027 would land in the same group. Keep the year in the group. This version does the same with two number columns:

```sql
SELECT YEAR(donated_on)  AS yr,
       MONTH(donated_on) AS mon,
       COUNT(*)          AS gifts,
       SUM(amount)       AS total
FROM donations
GROUP BY YEAR(donated_on), MONTH(donated_on)
ORDER BY yr, mon;
```

| yr | mon | gifts | total |
| ---: | ---: | ---: | ---: |
| 2026 | 9 | 7 | 25500 |
| 2026 | 10 | 1 | 2000 |

---

## ⏱️ Dates with Times: `DATETIME`

The science fair records the exact moment each class signs in:

```sql
CREATE TABLE fair_visits (
    id        INT AUTO_INCREMENT PRIMARY KEY,
    visitor   VARCHAR(50) NOT NULL,
    signed_in DATETIME NOT NULL
);

INSERT INTO fair_visits (visitor, signed_in) VALUES
 ('Grade 8 Eagles',  '2026-09-30 09:15:00'),
 ('Grade 9 Hawks',   '2026-09-30 14:40:00'),
 ('Grade 7 Falcons', '2026-10-01 10:05:00');

SELECT visitor,
       DATE(signed_in) AS day,
       TIME(signed_in) AS time,
       HOUR(signed_in) AS hr
FROM fair_visits;
```

| visitor | day | time | hr |
| :--- | :--- | :--- | ---: |
| Grade 8 Eagles | 2026-09-30 | 09:15:00 | 9 |
| Grade 9 Hawks | 2026-09-30 | 14:40:00 | 14 |
| Grade 7 Falcons | 2026-10-01 | 10:05:00 | 10 |

`DATE()` keeps only the day and `TIME()` only the clock time. The Common Mistake below shows why times need extra care.

---

## 🧪 MySQL vs the SQL Sandbox (SQLite)

The browser SQL Sandbox runs **SQLite**. SQLite stores dates as text and has **different date functions**. The ideas are the same; the words change:

| Job | MySQL / MariaDB | SQLite (Sandbox) |
| :--- | :--- | :--- |
| today | `CURDATE()` | `date('now')` |
| now | `NOW()` | `datetime('now')` |
| year | `YEAR(d)` | `strftime('%Y', d)` |
| month | `MONTH(d)` → `9` | `strftime('%m', d)` → `'09'` |
| add 14 days | `DATE_ADD(d, INTERVAL 14 DAY)` | `date(d, '+14 days')` |
| days between | `DATEDIFF(a, b)` → `31` | `julianday(a) - julianday(b)` → `31.0` |
| format | `DATE_FORMAT(d, '%d/%m/%Y')` | `strftime('%d/%m/%Y', d)` |
| year-month | `DATE_FORMAT(d, '%Y-%m')` | `strftime('%Y-%m', d)` |

Three things to watch in SQLite:

- `strftime` gives back **text**, so the month is `'09'`, not `9`.
- `datetime('now')` is in **UTC** (world time), so it may be hours away from your clock.
- In SQLite `%M` means **minutes**, not the month name. There is no month-name code at all.

The overdue report in the Sandbox:

```sql
SELECT l.id, s.name,
       date(l.loan_date, '+14 days') AS due_date,
       julianday('2026-10-13')
         - julianday(date(l.loan_date, '+14 days')) AS days_late
FROM loans l
JOIN students s ON l.student_id = s.id
WHERE l.returned = 'No'
  AND date(l.loan_date, '+14 days') < '2026-10-13'
ORDER BY days_late DESC;
```

| id | name | due_date | days_late |
| ---: | :--- | :--- | ---: |
| 7 | Tariq | 2026-09-26 | 17.0 |
| 2 | Zayd | 2026-10-04 | 9.0 |
| 5 | Bilal | 2026-10-09 | 4.0 |
| 8 | Aisha | 2026-10-12 | 1.0 |

Same four students, same days. `BETWEEN` with `'YYYY-MM-DD'` dates works the same in both.

---

## ⚠️ Common Mistake

**Mistake 1: writing the date the way we say it.**

```sql
SELECT donor, donated_on
FROM donations
WHERE donated_on > '12-09-2026';
```

The writer meant "after 12 September". MySQL cannot read `'12-09-2026'` as a date. It gives `Warning 1292: Truncated incorrect datetime value` and returns **all 8 donations**, including Ahmad's from 1 September. No error, just a wrong answer.

**Fixed version:** year first.

```sql
WHERE donated_on > '2026-09-12'
```

This returns the 4 donations from 18 September onwards.

**Mistake 2: `BETWEEN` with a `DATETIME` column.**

```sql
SELECT visitor, signed_in
FROM fair_visits
WHERE signed_in BETWEEN '2026-09-01' AND '2026-09-30';
```

This returns **no rows**, yet two classes came on 30 September! `'2026-09-30'` means `2026-09-30 00:00:00`, midnight at the **start** of that day. A visit at 09:15 is after it.

**Fixed version:** say "before the next day":

```sql
WHERE signed_in >= '2026-09-01'
  AND signed_in <  '2026-10-01';
```

| visitor | signed_in |
| :--- | :--- |
| Grade 8 Eagles | 2026-09-30 09:15:00 |
| Grade 9 Hawks | 2026-09-30 14:40:00 |

The `>=` start and `<` next-day end works for `DATE` and `DATETIME` alike, so it is a safe habit.

---

## ✍️ Try It

In the Sandbox or phpMyAdmin, list every loan with its **due date** shown as `DD/MM/YYYY`, newest loan first.

*Hint (MySQL): `DATE_FORMAT(DATE_ADD(loan_date, INTERVAL 14 DAY), '%d/%m/%Y')`. In the Sandbox: `strftime('%d/%m/%Y', loan_date, '+14 days')`.*

---

## 📝 Recap

- Store days in `DATE`, exact moments in `DATETIME`; `TIMESTAMP` is for "when was this row saved".
- Always write dates year first: `'2026-09-02'`.
- `CURDATE()` / `NOW()` give today and now; `YEAR()`, `MONTH()`, `DAY()` take a date apart.
- `DATE_FORMAT()` makes dates readable; `DATE_ADD()` / `DATE_SUB()` move dates; `DATEDIFF(later, earlier)` counts days.
- Group by year **and** month, and use `>=` start / `<` next-day end for ranges with times.
- The SQLite Sandbox uses `date()`, `strftime()` and `julianday()` instead.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. How do you write 5 March 2027 as a MySQL date?
2. What does `DATE_ADD('2026-09-28', INTERVAL 14 DAY)` return?
3. `DATEDIFF('2026-10-01', '2026-09-02')` returns 29. What would `DATEDIFF('2026-09-02', '2026-10-01')` return?

<details>
<summary>Show answer</summary>

1. `'2027-03-05'`
2. `2026-10-12`
3. `-29`. The dates are swapped, so the count is negative. Put the later date first.

</details>

### 🟡 Level 2: Apply
List the donations made from 16 to 30 September 2026. Show the donor, the amount and the date as `18 September` style text, oldest first.

<details>
<summary>Show answer</summary>

```sql
SELECT donor, amount,
       DATE_FORMAT(donated_on, '%d %M') AS day
FROM donations
WHERE donated_on BETWEEN '2026-09-16' AND '2026-09-30'
ORDER BY donated_on;
```

| donor | amount | day |
| :--- | ---: | :--- |
| Yusuf | 8000 | 18 September |
| Zainab | 4500 | 21 September |
| Omar | 1000 | 26 September |

We sort by `donated_on` (the real date), not by the text `day`.

</details>

### 🔴 Level 3: Challenge
The librarian wants a polite reminder list for 13 October 2026.

1. Join `loans`, `students` and `books`.
2. Keep only books not returned whose 14-day due date is before `'2026-10-13'`.
3. Show the student's name, the book title, the due date as `DD/MM/YYYY`, and the days late.
4. Put the most overdue first.
5. Bonus: count how many loans started in each month (`2026-09`, `2026-10`).

<details>
<summary>Show one possible answer</summary>

```sql
SELECT s.name, b.title,
       DATE_FORMAT(DATE_ADD(l.loan_date, INTERVAL 14 DAY),
                   '%d/%m/%Y') AS due,
       DATEDIFF('2026-10-13',
                DATE_ADD(l.loan_date, INTERVAL 14 DAY)) AS days_late
FROM loans l
JOIN students s ON s.id = l.student_id
JOIN books b    ON b.id = l.book_id
WHERE l.returned = 'No'
  AND DATE_ADD(l.loan_date, INTERVAL 14 DAY) < '2026-10-13'
ORDER BY days_late DESC;
```

| name | title | due | days_late |
| :--- | :--- | :--- | ---: |
| Tariq | Ethical Technology | 26/09/2026 | 17 |
| Zayd | Algorithm Design | 04/10/2026 | 9 |
| Bilal | Introduction to Networks | 09/10/2026 | 4 |
| Aisha | Clean Code | 12/10/2026 | 1 |

Bonus:

```sql
SELECT DATE_FORMAT(loan_date, '%Y-%m') AS month,
       COUNT(*) AS loans
FROM loans
GROUP BY month
ORDER BY month;
```

| month | loans |
| :--- | ---: |
| 2026-09 | 9 |
| 2026-10 | 1 |

</details>
