*Part 11 · Think Like a Programmer*
# Computational Thinking — How Developers Solve Impossible Problems

---

## 🎯 What You Will Learn

- Break a big problem into small tasks (decomposition).
- Spot the same pattern in different problems.
- Ignore details that do not matter (abstraction).
- Write an algorithm and plan it in pseudocode before coding.

---

## 🧠 Introduction: The 4 Superpowers of Problem Solving

Programming is not about typing fast or memorizing every JavaScript keyword. Programming is about **problem-solving**! 
When professional software engineers build self-driving cars, rocket flight software, or weather forecast apps, they don't just sit down and immediately type code. They use a thinking methodology called **Computational Thinking**.

Computational Thinking consists of four core pillars:
1. **Decomposition** (Breaking big problems into small, bite-sized tasks).
2. **Pattern Recognition** (Finding similarities and trends).
3. **Abstraction** (Focusing only on what matters and ignoring irrelevant clutter).
4. **Algorithm Design** (Writing step-by-step instructions to solve the problem every time).

---

## 🔨 Pillar 1: Decomposition (Divide and Conquer)

### The Big Problem
*"Build a sign-up page for the school science fair, with 9 project tables!"*
If you try to write that all at once, you will quickly feel overwhelmed and stuck.

### Decomposed Steps
1. **Storing the Tables:** How do we hold 9 tables? (An array with 9 elements: `['', '', '', ...]`, one per table.)
2. **Drawing the Tables:** How do we display them in HTML? (A 3x3 CSS Grid of 9 buttons.)
3. **Current Team:** Which team is signing up now? (`let currentTeam = "Team A";`)
4. **Click Handling:** What happens when a table is clicked? (Check if it is free, write the team's name, move to the next team.)
5. **Full Check:** How do we know when every table is taken? (Count the empty slots.)
6. **Confirmation:** Show each team which table they got.
7. **Reset:** Clear all tables when the teacher clicks a button.

Notice how a big, scary project becomes 7 manageable mini-tasks!

---

## 🔍 Pillar 2: Pattern Recognition (Spotting the Repeat)

Consider these three tasks:
- Find the highest mark in a class science quiz.
- Find the oldest student in class.
- Find the hottest temperature of the week.

### The Hidden Pattern
All three are doing the exact same thing!
1. Start with the first item as our current record holder: `let max = list[0]`.
2. Loop through every other item in the list.
3. If `list[i] > max`, update `max = list[i]`.
4. At the end, `max` is the answer.

Once you solve a pattern once, you can reuse that mental blueprint for hundreds of different apps!

---

## 🎨 Pillar 3: Abstraction (Filtering the Noise)

Think about a map app on a phone:
When you use it to walk to your friend's house, does the map show:
- Every blade of grass on the lawns?
- The breed of every dog barking in a yard?
- The color of every door handle?

No! That extra information would clutter your screen and slow you down. The map **abstracts away** the unnecessary details, showing only what you need: street names, turns, and distance.

In your code:
```javascript
// Good Abstraction
function buyBook(student, bookPrice) {
    if (student.wallet >= bookPrice) {
        student.wallet -= bookPrice;
        return true;
    }
    return false;
}
```
We don't need to know the student's hair colour, shoe size, or favourite food to check if they have enough pocket money for a book. Only `wallet` and `bookPrice` matter.
For example, a student with Rs 300 can buy a Rs 250 book (`true`, Rs 50 left), but not a second one (`false`).

---

## 📋 Pillar 4: Algorithm Design (The Step-by-Step Blueprint)

An **algorithm** is a precise sequence of steps that takes an input and produces an output.

### Real-Life Algorithm: Making Hot Cocoa
1. Pour 1 cup of milk into a saucepan.
2. Heat milk on medium until warm (do not let boil!).
3. Add 2 tablespoons of cocoa powder and 1 tablespoon of sugar.
4. Whisk constantly for 60 seconds until dissolved and frothy.
5. Pour into a mug and top with a pinch of cinnamon.

### Code Algorithm: Linear Search
```javascript
function findItemIndex(list, targetItem) {
    // Step 1: Loop through each item
    for (let i = 0; i < list.length; i++) {
        // Step 2: Compare current item with target
        if (list[i] === targetItem) {
            // Step 3: If found, immediately return position
            return i;
        }
    }
    // Step 4: If loop finishes and nothing matched, return -1
    return -1;
}
```

`findItemIndex(["Ali", "Sara", "Omar"], "Sara")` gives `1`. Searching for a name that is not there gives `-1`.

---

## 🗒️ How to Plan Before You Code: Pseudocode

Never jump straight into writing syntax. Write **Pseudocode** first—plain English notes outlining your logic:

```text
PROGRAM: Library Book Checkout
INPUT: cardNumber, booksBorrowed, bookIsAvailable

1. IF cardNumber is NOT FOUND:
     ALERT "Card not recognised. Please ask the librarian."
     EXIT

2. IF booksBorrowed >= 3:
     ALERT "You already have 3 books. Return one first."
     EXIT

3. IF bookIsAvailable is FALSE:
     ALERT "This book is on loan. Join the waiting list?"
     EXIT

4. booksBorrowed = booksBorrowed + 1
5. MARK the book as borrowed
6. PRINT a slip with the return date
```

Once your pseudocode makes sense, translating it to JavaScript takes only a few minutes!

---

## 📝 Recap

- **Decomposition**: split one big problem into small tasks you can solve one at a time.
- **Pattern recognition**: many problems share the same solution shape, like "find the biggest".
- **Abstraction**: keep only the details your program really needs.
- **Algorithm**: a precise list of steps from input to output.
- **Pseudocode**: plan in plain English first, then write JavaScript.

---

## 🏆 Practice

### 🟢 Level 1: Recall
Name the four pillars of computational thinking, and say in one line what each means.

<details>
<summary>Show answer</summary>

1. **Decomposition**: break a big problem into small tasks.
2. **Pattern recognition**: spot what is the same between problems.
3. **Abstraction**: ignore details that do not matter.
4. **Algorithm design**: write clear steps that always solve the problem.

</details>

### 🟡 Level 2: Apply
The Duplicate Finder: given the roll numbers `[101, 105, 102, 108, 105, 110]`, find the number that appears twice.
Write pseudocode first, then the JavaScript.

<details>
<summary>Show answer</summary>

Pseudocode:

```text
FOR each number in the list
  FOR each number AFTER it
    IF the two numbers are equal
      PRINT "Duplicate found"
```

JavaScript:

```javascript
let rollNumbers = [101, 105, 102, 108, 105, 110];

for (let i = 0; i < rollNumbers.length; i++) {
    for (let j = i + 1; j < rollNumbers.length; j++) {
        if (rollNumbers[i] === rollNumbers[j]) {
            console.log("Duplicate found: " + rollNumbers[i]);
        }
    }
}
```

Output: `Duplicate found: 105`

</details>

### 🔴 Level 3: Challenge
The Traffic Light Controller: plan the algorithm for a pedestrian crossing button at a busy road.
1. Decompose: list the inputs (the button) and the outputs (the lights).
2. List the timers you need.
3. Write the light sequence as numbered pseudocode steps.

<details>
<summary>Show one possible answer</summary>

```text
INPUT: buttonPressed
OUTPUTS: car light (green / amber / red), walker light (red / green)

1. Car light GREEN, walker light RED. Wait for buttonPressed.
2. When pressed: wait 5 seconds (so cars are not stopped too often).
3. Car light AMBER for 3 seconds.
4. Car light RED. Walker light GREEN for 15 seconds.
5. Walker light flashes for 5 seconds as a warning.
6. Walker light RED. Car light GREEN. Go back to step 1.
```

</details>

---

## ✅ Summary Checklist

- [ ] I can break down a complex project into small sub-tasks (Decomposition).
- [ ] I can identify common programming patterns across different problems.
- [ ] I practice Abstraction by ignoring irrelevant details in my data models.
- [ ] I write pseudocode before typing real JavaScript syntax.
