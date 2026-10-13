# Chapter 2: Tables, Rows, and Columns

> **Key Idea**: A database keeps data in tables. A table is about one kind of thing (like students). Each column is one fact about it (like name). Each row is one real thing (like one student).

---

## 🌟 Real-Life Story

Think of the class register your teacher fills in each morning. Across the top are headings: roll number, name, present or absent. Down the page, each line is one student. Nobody writes two students on one line, and nobody adds a new heading for each new child. A database table works exactly like that register.

## 🎯 What You Will Learn

- Name the parts of a table: table, column, row and value.
- Read a real table from the school database.
- Decide whether new data needs a new row or a new column.
- Apply three golden rules of good table design.

---

## 🧩 The Parts of a Table

<div align="center" style="margin: 2rem 0;">
  <img src="../assets/diagrams/mysql/table-anatomy-records.svg" alt="Table Anatomy: Fields, Records & Types" style="max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
</div>

Here is the `students` table from this book's `school_db` database:

| id | name | grade | gpa | class_id | city |
| ---: | :--- | ---: | ---: | ---: | :--- |
| 1 | Zayd | 8 | 3.90 | 2 | Lahore |
| 2 | Maryam | 7 | 3.75 | 1 | Karachi |
| 3 | Bilal | 9 | 3.95 | 3 | Lahore |
| 4 | Fatima | 8 | 3.85 | 2 | Islamabad |
| 5 | Tariq | 9 | 3.60 | 3 | Karachi |
| 6 | Aisha | 7 | 3.40 | 1 | Lahore |
| 7 | Hamza | 8 | 3.20 | 2 | Peshawar |
| 8 | Khadija | 9 | 3.70 | 3 | Islamabad |

(`gpa` means *grade point average*, a score from 0 to 4. `class_id` says which class the student is in.)

```
          columns (fields)
     ┌──────┬────────┬───────┐
     │ id   │ name   │ grade │
     ├──────┼────────┼───────┤
row →│ 1    │ Zayd   │ 8     │
row →│ 2    │ Maryam │ 7     │
     └──────┴────────┴───────┘
                ▲
         one value (cell)
```

### Key words

1. **Table**: a grid of data about one kind of thing, such as `students` or `books`. Some books call it an **entity**.
2. **Column** (or **field**): one fact that every row has, such as `name` or `city`. Every value in a column has the same type. The `grade` column holds only whole numbers.
3. **Row** (or **record**): one real thing. Row 3 holds everything about Bilal.
4. **Value** (or **cell**): one piece of data where a row meets a column. Bilal's city is `'Lahore'`.

The table above has **6 columns** and **8 rows**.

---

## 📚 A Second Example: The Library Books

The `books` table describes the school library:

| id | title | category | pages | available |
| ---: | :--- | :--- | ---: | :--- |
| 1 | Clean Code | Programming | 464 | Yes |
| 2 | Algorithm Design | Computer Science | 320 | Yes |
| 3 | Ethical Technology | Ethics | 210 | No |
| 4 | HTML & CSS Architecture | Web | 288 | Yes |
| 5 | Python Data Science | Data | 352 | No |
| 6 | Digital Stewardship | Ethics | 180 | Yes |
| 7 | Introduction to Networks | Computer Science | 240 | Yes |
| 8 | Arabic Calligraphy Basics | Art | 120 | Yes |

Notice the pattern:

- **Columns** say *what we know* about every book: title, category, pages, available.
- **Rows** are *the books themselves*, one per shelf copy.
- If the library buys 1,000 more books, we add 1,000 new **rows**. We do **not** add new columns.

New columns are only for a new *kind* of fact, for example if the library starts recording each book's language.

---

## 📏 The Three Golden Rules of Table Design

### Rule 1: One table = one kind of thing
Do not mix unrelated facts in one table.

- ❌ One giant table with students, their borrowed books and their teachers' phone numbers.
- ✅ Separate tables: `students`, `books`, `classes`, and a `loans` table that records each time a student borrows a book.

### Rule 2: One value per cell
Each cell holds one single piece of information. This is called an **atomic** value (it cannot be split further).

- ❌ A `borrowed_books` cell holding `'Clean Code, Algorithm Design'`.
- ✅ One row per borrowing in the `loans` table:

| id | student_id | book_id |
| ---: | ---: | ---: |
| 1 | 1 | 1 |
| 2 | 1 | 2 |

Both rows belong to student 1 (Zayd), one for each book.

### Rule 3: Every row can be told apart
Two students can share the same name. So every table gets a column with a unique number, usually called `id`. This is the **primary key**, like a student ID card. You will set one up in Chapter 7.

---

## ⚠️ Common Mistake

**Mistake: adding a column for every new item.**

```
books table (wrong)
┌────┬──────────┬──────────┬──────────┐
│ id │ book1    │ book2    │ book3    │
└────┴──────────┴──────────┴──────────┘
```

What happens: the library buys a fourth book and the table has no room. You must change the table's design each time, and searching becomes very hard.

**Fixed version:** one column per *kind of fact* (`title`, `category`, `pages`) and one **row** per book. The table never needs to grow sideways.

---

## ✍️ Try It

Open the [SQL Sandbox](../studios/sql-sandbox/) and look at the `donations` table. Answer:

1. How many columns does it have? Name them.
2. How many rows?
3. What is the value in the `cause` column of row 2?

*Hint: in the sandbox, type `SELECT * FROM donations;` and press Run. You will learn exactly what this means in Chapter 9.*

---

## 📝 Recap

- A **table** stores data about one kind of thing.
- A **column** is one fact every row has; all its values share one type.
- A **row** is one real thing, such as one student or one book.
- More things = more rows, not more columns.
- Good tables follow three rules: one kind of thing, one value per cell, a unique `id` for every row.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. What is the difference between a **column** and a **row**?
2. A school enrols 250 new students. Does `students` gain 250 new columns or 250 new rows?
3. Why do we need an `id` column when students already have names?

<details>
<summary>Show answer</summary>

1. A column is one fact that every row has (like `city`). A row is one complete record (like everything about Bilal).
2. **250 new rows.**
3. Two students can have the same name. The `id` is unique, so the computer never mixes them up.

</details>

### 🟡 Level 2: Apply
A community honey farm wants an `inventory` table. It must track the product name, jar size in grams, selling price, and jars in stock. Write the column names you would use and give one example row.

<details>
<summary>Show answer</summary>

| id | product_name | jar_grams | price | jars_in_stock |
| ---: | :--- | ---: | ---: | ---: |
| 1 | Wildflower Honey | 500 | 950.00 | 40 |

Any clear names are fine, as long as there is an `id` and one column per fact.

</details>

### 🔴 Level 3: Challenge
A junior coder made a table called `library_users` with this column:

`borrowed_books: "Quran Stories, Math Class 9, Web Design"`

1. Which golden rule does this break?
2. Describe a better design using separate tables.

<details>
<summary>Show one possible answer</summary>

1. It breaks **Rule 2: one value per cell**. Three books are squeezed into one cell. It also mixes two kinds of thing (users and books), breaking Rule 1.
2. Better design:
   - `students` (id, name, ...) — one row per student.
   - `books` (id, title, ...) — one row per book.
   - `loans` (id, student_id, book_id, loan_date) — one row each time a student borrows a book.

Now a student who borrows three books simply has three rows in `loans`.

</details>
