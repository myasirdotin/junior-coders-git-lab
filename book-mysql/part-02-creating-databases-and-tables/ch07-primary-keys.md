# Chapter 7: Primary Keys, Constraints, and Integrity

> **Key Idea**: Constraints are the guardrails of a database. A Primary Key uniquely identifies every row, while constraints prevent duplicate, missing, or illegal values from corrupting your records.

---

## 1. What is a Primary Key?

In any society, every citizen has a unique National Identity Card number or passport number. Even if two people have identical names and birthdays, their government ID distinguishes them completely.

In MySQL, a **Primary Key** fulfills this exact role for table rows:
- Every table should have **exactly one** primary key.
- A primary key value must be **unique** across the entire table.
- A primary key cannot contain `NULL` (it can never be empty).

```
Table: students
┌────┬─────────────────┬──────────────────┐
│ id │ full_name       │ email            │
├────┼─────────────────┼──────────────────┤
│ 1  │ Tariq Siddiq    │ tariq1@email.com │ ◄── PK = 1
│ 2  │ Tariq Siddiq    │ tariq2@email.com │ ◄── PK = 2 (Different student!)
└────┴─────────────────┴──────────────────┘
```

---

## 2. Setting Up a Primary Key with `AUTO_INCREMENT`

In 95% of web applications, developers use a synthetic surrogate key: an integer column called `id` configured with `AUTO_INCREMENT`:

```sql
CREATE TABLE courses (
    id           INT AUTO_INCREMENT,
    course_code  VARCHAR(20) NOT NULL,
    course_name  VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);
```

When inserting data, you do not supply an ID. MySQL calculates and assigns the next number automatically:
- First inserted course gets `id = 1`
- Second inserted course gets `id = 2`
- Third inserted course gets `id = 3`

---

## 3. The Family of Table Constraints

Beyond the primary key, MySQL offers several essential constraints:

### 1. `NOT NULL`
Ensures that a column cannot be left empty. If an application tries to save a record without supplying this field, MySQL rejects the insert:
```sql
full_name VARCHAR(100) NOT NULL
```

### 2. `UNIQUE`
Guarantees that all values in this column are distinct from one another:
```sql
email VARCHAR(150) NOT NULL UNIQUE
```

### 3. `DEFAULT`
Supplies an automatic fallback value if the insertion query does not specify one:
```sql
status VARCHAR(20) NOT NULL DEFAULT 'active',
enrolled_date DATE DEFAULT (CURRENT_DATE)
```

### 4. `CHECK`
Validates that values satisfy a specific logical condition before being saved:
```sql
age INT CHECK (age >= 5 AND age <= 100),
price DECIMAL(8,2) CHECK (price >= 0.00)
```

---

## 4. Complete Schema Demonstration

Notice how all constraints work together to guarantee total data integrity:

```sql
CREATE TABLE IF NOT EXISTS academy_members (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    member_code   VARCHAR(12) NOT NULL UNIQUE,
    full_name     VARCHAR(100) NOT NULL,
    email         VARCHAR(150) NOT NULL UNIQUE,
    age           INT NOT NULL CHECK (age >= 10),
    membership    VARCHAR(20) NOT NULL DEFAULT 'Student',
    dues_paid     DECIMAL(8, 2) NOT NULL DEFAULT 0.00 CHECK (dues_paid >= 0.00),
    is_active     BOOLEAN NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

If anyone attempts to insert a member with an age of `-5` or a negative payment, MySQL refuses to save the corrupted record.

---

## 5. Review & Practice

### 🟢 Level 1: Recall
1. What are the two core rules of a Primary Key?
2. What does `AUTO_INCREMENT` do?
3. What is the difference between a `PRIMARY KEY` and a `UNIQUE` constraint?

### 🟡 Level 2: Constraint Application
Add appropriate constraints to this draft column list for a `teachers` table:
- `id`: primary key, auto increment
- `national_id`: 15-character string, must be unique and cannot be empty
- `full_name`: text up to 100 chars, cannot be empty
- `salary`: decimal number, cannot be negative
- `joining_date`: date, cannot be empty

### 🔴 Level 3: Real-World Reflection
Why is using `AUTO_INCREMENT` integer IDs safer and cleaner than using a student's full name or email address as the primary key?
