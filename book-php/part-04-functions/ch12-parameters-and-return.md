# Chapter 12: Parameters & Return Values 📥📤

---

## 1. 🌟 Real-Life Situation: The ATM Cash Dispenser

Imagine walking up to a bank ATM machine:
1. You insert your debit card and type: **Withdraw $60** (`$amount = 60`).
2. The $60 is your **Input Parameter** handed into the machine.
3. Inside the ATM, the computer verifies your balance, checks cash reserves, counts three $20 bills, and runs an audit calculation.
4. Finally, the motorized slot opens and **Hands you the cash** (`return $cashBills;`).

Functions in programming mirror this exact input-process-output pipeline:
- **Parameters** are inputs handed into the function.
- **Return Values** are the calculated results handed back to your code!

---

## 2. 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- Pass single and multiple arguments into custom functions.
- Assign **default parameter values** for optional arguments.
- Use the `return` keyword to output calculated results instead of echoing directly.
- Understand how `return` immediately halts execution inside a function.
- Use modern PHP 8 type declarations (e.g. `int $x, float $y): float`.

---

## 3. 👁️ Visual Concept Explanation

### The Function Input/Output Machine

```text
    INPUT ARGUMENTS                FUNCTION MACHINE                 OUTPUT RESULT
   ┌────────────────┐            ┌──────────────────┐             ┌──────────────┐
   │  $price = 100  │ ---------> │ calculateTotal() │ ----------> │     $108     │
   │  $tax = 0.08   │            │   $tax = 100*0.08│             │(Return Value)│
   └────────────────┘            │   return 100+$tax│             └──────────────┘
                                 └──────────────────┘
```

### Echo vs. Return: A Critical Distinction

```text
+------------------------------------+------------------------------------+
|          ECHO (The Megaphone)      |          RETURN (The Handover)     |
+------------------------------------+------------------------------------+
| • Blasts text onto the screen      | • Silently gives the answer back   |
| • Cannot be stored in a variable   | • Can be saved: $total = calc();   |
| • Cannot be used in calculations   | • Can be chained into further math |
| • Hard to test automatically       | • Professional standard for logic  |
+------------------------------------+------------------------------------+
```

---

## 4. 💻 Code Example: E-Commerce Calculation Engine

```php
<?php
  // Function with parameters, default value, and type declarations
  function calculateOrderTotal(float $unitPrice, int $qty, float $discountPercent = 0.0): float {
    $subtotal = $unitPrice * $qty;
    $discountAmount = $subtotal * ($discountPercent / 100);
    $totalAfterDiscount = $subtotal - $discountAmount;
    
    // Delivery fee rule: Free shipping for orders $50+
    $shipping = ($totalAfterDiscount >= 50.0) ? 0.0 : 5.99;
    
    $finalTotal = $totalAfterDiscount + $shipping;
    return $finalTotal; // Hands value back to caller!
  }

  // Calling function with default discount (0%)
  $order1 = calculateOrderTotal(15.00, 2); // 30 + 5.99 shipping = 35.99
  echo "Order 1 Total: $" . number_format($order1, 2) . "<br>";

  // Calling function with custom discount (10%)
  $order2 = calculateOrderTotal(40.00, 2, 10.0); // 80 - 8 = 72 (Free shipping!) = 72.00
  echo "Order 2 Total: $" . number_format($order2, 2) . "<br>";

  // Early return pattern: Input Guard
  function checkAdmissionEligibility(int $age): string {
    if ($age < 5) {
      return "Too young for primary school.";
    }
    if ($age > 18) {
      return "Adult education campus recommended.";
    }
    return "Eligible for standard school enrollment!";
  }

  echo "Admission check (Age 14): " . checkAdmissionEligibility(14);
?>
```

---

## 5. 🔍 Code Explanation: Breaking It Down Line by Line

- `float $unitPrice, int $qty`: Type declarations ensure callers pass appropriate data types, catching errors early.
- `$discountPercent = 0.0`: A **default parameter**. If the caller omits this 3rd argument, PHP automatically uses `0.0`!
- `: float`: Placed after the parameter parentheses, this declares the **return type**.
- `return $finalTotal;`: Halts the function instantly and passes `$finalTotal` back to where the function was called.
- Early Return Pattern: In `checkAdmissionEligibility()`, the moment a condition matches, `return` fires and exits immediately. No messy nested `else` statements needed!

---

## 6. 🌍 Real-World Connection: APIs & Payment Gateways

When a website charges a credit card via **Stripe** or **PayPal**:
- The PHP server calls `Stripe::charge($amount, $token)`.
- The function doesn't echo anything to the screen; it **returns** a response object: `["status" => "success", "id" => "ch_10928"]`.
- The website inspects the returned status to decide whether to show a receipt!

---

## 7. ⚠️ Common Beginner Traps

1. **Putting Default Parameters Before Required Ones**:
   ```php
   // ❌ ERROR in modern PHP:
   function sendEmail($subject = "News", $recipientEmail) {}
   // ✅ Correct: Optional/default parameters must ALWAYS go at the end!
   function sendEmail($recipientEmail, $subject = "News") {}
   ```
2. **Code After Return is Unreachable**:
   ```php
   function test() {
     return "Done";
     echo "This will NEVER run!"; // ⚠️ Dead code!
   }
   ```

---

## 8. 🔮 Predict the Output

```php
<?php
  function multiply($a, $b = 5) {
    return $a * $b;
  }
  echo multiply(4) + multiply(2, 3);
?>
```

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> <code>26</code>! (<code>multiply(4)</code> uses default 5 -> 20. <code>multiply(2, 3)</code> uses 3 -> 6. 20 + 6 = 26).
</details>

---

## 9. 🕵️ Code Detective: The Silent Echo

```php
<?php
  function addScore($current, $bonus) {
    echo $current + $bonus;
  }

  $newScore = addScore(50, 10);
  $doubleScore = $newScore * 2;
  echo "<br>Final: $doubleScore";
?>
```

- **Find the bug**: `$doubleScore` ends up as `0`!
- **Explain**: `addScore()` uses `echo` instead of `return`. Therefore, `$newScore` receives `null`. In math, `null * 2` is `0`!
- **Fix**: Change `echo $current + $bonus;` to `return $current + $bonus;`.

---

## 10. 🏆 5 Levels of Mastery Exercises

### 🟢 Level 1: Recall
1. What keyword is used to pass a value out of a function?
2. Where in the parameter list must default parameters be placed?
3. What happens to any code written on lines immediately following a `return` statement?

### 🟡 Level 2: Understand
4. Explain why pure functions that return values are much easier to test than functions that echo directly.
5. What is the difference between an **argument** and a **parameter**?

### 🟠 Level 3: Apply
6. Write a function `calculateBmi(float $weightKg, float $heightM): float` that calculates Body Mass Index: `weight / (height * height)`.

### 🔵 Level 4: Think & Troubleshoot
7. Can a PHP function return multiple values? (Hint: How can an array or object be used to bundle multiple values into one return?).

### 🟣 Level 5: Create & Build
8. Build a Password Strength Validator function: `checkPassword(string $password): array`. It should return an array with `["isValid" => bool, "errors" => array]`, verifying minimum 8 characters, at least one number, and at least one uppercase letter.
