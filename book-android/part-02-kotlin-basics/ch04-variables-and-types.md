# Chapter 4: Variables and Types

## 🌟 Real-Life Story

In the school library, every book sits in a labelled box on a shelf. Some labels never change, like "Science A3". Other boxes are refilled every day, like the "Returned today" box. A program works the same way. It keeps each piece of information in a labelled box called a **variable**. Some boxes are sealed forever, and some can be refilled. In this chapter you will learn to make both kinds in Kotlin, the language of modern Android apps.

## 🎯 What You Will Learn

- Create variables with `val` (cannot change) and `var` (can change).
- Recognise the five everyday types: `Int`, `Double`, `Boolean`, `String` and `Char`.
- Put values inside text with string templates (`$name` and `${...}`).
- Do arithmetic, including whole-number division and the remainder `%`.
- Convert between types with `toInt()`, `toDouble()` and `toString()`.

## Running Kotlin Without a Phone

Chapters 4 to 8 teach the Kotlin language itself. Every example is a small program that starts at `fun main()` and prints text. You do not need a phone or an emulator for these.

You can run them in two places:

- **In a browser:** open **play.kotlinlang.org**, delete the sample code, paste the program and press **Run**. The output appears under the code. This is the official Kotlin Playground.
- **In Android Studio:** later chapters run real apps. For now the Playground is quicker.

Here is the smallest useful program:

```kotlin
fun main() {
    // A comment: Kotlin ignores this line.
    println("Welcome to the School Library!")
    println("Today we learn Kotlin.")
}
```

Output:

```text
Welcome to the School Library!
Today we learn Kotlin.
```

What each part means:

| Part | Meaning |
|---|---|
| `fun main()` | The starting point. Kotlin runs the code inside `{ }` from top to bottom. |
| `println(...)` | "Print line": shows the value, then moves to a new line. |
| `"..."` | Text inside double quotes is a **String**. |
| `// ...` | A **comment**: a note for humans. Kotlin skips it. |

You can also write a longer comment over many lines between `/*` and `*/`. Use comments to explain *why* the code does something, not to repeat what it obviously does.

## val and var: Sealed Boxes and Refillable Boxes

A **variable** is a name that holds a value. Kotlin has two keywords to make one:

- `val` (short for *value*): the box is sealed. Once you put something in, it cannot be replaced.
- `var` (short for *variable*): the box can be refilled with a new value later.

If you finished the JavaScript book, `val` is like `const` and `var` is like `let`.

```kotlin
fun main() {
    val schoolName = "Al-Noor School"   // val: never changes
    var booksOnDesk = 3                  // var: can change

    println(schoolName)
    println(booksOnDesk)

    booksOnDesk = 5                      // allowed, it is a var
    println(booksOnDesk)
}
```

Output:

```text
Al-Noor School
3
5
```

```text
 val schoolName        var booksOnDesk
 +----------------+    +--------------+
 | Al-Noor School |    | 3  ->  5     |
 +----------------+    +--------------+
   sealed forever        can be refilled
```

**The rule in this book: use `val` by default.** Switch to `var` only when the value really must change, such as a counter. Fewer changing boxes means fewer surprises, and Android code is easier to read that way.

### Naming variables

- Start with a small letter and join words with capital letters: `booksOnDesk`, `studentName`. This style is called **camelCase**.
- Choose names that say what the box holds. `pagesLeft` is better than `p`.
- Names cannot contain spaces and cannot be Kotlin keywords such as `val` or `fun`.

## Types: What Kind of Value Is in the Box?

Every value in Kotlin has a **type**. The type tells Kotlin what kind of value it is and what you can do with it. You can add two numbers, but you cannot add a number to `true`.

| Type | Holds | Examples |
|---|---|---|
| `Int` | whole numbers | `240`, `-5`, `0` |
| `Double` | numbers with a decimal point | `350.5`, `9.81` |
| `Boolean` | only `true` or `false` | `true` |
| `String` | text in double quotes | `"Our Solar System"` |
| `Char` | one single character in single quotes | `'A'`, `'7'` |

```kotlin
fun main() {
    val pages = 240            // Int
    val price = 350.50         // Double
    val isAvailable = true     // Boolean
    val title = "Our Solar System" // String
    val shelfLetter = 'A'      // Char

    val totalPages: Int = 240  // same as above, type written out

    println(pages)
    println(price)
    println(isAvailable)
    println(title)
    println(shelfLetter)
    println(totalPages)
}
```

Output:

```text
240
350.5
true
Our Solar System
A
240
```

Notice that `350.50` printed as `350.5`. The value is the same; Kotlin just drops the extra zero.

### Type inference: Kotlin works out the type

In `val pages = 240` we never wrote `Int`. Kotlin looked at `240` and decided the type itself. This is called **type inference** (inferring means working something out from clues).

You may still write the type after a colon, as in `val totalPages: Int = 240`. Both lines do exactly the same thing. Most Kotlin code leaves the type out when it is obvious, and writes it when it helps a reader.

Once a box has a type, it keeps it. A `var` that holds an `Int` can get a new `Int`, but never a `String`. You will see that error in the Common Mistake section.

## String Templates: Putting Values Inside Text

To build a sentence from variables, put a `$` in front of the variable name inside the string. For anything more than a plain name, such as a sum, use `${ ... }`.

```kotlin
fun main() {
    val name = "Amina"
    val booksRead = 7
    val goal = 10

    println("Hello, $name!")
    println("$name has read $booksRead books.")
    println("Books still to read: ${goal - booksRead}")
    println("Your name has ${name.length} letters.")
}
```

Output:

```text
Hello, Amina!
Amina has read 7 books.
Books still to read: 3
Your name has 5 letters.
```

`name.length` asks the String how many characters it has. The dot `.` means "ask this value for something it knows". You will use dots a lot.

| You write | Kotlin shows |
|---|---|
| `"$name"` | `Amina` |
| `"${goal - booksRead}"` | `3` |
| `"${name.length}"` | `5` |

This is the same idea as a template literal with backticks in JavaScript, but in Kotlin it works in normal double quotes.

## Arithmetic

Kotlin uses the usual symbols: `+` add, `-` subtract, `*` multiply, `/` divide and `%` remainder.

```kotlin
fun main() {
    println(7 + 3)
    println(7 - 3)
    println(7 * 3)
    println(7 / 3)      // Int / Int: whole number only
    println(7 % 3)      // remainder
    println(7.0 / 3)    // a Double joins in: decimal answer
    println(7 / 2.0)
}
```

Output:

```text
10
4
21
2
1
2.3333333333333335
3.5
```

### Integer division: the surprise

When **both** numbers are `Int`, the answer is also an `Int`. Kotlin simply drops the part after the decimal point. So `7 / 3` is `2`, not `2.33`. This is called **integer division**.

If at least one number is a `Double` (like `7.0`), the answer is a `Double` with decimals.

The last digit of `2.3333333333333335` looks odd. Computers store decimals in binary, so tiny rounding errors appear. For school maths this does not matter.

### The remainder operator %

`%` gives what is **left over** after whole-number division. `7 % 3` is `1`, because 3 fits into 7 two times with 1 left over. Together, `/` and `%` answer real questions:

```kotlin
fun main() {
    val students = 29
    val perTable = 4

    val fullTables = students / perTable
    val leftOver = students % perTable

    println("Full tables: $fullTables")
    println("Students left over: $leftOver")
}
```

Output:

```text
Full tables: 7
Students left over: 1
```

```text
29 students, 4 per table
[4][4][4][4][4][4][4]  [1]
 7 full tables        1 left
```

A common use of `%`: a number is even when `number % 2` is `0`.

### Changing a var with arithmetic

To add to a `var`, you can write `count = count + 1`. Kotlin also has short forms:

| Long form | Short form |
|---|---|
| `count = count + 1` | `count += 1` or `count++` |
| `count = count - 2` | `count -= 2` |
| `total = total * 3` | `total *= 3` |

## Converting Between Types

Sometimes you have a value of one type and need another. Text typed into an app always arrives as a `String`, even when it looks like a number. Kotlin never converts silently, so you ask for it with a function that starts with `to`.

```kotlin
fun main() {
    val typed = "12"             // text, e.g. from a form
    val copies = typed.toInt()   // now a real number
    println(copies + 3)

    val pages = 240
    val pagesText = pages.toString()
    println(pagesText + " pages")

    val half = pages.toDouble() / 7
    println(half)
    println(half.toInt())        // cuts off the decimals
}
```

Output:

```text
15
240 pages
34.285714285714285
34
```

| Function | Turns | Into | Example |
|---|---|---|---|
| `toInt()` | `"12"` or `34.28` | `Int` | `12`, `34` |
| `toDouble()` | `240` | `Double` | `240.0` |
| `toString()` | `240` | `String` | `"240"` |

Note: `toInt()` on a `Double` cuts off the decimals. It does not round. `34.9.toInt()` is `34`.

### A preview: toIntOrNull()

What if the text is not a number, like `"twelve"`? `toInt()` crashes the program with a `NumberFormatException`. In an app, a crash means the app closes in front of the user.

Kotlin offers a safer version, `toIntOrNull()`. It gives back the number, or the special value `null` (meaning "nothing here") when the text is not a number:

```kotlin
fun main() {
    println("12".toIntOrNull())
    println("twelve".toIntOrNull())
}
```

Output:

```text
12
null
```

You will learn how to handle `null` safely in Chapter 8. For now, remember that it exists and that it is the polite way to read numbers that people type.

## 🔮 Predict the Output

Before you run it, write down what you think this prints:

```kotlin
fun main() {
    val boxes = 10 / 4
    val left = 10 % 4
    println("$boxes boxes, $left left")
}
```

<details>
<summary>Show answer</summary>

```text
2 boxes, 2 left
```

`10 / 4` uses two `Int` values, so the answer is the whole number `2`. Four fits into ten twice, with `2` left over.

</details>

## ⚠️ Common Mistake

**Mistake 1: trying to change a `val`.**

```kotlin
fun main() {
    val booksOnDesk = 3
    booksOnDesk = 5
    println(booksOnDesk)
}
```

The program does not run. Kotlin shows this error (Android Studio underlines the line in red):

```text
error: 'val' cannot be reassigned.
```

Fix: if the value truly needs to change, make it a `var`:

```kotlin
var booksOnDesk = 3
booksOnDesk = 5
```

**Mistake 2: putting the wrong type in a box.**

```kotlin
fun main() {
    var pages = 240
    pages = "three hundred"
}
```

```text
error: assignment type mismatch: actual type is 'kotlin.String', but 'kotlin.Int' was expected.
```

`pages` was born an `Int`, so it can only ever hold whole numbers. Fix: write `pages = 300`. These errors appear before the program runs, which is a gift: Kotlin catches the bug before any user sees it.

## ✍️ Try It

Open play.kotlinlang.org and write a program about yourself as a library member:

1. A `val` for your first name and a `val` for your grade.
2. A `var` for books borrowed this term. Print it, add 1 with `+=`, and print it again.
3. One `println` that uses a string template to say: `Sara (Grade 9) has borrowed 4 books.`

**Hint:** use `$name` for plain variables and `${...}` for anything with a dot or a sum.

## 📝 Recap

- `val` makes a variable that cannot change; `var` makes one that can. Use `val` unless you need to change it.
- The everyday types are `Int`, `Double`, `Boolean`, `String` and `Char`. Kotlin usually infers the type for you.
- String templates put values into text: `"$name"` and `"${a + b}"`.
- `Int / Int` gives a whole number; `%` gives the remainder. Use a `Double` to get decimals.
- Convert with `toInt()`, `toDouble()` and `toString()`. `toIntOrNull()` gives `null` instead of crashing.

## 📖 Key Terms

- **Variable:** a named box that holds a value.
- **Type:** the kind of value, such as `Int` or `String`.
- **Type inference:** Kotlin working out the type from the value.
- **String template:** a string with `$` placeholders that are filled with values.
- **Integer division:** dividing two whole numbers and keeping only the whole part.

## 🏆 Practice

### 🟢 Level 1: Recall
1. What is the difference between `val` and `var`? Which one should you use by default?
2. What do these lines print? `println(17 / 5)`, `println(17 % 5)` and `println(17.0 / 5)`.

<details>
<summary>Show answer</summary>

1. A `val` cannot be given a new value after it is set. A `var` can. Use `val` by default, and `var` only when the value must change.
2. The program

```kotlin
fun main() {
    println(17 / 5)
    println(17 % 5)
    println(17.0 / 5)
}
```

prints:

```text
3
2
3.4
```

Two `Int` values give the whole number `3`. Five fits into 17 three times with `2` left over. With `17.0` the answer is a `Double`.

</details>

### 🟡 Level 2: Apply
The school's charity drive collected **125** water bottles for a village clinic. Each box holds **12** bottles. Write a program that prints how many full boxes there are and how many bottles are left over, using `val`, `/`, `%` and string templates.

<details>
<summary>Show answer</summary>

```kotlin
fun main() {
    val bottles = 125
    val perBox = 12

    val fullBoxes = bottles / perBox
    val leftOver = bottles % perBox

    println("Water bottles collected: $bottles")
    println("Full boxes: $fullBoxes")
    println("Bottles left over: $leftOver")
}
```

Output:

```text
Water bottles collected: 125
Full boxes: 10
Bottles left over: 5
```

</details>

### 🔴 Level 3: Challenge
Build a reading log for one student:

1. Store the student's name, grade, book title and the book's total pages (186) in `val`s.
2. Store pages read so far (120) in a `var`. The student reads 30 more pages today: update it.
3. Store the number of days spent reading (8).
4. Print the pages read, the pages left, the average pages per day **with decimals**, and the average as a whole number.

<details>
<summary>Show one possible answer</summary>

```kotlin
fun main() {
    // Reading log for one student
    val name = "Bilal"
    val grade = 9
    val bookTitle = "Clean Water for Every Village"
    val totalPages = 186
    val days = 8
    var pagesRead = 120

    pagesRead = pagesRead + 30   // he read 30 more today

    val pagesLeft = totalPages - pagesRead
    val perDay = pagesRead.toDouble() / days

    println("Reader: $name (Grade $grade)")
    println("Book: $bookTitle")
    println("Pages read: $pagesRead of $totalPages")
    println("Pages left: $pagesLeft")
    println("Average per day: $perDay")
    println("Whole pages per day: ${perDay.toInt()}")
}
```

Output:

```text
Reader: Bilal (Grade 9)
Book: Clean Water for Every Village
Pages read: 150 of 186
Pages left: 36
Average per day: 18.75
Whole pages per day: 18
```

`pagesRead.toDouble()` makes the division keep its decimals. Without it, `150 / 8` would give `18`.

</details>
