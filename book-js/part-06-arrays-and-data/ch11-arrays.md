*Part 6 · Arrays and Data*
# Chapter 11: Arrays — Storing Lists of Things

---

## 🌟 Real-Life Story

Imagine packing your school bag for Monday:
You have:
- Math textbook
- Pencil case
- Lunchbox
- Water bottle
- Notebook

If you had to declare a separate variable for every single item in your bag, your code would look like:
```javascript
let bagItem1 = "Math textbook";
let bagItem2 = "Pencil case";
let bagItem3 = "Lunchbox";
let bagItem4 = "Water bottle";
let bagItem5 = "Notebook";
```
What if you packed 25 items? Or 100 items? Creating 100 individual variables is exhausting and messy. 
Instead, you just need **one backpack** (one variable) that holds an ordered list!

---

## 🎯 What You Will Learn

By the end of this chapter, you will be able to:
- Explain why arrays are needed when managing collections of related data.
- Create an array using square brackets `[]`.
- Read and change items using zero-based indexing (`array[0]`).
- Check how many items are in a list using `.length`.
- Iterate over an array using a `for` loop.

---

## 💡 Concept Explanation

An **Array** is a special container that holds an ordered list of values. 

### Creating an Array
```javascript
let backpack = ["Math textbook", "Pencil case", "Lunchbox", "Water bottle", "Notebook"];
```

### Zero-Based Indexing (The Secret Rule!)

![Zero-Based Array Indexing Ruler](../assets/diagrams/js/array-indexing-ruler.svg)

In computer science, counting almost always starts at **0**, not 1!
- Index 0: First item
- Index 1: Second item
- Index 2: Third item

```text
Index:      0                 1              2             3               4
Value: ["Math textbook", "Pencil case", "Lunchbox", "Water bottle", "Notebook"]
```

```javascript
console.log(backpack[0]); // "Math textbook"
console.log(backpack[2]); // "Lunchbox"
```

### The Length Property
Every array has a built-in property named `.length` that tells you exactly how many items are inside:
```javascript
console.log(backpack.length); // 5
```

> 💡 **Pro-Tip:** The index of the very last item in any array is always `array.length - 1`!
> `backpack[backpack.length - 1]` gives `"Notebook"`.

### Updating Elements
You can replace an item by reassigning its index:
```javascript
backpack[1] = "Art Sketchbook"; // Replaces "Pencil case"
```

---

## 🌍 Real-World Example

Think about the score board for your class science quiz:
```javascript
let topScores = [98, 95, 84, 78, 72];
```
1. Who came 1st (Gold Medal)? `topScores[0]` (98).
2. Who came 2nd (Silver Medal)? `topScores[1]` (95).
3. If the teacher re-marks the 3rd paper and adds 3 marks, the board updates `topScores[2] = 87`.

---

## 💻 Code Example

```javascript
let planets = ["Mercury", "Venus", "Earth", "Mars", "Jupiter"];

console.log("Total Planets: " + planets.length);
console.log("Closest to the Sun: " + planets[0]);

// Change the 3rd planet (index 2) to its Arabic name
planets[2] = "Al-Ard";

console.log("--- The Planet List ---");
// Looping through every planet in the array
for (let i = 0; i < planets.length; i++) {
    console.log("Planet #" + (i + 1) + ": " + planets[i]);
}
```

Output:

```text
Total Planets: 5
Closest to the Sun: Mercury
--- The Planet List ---
Planet #1: Mercury
Planet #2: Venus
Planet #3: Al-Ard
Planet #4: Mars
Planet #5: Jupiter
```

---

## 🔍 Line-by-Line Explanation

- `let planets = [...]`: Declares an array of strings holding 5 planet names.
- `planets.length`: Evaluates to 5.
- `planets[0]`: Accesses the first element (`"Mercury"`).
- `planets[2] = "Al-Ard"`: Modifies index 2 (replacing `"Earth"` with its Arabic name).
- `for (let i = 0; i < planets.length; i++)`: A loop running from `i = 0` up to `i = 4` (since `i < 5`).
- `console.log("Planet #" + (i + 1) + ": " + planets[i])`: Prints each planet's position (1 to 5) and name cleanly.

---

## 🔮 Predict the Output

```javascript
let pets = ["Dog", "Cat", "Parrot"];
pets[1] = "Hamster";
pets[3] = "Rabbit";

console.log(pets);
console.log(pets.length);
```
*What will be printed?*

<details>
<summary>👀 Click to check your answer</summary>

```text
[ 'Dog', 'Hamster', 'Parrot', 'Rabbit' ]
4
```

`pets[1]` replaces `"Cat"`. `pets[3]` did not exist, so JavaScript adds a new fourth item. The length grows to 4.
(A browser console may show the array as `['Dog', 'Hamster', 'Parrot', 'Rabbit']`.)

</details>

---

## 🧭 Think Like a Programmer: Off-By-One Errors (Fencepost Errors)

One of the most common bugs in all of software engineering is the **Off-By-One Error**!
When an array has 5 items:
- Valid indices are: `0, 1, 2, 3, 4`.
- If you write `i <= array.length` instead of `i < array.length`, on the last round `i` becomes `5`.
- `array[5]` does not exist! It evaluates to `undefined`.
Always double-check your comparison operator: use `< array.length`!

---

## 🚀 Coding Challenge

Write a function `findLargestNumber(numbersArray)`:
- It accepts an array of numbers.
- It loops through the array to find and return the largest number.
- Test it with `[12, 45, 7, 89, 23, 64]`. It should return `89`.

---

## 🛠️ Mini Project: Class Roll Call

Create a program with an array of student names:
`let students = ["Aanya", "Dev", "Fatima", "Kabir", "Meera", "Rohan"];`
Create a parallel boolean array for attendance:
`let isPresent = [true, false, true, true, false, true];`

Loop through the students and print:
```text
=== CLASS 7-B ROLL CALL ===
1. Aanya: [PRESENT]
2. Dev: [ABSENT]
3. Fatima: [PRESENT]
4. Kabir: [PRESENT]
5. Meera: [ABSENT]
6. Rohan: [PRESENT]
---------------------------
Total Students: 6
Present: 4 | Absent: 2
```

---

## ⚠️ Common Mistake

Find the errors in this code:
```javascript
let groceryList = ("Milk", "Eggs", "Bread", "Butter");
console.log(groceryList[1]);

for (let i = 0; i <= groceryList.length; i++) {
    console.log(groceryList(i));
}
```

- **What happens**: The first line prints `u`, then JavaScript stops with `TypeError: groceryList is not a function`.
- **Error 1**: An array uses square brackets `[ ]`. With round brackets, JavaScript keeps only the last value, `"Butter"`. So `groceryList[1]` is the letter `u`!
- **Error 2**: `groceryList(i)` uses round brackets, which means "call a function". To read an item, use `groceryList[i]`.
- **Error 3**: `i <= groceryList.length` goes one step too far (the off-by-one error). Use `<`.
- **Fix the code**:
  ```javascript
  let groceryList = ["Milk", "Eggs", "Bread", "Butter"];
  console.log(groceryList[1]);

  for (let i = 0; i < groceryList.length; i++) {
      console.log(groceryList[i]);
  }
  ```
  Output: `Eggs`, then `Milk`, `Eggs`, `Bread`, `Butter` (one per line).

---

## ✍️ Try It

1. Open your console.
2. Create an array of 4 of your favorite fruits:
   ```javascript
   let fruits = ["Mango", "Apple", "Banana", "Strawberry"];
   ```
3. Print the first fruit and the last fruit using `fruits.length - 1`.
4. Replace `"Apple"` with `"Pineapple"`.
5. Print the entire array.

> 💡 **Hint:** The last fruit is `fruits[fruits.length - 1]`, which is index 3 here. To replace `"Apple"`, write `fruits[1] = "Pineapple";`.

---

## 📝 Recap

- Arrays store ordered collections of values.
- Created with `[val1, val2, val3]`.
- First element is index `0`; last element is `array.length - 1`.
- Access and update elements with bracket notation `array[index]`.
- Use a `for` loop with `i < array.length` to visit every item.

---

## 📖 Key Terms

- **Array:** An ordered list of values stored in a single variable.
- **Index:** The numerical position of an element in an array (starts at 0).
- **Element:** An individual value inside an array.
- **Length:** The total count of elements inside an array.
- **Undefined:** The value returned when you query an index that doesn't exist.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. What is the index of the first item in any JavaScript array?
2. An array `colors` has 6 items. What is `colors.length`? What is the index of the last item?

<details>
<summary>Show answer</summary>

1. `0`
2. `colors.length` is `6`. The last index is 6 − 1 = `5`.

</details>

### 🟡 Level 2: Apply
Given `let temperatures = [32, 34, 30, 28, 35, 33, 32];`, use a loop to work out the average temperature of the week.

Extra: what does `backpack[99]` give when the array has only 5 items?

<details>
<summary>Show answer</summary>

```javascript
let temperatures = [32, 34, 30, 28, 35, 33, 32];
let total = 0;

for (let i = 0; i < temperatures.length; i++) {
    total += temperatures[i];
}

console.log("Average temperature:", total / temperatures.length);
```

Output: `Average temperature: 32`

Extra: it gives `undefined`. There is no item at index 99, but JavaScript does not crash.

</details>

### 🔴 Level 3: Challenge
Count the distinction students:
1. Start with `let marks = [85, 92, 45, 78, 60, 95];`.
2. Loop through the array.
3. Count how many marks are 80 or above.
4. Print `"Number of distinction students: X"`.

<details>
<summary>Show one possible answer</summary>

```javascript
let marks = [85, 92, 45, 78, 60, 95];
let distinctionCount = 0;

for (let i = 0; i < marks.length; i++) {
    if (marks[i] >= 80) {
        distinctionCount++;
    }
}

console.log("Number of distinction students: " + distinctionCount);
```

Output:

```text
Number of distinction students: 3
```

</details>

---

## ✅ Self-Assessment Checklist

- [ ] I can create an array with numbers, strings, or booleans.
- [ ] I remember that indexing starts at 0.
- [ ] I can safely access the last item using `.length - 1`.
- [ ] I can write a `for` loop to inspect every element in an array.

---

## 🏡 Homework

1. Create an array of the 7 days of the week. Print only the weekend days (Saturday and Sunday).
2. Create an array of 5 cities. Write a loop that prints `"I want to visit [City Name]!"` for each.
3. Write a program that reverses a list of numbers without using built-in reverse functions (hint: loop backwards!).

---

## 🍎 Teacher Discussion Questions

1. Why do computers start counting at 0 instead of 1? (Hint: Memory offsets from the starting memory address!)
2. When should you use a single array instead of multiple separate variables?
