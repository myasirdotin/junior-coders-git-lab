# Chapter 16: Table Relationships & Foreign Keys

> **Key Idea**: Instead of repeating the same facts in one huge table, we split data into smaller tables and link them. A foreign key is a column that points to a row in another table, and MySQL checks that the row really exists.

---

## 🌟 Real-Life Story

On a library slip, the librarian does not write out Zayd's full name, class, teacher and city every time he borrows a book. She writes his **student number** and the **book number**. Anyone can look those numbers up in the student register and the book catalogue. But imagine a slip with student number 99, when no student 99 exists. That slip points nowhere. A foreign key is the rule that stops such slips from ever being written.

## 🎯 What You Will Learn

- Spot the problems caused by repeating data in one table.
- Explain parent tables, child tables and foreign keys.
- Add foreign keys to `school_db` with `FOREIGN KEY ... REFERENCES`.
- Read the errors MySQL gives when a link would break.
- Choose an `ON DELETE` action: `RESTRICT`, `CASCADE` or `SET NULL`.

---

## 🔁 The Problem with Repeating Data

Suppose we stored the class details inside every student row:

```
students (bad design)
┌────────┬────────────────┬───────────┐
│ name   │ class_name     │ teacher   │
├────────┼────────────────┼───────────┤
│ Zayd   │ Grade 8 Eagles │ Mr. Imran │
│ Fatima │ Grade 8 Eagles │ Mr. Imran │
│ Hamza  │ Grade 8 Eagles │ Mr. Imran │
└────────┴────────────────┴───────────┘
```

Three problems appear:

1. **Waste**: "Grade 8 Eagles, Mr. Imran" is typed again for every student.
2. **Update problem**: if a new teacher takes over, we must change many rows. Miss one, and the data disagrees with itself.
3. **Delete problem**: if the last Grade 8 student leaves and we delete their row, we lose the fact that the class exists at all.

---

## 🧩 The Fix: Split and Link

<div align="center" style="margin: 2rem 0;">
  <img src="../assets/diagrams/mysql/primary-foreign-key-rel.svg" alt="Primary Key to Foreign Key Relational Mapping" style="max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
</div>

`school_db` already does this. Class details live **once** in `classes`. Each student stores only the class's `id` in `class_id`.

```
classes (parent)
┌────┬─────────────────┬───────────┐
│ id │ name            │ teacher   │
├────┼─────────────────┼───────────┤
│ 2  │ Grade 8 Eagles  │ Mr. Imran │
└────┴─────────────────┴───────────┘
  ▲
  │ class_id = 2
  │
students (child)
┌────┬────────┬──────────┐
│ id │ name   │ class_id │
├────┼────────┼──────────┤
│ 1  │ Zayd   │ 2        │
│ 4  │ Fatima │ 2        │
│ 7  │ Hamza  │ 2        │
└────┴────────┴──────────┘
```

Key words:

- **Parent table**: the table being pointed **to** (`classes`).
- **Child table**: the table that does the pointing (`students`).
- **Foreign key**: the child's pointing column (`students.class_id`). It holds a primary key value from the parent.

Splitting data like this, so each fact is stored once, is called **normalization**.

`school_db` has three links:

| Child column | Points to |
| :--- | :--- |
| `students.class_id` | `classes.id` |
| `loans.student_id` | `students.id` |
| `loans.book_id` | `books.id` |

The `loans` table is a child of **two** parents. Each row links one student to one book.

---

## 🔒 Declaring Foreign Keys

So far, `class_id` is just a number. MySQL does not know it is a link, so it would accept `class_id = 50`. Let us make the links official.

### On tables that already exist: `ALTER TABLE`

As in Chapter 8, `ALTER TABLE` changes the plan of a table that already exists. Here it adds the foreign keys:

```sql
ALTER TABLE students
  ADD CONSTRAINT fk_students_class
  FOREIGN KEY (class_id) REFERENCES classes(id);

ALTER TABLE loans
  ADD CONSTRAINT fk_loans_student
    FOREIGN KEY (student_id) REFERENCES students(id),
  ADD CONSTRAINT fk_loans_book
    FOREIGN KEY (book_id) REFERENCES books(id);
```

Read it as: *"`class_id` must match an `id` in `classes`."* The name after `CONSTRAINT` (like `fk_students_class`) is your label for the rule. It appears in error messages.

### In a new table: inside `CREATE TABLE`

```sql
CREATE TABLE loans (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    book_id    INT,
    loan_date  DATE,
    returned   VARCHAR(3),
    CONSTRAINT fk_loans_student
      FOREIGN KEY (student_id) REFERENCES students(id),
    CONSTRAINT fk_loans_book
      FOREIGN KEY (book_id) REFERENCES books(id)
);
```

Create the **parent tables first**. If `books` does not exist yet, MySQL refuses:

```
ERROR 1005 (HY000): Can't create table ... (errno: 150
"Foreign key constraint is incorrectly formed")
```

---

## 🚫 Watching the Rules Work

### A loan for a student who does not exist

```sql
INSERT INTO loans (student_id, book_id, loan_date, returned)
VALUES (99, 1, '2026-10-13', 'No');
```

```
ERROR 1452 (23000): Cannot add or update a child row: a foreign key
constraint fails (`school_db`.`loans`, CONSTRAINT `fk_loans_student`
FOREIGN KEY (`student_id`) REFERENCES `students` (`id`))
```

There is no student 99, so the slip is refused.

### Deleting a parent that still has children

```sql
DELETE FROM students WHERE id = 1;
```

```
ERROR 1451 (23000): Cannot delete or update a parent row: a foreign
key constraint fails (`school_db`.`loans`, CONSTRAINT `fk_loans_student` ...)
```

Zayd still has loans. Deleting him would leave loans pointing nowhere.

But `DELETE FROM students WHERE id = 7;` **works**, because Hamza has no loans. Nothing would be left pointing at him.

> 🧪 **Sandbox note:** SQLite only checks foreign keys after `PRAGMA foreign_keys = ON;`, and the sandbox's tables have no foreign keys declared. So these errors only appear in MySQL.

---

## ⚙️ What Happens on Delete? `ON DELETE`

You can choose what MySQL does when a parent row is deleted:

| Action | What happens to the children |
| :--- | :--- |
| `RESTRICT` / `NO ACTION` | **Default.** The delete is refused (error 1451). |
| `CASCADE` | The children are deleted too. |
| `SET NULL` | The children stay, but their link becomes `NULL`. |

Example: if a class is closed, keep the students but clear their class:

```sql
CONSTRAINT fk_students_class
  FOREIGN KEY (class_id) REFERENCES classes(id)
  ON DELETE SET NULL
```

After deleting class 1 (Grade 7 Falcons), Maryam and Aisha remain:

| id | name | class_id |
| ---: | :--- | ---: |
| 2 | Maryam | NULL |
| 6 | Aisha | NULL |

Choose carefully. `CASCADE` on `loans.student_id` would silently erase a student's whole borrowing history. For school records, the safe default `RESTRICT` (plus soft delete from Chapter 14) is usually the right choice.

There is also `ON UPDATE CASCADE`: if a parent's id changes, the children's links change with it.

---

## ⚠️ Common Mistake

**Mistake: making the child table first.**

```sql
CREATE TABLE loans (... FOREIGN KEY (book_id) REFERENCES books(id));
-- books does not exist yet
```

What happens: `ERROR 1005 ... errno: 150 "Foreign key constraint is incorrectly formed"`.

**Fix:** create `classes`, `students` and `books` first, then `loans`. When removing tables, go the other way: drop `loans` before `books`. (Dropping `books` while `loans` points to it gives `ERROR 1451`.)

---

## ✍️ Try It

In phpMyAdmin, on your own `school_db`:

1. Run the two `ALTER TABLE` statements above.
2. Try to add a loan for book 50. Read the error.
3. Try to delete student 7 (Hamza). Why does it work? Then add him back with `INSERT`.

*Hint: look for "child row" vs "parent row" in the error text.*

---

## 📝 Recap

- Repeating data causes waste and update and delete problems.
- Split data into tables and link them with ids (normalization).
- A **foreign key** in a child table must match a primary key in the parent.
- MySQL refuses links to missing rows (error 1452) and deletes that would orphan children (error 1451).
- `ON DELETE` can be `RESTRICT` (default), `CASCADE` or `SET NULL`.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. What is a foreign key?
2. Which must be created first: the parent or the child table?
3. Name one benefit of splitting data into linked tables.

<details>
<summary>Show answer</summary>

1. A column in a child table that holds a primary key value from a parent table, and must match a real row there.
2. The parent table.
3. Any one: each fact is stored once; updates happen in one place; deleting one row does not lose unrelated facts.

</details>

### 🟡 Level 2: Apply
A `book_reviews` table records short reviews students write for the library. It has `id`, `book_id`, `student_id`, `review` (up to 300 characters) and `written_on`. Write its `CREATE TABLE` with **both** foreign keys.

<details>
<summary>Show answer</summary>

```sql
CREATE TABLE book_reviews (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    book_id    INT NOT NULL,
    student_id INT NOT NULL,
    review     VARCHAR(300) NOT NULL,
    written_on DATE,
    CONSTRAINT fk_reviews_book
      FOREIGN KEY (book_id) REFERENCES books(id),
    CONSTRAINT fk_reviews_student
      FOREIGN KEY (student_id) REFERENCES students(id)
);
```

</details>

### 🔴 Level 3: Challenge
With the foreign keys from this chapter in place (default `RESTRICT`):

1. Predict what happens with `DELETE FROM classes WHERE id = 3;` and explain why.
2. The school really is closing Grade 9 Hawks. Describe two different safe ways to handle it.
3. Which `ON DELETE` action would be dangerous on `loans.student_id`, and why?

<details>
<summary>Show one possible answer</summary>

1. It fails with `ERROR 1451 ... Cannot delete or update a parent row`. Bilal, Tariq and Khadija still have `class_id = 3`.
2. Either move the students first (`UPDATE students SET class_id = 2 WHERE class_id = 3;`) and then delete the class; or define the key with `ON DELETE SET NULL` so the students stay with no class. A soft delete on `classes` (an `is_closed` flag) is a third option.
3. `CASCADE`. Deleting a student would silently delete all their loans, wiping the library's true history (*Amānah*).

</details>
