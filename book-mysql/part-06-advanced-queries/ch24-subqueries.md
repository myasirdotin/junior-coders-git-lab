# Chapter 24: Introduction to Subqueries

> **Key Idea**: A subquery is a `SELECT` written inside another query, in brackets. The inner query runs first, and the outer query uses its answer.

---

## 🌟 Real-Life Story

The head teacher says: "Give a certificate to every student whose GPA is above the school average." The office helper cannot do this in one step. First she works out the average on a scrap of paper. Then she goes down the list and picks everyone above that number. A subquery puts that scrap-of-paper step **inside** the main query, so SQL does both steps for you.

## 🎯 What You Will Learn

- Explain what a subquery is and which part runs first.
- Compare a value with a one-number subquery (like an average).
- Use a list subquery with `IN` and `NOT IN`.
- Build a derived table: a subquery in `FROM`, with a name.
- Decide when a JOIN or a subquery reads more clearly.

---

## Why Subqueries?

In Chapter 20 this failed:

```sql
SELECT name FROM students WHERE gpa > AVG(gpa);
-- ERROR 1111: Invalid use of group function
```

We could do it in two steps by hand:

1. `SELECT ROUND(AVG(gpa), 2) FROM students;` → **3.67**
2. `SELECT name, gpa FROM students WHERE gpa > 3.67;`

But the number 3.67 is now typed into the query. When a new student joins, the real average changes and our query is out of date.

A **subquery** (or *inner query*) puts step 1 inside step 2:

```sql
SELECT name, gpa
FROM students
WHERE gpa > (SELECT AVG(gpa) FROM students)
ORDER BY gpa DESC;
```

| name | gpa |
| :--- | ---: |
| Bilal | 3.95 |
| Zayd | 3.90 |
| Fatima | 3.85 |
| Maryam | 3.75 |
| Khadija | 3.70 |

```
1. inner: SELECT AVG(gpa) ...
          → 3.66875
2. outer: WHERE gpa > 3.66875
          → 5 students
```

The brackets are required. The inner query is worked out first, and its answer drops into the outer query like a number you typed.

---

## One-Value Subqueries

A subquery that returns **one row and one column** can be used anywhere a single value fits: with `=`, `>`, `<` and so on.

The longest book in the library:

```sql
SELECT title, pages
FROM books
WHERE pages = (SELECT MAX(pages) FROM books);
```

| title | pages |
| :--- | ---: |
| Clean Code | 464 |

Gifts larger than the average gift:

```sql
SELECT donor, amount
FROM donations
WHERE amount > (SELECT AVG(amount) FROM donations)
ORDER BY amount DESC;
```

| donor | amount |
| :--- | ---: |
| Yusuf | 8000 |
| Sara | 5000 |
| Zainab | 4500 |

(The average is 3437.5, so Hafsa's 3000 is just below.)

---

## List Subqueries with `IN`

Sometimes the inner query returns **many** rows. Then use `IN` (Chapter 11), which checks "is the value somewhere in this list?"

Which students still have a book at home? The inner query lists their ids:

```sql
SELECT student_id FROM loans WHERE returned = 'No';
```

| student_id |
| ---: |
| 1 |
| 3 |
| 5 |
| 6 |
| 8 |

Put it inside:

```sql
SELECT name
FROM students
WHERE id IN (SELECT student_id FROM loans WHERE returned = 'No')
ORDER BY name;
```

| name |
| :--- |
| Aisha |
| Bilal |
| Khadija |
| Tariq |
| Zayd |

### `NOT IN`: who never borrowed?

```sql
SELECT id, name
FROM students
WHERE id NOT IN (SELECT student_id FROM loans);
```

| id | name |
| ---: | :--- |
| 7 | Hamza |

And books nobody has borrowed:

```sql
SELECT title FROM books
WHERE id NOT IN (SELECT book_id FROM loans);
```

| title |
| :--- |
| Arabic Calligraphy Basics |

These are the same answers as the `LEFT JOIN ... IS NULL` trick in Chapter 19, written in a different way.

> ⚠️ If the inner list ever contains a `NULL`, `NOT IN` returns **no rows at all**, because SQL cannot be sure the value is "not in" an unknown. Our `loans.student_id` has no `NULL`s. If yours might, add `WHERE student_id IS NOT NULL` inside the subquery.

---

## Subqueries in `FROM`: Derived Tables

So far the inner query gave us a number or a list. It can also give a whole **table**. You can then read from that table in the outer query, just like a real one.

Think of it as building a small table on a whiteboard first, then asking questions about the whiteboard.

### Step 1: build the small table

Totals per cause (Chapter 21):

```sql
SELECT cause, SUM(amount) AS total
FROM donations
GROUP BY cause;
```

| cause | total |
| :--- | ---: |
| Books | 5500 |
| Clean Water | 15000 |
| Food Pantry | 7000 |

### Step 2: put it in brackets, give it a name, and query it

```sql
SELECT t.cause, t.total
FROM (
    SELECT cause, SUM(amount) AS total
    FROM donations
    GROUP BY cause
) AS t
WHERE t.total > 6000
ORDER BY t.total DESC;
```

| cause | total |
| :--- | ---: |
| Clean Water | 15000 |
| Food Pantry | 7000 |

```
inner query → whiteboard table "t"
┌─────────────┬───────┐
│ cause       │ total │
│ Books       │  5500 │
│ Clean Water │ 15000 │
│ Food Pantry │  7000 │
└─────────────┴───────┘
outer query: FROM t WHERE total > 6000
```

This temporary table is called a **derived table** (it is *derived*, or made, from other data). Two rules:

1. It must be inside brackets.
2. It **must have a name** (`AS t`). The outer query needs a name to talk about it.

(You could also get this answer with `HAVING`. Derived tables shine when you need a second round of maths on top of a summary.)

### A second round of maths

"On average, how many books does a borrowing student take out?" First count loans per student, then average those counts:

```sql
SELECT ROUND(AVG(t.loans), 2) AS avg_loans
FROM (
    SELECT student_id, COUNT(*) AS loans
    FROM loans
    GROUP BY student_id
) AS t;
```

| avg_loans |
| ---: |
| 1.43 |

The inner table has 7 rows (counts 2, 1, 2, 1, 1, 1, 2). Their average is 10 ÷ 7 ≈ 1.43. You cannot write `AVG(COUNT(*))` directly, so the derived table does the first round.

> 🧪 **Sandbox note:** SQLite runs all subqueries in this chapter. It even lets you skip the `AS t` name, but MySQL does not, so always include it.

---

## Subqueries vs JOINs

Many questions can be answered either way. "Students with a book still out":

```sql
-- subquery
SELECT name FROM students
WHERE id IN (SELECT student_id FROM loans WHERE returned = 'No');

-- join
SELECT DISTINCT s.name
FROM students s
JOIN loans l ON l.student_id = s.id
WHERE l.returned = 'No';
```

Both return the same 5 names.

- A **subquery** reads like steps: "first find the ids, then the names".
- A **JOIN** is needed when you want to **show columns from both tables** (for example the book title too).
- Speed is often the same. Modern database engines frequently rewrite one form into the other. Choose the one that is clearest to read.

---

## ⚠️ Common Mistake

**Mistake 1: a one-value comparison with a many-row subquery.**

```sql
SELECT name FROM students
WHERE gpa > (SELECT gpa FROM students WHERE city = 'Lahore');
```

```
ERROR 1242 (21000): Subquery returns more than 1 row
```

Three Lahore students means three GPAs. `>` cannot compare with three numbers at once. **Fix:** make the inner query return one value, for example `(SELECT MAX(gpa) FROM students WHERE city = 'Lahore')`, or use `IN` if you meant "equal to one of them".

**Mistake 2: a derived table with no name.**

```sql
SELECT * FROM (SELECT cause, SUM(amount) AS total
               FROM donations GROUP BY cause)
WHERE total > 6000;
```

MariaDB answers `ERROR 1064 ... near 'WHERE total > 6000'`; MySQL 8 says `ERROR 1248: Every derived table must have its own alias`. **Fix:** add `AS t` after the closing bracket.

---

## ✍️ Try It

In the [SQL Sandbox](../studios/sql-sandbox/), list the books that are **longer than the average book**, longest first.

*Hint: `WHERE pages > (SELECT AVG(pages) FROM books)`. The average is 271.75, so you should get 4 books.*

---

## 📝 Recap

- A subquery is a `SELECT` inside brackets inside another query; the inner one runs first.
- A one-value subquery works with `=`, `>`, `<` (for example, above the average).
- A list subquery works with `IN` and `NOT IN`; watch out for `NULL` in `NOT IN`.
- A subquery in `FROM` is a derived table: it needs brackets and a name (`AS t`).
- Many questions can use a JOIN or a subquery; pick the clearer one.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. What is a subquery?
2. Which runs first: the inner or the outer query?
3. Which operator do you use when the subquery returns many rows?

<details>
<summary>Show answer</summary>

1. A `SELECT` query written in brackets inside another query.
2. The inner query.
3. `IN` (or `NOT IN`).

</details>

### 🟡 Level 2: Apply
1. List books with **fewer** pages than the average book.
2. List the titles of books that **Zayd** (student 1) has borrowed, using `IN`.

<details>
<summary>Show answer</summary>

```sql
SELECT title, pages FROM books
WHERE pages < (SELECT AVG(pages) FROM books)
ORDER BY pages;
```

| title | pages |
| :--- | ---: |
| Arabic Calligraphy Basics | 120 |
| Digital Stewardship | 180 |
| Ethical Technology | 210 |
| Introduction to Networks | 240 |

```sql
SELECT title FROM books
WHERE id IN (SELECT book_id FROM loans WHERE student_id = 1);
```

| title |
| :--- |
| Clean Code |
| Algorithm Design |

</details>

### 🔴 Level 3: Challenge
The charity club wants to praise every cause whose total is **above the average cause total**.

1. Write a derived table that gives each cause's total.
2. Use it twice: once to list the causes, and once inside a one-value subquery for the average total.
3. Predict the result.

<details>
<summary>Show one possible answer</summary>

```sql
SELECT t.cause, t.total
FROM (SELECT cause, SUM(amount) AS total
      FROM donations GROUP BY cause) AS t
WHERE t.total > (
    SELECT AVG(t2.total)
    FROM (SELECT cause, SUM(amount) AS total
          FROM donations GROUP BY cause) AS t2
);
```

The cause totals are 5500, 15000 and 7000. Their average is 27500 ÷ 3 ≈ 9166.67. Only one cause is above it:

| cause | total |
| :--- | ---: |
| Clean Water | 15000 |

</details>
