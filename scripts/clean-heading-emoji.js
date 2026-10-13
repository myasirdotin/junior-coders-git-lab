#!/usr/bin/env node
// Keeps emoji only on the textbook "signpost" headings (the same boxes in every chapter, GEMINI §7j) and removes
// them from chapter titles and ordinary topic headings, so the icons keep their meaning.
//
//   node scripts/clean-heading-emoji.js <file.md> ...   clean these chapter files
//   node scripts/clean-heading-emoji.js --all           clean every book-*/part-*/chNN-*.md
//   add --dry to only report what would change
const fs = require('fs');
const path = require('path');

const SIGNPOSTS = ['Real-Life Story', 'What You Will Learn', 'Common Mistake', 'Try It', 'Recap', 'Practice',
  'Level 1', 'Level 2', 'Level 3', 'Predict the Output', 'Predict the Screen', 'Real-World Connection',
  'Code Detective', 'Key Terms', 'Amānah'];
// one emoji "cluster": a pictograph or keycap, with variation selectors, skin tones and joiners
const EMOJI = /(?:\p{Extended_Pictographic}|[0-9#*]️?⃣)(?:️|‍(?:\p{Extended_Pictographic})|\p{Emoji_Modifier})*/gu;

function clean(text) {
  const nl = text.includes('\r\n') ? '\r\n' : '\n';
  let fence = null, changed = 0;
  const out = text.split(/\r?\n/).map((line) => {
    const f = line.match(/^\s{0,3}(`{3,}|~{3,})/);
    if (f) { if (!fence) fence = f[1][0]; else if (f[1][0] === fence) fence = null; return line; }
    if (fence) return line;                                   // never touch "# comments" inside code blocks
    const m = line.match(/^(#{1,4}) (.*)$/);
    if (!m) return line;
    const body = m[2];
    if (m[1] !== '#' && SIGNPOSTS.some((s) => body.replace(EMOJI, '').trim().startsWith(s))) return line;
    // remove emoji at the start or end of the heading (and the space next to them); keep any inside the text
    const stripped = body.replace(new RegExp(`^(?:${EMOJI.source}\\s*)+`, 'u'), '')
                         .replace(new RegExp(`(?:\\s*${EMOJI.source})+\\s*$`, 'u'), '').trim();
    if (stripped === body || !stripped) return line;
    changed++;
    return m[1] + ' ' + stripped;
  });
  return { text: out.join(nl), changed };
}

const args = process.argv.slice(2);
const dry = args.includes('--dry');
let files = args.filter((a) => !a.startsWith('--'));
if (args.includes('--all')) {
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
  files = fs.readdirSync('.').filter((d) => /^book-/.test(d)).flatMap(walk).filter((f) => /[\\/]part-[^\\/]+[\\/]ch\d+-[^\\/]+\.md$/.test(f));
}
let total = 0, touched = 0;
for (const f of files) {
  const before = fs.readFileSync(f, 'utf8');
  const { text, changed } = clean(before);
  if (changed) { touched++; total += changed; if (!dry) fs.writeFileSync(f, text); }
}
console.log(`${dry ? 'Would clean' : 'Cleaned'} ${total} headings in ${touched} of ${files.length} files.`);
