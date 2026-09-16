# Chapter 9: The Switch Statement 🎛️🔄

---

## 1. 🌟 Real-Life Situation: The Vending Machine

Imagine standing in front of a cold drink vending machine:
- You press **Button 1**: Out drops a Lemonade.
- You press **Button 2**: Out drops an Orange Juice.
- You press **Button 3**: Out drops an Iced Tea.
- You press **Button 99**: The machine beeps and displays: *"Invalid Selection!"*

If you wrote this with `if / elseif / elseif / elseif ...`, your code would look long, messy, and repetitive. The **Switch Statement** is designed specifically for this exact scenario: checking a single value against a list of possible matches!

---

## 2. 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- Construct clean `switch` blocks with `case`, `break`, and `default`.
- Understand how fall-through works and why `break` is critical.
- Group multiple cases that share the same output action.
- Compare `switch` vs `if / elseif` chains to choose the cleanest syntax.
- Understand the modern PHP 8 `match` expression alternative.

---

## 3. 👁️ Visual Concept Explanation

### Anatomy of a Switch Statement

```text
  switch ($userRole) {
    case 'admin':       <--- Matches if $userRole === 'admin'
      showDashboard();
      break;            <--- STOPS execution and exits switch!

    case 'editor':      <--- Matches if $userRole === 'editor'
      showEditor();
      break;

    default:            <--- Runs if NO case matched!
      showGuestHome();
      break;
  }
```

### What Happens If You Forget `break;`? (Fall-Through Bug)

```text
case 'apple':
  echo "Red";
  // NO BREAK! Execution slides directly into the next case!
case 'banana':
  echo "Yellow";
  break;

Output if $fruit = 'apple': "RedYellow" 😱!
```

---

## 4. 💻 Code Example: School Timetable Selector

```php
<?php
  $day = date("l"); // Reads today's day name, e.g. "Tuesday"

  echo "<h2>Class 9 Schedule for Today: $day</h2>";

  switch ($day) {
    case "Monday":
      echo "<p>09:00 AM: Mathematics</p>";
      echo "<p>11:00 AM: Physics Lab</p>";
      break;

    case "Tuesday":
      echo "<p>09:00 AM: English Literature</p>";
      echo "<p>11:00 AM: Computer Science (PHP Lab!)</p>";
      break;

    case "Wednesday":
      echo "<p>09:00 AM: Chemistry</p>";
      echo "<p>11:00 AM: History</p>";
      break;

    case "Thursday":
      echo "<p>09:00 AM: Biology</p>";
      echo "<p>11:00 AM: Computer Science (MySQL)</p>";
      break;

    case "Friday":
      echo "<p>09:00 AM: Islamic Studies / Ethics</p>";
      echo "<p>11:00 AM: Physical Education</p>";
      break;

    // Grouping Saturday and Sunday together!
    case "Saturday":
    case "Sunday":
      echo "<p style='color: green;'>🎉 Weekend! No classes today. Time to build side projects!</p>";
      break;

    default:
      echo "<p>Unknown day specified.</p>";
      break;
  }
?>
```

---

## 5. 🔍 Code Explanation: Breaking It Down Line by Line

- `switch ($day)`: Specifies the target variable we are evaluating.
- `case "Monday":`: Compares `$day == "Monday"`. If matched, execution enters here.
- `break;`: Halts execution and jumps to the line immediately following the closing brace `}` of the switch.
- `case "Saturday": case "Sunday":`: When two cases share the exact same logic, stacking them without a `break` between them groups them together seamlessly!
- `default:`: Acts just like the final `else` in an `if` block, handling unexpected values.

---

## 6. 🌍 Real-World Connection: Handling HTTP Status Codes

When web servers return responses, they use status codes:
- 200: OK
- 301: Permanent Redirect
- 404: Not Found
- 500: Internal Server Error

PHP APIs route these codes through switch statements to attach the proper error messages!

---

## 7. ⚠️ Common Beginner Traps

1. **Forgetting `break`**:
   Accidentally omitting `break;` leads to fall-through bugs where unintended cases execute.
2. **Type Coercion in Classic Switch**:
   Classic `switch` uses loose comparison (`==`), which means `case 0:` will match the string `"hello"` in older PHP versions! (In PHP 8, this was made much safer).

---

## 8. 🔮 Predict the Output

```php
<?php
  $tier = "gold";
  switch ($tier) {
    case "bronze": echo "10% ";
    case "silver": echo "20% ";
    case "gold":   echo "30% ";
    case "vip":    echo "50% ";
    default:       echo "Done";
  }
?>
```

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> <code>30% 50% Done</code>! Because there are NO <code>break;</code> statements, once it matches "gold", it executes every subsequent case and default!
</details>

---

## 9. 🕵️ Code Detective: The Mismatched Default

```php
<?php
  $cmd = "start";
  switch ($cmd) {
    default:
      echo "Unknown command";
    case "start":
      echo "Starting engine...";
      break;
  }
?>
```

- **Find the surprise**: `default` is placed at the top without a `break;`!
- **Explain**: While placing `default` at the top is legal syntax, without a `break`, if an unknown command hits `default`, it will fall through into `"start"`!
- **Fix**: Always put `default` at the very bottom of your switch block.

---

## 10. 🏆 5 Levels of Mastery Exercises

### 🟢 Level 1: Recall
1. What keyword terminates a case block in a switch statement?
2. What keyword handles unmatched cases?
3. Can multiple cases share the same output block?

### 🟡 Level 2: Understand
4. When is a `switch` statement cleaner to read than an `if / elseif` ladder?
5. How does fall-through work, and can it ever be used intentionally?

### 🟠 Level 3: Apply
6. Write a switch statement that takes a traffic light color (`"red"`, `"yellow"`, `"green"`) and prints the driver instruction. Handle casing safely using `strtolower()`.

### 🔵 Level 4: Think & Troubleshoot
7. Research PHP 8's new `match` expression. How does `match` differ from `switch` regarding strict equality (`===`) and return values?

### 🟣 Level 5: Create & Build
8. Build a Simple Calculator in `calc.php`: variables `$num1 = 20`, `$num2 = 4`, and `$operator = "*"`. Use a switch statement to perform `+`, `-`, `*`, `/`, and `%`, preventing division by zero.
