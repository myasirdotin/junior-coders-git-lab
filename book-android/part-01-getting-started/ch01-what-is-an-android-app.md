# Chapter 1: What Is an Android App?

## 🌟 Real-Life Story

Zainab's school library has a paper register. To find a book, she turns page after page. To know if it is on the shelf, she has to ask the librarian. One day her teacher says, "What if the register lived on your phone? You could search it in two seconds." Zainab smiles. That idea is an **app**. In this book you will build that app yourself, step by step.

## 🎯 What You Will Learn

- Explain what an app is and what an operating system does.
- Compare Android with other systems such as iOS and Windows.
- Describe how an app travels from your code to a phone: code, Android Studio, APK or AAB, phone.
- Name the two main tools of this book: the Kotlin language and Jetpack Compose.
- Describe the two apps you will build and the values that make an app trustworthy.

## What Is an App?

An **app** (short for *application*) is a program made for one job. A calculator app does sums. A dictionary app finds the meaning of words. A timetable app shows your lessons.

Every app does three things again and again:

| Step | What happens | Library example |
|------|--------------|-----------------|
| Input | The user taps or types | Zainab types "solar" |
| Processing | The app works on the data | It searches the book list |
| Output | The app shows a result | "Our Solar System, shelf Science A3" |

You met the same pattern in the JavaScript book: a web page reads a click, runs a function and changes the page. An Android app does the same, but it runs **on the phone itself**, not inside a web browser.

### Apps and the operating system

An app cannot talk to the screen, the battery or the camera by itself. It asks the **operating system** (OS). The operating system is the main program that runs the device. It starts and stops apps, shares memory between them and keeps them apart from each other.

```text
+------------------------------------+
|  Apps: Library, Calculator, Notes  |
+------------------------------------+
|  Operating system: Android         |
+------------------------------------+
|  Hardware: screen, battery, camera |
+------------------------------------+
```

Each layer talks to the layer next to it. Your app asks Android, and Android asks the hardware. Because Android keeps every app in its own separate space, one app cannot secretly read another app's data.

## Android and Other Systems

**Android** is an operating system led by Google. It is built on Linux, and most of its code is open source. That means anyone can read it. Many companies make Android phones and tablets, so Android runs on a huge range of devices, from low-cost phones to large tablets.

Other systems run apps too:

| System | Made by | Main language for new apps | Main tool |
|--------|---------|----------------------------|-----------|
| Android | Google and phone makers | Kotlin | Android Studio |
| iOS (iPhone) | Apple | Swift | Xcode (needs a Mac) |
| Windows | Microsoft | C# and others | Visual Studio |
| The web | Everyone | HTML, CSS, JavaScript | Any editor and a browser |

An Android app does not run on an iPhone, and an iPhone app does not run on Android. They are built with different tools. Some tools can build for both at once, but this book stays with Android only. Learning one system well first is the clearest path.

### Why build a native app?

A **native app** is built with the system's own tools. It is installed on the phone and starts from its icon. Compared with a web page, a native app usually:

- works without internet once installed,
- can save data on the phone,
- feels smooth and fits the phone's look,
- can use phone features such as notifications, when the user allows it.

A web page is still great for many jobs. The Junior Coders site itself is a web page! Choose the tool that fits the problem.

## How an App Is Built and Installed

Making an app is like making a school magazine. You write the articles, the printer turns them into a printed copy, and the copy reaches readers. For an app, the journey looks like this:

```text
 You write Kotlin code
          |
          v
 Android Studio builds it
          |
          v
 One package file: APK or AAB
          |
          v
 Installed on a phone or tablet
```

Here is each step in plain words.

1. **Code.** You write instructions in the Kotlin language. You also add pictures, colours and text.
2. **Android Studio.** This is the program you write code in. It is free and made by Google. When you press **Run**, a tool inside it called **Gradle** *builds* the app. Building means checking your code, translating it into a form the phone understands and packing everything together.
3. **The package file.** The result is one file:
   - An **APK** (Android Package) is a file a phone can install directly. While you are learning, Android Studio makes an APK and installs it for you.
   - An **AAB** (Android App Bundle) is the format Google Play asks for when a developer uploads an app. Google Play then makes a fitting APK for each phone.
4. **The phone.** The phone installs the package. An icon appears, and the user taps it to start the app.

You will press Run many times in this book. Each time, all four steps happen, usually in well under a minute after the first build.

### Where will your app run while you learn?

You have two choices, and Chapter 2 sets up both:

| Choice | What it is | Good for |
|--------|------------|----------|
| **Emulator** | A pretend phone in a window on your computer | Computers with plenty of memory |
| **Real phone** | Your own or a family phone on a USB cable | Slower school computers |

## Kotlin and Compose in One Picture

This book uses two main tools. Think of building a house.

- **Kotlin** is the *language*: the bricks and the mortar. It is how you tell the phone what to do.
- **Jetpack Compose** is the *toolkit for screens*: ready-made windows, doors and shelves you arrange to build what the user sees.

Google recommends Kotlin for new Android apps, and Compose for building their screens. Older apps used the Java language and XML files for screens. You may see those online, but this book does not teach them.

```text
+----------------------------------+
|  Your app                        |
|  +----------------------------+  |
|  | Compose: what the user sees|  |
|  +----------------------------+  |
|  | Kotlin: all the logic      |  |
|  +----------------------------+  |
+----------------------------------+
```

### A tiny Kotlin program

You will learn Kotlin properly from Chapter 4. For now, just look at its shape:

```kotlin
fun main() {
    val appName = "School Library"
    println("Welcome to the $appName app!")
    println("Books waiting on the shelf: 5")
}
```

Output:

```text
Welcome to the School Library app!
Books waiting on the shelf: 5
```

If you did the JavaScript book, some parts feel familiar. `val` is a bit like `const`. `$appName` puts a value into the text, like `${appName}` in a JavaScript template string. `println` is like `console.log`.

### A tiny piece of Compose

Compose code describes a screen. This small function says "show this text":

```kotlin
@Composable
fun Welcome() {
    Text(text = "Welcome to the School Library!")
}
```

On the phone, the screen shows one line of text at the top:

```text
+--------------------------------+
| Welcome to the School Library! |
|                                |
|                                |
+--------------------------------+
```

The word `@Composable` marks a function that draws part of a screen. You will write many of these from Chapter 9. Plain Kotlin comes first (Chapters 4 to 8), because Compose is written in Kotlin.

## What This Book Builds

You will not build many small, forgettable apps. You will grow **two real apps** that solve real school problems.

### The School Library app (Chapters 3 to 16)

A pocket version of the library register. Step by step it gains:

| Chapters | What the app gains |
|----------|--------------------|
| 3 | The project is created and runs |
| 9 and 10 | A neat card for one book |
| 11 | A "Save for later" button |
| 12 | A search box for titles |
| 13 | The full list of books, scrolling |
| 14 | A detail screen for each book |
| 15 | Saved books are kept after closing |
| 16 | A theme, dark mode and accessibility |

A sketch of where it is heading:

```text
+--------------------------------+
| School Library                 |
| [ Search titles...           ] |
|--------------------------------|
| Our Solar System               |
| Amina Yusuf - Science A3       |
| On the shelf  [Save for later] |
|--------------------------------|
| Clean Water for Every Village  |
| Bilal Ahmed - Geography B1     |
| Borrowed      [Save for later] |
+--------------------------------+
```

### The Study Planner (Chapter 19)

Your final project. You plan your homework and revision, tick off tasks and see what is due this week. You build it on your own, using everything from the book.

## What You Need

| Item | Notes |
|------|-------|
| A computer | Windows, macOS, Linux or a Chromebook that supports Android Studio. Chapter 2 lists what it needs. |
| Android Studio | Free, from the official Android site only. |
| Internet | For the first download and setup, which is large. |
| An Android phone (optional) | Useful if the computer is slow. A family phone is fine, with permission. |
| Permission | Ask a parent or teacher before installing software or changing phone settings. |
| Patience | The first setup takes time. Every developer goes through it. |

You do **not** need to pay for anything. You also do not need a Google Play developer account. Those accounts are for adults (18 or older). You will share your apps with family and teachers as an APK file instead (Chapter 18).

## Apps as Amānah

An app lives in someone's pocket. It sees what they type and what they save. That trust is an **Amānah**, something placed in your care that you must look after. Every app in this book keeps three promises.

1. **Useful.** It solves a real problem: finding a book, planning study time. It does not try to keep people staring at the screen.
2. **Honest.** It says what it does. No fake timers, no hidden tricks, no scary "you will lose everything" alerts.
3. **Private.** It asks only for what it needs. Our library app needs no location, no contacts and no camera. If it does not need data, it does not collect it.

Some apps are designed to be hard to put down, with endless alerts and streaks. Ours will be the opposite: the user opens it, gets the job done, and gets on with their day.

## ⚠️ Common Mistake

**Thinking an app is just a website on a phone.**

Wrong idea: "I will save my HTML page on the phone and it becomes an app."

What happens: the phone opens the file in a browser. It has no icon of its own, and it cannot use most app features.

Right idea: an Android app is built with Android tools (Android Studio, Kotlin, Compose) into an APK and installed. A website and an app are both useful, but they are different things.

**Downloading Android Studio or APKs from random sites.**

Wrong: searching "free Android Studio download" and clicking the first link you see.

What happens: unofficial sites may bundle harmful software that damages the computer or steals data.

Right: download Android Studio only from `developer.android.com`, and install apps only from places you trust.

## ✍️ Try It

Think of three apps you know (or look at a phone at home, with permission). For each one, write:

1. its one main job,
2. its input, processing and output,
3. one thing it does to respect (or not respect) the user's privacy.

*Hint:* a calculator's input is the numbers you tap, its processing is the sum, and its output is the answer on screen.

## 📝 Recap

- An app is a program for one job. It takes input, processes it and shows output.
- The operating system (Android) runs apps and gives them safe access to the hardware.
- Android Studio builds your code into a package: an APK to install directly, or an AAB for Google Play.
- Kotlin is the language. Jetpack Compose is the toolkit for screens.
- You will build the School Library app and, at the end, a Study Planner.
- A good app is useful, honest and private: it is an Amānah.

## 📖 Key Terms

| Term | Meaning |
|------|---------|
| App | A program made for one job |
| Operating system | The main program that runs a device and its apps |
| Android Studio | Google's free program for building Android apps |
| Gradle | The build tool inside Android Studio |
| APK | Android Package: a file a phone can install |
| AAB | Android App Bundle: the upload format for Google Play |
| Kotlin | The programming language of this book |
| Jetpack Compose | The toolkit for building app screens in Kotlin |

## 🏆 Practice

### 🟢 Level 1: Recall
1. What do the letters APK stand for?
2. Which language and which screen toolkit does this book use?
3. Name the three steps every app repeats.

<details>
<summary>Show answer</summary>

1. **Android Package**: a file a phone can install.
2. The **Kotlin** language and the **Jetpack Compose** toolkit.
3. **Input, processing, output.**

</details>

### 🟡 Level 2: Apply
Put these steps in the right order and say in one sentence what happens at each:
*the phone installs the package · you write Kotlin code · Gradle builds the app · an APK file is made*.

<details>
<summary>Show answer</summary>

1. **You write Kotlin code**: the instructions for the app.
2. **Gradle builds the app**: Android Studio checks and translates the code and packs it with pictures and text.
3. **An APK file is made**: one package file that holds the whole app.
4. **The phone installs the package**: an icon appears and the app can start.

</details>

### 🔴 Level 3: Challenge
Plan an app for your school's charity drive, which collects books and coats for a local family shelter.

1. Write the app's one main job in a sentence.
2. List its input, processing and output.
3. Draw a sketch of the main screen, at most 40 characters wide.
4. Write the three Amānah promises for this app: what makes it useful, honest and private?

<details>
<summary>Show one possible answer</summary>

1. **Job:** keep a count of items donated to the shelter drive, by type.
2. **Input:** a volunteer taps "+1 book" or "+1 coat". **Processing:** the app adds one to the right total. **Output:** the totals and the goals on screen.
3. Sketch:

```text
+--------------------------------+
| Shelter Drive                  |
| Books:  42 / 100   [+1 book]   |
| Coats:  17 / 50    [+1 coat]   |
+--------------------------------+
```

4. **Useful:** volunteers see at once what is still needed. **Honest:** the totals are real counts, never made-up numbers. **Private:** it stores no names of donors or of the families helped, only the counts.

</details>
