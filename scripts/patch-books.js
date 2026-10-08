const fs = require('fs');
const path = require('path');

const books = [
  { dir: 'book-cmd', varName: 'BOOK_CMD_CHAPTERS', paramNav: 'navElement' },
  { dir: 'book-css', varName: 'BOOK_CSS_CHAPTERS', paramNav: 'element' },
  { dir: 'book-cybersecurity', varName: 'BOOK_CYBERSECURITY_CHAPTERS', paramNav: 'navElement' },
  { dir: 'book-git', varName: 'BOOK_GIT_CHAPTERS', paramNav: 'navElement' },
  { dir: 'book-html', varName: 'BOOK_HTML_CHAPTERS', paramNav: 'element' },
  { dir: 'book-js', varName: 'BOOK_JS_CHAPTERS', paramNav: 'element' },
  { dir: 'book-laravel', varName: null, paramNav: 'el' },
  { dir: 'book-mysql', varName: 'BOOK_MYSQL_CHAPTERS', paramNav: 'element' },
  { dir: 'book-networks', varName: 'BOOK_NETWORKS_CHAPTERS', paramNav: 'navElement' },
  { dir: 'book-php', varName: 'BOOK_PHP_CHAPTERS', paramNav: 'element' },
  { dir: 'book-python', varName: 'BOOK_PYTHON_CHAPTERS', paramNav: 'navElement' }
];

const baseScript = `  <script>
    (function() {
      try {
        var p = window.location.pathname;
        if (window.location.protocol !== 'file:' && !p.endsWith('/') && !p.endsWith('.html')) {
          var b = document.createElement('base');
          b.href = window.location.origin + p + '/';
          document.head.appendChild(b);
        }
      } catch(e) {}
    })();
  </script>`;

const root = path.resolve(__dirname, '..');

for (const b of books) {
  const file = path.join(root, b.dir, 'index.html');
  if (!fs.existsSync(file)) {
    console.log(`Skipping missing ${file}`);
    continue;
  }
  let content = fs.readFileSync(file, 'utf8');

  // 1. Inject baseScript if not already present
  if (!content.includes("var b = document.createElement('base');")) {
    const vpPattern = /<meta name="viewport"[^>]*>/i;
    if (vpPattern.test(content)) {
      content = content.replace(vpPattern, match => `${match}\n${baseScript}`);
      console.log(`[Base Tag] Injected into ${b.dir}`);
    } else {
      console.warn(`[Base Tag] No viewport meta found in ${b.dir}`);
    }
  } else {
    console.log(`[Base Tag] Already present in ${b.dir}`);
  }

  // 2. Enhance loadChapter in books that have bundle caches
  if (b.varName) {
    // Style A: resp style (cmd, git, python, networks, cybersecurity)
    const styleAPattern = /const resp = await fetch\(path\);\s*if \(!resp\.ok\) throw new Error\('Failed to fetch chapter file'\);\s*md = await resp\.text\(\);/;
    if (styleAPattern.test(content)) {
      const styleAReplacement = `let resp = null;
          try {
            resp = await fetch(path);
          } catch (_) {}
          if (!resp || !resp.ok) {
            const segs = window.location.pathname.split('/').filter(Boolean);
            const folder = segs.length ? segs[segs.length - 1] : '';
            if (folder && folder.startsWith('book-') && !path.startsWith(folder)) {
              try {
                resp = await fetch(folder + '/' + path);
              } catch (_) {}
            }
          }
          if (resp && resp.ok) {
            md = await resp.text();
          } else {
            throw new Error('Failed to fetch chapter file: ' + path);
          }`;
      content = content.replace(styleAPattern, styleAReplacement);
      console.log(`[Fetch Fallback Style A] Upgraded in ${b.dir}`);
    }
  }

  fs.writeFileSync(file, content, 'utf8');
}

console.log('Book patch completed!');
