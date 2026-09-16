# Chapter 23: Classes & Objects (OOP) 🏛️🧱

---

## 1. 🌟 Real-Life Situation: The Architect's Blueprint

Imagine an architect designing a house:
- The architect sits at their drafting table and draws a detailed **Blueprint** on blue paper.
- The blueprint specifies: 3 bedrooms, 2 bathrooms, a front porch, a kitchen, and a front doorbell.
- You cannot sleep inside a paper blueprint! It is merely a plan.
- But from that **one single blueprint**, builders can construct **100 real physical houses** in a new suburban neighborhood.
- One house can be painted yellow with a red door; another can be painted white with a blue door. They share the same structure, but are distinct physical homes!

In computer science, this is the essence of **Object-Oriented Programming (OOP)**:
- A **Class** is the architectural Blueprint.
- An **Object** is the real, functioning house built from that blueprint!

---

## 2. 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- Define what Object-Oriented Programming is and why large codebases use it.
- Declare a class blueprint using the `class` keyword.
- Instantiate objects from a class using the `new` keyword.
- Define member properties (variables inside a class).
- Define member methods (functions inside a class).

---

## 3. 👁️ Visual Concept Explanation

### The Blueprint vs. Object Architecture

```text
    THE BLUEPRINT (Class)                  REAL HOUSES (Objects)
   ┌───────────────────────┐            ┌───────────────────────────┐
   │ class Student {       │            │ $student1 = new Student() │
   │   public $name;       │ ---------> │ $student1->name = "Ali"   │
   │   public $grade;      │            └───────────────────────────┘
   │   public function...  │            ┌───────────────────────────┐
   │ }                     │ ---------> │ $student2 = new Student() │
   └───────────────────────┘            │ $student2->name = "Sara"  │
                                        └───────────────────────────┘
```

### Procedural vs Object-Oriented Programming

| Concept | Procedural PHP | Object-Oriented PHP (OOP) |
| :--- | :--- | :--- |
| **Organization** | Standalone functions and scattered variables | Data and actions grouped together into objects |
| **Scalability** | Gets messy when projects exceed 20 files | Modular, clean, and easy to maintain in large teams |
| **Real-World Modeling** | Hard to represent complex entities | Natural representation of Users, Cars, Products |
| **Modern Frameworks** | Seldom used in enterprise development | The foundation of **Laravel**, **Symfony**, & **WordPress** |

---

## 4. 💻 Code Example: Creating Your First Class and Objects

```php
<?php
  // 1. Defining the Blueprint (Class)
  class Student {
    // Properties (State / Attributes)
    public $name;
    public $grade;
    public $houseColor;

    // Methods (Behavior / Actions)
    public function introduce() {
      return "Hello! My name is {$this->name}, and I am in Grade {$this->grade}.";
    }

    public function cheerForHouse() {
      return "Go House {$this->houseColor}!! 🏆";
    }
  }

  // 2. Instantiating the First Object
  $student1 = new Student();
  $student1->name = "Zainab Ali";
  $student1->grade = 9;
  $student1->houseColor = "Emerald Green";

  // 3. Instantiating a Second Object from the same Blueprint!
  $student2 = new Student();
  $student2->name = "Bilal Khan";
  $student2->grade = 9;
  $student2->houseColor = "Sapphire Blue";

  // 4. Calling Methods on the Objects
  echo "<h2>Student Introductions</h2>";
  echo "<p>" . $student1->introduce() . "</p>";
  echo "<p>" . $student1->cheerForHouse() . "</p>";

  echo "<hr>";

  echo "<p>" . $student2->introduce() . "</p>";
  echo "<p>" . $student2->cheerForHouse() . "</p>";
?>
```

---

## 5. 🔍 Code Explanation: Breaking It Down Line by Line

- `class Student { ... }`: Creates the blueprint. Class names conventionally begin with an uppercase letter in PascalCase.
- `public $name;`: Declares a **Property**. In OOP, variables belonging to a class are called properties.
- `public function introduce() { ... }`: Declares a **Method**. In OOP, functions belonging to a class are called methods.
- `$student1 = new Student();`: The `new` keyword instantiates a fresh, living object in server memory based on the `Student` blueprint.
- `->`: The **Object Operator** (arrow). Used to access properties and call methods on an object (e.g. `$student1->name`).

---

## 6. 🌍 Real-World Connection: Modern Web Frameworks

If you inspect modern PHP frameworks like **Laravel**:
- Every database table has a class: `class User extends Model`, `class Product extends Model`.
- To create a new user:
  ```php
  $user = new User();
  $user->name = "Hamza";
  $user->save();
  ```
- OOP is the language of professional software engineering!

---

## 7. ⚠️ Common Beginner Traps

1. **Using `$` after the arrow**:
   ```php
   $student1->$name = "Ali"; // ❌ Wrong! Variable variable lookup!
   $student1->name = "Ali";  // ✅ Correct! No $ after the arrow!
   ```
2. **Confusing Class with Object**:
   A class is just the code definition; an object is the actual instance holding real data in memory.

---

## 8. 🔮 Predict the Output

```php
<?php
  class Car {
    public $color = "Silver";
  }
  $car1 = new Car();
  $car2 = new Car();
  $car1->color = "Red";
  echo $car2->color;
?>
```

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> <code>Silver</code>! Changing <code>$car1</code>'s color does not affect <code>$car2</code>. They are completely separate objects!
</details>

---

## 9. 🕵️ Code Detective: The Broken Arrow

```php
<?php
  class Pet {
    public $name;
  }
  $myPet = new Pet();
  $myPet.name = "Rocky";
?>
```

- **Find the bug**: The developer used a dot `.` instead of an arrow `->`!
- **Explain**: JavaScript uses dots for objects (`pet.name`), but in PHP, dots are for string concatenation. PHP uses `->` for objects!
- **Fix**: `$myPet->name = "Rocky";`.

---

## 10. 🏆 5 Levels of Mastery Exercises

### 🟢 Level 1: Recall
1. What keyword defines a new class in PHP?
2. What keyword creates an object from a class blueprint?
3. What operator accesses methods and properties of an object?

### 🟡 Level 2: Understand
4. What is the difference between a property and a regular variable?
5. What is the difference between a method and a regular function?

### 🟠 Level 3: Apply
6. Create a `Book` class with properties `$title`, `$author`, and `$price`. Instantiate two different books and echo their summaries.

### 🔵 Level 4: Think & Troubleshoot
7. How does `var_dump($student1)` reveal the internal structure of an object?

### 🟣 Level 5: Create & Build
8. Build a Bank Account Class: define `BankAccount` with properties `$accountHolder` and `$balance`. Add methods `deposit($amount)`, `withdraw($amount)`, and `checkBalance()`. Test with multiple transactions!
