# Chapter 18: Computational Thinking

---

## 🌟 Real-Life Story

Your class wants to run a charity book sale for a local hospital. At first it feels too big to start.
So your teacher writes a list on the board: collect books, sort them, set prices, make posters, count the money.
Suddenly every job is small, and each group knows what to do.
The sorting group notices it is the same job as sorting the class library, so they reuse that plan.
That way of thinking has a name: **computational thinking**. Programmers use it every day.

---

## 🎯 What You Will Learn

- Break a big problem into small tasks (decomposition).
- Spot the same pattern in different problems.
- Ignore details that do not matter (abstraction).
- Write an algorithm and plan it in pseudocode before coding.

---

## The Four Pillars of Problem Solving

Programming is not about typing fast or memorizing every JavaScript keyword. Programming is about **problem-solving**!
When professional software engineers build rocket flight software or weather forecast apps, they don't just sit down and immediately type code. They use a thinking method called **Computational Thinking**.

Computational Thinking has four pillars (main ideas):

| Pillar | What it means |
|---|---|
| **Decomposition** | Break a big problem into small, bite-sized tasks. |
| **Pattern Recognition** | Find what is the same between problems. |
| **Abstraction** | Keep only what matters and ignore the clutter. |
| **Algorithm Design** | Write step-by-step instructions that solve the problem every time. |

---

## Pillar 1: Decomposition (Divide and Conquer)

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

Notice how a big, scary project becomes 7 manageable mini-tasks! Each one uses something you already know: arrays, variables, conditions, loops and events.

---

## Pillar 2: Pattern Recognition (Spotting the Repeat)

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

Here is the pattern finding the hottest day of the week:

```javascript
let temps = [31, 34, 29, 36, 33];
let max = temps[0];

for (let i = 1; i < temps.length; i++) {
    if (temps[i] > max) {
        max = temps[i];
    }
}

console.log("Hottest day: " + max);
```

Output:

```text
Hottest day: 36
```

Swap `temps` for a list of quiz marks or ages, and the same code finds the highest mark or the oldest student.
Once you solve a pattern once, you can reuse that mental blueprint for many different apps!

---

## Pillar 3: Abstraction (Filtering the Noise)

Think about a map app on a phone.
When you use it to walk to your friend's house, does the map show:
- Every blade of grass on the lawns?
- The colour of every front door?
- The name of every tree in the park?

No! That extra information would clutter your screen and slow you down. The map **abstracts away** the unnecessary details, showing only what you need: street names, turns, and distance.

In your code:

```javascript
// Good abstraction: only the details we need
function buyBook(student, bookPrice) {
    if (student.wallet >= bookPrice) {
        student.wallet -= bookPrice;
        return true;
    }
    return false;
}

let amina = { name: "Amina", wallet: 300 };
console.log(buyBook(amina, 250));
console.log(amina.wallet);
console.log(buyBook(amina, 250));
```

Output:

```text
true
50
false
```

We don't need to know the student's shoe size or favourite food to check if they have enough pocket money for a book. Only `wallet` and `bookPrice` matter.
Amina has Rs 300, so she can buy a Rs 250 book (Rs 50 left), but not a second one.

---

## Pillar 4: Algorithm Design (The Step-by-Step Blueprint)

An **algorithm** is a precise sequence of steps that takes an input and produces an output.

### Real-Life Algorithm: Making Hot Cocoa
1. Pour 1 cup of milk into a saucepan.
2. Heat milk on medium until warm (do not let it boil!).
3. Add 2 tablespoons of cocoa powder and 1 tablespoon of sugar.
4. Whisk for 60 seconds until dissolved and frothy.
5. Pour into a mug and top with a pinch of cinnamon.

### Code Algorithm: Linear Search
A **linear search** checks a list one item at a time, from the start, until it finds what it wants.

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

console.log(findItemIndex(["Ali", "Sara", "Omar"], "Sara"));
console.log(findItemIndex(["Ali", "Sara", "Omar"], "Zain"));
```

Output:

```text
1
-1
```

`"Sara"` is at index 1. `"Zain"` is not in the list, so the function gives `-1`.

---

## How to Plan Before You Code: Pseudocode

Never jump straight into writing syntax. Write **pseudocode** first: plain English notes outlining your logic.

```text
PROGRAM: Library Book Checkout
INPUT: cardNumber, booksBorrowed, bookIsAvailable

1. IF cardNumber is NOT FOUND:
     ALERT "Card not recognised. Please ask
            the librarian."
     EXIT

2. IF booksBorrowed >= 3:
     ALERT "You already have 3 books.
            Return one first."
     EXIT

3. IF bookIsAvailable is FALSE:
     ALERT "This book is on loan.
            Join the waiting list?"
     EXIT

4. booksBorrowed = booksBorrowed + 1
5. MARK the book as borrowed
6. PRINT a slip with the return date
```

Once your pseudocode makes sense, translating it to JavaScript takes only a few minutes! Each `IF` becomes an `if`, each `ALERT` becomes `alert()`, and each `EXIT` becomes `return`.

---

## ⚠️ Common Mistake

**Starting the record holder at 0 instead of the first item.** It looks fine for marks, but it breaks for lists of negative numbers, such as winter temperatures.

Wrong version:

```javascript
let winterTemps = [-5, -2, -8, -4];
let max = 0;

for (let i = 0; i < winterTemps.length; i++) {
    if (winterTemps[i] > max) {
        max = winterTemps[i];
    }
}

console.log("Warmest: " + max);
```

Output:

```text
Warmest: 0
```

No day was 0 degrees! Every reading is smaller than 0, so `max` never changes.

Fixed version: start with the first item, as the pattern says.

```javascript
let winterTemps = [-5, -2, -8, -4];
let max = winterTemps[0];

for (let i = 1; i < winterTemps.length; i++) {
    if (winterTemps[i] > max) {
        max = winterTemps[i];
    }
}

console.log("Warmest: " + max);
```

Output:

```text
Warmest: -2
```

A second common mistake is skipping the plan. If you start typing before you know the steps, you often rewrite the code three times.

---

## ✍️ Try It

The school librarian has a list that says whether each borrowed book came back:

```javascript
let returned = [true, false, true, false, false];
```

1. **Decompose:** write the small steps needed to count the books that did **not** come back.
2. **Pseudocode:** write those steps in plain English.
3. **Code:** turn your plan into JavaScript and print `Books not returned: 3`.

**Hint:** this is the counting pattern. Start a counter at 0, loop through the list, and add 1 each time an item is `false`.

---

## 📝 Recap

- **Decomposition**: split one big problem into small tasks you can solve one at a time.
- **Pattern recognition**: many problems share the same solution shape, like "find the biggest".
- **Abstraction**: keep only the details your program really needs.
- **Algorithm**: a precise list of steps from input to output.
- **Pseudocode**: plan in plain English first, then write JavaScript.

**Check yourself:**

- [ ] I can break down a big project into small sub-tasks.
- [ ] I can spot the same pattern in different problems.
- [ ] I can say which details my program needs and which it can ignore.
- [ ] I write pseudocode before typing real JavaScript.

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
OUTPUTS: car light (green / amber / red),
         walker light (red / green)

1. Car light GREEN, walker light RED.
   Wait for buttonPressed.
2. When pressed: wait 5 seconds (so cars
   are not stopped too often).
3. Car light AMBER for 3 seconds.
4. Car light RED. Walker light GREEN
   for 15 seconds.
5. Walker light flashes for 5 seconds
   as a warning.
6. Walker light RED. Car light GREEN.
   Go back to step 1.
```

</details>
