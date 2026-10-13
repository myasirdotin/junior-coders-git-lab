# Chapter 14: Safe Updates, Transactions & Data Protection

> **Key Idea**: Data is a trust (*Amānah*). A transaction groups several changes so they all succeed together or all get cancelled together. Safe-updates mode blocks risky `UPDATE` and `DELETE` statements.

---

## 🌟 Real-Life Story

When Hamza borrows a book, the librarian does two things. She writes a new line in the borrowing notebook, and she moves the book's card from "on shelf" to "out". If the bell rings after the first step, the notebook says Hamza has the book, but the card still says it is on the shelf. The records now disagree. A transaction is like a rule: "finish both steps, or undo the first one".

## 🎯 What You Will Learn

- Explain what a transaction is and why it is "all or nothing".
- Use `START TRANSACTION`, `COMMIT` and `ROLLBACK`.
- Describe the four ACID promises in plain words.
- Turn on safe-updates mode to block `UPDATE`/`DELETE` without a key.
- Know where transactions work (InnoDB, the command line, one phpMyAdmin run).

---

## 🔗 What is a Transaction?

Borrowing a library book needs **two** changes:

1. **Add** a row to `loans`.
2. **Update** the book: `available = 'No'`.

If the computer crashes between steps 1 and 2, the data is half-done. The loan exists, but the catalogue still shows the book as available. Another student might be told it is on the shelf.

A **transaction** wraps several statements into one unit:

- If everything works: **`COMMIT`** saves all the changes for good.
- If anything goes wrong: **`ROLLBACK`** cancels all of them, as if nothing happened.

```
START TRANSACTION;
 ├ 1. INSERT INTO loans ...
 └ 2. UPDATE books ...
        │
   ┌────┴─────┐
   ▼          ▼
COMMIT;    ROLLBACK;
(save all) (undo all)
```

---

## 🧪 A Transaction You Can Watch

Before we start, *Arabic Calligraphy Basics* is on the shelf:

```sql
SELECT id, title, available FROM books WHERE id = 8;
```

| id | title | available |
| ---: | :--- | :--- |
| 8 | Arabic Calligraphy Basics | Yes |

### Try it, then cancel

```sql
START TRANSACTION;

INSERT INTO loans (student_id, book_id, loan_date, returned)
VALUES (7, 8, '2026-10-13', 'No');

UPDATE books SET available = 'No' WHERE id = 8;
```

Inside the transaction, the change is visible to you:

| id | title | available |
| ---: | :--- | :--- |
| 8 | Arabic Calligraphy Basics | No |

Now Hamza changes his mind:

```sql
ROLLBACK;
```

Check again:

| id | title | available |
| ---: | :--- | :--- |
| 8 | Arabic Calligraphy Basics | Yes |

And `SELECT * FROM loans WHERE student_id = 7;` gives `Empty set`. **Both** changes were undone.

### Do it for real

```sql
START TRANSACTION;

INSERT INTO loans (student_id, book_id, loan_date, returned)
VALUES (7, 8, '2026-10-13', 'No');

UPDATE books SET available = 'No' WHERE id = 8;

COMMIT;
```

```sql
SELECT * FROM loans WHERE student_id = 7;
```

| id | student_id | book_id | loan_date | returned |
| ---: | ---: | ---: | :--- | :--- |
| 12 | 7 | 8 | 2026-10-13 | No |

Why id 12 and not 11? The cancelled insert had already used number 11. A rollback undoes the row, not the counter. Gaps again, and that is fine.

### Where transactions work

- Tables must use the **InnoDB** storage engine. It is the default in MySQL and MariaDB, so your `school_db` tables already use it.
- Normally MySQL is in **autocommit** mode: each statement is saved the moment it runs. `START TRANSACTION` pauses that until you `COMMIT` or `ROLLBACK`.
- In **phpMyAdmin**, put the whole transaction in **one** SQL box and press Go once. Each Go is a fresh connection, so a transaction cannot stretch across two clicks. The command line has no such limit.
- `TRUNCATE`, `DROP` and `CREATE TABLE` save immediately and cannot be rolled back.

> 🧪 **Sandbox note:** SQLite writes `BEGIN TRANSACTION;` (or just `BEGIN;`) instead of `START TRANSACTION;`. `COMMIT` and `ROLLBACK` are the same. MySQL also accepts `BEGIN;`.

---

## 🧱 The ACID Promises

A trustworthy database keeps four promises, known by the letters **ACID**:

| Letter | Name | Plain words |
| :--- | :--- | :--- |
| **A** | Atomicity | All steps happen, or none do. (*Atomic* means "cannot be split".) |
| **C** | Consistency | The rules (`NOT NULL`, `UNIQUE`, `CHECK`...) are never broken. |
| **I** | Isolation | Two people working at once do not see each other's half-finished work. |
| **D** | Durability | After `COMMIT`, the data survives a crash or power cut. |

---

## 🦺 Safe-Updates Mode

Chapters 12 and 13 showed how one missing `WHERE` can change every row. MySQL has a guard for this:

```sql
SET sql_safe_updates = 1;
```

Now try a careless update:

```sql
UPDATE students SET grade = 10;
```

```
ERROR 1175 (HY000): You are using safe update mode and you tried
to update a table without a WHERE that uses a KEY column
```

Blocked! A **key column** is an indexed column such as the primary key `id`. This still works:

```sql
DELETE FROM loans WHERE id = 1;
```

Safe mode is strict. Even `DELETE FROM loans WHERE returned = 'Yes';` is blocked, because `returned` is not a key. If you really mean it, turn the guard off for one statement with `SET sql_safe_updates = 0;`, run it carefully, and turn it back on.

The setting lasts until you log out. MySQL Workbench, another MySQL tool, switches it on by default.

> 🧪 **Sandbox note:** SQLite has no safe-updates mode. The sandbox's **Reset** button is your safety net there.

---

## 🤲 Protecting Data Is an *Amānah*

- **Wrap linked changes in a transaction**, so records never disagree.
- **Back up** before big changes (phpMyAdmin → Export).
- **Keep a history** of who changed what and when. Many apps add `updated_at` and `updated_by` columns, so mistakes or misuse can be traced honestly.
- **Give the website's database user only the rights it needs.** A web page should never be able to `DROP` a table.

---

## ⚠️ Common Mistake

**Mistake: forgetting to finish the transaction.**

```sql
START TRANSACTION;
UPDATE books SET available = 'No' WHERE id = 2;
-- ... then the student closes the window
```

What happens: there was no `COMMIT`. When the connection closes, MySQL rolls the change back. The student thinks it was saved, but it was not.

**Fixed version:** always end with `COMMIT;` (to save) or `ROLLBACK;` (to cancel), then check with a `SELECT`.

---

## ✍️ Try It

In the [SQL Sandbox](../studios/sql-sandbox/):

1. Run `BEGIN;`
2. Delete every donation with `DELETE FROM donations;`
3. Run `SELECT * FROM donations;` — empty!
4. Run `ROLLBACK;` and select again.

*Hint: after the rollback all 8 donations are back, without pressing Reset.*

---

## 📝 Recap

- A transaction groups changes: `START TRANSACTION; ... COMMIT;` or `ROLLBACK;`.
- `COMMIT` saves all the changes; `ROLLBACK` cancels all of them.
- ACID = all-or-nothing, rules kept, no interference, safe after commit.
- Use one phpMyAdmin run (or the command line) for a whole transaction.
- `SET sql_safe_updates = 1;` blocks `UPDATE`/`DELETE` that do not use a key column.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. What does `COMMIT` do?
2. What does `ROLLBACK` do?
3. What do the letters of **ACID** stand for?

<details>
<summary>Show answer</summary>

1. It saves every change made since `START TRANSACTION`, permanently.
2. It cancels every change made since `START TRANSACTION`.
3. **A**tomicity, **C**onsistency, **I**solation, **D**urability.

</details>

### 🟡 Level 2: Apply
Fatima (student 4) returns *Digital Stewardship* (book 6) from loan 6. Write a transaction that marks the loan as returned **and** marks the book as available.

<details>
<summary>Show answer</summary>

```sql
START TRANSACTION;

UPDATE loans SET returned = 'Yes' WHERE id = 6;
UPDATE books SET available = 'Yes' WHERE id = 6;

COMMIT;
```

(In the original data, loan 6 is already marked `'Yes'` and book 6 is already available, so MySQL reports `Changed: 0` for both. The pattern is what matters.)

</details>

### 🔴 Level 3: Challenge
The charity club moves Layla's gift (donation 8) from *Clean Water* to *Books*, and records a note in a `donation_changes` table at the same time.

1. Write a transaction with both steps.
2. Say what should happen if the second step fails.
3. Explain why keeping such a change log is part of *Amānah*.

<details>
<summary>Show one possible answer</summary>

```sql
START TRANSACTION;

UPDATE donations SET cause = 'Books' WHERE id = 8;

INSERT INTO donation_changes (donation_id, old_cause, new_cause, changed_on)
VALUES (8, 'Clean Water', 'Books', '2026-10-13');

COMMIT;
```

2. Run `ROLLBACK;` instead of `COMMIT;`. Then the cause is not changed without a record of the change.
3. Donors trusted the club with their money for a cause. A log shows honestly who moved a gift, when and why, so it can be checked later.

</details>
