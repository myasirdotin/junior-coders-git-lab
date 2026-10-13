# Chapter 5: CREATE TABLE and Schema Design

> **Key Idea**: `CREATE TABLE` draws the plan for a table: its column names, the kind of data each holds, and a few rules that keep the data clean.

---

## 🌟 Real-Life Story

Before builders lay a single brick, an architect draws a plan. The plan says where each room goes and how big it is. Nobody starts pouring concrete and "sees what happens". A database table needs a plan too. In SQL, that plan is written with `CREATE TABLE`.

## 🎯 What You Will Learn

- Explain what a schema is.
- Write a `CREATE TABLE` statement with columns, types and rules.
- Build the five tables of `school_db`.
- Check your work with `SHOW TABLES` and `DESCRIBE`.
- Rename or delete a table.

---

## What is a Schema?

A **schema** is the plan of a database: which tables exist, which columns each has, and what rules the data must follow.

When you write `CREATE TABLE`, you tell MySQL three things:

1. **The table's name**, for example `students`.
2. **Its columns**, for example `name`, `grade`, `city`.
3. **The rules**, for example "a name can never be empty".

---

## The Shape of `CREATE TABLE`

```sql
CREATE TABLE table_name (
    column_1  TYPE  rules,
    column_2  TYPE  rules,
    column_3  TYPE  rules
);
```

- Columns go inside round brackets `( )`.
- A comma separates each column from the next.
- **No comma** after the last column.
- A semicolon ends the statement.

A **data type** (or **type**) says what kind of value a column holds. You will meet the full list in Chapter 6. For now, four are enough:

| Type | Holds | Example |
| :--- | :--- | :--- |
| `INT` | whole numbers | `8` |
| `VARCHAR(50)` | text up to 50 characters | `'Lahore'` |
| `DECIMAL(3,2)` | numbers with 2 decimal places | `3.95` |
| `DATE` | a calendar date | `'2026-09-02'` |

---

## Building `school_db`, Step by Step

First choose the database from Chapter 4:

```sql
USE school_db;
```

### Table 1: `classes`

```sql
CREATE TABLE classes (
    id      INT AUTO_INCREMENT PRIMARY KEY,
    name    VARCHAR(50) NOT NULL,
    teacher VARCHAR(50) NOT NULL
);
```

Read each line:

- `id INT AUTO_INCREMENT PRIMARY KEY` — a whole number. `AUTO_INCREMENT` means MySQL fills it in for you: 1, 2, 3... `PRIMARY KEY` means it is unique for every row, like an ID card. Chapter 7 explains both in depth.
- `name VARCHAR(50) NOT NULL` — text up to 50 characters. `NOT NULL` means it can never be left empty.
- `teacher VARCHAR(50) NOT NULL` — the class teacher's name, also required.

### Table 2: `students`

```sql
CREATE TABLE students (
    id       INT AUTO_INCREMENT PRIMARY KEY,
    name     VARCHAR(50) NOT NULL,
    grade    INT,
    gpa      DECIMAL(3,2),
    class_id INT,
    city     VARCHAR(50)
);
```

`grade`, `gpa`, `class_id` and `city` have no `NOT NULL`, so they may be left empty. `class_id` will hold the `id` of the student's class. Chapter 16 turns it into a proper link.

### Tables 3–5: `books`, `loans`, `donations`

```sql
CREATE TABLE books (
    id        INT AUTO_INCREMENT PRIMARY KEY,
    title     VARCHAR(100) NOT NULL,
    category  VARCHAR(50),
    pages     INT,
    available VARCHAR(3)
);

CREATE TABLE loans (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    book_id    INT,
    loan_date  DATE,
    returned   VARCHAR(3)
);

CREATE TABLE donations (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    donor      VARCHAR(50) NOT NULL,
    amount     INT NOT NULL,
    cause      VARCHAR(50) NOT NULL,
    donated_on DATE
);
```

A row in `loans` means **a student borrowed a library book**. `available` and `returned` hold the text `'Yes'` or `'No'`.

> 🧪 **Sandbox note:** The SQL Sandbox (SQLite) already has these five tables. SQLite is relaxed about types and writes `INTEGER PRIMARY KEY` instead of `INT AUTO_INCREMENT PRIMARY KEY`.

---

## Checking Your Work: `SHOW TABLES` and `DESCRIBE`

List the tables in the active database:

```sql
SHOW TABLES;
```

| Tables_in_school_db |
| :--- |
| books |
| classes |
| donations |
| loans |
| students |

Look inside one table's plan:

```sql
DESCRIBE students;
```

| Field | Type | Null | Key | Default | Extra |
| :--- | :--- | :--- | :--- | :--- | :--- |
| id | int(11) | NO | PRI | NULL | auto_increment |
| name | varchar(50) | NO | | NULL | |
| grade | int(11) | YES | | NULL | |
| gpa | decimal(3,2) | YES | | NULL | |
| class_id | int(11) | YES | | NULL | |
| city | varchar(50) | YES | | NULL | |

How to read it:

- **Null = NO** means the column is required (`NOT NULL`).
- **Key = PRI** marks the primary key.
- **Extra = auto_increment** shows MySQL fills in the number.
- `int(11)` is just how MariaDB displays `INT`. The 11 is a display width, not a limit.

---

## Renaming or Deleting a Table

Rename a table:

```sql
RENAME TABLE classes TO school_classes;
```

Delete a table and all its rows (no undo!):

```sql
DROP TABLE IF EXISTS old_practice_table;
```

`IF EXISTS` avoids an error if the table is not there. You can also write `CREATE TABLE IF NOT EXISTS ...` so a script does not fail when the table already exists.

---

## ⚠️ Common Mistake

**Mistake 1: a missing comma between columns.**

```sql
CREATE TABLE books (
    id    INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL
    category VARCHAR(50)
);
```

What happens:

```
ERROR 1064 (42000): You have an error in your SQL syntax; ...
near 'VARCHAR(50))'
```

MySQL reads `NOT NULL category` as one broken phrase. **Fix:** put a comma after `NOT NULL`.

**Mistake 2: creating a table twice.**

```
ERROR 1050 (42S01): Table 'classes' already exists
```

**Fix:** use `CREATE TABLE IF NOT EXISTS classes (...)`, or drop the old one first if you really want to start over.

---

## ✍️ Try It

In phpMyAdmin, select `school_db` and open the **SQL** tab. Type (do not paste) the five `CREATE TABLE` statements above. Then run `SHOW TABLES;` and `DESCRIBE books;`.

*Hint: if you get error 1064, look just before the place it quotes. A comma is usually missing there.*

---

## 📝 Recap

- A **schema** is the plan of the database's tables and rules.
- `CREATE TABLE name ( column TYPE rules, ... );` builds a table.
- Columns are separated by commas, with none after the last one.
- `NOT NULL` makes a column required; `PRIMARY KEY` makes each row unique; `AUTO_INCREMENT` numbers rows for you.
- `SHOW TABLES` lists tables; `DESCRIBE` shows one table's columns.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which command shows the columns and types of a table?
2. What does `NOT NULL` do?
3. What does `AUTO_INCREMENT` do when a new row is added?

<details>
<summary>Show answer</summary>

1. `DESCRIBE table_name;`
2. It makes the column required: the value can never be empty (`NULL`).
3. MySQL gives the new row the next number automatically (1, 2, 3...).

</details>

### 🟡 Level 2: Apply
Write a `CREATE TABLE` for a `science_fair_projects` table:
- `id`: whole number, auto-numbered, primary key
- `title`: text up to 150 characters, required
- `student_name`: text up to 50 characters, required
- `category`: text up to 30 characters
- `fair_date`: a date

<details>
<summary>Show answer</summary>

```sql
CREATE TABLE science_fair_projects (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    title        VARCHAR(150) NOT NULL,
    student_name VARCHAR(50) NOT NULL,
    category     VARCHAR(30),
    fair_date    DATE
);
```

</details>

### 🔴 Level 3: Challenge
The school starts a reading club. Design and create a `club_members` table.

1. Decide on at least four columns (one must be the primary key).
2. Choose a type for each.
3. Decide which columns must be `NOT NULL`.
4. Write the `CREATE TABLE`, run it, and check it with `DESCRIBE`.

<details>
<summary>Show one possible answer</summary>

```sql
CREATE TABLE club_members (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    joined_on  DATE NOT NULL,
    role       VARCHAR(30)
);

DESCRIBE club_members;
```

`student_id` stores the member's id from `students`, so we do not copy their name again. `role` (for example "Book reviewer") is optional. Notice we did not store phone numbers: we only keep what the club needs (*Amānah*).

</details>
