/**
 * Junior Coders - Kotlin practice exercises (used by studios/kotlin-practice/index.html)
 *
 * Three kinds of task, like the PHP exercises:
 *   predict : the student reads code and types what it prints (no server needed)
 *   fill    : the student types the missing keyword/operator shown as ____ (no server needed)
 *   code    : the student writes Kotlin; js/kotlin-lab.js runs it on the Kotlin Playground compiler
 *             (JetBrains) and its output must match `expected`.
 *
 * `expected` must be exactly what the `solution` prints. Check after every edit (needs internet):
 *   node scripts/check-kotlin-exercises.js
 *
 * Order follows the Android Apps textbook (book-android chapters 4–8): variables, if/when, lists and loops,
 * functions and lambdas, classes and null safety. Tiers: 1 = warm-up, 2 = apply, 3 = challenge.
 * Scenarios: school library, charity drive, study planner (GEMINI.md §1). No `!!` anywhere.
 */
window.KOTLIN_EXERCISES = [
    // ── Tier 1: read and predict / fill (no server needed) ──
    {
        id: 'predict-template', tier: 1, type: 'predict', title: 'A library message',
        task: 'What does this program print?',
        code: 'fun main() {\n    val name = "Amina"\n    val books = 3\n    println("$name borrowed $books books")\n}',
        answer: 'Amina borrowed 3 books',
        why: 'In a string template, <code>$name</code> and <code>$books</code> are replaced by their values.'
    },
    {
        id: 'fill-var', tier: 1, type: 'fill', title: 'A counter that changes',
        task: 'The counter goes up later, so it cannot be read-only. Which keyword is missing?',
        code: 'fun main() {\n    ____ borrowed = 0\n    borrowed = borrowed + 1\n    println(borrowed)\n}',
        answers: ['var'],
        why: '<code>var</code> can be given a new value. With <code>val</code>, the line <code>borrowed = borrowed + 1</code> would not compile.'
    },
    {
        id: 'predict-division', tier: 1, type: 'predict', title: 'Sharing books fairly',
        task: '7 books are shared between 2 classes. What does this program print? (Write each line on its own line.)',
        code: 'fun main() {\n    println(7 / 2)\n    println(7 % 2)\n}',
        answer: '3\n1',
        why: 'Both numbers are whole numbers (<code>Int</code>), so <code>7 / 2</code> is 3 and the remainder <code>7 % 2</code> is 1.'
    },
    {
        id: 'predict-when', tier: 1, type: 'predict', title: 'Which grade?',
        task: 'What does this program print?',
        code: 'fun main() {\n    val mark = 82\n    val grade = when {\n        mark >= 90 -> "A"\n        mark >= 75 -> "B"\n        else -> "C"\n    }\n    println(grade)\n}',
        answer: 'B',
        why: '<code>when</code> takes the first branch that is true. 82 is not 90 or more, but it is 75 or more, so the answer is B.'
    },
    {
        id: 'fill-range', tier: 1, type: 'fill', title: 'Count to five',
        task: 'This loop should print <code>1 2 3 4 5</code>. Which operator makes the range?',
        code: 'fun main() {\n    for (i in 1 ____ 5) {\n        print("$i ")\n    }\n}',
        answers: ['..'],
        why: '<code>1..5</code> is a range from 1 to 5, including 5. (<code>1 until 5</code> would stop at 4.)'
    },
    {
        id: 'predict-elvis', tier: 1, type: 'predict', title: 'A missing note',
        task: 'What does this program print?',
        code: 'fun main() {\n    val note: String? = null\n    println(note ?: "No note")\n}',
        answer: 'No note',
        why: '<code>note</code> is null, so the Elvis operator <code>?:</code> uses the fallback text instead.'
    },

    // ── Tier 2: write code (runs on the Kotlin Playground compiler) ──
    {
        id: 'code-template', tier: 2, type: 'code', title: 'Welcome message',
        task: 'Print <code>Welcome, Bilal!</code> using the variable (do not type the name again).',
        starter: 'fun main() {\n    val student = "Bilal"\n    // your code below\n\n}',
        hint1: 'Use <code>println</code> with a string template: put <code>$student</code> inside the text.',
        hint2: '<code>println("Welcome, $student!")</code>',
        solution: 'fun main() {\n    val student = "Bilal"\n    println("Welcome, $student!")\n}',
        expected: 'Welcome, Bilal!'
    },
    {
        id: 'code-if', tier: 2, type: 'code', title: 'On the shelf?',
        task: 'If <code>copies</code> is more than 0, print <code>Available</code>. Otherwise print <code>On loan</code>.',
        starter: 'fun main() {\n    val copies = 0\n    // your code below\n\n}',
        hint1: 'Use <code>if (copies &gt; 0) { … } else { … }</code>.',
        hint2: 'Or in one line: <code>println(if (copies &gt; 0) "Available" else "On loan")</code>',
        solution: 'fun main() {\n    val copies = 0\n    if (copies > 0) {\n        println("Available")\n    } else {\n        println("On loan")\n    }\n}',
        expected: 'On loan'
    },
    {
        id: 'code-countdown', tier: 2, type: 'code', title: 'Science fair countdown',
        task: 'Print the numbers 5 down to 1, one per line, then print <code>Doors open!</code>',
        starter: 'fun main() {\n    // your code below\n\n}',
        hint1: 'A <code>for</code> loop can count down with <code>downTo</code>.',
        hint2: '<code>for (i in 5 downTo 1) { println(i) }</code>, then one more <code>println</code>.',
        solution: 'fun main() {\n    for (i in 5 downTo 1) {\n        println(i)\n    }\n    println("Doors open!")\n}',
        expected: '5\n4\n3\n2\n1\nDoors open!'
    },
    {
        id: 'code-sum', tier: 2, type: 'code', title: 'Charity drive total',
        task: 'Add up all the donations with a loop and print <code>Total: 200</code> (use the list, do not type 200).',
        starter: 'fun main() {\n    val donations = listOf(50, 120, 30)\n    var total = 0\n    // your code below\n\n}',
        hint1: 'Loop over the list with <code>for (d in donations)</code> and add each one to <code>total</code>.',
        hint2: 'Inside the loop: <code>total += d</code>. After the loop: <code>println("Total: $total")</code>',
        solution: 'fun main() {\n    val donations = listOf(50, 120, 30)\n    var total = 0\n    for (d in donations) {\n        total += d\n    }\n    println("Total: $total")\n}',
        expected: 'Total: 200'
    },
    {
        id: 'code-function', tier: 2, type: 'code', title: 'Garden bed area',
        task: 'Write a function <code>area(width: Int, length: Int): Int</code> that returns width × length. Then print <code>Area: 12</code> for a bed 4 wide and 3 long.',
        starter: 'fun area(width: Int, length: Int): Int {\n    // your code here\n}\n\nfun main() {\n    // call area(4, 3) and print the result\n}',
        hint1: 'The function body needs <code>return width * length</code>.',
        hint2: 'In <code>main</code>: <code>println("Area: ${area(4, 3)}")</code>',
        solution: 'fun area(width: Int, length: Int): Int {\n    return width * length\n}\n\nfun main() {\n    println("Area: ${area(4, 3)}")\n}',
        expected: 'Area: 12'
    },

    // ── Tier 3: challenges ──
    {
        id: 'code-data-class', tier: 3, type: 'code', title: 'Books on the shelf',
        task: 'Using the <code>Book</code> data class and the list, print <code>Available: 3</code>, then the title of each available book on its own line.',
        starter: 'data class Book(val id: Int, val title: String, val available: Boolean)\n\nfun main() {\n    val books = listOf(\n        Book(1, "Our Solar System", true),\n        Book(2, "Clean Water for Every Village", false),\n        Book(3, "Kind Words, Strong Hearts", true),\n        Book(4, "Kotlin for Young Builders", true)\n    )\n    // your code below\n\n}',
        hint1: '<code>books.filter { it.available }</code> gives a list of only the available books.',
        hint2: 'Store it: <code>val onShelf = books.filter { it.available }</code>. Print <code>onShelf.size</code>, then loop and print each <code>title</code>.',
        solution: 'data class Book(val id: Int, val title: String, val available: Boolean)\n\nfun main() {\n    val books = listOf(\n        Book(1, "Our Solar System", true),\n        Book(2, "Clean Water for Every Village", false),\n        Book(3, "Kind Words, Strong Hearts", true),\n        Book(4, "Kotlin for Young Builders", true)\n    )\n    val onShelf = books.filter { it.available }\n    println("Available: ${onShelf.size}")\n    for (book in onShelf) {\n        println(book.title)\n    }\n}',
        expected: 'Available: 3\nOur Solar System\nKind Words, Strong Hearts\nKotlin for Young Builders'
    },
    {
        id: 'code-null-safety', tier: 3, type: 'code', title: 'Typed-in page counts',
        task: 'Students typed how many pages they read. Some typed words by mistake. Add up only the real numbers and count the skipped ones. Print <code>Pages read: 19</code> and <code>Skipped: 1</code>. Do not use <code>!!</code>.',
        starter: 'fun main() {\n    val typed = listOf("12", "abc", "7")\n    var pages = 0\n    var skipped = 0\n    // your code below\n\n}',
        hint1: '<code>"abc".toIntOrNull()</code> gives <code>null</code> instead of crashing.',
        hint2: 'In the loop: <code>val n = t.toIntOrNull()</code>, then <code>if (n == null) skipped++ else pages += n</code>.',
        solution: 'fun main() {\n    val typed = listOf("12", "abc", "7")\n    var pages = 0\n    var skipped = 0\n    for (t in typed) {\n        val n = t.toIntOrNull()\n        if (n == null) {\n            skipped++\n        } else {\n            pages += n\n        }\n    }\n    println("Pages read: $pages")\n    println("Skipped: $skipped")\n}',
        expected: 'Pages read: 19\nSkipped: 1'
    },
    {
        id: 'code-grade-function', tier: 3, type: 'code', title: 'Report card grades',
        task: 'Write <code>fun grade(mark: Int): String</code> using <code>when</code> with ranges: 90–100 is A, 75–89 is B, 50–74 is C, anything else is "Keep going". Print each mark and its grade for 95, 78, 60 and 40, like <code>95: A</code>.',
        starter: 'fun grade(mark: Int): String {\n    // your code here\n}\n\nfun main() {\n    val marks = listOf(95, 78, 60, 40)\n    // print each mark and its grade\n}',
        hint1: '<code>return when (mark) { in 90..100 -&gt; "A" … else -&gt; "Keep going" }</code>',
        hint2: 'In <code>main</code>: <code>for (m in marks) println("$m: ${grade(m)}")</code>',
        solution: 'fun grade(mark: Int): String {\n    return when (mark) {\n        in 90..100 -> "A"\n        in 75..89 -> "B"\n        in 50..74 -> "C"\n        else -> "Keep going"\n    }\n}\n\nfun main() {\n    val marks = listOf(95, 78, 60, 40)\n    for (m in marks) {\n        println("$m: ${grade(m)}")\n    }\n}',
        expected: '95: A\n78: B\n60: C\n40: Keep going'
    },
    {
        id: 'code-study-time', tier: 3, type: 'code', title: 'Study planner time',
        task: 'Add up the study minutes, then print the total as hours and minutes: <code>Planned: 2 h 15 min</code>.',
        starter: 'fun main() {\n    val minutes = listOf(45, 30, 60)\n    // your code below\n\n}',
        hint1: 'Add the list with a loop (or <code>minutes.sum()</code>). Then use <code>/ 60</code> for hours and <code>% 60</code> for the minutes left over.',
        hint2: '<code>val total = minutes.sum()</code>, then <code>println("Planned: ${total / 60} h ${total % 60} min")</code>',
        solution: 'fun main() {\n    val minutes = listOf(45, 30, 60)\n    val total = minutes.sum()\n    println("Planned: ${total / 60} h ${total % 60} min")\n}',
        expected: 'Planned: 2 h 15 min'
    }
];
