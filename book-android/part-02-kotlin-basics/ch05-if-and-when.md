# Chapter 5: Decisions with if and when

## 🌟 Real-Life Story

At the library desk, the librarian makes small decisions all day. Is the book on the shelf? Then hand it over. Is it borrowed? Then offer to reserve it. Is the student's card missing? Then send them to the office first. None of these decisions are hard, but each one depends on a question with a yes-or-no answer. Apps do exactly the same: show "Available" or "Borrowed", enable a button or not, pick a message for a grade. In Kotlin, these decisions are written with `if` and `when`.

## 🎯 What You Will Learn

- Compare values with `==`, `!=`, `<`, `>`, `<=` and `>=`.
- Join conditions with `&&` (and), `||` (or) and `!` (not).
- Write decisions with `if`, `else if` and `else`.
- Use `if` as an expression that gives back a value.
- Choose between many cases with `when`, including ranges like `in 90..100`.

## Comparison Operators

A **condition** is a question whose answer is `true` or `false`. You met the `Boolean` type in Chapter 4: it holds exactly these two values. Comparison operators build conditions.

| Operator | Meaning | Example | Result |
|---|---|---|---|
| `==` | equal to | `5 == 5` | `true` |
| `!=` | not equal to | `5 != 5` | `false` |
| `<` | less than | `3 < 7` | `true` |
| `>` | greater than | `3 > 7` | `false` |
| `<=` | less than or equal | `50 <= 50` | `true` |
| `>=` | greater than or equal | `49 >= 50` | `false` |

```kotlin
fun main() {
    val score = 72
    println(score > 50)
    println(score < 50)
    println(score >= 72)
    println(score == 100)
    println(score != 100)
    println("Kotlin" == "Kotlin")
}
```

Output:

```text
true
false
true
false
true
true
```

Two things to notice:

- One `=` **stores** a value (`val score = 72`). Two `==` **compares** two values. Mixing them up is the most common beginner mistake.
- `==` compares Strings by their letters. In Kotlin there is no separate `===` for this, unlike JavaScript. (Kotlin does have `===`, but it means "the very same object", and you will not need it in this book.)

## Logical Operators: and, or, not

Real decisions often depend on more than one question. Logical operators join conditions together.

| Operator | Name | True when... |
|---|---|---|
| `&&` | and | **both** sides are true |
| `\|\|` | or | **at least one** side is true |
| `!` | not | flips `true` to `false`, and `false` to `true` |

```kotlin
fun main() {
    val hasCard = true
    val booksBorrowed = 2
    val finesUnpaid = false

    println(hasCard && booksBorrowed < 3)
    println(booksBorrowed == 0 || hasCard)
    println(!finesUnpaid)

    val canBorrow = hasCard && booksBorrowed < 3 && !finesUnpaid
    println("Can borrow: $canBorrow")
}
```

Output:

```text
true
true
true
Can borrow: true
```

A condition is just a value, so you can store it in a `val` with a clear name, like `canBorrow`. This makes long decisions much easier to read.

```text
hasCard   booksBorrowed<3   !finesUnpaid
 true   &&     true       &&    true
 \______________ ______________/
                \/
          canBorrow = true
```

## if and else: Two Roads

`if` runs a block of code only when its condition is `true`. The optional `else` block runs when it is `false`. The condition always goes inside round brackets `( )`, and each block inside curly braces `{ }`.

```kotlin
fun main() {
    val available = false
    val title = "Gardens of the World"

    if (available) {
        println("$title is on the shelf. Enjoy!")
    } else {
        println("$title is borrowed. Ask the librarian to reserve it.")
    }
    println("Thank you for visiting.")
}
```

Output:

```text
Gardens of the World is borrowed. Ask the librarian to reserve it.
Thank you for visiting.
```

The last `println` is outside the `if`, so it runs every time. Because `available` is already a `Boolean`, we write `if (available)`, not `if (available == true)`.

### else if: more than two roads

When there are several possibilities, chain them with `else if`. Kotlin checks each condition **from top to bottom** and runs only the **first** block whose condition is true. The rest are skipped.

```kotlin
fun main() {
    val temperature = 31

    if (temperature >= 35) {
        println("Very hot: lessons move indoors.")
    } else if (temperature >= 28) {
        println("Warm: bring a water bottle.")
    } else if (temperature >= 15) {
        println("Pleasant: enjoy the garden.")
    } else {
        println("Cool: wear a jacket.")
    }
}
```

Output:

```text
Warm: bring a water bottle.
```

`31 >= 35` is false, so Kotlin moves on. `31 >= 28` is true, so it prints the warm message and stops. It never checks `>= 15`, even though that is also true.

## if as an Expression

In Kotlin, `if` can do more than run code. It can also **give back a value**. Something that produces a value is called an **expression**. You can store the result straight into a `val`:

```kotlin
fun main() {
    val copiesLeft = 0
    val label = if (copiesLeft > 0) "Available" else "Borrowed"
    println(label)

    val a = 14
    val b = 9
    val bigger = if (a > b) a else b
    println("The bigger number is $bigger")
}
```

Output:

```text
Borrowed
The bigger number is 14
```

When `if` is used as an expression, the `else` part is **required**. Kotlin must always have a value to put in the box.

If you know JavaScript, this replaces the ternary operator `condition ? a : b`. Kotlin has no `? :` operator; it uses `if ... else ...` instead.

You will use this a lot in Android. For example, a book card will show `if (book.available) "Available" else "Borrowed"`.

## when: Choosing from Many Cases

A long chain of `else if` checks against one value gets hard to read. Kotlin's `when` is a neater way. It is like `switch` in other languages, but more powerful.

```kotlin
fun main() {
    val day = 5

    val dayName = when (day) {
        1 -> "Monday"
        2 -> "Tuesday"
        3 -> "Wednesday"
        4 -> "Thursday"
        5 -> "Friday"
        6, 7 -> "Weekend"
        else -> "Not a day number"
    }
    println(dayName)
}
```

Output:

```text
Friday
```

How to read it:

- `when (day)` says: "look at `day`".
- Each line is a **branch**: a value, an arrow `->`, then the result.
- `6, 7 ->` matches either value. A comma means "or" here.
- `else ->` catches everything not listed. It is like the final `else` of an `if`.
- Only the first matching branch runs. There is no `break` to forget.

`when` works with any type you can compare, including `Char` and `String`:

```kotlin
fun main() {
    val shelf = 'C'
    when (shelf) {
        'A' -> println("Science")
        'B' -> println("Geography")
        'C' -> println("Stories")
        else -> println("Ask the librarian")
    }
}
```

Output:

```text
Stories
```

Here `when` is used as a **statement**: each branch runs a `println` and nothing is stored. In the first example it was an **expression** that gave a value to `dayName`.

### Ranges: in 90..100

Two dots make a **range**: `90..100` means every whole number from 90 to 100, **including both ends**. The keyword `in` asks "is this value inside the range?". This is perfect for marks:

```kotlin
fun main() {
    val marks = 84

    val grade = when (marks) {
        in 90..100 -> "A"
        in 80..89 -> "B"
        in 70..79 -> "C"
        in 50..69 -> "D"
        in 0..49 -> "Needs extra help"
        else -> "Marks must be 0 to 100"
    }
    println("Marks $marks: grade $grade")
}
```

Output:

```text
Marks 84: grade B
```

```text
 0 ...... 49 | 50..69 | 70..79 | 80..89 | 90..100
   extra help    D        C       B        A
                                   ^
                               84 lands here
```

The `else` branch protects you from impossible marks like `105` or `-3`. You can also use `in` in an `if`: `if (marks in 90..100)`.

### when without a subject

If you leave out the brackets after `when`, each branch can be any condition. This is a clean replacement for a long `else if` chain:

```kotlin
fun main() {
    val waterLitres = 140

    when {
        waterLitres > 200 -> println("High use: check for leaks.")
        waterLitres > 100 -> println("Normal use. Try a shorter wash.")
        else -> println("Great saving today!")
    }
}
```

Output:

```text
Normal use. Try a shorter wash.
```

### if or when?

| Situation | Choose |
|---|---|
| One yes/no question | `if` / `else` |
| Pick one of two values | `if (...) a else b` |
| One value, many possible cases | `when (value)` |
| Several unrelated conditions | `when { ... }` |

## ⚠️ Common Mistake

**Mistake 1: one `=` instead of two.**

```kotlin
fun main() {
    val marks = 84
    if (marks = 100) {
        println("Full marks!")
    }
}
```

Kotlin refuses to run it:

```text
error: 'val' cannot be reassigned.
error: only expressions are allowed in this context.
```

`marks = 100` tries to *store* 100, which is not a question. Fix: `if (marks == 100)`.

**Mistake 2: a `when` expression with no `else`.**

```kotlin
val grade = when (marks) {
    in 90..100 -> "A"
    in 80..89 -> "B"
}
```

```text
error: 'when' expression must be exhaustive. Add an 'else' branch.
```

"Exhaustive" means "covers every possible case". What should `grade` be when marks are 40? Kotlin cannot know, so it asks you to add `else -> ...`.

**Mistake 3: the wrong order in an `else if` chain.** This program runs, but gives the wrong answer:

```kotlin
fun main() {
    val temperature = 37
    if (temperature >= 15) {
        println("Pleasant: enjoy the garden.")
    } else if (temperature >= 35) {
        println("Very hot: lessons move indoors.")
    }
}
```

```text
Pleasant: enjoy the garden.
```

37 is also `>= 15`, so the first branch wins and the second is never reached. Fix: check the **strictest** condition first (`>= 35` before `>= 15`).

## ✍️ Try It

Write a program for a school bus:

1. Make a `val seatsFree = 3` and a `val studentsWaiting = 5`.
2. Use `if` / `else` to print `Everyone fits` or `Some students wait for the next bus`.
3. Use an `if` expression to store how many must wait (0 when everyone fits), and print it.

**Hint:** `studentsWaiting - seatsFree` is the number who wait, but only when it is more than zero.

## 📝 Recap

- Comparisons (`==`, `!=`, `<`, `>`, `<=`, `>=`) give a `Boolean`. One `=` stores, two `==` compares.
- `&&` needs both sides true, `||` needs at least one, `!` flips a Boolean.
- `if` / `else if` / `else` checks from top to bottom and runs only the first true branch.
- `if (...) a else b` is an expression that gives back a value. The `else` is then required.
- `when` picks one branch from many: single values, `6, 7`, ranges like `in 90..100`, and `else`.

## 📖 Key Terms

- **Condition:** a question whose answer is `true` or `false`.
- **Expression:** code that produces a value.
- **Branch:** one of the possible paths in an `if` or `when`.
- **Range:** a run of numbers such as `1..10`, including both ends.
- **Exhaustive:** covering every possible case.

## 🏆 Practice

### 🟢 Level 1: Recall
What does this program print?

```kotlin
fun main() {
    val x = 8
    println(x > 5 && x < 10)
    println(x == 5 || x == 8)
    println(!(x > 5))
    val size = if (x % 2 == 0) "even" else "odd"
    println(size)
}
```

<details>
<summary>Show answer</summary>

```text
true
true
false
even
```

8 is between 5 and 10; 8 equals 8, so the `||` is true; `x > 5` is true, so `!` makes it false; `8 % 2` is `0`, so 8 is even.

</details>

### 🟡 Level 2: Apply
The library sends a polite message when a book comes back. Write a program with `val daysLate = 2` and a `when` expression that stores the right message:

- 0 days: `Returned on time. Thank you!`
- 1 to 3 days: `A little late. Please return books on time.`
- 4 to 14 days: `Late. Please speak to the librarian.`
- anything else: `Very late. The librarian will contact your teacher.`

<details>
<summary>Show answer</summary>

```kotlin
fun main() {
    val daysLate = 2

    val message = when (daysLate) {
        0 -> "Returned on time. Thank you!"
        in 1..3 -> "A little late. Please return books on time."
        in 4..14 -> "Late. Please speak to the librarian."
        else -> "Very late. The librarian will contact your teacher."
    }
    println(message)
}
```

Output:

```text
A little late. Please return books on time.
```

Try changing `daysLate` to `0`, `10` and `30` to test every branch.

</details>

### 🔴 Level 3: Challenge
The school roof has 10 solar panels that power the computer lab. Write a program that:

1. Stores `sunnyHours = 6`, `panelsWorking = 9` and `totalPanels = 10`.
2. Uses `when` with ranges to label the day: 0 to 2 hours `Cloudy day`, 3 to 6 `Fair day`, more `Bright day`.
3. Uses an `if` expression to store either `All panels OK` or how many panels need cleaning.
4. Stores `labOpen`: true when there are at least 4 sunny hours **and** at least 8 panels working.
5. Prints the label, the panel note, and whether the lab runs on solar power today.

<details>
<summary>Show one possible answer</summary>

```kotlin
fun main() {
    val sunnyHours = 6
    val panelsWorking = 9
    val totalPanels = 10

    // 1. Weather label with when and ranges
    val weather = when (sunnyHours) {
        in 0..2 -> "Cloudy day"
        in 3..6 -> "Fair day"
        else -> "Bright day"
    }

    // 2. All panels working? (if as an expression)
    val panelNote = if (panelsWorking == totalPanels) "All panels OK"
                    else "${totalPanels - panelsWorking} panel(s) need cleaning"

    // 3. Enough energy for the computer lab?
    val labOpen = sunnyHours >= 4 && panelsWorking >= 8

    println(weather)
    println(panelNote)
    if (labOpen) {
        println("Computer lab runs on solar power today.")
    } else {
        println("Computer lab uses the main supply today.")
    }
}
```

Output:

```text
Fair day
1 panel(s) need cleaning
Computer lab runs on solar power today.
```

</details>
