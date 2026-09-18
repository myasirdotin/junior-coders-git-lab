# Chapter 19: Aggregate Functions (COUNT, SUM, AVG, MIN, MAX)

> **Key Idea**: Aggregate functions crunch numbers across hundreds or thousands of rows to produce a single summary metric: total counts, sums, averages, and extremes.

---

## 1. The 5 Core Aggregate Functions

| Function | What It Calculates | Typical Example |
| :--- | :--- | :--- |
| `COUNT()` | Total number of rows or non-null values | Total active students |
| `SUM()` | Mathematical total of a numeric column | Total charitable donations collected |
| `AVG()` | Arithmetic mean of a numeric column | Average class test score |
| `MIN()` | Smallest / earliest value | Lowest textbook price |
| `MAX()` | Largest / latest value | Highest exam marks achieved |

```
Individual Rows:             Aggregate Function:
┌─────────────────┐
│ Student 1:  85  │
│ Student 2:  92  │ ────────► AVG(score) ──►  89.33 (Single Summary Value)
│ Student 3:  91  │
└─────────────────┘
```

---

## 2. Practical Examples: Real-World Aggregations

### 1. Counting Records with `COUNT()`
```sql
-- Total number of students registered in the academy
SELECT COUNT(*) AS total_students 
FROM students;

-- Total number of students who have provided an email address
SELECT COUNT(email) AS students_with_email 
FROM students;

-- Total number of distinct grade levels
SELECT COUNT(DISTINCT grade_level) AS total_grades 
FROM students;
```

> 💡 **Tip**: `COUNT(*)` counts all rows in the table. `COUNT(column_name)` counts only rows where that column is **not NULL**.

---

### 2. Calculating Totals with `SUM()`
```sql
-- Total value of all book inventory currently in stock
SELECT 
    SUM(price * available_copies) AS total_inventory_value 
FROM books;

-- Total voluntary charity donations (Sadaqah) collected this month
SELECT 
    SUM(donation_amount) AS total_charity_collected 
FROM charity_donations 
WHERE donation_date >= '2025-09-01';
```

---

### 3. Finding Averages with `AVG()`
```sql
-- Calculate the average exam score in Computer Science
SELECT 
    ROUND(AVG(exam_score), 2) AS average_score 
FROM exam_marks 
WHERE course_name = 'Computer Science';
```

---

### 4. Extremes with `MIN()` and `MAX()`
```sql
SELECT 
    MIN(exam_score) AS lowest_score,
    MAX(exam_score) AS highest_score 
FROM exam_marks;
```

---

## 3. Combining Aggregates in a Single Dashboard Query

You can combine all five aggregates in a single powerful summary query:

```sql
SELECT 
    COUNT(*) AS total_books,
    SUM(available_copies) AS total_physical_copies,
    MIN(price) AS cheapest_book,
    MAX(price) AS most_expensive_book,
    ROUND(AVG(price), 2) AS average_book_price
FROM books;
```

Result set:
```
+-------------+-----------------------+---------------+---------------------+--------------------+
| total_books | total_physical_copies | cheapest_book | most_expensive_book | average_book_price |
+-------------+-----------------------+---------------+---------------------+--------------------+
| 145         | 820                   | 450.00        | 2500.00             | 1120.45            |
+-------------+-----------------------+---------------+---------------------+--------------------+
```

---

## 4. Review & Practice

### 🟢 Level 1: Recall
1. Name the five primary SQL aggregate functions.
2. What is the difference between `COUNT(*)` and `COUNT(email)`?
3. What does `ROUND(AVG(score), 2)` do?

### 🟡 Level 2: Write Aggregation Queries
Given a `community_welfare` table with `(id, donor_name, amount, campaign)`:
1. Write a query to find the total amount of money donated to the `'Winter Warmth'` campaign.
2. Write a query to find the average donation size across all donors.
3. Write a query to find the largest single donation ever made.

### 🔴 Level 3: Common Pitfall
A student writes:
```sql
SELECT full_name, MAX(exam_score) FROM exam_marks;
```
Explain why combining an un-aggregated column (`full_name`) with an aggregate function (`MAX`) without a `GROUP BY` clause produces misleading or invalid results in SQL.
