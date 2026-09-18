# Chapter 12: The UPDATE Statement — Modifying Records

> **Key Idea**: `UPDATE` modifies existing values in one or more rows. Always pair `UPDATE` with a `WHERE` clause, or you will inadvertently overwrite every single row in the table!

---

## 1. Syntax of `UPDATE`

The fundamental structure of an `UPDATE` query:

```sql
UPDATE table_name 
SET column1 = new_value1, column2 = new_value2 
WHERE condition;
```

---

## 2. Practical Examples: Selective Modifications

### Example 1: Updating a Student's Email
Suppose student Aisha changes her contact email:

```sql
UPDATE students 
SET email = 'aisha.siddiq@academy.edu.in' 
WHERE id = 1;
```


MySQL reports:
```
Query OK, 1 row affected (0.01 sec)
Rows matched: 1  Changed: 1  Warnings: 0
```

### Example 2: Promoting a Grade Level
At the start of the new academic year, all Grade 9 students are promoted to Grade 10:

```sql
UPDATE students 
SET grade_level = 10 
WHERE grade_level = 9;
```

### Example 3: Updating Multiple Columns Simultaneously
```sql
UPDATE honey_products 
SET 
  retail_price = 1100.00,
  weight_grams = 500,
  is_in_stock = TRUE 
WHERE id = 4;
```

---

## 3. Mathematical Increment Updates

You can update a column relative to its current stored value:

```sql
-- Increase available book stock by 5 copies
UPDATE books 
SET available_copies = available_copies + 5 
WHERE id = 3;

-- Give an ethical 10% inflation adjustment raise to all academy teachers
UPDATE teachers 
SET salary = salary * 1.10 
WHERE status = 'active';
```

---

## 4. The Cardinal Rule: The Danger of Missing WHERE

> 🚨 **CRITICAL WARNING**: If you omit the `WHERE` clause from an `UPDATE` statement, MySQL will update **EVERY SINGLE ROW** in the entire table!

```sql
-- ❌ CATASTROPHIC DISASTER: Every student is now named "Bilal"!
UPDATE students SET full_name = 'Bilal';
```

### Developer Best Practice:
Before running an `UPDATE`, first run a `SELECT` with the exact same `WHERE` condition to verify which rows will be affected:

```sql
-- Step 1: Verify the target rows first!
SELECT id, full_name, email FROM students WHERE grade_level = 9;

-- Step 2: Now run the update with confidence!
UPDATE students SET grade_level = 10 WHERE grade_level = 9;
```

---

## 5. Review & Practice

### 🟢 Level 1: Recall
1. What keyword specifies which column and values to change in an `UPDATE` statement?
2. What happens if you run `UPDATE products SET price = 50;` without a `WHERE` clause?
3. How do you increase a student's `attendance_count` by 1?

### 🟡 Level 2: Query Writing
Given an `inventory` table with columns `(id, item_name, price, stock)`:
1. Write a query to change the price of item `id = 7` to `850.00`.
2. Write a query to reduce the stock of `"Olive Oil Jar"` by 2 units when a customer buys them.
3. Write a query to set `stock = 0` for all items where `expiry_date < '2025-01-01'`.

### 🔴 Level 3: Code Safety
Why do professional database management tools have an option called "Safe Updates" that refuses to run an `UPDATE` unless a `PRIMARY KEY` is specified in the `WHERE` clause?
