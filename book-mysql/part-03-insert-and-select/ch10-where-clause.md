# Chapter 10: The WHERE Clause & Logical Filters

> **Key Idea**: The `WHERE` clause filters records so that only rows meeting your exact criteria are returned. You combine conditions using `AND`, `OR`, `NOT`, `BETWEEN`, and `IN`.

---

## 1. Why Filter Data?

If a school database holds 10,000 student records, nobody wants to view all 10,000 students at once. You typically want specific subsets:
- *"Who is enrolled in Grade 9?"*
- *"Which students have an attendance rate below 85%?"*
- *"Which books are currently overdue?"*

The `WHERE` clause acts as a smart filter:

```sql
SELECT columns 
FROM table_name 
WHERE condition;
```

---

## 2. Comparison Operators

| Operator | Meaning | Example Query |
| :--- | :--- | :--- |
| `=` | Exactly equal to | `WHERE grade_level = 9` |
| `!=` or `<>` | Not equal to | `WHERE status != 'inactive'` |
| `<` / `>` | Less than / Greater than | `WHERE age > 14` |
| `<=` / `>=` | Less than or equal / Greater or equal | `WHERE price <= 1000.00` |

```sql
-- Find all students who are 15 or older
SELECT full_name, age, grade_level 
FROM students 
WHERE age >= 15;
```

---

## 3. Logical Operators: `AND`, `OR`, `NOT`

You can combine multiple criteria using Boolean logic:

### 1. `AND` (Both conditions must be TRUE)
```sql
-- Find students who are in Grade 9 AND age 15
SELECT full_name, email 
FROM students 
WHERE grade_level = 9 AND age = 15;
```

### 2. `OR` (At least one condition must be TRUE)
```sql
-- Find students in Grade 9 OR Grade 10
SELECT full_name, grade_level 
FROM students 
WHERE grade_level = 9 OR grade_level = 10;
```

### 3. `NOT` (Inverts the condition)
```sql
-- Find students who are NOT in Grade 10
SELECT full_name, grade_level 
FROM students 
WHERE NOT (grade_level = 10);
```

---

## 4. Range and Set Operators: `BETWEEN` and `IN`

### The `BETWEEN ... AND ...` Range Operator
Instead of writing `age >= 14 AND age <= 16`, use `BETWEEN`:
```sql
-- Inclusive range filter
SELECT full_name, age 
FROM students 
WHERE age BETWEEN 14 AND 16;
```

### The `IN (...)` List Operator
Instead of writing multiple `OR` conditions, test membership in a set:
```sql
-- Find students in grades 8, 9, or 10
SELECT full_name, grade_level 
FROM students 
WHERE grade_level IN (8, 9, 10);
```

---

## 5. Checking for Empty Values: `IS NULL` and `IS NOT NULL`

In SQL, `NULL` represents the absence of data. **You cannot use `=` with NULL** because nothing equals unknown. You must use `IS NULL`:

```sql
-- ❌ INCORRECT (Always returns zero rows):
SELECT * FROM students WHERE email = NULL;

-- ✅ CORRECT:
SELECT full_name FROM students WHERE email IS NULL;

-- Find all students who HAVE an email on file:
SELECT full_name, email FROM students WHERE email IS NOT NULL;
```

---

## 6. Review & Practice

### 🟢 Level 1: Recall
1. What clause is used to filter records in a `SELECT` statement?
2. How do you check if a column contains an empty or unknown value in SQL?
3. What is the difference between `AND` and `OR`?

### 🟡 Level 2: Write Filter Queries
Given a `books` table with columns `(title, author, price, available_copies)`:
1. Write a query to find all books priced under `1000.00`.
2. Write a query to find books by `"Yasir Rasool"` that have at least 5 copies available.
3. Write a query to find books with prices between `500.00` and `1500.00`.

### 🔴 Level 3: Logic Puzzle
Given the following query:
```sql
SELECT * FROM students WHERE grade_level = 9 OR grade_level = 10 AND age = 16;
```
Explain operator precedence here. Does `AND` run before `OR`? How should parentheses be placed to ensure it means *"students in Grade 9 or Grade 10, who are also age 16"*?
