# Part 5: Functions
# Chapter 10: Functions — Your Code Recipe Machine

---

## 1. Learning Objectives 🎯

By the end of this chapter, you will be able to:
- Understand what a function is and why programmers use them to keep code DRY (Don't Repeat Yourself).
- Declare functions using the `function` keyword, parameters, and curly braces.
- Call (invoke) functions with arguments.
- Return values from functions using the `return` statement and capture those results.
- Distinguish between global and local scope of variables.

---

## 2. Warm-Up Activity 🍳

Think about baking cupcakes or making a grilled cheese sandwich:
1. You have a recipe: "Bake at 180°C for 20 minutes".
2. You don't rewrite the recipe card every time you bake; you just follow the card whenever you want cupcakes.
3. If you want chocolate cupcakes instead of vanilla, you give the recipe a different ingredient: `flavour: "chocolate"`.

In programming, a **function** is exactly that: a reusable recipe card with a name and customizable ingredients!

---

## 3. Concept Explanation 💡

When building real programs, you often need to perform the exact same series of steps many times:
- Calculating the total bill with tax
- Checking if a player's score beat the high score
- Validating whether an email address has an `@` symbol

Writing the same 5 lines of code 20 times makes your program cluttered, hard to read, and dangerous to maintain. If there's a bug in one formula, you would have to fix it in 20 different places!

### The Two Steps of Functions:
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

## 4. Real-World Example 📱

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

## 5. Code Example 💻

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

---

## 6. Line-by-Line Explanation 🔍

- `function calculateDiscountPrice(itemPrice, discountPercentage) {`: Declares a function named `calculateDiscountPrice` that accepts two parameters: `itemPrice` and `discountPercentage`.
- `let discountAmount = itemPrice * (discountPercentage / 100);`: Computes the currency value of the discount. This variable is *local* to this function.
- `let finalPrice = itemPrice - discountAmount;`: Subtracts the discount from the original price.
- `return finalPrice;`: Hands the computed total back to whoever called the function.
- `let discountedShoes = calculateDiscountPrice(shoePrice, 15);`: Invokes the function with `1200` and `15`. The returned result (`1020`) is stored into `discountedShoes`.
- `console.log(...)`: Prints the formatted string to the console.

---

## 7. Try It Yourself 🚀

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

---

## 8. Practice Exercises 📝

### Level 1: Remember
What keyword is used to send a value back out of a function?

### Level 2: Understand
What is the difference between a function parameter and a function argument?

### Level 3: Apply
Write a function `convertToFahrenheit(celsius)` that takes a temperature in Celsius and returns Fahrenheit using the formula:
`F = (C * 9 / 5) + 32`.

### Level 4: Think
What happens if you declare a variable with `let` inside a function and try to `console.log` it outside that function? Why?

### Level 5: Create ⭐
Write a function `gradeStudent(marks)`:
- 90 or above: returns `"A+"`
- 80 to 89: returns `"A"`
- 70 to 79: returns `"B"`
- 60 to 69: returns `"C"`
- Below 60: returns `"Needs Improvement"`
Test it with 5 different scores.

---

## 9. Predict the Output 🔮

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

---

## 10. Debug It 🐞

Find the 3 errors in this code:
```javascript
function sayHello[userName] (
    message = "Hello, " + userName;
    return message
)

sayHello "Zara";
```

---

## 11. Think Like a Programmer 🧠: Scope (Global vs. Local)

Imagine your bedroom (local scope) vs. the school hallway (global scope):
- If you leave your notebook in the school hallway, anyone in the school can see it and pick it up.
- If you leave your diary inside your closed bedroom at home, someone standing in the school cafeteria cannot see it!

Variables created inside `{ ... }` of a function are **locally scoped**—they are born when the function runs and disappear when it finishes. Keep your global scope clean so different parts of your code don't accidentally overwrite each other's variables!

---

## 12. Coding Challenge ⭐

Write a function `isEven(number)` that returns `true` if a number is even and `false` if it is odd (using `% 2 === 0`).
Then, write a loop that tests all numbers from 1 to 10 using your `isEven()` function and prints:
- `"1 is Odd"`
- `"2 is Even"`
...up to 10.

---

## 13. Mini Project: Pizza Party Bill Splitter 🍕

Create a complete script with two functions:
1. `calculateTotalWithTax(subtotal, taxRate)`
2. `splitBill(totalAmount, numberOfFriends)`

Print a beautiful receipt:
```text
=== PIZZA PALACE RECEIPT ===
Subtotal: Rs 1500
Tax (5%): Rs 75
Total Amount: Rs 1575
Friends Sharing: 5
Each Friend Pays: Rs 315
============================
```

---

## 14. Chapter Recap 📌

- A function is a named block of reusable code.
- Declare with `function name(parameters) { ... }`.
- Call with `name(arguments)`.
- Use `return` to send an output value back.
- Code after `return` inside a function is ignored.
- Local variables exist only inside their parent function.

---

## 15. Key Terms 📖

- **Function:** A reusable set of instructions with a specific name.
- **Invoke / Call:** Running a function.
- **Parameter:** Variable placeholder defined in the function signature.
- **Argument:** Real value supplied when calling the function.
- **Return:** Sends data back to the calling line and terminates function execution.
- **Scope:** The area of a program where a specific variable is accessible.

---

## 16. Self-Assessment Checklist ✅

- [ ] I can write a basic function without looking at notes.
- [ ] I know how to pass at least 2 arguments into a function.
- [ ] I understand why `return` is useful.
- [ ] I can explain what happens if I try to use a local variable outside its function.

---

## 17. Homework 📚

1. Write a function `calculateRectangleArea(width, height)` that returns the area.
2. Write a function `minutesToSeconds(minutes)` that returns total seconds.
3. Write a function `introduce(name, age, hobby)` that returns:
   `"Hi! I am [name], I am [age] years old, and I love [hobby]!"`

---

## 18. Teacher Discussion Questions 💬

1. Why do programmers say "Don't Repeat Yourself (DRY)"? What problems happen when people copy and paste code instead of using functions?
2. If you want to use the output of a function in another math calculation, why must you use `return` instead of just `console.log`?
