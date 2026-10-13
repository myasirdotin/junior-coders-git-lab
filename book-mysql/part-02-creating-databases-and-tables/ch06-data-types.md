# Chapter 6: SQL Data Types

> **Key Idea**: Every column has a data type. The right type saves space, keeps wrong data out, and makes sums and dates work correctly.

---

## 🌟 Real-Life Story

A school office has different boxes for different things. Exam papers go in the paper tray. Coins for the charity drive go in a locked coin box. Library cards go in a card file. If someone dropped coins into the paper tray, counting the money would be a mess. Data types are the database's labelled boxes: numbers go with numbers, dates with dates, text with text.

## 🎯 What You Will Learn

- Explain why each column needs a data type.
- Choose between `INT`, `DECIMAL`, `FLOAT`, `VARCHAR`, `CHAR`, `TEXT`, `DATE` and `BOOLEAN`.
- Explain why money must use `DECIMAL`, not `FLOAT`.
- Understand why each `school_db` column has the type it has.
- Turn on strict mode so MySQL rejects wrong data.

---

## Why Data Types Matter

A computer treats `15` (a number) and `'15'` (text) differently.

- Store prices as text and you cannot add them up properly.
- Store dates as words like `'next Tuesday'` and you cannot sort them by time.

With a data type, MySQL checks every value that goes into the column:

```
Column: age INT
15          → accepted
'Fifteen'   → rejected (or turned into 0!)
```

---

## Family 1: Number Types

| Type | What it holds | Range or size | Good for |
| :--- | :--- | :--- | :--- |
| `INT` | whole numbers | about −2.1 billion to +2.1 billion | ids, page counts, grades |
| `BIGINT` | very large whole numbers | about ±9 × 10¹⁸ | huge counters |
| `DECIMAL(M,D)` | **exact** decimals | M digits in total, D after the point | money, GPA, marks |
| `FLOAT` / `DOUBLE` | **approximate** decimals | very large or tiny | science readings |

`DECIMAL(3,2)` means 3 digits in total, 2 of them after the point. So the largest value is `9.99`. That is perfect for a GPA from 0 to 4.

### Why money needs `DECIMAL`

`FLOAT` and `DOUBLE` store numbers in binary (base 2). Many decimals, such as 0.1, cannot be stored exactly in binary. Tiny errors creep in. Here we store 0.1 in a `DOUBLE` column, then add 0.2:

| dbl |
| ---: |
| 0.30000000000000004 |

And `1234567.89` stored in a `FLOAT` column comes back as:

| f (FLOAT) | d (DECIMAL(10,2)) |
| ---: | ---: |
| 1234570 | 1234567.89 |

The `FLOAT` lost the paise! For charity donations, fees or Zakat, fairness means being exact. Always use `DECIMAL(10,2)` for money (up to 99,999,999.99).

---

## Family 2: Text Types

| Type | What it holds | Good for |
| :--- | :--- | :--- |
| `VARCHAR(N)` | text up to N characters; uses only the space needed | names, titles, cities |
| `CHAR(N)` | text of exactly N characters | codes like `'PK'` or `'IN'` |
| `TEXT` | long text, up to about 64 KB | a book summary |
| `LONGTEXT` | very long text, up to 4 GB | a whole e-book |

`VARCHAR(50)` storing `'Aisha'` uses only 5 characters of space plus a tiny length marker. `CHAR(50)` would always reserve the full 50.

> 💡 **Phone numbers are text, not numbers.** You never add phone numbers together, and they can start with `0` or `+`. Use `VARCHAR(20)`.

---

## Family 3: Date and Time Types

| Type | Format | Good for |
| :--- | :--- | :--- |
| `DATE` | `YYYY-MM-DD` | borrowing date, birthday |
| `TIME` | `HH:MM:SS` | class start time |
| `DATETIME` | `YYYY-MM-DD HH:MM:SS` | exact moment of an event |
| `TIMESTAMP` | same look, stored in UTC | when a row was created or changed |

Dates are written year first: `'2026-09-02'` means 2 September 2026. This order sorts correctly from oldest to newest.

A common pattern lets MySQL fill in the time for you:

```sql
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

---

## Family 4: True or False (`BOOLEAN`)

`BOOLEAN` (or `BOOL`) holds true or false. MySQL really stores it as a tiny number: `1` for TRUE and `0` for FALSE. If you insert `TRUE` and read it back, you see `1`.

---

## The Types in `school_db`

Here is why Chapter 5 chose each type:

| Column | Type | Why |
| :--- | :--- | :--- |
| `students.name` | `VARCHAR(50)` | names vary in length |
| `students.grade` | `INT` | a whole number like 8 |
| `students.gpa` | `DECIMAL(3,2)` | exact, like 3.95; max 9.99 |
| `books.pages` | `INT` | whole number |
| `books.available` | `VARCHAR(3)` | holds `'Yes'` or `'No'` |
| `loans.loan_date` | `DATE` | can be sorted by time |
| `donations.amount` | `INT` | whole rupees only |

`available` could also be a `BOOLEAN`. We kept `'Yes'`/`'No'` text because it is easy to read for beginners. Both are fine; just choose one and stay consistent.

> 🧪 **Sandbox note:** SQLite (the sandbox) is relaxed about types. It will store `'Fifteen'` in a number column without complaint. MySQL checks types; SQLite mostly does not.

---

## ⚠️ Common Mistake

**Mistake: trusting MySQL to always reject bad data.**

A standard XAMPP install runs MariaDB in a relaxed mode. Watch what happens:

```sql
INSERT INTO t (age) VALUES ('Fifteen');
INSERT INTO t (gpa) VALUES (12.5);      -- gpa is DECIMAL(3,2)
INSERT INTO t (dt)  VALUES ('next Tuesday');
```

No error appears! Only a warning. The stored values are:

| age | gpa | dt |
| ---: | ---: | :--- |
| 0 | 9.99 | 0000-00-00 |

`'Fifteen'` became `0`, `12.5` was cut down to `9.99`, and the date became zeros. That is wrong data, silently saved.

**Fixed version:** turn on **strict mode** for your session:

```sql
SET SESSION sql_mode = 'STRICT_TRANS_TABLES';
```

Now the same insert stops with a clear error:

```
ERROR 1366 (22007): Incorrect integer value: 'Fifteen' for column ... `age`
```

Most hosting servers already use strict mode. Turn it on while you practise so you see your mistakes.

---

## ✍️ Try It

In phpMyAdmin (database `school_db`), run `DESCRIBE donations;`. Then answer:

1. Which column would you change to `DECIMAL(10,2)` if donors could give 1500.50 rupees?
2. Which type is `donated_on`, and why is that better than `VARCHAR`?

*Hint: think about which column holds money and which column you would sort by time.*

---

## 📝 Recap

- A data type says what kind of value a column can hold.
- Use `INT` for whole numbers and `DECIMAL(M,D)` for exact decimals and money.
- `FLOAT`/`DOUBLE` are approximate; never use them for money.
- Use `VARCHAR` for most text, including phone numbers; `DATE` for dates written `YYYY-MM-DD`.
- XAMPP is relaxed by default; strict mode makes MySQL reject wrong data.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Why is `DECIMAL(10,2)` better than `FLOAT` for donation amounts?
2. In what format does MySQL expect a `DATE`?
3. What is the difference between `VARCHAR(50)` and `CHAR(50)`?

<details>
<summary>Show answer</summary>

1. `DECIMAL` is exact. `FLOAT` is approximate, so amounts can come back slightly wrong (for example 1234567.89 became 1234570).
2. `YYYY-MM-DD`, for example `'2026-09-02'`.
3. `VARCHAR(50)` uses only the space the text needs, up to 50 characters. `CHAR(50)` always takes the full 50.

</details>

### 🟡 Level 2: Apply
Choose the best type for each value:
1. A student's birth date: `2012-04-15`
2. A phone number: `+92-300-1234567`
3. Whether a book is on the shelf: true/false
4. A textbook price in rupees: `1450.75`
5. The full text of a long encyclopedia article

<details>
<summary>Show answer</summary>

1. `DATE`
2. `VARCHAR(20)` (it has `+` and dashes, and is never used in sums)
3. `BOOLEAN` (or `VARCHAR(3)` holding `'Yes'`/`'No'`, as in `school_db`)
4. `DECIMAL(10,2)`
5. `TEXT` (or `LONGTEXT` if it is extremely long)

</details>

### 🔴 Level 3: Challenge
A developer stores phone numbers in an `INT` column.

1. Predict what happens to `'03001234567'` in relaxed mode and in strict mode.
2. Explain two problems with this design.
3. Write a corrected column definition.

<details>
<summary>Show one possible answer</summary>

1. The number 3001234567 is larger than the biggest `INT` (2,147,483,647). In relaxed mode MariaDB stores `2147483647` with a warning, so every long number turns into the same wrong value. In strict mode the insert fails with `ERROR 1264 ... Out of range value`.
2. Problems: the leading `0` is lost; `+` and dashes cannot be stored; long numbers do not fit.
3. `phone VARCHAR(20)`

</details>
