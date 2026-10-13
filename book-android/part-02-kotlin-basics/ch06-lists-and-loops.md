# Chapter 6: Lists and Loops 🔁

## 🌟 Real-Life Story

On Monday morning the class monitor takes the register. She does not write a separate rule for every student. She holds **one list** of names and goes down it, **one name at a time**, doing the same thing for each: read the name, wait for "present", tick the box. A list plus "do this for each item" is one of the most useful ideas in programming. Your School Library app will hold a list of books, and the screen will show each one in turn. In this chapter you learn the Kotlin behind that: lists and loops.

## 🎯 What You Will Learn

- Create read-only lists with `listOf` and changeable lists with `mutableListOf`.
- Read items by index, and use `size`, `add` and `remove`.
- Repeat code for every item with a `for` loop.
- Count with ranges: `1..5`, `until`, `step` and `downTo`.
- Repeat while a condition is true with `while`, and total, count and find the biggest item.

## 📚 Lists: Many Values in One Box

So far each variable held one value. A **list** holds many values in order, inside one variable. If you finished the JavaScript book, a Kotlin list is like a JavaScript array.

```kotlin
fun main() {
    val subjects = listOf("Maths", "Science", "Computing", "Urdu")

    println(subjects)
    println(subjects.size)
    println(subjects[0])
    println(subjects[2])
    println(subjects.last())
    println("Science" in subjects)
}
```

Output:

```text
[Maths, Science, Computing, Urdu]
4
Maths
Computing
Urdu
true
```

### Index: the position number

Every item has a position number called an **index**. Counting starts at **0**, not 1.

```text
 index:   0        1          2       3
       +-------+---------+-----------+------+
       | Maths | Science | Computing | Urdu |
       +-------+---------+-----------+------+
 size = 4      last index = size - 1 = 3
```

| Code | Meaning | Result |
|---|---|---|
| `subjects[0]` | the first item | `Maths` |
| `subjects[2]` | the third item | `Computing` |
| `subjects.size` | how many items | `4` |
| `subjects.last()` | the last item | `Urdu` |
| `"Science" in subjects` | is it in the list? | `true` |

`in` is the same word you used with ranges in Chapter 5. It asks "is this inside?".

### Lists know their type

`listOf("Maths", "Science")` is a list of `String`. Kotlin writes this type as `List<String>`: the type inside the angle brackets `< >` says what the list holds. A list of whole numbers is `List<Int>`. A `List<String>` can never contain an `Int` by accident.

## ✏️ mutableListOf: A List You Can Change

A list made with `listOf` is **read-only**: you cannot add or remove items. That is safe, and it is what you will use most. When the list must change, such as a student's reading list, use `mutableListOf`. (Mutable means "can be changed".)

```kotlin
fun main() {
    val readingList = mutableListOf("Our Solar System", "Gardens of the World")
    println(readingList)

    readingList.add("Kind Words, Strong Hearts")
    println(readingList)

    readingList.remove("Our Solar System")
    println(readingList)

    readingList[0] = "Clean Water for Every Village"
    println(readingList)
    println("Books on my list: ${readingList.size}")
}
```

Output:

```text
[Our Solar System, Gardens of the World]
[Our Solar System, Gardens of the World, Kind Words, Strong Hearts]
[Gardens of the World, Kind Words, Strong Hearts]
[Clean Water for Every Village, Kind Words, Strong Hearts]
Books on my list: 2
```

Careful when reading the output: "Kind Words, Strong Hearts" is **one** title that happens to contain a comma. The size proves it: 2 books at the end.

| Action | Code |
|---|---|
| add to the end | `list.add(item)` |
| remove an item by value | `list.remove(item)` |
| replace the item at an index | `list[0] = newItem` |
| remove everything | `list.clear()` |

Notice that `readingList` is a `val`, yet we changed its contents. The `val` only means the variable always points to **the same list**. The list itself can still gain and lose items, just as a sealed library box can have books put in and taken out of it while the label stays the same.

To start with an empty mutable list, tell Kotlin the type, because there are no items to infer it from: `mutableListOf<Int>()`.

## 🔁 The for Loop: Do It for Every Item

A **loop** repeats code. The `for` loop takes each item of a list in turn, gives it a name, and runs the block once for it.

```kotlin
fun main() {
    val donations = listOf(250, 400, 150, 300)
    var total = 0

    for (amount in donations) {
        println("Received $amount")
        total += amount
    }
    println("Total for the clinic: $total")
}
```

Output:

```text
Received 250
Received 400
Received 150
Received 300
Total for the clinic: 1100
```

Read `for (amount in donations)` as: "for each `amount` in `donations`, do this". The name `amount` is new; you choose it, and it only exists inside the loop's `{ }`. Each time round the loop, it holds the next item.

```text
round 1: amount = 250   total = 250
round 2: amount = 400   total = 650
round 3: amount = 150   total = 800
round 4: amount = 300   total = 1100
```

The variable `total` is made **before** the loop, as a `var`, so it can grow and still exist after the loop ends. This "running total" pattern is used everywhere.

## 🔢 Loops with Ranges

You met ranges like `90..100` in Chapter 5. A `for` loop can walk through a range of numbers too. The examples below use `print`, which works like `println` but does **not** move to a new line. An empty `println()` then ends the line.

```kotlin
fun main() {
    for (n in 1..5) {
        print("$n ")
    }
    println()

    for (n in 0 until 5) {
        print("$n ")
    }
    println()

    for (n in 0..20 step 5) {
        print("$n ")
    }
    println()

    for (n in 5 downTo 1) {
        print("$n ")
    }
    println("Lift off!")
}
```

Output:

```text
1 2 3 4 5 
0 1 2 3 4 
0 5 10 15 20 
5 4 3 2 1 Lift off!
```

| Range | Numbers | Remember |
|---|---|---|
| `1..5` | 1 2 3 4 5 | includes both ends |
| `0 until 5` | 0 1 2 3 4 | stops **before** 5 |
| `0..20 step 5` | 0 5 10 15 20 | jumps by 5 |
| `5 downTo 1` | 5 4 3 2 1 | counts backwards |

### Looping with an index

`0 until list.size` gives exactly the valid indexes of a list. That is useful when you need the position number as well as the item, for example to number seats:

```kotlin
fun main() {
    val students = listOf("Amina", "Bilal", "Maryam")

    for (i in 0 until students.size) {
        println("Seat ${i + 1}: ${students[i]}")
    }
}
```

Output:

```text
Seat 1: Amina
Seat 2: Bilal
Seat 3: Maryam
```

We print `i + 1` because people count from 1, while indexes count from 0. When you only need the items, prefer the simpler `for (name in students)`.

## ⏳ The while Loop: Repeat While Something Is True

Sometimes you do not know in advance how many rounds you need. A `while` loop keeps going **as long as** its condition is true, and checks it before every round.

```kotlin
fun main() {
    var litresInTank = 50
    var day = 0

    while (litresInTank > 0) {
        day++
        litresInTank -= 12
        println("Day $day: watered the garden")
    }
    println("Tank empty after $day days. Time to refill.")
}
```

Output:

```text
Day 1: watered the garden
Day 2: watered the garden
Day 3: watered the garden
Day 4: watered the garden
Day 5: watered the garden
Tank empty after 5 days. Time to refill.
```

After 4 days 2 litres were left, so day 5 still ran; then the tank went below zero and the loop stopped.

Something inside a `while` loop **must** change the condition. If `litresInTank` never went down, the loop would run forever and the program would freeze. Use `for` when you know the items or the count; use `while` when you wait for something to happen.

## 🧮 Three Patterns You Will Use Again and Again

Most list work is one of three jobs: **keep** some items, **count** some items, or **find** the best item. Here are all three, with a loop:

```kotlin
fun main() {
    val marks = listOf(72, 45, 91, 58, 38, 84)

    val passed = mutableListOf<Int>()
    var needHelp = 0

    for (m in marks) {
        if (m >= 50) {
            passed.add(m)
        } else {
            needHelp++
        }
    }
    println("Passed: $passed")
    println("Students who need extra help: $needHelp")

    var highest = marks[0]
    for (m in marks) {
        if (m > highest) {
            highest = m
        }
    }
    println("Highest mark: $highest")
}
```

Output:

```text
Passed: [72, 91, 58, 84]
Students who need extra help: 2
Highest mark: 91
```

To find the highest, we start by assuming the first mark is the highest, then replace it whenever a bigger one comes along.

### A quick preview: the short way

Kotlin lists also have ready-made helpers for these jobs. They use curly braces `{ }` in a new way, called a **lambda**. **You will understand `{ }` fully in Chapter 7**; for now, just read `it` as "each item".

```kotlin
fun main() {
    val marks = listOf(72, 45, 91, 58, 38, 84)

    val passed = marks.filter { it >= 50 }
    val bonus = marks.map { it + 5 }
    val needHelp = marks.count { it < 50 }

    println(passed)
    println(bonus)
    println(needHelp)
    println(marks.sum())
    println(marks.max())
}
```

Output:

```text
[72, 91, 58, 84]
[77, 50, 96, 63, 43, 89]
2
388
91
```

| Helper | Loop job it replaces |
|---|---|
| `filter { it >= 50 }` | keep the items that pass a test |
| `map { it + 5 }` | make a new list by changing each item |
| `count { it < 50 }` | count the items that pass a test |
| `sum()` / `max()` | running total / find the biggest |

Both ways give the same answers. In this book, practise the loops first: they show you what is really happening.

## ⚠️ Common Mistake

**Mistake 1: using an index that does not exist.** A list of 4 items has indexes 0 to 3.

```kotlin
fun main() {
    val subjects = listOf("Maths", "Science", "Computing", "Urdu")
    println(subjects[4])
}
```

This compiles, but **crashes** when it runs:

```text
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 4 out of bounds for length 4
```

(The exact name of the error can differ slightly, but it always says "out of bounds".) In an app this closes the app. Fix: the last item is `subjects[subjects.size - 1]` or `subjects.last()`, and loops should use `0 until subjects.size`, never `0..subjects.size`.

**Mistake 2: adding to a read-only list.**

```kotlin
fun main() {
    val subjects = listOf("Maths", "Science")
    subjects.add("Computing")
}
```

```text
error: unresolved reference 'add'.
```

"Unresolved reference" means Kotlin cannot find anything called `add` for this value. A `listOf` list has no `add`. Fix: create it with `mutableListOf("Maths", "Science")`.

## ✍️ Try It

Make a packing list for a science trip to the planetarium:

1. Create a `mutableListOf` with `"Notebook"`, `"Pencil"` and `"Water bottle"`.
2. Add `"Packed lunch"` and remove `"Pencil"` (you are taking a pen instead, so add `"Pen"` too).
3. Use a `for` loop with `0 until list.size` to print a numbered list.
4. Print how many items you are taking.

**Hint:** printing `i + 1` gives numbers that start from 1.

## 📝 Recap

- `listOf(...)` makes a read-only list; `mutableListOf(...)` makes one you can `add` to and `remove` from.
- Indexes start at 0. The last index is `size - 1`.
- `for (item in list)` runs the block once for every item.
- Ranges for loops: `1..5` (both ends), `0 until 5` (stops before 5), `step`, `downTo`.
- `while` repeats while a condition is true; something inside must change it.
- Keep, count and find-the-biggest are the three loop patterns; `filter`, `count` and `max` are short forms.

## 📖 Key Terms

- **List:** an ordered group of values in one variable.
- **Index:** the position of an item, starting from 0.
- **Mutable:** can be changed after it is made.
- **Loop:** code that repeats.
- **Running total:** a `var` that adds up values inside a loop.

## 🏆 Practice

### 🟢 Level 1: Recall
What does this program print?

```kotlin
fun main() {
    for (n in 2..10 step 2) {
        print("$n ")
    }
    println()
    for (n in 10 downTo 7) {
        print("$n ")
    }
    println()
    for (n in 0 until 3) {
        print("$n ")
    }
    println()
}
```

<details>
<summary>Show answer</summary>

```text
2 4 6 8 10 
10 9 8 7 
0 1 2 
```

`step 2` jumps by two; `downTo` counts backwards and includes 7; `until 3` stops before 3.

</details>

### 🟡 Level 2: Apply
Today's timetable is `Maths`, `Science`, `English`, `Computing`. English is cancelled and `Islamic Studies` is added at the end. Write a program that makes the changes and prints a numbered timetable with a heading that shows how many lessons there are.

<details>
<summary>Show answer</summary>

```kotlin
fun main() {
    val timetable = mutableListOf("Maths", "Science", "English", "Computing")

    timetable.add("Islamic Studies")
    timetable.remove("English")

    println("Today's lessons (${timetable.size}):")
    for (i in 0 until timetable.size) {
        println("${i + 1}. ${timetable[i]}")
    }
}
```

Output:

```text
Today's lessons (4):
1. Maths
2. Science
3. Computing
4. Islamic Studies
```

</details>

### 🔴 Level 3: Challenge
Build a weekly water-saving log for your home:

1. Store the litres used each day: `180, 140, 165, 120, 150, 210, 130`.
2. Use **one** `for` loop to work out the total, the number of days above 150 litres, and the lowest day.
3. After the loop, work out the average per day with decimals.
4. Print all four results.

<details>
<summary>Show one possible answer</summary>

```kotlin
fun main() {
    // Litres of water our home used each day this week
    val litres = listOf(180, 140, 165, 120, 150, 210, 130)

    var total = 0
    var highDays = 0
    var bestDay = litres[0]

    for (amount in litres) {
        total += amount
        if (amount > 150) {
            highDays++
        }
        if (amount < bestDay) {
            bestDay = amount
        }
    }

    val average = total.toDouble() / litres.size

    println("Total this week: $total litres")
    println("Average per day: $average litres")
    println("Days above 150 litres: $highDays")
    println("Best (lowest) day: $bestDay litres")
}
```

Output:

```text
Total this week: 1095 litres
Average per day: 156.42857142857142 litres
Days above 150 litres: 3
Best (lowest) day: 120 litres
```

150 is not *above* 150, so that day is not counted. `toDouble()` keeps the decimals in the average.

</details>
