# Chapter 16: What is a JOIN? — Combining Tables

> **Key Idea**: Chapter 15 split our data into linked tables. A `JOIN` puts the pieces back together inside one query result, using the links. The stored tables do not change.

---

## 🌟 Real-Life Story

A loan slip says only "student 1, book 2". The librarian wants to print a friendly reminder: *"Zayd, please return Algorithm Design."* So she puts the slip next to the student register and finds number 1, then next to the catalogue and finds number 2. Matching numbers across lists like this is exactly what a `JOIN` does, only much faster.

## 🎯 What You Will Learn

- Explain why we need `JOIN` after splitting data into tables.
- Write a `JOIN ... ON` that matches a foreign key to a primary key.
- Name columns clearly with `table.column` and short table aliases.
- Join three tables in one query.
- Explain what goes wrong if you forget the `ON` condition.

---

## 🧩 Putting the Pieces Back Together

`school_db` stores each fact once:

- `students` holds names and a `class_id`.
- `classes` holds class names and teachers.
- `loans` holds only numbers: `student_id`, `book_id`.

That is tidy, but a loan row like `(2, 1, 2, '2026-09-20', 'No')` is hard for a person to read. A **JOIN** builds a result that combines columns from two or more tables, row by matching row.

<div align="center" style="margin: 2rem 0;">
  <img src="../assets/diagrams/mysql/sql-joins-visual.svg" alt="SQL JOINs Visualized" style="max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
</div>

The picture shows three kinds of join. This chapter uses the plain `JOIN`, which keeps only rows that match on both sides. Chapter 17 looks at it closely (its full name is `INNER JOIN`), and Chapter 18 covers `LEFT` and `RIGHT` joins.

---

## 🔗 The Shape of a JOIN

Every join needs two things:

1. **Which table to join**: `JOIN second_table`
2. **How rows match**: `ON first.foreign_key = second.id`

```sql
SELECT students.name, classes.name, classes.teacher
FROM students
JOIN classes ON students.class_id = classes.id
ORDER BY students.id;
```

| name | name | teacher |
| :--- | :--- | :--- |
| Zayd | Grade 8 Eagles | Mr. Imran |
| Maryam | Grade 7 Falcons | Ms. Hafsa |
| Bilal | Grade 9 Hawks | Ms. Noor |
| Fatima | Grade 8 Eagles | Mr. Imran |
| Tariq | Grade 9 Hawks | Ms. Noor |
| Aisha | Grade 7 Falcons | Ms. Hafsa |
| Hamza | Grade 8 Eagles | Mr. Imran |
| Khadija | Grade 9 Hawks | Ms. Noor |

How MySQL thinks about it, for Zayd:

```
students row: Zayd, class_id = 2
                       │
                       ▼ ON class_id = id
classes row:  id = 2, Grade 8 Eagles,
              Mr. Imran
                       │
                       ▼
result row:   Zayd | Grade 8 Eagles |
              Mr. Imran
```

Writing `students.name` (table name, dot, column name) tells MySQL exactly which `name` you mean. Both tables have a `name` column!

---

## ✂️ Short Names: Table Aliases

Typing `students.` and `classes.` again and again is tiring. Give each table a short **alias** right after its name:

```sql
SELECT s.name AS student, c.name AS class, c.teacher
FROM students s
JOIN classes c ON s.class_id = c.id
WHERE c.teacher = 'Ms. Noor';
```

| student | class | teacher |
| :--- | :--- | :--- |
| Bilal | Grade 9 Hawks | Ms. Noor |
| Tariq | Grade 9 Hawks | Ms. Noor |
| Khadija | Grade 9 Hawks | Ms. Noor |

- `students s` means "call `students` **s** in this query".
- Column aliases with `AS` (Chapter 9) fix the confusing double `name` heading.
- `WHERE` and `ORDER BY` work after a join exactly as before.

---

## 🔗 Three Tables: Who Borrowed What?

A loan links a student **and** a book, so we join three tables. Start from `loans` and join each parent:

```sql
SELECT s.name AS student, b.title AS book, l.loan_date
FROM loans l
JOIN students s ON l.student_id = s.id
JOIN books b    ON l.book_id = b.id
ORDER BY l.loan_date;
```

| student | book | loan_date |
| :--- | :--- | :--- |
| Zayd | Clean Code | 2026-09-02 |
| Maryam | HTML & CSS Architecture | 2026-09-05 |
| Bilal | Algorithm Design | 2026-09-08 |
| Fatima | Digital Stewardship | 2026-09-10 |
| Tariq | Ethical Technology | 2026-09-12 |
| Khadija | Python Data Science | 2026-09-15 |
| Zayd | Algorithm Design | 2026-09-20 |
| Bilal | Introduction to Networks | 2026-09-25 |
| Aisha | Clean Code | 2026-09-28 |
| Khadija | Digital Stewardship | 2026-10-01 |

Now the loan list reads like sentences. The `loans` table itself still holds only numbers.

---

## 💥 Forgetting `ON`: Every Row Times Every Row

What if you leave out the `ON` part?

```sql
SELECT s.name, c.name
FROM students s
JOIN classes c;
```

MySQL pairs **every** student with **every** class. This is called a **cross join** (or *Cartesian product*). The first rows look like this:

| name | name |
| :--- | :--- |
| Zayd | Grade 7 Falcons |
| Zayd | Grade 8 Eagles |
| Zayd | Grade 9 Hawks |
| Maryam | Grade 7 Falcons |
| Maryam | Grade 8 Eagles |
| Maryam | Grade 9 Hawks |

8 students × 3 classes = **24 rows**, and most of them are false: Zayd is not in three classes! With 1,000 students and 50 classes you would get 50,000 nonsense rows.

There are rare real uses for a cross join (for example, listing every student with every club to plan a timetable). Then write `CROSS JOIN` on purpose so readers know you meant it.

> 🧪 **Sandbox note:** Every query in this chapter runs the same way in the SQL Sandbox (SQLite).

---

## ⚠️ Common Mistake

**Mistake: an unclear column name.**

```sql
SELECT id, name
FROM students
JOIN classes ON students.class_id = classes.id;
```

```
ERROR 1052 (23000): Column 'id' in field list is ambiguous
```

**Ambiguous** means "could mean two things". Both tables have `id` (and `name`).

**Fixed version:** say which table each column comes from.

```sql
SELECT students.id, students.name
FROM students
JOIN classes ON students.class_id = classes.id;
```

---

## ✍️ Try It

In the [SQL Sandbox](../studios/sql-sandbox/), show each book that is **not yet returned**, with the borrower's name. Columns: `student`, `book`.

*Hint: start from the three-table query above and add `WHERE l.returned = 'No'`. You should get 5 rows.*

---

## 📝 Recap

- A `JOIN` combines rows from linked tables in a result; stored tables do not change.
- Write `JOIN other_table ON child.foreign_key = parent.id`.
- Use `table.column` or short aliases (`students s`) to avoid ambiguous names.
- Chain joins to combine three or more tables.
- Without `ON`, every row pairs with every row (a cross join), giving wrong, huge results.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Why do we need `JOIN` in a database that uses foreign keys?
2. Which keyword gives the matching condition?
3. What is a table alias, and why is it useful?

<details>
<summary>Show answer</summary>

1. The data is split into tables to avoid repeats. A join brings the related pieces back together in one result.
2. `ON`
3. A short nickname for a table in one query, like `s` for `students`. It makes long queries shorter and easier to read.

</details>

### 🟡 Level 2: Apply
Using aliases `s` and `c`, list every Grade 7 student with their class name and teacher.

<details>
<summary>Show answer</summary>

```sql
SELECT s.name AS student, c.name AS class, c.teacher
FROM students s
JOIN classes c ON s.class_id = c.id
WHERE s.grade = 7;
```

| student | class | teacher |
| :--- | :--- | :--- |
| Maryam | Grade 7 Falcons | Ms. Hafsa |
| Aisha | Grade 7 Falcons | Ms. Hafsa |

</details>

### 🔴 Level 3: Challenge
A student wrote:

```sql
SELECT students.name, books.title
FROM students
JOIN books;
```

1. Explain what is wrong and predict how many rows it returns.
2. Fix it so that it lists who borrowed which book. (Which table must sit in the middle?)

<details>
<summary>Show one possible answer</summary>

1. There is no `ON`, so it is a cross join: 8 students × 8 books = 64 rows, mostly false. Also, `students` and `books` are not linked directly. The link goes through `loans`.
2.
```sql
SELECT students.name, books.title
FROM loans
JOIN students ON loans.student_id = students.id
JOIN books    ON loans.book_id = books.id;
```

This returns the 10 real loans.

</details>
