# Chapter 16: What is a JOIN? — Combining Tables

> **Key Idea**: Normalization splits data across multiple tables to avoid redundancy. A `JOIN` reconstructs that data on the fly during a query, producing a unified view without changing stored tables.

---

## 1. The Reassembly Analogy

Think of normalized tables like pieces of a jigsaw puzzle or books in a library:
- Authors are stored in the `authors` table.
- Books are stored in the `books` table.
- Borrowing history is stored in the `loans` table.

When a librarian wants to print a receipt stating: *"Aisha borrowed 'Web Engineering' by Yasir Rasool on Sept 18"*, the database must stitch those three tables together seamlessly. That stitching operation is called a **JOIN**.

---

## 2. Visualizing SQL JOINs

Here is the visual mental model showing the three primary types of joins:

<div align="center" style="margin: 2rem 0;">
  <img src="../assets/diagrams/mysql/sql-joins-visual.svg" alt="SQL JOINs Visualized" style="max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
</div>

---

## 3. The Anatomy of a JOIN Statement

Every join statement requires two essential pieces of information:
1. **Which second table to join with** (`JOIN second_table`).
2. **The bridge condition that connects them** (`ON tableA.id = tableB.foreign_key_id`).

```sql
SELECT 
    students.full_name,
    courses.course_name,
    courses.teacher
FROM students
JOIN courses ON students.course_id = courses.id;
```

---

## 4. Making Queries Concise with Table Aliases

Typing long table names repeatedly makes SQL hard to read. You can give each table a short alias (like `s` for `students` and `c` for `courses`):

```sql
SELECT 
    s.id AS student_id,
    s.full_name,
    s.email,
    c.course_name,
    c.room
FROM students s
JOIN courses c ON s.course_id = c.id;
```

Notice how clean and readable this query is!

---

## 5. What Happens If You Forget the `ON` Condition? (Cartesian Product)

> ⚠️ **Warning**: If you join two tables without specifying an `ON` condition, MySQL performs a **CROSS JOIN** (Cartesian product). Every single row in Table A is multiplied by every single row in Table B!

If `students` has 100 rows and `courses` has 50 rows:
$$100 \times 50 = 5,000 \text{ duplicate rows!}$$

Always specify your matching `ON` condition to ensure you only pair records that truly belong together.

---

## 6. Review & Practice

### 🟢 Level 1: Recall
1. Why do we need `JOIN` in relational databases?
2. What keyword specifies the matching bridge condition between two joined tables?
3. What is a table alias, and why is it helpful?

### 🟡 Level 2: Query Writing
Given:
- `authors (id, name, country)`
- `books (id, title, author_id, price)`
Write a query using table aliases `b` and `a` to display `book title`, `price`, and the author's `name` and `country`.

### 🔴 Level 3: Debugging
Explain what error or logical flaw occurs in this query:
```sql
SELECT students.full_name, courses.course_name 
FROM students 
JOIN courses;
```
