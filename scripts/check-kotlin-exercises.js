#!/usr/bin/env node
// Checks js/data/kotlin-exercises.js against a real Kotlin compiler (the Kotlin Playground service, needs internet):
//   - code tasks: the solution must compile and print exactly `expected`
//   - predict tasks: the code must print exactly `answer`
//   - fill tasks: the code with the first answer in place of ____ must compile and run
//
//   node scripts/check-kotlin-exercises.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'js', 'data', 'kotlin-exercises.js'), 'utf8'), sandbox);
const EX = sandbox.window.KOTLIN_EXERCISES;
const API = 'https://api.kotlinlang.org';

const norm = (s) => String(s).replace(/\r/g, '').split('\n').map((l) => l.replace(/\s+$/, '')).join('\n').trim();

async function version() {
  const list = await (await fetch(API + '/versions')).json();
  return (list.find((v) => v.latestStable) || list[0]).version;
}

async function run(ver, code) {
  const res = await fetch(`${API}/api/${ver}/compiler/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ args: '', files: [{ name: 'File.kt', text: code, publicId: '' }], confType: 'java' })
  });
  const data = await res.json();
  const errors = (data.errors && data.errors['File.kt'] || []).filter((e) => e.severity === 'ERROR');
  const stdout = [...String(data.text || '').matchAll(/<outStream>([\s\S]*?)<\/outStream>/g)].map((m) => m[1]).join('');
  return { stdout, errors, exception: data.exception };
}

(async () => {
  const ver = await version();
  console.log(`Kotlin ${ver}: checking ${EX.length} exercises`);
  const ids = new Set();
  let bad = 0;
  for (const ex of EX) {
    if (ids.has(ex.id)) { console.log(`  ✗ ${ex.id}: duplicate id`); bad++; }
    ids.add(ex.id);
    if (/!!/.test((ex.code || '') + (ex.solution || ''))) { console.log(`  ✗ ${ex.id}: uses !! (the book never does)`); bad++; }
    let code, want;
    if (ex.type === 'code') { code = ex.solution; want = ex.expected; }
    else if (ex.type === 'predict') { code = ex.code; want = ex.answer; }
    else { code = ex.code.replace('____', ex.answers[0]); want = null; }
    const r = await run(ver, code);
    const problem = r.errors.length ? 'does not compile: ' + r.errors.map((e) => `line ${e.interval.start.line + 1}: ${e.message}`).join('; ')
      : r.exception ? 'crashes: ' + r.exception.fullName
      : want !== null && norm(r.stdout) !== norm(want) ? `prints ${JSON.stringify(norm(r.stdout))}, expected ${JSON.stringify(norm(want))}`
      : '';
    console.log(`  ${problem ? '✗' : '✓'} ${ex.id}${problem ? ': ' + problem : ''}`);
    if (problem) bad++;
  }
  console.log(bad ? `${bad} problem(s).` : 'All exercises are correct.');
  process.exit(bad ? 1 : 0);
})().catch((err) => { console.error('Could not reach the Kotlin compiler service: ' + err.message); process.exit(2); });
