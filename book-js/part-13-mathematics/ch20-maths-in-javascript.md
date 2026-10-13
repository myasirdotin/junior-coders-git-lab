# Chapter 20: Maths in JavaScript 📐

## 🌟 Real-Life Story

Bilal and Maryam are planning a round flower bed for the school garden.
They need to know how much fencing to buy and how much soil to order.
On paper, that means formulas with π and squares, worked out slowly by hand.
In JavaScript, they write each formula once, as a function.
Now they can try a bed with a radius of 3, 5 or 7 metres in a second.
Code turns maths from something you only read into something you can test.

---

## 🎯 What You Will Learn

- Use the built-in `Math` object to round, find extremes, powers and square roots.
- Round answers to a fixed number of decimal places with `toFixed()`.
- Make fair random whole numbers in any range with `Math.random()`.
- Test Grade 7 maths ideas in code: primes, circles and Pythagoras.
- Work out *Zakat* with a clear, honest formula.

---

## ⚡ Why Maths and Code Fit Together

A maths formula is a list of exact steps. So is a program.
When you write a formula as a function, you can run it on hundreds of numbers.
You can test whether a number is prime in a split second, check geometry formulas, or work out a charity payment (*Zakat*).

---

## 🧮 The Built-in `Math` Object

JavaScript has a ready-made toolbox called `Math`. It holds useful constants (fixed numbers such as π) and functions.
You met `Math.floor()` in Chapter 5. Here is more of the toolbox:

```javascript
// Rounding numbers
console.log(Math.round(4.7));  // nearest whole number
console.log(Math.floor(4.9));  // always rounds DOWN
console.log(Math.ceil(4.1));   // always rounds UP

// Finding the smallest and the largest
console.log(Math.min(10, 5, 88, 2));
console.log(Math.max(10, 5, 88, 2));

// Powers and square roots
console.log(Math.pow(2, 3));   // 2 to the power 3
console.log(2 ** 3);           // the same, with the ** operator
console.log(Math.sqrt(64));    // square root of 64

// Absolute value (distance from zero)
console.log(Math.abs(-25));

// The constant pi
console.log(Math.PI);
```

Output:

```text
5
4
5
2
88
8
8
8
25
3.141592653589793
```

### Rounding to decimal places with `toFixed()`

`Math.round()` only rounds to whole numbers. To keep two decimal places, use `toFixed(2)` on the number.
`toFixed()` rounds the number and gives back a **string** (text), not a number.

```javascript
let average = 78.456;
console.log(average.toFixed(2));
console.log(average.toFixed(0));
```

Output:

```text
78.46
78
```

### 🎯 The Fair Random Number Recipe

`Math.random()` gives a decimal number from `0` up to, but not including, `1` (for example `0.4172...`).
To get a random whole number from `min` to `max` (both included), use this recipe:

```javascript
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Pick a random quiz question (from 1 to 10):
let selectedQuestion = getRandomInt(1, 10);
console.log(`Question of the Day: #${selectedQuestion}`);
```

The output changes every run, because the number is random. One run printed:

```text
Question of the Day: #7
```

How it works for `getRandomInt(1, 10)`:
- `Math.random() * (10 - 1 + 1)` gives a decimal from 0 up to (but not including) 10.
- `Math.floor(...)` cuts off the decimals, giving a whole number from 0 to 9.
- `+ 1` moves it to 1 to 10. Every number has the same chance, so the pick is fair.

---

## 📚 Grade 7 Maths Topics Explored in Code

### Factors and Prime Numbers

A prime number has exactly two factors: 1 and itself. So 1 is not prime.
This function tests a number. It only tries factors up to the square root.
Any factor bigger than the square root pairs with a smaller one that was already tried.

```javascript
function isPrime(num) {
    if (num <= 1) {
        return false;
    }
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false; // found a factor, so not prime
        }
    }
    return true;
}

console.log("Is 17 prime?", isPrime(17));
console.log("Is 21 prime?", isPrime(21));
```

Output:

```text
Is 17 prime? true
Is 21 prime? false
```

### Circle Formulas

Circumference = 2 × π × r. Area = π × r².

```javascript
function circleMath(radius) {
    let circumference = 2 * Math.PI * radius;
    let area = Math.PI * Math.pow(radius, 2);
    return {
        circumference: circumference.toFixed(2),
        area: area.toFixed(2)
    };
}

let gardenBed = circleMath(7);
console.log(`Radius 7 -> Circumference: ${gardenBed.circumference}, Area: ${gardenBed.area}`);
```

Output:

```text
Radius 7 -> Circumference: 43.98, Area: 153.94
```

So the flower bed with a 7-metre radius needs about 43.98 m of fencing. It covers about 153.94 square metres.

### Pythagoras' Theorem (a² + b² = c²)

In a right-angled triangle, the longest side is called the **hypotenuse**. Its length is the square root of a² + b²:

```javascript
function calculateHypotenuse(base, height) {
    let hypotenuse = Math.sqrt(Math.pow(base, 2) + Math.pow(height, 2));
    return hypotenuse.toFixed(2);
}

console.log("Hypotenuse of 3 and 4:", calculateHypotenuse(3, 4));
console.log("Hypotenuse of 5 and 12:", calculateHypotenuse(5, 12));
```

Output:

```text
Hypotenuse of 3 and 4: 5.00
Hypotenuse of 5 and 12: 13.00
```

### Ethical Finance: Annual Zakat Calculation

*Zakat* is a yearly charity that Muslims give to people in need. The basic rule:
- Zakat is **2.5%** (that is, × 0.025) of **zakatable wealth**: the savings and other wealth that Zakat applies to.
- It is due only when that wealth is at or above the *nisab*. The nisab is a minimum amount linked to the value of gold or silver.
- The wealth must have been held for one full lunar (Islamic) year.

```javascript
function calculateZakat(zakatableWealth, nisab, heldOneLunarYear) {
    if (zakatableWealth < nisab || heldOneLunarYear === false) {
        return {
            isDue: false,
            zakatAmount: 0,
            message: "No Zakat is due on this wealth yet."
        };
    }

    let zakat = zakatableWealth * 0.025; // 2.5%
    return {
        isDue: true,
        zakatAmount: zakat.toFixed(2),
        message: "Zakat is due: 2.5% of zakatable wealth."
    };
}

let family1 = calculateZakat(150000, 100000, true);
console.log(`Zakat due: Rs ${family1.zakatAmount} | ${family1.message}`);

let family2 = calculateZakat(80000, 100000, true);
console.log(`Zakat due: Rs ${family2.zakatAmount} | ${family2.message}`);
```

Output:

```text
Zakat due: Rs 3750.00 | Zakat is due: 2.5% of zakatable wealth.
Zakat due: Rs 0 | No Zakat is due on this wealth yet.
```

> 💡 **Be honest with the numbers:** the nisab of Rs 100000 here is only an example. The real nisab changes as gold and silver prices change. Some details, such as which wealth counts, need care too. For a real Zakat calculation, ask a scholar or your local Zakat authority.

---

## ⚠️ Common Mistake

**Doing more maths with the result of `toFixed()`**

```javascript
let price = 4.5;
console.log(price.toFixed(2) + 1);
```

- **What happens:** it prints `4.501`, not `5.5`.
- **Why:** `toFixed()` gives back a string. So `+` joins the text `"4.50"` and `1` together.
- **Fix:** do all the maths first and use `toFixed()` only at the end, for display. Or turn the text back into a number with `Number()`:

```javascript
let price = 4.5;
console.log(Number(price.toFixed(2)) + 1);
```

Output: `5.5`

**Forgetting `Math.floor()` in the random recipe:** `Math.random() * 10` gives decimals such as `6.911404343327197`, not whole numbers.

---

## ✍️ Try It

Open the **Live JavaScript Scratchpad** and type this array of test scores:

```javascript
let scores = [72, 88, 95, 64, 81];
```

Print the highest score, the lowest score, and the average rounded to one decimal place.

> 💡 **Hint:** `Math.max()` and `Math.min()` take numbers separated by commas, so pass `scores[0], scores[1], ...`. Add the scores with a `for` loop, divide by `scores.length`, then use `toFixed(1)`. You should see `95`, `64` and `80.0`.

---

## 📝 Recap

- `Math` is a built-in toolbox: `round`, `floor`, `ceil`, `min`, `max`, `pow`, `sqrt`, `abs` and `PI`.
- `toFixed(n)` rounds to `n` decimal places and gives back a string, so use it last.
- `Math.floor(Math.random() * (max - min + 1)) + min` gives a fair random whole number from `min` to `max`.
- A prime test only needs to try factors up to the square root of the number.
- Formulas such as circle area, Pythagoras and Zakat become small, reusable functions.

**Check yourself:**

- [ ] I can use `Math.floor()`, `Math.ceil()` and `Math.round()`.
- [ ] I can make a fair random whole number in any range with `Math.random()`.
- [ ] I can use `Math.PI` and `Math.sqrt()` in geometry formulas.
- [ ] I can write functions that test number facts, such as whether a number is prime.

---

## 🏆 Practice

### 🟢 Level 1: Recall
What do `Math.floor(4.9)`, `Math.ceil(4.1)` and `Math.round(4.7)` give?

<details>
<summary>Show answer</summary>

`4`, `5` and `5`. `floor` always rounds down, `ceil` always rounds up, and `round` goes to the nearest whole number.

</details>

### 🟡 Level 2: Apply
Find all prime numbers from 1 to 100. Loop from 1 to 100, use the `isPrime()` function above, and push each prime into an array. Print the list and the count.

<details>
<summary>Show answer</summary>

```javascript
function isPrime(num) {
    if (num <= 1) {
        return false;
    }
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

let primes = [];
for (let n = 1; n <= 100; n++) {
    if (isPrime(n)) {
        primes.push(n);
    }
}

console.log(primes.join(", "));
console.log("Total primes:", primes.length);
```

Output:

```text
2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97
Total primes: 25
```

</details>

### 🔴 Level 3: Challenge
Fair Team Picker: 1,000 students are each put into Team A or Team B at random.
1. Loop 1,000 times.
2. Use `Math.random() < 0.5` to choose the team.
3. Count both teams and print the share for Team A.
4. Run it a few times. Is Team A always close to 50%? (This is the **Law of Large Numbers**: the more tries, the closer the result gets to the expected share.)

<details>
<summary>Show one possible answer</summary>

```javascript
let teamA = 0;
let teamB = 0;

for (let i = 1; i <= 1000; i++) {
    if (Math.random() < 0.5) {
        teamA++;
    } else {
        teamB++;
    }
}

console.log("Team A:", teamA, "| Team B:", teamB);
console.log("Team A share:", (teamA / 1000 * 100) + "%");
```

The numbers change every run, because they are random. One run gave:

```text
Team A: 510 | Team B: 490
Team A share: 51%
```

Another gave `Team A: 495 | Team B: 505` (49.5%). Each run lands close to 50%.

</details>
