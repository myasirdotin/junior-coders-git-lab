# Chapter 3: Variables 📦

---

## 🌟 Real-Life Story

**The Labelled Memory Boxes**

Imagine a shelf in your bedroom with empty cardboard storage boxes:
- On one box, you write a sticky note label: **"Score"**. You place the number `10` on a card inside the box.
- When you score 5 more points in your board game, you pull out the card, erase `10`, and write `15`.
- On another box, you write a permanent label: **"BirthDay"**. Inside, you put `"March 14"`. That date will **never** change for the rest of your life!

**This is exactly how computer memory works with variables!**
A variable is simply a named storage box in your computer's RAM memory where you can stash numbers, words, or lists to reuse later in your code!

---

## 🎯 What You Will Learn

By the end of this chapter, you will be able to:
- Understand what a variable is and why programs need them.
- Declare variables using `let` (values that change) and `const` (values that stay fixed).
- Assign and reassign values to variables.
- Follow modern naming rules and master **camelCase** conventions.
- Understand variable scope and case-sensitivity in JavaScript.

---

## 💡 Concept Explanation

### The Memory Box Mental Model

![Variables in Memory: Storage Containers](../assets/diagrams/js/variable-memory-box.svg)

### `let` vs. `const`: The Golden Rule
In modern JavaScript, there are two primary keywords used to declare variables:

1. **`let`**: Used for values that **CAN change** (be reassigned) later in the program.
   ```javascript
   let score = 10;
   score = 15; // Perfectly legal! The box gets an updated value.
   ```
2. **`const`**: Short for *constant*. Used for values that **CANNOT change** once assigned.
   ```javascript
   const schoolName = "Green Valley Academy";
   // schoolName = "Other School"; // ERROR! TypeError: Assignment to constant variable.
   ```

### Variable Naming Rules (The Law of the Code)
1. **No Spaces**: Variable names cannot have spaces! (Use `studentName`, not `student name`).
2. **Cannot Start with a Number**: `1stPlace` is illegal ❌; `firstPlace` or `place1` is valid ✅.
3. **Only Certain Symbols Allowed**: Letters, numbers, dollar signs (`$`), and underscores (`_`). No dashes or punctuation (`user-name` is illegal in JS!).
4. **JavaScript Is Case-Sensitive**: `score`, `Score`, and `SCORE` are three totally different boxes!
5. **Use camelCase**: Start lowercase, and capitalize each subsequent word (`myFavoriteColor`, `highGameScore`).

---

## 🌍 Real-World Example: School Report Cards

Look at your quarterly school report card:
- The box labeled **"Student Name"** is a constant: it stays the same all year (`const studentName = "Amina";`).
- The box labeled **"Total Marks"** or **"Attendance Days"** changes every single week as you take quizzes and attend classes (`let attendance = 45; attendance += 1;`).

---

## 💻 Code Example: A Reading Challenge Tracker

Type this code into your editor or scratchpad:

```javascript
// Declare constant (fixed) values
const readerName = "Zane";
const booksGoal = 3;

// Declare changeable values
let pagesRead = 0;
let readingLevel = 1;

console.log("Reader:", readerName);
console.log("Pages read:", pagesRead);

// Zane finishes a 100-page book!
pagesRead = pagesRead + 100;
console.log("Updated pages read:", pagesRead);

// Zane moves up one reading level!
readingLevel = readingLevel + 1;
console.log("Reading level:", readingLevel);
```

Output:

```text
Reader: Zane
Pages read: 0
Updated pages read: 100
Reading level: 2
```

---

## 🔍 Line-by-Line Explanation

- Line 2: `const readerName = "Zane";` creates a locked box named `readerName`. It holds the text `"Zane"`.
- Line 6: `let pagesRead = 0;` creates an unlocked box named `pagesRead`. It starts at `0`.
- Line 13: `pagesRead = pagesRead + 100;`:
  - The computer looks inside `pagesRead` (finds `0`).
  - It calculates `0 + 100 = 100`.
  - It stores `100` back into the `pagesRead` box!
  - Notice we do **NOT** write `let` again! You only declare a variable once. To change it, just use its name!

---

## 🔮 Predict the Output

Look at this code:

```javascript
let apples = 4;
apples = apples + 2;
console.log(apples);
```

**Question**: What number will print in the console?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer: 6!</strong> 
First <code>apples</code> starts at 4. Then 4 + 2 is calculated (6) and reassigned back into <code>apples</code>.
</details>

---

## 🧭 Think Like a Programmer: The Library Book Tracker

Imagine you are designing the computer system for your school library.
For each book, you must store:
- Book Title
- Author Name
- Total Pages
- Is it currently checked out? (true or false)
- Days overdue

**Question**: Which of these should be declared with `const`, and which must be declared with `let`? Write down your reasoning before checking!

---

## 🚀 Coding Challenge: The Shopping Trip Receipt

Write a program that defines:
- `itemName = "Sketchbook"`
- `itemPrice = 15`
- `quantity = 3`
- Calculates `totalCost = itemPrice * quantity;`
- Prints: `"Item: Sketchbook | Quantity: 3 | Total: Rs 45"`

---

## 🛠️ Mini Project: Student Profile Card

Write a program that stores your student information across multiple variables:
- `studentName` (string)
- `studentGrade` (string)
- `favoriteSubject` (string)
- `hobbyCount` (number)

Print out a formatted multi-line card:
```text
====================================
      STUDENT ACADEMY PROFILE
====================================
Name: Maya Lin
Grade: Class 7-A
Favorite Subject: Computer Science
Hobbies Count: 4
====================================
```

---

## ⚠️ Common Mistake

**The Illegal Starting Character**

A student wrote this program. JavaScript stopped with an error (in Chrome: `SyntaxError: Invalid or unexpected token`):

```javascript
let 1stPlace = "Sara";
console.log(1stPlace);
```

- **Find the mistake**: Look at the first character of the variable name!
- **Explain the mistake**: In JavaScript, variable names **CANNOT start with a number**!
- **Fix the code**:
  ```javascript
  let firstPlace = "Sara";
  console.log(firstPlace);
  ```

---

## ✍️ Try It

Open your console:
1. Create a variable for your age:
   ```javascript
   let age = 12;
   console.log("Current age:", age);
   ```
2. Celebrate a birthday! Reassign `age = 13;` and log it again.
3. Try creating a `const myBirthday = "July 9";` and then try changing it to `"August 1"`. Watch what error JavaScript displays!

> 💡 **Hint:** In step 2, write `age = 13;` without `let`. In step 3, you should see `TypeError: Assignment to constant variable.`

---

## 📝 Recap

- A **variable** is a named storage container for data in memory.
- `let` allows values to be updated (reassigned).
- `const` prevents values from being modified once set.
- Variable names must not start with numbers and cannot contain spaces.
- Professional developers use **camelCase** for multi-word variables (`studentAge`).

**Check yourself:**

- [ ] I can explain the difference between `let` and `const`.
- [ ] I can name variables following proper camelCase rules.
- [ ] I know which characters are illegal at the start of a variable name.
- [ ] I can update an existing variable without re-declaring it with `let`.

---

## 📖 Key Terms

| Term | What It Means |
| :--- | :--- |
| **Variable** | A named container that stores a value in computer memory. |
| **`let`** | Keyword used to declare a variable that can be reassigned. |
| **`const`** | Keyword used to declare a constant variable that cannot be reassigned. |
| **Declaration** | Creating a new variable for the first time. |
| **Assignment (`=`)** | Placing a value inside a variable container. |
| **camelCase** | Writing compound words where each word after the first starts with a capital letter. |

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Fill in the blanks: use ______ for a value that might change, and ______ for a value that must stay fixed.
2. Which name is written in proper camelCase?
   (a) `student_name` (b) `StudentName` (c) `studentName` (d) `2ndStudent`

<details>
<summary>Show answer</summary>

1. `let`, `const`
2. **(c)** `studentName`. It starts lowercase, and each new word starts with a capital letter.

</details>

### 🟡 Level 2: Apply
1. Write code that creates a variable `favoriteSport`, stores your favourite sport in it, and prints it.
2. What happens when this code runs, and why?
   ```javascript
   const total = 50;
   total = 60;
   ```

<details>
<summary>Show answer</summary>

1. One possible answer:
   ```javascript
   const favoriteSport = "Football";
   console.log("My favourite sport is", favoriteSport);
   ```
   Output: `My favourite sport is Football`
2. JavaScript stops with `TypeError: Assignment to constant variable.` A `const` box is locked, so it cannot get a new value. Use `let` if the value must change.

</details>

### 🔴 Level 3: Challenge
Write a program for an imaginary space mission:
1. Create `spaceshipName` (constant) and `astronautCount` (constant).
2. Create `fuelPercentage` (changeable). It starts at 100.
3. Print a status line.
4. Simulate the launch: burn 25% of the fuel, then print the new fuel level.

<details>
<summary>Show one possible answer</summary>

```javascript
const spaceshipName = "Crescent One";
const astronautCount = 4;
let fuelPercentage = 100;

console.log("Ship:", spaceshipName, "| Crew:", astronautCount, "| Fuel:", fuelPercentage);

// Launch! The engines burn 25% of the fuel.
fuelPercentage = fuelPercentage - 25;
console.log("After launch, fuel is now:", fuelPercentage);
```

Output:

```text
Ship: Crescent One | Crew: 4 | Fuel: 100
After launch, fuel is now: 75
```

</details>
