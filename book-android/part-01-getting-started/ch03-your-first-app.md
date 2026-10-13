# Chapter 3: Your First App 👋

## 🌟 Real-Life Story

When Maryam joined the school's science club, the teacher did not ask her to design an experiment on day one. She gave her a kit with everything already in place and said, "Change one thing, and watch what happens." Android Studio does the same for you. It gives you a ready-made starter app that already works. Today you will create it, look around inside, change one line and see your change on a phone.

## 🎯 What You Will Learn

- Create a new project from the **Empty Activity** template, named School Library.
- Choose a package name and a minimum SDK, and explain both simply.
- Name the main folders and files of a project and what Gradle sync does.
- Read the generated `MainActivity.kt` in broad strokes and change the greeting text.
- Run the app on an emulator and on a real phone with USB debugging, and fix common first errors.

## 🆕 Creating the Project

Open Android Studio. On the welcome screen, click **New Project**.

### Step 1: choose a template

A **template** is a ready-made starting point. On the left, choose **Phone and Tablet**. Then pick **Empty Activity**.

```text
+--------------------------------------+
| New Project                          |
| Phone and Tablet                     |
|  [No Activity]   [Empty Activity] <- |
|  [Basic Views]   [Bottom Nav...]     |
+--------------------------------------+
```

An **activity** is one entry point into an app: usually one window the user sees. "Empty Activity" gives you one simple screen built with Jetpack Compose. (Some other templates use the older XML style, which this book does not use. Choose **Empty Activity** exactly.)

Click **Next**.

### Step 2: fill in the project details

| Field | What to type or choose |
|-------|------------------------|
| Name | `School Library` |
| Package name | `org.juniorcoders.library` |
| Save location | Keep the suggested folder, or choose one your teacher gives you |
| Minimum SDK | Keep the default Android Studio suggests |
| Build configuration language | **Kotlin DSL (build.gradle.kts)**, marked Recommended |

Click **Finish**. Android Studio creates the project and starts building it. The first time, this can take several minutes.

### What is a package name?

The **package name** is the app's unique ID. No two apps on Google Play can share one. It is written like a web address back to front, with dots:

```text
 org.juniorcoders . library
 \______________/   \_____/
  who made it        which app
```

`org.juniorcoders` stands for the maker and `library` for the app. Use small letters, no spaces. If you later make a second app, give it a new last part, such as `org.juniorcoders.planner`.

### What is the minimum SDK?

Every Android version has an **API level**, a number that goes up with each new version. The **minimum SDK** is the oldest Android version your app agrees to run on.

| Minimum SDK | Effect |
|-------------|--------|
| Lower (older Android) | Runs on more phones, including old ones |
| Higher (newer Android) | Runs on fewer phones, but can use newer features freely |

Android Studio shows a line like "Your app will run on approximately …% of devices". The **default** is a sensible balance: it reaches nearly all phones still in use. Keep it. If your family phone is very old, your teacher can help you check it is covered.

## 🔄 Gradle Sync

After you click Finish, look at the status bar at the bottom. You will see messages such as "Gradle sync" or "Gradle Build Running" with a progress bar.

**Gradle** is the build tool from Chapter 1. **Gradle sync** means Gradle reads the project's setup files, downloads the libraries the project needs (including Compose) and gets everything ready. The first sync needs the internet and can take a while.

Wait until the status bar is quiet and the Build window shows success. Then the project is ready.

## 📁 The Project's Folders

In the **Project** window on the left, make sure the view at the top says **Android**. This view hides the clutter and shows the important parts:

```text
app
 +- manifests
 |   +- AndroidManifest.xml
 +- kotlin+java
 |   +- org.juniorcoders.library
 |       +- MainActivity.kt
 |       +- ui.theme
 |           +- Color.kt
 |           +- Theme.kt
 |           +- Type.kt
 +- res
     +- drawable
     +- mipmap
     +- values
         +- strings.xml ...
Gradle Scripts
 +- build.gradle.kts (Project)
 +- build.gradle.kts (Module :app)
 +- libs.versions.toml
 +- settings.gradle.kts ...
```

The code folder's name may show as `java` or `kotlin+java` depending on the version. Kotlin files live there either way. On the disk, the full path is `app/src/main/java/org/juniorcoders/library/` (or `.../kotlin/...`).

Here is what each part is for:

| Part | What it holds |
|------|---------------|
| `AndroidManifest.xml` | The app's ID card: its name, icon and which activity starts first. Later, any permissions it asks for. |
| `MainActivity.kt` | The Kotlin code for your first screen |
| `ui.theme` | Your app's colours (`Color.kt`), text styles (`Type.kt`) and theme (`Theme.kt`) |
| `res` | **Resources**: things that are not code. Pictures (`drawable`), the app icon (`mipmap`) and texts and colours (`values`) |
| `build.gradle.kts (Project)` | Settings for the whole project |
| `build.gradle.kts (Module :app)` | Settings for the app itself: its package, minimum SDK and libraries |
| `libs.versions.toml` | The **version catalog**: one list of library names and versions the app uses |
| `settings.gradle.kts` | The project's name and which parts it includes |

You do not need to edit the Gradle files now. Later chapters add a line to them when the app needs an extra library.

## 👀 Reading MainActivity.kt

Double-click `MainActivity.kt`. The template code looks very close to this (small details can differ between Android Studio versions):

```kotlin
package org.juniorcoders.library

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import org.juniorcoders.library.ui.theme.SchoolLibraryTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            SchoolLibraryTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    Greeting(
                        name = "Android",
                        modifier = Modifier.padding(innerPadding)
                    )
                }
            }
        }
    }
}

@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Text(
        text = "Hello $name!",
        modifier = modifier
    )
}

@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    SchoolLibraryTheme {
        Greeting("Android")
    }
}
```

That is a lot of new words. **You do not need to understand every line yet.** Chapters 4 to 11 explain all of it. For now, read it in four big blocks.

| Block | In plain words |
|-------|----------------|
| `package` and `import` lines | "This file belongs to our app, and it uses these ready-made tools." |
| `class MainActivity` | The screen Android opens when the user taps the app icon. `onCreate` runs when it starts. |
| `@Composable fun Greeting` | A small piece of screen that shows the text "Hello …!" |
| `@Preview fun GreetingPreview` | A preview of `Greeting`, shown inside Android Studio only, never on the phone |

A few names worth knowing already:

- **`enableEdgeToEdge()`** lets the app draw right up to the edges of the screen, behind the status bar.
- **`setContent { }`** says "this is what the screen shows".
- **`SchoolLibraryTheme`** wraps everything in your app's colours and text styles. Android Studio named it after your app.
- **`Scaffold`** is a standard page frame. It gives `innerPadding`: the space to leave free so text does not hide under the status bar or the gesture bar.
- **`Text`** shows text. **`Modifier`** adjusts how something is placed or sized.

```text
 MainActivity starts
   -> SchoolLibraryTheme (colours)
      -> Scaffold (page frame)
         -> Greeting
            -> Text "Hello Android!"
```

### The preview

Click **Split** at the top right of the editor. On the right, the preview panel shows `GreetingPreview`. You may need to click **Build & Refresh** the first time.

```text
+---------------------+
| Hello Android!      |
+---------------------+
```

`showBackground = true` gives the preview a white background so the text is easy to read.

## ✏️ Change the Greeting

Time to make the app yours. Find this line inside `onCreate`:

```kotlin
name = "Android",
```

Change it to:

```kotlin
name = "School Library",
```

Look at the `Greeting` function. It builds the text `"Hello $name!"`. The `$name` is replaced by whatever name you pass in. So the screen will now say:

```text
Hello School Library!
```

The preview uses its own call, `Greeting("Android")`. Change that one too, to `Greeting("School Library")`, so the preview matches. The preview updates after a moment (or click the refresh icon).

Now try changing the words themselves. In `Greeting`, change:

```kotlin
text = "Hello $name!",
```

to:

```kotlin
text = "Welcome to the $name!",
```

The screen will say:

```text
Welcome to the School Library!
```

## ▶️ Run on the Emulator

1. In the toolbar, open the device menu and choose your virtual device, such as `Library Phone`.
2. Click the green **Run** button (the ▶ triangle).
3. Wait. Gradle builds an APK, the emulator starts if needed, and the app is installed and opened.

The emulator shows your app:

```text
+------------------------------+
| 10:30                        |
| Welcome to the School        |
| Library!                     |
|                              |
|                              |
|                              |
|            ----              |
+------------------------------+
```

The text sits just under the status bar, not behind it. That is `innerPadding` at work. Notice the app also appears in the emulator's app list with a default Android icon. You can close it and tap the icon to open it again.

## 📲 Run on a Real Phone (USB Debugging)

On a slow computer, a real phone is often the best choice. **Ask permission first:** this changes the phone's settings. Menu names differ a little between phone makers, so look carefully.

### Step 1: switch on Developer options

1. Open **Settings → About phone**. (On some phones: **About phone → Software information**.)
2. Find **Build number**.
3. Tap **Build number** seven times. The phone may ask for its PIN.
4. A message says "You are now a developer!" (or similar).

### Step 2: switch on USB debugging

1. Go back to **Settings** and open **Developer options**. It is often under **System**.
2. Turn on **USB debugging**.

### Step 3: connect and allow

1. Connect the phone to the computer with a USB cable that carries data.
2. On the phone, a box asks **"Allow USB debugging?"** It shows the computer's key fingerprint. Tap **Allow** only on a computer you trust, such as your own or the school's.
3. In Android Studio's device menu, the phone appears by its model name. Choose it and click **Run**.

The app opens on the phone, showing "Welcome to the School Library!".

When you finish for the day, you can switch **USB debugging** off again in Developer options. That is a good safety habit.

Some newer phones also offer **Wireless debugging**, which works over Wi-Fi without a cable. Ask your teacher before using it on a shared network.

## 🧯 Common First Errors and Fixes

| What you see | What it usually means | What to do |
|--------------|-----------------------|------------|
| "Gradle sync failed" or "Could not resolve…" | Gradle could not download what it needs | Check the internet. Then **File → Sync Project with Gradle Files**. On a school network, ask whether a proxy setting is needed. |
| The build is very slow the first time | Gradle is downloading and setting up | Wait. Later builds are much faster. |
| "No target device found" | No emulator or phone is chosen | Pick a device in the device menu, or start the emulator first |
| Phone not listed | USB debugging off, cable is charge-only, or the Allow box was missed | Check all three. Unplug and plug in again. |
| Red underlined code and "Unresolved reference" | A name is misspelled or an import is missing | Check spelling and capitals: `Greeting`, not `greeting` |
| Preview says it is out of date | The code changed since the last build | Click **Build & Refresh** |

When an error happens, read the **first red message** in the Build window. It usually names the file and line number. Click it to jump there.

## ⚠️ Common Mistake

**Deleting a quote mark when editing the greeting.**

```kotlin
name = "School Library,
```

What happens: the code turns red. The build fails, and the first red error in the Build window points at that line.

```kotlin
name = "School Library",
```

Text in Kotlin always sits between two `"` marks, and the comma stays after the closing quote.

**Choosing the wrong template.**

Wrong: picking a template other than **Empty Activity**, so the project has different files and may use the older XML style.

What happens: your files do not match this book, and later chapters become confusing.

Right: close the project (**File → Close Project**), click **New Project** again and choose **Empty Activity**.

## ✍️ Try It

1. Create the **School Library** project with the package `org.juniorcoders.library`.
2. Change the greeting so the screen says `Welcome to the School Library!`.
3. Update the preview so it shows the same text.
4. Run the app on an emulator or (with permission) a real phone.

*Hint:* there are two places that pass a name to `Greeting`: one in `onCreate` and one in `GreetingPreview`.

## 📝 Recap

- **New Project → Empty Activity** creates a working Compose app in seconds.
- The **package name** (`org.juniorcoders.library`) is the app's unique ID; the **minimum SDK** is the oldest Android it supports. Keep the default.
- **Gradle sync** reads the setup files and downloads libraries; wait for it to finish.
- `MainActivity.kt` holds the screen code; `res` holds resources; `AndroidManifest.xml` is the app's ID card.
- The template shows `Greeting(name)` inside a `Scaffold` and a `SchoolLibraryTheme`; `@Preview` shows it in Android Studio.
- Run on an emulator, or on a phone with **Developer options → USB debugging**, with permission.

## 📖 Key Terms

| Term | Meaning |
|------|---------|
| Template | A ready-made starting project |
| Activity | One entry point of an app, usually one screen |
| Package name | The app's unique ID, such as `org.juniorcoders.library` |
| Minimum SDK | The oldest Android version the app runs on |
| Gradle sync | Gradle reading the project setup and fetching libraries |
| Resources (`res`) | Pictures, icons, texts and colours, kept apart from code |
| Manifest | `AndroidManifest.xml`: the app's ID card |
| Preview | A picture of a composable, shown only in Android Studio |

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which template does this book use for a new project?
2. What is the package name of our app, and what is it for?
3. Which file is the app's "ID card"?

<details>
<summary>Show answer</summary>

1. **Empty Activity** (under Phone and Tablet).
2. `org.juniorcoders.library`. It is the app's **unique ID**; no two apps on Google Play share one.
3. `AndroidManifest.xml`.

</details>

### 🟡 Level 2: Apply
Change the template so the phone shows `Hello Grade 9 Readers!`. Which line(s) do you change? Also make the preview show the same.

<details>
<summary>Show answer</summary>

In `onCreate`, change the name passed to `Greeting`:

```kotlin
Greeting(
    name = "Grade 9 Readers",
    modifier = Modifier.padding(innerPadding)
)
```

In `GreetingPreview`:

```kotlin
Greeting("Grade 9 Readers")
```

`Greeting` keeps `text = "Hello $name!"`, so the screen shows `Hello Grade 9 Readers!`.

</details>

### 🔴 Level 3: Challenge
Your friend Ibrahim says: "I pressed Run but nothing happens, and the bottom of the screen says Gradle sync failed." Write him a short, calm checklist.

1. Put the checks in a sensible order (easiest first).
2. For each check, say what to look at and what to do.
3. Finish with what to do if none of them work.

<details>
<summary>Show one possible answer</summary>

1. **Internet.** Is the computer online? The first sync downloads libraries. Connect, then **File → Sync Project with Gradle Files**.
2. **Read the first red message** in the Build window. Click it to see which file and line it means.
3. **Wait for the first build.** If the status bar still shows progress, it may just be slow. Let it finish.
4. **School network.** If downloads are blocked, ask the teacher whether Android Studio needs proxy settings.
5. **Recently edited files.** If you changed a Gradle file by mistake, undo the change (**Ctrl+Z**) and sync again.
6. **Device.** After the sync works, choose an emulator or phone in the device menu, then press **Run**.

If none of these work: copy the first red error message exactly and show it to the teacher. Do not download "fixed" files from random websites.

</details>
