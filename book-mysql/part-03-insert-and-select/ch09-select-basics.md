# Chapter 9: SELECT Basics & Aliases

> **Key Idea**: `SELECT` is the most widely used SQL statement. It retrieves information from one or more tables without altering the underlying data.

---

## 1. The Anatomy of a SELECT Query

The fundamental syntax of `SELECT`:

```sql
SELECT column1, column2 FROM table_name;
```

When you run a `SELECT` statement:
1. The MySQL database engine reads the records from the disk.
2. It extracts only the columns you requested.
3. It returns a temporary tabular result set directly to your application or screen.
4. **Nothing in the table is changed or deleted.**

---

## 2. Selecting All Columns vs. Specific Columns

### Selecting Everything with Wildcard (`*`)
```sql
-- Retrieve all columns and all rows from students
SELECT * FROM students;
```

While `SELECT *` is convenient during quick manual debugging in phpMyAdmin, **it is strongly discouraged in production applications**:
- It pulls unnecessary columns across the network (wasting bandwidth).
- It consumes more server memory.
- If the table schema changes later, code expecting specific columns may crash.

### Best Practice: Explicit Column Projections
Always list the exact columns your application needs:

```sql
SELECT id, full_name, email, grade_level 
FROM students;
```

---

## 3. Renaming Output Columns with Aliases (`AS`)

Sometimes database column names are cryptic or need to be formatted nicely for display. You can rename columns in the output using the `AS` keyword:

```sql
SELECT 
    full_name AS student_name,
    email AS contact_email,
    grade_level AS class_year
FROM students;
```

Result set:
```
+----------------+--------------------------+------------+
| student_name   | contact_email            | class_year |
+----------------+--------------------------+------------+
| Aisha Siddiq   | aisha@srinagar.edu.in    | 9          |
| Bilal Mansoor  | bilal@srinagar.edu.in    | 9          |
+----------------+--------------------------+------------+
```


---

## 4. Calculated Columns & String Concatenation

You can perform arithmetic and string manipulation directly within a `SELECT` statement!

### 1. Mathematical Calculations:
```sql
-- Calculate 2.5% annual Zakat on saved student welfare funds
SELECT 
    fund_name,
    total_balance,
    total_balance * 0.025 AS annual_zakat_due
FROM community_funds;
```

### 2. String Concatenation (`CONCAT`):
```sql
-- Combine first and last names or add prefixes
SELECT 
    id,
    CONCAT('Student: ', full_name, ' (Grade ', grade_level, ')') AS student_label
FROM students;
```

---

## 5. Eliminating Duplicates with `DISTINCT`

If you want to view a list of unique values without repeating duplicate entries:

```sql
-- Shows every unique grade level currently represented in the academy
SELECT DISTINCT grade_level 
FROM students;
```

---

## 6. Review & Practice

### 🟢 Level 1: Recall
1. Does running a `SELECT` query modify or delete records in a table?
2. What does the asterisk (`*`) symbol mean in `SELECT * FROM table;`?
3. What keyword is used to rename a column header in the query result?

### 🟡 Level 2: Query Writing
Write a SQL query that retrieves all products from `honey_products` and displays:
- The product name as `item_name`
- The retail price as `regular_price`
- A 10% discount price calculated as `retail_price * 0.90` aliased as `discount_price`

### 🔴 Level 3: Architecture Question
Why is `SELECT * FROM big_table;` considered a dangerous anti-pattern when a table has millions of rows and large text columns?
