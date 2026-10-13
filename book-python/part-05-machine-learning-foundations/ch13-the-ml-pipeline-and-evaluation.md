# Chapter 13: The Machine Learning Pipeline & Evaluation 📈

## 🌟 Real-Life Story

Before a maths exam, Ahmed found last year's paper and learned every answer by heart. In the practice test he scored 100%. In the real exam, the numbers were different, and he was lost. He had **memorised**, not **learned**. Machine learning models can make the same mistake. In this chapter you will see how engineers build a model step by step, and how they test it honestly so that a "perfect score" is not a trick.

## 🎯 What You Will Learn

- List the five steps of the machine learning pipeline.
- Clean a small dataset: remove missing values and duplicates.
- Split data into a training set and a test set, and explain why.
- Train a simple threshold model and measure its accuracy on new data.
- Count false positives and false negatives, and explain why accuracy alone can mislead.

## 🔄 The Five Steps of the ML Pipeline

A **pipeline** is a fixed series of steps where the output of one step feeds the next.

```
1. Collect   gather honest, fair data
     │
2. Clean     fix gaps, duplicates, typos
     │
3. Split     training set + test set
     │
4. Train     the model learns from
     │       the training set only
5. Evaluate  test on unseen data,
             check for unfair errors
```

## 🧹 Steps 1 and 2: Collect and Clean

Real data is messy. Sensors fail, people type values twice, and labels are spelled in different ways. If messy data goes in, a messy model comes out. Engineers call this "garbage in, garbage out".

Here is a small, **made-up** set of water samples. Each sample has a **cloudiness** score from 0 (crystal clear) to 10 (very muddy), and a label from a laboratory test. Some entries have problems.

```python
raw_samples = [
    (1, "clean"), (7, "Polluted"), (2, "clean"), (None, "clean"),
    (8, "polluted"), (3, "clean"), (6, "polluted"), (8, "polluted"),
    (0, "clean"), (9, "polluted"), (4, "clean"), (5, "polluted")
]

samples = []
for cloudiness, label in raw_samples:
    if cloudiness is None:
        continue                      # missing value: skip
    label = label.lower()             # fix "Polluted" -> "polluted"
    if (cloudiness, label) in samples:
        continue                      # duplicate: skip
    samples.append((cloudiness, label))

print("Before cleaning:", len(raw_samples))
print("After cleaning: ", len(samples))
print(samples)
```

**Output:**

```text
Before cleaning: 12
After cleaning:  10
[(1, 'clean'), (7, 'polluted'), (2, 'clean'), (8, 'polluted'), (3, 'clean'), (6, 'polluted'), (0, 'clean'), (9, 'polluted'), (4, 'clean'), (5, 'polluted')]
```

- `is None` checks for a missing value. `None` means "no value was recorded".
- `.lower()` makes the labels consistent.
- The second `(8, "polluted")` was a duplicate, so we kept only one.

(Real projects do not always delete duplicates. Two different samples can have the same reading. Here we pretend the second one was typed twice by mistake.)

## ✂️ Step 3: Split into Training and Test Sets

We never test a model on the same examples it learned from. That would be like Ahmed's practice test. Instead, we **split** the data:

- **Training set** (about 80%): the model learns from these.
- **Test set** (about 20%): locked away until training is finished. Then it is used as an honest exam.

Our cleaned data has 10 samples, so 8 go to training and 2 to testing. Slicing (Chapter 6) does this neatly. (Real projects first **shuffle** the data into random order, so the test set is a fair mix.)

```python
samples = [(1, "clean"), (7, "polluted"), (2, "clean"), (8, "polluted"),
           (3, "clean"), (6, "polluted"), (0, "clean"), (9, "polluted"),
           (4, "clean"), (5, "polluted")]

cut = int(len(samples) * 0.8)
train = samples[:cut]
test = samples[cut:]

print("Training:", len(train), train)
print("Test:    ", len(test), test)
```

**Output:**

```text
Training: 8 [(1, 'clean'), (7, 'polluted'), (2, 'clean'), (8, 'polluted'), (3, 'clean'), (6, 'polluted'), (0, 'clean'), (9, 'polluted')]
Test:     2 [(4, 'clean'), (5, 'polluted')]
```

## 🏋️ Step 4: Train a Threshold Model

Our model will be a single rule: **"if cloudiness is at least T, predict polluted"**. The number **T** is the **threshold**. Training means finding the best T, using the training set only. We try every T from 1 to 9 and count the mistakes.

```python
train = [(1, "clean"), (7, "polluted"), (2, "clean"), (8, "polluted"),
         (3, "clean"), (6, "polluted"), (0, "clean"), (9, "polluted")]

def predict(cloudiness, threshold):
    if cloudiness >= threshold:
        return "polluted"
    return "clean"

best_t = 0
fewest_mistakes = 1000
for t in range(1, 10):
    mistakes = 0
    for cloudiness, label in train:
        if predict(cloudiness, t) != label:
            mistakes += 1
    print(f"T = {t}: {mistakes} mistake(s)")
    if mistakes < fewest_mistakes:
        fewest_mistakes = mistakes
        best_t = t

print("Chosen threshold:", best_t)
```

**Output:**

```text
T = 1: 3 mistake(s)
T = 2: 2 mistake(s)
T = 3: 1 mistake(s)
T = 4: 0 mistake(s)
T = 5: 0 mistake(s)
T = 6: 0 mistake(s)
T = 7: 1 mistake(s)
T = 8: 2 mistake(s)
T = 9: 3 mistake(s)
Chosen threshold: 4
```

Thresholds 4, 5 and 6 all make zero mistakes on the training data. Our loop keeps the **first** best one, so it chooses T = 4.

## 🧪 Step 5: Evaluate on the Test Set

Now we unlock the test set. **Accuracy** is the share of correct predictions:

**Accuracy = correct predictions ÷ total predictions × 100**

```python
test = [(4, "clean"), (5, "polluted")]
best_t = 4

def predict(cloudiness, threshold):
    if cloudiness >= threshold:
        return "polluted"
    return "clean"

correct = 0
for cloudiness, label in test:
    guess = predict(cloudiness, best_t)
    print(f"cloudiness {cloudiness}: predicted {guess}, actual {label}")
    if guess == label:
        correct += 1

accuracy = correct / len(test) * 100
print(f"Test accuracy: {accuracy}%")
```

**Output:**

```text
cloudiness 4: predicted polluted, actual clean
cloudiness 5: predicted polluted, actual polluted
Test accuracy: 50.0%
```

Training looked perfect, but the test found a mistake. The training data had no samples between 3 and 6, so the model could not know where the real border was. The honest fix is **more data near the border**, not hiding the result. With only 2 test samples, one mistake swings accuracy to 50%, which is another reason real tests use many more samples.

> 🧪 **Honest note**: this is a simplified teaching model with ten made-up samples. Real water testing is done in a laboratory. A cloudiness score alone can never prove that water is safe to drink.

## 🧠 Overfitting: Memorising Instead of Learning

A model that does brilliantly on its training data but badly on new data is **overfitting**. The most extreme case is a "model" that simply memorises every training answer:

```python
train = [(1, "clean"), (7, "polluted"), (2, "clean"), (8, "polluted")]

memory = {}
for cloudiness, label in train:
    memory[cloudiness] = label

print("Sample 7:", memory.get(7, "no idea"))
print("Sample 2:", memory.get(2, "no idea"))
print("New sample 6:", memory.get(6, "no idea"))
```

**Output:**

```text
Sample 7: polluted
Sample 2: clean
New sample 6: no idea
```

It scores 100% on what it has seen and is useless on anything new. A good model learns a **general pattern**, like our threshold rule.

## ⚖️ Accuracy Is Not Everything

Two kinds of mistakes can happen when the model looks for pollution:

| | Model says polluted | Model says clean |
| :--- | :--- | :--- |
| **Really polluted** | True positive (TP) ✅ | **False negative (FN)** ❌ dangerous |
| **Really clean** | **False positive (FP)** ❌ extra test | True negative (TN) ✅ |

- A **false positive** flags clean water as polluted. The cost: an extra lab test.
- A **false negative** misses real pollution. The cost: people may drink unsafe water.

Now look at a lazy model that **always** says "clean":

```python
actual = ["clean", "clean", "polluted", "clean", "clean",
          "clean", "polluted", "clean", "clean", "clean"]

tp = 0
tn = 0
fp = 0
fn = 0
for i in range(len(actual)):
    guess = "clean"                    # the lazy model
    if actual[i] == "polluted" and guess == "polluted":
        tp += 1
    elif actual[i] == "clean" and guess == "clean":
        tn += 1
    elif actual[i] == "clean" and guess == "polluted":
        fp += 1
    else:
        fn += 1

accuracy = (tp + tn) / len(actual) * 100
print(f"Accuracy: {accuracy}%")
print(f"False positives: {fp}")
print(f"False negatives: {fn}  <- missed pollution!")
```

**Output:**

```text
Accuracy: 80.0%
False positives: 0
False negatives: 2  <- missed pollution!
```

80% accuracy sounds good, yet this model missed **every** polluted sample. When one kind of mistake can hurt people, engineers count each kind separately. Caring about who could be harmed is part of *Iḥsān*.

## ⚠️ Common Mistake

**Testing the model on its own training data.** The score looks perfect, but it proves nothing about new data.

```python
train = [(1, "clean"), (7, "polluted"), (2, "clean"), (8, "polluted"),
         (3, "clean"), (6, "polluted"), (0, "clean"), (9, "polluted")]
best_t = 4

correct = 0
for cloudiness, label in train:          # wrong: these were used for training
    guess = "clean"
    if cloudiness >= best_t:
        guess = "polluted"
    if guess == label:
        correct += 1
print(f"Accuracy: {correct / len(train) * 100}%")
```

**Output:**

```text
Accuracy: 100.0%
```

**Fixed version:** loop over the `test` set instead. It gave 50% above: a less pleasing number, but the honest one.

## ✍️ Try It

Change the training loop so it tries thresholds from 9 **down** to 1 (`range(9, 0, -1)`). Which threshold is chosen now? Test it on `[(4, "clean"), (5, "polluted")]`. What is the new accuracy?

**Hint:** the first threshold with zero mistakes is now 6. Then cloudiness 5 is predicted "clean", which is wrong.

## 📝 Recap

- The pipeline is: collect, clean, split, train, evaluate.
- Clean data by removing missing values and duplicates and making labels consistent.
- Train on the training set only. Keep the test set hidden until the end.
- Accuracy = correct ÷ total × 100. A perfect training score may just mean overfitting.
- Count false positives and false negatives separately, especially when a missed case can harm people.

## 🏆 Practice

### 🟢 Level 1: Recall
What is the difference between a false positive and a false negative in a pollution detector? Which one is usually more dangerous?

<details>
<summary>Show answer</summary>

A **false positive** says "polluted" when the water is clean. A **false negative** says "clean" when the water is polluted. The false negative is more dangerous, because pollution is missed.

</details>

### 🟡 Level 2: Apply
A dataset has 250 examples. Using an 80/20 split, how many examples go in each set? Write the Python line that finds the cut point.

<details>
<summary>Show answer</summary>

200 for training and 50 for testing.

```python
cut = int(250 * 0.8)
print(cut)
```

Output:

```text
200
```

</details>

### 🔴 Level 3: Challenge
A water sensor model was tested on 8 samples:

```python
actual    = ["clean", "clean", "polluted", "clean", "polluted", "polluted", "clean", "clean"]
predicted = ["clean", "clean", "clean", "clean", "polluted", "polluted", "polluted", "clean"]
```

1. Loop with `for i in range(len(actual)):`.
2. Count TP, TN, FP and FN (where "polluted" is the positive class).
3. Print the accuracy and the FP and FN counts.
4. Say in one sentence which mistake you would fix first, and why.

<details>
<summary>Show one possible answer</summary>

```python
tp = 0
tn = 0
fp = 0
fn = 0
for i in range(len(actual)):
    a = actual[i]
    p = predicted[i]
    if a == "polluted" and p == "polluted":
        tp += 1
    elif a == "clean" and p == "clean":
        tn += 1
    elif a == "clean" and p == "polluted":
        fp += 1
    else:
        fn += 1

print(f"Accuracy: {(tp + tn) / len(actual) * 100}%")
print(f"False positives: {fp}")
print(f"False negatives: {fn}")
```

Output:

```text
Accuracy: 75.0%
False positives: 1
False negatives: 1
```

Fix the false negative first: it let polluted water be called clean, which could make people ill.

</details>
