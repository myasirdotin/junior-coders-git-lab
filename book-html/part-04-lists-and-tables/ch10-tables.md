# Chapter 10: Tables 📊

---

## 🌟 Real-Life Story

Look at your school diary or classroom wall. Every Monday through Friday, how do you know what subject you have at 9:00 AM, 11:00 AM, and 2:00 PM?

You glance at a **Timetable Grid**!
- Across the top, you have column titles: *Monday*, *Tuesday*, *Wednesday*, *Thursday*, *Friday*.
- Down the left side, you have time periods: *Period 1*, *Period 2*, *Lunch Break*, *Period 3*.
- Where a row and a column intersect, there is a small box (a **cell**) showing your subject, like *Math in Room 204*.

Whenever you have information with multiple categories—like sports scores, train schedules, comparison charts, or grade sheets—**HTML Tables** are the best way to display that data neatly!

---

## 🎯 What You Will Learn

By the end of this chapter, you will be able to:
- Understand the 4 core table tags: `<table>`, `<tr>`, `<th>`, and `<td>`.
- Build grid structures row by row.
- Distinguish between a Header Cell (`<th>`) and a Data Cell (`<td>`).
- Understand how borders and padding make tables readable.
- Build a complete, responsive Class Timetable and Exam Marks Sheet.

---

## 👁️ Visual Concept Explanation

### The 4 Pillars of an HTML Table

```text
1. <table>  <- wraps the whole grid
2. <tr>     <- table row (left to right)
3. <th>     <- header cell (bold title)
4. <td>     <- data cell (normal cell)
```

### Table Grid Architecture

```text
         col 1      col 2      col 3
       ┌──────────┬──────────┬──────────┐
 <tr>  │th Time   │th Subject│th Room   │
       ├──────────┼──────────┼──────────┤
 <tr>  │td 9:00   │td Science│td Lab 4  │
       ├──────────┼──────────┼──────────┤
 <tr>  │td 10:00  │td History│td Rm 102 │
       └──────────┴──────────┴──────────┘
```

HTML builds a table **row by row**: one `<tr>` for each line, with that line's cells inside it.

---

## 💻 Code Example: Class Timetable & Marks Sheet

Type this into your editor and save it as `timetable.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Class 7 Timetable</title>
  </head>
  <body>
    <h1>Class 7-B Weekly Timetable</h1>
    <p>Please check the schedule for room assignments and teacher names.</p>

    <!-- Table element with a basic border attribute for demonstration -->
    <table border="1">
      <!-- Row 1: Header Titles -->
      <tr>
        <th>Period</th>
        <th>Monday</th>
        <th>Wednesday</th>
        <th>Friday</th>
      </tr>

      <!-- Row 2: Period 1 Data -->
      <tr>
        <td>Period 1 (08:30 - 09:30)</td>
        <td>Mathematics</td>
        <td>Computer Science</td>
        <td>English Literature</td>
      </tr>

      <!-- Row 3: Period 2 Data -->
      <tr>
        <td>Period 2 (09:45 - 10:45)</td>
        <td>Biology Lab</td>
        <td>World History</td>
        <td>Physical Education</td>
      </tr>

      <!-- Row 4: Period 3 Data -->
      <tr>
        <td>Period 3 (11:00 - 12:00)</td>
        <td>Visual Art</td>
        <td>Robotics Lab</td>
        <td>Islamic Studies</td>
      </tr>
    </table>
  </body>
</html>
```

---

## 🔍 Code Explanation: Stepping Through the Grid

- `<table>`: Opens the table. The attribute `border="1"` tells the browser to draw simple gridlines around the cells so you can clearly see the structure. It is an old attribute that is fine for practice; in the CSS track you will draw borders with CSS instead.
- `<tr>`: Stands for **Table Row**. Every horizontal line on the screen is contained within its own `<tr>` and `</tr>`.
- `<th>`: Stands for **Table Header**. Notice that browsers automatically make the words inside `<th>` **bold and centered**!
- `<td>`: Stands for **Table Data**. This is a standard cell holding regular text, numbers, or even images.

---

## 🌍 Real-World Connection: Sports Leaderboards & Flight Trackers

Where do professional websites rely on HTML tables?
- **Sports Day results**: A school's results page (House, Gold, Silver, Bronze, Points) is a perfect HTML table.
- **Flight and train times**: An airport or railway website lists Number, Destination, Time and Gate/Platform in a table.
- **Library history**: A library account page lists each book you borrowed, with dates, in a table.

---

## 🔮 Predict the Output

Look at this table snippet:

```html
<table border="1">
  <tr>
    <th>Fruit</th>
    <th>Color</th>
  </tr>
  <tr>
    <td>Banana</td>
    <td>Yellow</td>
    <td>Sweet</td>
  </tr>
</table>
```

**Question**: The header row has 2 cells, but the second row has 3 cells! What will the table look like?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> The table will look distorted! The second row will stick out with an extra cell on the right that has no header above it. Every row in a clean table should have the same number of cells, or use <code>colspan</code> (see Practice Level 3) to bridge the gap!
</details>

---

## 🕵️ Code Detective: The Flipped Tags

A student created a table, but the rows are appearing inside each other like a scrambled mess:

```html
<!-- Broken Code -->
<table>
  <td>
    <tr>Apple</tr>
    <tr>Red</tr>
  </td>
</table>
```

- **Find the mistake**: Look at the order of `<td>` and `<tr>`!
- **Explain the mistake**: You can NEVER put a `<tr>` (row) inside a `<td>` (cell)! The row `<tr>` MUST always be the parent, and the `<td>` cell must be the child!
- **Fix the code**:
  ```html
  <!-- Fixed Code -->
  <table>
    <tr>
      <td>Apple</td>
      <td>Red</td>
    </tr>
  </table>
  ```

---

## 🎨 Think Like a Web Designer: Readability & Zebra Striping

Have you ever tried reading a wide table with 20 columns where all the text is squished together in black and white? Your eyes drift to the wrong row and you get confused!

Professional web designers use two secrets:
1. **Cell Padding**: Giving cells generous breathing room so numbers don't touch the borders.
2. **Zebra Striping**: Alternating row background colors between white and light gray (`#f1f5f9`).
You will master these in the CSS track!

---

## 🚀 Mini Challenge: The Science Fair Results Table

Build a web page named `science-fair.html`:
- An `<h1>`: `Class 7 Science Fair: Project Results`
- A `<table border="1">` with 4 columns:
  - `Project No.`
  - `Student Name`
  - `Project Title`
  - `Judges' Score (out of 50)`
- Add at least 5 project rows, such as a solar water heater, a rainwater filter and a plant growth experiment!

---

## ⚠️ Common Mistake

**Building a table column by column.**

❌ Wrong: the student puts each *column* in a `<tr>`.

```html
<table border="1">
  <tr><td>Math</td><td>Science</td></tr>
  <tr><td>48</td><td>45</td></tr>
</table>
```

What happens: the subjects end up side by side on the first line and the marks on the second. The table reads sideways, and there are no headings.

✅ Fixed: one `<tr>` per **row** (one subject per row), with `<th>` headings on top.

```html
<table border="1">
  <tr><th>Subject</th><th>Marks</th></tr>
  <tr><td>Math</td><td>48</td></tr>
  <tr><td>Science</td><td>45</td></tr>
</table>
```

---

## ✍️ Try It

**The Student Marks Sheet**

Create a 3-column table showing your recent quiz scores:
1. Header row (`<th>`): `Subject`, `Total Marks`, `Marks Obtained`.
2. Row 2 (`<td>`): `Math`, `50`, `48`.
3. Row 3 (`<td>`): `Computer Science`, `50`, `50`.
4. Row 4 (`<td>`): `History`, `50`, `45`.
5. Preview in browser and check that every column aligns vertically!

> 💡 **Hint:** Count the cells. Every `<tr>` should hold exactly three cells, the same as the header row.

---

## 📝 Recap

- HTML tables display structured information across rows and columns.
- `<table>` wraps the whole table.
- `<tr>` creates a horizontal table row.
- `<th>` creates a bold, centered header cell.
- `<td>` creates a standard table data cell.
- Always remember: **Rows come first, cells go inside rows!**

---

## 📖 Key Terms

| Term | What It Means |
| :--- | :--- |
| **`<table>`** | Container element for defining a data table. |
| **`<tr>` (Table Row)** | Defines a single horizontal row of cells. |
| **`<th>` (Table Header)** | Defines a header cell, rendered bold and centered. |
| **`<td>` (Table Data)** | Defines a standard data cell within a row. |
| **Cell** | The individual intersection box between a row and a column. |

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which tag creates a table row?
2. Which tag makes the header cells at the top of columns?
3. What is the difference between `<th>` and `<td>`?

<details>
<summary>Show answer</summary>

1. `<tr>`
2. `<th>`
3. `<th>` is a **header** cell: a title for its column (bold and centred by default). `<td>` is a normal **data** cell.

</details>

### 🟡 Level 2: Apply
1. Write a 2-column table with 3 of your favourite books and their authors.
2. What happens if one row has 4 cells and the next row has only 2?

<details>
<summary>Show answer</summary>

1.

```html
<table border="1">
  <tr><th>Book</th><th>Author</th></tr>
  <tr><td>The Little Prince</td><td>Antoine de Saint-Exupéry</td></tr>
  <tr><td>Charlotte's Web</td><td>E. B. White</td></tr>
  <tr><td>Matilda</td><td>Roald Dahl</td></tr>
</table>
```

2. The table becomes uneven. The short row ends early and leaves empty space on the right. Every row should have the same number of cells.

</details>

### 🔴 Level 3: Challenge
`colspan` makes one cell stretch across several columns. For example, `<td colspan="3">` covers three columns.
1. Build a timetable with a header row: Time, Monday, Tuesday, Wednesday.
2. Add one row of lessons.
3. Add a "Lunch Break" row: the time in the first cell, and one cell that spans all three days.
4. Add one more row of lessons.

<details>
<summary>Show one possible answer</summary>

```html
<table border="1">
  <tr>
    <th>Time</th><th>Monday</th><th>Tuesday</th><th>Wednesday</th>
  </tr>
  <tr>
    <td>9:00</td><td>Math</td><td>Science</td><td>English</td>
  </tr>
  <tr>
    <td>12:00</td><td colspan="3">Lunch Break</td>
  </tr>
  <tr>
    <td>12:45</td><td>Art</td><td>History</td><td>Robotics</td>
  </tr>
</table>
```

(`rowspan` works the same way, but stretches a cell down across rows.)

</details>
