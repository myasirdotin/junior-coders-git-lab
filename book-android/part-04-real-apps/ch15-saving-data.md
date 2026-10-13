# Chapter 15: Saving Data on the Phone

## 🌟 Real-Life Story

In class, the teacher writes the day's homework on the whiteboard. At the end of the day the board is wiped clean. If you did not copy the homework into your notebook, it is gone. Your notebook is different: you close it, take it home, open it the next morning, and the writing is still there. So far, everything our app remembers is written on a whiteboard. In this chapter we give it a notebook.

## 🎯 What You Will Learn

- Explain why `remember` and `rememberSaveable` values disappear when the app is closed.
- Choose between `rememberSaveable`, DataStore, Room and a server for different kinds of data.
- Save the "Save for later" book ids with Preferences DataStore.
- Read saved data with `collectAsState` and write it with `rememberCoroutineScope().launch { }`.
- Tell users what the app saves and give them a button to clear it.

## Why State Disappears

Try this with the app from Chapter 14. Tap "Save for later" on two books. Now open the phone's recent apps list and swipe the School Library app away. Open it again. Both books are no longer saved.

Here is why. Values in `remember` and `rememberSaveable` live in the phone's **memory** (RAM). Memory is fast, but it is like the whiteboard: it is cleared when the app is closed for good.

| Kind of state | Survives turning the phone sideways? | Survives closing the app? |
|---------------|-------------------------------------|---------------------------|
| `remember` | No | No |
| `rememberSaveable` | Yes | No (not when the user swipes it away) |
| Saved to **storage** | Yes | Yes |

**Storage** is the phone's long-term memory, where files and photos are kept. It is the notebook. To keep the saved books, we must write them to storage.

## Choosing Where to Save

Android gives you several places to keep data. Pick the smallest one that does the job.

| Choice | Good for | Example in a school app |
|--------|----------|------------------------|
| `rememberSaveable` | What the user is typing right now | The search box text |
| Preferences **DataStore** | A few small settings and lists of ids | Saved book ids, "dark mode on" |
| **Room** | Many records in tables | Every book, every loan, with search |
| A **server** | Data shared between many phones | The real library catalogue |

Our "Save for later" list is just a few numbers, such as 1 and 4. That is a perfect job for Preferences DataStore.

**DataStore** is a Jetpack library that saves small pieces of data in a file inside your app's private folder. "Preferences" DataStore stores **key–value pairs**: each value has a name (the **key**), like a labelled box on a shelf.

```text
settings file (on the phone)
+------------------+------------+
| key              | value      |
+------------------+------------+
| saved_book_ids   | {"1", "4"} |
+------------------+------------+
```

## Adding DataStore to the Project

DataStore is not in the "Empty Activity" template. Add it the same way you added Navigation in Chapter 14.

In `gradle/libs.versions.toml`:

```toml
[versions]
datastorePreferences = "..."

[libraries]
androidx-datastore-preferences = { group = "androidx.datastore", name = "datastore-preferences", version.ref = "datastorePreferences" }
```

Replace `"..."` with the newest stable version from the official Android "DataStore" page. Then, in `app/build.gradle.kts`:

```kotlin
dependencies {
    // ...the lines that are already here...
    implementation(libs.androidx.datastore.preferences)
}
```

Click **Sync Now** and wait for the sync to finish.

## Creating the DataStore

Make a new file called `SavedBooksStore.kt`. At the very top of the file, outside any class or function, add this line:

```kotlin
val Context.dataStore by preferencesDataStore(name = "settings")
```

Read it slowly:

- `Context` is Android's object that knows about your app: its files, its resources and more. Every screen can get one.
- `val Context.dataStore` adds a new property called `dataStore` to every `Context`. Now you can write `context.dataStore` anywhere in the app.
- `by preferencesDataStore(name = "settings")` means "create the DataStore the first time it is used, in a file called `settings`, and reuse it after that".

This line must appear **once** in the whole app, at the top level of a file. The ⚠️ Common Mistake section shows what happens otherwise.

## Keys and Why the Ids Become Text

To save a value you need a key. Preferences DataStore has keys for simple types: `intPreferencesKey`, `booleanPreferencesKey`, `stringPreferencesKey` and `stringSetPreferencesKey`. There is no key for a set of numbers. So we store the ids as a **set of strings**, such as `{"1", "4"}`, and turn them back into numbers when we read them.

```kotlin
val savedIdsKey = stringSetPreferencesKey("saved_book_ids")
```

A **set** is like a list with no repeats. A book is either in it or not, which is exactly what "Save for later" needs.

Here is the toggle logic and the text-to-number step as plain Kotlin, so you can check it before it goes into the app. `-` takes an item out of a set, and `+` puts one in. `toIntOrNull()` turns `"5"` into `5`, and anything that is not a number into `null`. `mapNotNull` keeps only the results that are not `null`.

```kotlin
fun toggle(saved: Set<String>, id: Int): Set<String> {
    val text = id.toString()
    return if (text in saved) saved - text else saved + text
}

fun main() {
    var saved = emptySet<String>()
    saved = toggle(saved, 4)
    saved = toggle(saved, 1)
    println(saved)
    saved = toggle(saved, 4)
    println(saved)
    val ids: Set<Int> = setOf("1", "5", "oops").mapNotNull { it.toIntOrNull() }.toSet()
    println(ids)
}
```

Output:

```text
[4, 1]
[1]
[1, 5]
```

The first toggle of 4 adds it. The second toggle of 4 removes it. The word `"oops"` is not a number, so it is quietly skipped instead of crashing the app.

## A Small Store Class

Now put the key, the reading and the writing together in one small class. A class like this is often called a **repository**: one place that knows how the data is saved, so the screens do not have to.

```kotlin
package org.juniorcoders.library

import android.content.Context
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringSetPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

val Context.dataStore by preferencesDataStore(name = "settings")

class SavedBooksStore(private val context: Context) {

    private val savedIdsKey = stringSetPreferencesKey("saved_book_ids")

    val savedIds: Flow<Set<Int>> = context.dataStore.data.map { preferences ->
        val texts = preferences[savedIdsKey] ?: emptySet()
        texts.mapNotNull { it.toIntOrNull() }.toSet()
    }

    suspend fun toggle(id: Int) {
        context.dataStore.edit { preferences ->
            val current = preferences[savedIdsKey] ?: emptySet()
            val text = id.toString()
            preferences[savedIdsKey] =
                if (text in current) current - text else current + text
        }
    }

    suspend fun clearAll() {
        context.dataStore.edit { preferences ->
            preferences.remove(savedIdsKey)
        }
    }
}
```

There are three new words here. You only need the plain meaning of each.

| Word | Plain meaning |
|------|---------------|
| `Flow` | A stream of values that keeps sending a new value every time the data changes, like a news ticker |
| `.map { }` | Changes each value in the stream; here, a set of strings becomes a set of numbers |
| `suspend fun` | A function that may need to wait, for example while writing a file; it must be run with `launch` (below) |

`context.dataStore.data` is the Flow of everything in the settings file. `edit { }` opens the file for changing. Inside the braces you set or remove values, and DataStore saves the file safely when the braces end. If something goes wrong half way, the old file is kept, so the data is never half-written.

## Reading: collectAsState

A screen cannot show a Flow directly. It needs ordinary state, like in Chapter 11. `collectAsState` turns the stream into state:

```kotlin
val savedIds by store.savedIds.collectAsState(initial = emptySet())
```

- `collectAsState` listens to the Flow. Each new value updates `savedIds`, and Compose redraws (recomposes) the parts of the screen that use it.
- `initial = emptySet()` is what to show before the file has been read. Reading takes a moment, so for a split second no books look saved.

You may also see `collectAsStateWithLifecycle()` in official examples. It does the same job, but stops listening while the app is in the background. It needs one more library (`androidx.lifecycle:lifecycle-runtime-compose`). Either is fine for this book.

## Writing: rememberCoroutineScope().launch

Writing a file takes time. If the app waited on the main thread, the screen could freeze. So `toggle` and `clearAll` are `suspend` functions, and Kotlin only lets you call them from a small background helper (a coroutine).

The tool for that in a composable is a **coroutine scope**. Think of it as a small helper that runs saving in the background while the screen stays smooth:

```kotlin
val scope = rememberCoroutineScope()

TextButton(onClick = { scope.launch { store.toggle(book.id) } }) {
    Text("Save for later")
}
```

- `rememberCoroutineScope()` gives you the helper. It belongs to this screen, and Compose stops its work if the screen goes away.
- `scope.launch { ... }` says "run this in the background now".

You do not need to know more about coroutines for this book. Remember the pattern: **read with `collectAsState`, write with `scope.launch`**.

## The List Screen with Saving

Here is the list screen from Chapter 14, now with saving. The navigation code in `LibraryApp` does not change. Put this in a new file, `BookListScreen.kt`, and delete the old `BookListScreen` and `BookRow` from `MainActivity.kt`, because Kotlin does not allow two functions with the same name and parameters.

```kotlin
package org.juniorcoders.library

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Card
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun BookListScreen(onBookClick: (Int) -> Unit) {
    val context = LocalContext.current
    val store = remember { SavedBooksStore(context.applicationContext) }
    val savedIds by store.savedIds.collectAsState(initial = emptySet())
    val scope = rememberCoroutineScope()

    Scaffold(
        modifier = Modifier.fillMaxSize(),
        topBar = { TopAppBar(title = { Text("School Library") }) }
    ) { innerPadding ->
        Column(modifier = Modifier.padding(innerPadding)) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    "Saved for later: ${savedIds.size}",
                    modifier = Modifier.weight(1f)
                )
                TextButton(
                    onClick = { scope.launch { store.clearAll() } },
                    enabled = savedIds.isNotEmpty()
                ) {
                    Text("Clear saved books")
                }
            }
            LazyColumn(
                contentPadding = PaddingValues(16.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                items(sampleBooks, key = { it.id }) { book ->
                    BookRow(
                        book = book,
                        isSaved = book.id in savedIds,
                        onClick = { onBookClick(book.id) },
                        onToggleSave = { scope.launch { store.toggle(book.id) } }
                    )
                }
            }
        }
    }
}

@Composable
fun BookRow(
    book: Book,
    isSaved: Boolean,
    onClick: () -> Unit,
    onToggleSave: () -> Unit
) {
    Card(onClick = onClick, modifier = Modifier.fillMaxWidth()) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(book.title, style = MaterialTheme.typography.titleMedium)
                Text(book.author, style = MaterialTheme.typography.bodyMedium)
            }
            TextButton(onClick = onToggleSave) {
                Text(if (isSaved) "Saved" else "Save for later")
            }
        }
    }
}
```

`LocalContext.current` gives the screen its `Context`. We pass `context.applicationContext`, the context of the whole app, because the store should not hold on to one screen. `remember { }` makes sure the store is created once, not on every recomposition.

### What the screen shows

After saving books 1 and 4, closing the app and opening it again:

```text
+----------------------------------+
| School Library                   |
+----------------------------------+
| Saved for later: 2               |
|               [Clear saved books]|
+----------------------------------+
| Our Solar System                 |
| Amina Yusuf              [Saved] |
+----------------------------------+
| Clean Water for Every Village    |
| Bilal Ahmed      [Save for later]|
+----------------------------------+
| ...                              |
| Kotlin for Young Builders        |
| Omar Farooq              [Saved] |
+----------------------------------+
```

Tap "Clear saved books": the count becomes 0, every row says "Save for later", and the clear button turns grey (disabled) because there is nothing left to clear.

### How one tap travels

```text
tap "Save for later" on book 4
        |
scope.launch { store.toggle(4) }
        |
edit { } writes {"1","4"} to the file
        |
the Flow sends a new set: {1, 4}
        |
collectAsState updates savedIds
        |
Compose redraws: row 4 says "Saved"
```

Notice that the button does not change `savedIds` itself. It only writes to the file. The screen updates because the Flow reports the change. The file is the single **source of truth**: the one place the answer comes from.

## When You Need Tables: Room

DataStore is for small things. It reads the whole file each time, and it cannot search or sort. If your app keeps hundreds of records, such as every book and every loan, use **Room**.

Room is a Jetpack library that keeps a real **SQLite** database on the phone. It uses tables, rows and SQL queries, just like the tables in the MySQL book. You describe a table with a Kotlin data class marked `@Entity`, and you write queries in an interface marked `@Dao`. Room is the natural next step after this book; the official Android "Save data in a local database using Room" guide teaches it well.

## 🤝 Amānah: Data on the Phone Is a Trust

The ids your app saves stay **on this phone**, in your app's private folder. Other apps cannot read them. Nothing is sent to the internet. They are removed when the app is uninstalled, or when the user taps **Clear storage** in the phone's app settings. If the phone's backup is turned on, Android may also copy app files into the user's own backup.

Even small data is an *amānah*, a trust. Good apps follow three simple rules:

1. **Save only what you need.** Our app saves book ids, not the student's name, class or reading habits.
2. **Tell users what you save.** For example, a line on the About screen: "This app saves the books you mark 'Save for later' on this phone only."
3. **Let users clear it.** The "Clear saved books" button does this in one tap.

A student who shares a phone with a brother or sister should be able to wipe their list without uninstalling the app. That is respect built into the design.

## ⚠️ Common Mistake

**Mistake 1: declaring a second DataStore for the same file.**

Later you write a new file, `ThemeStore.kt`, and copy the top line into it with a new name:

```kotlin
// ThemeStore.kt
val Context.themeStore by preferencesDataStore(name = "settings")   // wrong
```

What happens: the app builds, but now two DataStores both open the file `settings`. When both are used, DataStore stops the app with an error that says there are multiple DataStores active for the same file. The fix: declare each file **once**, at the top level of one Kotlin file, and reuse `context.dataStore` everywhere (or give the new one a different file name).

```kotlin
// SavedBooksStore.kt, the only place, outside any class or function
val Context.dataStore by preferencesDataStore(name = "settings")   // right
```

**Mistake 2: calling a suspend function straight from `onClick`.**

```kotlin
TextButton(onClick = { store.toggle(book.id) }) { ... }            // wrong
```

What happens: Android Studio underlines it in red. The message says that a suspend function should be called only from a coroutine or another suspend function. Wrap it in `launch`:

```kotlin
TextButton(onClick = { scope.launch { store.toggle(book.id) } }) { ... }   // right
```

## ✍️ Try It

Save one more setting: whether the list shows **only available books**. Add a `booleanPreferencesKey("only_available")` to `SavedBooksStore`, a `Flow<Boolean>` to read it (use `?: false` when it is missing) and a `suspend fun setOnlyAvailable(value: Boolean)`. On the list screen, add a `Switch` labelled "Only available books". Close the app fully and open it again: the switch should keep its position.

*Hint:* `Switch(checked = onlyAvailable, onCheckedChange = { value -> scope.launch { store.setOnlyAvailable(value) } })`. Filter the list with `sampleBooks.filter { !onlyAvailable || it.available }`.

## 📝 Recap

- `remember` and `rememberSaveable` live in memory; closing the app wipes them.
- Use DataStore for small settings and ids, Room for tables, and a server for data shared between phones.
- Declare `val Context.dataStore by preferencesDataStore(name = "settings")` once, at the top of a file.
- Read with `store.savedIds.collectAsState(initial = emptySet())`; write with `scope.launch { store.toggle(id) }` inside `edit { }`.
- The file is the source of truth: the screen updates because the Flow reports each change.
- Saved data is an *amānah*: save little, say what you save, and offer a "Clear" button.

## 🏆 Practice

### 🟢 Level 1: Recall
1. A student turns the phone sideways, then later swipes the app away. Which of these survive each event: a `remember` value, a `rememberSaveable` value, a DataStore value?
2. Why are the book ids stored as strings?
3. What does `initial = emptySet()` mean in `collectAsState`?

<details>
<summary>Show answer</summary>

1. Turning sideways: `rememberSaveable` and DataStore survive; `remember` is lost. Swiping the app away: only DataStore survives.
2. Preferences DataStore has a key for a set of strings (`stringSetPreferencesKey`) but none for a set of numbers. We turn the ids into text when saving and back into numbers with `toIntOrNull()` when reading.
3. It is the value the screen uses before the file has been read for the first time. Here: no books saved yet.

</details>

### 🟡 Level 2: Apply
On the detail screen (Chapter 14), show "Saved for later" under the shelf line when the book is saved, and nothing when it is not. Write the lines you add to `BookDetailScreen`.

<details>
<summary>Show answer</summary>

At the top of `BookDetailScreen`:

```kotlin
val context = LocalContext.current
val store = remember { SavedBooksStore(context.applicationContext) }
val savedIds by store.savedIds.collectAsState(initial = emptySet())
```

Inside the `else` branch, after the shelf line:

```kotlin
if (bookId in savedIds) {
    Text("Saved for later")
}
```

Both screens read the same file, so a book saved on the list shows the line on its detail screen.

</details>

### 🔴 Level 3: Challenge
Make clearing safer and more honest:

1. When "Clear saved books" is tapped, show an `AlertDialog` asking "Remove all saved books from this phone?" with the buttons "Clear" and "Cancel".
2. Only "Clear" calls `store.clearAll()`.
3. Add a small grey line under the top bar: "Saved books are kept on this phone only."

<details>
<summary>Show one possible answer</summary>

```kotlin
// At the top of BookListScreen, next to the other state:
var showClearDialog by remember { mutableStateOf(false) }

// The text under the top bar, first item in the Column:
Text(
    "Saved books are kept on this phone only.",
    style = MaterialTheme.typography.bodySmall,
    color = MaterialTheme.colorScheme.onSurfaceVariant,
    modifier = Modifier.padding(horizontal = 16.dp)
)

// The clear button now only opens the dialog:
TextButton(
    onClick = { showClearDialog = true },
    enabled = savedIds.isNotEmpty()
) {
    Text("Clear saved books")
}

// Anywhere inside BookListScreen:
if (showClearDialog) {
    AlertDialog(
        onDismissRequest = { showClearDialog = false },
        title = { Text("Clear saved books?") },
        text = { Text("Remove all saved books from this phone?") },
        confirmButton = {
            TextButton(onClick = {
                scope.launch { store.clearAll() }
                showClearDialog = false
            }) { Text("Clear") }
        },
        dismissButton = {
            TextButton(onClick = { showClearDialog = false }) { Text("Cancel") }
        }
    )
}
```

New imports: `androidx.compose.material3.AlertDialog`, `androidx.compose.runtime.mutableStateOf` and `androidx.compose.runtime.setValue`. Tapping outside the dialog or the system Back button calls `onDismissRequest`, which closes it without clearing anything.

</details>
