# Part 6: Arrays and Data
# Chapter 12: Array Methods — The Power Tools of Lists

---

## 1. Learning Objectives 🎯

By the end of this chapter, you will be able to:
- Add items to an array using `.push()` and `.unshift()`.
- Remove items from an array using `.pop()` and `.shift()`.
- Check if an item exists in a list using `.includes()`.
- Find the position of an item using `.indexOf()`.
- Extract a sub-portion of an array with `.slice()`.
- Combine all items into a single string using `.join()`.

---

## 2. Warm-Up Activity 🛒

Imagine shopping with a dynamic digital cart:
1. You click "Add to Cart" on a video game → The game pops onto the end of your list!
2. You decide you don't want the last item you added → You click "Remove Last Item"!
3. You search your cart: "Did I remember to add batteries?" → The app tells you "Yes!" or "No!".

JavaScript arrays have built-in **methods** (special built-in functions) that perform all these actions in just one line of code!

---

## 3. Concept Explanation 💡

An array method is called using dot notation right on the array name: `myArray.methodName()`.

### 1. Adding and Removing from the End:
- **`push(item)`**: Appends an item to the **very end** of the array.
- **`pop()`**: Removes and returns the **very last** item from the array.

```javascript
let queue = ["Zara", "Arjun"];
queue.push("Maya"); // queue is now ["Zara", "Arjun", "Maya"]
let servedPerson = queue.pop(); // removes "Maya", queue is ["Zara", "Arjun"]
```

### 2. Adding and Removing from the Front:
- **`unshift(item)`**: Adds an item to the **very beginning** (shifts everything else right).
- **`shift()`**: Removes and returns the **very first** item (shifts everything left).

```javascript
let students = ["Bob", "Charlie"];
students.unshift("Alice"); // ["Alice", "Bob", "Charlie"]
let firstStudent = students.shift(); // removes "Alice"
```

### 3. Searching in Arrays:
- **`includes(value)`**: Returns `true` if the item is present, otherwise `false`.
- **`indexOf(value)`**: Returns the numerical index of the item, or `-1` if not found.

```javascript
let animals = ["cat", "dog", "rabbit"];
console.log(animals.includes("dog")); // true
console.log(animals.includes("lion")); // false
console.log(animals.indexOf("rabbit")); // 2
console.log(animals.indexOf("tiger")); // -1
```

### 4. Slicing and Joining:
- **`slice(start, end)`**: Copies a piece of an array (from `start` up to, but not including, `end`) without modifying the original array!
- **`join(separator)`**: Glues all array items into a single string separated by your choice of character.

```javascript
let letters = ["J", "A", "V", "A"];
console.log(letters.join("")); // "JAVA"
console.log(letters.join("-")); // "J-A-V-A"
```

---

## 4. Real-World Example 🎵

Think of a Spotify music playlist:
1. When you select **"Play Next"**, it uses `playlist.unshift(newSong)`.
2. When you click **"Add to Queue"**, it uses `playlist.push(newSong)`.
3. When the song finishes playing, it is removed from the top using `playlist.shift()`.
4. When searching if a song is already saved in a playlist, it runs `playlist.includes(songName)`.

---

## 5. Code Example 💻

```javascript
let inventory = ["Potion", "Shield", "Wooden Sword"];
console.log("Starting Backpack:", inventory);

// Player finds a Magic Wand!
inventory.push("Magic Wand");
console.log("Found Magic Wand:", inventory);

// Player drinks a Potion from the front
let usedItem = inventory.shift();
console.log("Used item:", usedItem);
console.log("Current inventory:", inventory);

// Check if player has a Shield
if (inventory.includes("Shield")) {
    let shieldIndex = inventory.indexOf("Shield");
    console.log("Shield is ready at pocket slot:", shieldIndex);
}

// Convert inventory into an adventure log string
let inventoryDisplay = inventory.join(" | ");
console.log("Inventory HUD: [ " + inventoryDisplay + " ]");
```

---

## 6. Line-by-Line Explanation 🔍

- `inventory.push("Magic Wand");`: Adds `"Magic Wand"` to the end of the array. The array size increases to 4.
- `let usedItem = inventory.shift();`: Removes the first item (`"Potion"`), shifts all remaining items left, and stores `"Potion"` into `usedItem`.
- `inventory.includes("Shield")`: Checks if `"Shield"` exists. Since it does, this evaluates to `true`.
- `inventory.indexOf("Shield")`: Locates the index of `"Shield"` (which is now `0` because `"Potion"` was removed).
- `inventory.join(" | ")`: Combines all items into `"Shield | Wooden Sword | Magic Wand"`.

---

## 7. Try It Yourself 🚀

1. Open your console.
2. Create an empty array: `let toBuy = [];`
3. Add three items using `.push()`.
4. Check if `"Milk"` is in the list using `.includes("Milk")`.
5. Remove the last item with `.pop()`.
6. Print the remaining items using `.join(", ")`.

---

## 8. Practice Exercises 📝

### Level 1: Remember
Which method removes an item from the end of an array, and which removes from the beginning?

### Level 2: Understand
What does `.indexOf()` return if the item you are looking for is not in the array? Why is this helpful?

### Level 3: Apply
Given `let colors = ["Red", "Green", "Blue", "Yellow"];`, use `.slice()` to extract only `["Green", "Blue"]` into a new variable `middleColors`.

### Level 4: Think
If you have a queue of patients waiting for the dentist, should you use `push()` and `shift()`, or `push()` and `pop()`? Explain why (First In, First Out vs Last In, First Out).

### Level 5: Create ⭐
Write a function `manageGuestList(guests, newGuest)`:
- If `newGuest` is already in `guests`, print: `"[Guest] is already invited!"`
- If not, use `.push()` to add them and print: `"[Guest] added to invitation list!"`
- Return the updated guest list.

---

## 9. Predict the Output 🔮

```javascript
let letters = ["A", "B", "C"];
letters.push("D");
letters.unshift("Z");
letters.pop();

console.log(letters);
console.log(letters.length);
```
*What will be printed?*

---

## 10. Debug It 🐞

Find the 3 errors in this code:
```javascript
let scores = [90, 85, 78];
scores.push[100];
if (scores.includes = 85) {
    console.log("Score found!");
}
let topTwo = scores.slice(0; 2);
```

---

## 11. Think Like a Programmer 🧠: Mutating vs. Non-Mutating Methods

Some methods **change** (mutate) the original array, while others produce a fresh copy:
- **Mutating Methods:** `push()`, `pop()`, `shift()`, `unshift()`. (The original array changes size or contents).
- **Non-Mutating Methods:** `slice()`, `join()`, `includes()`. (The original array stays 100% untouched; they simply inspect or return a new value).
Always be mindful whether your method modifies your original data!

---

## 12. Coding Challenge ⭐

Write a function `cleanSpamWords(chatMessage, bannedWords)`:
- Convert the chat message into an array of words using `.split(" ")`.
- For each word, check if it `.includes()` in `bannedWords`.
- If it is banned, replace the word with `"****"`.
- Use `.join(" ")` to return the cleaned sentence!

---

## 13. Mini Project: Interactive To-Do List Simulator 📝

Create a complete script that simulates a to-do manager:
- Has a `tasks` array: `["Do Homework", "Clean Room", "Walk Dog"]`.
- Has functions:
  1. `addTask(taskName)`
  2. `completeFirstTask()` (removes top task and prints it was done)
  3. `showTasks()` (prints tasks numbered 1, 2, 3...)
  4. `hasTask(taskName)`

Run a sequence of 4 commands to simulate adding, removing, and viewing tasks.

---

## 14. Chapter Recap 📌

- `push()` adds to end; `pop()` removes from end.
- `unshift()` adds to front; `shift()` removes from front.
- `includes()` returns `true` or `false`.
- `indexOf()` finds the position or returns `-1`.
- `slice()` copies a subset without changing the original.
- `join()` glues items into a string.

---

## 15. Key Terms 📖

- **Method:** A function that belongs to an object or data type.
- **Mutate:** To permanently modify the original data.
- **Queue:** A First-In-First-Out (FIFO) list (like a line at the canteen).
- **Stack:** A Last-In-First-Out (LIFO) pile (like a stack of plates).

---

## 16. Self-Assessment Checklist ✅

- [ ] I can add items to both the front and back of an array.
- [ ] I can safely remove items using `pop()` and `shift()`.
- [ ] I know how to use `.includes()` in an `if` statement.
- [ ] I understand what `.join()` does.

---

## 17. Homework 📚

1. Create an array of 5 planets. Add Pluto to the end, then remove it.
2. Write a program that checks if `"chocolate"` is on your grocery list. If not, add it to the front!
3. Take the array `["Learning", "JavaScript", "is", "awesome"]` and join it with spaces to make a full sentence.

---

## 18. Teacher Discussion Questions 💬

1. Why is `.indexOf()` returning `-1` for missing items rather than `0`?
2. When would you prefer `.slice()` over modifying the original array directly?
