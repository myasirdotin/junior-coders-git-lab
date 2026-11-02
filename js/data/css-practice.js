/**
 * Junior Coders - CSS practice (Learning CSS/exercises.html), run by js/practice-cards.js.
 * Format: see the header of js/practice-cards.js. `web` tasks render the student's page in a sandboxed 800×600 frame
 * and look at the computed styles and the layout. After any edit: node scripts/check-practice.js
 * Lessons: 1 Intro to CSS (ch1–3), 2 Colors & Text (ch4–6), 3 The Box Model (ch8–9), 4 Display & Positioning (ch10, 13),
 * 5 Intro to Flexbox (ch11), 6 Advanced Flexbox (ch11), 7 CSS Grid (ch12), 8 Responsive Design (ch14).
 * No lesson yet for variables (ch7) or hover and transitions (ch18–19): those tasks link only the chapter.
 * Scenarios follow GEMINI §1.
 */
(window.JC_PRACTICE = window.JC_PRACTICE || {}).css = (function () {
    const page = (css, body) => '<!DOCTYPE html>\n<html>\n<head>\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n' +
        css + '\n</style>\n</head>\n<body>\n' + body + '\n</body>\n</html>';
    const cs = (doc, win, sel) => win.getComputedStyle(doc.querySelector(sel));
    const box = (doc, sel, i) => doc.querySelectorAll(sel)[i || 0].getBoundingClientRect();
    const near = (a, b) => Math.abs(a - b) < 1;

    return [
        // ── Tier 1: warm-up ──
        {
            id: 'fill-class-selector', tier: 1, type: 'fill', title: 'Pick the notice by its class', module: 1, chapter: 3,
            task: 'The paragraph has <code>class="notice"</code>. Which character must start the selector so that it picks elements by their class?',
            code: '<p class="notice">The library closes at 3 pm today.</p>\n\n/* CSS */\n____notice {\n    color: navy;\n}',
            answers: ['.'],
            why: 'A dot picks a class (<code>.notice</code>), a hash picks an id (<code>#notice</code>), and a plain name picks a tag (<code>p</code>).'
        },
        {
            id: 'bug-semicolon', tier: 1, type: 'bug', title: 'The heading ignores both rules', module: 1, chapter: 1,
            task: 'The heading should be dark green and 32px tall, but neither rule works. Tap the line with the mistake.',
            lines: [
                'h1 {',
                '    color: darkgreen',
                '    font-size: 32px;',
                '}'
            ],
            bad: 1,
            fix: '    color: darkgreen;',
            why: 'Every declaration ends with a semicolon. Without it, the browser reads <code>darkgreen font-size: 32px</code> as one value. That value makes no sense, so it skips the whole thing.'
        },
        {
            id: 'fill-text-align', tier: 1, type: 'fill', title: 'Centre the title', module: 2, chapter: 5,
            task: 'The title of the school newsletter should sit in the middle of the page. Type the missing value.',
            code: 'h1 {\n    text-align: ____;\n}',
            answers: ['center'],
            why: '<code>text-align: center;</code> puts the text in the middle of its box. CSS uses the American spelling <code>center</code>; <code>centre</code> does not work.'
        },
        {
            id: 'order-box-model', tier: 1, type: 'order', title: 'The box model, inside out', module: 3, chapter: 8,
            task: 'Every element is a box made of four layers. Put them in order, from the <strong>inside</strong> to the <strong>outside</strong>.',
            steps: [
                'content (the text or picture)',
                'padding (space inside the border)',
                'border (the line around the box)',
                'margin (space outside the border)'
            ],
            why: 'Think of a framed picture: the picture (content), the white card around it (padding), the frame (border), and the space on the wall between frames (margin).'
        },
        {
            id: 'choice-display-none', tier: 1, type: 'choice', title: 'Hide the old timetable', module: 4, chapter: 10,
            task: 'The "Old timetable" box should disappear completely, and the boxes below should move up into its place. Which rule does that?',
            options: ['<code>display: none;</code>', '<code>display: inline;</code>', '<code>display: block;</code>', '<code>color: white;</code>'],
            answer: 0,
            why: '<code>display: none;</code> takes the element out of the page, so it leaves no gap. Painting the text white only hides it from the eye: the box still takes up space, and screen readers still read it.'
        },
        {
            id: 'fill-flex-wrap', tier: 1, type: 'fill', title: 'Let the cards wrap', module: 6, chapter: 11,
            task: 'The book cards on this shelf squeeze into one row. Which value lets them move onto a new row when there is no room?',
            code: '.shelf {\n    display: flex;\n    flex-wrap: ____;\n}',
            answers: ['wrap'],
            why: 'Flex items stay on one line by default (<code>nowrap</code>) and shrink to fit. <code>flex-wrap: wrap;</code> lets them start a new row instead.'
        },

        // ── Tier 2: apply ──
        {
            id: 'predict-specificity', tier: 2, type: 'predict', title: 'Which rule wins?', module: 1, chapter: 3,
            task: 'Three rules give the same heading a colour. Which colour does the heading show? Type the colour word.',
            code: '<h1 id="visit-title" class="heading">Planetarium Visit</h1>\n\n/* CSS */\n#visit-title { color: purple; }\nh1 { color: green; }\n.heading { color: blue; }',
            answers: ['purple'],
            why: 'All three rules match, so the most specific one wins. An id scores 1-0-0, a class 0-1-0 and a tag 0-0-1. The id rule wins even though it is written first; "later wins" only decides between equal scores.'
        },
        {
            id: 'web-library-notice', tier: 2, type: 'web', title: 'A library notice', module: 2, chapter: 4,
            task: 'Style the library notice:<ul><li><code>.notice</code>: background colour <code>#0f766e</code></li><li><code>h1</code>: white text, centred</li><li><code>p</code>: font size <code>18px</code></li></ul>',
            starter: page(
                '.notice {\n    padding: 16px;\n    /* background colour here */\n}\nh1 {\n    /* text colour and alignment here */\n}\np {\n    color: white;\n    /* text size here */\n}',
                '<div class="notice">\n    <h1>Library Week</h1>\n    <p>Please return your books by Thursday.</p>\n</div>'),
            solution: page(
                '.notice {\n    padding: 16px;\n    background-color: #0f766e;\n}\nh1 {\n    color: white;\n    text-align: center;\n}\np {\n    color: white;\n    font-size: 18px;\n}',
                '<div class="notice">\n    <h1>Library Week</h1>\n    <p>Please return your books by Thursday.</p>\n</div>'),
            checks: [
                { test: (doc, win) => cs(doc, win, '.notice').backgroundColor === 'rgb(15, 118, 110)', msg: 'The notice box needs background-color: #0f766e;' },
                { test: (doc, win) => cs(doc, win, 'h1').color === 'rgb(255, 255, 255)', msg: 'The heading text should be white.' },
                { test: (doc, win) => cs(doc, win, 'h1').textAlign === 'center', msg: 'The heading should be centred with text-align.' },
                { test: (doc, win) => near(parseFloat(cs(doc, win, 'p').fontSize), 18), msg: 'The paragraph needs a font size of 18px.' }
            ],
            hint1: 'Use <code>background-color</code> for the box and <code>color</code> for the text.',
            hint2: 'In <code>h1</code> write <code>color: white;</code> and <code>text-align: center;</code>. In <code>p</code> write <code>font-size: 18px;</code>.',
            why: '<code>background-color</code> paints the box; <code>color</code> paints the text. White on this dark teal is easy to read, which matters more than any colour choice.'
        },
        {
            id: 'web-charity-card', tier: 2, type: 'web', title: 'A card for the bake sale', module: 3, chapter: 9,
            task: 'Turn the bake sale notice into a neat card. Give <code>.card</code>:<ul><li>padding of <code>20px</code></li><li>a border <code>2px solid #cbd5e1</code></li><li>margin of <code>20px</code></li><li>rounded corners: <code>border-radius</code> of <code>10px</code></li></ul>',
            starter: page(
                '.card {\n    background-color: #f8fafc;\n    /* padding, border, margin and rounded corners here */\n}',
                '<div class="card">\n    <h2>Charity Bake Sale</h2>\n    <p>Saturday, 10 am, in the school hall. All money goes to the food bank.</p>\n</div>'),
            solution: page(
                '.card {\n    background-color: #f8fafc;\n    padding: 20px;\n    border: 2px solid #cbd5e1;\n    margin: 20px;\n    border-radius: 10px;\n}',
                '<div class="card">\n    <h2>Charity Bake Sale</h2>\n    <p>Saturday, 10 am, in the school hall. All money goes to the food bank.</p>\n</div>'),
            checks: [
                { test: (doc, win) => { const s = cs(doc, win, '.card'); return near(parseFloat(s.paddingTop), 20) && near(parseFloat(s.paddingLeft), 20); }, msg: 'The card needs padding of 20px on every side.' },
                { test: (doc, win) => { const s = cs(doc, win, '.card'); return near(parseFloat(s.borderTopWidth), 2) && s.borderTopStyle === 'solid' && near(parseFloat(s.borderLeftWidth), 2); }, msg: 'The card needs a border: 2px solid #cbd5e1;' },
                { test: (doc, win) => { const s = cs(doc, win, '.card'); return near(parseFloat(s.marginTop), 20) && near(parseFloat(s.marginLeft), 20); }, msg: 'The card needs a margin of 20px on every side.' },
                { test: (doc, win) => near(parseFloat(cs(doc, win, '.card').borderTopLeftRadius), 10), msg: 'Round the corners with border-radius: 10px;' }
            ],
            hint1: 'Padding is space <em>inside</em> the border; margin is space <em>outside</em> it.',
            hint2: 'Add four lines: <code>padding: 20px;</code>, <code>border: 2px solid #cbd5e1;</code>, <code>margin: 20px;</code> and <code>border-radius: 10px;</code>.',
            why: 'The padding keeps the text away from the border, and the margin keeps the card away from its neighbours. A soft shadow (<code>box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);</code>) is a nice extra.'
        },
        {
            id: 'web-border-box', tier: 2, type: 'web', title: 'Exactly 300 pixels', module: 3, chapter: 8,
            task: 'The science fair form box has <code>width: 300px</code>, but on screen it is 350px wide, because the padding and border are added on top. Add <strong>one line</strong> so the box is exactly 300px wide <em>with</em> its padding and border. Keep the padding and border.',
            starter: page(
                '.box {\n    width: 300px;\n    padding: 20px;\n    border: 5px solid #1d4ed8;\n}',
                '<div class="box">Science Fair entry form</div>'),
            solution: page(
                '.box {\n    box-sizing: border-box;\n    width: 300px;\n    padding: 20px;\n    border: 5px solid #1d4ed8;\n}',
                '<div class="box">Science Fair entry form</div>'),
            checks: [
                { test: (doc, win) => near(parseFloat(cs(doc, win, '.box').paddingLeft), 20) && near(parseFloat(cs(doc, win, '.box').borderLeftWidth), 5), msg: 'Keep the padding of 20px and the 5px border.' },
                { test: (doc) => near(box(doc, '.box').width, 300), msg: 'The box is still wider than 300px. The padding and border are being added on top of the width.' },
                { test: (doc, win) => cs(doc, win, '.box').boxSizing === 'border-box', msg: 'Use box-sizing to fit the padding and border inside the width.' }
            ],
            hint1: 'There is a property that changes how <code>width</code> is measured.',
            hint2: 'Add <code>box-sizing: border-box;</code> to <code>.box</code>.',
            why: 'Normally <code>width</code> is only the content: 300 + 20 + 20 + 5 + 5 = 350px. With <code>box-sizing: border-box</code> the width includes the padding and border, so boxes are the size you wrote.'
        },
        {
            id: 'web-school-navbar', tier: 2, type: 'web', title: 'A school navigation bar', module: 5, chapter: 11,
            task: 'Make the navigation bar one row: the school name on the left, the links pushed to the right, and both lined up in the middle. Use Flexbox on <code>.navbar</code>.',
            starter: page(
                '.navbar {\n    background-color: #1e293b;\n    padding: 15px 30px;\n    /* make it a flex row here */\n}\na {\n    color: white;\n    text-decoration: none;\n    margin-left: 12px;\n}\n.logo {\n    font-size: 22px;\n    margin-left: 0;\n}',
                '<nav class="navbar">\n    <a class="logo" href="#">Green Valley School</a>\n    <div class="links">\n        <a href="#">Home</a>\n        <a href="#">Library</a>\n        <a href="#">Contact</a>\n    </div>\n</nav>'),
            solution: page(
                '.navbar {\n    background-color: #1e293b;\n    padding: 15px 30px;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\na {\n    color: white;\n    text-decoration: none;\n    margin-left: 12px;\n}\n.logo {\n    font-size: 22px;\n    margin-left: 0;\n}',
                '<nav class="navbar">\n    <a class="logo" href="#">Green Valley School</a>\n    <div class="links">\n        <a href="#">Home</a>\n        <a href="#">Library</a>\n        <a href="#">Contact</a>\n    </div>\n</nav>'),
            checks: [
                { test: (doc, win) => cs(doc, win, '.navbar').display === 'flex', msg: 'The navbar is not a flex container yet.' },
                { test: (doc) => { const n = box(doc, '.navbar'), l = box(doc, '.links'); return Math.abs((n.right - 30) - l.right) < 1.5; }, msg: 'Push the links to the right edge with justify-content: space-between;' },
                { test: (doc, win) => cs(doc, win, '.navbar').alignItems === 'center', msg: 'Line the name and the links up in the middle with align-items: center;' }
            ],
            hint1: 'The navbar is the "boss": <code>display: flex;</code> goes on <code>.navbar</code>, not on the links.',
            hint2: 'Add <code>display: flex;</code>, <code>justify-content: space-between;</code> and <code>align-items: center;</code>.',
            why: '<code>space-between</code> puts the first item at the start and the last at the end of the main axis. <code>align-items: center</code> lines them up across it, so the big name and the small links share a middle line.'
        },
        {
            id: 'bug-media-brackets', tier: 2, type: 'bug', title: 'The menu never stacks', module: 8, chapter: 14,
            task: 'On a phone the menu should become a column, but it stays a row on every screen. Tap the line with the mistake.',
            lines: [
                '.menu {',
                '    display: flex;',
                '}',
                '@media max-width: 600px {',
                '    .menu {',
                '        flex-direction: column;',
                '    }',
                '}'
            ],
            bad: 3,
            fix: '@media (max-width: 600px) {',
            why: 'The condition of a media query goes inside round brackets: <code>@media (max-width: 600px)</code>. Without them the browser cannot read the rule, so it ignores everything inside.'
        },
        {
            id: 'choice-hover-transition', tier: 2, type: 'choice', title: 'A smooth Donate button', chapter: 19,
            task: 'The Donate button should change colour smoothly when the mouse moves onto it <strong>and</strong> when it moves off again. Where should <code>transition: background-color 0.3s;</code> go?',
            options: [
                'In <code>.btn</code>, the normal rule',
                'In <code>.btn:hover</code> only',
                'In <code>body</code>',
                'Nowhere: <code>:hover</code> is always smooth'
            ],
            answer: 0,
            why: 'Put <code>transition</code> on the normal state. Then it works in both directions. If it is only inside <code>:hover</code>, the change is smooth going in but jumps back at once when the mouse leaves.'
        },

        // ── Tier 3: challenge ──
        {
            id: 'web-banner-center', tier: 3, type: 'web', title: 'A clean-up day banner', module: 5, chapter: 6,
            task: 'Build the banner for Community Clean-up Day:<ul><li>height of <code>200px</code></li><li>a <code>linear-gradient</code> background (try <code>#0e7490</code> to <code>#6d28d9</code>)</li><li>white text</li><li>the text exactly in the middle, across <em>and</em> down, using Flexbox</li></ul>',
            starter: page(
                '.banner {\n    /* your CSS here */\n}\nspan {\n    font-size: 24px;\n}',
                '<div class="banner">\n    <span>Community Clean-up Day</span>\n</div>'),
            solution: page(
                '.banner {\n    height: 200px;\n    background: linear-gradient(135deg, #0e7490, #6d28d9);\n    color: white;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\nspan {\n    font-size: 24px;\n}',
                '<div class="banner">\n    <span>Community Clean-up Day</span>\n</div>'),
            checks: [
                { test: (doc) => near(box(doc, '.banner').height, 200), msg: 'The banner should be 200px tall.' },
                { test: (doc, win) => cs(doc, win, '.banner').backgroundImage.indexOf('linear-gradient') === 0, msg: 'Give the banner a linear-gradient background.' },
                { test: (doc, win) => cs(doc, win, 'span').color === 'rgb(255, 255, 255)', msg: 'The banner text should be white.' },
                { test: (doc, win) => cs(doc, win, '.banner').display === 'flex', msg: 'Use Flexbox: the banner needs display: flex;' },
                { test: (doc) => { const b = box(doc, '.banner'), s = box(doc, 'span'); return Math.abs((b.left + b.right) / 2 - (s.left + s.right) / 2) < 2; }, msg: 'The text is not in the middle from left to right yet.' },
                { test: (doc) => { const b = box(doc, '.banner'), s = box(doc, 'span'); return Math.abs((b.top + b.bottom) / 2 - (s.top + s.bottom) / 2) < 2; }, msg: 'The text is not in the middle from top to bottom yet.' }
            ],
            hint1: 'A gradient is a background <em>image</em>: <code>background: linear-gradient(135deg, colour1, colour2);</code>',
            hint2: 'For the centring, add <code>display: flex;</code>, <code>justify-content: center;</code> and <code>align-items: center;</code> to <code>.banner</code>.',
            why: '<code>justify-content</code> centres along the main axis and <code>align-items</code> across it. Together they put the text in the exact middle. This also needs a height, or there is no space to centre in.'
        },
        {
            id: 'web-book-shelf', tier: 3, type: 'web', title: 'A shelf of books that wraps', module: 6, chapter: 11,
            task: 'The five book cards squeeze into one row. Change the CSS so that:<ul><li>the cards wrap onto a new row when there is no room</li><li>there is a <code>16px</code> gap between cards, across and down</li><li>each card grows to fill the empty space in its row (<code>flex-grow</code>)</li></ul>',
            starter: page(
                '.shelf {\n    display: flex;\n}\n.book {\n    width: 200px;\n    padding: 16px;\n    background-color: #fef3c7;\n    border: 2px solid #b45309;\n}',
                '<div class="shelf">\n    <div class="book">Atlas of Rivers</div>\n    <div class="book">Stars and Planets</div>\n    <div class="book">The Kind Gardener</div>\n    <div class="book">Clean Water for All</div>\n    <div class="book">Great Scholars of the Past</div>\n</div>'),
            solution: page(
                '.shelf {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 16px;\n}\n.book {\n    width: 200px;\n    padding: 16px;\n    background-color: #fef3c7;\n    border: 2px solid #b45309;\n    flex-grow: 1;\n}',
                '<div class="shelf">\n    <div class="book">Atlas of Rivers</div>\n    <div class="book">Stars and Planets</div>\n    <div class="book">The Kind Gardener</div>\n    <div class="book">Clean Water for All</div>\n    <div class="book">Great Scholars of the Past</div>\n</div>'),
            checks: [
                { test: (doc) => box(doc, '.book', 4).top > box(doc, '.book', 0).bottom, msg: 'The books still squeeze into one row. Let them wrap onto a new row.' },
                { test: (doc) => Math.abs(box(doc, '.book', 1).left - box(doc, '.book', 0).right - 16) < 1, msg: 'Put a gap of 16px between the books in a row.' },
                { test: (doc) => { const rows = [...doc.querySelectorAll('.book')].map(b => b.getBoundingClientRect()); const next = rows.find(r => r.top > rows[0].bottom); return next && Math.abs(next.top - rows[0].bottom - 16) < 1; }, msg: 'Put a gap of 16px between the rows too (the gap property does both).' },
                { test: (doc) => { const s = box(doc, '.shelf'); const all = [...doc.querySelectorAll('.book')].map(b => b.getBoundingClientRect()); const firstRow = all.filter(r => near(r.top, all[0].top)); return near(firstRow[firstRow.length - 1].right, s.right); }, msg: 'Let each book grow to fill the empty space with flex-grow: 1;' }
            ],
            hint1: 'Three properties go on the shelf or on the books: <code>flex-wrap</code>, <code>gap</code> and <code>flex-grow</code>.',
            hint2: 'On <code>.shelf</code> add <code>flex-wrap: wrap;</code> and <code>gap: 16px;</code>. On <code>.book</code> add <code>flex-grow: 1;</code>.',
            why: 'With <code>wrap</code> each card keeps its 200px and the extra cards start a new row. <code>flex-grow: 1</code> shares the space left over in each row, so the rows end neatly at the right edge.'
        },
        {
            id: 'web-science-grid', tier: 3, type: 'web', title: 'Science fair tiles', module: 7, chapter: 12,
            task: 'Arrange the nine science fair tiles in a grid of <strong>3 equal columns</strong> with a <code>10px</code> gap. Use <code>display: grid</code> and the <code>fr</code> unit.',
            starter: page(
                '.grid {\n    /* your CSS here */\n}\n.tile {\n    height: 100px;\n    background-color: #0e7490;\n    color: white;\n    font-size: 20px;\n}',
                '<div class="grid">\n    <div class="tile">Solar oven</div>\n    <div class="tile">Water filter</div>\n    <div class="tile">Wind meter</div>\n    <div class="tile">Seed lab</div>\n    <div class="tile">Moon phases</div>\n    <div class="tile">Rain gauge</div>\n    <div class="tile">Compost bin</div>\n    <div class="tile">Magnet maze</div>\n    <div class="tile">Bee hotel</div>\n</div>'),
            solution: page(
                '.grid {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    gap: 10px;\n}\n.tile {\n    height: 100px;\n    background-color: #0e7490;\n    color: white;\n    font-size: 20px;\n}',
                '<div class="grid">\n    <div class="tile">Solar oven</div>\n    <div class="tile">Water filter</div>\n    <div class="tile">Wind meter</div>\n    <div class="tile">Seed lab</div>\n    <div class="tile">Moon phases</div>\n    <div class="tile">Rain gauge</div>\n    <div class="tile">Compost bin</div>\n    <div class="tile">Magnet maze</div>\n    <div class="tile">Bee hotel</div>\n</div>'),
            checks: [
                { test: (doc, win) => cs(doc, win, '.grid').display === 'grid', msg: 'The container needs display: grid;' },
                { test: (doc) => { const t = (i) => box(doc, '.tile', i).top; return near(t(0), t(1)) && near(t(1), t(2)) && t(3) > t(0); }, msg: 'Make three columns, so three tiles sit in each row.' },
                { test: (doc) => { const w = (i) => box(doc, '.tile', i).width; return near(w(0), w(1)) && near(w(1), w(2)); }, msg: 'The three columns should be the same width (use 1fr for each).' },
                { test: (doc) => near(box(doc, '.tile', 1).left - box(doc, '.tile', 0).right, 10) && near(box(doc, '.tile', 3).top - box(doc, '.tile', 0).bottom, 10), msg: 'Put a 10px gap between the tiles, across and down.' }
            ],
            hint1: 'Start with <code>display: grid;</code> on <code>.grid</code>, then describe the columns.',
            hint2: '<code>grid-template-columns: repeat(3, 1fr);</code> (the same as <code>1fr 1fr 1fr</code>) and <code>gap: 10px;</code>.',
            why: '<code>1fr</code> is one share of the free space, so three <code>1fr</code> columns are always equal. The grid makes new rows by itself as more tiles arrive.'
        },
        {
            id: 'web-clubs-responsive', tier: 3, type: 'web', title: 'Clubs page: phone first', module: 8, chapter: 14,
            task: 'The clubs page shows one column, which is right for phones. Add a <strong>media query</strong> with <code>min-width: 600px</code> so that on wider screens the three clubs sit side by side in <strong>3 equal columns</strong>. Phones must keep one column.',
            starter: page(
                '.clubs {\n    display: grid;\n    grid-template-columns: 1fr;\n    gap: 12px;\n}\n.club {\n    padding: 16px;\n    background-color: #ecfdf5;\n    border: 2px solid #047857;\n}\n/* On screens 600px and wider: three columns */',
                '<div class="clubs">\n    <div class="club">Science Club</div>\n    <div class="club">Reading Club</div>\n    <div class="club">Gardening Club</div>\n</div>'),
            solution: page(
                '.clubs {\n    display: grid;\n    grid-template-columns: 1fr;\n    gap: 12px;\n}\n.club {\n    padding: 16px;\n    background-color: #ecfdf5;\n    border: 2px solid #047857;\n}\n@media (min-width: 600px) {\n    .clubs {\n        grid-template-columns: repeat(3, 1fr);\n    }\n}',
                '<div class="clubs">\n    <div class="club">Science Club</div>\n    <div class="club">Reading Club</div>\n    <div class="club">Gardening Club</div>\n</div>'),
            checks: [
                { test: (doc) => { const t = (i) => box(doc, '.club', i).top; return near(t(0), t(1)) && near(t(1), t(2)); }, msg: 'On this 800px-wide screen the three clubs should sit side by side.' },
                { test: (doc) => { const w = (i) => box(doc, '.club', i).width; return near(w(0), w(1)) && near(w(1), w(2)); }, msg: 'The three columns should be the same width.' },
                {
                    test: (doc) => [...doc.styleSheets].some(s => [...s.cssRules].some(r => {
                        if (!r.media) return false;
                        const m = /min-width:\s*([\d.]+)px/.exec(r.media.mediaText);
                        return m && +m[1] > 390 && +m[1] <= 800 && /grid-template-columns/.test(r.cssText);
                    })),
                    msg: 'Put the three-column rule inside @media (min-width: 600px) { ... } so phones keep one column.'
                }
            ],
            hint1: 'Keep the one-column rule as it is. Add a new block below it that only works on wide screens.',
            hint2: '<code>@media (min-width: 600px) { .clubs { grid-template-columns: repeat(3, 1fr); } }</code>',
            why: 'Phone first: the normal rules are for small screens, and <code>min-width</code> queries add changes as the screen gets wider. Here the frame is 800px wide, so the query is on and you see three columns.'
        },
        {
            id: 'web-brand-variable', tier: 3, type: 'web', title: 'One colour, one place', chapter: 7,
            task: 'The charity page uses the colour <code>#0f766e</code> in two places. Make a CSS variable <code>--brand</code> on <code>:root</code> with that colour, and use <code>var(--brand)</code> for the heading colour <em>and</em> the button background.',
            starter: page(
                ':root {\n    /* make --brand here */\n}\nh1 {\n    color: #0f766e;\n}\n.btn {\n    background-color: #0f766e;\n    color: white;\n    border: none;\n    padding: 10px 18px;\n}',
                '<h1>Charity Week</h1>\n<p>Help us pack food boxes for families in need.</p>\n<button class="btn">Volunteer</button>'),
            solution: page(
                ':root {\n    --brand: #0f766e;\n}\nh1 {\n    color: var(--brand);\n}\n.btn {\n    background-color: var(--brand);\n    color: white;\n    border: none;\n    padding: 10px 18px;\n}',
                '<h1>Charity Week</h1>\n<p>Help us pack food boxes for families in need.</p>\n<button class="btn">Volunteer</button>'),
            checks: [
                { test: (doc, win) => win.getComputedStyle(doc.documentElement).getPropertyValue('--brand').trim() !== '', msg: 'Make the variable on :root, for example --brand: #0f766e;' },
                { test: (doc, win) => cs(doc, win, 'h1').color === 'rgb(15, 118, 110)' && cs(doc, win, '.btn').backgroundColor === 'rgb(15, 118, 110)', msg: 'The heading and the button should still be #0f766e.' },
                {
                    test: (doc, win) => {
                        doc.documentElement.style.setProperty('--brand', '#7c2d12');
                        return cs(doc, win, 'h1').color === 'rgb(124, 45, 18)' && cs(doc, win, '.btn').backgroundColor === 'rgb(124, 45, 18)';
                    },
                    msg: 'Use var(--brand) for the heading colour and for the button background, so changing --brand changes both.'
                }
            ],
            hint1: 'A variable name starts with two dashes. You read it back with <code>var(...)</code>.',
            hint2: 'In <code>:root</code> write <code>--brand: #0f766e;</code>. Then replace both <code>#0f766e</code> values with <code>var(--brand)</code>.',
            why: 'Now the colour lives in one place. To change the page theme you edit one line, and every rule that uses <code>var(--brand)</code> follows. The check changed <code>--brand</code> to a brown and saw both parts change.'
        }
    ];
})();
