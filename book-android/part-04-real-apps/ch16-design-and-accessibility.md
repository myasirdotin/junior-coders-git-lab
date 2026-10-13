# Chapter 16: Design, Themes and Accessibility

## 🌟 Real-Life Story

A good school library is easy for everyone to use. The signs all use the same colours and letters, so you learn them once. There are large-print books for a grandfather who visits, a ramp next to the stairs, and a librarian who reads aloud to a student who cannot see well. None of this is extra decoration. It is how the library says "you are welcome here". In this chapter our app learns to do the same: one tidy look, a dark mode, and care for every kind of user.

## 🎯 What You Will Learn

- Find the Material 3 theme in `Theme.kt` and change its colours, text styles and shapes.
- Explain dynamic colour on Android 12+ and dark theme with `isSystemInDarkTheme()`.
- Use `MaterialTheme.colorScheme` in screens instead of hard-coded colours.
- Make screens accessible: content descriptions, 48dp touch targets, good contrast, text that scales and merged rows.
- Test with TalkBack and give the app its own icon with Image Asset Studio.

## Where the Theme Lives

When you created the project, Android Studio made a folder `ui/theme` with three files:

| File | What it holds |
|------|---------------|
| `Color.kt` | Colour values, such as `Purple80` |
| `Type.kt` | Text styles (`Typography`): sizes, weights, line heights |
| `Theme.kt` | The `SchoolLibraryTheme` function that puts it all together |

Every screen sits inside `SchoolLibraryTheme { ... }` (look at `MainActivity`). That function gives all the Material components inside it the same colours, text styles and shapes. Change the theme once, and the whole app changes.

Here is `Theme.kt` as the template makes it, with our package name:

```kotlin
package org.juniorcoders.library.ui.theme

import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.LocalContext

private val DarkColorScheme = darkColorScheme(
    primary = Purple80,
    secondary = PurpleGrey80,
    tertiary = Pink80
)

private val LightColorScheme = lightColorScheme(
    primary = Purple40,
    secondary = PurpleGrey40,
    tertiary = Pink40
)

@Composable
fun SchoolLibraryTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = true,
    content: @Composable () -> Unit
) {
    val colorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            val context = LocalContext.current
            if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
        }
        darkTheme -> DarkColorScheme
        else -> LightColorScheme
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}
```

Read it as three decisions, in order:

1. If dynamic colour is on **and** the phone runs Android 12 or newer, use colours taken from the phone's wallpaper.
2. Otherwise, if the phone is in dark mode, use `DarkColorScheme`.
3. Otherwise, use `LightColorScheme`.

You have used `when` like this since Chapter 5.

## The Colour Scheme: Colours with Jobs

A Material 3 **colour scheme** is a set of colours, each with a job. It is called a **role**. You never ask for "green"; you ask for "the primary colour", and the theme decides which green.

| Role | Its job | Library app example |
|------|---------|---------------------|
| `primary` | Main brand colour, important buttons | "Borrow" button |
| `onPrimary` | Text and icons drawn **on** primary | The word "Borrow" |
| `primaryContainer` | A softer area in the brand colour | The "Available" label |
| `surface` | The background of cards and screens | The book cards |
| `onSurface` | Normal text on surfaces | Book titles |
| `onSurfaceVariant` | Quieter text | "Shelf: Science A3" |
| `error` | Problems and warnings | "Book not found" |

Each "on" colour is chosen to be readable on its partner. If you use `primary` as a background, use `onPrimary` for the text on it.

### Giving the app library colours

Change `Color.kt` and the two schemes in `Theme.kt`. You only list the roles you want to change; Material fills in the rest.

```kotlin
// Color.kt
val LibraryGreen = Color(0xFF2E6B4F)
val LibraryGreenLight = Color(0xFF9BD4B4)
val LibraryGreenDark = Color(0xFF003822)

// Theme.kt
private val LightColorScheme = lightColorScheme(
    primary = LibraryGreen,
    onPrimary = Color.White
)

private val DarkColorScheme = darkColorScheme(
    primary = LibraryGreenLight,
    onPrimary = LibraryGreenDark
)
```

`Color(0xFF2E6B4F)` is a colour written as a hex number: `FF` means fully solid (opaque), then red `2E`, green `6B`, blue `4F`. (`Color` is imported from `androidx.compose.ui.graphics.Color`; `Color.kt` already has that import.) Notice that the dark scheme uses a **lighter** green. A dark green on a dark background would be hard to read.

## Dynamic Colour and Dark Theme

**Dynamic colour** (Android 12 and newer) builds the colour scheme from the user's wallpaper. Every app on the phone then feels like part of one family. It is on in the template (`dynamicColor: Boolean = true`).

Should our library app use it? Both answers are fine:

| Choice | What users see |
|--------|----------------|
| `dynamicColor = true` | Colours match their wallpaper on Android 12+; your greens on older phones |
| `dynamicColor = false` | Your library greens on every phone |

A school might want its own colours everywhere, so you can set `dynamicColor: Boolean = false`. Whatever you pick, the code in your screens stays the same, because screens only ask for roles.

**Dark theme** comes from `isSystemInDarkTheme()`. It returns `true` when the user has turned on dark mode in the phone's settings. Many people use dark mode at night or to save battery, and some find it easier on their eyes. Your app should follow their choice.

To see both at once in Android Studio, put this annotation on a preview:

```kotlin
@PreviewLightDark
@Composable
fun BookRowPreview() {
    SchoolLibraryTheme {
        BookRow(book = sampleBooks[0], isSaved = false, onClick = { }, onToggleSave = { })
    }
}
```

`@PreviewLightDark` (from `androidx.compose.ui.tooling.preview`) draws the preview twice: once light, once dark.

## Text Styles and Shapes

`Type.kt` holds the **typography**: the set of text styles. Material 3 names them by size and job.

| Style | Used for |
|-------|----------|
| `headlineSmall` | A screen heading, like the book title on the detail screen |
| `titleMedium` | Titles in cards |
| `bodyLarge` / `bodyMedium` | Normal reading text |
| `labelLarge` | Text on buttons |

In screens, always write `style = MaterialTheme.typography.titleMedium`. Never write a raw size such as `fontSize = 17.sp` in a screen. Then, if you change `titleMedium` in `Type.kt`, every card title changes together.

**Shapes** set how round the corners are. The template does not add them, but you can:

```kotlin
// Theme.kt (also import androidx.compose.material3.Shapes,
// androidx.compose.foundation.shape.RoundedCornerShape and androidx.compose.ui.unit.dp)
private val LibraryShapes = Shapes(
    small = RoundedCornerShape(8.dp),
    medium = RoundedCornerShape(16.dp),
    large = RoundedCornerShape(24.dp)
)

// ...and inside SchoolLibraryTheme:
MaterialTheme(
    colorScheme = colorScheme,
    typography = Typography,
    shapes = LibraryShapes,
    content = content
)
```

Material 3 cards use the `medium` shape, so every `Card` in the app now has 16dp round corners.

## Never Hard-Code Colours in Screens

Look at this book card text:

```kotlin
Text(book.title, color = Color.Black)                              // wrong
Text(book.title, color = MaterialTheme.colorScheme.onSurface)      // right
```

In light mode both look the same. In dark mode the card turns dark, and black text on it almost vanishes. The contrast is only about 1.1 to 1 (you will see what that means below). The second line asks for the role `onSurface`, which is dark in light mode and light in dark mode.

Here is an "Available" label done the right way:

```kotlin
@Composable
fun AvailabilityLabel(available: Boolean) {
    Surface(
        color = if (available) MaterialTheme.colorScheme.primaryContainer
                else MaterialTheme.colorScheme.surfaceVariant,
        contentColor = if (available) MaterialTheme.colorScheme.onPrimaryContainer
                       else MaterialTheme.colorScheme.onSurfaceVariant,
        shape = MaterialTheme.shapes.small
    ) {
        Text(
            if (available) "Available" else "On loan",
            style = MaterialTheme.typography.labelLarge,
            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
        )
    }
}
```

`Surface` (from `androidx.compose.material3`) is a simple box with a background colour and a shape. Its `contentColor` becomes the colour of the text inside. Notice the label says "Available" or "On loan" in **words**. About one in twelve men and one in two hundred women have some colour blindness, so never use colour as the only signal.

```text
Light mode                Dark mode
+-------------+           +-------------+
| Available   |           | Available   |
+-------------+           +-------------+
soft green,               deep green,
dark text                 light text
```

## Accessibility: An App for Everyone

**Accessibility** means people with different abilities can use your app: people who cannot see well or at all, people with shaky hands, people who need large text. It also helps everyone else, for example in bright sunlight. Caring for every user is part of *iḥsān*, doing work with excellence.

### Content descriptions

A **screen reader** reads the screen aloud. Android's screen reader is called **TalkBack**. It reads `Text` by itself. For an `Image` or `Icon`, it reads the `contentDescription`.

```kotlin
// An icon that does something: describe the action
IconButton(onClick = onBack) {
    Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back")
}

// A book cover that shows information: describe it
Image(
    painter = painterResource(R.drawable.cover_solar_system),
    contentDescription = "Cover of Our Solar System"
)

// A decorative picture next to text that already says it all
Icon(Icons.Filled.Info, contentDescription = null)
```

`contentDescription = null` tells TalkBack to skip it. Use `null` only for decoration. Describe what a thing *does* or *shows*, not what it looks like: "Back", not "Arrow pointing left".

### Touch targets of at least 48dp

Fingers are bigger than mouse pointers. Anything you can tap should be at least **48dp by 48dp**, even if the icon inside is smaller. Material buttons, `IconButton`, `Checkbox` and `Switch` already reserve this space.

```kotlin
// wrong: the tap area is only 20dp
Icon(
    Icons.Filled.Info,
    contentDescription = "About this book",
    modifier = Modifier.size(20.dp).clickable { showInfo() }
)

// right: IconButton gives a 48dp tap area around the icon
IconButton(onClick = { showInfo() }) {
    Icon(Icons.Filled.Info, contentDescription = "About this book")
}
```

If you build your own tappable item, `Modifier.minimumInteractiveComponentSize()` (from `androidx.compose.material3`) makes it at least 48dp.

### Colour contrast

**Contrast** is how different the text colour is from its background, written as a ratio. 21 to 1 is black on white (the most). 1 to 1 means the same colour (invisible). The common accessibility rule (WCAG) asks for at least **4.5 to 1** for normal text and **3 to 1** for large text.

| Text colour on background | Contrast | OK for normal text? |
|---------------------------|----------|---------------------|
| Black on white | 21.0 : 1 | Yes |
| Library green `2E6B4F` on white | 6.3 : 1 | Yes |
| Grey `757575` on white | 4.6 : 1 | Yes, just |
| Light green `9BD4B4` on dark `121212` | 11.1 : 1 | Yes |
| Grey `9E9E9E` on white | 2.7 : 1 | No |
| Light grey `BBBBBB` on white | 1.9 : 1 | No |

The "on" colours of a Material colour scheme are designed to pass. Trouble usually starts when someone picks a pretty light grey by hand. Online contrast checkers and the Accessibility Scanner app (below) measure it for you.

### Text that grows with the user's settings

Users can make all text bigger in the phone's settings (usually under **Display** or **Accessibility**, then **Font size**). Recent Android versions allow very large text, up to twice the normal size. Text sizes in `sp` grow with this setting; that is why text uses `sp` and spacing uses `dp`.

To let text grow safely:

- Use the typography styles (they are in `sp`).
- Do not give a box with text a fixed height. Use `Modifier.heightIn(min = 48.dp)` instead of `Modifier.height(48.dp)`, so the box can grow.
- Let long titles wrap onto two lines. Do not force one line unless you also show the full title somewhere.

`@PreviewFontScale` on a preview draws it at several font sizes, so you can spot cut-off text quickly.

### Merging a row for TalkBack

TalkBack moves from item to item, and the user swipes to go to the next one. Look at this information row on the detail screen:

```kotlin
Column {
    Text(book.title)
    Text("Author: ${book.author}")
    Text("Shelf: ${book.shelf}")
}
```

TalkBack stops three times: title, swipe, author, swipe, shelf. For one book that is tiring. Merge the three into one stop:

```kotlin
Column(modifier = Modifier.semantics(mergeDescendants = true) { }) {
    Text(book.title)
    Text("Author: ${book.author}")
    Text("Shelf: ${book.shelf}")
}
```

Now TalkBack reads "Our Solar System, Author: Amina Yusuf, Shelf: Science A3" in one go. `semantics` (from `androidx.compose.ui.semantics`) adds information for accessibility services. `mergeDescendants = true` means "treat everything inside me as one item". A `Card` with `onClick` already merges its contents like this, because it is one tappable thing. But a separate button inside it, like "Save for later", stays its own stop, which is what we want.

## Testing with TalkBack

Reading about accessibility is not enough. Try it:

1. On a phone or emulator, open **Settings → Accessibility → TalkBack** and turn it on. (Most phones and the emulator images with Google Play include it.)
2. Open the School Library app.
3. **Swipe right** to move to the next item. **Double-tap** anywhere to tap the selected item.
4. Listen. Does every button say what it does? Does each book card make sense when you hear it without seeing it?
5. Turn TalkBack off the same way (double-tap the switch).

You can also install Google's free **Accessibility Scanner** app. It takes a picture of your screen and points out small touch targets, low contrast and missing labels.

## Giving the App Its Own Icon

So far the app shows Android Studio's green robot icon. Make your own with **Image Asset Studio**:

1. In the Project panel, right-click the `res` folder and choose **New → Image Asset**.
2. Keep **Icon type: Launcher Icons (Adaptive and Legacy)** and **Name: ic_launcher**.
3. On the **Foreground Layer** tab, choose an image, a clip-art symbol (a book, for example) or text.
4. Use the **Resize** slider so the picture sits inside the safe circle in the middle.
5. On the **Background Layer** tab, pick a colour, such as library green.
6. Click **Next**, then **Finish**. Run the app and look at the home screen.

These are **adaptive icons**: each phone cuts the icon into its own shape (circle, rounded square and so on). That is why the important part must stay in the middle.

## ⚠️ Common Mistake

**Mistake 1: a colour that only works in one theme.**

```kotlin
Text("Shelf: ${book.shelf}", color = Color.DarkGray)                        // wrong
```

What happens: in dark mode the text is dark grey on a nearly black card. It is very hard to read, and you may not notice if you only test in light mode.

```kotlin
Text(
    "Shelf: ${book.shelf}",
    color = MaterialTheme.colorScheme.onSurfaceVariant                      // right
)
```

**Mistake 2: no label on an action icon.**

```kotlin
IconButton(onClick = onBack) {
    Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = null)    // wrong
}
```

What happens: TalkBack only says "Button". A blind student has no idea it goes back. Give action icons a label, and give `null` only to pictures that add nothing to the text next to them.

```kotlin
Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back")     // right
```

## ✍️ Try It

Turn on dark mode on your phone or emulator (usually in the quick settings panel, or **Settings → Display**). Open the School Library app and check every screen. Then set the font size to the largest and check again. Write down every place that is hard to read or cut off, and fix each one with a colour role or by removing a fixed height.

*Hint:* search your code for `Color.` and `.height(`. Every `Color.` inside a screen file (not in `Color.kt` or `Theme.kt`) is a suspect.

## 📝 Recap

- `SchoolLibraryTheme` in `Theme.kt` gives every screen the same colour scheme, typography and shapes.
- Dynamic colour (Android 12+) uses the wallpaper's colours; `isSystemInDarkTheme()` follows the user's dark mode.
- Screens ask for roles such as `MaterialTheme.colorScheme.onSurface`, never fixed colours, and never use colour as the only signal.
- Give action icons a `contentDescription`; use `null` only for decoration.
- Tap targets of at least 48dp, contrast of at least 4.5 to 1, text in `sp` with no fixed heights.
- Merge rows with `Modifier.semantics(mergeDescendants = true) { }`, test with TalkBack, and make an icon with Image Asset Studio.

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which theme file holds the text styles, and which holds the function `SchoolLibraryTheme`?
2. On which Android versions does dynamic colour work?
3. What is the smallest recommended size for anything the user can tap?
4. Why does text use `sp` instead of `dp`?

<details>
<summary>Show answer</summary>

1. `Type.kt` holds the text styles (`Typography`). `Theme.kt` holds `SchoolLibraryTheme`.
2. Android 12 and newer (`Build.VERSION_CODES.S`). Older phones use your own light or dark scheme.
3. 48dp by 48dp.
4. `sp` grows with the user's font size setting, so people who need large text can read it. `dp` does not.

</details>

### 🟡 Level 2: Apply
This book card has three problems. Find them and write a fixed version.

```kotlin
Card(onClick = onClick) {
    Row(modifier = Modifier.height(56.dp).padding(8.dp)) {
        Text(book.title, color = Color.Black, fontSize = 15.sp)
        Image(painterResource(R.drawable.star), contentDescription = "Yellow star")
    }
}
```

<details>
<summary>Show answer</summary>

1. `Modifier.height(56.dp)`: with large text the title is cut off. Use `heightIn(min = 56.dp)`.
2. `Color.Black` and `fontSize = 15.sp`: black disappears in dark mode, and the size skips the typography. Use the colour role and a style.
3. `"Yellow star"` describes the look, not the meaning. If the star means "saved", say so; if it is decoration, use `null`.

```kotlin
Card(onClick = onClick) {
    Row(
        modifier = Modifier
            .heightIn(min = 56.dp)
            .padding(8.dp)
    ) {
        Text(
            book.title,
            color = MaterialTheme.colorScheme.onSurface,
            style = MaterialTheme.typography.titleMedium
        )
        Image(
            painterResource(R.drawable.star),
            contentDescription = "Saved for later"
        )
    }
}
```

</details>

### 🔴 Level 3: Challenge
Give the School Library app a finished look:

1. Set your own light and dark colour schemes in `Theme.kt` (at least `primary` and `onPrimary` in each), and decide whether to keep dynamic colour.
2. Add `LibraryShapes` with 16dp medium corners.
3. Use `AvailabilityLabel` from this chapter in every `BookRow`.
4. Merge the title, author and shelf on the detail screen into one TalkBack stop.
5. Add a `@PreviewLightDark` preview for `BookRow` and check both versions.
6. Test the list with TalkBack and write the sentence it reads for the first book.

<details>
<summary>Show one possible answer</summary>

```kotlin
// Theme.kt
private val LightColorScheme = lightColorScheme(
    primary = LibraryGreen,
    onPrimary = Color.White
)

private val DarkColorScheme = darkColorScheme(
    primary = LibraryGreenLight,
    onPrimary = LibraryGreenDark
)

private val LibraryShapes = Shapes(
    small = RoundedCornerShape(8.dp),
    medium = RoundedCornerShape(16.dp),
    large = RoundedCornerShape(24.dp)
)

@Composable
fun SchoolLibraryTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = false,          // school colours on every phone
    content: @Composable () -> Unit
) {
    // ...the same when { } as the template...
    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        shapes = LibraryShapes,
        content = content
    )
}

// BookRow: inside the Column, under the author
AvailabilityLabel(available = book.available)

// BookDetailScreen: the info Column
Column(
    modifier = Modifier.semantics(mergeDescendants = true) { },
    verticalArrangement = Arrangement.spacedBy(8.dp)
) {
    Text(book.title, style = MaterialTheme.typography.headlineSmall)
    Text("Author: ${book.author}")
    Text("Shelf: ${book.shelf}")
}

@PreviewLightDark
@Composable
fun BookRowPreview() {
    SchoolLibraryTheme {
        BookRow(book = sampleBooks[0], isSaved = false, onClick = { }, onToggleSave = { })
    }
}
```

On the list, TalkBack reads the first card as one item, something like "Our Solar System, Amina Yusuf, Available, double-tap to activate". Then it moves to the separate "Save for later" button. The exact words may differ a little between phones.

</details>
