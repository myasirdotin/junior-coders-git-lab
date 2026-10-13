# Chapter 12: The UPDATE Statement — Modifying Records

> **Key Idea**: `UPDATE` changes values in rows that already exist. Always add a `WHERE` clause. Without it, MySQL changes **every** row in the table.

---

## 🌟 Real-Life Story

Hamza's family moves from Peshawar to Islamabad. The school secretary opens the register, finds Hamza's line, rubs out "Peshawar" and writes "Islamabad". She does not touch anyone else's line. And before rubbing anything out, she checks twice that it really is Hamza's line. That careful edit is exactly what `UPDATE ... WHERE` does.

## 🎯 What You Will Learn

- Write an `UPDATE ... SET ... WHERE` statement.
- Change one column or several columns at once.
- Update a value based on its old value (for example `pages + 16`).
- Read MySQL's "Rows matched / Changed" message.
- Use the "SELECT first, then UPDATE" safety habit.

---

## ✏️ The Shape of `UPDATE`

```sql
UPDATE table_name
SET column1 = new_value1, column2 = new_value2
WHERE condition;
```

- `UPDATE` names the table.
- `SET` says which columns get which new values.
- `WHERE` says **which rows** to change. It works exactly like the `WHERE` you learned in Chapter 10.

---

## 🎯 Changing One Row

### Step 1: look before you change

```sql
SELECT id, name, city FROM students WHERE id = 7;
```

| id | name | city |
| ---: | :--- | :--- |
| 7 | Hamza | Peshawar |

One row, and it is the right student.

### Step 2: update with the same `WHERE`

```sql
UPDATE students
SET city = 'Islamabad'
WHERE id = 7;
```

```
Query OK, 1 row affected
Rows matched: 1  Changed: 1  Warnings: 0
```

- **Rows matched**: how many rows passed the `WHERE` test.
- **Changed**: how many actually got a different value.

### Step 3: check the result

```sql
SELECT id, name, city FROM students WHERE id = 7;
```

| id | name | city |
| ---: | :--- | :--- |
| 7 | Hamza | Islamabad |

If you run the same `UPDATE` again, MySQL says `Rows matched: 1  Changed: 0`. The row matched, but it already held `'Islamabad'`, so nothing changed.

> 💡 Why `WHERE id = 7` and not `WHERE name = 'Hamza'`? The id is unique. A second Hamza might join the school next year.

---

## 📚 More Real Updates

### A book comes back to the shelf

```sql
UPDATE books SET available = 'Yes' WHERE id = 3;
```

| id | title | available |
| ---: | :--- | :--- |
| 3 | Ethical Technology | Yes |

### Marking a loan as returned

Khadija (student 8) returns *Digital Stewardship* (book 6). Two tests pick out the exact loan:

```sql
UPDATE loans
SET returned = 'Yes'
WHERE student_id = 8 AND book_id = 6;
```

```sql
SELECT * FROM loans WHERE student_id = 8;
```

| id | student_id | book_id | loan_date | returned |
| ---: | ---: | ---: | :--- | :--- |
| 9 | 8 | 5 | 2026-09-15 | Yes |
| 10 | 8 | 6 | 2026-10-01 | Yes |

### Several rows at once

At the start of a new year, every Grade 9 student moves up to Grade 10:

```sql
UPDATE students SET grade = 10 WHERE grade = 9;
```

```
Query OK, 3 rows affected
Rows matched: 3  Changed: 3  Warnings: 0
```

Bilal, Tariq and Khadija are now in Grade 10. Here the `WHERE` matches three rows on purpose.

### Several columns at once

Separate each `column = value` pair with a comma:

```sql
UPDATE books
SET category = 'Computer Science', pages = 330
WHERE id = 2;
```

---

## ➕ Updating From the Old Value

The new value can use the old one. A new edition of *Arabic Calligraphy Basics* has 16 extra practice pages:

```sql
UPDATE books SET pages = pages + 16 WHERE id = 8;
```

| title | pages |
| :--- | ---: |
| Arabic Calligraphy Basics | 136 |

MySQL reads the old value (120), adds 16, and stores 136. You do not need to know the old value yourself.

> ⚠️ Rules from Chapter 7 still apply. A `gpa + 0.1` for Bilal gives 4.05. `DECIMAL(3,2)` allows up to 9.99, so MySQL accepts it, even though a GPA should stop at 4. A `CHECK (gpa <= 4)` constraint would have caught this.

---

## 🚨 The Golden Rule: Never Forget `WHERE`

```sql
UPDATE students SET city = 'Quetta';
```

```
Query OK, 8 rows affected
Rows matched: 8  Changed: 8  Warnings: 0
```

| name | city |
| :--- | :--- |
| Zayd | Quetta |
| Maryam | Quetta |
| Bilal | Quetta |
| Fatima | Quetta |
| Tariq | Quetta |
| Aisha | Quetta |
| Hamza | Quetta |
| Khadija | Quetta |

Every student now "lives" in Quetta. MySQL did not ask "are you sure?" There is no undo button. The only way back is a backup, or a transaction (Chapter 14).

**The safety habit:**

1. Write the `SELECT` with your `WHERE` first.
2. Check the rows it shows.
3. Change `SELECT ... FROM` into `UPDATE ... SET`, keeping the **same** `WHERE`.

> 🧪 **Sandbox note:** If you try this in the SQL Sandbox, press **Reset** to bring the original data back. A real MySQL server has no Reset button.

---

## ⚠️ Common Mistake

**Mistake: using `AND` instead of a comma in `SET`.**

```sql
UPDATE books SET category = 'Web' AND pages = 300 WHERE id = 4;
```

What happens: MySQL reads `'Web' AND pages = 300` as one true/false test. On a relaxed XAMPP it stores the answer, `0`, in `category` (with 2 warnings), and the pages do not change at all:

| id | title | category | pages |
| ---: | :--- | :--- | ---: |
| 4 | HTML & CSS Architecture | 0 | 288 |

In strict mode you get `ERROR 1292: Truncated incorrect DOUBLE value: 'Web'` instead.

**Fixed version:**

```sql
UPDATE books SET category = 'Web', pages = 300 WHERE id = 4;
```

---

## ✍️ Try It

In the [SQL Sandbox](../studios/sql-sandbox/), Zayd (student 1) returns *Algorithm Design* (book 2).

1. `SELECT` the loan first.
2. Update its `returned` column to `'Yes'`.
3. `SELECT` again to check. Then press **Reset**.

*Hint: the loan has `student_id = 1 AND book_id = 2`.*

---

## 📝 Recap

- `UPDATE table SET column = value WHERE condition;` changes existing rows.
- Use a unique column, like `id`, in `WHERE` to change exactly one row.
- Separate several changes with commas in `SET`.
- A new value can use the old one: `pages = pages + 16`.
- Without `WHERE`, every row changes. Always `SELECT` first with the same `WHERE`.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which keyword lists the columns and their new values?
2. What happens with `UPDATE books SET available = 'No';`?
3. How do you add 1 to a column called `visits`?

<details>
<summary>Show answer</summary>

1. `SET`
2. There is no `WHERE`, so **every** book is marked `'No'`.
3. `SET visits = visits + 1` (with a `WHERE` for the right row).

</details>

### 🟡 Level 2: Apply
1. Change Aisha's (id 6) city to Karachi.
2. Mark every book in the *Ethics* category as available.
3. Hafsa (donation id 4) gave 500 rupees more. Increase her `amount` by 500.

<details>
<summary>Show answer</summary>

```sql
UPDATE students SET city = 'Karachi' WHERE id = 6;

UPDATE books SET available = 'Yes' WHERE category = 'Ethics';

UPDATE donations SET amount = amount + 500 WHERE id = 4;
```

The second one reports `Rows matched: 2  Changed: 1`. Both Ethics books matched, but *Digital Stewardship* was already `'Yes'`. Hafsa's amount becomes 3500.

</details>

### 🔴 Level 3: Challenge
The librarian moves every *Data* book into the *Computer Science* category and marks them available.

1. Write the `SELECT` you would run first.
2. Write the `UPDATE`.
3. Predict the "Rows matched / Changed" line.
4. Explain why the `SELECT` step is part of treating data as an *Amānah*.

<details>
<summary>Show one possible answer</summary>

```sql
SELECT id, title, category, available FROM books WHERE category = 'Data';
```

| id | title | category | available |
| ---: | :--- | :--- | :--- |
| 5 | Python Data Science | Data | No |

```sql
UPDATE books
SET category = 'Computer Science', available = 'Yes'
WHERE category = 'Data';
```

`Rows matched: 1  Changed: 1  Warnings: 0`

4. The records belong to the whole school. Checking first proves you will change only the rows you mean to. A careless update could wreck everyone's data.

</details>
