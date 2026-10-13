# Chapter 19: Final Project: The Study Planner

## 🌟 Real-Life Story

Fatima has exams in three weeks. On Sunday evening she takes a sheet of paper and writes a plan: "Maths, fractions worksheet, 30 minutes. Science, water cycle notes, 25 minutes." Each time she finishes a task, she ticks it. At the end of the week she adds up the minutes and feels calm: the work is getting done, step by step.

The paper plan works, but it gets lost, the ticks get messy, and adding up minutes takes time. In this final project you will build the same plan as an Android app. It uses almost everything in this book: Kotlin data classes, a form with checks, a scrolling list, two screens, saving on the phone, themes and accessibility. And, like Fatima's paper, it keeps her plan private.

## 🎯 What You Will Learn

- Plan an app before coding: features, screens, data and files.
- Build a complete two-screen Compose app with a list, a form, checkboxes and totals.
- Save and load the plan with Preferences DataStore, using a simple text format you design yourself.
- Check your app against a theme, accessibility and privacy checklist.
- Mark your own work with a rubric and choose an extension.

## The Plan

Good apps start on paper. Here is the plan for the **Study Planner**.

**Features (what the user can do):**

1. See all study tasks in a scrolling list.
2. Tick a task as done, or untick it.
3. Delete a task.
4. Add a task on a second screen: subject, title and minutes, with clear error messages.
5. See the total minutes planned and done, with a progress bar.
6. Close the app and find the plan still there.

**Screens:**

```text
 TaskList screen          AddTask screen
┌─────────────────┐     ┌─────────────────┐
│ Study Planner   │     │ Add a study task│
│ Planned: 1 h 10 │     │ [Subject      ] │
│ Done: 45 min    │ ──► │ [What to study] │
│ ▓▓▓▓▓▓▓░░░░     │     │ [Minutes      ] │
│ ☑ Fractions     │     │                 │
│ ☐ Water cycle   │ ◄── │ Cancel   Save   │
│      [Add task] │     └─────────────────┘
└─────────────────┘
```

**Data:** one data class, `StudyTask`. **Privacy:** the app needs **no permissions**. Nothing leaves the phone (Chapter 17).

**Files:** keep the code tidy, one job per file.

| File | Job |
|------|-----|
| `StudyTask.kt` | The data class and plain Kotlin helpers (no screen code) |
| `TaskStore.kt` | Saving and loading with DataStore |
| `TaskListScreen.kt` | The list screen, the totals card and one task row |
| `AddTaskScreen.kt` | The form with validation |
| `MainActivity.kt` | The routes, the `NavHost` and the shared state |

## Project Setup

1. In Android Studio choose **New Project → Empty Activity**.
2. Name: `Study Planner`. Package name: `org.juniorcoders.planner`. Language: Kotlin. Minimum SDK: leave the suggested value.
3. The template already includes Compose and Material 3. It also makes a theme named after the app: `StudyPlannerTheme` in `ui/theme/Theme.kt`.
4. Add **Navigation Compose** and the **Kotlin serialization plugin** the same way as in Chapter 14, and **Preferences DataStore** as in Chapter 15. In `app/build.gradle.kts` the lines look like this:

```kotlin
plugins {
    // ...the template's plugins...
    alias(libs.plugins.kotlin.serialization)
}

dependencies {
    // ...the template's dependencies...
    implementation(libs.androidx.navigation.compose)
    implementation(libs.kotlinx.serialization.json)
    implementation(libs.androidx.datastore.preferences)
}
```

The `libs.` names point to entries in `gradle/libs.versions.toml`. If a name is red, use Android Studio's suggestion (Alt + Enter) or copy the current lines from the official Android docs pages for Navigation and DataStore. Do not type a version number from memory. Then click **Sync Now**.

## File 1: StudyTask.kt (the data and the logic)

All the thinking that does not draw anything goes in one plain Kotlin file. That makes it easy to test, just like `formatMinutes` in Chapter 18.

```kotlin
package org.juniorcoders.planner

data class StudyTask(
    val id: Int,
    val subject: String,
    val title: String,
    val minutes: Int,
    val done: Boolean
)

fun encodeTask(task: StudyTask): String =
    "${task.id}|${task.subject}|${task.title}|${task.minutes}|${task.done}"

fun decodeTask(line: String): StudyTask? {
    val parts = line.split("|")
    if (parts.size != 5) return null
    val id = parts[0].toIntOrNull() ?: return null
    val minutes = parts[3].toIntOrNull() ?: return null
    val done = parts[4] == "true"
    return StudyTask(id, parts[1], parts[2], minutes, done)
}

fun encodeTasks(tasks: List<StudyTask>): String =
    tasks.joinToString("\n") { encodeTask(it) }

fun decodeTasks(text: String): List<StudyTask> =
    text.lines().mapNotNull { decodeTask(it) }

fun validateTask(subject: String, title: String, minutesText: String): String? {
    val minutes = minutesText.toIntOrNull()
    return when {
        subject.isBlank() -> "Please choose a subject."
        title.isBlank() -> "Please write what you will study."
        title.length > 60 -> "Keep the title under 60 characters."
        "|" in subject || "|" in title -> "Please do not use the | sign."
        minutes == null -> "Minutes must be a number."
        minutes < 5 || minutes > 180 -> "Choose between 5 and 180 minutes."
        else -> null
    }
}

fun nextId(tasks: List<StudyTask>): Int = (tasks.maxOfOrNull { it.id } ?: 0) + 1

fun plannedMinutes(tasks: List<StudyTask>): Int = tasks.sumOf { it.minutes }

fun doneMinutes(tasks: List<StudyTask>): Int = tasks.filter { it.done }.sumOf { it.minutes }

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

A few helpers here are new. Each one is a small list or text tool:

| Helper | What it does | Example |
|--------|-------------|---------|
| `split("\|")` | Cuts text into a list at each `\|` | `"a\|b"` → `[a, b]` |
| `toIntOrNull()` | Text to `Int`, or `null` if it is not a number | `"two"` → `null` |
| `?: return null` | "If this is null, stop and give back null" | |
| `joinToString("\n") { }` | Turns a list into one text, one item per line | |
| `lines()` | Cuts text into a list of lines | |
| `mapNotNull { }` | Like `map`, but drops the `null` results | broken lines vanish |
| `maxOfOrNull { }` | The largest value, or `null` for an empty list | |
| `sumOf { }` | Adds up one number from each item | |
| `"\|" in title` | `true` if the text contains `\|` | |

`validateTask` returns a `String?`: an error message, or `null` when everything is fine. The form will show the message to the user.

### Run the logic first

Before building any screen, test the logic in the Kotlin Playground. Paste the file **without** the `package` line, and add this `main`:

```kotlin
fun main() {
    val tasks = listOf(
        StudyTask(1, "Maths", "Fractions worksheet", 30, true),
        StudyTask(2, "Science", "Read about the water cycle", 25, false),
        StudyTask(3, "Arabic", "Practise ten new words", 15, true)
    )
    val saved = encodeTasks(tasks)
    println("Saved text:")
    println(saved)

    val loaded = decodeTasks(saved + "\nbroken line")
    println("Loaded ${loaded.size} tasks, same as before: ${loaded == tasks}")
    println("Planned: ${formatMinutes(plannedMinutes(loaded))}, done: ${formatMinutes(doneMinutes(loaded))}")
    println("Next id: ${nextId(loaded)}")

    println(validateTask("History", "", "20"))
    println(validateTask("History", "Timeline of the Silk Road", "two"))
    println(validateTask("History", "Timeline of the Silk Road", "300"))
    println(validateTask("History", "Timeline | part 1", "20"))
    println(validateTask("History", "Timeline of the Silk Road", "20"))
}
```

Output:

```text
Saved text:
1|Maths|Fractions worksheet|30|true
2|Science|Read about the water cycle|25|false
3|Arabic|Practise ten new words|15|true
Loaded 3 tasks, same as before: true
Planned: 1 h 10 min, done: 45 min
Next id: 4
Please write what you will study.
Minutes must be a number.
Choose between 5 and 180 minutes.
Please do not use the | sign.
null
```

Look closely at what this proves. Saving and loading give back **exactly** the same list (`true`). A broken line is skipped instead of crashing. Each wrong input gets a clear message, and a correct one gets `null`.

### Why lines of text and not JSON?

DataStore Preferences stores simple values: text, numbers, true/false. A list of tasks has to become **one piece of text**. There are two common choices:

| Choice | Good | Not so good |
|--------|------|-------------|
| Our lines: `1\|Maths\|Fractions\|30\|true` | No extra library; you can read it; you wrote every step yourself | The `\|` sign cannot appear in a title; not made for big data |
| JSON with a library | A standard format; any text allowed | One more library and new ideas to learn |

For a few dozen tasks, our format is clear and enough. We protect it with validation: the form refuses `|`, and `singleLine = true` stops new lines in the text fields. For hundreds of records with searching and sorting, the next step is **Room**, a real database on the phone with tables, like the tables in the MySQL book.

## File 2: TaskStore.kt (saving)

This is the same DataStore pattern as Chapter 15, with one text key that holds all the lines.

```kotlin
package org.juniorcoders.planner

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

private val Context.plannerDataStore: DataStore<Preferences>
    by preferencesDataStore(name = "study_planner")

private val TASKS_KEY = stringPreferencesKey("tasks")

class TaskStore(private val context: Context) {

    val tasks: Flow<List<StudyTask>> =
        context.plannerDataStore.data.map { prefs ->
            decodeTasks(prefs[TASKS_KEY] ?: "")
        }

    suspend fun save(tasks: List<StudyTask>) {
        context.plannerDataStore.edit { prefs ->
            prefs[TASKS_KEY] = encodeTasks(tasks)
        }
    }
}
```

- `tasks` is a **Flow**: a stream that sends a new list every time the saved text changes. The screen will turn it into state.
- `save` is a `suspend` function. That word means it must run in the background helper (`scope.launch { }`), so saving never freezes the screen.
- On the very first run nothing is saved yet, so `prefs[TASKS_KEY]` is `null` and `?: ""` gives empty text. `decodeTasks("")` returns an empty list.

## File 3: TaskListScreen.kt (the list)

```kotlin
package org.juniorcoders.planner

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.selection.toggleable
import androidx.compose.material3.Card
import androidx.compose.material3.Checkbox
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExtendedFloatingActionButton
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.unit.dp

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TaskListScreen(
    tasks: List<StudyTask>,
    onToggle: (StudyTask) -> Unit,
    onDelete: (StudyTask) -> Unit,
    onAddClick: () -> Unit
) {
    Scaffold(
        modifier = Modifier.fillMaxSize(),
        topBar = { TopAppBar(title = { Text("Study Planner") }) },
        floatingActionButton = {
            ExtendedFloatingActionButton(onClick = onAddClick) {
                Text("Add task")
            }
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .padding(innerPadding)
                .fillMaxSize()
        ) {
            TotalsCard(tasks = tasks, modifier = Modifier.padding(16.dp))
            if (tasks.isEmpty()) {
                Text(
                    "No tasks yet. Tap \"Add task\" to plan your first study session.",
                    modifier = Modifier.padding(16.dp)
                )
            } else {
                LazyColumn(contentPadding = PaddingValues(bottom = 88.dp)) {
                    items(tasks, key = { it.id }) { task ->
                        TaskRow(
                            task = task,
                            onToggle = { onToggle(task) },
                            onDelete = { onDelete(task) }
                        )
                        HorizontalDivider()
                    }
                }
            }
        }
    }
}

@Composable
fun TotalsCard(tasks: List<StudyTask>, modifier: Modifier = Modifier) {
    val planned = plannedMinutes(tasks)
    val done = doneMinutes(tasks)
    Card(modifier = modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                "Planned: ${formatMinutes(planned)}",
                style = MaterialTheme.typography.titleMedium
            )
            Text("Done: ${formatMinutes(done)}")
            if (planned > 0) {
                LinearProgressIndicator(
                    progress = { done.toFloat() / planned },
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(top = 8.dp)
                )
            }
        }
    }
}

@Composable
fun TaskRow(task: StudyTask, onToggle: () -> Unit, onDelete: () -> Unit) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .heightIn(min = 56.dp)
            .toggleable(
                value = task.done,
                role = Role.Checkbox,
                onValueChange = { onToggle() }
            )
            .padding(horizontal = 16.dp, vertical = 8.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Checkbox(checked = task.done, onCheckedChange = null)
        Spacer(Modifier.width(12.dp))
        Column(modifier = Modifier.weight(1f)) {
            Text(
                task.title,
                style = MaterialTheme.typography.bodyLarge,
                textDecoration = if (task.done) TextDecoration.LineThrough else null
            )
            Text(
                "${task.subject} · ${formatMinutes(task.minutes)}",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
        TextButton(
            onClick = onDelete,
            modifier = Modifier.semantics { contentDescription = "Delete ${task.title}" }
        ) { Text("Delete") }
    }
}
```

What is new or worth noticing:

- The screen gets the list and three **event lambdas** as parameters. It never saves anything itself. The state lives in one place (`MainActivity.kt`), the screen only shows it and reports taps. This is called **state hoisting** (Chapter 11 and 12 used it for small pieces).
- `ExtendedFloatingActionButton` is the large rounded "Add task" button that floats in the bottom corner. `contentPadding = PaddingValues(bottom = 88.dp)` leaves room under the last row so the button never hides it.
- `TopAppBar` is still marked experimental in Material 3, so the function needs `@OptIn(ExperimentalMaterial3Api::class)`.
- `.toggleable(...)` makes the **whole row** one big checkbox: tapping the title ticks it too, and TalkBack reads it as "checkbox, checked". That is why the `Checkbox` itself has `onCheckedChange = null`.
- `LinearProgressIndicator(progress = { ... })` takes a lambda that gives a number from 0.0 to 1.0. `done.toFloat() / planned` turns 45 out of 70 into about 0.64. We hide it when nothing is planned, to avoid dividing by zero.
- The Delete button's `contentDescription` says **which** task, so a TalkBack user does not hear "Delete, Delete, Delete".

## File 4: AddTaskScreen.kt (the form)

```kotlin
package org.juniorcoders.planner

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AddTaskScreen(
    onSave: (subject: String, title: String, minutes: Int) -> Unit,
    onCancel: () -> Unit
) {
    var subject by rememberSaveable { mutableStateOf("") }
    var title by rememberSaveable { mutableStateOf("") }
    var minutesText by rememberSaveable { mutableStateOf("") }
    var error by rememberSaveable { mutableStateOf("") }

    Scaffold(
        modifier = Modifier.fillMaxSize(),
        topBar = { TopAppBar(title = { Text("Add a study task") }) }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .padding(innerPadding)
                .padding(16.dp)
                .fillMaxWidth()
                .verticalScroll(rememberScrollState()),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            OutlinedTextField(
                value = subject,
                onValueChange = { subject = it; error = "" },
                label = { Text("Subject (for example Maths)") },
                singleLine = true,
                modifier = Modifier.fillMaxWidth()
            )
            OutlinedTextField(
                value = title,
                onValueChange = { title = it; error = "" },
                label = { Text("What will you study?") },
                singleLine = true,
                modifier = Modifier.fillMaxWidth()
            )
            OutlinedTextField(
                value = minutesText,
                onValueChange = { text ->
                    minutesText = text.filter { it.isDigit() }
                    error = ""
                },
                label = { Text("Minutes (5 to 180)") },
                singleLine = true,
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                modifier = Modifier.fillMaxWidth()
            )
            if (error.isNotEmpty()) {
                Text(error, color = MaterialTheme.colorScheme.error)
            }
            Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                OutlinedButton(onClick = onCancel) { Text("Cancel") }
                Button(onClick = {
                    val problem = validateTask(subject, title, minutesText)
                    if (problem != null) {
                        error = problem
                    } else {
                        onSave(subject.trim(), title.trim(), minutesText.toIntOrNull() ?: 0)
                    }
                }) { Text("Save task") }
            }
        }
    }
}
```

- The three fields use `rememberSaveable`, so typed text survives turning the phone sideways (Chapter 12).
- `text.filter { it.isDigit() }` keeps only digits in the minutes field. The number keyboard helps, but some keyboards still allow other signs, so we filter as well.
- The **Save task** button calls `validateTask`, the same function we tested in the Playground. If there is a problem, the message appears in the error colour and nothing is saved. If not, the screen reports `onSave(...)` and the shared state does the rest.
- `verticalScroll(rememberScrollState())` lets the form scroll when the keyboard or large text makes it taller than the screen.

What the screen shows after tapping **Save task** with an empty title:

```text
┌──────────────────────────────┐
│ Add a study task             │
│ ┌ Subject (for example... ┐  │
│ │ Science                 │  │
│ └─────────────────────────┘  │
│ ┌ What will you study? ───┐  │
│ │                         │  │
│ └─────────────────────────┘  │
│ ┌ Minutes (5 to 180) ─────┐  │
│ │ 25                      │  │
│ └─────────────────────────┘  │
│ Please write what you will   │
│ study.                       │
│ ( Cancel )  [ Save task ]    │
└──────────────────────────────┘
```

## File 5: MainActivity.kt (routes and shared state)

```kotlin
package org.juniorcoders.planner

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.rememberCoroutineScope
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import kotlinx.coroutines.launch
import kotlinx.serialization.Serializable
import org.juniorcoders.planner.ui.theme.StudyPlannerTheme

@Serializable
object TaskList

@Serializable
object AddTask

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        val store = TaskStore(applicationContext)
        setContent {
            StudyPlannerTheme {
                PlannerApp(store)
            }
        }
    }
}

@Composable
fun PlannerApp(store: TaskStore) {
    val tasks by store.tasks.collectAsState(initial = emptyList())
    val scope = rememberCoroutineScope()
    val navController = rememberNavController()

    fun save(newTasks: List<StudyTask>) {
        scope.launch { store.save(newTasks) }
    }

    NavHost(navController = navController, startDestination = TaskList) {
        composable<TaskList> {
            TaskListScreen(
                tasks = tasks,
                onToggle = { task ->
                    save(tasks.map { if (it.id == task.id) it.copy(done = !it.done) else it })
                },
                onDelete = { task ->
                    save(tasks.filter { it.id != task.id })
                },
                onAddClick = { navController.navigate(AddTask) }
            )
        }
        composable<AddTask> {
            AddTaskScreen(
                onSave = { subject, title, minutes ->
                    save(tasks + StudyTask(nextId(tasks), subject, title, minutes, false))
                    navController.popBackStack()
                },
                onCancel = { navController.popBackStack() }
            )
        }
    }
}
```

How the pieces work together:

```text
DataStore (the saved text)
   │ Flow of List<StudyTask>
   ▼
collectAsState ──► tasks
   ▲                 │
   │                 ▼
   │     TaskListScreen, AddTaskScreen
   │                 │ onToggle, onDelete,
   │                 │ onSave
   │                 ▼
store.save(...) ◄── save(newList)
```

- `collectAsState(initial = emptyList())` turns the DataStore Flow into Compose state. Every time something is saved, the Flow sends the new list, `tasks` changes and the screens recompose.
- `save(...)` uses `rememberCoroutineScope().launch { }`, the small helper that runs saving in the background (Chapter 15).
- We never change a task inside the list. Ticking makes a **new** list where one task is replaced by `it.copy(done = !it.done)`. `copy` (Chapter 8) makes a new object with one value changed. Deleting makes a new list with `filter`. Adding uses `tasks + newTask`.
- `@Serializable object TaskList` and `AddTask` are the two type-safe routes from Chapter 14. `popBackStack()` goes back to the list after saving or cancelling.

Run the app. Add two or three tasks, tick one, then close the app completely and open it again. Your plan is still there.

## Theme and Accessibility Checklist

Go through this list on an emulator or a real phone before you hand in the project (Chapters 16 and 18):

| ✔ | Check |
|---|-------|
| ☐ | Colours come from `MaterialTheme.colorScheme`, not hard-coded, so dark mode works |
| ☐ | The app looks right in **dark mode** and **light mode** |
| ☐ | With the **largest font size**, no text is cut off and the form still scrolls |
| ☐ | Every row and button is at least **48dp** tall |
| ☐ | **TalkBack** reads each row as a checkbox with its title, and each Delete button says which task |
| ☐ | Error messages are in words, not only in red colour |
| ☐ | Works on a **small phone** and a **tablet**, and when turned sideways |
| ☐ | Empty list shows a friendly hint, not a blank screen |
| ☐ | The app asks for **no permissions** and sends nothing off the phone |
| ☐ | A unit test for `validateTask` or `formatMinutes` passes (Chapter 18) |

## Marking Rubric

Each row is worth 0 to 3 marks, 12 in total. Use it to check your own work before your teacher does.

| Area | 3 marks: excellent | 2 marks: good | 1 mark: started |
|------|-------------------|---------------|-----------------|
| **Features** | List, add, tick, delete, totals and saving all work with no crash | One feature missing or one small bug | Only the list or only the form works |
| **Code quality** | Five clear files; `val` by default; no `!!`; clear names; logic in `StudyTask.kt` | Mostly tidy; some logic inside screens | Everything in one file; unclear names |
| **Design and accessibility** | Whole checklist passes, including TalkBack, dark mode and large text | Most checks pass | Looks fine only in one mode or size |
| **Testing and honesty** | At least three passing unit tests; can explain the save format and why there are no permissions; own work, sources named | One or two tests; partial explanation | No tests; cannot explain the code |

## Extension Ideas

Finished early? Choose one. Each idea is useful, kind and private.

1. **Weekly summary.** Show the minutes done per subject: "Maths: 50 min, Science: 25 min." (See Level 2 below.)
2. **Prayer-aware break reminder.** The user **types** today's prayer times from their local masjid's timetable, for example `13:15`. When they plan a session that would run over a prayer time, the app suggests a break: "Your session runs into 13:15. Plan a break?" The app does not calculate prayer times itself; it trusts the times the user enters. (See Level 3 below.)
3. **Edit a task.** A third screen with a route like `@Serializable data class EditTask(val id: Int)`.
4. **Undo delete.** Show a short message with an **Undo** button after deleting (look up `Snackbar` in the Material 3 docs).
5. **Subject chips.** Let the user tap a subject from a short list instead of typing it.

Avoid "streaks", points or pushy reminders. A planner should calm a student, not make them anxious.

## ⚠️ Common Mistake

**Mistake 1: changing the list in place.**

```kotlin
// Wrong: tries to change the task inside the list
onToggle = { task -> task.done = true }
```

This does not even compile: `done` is a `val`. And even with `var`, Compose and DataStore would not see the change. Fix: build a new list and save it:

```kotlin
onToggle = { task ->
    save(tasks.map { if (it.id == task.id) it.copy(done = !it.done) else it })
}
```

**Mistake 2: using the list position as the id.**

```kotlin
// Wrong: ids change when a task is deleted
StudyTask(tasks.size + 1, subject, title, minutes, false)
```

With tasks 1, 2 and 3, delete task 1 and add a new one: `tasks.size + 1` is 3 again, and two tasks share id 3. `items(..., key = { it.id })` then crashes, because keys must be unique. Fix: use `nextId(tasks)`, which takes the largest id and adds 1.

**Mistake 3: skipping validation "because I will type carefully".** A title with `|` in it breaks the saved line, and that task silently disappears next time. Validation protects the data format.

## ✍️ Try It

Build the app in this order, running it after each step:

1. `StudyTask.kt` and the Playground test. Check the output matches this chapter.
2. `TaskListScreen.kt` with three sample tasks passed in directly (no saving yet) and a `@Preview`.
3. `AddTaskScreen.kt` and the navigation in `MainActivity.kt`, keeping tasks in `remember { mutableStateOf(listOf<StudyTask>()) }` for now.
4. `TaskStore.kt`, then switch `PlannerApp` to `store.tasks.collectAsState(...)` and `save(...)`.
5. Go through the checklist and the rubric.

*Hint:* small steps make bugs easy to find. If step 4 breaks something, you know it is in the saving code.

## 📝 Recap

- Plan first: features, screens, data, files. Keep plain logic in its own file and test it before drawing screens.
- One `StudyTask` data class, a validated form, a `LazyColumn` with keyed, toggleable rows, and totals together make a complete app.
- State lives in one place (`PlannerApp`); screens show it and report events through lambdas.
- DataStore saves the plan as simple lines of text; validation keeps the format safe; Room is the next step for bigger data.
- The finished app needs no permissions and keeps everything on the phone: privacy as *Amānah*.

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which file holds the code that does not draw anything, and why is that useful?
2. What does `decodeTask` return for a line that is broken, and why does that not crash the app?

<details>
<summary>Show answer</summary>

1. `StudyTask.kt`. Plain Kotlin logic can be tested quickly (in the Playground or with JUnit) without running the app.
2. It returns `null`. `decodeTasks` uses `mapNotNull`, which drops the `null` results, so a broken line is skipped and the other tasks still load.

</details>

### 🟡 Level 2: Apply
Write a function `minutesFor(subject: String, tasks: List<StudyTask>): Int` that adds up the minutes of **done** tasks for one subject, using a `for` loop. Then print a weekly summary for each subject.

<details>
<summary>Show answer</summary>

```kotlin
fun minutesFor(subject: String, tasks: List<StudyTask>): Int {
    var total = 0
    for (task in tasks) {
        if (task.subject == subject && task.done) total += task.minutes
    }
    return total
}

fun main() {
    val tasks = listOf(
        StudyTask(1, "Maths", "Fractions worksheet", 30, true),
        StudyTask(2, "Science", "Water cycle notes", 25, true),
        StudyTask(3, "Maths", "Times tables quiz", 20, true),
        StudyTask(4, "Science", "Plant cells diagram", 40, false)
    )
    val subjects = tasks.map { it.subject }.distinct()
    for (subject in subjects) {
        println("$subject: ${minutesFor(subject, tasks)} min done")
    }
}
```

Output:

```text
Maths: 50 min done
Science: 25 min done
```

`distinct()` removes repeated subjects, so each one is printed once. In the app, show these lines in a `Card` under the totals.

</details>

### 🔴 Level 3: Challenge
Start the prayer-aware break reminder (extension 2) with plain Kotlin:

1. Write `toMinutes(time: String): Int?` that turns `"13:15"` into minutes after midnight (795), or `null` for anything that is not a valid `HH:MM` time.
2. Write `breakBefore(start: String, length: Int, prayerTimes: List<String>): String?` that returns the first typed prayer time that falls inside the session, or `null`.
3. Test: a 45-minute session at `"12:50"` with times `"13:15"` and `"16:45"`; a 30-minute session at `"14:00"`; and a wrong start `"1pm"`.

<details>
<summary>Show one possible answer</summary>

```kotlin
fun toMinutes(time: String): Int? {
    val parts = time.split(":")
    if (parts.size != 2) return null
    val h = parts[0].toIntOrNull() ?: return null
    val m = parts[1].toIntOrNull() ?: return null
    if (h !in 0..23 || m !in 0..59) return null
    return h * 60 + m
}

fun breakBefore(start: String, length: Int, prayerTimes: List<String>): String? {
    val begin = toMinutes(start) ?: return null
    val end = begin + length
    for (time in prayerTimes) {
        val prayer = toMinutes(time) ?: continue
        if (prayer in begin until end) return time
    }
    return null
}

fun main() {
    val typedTimes = listOf("13:15", "16:45")
    println(breakBefore("12:50", 45, typedTimes))
    println(breakBefore("14:00", 30, typedTimes))
    println(breakBefore("1pm", 30, typedTimes))
}
```

Output:

```text
13:15
null
null
```

`begin until end` is a range that includes `begin` but not `end`. `continue` skips a typed time that is not valid. In the app, add a "Start time" field to the form and show the suggestion under it when `breakBefore` is not `null`. The prayer times come only from what the user types.

</details>
