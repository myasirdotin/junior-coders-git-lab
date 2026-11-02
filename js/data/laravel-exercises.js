/**
 * Junior Coders - Laravel practice exercises (used by Learning Laravel/exercises.html)
 *
 * Laravel cannot run in a browser, so every task is checked by the page itself:
 *   predict : read Blade or route code and type what the page shows
 *   fill    : type the missing word shown as ____ (`answers` lists every accepted spelling)
 *   choice  : pick one option (`answer` is its index)
 *   bug     : tap the line with the mistake (`bad` is its index, or a list when either line counts),
 *             then read the fix
 *   order   : put the steps in order (`steps` is the right order; `swaps` lists pairs of
 *             step indexes whose order does not matter)
 *   rules   : write a $request->validate([...]) call; `fields` lists the rules each field needs
 *             (between:a,b counts as min:a + max:b; unique:table,field counts as unique:table);
 *             `forbid` lists rules that would change the meaning (string on a number field)
 *   code    : write a few lines; each `checks` entry is a pattern the answer must (or, with
 *             `not: true`, must not) contain, with the message shown when it fails
 *
 * Every example is the school library app from book-laravel (Book, Member, Loan, Donation).
 * Tiers follow the site rule: 1 = recall / warm-up, 2 = application, 3 = problem-solving.
 * LARAVEL_BUILDS is the "Build it on your own XAMPP" checklist shown under the exercises.
 * LARAVEL_CHECK (end of file) holds the answer checks, shared by the page and
 * scripts/check-laravel-exercises.js. Run that script after any edit.
 */
window.LARAVEL_EXERCISES = [
    // ── Tier 1: warm-up ──
    {
        id: 'fill-route-get', tier: 1, type: 'fill', title: 'A page for /about', module: 2, chapter: 4,
        task: 'A visitor types <code>/about</code> in the address bar. Which word is missing in <code>routes/web.php</code>?',
        code: "Route::____('/about', function () {\n    return view('about');\n});",
        answers: ['get'],
        why: 'Typing an address in the browser sends a <strong>GET</strong> request, so the route is <code>Route::get()</code>. <code>Route::post()</code> is for forms that send data.'
    },
    {
        id: 'predict-route-param', tier: 1, type: 'predict', title: 'Book number 7', module: 2, chapter: 5,
        task: 'A student opens <code>/books/7</code>. What text does the page show?',
        code: "Route::get('/books/{id}', function ($id) {\n    return \"Book number $id\";\n});",
        answers: ['Book number 7'],
        why: '<code>{id}</code> catches the part of the address after <code>/books/</code>, so <code>$id</code> is <code>7</code>. Inside double quotes PHP puts the value in the text.'
    },
    {
        id: 'choice-mvc-model', tier: 1, type: 'choice', title: 'Who talks to the database?', module: 1, chapter: 2,
        task: 'In the library app, which file reads and saves rows in the <code>books</code> table?',
        options: ['<code>routes/web.php</code>', '<code>app/Http/Controllers/BookController.php</code>', '<code>app/Models/Book.php</code>', '<code>resources/views/books/index.blade.php</code>'],
        answer: 2,
        why: 'The <strong>Model</strong> (<code>Book</code>) talks to the table. The route picks the controller, the controller asks the model, and the view only shows what it is given.'
    },
    {
        id: 'predict-blade-echo', tier: 1, type: 'predict', title: 'Welcome message', module: 4, chapter: 10,
        task: 'The controller runs <code>return view(\'welcome-member\', [\'name\' =&gt; \'Maryam\']);</code>. What text does this view show?',
        code: '<p>Welcome to the library, {{ $name }}!</p>',
        answers: ['Welcome to the library, Maryam!'],
        why: '<code>{{ $name }}</code> prints the value the controller passed in, safely escaped.'
    },
    {
        id: 'choice-make-controller', tier: 1, type: 'choice', title: 'Make a controller', module: 3, chapter: 7,
        task: 'Which command creates <code>app/Http/Controllers/BookController.php</code>?',
        options: ['<code>composer make:controller BookController</code>', '<code>php artisan make:controller BookController</code>', '<code>php artisan new:controller BookController</code>', '<code>php artisan make:model BookController</code>'],
        answer: 1,
        why: 'Artisan makes Laravel files: <code>php artisan make:controller</code>. Composer downloads packages; <code>make:model</code> makes a model, not a controller.'
    },
    {
        id: 'fill-csrf', tier: 1, type: 'fill', title: 'The form\'s security line', module: 7, chapter: 21,
        task: 'Every POST form needs one Blade line, or Laravel answers <strong>419 Page Expired</strong>. Type the missing line.',
        code: "<form method=\"POST\" action=\"{{ route('books.store') }}\">\n    ____\n    <input type=\"text\" name=\"title\">\n    <button type=\"submit\">Save</button>\n</form>",
        answers: ['@csrf'],
        why: '<code>@csrf</code> adds a hidden token. Laravel checks it so another website cannot send forms in your name.'
    },

    // ── Tier 2: apply ──
    {
        id: 'order-request-journey', tier: 2, type: 'order', title: 'The journey of a request', module: 1, chapter: 2,
        task: 'A student opens <code>/books</code>. Put what happens in order, from the first step to the last.',
        steps: [
            'The browser sends a GET request for /books',
            'routes/web.php matches /books and calls BookController\'s index method',
            'The controller asks the Book model for the books',
            'The model runs a SELECT query on the books table',
            'The controller passes $books to the books.index view',
            'Blade turns the view into HTML and the browser shows it'
        ],
        why: 'Route → controller → model → view: every Laravel page follows this path.'
    },
    {
        id: 'bug-missing-get', tier: 2, type: 'bug', title: 'The empty "Available now" page', module: 5, chapter: 13,
        task: 'This method should list the books with copies on the shelf, but the page shows nothing useful. Tap the line with the mistake.',
        lines: [
            'public function available()',
            '{',
            "    $books = Book::where('copies', '>', 0);",
            "    return view('books.available', ['books' => $books]);",
            '}'
        ],
        bad: 2,
        fix: "$books = Book::where('copies', '>', 0)->get();",
        why: 'Without <code>-&gt;get()</code> the query only describes what to fetch; it never runs. <code>get()</code> runs it and returns the books.'
    },
    {
        id: 'bug-csrf-outside', tier: 2, type: 'bug', title: '419 Page Expired', module: 7, chapter: 21,
        task: 'This form has <code>@csrf</code>, yet saving still shows <strong>419 Page Expired</strong>. Tap the line with the mistake.',
        lines: [
            '@csrf',
            "<form method=\"POST\" action=\"{{ route('books.store') }}\">",
            "    <input type=\"text\" name=\"title\" value=\"{{ old('title') }}\">",
            '    <button type="submit">Save</button>',
            '</form>'
        ],
        bad: 0,
        fix: "<form method=\"POST\" action=\"{{ route('books.store') }}\">\n    @csrf\n    ...",
        why: 'The hidden token is printed <em>outside</em> the form, so the browser never sends it. Put <code>@csrf</code> just after the opening <code>&lt;form&gt;</code> tag.'
    },
    {
        id: 'fill-old', tier: 2, type: 'fill', title: 'Keep what they typed', module: 7, chapter: 20,
        task: 'The form came back with an error. Which helper puts back the title the user typed, so they do not type it again?',
        code: "<input type=\"text\" name=\"title\" value=\"{{ ____('title') }}\">",
        answers: ['old'],
        why: '<code>old(\'title\')</code> returns what was typed before the form was sent back. <code>old(\'title\', $book-&gt;title)</code> also gives a default for edit forms.'
    },
    {
        id: 'predict-forelse', tier: 2, type: 'predict', title: 'No loans yet', module: 4, chapter: 12,
        task: 'Bilal has not borrowed anything, so <code>$loans</code> is empty. What text does this part of the page show?',
        code: "@forelse ($loans as $loan)\n    <li>{{ $loan->book->title }}</li>\n@empty\n    <p>No books borrowed yet.</p>\n@endforelse",
        answers: ['No books borrowed yet.', 'No books borrowed yet'],
        why: '<code>@forelse</code> loops like <code>@foreach</code>, but when the list is empty it shows the <code>@empty</code> part instead.'
    },
    {
        id: 'predict-escape', tier: 2, type: 'predict', title: 'A notice with tags', module: 4, chapter: 10,
        task: 'A member typed <code>&lt;b&gt;Eid&lt;/b&gt; holiday</code> into a notice form. What text does the reader see on the page?',
        code: '<p>{{ $notice }}</p>',
        answers: ['<b>Eid</b> holiday'],
        why: '<code>{{ }}</code> escapes HTML, so the tags are shown as plain text, not run. That is what keeps visitors safe from code hidden in what others typed.'
    },
    {
        id: 'choice-grade-rule', tier: 2, type: 'choice', title: 'Grade 6 to 10', module: 7, chapter: 20,
        task: 'The member form has a <code>grade</code> field. It must be filled in and be a whole number from 6 to 10. Which rule is right?',
        options: [
            "<code>'grade' =&gt; 'required|string|max:10'</code>",
            "<code>'grade' =&gt; 'required|integer|min:6|max:10'</code>",
            "<code>'grade' =&gt; 'integer|between:6-10'</code>",
            "<code>'grade' =&gt; 'required|min:6'</code>"
        ],
        answer: 1,
        why: '<code>integer</code> makes <code>min</code> and <code>max</code> compare the number itself. With <code>string</code>, <code>max:10</code> means "at most 10 characters". <code>between</code> takes <code>6,10</code>, not <code>6-10</code>, and that option is also missing <code>required</code>.'
    },
    {
        id: 'bug-raw-bio', tier: 2, type: 'bug', title: 'The member profile', module: 4, chapter: 10,
        task: 'Members write their own short bio. One line on this profile page is unsafe. Tap it.',
        lines: [
            '<h1>{{ $member->name }}</h1>',
            '<p>Grade {{ $member->grade }}</p>',
            '<p>{!! $member->bio !!}</p>',
            "<a href=\"{{ route('members.index') }}\">All members</a>"
        ],
        bad: 2,
        fix: '<p>{{ $member->bio }}</p>',
        why: '<code>{!! !!}</code> prints raw HTML. A member could type a <code>&lt;script&gt;</code> that runs for every visitor. Use <code>{!! !!}</code> only for HTML your own app made; anything a person typed goes in <code>{{ }}</code>.'
    },
    {
        id: 'order-add-column', tier: 2, type: 'order', title: 'Add a shelf column', module: 6, chapter: 17,
        task: 'The books table already exists and has real rows. Put the steps for adding a <code>shelf</code> column in order.',
        steps: [
            'Run php artisan make:migration add_shelf_to_books_table',
            "In up(), write $table->string('shelf', 10)->nullable()->after('author');",
            "In down(), write $table->dropColumn('shelf');",
            'Run php artisan migrate',
            'Check the new column in phpMyAdmin or with php artisan migrate:status'
        ],
        swaps: [[1, 2]],
        why: 'Never edit a migration that already ran; make a new one. <code>up()</code> and <code>down()</code> can be written in either order, but both come before <code>migrate</code>.'
    },

    // ── Tier 3: challenge ──
    {
        id: 'rules-member', tier: 3, type: 'rules', title: 'Check the member form', module: 7, chapter: 20,
        task: 'Write the <code>$request-&gt;validate([...])</code> call for the new-member form:<br>• <code>name</code>: filled in, text, at most 100 characters<br>• <code>email</code>: filled in, a real email address, not used by another member (table <code>members</code>)<br>• <code>grade</code>: filled in, a whole number from 6 to 10',
        starter: "$data = $request->validate([\n    'name' => '',\n    'email' => '',\n    'grade' => '',\n]);",
        fields: {
            name: ['required', 'string', 'max:100'],
            email: ['required', 'email', 'unique:members'],
            grade: ['required', 'integer', 'min:6', 'max:10']
        },
        forbid: { grade: ['string'] },
        solution: "$data = $request->validate([\n    'name' => 'required|string|max:100',\n    'email' => 'required|email|unique:members,email',\n    'grade' => 'required|integer|min:6|max:10',\n]);",
        hint1: 'Rules are joined with <code>|</code>, for example <code>\'required|string\'</code>.',
        hint2: '"Not used by another member" is <code>unique:members,email</code>. "Whole number" is <code>integer</code>.',
        why: 'If any rule fails, Laravel sends the visitor back to the form with <code>$errors</code> and <code>old()</code> filled in. Your code below <code>validate()</code> only runs when every rule passes.'
    },
    {
        id: 'code-my-loans-route', tier: 3, type: 'code', title: 'A private "My loans" page', module: 8, chapter: 24,
        task: 'Write <strong>one route</strong> in <code>routes/web.php</code>: the address <code>/my-loans</code> runs the <code>mine</code> method of <code>LoanController</code>, is named <code>loans.mine</code>, and only logged-in members may open it.',
        starter: "Route::get(",
        checks: [
            { re: /(Route::|->\s*)get\(\s*['"]\/?my-loans['"]/, msg: 'Start with <code>Route::get(\'/my-loans\', ...)</code>: opening a page is a GET request.' },
            { re: /\[\s*LoanController::class\s*,\s*['"]mine['"]\s*\]/, msg: 'Point the route at the controller like this: <code>[LoanController::class, \'mine\']</code>.' },
            { re: /->\s*name\(\s*['"]loans\.mine['"]\s*\)/, msg: 'Give it a name with <code>-&gt;name(\'loans.mine\')</code>.' },
            { re: /middleware\(\s*(\[\s*)?['"]auth['"]/, msg: 'Only logged-in members: add <code>-&gt;middleware(\'auth\')</code>.' }
        ],
        solution: "Route::get('/my-loans', [LoanController::class, 'mine'])\n    ->middleware('auth')\n    ->name('loans.mine');",
        hint1: 'The second part of <code>Route::get()</code> is an array: the controller class and the method name.',
        hint2: 'Chain two methods after it: one for the name, one for the <code>auth</code> middleware.',
        why: 'A guest who opens <code>/my-loans</code> is sent to the login page and comes back after logging in. A member\'s loans are their private record: keeping them behind <code>auth</code> is part of <em>amānah</em>.'
    },
    {
        id: 'code-store-book', tier: 3, type: 'code', title: 'Save a new book', module: 7, chapter: 20,
        task: 'Write the <code>store</code> method of <code>BookController</code>. It must check the form (<code>title</code> and <code>author</code> required, at most 255 characters; <code>copies</code> a whole number, at least 0), save the book with <code>Book::create()</code>, then go back to the <code>books.index</code> page.',
        starter: "public function store(Request $request)\n{\n    \n}",
        checks: [
            { re: /\$request\s*->\s*validate\(/, msg: 'Check the form first with <code>$request-&gt;validate([...])</code>.' },
            { re: /['"]title['"]\s*=>\s*[\['"][^\n]*required/, msg: 'Give <code>title</code> a rule list that starts with <code>required</code>.' },
            { re: /['"]copies['"]\s*=>\s*[\['"][^\n]*integer/, msg: '<code>copies</code> needs the <code>integer</code> rule (and <code>min:0</code>).' },
            { re: /\$request\s*->\s*all\(\)/, not: true, msg: 'Do not save <code>$request-&gt;all()</code>: it contains everything the visitor sent. Save only the checked data that <code>validate()</code> returns.' },
            { re: /=\s*\$request\s*->\s*validate\(/, msg: 'Keep what <code>validate()</code> returns, for example <code>$data = $request-&gt;validate([...]);</code>' },
            { re: /Book::create\(\s*\$\w+\s*\)/, msg: 'Save it with <code>Book::create($data)</code>.' },
            { re: /return\s+redirect\(\)\s*->\s*route\(\s*['"]books\.index['"]/, msg: 'Finish with <code>return redirect()-&gt;route(\'books.index\');</code>' }
        ],
        solution: "public function store(Request $request)\n{\n    $data = $request->validate([\n        'title' => 'required|string|max:255',\n        'author' => 'required|string|max:255',\n        'copies' => 'required|integer|min:0',\n    ]);\n\n    Book::create($data);\n\n    return redirect()->route('books.index');\n}",
        hint1: 'Three steps: <code>validate()</code>, <code>Book::create()</code>, <code>redirect()</code>.',
        hint2: '<code>Book::create($data)</code> only fills columns listed in <code>$fillable</code> in <code>Book.php</code>.',
        why: 'Validate → save → redirect is the pattern for every form in the book. Redirecting after a POST stops the browser sending the form twice when someone presses refresh.'
    },
    {
        id: 'bug-login-message', tier: 3, type: 'bug', title: 'A login message that says too much', module: 8, chapter: 23,
        task: 'This login works, but one line gives a stranger information they should not have. Tap it.',
        lines: [
            '$credentials = $request->validate([',
            "    'email' => 'required|email',",
            "    'password' => 'required|string',",
            ']);',
            "if (Auth::attempt($credentials, $request->boolean('remember'))) {",
            '    $request->session()->regenerate();',
            "    return redirect()->intended(route('books.index'));",
            '}',
            "$known = User::where('email', $request->email)->exists();",
            "return back()->withErrors(['email' => $known ? 'Wrong password.' : 'No member has this email address.']);"
        ],
        bad: [9, 8],
        fix: "return back()\n    ->withErrors(['email' => 'These credentials do not match our records.'])\n    ->onlyInput('email');",
        why: 'Two different messages tell a stranger which emails belong to members: they just try addresses until they see "Wrong password". Give one message for a wrong email <em>and</em> a wrong password, and drop the <code>$known</code> line. Protecting members\' details is <em>amānah</em>.'
    },
    {
        id: 'order-donations', tier: 3, type: 'order', title: 'A Donations table from nothing', module: 6, chapter: 18,
        task: 'The school wants to record donated books. There is no Donation code yet. Put the steps in order, ending with two donations saved in the database.',
        steps: [
            'Run php artisan make:model Donation -m',
            "In the new migration's up(), add the donor_name, book_id (foreignId()->constrained()), quantity and received_on columns",
            'Run php artisan migrate',
            "In app/Models/Donation.php, add the columns to protected $fillable",
            'Open php artisan tinker and run Donation::create([...]) twice',
            'Open phpMyAdmin and check the two rows in the donations table'
        ],
        swaps: [[2, 3]],
        why: '<code>-m</code> makes the model and its migration together. Tinker\'s <code>create()</code> needs the table (after <code>migrate</code>) and the <code>$fillable</code> list; those two can be done in either order.'
    }
];

window.LARAVEL_BUILDS = [
    {
        id: 'setup', title: 'Set up the library app', chapters: '1 and 3',
        steps: [
            'Start Apache and MySQL in the XAMPP Control Panel.',
            'Check PHP and Composer: <code>php -v</code> and <code>composer -V</code> in a terminal.',
            'Create the project: <code>composer create-project laravel/laravel library-app</code>',
            'In phpMyAdmin, create an empty database called <code>library_app</code>.',
            'In <code>.env</code>, set <code>DB_CONNECTION=mysql</code> and <code>DB_DATABASE=library_app</code> (user <code>root</code>, empty password).',
            'Run <code>php artisan migrate</code> and see the new tables in phpMyAdmin.',
            'Run <code>php artisan serve</code> and open <code>http://127.0.0.1:8000</code>: the welcome page appears.'
        ]
    },
    {
        id: 'book-list', title: 'Show the book list', chapters: '7, 12, 13 and 17',
        steps: [
            'Run <code>php artisan make:model Book -m</code>.',
            'In the migration, add <code>title</code>, <code>author</code>, <code>isbn</code> (unique) and <code>copies</code> (default 1), then run <code>php artisan migrate</code>.',
            'In <code>Book.php</code>, add <code>protected $fillable = [\'title\', \'author\', \'isbn\', \'copies\'];</code>',
            'Add three books with <code>php artisan tinker</code> and <code>Book::create([...])</code>.',
            'Run <code>php artisan make:controller BookController</code> and write an <code>index</code> method that sends <code>Book::orderBy(\'title\')-&gt;get()</code> to a view.',
            'Add <code>Route::get(\'/books\', [BookController::class, \'index\'])-&gt;name(\'books.index\');</code>',
            'Make <code>resources/views/books/index.blade.php</code> with <code>@forelse</code> and <code>{{ $book-&gt;title }}</code>.',
            'Open <code>/books</code>: your three books appear, sorted A to Z.'
        ]
    },
    {
        id: 'add-book', title: 'Add a book with a checked form', chapters: '19, 20 and 21',
        steps: [
            'Add a <code>create</code> method and a route named <code>books.create</code> that shows the form.',
            'Write the form with <code>method="POST"</code>, <code>action="{{ route(\'books.store\') }}"</code> and <code>@csrf</code> inside it.',
            'Give every input <code>value="{{ old(\'...\') }}"</code> and an <code>@error</code> message under it.',
            'Write the <code>store</code> method: <code>validate()</code>, <code>Book::create($data)</code>, redirect to <code>books.index</code>.',
            'Send the form empty: the errors appear and nothing is saved.',
            'Remove <code>@csrf</code> once, send the form and see <strong>419 Page Expired</strong>. Put it back.',
            'Add a real book and see it in the list.'
        ]
    },
    {
        id: 'protect', title: 'Only logged-in staff can add books', chapters: '23 and 24',
        steps: [
            'Build register, login and logout as in Chapter 23 (or try a starter kit in a new project, Chapter 22).',
            'Put the <code>create</code> and <code>store</code> routes inside <code>Route::middleware(\'auth\')-&gt;group(function () { ... });</code>',
            'Log out and open <code>/books/create</code>: you are sent to the login page.',
            'Log in: you come back to the form.',
            'Show the "Add a book" link only inside <code>@auth ... @endauth</code>.',
            'Check that logout is a POST form with <code>@csrf</code>, not a link.'
        ]
    }
];

window.LARAVEL_CHECK = (function () {
    const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Every right order as "0,1,2,...": the main one, plus each combination of the swappable pairs
    function acceptedOrders(ex) {
        let orders = [ex.steps.map((_, i) => i)];
        (ex.swaps || []).forEach(([a, b]) => {
            orders = orders.concat(orders.map(o => o.map(i => (i === a ? b : i === b ? a : i))));
        });
        return orders.map(o => o.join(','));
    }

    // The rules written for one field, e.g. 'grade' => 'required|integer|between:6,10'
    function rulesFor(src, field) {
        const m = src.match(new RegExp(`['"]${field}['"]\\s*=>\\s*(\\[[^\\]]*\\]|'[^']*'|"[^"]*")`));
        if (!m) return null;
        const raw = m[1].startsWith('[')
            ? (m[1].match(/'[^']*'|"[^"]*"/g) || []).map(s => s.slice(1, -1))
            : m[1].slice(1, -1).split('|');
        const out = [];
        raw.map(t => t.trim()).filter(Boolean).forEach(t => {
            const between = t.match(/^between:(\d+),(\d+)$/);
            const unique = t.match(/^unique:([^,]+),(.+)$/);
            if (between) out.push('min:' + between[1], 'max:' + between[2]);
            else if (unique && unique[2].trim() === field) out.push('unique:' + unique[1]);
            else out.push(t);
        });
        return out;
    }

    // '' when the answer is right, otherwise the message to show
    function checkRules(ex, src) {
        if (!/->\s*validate\(\s*\[/.test(src)) return 'Write the rules inside <code>$request-&gt;validate([ ... ])</code>.';
        for (const [field, need] of Object.entries(ex.fields)) {
            const have = rulesFor(src, field);
            if (!have) return `Add a line for <code>'${field}' =&gt; '...'</code>.`;
            const missing = need.filter(r => !have.includes(r));
            if (missing.length) return `<code>${field}</code> still needs: <code>${missing.map(esc).join('</code>, <code>')}</code>.`;
            const wrong = ((ex.forbid || {})[field] || []).filter(r => have.includes(r));
            if (wrong.length) return `<code>${field}</code> should not have <code>${wrong.map(esc).join('</code>, <code>')}</code>: it changes what the other rules mean.`;
        }
        return '';
    }

    function checkCode(ex, src) {
        for (const c of ex.checks) {
            if (c.re.test(src) === !!c.not) return c.msg;
        }
        return '';
    }

    return { acceptedOrders, checkRules, checkCode };
})();
