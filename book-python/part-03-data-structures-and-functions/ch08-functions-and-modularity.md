# Chapter 8: Functions & Modularity 🧩🛠️

When writing programs, repeating the same lines of code in 10 different places is wasteful and prone to errors. Professional developers adhere to the **DRY principle**: *Don't Repeat Yourself*.

In Python, we encapsulate reusable blocks of logic inside **functions**.

---

## 💡 The Mental Model: A Specialized Kitchen Appliance

Think of a blender:
- **Input (Parameters)**: You drop in bananas, milk, and dates.
- **Processing (Function Body)**: The blender whirls and blends them.
- **Output (Return Value)**: It yields a fresh smoothie.

Once built, you don't need to reinvent the motor every time you want a smoothie—you simply call the blender!

---

## 🏗️ Defining Functions with `def`

We define functions with the `def` keyword, followed by the function name, parentheses for inputs, and a colon:

```python
# A simple greeting function
def greet_student(name, honorific="Student"):
    """Prints a polite greeting to a student."""
    return f"Welcome, {honorific} {name}! Strive with diligence today."

# Calling the function:
message1 = greet_student("Hassan")
message2 = greet_student("Maryam", honorific="Scholar")

print(message1)
print(message2)
```

---

## 📦 Parameters vs Arguments & Return Values

- **Parameters**: The variable names declared in the function definition (e.g., `amount`, `rate`).
- **Arguments**: The actual data values passed into the function when calling it (e.g., `1000`, `0.025`).
- **`return`**: Hands the result back to the caller. If a function doesn't include `return`, it implicitly returns `None`.

```python
def calculate_zakat(wealth_amount, nisab_threshold=5000.0):
    """
    Calculates the 2.5% annual Zakat obligation if total net wealth
    reaches or exceeds the Nisab minimum threshold.
    """
    if wealth_amount >= nisab_threshold:
        zakat_due = wealth_amount * 0.025
        return zakat_due
    else:
        return 0.0

# Testing our function
savings = 12000.0
due = calculate_zakat(savings)
print(f"Total Wealth: ${savings:,.2f} | Zakat Obligation: ${due:,.2f}")
```

---

## 🌐 Scope: Local vs Global Variables

Variables created inside a function are **local**—they vanish as soon as the function finishes running:

```python
def check_temperature():
    reading = 28.5  # Local variable
    print("Inside function:", reading)

check_temperature()
# print(reading)  ❌ NameError: 'reading' is not defined outside the function!
```

---

## 📚 Standard Library Modules

Python ships with "batteries included"—hundreds of pre-built modules you can import:

```python
import math
import random

# Using the math module
print("Square root of 144:", math.sqrt(144))
print("Pi rounded to 4 decimals:", round(math.pi, 4))

# Using the random module for simulations
lucky_seed = random.randint(1, 100)
print("Simulated batch number:", lucky_seed)
```

---

## 🎯 Hands-On Mission: Metric Conversion Toolkit

Create a modular toolkit for an environmental science station:

```python
def celsius_to_fahrenheit(celsius):
    """Converts Celsius temperature to Fahrenheit."""
    return (celsius * 9/5) + 32

def mm_to_liters_per_sqm(rainfall_mm):
    """1 mm of rainfall equals 1 liter of water per square meter."""
    return rainfall_mm * 1.0

# Station report
day_temp_c = 24.0
day_rain_mm = 18.5

temp_f = celsius_to_fahrenheit(day_temp_c)
water_harvested_sqm = mm_to_liters_per_sqm(day_rain_mm)

print("🌱 ECO-MONITORING SUMMARY REPORT")
print(f"Recorded Temperature: {day_temp_c}°C ({temp_f:.1f}°F)")
print(f"Rainfall Harvested  : {water_harvested_sqm:.1f} Liters per m²")
```
