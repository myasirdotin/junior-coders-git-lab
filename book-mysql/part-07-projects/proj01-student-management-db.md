# Capstone Project 1: School Student & Grade Management Database

> **Project Mission**: Design, construct, and query a complete production-grade relational database for an educational academy. You will implement tables, primary and foreign key constraints, batch insertions, multi-table joins, aggregations, and report cards.

---

## 1. System Architecture & Schema Specification

Our student management database requires four interconnected tables:

```
┌──────────────────┐           ┌──────────────────┐
│     students     │           │     courses      │
├──────────────────┤           ├──────────────────┤
│ PK: id           │           │ PK: id           │
│ full_name        │           │ course_code      │
│ email (UNIQUE)   │           │ course_title     │
│ grade_level      │           │ credit_hours     │
│ enrolled_date    │           │ teacher_name     │
└────────┬─────────┘           └────────┬─────────┘
         │                              │
         └──────────────┬───────────────┘
                        ▼
         ┌──────────────────────────────┐
         │         enrollments          │
         ├──────────────────────────────┤
         │ PK: id                       │
         │ FK: student_id ──────────────┤
         │ FK: course_id  ──────────────┤
         │ semester                     │
         │ exam_marks (0 - 100)         │
         │ grade_letter (A, B, C, F)    │
         └──────────────────────────────┘
```

---

## 2. Complete Database Creation Script

Copy and execute this script inside phpMyAdmin or MySQL CLI:

```sql
-- Step 1: Create the Database
CREATE DATABASE IF NOT EXISTS school_portal_db
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

USE school_portal_db;

-- Step 2: Create Students Table
CREATE TABLE IF NOT EXISTS students (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    roll_number   VARCHAR(15) NOT NULL UNIQUE,
    full_name     VARCHAR(100) NOT NULL,
    email         VARCHAR(150) NOT NULL UNIQUE,
    grade_level   INT NOT NULL CHECK (grade_level BETWEEN 6 AND 12),
    enrolled_date DATE NOT NULL,
    is_active     BOOLEAN NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Step 3: Create Courses Table
CREATE TABLE IF NOT EXISTS courses (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    course_code   VARCHAR(15) NOT NULL UNIQUE,
    course_title  VARCHAR(100) NOT NULL,
    credit_hours  INT NOT NULL DEFAULT 3 CHECK (credit_hours BETWEEN 1 AND 5),
    teacher_name  VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

-- Step 4: Create Enrollments Table (Junction Table)
CREATE TABLE IF NOT EXISTS enrollments (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    student_id    INT NOT NULL,
    course_id     INT NOT NULL,
    semester      VARCHAR(20) NOT NULL DEFAULT 'Fall 2025',
    exam_marks    DECIMAL(5, 2) NOT NULL CHECK (exam_marks BETWEEN 0.00 AND 100.00),
    grade_letter  CHAR(2) NOT NULL,
    
    -- Integrity Constraints
    CONSTRAINT fk_enr_student 
      FOREIGN KEY (student_id) REFERENCES students(id) 
      ON UPDATE CASCADE ON DELETE CASCADE,
      
    CONSTRAINT fk_enr_course 
      FOREIGN KEY (course_id) REFERENCES courses(id) 
      ON UPDATE CASCADE ON DELETE RESTRICT,
      
    -- Ensure a student cannot be enrolled in the same course twice in one semester
    UNIQUE KEY uq_student_course_sem (student_id, course_id, semester)
) ENGINE=InnoDB;
```

---

## 3. Seed Data Insertion

Populate the database with clean seed records:

```sql
-- Insert Courses
INSERT INTO courses (course_code, course_title, credit_hours, teacher_name) VALUES
('CS-101', 'Intro to Computer Science', 3, 'Sir Yasir Rasool'),
('CS-201', 'Web & Database Engineering', 4, 'Sir Yasir Rasool'),
('MATH-101', 'Calculus & Algebra', 3, 'Dr. Amina Khan'),
('ISL-101', 'Ethics & Digital Stewardship', 2, 'Ustadh Tariq Jamil');

-- Insert Students
INSERT INTO students (roll_number, full_name, email, grade_level, enrolled_date) VALUES
('STD-001', 'Aisha Siddiq', 'aisha.s@srinagar.edu.in', 9, '2025-08-15'),
('STD-002', 'Bilal Mansoor', 'bilal.m@srinagar.edu.in', 9, '2025-08-15'),
('STD-003', 'Fatima Zahra', 'fatima.z@srinagar.edu.in', 10, '2025-08-16'),
('STD-004', 'Hamza Tariq', 'hamza.t@srinagar.edu.in', 9, '2025-08-17'),
('STD-005', 'Zayd Ali', 'zayd.a@srinagar.edu.in', 10, '2025-08-18');


-- Insert Enrollments & Marks
INSERT INTO enrollments (student_id, course_id, semester, exam_marks, grade_letter) VALUES
(1, 1, 'Fall 2025', 94.50, 'A+'),
(1, 2, 'Fall 2025', 92.00, 'A'),
(1, 4, 'Fall 2025', 98.00, 'A+'),
(2, 1, 'Fall 2025', 85.00, 'A-'),
(2, 3, 'Fall 2025', 76.50, 'B'),
(3, 2, 'Fall 2025', 88.50, 'A'),
(3, 4, 'Fall 2025', 95.00, 'A+'),
(4, 1, 'Fall 2025', 68.00, 'C+'),
(5, 3, 'Fall 2025', 82.00, 'B+');
```

---

## 4. Analytical Capstone Queries

### Query 1: Comprehensive Academic Report Card
Stitch all three tables to generate a printable report card for student `Aisha Siddiq`:

```sql
SELECT 
    s.roll_number,
    s.full_name AS student_name,
    c.course_code,
    c.course_title,
    c.teacher_name,
    e.exam_marks,
    e.grade_letter
FROM enrollments e
JOIN students s ON e.student_id = s.id
JOIN courses c ON e.course_id = c.id
WHERE s.roll_number = 'STD-001'
ORDER BY e.exam_marks DESC;
```

---

### Query 2: Course Performance & Class Statistics
Analyze the overall difficulty and student achievement across every subject:

```sql
SELECT 
    c.course_code,
    c.course_title,
    COUNT(e.student_id) AS enrolled_count,
    ROUND(AVG(e.exam_marks), 2) AS course_average,
    MIN(e.exam_marks) AS lowest_mark,
    MAX(e.exam_marks) AS top_mark
FROM courses c
LEFT JOIN enrollments e ON c.id = e.course_id
GROUP BY c.id, c.course_code, c.course_title
ORDER BY course_average DESC;
```

---

### Query 3: Identifying the Honor Roll Students
Find all students who achieved an overall average score of $85\%$ or higher:

```sql
SELECT 
    s.roll_number,
    s.full_name,
    COUNT(e.course_id) AS total_courses_taken,
    ROUND(AVG(e.exam_marks), 2) AS gpa_average
FROM students s
JOIN enrollments e ON s.id = e.student_id
GROUP BY s.id, s.roll_number, s.full_name
HAVING AVG(e.exam_marks) >= 85.00
ORDER BY gpa_average DESC;
```

---

## 5. Congratulations!

You have engineered a complete multi-table relational database system obeying strict referential integrity constraints, unique indexes, and advanced analytical queries. You are now equipped with production database design skills!
