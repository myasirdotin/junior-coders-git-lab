/**
 * Junior Coders - HTML practice (Learning HTML/exercises.html), run by js/practice-cards.js.
 * Format: see the header of js/practice-cards.js. `web` tasks are rendered in a sandboxed frame (no scripts run) and
 * checked with checks[].test(doc, win); the self-test makes sure every solution passes and every starter fails.
 * After any edit: node scripts/check-practice.js
 * Lessons (page order, see Learning HTML/GEMINI.md §2) and textbook chapters:
 *   1 Page anatomy (ch1–3), 2 Tags & attributes (ch4), 3 Headings & paragraphs (ch5), 4 Text formatting (ch6),
 *   5 Links (ch8), 6 Images (ch9), 7 Tables (ch11), 8 Lists (ch10), 9 Block vs inline (ch13), 10 Classes & IDs (ch13),
 *   11 Forms (ch12), 12 Semantic layout (ch13; projects ch14–18). Special characters & comments: ch7 (no lesson).
 * No CSS or JavaScript is asked for: students meet those in later tracks. Scenarios follow GEMINI §1.
 */
(function () {
    'use strict';
    // A full page with the boilerplate from Module 1, so every web task starts from a correct skeleton
    const page = (title, body) => '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n' +
        '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>' + title + '</title>\n' +
        '</head>\n<body>\n' + body + '\n</body>\n</html>';
    // The visible words of an element, lower case, spaces tidied
    const txt = (el) => (el ? el.textContent.replace(/\s+/g, ' ').trim().toLowerCase() : '');
    // Alt text that really describes: at least three words and not just "photo" or the file name
    const goodAlt = (img) => {
        const alt = img ? (img.getAttribute('alt') || '').trim().toLowerCase() : '';
        return alt.split(/\s+/).length >= 3 && !/^(image|photo|picture|img)\b/.test(alt) && !/\.(jpg|png|gif|webp)$/.test(alt);
    };
    // Headings in page order: the first is <h1> and no level is skipped on the way down
    const headingsInOrder = (doc) => {
        const levels = [...doc.querySelectorAll('h1, h2, h3, h4, h5, h6')].map(h => +h.tagName[1]);
        return levels.length > 0 && levels[0] === 1 && levels.every((l, i) => i === 0 || l <= levels[i - 1] + 1);
    };
    // Every box a visitor types into or chooses from has a <label for="its id">
    const allLabelled = (doc) => [...doc.querySelectorAll('input, select, textarea')]
        .filter(e => !['submit', 'button', 'reset', 'hidden'].includes(e.type))
        .every(e => e.id && doc.querySelector('label[for="' + e.id + '"]'));

    (window.JC_PRACTICE = window.JC_PRACTICE || {}).html = [
        // ── Tier 1: warm-up ──
        {
            id: 'fill-doctype', tier: 1, type: 'fill', title: 'The very first line', module: 1, chapter: 3,
            task: 'Every web page starts with one line that tells the browser "this is a modern HTML page". Type the missing word.',
            code: '<!____ html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <title>Crescent School</title>\n</head>',
            answers: ['DOCTYPE'],
            why: '<code>&lt;!DOCTYPE html&gt;</code> is not a tag that shows anything. It tells the browser to use the newest HTML rules. It always comes first, before <code>&lt;html&gt;</code>.'
        },
        {
            id: 'choice-body', tier: 1, type: 'choice', title: 'Where does the welcome go?', module: 1, chapter: 3,
            task: 'Yusuf typed his welcome message inside <code>&lt;head&gt;</code>, and it does not appear on the page. Where should text that visitors read go?',
            options: ['Inside <code>&lt;title&gt;</code>', 'Inside <code>&lt;head&gt;</code>, after the <code>&lt;meta&gt;</code> tag', 'Inside <code>&lt;body&gt;</code>', 'Before <code>&lt;!DOCTYPE html&gt;</code>'],
            answer: 2,
            why: '<code>&lt;head&gt;</code> holds information <em>about</em> the page (its title, its character set). Everything people see on the page goes in <code>&lt;body&gt;</code>. The title only shows on the browser tab.'
        },
        {
            id: 'predict-entities', tier: 1, type: 'predict', title: 'Symbols and a hidden note', chapter: 7,
            task: 'What text does the browser show on the page? Type it exactly as a visitor would see it.',
            code: '<p>Rule: 5 &lt; 8 &amp; 9 &gt; 2</p>\n<!-- Ask Ms Amina to check this rule -->',
            answers: ['Rule: 5 < 8 & 9 > 2'],
            why: '<code>&amp;lt;</code>, <code>&amp;gt;</code> and <code>&amp;amp;</code> are character entities: the browser shows <code>&lt;</code>, <code>&gt;</code> and <code>&amp;</code>. The comment is not shown on the page. But anyone can still read it with View Source, so never put secrets in a comment.'
        },
        {
            id: 'choice-strong', tier: 1, type: 'choice', title: 'An important warning', module: 4, chapter: 6,
            task: 'A science lab notice says <em>"Wear safety goggles"</em>. Which tag tells the browser, and screen readers, that this text is <strong>important</strong>?',
            options: ['<code>&lt;b&gt;</code>', '<code>&lt;strong&gt;</code>', '<code>&lt;i&gt;</code>', '<code>&lt;sub&gt;</code>'],
            answer: 1,
            why: '<code>&lt;strong&gt;</code> means "this is important", and a screen reader can say it with more force. <code>&lt;b&gt;</code> only makes text look bold, with no extra meaning.'
        },
        {
            id: 'fill-href', tier: 1, type: 'fill', title: 'Where does the link go?', module: 5, chapter: 8,
            task: 'Which attribute holds the address that a link takes you to?',
            code: '<a ____="https://example.org/library">Visit the city library</a>',
            answers: ['href'],
            why: '<code>href</code> stands for "hypertext reference": the address of the page to open. Without it, the words are not a working link.'
        },
        {
            id: 'fill-alt', tier: 1, type: 'fill', title: 'Words for a photo', module: 6, chapter: 9,
            task: 'Which attribute gives a description of the image for people who cannot see it (and for when the image fails to load)?',
            code: '<img src="garden.jpg" ____="Students planting tomato seedlings in the school garden">',
            answers: ['alt'],
            why: '<code>alt</code> is the "alternative text". A screen reader reads it aloud to a blind visitor, and the browser shows it if the picture does not load. Describing pictures for everyone is part of being trustworthy with our pages (<em>Amānah</em>).'
        },

        // ── Tier 2: apply ──
        {
            id: 'order-boilerplate', tier: 2, type: 'order', title: 'Build the page skeleton', module: 1, chapter: 3,
            task: 'Put these lines in order to make a complete, correct web page for the school library.',
            steps: [
                '<!DOCTYPE html>',
                '<html lang="en">',
                '<head>',
                '    <meta charset="UTF-8">',
                '    <title>Crescent School Library</title>',
                '</head>',
                '<body>',
                '    <h1>Welcome to the library</h1>',
                '</body>',
                '</html>'
            ],
            swaps: [[3, 4]],
            why: 'The DOCTYPE comes first. Then <code>&lt;html&gt;</code> wraps everything. <code>&lt;head&gt;</code> (with the meta tag and title) closes before <code>&lt;body&gt;</code> opens. Each tag closes in the reverse order it opened, so <code>&lt;/html&gt;</code> is last.'
        },
        {
            id: 'bug-nesting', tier: 2, type: 'bug', title: 'Crossed tags', module: 2, chapter: 4,
            task: 'One line closes its tags in the wrong order, so they cross over each other. Tap that line.',
            lines: [
                '<h1>Library Notice</h1>',
                '<p>The library is open from 9 until 3.</p>',
                '<p>Please return books by <strong>Thursday <em>afternoon</strong></em>.</p>',
                '<p>Thank you for keeping our books safe.</p>'
            ],
            bad: 2,
            fix: '<p>Please return books by <strong>Thursday <em>afternoon</em></strong>.</p>',
            why: 'Tags nest like boxes inside boxes: the last one opened is the first one closed. <code>&lt;em&gt;</code> opened inside <code>&lt;strong&gt;</code>, so <code>&lt;/em&gt;</code> must come before <code>&lt;/strong&gt;</code>.'
        },
        {
            id: 'web-headings', tier: 2, type: 'web', title: 'Science fair notice', module: 3, chapter: 5,
            task: 'This notice uses <code>&lt;h1&gt;</code> three times, and its sentences are not in paragraphs. Fix it so it has:<ul>' +
                '<li>exactly <strong>one</strong> <code>&lt;h1&gt;</code>: <em>Science Fair</em></li>' +
                '<li>two <code>&lt;h2&gt;</code> headings: <em>When</em> and <em>What to bring</em></li>' +
                '<li>each sentence inside its own <code>&lt;p&gt;</code>, under the right heading</li></ul>',
            starter: page('Science Fair', '    <h1>Science Fair</h1>\n    <h1>When</h1>\n    Saturday 14 November, in the school hall.\n    <h1>What to bring</h1>\n    Your project, a poster and your notebook.'),
            solution: page('Science Fair', '    <h1>Science Fair</h1>\n    <h2>When</h2>\n    <p>Saturday 14 November, in the school hall.</p>\n    <h2>What to bring</h2>\n    <p>Your project, a poster and your notebook.</p>'),
            checks: [
                { test: (doc) => doc.querySelectorAll('h1').length === 1, msg: 'A page should have exactly one &lt;h1&gt;: the main title.' },
                { test: (doc) => txt(doc.querySelector('h1')).includes('science fair'), msg: 'The &lt;h1&gt; should say "Science Fair".' },
                { test: (doc) => doc.querySelectorAll('h2').length >= 2, msg: 'Make "When" and "What to bring" into &lt;h2&gt; headings.' },
                { test: (doc) => doc.querySelectorAll('p').length >= 2 && [...doc.querySelectorAll('p')].every(p => txt(p).length > 0), msg: 'Put each of the two sentences inside its own &lt;p&gt; tag.' },
                { test: (doc) => headingsInOrder(doc), msg: 'Start with the &lt;h1&gt; and do not skip a heading level.' }
            ],
            hint1: 'Keep the first <code>&lt;h1&gt;</code>. Change the other two into <code>&lt;h2&gt;</code> (both the opening and the closing tag).',
            hint2: 'Wrap each sentence like this: <code>&lt;p&gt;Saturday 14 November, in the school hall.&lt;/p&gt;</code>',
            why: 'Headings are like the outline of a book: one title (<code>&lt;h1&gt;</code>), then section headings (<code>&lt;h2&gt;</code>). Screen readers and search engines use this outline to move around the page.'
        },
        {
            id: 'web-format', tier: 2, type: 'web', title: 'Lab rules poster', module: 4, chapter: 6,
            task: 'Add meaning to the lab poster with formatting tags:<ul>' +
                '<li>put <em>Always wear safety goggles</em> inside <code>&lt;strong&gt;</code></li>' +
                '<li>write the 2 in H2O as a subscript: <code>H&lt;sub&gt;2&lt;/sub&gt;O</code></li>' +
                '<li>write the 2 in m2 (square metres) as a superscript with <code>&lt;sup&gt;</code></li>' +
                '<li>highlight <em>Room 4</em> with <code>&lt;mark&gt;</code></li></ul>',
            starter: page('Lab Rules', '    <h1>Science Lab Rules</h1>\n    <p>Always wear safety goggles before an experiment.</p>\n    <p>Today we study water: H2O.</p>\n    <p>Our class garden bed is 4 m2.</p>\n    <p>The experiment is in Room 4.</p>'),
            solution: page('Lab Rules', '    <h1>Science Lab Rules</h1>\n    <p><strong>Always wear safety goggles</strong> before an experiment.</p>\n    <p>Today we study water: H<sub>2</sub>O.</p>\n    <p>Our class garden bed is 4 m<sup>2</sup>.</p>\n    <p>The experiment is in <mark>Room 4</mark>.</p>'),
            checks: [
                { test: (doc) => [...doc.querySelectorAll('strong')].some(s => txt(s).includes('goggles')), msg: 'Put the goggles warning inside &lt;strong&gt;...&lt;/strong&gt;.' },
                { test: (doc) => [...doc.querySelectorAll('sub')].some(s => txt(s) === '2'), msg: 'Write water as H&lt;sub&gt;2&lt;/sub&gt;O.' },
                { test: (doc) => [...doc.querySelectorAll('sup')].some(s => txt(s) === '2'), msg: 'Write square metres as m&lt;sup&gt;2&lt;/sup&gt;.' },
                { test: (doc) => [...doc.querySelectorAll('mark')].some(m => txt(m).includes('room 4')), msg: 'Highlight "Room 4" with &lt;mark&gt;.' }
            ],
            hint1: 'Only the 2 goes inside <code>&lt;sub&gt;</code> or <code>&lt;sup&gt;</code>, not the letters around it.',
            hint2: 'Sub = below the line (H<sub>2</sub>O). Sup = above the line (m<sup>2</sup>).',
            why: 'These tags carry meaning, not just looks: <code>&lt;strong&gt;</code> = important, <code>&lt;mark&gt;</code> = highlighted for the reader, <code>&lt;sub&gt;</code>/<code>&lt;sup&gt;</code> = how science and maths are really written.'
        },
        {
            id: 'web-links', tier: 2, type: 'web', title: 'Class resource links', module: 5, chapter: 8,
            task: 'Fix the two links on this page:<ul>' +
                '<li>The first link must go to <code>https://example.org/library</code>, open in a <strong>new tab</strong>, and say <em>City Library catalogue</em> instead of "click here".</li>' +
                '<li>Make <em>Contact the librarian</em> a link to the page <code>contact.html</code> (in the same folder).</li></ul>',
            starter: page('Class Resources', '    <h1>Class Resources</h1>\n    <p>To search for books, <a>click here</a>.</p>\n    <p>Contact the librarian</p>'),
            solution: page('Class Resources', '    <h1>Class Resources</h1>\n    <p>To search for books, open the <a href="https://example.org/library" target="_blank">City Library catalogue</a>.</p>\n    <p><a href="contact.html">Contact the librarian</a></p>'),
            checks: [
                { test: (doc) => doc.querySelector('a[href*="example.org/library"]'), msg: 'Give the first link href="https://example.org/library".' },
                { test: (doc) => doc.querySelector('a[href*="example.org/library"]').target === '_blank', msg: 'Add target="_blank" so the library link opens in a new tab.' },
                { test: (doc) => { const t = txt(doc.querySelector('a[href*="example.org/library"]')); return t.length >= 5 && !t.includes('click here'); }, msg: 'Change the link words from "click here" to words that say where it goes, like "City Library catalogue".' },
                { test: (doc) => { const a = doc.querySelector('a[href="contact.html"]'); return a && txt(a).includes('librarian'); }, msg: 'Make "Contact the librarian" a link with href="contact.html".' }
            ],
            hint1: 'A link needs <code>href</code> for the address: <code>&lt;a href="https://example.org/library"&gt;</code>.',
            hint2: 'For a page in the same folder, just use its file name: <code>&lt;a href="contact.html"&gt;Contact the librarian&lt;/a&gt;</code>.',
            why: 'Screen-reader users often jump from link to link, hearing only the link words. "Click here" tells them nothing, while "City Library catalogue" tells them exactly where the link goes.'
        },
        {
            id: 'web-image', tier: 2, type: 'web', title: 'The new reading corner', module: 6, chapter: 9,
            task: 'The photo <code>library.jpg</code> has poor alt text. Make it better:<ul>' +
                '<li>write <code>alt</code> text of at least three words that describes what is in the photo</li>' +
                '<li>give the image a <code>width</code> of 400</li>' +
                '<li>put the image inside a <code>&lt;figure&gt;</code> with a <code>&lt;figcaption&gt;</code> that says <em>Our new reading corner</em></li></ul>',
            starter: page('Reading Corner', '    <h1>Our Library</h1>\n    <img src="library.jpg" alt="photo">'),
            solution: page('Reading Corner', '    <h1>Our Library</h1>\n    <figure>\n        <img src="library.jpg" alt="Students reading on cushions beside a full bookshelf" width="400">\n        <figcaption>Our new reading corner</figcaption>\n    </figure>'),
            checks: [
                { test: (doc) => { const i = doc.querySelector('img'); return i && /library\.jpg$/.test(i.getAttribute('src') || ''); }, msg: 'Keep the image with src="library.jpg".' },
                { test: (doc) => goodAlt(doc.querySelector('img')), msg: 'Write alt text of at least three words that says what the photo shows (not just "photo").' },
                { test: (doc) => doc.querySelector('img').getAttribute('width') === '400', msg: 'Add width="400" to the image.' },
                { test: (doc) => doc.querySelector('figure img'), msg: 'Put the &lt;img&gt; inside a &lt;figure&gt;.' },
                { test: (doc) => txt(doc.querySelector('figure figcaption')).includes('reading corner'), msg: 'Add a &lt;figcaption&gt; inside the figure that says "Our new reading corner".' }
            ],
            hint1: 'Imagine telling a friend on the phone what is in the photo. Those words are your alt text.',
            hint2: '<code>&lt;figure&gt;&lt;img ...&gt;&lt;figcaption&gt;Our new reading corner&lt;/figcaption&gt;&lt;/figure&gt;</code>',
            why: '"photo" tells a blind visitor nothing. Good alt text says what matters in the picture. The caption is for everyone, and <code>&lt;figure&gt;</code> keeps the picture and its caption together.'
        },
        {
            id: 'web-table', tier: 2, type: 'web', title: 'Monday timetable', module: 7, chapter: 11,
            task: 'This timetable has no header row and only two lessons. Fix it:<ul>' +
                '<li>make the first row (<em>Time, Subject, Room</em>) header cells with <code>&lt;th&gt;</code></li>' +
                '<li>add one more lesson row, so there are at least <strong>three</strong> rows of <code>&lt;td&gt;</code> cells</li>' +
                '<li>give every row the same number of cells (3)</li></ul>',
            starter: page('Timetable', '    <h1>Monday Timetable</h1>\n    <table border="1">\n        <tr>\n            <td>Time</td>\n            <td>Subject</td>\n            <td>Room</td>\n        </tr>\n        <tr>\n            <td>9:00</td>\n            <td>Science</td>\n            <td>Lab 2</td>\n        </tr>\n        <tr>\n            <td>10:00</td>\n            <td>Mathematics</td>\n            <td>Room 5</td>\n        </tr>\n    </table>'),
            solution: page('Timetable', '    <h1>Monday Timetable</h1>\n    <table border="1">\n        <tr>\n            <th>Time</th>\n            <th>Subject</th>\n            <th>Room</th>\n        </tr>\n        <tr>\n            <td>9:00</td>\n            <td>Science</td>\n            <td>Lab 2</td>\n        </tr>\n        <tr>\n            <td>10:00</td>\n            <td>Mathematics</td>\n            <td>Room 5</td>\n        </tr>\n        <tr>\n            <td>11:00</td>\n            <td>English</td>\n            <td>Room 3</td>\n        </tr>\n    </table>'),
            checks: [
                { test: (doc) => doc.querySelector('table'), msg: 'Keep the &lt;table&gt;.' },
                { test: (doc) => doc.querySelectorAll('table tr:first-child th').length >= 3, msg: 'Change the cells of the first row (Time, Subject, Room) from &lt;td&gt; to &lt;th&gt;.' },
                { test: (doc) => [...doc.querySelectorAll('table tr')].filter(r => r.querySelector('td')).length >= 3, msg: 'Add a third lesson row: a &lt;tr&gt; with three &lt;td&gt; cells.' },
                { test: (doc) => [...doc.querySelectorAll('table tr')].every(r => r.children.length === 3), msg: 'Every row should have exactly 3 cells, so the columns line up.' }
            ],
            hint1: 'A new row is <code>&lt;tr&gt;</code> ... <code>&lt;/tr&gt;</code> with three <code>&lt;td&gt;</code> cells inside.',
            hint2: 'Change <code>&lt;td&gt;Time&lt;/td&gt;</code> to <code>&lt;th&gt;Time&lt;/th&gt;</code>, and the same for Subject and Room.',
            why: '<code>&lt;th&gt;</code> tells the browser "this is a heading for the column". A screen reader then says "Subject: Science" instead of just "Science", so the table makes sense without seeing it.'
        },

        // ── Tier 3: challenge ──
        {
            id: 'web-lists', tier: 3, type: 'web', title: 'Bake sale recipe', module: 8, chapter: 10,
            task: 'Our class is baking oat and date cookies for the charity bake sale. Turn the plain lines into lists:<ul>' +
                '<li>the <strong>ingredients</strong> as a bulleted list <code>&lt;ul&gt;</code> with at least 4 items</li>' +
                '<li>the item <em>Toppings</em> holds its own list (a <strong>nested</strong> list) with <em>sesame seeds</em> and <em>chopped almonds</em></li>' +
                '<li>the <strong>method</strong> as a numbered list <code>&lt;ol&gt;</code> with at least 3 steps</li></ul>',
            starter: page('Oat and Date Cookies', '    <h1>Oat and Date Cookies</h1>\n    <h2>Ingredients</h2>\n    <p>Oats</p>\n    <p>Chopped dates</p>\n    <p>Honey</p>\n    <p>Toppings: sesame seeds, chopped almonds</p>\n    <h2>Method</h2>\n    <p>Mix the oats, dates and honey in a bowl.</p>\n    <p>Roll small balls and press them flat.</p>\n    <p>Ask an adult to bake them for 12 minutes.</p>'),
            solution: page('Oat and Date Cookies', '    <h1>Oat and Date Cookies</h1>\n    <h2>Ingredients</h2>\n    <ul>\n        <li>Oats</li>\n        <li>Chopped dates</li>\n        <li>Honey</li>\n        <li>Toppings\n            <ul>\n                <li>Sesame seeds</li>\n                <li>Chopped almonds</li>\n            </ul>\n        </li>\n    </ul>\n    <h2>Method</h2>\n    <ol>\n        <li>Mix the oats, dates and honey in a bowl.</li>\n        <li>Roll small balls and press them flat.</li>\n        <li>Ask an adult to bake them for 12 minutes.</li>\n    </ol>'),
            checks: [
                { test: (doc) => [...doc.querySelectorAll('ul')].some(u => u.querySelectorAll(':scope > li').length >= 4), msg: 'Make the ingredients a &lt;ul&gt; with at least 4 &lt;li&gt; items.' },
                { test: (doc) => [...doc.querySelectorAll('li > ul, li > ol')].some(l => l.querySelectorAll('li').length >= 2), msg: 'Inside the "Toppings" &lt;li&gt;, add a second &lt;ul&gt; with the two toppings.' },
                { test: (doc) => txt(doc.querySelector('li > ul, li > ol')).includes('sesame') && txt(doc.querySelector('li > ul, li > ol')).includes('almond'), msg: 'The nested list should hold "sesame seeds" and "chopped almonds".' },
                { test: (doc) => [...doc.querySelectorAll('ol')].some(o => o.querySelectorAll(':scope > li').length >= 3), msg: 'Make the method a numbered list &lt;ol&gt; with at least 3 &lt;li&gt; steps.' },
                { test: (doc) => [...doc.querySelectorAll('ul, ol')].every(l => [...l.children].every(c => c.tagName === 'LI')), msg: 'Only &lt;li&gt; items may sit directly inside a list. Put a nested list inside an &lt;li&gt;, not straight inside &lt;ul&gt;.' }
            ],
            hint1: 'Order does not matter for ingredients, so use <code>&lt;ul&gt;</code>. Order matters for the method, so use <code>&lt;ol&gt;</code>.',
            hint2: 'A nested list goes <em>inside</em> an item: <code>&lt;li&gt;Toppings &lt;ul&gt;&lt;li&gt;Sesame seeds&lt;/li&gt;...&lt;/ul&gt;&lt;/li&gt;</code>',
            why: 'Choosing <code>&lt;ul&gt;</code> or <code>&lt;ol&gt;</code> tells readers whether order matters. A screen reader says "list, 4 items", so visitors know what to expect. Nested lists must sit inside an <code>&lt;li&gt;</code>.'
        },
        {
            id: 'web-classes', tier: 3, type: 'web', title: 'Library book cards', module: 10, chapter: 13,
            task: 'The three book cards all use <code>id="book-card"</code>, but an id must be used only once on a page. Fix it:<ul>' +
                '<li>give all three <code>&lt;div&gt;</code> cards <code>class="book-card"</code> instead</li>' +
                '<li>give the first card <code>id="book-of-the-week"</code> as well (only that one)</li>' +
                '<li>in each card, wrap the author\'s name in <code>&lt;span class="author"&gt;</code></li></ul>',
            starter: page('Book Cards', '    <h1>New in the Library</h1>\n    <div id="book-card">\n        <h2>The Tiny Seed Scientists</h2>\n        <p>By Hana Qureshi</p>\n    </div>\n    <div id="book-card">\n        <h2>Stars Over the Desert</h2>\n        <p>By Idris Malik</p>\n    </div>\n    <div id="book-card">\n        <h2>Rivers of the Valley</h2>\n        <p>By Zoya Lone</p>\n    </div>'),
            solution: page('Book Cards', '    <h1>New in the Library</h1>\n    <div class="book-card" id="book-of-the-week">\n        <h2>The Tiny Seed Scientists</h2>\n        <p>By <span class="author">Hana Qureshi</span></p>\n    </div>\n    <div class="book-card">\n        <h2>Stars Over the Desert</h2>\n        <p>By <span class="author">Idris Malik</span></p>\n    </div>\n    <div class="book-card">\n        <h2>Rivers of the Valley</h2>\n        <p>By <span class="author">Zoya Lone</span></p>\n    </div>'),
            checks: [
                { test: (doc) => doc.querySelectorAll('div.book-card').length >= 3, msg: 'Give all three &lt;div&gt; cards class="book-card".' },
                { test: (doc) => !doc.querySelector('[id="book-card"]'), msg: 'Remove id="book-card": a repeated label should be a class, not an id.' },
                { test: (doc) => { const b = doc.getElementById('book-of-the-week'); return b && b.classList.contains('book-card'); }, msg: 'Add id="book-of-the-week" to the first card (it keeps its class too).' },
                { test: (doc) => doc.querySelectorAll('[id="book-of-the-week"]').length === 1, msg: 'Use id="book-of-the-week" on one card only.' },
                { test: (doc) => [...doc.querySelectorAll('.book-card')].every(c => txt(c.querySelector('span.author')).length > 0), msg: 'In every card, wrap the author\'s name in &lt;span class="author"&gt;...&lt;/span&gt;.' }
            ],
            hint1: 'An element can have both: <code>&lt;div class="book-card" id="book-of-the-week"&gt;</code>.',
            hint2: '<code>&lt;span&gt;</code> is inline, so it can sit inside the sentence: <code>&lt;p&gt;By &lt;span class="author"&gt;Hana Qureshi&lt;/span&gt;&lt;/p&gt;</code>',
            why: 'A <strong>class</strong> is a label many elements can share (every book card). An <strong>id</strong> is a name for one element only, like a student\'s roll number. Later, CSS will style all <code>.book-card</code> boxes at once.'
        },
        {
            id: 'web-form', tier: 3, type: 'web', title: 'Science fair sign-up form', module: 11, chapter: 12,
            task: 'Build the sign-up form properly. It needs:<ul>' +
                '<li>a text box with <code>id="student-name"</code> that is <code>required</code></li>' +
                '<li>an email box with <code>id="email"</code> and <code>type="email"</code></li>' +
                '<li>a dropdown <code>&lt;select id="grade"&gt;</code> with at least 3 options (Grade 6, 7, 8)</li>' +
                '<li>a <code>&lt;textarea id="project"&gt;</code> for the project idea</li>' +
                '<li>a <code>&lt;label for="..."&gt;</code> for <strong>every</strong> box, and a submit button</li></ul>' +
                'We only build the form here. Saving what students send is done later, with PHP.',
            starter: page('Science Fair Sign-up', '    <h1>Science Fair Sign-up</h1>\n    <form>\n        <p>Your name</p>\n        <input type="text">\n        <p>Email</p>\n        <input type="text">\n        <p>Grade</p>\n        <p>Project idea</p>\n    </form>'),
            solution: page('Science Fair Sign-up', '    <h1>Science Fair Sign-up</h1>\n    <form>\n        <label for="student-name">Your name</label>\n        <input type="text" id="student-name" name="student-name" required>\n\n        <label for="email">Email</label>\n        <input type="email" id="email" name="email">\n\n        <label for="grade">Grade</label>\n        <select id="grade" name="grade">\n            <option>Grade 6</option>\n            <option>Grade 7</option>\n            <option>Grade 8</option>\n        </select>\n\n        <label for="project">Project idea</label>\n        <textarea id="project" name="project" rows="4"></textarea>\n\n        <button type="submit">Sign up</button>\n    </form>'),
            checks: [
                { test: (doc) => doc.querySelector('form'), msg: 'Keep everything inside the &lt;form&gt;.' },
                { test: (doc) => { const e = doc.getElementById('student-name'); return e && e.tagName === 'INPUT' && e.type === 'text'; }, msg: 'Give the name box id="student-name" (an &lt;input type="text"&gt;).' },
                { test: (doc) => doc.getElementById('student-name').required, msg: 'Add the required attribute to the name box, so it cannot be left empty.' },
                { test: (doc) => { const e = doc.getElementById('email'); return e && e.type === 'email'; }, msg: 'Make the email box &lt;input type="email" id="email"&gt;.' },
                { test: (doc) => { const s = doc.getElementById('grade'); return s && s.tagName === 'SELECT' && s.options.length >= 3; }, msg: 'Add &lt;select id="grade"&gt; with at least 3 &lt;option&gt; items.' },
                { test: (doc) => { const t = doc.getElementById('project'); return t && t.tagName === 'TEXTAREA'; }, msg: 'Add &lt;textarea id="project"&gt;&lt;/textarea&gt; for the project idea.' },
                { test: (doc) => allLabelled(doc), msg: 'Every box needs a &lt;label for="..."&gt; whose for matches the box\'s id.' },
                { test: (doc) => doc.querySelector('form button[type="submit"], form button:not([type]), form input[type="submit"]'), msg: 'Add a submit button: &lt;button type="submit"&gt;Sign up&lt;/button&gt;.' }
            ],
            hint1: 'Change each <code>&lt;p&gt;Your name&lt;/p&gt;</code> into <code>&lt;label for="student-name"&gt;Your name&lt;/label&gt;</code>.',
            hint2: 'The <code>for</code> of a label must match the <code>id</code> of its box exactly: <code>for="email"</code> goes with <code>id="email"</code>.',
            why: 'A label joined with <code>for</code> and <code>id</code> is read aloud by screen readers, and clicking it puts the cursor in the box. <code>type="email"</code> and <code>required</code> let the browser check the answers first. Collect only what you need: students\' details are an <em>Amānah</em> (a trust).'
        },
        {
            id: 'web-semantic', tier: 3, type: 'web', title: 'Clean-up day page', module: 12, chapter: 13,
            task: 'This page is built from plain <code>&lt;div&gt;</code> boxes. Rebuild it with meaningful (semantic) tags:<ul>' +
                '<li>a <code>&lt;header&gt;</code> holding the <code>&lt;h1&gt;</code></li>' +
                '<li>a <code>&lt;nav&gt;</code> holding the three links</li>' +
                '<li>one <code>&lt;main&gt;</code> holding two <code>&lt;section&gt;</code>s, each with an <code>&lt;h2&gt;</code></li>' +
                '<li>a <code>&lt;footer&gt;</code> at the end</li></ul>',
            starter: page('Clean-Up Day', '    <div class="header">\n        <h1>Green Street Clean-Up Day</h1>\n    </div>\n    <div class="nav">\n        <a href="#plan">Plan</a>\n        <a href="#bring">What to bring</a>\n        <a href="contact.html">Contact</a>\n    </div>\n    <div class="main">\n        <div id="plan">\n            <h2>The plan</h2>\n            <p>We meet at the park gate at 8 in the morning.</p>\n        </div>\n        <div id="bring">\n            <h2>What to bring</h2>\n            <p>Gloves, a water bottle and a cheerful heart.</p>\n        </div>\n    </div>\n    <div class="footer">\n        <p>Green Street Neighbours Group</p>\n    </div>'),
            solution: page('Clean-Up Day', '    <header>\n        <h1>Green Street Clean-Up Day</h1>\n    </header>\n    <nav>\n        <a href="#plan">Plan</a>\n        <a href="#bring">What to bring</a>\n        <a href="contact.html">Contact</a>\n    </nav>\n    <main>\n        <section id="plan">\n            <h2>The plan</h2>\n            <p>We meet at the park gate at 8 in the morning.</p>\n        </section>\n        <section id="bring">\n            <h2>What to bring</h2>\n            <p>Gloves, a water bottle and a cheerful heart.</p>\n        </section>\n    </main>\n    <footer>\n        <p>Green Street Neighbours Group</p>\n    </footer>'),
            checks: [
                { test: (doc) => doc.querySelector('header h1'), msg: 'Put the &lt;h1&gt; inside a &lt;header&gt;.' },
                { test: (doc) => doc.querySelectorAll('nav a').length >= 3, msg: 'Put the three links inside a &lt;nav&gt;.' },
                { test: (doc) => doc.querySelectorAll('main').length === 1, msg: 'Use exactly one &lt;main&gt; for the main content.' },
                { test: (doc) => { const s = doc.querySelectorAll('main section'); return s.length >= 2 && [...s].every(x => x.querySelector('h2')); }, msg: 'Inside &lt;main&gt;, use two &lt;section&gt; elements, each starting with its &lt;h2&gt;.' },
                { test: (doc) => doc.querySelector('footer') && !doc.querySelector('footer main, header main'), msg: 'End the page with a &lt;footer&gt; (outside &lt;main&gt;).' },
                { test: (doc) => !doc.querySelector('div.header, div.nav, div.main, div.footer'), msg: 'Replace the old &lt;div class="..."&gt; boxes with the semantic tags; do not keep both.' }
            ],
            hint1: 'Swap each <code>&lt;div class="header"&gt;</code> for <code>&lt;header&gt;</code>, and its <code>&lt;/div&gt;</code> for <code>&lt;/header&gt;</code>. Do the same for nav, main and footer.',
            hint2: 'The two inner boxes become <code>&lt;section id="plan"&gt;</code> and <code>&lt;section id="bring"&gt;</code>. Keep their ids, so the links still jump to them.',
            why: 'A <code>&lt;div&gt;</code> means nothing on its own. <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code> and <code>&lt;footer&gt;</code> tell screen readers and search engines what each part is, so a visitor can jump straight to the main content.'
        },
        {
            id: 'web-book-drive', tier: 3, type: 'web', title: 'Book drive page (mini project)', module: 12, chapter: 15,
            task: 'Build a page for the school\'s book donation drive. It must have:<ul>' +
                '<li>a <code>&lt;header&gt;</code> with one <code>&lt;h1&gt;</code>, and a <code>&lt;main&gt;</code> and a <code>&lt;footer&gt;</code></li>' +
                '<li>the image <code>books.jpg</code> with alt text of at least three words</li>' +
                '<li>a <code>&lt;ul&gt;</code> of at least 3 kinds of books we need</li>' +
                '<li>a table of collection times with a header row of <code>&lt;th&gt;</code> and at least 2 rows of <code>&lt;td&gt;</code></li>' +
                '<li>a link to <code>contact.html</code> with words that say where it goes</li>' +
                '<li>headings in order: <code>&lt;h1&gt;</code> first, then <code>&lt;h2&gt;</code>, no skipped levels</li></ul>',
            starter: page('Book Drive', '    <!-- Build the book drive page here -->\n    <h3>Book Drive</h3>'),
            solution: page('Book Drive', '    <header>\n        <h1>Crescent School Book Drive</h1>\n    </header>\n    <main>\n        <section>\n            <h2>Share a book, share knowledge</h2>\n            <img src="books.jpg" alt="Boxes of donated story books on a library table" width="400">\n            <p>Your old books can help children in the village school.</p>\n        </section>\n        <section>\n            <h2>Books we need</h2>\n            <ul>\n                <li>Story books for ages 6 to 10</li>\n                <li>Science picture books</li>\n                <li>Dictionaries</li>\n            </ul>\n        </section>\n        <section>\n            <h2>Collection times</h2>\n            <table border="1">\n                <tr><th>Day</th><th>Time</th><th>Place</th></tr>\n                <tr><td>Monday</td><td>8:00 to 9:00</td><td>Library</td></tr>\n                <tr><td>Thursday</td><td>2:00 to 3:00</td><td>School hall</td></tr>\n            </table>\n            <p><a href="contact.html">Contact the book drive team</a></p>\n        </section>\n    </main>\n    <footer>\n        <p>Crescent School Library Club</p>\n    </footer>'),
            checks: [
                { test: (doc) => doc.querySelectorAll('h1').length === 1 && doc.querySelector('header h1'), msg: 'Put exactly one &lt;h1&gt; inside a &lt;header&gt;.' },
                { test: (doc) => doc.querySelector('main') && doc.querySelector('footer'), msg: 'Add a &lt;main&gt; for the content and a &lt;footer&gt; at the end.' },
                { test: (doc) => { const i = doc.querySelector('img[src$="books.jpg"]'); return i && goodAlt(i); }, msg: 'Add &lt;img src="books.jpg"&gt; with alt text of at least three words that describes it.' },
                { test: (doc) => [...doc.querySelectorAll('ul')].some(u => u.querySelectorAll(':scope > li').length >= 3), msg: 'Add a &lt;ul&gt; list with at least 3 kinds of books.' },
                { test: (doc) => doc.querySelectorAll('table th').length >= 2 && [...doc.querySelectorAll('table tr')].filter(r => r.querySelector('td')).length >= 2, msg: 'Add a table with a header row of &lt;th&gt; cells and at least 2 rows of &lt;td&gt; cells.' },
                { test: (doc) => { const a = doc.querySelector('a[href="contact.html"]'); return a && txt(a).length >= 5 && !txt(a).includes('click here'); }, msg: 'Add a link with href="contact.html" whose words say where it goes.' },
                { test: (doc) => headingsInOrder(doc), msg: 'Headings must start with &lt;h1&gt; and go down one level at a time (&lt;h1&gt;, then &lt;h2&gt;...).' }
            ],
            hint1: 'Start from the skeleton: <code>&lt;header&gt;</code>, then <code>&lt;main&gt;</code> with a few <code>&lt;section&gt;</code>s (each with an <code>&lt;h2&gt;</code>), then <code>&lt;footer&gt;</code>.',
            hint2: 'Change the <code>&lt;h3&gt;</code> into your <code>&lt;h1&gt;</code> inside the header. Then build one section at a time and press Check after each one.',
            why: 'This is how real pages are made: small, correct pieces (headings, image, list, table, link) inside a clear layout. Every piece is also accessible, so the page serves everyone who visits it.'
        }
    ];
})();
