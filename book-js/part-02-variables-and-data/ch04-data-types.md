# Chapter 4: Data Types 🏷️🔢

---

## 1. 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- Identify and understand the 5 core primitive data types in JavaScript: **String**, **Number**, **Boolean**, **null**, and **undefined**.
- Use the `typeof` operator to inspect the type of any variable.
- Clearly explain the difference between `null` and `undefined`.
- Prevent common data-type conversion bugs.

---

## 2. ☀️ Warm-Up Activity: Sorting the Digital Desk

Look at these 6 items and sort them into piles of similar things:
`"Amina"` • `12` • `true` • `"blue"` • `95.5` • `false`

Notice what your brain did:
- `"Amina"` and `"blue"` are words / text.
- `12` and `95.5` are quantities / numbers.
- `true` and `false` are yes-or-no truth values!

JavaScript categorizes every single piece of information into these exact same distinct bins, called **Data Types**!

---

## 3. 💡 Concept Explanation

### The 5 Primitive Data Types in JavaScript

| Data Type | What It Stores | Real-World Example | JavaScript Example |
| :--- | :--- | :--- | :--- |
| **String** | Text characters wrapped in quotes | A person's name or address | `"Amina"`, `"Class 7"` |
| **Number** | Any number (positive, negative, whole, decimal) | Age, temperature, price | `12`, `95.5`, `-5` |
| **Boolean** | Only two possible states: `true` or `false` | Is the light switch on? | `true`, `false` |
| **null** | Intentionally empty ("Nothing on purpose") | Winner of a race not yet run | `let prizeWinner = null;` |
| **undefined** | A variable created, but no value has been put in it yet | An empty unassigned locker | `let seatNumber;` |

### The Detective Keyword: `typeof`
JavaScript gives you a built-in magnifying glass called `typeof` that reveals the exact data type of any value:

```javascript
console.log(typeof "Amina");   // prints: "string"
console.log(typeof 42);        // prints: "number"
console.log(typeof true);      // prints: "boolean"
console.log(typeof undefined); // prints: "undefined"
```

---

## 4. 🌍 Real-World Example: The Student ID Card

Look at your student ID badge:
- **Name ("Zara Chen")**: String.
- **Roll Number (24)**: Number.
- **Is Active Student? (true)**: Boolean.
- **Bus Locker Assignment**: `null` (because you walk to school and don't need a bus locker).
- **Graduation Honors**: `undefined` (because you haven't graduated Class 7 yet!).

---

## 5. 💻 Code Example: The Data Type Showcase

Type this into your scratchpad or editor:

```javascript
// 1. String: text in quotes
let studentName = "Ravi";

// 2. Number: whole or decimal
let marks = 88.5;

// 3. Boolean: true or false
let isPresent = true;

// 4. Null: intentionally empty
let prize = null;

// 5. Undefined: declared with no value yet
let houseNumber;

console.log("studentName is a:", typeof studentName);
console.log("marks is a:", typeof marks);
console.log("isPresent is a:", typeof isPresent);
console.log("houseNumber is:", typeof houseNumber);
```

---

## 6. 🔍 Line-by-Line Explanation

- Line 2: `"Ravi"` is enclosed in quotes, so its data type is `string`.
- Line 5: `88.5` has no quotes and represents a numeric quantity, so its type is `number`.
- Line 8: `isPresent = true;` does not have quotes! If you put quotes around `"true"`, it turns into a string!
- Line 14: `typeof houseNumber` returns `"undefined"` because the variable was declared (`let houseNumber;`) but never given a value.

---

## 7. ✍️ Try It Yourself

Open your console:
1. Type `typeof 100` -> Press Enter.
2. Type `typeof "100"` -> Press Enter.
3. Compare the two! Notice that `"100"` is a **string**, while `100` is a **number**! Even though they look the same to human eyes, JavaScript treats them completely differently!

---

## 8. 📝 Practice Exercises (5 Levels of Mastery)

### 🟢 Level 1 – Remember (Recall)
1. Match each value to its data type:
   - `"Tokyo"` ───> ?
   - `42` ───> ?
   - `false` ───> ?
   - `null` ───> ?
2. Multiple Choice: What does `typeof 7.5` return?
   - (a) `"string"`
   - (b) `"number"`
   - (c) `"decimal"`
   - (d) `"float"`

### 🔵 Level 2 – Understand (Comprehension)
3. Explain the difference between `null` and `undefined` in your own words using an analogy (like a box).
4. Why does JavaScript need different data types instead of treating everything as plain text?

### 🟡 Level 3 – Apply (Application)
5. Identify the appropriate data type for each of these:
   - Your school's name: `______`
   - Whether today is a school holiday: `______`
   - The price of a slice of pizza: `______`

### 🟣 Level 4 – Think (Analysis)
6. What will this line print, and why?
   ```javascript
   let secret;
   console.log(typeof secret);
   ```

### 🔴 Level 5 – Create ⭐ (Challenge)
7. Create five variables describing an imaginary dragon pet (name, wingspan, canBreatheFire, favoriteTreasure, secretPower). Use all 5 data types at least once, and log each variable alongside its `typeof`.

---

## 9. 🔮 Predict the Output

Look at this snippet:

```javascript
let gameScore = 100;
let hasWon = false;
console.log(typeof gameScore, typeof hasWon);
```

**Question**: What will appear on the screen?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> <code>number boolean</code> (separated by a space).
</details>

---

## 10. 🕵️ Debug It: The Imposter Boolean

A student wrote this code expecting a boolean, but got strange behavior:

```javascript
let isPresent = "true";
console.log(typeof isPresent);
```

- **Find the mistake**: Look closely at `"true"`!
- **Explain the mistake**: Quotation marks turn EVERYTHING into text! Because of the quotes, `isPresent` is a `string`, NOT a true `boolean`!
- **Fix the code**: Remove the quotes:
  ```javascript
  let isPresent = true;
  console.log(typeof isPresent); // Now correctly prints "boolean"
  ```

---

## 11. 🧭 Think Like a Programmer: Designing a Game Character

Imagine you are programming a role-playing video game character.
List the data type you would choose for:
- Character Name
- Health Points (HP)
- Has Shield Equipped?
- Current Quest (if none started yet, what value fits best?)

---

## 12. 🚀 Coding Challenge ⭐: The Type Inspector

Write a program that defines three variables: `a = 50;`, `b = "50";`, `c = true;`.
Print a comparison sentence using `console.log()` showing each value and its `typeof`.

---

## 13. 🛠️ Mini Project: The Data Type Detective

Create a program about your favorite video game:
- Variable 1: `gameTitle` (string)
- Variable 2: `maxPlayers` (number)
- Variable 3: `isMultiplayer` (boolean)
- Variable 4: `nextExpansionPack` (null - not released yet!)
- Variable 5: `secretCheatCode` (undefined)

Print each variable out formatted like a detective report:
```text
=== DATA TYPE DETECTIVE REPORT ===
Item: gameTitle | Value: Minecraft | Type: string
Item: maxPlayers | Value: 8 | Type: number
Item: isMultiplayer | Value: true | Type: boolean
Item: nextExpansionPack | Value: null | Type: object (JS historical quirk!)
Item: secretCheatCode | Value: undefined | Type: undefined
==================================
```

---

## 14. 📝 Chapter Recap

- Every piece of data in JavaScript has a specific **data type**.
- **Strings** store text wrapped in quotation marks.
- **Numbers** store numerical values for mathematical calculation.
- **Booleans** store binary state: `true` or `false`.
- **`null`** represents an intentional absence of value.
- **`undefined`** represents a variable that has not yet received a value.
- The `typeof` operator checks the data type of any variable.

---

## 15. 📖 Key Terms

| Term | What It Means |
| :--- | :--- |
| **Data Type** | A classification indicating what kind of value data can hold. |
| **String** | Text characters enclosed in single, double, or backtick quotes. |
| **Number** | Positive or negative numeric quantity including decimals. |
| **Boolean** | A binary data type representing `true` or `false`. |
| **`null`** | A special keyword representing the intentional absence of an object value. |
| **`undefined`** | The default state of a variable that has been declared without an assignment. |
| **`typeof`** | An operator returning a string indicating the type of the unevaluated operand. |

---

## 16. ✅ Self-Assessment Checklist

- [ ] I can list the 5 primitive data types from memory.
- [ ] I know why `"12"` is different from `12`.
- [ ] I know how to use the `typeof` keyword.
- [ ] I understand the difference between `null` and `undefined`.

---

## 17. 🏡 Homework

List ten facts about your family members or pets. Label each fact with its exact JavaScript data type (e.g., Mom's name = string, number of cousins = number, owns a bicycle = boolean).

---

## 18. 🍎 Teacher Discussion Questions

1. Ask students why numbers and text strings cannot simply be treated as one universal type. What happens if you try to subtract the word `"apple"` from `"banana"`?
2. Mention the famous JavaScript historical quirk: `typeof null` returns `"object"`. Discuss how early design bugs in 1995 have to stay in languages today so that old websites don't break!
