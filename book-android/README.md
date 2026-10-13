# Android Apps with Kotlin 📱

**The Junior Coders textbook for building real Android phone apps, Grades 9–10**

---

## 📘 About This Book

"Android Apps with Kotlin" teaches students to build small, useful and honest Android apps. Students use **Android Studio**, the **Kotlin** language and **Jetpack Compose** with **Material 3**, the way Google currently recommends for new apps. There are no XML layouts and no Java.

The book starts with what an app is and how to install Android Studio. It teaches Kotlin with short programs that run in the browser, then builds one app step by step: the **School Library** app, with book cards, a "Save for later" button, search, a scrolling list, a detail screen, saved data, themes and accessibility. It ends with permissions and privacy, testing and sharing, and a final **Study Planner** project.

Students should usually finish the JavaScript book first. Variables, conditions, loops and functions are explained again in Kotlin, but faster.

Every example follows the Junior Coders values: school, library, study and charity scenarios; no ads, tracking or games of chance; and user data treated as an *Amānah* (a trust).

---

## 📚 Table of Contents

### Part 1: Getting Started
- **Chapter 1**: What Is an Android App? ([part-01-getting-started/ch01-what-is-an-android-app.md](part-01-getting-started/ch01-what-is-an-android-app.md))
- **Chapter 2**: Installing Android Studio ([part-01-getting-started/ch02-installing-android-studio.md](part-01-getting-started/ch02-installing-android-studio.md))
- **Chapter 3**: Your First App ([part-01-getting-started/ch03-your-first-app.md](part-01-getting-started/ch03-your-first-app.md))

### Part 2: Kotlin Basics
- **Chapter 4**: Variables and Types ([part-02-kotlin-basics/ch04-variables-and-types.md](part-02-kotlin-basics/ch04-variables-and-types.md))
- **Chapter 5**: Decisions with if and when ([part-02-kotlin-basics/ch05-if-and-when.md](part-02-kotlin-basics/ch05-if-and-when.md))
- **Chapter 6**: Lists and Loops ([part-02-kotlin-basics/ch06-lists-and-loops.md](part-02-kotlin-basics/ch06-lists-and-loops.md))
- **Chapter 7**: Functions and Lambdas ([part-02-kotlin-basics/ch07-functions-and-lambdas.md](part-02-kotlin-basics/ch07-functions-and-lambdas.md))
- **Chapter 8**: Classes and Null Safety ([part-02-kotlin-basics/ch08-classes-and-null-safety.md](part-02-kotlin-basics/ch08-classes-and-null-safety.md))

### Part 3: Building Screens with Compose
- **Chapter 9**: Text and Images on the Screen ([part-03-compose-screens/ch09-text-and-images.md](part-03-compose-screens/ch09-text-and-images.md))
- **Chapter 10**: Layouts and Modifiers ([part-03-compose-screens/ch10-layouts-and-modifiers.md](part-03-compose-screens/ch10-layouts-and-modifiers.md))
- **Chapter 11**: Buttons and State ([part-03-compose-screens/ch11-buttons-and-state.md](part-03-compose-screens/ch11-buttons-and-state.md))
- **Chapter 12**: Text Input and Forms ([part-03-compose-screens/ch12-text-input.md](part-03-compose-screens/ch12-text-input.md))
- **Chapter 13**: Lists That Scroll ([part-03-compose-screens/ch13-scrolling-lists.md](part-03-compose-screens/ch13-scrolling-lists.md))

### Part 4: Real Apps
- **Chapter 14**: More Than One Screen ([part-04-real-apps/ch14-more-than-one-screen.md](part-04-real-apps/ch14-more-than-one-screen.md))
- **Chapter 15**: Saving Data on the Phone ([part-04-real-apps/ch15-saving-data.md](part-04-real-apps/ch15-saving-data.md))
- **Chapter 16**: Design, Themes and Accessibility ([part-04-real-apps/ch16-design-and-accessibility.md](part-04-real-apps/ch16-design-and-accessibility.md))

### Part 5: Responsible Apps
- **Chapter 17**: Permissions and Privacy ([part-05-responsible-apps/ch17-permissions-and-privacy.md](part-05-responsible-apps/ch17-permissions-and-privacy.md))
- **Chapter 18**: Testing and Sharing Your App ([part-05-responsible-apps/ch18-testing-and-sharing.md](part-05-responsible-apps/ch18-testing-and-sharing.md))

### Part 6: Final Capstone
- **Chapter 19**: Final Project: The Study Planner ([part-06-capstone-project/ch19-final-project-study-planner.md](part-06-capstone-project/ch19-final-project-study-planner.md))

### Reference and Teaching
- **Quick Reference & Glossary**: Kotlin and Compose tables and about fifty Android terms ([reference/quick-reference-and-glossary.md](reference/quick-reference-and-glossary.md))
- **Teacher's Guide & Rubrics**: lab setup, a 20-week pacing plan, rubrics, safety notes and homework ([teacher-guide/teachers-guide-and-rubrics.md](teacher-guide/teachers-guide-and-rubrics.md))

---

## 🧩 How Every Chapter Works

Every chapter follows the same Junior Coders template, in this order:

1. **🌟 Real-Life Story**: a short everyday picture of the idea, such as a librarian, a school nurse or a bakery sale.
2. **🎯 What You Will Learn**: three to five goals for the chapter.
3. **Topic sections**: the explanation, step by step. Every plain Kotlin example shows its exact output. Every Compose example describes, or sketches, what the phone screen shows.
4. **⚠️ Common Mistake**: a real beginner mistake, what goes wrong, and the fix.
5. **✍️ Try It**: one small task to do straight away, with a hint.
6. **📝 Recap**: the key ideas in a few bullet points.
7. **🏆 Practice**: three levels, 🟢 Recall, 🟡 Apply and 🔴 Challenge, with answers hidden under "Show answer".

Some chapters add **📖 Key Terms** after the Recap.

**Where the code runs.** Plain Kotlin programs (`fun main()`, mostly Chapters 4–8) run in the browser at the Kotlin Playground (play.kotlinlang.org). Compose screens need Android Studio with an emulator or a real phone. The book never quotes exact version numbers: always install the newest stable version of Android Studio, and add libraries with Android Studio's suggestion or the official docs.

---

## 🚀 Running the Interactive Reader

Open `index.html` in this folder in any web browser (or visit the Textbooks page of the Junior Coders site):

- **Offline reading**: all chapters are packed into `chapters-bundle.js`, so the book works without internet.
- **Read aloud**: the Read / Stop buttons and speed control narrate the chapter with your browser's voices.
- **Reading Mode**: a calm, distraction-free view.
- **Download PDF**: save or print a chapter.
- **Practise this chapter**: opens the Kotlin Playground for the plain Kotlin examples.

The chapter files are Markdown (`part-*/chNN-*.md`). After editing a chapter, run `node scripts/bundle-books.js` from the site's root folder to rebuild the bundle, then `node scripts/check-books.js` to check the template.
