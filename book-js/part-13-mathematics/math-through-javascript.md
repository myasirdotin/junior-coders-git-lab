*Part 13 · Mathematics*
# Math Through JavaScript — Exploring Numbers with Code 📐

---

## 🎯 What You Will Learn

- Use the built-in `Math` object to round, find extremes, powers and square roots.
- Make random whole numbers in any range with `Math.random()`.
- Test Grade 7 maths ideas in code: primes, circles and Pythagoras.
- Work out *Zakat* with a clear, honest formula.

---

## ⚡ Introduction: Math + Coding = Superpowers!

Do you find math formulas in textbooks dry or difficult to picture? 
When you learn math through JavaScript, math suddenly becomes **interactive, visual, and alive**! You can simulate weather forecasts, calculate charitable contributions (*Zakat*), find prime numbers in a split second, and test geometry formulas with real code.

---

## 🧮 The Built-in `Math` Object

JavaScript provides a global toolbox named `Math` packed with mathematical constants and handy functions:

### Common Math Methods
```javascript
// 1. Rounding Numbers
Math.round(4.7);  // 5 (standard rounding)
Math.floor(4.9);  // 4 (always rounds DOWN)
Math.ceil(4.1);   // 5 (always rounds UP)

// 2. Finding Extremes
Math.min(10, 5, 88, 2); // 2
Math.max(10, 5, 88, 2); // 88

// 3. Powers and Square Roots
Math.pow(2, 3);   // 8  (2 raised to power 3, or 2 ** 3)
Math.sqrt(64);    // 8  (square root of 64)

// 4. Absolute Value (distance from zero)
Math.abs(-25);    // 25

// 5. Constants
console.log(Math.PI); // 3.141592653589793
```

### 🎯 The Random Number Generator Recipe
`Math.random()` gives a decimal number from `0` up to, but not including, `1` (for example `0.4172...`).
To get a random whole number between `min` and `max` (both included):
```javascript
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Pick a random team captain or mystery quiz question (from 1 to 10):
let selectedQuestion = getRandomInt(1, 10);
console.log(`Question of the Day: #${selectedQuestion} 🎯`);
```

---

## 📚 Grade 7 Math Topics Explored in Code

### Topic 1: Factors and Prime Numbers
A prime number is only divisible by 1 and itself. Let's write an algorithm to test if any number is prime:
```javascript
function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false; // Found a factor, not prime!
        }
    }
    return true;
}

console.log("Is 17 prime?", isPrime(17)); // true
console.log("Is 21 prime?", isPrime(21)); // false
```

### Topic 2: Geometry Formulas
```javascript
// Circle calculations
function circleMath(radius) {
    let circumference = 2 * Math.PI * radius;
    let area = Math.PI * Math.pow(radius, 2);
    return {
        circumference: circumference.toFixed(2),
        area: area.toFixed(2)
    };
}

let myCircle = circleMath(7);
console.log(`Radius 7 -> Circumference: ${myCircle.circumference}, Area: ${myCircle.area}`);
```

Output: `Radius 7 -> Circumference: 43.98, Area: 153.94`
(`toFixed(2)` rounds to 2 decimal places and gives back a string.)

### Topic 3: Pythagorean Theorem (a² + b² = c²)
Calculate the hypotenuse of a right-angled triangle:
```javascript
function calculateHypotenuse(base, height) {
    let hypotenuse = Math.sqrt(Math.pow(base, 2) + Math.pow(height, 2));
    return hypotenuse.toFixed(2);
}

console.log("Hypotenuse of 3 and 4:", calculateHypotenuse(3, 4)); // 5.00
```

### Topic 4: Ethical Finance — Annual Zakat Calculation
Formula: **Zakat = Net Wealth × 0.025** (that is 2.5%).
Zakat is due only when savings reach the *Nisab* (a minimum amount, linked to the value of gold or silver) and have been held for one full lunar year.
```javascript
// Calculates annual Zakat contribution if wealth exceeds Nisab threshold
function calculateZakat(netSavings, goldNisabThreshold) {
    if (netSavings < goldNisabThreshold) {
        return {
            isPayable: false,
            zakatAmount: 0,
            message: "Savings are below the Nisab threshold. No Zakat due."
        };
    }
    
    let zakat = netSavings * 0.025; // 2.5% contribution for community care
    return {
        isPayable: true,
        zakatAmount: zakat.toFixed(2),
        remainingWealth: (netSavings - zakat).toFixed(2),
        message: "Zakat successfully calculated to support those in need."
    };
}

let report = calculateZakat(150000, 100000);
console.log(`Zakat Due: Rs ${report.zakatAmount} | Remaining: Rs ${report.remainingWealth}`);
```

Output: `Zakat Due: Rs 3750.00 | Remaining: Rs 146250.00`

---

## 📝 Recap

- `Math` is a built-in toolbox: `round`, `floor`, `ceil`, `min`, `max`, `pow`, `sqrt`, `abs` and `PI`.
- `Math.floor(Math.random() * (max - min + 1)) + min` gives a fair random whole number from `min` to `max`.
- A prime test only needs to try factors up to the square root of the number.
- Formulas such as circle area, Pythagoras and Zakat become small, reusable functions.

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
    if (num <= 1) return false;
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
4. Run it a few times. Is Team A always close to 50%? (This is the **Law of Large Numbers**: the more tries, the closer to the expected share.)

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

Another gave `Team A: 489 | Team B: 511` (48.9%). Each run lands close to 50%.

</details>

---

## ✅ Summary Checklist

- [ ] I can use `Math.floor()`, `Math.ceil()`, and `Math.round()`.
- [ ] I can generate random numbers within any range using `Math.random()`.
- [ ] I can use `Math.PI` and `Math.sqrt()` for geometric formulas.
- [ ] I can write functions that test mathematical properties like primes and factors.
