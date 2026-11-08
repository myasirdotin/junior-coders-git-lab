# Chapter 9: The Switch Statement

---

## Teacher Lesson Plan

### Classroom Planning & Logistics
| Field | Detail | Field | Detail |
| :--- | :--- | :--- | :--- |
| **Grade / Class** | Grades 9–10 | **Period Duration** | 45 minutes |
| **Unit / Topic** | Control Flow | **Setting** | Computer Lab & Projector |
| **Teacher Name** | ____________________ | **Date / Session** | ____ / ____ / 2026 |

### Learning Objectives (SWBAT)
By the end of this 45-minute lesson, students will be able to:
1. Build a switch block with case, break and default.
2. Explain fall-through and why break matters.
3. Group several cases that share the same action.
4. Choose between switch and an if / elseif ladder.

### Required Materials & Setup
- Computer lab with web browsers installed (Chrome, Edge, or Firefox).
- Teacher projector displaying PHP Console Studio (`../studios/php-console/index.html`) for live modeling.
- Student notebooks for recording key syntax rules, vocabulary, and reflections.

### 45-Minute Instructional Delivery Plan
| Time | Phase | Teacher Activity | Student Activity |
| :--- | :--- | :--- | :--- |
| **0–8 min** | **Hook & Analogy** | Share the chapter opening analogy: *"Picture the drinks machine in the school canteen. Press button 1 and out comes lemonade. Press button 2 and you get orange juice. Press button 3 for water. Press button 99 and the screen says 'Inva..."* Connect to today's topic. | Discuss in pairs; volunteer real-life parallels and note the learning target. |
| **8–20 min** | **Direct Instruction** | Model core concepts on the screen. Break down syntax line-by-line; explain architectural structure. | Follow along on screens/notebooks; observe syntax rules and active demonstration. |
| **20–26 min** | **Misconceptions & Diagnostics** | Address Common Mistake: *"Forgetting break."* Conduct rapid check for understanding. | Identify faulty patterns in sample snippets; explain correct approach verbally. |
| **26–38 min** | **Guided Lab Practice** | Circulate lab while students execute the hands-on task: *"Open the PHP Console and turn a grade letter into a message:"* | Code independently or in pairs using PHP Console Studio (`../studios/php-console/index.html`); test variations. |
| **38–45 min** | **Plenary & Exit Ticket** | Review key takeaways. Pose exit question: *"Which keyword ends a case block?"* Collect summary tickets. | Answer plenary questions; record homework task; submit exit ticket. |

### Differentiated Instruction
- **Support (Struggling Learners):** Provide starter boilerplate or pair with a peer navigator; focus on Level 1 recall and syntax verification.
- **Extension (Fast Finishers):** Assign Level 3 Challenge from the Practice section; encourage adding creative styling or feature extensions.

### Homework & Notebook Task
- Complete Level 2 Apply questions from the chapter Practice section into class notebooks.
- Write a 2-sentence personal explanation of the primary concept taught in this lesson.

### Ethical Stewardship & Digital Values (Amānah & Beneficial Knowledge)
- Emphasize digital trust (*Amānah*): respect school lab hardware, cite code honestly, and apply programming skills toward beneficial knowledge (*'Ilm Nāfi'*).

### Teacher Sign-off & Reflection
- **Teacher Signature:** ___________________________  **HOD / Coordinator Signature:** ___________________________
- **Lesson Reflection / Notes:** _______________________________________________________________________________

---

## Real-Life Story

Picture the drinks machine in the school canteen. Press button 1 and out comes lemonade. Press button 2 and you get orange juice. Press button 3 for water. Press button 99 and the screen says "Invalid selection". The machine checks **one value** (the button) against a list of choices, and that is exactly what a `switch` statement does.

---

## What You Will Learn

- Build a `switch` block with `case`, `break` and `default`.
- Explain fall-through and why `break` matters.
- Group several cases that share the same action.
- Choose between `switch` and an `if / elseif` ladder.
- Use the PHP 8 `match` expression as a stricter, shorter choice.

---

## Visual Concept Explanation

### Anatomy of a Switch Statement

```text
switch ($userRole) {
  case 'admin':   <-- runs if
                      $userRole == 'admin'
    echo "Admin panel";
    break;        <-- stop, leave the switch

  case 'teacher':
    echo "Teacher tools";
    break;

  default:     <-- runs if NO case matched
    echo "Student home";
    break;
}
```

A `switch` compares with **loose** equality (`==`), like the `==` you met in Chapter 8.

### What Happens If You Forget `break;`? (Fall-Through Bug)

```php
<?php
$fruit = "apple";
switch ($fruit) {
  case "apple":
    echo "Red";
    // NO break! PHP slides into the next case
  case "banana":
    echo "Yellow";
    break;
}
```

Output:

```text
RedYellow
```

This sliding into the next case is called **fall-through**.

---

## Code Example: School Timetable Selector

```php
<?php
  $day = "Tuesday"; // a real page could use date("l") for today

  echo "<h2>Class 9 Schedule for $day</h2>";

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

    // Grouping Saturday and Sunday together
    case "Saturday":
    case "Sunday":
      echo "<p>Weekend! No classes today.</p>";
      break;

    default:
      echo "<p>Unknown day.</p>";
      break;
  }
```

Output (what the browser shows):

```text
Class 9 Schedule for Tuesday

09:00 AM: English Literature

11:00 AM: Computer Science (PHP Lab!)
```

---

## Code Explanation: Breaking It Down Line by Line

- `switch ($day)`: Names the one value we are checking.
- `case "Monday":`: Asks "is `$day == "Monday"`?" If yes, PHP starts running here.
- `break;`: Stops and jumps to the line after the switch's closing `}`.
- `case "Saturday": case "Sunday":`: Two cases with no `break` between them share the same code.
- `default:`: Works like the final `else`. It handles any value no case matched.

---

## The Modern Alternative: `match` (PHP 8)

`match` checks one value too, but it **returns** a value and uses strict `===` comparison. You do not need `break`.

```php
<?php
$button = 2;
$drink = match ($button) {
  1 => "Lemonade",
  2 => "Orange juice",
  3, 4 => "Water",
  default => "Invalid selection",
};
echo $drink;
```

Output:

```text
Orange juice
```

| | `switch` | `match` |
| :--- | :--- | :--- |
| Comparison | loose `==` | strict `===` |
| Needs `break` | yes | no |
| Gives back a value | no | yes |
| No match and no `default` | does nothing | stops with an `UnhandledMatchError` |

---

## Real-World Connection: Handling HTTP Status Codes

Web servers answer every request with a **status code**, a number that says how it went:
- 200: OK
- 301: Moved permanently
- 404: Not found
- 500: Internal server error

PHP code often uses `switch` or `match` to turn these codes into friendly messages.

---

## Predict the Output

```php
<?php
  $badge = "gold";
  switch ($badge) {
    case "bronze":   echo "10 ";
    case "silver":   echo "20 ";
    case "gold":     echo "30 ";
    case "platinum": echo "50 ";
    default:         echo "Done";
  }
```

<details>
<summary>Click to check your answer</summary>
<strong>Answer:</strong> <code>30 50 Done</code>. There are NO <code>break;</code> statements, so after matching "gold" PHP runs every case below it, and the default too.
</details>

---

## Code Detective: The Misplaced Default

```php
<?php
  $cmd = "stop";
  switch ($cmd) {
    default:
      echo "Unknown command. ";
    case "start":
      echo "Starting the lab timer...";
      break;
  }
```

Output:

```text
Unknown command. Starting the lab timer...
```

- **Find the surprise**: `default` sits at the top with no `break;`.
- **Explain**: "stop" matches no case, so PHP runs `default`. With no `break`, it falls through into `"start"` and starts the timer by mistake.
- **Fix**: Put `default` at the bottom, and end every case with `break;`.

---

## Common Mistake

**Forgetting `break`.**

- *Wrong*:
  ```php
  <?php
  $light = "red";
  switch ($light) {
    case "red":
      echo "Stop. ";
    case "green":
      echo "Go.";
  }
  ```
- *What happens*: It prints `Stop. Go.`, which is a dangerous instruction!
- *Fixed*: Add `break;` after `echo "Stop. ";` (and after `echo "Go.";`). Now it prints only `Stop. `.

---

## Try It

Open the [PHP Console](../studios/php-console/) and turn a grade letter into a message:

```php
<?php
$grade = "B";
switch ($grade) {
  case "A":
    echo "Excellent work!";
    break;
  case "B":
  case "C":
    echo "Good effort. Keep going!";
    break;
  default:
    echo "Let's practise together.";
}
```

Output:

```text
Good effort. Keep going!
```

*Hint*: Try `"A"`, `"C"` and `"E"`. Then rewrite the same idea with `match`.

---

## Recap

- `switch` checks one value against many `case` labels.
- `break` stops the switch; without it, PHP falls through into the next case.
- Stack cases with no `break` between them to share one action.
- `default` runs when nothing matched; keep it at the bottom.
- `match` (PHP 8) is strict (`===`), needs no `break` and returns a value.

---

## Practice

### Level 1: Recall
1. Which keyword ends a case block?
2. Which keyword handles values that match no case?
3. Can several cases share the same code?

<details>
<summary>Show answer</summary>

1. **`break`**.
2. **`default`**.
3. **Yes.** Stack them with no `break` between them, like `case "Saturday": case "Sunday":`.

</details>

### Level 2: Apply
1. When is `switch` easier to read than an `if / elseif` ladder?
2. How is `match` different from `switch` in the way it compares values?

<details>
<summary>Show answer</summary>

1. When you compare **one** value with many exact choices, such as a day name or a menu number. For ranges like `$score >= 80`, `if / elseif` is better.
2. `switch` uses loose `==`; `match` uses strict `===`. So `match` treats the string `"7"` and the integer `7` as different.

</details>

### Level 3: Challenge
Build a simple calculator.

1. Create `$num1 = 20`, `$num2 = 4` and `$operator = "*"`.
2. Use `switch` to handle `+`, `-`, `*`, `/` and `%`.
3. For `/` and `%`, print `"Cannot divide by zero"` if `$num2` is 0.
4. Extra: a traffic-light helper. Take `"RED"`, `"Yellow"` or `"green"`, use `strtolower()` (Chapter 6) and print the instruction.

<details>
<summary>Show one possible answer</summary>

```php
<?php
$num1 = 20;
$num2 = 4;
$operator = "*";

switch ($operator) {
  case "+":
    echo $num1 + $num2;
    break;
  case "-":
    echo $num1 - $num2;
    break;
  case "*":
    echo $num1 * $num2;
    break;
  case "/":
  case "%":
    if ($num2 === 0) {
      echo "Cannot divide by zero";
    } elseif ($operator === "/") {
      echo $num1 / $num2;
    } else {
      echo $num1 % $num2;
    }
    break;
  default:
    echo "Unknown operator";
}
```

Output:

```text
80
```

Traffic light:

```php
<?php
$light = strtolower("RED");
switch ($light) {
  case "red":
    echo "Stop";
    break;
  case "yellow":
    echo "Get ready";
    break;
  case "green":
    echo "Go carefully";
    break;
  default:
    echo "Light is broken";
}
```

Output:

```text
Stop
```

</details>
