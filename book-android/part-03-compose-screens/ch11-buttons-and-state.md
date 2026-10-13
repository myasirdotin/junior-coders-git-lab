# Chapter 11: Buttons and State

## 🌟 Real-Life Story

At the library desk, Zainab helps the librarian on Tuesdays. Every time a student borrows a book, she adds one tally mark on a small whiteboard. At the end of the day the board says how many books went out, and she wipes it clean for tomorrow. The whiteboard is the important part. Without it, Zainab would have to remember every number in her head, and she would lose count as soon as someone asked her a question. An app needs a whiteboard too. In Compose it is called **state**, and in this chapter your buttons will finally change what the screen shows.

## 🎯 What You Will Learn

- Add `Button`, `OutlinedButton`, `TextButton` and `IconButton` and run code in their `onClick` lambdas.
- Explain what state is and why a normal `var` does not update the screen.
- Keep state with `remember`, `mutableStateOf` and `mutableIntStateOf`, using the `by` keyword.
- Describe recomposition in plain words and keep state through a screen rotation with `rememberSaveable`.
- Move state up to the parent with state hoisting, passing a value and an "on change" function down.

## Four Kinds of Button

Material 3 gives you several buttons. They all work the same way: `onClick` says what happens when tapped, and the braces after the brackets say what the button shows.

```kotlin
Button(onClick = { /* runs when tapped */ }) {
    Text("Borrow")
}
```

Does this look familiar? In Chapter 7 you learned that a lambda is a small function written inside `{ }`, and that when the **last** parameter is a lambda you can write it after the brackets. That is a **trailing lambda**. A button uses both:

- `onClick = { … }` is a lambda passed by name. It runs when the button is tapped.
- `{ Text("Borrow") }` is the trailing lambda. It describes the button's content.

| Button | Look | Use it for |
|---|---|---|
| `Button` | Solid colour | The main action on a screen |
| `OutlinedButton` | Outline, no fill | A second, less important action |
| `TextButton` | Just coloured text | Small actions such as "Cancel" |
| `IconButton` | Only an icon | Small tools on a card or bar |

```kotlin
Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    Button(onClick = { }) { Text("Borrow") }
    OutlinedButton(onClick = { }) { Text("Details") }
    TextButton(onClick = { }) { Text("Cancel") }
}
```

The phone shows:

```text
 ( Borrow )  ( Details )   Cancel
  solid       outline      text only
```

### `IconButton` and `Icon`

An `IconButton` holds an `Icon`. In Chapter 9 you added a vector drawing with **New → Vector Asset**. Add two more the same way: search the clip art for "bookmark" and save them as `ic_bookmark` (filled) and `ic_bookmark_border` (outline).

```kotlin
IconButton(onClick = { }) {
    Icon(
        painter = painterResource(R.drawable.ic_bookmark_border),
        contentDescription = "Save for later"
    )
}
```

An icon has no words, so its `contentDescription` is what TalkBack reads aloud. Describe the **action**: "Save for later", not "bookmark picture".

`IconButton` already gives the icon a touch area of at least 48 dp, so it is easy to tap. Keep every tappable thing at least 48 dp. Small fingers and shaky hands both need room.

## The Counter That Does Not Count

Let us build Zainab's tally board: a number and a button that adds one.

```kotlin
@Composable
fun BorrowCounter() {
    var count = 0
    Column {
        Text("Books borrowed today: $count")
        Button(onClick = { count = count + 1 }) {
            Text("Add one")
        }
    }
}
```

Run it and tap the button many times. The screen keeps saying:

```text
Books borrowed today: 0
```

The variable does change. But nobody told Compose to **redraw the screen**. And even if it did redraw, the first line `var count = 0` would run again and set it back to zero. This normal `var` is like a number in Zainab's head: forgotten the moment she looks away.

## What State Is

**State** is any value that can change while the app is running *and* that the screen depends on.

| Changes while running? | Shown on screen? | Is it state? |
|---|---|---|
| Books borrowed today | Yes | Yes |
| Is this book saved for later? | Yes | Yes |
| What is typed in a search box | Yes | Yes |
| The list of sample books | No | No, it is fixed data |

Compose needs two things from state:

1. **Watch it.** When the value changes, Compose must notice and redraw.
2. **Keep it.** When Compose redraws, the value must not go back to the start.

Two tools do these jobs.

- `mutableStateOf(…)` makes a **watched** box. Changing what is inside tells Compose to redraw.
- `remember { … }` **keeps** the box between redraws, instead of making a new one each time.

## The Counter That Works

Here is the fixed counter in a full `MainActivity.kt`, with every import:

```kotlin
package org.juniorcoders.library

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import org.juniorcoders.library.ui.theme.SchoolLibraryTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            SchoolLibraryTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    BorrowCounter(
                        modifier = Modifier
                            .padding(innerPadding)
                            .padding(16.dp)
                    )
                }
            }
        }
    }
}

@Composable
fun BorrowCounter(modifier: Modifier = Modifier) {
    var count by rememberSaveable { mutableIntStateOf(0) }

    Column(
        modifier = modifier,
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Text(
            text = "Books borrowed today: $count",
            style = MaterialTheme.typography.headlineSmall
        )
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Button(onClick = { count++ }) {
                Text("Add one")
            }
            OutlinedButton(onClick = { count = 0 }) {
                Text("New day")
            }
        }
    }
}
```

Tap **Add one** three times. The screen shows:

```text
Books borrowed today: 3

 ( Add one )  ( New day )
```

Tap **New day** and it goes back to 0, like wiping the whiteboard.

### Reading the state line

```kotlin
var count by rememberSaveable { mutableIntStateOf(0) }
```

| Part | Meaning |
|---|---|
| `mutableIntStateOf(0)` | A watched box holding a whole number, starting at 0 |
| `rememberSaveable { … }` | Keep the box between redraws, and even when the phone turns (explained below) |
| `by` | Let me use `count` like a plain number |
| `var` | `count` can be given new values |

For whole numbers use `mutableIntStateOf`. It is a little faster than `mutableStateOf(0)`. For everything else (text, `true`/`false`, a `Book`) use `mutableStateOf`:

```kotlin
var saved by remember { mutableStateOf(false) }
var note by remember { mutableStateOf("") }
```

### The `by` keyword and its two imports

Without `by`, you hold the box itself and must open it each time:

```kotlin
val count = remember { mutableIntStateOf(0) }
Text("Borrowed: ${count.intValue}")
Button(onClick = { count.intValue++ }) { Text("Add one") }
```

With `by`, Kotlin opens the box for you. Reading `count` reads what is inside; writing `count = 5` puts 5 inside. This is called a **delegate**: `count` passes its work on to the box.

`by` needs two imports, and Android Studio does not always add them on its own:

```kotlin
import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
```

`getValue` makes reading work, `setValue` makes writing work. If they are missing, the `by` is underlined in red. Click on it and press **Alt + Enter** to import them.

## Recomposition: How the Screen Updates

When state changes, Compose calls your composable function again, and draws the new result. This is called **recomposition**.

```text
 tap "Add one"
      |
      v
 count: 2 -> 3      (watched box changes)
      |
      v
 Compose notices
      |
      v
 runs BorrowCounter() again
      |
      v
 Text now says 3    (screen redrawn)
```

Some facts that make this clearer:

- Compose is smart. It only re-runs the composables that read the changed state, not the whole app.
- Your composable may run many times. So it should only *describe* the screen. Do slow work, such as saving to a file, somewhere else (Chapter 15).
- `remember` is what stops the value being reset on each run. On the second run, `remember` hands back the box it made the first time.

Think of the story again. Each recomposition is Zainab redrawing the board's numbers neatly. The tally itself, the state, is kept safe while she does it.

## Turning the Phone: `remember` vs `rememberSaveable`

Try this experiment. Change `rememberSaveable` to `remember`, run the app, count to 4, then turn the emulator sideways (the rotate buttons are on the emulator's side toolbar).

The counter jumps back to 0!

When the phone turns, Android **rebuilds the whole screen** from scratch for the new shape. `remember` only keeps values while the screen exists, so it loses them. `rememberSaveable` writes the value into a small safe place that survives the rebuild.

| | Keeps value when the screen redraws | Keeps value when the phone turns |
|---|---|---|
| `remember` | Yes | No |
| `rememberSaveable` | Yes | Yes |

Use `rememberSaveable` for things the user did: a count, a choice, typed text. Neither one keeps values after the app is fully closed. For that you need to save to the phone's storage, which is Chapter 15.

`rememberSaveable` works with simple values such as numbers, text and `true`/`false`. Keep saveable state simple.

## A "Save for Later" Toggle

Now give each book card a bookmark button. A **toggle** switches between two states, on and off.

```kotlin
@Composable
fun SaveForLaterButton() {
    var saved by rememberSaveable { mutableStateOf(false) }

    IconButton(onClick = { saved = !saved }) {
        Icon(
            painter = painterResource(
                if (saved) R.drawable.ic_bookmark else R.drawable.ic_bookmark_border
            ),
            contentDescription = if (saved) "Remove from saved" else "Save for later"
        )
    }
}
```

- `saved = !saved` flips the value: `false` becomes `true`, `true` becomes `false` (`!` means "not", Chapter 5).
- `if` is used as an expression to choose the picture and the words.
- The `contentDescription` changes too, so TalkBack users know what the next tap will do.

The card shows an outline bookmark. Tap it and it fills in. Tap again and it goes back to the outline.

## State Hoisting: Let the Parent Hold It

The button above keeps its own state. That causes a problem. The book card might want to show "Saved" in its text too, and later (Chapter 15) the app must store which books are saved. Nobody outside the button can see `saved`.

The fix is **state hoisting**. "Hoist" means lift up. You lift the state out of the small composable and into its parent. The small composable then gets two things passed down:

- the **value** to show (`saved: Boolean`), and
- a function to call **when it should change** (`onSavedChange: (Boolean) -> Unit`).

`(Boolean) -> Unit` is a **function type** (Chapter 7): "a function that takes a `Boolean` and gives back nothing useful".

```kotlin
@Composable
fun SaveForLaterButton(
    saved: Boolean,
    onSavedChange: (Boolean) -> Unit
) {
    IconButton(onClick = { onSavedChange(!saved) }) {
        Icon(
            painter = painterResource(
                if (saved) R.drawable.ic_bookmark else R.drawable.ic_bookmark_border
            ),
            contentDescription = if (saved) "Remove from saved" else "Save for later"
        )
    }
}
```

The button no longer owns any state. It just shows what it is told and reports taps. The parent decides:

```kotlin
@Composable
fun BookCard(
    book: Book,
    saved: Boolean,
    onSavedChange: (Boolean) -> Unit,
    modifier: Modifier = Modifier
) {
    Card(modifier = modifier.fillMaxWidth()) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(book.title, style = MaterialTheme.typography.titleMedium)
                Text(book.author, style = MaterialTheme.typography.bodyMedium)
                if (saved) {
                    Text(
                        "Saved for later",
                        style = MaterialTheme.typography.labelMedium,
                        color = MaterialTheme.colorScheme.primary
                    )
                }
            }
            SaveForLaterButton(saved = saved, onSavedChange = onSavedChange)
        }
    }
}

@Composable
fun LibraryScreen(modifier: Modifier = Modifier) {
    var saved by rememberSaveable { mutableStateOf(false) }

    BookCard(
        book = sampleBooks[0],
        saved = saved,
        onSavedChange = { newValue -> saved = newValue },
        modifier = modifier
    )
}
```

(The cover picture from Chapter 10 is left out here to keep the code short. Put it back at the start of the `Row`.)

Follow one tap:

```text
LibraryScreen   holds: saved = false
   | passes saved=false down
   v
BookCard
   | passes it on
   v
SaveForLaterButton  shows outline
   | tap! calls onSavedChange(true)
   ^
LibraryScreen   sets saved = true
   -> recomposition: all three redraw
```

**Values go down, events go up.** This one sentence is the whole idea of state hoisting. It makes small composables easy to reuse and test, and the parent stays in charge of the data.

## 🔮 Predict the Screen

```kotlin
var count by remember { mutableIntStateOf(10) }
Button(onClick = { count -= 2 }) { Text("Count: $count") }
```

The button is tapped three times. What does it say?

<details>
<summary>Show answer</summary>

`Count: 4`. It starts at 10 and goes 8, 6, 4. `count -= 2` means `count = count - 2`. Each change causes a recomposition, so the button's text updates every time.

</details>

## ⚠️ Common Mistake

**1. Forgetting `remember`.**

```kotlin
var count by mutableIntStateOf(0)   // no remember
```

What happens: Android Studio shows a red warning that state is created during composition without `remember`. If you run it anyway, every tap changes the value, Compose redraws, and the redraw creates a brand-new box holding 0. The number never seems to move. Fix:

```kotlin
var count by remember { mutableIntStateOf(0) }
```

**2. Missing the `getValue` / `setValue` imports.**

What happens: the word `by` is underlined in red with a message that the property delegate must have a `getValue` method. Add both imports:

```kotlin
import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
```

## ✍️ Try It

Add a "Returned" button next to "Add one" so Zainab can count returned books too.

1. Add a second state: `var returned by rememberSaveable { mutableIntStateOf(0) }`.
2. Show a second `Text` line: `Books returned today: …`.
3. Make **New day** reset both numbers.
4. Turn the emulator sideways and check both numbers survive.

*Hint:* a lambda can hold two lines: `onClick = { count = 0; returned = 0 }`, or put each on its own line inside the braces.

## 📝 Recap

- Buttons take an `onClick` lambda and a trailing lambda for their content (Chapter 7).
- State is a value that changes and is shown on screen. A plain `var` is not watched and is reset on every redraw.
- `remember { mutableStateOf(…) }` (or `mutableIntStateOf` for numbers) makes a watched value that is kept between redraws; `by` lets you use it like a normal variable, with the `getValue`/`setValue` imports.
- Recomposition means Compose runs your composable again when state it reads changes.
- `rememberSaveable` also survives turning the phone.
- State hoisting: the parent holds the state; values go down, events go up.

## 📖 Key Terms

- **State**: a value that can change and that the screen shows.
- **Recomposition**: Compose running a composable again to redraw it after state changes.
- **remember**: keeps a value between recompositions.
- **rememberSaveable**: keeps a value between recompositions and when the screen is rebuilt, for example on rotation.
- **Delegate (`by`)**: lets a variable pass its reading and writing on to another object.
- **State hoisting**: moving state up to a parent and passing down a value plus an "on change" function.

## 🏆 Practice

### 🟢 Level 1: Recall
1. What are the two jobs that `mutableStateOf` and `remember` do?
2. Which survives turning the phone: `remember` or `rememberSaveable`?
3. Finish the sentence about state hoisting: "Values go …, events go …"

<details>
<summary>Show answer</summary>

1. `mutableStateOf` makes the value **watched**, so Compose redraws when it changes. `remember` **keeps** the value between redraws so it is not reset.
2. `rememberSaveable`.
3. "Values go down, events go up."

</details>

### 🟡 Level 2: Apply
Write `ReadingModeSwitch()`: a `TextButton` that says `Show shelf numbers` or `Hide shelf numbers`. Under it, a `Text` showing `Shelf: Science A3` appears only when the shelf numbers are shown. Use `rememberSaveable`.

<details>
<summary>Show answer</summary>

```kotlin
@Composable
fun ReadingModeSwitch() {
    var showShelf by rememberSaveable { mutableStateOf(false) }
    Column {
        TextButton(onClick = { showShelf = !showShelf }) {
            Text(if (showShelf) "Hide shelf numbers" else "Show shelf numbers")
        }
        if (showShelf) {
            Text("Shelf: Science A3")
        }
    }
}
```

At first only the button `Show shelf numbers` appears. One tap shows the shelf line and the button changes to `Hide shelf numbers`.

</details>

### 🔴 Level 3: Challenge
Hoist the borrowed counter.

1. Write `CounterRow(label: String, count: Int, onAdd: () -> Unit)`: a `Row` with the label and number on the left (with `weight(1f)`) and an `OutlinedButton` "+1" on the right. It holds no state.
2. Write `DeskScreen()` that holds `borrowed` and `returned` with `rememberSaveable` and shows two `CounterRow`s.
3. Add a `Text` under them: `Still out today: …`, which is borrowed minus returned (never below 0).
4. Add a `Button` "New day" that resets both.

<details>
<summary>Show one possible answer</summary>

```kotlin
@Composable
fun CounterRow(label: String, count: Int, onAdd: () -> Unit) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        Text(
            text = "$label: $count",
            style = MaterialTheme.typography.titleMedium,
            modifier = Modifier.weight(1f)
        )
        OutlinedButton(onClick = onAdd) { Text("+1") }
    }
}

@Composable
fun DeskScreen(modifier: Modifier = Modifier) {
    var borrowed by rememberSaveable { mutableIntStateOf(0) }
    var returned by rememberSaveable { mutableIntStateOf(0) }
    val stillOut = maxOf(borrowed - returned, 0)

    Column(
        modifier = modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        CounterRow("Borrowed", borrowed, onAdd = { borrowed++ })
        CounterRow("Returned", returned, onAdd = { returned++ })
        Text("Still out today: $stillOut")
        Button(onClick = {
            borrowed = 0
            returned = 0
        }) {
            Text("New day")
        }
    }
}
```

`stillOut` is a normal `val` worked out from state. It does not need its own `remember`: every recomposition works it out again from the latest numbers. `maxOf` gives the larger of two numbers, so the result never drops below 0. `onAdd = onAdd` passes the parent's lambda straight to the button: the event goes up.

</details>
