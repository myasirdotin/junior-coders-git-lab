# Chapter 12: Supervised vs. Unsupervised Learning

## 🌟 Real-Life Story

Imagine two ways of learning about plants. In the first, your biology teacher shows you leaves and says the name of each one. You practise, and she corrects your mistakes. In the second, you find a box of seeds with no labels at all. Nobody tells you their names, but you can still sort them into piles: small and round, long and thin, large and flat. Machine learning has the same two styles. Learning **with** answers is **supervised**. Finding groups **without** answers is **unsupervised**.

## 🎯 What You Will Learn

- Explain supervised learning and its two kinds: classification and regression.
- Build a simple nearest-neighbour classifier in plain Python.
- Explain unsupervised learning and what clustering means.
- Group numbers into clusters with a small, step-by-step version of k-means.
- Choose the right kind of learning for a task.

## Supervised Learning: Learning with a Teacher

In **supervised learning**, every training example has **features** and the correct **label**. The label acts like a teacher. The algorithm makes a guess, compares it with the label and adjusts itself.

Think of flashcards. The front of the card shows the features (a picture of a fruit). The back shows the label ("mango").

Supervised learning has two main kinds:

| Kind | The answer is… | Example |
| :--- | :--- | :--- |
| **Classification** | a category (a group name) | Is this crop leaf healthy or sick? |
| **Regression** | a number on a scale | How many kWh will the solar panels make? |

The sunshine model in Chapter 11 was **regression**: it predicted a number. Now let us build a **classifier**.

## A Nearest-Neighbour Classifier

A fruit packing group sorts mangoes into "ripe" and "unripe". For each mango, they measure two features on a 1 to 10 scale: **softness** and **colour** (1 = green, 10 = deep yellow). Here is a small, **made-up** training set:

| Softness | Colour | Label |
| :--- | :--- | :--- |
| 2 | 3 | unripe |
| 3 | 2 | unripe |
| 1 | 4 | unripe |
| 7 | 8 | ripe |
| 8 | 7 | ripe |
| 9 | 9 | ripe |

The **nearest-neighbour** method is simple: to label a new mango, find the training mango that is **most similar** to it, and copy its label.

"Most similar" means the smallest **distance**. Imagine each mango as a dot on a grid, with softness across and colour up. The distance between two dots is measured with Pythagoras' theorem: the square root of (difference across)² + (difference up)².

```
colour
 10│              ● ripe
  8│           ●  ●
  6│        ★ new mango?
  4│ ○
  2│    ○  ○ unripe
   └─────────────────── softness
     2    4    6    8
```

```python
import math

training = [
    ((2, 3), "unripe"),
    ((3, 2), "unripe"),
    ((1, 4), "unripe"),
    ((7, 8), "ripe"),
    ((8, 7), "ripe"),
    ((9, 9), "ripe")
]

def distance(a, b):
    """Straight-line distance between two (softness, colour) points."""
    return math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2)

def classify(new_mango):
    best_label = ""
    best_distance = 1000
    for features, label in training:
        d = distance(new_mango, features)
        if d < best_distance:
            best_distance = d
            best_label = label
    return best_label, round(best_distance, 2)

print(classify((6, 6)))
print(classify((2, 2)))
print(classify((5, 4)))
```

**Output:**

```text
('ripe', 2.24)
('unripe', 1.0)
('unripe', 2.83)
```

The classifier never received a rule like "softness above 5 means ripe". It **learned from the examples**: whatever the new mango is closest to decides the answer. The third mango (5, 4) sits between the two groups. Its nearest neighbour is the unripe mango (3, 2), at 2.83. The closest ripe mango is 4.24 away. Cases in the middle like this are worth checking by hand.

> 🧪 **Honest note**: this is a simplified teaching model with six made-up mangoes. Real classifiers use far more examples, and often look at several neighbours (the "k" in **k-nearest neighbours**) and let them vote.

## Unsupervised Learning: Finding Groups Alone

In **unsupervised learning** there are **no labels**. We give the computer raw data and ask: *"What natural groups are hiding in here?"* Finding groups of similar items is called **clustering**.

```
Before (no labels):    After clustering:
  •   •      •          A A      B
 •  •      •  •        A A     B  B
   •         •           A       B
```

For example, a relief agency might have the locations of the villages it serves, but no plan for where to build supply hubs. A clustering method called **k-means** can find **k** groups of nearby villages. One hub can then be placed in the middle of each group.

### Clustering Step by Step

A town has 8 public water taps. The council records the litres each tap gives out per day. The numbers are **made up**. Is there a "busy" group and a "quiet" group? We do not have labels; we let the data decide.

The k-means idea for two groups:

1. Pick two starting **centres** (here: the smallest and largest values).
2. Put every value in the group of its **nearest** centre.
3. Move each centre to the **average** of its group.
4. Repeat steps 2 and 3 a few times until the centres stop moving.

```python
litres = [120, 135, 410, 128, 395, 140, 420, 405]

centre_a = min(litres)
centre_b = max(litres)

for round_number in range(1, 4):
    group_a = []
    group_b = []
    for value in litres:
        if abs(value - centre_a) <= abs(value - centre_b):
            group_a.append(value)
        else:
            group_b.append(value)
    centre_a = sum(group_a) / len(group_a)
    centre_b = sum(group_b) / len(group_b)
    print(f"Round {round_number}: centres {round(centre_a, 1)} and {round(centre_b, 1)}")

print("Group A:", group_a)
print("Group B:", group_b)
```

**Output:**

```text
Round 1: centres 130.8 and 407.5
Round 2: centres 130.8 and 407.5
Round 3: centres 130.8 and 407.5
Group A: [120, 135, 128, 140]
Group B: [410, 395, 420, 405]
```

The centres settle after the first round. The computer found two clusters by itself: taps that give about 131 litres a day and taps that give about 408. It does **not** know *why*. Perhaps the busy taps are near the market. Explaining the groups is the human's job.

## Supervised or Unsupervised?

| | Supervised | Unsupervised |
| :--- | :--- | :--- |
| Labels in the data? | Yes | No |
| Question | "What is the answer for this new example?" | "What groups are in this data?" |
| Kinds | Classification, regression | Clustering (and more) |
| Example | Ripe or unripe mango | Busy and quiet water taps |
| Checking | Compare with known labels | People judge if the groups make sense |

## ⚠️ Common Mistake

**Forgetting `abs()` when measuring a distance.** A distance can never be negative. Without `abs()`, a value far **below** looks like the "closest".

Here we classify a mango by softness alone. The new mango has softness 6.

```python
examples = [(2, "unripe"), (7, "ripe")]
new_softness = 6

best_label = ""
best_distance = 1000
for softness, label in examples:
    d = softness - new_softness          # wrong: can be negative
    if d < best_distance:
        best_distance = d
        best_label = label
print(best_label, best_distance)
```

**Output:**

```text
unripe -4
```

A distance of −4 is nonsense, and softness 6 is clearly nearer to 7. **Fixed version:** use `abs()`.

```python
examples = [(2, "unripe"), (7, "ripe")]
new_softness = 6

best_label = ""
best_distance = 1000
for softness, label in examples:
    d = abs(softness - new_softness)     # right: always 0 or more
    if d < best_distance:
        best_distance = d
        best_label = label
print(best_label, best_distance)
```

**Output:**

```text
ripe 1
```

## ✍️ Try It

Add two more mangoes to the `training` list: `((5, 6), "ripe")` and `((4, 3), "unripe")`. Run `classify((5, 4))` again. Does the answer or the distance change?

**Hint:** work out the distance from (5, 4) to (4, 3) by hand: √(1² + 1²) ≈ 1.41.

## 📝 Recap

- Supervised learning uses labelled examples. Classification predicts a category; regression predicts a number.
- A nearest-neighbour classifier copies the label of the most similar training example.
- Unsupervised learning has no labels. Clustering finds groups of similar items.
- K-means repeats two steps: put each item with its nearest centre, then move each centre to its group's average.
- The computer finds groups; people must explain them and check they make sense.

## 🏆 Practice

### 🟢 Level 1: Recall
Is each task classification, regression or clustering?

1. Predicting the millimetres of rain next Wednesday.
2. Deciding if a water sample is "safe" or "needs a lab test".
3. Grouping library books into topics when none of them have subject labels.
4. Estimating how many minutes an ambulance needs to reach the hospital.

<details>
<summary>Show answer</summary>

1. Regression (a number).
2. Classification (a category).
3. Clustering (unsupervised: no labels).
4. Regression (a number of minutes).

</details>

### 🟡 Level 2: Apply
Using the `distance()` function from this chapter, calculate the distance between the points (1, 1) and (4, 5).

<details>
<summary>Show answer</summary>

```python
import math

def distance(a, b):
    return math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2)

print(distance((1, 1), (4, 5)))
```

Output:

```text
5.0
```

Across 3, up 4: √(9 + 16) = √25 = 5.

</details>

### 🔴 Level 3: Challenge
A charity weighed the parcels waiting to be delivered, in kilograms (made-up data): `[3, 4, 21, 2, 19, 5, 20]`.

1. Use the k-means steps from this chapter with two centres, starting at the smallest and largest values.
2. Run 3 rounds and print the centres each round.
3. Print both groups.
4. In one sentence, explain why a volunteer, not the computer, should decide what the groups mean.

<details>
<summary>Show one possible answer</summary>

```python
parcels = [3, 4, 21, 2, 19, 5, 20]
centre_a = min(parcels)
centre_b = max(parcels)

for r in range(1, 4):
    group_a = []
    group_b = []
    for m in parcels:
        if abs(m - centre_a) <= abs(m - centre_b):
            group_a.append(m)
        else:
            group_b.append(m)
    centre_a = sum(group_a) / len(group_a)
    centre_b = sum(group_b) / len(group_b)
    print(f"Round {r}: {round(centre_a, 1)} and {round(centre_b, 1)}")

print("Group A:", group_a)
print("Group B:", group_b)
```

Output:

```text
Round 1: 3.5 and 20.0
Round 2: 3.5 and 20.0
Round 3: 3.5 and 20.0
Group A: [3, 4, 2, 5]
Group B: [21, 19, 20]
```

The computer only sees numbers. A volunteer knows what is inside: perhaps the light parcels are food boxes and the heavy ones are blankets, which need a van, not a bicycle.

</details>
