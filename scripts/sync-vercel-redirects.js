#!/usr/bin/env node
// Folder pages need a trailing slash, and short links need to work on Vercel.
//
// Why: on Vercel, /studios (no trailing slash) serves studios/index.html without redirecting, so the browser
// resolves relative links from the site root: "web-studio/index.html" becomes /web-studio/index.html → 404.
// Apache adds the slash by itself, which is why everything works on localhost. GEMINI.md §5 forbids
// "trailingSlash": false, and "trailingSlash": true would break the clean URLs of root pages (/cheatsheet-js).
//
// This script:
//   1. puts a tiny script at the top of <head> in every folder's index.html that adds the missing slash
//      (only when the address has no slash and no file extension, so it can never loop);
//   2. writes short-link redirects to vercel.json ("/web-studio" → "/studios/web-studio/").
// It is safe to run again: the head snippet is marked and replaced, not duplicated.
//
// Run after adding a folder with an index.html:  node scripts/sync-vercel-redirects.js
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SKIP = new Set(['.git', '.render', 'node_modules', '.claude', '.gemini', 'scripts', 'docs', 'assets', 'styles', 'js']);

const SHORT_LINKS = {
  '/web-studio': '/studios/web-studio/',
  '/python-console': '/studios/python-console/',
  '/php-console': '/studios/php-console/',
  '/sql-sandbox': '/studios/sql-sandbox/',
  '/textbooks': '/library/books/',
  '/cheatsheets': '/library/cheatsheets/',
  '/start': '/paths/',
};

const MARK = 'jc-folder-slash';
const SNIPPET = `<script id="${MARK}">/* folder page: add the missing trailing slash so relative links work (scripts/sync-vercel-redirects.js) */` +
  `(function(){var p=location.pathname;if(p.slice(-1)!=='/'&&!/\\.[a-z0-9]+$/i.test(p)){location.replace(p+'/'+location.search+location.hash);}})();</script>`;

function folders(dir, rel) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory() || SKIP.has(e.name) || e.name.startsWith('.')) continue;
    const r = rel + '/' + e.name;
    if (fs.existsSync(path.join(dir, e.name, 'index.html'))) out.push(r);
    out.push(...folders(path.join(dir, e.name), r));
  }
  return out;
}

const dirs = folders(ROOT, '').sort();
let added = 0;
for (const d of dirs) {
  const file = path.join(ROOT, d, 'index.html');
  let html = fs.readFileSync(file, 'utf8');
  const nl = html.includes('\r\n') ? '\r\n' : '\n';
  const existing = new RegExp(`[ \\t]*<script id="${MARK}">[\\s\\S]*?</script>\\r?\\n`);
  if (existing.test(html)) { html = html.replace(existing, ''); } else { added++; }
  // first thing inside <head> (right after the charset meta when there is one)
  const charset = html.match(/<meta charset="[^"]*">\r?\n/i);
  const at = charset ? charset.index + charset[0].length : html.search(/<head[^>]*>/i) + html.match(/<head[^>]*>/i)[0].length + nl.length;
  const indent = (html.slice(0, at).match(/\n([ \t]*)<meta charset/i) || [, '    '])[1];
  html = html.slice(0, at) + indent + SNIPPET + nl + html.slice(at);
  fs.writeFileSync(file, html);
}

const file = path.join(ROOT, 'vercel.json');
const config = JSON.parse(fs.readFileSync(file, 'utf8'));
config.redirects = Object.entries(SHORT_LINKS).map(([source, destination]) => ({ source, destination, permanent: false }));
fs.writeFileSync(file, JSON.stringify(config, null, 2) + '\n');
console.log(`${dirs.length} folder pages checked (${added} new snippets); vercel.json: ${config.redirects.length} short-link redirects`);
