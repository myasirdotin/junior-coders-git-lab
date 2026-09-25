# Chapter 2: Variables & Data Types 📦🔢

Programs need memory. Whether counting how many books are donated to a neighborhood library or storing sensor readings from an eco-friendly solar farm, Python stores data inside **variables**.

---

## 💡 The Mental Model: Sticky Labels on Memory Boxes

In Python, a variable is not a permanent box. Think of it as a **sticky label** attached to a value in the computer's memory.

```
Variable Name (Sticky Tag)       Memory Value
┌─────────────────────────┐     ┌──────────────┐
│       student_name      │ ──> │   "Fatima"   │
└─────────────────────────┘     └──────────────┘
```

In Python, you do not declare types with keywords like `var`, `let`, or `int`. You simply write the name, assign the value with `=`, and Python automatically infers the data type!

```python
# Clean, dynamic variable assignment
book_title = "The Ethical Programmer"
copies_available = 7
price_usd = 14.50
is_in_stock = True
```

---

## 🗂️ The Four Primary Data Types

Every piece of information belongs to a specific family called a **data type**:

| Data Type | Python Name | Description | Example |
| :--- | :--- | :--- | :--- |
| **Integer** | `int` | Whole numbers (positive, negative, or zero) | `42`, `-10`, `0` |
| **Float** | `float` | Decimal numbers for measurements and precision | `3.14159`, `99.95` |
| **String** | `str` | Text enclosed in single `'` or double `"` quotes | `"Kindness"`, `'Cairo'` |
| **Boolean** | `bool` | Binary truth states: `True` or `False` | `True`, `False` |

---

## 🔍 Checking Types with `type()`

Python provides a built-in helper function called `type()` to reveal any value's data type:

```python
donation_amount = 250
print(type(donation_amount))  # Output: <class 'int'>

donor_city = "Istanbul"
print(type(donor_city))       # Output: <class 'str'>

is_verified = True
print(type(is_verified))      # Output: <class 'bool'>
```

---

## 🧮 Arithmetic Operators

Computers excel at high-speed calculation. Here are the core arithmetic operations in Python:

```python
a = 15
b = 4

print(a + b)   # Addition: 19
print(a - b)   # Subtraction: 11
print(a * b)   # Multiplication: 60
print(a / b)   # Standard Division (returns float): 3.75
print(a // b)  # Floor Division (discards remainder): 3
print(a % b)   # Modulo (remainder): 3
print(a ** b)  # Exponentiation (15 to the power of 4): 50625
```

---

## 🔄 Type Conversion (Casting)

Sometimes you have a number stored as text (e.g., `"50"` from user input), and you need to convert it into a real number to perform math:

```python
# String to Integer
visitors_str = "120"
visitors_int = int(visitors_str)
print(visitors_int + 5)  # 125

# Integer to Float
meters = float(15)
print(meters)  # 15.0

# Number to String
score = 98
announcement = "Final score: " + str(score)
print(announcement)
```

---

## 🏷️ Python Naming Conventions (PEP 8)

To write professional Python (*Iḥsān*):
- Use **snake_case**: all lowercase words joined by underscores (e.g., `water_level`, `total_donations`).
- Never start variable names with numbers (e.g., `1st_player` ❌; `first_player` ✅).
- Avoid vague single-letter names like `x` or `n` when writing real-world systems. Choose meaningful names like `patient_temperature` or `package_weight`.

---

## 🎯 Hands-On Mission: The Charity Pantry Calculator

Write a script calculating food rations for a community relief drive:

```python
# Community Food Drive Calculator
rice_bags = 120
lentil_bags = 85
oil_liters = 60

families_supported = 25

total_items = rice_bags + lentil_bags + oil_liters
items_per_family = total_items // families_supported
surplus_items = total_items % families_supported

print("Total relief units collected:", total_items)
print("Units per family:", items_per_family)
print("Surplus kept in storage for emergency:", surplus_items)
```
