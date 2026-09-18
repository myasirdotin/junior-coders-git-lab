# Chapter 25: Class Inheritance (Extends) 🧬👨‍👩‍👧

---

## 1. 🌟 Real-Life Situation: Biological Inheritance

Think about your own family:
- You inherited traits from your parents: eye color, hair texture, height, and blood type.
- You didn't have to invent human DNA from scratch!
- However, you are also your own unique individual: you might play the violin, speak three languages, or build robots—skills that your parents never practiced.

In Object-Oriented Programming, **Inheritance** allows a child class to automatically inherit all properties and methods from a parent class:
- You write the foundational code once in a **Parent Class** (or Base Class).
- Specialized **Child Classes** (or Subclasses) inherit everything automatically and add their own specialized superpowers using the `extends` keyword!

---

## 2. 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- Create child subclasses that inherit from parent classes using `extends`.
- Understand the role of `protected` visibility in inheritance hierarchies.
- **Override** parent methods to provide specialized behavior in child classes.
- Call original parent methods from an overridden child method using `parent::`.
- Promote maximum code reuse and eliminate duplicate class logic.

---

## 3. 👁️ Visual Concept Explanation

### The Inheritance Family Tree

```text
                    ┌─────────────────────────┐
                    │      class Person       │  (Parent Class)
                    │  $name, $email          │
                    │  introduce()            │
                    └────────────┬────────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 │ extends                       │ extends
                 ▼                               ▼
  ┌─────────────────────────────┐ ┌─────────────────────────────┐
  │        class Student        │ │        class Teacher        │
  │  (Inherits name & email!)   │ │  (Inherits name & email!)   │
  │  $gradeLevel, $gpa          │ │  $subject, $salary          │
  │  study()                    │ │  gradeExam()                │
  └─────────────────────────────┘ └─────────────────────────────┘
```

---

## 4. 💻 Code Example: School Community Hierarchy

```php
<?php
  // 1. Base Parent Class
  class Person {
    public $name;
    public $email;

    public function __construct(string $name, string $email) {
      $this->name = $name;
      $this->email = $email;
    }

    public function getDetails(): string {
      return "{$this->name} ({$this->email})";
    }
  }

  // 2. Child Class: Student (Inherits Person)
  class Student extends Person {
    public $grade;
    public $gpa;

    public function __construct(string $name, string $email, int $grade, float $gpa) {
      // Call parent constructor to initialize inherited properties!
      parent::__construct($name, $email);
      $this->grade = $grade;
      $this->gpa = $gpa;
    }

    // Overriding getDetails() to add student specifics!
    public function getDetails(): string {
      return parent::getDetails() . " &bull; Grade: {$this->grade} (GPA: {$this->gpa})";
    }

    public function submitHomework(string $assignment): string {
      return "{$this->name} submitted '$assignment'.";
    }
  }

  // 3. Child Class: Teacher (Inherits Person)
  class Teacher extends Person {
    public $subject;

    public function __construct(string $name, string $email, string $subject) {
      parent::__construct($name, $email);
      $this->subject = $subject;
    }

    public function teachLesson(): string {
      return "{$this->name} is now teaching a lesson on {$this->subject}!";
    }
  }

  // Creating instances
  $student = new Student("Zainab Ali", "z.ali@srinagar.edu.in", 9, 3.95);
  $teacher = new Teacher("Mr. Yasir Rasool", "y.rasool@srinagar.edu.in", "Computer Science");

  echo "<h2>School Directory</h2>";
  echo "<p><strong>Student:</strong> " . $student->getDetails() . "</p>";
  echo "<p><em>" . $student->submitHomework("PHP Loops Lab") . "</em></p>";

  echo "<hr>";

  echo "<p><strong>Teacher:</strong> " . $teacher->getDetails() . "</p>";
  echo "<p><em>" . $teacher->teachLesson() . "</em></p>";
?>
```

---

## 5. 🔍 Code Explanation: Breaking It Down Line by Line

- `class Student extends Person`: Declares that `Student` is a child of `Person`. `Student` gets `$name`, `$email`, and `getDetails()` automatically!
- `parent::__construct(...)`: Uses the `parent::` scope resolution operator to invoke the parent class's constructor, ensuring base properties are properly initialized.
- **Method Overriding**: `Student` provides its own version of `getDetails()`. When called on a student, the child version runs!
- `parent::getDetails()`: Calls the parent's implementation first, then appends extra student-specific text.

---

## 6. 🌍 Real-World Connection: E-Commerce Product Catalogs

In stores like Amazon:
- Base class: `Product` (properties: `$id`, `$title`, `$price`, `$sku`).
- Subclasses:
  - `PhysicalProduct extends Product` (adds `$shippingWeight`, `$dimensions`).
  - `DigitalBook extends Product` (adds `$downloadUrl`, `$fileSizeBytes`).
- All products can be added to a cart using the common inherited `Product` methods!

---

## 7. ⚠️ Common Beginner Traps

1. **Multiple Inheritance Myth**:
   In PHP, a class can only extend **ONE** parent class (`class C extends A, B` is illegal!). For sharing logic across multiple branches, PHP provides **Traits** and **Interfaces**.
2. **Forgetting `parent::`**:
   If you override a parent method and forget to call `parent::method()`, the parent's original logic is completely bypassed.

---

## 8. 🔮 Predict the Output

```php
<?php
  class Animal {
    public function speak() { return "Generic sound"; }
  }
  class Dog extends Animal {
    public function speak() { return "Woof!"; }
  }
  $d = new Dog();
  echo $d->speak();
?>
```

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> <code>Woof!</code> Because the child class Dog overrides the parent speak() method!
</details>

---

## 9. 🕵️ Code Detective: The Broken Inheritance

```php
<?php
  class Vehicle {
    public $brand;
  }
  // Developer wanted Car to inherit Vehicle:
  class Car inherits Vehicle {
    public $wheels = 4;
  }
?>
```

- **Find the bug**: The keyword `inherits` is invalid in PHP!
- **Explain**: PHP uses the keyword `extends` for class inheritance.
- **Fix**: `class Car extends Vehicle`.

---

## 10. 🏆 5 Levels of Mastery Exercises

### 🟢 Level 1: Recall
1. What keyword is used in PHP to inherit from a parent class?
2. How do you call a parent class method from inside an overridden child method?
3. Can a PHP class extend more than one parent class simultaneously?

### 🟡 Level 2: Understand
4. What is "Method Overriding" and why is it useful?
5. How does inheritance help maintain the DRY principle?

### 🟠 Level 3: Apply
6. Create a base class `Shape` with property `$color` and method `describe()`. Create a child class `Circle extends Shape` with property `$radius` and method `calculateArea()`.

### 🔵 Level 4: Think & Troubleshoot
7. What does the `final` keyword do when placed in front of a class or method? (Hint: It prevents any child class from extending or overriding it!).

### 🟣 Level 5: Create & Build
8. Build a Role-Based User Permission System: create base class `User` with `$username`, `$email`. Create subclasses `AdminUser` (with method `deleteDatabase()`) and `GuestUser` (with read-only restrictions). Demonstrate polymorphic calls on an array of users!
