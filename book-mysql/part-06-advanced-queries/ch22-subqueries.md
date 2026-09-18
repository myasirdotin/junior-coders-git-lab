# Chapter 22: Introduction to Subqueries

> **Key Idea**: A subquery (or nested query) is a `SELECT` statement embedded inside another SQL query. The inner query executes first, and its result is fed directly into the outer query.

---

## 1. Why Subqueries?

Suppose your teacher asks:
> *"Find all students whose exam score is higher than the overall class average."*

To answer this manually with basic SQL:
1. You run `SELECT AVG(exam_score) FROM exam_marks;` $\rightarrow$ Result is `78.5`.
2. You then manually type: `SELECT * FROM exam_marks WHERE exam_score > 78.5;`

This two-step process is tedious, and if a new student takes the test tomorrow, the hardcoded `78.5` is instantly outdated!

A **subquery** solves this by nesting query #1 directly inside query #2:

```sql
SELECT student_name, exam_score 
FROM exam_marks 
WHERE exam_score > (
    -- Inner subquery calculates the dynamic class average first!
    SELECT AVG(exam_score) FROM exam_marks
)
ORDER BY exam_score DESC;
```

```
Execution Flow:
┌────────────────────────────────────────────────────────┐
│ 1. Inner Query executes: (SELECT AVG...) ──► 78.5      │
│ 2. Outer Query runs: WHERE exam_score > 78.5           │
└────────────────────────────────────────────────────────┘
```

---

## 2. Subqueries with `IN` (Multi-Row Subqueries)

What if the inner subquery returns multiple values instead of a single number? You pair it with `IN`:

### Scenario: Find All Students Enrolled in Any Web Course
```sql
SELECT id, full_name, email 
FROM students 
WHERE course_id IN (
    -- Inner subquery returns a list of matching course IDs: (10, 15, 22)
    SELECT id FROM courses WHERE course_name LIKE '%Web%'
);
```

---

## 3. Subqueries in the `FROM` Clause (Derived Tables)

You can treat the result of a subquery as a temporary virtual table in a `FROM` clause:

```sql
-- Find which grades have an average score above 80
SELECT grade_summary.grade_level, grade_summary.avg_score 
FROM (
    SELECT grade_level, AVG(exam_score) AS avg_score 
    FROM exam_marks 
    GROUP BY grade_level
) AS grade_summary
WHERE grade_summary.avg_score >= 80.0;
```

> 💡 **Rule**: Every derived table in a `FROM` clause must be given an alias (here: `AS grade_summary`).

---

## 4. Subqueries vs. JOINs

In many scenarios, a query can be written either using a `JOIN` or using a subquery. 

- **Subqueries** are often easier for beginners to conceptualize because they read like step-by-step logic.
- **JOINs** are usually executed faster by relational query optimizers, especially when combining large sets of related records.

---

## 5. Review & Practice

### 🟢 Level 1: Recall
1. What is a subquery?
2. Which query runs first: the inner query or the outer query?
3. What operator is used when a subquery returns multiple rows?

### 🟡 Level 2: Write a Subquery
Given:
- `books (id, title, price)`
Write a query using an inner subquery to find all books whose `price` is strictly greater than the average price of all books in the inventory.

### 🔴 Level 3: Real-World Scenario
Write a subquery to find all members from a `members` table who have never made a payment in the `payments` table (`WHERE id NOT IN (...)`).
