# Chapter 17: The INNER JOIN in Depth

> **Key Idea**: An `INNER JOIN` returns only those records that have matching values in **both** tables. If a row in Table A has no corresponding match in Table B, it is omitted from the result set.

---

## 1. How the Venn Diagram Works

<div align="center" style="margin: 2rem 0;">
  <img src="../assets/diagrams/mysql/sql-joins-visual.svg" alt="SQL JOINs Visualized" style="max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
</div>

In set theory and Venn diagrams, `INNER JOIN` is the shaded intersection in the middle:


```
Table A: Students               Table B: Enrolled Courses
┌─────────────────┐             ┌───────────────────────┐
│ [1] Aisha       │   Matched   │ [10] Web Development  │
│ [2] Bilal       ├──► [Both] ◄──┤ [20] Database Systems │
│ [3] Tariq (No crs)            │ [30] Robotics (0 stds)│
└─────────────────┘             └───────────────────────┘
```

- Aisha and Bilal match courses: **Included in results**.
- Tariq has no course (`course_id IS NULL`): **Excluded**.
- Robotics course has zero enrolled students: **Excluded**.

---

## 2. Practical Two-Table INNER JOIN

Let's query our student and course tables:

```sql
SELECT 
    s.id AS roll_number,
    s.full_name AS student_name,
    s.grade_level,
    c.course_name,
    c.teacher
FROM students s
INNER JOIN courses c ON s.course_id = c.id
WHERE s.grade_level = 9
ORDER BY s.full_name ASC;
```

Result set:
```
+-------------+---------------+-------------+-------------------+-------------+
| roll_number | student_name  | grade_level | course_name       | teacher     |
+-------------+---------------+-------------+-------------------+-------------+
| 1           | Aisha Siddiq  | 9           | Web Development   | Sir Yasir   |
| 2           | Bilal Mansoor | 9           | Web Development   | Sir Yasir   |
+-------------+---------------+-------------+-------------------+-------------+
```

---

## 3. Joining Three Tables (Multi-Table JOIN)

Real applications often connect three or more tables in a single query!

Imagine:
- `students (id, full_name)`
- `enrollments (id, student_id, course_id, exam_score)`
- `courses (id, course_name, teacher)`

To generate a student's complete academic report card, we chain two `INNER JOIN` statements:

```sql
SELECT 
    s.full_name AS student_name,
    c.course_name,
    c.teacher,
    e.exam_score
FROM students s
INNER JOIN enrollments e ON s.id = e.student_id
INNER JOIN courses c ON e.course_id = c.id
WHERE e.exam_score >= 80
ORDER BY e.exam_score DESC;
```

Notice the logical progression:
1. Start at `students` (`s`).
2. Bridge from student to `enrollments` (`e`) matching `s.id = e.student_id`.
3. Bridge from enrollment to `courses` (`c`) matching `e.course_id = c.id`.

---

## 4. Filtering Joined Results with WHERE and AND

You can filter joined tables just like single tables:

```sql
SELECT s.full_name, c.course_name, c.teacher 
FROM students s
INNER JOIN courses c ON s.course_id = c.id
WHERE c.teacher = 'Sir Yasir' AND s.grade_level = 9;
```

---

## 5. Review & Practice

### 🟢 Level 1: Recall
1. If a student does not have an assigned course, will their row appear in an `INNER JOIN` with `courses`?
2. What happens if a course has zero enrolled students?
3. How many `INNER JOIN` clauses are required to connect four related tables together?

### 🟡 Level 2: Three-Table Query
Write a query for a bookstore database connecting:
- `orders (id, customer_name, order_date)`
- `order_items (id, order_id, book_id, quantity)`
- `books (id, title, price)`
Display the customer's name, the book title, the quantity purchased, and the unit price.

### 🔴 Level 3: Optimization Insight
Why is filtering with `WHERE` after an `INNER JOIN` efficient, and how does database indexing on foreign key columns speed up join execution?
