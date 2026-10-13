# Chapter 8: INSERT INTO — Adding Records

> **Key Idea**: `INSERT INTO` adds new rows to a table. You name the table, list the columns you are filling, and give the values in the same order.

---

## 🌟 Real-Life Story

On the first day of term, the school secretary fills in a new line in the register for each new student: name, grade, class, city. She does not redraw the register. She just adds lines. `INSERT INTO` is that pen: it writes new lines into a table that already exists.

## 🎯 What You Will Learn

- Write an `INSERT INTO ... VALUES` statement.
- Know when to use quotes and when not to.
- Skip `AUTO_INCREMENT` and `DEFAULT` columns.
- Add many rows with one statement.
- Fill all five `school_db` tables with the data used in the rest of this book.

---

## 🧩 The Shape of `INSERT INTO`

<div align="center" style="margin: 2rem 0;">
  <img src="../assets/diagrams/mysql/crud-lifecycle.svg" alt="The 4 CRUD Operations in SQL" style="max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
</div>

**CRUD** stands for **C**reate, **R**ead, **U**pdate, **D**elete: the four jobs every app does with data. `INSERT` is the **C**.

```sql
INSERT INTO table_name (column1, column2, column3)
VALUES (value1, value2, value3);
```

Four rules:

1. The values must be in the **same order** as the columns.
2. Text and dates go inside **single quotes**: `'Lahore'`, `'2026-09-02'`.
3. Numbers have **no quotes**: `8`, `3.90`.
4. You may leave out a column that has `AUTO_INCREMENT` or a `DEFAULT`. MySQL fills it in.

---

## ➕ Adding One Row

Make sure `school_db` is active (`USE school_db;`), then add the first class:

```sql
INSERT INTO classes (name, teacher)
VALUES ('Grade 7 Falcons', 'Ms. Hafsa');
```

```
Query OK, 1 row affected
```

We did not give an `id`. MySQL chose one. To see which number it used:

```sql
SELECT LAST_INSERT_ID();
```

| LAST_INSERT_ID() |
| ---: |
| 1 |

This is handy in apps: right after adding a student, you can learn their new id.

---

## 📦 Adding Many Rows at Once

Put several sets of brackets after `VALUES`, separated by commas:

```sql
INSERT INTO classes (name, teacher) VALUES
  ('Grade 8 Eagles', 'Mr. Imran'),
  ('Grade 9 Hawks',  'Ms. Noor');
```

```
Query OK, 2 rows affected
Records: 2  Duplicates: 0  Warnings: 0
```

One statement with many rows is faster than many separate statements. The server does the work in one trip.

Let us look at the table. (`SELECT * FROM` means "show every column of"; Chapter 9 explains it.)

```sql
SELECT * FROM classes;
```

| id | name | teacher |
| ---: | :--- | :--- |
| 1 | Grade 7 Falcons | Ms. Hafsa |
| 2 | Grade 8 Eagles | Mr. Imran |
| 3 | Grade 9 Hawks | Ms. Noor |

---

## 🏫 Filling `school_db`

Here is the full data for the other four tables. The rest of this book uses exactly these rows, so type them carefully (or copy them once you have typed a few yourself).

```sql
INSERT INTO students (name, grade, gpa, class_id, city) VALUES
  ('Zayd',    8, 3.90, 2, 'Lahore'),
  ('Maryam',  7, 3.75, 1, 'Karachi'),
  ('Bilal',   9, 3.95, 3, 'Lahore'),
  ('Fatima',  8, 3.85, 2, 'Islamabad'),
  ('Tariq',   9, 3.60, 3, 'Karachi'),
  ('Aisha',   7, 3.40, 1, 'Lahore'),
  ('Hamza',   8, 3.20, 2, 'Peshawar'),
  ('Khadija', 9, 3.70, 3, 'Islamabad');

INSERT INTO books (title, category, pages, available) VALUES
  ('Clean Code',                'Programming',      464, 'Yes'),
  ('Algorithm Design',          'Computer Science', 320, 'Yes'),
  ('Ethical Technology',        'Ethics',           210, 'No'),
  ('HTML & CSS Architecture',   'Web',              288, 'Yes'),
  ('Python Data Science',       'Data',             352, 'No'),
  ('Digital Stewardship',       'Ethics',           180, 'Yes'),
  ('Introduction to Networks',  'Computer Science', 240, 'Yes'),
  ('Arabic Calligraphy Basics', 'Art',              120, 'Yes');

INSERT INTO loans (student_id, book_id, loan_date, returned) VALUES
  (1, 1, '2026-09-02', 'Yes'), (1, 2, '2026-09-20', 'No'),
  (2, 4, '2026-09-05', 'Yes'), (3, 2, '2026-09-08', 'Yes'),
  (3, 7, '2026-09-25', 'No'),  (4, 6, '2026-09-10', 'Yes'),
  (5, 3, '2026-09-12', 'No'),  (6, 1, '2026-09-28', 'No'),
  (8, 5, '2026-09-15', 'Yes'), (8, 6, '2026-10-01', 'No');

INSERT INTO donations (donor, amount, cause, donated_on) VALUES
  ('Ahmad',   1500, 'Books',       '2026-09-01'),
  ('Sara',    5000, 'Clean Water', '2026-09-03'),
  ('Ibrahim', 2500, 'Food Pantry', '2026-09-07'),
  ('Hafsa',   3000, 'Books',       '2026-09-12'),
  ('Yusuf',   8000, 'Clean Water', '2026-09-18'),
  ('Zainab',  4500, 'Food Pantry', '2026-09-21'),
  ('Omar',    1000, 'Books',       '2026-09-26'),
  ('Layla',   2000, 'Clean Water', '2026-10-02');
```

Each statement reports how many rows it added, for example `Query OK, 8 rows affected`.

A `loans` row like `(1, 2, '2026-09-20', 'No')` reads: *student 1 (Zayd) borrowed book 2 (Algorithm Design) on 20 September 2026 and has not returned it yet.*

> 🧪 **Sandbox note:** The SQL Sandbox already contains these exact rows. Its **Reset** button puts them back if you change anything.

---

## 🕳️ Leaving Columns Out

You do not have to fill every column:

```sql
INSERT INTO students (name, grade) VALUES ('Yusuf', 6);
```

| id | name | grade | gpa | class_id | city |
| ---: | :--- | ---: | ---: | ---: | :--- |
| 9 | Yusuf | 6 | NULL | NULL | NULL |

The columns we skipped became `NULL`, which means "no value yet". A `NOT NULL` column without a default could not be skipped like this. 

> 💡 Later chapters show results for the **original** rows only (8 students, 8 books). Try the examples in this section in the [SQL Sandbox](../studios/sql-sandbox/) and press **Reset** afterwards, so your data matches the book.

### Text that contains an apostrophe

A title like *Children's Science Atlas* has a `'` inside it. Write it twice:

```sql
INSERT INTO books (title, category, pages, available)
VALUES ('Children''s Science Atlas', 'Science', 96, 'Yes');
```

MySQL stores `Children's Science Atlas`.

---

## ⚠️ Common Mistake

**Mistake 1: the counts do not match.**

```sql
INSERT INTO students (name, grade, city) VALUES ('Zayd', 8);
```

```
ERROR 1136 (21S01): Column count doesn't match value count at row 1
```

Three columns but two values. **Fix:** give a value for every column you listed.

**Mistake 2: forgetting quotes.**

```sql
INSERT INTO students (name, grade, city) VALUES (Bilal, 9, 'Lahore');
```

```
ERROR 1054 (42S22): Unknown column 'Bilal' in 'field list'
```

Without quotes, MySQL thinks `Bilal` is a column name. **Fix:** `'Bilal'`.

Dates without quotes are sneakier. `2026-09-02` is read as a sum: 2026 − 9 − 2 = 2015. Strict mode gives `ERROR 1292: Incorrect date value: '2015'`. Relaxed XAMPP saves `0000-00-00` with only a warning. **Fix:** `'2026-09-02'`.

---

## ✍️ Try It

Open the [SQL Sandbox](../studios/sql-sandbox/). Add yourself as a donor to the *Books* cause:

```sql
INSERT INTO donations (donor, amount, cause, donated_on)
VALUES ('Your Name', 500, 'Books', '2026-10-13');
```

Then run `SELECT * FROM donations;` and find your row at the bottom. Which id did it get?

*Hint: there were 8 donations, so the next id is...*

---

## 📝 Recap

- `INSERT INTO table (columns) VALUES (values);` adds a row.
- Values must match the columns in number and order.
- Text and dates need single quotes; numbers do not.
- Skip `AUTO_INCREMENT` and `DEFAULT` columns; skipped nullable columns become `NULL`.
- Many rows can go in one `INSERT`, separated by commas.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which statement adds new rows to a table?
2. Must you give a value for an `AUTO_INCREMENT` column?
3. Which quotes go around text values?

<details>
<summary>Show answer</summary>

1. `INSERT INTO`
2. No. MySQL fills it in automatically.
3. Single quotes, like `'Lahore'`.

</details>

### 🟡 Level 2: Apply
Add two new books to `books` in **one** statement:
- *Islamic Ethics for Coders*, category Ethics, 150 pages, available
- *Web Engineering Fundamentals*, category Web, 300 pages, available

<details>
<summary>Show answer</summary>

```sql
INSERT INTO books (title, category, pages, available) VALUES
  ('Islamic Ethics for Coders',    'Ethics', 150, 'Yes'),
  ('Web Engineering Fundamentals', 'Web',    300, 'Yes');
```

MySQL replies `Query OK, 2 rows affected`.

</details>

### 🔴 Level 3: Challenge
This statement fails. Find **three** problems, explain each, and write the fixed version.

```sql
INSERT INTO loans (student_id, book_id, loan_date, returned)
VALUES (7, 8, 2026-10-05);
```

<details>
<summary>Show one possible answer</summary>

1. Four columns but only three values (`returned` is missing) → error 1136.
2. The date has no quotes, so it becomes the sum 2015.
3. Even if it ran, `returned` would have no value. A new loan should say `'No'`.

```sql
INSERT INTO loans (student_id, book_id, loan_date, returned)
VALUES (7, 8, '2026-10-05', 'No');
```

This records Hamza (student 7) borrowing *Arabic Calligraphy Basics* (book 8).

</details>
