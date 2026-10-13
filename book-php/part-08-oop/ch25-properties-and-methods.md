# Chapter 25: Properties, Methods & Encapsulation 🛡️

---

## 🌟 Real-Life Story

Look at a digital wristwatch. On the outside you see a screen and two buttons, "Mode" and "Set". You cannot reach inside to twist the tiny parts by hand; they are sealed in a case. To change the time, you must press the "Set" button, which only accepts sensible times. Programmers protect an object's data in the same way, and they call it **encapsulation**.

---

## 🎯 What You Will Learn

- Use the three access modifiers: `public`, `private` and `protected`.
- Use `$this` inside a method to reach the object's own properties and methods.
- Protect important properties with `private` so outside code cannot break them.
- Write **getter** and **setter** methods that check data before changing it.

---

## 👁️ Visual Concept Explanation

**Encapsulation** means keeping an object's data safe inside it. Outside code may only change the data through methods that check the rules. An **access modifier** is the word in front of a property or method that says who may use it.

### The Three Access Modifiers

```text
┌───────────┬────────────────────────────┐
│ Modifier  │ Who can use it?            │
├───────────┼────────────────────────────┤
│ public    │ Everyone: outside code too │
│ private   │ Only code inside this class│
│ protected │ This class + child classes │
└───────────┴────────────────────────────┘
```

Child classes arrive in Chapter 26. Until then, `protected` behaves like `private`.

### The $this Pseudo-Variable

```text
Inside a method:
  $this->balance
means:
  "the balance of THIS object,
   the one the method was called on"
```

It is called a **pseudo-variable** because you never create it yourself. PHP fills it in for you.

### Getters and Setters

- A **getter** is a method that lets outside code **read** a private value, for example `getBalance()`.
- A **setter** is a method that lets outside code **change** a private value, but only after checking it, for example `addMoney()`.

---

## 💻 Code Example: Encapsulated School Wallet

Each student has a school wallet for buying stationery at the school shop.

```php
<?php
  class SchoolWallet {
    public $owner;
    // Private: outside code cannot change this directly
    private $balance = 0.0;

    // Setter with a check: only positive amounts
    public function addMoney(float $amount) {
      if ($amount <= 0) {
        return "Error: The amount must be positive.";
      }
      $this->balance += $amount;
      return "Added ₹" . number_format($amount, 2) . ".";
    }

    // Setter with a guard: cannot spend more than you have
    public function spend(float $amount) {
      if ($amount <= 0) {
        return "Error: The amount must be positive.";
      }
      if ($amount > $this->balance) {
        return "Error: Not enough money. Balance: ₹"
          . number_format($this->balance, 2);
      }
      $this->balance -= $amount;
      return "Spent ₹" . number_format($amount, 2) . ".";
    }

    // Getter: read-only view of the balance
    public function getBalance(): string {
      return "₹" . number_format($this->balance, 2);
    }
  }

  $wallet = new SchoolWallet();
  $wallet->owner = "Sara Khan";

  echo "Wallet of {$wallet->owner}\n";
  echo $wallet->addMoney(150.50) . "\n";
  echo "Balance: " . $wallet->getBalance() . "\n";
  echo $wallet->spend(200.00) . "\n";   // too much: refused
  echo $wallet->spend(50.00) . "\n";    // allowed
  echo "Final balance: " . $wallet->getBalance() . "\n";

  // $wallet->balance = 1000000;  // Error: cannot access private property
?>
```

Output:

```text
Wallet of Sara Khan
Added ₹150.50.
Balance: ₹150.50
Error: Not enough money. Balance: ₹150.50
Spent ₹50.00.
Final balance: ₹100.50
```

---

## 🔍 Code Explanation: Breaking It Down Line by Line

- `private $balance = 0.0;`: Sealed inside the object. Outside code cannot write `$wallet->balance = 50000;`.
- `$this->balance`: The balance of the wallet the method was called on.
- `addMoney()` and `spend()`: **Setters**. They act like a careful shopkeeper: they check the amount first, then change `$this->balance`.
- `float $amount`: A **typed parameter**. It tells PHP the method expects a number with a decimal part.
- `getBalance(): string`: A **getter**. The `: string` after the brackets says the method returns a string. Anyone can read the balance, but nobody can change it this way.

---

## 🌍 Real-World Connection: Preventing Chaos in a Library System

Think of the online system of a school library:
- A member object has `private $booksBorrowed = 0;`.
- If it were `public`, a careless script could write `$member->booksBorrowed = -50;`.
- With encapsulation, the count only changes through `borrowBook()` and `returnBook()`. Those methods enforce the rules, for example "at most 3 books at a time".

---

## 🔮 Predict the Output

```php
<?php
  class Lock {
    private $code = "1234";
  }
  $l = new Lock();
  echo $l->code;
?>
```

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> An error: <code>Fatal error: Uncaught Error: Cannot access private property Lock::$code</code>. Private properties cannot be read from outside the class.
</details>

---

## 🕵️ Code Detective: The Broken Method Call

```php
<?php
  class Greeter {
    public function getSalutation() {
      return "Welcome!";
    }
    public function greetUser($name) {
      return getSalutation() . " " . $name;
    }
  }
  $g = new Greeter();
  echo $g->greetUser("Amina");
?>
```

PHP stops with: `Fatal error: Uncaught Error: Call to undefined function getSalutation()`.

- **Find the bug**: `greetUser()` calls `getSalutation()` without `$this->`.
- **Explain**: PHP looks for an ordinary function named `getSalutation()` outside the class. There is none.
- **Fix**: `return $this->getSalutation() . " " . $name;` Now it prints `Welcome! Amina`.

---

## ⚠️ Common Mistake

**Forgetting `$this->` inside a method.**

- ❌ *Wrong*:
  ```php
  public function addMoney($amount) {
    $balance += $amount;
  }
  ```
- 😕 *What happens*: `$balance` here is a new **local** variable that exists only inside the method. PHP warns `Undefined variable $balance`, and the object's real balance stays the same.
- ✅ *Fixed*:
  ```php
  public function addMoney($amount) {
    $this->balance += $amount;
  }
  ```

A second mistake is making every property `public`. Then any line of code anywhere can put wrong data in, and encapsulation is lost.

---

## ✍️ Try It

Open the [PHP Console](../studios/php-console/) and type:

```php
<?php
class Thermometer {
  private $celsius = 20;

  public function setCelsius($value) {
    if ($value < -50 || $value > 60) {
      return "Rejected: $value is not a sensible room reading.";
    }
    $this->celsius = $value;
    return "Saved.";
  }

  public function getCelsius() {
    return $this->celsius;
  }
}

$t = new Thermometer();
echo $t->setCelsius(500) . "\n";
echo $t->setCelsius(24) . "\n";
echo "Now: " . $t->getCelsius() . " °C";
```

Output:

```text
Rejected: 500 is not a sensible room reading.
Saved.
Now: 24 °C
```

*Hint*: Add the line `$t->celsius = 500;` at the end. What error do you get, and why?

---

## 📝 Recap

- **Encapsulation** keeps an object's data safe inside it.
- `public` = everyone; `private` = only this class; `protected` = this class and its children.
- `$this->` reaches the current object's own properties and methods.
- **Setters** check data before changing a private property; **getters** let others read it.
- Without `$this->`, a method makes a new local variable and the object stays unchanged.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Name the three access modifiers in PHP.
2. Which pseudo-variable means "the current object" inside a class?
3. What is a getter method?

<details>
<summary>Show answer</summary>

1. `public`, `private`, `protected`.
2. `$this`.
3. A public method that returns (lets others read) the value of a private property, such as `getBalance()`.

</details>

### 🟡 Level 2: Apply
1. Why is it better to keep a wallet's `$balance` private?
2. Write a `Student` class with a private `$score`. Add `setScore($score)` that only accepts numbers from 0 to 100, and `getScore()`.

<details>
<summary>Show answer</summary>

1. If it were public, any code could set it to a wrong value, such as `-500` or `1000000`. Private means the only way to change it is through methods that check the rules.
2. One way:
   ```php
   <?php
   class Student {
     private $score = 0;

     public function setScore($score) {
       if ($score < 0 || $score > 100) {
         return "Score must be 0 to 100.";
       }
       $this->score = $score;
       return "Score saved.";
     }

     public function getScore() {
       return $this->score;
     }
   }

   $s = new Student();
   echo $s->setScore(140) . "\n";
   echo $s->setScore(88) . "\n";
   echo $s->getScore();
   ```
   Output:
   ```text
   Score must be 0 to 100.
   Score saved.
   88
   ```

</details>

### 🔴 Level 3: Challenge
Build a `UserProfile` class that keeps a password safe (*Amānah*: a password is a trust).

1. Add `public $username` and `private $passwordHash`.
2. Add `setPassword($plain)`. Refuse passwords shorter than 8 characters. Otherwise store `password_hash($plain, PASSWORD_DEFAULT)`. Never store the plain password.
3. Add `checkPassword($attempt)` that returns `true` or `false` using `password_verify()`.
4. Test with one right and one wrong password.
5. Extra: explain why there is **no** `getPassword()` method.

<details>
<summary>Show one possible answer</summary>

```php
<?php
class UserProfile {
  public $username;
  private $passwordHash = "";

  public function setPassword($plain) {
    if (strlen($plain) < 8) {
      return "Password must have at least 8 characters.";
    }
    $this->passwordHash = password_hash($plain, PASSWORD_DEFAULT);
    return "Password saved.";
  }

  public function checkPassword($attempt) {
    return password_verify($attempt, $this->passwordHash);
  }
}

$user = new UserProfile();
$user->username = "maryam";
echo $user->setPassword("abc") . "\n";
echo $user->setPassword("cedar-tree-42") . "\n";
var_dump($user->checkPassword("cedar-tree-42"));
var_dump($user->checkPassword("guess123"));
```

Output:

```text
Password must have at least 8 characters.
Password saved.
bool(true)
bool(false)
```

Extra: the class never stores the real password, only its hash. A hash cannot be turned back into the password, so there is nothing safe to "get". Outside code may only **check** a password.

</details>
