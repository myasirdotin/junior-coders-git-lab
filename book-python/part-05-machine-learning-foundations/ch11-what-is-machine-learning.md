# Chapter 11: What is Machine Learning? 🧠

## 🌟 Real-Life Story

When Zainab was small, her grandmother took her to the date market. Her grandmother never gave her a list of rules for spotting ripe dates. Instead, she showed her many dates: "This one is ripe. This one is not yet." After seeing enough examples, Zainab could judge new dates by herself. She had **learned from examples**. Machine learning is a way for computers to do the same: find a pattern in many examples, then use it on new cases.

## 🎯 What You Will Learn

- Explain the difference between writing rules and learning from data.
- Use the key words: dataset, feature, label, model, training and prediction.
- Store a small dataset in Python and separate its features from its labels.
- Watch a tiny model "learn" by trying guesses and measuring its error.
- Describe what machine learning cannot do, and why ethics matters from day one.

## 💡 Rules versus Learning

Until now, you wrote **rules-based programs**. You told the computer exactly what to do:

- "If moisture is below 30, switch on the water."
- "If the score is 90 or more, print Distinction."

That works when the rules are clear. But how would you write `if` rules to tell a healthy olive leaf from a sick one in a photo? There are millions of pixels and shadows. Nobody can write all those rules by hand.

**Machine learning (ML)** turns the job around. We give the computer examples **and** their answers. It works out the rule itself.

```
Normal programming:
 data + rules  ──>  answers

Machine learning:
 data + answers ──>  rules (a model)
```

The rule that the computer finds is called a **model**. Once we have a model, we can give it new data and it produces answers.

## 🏷️ The Key Words of ML

| Word | Meaning | Example (plant leaves) |
| :--- | :--- | :--- |
| **Dataset** | A collection of examples | 500 leaf measurements |
| **Feature** | A measured input about each example | greenness, number of spots |
| **Label** | The correct answer for an example | "healthy" or "sick" |
| **Model** | The pattern learned from the data | "many spots usually means sick" |
| **Training** | The process of learning from the dataset | trying rules and fixing mistakes |
| **Prediction** | The model's answer for a new example | "this new leaf is probably healthy" |

Engineers often call the features **X** and the label **y**. Here is a small, made-up leaf dataset:

| Greenness (0–1) | Spots | Humidity (%) | Label |
| :--- | :--- | :--- | :--- |
| 0.88 | 0 | 45 | healthy |
| 0.42 | 14 | 82 | sick |
| 0.91 | 1 | 50 | healthy |
| 0.55 | 9 | 76 | sick |

The first three columns are **features**. The last column is the **label**.

### A Dataset in Python

A list of dictionaries (Chapter 7) is a natural way to hold a dataset. We can split it into features and labels with a loop.

```python
leaves = [
    {"greenness": 0.88, "spots": 0, "label": "healthy"},
    {"greenness": 0.42, "spots": 14, "label": "sick"},
    {"greenness": 0.91, "spots": 1, "label": "healthy"},
    {"greenness": 0.55, "spots": 9, "label": "sick"}
]

features = []
labels = []
for leaf in leaves:
    features.append((leaf["greenness"], leaf["spots"]))
    labels.append(leaf["label"])

print("Examples:", len(leaves))
print("Features (X):", features)
print("Labels (y):", labels)
```

**Output:**

```text
Examples: 4
Features (X): [(0.88, 0), (0.42, 14), (0.91, 1), (0.55, 9)]
Labels (y): ['healthy', 'sick', 'healthy', 'sick']
```

Each feature pair is a tuple, because the measurements of one leaf belong together and should not change.

## 🔬 Watching a Tiny Model Learn

Let us see learning happen. A school records how many hours of sunshine each day had, and how much energy its solar panels made. This data is **made up** for teaching.

| Sunshine (hours) | Energy (kWh) |
| :--- | :--- |
| 2 | 5 |
| 4 | 11 |
| 6 | 15 |
| 8 | 21 |

We guess the model has the form **energy = w × hours**. The number `w` is called a **weight**. Learning means finding a good weight. Our method is simple:

1. Try a weight.
2. Predict the energy for every day in the data.
3. Measure the **error**: how far each prediction is from the real value. Add up the sizes of the mistakes.
4. Keep the weight with the smallest total error.

The built-in function `abs()` gives the **absolute value**: the size of a number without its minus sign. `abs(-3)` is `3`. We use it so that too-high and too-low guesses both count as mistakes.

```python
hours = [2, 4, 6, 8]
energy = [5, 11, 15, 21]

weights_to_try = [1.0, 1.5, 2.0, 2.5, 3.0]
best_weight = 0
best_error = 1000

for w in weights_to_try:
    total_error = 0
    for i in range(len(hours)):
        prediction = w * hours[i]
        total_error += abs(prediction - energy[i])
    print(f"weight {w}: total error {total_error}")
    if total_error < best_error:
        best_error = total_error
        best_weight = w

print(f"Best weight: {best_weight}")
```

**Output:**

```text
weight 1.0: total error 32.0
weight 1.5: total error 22.0
weight 2.0: total error 12.0
weight 2.5: total error 2.0
weight 3.0: total error 8.0
Best weight: 2.5
```

The weight `2.5` makes the smallest error, so the model is **energy = 2.5 × hours**. The computer found this by comparing its guesses with the real answers. That is the heart of machine learning: **guess, measure the error, improve**.

Now we can use the model to make a **prediction** for a new day:

```python
best_weight = 2.5

def predict_energy(sun_hours):
    return best_weight * sun_hours

print(predict_energy(5))
print(predict_energy(7.5))
```

**Output:**

```text
12.5
18.75
```

> 🧪 **Honest note**: this is a simplified teaching model. Real ML libraries try millions of tiny changes to many weights at once, using a branch of maths called calculus. But the idea is the same: reduce the error step by step.

## 🌍 Real-World Connection

| Helpful task | Features | Label |
| :--- | :--- | :--- |
| Spotting sick crop leaves | colour, spots, leaf size | healthy or sick |
| Planning clean energy | sunshine, temperature | energy made (kWh) |
| Water safety checks | acidity, cloudiness | safe or needs testing |
| Library planning | month, school events | books borrowed |

## ⚖️ What ML Cannot Do, and Why Ethics Matters

A model only knows what its data showed it.

- If the data is **biased** (unfair or one-sided) or incomplete, the model learns and repeats that bias.
- A model can be **wrong**. A prediction is a best guess, not a fact. People must check important answers. In Islam, checking news before acting on it is called *Tabayyun*.
- Personal data used for training must be collected honestly and kept safe (*Amānah*).
- Technology stays under human care and moral judgement (*Iḥsān*).

## ⚠️ Common Mistake

**Giving the model data in different units from its training data.** Our model learned from **hours**. Here someone gives it **minutes**:

```python
def predict_energy(sun_hours):
    return 2.5 * sun_hours

sunshine_minutes = 300
print(predict_energy(sunshine_minutes))
```

**Output:**

```text
750.0
```

750 kWh is far too much for one school! The model is fine; the input is wrong. **Fixed version:** convert first, so the model sees the same kind of data it learned from.

```python
def predict_energy(sun_hours):
    return 2.5 * sun_hours

sunshine_minutes = 300
print(predict_energy(sunshine_minutes / 60))
```

**Output:**

```text
12.5
```

## ✍️ Try It

Copy the weight-learning program. Add `3.5` to `weights_to_try` and add a fifth day: 10 hours, 26 kWh. Run it again. Does the best weight change?

**Hint:** among your list, the best weight should still be `2.5` (total error 3.0). Then add the in-between weight `2.6`. Its error is smaller (about 1.6), so trying more, finer weights can give a better model.

## 📝 Recap

- Normal programs follow rules people write. ML programs find the rules from examples.
- Features are the inputs (X); the label is the answer (y); the model is the learned pattern.
- Training means: guess, measure the error, and improve.
- A model makes predictions for new data, but only works well on data like its training data.
- Bias, mistakes and privacy are real risks, so people must check and care for AI systems.

## 🏆 Practice

### 🟢 Level 1: Recall
In a dataset about water wells, the columns are `depth_m`, `acidity`, `cloudiness` and `safe_to_drink`. Which columns are features and which is the label?

<details>
<summary>Show answer</summary>

Features: `depth_m`, `acidity`, `cloudiness`. Label: `safe_to_drink` (the answer we want to predict).

</details>

### 🟡 Level 2: Apply
For each task, name the features and the label.

1. A weather station predicts whether it will rain tomorrow from air pressure, wind speed and cloud cover.
2. A school estimates how many litres of water its garden needs from the temperature and the number of plants.

<details>
<summary>Show answer</summary>

1. Features: air pressure, wind speed, cloud cover. Label: rain (yes or no).
2. Features: temperature, number of plants. Label: litres of water.

</details>

### 🔴 Level 3: Challenge
A made-up dataset links the number of students in a class to the litres of drinking water they use in a day: `students = [10, 20, 30]`, `litres = [16, 30, 47]`.

1. Use the model **litres = w × students**.
2. Try the weights `1.0, 1.5, 2.0`.
3. Print the total error for each weight and the best weight.
4. Predict the litres for a class of 25 students.

<details>
<summary>Show one possible answer</summary>

```python
students = [10, 20, 30]
litres = [16, 30, 47]

best_weight = 0
best_error = 1000
for w in [1.0, 1.5, 2.0]:
    total_error = 0
    for i in range(len(students)):
        total_error += abs(w * students[i] - litres[i])
    print(f"weight {w}: total error {total_error}")
    if total_error < best_error:
        best_error = total_error
        best_weight = w

print("Best weight:", best_weight)
print("Prediction for 25 students:", best_weight * 25)
```

Output:

```text
weight 1.0: total error 33.0
weight 1.5: total error 3.0
weight 2.0: total error 27.0
Best weight: 1.5
Prediction for 25 students: 37.5
```

</details>
