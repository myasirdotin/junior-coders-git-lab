#!/usr/bin/env node
/**
 * Junior Coders — Systematic Teacher Lesson Plan Generator
 * Generates and injects comprehensive, school-ready 45-minute Lesson Plans
 * into textbook chapters immediately before '## Real-Life Story'.
 *
 * Usage:
 *   node scripts/add-lesson-plans.js html
 *   node scripts/add-lesson-plans.js css js
 *   node scripts/add-lesson-plans.js --all
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// Provide global.window so js/data/books.js loads cleanly in Node
global.window = {};
require('../js/data/books.js');

// Map books by key
const BOOK_CONF = {};
(global.window.JC_BOOKS || []).forEach(b => {
  BOOK_CONF[b.key] = b;
});

const args = process.argv.slice(2);
const targetBooks = args.includes('--all')
  ? ['html', 'css', 'js', 'cmd', 'git', 'php', 'mysql']
  : args.map(a => a.replace(/^book-/, ''));

if (!targetBooks.length) {
  console.log('Usage: node scripts/add-lesson-plans.js <book-keys...> or --all');
  console.log('Available targets: html, css, js, cmd, git, php, mysql');
  process.exit(1);
}

function cleanMarkdown(text) {
  return text
    .replace(/<details>[\s\S]*?<\/details>/g, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/```[a-z0-9_-]*/gi, ' ')
    .replace(/`+/g, '')
    .replace(/(src|href)="[^"]*"/gi, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\p{Extended_Pictographic}️?/gu, '')
    .replace(/[|]/g, ' ')
    .replace(/"/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function extractSection(content, headingRegex) {
  const lines = content.split('\n');
  let capturing = false;
  let result = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (headingRegex.test(line)) {
      capturing = true;
      continue;
    }
    if (capturing) {
      if (/^##\s+/.test(line)) {
        break;
      }
      result.push(line);
    }
  }
  return result.join('\n').trim();
}

function parseObjectives(learnSection) {
  const lines = learnSection.split('\n');
  const bullets = [];
  for (const line of lines) {
    const m = line.match(/^[-*]\s+(.*)$/);
    if (m) {
      let b = cleanMarkdown(m[1]);
      if (b) bullets.push(b);
    }
  }
  return bullets.slice(0, 4);
}

function parseStorySnippet(storySection) {
  const paras = storySection.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
  const first = paras[0] || 'Introduce the core computing concept using the chapter analogy.';
  let cleaned = cleanMarkdown(first);
  if (cleaned.length > 200) {
    cleaned = cleaned.substring(0, 197) + '...';
  }
  return cleaned;
}

function parseMistake(mistakeSection) {
  const paras = mistakeSection.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
  const first = paras[0] || 'Overlooking basic syntax rules or order of execution.';
  let cleaned = cleanMarkdown(first);
  if (cleaned.length > 180) {
    cleaned = cleaned.substring(0, 177) + '...';
  }
  return cleaned;
}

function parseTryIt(trySection) {
  const lines = trySection.split('\n').map(l => l.trim()).filter(Boolean);
  const firstAction = lines.find(l => /^(\d+\.|\*|-)\s+/.test(l)) || lines[0] || 'Complete the hands-on code trial in the development environment.';
  let cleaned = cleanMarkdown(firstAction).replace(/^(\d+\.|\*|-)\s+/, '');
  if (cleaned.length > 170) {
    cleaned = cleaned.substring(0, 167) + '...';
  }
  return cleaned;
}

function parseLevel1Questions(practiceSection) {
  const p1Match = practiceSection.match(/###\s+Level 1:\s*Recall[\s\S]*?(?=(###\s+Level 2|<details>|$))/i);
  if (!p1Match) return 'Answer Level 1 Recall questions in the textbook.';
  const lines = p1Match[0].split('\n').filter(l => /^\d+\.\s+/.test(l.trim()));
  if (lines.length) {
    let q = cleanMarkdown(lines[0].replace(/^\d+\.\s+/, ''));
    if (q.length > 140) q = q.substring(0, 137) + '...';
    return q;
  }
  return 'Answer Level 1 Recall questions to confirm core comprehension.';
}

function generateLessonPlan(bookKey, filePath) {
  let content = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');

  // If chapter already has "## Teacher Lesson Plan", remove it so we can re-inject a pristine version
  if (content.includes('## Teacher Lesson Plan')) {
    content = content.replace(/## Teacher Lesson Plan[\s\S]*?(?=## Real-Life Story)/m, '');
  }

  const bookInfo = BOOK_CONF[bookKey] || { grades: 'Grades 6–8', title: 'Computer Science' };
  const grades = bookInfo.grades || 'Grades 6–8';

  // Extract title
  const h1Match = content.match(/^#\s+(Chapter\s+(\d+):\s*(.*))$/m);
  if (!h1Match) return null;
  const chNum = h1Match[2];
  const chTitle = cleanMarkdown(h1Match[3]);

  // Extract part name from path
  const relPath = path.relative(path.join(ROOT, 'book-' + bookKey), filePath).replace(/\\/g, '/');
  const partFolder = relPath.split('/')[0];
  const partName = (bookInfo.parts && bookInfo.parts[partFolder])
    ? bookInfo.parts[partFolder][0]
    : partFolder.replace(/^part-\d+-/, '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  // Extract sections
  const learnRaw = extractSection(content, /^##\s+What You Will Learn/i);
  const storyRaw = extractSection(content, /^##\s+Real-Life Story/i);
  const mistakeRaw = extractSection(content, /^##\s+Common Mistake/i);
  const tryRaw = extractSection(content, /^##\s+Try It/i);
  const practiceRaw = extractSection(content, /^##\s+Practice/i);

  const objectives = parseObjectives(learnRaw);
  if (!objectives.length) {
    objectives.push(`Understand the foundational principles of ${chTitle.toLowerCase()}.`);
    objectives.push(`Demonstrate accurate syntax and structure through practical examples.`);
    objectives.push(`Apply problem-solving logic to complete guided and independent exercises.`);
  }

  const hookText = parseStorySnippet(storyRaw);
  const mistakeText = parseMistake(mistakeRaw);
  const labActivity = parseTryIt(tryRaw);
  const plenaryQ = parseLevel1Questions(practiceRaw);

  const objectivesMarkdown = objectives.map((obj, idx) => `${idx + 1}. ${obj}`).join('\n');

  // Tool recommendation based on subject
  let toolName = 'Web Studio (`../studios/web-studio/index.html`)';
  if (bookKey === 'js') toolName = 'Browser Console and JavaScript Scratchpad';
  else if (bookKey === 'cmd') toolName = 'Terminal / Command Prompt (CMD & PowerShell)';
  else if (bookKey === 'git') toolName = 'Git Bash / Terminal repository';
  else if (bookKey === 'php') toolName = 'PHP Console Studio (`../studios/php-console/index.html`)';
  else if (bookKey === 'mysql') toolName = 'SQL Sandbox (`../studios/sql-sandbox/index.html`)';

  const planMarkdown = `## Teacher Lesson Plan

### Classroom Planning & Logistics
| Field | Detail | Field | Detail |
| :--- | :--- | :--- | :--- |
| **Grade / Class** | ${grades} | **Period Duration** | 45 minutes |
| **Unit / Topic** | ${partName} | **Setting** | Computer Lab & Projector |
| **Teacher Name** | ____________________ | **Date / Session** | ____ / ____ / 2026 |

### Learning Objectives (SWBAT)
By the end of this 45-minute lesson, students will be able to:
${objectivesMarkdown}

### Required Materials & Setup
- Computer lab with web browsers installed (Chrome, Edge, or Firefox).
- Teacher projector displaying ${toolName} for live modeling.
- Student notebooks for recording key syntax rules, vocabulary, and reflections.

### 45-Minute Instructional Delivery Plan
| Time | Phase | Teacher Activity | Student Activity |
| :--- | :--- | :--- | :--- |
| **0–8 min** | **Hook & Analogy** | Share the chapter opening analogy: *"${hookText}"* Connect to today's topic. | Discuss in pairs; volunteer real-life parallels and note the learning target. |
| **8–20 min** | **Direct Instruction** | Model core concepts on the screen. Break down syntax line-by-line; explain architectural structure. | Follow along on screens/notebooks; observe syntax rules and active demonstration. |
| **20–26 min** | **Misconceptions & Diagnostics** | Address Common Mistake: *"${mistakeText}"* Conduct rapid check for understanding. | Identify faulty patterns in sample snippets; explain correct approach verbally. |
| **26–38 min** | **Guided Lab Practice** | Circulate lab while students execute the hands-on task: *"${labActivity}"* | Code independently or in pairs using ${toolName}; test variations. |
| **38–45 min** | **Plenary & Exit Ticket** | Review key takeaways. Pose exit question: *"${plenaryQ}"* Collect summary tickets. | Answer plenary questions; record homework task; submit exit ticket. |

### Differentiated Instruction
- **Support (Struggling Learners):** Provide starter boilerplate or pair with a peer navigator; focus on Level 1 recall and syntax verification.
- **Extension (Fast Finishers):** Assign Level 3 Challenge from the Practice section; encourage adding creative styling or feature extensions.

### Homework & Notebook Task
- Complete Level 2 Apply questions from the chapter Practice section into class notebooks.
- Write a 2-sentence personal explanation of the primary concept taught in this lesson.

### Ethical Stewardship & Digital Values (Amānah & Beneficial Knowledge)
- Emphasize digital trust (*Amānah*): respect school lab hardware, cite code honestly, and apply programming skills toward beneficial knowledge (*'Ilm Nāfi'*).

### Teacher Sign-off & Reflection
- **Teacher Signature:** ___________________________  **HOD / Coordinator Signature:** ___________________________
- **Lesson Reflection / Notes:** _______________________________________________________________________________

---
`;

  // Find where to insert: right before "## Real-Life Story"
  const storyIndex = content.search(/^##\s+Real-Life Story/m);
  if (storyIndex === -1) {
    console.warn(`[WARN] No "## Real-Life Story" found in ${filePath}`);
    return null;
  }

  const updatedContent = content.slice(0, storyIndex) + planMarkdown + '\n' + content.slice(storyIndex);
  return updatedContent;
}

let totalUpdated = 0;

for (const b of targetBooks) {
  const bookDir = path.join(ROOT, 'book-' + b);
  if (!fs.existsSync(bookDir)) {
    console.warn(`[SKIP] Book directory not found: book-${b}`);
    continue;
  }

  // Find all part-*\ch*.md files
  const partDirs = fs.readdirSync(bookDir)
    .filter(d => d.startsWith('part-') && fs.statSync(path.join(bookDir, d)).isDirectory());

  let bookCount = 0;
  for (const part of partDirs) {
    const partPath = path.join(bookDir, part);
    const files = fs.readdirSync(partPath).filter(f => /^ch\d+.*\.md$/.test(f));
    for (const file of files) {
      const fullPath = path.join(partPath, file);
      const updated = generateLessonPlan(b, fullPath);
      if (updated) {
        fs.writeFileSync(fullPath, updated, 'utf8');
        bookCount++;
        totalUpdated++;
      }
    }
  }
  console.log(`[book-${b}] Injected Lesson Plans into ${bookCount} chapters.`);
}

console.log(`\nDone! Successfully updated ${totalUpdated} chapters across ${targetBooks.length} books.`);
