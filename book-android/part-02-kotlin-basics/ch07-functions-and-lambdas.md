# Chapter 7: Functions and Lambdas 🧩

## 🌟 Real-Life Story

The school bakery club makes the same date biscuits every Friday. They do not rewrite the recipe each week. The recipe card has a name, "Date Biscuits", and it asks for a few **ingredients**: how many trays, which flour. Anyone can pick up the card, give it the ingredients, and get biscuits back. A **function** is a recipe card for code: a named set of steps that takes some inputs and can hand back a result. In this chapter you will also meet **lambdas**: small recipe cards with no name, that you can pass to someone else to use. Every button in your Android app will use one.

## 🎯 What You Will Learn

- Write functions with `fun`, parameters and a return type.
- Use default arguments and named arguments.
- Shorten small functions into single-expression functions with `=`.
- Write lambdas such as `{ x -> x + 5 }` and use the short name `it`.
- Pass a lambda to a function, read trailing lambda syntax, and use `filter`, `map` and `forEach`.

## 🍪 Your First Functions

You have already written one function in every program: `main`. Now you will write your own. A function is made with the keyword `fun`, a name, round brackets and a block of code.

```kotlin
fun greetReader(name: String) {
    println("Assalamu alaikum, $name! Welcome to the library.")
}

fun main() {
    greetReader("Amina")
    greetReader("Omar")
}
```

Output:

```text
Assalamu alaikum, Amina! Welcome to the library.
Assalamu alaikum, Omar! Welcome to the library.
```

- `name: String` is a **parameter**: an input box that the function needs. Its type is written after a colon, and here it is **required** (Kotlin cannot infer it).
- `"Amina"` is an **argument**: the actual value you put in the box when you **call** (run) the function.
- The program still starts at `main`. `greetReader` only runs when `main` calls it.

Writing the steps once and calling them many times means fewer mistakes. If the welcome message changes, you fix it in one place.

## ↩️ Returning a Value

Many functions work something out and **return** (hand back) a result. Write the result's type after the brackets, and use `return` to send the value back.

```kotlin
fun area(width: Int, height: Int): Int {
    val result = width * height
    return result
}

fun isPass(marks: Int): Boolean {
    return marks >= 50
}

fun main() {
    val garden = area(6, 4)
    println("Garden area: $garden square metres")
    println(isPass(72))
    println(isPass(38))
}
```

Output:

```text
Garden area: 24 square metres
true
false
```

```text
            +---------------------+
 6, 4  ---> | fun area(w, h): Int | ---> 24
 inputs     |   return w * h      |    result
            +---------------------+
```

The anatomy of a function header:

```text
fun  area  (width: Int, height: Int)  : Int
 |    |     \_______parameters______/   |
 |   name                         return type
keyword
```

`greetReader` had no return type. A function that returns nothing useful has the type `Unit`, and you can leave it out. `Unit` is Kotlin's word for "no value worth keeping".

## 🎛️ Default and Named Arguments

A parameter can have a **default value**, written with `=`. If the caller leaves that argument out, the default is used. You can also name arguments when you call, so their order no longer matters.

```kotlin
fun makeLabel(title: String, shelf: String = "Not shelved yet", copies: Int = 1): String {
    return "$title | $shelf | copies: $copies"
}

fun main() {
    println(makeLabel("Our Solar System", "Science A3", 2))
    println(makeLabel("Gardens of the World", "Nature E1"))
    println(makeLabel("Kotlin for Young Builders"))
    println(makeLabel("Kind Words, Strong Hearts", copies = 3))
    println(makeLabel(copies = 4, title = "Clean Water for Every Village", shelf = "Geography B1"))
}
```

Output:

```text
Our Solar System | Science A3 | copies: 2
Gardens of the World | Nature E1 | copies: 1
Kotlin for Young Builders | Not shelved yet | copies: 1
Kind Words, Strong Hearts | Not shelved yet | copies: 3
Clean Water for Every Village | Geography B1 | copies: 4
```

Look at the fourth call. We wanted the default shelf but 3 copies. Naming the argument, `copies = 3`, lets us skip `shelf`.

This matters a lot for Android. Jetpack Compose functions have many parameters with defaults, and you set only the ones you need by name, for example `Text(text = "Hello", fontSize = 20.sp)`. You will see `modifier = ...` and `onClick = ...` on almost every screen.

## ✂️ Single-Expression Functions

When a function only returns one expression, you can drop the braces and `return`, and write `=` instead:

```kotlin
fun double(n: Int): Int = n * 2

fun grade(marks: Int): String = when (marks) {
    in 90..100 -> "A"
    in 80..89 -> "B"
    else -> "Keep going"
}

fun main() {
    println(double(21))
    println(grade(93))
    println(grade(61))
}
```

Output:

```text
42
A
Keep going
```

`fun double(n: Int): Int = n * 2` means exactly the same as the longer form with `{ return n * 2 }`. Because `when` and `if` are expressions (Chapter 5), they fit after `=` too. Use the short form for small, clear functions; use the block form when there are several steps.

## 🎈 Lambdas: Functions Without a Name

A **lambda** is a small function written straight into your code, without `fun` and without a name. It lives inside curly braces. The parameters come first, then an arrow `->`, then the body. The value of the **last line** is the result; there is no `return`.

```kotlin
fun main() {
    val addFive = { x: Int -> x + 5 }
    val shout = { word: String -> word.uppercase() + "!" }
    val add = { a: Int, b: Int -> a + b }

    println(addFive(10))
    println(shout("save"))
    println(add(3, 4))
}
```

Output:

```text
15
SAVE!
7
```

```text
{  x: Int   ->   x + 5  }
   \_____/  |    \___/
   input  arrow  result
```

Because a lambda is a value, you can store it in a `val` and call it with brackets, just like a function. (`uppercase()` is a String function that turns all letters into capitals.) If you know JavaScript, `{ x -> x + 5 }` is like the arrow function `x => x + 5`.

### The type of a lambda, and `it`

A lambda has a **function type** that describes its inputs and its result: `(Int) -> Boolean` means "takes one `Int`, gives back a `Boolean`". `() -> Unit` means "takes nothing, gives back nothing useful".

When a lambda has **exactly one** parameter, you may skip naming it. Kotlin then calls it `it`:

```kotlin
fun main() {
    val isEven: (Int) -> Boolean = { it % 2 == 0 }
    val sayHello: () -> Unit = { println("Hello from a lambda") }

    println(isEven(8))
    println(isEven(7))
    sayHello()
}
```

Output:

```text
true
false
Hello from a lambda
```

| Lambda | Type | Meaning |
|---|---|---|
| `{ x: Int -> x + 5 }` | `(Int) -> Int` | one input, named `x` |
| `{ it % 2 == 0 }` | `(Int) -> Boolean` | one input, called `it` |
| `{ a: Int, b: Int -> a + b }` | `(Int, Int) -> Int` | two inputs: `it` not allowed |
| `{ println("Hi") }` | `() -> Unit` | no input at all |

This is the `{ it >= 50 }` you saw as a preview in Chapter 6. Now you know: it is a lambda with one input.

## 📨 Passing a Lambda to a Function

The real power of lambdas: you can give one to a function as an argument. The function decides **when** to run it. Here `repeatTask` asks for a parameter `task` whose type is a function type:

```kotlin
fun repeatTask(times: Int, task: (Int) -> Unit) {
    for (n in 1..times) {
        task(n)
    }
}

fun main() {
    repeatTask(3, { n -> println("Water the plants: round $n") })
}
```

Output:

```text
Water the plants: round 1
Water the plants: round 2
Water the plants: round 3
```

`repeatTask` knows how to repeat; the lambda says **what** to do each time. A function that takes another function as a parameter is called a **higher-order function**.

## 🚂 Trailing Lambda Syntax (Read This Carefully)

Kotlin has one special rule that makes lambda code much cleaner:

> If the **last** parameter of a function is a function type, you may write the lambda **after** the closing round bracket.

This is called a **trailing lambda**. If the lambda is the **only** argument, you can drop the empty round brackets too. All three calls below follow this rule:

```kotlin
fun repeatTask(times: Int, task: (Int) -> Unit) {
    for (n in 1..times) {
        task(n)
    }
}

fun announce(onDone: () -> Unit) {
    println("Checking the shelves...")
    onDone()
}

fun main() {
    // 1. Lambda inside the brackets
    repeatTask(2, { n -> println("Round $n") })

    // 2. Trailing lambda: moved outside the brackets
    repeatTask(2) { n ->
        println("Round $n")
    }

    // 3. The lambda is the only argument: no brackets at all
    announce {
        println("All books are in order.")
    }
}
```

Output:

```text
Round 1
Round 2
Round 1
Round 2
Checking the shelves...
All books are in order.
```

Calls 1 and 2 are **exactly the same call**, written two ways.

```text
repeatTask(2, { n -> println(n) })
              \__________________/
                 move it outside
                        |
                        v
repeatTask(2) { n -> println(n) }
```

### Why this matters for Android

Jetpack Compose is built on this rule. In Chapter 11 you will write a button like this:

```kotlin
Button(onClick = { saveBook() }) {
    Text("Save")
}
```

Read it with what you now know:

- `Button(...)` is a function call.
- `onClick = { saveBook() }` is a **named argument** whose value is a **lambda**. The button keeps it and runs it each time the user taps.
- `{ Text("Save") }` after the bracket is a **trailing lambda**. It is the button's last parameter, `content`: what to draw **inside** the button.

You cannot run Compose code here, but you can build a plain Kotlin copy with the same shape. These pretend `button` and `text` functions just print:

```kotlin
// Pretend versions of Button and Text, for plain Kotlin
fun button(onClick: () -> Unit, content: () -> Unit) {
    print("[ ")
    content()
    println(" ]")
    println("(the user taps the button)")
    onClick()
}

fun text(words: String) {
    print(words)
}

fun main() {
    button(onClick = { println("Book saved for later.") }) {
        text("Save")
    }
}
```

Output:

```text
[ Save ]
(the user taps the button)
Book saved for later.
```

Two lambdas, two jobs: `content` draws what is inside, `onClick` reacts to a tap. When Chapter 11 arrives, nothing about `Button` will be new.

## 🛠️ filter, map and forEach

Kotlin lists come with higher-order functions that take a lambda. They all use trailing lambda syntax, which is why you see no round brackets.

```kotlin
fun main() {
    val titles = listOf(
        "Our Solar System",
        "Clean Water for Every Village",
        "Kind Words, Strong Hearts",
        "Kotlin for Young Builders"
    )

    val shortTitles = titles.filter { it.length < 20 }
    val lengths = titles.map { title -> title.length }
    val kTitles = titles.count { it.startsWith("K") }

    println(shortTitles)
    println(lengths)
    println(kTitles)

    titles.forEach { println("- $it") }
}
```

Output:

```text
[Our Solar System]
[16, 29, 25, 25]
2
- Our Solar System
- Clean Water for Every Village
- Kind Words, Strong Hearts
- Kotlin for Young Builders
```

| Function | The lambda answers... | You get back |
|---|---|---|
| `filter { }` | "keep this item?" (`Boolean`) | a new, shorter list |
| `map { }` | "what should this item become?" | a new list, same length |
| `count { }` | "count this item?" (`Boolean`) | an `Int` |
| `forEach { }` | "what to do with this item?" | nothing (`Unit`) |

`forEach` is like a `for` loop written as a function call. `filter` and `map` never change the original list; they make a new one. In Chapter 12 you will use `filter` to make a search box: keep only the books whose title contains what the user typed.

## ⚠️ Common Mistake

**Mistake 1: a return type with no `return`.**

```kotlin
fun isPass(marks: Int): Boolean {
    marks >= 50
}
```

```text
error: missing return statement.
```

In a block body `{ }`, the last line is **not** returned automatically (that rule is only for lambdas). Fix: `return marks >= 50`, or use the short form `fun isPass(marks: Int): Boolean = marks >= 50`.

**Mistake 2: leaving out a required argument.**

```kotlin
fun area(width: Int, height: Int): Int = width * height

fun main() {
    println(area(6))
}
```

```text
error: no value passed for parameter 'height'.
```

`height` has no default, so it must be given: `area(6, 4)`. If a value is usually the same, give the parameter a default instead.

**Mistake 3: using `it` with two parameters.** `{ it + it }` works only when the lambda takes exactly one input. For two inputs, name them: `{ a, b -> a + b }`.

## ✍️ Try It

1. Write `fun stars(count: Int): String` that builds a String of that many `*` with a `for` loop, and print `stars(5)`.
2. Write `fun showBook(title: String, onOpen: () -> Unit)` that prints the title and then runs `onOpen`.
3. Call `showBook` with a **trailing lambda** that prints `Opening the book...`.

**Hint:** start with `var line = ""` and add `"*"` to it inside the loop.

## 📝 Recap

- `fun name(param: Type): ReturnType { ... return value }` makes a function. Parameters need types.
- Default values (`copies: Int = 1`) make arguments optional; named arguments (`copies = 3`) can skip and reorder them.
- A single-expression function uses `=` instead of `{ return ... }`.
- A lambda is a nameless function in braces: `{ x -> x + 5 }`. With one input you may use `it`. The last line is the result.
- A function can take a lambda as a parameter. If it is the last parameter, write it after the brackets: a trailing lambda.
- `Button(onClick = { }) { Text("Save") }` = a named lambda argument plus a trailing lambda.

## 📖 Key Terms

- **Function:** a named, reusable block of code.
- **Parameter / argument:** the input box in the definition / the value you put in it when calling.
- **Return value:** the result a function hands back.
- **Lambda:** a function with no name, written in `{ }`.
- **Higher-order function:** a function that takes (or returns) another function.
- **Trailing lambda:** a lambda written after the closing round bracket of a call.

## 🏆 Practice

### 🟢 Level 1: Recall
What does this program print?

```kotlin
fun welcome(name: String, place: String = "library"): String = "Welcome to the $place, $name!"

fun main() {
    println(welcome("Sara"))
    println(welcome("Yusuf", "science lab"))
    println(welcome(place = "planetarium", name = "Hana"))
}
```

<details>
<summary>Show answer</summary>

```text
Welcome to the library, Sara!
Welcome to the science lab, Yusuf!
Welcome to the planetarium, Hana!
```

The first call uses the default `place`. The third call uses named arguments, so the order does not matter.

</details>

### 🟡 Level 2: Apply
Write `fun progress(name: String, booksRead: Int, goal: Int = 10): String`. It returns `"<name> reached the goal of <goal> books. Well done!"` when the goal is met, otherwise `"<name> has read <booksRead> of <goal> books. <left> to go."`. Call it for Maryam (7 books), Bilal (12 books) and, with named arguments, Sara (3 books, goal 5).

<details>
<summary>Show answer</summary>

```kotlin
fun progress(name: String, booksRead: Int, goal: Int = 10): String {
    val left = goal - booksRead
    return if (left <= 0) {
        "$name reached the goal of $goal books. Well done!"
    } else {
        "$name has read $booksRead of $goal books. $left to go."
    }
}

fun main() {
    println(progress("Maryam", 7))
    println(progress("Bilal", 12))
    println(progress(name = "Sara", booksRead = 3, goal = 5))
}
```

Output:

```text
Maryam has read 7 of 10 books. 3 to go.
Bilal reached the goal of 10 books. Well done!
Sara has read 3 of 5 books. 2 to go.
```

`return if (...) { ... } else { ... }` returns the value of whichever block runs. Each block's last line is its value.

</details>

### 🔴 Level 3: Challenge
Five classes packed food boxes for a community food bank: `12, 7, 15, 4, 9`.

1. Write your own higher-order function `fun changeAll(numbers: List<Int>, change: (Int) -> Int): List<Int>` that uses a `for` loop to build a new list by calling `change` on every number.
2. Call it with a **trailing lambda** that adds 2 to each number (the teachers add two boxes per class).
3. Use `filter` to keep the classes with 10 or more boxes, and `map` to turn each number into text like `"12 boxes"`.
4. Use `forEach` to print `Class 1 packed 12 boxes of food`, and so on.

<details>
<summary>Show one possible answer</summary>

```kotlin
fun changeAll(numbers: List<Int>, change: (Int) -> Int): List<Int> {
    val result = mutableListOf<Int>()
    for (n in numbers) {
        result.add(change(n))
    }
    return result
}

fun main() {
    val boxesPerClass = listOf(12, 7, 15, 4, 9)

    // 1. Our own function with a trailing lambda
    val withTeacherBoxes = changeAll(boxesPerClass) { it + 2 }
    println("With teacher boxes: $withTeacherBoxes")

    // 2. Built-in helpers with lambdas
    val bigClasses = boxesPerClass.filter { it >= 10 }
    val asText = boxesPerClass.map { boxes -> "$boxes boxes" }
    println("Classes with 10 or more: $bigClasses")
    println(asText)

    // 3. forEach with a numbered message
    var classNumber = 1
    boxesPerClass.forEach {
        println("Class $classNumber packed $it boxes of food")
        classNumber++
    }
}
```

Output:

```text
With teacher boxes: [14, 9, 17, 6, 11]
Classes with 10 or more: [12, 15]
[12 boxes, 7 boxes, 15 boxes, 4 boxes, 9 boxes]
Class 1 packed 12 boxes of food
Class 2 packed 7 boxes of food
Class 3 packed 15 boxes of food
Class 4 packed 4 boxes of food
Class 5 packed 9 boxes of food
```

Your `changeAll` does the same job as the built-in `map`. Now you know how `map` works inside.

</details>
