const fs = require('fs');
const path = require('path');

const books = [
  'book-cmd', 'book-css', 'book-cybersecurity', 'book-git', 'book-html',
  'book-js', 'book-laravel', 'book-mysql', 'book-networks', 'book-php', 'book-python'
];

const root = path.resolve(__dirname, '..');

for (const b of books) {
  const file = path.join(root, b, 'index.html');
  if (!fs.existsSync(file)) continue;

  let content = fs.readFileSync(file, 'utf8');

  // 1. Add script tag if not present
  if (!content.includes('book-pagination.js')) {
    const speakerPattern = /<script src="\.\.\/js\/book-speaker\.js"><\/script>/g;
    if (speakerPattern.test(content)) {
      content = content.replace(speakerPattern, '<script src="../js/book-speaker.js"></script>\n  <script src="../js/book-pagination.js"></script>');
      console.log(`[Script Tag] Added book-pagination.js to ${b}`);
    } else {
      console.warn(`[Script Tag] book-speaker.js not found in ${b}`);
    }
  } else {
    console.log(`[Script Tag] book-pagination.js already in ${b}`);
  }

  // 2. Call renderChapterPagination() right after initBookSpeaker()
  if (!content.includes('renderChapterPagination(')) {
    const speakerCallPattern = /if\s*\(window\.initBookSpeaker\)\s*window\.initBookSpeaker\(\);/g;
    content = content.replace(speakerCallPattern, 'if (window.initBookSpeaker) window.initBookSpeaker();\n        if (window.renderChapterPagination) window.renderChapterPagination();');
    console.log(`[Function Call] Added renderChapterPagination call to ${b}`);
  } else {
    console.log(`[Function Call] renderChapterPagination call already in ${b}`);
  }

  fs.writeFileSync(file, content, 'utf8');
}

console.log('Pagination hook added to all books!');
