# Chapter 7: Primary Keys, Constraints, and Integrity

> **Key Idea**: Constraints are the safety rails of a table. A primary key gives every row a unique ID. Other constraints stop empty, repeated or impossible values from getting in.

---

## 🌟 Real-Life Story

Every student at school gets an ID card with a number. Two students may both be called Fatima, but their card numbers are always different. The office also has rules: every form must have a name, no two students share a card number, and nobody may borrow more than five books. Constraints are those office rules, written into the table so the database checks them every time.

## 🎯 What You Will Learn

- Explain what a primary key is and its two rules.
- Use `AUTO_INCREMENT` to number rows for you.
- Add `NOT NULL`, `UNIQUE`, `DEFAULT` and `CHECK` constraints.
- Read the error MySQL gives when a rule is broken.
- Explain why numeric ids are better keys than names or emails.

---

## 🪪 What is a Primary Key?

A **primary key** is the column that identifies each row. It has two rules:

1. **Unique**: no two rows may have the same value.
2. **Never empty**: it can never be `NULL`.

A table has **one** primary key.

```
students
┌────┬────────┬───────────┐
│ id │ name   │ city      │
├────┼────────┼───────────┤
│ 4  │ Fatima │ Islamabad │ ← PK 4
│ 9  │ Fatima │ Lahore    │ ← PK 9
└────┴────────┴───────────┘
  same name, different id
```

---

## 🔢 `AUTO_INCREMENT`: Numbers For Free

Most tables use a plain number called `id` as the key, with `AUTO_INCREMENT`:

```sql
id INT AUTO_INCREMENT PRIMARY KEY
```

When you add a row without an id, MySQL picks the next number: 1, then 2, then 3. You never have to remember the last number used. All five `school_db` tables use this pattern.

> 💡 Ids may have **gaps**. If an insert fails or a row is deleted, MySQL does not reuse that number. That is normal. An id is a label, not a count.

> 🧪 **Sandbox note:** SQLite writes this as `INTEGER PRIMARY KEY` (optionally `AUTOINCREMENT`, spelled without the underscore).

---

## 🛡️ The Constraint Family

A **constraint** is a rule attached to a column. MySQL checks it on every new or changed row.

| Constraint | Rule | Example |
| :--- | :--- | :--- |
| `NOT NULL` | the value is required | `name VARCHAR(50) NOT NULL` |
| `UNIQUE` | no two rows may repeat it | `card_code VARCHAR(10) UNIQUE` |
| `DEFAULT` | value used when none is given | `status VARCHAR(10) DEFAULT 'active'` |
| `CHECK` | value must pass a test | `CHECK (max_books BETWEEN 1 AND 5)` |
| `PRIMARY KEY` | unique **and** not null | `id INT PRIMARY KEY` |

**`PRIMARY KEY` vs `UNIQUE`:** a table has one primary key, but it can have many `UNIQUE` columns. A student's id is the primary key; their library card code can also be unique.

---

## 🏫 Example: Library Cards

The library wants to issue cards. Each card needs a unique code, a student's name, a status, and a borrowing limit of 1 to 5 books.

```sql
CREATE TABLE library_cards (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    card_code    VARCHAR(10) NOT NULL UNIQUE,
    student_name VARCHAR(50) NOT NULL,
    status       VARCHAR(10) NOT NULL DEFAULT 'active',
    max_books    INT NOT NULL DEFAULT 2
                 CHECK (max_books BETWEEN 1 AND 5),
    issued_on    DATE DEFAULT (CURRENT_DATE)
);
```

`BETWEEN 1 AND 5` means "from 1 up to 5, including both". `CURRENT_DATE` is today's date.

```sql
DESCRIBE library_cards;
```

| Field | Type | Null | Key | Default | Extra |
| :--- | :--- | :--- | :--- | :--- | :--- |
| id | int(11) | NO | PRI | NULL | auto_increment |
| card_code | varchar(10) | NO | UNI | NULL | |
| student_name | varchar(50) | NO | | NULL | |
| status | varchar(10) | NO | | active | |
| max_books | int(11) | NO | | 2 | |
| issued_on | date | YES | | curdate() | |

`UNI` marks the unique column. The `Default` column shows the values MySQL will fill in.

### Watching the rules work

To test the rules we need to add rows. The command is `INSERT INTO`, which Chapter 9 teaches fully. Here, just watch what MySQL says.

Two good cards (Zayd gives no limit, so he gets the default 2):

```sql
INSERT INTO library_cards (card_code, student_name) VALUES ('LC-001', 'Zayd');
INSERT INTO library_cards (card_code, student_name, max_books) VALUES ('LC-002', 'Maryam', 3);
```

| id | card_code | student_name | status | max_books |
| ---: | :--- | :--- | :--- | ---: |
| 1 | LC-001 | Zayd | active | 2 |
| 2 | LC-002 | Maryam | active | 3 |

Now four rows that break a rule:

| Attempt | MySQL's answer | Rule broken |
| :--- | :--- | :--- |
| card `'LC-001'` again for Bilal | `ERROR 1062: Duplicate entry 'LC-001' for key 'card_code'` | `UNIQUE` |
| card `'LC-003'` with no name | `ERROR 1364: Field 'student_name' doesn't have a default value` | `NOT NULL` |
| Aisha with `max_books` 9 | ``ERROR 4025: CONSTRAINT `library_cards.max_books` failed`` | `CHECK` |
| a row with `id` 1 again | `ERROR 1062: Duplicate entry '1' for key 'PRIMARY'` | `PRIMARY KEY` |

None of these rows were saved. The table stays clean.

> 💡 `CHECK` is enforced by MariaDB 10.2+ and MySQL 8.0.16+. Very old MySQL versions read it but ignored it.

---

## 🤔 Why Not Use Names or Emails as Keys?

- **Names repeat.** Two students can be called Fatima.
- **Emails change.** A student may get a new address, and every link to the old one breaks.
- **Numbers are small and fast** to compare and store.
- **Privacy (*Amānah*).** An id like `4` shows nothing personal when it appears in links or other tables.

---

## ⚠️ Common Mistake

**Mistake: thinking `NOT NULL` always blocks a missing value.**

On a standard XAMPP (relaxed mode), leaving out `student_name` does **not** stop the insert. MariaDB saves an empty text `''` and only gives a warning:

| id | card_code | student_name | status |
| ---: | :--- | :--- | :--- |
| 4 | LC-009 | | active |

**Fixed version:** turn on strict mode (Chapter 6) so the rule becomes a real error:

```sql
SET SESSION sql_mode = 'STRICT_TRANS_TABLES';
```

Notice also that the id is 4, not 3. The failed attempts used up number 3. Gaps are normal.

---

## ✍️ Try It

Add constraints to your `school_db.donations` idea. Write (on paper or in phpMyAdmin with a test table) a column rule that stops a donation `amount` of zero or less.

*Hint: use `CHECK (amount > 0)`.*

---

## 📝 Recap

- A **primary key** is unique and never empty; each table has one.
- `AUTO_INCREMENT` numbers new rows; gaps are normal.
- `NOT NULL` = required, `UNIQUE` = no repeats, `DEFAULT` = automatic value, `CHECK` = must pass a test.
- When a rule is broken, MySQL refuses the row and says which rule.
- Use strict mode so relaxed XAMPP does not quietly save bad data.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. What are the two rules of a primary key?
2. What does `AUTO_INCREMENT` do?
3. How is `PRIMARY KEY` different from `UNIQUE`?

<details>
<summary>Show answer</summary>

1. Every value is unique, and it is never `NULL`.
2. It gives each new row the next number automatically.
3. A table has only one primary key, which is also never null. A table can have many `UNIQUE` columns.

</details>

### 🟡 Level 2: Apply
Write a `CREATE TABLE` for `teachers`:
- `id`: whole number, auto-numbered, primary key
- `staff_code`: 8 characters, required and unique
- `full_name`: up to 100 characters, required
- `subject`: up to 40 characters, default `'General'`
- `joining_date`: date, required

<details>
<summary>Show answer</summary>

```sql
CREATE TABLE teachers (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    staff_code   CHAR(8) NOT NULL UNIQUE,
    full_name    VARCHAR(100) NOT NULL,
    subject      VARCHAR(40) NOT NULL DEFAULT 'General',
    joining_date DATE NOT NULL
);
```

`VARCHAR(8)` for `staff_code` is also fine.

</details>

### 🔴 Level 3: Challenge
The charity club wants a `pledges` table for promises to donate to a cause.

1. Give it an auto-numbered primary key.
2. Add a required `donor` name and a required `cause`.
3. Add an `amount` that must be more than 0.
4. Add a `status` that defaults to `'promised'`.
5. Explain why the key should be `id` and not `donor`.

<details>
<summary>Show one possible answer</summary>

```sql
CREATE TABLE pledges (
    id     INT AUTO_INCREMENT PRIMARY KEY,
    donor  VARCHAR(50) NOT NULL,
    cause  VARCHAR(50) NOT NULL,
    amount INT NOT NULL CHECK (amount > 0),
    status VARCHAR(10) NOT NULL DEFAULT 'promised'
);
```

The same donor can make many pledges, so `donor` is not unique and cannot be the key. An `id` is unique for every pledge.

</details>
