# Chapter 10: Tabular Data (CSV & JSON)

## 🌟 Real-Life Story

Two schools want to share their recycling results. One school writes a long paragraph: "On Monday we collected about twelve kilos, and on Tuesday…". The other sends a neat table with columns for day and kilograms. Which one can a computer read? The table, of course. Data science runs on **structured data**: information arranged in rows, columns and labels. The two most common formats for it are **CSV** and **JSON**.

## 🎯 What You Will Learn

- Describe the CSV and JSON formats and when to use each.
- Write and read CSV files with Python's `csv` module.
- Convert CSV text values into numbers and calculate with them.
- Save Python dictionaries and lists as JSON and load them back with the `json` module.

## CSV: Comma-Separated Values

A **CSV** file is plain text. Each line is one **row**. Commas separate the **columns**. The first line is usually the **header**: the names of the columns.

```csv
city,solar_panels,daily_kwh
Cairo,120,480.5
Amman,80,310.2
Tunis,95,390.0
```

As a table, it looks like this:

| city | solar_panels | daily_kwh |
| :--- | :--- | :--- |
| Cairo | 120 | 480.5 |
| Amman | 80 | 310.2 |
| Tunis | 95 | 390.0 |

Any spreadsheet program can open a CSV file. That makes CSV a common way to move data between programs.

### Writing a CSV File

Python's built-in `csv` module handles the commas for you. `csv.writer` turns a list into one CSV row with `.writerow()`.

```python
import csv

with open("solar.csv", "w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)
    writer.writerow(["city", "solar_panels", "daily_kwh"])
    writer.writerow(["Cairo", 120, 480.5])
    writer.writerow(["Amman", 80, 310.2])
    writer.writerow(["Tunis", 95, 390.0])

with open("solar.csv", "r", encoding="utf-8") as file:
    print(file.read())
```

**Output:**

```text
city,solar_panels,daily_kwh
Cairo,120,480.5
Amman,80,310.2
Tunis,95,390.0
```

Always pass `newline=""` when you open a CSV file for writing. Without it, Windows computers can add an extra blank line after every row.

### Reading Rows as Lists: `csv.reader`

`csv.reader` gives each row as a **list** of strings.

```python
import csv

with open("solar.csv", "r", encoding="utf-8") as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)
```

**Output:**

```text
['city', 'solar_panels', 'daily_kwh']
['Cairo', '120', '480.5']
['Amman', '80', '310.2']
['Tunis', '95', '390.0']
```

Notice the quotes: `'120'` is a **string**. Everything read from a CSV file is text.

### Reading Rows as Dictionaries: `csv.DictReader`

`csv.DictReader` is often easier. It reads the header for you and gives each row as a **dictionary**. You use the column names as keys.

```python
import csv

total_kwh = 0
with open("solar.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        energy = float(row["daily_kwh"])
        total_kwh += energy
        print(f"{row['city']}: {energy} kWh from {row['solar_panels']} panels")

print(f"Total: {round(total_kwh, 1)} kWh per day")
```

**Output:**

```text
Cairo: 480.5 kWh from 120 panels
Amman: 310.2 kWh from 80 panels
Tunis: 390.0 kWh from 95 panels
Total: 1180.7 kWh per day
```

| Tool | Each row is a… | Read a value with |
| :--- | :--- | :--- |
| `csv.reader` | list | `row[2]` |
| `csv.DictReader` | dictionary | `row["daily_kwh"]` |

## JSON: Data with Labels and Nesting

**JSON** (JavaScript Object Notation) stores data with labels, like a Python dictionary. It can also hold lists **inside** records, which a flat CSV table cannot do easily. Websites and apps use JSON to send data to each other.

```json
{
  "experiment": "Plant growth under LED light",
  "batch_id": 402,
  "samples": [
    {"plant_id": "P1", "height_cm": 14.2, "healthy": true},
    {"plant_id": "P2", "height_cm": 11.8, "healthy": false}
  ]
}
```

JSON looks almost like Python, with a few small differences:

| Python | JSON |
| :--- | :--- |
| `dict` `{"a": 1}` | object `{"a": 1}` |
| `list` `[1, 2]` | array `[1, 2]` |
| `True` / `False` | `true` / `false` |
| `None` | `null` |
| `'single'` or `"double"` quotes | `"double"` quotes only |

### Saving and Loading JSON

The `json` module converts in both directions:

- `json.dump(data, file)` saves Python data into a JSON file.
- `json.load(file)` reads a JSON file back into Python data.
- The argument `indent=2` adds line breaks and spaces so people can read the file.

```python
import json

farm = {
    "organisation": "Green Oasis Farm Co-op",
    "acres": 25.5,
    "crops": ["barley", "olives", "pomegranates"],
    "organic": True,
    "manager": None
}

with open("farm.json", "w", encoding="utf-8") as file:
    json.dump(farm, file, indent=2)

with open("farm.json", "r", encoding="utf-8") as file:
    print(file.read())

with open("farm.json", "r", encoding="utf-8") as file:
    loaded = json.load(file)

print(loaded["crops"][1])
print(type(loaded))
```

**Output:**

```text
{
  "organisation": "Green Oasis Farm Co-op",
  "acres": 25.5,
  "crops": [
    "barley",
    "olives",
    "pomegranates"
  ],
  "organic": true,
  "manager": null
}
olives
<class 'dict'>
```

In the file, `True` became `true` and `None` became `null`. After `json.load`, they are Python values again, and `loaded` is a normal dictionary.

### JSON from a String

Data from a website often arrives as a string of JSON text. `json.loads()` (with an **s** for "string") turns that text into Python data. `json.dumps()` does the reverse.

```python
import json

message = '{"station": "North Field", "readings": [21.5, 23.0, 22.5]}'
data = json.loads(message)

readings = data["readings"]
print(data["station"])
print(f"Average: {round(sum(readings) / len(readings), 2)}")
print(json.dumps({"ok": True, "count": 3}))
```

**Output:**

```text
North Field
Average: 22.33
{"ok": true, "count": 3}
```

## CSV or JSON?

| | CSV | JSON |
| :--- | :--- | :--- |
| Shape | Flat table: rows and columns | Nested: records inside records |
| Types | Everything is text | Numbers, true/false, null, text |
| Opens in a spreadsheet | Yes | No |
| Common use | Sensor logs, gradebooks | Web apps, settings, APIs |

## Looking Ahead: NumPy and Pandas

Data scientists often use two extra libraries. They are not part of standard Python; on a computer you install them with `pip install pandas`.

- **NumPy**: fast maths on large lists of numbers.
- **Pandas**: tables called **DataFrames**, a bit like a spreadsheet inside Python.

```python
# A preview only: this needs pandas installed
# import pandas as pd
# table = pd.read_csv("solar.csv")
# print(table["daily_kwh"].mean())
```

Everything in this book uses only the standard library, so you understand what these tools do for you.

## Worked Example: Library Borrowing Report

The school library stores how often each book was borrowed. We write the records with `csv.DictWriter`, then read them back to find the most borrowed book.

```python
import csv

catalogue = [
    {"isbn": "978-01", "title": "Algorithmic Integrity", "borrows": 45},
    {"isbn": "978-02", "title": "History of Mathematics", "borrows": 62},
    {"isbn": "978-03", "title": "Intro to Python and AI", "borrows": 110},
    {"isbn": "978-04", "title": "Principles of Astronomy", "borrows": 38}
]

with open("library.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["isbn", "title", "borrows"])
    writer.writeheader()
    writer.writerows(catalogue)

top_title = ""
top_borrows = 0
total = 0

with open("library.csv", "r", encoding="utf-8") as f:
    for row in csv.DictReader(f):
        borrows = int(row["borrows"])
        total += borrows
        if borrows > top_borrows:
            top_borrows = borrows
            top_title = row["title"]

print(f"Most borrowed: {top_title} ({top_borrows} times)")
print(f"All borrows this term: {total}")
```

**Output:**

```text
Most borrowed: Intro to Python and AI (110 times)
All borrows this term: 255
```

`.writeheader()` writes the column names. `.writerows()` writes every dictionary in the list as a row.

## ⚠️ Common Mistake

**1. Comparing CSV numbers while they are still text.** Strings are compared letter by letter, like words in a dictionary, so `"110"` comes **before** `"45"`.

```python
borrows_from_csv = ["45", "62", "110", "38"]
print(max(borrows_from_csv))

numbers = []
for b in borrows_from_csv:
    numbers.append(int(b))
print(max(numbers))
```

**Output:**

```text
62
110
```

`"62"` won because `"6"` comes after `"4"`, `"3"` and `"1"`. **Fix:** convert with `int()` or `float()` before comparing or adding.

**2. Writing Python spellings inside JSON text.** JSON needs `true` and double quotes.

```python
import json
json.loads("{'done': True}")
```

**Output:**

```text
json.decoder.JSONDecodeError: Expecting property name enclosed in double quotes: line 1 column 2 (char 1)
```

**Fix:** write `'{"done": true}'`, or build a Python dictionary and let `json.dumps()` write the JSON for you.

## ✍️ Try It

Create a CSV file `cleanup.csv` with the header `street,bags` and three streets with bag counts. Read it with `csv.DictReader` and print the total number of bags.

**Hint:** remember `newline=""` when writing, and `int(row["bags"])` when reading.

## 📝 Recap

- CSV stores a flat table as text: one row per line, commas between columns, a header first.
- `csv.writer` / `csv.DictWriter` write rows; `csv.reader` / `csv.DictReader` read them.
- Every value read from CSV is a string. Convert numbers before doing maths or comparing.
- JSON stores labelled, nested data. `json.dump`/`json.load` work with files; `json.dumps`/`json.loads` work with strings.
- In JSON: `true`, `false`, `null` and double quotes only.

## 🏆 Practice

### 🟢 Level 1: Recall
How do you write the Python value `None` in JSON? What type is every value that `csv.DictReader` gives you?

<details>
<summary>Show answer</summary>

`None` is written as `null`. Every value from `csv.DictReader` is a **string** (`str`).

</details>

### 🟡 Level 2: Apply
Turn this dictionary into JSON text with `json.dumps` and print it:
`{"club": "Robotics", "members": 14, "active": True}`.

<details>
<summary>Show answer</summary>

```python
import json
club = {"club": "Robotics", "members": 14, "active": True}
print(json.dumps(club))
```

Output:

```text
{"club": "Robotics", "members": 14, "active": true}
```

</details>

### 🔴 Level 3: Challenge
Convert a CSV gradebook into a JSON report.

1. Write `grades.csv` with columns `name,score` and four students: Amina 88, Bilal 74, Hana 95, Idris 61.
2. Read it with `csv.DictReader`. Build a list of dictionaries with `score` as an `int`.
3. Work out the class average.
4. Save `{"average": ..., "students": [...]}` to `report.json` with `indent=2`, then load it and print the average.

<details>
<summary>Show one possible answer</summary>

```python
import csv
import json

with open("grades.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["name", "score"])
    writer.writerow(["Amina", 88])
    writer.writerow(["Bilal", 74])
    writer.writerow(["Hana", 95])
    writer.writerow(["Idris", 61])

students = []
with open("grades.csv", "r", encoding="utf-8") as f:
    for row in csv.DictReader(f):
        students.append({"name": row["name"], "score": int(row["score"])})

total = 0
for s in students:
    total += s["score"]
average = round(total / len(students), 1)

with open("report.json", "w", encoding="utf-8") as f:
    json.dump({"average": average, "students": students}, f, indent=2)

with open("report.json", "r", encoding="utf-8") as f:
    report = json.load(f)
print("Class average:", report["average"])
```

Output:

```text
Class average: 79.5
```

</details>
