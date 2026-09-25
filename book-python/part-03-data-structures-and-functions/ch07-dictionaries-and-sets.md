# Chapter 7: Dictionaries & Sets 📖🏷️

Lists are great when items have a natural numerical sequence (1st, 2nd, 3rd). But what if you want to look up an item by its name or identity, like looking up a word in a dictionary?

In Python, we use **dictionaries** for key-value lookups and **sets** for unique items.

---

## 💡 The Mental Model: The Library Catalog Card

In a library, every card contains:
- A **Key** (the descriptive label): `"title"`, `"author"`, `"year"`.
- A **Value** (the specific information): `"Kitab al-Manazir"`, `"Ibn al-Haytham"`, `1021`.

In Python, a dictionary is created using curly braces `{}` with `key: value` pairs:

```python
book = {
    "title": "Book of Optics",
    "author": "Ibn al-Haytham",
    "year": 1021,
    "pages": 450,
    "is_available": True
}

# Accessing values by key:
print(book["title"])   # 'Book of Optics'
print(book["author"])  # 'Ibn al-Haytham'
```

---

## 🔑 Modifying & Safely Reading Dictionaries

```python
# Adding a new key-value pair:
book["category"] = "Physics & Optics"

# Updating an existing value:
book["is_available"] = False

# Safe lookup using .get() (never crashes if key doesn't exist!)
donor_city = book.get("city", "Unknown City")
print("Location:", donor_city)

# Iterating through a dictionary:
for key, value in book.items():
    print(f"{key.capitalize():<12} : {value}")
```

---

## ⭕ Sets: Collections of Unique Items

A **set** is an unordered collection where **no duplicate values are allowed**. Think of a bag of unique stamps:

```python
# Notice duplicate 'Python' entries:
technologies = {"Python", "HTML", "CSS", "Python", "JavaScript", "HTML"}

print(technologies)
# Output: {'Python', 'HTML', 'CSS', 'JavaScript'} -> duplicates automatically removed!
```

### Powerful Set Operations:

```python
group_a_skills = {"Python", "SQL", "Git"}
group_b_skills = {"Python", "Machine Learning", "Statistics"}

# Intersection (skills in BOTH groups):
common = group_a_skills.intersection(group_b_skills)
print("Shared skills:", common)  # {'Python'}

# Union (all combined skills without duplication):
all_skills = group_a_skills.union(group_b_skills)
print("Complete curriculum:", all_skills)
```

---

## 🎯 Hands-On Mission: Hospital Charity Clinic Patient Triage

Build a lookup record for clinic patients waiting for free medical consultations:

```python
clinic_registry = [
    {"id": "P-101", "name": "Amina", "age": 45, "triage_priority": "High", "complaint": "Respiratory distress"},
    {"id": "P-102", "name": "Bilal", "age": 12, "triage_priority": "Normal", "complaint": "Routine checkup"},
    {"id": "P-103", "name": "Khadija", "age": 70, "triage_priority": "Urgent", "complaint": "Cardiac monitoring"},
    {"id": "P-104", "name": "Omar", "age": 28, "triage_priority": "Normal", "complaint": "Mild headache"}
]

print("🚨 URGENT / HIGH PRIORITY TRIAGE QUEUE")
for patient in clinic_registry:
    if patient["triage_priority"] in ["Urgent", "High"]:
        print(f"[{patient['triage_priority']}] ID: {patient['id']} | Patient: {patient['name']} (Age {patient['age']}) | Symptoms: {patient['complaint']}")
```
