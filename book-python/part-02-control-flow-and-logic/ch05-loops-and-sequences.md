# Chapter 5: Loops & Sequences (`for` & `while`) 🔁🔄

Computers never complain about repetition. While a human might tire of checking 10,000 sensor readings, a computer processes them in milliseconds with 100% precision. 

In Python, we achieve this effortless repetition using **loops**.

---

## 💡 The Mental Model: The Conveyor Belt

Imagine an inspection belt at an organic farm:
- Each crate of oranges passes before you one at a time.
- For every crate on the belt, you inspect the weight and stamp it.
- When the belt has delivered the last crate, your task is done.

This is exactly how a Python `for` loop operates: it visits each item in a collection or sequence until none remain.

---

## 🔂 The `for` Loop and `range()`

The `for` loop in Python iterates over a sequence:

```python
# Print greeting 5 times
for i in range(5):
    print(f"Cycle {i}: Seeking beneficial knowledge")
```
*Note: `range(5)` generates numbers starting at `0` up to (but NOT including) `5`: `0, 1, 2, 3, 4`.*

### Customizing `range(start, stop, step)`:

```python
# Counting from 10 to 50 in increments of 10
for count in range(10, 51, 10):
    print(f"Milestone: {count}% complete")
```

---

## ⏳ The `while` Loop: Repeating Until a Condition Changes

A `while` loop runs as long as a condition evaluates to `True`. It is like a security guard on duty until the morning shift arrives:

```python
battery_level = 100

while battery_level > 20:
    print(f"Rover active. Battery: {battery_level}%")
    battery_level -= 25  # Drain 25% each patrol loop

print("Battery low! Returning rover to solar recharging dock.")
```

> ⚠️ **Watch Out for Infinite Loops!**
> If your `while` condition never becomes `False`, the program will run forever until your computer runs out of memory or you press <kbd>Ctrl</kbd> + <kbd>C</kbd> to terminate it. Always ensure your loop makes progress toward terminating!

---

## 🛑 Controlling Loops: `break` and `continue`

- **`break`**: Immediately exits the loop, skipping any remaining cycles.
- **`continue`**: Skips the rest of the *current* cycle and jumps straight to the next one.

```python
# Filtering donations, skipping invalid zero entries, stopping at target
donations = [25, 0, 50, -5, 100, 30, 80]
total = 0

for d in donations:
    if d <= 0:
        print(f"Skipping invalid donation: {d}")
        continue  # Skip to next donation
    
    total += d
    print(f"Added ${d}. Current total: ${total}")
    
    if total >= 200:
        print("🎉 Target of $200 reached! Closing campaign.")
        break  # Stop the loop completely
```

---

## 🎯 Hands-On Mission: The Mosque Solar Power Accumulator

Simulate hourly solar energy generation across a sunny 12-hour day:

```python
print("--- SOLAR ENERGY GENERATOR MONITOR ---")

total_energy_kwh = 0.0

for hour in range(6, 19):  # From 6 AM to 6 PM (18:00)
    # Peak sunshine between 11 AM and 3 PM
    if 11 <= hour <= 15:
        generation = 4.5
        condition = "Peak Sun ☀️"
    elif 9 <= hour <= 17:
        generation = 2.8
        condition = "Moderate Sun 🌤️"
    else:
        generation = 0.9
        condition = "Low Light 🌅"
        
    total_energy_kwh += generation
    print(f"{hour:02d}:00 | {condition:<16} | +{generation:.1f} kWh | Total: {total_energy_kwh:.1f} kWh")

print("-" * 50)
print(f"Total clean energy harvested today: {total_energy_kwh:.2f} kWh")
print("Clean energy distributed to local educational center!")
```
