# Chapter 18: LEFT JOIN, RIGHT JOIN & Finding Missing Records

> **Key Idea**: A `LEFT JOIN` keeps **every** row from the left table, even when the right table has no match. The missing values show as `NULL`. This also lets you find things that never happened, such as books nobody has borrowed.

---

## 🌟 Real-Life Story

At the end of term, the head teacher asks for a reading report on **every** student, not just the ones who borrowed books. The librarian copies the whole register first. Then, next to each name, she writes the books borrowed. Next to Hamza's name she writes a dash, because he borrowed nothing. Nobody is left off the report. That dash is `NULL`, and the report is a `LEFT JOIN`.

## 🎯 What You Will Learn

- Explain how `LEFT JOIN` differs from `INNER JOIN`.
- Read `NULL` values in a joined result.
- Replace `NULL` with a friendly label using `COALESCE`.
- Find "missing" rows with `LEFT JOIN ... WHERE ... IS NULL`.
- Know what `RIGHT JOIN` does and why most people flip it into a `LEFT JOIN`.

---

## 🤔 When INNER JOIN Is Not Enough

In Chapter 17, the inner join of `students` and `loans` dropped Hamza, because he has no loans. For a report on "all students" that is wrong.

A **`LEFT JOIN`** (full name `LEFT OUTER JOIN`) keeps every row of the table written **before** the word `JOIN` (the *left* table). If there is no match on the right, the right side's columns are filled with `NULL`.

```
students (left)       loans (right)
┌───────────┐         ┌──────────────┐
│ 1 Zayd    │──match──│ book 1, 2    │
│ 7 Hamza   │──none───│ NULL         │
│ 8 Khadija │──match──│ book 5, 6    │
└───────────┘         └──────────────┘
every student is kept
```

---

## 📋 A LEFT JOIN Step by Step

```sql
SELECT s.id, s.name, l.book_id, l.loan_date
FROM students s
LEFT JOIN loans l ON l.student_id = s.id
ORDER BY s.id, l.loan_date;
```

| id | name | book_id | loan_date |
| ---: | :--- | ---: | :--- |
| 1 | Zayd | 1 | 2026-09-02 |
| 1 | Zayd | 2 | 2026-09-20 |
| 2 | Maryam | 4 | 2026-09-05 |
| 3 | Bilal | 2 | 2026-09-08 |
| 3 | Bilal | 7 | 2026-09-25 |
| 4 | Fatima | 6 | 2026-09-10 |
| 5 | Tariq | 3 | 2026-09-12 |
| 6 | Aisha | 1 | 2026-09-28 |
| 7 | Hamza | NULL | NULL |
| 8 | Khadija | 5 | 2026-09-15 |
| 8 | Khadija | 6 | 2026-10-01 |

All eight students appear. Hamza is there, with `NULL` where his loan details would be. Students with two loans still appear twice, just like in an inner join.

---

## 🏷️ Friendly Labels with `COALESCE`

`NULL` looks unfriendly on a report. `COALESCE(a, b)` gives back `a` if it has a value, otherwise `b`. (It returns the first value in its list that is not `NULL`.)

```sql
SELECT s.name, COALESCE(l.loan_date, 'No loans yet') AS loan_date
FROM students s
LEFT JOIN loans l ON l.student_id = s.id
WHERE s.id IN (6, 7)
ORDER BY s.id;
```

| name | loan_date |
| :--- | :--- |
| Aisha | 2026-09-28 |
| Hamza | No loans yet |

---

## 🕵️ Finding What Is Missing

This is the most useful trick in the chapter. After a `LEFT JOIN`, the rows with **no match** are exactly the rows where the right side is `NULL`. So filter for them.

### Students who have never borrowed a book

```sql
SELECT s.id, s.name
FROM students s
LEFT JOIN loans l ON l.student_id = s.id
WHERE l.id IS NULL;
```

| id | name |
| ---: | :--- |
| 7 | Hamza |

The librarian could invite Hamza to choose his first book.

### Books that have never been borrowed

```sql
SELECT b.id, b.title
FROM books b
LEFT JOIN loans l ON l.book_id = b.id
WHERE l.id IS NULL;
```

| id | title |
| ---: | :--- |
| 8 | Arabic Calligraphy Basics |

This pattern is often called an **anti-join**: "rows in A with **no** partner in B". We test `l.id`, the right table's primary key, because it is never `NULL` in a real loan row. If it is `NULL`, there was no match.

---

## ↔️ What About `RIGHT JOIN`?

A `RIGHT JOIN` keeps every row of the **right** table instead. These two queries give the same rows:

```sql
-- right join: keep every book
SELECT b.title, l.id
FROM loans l
RIGHT JOIN books b ON l.book_id = b.id
WHERE l.id IS NULL;

-- the same idea as a left join: just swap the tables
SELECT b.title, l.id
FROM books b
LEFT JOIN loans l ON l.book_id = b.id
WHERE l.id IS NULL;
```

| title | id |
| :--- | ---: |
| Arabic Calligraphy Basics | NULL |

Most developers use `LEFT JOIN` only. Reading "keep everything from the first table I name" is easier than switching sides in your head.

> 🧪 **Sandbox note:** SQLite supports `RIGHT JOIN` only from version 3.39. If your tool rejects it, swap the two tables and use `LEFT JOIN`, as shown above. `COALESCE` and `LEFT JOIN` work everywhere.

---

## ⚠️ Common Mistake

**Mistake: a `WHERE` on the right table turns a LEFT JOIN back into an INNER JOIN.**

We want every student, plus the book they still have at home (if any):

```sql
SELECT s.name, l.book_id
FROM students s
LEFT JOIN loans l ON l.student_id = s.id
WHERE l.returned = 'No'
ORDER BY s.id;
```

| name | book_id |
| :--- | ---: |
| Zayd | 2 |
| Bilal | 7 |
| Tariq | 3 |
| Aisha | 1 |
| Khadija | 6 |

Maryam, Fatima and Hamza vanished. For them `l.returned` is `NULL` (or `'Yes'`), and `NULL = 'No'` is not true, so `WHERE` threw them out.

**Fixed version:** move the test into the `ON` part. Then it decides which loans *match*, without removing students:

```sql
SELECT s.name, l.book_id
FROM students s
LEFT JOIN loans l ON l.student_id = s.id AND l.returned = 'No'
ORDER BY s.id;
```

| name | book_id |
| :--- | ---: |
| Zayd | 2 |
| Maryam | NULL |
| Bilal | 7 |
| Fatima | NULL |
| Tariq | 3 |
| Aisha | 1 |
| Hamza | NULL |
| Khadija | 6 |

The one exception is `WHERE right_table.id IS NULL`, which you add on purpose to find missing rows.

---

## ✍️ Try It

In the [SQL Sandbox](../studios/sql-sandbox/), list **every book** with the name of each student who borrowed it. Books nobody borrowed should still appear, with `'Not borrowed yet'` instead of a name.

*Hint: `books b LEFT JOIN loans l ... LEFT JOIN students s ...`, and `COALESCE(s.name, 'Not borrowed yet')`. You should get 11 rows.*

---

## 📝 Recap

- `LEFT JOIN` keeps every row of the left table; unmatched right columns become `NULL`.
- `COALESCE(value, fallback)` swaps a `NULL` for a friendly label.
- `LEFT JOIN ... WHERE right.id IS NULL` finds rows with no partner (an anti-join).
- `RIGHT JOIN` keeps every row of the right table; swapping tables into a `LEFT JOIN` is usually clearer.
- Put tests on the right table in `ON`, not `WHERE`, or the extra rows disappear.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. What does a `LEFT JOIN` do with a left-table row that has no match?
2. What value fills the right-table columns in that case?
3. What does `COALESCE` do?

<details>
<summary>Show answer</summary>

1. It keeps the row anyway.
2. `NULL`.
3. It returns the first value in its list that is not `NULL`, for example `COALESCE(name, 'Unknown')`.

</details>

### 🟡 Level 2: Apply
Write a query that finds every **class** that has no students. Then predict the result on our data.

<details>
<summary>Show answer</summary>

```sql
SELECT c.id, c.name
FROM classes c
LEFT JOIN students s ON s.class_id = c.id
WHERE s.id IS NULL;
```

On our data every class has students, so the result is `Empty set`. If a new class "Grade 6 Doves" were added with no students, it would appear.

</details>

### 🔴 Level 3: Challenge
The library wants an "every book" report.

1. Show every book title and the borrower's name, with `'Not borrowed yet'` for books with no loans. Sort by book id.
2. Explain why an `INNER JOIN` would give the wrong report.
3. Explain why this report is useful for the library (think about which books to promote).

<details>
<summary>Show one possible answer</summary>

```sql
SELECT b.title, COALESCE(s.name, 'Not borrowed yet') AS borrower
FROM books b
LEFT JOIN loans l    ON l.book_id = b.id
LEFT JOIN students s ON l.student_id = s.id
ORDER BY b.id;
```

The result has 11 rows. The last one is `Arabic Calligraphy Basics | Not borrowed yet`. (Books borrowed twice, like *Clean Code*, appear twice.)

2. An `INNER JOIN` drops *Arabic Calligraphy Basics*, the very book the librarian needs to notice.
3. Books nobody borrows may need a display, a mention in assembly, or a reading club, so the library's money is well used.

</details>
