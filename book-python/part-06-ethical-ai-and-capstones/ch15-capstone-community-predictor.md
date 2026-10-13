# Chapter 15: Capstone Project — Community Relief Predictor 🏆

## 🌟 Real-Life Story

It is a cold winter night at the community centre. Requests for help arrive faster than the volunteers can read them: blankets, warm food, solar lanterns, medical kits. Who should receive help first? The volunteers want to be fast **and** fair. They agree on clear rules, written down so anyone can check them. In this capstone, you will turn those rules into a Python program. *Mabruk* on reaching the final chapter!

## 🎯 What You Will Learn

- Plan a project by choosing features and weights for a transparent scoring model.
- Load requests from a CSV file and convert the text into numbers and Booleans.
- Write functions that score, explain and sort the requests.
- Save an audit log as JSON so every decision can be checked later.
- Evaluate the model against past human decisions, and review it for fairness and privacy.

## 🧭 The Project at a Glance

You will build a **Community Relief Priority Tool**. It reads a batch of aid requests, gives each one a priority score, sorts them, and saves a log. Every skill comes from an earlier chapter:

| Step | What you build | Skills from |
| :--- | :--- | :--- |
| 1 | Plan features and weights | Ch 11 (features), Ch 14 (ethics) |
| 2 | Load requests from CSV | Ch 9, Ch 10 |
| 3 | Score each request, with reasons | Ch 4, Ch 8 |
| 4 | Turn scores into tiers | Ch 4, Ch 8 |
| 5 | Process and sort the batch | Ch 5, Ch 6, Ch 7 |
| 6 | Save a JSON audit log | Ch 10 |
| 7 | Evaluate against past decisions | Ch 13 |
| 8 | Ethics review | Ch 14 |

> 🧪 **Honest note**: this is a simplified teaching model with made-up requests. The weights are chosen by people, not learned from data. In real relief work, the tool would only **suggest** an order, and trained volunteers would make the final decisions.

Type each step into the Python Console. Each step adds to the code of the steps before it, so keep everything in one program.

## 📐 Step 1: Plan the Features and Weights

First, decide which facts (features) matter and how many points each one adds. The volunteers agreed on these:

| Feature | Why it matters | Points |
| :--- | :--- | :--- |
| No heating at home | Cold is the biggest danger tonight | +40 |
| Infant in the family | Babies are most at risk from cold | +35 |
| Elderly member | Older people are also at high risk | +25 |
| More than 5 people | A bigger household needs more supplies | +15 |

Then decide the **tiers** (priority groups):

| Score | Tier |
| :--- | :--- |
| 70 or more | Tier 1: immediate dispatch |
| 40 to 69 | Tier 2: same-day delivery |
| under 40 | Tier 3: standard delivery |

Notice what is **not** in the plan: names, phone numbers, religion or nationality. They are not needed to decide who is coldest, so we do not collect them. Each request has only a code, like `REQ-801` (*Amānah*).

## 📥 Step 2: Load the Requests from CSV

Requests arrive as a CSV file. To make the project self-contained, we first write a sample file, then read it back. CSV values are always text (Chapter 10), so we convert them: `int()` for numbers, and `== "yes"` to turn `"yes"`/`"no"` into `True`/`False`.

```python
import csv
import json

with open("requests.csv", "w", newline="", encoding="utf-8") as f:
    f.write("request_id,members,infants,elderly,heating\n")
    f.write("REQ-801,6,yes,yes,no\n")
    f.write("REQ-802,3,no,no,yes\n")
    f.write("REQ-803,4,no,yes,no\n")
    f.write("REQ-804,7,yes,no,yes\n")
    f.write("REQ-805,2,no,yes,yes\n")
    f.write("REQ-806,5,yes,no,no\n")

def load_requests(filename):
    """Read the CSV file and return a list of clean dictionaries."""
    requests = []
    with open(filename, "r", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            requests.append({
                "id": row["request_id"],
                "members": int(row["members"]),
                "has_infants": row["infants"] == "yes",
                "has_elderly": row["elderly"] == "yes",
                "has_heating": row["heating"] == "yes"
            })
    return requests

requests = load_requests("requests.csv")
print(len(requests), "requests loaded")
print(requests[0])
```

**Output:**

```text
6 requests loaded
{'id': 'REQ-801', 'members': 6, 'has_infants': True, 'has_elderly': True, 'has_heating': False}
```

## 🧮 Step 3: Score Each Request, with Reasons

The scoring function follows the plan in Step 1 exactly. It also collects a list of **reasons**, so every score can be explained (Chapter 14).

```python
def score_request(req):
    """Return (score, reasons) for one request."""
    score = 0
    reasons = []
    if not req["has_heating"]:
        score += 40
        reasons.append("no heating")
    if req["has_infants"]:
        score += 35
        reasons.append("infant")
    if req["has_elderly"]:
        score += 25
        reasons.append("elderly member")
    if req["members"] > 5:
        score += 15
        reasons.append("large household")
    return score, reasons

print(score_request(requests[0]))
print(score_request(requests[1]))
```

**Output:**

```text
(115, ['no heating', 'infant', 'elderly member', 'large household'])
(0, [])
```

Check the first one by hand: 40 + 35 + 25 + 15 = 115. The second request has no risk factors, so it scores 0 with no reasons.

## 🚦 Step 4: Turn Scores into Tiers

```python
def tier_for(score):
    """Return the priority tier for a score."""
    if score >= 70:
        return "Tier 1: immediate"
    elif score >= 40:
        return "Tier 2: same day"
    return "Tier 3: standard"

print(tier_for(115))
print(tier_for(50))
print(tier_for(25))
```

**Output:**

```text
Tier 1: immediate
Tier 2: same day
Tier 3: standard
```

Test the borders too: `tier_for(70)` and `tier_for(40)` should give Tier 1 and Tier 2. Testing the edges is where many bugs hide.

## 🔁 Step 5: Process and Sort the Batch

Now loop over every request, build a **record** (a result dictionary) for each, and sort the records so the highest score comes first.

`.sort()` can take a **key**: a function that tells it **what to sort by**. We pass the function's name, `get_score`, without brackets. Python calls it on each record and sorts by the numbers it returns.

```python
dispatches = []
for req in requests:
    score, reasons = score_request(req)
    dispatches.append({
        "id": req["id"],
        "score": score,
        "tier": tier_for(score),
        "reasons": reasons
    })

def get_score(record):
    return record["score"]

dispatches.sort(key=get_score, reverse=True)

print("=" * 40)
print("COMMUNITY RELIEF DISPATCH ORDER")
print("=" * 40)
for d in dispatches:
    print(f"{d['id']}  score {d['score']}  {d['tier']}")
    print(f"   because: {', '.join(d['reasons'])}")
```

**Output:**

```text
========================================
COMMUNITY RELIEF DISPATCH ORDER
========================================
REQ-801  score 115  Tier 1: immediate
   because: no heating, infant, elderly member, large household
REQ-806  score 75  Tier 1: immediate
   because: no heating, infant
REQ-803  score 65  Tier 2: same day
   because: no heating, elderly member
REQ-804  score 50  Tier 2: same day
   because: infant, large household
REQ-805  score 25  Tier 3: standard
   because: elderly member
REQ-802  score 0  Tier 3: standard
   because: 
```

`", ".join(list)` glues a list of strings into one string, with `", "` between the items. When the list is empty, it gives an empty string, which is why REQ-802 shows nothing after "because:".

## 🗂️ Step 6: Save a JSON Audit Log

An **audit log** is a saved record of what the program decided and why. Anyone can check it later. That makes the system accountable.

```python
log = {
    "batch": "winter-night-1",
    "rules": "heating 40, infant 35, elderly 25, large household 15",
    "dispatches": dispatches
}

with open("dispatch_log.json", "w", encoding="utf-8") as f:
    json.dump(log, f, indent=2)

with open("dispatch_log.json", "r", encoding="utf-8") as f:
    saved = json.load(f)

print("Saved", len(saved["dispatches"]), "decisions")
print("First in line:", saved["dispatches"][0]["id"])
```

**Output:**

```text
Saved 6 decisions
First in line: REQ-801
```

The log stores codes and reasons only. No names or contact details are written to disk.

## 🧪 Step 7: Evaluate Against Past Decisions

Last winter, experienced volunteers sorted eight requests by hand. A good tool should mostly **agree** with them. This is like the test set in Chapter 13: the model never saw these cases while we chose the weights. (The data is made up.)

```python
past_cases = [
    ({"id": "P1", "members": 4, "has_infants": True, "has_elderly": False, "has_heating": False}, "Tier 1: immediate"),
    ({"id": "P2", "members": 2, "has_infants": False, "has_elderly": False, "has_heating": True}, "Tier 3: standard"),
    ({"id": "P3", "members": 6, "has_infants": False, "has_elderly": True, "has_heating": True}, "Tier 1: immediate"),
    ({"id": "P4", "members": 3, "has_infants": False, "has_elderly": True, "has_heating": False}, "Tier 2: same day"),
    ({"id": "P5", "members": 8, "has_infants": False, "has_elderly": False, "has_heating": True}, "Tier 2: same day"),
    ({"id": "P6", "members": 5, "has_infants": True, "has_elderly": True, "has_heating": True}, "Tier 2: same day"),
    ({"id": "P7", "members": 1, "has_infants": False, "has_elderly": False, "has_heating": False}, "Tier 2: same day"),
    ({"id": "P8", "members": 7, "has_infants": True, "has_elderly": True, "has_heating": False}, "Tier 1: immediate")
]

agree = 0
for case, volunteer_tier in past_cases:
    score, reasons = score_request(case)
    model_tier = tier_for(score)
    if model_tier == volunteer_tier:
        agree += 1
    else:
        print(f"{case['id']}: model says {model_tier}, volunteers said {volunteer_tier}")

print(f"Agreement: {agree} of {len(past_cases)} ({agree / len(past_cases) * 100}%)")
```

**Output:**

```text
P3: model says Tier 2: same day, volunteers said Tier 1: immediate
P5: model says Tier 3: standard, volunteers said Tier 2: same day
Agreement: 6 of 8 (75.0%)
```

Study each disagreement instead of hiding it. Here, both disagreements are big families (P3 with 6 people, P5 with 8). The volunteers placed them higher than the model did. Perhaps "large household" deserves more than 15 points. Changing a weight and testing again is how you improve a model honestly. Just remember Chapter 13: if you tune the weights on these eight cases, you need fresh cases for the next honest test.

## 🛡️ Step 8: Ethics Review

Before anyone uses the tool, go through this checklist:

- [ ] **Privacy:** only the data needed for the decision is collected and saved.
- [ ] **Transparency:** every score comes with its reasons; the rules are written in the log.
- [ ] **Fairness:** no feature is about race, religion, nationality or wealth.
- [ ] **Human control:** volunteers can change the order, and the tool never refuses help to anyone.
- [ ] **Honesty:** users are told it is a simple rule-based helper, not an all-knowing AI.

## 🚀 Where to Go from Here

You have completed the **Python & Machine Learning Foundations** book. You can now:

- write clean, modular Python with functions, lists, dictionaries and files;
- describe datasets, features, labels, models, accuracy and overfitting;
- build tools that are transparent, fair and protective of people's data.

Keep practising in the Python Console. Try new made-up datasets from science, energy or your school library, and use your skills to serve your family, school and community.

## ⚠️ Common Mistake

**Treating the text `"no"` from a CSV as `False`.** Any non-empty string counts as `True` in an `if`, even the word `"no"`. So this code says a family has heating when the file says `"no"`:

```python
row = {"heating": "no"}
if row["heating"]:
    print("Has heating")
else:
    print("No heating")
```

**Output:**

```text
Has heating
```

Wrong! A family without heating would lose 40 priority points. **Fixed version:** compare the text, as in Step 2.

```python
row = {"heating": "no"}
has_heating = row["heating"] == "yes"
if has_heating:
    print("Has heating")
else:
    print("No heating")
```

**Output:**

```text
No heating
```

## ✍️ Try It

Add a new request to the CSV in Step 2: `REQ-807,9,no,no,no`. Before you run the program, work out its score and tier by hand. Then run it and check where it appears in the dispatch order.

**Hint:** no heating (40) + large household (15) = 55, so Tier 2.

## 📝 Recap

- A good project starts with a plan: features, weights, tiers, and what data **not** to collect.
- Convert CSV text carefully: `int()` for numbers and `== "yes"` for Booleans.
- Small functions (`load_requests`, `score_request`, `tier_for`) make the program easy to test and explain.
- `.sort(key=function, reverse=True)` sorts records by any value you choose.
- Save a JSON audit log, compare with human decisions, and review privacy and fairness before use.

## 🏆 Practice

### 🟢 Level 1: Recall
Why does the project store request codes like `REQ-801` instead of family names? Name the principle.

<details>
<summary>Show answer</summary>

Names are not needed to decide priority, so collecting them would only add risk. Keeping only the data you need protects people's privacy. This is **data minimisation**, part of *Amānah* (trust).

</details>

### 🟡 Level 2: Apply
Without running the code, find the score and tier of a request with 3 members, an infant, no elderly member, and **no** heating.

<details>
<summary>Show answer</summary>

No heating 40 + infant 35 = **75**. 75 is 70 or more, so it is **Tier 1: immediate**. (3 members is not more than 5, so no extra points.)

</details>

### 🔴 Level 3: Challenge
Improve the tool with a new feature and a summary.

1. Add a `medical` column to the CSV (`yes`/`no`) for a family member who needs regular medicine. Give each request a value.
2. Load it as a Boolean in `load_requests`.
3. In `score_request`, add **+30** points and the reason `"medical need"` when it is `True`.
4. After sorting, count how many requests are in each tier with a dictionary, and print the counts.
5. Re-run Step 7. Did the agreement change? (The past cases have no `medical` key, so use `req.get("medical", False)`.)

<details>
<summary>Show one possible answer</summary>

The key changes:

```python
# In load_requests, inside the dictionary:
"medical": row["medical"] == "yes"

# In score_request:
if req.get("medical", False):
    score += 30
    reasons.append("medical need")

# After sorting:
tier_counts = {}
for d in dispatches:
    tier_counts[d["tier"]] = tier_counts.get(d["tier"], 0) + 1
for tier, count in tier_counts.items():
    print(f"{tier}: {count} request(s)")
```

Using `.get("medical", False)` means old records without the new column still work. The Step 7 agreement stays the same, because none of the past cases has a medical need.

</details>
