/**
 * Junior Coders - Cybersecurity practice (Learning Cybersecurity/exercises.html), run by js/practice-cards.js.
 * Format: see the header of js/practice-cards.js. `js` tasks really run (in a Web Worker) and are compared with the
 * solution; `code` tasks (PHP) are checked for their key parts, nothing runs. After any edit: node scripts/check-practice.js
 * Lessons: 1 Defender's Mindset & CIA (ch1), 2 Passwords, Entropy & MFA (ch2), 3 Social Engineering & Phishing (ch3–4),
 * 4 XSS & Code Injection (ch5–6, headers ch9), 5 Database Defense & SQLi (ch7), 6 Access Control & CSRF (ch8),
 * 7 Cryptography & Secure Channels (ch10–11), 8 Hygiene, Backups & Forensics (ch12–14).
 * Defence only (GEMINI §1, security-tutor): no attack inputs, only the risky line and its fix. Scenarios follow GEMINI §1.
 */
(window.JC_PRACTICE = window.JC_PRACTICE || {}).cybersecurity = [
    // ── Tier 1: warm-up ──
    {
        id: 'choice-cia', tier: 1, type: 'choice', title: 'Which goal was broken?', module: 1, chapter: 1,
        task: 'On results day, Maryam opens the school report-card portal. Her Science mark has been secretly changed from 72 to 27. Which goal of the CIA Triad was broken?',
        options: ['Confidentiality (keeping secrets)', 'Integrity (keeping things correct)', 'Availability (keeping things open)'],
        answer: 1,
        why: 'Nobody read a secret and the site did not go down: a value was <strong>changed</strong> without permission. That breaks <strong>integrity</strong>. A defence: only teachers can edit marks, and every change is logged.'
    },
    {
        id: 'choice-mfa', tier: 1, type: 'choice', title: 'Is it really MFA?', module: 2, chapter: 2,
        task: 'Which login is real <strong>multi-factor</strong> authentication?',
        options: [
            'A password, then a second password',
            'A password, then the name of your first school',
            'A password, then a 6-digit code from an authenticator app on your phone',
            'One very long passphrase instead of a short password'
        ],
        answer: 2,
        why: 'MFA needs factors of <strong>different kinds</strong>: something you know (the password) plus something you have (your phone). Two passwords, or a password and a question, are both "something you know".'
    },
    {
        id: 'predict-pins', tier: 1, type: 'predict', title: 'How many PINs?', module: 2, chapter: 2,
        task: 'A door keypad uses a 4-digit PIN. How many different PINs are possible? Type the number.',
        code: 'PIN length:   4 digits\nEach digit:   0 1 2 3 4 5 6 7 8 9\nLowest PIN:   0000\nHighest PIN:  9999',
        answers: ['10000', '10,000', '10 000'],
        why: 'Each place has 10 choices, so 10 × 10 × 10 × 10 = <strong>10,000</strong>. A computer can try them all in moments, which is why a 4-digit PIN (about 13 bits) is only safe when the keypad locks after a few wrong tries.'
    },
    {
        id: 'fill-textcontent', tier: 1, type: 'fill', title: 'Show it as plain text', module: 4, chapter: 6,
        task: 'A visitor\'s comment must be shown on the page as plain text, so that any tags in it do nothing. Which property is safe to use?',
        code: 'const userComment = "<b>Great</b> book";\ncommentDiv.____ = userComment;',
        answers: ['textContent'],
        why: '<code>textContent</code> shows the exact characters, so <code>&lt;b&gt;Great&lt;/b&gt; book</code> appears as text. <code>innerHTML</code> would let the browser obey the tags, and a tag could also be a script.'
    },
    {
        id: 'choice-base64', tier: 1, type: 'choice', title: 'A "hidden" password', module: 7, chapter: 10,
        task: 'A website stores a password as <code>c2VjcmV0MTIz</code>. It is Base64. What is true?',
        options: [
            'It is encrypted, so nobody can read it without the key.',
            'It is encoding: there is no key, and anyone can decode it in seconds.',
            'It is a hash, so it can never be turned back.',
            'It is a slow, salted password hash like bcrypt.'
        ],
        answer: 1,
        why: 'Base64 is <strong>encoding</strong>: it only changes the format, and anyone can reverse it with free tools (this one decodes to <code>secret123</code>). Passwords must be stored with a slow password hash, such as PHP\'s <code>password_hash()</code>.'
    },
    {
        id: 'choice-lookalike', tier: 1, type: 'choice', title: 'Whose website is it?', module: 3, chapter: 4,
        task: 'Your school library\'s real site is <code>library.example.org</code>. Which link really goes there?',
        options: [
            '<code>https://library.examp1e.org/login</code>',
            '<code>https://library-example.org/login</code>',
            '<code>https://library.example.org.login-check.example.net/</code>',
            '<code>https://library.example.org/account/loans</code>'
        ],
        answer: 3,
        why: 'Find the first single <code>/</code> after <code>https://</code> and read just to its left: the last two parts name the owner. Only the last link ends in <code>example.org</code>. The others are a digit 1 for the letter l, a different domain with a dash, and a site owned by <code>example.net</code>.'
    },

    // ── Tier 2: apply ──
    {
        id: 'order-phishing', tier: 2, type: 'order', title: 'A suspicious email', module: 3, chapter: 4,
        task: 'An email says: "URGENT: your library account closes today. Verify here." Put the safe steps in order.',
        steps: [
            'Stop: do not click the link or open any attachment.',
            'Read the sender\'s full address and its domain, not just the display name.',
            'Hover over the link (or press and hold on a phone) to see where it really goes.',
            'Check another way: open the library website yourself by typing its address.',
            'Report the email with the "Report phishing" button, then delete it.'
        ],
        swaps: [[1, 2]],
        why: 'First stop, so the pressure cannot rush you. Then look at the clues (sender and link, in either order). Then check through a channel the trickster does not control. Finally report it, which protects other people too.'
    },
    {
        id: 'bug-prepare-glued', tier: 2, type: 'bug', title: 'prepare(), but still risky', module: 5, chapter: 7,
        task: 'This code uses <code>prepare()</code>, but the search is still open to SQL injection. Tap the line with the mistake.',
        lines: [
            '$surname = $_GET["surname"] ?? "";',
            '$stmt = $pdo->prepare("SELECT id, surname FROM members WHERE surname = \'$surname\'");',
            '$stmt->execute();',
            '$member = $stmt->fetch(PDO::FETCH_ASSOC);'
        ],
        bad: [1, 2],
        fix: '$stmt = $pdo->prepare("SELECT id, surname FROM members WHERE surname = ?");\n$stmt->execute([$surname]);',
        why: '<code>prepare()</code> only protects values that are passed <strong>separately</strong>. Here <code>$surname</code> is already glued into the SQL text, so data and command are mixed again. Put a <code>?</code> in the SQL and hand the value to <code>execute()</code>.'
    },
    {
        id: 'bug-old-header', tier: 2, type: 'bug', title: 'A header that does nothing', module: 4, chapter: 9,
        task: 'This page wants a second layer against XSS, after escaping. One header line gives no real protection in today\'s browsers. Tap it.',
        lines: [
            '<?php',
            '// Security headers: sent before any HTML',
            'header(\'X-Content-Type-Options: nosniff\');',
            'header(\'X-Frame-Options: DENY\');',
            'header(\'X-XSS-Protection: 1; mode=block\');  // our XSS shield',
            'header(\'Referrer-Policy: strict-origin-when-cross-origin\');',
            '?>'
        ],
        bad: 4,
        fix: 'header("Content-Security-Policy: default-src \'self\'; object-src \'none\'; base-uri \'self\'; frame-ancestors \'none\'");',
        why: '<code>X-XSS-Protection</code> switched on a filter in old browsers. Edge removed it in 2018 and Chrome in 2019; Firefox never had it. The real second layer is a <strong>Content-Security-Policy</strong>: with <code>\'self\'</code>, scripts written inside the page are blocked.'
    },
    {
        id: 'code-prepared', tier: 2, type: 'code', title: 'Find a donor safely', module: 5, chapter: 7,
        task: 'The charity drive looks up a donor by email, but the email is glued into the SQL. Rewrite it as a <strong>prepared statement</strong>: a placeholder in the SQL, and the value passed to <code>execute()</code>.',
        starter: '<?php\n// Find a donor by email (risky: the input is glued into the SQL)\n$email = $_POST[\'email\'] ?? \'\';\n$sql = "SELECT name FROM donors WHERE email = \'$email\'";\n$result = $pdo->query($sql);\n$donor = $result->fetch(PDO::FETCH_ASSOC);',
        solution: '<?php\n// Find a donor by email (safe: prepared statement)\n$email = $_POST[\'email\'] ?? \'\';\n$stmt = $pdo->prepare("SELECT name FROM donors WHERE email = ?");\n$stmt->execute([$email]);\n$donor = $stmt->fetch(PDO::FETCH_ASSOC);',
        checks: [
            { re: /->\s*prepare\s*\(/, msg: 'Use <code>$pdo-&gt;prepare(...)</code> to send the command on its own.' },
            { re: /prepare\s*\(\s*("[^"]*\$|'[^']*\$)/, not: true, msg: 'The SQL inside <code>prepare()</code> still contains a <code>$</code> variable. Put a placeholder there instead.' },
            { re: /prepare\s*\(\s*("[^"]*(\?|:[A-Za-z_]\w*)[^"]*"|'[^']*(\?|:[A-Za-z_]\w*)[^']*')/, msg: 'Put a placeholder (<code>?</code> or a name like <code>:email</code>) where the email goes.' },
            { re: /->\s*execute\s*\(\s*\[[^\]]*\$(email|_POST)/, msg: 'Pass the email separately: <code>$stmt-&gt;execute([$email]);</code>' },
            { re: /->\s*query\s*\(/, not: true, msg: 'Do not run a glued string with <code>query()</code> any more: use <code>prepare()</code> and <code>execute()</code>.' }
        ],
        hint1: 'Replace <code>\'$email\'</code> in the SQL with <code>?</code> (no quotes around it).',
        hint2: '<code>$stmt = $pdo-&gt;prepare("SELECT ... WHERE email = ?");</code> then <code>$stmt-&gt;execute([$email]);</code> then fetch from <code>$stmt</code>.',
        why: 'The command and the data now travel separately. Whatever someone types, it is only ever the email being searched for, never part of the command. Names like <code>D\'Souza</code> work too.'
    },
    {
        id: 'code-password-hash', tier: 2, type: 'code', title: 'Store passwords the safe way', module: 2, chapter: 2,
        task: 'This sign-up and log-in code uses MD5, a fast hash. Change it to PHP\'s slow, salted password hash: <code>password_hash()</code> when saving and <code>password_verify()</code> when checking.',
        starter: '<?php\n// 1. Sign-up: $saved is what goes into the database\n$password = $_POST[\'password\'] ?? \'\';\n$saved = md5($password);\n\n// 2. Log-in: check what the member typed\n$typed = $_POST[\'password\'] ?? \'\';\nif (md5($typed) === $saved) {\n    echo "Welcome back!";\n} else {\n    echo "Wrong username or password.";\n}',
        solution: '<?php\n// 1. Sign-up: $saved is what goes into the database\n$password = $_POST[\'password\'] ?? \'\';\n$saved = password_hash($password, PASSWORD_DEFAULT);\n\n// 2. Log-in: check what the member typed\n$typed = $_POST[\'password\'] ?? \'\';\nif (password_verify($typed, $saved)) {\n    echo "Welcome back!";\n} else {\n    echo "Wrong username or password.";\n}',
        checks: [
            { re: /\b(md5|sha1)\s*\(|\bhash\s*\(\s*['"]sha/i, not: true, msg: 'MD5, SHA-1 and SHA-256 are fast hashes. Fast is bad for passwords: remove them.' },
            { re: /\$saved\s*=\s*password_hash\s*\(\s*\$password\s*,\s*PASSWORD_(DEFAULT|BCRYPT|ARGON2ID)\s*\)/, msg: 'Save <code>$saved = password_hash($password, PASSWORD_DEFAULT);</code>' },
            { re: /password_verify\s*\(\s*\$typed\s*,\s*\$saved\s*\)/, msg: 'Check the log-in with <code>password_verify($typed, $saved)</code>.' },
            { re: /===?\s*\$saved|\$saved\s*===?/, not: true, msg: 'Do not compare with <code>===</code>: the same password gives a different hash each time (the salt). Only <code>password_verify()</code> can check it.' }
        ],
        hint1: 'Two lines change: the one that makes <code>$saved</code>, and the <code>if</code> condition.',
        hint2: '<code>$saved = password_hash($password, PASSWORD_DEFAULT);</code> and <code>if (password_verify($typed, $saved)) {</code>',
        why: '<code>password_hash()</code> adds a random salt and makes each guess slow (bcrypt by default), so a stolen database is far harder to crack. Because of the salt, only <code>password_verify()</code> can tell whether a typed password matches.'
    },
    {
        id: 'code-escape-php', tier: 2, type: 'code', title: 'A safe guest book', module: 4, chapter: 6,
        task: 'The science fair guest book shows each visitor\'s message. Escape the message before you echo it, so any tags in it appear as plain text. Escape both kinds of quote marks too.',
        starter: '<?php\n// Show the visitor\'s message on the guest book page\n$message = $_POST[\'message\'] ?? \'\';\necho "<p>" . $message . "</p>";',
        solution: '<?php\n// Show the visitor\'s message on the guest book page\n$message = $_POST[\'message\'] ?? \'\';\necho "<p>" . htmlspecialchars($message, ENT_QUOTES, \'UTF-8\') . "</p>";',
        checks: [
            { re: /htmlspecialchars\s*\(\s*\$message\b/, msg: 'Pass <code>$message</code> through <code>htmlspecialchars()</code> before you echo it.' },
            { re: /ENT_QUOTES/, msg: 'Add <code>ENT_QUOTES</code> so both <code>"</code> and <code>\'</code> are escaped.' },
            { re: /(\.|echo|,)\s*\$message\s*(\.|;|,)/, not: true, msg: '<code>$message</code> is still echoed raw somewhere.' }
        ],
        hint1: 'Wrap <code>$message</code> in <code>htmlspecialchars( ... )</code> right where it is echoed.',
        hint2: '<code>htmlspecialchars($message, ENT_QUOTES, \'UTF-8\')</code>',
        why: 'Escaping turns <code>&lt;</code> into <code>&amp;lt;</code> and so on, so the browser <em>shows</em> tags instead of obeying them. Escape when you <strong>show</strong> data, every time.'
    },
    {
        id: 'js-count-combinations', tier: 2, type: 'js', title: 'How many guesses?', module: 2, chapter: 2,
        task: 'Write <code>countCombinations(chars, length)</code>. It returns how many different codes there are when each of <code>length</code> places can be any of <code>chars</code> characters. (A 4-digit PIN: <code>countCombinations(10, 4)</code> is 10000.)',
        starter: 'function countCombinations(chars, length) {\n    \n}',
        solution: 'function countCombinations(chars, length) {\n    let total = 1;\n    for (let i = 0; i < length; i++) {\n        total = total * chars;\n    }\n    return total;\n}',
        tests: [
            { expr: 'countCombinations(10, 4)', label: 'countCombinations(10, 4): 4-digit PIN' },
            { expr: 'countCombinations(10, 6)', label: 'countCombinations(10, 6): 6-digit PIN' },
            { expr: 'countCombinations(26, 3)', label: 'countCombinations(26, 3): 3 lowercase letters' },
            { expr: 'countCombinations(2, 8)', label: 'countCombinations(2, 8): 8 bits' }
        ],
        hint1: 'Start with <code>total = 1</code> and multiply by <code>chars</code> once for every place.',
        hint2: 'A <code>for</code> loop that runs <code>length</code> times: <code>total = total * chars;</code> (or use <code>chars ** length</code>).',
        why: 'Every extra place multiplies the work for a guesser. A 6-digit PIN has 1,000,000 choices; a 6-word passphrase from a 7,776-word list has about 2 × 10<sup>23</sup>. That is why length beats complexity.'
    },

    // ── Tier 3: challenge ──
    {
        id: 'js-escape-html', tier: 3, type: 'js', title: 'Build your own escaper', module: 4, chapter: 6,
        task: 'Write <code>escapeHtml(text)</code>. It returns the text with the five special characters of HTML replaced: <code>&amp;</code> → <code>&amp;amp;</code>, <code>&lt;</code> → <code>&amp;lt;</code>, <code>&gt;</code> → <code>&amp;gt;</code>, <code>"</code> → <code>&amp;quot;</code>, <code>\'</code> → <code>&amp;#039;</code> (the same as PHP\'s <code>htmlspecialchars</code> with <code>ENT_QUOTES</code>).',
        starter: 'function escapeHtml(text) {\n    // replace & < > " \' with their HTML entities\n    return text;\n}',
        solution: 'function escapeHtml(text) {\n    return text\n        .replaceAll("&", "&amp;")\n        .replaceAll("<", "&lt;")\n        .replaceAll(">", "&gt;")\n        .replaceAll(\'"\', "&quot;")\n        .replaceAll("\'", "&#039;");\n}',
        tests: [
            { expr: 'escapeHtml("Tom\'s <i>book</i>")' },
            { expr: 'escapeHtml(\'Bread & "honey"\')' },
            { expr: 'escapeHtml("5 > 3 && 2 < 4")' },
            { expr: 'escapeHtml("&lt;")', label: 'escapeHtml("&lt;"): text that already looks like an entity' },
            { expr: 'escapeHtml("Assalamu alaikum")', label: 'escapeHtml("Assalamu alaikum"): nothing to change' }
        ],
        hint1: '<code>text.replaceAll("&lt;", "&amp;lt;")</code> replaces every <code>&lt;</code>. Chain one <code>replaceAll</code> per character.',
        hint2: 'Replace <code>&amp;</code> <strong>first</strong>. If you do it last, the <code>&amp;</code> inside <code>&amp;lt;</code> gets replaced again and you get <code>&amp;amp;lt;</code>.',
        why: 'This is what <code>htmlspecialchars()</code> does for you on the server. Knowing why <code>&amp;</code> must come first is the kind of detail that makes a defence correct, not just nearly correct.'
    },
    {
        id: 'js-strong-password', tier: 3, type: 'js', title: 'The library\'s password rules', module: 2, chapter: 2,
        task: 'Write <code>isStrongPassword(pw, username)</code> for the library sign-up page. Return <code>true</code> only if all three rules pass:<br>1. at least 12 characters (passphrases with spaces are welcome);<br>2. not on the <code>COMMON</code> list, ignoring capital letters;<br>3. does not contain the username, ignoring capital letters.',
        starter: 'const COMMON = ["password1234", "123456789012", "qwertyuiop12", "abcdefghijkl"];\n\nfunction isStrongPassword(pw, username) {\n    \n}',
        solution: 'const COMMON = ["password1234", "123456789012", "qwertyuiop12", "abcdefghijkl"];\n\nfunction isStrongPassword(pw, username) {\n    const lower = pw.toLowerCase();\n    if (pw.length < 12) {\n        return false;\n    }\n    if (COMMON.includes(lower)) {\n        return false;\n    }\n    if (lower.includes(username.toLowerCase())) {\n        return false;\n    }\n    return true;\n}',
        tests: [
            { expr: 'isStrongPassword("kettle meadow orbit", "aisha")', label: 'a three-word passphrase' },
            { expr: 'isStrongPassword("lamp orbit c", "aisha")', label: 'exactly 12 characters' },
            { expr: 'isStrongPassword("short pw", "aisha")', label: 'too short' },
            { expr: 'isStrongPassword("Password1234", "aisha")', label: 'on the common list (with a capital P)' },
            { expr: 'isStrongPassword("123456789012", "bilal")', label: 'on the common list' },
            { expr: 'isStrongPassword("Aisha2012 river", "aisha")', label: 'contains the username' }
        ],
        hint1: 'Make a lowercase copy first: <code>const lower = pw.toLowerCase();</code>',
        hint2: 'Check each rule and <code>return false</code> as soon as one fails: <code>pw.length &lt; 12</code>, <code>COMMON.includes(lower)</code>, <code>lower.includes(username.toLowerCase())</code>. If all pass, <code>return true</code>.',
        why: 'Length and avoiding predictable choices matter far more than forcing symbols. Real sites block known common passwords and words linked to the user, because guessing tools try exactly those first.'
    },
    {
        id: 'code-exam-idor', tier: 3, type: 'code', title: 'Only your own exam paper', module: 6, chapter: 8,
        task: '<code>view-exam.php?id=1042</code> shows a handed-in exam paper. If a student changes the number, she sees a classmate\'s answers (an IDOR flaw). Fix it: the query must only find a paper that belongs to the logged-in student (<code>$_SESSION[\'user_id\']</code>), and when none is found, send <code>403</code> and stop.',
        starter: '<?php\nsession_start();\n$id = $_GET[\'id\'] ?? 0;\n$stmt = $pdo->prepare("SELECT title, answers FROM exam_submissions WHERE id = ?");\n$stmt->execute([$id]);\n$paper = $stmt->fetch(PDO::FETCH_ASSOC);\n\necho htmlspecialchars($paper[\'answers\'], ENT_QUOTES, \'UTF-8\');',
        solution: '<?php\nsession_start();\n$id = $_GET[\'id\'] ?? 0;\n$stmt = $pdo->prepare("SELECT title, answers FROM exam_submissions WHERE id = ? AND student_id = ?");\n$stmt->execute([$id, $_SESSION[\'user_id\']]);\n$paper = $stmt->fetch(PDO::FETCH_ASSOC);\n\nif (!$paper) {\n    http_response_code(403);\n    exit(\'You do not have permission to view this paper.\');\n}\necho htmlspecialchars($paper[\'answers\'], ENT_QUOTES, \'UTF-8\');',
        checks: [
            { re: /student_id\s*=\s*(\?|:[A-Za-z_]\w*)/i, msg: 'The query must also check <code>student_id</code> with a placeholder, so it only finds this student\'s papers.' },
            { re: /\$_GET\[\s*['"](student|user)/i, not: true, msg: 'Never take the student\'s ID from the address: anyone can change it.' },
            { re: /execute\s*\(\s*\[[^;]*\$_SESSION\[\s*['"]user_id['"]\s*\]/, msg: 'Fill that placeholder with the logged-in student: pass <code>$_SESSION[\'user_id\']</code> to <code>execute()</code>.' },
            { re: /if\s*\(\s*(!\s*\$paper|\$paper\s*===?\s*false|empty\s*\(\s*\$paper\s*\))\s*\)/, msg: 'When no paper is found, stop: <code>if (!$paper) { ... }</code>' },
            { re: /http_response_code\s*\(\s*403\s*\)/, msg: 'Send the "403 Forbidden" status: <code>http_response_code(403);</code>' },
            { re: /\b(exit|die)\b/, msg: 'Stop the page with <code>exit(...)</code> so nothing else is shown.' }
        ],
        hint1: 'Add <code>AND student_id = ?</code> to the SQL, and add <code>$_SESSION[\'user_id\']</code> to the <code>execute()</code> list.',
        hint2: 'After the fetch: <code>if (!$paper) { http_response_code(403); exit(\'You do not have permission to view this paper.\'); }</code>',
        why: 'Being logged in is not enough: the server must check that <strong>this</strong> paper belongs to <strong>this</strong> student. The ID comes from the session, which the visitor cannot edit, and the page denies by default.'
    },
    {
        id: 'code-csrf-token', tier: 3, type: 'code', title: 'Guard the exam form', module: 6, chapter: 8,
        task: 'The exam form already has a hidden <code>csrf_token</code> field, and the same token is saved in <code>$_SESSION[\'csrf_token\']</code>. Add the check to <code>submit-exam.php</code>: compare the two with <code>hash_equals()</code>, and if they do not match, send <code>403</code> and stop <strong>before</strong> anything is saved.',
        starter: '<?php\nsession_start();\n// submit-exam.php: receives the exam form (method="POST")\n\n$answers = $_POST[\'answers\'] ?? \'\';\n$stmt = $pdo->prepare("INSERT INTO exam_submissions (student_id, answers) VALUES (?, ?)");\n$stmt->execute([$_SESSION[\'user_id\'], $answers]);\necho "Your answers were saved.";',
        solution: '<?php\nsession_start();\n// submit-exam.php: receives the exam form (method="POST")\n$sent = $_POST[\'csrf_token\'] ?? \'\';\nif (!hash_equals($_SESSION[\'csrf_token\'] ?? \'\', $sent)) {\n    http_response_code(403);\n    exit(\'This form has expired. Please reload the page and try again.\');\n}\n\n$answers = $_POST[\'answers\'] ?? \'\';\n$stmt = $pdo->prepare("INSERT INTO exam_submissions (student_id, answers) VALUES (?, ?)");\n$stmt->execute([$_SESSION[\'user_id\'], $answers]);\necho "Your answers were saved.";',
        checks: [
            { re: /hash_equals\s*\(/, msg: 'Compare the two tokens with <code>hash_equals()</code>.' },
            { re: /\$_SESSION\[\s*['"]csrf_token['"]\s*\]/, msg: 'One side is the token saved in the session: <code>$_SESSION[\'csrf_token\']</code>.' },
            { re: /\$_POST\[\s*['"]csrf_token['"]\s*\]/, msg: 'The other side is the token the form sent: <code>$_POST[\'csrf_token\']</code>.' },
            { re: /if\s*\(\s*(!\s*hash_equals|hash_equals\s*\([^)]*\)\s*===?\s*false)/, msg: 'Act when they do <strong>not</strong> match: <code>if (!hash_equals(...)) { ... }</code>' },
            { re: /http_response_code\s*\(\s*403\s*\)/, msg: 'Send the "403 Forbidden" status: <code>http_response_code(403);</code>' },
            { re: /\b(exit|die)\b/, msg: 'Stop the script with <code>exit(...)</code> so nothing is saved.' },
            { re: /hash_equals[\s\S]*INSERT/, msg: 'The check must come <strong>before</strong> the INSERT.' }
        ],
        hint1: 'Read the sent token first: <code>$sent = $_POST[\'csrf_token\'] ?? \'\';</code>',
        hint2: '<code>if (!hash_equals($_SESSION[\'csrf_token\'] ?? \'\', $sent)) { http_response_code(403); exit(\'...\'); }</code> goes above the INSERT.',
        why: 'Another website cannot read your pages (the Same-Origin Policy), so it cannot know the token. A forged request arrives without the right token and is stopped before anything changes. Add <code>SameSite</code> cookies as a second layer.'
    },
    {
        id: 'js-backup-321', tier: 3, type: 'js', title: 'Does it follow 3-2-1?', module: 8, chapter: 12,
        task: 'Write <code>follows321(copies)</code>. Each copy is an object like <code>{ place: "USB drive", kind: "external drive", offsite: false }</code>. Return <code>true</code> only if there are at least <strong>3</strong> copies, at least <strong>2</strong> different <code>kind</code>s of storage, and at least <strong>1</strong> copy with <code>offsite: true</code>.',
        starter: 'function follows321(copies) {\n    \n}',
        solution: 'function follows321(copies) {\n    const kinds = [];\n    let hasOffsite = false;\n    for (const copy of copies) {\n        if (!kinds.includes(copy.kind)) {\n            kinds.push(copy.kind);\n        }\n        if (copy.offsite) {\n            hasOffsite = true;\n        }\n    }\n    return copies.length >= 3 && kinds.length >= 2 && hasOffsite;\n}',
        tests: [
            {
                expr: 'follows321([{ place: "Laptop", kind: "internal drive", offsite: false }, { place: "USB drive", kind: "external drive", offsite: false }, { place: "School cloud", kind: "online storage", offsite: true }])',
                label: 'Fatima\'s plan: laptop, USB drive, school cloud'
            },
            {
                expr: 'follows321([{ place: "Laptop", kind: "internal drive", offsite: false }, { place: "School cloud", kind: "online storage", offsite: true }])',
                label: 'only 2 copies'
            },
            {
                expr: 'follows321([{ place: "Laptop", kind: "internal drive", offsite: false }, { place: "USB drive", kind: "external drive", offsite: false }, { place: "Second USB drive", kind: "external drive", offsite: false }])',
                label: '3 copies, but all at home'
            },
            {
                expr: 'follows321([{ place: "Laptop folder", kind: "internal drive", offsite: false }, { place: "Laptop copy", kind: "internal drive", offsite: false }, { place: "Grandmother\'s laptop", kind: "internal drive", offsite: true }])',
                label: '3 copies, but only 1 kind of storage'
            },
            {
                expr: 'follows321([{ place: "Laptop", kind: "internal drive", offsite: false }, { place: "USB drive", kind: "external drive", offsite: false }, { place: "Uncle\'s house", kind: "external drive", offsite: true }, { place: "School cloud", kind: "online storage", offsite: true }])',
                label: '4 copies, 3 kinds, 2 off-site'
            }
        ],
        hint1: 'Loop over the copies. Keep a list of the kinds you have seen, and a true/false for "found an off-site copy".',
        hint2: 'Add a kind only if <code>!kinds.includes(copy.kind)</code>. At the end: <code>return copies.length &gt;= 3 &amp;&amp; kinds.length &gt;= 2 &amp;&amp; hasOffsite;</code>',
        why: 'Three copies survive one failure, two kinds of storage survive a fault in one kind, and one copy elsewhere survives fire, theft or ransomware at home. And remember: a backup you have never restored is only a hope.'
    }
];
