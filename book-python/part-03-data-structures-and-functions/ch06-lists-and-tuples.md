# Chapter 6: Lists & Tuples 📋🧵

Until now, each variable has held a single value. But what if you need to manage a list of 50 students, a collection of sensor temperatures, or 100 library books? 

In Python, we use **data structures** to group multiple items together. The most flexible of these is the **List**.

---

## 💡 The Mental Model: A Labeled Train with Numbered Wagons

Think of a list as a train with numbered wagons:
- Every wagon holds an item.
- The wagons are numbered in order starting at **`0`** (Zero-indexed).

```
Index:       [0]          [1]          [2]          [3]
Values:   ["Algebra", "Astronomy",  "Ethics",   "Medicine"]
```

```python
# Creating a list of topics
subjects = ["Algebra", "Astronomy", "Ethics", "Medicine"]
print(subjects[0])  # Output: 'Algebra'
print(subjects[-1]) # Output: 'Medicine' (Negative indexing counts backwards!)
```

---

## 🛠️ List Operations & Essential Methods

Lists are **mutable**, meaning you can add, modify, or remove items at any time:

```python
books = ["Sahih Hadith Studies", "Clean Code", "Linear Algebra"]

# 1. Append (Add item to the end)
books.append("Python for Data Science")

# 2. Insert at specific index
books.insert(1, "Algorithmic Thinking")

# 3. Remove an item by value
books.remove("Clean Code")

# 4. Pop an item by index (removes and returns it)
finished_book = books.pop(0)

# 5. Check length
print("Remaining books:", len(books))

# 6. Sorting
numbers = [42, 12, 88, 3, 27]
numbers.sort()
print("Sorted scores:", numbers)  # [3, 12, 27, 42, 88]
```

---

## ✂️ List Slicing: `[start:stop:step]`

Python allows you to take "slices" of a list without modifying the original:

```python
temperatures = [22.1, 23.5, 24.0, 25.2, 26.8, 27.1, 25.0]

morning_temps = temperatures[0:3]   # Items from index 0 up to 3 (exclusive)
print(morning_temps)                # [22.1, 23.5, 24.0]

last_two = temperatures[-2:]        # Last 2 items
print(last_two)                     # [27.1, 25.0]
```

---

## 🔒 Tuples: Immutable Sequences

A **tuple** looks like a list, but it is written with parentheses `()` instead of square brackets `[]`. 

Crucially, **tuples cannot be changed after creation** (they are *immutable*):

```python
# Geographic coordinates of a relief center
relief_hub_coords = (30.0444, 31.2357)

# Attempting to change a coordinate raises a TypeError:
# relief_hub_coords[0] = 31.0000  ❌ Error! Tuples cannot be modified!
```

> 💡 **When to use Tuples?**
> Use tuples when the data represents a fixed coordinate, an RGB color `(255, 255, 255)`, or dimensions that should never be accidentally changed during program execution (*Amānah*).

---

## 🎯 Hands-On Mission: The Student Gradebook & Honor Roll

Process a list of student exam results and find class performance metrics:

```python
grades = [88, 92, 79, 95, 84, 91, 68, 89]

average_score = sum(grades) / len(grades)
highest_score = max(grades)
lowest_score = min(grades)

honor_roll = [score for score in grades if score >= 90]

print("📊 CLASS PERFORMANCE SUMMARY")
print(f"Total Exam Submissions: {len(grades)}")
print(f"Class Average Score    : {average_score:.1f}%")
print(f"Highest Score Achieved : {highest_score}%")
print(f"Lowest Score Achieved  : {lowest_score}%")
print(f"Honor Roll Qualifiers  : {honor_roll} ({len(honor_roll)} students)")
```
