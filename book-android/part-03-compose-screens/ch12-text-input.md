# Chapter 12: Text Input and Forms

## 🌟 Real-Life Story

The school library has a paper request slip. You write the book you are looking for and how many copies your class needs. Hamza, the student helper, reads each slip before he passes it on. If a box is empty he hands it back: "Please fill this in." If someone wrote "lots" in the copies box, he asks for a number. He also ignores extra spaces and does not care whether you wrote in capital letters. A text box in an app should be just as helpful and just as patient. In this chapter you build that kind of box, and use it to search the library.

## 🎯 What You Will Learn

- Add an `OutlinedTextField` and connect it to state with `value` and `onValueChange`.
- Choose the right keyboard with `KeyboardOptions` and `KeyboardType`.
- Check what the user typed and show friendly error messages with `isError` and `supportingText`.
- Tidy input with `trim()` and search without caring about capital letters (`ignoreCase`).
- Treat passwords with care: hide them and never show them back.

## Your First Text Field

A **text field** is a box the user types into. Material 3 has two kinds that work the same way: `TextField` (filled) and `OutlinedTextField` (with an outline). This book uses `OutlinedTextField`.

A text field does not remember what is typed by itself. You keep the text in **state** (Chapter 11), and the field shows that state. Here is a full example with imports:

```kotlin
package org.juniorcoders.library

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun NameBox(modifier: Modifier = Modifier) {
    var name by rememberSaveable { mutableStateOf("") }

    Column(modifier = modifier.padding(16.dp)) {
        OutlinedTextField(
            value = name,
            onValueChange = { newText -> name = newText },
            label = { Text("Your first name") },
            singleLine = true,
            modifier = Modifier.fillMaxWidth()
        )
        Text("Hello, $name")
    }
}
```

Type `Ayesha`. The screen shows:

```text
+- Your first name ---------------+
| Ayesha                          |
+---------------------------------+
Hello, Ayesha
```

### How the loop works

The two most important parameters are `value` and `onValueChange`.

```text
  user types "A"
       |
       v
 onValueChange("A")   field reports it
       |
       v
  name = "A"          you update state
       |
       v
 recomposition        field shows name
```

- `value = name`: the field shows whatever is in `name`.
- `onValueChange = { newText -> name = newText }`: every time a key is pressed, the field calls this lambda with the **new full text**. You put it into the state.

This is state hoisting from Chapter 11: the value goes down into the field, and the change comes back up. Your code is always in charge of the text.

### Other parameters

| Parameter | Example | What it does |
|---|---|---|
| `label` | `{ Text("Book title") }` | Name shown in the box; moves up when you type |
| `placeholder` | `{ Text("e.g. Gardens") }` | Grey hint shown while the box is empty |
| `singleLine` | `true` | One line only; Enter does not add a new line |
| `leadingIcon` | `{ Icon(…) }` | An icon at the start, such as a magnifying glass |
| `keyboardOptions` | see below | Which keyboard to show |
| `isError` | `true` | Turns the outline red |
| `supportingText` | `{ Text("…") }` | Small message under the box |

`label`, `placeholder` and `supportingText` take a lambda, not plain text. That is because you can put any composable in them, although usually it is a `Text`.

A `label` matters for accessibility. TalkBack reads it, so a blind student knows what the box is for. Always give a text field a label.

> Compose also has a newer kind of text field that takes a `TextFieldState` instead of `value` and `onValueChange`. The version in this chapter is still widely used and works well for school apps.

## Choosing the Keyboard

When a box needs a number, show the number keyboard. It is faster for the user and prevents many mistakes.

```kotlin
OutlinedTextField(
    value = copiesText,
    onValueChange = { copiesText = it },
    label = { Text("Copies needed") },
    singleLine = true,
    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number)
)
```

Imports:

```kotlin
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.ui.text.input.KeyboardType
```

`onValueChange = { copiesText = it }` is the short form of the lambda: `it` is the new text (Chapter 7).

| `KeyboardType` | Keyboard shown | Use for |
|---|---|---|
| `Text` | Normal letters | Names, titles |
| `Number` | Digits | Copies, class number |
| `Email` | Letters with `@` easy to reach | Email addresses |
| `Phone` | Phone keypad | Phone numbers |
| `Password` | Letters, no suggestions | Passwords |

Note: the value of a text field is **always a `String`**, even with the number keyboard. Some keyboards still let people type a full stop or minus sign, or paste letters. So you must still check the text, which comes next.

## Checking Input: Validation

**Validation** means checking that the input makes sense before using it. Let us check the "copies needed" box. The library lets a class borrow 1 to 3 copies of a book.

First write the checking rule as a plain Kotlin function. It returns an error message, or `null` when everything is fine (nullable types, Chapter 8):

```kotlin
fun copiesError(text: String): String? {
    val number = text.trim().toIntOrNull()
    return when {
        text.isBlank() -> "Please enter a number"
        number == null -> "Digits only, please"
        number !in 1..3 -> "You can borrow 1 to 3 copies"
        else -> null
    }
}

fun main() {
    for (t in listOf("", "2", "five", "7", " 3 ")) println("'$t' -> ${copiesError(t)}")
}
```

```text
'' -> Please enter a number
'2' -> null
'five' -> Digits only, please
'7' -> You can borrow 1 to 3 copies
' 3 ' -> null
```

- `trim()` removes spaces from the start and end, so `" 3 "` becomes `"3"`.
- `toIntOrNull()` turns text into a number, or gives `null` if it is not a whole number.
- `isBlank()` is true for an empty text or one with only spaces.
- `number !in 1..3` means "not between 1 and 3".

Because this is a plain function, it is easy to test with `fun main()` before using it on a screen. Now use it in the field:

```kotlin
@Composable
fun CopiesBox() {
    var copiesText by rememberSaveable { mutableStateOf("") }
    val error = copiesError(copiesText)
    val showError = copiesText.isNotEmpty() && error != null

    OutlinedTextField(
        value = copiesText,
        onValueChange = { copiesText = it },
        label = { Text("Copies needed") },
        singleLine = true,
        isError = showError,
        supportingText = {
            if (showError && error != null) {
                Text(error)
            } else {
                Text("1 to 3 copies")
            }
        },
        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number)
    )
}
```

After the user types `7`:

```text
+- Copies needed -----------------+   (red)
| 7                               |
+---------------------------------+
You can borrow 1 to 3 copies          (red)
```

After they change it to `2`, the outline is normal again and the help line says `1 to 3 copies`.

Some points about kind validation:

- **Do not shout at an empty box.** `showError` is false until the user has typed something. A form that is red before you start feels unfriendly.
- **Say how to fix it.** "You can borrow 1 to 3 copies" helps. "Invalid input" does not.
- **The message is text, not only colour.** Some people cannot tell red from green. `supportingText` gives everyone the words.
- `error` is worked out again on every recomposition from the latest text, so it never goes out of date.

## Passwords: Handle With Care

Your library app does not need accounts, and a good app never collects data it does not need (*Amānah*). But you will meet password boxes in many apps, so here is how to treat one properly.

```kotlin
OutlinedTextField(
    value = password,
    onValueChange = { password = it },
    label = { Text("Password") },
    singleLine = true,
    visualTransformation = PasswordVisualTransformation(),
    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password)
)
```

`PasswordVisualTransformation` (import `androidx.compose.ui.text.input.PasswordVisualTransformation`) shows dots instead of letters. `KeyboardType.Password` tells the keyboard not to learn or suggest the word.

Rules for passwords:

| Do | Never |
|---|---|
| Show dots | Show the password in a `Text`, such as "You typed: …" |
| Keep it only as long as needed | Print it with `println` or write it to a log |
| Send it only over a secure connection | Save it in plain text on the phone |

A password is a secret someone trusted you with. Showing it back on the screen lets anyone looking over their shoulder read it.

## A Search Box for the Library

Now the School Library app gets its search box. As the student types, the list of matching titles shrinks.

### Step 1: the filter, in plain Kotlin

```kotlin
fun filterBooks(books: List<Book>, query: String): List<Book> {
    val cleaned = query.trim()
    return books.filter { it.title.contains(cleaned, ignoreCase = true) }
}

fun main() {
    println(filterBooks(sampleBooks, "world").map { it.title })
    println(filterBooks(sampleBooks, "  KOTLIN ").map { it.title })
    println(filterBooks(sampleBooks, "").size)
    println(filterBooks(sampleBooks, "maths").size)
}
```

```text
[Gardens of the World]
[Kotlin for Young Builders]
5
0
```

(The program also needs the `Book` class and `sampleBooks` from Chapter 9 above `main`.)

- `filter` keeps the books for which the lambda gives `true` (Chapter 7).
- `contains(cleaned, ignoreCase = true)` checks whether the title includes the search words, treating `K` and `k` as the same.
- `trim()` means `"  KOTLIN "` still finds the book.
- An empty search `""` is contained in every title, so all 5 books come back. That is exactly right: before you type, you see everything.

### Step 2: the screen

```kotlin
@Composable
fun BookSearch(modifier: Modifier = Modifier) {
    var query by rememberSaveable { mutableStateOf("") }
    val matches = filterBooks(sampleBooks, query)

    Column(
        modifier = modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        OutlinedTextField(
            value = query,
            onValueChange = { query = it },
            label = { Text("Search by title") },
            placeholder = { Text("e.g. water") },
            singleLine = true,
            modifier = Modifier.fillMaxWidth()
        )
        Text(
            text = "${matches.size} of ${sampleBooks.size} books",
            style = MaterialTheme.typography.labelMedium
        )
        matches.forEach { book ->
            Text(book.title, style = MaterialTheme.typography.bodyLarge)
        }
        if (matches.isEmpty()) {
            Text("No books found. Check the spelling or try fewer words.")
        }
    }
}
```

Before typing, all five titles show. After typing `water`:

```text
+- Search by title ---------------+
| water                           |
+---------------------------------+
1 of 5 books
Clean Water for Every Village
```

Type `s` and four books stay (every title with an "s" in it). Type `maths` and the friendly "No books found" message appears.

Notice the pattern. The **state** is only the typed text. The list of matches is worked out from it each time. You do not store `matches` in state, so it can never disagree with the search box.

`matches.forEach { … }` draws one `Text` per book. It is fine for five books. For a whole library it is not, and Chapter 13 shows the better way.

## 🔮 Predict the Output

```kotlin
println(filterBooks(sampleBooks, "  GARDENS").size)
println(filterBooks(sampleBooks, "o").size)
```

<details>
<summary>Show answer</summary>

```text
1
5
```

`"  GARDENS"` is trimmed to `"GARDENS"` and matches "Gardens of the World" because case is ignored. Every one of the five titles contains a small letter "o" ("Our Solar System", "Clean Water for Every Village", "Kind Words…", "Kotlin for…", "Gardens of…"), so all 5 match.

</details>

## ⚠️ Common Mistake

**1. Not updating the state in `onValueChange`.**

```kotlin
var query by rememberSaveable { mutableStateOf("") }
OutlinedTextField(
    value = query,
    onValueChange = { },          // forgot to save the text
    label = { Text("Search") }
)
```

What happens: you press keys, but nothing appears in the box. The field always shows `value`, and `value` never changes. Fix: `onValueChange = { query = it }`.

**2. Comparing without trimming or ignoring case.**

```kotlin
books.filter { it.title.contains(query) }
```

What happens: typing `kotlin` finds nothing, because the title has a capital `K`. A space at the end of the search also stops matches. Fix: `it.title.contains(query.trim(), ignoreCase = true)`.

## ✍️ Try It

Let the search also look at the author's name.

1. Change `filterBooks` so a book matches when its title **or** its author contains the search words.
2. Test it in `fun main()`: searching `ali` should give "Gardens of the World" (by Sara Ali).
3. Change the field's label to `Search by title or author`.

*Hint:* use `||` (or) inside the lambda: `it.title.contains(cleaned, ignoreCase = true) || it.author.contains(cleaned, ignoreCase = true)`.

## 📝 Recap

- `OutlinedTextField` shows `value` and calls `onValueChange` with the new text; you store it in state.
- Give every field a `label`; use `singleLine = true` for short answers.
- `KeyboardOptions(keyboardType = KeyboardType.Number)` shows the number keyboard, but the value is still a `String`, so check it.
- Validate with a plain function, then show the result with `isError` and a helpful `supportingText` message.
- `trim()` and `ignoreCase = true` make searching forgiving.
- Passwords: dots on screen, never shown back, never logged.

## 📖 Key Terms

- **Text field**: a box the user can type into.
- **Validation**: checking that input makes sense before using it.
- **Supporting text**: the small help or error line under a text field.
- **trim()**: removes spaces from the start and end of a text.
- **ignoreCase**: compare text without caring about capital letters.

## 🏆 Practice

### 🟢 Level 1: Recall
1. What does `onValueChange` give you each time the user presses a key?
2. Which parameter turns the outline red?
3. What does `toIntOrNull()` give for `"five"`?

<details>
<summary>Show answer</summary>

1. The new full text of the field, as a `String`.
2. `isError = true`.
3. `null`, because `"five"` is not written in digits.

</details>

### 🟡 Level 2: Apply
Write a `ClassBox()` with an `OutlinedTextField` for a class number (6 to 10). Show the number keyboard. Show `Classes 6 to 10 only` in red when the user has typed something that is not a number from 6 to 10; otherwise show the help text `Your class, 6 to 10`.

<details>
<summary>Show answer</summary>

```kotlin
@Composable
fun ClassBox() {
    var classText by rememberSaveable { mutableStateOf("") }
    val number = classText.trim().toIntOrNull()
    val showError = classText.isNotEmpty() && (number == null || number !in 6..10)

    OutlinedTextField(
        value = classText,
        onValueChange = { classText = it },
        label = { Text("Class") },
        singleLine = true,
        isError = showError,
        supportingText = {
            Text(if (showError) "Classes 6 to 10 only" else "Your class, 6 to 10")
        },
        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number)
    )
}
```

When `showError` is true the outline and the supporting text turn red, because Material 3 colours `supportingText` with the error colour when `isError` is true.

</details>

### 🔴 Level 3: Challenge
Build a book request form.

1. Two fields: `Book title` (text) and `Copies needed` (number keyboard), each with `rememberSaveable` state.
2. The title must not be blank; copies must pass `copiesError` from this chapter.
3. Show each field's error only after the user has typed in it.
4. A `Button` "Send request" that is only enabled when both are valid (`Button` has an `enabled` parameter).
5. When tapped, show a `Text` such as `Request sent: 2 copies of Our Solar System`, using trimmed text, and clear both fields.

<details>
<summary>Show one possible answer</summary>

```kotlin
@Composable
fun RequestForm(modifier: Modifier = Modifier) {
    var title by rememberSaveable { mutableStateOf("") }
    var copies by rememberSaveable { mutableStateOf("") }
    var message by rememberSaveable { mutableStateOf("") }

    val titleOk = title.isNotBlank()
    val copiesProblem = copiesError(copies)
    val formOk = titleOk && copiesProblem == null

    Column(modifier = modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        OutlinedTextField(
            value = title,
            onValueChange = { title = it },
            label = { Text("Book title") },
            singleLine = true,
            isError = title.isNotEmpty() && !titleOk,
            supportingText = {
                if (title.isNotEmpty() && !titleOk) Text("Please write a title")
            },
            modifier = Modifier.fillMaxWidth()
        )
        OutlinedTextField(
            value = copies,
            onValueChange = { copies = it },
            label = { Text("Copies needed") },
            singleLine = true,
            isError = copies.isNotEmpty() && copiesProblem != null,
            supportingText = {
                Text(if (copies.isNotEmpty() && copiesProblem != null) copiesProblem else "1 to 3 copies")
            },
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
            modifier = Modifier.fillMaxWidth()
        )
        Button(
            onClick = {
                message = "Request sent: ${copies.trim()} copies of ${title.trim()}"
                title = ""
                copies = ""
            },
            enabled = formOk
        ) {
            Text("Send request")
        }
        if (message.isNotEmpty()) {
            Text(message)
        }
    }
}
```

The button is grey and cannot be tapped until both fields are valid. A title that is only spaces counts as blank, because `isNotBlank()` ignores spaces. The request is not really sent anywhere yet; showing a message is enough for now, and the screen should say honestly what happened.

</details>
