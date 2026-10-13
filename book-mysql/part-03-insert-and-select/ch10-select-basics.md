# Chapter 10: SELECT Basics & Aliases

> **Key Idea**: `SELECT` reads data from a table and shows it to you. It never changes the table. You choose which columns to see, can rename them, and can even calculate new ones.

---

## 🌟 Real-Life Story

A visitor asks the librarian, "Could you show me just the titles and page counts of your books?" The librarian does not hand over the whole catalogue with every detail. She copies out only the two columns asked for, and the catalogue stays exactly as it was. `SELECT` works the same way: it makes a fresh list for you and leaves the table untouched.

## 🎯 What You Will Learn

- Read all columns with `SELECT *` and chosen columns by name.
- Rename result columns with `AS` (an alias).
- Calculate new columns with `+ - * /`.
- Join text together with `CONCAT`.
- Remove repeated values with `DISTINCT`.

---

## 🔍 The Shape of a `SELECT`

```sql
SELECT column1, column2
FROM table_name;
```

Read it as: *"Give me these columns from this table."*

When MySQL runs a `SELECT`:

1. It reads the rows of the table.
2. It keeps only the columns you asked for.
3. It sends back a temporary table called a **result set**.
4. **Nothing in the stored table changes.**

---

## ⭐ All Columns vs. Chosen Columns

### Everything with `*`

The star `*` means "every column":

```sql
SELECT * FROM classes;
```

| id | name | teacher |
| ---: | :--- | :--- |
| 1 | Grade 7 Falcons | Ms. Hafsa |
| 2 | Grade 8 Eagles | Mr. Imran |
| 3 | Grade 9 Hawks | Ms. Noor |

### Only the columns you need

```sql
SELECT name, city FROM students;
```

| name | city |
| :--- | :--- |
| Zayd | Lahore |
| Maryam | Karachi |
| Bilal | Lahore |
| Fatima | Islamabad |
| Tariq | Karachi |
| Aisha | Lahore |
| Hamza | Peshawar |
| Khadija | Islamabad |

`SELECT *` is fine for a quick look in phpMyAdmin. In a real app, list the columns you need:

- Less data travels over the network, so pages load faster.
- You do not accidentally show private columns (*Amānah*).
- If someone adds a column later, your app is not surprised.

---

## 🏷️ Renaming Columns with `AS`

An **alias** is a temporary nickname for a column in the result. It does not rename the real column.

```sql
SELECT name AS student, gpa AS score
FROM students;
```

| student | score |
| :--- | ---: |
| Zayd | 3.90 |
| Maryam | 3.75 |
| Bilal | 3.95 |
| Fatima | 3.85 |
| Tariq | 3.60 |
| Aisha | 3.40 |
| Hamza | 3.20 |
| Khadija | 3.70 |

If the nickname has a space, put it in quotes: `title AS 'Book Title'`.

---

## 🧮 Calculated Columns

You can do maths inside `SELECT`. Suppose a reader needs about 2 minutes per page:

```sql
SELECT title, pages, pages * 2 AS minutes_to_read
FROM books;
```

| title | pages | minutes_to_read |
| :--- | ---: | ---: |
| Clean Code | 464 | 928 |
| Algorithm Design | 320 | 640 |
| Ethical Technology | 210 | 420 |
| HTML & CSS Architecture | 288 | 576 |
| Python Data Science | 352 | 704 |
| Digital Stewardship | 180 | 360 |
| Introduction to Networks | 240 | 480 |
| Arabic Calligraphy Basics | 120 | 240 |

The `books` table still has no `minutes_to_read` column. The value is worked out fresh each time.

Another example: a kind sponsor promises to **match** every donation (give the same amount again). What will each cause receive?

```sql
SELECT donor, amount, amount * 2 AS with_match
FROM donations;
```

| donor | amount | with_match |
| :--- | ---: | ---: |
| Ahmad | 1500 | 3000 |
| Sara | 5000 | 10000 |
| Ibrahim | 2500 | 5000 |
| Hafsa | 3000 | 6000 |
| Yusuf | 8000 | 16000 |
| Zainab | 4500 | 9000 |
| Omar | 1000 | 2000 |
| Layla | 2000 | 4000 |

The maths signs are `+` (add), `-` (subtract), `*` (multiply) and `/` (divide).

---

## 🔗 Joining Text with `CONCAT`

`CONCAT` glues pieces of text together into one value:

```sql
SELECT CONCAT(name, ' from ', city) AS label
FROM students;
```

| label |
| :--- |
| Zayd from Lahore |
| Maryam from Karachi |
| Bilal from Lahore |
| Fatima from Islamabad |
| Tariq from Karachi |
| Aisha from Lahore |
| Hamza from Peshawar |
| Khadija from Islamabad |

Notice the spaces inside `' from '`. Without them you would get `ZaydfromLahore`.

> 🧪 **Sandbox note:** Newer SQLite versions accept `CONCAT` too. If the sandbox ever rejects it, use SQLite's join sign: `name || ' from ' || city`.

---

## 🧹 Removing Repeats with `DISTINCT`

Which cities do our students come from? Without help, Lahore appears three times. `DISTINCT` keeps each value once:

```sql
SELECT DISTINCT city FROM students;
```

| city |
| :--- |
| Lahore |
| Karachi |
| Islamabad |
| Peshawar |

Four different cities, even though there are eight students.

---

## ⚠️ Common Mistake

**Mistake: a comma after the last column.**

```sql
SELECT name, city,
FROM students;
```

```
ERROR 1064 (42000): You have an error in your SQL syntax; ... near 'FROM students'
```

MySQL expects another column after the comma. **Fix:** remove the last comma: `SELECT name, city FROM students;`

**Mistake: thinking `AS` renames the real column.** After `SELECT name AS student ...`, the table's column is still called `name`. The alias lives only in that one result.

---

## ✍️ Try It

In the [SQL Sandbox](../studios/sql-sandbox/), write one query that shows each book's `title` and its category in this form: `Clean Code (Programming)`. Name the column `shelf_label`.

*Hint: `CONCAT(title, ' (', category, ')')`.*

---

## 📝 Recap

- `SELECT columns FROM table;` reads data and never changes it.
- `*` means all columns; listing columns is better in real apps.
- `AS` gives a column a nickname in the result only.
- You can calculate new columns with `+ - * /` and glue text with `CONCAT`.
- `DISTINCT` shows each different value once.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Does `SELECT` change the data in a table?
2. What does `*` mean in `SELECT * FROM books;`?
3. Which keyword gives a result column a new name?

<details>
<summary>Show answer</summary>

1. No. It only reads.
2. "All columns".
3. `AS`

</details>

### 🟡 Level 2: Apply
Write a query on `books` that shows:
- the title as `book`
- the page count as `pages`
- the page count divided by 20 as `reading_days` (a reader doing 20 pages a day)

<details>
<summary>Show answer</summary>

```sql
SELECT title AS book, pages, pages / 20 AS reading_days
FROM books;
```

First rows of the result:

| book | pages | reading_days |
| :--- | ---: | ---: |
| Clean Code | 464 | 23.2000 |
| Algorithm Design | 320 | 16.0000 |

MySQL shows 4 decimal places after `/`. The sandbox (SQLite) shows `23` because it divides whole numbers as whole numbers; write `pages / 20.0` there to see `23.2`.

</details>

### 🔴 Level 3: Challenge
The school newsletter wants a list of book categories and a list of student labels.

1. Write a query that lists each book category **once**.
2. Write a query that shows `Grade 8: Zayd` style labels for every student, in a column called `badge`.
3. Explain why a real app should not use `SELECT *` on the `students` table.

<details>
<summary>Show one possible answer</summary>

```sql
SELECT DISTINCT category FROM books;
```

| category |
| :--- |
| Programming |
| Computer Science |
| Ethics |
| Web |
| Data |
| Art |

```sql
SELECT CONCAT('Grade ', grade, ': ', name) AS badge
FROM students;
```

The first row is `Grade 8: Zayd`.

3. `SELECT *` sends every column, including ones the page does not need. That wastes time and may expose private data (*Amānah*). List only the columns you will show.

</details>
