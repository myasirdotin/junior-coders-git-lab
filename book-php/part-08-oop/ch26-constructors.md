# Chapter 26: Constructors & Destructors 🪄⚙️

---

## 1. 🌟 Real-Life Situation: The Factory Assembly Line

Imagine a brand-new smartphone rolling down the factory conveyor belt:
- As soon as the metal chassis is assembled, the factory robots don't leave it blank and powered off!
- They execute an **Initialization Routine**:
  1. Burn the unique Serial Number into the chip.
  2. Install the operating system.
  3. Pre-load the battery with a 50% charge.
- The phone leaves the factory **ready to turn on immediately**.

In PHP, a **Constructor** is a special magic method that runs automatically the exact millisecond an object is born with `new`:
- It eliminates tedious manual property setting.
- You pass initial data right into `new Car("Red", "Sedan")` in one clean, beautiful line!

---

## 2. 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- Define magic constructors using `__construct()`.
- Pass arguments directly into `new ClassName(...)`.
- Understand modern **Constructor Property Promotion** (PHP 8+).
- Use `__destruct()` to clean up files and database connections when an object dies.
- Prevent incomplete, broken objects by making required data mandatory at birth.

---

## 3. 👁️ Visual Concept Explanation

### Before vs. After Constructors

```text
OLD WAY (Tedious & Error-Prone):
$book = new Book();
$book->title = "PHP Guide";
$book->author = "Yasir";
$book->pages = 320;
// 4 lines of code! What if someone forgets to set $pages? Bug!

MODERN CONSTRUCTOR WAY:
$book = new Book("PHP Guide", "Yasir", 320);
// 1 line! The object is guaranteed to be 100% complete at birth! ⚡
```

### The Magic Lifecycle

```text
$obj = new Student("Ali");  -->  __construct() fires automatically!
... object does its work ...
unset($obj) or script ends  -->  __destruct() fires automatically for cleanup!
```

---

## 4. 💻 Code Example: Modern Constructor & Property Promotion

```php
<?php
  // 1. Classic Constructor Syntax
  class Book {
    public $title;
    public $author;
    public $pages;

    // Magic constructor
    public function __construct(string $title, string $author, int $pages) {
      $this->title = $title;
      $this->author = $author;
      $this->pages = $pages;
    }

    public function getSummary(): string {
      return "'{$this->title}' by {$this->author} ({$this->pages} pages)";
    }
  }

  // 2. Modern PHP 8 Constructor Property Promotion!
  // Notice: We declare visibility (public/private) directly in the parameter list!
  // PHP creates and assigns the properties automatically in 1 line!
  class Course {
    public function __construct(
      public string $code,
      public string $title,
      public int $creditHours = 3,
      private bool $isActive = true
    ) {}

    public function getInfo(): string {
      return "[$this->code] $this->title ($this->creditHours Credit Hours)";
    }
  }

  // Instantiating with constructor arguments
  $book1 = new Book("PHP for Class 9", "Junior Coders", 320);
  $book2 = new Book("Mastering Web Semantics", "Yasir Rasool", 240);

  echo "<h2>Library Books</h2>";
  echo "<p>" . $book1->getSummary() . "</p>";
  echo "<p>" . $book2->getSummary() . "</p>";

  echo "<h2>Academic Courses (PHP 8 Promotion)</h2>";
  $cs101 = new Course("CS-901", "Introduction to Server Programming", 4);
  echo "<p>" . $cs101->getInfo() . "</p>";
?>
```

---

## 5. 🔍 Code Explanation: Breaking It Down Line by Line

- `public function __construct(...)`: Two leading underscores (`__`) signify a **PHP Magic Method**.
- `$book1 = new Book("PHP for Class 9", ...)`: Arguments passed into `new Book(...)` are routed straight into `__construct()`.
- **PHP 8 Property Promotion**: In `class Course`, putting `public string $code` inside the constructor signature tells PHP to automatically create the property, type it, and assign it! It cuts boilerplate code in half!

---

## 6. 🌍 Real-World Connection: Database Connection Objects

When connecting to MySQL using PHP Data Objects (PDO):
```php
$db = new PDO("mysql:host=localhost;dbname=school", "root", "");
```
The constructor immediately contacts the MySQL server, authenticates your username and password, and opens the connection! If credentials are bad, it throws an exception right at object creation.

---

## 7. ⚠️ Common Beginner Traps

1. **One Underscore Instead of Two**:
   ```php
   public function _construct() // ❌ Won't work as magic constructor! Needs TWO underscores: __construct()
   ```
2. **Returning Values from Constructors**:
   Constructors cannot return values (`return "done";` is illegal). Their sole job is initialization.

---

## 8. 🔮 Predict the Output

```php
<?php
  class Greeter {
    public function __construct() {
      echo "Hello! ";
    }
  }
  $g1 = new Greeter();
  $g2 = new Greeter();
?>
```

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> <code>Hello! Hello! </code> (The constructor executes automatically every time a new object is created!).
</details>

---

## 9. 🕵️ Code Detective: The Broken Inheritance Call

```php
<?php
  class Vehicle {
    public function __construct(public string $color) {}
  }
  class Car extends Vehicle {
    public function __construct(string $color, public int $doors) {
      // Missing parent constructor call!
      $this->doors = $doors;
    }
  }
  $c = new Car("Red", 4);
  echo $c->color;
?>
```

- **Find the bug**: `$c->color` is uninitialized and throws an error!
- **Explain**: Child classes that define their own constructor must call `parent::__construct($color);` to run the parent's initialization!
- **Fix**: Add `parent::__construct($color);` inside `Car`'s constructor.

---

## 10. 🏆 5 Levels of Mastery Exercises

### 🟢 Level 1: Recall
1. How many underscores precede the name of magic methods like `__construct()`?
2. When does a constructor execute?
3. What is the counterpart magic method that runs when an object is destroyed?

### 🟡 Level 2: Understand
4. How does Constructor Property Promotion in PHP 8 save development time?
5. Why should mandatory object properties always be required in the constructor parameters?

### 🟠 Level 3: Apply
6. Create a `User` class with a constructor requiring `$username`, `$email`, and optional `$role = 'student'`. Instantiate two users.

### 🔵 Level 4: Think & Troubleshoot
7. What happens if a class defines a constructor with 3 required parameters, but a developer writes `$obj = new MyClass();` with no arguments?

### 🟣 Level 5: Create & Build
8. Build an Image File Model: define `ImageAttachment` whose constructor takes `$filePath`. The constructor verifies `file_exists()`, reads image dimensions using `getimagesize()`, and calculates aspect ratio. Add methods `getWidth()`, `getHeight()`, and `renderHtmlTag()`.
