# Chapter 15: Associative Arrays 🏷️

---

## 🌟 Real-Life Story

Look at your school ID card. It does not just list facts like "Zainab, 15, Emerald". Each fact has a label next to it: **Name:** Zainab Ali, **Age:** 15, **House:** Emerald. The labels tell you what each value means. An **associative array** works the same way: every value is stored under a name called a **key**.

---

## 🎯 What You Will Learn

- Create associative arrays with the arrow `=>`.
- Read and change values using text keys such as `"name"`.
- Loop through keys and values with `foreach ($array as $key => $value)`.
- Build a **multi-dimensional array** (an array of arrays) to hold a whole table.
- Look inside an array with `print_r()`.

---

## 👁️ Visual Concept Explanation

A **key-value pair** is a label (the key) joined to a piece of data (the value).

### Key-Value Pairing Architecture

```text
   KEY            ARROW      VALUE
+------------+    +----+    +--------------+
| "username" |    | => |    | "coder_amna" |
+------------+    +----+    +--------------+
```

```text
$student = [
  "name"  => "Zainab Ali",
  "grade" => 9,
  "house" => "Emerald"
];

echo $student["name"]; // Zainab Ali
```

| Indexed array | Associative array |
| :--- | :--- |
| Keys are numbers: 0, 1, 2 | Keys are names: "name", "grade" |
| `$roster[0]` | `$student["name"]` |
| Good for lists of similar things | Good for the details of one thing |

---

## 💻 Code Example: Teacher Card & Exam Table

```php
<?php
  // 1. A basic associative array
  $teacher = [
    "name"       => "Mr. Imran Shah",
    "subject"    => "Computer Science",
    "experience" => "12 years",
    "room"       => "Lab 3"
  ];

  echo "Teacher: " . $teacher["name"] . " teaches " . $teacher["subject"] . "<br>";

  // 2. Changing and adding keys
  $teacher["room"] = "Tech Lab 1";             // Update
  $teacher["email"] = "i.shah@school.example.org"; // Add a new key

  // 3. Looping through all keys and values
  echo "<h3>Teacher Information Card</h3>";
  echo "<ul>";
  foreach ($teacher as $key => $value) {
    $label = ucfirst($key);
    echo "<li><strong>$label:</strong> $value</li>";
  }
  echo "</ul>";

  // 4. A multi-dimensional array (an array of arrays)
  $courseStudents = [
    ["name" => "Ali",     "score" => 92, "passed" => true],
    ["name" => "Bisma",   "score" => 88, "passed" => true],
    ["name" => "Chandni", "score" => 44, "passed" => false],
  ];

  echo "<h3>Class Exam Table</h3>";
  echo "<table border='1'>";
  echo "<tr><th>Student</th><th>Score</th><th>Status</th></tr>";
  foreach ($courseStudents as $s) {
    $badge = $s["passed"] ? "PASS" : "NEEDS SUPPORT";
    echo "<tr><td>{$s['name']}</td><td>{$s['score']}</td><td>$badge</td></tr>";
  }
  echo "</table>";
?>
```

Output (line breaks added between the parts so it fits the page):

```text
Teacher: Mr. Imran Shah teaches Computer Science<br>
<h3>Teacher Information Card</h3><ul>
<li><strong>Name:</strong> Mr. Imran Shah</li>
<li><strong>Subject:</strong> Computer Science</li>
<li><strong>Experience:</strong> 12 years</li>
<li><strong>Room:</strong> Tech Lab 1</li>
<li><strong>Email:</strong> i.shah@school.example.org</li>
</ul><h3>Class Exam Table</h3><table border='1'>
<tr><th>Student</th><th>Score</th><th>Status</th></tr>
<tr><td>Ali</td><td>92</td><td>PASS</td></tr>
<tr><td>Bisma</td><td>88</td><td>PASS</td></tr>
<tr><td>Chandni</td><td>44</td><td>NEEDS SUPPORT</td></tr>
</table>
```

---

## 🔍 Code Explanation: Breaking It Down Line by Line

- `=>`: The **double arrow** joins the key on the left to the value on the right.
- `$teacher["email"] = "...";`: If the key `"email"` does not exist yet, PHP creates it.
- `foreach ($teacher as $key => $value)`: On every pass, `$key` holds the label (e.g. `"subject"`) and `$value` holds the data (e.g. `"Computer Science"`).
- `ucfirst($key)`: A built-in function that makes the first letter uppercase: `"room"` becomes `"Room"`.
- `$s["passed"] ? "PASS" : "NEEDS SUPPORT"`: The short if/else from Chapter 8.
- `{$s['name']}`: Inside double quotes, wrap an array value with a text key in curly braces `{}` so PHP reads it correctly.

---

## 🌍 Real-World Connection: Database Rows & JSON

When PHP reads a row from a MySQL database (you will learn how in the MySQL track):

- Each row arrives as an associative array, for example
  `["id" => 101, "title" => "The Living Cell", "copies" => 4]`.
- The built-in `json_encode()` can turn it into **JSON**, the text format apps use to share data:
  `{"id":101,"title":"The Living Cell","copies":4}`.

---

## 🔮 Predict the Output

```php
<?php
  $profile = ["city" => "Jammu"];
  $profile["city"] = "Srinagar";
  $profile["country"] = "India";
  echo count($profile);
?>
```

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> <code>2</code>. The key "city" was overwritten, not copied. "country" added a second key.
</details>

---

## 🕵️ Code Detective: The Missing Arrow

```php
<?php
  $book = [
    "title" = "PHP Basics",
    "pages" = 350
  ];
?>
```

- **Find the bug**: The coder used `=` instead of `=>`.
- **Explain**: PHP stops with a *Parse error: syntax error, unexpected token "=", expecting "]"*. Inside an array, keys are joined to values with `=>`.
- **Fix**:
  ```php
  $book = [
    "title" => "PHP Basics",
    "pages" => 350
  ];
  ```

---

## ⚠️ Common Mistake

**Forgetting the quotes around a key.**

- ❌ *Wrong*:
  ```php
  <?php
  $teacher = ["name" => "Ms. Hafsa"];
  echo $teacher[name];
  ```
- 😕 *What happens*: In PHP 8 the script stops with *Fatal error: Uncaught Error: Undefined constant "name"*. Without quotes, PHP thinks `name` is a constant, not a text key.
- ✅ *Fixed*:
  ```php
  <?php
  $teacher = ["name" => "Ms. Hafsa"];
  echo $teacher["name"];
  ```
  Output: `Ms. Hafsa`

A second mistake: writing `"Hello $student['name']"` inside double quotes. That is a parse error. Write `"Hello {$student['name']}"` instead.

---

## ✍️ Try It

Open the [PHP Console](../studios/php-console/) and type:

```php
<?php
$bookshop = [
  "name" => "Noor Books",
  "city" => "Srinagar",
  "open" => "9:00"
];
$bookshop["phone"] = "0194-000000";
print_r($bookshop);
```

Output:

```text
Array
(
    [name] => Noor Books
    [city] => Srinagar
    [open] => 9:00
    [phone] => 0194-000000
)
```

*Hint*: `print_r()` prints the whole array with its keys, which is handy when you are checking your work. Now change `"open"` to `"8:30"` and print only that value.

---

## 📝 Recap

- An associative array stores values under **keys** (names) instead of numbers.
- `=>` joins a key to its value: `"name" => "Zainab"`.
- Assigning to a new key adds it; assigning to an existing key replaces its value.
- `foreach ($array as $key => $value)` gives you both the label and the data.
- An array of arrays (multi-dimensional) can hold a whole table, one inner array per row.
- `print_r()` shows everything inside an array.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which operator joins a key to a value in an associative array?
2. How do you read the value stored under the key `"email"` in the array `$user`?
3. Which function prints a whole array with its keys, for checking?

<details>
<summary>Show answer</summary>

1. **`=>`** (the double arrow).
2. `$user["email"]`
3. **`print_r()`**.

</details>

### 🟡 Level 2: Apply
1. Why is an associative array easier to read than an indexed array for a student's details?
2. Create an associative array for a calculator sold in the school shop (`brand`, `model`, `price`, `inStock`). Print each property as a line `key: value` with `foreach`.

<details>
<summary>Show answer</summary>

1. The keys explain the data. `$student["house"]` says what it is; `$student[2]` does not.
2. One possible answer:

```php
<?php
$calculator = [
  "brand" => "SciCalc",
  "model" => "SC-82",
  "price" => 15.5,
  "inStock" => "yes"
];
foreach ($calculator as $key => $value) {
  echo "$key: $value<br>";
}
```

Output:

```text
brand: SciCalc<br>model: SC-82<br>price: 15.5<br>inStock: yes<br>
```

</details>

### 🔴 Level 3: Challenge
Build a simple weather board.

1. Create a multi-dimensional array with 3 cities. Each city has `name`, `temp` and `condition`.
2. Loop through it and print one `<div>` card per city: name in `<h3>`, then the temperature and condition.
3. Add the word "(warm)" after the temperature when it is 25 or more.
4. Extra: before reading a key that might be missing, check it with `isset($city["humidity"])` (Chapter 13). This avoids an *Undefined array key* warning.

<details>
<summary>Show one possible answer</summary>

```php
<?php
$cities = [
  ["name" => "Srinagar", "temp" => 18, "condition" => "Cloudy"],
  ["name" => "Chennai",  "temp" => 31, "condition" => "Sunny"],
  ["name" => "Leh",      "temp" => 5,  "condition" => "Snowy"],
];
foreach ($cities as $city) {
  $note = ($city["temp"] >= 25) ? " (warm)" : "";
  echo "<div><h3>{$city['name']}</h3>";
  echo "<p>{$city['temp']}°C$note, {$city['condition']}</p></div>";
}
```

Output:

```text
<div><h3>Srinagar</h3><p>18°C, Cloudy</p></div><div><h3>Chennai</h3><p>31°C (warm), Sunny</p></div><div><h3>Leh</h3><p>5°C, Snowy</p></div>
```

</details>
