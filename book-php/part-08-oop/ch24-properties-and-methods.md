# Chapter 24: Properties, Methods & Encapsulation 🛡️⚙️

---

## 1. 🌟 Real-Life Situation: The Digital Wristwatch

Look at a digital wristwatch:
- On the outside, you see the digital screen showing the time, and two simple buttons: **"Mode"** and **"Set"**.
- You cannot reach inside the watch with a screwdriver to manually twist the vibrating quartz crystal or change the battery voltage directly.
- The fragile internal gears are safely sealed inside a waterproof casing (**Encapsulation**).
- If you want to change the time, you press the authorized "Set" button!

In Object-Oriented Programming:
- **Encapsulation** means protecting an object's internal data from accidental tampering from the outside world.
- We use **Access Modifiers** (`public`, `private`, `protected`) and **Getters/Setters** to safeguard data integrity!

---

## 2. 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- Master the three PHP access modifiers: `public`, `private`, and `protected`.
- Understand and use the `$this` pseudo-variable inside methods.
- Protect critical properties from invalid data using **private** visibility.
- Implement **Getter** and **Setter** methods for secure data access.
- Understand how encapsulation prevents bugs in large applications.

---

## 3. 👁️ Visual Concept Explanation

### The Three Access Modifiers

```text
┌───────────┬─────────────────────────────────────────────────────────────┐
│ Modifier  │ Where Can It Be Accessed?                                   │
├───────────┼─────────────────────────────────────────────────────────────┤
│ public    │ Everywhere! Outside code, subclasses, and inside the class. │
│ private   │ STRICT: ONLY code INSIDE this exact class can touch it!     │
│ protected │ Inside this class and its child subclasses (inheritance).   │
└───────────┴─────────────────────────────────────────────────────────────┘
```

### The $this Pseudo-Variable

```text
Inside a class method:
  $this->balance

Means:
  "The property called 'balance' belonging to THIS SPECIFIC OBJECT instance!"
```

---

## 4. 💻 Code Example: Encapsulated Bank Account

```php
<?php
  class BankAccount {
    public $accountHolder;
    // Private property: CANNOT be modified directly from outside!
    private $balance = 0.0;

    // Setter method with validation!
    public function deposit(float $amount) {
      if ($amount <= 0) {
        return "Error: Deposit amount must be positive!";
      }
      $this->balance += $amount;
      return "Deposited $" . number_format($amount, 2) . " successfully.";
    }

    // Setter method with security guard!
    public function withdraw(float $amount) {
      if ($amount <= 0) {
        return "Error: Withdrawal amount must be positive!";
      }
      if ($amount > $this->balance) {
        return "Error: Insufficient funds! Current balance: $" . number_format($this->balance, 2);
      }
      $this->balance -= $amount;
      return "Withdrew $" . number_format($amount, 2) . " successfully.";
    }

    // Getter method: Read-only access!
    public function getBalance(): string {
      return "$" . number_format($this->balance, 2);
    }
  }

  // Interacting with the Encapsulated Object
  $account = new BankAccount();
  $account->accountHolder = "Sara Khan";

  echo "<h2>Account for {$account->accountHolder}</h2>";
  echo "<p>" . $account->deposit(150.50) . "</p>";
  echo "<p>Current Balance: <strong>" . $account->getBalance() . "</strong></p>";

  // Attempting an illegal withdrawal
  echo "<p>" . $account->withdraw(200.00) . "</p>";

  // Legal withdrawal
  echo "<p>" . $account->withdraw(50.00) . "</p>";
  echo "<p>Final Balance: <strong>" . $account->getBalance() . "</strong></p>";

  // What happens if an external script tries to hack the balance directly?
  // $account->balance = 1000000; // ❌ Fatal Error: Cannot access private property!
?>
```

---

## 5. 🔍 Code Explanation: Breaking It Down Line by Line

- `private $balance = 0.0;`: Sealed inside the vault! No external code can write `$account->balance = 50000;`.
- `$this->balance`: Refers to the current account's private balance.
- `deposit()` & `withdraw()`: These methods act as authorized bank tellers. They validate transactions, ensure deposits are positive, and prevent overdrawing before touching `$this->balance`!
- `getBalance()`: A **Getter** method. It lets the world view the balance without allowing anyone to directly tamper with it.

---

## 6. 🌍 Real-World Connection: Preventing Chaos in Game Development

Imagine a multiplayer game like Roblox or Minecraft:
- A player object has `private $health = 100;`.
- If `$health` were `public`, a cheating client script could execute: `$player->health = 9999999;`!
- With encapsulation, the only way health changes is through `takeDamage($pts)` or `heal($pts)`, where the game server enforces rules!

---

## 7. ⚠️ Common Beginner Traps

1. **Forgetting `$this->` inside methods**:
   ```php
   public function deposit($amount) {
     $balance += $amount; // ❌ Creates a temporary local variable, leaves object balance unchanged!
     $this->balance += $amount; // ✅ Correct! Modifies object property!
   }
   ```
2. **Making everything `public`**:
   Defaulting all properties to public defeats the entire purpose of OOP encapsulation!

---

## 8. 🔮 Predict the Output

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
<strong>Answer:</strong> <strong>Fatal Error!</strong> <code>Cannot access private property Lock::$code</code>. Private properties can never be read from outside the class!
</details>

---

## 9. 🕵️ Code Detective: The Broken Method Call

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
?>
```

- **Find the bug**: `greetUser()` calls `getSalutation()` without `$this->`!
- **Explain**: PHP looks for a standalone global function named `getSalutation()`, which does not exist.
- **Fix**: Change to `$this->getSalutation() . " " . $name;`.

---

## 10. 🏆 5 Levels of Mastery Exercises

### 🟢 Level 1: Recall
1. Name the three visibility access modifiers in PHP.
2. What pseudo-variable refers to the current object instance inside a class?
3. What is a "Getter" method?

### 🟡 Level 2: Understand
4. Why is keeping sensitive properties `private` better than making them `public`?
5. How does a "Setter" method allow you to validate data before saving it?

### 🟠 Level 3: Apply
6. Create a `Student` class with a private `$gradeScore`. Add a setter `setScore($score)` that only accepts numbers between 0 and 100, and a getter `getScore()`.

### 🔵 Level 4: Think & Troubleshoot
7. How does the `protected` modifier bridge the gap between `public` and `private` when dealing with class inheritance?

### 🟣 Level 5: Create & Build
8. Build a User Profile Class: properties include `private $email`, `private $passwordHash`, and `public $username`. Add a secure method `setPassword($plainTextPassword)` that hashes the password with `password_hash()`, and `verifyPassword($testPassword)` using `password_verify()`.
