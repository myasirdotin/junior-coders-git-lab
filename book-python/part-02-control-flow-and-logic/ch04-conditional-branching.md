# Chapter 4: Conditional Logic & Branching 🚦⚖️

Life is filled with choices: *If it rains, carry an umbrella; otherwise, enjoy the sunshine.* 

In computer science, **conditional logic** allows our programs to make intelligent decisions based on changing conditions.

---

## 💡 The Mental Model: Railway Track Switches

Imagine a train speeding down a track. When it encounters a switch:
- If the switch is **Open**, the train heads down Track A.
- If the switch is **Closed**, the train heads down Track B.

In Python, we create these decision switches using `if`, `elif` (short for *else if*), and `else`.

```
                    ┌────────────┐
                    │ Is mark >= │
                    │    85?     │
                    └─────┬──────┘
                          │
             YES ┌────────┴────────┐ NO
                 ▼                 ▼
          [ Grade: 'A' ]    ┌────────────┐
                            │ Is mark >= │
                            │    70?     │
                            └─────┬──────┘
                                  │
                     YES ┌────────┴────────┐ NO
                         ▼                 ▼
                  [ Grade: 'B' ]    [ Grade: 'Pass' ]
```

---

## ⚖️ Comparison Operators

To check conditions, Python provides comparison operators that evaluate to `True` or `False`:

| Operator | Meaning | Example | Result |
| :--- | :--- | :--- | :--- |
| `==` | Equal to | `5 == 5` | `True` |
| `!=` | Not equal to | `10 != 2` | `True` |
| `>` | Greater than | `8 > 12` | `False` |
| `<` | Less than | `3 < 7` | `True` |
| `>=` | Greater than or equal | `50 >= 50` | `True` |
| `<=` | Less than or equal | `14 <= 10` | `False` |

> ⚠️ **Common Bug**: Don't confuse single `=` (assignment: put data in box) with double `==` (comparison: check if two things are equal)!

---

## 🚦 The `if-elif-else` Structure

```python
score = int(input("Enter student exam mark (0-100): "))

if score >= 90:
    print("Grade: Distinction 🌟 - Outstanding diligence!")
elif score >= 75:
    print("Grade: Merit 👍 - Good work!")
elif score >= 50:
    print("Grade: Pass 📚 - Keep striving and practicing.")
else:
    print("Needs Review 💡 - Seek guidance from your teacher.")
```

---

## 🔗 Combining Conditions: `and`, `or`, `not`

In real life, decisions often depend on multiple factors simultaneously:

```python
# Check eligibility for an advanced robotics lab
has_completed_python = True
attendance_percentage = 92
has_disciplinary_warning = False

if has_completed_python and attendance_percentage >= 85 and not has_disciplinary_warning:
    print("Congratulations! You are accepted into the Advanced AI Lab.")
else:
    print("Please fulfill prerequisites before applying.")
```

- `and` requires **both** sides to be `True`.
- `or` requires **at least one** side to be `True`.
- `not` reverses the boolean state (`not True` is `False`).

---

## 🎯 Hands-On Mission: Plant Health & Irrigation Advisor

Build a smart agricultural logic engine that decides whether an automated drip irrigation system should turn on:

```python
# Smart Farming Irrigation Engine
soil_moisture_percent = int(input("Enter current soil moisture % (0-100): "))
rain_predicted = input("Is rain forecast today? (yes/no): ").strip().lower() == "yes"
temperature_celsius = float(input("Enter ambient temperature in °C: "))

print("\n--- FARM SYSTEM EVALUATION ---")

if soil_moisture_percent < 30 and not rain_predicted:
    print("Status: 💧 ACTIVATING DRIP IRRIGATION")
    if temperature_celsius > 35:
        print("Note: High heat detected. Irrigation volume boosted by 20%.")
elif soil_moisture_percent < 30 and rain_predicted:
    print("Status: ⏳ HOLDING IRRIGATION — Rain is expected shortly.")
elif soil_moisture_percent >= 70:
    print("Status: ☀️ SOIL OPTIMAL — Conserving water resources (*Iḥsān*).")
else:
    print("Status: 🌿 MONITORING — Moisture levels in acceptable balance.")
```
