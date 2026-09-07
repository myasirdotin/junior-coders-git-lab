# Part 8: Objects
# Chapter 14: Objects — Modeling the Real World

---

## 1. Learning Objectives 🎯

By the end of this chapter, you will be able to:
- Explain what an object is and how it differs from an array.
- Create an object using key-value pairs inside curly braces `{}`.
- Access properties using Dot Notation (`object.key`) and Bracket Notation (`object["key"]`).
- Add, update, and delete properties on an object.
- Create nested objects and arrays of objects.
- Add methods (functions) inside objects.

---

## 2. Warm-Up Activity 🎮

Think about a character in a video game like Mario or Minecraft Steve:
A character isn't just a single number or a plain list. A character has distinct **attributes**:
- Name: "Steve"
- Health: 100
- Level: 5
- HasArmor: true
- Inventory: `["Pickaxe", "Torch", "Bread"]`

In programming, we bundle all these related traits into a single unit called an **Object**!

---

## 3. Concept Explanation 💡

An **Object** is a collection of key-value pairs (also called properties). While arrays store items by numerical order (`0, 1, 2`), objects store items by **meaningful names (keys)**.

### Creating an Object:
```javascript
let player = {
    name: "Alex",
    score: 350,
    isAlive: true,
    skills: ["archery", "crafting"]
};
```

### Accessing Properties:
1. **Dot Notation:** `object.key` (cleanest and most common):
   ```javascript
   console.log(player.name);  // "Alex"
   console.log(player.score); // 350
   ```
2. **Bracket Notation:** `object["key"]` (used when keys have spaces or are stored in variables):
   ```javascript
   console.log(player["isAlive"]); // true
   ```

### Modifying and Adding Properties:
```javascript
player.score = 500;       // Updates score
player.level = 2;         // Adds a brand new property!
delete player.isAlive;    // Removes a property
```

### Object Methods:
When an object has a function as a property, we call it a **Method**:
```javascript
let car = {
    brand: "Tesla",
    speed: 0,
    accelerate: function() {
        car.speed += 20;
        console.log(`Zoom! Speed is now ${car.speed} km/h`);
    }
};

car.accelerate(); // "Zoom! Speed is now 20 km/h"
```

---

## 4. Real-World Example 📖

Think of a library catalog card:
```javascript
let book = {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    pages: 309,
    isAvailable: true
};
```
When a student borrows the book, the library database simply sets:
`book.isAvailable = false;`

---

## 5. Code Example 💻

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

---

## 6. Line-by-Line Explanation 🔍

- `let classroom = [ ... ]`: An array containing three separate objects. Each object represents one student.
- `let student = classroom[i];`: Grabs the student object at index `i`.
- `student.mathScore`: Accesses the `mathScore` property using dot notation.
- `let average = totalScore / 2;`: Calculates the mean test mark.
- `` `Student: ${student.name} | Average Marks: ${average}%` ``: Injects the object's properties directly into a clean output string.

---

## 7. Try It Yourself 🚀

1. Open your console.
2. Create an object for your pet or a dream pet:
   ```javascript
   let pet = {
       name: "Biscuit",
       animal: "Golden Retriever",
       age: 3,
       favoriteToy: "Tennis Ball"
   };
   ```
3. Celebrate their birthday: `pet.age += 1;`
4. Add a new property: `pet.isVaccinated = true;`
5. Print: `console.log(`${pet.name} is now ${pet.age} years old!`);`

---

## 8. Practice Exercises 📝

### Level 1: Remember
In an object, what do we call the names on the left and the values on the right? (Hint: Key-____ pairs).

### Level 2: Understand
When must you use bracket notation (`person["first name"]`) instead of dot notation?

### Level 3: Apply
Create an object `smartphone` with keys `brand`, `model`, `batteryPercent`, and `storageGB`. Write code that decreases `batteryPercent` by 10.

### Level 4: Think
What is the difference between an Array of Objects `[{...}, {...}]` versus an Object with Arrays `{ friends: [...] }`? Give a real-life example of each.

### Level 5: Create ⭐
Create a `bankAccount` object with:
- `accountHolder: "Your Name"`
- `balance: 1000`
- `deposit: function(amount)` (adds to balance)
- `withdraw: function(amount)` (subtracts from balance if enough funds exist)
Test depositing 500 and withdrawing 200.

---

## 9. Predict the Output 🔮

```javascript
let movie = {
    title: "Spider-Man",
    year: 2002,
    rating: 8.5
};

let propertyToLookUp = "year";
console.log(movie.propertyToLookUp);
console.log(movie[propertyToLookUp]);
```
*What will the two console logs show? (Hint: does `movie` have a key named literal "propertyToLookUp"?)*

---

## 10. Debug It 🐞

Find the 3 errors in this code:
```javascript
let superhero = {
    name = "Flash",
    power: "Super Speed"
    isHero: true;
}

console.log(superhero->power);
```

---

## 11. Think Like a Programmer 🧠: Modeling Reality

Software engineering is about turning messy real-world problems into organized digital structures.
- Use an **Array** when the order matters and items are identical in kind (e.g., list of high scores: `[100, 95, 90]`).
- Use an **Object** when describing a single entity with diverse attributes (e.g., a person, a product, a spaceship).
- Combine them: An e-commerce store is an Array of Product Objects!

---

## 12. Coding Challenge ⭐

Write a function `findTopScorer(players)`:
- Takes an array of player objects: `[{ name: "A", score: 50 }, { name: "B", score: 85 }, { name: "C", score: 72 }]`.
- Finds the player with the highest score and returns their name and score!

---

## 13. Mini Project: RPG Game Character Sheet 🛡️

Build a character generator that defines:
```javascript
let hero = {
    name: "Sir Lancelot",
    class: "Knight",
    hp: 120,
    maxHp: 120,
    attackPower: 25,
    gold: 50,
    inventory: ["Iron Sword", "Health Potion"]
};
```
Write functions:
1. `takeDamage(damage)`: reduces hp. If hp <= 0, print "Hero has fallen!".
2. `heal(amount)`: increases hp up to maxHp.
3. `buyItem(item, cost)`: checks if gold >= cost, deducts gold, and pushes item to inventory.

---

## 14. Chapter Recap 📌

- Objects hold key-value pairs inside `{}`.
- Keys are strings; values can be any data type (including arrays or functions).
- Access values with `obj.key` or `obj["key"]`.
- Update with `obj.key = newValue`.
- Add new properties on the fly.
- Functions inside objects are called methods.

---

## 15. Key Terms 📖

- **Object:** A collection of labeled key-value data.
- **Property:** A single key-value pair.
- **Key:** The identifier/label for a property.
- **Value:** The data stored at a specific key.
- **Dot Notation:** Accessing a property using `.`
- **Bracket Notation:** Accessing a property using `[]` with a string or variable.
- **Method:** A function attached to an object.

---

## 16. Self-Assessment Checklist ✅

- [ ] I can create an object with at least 4 properties.
- [ ] I know how to access properties using dot notation.
- [ ] I can modify an existing property value.
- [ ] I can loop through an array of objects.

---

## 17. Homework 📚

1. Create a `recipe` object for your favorite dish with `name`, `prepTimeMinutes`, `ingredients` (array), and `servings`.
2. Write a loop that counts how many books in a library array are marked `isAvailable: true`.
3. Add a method `celebrateBirthday()` to a person object that increments their age by 1 and prints a birthday wish.

---

## 18. Teacher Discussion Questions 💬

1. Why is JSON (JavaScript Object Notation) the most popular format for data exchange across the entire internet today?
2. How do objects help make code self-documenting and easier for human teams to read?
