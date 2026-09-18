# Chapter 13: The DELETE Statement & TRUNCATE

> **Key Idea**: `DELETE` removes specific rows from a table. `TRUNCATE` empties an entire table rapidly, while `DROP` destroys the table and its schema completely.

---

## 1. Syntax of `DELETE`

The basic syntax for deleting rows:

```sql
DELETE FROM table_name 
WHERE condition;
```

Like `UPDATE`, **`DELETE` without a `WHERE` clause wipes out all records in the table!**

---

## 2. Practical Examples: Selective Deletion

### Example 1: Deleting a Specific Record by ID
Always prefer deleting by Primary Key, which targets exactly one unambiguous row:

```sql
-- Remove student record with ID 5
DELETE FROM students 
WHERE id = 5;
```

### Example 2: Deleting Inactive Records
```sql
-- Remove temporary visitor logs older than 30 days
DELETE FROM visitor_logs 
WHERE created_at < '2025-08-01';
```

---

## 3. Comparison: DELETE vs. TRUNCATE vs. DROP

Beginners frequently confuse these three commands. Memorize this comparison table:

| Command | What It Does | Speed | Reset `AUTO_INCREMENT`? | Can Rollback in Transaction? |
| :--- | :--- | :--- | :--- | :--- |
| `DELETE FROM tbl WHERE...` | Removes matching rows one by one. | Slower on huge tables. | No (Keeps counting forward). | **Yes** |
| `TRUNCATE TABLE tbl;` | Instantly wipes all rows, keeping the empty table blueprint. | Extremely fast (resets data pages). | **Yes** (Resets ID back to 1). | No (Implicit commit). |
| `DROP TABLE tbl;` | Destroys rows, columns, indexes, and the entire table structure! | Instant. | Table no longer exists! | No |

```
DELETE:    Erases specific written lines from the ledger notebook.
TRUNCATE:  Rips out all pages and inserts a fresh blank lined notebook.
DROP:      Burns the notebook and throws the ash away!
```

---

## 4. The Soft Delete Pattern (*Amānah* in Modern Apps)

In professional applications—such as banking, school records, or customer accounts—real records are rarely permanently destroyed. Instead, software engineers use **Soft Deletes**:

Instead of `DELETE FROM users WHERE id = 4;`:
1. Add an `is_deleted` or `deleted_at` column:
   ```sql
   ALTER TABLE students ADD COLUMN is_deleted BOOLEAN DEFAULT FALSE;
   ```
2. When a student leaves, "soft delete" them:
   ```sql
   UPDATE students SET is_deleted = TRUE WHERE id = 4;
   ```
3. Queries only fetch non-deleted rows:
   ```sql
   SELECT * FROM students WHERE is_deleted = FALSE;
   ```

### Why Soft Deletion is Ethical (*Amānah*):
- Accidental clicks can be effortlessly restored (*"Undo"*).
- Historical audit trails remain intact for audits and accountability.
- Related records in other tables (like past exam marks) do not break.

---

## 5. Review & Practice

### 🟢 Level 1: Recall
1. What statement is used to remove specific rows from a table?
2. What happens if you run `DELETE FROM students;` without a `WHERE` clause?
3. What is the difference between `DELETE` and `TRUNCATE` regarding `AUTO_INCREMENT`?

### 🟡 Level 2: Query Writing
1. Write a query to delete all products from `inventory` where `stock = 0` and `is_discontinued = TRUE`.
2. Write a query to empty a temporary staging table named `temp_csv_imports` so its IDs reset back to 1.

### 🔴 Level 3: Architecture Question
Why do modern systems prefer Soft Deletion (`deleted_at TIMESTAMP NULL`) over hard permanent deletion for student enrollment records?
