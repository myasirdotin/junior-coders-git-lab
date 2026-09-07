# Part 13: Mathematics
# Math Through JavaScript — Exploring Numbers with Code 📐

---

## 1. Introduction: Math + Coding = Superpowers! ⚡

Do you find math formulas in textbooks dry or difficult to picture? 
When you learn math through JavaScript, math suddenly becomes **interactive, visual, and alive**! You can simulate dice rolls, find prime numbers in a split second, calculate geometry areas dynamically, and test financial math formulas with real code.

---

## 2. The Built-in `Math` Object 🧮

JavaScript provides a global toolbox named `Math` packed with mathematical constants and handy functions:

### Common Math Methods:
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

### The Random Number Generator Recipe 🎲:
`Math.random()` generates a floating-point number between `0` (inclusive) and `1` (exclusive).
To generate a random whole integer between `min` and `max`:
```javascript
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Roll a standard 6-sided die:
let diceRoll = getRandomInt(1, 6);
console.log(`You rolled a: ${diceRoll} 🎲`);
```

---

## 3. Grade 7 Math Topics Explored in Code 📚

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

### Topic 3: Pythagorean Theorem ($a^2 + b^2 = c^2$)
Calculate the hypotenuse of a right-angled triangle:
```javascript
function calculateHypotenuse(base, height) {
    let hypotenuse = Math.sqrt(Math.pow(base, 2) + Math.pow(height, 2));
    return hypotenuse.toFixed(2);
}

console.log("Hypotenuse of 3 and 4:", calculateHypotenuse(3, 4)); // 5.00
```

### Topic 4: Simple Interest & Banking Formula
Formula: $I = \frac{P \times R \times T}{100}$
```javascript
function calculateSimpleInterest(principal, ratePercent, timeYears) {
    let interest = (principal * ratePercent * timeYears) / 100;
    let totalAmount = principal + interest;
    return {
        interestEarned: interest,
        totalBalance: totalAmount
    };
}

let bank = calculateSimpleInterest(10000, 7.5, 3);
console.log(`Principal: Rs 10000 | Interest: Rs ${bank.interestEarned} | Total: Rs ${bank.totalBalance}`);
```

---

## 4. Mathematical Exploration Challenges 🏆

### Challenge 1: Find All Prime Numbers from 1 to 100
Write a loop from 1 to 100 that uses your `isPrime()` function and pushes all prime numbers into an array. Print the list of primes and the total count!

### Challenge 2: Coin Flip Simulator
Flip a virtual coin 1,000 times using `Math.random() < 0.5`. Count how many Heads and Tails occur. Is it close to 50%? (The Law of Large Numbers!).

---

## 5. Summary Checklist ✅

- [ ] I can use `Math.floor()`, `Math.ceil()`, and `Math.round()`.
- [ ] I can generate random numbers within any range using `Math.random()`.
- [ ] I can use `Math.PI` and `Math.sqrt()` for geometric formulas.
- [ ] I can write functions that test mathematical properties like primes and factors.
