# Chapter 15: Table Relationships & Foreign Keys

> **Key Idea**: Real-world data is relational. Instead of repeating information inside one giant messy table, we split data into specialized tables and connect them using Foreign Keys.

---

## 1. The Redundancy Problem

Imagine keeping all student enrollments and course details in a single table:

```
❌ Bad Denormalized Table:
┌────┬──────────────┬──────────────────┬─────────────────┬───────────────────────┐
│ id │ student_name │ course_name      │ teacher_name    │ teacher_room          │
├────┼──────────────┼──────────────────┼─────────────────┼───────────────────────┤
│ 1  │ Aisha        │ Web Engineering  │ Sir Yasir       │ Lab 3, Block B        │
│ 2  │ Bilal        │ Web Engineering  │ Sir Yasir       │ Lab 3, Block B        │
│ 3  │ Fatima       │ Web Engineering  │ Sir Yasir       │ Lab 3, Block B        │
└────┴──────────────┴──────────────────┴─────────────────┴───────────────────────┘
```

Look at the flaws with this design:
1. **Wasteful Repetition**: If 100 students take Web Engineering, `"Sir Yasir"` and `"Lab 3, Block B"` are repeated 100 times!
2. **Update Anomaly**: If Sir Yasir moves to Lab 5, we have to update 100 rows. If we miss one row, data becomes contradictory.
3. **Deletion Anomaly**: If the last student leaves the course and we delete their row, we accidentally destroy the knowledge that the course even exists!

---

## 2. The Solution: Normalization & Foreign Keys

<div align="center" style="margin: 2rem 0;">
  <img src="../assets/diagrams/mysql/primary-foreign-key-rel.svg" alt="Primary Key to Foreign Key Relational Mapping" style="max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
</div>

We split the entities into two logical tables:
1. `courses` (Parent Table): Contains each unique course once.
2. `students` (Child Table): Contains student details and stores the `course_id` (Foreign Key).


```
Parent Table: courses (Primary Key = id)
┌────┬──────────────────┬─────────────┬─────────────────┐
│ id │ course_name      │ teacher     │ room            │
├────┼──────────────────┼─────────────┼─────────────────┤
│ 10 │ Web Engineering  │ Sir Yasir   │ Lab 3, Block B  │
│ 20 │ Database Design  │ Dr. Amina   │ Room 102        │
└────┴──────────────────┴─────────────┴─────────────────┘
         ▲
         │ Linked by Foreign Key (course_id)
         │
Child Table: students (Foreign Key = course_id)
┌────┬──────────────┬───────────┐
│ id │ full_name    │ course_id │
├────┼──────────────┼───────────┤
│ 1  │ Aisha        │ 10        │
│ 2  │ Bilal        │ 10        │
│ 3  │ Fatima       │ 20        │
└────┴──────────────┴───────────┘
```

---

## 3. Defining a Foreign Key in MySQL

To establish this relationship in SQL:

```sql
-- Step 1: Create the parent table first
CREATE TABLE courses (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    course_name  VARCHAR(100) NOT NULL,
    teacher      VARCHAR(100) NOT NULL,
    room         VARCHAR(50) NOT NULL
);

-- Step 2: Create the child table referencing the parent
CREATE TABLE students (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    full_name  VARCHAR(100) NOT NULL,
    email      VARCHAR(150) NOT NULL UNIQUE,
    course_id  INT,
    
    -- Establish the relational foreign key constraint:
    CONSTRAINT fk_student_course 
      FOREIGN KEY (course_id) 
      REFERENCES courses(id)
      ON UPDATE CASCADE
      ON DELETE SET NULL
);
```

---

## 4. Referential Integrity Actions (`ON DELETE` / `ON UPDATE`)

What should happen to the child rows if a course in the parent table is deleted or changed?

| Action | Behavior |
| :--- | :--- |
| `RESTRICT` / `NO ACTION` | **Default**: Prevents deleting the parent course if any student is currently linked to it. |
| `CASCADE` | If a parent row is deleted/updated, automatically delete/update all linked child rows! |
| `SET NULL` | If the parent course is deleted, sets the student's `course_id` to `NULL`. |

---

## 5. Review & Practice

### 🟢 Level 1: Recall
1. What is a Foreign Key?
2. Which table must be created first: the parent table or the child table?
3. What is the benefit of splitting data into multiple related tables instead of one large table?

### 🟡 Level 2: Schema Relationship
Design the tables for a library:
1. `books` table with `id`, `title`, `author`.
2. `book_loans` table with `id`, `book_id`, `borrower_name`, `borrow_date`.
Write the SQL to declare `book_id` in `book_loans` as a Foreign Key pointing to `books(id)`.

### 🔴 Level 3: Integrity Evaluation
If `ON DELETE RESTRICT` is enabled, what error does MySQL produce if an administrator tries to run `DELETE FROM courses WHERE id = 10;` while Aisha and Bilal are still enrolled in course 10?
