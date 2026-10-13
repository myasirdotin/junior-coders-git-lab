*Part 6 · Arrays and Data*
# Chapter 12: Array Methods — The Power Tools of Lists

---

## 🌟 Real-Life Story

Imagine shopping with a dynamic digital cart:
1. You click "Add to Cart" on a science kit → The kit pops onto the end of your list!
2. You decide you don't want the last item you added → You click "Remove Last Item"!
3. You search your cart: "Did I remember to add batteries?" → The app tells you "Yes!" or "No!".

JavaScript arrays have built-in **methods** (special built-in functions) that perform all these actions in just one line of code!

---

## 🎯 What You Will Learn

By the end of this chapter, you will be able to:
- Add items to an array using `.push()` and `.unshift()`.
- Remove items from an array using `.pop()` and `.shift()`.
- Search a list with `.includes()` and `.indexOf()`.
- Copy part of an array with `.slice()`.
- Combine all items into a single string using `.join()`.

---

## 💡 Concept Explanation

An array method is called using dot notation right on the array name: `myArray.methodName()`.

### Adding and Removing from the End
- **`push(item)`**: Appends an item to the **very end** of the array.
- **`pop()`**: Removes and returns the **very last** item from the array.

```javascript
let queue = ["Zara", "Arjun"];
queue.push("Maya"); // queue is now ["Zara", "Arjun", "Maya"]
let servedPerson = queue.pop(); // removes "Maya", queue is ["Zara", "Arjun"]
```

### Adding and Removing from the Front
- **`unshift(item)`**: Adds an item to the **very beginning** (shifts everything else right).
- **`shift()`**: Removes and returns the **very first** item (shifts everything left).

```javascript
let students = ["Bob", "Charlie"];
students.unshift("Alice"); // ["Alice", "Bob", "Charlie"]
let firstStudent = students.shift(); // removes "Alice"
```

### Searching in Arrays
- **`includes(value)`**: Returns `true` if the item is present, otherwise `false`.
- **`indexOf(value)`**: Returns the numerical index of the item, or `-1` if not found.

```javascript
let animals = ["cat", "dog", "rabbit"];
console.log(animals.includes("dog")); // true
console.log(animals.includes("lion")); // false
console.log(animals.indexOf("rabbit")); // 2
console.log(animals.indexOf("tiger")); // -1
```

### Slicing and Joining
- **`slice(start, end)`**: Copies a piece of an array (from `start` up to, but not including, `end`) without modifying the original array!
- **`join(separator)`**: Glues all array items into a single string separated by your choice of character.

```javascript
let letters = ["J", "A", "V", "A"];
console.log(letters.join("")); // "JAVA"
console.log(letters.join("-")); // "J-A-V-A"
```

---

## 🌍 Real-World Example

Think of a **student’s Reading Bookmark List** — a list of book chapters saved to read later:
1. When you tap **“Read This Next”**, the chapter jumps to the front using `readingList.unshift(newChapter)`.
2. When you tap **“Add to End of List”**, it goes to the back using `readingList.push(newChapter)`.
3. When you finish the first chapter, it is removed from the front using `readingList.shift()`.
4. When checking if a chapter is already saved, the app runs `readingList.includes(chapterName)`.

---

## 💻 Code Example

A science club packs a field kit for a nature walk:

```javascript
let fieldKit = ["Safety Goggles", "Lab Notebook", "Magnifying Glass"];
console.log("Starting kit:", fieldKit);

// The team adds a thermometer to the end of the kit
fieldKit.push("Thermometer");
console.log("Added Thermometer:", fieldKit);

// The first item is handed to a lab partner
let lentItem = fieldKit.shift();
console.log("Lent to partner:", lentItem);
console.log("Current kit:", fieldKit);

// Check if the kit still has a Lab Notebook
if (fieldKit.includes("Lab Notebook")) {
    let notebookIndex = fieldKit.indexOf("Lab Notebook");
    console.log("Lab Notebook is in pocket slot:", notebookIndex);
}

// Turn the kit into one display string
let kitDisplay = fieldKit.join(" | ");
console.log("Kit label: [ " + kitDisplay + " ]");
```

Output:

```text
Starting kit: [ 'Safety Goggles', 'Lab Notebook', 'Magnifying Glass' ]
Added Thermometer: [ 'Safety Goggles', 'Lab Notebook', 'Magnifying Glass', 'Thermometer' ]
Lent to partner: Safety Goggles
Current kit: [ 'Lab Notebook', 'Magnifying Glass', 'Thermometer' ]
Lab Notebook is in pocket slot: 0
Kit label: [ Lab Notebook | Magnifying Glass | Thermometer ]
```

(A browser console shows arrays a little differently, for example `['Lab Notebook', 'Magnifying Glass', 'Thermometer']`.)

---

## 🔍 Line-by-Line Explanation

- `fieldKit.push("Thermometer");`: Adds `"Thermometer"` to the end of the array. The array size increases to 4.
- `let lentItem = fieldKit.shift();`: Removes the first item (`"Safety Goggles"`), shifts all remaining items left, and stores `"Safety Goggles"` in `lentItem`.
- `fieldKit.includes("Lab Notebook")`: Checks if `"Lab Notebook"` exists. Since it does, this gives `true`.
- `fieldKit.indexOf("Lab Notebook")`: Finds the index of `"Lab Notebook"`. It is now `0`, because the goggles were removed from the front.
- `fieldKit.join(" | ")`: Combines all items into `"Lab Notebook | Magnifying Glass | Thermometer"`.

---

## 🔮 Predict the Output

```javascript
let letters = ["A", "B", "C"];
letters.push("D");
letters.unshift("Z");
letters.pop();

console.log(letters);
console.log(letters.length);
```

*What will be printed?*

<details>
<summary>👀 Click to check your answer</summary>

```text
[ 'Z', 'A', 'B', 'C' ]
4
```

`push("D")` gives A, B, C, D. `unshift("Z")` puts Z at the front. `pop()` removes D from the end.

</details>

---

## 🧭 Think Like a Programmer: Mutating vs. Non-Mutating Methods

Some methods **change** (mutate) the original array, while others produce a fresh copy:
- **Mutating Methods:** `push()`, `pop()`, `shift()`, `unshift()`. (The original array changes size or contents).
- **Non-Mutating Methods:** `slice()`, `join()`, `includes()`. (The original array stays 100% untouched; they simply inspect or return a new value).
Always be mindful whether your method modifies your original data!

---

## 🚀 Coding Challenge

Write a function `cleanSpamWords(chatMessage, bannedWords)`:
- Convert the chat message into an array of words using `.split(" ")`. (`split` is a string method from Chapter 13. It cuts a sentence at every space and gives back an array of words.)
- For each word, check if it `.includes()` in `bannedWords`.
- If it is banned, replace the word with `"****"`.
- Use `.join(" ")` to return the cleaned sentence!

---

## 🛠️ Mini Project: Interactive To-Do List Simulator

Create a complete script that simulates a to-do manager:
- Has a `tasks` array: `["Do Homework", "Clean Room", "Walk Dog"]`.
- Has functions:
  1. `addTask(taskName)`
  2. `completeFirstTask()` (removes top task and prints it was done)
  3. `showTasks()` (prints tasks numbered 1, 2, 3...)
  4. `hasTask(taskName)`

Run a sequence of 4 commands to simulate adding, removing, and viewing tasks.

---

## ⚠️ Common Mistake

Find the 3 errors in this code:
```javascript
let scores = [90, 85, 78];
scores.push[100];
if (scores.includes = 85) {
    console.log("Score found!");
}
let topTwo = scores.slice(0; 2);
```

- **What happens**: JavaScript refuses to run any of it: `SyntaxError: missing ) after argument list`.
- **Error 1**: `scores.push[100]` uses square brackets. A method is called with round brackets: `scores.push(100)`.
- **Error 2**: `scores.includes = 85` uses `=`, which overwrites the method! Call it instead: `scores.includes(85)`.
- **Error 3**: `slice(0; 2)` uses a semicolon. Values passed to a method are separated by commas: `slice(0, 2)`.
- **Fix the code**:
  ```javascript
  let scores = [90, 85, 78];
  scores.push(100);
  if (scores.includes(85)) {
      console.log("Score found!");
  }
  let topTwo = scores.slice(0, 2);
  console.log(topTwo);
  ```
  Output: `Score found!` and then `[ 90, 85 ]`.

---

## ✍️ Try It

1. Open your console.
2. Create an empty array: `let toBuy = [];`
3. Add three items using `.push()`.
4. Check if `"Milk"` is in the list using `.includes("Milk")`.
5. Remove the last item with `.pop()`.
6. Print the remaining items using `.join(", ")`.

> 💡 **Hint:** `toBuy.push("Milk");` adds one item. `console.log(toBuy.includes("Milk"));` prints `true` or `false`. Finish with `console.log(toBuy.join(", "));`.

---

## 📝 Recap

- `push()` adds to end; `pop()` removes from end.
- `unshift()` adds to front; `shift()` removes from front.
- `includes()` returns `true` or `false`.
- `indexOf()` finds the position or returns `-1`.
- `slice()` copies a subset without changing the original.
- `join()` glues items into a string.

---

## 📖 Key Terms

- **Method:** A function that belongs to an object or data type.
- **Mutate:** To permanently modify the original data.
- **Queue:** A First-In-First-Out (FIFO) list (like a line at the canteen).
- **Stack:** A Last-In-First-Out (LIFO) pile (like a stack of plates).

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which method removes an item from the end of an array? Which removes one from the beginning?
2. What does `.indexOf()` give if the item is not in the array?

<details>
<summary>Show answer</summary>

1. `pop()` removes from the end. `shift()` removes from the beginning.
2. `-1`. No real item can be at index −1, so it is a clear "not found" signal you can check for.

</details>

### 🟡 Level 2: Apply
1. Given `let colors = ["Red", "Green", "Blue", "Yellow"];`, use `.slice()` to copy only `["Green", "Blue"]` into `middleColors`.
2. Patients wait in a queue at a clinic. Should you use `push()` with `shift()`, or `push()` with `pop()`? Why?

<details>
<summary>Show answer</summary>

1. ```javascript
   let middleColors = colors.slice(1, 3);
   console.log(middleColors);
   ```
   Output: `[ 'Green', 'Blue' ]`. The end index 3 is not included.
2. `push()` with `shift()`. New patients join at the back, and the first one to arrive is seen first (First In, First Out). `push()` with `pop()` would see the newest patient first, which is unfair.

</details>

### 🔴 Level 3: Challenge
Write a function `manageGuestList(guests, newGuest)` for a school science fair:
1. If `newGuest` is already in `guests`, print `"[Guest] is already invited!"`.
2. If not, add them with `.push()` and print `"[Guest] added to invitation list!"`.
3. Return the updated list.

<details>
<summary>Show one possible answer</summary>

```javascript
function manageGuestList(guests, newGuest) {
    if (guests.includes(newGuest)) {
        console.log(newGuest + " is already invited!");
    } else {
        guests.push(newGuest);
        console.log(newGuest + " added to invitation list!");
    }
    return guests;
}

let guests = ["Aisha", "Omar"];
manageGuestList(guests, "Omar");
manageGuestList(guests, "Layla");
console.log(guests);
```

Output:

```text
Omar is already invited!
Layla added to invitation list!
[ 'Aisha', 'Omar', 'Layla' ]
```

</details>

---

## ✅ Self-Assessment Checklist

- [ ] I can add items to both the front and back of an array.
- [ ] I can safely remove items using `pop()` and `shift()`.
- [ ] I know how to use `.includes()` in an `if` statement.
- [ ] I understand what `.join()` does.

---

## 🏡 Homework

1. Create an array of 5 planets. Add Pluto to the end, then remove it.
2. Write a program that checks if `"chocolate"` is on your grocery list. If not, add it to the front!
3. Take the array `["Learning", "JavaScript", "is", "awesome"]` and join it with spaces to make a full sentence.

---

## 🍎 Teacher Discussion Questions

1. Why is `.indexOf()` returning `-1` for missing items rather than `0`?
2. When would you prefer `.slice()` over modifying the original array directly?
