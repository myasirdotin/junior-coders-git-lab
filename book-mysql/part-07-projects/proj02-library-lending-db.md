# Capstone Project 2: Neighborhood Library & Book Lending Database

> **Project Mission**: Construct an ethical community library lending system. Track physical book inventory, member cards, active loans, return dates, and stock replenishment.

---

## 1. Relational Schema Architecture

The library system models a classic many-to-many relationship between **Members** and **Books**, mediated through a **Borrow Records** transaction table:

```
┌──────────────────┐           ┌──────────────────┐
│     members      │           │      books       │
├──────────────────┤           ├──────────────────┤
│ PK: id           │           │ PK: id           │
│ card_number      │           │ isbn (UNIQUE)    │
│ full_name        │           │ title            │
│ phone            │           │ author           │
│ joined_date      │           │ total_copies     │
│ is_active        │           │ available_copies │
└────────┬─────────┘           └────────┬─────────┘
         │                              │
         └──────────────┬───────────────┘
                        ▼
         ┌──────────────────────────────┐
         │        borrow_records        │
         ├──────────────────────────────┤
         │ PK: id                       │
         │ FK: member_id ───────────────┤
         │ FK: book_id   ───────────────┤
         │ borrow_date                  │
         │ due_date                     │
         │ return_date (NULL if out)    │
         │ status (Borrowed, Returned)  │
         └──────────────────────────────┘
```

---

## 2. DDL Schema Definition

```sql
CREATE DATABASE IF NOT EXISTS community_library_db
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

USE community_library_db;

-- 1. Members Table
CREATE TABLE IF NOT EXISTS members (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    card_number  VARCHAR(15) NOT NULL UNIQUE,
    full_name    VARCHAR(100) NOT NULL,
    phone        VARCHAR(20) NOT NULL,
    joined_date  DATE NOT NULL,
    is_active    BOOLEAN NOT NULL DEFAULT TRUE
) ENGINE=InnoDB;

-- 2. Books Table
CREATE TABLE IF NOT EXISTS books (
    id               INT AUTO_INCREMENT PRIMARY KEY,
    isbn             VARCHAR(20) NOT NULL UNIQUE,
    title            VARCHAR(150) NOT NULL,
    author           VARCHAR(100) NOT NULL,
    category         VARCHAR(50) NOT NULL DEFAULT 'General',
    total_copies     INT NOT NULL DEFAULT 1 CHECK (total_copies >= 0),
    available_copies INT NOT NULL DEFAULT 1 CHECK (available_copies >= 0)
) ENGINE=InnoDB;

-- 3. Borrow Records Table
CREATE TABLE IF NOT EXISTS borrow_records (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    member_id    INT NOT NULL,
    book_id      INT NOT NULL,
    borrow_date  DATE NOT NULL,
    due_date     DATE NOT NULL,
    return_date  DATE NULL,
    status       VARCHAR(20) NOT NULL DEFAULT 'Borrowed',
    
    CONSTRAINT fk_loan_member 
      FOREIGN KEY (member_id) REFERENCES members(id) 
      ON UPDATE CASCADE ON DELETE RESTRICT,
      
    CONSTRAINT fk_loan_book 
      FOREIGN KEY (book_id) REFERENCES books(id) 
      ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;
```

---

## 3. Seed Data Insertion

```sql
-- Insert Library Members
INSERT INTO members (card_number, full_name, phone, joined_date) VALUES
('LIB-1001', 'Aisha Siddiq', '+91-94190-11223', '2025-01-10'),
('LIB-1002', 'Bilal Mansoor', '+91-99060-44556', '2025-02-14'),
('LIB-1003', 'Fatima Zahra', '+91-97970-77889', '2025-03-01'),
('LIB-1004', 'Hamza Tariq', '+91-96220-00112', '2025-04-12');


-- Insert Book Collection
INSERT INTO books (isbn, title, author, category, total_copies, available_copies) VALUES
('978-01', 'Web Development for Juniors', 'Yasir Rasool', 'Technology', 5, 4),
('978-02', 'Ethics in the Digital Age', 'Dr. Amina Khan', 'Ethics', 3, 2),
('978-03', 'Stories of the Prophets', 'Ibn Kathir', 'History', 8, 8),
('978-04', 'Clean Code & Craftsmanship', 'Robert Martin', 'Technology', 4, 3);

-- Insert Borrowing Activity
INSERT INTO borrow_records (member_id, book_id, borrow_date, due_date, return_date, status) VALUES
(1, 1, '2025-09-01', '2025-09-15', '2025-09-14', 'Returned'),
(1, 2, '2025-09-15', '2025-09-29', NULL, 'Borrowed'),
(2, 4, '2025-09-10', '2025-09-24', NULL, 'Borrowed'),
(3, 1, '2025-08-20', '2025-09-03', '2025-09-02', 'Returned');
```

---

## 4. Production Queries

### Query 1: Which Books Are Currently Checked Out?
Find all active loans that have not been returned yet:

```sql
SELECT 
    m.card_number,
    m.full_name AS borrower_name,
    m.phone,
    b.title AS book_title,
    r.borrow_date,
    r.due_date
FROM borrow_records r
JOIN members m ON r.member_id = m.id
JOIN books b ON r.book_id = b.id
WHERE r.return_date IS NULL
ORDER BY r.due_date ASC;
```

---

### Query 2: Overdue Book Detection
Find any loans where the due date has passed today and the book is still not returned:

```sql
SELECT 
    m.full_name,
    m.phone,
    b.title,
    r.due_date,
    DATEDIFF(CURRENT_DATE, r.due_date) AS days_overdue
FROM borrow_records r
JOIN members m ON r.member_id = m.id
JOIN books b ON r.book_id = b.id
WHERE r.return_date IS NULL AND r.due_date < CURRENT_DATE;
```

---

### Query 3: Most Popular Books in the Community
Rank books by how many times they have been borrowed:

```sql
SELECT 
    b.title,
    b.author,
    COUNT(r.id) AS borrow_count
FROM books b
LEFT JOIN borrow_records r ON b.id = r.book_id
GROUP BY b.id, b.title, b.author
ORDER BY borrow_count DESC;
```

---

## 5. Review & Self-Directed Extension
Can you write a MySQL `TRANSACTION` that:
1. Inserts a new row into `borrow_records` when student Bilal borrows a book.
2. Decrements `available_copies` by 1 in the `books` table.
3. Automatically rolls back if `available_copies <= 0`?
