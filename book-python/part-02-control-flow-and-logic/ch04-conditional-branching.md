# Chapter 4: Conditional Logic & Branching

## 🌟 Real-Life Story

Every morning your sports teacher looks at the sky. If it is raining, PE happens in the hall. Otherwise, the class goes out to the field. The teacher does not need a new plan each day. She has one rule that picks the right path. Programs make choices in exactly this way, using **conditions**: questions whose answer is `True` or `False`.

## 🎯 What You Will Learn

- Compare values with operators such as `==`, `!=`, `>` and `<=`.
- Choose between paths with `if`, `elif` and `else`.
- Combine conditions with `and`, `or` and `not`.
- Put one decision inside another (nesting).
- Avoid the classic `=` versus `==` mistake.

## Comparison Operators

A **comparison** asks a question about two values. The answer is always a Boolean: `True` or `False`.

| Operator | Meaning | Example | Result |
| :--- | :--- | :--- | :--- |
| `==` | Equal to | `5 == 5` | `True` |
| `!=` | Not equal to | `10 != 2` | `True` |
| `>` | Greater than | `8 > 12` | `False` |
| `<` | Less than | `3 < 7` | `True` |
| `>=` | Greater than or equal to | `50 >= 50` | `True` |
| `<=` | Less than or equal to | `14 <= 10` | `False` |

```python
books_returned = 18
target = 20

print(books_returned >= target)
print(books_returned != target)
print("Amina" == "amina")
print("Amina".lower() == "amina")
```

**Output:**

```text
False
True
False
True
```

String comparisons are **case-sensitive**. `"Amina"` and `"amina"` are different. Using `.lower()` on both sides is a common fix.

## The `if` Statement

An `if` statement runs a block of code **only when its condition is `True`**. Notice the colon `:` at the end of the line, and the 4-space indentation underneath.

```python
temperature = 38

if temperature > 35:
    print("Heat warning: drink water and stay in the shade.")
print("Weather check finished.")
```

**Output:**

```text
Heat warning: drink water and stay in the shade.
Weather check finished.
```

Change `temperature` to `25` and run it again. The warning disappears, but the last line still prints, because it is not indented.

### Adding `else`

`else` gives a second path. It runs when the condition is `False`. Exactly one of the two blocks runs.

```python
is_raining = False

if is_raining:
    print("PE is in the hall today.")
else:
    print("PE is on the field today.")
```

**Output:**

```text
PE is on the field today.
```

## Many Paths with `elif`

`elif` means "else if". It lets you check several conditions in order. Python tests them **from top to bottom** and runs the **first** block whose condition is `True`. Then it skips the rest.

```
      ┌───────────────┐
      │ score >= 90 ? │
      └──┬─────────┬──┘
     yes │         │ no
         ▼         ▼
  Distinction ┌───────────────┐
              │ score >= 75 ? │
              └──┬─────────┬──┘
             yes │         │ no
                 ▼         ▼
               Merit   ...and so on
```

```python
score = 82

if score >= 90:
    print("Distinction - outstanding diligence!")
elif score >= 75:
    print("Merit - good work!")
elif score >= 50:
    print("Pass - keep practising.")
else:
    print("Needs review - ask your teacher for help.")
```

**Output:**

```text
Merit - good work!
```

`82 >= 90` is `False`, so Python moves on. `82 >= 75` is `True`, so it prints "Merit" and stops. It never checks `>= 50`, even though that is also `True`.

Here is what the same code prints for other scores:

| `score` | First `True` test | Printed |
| :--- | :--- | :--- |
| `95` | `score >= 90` | Distinction - outstanding diligence! |
| `82` | `score >= 75` | Merit - good work! |
| `60` | `score >= 50` | Pass - keep practising. |
| `30` | none | Needs review - ask your teacher for help. |

## Combining Conditions: `and`, `or`, `not`

Real decisions often depend on more than one fact. Python has three **logical operators**:

- `and` is `True` only if **both** sides are `True`.
- `or` is `True` if **at least one** side is `True`.
- `not` flips a value: `not True` is `False`.

| A | B | `A and B` | `A or B` |
| :--- | :--- | :--- | :--- |
| `True` | `True` | `True` | `True` |
| `True` | `False` | `False` | `True` |
| `False` | `True` | `False` | `True` |
| `False` | `False` | `False` | `False` |

```python
finished_python_course = True
attendance = 92
has_warning = False

if finished_python_course and attendance >= 85 and not has_warning:
    print("Welcome to the Robotics Lab!")
else:
    print("Please complete the requirements first.")

is_weekend = True
is_holiday = False
if is_weekend or is_holiday:
    print("The library opens at 10:00.")
```

**Output:**

```text
Welcome to the Robotics Lab!
The library opens at 10:00.
```

## Nested Decisions

You can put an `if` inside another `if`. This is called **nesting**. The inner block is indented one more level (8 spaces).

```python
has_ticket = True
group_size = 34

if has_ticket:
    print("Welcome to the planetarium!")
    if group_size > 30:
        print("Large group: please use the side entrance.")
    else:
        print("Please use the main entrance.")
else:
    print("Please collect your tickets at the desk.")
```

**Output:**

```text
Welcome to the planetarium!
Large group: please use the side entrance.
```

Keep nesting shallow. Two levels is usually enough. If you need more, try `and` or `elif` instead.

## Worked Example: Plant Irrigation Advisor

A school garden has a soil sensor. The program decides whether to switch on the drip watering system. On a computer, the three values could come from `input()`. Here they are written in the code.

```python
soil_moisture = 24        # percent, 0 to 100
rain_expected = False
temperature = 37.0        # degrees Celsius

print("--- GARDEN SYSTEM CHECK ---")

if soil_moisture < 30 and not rain_expected:
    print("Status: watering ON")
    if temperature > 35:
        print("Note: very hot day, watering time increased.")
elif soil_moisture < 30 and rain_expected:
    print("Status: waiting - rain is expected soon.")
elif soil_moisture >= 70:
    print("Status: soil is wet enough - saving water.")
else:
    print("Status: moisture is fine - keep monitoring.")
```

**Output:**

```text
--- GARDEN SYSTEM CHECK ---
Status: watering ON
Note: very hot day, watering time increased.
```

Try changing `rain_expected` to `True`. Then try `soil_moisture = 75`. Predict each result before you run it. Saving water is a form of care for the earth (*Iḥsān*).

## 🔮 Predict the Output

```python
age = 13
has_permission_slip = False

if age >= 12 and has_permission_slip:
    print("Join the trip")
elif age >= 12:
    print("Bring your slip")
else:
    print("Too young for this trip")
```

<details>
<summary>Show answer</summary>

```text
Bring your slip
```

The first test needs both parts `True`, but the slip is `False`. The second test, `age >= 12`, is `True`.

</details>

## ⚠️ Common Mistake

**1. Using `=` instead of `==`.** A single `=` stores a value. It cannot ask a question.

```python
answer = "yes"
if answer = "yes":
    print("Thank you!")
```

**Output:**

```text
SyntaxError: invalid syntax. Maybe you meant '==' or ':=' instead of '='?
```

Python even guesses what you meant. (You can ignore `:=`; it is an advanced operator.)

**Fixed version:** `if answer == "yes":` (two equals signs to compare).

**2. Putting the `elif` tests in the wrong order.** Python stops at the first `True` test.

```python
score = 95
if score >= 50:
    print("Pass")
elif score >= 90:
    print("Distinction")
```

**Output:**

```text
Pass
```

A 95 should be a Distinction! **Fix:** test the biggest number first (`>= 90`, then `>= 50`).

## ✍️ Try It

A library charges no fines, but it sends reminders. Store `days_late = 9`. Print:

- `"On time - thank you!"` if `days_late` is 0,
- `"Friendly reminder sent"` if it is 1 to 7,
- `"Please visit the desk"` if it is more than 7.

**Hint:** use `if`, `elif` and `else`. Test `== 0` first, then `<= 7`.

## 📝 Recap

- Comparisons (`==`, `!=`, `>`, `<`, `>=`, `<=`) give `True` or `False`.
- `if` runs a block only when its condition is `True`. End the line with `:` and indent the block.
- `elif` checks more conditions in order; the first `True` one wins. `else` catches everything left.
- `and`, `or` and `not` combine or flip conditions.
- `=` stores a value; `==` compares two values.

## 🏆 Practice

### 🟢 Level 1: Recall
What does each expression give? `7 != 7`, `10 >= 10`, `True and False`, `not False`

<details>
<summary>Show answer</summary>

`False`, `True`, `False`, `True`.

</details>

### 🟡 Level 2: Apply
Write code that stores `litres_used = 140` and prints `"Water use is low"` if it is under 100, `"Water use is normal"` if it is 100 to 150, and `"Water use is high"` otherwise.

<details>
<summary>Show answer</summary>

```python
litres_used = 140

if litres_used < 100:
    print("Water use is low")
elif litres_used <= 150:
    print("Water use is normal")
else:
    print("Water use is high")
```

Output:

```text
Water use is normal
```

</details>

### 🔴 Level 3: Challenge
Build a "field trip check" for a school bus.

1. Store `students = 38`, `seats = 40` and `driver_ready = True`.
2. If the driver is not ready, print `"Wait for the driver"`.
3. Otherwise, if there are more students than seats, print how many must take the second bus.
4. Otherwise, print `"Everyone fits - let's go!"` and how many seats are empty.

<details>
<summary>Show one possible answer</summary>

```python
students = 38
seats = 40
driver_ready = True

if not driver_ready:
    print("Wait for the driver")
elif students > seats:
    print(f"{students - seats} students take the second bus")
else:
    print("Everyone fits - let's go!")
    print(f"Empty seats: {seats - students}")
```

Output:

```text
Everyone fits - let's go!
Empty seats: 2
```

</details>
