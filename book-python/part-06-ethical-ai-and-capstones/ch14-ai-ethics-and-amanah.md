# Chapter 14: AI Ethics, Transparency & Digital Trust (*Amānah*)

## 🌟 Real-Life Story

When a neighbour leaves her house key with your family before a journey, she trusts you. You would never open her cupboards or show her letters to anyone. In Arabic, this kind of trust is called *Amānah*. Data is like that key. When people share their information with a program, they hand its makers a trust. AI is powerful, and in this chapter you will learn to use that power with honesty, fairness and care.

## 🎯 What You Will Learn

- Explain five principles of ethical AI, linked to *Amānah*, *Ṣidq* (truthfulness) and *Iḥsān* (excellence).
- Protect privacy by collecting less data and removing names before analysis.
- Audit a dataset for under-represented groups, and check a model's accuracy for each group.
- Make a model explain its decisions.
- Practise *Tabayyun*: checking an AI answer before trusting it.

## Five Principles of Ethical AI

### Privacy as a Trust (*Amānah*)

Every row of data stands for a real person: their family, their health, their home. So:

- Collect **only** the data you really need. This is called **data minimisation**.
- Ask for honest, clear permission (**consent**) before collecting personal data.
- Never store passwords as plain text, and keep personal records locked away.

Betraying someone's data is a betrayal of trust (*Khiyānah*).

### Fairness and Bias

A model learns from its data, including the data's gaps. For example:

- A plant-disease model trained only on photos taken in bright midday sun may fail on cloudy, rainy farms.
- A system trained on old records where some groups were left out will repeat that unfairness.

Ethical engineers test their models across different groups and conditions **before** anyone relies on them.

### Truthfulness (*Ṣidq*)

- **Deepfakes** are fake videos or voices made by AI to show people saying things they never said. Making them to deceive is falsehood and slander (*Buhtān*).
- **Dark patterns** are designs that trick users, for example into endless scrolling. We do not build them.
- AI answers can be confidently **wrong**. Before you share or act on one, check it. This is *Tabayyun*: verifying news before acting on it.

### Explainability

If an AI system affects someone, such as the order of a clinic queue or a scholarship decision, that person has a right to know **why**. Prefer models whose reasons can be shown, like the threshold rule in Chapter 13, over "black boxes" that nobody can explain.

### Things We Refuse to Build

As ethical technologists, we do not build:

- Interest-based loan calculators (*Ribā*) or games-of-chance predictors (*Maysir*).
- Surveillance that tracks innocent people, or face recognition used to watch them.
- Systems that guess private things about people, such as their beliefs or health, without consent.

## Privacy in Code: Remove What You Do Not Need

A study club wants to know which subjects need more tutoring. The sign-up sheet asked for too much. Before analysing, we keep only what the question needs, and replace names with codes. Removing names like this is called **anonymising** data.

```python
signups = [
    {"name": "Amina Yusuf", "phone": "0700-111", "subject": "maths"},
    {"name": "Bilal Khan", "phone": "0700-222", "subject": "physics"},
    {"name": "Hana Ali", "phone": "0700-333", "subject": "maths"}
]

safe_rows = []
number = 1
for person in signups:
    safe_rows.append({"student": f"S{number}", "subject": person["subject"]})
    number += 1

print(safe_rows)

counts = {}
for row in safe_rows:
    counts[row["subject"]] = counts.get(row["subject"], 0) + 1
print(counts)
```

**Output:**

```text
[{'student': 'S1', 'subject': 'maths'}, {'student': 'S2', 'subject': 'physics'}, {'student': 'S3', 'subject': 'maths'}]
{'maths': 2, 'physics': 1}
```

The answer ("maths needs more tutors") did not need any names or phone numbers. The safest data is the data you never keep.

## Auditing a Dataset for Representation

Before training, a careful data scientist checks: does the dataset include everyone the model will serve? Here is a **made-up** clinic study sample.

```python
patients = [
    {"region": "Rural North", "age_group": "Elderly"},
    {"region": "Urban Centre", "age_group": "Young Adult"},
    {"region": "Urban Centre", "age_group": "Adult"},
    {"region": "Urban Centre", "age_group": "Young Adult"},
    {"region": "Urban Centre", "age_group": "Adult"},
    {"region": "Rural North", "age_group": "Adult"}
]

region_counts = {}
for p in patients:
    region = p["region"]
    region_counts[region] = region_counts.get(region, 0) + 1

total = len(patients)
print("DATASET AUDIT")
for region, count in region_counts.items():
    share = count / total * 100
    print(f"{region}: {count} ({round(share, 1)}%)")

rural_share = region_counts.get("Rural North", 0) / total
if rural_share < 0.40:
    print("Warning: rural patients are under-represented.")
    print("Action: collect more rural samples before training.")
```

**Output:**

```text
DATASET AUDIT
Rural North: 2 (33.3%)
Urban Centre: 4 (66.7%)
Warning: rural patients are under-represented.
Action: collect more rural samples before training.
```

If half the people the clinic serves live in rural areas, a sample that is only one-third rural is not fair. The model would learn mostly about city patients.

### Checking Accuracy for Each Group

A model can have good **overall** accuracy and still fail one group. So we measure accuracy **per group**. These test results are made up:

```python
results = [
    ("city", True), ("city", True), ("city", True), ("city", False),
    ("city", True), ("city", True), ("rural", False), ("rural", True),
    ("rural", False), ("rural", True)
]

correct = {}
seen = {}
for group, was_correct in results:
    seen[group] = seen.get(group, 0) + 1
    if was_correct:
        correct[group] = correct.get(group, 0) + 1

overall = 0
for group in seen:
    overall += correct.get(group, 0)
print(f"Overall accuracy: {overall / len(results) * 100}%")

for group in seen:
    accuracy = correct.get(group, 0) / seen[group] * 100
    print(f"{group}: {round(accuracy, 1)}% correct")
```

**Output:**

```text
Overall accuracy: 70.0%
city: 83.3% correct
rural: 50.0% correct
```

70% overall hides a real problem: the model is right only half the time for rural cases. Fixing it might mean collecting better rural data. Treating every community fairly is *'Adl* (justice).

## A Model That Explains Itself

A transparent model shows the reasons for each decision. This simple, **made-up** rule decides whether a school garden bed needs attention, and lists every reason it used.

```python
def check_bed(bed):
    reasons = []
    if bed["moisture"] < 30:
        reasons.append("soil is dry")
    if bed["yellow_leaves"] > 5:
        reasons.append("many yellow leaves")
    if len(reasons) > 0:
        return "needs attention", reasons
    return "fine", reasons

decision, reasons = check_bed({"moisture": 22, "yellow_leaves": 8})
print("Decision:", decision)
print("Because:", reasons)
```

**Output:**

```text
Decision: needs attention
Because: ['soil is dry', 'many yellow leaves']
```

A gardener can read the reasons, disagree with them, and correct the rule. That is the kind of system people can trust.

## *Tabayyun*: Checking AI Answers

| An AI tool tells you… | How to check it |
| :--- | :--- |
| A fact for your homework | Find it in your textbook or a trusted source |
| A piece of code | Run it and test it with your own examples |
| A quote from a person | Find the original speech or book |
| A medical tip | Ask a doctor or nurse; never rely on AI alone |

## The Ethical Technologist's Oath

Before releasing any program into the world, ask yourself:

1. Does it bring real benefit (*Naf'*) to people and protect their well-being?
2. Would I be proud if my teachers, parents and community saw how it works inside?
3. Am I handling people's data as a sacred trust (*Amānah*)?
4. Have I checked that it treats every group fairly (*'Adl*)?

## ⚠️ Common Mistake

**Showing more personal data than the task needs.** A volunteer only needs to know which parcel goes to which street. This code prints everything:

```python
family = {"code": "F-12", "street": "Palm Street",
          "phone": "0700-555", "health_note": "diabetes"}
print(family)
```

**Output:**

```text
{'code': 'F-12', 'street': 'Palm Street', 'phone': '0700-555', 'health_note': 'diabetes'}
```

The phone number and health note were not needed and have now been shown to anyone near the screen. **Fixed version:** print only what the task needs.

```python
family = {"code": "F-12", "street": "Palm Street",
          "phone": "0700-555", "health_note": "diabetes"}
print(f"Parcel {family['code']} -> {family['street']}")
```

**Output:**

```text
Parcel F-12 -> Palm Street
```

## ✍️ Try It

Add four more patients to the audit code, all from `"Rural North"`. Run it again. Does the warning still appear? What is the new rural share?

**Hint:** there will be 6 rural patients out of 10, which is 60%.

## 📝 Recap

- Data stands for real people. Collect only what you need, ask for consent and keep it safe (*Amānah*).
- Audit datasets for missing groups, and measure accuracy for each group, not just overall.
- Prefer models that can explain their decisions.
- Check AI answers before trusting or sharing them (*Tabayyun*).
- Refuse harmful uses: deception, surveillance, *Ribā* and *Maysir*.

## 🏆 Practice

### 🟢 Level 1: Recall
What does "data minimisation" mean? Give one example from a school setting.

<details>
<summary>Show answer</summary>

Collecting **only** the data you really need for the task. Example: a library book-return reminder needs a student code and the book title, not the student's home address or phone number.

</details>

### 🟡 Level 2: Apply
A model was tested on 20 cases: 12 from the city (11 correct) and 8 from villages (4 correct). Work out the overall accuracy and the accuracy for each group. What should the team do?

<details>
<summary>Show answer</summary>

```python
print((11 + 4) / 20 * 100)
print(round(11 / 12 * 100, 1))
print(4 / 8 * 100)
```

Output:

```text
75.0
91.7
50.0
```

Overall 75%, city 91.7%, villages 50%. The team should collect more village data and retest before anyone relies on the model.

</details>

### 🔴 Level 3: Challenge
Write an "anonymiser" for a homework-club register.

1. Start with a list of three dictionaries, each with `name`, `email` and `minutes_studied`.
2. Build a new list where each row has only `student` (codes `S1`, `S2`, `S3`) and `minutes_studied`.
3. Print the new list and the average minutes.
4. Explain in one sentence why the emails were removed.

<details>
<summary>Show one possible answer</summary>

```python
register = [
    {"name": "Yusuf", "email": "yusuf@example.org", "minutes_studied": 50},
    {"name": "Maryam", "email": "maryam@example.org", "minutes_studied": 70},
    {"name": "Idris", "email": "idris@example.org", "minutes_studied": 30}
]

safe = []
number = 1
total = 0
for row in register:
    safe.append({"student": f"S{number}", "minutes_studied": row["minutes_studied"]})
    total += row["minutes_studied"]
    number += 1

print(safe)
print("Average minutes:", total / len(safe))
```

Output:

```text
[{'student': 'S1', 'minutes_studied': 50}, {'student': 'S2', 'minutes_studied': 70}, {'student': 'S3', 'minutes_studied': 30}]
Average minutes: 50.0
```

The average does not need anyone's email, so keeping emails would only add risk without any benefit.

</details>
