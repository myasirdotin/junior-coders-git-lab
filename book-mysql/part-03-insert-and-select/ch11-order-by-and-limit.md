# Chapter 11: Sorting & Pagination — ORDER BY & LIMIT

> **Key Idea**: `ORDER BY` sorts your query results alphabetically, numerically, or chronologically. `LIMIT` and `OFFSET` allow you to retrieve only a slice of rows, powering webpage pagination.

---

## 1. Why Sort Data?

By default, relational databases do **not** guarantee the order in which rows are returned. If you want results sorted alphabetically by name, from highest marks to lowest, or from newest to oldest, you must explicitly declare it with `ORDER BY`.

```sql
SELECT columns 
FROM table_name 
ORDER BY column_name [ASC | DESC];
```

- `ASC` (Ascending): Lowest to highest, A to Z, oldest to newest (Default).
- `DESC` (Descending): Highest to lowest, Z to A, newest to oldest.

---

## 2. Practical Sorting Examples

### Ascending Alphabetical Order:
```sql
-- Sort students alphabetically by name (A to Z)
SELECT full_name, grade_level 
FROM students 
ORDER BY full_name ASC;
```

### Descending Numerical Order:
```sql
-- View highest exam marks first
SELECT student_name, exam_score 
FROM exam_marks 
ORDER BY exam_score DESC;
```

### Multi-Column Sorting:
You can sort by a primary column, and break ties with a secondary column:
```sql
-- Sort first by grade (lowest to highest), then by name (A to Z)
SELECT grade_level, full_name 
FROM students 
ORDER BY grade_level ASC, full_name ASC;
```

---

## 3. Limiting Rows with `LIMIT`

When searching or loading a dashboard, you often only want the top few records:

```sql
-- Get the top 3 highest scoring students
SELECT student_name, exam_score 
FROM exam_marks 
ORDER BY exam_score DESC 
LIMIT 3;
```

```sql
-- Get the 5 most recently registered students
SELECT full_name, enrolled_date 
FROM students 
ORDER BY enrolled_date DESC 
LIMIT 5;
```

---

## 4. Building Pagination with `LIMIT` and `OFFSET`

Every search engine or online directory breaks large sets of records into pages (Page 1, Page 2, Page 3...).

In MySQL, pagination is implemented using `LIMIT` (how many items per page) and `OFFSET` (how many items to skip):

```sql
-- Page 1: Items 1 through 10 (Skip 0, take 10)
SELECT id, full_name FROM students ORDER BY id ASC LIMIT 10 OFFSET 0;

-- Page 2: Items 11 through 20 (Skip 10, take 10)
SELECT id, full_name FROM students ORDER BY id ASC LIMIT 10 OFFSET 10;

-- Page 3: Items 21 through 30 (Skip 20, take 10)
SELECT id, full_name FROM students ORDER BY id ASC LIMIT 10 OFFSET 20;
```

### The Universal Pagination Formula:
$$\text{OFFSET} = (\text{Page Number} - 1) \times \text{Items Per Page}$$

In PHP or backend code:
```php
$page = 3;
$perPage = 10;
$offset = ($page - 1) * $perPage; // 20
```

---

## 5. Review & Practice

### 🟢 Level 1: Recall
1. What is the default sorting direction of `ORDER BY` if you omit `ASC` or `DESC`?
2. What does `LIMIT 5` do in a query?
3. How do you sort newest records first if you have a `created_at` timestamp column?

### 🟡 Level 2: Query Writing
Given a `books` table:
1. Write a query to list all books sorted by `price` from lowest to highest.
2. Write a query to find the single most expensive book in the inventory.
3. Write a query for Page 4 of a book list showing 12 books per page.

### 🔴 Level 3: Real-World Scenario
Why is combining `ORDER BY` with `LIMIT` essential for pagination? What unpredictable bug occurs if you paginate using `LIMIT 10 OFFSET 10` *without* an `ORDER BY` clause?
