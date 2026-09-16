# Chapter 14: Indexed Arrays 📚📦

---

## 1. 🌟 Real-Life Situation: The Egg Carton

Imagine opening a carton of 12 fresh eggs:
- The carton has 12 individual compartments molded in a neat line.
- You don't give every individual egg its own separate refrigerator shelf!
- You keep all 12 eggs together inside one single carton.
- To pick an egg, you reference its compartment position.

In computer science, an **Indexed Array** is a single variable that holds an ordered list of items:
- Instead of creating 50 variables for 50 students (`$student1`, `$student2`, ...), you create **one** array: `$students`.
- In computer programming, the compartments are numbered starting at **0**!

---

## 2. 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- Create indexed arrays using modern bracket syntax `[...]`.
- Access, update, and append elements using 0-based numerical indices.
- Count total elements in an array using `count()`.
- Iterate through arrays with both `for` loops and `foreach` loops.
- Prevent `Undefined array key` offset notices.

---

## 3. 👁️ Visual Concept Explanation

### The 0-Based Index Rule

```text
Array Items:     ["Apple", "Banana", "Cherry", "Date"]
                    │         │         │        │
Indices:            0         1         2        3
```

```text
FIRST ITEM:   $fruits[0]  --> "Apple"
THIRD ITEM:   $fruits[2]  --> "Cherry"
LAST ITEM:    $fruits[count($fruits) - 1] --> "Date"

⚠️ Computer scientists ALWAYS count starting from 0!
```

---

## 4. 💻 Code Example: Managing a Student Roster

```php
<?php
  // 1. Creating an indexed array
  $roster = ["Amina", "Bilal", "Chaudhry", "Dania"];

  // 2. Reading elements by index
  echo "First student: " . $roster[0] . "<br>"; // Amina
  echo "Third student: " . $roster[2] . "<br>"; // Chaudhry

  // 3. Updating an element
  $roster[1] = "Babar"; // Replaces Bilal with Babar

  // 4. Appending a new student to the end (empty bracket syntax)
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

  // 7. Looping with for loop and numerical index
  echo "<h3>Index Mapping:</h3>";
  for ($i = 0; $i < count($roster); $i++) {
    echo "Seat #$i: " . $roster[$i] . "<br>";
  }
?>
```

---

## 5. 🔍 Code Explanation: Breaking It Down Line by Line

- `$roster = ["Amina", ...];`: Modern short array syntax introduced in PHP 5.4.
- `$roster[] = "Erum";`: Empty square brackets `[]` tells PHP: *"Find the next highest index and append this item to the end of the array!"*
- `count($roster)`: Returns the total count of elements (here, `6`).
- `foreach ($roster as $student)`: The cleanest way to loop. It visits each item from first to last without needing manual index counter variables.

---

## 6. 🌍 Real-World Connection: Playlists & Search Results

Look at **Spotify**:
- When you click on a playlist with 50 songs, Spotify stores those song tracks in an indexed array: `[$track0, $track1, $track2, ...]`.
- When you tap "Next Track", the player simply increments the current index: `currentIndex++`!

---

## 7. ⚠️ Common Beginner Traps

1. **The Off-By-One Error**:
   If an array has 5 items, their indices are `0, 1, 2, 3, 4`.
   Trying to access `$array[5]` throws a `Warning: Undefined array key 5`!
2. **Thinking Arrays Count from 1**:
   Remember: `$array[1]` is the **second** item, not the first!

---

## 8. 🔮 Predict the Output

```php
<?php
  $numbers = [10, 20, 30];
  $numbers[] = 40;
  echo $numbers[3];
?>
```

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> <code>40</code>! The initial indices were 0, 1, 2. The empty bracket appended 40 at index 3.
</details>

---

## 9. 🕵️ Code Detective: The Broken Loop Boundary

```php
<?php
  $colors = ["Red", "Green", "Blue"];
  // Trying to print all colors:
  for ($i = 0; $i <= count($colors); $i++) {
    echo $colors[$i] . " ";
  }
?>
```

- **Find the bug**: The loop uses `<= count($colors)` instead of `< count($colors)`!
- **Explain**: `count($colors)` is 3. The loop tries to access `$colors[3]`, which does not exist!
- **Fix**: Change `$i <= count($colors)` to `$i < count($colors)`.

---

## 10. 🏆 5 Levels of Mastery Exercises

### 🟢 Level 1: Recall
1. What index represents the very first element of an indexed array?
2. What function returns the number of elements in an array?
3. How do you append a new item to an existing array using shorthand brackets?

### 🟡 Level 2: Understand
4. If an array has a `count()` of 8, what is the index of the last element?
5. Why is a `foreach` loop generally safer than a `for` loop for iterating through arrays?

### 🟠 Level 3: Apply
6. Create an array of 5 top science fiction books. Use a loop to print them as an HTML bulleted list with alternating background colors.

### 🔵 Level 4: Think & Troubleshoot
7. How does `array_values()` re-index an array after deleting an element with `unset($arr[1])`?

### 🟣 Level 5: Create & Build
8. Build a Quiz Score Analyzer: store 10 student exam scores in an array. Calculate the class average, find the highest and lowest scores, and count how many students scored above 80.
