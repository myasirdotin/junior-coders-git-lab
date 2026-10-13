# Chapter 2: Installing Android Studio

## 🌟 Real-Life Story

Before a science practical, Yusuf's teacher sets out the equipment: goggles, beakers, a burner and a clear bench. Nobody starts mixing until the bench is ready. Setting up takes time, but it makes every lesson after it smooth and safe. Installing Android Studio is your app-building bench. Set it up carefully once, and every chapter after this one is about building, not fixing tools.

## 🎯 What You Will Learn

- Check whether a computer is strong enough for Android Studio.
- Download Android Studio safely from the official site and finish the first-run setup.
- Explain what the Android SDK is and where it lives.
- Create a virtual device (an emulator), or choose a better option for a slow computer.
- Find your way around the main parts of the Android Studio window.

## First: Ask Permission

Android Studio is a large program. It changes settings on the computer and downloads several gigabytes.

- **At home:** ask a parent or guardian before you install it.
- **At school:** ask your teacher. School computers often block installing software. Your teacher or the IT staff may install it for the whole class.
- **On a phone:** later in this chapter you may change phone settings. Only do this on a phone you are allowed to use for it.

Asking first is part of honesty (*ṣidq*) and trust (*amānah*). A computer or phone that belongs to someone else is in your care, not yours to change freely.

## Is My Computer Strong Enough?

Android Studio does a lot of work: it checks your code as you type, builds apps and can run a pretend phone. It needs a fairly strong computer. The table shows what the official site asked for on Windows in 2026. The numbers change from time to time, so check the "System requirements" part of the download page.

| Part | Lowest that works | Comfortable |
|------|-------------------|-------------|
| System | 64-bit Windows 10 | The newest 64-bit Windows |
| Memory (RAM) | 8 GB for Android Studio, 16 GB with the emulator | 32 GB |
| Free disk space | 8 GB, or 16 GB with the emulator | 32 GB or more on an SSD |
| Processor | Made after 2017 (e.g. Intel Core i5 8th generation or AMD Ryzen) | A newer Core i5/i7 or Ryzen 5/7 |
| Screen | 1280 × 800 | 1920 × 1080 |

The processor must support *virtualisation* (you will meet this word below). Windows computers with ARM processors, such as some thin laptops, cannot run Android Studio at the moment.

**RAM** is the computer's short-term working memory. An **SSD** is a fast kind of storage disk; it makes Android Studio start and build much faster than an older hard disk.

Android Studio also runs on macOS, on Linux and on some Chromebooks. Each has its own list on the download page.

### How do I find my computer's RAM?

On Windows: press the **Windows key**, type `About`, and open **About your PC**. Look for **Installed RAM** and **System type**.

```text
Device specifications
  Installed RAM   8.00 GB
  System type     64-bit operating system
```

If you see 8 GB, Android Studio will work, but the emulator needs 16 GB to run well. Read the section "Slow computer? Three good options" below before you decide.

## Downloading Android Studio Safely

There is only **one** safe place to get Android Studio: the official Android developers site.

```text
https://developer.android.com/studio
```

1. Type the address yourself, or open it from a link your teacher gives you.
2. Check the address bar says `developer.android.com` before you download.
3. Click the download button for the newest stable version. Read and accept the terms.
4. The download is large (often more than 1 GB). Use a good connection.

Never download Android Studio from other sites, file-sharing pages or video descriptions. Unofficial copies can hide harmful software. It is free from Google, so there is never a reason to get it elsewhere.

You do **not** need to install Java separately. Android Studio comes with the Java tools it needs.

## The First-Run Setup

On Windows, double-click the downloaded `.exe` file and follow the installer. Keep the default choices. When it finishes, start Android Studio. The first time, a **setup assistant** appears: a set of screens that asks you a few questions, one step at a time.

The screens are usually:

| Screen | What to choose |
|--------|----------------|
| Import settings | "Do not import settings" (you have none yet) |
| Data sharing | Your choice. Saying no is fine. |
| Install type | **Standard** |
| Verify settings | Read the list, then Next |
| License agreement | Read and accept each licence |
| Downloading components | Wait. This can take a while. |

The exact screens can change a little between versions. If something looks different, keep the suggested choice.

When the setup ends, you see the **Welcome to Android Studio** window:

```text
+----------------------------------+
| Welcome to Android Studio        |
|                                  |
|  [ New Project ]                 |
|  [ Open ]                        |
|  [ Clone Repository ]            |
|                                  |
|  More Actions v                  |
+----------------------------------+
```

You will press **New Project** in Chapter 3. Not today.

## The Android SDK

During setup, the setup assistant downloaded the **Android SDK**. SDK means *Software Development Kit*: a toolbox of everything needed to build apps for Android. It holds:

- the **platform** files for each Android version you build for,
- the **build tools** that pack your app into an APK,
- **platform tools**, such as `adb`, which talks to phones over USB,
- the **emulator**, the pretend phone, with its **system images** (the Android software that runs inside it).

You rarely need to open it yourself. If you ever do, go to **More Actions → SDK Manager** on the welcome screen, or **Tools → SDK Manager** inside a project. The setup assistant already installed what this book needs.

The SDK lives in a folder on your computer, usually something like:

```text
C:\Users\<your name>\AppData\Local\Android\Sdk
```

## Creating a Virtual Device (Emulator)

An **emulator** is a pretend phone that runs in a window on your computer. In Android Studio it is called an **Android Virtual Device**, or **AVD**.

1. Open **More Actions → Virtual Device Manager** on the welcome screen. (Inside a project, open the **Device Manager** tool window.)
2. Click the **+** button, then **Create Virtual Device**.
3. Choose a **Phone** with a medium screen. A Pixel model or "Medium Phone" is a good choice.
4. Choose a **system image**. Pick one marked as recommended and click the download arrow beside it. Wait for it to finish.
5. Give the device a name, such as `Library Phone`, and click **Finish**.
6. Click the **play** button next to the new device.

After a minute or two (longer the very first time), a phone appears. It shows a lock screen or a home screen, just like a real phone:

```text
+----------------------+
|  10:30               |
|                      |
|                      |
|   [ ] [ ] [ ] [ ]    |
|   apps on home screen|
|                      |
|       ( )   < []     |
+----------------------+
```

You can click on it with the mouse as if you were tapping with a finger.

### Why can the emulator be slow?

The emulator runs a whole Android phone inside your computer. To do this quickly it needs **hardware acceleration**: help from the processor's *virtualisation* feature. On most new computers it is already on. If Android Studio says virtualisation is off, it must be switched on in the computer's start-up settings (BIOS). **That is a job for a parent, teacher or IT staff**, not something to try alone.

## Slow Computer? Three Good Options

Many school computers have 8 GB of RAM or less. The emulator may crawl or refuse to start. That is not your fault, and you can still learn everything in this book.

| Option | What you do | Best for |
|--------|-------------|----------|
| 1. Real phone | Run your apps on an Android phone over a USB cable | Every chapter with screens |
| 2. Close other programs | Close the browser tabs and other apps while the emulator runs | Computers with 8 GB |
| 3. Kotlin Playground | Run plain Kotlin in a web browser | Chapters 4 to 8 |

### Option 1: a real phone with USB debugging

A real phone is often **faster** than an emulator, because it does not use the computer's memory. You need:

- an Android phone you have permission to use for this,
- a USB cable that carries data, not only charging,
- **USB debugging** switched on (a phone setting that lets Android Studio install apps on it).

Chapter 3 shows exactly how to switch on USB debugging and run your app on the phone. Do it there, with your first app ready.

### Option 3: Kotlin Playground in the browser

Chapters 4 to 8 teach plain Kotlin with small `fun main()` programs. These do not need Android Studio at all. You can run them in the official **Kotlin Playground**:

```text
https://play.kotlinlang.org
```

Type a program, press the run button, and the output appears below. For example:

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

The Playground runs plain Kotlin only. Screens built with Compose (Chapter 9 onwards) need Android Studio.

## A Tour of the Android Studio Window

You will see the full window when you open a project in Chapter 3. Here is a map so you know the names in advance.

```text
+------------------------------------------+
| Toolbar: [device v] [> Run] [Sync]       |
+---------+------------------+-------------+
| Project | Editor           | Running     |
| files   | (your code)      | Devices /   |
|         |                  | Preview     |
+---------+------------------+-------------+
| Tool windows: Logcat, Build, Terminal    |
+------------------------------------------+
| Status bar: progress messages            |
+------------------------------------------+
```

| Part | What it is for |
|------|----------------|
| **Toolbar** | The device menu (choose emulator or phone) and the green **Run** button |
| **Project window** | The list of your app's folders and files, on the left |
| **Editor** | Where you read and type code, in the middle |
| **Code / Split / Design** | Buttons at the top right of the editor. **Split** shows code and a preview of your screen side by side. |
| **Running Devices** | Shows the emulator inside Android Studio |
| **Build** window | Messages from Gradle while it builds; errors appear here in red |
| **Logcat** | Messages from your running app; useful for finding problems |
| **Status bar** | The bottom line; shows tasks such as "Gradle sync" and their progress |

In the newest Android Studio look, many tool windows open from small icons along the left, right and bottom edges. Hover the mouse over an icon to see its name. The main menu (File, Edit, View…) may be hidden behind a **☰** icon at the top left on Windows.

## ⚠️ Common Mistake

**Installing from an unofficial site.**

Wrong: downloading "Android Studio full free" from a random file site.

What happens: you may get an old version, or harmful software that slows or damages the computer.

Right: only `https://developer.android.com/studio`.

**Closing Android Studio while the setup assistant is downloading.**

Wrong: the progress bar looks stuck, so you close the window.

What happens: some SDK parts are missing. Later, projects fail to build with messages about missing SDK files.

Right: be patient; large downloads can take a long time on a busy school network. If it was closed by mistake, open **SDK Manager** and install the missing parts, or run the setup assistant again.

**Putting the SDK in a folder with spaces or unusual characters.**

Wrong: an SDK location such as `D:\My Files\Android SDK`.

What happens: Android Studio may warn you, and some tools can fail to find files.

Right: keep the default location the setup assistant suggests.

## ✍️ Try It

1. Find your computer's RAM and system type (About your PC on Windows).
2. Decide which plan suits you: emulator, real phone or Kotlin Playground for now.
3. If you have permission and a strong enough computer, install Android Studio and create one virtual device called `Library Phone`.
4. If not, open Kotlin Playground and run the small Welcome program above.

*Hint:* with 8 GB of RAM or less, plan to use a real phone for screen chapters. Change nothing on anyone's computer or phone without asking first.

## 📝 Recap

- Android Studio needs a fairly strong computer: 8 GB of RAM at the least, and 16 GB if you also use the emulator.
- Download it only from `developer.android.com/studio`, and ask permission before installing.
- The first-run setup (Standard install) downloads the Android SDK: the toolbox for building apps.
- An emulator (virtual device) is a pretend phone. It needs plenty of memory and hardware acceleration.
- On slow computers, run apps on a real phone with USB debugging, and use Kotlin Playground for plain Kotlin.
- The Android Studio window has a Project window, an editor, a toolbar with Run, and tool windows such as Build and Logcat.

## 📖 Key Terms

| Term | Meaning |
|------|---------|
| Setup assistant | A set of screens that guides you through installing |
| SDK | Software Development Kit: the tools to build Android apps |
| Emulator / AVD | A pretend phone running on your computer |
| System image | The Android software that runs inside an emulator |
| Hardware acceleration | Using the processor's features to make the emulator fast |
| USB debugging | A phone setting that lets Android Studio install apps on it |
| Kotlin Playground | A website that runs plain Kotlin in the browser |

## 🏆 Practice

### 🟢 Level 1: Recall
1. What is the only safe address to download Android Studio from?
2. What does SDK stand for?
3. What is an emulator?

<details>
<summary>Show answer</summary>

1. `https://developer.android.com/studio`
2. **Software Development Kit.**
3. A **pretend phone** that runs in a window on your computer (an Android Virtual Device).

</details>

### 🟡 Level 2: Apply
Hamza's school computer has 8 GB of RAM and an old hard disk. The emulator takes many minutes to start and then freezes. Give him two sensible options so he can keep learning.

<details>
<summary>Show answer</summary>

Any two of these:

1. **Use a real Android phone** with USB debugging (with permission). It does not use the computer's memory, so it is often faster.
2. **Close other programs** and browser tabs while the emulator runs, and choose a phone with a smaller screen for the virtual device.
3. **Use Kotlin Playground** (`play.kotlinlang.org`) for Chapters 4 to 8, which only need plain Kotlin.

Not a good answer: downloading a "faster" Android Studio from another site.

</details>

### 🔴 Level 3: Challenge
Write a one-page **setup plan** for your class.

1. List the steps from "ask permission" to "virtual device running", in order.
2. For each step, write one thing that can go wrong and what to do.
3. Add a "plan B" for computers that are too slow.

<details>
<summary>Show one possible answer</summary>

1. **Ask permission** from the teacher or IT staff. *Problem:* installing is blocked. *Fix:* the teacher or IT staff install it.
2. **Check the computer** (About your PC: RAM, 64-bit). *Problem:* less than 8 GB. *Fix:* go to plan B.
3. **Download** from `developer.android.com/studio`. *Problem:* slow network. *Fix:* download once and let the teacher copy the installer to each PC.
4. **Run the installer and the first-run setup** (Standard). *Problem:* closed during download. *Fix:* reopen and finish the components in SDK Manager.
5. **Create a virtual device** (Phone, recommended system image). *Problem:* "virtualisation is off". *Fix:* an adult turns it on in the BIOS, or use plan B.
6. **Start the emulator** and wait. *Problem:* very slow. *Fix:* close other programs, or plan B.

**Plan B:** Kotlin Playground for Chapters 4 to 8, and a real phone with USB debugging (with permission) for Chapters 3 and 9 onwards.

</details>
