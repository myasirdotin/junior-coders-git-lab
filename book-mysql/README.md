# Class 9 MySQL: Databases & SQL Queries — Textbook Curriculum

The official, production-grade digital textbook for mastering relational databases and SQL queries, formalized under the **Junior Coders / LearnCode V-01** package.

---

## Pedagogical & Ethical Framework

This textbook is constructed strictly in alignment with the **Core Islamic Ethical Framework** codified in root `GEMINI.md`:
- **Beneficial Knowledge (*'Ilm Nāfi'*)**: Teaching databases as digital tools for community service, education, ethical commerce, and public health.
- **Data Trust & Privacy (*Amānah*)**: Instilling that user databases are sacred trusts. Enforcing parameterized statements, secure hashing, and access authorization.
- **Halal Commerce**: Rejection of usury (*Ribā*), gambling (*Maysir*), or deceptive schemas. Examples use student records, organic honey inventory, library book lending, and charity (*Zakat*) distribution.

---

## Curriculum Structure

- **Part 1: Introduction to Databases**
  - `ch01-what-is-a-database.md`: Filing cabinet analogy, spreadsheets vs. databases, RDBMS and SQL.
  - `ch02-tables-rows-and-columns.md`: Table structure, fields, records, and the 3 golden design rules.
  - `ch03-setting-up-mysql.md`: XAMPP MySQL service, phpMyAdmin, and MySQL CLI commands.

- **Part 2: Creating Databases & Tables (DDL)**
  - `ch04-create-database.md`: `CREATE DATABASE`, `USE`, `utf8mb4` character set, and `DROP`.
  - `ch05-create-table.md`: `CREATE TABLE` syntax, schema blueprints, and `DESCRIBE`.
  - `ch06-data-types.md`: `INT`, `VARCHAR`, `TEXT`, `DECIMAL(10,2)`, `DATE`, `TIMESTAMP`.
  - `ch07-primary-keys.md`: Primary Keys, `AUTO_INCREMENT`, `UNIQUE`, `NOT NULL`, and `CHECK`.

- **Part 3: Inserting & Querying Data (DML)**
  - `ch08-insert-into.md`: Single and batch `INSERT INTO` statements.
  - `ch09-select-basics.md`: Column projections, `AS` aliases, calculated columns, and `DISTINCT`.
  - `ch10-where-clause.md`: Filtering with `WHERE`, comparison operators, `AND`, `OR`, `BETWEEN`, `IN`, `IS NULL`.
  - `ch11-order-by-and-limit.md`: Sorting with `ORDER BY (ASC/DESC)` and pagination with `LIMIT` & `OFFSET`.

- **Part 4: Updating & Deleting Data (DML)**
  - `ch12-update-statement.md`: `UPDATE ... SET ... WHERE`, batch modifications, and missing WHERE dangers.
  - `ch13-delete-statement.md`: `DELETE FROM`, `TRUNCATE TABLE`, `DROP TABLE`, and Soft Deletes.
  - `ch14-safe-updates.md`: `SQL_SAFE_UPDATES`, ACID principles, and `COMMIT` / `ROLLBACK` transactions.

- **Part 5: Table Relationships & JOINs**
  - `ch15-foreign-keys.md`: Relational theory, parent-child tables, normalization, and Foreign Keys.
  - `ch16-what-is-a-join.md`: Combining tables, table aliases, and the `ON` condition.
  - `ch17-inner-join.md`: `INNER JOIN` in depth, Venn diagram matching, and 3-table joins.
  - `ch18-left-and-right-joins.md`: `LEFT JOIN`, `COALESCE`, and detecting orphaned records (anti-joins).

- **Part 6: Aggregations & Advanced Queries**
  - `ch19-aggregate-functions.md`: `COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()`.
  - `ch20-group-by-and-having.md`: Grouping categories with `GROUP BY` and group filtering with `HAVING`.
  - `ch21-like-and-wildcards.md`: Pattern searching with `LIKE`, `%` and `_` wildcards, and escaping.
  - `ch22-subqueries.md`: Subqueries in `WHERE` and `FROM` clauses, and dynamic aggregations.

- **Part 7: Capstone Projects & Reference**
  - `proj01-student-management-db.md`: School Student & Grade Management Database (4 relational tables).
  - `proj02-library-lending-db.md`: Community Library & Book Lending System.
  - `mysql-cheatsheet.md`: Rapid reference guide for DDL, DML, JOINs, and data security checklist.

---

## Offline Bundling

Run the bundler script anytime markdown chapters are updated:
```bash
node scripts/bundle-books.js
```
This generates `chapters-bundle.js` for instant, offline, zero-CORS reading in any standard browser.
