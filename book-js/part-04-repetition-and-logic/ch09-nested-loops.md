# Chapter 9: Nested Loops & Patterns 🔲⭐

---

## 1. 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- Understand what a **nested loop** is and how execution flows.
- Track the relationship between the **outer loop** and the **inner loop**.
- Calculate the total number of iterations in nested loops (Multiplication Principle).
- Construct 2D grid coordinates, tables, and geometric star patterns.
- Build an interactive Pattern Maker program.

---

## 2. ☀️ Warm-Up Activity: The Classroom Seating Grid

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

## 3. 💡 Concept Explanation

### The Anatomy of a Nested Loop

```text
  for (let row = 1; row <= 3; row++) {      <--- OUTER LOOP (Controls Rows)
    
    for (let col = 1; col <= 3; col++) {    <--- INNER LOOP (Runs completely each row!)
      console.log(`Row: ${row}, Col: ${col}`);
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

## 4. 🌍 Real-World Connection: Computer Pixels & Clocks

- **Digital Clocks**: The seconds tick from 0 to 59 (inner loop). Only when seconds finish does the minute counter tick up by 1 (outer loop)!
- **Game Grids**: Chessboards, Minecraft chunks, and retro pixel art grids are drawn on screens using nested loops iterating across `x` and `y` coordinates!

---

## 5. 💻 Code Example: The Triangle Star Maker

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

---

## 6. 🔍 Line-by-Line Explanation

- When `row = 1`: Inner loop runs for `col = 1`. `starLine` becomes `"* "`. Prints: `* `
- When `row = 2`: Inner loop runs for `col = 1` and `col = 2`. `starLine` becomes `"* * "`. Prints: `* * `
- When `row = 3`: Inner loop runs 3 times. Prints: `* * * `
- By linking the inner loop's limit to the current `row` counter (`col <= row`), each row grows wider than the previous one!

---

## 7. ✍️ Try It Yourself

Open your console:
1. Run the code above to see your triangle appear!
2. Now change `col <= row` to `col <= 5`.
3. Re-run: What shape did it make? **A solid 5x5 square of stars!**

---

## 8. 📝 Practice Exercises (5 Levels of Mastery)

### 🟢 Level 1 – Remember (Recall)
1. In a nested loop, which loop finishes all its cycles first for each single pass of the outer loop: inner or outer?
2. If an outer loop runs 4 times and its inner loop runs 5 times, how many total times does the inner loop body run?

### 🔵 Level 2 – Understand (Comprehension)
3. Explain why `starLine = ""` must be reset inside the outer loop rather than outside.

### 🟡 Level 3 – Apply (Application)
4. Write a nested loop that prints a 3×3 grid of coordinates like `"1-1"`, `"1-2"`, `"1-3"`, `"2-1"`, etc.

### 🟣 Level 4 – Think (Analysis)
5. How would you modify the star triangle loop to print an **inverted** triangle (starting with 5 stars on top, shrinking down to 1 star)?

### 🔴 Level 5 – Create ⭐ (Challenge)
6. Write a program using nested loops that generates and prints a 5×5 multiplication grid from `1 × 1` to `5 × 5`!

---

## 9. 🔮 Predict the Output

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

## 10. 🕵️ Debug It: The Stagnant Row Number

A student tried to print coordinates, but the column number never appeared:

```javascript
for (let row = 1; row <= 3; row++) {
  for (let col = 1; col <= 3; col++) {
    console.log(row);
  }
}
```

- **Find the mistake**: Look inside `console.log(row)`!
- **Explain the mistake**: The student is logging ONLY the `row` variable, completely ignoring the `col` variable!
- **Fix the code**:
  ```javascript
  for (let row = 1; row <= 3; row++) {
    for (let col = 1; col <= 3; col++) {
      console.log(`Row: ${row}, Col: ${col}`);
    }
  }
  ```

---

## 11. 🧭 Think Like a Programmer: The Chessboard Problem

A chessboard has 8 ranks (rows) and 8 files (columns).
- Plan the algorithm to draw an 8x8 checkerboard with alternating `[ ]` and `[#]` tiles.
- (Hint: If `(row + col) % 2 === 0`, print black, else print white!).

---

## 12. 🚀 Coding Challenge ⭐: The Number Pyramid

Can you use nested loops to print this number triangle?
```text
1
1 2
1 2 3
1 2 3 4
1 2 3 4 5
```

---

## 13. 🛠️ Mini Project: The Pattern Maker

Build a pattern maker program that can draw 2 different geometric shapes:
- Pattern A: A 4x4 Square of hashes (`#`)
- Pattern B: A 5-tier pyramid of numbers
- Print a decorative dividing line between the two designs!

---

## 14. 📝 Chapter Recap

- A nested loop is a loop located inside another loop.
- The inner loop completes all iterations for every single iteration of the outer loop.
- Total executions = `Outer Count × Inner Count`.
- Used extensively in grid layouts, 2D gaming coordinates, and algorithmic pattern generation.

---

## 15. 📖 Key Terms

| Term | What It Means |
| :--- | :--- |
| **Nested Loop** | A loop statement placed inside the body of another loop statement. |
| **Outer Loop** | The parent loop controlling primary passes or rows. |
| **Inner Loop** | The child loop executing completely within each pass of the parent. |
| **2D Grid** | A two-dimensional coordinate system structured into rows and columns. |

---

## 16. ✅ Self-Assessment Checklist

- [ ] I can trace the order of execution in a nested loop.
- [ ] I can calculate total iterations using multiplication.
- [ ] I can build and print a horizontal string inside a loop.
- [ ] I can generate custom star and number patterns.

---

## 17. 🏡 Homework

Write a nested loop that prints a 4-row countdown pattern:
```text
4 3 2 1
3 2 1
2 1
1
```

---

## 18. 🍎 Teacher Discussion Questions

1. Walk students through a physical clock: Why would creating a clock without nested loops require 86,400 manual lines of code?
2. Discuss why having 4 or 5 deeply nested loops can make programs run slowly (algorithmic complexity / $O(n^2)$).
