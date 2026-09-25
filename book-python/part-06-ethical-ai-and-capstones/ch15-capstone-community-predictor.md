# Chapter 15: Capstone Project — Community Relief Predictor 🏆🌟

Mabruk on reaching the capstone chapter! In this project, you will combine everything you have learned—Python variables, data structures, functions, file parsing, and machine learning classification—to build an end-to-end **Community Relief Aid Dispatcher**.

---

## 🎯 Capstone Objective

During winter emergencies, community humanitarian centers must rapidly dispatch emergency supplies (blankets, warm food, solar lanterns, and medical kits) to families in need.

You will build a Python program that:
1. **Parses an incoming batch of family requests** from structured data.
2. **Extracts features**: Household size, elderly members count, infant count, and local heating status.
3. **Applies a transparent decision scoring model** to prioritize aid packages fairly and rapidly.
4. **Logs the dispatches** with an audit trail respecting digital trust (*Amānah*).

---

## 💻 Full Capstone Implementation

```python
"""
Community Relief Priority Classifier
Junior Coders Capstone Project
Ethical Machine Learning in Action
"""

def extract_priority_score(family):
    """
    Feature extraction and weighted scoring model.
    Weights derived from emergency triage guidelines:
    - Infant present: +35 points
    - Elderly present: +25 points
    - No heating available: +40 points
    - Large household (>5 people): +15 points
    """
    score = 0
    
    if family.get("has_infants", False):
        score += 35
    if family.get("has_elderly", False):
        score += 25
    if not family.get("has_heating", True):
        score += 40
    if family.get("household_members", 1) > 5:
        score += 15
        
    return score

def classify_urgency(score):
    """Classifies urgency into discrete priority tiers."""
    if score >= 70:
        return "Tier 1: Immediate Dispatch 🚨"
    elif score >= 40:
        return "Tier 2: Same-Day Delivery 🚚"
    else:
        return "Tier 3: Standard Delivery 📦"

# Sample Incoming Emergency Triage Dataset
family_requests = [
    {
        "request_id": "REQ-801",
        "family_name": "Al-Mansoor",
        "household_members": 6,
        "has_infants": True,
        "has_elderly": True,
        "has_heating": False
    },
    {
        "request_id": "REQ-802",
        "family_name": "Rahman",
        "household_members": 3,
        "has_infants": False,
        "has_elderly": False,
        "has_heating": True
    },
    {
        "request_id": "REQ-803",
        "family_name": "Karimi",
        "household_members": 4,
        "has_infants": False,
        "has_elderly": True,
        "has_heating": False
    },
    {
        "request_id": "REQ-804",
        "family_name": "Siddiqui",
        "household_members": 7,
        "has_infants": True,
        "has_elderly": False,
        "has_heating": True
    }
]

# Run the Dispatch Pipeline
print("=" * 65)
print("     COMMUNITY EMERGENCY AID DISPATCH LOG (AMĀNAH AUDIT)")
print("=" * 65)

dispatches = []

for fam in family_requests:
    score = extract_priority_score(fam)
    tier = classify_urgency(score)
    
    record = {
        "id": fam["request_id"],
        "name": fam["family_name"],
        "score": score,
        "tier": tier
    }
    dispatches.append(record)

# Sort dispatches by priority score descending (highest urgency first)
dispatches.sort(key=lambda x: x["score"], reverse=True)

for d in dispatches:
    print(f"ID: {d['id']} | Family: {d['name']:<12} | Score: {d['score']:<3} | Status: {d['tier']}")

print("=" * 65)
print("All relief dispatches finalized according to transparent criteria.")
print("May this effort bring comfort and protection to our neighbors! 🤲")
```

---

## 🌟 Where to Go from Here?

Congratulations! You have completed the **Python & Machine Learning Foundations** curriculum. You now possess:
- The fluency to write clean, modular, and readable Python code.
- The mental models of datasets, features, models, and accuracy.
- A moral compass grounded in *'Ilm Nāfi'*, *Amānah*, and *Iḥsān*.

Continue building in the **Interactive Python Lab Studio**, experiment with new datasets, and use your skills to serve your family, school, and community! 🚀
