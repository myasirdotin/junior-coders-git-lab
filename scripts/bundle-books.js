/**
 * Helper script to bundle all markdown chapters into chapters-bundle.js
 * for offline and file:/// execution without CORS limitations.
 * Run with: node scripts/bundle-books.js
 */
const fs = require('fs');
const path = require('path');

function bundleDir(baseDir, outputFile, varName) {
  const result = {};

  function scan(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scan(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const relative = path.relative(baseDir, fullPath).replace(/\\/g, '/');
        const content = fs.readFileSync(fullPath, 'utf8');
        result[relative] = content;
      }
    }
  }

  scan(baseDir);
  const jsContent = `// Auto-generated offline chapter bundle for Junior Coders Book\nwindow.${varName} = ${JSON.stringify(result, null, 2)};\n`;
  fs.writeFileSync(outputFile, jsContent, 'utf8');
  console.log(`Bundled ${Object.keys(result).length} chapters into ${outputFile}`);
}

const root = path.resolve(__dirname, '..');
bundleDir(path.join(root, 'book'), path.join(root, 'book', 'chapters-bundle.js'), 'BOOK_CHAPTERS');
bundleDir(path.join(root, 'book-js'), path.join(root, 'book-js', 'chapters-bundle.js'), 'BOOK_JS_CHAPTERS');
