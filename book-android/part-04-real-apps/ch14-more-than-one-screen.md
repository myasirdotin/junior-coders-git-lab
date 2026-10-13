# Chapter 14: More Than One Screen

## 🌟 Real-Life Story

Think of the school library itself. At the front desk there is a long list of books. You point at one title, and the librarian walks you to that shelf and shows you the book. When you are done, you walk back to the desk and the list is still there. Nobody rebuilds the front desk each time. An app with several **screens** works the same way: a list screen, a detail screen, and a simple way to go forward and come back.

## 🎯 What You Will Learn

- Explain why apps split their content into several screens.
- Add Navigation Compose and the Kotlin serialization plugin to a project.
- Describe each screen with a type-safe route, such as `Home` and `BookDetail(id)`.
- Move between screens with `NavController` and `NavHost`, passing only a book's id.
- Go back with the system Back button, `navigateUp()` and a top app bar with a back arrow.

## Why Apps Have Screens

So far the School Library app is one screen: a search box and a scrolling list of `BookRow` items with a "Save for later" toggle. That works for five books. But where does a student read more about one book? If you squeeze every detail into each row, the list becomes long and hard to scan.

Most apps solve this with two kinds of screen:

| Screen | What it shows | Example |
|--------|---------------|---------|
| List screen | Many items, a little about each | All library books |
| Detail screen | One item, everything about it | "Our Solar System": author, shelf, available |

The student taps a row on the list. The app opens the detail screen for that book. The student presses Back. The list comes back exactly as it was.

Moving between screens is called **navigation**. Jetpack has a library for it called **Navigation Compose**.

## Three Words: Route, NavHost, NavController

Navigation Compose uses three ideas. Learn the words first; the code will make sense after.

| Word | Plain meaning | Library picture |
|------|---------------|-----------------|
| Route | The name of a screen, plus any data it needs | "Shelf for book 3" |
| `NavHost` | The area of the app that shows the current screen | The room you stand in |
| `NavController` | The object that moves you between screens | The librarian who walks you there |

The `NavController` also keeps a **back stack**. That is a pile of screens you have visited, newest on top. Going forward puts a screen on top. Going back takes the top one off.

```text
Start        Tap book 3       Press Back
+------+     +------------+   +------+
| Home |     | BookDetail |   | Home |
+------+     | (id = 3)   |   +------+
             +------------+
             | Home       |
             +------------+
```

The screen on top of the pile is the one the student sees.

## Setting Up the Project

Navigation is not part of the "Empty Activity" template. You add two things: the **Navigation Compose library** and the **Kotlin serialization plugin**. A **plugin** is a helper that changes how your code is built. The serialization plugin lets Kotlin turn a route like `BookDetail(3)` into text and back again, so the app can remember it.

Your project lists its libraries in a **version catalog**. That is the file `gradle/libs.versions.toml`. The app module then uses them in `app/build.gradle.kts`. Do the steps below in order.

### Step 1: Add the libraries to the catalog

Open `gradle/libs.versions.toml`. It has sections in square brackets. Add these lines to the matching sections (keep the lines that are already there):

```toml
[versions]
navigationCompose = "..."
kotlinxSerializationJson = "..."

[libraries]
androidx-navigation-compose = { group = "androidx.navigation", name = "navigation-compose", version.ref = "navigationCompose" }
kotlinx-serialization-json = { group = "org.jetbrains.kotlinx", name = "kotlinx-serialization-json", version.ref = "kotlinxSerializationJson" }

[plugins]
kotlin-serialization = { id = "org.jetbrains.kotlin.plugin.serialization", version.ref = "kotlin" }
```

Do not type `"..."`. Replace it with the newest stable version number from the official Android "Navigation" release page and the Kotlin serialization page. Android Studio also highlights old versions and offers to update them. The plugin line reuses the `kotlin` version that is already in your catalog, because this plugin must match your Kotlin version. If your catalog names that entry differently, use that name.

### Step 2: Turn the plugin on

In the **project-level** `build.gradle.kts` (the one in the top folder), add one line to the `plugins` block:

```kotlin
plugins {
    // ...the lines that are already here...
    alias(libs.plugins.kotlin.serialization) apply false
}
```

In `app/build.gradle.kts`, add the plugin and the two libraries:

```kotlin
plugins {
    // ...the lines that are already here...
    alias(libs.plugins.kotlin.serialization)
}

dependencies {
    // ...the lines that are already here...
    implementation(libs.androidx.navigation.compose)
    implementation(libs.kotlinx.serialization.json)
}
```

Notice the dots: the name `androidx-navigation-compose` in the catalog becomes `libs.androidx.navigation.compose` in Kotlin.

### Step 3: Sync

A bar appears at the top: "Gradle files have changed since last project sync". Click **Sync Now**. Wait until the sync finishes. If a line turns red, read the error, check the spelling against the catalog, and sync again.

## Routes as Kotlin Types

A **type-safe route** is a small Kotlin class or object that names a screen. "Type-safe" means Kotlin checks it for you. If you forget the book's id, the code will not even build.

Create a new file `Routes.kt` next to `MainActivity.kt`:

```kotlin
package org.juniorcoders.library

import kotlinx.serialization.Serializable

@Serializable
object Home

@Serializable
data class BookDetail(val id: Int)
```

- `Home` needs no data, so it is an `object` (there is only ever one).
- `BookDetail` needs to know which book, so it is a `data class` with an `id`.
- `@Serializable` is an **annotation**: a label that tells the serialization plugin to handle this type.

Why send only the `id` and not the whole `Book`? The id is small and simple. The detail screen can look the book up itself. The official Android advice is the same: pass the smallest piece of data that identifies the thing.

## Looking Up a Book by Its Id

Here is the lookup on its own, as plain Kotlin (with the `Book` class and `sampleBooks` from Chapter 8 above it). `find` returns the first book that matches, or `null` if none does. You met `?.` and `?:` in Chapter 8.

```kotlin
fun findBook(id: Int): Book? = sampleBooks.find { it.id == id }

fun main() {
    val book = findBook(3)
    println(book?.title ?: "Book not found")
    val missing = findBook(9)
    println(missing?.title ?: "Book not found")
}
```

Output:

```text
Kind Words, Strong Hearts
Book not found
```

The detail screen must handle the `null` case. An id might not exist, for example if a book is removed from the list later.

## The Two Screens and the NavHost

Now the full example. It is long, so read it in parts. The `Book` class and `sampleBooks` are the same as in earlier chapters. To keep the code short, the list here leaves out the search box and the "Save for later" toggle. Keep yours in your own app: they stay inside `BookListScreen` and `BookRow`.

```kotlin
package org.juniorcoders.library

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.Card
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.toRoute
import org.juniorcoders.library.ui.theme.SchoolLibraryTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            SchoolLibraryTheme {
                LibraryApp()
            }
        }
    }
}

@Composable
fun LibraryApp() {
    val navController = rememberNavController()
    NavHost(navController = navController, startDestination = Home) {
        composable<Home> {
            BookListScreen(
                onBookClick = { id -> navController.navigate(BookDetail(id)) }
            )
        }
        composable<BookDetail> { backStackEntry ->
            val route: BookDetail = backStackEntry.toRoute()
            BookDetailScreen(
                bookId = route.id,
                onBack = { navController.navigateUp() }
            )
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun BookListScreen(onBookClick: (Int) -> Unit) {
    Scaffold(
        modifier = Modifier.fillMaxSize(),
        topBar = { TopAppBar(title = { Text("School Library") }) }
    ) { innerPadding ->
        LazyColumn(
            modifier = Modifier.padding(innerPadding),
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            items(sampleBooks, key = { it.id }) { book ->
                BookRow(book = book, onClick = { onBookClick(book.id) })
            }
        }
    }
}

@Composable
fun BookRow(book: Book, onClick: () -> Unit) {
    Card(onClick = onClick, modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(book.title, style = MaterialTheme.typography.titleMedium)
            Text(book.author, style = MaterialTheme.typography.bodyMedium)
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun BookDetailScreen(bookId: Int, onBack: () -> Unit) {
    val book = sampleBooks.find { it.id == bookId }
    Scaffold(
        modifier = Modifier.fillMaxSize(),
        topBar = {
            TopAppBar(
                title = { Text(book?.title ?: "Book not found") },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(
                            imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                            contentDescription = "Back"
                        )
                    }
                }
            )
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .padding(innerPadding)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            if (book == null) {
                Text("This book is not in the library list.")
            } else {
                Text(book.title, style = MaterialTheme.typography.headlineSmall)
                Text("Author: ${book.author}")
                Text("Shelf: ${book.shelf}")
                Text(if (book.available) "Available to borrow" else "On loan")
            }
        }
    }
}
```

`TopAppBar` is still marked "experimental" in Material 3, so every function that uses it needs the line `@OptIn(ExperimentalMaterial3Api::class)` above it. That line simply says "I know this part may still change".

For short code, this chapter writes plain strings like `"Back"`. In a real app, put them in `res/values/strings.xml` and use `stringResource(R.string.back)`, as in Chapter 9.

### What the screens show

When the app starts, the student sees the list:

```text
+----------------------------------+
| School Library                   |
+----------------------------------+
| Our Solar System                 |
| Amina Yusuf                      |
+----------------------------------+
| Clean Water for Every Village    |
| Bilal Ahmed                      |
+----------------------------------+
| ...three more cards...           |
+----------------------------------+
```

Tapping the third card opens the detail screen:

```text
+----------------------------------+
| <-  Kind Words, Strong Hearts    |
+----------------------------------+
| Kind Words, Strong Hearts        |
| Author: Maryam Khan              |
| Shelf: Stories C2                |
| Available to borrow              |
+----------------------------------+
```

### Reading the code, piece by piece

| Code | What it does |
|------|--------------|
| `rememberNavController()` | Creates the `NavController` once and keeps it |
| `NavHost(..., startDestination = Home)` | Shows the screens; `Home` is the first one |
| `composable<Home> { }` | "When the route is `Home`, show this" |
| `navController.navigate(BookDetail(id))` | Put a detail screen for this id on top of the back stack |
| `backStackEntry.toRoute()` | Turn the current route back into a `BookDetail`, so you can read `.id` |
| `navigateUp()` | Go back one screen |

Notice that the screens do not know about `navController`. `BookListScreen` only gets a lambda, `onBookClick`. `BookDetailScreen` only gets `onBack`. This is a good habit. Each screen only says "something was tapped", and `LibraryApp` decides where to go. You can then preview each screen on its own.

`Card(onClick = ...)` makes the whole card tappable. A tappable card also shows a ripple (a soft wave of colour) when touched, so the student sees that the tap worked.

## Going Back

There are two ways back, and both should work.

**The system Back button or gesture.** On Android, the student can press Back or swipe in from the edge of the screen. Navigation Compose handles this for you. It takes the top screen off the back stack. You write no code for it.

**The back arrow in the top app bar.** This is the `IconButton` with the `ArrowBack` icon. It calls `onBack`, which calls `navController.navigateUp()`.

You will also see `popBackStack()` in examples. Both go back one screen in our app:

| Function | Meaning |
|----------|---------|
| `navigateUp()` | "Go up one level" in the app; used for the arrow in the top bar |
| `popBackStack()` | "Take the top screen off the pile"; returns `true` if it did |

For a simple app like ours, use `navigateUp()` for the arrow and let the system handle the Back button.

The icon is `Icons.AutoMirrored.Filled.ArrowBack`. "AutoMirrored" means it flips by itself for right-to-left languages such as Arabic and Urdu, where "back" points to the right. The `contentDescription = "Back"` is the word a screen reader says aloud for students who cannot see the arrow. Chapter 16 says more about this.

If `Icons` stays red after you add the import, your project usually needs the Material icons library (`androidx.compose.material:material-icons-core`). Add it the same way you added Navigation, using Android Studio's suggestion.

## What Happens to State When You Leave a Screen?

In Chapter 12 the search text lived in a `rememberSaveable` variable. Good news: Navigation keeps `rememberSaveable` values for screens that are still on the back stack. So if a student types "garden", opens a book and presses Back, the word "garden" is still in the box.

A value kept with plain `remember` is not kept that way. When the list screen is replaced by the detail screen, its `remember` values are forgotten. That is one more reason to use `rememberSaveable` for things the student typed. Chapter 15 shows how to keep "Save for later" even after the app is closed.

## 🕵️ Code Detective

Each line has one problem. Can you spot it?

```kotlin
// A
navController.navigate(BookDetail)
// B
composable<BookDetail> {
    BookDetailScreen(bookId = 3, onBack = { })
}
// C (in Routes.kt)
data class BookDetail(val id: Int)
```

<details>
<summary>Show answer</summary>

- **A** is missing the id. `BookDetail` is a class, so you must create one: `BookDetail(book.id)`.
- **B** always shows book 3, and the back arrow does nothing. Read the id with `backStackEntry.toRoute<BookDetail>()` and pass `{ navController.navigateUp() }` as `onBack`.
- **C** has no `@Serializable` label above it. Navigation cannot store the route, so the app fails when it tries to use it.

</details>

## ⚠️ Common Mistake

**Mistake 1: using `navigate(Home)` to go back.**

```kotlin
onBack = { navController.navigate(Home) }   // wrong
```

What happens: it looks like going back, but it puts a *new* `Home` on top of the pile. After three visits the back stack is Home, Detail, Home, Detail, Home, Detail, Home. Pressing the system Back button now walks through old screens again and again.

```kotlin
onBack = { navController.navigateUp() }     // right
```

**Mistake 2: putting the whole `Book` in the route.**

```kotlin
@Serializable
data class BookDetail(val book: Book)       // wrong
```

What happens: the build fails, because `Book` itself is not marked `@Serializable`. Even if you add the label, big objects in routes are slow and can go out of date. Pass the id and look the book up:

```kotlin
@Serializable
data class BookDetail(val id: Int)          // right
```

## ✍️ Try It

Add a third screen called `About`. It shows one sentence: "This app helps students find books in our school library." Put an "About" `TextButton` in the list screen's top bar, using the `actions = { }` slot of `TopAppBar`. Give the About screen its own back arrow.

*Hint:* you need `@Serializable object About`, a `composable<About> { }` block inside the `NavHost`, a new lambda parameter `onAboutClick` on `BookListScreen`, and `navController.navigate(About)`.

## 📝 Recap

- A list screen shows many items; a detail screen shows one item fully.
- Navigation Compose needs its library and the Kotlin serialization plugin; sync after adding them.
- Routes are `@Serializable` objects or data classes, such as `Home` and `BookDetail(val id: Int)`.
- `NavHost` shows the current screen, and `navController.navigate(...)` moves forward.
- Pass only the id; the detail screen looks the book up and handles "not found".
- The system Back button works by itself; the top-bar arrow calls `navigateUp()`.

## 🏆 Practice

### 🟢 Level 1: Recall
1. What is the back stack?
2. Why is `Home` written as an `object`, but `BookDetail` as a `data class`?
3. What does a screen reader say when it reaches the back arrow in this chapter's code?

<details>
<summary>Show answer</summary>

1. The pile of screens the student has visited, newest on top. The top one is shown. Going back removes it.
2. `Home` needs no extra data, so one single object is enough. `BookDetail` must carry the book's `id`, so it is a data class with a property.
3. "Back", because that is its `contentDescription`.

</details>

### 🟡 Level 2: Apply
On the detail screen, when the book is available, show "Shelf location: Science A3" (with the book's real shelf) using `MaterialTheme.typography.titleMedium`. When it is on loan, show "Ask the librarian when it will be back." Write that part of `BookDetailScreen`.

<details>
<summary>Show answer</summary>

Inside the `else` branch, where `book` is known not to be null:

```kotlin
if (book.available) {
    Text(
        "Shelf location: ${book.shelf}",
        style = MaterialTheme.typography.titleMedium
    )
} else {
    Text("Ask the librarian when it will be back.")
}
```

For "Our Solar System" the screen shows "Shelf location: Science A3". For "Clean Water for Every Village" it shows the librarian message.

</details>

### 🔴 Level 3: Challenge
Add an "Authors" feature:

1. Create a route `@Serializable data class AuthorBooks(val author: String)`.
2. On the detail screen, add a `TextButton` "More by (author)" that opens `AuthorBooks(book.author)`.
3. The `AuthorBooks` screen shows a top bar with the author's name and a back arrow, and a list of that author's books (`sampleBooks.filter { it.author == author }`).
4. Check the back stack: List, then Detail, then Author. Press Back twice. You should be on the list again.

<details>
<summary>Show one possible answer</summary>

```kotlin
// Routes.kt
@Serializable
data class AuthorBooks(val author: String)

// In LibraryApp, inside NavHost { ... }
composable<BookDetail> { backStackEntry ->
    val route: BookDetail = backStackEntry.toRoute()
    BookDetailScreen(
        bookId = route.id,
        onBack = { navController.navigateUp() },
        onAuthorClick = { name -> navController.navigate(AuthorBooks(name)) }
    )
}
composable<AuthorBooks> { backStackEntry ->
    val route: AuthorBooks = backStackEntry.toRoute()
    AuthorBooksScreen(
        author = route.author,
        onBack = { navController.navigateUp() }
    )
}

// BookDetailScreen gets a new parameter: onAuthorClick: (String) -> Unit
// and, in the else branch, this button:
TextButton(onClick = { onAuthorClick(book.author) }) {
    Text("More by ${book.author}")
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AuthorBooksScreen(author: String, onBack: () -> Unit) {
    val books = sampleBooks.filter { it.author == author }
    Scaffold(
        modifier = Modifier.fillMaxSize(),
        topBar = {
            TopAppBar(
                title = { Text(author) },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(
                            Icons.AutoMirrored.Filled.ArrowBack,
                            contentDescription = "Back"
                        )
                    }
                }
            )
        }
    ) { innerPadding ->
        LazyColumn(
            modifier = Modifier.padding(innerPadding),
            contentPadding = PaddingValues(16.dp)
        ) {
            items(books, key = { it.id }) { book ->
                Text(book.title, modifier = Modifier.padding(vertical = 8.dp))
            }
        }
    }
}
```

`TextButton` is imported from `androidx.compose.material3.TextButton`. In our sample data each author has one book, so the list shows one title; add a second book by the same author to `sampleBooks` to see more. Pressing Back twice removes Author, then Detail, and the list is shown again.

</details>
