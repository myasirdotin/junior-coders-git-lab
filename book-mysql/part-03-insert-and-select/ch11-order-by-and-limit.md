# Chapter 11: Sorting & Pagination — ORDER BY & LIMIT

> **Key Idea**: `ORDER BY` sorts the result: A to Z, smallest to largest, or oldest to newest (or the other way). `LIMIT` and `OFFSET` cut out one slice of rows, which is how websites show results page by page.

---

## 🌟 Real-Life Story

On prize day, the head teacher reads out the top three readers. First she sorts the reading list from most books to fewest. Then she reads only the first three names and stops. Sorting is `ORDER BY`. Stopping after three is `LIMIT 3`. Together they answer "who are the top three?" in one short query.

## 🎯 What You Will Learn

- Sort results with `ORDER BY`, ascending (`ASC`) or descending (`DESC`).
- Sort by two columns to break ties.
- Show only the first few rows with `LIMIT`.
- Skip rows with `OFFSET` to build page 1, page 2, page 3.
- Calculate the offset for any page number.

---

## ↕️ Why Sort?

Without `ORDER BY`, MySQL returns rows in whatever order is easiest for it. Often that looks like id order, but **it is not promised**. If the order matters to you, ask for it.

```sql
SELECT columns
FROM table_name
ORDER BY column [ASC | DESC];
```

- `ASC` (**ascending**): A → Z, small → large, old → new. This is the default.
- `DESC` (**descending**): Z → A, large → small, new → old.

---

## 🔤 Sorting Examples

### A to Z by name

```sql
SELECT name, city FROM students ORDER BY name;
```

| name | city |
| :--- | :--- |
| Aisha | Lahore |
| Bilal | Lahore |
| Fatima | Islamabad |
| Hamza | Peshawar |
| Khadija | Islamabad |
| Maryam | Karachi |
| Tariq | Karachi |
| Zayd | Lahore |

### Highest GPA first

```sql
SELECT name, gpa FROM students ORDER BY gpa DESC;
```

| name | gpa |
| :--- | ---: |
| Bilal | 3.95 |
| Zayd | 3.90 |
| Fatima | 3.85 |
| Maryam | 3.75 |
| Khadija | 3.70 |
| Tariq | 3.60 |
| Aisha | 3.40 |
| Hamza | 3.20 |

Remember: **DESC = largest first.**

### Two columns: break the ties

Several students share a grade. Sort by grade first, then by name inside each grade:

```sql
SELECT grade, name FROM students ORDER BY grade, name;
```

| grade | name |
| ---: | :--- |
| 7 | Aisha |
| 7 | Maryam |
| 8 | Fatima |
| 8 | Hamza |
| 8 | Zayd |
| 9 | Bilal |
| 9 | Khadija |
| 9 | Tariq |

Each column can have its own direction. Highest grade first, and the best GPA first inside each grade:

```sql
SELECT grade, name, gpa FROM students ORDER BY grade DESC, gpa DESC;
```

| grade | name | gpa |
| ---: | :--- | ---: |
| 9 | Bilal | 3.95 |
| 9 | Khadija | 3.70 |
| 9 | Tariq | 3.60 |
| 8 | Zayd | 3.90 |
| 8 | Fatima | 3.85 |
| 8 | Hamza | 3.20 |
| 7 | Maryam | 3.75 |
| 7 | Aisha | 3.40 |

### With `WHERE`

`WHERE` comes **before** `ORDER BY`. Clean Water gifts, largest first:

```sql
SELECT donor, amount FROM donations
WHERE cause = 'Clean Water'
ORDER BY amount DESC;
```

| donor | amount |
| :--- | ---: |
| Yusuf | 8000 |
| Sara | 5000 |
| Layla | 2000 |

---

## ✂️ Only the First Few: `LIMIT`

`LIMIT n` keeps the first *n* rows of the result. The three longest books:

```sql
SELECT title, pages FROM books
ORDER BY pages DESC
LIMIT 3;
```

| title | pages |
| :--- | ---: |
| Clean Code | 464 |
| Python Data Science | 352 |
| Algorithm Design | 320 |

The two newest donations:

```sql
SELECT donor, donated_on FROM donations
ORDER BY donated_on DESC
LIMIT 2;
```

| donor | donated_on |
| :--- | :--- |
| Layla | 2026-10-02 |
| Omar | 2026-09-26 |

Dates stored as `DATE` sort correctly by time, which is one reason Chapter 6 chose that type.

---

## 📄 Pages of Results: `LIMIT` with `OFFSET`

A website showing 100 books does not dump them all at once. It shows page 1, page 2, and so on. This is called **pagination**.

- `LIMIT` = how many rows per page.
- `OFFSET` = how many rows to skip first.

With 3 books per page:

```sql
-- Page 1: skip 0
SELECT id, title FROM books ORDER BY id LIMIT 3 OFFSET 0;
```

| id | title |
| ---: | :--- |
| 1 | Clean Code |
| 2 | Algorithm Design |
| 3 | Ethical Technology |

```sql
-- Page 2: skip 3
SELECT id, title FROM books ORDER BY id LIMIT 3 OFFSET 3;
```

| id | title |
| ---: | :--- |
| 4 | HTML & CSS Architecture |
| 5 | Python Data Science |
| 6 | Digital Stewardship |

```sql
-- Page 3: skip 6
SELECT id, title FROM books ORDER BY id LIMIT 3 OFFSET 6;
```

| id | title |
| ---: | :--- |
| 7 | Introduction to Networks |
| 8 | Arabic Calligraphy Basics |

Page 3 has only two rows, because there are only eight books.

### The page formula

**OFFSET = (page number − 1) × rows per page**

Page 3 with 3 per page: (3 − 1) × 3 = 6. ✔

MySQL also has a short form: `LIMIT 3, 3` means "skip 3, take 3". The first number is the offset. Many people find `LIMIT 3 OFFSET 3` easier to read.

> 🧪 **Sandbox note:** SQLite accepts both `LIMIT 3 OFFSET 3` and `LIMIT 3, 3`, so every query in this chapter runs in the sandbox.

---

## ⚠️ Common Mistake

**Mistake 1: `LIMIT` without `ORDER BY`.**

```sql
SELECT id, title FROM books LIMIT 3 OFFSET 3;
```

It may *look* right today. But without `ORDER BY` the row order is not promised. After rows are changed, page 2 might repeat a book from page 1 or skip one completely. **Fix:** always sort by something unique, such as `id`, when you paginate.

**Mistake 2: putting `ORDER BY` before `WHERE`.**

```sql
SELECT donor FROM donations ORDER BY amount WHERE cause = 'Books';
```

This gives `ERROR 1064`. The order of parts is fixed: `SELECT … FROM … WHERE … ORDER BY … LIMIT …`.

---

## ✍️ Try It

In the [SQL Sandbox](../studios/sql-sandbox/), find the **single shortest book** in the library. Show its title and pages.

*Hint: sort by `pages` from small to large and keep one row. The answer has 120 pages.*

---

## 📝 Recap

- Row order is not promised unless you use `ORDER BY`.
- `ASC` (default) = small to large; `DESC` = large to small.
- Sort by two columns to break ties, each with its own direction.
- `LIMIT n` keeps the first *n* rows; `OFFSET k` skips *k* rows first.
- Offset for a page = (page − 1) × rows per page; always paginate with `ORDER BY`.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which direction does `ORDER BY` use if you write neither `ASC` nor `DESC`?
2. What does `LIMIT 5` do?
3. How do you show the newest loans first?

<details>
<summary>Show answer</summary>

1. `ASC` (smallest or A first).
2. It keeps only the first 5 rows of the result.
3. `ORDER BY loan_date DESC`

</details>

### 🟡 Level 2: Apply
1. List all books from fewest pages to most.
2. Show the one book with the most pages.
3. Write the query for **page 4** of the book list with **12** books per page.

<details>
<summary>Show answer</summary>

```sql
SELECT title, pages FROM books ORDER BY pages;

SELECT title, pages FROM books ORDER BY pages DESC LIMIT 1;

SELECT id, title FROM books ORDER BY id LIMIT 12 OFFSET 36;
```

The second query returns *Clean Code* (464). For page 4: (4 − 1) × 12 = 36.

</details>

### 🔴 Level 3: Challenge
The school wants a "Students by City" page.

1. Sort students by city A to Z, and by name A to Z inside each city.
2. Show only the first 4 rows.
3. Write the query for the next 4 rows.
4. Explain what could go wrong if you left out `ORDER BY`.

<details>
<summary>Show one possible answer</summary>

```sql
SELECT name, city FROM students ORDER BY city, name LIMIT 4 OFFSET 0;
```

| name | city |
| :--- | :--- |
| Fatima | Islamabad |
| Khadija | Islamabad |
| Maryam | Karachi |
| Tariq | Karachi |

```sql
SELECT name, city FROM students ORDER BY city, name LIMIT 4 OFFSET 4;
```

| name | city |
| :--- | :--- |
| Aisha | Lahore |
| Bilal | Lahore |
| Zayd | Lahore |
| Hamza | Peshawar |

4. Without `ORDER BY`, the database may return rows in a different order on each run. A student could appear on both pages or on neither.

</details>
