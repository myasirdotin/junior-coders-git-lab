# Chapter 9: Text and Images on the Screen 🖼️

## 🌟 Real-Life Story

Walk into the school library and look at the display board near the door. Each new book has a small card pinned to it: a picture of the cover, the title in big letters, and the author's name in smaller letters underneath. The librarian did not paint each card by hand. She has one card design and fills in different details for each book. In this chapter you build that card design for your phone. In Jetpack Compose it is a small function called `BookCard`, and it can show any book you give it.

## 🎯 What You Will Learn

- Explain what the `@Composable` word means and why screen functions need it.
- Show words with `Text` and change their size, weight and style.
- Keep words for users in `strings.xml` and read them with `stringResource`.
- Add a picture to your project and show it with `Image` and `painterResource`.
- Write a `contentDescription` for screen readers and check your work with `@Preview`.

## 🧱 Starting the School Library App

From this chapter on, you build one app step by step: the **School Library** app. Create it now.

1. In Android Studio choose **File → New → New Project**.
2. Pick **Empty Activity** (the one with the Compose logo) and press **Next**.
3. Name: `School Library`. Package name: `org.juniorcoders.library`. Language is Kotlin.
4. Press **Finish** and wait for Gradle to finish its first build.

Android Studio makes a theme named after the app, so your theme is called `SchoolLibraryTheme`. You saw the same files in Chapter 3.

Now add the `Book` class from Chapter 8. Right-click the `org.juniorcoders.library` folder, choose **New → Kotlin Class/File**, pick **File** and name it `Book`. Type this into `Book.kt`:

```kotlin
package org.juniorcoders.library

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
```

This is **sample data**: five made-up books so the screens have something to show. Later chapters keep using these same five books.

## 🏷️ What `@Composable` Means

A screen in Compose is built from small functions. Each one describes a piece of the screen. These functions carry a label written just above them: `@Composable`.

```kotlin
@Composable
fun Greeting() {
    Text(text = "Welcome to the School Library")
}
```

The `@` word is an **annotation**, a note for the Kotlin compiler. `@Composable` tells it: "This function draws part of the screen."

A composable function is different from the functions in Chapter 7 in three ways:

| Normal function | Composable function |
|---|---|
| Usually returns a value | Returns nothing; it *shows* things |
| Name starts with a small letter | Name starts with a capital letter |
| Can be called from anywhere | Only from another composable |

Names like `Greeting` and `BookCard` start with a capital letter because they work like nouns: "a greeting", "a book card". `Text` and `Image` are composables too. Google wrote them for you.

Think of composables as LEGO bricks. `Text` and `Image` are small bricks. You snap them together into a bigger brick, `BookCard`. Later you snap many `BookCard`s into a whole screen.

## ✏️ Showing Words with `Text`

`Text` shows a piece of writing. Its first parameter is the words. The other parameters are optional and have sensible defaults (you met default parameters in Chapter 7).

```kotlin
Text(
    text = "Our Solar System",
    fontSize = 24.sp,
    fontWeight = FontWeight.Bold
)
```

The phone shows:

```text
Our Solar System        (large, bold)
```

### Text sizes use `sp`

`24.sp` means 24 **scale-independent pixels**. An `sp` grows when a person chooses "large text" in the phone's settings. Some people with weak eyesight rely on this. Always use `sp` for text so your app respects their choice.

For spacing and picture sizes you use `dp` (density-independent pixels) instead. Chapter 10 uses `dp` a lot.

| Unit | Used for | Grows with the font-size setting? |
|---|---|---|
| `sp` | Text size | Yes |
| `dp` | Space, picture size | No |

### Useful `Text` parameters

| Parameter | Example | What it does |
|---|---|---|
| `text` | `"Gardens of the World"` | The words to show |
| `fontSize` | `20.sp` | How big the letters are |
| `fontWeight` | `FontWeight.Bold` | Thickness: `Normal`, `Medium`, `Bold` |
| `fontStyle` | `FontStyle.Italic` | Slanted letters |
| `color` | `Color.Gray` | Letter colour |
| `maxLines` | `1` | Cut long text after one line |
| `style` | `MaterialTheme.typography.titleLarge` | A ready-made text style |

### Ready-made styles from the theme

Choosing sizes by hand on every screen is slow. Different screens also end up with slightly different sizes. Material 3 gives you a set of named text styles called **typography**:

```kotlin
Text(
    text = "Our Solar System",
    style = MaterialTheme.typography.titleLarge
)
Text(
    text = "Amina Yusuf",
    style = MaterialTheme.typography.bodyMedium
)
```

The phone shows:

```text
Our Solar System        (title size)
Amina Yusuf             (reading size)
```

The most common styles, from biggest to smallest:

| Group | Styles | Use it for |
|---|---|---|
| Display | `displayLarge`, `displayMedium`, `displaySmall` | Very big numbers or words |
| Headline | `headlineLarge` … `headlineSmall` | Screen headings |
| Title | `titleLarge`, `titleMedium`, `titleSmall` | Card titles |
| Body | `bodyLarge`, `bodyMedium`, `bodySmall` | Normal reading text |
| Label | `labelLarge`, `labelMedium`, `labelSmall` | Buttons, small tags |

Use a style first. Change single parameters only when you need to. If you write both, the single parameter wins: `style = MaterialTheme.typography.bodyMedium, fontWeight = FontWeight.Bold` gives bold body text.

## 📄 Words for Users Live in `strings.xml`

Look in the Project panel at `app/res/values/strings.xml`. It already holds the app name:

```xml
<resources>
    <string name="app_name">School Library</string>
</resources>
```

Android keeps the words users read in this one file. Why not type them straight into the code?

- **Translation.** To make an Urdu or Arabic version, a translator copies this file into another folder and translates it. Your code does not change.
- **One place to fix.** A spelling mistake is fixed once, not on ten screens.

Add two lines of your own:

```xml
<resources>
    <string name="app_name">School Library</string>
    <string name="welcome">Welcome to the School Library</string>
    <string name="shelf_label">Shelf: %1$s</string>
</resources>
```

`%1$s` is a gap that will be filled with a piece of text later. Read it as "put the first value here".

Read them in a composable with `stringResource`:

```kotlin
Text(text = stringResource(R.string.welcome))
Text(text = stringResource(R.string.shelf_label, "Science A3"))
```

The phone shows:

```text
Welcome to the School Library
Shelf: Science A3
```

`R` is a class Android Studio builds for you. It holds an ID number for every resource in `res/`. `R.string.welcome` is the ID of your `welcome` line, so a typing mistake in the name becomes a red error straight away.

> In this book, later chapters often type short words straight into `Text("…")` to keep examples small. In a real app, move them into `strings.xml`.

Book titles and authors come from your data (`sampleBooks`), not from `strings.xml`. Only fixed words that are the same for every book belong there, such as "Shelf:".

## 🖼️ Showing a Picture with `Image`

### Step 1: add a picture to the project

Pictures, icons and shapes are called **drawables**. They live in `app/res/drawable/`.

Use a picture you made yourself, such as a drawing of a book cover or a photo of your own bookshelf. If you use someone else's picture, check that you are allowed to and say where it came from. That is honest work (*Amānah*).

The easiest way to add it is the **Resource Manager**:

1. Open **View → Tool Windows → Resource Manager**.
2. Choose the **Drawable** tab and press the **+** button, then **Import Drawables**.
3. Pick your picture file (PNG or JPG).
4. Give it the name `book_cover` and press **Next**, then **Import**.

You can also drag a file straight into the `res/drawable` folder in the Project panel.

Resource names have strict rules. Use only small letters, digits and underscores, and start with a letter.

| Name | Allowed? |
|---|---|
| `book_cover` | Yes |
| `cover2` | Yes |
| `Book Cover` | No: capital letter and space |
| `book-cover` | No: hyphen |

For a simple icon, right-click `res/drawable`, choose **New → Vector Asset**, press the **Clip art** button, search for "book" and pick one. Android Studio saves it as an XML drawing that stays sharp at any size.

### Step 2: show it

```kotlin
Image(
    painter = painterResource(R.drawable.book_cover),
    contentDescription = "Cover of Our Solar System",
    modifier = Modifier.size(120.dp)
)
```

- `painterResource(R.drawable.book_cover)` loads the picture by its ID. Notice that you leave out `.png`.
- `modifier = Modifier.size(120.dp)` makes it 120 dp wide and tall. Chapter 10 explains modifiers properly.
- `contentDescription` is explained next.

If the picture is not square, add `contentScale = ContentScale.Crop`. The picture then fills the square and the edges that do not fit are trimmed off, like a photo in a frame.

## 🦮 `contentDescription`: Pictures for Everyone

Some people cannot see the screen well. They use a **screen reader**. On Android it is called **TalkBack**. It reads the screen aloud. When TalkBack reaches your `Image`, it reads the `contentDescription`.

| Picture | Good `contentDescription` |
|---|---|
| A book cover | `"Cover of Our Solar System"` |
| A picture that only decorates | `null` |
| A search icon on a button | `"Search books"` |

Rules of thumb:

- Describe what the picture **means**, in a few words.
- Do not start with "Image of". TalkBack already says it is an image.
- If a picture is only decoration and the words next to it say everything, use `null`. TalkBack then skips it, and the listener is not slowed down.

Writing a good description is a small act of kindness. It means your app serves every student, not only some.

## 👀 Seeing Your Work with `@Preview`

Starting the emulator every time you change a colour is slow. A **preview** draws a composable right inside Android Studio.

```kotlin
@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    SchoolLibraryTheme {
        Greeting()
    }
}
```

Open the **Split** view (top right of the editor). The preview appears on the right. After you change code it updates, or it shows a **Build & Refresh** link to press.

- A preview function takes no parameters, so give it the data yourself.
- Wrap it in `SchoolLibraryTheme` so it uses your app's colours and fonts.
- `showBackground = true` paints a white background behind it.
- Previews do not run on a phone. They are only for you while you work.

## 📇 Putting It Together: `BookCard`

Now build the card from the story. It takes one `Book` and shows its cover, title, author and shelf. Here is the complete `MainActivity.kt` with every import:

```kotlin
package org.juniorcoders.library

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import org.juniorcoders.library.ui.theme.SchoolLibraryTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            SchoolLibraryTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    BookCard(
                        book = sampleBooks[0],
                        modifier = Modifier.padding(innerPadding)
                    )
                }
            }
        }
    }
}

@Composable
fun BookCard(book: Book, modifier: Modifier = Modifier) {
    Column(modifier = modifier) {
        Image(
            painter = painterResource(R.drawable.book_cover),
            contentDescription = "Cover of ${book.title}",
            contentScale = ContentScale.Crop,
            modifier = Modifier.size(120.dp)
        )
        Text(
            text = book.title,
            style = MaterialTheme.typography.titleLarge
        )
        Text(
            text = book.author,
            style = MaterialTheme.typography.bodyMedium
        )
        Text(
            text = stringResource(R.string.shelf_label, book.shelf),
            style = MaterialTheme.typography.labelMedium,
            fontWeight = FontWeight.Bold
        )
    }
}

@Preview(showBackground = true)
@Composable
fun BookCardPreview() {
    SchoolLibraryTheme {
        BookCard(book = sampleBooks[0])
    }
}
```

What each new part does:

- `Column { … }` stacks its children from top to bottom. Without it the four items would sit on top of each other. Chapter 10 covers `Column` fully.
- `BookCard(book: Book, …)` takes a whole `Book`. The same function can show any of the five books.
- `modifier: Modifier = Modifier` is a habit from Google's own code. The caller can pass extra settings, such as padding, and it defaults to "nothing extra".
- `Scaffold` gives a basic page frame. `innerPadding` is the space taken by the status bar at the top of the phone. Passing it on stops your card hiding under the clock and battery icons.
- `sampleBooks[0]` is the first book in the list (lists count from 0, Chapter 6).

Run the app. The screen shows:

```text
+----------------------------------+
| [ cover ]                        |
| [picture]                        |
|                                  |
| Our Solar System                 |
| Amina Yusuf                      |
| Shelf: Science A3                |
|                                  |
+----------------------------------+
```

Everything is squeezed into the top-left corner with no space around it. That is fine for now. Chapter 10 makes it look like a real card.

Change `sampleBooks[0]` to `sampleBooks[3]` and run again. Now the card shows "Kotlin for Young Builders" by Omar Farooq on shelf Computing D4. One design, any book: that is the librarian's card from the story.

## 🔮 Predict the Screen

What does this show, and how big is the text?

```kotlin
Text(
    text = "Library opens at 8:00",
    style = MaterialTheme.typography.bodyLarge,
    fontSize = 30.sp
)
```

<details>
<summary>Show answer</summary>

It shows `Library opens at 8:00`. The text is 30 sp, not the normal `bodyLarge` size, because a single parameter (`fontSize`) wins over the same setting inside `style`.

</details>

## ⚠️ Common Mistake

**1. Calling a composable from a normal function.**

```kotlin
fun showTitle(book: Book) {        // no @Composable
    Text(text = book.title)
}
```

What happens: Android Studio underlines `Text` in red: `@Composable invocations can only happen from the context of a @Composable function`. Only composables may draw on the screen.

```kotlin
@Composable
fun BookTitle(book: Book) {        // fixed, and a capital letter
    Text(text = book.title)
}
```

**2. A picture with a bad file name.**

You drag in `Book Cover.png`. The build fails with an error saying a character in the file name is not valid. Rename the file to `book_cover.png` (right-click → **Refactor → Rename**), then write `R.drawable.book_cover`.

## ✍️ Try It

Add a second line under the welcome text that shows the library's opening hours from `strings.xml`.

1. Add `<string name="hours">Open 8:00 to 15:00</string>` to `strings.xml`.
2. Show it with `stringResource` and the `bodySmall` style.
3. Check it in the preview before running the app.

*Hint:* the call is `Text(text = stringResource(R.string.hours), style = MaterialTheme.typography.bodySmall)`.

## 📝 Recap

- `@Composable` marks a function that draws part of the screen. Its name starts with a capital letter.
- `Text` shows words. Use `sp` for text size and Material `typography` styles for a tidy, matching look.
- Fixed words for users go in `res/values/strings.xml` and are read with `stringResource(R.string.name)`.
- Pictures go in `res/drawable` (small letters, digits, underscores) and are shown with `Image(painterResource(...))`.
- Every meaningful picture needs a `contentDescription` for TalkBack; decoration gets `null`.
- `@Preview` shows a composable inside Android Studio without starting the emulator.

## 📖 Key Terms

- **Composable**: a function marked `@Composable` that describes part of the screen.
- **Annotation**: a note that starts with `@`, read by the compiler.
- **sp / dp**: text units that follow the font-size setting / spacing units that do not.
- **Resource**: a file in `res/` (words, pictures, colours) with an ID in the `R` class.
- **Drawable**: a picture resource in `res/drawable`.
- **TalkBack**: Android's screen reader, which reads the screen aloud.

## 🏆 Practice

### 🟢 Level 1: Recall
1. What is the difference between `sp` and `dp`?
2. Which file holds the words shown to users?
3. When should `contentDescription` be `null`?

<details>
<summary>Show answer</summary>

1. `sp` is for text size and grows when the user picks larger text in the phone settings. `dp` is for spacing and picture sizes and does not.
2. `app/res/values/strings.xml`.
3. When the picture is only decoration and the text next to it already says everything. TalkBack then skips it.

</details>

### 🟡 Level 2: Apply
Write a composable `AuthorLine(book: Book)` that shows `by ` followed by the author's name in italic, using the `bodyMedium` style. Add a preview for the third sample book.

<details>
<summary>Show answer</summary>

```kotlin
@Composable
fun AuthorLine(book: Book) {
    Text(
        text = "by ${book.author}",
        style = MaterialTheme.typography.bodyMedium,
        fontStyle = FontStyle.Italic
    )
}

@Preview(showBackground = true)
@Composable
fun AuthorLinePreview() {
    SchoolLibraryTheme {
        AuthorLine(book = sampleBooks[2])
    }
}
```

The preview shows *by Maryam Khan* in italic. `FontStyle` comes from `androidx.compose.ui.text.font.FontStyle`; Android Studio offers the import when you press Alt+Enter. In a real app, `"by %1$s"` would go into `strings.xml`.

</details>

### 🔴 Level 3: Challenge
Make a "Book of the Week" card for the library's display board.

1. Add a string `book_of_week` with the text `Book of the Week` to `strings.xml`.
2. Add a vector icon of a book (New → Vector Asset → Clip art) named `ic_book`.
3. Write `BookOfTheWeek(book: Book)`: the icon (48 dp, with a sensible `contentDescription` or `null`), the heading from `strings.xml` in `headlineSmall`, then the title in `titleLarge` and the author in `bodyMedium`.
4. Preview it with `sampleBooks[4]`.

<details>
<summary>Show one possible answer</summary>

```kotlin
@Composable
fun BookOfTheWeek(book: Book, modifier: Modifier = Modifier) {
    Column(modifier = modifier) {
        Image(
            painter = painterResource(R.drawable.ic_book),
            contentDescription = null,   // the heading already says it
            modifier = Modifier.size(48.dp)
        )
        Text(
            text = stringResource(R.string.book_of_week),
            style = MaterialTheme.typography.headlineSmall
        )
        Text(text = book.title, style = MaterialTheme.typography.titleLarge)
        Text(text = book.author, style = MaterialTheme.typography.bodyMedium)
    }
}

@Preview(showBackground = true)
@Composable
fun BookOfTheWeekPreview() {
    SchoolLibraryTheme {
        BookOfTheWeek(book = sampleBooks[4])
    }
}
```

The preview shows the book icon, then "Book of the Week", "Gardens of the World" and "Sara Ali", stacked from top to bottom. The icon's description is `null` because it only decorates; the heading underneath gives the meaning. `"Book of the Week icon"` would also be acceptable.

</details>
