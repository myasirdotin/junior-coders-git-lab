/**
 * Junior Coders - PHP practice exercises (used by Learning PHP/exercises.html)
 *
 * Three kinds of task:
 *   predict : the student reads code and types what it prints (no engine needed)
 *   fill    : the student types the missing keyword/operator shown as ____ (no engine needed)
 *   code    : the student writes PHP; it runs in the browser (js/php-lab.js) and its output must
 *             match the solution's output. `expected` is the fallback shown if the engine cannot load.
 *
 * Tiers follow the site rule: 1 = recall / warm-up, 2 = application, 3 = problem-solving.
 * Scenarios: school library, grades, charity drive (see GEMINI.md §1).
 */
window.PHP_EXERCISES = [
    // ── Tier 1: read and predict (no engine needed) ──
    {
        id: 'predict-subtract', tier: 1, type: 'predict', title: 'Books on the shelf',
        task: 'What does this script print?',
        code: '<?php\n$books = 12;\n$returned = 5;\necho $books - $returned;',
        answer: '7',
        why: '<code>$books - $returned</code> is 12 − 5 = 7, and <code>echo</code> prints it.'
    },
    {
        id: 'fill-foreach', tier: 1, type: 'fill', title: 'Loop over names',
        task: 'Which keyword is missing?',
        code: '<?php\n$names = ["Zayd", "Maryam", "Bilal"];\nforeach ($names ____ $name) {\n    echo $name, " ";\n}',
        answers: ['as'],
        why: '<code>foreach ($array as $item)</code> is the pattern: <code>as</code> names each item in turn.'
    },
    {
        id: 'predict-interpolation', tier: 1, type: 'predict', title: 'Greeting a student',
        task: 'What does this script print? (Double quotes let PHP put the variable\'s value inside the text.)',
        code: '<?php\n$name = "Maryam";\necho "Assalamu alaikum, $name!";',
        answer: 'Assalamu alaikum, Maryam!',
        why: 'Inside double quotes, <code>$name</code> is replaced by its value. With single quotes it would print the literal <code>$name</code>.'
    },
    {
        id: 'fill-gte', tier: 1, type: 'fill', title: 'Honour roll',
        task: 'Students with a GPA of <strong>3.8 or higher</strong> make the honour roll. Which operator is missing?',
        code: '<?php\n$gpa = 3.85;\nif ($gpa ____ 3.8) {\n    echo "Honour roll";\n}',
        answers: ['>='],
        why: '"3.8 or higher" is <code>&gt;=</code>. A plain <code>&gt;</code> would leave out a student with exactly 3.8.'
    },
    {
        id: 'predict-for', tier: 1, type: 'predict', title: 'Doubling loop',
        task: 'What does this script print? (Write the numbers separated by single spaces.)',
        code: '<?php\nfor ($i = 1; $i <= 3; $i++) {\n    echo $i * 2, " ";\n}',
        answer: '2 4 6',
        why: 'The loop runs for $i = 1, 2, 3 and prints each value doubled.'
    },

    // ── Tier 2: write code (runs in the browser) ──
    {
        id: 'code-echo', tier: 2, type: 'code', title: 'Welcome message',
        task: 'Print <code>Welcome, Bilal!</code> using the variable (do not type the name again).',
        starter: '<?php\n$student = "Bilal";\n// your code below\n',
        hint1: 'Put the variable inside a double-quoted string, or join pieces with <code>.</code>',
        hint2: '<code>echo "Welcome, $student!";</code>',
        solution: '<?php\n$student = "Bilal";\necho "Welcome, $student!";',
        expected: 'Welcome, Bilal!'
    },
    {
        id: 'code-if', tier: 2, type: 'code', title: 'Library fine',
        task: 'A book is <code>$daysLate</code> days late and the fine is 5 rupees per day. Print <code>Fine: 15 rupees</code> for 3 days late, but <code>No fine</code> when <code>$daysLate</code> is 0. (Your code must work for any value.)',
        starter: '<?php\n$daysLate = 3;\n// your code below\n',
        hint1: 'Use <code>if ($daysLate &gt; 0) { ... } else { ... }</code>.',
        hint2: 'Multiply first: <code>$fine = $daysLate * 5;</code> then <code>echo "Fine: $fine rupees";</code>',
        solution: '<?php\n$daysLate = 3;\nif ($daysLate > 0) {\n    $fine = $daysLate * 5;\n    echo "Fine: $fine rupees";\n} else {\n    echo "No fine";\n}',
        expected: 'Fine: 15 rupees'
    },
    {
        id: 'code-for', tier: 2, type: 'code', title: 'Count to five',
        task: 'Use a <code>for</code> loop to print the numbers 1 to 5, <strong>each on its own line</strong>.',
        starter: '<?php\n// your code below\n',
        hint1: '<code>for ($i = 1; $i &lt;= 5; $i++) { ... }</code>',
        hint2: 'A new line is <code>"\\n"</code> inside double quotes: <code>echo $i, "\\n";</code>',
        solution: '<?php\nfor ($i = 1; $i <= 5; $i++) {\n    echo $i, "\\n";\n}',
        expected: '1\n2\n3\n4\n5'
    },
    {
        id: 'code-function', tier: 2, type: 'code', title: 'Square function',
        task: 'Write a function <code>square($n)</code> that returns n × n, then print <code>square(7)</code>.',
        starter: '<?php\n// define the function, then echo square(7)\n',
        hint1: '<code>function square($n) { return $n * $n; }</code>',
        hint2: 'After defining it: <code>echo square(7);</code>',
        solution: '<?php\nfunction square($n) {\n    return $n * $n;\n}\necho square(7);',
        expected: '49'
    },
    {
        id: 'code-sum', tier: 2, type: 'code', title: 'Charity total',
        task: 'Add up every amount in <code>$donations</code> with a <code>foreach</code> loop and print <code>Total: 9000</code>.',
        starter: '<?php\n$donations = [1500, 5000, 2500];\n$total = 0;\n// your loop below\n',
        hint1: 'Inside the loop add each amount: <code>$total = $total + $amount;</code> (or <code>$total += $amount;</code>)',
        hint2: 'After the loop: <code>echo "Total: $total";</code>',
        solution: '<?php\n$donations = [1500, 5000, 2500];\n$total = 0;\nforeach ($donations as $amount) {\n    $total += $amount;\n}\necho "Total: $total";',
        expected: 'Total: 9000'
    },

    // ── Tier 3: problem solving (runs in the browser) ──
    {
        id: 'code-assoc', tier: 3, type: 'code', title: 'Available books',
        task: 'Print the title of every book whose value is <code>"Yes"</code>, one per line, in the order given.',
        starter: '<?php\n$books = [\n    "Clean Code" => "Yes",\n    "Ethical Technology" => "No",\n    "Digital Stewardship" => "Yes",\n    "Python Data Science" => "No",\n];\n// your code below\n',
        hint1: 'An associative array gives you both key and value: <code>foreach ($books as $title =&gt; $available)</code>',
        hint2: 'Inside: <code>if ($available === "Yes") { echo $title, "\\n"; }</code>',
        solution: '<?php\n$books = [\n    "Clean Code" => "Yes",\n    "Ethical Technology" => "No",\n    "Digital Stewardship" => "Yes",\n    "Python Data Science" => "No",\n];\nforeach ($books as $title => $available) {\n    if ($available === "Yes") {\n        echo $title, "\\n";\n    }\n}',
        expected: 'Clean Code\nDigital Stewardship'
    },
    {
        id: 'code-average', tier: 3, type: 'code', title: 'Average marks',
        task: 'Write <code>average($marks)</code> that returns the average of an array of numbers. Then print <code>Average: 80</code> for the marks given. (<code>array_sum()</code> and <code>count()</code> help.)',
        starter: '<?php\n$marks = [80, 90, 70];\n// define average(), then echo "Average: " . average($marks)\n',
        hint1: '<code>return array_sum($marks) / count($marks);</code>',
        hint2: '<code>echo "Average: " . average($marks);</code> — 240 / 3 is 80.',
        solution: '<?php\n$marks = [80, 90, 70];\nfunction average($marks) {\n    return array_sum($marks) / count($marks);\n}\necho "Average: " . average($marks);',
        expected: 'Average: 80'
    },
    {
        id: 'code-strings', tier: 3, type: 'code', title: 'Tidy title',
        task: 'Print the title with each word capitalised, followed by its length in brackets: <code>Digital Stewardship (19 characters)</code>. Use <code>ucwords()</code> and <code>strlen()</code>.',
        starter: '<?php\n$title = "digital stewardship";\n// your code below\n',
        hint1: '<code>ucwords($title)</code> gives "Digital Stewardship"; <code>strlen($title)</code> gives 19.',
        hint2: '<code>echo ucwords($title) . " (" . strlen($title) . " characters)";</code>',
        solution: '<?php\n$title = "digital stewardship";\necho ucwords($title) . " (" . strlen($title) . " characters)";',
        expected: 'Digital Stewardship (19 characters)'
    },
    {
        id: 'code-grades', tier: 3, type: 'code', title: 'Grade letters',
        task: 'For each score print a letter on its own line: 90 or more → <code>A</code>, 60 or more → <code>B</code>, otherwise <code>F</code>.',
        starter: '<?php\n$scores = [95, 72, 48];\n// your code below\n',
        hint1: 'Loop with <code>foreach</code>; inside, use <code>if / elseif / else</code>.',
        hint2: 'Check the biggest threshold first: <code>if ($score &gt;= 90) ... elseif ($score &gt;= 60) ... else ...</code>',
        solution: '<?php\n$scores = [95, 72, 48];\nforeach ($scores as $score) {\n    if ($score >= 90) {\n        echo "A\\n";\n    } elseif ($score >= 60) {\n        echo "B\\n";\n    } else {\n        echo "F\\n";\n    }\n}',
        expected: 'A\nB\nF'
    },
    {
        id: 'code-class', tier: 3, type: 'code', title: 'A Book class',
        task: 'Write a class <code>Book</code> with properties <code>$title</code> and <code>$pages</code> set in the constructor, and a method <code>summary()</code> that returns <code>Clean Code has 464 pages.</code> Then create the book and echo its summary.',
        starter: '<?php\n// class Book { ... }\n\n$book = new Book("Clean Code", 464);\necho $book->summary();',
        hint1: 'Properties: <code>public $title; public $pages;</code> and <code>function __construct($title, $pages) { $this-&gt;title = $title; $this-&gt;pages = $pages; }</code>',
        hint2: '<code>function summary() { return "$this-&gt;title has $this-&gt;pages pages."; }</code>',
        solution: '<?php\nclass Book {\n    public $title;\n    public $pages;\n    function __construct($title, $pages) {\n        $this->title = $title;\n        $this->pages = $pages;\n    }\n    function summary() {\n        return "$this->title has $this->pages pages.";\n    }\n}\n\n$book = new Book("Clean Code", 464);\necho $book->summary();',
        expected: 'Clean Code has 464 pages.'
    }
];
