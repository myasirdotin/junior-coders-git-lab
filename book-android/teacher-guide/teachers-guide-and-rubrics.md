# Teacher's Guide & Rubrics

This guide helps a teacher run "Android Apps with Kotlin" with a Grade 9 or 10 class. It covers the computer lab, a pacing plan of about twenty weeks, marking rubrics, safety and privacy rules, and homework and discussion questions for every chapter.

## 🎯 What You Will Learn

- Prepare a computer lab for Android Studio, with a plan for slow internet and older computers.
- Choose between emulators, real phones and the Kotlin Playground for each part of the course.
- Pace the 19 chapters over about twenty weeks, with time for practice and the final project.
- Mark chapter work and the final Study Planner with clear, fair rubrics.
- Keep students and their families safe: privacy, permissions, sharing APKs and publishing.

## 🧭 Course Overview

| Part | Chapters | Students learn | Where the code runs |
|------|----------|----------------|--------------------|
| Getting Started | 1–3 | What an app is, installing Android Studio, the first app | Android Studio |
| Kotlin Basics | 4–8 | Variables, decisions, lists, loops, functions, lambdas, classes, null safety | Kotlin Playground or Android Studio |
| Building Screens | 9–13 | Text, images, layout, buttons, state, text input, scrolling lists | Android Studio |
| Real Apps | 14–16 | Navigation, saving data, themes, dark mode, accessibility | Android Studio |
| Responsible Apps | 17–18 | Permissions, privacy, debugging, testing, signing, sharing | Android Studio |
| Final Capstone | 19 | The Study Planner project | Android Studio |

**Who it is for.** Grades 9–10. Students should usually finish the JavaScript book first. Ideas like variables, conditions, loops and functions are taught again in Kotlin, but faster.

**The running example.** Chapters 9 to 16 grow one app, the School Library app, step by step. If a student misses a lesson, give them the previous chapter's finished code so they can continue with the class.

**Teaching values.** The book treats user data as an *Amānah*, avoids ads, tracking, streaks and games of chance, and uses school, library, charity and study examples. Keep class projects within the same rules.

## 🖥️ Lab Setup

### Computers

Android Studio is a large program. Check Google's current system requirements page before buying or planning; these are the usual needs:

| Item | Works | Comfortable |
|------|-------|-------------|
| Memory (RAM) | 8 GB (Playground and real phones; emulator is slow) | 16 GB or more |
| Free disk space | About 10 GB | 20 GB or more on an SSD |
| Processor | 64-bit, with virtualization support | A recent multi-core processor |
| Screen | 1280 × 800 | 1920 × 1080 |
| Operating system | 64-bit Windows, macOS, Linux or ChromeOS (supported versions) | |

Install the **newest stable version** of Android Studio. Do not mix versions across the lab: menus and templates change between versions, and the class will follow one screen.

### Slow or no internet

Android Studio downloads a lot on first use: the Android SDK, an emulator system image, and Gradle libraries for the first project. Plan for this:

1. **Before term:** on one lab PC, install Android Studio, create the "Empty Activity" project, add the libraries used in Chapters 14 and 15 (Navigation Compose, the serialization plugin, DataStore), and build it once. Run it on an emulator.
2. **Copy, do not download 30 times:** the SDK folder (shown in **Settings → Languages & Frameworks → Android SDK**) and the Gradle cache (`.gradle` in the user's home folder) can be copied to the other PCs with the same user setup. Test on two machines first.
3. **Keep the installer** on a USB drive or the school server.
4. Gradle has an **offline mode** (in the Gradle tool window). It only works when every library is already in the cache.
5. If a build fails in class with a download error, it is usually the network, not the student's code.

### Emulator or real phones?

| Option | Good | Watch out for |
|--------|------|---------------|
| **Emulator** | Same for every student; easy to test sizes, dark mode, Android versions | Needs RAM and virtualization switched on in the BIOS/UEFI and in Windows features |
| **Class set of phones** | Fast; real touch; light on the PCs | USB cables, drivers, charging; each phone needs Developer options and USB debugging |
| **Students' own phones** | Motivating | Only with parent consent; never inspect personal data; uninstall test apps afterwards |

A good mix: one emulator image prepared by the teacher, plus a few school phones for slow PCs.

### Kotlin Playground fallback

Chapters 4 to 8 use only plain Kotlin programs with `fun main()`. They run in the browser at play.kotlinlang.org with nothing to install. Use it:

- for the whole Kotlin Basics part, if the lab is not ready yet;
- on older computers that cannot run Android Studio well;
- for homework on any device with a browser;
- for testing the plain logic of later chapters (for example `validateTask` in Chapter 19).

Compose screens cannot run in the Playground. Students on weak computers can pair with a classmate for Chapters 9 to 19.

## 📅 Pacing Plan (about 20 weeks)

Assumes two or three lessons a week of 45–60 minutes. Adjust to your timetable.

| Week | Chapters | Focus | Check-in |
|------|----------|-------|----------|
| 1 | 1 | What an app is; how phones run apps | Discussion: apps that help people |
| 2 | 2 | Install Android Studio; create an emulator | Every PC runs the emulator |
| 3 | 3 | First app; reading the template | Name on screen, screenshot |
| 4 | 4 | Variables and types | Playground quiz |
| 5 | 5 | `if` and `when` | Level 2 task |
| 6 | 6 | Lists and loops | Level 2 task |
| 7 | 7 | Functions and lambdas | Short test, Chapters 4–7 |
| 8 | 8 | Classes, data classes, null safety | `Book` class in the Playground |
| 9 | 9 | Text and images: the first book card | Card with image and alt text |
| 10 | 10 | Layouts and modifiers | Card layout matches a sketch |
| 11 | 11 | Buttons and state: "Save for later" | Explain recomposition aloud |
| 12 | 12 | Text input and forms: search box | Search filters titles |
| 13 | 13 | Scrolling lists with `LazyColumn` | Full book list |
| 14 | 14 | Navigation: detail screen | Two screens working |
| 15 | 15 | Saving with DataStore | Saved books survive a restart |
| 16 | 16 | Themes, dark mode, accessibility | TalkBack walk-through |
| 17 | 17 | Permissions and privacy | Privacy review of a sample app |
| 18 | 18 | Debugging, unit tests, signing, sharing | Three passing unit tests |
| 19 | 19 | Final project: plan and build | Plan and logic file checked |
| 20 | 19 | Finish, test, present | Rubric marking and short presentations |

**If you have less time** (about 14 weeks): put Chapters 4 and 5 in one week, 6 and 7 in one week, and 17 and 18 in one week, and give two weeks to the project instead of three.

## 📊 Rubrics

### Chapter work (each chapter's Practice)

| Level | Full marks when the student... |
|-------|-------------------------------|
| 🟢 Recall (1 mark) | Answers correctly in their own words |
| 🟡 Apply (2 marks) | Writes code that runs and gives the expected output or screen |
| 🔴 Challenge (3 marks) | Completes all steps, code is tidy, and they can explain one design choice |

Answers are hidden under "Show answer" in the book. Ask students to try first, then compare. Copying an answer without trying is not learning (academic integrity, *Ṣidq*).

### Small app tasks (Chapters 9–18)

| Area | 3: excellent | 2: good | 1: started |
|------|-------------|---------|-----------|
| Works | Runs without crashing; all asked features work | Small bug or one feature missing | Builds but most features missing |
| Code | `val` by default, no `!!`, clear names, small composables | Mostly tidy | Long single function, unclear names |
| Screen | Matches the task; readable in light and dark | Minor layout issues | Hard to read or use |
| Explains | Can explain how state or data flows in their app | Explains with help | Cannot explain |

### Final project: the Study Planner (Chapter 19)

Use the 4-row, 12-mark rubric printed in Chapter 19 (Features, Code quality, Design and accessibility, Testing and honesty). Suggested grade bands:

| Marks | Meaning |
|-------|---------|
| 11–12 | Excellent: complete, accessible, tested, well explained |
| 8–10 | Good: works well with small gaps |
| 5–7 | Developing: core list and form work; saving or checks incomplete |
| 0–4 | Beginning: needs support to reach a working app |

Add a short **presentation** (2–3 minutes): the student shows the app, one bug they fixed and how they found it, and why the app needs no permissions.

## 🛡️ Safety and Privacy Notes

- **No real personal data.** Example apps use made-up books and tasks. Students do not collect names, photos, locations or contacts of classmates.
- **No accounts, ads, analytics or tracking libraries** in class projects. If a student wants to add a library, they ask first and explain why.
- **Permissions only when needed**, explained first, and the app must work without them (Chapter 17).
- **Keystores.** For class work, the debug key is enough. If the class makes a release, the teacher creates and keeps the keystore. Keystores and passwords never go in Git, chat groups or shared drives.
- **Sharing APKs.** Students may share their own APK with family or the teacher. They never install APKs from strangers. Explain the "Install unknown apps" warning honestly and turn the setting off again afterwards.
- **Publishing.** Google Play developer accounts are for adults (18+). If a class app is published, it is through the teacher's or school's account, after a privacy check and an honest Data safety form. Do not publish students' full names without consent.
- **Own phones.** Only with parent consent. Never look through a student's phone. Uninstall test apps at the end of the course.
- **Wellbeing.** Apps in this course help people; they do not compete for attention. No streaks, pressure notifications or points for time spent in the app.

## 🏠 Homework and Discussion Questions

Each homework takes about 20–30 minutes. Plain Kotlin homework can be done in the Kotlin Playground on any device.

| Ch | Homework | Discussion question |
|----|----------|--------------------|
| 1 | List three apps your family uses and the problem each solves | Which app would most help our school community? |
| 2 | Write the steps to create an emulator, in your own words | Why do developers test on many screen sizes? |
| 3 | Change the greeting and the theme colour; take a screenshot | What surprised you in the template code? |
| 4 | Write a program with five variables describing a library book | When should you choose `val`, and when `var`? |
| 5 | Use `when` to print a reading level from a grade (6–10) | When is `when` clearer than many `if`s? |
| 6 | Total the pages in a list of five books with a loop | Why do lists start at index 0? |
| 7 | Write `fun isLongBook(pages: Int): Boolean` and test it with three values | What makes a function name good? |
| 8 | Make a `Book` data class and use `copy` to mark one as borrowed | Why does Kotlin care so much about `null`? |
| 9 | Make a card for your favourite school subject with an image and alt text | Who needs a content description, and why? |
| 10 | Sketch a book card on paper, then build it with `Row` and `Column` | Why does the order of modifiers matter? |
| 11 | Add a "borrowed" counter with a reset button | What is recomposition, in one sentence? |
| 12 | Add a form field with a helpful error message | How can an error message be kind and clear? |
| 13 | Show 20 sample books in a `LazyColumn` | Why does a lazy list only build visible rows? |
| 14 | Add an "About the library" screen | How should the Back button behave? |
| 15 | Save one setting (for example a reading goal) with DataStore | What should an app never save? |
| 16 | Test your app in dark mode and with the largest font; fix one problem | Who is left out when an app is not accessible? |
| 17 | Review a made-up app's permission list and suggest removals | Why is user data an *Amānah*? |
| 18 | Write two unit tests for a function from an earlier chapter | Why must a keystore stay private? |
| 19 | Plan your Study Planner: features, screens, data, files | Which extension would help your family most, and why? |

## 💡 Teaching Tips

- **Errors first.** When a build fails, start with the first red error in Android Studio and read it aloud together. Most errors are a missing import (Alt + Enter) or a typo.
- **Type, do not paste.** Students learn more when they type code themselves. Allow copying only for long import lists.
- **Pair programming.** One student types, one reads and checks; swap every 10 minutes. This also helps when some PCs are slow.
- **Show the screen.** After each step, ask "What will the phone show now?" before running the app.
- **Differentiation.** Fast students take the Level 3 tasks and the Chapter 19 extensions. Students who need support focus on Level 1 and 2 and receive the previous chapter's finished code.
- **Praise effort and good questions**, not only working apps. A well-explained bug fix deserves credit.

## 📝 Recap

- Prepare the lab before term: one tested setup, copied to all PCs, with the emulator, the template project and the Chapter 14–15 libraries built once.
- Use the Kotlin Playground for Chapters 4–8 and on weak computers; Android Studio for screens.
- About 20 weeks covers all 19 chapters, with two weeks for the Study Planner project.
- Mark Practice with the 1–2–3 levels, small apps with the 4-area rubric, and the final project with the 12-mark rubric in Chapter 19.
- Protect students: no real personal data, no tracking, permissions only when needed, keystores kept by the teacher, and publishing only by an adult.
