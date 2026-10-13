# Chapter 26: Class Inheritance (Extends)

---

## 🌟 Real-Life Story

Think about your own family. You may have your mother's eyes or your father's height; you did not have to invent them yourself. Yet you are also your own person: you might speak three languages or build robots, which your parents never did. Classes can work the same way. A **child class** receives everything from a **parent class** and then adds its own extra skills.

---

## 🎯 What You Will Learn

- Create a child class that inherits from a parent class with `extends`.
- Use `protected` so a child class can use a parent's data while outside code cannot.
- **Override** a parent method to give a child class its own version.
- Call the parent's version from inside the child with `parent::`.

---

## Visual Concept Explanation

**Inheritance** means one class receives all the properties and methods of another. The class that gives is the **parent** (or *base class*). The class that receives is the **child** (or *subclass*). You write shared code once, in the parent.

### The Inheritance Family Tree

```text
        ┌──────────────────┐
        │  class Person    │  parent
        │  $name, $email   │
        │  getDetails()    │
        └────────┬─────────┘
       extends   │   extends
       ┌─────────┴─────────┐
       v                   v
┌──────────────┐   ┌──────────────┐
│class Student │   │class Teacher │
│+ $grade      │   │+ $subject    │
│+ submit...() │   │+ teach...()  │
└──────────────┘   └──────────────┘
  child: gets $name, $email and
  getDetails() for free
```

### Overriding and `parent::`

If a child class writes a method with the **same name** as the parent's method, the child's version wins. This is called **overriding**.

Inside the child, `parent::methodName()` still calls the parent's original version. The `::` is called the **scope resolution operator**; here it means "the method that belongs to the parent class".

---

## Code Example: School Community Hierarchy

```php
<?php
  // 1. Parent class
  class Person {
    public $name;
    public $email;

    public function getDetails(): string {
      return "{$this->name} ({$this->email})";
    }
  }

  // 2. Child class: Student
  class Student extends Person {
    public $grade;

    // Override: same name as the parent's method
    public function getDetails(): string {
      return parent::getDetails() . ", Grade {$this->grade}";
    }

    public function submitHomework(string $assignment): string {
      return "{$this->name} submitted '$assignment'.";
    }
  }

  // 3. Child class: Teacher
  class Teacher extends Person {
    public $subject;

    public function teachLesson(): string {
      return "{$this->name} is teaching {$this->subject}.";
    }
  }

  $student = new Student();
  $student->name = "Zainab Ali";
  $student->email = "zainab@example.org";
  $student->grade = 9;

  $teacher = new Teacher();
  $teacher->name = "Mr. Idris";
  $teacher->email = "idris@example.org";
  $teacher->subject = "Computer Science";

  echo "Student: " . $student->getDetails() . "\n";
  echo $student->submitHomework("PHP Loops Lab") . "\n";
  echo "Teacher: " . $teacher->getDetails() . "\n";
  echo $teacher->teachLesson() . "\n";
?>
```

Output:

```text
Student: Zainab Ali (zainab@example.org), Grade 9
Zainab Ali submitted 'PHP Loops Lab'.
Teacher: Mr. Idris (idris@example.org)
Mr. Idris is teaching Computer Science.
```

Notice that `Teacher` did not override `getDetails()`, so it uses the parent's version unchanged.

---

## Code Explanation: Breaking It Down Line by Line

- `class Student extends Person`: `Student` is a child of `Person`. It gets `$name`, `$email` and `getDetails()` automatically.
- `public function getDetails()` inside `Student`: **Overrides** the parent's method. For a student, this version runs.
- `parent::getDetails()`: Runs the parent's original method first, then the child adds `", Grade 9"`.
- `class Teacher extends Person`: A second child of the same parent. It adds `$subject` and `teachLesson()`.
- `$teacher->getDetails()`: `Teacher` has no own version, so PHP uses the one from `Person`.

### Where `protected` Fits

In Chapter 25 you met `protected`. Now it makes sense:

```php
<?php
class Member {
  protected $cardNumber = "LIB-0042";
}
class JuniorMember extends Member {
  public function showCard(): string {
    return "Card: " . $this->cardNumber;
  }
}
$m = new JuniorMember();
echo $m->showCard();
```

Output:

```text
Card: LIB-0042
```

The child can use `$cardNumber`. Outside code still cannot: `echo $m->cardNumber;` stops with `Cannot access protected property`. If it were `private`, even the child could not use it.

---

## 🌍 Real-World Connection: Online Bookshop Catalogue

An online bookshop might organise its products like this:
- Parent class: `Product` with `$title`, `$price` and a method to add it to the basket.
- `PrintedBook extends Product` adds `$weight` for posting.
- `EBook extends Product` adds `$fileSize` for downloading.

Every product can go in the basket, because the basket method lives once in `Product`.

---

## 🔮 Predict the Output

```php
<?php
  class Bird {
    public function move() { return "Flying"; }
  }
  class Penguin extends Bird {
    public function move() { return "Swimming"; }
  }
  $p = new Penguin();
  echo $p->move();
?>
```

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> <code>Swimming</code>. The child class <code>Penguin</code> overrides the parent's <code>move()</code> method, so the child's version runs.
</details>

---

## 🕵️ Code Detective: The Broken Inheritance

```php
<?php
  class Vehicle {
    public $brand;
  }
  class Bus inherits Vehicle {
    public $seats = 40;
  }
?>
```

PHP stops with: `Parse error: syntax error, unexpected identifier "inherits", expecting "{"`.

- **Find the bug**: `inherits` is not a PHP keyword.
- **Explain**: PHP uses `extends` for inheritance.
- **Fix**: `class Bus extends Vehicle`.

---

## ⚠️ Common Mistake

**Trying to extend two parents at once.**

- ❌ *Wrong*:
  ```php
  class Monitor extends Student, Teacher { }
  ```
- 😕 *What happens*: PHP stops with a parse error. In PHP a class can extend only **one** parent.
- ✅ *Fixed*: Choose one parent, and add the extra properties and methods in the child:
  ```php
  class Monitor extends Student {
    public $duty = "Library";
  }
  ```

A second mistake: overriding a method and forgetting `parent::`. Then the parent's original work is skipped completely. Call `parent::method()` when you want to **add to** the parent's work rather than replace it.

---

## ✍️ Try It

Open the [PHP Console](../studios/php-console/) and type:

```php
<?php
class Plant {
  public $name;
  public function care(): string {
    return "Water the {$this->name}.";
  }
}
class Cactus extends Plant {
  public function care(): string {
    return parent::care() . " Only once a week!";
  }
}
$c = new Cactus();
$c->name = "cactus";
echo $c->care();
```

Output:

```text
Water the cactus. Only once a week!
```

*Hint*: Delete `parent::care() . ` from the `Cactus` class. What changes in the output? Then make a `Fern extends Plant` with no `care()` method of its own.

---

## 📝 Recap

- `class Child extends ParentClass` gives the child all the parent's properties and methods.
- A child can add new properties and methods of its own.
- A method with the same name in the child **overrides** the parent's method.
- `parent::method()` calls the parent's original version from inside the child.
- `protected` data can be used by child classes but not by outside code.
- A PHP class can extend only one parent.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which keyword makes a class inherit from another?
2. How do you call a parent's method from inside an overriding child method?
3. Can a PHP class extend two parent classes?

<details>
<summary>Show answer</summary>

1. `extends`
2. `parent::methodName()`
3. No. A PHP class extends at most **one** parent.

</details>

### 🟡 Level 2: Apply
1. What is method overriding, and why is it useful?
2. Make a parent class `Shape` with `$color` and a method `describe()`. Make `Circle extends Shape` with `$radius` and a method `area()` that returns 3.14 × radius × radius.

<details>
<summary>Show answer</summary>

1. Overriding means a child class writes its own version of a parent's method, with the same name. It lets each child behave in its own way while sharing everything else.
2. One way:
   ```php
   <?php
   class Shape {
     public $color;
     public function describe(): string {
       return "A {$this->color} shape.";
     }
   }
   class Circle extends Shape {
     public $radius;
     public function area(): float {
       return 3.14 * $this->radius * $this->radius;
     }
   }
   $c = new Circle();
   $c->color = "green";
   $c->radius = 5;
   echo $c->describe() . "\n";
   echo "Area: " . $c->area();
   ```
   Output:
   ```text
   A green shape.
   Area: 78.5
   ```

</details>

### 🔴 Level 3: Challenge
Build a small school-library user system.

1. Make a parent class `User` with `$username` and a method `canBorrow()` that returns `"Can borrow 3 books."`.
2. Make `Librarian extends User` that overrides `canBorrow()` to return `"Can borrow 10 books."`.
3. Make `Visitor extends User` that overrides `canBorrow()` to return `"Can only read in the library."`.
4. Put one of each in an array and use `foreach` to print each username with `canBorrow()`.
5. Extra: look up the `final` keyword. What happens if you write `final public function canBorrow()` in `User`?

<details>
<summary>Show one possible answer</summary>

```php
<?php
class User {
  public $username;
  public function canBorrow(): string {
    return "Can borrow 3 books.";
  }
}
class Librarian extends User {
  public function canBorrow(): string {
    return "Can borrow 10 books.";
  }
}
class Visitor extends User {
  public function canBorrow(): string {
    return "Can only read in the library.";
  }
}

$a = new User();      $a->username = "hana";
$b = new Librarian(); $b->username = "mr_tariq";
$c = new Visitor();   $c->username = "guest";

foreach ([$a, $b, $c] as $person) {
  echo $person->username . ": " . $person->canBorrow() . "\n";
}
```

Output:

```text
hana: Can borrow 3 books.
mr_tariq: Can borrow 10 books.
guest: Can only read in the library.
```

The same line `$person->canBorrow()` runs a different method for each object. This idea is called **polymorphism** ("many shapes").

Extra: `final` stops child classes from overriding that method. `Librarian` and `Visitor` would then cause a fatal error: `Cannot override final method User::canBorrow()`.

</details>
