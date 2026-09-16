# PHP Quick Reference & Glossary 📖⚡

---

## 1. 🚀 Essential PHP Syntax Cheatsheet

### PHP Tags & Output
```php
<?php ... ?>       // Standard PHP script block
<?= $expression ?> // Shorthand echo: <?= $studentName ?>
echo "Text";       // Language construct to output strings and numbers
```

### Variables & Data Types
```php
$variable = "value"; // Must start with $ and letter or underscore
$int = 42;           // Integer
$float = 3.14159;    // Float / Double
$bool = true;        // Boolean (true or false)
$null = null;        // NULL (no value assigned)
$str = "Hello " . $name; // Concatenation uses the DOT (.) operator!
```

### Conditionals
```php
if ($score >= 90) {
  echo "A+";
} elseif ($score >= 75) {
  echo "A";
} else {
  echo "Pass";
}

// Ternary shorthand:
$status = ($age >= 18) ? "Adult" : "Minor";

// Null coalescing:
$username = $_POST['username'] ?? 'Guest';
```

### Loops
```php
// While loop
while ($i <= 10) { echo $i; $i++; }

// For loop
for ($i = 0; $i < 5; $i++) { echo $i; }

// Foreach loop (Arrays)
foreach ($fruits as $fruit) { echo $fruit; }
foreach ($student as $key => $val) { echo "$key: $val"; }
```

### Custom Functions
```php
function calculateTax(float $price, float $rate = 0.08): float {
  return $price * $rate;
}
$tax = calculateTax(100.0);
```

### Arrays
```php
// Indexed
$colors = ["Red", "Green", "Blue"];
$colors[] = "Yellow"; // Append
echo $colors[0];      // "Red"

// Associative
$user = ["name" => "Sara", "grade" => 9];
echo $user["name"];   // "Sara"
```

### Forms & Superglobals
```php
$_GET['query'];       // URL parameters (?query=php)
$_POST['password'];   // HTTP body submission
$_SERVER['REQUEST_METHOD']; // "GET" or "POST"
$_FILES['avatar'];    // Uploaded files
$_SESSION['user_id']; // Persistent session data (requires session_start())
```

### File Operations
```php
$content = file_get_contents("file.txt");                  // Read entire file
file_put_contents("file.txt", "Text
", FILE_APPEND | LOCK_EX); // Append with lock
```

### Object-Oriented PHP
```php
class Student {
  public function __construct(public string $name, private float $gpa) {}
  public function getGpa(): float { return $this->gpa; }
}
$s = new Student("Zainab", 3.92);
```

---

## 2. 📚 Comprehensive Glossary of Terms

| Term | Plain English Definition |
| :--- | :--- |
| **Apache** | The open-source web server software that receives HTTP requests and forwards `.php` scripts to the PHP engine. |
| **Associative Array** | An array whose elements are indexed by descriptive text keys (`"name" => "Ali"`) rather than numbers. |
| **Class** | An Object-Oriented blueprint that defines properties and methods for future objects. |
| **Client-Side** | Code (like HTML, CSS, and JS) that executes strictly inside the visitor's web browser. |
| **Constructor** | The `__construct()` magic method executed automatically the instant an object is created with `new`. |
| **DRY Principle** | *Don't Repeat Yourself* — the software engineering rule against copying and pasting identical code. |
| **Echo** | The primary PHP language construct for sending text and HTML markup to the outgoing browser stream. |
| **Encapsulation** | Hiding internal object state behind `private` access modifiers to prevent unauthorized external manipulation. |
| **Inheritance** | The OOP mechanism allowing a child subclass to adopt properties and methods from a parent class via `extends`. |
| **Method** | A function that lives inside a class and operates on an object's properties. |
| **Null Coalescing (`??`)**| A shortcut operator that checks if a variable exists and is not null, providing a fallback value if missing. |
| **Object** | A living instance constructed in computer memory from a class blueprint. |
| **Server-Side** | Code (like PHP and Python) that runs securely on the hosting server, hidden from visitor view. |
| **Session** | A server-side state tracking system that preserves a user's login and cart across multiple page loads. |
| **Superglobal** | Special pre-defined PHP arrays (e.g. `$_POST`, `$_GET`, `$_SESSION`) available everywhere in code. |
| **Type Juggling** | PHP's automatic conversion of one data type into another during operations (e.g. `"15"` + `5` = `20`). |
| **XSS (Cross-Site Scripting)** | A malicious attack where hackers inject scripts into forms; prevented with `htmlspecialchars()`. |
