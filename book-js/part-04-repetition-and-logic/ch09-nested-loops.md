# Chapter 9: Nested Loops & Patterns 🔲

---

## 🌟 Real-Life Story

**The Classroom Seating Grid**

Look at your classroom:
- There are **4 rows** of student desks.
- In each row, there are **5 desks**.
- When the teacher walks through the room to collect homework:
  - She stands at **Row 1**: Collects from desk 1, 2, 3, 4, 5.
  - She moves to **Row 2**: Collects from desk 1, 2, 3, 4, 5.
  - She moves to **Row 3**: Collects from desk 1, 2, 3, 4, 5.
  - She moves to **Row 4**: Collects from desk 1, 2, 3, 4, 5.

Notice that for every single row, she repeats 5 desk visits! `4 rows × 5 desks = 20 total students visited`!
**A loop inside another loop is called a Nested Loop!**

---

## 🎯 What You Will Learn

By the end of this chapter, you will be able to:
- Understand what a **nested loop** is and how execution flows.
- Track the relationship between the **outer loop** and the **inner loop**.
- Calculate the total number of iterations in nested loops (Multiplication Principle).
- Construct 2D grid coordinates, tables, and geometric star patterns.
- Build an interactive Pattern Maker program.

---

## 💡 Concept Explanation

### The Anatomy of a Nested Loop

```text
  for (let row = 1; row <= 3; row++) {      <--- OUTER LOOP (Controls Rows)
    
    for (let col = 1; col <= 3; col++) {    <--- INNER LOOP (Runs completely each row!)
      console.log("Row: " + row + ", Col: " + col);
    }

  }
```

*The Golden Rule*: The **inner loop MUST complete ALL of its cycles** before the outer loop can take a single step forward!

### Star Patterns: Building Strings Row-by-Row
To print a triangle of stars, we build a string inside the inner loop and print the completed string when the inner loop finishes:

```text
 Row 1 (col <= 1): *
 Row 2 (col <= 2): * *
 Row 3 (col <= 3): * * *
 Row 4 (col <= 4): * * * *
```

---

## 🌍 Real-World Connection: Computer Pixels & Clocks

- **Digital Clocks**: The seconds tick from 0 to 59 (inner loop). Only when seconds finish does the minute counter tick up by 1 (outer loop)!
- **Grids**: Floor tiles, seating plans, and pixel art pictures are drawn on screens using nested loops iterating across `x` and `y` coordinates!

---

## 💻 Code Example: The Triangle Star Maker

Type this into your editor or scratchpad:

```javascript
// Drawing a growing triangle of stars
const totalRows = 5;

for (let row = 1; row <= totalRows; row++) {
  let starLine = ""; // Start with an empty row string

  // Inner loop runs 'row' number of times:
  for (let col = 1; col <= row; col++) {
    starLine += "* ";
  }

  // Print the completed horizontal row:
  console.log(starLine);
}
```

Output:

```text
* 
* * 
* * * 
* * * * 
* * * * * 
```

---

## 🔍 Line-by-Line Explanation

- When `row = 1`: Inner loop runs for `col = 1`. `starLine` becomes `"* "`. Prints: `* `
- When `row = 2`: Inner loop runs for `col = 1` and `col = 2`. `starLine` becomes `"* * "`. Prints: `* * `
- When `row = 3`: Inner loop runs 3 times. Prints: `* * * `
- By linking the inner loop's limit to the current `row` counter (`col <= row`), each row grows wider than the previous one!

---

## 🔮 Predict the Output

Look at this snippet:

```javascript
for (let i = 1; i <= 2; i++) {
  for (let j = 1; j <= 2; j++) {
    console.log(i + "-" + j);
  }
}
```

**Question**: What exact 4 lines will print?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong>
<br><code>1-1</code>
<br><code>1-2</code>
<br><code>2-1</code>
<br><code>2-2</code>
</details>

---

## 🧭 Think Like a Programmer: The Tiled Floor Problem

The school hall floor is a square of tiles: 8 rows and 8 columns, in two colours.
- Plan the algorithm to draw the 8x8 floor with alternating `[ ]` and `[#]` tiles.
- (Hint: If `(row + col) % 2 === 0`, print a dark tile `[#]`, else print a light tile `[ ]`!).

---

## 🚀 Coding Challenge: The Number Pyramid

Can you use nested loops to print this number triangle?
```text
1
1 2
1 2 3
1 2 3 4
1 2 3 4 5
```

---

## 🛠️ Mini Project: The Pattern Maker

Build a pattern maker program that can draw 2 different geometric shapes:
- Pattern A: A 4x4 Square of hashes (`#`)
- Pattern B: A 5-tier pyramid of numbers
- Print a decorative dividing line between the two designs!

---

## ⚠️ Common Mistake

**The Stagnant Row Number**

A student tried to print coordinates, but the column number never appeared:

```javascript
for (let row = 1; row <= 3; row++) {
  for (let col = 1; col <= 3; col++) {
    console.log(row);
  }
}
```

- **What happens**: It prints `1 1 1 2 2 2 3 3 3` (one number per line). You cannot tell which column you are in.
- **Find the mistake**: Look inside `console.log(row)`!
- **Explain the mistake**: The student is logging ONLY the `row` variable, completely ignoring the `col` variable!
- **Fix the code**:
  ```javascript
  for (let row = 1; row <= 3; row++) {
    for (let col = 1; col <= 3; col++) {
      console.log("Row: " + row + ", Col: " + col);
    }
  }
  ```

---

## ✍️ Try It

Open your console:
1. Run the Triangle Star Maker from the Code Example above to see your triangle appear!
2. Now change `col <= row` to `col <= 5`.
3. Re-run: What shape did it make? **A solid 5x5 square of stars!**

> 💡 **Hint:** With `col <= 5`, the inner loop no longer depends on `row`. Every row gets exactly 5 stars, so all rows are the same width.

---

## 📝 Recap

- A nested loop is a loop located inside another loop.
- The inner loop completes all iterations for every single iteration of the outer loop.
- Total executions = `Outer Count × Inner Count`.
- Used extensively in grid layouts, 2D screen coordinates, and algorithmic pattern generation.

---

## 📖 Key Terms

| Term | What It Means |
| :--- | :--- |
| **Nested Loop** | A loop statement placed inside the body of another loop statement. |
| **Outer Loop** | The parent loop controlling primary passes or rows. |
| **Inner Loop** | The child loop executing completely within each pass of the parent. |
| **2D Grid** | A two-dimensional coordinate system structured into rows and columns. |

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. In a nested loop, which loop finishes all its rounds for each single round of the other: the inner or the outer?
2. An outer loop runs 4 times. Its inner loop runs 5 times. How many times does the inner loop body run in total?

<details>
<summary>Show answer</summary>

1. The **inner** loop.
2. 4 × 5 = **20** times.

</details>

### 🟡 Level 2: Apply
1. Write a nested loop that prints a 3×3 grid of coordinates: `1-1`, `1-2`, `1-3`, `2-1` … `3-3`.
2. Why must `starLine = ""` be reset inside the outer loop, not before it?

<details>
<summary>Show answer</summary>

1. ```javascript
   for (let i = 1; i <= 3; i++) {
     for (let j = 1; j <= 3; j++) {
       console.log(i + "-" + j);
     }
   }
   ```
   It prints nine lines, from `1-1` to `3-3`.
2. Each row needs a fresh, empty string. If it is created only once, the stars from earlier rows stay, and every row keeps growing on the end of the last one.

</details>

### 🔴 Level 3: Challenge
Print a 5×5 multiplication grid:
1. Use an outer loop for rows 1 to 5.
2. Inside it, make an empty string, then use an inner loop for columns 1 to 5.
3. Add `row * col` and a space to the string.
4. Print the string after the inner loop ends.

Extra: change the star triangle so it starts with 5 stars and shrinks to 1.

<details>
<summary>Show one possible answer</summary>

```javascript
for (let row = 1; row <= 5; row++) {
  let line = "";
  for (let col = 1; col <= 5; col++) {
    line += (row * col) + " ";
  }
  console.log(line);
}
```

Output:

```text
1 2 3 4 5 
2 4 6 8 10 
3 6 9 12 15 
4 8 12 16 20 
5 10 15 20 25 
```

Extra: count the outer loop down with `for (let row = 5; row >= 1; row--)`. The inner loop `col <= row` then prints 5, 4, 3, 2, 1 stars.

</details>

---

## ✅ Self-Assessment Checklist

- [ ] I can trace the order of execution in a nested loop.
- [ ] I can calculate total iterations using multiplication.
- [ ] I can build and print a horizontal string inside a loop.
- [ ] I can generate custom star and number patterns.

---

## 🏡 Homework

Write a nested loop that prints a 4-row countdown pattern:
```text
4 3 2 1
3 2 1
2 1
1
```

---

## 🍎 Teacher Discussion Questions

1. Walk students through a physical clock: Why would creating a clock without nested loops require 86,400 manual lines of code?
2. Discuss why having 4 or 5 deeply nested loops can make programs run slowly (computer scientists call this "n squared" work, written O(n²)).
