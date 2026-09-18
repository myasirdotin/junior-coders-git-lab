# MySQL Quick Reference Cheatsheet

> **Quick Navigation**: A rapid reference for everyday MySQL syntax, DDL, DML, JOINs, aggregations, and security best practices.

---

## 1. Database Operations (DDL)

```sql
-- Create database with universal character encoding
CREATE DATABASE IF NOT EXISTS school_db
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

-- Switch active database
USE school_db;

-- List all databases on server
SHOW DATABASES;

-- Show currently selected database
SELECT DATABASE();

-- Delete database and all tables (Permanent!)
DROP DATABASE IF EXISTS school_db;
```

---

## 2. Table Schema Operations (DDL)

```sql
-- Create table with constraints
CREATE TABLE IF NOT EXISTS students (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    full_name     VARCHAR(100) NOT NULL,
    email         VARCHAR(150) NOT NULL UNIQUE,
    age           INT NOT NULL CHECK (age >= 5),
    grade_level   INT NOT NULL DEFAULT 9,
    enrolled_date DATE NOT NULL,
    is_active     BOOLEAN NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Show all tables in active database
SHOW TABLES;

-- Inspect columns and data types
DESCRIBE students;

-- Delete table completely
DROP TABLE IF EXISTS students;

-- Truncate table (Instant wipe + reset AUTO_INCREMENT)
TRUNCATE TABLE students;
```

---

## 3. Data Manipulation: CRUD (DML)

### Create (INSERT)
```sql
-- Insert single row
INSERT INTO students (full_name, email, age, enrolled_date)
VALUES ('Aisha Siddiq', 'aisha@srinagar.edu.in', 15, '2025-08-15');

-- Batch insert multiple rows
INSERT INTO students (full_name, email, age, enrolled_date) VALUES
('Bilal Mansoor', 'bilal@srinagar.edu.in', 15, '2025-08-15'),
('Fatima Zahra', 'fatima@srinagar.edu.in', 16, '2025-08-16');
```

### Read (SELECT)
```sql
-- Select specific columns with aliases
SELECT id, full_name AS student_name, grade_level 
FROM students 
WHERE grade_level = 9 AND is_active = TRUE
ORDER BY full_name ASC 
LIMIT 10 OFFSET 0;
```

### Update (UPDATE)
```sql
-- Selective update (ALWAYS use WHERE!)
UPDATE students 
SET email = 'new.email@srinagar.edu.in', grade_level = 10 
WHERE id = 1;
```


### Delete (DELETE)
```sql
-- Selective delete (ALWAYS use WHERE!)
DELETE FROM students 
WHERE id = 5;
```

---

## 4. SQL JOINs Matrix

```sql
-- INNER JOIN: Only rows existing in BOTH tables
SELECT s.full_name, c.course_name
FROM students s
INNER JOIN courses c ON s.course_id = c.id;

-- LEFT JOIN: Keeps ALL left rows, fills missing right columns with NULL
SELECT s.full_name, c.course_name
FROM students s
LEFT JOIN courses c ON s.course_id = c.id;

-- Anti-Join: Find students with NO course enrolled
SELECT s.full_name
FROM students s
LEFT JOIN courses c ON s.course_id = c.id
WHERE c.id IS NULL;
```

---

## 5. Aggregate Functions & Grouping

```sql
SELECT 
    grade_level,
    COUNT(*) AS total_students,
    ROUND(AVG(age), 1) AS average_age,
    MIN(enrolled_date) AS earliest_enrollment
FROM students
WHERE is_active = TRUE
GROUP BY grade_level
HAVING COUNT(*) >= 10
ORDER BY total_students DESC;
```

---

## 6. Security & Ethical Checklist (*Amānah*)

- [ ] **Parameterized Statements**: Always use PDO prepared statements in PHP (`$stmt->prepare("SELECT ... WHERE email = ?")`). Never concatenate raw `$_POST` strings into SQL!
- [ ] **Password Hashing**: Never store plain-text passwords in `VARCHAR`. Always use `password_hash()` in PHP and store the 60+ character hash.
- [ ] **No Floating-Point Money**: Always declare financial and Zakat balances as `DECIMAL(10, 2)`, never `FLOAT` or `DOUBLE`.
- [ ] **Granular Permissions**: Restrict web application MySQL users to `SELECT`, `INSERT`, `UPDATE`, `DELETE`. Never grant `DROP` permissions to production web application accounts!
