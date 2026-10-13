# Chapter 13: Lists That Scroll

## 🌟 Real-Life Story

Imagine the library printed its whole catalogue, every one of 2,000 books, on one enormous sheet of paper, and handed it to each student who walked in. It would take ages to print and be very heavy to carry. A smarter librarian uses a small window card: you slide it down a long list and only read the few lines showing through the window. Phones work the same way. The screen is a small window. A **lazy list** only builds the rows you can see right now, and builds new ones as you scroll. In this chapter the School Library app finally shows its full, scrolling list of books.

## 🎯 What You Will Learn

- Explain why a plain `Column` is a poor choice for long lists.
- Show a list with `LazyColumn` and `items(list, key = { it.id })`.
- Space a list with `contentPadding` and `Arrangement.spacedBy`.
- Make rows tappable with `Modifier.clickable` and show an "Available" or "On loan" label.
- Join the Chapter 12 search box to the list, and know when to use `LazyRow`.

## Why a Column Is Not Enough

In Chapter 12 you showed search results with `forEach` inside a `Column`:

```kotlin
Column {
    sampleBooks.forEach { book -> BookCard(book) }
}
```

With five books this is fine. With a real library it has two problems.

| Problem | What you see |
|---|---|
| A `Column` does not scroll | Books below the bottom edge are cut off and cannot be reached |
| A `Column` builds every row at once | With 2,000 books the screen is slow to open and uses lots of memory |

You *can* make a `Column` scroll with `Modifier.verticalScroll(rememberScrollState())`. That fixes the first problem but not the second: it still builds all 2,000 cards, even though only six fit on the screen.

`verticalScroll` is fine for a short page with a fixed amount of content, such as a settings page or a long paragraph. For a list of data that can grow, use a lazy list.

## `LazyColumn`: Only Build What Is Visible

**Lazy** here means "do work only when it is needed". A `LazyColumn` builds rows only when they scroll into view. Rows that scroll out of view are thrown away, and their space is reused.

```text
 the whole list         the phone screen
 +---------------+
 | book 1        |      (scrolled past,
 | book 2        |       not built)
 +---------------+  +------------------+
 | book 3        |  | book 3           |
 | book 4        |  | book 4           |
 | book 5        |  | book 5           |
 +---------------+  +------------------+
 | book 6        |      (not reached,
 | ...           |       not built yet)
 | book 2000     |
 +---------------+
```

Here is the School Library list as a full file with imports:

```kotlin
package org.juniorcoders.library

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun BookList(books: List<Book>, modifier: Modifier = Modifier) {
    LazyColumn(
        modifier = modifier,
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        items(books, key = { it.id }) { book ->
            BookCard(book = book)
        }
    }
}
```

`BookCard` is the laid-out card from Chapter 10. Call it from `MainActivity`:

```kotlin
Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
    BookList(
        books = sampleBooks,
        modifier = Modifier.padding(innerPadding)
    )
}
```

The phone shows all five book cards, one under another, with 12 dp gaps. On a small phone the last card goes below the edge, and you can now swipe up to reach it.

### Reading the code

- `LazyColumn { … }` looks like a `Column`, but the braces are different. You do not put composables straight inside. You describe the **items**.
- `items(books) { book -> … }` says: "for each book in the list, make a row like this". The lambda gets one `Book` at a time, like `forEach`.
- `key = { it.id }` gives each row a name tag: the book's `id`. If the list changes order, or a book is removed, Compose uses the tags to know which row is which. Rows then keep their own state (such as a ticked bookmark) instead of passing it to a neighbour. Always use a key that is unique and never changes, which is exactly what an `id` is.
- `items` needs its own import: `androidx.compose.foundation.lazy.items`. Without it Android Studio picks a different `items` and shows a confusing type error.

### Single items and headers

Besides `items`, you can add one-off rows with `item { … }`:

```kotlin
LazyColumn {
    item {
        Text("School Library", style = MaterialTheme.typography.headlineSmall)
    }
    items(books, key = { it.id }) { book ->
        BookCard(book = book)
    }
    item {
        Text("End of the list")
    }
}
```

The heading scrolls away with the list, like the title printed at the top of a catalogue page.

## Spacing: `contentPadding` and `spacedBy`

There are two kinds of space in a list.

```text
+------------------------------+
|        contentPadding        |
|  +------------------------+  |
|  | book 1                 |  |
|  +------------------------+  |
|        spacedBy(12.dp)       |
|  +------------------------+  |
|  | book 2                 |  |
|  +------------------------+  |
|        contentPadding        |
+------------------------------+
```

| Setting | Where the space goes |
|---|---|
| `contentPadding = PaddingValues(16.dp)` | Around the whole list: before the first row, after the last, and at the sides |
| `verticalArrangement = Arrangement.spacedBy(12.dp)` | Between each pair of rows |

Why not `Modifier.padding(16.dp)` on the `LazyColumn` instead? Padding on the modifier makes the scroll window itself smaller, so cards are cut off 16 dp before the screen edge as you scroll. `contentPadding` keeps the window full size and only adds space at the start and end of the content. It looks much better.

`PaddingValues` can also be different on each side: `PaddingValues(horizontal = 16.dp, vertical = 8.dp)`.

## An "Available / On Loan" Label

Each card should show whether the book can be borrowed right now. First the rule, as a plain Kotlin function you can test:

```kotlin
fun statusLabel(book: Book): String = if (book.available) "Available" else "On loan"

fun main() {
    for (book in sampleBooks) println("${book.title} - ${statusLabel(book)}")
    println(sampleBooks.count { it.available })
}
```

```text
Our Solar System - Available
Clean Water for Every Village - On loan
Kind Words, Strong Hearts - Available
Kotlin for Young Builders - Available
Gardens of the World - On loan
3
```

(As before, the program needs `Book` and `sampleBooks` above `main`.)

Now a small label composable, coloured from the theme so it also works in dark mode later:

```kotlin
@Composable
fun StatusLabel(book: Book) {
    val background = if (book.available) {
        MaterialTheme.colorScheme.secondaryContainer
    } else {
        MaterialTheme.colorScheme.errorContainer
    }
    Text(
        text = statusLabel(book),
        style = MaterialTheme.typography.labelMedium,
        modifier = Modifier
            .clip(RoundedCornerShape(8.dp))
            .background(background)
            .padding(horizontal = 8.dp, vertical = 4.dp)
    )
}
```

The label shows the **word** as well as the colour. A student who cannot tell red from green still knows the answer, and TalkBack reads it aloud.

## Tappable Rows with `Modifier.clickable`

A list is more useful when you can tap a book. `Modifier.clickable { … }` makes any composable react to taps. Like a button, it shows a ripple when touched.

```kotlin
@Composable
fun BookRow(book: Book, onClick: () -> Unit, modifier: Modifier = Modifier) {
    Card(modifier = modifier.fillMaxWidth()) {
        Row(
            modifier = Modifier
                .clickable(onClick = onClick)
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(book.title, style = MaterialTheme.typography.titleMedium)
                Text(book.author, style = MaterialTheme.typography.bodyMedium)
            }
            Spacer(modifier = Modifier.width(8.dp))
            StatusLabel(book)
        }
    }
}
```

Two details:

- `clickable` comes **before** `padding` (modifier order, Chapter 10). The whole card, including its padding, is then tappable. If `padding` came first, tapping near the edge would do nothing.
- `onClick` is hoisted (Chapter 11). The row does not decide what a tap does; it reports the tap up to the parent.

The parent remembers which book was chosen and shows it at the top:

```kotlin
@Composable
fun LibraryScreen(modifier: Modifier = Modifier) {
    var chosenTitle by rememberSaveable { mutableStateOf("") }

    Column(modifier = modifier) {
        Text(
            text = if (chosenTitle.isEmpty()) "Tap a book" else "You chose: $chosenTitle",
            style = MaterialTheme.typography.titleMedium,
            modifier = Modifier.padding(16.dp)
        )
        LazyColumn(
            contentPadding = PaddingValues(horizontal = 16.dp, vertical = 8.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            items(sampleBooks, key = { it.id }) { book ->
                BookRow(book = book, onClick = { chosenTitle = book.title })
            }
        }
    }
}
```

Tap "Kind Words, Strong Hearts". The screen shows:

```text
You chose: Kind Words, Strong Hearts

+----------------------------------+
| Our Solar System     [Available] |
| Amina Yusuf                      |
+----------------------------------+
+----------------------------------+
| Clean Water for      [On loan]   |
| Every Village                    |
| Bilal Ahmed                      |
+----------------------------------+
| ...                              |
```

In Chapter 14 a tap will open a separate detail screen for the book instead.

> Material 3's `Card` also has its own `onClick` parameter: `Card(onClick = onClick) { … }`. It does the same job. This chapter uses `clickable` because it works on any composable, not only cards.

## Search Plus List

Now join the search box from Chapter 12 to the lazy list. This is the School Library app's main screen.

```kotlin
@Composable
fun LibraryScreen(modifier: Modifier = Modifier) {
    var query by rememberSaveable { mutableStateOf("") }
    var chosenTitle by rememberSaveable { mutableStateOf("") }
    val matches = filterBooks(sampleBooks, query)

    Column(modifier = modifier.fillMaxSize()) {
        OutlinedTextField(
            value = query,
            onValueChange = { query = it },
            label = { Text("Search by title") },
            singleLine = true,
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        )
        Text(
            text = if (chosenTitle.isEmpty()) "${matches.size} books" else "You chose: $chosenTitle",
            style = MaterialTheme.typography.labelLarge,
            modifier = Modifier.padding(horizontal = 16.dp)
        )
        if (matches.isEmpty()) {
            Text(
                "No books found. Check the spelling or try fewer words.",
                modifier = Modifier.padding(16.dp)
            )
        } else {
            LazyColumn(
                modifier = Modifier.weight(1f),
                contentPadding = PaddingValues(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                items(matches, key = { it.id }) { book ->
                    BookRow(book = book, onClick = { chosenTitle = book.title })
                }
            }
        }
    }
}
```

`filterBooks` is the function from Chapter 12. How the screen behaves:

- At the start, the box is empty, so all 5 books show under `5 books`.
- Type `kind`. The list shrinks to one card, "Kind Words, Strong Hearts", marked Available.
- Type `zzz`. The friendly "No books found" message replaces the list.
- The search box stays at the top while only the list scrolls underneath it, because the box is outside the `LazyColumn`.

`Modifier.weight(1f)` on the `LazyColumn` tells it to take all the height left below the search box. Because each row has a `key`, Compose can tell which cards stayed when the list shrinks, and does not mix them up.

## `LazyRow`: Lists That Scroll Sideways

`LazyRow` is the same idea, turned sideways. It suits a short strip of things, such as "New this week" covers above the main list.

```kotlin
LazyRow(
    contentPadding = PaddingValues(horizontal = 16.dp),
    horizontalArrangement = Arrangement.spacedBy(8.dp)
) {
    items(sampleBooks, key = { it.id }) { book ->
        Text(
            text = book.shelf,
            modifier = Modifier
                .clip(RoundedCornerShape(8.dp))
                .background(MaterialTheme.colorScheme.primaryContainer)
                .padding(12.dp)
        )
    }
}
```

The phone shows a strip of shelf names (`Science A3`, `Geography B1`, `Stories C2`…) that you swipe left and right. Note the change: a `LazyRow` uses `horizontalArrangement`, a `LazyColumn` uses `verticalArrangement`.

There is also `LazyVerticalGrid` for grids, such as a wall of book covers. It works the same way, with a `columns` setting.

## 🔮 Predict the Screen

```kotlin
LazyColumn {
    item { Text("Books on loan") }
    items(sampleBooks.filter { !it.available }, key = { it.id }) { book ->
        Text(book.title)
    }
}
```

<details>
<summary>Show answer</summary>

```text
Books on loan
Clean Water for Every Village
Gardens of the World
```

The heading comes from `item`. `filter { !it.available }` keeps only the two books that are not available, and `items` makes one row for each.

</details>

## ⚠️ Common Mistake

**1. Putting a `LazyColumn` inside a scrolling `Column`.**

```kotlin
Column(modifier = Modifier.verticalScroll(rememberScrollState())) {
    Text("School Library")
    LazyColumn {
        items(sampleBooks, key = { it.id }) { BookCard(it) }
    }
}
```

What happens: the app crashes as soon as the screen opens. The red text in **Logcat** says a vertically scrollable component was measured with an infinite maximum height. The outer `Column` offers endless height, and a `LazyColumn` cannot work out how many rows to build without a limit. Fix: let the `LazyColumn` do all the scrolling, and put the heading inside it with `item { }`:

```kotlin
LazyColumn {
    item { Text("School Library") }
    items(sampleBooks, key = { it.id }) { BookCard(it) }
}
```

**2. Using the list position as the key.**

```kotlin
items(books.size, key = { index -> index }) { index -> BookRow(books[index], onClick = {}) }
```

What happens: it runs, but the key for "the first row" stays 0 even when the search changes which book is first. Row state can end up on the wrong book. Fix: use the book's own unchanging id: `items(books, key = { it.id })`.

## ✍️ Try It

Add an "Available only" switch above the list.

1. Add state: `var availableOnly by rememberSaveable { mutableStateOf(false) }`.
2. Add a `TextButton` that flips it, saying `Show available only` or `Show all books`.
3. Work out the list in two steps: first `filterBooks(sampleBooks, query)`, then, if `availableOnly`, keep only `it.available` books.
4. Check: with an empty search and the switch on, 3 books should show.

*Hint:* `val shown = if (availableOnly) matches.filter { it.available } else matches`.

## 📝 Recap

- A `Column` builds every row and does not scroll; for lists of data, use a lazy list.
- `LazyColumn` builds only the rows on screen. Describe rows with `items(list, key = { it.id }) { … }` and one-off rows with `item { }`.
- `contentPadding` adds space around the content; `Arrangement.spacedBy` adds space between rows.
- `Modifier.clickable` (before `padding`) makes a whole row tappable; hoist the `onClick`.
- Show status with words and colour together, such as "Available" and "On loan".
- `LazyRow` scrolls sideways; never put a lazy list inside a `verticalScroll` in the same direction.

## 📖 Key Terms

- **Lazy list**: a list that builds rows only when they come into view.
- **Item**: one row in a lazy list.
- **Key**: a unique, unchanging name tag for each row, usually an `id`.
- **contentPadding**: space inside a scrolling list, around its content.
- **clickable**: a modifier that makes any composable react to taps.

## 🏆 Practice

### 🟢 Level 1: Recall
1. Why is a `LazyColumn` faster than a `Column` for 2,000 books?
2. What is the best `key` for a list of `Book`s, and why?
3. Which import does `items(books) { … }` need?

<details>
<summary>Show answer</summary>

1. A `LazyColumn` only builds the rows that are visible on screen and builds others as you scroll. A `Column` builds all 2,000 at once.
2. `key = { it.id }`: the id is unique for each book and never changes, so Compose can track each row even when the list is filtered or reordered.
3. `import androidx.compose.foundation.lazy.items`.

</details>

### 🟡 Level 2: Apply
Write `OnLoanList()`: a `LazyColumn` with 16 dp `contentPadding` and 8 dp between rows. It starts with a heading row `Books on loan (2)`, where the number is worked out from the data, then shows one `BookRow` for each book that is not available.

<details>
<summary>Show answer</summary>

```kotlin
@Composable
fun OnLoanList(modifier: Modifier = Modifier) {
    val onLoan = sampleBooks.filter { !it.available }
    LazyColumn(
        modifier = modifier,
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        item {
            Text(
                "Books on loan (${onLoan.size})",
                style = MaterialTheme.typography.titleLarge
            )
        }
        items(onLoan, key = { it.id }) { book ->
            BookRow(book = book, onClick = { })
        }
    }
}
```

The screen shows the heading `Books on loan (2)`, then the cards for "Clean Water for Every Village" and "Gardens of the World", both labelled On loan.

</details>

### 🔴 Level 3: Challenge
Bring back the "Save for later" bookmark from Chapter 11, for every book in the list.

1. In `LibraryScreen`, keep the saved books as a set of ids: `var savedIds by rememberSaveable { mutableStateOf(setOf<Int>()) }`.
2. Give `BookRow` two more parameters: `saved: Boolean` and `onSavedChange: (Boolean) -> Unit`, and put the `SaveForLaterButton` from Chapter 11 at the end of the row.
3. In `items`, pass `saved = book.id in savedIds`, and in `onSavedChange` add or remove the id: `savedIds = if (it) savedIds + book.id else savedIds - book.id`.
4. Above the list, show `Saved for later: N`.

<details>
<summary>Show one possible answer</summary>

```kotlin
@Composable
fun BookRow(
    book: Book,
    saved: Boolean,
    onSavedChange: (Boolean) -> Unit,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Card(modifier = modifier.fillMaxWidth()) {
        Row(
            modifier = Modifier
                .clickable(onClick = onClick)
                .padding(start = 16.dp, top = 8.dp, bottom = 8.dp, end = 4.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(book.title, style = MaterialTheme.typography.titleMedium)
                Text(book.author, style = MaterialTheme.typography.bodyMedium)
                StatusLabel(book)
            }
            SaveForLaterButton(saved = saved, onSavedChange = onSavedChange)
        }
    }
}

@Composable
fun LibraryScreen(modifier: Modifier = Modifier) {
    var savedIds by rememberSaveable { mutableStateOf(setOf<Int>()) }

    Column(modifier = modifier.fillMaxSize()) {
        Text(
            "Saved for later: ${savedIds.size}",
            style = MaterialTheme.typography.labelLarge,
            modifier = Modifier.padding(16.dp)
        )
        LazyColumn(
            modifier = Modifier.weight(1f),
            contentPadding = PaddingValues(horizontal = 16.dp, vertical = 8.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            items(sampleBooks, key = { it.id }) { book ->
                BookRow(
                    book = book,
                    saved = book.id in savedIds,
                    onSavedChange = { isSaved ->
                        savedIds = if (isSaved) savedIds + book.id else savedIds - book.id
                    },
                    onClick = { }
                )
            }
        }
    }
}
```

Tap the bookmarks on "Our Solar System" and "Kotlin for Young Builders": both fill in and the top line says `Saved for later: 2`. `savedIds + book.id` makes a **new** set with the id added; giving the state a new set is what tells Compose to redraw. The saved books are kept when the phone turns, but not after the app is closed. Chapter 15 fixes that by saving them on the phone.

</details>
