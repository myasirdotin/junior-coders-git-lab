# Chapter 8: Classes and Null Safety

## 🌟 Real-Life Story

Every book in the school library has a catalogue card. Each card has the same printed boxes: number, title, author, shelf, and a tick box for "on the shelf". The **form** is designed once; then the librarian fills in one card per book. Sometimes a box is honestly empty: a new student has no library nickname yet. A good form says clearly which boxes may be left empty, so nobody is surprised later. In Kotlin, the printed form is a **class**, each filled-in card is an **object**, and the "may be empty" mark is the question mark of **null safety**.

## 🎯 What You Will Learn

- Design a class with properties, a constructor and methods, and create objects from it.
- Use a `data class` and its free gifts: readable printing, equality and `copy`.
- Build the `Book` data class and the `sampleBooks` list used by the School Library app.
- Mark values that may be missing with `?`, and handle them with `?.`, `?:` and `toIntOrNull()`.
- Explain why this book never uses `!!`, and (optionally) list fixed choices with `enum class`.

## Classes: Designing Your Own Type

You already know the types `Int`, `String` and `List`. A **class** lets you design a new type of your own. It groups related values (called **properties**) and the actions on them (called **methods**, which are functions that live inside a class).

```kotlin
class Student(val name: String, val grade: Int) {
    var booksBorrowed = 0

    fun borrow() {
        booksBorrowed++
        println("$name borrowed a book. Total: $booksBorrowed")
    }

    fun summary(): String = "$name, Grade $grade, $booksBorrowed book(s)"
}

fun main() {
    val amina = Student("Amina", 9)
    val omar = Student("Omar", 10)

    amina.borrow()
    amina.borrow()
    omar.borrow()

    println(amina.summary())
    println(omar.summary())
    println(amina.name)
}
```

Output:

```text
Amina borrowed a book. Total: 1
Amina borrowed a book. Total: 2
Omar borrowed a book. Total: 1
Amina, Grade 9, 2 book(s)
Omar, Grade 10, 1 book(s)
Amina
```

How to read it:

| Part | Meaning |
|---|---|
| `class Student` | Design a new type called `Student`. Class names start with a capital letter. |
| `(val name: String, val grade: Int)` | The **constructor**: the values you must give to build a student. `val` makes each one a property. |
| `var booksBorrowed = 0` | A property that starts at 0 and can change. |
| `fun borrow()` | A method: something a student can do. |
| `Student("Amina", 9)` | Builds a new **object** (one filled-in card). No `new` keyword, unlike JavaScript. |
| `amina.borrow()` | The dot calls a method or reads a property of that object. |

```text
   class Student (the form)
        |                |
        v                v
 +---------------+ +---------------+
 | name: Amina   | | name: Omar    |
 | grade: 9      | | grade: 10     |
 | borrowed: 2   | | borrowed: 1   |
 +---------------+ +---------------+
   object amina      object omar
```

Each object keeps its own values. Amina borrowing a book does not change Omar's count.

## Data Classes: Classes That Hold Data

Many classes exist only to **hold data**, like a catalogue card. Kotlin has a special kind for this: put `data` in front of `class`. To see what it adds, compare a plain class with a data class:

```kotlin
class PlainBook(val id: Int, val title: String)

data class Book(
    val id: Int,
    val title: String,
    val author: String,
    val shelf: String,
    val available: Boolean
)

fun main() {
    val p1 = PlainBook(1, "Our Solar System")
    val p2 = PlainBook(1, "Our Solar System")
    println(p1)
    println(p1 == p2)

    val b1 = Book(1, "Our Solar System", "Amina Yusuf", "Science A3", true)
    val b2 = Book(1, "Our Solar System", "Amina Yusuf", "Science A3", true)
    println(b1)
    println(b1 == b2)

    val borrowed = b1.copy(available = false)
    println(borrowed)
    println(b1.available)
}
```

Output:

```text
PlainBook@4f023edb
false
Book(id=1, title=Our Solar System, author=Amina Yusuf, shelf=Science A3, available=true)
true
Book(id=1, title=Our Solar System, author=Amina Yusuf, shelf=Science A3, available=false)
true
```

(The letters and numbers after `PlainBook@` are different on every computer and every run.)

A data class gives you three things for free:

| Gift | Plain class | Data class |
|---|---|---|
| **toString** (how it prints) | `PlainBook@4f023edb` | `Book(id=1, title=...)` |
| **Equality** (`==`) | `false`: two separate cards | `true`: same values, so equal |
| **copy** | not available | `b1.copy(available = false)` |

`copy` makes a **new** object with the same values, except the ones you name. Look at the last line: `b1` itself still says `true`. Nothing was changed; we made a new card. This "do not change, make a new copy" habit is exactly how Jetpack Compose screens like their data. When a book is borrowed, the app makes a copy with `available = false`, and the screen redraws.

The constructor here is written over several lines. That is just layout: one property per line is easier to read.

## The School Library Data

From Chapter 9 onwards you will build the School Library app. Every chapter uses this exact data class and sample list, so type it carefully:

```kotlin
data class Book(
    val id: Int,
    val title: String,
    val author: String,
    val shelf: String,
    val available: Boolean
)

val sampleBooks = listOf(
    Book(1, "Our Solar System", "Amina Yusuf", "Science A3", true),
    Book(2, "Clean Water for Every Village", "Bilal Ahmed", "Geography B1", false),
    Book(3, "Kind Words, Strong Hearts", "Maryam Khan", "Stories C2", true),
    Book(4, "Kotlin for Young Builders", "Omar Farooq", "Computing D4", true),
    Book(5, "Gardens of the World", "Sara Ali", "Nature E1", false)
)

fun main() {
    for (book in sampleBooks) {
        val status = if (book.available) "Available" else "Borrowed"
        println("${book.id}. ${book.title} by ${book.author} [$status]")
    }

    val onShelf = sampleBooks.filter { it.available }
    println("On the shelf now: ${onShelf.size}")

    val titles = sampleBooks.map { it.title }
    println(titles.first())
}
```

Output:

```text
1. Our Solar System by Amina Yusuf [Available]
2. Clean Water for Every Village by Bilal Ahmed [Borrowed]
3. Kind Words, Strong Hearts by Maryam Khan [Available]
4. Kotlin for Young Builders by Omar Farooq [Available]
5. Gardens of the World by Sara Ali [Borrowed]
On the shelf now: 3
Our Solar System
```

Everything here is from earlier chapters, now working together: a `List<Book>` (Chapter 6), a `for` loop, an `if` expression (Chapter 5), and `filter` and `map` with lambdas (Chapter 7). `first()` is the partner of `last()`. Notice `sampleBooks` sits **outside** `main`, so any function in the file can use it.

The `id` is a unique number for each book. Two books can have the same title, but never the same id. Later the app will use the id to open the right detail screen and to remember which books you saved for later.

## Null: When a Value Is Missing

In Chapter 4 you saw that `"twelve".toIntOrNull()` gives `null`. **`null` means "no value here"**. Missing values are a part of real life: a student without a nickname, a search that finds no book, a form box left empty.

In many languages, any variable can secretly hold `null`. Then the program crashes the moment you use it, often far from where the mistake was made. This crash is so common that it has a famous name: the "null pointer exception".

Kotlin protects you with **null safety**. By default, a type **cannot** hold `null`. If a value might be missing, you must say so by adding `?` to the type:

```kotlin
fun main() {
    var nickname: String? = null
    println(nickname)

    nickname = "Mimi"
    println(nickname)

    val title: String = "Our Solar System"
    println(title.length)
}
```

Output:

```text
null
Mimi
16
```

| Type | Can hold | Example values |
|---|---|---|
| `String` | text only, never null | `"Mimi"` |
| `String?` | text **or** null | `"Mimi"`, `null` |
| `Int?` | a whole number or null | `12`, `null` |
| `Book?` | a book or null | a `Book`, `null` |

Read `String?` aloud as "a String, or maybe nothing".

Once a value is nullable, Kotlin will not let you use it carelessly:

```kotlin
fun main() {
    val nickname: String? = null
    println(nickname.length)
}
```

```text
error: only safe (?.) or non-null asserted (!!.) calls are allowed on a nullable receiver of type 'kotlin.String?'.
```

The error is long, but its meaning is simple: "this might be null, so tell me what to do if it is". It is caught **before** the program runs. The next three tools tell Kotlin what to do.

## Safe Call ?.

`?.` means "if it is not null, go ahead; if it is null, stop and give `null`".

```kotlin
fun main() {
    val withName: String? = "Maryam"
    val noName: String? = null

    println(withName?.length)
    println(noName?.length)
    println(noName?.uppercase())
}
```

Output:

```text
6
null
null
```

No crash. When the value is missing, the whole expression quietly becomes `null`.

## Elvis Operator ?:

Often you do not want `null`; you want a sensible **default**. The operator `?:` says "use the left side, but if it is null, use the right side instead". Its official name is the **Elvis operator**.

```kotlin
fun main() {
    val noName: String? = null
    val withName: String? = "Maryam"

    val shown = noName ?: "Guest"
    println("Hello, $shown")

    val letters = withName?.length ?: 0
    val noLetters = noName?.length ?: 0
    println(letters)
    println(noLetters)
}
```

Output:

```text
Hello, Guest
6
0
```

`?.` and `?:` work beautifully together: `noName?.length ?: 0` reads as "the length, or 0 if there is no name". The result is a plain `Int`, never null, so the rest of your code is simple.

```text
 value ?: default
   |
   +-- not null? --> use value
   |
   +-- null?     --> use default
```

### toIntOrNull() + Elvis: reading numbers people type

Now the preview from Chapter 4 is complete. Text boxes in apps always give a `String`. Users make typing mistakes, and that is fine. `toIntOrNull()` turns bad text into `null`, and Elvis turns `null` into a safe default:

```kotlin
fun main() {
    val typedAnswers = listOf("3", "12", "three", "", "7")

    for (typed in typedAnswers) {
        val copies = typed.toIntOrNull() ?: 0
        println("Typed \"$typed\" -> copies: $copies")
    }
}
```

Output:

```text
Typed "3" -> copies: 3
Typed "12" -> copies: 12
Typed "three" -> copies: 0
Typed "" -> copies: 0
Typed "7" -> copies: 7
```

(`\"` puts a double-quote character inside a String.) No input can crash this program.

### Checking with if

You can also check for `null` with an ordinary `if`. Inside the `if`, Kotlin knows the value is not null and lets you use it as a normal `Int`. This is called a **smart cast**.

```kotlin
fun main() {
    val typed = "abc"
    val copies: Int? = typed.toIntOrNull()

    if (copies != null) {
        println("Ordering ${copies + 1} copies")
    } else {
        println("Please type a number, like 3.")
    }
}
```

Output:

```text
Please type a number, like 3.
```

This is the friendliest choice when the user should be told what went wrong.

### Searching a list: find

The list function `find { }` takes a lambda test (like `filter`), but returns only the **first** matching item. If nothing matches, it returns `null`, so its type is `Book?`:

```kotlin
data class Book(
    val id: Int,
    val title: String,
    val author: String,
    val shelf: String,
    val available: Boolean
)

val sampleBooks = listOf(
    Book(1, "Our Solar System", "Amina Yusuf", "Science A3", true),
    Book(2, "Clean Water for Every Village", "Bilal Ahmed", "Geography B1", false),
    Book(3, "Kind Words, Strong Hearts", "Maryam Khan", "Stories C2", true),
    Book(4, "Kotlin for Young Builders", "Omar Farooq", "Computing D4", true),
    Book(5, "Gardens of the World", "Sara Ali", "Nature E1", false)
)

fun main() {
    val found: Book? = sampleBooks.find { it.id == 4 }
    val missing: Book? = sampleBooks.find { it.id == 99 }

    println(found?.title ?: "No book with that id")
    println(missing?.title ?: "No book with that id")
}
```

Output:

```text
Kotlin for Young Builders
No book with that id
```

The detail screen in Chapter 14 does exactly this: it receives a book id and finds the book, and must cope politely if the id is wrong.

## Why There Is No !! in This Book

Kotlin also has `!!`, the "not-null assertion". `value!!` means "I promise this is not null; if I am wrong, crash". You saw it mentioned in the long error message above.

This book never uses it, for three reasons:

- A broken promise crashes the app in front of the user, which is exactly what null safety was built to prevent.
- There is always a polite alternative: `?.`, `?:`, `if (x != null)` or `toIntOrNull()`.
- Honest code admits that data can be missing and plans for it. That is part of *Amānah*: the user trusts your app not to fail them.

If Android Studio ever suggests adding `!!`, stop and choose one of the safe tools instead.

## Optional: enum class for Fixed Choices

Sometimes a value must be one of a **fixed set** of choices, like the sections of the library. An `enum class` lists them. Kotlin will then reject any value that is not on the list, so typing mistakes like `"Sceince"` become impossible.

```kotlin
enum class Shelf { SCIENCE, GEOGRAPHY, STORIES, COMPUTING, NATURE }

fun colourFor(shelf: Shelf): String = when (shelf) {
    Shelf.SCIENCE -> "blue"
    Shelf.GEOGRAPHY -> "green"
    Shelf.STORIES -> "orange"
    Shelf.COMPUTING -> "purple"
    Shelf.NATURE -> "brown"
}

fun main() {
    val shelf = Shelf.STORIES
    println(shelf)
    println("Sticker colour for $shelf: ${colourFor(shelf)}")
}
```

Output:

```text
STORIES
Sticker colour for STORIES: orange
```

This `when` needs no `else`: Kotlin knows every possible `Shelf`, so all cases are covered. Enum values are usually written in CAPITALS. The School Library app keeps `shelf` as a simple `String` such as `"Science A3"`, but enums are good to know for later projects.

## ⚠️ Common Mistake

**Mistake 1: putting `null` into a non-null type.**

```kotlin
fun main() {
    val nickname: String = null
}
```

```text
error: null cannot be a value of a non-null type 'kotlin.String'.
```

Fix: if the value can truly be missing, say so with `String?`. If it should always exist, give it a real value.

**Mistake 2: using a nullable value directly.** `nickname.length` on a `String?` gives the long "only safe (?.) ... calls are allowed" error from earlier. The wrong fix is `nickname!!.length`: it compiles, then crashes when the nickname is missing. The right fix is `nickname?.length ?: 0`.

**Mistake 3: expecting `copy` to change the original.** After `val borrowed = b1.copy(available = false)`, `b1.available` is still `true`. Use the new object `borrowed`.

## ✍️ Try It

1. Write a `data class Student(val name: String, val grade: Int, val nickname: String?)`.
2. Create two students, one with nickname `"Mimi"` and one with `null`.
3. For each, print `Call me <nickname>`, using `?:` to fall back to the real name.
4. Make a copy of the first student moved up to the next grade, and print both.

**Hint:** `student.nickname ?: student.name`.

## 📝 Recap

- A class is a design for your own type: properties hold data, methods are actions, the constructor builds objects.
- A `data class` prints nicely, compares by values with `==`, and has `copy(...)` to make a changed copy.
- The School Library app uses `data class Book(id, title, author, shelf, available)` and `sampleBooks`.
- `String?` means "a String or null". Kotlin will not let you use it carelessly.
- `?.` stops safely at null; `?:` gives a default; `toIntOrNull() ?: 0` reads typed numbers safely; `find` returns a nullable result.
- No `!!` in this book: always choose a safe tool instead.

## 📖 Key Terms

- **Class:** a design (blueprint) for a new type.
- **Object:** one thing built from a class.
- **Property / method:** a value / a function that belongs to an object.
- **Constructor:** the values needed to build an object.
- **Data class:** a class for holding data, with `toString`, `==` and `copy` included.
- **null:** "no value here".
- **Null safety:** Kotlin's rule that only types marked `?` may hold null.

## 🏆 Practice

### 🟢 Level 1: Recall
What does this program print?

```kotlin
fun main() {
    val a: String? = null
    val b: String? = "Hana"
    println(a ?: "No name")
    println(b ?: "No name")
    println(b?.length)
    println(a?.length ?: -1)
    println("42x".toIntOrNull() ?: 0)
}
```

<details>
<summary>Show answer</summary>

```text
No name
Hana
4
-1
0
```

`a` is null, so Elvis gives the default. `b` is not null, so it is used. `a?.length` is null, so `-1` is used. `"42x"` is not a number, so `toIntOrNull()` gives null and Elvis gives `0`.

</details>

### 🟡 Level 2: Apply
Write a data class `Visit(place: String, day: String, seatsLeft: Int)` for a class trip. Create a planetarium trip on Thursday with 30 seats. The trip moves to Saturday: make a copy with the new day. Print both, and check with `==` whether the original equals a freshly made identical `Visit`, and whether it equals the moved trip.

<details>
<summary>Show answer</summary>

```kotlin
data class Visit(val place: String, val day: String, val seatsLeft: Int)

fun main() {
    val trip = Visit("Planetarium", "Thursday", 30)
    val moved = trip.copy(day = "Saturday")
    val sameTrip = Visit("Planetarium", "Thursday", 30)

    println(trip)
    println(moved)
    println(trip == sameTrip)
    println(trip == moved)
}
```

Output:

```text
Visit(place=Planetarium, day=Thursday, seatsLeft=30)
Visit(place=Planetarium, day=Saturday, seatsLeft=30)
true
false
```

</details>

### 🔴 Level 3: Challenge
Build a library desk helper using `Book` and `sampleBooks`:

1. Write `fun findBook(id: Int): Book?` with a `for` loop: return the matching book, or `null` after the loop.
2. Write `fun lookUp(typed: String): String` that takes what a student typed and returns one polite message:
   - not a number: `"two" is not a book number.`
   - no such book: `No book has the number 9.`
   - book borrowed: `<title> is borrowed right now.`
   - otherwise make a borrowed copy with `copy(available = false)` and say `You borrowed <title> from <shelf>.`
3. Test it with `"3"`, `"2"`, `"9"` and `"two"`. No `!!` allowed.

<details>
<summary>Show one possible answer</summary>

```kotlin
data class Book(
    val id: Int,
    val title: String,
    val author: String,
    val shelf: String,
    val available: Boolean
)

val sampleBooks = listOf(
    Book(1, "Our Solar System", "Amina Yusuf", "Science A3", true),
    Book(2, "Clean Water for Every Village", "Bilal Ahmed", "Geography B1", false),
    Book(3, "Kind Words, Strong Hearts", "Maryam Khan", "Stories C2", true),
    Book(4, "Kotlin for Young Builders", "Omar Farooq", "Computing D4", true),
    Book(5, "Gardens of the World", "Sara Ali", "Nature E1", false)
)

fun findBook(id: Int): Book? {
    for (book in sampleBooks) {
        if (book.id == id) {
            return book
        }
    }
    return null
}

fun lookUp(typed: String): String {
    val id = typed.toIntOrNull() ?: return "\"$typed\" is not a book number."
    val book = findBook(id) ?: return "No book has the number $id."
    if (!book.available) {
        return "${book.title} is borrowed right now."
    }
    val borrowed = book.copy(available = false)
    return "You borrowed ${borrowed.title} from ${borrowed.shelf}. Available now: ${borrowed.available}"
}

fun main() {
    println(lookUp("3"))
    println(lookUp("2"))
    println(lookUp("9"))
    println(lookUp("two"))
}
```

Output:

```text
You borrowed Kind Words, Strong Hearts from Stories C2. Available now: false
Clean Water for Every Village is borrowed right now.
No book has the number 9.
"two" is not a book number.
```

A neat trick: the right side of `?:` may be a `return`. `typed.toIntOrNull() ?: return "..."` means "use the number, or leave the function now with this message". After that line, `id` is a plain `Int`. You could also write it with `if (id == null) { return ... }`; both are safe.

</details>
