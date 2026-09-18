# Chapter 4: CREATE DATABASE and USE

> **Key Idea**: Before creating tables, you must create a dedicated container called a database, select it with `USE`, and ensure proper multilingual character encoding (`utf8mb4`).

---

## 1. What is a Database Container?

A single MySQL server can host hundreds of independent applications simultaneously. To keep their data isolated from each other, each application resides inside its own dedicated **database** (also called a *schema*).

```
MySQL Server (localhost)
├── 📁 school_academy_db   ──► (Tables: students, teachers, exams)
├── 📁 library_db          ──► (Tables: books, members, loans)
└── 📁 charity_portal_db   ──► (Tables: donors, campaigns, aid_packages)
```

---

## 2. Syntax for Creating a Database

To create a new database, use the `CREATE DATABASE` statement:

```sql
-- Basic syntax
CREATE DATABASE school_academy_db;
```

### Safe Creation with `IF NOT EXISTS`
If you attempt to create a database that already exists, MySQL will produce an error. To write resilient deployment scripts, add `IF NOT EXISTS`:

```sql
CREATE DATABASE IF NOT EXISTS school_academy_db;
```

### Always Set Character Encoding (`utf8mb4`)
Modern web applications must handle universal languages—including Urdu, Arabic, English, and emojis (🌟). Always specify `utf8mb4` encoding:

```sql
CREATE DATABASE IF NOT EXISTS school_academy_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

---

## 3. Selecting a Database with `USE`

When you connect to MySQL, no database is actively chosen. You must instruct MySQL which database you want to work inside using the `USE` command:

```sql
-- Switch active working context to school_academy_db
USE school_academy_db;
```

Once executed, MySQL replies:
```
Database changed
```

Now, any subsequent `CREATE TABLE` or `SELECT` queries will automatically run inside `school_academy_db`.

To check which database is currently selected:
```sql
SELECT DATABASE();
```

---

## 4. Deleting a Database: `DROP DATABASE`

If you no longer need a temporary test database, you can destroy it with `DROP DATABASE`:

```sql
-- CAUTION: This deletes the database and ALL of its tables and records permanently!
DROP DATABASE IF EXISTS test_playground_db;
```

> ⚠️ **Warning for Developers**: `DROP DATABASE` is irreversible! There is no "Recycle Bin" in MySQL. Always exercise extreme care and make backups before dropping any database.

---

## 5. Summary of Essential DDL Commands

| Command | Purpose |
| :--- | :--- |
| `SHOW DATABASES;` | Lists all databases currently available on the server. |
| `CREATE DATABASE name;` | Creates a brand new database container. |
| `USE name;` | Sets the specified database as the active context. |
| `SELECT DATABASE();` | Returns the name of the currently selected database. |
| `DROP DATABASE name;` | Permanently deletes a database and all its contents. |

---

## 6. Review & Practice

### 🟢 Level 1: Recall
1. What command tells MySQL which database you want to work inside?
2. What happens if you run `CREATE DATABASE my_db;` when `my_db` already exists?
3. Why is `utf8mb4` recommended over older character sets like `latin1`?

### 🟡 Level 2: Hands-On SQL
Write the complete SQL commands to:
1. Create a database named `community_library_db` with `utf8mb4` character set if it does not already exist.
2. Select it as your active database.
3. Verify that it is active using `SELECT DATABASE();`.

### 🔴 Level 3: Real-World Safety
Why do production server administrators restrict permission to execute `DROP DATABASE` so that junior developers and web applications cannot run it directly?
