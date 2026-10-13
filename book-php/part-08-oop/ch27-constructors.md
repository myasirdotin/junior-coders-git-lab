# Chapter 27: Constructors & Destructors ⚙️

---

## 🌟 Real-Life Story

Think of a new library card being made at the school office. The clerk does not hand you a blank card and hope you fill it in later. Your name, class and card number are printed on it the moment it is made. The card leaves the office complete and ready to use. In PHP, a **constructor** does the same job: it fills in an object's data the moment `new` creates it.

---

## 🎯 What You Will Learn

- Write a constructor with `__construct()` and pass data into `new ClassName(...)`.
- Use **constructor property promotion** (PHP 8) to write shorter classes.
- Call a parent's constructor from a child class with `parent::__construct()`.
- Use `__destruct()` to run tidy-up code when an object is destroyed.

---

## 👁️ Visual Concept Explanation

A **constructor** is a special method named `__construct()`. PHP runs it automatically when you write `new`. A **destructor**, named `__destruct()`, runs automatically when the object is no longer needed.

Methods whose names start with two underscores (`__`) are called **magic methods** in PHP. "Magic" here is just PHP's name for "PHP calls it for you"; you never call them by name yourself.

### Before vs. After Constructors

```text
OLD WAY (easy to forget a line):
$book = new Book();
$book->title  = "PHP Guide";
$book->author = "Amina Shah";
$book->pages  = 320;
// Forget $pages? The object is incomplete.

CONSTRUCTOR WAY:
$book = new Book("PHP Guide",
                 "Amina Shah", 320);
// PHP refuses to build it without all 3.
```

### The Object Lifecycle

```text
$obj = new Student("Ali");
   --> __construct() runs
... the object does its work ...
unset($obj) or the script ends
   --> __destruct() runs
```

`unset($obj)` deletes a variable. When nothing points to the object any more, PHP destroys it.

---

## 💻 Code Example: Classic Constructor & Property Promotion

```php
<?php
  // 1. Classic constructor
  class Book {
    public $title;
    public $author;
    public $pages;

    public function __construct(string $title, string $author, int $pages) {
      $this->title = $title;
      $this->author = $author;
      $this->pages = $pages;
    }

    public function getSummary(): string {
      return "'{$this->title}' by {$this->author} ({$this->pages} pages)";
    }
  }

  // 2. PHP 8 constructor property promotion:
  //    "public" in the parameter list creates AND fills the property.
  class Course {
    public function __construct(
      public string $code,
      public string $title,
      public int $creditHours = 3
    ) {}

    public function getInfo(): string {
      return "[{$this->code}] {$this->title} ({$this->creditHours} credit hours)";
    }
  }

  $book1 = new Book("PHP for Class 9", "Junior Coders", 320);
  $book2 = new Book("Web Pages with Meaning", "Amina Shah", 240);
  echo $book1->getSummary() . "\n";
  echo $book2->getSummary() . "\n";

  $cs = new Course("CS-901", "Introduction to Server Programming", 4);
  $art = new Course("AR-101", "Islamic Geometric Art");
  echo $cs->getInfo() . "\n";
  echo $art->getInfo() . "\n";
?>
```

Output:

```text
'PHP for Class 9' by Junior Coders (320 pages)
'Web Pages with Meaning' by Amina Shah (240 pages)
[CS-901] Introduction to Server Programming (4 credit hours)
[AR-101] Islamic Geometric Art (3 credit hours)
```

---

## 🔍 Code Explanation: Breaking It Down Line by Line

- `public function __construct(...)`: The two underscores mark a **magic method**. PHP calls it during `new`.
- `new Book("PHP for Class 9", "Junior Coders", 320)`: The values in the brackets go straight into the constructor's parameters, in order.
- `public string $code` inside the constructor's brackets: **Property promotion**. PHP creates the property `$code`, gives it the type `string`, and stores the value. No `$this->code = $code;` line is needed.
- `public int $creditHours = 3`: A **default value**. `$art` did not pass a third value, so it got `3`.
- `{}` after the constructor: The constructor body is empty, because promotion already did all the work.

### Destructors in Action

```php
<?php
class LabSession {
  public function __construct(public string $room) {
    echo "Lab $room opened.\n";
  }
  public function __destruct() {
    echo "Lab {$this->room} closed and lights off.\n";
  }
}

$lab = new LabSession("Physics");
echo "Students are doing experiments...\n";
unset($lab);
echo "Next lesson.\n";
```

Output:

```text
Lab Physics opened.
Students are doing experiments...
Lab Physics closed and lights off.
Next lesson.
```

Destructors are useful for tidy-up work, such as closing a file the object opened.

### Constructors and Inheritance

If a child class writes its own constructor, PHP does **not** run the parent's constructor automatically. You must call it with `parent::__construct(...)`:

```php
<?php
class Person {
  public function __construct(public string $name) {}
}
class Student extends Person {
  public function __construct(string $name, public int $grade) {
    parent::__construct($name);
  }
}
$s = new Student("Yusuf", 8);
echo "{$s->name} is in Grade {$s->grade}.";
```

Output:

```text
Yusuf is in Grade 8.
```

---

## 🌍 Real-World Connection: Database Connection Objects

In the next chapter you will connect to a MySQL database with **PDO** (PHP Data Objects). The connection is made by a constructor:

```php
$pdo = new PDO("mysql:host=localhost;dbname=school_db;charset=utf8mb4", "root", "");
```

The constructor contacts the MySQL server and logs in at once. If the details are wrong, it throws an exception (Chapter 23) right there, so you never get a half-working connection object. Chapter 28 shows how to catch it.

---

## 🔮 Predict the Output

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
<strong>Answer:</strong> <code>Hello! Hello! </code> The constructor runs every time a new object is created.
</details>

---

## 🕵️ Code Detective: The Broken Inheritance Call

```php
<?php
  class Vehicle {
    public function __construct(public string $color) {}
  }
  class Bus extends Vehicle {
    public function __construct(string $color, public int $seats) {
      // Missing parent constructor call!
    }
  }
  $b = new Bus("Yellow", 40);
  echo $b->color;
?>
```

PHP stops with: `Fatal error: Uncaught Error: Typed property Vehicle::$color must not be accessed before initialization`.

- **Find the bug**: `Bus` has its own constructor but never calls the parent's one.
- **Explain**: The parent's constructor is the one that stores `$color`. Because it never ran, `$color` was never given a value.
- **Fix**: Add `parent::__construct($color);` inside the `Bus` constructor. Now it prints `Yellow`.

---

## ⚠️ Common Mistake

**Typing one underscore instead of two.**

- ❌ *Wrong*:
  ```php
  class Badge {
    public $name;
    public function _construct($name) {
      $this->name = $name;
    }
  }
  $b = new Badge("Huda");
  var_dump($b->name);
  ```
- 😕 *What happens*: `_construct` (one underscore) is just an ordinary method, so PHP never calls it. There is no error, but the name is never stored: the output is `NULL`.
- ✅ *Fixed*: Use **two** underscores: `public function __construct($name)`. Now the output is `string(4) "Huda"`.

Also remember: a constructor's job is to set up the object. If it uses `return` with a value, `new` simply ignores that value.

---

## ✍️ Try It

Open the [PHP Console](../studios/php-console/) and type:

```php
<?php
class Planet {
  public function __construct(
    public string $name,
    public int $moons = 0
  ) {}

  public function describe(): string {
    return "{$this->name} has {$this->moons} moon(s).";
  }
}

$earth = new Planet("Earth", 1);
$venus = new Planet("Venus");
echo $earth->describe() . "\n";
echo $venus->describe();
```

Output:

```text
Earth has 1 moon(s).
Venus has 0 moon(s).
```

*Hint*: Try `new Planet();` with no values at all. Read the error message: which argument is missing?

---

## 📝 Recap

- A **constructor** (`__construct`) runs automatically when `new` creates an object.
- Values in `new ClassName(...)` go straight into the constructor's parameters.
- **Property promotion** (`public string $name` in the brackets) creates and fills a property in one step.
- A child class with its own constructor must call `parent::__construct(...)`.
- A **destructor** (`__destruct`) runs when the object is destroyed, for tidy-up work.
- Magic method names need **two** underscores.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. How many underscores start the name of a magic method such as `__construct()`?
2. When does a constructor run?
3. Which magic method runs when an object is destroyed?

<details>
<summary>Show answer</summary>

1. Two (`__`).
2. Automatically, every time an object is created with `new`.
3. `__destruct()`.

</details>

### 🟡 Level 2: Apply
1. A class has a constructor with 3 required parameters. What happens with `$obj = new MyClass();`?
2. Write a `User` class with property promotion: `$username`, `$email`, and `$role` with the default `"student"`. Create two users, one of them a `"teacher"`, and print their roles.

<details>
<summary>Show answer</summary>

1. PHP stops with an `ArgumentCountError`: *Too few arguments to function MyClass::__construct(), 0 passed ... and exactly 3 expected*. Required data must be given when the object is made.
2. One way:
   ```php
   <?php
   class User {
     public function __construct(
       public string $username,
       public string $email,
       public string $role = "student"
     ) {}
   }
   $u1 = new User("rahma", "rahma@example.org");
   $u2 = new User("mr_saleem", "saleem@example.org", "teacher");
   echo "{$u1->username}: {$u1->role}\n";
   echo "{$u2->username}: {$u2->role}";
   ```
   Output:
   ```text
   rahma: student
   mr_saleem: teacher
   ```

</details>

### 🔴 Level 3: Challenge
Build a `ScienceProject` class for a science fair.

1. Use property promotion for `$title`, `$student` and `$category` (default `"General"`).
2. In the constructor, refuse an empty title: if `$title` is `""`, set it to `"Untitled project"`.
3. Add a method `label()` that returns the title, student and category in one line.
4. Add `__destruct()` that prints `Project "<title>" packed away.`
5. Create two projects, print both labels, then `unset()` one of them.
6. Extra: make a child class `TeamProject extends ScienceProject` that adds `public int $members` and calls `parent::__construct()`.

<details>
<summary>Show one possible answer</summary>

```php
<?php
class ScienceProject {
  public function __construct(
    public string $title,
    public string $student,
    public string $category = "General"
  ) {
    if ($this->title === "") {
      $this->title = "Untitled project";
    }
  }

  public function label(): string {
    return "{$this->title} by {$this->student} [{$this->category}]";
  }

  public function __destruct() {
    echo "Project \"{$this->title}\" packed away.\n";
  }
}

class TeamProject extends ScienceProject {
  public function __construct(string $title, string $student, public int $members) {
    parent::__construct($title, $student, "Team");
  }
}

$p1 = new ScienceProject("Solar Water Heater", "Fatima", "Energy");
$p2 = new ScienceProject("", "Omar");
$p3 = new TeamProject("Rainwater Collector", "Class 8B", 4);

echo $p1->label() . "\n";
echo $p2->label() . "\n";
echo $p3->label() . " with {$p3->members} members\n";
unset($p2);
echo "Fair closed.\n";
```

Output:

```text
Solar Water Heater by Fatima [Energy]
Untitled project by Omar [General]
Rainwater Collector by Class 8B [Team] with 4 members
Project "Untitled project" packed away.
Fair closed.
Project "Rainwater Collector" packed away.
Project "Solar Water Heater" packed away.
```

The last two lines appear when the script ends and PHP destroys the remaining objects. Do not rely on the order in which that happens.

</details>
