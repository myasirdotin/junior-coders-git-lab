/**
 * Junior Coders - shared engine for the self-checked practice pages (Learning <Track>/exercises.html)
 *
 * A page lists its tasks in js/data/<track>-practice.js (as JC_PRACTICE.<track>) and calls
 *   PracticeCards.mount({ exercises, prefix: 'js', book: 'js', checkers: {} })
 * (prefix: progress keys "js:<id>"; book: default textbook for the chapter links, book-<book>/)
 * with these elements on the page: #pcList (cards), #pcDone, #pcTotal, #pcBar (progress),
 * #pcEngine (engine status, only needed for python tasks) and .sqlx-tier-btn[data-tier] buttons.
 *
 * Task types (every task has id, tier 1–3, type, title, task (HTML), why (HTML); optional module, chapter, book):
 *   predict : code, answers[]         read code, type what it prints (lang 'js' or 'python' lets the self-test run it)
 *   fill    : code with ____, answers[] type the missing word
 *   choice  : options[] (HTML), answer pick one
 *   bug     : lines[], bad (index or list), fix   tap the line with the mistake
 *   order   : steps[], swaps [[a, b]]  put the steps in order (pairs in swaps may be either way round)
 *   code    : starter, solution, checks[{ re, not, msg }]   answer checked for its key parts (nothing runs)
 *   js      : starter, solution, tests[{ expr, label }]     runs in a Web Worker; each expr must give the same
 *             value as with the solution; logs: true also compares console.log output
 *   web     : starter, solution, checks[{ test(doc, win), msg }]   HTML/CSS rendered in a sandboxed frame
 *   python  : starter, solution, expected                  runs with Pyodide; output must match the solution's
 * code/js/web/python tasks also have hint1, hint2. A page may add its own types through `checkers`
 * (Learning Laravel uses `rules`). PracticeCards.verify(ex) is used by scripts/check-practice.js.
 */
(function () {
    'use strict';
    if (window.PracticeCards) return;

    const TIER_LABEL = { 1: 'Warm-up', 2: 'Apply', 3: 'Challenge' };
    const XP = { 1: 15, 2: 25, 3: 40 };
    const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const normText = (s) => String(s).replace(/\r/g, '').split('\n').map(l => l.replace(/\s+$/g, '')).join('\n').trim();
    const normLoose = (s) => normText(s).replace(/\s+/g, ' ').toLowerCase();
    const badLines = (ex) => [].concat(ex.bad);
    const WRITES = ['code', 'js', 'web', 'python'];

    // ── Every right order as "0,1,2": the main one plus each combination of the swappable pairs ──
    function acceptedOrders(ex) {
        let orders = [ex.steps.map((_, i) => i)];
        (ex.swaps || []).forEach(([a, b]) => {
            orders = orders.concat(orders.map(o => o.map(i => (i === a ? b : i === b ? a : i))));
        });
        return orders.map(o => o.join(','));
    }
    // Steps are shown in a fixed mixed order (the same on every visit), never already in the right order
    function mixedOrder(steps) {
        const hash = (s) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
        const idx = steps.map((_, i) => i).sort((a, b) => hash(steps[a]) - hash(steps[b]));
        if (idx.every((v, i) => v === i)) idx.push(idx.shift());
        return idx;
    }

    function checkCode(ex, src) {
        for (const c of ex.checks) if (c.re.test(src) === !!c.not) return c.msg;
        return '';
    }

    // ── JavaScript: run in a Web Worker so a mistake (or an endless loop) cannot freeze the page ──
    const WORKER_SRC = `
self.onmessage = (e) => {
  const { code, tests } = e.data;
  const logs = [];
  const show = (v) => typeof v === 'string' ? v : (() => { try { return JSON.stringify(v); } catch (_) { return String(v); } })();
  const say = (...a) => logs.push(a.map(show).join(' '));
  self.console = { log: say, info: say, warn: say, error: say };
  const out = { logs, results: [], error: null };
  let probe;
  try {
    probe = new Function(code + '\\n;return function (expr) { return eval(expr); };')();
  } catch (err) { out.error = err.name + ': ' + err.message; self.postMessage(out); return; }
  for (const t of tests) {
    try {
      const v = probe(t.expr);
      out.results.push({ ok: true, value: v === undefined ? '__undefined__' : JSON.parse(JSON.stringify(v === undefined ? null : v)) });
    } catch (err) { out.results.push({ ok: false, error: err.name + ': ' + err.message }); }
  }
  self.postMessage(out);
};`;
    let workerUrl = null;
    function runJs(code, tests, timeout) {
        if (!workerUrl) workerUrl = URL.createObjectURL(new Blob([WORKER_SRC], { type: 'text/javascript' }));
        return new Promise((resolve) => {
            const w = new Worker(workerUrl);
            const timer = setTimeout(() => { w.terminate(); resolve({ timeout: true, logs: [], results: [], error: null }); }, timeout || 2000);
            w.onmessage = (e) => { clearTimeout(timer); w.terminate(); resolve(e.data); };
            w.onerror = (e) => { clearTimeout(timer); w.terminate(); resolve({ logs: [], results: [], error: e.message || 'Error' }); e.preventDefault(); };
            w.postMessage({ code, tests: tests || [] });
        });
    }
    const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    const shown = (v) => (v === '__undefined__' ? 'undefined' : JSON.stringify(v));

    // '' when the student's code passes, otherwise an HTML message; detail is the per-test list
    async function judgeJs(ex, src) {
        const [mine, want] = await Promise.all([runJs(src, ex.tests), runJs(ex.solution, ex.tests)]);
        if (mine.timeout) return { problem: 'Your code ran for too long. Is there a loop that never ends?', detail: '' };
        if (mine.error) return { problem: 'JavaScript stopped with an error: <code>' + esc(mine.error) + '</code>', detail: '' };
        let fails = 0;
        const rows = (ex.tests || []).map((t, i) => {
            const m = mine.results[i], w = want.results[i];
            const ok = m && m.ok && w && w.ok && same(m.value, w.value);
            if (!ok) fails++;
            const got = !m ? '' : m.ok ? shown(m.value) : m.error;
            return `<li class="${ok ? 'pc-pass' : 'pc-fail'}">${ok ? '✓' : '✗'} <code>${esc(t.label || t.expr)}</code>` +
                (ok ? '' : ` should give <code>${esc(w && w.ok ? shown(w.value) : '?')}</code>, got <code>${esc(got)}</code>`) + '</li>';
        });
        if (ex.logs && normText(mine.logs.join('\n')) !== normText(want.logs.join('\n'))) {
            fails++;
            rows.push(`<li class="pc-fail">✗ What you print with <code>console.log</code> is not the same as the expected output.</li>`);
        }
        const detail = (rows.length ? '<ul class="pc-tests">' + rows.join('') + '</ul>' : '') +
            (mine.logs.length ? '<p class="sqlx-label">Your console:</p><pre class="phpx-output">' + esc(mine.logs.join('\n')) + '</pre>' : '');
        return { problem: fails ? `${fails} check${fails === 1 ? '' : 's'} not passing yet.` : '', detail };
    }

    // ── HTML/CSS: render in a sandboxed frame (no scripts run) and look at the result ──
    function renderWeb(html) {
        return new Promise((resolve) => {
            const f = document.createElement('iframe');
            f.setAttribute('sandbox', 'allow-same-origin');
            f.setAttribute('aria-hidden', 'true');
            f.tabIndex = -1;
            f.style.cssText = 'position:absolute;left:-10000px;top:0;width:800px;height:600px;border:0;';
            f.onload = () => resolve(f);
            f.srcdoc = html;
            document.body.appendChild(f);
        });
    }
    async function judgeWeb(ex, src) {
        const f = await renderWeb(src);
        try {
            const doc = f.contentDocument, win = f.contentWindow;
            for (const c of ex.checks) {
                let ok = false;
                try { ok = !!c.test(doc, win); } catch (_) { ok = false; }
                if (!ok) return { problem: c.msg, detail: '' };
            }
            return { problem: '', detail: '' };
        } finally { f.remove(); }
    }

    // ── Python: Pyodide (js/py-lab.js); the output must match the solution's output ──
    const pyExpected = {};
    async function judgePython(ex, src) {
        const r = await window.PyLab.run(src);
        if (pyExpected[ex.id] === undefined) pyExpected[ex.id] = normText((await window.PyLab.run(ex.solution)).stdout);
        const got = normText(r.stdout), want = pyExpected[ex.id];
        const detail = '<p class="sqlx-label">Your output:</p><pre class="phpx-output">' + (esc(r.stdout) || '<span class="sql-null">(nothing printed)</span>') + '</pre>' +
            (r.stderr ? '<pre class="phpx-output phpx-stderr">' + esc(r.stderr) + '</pre>' : '');
        if (got === want) return { problem: '', detail };
        if (r.stderr && !got) return { problem: 'Python stopped with an error (see above). Read the last line: it names the problem.', detail };
        if (normLoose(got) === normLoose(want)) return { problem: 'Almost: the words are right but the spacing or line breaks differ. Compare with "Expected output".', detail };
        return { problem: 'The output does not match yet. Compare it with "Expected output".', detail };
    }

    async function judge(ex, src, checkers) {
        if (checkers && checkers[ex.type]) { const p = checkers[ex.type](ex, src); return { problem: p, detail: '' }; }
        if (ex.type === 'code') return { problem: checkCode(ex, src), detail: '' };
        if (ex.type === 'js') return judgeJs(ex, src);
        if (ex.type === 'web') return judgeWeb(ex, src);
        if (ex.type === 'python') return judgePython(ex, src);
        return { problem: 'Unknown task type', detail: '' };
    }

    // ── Cards ──
    function card(ex, i, isDone, bookKey) {
        const book = ex.book || bookKey;
        const head = `
            <header class="sqlx-card-head">
                <span class="sqlx-num">${isDone ? '✓' : i + 1}</span>
                <h2>${esc(ex.title)}</h2>
                <span class="sqlx-tier t${ex.tier}">${TIER_LABEL[ex.tier]} · ${XP[ex.tier]} XP</span>
            </header>
            <p class="sqlx-task">${ex.task}</p>`;
        const links = [];
        if (ex.module) links.push(`<a href="module${ex.module}.html">Module ${ex.module}</a>`);
        if (ex.chapter && book) links.push(`<a href="../book-${book}/index.html#ch${ex.chapter}">Textbook chapter ${ex.chapter}</a>`);
        const learn = links.length ? `<p class="lrvx-learn">${links.join(' · ')}</p>` : '';
        const why = `<div class="phpx-why">${ex.why}</div>`;
        let body = '';
        if (ex.type === 'predict') {
            body = `
            <pre class="phpx-code"><code>${esc(ex.code)}</code></pre>
            <label class="phpx-label" for="pc-in-${ex.id}">It shows:</label>
            <textarea id="pc-in-${ex.id}" class="phpx-answer" rows="2" spellcheck="false" placeholder="Type the exact output"></textarea>
            <div class="sqlx-actions"><button type="button" class="sqlx-run">✓ Check</button><button type="button" class="sqlx-solution">Show answer</button></div>
            <div class="sqlx-solbox" hidden><pre>${esc(ex.answers[0])}</pre>${why}</div>`;
        } else if (ex.type === 'fill') {
            body = `
            <pre class="phpx-code"><code>${esc(ex.code).replace('____', '<mark class="phpx-blank">____</mark>')}</code></pre>
            <label class="phpx-label" for="pc-in-${ex.id}">The missing part is:</label>
            <input id="pc-in-${ex.id}" type="text" class="phpx-answer phpx-input" spellcheck="false" autocomplete="off" autocapitalize="off" placeholder="Type the missing part">
            <div class="sqlx-actions"><button type="button" class="sqlx-run">✓ Check</button><button type="button" class="sqlx-solution">Show answer</button></div>
            <div class="sqlx-solbox" hidden><code>${esc(ex.answers[0])}</code>${why}</div>`;
        } else if (ex.type === 'choice') {
            body = `<div class="lrvx-options" role="group" aria-label="Choose one answer">
                ${ex.options.map((o, n) => `<button type="button" class="lrvx-option" data-i="${n}">${o}</button>`).join('')}</div>`;
        } else if (ex.type === 'bug') {
            body = `
            <p class="phpx-label">Tap the line with the mistake:</p>
            <div class="lrvx-lines" role="group" aria-label="Lines of code">
                ${ex.lines.map((l, n) => `<button type="button" class="lrvx-line" data-i="${n}"><span class="lrvx-ln">${n + 1}</span><code>${esc(l)}</code></button>`).join('')}
            </div>
            <div class="sqlx-actions"><button type="button" class="sqlx-solution">Show answer</button></div>
            <div class="sqlx-solbox" hidden>Line ${badLines(ex)[0] + 1} is the mistake. Fixed:<pre>${esc(ex.fix)}</pre>${why}</div>`;
        } else if (ex.type === 'order') {
            body = `
            <p class="phpx-label">Tap the steps in order:</p>
            <div class="lrvx-pool">${mixedOrder(ex.steps).map(n => `<button type="button" class="lrvx-step" data-i="${n}">${esc(ex.steps[n])}</button>`).join('')}</div>
            <p class="phpx-label">Your order (tap a step to take it back):</p>
            <ol class="lrvx-chosen"></ol>
            <div class="sqlx-actions">
                <button type="button" class="sqlx-run" disabled>✓ Check</button>
                <button type="button" class="lrvx-reset">Start again</button>
                <button type="button" class="sqlx-solution">Show answer</button>
            </div>
            <div class="sqlx-solbox" hidden><ol class="lrvx-answer">${ex.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol>${why}</div>`;
        } else {
            const rows = Math.min(16, Math.max(5, String(ex.starter).split('\n').length + 2));
            body = `
            <textarea class="sqlx-editor pc-editor" rows="${rows}" spellcheck="false" autocapitalize="off" aria-label="Your code for: ${esc(ex.title)}">${esc(ex.starter)}</textarea>
            <div class="sqlx-actions">
                <button type="button" class="sqlx-run"${ex.type === 'python' ? ' disabled' : ''}>${ex.type === 'code' || ex.type === 'web' ? '✓ Check' : '▶ Run &amp; check'}</button>
                <button type="button" class="sqlx-hint" data-n="1">Hint 1</button>
                <button type="button" class="sqlx-hint" data-n="2">Hint 2</button>
                <button type="button" class="sqlx-solution">Show solution</button>
                ${ex.type === 'python' ? '<button type="button" class="sqlx-expected">Expected output</button>' : ''}
            </div>
            <div class="sqlx-hintbox" data-n="1" hidden>${ex.hint1}</div>
            <div class="sqlx-hintbox" data-n="2" hidden>${ex.hint2}</div>
            <div class="sqlx-solbox" hidden><pre>${esc(ex.solution)}</pre>${why}</div>
            ${ex.type === 'web' ? '<div class="pc-preview-wrap" hidden><p class="sqlx-label">Your page:</p><iframe class="pc-preview" sandbox title="Preview of your page"></iframe></div>' : ''}`;
        }
        return `<article class="sqlx-card${isDone ? ' done' : ''}" data-tier="${ex.tier}" data-type="${ex.type}" id="ex-${ex.id}">${head}${body}
            <div class="sqlx-feedback" hidden></div>
            <div class="sqlx-result"></div>
            ${learn}
        </article>`;
    }

    function mount(opts) {
        const EX = opts.exercises || [];
        const prefix = opts.prefix;
        const checkers = opts.checkers || {};
        const list = document.getElementById('pcList');
        const progress = () => window.beiProgress;
        const doneKey = (ex) => prefix + ':' + ex.id;
        const isDone = (ex) => !!(progress() && progress().isExerciseDone(doneKey(ex)));
        const find = (cardEl) => EX.find(x => 'ex-' + x.id === cardEl.id);

        document.getElementById('pcTotal').textContent = EX.length;
        function updateProgress() {
            const n = EX.filter(isDone).length;
            document.getElementById('pcDone').textContent = n;
            document.getElementById('pcBar').style.width = (EX.length ? n / EX.length * 100 : 0) + '%';
        }
        list.innerHTML = EX.map((ex, i) => card(ex, i, isDone(ex), opts.book)).join('');
        updateProgress();

        document.querySelectorAll('.sqlx-tier-btn').forEach(b => b.addEventListener('click', () => {
            document.querySelectorAll('.sqlx-tier-btn').forEach(x => x.classList.toggle('active', x === b));
            const t = b.dataset.tier;
            list.querySelectorAll('.sqlx-card[data-tier]').forEach(c => { c.hidden = !(t === 'all' || c.dataset.tier === t); });
            if (opts.onTier) opts.onTier(t);
        }));

        function markSolved(ex, cardEl, fb, extra) {
            const first = progress() ? progress().completeExercise(doneKey(ex), XP[ex.tier]) : false;
            fb.hidden = false;
            fb.className = 'sqlx-feedback ok';
            fb.innerHTML = (first ? `Correct! +${XP[ex.tier]} XP` : 'Correct!') + (extra || '');
            cardEl.classList.add('done');
            cardEl.querySelector('.sqlx-num').textContent = '✓';
            updateProgress();
            if (first && typeof window.showToast === 'function') window.showToast(`Exercise solved! +${XP[ex.tier]} XP`, 'success');
        }
        function sayNo(fb, html) { fb.hidden = false; fb.className = 'sqlx-feedback no'; fb.innerHTML = html; }

        function renderChosen(cardEl) {
            const ex = find(cardEl);
            const chosen = (cardEl.dataset.chosen || '').split(',').filter(Boolean);
            cardEl.querySelector('.lrvx-chosen').innerHTML = chosen.map(n =>
                `<li><button type="button" class="lrvx-picked" data-i="${n}">${esc(ex.steps[n])}</button></li>`).join('');
            cardEl.querySelectorAll('.lrvx-step').forEach(b => { b.hidden = chosen.includes(b.dataset.i); });
            cardEl.querySelector('.sqlx-run').disabled = chosen.length !== ex.steps.length;
        }

        list.addEventListener('click', async (e) => {
            const cardEl = e.target.closest('.sqlx-card');
            if (!cardEl) return;
            const ex = find(cardEl);
            const fb = cardEl.querySelector('.sqlx-feedback');
            const out = cardEl.querySelector('.sqlx-result');
            const hit = (sel) => e.target.closest(sel);

            if (hit('.sqlx-hint')) {
                const box = cardEl.querySelector(`.sqlx-hintbox[data-n="${hit('.sqlx-hint').dataset.n}"]`);
                box.hidden = !box.hidden;
            } else if (hit('.sqlx-solution')) {
                const box = cardEl.querySelector('.sqlx-solbox');
                box.hidden = !box.hidden;
            } else if (hit('.sqlx-expected')) {
                if (pyExpected[ex.id] === undefined) {
                    try { pyExpected[ex.id] = normText((await window.PyLab.run(ex.solution)).stdout); } catch (_) { pyExpected[ex.id] = normText(ex.expected || ''); }
                }
                out.innerHTML = '<p class="sqlx-label">Expected output:</p><pre class="phpx-output">' + esc(pyExpected[ex.id]) + '</pre>';
            } else if (hit('.lrvx-option')) {
                const btn = hit('.lrvx-option');
                cardEl.querySelectorAll('.lrvx-option').forEach(o => o.classList.remove('is-right', 'is-wrong'));
                if (+btn.dataset.i === ex.answer) { btn.classList.add('is-right'); markSolved(ex, cardEl, fb, '<div class="phpx-why">' + ex.why + '</div>'); }
                else { btn.classList.add('is-wrong'); sayNo(fb, 'Not that one. Read the task again and try another answer.'); }
            } else if (hit('.lrvx-line')) {
                const btn = hit('.lrvx-line');
                cardEl.querySelectorAll('.lrvx-line').forEach(o => o.classList.remove('is-right', 'is-wrong'));
                if (badLines(ex).includes(+btn.dataset.i)) {
                    btn.classList.add('is-right');
                    markSolved(ex, cardEl, fb, '<div class="phpx-why">Fixed:<pre class="phpx-code">' + esc(ex.fix) + '</pre>' + ex.why + '</div>');
                } else { btn.classList.add('is-wrong'); sayNo(fb, 'That line is fine. Think about what the task says goes wrong, and look again.'); }
            } else if (hit('.lrvx-step')) {
                cardEl.dataset.chosen = [...(cardEl.dataset.chosen || '').split(',').filter(Boolean), hit('.lrvx-step').dataset.i].join(',');
                fb.hidden = true; renderChosen(cardEl);
            } else if (hit('.lrvx-picked')) {
                const n = hit('.lrvx-picked').dataset.i;
                cardEl.dataset.chosen = (cardEl.dataset.chosen || '').split(',').filter(x => x && x !== n).join(',');
                fb.hidden = true; renderChosen(cardEl);
            } else if (hit('.lrvx-reset')) {
                cardEl.dataset.chosen = ''; fb.hidden = true; renderChosen(cardEl);
            } else if (hit('.sqlx-run')) {
                if (ex.type === 'predict') {
                    const got = normLoose(cardEl.querySelector('.phpx-answer').value);
                    if (ex.answers.some(a => normLoose(a) === got)) markSolved(ex, cardEl, fb, '<div class="phpx-why">' + ex.why + '</div>');
                    else sayNo(fb, 'Not quite. Follow the code line by line and try again, or show the answer.');
                } else if (ex.type === 'fill') {
                    const got = cardEl.querySelector('.phpx-answer').value.trim().toLowerCase();
                    if (ex.answers.map(a => a.toLowerCase()).includes(got)) markSolved(ex, cardEl, fb, '<div class="phpx-why">' + ex.why + '</div>');
                    else sayNo(fb, 'That is not it. Think about what the task is asking for.');
                } else if (ex.type === 'order') {
                    const mine = (cardEl.dataset.chosen || '').split(',');
                    if (acceptedOrders(ex).includes(mine.join(','))) { markSolved(ex, cardEl, fb, '<div class="phpx-why">' + ex.why + '</div>'); return; }
                    const right = Math.max(...acceptedOrders(ex).map(o => o.split(',').findIndex((n, i) => n !== mine[i])));
                    sayNo(fb, right === 0 ? 'Not yet: the first step is not right. What has to happen before anything else?'
                        : `Not yet: the first ${right} step${right === 1 ? ' is' : 's are'} in the right place. Take back the later ones and think about what must come first.`);
                } else {
                    const btn = hit('.sqlx-run');
                    const src = cardEl.querySelector('.pc-editor').value;
                    btn.disabled = true;
                    try {
                        const r = await judge(ex, src, checkers);
                        out.innerHTML = r.detail || '';
                        if (ex.type === 'web') {
                            const wrap = cardEl.querySelector('.pc-preview-wrap');
                            wrap.hidden = false;
                            wrap.querySelector('iframe').srcdoc = src;
                        }
                        if (r.problem) sayNo(fb, '' + r.problem);
                        else markSolved(ex, cardEl, fb, '<div class="phpx-why">' + ex.why + '</div>');
                    } catch (err) {
                        sayNo(fb, '' + esc(err.message || err));
                    }
                    btn.disabled = false;
                }
            }
        });

        list.addEventListener('keydown', (e) => {
            const isEditor = e.target.classList.contains('pc-editor') || e.target.classList.contains('phpx-answer');
            if ((isEditor && (e.ctrlKey || e.metaKey) && e.key === 'Enter') || (e.key === 'Enter' && e.target.classList.contains('phpx-input'))) {
                e.preventDefault();
                const run = e.target.closest('.sqlx-card').querySelector('.sqlx-run');
                if (run && !run.disabled) run.click();
            }
            // Tab in a code editor inserts four spaces instead of leaving the box
            if (e.key === 'Tab' && !e.shiftKey && e.target.classList.contains('pc-editor')) {
                e.preventDefault();
                const t = e.target, s = t.selectionStart;
                t.value = t.value.slice(0, s) + '    ' + t.value.slice(t.selectionEnd);
                t.selectionStart = t.selectionEnd = s + 4;
            }
        });

        // Python tasks need Pyodide; everything else works straight away
        if (EX.some(x => x.type === 'python')) {
            const engineEl = document.getElementById('pcEngine');
            if (engineEl) engineEl.textContent = 'Downloading the Python engine (a few MB, only the first time). Python coding tasks switch on when it is ready…';
            window.PyLab.ready().then(() => {
                if (engineEl) { engineEl.textContent = 'Python ' + window.PyLab.version + ' ready (runs in your browser)'; engineEl.classList.add('ok'); }
                list.querySelectorAll('.sqlx-card[data-type="python"] .sqlx-run').forEach(b => { b.disabled = false; });
            }).catch((err) => {
                if (engineEl) { engineEl.textContent = err.message + ' The other tasks still work; Python coding tasks show their solution and expected output.'; engineEl.classList.add('bad'); }
            });
        }
    }

    // ── Self-test (scripts/check-practice.js): the solution passes, the starter does not, the data is sound ──
    async function verify(ex, checkers) {
        const problems = [];
        const need = (cond, msg) => { if (!cond) problems.push(msg); };
        need([1, 2, 3].includes(ex.tier), 'tier must be 1, 2 or 3');
        need(ex.title && ex.task && ex.why, 'needs title, task and why');
        if (ex.type === 'predict') {
            need(ex.answers && ex.answers.length, 'no answers');
            if (ex.lang === 'js') {
                const r = await runJs(ex.code, []);
                need(!r.error && normLoose(r.logs.join('\n')) === normLoose(ex.answers[0]), `the code prints "${(r.error || r.logs.join('\\n'))}", not answers[0]`);
            } else if (ex.lang === 'python') {
                const r = await window.PyLab.run(ex.code);
                need(normLoose(r.stdout) === normLoose(ex.answers[0]), `the code prints "${r.stdout.trim()}${r.stderr ? ' / ' + r.stderr.trim() : ''}", not answers[0]`);
            }
        } else if (ex.type === 'fill') {
            need(ex.answers && ex.answers.length, 'no answers');
            need((ex.code.match(/____/g) || []).length === 1, 'code needs exactly one ____');
        } else if (ex.type === 'choice') {
            need(ex.answer >= 0 && ex.answer < ex.options.length, 'answer is not one of the options');
        } else if (ex.type === 'bug') {
            badLines(ex).forEach(n => need(n >= 0 && n < ex.lines.length, `bad line ${n} does not exist`));
            need(ex.fix, 'no fix');
        } else if (ex.type === 'order') {
            need(new Set(ex.steps).size === ex.steps.length, 'two steps have the same text');
            need(acceptedOrders(ex).includes(ex.steps.map((_, i) => i).join(',')), 'the written order is not accepted');
        } else if (WRITES.includes(ex.type) || (checkers && checkers[ex.type])) {
            need(ex.hint1 && ex.hint2, 'needs two hints');
            const onSolution = await judge(ex, ex.solution, checkers);
            need(!onSolution.problem, 'the solution fails: ' + String(onSolution.problem).replace(/<[^>]+>/g, ''));
            const onStarter = await judge(ex, ex.starter, checkers);
            need(!!onStarter.problem, 'the starter already passes, so the task is free');
            if (ex.type === 'js') need((ex.tests || []).length || ex.logs, 'js task needs tests or logs: true');
            if (ex.type === 'python') {
                const r = await window.PyLab.run(ex.solution);
                need(!ex.expected || normText(r.stdout) === normText(ex.expected), '`expected` differs from what the solution prints');
            }
        } else {
            problems.push(`unknown type "${ex.type}"`);
        }
        return problems;
    }

    window.PracticeCards = { mount, verify, acceptedOrders };
})();
