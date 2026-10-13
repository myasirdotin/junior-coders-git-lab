# Chapter 17: The INNER JOIN in Depth

> **Key Idea**: An `INNER JOIN` keeps only rows that have a match in **both** tables. A row with no partner on the other side is left out of the result.

---

## 🌟 Real-Life Story

The librarian wants to send a thank-you card to every student who has borrowed at least one book. She lays the student register beside the borrowing notebook and only writes cards where a name appears in both. Hamza has never borrowed a book, so he gets no card this time. The new calligraphy book has never been borrowed, so it is not mentioned. Only the matches count. That is an inner join.

## 🎯 What You Will Learn

- Explain which rows an `INNER JOIN` keeps and which it drops.
- See why one row can appear several times after a join.
- Join three or four tables in a chain.
- Filter and sort joined results with `WHERE` and `ORDER BY`.
- Use `DISTINCT` to remove repeats in a joined result.

---

## 🎯 Only the Matches

<div align="center" style="margin: 2rem 0;">
  <img src="../assets/diagrams/mysql/sql-joins-visual.svg" alt="SQL JOINs Visualized" style="max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
</div>

In the picture, an `INNER JOIN` is the shaded middle: the part where both circles overlap.

`JOIN` and `INNER JOIN` mean exactly the same thing in MySQL. Writing `INNER` makes your meaning clearer to readers.

```
students             loans
┌───────────┐        ┌──────────────┐
│ 1 Zayd    │──match─│ student 1 ×2 │
│ 2 Maryam  │──match─│ student 2    │
│ ...       │        │ ...          │
│ 7 Hamza   │   ✗    │ (none)       │
└───────────┘        └──────────────┘
Hamza has no partner → left out
```

---

## 👀 Watching Rows Appear and Disappear

```sql
SELECT s.id, s.name, l.book_id
FROM students s
INNER JOIN loans l ON l.student_id = s.id
ORDER BY s.id;
```

| id | name | book_id |
| ---: | :--- | ---: |
| 1 | Zayd | 1 |
| 1 | Zayd | 2 |
| 2 | Maryam | 4 |
| 3 | Bilal | 2 |
| 3 | Bilal | 7 |
| 4 | Fatima | 6 |
| 5 | Tariq | 3 |
| 6 | Aisha | 1 |
| 8 | Khadija | 5 |
| 8 | Khadija | 6 |

Two things to notice:

1. **Hamza (id 7) is missing.** He has no loans, so there is nothing to match.
2. **Zayd, Bilal and Khadija appear twice.** Each has two loans, and every match makes its own row.

The same is true on the books side. *Arabic Calligraphy Basics* (book 8) has never been borrowed, so an inner join of `books` with `loans` will never show it. (Chapter 18 shows how to find such "missing" rows.)

---

## 🔍 Join, Then Filter

`WHERE` can test columns from **any** joined table. Which books are still out, and who has them?

```sql
SELECT s.name AS student, b.title AS book, l.loan_date
FROM loans l
INNER JOIN students s ON l.student_id = s.id
INNER JOIN books b    ON l.book_id = b.id
WHERE l.returned = 'No'
ORDER BY l.loan_date;
```

| student | book | loan_date |
| :--- | :--- | :--- |
| Tariq | Ethical Technology | 2026-09-12 |
| Zayd | Algorithm Design | 2026-09-20 |
| Bilal | Introduction to Networks | 2026-09-25 |
| Aisha | Clean Code | 2026-09-28 |
| Khadija | Digital Stewardship | 2026-10-01 |

This is the librarian's reminder list, oldest loan first.

Filter on the book's category instead: who borrowed *Computer Science* books?

```sql
SELECT b.title, s.name
FROM books b
INNER JOIN loans l    ON l.book_id = b.id
INNER JOIN students s ON s.id = l.student_id
WHERE b.category = 'Computer Science'
ORDER BY b.title, s.name;
```

| title | name |
| :--- | :--- |
| Algorithm Design | Bilal |
| Algorithm Design | Zayd |
| Introduction to Networks | Bilal |

The order of the `ON` sides does not matter: `s.id = l.student_id` means the same as `l.student_id = s.id`.

---

## 🔗 A Chain of Four Tables

Each extra `INNER JOIN` adds one more table to the chain. To connect four tables you need three joins. Here we go from a loan to the student, the book **and** the student's class:

```sql
SELECT s.name, b.title, c.name AS class
FROM loans l
INNER JOIN students s ON l.student_id = s.id
INNER JOIN books b    ON l.book_id = b.id
INNER JOIN classes c  ON s.class_id = c.id
WHERE c.name = 'Grade 9 Hawks'
ORDER BY s.name, b.title;
```

| name | title | class |
| :--- | :--- | :--- |
| Bilal | Algorithm Design | Grade 9 Hawks |
| Bilal | Introduction to Networks | Grade 9 Hawks |
| Khadija | Digital Stewardship | Grade 9 Hawks |
| Khadija | Python Data Science | Grade 9 Hawks |
| Tariq | Ethical Technology | Grade 9 Hawks |

Follow the links like stepping stones:

```
loans ──student_id──► students
  │                      │
book_id               class_id
  ▼                      ▼
books                 classes
```

---

## 🧹 Removing Repeats After a Join

Which students have read an *Ethics* book, and who is their teacher? Khadija borrowed *Digital Stewardship* once, but if she had borrowed two Ethics books she would appear twice. `DISTINCT` (Chapter 9) keeps each pair once:

```sql
SELECT DISTINCT s.name, c.teacher
FROM loans l
JOIN students s ON l.student_id = s.id
JOIN classes c  ON s.class_id = c.id
JOIN books b    ON l.book_id = b.id
WHERE b.category = 'Ethics';
```

| name | teacher |
| :--- | :--- |
| Fatima | Mr. Imran |
| Tariq | Ms. Noor |
| Khadija | Ms. Noor |

> 🧪 **Sandbox note:** All queries in this chapter run unchanged in the SQL Sandbox. The sandbox tables have no declared foreign keys, but joins only need matching values, not declared keys.

---

## ⚠️ Common Mistake

**Mistake: expecting everyone to appear.**

A teacher asks for "a list of all students and the books they borrowed". A student writes an inner join and sends it. Hamza is missing, and nobody notices that he has borrowed nothing, which was exactly what the teacher wanted to know.

**Fix:** when the question says "**all** students", an inner join is the wrong tool. Use a `LEFT JOIN` (Chapter 18), which keeps every student.

**Mistake: joining on the wrong columns.**

```sql
... JOIN books b ON l.student_id = b.id
```

MySQL does not complain: both are numbers. But it pairs student numbers with book numbers, and the results are nonsense. **Fix:** always match a foreign key with the primary key it points to: `l.book_id = b.id`.

---

## ✍️ Try It

In the [SQL Sandbox](../studios/sql-sandbox/), list every loan made by a student from **Lahore**: student name, book title and loan date, newest first.

*Hint: join `loans`, `students` and `books`, then `WHERE s.city = 'Lahore'`. You should get 5 rows.*

---

## 📝 Recap

- `INNER JOIN` (or just `JOIN`) keeps only rows that match on both sides.
- Rows with no partner (Hamza, book 8) disappear from the result.
- A row matching several partners appears several times.
- Chain joins one table at a time; four tables need three joins.
- `WHERE`, `ORDER BY` and `DISTINCT` work on joined results as usual.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. A student has no loans. Will they appear in `students INNER JOIN loans`?
2. A book has never been borrowed. Will it appear in `books INNER JOIN loans`?
3. How many joins do you need to connect four tables?

<details>
<summary>Show answer</summary>

1. No. There is nothing to match.
2. No, for the same reason.
3. Three.

</details>

### 🟡 Level 2: Apply
List every loan with the student's name, the book title and the class teacher, only for books that **have been returned**. Sort by student name.

<details>
<summary>Show answer</summary>

```sql
SELECT s.name, b.title, c.teacher
FROM loans l
INNER JOIN students s ON l.student_id = s.id
INNER JOIN books b    ON l.book_id = b.id
INNER JOIN classes c  ON s.class_id = c.id
WHERE l.returned = 'Yes'
ORDER BY s.name;
```

| name | title | teacher |
| :--- | :--- | :--- |
| Bilal | Algorithm Design | Ms. Noor |
| Fatima | Digital Stewardship | Mr. Imran |
| Khadija | Python Data Science | Ms. Noor |
| Maryam | HTML & CSS Architecture | Ms. Hafsa |
| Zayd | Clean Code | Mr. Imran |

</details>

### 🔴 Level 3: Challenge
Ms. Noor wants to know which **books** her Grade 9 Hawks have borrowed, each title listed once, A to Z.

1. Decide which tables you need and how they link.
2. Write the query.
3. Explain why `DISTINCT` matters here.

<details>
<summary>Show one possible answer</summary>

1. `classes` → `students` (by `class_id`) → `loans` (by `student_id`) → `books` (by `book_id`).
2.
```sql
SELECT DISTINCT b.title
FROM classes c
INNER JOIN students s ON s.class_id = c.id
INNER JOIN loans l    ON l.student_id = s.id
INNER JOIN books b    ON l.book_id = b.id
WHERE c.teacher = 'Ms. Noor'
ORDER BY b.title;
```

| title |
| :--- |
| Algorithm Design |
| Digital Stewardship |
| Ethical Technology |
| Introduction to Networks |
| Python Data Science |

3. If two Hawks borrowed the same book, it would appear twice. `DISTINCT` keeps each title once.

</details>
