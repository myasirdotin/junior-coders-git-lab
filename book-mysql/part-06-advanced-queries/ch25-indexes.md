# Chapter 25: Indexes — Making Searches Fast

> **Key Idea**: An index is a sorted list of one column's values, with a pointer to each row. MySQL uses it to jump straight to the rows it needs instead of reading the whole table. Indexes make searches fast, but every index also makes saving data a little slower.

---

## 🌟 Real-Life Story

You want to read about "photosynthesis" in a 400-page science book. You could turn every page from the start until you find it. Or you could open the **index** at the back, find "photosynthesis … 212" in a list sorted A to Z, and jump straight to page 212. The book did not change. It just has an extra sorted list that points into it. A database index is exactly that list.

## 🎯 What You Will Learn

- Explain what an index is, using the book-index idea, and why the primary key already has one.
- Create and remove indexes with `CREATE INDEX`, `CREATE UNIQUE INDEX` and `DROP INDEX`.
- Use a composite (two-column) index and follow the left-most rule.
- Decide when an index helps and what it costs.
- Check whether MySQL uses an index with `EXPLAIN` and `SHOW INDEX FROM`.

---

## Why Searches Get Slow

Our `school_db` has 8 students and 10 loans. Every query feels instant. Now imagine the school after ten years: **2,000 students** and **50,000 loans**. The examples in this chapter use a test copy of `school_db` filled with that many sample rows.

Find every loan of student 42:

```sql
SELECT * FROM loans WHERE student_id = 42;
```

Without help, MySQL must read **all 50,000 rows** and test each one. That is called a **full table scan**. It is like reading the science book from page 1 every time you look something up.

---

## What an Index Is

An **index** is a separate, sorted list of one column's values. Each entry points to the row it came from. Here are the first six loans and an index on `book_id`:

```
loans table          index on book_id
┌────┬─────────┐     ┌─────────┬────┐
│ id │ book_id │     │ book_id │ id │
├────┼─────────┤     ├─────────┼────┤
│ 1  │ 1       │     │ 1       │ 1  │
│ 2  │ 2       │     │ 2       │ 2  │
│ 3  │ 4       │     │ 2       │ 4  │
│ 4  │ 2       │     │ 4       │ 3  │
│ 5  │ 7       │     │ 6       │ 6  │
│ 6  │ 6       │     │ 7       │ 5  │
└────┴─────────┘     └─────────┴────┘
```

To find the loans of book 2, MySQL looks in the sorted list, finds both 2s side by side, and follows the pointers to rows 2 and 4. It never reads the other rows.

Because the list is sorted, MySQL can find a value by halving the search again and again, like looking up a word in a dictionary. For 50,000 rows that takes about 16 halving steps (2¹⁶ = 65,536), not 50,000 checks.

MySQL keeps this list in a tree shape called a **B-tree** ("balanced tree"). You will see the word `BTREE` in the output later. You do not need to build or update the tree yourself. MySQL keeps it correct every time a row is added, changed or deleted.

### You already have indexes

- Every **primary key** is an index. That is why `WHERE id = 42` is always fast.
- Every `UNIQUE` rule (Chapter 7) is an index. To check "no repeats" quickly, MySQL needs a sorted list. That is why Chapter 8 removed a unique rule with `DROP INDEX`.
- A **foreign key** (Chapter 16) gets an index automatically in MySQL's usual storage engine (InnoDB), if you did not make one.

---

## Creating an Index: `CREATE INDEX`

```sql
CREATE INDEX idx_loans_student ON loans (student_id);
```

Read it as: "make an index called `idx_loans_student` on the `student_id` column of `loans`". The name is your choice. Starting with `idx_` plus the table and column makes it easy to recognise.

Nothing else changes. Your queries stay exactly the same. MySQL decides by itself when to use the index.

> 💡 `ALTER TABLE loans ADD INDEX idx_loans_student (student_id);` does the same job, using the `ALTER TABLE` command from Chapter 8.

### A unique index

`CREATE UNIQUE INDEX` makes a fast list **and** a "no repeats" rule:

```sql
CREATE UNIQUE INDEX uq_books_title ON books (title);
```

This works, because no two book titles are the same. A unique index on `students.city` would fail, because three students live in Lahore:

```sql
CREATE UNIQUE INDEX uq_city ON students (city);
-- ERROR 1062 (23000): Duplicate entry 'Lahore' for key 'uq_city'
```

### Removing an index: `DROP INDEX`

```sql
DROP INDEX uq_books_title ON books;
```

In MySQL you must say which table (`ON books`). Dropping an index removes only the sorted list. **No rows are deleted.** You cannot drop the primary key this way.

---

## Is My Index Used? `EXPLAIN`

Put `EXPLAIN` in front of a `SELECT`. MySQL does not run the query. It shows its **plan**: how it would find the rows.

**Before** the index (on the 50,000-row test copy):

```sql
EXPLAIN SELECT * FROM loans WHERE student_id = 42;
```

| table | type | possible_keys | key | rows |
| :--- | :--- | :--- | :--- | ---: |
| loans | ALL | NULL | NULL | 50165 |

**After** `CREATE INDEX idx_loans_student ON loans (student_id);`:

| table | type | possible_keys | key | rows |
| :--- | :--- | :--- | :--- | ---: |
| loans | ref | idx_loans_student | idx_loans_student | 25 |

From reading about 50,000 rows down to about 25. The query gives the same 25 loans either way; only the work changes.

How to read the most useful columns:

| Column | Means |
| :--- | :--- |
| `type` | how rows are found. `ALL` = full table scan (slow on big tables). `const`, `ref`, `range` = an index is used |
| `possible_keys` | indexes that could help |
| `key` | the index MySQL actually chose (`NULL` = none) |
| `rows` | MySQL's **estimate** of rows it must read |

Searching by the primary key shows the best plan of all:

```sql
EXPLAIN SELECT * FROM loans WHERE id = 42;
```

| table | type | possible_keys | key | rows |
| :--- | :--- | :--- | :--- | ---: |
| loans | const | PRIMARY | PRIMARY | 1 |

> 💡 **Your output will have more columns** (`id`, `select_type`, `key_len`, `ref`, `Extra`...) and they differ a little between MySQL and MariaDB versions. The `rows` numbers are estimates, so yours may differ too. Look for `type`, `key` and `rows` first.

### Tiny tables: MySQL may skip the index

On the real 8-row `students` table with an index on `city`:

```sql
CREATE INDEX idx_students_city ON students (city);
EXPLAIN SELECT name FROM students WHERE city = 'Lahore';
```

| table | type | possible_keys | key | rows |
| :--- | :--- | :--- | :--- | ---: |
| students | ALL | idx_students_city | NULL | 8 |

`possible_keys` lists the index, but `key` is `NULL`. For 8 rows, reading them all is quicker than using the index, and MySQL knows it. That is normal. Indexes matter on **big** tables.

Remove this test index again, so the Try It below starts clean:

```sql
DROP INDEX idx_students_city ON students;
```

---

## Listing Indexes: `SHOW INDEX FROM`

```sql
SHOW INDEX FROM loans;
```

On the test copy, after we also added `CREATE INDEX idx_loans_date ON loans (loan_date);` (main columns only):

| Table | Non_unique | Key_name | Seq_in_index | Column_name | Index_type |
| :--- | ---: | :--- | ---: | :--- | :--- |
| loans | 0 | PRIMARY | 1 | id | BTREE |
| loans | 1 | idx_loans_student | 1 | student_id | BTREE |
| loans | 1 | idx_loans_date | 1 | loan_date | BTREE |

- `Non_unique` = `0` means repeats are not allowed (primary key or unique index).
- `Seq_in_index` is the column's position inside the index. It matters for the next section.

---

## Composite Indexes and the Left-Most Rule

A **composite index** covers two or more columns, in a fixed order:

```sql
CREATE INDEX idx_city_grade ON students (city, grade);
```

| Key_name | Seq_in_index | Column_name |
| :--- | ---: | :--- |
| idx_city_grade | 1 | city |
| idx_city_grade | 2 | grade |

Think of a school phone list sorted by **city**, and inside each city by **grade**. It helps you find "Lahore, grade 9" quickly. It also helps with "everyone in Lahore". But "everyone in grade 9" is spread through every city, so the list is no help.

That is the **left-most rule**: an index can be used when the query filters on its **first** column (and then optionally the next ones, in order).

On the 2,000-student test copy:

| Query filters on | Uses `idx_city_grade`? | type | rows |
| :--- | :--- | :--- | ---: |
| `city = 'Lahore' AND grade = 9` | yes, both columns | ref | 67 |
| `city = 'Lahore'` | yes, first column | ref | 333 |
| `grade = 9` | **no**, skips the first column | ALL | 2000 |

The order of the conditions inside `WHERE` does not matter. `grade = 9 AND city = 'Lahore'` uses the index too. The order of columns **in the index** is what matters. Put the column you filter on most often first.

---

## When Indexes Help, and What They Cost

**Indexes help** on big tables with columns used in:

- `WHERE` (`WHERE student_id = 42`, `WHERE loan_date >= '2026-10-01'`)
- `JOIN ... ON` (the linking columns, such as `loans.student_id`)
- `ORDER BY` (with an index on `loan_date`, `ORDER BY loan_date DESC LIMIT 10` reads just 10 index entries instead of sorting 50,000 rows)
- `LIKE 'Clean%'` with a known start (Chapter 22), but **not** `LIKE '%Clean%'`

Here is the join from earlier chapters on the test copy, before and after the index on `loans.student_id`:

```sql
EXPLAIN SELECT s.name, l.loan_date
FROM students s
JOIN loans l ON l.student_id = s.id
WHERE s.id = 42;
```

| Index on `loans.student_id`? | loans: type | loans: rows |
| :--- | :--- | ---: |
| no | ALL | 50165 |
| yes | ref | 25 |

**Indexes cost**:

- **Slower writes.** Every `INSERT`, `UPDATE` or `DELETE` must also update every index on that table. Ten indexes = ten extra lists to keep sorted.
- **Disk space.** Each index is stored next to the table.
- **No help on small tables**, as we saw with 8 students.
- **Little help on columns with few different values.** `returned` only holds `'Yes'` or `'No'`. An index on it alone still leaves half the table to read.

A good habit: start with the primary key and foreign keys. Add an index when a real query on a big table is slow, and check with `EXPLAIN` that it helps.

---

## ⚠️ Common Mistake

**Mistake 1: wrapping the indexed column in a function.**

Chapter 23 taught `YEAR()`. With an index on `loan_date`, this looks fine:

```sql
EXPLAIN SELECT id FROM loans WHERE YEAR(loan_date) = 2025;
```

| type | key | rows |
| :--- | :--- | ---: |
| index | idx_loans_date | 50165 |

MySQL must work out `YEAR()` for **every** entry, so it reads all 50,165 of them. The index is sorted by date, not by year.

**Fixed version:** leave the column bare and give a date range (the `>=` / `<` habit from Chapter 23):

```sql
EXPLAIN SELECT id FROM loans
WHERE loan_date >= '2025-01-01' AND loan_date < '2026-01-01';
```

| type | key | rows |
| :--- | :--- | ---: |
| range | idx_loans_date | 5110 |

Same answer, about a tenth of the reading.

**Mistake 2: "indexes are good, so index every column".** Each extra index slows every save and takes space. Index the columns your real queries search, join or sort by. Nothing more.

---

## ✍️ Try It

In phpMyAdmin on XAMPP (or the Sandbox), run `SHOW INDEX FROM students;`. Then create an index on `students.city`, run `SHOW INDEX FROM students;` again and spot the new row. Finally remove it.

*Hint: `CREATE INDEX idx_students_city ON students (city);` then `DROP INDEX idx_students_city ON students;`. In the Sandbox, write `DROP INDEX idx_students_city;` without `ON`, and use `PRAGMA index_list(students);` instead of `SHOW INDEX`.*

> 🧪 **Sandbox note:** SQLite has `CREATE INDEX` and `CREATE UNIQUE INDEX` too. Its plan command is `EXPLAIN QUERY PLAN`, and the answer reads like a sentence: `SCAN students` (full scan) or `SEARCH students USING INDEX idx_students_city (city=?)`. SQLite may use the index even on 8 rows.

---

## 📝 Recap

- An index is a sorted list of a column's values with pointers to the rows, like the index at the back of a book.
- The primary key, every `UNIQUE` rule and every foreign key already have one.
- `CREATE INDEX name ON table (col)`, `CREATE UNIQUE INDEX ...`, `DROP INDEX name ON table`, `SHOW INDEX FROM table`.
- A composite index `(a, b)` helps queries on `a`, or `a` and `b`, but not `b` alone (left-most rule).
- `EXPLAIN` shows the plan: `type ALL` with `key NULL` means a full scan.
- Indexes speed up reading big tables but slow down writing. Do not wrap an indexed column in a function.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which index does every table with a primary key already have?
2. In `EXPLAIN` output, what do `type = ALL` and `key = NULL` together tell you?
3. A table has `INDEX (city, grade)`. Which of these can use it: (a) `WHERE city = 'Karachi'`, (b) `WHERE grade = 8`, (c) `WHERE grade = 8 AND city = 'Karachi'`?

<details>
<summary>Show answer</summary>

1. The primary key index (shown as `PRIMARY` in `SHOW INDEX`).
2. MySQL will read every row (a full table scan) and use no index.
3. (a) and (c). (b) skips the first column, `city`, so the left-most rule says no. In (c) the order inside `WHERE` does not matter.

</details>

### 🟡 Level 2: Apply
The charity club often runs `SELECT ... FROM donations WHERE cause = 'Books'`, and no two classes may ever have the same name.

1. Create an index that helps the donations query.
2. Make class names unique with an index.
3. Check the `classes` indexes, then remove the donations index.

<details>
<summary>Show answer</summary>

```sql
CREATE INDEX idx_donations_cause ON donations (cause);

CREATE UNIQUE INDEX uq_classes_name ON classes (name);

SHOW INDEX FROM classes;

DROP INDEX idx_donations_cause ON donations;
```

`SHOW INDEX FROM classes` (main columns):

| Table | Non_unique | Key_name | Column_name |
| :--- | ---: | :--- | :--- |
| classes | 0 | PRIMARY | id |
| classes | 0 | uq_classes_name | name |

`Non_unique = 0` on `uq_classes_name` shows that repeats are now refused.

</details>

### 🔴 Level 3: Challenge
On the 50,000-loan test copy, the overdue report from Chapter 23 is slow:

```sql
SELECT id, student_id FROM loans
WHERE returned = 'No'
  AND DATE_ADD(loan_date, INTERVAL 14 DAY) < '2026-10-13';
```

1. Run `EXPLAIN` and say what you expect to see with no extra indexes.
2. Create one composite index that suits **both** conditions. Which column goes first, and why?
3. The date condition wraps `loan_date` in a function. Rewrite it so `loan_date` stands alone.
4. Explain what `EXPLAIN` should show after steps 2 and 3.

<details>
<summary>Show one possible answer</summary>

1. A full scan:

| type | key | rows |
| :--- | :--- | ---: |
| ALL | NULL | 50165 |

2. `returned` is compared with `=` and `loan_date` with `<`, so put the exact match first:

```sql
CREATE INDEX idx_returned_date ON loans (returned, loan_date);
```

The index is sorted by `returned`, and inside "No" by `loan_date`, so all the "No" loans with early dates sit together.

3. "Due date before 13 October" is the same as "loan date before 13 October minus 14 days":

```sql
SELECT id, student_id FROM loans
WHERE returned = 'No'
  AND loan_date < DATE_SUB('2026-10-13', INTERVAL 14 DAY);
```

4. On the test copy:

| Version | type | key | rows |
| :--- | :--- | :--- | ---: |
| original query, new index | ref | idx_returned_date | 5000 |
| rewritten query, new index | range | idx_returned_date | 4973 |

With the original query, only the `returned` part of the index can be used. The rewrite lets MySQL use both columns. In this test copy most "No" loans are old, so the numbers are close. In a real library most old loans are returned, and the gap is much bigger. Your exact numbers depend on your data.

</details>
