# Chapter 13: The Machine Learning Pipeline & Evaluation 📈🧪

How do professional engineers take raw data and turn it into a reliable machine learning model? They follow a rigorous, step-by-step engineering process known as the **Machine Learning Pipeline**.

---

## 🔄 The 5 Steps of the ML Pipeline

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  1. Collect  │ ──> │ 2. Clean &   │ ──> │ 3. Train/Test│ ──> │  4. Train    │ ──> │ 5. Evaluate  │
│   & Curate   │     │  Prepare     │     │     Split    │     │    Model     │     │  & Deploy    │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

1. **Collect & Curate**: Gather honest, unbiased, and ethically acquired data.
2. **Clean & Prepare**: Handle missing values, remove duplicates, and normalize numerical scales.
3. **Train / Test Split**: Split data into two separate sets: one to teach the model, and one to test it.
4. **Train Model**: Run the learning algorithm on the training dataset.
5. **Evaluate & Audit**: Test on unseen data to measure true accuracy and check for unfair biases.

---

## 🚫 The Cardinal Sin of ML: Data Leakage & Memorization

Imagine your school teacher gives you the exact questions and numbers that will appear on tomorrow’s final math exam. If you memorize the answers, you might score 100% on that test, but you have not actually learned how to do math!

In machine learning, this is called **Overfitting**:
- The model memorizes the training data perfectly (99% training accuracy).
- But when given new, real-world data it has never seen before, its accuracy drops to 50%!

To prevent this, we **always split our data**:
- **Training Set (80%)**: Used by the algorithm to learn patterns.
- **Testing Set (20%)**: Kept locked in a safe until training is completely finished, then used as an honest exam of the model's true capability.

---

## 📊 Measuring Accuracy in Python

Here is how you evaluate an algorithm's classification accuracy:

$$\text{Accuracy} = \frac{\text{Number of Correct Predictions}}{\text{Total Predictions}} \times 100\%$$

```python
# Real test labels (Ground Truth)
actual_labels =    ["Healthy", "Diseased", "Healthy", "Healthy", "Diseased"]

# Model predictions on unseen test samples
model_predictions = ["Healthy", "Diseased", "Diseased", "Healthy", "Diseased"]

correct_count = 0
total_samples = len(actual_labels)

for actual, predicted in zip(actual_labels, model_predictions):
    if actual == predicted:
        correct_count += 1

accuracy = (correct_count / total_samples) * 100
print(f"Total Evaluations : {total_samples}")
print(f"Correct Answers   : {correct_count}")
print(f"Model Test Accuracy: {accuracy:.1f}%")
```

---

## ⚠️ Accuracy Isn't Everything: False Positives & False Negatives

In healthcare or safety-critical systems, simple accuracy can be misleading:
- **False Positive**: The model claims a plant is diseased when it is actually healthy (causes minor unnecessary treatment).
- **False Negative**: The model claims a plant is healthy when it is actually diseased (disastrous! The disease spreads unnoticed through the whole crop).

Ethical developers (*Iḥsān*) pay close attention to both types of errors to protect human well-being.

---

## 🎯 Hands-On Mission: Evaluate a Model's Predictions

Calculate the accuracy, false positive count, and false negative count for an automated water purity sensor classifier:

```python
actual    = ["Clean", "Clean", "Polluted", "Clean", "Polluted", "Polluted", "Clean", "Clean"]
predicted = ["Clean", "Clean", "Clean",    "Clean", "Polluted", "Polluted", "Polluted", "Clean"]

tp = sum(1 for a, p in zip(actual, predicted) if a == "Polluted" and p == "Polluted")
tn = sum(1 for a, p in zip(actual, predicted) if a == "Clean" and p == "Clean")
fp = sum(1 for a, p in zip(actual, predicted) if a == "Clean" and p == "Polluted")
fn = sum(1 for a, p in zip(actual, predicted) if a == "Polluted" and p == "Clean")

total = len(actual)
accuracy = ((tp + tn) / total) * 100

print("🔬 WATER SAFETY SENSOR REPORT")
print(f"Overall Accuracy: {accuracy:.1f}%")
print(f"False Positives (Flagged clean water as polluted): {fp}")
print(f"False Negatives (Missed pollution - dangerous!): {fn}")
```
