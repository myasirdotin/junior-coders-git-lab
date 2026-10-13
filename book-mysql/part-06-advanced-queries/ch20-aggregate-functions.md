# Chapter 20: Aggregate Functions (COUNT, SUM, AVG, MIN, MAX)

> **Key Idea**: An aggregate function looks at many rows and gives back **one** summary number: how many, the total, the average, the smallest or the largest.

---

## 🌟 Real-Life Story

After the charity week, the club leader does not read out all eight donation slips at assembly. She says: "We received 8 gifts, 27,500 rupees in total. The biggest gift was 8,000 rupees." Each of those sentences squeezes a whole pile of slips into one number. In SQL, the tools that do this squeezing are called aggregate functions.

## 🎯 What You Will Learn

- Count rows with `COUNT(*)`, `COUNT(column)` and `COUNT(DISTINCT column)`.
- Add up a column with `SUM`.
- Work out an average with `AVG` and tidy it with `ROUND`.
- Find the smallest and largest values with `MIN` and `MAX`.
- Combine several aggregates and a `WHERE` in one summary query.

---

## 🧮 The Five Aggregate Functions

| Function | Gives back | Example question |
| :--- | :--- | :--- |
| `COUNT()` | how many rows (or values) | How many students are there? |
| `SUM()` | the total of a number column | How much was donated? |
| `AVG()` | the average (mean) | What is the average GPA? |
| `MIN()` | the smallest or earliest value | Which book is shortest? |
| `MAX()` | the largest or latest value | When was the last gift? |

```
pages of 8 books
464, 320, 210, 288,
352, 180, 240, 120
        │
        ▼  MAX(pages)
       464   (one row, one value)
```

The **average** (or *mean*) is the total divided by how many values there are.

---

## 🔢 Counting with `COUNT`

```sql
SELECT COUNT(*) AS students FROM students;
```

| students |
| ---: |
| 8 |

`COUNT(*)` counts rows. Combine it with `WHERE` to count only some of them. How many books are still out?

```sql
SELECT COUNT(*) AS not_returned
FROM loans
WHERE returned = 'No';
```

| not_returned |
| ---: |
| 5 |

How many **different** cities do students come from?

```sql
SELECT COUNT(DISTINCT city) AS cities FROM students;
```

| cities |
| ---: |
| 4 |

### `COUNT(*)` vs `COUNT(column)`

`COUNT(column)` skips `NULL` values. Suppose Yusuf joins with no city (as in Chapter 9):

```sql
SELECT COUNT(*) AS rows_, COUNT(city) AS with_city FROM students;
```

| rows_ | with_city |
| ---: | ---: |
| 9 | 8 |

Nine students, but only eight have a city on record.

---

## ➕ Totals with `SUM`

```sql
SELECT SUM(amount) AS total FROM donations;
```

| total |
| ---: |
| 27500 |

Only the *Clean Water* cause:

```sql
SELECT SUM(amount) AS clean_water FROM donations
WHERE cause = 'Clean Water';
```

| clean_water |
| ---: |
| 15000 |

---

## ⚖️ Averages with `AVG` and `ROUND`

```sql
SELECT AVG(gpa) AS average_gpa FROM students;
```

| average_gpa |
| ---: |
| 3.668750 |

That is a lot of digits. `ROUND(value, 2)` keeps 2 decimal places:

```sql
SELECT ROUND(AVG(gpa), 2) AS average_gpa FROM students;
```

| average_gpa |
| ---: |
| 3.67 |

`AVG` ignores `NULL` values. A student with no GPA does not pull the average down to zero.

> 🧪 **Sandbox note:** MySQL prints `AVG(amount)` on donations as `3437.5000` (4 decimals). SQLite prints `3437.5`, and shows `AVG(gpa)` as `3.66875`. The value is the same; only the display differs.

---

## 📏 Smallest and Largest: `MIN` and `MAX`

```sql
SELECT MIN(pages) AS shortest, MAX(pages) AS longest FROM books;
```

| shortest | longest |
| ---: | ---: |
| 120 | 464 |

They work on dates too (earliest and latest):

```sql
SELECT MIN(donated_on) AS first_gift, MAX(donated_on) AS last_gift
FROM donations;
```

| first_gift | last_gift |
| :--- | :--- |
| 2026-09-01 | 2026-10-02 |

---

## 📊 A Summary Card in One Query

You can put several aggregates in one `SELECT`. Here is a library summary card:

```sql
SELECT COUNT(*)              AS books,
       SUM(pages)            AS total_pages,
       MIN(pages)            AS shortest,
       MAX(pages)            AS longest,
       ROUND(AVG(pages), 1)  AS average
FROM books;
```

| books | total_pages | shortest | longest | average |
| ---: | ---: | ---: | ---: | ---: |
| 8 | 2174 | 120 | 464 | 271.8 |

Aggregates also work after a join. How many loans were made by students from Lahore?

```sql
SELECT COUNT(*) AS lahore_loans
FROM loans l
JOIN students s ON l.student_id = s.id
WHERE s.city = 'Lahore';
```

| lahore_loans |
| ---: |
| 5 |

### When nothing matches

If `WHERE` keeps no rows, `COUNT` gives `0`, but `SUM`, `AVG`, `MIN` and `MAX` give `NULL` (there is nothing to add up):

```sql
SELECT COUNT(*) AS gifts, SUM(amount) AS total
FROM donations WHERE cause = 'Space Camp';
```

| gifts | total |
| ---: | ---: |
| 0 | NULL |

Use `COALESCE(SUM(amount), 0)` (Chapter 19) if you want `0` instead.

---

## ⚠️ Common Mistake

**Mistake 1: mixing a plain column with an aggregate.** "Who has the highest GPA?"

```sql
SELECT name, MAX(gpa) FROM students;
```

| name | MAX(gpa) |
| :--- | ---: |
| Zayd | 3.95 |

Wrong! Bilal has 3.95, not Zayd. `MAX` squeezes all rows into one, and MySQL just picks a name from some row. (Strict servers refuse this query instead.)

**Fixed version:** sort and take one row (Chapter 12):

```sql
SELECT name, gpa FROM students ORDER BY gpa DESC LIMIT 1;
```

| name | gpa |
| :--- | ---: |
| Bilal | 3.95 |

**Mistake 2: an aggregate inside `WHERE`.**

```sql
SELECT name FROM students WHERE gpa > AVG(gpa);
```

```
ERROR 1111 (HY000): Invalid use of group function
```

`WHERE` checks one row at a time, but `AVG` needs all rows. Chapter 24 shows the fix: a subquery.

---

## ✍️ Try It

In the [SQL Sandbox](../studios/sql-sandbox/), make a summary for the *Books* cause: number of gifts, total, and average rounded to a whole number.

*Hint: `COUNT(*)`, `SUM(amount)`, `ROUND(AVG(amount))` with `WHERE cause = 'Books'`. The total should be 5500.*

---

## 📝 Recap

- Aggregates turn many rows into one value.
- `COUNT(*)` counts rows; `COUNT(column)` skips `NULL`; `COUNT(DISTINCT column)` counts different values.
- `SUM` totals, `AVG` averages (use `ROUND` to tidy), `MIN`/`MAX` find extremes, also for dates.
- `WHERE` filters rows **before** they are summarised.
- Do not mix plain columns with aggregates (that needs `GROUP BY`, Chapter 21), and do not put aggregates in `WHERE`.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Name the five aggregate functions.
2. What is the difference between `COUNT(*)` and `COUNT(city)`?
3. What does `ROUND(AVG(gpa), 2)` do?

<details>
<summary>Show answer</summary>

1. `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`.
2. `COUNT(*)` counts every row. `COUNT(city)` counts only rows where `city` is not `NULL`.
3. It works out the average GPA and rounds it to 2 decimal places (3.67).

</details>

### 🟡 Level 2: Apply
1. Find the total amount given to the *Food Pantry* cause.
2. Find how many loans there are, the first loan date and the latest loan date.
3. Find the average number of pages of *Ethics* books.

<details>
<summary>Show answer</summary>

```sql
SELECT SUM(amount) FROM donations WHERE cause = 'Food Pantry';
-- 7000

SELECT COUNT(*) AS loans, MIN(loan_date) AS first, MAX(loan_date) AS latest
FROM loans;
-- 10 | 2026-09-02 | 2026-10-01

SELECT AVG(pages) FROM books WHERE category = 'Ethics';
-- 195.0000  (210 + 180 = 390, ÷ 2 = 195)
```

</details>

### 🔴 Level 3: Challenge
Build a "charity dashboard" query for the club noticeboard.

1. In one query, show the number of gifts, the total, the largest gift, the smallest gift, and the average rounded to whole rupees.
2. Explain why `SELECT donor, MAX(amount) FROM donations;` is **not** a safe way to find the biggest donor, and write a correct query.

<details>
<summary>Show one possible answer</summary>

```sql
SELECT COUNT(*)            AS gifts,
       SUM(amount)         AS total,
       MAX(amount)         AS largest,
       MIN(amount)         AS smallest,
       ROUND(AVG(amount))  AS average
FROM donations;
```

| gifts | total | largest | smallest | average |
| ---: | ---: | ---: | ---: | ---: |
| 8 | 27500 | 8000 | 1000 | 3438 |

2. `MAX(amount)` gives 8000, but `donor` comes from some row MySQL picks, not necessarily Yusuf's. Correct:

```sql
SELECT donor, amount FROM donations ORDER BY amount DESC LIMIT 1;
-- Yusuf | 8000
```

</details>
