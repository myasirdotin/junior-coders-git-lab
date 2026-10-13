# Chapter 10: Loops in PHP

---

## 🌟 Real-Life Story

On sports day, the teacher says, "Everyone run 5 laps!" You run lap 1, then count "two", and run again. You keep going and counting until you reach 5, then you stop for water. Nobody writes the instruction "run a lap" five separate times. A **loop** works the same way: it repeats a job while a counter moves towards a finish line.

---

## 🎯 What You Will Learn

- Use the four PHP loops: `while`, `do-while`, `for` and `foreach`.
- Pick the right loop for a task.
- Prevent **infinite loops** by moving the counter every time.
- Control a loop with `break` (stop early) and `continue` (skip one turn).

---

## Visual Concept Explanation

Each trip through a loop is called an **iteration** (one "lap").

### The 4 PHP Loop Types at a Glance

| Loop | Use it when… | Example start |
| :--- | :--- | :--- |
| `while` | you repeat **while** a condition is true | `while ($fuel > 0)` |
| `do-while` | the body must run **at least once** | `do { ... } while (...);` |
| `for` | you know **how many** times | `for ($i = 1; $i <= 10; $i++)` |
| `foreach` | you visit **every item** in a list | `foreach ($items as $item)` |

### Anatomy of a `for` Loop

```text
for ( $i = 1 ; $i <= 5 ; $i++ ) { ... }
      ───┬──   ───┬───   ──┬─
         │        │        └ 3. add 1 after
         │        │            each lap
         │        └ 2. keep going while
         │             this is true
         └ 1. start the counter
              (runs once)
```

### A Short Word About Lists (Arrays)

`foreach` walks through a **list**. In PHP a list of values in one variable is an **array**, written with square brackets: `["HTML", "CSS", "PHP"]`. Chapters 14 to 16 teach arrays fully. Here you only need to loop over one.

---

## Code Example: The 4 Loops in Action

```php
<?php
  echo "<h2>1. The while loop</h2>";
  $count = 3;
  while ($count >= 1) {
    echo "Rocket launch in: $count...<br>";
    $count--; // Critical! Without this the loop never ends
  }

  echo "<h2>2. The do-while loop</h2>";
  $tries = 10;
  do {
    echo "This runs once, even though 10 > 5.<br>";
    $tries++;
  } while ($tries <= 5);

  echo "<h2>3. The for loop (8 times table)</h2>";
  for ($n = 1; $n <= 5; $n++) {
    echo "8 &times; $n = " . (8 * $n) . "<br>";
  }

  echo "<h2>4. The foreach loop</h2>";
  $skills = ["HTML", "CSS", "JavaScript", "PHP", "MySQL"];
  foreach ($skills as $skill) {
    echo "[$skill] ";
  }

  echo "<h2>5. break and continue</h2>";
  for ($num = 1; $num <= 10; $num++) {
    if ($num === 4) {
      echo "(skipping 4 with continue)<br>";
      continue; // skip the rest of this lap
    }
    if ($num === 7) {
      echo "(stopped at 7 with break)<br>";
      break; // leave the loop completely
    }
    echo "Number: $num<br>";
  }
```

Output (what the browser shows):

```text
1. The while loop
Rocket launch in: 3...
Rocket launch in: 2...
Rocket launch in: 1...

2. The do-while loop
This runs once, even though 10 > 5.

3. The for loop (8 times table)
8 × 1 = 8
8 × 2 = 16
8 × 3 = 24
8 × 4 = 32
8 × 5 = 40

4. The foreach loop
[HTML] [CSS] [JavaScript] [PHP] [MySQL]

5. break and continue
Number: 1
Number: 2
Number: 3
(skipping 4 with continue)
Number: 5
Number: 6
(stopped at 7 with break)
```

---

## Code Explanation: Breaking It Down Line by Line

- `while ($count >= 1)`: Checks the condition **first**. The body repeats as long as it is true.
- `$count--;`: Moves the counter towards the finish. Without it, `$count` stays 3 forever.
- `do { ... } while ($tries <= 5);`: Runs the body first, then checks. So it always runs at least once.
- `for ($n = 1; $n <= 5; $n++)`: Start, condition and step, all on one line.
- `foreach ($skills as $skill)`: Puts each item of `$skills` into `$skill`, one at a time, until the list ends.
- `continue`: Skips the rest of this lap and starts the next one.
- `break`: Ends the whole loop at once.

---

## 🌍 Real-World Connection: Rendering Products & Timelines

When you open an online bookshop or a school news page:
- The server gets a list of 20 books or news posts.
- A `foreach` loop builds one HTML card for each item: picture, title and price.
- One loop writes all 20 cards. Nobody types 20 separate blocks.

---

## 🔮 Predict the Output

```php
<?php
  $sum = 0;
  for ($i = 1; $i <= 3; $i++) {
    $sum += $i;
  }
  echo $sum;
```

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> <code>6</code>. Lap 1: 0 + 1 = 1. Lap 2: 1 + 2 = 3. Lap 3: 3 + 3 = 6. (<code>+=</code> adds to the variable; see Chapter 7.)
</details>

---

## 🕵️ Code Detective: The Wrong-Way Counter

```php
<?php
  // The coder wanted a countdown from 5 to 1:
  for ($i = 5; $i >= 1; $i++) {
    echo "$i ";
  }
```

- **Find the bug**: The step uses `$i++` instead of `$i--`.
- **Explain**: `$i` starts at 5 and grows: 6, 7, 8... It is always `>= 1`, so the loop never stops.
- **Fix**: Change `$i++` to `$i--`. The output becomes `5 4 3 2 1 `.

---

## ⚠️ Common Mistake

**The infinite loop: forgetting to move the counter.**

- ❌ *Wrong*:
  ```php
  <?php
  $i = 1;
  while ($i <= 10) {
    echo $i;
    // forgot $i++
  }
  ```
- 😕 *What happens*: `$i` stays 1 forever. The page prints `1111…` until PHP's time limit (`max_execution_time`, usually 30 seconds on a web server) stops the script with a fatal error.
- ✅ *Fixed*: Add `$i++;` inside the loop. It prints `12345678910` and stops.

*Rule*: every loop needs something that moves it closer to the end on every lap.

---

## ✍️ Try It

Open the [PHP Console](../studios/php-console/) and print the even numbers from 2 to 10:

```php
<?php
for ($n = 2; $n <= 10; $n += 2) {
  echo "$n ";
}
```

Output:

```text
2 4 6 8 10 
```

*Hint*: Change the loop so it counts down from 10 to 2. Which two parts of the `for` line must change?

---

## 📝 Recap

- A loop repeats code; each repeat is an **iteration**.
- `while` checks first; `do-while` runs once before it checks.
- `for` suits a known number of steps; `foreach` visits every item in a list.
- Always move the counter, or you get an infinite loop.
- `continue` skips one lap; `break` leaves the loop.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Name the four kinds of loop in PHP.
2. Which loop is best for visiting every item in a list?
3. What is the difference between `break` and `continue`?

<details>
<summary>Show answer</summary>

1. `while`, `do-while`, `for` and `foreach`.
2. **`foreach`**.
3. `break` ends the whole loop. `continue` skips only the rest of the current lap.

</details>

### 🟡 Level 2: Apply
1. A `while` and a `do-while` loop both have a condition that is false from the start. How many times does each body run?
2. Write a `for` loop that adds up all even numbers from 2 to 50 and prints the total.

<details>
<summary>Show answer</summary>

1. The `while` body runs **0** times. The `do-while` body runs **once**, because it checks at the end.
2.
```php
<?php
$total = 0;
for ($n = 2; $n <= 50; $n += 2) {
  $total += $n;
}
echo $total;
```

Output:

```text
650
```

</details>

### 🔴 Level 3: Challenge
Build a multiplication table page.

1. Use a loop inside a loop (a **nested loop**) to print an HTML `<table>`.
2. Rows 1 to 5 and columns 1 to 5; each cell shows row × column.
3. Extra: print a 5 × 5 square of `*` with a nested loop, one `<br>` after each row.
4. Extra: stretch your table to 10 × 10.

<details>
<summary>Show one possible answer</summary>

```php
<?php
echo "<table border='1'>";
for ($row = 1; $row <= 5; $row++) {
  echo "<tr>";
  for ($col = 1; $col <= 5; $col++) {
    echo "<td>" . ($row * $col) . "</td>";
  }
  echo "</tr>";
}
echo "</table>";
```

What the browser shows (as a table):

```text
1   2   3   4   5
2   4   6   8   10
3   6   9   12  15
4   8   12  16  20
5   10  15  20  25
```

The star square:

```php
<?php
for ($row = 1; $row <= 5; $row++) {
  for ($col = 1; $col <= 5; $col++) {
    echo "*";
  }
  echo "<br>";
}
```

What the browser shows:

```text
*****
*****
*****
*****
*****
```

</details>
