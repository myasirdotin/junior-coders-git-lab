# Chapter 3: User Input & String Formatting (F-Strings) 🗣️✨

Programs become magical when they converse with humans. In this chapter, we will learn how to capture user responses from the terminal and format polished, readable messages using modern Python **f-strings**.

---

## 📥 Getting Input with `input()`

The `input()` function pauses your program and waits for the human to type something into the terminal and press <kbd>Enter</kbd>:

```python
# Asking the user for their name
student_name = input("Please enter your name: ")
print("Peace and blessings to you, " + student_name + "!")
```

> ⚠️ **Crucial Rule**: `input()` **ALWAYS returns a string (`str`)**, even if the user types numbers!
> If you ask for their age and they type `15`, Python receives `"15"` (text). If you try to add `5` to it without converting, Python raises a `TypeError`!

```python
# Convert input string to an integer for calculations
daily_pages = int(input("How many pages did you read today? "))
weekly_goal = daily_pages * 7
print("At this rate, you will read", weekly_goal, "pages this week!")
```

---

## 💎 The Modern Art of F-Strings

In older versions of Python, combining text and variables was clunky:

```python
# The old, clumsy way
name = "Zayd"
score = 95
print("Student " + name + " achieved a score of " + str(score) + "%.")
```

Starting in Python 3.6, developers use **formatted string literals (f-strings)**. Prefix the string with `f`, and put your variables directly inside curly braces `{}`:

```python
# The modern, elegant way (f-string)
name = "Zayd"
score = 95
print(f"Student {name} achieved a score of {score}%.")
```

### You Can Even Put Math & Logic Inside F-Strings!

```python
bread_price = 1.25
quantity = 6
print(f"Total order cost: ${bread_price * quantity:.2f}")
```
*Notice `:.2f` — this instructs Python to round the number to exactly 2 decimal places.*

---

## 🧼 Cleaning Text with String Methods

Human input is often messy. People accidentally add trailing spaces or mix lowercase and capital letters:

```python
raw_city = "   cAIro   "

# .strip() removes leading and trailing whitespace
clean_city = raw_city.strip().capitalize()
print(f"Formatted city: '{clean_city}'")  # Output: 'Cairo'

# Common string helpers:
msg = "Seek Knowledge From The Cradle To The Grave"
print(msg.lower())       # All lowercase
print(msg.upper())       # All uppercase
print(msg.startswith("Seek"))  # True
print(len(msg))          # Length of string in characters
```

---

## 🎯 Hands-On Mission: The Zakat & Charity Estimator

Build an interactive script that welcomes a donor, records their voluntary charity contribution (*Sadaqah*), and presents a formatted summary statement:

```python
# Welcome banner
print("=" * 45)
print("     COMMUNITY SADAQAH TRACKER 🤝")
print("=" * 45)

donor_name = input("Enter donor name: ").strip().title()
cause = input("Enter cause (Education, Clean Water, Orphan Support): ").strip()
amount = float(input("Enter pledge amount in USD: "))

# Formatted confirmation card
print("\n" + "-" * 45)
print("RECEIPT OF PLEDGE (AMĀNAH)")
print("-" * 45)
print(f"Donor Name : {donor_name}")
print(f"Cause      : {cause}")
print(f"Amount     : ${amount:,.2f}")
print(f"Message    : May your sincere contribution be blessed!")
print("-" * 45)
```
