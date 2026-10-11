/**
 * Junior Coders - SQL Lab engine (shared by the SQL Sandbox studio and the MySQL exercises)
 *
 * Runs real SQL in the browser with sql.js (SQLite compiled to WebAssembly, loaded once from
 * cdnjs and cached). Every page gets the same small school database, rebuilt fresh on load,
 * so students can INSERT/UPDATE/DELETE freely and simply reload to start again.
 *
 *   SQLLab.ready().then(() => { const r = SQLLab.run('SELECT * FROM students'); ... })
 *   r = { columns: [...], values: [[...], ...] }   // throws an Error with SQLite's message on bad SQL
 */
(function () {
    'use strict';
    if (window.SQLLab) return;

    const SQLJS_BASE = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/';

    const SCHEMA = [
        { table: 'classes',   icon: '🏫', columns: 'id INT, name TEXT, teacher TEXT' },
        { table: 'students',  icon: '🎓', columns: 'id INT, name TEXT, grade INT, gpa REAL, class_id INT, city TEXT' },
        { table: 'books',     icon: '📖', columns: 'id INT, title TEXT, category TEXT, pages INT, available TEXT' },
        { table: 'loans',     icon: '🔗', columns: 'id INT, student_id INT, book_id INT, loan_date TEXT, returned TEXT' },
        { table: 'donations', icon: '🤲', columns: 'id INT, donor TEXT, amount INT, cause TEXT, donated_on TEXT' }
    ];

    const SEED = `
CREATE TABLE classes (id INTEGER PRIMARY KEY, name TEXT NOT NULL, teacher TEXT NOT NULL);
INSERT INTO classes VALUES
 (1, 'Grade 7 Falcons', 'Ms. Hafsa'),
 (2, 'Grade 8 Eagles',  'Mr. Imran'),
 (3, 'Grade 9 Hawks',   'Ms. Noor');

CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT NOT NULL, grade INTEGER, gpa REAL, class_id INTEGER, city TEXT);
INSERT INTO students VALUES
 (1, 'Zayd',    8, 3.90, 2, 'Lahore'),
 (2, 'Maryam',  7, 3.75, 1, 'Karachi'),
 (3, 'Bilal',   9, 3.95, 3, 'Lahore'),
 (4, 'Fatima',  8, 3.85, 2, 'Islamabad'),
 (5, 'Tariq',   9, 3.60, 3, 'Karachi'),
 (6, 'Aisha',   7, 3.40, 1, 'Lahore'),
 (7, 'Hamza',   8, 3.20, 2, 'Peshawar'),
 (8, 'Khadija', 9, 3.70, 3, 'Islamabad');

CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL, category TEXT, pages INTEGER, available TEXT);
INSERT INTO books VALUES
 (1, 'Clean Code',                 'Programming',      464, 'Yes'),
 (2, 'Algorithm Design',           'Computer Science', 320, 'Yes'),
 (3, 'Ethical Technology',         'Ethics',           210, 'No'),
 (4, 'HTML & CSS Architecture',    'Web',              288, 'Yes'),
 (5, 'Python Data Science',        'Data',             352, 'No'),
 (6, 'Digital Stewardship',        'Ethics',           180, 'Yes'),
 (7, 'Introduction to Networks',   'Computer Science', 240, 'Yes'),
 (8, 'Arabic Calligraphy Basics',  'Art',              120, 'Yes');

CREATE TABLE loans (id INTEGER PRIMARY KEY, student_id INTEGER, book_id INTEGER, loan_date TEXT, returned TEXT);
INSERT INTO loans VALUES
 (1,  1, 1, '2026-09-02', 'Yes'),
 (2,  1, 2, '2026-09-20', 'No'),
 (3,  2, 4, '2026-09-05', 'Yes'),
 (4,  3, 2, '2026-09-08', 'Yes'),
 (5,  3, 7, '2026-09-25', 'No'),
 (6,  4, 6, '2026-09-10', 'Yes'),
 (7,  5, 3, '2026-09-12', 'No'),
 (8,  6, 1, '2026-09-28', 'No'),
 (9,  8, 5, '2026-09-15', 'Yes'),
 (10, 8, 6, '2026-10-01', 'No');

CREATE TABLE donations (id INTEGER PRIMARY KEY, donor TEXT NOT NULL, amount INTEGER NOT NULL, cause TEXT NOT NULL, donated_on TEXT);
INSERT INTO donations VALUES
 (1, 'Ahmad',   1500, 'Books',       '2026-09-01'),
 (2, 'Sara',    5000, 'Clean Water', '2026-09-03'),
 (3, 'Ibrahim', 2500, 'Food Pantry', '2026-09-07'),
 (4, 'Hafsa',   3000, 'Books',       '2026-09-12'),
 (5, 'Yusuf',   8000, 'Clean Water', '2026-09-18'),
 (6, 'Zainab',  4500, 'Food Pantry', '2026-09-21'),
 (7, 'Omar',    1000, 'Books',       '2026-09-26'),
 (8, 'Layla',   2000, 'Clean Water', '2026-10-02');
`;

    let db = null;
    let readyPromise = null;

    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = src; s.async = true;
            s.onload = resolve;
            s.onerror = () => reject(new Error('Could not load the SQL engine (' + src + '). Check your internet connection and reload.'));
            document.head.appendChild(s);
        });
    }

    function ready() {
        if (readyPromise) return readyPromise;
        readyPromise = (window.initSqlJs ? Promise.resolve() : loadScript(SQLJS_BASE + 'sql-wasm.js'))
            .then(() => window.initSqlJs({ locateFile: (f) => SQLJS_BASE + f }))
            .then((SQL) => { db = new SQL.Database(); db.run(SEED); return db; });
        return readyPromise;
    }

    /** Runs one statement (or several; the last result set is returned). Throws on SQL errors. */
    function run(sql) {
        if (!db) throw new Error('The SQL engine is still loading. Try again in a moment.');
        const results = db.exec(sql);
        if (!results.length) return { columns: [], values: [] };
        const last = results[results.length - 1];
        return { columns: last.columns, values: last.values };
    }

    /** Rebuilds the school database from the seed (undoes any INSERT/UPDATE/DELETE). */
    function reset() {
        if (!db) return;
        SCHEMA.forEach(t => db.run('DROP TABLE IF EXISTS ' + t.table));
        db.run(SEED);
    }

    function rowCount(table) {
        try { return run('SELECT COUNT(*) FROM ' + table).values[0][0]; } catch (e) { return 0; }
    }

    /** Renders a result set as an HTML table string (values escaped). */
    function toTable(result, className) {
        const esc = (v) => String(v === null ? 'NULL' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;');
        if (!result.columns.length) return '<div class="sql-empty">The statement ran, but returned no rows.</div>';
        return '<table class="' + (className || 'result-table') + '"><thead><tr>' +
            result.columns.map(c => '<th>' + esc(c) + '</th>').join('') + '</tr></thead><tbody>' +
            result.values.map(r => '<tr>' + r.map(v => '<td' + (v === null ? ' class="sql-null"' : '') + '>' + esc(v) + '</td>').join('') + '</tr>').join('') +
            '</tbody></table>';
    }

    window.SQLLab = { ready, run, reset, rowCount, toTable, SCHEMA };
})();
