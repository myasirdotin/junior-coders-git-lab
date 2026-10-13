# Chapter 24: Classes & Objects (OOP) 🏛️

---

## 🌟 Real-Life Story

An architect draws a **blueprint** for a house: three bedrooms, a kitchen and a front door. You cannot live inside a paper plan. But builders can use that one blueprint to build a whole street of real houses. One house is painted yellow and another white, yet they share the same design. In programming, the blueprint is a **class** and each real house is an **object**.

---

## 🎯 What You Will Learn

- Explain what **Object-Oriented Programming (OOP)** is and why big projects use it.
- Declare a class with the `class` keyword.
- Create objects from a class with the `new` keyword.
- Add **properties** (variables inside a class) and **methods** (functions inside a class).
- Use the arrow `->` to reach an object's properties and methods.

---

## 👁️ Visual Concept Explanation

**Object-Oriented Programming (OOP)** is a way of organising code. You group the data about a thing and the actions it can do into one unit, called an **object**.

### The Blueprint vs. Object Architecture

```text
  CLASS (blueprint)
  ┌────────────────────┐
  │ class Student {    │
  │   public $name;    │
  │   public $grade;   │
  │ }                  │
  └─────────┬──────────┘
      new   │   new
    ┌───────┴────────┐
    v                v
  ┌────────────┐  ┌────────────┐
  │ $student1  │  │ $student2  │
  │ name: Ali  │  │ name: Sara │
  │ grade: 9   │  │ grade: 10  │
  └────────────┘  └────────────┘
   OBJECT           OBJECT
```

### Procedural vs Object-Oriented Programming

**Procedural** code is the style you have used so far: separate variables and functions, run from top to bottom.

| Concept | Procedural PHP | Object-Oriented PHP (OOP) |
| :--- | :--- | :--- |
| **Organisation** | Separate functions and variables | Data and actions grouped into objects |
| **Large projects** | Can get messy as files grow | Easier to split into tidy parts |
| **Modelling things** | Harder to represent a student or a book | Each thing becomes an object |
| **Frameworks** | Used in many older scripts | The base of **Laravel** and **Symfony** |

---

## 💻 Code Example: Creating Your First Class and Objects

```php
<?php
  // 1. Define the blueprint (class)
  class Student {
    // Properties (the data)
    public $name;
    public $grade;
    public $houseColor;

    // Methods (the actions)
    public function introduce() {
      return "Hello! My name is {$this->name}, and I am in Grade {$this->grade}.";
    }

    public function cheerForHouse() {
      return "Go House {$this->houseColor}!";
    }
  }

  // 2. Create the first object
  $student1 = new Student();
  $student1->name = "Zainab Ali";
  $student1->grade = 9;
  $student1->houseColor = "Emerald Green";

  // 3. Create a second object from the same blueprint
  $student2 = new Student();
  $student2->name = "Bilal Khan";
  $student2->grade = 9;
  $student2->houseColor = "Sapphire Blue";

  // 4. Call methods on each object
  echo "<p>" . $student1->introduce() . "</p>\n";
  echo "<p>" . $student1->cheerForHouse() . "</p>\n";
  echo "<p>" . $student2->introduce() . "</p>\n";
  echo "<p>" . $student2->cheerForHouse() . "</p>\n";
?>
```

Output:

```text
<p>Hello! My name is Zainab Ali, and I am in Grade 9.</p>
<p>Go House Emerald Green!</p>
<p>Hello! My name is Bilal Khan, and I am in Grade 9.</p>
<p>Go House Sapphire Blue!</p>
```

---

## 🔍 Code Explanation: Breaking It Down Line by Line

- `class Student { ... }`: Creates the blueprint. Class names start with a capital letter, in **PascalCase** (each word capitalised, no spaces).
- `public $name;`: Declares a **property**, a variable that belongs to the class. `public` means code outside the class may use it (Chapter 25 explains this).
- `public function introduce() { ... }`: Declares a **method**, a function that belongs to the class.
- `$this->name`: Inside a method, `$this` means "the object this method was called on". For `$student1`, it is Zainab's object.
- `{$this->name}`: The curly braces help PHP find the whole property inside a double-quoted string.
- `$student1 = new Student();`: `new` builds a fresh object from the blueprint. This is called **instantiating** (making an *instance*).
- `->`: The **object operator** (arrow). It reaches a property or calls a method on an object, as in `$student1->name`.

---

## 🌍 Real-World Connection: Modern Web Frameworks

In the **Laravel** framework, each database table has a class, such as `class User extends Model`. Saving a new user looks like this:

```php
$user = new User();
$user->name = "Hamza";
$user->save();
```

You can already read most of it: a new object, a property set with `->`, and a method call. (`extends` is Chapter 26.)

---

## 🔮 Predict the Output

```php
<?php
  class Lamp {
    public $color = "Silver";
  }
  $lamp1 = new Lamp();
  $lamp2 = new Lamp();
  $lamp1->color = "Red";
  echo $lamp2->color;
?>
```

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> <code>Silver</code>. Changing <code>$lamp1</code>'s colour does not affect <code>$lamp2</code>. They are separate objects. The <code>= "Silver"</code> in the class is a <strong>default value</strong> that every new object starts with.
</details>

---

## 🕵️ Code Detective: The Broken Arrow

```php
<?php
  class Pet {
    public $name;
  }
  $myPet = new Pet();
  $myPet.name = "Rocky";
?>
```

PHP stops with: `Parse error: syntax error, unexpected token "="`.

- **Find the bug**: The coder used a dot `.` instead of an arrow `->`.
- **Explain**: JavaScript uses dots for objects (`pet.name`). In PHP, the dot joins strings. PHP uses `->` for objects.
- **Fix**: `$myPet->name = "Rocky";`

---

## ⚠️ Common Mistake

**Putting `$` after the arrow.**

- ❌ *Wrong*:
  ```php
  $student1->$name = "Ali";
  ```
- 😕 *What happens*: PHP reads `$name` as a variable and uses **its value** as the property name. If `$name` does not exist, you get `Warning: Undefined variable $name`, and the value is not stored in the `name` property at all.
- ✅ *Fixed*: Write the property name with no `$`:
  ```php
  $student1->name = "Ali";
  ```

Remember also: a **class** is only the plan. An **object** is a real copy made with `new` that holds data.

---

## ✍️ Try It

Open the [PHP Console](../studios/php-console/) and type:

```php
<?php
class Book {
  public $title;
  public $pages;

  public function summary() {
    return "{$this->title} has {$this->pages} pages.";
  }
}

$book = new Book();
$book->title = "Stars and Planets";
$book->pages = 120;
echo $book->summary();
```

Output:

```text
Stars and Planets has 120 pages.
```

*Hint*: Make a second `Book` object with a different title. Call `summary()` on both. Then try `var_dump($book);` to see what is inside an object.

---

## 📝 Recap

- A **class** is a blueprint; an **object** is a real thing built from it with `new`.
- **Properties** are variables inside a class; **methods** are functions inside a class.
- Use `->` (no `$` after it) to reach a property or call a method.
- Inside a method, `$this` means "this object".
- Each object keeps its own values: changing one does not change another.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which keyword defines a new class?
2. Which keyword creates an object from a class?
3. Which operator reaches an object's properties and methods?

<details>
<summary>Show answer</summary>

1. `class`
2. `new`
3. `->` (the object operator, or arrow)

</details>

### 🟡 Level 2: Apply
1. What is the difference between a property and an ordinary variable? Between a method and an ordinary function?
2. What does this print?
   ```php
   <?php
   class Counter {
     public $count = 0;
   }
   $a = new Counter();
   $b = new Counter();
   $a->count = 5;
   echo $a->count + $b->count;
   ```

<details>
<summary>Show answer</summary>

1. A property is a variable that **belongs to an object**; each object has its own copy. A method is a function that **belongs to a class** and can use `$this` to reach the object's own data.
2. `5`. `$a->count` is 5 and `$b->count` is still its default, 0.

</details>

### 🔴 Level 3: Challenge
Build a `CharityBox` class for a school food drive.

1. Give it properties `$cause` and `$total` (start `$total` at `0`).
2. Add a method `addDonation($amount)` that adds to `$total`.
3. Add a method `report()` that returns a sentence such as `Food Drive: 350 collected.`
4. Make two boxes for two causes, add a few donations to each, and echo both reports.
5. Extra: use `var_dump()` on one box and explain what each line shows.

<details>
<summary>Show one possible answer</summary>

```php
<?php
class CharityBox {
  public $cause;
  public $total = 0;

  public function addDonation($amount) {
    $this->total = $this->total + $amount;
  }

  public function report() {
    return "{$this->cause}: {$this->total} collected.";
  }
}

$food = new CharityBox();
$food->cause = "Food Drive";
$food->addDonation(200);
$food->addDonation(150);

$books = new CharityBox();
$books->cause = "Library Books";
$books->addDonation(75);

echo $food->report() . "\n";
echo $books->report() . "\n";
var_dump($books);
```

Output:

```text
Food Drive: 350 collected.
Library Books: 75 collected.
object(CharityBox)#2 (2) {
  ["cause"]=>
  string(13) "Library Books"
  ["total"]=>
  int(75)
}
```

`var_dump()` shows the class name, the object's number (`#2`, the second object made), how many properties it has, and each property with its type and value.

</details>
