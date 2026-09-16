# Chapter 16: Essential Array Functions 🧰⚡

---

## 1. 🌟 Real-Life Situation: Sorting the Bookshelf

Imagine your school librarian receives a shipment of 50 new science textbooks in a cardboard box:
- The librarian doesn't leave them jumbled in a messy pile!
- They use systematic techniques:
  1. **Sort alphabetically** by author's last name.
  2. **Search** if a specific title is present.
  3. **Add** new titles to the end of the shelf.
  4. **Remove** damaged books from the collection.

PHP provides a comprehensive suite of built-in **Array Functions** to sort, search, slice, merge, and transform arrays with zero manual loops!

---

## 2. 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- Sort indexed arrays with `sort()` and `rsort()`.
- Sort associative arrays preserving keys with `asort()` and `ksort()`.
- Search arrays with `in_array()` and `array_search()`.
- Manipulate stacks and queues with `array_push()`, `array_pop()`, `array_shift()`.
- Combine and slice collections with `array_merge()` and `array_slice()`.

---

## 3. 👁️ Visual Concept Explanation

### The Array Sorting Compass

```text
┌──────────────┬──────────────────────────────┬───────────────────────────────────┐
│ Function     │ Sort Direction               │ Key Behavior                      │
├──────────────┼──────────────────────────────┼───────────────────────────────────┤
│ sort()       │ Ascending (A-Z, 0-9)         │ Re-indexes with numbers (0, 1, 2) │
│ rsort()      │ Descending (Z-A, 9-0)        │ Re-indexes with numbers (0, 1, 2) │
│ asort()      │ Ascending by VALUE           │ PRESERVES original custom keys!   │
│ arsort()     │ Descending by VALUE          │ PRESERVES original custom keys!   │
│ ksort()      │ Ascending by KEY name        │ Sorts alphabetically by KEY!      │
│ krsort()     │ Descending by KEY name       │ Sorts reverse by KEY!             │
└──────────────┴──────────────────────────────┴───────────────────────────────────┘
```

### Stacks & Queues: Adding and Removing

```text
array_unshift()  -->  [  Item 1,  Item 2,  Item 3  ]  <--  array_push()
(Add to FRONT)                                            (Add to END)

array_shift()    <--  [  Item 1,  Item 2,  Item 3  ]  -->  array_pop()
(Remove FRONT)                                            (Remove END)
```

---

## 4. 💻 Code Example: Array Operations Lab

```php
<?php
  // 1. Sorting Indexed Arrays
  $scores = [78, 95, 62, 88, 100];
  sort($scores); // Sorts in-place ascending
  echo "Sorted Scores: " . implode(", ", $scores) . "<br>"; // 62, 78, 88, 95, 100

  // 2. Sorting Associative Arrays (Preserving Keys!)
  $classAges = ["Zayn" => 16, "Amina" => 14, "Bilal" => 15];
  asort($classAges); // Sorts by age (value), keeping names attached!
  echo "<h3>Sorted by Age (Ascending):</h3>";
  foreach ($classAges as $name => $age) {
    echo "$name is $age years old.<br>";
  }

  // 3. Searching Collections
  $inventory = ["Laptop", "Tablet", "Mouse", "Keyboard"];
  if (in_array("Mouse", $inventory)) {
    echo "<p style='color:green;'>✅ Mouse is in stock!</p>";
  }

  $mouseIndex = array_search("Mouse", $inventory);
  echo "Found Mouse at index: $mouseIndex<br>";

  // 4. Stacks & Queues (Push & Pop)
  $queue = ["First Customer", "Second Customer"];
  array_push($queue, "Third Customer"); // Adds to end
  $served = array_shift($queue); // Removes from front: "First Customer"
  echo "Served: $served! Remaining in queue: " . count($queue) . "<br>";

  // 5. Merging Two Arrays
  $morningTasks = ["Review emails", "Team standup"];
  $afternoonTasks = ["Write PHP code", "Deploy update"];
  $allTasks = array_merge($morningTasks, $afternoonTasks);
  echo "Total Tasks Today: " . count($allTasks);
?>
```

---

## 5. 🔍 Code Explanation: Breaking It Down Line by Line

- `implode(", ", $scores)`: Glues array elements together into a readable string separated by commas. (The reverse of `explode()`).
- `sort($scores)`: Modifies the original array directly (in-place). Does not return a new array.
- `asort($classAges)`: The `"a"` stands for **associative**. It sorts values while keeping the key `"Zayn"` attached to `16`.
- `in_array("Mouse", $inventory)`: Returns boolean `true` if `"Mouse"` exists inside the array.
- `array_merge($a, $b)`: Combines two arrays into one unified list.

---

## 6. 🌍 Real-World Connection: Leaderboards & Feeds

In competitive gaming (like Fortnite or Chess.com):
- Hundreds of player scores are loaded into an array.
- `arsort($players)` sorts the leaderboard descending by points while keeping player usernames attached.
- `array_slice($players, 0, 10)` extracts the top 10 champions for the homepage!

---

## 7. ⚠️ Common Beginner Traps

1. **Assigning Sort Output**:
   ```php
   $sorted = sort($items); // ❌ BUG! sort() returns boolean TRUE, not the sorted array!
   // ✅ Correct:
   sort($items); // $items is now sorted!
   ```
2. **Using `sort()` on Associative Arrays**:
   Using plain `sort()` on an associative array wipes out your text keys and replaces them with 0, 1, 2! Always use `asort()` or `ksort()`!

---

## 8. 🔮 Predict the Output

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
<strong>Answer:</strong> <code>AB</code>! ("C" was pushed onto the end, and then immediately popped off).
</details>

---

## 9. 🕵️ Code Detective: The Lost Keys

```php
<?php
  $prices = ["Apple" => 1.50, "Banana" => 0.75, "Cherry" => 3.00];
  sort($prices);
  print_r($prices);
?>
```

- **Find the bug**: The fruit names ("Apple", "Banana", "Cherry") have vanished, replaced by `0, 1, 2`!
- **Explain**: `sort()` does not preserve keys.
- **Fix**: Change `sort($prices);` to `asort($prices);`.

---

## 10. 🏆 5 Levels of Mastery Exercises

### 🟢 Level 1: Recall
1. What function checks if a value exists inside an array?
2. What function joins array items into a single string separated by delimiters?
3. What is the difference between `sort()` and `rsort()`?

### 🟡 Level 2: Understand
4. Why does `sort()` destroy associative keys while `asort()` preserves them?
5. How does `array_unique()` clean up duplicate entries in an array?

### 🟠 Level 3: Apply
6. Take a string of comma-separated student names: `"Sara, Ali, Zayn, Bilal, Dania"`. Use `explode()` to turn it into an array, sort it alphabetically, and print as an HTML list.

### 🔵 Level 4: Think & Troubleshoot
7. How does `array_filter()` allow you to filter out all failing marks (< 50) from an array of exam scores using a callback function?

### 🟣 Level 5: Create & Build
8. Build a Shopping Cart Manager: implement functions to `addItem(&$cart, $item)`, `removeItem(&$cart, $itemName)`, `calculateCartTotal($cart)`, and `sortCartByPrice(&$cart)`. Test with 5 real products.
