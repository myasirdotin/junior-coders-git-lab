# Chapter 18: LEFT JOIN, RIGHT JOIN & Finding Missing Records

> **Key Idea**: A `LEFT JOIN` preserves every single record from the left table, even when there is no matching record on the right. Missing values are filled with `NULL`.

---

## 1. When INNER JOIN is Not Enough

Suppose the academy principal asks:
> *"Show me a list of ALL registered students and their enrolled course."*

If you use `INNER JOIN`, any student who hasn't enrolled in a course yet will be **completely vanished** from the report! 

To guarantee that **no primary student record is left behind**, we use a **`LEFT JOIN`** (also known as `LEFT OUTER JOIN`):

```
Table A: ALL Students (Left)       Table B: Courses (Right)
┌───────────────────────────┐      ┌─────────────────────────┐
│ 1. Aisha    ──► Course 10 │ ───► │ 10. Web Engineering     │
│ 2. Bilal    ──► Course 20 │ ───► │ 20. Database Systems    │
│ 3. Hamza    ──► NULL      │ ───► │ (No match found)        │
└───────────────────────────┘      └─────────────────────────┘
  ▲
  └── Every row from Table A is kept!
```

---

## 2. Practical Syntax of `LEFT JOIN`

```sql
SELECT 
    s.id,
    s.full_name AS student_name,
    c.course_name,
    c.teacher
FROM students s
LEFT JOIN courses c ON s.course_id = c.id
ORDER BY s.id ASC;
```

Result set:
```
+----+---------------+------------------+-----------+
| id | student_name  | course_name      | teacher   |
+----+---------------+------------------+-----------+
| 1  | Aisha Siddiq  | Web Engineering  | Sir Yasir |
| 2  | Bilal Mansoor | Database Systems | Dr. Amina |
| 3  | Hamza Tariq   | NULL             | NULL      |
+----+---------------+------------------+-----------+
```

Notice that student Hamza appears in the report, with `NULL` indicating he is not yet enrolled in any course.

---

## 3. Handling NULL Values with `COALESCE`

Showing raw `NULL` values on a web page looks unpolished. You can provide an elegant fallback label using `COALESCE`:

```sql
SELECT 
    s.full_name,
    COALESCE(c.course_name, '⚠️ Not Enrolled Yet') AS enrollment_status
FROM students s
LEFT JOIN courses c ON s.course_id = c.id;
```

`COALESCE(val, fallback)` returns the first non-null value in its arguments list.

---

## 4. Superpower: Finding "Missing" Records (Anti-Joins)

One of the most powerful uses of `LEFT JOIN` is finding items that have **never occurred** or are missing relationships:

### Scenario 1: Find Students Who Have NOT Enrolled in Any Course
```sql
SELECT s.id, s.full_name, s.email
FROM students s
LEFT JOIN courses c ON s.course_id = c.id
WHERE c.id IS NULL; -- Kept only where the right table had no match!
```

### Scenario 2: Find Books in the Library That Have NEVER Been Borrowed
```sql
SELECT b.id, b.title, b.author
FROM books b
LEFT JOIN borrow_records r ON b.id = r.book_id
WHERE r.id IS NULL;
```

---

## 5. What About `RIGHT JOIN`?

A `RIGHT JOIN` is simply the mirror image of a `LEFT JOIN`: it keeps all rows from the **right** table and matches from the left.

In real-world software engineering, developers rarely use `RIGHT JOIN` because flipping the order of tables in a `LEFT JOIN` is much easier for humans to read from left to right.

---

## 6. Review & Practice

### 🟢 Level 1: Recall
1. What does `LEFT JOIN` do with rows from the left table that have no match on the right?
2. What value does MySQL insert for columns when a right table has no match?
3. What does the `COALESCE()` function do?

### 🟡 Level 2: Anti-Join Query
Given:
- `customers (id, name, email)`
- `orders (id, customer_id, order_total)`
Write a query to find all customers who registered but have never placed an order (`orders.id IS NULL`).

### 🔴 Level 3: Real-World Reporting
Why is `LEFT JOIN` essential when generating monthly invoices or student report cards where some students might have 0 penalties or 0 absent days?
