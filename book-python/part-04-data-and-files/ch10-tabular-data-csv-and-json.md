# Chapter 10: Tabular Data (CSV & JSON) 📊🗄️

Machine Learning and Data Science do not operate on raw unstructured sentences alone. They run on **structured data**: tables, rows, columns, and key-value records.

The two most universal formats in data science are **CSV** (Comma-Separated Values) and **JSON** (JavaScript Object Notation).

---

## 📄 Understanding CSV Files

A CSV file is a plain text file where each line is a row, and each column is separated by a comma `,`:

```csv
city,solar_panels,daily_kwh,active
Cairo,120,480.5,True
Baghdad,95,390.0,True
Amman,80,310.2,False
```

### Reading CSV with Python's Built-in `csv` Module:

```python
import csv

# Reading rows from a CSV
with open("solar_data.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        city = row["city"]
        energy = float(row["daily_kwh"])
        print(f"City: {city:<10} | Daily Generation: {energy} kWh")
```

---

## 🌐 Understanding JSON Files

JSON is the universal language of web APIs and modern AI pipelines. It closely mirrors Python's native dictionaries and lists:

```json
{
  "experiment": "Plant Growth under LED",
  "batch_id": 402,
  "samples": [
    {"plant_id": "P1", "height_cm": 14.2, "health": "Healthy"},
    {"plant_id": "P2", "height_cm": 11.8, "health": "Needs Water"}
  ]
}
```

### Working with `json` in Python:

```python
import json

# Saving a Python dictionary to a JSON file
farm_data = {
    "organization": "Green Oasis Agricultural Relief",
    "total_acreage": 25.5,
    "crops": ["Barley", "Olives", "Pomegranate"],
    "organic_certified": True
}

with open("farm_manifest.json", "w", encoding="utf-8") as f:
    json.dump(farm_data, f, indent=4)

print("JSON data saved with clear formatting!")

# Loading data back into Python
with open("farm_manifest.json", "r", encoding="utf-8") as f:
    loaded_data = json.load(f)
    print("Loaded crops:", loaded_data["crops"])
```

---

## 📈 Preview of NumPy & Pandas

In advanced machine learning, you will encounter two cornerstone third-party libraries:
- **NumPy**: High-speed mathematical multidimensional arrays and matrix operations.
- **Pandas**: A powerful spreadsheet-like data analysis tool (called `DataFrames`).

```python
# A conceptual preview of Pandas:
# import pandas as pd
# df = pd.read_csv("sensor_readings.csv")
# print(df.describe())  # Calculates mean, min, max instantly!
```

---

## 🎯 Hands-On Mission: Library Circulation Analytics

Read and calculate statistics from an educational catalog dataset:

```python
import csv

catalog = [
    {"isbn": "978-01", "title": "Algorithmic Integrity", "borrow_count": 45},
    {"isbn": "978-02", "title": "History of Mathematics", "borrow_count": 62},
    {"isbn": "978-03", "title": "Intro to Python & AI", "borrow_count": 110},
    {"isbn": "978-04", "title": "Principles of Astronomy", "borrow_count": 38}
]

# Write catalog to CSV
with open("library_records.csv", "w", newline="", encoding="utf-8") as f:
    fieldnames = ["isbn", "title", "borrow_count"]
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(catalog)

# Read CSV and find the most popular book
most_popular_book = ""
max_borrows = 0

with open("library_records.csv", "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        borrows = int(row["borrow_count"])
        if borrows > max_borrows:
            max_borrows = borrows
            most_popular_book = row["title"]

print(f"🏆 Most Read Book: '{most_popular_book}' with {max_borrows} borrowings!")
```
