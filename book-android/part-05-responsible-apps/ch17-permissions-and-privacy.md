# Chapter 17: Permissions and Privacy 🔐

## 🌟 Real-Life Story

Imagine a school nurse who needs to look in a student's ear. A good nurse does not just grab the student's head. First she explains: "I need to check your ear because you said it hurts. Is that all right?" If the student says "not now", she finds another way to help and asks again later. She also never writes down things she does not need, like the student's home address.

An Android app should behave like that nurse. Before it uses the camera, the microphone or notifications, it explains why and asks. If the answer is "no", the app still works. And it keeps no more information than it really needs.

## 🎯 What You Will Learn

- Explain the difference between **normal** permissions and **runtime** (dangerous) permissions.
- Declare a permission in `AndroidManifest.xml`.
- Ask for a permission at the moment of need with `rememberLauncherForActivityResult`.
- Explain first, then ask, and keep the app working when the user says no.
- Treat the user's data as an *Amānah* (a trust): collect the least, share nothing, and protect children's privacy.

## 🔑 What Is a Permission?

A **permission** is Android's way of protecting the phone and the person who owns it. Some parts of the phone are private: the camera, the microphone, the contacts, the exact location. An app cannot use them unless it has permission.

Android has two main groups of permissions:

| Kind | When the user is asked | Examples |
|------|------------------------|----------|
| **Normal** | Never. Android grants it when the app is installed. | `INTERNET`, `ACCESS_NETWORK_STATE`, `VIBRATE` |
| **Runtime** (also called **dangerous**) | While the app is running, in a system dialog | `CAMERA`, `RECORD_AUDIO`, `ACCESS_FINE_LOCATION`, `READ_CONTACTS`, `POST_NOTIFICATIONS` |

**Normal** permissions carry little risk to privacy. Loading a list of books from the internet does not reveal anything personal, so `INTERNET` is a normal permission. You only declare it.

**Runtime** permissions can reveal private things. A camera can see a bedroom. A location can show where a child lives. So Android shows a dialog and lets the person decide. "Runtime" means "while the app is running", not when it is installed.

Here is a quick way to plan an app. List each feature and the permission it needs. This is plain Kotlin, so you can run it in the Kotlin Playground:

```kotlin
data class Feature(val name: String, val permission: String?)

fun main() {
    val features = listOf(
        Feature("Search the catalogue", null),
        Feature("Load new books from the school site", "INTERNET (normal)"),
        Feature("Study reminder", "POST_NOTIFICATIONS (runtime)"),
        Feature("Scan a book's barcode", "CAMERA (runtime)")
    )
    for (feature in features) {
        val needs = feature.permission ?: "no permission"
        println("${feature.name}: $needs")
    }
    val askCount = features.count { it.permission?.contains("runtime") == true }
    println("Questions the user may see: $askCount")
}
```

Output:

```text
Search the catalogue: no permission
Load new books from the school site: INTERNET (normal)
Study reminder: POST_NOTIFICATIONS (runtime)
Scan a book's barcode: CAMERA (runtime)
Questions the user may see: 2
```

`permission` is a `String?`, so a feature may need no permission at all (`null`). The Elvis operator `?:` from Chapter 8 gives the text `"no permission"` in that case. `count { ... }` counts the items for which the lambda gives `true`. A good app has as few runtime questions as possible.

## 📄 Declaring a Permission in the Manifest

Every app has a file called `AndroidManifest.xml` (in `app/src/main/`). The **manifest** is the app's ID card. It tells Android the app's name, its screens and the permissions it may use.

Add one `<uses-permission>` line for each permission. The lines go inside `<manifest>`, above `<application>`:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />

    <application
        ... >
        ...
    </application>
</manifest>
```

What these lines do:

- For `INTERNET` (normal), this line is all you need. The app can now go online.
- For `POST_NOTIFICATIONS` (runtime), this line is **not enough**. It only says "this app might ask". The app must still ask the user in a dialog. If a permission is missing from the manifest, the dialog never appears and the answer is always "no".

If your app has an optional camera feature, also add this line. It tells the Play Store that phones without a camera can still install the app:

```xml
<uses-feature android:name="android.hardware.camera" android:required="false" />
```

## ⏰ Ask at the Moment of Need

When should an app ask? **Not** the moment it opens. A wall of dialogs on the first screen feels pushy, and the user does not yet know why the app wants anything. Ask when the user taps the feature that needs it.

```text
User turns "Study reminders" ON
          │
          ▼
Already allowed? ── yes ──► turn on
          │ no
          ▼
Show OUR short explanation
          │
          ▼
User taps Continue ──► Android's dialog
          │
   ┌──────┴──────┐
 Allow       Don't allow
   │              │
 turn on    stay off, kind
            message, app
            keeps working
```

### Notifications on Android 13 and newer

Our example is a study reminder in the Study Planner. Showing a notification needs the `POST_NOTIFICATIONS` permission on **Android 13 and newer**. Each Android version has a number called its **API level**; Android 13 is level 33. On older phones, apps could show notifications without asking. So the code checks the version first.

`Build.VERSION.SDK_INT` is the API level of the phone running the app. `Build.VERSION_CODES.TIRAMISU` is the name for level 33 (Android versions have dessert code names).

### The full example

Here is a complete settings row. It has a switch, our own explanation dialog and the system permission request:

```kotlin
import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.os.Build
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.core.content.ContextCompat

fun canPostNotifications(context: Context): Boolean {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU) return true
    return ContextCompat.checkSelfPermission(
        context, Manifest.permission.POST_NOTIFICATIONS
    ) == PackageManager.PERMISSION_GRANTED
}

@Composable
fun ReminderSetting(modifier: Modifier = Modifier) {
    val context = LocalContext.current
    var remindersOn by rememberSaveable { mutableStateOf(false) }
    var showExplanation by remember { mutableStateOf(false) }
    var message by rememberSaveable { mutableStateOf("") }

    val launcher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.RequestPermission()
    ) { granted ->
        remindersOn = granted
        message = if (granted) {
            "Reminders are on."
        } else {
            "No problem. The planner works without reminders. " +
                "You can allow them later in Settings."
        }
    }

    Column(modifier = modifier.padding(16.dp)) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text("Study reminders", modifier = Modifier.weight(1f))
            Switch(
                checked = remindersOn,
                onCheckedChange = { wantOn ->
                    if (!wantOn) {
                        remindersOn = false
                        message = ""
                    } else if (canPostNotifications(context)) {
                        remindersOn = true
                        message = "Reminders are on."
                    } else {
                        showExplanation = true
                    }
                }
            )
        }
        if (message.isNotEmpty()) {
            Spacer(Modifier.height(8.dp))
            Text(message, style = MaterialTheme.typography.bodyMedium)
        }
    }

    if (showExplanation) {
        AlertDialog(
            onDismissRequest = { showExplanation = false },
            title = { Text("Allow study reminders?") },
            text = {
                Text(
                    "The planner can remind you when a study " +
                        "session starts. Android will ask you " +
                        "next. You can say no and still use " +
                        "the planner."
                )
            },
            confirmButton = {
                TextButton(onClick = {
                    showExplanation = false
                    launcher.launch(Manifest.permission.POST_NOTIFICATIONS)
                }) { Text("Continue") }
            },
            dismissButton = {
                TextButton(onClick = { showExplanation = false }) {
                    Text("Not now")
                }
            }
        )
    }
}
```

### What each part does

- `canPostNotifications(context)` checks if the permission is already given. On phones older than Android 13 it simply returns `true`. `ContextCompat.checkSelfPermission` asks Android "does this app have this permission?", and the answer is compared with `PERMISSION_GRANTED`.
- `LocalContext.current` gives the **context**: the object that lets your code talk to Android (here, to check permissions).
- `rememberLauncherForActivityResult(...)` creates a **launcher**. A launcher starts something outside your screen (here, Android's permission dialog) and gives you the result back.
- `ActivityResultContracts.RequestPermission()` is the **contract**: the kind of request. This one asks for one permission and returns `true` (allowed) or `false` (not allowed).
- The lambda `{ granted -> ... }` runs when the user answers. You learned lambdas in Chapter 7. Here it changes the state, so the screen recomposes and shows the message.
- `AlertDialog` is a Material 3 pop-up box with a title, a text and buttons. We show it only while `showExplanation` is `true`.
- `launcher.launch(Manifest.permission.POST_NOTIFICATIONS)` shows the system dialog. We only call it after our own explanation.

### What the screen shows

```text
┌──────────────────────────────────┐
│ Study reminders            [ ○ ] │
└──────────────────────────────────┘
       user taps the switch
┌──────────────────────────────────┐
│ Allow study reminders?           │
│ The planner can remind you when  │
│ a study session starts. Android  │
│ will ask you next. You can say   │
│ no and still use the planner.    │
│           Not now    Continue    │
└──────────────────────────────────┘
```

After **Continue**, Android shows its own dialog asking whether the app may send notifications, with **Allow** and **Don't allow**. Your app cannot change the words of this system dialog. That is why your own explanation matters.

This chapter shows only the permission part. Scheduling and showing a reminder at a set time (notification channels, background work) is a later topic.

## 🙅 When the Answer Is No

"No" is a normal, respectful answer. Your app must handle it calmly:

| Do | Do not |
|----|--------|
| Keep every other feature working | Close the app or lock the screen |
| Show one short, kind message | Show the dialog again and again |
| Say where to change it later (Settings) | Make the user feel guilty |
| Offer another way (a note on the screen) | Hide the "Not now" button |

On newer Android versions, if the user says no twice, Android usually stops showing the dialog for that permission. After `launcher.launch(...)`, your lambda then gets `granted = false` straight away, with no dialog. That is why our message mentions Settings: the user can still turn it on in **Settings → Apps → Study Planner → Notifications**.

Some apps also call `shouldShowRequestPermissionRationale(...)`, an Activity function that tells you when a longer explanation is wise. Our app explains every time before asking, so it does not need it.

## 📷 An Optional Camera Feature

The School Library app could scan a book's barcode with the camera. Follow the same steps:

1. Declare `CAMERA` and the optional `<uses-feature>` in the manifest.
2. Show a "Scan" button. Next to it keep a text field to **type** the code, so the feature works without the camera.
3. When the button is tapped, explain: "The camera only reads the barcode. No photos are saved."
4. Launch the request with `Manifest.permission.CAMERA`.
5. If the answer is no, the typing field is still there.

Before you ask for a permission, check if you need it at all. To let a user **choose a photo** (for example, a book cover), use Android's **photo picker**. The user picks one photo and your app sees only that photo. It usually needs no permission at all. That is much better than asking to read every photo on the phone.

## 🤲 Privacy Is an Amānah

In Islam, an *Amānah* is something left in your care that you must protect and return. When a person uses your app, their data is an *Amānah*. They trust you not to misuse it.

**Collect the least data.** Before you add a field or a permission, ask: "Does the app really need this to work?"

| Feature | Data it needs | Data it does not need |
|---------|---------------|-----------------------|
| Study planner | Subject, title, minutes | Name, age, school, location |
| Library search | The words typed | Contacts, photos |
| Study reminder | The time the user chose | Exact location |

**Keep data on the phone.** The School Library and Study Planner apps save everything on the device (Chapter 15). Nothing is sent anywhere. That is the safest design.

**No tracking SDKs or ads in student apps.** An **SDK** (software development kit) is a ready-made library you add to an app. Some SDKs record what users tap, how long they stay and which device they use, then send it to a company. Advertising SDKs often do this to show targeted ads. In apps for students, do not add analytics, tracking or ad SDKs. A "free" SDK of this kind is usually paid for with the users' data.

**Be honest on the Play Store.** Google Play asks every developer to fill in the **Data safety** form. It lists what data the app collects, whether it is shared, and how it is protected. The answers appear on the app's store page. Libraries you add count too: if an SDK collects data, you must declare it. Your answers must be true. An app that collects nothing can honestly say so, and that is a strong reason for parents to trust it.

**Protect children.** Children's data has extra protection. Google Play has a **Families** policy for apps aimed at children, and many countries have laws for children's privacy. These rules limit what data such apps may collect, which ads they may show and which SDKs they may use. Often a parent's permission is needed. The simplest way to respect all of them: do not collect children's personal data at all.

## ⚠️ Common Mistake

**Mistake 1: asking for permissions as soon as the app opens.**

```kotlin
// Wrong: runs as soon as the screen appears, before
// the user knows why. Many users simply say no.
LaunchedEffect(Unit) {
    launcher.launch(Manifest.permission.CAMERA)
}
```

(`LaunchedEffect` runs code once when a composable first appears.) Fix: ask inside the `onClick` of the button that needs it, after your own short explanation, as `ReminderSetting` does.

**Mistake 2: declaring the permission but never asking.**

The manifest has the `POST_NOTIFICATIONS` line, but the code never calls `launcher.launch(...)`. On Android 13 and newer, no reminder ever appears, and there is no error message to warn you. Fix: a runtime permission needs **both** the manifest line **and** the request in code.

**Mistake 3: punishing "no".** If the user says no, do not close the app or show the dialog in a loop. Show one kind message and keep the rest working.

## ✍️ Try It

Add the `ReminderSetting` row to a practice app:

1. Add the `POST_NOTIFICATIONS` line to `AndroidManifest.xml`.
2. Put `ReminderSetting(modifier = Modifier.padding(innerPadding))` inside your `Scaffold`.
3. Run it on an emulator with Android 13 or newer. Tap the switch, read your dialog, tap **Continue**, then tap **Don't allow** in Android's dialog.
4. Check that the kind message appears and the switch stays off.

*Hint:* to test again, open the emulator's **Settings → Apps → (your app) → Notifications**, or uninstall and reinstall the app. A fresh install starts with no runtime permissions.

## 📝 Recap

- **Normal** permissions (like `INTERNET`) are granted at install; you only declare them in `AndroidManifest.xml`.
- **Runtime** permissions (camera, microphone, location, contacts, notifications on Android 13+) also need a request in code.
- Ask at the moment of need: explain first, then call `launcher.launch(...)` from `rememberLauncherForActivityResult(ActivityResultContracts.RequestPermission())`.
- "No" is a normal answer: keep the app working and say where to change it later.
- User data is an *Amānah*: collect the least, keep it on the phone, no tracking or ad SDKs, honest Data safety answers, extra care for children.

## 📖 Key Terms

- **Permission**: Android's approval for an app to use a protected part of the phone.
- **Runtime permission**: a permission the user grants in a dialog while the app runs.
- **Manifest**: `AndroidManifest.xml`, the app's ID card for Android.
- **API level**: the number of an Android version (Android 13 = 33).
- **Launcher**: an object that starts a system screen or dialog and returns its result.
- **SDK**: a ready-made library added to an app.
- **Data safety form**: the Play Store form where developers declare what data their app collects and shares.

## 🏆 Practice

### 🟢 Level 1: Recall
Sort these into **normal** and **runtime** permissions: `INTERNET`, `CAMERA`, `POST_NOTIFICATIONS`, `ACCESS_NETWORK_STATE`, `READ_CONTACTS`.

<details>
<summary>Show answer</summary>

- **Normal:** `INTERNET`, `ACCESS_NETWORK_STATE`. They are granted at install.
- **Runtime:** `CAMERA`, `READ_CONTACTS`, and `POST_NOTIFICATIONS` (on Android 13 and newer). The user must allow them in a dialog.

</details>

### 🟡 Level 2: Apply
A classmate's School Library app asks for `CAMERA`, `ACCESS_FINE_LOCATION` and `READ_CONTACTS` as soon as it opens. The app only lets students search books and scan a barcode. Write three changes you would suggest.

<details>
<summary>Show answer</summary>

1. **Remove** `ACCESS_FINE_LOCATION` and `READ_CONTACTS` from the manifest and the code. Searching and scanning do not need them (collect the least data).
2. **Move** the camera request to the moment the student taps "Scan", after a short explanation: "The camera only reads the barcode. No photos are saved."
3. **Keep a typing field** for the barcode, so the app still works if the student says no.

</details>

### 🔴 Level 3: Challenge
Build a "Scan or type the barcode" row for the School Library app:

1. Declare `CAMERA` and `<uses-feature android:name="android.hardware.camera" android:required="false" />`.
2. Show an `OutlinedTextField` for typing the barcode and a "Scan" button.
3. When "Scan" is tapped and the permission is missing, show an `AlertDialog` that explains, with "Continue" and "Not now".
4. "Continue" launches the camera permission request.
5. Show "Camera ready" if allowed, or "You can type the code instead" if not. (Opening a real camera preview is a later topic.)

<details>
<summary>Show one possible answer</summary>

```kotlin
fun hasCamera(context: Context): Boolean =
    ContextCompat.checkSelfPermission(
        context, Manifest.permission.CAMERA
    ) == PackageManager.PERMISSION_GRANTED

@Composable
fun BarcodeRow(modifier: Modifier = Modifier) {
    val context = LocalContext.current
    var code by rememberSaveable { mutableStateOf("") }
    var status by rememberSaveable { mutableStateOf("") }
    var explain by remember { mutableStateOf(false) }

    val launcher = rememberLauncherForActivityResult(
        ActivityResultContracts.RequestPermission()
    ) { granted ->
        status = if (granted) "Camera ready" else "You can type the code instead"
    }

    Column(modifier.padding(16.dp)) {
        OutlinedTextField(
            value = code,
            onValueChange = { code = it },
            label = { Text("Barcode") },
            singleLine = true,
            modifier = Modifier.fillMaxWidth()
        )
        Button(onClick = {
            if (hasCamera(context)) status = "Camera ready" else explain = true
        }) { Text("Scan") }
        if (status.isNotEmpty()) Text(status)
    }

    if (explain) {
        AlertDialog(
            onDismissRequest = { explain = false },
            title = { Text("Use the camera?") },
            text = { Text("The camera only reads the barcode. No photos are saved.") },
            confirmButton = {
                TextButton(onClick = {
                    explain = false
                    launcher.launch(Manifest.permission.CAMERA)
                }) { Text("Continue") }
            },
            dismissButton = {
                TextButton(onClick = { explain = false }) { Text("Not now") }
            }
        )
    }
}
```

The text field works in every case. The camera is only an extra.

</details>
