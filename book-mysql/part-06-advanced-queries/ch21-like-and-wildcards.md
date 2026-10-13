# Chapter 21: Pattern Matching — LIKE & Wildcards

> **Key Idea**: `LIKE` searches for text that fits a pattern. In a pattern, `%` stands for "any number of characters (even none)" and `_` stands for "exactly one character".

---

## 🌟 Real-Life Story

A Grade 7 student comes to the library desk. "I want that book about data… I think *data* was somewhere in the title." The librarian does not need the exact title. She runs her finger down the catalogue looking for any title that has "data" anywhere in it. `LIKE` lets the database do that same kind of "I only remember part of it" search.

## 🎯 What You Will Learn

- Explain why `=` is not enough for searching.
- Use `%` to match "starts with", "ends with" and "contains".
- Use `_` to match an exact number of characters.
- Know when `LIKE` is case-insensitive.
- Search for a real `%` or `_` with `ESCAPE`.

---

## 🔎 Why `=` Is Not Enough

`=` needs a perfect match:

```sql
SELECT name FROM students WHERE name = 'Zay';
```

```
Empty set
```

No student is called exactly "Zay". A search box on a website must also find "Zayd" when someone types only part of the name. That is the job of `LIKE`.

---

## 🃏 Wildcard 1: `%` (Any Number of Characters)

A **wildcard** is a symbol that stands in for other characters, like a joker in a word puzzle.

### Starts with

```sql
SELECT name FROM students WHERE name LIKE 'Z%';
```

| name |
| :--- |
| Zayd |

`'Z%'` means "Z, then anything (or nothing)".

### Ends with

```sql
SELECT title FROM books WHERE title LIKE '%Design';
```

| title |
| :--- |
| Algorithm Design |

```sql
SELECT name, city FROM students WHERE city LIKE '%abad';
```

| name | city |
| :--- | :--- |
| Fatima | Islamabad |
| Khadija | Islamabad |

### Contains

```sql
SELECT title FROM books WHERE title LIKE '%data%';
```

| title |
| :--- |
| Python Data Science |

`%` on **both** sides means "data can be anywhere". It also found "Data" with a capital D (see the case section below).

| Pattern | Meaning | Example match |
| :--- | :--- | :--- |
| `'A%'` | starts with A | Algorithm Design |
| `'%a'` | ends with a | Sara, Hafsa, Layla |
| `'%net%'` | contains "net" | Introduction to Networks |

---

## 🃏 Wildcard 2: `_` (Exactly One Character)

Each `_` matches exactly **one** character, no more and no less.

Names whose **second** letter is "a":

```sql
SELECT name FROM students WHERE name LIKE '_a%';
```

| name |
| :--- |
| Zayd |
| Maryam |
| Fatima |
| Tariq |
| Hamza |

Names with exactly **five** letters (five underscores):

```sql
SELECT name FROM students WHERE name LIKE '_____';
```

| name |
| :--- |
| Bilal |
| Tariq |
| Aisha |
| Hamza |

`_` is handy for codes with a fixed shape, for example `'CS-___'` matches `CS-101` but not `CS-1001`.

---

## ➖ `NOT LIKE`

`NOT LIKE` keeps rows that do **not** fit the pattern. Titles without the letter "e":

```sql
SELECT title FROM books WHERE title NOT LIKE '%e%';
```

| title |
| :--- |
| Arabic Calligraphy Basics |

`LIKE` also works with `AND`, `OR`, `ORDER BY` and `GROUP BY`, just like `=`.

---

## 🔠 Upper and Lower Case

With the usual MySQL settings, `LIKE` **ignores case**. The collation's `_ci` ending (Chapter 4) means *case-insensitive*:

```sql
SELECT name FROM students WHERE name LIKE 'aisha';
```

| name |
| :--- |
| Aisha |

For a case-sensitive search, add `BINARY`, which compares the exact bytes:

```sql
SELECT name FROM students WHERE BINARY name LIKE 'aisha';
```

```
Empty set
```

> 🧪 **Sandbox note:** SQLite's `LIKE` also ignores case for English letters (A–Z), so these examples behave the same. SQLite has no `BINARY` keyword; it uses `GLOB` for case-sensitive patterns instead.

---

## 🛡️ Searching for a Real `%` or `_`

Suppose the library adds a science booklet, *Save 20% Water at Home*, and also *Room 205 Lab Notes*. We want titles containing "20%":

```sql
SELECT title FROM books WHERE title LIKE '%20%';
```

| title |
| :--- |
| Save 20% Water at Home |
| Room 205 Lab Notes |

Room 205 matched too! The `%` after 20 was read as a wildcard. To mean a **real** percent sign, **escape** it. "Escape" means "treat the next character as plain text". Choose an escape character with `ESCAPE`:

```sql
SELECT title FROM books WHERE title LIKE '%20!%%' ESCAPE '!';
```

| title |
| :--- |
| Save 20% Water at Home |

Read `'%20!%%'` as: anything, then `20`, then a real `%` (because of the `!`), then anything.

MySQL also accepts a backslash without the `ESCAPE` part: `LIKE '%20\%%'`. The `ESCAPE` form works in SQLite too, so it is the safer habit.

---

## ⚠️ Common Mistake

**Mistake 1: using `=` with wildcards.**

```sql
SELECT title FROM books WHERE title = '%Design';
```

```
Empty set
```

With `=`, the `%` is just a percent sign. No title literally starts with "%". **Fix:** `WHERE title LIKE '%Design'`.

**Mistake 2: forgetting the `%`.**

```sql
SELECT title FROM books WHERE title LIKE 'Data';
```

This returns nothing: without wildcards, `LIKE` acts like `=`. **Fix:** `LIKE '%Data%'`.

> 💡 **Speed note:** `LIKE 'Clean%'` can use an index (a sorted lookup list, like a book's index) because the start is known. `LIKE '%Clean%'` must check every row, which is slower on very big tables. For our small tables you will not notice.

---

## ✍️ Try It

In the [SQL Sandbox](../studios/sql-sandbox/), find every donor whose name **ends with "a"** and show how much they gave, largest first.

*Hint: `LIKE '%a'` with `ORDER BY amount DESC`. You should see Sara, Hafsa and Layla.*

---

## 📝 Recap

- `LIKE` matches text against a pattern; `=` needs an exact match.
- `%` = any number of characters (even zero); `_` = exactly one character.
- `'x%'` starts with, `'%x'` ends with, `'%x%'` contains.
- With the usual `_ci` collation, `LIKE` ignores case; `BINARY` makes it exact.
- Use `ESCAPE` to search for a real `%` or `_`.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. What does `%` match?
2. What does `_` match?
3. Which operator do you use with wildcards instead of `=`?

<details>
<summary>Show answer</summary>

1. Any number of characters, including none.
2. Exactly one character.
3. `LIKE` (or `NOT LIKE`).

</details>

### 🟡 Level 2: Apply
1. Find books whose title starts with "Introduction".
2. Find students whose name contains the letters "ar".
3. Find donations whose cause has exactly 5 characters.

<details>
<summary>Show answer</summary>

```sql
SELECT title FROM books WHERE title LIKE 'Introduction%';
-- Introduction to Networks

SELECT name FROM students WHERE name LIKE '%ar%';
-- Maryam, Tariq

SELECT donor, cause FROM donations WHERE cause LIKE '_____';
-- Ahmad, Hafsa, Omar (cause: Books)
```

</details>

### 🔴 Level 3: Challenge
The library website gets a search box. A visitor types `tech`.

1. Write the query that finds every book whose title **or** category contains the search word.
2. Extend it: count how many matching books there are in each category.
3. Explain why the website must not paste the visitor's text straight into the SQL (think *Amānah*).

<details>
<summary>Show one possible answer</summary>

```sql
SELECT title, category FROM books
WHERE title LIKE '%tech%' OR category LIKE '%tech%';
```

| title | category |
| :--- | :--- |
| Ethical Technology | Ethics |

You might guess *HTML & CSS Architecture* would match too. It does not: "Archi**tec**ture" has "tec" but no "tech". Run your query to test guesses like this.

```sql
SELECT category, COUNT(*) AS books
FROM books
WHERE title LIKE '%tech%' OR category LIKE '%tech%'
GROUP BY category;
```

| category | books |
| :--- | ---: |
| Ethics | 1 |

3. A visitor could type SQL code instead of a word and change or steal data (this attack is called *SQL injection*). Websites must pass the search word as a separate value, using **prepared statements** in PHP. Protecting the school's data is an *Amānah*.

</details>
