# Chapter 10: Tables 📊🗓️

---

## 1. 🌟 Real-Life Situation: The School Timetable Grid

Look at your school diary or classroom wall. Every Monday through Friday, how do you know what subject you have at 9:00 AM, 11:00 AM, and 2:00 PM?

You glance at a **Timetable Grid**!
- Across the top, you have column titles: *Monday*, *Tuesday*, *Wednesday*, *Thursday*, *Friday*.
- Down the left side, you have time periods: *Period 1*, *Period 2*, *Lunch Break*, *Period 3*.
- Where a row and a column intersect, there is a small box (a **cell**) showing your subject, like *Math in Room 204*.

Whenever you have information with multiple categories—like sports scores, train schedules, comparison charts, or grade sheets—**HTML Tables** are the best way to display that data neatly!

---

## 2. 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- Understand the 4 core table tags: `<table>`, `<tr>`, `<th>`, and `<td>`.
- Build grid structures row by row.
- Distinguish between a Header Cell (`<th>`) and a Data Cell (`<td>`).
- Understand how borders and padding make tables readable.
- Build a complete, responsive Class Timetable and Exam Marks Sheet.

---

## 3. 👁️ Visual Concept Explanation

### The 4 Pillars of an HTML Table

```text
 1. <table>   <--- The outer wrapper holding the entire grid
 2. <tr>      <--- Table Row: Creates a horizontal row from left to right
 3. <th>      <--- Table Header: Bold, centered title at the top of a column
 4. <td>      <--- Table Data: A single standard content cell
```

### Table Grid Architecture

```text
               Column 1         Column 2         Column 3
            ┌────────────────┬────────────────┬────────────────┐
  Row 1:    │   <th>Time     │   <th>Subject  │   <th>Room     │  <- Table Row (tr)
            ├────────────────┼────────────────┼────────────────┤
  Row 2:    │   <td>9:00 AM  │   <td>Science  │   <td>Lab 4    │  <- Table Row (tr)
            ├────────────────┼────────────────┼────────────────┤
  Row 3:    │   <td>10:00 AM │   <td>History  │   <td>Room 102 │  <- Table Row (tr)
            └────────────────┴────────────────┴────────────────┘
```

> ⚠️ **Common Mistake**: 
> HTML builds tables **row by row**, NOT column by column! You always declare `<tr>` first for the horizontal slice, and then put all the cells for that row inside it!

---

## 4. 💻 Code Example: Class Timetable & Marks Sheet

Type this into your editor and save it as `timetable.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
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
        <td>Music & Choir</td>
      </tr>
    </table>
  </body>
</html>
```

---

## 5. 🔍 Code Explanation: Stepping Through the Grid

- `<table>`: Opens the table. The attribute `border="1"` tells the browser to draw simple black gridlines around the cells so you can clearly see the structure (later, in Part 3, we will use modern CSS borders instead!).
- `<tr>`: Stands for **Table Row**. Every horizontal line on the screen is contained within its own `<tr>` and `</tr>`.
- `<th>`: Stands for **Table Header**. Notice that browsers automatically make the words inside `<th>` **bold and centered**!
- `<td>`: Stands for **Table Data**. This is a standard cell holding regular text, numbers, or even images.

---

## 6. 🌍 Real-World Connection: Sports Leaderboards & Flight Trackers

Where do professional websites rely on HTML tables?
- **FIFA World Cup & Premier League**: The team standings table (Played, Won, Drawn, Lost, Points, Goal Difference) is an HTML table.
- **Airport Flight Departure Screens**: The giant screen at the airport showing Flight Number, Destination, Departure Time, and Gate is an HTML table.
- **Online Banking**: Your monthly statement showing transactions, dates, and account balance is laid out with table elements.

---

## 7. ✍️ Try It Yourself: The Student Marks Sheet

Create a 3-column table showing your recent quiz scores:
1. Header row (`<th>`): `Subject`, `Total Marks`, `Marks Obtained`.
2. Row 2 (`<td>`): `Math`, `50`, `48`.
3. Row 3 (`<td>`): `Computer Science`, `50`, `50`.
4. Row 4 (`<td>`): `History`, `50`, `45`.
5. Preview in browser and check that every column aligns vertically!

---

## 8. 🔮 Predict the Output

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
<strong>Answer:</strong> The table will look distorted! The second row will stick out with an extra cell on the right that has no header above it. Every row in a clean table should have the same number of cells, or use <code>colspan</code> to bridge the gap!
</details>

---

## 9. 🕵️ Code Detective: The Flipped Tags

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

## 10. 🎨 Think Like a Web Designer: Readability & Zebra Striping

Have you ever tried reading a wide table with 20 columns where all the text is squished together in black and white? Your eyes drift to the wrong row and you get confused!

Professional web designers use two secrets:
1. **Cell Padding**: Giving cells generous breathing room so numbers don't touch the borders.
2. **Zebra Striping**: Alternating row background colors between white and light gray (`#f1f5f9`).
You will master these with CSS in Chapter 15!

---

## 11. 🚀 Mini Challenge: The Video Game High Scores Board

Build a web page named `leaderboard.html`:
- An `<h1>`: `Galaxy Blaster: All-Time High Scores`
- A `<table border="1">` with 4 columns:
  - `Rank`
  - `Player Name`
  - `High Score`
  - `Badges Won`
- Add at least 5 player rows, with the #1 champion having a score over 100,000 points!

---

## 12. 📝 Chapter Recap

- HTML tables display structured information across rows and columns.
- `<table>` wraps the whole table.
- `<tr>` creates a horizontal table row.
- `<th>` creates a bold, centered header cell.
- `<td>` creates a standard table data cell.
- Always remember: **Rows come first, cells go inside rows!**

---

## 13. 📖 Key Terms

| Term | What It Means |
| :--- | :--- |
| **`<table>`** | Container element for defining a data table. |
| **`<tr>` (Table Row)** | Defines a single horizontal row of cells. |
| **`<th>` (Table Header)** | Defines a header cell, rendered bold and centered. |
| **`<td>` (Table Data)** | Defines a standard data cell within a row. |
| **Cell** | The individual intersection box between a row and a column. |

---

## 14. 🏆 Practice Exercises

### 🟢 Easy (Recall)
1. Which tag creates a table row?
2. Which tag is used for the header cells at the top of columns?
3. What is the difference between `<th>` and `<td>`?

### 🟡 Medium (Application)
4. Write the HTML code for a 2-column table displaying 3 of your favorite books and their authors.
5. What happens if one row in a table has 4 cells and the next row has only 2 cells?

### 🔴 Challenge (Creative Problem-Solving)
6. Research the HTML attributes `colspan` and `rowspan`. Write a table where one cell stretches across two columns (like a "Lunch Break" banner that spans all 5 days of the week)!
