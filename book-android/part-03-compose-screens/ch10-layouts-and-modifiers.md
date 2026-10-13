# Chapter 10: Layouts and Modifiers 📐

## 🌟 Real-Life Story

Think about arranging books on a shelf. You can stand them side by side in a **row**. You can stack them on top of each other in a **column**. Or you can put a small "New!" sticker on top of one cover, so two things share the same spot. You also decide the details: how much gap between books, whether the shelf has a coloured edge, whether the corners are rounded. Compose works the same way. `Row`, `Column` and `Box` arrange things, and **modifiers** decide the gaps, sizes, colours and corners.

## 🎯 What You Will Learn

- Arrange composables with `Column`, `Row`, `Box` and `Spacer`.
- Control spacing and lining up with `Arrangement` and `Alignment`.
- Chain modifiers such as `padding`, `fillMaxWidth`, `size`, `background`, `clip` and `border`.
- Explain why the order of modifiers changes what you see.
- Turn the plain book card from Chapter 9 into a tidy Material 3 `Card`.

## 📚 Three Layout Boxes: Column, Row and Box

At the end of Chapter 9, the `BookCard` was squeezed into one corner. Compose needs to be told how to arrange things. Three layout composables do almost all the work.

```text
 Column        Row              Box
+------+   +----+----+----+   +--------+
|  A   |   | A  | B  | C  |   | A    B |
+------+   +----+----+----+   |  (on   |
|  B   |                      |   top) |
+------+                      +--------+
|  C   |
+------+
```

| Layout | Puts children… | Library example |
|---|---|---|
| `Column` | top to bottom | Title, then author, then shelf |
| `Row` | left to right | Cover picture next to the text |
| `Box` | on top of each other | An "On loan" tag on a cover |

Each one takes its children inside `{ }`, after the brackets. You know this from Chapter 7: it is a **trailing lambda**. The code inside the braces describes what goes into the layout.

```kotlin
Row {
    Text("Shelf:")
    Text("Science A3")
}
```

The phone shows:

```text
Shelf:Science A3
```

The two texts touch. There is no gap yet. Spacing comes next.

> In Arabic or Urdu, the phone reads right to left, so a `Row` starts from the right. Compose does this for you.

## ↔️ Spacing with `Spacer` and `Arrangement`

### `Spacer`: an empty gap

`Spacer` is an invisible block that only takes up room.

```kotlin
Row {
    Text("Shelf:")
    Spacer(modifier = Modifier.width(8.dp))
    Text("Science A3")
}
```

```text
Shelf:  Science A3
```

In a `Column` use `Modifier.height(8.dp)` instead, to make a gap going down.

### `Arrangement`: spacing for all children

Putting a `Spacer` between every pair gets tiring. `Arrangement` spaces all the children at once. A `Column` takes `verticalArrangement`. A `Row` takes `horizontalArrangement`.

```kotlin
Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
    Text("Our Solar System")
    Text("Amina Yusuf")
    Text("Shelf: Science A3")
}
```

Now each line has a 4 dp gap under it, except the last.

| Arrangement | What it does in a Row |
|---|---|
| `Arrangement.Start` | All children at the start (default) |
| `Arrangement.spacedBy(8.dp)` | 8 dp between each pair |
| `Arrangement.SpaceBetween` | First at the start, last at the end |
| `Arrangement.Center` | All children in the middle |

`SpaceBetween` only spreads things out when the `Row` is wider than its children, for example when it fills the screen width.

## 🎯 Lining Up with `Alignment`

**Arrangement** is about the main direction (down a `Column`, across a `Row`). **Alignment** is about the other direction.

| Layout | Main direction | Cross direction |
|---|---|---|
| `Column` | `verticalArrangement` | `horizontalAlignment` |
| `Row` | `horizontalArrangement` | `verticalAlignment` |
| `Box` | — | `contentAlignment` |

The two most common lines:

```kotlin
Column(horizontalAlignment = Alignment.CenterHorizontally) { … }
Row(verticalAlignment = Alignment.CenterVertically) { … }
```

The first centres each child left-to-right. The second centres each child top-to-bottom, so a small icon lines up with the middle of the text next to it.

A `Box` uses one alignment for both directions, such as `Alignment.TopEnd` (top corner on the end side) or `Alignment.Center`:

```kotlin
Box(contentAlignment = Alignment.BottomCenter) {
    Image(
        painter = painterResource(R.drawable.book_cover),
        contentDescription = "Cover of Our Solar System",
        modifier = Modifier.size(120.dp)
    )
    Text("New!")
}
```

The phone shows the cover with the word "New!" sitting on top of it, at the bottom centre of the picture.

## 🎛️ Modifiers: Size, Space and Look

A **modifier** changes how a composable is sized, spaced or drawn. Almost every composable takes a `modifier` parameter. You build one by starting with `Modifier` and adding settings with dots. This is called a **modifier chain**.

```kotlin
Text(
    text = "Our Solar System",
    modifier = Modifier
        .fillMaxWidth()
        .background(Color(0xFFE3F2FD))
        .padding(16.dp)
)
```

The phone shows a light blue strip across the whole width, with the title 16 dp in from every edge:

```text
+----------------------------------+
|                                  |
|  Our Solar System                |
|                                  |
+----------------------------------+
```

`Color(0xFFE3F2FD)` is a colour written as a hex number, like `#E3F2FD` in CSS. `FF` at the front means "fully solid".

The modifiers you will use most:

| Modifier | Example | What it does |
|---|---|---|
| `padding` | `.padding(16.dp)` | Empty space around the content |
| `padding` | `.padding(horizontal = 16.dp)` | Space on the left and right only |
| `fillMaxWidth` | `.fillMaxWidth()` | As wide as the parent allows |
| `fillMaxSize` | `.fillMaxSize()` | Fill all the space |
| `size` | `.size(80.dp)` | Exact width and height |
| `width` / `height` | `.height(48.dp)` | One side only |
| `background` | `.background(Color.LightGray)` | Paint behind |
| `clip` | `.clip(RoundedCornerShape(8.dp))` | Cut to a shape |
| `border` | `.border(1.dp, Color.Gray, shape)` | Draw an outline |
| `weight` | `.weight(1f)` | Share the leftover space (Row/Column only) |

`weight(1f)` is handy in a `Row`: the child with a weight takes all the space the others do not need. A long title then wraps onto two lines instead of pushing other things off the screen.

## 🔢 Why Modifier Order Matters

Modifiers are applied **from top to bottom**, one after another. Each one wraps around what comes after it. Compare these two:

```kotlin
// A: padding first, then background
Text("Kind Words", modifier = Modifier
    .padding(16.dp)
    .background(Color.Yellow))

// B: background first, then padding
Text("Kind Words", modifier = Modifier
    .background(Color.Yellow)
    .padding(16.dp))
```

```text
A: padding outside      B: padding inside
                        +----------------+
   +----------+         |                |
   |Kind Words|         |   Kind Words   |
   +----------+         |                |
                        +----------------+
```

- In **A**, the 16 dp of space is added first, *outside*. The yellow paint covers only the text.
- In **B**, the yellow is painted first over everything. Then the 16 dp of space sits *inside* the yellow.

The same rule decides whether `clip` works:

```kotlin
// Wrong: background is painted before the clip
Modifier.background(Color.Yellow).clip(RoundedCornerShape(12.dp))

// Right: cut the shape first, then paint inside it
Modifier.clip(RoundedCornerShape(12.dp)).background(Color.Yellow)
```

A good habit: read a chain aloud from the top. "First clip to rounded corners, then paint yellow, then add space inside."

## 🃏 The Material 3 `Card`

You could build a card yourself from `Column`, `clip`, `background` and `border`. Material 3 already has one that matches the theme: `Card`. It has rounded corners, a soft background colour and its children stacked like a `Column`.

```kotlin
Card(modifier = Modifier.fillMaxWidth()) {
    Text("Our Solar System", modifier = Modifier.padding(16.dp))
}
```

| Card type | Look |
|---|---|
| `Card` | Filled with a soft theme colour |
| `ElevatedCard` | Small shadow, seems to float |
| `OutlinedCard` | Thin outline, plain background |

Colours come from the theme with `MaterialTheme.colorScheme`, for example `MaterialTheme.colorScheme.primaryContainer`. Using theme colours instead of fixed ones like `Color.Yellow` means dark mode works later (Chapter 16) without changing this code.

## 📇 The Laid-Out Book Card

Now rebuild `BookCard` from Chapter 9. The plan:

```text
Card (fills the width, 16 dp inside)
 Row
 +--------+-------------------------+
 | cover  | Column (weight 1f)      |
 | 80x110 |  Our Solar System       |
 | round  |  Amina Yusuf            |
 | corner |  Shelf: Science A3      |
 +--------+-------------------------+
```

The full file, with imports:

```kotlin
package org.juniorcoders.library

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import org.juniorcoders.library.ui.theme.SchoolLibraryTheme

@Composable
fun BookCard(book: Book, modifier: Modifier = Modifier) {
    Card(modifier = modifier.fillMaxWidth()) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Image(
                painter = painterResource(R.drawable.book_cover),
                contentDescription = "Cover of ${book.title}",
                contentScale = ContentScale.Crop,
                modifier = Modifier
                    .width(80.dp)
                    .height(110.dp)
                    .clip(RoundedCornerShape(8.dp))
            )
            Spacer(modifier = Modifier.width(16.dp))
            Column(
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                Text(
                    text = book.title,
                    style = MaterialTheme.typography.titleMedium
                )
                Text(
                    text = book.author,
                    style = MaterialTheme.typography.bodyMedium
                )
                Text(
                    text = stringResource(R.string.shelf_label, book.shelf),
                    style = MaterialTheme.typography.labelMedium,
                    color = MaterialTheme.colorScheme.primary
                )
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun BookCardPreview() {
    SchoolLibraryTheme {
        BookCard(
            book = sampleBooks[1],
            modifier = Modifier.padding(16.dp)
        )
    }
}
```

Read it from the outside in:

1. `Card` fills the width. It uses `modifier.fillMaxWidth()` with a small `m`, so the caller's modifier (the padding in the preview) is kept and `fillMaxWidth` is added to it.
2. Inside, a `Row` with 16 dp padding puts the cover and the text side by side, centred top-to-bottom.
3. The cover is 80 × 110 dp. It is cropped to fill that space, and `clip` rounds its corners.
4. A `Spacer` puts 16 dp between the cover and the text.
5. The text `Column` has `weight(1f)`, so it takes the rest of the width. The long title "Clean Water for Every Village" wraps onto two lines instead of running off the card.
6. The shelf line uses the theme's `primary` colour so it stands out.

The preview shows:

```text
+----------------------------------+
| +------+                         |
| |cover |  Clean Water for Every  |
| |      |  Village                |
| |      |  Bilal Ahmed            |
| +------+  Shelf: Geography B1    |
+----------------------------------+
```

In `MainActivity`, show it with some space around it:

```kotlin
Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
    BookCard(
        book = sampleBooks[0],
        modifier = Modifier
            .padding(innerPadding)
            .padding(16.dp)
    )
}
```

Two `padding` calls in a row simply add up: first the space for the status bar, then 16 dp more.

## 🔮 Predict the Screen

```kotlin
Row(
    modifier = Modifier.fillMaxWidth(),
    horizontalArrangement = Arrangement.SpaceBetween
) {
    Text("Kotlin for Young Builders")
    Text("D4")
}
```

<details>
<summary>Show answer</summary>

The title sits at the start (left) edge and `D4` sits at the far end (right) edge, with empty space between them. The `Row` fills the width, so `SpaceBetween` has room to push the two apart.

</details>

## ⚠️ Common Mistake

**1. Putting `padding` after `background` when you wanted a gap outside.**

```kotlin
Text("Gardens of the World", modifier = Modifier
    .background(Color.LightGray)
    .padding(16.dp))
```

What happens: you wanted space between cards, but the grey now fills the space too, so the cards seem to touch. Swap the order to get space outside the grey:

```kotlin
Text("Gardens of the World", modifier = Modifier
    .padding(16.dp)
    .background(Color.LightGray))
```

**2. Using `weight` outside a `Row` or `Column`.**

```kotlin
Box {
    Text("Title", modifier = Modifier.weight(1f))   // red error
}
```

What happens: Android Studio underlines `weight` in red as an unresolved reference (it cannot find it). `weight` only exists for the direct children of a `Row` or `Column`, because only they share out leftover space. Move the `Text` into a `Row` or `Column`.

## ✍️ Try It

Add an "On loan" tag on top of the cover for books that are not available.

1. Wrap the cover `Image` in a `Box` with `contentAlignment = Alignment.BottomCenter`.
2. Inside the `Box`, after the image, add `if (!book.available) { Text(...) }`.
3. Give the tag a background and padding: `Modifier.background(MaterialTheme.colorScheme.errorContainer).padding(horizontal = 6.dp)`.
4. Preview it with `sampleBooks[1]` (on loan) and `sampleBooks[0]` (available).

*Hint:* `if` works inside composables exactly as in Chapter 5. When the condition is false, nothing is drawn.

## 📝 Recap

- `Column` stacks children down, `Row` places them across, `Box` lays them on top of each other.
- `Spacer` adds one gap; `Arrangement.spacedBy` adds the same gap between all children.
- Arrangement works along the layout's main direction; Alignment works across it.
- Modifiers are chained with dots and applied from top to bottom, so order changes the result.
- `Card` gives a theme-coloured, rounded container; theme colours come from `MaterialTheme.colorScheme`.

## 📖 Key Terms

- **Layout**: a composable that arranges other composables (`Column`, `Row`, `Box`).
- **Modifier**: a setting that changes a composable's size, space or look.
- **Modifier chain**: several modifiers joined with dots, applied in order.
- **Arrangement**: how children are spaced along the main direction.
- **Alignment**: how children line up across the other direction.
- **Weight**: a share of the leftover space in a `Row` or `Column`.

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which layout puts children side by side?
2. In a `Column`, which parameter centres children left-to-right?
3. Why should `clip` come before `background`?

<details>
<summary>Show answer</summary>

1. `Row`.
2. `horizontalAlignment = Alignment.CenterHorizontally`.
3. Modifiers are applied in order. `clip` must cut the shape first so the background that follows is painted inside the rounded shape. If `background` comes first, it is already painted square.

</details>

### 🟡 Level 2: Apply
Write `ShelfBadge(shelf: String)`: the shelf name in `labelLarge`, with 8 dp of padding inside a background with rounded corners (`RoundedCornerShape(12.dp)`) in `MaterialTheme.colorScheme.secondaryContainer`, and a 1 dp outline in `MaterialTheme.colorScheme.secondary`.

<details>
<summary>Show answer</summary>

```kotlin
@Composable
fun ShelfBadge(shelf: String) {
    val shape = RoundedCornerShape(12.dp)
    Text(
        text = shelf,
        style = MaterialTheme.typography.labelLarge,
        modifier = Modifier
            .clip(shape)
            .background(MaterialTheme.colorScheme.secondaryContainer)
            .border(1.dp, MaterialTheme.colorScheme.secondary, shape)
            .padding(8.dp)
    )
}
```

The order is: cut the shape, paint inside it, draw the outline on its edge, then add space inside so the text does not touch the outline. `background` and `border` come from `androidx.compose.foundation`.

</details>

### 🔴 Level 3: Challenge
Build a "library at a glance" header to sit above the book card.

1. Make a `Card` that fills the width, using `ElevatedCard`.
2. Inside, a `Row` with `Arrangement.SpaceBetween` holding two small `Column`s.
3. Left column: the number `5` in `headlineMedium` and `books` in `labelMedium` under it.
4. Right column: the number of available books and the word `available`. Work it out with `sampleBooks.count { it.available }`.
5. Centre each column's text with `horizontalAlignment`, and give the `Row` 16 dp of padding.

<details>
<summary>Show one possible answer</summary>

```kotlin
@Composable
fun LibrarySummary(books: List<Book>, modifier: Modifier = Modifier) {
    val availableCount = books.count { it.available }
    ElevatedCard(modifier = modifier.fillMaxWidth()) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text("${books.size}", style = MaterialTheme.typography.headlineMedium)
                Text("books", style = MaterialTheme.typography.labelMedium)
            }
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text("$availableCount", style = MaterialTheme.typography.headlineMedium)
                Text("available", style = MaterialTheme.typography.labelMedium)
            }
        }
    }
}
```

With `sampleBooks` the card shows `5 books` on the left and `3 available` on the right. The `Row` needs `fillMaxWidth()` too, or `SpaceBetween` has no extra room to share out.

</details>
