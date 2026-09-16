# Chapter 10: Loops in PHP 🔄🔁

---

## 1. 🌟 Real-Life Situation: Running Laps on Sports Day

Imagine your physical education teacher says:
- *"Everyone run **5 laps** around the track!"*
- You start at lap 1: You run around the track.
- You increment your counter: *Lap 2!*
- You run again: *Lap 3! Lap 4! Lap 5!*
- Once you finish lap 5, your counter reaches 5, the condition is met, and you stop to drink water!

If programmers had to type the same line of code 1,000 times to display 1,000 products, coding would be exhausting. **Loops** automate repetition, allowing 3 lines of code to process 10,000 items in milliseconds!

---

## 2. 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- Master the 4 core loops in PHP: `while`, `do-while`, `for`, and `foreach`.
- Know exactly when to use each loop type based on the task.
- Prevent disastrous **infinite loops** by properly advancing counters.
- Control loop iteration with `break` (exit early) and `continue` (skip step).
- Iterate through collections and arrays seamlessly with `foreach`.

---

## 3. 👁️ Visual Concept Explanation

### The 4 PHP Loop Types at a Glance

```text
┌──────────────┬───────────────────────────────────────────┬──────────────────────┐
│ Loop Type    │ When to Use It                            │ Example              │
├──────────────┼───────────────────────────────────────────┼──────────────────────┤
│ while        │ When you repeat WHILE a condition is true │ while ($fuel > 0)    │
│ do-while     │ Runs AT LEAST ONCE, checks condition at end│ do { ... } while()  │
│ for          │ When you know the EXACT number of steps   │ for ($i=0; $i<10; $i++)│
│ foreach      │ The king of loops! Iterates through arrays│ foreach ($items as $x)│
└──────────────┴───────────────────────────────────────────┴──────────────────────┘
```

### Anatomy of a `for` Loop

```text
        Initialization       Condition Check        Step / Increment
         ┌──────────┐         ┌───────────┐           ┌──────┐
    for (│  $i = 1  │;        │  $i <= 5  │;          │ $i++ │) {
         └──────────┘         └───────────┘           └──────┘
               │                    │                    │
          Starts counter       Keeps going while    Adds 1 to counter
          at 1                 condition is TRUE    at end of each lap
```

---

## 4. 💻 Code Example: The 4 Loops in Action

```php
<?php
  echo "<h2>1. The While Loop</h2>";
  $count = 1;
  while ($count <= 3) {
    echo "Rocket ignition in: $count...<br>";
    $count++; // Critical! Without this, infinite loop!
  }

  echo "<h2>2. The For Loop (Times Table for 8)</h2>";
  echo "<ul>";
  for ($n = 1; $n <= 5; $n++) {
    echo "<li>8 &times; $n = " . (8 * $n) . "</li>";
  }
  echo "</ul>";

  echo "<h2>3. The Foreach Loop (Array Iteration)</h2>";
  $skills = ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"];
  echo "<div style='display: flex; gap: 8px;'>";
  foreach ($skills as $skill) {
    echo "<span style='background:#7c3aed;color:#fff;padding:4px 8px;border-radius:4px;'>$skill</span>";
  }
  echo "</div>";

  echo "<h2>4. Controlling Loops with Break and Continue</h2>";
  for ($num = 1; $num <= 10; $num++) {
    if ($num === 4) {
      echo "<em>(Skipping lucky 4 with continue)</em><br>";
      continue; // Skips remainder of this iteration
    }
    if ($num === 8) {
      echo "<strong>(Stopped early at 8 with break!)</strong><br>";
      break; // Terminates the loop completely!
    }
    echo "Number: $num<br>";
  }
?>
```

---

## 5. 🔍 Code Explanation: Breaking It Down Line by Line

- `while ($count <= 3)`: Checks condition first. As long as `$count` is `<= 3`, the loop body repeats.
- `for ($n = 1; $n <= 5; $n++)`: Combines counter creation, condition check, and increment into one neat, compact line.
- `foreach ($skills as $skill)`: Automatically steps through every single element in `$skills`, storing the current element in `$skill` until the array ends.
- `continue`: Skips the rest of the current lap and jumps directly to the next iteration.
- `break`: Smashes the emergency brakes, terminating the loop immediately.

---

## 6. 🌍 Real-World Connection: Rendering Products & Timelines

When you open Amazon or Instagram:
- A database query returns 20 products or posts as an array.
- A `foreach` loop takes each product and renders an HTML card with image, title, and price.
- You never write 20 individual HTML blocks—1 loop renders them all!

---

## 7. ⚠️ Common Beginner Traps: The Dreaded Infinite Loop!

```php
// ❌ DANGER: INFINITE LOOP!
$i = 1;
while ($i <= 10) {
  echo $i;
  // FORGOT $i++! $i stays 1 forever!
  // Server CPU hits 100% until max_execution_time kills the script!
}
```

*Rule*: Always ensure your loop has a variable that moves closer to ending the condition on every lap!

---

## 8. 🔮 Predict the Output

```php
<?php
  $sum = 0;
  for ($i = 1; $i <= 3; $i++) {
    $sum += $i;
  }
  echo $sum;
?>
```

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> <code>6</code>! (Lap 1: 0+1=1, Lap 2: 1+2=3, Lap 3: 3+3=6).
</details>

---

## 9. 🕵️ Code Detective: The Negative Step

```php
<?php
  // Developer wanted a countdown from 5 to 1:
  for ($i = 5; $i >= 1; $i++) {
    echo "$i ";
  }
?>
```

- **Find the bug**: The counter uses `$i++` instead of `$i--`!
- **Explain**: `$i` starts at 5 and grows: 6, 7, 8, 9... It will ALWAYS be `>= 1`, creating an infinite loop!
- **Fix**: Change `$i++` to `$i--`.

---

## 10. 🏆 5 Levels of Mastery Exercises

### 🟢 Level 1: Recall
1. Name the four types of loops supported in PHP.
2. Which loop is best suited for looping through every item in an array?
3. What is the difference between `break` and `continue`?

### 🟡 Level 2: Understand
4. How does a `do-while` loop differ from a standard `while` loop when the condition is false from the start?
5. What causes an infinite loop and how do you prevent it?

### 🟠 Level 3: Apply
6. Write a `for` loop that calculates and displays the sum of all even numbers between 2 and 50.

### 🔵 Level 4: Think & Troubleshoot
7. How can you use a nested `for` loop to print a 5x5 grid of asterisks (`*`) in HTML?

### 🟣 Level 5: Create & Build
8. Build an Interactive Multiplication Matrix: write a script with nested loops that outputs an HTML `<table>` showing a full 10x10 multiplication grid with alternating row colors.
