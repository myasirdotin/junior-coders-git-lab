# Chapter 2: Tables, Rows, and Columns

> **Key Idea**: A relational database organizes data into tables. Every table represents an entity (like *students* or *books*), every column represents an attribute (like *email* or *price*), and every row represents a single real-world record.

---

## 1. The Anatomy of a Relational Table

<div align="center" style="margin: 2rem 0;">
  <img src="../assets/diagrams/mysql/table-anatomy-records.svg" alt="Table Anatomy: Fields, Records & Types" style="max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
</div>

Think of a table as a grid of structured information with strict rules for each vertical slice:


```
Table Name: students
┌────┬──────────────────┬─────────────────────────┬─────────────┬────────────┐
│ id │ full_name        │ email                   │ grade_level │ is_active  │  ◄── Column Headers (Fields)
├────┼──────────────────┼─────────────────────────┼─────────────┼────────────┤
│ 1  │ Aisha Siddiq     │ aisha@srinagar.edu.in   │ 9           │ 1 (TRUE)   │  ◄── Row 1 (Record)
│ 2  │ Bilal Mansoor    │ bilal@srinagar.edu.in   │ 9           │ 1 (TRUE)   │  ◄── Row 2 (Record)
│ 3  │ Fatima Zahra     │ fatima@srinagar.edu.in  │ 10          │ 1 (TRUE)   │  ◄── Row 3 (Record)
└────┴──────────────────┴─────────────────────────┴─────────────┴────────────┘

  ▲          ▲
  │          │
  └──────────┴── Columns define the data type and attribute name
```

### Key Vocabulary:
1. **Table (Entity)**: A two-dimensional grid of related information representing a single concept (e.g., `students`, `courses`, `donations`).
2. **Column / Field (Attribute)**: A vertical partition that stores one specific type of property (e.g., `email`, `registered_at`, `price`). Every entry in that column must obey the column's defined data type.
3. **Row / Record (Tuple)**: A horizontal entry representing a single instance of the entity (e.g., all details belonging to student *Bilal Mansoor*).
4. **Field Value (Cell)**: The atomic piece of data stored at the intersection of a specific row and column (e.g., `'Bilal Mansoor'`).

---

## 2. Real-World Schema Example: Community Bookshop

Suppose you are designing the database for an ethical community bookstore:

```sql
-- Conceptual layout of the 'books' table
┌────┬─────────────────────────────┬──────────────────┬─────────┬────────┐
│ id │ title                       │ author           │ price   │ stock  │
├────┼─────────────────────────────┼──────────────────┼─────────┼────────┤
│ 1  │ Fundamentals of Web Dev     │ Yasir Rasool     │ 1250.00 │ 35     │
│ 2  │ Principles of Ethics        │ Dr. Amina Khan   │ 850.50  │ 50     │
│ 3  │ Algorithms for Juniors      │ Tariq Jamil      │ 1400.00 │ 18     │
└────┴─────────────────────────────┴──────────────────┴─────────┴────────┘
```

Notice how clean this structure is:
- **Columns** specify *what* we know about every book (`title`, `author`, `price`, `stock`).
- **Rows** represent *each individual book* sitting on the shelf.
- If we want to add 1,000 more books, we simply add 1,000 new **rows**. We do **not** need to add new columns!

---

## 3. The Three Golden Rules of Table Design

When designing tables for any application, adhere to these three foundational rules:

### Rule 1: One Table = One Concept
Do not mix unrelated things into a single table. 
- ❌ **Poor Design**: Putting a student's home address, exam marks, and teacher's phone number into a single giant table.
- ✅ **Clean Design**: Create a `students` table, a `teachers` table, and an `exam_results` table.

### Rule 2: Atomic Values (No Multi-Value Fields)
Each cell should hold only one discrete piece of information:
- ❌ **Poor**: Column `hobbies` containing `'reading, cycling, coding'`.
- ✅ **Clean**: Store single values, or break relationships into linked rows.

### Rule 3: Every Row Must Be Uniquely Identifiable
Every row must possess a unique identifier—usually named `id`—called a **Primary Key**. This guarantees that even if two students share the exact same first and last name, the computer will never confuse them.

---

## 4. Practice Exercises

### 🟢 Level 1: Recall
1. In database terminology, what is the difference between a **column** and a **row**?
2. If an academy registers 250 new students this semester, does the `students` table gain 250 new columns or 250 new rows?
3. Why is an `id` column necessary even when people have names?

### 🟡 Level 2: Table Planning
Draft the column headers for an `inventory` table belonging to a community honey farm. What columns would you include to track product name, jar size in grams, selling price, and jars available in stock?

### 🔴 Level 3: Design Evaluation
A junior coder created a table called `library_users` with the following column:
`borrowed_books: "Quran Stories, Math Class 9, Web Design"`
Explain why this violates good database design principles and how you would improve it.
