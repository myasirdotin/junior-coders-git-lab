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
if (fs.existsSync(path.join(root, 'book'))) {
  bundleDir(path.join(root, 'book'), path.join(root, 'book', 'chapters-bundle.js'), 'BOOK_CHAPTERS');
}
if (fs.existsSync(path.join(root, 'book-html'))) {
  bundleDir(path.join(root, 'book-html'), path.join(root, 'book-html', 'chapters-bundle.js'), 'BOOK_HTML_CHAPTERS');
}
if (fs.existsSync(path.join(root, 'book-css'))) {
  bundleDir(path.join(root, 'book-css'), path.join(root, 'book-css', 'chapters-bundle.js'), 'BOOK_CSS_CHAPTERS');
}
if (fs.existsSync(path.join(root, 'book-js'))) {
  bundleDir(path.join(root, 'book-js'), path.join(root, 'book-js', 'chapters-bundle.js'), 'BOOK_JS_CHAPTERS');
}
if (fs.existsSync(path.join(root, 'book-php'))) {
  bundleDir(path.join(root, 'book-php'), path.join(root, 'book-php', 'chapters-bundle.js'), 'BOOK_PHP_CHAPTERS');
}
if (fs.existsSync(path.join(root, 'book-mysql'))) {
  bundleDir(path.join(root, 'book-mysql'), path.join(root, 'book-mysql', 'chapters-bundle.js'), 'BOOK_MYSQL_CHAPTERS');
}
if (fs.existsSync(path.join(root, 'book-git'))) {
  bundleDir(path.join(root, 'book-git'), path.join(root, 'book-git', 'chapters-bundle.js'), 'BOOK_GIT_CHAPTERS');
}
if (fs.existsSync(path.join(root, 'book-cmd'))) {
  bundleDir(path.join(root, 'book-cmd'), path.join(root, 'book-cmd', 'chapters-bundle.js'), 'BOOK_CMD_CHAPTERS');
}
if (fs.existsSync(path.join(root, 'book-python'))) {
  bundleDir(path.join(root, 'book-python'), path.join(root, 'book-python', 'chapters-bundle.js'), 'BOOK_PYTHON_CHAPTERS');
}

