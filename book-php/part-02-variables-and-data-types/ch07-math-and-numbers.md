# Chapter 7: Math & Numbers in PHP 🔢

---

## 🌟 Real-Life Story

Your class is buying planetarium tickets for a science trip. The teacher multiplies the ticket price by the number of students. Then she subtracts a group discount and adds a small booking fee. Finally she rounds the total to two decimal places. Every step is simple maths, and PHP can do all of it in a split second.

---

## 🎯 What You Will Learn

- Use the six arithmetic operators: `+`, `-`, `*`, `/`, `%` and `**`.
- Update a number with `++`, `--`, `+=` and `-=`.
- Predict the order PHP uses to work out a sum (BODMAS).
- Round and compare numbers with `round()`, `ceil()`, `floor()`, `abs()`, `max()` and `min()`.
- Make random whole numbers with `rand()` and `random_int()`.

---

## 👁️ Visual Concept Explanation

### The Arithmetic Operators Toolbox

An **operator** is a symbol that does a job with values. For example, `+` adds them.

| Operator | Name | Example | Result |
| :--- | :--- | :--- | :--- |
| `+` | Addition | `10 + 5` | `15` |
| `-` | Subtraction | `10 - 5` | `5` |
| `*` | Multiplication | `10 * 5` | `50` |
| `/` | Division | `10 / 4` | `2.5` (a float) |
| `%` | Modulus (remainder) | `17 % 5` | `2` (17 ÷ 5 is 3, with 2 left over) |
| `**` | Power | `2 ** 3` | `8` (2 × 2 × 2) |

A **float** is a number with a decimal point, such as `2.5`. Chapter 5 introduced it.

### The Modulus Operator: Detecting Odd vs Even

```text
number % 2 is 0  -->  EVEN (2, 4, 6, 8...)
number % 2 is 1  -->  ODD  (1, 3, 5, 7...)
```

### Order of Operations (BODMAS)

PHP does `**` first, then `*`, `/` and `%`, then `+` and `-`. Brackets come before everything.

```php
<?php
echo 10 + 5 * 2;    // 20
echo "<br>";
echo (10 + 5) * 2;  // 30
```

Output (what the browser shows):

```text
20
30
```

### Shortcut Operators

| Shortcut | Means | If `$points` was 10 |
| :--- | :--- | :--- |
| `$points++` | add 1 | `11` |
| `$points--` | take away 1 | `9` |
| `$points += 5` | `$points = $points + 5` | `15` |
| `$points -= 3` | `$points = $points - 3` | `7` |
| `$points *= 2` | `$points = $points * 2` | `20` |

---

## 💻 Code Example: Mathematical Operations and Functions

```php
<?php
  // Science trip: planetarium tickets for a class
  $pricePerTicket = 45;   // rupees
  $quantity = 3;
  $discount = 15;         // group discount in rupees
  $feeRate = 0.08;        // 8% booking fee

  $subtotal = $pricePerTicket * $quantity;
  $afterDiscount = $subtotal - $discount;
  $fee = $afterDiscount * $feeRate;
  $finalBill = $afterDiscount + $fee;

  echo "Subtotal: Rs " . $subtotal . "<br>";
  echo "Final bill: Rs " . round($finalBill, 2) . "<br>";

  // Essential math functions
  echo "<h3>Math Toolkit</h3>";
  echo "round(4.7) = " . round(4.7) . "<br>";
  echo "round(4.3) = " . round(4.3) . "<br>";
  echo "ceil(4.1) = " . ceil(4.1) . " (always rounds UP)<br>";
  echo "floor(4.9) = " . floor(4.9) . " (always rounds DOWN)<br>";
  echo "abs(-99) = " . abs(-99) . " (distance from zero)<br>";
  echo "max(12, 85, 43) = " . max(12, 85, 43) . "<br>";
  echo "min(12, 85, 43) = " . min(12, 85, 43) . "<br>";
  echo "number_format(1250050.75, 2) = " . number_format(1250050.75, 2);
```

Output (what the browser shows):

```text
Subtotal: Rs 135
Final bill: Rs 129.6

Math Toolkit
round(4.7) = 5
round(4.3) = 4
ceil(4.1) = 5 (always rounds UP)
floor(4.9) = 4 (always rounds DOWN)
abs(-99) = 99 (distance from zero)
max(12, 85, 43) = 85
min(12, 85, 43) = 12
number_format(1250050.75, 2) = 1,250,050.75
```

### Random Numbers

```php
<?php
  $questionNumber = rand(1, 20); // one of 20 quiz questions
  $seatNumber = rand(1, 30);     // one of 30 seats in the class
  echo "Question $questionNumber goes to seat $seatNumber";
```

One possible output (it changes every time you run it):

```text
Question 7 goes to seat 23
```

---

## 🔍 Code Explanation: Breaking It Down Line by Line

- `$subtotal = $pricePerTicket * $quantity;`: Multiplies 45 by 3 and stores `135`.
- `round($finalBill, 2)`: Rounds to at most 2 decimal places, good for money. PHP drops a trailing zero, so `129.60` prints as `129.6`.
- `ceil()`: Always rounds UP. With 21 students and 4 seats per car, `ceil(21 / 4)` gives `6` cars.
- `floor()`: Always rounds DOWN.
- `number_format(1250050.75, 2)`: Adds thousands commas and keeps 2 decimals.
- `rand(min, max)`: Picks a whole number from min to max, including both ends.

---

## 🌍 Real-World Connection: Cryptography & Security

Websites need random numbers for:
- The 6-digit codes sent when you log in with two-step checking.
- Password-reset links sent by email.

For these, developers use `random_int(100000, 999999)` instead of `rand()`. `random_int()` is **cryptographically secure**: an attacker cannot guess the next number.

---

## 🔮 Predict the Output

```php
<?php
  $counter = 5;
  echo $counter++; // post-increment
  echo $counter;
```

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> <code>56</code>. <code>$counter++</code> prints 5 FIRST and then adds 1, so the next line prints 6. With <code>++$counter</code> (pre-increment) it would print <code>66</code>.
</details>

---

## 🕵️ Code Detective: The Odd/Even Bug

A coder wants to check if 14 is even. They expect to see `0`:

```php
<?php
  $num = 14;
  echo $num / 2;
```

Output:

```text
7
```

- **Find the bug**: The coder used `/` (division) instead of `%` (modulus).
- **Explain**: `14 / 2` is `7`. Division gives the answer, not the remainder.
- **Fix**: `echo $num % 2;` prints `0`, so 14 is even.

---

## ⚠️ Common Mistake

**Forgetting the order of operations.**

- ❌ *Wrong*: An average of two marks written as `$average = 80 + 90 / 2;`
- 😕 *What happens*: PHP divides first: `90 / 2` is 45, plus 80 gives `125`. That is not an average.
- ✅ *Fixed*: `$average = (80 + 90) / 2;` gives `85`. The brackets make PHP add first.

**Dividing by zero.** `echo 50 / 0;` stops the script with `DivisionByZeroError: Division by zero`. Make sure the bottom number is never 0. Chapter 8 shows how to check it with `if`.

---

## ✍️ Try It

Open the [PHP Console](../studios/php-console/) and work out how many minibuses a class trip needs:

```php
<?php
$students = 38;
$seatsPerBus = 12;
echo "Buses needed: " . ceil($students / $seatsPerBus);
echo "<br>Students in the last bus: " . ($students % $seatsPerBus);
```

Output (what the browser shows):

```text
Buses needed: 4
Students in the last bus: 2
```

*Hint*: Change `$students` to 36. Why does the last line now print `0`?

---

## 📝 Recap

- `+ - * /` work like school maths; `%` gives the remainder; `**` gives a power.
- `number % 2` is 0 for even numbers and 1 for odd numbers.
- PHP follows BODMAS. Use brackets to make your meaning clear.
- `++`, `--`, `+=` and `-=` are short ways to change a number.
- `round()`, `ceil()` and `floor()` round in different directions; `max()` and `min()` find the biggest and smallest.
- Use `random_int()` when a random number must be secure.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. What does the modulus operator `%` calculate?
2. Which function always rounds a number UP?
3. Which operator raises a number to a power?

<details>
<summary>Show answer</summary>

1. The **remainder** after division. `17 % 5` is `2`.
2. **`ceil()`**. `ceil(4.1)` is `5`.
3. **`**`**. `2 ** 3` is `8`.

</details>

### 🟡 Level 2: Apply
1. What is the difference between `$x++` and `++$x` inside an `echo`?
2. What does `echo 2 + 3 * 4;` print? Rewrite it so it prints `20`.

<details>
<summary>Show answer</summary>

1. `$x++` uses the old value first, then adds 1. `++$x` adds 1 first, then uses the new value.
2. It prints `14`, because `3 * 4` happens first. `echo (2 + 3) * 4;` prints `20`.

</details>

### 🔴 Level 3: Challenge
Build a student mark calculator.

1. Store five subject marks out of 100 in five variables.
2. Print the total, the percentage rounded to 1 decimal place, the highest mark and the lowest mark.
3. Extra: print the school's total marks, `1250050`, with commas using `number_format()`.

<details>
<summary>Show one possible answer</summary>

```php
<?php
$math = 88; $science = 92; $english = 75; $urdu = 81; $computing = 95;

$total = $math + $science + $english + $urdu + $computing;
$percent = round($total / 500 * 100, 1);

echo "Total: $total / 500<br>";
echo "Percentage: $percent%<br>";
echo "Highest: " . max($math, $science, $english, $urdu, $computing) . "<br>";
echo "Lowest: " . min($math, $science, $english, $urdu, $computing) . "<br>";
echo "School total: " . number_format(1250050);
```

Output (what the browser shows):

```text
Total: 431 / 500
Percentage: 86.2%
Highest: 95
Lowest: 75
School total: 1,250,050
```

</details>
