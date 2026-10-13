# Chapter 8: Functions & Modularity 🧩

## 🌟 Real-Life Story

A halal bakery has a recipe card for date biscuits. The baker does not rewrite the recipe every morning. She takes out the card, follows the steps and gets the same good biscuits. If she wants a bigger batch, she changes one number: the amount of flour. A **function** is a recipe card for code. You write the steps once, give them a name, and use them whenever you need, with different ingredients each time.

## 🎯 What You Will Learn

- Define your own functions with `def` and call them.
- Pass information in with parameters, including default values and keyword arguments.
- Send results back with `return`, and explain how it differs from `print()`.
- Explain local and global scope.
- Import ready-made modules such as `math` and `statistics`, and split your own code into modules.

## 🔁 Why Functions? Don't Repeat Yourself

Look at this code. The same three lines appear twice, with only the name changed.

```python
print("-" * 24)
print("Welcome, Hassan!")
print("-" * 24)
print("-" * 24)
print("Welcome, Maryam!")
print("-" * 24)
```

If the school asks for a new design, you must change it in every copy. Programmers follow the **DRY** principle: *Don't Repeat Yourself*. A function lets you write the steps **once**.

## 🏗️ Defining and Calling a Function

You **define** a function with the keyword `def`, a name, round brackets and a colon. The indented lines below are the **body**: the steps the function runs.

```python
def welcome(name):
    print("-" * 24)
    print(f"Welcome, {name}!")
    print("-" * 24)

welcome("Hassan")
welcome("Maryam")
```

**Output:**

```text
------------------------
Welcome, Hassan!
------------------------
------------------------
Welcome, Maryam!
------------------------
```

- Defining a function does **not** run it. It only teaches Python the recipe.
- **Calling** the function runs it. You call it by writing its name and brackets: `welcome("Hassan")`.
- Define a function **before** the line that calls it, because Python reads from top to bottom.

## 📦 Parameters and Arguments

The name inside the brackets of `def` is a **parameter**: a variable that waits for a value. The value you give when you call the function is an **argument**.

| Word | Where you see it | Example |
| :--- | :--- | :--- |
| Parameter | In the `def` line | `def area(width, height):` |
| Argument | In the call | `area(4, 3)` |

A function can have several parameters, separated by commas. Arguments are matched **in order**:

```python
def describe_room(room, seats, has_projector):
    print(f"Room {room}: {seats} seats, projector: {has_projector}")

describe_room("Lab 1", 30, True)
describe_room("Library", 45, False)
```

**Output:**

```text
Room Lab 1: 30 seats, projector: True
Room Library: 45 seats, projector: False
```

### Keyword Arguments and Default Values

You can also name the parameter when you call: `seats=30`. These are **keyword arguments**. They make calls easier to read, and their order does not matter.

A parameter can have a **default value**, written with `=` in the `def` line. If the caller leaves that argument out, the default is used.

```python
def greet(name, title="Student"):
    print(f"Welcome, {title} {name}! Strive with diligence today.")

greet("Hassan")
greet("Maryam", title="Team Leader")
greet(title="Teacher", name="Ms Aisha")
```

**Output:**

```text
Welcome, Student Hassan! Strive with diligence today.
Welcome, Team Leader Maryam! Strive with diligence today.
Welcome, Teacher Ms Aisha! Strive with diligence today.
```

Parameters with defaults must come **after** the ones without.

## ↩️ Returning a Result with `return`

So far our functions only printed. Most useful functions **calculate** something and hand the answer back with `return`. The caller can store that answer, print it, or use it in more maths.

```python
def rectangle_area(width, height):
    return width * height

garden = rectangle_area(6, 4)
path = rectangle_area(6, 1)

print(f"Garden: {garden} square metres")
print(f"Path: {path} square metres")
print(f"Planting space: {garden - path} square metres")
```

**Output:**

```text
Garden: 24 square metres
Path: 6 square metres
Planting space: 18 square metres
```

The call `rectangle_area(6, 4)` is replaced by the value it returns, `24`. That is why we can do `garden - path`.

### `return` versus `print()`

This difference confuses many beginners, so look closely.

| | `print()` | `return` |
| :--- | :--- | :--- |
| What it does | Shows a value on the screen | Hands a value back to the caller |
| Can the caller use the value? | No | Yes |
| Ends the function? | No | Yes |

A function with no `return` gives back `None`, which means "nothing":

```python
def show_total(a, b):
    print(a + b)

def get_total(a, b):
    return a + b

result1 = show_total(3, 4)
result2 = get_total(3, 4)
print("result1 is", result1)
print("result2 is", result2)
```

**Output:**

```text
7
result1 is None
result2 is 7
```

`show_total` printed `7` itself, but gave nothing back, so `result1` is `None`.

### `return` Ends the Function

As soon as Python reaches `return`, it leaves the function. This lets you return early from inside an `if`:

```python
def grade_label(score):
    if score >= 90:
        return "Distinction"
    if score >= 50:
        return "Pass"
    return "Needs review"

print(grade_label(95))
print(grade_label(67))
print(grade_label(30))
```

**Output:**

```text
Distinction
Pass
Needs review
```

### Returning More Than One Value

A function can return several values separated by commas. Python packs them into a **tuple** (Chapter 6). Unpack them into separate variables:

```python
def lowest_and_highest(readings):
    return min(readings), max(readings)

low, high = lowest_and_highest([18.5, 22.0, 25.5, 20.0])
print(f"Lowest {low}, highest {high}")
```

**Output:**

```text
Lowest 18.5, highest 25.5
```

### Docstrings: Explaining Your Function

The first line inside a function can be a string in triple quotes `"""..."""`. This is a **docstring**. It explains what the function does. Tools and teammates read it.

```python
def average(numbers):
    """Return the average of a list of numbers."""
    return sum(numbers) / len(numbers)

print(round(average([88, 92, 79, 95]), 1))
```

**Output:**

```text
88.5
```

## 🌐 Scope: Where a Variable Lives

The **scope** of a variable is the part of the program where it can be used.

- A variable created **inside** a function is **local**. It exists only while the function runs. Parameters are local too.
- A variable created **outside** all functions is **global**. Functions can read it.

```python
school = "Al-Noor Academy"      # global

def check_temperature():
    reading = 28.5               # local
    print(f"{school}: {reading} degrees")

check_temperature()
print(school)
print(reading)
```

**Output:**

```text
Al-Noor Academy: 28.5 degrees
Al-Noor Academy
NameError: name 'reading' is not defined
```

Inside the function, both `school` and `reading` work. Outside, `reading` has gone, so Python reports a `NameError`.

```
┌ global ─────────────────────┐
│ school = "Al-Noor Academy"  │
│  ┌ check_temperature() ───┐ │
│  │ reading = 28.5 (local) │ │
│  └────────────────────────┘ │
└─────────────────────────────┘
```

**Good habit:** pass values **in** as arguments and send results **out** with `return`. Functions that do not depend on global variables are easier to test and reuse.

## 📚 Modules: Borrowing Ready-Made Functions

A **module** is a file of Python code that other programs can use. Python comes with many modules, called the **standard library**. You load one with `import`.

```python
import math
import statistics

print(math.sqrt(144))
print(round(math.pi, 4))
print(math.ceil(4.1))
print(math.floor(4.9))

heights_cm = [12.0, 15.5, 11.0, 14.5, 13.0]
print(statistics.mean(heights_cm))
print(statistics.median(heights_cm))
```

**Output:**

```text
12.0
3.1416
5
4
13.2
13.0
```

| Function | What it does | Example |
| :--- | :--- | :--- |
| `math.sqrt(x)` | Square root | `math.sqrt(144)` → `12.0` |
| `math.ceil(x)` | Rounds **up** to a whole number | `math.ceil(4.1)` → `5` |
| `math.floor(x)` | Rounds **down** | `math.floor(4.9)` → `4` |
| `statistics.mean(x)` | Average of a list | `13.2` above |
| `statistics.median(x)` | Middle value when sorted | `13.0` above |

You write `math.sqrt` with the module name first, so it is clear where the function came from. If you only need one function, you can import it by name:

```python
from math import ceil

students = 130
bus_seats = 40
print(f"Buses needed: {ceil(students / bus_seats)}")
```

**Output:**

```text
Buses needed: 4
```

### Making Your Own Module

When a program grows, you can move functions into their own file. Any `.py` file is a module. Suppose you save this as `converters.py`:

```python
# converters.py
def celsius_to_fahrenheit(celsius):
    """Convert a Celsius temperature to Fahrenheit."""
    return celsius * 9 / 5 + 32

def rain_mm_to_litres(rain_mm, roof_area):
    """1 mm of rain on 1 square metre is 1 litre."""
    return rain_mm * roof_area
```

In another file in the **same folder**, for example `report.py`, import it by its file name without `.py`:

```python
# report.py
import converters

print(converters.celsius_to_fahrenheit(24.0))
print(converters.rain_mm_to_litres(18.5, 40))
```

Running `python report.py` on a computer prints:

```text
75.2
740.0
```

Splitting code into modules like this is called **modularity**. Each file has one clear job, which makes big programs easier to understand and share.

## 🤲 Worked Example: A Zakat Helper

*Zakat* is the yearly charity of 2.5% on savings that reach the **nisab**, a minimum amount. The real nisab depends on the current price of gold or silver, so it changes. The number below is only a **practice value** for this exercise.

```python
NISAB_PRACTICE = 5000.0     # practice value only

def zakat_due(savings, nisab=NISAB_PRACTICE):
    """Return 2.5% of savings if they reach the nisab, else 0."""
    if savings >= nisab:
        return savings * 0.025
    return 0.0

for savings in [3000.0, 5000.0, 12000.0]:
    due = zakat_due(savings)
    print(f"Savings {savings}: zakat {round(due, 2)}")
```

**Output:**

```text
Savings 3000.0: zakat 0.0
Savings 5000.0: zakat 125.0
Savings 12000.0: zakat 300.0
```

A name written in CAPITAL letters, like `NISAB_PRACTICE`, is a habit that tells readers "this value is meant to stay the same". It is called a **constant**.

## ⚠️ Common Mistake

**1. Printing instead of returning.** The function shows a number, but the caller gets `None` and cannot do maths with it.

```python
def double(n):
    print(n * 2)

answer = double(5)
print(answer + 1)
```

**Output:**

```text
10
TypeError: unsupported operand type(s) for +: 'NoneType' and 'int'
```

The `10` was printed, then the program crashed: you cannot add `None` and `1`. **Fix:** write `return n * 2` instead of `print(n * 2)`.

**2. Forgetting the brackets when calling.** `welcome` without `()` does not run the function. It only names it. Always call with brackets: `welcome("Hassan")`.

## ✍️ Try It

Write a function `minutes_to_hours(minutes)` that **returns** the hours, rounded to 2 decimal places. Call it for 90, 45 and 200 minutes and print each result.

**Hint:** `return round(minutes / 60, 2)`. The answers are 1.5, 0.75 and 3.33.

## 📝 Recap

- `def name(parameters):` defines a function; `name(arguments)` calls it.
- Parameters can have default values; keyword arguments name the parameter in the call.
- `return` hands a value back and ends the function. Without `return`, a function gives `None`.
- Variables made inside a function are local; they disappear when it ends.
- `import math` or `from math import ceil` borrows ready-made functions. Your own `.py` files can be modules too.

## 🏆 Practice

### 🟢 Level 1: Recall
In `def area(width, height):` and `area(5, 2)`, which are the parameters and which are the arguments? What does a function return if it has no `return` line?

<details>
<summary>Show answer</summary>

`width` and `height` are **parameters**. `5` and `2` are **arguments**. A function with no `return` gives back `None`.

</details>

### 🟡 Level 2: Apply
Write `count_passes(scores, pass_mark=50)` that returns how many scores are at or above the pass mark. Test it with `[45, 80, 50, 32, 91]` and also with `pass_mark=60`.

<details>
<summary>Show answer</summary>

```python
def count_passes(scores, pass_mark=50):
    count = 0
    for s in scores:
        if s >= pass_mark:
            count += 1
    return count

results = [45, 80, 50, 32, 91]
print(count_passes(results))
print(count_passes(results, pass_mark=60))
```

Output:

```text
3
2
```

</details>

### 🔴 Level 3: Challenge
Build a small water-tank toolkit for a school garden.

1. Write `tank_volume(length, width, depth)` that returns the volume in litres. (1 cubic metre = 1000 litres, and the sizes are in metres.)
2. Write `days_of_water(litres, litres_per_day=150)` that returns how many **whole** days the water lasts. Use `//`.
3. Write `report(length, width, depth)` that calls the first two functions and prints one tidy line.
4. Call `report(2, 1.5, 1)` and `report(1, 1, 0.5)`.

<details>
<summary>Show one possible answer</summary>

```python
def tank_volume(length, width, depth):
    """Return the tank volume in litres (sizes in metres)."""
    return length * width * depth * 1000

def days_of_water(litres, litres_per_day=150):
    """Return how many whole days the water lasts."""
    return int(litres // litres_per_day)

def report(length, width, depth):
    litres = tank_volume(length, width, depth)
    days = days_of_water(litres)
    print(f"Tank holds {litres} litres: enough for {days} days")

report(2, 1.5, 1)
report(1, 1, 0.5)
```

Output:

```text
Tank holds 3000.0 litres: enough for 20 days
Tank holds 500.0 litres: enough for 3 days
```

</details>
