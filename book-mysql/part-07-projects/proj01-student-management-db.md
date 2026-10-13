# Capstone Project 1: School Student & Grade Management Database

> **Project Mission**: Design, build and query a complete database for a school's courses and exam marks. You will use everything from this book: tables, keys, constraints, inserts, joins, grouping and subqueries.

---

## 🌟 Real-Life Story

At the end of term, the school office prepares report cards. Each student takes several courses, and each course has many students. On paper, this means piles of mark sheets, one per course, and someone copying marks onto every student's card by hand. One copying slip and a student gets the wrong mark. In this project you build the database that prints every report card straight from one trusted set of marks.

## 🎯 What You Will Learn

- Design a "many-to-many" link with a junction table.
- Build three tables with primary keys, foreign keys and `CHECK` / `UNIQUE` rules.
- Load sample data with multi-row `INSERT`s.
- Write report queries with `JOIN`, `GROUP BY`, `HAVING` and a subquery.
- Test that the rules really protect the data.

---

## 🗺️ Step 1: Plan the Tables

A student takes many courses, and a course has many students. This is a **many-to-many** relationship. We cannot store it in `students` or in `courses` alone. Instead we add a third table, `enrollments`, where each row means "this student takes this course". A table that links two others like this is called a **junction table**.

```
students          courses
┌───────────┐     ┌──────────────┐
│ PK id     │     │ PK id        │
│ roll_no   │     │ course_code  │
│ full_name │     │ course_title │
│ email     │     │ credit_hours │
│ grade     │     │ teacher_name │
└─────┬─────┘     └──────┬───────┘
      │                  │
      └──────┐   ┌───────┘
             ▼   ▼
        enrollments
        ┌───────────────┐
        │ PK id         │
        │ FK student_id │
        │ FK course_id  │
        │ semester      │
        │ exam_marks    │
        │ grade_letter  │
        └───────────────┘
```

---

## 🛠️ Step 2: Create the Database and Tables

Run this in phpMyAdmin's **SQL** tab (or the command line):

```sql
CREATE DATABASE IF NOT EXISTS school_portal_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE school_portal_db;

CREATE TABLE IF NOT EXISTS students (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    roll_number   VARCHAR(15) NOT NULL UNIQUE,
    full_name     VARCHAR(100) NOT NULL,
    email         VARCHAR(150) NOT NULL UNIQUE,
    grade_level   INT NOT NULL CHECK (grade_level BETWEEN 6 AND 12),
    enrolled_date DATE NOT NULL,
    is_active     BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS courses (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    course_code   VARCHAR(15) NOT NULL UNIQUE,
    course_title  VARCHAR(100) NOT NULL,
    credit_hours  INT NOT NULL DEFAULT 3 CHECK (credit_hours BETWEEN 1 AND 5),
    teacher_name  VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS enrollments (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    student_id    INT NOT NULL,
    course_id     INT NOT NULL,
    semester      VARCHAR(20) NOT NULL DEFAULT 'Fall 2026',
    exam_marks    DECIMAL(5,2) NOT NULL CHECK (exam_marks BETWEEN 0 AND 100),
    grade_letter  CHAR(2) NOT NULL,
    CONSTRAINT fk_enr_student FOREIGN KEY (student_id) REFERENCES students(id),
    CONSTRAINT fk_enr_course  FOREIGN KEY (course_id)  REFERENCES courses(id),
    UNIQUE KEY uq_student_course_sem (student_id, course_id, semester)
);
```

Design choices to notice:

- `DECIMAL(5,2)` holds marks like `94.50` exactly (Chapter 6).
- The `UNIQUE KEY` on three columns together means a student cannot be enrolled in the same course twice in one semester. Each column alone may repeat; the **combination** may not.
- Both foreign keys use the safe default (`RESTRICT`, Chapter 16). Marks are an official record, so deleting a student must not silently delete their marks. Use the `is_active` flag (a soft delete, Chapter 14) when a student leaves.
- `students` and `courses` are created before `enrollments`, because parents come first.

---

## 📥 Step 3: Add Sample Data

```sql
INSERT INTO courses (course_code, course_title, credit_hours, teacher_name) VALUES
  ('CS-101',   'Intro to Computer Science',    3, 'Mr. Imran'),
  ('CS-201',   'Web & Database Engineering',   4, 'Mr. Imran'),
  ('MATH-101', 'Algebra Foundations',          3, 'Dr. Amina'),
  ('ETH-101',  'Ethics & Digital Stewardship', 2, 'Ms. Noor');

INSERT INTO students (roll_number, full_name, email, grade_level, enrolled_date) VALUES
  ('STD-001', 'Aisha Siddiq',  'aisha@school.example.org',  9,  '2026-08-15'),
  ('STD-002', 'Bilal Mansoor', 'bilal@school.example.org',  9,  '2026-08-15'),
  ('STD-003', 'Fatima Zahra',  'fatima@school.example.org', 10, '2026-08-16'),
  ('STD-004', 'Hamza Tariq',   'hamza@school.example.org',  9,  '2026-08-17'),
  ('STD-005', 'Zayd Ali',      'zayd@school.example.org',   10, '2026-08-18'),
  ('STD-006', 'Maryam Yusuf',  'maryam@school.example.org', 10, '2026-08-20');

INSERT INTO enrollments (student_id, course_id, exam_marks, grade_letter) VALUES
  (1, 1, 94.50, 'A+'), (1, 2, 92.00, 'A'),  (1, 4, 98.00, 'A+'),
  (2, 1, 85.00, 'A-'), (2, 3, 76.50, 'B'),
  (3, 2, 88.50, 'A'),  (3, 4, 95.00, 'A+'),
  (4, 1, 68.00, 'C+'),
  (5, 3, 82.00, 'B+');
```

All the data is sample data. The emails use `example.org`, a domain reserved for examples, so no real person is involved. We leave out `semester`, so every row gets the default `'Fall 2026'`. Maryam (STD-006) has just joined and has no enrollments yet.

---

## 📊 Step 4: Report Queries

### Report 1: Aisha's report card (three-table join)

```sql
SELECT s.roll_number, s.full_name AS student, c.course_code,
       c.course_title, e.exam_marks, e.grade_letter
FROM enrollments e
JOIN students s ON e.student_id = s.id
JOIN courses c  ON e.course_id = c.id
WHERE s.roll_number = 'STD-001'
ORDER BY e.exam_marks DESC;
```

| roll_number | student | course_code | course_title | exam_marks | grade_letter |
| :--- | :--- | :--- | :--- | ---: | :--- |
| STD-001 | Aisha Siddiq | ETH-101 | Ethics & Digital Stewardship | 98.00 | A+ |
| STD-001 | Aisha Siddiq | CS-101 | Intro to Computer Science | 94.50 | A+ |
| STD-001 | Aisha Siddiq | CS-201 | Web & Database Engineering | 92.00 | A |

### Report 2: Course statistics (LEFT JOIN + GROUP BY)

```sql
SELECT c.course_code,
       COUNT(e.student_id)          AS enrolled,
       ROUND(AVG(e.exam_marks), 2)  AS average,
       MIN(e.exam_marks)            AS lowest,
       MAX(e.exam_marks)            AS highest
FROM courses c
LEFT JOIN enrollments e ON c.id = e.course_id
GROUP BY c.id, c.course_code
ORDER BY average DESC;
```

| course_code | enrolled | average | lowest | highest |
| :--- | ---: | ---: | ---: | ---: |
| ETH-101 | 2 | 96.50 | 95.00 | 98.00 |
| CS-201 | 2 | 90.25 | 88.50 | 92.00 |
| CS-101 | 3 | 82.50 | 68.00 | 94.50 |
| MATH-101 | 2 | 79.25 | 76.50 | 82.00 |

The `LEFT JOIN` means a new course with no students would still be listed, with 0 enrolled.

### Report 3: Honour roll (HAVING)

Students whose average mark is 85 or more:

```sql
SELECT s.full_name,
       COUNT(e.course_id)          AS courses,
       ROUND(AVG(e.exam_marks), 2) AS average
FROM students s
JOIN enrollments e ON s.id = e.student_id
GROUP BY s.id, s.full_name
HAVING AVG(e.exam_marks) >= 85
ORDER BY average DESC;
```

| full_name | courses | average |
| :--- | ---: | ---: |
| Aisha Siddiq | 3 | 94.83 |
| Fatima Zahra | 2 | 91.75 |

### Report 4: Students not yet enrolled (anti-join)

```sql
SELECT s.roll_number, s.full_name
FROM students s
LEFT JOIN enrollments e ON e.student_id = s.id
WHERE e.id IS NULL;
```

| roll_number | full_name |
| :--- | :--- |
| STD-006 | Maryam Yusuf |

### Report 5: Above the course average (subquery)

Who scored above the CS-101 average (82.50)?

```sql
SELECT s.full_name, e.exam_marks
FROM enrollments e
JOIN students s ON s.id = e.student_id
WHERE e.course_id = 1
  AND e.exam_marks > (SELECT AVG(exam_marks)
                      FROM enrollments WHERE course_id = 1);
```

| full_name | exam_marks |
| :--- | ---: |
| Aisha Siddiq | 94.50 |
| Bilal Mansoor | 85.00 |

> 🧪 **Sandbox note:** These tables are not in the SQL Sandbox. Build this project in phpMyAdmin. (In SQLite you would write `INTEGER PRIMARY KEY` instead of `INT AUTO_INCREMENT PRIMARY KEY`.)

---

## 🛡️ Step 5: Test the Rules

A good builder tries to break their own work. Each of these should fail:

| Test | MySQL's answer |
| :--- | :--- |
| Enrol Aisha in CS-101 again | `ERROR 1062: Duplicate entry '1-1-Fall 2026' for key 'uq_student_course_sem'` |
| Give Maryam a mark of 105 | ``ERROR 4025: CONSTRAINT `enrollments.exam_marks` failed`` |
| Delete Aisha (id 1) | `ERROR 1451: Cannot delete or update a parent row ...` |

Every failure here is good news: the database refused bad or dangerous changes.

---

## ⚠️ Common Mistake

**Mistake: storing the course list inside `students`.**

```sql
-- wrong idea
courses_taken VARCHAR(200)  -- 'CS-101, CS-201, ETH-101'
```

What happens: you cannot store a mark per course, cannot join to `courses`, and finding "everyone in CS-101" needs messy text searching.

**Fix:** a junction table (`enrollments`) with one row per student-course pair, as in this project.

**Mistake: `ON DELETE CASCADE` on marks.** It looks tidy, but one careless `DELETE FROM students` would wipe that student's whole academic history. Keep `RESTRICT` and use `is_active = FALSE`.

---

## ✍️ Try It

Enrol Maryam (student 6) in *Algebra Foundations* (course 3) with 91 marks and grade `'A'`. Then re-run Reports 2, 3 and 4.

*Hint: MATH-101's average becomes 83.17; Maryam joins the honour roll and leaves the "not enrolled" list.*

---

## 📝 Recap

- A many-to-many relationship needs a junction table with two foreign keys.
- `CHECK`, `UNIQUE` (even on several columns) and foreign keys keep the data honest.
- Report cards and statistics come from joins, `GROUP BY`, `HAVING` and subqueries.
- `LEFT JOIN` and `COUNT(column)` keep empty courses or students visible.
- Official records deserve `RESTRICT` plus soft delete, not `CASCADE` (*Amānah*).

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. What is a junction table, and which one does this project use?
2. What does `UNIQUE KEY uq_student_course_sem (student_id, course_id, semester)` prevent?
3. Why are `students` and `courses` created before `enrollments`?

<details>
<summary>Show answer</summary>

1. A table that links two other tables in a many-to-many relationship. Here it is `enrollments`.
2. The same student being enrolled in the same course twice in the same semester.
3. `enrollments` has foreign keys pointing to them. Parent tables must exist first.

</details>

### 🟡 Level 2: Apply
Write a query that shows each student's total **credit hours** (from `courses.credit_hours`), most first.

<details>
<summary>Show answer</summary>

```sql
SELECT s.full_name, SUM(c.credit_hours) AS credits
FROM students s
JOIN enrollments e ON e.student_id = s.id
JOIN courses c     ON c.id = e.course_id
GROUP BY s.id, s.full_name
ORDER BY credits DESC, s.full_name;
```

| full_name | credits |
| :--- | ---: |
| Aisha Siddiq | 9 |
| Bilal Mansoor | 6 |
| Fatima Zahra | 6 |
| Hamza Tariq | 3 |
| Zayd Ali | 3 |

</details>

### 🔴 Level 3: Challenge
Extend the project with attendance.

1. Create an `attendance` table: `id`, `student_id` (FK), `course_id` (FK), `class_date`, `present` (`BOOLEAN`), with one row per student, course and date at most.
2. Insert three sample rows.
3. Write a query showing each student's number of days present.

<details>
<summary>Show one possible answer</summary>

```sql
CREATE TABLE attendance (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id  INT NOT NULL,
    class_date DATE NOT NULL,
    present    BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT fk_att_student FOREIGN KEY (student_id) REFERENCES students(id),
    CONSTRAINT fk_att_course  FOREIGN KEY (course_id)  REFERENCES courses(id),
    UNIQUE KEY uq_att (student_id, course_id, class_date)
);

INSERT INTO attendance (student_id, course_id, class_date, present) VALUES
  (1, 1, '2026-09-01', TRUE),
  (1, 1, '2026-09-02', TRUE),
  (2, 1, '2026-09-01', FALSE);

SELECT s.full_name, SUM(a.present) AS days_present
FROM students s
JOIN attendance a ON a.student_id = s.id
GROUP BY s.id, s.full_name;
```

| full_name | days_present |
| :--- | ---: |
| Aisha Siddiq | 2 |
| Bilal Mansoor | 0 |

`SUM(present)` works because `TRUE` is stored as 1 and `FALSE` as 0.

</details>
