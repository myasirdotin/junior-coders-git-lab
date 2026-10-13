# Chapter 13: The DELETE Statement & TRUNCATE

> **Key Idea**: `DELETE` removes chosen rows from a table. `TRUNCATE` empties a whole table quickly. `DROP` throws away the table itself. Many real apps prefer a "soft delete", which hides a row instead of destroying it.

---

## 🌟 Real-Life Story

At the end of term, the librarian tidies her borrowing notebook. She crosses out only the old lines for books that came back long ago. She does not tear out every page, and she certainly does not throw the notebook in the bin. Crossing out chosen lines is `DELETE ... WHERE`. Tearing out every page is `TRUNCATE`. Binning the notebook is `DROP`.

## 🎯 What You Will Learn

- Remove chosen rows with `DELETE FROM ... WHERE`.
- Use "SELECT first" before deleting.
- Explain the difference between `DELETE`, `TRUNCATE` and `DROP`.
- See how `AUTO_INCREMENT` numbers behave after deleting.
- Use the soft delete pattern to keep records safe (*Amānah*).

---

## 🗑️ The Shape of `DELETE`

```sql
DELETE FROM table_name
WHERE condition;
```

There is no column list. `DELETE` always removes **whole rows**. To clear just one value, use `UPDATE ... SET column = NULL` instead.

Like `UPDATE`, **`DELETE` without `WHERE` removes every row.**

---

## 🎯 Deleting One Row

Omar's donation (id 7) was entered by mistake. First, look:

```sql
SELECT id, donor, amount FROM donations WHERE id = 7;
```

| id | donor | amount |
| ---: | :--- | ---: |
| 7 | Omar | 1000 |

Then delete with the **same** `WHERE`:

```sql
DELETE FROM donations WHERE id = 7;
```

```
Query OK, 1 row affected
```

Check:

```sql
SELECT id, donor FROM donations;
```

| id | donor |
| ---: | :--- |
| 1 | Ahmad |
| 2 | Sara |
| 3 | Ibrahim |
| 4 | Hafsa |
| 5 | Yusuf |
| 6 | Zainab |
| 8 | Layla |

Number 7 is gone, and there is now a gap. That is normal. The next new donation does **not** fill the gap; it gets id 9.

A `WHERE` that matches nothing is harmless: `DELETE FROM students WHERE id = 99;` says `Query OK, 0 rows affected`.

---

## 📚 Deleting Several Rows

The librarian removes old, finished loans: returned **and** borrowed before 10 September.

```sql
DELETE FROM loans
WHERE returned = 'Yes' AND loan_date < '2026-09-10';
```

```
Query OK, 3 rows affected
```

```sql
SELECT * FROM loans;
```

| id | student_id | book_id | loan_date | returned |
| ---: | ---: | ---: | :--- | :--- |
| 2 | 1 | 2 | 2026-09-20 | No |
| 5 | 3 | 7 | 2026-09-25 | No |
| 6 | 4 | 6 | 2026-09-10 | Yes |
| 7 | 5 | 3 | 2026-09-12 | No |
| 8 | 6 | 1 | 2026-09-28 | No |
| 9 | 8 | 5 | 2026-09-15 | Yes |
| 10 | 8 | 6 | 2026-10-01 | No |

Loans 1, 3 and 4 were removed. Loan 6 (10 September) stayed, because `<` means "strictly before".

---

## ⚖️ `DELETE` vs `TRUNCATE` vs `DROP`

| Command | What it does | Ids start again at 1? | Can be undone in a transaction? |
| :--- | :--- | :--- | :--- |
| `DELETE FROM t WHERE ...` | removes matching rows | No | Yes (Chapter 14) |
| `TRUNCATE TABLE t;` | removes **all** rows, keeps the empty table | Yes | No |
| `DROP TABLE t;` | removes rows **and** the table's plan | table is gone | No |

```
DELETE   → cross out some lines
TRUNCATE → tear out every page,
           keep the empty notebook
DROP     → bin the whole notebook
```

See the difference in numbering. After `TRUNCATE TABLE donations;` and one new insert:

| id | donor |
| ---: | :--- |
| 1 | Sara |

The counter restarted at 1. After a `DELETE`, it would have carried on (9, 10, 11...).

`TRUNCATE` is very fast on huge tables, because it does not remove rows one by one. Use it only for scratch tables you truly want empty.

> 🧪 **Sandbox note:** SQLite has no `TRUNCATE`. Use `DELETE FROM t;` there (it empties the table). Press **Reset** afterwards.

---

## 🤲 The Soft Delete Pattern (*Amānah*)

School records are a trust. A student who leaves still has a history: books borrowed, marks earned. Destroying those rows can break other tables and loses the truth.

So many apps use a **soft delete**: they mark the row as deleted instead of removing it.

1. Add a flag column. (`ALTER TABLE` changes an existing table's plan; here it adds one column.)

   ```sql
   ALTER TABLE students
   ADD COLUMN is_deleted BOOLEAN NOT NULL DEFAULT FALSE;
   ```

2. When Tariq (id 5) leaves, "soft delete" him:

   ```sql
   UPDATE students SET is_deleted = TRUE WHERE id = 5;
   ```

3. Normal pages only show rows that are not deleted:

   ```sql
   SELECT id, name FROM students WHERE is_deleted = FALSE;
   ```

| id | name |
| ---: | :--- |
| 1 | Zayd |
| 2 | Maryam |
| 3 | Bilal |
| 4 | Fatima |
| 6 | Aisha |
| 7 | Hamza |
| 8 | Khadija |

Why this is the ethical choice:

- A mistaken click can be undone: set `is_deleted` back to `FALSE`.
- The history stays true and can be checked later (*Ṣidq*, truthfulness).
- Rows in other tables, like Tariq's loans, still point to a real student.

But soft delete is not always right. If a family asks the school to **erase** personal data it no longer needs, a real `DELETE` (after checking the rules) respects their privacy. Keep only what you need.

---

## ⚠️ Common Mistake

**Mistake: forgetting `WHERE`.**

```sql
DELETE FROM classes;
```

```
Query OK, 3 rows affected
```

```sql
SELECT * FROM classes;
```

```
Empty set
```

All three classes are gone. MySQL never asked "are you sure?"

**Fixed version:** `SELECT` first, then delete with the same `WHERE`:

```sql
SELECT * FROM classes WHERE id = 3;
DELETE FROM classes WHERE id = 3;
```

Chapter 14 shows two extra safety nets: transactions and safe-updates mode.

---

## ✍️ Try It

In the [SQL Sandbox](../studios/sql-sandbox/):

1. Show all donations under 2000 rupees.
2. Delete them with the same `WHERE`.
3. Show all donations again. How many rows are left? Then press **Reset**.

*Hint: `WHERE amount < 2000`. Two rows match (Ahmad 1500 and Omar 1000), so 6 should be left.*

---

## 📝 Recap

- `DELETE FROM table WHERE condition;` removes whole rows that match.
- Without `WHERE`, every row is deleted, with no warning.
- Deleted ids leave gaps; `AUTO_INCREMENT` keeps counting forward.
- `TRUNCATE` empties a table and restarts ids at 1; `DROP` removes the table itself.
- A soft delete (`is_deleted = TRUE`) hides a row but keeps history safe.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which statement removes chosen rows from a table?
2. What happens with `DELETE FROM students;`?
3. After `TRUNCATE`, what id does the next new row get?

<details>
<summary>Show answer</summary>

1. `DELETE FROM ... WHERE ...`
2. Every student row is deleted. The empty table stays.
3. 1. `TRUNCATE` resets the `AUTO_INCREMENT` counter. (After `DELETE`, numbering would carry on.)

</details>

### 🟡 Level 2: Apply
1. Delete every loan that has been returned.
2. Empty a scratch table called `temp_imports` so that its ids start again at 1.

<details>
<summary>Show answer</summary>

```sql
DELETE FROM loans WHERE returned = 'Yes';

TRUNCATE TABLE temp_imports;
```

On the original data, the first statement removes 5 rows (loans 1, 3, 4, 6 and 9).

</details>

### 🔴 Level 3: Challenge
The library wants to stop showing *Ethical Technology* (book 3) because it is being repaired, but keep its borrowing history.

1. Explain why `DELETE FROM books WHERE id = 3;` is a bad idea here.
2. Design a soft delete for `books`: the column, the "hide" statement and the query for the public catalogue.
3. Write the statement that brings the book back after repair.

<details>
<summary>Show one possible answer</summary>

1. Loan 7 says student 5 borrowed book 3. If book 3 is deleted, that loan points to a book that no longer exists, and the history is broken.
2.
```sql
ALTER TABLE books ADD COLUMN is_hidden BOOLEAN NOT NULL DEFAULT FALSE;

UPDATE books SET is_hidden = TRUE WHERE id = 3;

SELECT id, title FROM books WHERE is_hidden = FALSE;
```

3.
```sql
UPDATE books SET is_hidden = FALSE WHERE id = 3;
```

</details>
