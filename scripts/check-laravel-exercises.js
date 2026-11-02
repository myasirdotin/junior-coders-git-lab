/**
 * Checks js/data/laravel-exercises.js (used by Learning Laravel/exercises.html):
 * every written solution passes the page's own checks, every starter fails them,
 * and every task points at a module, chapter, line and step that exist.
 *
 * Run after editing the exercises:   node scripts/check-laravel-exercises.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
global.window = {};
require(path.join(ROOT, 'js', 'data', 'laravel-exercises.js'));
const EX = window.LARAVEL_EXERCISES;
const BUILDS = window.LARAVEL_BUILDS;
const { acceptedOrders, checkRules, checkCode } = window.LARAVEL_CHECK;

const chapters = new Set();
for (const part of fs.readdirSync(path.join(ROOT, 'book-laravel'))) {
    const dir = path.join(ROOT, 'book-laravel', part);
    if (!part.startsWith('part-') || !fs.statSync(dir).isDirectory()) continue;
    fs.readdirSync(dir).forEach(f => { const m = f.match(/^ch(\d+)-.*\.md$/); if (m) chapters.add(+m[1]); });
}

const problems = [];
const ids = new Set();
const say = (ex, msg) => problems.push(`${ex.id}: ${msg}`);
const strip = (html) => html.replace(/<[^>]+>/g, '');

for (const ex of EX) {
    if (ids.has(ex.id)) say(ex, 'id used twice');
    ids.add(ex.id);
    if (![1, 2, 3].includes(ex.tier)) say(ex, 'tier must be 1, 2 or 3');
    if (!fs.existsSync(path.join(ROOT, 'Learning Laravel', `module${ex.module}.html`))) say(ex, `module${ex.module}.html does not exist`);
    if (!chapters.has(ex.chapter)) say(ex, `book-laravel has no chapter ${ex.chapter}`);
    if (!ex.why) say(ex, 'no explanation (why)');

    if (ex.type === 'predict' || ex.type === 'fill') {
        if (!ex.answers || !ex.answers.length) say(ex, 'no answers');
        if (ex.type === 'fill' && (ex.code.match(/____/g) || []).length !== 1) say(ex, 'code needs exactly one ____');
    } else if (ex.type === 'choice') {
        if (!(ex.answer >= 0 && ex.answer < ex.options.length)) say(ex, 'answer is not one of the options');
    } else if (ex.type === 'bug') {
        [].concat(ex.bad).forEach(n => { if (!(n >= 0 && n < ex.lines.length)) say(ex, `bad line ${n} does not exist`); });
        if (!ex.fix) say(ex, 'no fix');
    } else if (ex.type === 'order') {
        if (new Set(ex.steps).size !== ex.steps.length) say(ex, 'two steps have the same text');
        (ex.swaps || []).flat().forEach(n => { if (!(n >= 0 && n < ex.steps.length)) say(ex, `swap step ${n} does not exist`); });
        if (!acceptedOrders(ex).includes(ex.steps.map((_, i) => i).join(','))) say(ex, 'the written order is not accepted');
    } else if (ex.type === 'rules' || ex.type === 'code') {
        const check = ex.type === 'rules' ? checkRules : checkCode;
        const onSolution = check(ex, ex.solution);
        if (onSolution) say(ex, 'the solution fails its own check: ' + strip(onSolution));
        if (!check(ex, ex.starter)) say(ex, 'the starter already passes, so the task is free');
        if (!ex.hint1 || !ex.hint2) say(ex, 'needs two hints');
    } else {
        say(ex, `unknown type "${ex.type}"`);
    }
}

for (const b of BUILDS) {
    if (!b.id || !b.title || !b.steps || !b.steps.length) problems.push(`build ${b.id || '?'}: needs id, title and steps`);
}

const byTier = [1, 2, 3].map(t => EX.filter(x => x.tier === t).length);
console.log(`${EX.length} exercises (warm-up ${byTier[0]}, apply ${byTier[1]}, challenge ${byTier[2]}), ${BUILDS.length} builds`);
if (problems.length) {
    problems.forEach(p => console.log('  ✗ ' + p));
    console.log(`${problems.length} problem(s)`);
    process.exit(1);
}
console.log('No problems.');
