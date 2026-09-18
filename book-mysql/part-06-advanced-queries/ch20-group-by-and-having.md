# Chapter 20: GROUP BY & HAVING Clauses

> **Key Idea**: `GROUP BY` collapses rows into summary groups based on matching values in one or more columns. The `HAVING` clause filters those summarized groups, unlike `WHERE` which filters individual raw rows.

---

## 1. The Grouping Concept

<div align="center" style="margin: 2rem 0;">
  <img src="../assets/diagrams/mysql/group-by-aggregation.svg" alt="How GROUP BY & Aggregations Work" style="max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
</div>

In Chapter 19, `COUNT(*)` gave us the total student count across the entire academy. 

What if the principal wants to see the count broken down **per grade level**?
- Grade 8: 45 students
- Grade 9: 60 students
- Grade 10: 52 students

`GROUP BY` groups all rows sharing the same value and runs the aggregate function separately for each bucket:


```sql
SELECT grade_level, COUNT(*) AS student_count
FROM students
GROUP BY grade_level
ORDER BY grade_level ASC;
```

```
Raw Rows:                       GROUP BY grade_level:
┌──────────────┬─────────────┐
│ Aisha        │ Grade 9     │ ──► [Grade 8 Bucket] ──► 45
│ Bilal        │ Grade 9     │ ──► [Grade 9 Bucket] ──► 60
│ Tariq        │ Grade 8     │ ──► [Grade 10 Bucket] ─► 52
└──────────────┴─────────────┘
```

---

## 2. Practical Examples: Multi-Category Analysis

### Example 1: Average Score by Subject
```sql
SELECT 
    course_name,
    COUNT(*) AS total_students_tested,
    ROUND(AVG(exam_score), 1) AS class_average,
    MAX(exam_score) AS top_score
FROM exam_marks
GROUP BY course_name
ORDER BY class_average DESC;
```

### Example 2: Book Inventory Breakdown by Category
```sql
SELECT 
    category,
    COUNT(*) AS unique_titles,
    SUM(available_copies) AS total_books_on_shelf
FROM books
GROUP BY category;
```

---

## 3. The Difference Between WHERE and HAVING

This is one of the most important concepts in SQL:

| Clause | When It Executes | What It Filters |
| :--- | :--- | :--- |
| **`WHERE`** | **Before** grouping occurs | Individual raw rows before they enter any aggregate bucket. |
| **`HAVING`** | **After** grouping & aggregation | The calculated summary groups. |

```sql
-- Filter out inactive students first (WHERE)
-- Then group by grade (GROUP BY)
-- Then only show grades with 30 or more students (HAVING)
SELECT 
    grade_level,
    COUNT(*) AS active_students
FROM students
WHERE is_active = TRUE         -- 1. Filters raw rows
GROUP BY grade_level           -- 2. Groups rows
HAVING COUNT(*) >= 30          -- 3. Filters aggregate groups!
ORDER BY active_students DESC;
```

> ⚠️ **Golden Rule**: You cannot use aggregate functions like `COUNT(*)` or `AVG()` inside a `WHERE` clause! You must use `HAVING`.

---

## 4. Complete SQL Execution Order

When MySQL executes a query, it follows this strict logical sequence:
1. **`FROM`** & **`JOIN`** (Locates the source tables and matches relations)
2. **`WHERE`** (Filters individual rows)
3. **`GROUP BY`** (Groups remaining rows)
4. **`HAVING`** (Filters the summarized groups)
5. **`SELECT`** (Extracts requested columns and aliases)
6. **`ORDER BY`** (Sorts final results)
7. **`LIMIT`** (Paginates output)

---

## 5. Review & Practice

### 🟢 Level 1: Recall
1. What does the `GROUP BY` clause do?
2. What is the fundamental difference between `WHERE` and `HAVING`?
3. Can you write `WHERE COUNT(*) > 5`? If not, what should you write instead?

### 🟡 Level 2: Query Writing
Given a `donations` table with columns `(donor_name, city, amount)`:
1. Write a query to find the total amount donated from each city.
2. Write a query to show only those cities that have donated more than `50,000` in total.

### 🔴 Level 3: Debugging
Explain why the following query produces an error in SQL and correct it:
```sql
SELECT grade_level, COUNT(*) 
FROM students 
WHERE COUNT(*) > 20 
GROUP BY grade_level;
```
