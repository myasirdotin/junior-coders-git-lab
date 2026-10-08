const fs = require('fs');
const path = require('path');
const vm = require('vm');

const books = [
  'book-cmd', 'book-css', 'book-cybersecurity', 'book-git', 'book-html',
  'book-js', 'book-laravel', 'book-mysql', 'book-networks', 'book-php', 'book-python'
];
const root = path.resolve(__dirname, '..');

let allGood = true;

for (const b of books) {
  const file = path.join(root, b, 'index.html');
  const html = fs.readFileSync(file, 'utf8');

  // Extract all <script> tags that don't have src
  const scriptRegex = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  let idx = 0;
  while ((match = scriptRegex.exec(html)) !== null) {
    idx++;
    const code = match[1];
    try {
      new vm.Script(code);
    } catch (err) {
      console.error(`[SYNTAX ERROR] ${b}/index.html script #${idx}:`, err.message);
      allGood = false;
    }
  }
}

if (allGood) {
  console.log('✅ ALL scripts across all 11 book readers have 100% valid JavaScript syntax!');
} else {
  process.exit(1);
}
