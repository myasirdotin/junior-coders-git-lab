# Chapter 3: User Input & String Formatting (F-Strings) 🗣️

## 🌟 Real-Life Story

At the school library desk, the librarian has a printed card: "Dear ______, your book is due on ______." She asks your name and the date, then writes them in the gaps. The card stays the same. Only the gaps change. In this chapter, Python learns to ask questions with `input()` and to fill gaps in sentences with **f-strings**.

## 🎯 What You Will Learn

- Ask the user a question with `input()` and know that the answer is always text.
- Convert typed answers into numbers with `int()` and `float()`.
- Build clear sentences with f-strings.
- Clean and change text with string methods such as `.strip()` and `.title()`.

## 📥 Getting Input with `input()`

The `input()` function shows a question, then **pauses** the program. It waits for the person to type an answer and press <kbd>Enter</kbd>. The answer is stored in a variable.

```python
student_name = input("Please enter your name: ")
print("Peace be upon you, " + student_name + "!")
```

When you run this on a computer, the screen looks like this. The person typed `Maryam`:

```text
Please enter your name: Maryam
Peace be upon you, Maryam!
```

> 💻 **Where `input()` works**: `input()` works when you run Python on a computer (for example `python greet.py` in a terminal). It does **not** work in the Python Console on this website. So in this book, we put the value straight into the code instead, like this:

```python
student_name = "Maryam"   # on a computer: input("Please enter your name: ")
print("Peace be upon you, " + student_name + "!")
```

**Output:**

```text
Peace be upon you, Maryam!
```

Both programs print the same message. The only difference is where the name comes from.

### `input()` Always Gives a String

This is the most important rule in this chapter. `input()` **always returns a string**, even when the person types digits. If they type `15`, Python receives the text `"15"`. To do maths, convert it first:

```python
daily_pages = int(input("How many pages did you read today? "))
weekly_pages = daily_pages * 7
print("At this rate, you will read", weekly_pages, "pages this week!")
```

In the console version, we write the text `"12"` to act like a typed answer:

```python
typed_answer = "12"            # what input() would give us
daily_pages = int(typed_answer)
weekly_pages = daily_pages * 7
print("At this rate, you will read", weekly_pages, "pages this week!")
```

**Output:**

```text
At this rate, you will read 84 pages this week!
```

Use `int()` for whole numbers and `float()` for decimals such as `36.6`.

## 💎 F-Strings: Filling the Gaps

Joining text with `+` works, but it gets messy. You must add spaces yourself, and numbers need `str()`:

```python
name = "Zayd"
score = 95
print("Student " + name + " scored " + str(score) + " out of 100.")
```

**Output:**

```text
Student Zayd scored 95 out of 100.
```

An **f-string** (formatted string) is easier. Put the letter `f` just before the opening quote. Then write any variable inside curly braces `{ }`. Python fills the gap with its value.

```python
name = "Zayd"
score = 95
print(f"Student {name} scored {score} out of 100.")
```

**Output:**

```text
Student Zayd scored 95 out of 100.
```

Same output, much easier to read. F-strings handle numbers for you, so `str()` is not needed.

### Calculations Inside the Braces

You can put a small calculation inside the braces. Python works it out first.

```python
loaf_price = 1.25
loaves = 6
print(f"{loaves} loaves cost {loaf_price * loaves} in total.")
print(f"Half of the order is {loaves / 2} loaves.")
```

**Output:**

```text
6 loaves cost 7.5 in total.
Half of the order is 3.0 loaves.
```

### Tidy Decimals with `round()`

Some answers have long decimals. Use `round()` inside the braces to keep them short.

```python
water_litres = 20
students = 3
share = water_litres / students
print(f"Each student carries {share} litres.")
print(f"Each student carries {round(share, 2)} litres.")
```

**Output:**

```text
Each student carries 6.666666666666667 litres.
Each student carries 6.67 litres.
```

`round()` drops zeros at the end. So `round(7.5, 2)` shows `7.5`, not `7.50`. That is fine for our programs.

| You write | Python prints |
| :--- | :--- |
| `f"{2 + 3}"` | `5` |
| `f"Hi {name}"` with `name = "Aisha"` | `Hi Aisha` |
| `f"{round(10 / 3, 1)}"` | `3.3` |
| `f"{{braces}}"` | `{braces}` |

## 🧼 Cleaning Text with String Methods

People type messy answers. They add extra spaces or mix capital and small letters. A **method** is a function that belongs to a value. You call it with a dot: `text.strip()`.

| Method | What it does | `"  cAIro  "` becomes |
| :--- | :--- | :--- |
| `.strip()` | Removes spaces at both ends | `"cAIro"` |
| `.lower()` | All small letters | `"  cairo  "` |
| `.upper()` | All capital letters | `"  CAIRO  "` |
| `.title()` | Capital at the start of each word | `"  Cairo  "` |
| `.replace(a, b)` | Swaps text `a` for text `b` | — |

```python
raw_city = "   cAIro   "
clean_city = raw_city.strip().title()
print(f"Formatted city: '{clean_city}'")

motto = "Seek knowledge from the cradle to the grave"
print(motto.upper())
print(motto.replace("knowledge", "wisdom"))
print(motto.startswith("Seek"))
print(len(motto))
```

**Output:**

```text
Formatted city: 'Cairo'
SEEK KNOWLEDGE FROM THE CRADLE TO THE GRAVE
Seek wisdom from the cradle to the grave
True
43
```

- `raw_city.strip().title()` is **chaining**: first strip, then title-case the result.
- `.startswith()` answers with `True` or `False`.
- `len()` counts the characters, spaces included.

### Repeating Text

The `*` operator repeats a string. It is handy for drawing lines:

```python
print("=" * 30)
print("  COMMUNITY CLEAN-UP DAY")
print("=" * 30)
```

**Output:**

```text
==============================
  COMMUNITY CLEAN-UP DAY
==============================
```

## 🤝 Worked Example: The Sadaqah Pledge Card

A community centre records voluntary charity (*Sadaqah*) pledges. On a computer, the three values would come from `input()`. Here they are written in the code, with messy spacing on purpose.

```python
donor_name = "  amina yusuf "      # input("Donor name: ")
cause = "clean water"              # input("Cause: ")
amount_text = "45"                 # input("Pledge amount: ")

donor_name = donor_name.strip().title()
cause = cause.strip().title()
amount = float(amount_text)
monthly = amount / 12

print("-" * 36)
print("PLEDGE CARD (kept with Amanah)")
print("-" * 36)
print(f"Donor   : {donor_name}")
print(f"Cause   : {cause}")
print(f"Amount  : {amount}")
print(f"Monthly : {round(monthly, 2)}")
print("-" * 36)
```

**Output:**

```text
------------------------------------
PLEDGE CARD (kept with Amanah)
------------------------------------
Donor   : Amina Yusuf
Cause   : Clean Water
Amount  : 45.0
Monthly : 3.75
------------------------------------
```

The messy name became `Amina Yusuf`. The text `"45"` became a real number, so we could divide it.

## ⚠️ Common Mistake

**1. Forgetting the `f`.** Without it, Python prints the braces as plain text.

```python
name = "Bilal"
print("Welcome, {name}!")
```

**Output:**

```text
Welcome, {name}!
```

**Fixed version:** `print(f"Welcome, {name}!")` prints `Welcome, Bilal!`.

**2. Doing maths on input without converting it.** Text times a number repeats the text!

```python
typed_answer = "12"         # input() always gives text
print(typed_answer * 3)     # wrong: repeats the text
print(int(typed_answer) * 3)   # right: real maths
```

**Output:**

```text
121212
36
```

## ✍️ Try It

Write a "study planner" card. Store a subject name with messy spaces, such as `"  physics "`, and a number of minutes as text, such as `"45"`. Clean the subject with `.strip().title()`. Convert the minutes with `int()`. Print: `Today: Physics for 45 minutes (0.75 hours).`

**Hint:** hours = minutes / 60. Put the calculation inside the braces.

## 📝 Recap

- `input()` asks a question and waits. It works on a computer, not in this site's console.
- `input()` always returns a string. Convert with `int()` or `float()` before doing maths.
- An f-string starts with `f` and fills `{ }` gaps with values or small calculations.
- `round(value, places)` keeps decimals short.
- String methods such as `.strip()`, `.title()`, `.lower()` and `.replace()` clean text.

## 🏆 Practice

### 🟢 Level 1: Recall
What type of value does `input()` always return? What must you do before adding 10 to it?

<details>
<summary>Show answer</summary>

It always returns a **string** (`str`). Convert it first with `int()` or `float()`, for example `int(answer) + 10`.

</details>

### 🟡 Level 2: Apply
Rewrite this line as an f-string:

```python
print("The " + club + " club has " + str(members) + " members.")
```

<details>
<summary>Show answer</summary>

```python
print(f"The {club} club has {members} members.")
```

With `club = "Astronomy"` and `members = 18` it prints: `The Astronomy club has 18 members.`

</details>

### 🔴 Level 3: Challenge
Build a temperature card for the school weather station.

1. Store a station name with messy spaces and capitals, for example `"  north FIELD  "`.
2. Store a temperature as text, `"23.4"` (as if it came from `input()`).
3. Clean the name with `.strip().title()` and convert the temperature with `float()`.
4. Work out Fahrenheit: Celsius × 9 / 5 + 32.
5. Print the station name and both temperatures in one f-string, with Fahrenheit rounded to 1 decimal place.

<details>
<summary>Show one possible answer</summary>

```python
station = "  north FIELD  "
temp_text = "23.4"

station = station.strip().title()
celsius = float(temp_text)
fahrenheit = celsius * 9 / 5 + 32

print(f"{station}: {celsius} °C = {round(fahrenheit, 1)} °F")
```

Output:

```text
North Field: 23.4 °C = 74.1 °F
```

</details>
