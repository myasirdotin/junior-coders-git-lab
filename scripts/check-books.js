#!/usr/bin/env node
// Checks that all textbooks follow the agreed method (GEMINI.md §7j and §1).
//
//   node scripts/check-books.js            all books
//   node scripts/check-books.js php css    only these books
//
// ERRORS (exit code 1) break the method and must be fixed:
//   - chapter files (chNN-*.md): first heading "# Chapter N: …" with N = file number; the template sections in order
//     (🌟 Real-Life Story, 🎯 What You Will Learn, ⚠️ Common Mistake, ✍️ Try It, 📝 Recap, 🏆 Practice);
//     Practice has 🟢 Level 1 / 🟡 Level 2 / 🔴 Level 3, each with a hidden answer (<details>)
//   - every file: no numbered section headings ("## 3. …"), at most one emoji per heading, <details> opened and
//     closed the same number of times, no raw LaTeX ($\frac…$, $2^{8}$)
//   - each book's sidebar menu links only to files that exist, and lists every chapter file
//   - the offline bundle (chapters-bundle.js) has the same text as the .md files (run bundle-books.js after edits)
//   - the Textbooks page (library/books/index.html) shows the real number of chapters
// WARNINGS (reported, exit code 0): text diagrams wider than 46 characters (too wide for phones), words from the
//   GEMINI.md §1.3 list (check the context: a chapter may name them as things we refuse to build).
//
// Projects (projNN-*.md) and the JavaScript book's special parts are "extras": they get the per-file checks, plus
// What You Will Learn and Recap, but not the full template.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const ONLY = process.argv.slice(2).map(s => s.replace(/^book-/, ''));
const errors = [], warnings = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

const TEMPLATE = ['🌟 Real-Life Story', '🎯 What You Will Learn', '⚠️ Common Mistake', '✍️ Try It', '📝 Recap', '🏆 Practice'];
const LEVELS = ['🟢 Level 1', '🟡 Level 2', '🔴 Level 3'];
const EMOJI = /\p{Extended_Pictographic}/gu;
const BOX = /[┌┐└┘├┤┬┴┼─│═║╔╗╚╝╠╣╦╩╬]/;
const LATEX = /\$[^$\n]{0,80}?(\\(frac|text|times|approx|log|cdot|sqrt|leq|geq)\b|\^\{|\^[0-9a-zA-Z])[^$\n]*?\$/;
const FORBIDDEN = /\b(movies?|cinemas?|netflix|spotify|music|songs?|playlists?|concerts?|celebrit(y|ies)|casino|lottery|gambl\w*|betting|dice|pepperoni|bacon|pork|alcohol|beer|wine|minecraft|pok[eé]mon|marvel|superheroe?s?|harry potter|wizards?|sorcer\w*|instagram|tiktok)\b/i;

const rel = (f) => path.relative(ROOT, f).replace(/\\/g, '/');
const books = fs.readdirSync(ROOT).filter(d => /^book-[a-z]+$/.test(d) && fs.existsSync(path.join(ROOT, d, 'index.html')))
  .filter(d => !ONLY.length || ONLY.includes(d.slice(5))).sort();

function chapterFiles(book) {
  const out = [];
  const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).forEach(e => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p); else if (e.name.endsWith('.md')) out.push(p);
  });
  fs.readdirSync(path.join(ROOT, book), { withFileTypes: true })
    .filter(e => e.isDirectory() && e.name.startsWith('part-')).forEach(e => walk(path.join(ROOT, book, e.name)));
  return out.sort();
}

function checkFile(file) {
  const name = path.basename(file);
  const where = rel(file);
  const text = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const isChapter = /^ch\d+/.test(name);
  // headings outside code fences
  const lines = text.split('\n');
  // A code block opens with ``` or ~~~ (3 or more) and closes only on a line with the same character, at least as
  // many of them, and nothing else (CommonMark), so a README with its own ``` fences inside a ````markdown block works.
  let fence = null;
  const heads = [];
  const diagrams = [];
  let block = [];
  lines.forEach((l, i) => {
    const f = l.match(/^\s{0,3}(`{3,}|~{3,})(.*)$/);
    if (!fence && f && !(f[1][0] === '`' && f[2].includes('`'))) { fence = f[1]; block = []; return; }
    if (fence && f && f[1][0] === fence[0] && f[1].length >= fence.length && !f[2].trim()) {
      if (block.some(b => BOX.test(b))) diagrams.push({ line: i + 1, width: Math.max(...block.map(b => [...b].length)) });
      fence = null; block = []; return;
    }
    if (fence) { block.push(l); return; }
    const m = l.match(/^(#{1,4})\s+(.*)$/);
    if (m) heads.push({ level: m[1].length, text: m[2].trim(), line: i + 1 });
  });
  const prose = text.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');

  // first heading
  const h1 = heads.find(h => h.level === 1);
  if (!h1) err(where, 'no "# " title');
  if (isChapter) {
    const n = parseInt(name.match(/^ch0*(\d+)/)[1], 10);
    if (!h1 || !new RegExp(`^Chapter ${n}:`).test(h1.text)) err(where, `title must start "# Chapter ${n}:" (found "${h1 ? h1.text.slice(0, 40) : ''}")`);
  }
  if (heads.filter(h => h.level === 1).length > 1) err(where, 'more than one "# " title');

  // per-heading rules
  heads.forEach(h => {
    if (h.level >= 2 && /^\d+\.\s/.test(h.text)) err(where, `line ${h.line}: numbered heading "${h.text.slice(0, 40)}"`);
    const emojis = (h.text.match(EMOJI) || []).length;
    if (emojis > 1) err(where, `line ${h.line}: ${emojis} emoji in heading "${h.text.slice(0, 40)}"`);
  });

  // template
  const h2 = heads.filter(h => h.level === 2).map(h => h.text);
  const required = isChapter ? TEMPLATE : ['🎯 What You Will Learn', '📝 Recap'];
  let last = -1;
  required.forEach(t => {
    const at = h2.findIndex(x => x.startsWith(t));
    if (at === -1) err(where, `missing "## ${t}"`);
    else if (at < last) err(where, `"## ${t}" is out of order`);
    else last = at;
  });
  if (isChapter) {
    const p = text.indexOf('## 🏆 Practice');
    const practice = p === -1 ? '' : text.slice(p);
    LEVELS.forEach(lv => { if (!practice.includes('### ' + lv)) err(where, `Practice is missing "### ${lv}"`); });
    if ((practice.match(/<details>/g) || []).length < 3) err(where, 'Practice needs a hidden answer (<details>) for each level');
  }

  // images and links in the text: the reader shows chapters on the book page (book-KEY/index.html), so a relative
  // path must work from the book folder, not from the chapter file; and never start at the site root (GEMINI §7.3)
  const bookDir = path.join(ROOT, rel(file).split('/')[0]);
  for (const m of prose.matchAll(/!?\[[^\]]*\]\(([^)\s]+)[^)]*\)|(?:src|href)="([^"]+)"/g)) {
    const url = (m[1] || m[2]).split('#')[0].split('?')[0];
    if (!url || /^(https?:|mailto:|data:|#|\{\{)/i.test(url)) continue;
    if (url.startsWith('/')) { err(where, `link starts at the site root: ${url}`); continue; }
    if (!fs.existsSync(path.join(bookDir, decodeURIComponent(url)))) err(where, `link does not resolve from the book page: ${url}`);
  }

  // details balance, LaTeX
  const open = (text.match(/<details[\s>]/g) || []).length, close = (text.match(/<\/details>/g) || []).length;
  if (open !== close) err(where, `<details> opened ${open} times but closed ${close} times`);
  const lx = prose.match(LATEX);
  if (lx) err(where, `raw LaTeX: ${lx[0].slice(0, 40)}`);

  // warnings
  diagrams.filter(d => d.width > 46).forEach(d => warn(where, `line ${d.line}: diagram ${d.width} characters wide (phones fit about 46)`));
  const fb = prose.match(FORBIDDEN);
  if (fb) warn(where, `§1.3 word "${fb[0]}" (check the context)`);
  return isChapter;
}

let chapterCount = 0;
const libraryPage = fs.readFileSync(path.join(ROOT, 'library/books/index.html'), 'utf8');
for (const book of books) {
  const files = chapterFiles(book);
  if (!files.length) { warn(book, 'no chapter files (book written inside index.html?)'); continue; }
  let chapters = 0;
  files.forEach(f => { if (checkFile(f)) chapters++; });
  chapterCount += chapters;

  // sidebar menu ↔ files. Books on the shared reader (js/book-reader.js) build the menu from the bundle, so only the
  // extras they list (projects, reference, teacher guide) need checking; older pages list every chapter in
  // loadChapter('…') links.
  const index = fs.readFileSync(path.join(ROOT, book, 'index.html'), 'utf8');
  const onDisk = new Set(files.map(f => path.relative(path.join(ROOT, book), f).replace(/\\/g, '/')));
  if (index.includes('book-reader.js')) {
    const m = index.match(/window\.JC_BOOK\s*=\s*(\{[\s\S]*?\});\s*<\/script>/);
    let conf = null;
    try { conf = m && JSON.parse(m[1].split('<\\/').join('</')); } catch (e) { err(`${book}/index.html`, 'JC_BOOK settings are not valid JSON: ' + e.message); }
    if (!m) err(`${book}/index.html`, 'no window.JC_BOOK settings found');
    if (conf) {
      const extras = conf.extras || [];
      extras.forEach(x => { if (!fs.existsSync(path.join(ROOT, book, x.file))) err(`${book}/index.html`, `extra "${x.label}" points to missing file ${x.file}`); });
      onDisk.forEach(f => {
        if (!/^part-\d+[^/]*\/ch\d+/.test(f) && !extras.some(x => x.file === f)) err(`${book}/index.html`, `not a chapter and not in JC_BOOK.extras, so the menu hides it: ${f}`);
      });
      const want = `BOOK_${book.slice(5).toUpperCase()}_CHAPTERS`;
      if (conf.bundle !== want) err(`${book}/index.html`, `JC_BOOK.bundle should be ${want}`);
    }
  } else {
    const linked = new Set([...index.matchAll(/loadChapter\('([^']+\.md)'/g)].map(x => x[1]));
    linked.forEach(l => { if (!onDisk.has(l) && !fs.existsSync(path.join(ROOT, book, l))) err(`${book}/index.html`, `menu links to missing file ${l}`); });
    onDisk.forEach(f => { if (!linked.has(f)) err(`${book}/index.html`, `chapter file not in the menu: ${f}`); });
  }

  // offline bundle up to date
  const bundleFile = path.join(ROOT, book, 'chapters-bundle.js');
  if (!fs.existsSync(bundleFile)) err(book, 'no chapters-bundle.js (run node scripts/bundle-books.js)');
  else {
    const sandbox = { window: {} };
    try { vm.runInNewContext(fs.readFileSync(bundleFile, 'utf8'), sandbox); } catch (e) { err(rel(bundleFile), 'cannot be read: ' + e.message); }
    const data = Object.values(sandbox.window)[0] || {};
    const norm = (s) => String(s).replace(/\r\n/g, '\n');
    onDisk.forEach(f => {
      const disk = norm(fs.readFileSync(path.join(ROOT, book, f), 'utf8'));
      if (!(f in data)) err(rel(bundleFile), `missing ${f} (run node scripts/bundle-books.js)`);
      else if (norm(data[f]) !== disk) err(rel(bundleFile), `out of date for ${f} (run node scripts/bundle-books.js)`);
    });
  }

  // Textbooks page count
  const card = libraryPage.match(new RegExp(`data-book="${book}"[\\s\\S]*?class="tb-chapters[^"]*">([^<]*)<`));
  if (!card) warn('library/books/index.html', `no card for ${book}`);
  else if (!new RegExp(`^${chapters} chapters$`).test(card[1].trim())) err('library/books/index.html', `${book} card says "${card[1].trim()}", files have ${chapters} chapters`);
}

// generated files (book pages, bundles, Textbooks cards, Library line, site search) match js/data/books.js
if (!ONLY.length) {
  try {
    const { build } = require('./build-books.js');
    build({ write: false }).stale.forEach((f) => err(f, 'out of date with js/data/books.js or the chapter files (run node scripts/bundle-books.js)'));
  } catch (e) { err('scripts/build-books.js', 'could not run: ' + e.message); }
}

const show = (title, list) => { if (list.length) console.log(`\n${title} (${list.length})\n  ` + list.join('\n  ')); };
show('ERRORS', errors);
show('WARNINGS', warnings);
console.log(`\nChecked ${books.length} books, ${chapterCount} chapters: ${errors.length} errors, ${warnings.length} warnings.`);
process.exit(errors.length ? 1 : 0);
