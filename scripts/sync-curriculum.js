/**
 * Regenerates the CURRICULUM block in js/bei-nav.js from the real module pages:
 * one entry per `Learning <Track>/moduleN.html`, titled from its <title>, plus the track's
 * extra pages (playground, exercises, quiz, glossary, best-practices, tips) when they exist.
 *
 * Run after adding, removing or renaming a module page:   node scripts/sync-curriculum.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TRACKS = [
  { key: 'html',          name: 'HTML5 Foundations',          shortName: 'HTML Track',     dir: 'Learning HTML',          syllabus: 'learninghtml.html',          bookDir: 'book-html',          accent: '#ea580c' },
  { key: 'css',           name: 'Modern CSS & Layouts',       shortName: 'CSS Track',      dir: 'Learning CSS',           syllabus: 'learningcss.html',           bookDir: 'book-css',           accent: '#3b82f6' },
  { key: 'js',            name: 'JavaScript Track',           shortName: 'JS Track',       dir: 'Learning JS',            syllabus: 'learningjs.html',            bookDir: 'book-js',            accent: '#6366f1' },
  { key: 'php',           name: 'Server-Side PHP',            shortName: 'PHP Track',      dir: 'Learning PHP',           syllabus: 'learningphp.html',           bookDir: 'book-php',           accent: '#7c3aed' },
  { key: 'mysql',         name: 'MySQL & Databases',          shortName: 'MySQL Track',    dir: 'Learning MySQL',         syllabus: 'learningmysql.html',         bookDir: 'book-mysql',         accent: '#0ea5e9' },
  { key: 'laravel',       name: 'Laravel Framework',          shortName: 'Laravel Track',  dir: 'Learning Laravel',       syllabus: 'learninglaravel.html',       bookDir: 'book-laravel',       accent: '#ef4444' },
  { key: 'python',        name: 'Python & Ethical AI',        shortName: 'Python Track',   dir: 'Learning Python',        syllabus: 'learningpython.html',        bookDir: 'book-python',        accent: '#10b981' },
  { key: 'networks',      name: 'Networking & Web Protocols', shortName: 'Networks Track', dir: 'Learning Networks',      syllabus: 'learningnetworks.html',      bookDir: 'book-networks',      accent: '#0284c7' },
  { key: 'cybersecurity', name: 'Cybersecurity & Hygiene',    shortName: 'Security Track', dir: 'Learning Cybersecurity', syllabus: 'learningcybersecurity.html', bookDir: 'book-cybersecurity', accent: '#059669' }
];
const EXTRAS = [
  ['playground.html', '🧪', 'Playground'], ['exercises.html', '✍️', 'Exercises'], ['quiz.html', '❓', 'Quiz'],
  ['glossary.html', '📖', 'Glossary'], ['best-practices.html', '⭐', 'Best Practices'], ['tips.html', '💡', 'Tips']
];
const decode = (t) => t.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/&quot;/g, '"');

const curriculum = {};
for (const t of TRACKS) {
  const dir = path.join(ROOT, t.dir);
  if (!fs.existsSync(dir)) continue;
  const modules = fs.readdirSync(dir)
    .map(f => f.match(/^module(\d+)\.html$/)).filter(Boolean)
    .map(m => +m[1]).sort((a, b) => a - b)
    .map(num => {
      const html = fs.readFileSync(path.join(dir, `module${num}.html`), 'utf8');
      const m = html.match(/<title>([^<]*)<\/title>/i);
      let title = m ? decode(m[1]) : `Module ${num}`;
      title = title.replace(/\s*\|.*$/, '').replace(/^\s*Module\s*\d+\s*[:\-–]\s*/i, '').trim();
      return { num, title, file: `module${num}.html` };
    });
  if (!modules.length) continue;
  const extras = EXTRAS.filter(([f]) => fs.existsSync(path.join(dir, f))).map(([file, icon, title]) => ({ file, icon, title }));
  curriculum[t.key] = { name: t.name, shortName: t.shortName, dir: t.dir, syllabus: t.syllabus, bookDir: t.bookDir, accent: t.accent, modules, extras };
}

const navPath = path.join(ROOT, 'js', 'bei-nav.js');
let src = fs.readFileSync(navPath, 'utf8');
const nl = src.includes('\r\n') ? '\r\n' : '\n';
const lines = src.split(nl);
const start = lines.findIndex(l => l.includes('// CURRICULUM-START'));
const end = lines.findIndex(l => l.includes('// CURRICULUM-END'));
if (start === -1 || end === -1 || end <= start) throw new Error('CURRICULUM markers not found in js/bei-nav.js');
const body = ('    const CURRICULUM = ' + JSON.stringify(curriculum, null, 4) + ';').split('\n').map((l, i) => (i ? '    ' + l : l));
const out = [...lines.slice(0, start + 1), ...body, ...lines.slice(end)];
fs.writeFileSync(navPath, out.join(nl));
for (const [k, v] of Object.entries(curriculum)) console.log(`${k}: ${v.modules.length} modules, ${v.extras.length} extras`);
console.log('js/bei-nav.js CURRICULUM updated');
