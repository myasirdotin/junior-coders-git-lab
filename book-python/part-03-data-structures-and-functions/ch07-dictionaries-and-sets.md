# Chapter 7: Dictionaries & Sets 📖

## 🌟 Real-Life Story

In the school library, every book has a catalogue card. The card does not say "item 0, item 1, item 2". It says "Title: …", "Author: …", "Year: …". You find what you need by reading the **label**, not by counting positions. A Python **dictionary** works like that card. A **set** is different: it is like a box of name badges where no name can appear twice.

## 🎯 What You Will Learn

- Store labelled data in a dictionary as key-value pairs.
- Read, add, change and remove entries, and use `.get()` to read safely.
- Loop over a dictionary and count things with it.
- Keep a list of dictionaries as a small table of records.
- Remove duplicates and compare groups with sets.

## 🗂️ Creating a Dictionary

A **dictionary** stores **key-value pairs**. The **key** is the label. The **value** is the information. Write a dictionary with curly braces `{ }`, a colon between each key and value, and commas between pairs.

```
 key          value
"title"   →  "Book of Optics"
"author"  →  "Ibn al-Haytham"
"year"    →  1021
```

```python
book = {
    "title": "Book of Optics",
    "author": "Ibn al-Haytham",
    "year": 1021,
    "is_available": True
}

print(book["title"])
print(book["year"])
print(len(book))
print(book)
```

**Output:**

```text
Book of Optics
1021
4
{'title': 'Book of Optics', 'author': 'Ibn al-Haytham', 'year': 1021, 'is_available': True}
```

You read a value with square brackets and the **key**: `book["title"]`. Keys are usually strings. Each key appears only once in a dictionary.

## ✏️ Adding, Changing and Removing

```python
book = {"title": "Book of Optics", "year": 1021, "is_available": True}

book["category"] = "Physics"     # new key: adds a pair
book["is_available"] = False     # existing key: changes the value
print(book)

removed = book.pop("year")       # removes the pair, gives back the value
print("Removed:", removed)
print(book)

print("title" in book)
print("year" in book)
```

**Output:**

```text
{'title': 'Book of Optics', 'year': 1021, 'is_available': False, 'category': 'Physics'}
Removed: 1021
{'title': 'Book of Optics', 'is_available': False, 'category': 'Physics'}
True
False
```

- Assigning to a **new** key adds a pair. Assigning to an **existing** key replaces its value.
- `.pop(key)` removes a pair and returns its value.
- `in` checks whether a **key** exists.

### Reading Safely with `.get()`

Asking for a key that does not exist causes an error (see Common Mistake). `.get(key, default)` is safer. If the key is missing, it gives back the default value instead.

```python
book = {"title": "Book of Optics", "author": "Ibn al-Haytham"}

print(book.get("author", "Unknown"))
print(book.get("publisher", "Unknown"))
print(book.get("publisher"))
```

**Output:**

```text
Ibn al-Haytham
Unknown
None
```

With no default, `.get()` returns `None`, Python's word for "nothing here".

## 🔁 Looping Over a Dictionary

A `for` loop over a dictionary visits its **keys**. Use `.items()` to get each key **and** its value together.

| Code | Gives you |
| :--- | :--- |
| `for k in d:` | each key |
| `for v in d.values():` | each value |
| `for k, v in d.items():` | each key and value |

```python
stock = {"notebooks": 40, "pencils": 120, "rulers": 15}

for item in stock:
    print(item)

for item, count in stock.items():
    print(f"{item}: {count}")

print("Total items:", sum(stock.values()))
```

**Output:**

```text
notebooks
pencils
rulers
notebooks: 40
pencils: 120
rulers: 15
Total items: 175
```

Dictionaries remember the order in which you added the keys, so loops follow that order.

## 🧮 Counting with a Dictionary

A very common job is counting how often each thing appears. Start with an empty dictionary `{}`. For each item, add 1 to its count. `.get(item, 0)` gives 0 the first time an item is seen.

```python
votes = ["tree planting", "book drive", "tree planting",
         "beach clean-up", "tree planting", "book drive"]

tally = {}
for choice in votes:
    tally[choice] = tally.get(choice, 0) + 1

print(tally)
for choice, count in tally.items():
    print(f"{choice}: {count} vote(s)")
```

**Output:**

```text
{'tree planting': 3, 'book drive': 2, 'beach clean-up': 1}
tree planting: 3 vote(s)
book drive: 2 vote(s)
beach clean-up: 1 vote(s)
```

This "tally" pattern appears again in the machine learning chapters, where we count labels in a dataset.

## 🧾 A List of Dictionaries: A Small Table

Real data often has many records with the same keys. Put each record in a dictionary and keep them all in a list. Each dictionary is one **row**; each key is one **column**.

| id | name | age | priority |
| :--- | :--- | :--- | :--- |
| P-101 | Amina | 45 | High |
| P-102 | Bilal | 12 | Normal |
| P-103 | Khadija | 70 | Urgent |

```python
clinic_queue = [
    {"id": "P-101", "name": "Amina", "age": 45, "priority": "High"},
    {"id": "P-102", "name": "Bilal", "age": 12, "priority": "Normal"},
    {"id": "P-103", "name": "Khadija", "age": 70, "priority": "Urgent"},
    {"id": "P-104", "name": "Omar", "age": 28, "priority": "Normal"}
]

print("PATIENTS TO SEE FIRST")
for patient in clinic_queue:
    if patient["priority"] in ["Urgent", "High"]:
        print(f"{patient['id']}  {patient['name']}  ({patient['priority']})")

print("First record's age:", clinic_queue[0]["age"])
```

**Output:**

```text
PATIENTS TO SEE FIRST
P-101  Amina  (High)
P-103  Khadija  (Urgent)
First record's age: 45
```

`clinic_queue[0]["age"]` reads in two steps: first item of the list, then the `"age"` key. Inside a double-quoted f-string, use single quotes for keys: `{patient['name']}`.

## ⭕ Sets: Only Unique Items

A **set** is a collection where **no value can appear twice**. Write it with curly braces but no colons: `{"a", "b"}`. A set has **no order**, so it has no indexes. When printing a set of words, the order can change from run to run. So in this chapter we print `sorted(...)`. The built-in `sorted()` gives back a new, sorted **list**.

```python
attendees = ["Hana", "Yusuf", "Hana", "Maryam", "Yusuf", "Hana"]

unique_people = set(attendees)
print(len(attendees), "sign-ins")
print(len(unique_people), "different people")
print(sorted(unique_people))

unique_people.add("Idris")
print("Idris" in unique_people)
```

**Output:**

```text
6 sign-ins
3 different people
['Hana', 'Maryam', 'Yusuf']
True
```

`set(list)` is a quick way to remove duplicates. `in` is very fast on a set.

### Comparing Two Groups

| Method | Meaning |
| :--- | :--- |
| `a.intersection(b)` | items in **both** sets |
| `a.union(b)` | items in **either** set |
| `a.difference(b)` | items in `a` but **not** in `b` |

```python
group_a = {"Python", "SQL", "Git"}
group_b = {"Python", "Statistics", "Git", "Ethics"}

print(sorted(group_a.intersection(group_b)))
print(sorted(group_a.union(group_b)))
print(sorted(group_b.difference(group_a)))
```

**Output:**

```text
['Git', 'Python']
['Ethics', 'Git', 'Python', 'SQL', 'Statistics']
['Ethics', 'Statistics']
```

## 🧭 Which Collection Should I Use?

| Collection | Looks like | Ordered? | Can change? | Duplicates? | Use for |
| :--- | :--- | :--- | :--- | :--- | :--- |
| List | `[1, 2]` | Yes | Yes | Yes | A register that grows |
| Tuple | `(1, 2)` | Yes | No | Yes | Fixed facts |
| Dictionary | `{"a": 1}` | Yes | Yes | Keys: no | Looking up by label |
| Set | `{1, 2}` | No | Yes | No | Unique items |

## ⚠️ Common Mistake

**1. Reading a key that does not exist.**

```python
student = {"name": "Maryam", "grade": 8}
print(student["email"])
```

**Output:**

```text
KeyError: 'email'
```

A `KeyError` means the key is not in the dictionary. **Fix:** check with `if "email" in student:` or use `student.get("email", "not given")`. (Collecting only the details you really need, like no email for a reading log, also protects privacy: *Amānah*.)

**2. Making an empty set with `{}`.** Empty braces make an empty **dictionary**, not a set.

```python
badges = {}
print(type(badges))
badges = set()
print(type(badges))
```

**Output:**

```text
<class 'dict'>
<class 'set'>
```

**Fix:** use `set()` for an empty set.

## ✍️ Try It

Create a dictionary of a science-fair project: `title`, `team` (a list of two names), `category` and `score`. Print each key and value with `.items()`. Then raise the score by 5 and print the new score.

**Hint:** `project["score"] += 5` works on dictionary values too.

## 📝 Recap

- A dictionary stores key-value pairs: `{"key": value}`. Read with `d["key"]` or, safely, `d.get("key", default)`.
- Assign to a key to add or change it; `.pop(key)` removes it; `in` checks keys.
- `.items()` gives keys and values together in a loop. The `.get(x, 0) + 1` pattern counts things.
- A list of dictionaries is a small table: one dictionary per row.
- A set keeps only unique items and has no order. `set()` makes an empty set.

## 🏆 Practice

### 🟢 Level 1: Recall
What does `{"a": 1, "b": 2}.get("c", 0)` give? And what does `len({"x", "y", "x"})` give?

<details>
<summary>Show answer</summary>

`0` (the key `"c"` is missing, so the default is returned) and `2` (the duplicate `"x"` is removed).

</details>

### 🟡 Level 2: Apply
Count how many books of each subject were returned today:
`returned = ["science", "history", "science", "maths", "science"]`. Print the dictionary.

<details>
<summary>Show answer</summary>

```python
returned = ["science", "history", "science", "maths", "science"]
counts = {}
for subject in returned:
    counts[subject] = counts.get(subject, 0) + 1
print(counts)
```

Output:

```text
{'science': 3, 'history': 1, 'maths': 1}
```

</details>

### 🔴 Level 3: Challenge
A bakery donates bread to three shelters. The records are a list of dictionaries:

```python
deliveries = [
    {"shelter": "North", "loaves": 30},
    {"shelter": "East", "loaves": 25},
    {"shelter": "North", "loaves": 20},
    {"shelter": "West", "loaves": 15}
]
```

1. Build a dictionary with the total loaves for each shelter.
2. Print each shelter and its total.
3. Use a set to print how many different shelters received bread.

<details>
<summary>Show one possible answer</summary>

```python
totals = {}
shelters = set()

for d in deliveries:
    name = d["shelter"]
    totals[name] = totals.get(name, 0) + d["loaves"]
    shelters.add(name)

for name, loaves in totals.items():
    print(f"{name}: {loaves} loaves")
print("Different shelters:", len(shelters))
```

Output:

```text
North: 50 loaves
East: 25 loaves
West: 15 loaves
Different shelters: 3
```

</details>
