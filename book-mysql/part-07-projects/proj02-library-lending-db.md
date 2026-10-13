# Capstone Project 2: Neighborhood Library & Book Lending Database

> **Project Mission**: Build a fair, friendly community library system. Track the books and how many copies are on the shelf, the members, and every borrowing with its due date, so that reminders go out on time.

---

## 🌟 Real-Life Story

A neighbourhood library runs on trust. Members borrow a book for two weeks and bring it back. The volunteers want three things: to know which copies are on the shelf, to send a polite reminder when a book is past its due date, and to see which books the community loves most. There are no fines. A kind reminder is enough. This project builds the database behind that library.

## 🎯 What You Will Learn

- Design a lending system with three linked tables.
- Use `NULL` to mean "not returned yet".
- Find books that are out and books that are past their due date.
- Keep copy counts correct with a transaction.
- Rank books by popularity with `LEFT JOIN` and `GROUP BY`.

---

## 🗺️ Step 1: Plan the Tables

Members and books have a many-to-many relationship: one member borrows many books, and one book is borrowed by many members over time. The junction table is `borrow_records`. Each row is one borrowing.

```
members          books
┌────────────┐   ┌──────────────────┐
│ PK id      │   │ PK id            │
│ card_number│   │ isbn             │
│ full_name  │   │ title, author    │
│ phone      │   │ category         │
│ joined_date│   │ total_copies     │
│ is_active  │   │ available_copies │
└─────┬──────┘   └────────┬─────────┘
      └──────┐    ┌───────┘
             ▼    ▼
       borrow_records
       ┌─────────────────────┐
       │ PK id               │
       │ FK member_id        │
       │ FK book_id          │
       │ borrow_date         │
       │ due_date            │
       │ return_date (NULL   │
       │   while still out)  │
       │ status              │
       └─────────────────────┘
```

We store a phone number only because the library needs it for reminders. Nothing else personal is collected (*Amānah*).

---

## 🛠️ Step 2: Create the Database

```sql
CREATE DATABASE IF NOT EXISTS community_library_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE community_library_db;

CREATE TABLE IF NOT EXISTS members (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    card_number  VARCHAR(15) NOT NULL UNIQUE,
    full_name    VARCHAR(100) NOT NULL,
    phone        VARCHAR(20) NOT NULL,
    joined_date  DATE NOT NULL,
    is_active    BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS books (
    id               INT AUTO_INCREMENT PRIMARY KEY,
    isbn             VARCHAR(20) NOT NULL UNIQUE,
    title            VARCHAR(150) NOT NULL,
    author           VARCHAR(100) NOT NULL,
    category         VARCHAR(50) NOT NULL DEFAULT 'General',
    total_copies     INT NOT NULL DEFAULT 1 CHECK (total_copies >= 0),
    available_copies INT NOT NULL DEFAULT 1 CHECK (available_copies >= 0)
);

CREATE TABLE IF NOT EXISTS borrow_records (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    member_id    INT NOT NULL,
    book_id      INT NOT NULL,
    borrow_date  DATE NOT NULL,
    due_date     DATE NOT NULL,
    return_date  DATE NULL,
    status       VARCHAR(20) NOT NULL DEFAULT 'Borrowed',
    CONSTRAINT fk_loan_member FOREIGN KEY (member_id) REFERENCES members(id),
    CONSTRAINT fk_loan_book   FOREIGN KEY (book_id)   REFERENCES books(id)
);
```

- `return_date DATE NULL` is allowed to be empty. `NULL` here means "still borrowed".
- `CHECK (available_copies >= 0)` makes it impossible to lend a copy that is not on the shelf.
- Foreign keys use the safe default (`RESTRICT`), so a member with borrowing history cannot be deleted by accident. Use `is_active = FALSE` instead.

---

## 📥 Step 3: Add Sample Data

```sql
INSERT INTO members (card_number, full_name, phone, joined_date) VALUES
  ('LIB-1001', 'Aisha Siddiq',  '0300-0000001', '2026-01-10'),
  ('LIB-1002', 'Bilal Mansoor', '0300-0000002', '2026-02-14'),
  ('LIB-1003', 'Fatima Zahra',  '0300-0000003', '2026-03-01'),
  ('LIB-1004', 'Hamza Tariq',   '0300-0000004', '2026-04-12');

INSERT INTO books (isbn, title, author, category, total_copies, available_copies) VALUES
  ('978-01', 'Web Development for Juniors',  'S. Ahmed',   'Technology', 5, 4),
  ('978-02', 'Ethics in the Digital Age',    'Dr. Amina',  'Ethics',     3, 2),
  ('978-03', 'Stories from Islamic History', 'R. Hussain', 'History',    8, 8),
  ('978-04', 'Clean Code & Craftsmanship',   'K. Malik',   'Technology', 1, 0);

INSERT INTO borrow_records (member_id, book_id, borrow_date, due_date, return_date, status) VALUES
  (1, 1, '2026-09-01', '2026-09-15', '2026-09-14', 'Returned'),
  (1, 2, '2026-09-28', '2026-10-12', NULL,         'Borrowed'),
  (2, 4, '2026-10-05', '2026-10-19', NULL,         'Borrowed'),
  (3, 1, '2026-08-20', '2026-09-03', '2026-09-02', 'Returned'),
  (3, 1, '2026-09-20', '2026-10-04', NULL,         'Borrowed');
```

All names, numbers and books are sample data. Check that the counts agree: three records are still out (books 1, 2 and 4), and each of those books shows one copy fewer on the shelf.

---

## 📊 Step 4: Everyday Queries

### Query 1: What is out right now?

```sql
SELECT m.card_number, m.full_name AS borrower, b.title,
       r.borrow_date, r.due_date
FROM borrow_records r
JOIN members m ON r.member_id = m.id
JOIN books b   ON r.book_id = b.id
WHERE r.return_date IS NULL
ORDER BY r.due_date;
```

| card_number | borrower | title | borrow_date | due_date |
| :--- | :--- | :--- | :--- | :--- |
| LIB-1003 | Fatima Zahra | Web Development for Juniors | 2026-09-20 | 2026-10-04 |
| LIB-1001 | Aisha Siddiq | Ethics in the Digital Age | 2026-09-28 | 2026-10-12 |
| LIB-1002 | Bilal Mansoor | Clean Code & Craftsmanship | 2026-10-05 | 2026-10-19 |

### Query 2: Who needs a reminder?

Loans past their due date on 13 October 2026. `DATEDIFF(a, b)` is a MySQL function that gives the number of days from date `b` to date `a`:

```sql
SELECT m.full_name, b.title, r.due_date,
       DATEDIFF('2026-10-13', r.due_date) AS days_late
FROM borrow_records r
JOIN members m ON r.member_id = m.id
JOIN books b   ON r.book_id = b.id
WHERE r.return_date IS NULL
  AND r.due_date < '2026-10-13'
ORDER BY days_late DESC;
```

| full_name | title | due_date | days_late |
| :--- | :--- | :--- | ---: |
| Fatima Zahra | Web Development for Juniors | 2026-10-04 | 9 |
| Aisha Siddiq | Ethics in the Digital Age | 2026-10-12 | 1 |

In a real app, write `CURRENT_DATE` (today's date) instead of `'2026-10-13'`. We used a fixed date so your result matches the book.

> 🧪 **Sandbox note:** SQLite has no `DATEDIFF`. There you would write `julianday('2026-10-13') - julianday(due_date)`.

### Query 3: The community's favourite books

```sql
SELECT b.title, COUNT(r.id) AS times_borrowed
FROM books b
LEFT JOIN borrow_records r ON b.id = r.book_id
GROUP BY b.id, b.title
ORDER BY times_borrowed DESC, b.title;
```

| title | times_borrowed |
| :--- | ---: |
| Web Development for Juniors | 3 |
| Clean Code & Craftsmanship | 1 |
| Ethics in the Digital Age | 1 |
| Stories from Islamic History | 0 |

The `LEFT JOIN` keeps *Stories from Islamic History*, so the volunteers can see it deserves a display table.

### Query 4: Members who have not borrowed yet (subquery)

```sql
SELECT full_name FROM members
WHERE id NOT IN (SELECT member_id FROM borrow_records);
```

| full_name |
| :--- |
| Hamza Tariq |

---

## 🔁 Step 5: Lending and Returning Safely

Lending a book changes **two** tables. A transaction (Chapter 14) keeps them in step.

### Lend a book

Hamza borrows *Stories from Islamic History* (book 3) for 14 days:

```sql
START TRANSACTION;

UPDATE books
SET available_copies = available_copies - 1
WHERE id = 3 AND available_copies > 0;

INSERT INTO borrow_records (member_id, book_id, borrow_date, due_date)
VALUES (4, 3, '2026-10-13', '2026-10-27');

COMMIT;
```

The `UPDATE` reports `Rows matched: 1  Changed: 1`, so a copy was free. Book 3 now shows 7 available copies, and the new record has `return_date` = `NULL` and `status` = `'Borrowed'` (the default).

### When no copy is free

Book 4 has 0 copies on the shelf. The same `UPDATE` with `AND available_copies > 0` reports `Rows matched: 0  Changed: 0`. Seeing 0, the volunteer runs `ROLLBACK;` instead of adding the record. (Without the `AND` test, the `CHECK` rule would stop it anyway: ``ERROR 4025: CONSTRAINT `books.available_copies` failed``.)

### Return a book

Fatima brings back her copy (record 5):

```sql
START TRANSACTION;

UPDATE borrow_records
SET return_date = '2026-10-13', status = 'Returned'
WHERE id = 5;

UPDATE books
SET available_copies = available_copies + 1
WHERE id = 1;

COMMIT;
```

Book 1 is back to 5 of 5 copies on the shelf.

---

## ⚠️ Common Mistake

**Mistake: updating only one table.**

A volunteer adds a borrow record but forgets to lower `available_copies`. The catalogue now says a copy is on the shelf when it is not, and the next member is disappointed.

**Fix:** always lend and return inside one transaction, as in Step 5, and check the "Rows matched" number before you commit.

**Mistake: testing `return_date = NULL`.** It never matches (Chapter 10). Use `return_date IS NULL`.

---

## ✍️ Try It

Aisha returns *Ethics in the Digital Age* (record 2). Write the transaction, then re-run Query 1 and Query 2.

*Hint: update `borrow_records` (record 2) and `books` (book 2). Afterwards, only Bilal's loan is still out, and nobody needs a reminder.*

---

## 📝 Recap

- `borrow_records` links members and books; `return_date IS NULL` means "still out".
- `CHECK (available_copies >= 0)` makes lending a missing copy impossible.
- Joins answer "what is out?"; date tests answer "who needs a reminder?"
- `LEFT JOIN` + `COUNT` ranks books and keeps unborrowed ones visible.
- Lending and returning change two tables, so wrap them in a transaction.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. What does `return_date = NULL` mean in this design, and how do you search for it?
2. Why does `books` store both `total_copies` and `available_copies`?
3. Why is a transaction used when lending a book?

<details>
<summary>Show answer</summary>

1. The book is still borrowed. Search with `WHERE return_date IS NULL`.
2. `total_copies` is how many the library owns; `available_copies` is how many are on the shelf now.
3. Lending changes two tables (a new borrow record and one fewer copy). Both must happen, or neither.

</details>

### 🟡 Level 2: Apply
Show each book category with its total copies and the copies on the shelf (use the starting data).

<details>
<summary>Show answer</summary>

```sql
SELECT category,
       SUM(total_copies)     AS copies,
       SUM(available_copies) AS on_shelf
FROM books
GROUP BY category
ORDER BY category;
```

| category | copies | on_shelf |
| :--- | ---: | ---: |
| Ethics | 3 | 2 |
| History | 8 | 8 |
| Technology | 6 | 4 |

</details>

### 🔴 Level 3: Challenge
Add a **renewal** feature: a member may extend a loan by 14 days, once.

1. Add a column `renewed` (`BOOLEAN`, default `FALSE`) to `borrow_records`.
2. Write one `UPDATE` that renews record 3 only if it is still out and has not been renewed. Use `DATE_ADD(due_date, INTERVAL 14 DAY)`, which adds 14 days to a date.
3. Explain how a renewal limit keeps the library fair to everyone.

<details>
<summary>Show one possible answer</summary>

```sql
ALTER TABLE borrow_records
ADD COLUMN renewed BOOLEAN NOT NULL DEFAULT FALSE;

UPDATE borrow_records
SET due_date = DATE_ADD(due_date, INTERVAL 14 DAY),
    renewed  = TRUE
WHERE id = 3
  AND return_date IS NULL
  AND renewed = FALSE;
```

Bilal's due date moves from 2026-10-19 to 2026-11-02. Running the same `UPDATE` again changes 0 rows, because `renewed` is now `TRUE`.

3. Popular books have few copies. A limit stops one member from keeping a book for months, so others get their turn too.

</details>
