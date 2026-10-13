# Chapter 18: Testing and Sharing Your App

## 🌟 Real-Life Story

Before a school bakery sale, the class bakes one test tray first. They taste a biscuit, check that the middle is cooked and try the oven at a lower heat. Only then do they bake two hundred. On sale day each box gets a label with the class name and the date, so families know who made it and that it is safe to eat.

Apps are the same. First you test: you watch what the app is doing, find the cause of a crash and check it on small and large screens. Then you put a "label" on it: a **signature** that proves the app came from you. Only then do you share it.

## 🎯 What You Will Learn

- Print messages with `Log.d` and read them in **Logcat**.
- Read a crash **stack trace** and find the line that caused it.
- Pause the app with a **breakpoint** and look at variables in the debugger.
- Test on different screen sizes, in dark mode and with large text, and write a small **unit test** with JUnit.
- Explain signing, keystores, versions and the safe ways to share an app with family or a teacher.

## Logcat and Log.d

**Logcat** is a window in Android Studio that shows messages from the phone or emulator. Open it with **View → Tool Windows → Logcat** (or the Logcat tab at the bottom). Android writes many messages there. Your app can add its own.

`Log.d` writes a **debug** message. It takes a **tag** (a short label you choose) and the message:

```kotlin
import android.util.Log

private const val TAG = "Library"

fun saveForLater(book: Book) {
    Log.d(TAG, "Saved book ${book.id}: ${book.title}")
    // ...the saving code from Chapter 15...
}
```

`private const val` makes a fixed value that only this file can see. When the user taps "Save for later" on *Kind Words, Strong Hearts*, Logcat shows a line like this (the date, time and process numbers are left out here):

```text
D  Library  Saved book 3: Kind Words, Strong Hearts
```

The `D` means "debug". Logcat shows thousands of lines, so type `tag:Library` in Logcat's search box. Now you see only your messages.

There are five common log levels:

| Function | Level | Use it for |
|----------|-------|-----------|
| `Log.v` | Verbose | Very detailed steps |
| `Log.d` | Debug | Checking what your code does |
| `Log.i` | Info | Normal events worth noting |
| `Log.w` | Warning | Something odd, but the app goes on |
| `Log.e` | Error | Something failed |

**Amānah in logs:** never log passwords, names or other personal data. Logs can be read by anyone who connects the phone to a computer. Log ids and counts, not people.

## Reading a Crash Stack Trace

When an app crashes, Android closes it and Logcat prints a **stack trace** in red. A **stack trace** is the list of functions that were running when the error happened, newest first. It looks scary, but you only need three things from it.

You can see a real stack trace with plain Kotlin. This program tries to turn the word `"forty"` into a number:

```kotlin
fun parseMinutes(text: String): Int {
    return text.toInt()
}

fun main() {
    println("Planned: " + parseMinutes("45"))
    println("Planned: " + parseMinutes("forty"))
}
```

Output:

```text
Planned: 45
Exception in thread "main" java.lang.NumberFormatException: For input string: "forty"
	at java.base/java.lang.NumberFormatException.forInputString(NumberFormatException.java:67)
	at java.base/java.lang.Integer.parseInt(Integer.java:662)
	at java.base/java.lang.Integer.parseInt(Integer.java:778)
	at CrashKt.parseMinutes(Crash.kt:2)
	at CrashKt.main(Crash.kt:7)
	at CrashKt.main(Crash.kt)
```

(The file was called `Crash.kt`. Kotlin names the compiled file `CrashKt`.) Read it like this:

1. **What went wrong:** the first line names the **exception** (the error) and a message. `NumberFormatException: For input string: "forty"` means "this text is not a number".
2. **Where in your code:** skip the lines from `java.` and `android.`. Find the first line with **your** file name: `Crash.kt:2`. That is line 2, `text.toInt()`.
3. **Who called it:** the next line, `Crash.kt:7`, is the call `parseMinutes("forty")`.

In an Android app, Logcat shows the same kind of list. It starts with `FATAL EXCEPTION: main` and your app's package name. Your files appear as blue links such as `MainActivity.kt:42`. Click the link and Android Studio jumps to that line. Sometimes the useful part is lower down, after a line starting `Caused by:`.

The fix here is to use `toIntOrNull()` (Chapter 8), which gives `null` instead of crashing, and then show a kind message.

## Breakpoints and the Debugger

`Log.d` shows what you decided to print. The **debugger** lets you stop the app and look at **everything**.

1. Click in the grey **gutter** (the strip left of the line numbers) next to a line. A red dot appears. This is a **breakpoint**: a place where the app will pause.
2. Start the app with **Run → Debug 'app'** (the bug icon) instead of the green Run arrow.
3. Use the app. When it reaches the breakpoint, it freezes, and the line turns blue in Android Studio.
4. The **Variables** pane shows every variable and its value at that moment, for example `book = Book(id=3, title=Kind Words, Strong Hearts, ...)`.

Then move through the code step by step:

| Button | Key (Windows) | What it does |
|--------|--------------|--------------|
| Step Over | F8 | Run this line, stop at the next one |
| Step Into | F7 | Go inside the function on this line |
| Resume | F9 | Run on until the next breakpoint |

Debugging is detective work. Do not change code at random. Form a guess ("I think `available` is still false here"), stop at that line, and check it.

## Different Screens, Dark Mode and Large Text

Your classmates' phones are all different. Test at least these:

| Check | How |
|-------|-----|
| Small phone | An emulator with a small screen in **Device Manager** |
| Tablet or foldable | A tablet or resizable emulator |
| Turned sideways | Rotate the emulator |
| Dark mode | **Settings → Display → Dark theme** on the emulator |
| Large text | **Settings → Display → Font size** at the largest step |
| TalkBack | **Settings → Accessibility → TalkBack** (Chapter 16) |

Compose previews can show several versions at once without running the app. Put these annotations on a preview function:

```kotlin
import androidx.compose.ui.tooling.preview.PreviewFontScale
import androidx.compose.ui.tooling.preview.PreviewLightDark
import androidx.compose.ui.tooling.preview.PreviewScreenSizes

@PreviewLightDark
@PreviewScreenSizes
@PreviewFontScale
@Composable
fun BookCardPreview() {
    SchoolLibraryTheme {
        BookCard(book = sampleBooks[0])
    }
}
```

The preview pane now shows the card in a light and a dark version, on phone, foldable, tablet and desktop sizes, and with several text sizes. Look for text that is cut off, colours that are hard to read in dark mode, and buttons pushed off the screen.

## A Tiny Unit Test

Clicking through the app is slow. A **unit test** is a small piece of code that checks one function automatically. Android Studio projects already have a folder for them: `app/src/test/`. These tests run on your computer, not on a phone, so they take seconds.

Unit tests work best on plain Kotlin functions. Here is one that turns minutes into friendly text. Put it in `app/src/main/java/org/juniorcoders/library/TimeFormat.kt`:

```kotlin
package org.juniorcoders.library

fun formatMinutes(minutes: Int): String {
    val hours = minutes / 60
    val rest = minutes % 60
    return when {
        hours == 0 -> "$rest min"
        rest == 0 -> "$hours h"
        else -> "$hours h $rest min"
    }
}
```

`/` with two `Int` values drops the remainder, and `%` gives the remainder: 90 / 60 = 1 and 90 % 60 = 30.

Now the test. Put it in `app/src/test/java/org/juniorcoders/library/TimeFormatTest.kt`:

```kotlin
package org.juniorcoders.library

import org.junit.Assert.assertEquals
import org.junit.Test

class TimeFormatTest {

    @Test
    fun underAnHour_showsOnlyMinutes() {
        assertEquals("45 min", formatMinutes(45))
    }

    @Test
    fun wholeHours_showOnlyHours() {
        assertEquals("2 h", formatMinutes(120))
    }

    @Test
    fun mixed_showsBoth() {
        assertEquals("1 h 30 min", formatMinutes(90))
    }

    @Test
    fun zero_showsZeroMinutes() {
        assertEquals("0 min", formatMinutes(0))
    }
}
```

- **JUnit** is the testing library Android Studio's template already includes.
- `@Test` marks a function as a test. Each test checks one case.
- `assertEquals(expected, actual)` passes if the two values are equal. If not, the test **fails** and shows both values. Put the expected value first.
- Test names explain the case, so a failure tells you what broke.

To run the tests, right-click `TimeFormatTest` and choose **Run 'TimeFormatTest'**. The Run window shows a green tick next to each passing test. If a test fails, it turns red and shows a message like `expected:<1 h 30 min> but was:<...>`.

### Checking the same logic without Android Studio

You can try the same idea in the Kotlin Playground with a tiny `check` function instead of JUnit:

```kotlin
fun formatMinutes(minutes: Int): String {
    val hours = minutes / 60
    val rest = minutes % 60
    return when {
        hours == 0 -> "$rest min"
        rest == 0 -> "$hours h"
        else -> "$hours h $rest min"
    }
}

fun check(expected: String, actual: String) {
    val result = if (expected == actual) "PASS" else "FAIL"
    println("$result: expected \"$expected\", got \"$actual\"")
}

fun main() {
    check("45 min", formatMinutes(45))
    check("2 h", formatMinutes(120))
    check("1 h 30 min", formatMinutes(90))
    check("0 min", formatMinutes(0))
}
```

Output:

```text
PASS: expected "45 min", got "45 min"
PASS: expected "2 h", got "2 h"
PASS: expected "1 h 30 min", got "1 h 30 min"
PASS: expected "0 min", got "0 min"
```

Change `"$hours h $rest min"` to `"$hours h$rest min"` and run again. The third line says `FAIL`. That is the whole point of tests: they catch a small slip before a user does.

## Version Code and Version Name

Every app has two version values in `app/build.gradle.kts`, inside `defaultConfig`:

```kotlin
defaultConfig {
    applicationId = "org.juniorcoders.library"
    // ...
    versionCode = 2
    versionName = "1.1"
}
```

| Value | Type | Who reads it | Rule |
|-------|------|-------------|------|
| `versionCode` | Whole number | Android and the Play Store | Must be bigger for every new release |
| `versionName` | Text | People | Anything readable, like `"1.1"` |

Android uses `versionCode` to decide if a file is an update. If you share a new version with the same or a smaller `versionCode`, Android may refuse to install it over the old one. After changing these lines, click **Sync Now** at the top of the editor.

## Signing and the Keystore

Android only installs apps that are **signed**. A **signature** is a digital seal made with a secret key. It proves two things: who made the app, and that nobody changed it after it was signed.

The secret key lives in a **keystore**: a password-protected file (usually ending in `.jks`). Inside it is a **key** with its own name (the **alias**) and password.

When you press the green Run button, Android Studio signs the app with a **debug key** it made for you. That is fine for testing. For a real release you make your own keystore:

1. Open **Build → Generate Signed App Bundle / APK**.
2. Choose **Android App Bundle** (for the Play Store) or **APK** (to share the file directly).
3. Click **Create new...** under the keystore path. Choose where to save the file, a strong password, a key alias (for example `library-key`), a key password and a validity of at least 25 years. Fill in only the certificate details you need (a name or class name is enough).
4. Choose the **release** build and click **Create** (or **Finish**).
5. Android Studio builds the file and shows a link to the folder that holds it.

| File | Ends with | Used for |
|------|-----------|---------|
| App bundle | `.aab` | Uploading to Google Play, which makes the right APK for each phone |
| APK | `.apk` | Installing directly on a phone |

### Keep the keystore safe and private

The keystore is like the school's official stamp. Treat it that way:

- **Never lose it.** Every update must be signed with the same key. If you share APKs directly and lose the key, phones will not accept your update. Users would have to uninstall the old app first and lose their saved data. (Google Play has a recovery process for its upload key, but it is slow.)
- **Never share it or its passwords.** Anyone with the keystore can sign a fake app that looks like an update of yours.
- **Never put it in Git or on a public site.** Add `*.jks` to your `.gitignore` file.
- **Keep a backup** in a safe place, such as a USB stick your teacher or parent keeps.

## Sharing With Family or Your Teacher

The simplest way to try the app on a family phone: connect the phone with a USB cable, turn on **USB debugging** in its **Developer options** (Settings → About phone → tap **Build number** seven times to show them), and press Run. Android Studio installs the debug version.

To send a file instead, build a debug APK with **Build → Build App Bundle(s) / APK(s) → Build APK(s)** (some newer versions name it **Generate App Bundles or APKs**). The file appears in `app/build/outputs/apk/debug/app-debug.apk`. Copy it to the phone and tap it.

Android then shows a warning and asks you to allow "**Install unknown apps**" for the app that opened the file (for example, Files or the browser). Be honest about what that means:

- The warning is real and useful. Apps from outside the Play Store have not been checked by Google, and harmful apps often spread this way.
- It is safe here only because **you** built the app and you know what is inside.
- **Google Play Protect** may also scan the app or warn that it is from an unknown developer. That is normal for an app you made yourself.
- After installing, turn "Install unknown apps" **off** again for that app.
- Never ask friends to install APKs from strangers, and never install one yourself.

**A rule that is changing.** From 2026, Google has started to require that apps installed on most Android phones come from a **verified developer**, even when they are not from the Play Store. It began in a few countries and is spreading. Installing straight from Android Studio over a USB cable, as above, is not affected. If tapping an APK file is blocked on a family phone, use the USB cable way, and check the latest rules on developer.android.com.

## Google Play Needs an Adult

To publish on Google Play, someone must create a **Google Play developer account**. The account holder must be **18 or older**. Google also asks for identity checks and a one-time registration fee. New personal accounts usually must test the app with a group of testers for a while before it can go public.

So a student's app reaches the Play Store through a **teacher, parent or school** account. You build and test it; the adult uploads the `.aab` file, fills in the Data safety form (Chapter 17) and publishes. For a class project, sharing an APK with family and the teacher is usually enough.

## ⚠️ Common Mistake

**Mistake 1: putting the keystore in the project folder and pushing it to GitHub.**

```text
library-app/
├── app/
├── release-key.jks  ← public on GitHub!
└── .gitignore        (no *.jks line)
```

Anyone can download it and sign apps as you. Fix: keep the keystore **outside** the project folder, add `*.jks` to `.gitignore`, and keep a private backup.

**Mistake 2: forgetting to raise `versionCode`.** You share version 1.1 with your aunt, but `versionCode` is still `1`. Her phone may refuse the update. Fix: add 1 to `versionCode` for every release you share.

**Mistake 3: reading only the top of a stack trace.** The top lines are usually inside Android or Java. Scroll to the first line with **your** file name, and check for a `Caused by:` line.

## ✍️ Try It

Add `formatMinutes` and `TimeFormatTest` to your School Library project and run the test.

1. Check that all four tests are green.
2. Break the function on purpose (remove the space in `"$hours h $rest min"`) and run again. Read the red message.
3. Fix it, run once more, and add a fifth test of your own for `formatMinutes(61)`.

*Hint:* 61 minutes is 1 hour and 1 minute, so the expected text is `"1 h 1 min"`.

## 📝 Recap

- `Log.d(TAG, "message")` writes to **Logcat**; filter with `tag:YourTag`. Never log personal data.
- In a **stack trace**, read the exception name, then find the first line with your own file name.
- A **breakpoint** pauses the app in **Debug** mode so you can inspect variables and step through code.
- Test small and large screens, dark mode and large text; `@PreviewLightDark`, `@PreviewScreenSizes` and `@PreviewFontScale` help.
- A **unit test** in `app/src/test` uses `@Test` and `assertEquals(expected, actual)` to check a plain Kotlin function.
- Release apps are **signed** with a key from a **keystore**: keep it safe and private, raise `versionCode` each release, and let an adult (18+) publish on Google Play.

## 📖 Key Terms

- **Logcat**: Android Studio's window of messages from the phone.
- **Stack trace**: the list of functions running when a crash happened.
- **Exception**: an error object that stops the program if nothing handles it.
- **Breakpoint**: a marked line where the debugger pauses the app.
- **Unit test**: a small automatic check of one function.
- **Signature**: a digital seal proving who made an app and that it was not changed.
- **Keystore**: a password-protected file that holds signing keys.
- **APK / AAB**: an installable app file / a bundle uploaded to Google Play.

## 🏆 Practice

### 🟢 Level 1: Recall
1. What is the difference between `versionCode` and `versionName`?
2. Why must you never share your keystore?

<details>
<summary>Show answer</summary>

1. `versionCode` is a whole number that Android and the Play Store use; it must go up for every release. `versionName` is text for people, such as `"1.1"`.
2. Anyone with the keystore (and its passwords) can sign an app that looks like it came from you, including a fake "update" of your app.

</details>

### 🟡 Level 2: Apply
Logcat shows this crash (shortened). Which file and line should you open first, and what is the problem?

```text
FATAL EXCEPTION: main
Process: org.juniorcoders.library, PID: 8123
java.lang.IndexOutOfBoundsException: Index 5 out of bounds for length 5
    at java.util.ArrayList.get(ArrayList.java:...)
    at org.juniorcoders.library.BookScreenKt.NextBookButton(BookScreen.kt:58)
    at ...
```

<details>
<summary>Show answer</summary>

Open `BookScreen.kt` at **line 58**, inside `NextBookButton`. It is the first line with our own file. The list has 5 books, so the indexes are 0 to 4, but the code asked for index 5. The "next" button probably adds 1 to the index without checking the end of the list. Fix it by stopping at the last index, or going back to 0:

```kotlin
val next = if (index < books.size - 1) index + 1 else 0
```

</details>

### 🔴 Level 3: Challenge
Write and run unit tests for a new function.

1. In your project, write `fun shelfLetter(shelf: String): String` that returns the first character of a shelf code in capitals, or `"?"` if the text is blank. Example: `"Science A3"` gives `"S"`.
2. Create `ShelfTest.kt` in `app/src/test/...` with three tests: a normal shelf, a lower-case shelf (`"nature E1"`), and a blank shelf (`""`).
3. Run them and make all three green.

<details>
<summary>Show one possible answer</summary>

```kotlin
// app/src/main/java/org/juniorcoders/library/Shelf.kt
package org.juniorcoders.library

fun shelfLetter(shelf: String): String {
    if (shelf.isBlank()) return "?"
    return shelf.trim().first().uppercase()
}
```

```kotlin
// app/src/test/java/org/juniorcoders/library/ShelfTest.kt
package org.juniorcoders.library

import org.junit.Assert.assertEquals
import org.junit.Test

class ShelfTest {
    @Test
    fun normalShelf_givesFirstLetter() {
        assertEquals("S", shelfLetter("Science A3"))
    }

    @Test
    fun lowerCaseShelf_givesCapital() {
        assertEquals("N", shelfLetter("nature E1"))
    }

    @Test
    fun blankShelf_givesQuestionMark() {
        assertEquals("?", shelfLetter(""))
    }
}
```

Right-click `ShelfTest` and choose **Run 'ShelfTest'**: three green ticks.

</details>
