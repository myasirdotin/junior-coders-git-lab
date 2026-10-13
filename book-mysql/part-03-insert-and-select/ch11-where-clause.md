# Chapter 11: The WHERE Clause & Logical Filters

> **Key Idea**: `WHERE` is a filter. Only the rows that pass your test appear in the result. You can join tests with `AND`, `OR` and `NOT`, and use `BETWEEN`, `IN` and `IS NULL` for common checks.

---

## 🌟 Real-Life Story

At the end of the day, the librarian wants to phone only the students who still have a book at home. She does not call all eight students. She runs her finger down the borrowing list and stops only at rows marked "not returned". That finger is the `WHERE` clause: it lets through only the rows that match.

## 🎯 What You Will Learn

- Filter rows with `WHERE` and comparison signs like `=`, `>`, `!=`.
- Combine tests with `AND`, `OR` and `NOT`.
- Use brackets to control which test is checked first.
- Write ranges with `BETWEEN` and lists with `IN`.
- Find missing values with `IS NULL`.

---

## The Shape of `WHERE`

```sql
SELECT columns
FROM table_name
WHERE condition;
```

A **condition** is a test that is either true or false for each row. MySQL keeps the rows where it is true.

```sql
SELECT name, grade, city
FROM students
WHERE city = 'Lahore';
```

| name | grade | city |
| :--- | ---: | :--- |
| Zayd | 8 | Lahore |
| Bilal | 9 | Lahore |
| Aisha | 7 | Lahore |

Three of the eight students passed the test.

---

## Comparison Signs

| Sign | Meaning | Example |
| :--- | :--- | :--- |
| `=` | equal to | `WHERE grade = 9` |
| `!=` or `<>` | not equal to | `WHERE available != 'Yes'` |
| `>` / `<` | more than / less than | `WHERE pages > 300` |
| `>=` / `<=` | at least / at most | `WHERE gpa >= 3.8` |

Books with more than 300 pages:

```sql
SELECT title, pages FROM books WHERE pages > 300;
```

| title | pages |
| :--- | ---: |
| Clean Code | 464 |
| Algorithm Design | 320 |
| Python Data Science | 352 |

Books that are not on the shelf:

```sql
SELECT title, available FROM books WHERE available != 'Yes';
```

| title | available |
| :--- | :--- |
| Ethical Technology | No |
| Python Data Science | No |

Text values need quotes (`'Yes'`). Numbers do not (`300`).

---

## `AND`, `OR`, `NOT`

### `AND`: both tests must be true

Grade 8 students with a GPA of at least 3.8:

```sql
SELECT name, grade, gpa
FROM students
WHERE grade = 8 AND gpa >= 3.8;
```

| name | grade | gpa |
| :--- | ---: | ---: |
| Zayd | 8 | 3.90 |
| Fatima | 8 | 3.85 |

Hamza is in Grade 8 too, but his GPA (3.20) fails the second test.

### `OR`: at least one test must be true

```sql
SELECT name, city
FROM students
WHERE city = 'Karachi' OR city = 'Peshawar';
```

| name | city |
| :--- | :--- |
| Maryam | Karachi |
| Tariq | Karachi |
| Hamza | Peshawar |

### `NOT`: flip the test

```sql
SELECT name, grade FROM students WHERE NOT grade = 9;
```

| name | grade |
| :--- | ---: |
| Zayd | 8 |
| Maryam | 7 |
| Fatima | 8 |
| Aisha | 7 |
| Hamza | 8 |

---

## `BETWEEN` and `IN`

### `BETWEEN`: a range, ends included

```sql
SELECT donor, amount
FROM donations
WHERE amount BETWEEN 2000 AND 4500;
```

| donor | amount |
| :--- | ---: |
| Ibrahim | 2500 |
| Hafsa | 3000 |
| Zainab | 4500 |
| Layla | 2000 |

Layla (2000) and Zainab (4500) are included, because `BETWEEN` includes both ends. It means the same as `amount >= 2000 AND amount <= 4500`.

`BETWEEN` works for dates too:

```sql
SELECT donor, donated_on
FROM donations
WHERE donated_on BETWEEN '2026-09-10' AND '2026-09-30';
```

| donor | donated_on |
| :--- | :--- |
| Hafsa | 2026-09-12 |
| Yusuf | 2026-09-18 |
| Zainab | 2026-09-21 |
| Omar | 2026-09-26 |

### `IN`: matches any value in a list

```sql
SELECT title, category
FROM books
WHERE category IN ('Ethics', 'Art');
```

| title | category |
| :--- | :--- |
| Ethical Technology | Ethics |
| Digital Stewardship | Ethics |
| Arabic Calligraphy Basics | Art |

`IN ('Ethics', 'Art')` is a shorter way to write `category = 'Ethics' OR category = 'Art'`.

---

## Missing Values: `IS NULL`

`NULL` means "no value" or "unknown". It is not zero and not empty text.

Suppose we add a new student, Yusuf, without a city (as in Chapter 9). Now try:

```sql
SELECT name, city FROM students WHERE city = NULL;
```

```
Empty set
```

No rows! Nothing is ever "equal" to unknown, not even another unknown. Use `IS NULL` instead:

```sql
SELECT name, city FROM students WHERE city IS NULL;
```

| name | city |
| :--- | :--- |
| Yusuf | NULL |

And `IS NOT NULL` finds rows that do have a value.

---

## ⚠️ Common Mistake

**Mistake: mixing `AND` and `OR` without brackets.**

We want Grade 7 **or** Grade 9 students who live in Lahore:

```sql
SELECT name, grade, city FROM students
WHERE grade = 7 OR grade = 9 AND city = 'Lahore';
```

| name | grade | city |
| :--- | ---: | :--- |
| Maryam | 7 | Karachi |
| Bilal | 9 | Lahore |
| Aisha | 7 | Lahore |

Maryam lives in Karachi, so why is she here? `AND` is checked **before** `OR`, like × before + in maths. MySQL read it as: *grade 7* OR *(grade 9 AND Lahore)*.

**Fixed version:** put brackets around the `OR` part.

```sql
SELECT name, grade, city FROM students
WHERE (grade = 7 OR grade = 9) AND city = 'Lahore';
```

| name | grade | city |
| :--- | ---: | :--- |
| Bilal | 9 | Lahore |
| Aisha | 7 | Lahore |

---

## ✍️ Try It

In the [SQL Sandbox](../studios/sql-sandbox/), find every loan where the book has **not** been returned. Show `student_id`, `book_id` and `loan_date`.

*Hint: the `returned` column holds `'Yes'` or `'No'`. You should get 5 rows.*

---

## 📝 Recap

- `WHERE condition` keeps only the rows where the condition is true.
- Compare with `=`, `!=`, `<`, `>`, `<=`, `>=`; quote text, not numbers.
- `AND` needs both tests; `OR` needs at least one; `NOT` flips a test.
- `AND` runs before `OR`, so use brackets when you mix them.
- `BETWEEN` includes both ends; `IN` checks a list; use `IS NULL`, never `= NULL`.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which clause filters rows in a `SELECT`?
2. How do you find rows where a column has no value?
3. What is the difference between `AND` and `OR`?

<details>
<summary>Show answer</summary>

1. `WHERE`
2. `WHERE column IS NULL`
3. `AND` keeps a row only if both tests are true. `OR` keeps it if at least one is true.

</details>

### 🟡 Level 2: Apply
Using `books`, write a query for each:
1. Books with fewer than 250 pages.
2. Books in the *Computer Science* category that are available.
3. Books with 200 to 300 pages (ends included).

<details>
<summary>Show answer</summary>

```sql
SELECT title, pages FROM books WHERE pages < 250;
SELECT title FROM books WHERE category = 'Computer Science' AND available = 'Yes';
SELECT title, pages FROM books WHERE pages BETWEEN 200 AND 300;
```

1. Ethical Technology (210), Digital Stewardship (180), Introduction to Networks (240), Arabic Calligraphy Basics (120).
2. Algorithm Design, Introduction to Networks.
3. Ethical Technology (210), HTML & CSS Architecture (288), Introduction to Networks (240).

</details>

### 🔴 Level 3: Challenge
The charity club wants a list of gifts for the *Books* or *Food Pantry* causes that were **more than 2000** rupees.

1. Write the query with `OR` and brackets.
2. Rewrite it with `IN`.
3. Predict the result rows.

<details>
<summary>Show one possible answer</summary>

```sql
SELECT donor, cause, amount FROM donations
WHERE (cause = 'Books' OR cause = 'Food Pantry') AND amount > 2000;

SELECT donor, cause, amount FROM donations
WHERE cause IN ('Books', 'Food Pantry') AND amount > 2000;
```

| donor | cause | amount |
| :--- | :--- | ---: |
| Ibrahim | Food Pantry | 2500 |
| Hafsa | Books | 3000 |
| Zainab | Food Pantry | 4500 |

</details>
