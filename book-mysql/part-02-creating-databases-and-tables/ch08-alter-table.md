# Chapter 8: ALTER TABLE — Changing a Table

> **Key Idea**: `ALTER TABLE` changes the plan of a table that already exists. You can add, change, rename or remove columns, and add or remove rules, without building the table again.

---

## 🌟 Real-Life Story

The school office printed a register with four columns: ID, name, subject and email. A month later the head teacher asks for a staff code column too. Nobody throws the register away and starts again. The secretary rules a new column in pencil, crosses out an old heading and writes a better one. `ALTER TABLE` is that pencil. It changes the shape of a table while the table stays in use.

## 🎯 What You Will Learn

- Add a column with `ADD COLUMN`, and place it with `AFTER` or `FIRST`.
- Change a column's type with `MODIFY`, and rename it with `CHANGE`.
- Remove a column with `DROP COLUMN`, knowing its data is gone for good.
- Add and remove defaults and constraints, and rename a whole table.
- Check every change with `DESCRIBE`, and practise on a copy first.

---

## 🧰 Why Change a Table?

In Chapters 5–7 we planned tables with care. Still, plans change:

- The school wants a **new** piece of information (a staff code).
- A column is **too small** (names longer than 50 letters).
- A column name is **unclear** (`email` should be `work_email`).
- A column is **no longer needed**.

You could `DROP TABLE` and run `CREATE TABLE` again. But dropping a table throws away every row in it. `ALTER TABLE` changes the plan and keeps what is already stored.

The general shape is:

```sql
ALTER TABLE table_name
    what_to_change;
```

---

## 🧪 Our Practice Table: `teachers`

We will practise on a small new table, so the five `school_db` tables stay exactly as the rest of this book expects.

```sql
USE school_db;

CREATE TABLE teachers (
    id        INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(50) NOT NULL,
    subject   VARCHAR(30)
);
```

The table is empty. Rows come in Chapter 9. In this chapter we only change its **columns**, and after each step we look at the plan with `DESCRIBE` (Chapter 5).

---

## ➕ Adding a Column: `ADD COLUMN`

The office wants an email address for each teacher:

```sql
ALTER TABLE teachers ADD COLUMN email VARCHAR(100);

DESCRIBE teachers;
```

| Field | Type | Null | Key | Default | Extra |
| :--- | :--- | :--- | :--- | :--- | :--- |
| id | int(11) | NO | PRI | NULL | auto_increment |
| full_name | varchar(50) | NO | | NULL | |
| subject | varchar(30) | YES | | NULL | |
| email | varchar(100) | YES | | NULL | |

A new column goes to the **end** of the table. You write it exactly like a line inside `CREATE TABLE`: name, type, then any rules.

> 💡 The word `COLUMN` is optional. `ALTER TABLE teachers ADD email VARCHAR(100);` does the same. This book writes `COLUMN` because it reads more clearly.

### Choosing the place: `AFTER` and `FIRST`

A staff code belongs near the id, not at the end. `AFTER` puts the new column straight after another one:

```sql
ALTER TABLE teachers
    ADD COLUMN staff_code CHAR(8) NOT NULL AFTER id;

DESCRIBE teachers;
```

| Field | Type | Null | Key | Default | Extra |
| :--- | :--- | :--- | :--- | :--- | :--- |
| id | int(11) | NO | PRI | NULL | auto_increment |
| staff_code | char(8) | NO | | NULL | |
| full_name | varchar(50) | NO | | NULL | |
| subject | varchar(30) | YES | | NULL | |
| email | varchar(100) | YES | | NULL | |

`FIRST` puts a column at the very start, before `id`. For example (we do not run this one, because most tables keep `id` first):

```sql
ALTER TABLE teachers ADD COLUMN school_code CHAR(3) FIRST;
```

Column order does not change what the table can store. It only changes how `DESCRIBE` and `SELECT *` show it.

> ⚠️ **Adding `NOT NULL` to a table that already has rows.** Every old row needs a value for the new column. Give a `DEFAULT` (for example `DEFAULT 'TEMP0000'`), or MySQL fills in an empty value (`''` for text, `0` for numbers). Our `teachers` table is still empty, so there is no problem yet.

---

## 🔧 Changing a Column: `MODIFY`

Some teachers have long names, and 50 letters is not enough. `MODIFY` gives a column a new definition but keeps its name:

```sql
ALTER TABLE teachers MODIFY full_name VARCHAR(100) NOT NULL;
```

Read it as: "from now on, `full_name` is `VARCHAR(100) NOT NULL`."

**Important:** `MODIFY` replaces the **whole** definition. Write every rule you want to keep (`NOT NULL`, `DEFAULT ...`). Anything you leave out is removed. The Common Mistake section shows what happens.

> 💡 Making a column **bigger** is safe. Making it **smaller** can cut stored values short. In relaxed mode, shrinking a column to `VARCHAR(5)` turns `'Abdur Rahman'` into `'Abdur'`. In strict mode (Chapter 6) MySQL refuses with `ERROR 1265: Data truncated`, which is better.

---

## 🏷️ Renaming a Column: `CHANGE`

The name `email` is not clear. Is it the teacher's own address or the school one? Let us rename it to `work_email`.

On **XAMPP** you use `CHANGE`. It takes the **old name**, the **new name**, and the full definition again:

```sql
ALTER TABLE teachers CHANGE email work_email VARCHAR(100);

DESCRIBE teachers;
```

| Field | Type | Null | Key | Default | Extra |
| :--- | :--- | :--- | :--- | :--- | :--- |
| id | int(11) | NO | PRI | NULL | auto_increment |
| staff_code | char(8) | NO | | NULL | |
| full_name | varchar(100) | NO | | NULL | |
| subject | varchar(30) | YES | | NULL | |
| work_email | varchar(100) | YES | | NULL | |

`full_name` is now `varchar(100)` (from `MODIFY`), and `email` is now `work_email`.

### What about `RENAME COLUMN`?

Newer servers have a shorter command that only renames:

```sql
ALTER TABLE teachers RENAME COLUMN work_email TO email;
```

| Server | `RENAME COLUMN` works? |
| :--- | :--- |
| MySQL 8.0 and newer | Yes |
| MariaDB 10.5 and newer | Yes |
| MariaDB 10.4 (XAMPP 8.x) | **No**: `ERROR 1064 ... syntax` |

XAMPP ships **MariaDB 10.4**, so on your XAMPP use `CHANGE`. `CHANGE` works on every version.

| Command | Keeps the name? | Needs the full type? | Use it to |
| :--- | :--- | :--- | :--- |
| `MODIFY col type` | yes | yes | change type or rules |
| `CHANGE old new type` | no | yes | rename (and maybe change type) |
| `RENAME COLUMN old TO new` | no | no | rename only (MySQL 8) |

---

## 🛡️ Defaults and Constraints

Chapter 7 put rules on columns inside `CREATE TABLE`. `ALTER TABLE` can add them later, or take them away.

### Setting and removing a default

Most teachers teach a general subject until the timetable is ready:

```sql
ALTER TABLE teachers ALTER COLUMN subject SET DEFAULT 'General';
```

Here `ALTER COLUMN` changes only the default and touches nothing else. To remove it again:

```sql
ALTER TABLE teachers ALTER COLUMN subject DROP DEFAULT;
```

### Adding a constraint

No two teachers may share a staff code. We add a `UNIQUE` rule and give it our own name, `uq_staff_code`:

```sql
ALTER TABLE teachers
    ADD CONSTRAINT uq_staff_code UNIQUE (staff_code);
```

A `CHECK` rule works the same way. Say we add a column for teaching periods per week, which must be from 1 to 40:

```sql
ALTER TABLE teachers ADD COLUMN periods INT NOT NULL DEFAULT 20;

ALTER TABLE teachers
    ADD CONSTRAINT chk_periods CHECK (periods BETWEEN 1 AND 40);

DESCRIBE teachers;
```

| Field | Type | Null | Key | Default | Extra |
| :--- | :--- | :--- | :--- | :--- | :--- |
| id | int(11) | NO | PRI | NULL | auto_increment |
| staff_code | char(8) | NO | UNI | NULL | |
| full_name | varchar(100) | NO | | NULL | |
| subject | varchar(30) | YES | | General | |
| work_email | varchar(100) | YES | | NULL | |
| periods | int(11) | NO | | 20 | |

`UNI` shows the new unique rule, and `General` and `20` are the defaults. `DESCRIBE` does not show `CHECK` rules. To see every rule with its name, ask for the full plan:

```sql
SHOW CREATE TABLE teachers;
```

```
CREATE TABLE `teachers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `staff_code` char(8) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `subject` varchar(30) DEFAULT 'General',
  `work_email` varchar(100) DEFAULT NULL,
  `periods` int(11) NOT NULL DEFAULT 20,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_staff_code` (`staff_code`),
  CONSTRAINT `chk_periods` CHECK (`periods` between 1 and 40)
) ENGINE=InnoDB DEFAULT CHARSET=...
```

(The last line shows your database's character set from Chapter 4, so yours may look a little different.)

> 💡 **Name your rules.** `uq_staff_code` and `chk_periods` are easy to find and remove later. If you give no name, MySQL invents one.

### Removing a constraint

| To remove | Write | Works on |
| :--- | :--- | :--- |
| a `CHECK` rule | `DROP CONSTRAINT chk_periods` | MariaDB 10.2+, MySQL 8.0.19+ |
| a `UNIQUE` rule | `DROP INDEX uq_staff_code` | all versions |

```sql
ALTER TABLE teachers DROP CONSTRAINT chk_periods;
```

Why is a `UNIQUE` rule removed with `DROP INDEX`? To check "no repeats" quickly, MySQL keeps a sorted list of the values, called an **index**. Removing the rule removes that list. Chapter 25 explains indexes fully.

---

## 🗑️ Removing a Column: `DROP COLUMN`

The office decides not to track periods after all:

```sql
ALTER TABLE teachers DROP COLUMN periods;
```

`DESCRIBE` now shows five columns again: `id`, `staff_code`, `full_name`, `subject`, `work_email`.

> 🛑 **The data is gone.** `DROP COLUMN` deletes that column from **every row**. If the table held 900 teachers' phone numbers, all 900 are erased at once. There is no Recycle Bin and no undo.

---

## 🔁 Renaming a Whole Table

The office decides the table should hold all staff, not only teachers:

```sql
RENAME TABLE teachers TO staff;

SHOW TABLES;
```

| Tables_in_school_db |
| :--- |
| books |
| classes |
| donations |
| loans |
| staff |
| students |

`ALTER TABLE teachers RENAME TO staff;` does the same job. Renaming keeps every column, rule and row.

> ⚠️ Any PHP page or saved query that still says `teachers` will now fail with "Table doesn't exist". Rename tables early, before other code depends on the name.

---

## 🧩 Several Changes in One Statement

You can list many changes, separated by commas. MySQL applies them together:

```sql
ALTER TABLE staff
    ADD COLUMN phone VARCHAR(20) AFTER full_name,
    MODIFY subject VARCHAR(40) DEFAULT 'General';
```

This is faster on big tables, because MySQL rebuilds the table once instead of twice.

---

## 🧯 A Safety Habit: Copy First

`ALTER TABLE` changes real tables at once. There is no "Are you sure?" message. Make it a habit:

1. **Back up** the database first: phpMyAdmin → select `school_db` → **Export** → **Go**. You get a `.sql` file you can import later.
2. **Try the change on a copy.** `CREATE TABLE ... LIKE` makes an empty table with the same plan:

   ```sql
   CREATE TABLE staff_test LIKE staff;
   ALTER TABLE staff_test DROP COLUMN phone;
   DESCRIBE staff_test;
   ```

3. **Check with `DESCRIBE`** (or `SHOW CREATE TABLE`) that the copy looks right.
4. **Then** run the same change on the real table, and drop the copy with `DROP TABLE staff_test;`.

On a real school server, changes are planned and run when few people are using the website, for example after school hours. Student records are an *Amānah* (a trust), so we change them carefully.

> 🧪 **Sandbox note:** The browser SQL Sandbox (SQLite) supports `ADD COLUMN`, `RENAME COLUMN ... TO ...`, `DROP COLUMN` and `RENAME TO`. It has **no** `MODIFY`, `CHANGE` or `AFTER`. Practise those in phpMyAdmin on XAMPP.

---

## ⚠️ Common Mistake

**Mistake: forgetting the old rules when using `MODIFY` or `CHANGE`.**

`full_name` is `VARCHAR(100) NOT NULL` and `subject` has `DEFAULT 'General'`. A student wants a few more letters for both:

```sql
ALTER TABLE staff MODIFY full_name VARCHAR(120);
ALTER TABLE staff MODIFY subject VARCHAR(50);
```

| Field | Type | Null | Key | Default |
| :--- | :--- | :--- | :--- | :--- |
| full_name | varchar(120) | **YES** | | NULL |
| subject | varchar(50) | YES | | **NULL** |

No error and no warning, but `NOT NULL` and the default have **disappeared**. A teacher can now be saved without a name.

**Fixed version:** write the whole definition every time:

```sql
ALTER TABLE staff MODIFY full_name VARCHAR(120) NOT NULL;
ALTER TABLE staff MODIFY subject VARCHAR(50) DEFAULT 'General';
```

Run `DESCRIBE` after every `MODIFY` or `CHANGE` to check that the rules are still there.

**Mistake 2: using `RENAME COLUMN` on XAMPP.** MariaDB 10.4 answers `ERROR 1064 (42000): You have an error in your SQL syntax`. Use `CHANGE old new type` instead.

---

## ✍️ Try It

Create the `teachers` table from the start of this chapter in phpMyAdmin (or reuse your `staff` table). Then add a `room` column that holds a room code such as `B-12`, placed straight after `subject`, with the default `'Staff Room'`. Check it with `DESCRIBE`.

*Hint: `ADD COLUMN room VARCHAR(20) DEFAULT 'Staff Room' AFTER subject`.*

---

## 📝 Recap

- `ALTER TABLE` changes the plan of an existing table and keeps its rows.
- `ADD COLUMN` adds a column at the end, or where you say with `AFTER` / `FIRST`.
- `MODIFY` changes a column's definition. `CHANGE old new type` renames it (XAMPP's MariaDB 10.4 has no `RENAME COLUMN`; MySQL 8 does).
- Both `MODIFY` and `CHANGE` replace the **whole** definition, so repeat `NOT NULL` and `DEFAULT`.
- `DROP COLUMN` erases that column's data in every row. `RENAME TABLE` renames a table.
- Back up and try changes on a copy first, then check with `DESCRIBE`.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which part of `ALTER TABLE` places a new column straight after another column?
2. What is the difference between `MODIFY` and `CHANGE`?
3. What happens to the stored values when you run `DROP COLUMN`?
4. Why does `RENAME COLUMN` fail on XAMPP?

<details>
<summary>Show answer</summary>

1. `AFTER column_name` (and `FIRST` puts it at the very start).
2. `MODIFY` keeps the name and changes the definition. `CHANGE` takes an old and a new name, so it can rename the column, and it also needs the full definition.
3. They are deleted from every row, with no undo.
4. XAMPP ships MariaDB 10.4, which does not have `RENAME COLUMN`. It arrived in MySQL 8.0 and MariaDB 10.5. Use `CHANGE` instead.

</details>

### 🟡 Level 2: Apply
Here is the `library_cards` table from Chapter 7:

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

Write three `ALTER TABLE` statements:
1. Add an `email` column (up to 100 characters) straight after `student_name`.
2. Let `student_name` hold up to 80 characters. It must stay required.
3. Rename `status` to `card_status`, keeping its type, `NOT NULL` and its default.

<details>
<summary>Show answer</summary>

```sql
ALTER TABLE library_cards
    ADD COLUMN email VARCHAR(100) AFTER student_name;

ALTER TABLE library_cards
    MODIFY student_name VARCHAR(80) NOT NULL;

ALTER TABLE library_cards
    CHANGE status card_status VARCHAR(10) NOT NULL DEFAULT 'active';
```

`DESCRIBE library_cards;` then shows:

| Field | Type | Null | Key | Default |
| :--- | :--- | :--- | :--- | :--- |
| id | int(11) | NO | PRI | NULL |
| card_code | varchar(10) | NO | UNI | NULL |
| student_name | varchar(80) | NO | | NULL |
| email | varchar(100) | YES | | NULL |
| card_status | varchar(10) | NO | | active |
| max_books | int(11) | NO | | 2 |
| issued_on | date | YES | | curdate() |

If you forgot `NOT NULL DEFAULT 'active'` in step 3, the rule and the default are lost.

</details>

### 🔴 Level 3: Challenge
The charity club has the `pledges` table from Chapter 7's practice:

```sql
CREATE TABLE pledges (
    id     INT AUTO_INCREMENT PRIMARY KEY,
    donor  VARCHAR(50) NOT NULL,
    cause  VARCHAR(50) NOT NULL,
    amount INT NOT NULL CHECK (amount > 0),
    status VARCHAR(10) NOT NULL DEFAULT 'promised'
);
```

Follow the safety habit:
1. Make an empty copy called `pledges_test`.
2. In **one** `ALTER TABLE` statement on the copy: add a required `pledged_on` date straight after `amount`, change the default of `status` to `'open'`, and add a named rule `chk_amount_max` so no pledge is above 100000.
3. Rename the copy to `charity_pledges`.
4. Say which command shows you the new `CHECK` rule, and why `DESCRIBE` is not enough.

<details>
<summary>Show one possible answer</summary>

```sql
CREATE TABLE pledges_test LIKE pledges;

ALTER TABLE pledges_test
    ADD COLUMN pledged_on DATE NOT NULL AFTER amount,
    ALTER COLUMN status SET DEFAULT 'open',
    ADD CONSTRAINT chk_amount_max CHECK (amount <= 100000);

RENAME TABLE pledges_test TO charity_pledges;

SHOW CREATE TABLE charity_pledges;
```

`SHOW CREATE TABLE` prints:

```
CREATE TABLE `charity_pledges` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `donor` varchar(50) NOT NULL,
  `cause` varchar(50) NOT NULL,
  `amount` int(11) NOT NULL CHECK (`amount` > 0),
  `pledged_on` date NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'open',
  PRIMARY KEY (`id`),
  CONSTRAINT `chk_amount_max` CHECK (`amount` <= 100000)
) ENGINE=InnoDB DEFAULT CHARSET=...
```

`DESCRIBE` lists columns, types, `NOT NULL`, keys and defaults, but it does not list `CHECK` rules. `SHOW CREATE TABLE` shows the full plan, including both checks.

</details>
