# Reference & Glossary
# Quick Reference Cheat Sheet and JavaScript Dictionary 📖

---

## 1. Syntax Cheat Sheet ⚡

### Variables
```javascript
let score = 0;       // Can be reassigned
const PI = 3.14159;  // Cannot be reassigned
var legacy = "old";  // Avoid in modern code
```

### Data Types
- **String:** `"Hello"`, `'Class 7'`, `` `Score: ${x}` ``
- **Number:** `42`, `3.14`, `-10`
- **Boolean:** `true`, `false`
- **Undefined:** Variable declared without a value
- **Null:** Intentional absence of value
- **Object:** `{ name: "Maya", age: 12 }`
- **Array:** `["apple", "banana", "cherry"]`

### Operators
- **Math:** `+`, `-`, `*`, `/`, `%` (remainder), `**` (exponent)
- **Comparison:** `===` (strict equal), `!==` (strict not equal), `>`, `<`, `>=`, `<=`
- **Logical:** `&&` (AND), `||` (OR), `!` (NOT)
- **Assignment:** `=`, `+=`, `-=`, `*=`, `++`, `--`

### Conditionals
```javascript
if (score >= 90) {
    grade = "A";
} else if (score >= 75) {
    grade = "B";
} else {
    grade = "C";
}
```

### Loops
```javascript
// for loop
for (let i = 0; i < 5; i++) {
    console.log(i);
}

// while loop
while (condition) {
    // code
}
```

### Functions
```javascript
function greet(name) {
    return `Hello, ${name}!`;
}
```

### DOM Manipulation
```javascript
let el = document.getElementById("title");
let btn = document.querySelector(".btn-submit");

el.textContent = "New Heading";
el.style.color = "blue";
el.classList.add("active");

btn.addEventListener("click", function() {
    alert("Clicked!");
});
```

---

## 2. A to Z JavaScript Glossary for Class 7 📚

- **Algorithm:** A step-by-step set of rules or instructions to solve a problem.
- **Argument:** An actual value passed into a function when calling it.
- **Array:** An ordered list of values accessed by zero-based numerical index.
- **Boolean:** A binary data type that can only be `true` or `false`.
- **Bug:** An error, flaw, or mistake in a computer program that causes unexpected behavior.
- **Callback:** A function given to another function or event listener to be called when an action occurs.
- **CamelCase:** A naming convention where the first word is lowercase and each following word starts with a capital letter (e.g., `studentName`, `calculateTotalScore`).
- **Concatenation:** Joining two or more strings end-to-end (using `+`).
- **Condition:** An expression evaluated to either `true` or `false` to control code flow.
- **Constant (`const`):** A variable whose assigned identifier cannot be changed.
- **Data Type:** The classification of a value (e.g., String, Number, Boolean).
- **Debugging:** The process of finding, analyzing, and fixing bugs.
- **Decomposition:** Breaking a large, complicated problem into small, manageable pieces.
- **DOM (Document Object Model):** The tree structure representing HTML elements that JavaScript can interact with.
- **Element:** An individual HTML tag or component in an array.
- **Event:** A signal from the browser that something happened (like a click or keypress).
- **Event Listener:** Code that waits for a specific event and runs a function when it occurs.
- **Function:** A reusable, named block of code that performs a specific action.
- **Index:** The position number of an item in a string or array (starts at 0).
- **Infinite Loop:** A loop whose terminating condition is never reached, freezing the computer.
- **Interpolation:** Injecting variables directly into strings using template literals `${var}`.
- **Iteration:** Repeating a block of code one time inside a loop.
- **JSON:** JavaScript Object Notation; lightweight data format used across the internet.
- **Key-Value Pair:** The format used in objects to store properties (`key: value`).
- **Method:** A function that belongs to an object or data type (e.g., `array.push()`).
- **NaN:** "Not-a-Number"; returned when an invalid math conversion is attempted.
- **Null:** A special value representing nothing or intentionally empty data.
- **Object:** A collection of labeled properties and methods enclosed in `{}`.
- **Parameter:** A variable name in a function declaration that accepts inputs.
- **Parse:** To analyze text and convert it into another data format (e.g., `parseInt()`).
- **Property:** A named piece of data belonging to an object.
- **Pseudocode:** Plain-English informal notes describing an algorithm before writing real code.
- **Return:** A statement that outputs a value from a function and ends its execution.
- **Scope:** The area of a program where a specific variable is visible and accessible.
- **String:** Text data enclosed in quotes.
- **Syntax:** The grammatical and structural rules of a programming language.
- **Undefined:** The default value of a variable that has been declared but never assigned.
- **Variable:** A named container in memory used to store data.
