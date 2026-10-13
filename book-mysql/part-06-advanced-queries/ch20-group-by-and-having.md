# Chapter 20: GROUP BY & HAVING Clauses

> **Key Idea**: `GROUP BY` sorts rows into groups that share a value, then runs an aggregate (like `COUNT` or `SUM`) once for each group. `HAVING` filters those groups. `WHERE` filters single rows before the grouping.

---

## 🌟 Real-Life Story

After charity week, the club pours all the donation slips onto a table. Then they make three piles: one for *Books*, one for *Clean Water*, one for *Food Pantry*. They count and add up each pile separately. Finally, they decide to announce only the causes that raised more than 6,000 rupees. Making piles is `GROUP BY`. Adding up each pile is the aggregate. Choosing which piles to announce is `HAVING`.

## 🎯 What You Will Learn

- Group rows with `GROUP BY` and summarise each group.
- Group by more than one column.
- Filter groups with `HAVING`.
- Explain the difference between `WHERE` and `HAVING`.
- Put the parts of a query in the right order, and know the order MySQL runs them.

---

## 🧺 The Grouping Idea

<div align="center" style="margin: 2rem 0;">
  <img src="../assets/diagrams/mysql/group-by-aggregation.svg" alt="How GROUP BY & Aggregations Work" style="max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
</div>

In Chapter 19, `COUNT(*)` told us there are 8 students in total. But how many are in **each grade**?

```sql
SELECT grade, COUNT(*) AS students
FROM students
GROUP BY grade
ORDER BY grade;
```

| grade | students |
| ---: | ---: |
| 7 | 2 |
| 8 | 3 |
| 9 | 3 |

What MySQL does:

```
all 8 students
   │ GROUP BY grade
   ├─ grade 7: Maryam, Aisha    → 2
   ├─ grade 8: Zayd, Fatima,
   │           Hamza            → 3
   └─ grade 9: Bilal, Tariq,
               Khadija          → 3
```

One result row per group. The aggregate runs inside each group.

---

## 📊 Grouping in Practice

### Donations by cause

```sql
SELECT cause,
       COUNT(*)    AS gifts,
       SUM(amount) AS total,
       MAX(amount) AS largest
FROM donations
GROUP BY cause
ORDER BY total DESC;
```

| cause | gifts | total | largest |
| :--- | ---: | ---: | ---: |
| Clean Water | 3 | 15000 | 8000 |
| Food Pantry | 2 | 7000 | 4500 |
| Books | 3 | 5500 | 3000 |

You can sort by an alias such as `total`.

### Students by city

```sql
SELECT city, COUNT(*) AS students, ROUND(AVG(gpa), 2) AS avg_gpa
FROM students
GROUP BY city
ORDER BY students DESC, city;
```

| city | students | avg_gpa |
| :--- | ---: | ---: |
| Lahore | 3 | 3.75 |
| Islamabad | 2 | 3.78 |
| Karachi | 2 | 3.68 |
| Peshawar | 1 | 3.20 |

> 🧪 **Sandbox note:** SQLite stores GPA as an approximate number, so it shows Karachi as `3.67` and Peshawar as `3.2`. MySQL's exact `DECIMAL` gives `3.68` and `3.20`.

### Loans per student (with a join)

```sql
SELECT s.name, COUNT(*) AS loans
FROM loans l
JOIN students s ON l.student_id = s.id
GROUP BY s.id, s.name
ORDER BY loans DESC, s.name;
```

| name | loans |
| :--- | ---: |
| Bilal | 2 |
| Khadija | 2 |
| Zayd | 2 |
| Aisha | 1 |
| Fatima | 1 |
| Maryam | 1 |
| Tariq | 1 |

We group by `s.id` **and** `s.name`. The id keeps two students with the same name apart.

Hamza is missing, because the inner join drops him. With a `LEFT JOIN` and `COUNT(l.id)` he appears with 0. (`COUNT(l.id)` skips the `NULL`, while `COUNT(*)` would wrongly count his empty row as 1.)

```sql
SELECT s.name, COUNT(l.id) AS loans
FROM students s
LEFT JOIN loans l ON l.student_id = s.id
GROUP BY s.id, s.name
ORDER BY s.id;
```

| name | loans |
| :--- | ---: |
| Zayd | 2 |
| Maryam | 1 |
| Bilal | 2 |
| Fatima | 1 |
| Tariq | 1 |
| Aisha | 1 |
| Hamza | 0 |
| Khadija | 2 |

### Two columns

`GROUP BY grade, city` makes one group for each **pair** of values. In our small school each pair has only one student, so every count is 1. In a big school this would show, for example, how many Grade 8 students live in Lahore.

---

## 🚦 Filtering Groups with `HAVING`

Which causes raised more than 6,000 rupees?

```sql
SELECT cause, SUM(amount) AS total
FROM donations
GROUP BY cause
HAVING SUM(amount) > 6000;
```

| cause | total |
| :--- | ---: |
| Clean Water | 15000 |
| Food Pantry | 7000 |

*Books* (5500) was a group too, but it failed the `HAVING` test.

### `WHERE` and `HAVING` together

| Clause | Runs | Filters |
| :--- | :--- | :--- |
| `WHERE` | **before** grouping | single rows |
| `HAVING` | **after** grouping | whole groups |

Only gifts from 10 September onwards, grouped by cause, and only causes with at least 2 such gifts:

```sql
SELECT cause, SUM(amount) AS total
FROM donations
WHERE donated_on >= '2026-09-10'
GROUP BY cause
HAVING COUNT(*) >= 2
ORDER BY total DESC;
```

| cause | total |
| :--- | ---: |
| Clean Water | 10000 |
| Books | 4000 |

Step by step: `WHERE` removes the early gifts (Ahmad, Sara, Ibrahim). The remaining five are grouped. *Food Pantry* has only one late gift (Zainab), so `HAVING` drops it.

---

## 🧭 The Order of the Parts

You **write** the parts in this order:

```
SELECT … FROM … JOIN … WHERE …
GROUP BY … HAVING … ORDER BY … LIMIT …
```

MySQL **runs** them in a different order:

1. `FROM` and `JOIN`: find the rows.
2. `WHERE`: keep only some rows.
3. `GROUP BY`: make the groups.
4. `HAVING`: keep only some groups.
5. `SELECT`: work out the columns and aliases.
6. `ORDER BY`: sort.
7. `LIMIT`: cut to size.

This explains the rules: `WHERE` cannot use `COUNT(*)`, because the groups do not exist yet at step 2.

---

## ⚠️ Common Mistake

**Mistake 1: an aggregate in `WHERE`.**

```sql
SELECT grade, COUNT(*) FROM students
WHERE COUNT(*) > 2
GROUP BY grade;
```

```
ERROR 1111 (HY000): Invalid use of group function
```

**Fix:** move the test to `HAVING`:

```sql
SELECT grade, COUNT(*) FROM students
GROUP BY grade
HAVING COUNT(*) > 2;
```

This returns grades 8 and 9 (3 students each).

**Mistake 2: a plain column that is not grouped.**

```sql
SELECT city, name, COUNT(*) FROM students GROUP BY city;
```

| city | name | COUNT(*) |
| :--- | :--- | ---: |
| Lahore | Zayd | 3 |

A relaxed XAMPP shows *one* name per city, picked by the server. Lahore has three students, so "Zayd" is misleading. A strict server (`ONLY_FULL_GROUP_BY` mode) refuses: `ERROR 1055: 'school_db.students.name' isn't in GROUP BY`.

**Rule:** every column in `SELECT` must either be in `GROUP BY` or be inside an aggregate.

---

## ✍️ Try It

In the [SQL Sandbox](../studios/sql-sandbox/), show each book **category** with its number of titles and total pages, A to Z.

*Hint: `GROUP BY category`. You should get 6 rows; Computer Science has 2 titles and 560 pages.*

---

## 📝 Recap

- `GROUP BY column` makes one group per value and one result row per group.
- Aggregates (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) run inside each group.
- `WHERE` filters rows before grouping; `HAVING` filters groups after.
- Every selected column must be grouped or aggregated.
- Write order: `SELECT … FROM … WHERE … GROUP BY … HAVING … ORDER BY … LIMIT`.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. What does `GROUP BY` do?
2. What is the difference between `WHERE` and `HAVING`?
3. Can you write `WHERE COUNT(*) > 5`? What should you write instead?

<details>
<summary>Show answer</summary>

1. It puts rows with the same value into groups, so aggregates are worked out once per group.
2. `WHERE` filters single rows before grouping. `HAVING` filters groups after grouping.
3. No (error 1111). Use `HAVING COUNT(*) > 5` after `GROUP BY`.

</details>

### 🟡 Level 2: Apply
1. Show how many loans are returned and how many are not (`returned` = Yes / No).
2. Show each class name with the number of loans made by its students.

<details>
<summary>Show answer</summary>

```sql
SELECT returned, COUNT(*) AS loans
FROM loans
GROUP BY returned;
```

| returned | loans |
| :--- | ---: |
| No | 5 |
| Yes | 5 |

```sql
SELECT c.name AS class, COUNT(l.id) AS loans
FROM classes c
JOIN students s ON s.class_id = c.id
LEFT JOIN loans l ON l.student_id = s.id
GROUP BY c.id, c.name
ORDER BY c.id;
```

| class | loans |
| :--- | ---: |
| Grade 7 Falcons | 2 |
| Grade 8 Eagles | 3 |
| Grade 9 Hawks | 5 |

</details>

### 🔴 Level 3: Challenge
This query has an error. Explain it and fix it. Then extend it: show only cities whose students have an average GPA of **at least 3.7**, best first.

```sql
SELECT city, AVG(gpa)
FROM students
WHERE AVG(gpa) >= 3.7
GROUP BY city;
```

<details>
<summary>Show one possible answer</summary>

`AVG` cannot be used in `WHERE`, because `WHERE` runs before the groups exist (error 1111). Use `HAVING`:

```sql
SELECT city, ROUND(AVG(gpa), 2) AS avg_gpa
FROM students
GROUP BY city
HAVING AVG(gpa) >= 3.7
ORDER BY avg_gpa DESC;
```

| city | avg_gpa |
| :--- | ---: |
| Islamabad | 3.78 |
| Lahore | 3.75 |

</details>
