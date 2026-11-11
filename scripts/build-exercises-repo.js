#!/usr/bin/env node
/**
 * Junior Coders - builds the students' copy-and-practise repository and the teachers' answer page
 * from the same tasks the site's exercise pages use (js/data/html|css|js-practice.js), so they cannot drift.
 *
 *   node scripts/build-exercises-repo.js [output folder]     (default: ../junior-coders-exercises)
 *
 * Writes:
 *   <output>/README.md, LICENSE, .gitattributes, html|css|js/README.md and one numbered folder per task
 *       (starter files only: no solutions, no site tooling). That folder is its own git repository
 *       (github.com/myasirdotin/junior-coders-exercises, a template repository); commit and push it there.
 *   teacher-hub/exercise-answers.html in this site: every answer, with the reason.
 * The html/, css/ and js/ folders in the output are deleted and written again on every run.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SITE = path.resolve(__dirname, '..');
const OUT = path.resolve(process.argv[2] || path.join(SITE, '..', 'junior-coders-exercises'));
const LIVE = 'https://beicoders.vercel.app';
const REPO = 'https://github.com/myasirdotin/junior-coders-exercises';

const TRACKS = [
    { key: 'html', name: 'HTML', folder: 'Learning HTML' },
    { key: 'css', name: 'CSS', folder: 'Learning CSS' },
    { key: 'js', name: 'JavaScript', folder: 'Learning JS' },
];
const LEVEL = { 1: 'Warm-up', 2: 'Apply', 3: 'Challenge' };

// A little page for tasks whose code is CSS or JavaScript only, so there is something to look at.
const EXTRA_HTML = {
    'css:fill-text-align': '<h1>School Newsletter</h1>\n<p>News from every class, once a month.</p>',
    'css:fill-flex-wrap': '<div class="shelf">\n    <div class="book">Atlas of the World</div>\n    <div class="book">Poems for Young Readers</div>\n    <div class="book">The Garden Guide</div>\n    <div class="book">Stars and Planets</div>\n    <div class="book">First Science Experiments</div>\n    <div class="book">Stories of Kindness</div>\n</div>',
    'css:bug-semicolon': '<h1>Reading Week</h1>',
    'css:bug-media-brackets': '<nav class="menu">\n    <a href="#">Home</a>\n    <a href="#">Clubs</a>\n    <a href="#">Contact</a>\n</nav>',
    'js:bug-event-call': '<button id="helpBtn">Help</button>\n    <p id="tip"></p>',
};
const EXTRA_CSS = {
    'css:fill-flex-wrap': '.book {\n    width: 220px;\n    padding: 12px;\n    border: 1px solid gray;\n}',
};
// Steps that are ideas, not lines of code: asked as a written question.
const TEXT_ORDER = new Set(['css:order-box-model']);

// ── load the site's tasks ──
global.window = {};
TRACKS.forEach(t => require(path.join(SITE, 'js', 'data', t.key + '-practice.js')));
const PRACTICE = global.window.JC_PRACTICE;

// ── small helpers ──
const decode = (s) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
const toText = (html) => decode(String(html)
    .replace(/<li>/g, '\n  - ').replace(/<\/li>/g, '').replace(/<\/?ul>/g, '\n').replace(/<br\s*\/?>/g, '\n')
    .replace(/<[^>]+>/g, '')).replace(/[ \t]+\n/g, '\n').replace(/\n{2,}/g, '\n').trim();
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const two = (n) => String(n).padStart(2, '0');

function wrap(text, width) {
    return text.split('\n').map(line => {
        const indent = (line.match(/^\s*(- )?/) || [''])[0].replace(/-/, ' ');
        const out = [];
        let cur = '';
        line.split(' ').forEach(w => {
            if (cur && (cur + ' ' + w).length > width) { out.push(cur); cur = indent + w; }
            else cur = cur ? cur + ' ' + w : w;
        });
        out.push(cur);
        return out.join('\n');
    }).join('\n');
}

// Same fixed mixed order as the site (js/practice-cards.js), so the lines never start in the right order
function mixedOrder(steps) {
    const hash = (s) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
    const idx = steps.map((_, i) => i).sort((a, b) => hash(steps[a]) - hash(steps[b]));
    if (idx.every((v, i) => v === i)) idx.push(idx.shift());
    return idx;
}

function show(value) {
    return typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value);
}
// What each test line prints when the task is solved: found by running the solution, never typed by hand
function expectedValues(ex) {
    return ex.tests.map(t => show(vm.runInNewContext(ex.solution + '\n;(' + t.expr + ')', {}, { timeout: 2000 })));
}

// The task as the student reads it at the top of the file
function instructions(track, ex, n) {
    const lines = ['EXERCISE ' + n + ': ' + ex.title + '   (' + LEVEL[ex.tier] + ')', ''];
    let task = toText(ex.task).replace(/Tap that line\./, 'Find that line and fix it.')
        .replace(/Tap the line with the mistake\./, 'Find the line with the mistake and fix it.')
        .replace(/Type the missing (word|value)\./, 'Replace ____ with the missing $1.')
        .replace(/ Type it exactly as a visitor would see it\./, '').replace(/ Type the colour word\./, '');
    lines.push(task);
    if (ex.type === 'fill' && !/____/.test(task)) lines.push('Replace ____ in the code with your answer.');
    if (ex.type === 'predict') lines.push('', 'Write your guess on paper first. Then ' + (track.key === 'js' ? 'open index.html' : 'open this file in your browser') + ' to check it.');
    if (ex.type === 'order') lines.push('', 'The lines below are mixed up. Move them into the right order.');
    if (ex.hint1) lines.push('', 'Hint: ' + toText(ex.hint1));
    if (ex.chapter) lines.push('', 'Read first: ' + bookName(track, ex) + ' textbook, Chapter ' + ex.chapter, chapterUrl(track, ex));
    return wrap(lines.join('\n'), 76);
}
const bookKey = (track, ex) => ex.book || track.key;
const bookName = (track, ex) => (TRACKS.find(t => t.key === bookKey(track, ex)) || { name: bookKey(track, ex).toUpperCase() }).name;
const chapterUrl = (track, ex) => LIVE + '/book-' + bookKey(track, ex) + '/#ch' + ex.chapter;

const htmlComment = (text) => '<!--\n' + text.replace(/-->/g, '-- >').split('\n').map(l => l ? '  ' + l : '').join('\n') + '\n-->\n';
const jsComment = (text) => text.split('\n').map(l => l ? '// ' + l : '//').join('\n') + '\n';

// The code a task starts from (null: the task is a written question)
function starterCode(track, ex) {
    const id = track.key + ':' + ex.id;
    if (ex.type === 'web' || ex.type === 'js' || ex.type === 'code') return ex.starter;
    if (ex.type === 'predict' || ex.type === 'fill') return ex.code;
    if (ex.type === 'bug') return ex.lines.join('\n');
    if (ex.type === 'order') return TEXT_ORDER.has(id) ? null : mixedOrder(ex.steps).map(i => ex.steps[i]).join('\n');
    return null;
}

// CSS-track snippets become a page the browser can show: "<html>\n\n/* CSS */\n<css>" or CSS alone
function cssPage(id, code) {
    const parts = code.split('\n\n/* CSS */\n');
    const css = parts.length === 2 ? parts[1] : code;
    const body = parts.length === 2 ? parts[0] : EXTRA_HTML[id];
    if (!body) throw new Error('No page markup for ' + id + ': add it to EXTRA_HTML');
    const extra = EXTRA_CSS[id] ? '\n' + EXTRA_CSS[id] : '';
    return '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>CSS practice</title>\n<style>\n'
        + css + extra + '\n</style>\n</head>\n<body>\n' + body + '\n</body>\n</html>\n';
}

function jsRunnerPage(id, n, ex) {
    const extra = EXTRA_HTML[id] ? '\n    ' + EXTRA_HTML[id] + '\n' : '';
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(n + ' ' + ex.title)}</title>
</head>
<body>
    <h1>${esc(ex.title)}</h1>
    <p>Write your code in <strong>exercise.js</strong>, save it, then refresh this page.</p>
${extra}
    <h2>Output</h2>
    <pre id="output" style="white-space: pre-wrap;"></pre>

    <!-- This small script shows console.log on the page. You do not need to change it. -->
    <script>
        const output = document.getElementById("output");
        function showLine(text, isError) {
            const line = document.createElement("div");
            line.textContent = text;
            if (isError) line.style.color = "crimson";
            output.appendChild(line);
        }
        const realLog = console.log;
        console.log = function (...values) {
            realLog.apply(console, values);
            showLine(values.map(v => (typeof v === "object" && v !== null ? JSON.stringify(v) : String(v))).join(" "));
        };
        window.onerror = function (message, source, line) {
            showLine("Error" + (line ? " on line " + line : "") + ": " + message, true);
            showLine("Press F12 and open the Console to see more.", true);
        };
    </script>
    <script src="exercise.js"></script>
</body>
</html>
`;
}

// Files of one exercise: { name: content }
function exerciseFiles(track, ex, n) {
    const id = track.key + ':' + ex.id;
    const text = instructions(track, ex, n);
    const code = starterCode(track, ex);

    if (code === null) { // written question
        let q = text + '\n\n';
        if (ex.type === 'choice') q += ex.options.map((o, i) => '  ' + 'ABCD'[i] + ') ' + toText(o)).join('\n') + '\n\nYour answer (A, B, C or D): \n';
        else q += mixedOrder(ex.steps).map(i => '  - ' + ex.steps[i]).join('\n') + '\n\nYour order:\n  1. \n  2. \n  3. \n  4. \n';
        return { 'question.txt': q };
    }
    if (track.key === 'js') {
        let src = jsComment(text) + '\n' + code + '\n';
        if (ex.type === 'js') {
            const expected = expectedValues(ex);
            src += '\n// Try it: when your code is right, each line prints the value shown.\n'
                + ex.tests.map((t, i) => 'console.log(' + t.expr + ');   // should print: ' + expected[i]).join('\n') + '\n';
        }
        return { 'exercise.js': src, 'index.html': jsRunnerPage(id, n, ex) };
    }
    const page = track.key === 'css' && ex.type !== 'web' ? cssPage(id, code) : code + '\n';
    return { 'index.html': htmlComment(text) + page };
}

// ── answers for the teacher page ──
function answerHtml(track, ex) {
    const pre = (s) => '<pre class="xa-code"><code>' + esc(s) + '</code></pre>';
    if (ex.type === 'fill') return '<p>Missing part: <code>' + esc(ex.answers[0]) + '</code></p>' + pre(ex.code.replace('____', ex.answers[0]));
    if (ex.type === 'choice') return '<p>' + 'ABCD'[ex.answer] + ') ' + ex.options[ex.answer] + '</p>';
    if (ex.type === 'predict') return pre(ex.answers[0]);
    if (ex.type === 'bug') return '<p>Line ' + ([].concat(ex.bad)[0] + 1) + ' should be:</p>' + pre(ex.fix);
    if (ex.type === 'order') return pre(ex.steps.join('\n'));
    return pre(ex.solution);
}

function answersPage(all) {
    const sections = all.map(({ track, list }) => `
        <section class="content-section" id="${track.key}">
            <h2>${track.name}</h2>
${list.map(({ ex, n, dir }) => `            <article class="xa-item">
                <h3>${n}. ${esc(ex.title)} <span class="xa-level">${LEVEL[ex.tier]}</span></h3>
                <p class="xa-task">${ex.task}</p>
                ${answerHtml(track, ex)}
                <p class="xa-why"><strong>Why:</strong> ${ex.why}</p>
                <p class="xa-links"><a href="${REPO}/tree/main/${track.key}/${dir}">Student files</a>${ex.chapter ? ' · <a href="../book-' + bookKey(track, ex) + '/index.html#ch' + ex.chapter + '">Chapter ' + ex.chapter + '</a>' : ''}</p>
            </article>`).join('\n')}
        </section>`).join('\n');
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exercise Answers for Teachers: HTML, CSS, JavaScript | Junior Coders</title>
    <meta name="description" content="Answers and reasons for the HTML, CSS and JavaScript practice files that students copy from GitHub. For teachers.">
    <meta name="robots" content="noindex">
    <link rel="stylesheet" href="../styles/main.css">
    <link rel="stylesheet" href="../styles/bei-core.css">
    <style>
        .xa-item { border-top: 1px solid var(--border-subtle); padding: 1rem 0; min-width: 0; }
        .xa-item h3 { font-size: 1.05rem; margin: 0 0 0.4rem; }
        .xa-level { font-size: 0.75rem; font-weight: 600; color: var(--text-secondary); margin-left: 0.4rem; }
        .xa-task, .xa-why, .xa-links { font-size: 0.92rem; line-height: 1.55; margin: 0.4rem 0; }
        .xa-task ul { margin: 0.3rem 0 0 1.2rem; }
        .xa-code { background: #0f172a; color: #e2e8f0; padding: 0.75rem 0.9rem; border-radius: var(--radius-md); overflow-x: auto; font-size: 0.85rem; line-height: 1.5; margin: 0.5rem 0; font-variant-ligatures: none; }
        .xa-links a, .xa-jump a { color: var(--brand-cyan); font-weight: 600; }
        .xa-jump { font-size: 0.95rem; }
    </style>
</head>
<body>
    <!-- Generated by scripts/build-exercises-repo.js from js/data/*-practice.js. Do not edit by hand. -->
    <main class="module-container">
        <header class="module-header">
            <span class="badge">For teachers</span>
            <h1>Exercise Answers</h1>
            <p>Answers for the practice files students copy from GitHub. The student copy has no answers in it.</p>
        </header>

        <section class="content-section">
            <p>Students get the files from <a href="${REPO}">junior-coders-exercises on GitHub</a>
                (Code, then Download ZIP; no account needed). The same tasks check themselves on the site's
                exercise pages, where the answers are also in the page code, so treat this page as a marking aid, not a secret.</p>
            <p class="xa-jump">Jump to: ${all.map(({ track }) => '<a href="#' + track.key + '">' + track.name + '</a>').join(' · ')}</p>
        </section>
${sections}
    </main>

    <script src="../js/bei-nav.js"></script>
</body>
</html>
`;
}

// ── READMEs ──
function trackReadme(track, list) {
    return `# ${track.name} exercises

${list.length} exercises, easiest first. Open a folder, read the task at the top of the file, and start typing.

| No. | Exercise | Level | Read first |
|---|---|---|---|
${list.map(({ ex, n, dir }) => `| ${n} | [${ex.title}](${dir}/) | ${LEVEL[ex.tier]} | ${ex.chapter ? '[' + bookName(track, ex) + ' Chapter ' + ex.chapter + '](' + chapterUrl(track, ex) + ')' : ''} |`).join('\n')}

The same exercises check themselves on the site: [${track.name} exercises on Junior Coders](${LIVE}/${encodeURIComponent(track.folder)}/exercises).

[Back to all exercises](../README.md)
`;
}

function rootReadme(all) {
    const total = all.reduce((s, a) => s + a.list.length, 0);
    return `# Junior Coders Exercises

Practice files for **HTML, CSS and JavaScript**, for students of Classes 6 to 8.
Copy them to your own computer, type your answers, and see the result in your browser.

They go with the lessons and textbooks at [Junior Coders](${LIVE}).

| Subject | Exercises |
|---|---|
${all.map(({ track, list }) => `| [${track.name}](${track.key}/) | ${list.length} |`).join('\n')}

## Get your own copy

**Without a GitHub account (easiest):**

1. Press the green **Code** button at the top of this page.
2. Choose **Download ZIP**.
3. Open the ZIP file and copy the folder inside to your Documents.

**With a GitHub account** (you must be 13 or older; ask your teacher or a parent first):
press **Use this template**, then **Create a new repository**. You get your own copy that you can save your work to.

## How to do an exercise

1. Open a subject folder (\`html\`, \`css\` or \`js\`), then an exercise folder. Start with \`01\`.
2. Open the file in a code editor such as VS Code (Notepad also works).
   - HTML and CSS: the file is \`index.html\`.
   - JavaScript: write in \`exercise.js\`.
   - A few exercises are a question in \`question.txt\`.
3. Read the task at the top of the file.
4. Type your answer and save the file.
5. Double-click \`index.html\` to open it in your browser. After each change, save and refresh the page.

JavaScript exercises show what your program prints on the page, under **Output**.

## Three levels

- **Warm-up:** read, predict, fill in one word.
- **Apply:** fix or finish a small piece of code.
- **Challenge:** build something small on your own.

## Stuck?

- Read the hint in the file, then the textbook chapter named under it.
- Try the same exercise on the site, where it checks your answer:
${all.map(({ track }) => `  [${track.name}](${LIVE}/${encodeURIComponent(track.folder)}/exercises)`).join(' · ')}
- Ask your teacher. Teachers have the answers; this copy does not, so that you can think for yourself.

## For teachers

All ${total} tasks are the ones on the Junior Coders exercise pages. Answers with reasons are in the Teacher Hub:
[Exercise Answers](${LIVE}/teacher-hub/exercise-answers).

## Licence

MIT. Free to use and share in your school.
`;
}

// ── write everything ──
function write(file, content) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content.replace(/\r\n/g, '\n'));
}

const all = TRACKS.map(track => {
    fs.rmSync(path.join(OUT, track.key), { recursive: true, force: true });
    const list = PRACTICE[track.key].map((ex, i) => {
        const n = two(i + 1);
        const dir = n + '-' + slug(ex.title);
        const files = exerciseFiles(track, ex, n);
        Object.keys(files).forEach(name => write(path.join(OUT, track.key, dir, name), files[name]));
        return { ex, n, dir };
    });
    write(path.join(OUT, track.key, 'README.md'), trackReadme(track, list));
    return { track, list };
});
write(path.join(OUT, 'README.md'), rootReadme(all));
write(path.join(OUT, 'LICENSE'), fs.readFileSync(path.join(SITE, 'LICENSE'), 'utf8'));
write(path.join(OUT, '.gitattributes'), '* text=auto eol=lf\n');
write(path.join(SITE, 'teacher-hub', 'exercise-answers.html'), answersPage(all));

console.log(all.map(a => a.track.name + ': ' + a.list.length).join(', ') + ' exercises written to ' + OUT);
console.log('Teacher answers: teacher-hub/exercise-answers.html');
