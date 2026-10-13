# Quick Reference & Glossary

Keep this page open while you build. Each table shows the short form of something the book teaches, with the chapter where it is explained in full. The glossary at the end explains about fifty words you will meet in Android development.

## 🎯 What You Will Learn

- Find the Kotlin syntax for variables, decisions, lists, loops, functions, classes and null safety in seconds.
- Look up the Compose building blocks for screens, layout, state, input, lists, navigation and saving.
- Remember the Android Studio actions you use every day.
- Check the meaning of an Android word in the glossary.

## 🟣 Kotlin Quick Reference

All the examples in this part are plain Kotlin. You can run them in the Kotlin Playground inside `fun main() { }`.

### Variables and types (Chapter 4)

| You want | Kotlin | Notes |
|----------|--------|-------|
| A value that never changes | `val school = "Junior Coders"` | Use `val` by default |
| A value that changes | `var copies = 3` | Then `copies += 1` |
| Say the type | `val pages: Int = 120` | Usually Kotlin guesses it |
| Whole number | `Int` | `42` |
| Decimal number | `Double` | `3.5` |
| Text | `String` | `"Hello"` |
| One character | `Char` | `'A'` |
| True or false | `Boolean` | `true` |
| Put a value in text | `"$school has $copies copies"` | Prints `Junior Coders has 4 copies` |
| Put an expression in text | `"${book.title} (${pages / 2})"` | Use `${ }` for anything longer than a name |
| Text to number safely | `"42".toIntOrNull()` | `42`, or `null` for `"abc"` |

### Decisions (Chapter 5)

| You want | Kotlin |
|----------|--------|
| Choose a value | `val label = if (pages > 100) "long" else "short"` |
| Several cases | `when (grade) { 6, 7, 8 -> "middle"; in 9..10 -> "secondary"; else -> "other" }` |
| A range check | `x in 1..10` (1 to 10, both included) |
| And, or, not | `&&`, `\|\|`, `!` |
| Equal, not equal | `==`, `!=` |

### Lists and loops (Chapter 6)

| You want | Kotlin | Result |
|----------|--------|--------|
| A fixed list | `val subjects = listOf("Maths", "Science", "Arabic")` | |
| A list you can change | `val todo = mutableListOf("Maths")` then `todo.add("History")` | `[Maths, History]` |
| Size and first item | `subjects.size`, `subjects[0]` | `3`, `Maths` |
| Loop over items | `for (s in subjects) { println(s) }` | |
| Count 1 to 3 | `for (i in 1..3)` | 1, 2, 3 |
| Count 0 to 2 | `for (i in 0 until 3)` | 0, 1, 2 |
| Repeat while true | `while (n > 0) { n-- }` | |
| Is it in the list? | `subjects.contains("Maths")` or `"Maths" in subjects` | `true` |
| Join to text | `subjects.joinToString(", ")` | `Maths, Science, Arabic` |
| Sort, add up | `listOf(3, 1, 2).sorted()`, `listOf(30, 25).sum()` | `[1, 2, 3]`, `55` |

### Functions and lambdas (Chapter 7)

| You want | Kotlin |
|----------|--------|
| A function | `fun greet(name: String): String { return "Welcome, $name!" }` |
| A short function | `fun greet(name: String) = "Welcome, $name!"` |
| A default value | `fun greet(name: String = "reader")` |
| A lambda | `val double = { x: Int -> x * 2 }` then `double(4)` gives `8` |
| Keep some items | `numbers.filter { it % 2 == 0 }` |
| Change every item | `numbers.map { it * 10 }` |
| Count matching items | `books.count { it.available }` |
| Add up one field | `tasks.sumOf { it.minutes }` |

`it` is the automatic name of the single parameter in a lambda.

### Classes and null safety (Chapter 8)

| You want | Kotlin |
|----------|--------|
| A data class | `data class Book(val id: Int, val title: String, val available: Boolean)` |
| Make an object | `val book = Book(1, "Our Solar System", true)` |
| Copy with one change | `val borrowed = book.copy(available = false)` |
| A type that may be null | `val nickname: String? = null` |
| Safe call | `nickname?.length` gives `null` instead of crashing |
| Default if null | `nickname ?: "no nickname"` (the Elvis operator) |
| Check, then use | `if (nickname != null) println(nickname.length)` |
| Never in this book | `!!` (it crashes when the value is null) |

### Useful text functions

| Function | Example | Result |
|----------|---------|--------|
| `length` | `"Kotlin".length` | `6` |
| `uppercase()` | `"kotlin".uppercase()` | `KOTLIN` |
| `trim()` | `"  hi ".trim()` | `hi` |
| `isBlank()` | `"   ".isBlank()` | `true` |
| `contains()` | `"Science A3".contains("A3")` | `true` |
| `split()` | `"a\|b".split("\|")` | `[a, b]` |

## 📱 Compose Quick Reference

Compose code runs in Android Studio, not in the Playground.

### The app's starting point (Chapter 3)

```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            SchoolLibraryTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    BookList(modifier = Modifier.padding(innerPadding))
                }
            }
        }
    }
}
```

### Showing things (Chapter 9)

| You want | Compose |
|----------|---------|
| A screen function | `@Composable fun BookCard(book: Book) { ... }` |
| Text | `Text("Hello")` or `Text(stringResource(R.string.app_name))` |
| Text style | `Text("Title", style = MaterialTheme.typography.titleLarge)` |
| An image | `Image(painter = painterResource(R.drawable.cover), contentDescription = "Book cover")` |
| A decorative image | `contentDescription = null` |
| A preview | `@Preview(showBackground = true) @Composable fun BookCardPreview() { ... }` |

### Layout and modifiers (Chapter 10)

| You want | Compose |
|----------|---------|
| Items top to bottom | `Column { }` |
| Items side by side | `Row { }` |
| Items on top of each other | `Box { }` |
| Space between items | `Column(verticalArrangement = Arrangement.spacedBy(8.dp))` |
| A gap | `Spacer(Modifier.height(16.dp))` |
| A card | `Card(modifier = Modifier.fillMaxWidth()) { }` |
| Padding | `Modifier.padding(16.dp)` |
| Full width | `Modifier.fillMaxWidth()` |
| Take the leftover space in a Row | `Modifier.weight(1f)` |
| Chain modifiers | `Modifier.fillMaxWidth().padding(16.dp)` (order matters) |
| Sizes | `dp` for spacing, `sp` for text; touch targets at least `48.dp` |

### Buttons and state (Chapter 11)

| You want | Compose |
|----------|---------|
| A button | `Button(onClick = { count++ }) { Text("Borrow") }` |
| Other buttons | `OutlinedButton`, `TextButton`, `IconButton` |
| A number that changes | `var count by remember { mutableIntStateOf(0) }` |
| A value that survives rotation | `var saved by rememberSaveable { mutableStateOf(false) }` |
| Imports for `by` | `androidx.compose.runtime.getValue`, `androidx.compose.runtime.setValue` |
| A switch / checkbox | `Switch(checked = on, onCheckedChange = { on = it })`, `Checkbox(...)` |

### Text input (Chapter 12)

```kotlin
var query by rememberSaveable { mutableStateOf("") }
OutlinedTextField(
    value = query,
    onValueChange = { query = it },
    label = { Text("Search titles") },
    singleLine = true,
    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Text)
)
```

### Scrolling lists (Chapter 13)

| You want | Compose |
|----------|---------|
| A long list | `LazyColumn { items(books, key = { it.id }) { book -> BookRow(book) } }` |
| Import | `androidx.compose.foundation.lazy.items` |
| A sideways list | `LazyRow { }` |
| Space around the list | `contentPadding = PaddingValues(16.dp)` |
| A short column that scrolls | `Column(Modifier.verticalScroll(rememberScrollState()))` |

### More than one screen (Chapter 14)

| You want | Compose |
|----------|---------|
| A route | `@Serializable object Home`, `@Serializable data class BookDetail(val id: Int)` |
| The controller | `val navController = rememberNavController()` |
| The map of screens | `NavHost(navController, startDestination = Home) { composable<Home> { } }` |
| Go to a screen | `navController.navigate(BookDetail(book.id))` |
| Read the route's value | `val detail = backStackEntry.toRoute<BookDetail>()` |
| Go back | `navController.popBackStack()` |
| Setup | Navigation Compose library and the Kotlin serialization plugin |

### Saving data (Chapter 15)

| You want | Kotlin / Compose |
|----------|------------------|
| A DataStore | `private val Context.dataStore by preferencesDataStore(name = "settings")` |
| A key | `stringPreferencesKey("tasks")`, `booleanPreferencesKey("dark")`, `stringSetPreferencesKey("saved_ids")` |
| Read as state | `store.flow.collectAsState(initial = ...)` |
| Save in the background | `val scope = rememberCoroutineScope()` then `scope.launch { store.save(...) }` |
| Bigger tables | Room (a database on the phone), a later topic |

### Design and accessibility (Chapter 16)

| You want | Compose |
|----------|---------|
| Theme colours | `MaterialTheme.colorScheme.primary`, `.surface`, `.error` |
| Dark mode check | `isSystemInDarkTheme()` |
| A label for TalkBack | `contentDescription = "Save Our Solar System for later"` |
| A whole row as one checkbox | `Modifier.toggleable(value, role = Role.Checkbox, onValueChange = { })` |

### Permissions (Chapter 17)

```kotlin
val launcher = rememberLauncherForActivityResult(
    ActivityResultContracts.RequestPermission()
) { granted -> /* update state, keep working if false */ }

// Only after your own explanation:
launcher.launch(Manifest.permission.POST_NOTIFICATIONS)
```

Declare it first in `AndroidManifest.xml`: `<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />`.

### Testing and sharing (Chapter 18)

| You want | How |
|----------|-----|
| A debug message | `Log.d("Library", "Saved book 3")`, then filter Logcat with `tag:Library` |
| A unit test | `@Test fun mixed_showsBoth() { assertEquals("1 h 30 min", formatMinutes(90)) }` in `app/src/test` |
| Previews of many sizes | `@PreviewLightDark`, `@PreviewScreenSizes`, `@PreviewFontScale` |
| A release file | **Build → Generate Signed App Bundle / APK** |
| Version numbers | `versionCode = 2`, `versionName = "1.1"` in `app/build.gradle.kts` |

## ⌨️ Android Studio Actions

| Action | Where (Windows keys) |
|--------|---------------------|
| Run the app | Green arrow, or Shift + F10 |
| Debug the app | Bug icon, or Shift + F9 |
| Fix a red word (add import) | Alt + Enter |
| Reformat the code | Ctrl + Alt + L |
| Find anything | Press Shift twice |
| Rename everywhere | Shift + F6 |
| Sync Gradle files | **Sync Now** bar after editing `build.gradle.kts` |
| Logcat | **View → Tool Windows → Logcat** |
| Emulators | **Device Manager** on the right side |

## 📖 Glossary

| Term | Meaning |
|------|---------|
| **Activity** | One entry point of an app that Android can open; our apps have one, `MainActivity`. |
| **Android Studio** | Google's free program for writing, running and testing Android apps. |
| **Android Virtual Device (AVD)** | An emulator setup: a pretend phone with a chosen screen size and Android version. |
| **API level** | The number of an Android version, for example Android 13 is API level 33. |
| **APK** | Android Package: the file that installs an app on a phone. |
| **App bundle (AAB)** | The file you upload to Google Play; Play builds the right APK for each phone. |
| **Accessibility** | Making an app usable by everyone, including people who use TalkBack or large text. |
| **Breakpoint** | A marked line where the debugger pauses the app. |
| **Build** | Turning your code and files into an app the phone can run. |
| **Composable** | A function marked `@Composable` that describes part of the screen. |
| **Compose (Jetpack Compose)** | Android's modern toolkit for building screens in Kotlin. |
| **Content description** | Words that TalkBack reads aloud for an image or icon. |
| **Context** | An object that lets code talk to Android, for example to check permissions or open DataStore. |
| **Coroutine scope** | A helper that runs work, like saving, in the background. |
| **Data class** | A Kotlin class made to hold data, with `copy`, `==` and printing built in. |
| **Data safety form** | The Play Store form where developers declare what data their app collects and shares. |
| **DataStore** | A Jetpack library that saves small amounts of data on the phone. |
| **Debugger** | A tool that pauses the app so you can see variables and run code step by step. |
| **dp** | Density-independent pixels: a size unit that looks the same on every screen. |
| **Elvis operator** | `?:`, which gives a default value when the left side is `null`. |
| **Emulator** | A program that runs a pretend Android phone on your computer. |
| **Exception** | An error object; if nothing handles it, the app crashes. |
| **Flow** | A stream of values that arrive over time, such as saved data each time it changes. |
| **Gradle** | The build tool that downloads libraries and builds the app. |
| **Immutable** | Cannot be changed after it is made, like a `val` or a `listOf` list. |
| **Keystore** | A password-protected file that holds the key used to sign your app. |
| **Kotlin** | The programming language Google recommends for Android apps. |
| **Lambda** | A small function without a name, written in `{ }`, often passed to another function. |
| **LazyColumn** | A list that only builds the rows you can see, so long lists stay fast. |
| **Launcher** | An object that opens a system screen or dialog and returns the result. |
| **Library** | Ready-made code you add to your app, such as Navigation Compose. |
| **Logcat** | Android Studio's window of messages from the phone or emulator. |
| **Manifest** | `AndroidManifest.xml`, the app's ID card: name, screens and permissions. |
| **Material 3** | Google's current design system: colours, shapes, text styles and components. |
| **Modifier** | An object that changes how a composable looks or behaves: size, padding, clicks. |
| **NavHost** | The part of the screen that shows the current destination and swaps screens. |
| **Null safety** | Kotlin's rules that stop you using a value that might be missing (`null`). |
| **Package name** | The app's unique ID, written like a reversed web address, e.g. `org.juniorcoders.library`. |
| **Permission** | Android's approval for an app to use a protected part of the phone. |
| **Preview** | A function marked `@Preview` that Android Studio draws without running the app. |
| **Recomposition** | Compose running a composable again because the state it reads has changed. |
| **Resource** | A file in `res/`, such as text in `strings.xml`, images or colours. |
| **Route** | The name (and values) of a screen used by navigation, such as `BookDetail(3)`. |
| **Runtime permission** | A permission the user grants in a dialog while the app runs. |
| **Scaffold** | A Material layout with places for a top bar, content and floating button. |
| **SDK** | Software development kit: a set of tools or a library for building software. |
| **Signing** | Sealing an app with a secret key to prove who made it and that it was not changed. |
| **sp** | Scale-independent pixels: the unit for text; it grows with the user's font size. |
| **Stack trace** | The list of functions that were running when a crash happened. |
| **State** | A value that can change and that the screen shows, such as a counter. |
| **State hoisting** | Keeping state in a parent and passing values and event lambdas to child composables. |
| **TalkBack** | Android's screen reader, which reads the screen aloud for people who cannot see it well. |
| **Theme** | The app's colours, text styles and shapes, for example `SchoolLibraryTheme`. |
| **Unit test** | A small automatic check of one function, run with JUnit. |
| **versionCode** | A whole number that must increase with each release. |

## 📝 Recap

- The Kotlin tables cover Chapters 4 to 8: `val`/`var`, `if`/`when`, lists, loops, functions, lambdas, data classes and null safety.
- The Compose tables cover Chapters 9 to 18: screens, layout, state, input, lists, navigation, saving, design, permissions and testing.
- When something is unclear, go back to the chapter named in the table for the full explanation and examples.
- Use the glossary to check a word, then explain it to a classmate in your own words: that is the best test that you understand it.
