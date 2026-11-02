#!/usr/bin/env node
// Removes emoji from the site's own text (GEMINI.md §7c, §7j): none anywhere, except inside code examples that
// teach them (<pre>, <code>, <textarea>, fenced and inline code in Markdown, and the student templates listed in
// TEMPLATE_SCRIPTS). Plain text symbols that Unicode also counts as pictographs (arrows, ticks, ▶, ☰ …) stay.
//
//   node scripts/strip-emoji.js --html [files...]   tracked .html files (default: all except book-*/, which js/book-reader.js builds)
//   node scripts/strip-emoji.js --md [files...]     Markdown (default: every book-*/part-*/*.md chapter)
//   node scripts/strip-emoji.js --js <files...>     text in scripts (a regex literal must never contain an emoji)
//   node scripts/strip-emoji.js --check             list every emoji left in pages, chapters and the shared scripts; exit 1 if any
//   add --dry to report what would change without writing. Line endings are kept.
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const P = (...p) => path.join(ROOT, ...p);
const rel = (f) => path.relative(ROOT, f).replace(/\\/g, '/');

// one emoji cluster: a pictograph or keycap, with variation selectors, skin tones and joiner sequences
const CLUSTER = '(?:\\p{Extended_Pictographic}|[0-9#*]\\uFE0F?\\u20E3)(?:\\uFE0F|\\u200D\\p{Extended_Pictographic}|\\p{Emoji_Modifier})*';
const EMOJI = new RegExp(CLUSTER, 'gu');
// text symbols, not icons: keep them (their emoji-styled form with U+FE0F is still removed)
const KEEP = /^[←→↑↓↗↘↖↙✓✔✕✗▾▴▸▶◀●•☰⋯✦※⁃‹›«»×÷©®™]$/u;
const isKept = (c) => KEEP.test(c);
// pages whose inline <script> holds code the student sees and edits (templates, sample output): left alone
const TEMPLATE_SCRIPTS = ['Learning HTML/playground.html', 'Learning CSS/playground.html', 'Learning JS/playground.html',
  'studios/python-console/index.html', 'studios/web-studio/index.html'];
// shared scripts whose text the --check covers
const SCRIPTS = ['js/bei-nav.js', 'js/core.js', 'js/bei-core.js', 'js/book-reader.js', 'js/book-speaker.js', 'js/practice-cards.js',
  'js/pdf-download.js', 'js/tts-voices.js', 'js/bei-learning-cycle.js', 'js/bei-evaluator.js', 'js/bei-tutor.js', 'js/sql-lab.js',
  'js/php-lab.js', 'js/py-lab.js', 'js/kotlin-lab.js', 'js/data/books.js', 'scripts/build-books.js', 'scripts/check-books.js'];

/** Remove emoji from a run of plain text, tidying the space that sat next to them. */
function stripText(t) {
  if (!EMOJI.test(t)) return t;
  EMOJI.lastIndex = 0;
  return t.replace(new RegExp(`(\\s*)(${CLUSTER}(?:\\s*${CLUSTER})*)(\\s*)`, 'gu'), (m, pre, clusters, post, off, str) => {
    const kept = (clusters.match(EMOJI) || []).filter(isKept).join('');
    if (kept) return pre + kept + post;
    const before = str[off - 1] || '', after = str[off + m.length] || '';
    if (off === 0 || off + m.length === str.length) return '';            // "🌐 HTML" → "HTML", "Go 🚀" → "Go"
    if (!pre && !/[\p{L}\p{N}]/u.test(before)) return '';                 // "'🟢 Level 1'" → "'Level 1'", "**💡 Tip**" → "**Tip**"
    if (!post && !/[\p{L}\p{N}]/u.test(after)) return '';                 // "Go 🚀'" → "Go'", "done 🎉." → "done."
    return (pre || post) ? ' ' : '';
  });
}

/** Emoji left in text, ignoring the kept symbols. */
const leftovers = (t) => (t.match(EMOJI) || []).filter((c) => !isKept(c));

// ── HTML ─────────────────────────────────────────────────────────────────────
function processHtml(src, file, { write }) {
  const keepScripts = TEMPLATE_SCRIPTS.includes(file);
  let out = '', i = 0, found = 0;
  const stack = [];   // open tags that protect their text
  const PROTECT = new Set(['pre', 'code', 'textarea', 'style', 'script']);
  const re = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][\w-]*)((?:[^>"']|"[^"]*"|'[^']*')*)>/g;
  let m;
  const text = (t) => {
    const protectedBy = stack.find((s) => PROTECT.has(s));
    if (protectedBy === 'script' && !keepScripts) { const l = leftovers(t); found += l.length; return write ? stripText(t) : t; }
    if (protectedBy) return t;
    const l = leftovers(t); found += l.length;
    return write ? stripText(t) : t;
  };
  while ((m = re.exec(src))) {
    out += text(src.slice(i, m.index)); i = re.lastIndex;
    if (m[2]) {
      const name = m[2].toLowerCase();
      if (m[1] === '/') { const k = stack.lastIndexOf(name); if (k >= 0) stack.splice(k, 1); }
      else if (PROTECT.has(name) && !/\/\s*$/.test(m[3])) stack.push(name);
    }
    out += m[0];
  }
  out += text(src.slice(i));
  if (write) {
    // icon-only wrappers that are now empty
    out = out.replace(/[ \t]*<(span|div|i)\b([^>]*)>\s*<\/\1>\r?\n/g, (all, tag, attrs) =>
      (/\b(class="[^"]*(icon|-ico\b|emoji|avatar|glyph)[^"]*"|aria-hidden="true")/.test(attrs) && !/class="[^"]*(dot|pulse|wave|bar|line)[^"]*"/.test(attrs)) ? '' : all);
    out = out.replace(/<(span|i)\b([^>]*)>\s*<\/\1>/g, (all, tag, attrs) =>
      (/\b(class="[^"]*(icon|-ico\b|emoji|avatar|glyph)[^"]*"|aria-hidden="true")/.test(attrs) && !/class="[^"]*(dot|pulse|wave|bar|line)[^"]*"/.test(attrs)) ? '' : all);
    out = out.replace(/>[ \t]+</g, (s) => s.includes('\n') ? s : '> <').replace(/(<\/[a-z0-9]+>) {2,}/g, '$1 ');
  }
  return { out, found };
}

// ── Markdown ─────────────────────────────────────────────────────────────────
function processMd(src, file, { write }) {
  let fence = null, found = 0;
  const lines = src.split('\n').map((line) => {
    // CommonMark fences, as in scripts/check-books.js: a block opens with ``` or ~~~ (3 or more) and closes only on a
    // line with the same character, at least as many of them, and nothing else
    const f = line.match(/^\s{0,3}(`{3,}|~{3,})(.*)$/);
    if (!fence && f && !(f[1][0] === '`' && f[2].includes('`'))) { fence = f[1]; return line; }
    if (fence && f && f[1][0] === fence[0] && f[1].length >= fence.length && !f[2].trim()) { fence = null; return line; }
    if (fence) return line;
    // inline code stays as it is
    const parts = line.split(/(`[^`\n]*`)/);
    return parts.map((p, k) => {
      if (k % 2) return p;
      found += leftovers(p).length;
      return write ? stripText(p) : p;
    }).join('');
  });
  return { out: lines.join('\n'), found };
}

// ── scripts ──────────────────────────────────────────────────────────────────
function processJs(src, file, { write }) {
  let found = 0;
  const out = src.split('\n').map((l) => {
    if (/\\p\{|Extended_Pictographic|Emoji_Modifier/.test(l)) return l;   // regex definitions
    found += leftovers(l).length;
    return write ? stripText(l) : l;
  }).join('\n');
  return { out, found };
}

// ── run ──────────────────────────────────────────────────────────────────────
function run(files, fn, { write, label }) {
  let total = 0, changed = 0;
  for (const f of files) {
    const full = P(f);
    if (!fs.existsSync(full)) continue;
    const raw = fs.readFileSync(full, 'utf8');
    const nl = raw.includes('\r\n') ? '\r\n' : '\n';
    const { out, found } = fn(raw.replace(/\r\n/g, '\n'), f, { write });
    if (found) { total += found; if (write) console.log(`  ${f}: ${found} removed`); else console.log(`  ${f}: ${found}`); }
    if (write && found) { fs.writeFileSync(full, out.replace(/\n/g, nl)); changed++; }
  }
  console.log(`${label}: ${total} emoji${write ? ` removed from ${changed} file(s)` : ' found'}`);
  return total;
}
const tracked = (filter) => execSync('git ls-files -z', { cwd: ROOT }).toString().split('\0').filter((f) => f && filter(f));
const htmlFiles = () => tracked((f) => f.endsWith('.html') && !f.startsWith('book-') && !f.startsWith('scripts/'));
const mdChapters = () => tracked((f) => /^book-[^/]+\/.+\.md$/.test(f));

const args = process.argv.slice(2);
const dry = args.includes('--dry');
const mode = args.find((a) => /^--(html|md|js|check)$/.test(a));
const given = args.filter((a) => !a.startsWith('--'));
if (!mode) { console.log(fs.readFileSync(__filename, 'utf8').split('\n').slice(1, 11).join('\n')); process.exit(2); }
if (mode === '--check') {
  const n = run(htmlFiles(), processHtml, { write: false, label: 'pages' })
    + run(mdChapters(), processMd, { write: false, label: 'chapters' })
    + run(SCRIPTS, processJs, { write: false, label: 'scripts' });
  console.log(n ? `${n} emoji left: run node scripts/strip-emoji.js --html / --md / --js` : 'No emoji outside code examples.');
  process.exit(n ? 1 : 0);
}
if (mode === '--html') run(given.length ? given : htmlFiles(), processHtml, { write: !dry, label: 'pages' });
if (mode === '--md') run(given.length ? given : mdChapters(), processMd, { write: !dry, label: 'markdown' });
if (mode === '--js') { if (!given.length) { console.error('--js needs file paths'); process.exit(2); } run(given, processJs, { write: !dry, label: 'scripts' }); }
