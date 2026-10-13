# Chapter 14: Objects — Modeling the Real World

---

## 🌟 Real-Life Story

Think about a robot rover exploring the surface of Mars:
A rover isn't just a single number or a plain list. A rover has distinct **attributes**:
- Name: "Explorer-1"
- Battery: 100
- Mission: 5
- HasCamera: true
- Tools: `["Drill", "Torch", "Thermometer"]`

In programming, we bundle all these related traits into a single unit called an **Object**!

---

## 🎯 What You Will Learn

By the end of this chapter, you will be able to:
- Explain what an object is and how it differs from an array.
- Create an object using key-value pairs inside curly braces `{}`.
- Access properties using Dot Notation (`object.key`) and Bracket Notation (`object["key"]`).
- Add, update, and delete properties on an object.
- Group objects inside arrays, and add methods (functions) to objects.

---

## 💡 Concept Explanation

An **Object** is a collection of key-value pairs (also called properties). While arrays store items by numerical order (`0, 1, 2`), objects store items by **meaningful names (keys)**.

### Creating an Object
```javascript
let student = {
    name: "Alex",
    marks: 350,
    isPresent: true,
    clubs: ["robotics", "gardening"]
};
```

### Accessing Properties
1. **Dot Notation:** `object.key` (cleanest and most common):
   ```javascript
   console.log(student.name);  // Alex
   console.log(student.marks); // 350
   ```
2. **Bracket Notation:** `object["key"]` (used when keys have spaces or are stored in variables):
   ```javascript
   console.log(student["isPresent"]); // true
   ```

### Modifying and Adding Properties
```javascript
student.marks = 380;      // Updates marks
student.house = "Green";  // Adds a brand new property!
delete student.isPresent; // Removes a property
```

### Object Methods
When an object has a function as a property, we call it a **Method**:
```javascript
let bus = {
    route: "Route 7",
    speed: 0,
    speedUp: function() {
        bus.speed += 20;
        console.log(`Speed is now ${bus.speed} km/h`);
    }
};

bus.speedUp(); // Speed is now 20 km/h
```

---

## 🌍 Real-World Example

Think of a library catalog card:
```javascript
let book = {
    title: "Charlotte's Web",
    author: "E.B. White",
    pages: 192,
    isAvailable: true
};
```
When a student borrows the book, the library database simply sets:
`book.isAvailable = false;`

---

## 💻 Code Example

```javascript
// Array of student objects
let classroom = [
    { name: "Sara", grade: 7, mathScore: 92, englishScore: 88 },
    { name: "Zayd", grade: 7, mathScore: 78, englishScore: 84 },
    { name: "Pooja", grade: 7, mathScore: 95, englishScore: 96 }
];

console.log("Class Roster Report:");
for (let i = 0; i < classroom.length; i++) {
    let student = classroom[i];
    let totalScore = student.mathScore + student.englishScore;
    let average = totalScore / 2;
    console.log(`Student: ${student.name} | Average Marks: ${average}%`);
}
```

Output:

```text
Class Roster Report:
Student: Sara | Average Marks: 90%
Student: Zayd | Average Marks: 81%
Student: Pooja | Average Marks: 95.5%
```

---

## 🔍 Line-by-Line Explanation

- `let classroom = [ ... ]`: An array containing three separate objects. Each object represents one student.
- `let student = classroom[i];`: Grabs the student object at index `i`.
- `student.mathScore`: Accesses the `mathScore` property using dot notation.
- `let average = totalScore / 2;`: Calculates the mean test mark.
- `` `Student: ${student.name} | Average Marks: ${average}%` ``: Injects the object's properties directly into a clean output string.

---

## 🔮 Predict the Output

```javascript
let documentary = {
    title: "Wonders of the Ocean",
    year: 2022,
    rating: 9.2
};

let propertyToLookUp = "year";
console.log(documentary.propertyToLookUp);
console.log(documentary[propertyToLookUp]);
```
*What will the two console logs show? (Hint: does `documentary` have a key named literal "propertyToLookUp"?)*

<details>
<summary>👀 Click to check your answer</summary>

```text
undefined
2022
```

Dot notation looks for a key literally called `propertyToLookUp`, and there is none. Bracket notation first reads the variable (`"year"`), then looks up that key.

</details>

---

## 🧭 Think Like a Programmer: Modeling Reality

Software engineering is about turning messy real-world problems into organized digital structures.
- Use an **Array** when the order matters and items are identical in kind (e.g., a list of test marks: `[100, 95, 90]`).
- Use an **Object** when describing a single entity with diverse attributes (e.g., a person, a product, a spaceship).
- Combine them: An e-commerce store is an Array of Product Objects!

---

## 🚀 Coding Challenge

Your school houses collected books for a charity book drive. Write a function `findTopCollector(houses)`:
- Takes an array of house objects: `[{ name: "Red House", books: 50 }, { name: "Blue House", books: 85 }, { name: "Green House", books: 72 }]`.
- Finds the house that collected the most books and returns its name and total!

---

## 🛠️ Mini Project: Mars Rover Control Sheet

Build a rover control program that defines:
```javascript
let rover = {
    name: "Explorer-1",
    team: "Science Club",
    battery: 120,
    maxBattery: 120,
    speed: 25,
    credits: 50,
    samples: ["Red Rock", "Dust Jar"]
};
```
Write functions:
1. `useEnergy(amount)`: reduces battery. If battery <= 0, print "Rover needs recharging!".
2. `recharge(amount)`: increases battery up to maxBattery.
3. `collectSample(sample, cost)`: checks if credits >= cost, deducts credits, and pushes sample to samples.

---

## ⚠️ Common Mistake

Find the 3 errors in this code:
```javascript
let robot = {
    name = "Helper-Bot",
    power: "Solar Energy"
    isWorking: true;
}

console.log(robot->power);
```

- **What happens**: JavaScript stops at once with `SyntaxError: Invalid shorthand property initializer`.
- **Error 1**: Inside an object, keys and values are joined with a colon `:`, not `=`.
- **Error 2**: Properties are separated by commas. A comma is missing after `"Solar Energy"`, and `isWorking: true;` has a semicolon instead.
- **Error 3**: JavaScript reads properties with a dot (`robot.power`), not an arrow `->`.
- **Fix the code**:
  ```javascript
  let robot = {
      name: "Helper-Bot",
      power: "Solar Energy",
      isWorking: true
  };

  console.log(robot.power);
  ```
  Output: `Solar Energy`

---

## ✍️ Try It

1. Open your console.
2. Create an object for a class pet:
   ```javascript
   let pet = {
       name: "Biscuit",
       animal: "Rabbit",
       age: 3,
       favoriteFood: "Carrots"
   };
   ```
3. Celebrate its birthday: `pet.age += 1;`
4. Add a new property: `pet.isVaccinated = true;`
5. Print a sentence about it:
   ```javascript
   console.log(`${pet.name} is now ${pet.age} years old!`);
   ```

> 💡 **Hint:** You should see `Biscuit is now 4 years old!`. Type `pet` on its own and press Enter to see every property, including the new `isVaccinated`.

---

## 📝 Recap

- Objects hold key-value pairs inside `{}`.
- Keys are strings; values can be any data type (including arrays or functions).
- Access values with `obj.key` or `obj["key"]`.
- Update with `obj.key = newValue`.
- Add new properties on the fly.
- Functions inside objects are called methods.

**Check yourself:**

- [ ] I can create an object with at least 4 properties.
- [ ] I know how to access properties using dot notation.
- [ ] I can modify an existing property value.
- [ ] I can loop through an array of objects.

---

## 📖 Key Terms

- **Object:** A collection of labeled key-value data.
- **Property:** A single key-value pair.
- **Key:** The identifier/label for a property.
- **Value:** The data stored at a specific key.
- **Dot Notation:** Accessing a property using `.`
- **Bracket Notation:** Accessing a property using `[]` with a string or variable.
- **Method:** A function attached to an object.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. In an object, what do we call the names on the left and the values on the right? (Key-____ pairs.)
2. When must you use bracket notation (`person["first name"]`) instead of dot notation?

<details>
<summary>Show answer</summary>

1. Key-**value** pairs.
2. When the key has a space or a dash in it, or when the key name is stored in a variable.

</details>

### 🟡 Level 2: Apply
1. Create an object `tablet` with keys `brand`, `model`, `batteryPercent` and `storageGB`. Then lower `batteryPercent` by 10.
2. What is the difference between an array of objects `[{...}, {...}]` and an object with an array `{ subjects: [...] }`? Give a real-life example of each.

<details>
<summary>Show answer</summary>

1. ```javascript
   let tablet = { brand: "Example", model: "S1", batteryPercent: 80, storageGB: 128 };
   tablet.batteryPercent -= 10;
   console.log(tablet.batteryPercent);
   ```
   Output: `70`
2. An **array of objects** is a list of many similar things, like every student in a class. An **object with an array** is one thing that has a list inside it, like one student with a list of subjects.

</details>

### 🔴 Level 3: Challenge
Create a `charityFund` object:
1. `fundName: "Clean Water Initiative"` and `balance: 1000`.
2. A `deposit(amount)` method that adds a donation to the balance.
3. A `withdraw(amount)` method that spends money on relief only if there is enough.
4. Test a deposit of 500, a withdrawal of 200, and a withdrawal that is too big.

<details>
<summary>Show one possible answer</summary>

```javascript
let charityFund = {
    fundName: "Clean Water Initiative",
    balance: 1000,
    deposit: function(amount) {
        charityFund.balance += amount;
        console.log(`Donation received: Rs ${amount}. Balance: Rs ${charityFund.balance}`);
    },
    withdraw: function(amount) {
        if (amount <= charityFund.balance) {
            charityFund.balance -= amount;
            console.log(`Spent on relief: Rs ${amount}. Balance: Rs ${charityFund.balance}`);
        } else {
            console.log("Not enough funds for this request.");
        }
    }
};

charityFund.deposit(500);
charityFund.withdraw(200);
charityFund.withdraw(5000);
```

Output:

```text
Donation received: Rs 500. Balance: Rs 1500
Spent on relief: Rs 200. Balance: Rs 1300
Not enough funds for this request.
```

</details>
