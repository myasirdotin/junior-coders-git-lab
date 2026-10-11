/**
 * Junior Coders - MySQL practice exercises (used by Learning MySQL/exercises.html)
 *
 * Every exercise runs against the school database in js/sql-lab.js. The expected result is
 * produced by running `solution` on that database at page load, so the answer key can never
 * drift from the data. `ordered: true` means row order matters (the task asks for ORDER BY).
 * Column names in the student's result must match the names the task asks for.
 *
 * Tiers follow the site rule: 1 = recall / warm-up, 2 = application, 3 = problem-solving.
 */
window.SQL_EXERCISES = [
    // ── Tier 1: SELECT, WHERE, ORDER BY, COUNT ──
    {
        id: 'select-all', tier: 1, title: 'Every student',
        task: 'Show <strong>all columns</strong> for every row in the <code>students</code> table.',
        starter: 'SELECT ',
        hint1: 'The star <code>*</code> means "all columns".',
        hint2: 'The pattern is <code>SELECT * FROM table_name;</code>',
        solution: 'SELECT * FROM students;'
    },
    {
        id: 'where-gpa', tier: 1, title: 'High achievers',
        task: 'List the <code>name</code> and <code>gpa</code> of students whose GPA is <strong>3.8 or higher</strong>.',
        starter: 'SELECT name, gpa\nFROM students\nWHERE ',
        hint1: '<code>WHERE</code> filters rows. Compare the <code>gpa</code> column with a number.',
        hint2: '"3.8 or higher" is <code>gpa &gt;= 3.8</code>.',
        solution: 'SELECT name, gpa FROM students WHERE gpa >= 3.8;'
    },
    {
        id: 'where-text', tier: 1, title: 'Ethics shelf',
        task: 'Show the <code>title</code> of every book in the <strong>Ethics</strong> category.',
        starter: 'SELECT title\nFROM books\nWHERE ',
        hint1: 'Text values go inside single quotes: <code>\'Ethics\'</code>.',
        hint2: '<code>WHERE category = \'Ethics\'</code>',
        solution: "SELECT title FROM books WHERE category = 'Ethics';"
    },
    {
        id: 'order-by', tier: 1, title: 'Top of the class', ordered: true,
        task: 'List every student\'s <code>name</code> and <code>gpa</code>, <strong>highest GPA first</strong>.',
        starter: 'SELECT name, gpa\nFROM students\n',
        hint1: '<code>ORDER BY</code> sorts the rows. The default is ascending (smallest first).',
        hint2: 'Add <code>DESC</code> after the column name to sort from highest to lowest.',
        solution: 'SELECT name, gpa FROM students ORDER BY gpa DESC;'
    },
    {
        id: 'count', tier: 1, title: 'Head count',
        task: 'How many students are there? Return one column named <code>total_students</code>.',
        starter: 'SELECT COUNT(*) AS total_students\nFROM ',
        hint1: '<code>COUNT(*)</code> counts rows. <code>AS</code> gives the result column a name.',
        hint2: 'Count the rows of the <code>students</code> table.',
        solution: 'SELECT COUNT(*) AS total_students FROM students;'
    },
    // ── Tier 2: combining clauses, GROUP BY, JOIN ──
    {
        id: 'where-order', tier: 2, title: 'Lahore, alphabetically', ordered: true,
        task: 'Show the <code>name</code> of every student from <strong>Lahore</strong>, in <strong>alphabetical order</strong>.',
        starter: 'SELECT name\nFROM students\n',
        hint1: 'You need both a <code>WHERE</code> and an <code>ORDER BY</code>. WHERE comes first.',
        hint2: '<code>WHERE city = \'Lahore\' ORDER BY name</code>',
        solution: "SELECT name FROM students WHERE city = 'Lahore' ORDER BY name;"
    },
    {
        id: 'group-sum', tier: 2, title: 'Charity drive totals',
        task: 'For each <code>cause</code>, show the total amount donated as <code>total</code>. (One row per cause.)',
        starter: 'SELECT cause, SUM(amount) AS total\nFROM donations\n',
        hint1: '<code>SUM(amount)</code> adds up the amounts; <code>GROUP BY cause</code> makes one row per cause.',
        hint2: 'The whole query: <code>SELECT cause, SUM(amount) AS total FROM donations GROUP BY cause;</code>',
        solution: 'SELECT cause, SUM(amount) AS total FROM donations GROUP BY cause;'
    },
    {
        id: 'join-loans', tier: 2, title: 'Who borrowed what',
        task: 'For every loan, show the student\'s <code>name</code> and the book\'s <code>title</code>. (Join <code>loans</code> to <code>students</code> and <code>books</code>.)',
        starter: 'SELECT students.name, books.title\nFROM loans\nJOIN students ON \nJOIN books ON ',
        hint1: '<code>loans.student_id</code> points at <code>students.id</code>; <code>loans.book_id</code> points at <code>books.id</code>.',
        hint2: '<code>JOIN students ON loans.student_id = students.id JOIN books ON loans.book_id = books.id</code>',
        solution: 'SELECT students.name, books.title FROM loans JOIN students ON loans.student_id = students.id JOIN books ON loans.book_id = books.id;'
    },
    {
        id: 'group-count-join', tier: 2, title: 'Busiest readers',
        task: 'For each student who has borrowed at least one book, show their <code>name</code> and the number of loans as <code>loans</code>.',
        starter: 'SELECT students.name, COUNT(*) AS loans\nFROM loans\nJOIN students ON loans.student_id = students.id\n',
        hint1: 'After the JOIN, group the rows by student.',
        hint2: '<code>GROUP BY students.name</code> (or by <code>students.id</code>).',
        solution: 'SELECT students.name, COUNT(*) AS loans FROM loans JOIN students ON loans.student_id = students.id GROUP BY students.id;'
    },
    {
        id: 'avg-per-class', tier: 2, title: 'Class averages',
        task: 'For each class, show the class <code>name</code> and its average GPA rounded to 2 decimals as <code>avg_gpa</code>.',
        starter: 'SELECT classes.name, ROUND(AVG(students.gpa), 2) AS avg_gpa\nFROM students\nJOIN classes ON \n',
        hint1: '<code>students.class_id</code> matches <code>classes.id</code>.',
        hint2: 'Finish with <code>GROUP BY classes.name</code>.',
        solution: 'SELECT classes.name, ROUND(AVG(students.gpa), 2) AS avg_gpa FROM students JOIN classes ON students.class_id = classes.id GROUP BY classes.id;'
    },
    // ── Tier 3: LEFT JOIN, subqueries, HAVING ──
    {
        id: 'left-join-null', tier: 3, title: 'Never borrowed',
        task: 'Show the <code>title</code> of every book that has <strong>never been loaned</strong>.',
        starter: 'SELECT books.title\nFROM books\nLEFT JOIN loans ON books.id = loans.book_id\nWHERE ',
        hint1: 'A <code>LEFT JOIN</code> keeps every book even when there is no matching loan; the loan columns are then <code>NULL</code>.',
        hint2: 'Filter for the missing match: <code>WHERE loans.id IS NULL</code>.',
        solution: 'SELECT books.title FROM books LEFT JOIN loans ON books.id = loans.book_id WHERE loans.id IS NULL;'
    },
    {
        id: 'subquery-avg', tier: 3, title: 'Above average',
        task: 'List the <code>name</code> and <code>gpa</code> of students whose GPA is <strong>above the average GPA</strong> of all students.',
        starter: 'SELECT name, gpa\nFROM students\nWHERE gpa > (',
        hint1: 'A query inside brackets can be used as a value: <code>(SELECT AVG(gpa) FROM students)</code>.',
        hint2: '<code>WHERE gpa &gt; (SELECT AVG(gpa) FROM students)</code>',
        solution: 'SELECT name, gpa FROM students WHERE gpa > (SELECT AVG(gpa) FROM students);'
    },
    {
        id: 'having', tier: 3, title: 'Big causes only',
        task: 'Show each <code>cause</code> and its total as <code>total</code>, but <strong>only causes that raised more than 8000</strong>.',
        starter: 'SELECT cause, SUM(amount) AS total\nFROM donations\nGROUP BY cause\n',
        hint1: '<code>WHERE</code> cannot filter on a SUM. Use <code>HAVING</code> after <code>GROUP BY</code>.',
        hint2: '<code>HAVING SUM(amount) &gt; 8000</code>',
        solution: 'SELECT cause, SUM(amount) AS total FROM donations GROUP BY cause HAVING SUM(amount) > 8000;'
    },
    {
        id: 'not-returned', tier: 3, title: 'Overdue list', ordered: true,
        task: 'Show the student <code>name</code>, book <code>title</code> and <code>loan_date</code> of every loan <strong>not yet returned</strong>, oldest loan first.',
        starter: 'SELECT students.name, books.title, loans.loan_date\nFROM loans\nJOIN students ON loans.student_id = students.id\nJOIN books ON loans.book_id = books.id\n',
        hint1: 'Loans that are still out have <code>returned = \'No\'</code>.',
        hint2: 'Finish with <code>WHERE loans.returned = \'No\' ORDER BY loans.loan_date</code>.',
        solution: "SELECT students.name, books.title, loans.loan_date FROM loans JOIN students ON loans.student_id = students.id JOIN books ON loans.book_id = books.id WHERE loans.returned = 'No' ORDER BY loans.loan_date;"
    }
];
