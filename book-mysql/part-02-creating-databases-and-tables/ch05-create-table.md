# Chapter 5: CREATE TABLE and Schema Design

> **Key Idea**: `CREATE TABLE` defines the blueprint (schema) for your data. You specify column names, their data types, and integrity constraints to ensure clean and orderly records.

---

## 1. What is Schema Design?

In construction, architects draft blueprints before builders pour concrete. In database engineering, the blueprint is called the **schema**.

When you write a `CREATE TABLE` statement, you are instructing MySQL:
1. What entity this table represents (e.g., `students`).
2. What attributes each record must possess (e.g., `id`, `full_name`, `email`, `registered_at`).
3. What data rules must be obeyed (e.g., email cannot be blank, age must be a whole number).

---

## 2. Basic Syntax of `CREATE TABLE`

Here is the standard SQL syntax for creating a table:

```sql
CREATE TABLE table_name (
    column_name_1 DATA_TYPE CONSTRAINTS,
    column_name_2 DATA_TYPE CONSTRAINTS,
    column_name_3 DATA_TYPE CONSTRAINTS,
    ...
    PRIMARY KEY (column_name_1)
);
```

### Practical Example: The `students` Table

Let's build a clean, real-world table for an educational academy:

```sql
USE school_academy_db;

CREATE TABLE IF NOT EXISTS students (
    id            INT AUTO_INCREMENT,
    full_name     VARCHAR(100) NOT NULL,
    email         VARCHAR(150) NOT NULL UNIQUE,
    age           INT NOT NULL,
    grade_level   INT NOT NULL DEFAULT 9,
    enrolled_date DATE NOT NULL,
    is_active     BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

Let's dissect each line:
- `id INT AUTO_INCREMENT`: A whole number that automatically increases (1, 2, 3...) with every new record.
- `full_name VARCHAR(100) NOT NULL`: Text up to 100 characters; `NOT NULL` prevents saving empty entries.
- `email VARCHAR(150) NOT NULL UNIQUE`: `UNIQUE` constraint guarantees no two students can share the same email address.
- `grade_level INT NOT NULL DEFAULT 9`: If no grade is supplied during insertion, MySQL defaults to 9.
- `PRIMARY KEY (id)`: Designates `id` as the unique row identifier.
- `ENGINE=InnoDB`: The modern, transaction-safe storage engine of MySQL.

---

## 3. Inspecting Tables: `SHOW TABLES` and `DESCRIBE`

Once a table is created, how do you verify its structure?

```sql
-- 1. List all tables inside the currently active database
SHOW TABLES;

-- 2. Inspect the columns, data types, and keys of a specific table
DESCRIBE students;
```

MySQL outputs a clear summary grid:
```
+---------------+--------------+------+-----+---------+----------------+
| Field         | Type         | Null | Key | Default | Extra          |
+---------------+--------------+------+-----+---------+----------------+
| id            | int(11)      | NO   | PRI | NULL    | auto_increment |
| full_name     | varchar(100) | NO   |     | NULL    |                |
| email         | varchar(150) | NO   | UNI | NULL    |                |
| age           | int(11)      | NO   |     | NULL    |                |
| grade_level   | int(11)      | NO   |     | 9       |                |
| enrolled_date | date         | NO   |     | NULL    |                |
| is_active     | tinyint(1)   | NO   |     | 1       |                |
+---------------+--------------+------+-----+---------+----------------+
```

---

## 4. Deleting or Renaming a Table

If you need to discard a table entirely:

```sql
-- Permanently delete the table and all its data
DROP TABLE IF EXISTS old_temp_records;

-- Rename a table
RENAME TABLE students TO academy_students;
```

---

## 5. Review & Practice

### 🟢 Level 1: Recall
1. What command is used to inspect the structure and column types of an existing table?
2. What does the `NOT NULL` constraint do?
3. What does `AUTO_INCREMENT` do when a new record is added?

### 🟡 Level 2: Write a Schema
Write a complete `CREATE TABLE` query for a `books` table with the following requirements:
- `id`: integer, auto increment, primary key
- `title`: text up to 200 characters, required
- `author`: text up to 100 characters, required
- `price`: decimal number for currency
- `published_year`: integer
- `available_copies`: integer, default to 1

### 🔴 Level 3: Design Evaluation
A developer creates a `users` table without a `UNIQUE` constraint on the `email` column. What problems could arise when users try to log into the application using their email?
