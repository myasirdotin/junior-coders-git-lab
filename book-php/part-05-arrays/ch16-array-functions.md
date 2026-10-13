# Chapter 16: Essential Array Functions 🧰

---

## 🌟 Real-Life Story

The school librarian receives a box of 50 new science books. She does not leave them in a messy pile. She sorts them by author, checks whether a title is already on the shelf, adds new ones at the end and removes damaged copies. Each of these jobs follows a simple, well-known method. PHP gives you ready-made **array functions** for the same jobs: sorting, searching, adding, removing and joining lists.

---

## 🎯 What You Will Learn

- Sort indexed arrays with `sort()` and `rsort()`.
- Sort associative arrays and keep their keys with `asort()`, `arsort()` and `ksort()`.
- Search arrays with `in_array()` and `array_search()`.
- Add and remove items at either end with `array_push()`, `array_pop()`, `array_shift()` and `array_unshift()`.
- Join arrays with `array_merge()` and turn an array into text with `implode()`.

---

## 👁️ Visual Concept Explanation

### The Array Sorting Compass

| Function | Sorts by | Keys |
| :--- | :--- | :--- |
| `sort()` | Value, low to high (A-Z, 0-9) | Replaced by 0, 1, 2 |
| `rsort()` | Value, high to low (Z-A, 9-0) | Replaced by 0, 1, 2 |
| `asort()` | Value, low to high | **Kept** |
| `arsort()` | Value, high to low | **Kept** |
| `ksort()` | Key, A-Z | **Kept** |
| `krsort()` | Key, Z-A | **Kept** |

### Stacks & Queues: Adding and Removing

```text
 array_unshift()        array_push()
 (add to FRONT)         (add to END)
       |                      |
       v                      v
     [ Item 1, Item 2, Item 3 ]
       |                      |
       v                      v
 array_shift()          array_pop()
 (take from FRONT)      (take from END)
```

A **queue** is a line where the first to join is the first to leave (`array_push` + `array_shift`). A **stack** is a pile where the last added is the first taken (`array_push` + `array_pop`).

---

## 💻 Code Example: Array Operations Lab

```php
<?php
  // 1. Sorting an indexed array
  $scores = [78, 95, 62, 88, 100];
  sort($scores); // Sorts the array itself, low to high
  echo "Sorted Scores: " . implode(", ", $scores) . "<br>";

  // 2. Sorting an associative array and keeping keys
  $classAges = ["Zayn" => 16, "Amina" => 14, "Bilal" => 15];
  asort($classAges); // Sorts by age (value), names stay attached
  echo "<h3>Sorted by Age (Ascending):</h3>";
  foreach ($classAges as $name => $age) {
    echo "$name is $age years old.<br>";
  }

  // 3. Searching
  $labKit = ["Microscope", "Beaker", "Magnet", "Thermometer"];
  if (in_array("Magnet", $labKit)) {
    echo "<p>Magnet is in the lab kit!</p>";
  }

  $magnetIndex = array_search("Magnet", $labKit);
  echo "Found Magnet at index: $magnetIndex<br>";

  // 4. A queue (push to the end, shift from the front)
  $queue = ["First Visitor", "Second Visitor"];
  array_push($queue, "Third Visitor"); // Adds to the end
  $served = array_shift($queue);       // Takes "First Visitor" from the front
  echo "Served: $served! Remaining in queue: " . count($queue) . "<br>";

  // 5. Merging two arrays
  $morningTasks = ["Assembly", "Maths class"];
  $afternoonTasks = ["Science lab", "Library hour"];
  $allTasks = array_merge($morningTasks, $afternoonTasks);
  echo "Total Tasks Today: " . count($allTasks);
?>
```

Output:

```text
Sorted Scores: 62, 78, 88, 95, 100<br><h3>Sorted by Age (Ascending):</h3>Amina is 14 years old.<br>Bilal is 15 years old.<br>Zayn is 16 years old.<br><p>Magnet is in the lab kit!</p>Found Magnet at index: 2<br>Served: First Visitor! Remaining in queue: 2<br>Total Tasks Today: 4
```

---

## 🔍 Code Explanation: Breaking It Down Line by Line

- `implode(", ", $scores)`: Joins the items into one string, with `", "` between them.
- `sort($scores)`: Changes the original array **in place** (the array itself is sorted). It does not give back a new array.
- `asort($classAges)`: The `a` stands for **associative**. It sorts by value but keeps `"Zayn"` attached to `16`.
- `in_array("Magnet", $labKit)`: Returns `true` if `"Magnet"` is somewhere in the array.
- `array_search("Magnet", $labKit)`: Returns the **index** (or key) where it was found, here `2`. If the value is not there, it returns `false`.
- `array_merge($a, $b)`: Joins two arrays into one longer list.

---

## 🌍 Real-World Connection: Charity Drive Totals

In a school charity drive tracker:

- The amount collected by each class is stored in an associative array: `"8B" => 4200`.
- `arsort($classTotals)` sorts the totals from highest to lowest and keeps each class name attached.
- `array_slice($classTotals, 0, 3)` takes the first 3 entries, so the homepage can thank the top 3 classes.

---

## 🔮 Predict the Output

```php
<?php
  $stack = ["A", "B"];
  array_push($stack, "C");
  array_pop($stack);
  echo implode("", $stack);
?>
```

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> <code>AB</code>. "C" was pushed onto the end and then popped straight off again.
</details>

---

## 🕵️ Code Detective: The Lost Keys

```php
<?php
  $prices = ["Apple" => 1.50, "Banana" => 0.75, "Cherry" => 3.00];
  sort($prices);
  print_r($prices);
?>
```

Output:

```text
Array
(
    [0] => 0.75
    [1] => 1.5
    [2] => 3
)
```

- **Find the bug**: The fruit names have vanished and been replaced by `0, 1, 2`.
- **Explain**: `sort()` throws away the keys.
- **Fix**: Change `sort($prices);` to `asort($prices);`. Now the output keeps `[Banana] => 0.75`, `[Apple] => 1.5`, `[Cherry] => 3`.

---

## ⚠️ Common Mistake

**Saving the result of `sort()` in a variable.**

- ❌ *Wrong*:
  ```php
  <?php
  $items = ["pen", "book", "ruler"];
  $sorted = sort($items);
  var_dump($sorted);
  ```
- 😕 *What happens*: The output is `bool(true)`. `sort()` returns `true`, not the sorted list. The sorted list is in `$items`.
- ✅ *Fixed*:
  ```php
  <?php
  $items = ["pen", "book", "ruler"];
  sort($items);
  echo implode(", ", $items);
  ```
  Output: `book, pen, ruler`

A second mistake: using plain `sort()` on an associative array. It wipes out your text keys, as the Code Detective showed. Use `asort()` or `ksort()` instead.

---

## ✍️ Try It

Open the [PHP Console](../studios/php-console/) and type:

```php
<?php
$planets = ["Mars", "Earth", "Venus", "Jupiter"];
rsort($planets);
echo implode(" | ", $planets) . "<br>";
array_unshift($planets, "Sun");
echo "First item now: " . $planets[0];
```

Output:

```text
Venus | Mars | Jupiter | Earth<br>First item now: Sun
```

*Hint*: `rsort()` sorts from Z to A. Try `sort()` instead and see the order flip. Then use `array_pop()` to remove the last planet.

---

## 📝 Recap

- `sort()` / `rsort()` sort the array itself and renumber the keys 0, 1, 2.
- `asort()` / `arsort()` sort by value and **keep** the keys; `ksort()` sorts by key.
- `in_array()` answers "is it there?"; `array_search()` answers "where is it?".
- `array_push()` / `array_pop()` work at the end; `array_unshift()` / `array_shift()` work at the front.
- `array_merge()` joins arrays; `implode()` joins items into one string.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which function checks whether a value is inside an array?
2. Which function joins array items into one string with a separator?
3. What is the difference between `sort()` and `rsort()`?

<details>
<summary>Show answer</summary>

1. **`in_array()`**.
2. **`implode()`**.
3. `sort()` sorts from low to high (A-Z); `rsort()` sorts from high to low (Z-A).

</details>

### 🟡 Level 2: Apply
1. Why does `sort()` lose associative keys while `asort()` keeps them?
2. You have `$donations = ["7A" => 300, "7B" => 550, "7C" => 420];`. Sort it from highest to lowest, keeping the class names, and print each line as `7B: 550`.

<details>
<summary>Show answer</summary>

1. `sort()` is made for simple lists: after sorting it gives every item a new number key. `asort()` moves each key together with its value.
2. One possible answer:

```php
<?php
$donations = ["7A" => 300, "7B" => 550, "7C" => 420];
arsort($donations);
foreach ($donations as $class => $amount) {
  echo "$class: $amount<br>";
}
```

Output:

```text
7B: 550<br>7C: 420<br>7A: 300<br>
```

</details>

### 🔴 Level 3: Challenge
Turn a line of text into a sorted class list.

1. Start with the string `"Sara,Ali,Zayn,Bilal,Dania"`.
2. Use `explode(",", $text)` to split it into an array. `explode()` is the opposite of `implode()`: it cuts a string at every comma.
3. Sort the names alphabetically.
4. Print them as an HTML list (`<ul>`, `<li>`).
5. Check whether `"Maryam"` is in the list; if not, add her with `array_push()` and print the new count.

<details>
<summary>Show one possible answer</summary>

```php
<?php
$text = "Sara,Ali,Zayn,Bilal,Dania";
$names = explode(",", $text);
sort($names);

echo "<ul>";
foreach ($names as $name) {
  echo "<li>$name</li>";
}
echo "</ul>";

if (!in_array("Maryam", $names)) {
  array_push($names, "Maryam");
}
echo "Students now: " . count($names);
```

Output:

```text
<ul><li>Ali</li><li>Bilal</li><li>Dania</li><li>Sara</li><li>Zayn</li></ul>Students now: 6
```

</details>
