/**
 * Junior Coders - JavaScript practice (Learning JS/exercises.html), run by js/practice-cards.js.
 * Format: see the header of js/practice-cards.js. `js` tasks really run (in a Web Worker) and are compared with the
 * solution; `predict` tasks with lang 'js' are run by the self-test. After any edit: node scripts/check-practice.js
 * Lessons: 1 Variables (ch3–4), 2 Operators (ch5), 3 Conditionals (ch6–7), 4 Functions (ch10), 5 Arrays (ch11–12),
 * 6 Loops (ch8–9), 7 DOM (ch16), 8 Objects (ch14), 9 Events (ch17). Scenarios follow GEMINI §1.
 */
(window.JC_PRACTICE = window.JC_PRACTICE || {}).js = [
    // ── Tier 1: warm-up ──
    {
        id: 'predict-let', tier: 1, type: 'predict', lang: 'js', title: 'Books on the trolley', module: 1, chapter: 3,
        task: 'What does this program print in the console?',
        code: 'let books = 12;\nbooks = books - 5;\nconsole.log(books);',
        answers: ['7'],
        why: '<code>books</code> starts at 12. The second line takes 5 away and stores the new value, 7, back in the same box.'
    },
    {
        id: 'predict-concat', tier: 1, type: 'predict', lang: 'js', title: 'Text plus a number', module: 2, chapter: 5,
        task: 'What does this print? Careful: one value is text.',
        code: 'let room = "Lab ";\nlet number = 4;\nconsole.log(room + number);\nconsole.log("2" + 2);',
        answers: ['Lab 4\n22'],
        why: 'When one side of <code>+</code> is a string, JavaScript joins text instead of adding. <code>"2" + 2</code> is the text <code>"22"</code>, not 4.'
    },
    {
        id: 'fill-const', tier: 1, type: 'fill', title: 'A value that never changes', module: 1, chapter: 3,
        task: 'The number of days in a week never changes. Which keyword makes a variable that cannot be given a new value?',
        code: '____ daysInWeek = 7;',
        answers: ['const'],
        why: 'Use <code>const</code> for values that stay the same and <code>let</code> for values you will change.'
    },
    {
        id: 'fill-strict-equal', tier: 1, type: 'fill', title: 'Is the answer right?', module: 3, chapter: 6,
        task: 'Which operator checks that two values are equal <strong>and</strong> of the same type?',
        code: 'let answer = 42;\nif (answer ____ 42) {\n    console.log("Correct!");\n}',
        answers: ['==='],
        why: '<code>===</code> is strict equality: <code>42 === "42"</code> is <code>false</code>. Prefer it over <code>==</code>, which converts types first.'
    },
    {
        id: 'choice-typeof', tier: 1, type: 'choice', title: 'What type is it?', module: 1, chapter: 4,
        task: 'What does <code>typeof "15"</code> give?',
        options: ['<code>"number"</code>', '<code>"string"</code>', '<code>"boolean"</code>', '<code>"undefined"</code>'],
        answer: 1,
        why: 'Anything in quotes is a string, even if it looks like a number. <code>typeof 15</code> (no quotes) is <code>"number"</code>.'
    },
    {
        id: 'predict-array-length', tier: 1, type: 'predict', lang: 'js', title: 'The reading list', module: 5, chapter: 11,
        task: 'What does this print? (Two lines.)',
        code: 'let reading = ["Atlas", "Poems", "Garden Guide"];\nconsole.log(reading.length);\nconsole.log(reading[0]);',
        answers: ['3\nAtlas'],
        why: '<code>length</code> counts the items: 3. Positions start at 0, so <code>reading[0]</code> is the first item.'
    },

    // ── Tier 2: apply ──
    {
        id: 'bug-off-by-one', tier: 2, type: 'bug', title: 'One name too many', module: 6, chapter: 8,
        task: 'This loop should print each name once, but it prints <code>undefined</code> at the end. Tap the line with the mistake.',
        lines: [
            'let names = ["Zayd", "Maryam", "Bilal"];',
            'for (let i = 0; i <= names.length; i++) {',
            '    console.log(names[i]);',
            '}'
        ],
        bad: 1,
        fix: 'for (let i = 0; i < names.length; i++) {',
        why: 'The last position is <code>length - 1</code> (here 2). <code>&lt;=</code> also runs for <code>i = 3</code>, where there is no item, so it prints <code>undefined</code>.'
    },
    {
        id: 'bug-missing-return', tier: 2, type: 'bug', title: 'The function gives nothing back', module: 4, chapter: 10,
        task: '<code>double(5)</code> should give 10, but <code>console.log(double(5))</code> prints <code>undefined</code>. Tap the line with the mistake.',
        lines: [
            'function double(n) {',
            '    n * 2;',
            '}',
            'console.log(double(5));'
        ],
        bad: 1,
        fix: '    return n * 2;',
        why: 'A function only hands a value back with <code>return</code>. Without it, the result is worked out and thrown away, and the call gives <code>undefined</code>.'
    },
    {
        id: 'order-function', tier: 2, type: 'order', title: 'Make and use a function', module: 4, chapter: 10,
        task: 'Put these lines in order to make a function that greets a student, then use it.',
        steps: [
            'function greet(name) {',
            '    return "Assalamu alaikum, " + name + "!";',
            '}',
            'let message = greet("Fatima");',
            'console.log(message);'
        ],
        why: 'The function is defined first (its opening line, its body, its closing brace). Then it is called and the result is stored, and only then printed.'
    },
    {
        id: 'js-area', tier: 2, type: 'js', title: 'Area of the garden bed', module: 4, chapter: 10,
        task: 'Write a function <code>area(length, width)</code> that returns the area of a rectangular school garden bed.',
        starter: 'function area(length, width) {\n    // return length times width\n}',
        solution: 'function area(length, width) {\n    return length * width;\n}',
        tests: [{ expr: 'area(4, 3)' }, { expr: 'area(10, 2)' }, { expr: 'area(0, 5)' }],
        hint1: 'Multiply with <code>*</code>.',
        hint2: 'Remember <code>return</code>, so the caller gets the number back.',
        why: 'A function with parameters works for any garden bed: the same code gives 12, 20 and 0.'
    },
    {
        id: 'js-passed', tier: 2, type: 'js', title: 'Pass or try again', module: 3, chapter: 6,
        task: 'Write <code>result(score)</code>: return <code>"Pass"</code> for a score of 50 or more, otherwise <code>"Try again"</code>.',
        starter: 'function result(score) {\n    \n}',
        solution: 'function result(score) {\n    if (score >= 50) {\n        return "Pass";\n    }\n    return "Try again";\n}',
        tests: [{ expr: 'result(75)' }, { expr: 'result(50)' }, { expr: 'result(49)' }],
        hint1: 'Use <code>if (score &gt;= 50)</code>.',
        hint2: '50 itself must pass, so the operator is <code>&gt;=</code>, not <code>&gt;</code>.',
        why: 'Testing the edge (exactly 50) is how programmers catch the <code>&gt;</code> versus <code>&gt;=</code> mistake.'
    },
    {
        id: 'js-total-donations', tier: 2, type: 'js', title: 'Charity drive total', module: 6, chapter: 8,
        task: 'Write <code>total(amounts)</code> that adds up an array of donations with a loop and returns the sum.',
        starter: 'function total(amounts) {\n    let sum = 0;\n    // add each amount to sum\n    return sum;\n}',
        solution: 'function total(amounts) {\n    let sum = 0;\n    for (let i = 0; i < amounts.length; i++) {\n        sum = sum + amounts[i];\n    }\n    return sum;\n}',
        tests: [{ expr: 'total([10, 25, 5])' }, { expr: 'total([100])' }, { expr: 'total([])' }],
        hint1: 'Loop with <code>for (let i = 0; i &lt; amounts.length; i++)</code>.',
        hint2: 'Inside the loop: <code>sum = sum + amounts[i];</code>',
        why: 'Start at 0 and add each item: the same pattern totals donations, marks or minutes read. An empty list correctly gives 0.'
    },

    // ── Tier 3: challenge ──
    {
        id: 'js-count-over', tier: 3, type: 'js', title: 'Books read this term', module: 6, chapter: 9,
        task: 'Write <code>countAtLeast(list, target)</code> that returns how many numbers in <code>list</code> are at least <code>target</code>. (For example: how many students read at least 5 books.)',
        starter: 'function countAtLeast(list, target) {\n    \n}',
        solution: 'function countAtLeast(list, target) {\n    let count = 0;\n    for (let i = 0; i < list.length; i++) {\n        if (list[i] >= target) {\n            count++;\n        }\n    }\n    return count;\n}',
        tests: [{ expr: 'countAtLeast([3, 7, 5, 1], 5)' }, { expr: 'countAtLeast([2, 2, 2], 3)' }, { expr: 'countAtLeast([], 1)' }, { expr: 'countAtLeast([9, 10], 9)' }],
        hint1: 'Keep a counter that starts at 0. Loop over the list.',
        hint2: 'Inside the loop, <code>if (list[i] &gt;= target) count++;</code> then return the counter after the loop.',
        why: 'A loop with an <code>if</code> inside is the counting pattern: it answers "how many …?" questions about any list.'
    },
    {
        id: 'js-book-summary', tier: 3, type: 'js', title: 'A library book card', module: 8, chapter: 14,
        task: 'Write <code>describe(book)</code>. It gets an object like <code>{ title: "Atlas", copies: 2 }</code> and returns <code>"Atlas: 2 on the shelf"</code>, or <code>"Atlas: all on loan"</code> when <code>copies</code> is 0.',
        starter: 'function describe(book) {\n    \n}',
        solution: 'function describe(book) {\n    if (book.copies === 0) {\n        return book.title + ": all on loan";\n    }\n    return book.title + ": " + book.copies + " on the shelf";\n}',
        tests: [
            { expr: 'describe({ title: "Atlas", copies: 2 })' },
            { expr: 'describe({ title: "Poems", copies: 0 })' },
            { expr: 'describe({ title: "Garden Guide", copies: 1 })' }
        ],
        hint1: 'Read a property with a dot: <code>book.title</code>, <code>book.copies</code>.',
        hint2: 'Check for 0 first with <code>if (book.copies === 0)</code>; otherwise join the text with <code>+</code>.',
        why: 'Objects keep related facts together. The function reads two properties and builds a clear sentence for the library screen.'
    },
    {
        id: 'js-longest-name', tier: 3, type: 'js', title: 'The longest name', module: 5, chapter: 12,
        task: 'Write <code>longest(names)</code> that returns the longest name in an array. If two are equally long, return the first one.',
        starter: 'function longest(names) {\n    \n}',
        solution: 'function longest(names) {\n    let best = names[0];\n    for (let i = 1; i < names.length; i++) {\n        if (names[i].length > best.length) {\n            best = names[i];\n        }\n    }\n    return best;\n}',
        tests: [{ expr: 'longest(["Zayd", "Maryam", "Bilal"])' }, { expr: 'longest(["Ali", "Sara", "Omar"])' }, { expr: 'longest(["Khadeejah"])' }],
        hint1: 'Remember the best so far, starting with <code>names[0]</code>.',
        hint2: 'Only replace it when a name is <strong>longer</strong> (<code>&gt;</code>, not <code>&gt;=</code>), so the first of two equal names wins.',
        why: 'Keeping "the best so far" is how you find a maximum. Using <code>&gt;</code> instead of <code>&gt;=</code> decides which one wins a tie.'
    },
    {
        id: 'bug-event-call', tier: 3, type: 'bug', title: 'The button runs too early', module: 9, chapter: 17,
        task: 'The message should appear when the button is clicked, but it appears as soon as the page loads, and clicking does nothing. Tap the line with the mistake.',
        lines: [
            'const button = document.querySelector("#helpBtn");',
            'function showHelp() {',
            '    document.querySelector("#tip").textContent = "Read the task again, slowly.";',
            '}',
            'button.addEventListener("click", showHelp());'
        ],
        bad: 4,
        fix: 'button.addEventListener("click", showHelp);',
        why: '<code>showHelp()</code> with brackets runs the function at once and passes its result (<code>undefined</code>). Pass the function itself, <code>showHelp</code>, so the browser can run it on each click.'
    }
];
