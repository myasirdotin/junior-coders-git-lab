#!/usr/bin/env node
// Kept so the documented command still works: everything about the textbooks (bundles, book pages, Textbooks
// page cards, Library line, site search entries) is now built by scripts/build-books.js from js/data/books.js.
const { build } = require('./build-books.js');
const { stale, counts } = build({ write: true });
const total = Object.values(counts).reduce((a, b) => a + b, 0);
console.log(`Books: ${Object.keys(counts).length}, chapters: ${total}. ${stale.length ? 'Updated:\n  ' + stale.join('\n  ') : 'Nothing changed.'}`);
