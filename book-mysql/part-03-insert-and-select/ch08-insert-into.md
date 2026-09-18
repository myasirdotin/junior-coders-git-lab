# Chapter 8: INSERT INTO — Adding Records

> **Key Idea**: `INSERT INTO` creates new rows inside your tables. You specify the target table, the columns you are populating, and the exact values to insert.

---

## 1. The Syntax of `INSERT INTO`

<div align="center" style="margin: 2rem 0;">
  <img src="../assets/diagrams/mysql/crud-lifecycle.svg" alt="The 4 CRUD Operations in SQL" style="max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
</div>

The standard syntax for inserting a single row:


```sql
INSERT INTO table_name (column1, column2, column3)
VALUES (value1, value2, value3);
```

### Important Rules:
1. The order of columns in the parentheses must match the order of values in the `VALUES` list.
2. Text strings (`VARCHAR`, `TEXT`) and dates (`'2025-09-18'`) must be enclosed in single quotes (`'...'`).
3. Numbers (`INT`, `DECIMAL`) do **not** use quotes (e.g., `15`, `1250.50`).
4. If a column has `AUTO_INCREMENT` or a `DEFAULT` value, you can omit it from the column list!

---

## 2. Practical Example: Registering Students

Let's insert records into our `students` table:

```sql
-- Insert a single student record
INSERT INTO students (full_name, email, age, grade_level, enrolled_date)
VALUES ('Aisha Siddiq', 'aisha@srinagar.edu.in', 15, 9, '2025-08-15');
```

Once executed, MySQL reports:
```
Query OK, 1 row affected (0.01 sec)
```

To see the ID that MySQL generated automatically:
```sql
SELECT LAST_INSERT_ID(); -- Returns 1
```

---

## 3. High-Performance Batch Inserts

What if you need to register five students at once? Instead of sending five separate queries across the network, you can chain multiple sets of parentheses in a single `INSERT` statement:

```sql
INSERT INTO students (full_name, email, age, grade_level, enrolled_date)
VALUES 
  ('Bilal Mansoor', 'bilal@srinagar.edu.in', 15, 9, '2025-08-15'),
  ('Fatima Zahra', 'fatima@srinagar.edu.in', 16, 10, '2025-08-16'),
  ('Hamza Tariq', 'hamza@srinagar.edu.in', 14, 9, '2025-08-17'),
  ('Maryam Noor', 'maryam@srinagar.edu.in', 15, 10, '2025-08-17'),
  ('Zayd Ali', 'zayd@srinagar.edu.in', 16, 10, '2025-08-18');
```

This single query inserts all five rows instantaneously, reducing database network overhead.

---

## 4. Common Insertion Mistakes to Avoid

### Mistake 1: Column-Value Count Mismatch
```sql
-- ❌ ERROR: Column count doesn't match value count
INSERT INTO students (full_name, email, age) 
VALUES ('Zayd Ali', 'zayd@srinagar.edu.in'); -- Missing age value!
```

### Mistake 2: Violating a `UNIQUE` Constraint
```sql
-- ❌ ERROR: Duplicate entry 'aisha@srinagar.edu.in' for key 'email'
INSERT INTO students (full_name, email, age, grade_level, enrolled_date)
VALUES ('Aisha Khan', 'aisha@srinagar.edu.in', 15, 9, '2025-09-01');
```

### Mistake 3: Putting Numbers in Unneeded Quotes
While MySQL can often convert `'15'` to an integer, it is best practice to pass numbers unquoted:
```sql
-- ✅ Clean and professional
VALUES ('Aisha', 'aisha@srinagar.edu.in', 15, 9, '2025-08-15');
```


---

## 5. Review & Practice

### 🟢 Level 1: Recall
1. Which SQL statement is used to add new rows into a table?
2. Do you need to supply a value for an `AUTO_INCREMENT` column when inserting data?
3. What type of quotes are used around string values in SQL?

### 🟡 Level 2: Write an Insert Query
Write an `INSERT INTO` query to add two books into a `books` table with columns `(title, author, price, available_copies)`:
- Book 1: `"Islamic Ethics for Coders"`, author: `"Yasir Rasool"`, price: `950.00`, copies: `12`
- Book 2: `"Web Engineering Fundamentals"`, author: `"Dr. Amina"`, price: `1350.00`, copies: `20`

### 🔴 Level 3: Debugging
Explain why the following query fails and write the corrected version:
```sql
INSERT INTO students (full_name, age, enrolled_date)
VALUES (Bilal Mansoor, "15", 2025-08-15);
```
