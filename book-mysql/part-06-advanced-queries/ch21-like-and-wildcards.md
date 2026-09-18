# Chapter 21: Pattern Matching — LIKE & Wildcards

> **Key Idea**: The `LIKE` operator performs search matching using wildcards: `%` matches any sequence of zero or more characters, while `_` matches exactly one single character.

---

## 1. Why Exact Matches Aren't Enough

The `=` operator requires an exact match:
```sql
SELECT * FROM students WHERE full_name = 'Aisha';
```
If the student's name in the table is `"Aisha Siddiq"`, the query above returns nothing!

When users type into a search bar on a website, they expect partial matching:
- Finding any book with *"Web"* anywhere in the title.
- Finding all email addresses ending in *"@gmail.com"*.
- Finding names starting with *"Moh"*.

---

## 2. The Two SQL Wildcards

### 1. The Percent Wildcard (`%`): Any Sequence of Characters
The `%` symbol matches zero, one, or any number of characters.

```sql
-- Starts with 'A': 'Aisha', 'Ahmed', 'Ali'
SELECT full_name FROM students WHERE full_name LIKE 'A%';

-- Ends with '.in': Matches any Indian academic or domain email
SELECT full_name, email FROM students WHERE email LIKE '%.in';


-- Contains 'sql' anywhere in the title: 'Learning MySQL', 'SQL Basics', 'Advanced SQL'
SELECT title FROM books WHERE title LIKE '%sql%';
```

---

### 2. The Underscore Wildcard (`_`): Exactly One Character
The `_` symbol matches **strictly one single character**.

```sql
-- Matches 4-letter names starting with 'Z' and ending with 'yd': 'Zayd'
SELECT full_name FROM students WHERE full_name LIKE 'Z__d';

-- Matches course codes like 'CS-101', 'CS-102', 'CS-201'
SELECT course_code, course_name 
FROM courses 
WHERE course_code LIKE 'CS-___';
```

---

## 3. Case Sensitivity in MySQL Searches

By default, standard MySQL string searches using `utf8mb4_unicode_ci` are **case-insensitive** (indicated by `_ci`):
```sql
-- Both queries find 'Aisha Siddiq', 'aisha siddiq', and 'AISHA SIDDIQ':
SELECT * FROM students WHERE full_name LIKE 'aisha%';
SELECT * FROM students WHERE full_name LIKE 'AISHA%';
```

If you ever need an exact case-sensitive binary search, prepend `BINARY`:
```sql
SELECT * FROM users WHERE BINARY username = 'Admin';
```

---

## 4. Searching for Real `%` or `_` Characters (Escaping)

What if you want to find products with a `"20% discount"` in their description?

If you write `LIKE '%20%%'`, MySQL treats both `%` as wildcards! To search for a literal percent or underscore, escape it with a backslash (`\`):

```sql
-- Matches descriptions containing literal '20%'
SELECT * FROM promotions WHERE description LIKE '%\20\%%';
```

---

## 5. Review & Practice

### 🟢 Level 1: Recall
1. What does the `%` wildcard match in SQL?
2. What does the `_` wildcard match in SQL?
3. Which operator is used with wildcards instead of `=`?

### 🟡 Level 2: Write Search Queries
Given a `books` table:
1. Write a query to find all books whose titles begin with the word `"Introduction"`.
2. Write a query to find all books whose author's last name contains `"Khan"`.
3. Write a query to find all students whose school roll number follows the exact pattern `S-2025-___` (where `___` are three digits).

### 🔴 Level 3: Performance Insight
Why is `LIKE '%web%'` (wildcard at the very start) much slower on a database table of 1 million rows compared to `LIKE 'web%'` (wildcard only at the end)?
