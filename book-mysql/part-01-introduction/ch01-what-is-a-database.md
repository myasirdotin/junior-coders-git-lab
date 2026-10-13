# Chapter 1: What is a Database?

> **Key Idea**: A database is a tidy, safe and permanent digital filing cabinet. It lets an app store, search and protect a lot of information very quickly.

---

## 🌟 Real-Life Story

Picture the school library on a busy morning. Mr. Imran keeps every borrowing record on loose paper slips in a drawer. A parent calls to ask which book Zayd took home. Mr. Imran has to dig through hundreds of slips. Then a slip falls behind the cupboard, and nobody knows the book is missing. A database is the library's answer: one organised place where every record can be found in a blink.

## 🎯 What You Will Learn

- Explain what a database is and why apps need one.
- Compare a database with a spreadsheet.
- Describe what an RDBMS and SQL are.
- Read a very short SQL question and guess what it does.
- Explain why stored data is a trust (*Amānah*).

---

## 📂 The Filing Cabinet Analogy

Imagine a community academy with 500 students. Each student's name, class and attendance is written on loose sheets in desk drawers.

- Finding one student's details means digging through hundreds of sheets.
- Two teachers cannot update the same folder at the same time.
- If water spills on the drawer, the records are lost for good.

```
Paper slips / text files
┌──────────────────────────┐
│ notes.txt                │ → slow to search
│ names, classes, books... │ → easy to lose
└──────────────────────────┘

Database (MySQL)
┌──────────────────────────┐
│ Database server          │ → fast lookups
│ many tidy tables         │ → many users
└──────────────────────────┘
```

A **database** is an organised collection of data. It is looked after by special **server** software (a program that waits for requests and answers them). That software is built for four things: **speed**, **reliability**, **security** and **many users at once**.

---

## 📊 Database vs. Spreadsheet

<div align="center" style="margin: 2rem 0;">
  <img src="../assets/diagrams/mysql/database-vs-spreadsheet.svg" alt="Spreadsheet vs Relational Database" style="max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
</div>

Many beginners ask: *"Why not keep everything in Excel or Google Sheets?"*

Spreadsheets are great for small lists, quick sums and simple charts. But a real app, such as a school portal or a hospital appointment system, needs more:

| Feature | Spreadsheet | Database (MySQL) |
| :--- | :--- | :--- |
| **Size** | Slows down with very many rows. | Searches millions of rows quickly. |
| **Many users** | Edits at the same time can overwrite each other. | Many users can read and write safely. |
| **Correct data** | Anyone can type letters into a number column. | Rules for each column block wrong data. |
| **Privacy (*Amānah*)** | Usually all-or-nothing access to the file. | Each user gets only the access they need. |
| **Links between lists** | Fragile formulas between sheets. | Tables link cleanly with keys and JOINs. |

---

## 🗄️ What is an RDBMS?

**RDBMS** stands for **Relational Database Management System**.

- **Relational** means data is kept in **tables** (grids of rows and columns) that can be linked, or *related*, to each other.
- **MySQL** is one of the most popular free, open-source RDBMS programs. **MariaDB** is its close cousin. XAMPP actually installs MariaDB, and it understands the same SQL. Large sites such as Wikipedia run on MariaDB.

```
┌──────────────────────────┐
│ App (PHP website, phone) │
└────────────┬─────────────┘
             │ sends an SQL question
             ▼
┌──────────────────────────┐
│ MySQL / MariaDB server   │
│ ┌──────────┐ ┌─────────┐ │
│ │ students │ │  books  │ │
│ └──────────┘ └─────────┘ │
└────────────┬─────────────┘
             │ sends back rows
             ▼
       the app shows them
```

---

## 💬 What is SQL?

**SQL** (said *"sequel"* or *"S-Q-L"*) stands for **Structured Query Language**. A **query** is a question you ask the database.

SQL is the shared language of relational databases. MySQL, MariaDB, PostgreSQL and SQLite all use it. Each has small differences, but the core words are the same.

Here is a preview. You will learn every part of it in Chapters 10–12. For now, just read it like English:

```sql
-- Show the name, grade and city of students in Grade 9 or above
SELECT name, grade, city
FROM students
WHERE grade >= 9
ORDER BY name;
```

On this book's school database, the answer is:

| name | grade | city |
| :--- | ---: | :--- |
| Bilal | 9 | Lahore |
| Khadija | 9 | Islamabad |
| Tariq | 9 | Karachi |

Read it aloud: *"Select name, grade and city from students where the grade is 9 or more, sorted by name."* SQL was designed to read almost like a sentence.

---

## 🏫 The School Database in This Book

Every chapter uses one running example, a database called `school_db`. It has five tables:

| Table | What one row means |
| :--- | :--- |
| `classes` | One class, such as Grade 8 Eagles, and its teacher |
| `students` | One student: name, grade, GPA, class and city |
| `books` | One library book: title, category, pages |
| `loans` | One time a student **borrowed a library book** |
| `donations` | One gift to a school charity drive |

You will build these tables yourself in Chapters 4–9. The same tables are already loaded in the site's [SQL Sandbox](../studios/sql-sandbox/), so you can practise any time.

---

## 🤲 Beneficial Knowledge & Digital Stewardship (*'Ilm Nāfi' & Amānah*)

Storing people's data is not only a technical skill. It is a moral duty. In Islamic ethics, entrusted data is an **Amānah** (a trust you must look after).

1. **Truthfulness (*Ṣidq*)**: A database must hold true records. Never change grades or numbers to mislead anyone.
2. **Privacy**: People trust us with their names and contact details. We never leak or sell them, and we never leave a database open without a password.
3. **Store only what you need**: If the library only needs a student's name and class, do not also collect their home address.
4. **Beneficial purpose**: Use databases to help your community: school records, hospital schedules, charity and Zakat trackers.

---

## ⚠️ Common Mistake

**Mistake: "A spreadsheet file is the same as a database."**

A student keeps the library list in `books.xlsx` and shares it with five helpers. Two helpers edit it at once. One helper's changes disappear, and nobody notices.

**Better:** keep shared, important records in a database. The server handles many users safely, and column rules stop wrong data from getting in. Use a spreadsheet for small personal lists.

---

## ✍️ Try It

Open the [SQL Sandbox](../studios/sql-sandbox/). Find the list of tables on the page. Write down the five table names and guess two columns for each one.

*Hint: the names match the table in "The School Database in This Book" above.*

---

## 📝 Recap

- A **database** is an organised, permanent store of data, run by server software.
- Databases beat spreadsheets for size, many users, correct data and privacy.
- An **RDBMS** keeps data in linked **tables**. MySQL and MariaDB are popular examples.
- **SQL** is the language we use to ask a database questions.
- Stored data is an *Amānah*: keep it true, private and as small as needed.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. What does **RDBMS** stand for?
2. What language do we use to talk to a MySQL database?
3. Name two reasons a database is better than a spreadsheet for a web app.

<details>
<summary>Show answer</summary>

1. **Relational Database Management System**.
2. **SQL** (Structured Query Language).
3. Any two: it stays fast with very many rows; many users can edit safely at once; column rules stop wrong data; each user can get only the access they need; tables link cleanly.

</details>

### 🟡 Level 2: Apply
A school app stores each student's name, class and parent's phone number. Explain two ways the idea of *Amānah* (trust) should guide how the developer designs this database.

<details>
<summary>Show answer</summary>

Any two, for example:

- **Privacy:** protect the database with a password and give each user only the access they need, so phone numbers cannot leak.
- **Store only what is needed:** do not collect extra details such as home addresses if the app does not use them.
- **Truthfulness:** keep records accurate and never change them to mislead.

</details>

### 🔴 Level 3: Challenge
A community health clinic keeps patient appointments and its medicine stock in one Excel file on the front-desk laptop.

1. List three risks of this set-up.
2. For each risk, say how a MySQL database would help.

<details>
<summary>Show one possible answer</summary>

| Risk with the Excel file | How a database helps |
| :--- | :--- |
| The laptop breaks or is stolen, and the data is gone. | The data lives on a server that can be backed up. |
| Two staff edit at once and overwrite each other. | The server handles many users safely. |
| Anyone who opens the file sees every patient. | Each user gets only the access they need. |
| Someone types "ten" in the stock column. | Column types reject wrong data. |

</details>
