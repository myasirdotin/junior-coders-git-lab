# Chapter 10: Functions — Your Code Recipe Machine

---

## 🌟 Real-Life Story

Think about baking cupcakes or making a grilled cheese sandwich:
1. You have a recipe: "Bake at 180°C for 20 minutes".
2. You don't rewrite the recipe card every time you bake; you just follow the card whenever you want cupcakes.
3. If you want chocolate cupcakes instead of vanilla, you give the recipe a different ingredient: `flavour: "chocolate"`.

In programming, a **function** is exactly that: a reusable recipe card with a name and customizable ingredients!

---

## 🎯 What You Will Learn

By the end of this chapter, you will be able to:
- Understand what a function is and why programmers use them to keep code DRY (Don't Repeat Yourself).
- Declare functions using the `function` keyword, parameters, and curly braces.
- Call (invoke) functions with arguments.
- Return values from functions using the `return` statement and capture those results.
- Distinguish between global and local scope of variables.

---

## 💡 Concept Explanation

When building real programs, you often need to perform the exact same series of steps many times:
- Calculating the total bill with tax
- Checking if a student's new mark beat their last test mark
- Validating whether an email address has an `@` symbol

Writing the same 5 lines of code 20 times makes your program cluttered, hard to read, and dangerous to maintain. If there's a bug in one formula, you would have to fix it in 20 different places!

### The Two Steps of Functions
1. **Declaration (Creating the Recipe):** You teach JavaScript what the function does.
2. **Invocation / Calling (Cooking the Recipe):** You tell JavaScript to run the instructions right now.

```javascript
// 1. Declare
function greetStudent(studentName) {
    console.log("Welcome to class, " + studentName + "! 🎉");
}

// 2. Call
greetStudent("Amina");
greetStudent("Bilal");
```

### Parameters vs. Arguments
- **Parameter:** The placeholder variable name listed in the function definition (like `studentName`).
- **Argument:** The actual value passed in when calling the function (like `"Amina"` or `"Bilal"`).

### Return Values
A function can do work and send an answer back into your code using `return`:
```javascript
function addNumbers(a, b) {
    return a + b;
}

let sum = addNumbers(15, 25); // sum is now 40
```
> ⚠️ **Rule:** When JavaScript hits a `return` statement, it immediately exits the function. Any lines below `return` inside that function will never run!

---

## 🌍 Real-World Example

Imagine the volume slider on your phone:
Every time you press the "Volume Up" button, the phone doesn't reinvent the speaker system. It simply calls:
```javascript
changeVolume(1);
```
The function checks:
1. Is current volume + 1 <= 100?
2. If yes, increase volume by 1.
3. Update the visual bar on your screen.
4. Return the new volume level.

---

## 💻 Code Example

```javascript
// Reusable recipe to calculate final price with discount
function calculateDiscountPrice(itemPrice, discountPercentage) {
    let discountAmount = itemPrice * (discountPercentage / 100);
    let finalPrice = itemPrice - discountAmount;
    return finalPrice;
}

let shoePrice = 1200;
let bookPrice = 450;

let discountedShoes = calculateDiscountPrice(shoePrice, 15);
let discountedBook = calculateDiscountPrice(bookPrice, 20);

console.log("Original Shoe: Rs " + shoePrice + " -> Sale Price: Rs " + discountedShoes);
console.log("Original Book: Rs " + bookPrice + " -> Sale Price: Rs " + discountedBook);
```

Output:

```text
Original Shoe: Rs 1200 -> Sale Price: Rs 1020
Original Book: Rs 450 -> Sale Price: Rs 360
```

---

## 🔍 Line-by-Line Explanation

- `function calculateDiscountPrice(itemPrice, discountPercentage) {`: Declares a function named `calculateDiscountPrice` that accepts two parameters: `itemPrice` and `discountPercentage`.
- `let discountAmount = itemPrice * (discountPercentage / 100);`: Computes the currency value of the discount. This variable is *local* to this function.
- `let finalPrice = itemPrice - discountAmount;`: Subtracts the discount from the original price.
- `return finalPrice;`: Hands the computed total back to whoever called the function.
- `let discountedShoes = calculateDiscountPrice(shoePrice, 15);`: Invokes the function with `1200` and `15`. The returned result (`1020`) is stored into `discountedShoes`.
- `console.log(...)`: Prints the formatted string to the console.

---

## 🔮 Predict the Output

Look closely at this snippet:
```javascript
function mystery(x) {
    let result = x * 2;
    return result;
    result = result + 10; // Hint: notice where return is!
}

console.log(mystery(5));
```
*What will print: 10 or 20? Why?*

<details>
<summary>👀 Click to check your answer</summary>

**Answer: `10`.** `result` becomes 5 × 2 = 10, and `return result;` sends 10 back at once.
The line `result = result + 10;` sits after `return`, so it never runs.

</details>

---

## 🧭 Think Like a Programmer : Scope (Global vs. Local)

Imagine your bedroom (local scope) vs. the school hallway (global scope):
- If you leave your notebook in the school hallway, anyone in the school can see it and pick it up.
- If you leave your diary inside your closed bedroom at home, someone standing in the school cafeteria cannot see it!

Variables created inside `{ ... }` of a function are **locally scoped**—they are born when the function runs and disappear when it finishes. Keep your global scope clean so different parts of your code don't accidentally overwrite each other's variables!

---

## 🚀 Coding Challenge

Write a function `isEven(number)` that returns `true` if a number is even and `false` if it is odd (using `% 2 === 0`).
Then, write a loop that tests all numbers from 1 to 10 using your `isEven()` function and prints:
- `"1 is Odd"`
- `"2 is Even"`
...up to 10.

---

## 🛠️ Mini Project: Iftar Dinner Bill Splitter

Create a complete script with two functions:
1. `calculateTotalWithTax(subtotal, taxRate)`
2. `splitBill(totalAmount, numberOfGuests)`

Print a beautiful receipt:
```text
=== IFTAR GATHERING RECEIPT ===
Subtotal: Rs 1500
Tax (5%): Rs 75
Total Amount: Rs 1575
Guests Sharing: 5
Each Guest Pays: Rs 315
================================
```

---

## ⚠️ Common Mistake

A student wrote this function. JavaScript stopped at once with `SyntaxError: Unexpected token '['`.
Can you find the 3 errors?

```javascript
function sayHello[userName] (
    message = "Hello, " + userName;
    return message
)

sayHello "Zara";
```

- **Error 1**: Parameters go inside round brackets `( )`, not square brackets `[ ]`.
- **Error 2**: The function body goes inside curly braces `{ }`, not round brackets.
- **Error 3**: A call needs round brackets around the argument: `sayHello("Zara")`.
- **Also**: `message` was never created with `let`. Always declare a variable before using it.
- **Fix the code**:
  ```javascript
  function sayHello(userName) {
      let message = "Hello, " + userName;
      return message;
  }

  console.log(sayHello("Zara"));
  ```
  Output: `Hello, Zara`

---

## ✍️ Try It

1. Open your browser console or our interactive runner.
2. Type this simple function:
   ```javascript
   function cheer(team) {
       return "Go " + team + "! You can win this! 🏆";
   }
   console.log(cheer("Tigers"));
   console.log(cheer("Eagles"));
   ```
3. Modify it to accept both a `team` name and an `emoji`.

> 💡 **Hint:** Add a second parameter: `function cheer(team, emoji)`. Then join it on the end: `"Go " + team + "! " + emoji`. Call it with two arguments, like `cheer("Tigers", "🐯")`.

---

## 📝 Recap

- A function is a named block of reusable code.
- Declare with `function name(parameters) { ... }`.
- Call with `name(arguments)`.
- Use `return` to send an output value back.
- Code after `return` inside a function is ignored.
- Local variables exist only inside their parent function.

**Check yourself:**

- [ ] I can write a basic function without looking at notes.
- [ ] I know how to pass at least 2 arguments into a function.
- [ ] I understand why `return` is useful.
- [ ] I can explain what happens if I try to use a local variable outside its function.

---

## 📖 Key Terms

- **Function:** A reusable set of instructions with a specific name.
- **Invoke / Call:** Running a function.
- **Parameter:** Variable placeholder defined in the function signature.
- **Argument:** Real value supplied when calling the function.
- **Return:** Sends data back to the calling line and terminates function execution.
- **Scope:** The area of a program where a specific variable is accessible.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which keyword sends a value back out of a function?
2. What is the difference between a parameter and an argument?

<details>
<summary>Show answer</summary>

1. `return`
2. A **parameter** is the placeholder name in the function definition, like `studentName`. An **argument** is the real value you pass in when you call it, like `"Amina"`.

</details>

### 🟡 Level 2: Apply
Write a function `convertToFahrenheit(celsius)` that returns the temperature in Fahrenheit.
Use the formula F = (C × 9 ÷ 5) + 32. Test it with 100 and 37.

Extra: what happens if you create a variable with `let` inside a function and try to `console.log` it outside? Why?

<details>
<summary>Show answer</summary>

```javascript
function convertToFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

console.log(convertToFahrenheit(100));
console.log(convertToFahrenheit(37));
```

Output:

```text
212
98.6
```

Extra: you get `ReferenceError: ... is not defined`. The variable is **local**. It only exists inside the function while it runs.

</details>

### 🔴 Level 3: Challenge
Write a function `gradeStudent(marks)` that returns:
1. `"A+"` for 90 or above.
2. `"A"` for 80 to 89, `"B"` for 70 to 79, `"C"` for 60 to 69.
3. `"Needs Improvement"` below 60.
4. Test it with 5 different marks.

<details>
<summary>Show one possible answer</summary>

```javascript
function gradeStudent(marks) {
    if (marks >= 90) {
        return "A+";
    } else if (marks >= 80) {
        return "A";
    } else if (marks >= 70) {
        return "B";
    } else if (marks >= 60) {
        return "C";
    } else {
        return "Needs Improvement";
    }
}

console.log(gradeStudent(95));
console.log(gradeStudent(84));
console.log(gradeStudent(72));
console.log(gradeStudent(61));
console.log(gradeStudent(45));
```

Output:

```text
A+
A
B
C
Needs Improvement
```

</details>
