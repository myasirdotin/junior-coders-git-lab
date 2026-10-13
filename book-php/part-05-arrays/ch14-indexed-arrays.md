# Chapter 14: Indexed Arrays

---

## 🌟 Real-Life Story

Think of a carton of 12 eggs. You do not give each egg its own shelf in the fridge. All 12 sit together in one carton, each in its own numbered cup. To pick an egg, you say which cup it is in. An **indexed array** works the same way: one variable holds an ordered list, and each item has a position number that starts at **0**.

---

## 🎯 What You Will Learn

- Create indexed arrays with the short bracket syntax `[...]`.
- Read, change and add items using 0-based **indexes** (position numbers).
- Count the items in an array with `count()`.
- Loop through an array with `for` and `foreach`.
- Avoid the `Undefined array key` warning.

---

## Visual Concept Explanation

An **array** is one variable that stores many values. In an **indexed array**, each value has a number called its **index**.

### The 0-Based Index Rule

```text
Items:   ["Apple", "Banana", "Cherry", "Date"]
             |        |         |        |
Index:       0        1         2        3
```

```text
FIRST ITEM:  $fruits[0]  --> "Apple"
THIRD ITEM:  $fruits[2]  --> "Cherry"
LAST ITEM:   $fruits[count($fruits) - 1]
             --> "Date"
```

⚠️ Arrays in PHP always start counting at 0.

---

## Code Example: Managing a Student Roster

```php
<?php
  // 1. Creating an indexed array
  $roster = ["Amina", "Bilal", "Chandni", "Dania"];

  // 2. Reading items by index
  echo "First student: " . $roster[0] . "<br>"; // Amina
  echo "Third student: " . $roster[2] . "<br>"; // Chandni

  // 3. Changing an item
  $roster[1] = "Babar"; // Replaces Bilal with Babar

  // 4. Adding new students to the end (empty brackets)
  $roster[] = "Erum";
  $roster[] = "Farhan";

  // 5. Total count
  $total = count($roster);
  echo "Total Students Enrolled: <strong>$total</strong><br>";

  // 6. Looping through the array with foreach
  echo "<h3>Class 9 Roll Call:</h3>";
  echo "<ol>";
  foreach ($roster as $student) {
    echo "<li>$student</li>";
  }
  echo "</ol>";

  // 7. Looping with a for loop and the index
  echo "<h3>Index Mapping:</h3>";
  for ($i = 0; $i < count($roster); $i++) {
    echo "Seat #$i: " . $roster[$i] . "<br>";
  }
?>
```

Output:

```text
First student: Amina<br>Third student: Chandni<br>Total Students Enrolled: <strong>6</strong><br><h3>Class 9 Roll Call:</h3><ol><li>Amina</li><li>Babar</li><li>Chandni</li><li>Dania</li><li>Erum</li><li>Farhan</li></ol><h3>Index Mapping:</h3>Seat #0: Amina<br>Seat #1: Babar<br>Seat #2: Chandni<br>Seat #3: Dania<br>Seat #4: Erum<br>Seat #5: Farhan<br>
```

---

## Code Explanation: Breaking It Down Line by Line

- `$roster = ["Amina", ...];`: The short array syntax. It has worked since PHP 5.4 and is the modern style.
- `$roster[1] = "Babar";`: Puts a new value into position 1, replacing the old one.
- `$roster[] = "Erum";`: Empty brackets `[]` tell PHP: *"Add this item at the next free index, at the end."*
- `count($roster)`: Returns how many items the array has (here, `6`).
- `foreach ($roster as $student)`: The simplest loop for arrays. It visits each item from first to last, so you need no counter variable.

---

## 🌍 Real-World Connection: Recorded Lecture Lists

Think of an online course with 50 recorded lessons.

- The web app keeps the lessons in an indexed array: lesson 0, lesson 1, lesson 2 and so on.
- When you tap "Next Lesson", the app adds 1 to the current index: `$currentIndex++`.
- When the index reaches `count($lessons) - 1`, the app knows you are on the last lesson.

---

## 🔮 Predict the Output

```php
<?php
  $numbers = [10, 20, 30];
  $numbers[] = 40;
  echo $numbers[3];
?>
```

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> <code>40</code>. The first indexes were 0, 1 and 2. The empty brackets added 40 at index 3.
</details>

---

## 🕵️ Code Detective: The Broken Loop Boundary

```php
<?php
  $colors = ["Red", "Green", "Blue"];
  // Trying to print all colours:
  for ($i = 0; $i <= count($colors); $i++) {
    echo $colors[$i] . " ";
  }
?>
```

Output (the colours, then a warning):

```text
Red Green Blue
Warning: Undefined array key 3
```

- **Find the bug**: The loop uses `<= count($colors)` instead of `< count($colors)`.
- **Explain**: `count($colors)` is 3, so the loop also runs with `$i = 3`. `$colors[3]` does not exist.
- **Fix**: Change `$i <= count($colors)` to `$i < count($colors)`.

---

## ⚠️ Common Mistake

**The off-by-one error: thinking arrays count from 1.**

- ❌ *Wrong*:
  ```php
  <?php
  $planets = ["Mercury", "Venus", "Earth"];
  echo "The first planet is " . $planets[1];
  echo "<br>The last planet is " . $planets[3];
  ```
- 😕 *What happens*: The first line prints `Venus`, the **second** item. The second line shows *Warning: Undefined array key 3*, because a 3-item array only has indexes 0, 1 and 2.
- ✅ *Fixed*:
  ```php
  <?php
  $planets = ["Mercury", "Venus", "Earth"];
  echo "The first planet is " . $planets[0];
  echo "<br>The last planet is " . $planets[count($planets) - 1];
  ```
  Output:
  ```text
  The first planet is Mercury<br>The last planet is Earth
  ```

---

## ✍️ Try It

Open the [PHP Console](../studios/php-console/) and type:

```php
<?php
$tasks = ["Revise maths", "Read chapter 3"];
$tasks[] = "Pack sports kit";
echo "I have " . count($tasks) . " tasks:<br>";
foreach ($tasks as $task) {
  echo "- $task<br>";
}
```

Output:

```text
I have 3 tasks:<br>- Revise maths<br>- Read chapter 3<br>- Pack sports kit<br>
```

*Hint*: Add one more task with `$tasks[] = ...;`. Then print only the first task using its index.

---

## 📝 Recap

- An indexed array keeps an ordered list in **one** variable.
- Indexes start at **0**, so the last index is `count($array) - 1`.
- `$array[] = value;` adds an item at the end; `$array[2] = value;` changes item number 2.
- `count()` tells you how many items there are.
- `foreach` is the safest way to visit every item; a `for` loop must use `<`, not `<=`.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. What index does the very first item of an indexed array have?
2. Which function returns the number of items in an array?
3. How do you add a new item to the end of an array using empty brackets?

<details>
<summary>Show answer</summary>

1. **`0`**.
2. **`count()`**.
3. `$array[] = "new item";`

</details>

### 🟡 Level 2: Apply
1. An array has a `count()` of 8. What is the index of its last item?
2. Why is `foreach` usually safer than `for` for looping through an array?
3. Create an array of 3 science books and print them as an HTML list (`<ul>` and `<li>`) with `foreach`.

<details>
<summary>Show answer</summary>

1. **7** (8 - 1).
2. `foreach` visits exactly the items that exist. It cannot go one step too far, so there is no off-by-one error.
3. One possible answer:

```php
<?php
$books = ["A Journey into Space", "Wonders of the Ocean", "The Living Cell"];
echo "<ul>";
foreach ($books as $book) {
  echo "<li>$book</li>";
}
echo "</ul>";
```

Output:

```text
<ul><li>A Journey into Space</li><li>Wonders of the Ocean</li><li>The Living Cell</li></ul>
```

</details>

### 🔴 Level 3: Challenge
Build a quiz score analyser.

1. Store 10 exam scores in an array: `[72, 88, 95, 64, 81, 90, 55, 78, 84, 69]`.
2. With one `foreach` loop, work out the total, the highest score, the lowest score, and how many scores are above 80.
3. Print the class average (rounded to 1 decimal place) and the other three results.
4. Extra: print the scores as a list where every second row has a light background (hint: `$i % 2` in a `for` loop).

<details>
<summary>Show one possible answer</summary>

```php
<?php
$scores = [72, 88, 95, 64, 81, 90, 55, 78, 84, 69];
$total = 0;
$highest = $scores[0];
$lowest = $scores[0];
$above80 = 0;

foreach ($scores as $score) {
  $total += $score;
  if ($score > $highest) {
    $highest = $score;
  }
  if ($score < $lowest) {
    $lowest = $score;
  }
  if ($score > 80) {
    $above80++;
  }
}

$average = round($total / count($scores), 1);
echo "Average: $average<br>";
echo "Highest: $highest<br>";
echo "Lowest: $lowest<br>";
echo "Above 80: $above80";
```

Output:

```text
Average: 77.6<br>Highest: 95<br>Lowest: 55<br>Above 80: 5
```

Extra:

```php
<?php
$scores = [72, 88, 95];
for ($i = 0; $i < count($scores); $i++) {
  $bg = ($i % 2 == 1) ? "#eef" : "#fff";
  echo "<p style='background:$bg'>Student $i: " . $scores[$i] . "</p>";
}
```

Output:

```text
<p style='background:#fff'>Student 0: 72</p><p style='background:#eef'>Student 1: 88</p><p style='background:#fff'>Student 2: 95</p>
```

</details>
