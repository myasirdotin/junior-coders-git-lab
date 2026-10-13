# Chapter 12: Parameters & Return Values

---

## 🌟 Real-Life Story

The school library has a photocopy machine. You put in your page and type how many copies you want, for example 30. The number 30 is the **input** you hand to the machine. Inside, the machine does its work where you cannot see. Then it hands you back a neat stack of 30 copies: the **output**. Functions work the same way: **parameters** are the inputs, and the **return value** is the result handed back.

---

## 🎯 What You Will Learn

- Pass one or more **arguments** into your own functions.
- Give parameters **default values** so some arguments become optional.
- Use `return` to hand a result back instead of printing it with `echo`.
- Explain why `return` stops a function straight away.
- Add PHP 8 **type declarations** such as `int $qty` and `: float`.

---

## Visual Concept Explanation

A **parameter** is the name for an input, written in the function definition. An **argument** is the real value you pass when you call the function.

### The Function Input/Output Machine

```text
  INPUT           FUNCTION            OUTPUT
+---------+   +----------------+   +--------+
| 100     |-->| addTax()       |-->| 108    |
| 0.08    |   | tax = 100*0.08 |   | return |
+---------+   | return 100+tax |   | value  |
              +----------------+   +--------+
```

### Echo vs. Return: A Critical Distinction

| ECHO (the megaphone) | RETURN (the handover) |
| :--- | :--- |
| Prints text onto the page | Quietly gives the answer back |
| Cannot be stored in a variable | Can be saved: `$total = calc();` |
| Cannot be used in more maths | Can be used in more maths |
| Hard to test automatically | Easy to test; the professional habit |

---

## Code Example: School Shop Order Calculator

```php
<?php
  // Function with parameters, a default value and type declarations
  function calculateOrderTotal(float $unitPrice, int $qty, float $discountPercent = 0.0): float {
    $subtotal = $unitPrice * $qty;
    $discountAmount = $subtotal * ($discountPercent / 100);
    $totalAfterDiscount = $subtotal - $discountAmount;

    // Delivery rule: free delivery for orders of $50 or more
    $shipping = ($totalAfterDiscount >= 50.0) ? 0.0 : 5.99;

    $finalTotal = $totalAfterDiscount + $shipping;
    return $finalTotal; // Hands the value back to the caller
  }

  // Calling the function with the default discount (0%)
  $order1 = calculateOrderTotal(15.00, 2); // 30 + 5.99 delivery = 35.99
  echo "Order 1 Total: $" . number_format($order1, 2) . "<br>";

  // Calling the function with a 10% discount
  $order2 = calculateOrderTotal(40.00, 2, 10.0); // 80 - 8 = 72 (free delivery)
  echo "Order 2 Total: $" . number_format($order2, 2) . "<br>";

  // Early return pattern: a guard at the top
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

Output:

```text
Order 1 Total: $35.99<br>Order 2 Total: $72.00<br>Admission check (Age 14): Eligible for standard school enrollment!
```

---

## Code Explanation: Breaking It Down Line by Line

- `float $unitPrice, int $qty`: **Type declarations** say which kind of data each parameter expects. Wrong types are caught early.
- `$discountPercent = 0.0`: A **default parameter**. If the caller leaves out the 3rd argument, PHP uses `0.0`.
- `: float`: Written after the brackets, this declares the **return type**: the kind of value the function hands back.
- `return $finalTotal;`: Stops the function at once and passes `$finalTotal` back to where it was called.
- **Early return**: In `checkAdmissionEligibility()`, the first matching `if` returns and leaves the function. No nested `else` is needed.

---

## 🌍 Real-World Connection: Online Payment Services

When a charity website takes a donation, its PHP code calls a function from a payment service.

- That function does not `echo` anything onto the screen.
- It **returns** an answer, such as "success" plus a receipt number.
- The website checks the returned answer to decide what to show: a thank-you receipt or a "please try again" message.

---

## 🔮 Predict the Output

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
<strong>Answer:</strong> <code>26</code>. <code>multiply(4)</code> uses the default 5, giving 20. <code>multiply(2, 3)</code> gives 6. 20 + 6 = 26.
</details>

---

## 🕵️ Code Detective: The Silent Echo

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

Output:

```text
60<br>Final: 0
```

- **Find the bug**: `$doubleScore` ends up as `0`.
- **Explain**: `addScore()` uses `echo` instead of `return`. It prints `60` but hands back nothing, so `$newScore` is `null`. In maths, `null * 2` gives `0`.
- **Fix**: Change `echo $current + $bonus;` to `return $current + $bonus;`. Now the page shows `Final: 120`.

---

## ⚠️ Common Mistake

**Putting a default parameter before a required one.**

- ❌ *Wrong*:
  ```php
  function sendNotice($subject = "News", $email) {}
  ```
- 😕 *What happens*: PHP 8 shows a warning: *Deprecated: Optional parameter $subject declared before required parameter $email is implicitly treated as a required parameter.* The default value is useless, because you must always pass both arguments.
- ✅ *Fixed*: Put optional parameters at the end.
  ```php
  function sendNotice($email, $subject = "News") {}
  ```

A second mistake: writing code after `return`. That code never runs, because `return` has already left the function.

```php
function test() {
  return "Done";
  echo "This will NEVER run!"; // dead code
}
```

---

## ✍️ Try It

Open the [PHP Console](../studios/php-console/) and type:

```php
<?php
function area(float $length, float $width = 1.0): float {
  return $length * $width;
}
echo area(4, 2.5);
echo "<br>";
echo area(7);
```

Output:

```text
10<br>7
```

*Hint*: The second call leaves out `$width`, so PHP uses the default `1.0`. Now save a result in a variable: `$garden = area(4, 2.5);` and print `$garden * 2`.

---

## 📝 Recap

- **Parameters** are the input names in a function definition; **arguments** are the real values you pass in.
- A **default value** makes a parameter optional. Optional parameters go at the end.
- `return` hands a value back to the caller, and the function stops right there.
- A returned value can be stored in a variable and used in more maths; an echoed value cannot.
- Type declarations (`int`, `float`, `string`) and return types (`: float`) catch mistakes early.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which keyword passes a value out of a function?
2. Where in the parameter list must default parameters go?
3. What happens to code written on the lines just after a `return` statement?

<details>
<summary>Show answer</summary>

1. **`return`**.
2. At the **end**, after all required parameters.
3. It **never runs**. `return` leaves the function first, so that code is "dead code".

</details>

### 🟡 Level 2: Apply
1. What is the difference between an **argument** and a **parameter**?
2. Write a function `calculateBmi(float $weightKg, float $heightM): float` that returns `weight / (height * height)`, rounded to 1 decimal place. Call it with 45 kg and 1.5 m.

<details>
<summary>Show answer</summary>

1. A **parameter** is the name in the definition (`$weightKg`). An **argument** is the real value given in the call (`45`).
2. One possible answer:

```php
<?php
function calculateBmi(float $weightKg, float $heightM): float {
  return round($weightKg / ($heightM * $heightM), 1);
}
echo calculateBmi(45, 1.5);
```

Output:

```text
20
```

(45 ÷ 2.25 = 20.)

</details>

### 🔴 Level 3: Challenge
Build a password-length checker that uses early returns.

1. Write `checkPassword(string $password): string`.
2. If the password has fewer than 8 characters, return `"Too short"`.
3. If it has more than 64 characters, return `"Too long"`.
4. Otherwise return `"Length OK"`.
5. Call it with `"cat"` and `"library2026"`, printing each result on its own line.
6. Extra: explain in two sentences why a function that **returns** a value is easier to test than one that **echoes** it.

<details>
<summary>Show one possible answer</summary>

```php
<?php
function checkPassword(string $password): string {
  if (strlen($password) < 8) {
    return "Too short";
  }
  if (strlen($password) > 64) {
    return "Too long";
  }
  return "Length OK";
}
echo checkPassword("cat") . "<br>";
echo checkPassword("library2026");
```

Output:

```text
Too short<br>Length OK
```

Extra: A returned value can be stored and compared with the expected answer, for example `checkPassword("cat") === "Too short"`. An echoed value goes straight onto the page, so other code cannot check it.

</details>
