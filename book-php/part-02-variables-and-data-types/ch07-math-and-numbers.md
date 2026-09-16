# Chapter 7: Math & Numbers in PHP 🔢🧮

---

## 1. 🌟 Real-Life Situation: The Shopping Cart Register

Imagine standing at the supermarket checkout:
- The scanner beeps 3 bags of chips at $2.50 each: Multiplication (`3 * 2.50 = 7.50`).
- The cashier scans a coupon for $1.00 off: Subtraction (`7.50 - 1.00 = 6.50`).
- Sales tax of 8% is applied: (`6.50 * 0.08 = 0.52`).
- The total bill is rounded to the nearest cent: (`round(7.02, 2)`).

Computers are lightning-fast mathematical calculators! In PHP, you can build calculators, grade estimators, e-commerce checkouts, and physics simulators using built-in arithmetic operators and math functions.

---

## 2. 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- Use all 6 standard arithmetic operators (`+`, `-`, `*`, `/`, `%`, `**`).
- Master increment (`++`) and decrement (`--`) operators.
- Understand operator precedence (BODMAS / PEMDAS).
- Use built-in mathematical functions: `round()`, `ceil()`, `floor()`, `abs()`.
- Generate unpredictable numbers with `rand()` and `random_int()`.

---

## 3. 👁️ Visual Concept Explanation

### The Arithmetic Operators Toolbox

| Operator | Name | Example | Evaluates To |
| :--- | :--- | :--- | :--- |
| `+` | Addition | `10 + 5` | `15` |
| `-` | Subtraction | `10 - 5` | `5` |
| `*` | Multiplication | `10 * 5` | `50` |
| `/` | Division | `10 / 4` | `2.5` (Converts to float) |
| `%` | Modulus (Remainder) | `10 % 3` | `1` (10 divided by 3 is 3, with 1 left over) |
| `**` | Exponentiation (Power) | `2 ** 3` | `8` (2 cubed: 2 * 2 * 2) |

### The Modulus Operator: Detecting Odd vs Even

```text
Any number % 2 == 0  -->  EVEN NUMBER! (2, 4, 6, 8, 10...)
Any number % 2 == 1  -->  ODD NUMBER!  (1, 3, 5, 7, 9...)
```

---

## 4. 💻 Code Example: Mathematical Operations and Functions

```php
<?php
  // Basic Arithmetic
  $pricePerTicket = 45;
  $quantity = 3;
  $discount = 15;
  $taxRate = 0.08;

  $subtotal = $pricePerTicket * $quantity;
  $discounted = $subtotal - $discount;
  $tax = $discounted * $taxRate;
  $finalBill = $discounted + $tax;

  echo "Subtotal: $$subtotal<br>";
  echo "Final Bill: $" . round($finalBill, 2) . "<br>";

  // Essential Math Functions
  echo "<h3>Math Toolkit</h3>";
  echo "round(4.7) = " . round(4.7) . "<br>"; // 5
  echo "round(4.3) = " . round(4.3) . "<br>"; // 4
  echo "ceil(4.1)  = " . ceil(4.1) . " (Always rounds UP)<br>";   // 5
  echo "floor(4.9) = " . floor(4.9) . " (Always rounds DOWN)<br>"; // 4
  echo "abs(-99)   = " . abs(-99) . " (Absolute value)<br>";      // 99
  echo "max(12, 85, 43) = " . max(12, 85, 43) . "<br>";          // 85
  echo "min(12, 85, 43) = " . min(12, 85, 43) . "<br>";          // 12

  // Random Number Generator (Rolling two dice)
  $die1 = rand(1, 6);
  $die2 = rand(1, 6);
  echo "<h3>Dice Roll: $die1 and $die2 (Total: " . ($die1 + $die2) . ")</h3>";
?>
```

---

## 5. 🔍 Code Explanation: Breaking It Down Line by Line

- `round($finalBill, 2)`: Rounds a float to exactly 2 decimal places, perfect for currency.
- `ceil()`: Always pushes decimals UP to the next integer. If you have 21 students and cars hold 4 people, `ceil(21 / 4)` tells you you need 6 cars!
- `floor()`: Drops decimal places completely.
- `rand(min, max)`: Generates a pseudo-random integer between min and max inclusive.

---

## 6. 🌍 Real-World Connection: Cryptography & Security

In web applications, generating random numbers is critical for:
- Two-Factor Authentication (2FA) verification PINs.
- Password reset tokens sent to your email.
- For high security, developers use `random_int(100000, 999999)` instead of `rand()`, because `random_int()` is cryptographically secure!

---

## 7. ⚠️ Common Beginner Traps

1. **Division by Zero**:
   ```php
   $result = 50 / 0; // ❌ Fatal Error: DivisionByZeroError!
   ```
   *Fix*: Always check `if ($denominator != 0)` before dividing!
2. **Order of Operations**:
   ```php
   $total = 10 + 5 * 2; // Evaluates to 20, NOT 30! (Multiplication happens first)
   $total = (10 + 5) * 2; // Evaluates to 30 (Parentheses force addition first)
   ```

---

## 8. 🔮 Predict the Output

```php
<?php
  $counter = 5;
  echo $counter++; // Post-increment
  echo $counter;
?>
```

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> <code>56</code>. <code>$counter++</code> prints 5 FIRST, and then increments it to 6! If it were <code>++$counter</code> (pre-increment), it would print <code>66</code>.
</details>

---

## 9. 🕵️ Code Detective: The Odd/Even Bug

```php
<?php
  $num = 14;
  if ($num / 2 == 0) {
    echo "Even";
  } else {
    echo "Odd";
  }
?>
```

- **Find the bug**: The developer used `/` (division) instead of `%` (modulus).
- **Explain**: `14 / 2` is `7`, which is not `0`, so the script wrongly says 14 is Odd!
- **Fix**: Use `$num % 2 == 0`.

---

## 10. 🏆 5 Levels of Mastery Exercises

### 🟢 Level 1: Recall
1. What does the modulus operator `%` calculate?
2. Which function always rounds a number UP to the nearest integer?
3. Write the operator for exponentiation (raising to a power).

### 🟡 Level 2: Understand
4. What is the difference between `$x++` and `++$x`?
5. Why should parentheses always be used when mixing addition and multiplication?

### 🟠 Level 3: Apply
6. Write a script that simulates a coin toss. Generate a random number (0 or 1). If 0, print `"Heads!"`; if 1, print `"Tails!"`.

### 🔵 Level 4: Think & Troubleshoot
7. How would you format a number like `1250050.75` into a readable currency string like `$1,250,050.75`? (Hint: Explore `number_format()`).

### 🟣 Level 5: Create & Build
8. Build a Student Grade Calculator: store scores for 5 subjects. Calculate total marks, percentage, average, and determine highest and lowest mark using `max()` and `min()`.
