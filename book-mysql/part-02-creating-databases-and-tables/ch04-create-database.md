# Chapter 4: CREATE DATABASE and USE

> **Key Idea**: Before you make tables, you make a database to hold them. You create it with `CREATE DATABASE`, choose it with `USE`, and give it the `utf8mb4` character set so every language fits.

---

## 🌟 Real-Life Story

A school has one big building but many rooms. The science lab keeps its equipment in its own room. The library keeps its books in another. Nobody mixes test tubes with storybooks. A MySQL server is the building, and each **database** is a separate room for one app's tables.

## 🎯 What You Will Learn

- Explain what a database "container" is.
- Create a database safely with `CREATE DATABASE IF NOT EXISTS`.
- Choose the `utf8mb4` character set for Urdu, Arabic and emoji.
- Switch into a database with `USE` and check it with `SELECT DATABASE()`.
- Delete a database with `DROP DATABASE`, and know why this is dangerous.

---

## What is a Database Container?

One MySQL server can hold many separate apps. Each app keeps its tables inside its own **database**. MySQL also calls a database a **schema**.

```
MySQL server (localhost)
├── school_db
│    └ classes, students, books,
│      loans, donations
├── clinic_db
│    └ patients, appointments
└── charity_db
     └ donors, campaigns
```

Tables in `school_db` cannot be confused with tables in `clinic_db`, even if both have a table called `patients` or `students`.

In this book we build one database: **`school_db`**.

---

## Creating a Database

The command is short:

```sql
CREATE DATABASE school_db;
```

MySQL answers:

```
Query OK, 1 row affected
```

### What if it already exists?

Run the same command a second time and you get an error:

```
ERROR 1007 (HY000): Can't create database 'school_db'; database exists
```

To avoid this, add `IF NOT EXISTS`. MySQL then skips the work quietly if the database is already there:

```sql
CREATE DATABASE IF NOT EXISTS school_db;
```

```
Query OK, 1 row affected, 1 warning
```

The warning only says "it already existed". Nothing was changed. This makes a set-up script safe to run many times.

### Choose a character set: `utf8mb4`

A **character set** is the list of letters and symbols a database can store. A **collation** is the rule for comparing and sorting them (for example, is "a" equal to "A"?).

Older set-ups default to `latin1`, which cannot store Urdu, Arabic or emoji. Always choose `utf8mb4`. It covers every language and emoji (🌟):

```sql
CREATE DATABASE IF NOT EXISTS school_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

`_ci` at the end means **case-insensitive**: `'zayd'` and `'Zayd'` are treated as equal when you search.

You can check what the server stored:

```sql
SHOW CREATE DATABASE school_db;
```

| Database | Create Database |
| :--- | :--- |
| school_db | CREATE DATABASE \`school_db\` /\*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci \*/ |

---

## Choosing a Database with `USE`

When you log in, no database is chosen yet. Ask MySQL which one is active:

```sql
SELECT DATABASE();
```

| DATABASE() |
| :--- |
| NULL |

`NULL` means "nothing", so no database is selected. Now choose one:

```sql
USE school_db;
```

```
Database changed
```

Check again:

```sql
SELECT DATABASE();
```

| DATABASE() |
| :--- |
| school_db |

From now on, every `CREATE TABLE` or `SELECT` you type works inside `school_db`. The command-line prompt also changes from `MariaDB [(none)]>` to `MariaDB [school_db]>`.

In phpMyAdmin you can simply click `school_db` in the left tree. That does the same job as `USE`.

> 🧪 **Sandbox note:** The SQL Sandbox (SQLite) has one database already open, so `CREATE DATABASE` and `USE` do not exist there. Run them in phpMyAdmin.

---

## Deleting a Database with `DROP DATABASE`

`DROP` means "throw away". This deletes the database **and every table and row inside it**:

```sql
DROP DATABASE IF EXISTS practice_db;
```

There is no Recycle Bin. Once dropped, the data is gone unless you made a **backup** (a saved copy, for example with phpMyAdmin's **Export** tab).

`IF EXISTS` stops the error you would get if the database is not there.

---

## Command Summary

| Command | What it does |
| :--- | :--- |
| `SHOW DATABASES;` | Lists all databases on the server. |
| `CREATE DATABASE name;` | Makes a new, empty database. |
| `USE name;` | Makes that database the active one. |
| `SELECT DATABASE();` | Shows which database is active. |
| `DROP DATABASE name;` | Deletes the database and everything in it. |

These commands belong to **DDL** (Data Definition Language): SQL that builds or removes structures, not data.

---

## ⚠️ Common Mistake

**Mistake: making tables before choosing a database.**

```sql
CREATE TABLE classes (id INT, name VARCHAR(50));
```

What happens:

```
ERROR 1046 (3D000): No database selected
```

MySQL does not know which "room" to put the table in.

**Fixed version:**

```sql
USE school_db;
CREATE TABLE classes (id INT, name VARCHAR(50));
```

*(You will learn `CREATE TABLE` properly in Chapter 5.)*

---

## ✍️ Try It

In phpMyAdmin's **SQL** tab (with no database selected), run:

1. `CREATE DATABASE IF NOT EXISTS school_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
2. `SHOW DATABASES;` — is `school_db` in the list?
3. Run step 1 again. What message appears this time?

*Hint: keep `school_db`. Chapter 5 builds its tables.*

---

## 📝 Recap

- A database is a separate container for one app's tables.
- `CREATE DATABASE IF NOT EXISTS` makes one without failing if it is already there.
- Use `utf8mb4` so every language and emoji can be stored.
- `USE name;` chooses the active database; `SELECT DATABASE();` shows it.
- `DROP DATABASE` deletes everything inside, with no undo.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which command tells MySQL which database to work in?
2. What happens if you run `CREATE DATABASE school_db;` when it already exists?
3. Why is `utf8mb4` better than `latin1`?

<details>
<summary>Show answer</summary>

1. `USE database_name;`
2. You get `ERROR 1007 ... database exists`. With `IF NOT EXISTS` you get only a warning.
3. `utf8mb4` stores every language, including Urdu and Arabic, plus emoji. `latin1` stores only Western European letters.

</details>

### 🟡 Level 2: Apply
Write the SQL to:
1. Create a database called `community_library_db` with `utf8mb4` if it does not exist.
2. Make it the active database.
3. Check that it is active.

<details>
<summary>Show answer</summary>

```sql
CREATE DATABASE IF NOT EXISTS community_library_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE community_library_db;

SELECT DATABASE();
```

The last command returns `community_library_db`.

</details>

### 🔴 Level 3: Challenge
A school's IT team does not let the website or junior staff run `DROP DATABASE`.

1. Explain why, using the word *Amānah*.
2. Write a safe two-line script that removes an old `practice_db` only if it exists, then creates a fresh one.

<details>
<summary>Show one possible answer</summary>

1. `DROP DATABASE` deletes every record at once, with no undo. Student and library records are a trust (*Amānah*). One mistake or one attack through the website could destroy them. So only a few trusted people get that power, and they make a backup first.
2.
```sql
DROP DATABASE IF EXISTS practice_db;
CREATE DATABASE practice_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

</details>
