# Chapter 2: Variables & Data Types 📦

## 🌟 Real-Life Story

The school pantry has many jars on a shelf. Each jar has a label: "Rice", "Lentils", "Dates". When the teacher says "bring the lentils", you find the jar by reading its label. You do not need to know which shelf it is on. A Python variable works the same way. It is a name label that lets you find a value in the computer's memory.

## 🎯 What You Will Learn

- Create variables and change their values.
- Recognise the four basic data types: `int`, `float`, `str` and `bool`.
- Check a value's type with `type()`.
- Calculate with Python's arithmetic operators.
- Convert values from one type to another, and round decimals with `round()`.

## 💡 Variables Are Name Labels

A **variable** is a name that points to a value. Think of it as a **sticky label** attached to a value in memory.

```
 Name (label)         Value in memory
┌──────────────┐     ┌──────────┐
│ student_name │ ──> │ "Fatima" │
└──────────────┘     └──────────┘
```

You create a variable by writing a name, then `=`, then a value. The `=` sign means **"store this value under this name"**. It is called **assignment**. In Python you do not write `var`, `let` or a type. Python works out the type for you.

```python
book_title = "The Ethical Programmer"
copies_available = 7
price = 14.50
is_in_stock = True

print(book_title)
print(copies_available)
print(price)
print(is_in_stock)
```

**Output:**

```text
The Ethical Programmer
7
14.5
True
```

Look at the price. We typed `14.50`, but Python printed `14.5`. The value is the same. Python simply drops the extra zero at the end.

### Changing a Variable

A variable can be given a new value at any time. The old value is replaced.

```python
books_donated = 12
print("Morning:", books_donated)

books_donated = 20
print("Afternoon:", books_donated)

books_donated = books_donated + 5
print("Evening:", books_donated)
```

**Output:**

```text
Morning: 12
Afternoon: 20
Evening: 25
```

The last assignment reads the old value (`20`), adds `5`, and stores the new value (`25`). Python always works out the right side of `=` first.

## 🗂️ The Four Basic Data Types

Every value belongs to a family called a **data type**. The type decides what you can do with the value.

| Data Type | Python Name | What it holds | Examples |
| :--- | :--- | :--- | :--- |
| Integer | `int` | Whole numbers, positive, negative or zero | `42`, `-10`, `0` |
| Float | `float` | Numbers with a decimal point | `3.14`, `99.5` |
| String | `str` | Text inside single `'` or double `"` quotes | `"Kindness"`, `'Cairo'` |
| Boolean | `bool` | Only `True` or `False` | `True`, `False` |

Note that `True` and `False` start with a capital letter and have no quotes.

## 🔍 Checking Types with `type()`

The built-in function `type()` tells you the data type of any value:

```python
donation_amount = 250
donor_city = "Istanbul"
rainfall_mm = 12.5
is_verified = True

print(type(donation_amount))
print(type(donor_city))
print(type(rainfall_mm))
print(type(is_verified))
print(type("250"))
```

**Output:**

```text
<class 'int'>
<class 'str'>
<class 'float'>
<class 'bool'>
<class 'str'>
```

The last line is a surprise for many beginners. `"250"` is in quotes, so it is a **string**, not a number. Quotes always make text.

## 🧮 Arithmetic Operators

Computers are excellent at fast, exact calculation. Here are Python's arithmetic **operators** (symbols that do maths):

| Operator | Meaning | Example | Result |
| :--- | :--- | :--- | :--- |
| `+` | Add | `15 + 4` | `19` |
| `-` | Subtract | `15 - 4` | `11` |
| `*` | Multiply | `15 * 4` | `60` |
| `/` | Divide (always gives a float) | `15 / 4` | `3.75` |
| `//` | Floor division (whole part only) | `15 // 4` | `3` |
| `%` | Remainder (also called modulo) | `15 % 4` | `3` |
| `**` | Power | `2 ** 8` | `256` |

```python
a = 15
b = 4

print(a + b)
print(a - b)
print(a * b)
print(a / b)
print(a // b)
print(a % b)
print(2 ** 8)
print(10 / 2)
```

**Output:**

```text
19
11
60
3.75
3
3
256
5.0
```

Notice the last line. `10 / 2` gives `5.0`, not `5`. The `/` operator always gives a float, even when the answer is whole.

### Order of Operations

Python follows the same order as your maths lessons. Powers come first, then `*` and `/`, then `+` and `-`. Use brackets to change the order.

```python
print(2 + 3 * 4)
print((2 + 3) * 4)
```

**Output:**

```text
14
20
```

### Short Ways to Update

Adding to a running total is so common that Python has a shortcut. `total += 5` means `total = total + 5`. There is also `-=`, `*=` and `/=`.

```python
trees_planted = 30
trees_planted += 12
print(trees_planted)
trees_planted -= 2
print(trees_planted)
```

**Output:**

```text
42
40
```

## 🧺 Worked Example: The Charity Pantry Calculator

A community relief drive collects food. Volunteers want to share it fairly between 25 families. The `//` operator gives each family's whole share. The `%` operator shows what is left over.

```python
rice_bags = 120
lentil_bags = 85
oil_bottles = 60
families = 25

total_items = rice_bags + lentil_bags + oil_bottles
items_per_family = total_items // families
items_left = total_items % families

print("Total items collected:", total_items)
print("Items per family:", items_per_family)
print("Kept in storage for emergencies:", items_left)
```

**Output:**

```text
Total items collected: 265
Items per family: 10
Kept in storage for emergencies: 15
```

Check it: 25 × 10 = 250, and 265 − 250 = 15. The program is right.

## 🔄 Type Conversion

Sometimes a number is stored as text, for example `"120"`. You must convert it before you can do maths. Converting a value to another type is called **type conversion** (or **casting**).

| Function | Converts to | Example | Result |
| :--- | :--- | :--- | :--- |
| `int()` | Whole number | `int("120")` | `120` |
| `float()` | Decimal number | `float("2.5")` | `2.5` |
| `str()` | Text | `str(98)` | `"98"` |

```python
visitors_text = "120"
visitors = int(visitors_text)
print(visitors + 5)

length = float(15)
print(length)

score = 98
message = "Final score: " + str(score)
print(message)
```

**Output:**

```text
125
15.0
Final score: 98
```

The `+` sign joins two strings together. Joining text is called **concatenation**. That is why we turned `98` into the string `"98"` first.

### Rounding with `round()`

Division often gives long decimals. `round(value, places)` rounds to the number of decimal places you choose.

```python
water_litres = 10 / 3
print(water_litres)
print(round(water_litres, 2))
print(round(water_litres))
```

**Output:**

```text
3.3333333333333335
3.33
3
```

With no second number, `round()` gives a whole number.

## 🏷️ Naming Rules and Good Habits

Python has a few strict rules for names, and some good habits (from the style guide called **PEP 8**):

| Name | OK? | Why |
| :--- | :--- | :--- |
| `water_level` | ✅ | snake_case: lowercase words joined by `_` |
| `total_donations` | ✅ | clear meaning |
| `1st_student` | ❌ | cannot start with a number |
| `first student` | ❌ | no spaces allowed |
| `x` | ⚠️ | allowed, but tells the reader nothing |

Names are **case-sensitive**: `Score` and `score` are two different variables. Choose meaningful names like `patient_temperature` or `parcel_weight`. Clear names are a kindness to the next reader (*Iḥsān*).

## 🔮 Predict the Output

```python
pages = 40
pages = pages * 2
print(pages // 3, pages % 3)
print(type(pages / 2))
```

<details>
<summary>Show answer</summary>

```text
26 2
<class 'float'>
```

`pages` becomes 80. 80 // 3 = 26, remainder 2. Dividing with `/` always gives a float.

</details>

## ⚠️ Common Mistake

**Adding a number to a number stored as text.**

```python
visitors_text = "120"
print(visitors_text + 5)
```

**Output:**

```text
TypeError: can only concatenate str (not "int") to str
```

A `TypeError` means the two values are of types that cannot be combined. Python will not guess whether you wanted maths or joined text.

**Fixed version:** convert the text first.

```python
visitors_text = "120"
print(int(visitors_text) + 5)
```

**Output:**

```text
125
```

## ✍️ Try It

A school bus holds 42 students. 190 students are going to the planetarium. Create variables `students` and `seats_per_bus`. Print how many full buses are needed and how many students are left for one extra bus.

**Hint:** use `//` for full buses and `%` for the students left over. (You should get 4 full buses and 22 extra students.)

## 📝 Recap

- A variable is a name label for a value. `=` stores a value under a name.
- The four basic types are `int`, `float`, `str` and `bool`. `type()` shows which one you have.
- `/` always gives a float. `//` gives the whole part, `%` gives the remainder.
- `int()`, `float()` and `str()` convert between types. `round()` tidies decimals.
- Use clear snake_case names. Names are case-sensitive.

## 🏆 Practice

### 🟢 Level 1: Recall
What is the data type of each value? `7`, `7.0`, `"7"`, `False`

<details>
<summary>Show answer</summary>

`7` is `int`, `7.0` is `float`, `"7"` is `str` (it has quotes), `False` is `bool`.

</details>

### 🟡 Level 2: Apply
A library has 365 books to spread across 8 shelves. Write code that prints how many books go on each shelf and how many are left over.

<details>
<summary>Show answer</summary>

```python
books = 365
shelves = 8
print("Books per shelf:", books // shelves)
print("Left over:", books % shelves)
```

Output:

```text
Books per shelf: 45
Left over: 5
```

</details>

### 🔴 Level 3: Challenge
Build a solar panel energy calculator.

1. Store the number of panels (`12`) and the energy each panel makes per day (`1.75` kWh).
2. Calculate the total energy per day.
3. Calculate the energy for a 7-day week.
4. Print both values, rounded to 1 decimal place, with a label.

<details>
<summary>Show one possible answer</summary>

```python
panels = 12
kwh_per_panel = 1.75

daily_kwh = panels * kwh_per_panel
weekly_kwh = daily_kwh * 7

print("Energy per day (kWh):", round(daily_kwh, 1))
print("Energy per week (kWh):", round(weekly_kwh, 1))
```

Output:

```text
Energy per day (kWh): 21.0
Energy per week (kWh): 147.0
```

</details>
