# Chapter 4: Data Types 🏷️

---

## 🌟 Real-Life Story

**Sorting the Digital Desk**

Look at these 6 items and sort them into piles of similar things:
`"Amina"` • `12` • `true` • `"blue"` • `95.5` • `false`

Notice what your brain did:
- `"Amina"` and `"blue"` are words / text.
- `12` and `95.5` are quantities / numbers.
- `true` and `false` are yes-or-no truth values!

JavaScript categorizes every single piece of information into these exact same distinct bins, called **Data Types**!

---

## 🎯 What You Will Learn

By the end of this chapter, you will be able to:
- Identify and understand the 5 core primitive data types in JavaScript: **String**, **Number**, **Boolean**, **null**, and **undefined**.
- Use the `typeof` operator to inspect the type of any variable.
- Clearly explain the difference between `null` and `undefined`.
- Prevent common data-type conversion bugs.

---

## 💡 Concept Explanation

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
console.log(typeof "Amina");   // prints: string
console.log(typeof 42);        // prints: number
console.log(typeof true);      // prints: boolean
console.log(typeof undefined); // prints: undefined
```

---

## 🌍 Real-World Example: The Student ID Card

Look at your student ID badge:
- **Name ("Zara Chen")**: String.
- **Roll Number (24)**: Number.
- **Is Active Student? (true)**: Boolean.
- **Bus Locker Assignment**: `null` (because you walk to school and don't need a bus locker).
- **Graduation Honors**: `undefined` (because you haven't graduated Class 7 yet!).

---

## 💻 Code Example: The Data Type Showcase

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

Output:

```text
studentName is a: string
marks is a: number
isPresent is a: boolean
houseNumber is: undefined
```

---

## 🔍 Line-by-Line Explanation

- Line 2: `"Ravi"` is enclosed in quotes, so its data type is `string`.
- Line 5: `88.5` has no quotes and represents a numeric quantity, so its type is `number`.
- Line 8: `isPresent = true;` does not have quotes! If you put quotes around `"true"`, it turns into a string!
- Lines 14 and 19: `typeof houseNumber` returns `"undefined"` because the variable was declared (`let houseNumber;`) but never given a value.

---

## 🔮 Predict the Output

Look at this snippet:

```javascript
let booksRead = 100;
let hasFinished = false;
console.log(typeof booksRead, typeof hasFinished);
```

**Question**: What will appear on the screen?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> <code>number boolean</code> (separated by a space).
</details>

---

## 🧭 Think Like a Programmer: Designing a Mars Rover

Imagine you are programming a robot rover that explores Mars.
List the data type you would choose for:
- Rover Name
- Battery Level (%)
- Has Camera Switched On?
- Current Mission (if none started yet, what value fits best?)

---

## 🚀 Coding Challenge: The Type Inspector

Write a program that defines three variables: `a = 50;`, `b = "50";`, `c = true;`.
Print a comparison sentence using `console.log()` showing each value and its `typeof`.

---

## 🛠️ Mini Project: The Data Type Detective

Create a program about a book in your school library:
- Variable 1: `bookTitle` (string)
- Variable 2: `pageCount` (number)
- Variable 3: `isAvailable` (boolean)
- Variable 4: `borrowedBy` (null - nobody has it right now!)
- Variable 5: `nextEdition` (undefined)

Print each variable out formatted like a detective report:
```text
=== DATA TYPE DETECTIVE REPORT ===
Item: bookTitle | Value: The Solar System | Type: string
Item: pageCount | Value: 120 | Type: number
Item: isAvailable | Value: true | Type: boolean
Item: borrowedBy | Value: null | Type: object (JS historical quirk!)
Item: nextEdition | Value: undefined | Type: undefined
==================================
```

---

## ⚠️ Common Mistake

**The Imposter Boolean**

A student wrote this code expecting a boolean. But the console printed `string`:

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

## ✍️ Try It

Open your console:
1. Type `typeof 100` -> Press Enter.
2. Type `typeof "100"` -> Press Enter.
3. Compare the two! Notice that `"100"` is a **string**, while `100` is a **number**! Even though they look the same to human eyes, JavaScript treats them completely differently!

> 💡 **Hint:** You should see `number` for the first one and `string` for the second. The quotation marks make the difference.

---

## 📝 Recap

- Every piece of data in JavaScript has a specific **data type**.
- **Strings** store text wrapped in quotation marks.
- **Numbers** store numerical values for mathematical calculation.
- **Booleans** store binary state: `true` or `false`.
- **`null`** represents an intentional absence of value.
- **`undefined`** represents a variable that has not yet received a value.
- The `typeof` operator checks the data type of any variable.

**Check yourself:**

- [ ] I can list the 5 primitive data types from memory.
- [ ] I know why `"12"` is different from `12`.
- [ ] I know how to use the `typeof` keyword.
- [ ] I understand the difference between `null` and `undefined`.

---

## 📖 Key Terms

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

## 🏆 Practice

### 🟢 Level 1: Recall
1. Name the data type of each value: `"Tokyo"`, `42`, `false`, `null`.
2. What does `typeof 7.5` return? (a) `"string"` (b) `"number"` (c) `"decimal"` (d) `"float"`

<details>
<summary>Show answer</summary>

1. `"Tokyo"` is a string, `42` is a number, `false` is a boolean, `null` is null (empty on purpose).
2. **(b)** `"number"`. JavaScript uses one type, number, for whole numbers and decimals.

</details>

### 🟡 Level 2: Apply
1. Choose a data type for each: your school's name; whether today is a school holiday; the price of a loaf of bread.
2. What will this print, and why?
   ```javascript
   let secret;
   console.log(typeof secret);
   ```

<details>
<summary>Show answer</summary>

1. School name: **string**. School holiday: **boolean** (`true` or `false`). Bread price: **number**.
2. It prints `undefined`. The box `secret` was made, but no value was ever put in it.

</details>

### 🔴 Level 3: Challenge
Describe a robot for the school science fair with five variables:
1. `robotName` (string), `armLength` (number), `canSortWaste` (boolean).
2. `prizeWon` (null, because judging has not happened yet).
3. `teamMotto` (undefined, because it has not been chosen yet).
4. Print each value next to its `typeof`.

<details>
<summary>Show one possible answer</summary>

```javascript
const robotName = "Sparky";        // string
const armLength = 35.5;            // number (cm)
const canSortWaste = true;         // boolean
const prizeWon = null;             // null: judging has not happened
let teamMotto;                     // undefined: not chosen yet

console.log(robotName, "->", typeof robotName);
console.log(armLength, "->", typeof armLength);
console.log(canSortWaste, "->", typeof canSortWaste);
console.log(prizeWon, "->", typeof prizeWon);
console.log(teamMotto, "->", typeof teamMotto);
```

Output:

```text
Sparky -> string
35.5 -> number
true -> boolean
null -> object
undefined -> undefined
```

`typeof null` gives `object`. This is an old JavaScript quirk (a mistake kept for safety). The value is still `null`.

</details>
