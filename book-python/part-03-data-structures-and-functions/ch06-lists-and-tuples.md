# Chapter 6: Lists & Tuples

## 🌟 Real-Life Story

Your class teacher keeps one attendance register, not thirty separate notes. Each student has a numbered line. She can read line 5, add a new student at the bottom, or count the lines. A Python **list** is that register. It keeps many values together, in order, under one name.

## 🎯 What You Will Learn

- Create lists and read items by their index (position number).
- Add, change, remove and sort items with list methods.
- Loop over a list to total, count and filter values.
- Take a part of a list with slicing.
- Use tuples for data that should never change.

## Creating a List

A **list** is written with square brackets `[ ]`. Items are separated by commas. Think of a train: each wagon holds one item, and the wagons are numbered **starting at 0**. The position number is called the **index**.

```
Index:   0          1           2
      ["Algebra", "Astronomy", "Ethics"]
Back:   -3         -2          -1
```

```python
subjects = ["Algebra", "Astronomy", "Ethics", "Medicine"]

print(subjects)
print(subjects[0])
print(subjects[2])
print(subjects[-1])
print(len(subjects))
```

**Output:**

```text
['Algebra', 'Astronomy', 'Ethics', 'Medicine']
Algebra
Ethics
Medicine
4
```

- `subjects[0]` is the **first** item, because counting starts at 0.
- A **negative index** counts from the end. `-1` is the last item.
- `len()` gives the number of items.

A list can hold any type: numbers, strings, Booleans, or a mix. It can even be empty: `[]`.

### Changing an Item

Lists are **mutable**: you can change them after creating them. Put a new value at an index with `=`.

```python
readings = [22, 24, 99, 23]
readings[2] = 25      # fix a faulty sensor reading
print(readings)
```

**Output:**

```text
[22, 24, 25, 23]
```

## List Methods

A list comes with built-in methods. Here are the most useful ones:

| Method | What it does |
| :--- | :--- |
| `.append(x)` | Adds `x` at the end |
| `.insert(i, x)` | Puts `x` at index `i` and moves the rest along |
| `.remove(x)` | Removes the first item equal to `x` |
| `.pop(i)` | Removes the item at index `i` and gives it back |
| `.sort()` | Sorts the list in place, smallest first |

```python
books = ["Clean Code", "Linear Algebra"]

books.append("Python for Science")
print(books)

books.insert(1, "Algorithmic Thinking")
print(books)

books.remove("Clean Code")
print(books)

finished = books.pop(0)
print("Finished reading:", finished)
print(books)

scores = [42, 12, 88, 3, 27]
scores.sort()
print(scores)
scores.sort(reverse=True)
print(scores)
```

**Output:**

```text
['Clean Code', 'Linear Algebra', 'Python for Science']
['Clean Code', 'Algorithmic Thinking', 'Linear Algebra', 'Python for Science']
['Algorithmic Thinking', 'Linear Algebra', 'Python for Science']
Finished reading: Algorithmic Thinking
['Linear Algebra', 'Python for Science']
[3, 12, 27, 42, 88]
[88, 42, 27, 12, 3]
```

### Is It in the List?

The keyword `in` checks whether a value is in a list. It gives `True` or `False`. `not in` asks the opposite question.

```python
volunteers = ["Amina", "Bilal", "Hana"]
print("Hana" in volunteers)
print("Omar" in volunteers)

if "Omar" not in volunteers:
    volunteers.append("Omar")
print(volunteers)
```

**Output:**

```text
True
False
['Amina', 'Bilal', 'Hana', 'Omar']
```

## Looping Over a List

A `for` loop can visit every item of a list, one by one, just as it visited each letter of a string.

```python
donations = [25, 40, 15, 60]
total = 0

for amount in donations:
    total += amount
    print(f"Added {amount}, running total {total}")

print(f"Total raised: {total}")
```

**Output:**

```text
Added 25, running total 25
Added 40, running total 65
Added 15, running total 80
Added 60, running total 140
Total raised: 140
```

### Built-in Helpers: `sum`, `max`, `min`

Python can do common jobs for you. These work on lists of numbers:

```python
temperatures = [22.1, 23.5, 24.0, 25.2, 26.8]

print(sum(temperatures))
print(max(temperatures))
print(min(temperatures))
average = sum(temperatures) / len(temperatures)
print(f"Average: {round(average, 1)}")
```

**Output:**

```text
121.6
26.8
22.1
Average: 24.3
```

The average is `24.32`, so `round(average, 1)` shows `24.3`. Rounding matters with decimals. Try `print(0.1 + 0.2)`: it shows `0.30000000000000004`, because computers store decimals in binary. `round()` tidies such leftovers.

### Building a New List in a Loop

To **filter** a list (keep only some items), start with an empty list and `append` the items you want.

```python
grades = [88, 92, 79, 95, 84, 91]
honour_roll = []

for grade in grades:
    if grade >= 90:
        honour_roll.append(grade)

print(honour_roll)
print(f"{len(honour_roll)} students made the honour roll")
```

**Output:**

```text
[92, 95, 91]
3 students made the honour roll
```

## Slicing: Taking Part of a List

A **slice** copies a part of a list. Write `[start:stop]`. Like `range()`, it stops **before** `stop`. The original list does not change.

| Slice | Meaning |
| :--- | :--- |
| `days[0:3]` | Items at index 0, 1, 2 |
| `days[:2]` | From the start up to index 2 |
| `days[3:]` | From index 3 to the end |
| `days[-2:]` | The last two items |

```python
days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]

print(days[0:3])
print(days[3:])
print(days[-2:])
print(days)
```

**Output:**

```text
['Sat', 'Sun', 'Mon']
['Tue', 'Wed', 'Thu', 'Fri']
['Thu', 'Fri']
['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
```

## Tuples: Lists That Cannot Change

A **tuple** looks like a list, but uses round brackets `( )`. A tuple is **immutable**: once made, it cannot be changed. Use it for values that belong together and must stay fixed, like map coordinates or a date.

```python
relief_hub = (30.0444, 31.2357)     # latitude, longitude
print(relief_hub[0])
print(len(relief_hub))

latitude, longitude = relief_hub     # unpacking
print(f"Latitude {latitude}, longitude {longitude}")
```

**Output:**

```text
30.0444
2
Latitude 30.0444, longitude 31.2357
```

**Unpacking** puts each item of a tuple into its own variable, in order. Trying to change a tuple causes an error:

```python
relief_hub = (30.0444, 31.2357)
relief_hub[0] = 31.0
```

**Output:**

```text
TypeError: 'tuple' object does not support item assignment
```

| | List | Tuple |
| :--- | :--- | :--- |
| Brackets | `[1, 2, 3]` | `(1, 2, 3)` |
| Can change? | Yes (mutable) | No (immutable) |
| Good for | A register that grows | Fixed facts: coordinates, dates |

Using a tuple protects data that must not be changed by accident. That is a small act of trust (*Amānah*).

## Worked Example: Class Results Summary

```python
grades = [88, 92, 79, 95, 84, 91, 68, 89]

average = sum(grades) / len(grades)
honour_roll = []
needs_help = 0

for grade in grades:
    if grade >= 90:
        honour_roll.append(grade)
    if grade < 70:
        needs_help += 1

print("CLASS RESULTS SUMMARY")
print(f"Exams marked : {len(grades)}")
print(f"Average      : {round(average, 1)}")
print(f"Highest      : {max(grades)}")
print(f"Lowest       : {min(grades)}")
print(f"Honour roll  : {honour_roll}")
print(f"Extra support: {needs_help} student(s)")
```

**Output:**

```text
CLASS RESULTS SUMMARY
Exams marked : 8
Average      : 85.8
Highest      : 95
Lowest       : 68
Honour roll  : [92, 95, 91]
Extra support: 1 student(s)
```

## ⚠️ Common Mistake

**1. Using an index that does not exist.** A list of 3 items has indexes 0, 1 and 2. There is no index 3.

```python
colours = ["red", "green", "blue"]
print(colours[3])
```

**Output:**

```text
IndexError: list index out of range
```

**Fix:** the last index is always `len(list) - 1`, or simply use `colours[-1]`.

**2. Storing the result of `.sort()`.** `.sort()` changes the list itself and gives back nothing (`None`).

```python
scores = [30, 10, 20]
sorted_scores = scores.sort()
print(sorted_scores)
print(scores)
```

**Output:**

```text
None
[10, 20, 30]
```

**Fix:** call `scores.sort()` on its own line, then use `scores`.

## ✍️ Try It

Make a list of the minutes you spent reading each day this week, for example `[20, 35, 0, 15, 40, 25, 30]`. Print the total, the longest day, and how many days had **no** reading.

**Hint:** use `sum()` and `max()`, then a loop with a counter for the zeros.

## 📝 Recap

- A list keeps many values in order: `[a, b, c]`. Indexes start at 0; `-1` is the last item.
- Lists are mutable: `.append()`, `.insert()`, `.remove()`, `.pop()` and `.sort()` change them.
- Loop over a list with `for`. `sum()`, `max()`, `min()` and `len()` summarise numbers.
- To filter, start with `[]` and `append` the items you want.
- Slices like `[1:4]` copy part of a list. Tuples `( )` are like lists that cannot change.

## 🏆 Practice

### 🟢 Level 1: Recall
Given `planets = ["Mercury", "Venus", "Earth", "Mars"]`, what is `planets[1]`, `planets[-1]` and `planets[1:3]`?

<details>
<summary>Show answer</summary>

`"Venus"`, `"Mars"` and `["Venus", "Earth"]`.

</details>

### 🟡 Level 2: Apply
Start with `queue = ["Amina", "Bilal"]`. Add `"Hana"` at the end, put `"Omar"` at the front, then remove the first person with `.pop(0)` and print who was served and the queue that is left.

<details>
<summary>Show answer</summary>

```python
queue = ["Amina", "Bilal"]
queue.append("Hana")
queue.insert(0, "Omar")
served = queue.pop(0)
print("Served:", served)
print(queue)
```

Output:

```text
Served: Omar
['Amina', 'Bilal', 'Hana']
```

</details>

### 🔴 Level 3: Challenge
A clean-up team weighed the rubbish they collected each day (kg): `[12.5, 8.0, 15.5, 4.0, 10.0]`.

1. Print the total and the average (rounded to 1 decimal place).
2. Build a new list of the "big days" (more than 10 kg) with a loop and `append`.
3. Print the big days sorted from largest to smallest.

<details>
<summary>Show one possible answer</summary>

```python
weights = [12.5, 8.0, 15.5, 4.0, 10.0]

total = sum(weights)
average = total / len(weights)
print(f"Total: {total} kg, average: {round(average, 1)} kg")

big_days = []
for kg in weights:
    if kg > 10:
        big_days.append(kg)

big_days.sort(reverse=True)
print("Big days:", big_days)
```

Output:

```text
Total: 50.0 kg, average: 10.0 kg
Big days: [15.5, 12.5]
```

</details>
