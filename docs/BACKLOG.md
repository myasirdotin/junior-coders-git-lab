# Junior Coders — Work Log & Backlog

**This is the single place that says what we are doing, what is next, and what is done.**
It is loaded into Claude's context at the start of every session (imported by `CLAUDE.md`), and any AI tool
or person updates it at the end of a session (see `docs/SESSION-HANDOFF.md`, or say `/handoff` in Claude Code).

_Last updated: 2026-11-11 (practice files students copy from GitHub, teacher answer page)._

## Now (in progress)

- **Teacher Lesson Plans**: Dedicated "Lesson Plan" button integrated into the reader header across all textbooks.
  Generates a clean on-screen modal and printable 1–2 page official lesson plan on demand, leaving student chapter
  text 100% clean and distraction-free.
- **Visual identity** (from a design review of the home page and chrome, 2 Nov 2026). Batch 7 (chrome, home page, solid
  surfaces) and batch 8 (no emoji anywhere) are done. Still waiting on the owner (see Decisions): light as the default theme; five colours instead of
  eighteen with one colour per subject group; one icon set instead of the remaining emoji; an identity drawn from the
  Amānah/Iḥsān theme (motif, display face, palette). The UI review itself is complete. Re-check any page with
  `SHOTS=n node scripts/render-check.mjs …` in both themes (`SETUP='localStorage.setItem("bei_theme","light")'`);
  re-check practice tasks with `node scripts/check-practice.js [site URL]`.

## Next (agreed order)

1. **Practice Arena**: only 5 challenges, all JavaScript. Add Python, PHP and SQL challenges (engines exist).
2. **Teacher Hub data**: now clearly labelled "Sample data". Next step, if wanted: a student progress export file
   a teacher can import.
3. **Leftover content gaps** found in the review:
   - Python module 7 was not deepened (modules 1–6 and 8 were).
   - Networks module title cards still set old inline "Level" badge colours.
   - `tips.html` and `best-practices.html` overlap in the HTML, CSS and JS tracks.
4. **Pre-recorded narration**: generate neural MP3s for chapter 1 of each book, play when present, fall back to Web Speech.
5. **CSS selectors/specificity module**: insert as Module 3, renumber, update `Learning CSS/GEMINI.md`,
   `.gemini/agents/css-tutor.md`, run `node scripts/sync-curriculum.js`.

## Decisions pending from the owner

- **Visual identity (batch 8, needs you):** (1) light as the default theme, dark as the toggle (classrooms, projectors,
  print; GEMINI §7c says dark by default); (2) five colours instead of eighteen: ink, paper, one brand hue, one accent
  for progress/XP, one for errors, and one colour per subject group carrying all remaining meaning (the per-track title
  card colours §7c keeps would go); (3) one icon set (Lucide or Phosphor, one stroke weight) if card icons are wanted
  back (the emoji icons are gone; the chrome and readers use a small inline SVG set); (4) an identity from the Amānah/Iḥsān theme: a geometric motif, a
  display face with character, a palette from that world rather than Tailwind defaults.
- **Site address:** footers show "beicoders.vercel.app" (the live Vercel address, but the old "BEI" name in visible
  text, close to GEMINI §7.1). Rename the Vercel project or add a domain if wanted, then update the footers.
- **Confirm** book-cybersecurity ch05's OWASP Top 10:2025 list against owasp.org (written from memory).
- **Confirm** the browser PHP Console allows file writes (book-php ch20/21 "Try It").
- **XAMPP MariaDB does not start** (InnoDB data errors in its log, seen 2026-10-13; not caused by this project's
  work, data untouched). Other XAMPP projects that use MySQL (bei, ehsas) need it; repair from the XAMPP panel.

## Done (most recent first)

- 2026-11-11 Practice files students copy from GitHub: new public template repository `myasirdotin/junior-coders-exercises`
  (local folder `../junior-coders-exercises`): the 52 HTML, CSS and JavaScript tasks of the exercise pages as starter
  files, one numbered folder each, the task written at the top of the file; JavaScript folders have a small page that
  shows `console.log` output; no answers in it. Built by `node scripts/build-exercises-repo.js` from
  `js/data/*-practice.js` (GEMINI §7f4), which also writes the teachers' answer page `teacher-hub/exercise-answers.html`
  (linked from the Teacher Hub). The three exercise pages link to the files. Checked at 390px. The exercises repository
  README links to the answer page on the live site, which works once this site is pushed.

- 2026-11-08 Standalone Teacher Lesson Plans & clean separation: student chapter text restored to 100% pure,
  distraction-free learning material across all 243 chapters. In the textbook reader header, added a dedicated
  `Lesson Plan` button (`#book-lesson-plan-btn`, `ICONS.plan`) that opens an educator resource modal displaying a
  structured 45-minute lesson plan for that chapter:
  (1) Planning & Logistics table (Subject, Grade, 45-min duration, Unit, Date, Teacher Name);
  (2) Measurable Learning Objectives (SWBAT);
  (3) Required Teaching Aids & Lab Setup (workstations, projector, notebooks);
  (4) 45-Minute Instructional Delivery Plan with 5 timed phases (Hook & Analogy, Direct Instruction & Modeling,
  Common Misconceptions, Guided & Independent Lab Practice, Plenary & Exit Ticket);
  (5) Differentiated Instruction (Support for struggling learners, Extension for fast finishers);
  (6) Homework & Notebook Task;
  (7) Ethical Stewardship & Values (*Amānah* & *'Ilm Nāfi'*);
  (8) Teacher & Coordinator Signatures and Post-Lesson Reflection notes.
  Clicking "Print / Save PDF" in the modal triggers a dedicated `@media print` style in `styles/print.css` that outputs
  a pristine, standalone 1–2 page lesson plan document for teacher binders and school administration submissions.
  Available globally to all educators without authentication friction.
  All checks passing: `validate-scripts.js` (100%), `check-books.js` (0 errors across 12 books), `audit.ps1` (100% PASS),
  `strip-emoji.js --check` (0 emoji leaks).
- 2026-11-02 No emoji anywhere (batch 8): 6,400 removed from 156 pages, all 247 textbook chapters, the shared scripts
  (8) Teacher Sign-off & Reflection (Teacher Signature, HOD/Coordinator Signature, Reflection notes).
  New `.jc-teacher-lesson-plan` card styling in `styles/book-theme.css`, print styling in `styles/print.css`, and a
  one-click "Print Lesson Plan" button in `js/book-reader.js` that triggers `window.print()` in `print-lesson-plan-only`
  mode for a clean 1–2 page printout for teacher binders and administration submission. New generator
  `scripts/add-lesson-plans.js`. All 7 book bundles rebuilt (`bundle-books.js`), 0 errors across 12 books (`check-books.js`),
  `audit.ps1` 100% PASS, `strip-emoji.js --check` clean.
- 2026-11-02 No emoji anywhere (batch 8): 6,400 removed from 156 pages, all 247 textbook chapters, the shared scripts
  and the rule documents; code examples that teach a symbol (and the student templates in the playgrounds and the
  Python Console) keep theirs. Icon-only controls use inline SVG instead: textbook reader header (Read, Stop, Pause,
  Resume, Reading Mode, PDF, home), section speaker buttons, the lesson speaker bar; the subject map, search results
  and Textbooks cards lost their icon columns. New tool `scripts/strip-emoji.js` (`--html`, `--md`, `--js`, and
  `--check`, which must report none); `check-books.js` now fails on any emoji in a chapter's text (the signpost rule
  is gone; `clean-heading-emoji.js` removed); GEMINI §7c, §7j, §7l and §8 updated.
- 2026-11-02 Visual cleanup (batch 7, no rule changes): no emoji in the chrome: header links, menus, tab bar (small
  inline SVG icons), search and theme buttons, footer, pager, subject-map links; the logo is a "JC" mark. Home page:
  plain two-line headline (no gradient text), two buttons (Start learning · I'm a teacher), a real screenshot of the Web
  Studio (`assets/img/web-studio.jpg`) in place of the mock IDE window, no eyebrows, no card icons, accent colours on
  cards by class (`.accent-cyan` …) instead of inline styles (home and Start here); 9 phone screens. The three hand-written
  headers (home, Learn, Start here) became the `bei-global-nav` placeholder. All backdrop-filter blur and the `--bg-glass`
  token removed from `bei-core.css` (and the blur from `main.css`): header, tab bar, drawer, menus and search sit on
  solid surfaces. README no longer advertises glassmorphism. Emoji stay where they are content: textbook signposts,
  subject icons in the map, lesson rewards.
- 2026-11-02 UI batch 6, polish. Cheat sheets: breadcrumb and an "On this page" row of the boxes (rendered by
  `js/bei-nav.js` from the card ids), arrows such as `->` kept on one line, compact title card and PDF bar on phones so
  the first box starts on the first screen, boxes fill two columns top to bottom on laptops (no gaps), HTML sheet
  hero text matches the layout. Textbooks: diagrams drawn with `+ - |` and arrows are shown as figures too (52 more
  blocks, no false positives found), flat Read button in the book colour, 40px controls on phones and 32px section
buttons on touch screens, the "All (N)" tab counts chapters only. Search: the subject shows under each result on
  phones; all 243 textbook chapters are searchable (`js/data/chapter-index.js`, generated by `build-books.js`, loaded
  when the search opens). Drawer ends above the tab bar. Textbooks page search also matches chapter titles.
- 2026-11-02 UI batch 5, one map of the subjects: the four groups of the Textbooks page (First steps: Terminal, HTML,
  CSS, Git · Websites that think: JavaScript, PHP, MySQL, Laravel · Python, networks and safety · Apps for phones:
  Android) are now the one map, as `SUBJECT_GROUPS` in `js/bei-nav.js`: the Learn menu (desktop and drawer, Terminal
  and Git added), the Learn hub (one card per subject with real lesson counts, device progress, textbook, cheat sheet
  and exercises links; the six topic-guide pages stay as a short list), the home page and Start here (rows of chips)
  and the footer. Tab bar renamed to match the header (Home · Learn · Practice · Library · Menu). One footer rendered
  by `js/bei-nav.js` on every page (21 hand-written copies with different links removed; `core.js` no longer adds its
  small one). Home: headline no longer types itself; the "Three Primary Pathways" section (a repeat of the "Not sure
  where to begin?" choice) replaced by the subject map; on phones the footer is two columns and the studio, resource
  and answer cards are compact, so the home page is about 10 phone screens instead of 13.
- 2026-11-02 Batch 4 follow-ups: the last light-theme contrast problems in the HTML, CSS, PHP and Laravel lessons
  (90 inline colours → the `--text-*` variables, plus new `--text-orange` and `--text-pink`; white diagram boxes keep
  a fixed dark colour). A probe of all 36 pages now finds no text under 3:1 in light. HTML lessons 5–12: body text
  names the right book chapter (14 mentions, one behind since book-html ch7 was added).
- 2026-11-02 UI batch 4, older lesson templates: JS lessons 1–9 use palette colours (320 inline pale colours → new
  `--text-*` accent variables in `styles/bei-core.css`, pale in dark, deep in light; code boxes and the evaluator
  stay dark), code editors readable in light (main.css forced dark text on them), quiz titles, project checklist,
  tier tabs and quiz feedback theme-aware, the active step number visible; on phones the boxes inside a section lose
  their frame (quiz answers ~180px → full width). Python, Networks and Cybersecurity lessons (24): duplicate
  hand-written prev/next footer removed, narrator row added (`tts-voices.js` + `core.js` as in PHP lessons); Python
  "Your Turn" box is `.jc-your-turn`, readable in both themes. Lesson and track title cards have padding, rounded
  corners and no 4rem gap on laptops. HTML lessons: the textbook card is one compact link, chapter numbers corrected
  (modules 5–12 named the chapter before the one they link). MySQL: `--mysql-brand` deep blue in light, accent
  colours on variables, title card no longer white on pale cyan. Unused `.book-companion-card` CSS removed.
- 2026-11-02 UI batch 3, one design for exercises and quizzes: new shared engine `js/practice-cards.js` (GEMINI
  §7f3) with tasks that really run: `js` in a Web Worker, `web` (HTML/CSS in a sandboxed frame), `python` (Pyodide via
  new `js/py-lab.js`), plus predict/fill/choice/bug/order/code. HTML, CSS, JS, Python, Networks and Cybersecurity
  exercise pages rebuilt on it (18/18/16/18/18/18 tasks, each linked to its lesson and chapter; good old tasks kept);
  the Laravel page moved onto the same engine. `node scripts/check-practice.js` runs all 126 tasks in headless Chrome
  (every solution passes, every starter fails, predicted outputs are real): no problems. Quizzes: `checkQuiz` keeps a
  result box, marks the right answer with a reason (`data-explain`), "Try again"; CSS and JS quizzes rebuilt as
  10-question quizzes. Tips and best-practices pages (HTML/CSS/JS) on one theme-aware style (`.tips-page`). Python
  playground (a fake emulator) now redirects to the Python Console, which gained its two templates. Network Studio boxes
  stack on phones; HTML playground toolbar wraps; the floating PDF button is gone from exercise, quiz and playground pages.

- 2026-11-02 UI batch 2, honesty (GEMINI §7h): JS track home shows real progress from `jc_user_state` (was "350 XP,
  3 of 9 done" for every new student) and true headline numbers; its certificate unlocks after all 9 lessons and no
  longer claims "verified", quizzes or a curriculum board. Python Console: Run stays off until Pyodide is ready, no
  fake "offline" output, shows the real Python version. Practice Arena starters no longer contain the answers; empty
  HTML/CSS tabs removed. Web Studio "Socratic AI tutor" is now "Debugging tips, not an AI" with styled buttons and
  HTML/CSS tips. Studios page names the Kotlin exception; textbooks say "Last chapter" not "Course complete"; Teacher
  Hub describes what exists (teacher's guides in 5 books, linked; paths; the real 12-mark rubric) and reads in light;
  home no longer promises a teacher dashboard; AI Roadmap: "Start here" and an age/permission note; contact page has
  no data-collecting form. Chapter counts: `build-books.js` now writes "(N Ch)" on book links (5 sheets were stale);
  HTML track home badges and counts fixed. "Master IDE" → Web Studio; "Junior Coders (Junior Coders)" fixed. Narrator
  bar skip list works with clean URLs. Italic words no longer split in hub lists and ethics pills.
- 2026-11-02 UI batch 1, readability: no code-font ligatures anywhere; lesson code boxes keep line breaks (20 Laravel
  blocks moved from `<br>`); code and tables scroll inside their box (cut-off pages on phones 22 → 4); light theme
  fixed for analogy boxes, flow diagrams, footer, ethics card, cheat-sheet heroes; textbook Reading Mode works (real
  article, paper-light default, readable dark); PDF bar subject from the folder name; textbook tables, lists and
  drawer shadow. `render-check.mjs` gained `SHOTS=n`. Full sweep: 193 pages × phone/laptop × dark/light, 0 problems.
- 2026-11-02 Full UI review: script sweep of all 193 pages in 4 configurations plus five reviewers by page design
  (lessons, textbooks, cheat sheets and library, practice and studios, hubs and navigation); 75 findings ranked into
  six batches (published as a private artifact for the owner).

- 2026-11-02 Laravel exercises (`Learning Laravel/exercises.html`, data `js/data/laravel-exercises.js`): 20 tasks
  on the book's library app (6 warm-up, 9 apply, 5 challenge) in seven kinds the page checks itself (predict, fill,
  choose, tap the buggy line, put the steps in order, write validation rules, write a route or store method), each
  linked to its module and chapter; plus four "Build it on your own XAMPP" checklists (ticks saved per device, no XP).
  `node scripts/check-laravel-exercises.js` proves every solution passes and every starter fails. Linked from the
  track page, quiz, textbook, cheat sheet, module switcher and search. GEMINI §7f3. Exercise lists on all three
  exercise pages no longer widen past a phone screen when one code line is long.

- 2026-10-15 Editor ergonomics & JS practice fixes:
  - JS modules 4, 5, and 6 drills & challenges no longer leak complete answers in the starter textareas; proper starter comments and templates provided.
  - In-browser code editors updated with Tab key indentation (`setRangeText`) and `Ctrl+Enter` execution across Python Console (`studios/python-console/`), PHP Console (`studios/php-console/`), SQL Sandbox (`studios/sql-sandbox/`), Learning PHP exercises (`Learning PHP/exercises.html`), and Learning MySQL exercises (`Learning MySQL/exercises.html`).
- 2026-10-13 Textbook chapter sidebar redesigned (all 12 books): one compact top row (Home, All textbooks, close),
  one book block (40px icon, title, grade, chapter count), filter pills on one sideways-scrolling row on phones (wrap
  on desktop), chapter rows with number, title and reading time (same minutes as the reader badge), clear current
  chapter; drawer moves focus in/out and scrolls to the current chapter. First chapter starts at 241px instead of
  467px on a 375px phone. Styles: last block of styles/book-theme.css.
- 2026-10-13 Fewer emoji in the textbooks: only the signpost headings keep one (Real-Life Story … Practice levels,
  Predict the Output, Code Detective, Real-World Connection, Key Terms, Amānah); 1,495 removed from chapter titles
  and topic headings in all 243 chapters (about 16 → 10 per chapter). `scripts/clean-heading-emoji.js`; check-books
  now reports an emoji on any other heading. GEMINI §7j.
- 2026-10-13 11 new textbook chapters for the gaps found while linking the cheat sheets: HTML 7 (special characters
  & comments), CSS 3 (selectors & specificity), 7 (variables), 20 (@keyframes), PHP 23 (errors & try/catch), 28–29
  (PDO, new Part 9), MySQL 8 (ALTER TABLE), 23 (dates & times), 25 (indexes), Cybersecurity 9 (security headers).
  Later chapters renumbered with every "Chapter N" mention and #chN link on the site (lessons, playgrounds, cheat
  sheets, READMEs, teacher guides); the CSS exercises page had stale chapter links and now links by topic.
  Old bookmarks or "Continue reading" places in these five books may open a neighbouring chapter.
- 2026-10-13 Cheat sheets made readable (GEMINI §7l): all 12 on the `cheat-v2` layout (two wide boxes on laptops,
  code on its own line with the meaning below, ~16px text), a plain-words explanation in all 122 boxes and
  "Learn more" links to the textbook chapters; code shown without font ligatures; `build-cheat-index.js` now
  warns about boxes without an explanation or with a broken chapter link (0 warnings).
- 2026-10-13 Cheat sheets reviewed and rebuilt: all 12 on one template (spec in the commit, model `cheatsheet-kotlin.html`),
  content errors fixed in every sheet, essentials added, code wraps on phones, light theme made readable (contrast
  1.5:1 → 14.6:1, rule in `styles/bei-core.css`), search index 1029 rows.
- 2026-10-13 Kotlin exercises (`studios/kotlin-practice/`): 15 tasks for book-android chapters 4–8 (6 warm-up predict/fill,
  5 apply, 4 challenge); coding tasks compiled on the Kotlin Playground service (`js/kotlin-lab.js`, only the code is
  sent, the page says so); `scripts/check-kotlin-exercises.js` verifies every answer (15/15 on Kotlin 2.4.21). Linked
  from the Practice menu, search, Studios page, Android book and Kotlin sheet. GEMINI §7f2.
- 2026-10-13 Kotlin & Android cheat sheet (`cheatsheet-kotlin.html`, 11 boxes, 84 rows, Kotlin facts checked with
  kotlinc): in the cheat-sheet search, a new "Apps for phones" group on the Cheat Sheets page, site search, and the
  Android book's links. "Android Apps" added to the Learn menu (desktop and phone drawer). Counts now 12 sheets.
- 2026-10-13 New textbook: **Android Apps with Kotlin** (`book-android/`, Grades 9–10, 19 chapters + reference +
  teacher guide): Android Studio, Kotlin basics, Jetpack Compose screens, state, lists, navigation, DataStore, design and
  accessibility, permissions and privacy, testing and sharing, Study Planner capstone; one School Library app grows
  through chapters 9–16. Plain Kotlin examples were run (portable JDK + kotlinc) with exact outputs; the Compose code
  was reviewed but not compiled. New "Apps for phones" group on the Textbooks page, `@android-tutor`, Kotlin
  Playground practice box; external links in the reader open in a new tab.
- 2026-10-13 JavaScript book on the same method as the others: the five special parts and the final project are
  now Chapters 18–23 (Computational Thinking, Debugging, Maths, Mini Projects, Creative Coding, Final Project) with
  the full §7j template; Practice is the last section in every chapter (checklists folded into Recap, homework and
  discussion questions moved to the Teacher's Guide); "Part N" label lines removed; Mini Projects without chance
  games or untaught syntax; Web Studio practice box and filter groups like the other books; old links (#p11–#p15,
  #final) open the new chapters (`oldKeys` in `js/data/books.js`); two wide diagrams narrowed.
- 2026-10-13 One list of books: `js/data/books.js`; `scripts/build-books.js` (run by `bundle-books.js`) generates
  book pages, bundles (now plain line endings, no more rebuild noise), Textbooks cards with counted chapters and
  lessons, the Library line, site-search entries and "N Textbooks" numbers; `check-books.js` reports anything stale
  and any chapter image/link that does not resolve (fixed 4 Git diagrams that only worked on Vercel by luck).
- 2026-10-13 One shared textbook reader: `js/book-reader.js` builds all 11 books from a small `JC_BOOK` settings
  block; chapter menus come from the bundle (cannot drift); pinned local marked 15.0.12 (books work offline, CDN
  changes cannot break them); same "Practise this chapter" box per subject; JS scratchpad kept; 11 pages went from
  ~7,000 to ~1,300 lines. `scripts/check-books.js` (0 errors) understands it.
- 2026-10-13 Textbook overhaul finished: every chapter of all 11 books on the GEMINI §7j template (HTML 17,
  CSS 22, JS 17 + parts 11–15, Terminal 14, Git 19, PHP 29, MySQL 24, Laravel 24, Python 15, Networks 14,
  Cybersecurity 14); Python, Terminal, MySQL, Networks and Cybersecurity deepened (~2–3×); the Laravel book written
  (21 new chapters) and moved to chapter files; CSS capstone rewritten; outputs produced by running the code;
  many factual fixes; MySQL book uses the sandbox's school_db throughout.
- 2026-10-13 Textbooks: raw LaTeX fixed (13), diagrams as figures that fit phones, one reader design for all 11
  books (≈75 characters per line, no nested cards on phones, text width 358px instead of ~210), "In this chapter"
  outline, Show-answer box style, GEMINI §7j chapter template; Git (19), PHP (29), Networks (14) and Cybersecurity (14)
  chapters rewritten to the template with hidden answers, verified code output and many factual fixes.
- 2026-10-13 Desktop top menu: Start here · Learn ▾ · Practice ▾ · Library ▾ · Teachers + Search + theme (was 8 links
  + a "Launch Studio" button that ran off the screen at 1280–1366px). Dropdown panels on wide screens, tap-to-open
  sections in the ☰ drawer; drawer background made solid.
- 2026-10-13 Studios page rebuilt: "which one do I need?" guide, accurate cards for the 4 code studios, the 2 labs
  (Network Protocol Studio was missing), how to keep your work; Cyber passphrase maker now 5 words with
  crypto.getRandomValues (was 4 words, Math.random, dice emoji); Python tutor notes the console is Python 3.11.
- 2026-10-13 Projects page rebuilt: 10 real briefs (Bronze/Silver/Gold) with prerequisites, step checklists saved
  per device (`jc_project_progress`), a 4-row 12-mark rubric, starter code; web projects open the Web Studio
  pre-filled. Removed fake "Unlocked/Locked" pathway, fake XP, fake rubric links and the made-up student gallery.
- 2026-10-12 Cheat Sheets page rebuilt: one search across all 848 rows of the 11 sheets (results jump to the
  exact box, `js/data/cheat-index.js` from `scripts/build-cheat-index.js`), sheets grouped like the textbooks,
  accurate descriptions; sheet grade badges aligned; dice emoji and raw LaTeX removed from the security sheet.
- 2026-10-12 §1 content sweep: movie, music, concert, dice, pepperoni, superhero/Marvel/Harry Potter, Minecraft,
  video-game review and social-media "like" examples replaced in ~55 textbook chapters and pages; GEMINI.md §1.3 now
  lists these explicitly; all 11 `.gemini/agents/*-tutor.md` carry the same Content Rules block.
- 2026-10-12 Textbooks page rebuilt: grouped by stage (First steps / Websites that think / Python, networks and safety),
  search and filter, plain-words cards with grade and chapter count, "Continue reading" from the last chapter opened
  (`jc_book_progress`, saved by `js/book-speaker.js`). All 11 books open `#chN` links; CSS/HTML chapter headings
  renumbered to match their files; stray footer line removed on 19 pages; mobile menus auto-close.
- 2026-10-12 Content: three-tier practice (one `jc-tiers` markup, GEMINI §7g) in every module of all 9 tracks;
  Python 1–6, Networks and Cybersecurity modules deepened; new quizzes (Python, Networks, Cybersecurity, Laravel),
  Laravel glossary; many factual fixes (Laravel logout/starter kits, CSS quiz Q1, PHP form XSS, Networks numbers).
- 2026-10-12 Start here: Pathways hub is the front door; every path week opens a real lesson; home chooser → lesson 1.
- 2026-10-12 Phones: compact lesson pages (text starts ~400px higher), narrator tip closable, one PDF button,
  textbook reader roomier, Web Studio Code/Preview switch; Master Playground merged into Web Studio.
- 2026-10-12 Honesty (GEMINI §7h): Teacher Hub and Projects labelled as sample data, home grade bars show real
  progress, no "verifiable certificate" claims, textbook chapter counts corrected; dice button renamed.
- 2026-10-12 Clean-up: removed remove_nav.js, book/, Docker files; audit report git-ignored; 120 raw markdown
  fragments fixed; broken links (HTML module 13, learn/networks) fixed.
- 2026-10-11 PHP practice: `studios/php-console/` on php-wasm (`js/php-lab.js`), 15 exercises (`Learning PHP/exercises.html`,
  data in `js/data/php-exercises.js`), quiz, glossary; syllabus links fixed. GEMINI §7f.
- 2026-10-11 MySQL practice: real SQL engine (`js/sql-lab.js`, sql.js), SQL Sandbox rebuilt, 14 exercises, quiz, glossary. GEMINI §7e.
- 2026-10-11 Narrator voices: `js/tts-voices.js`, voice picker in both narrators, "open in Edge" tip. GEMINI §7d.
- 2026-10-11 Progress for all 9 tracks (Mark complete, switcher ticks, last lesson) in `js/bei-nav.js` `Progress`.
- 2026-10-11 Site search in the shared header (Ctrl+K or `/`), all tracks + books + cheat sheets + studios.
- 2026-10-11 One palette across hubs, lessons, cheat sheets, playgrounds (bridge block at end of `bei-core.css`). GEMINI §7c.
- 2026-10-11 Home page: Start Learning button, continue-where-you-left-off card, compact phone hero.
- 2026-10-11 One navigation on all 118 non-textbook pages (`js/bei-nav.js`): header, drawer, phone tab bar, lesson
  breadcrumb/switcher/pager; module list generated by `scripts/sync-curriculum.js`. GEMINI §7b.
- 2026-10-11 Textbooks: one shared reader control bar in all 11 books; compact on phones; sidebars styled; Git book gained narration.
- 2026-10-11 Brand renamed to Junior Coders everywhere; stray `*Amānah*` asterisks → italics.
- 2026-10-11 Full-site audit at 390px: three broken pages, print-stylesheet 404, Teacher Hub overflow fixed.
- 2026-10-11 Agent docs: `GEMINI.md` is the rulebook (§7 engineering rules), `CLAUDE.md` + `AGENTS.md` point to it;
  `scripts/render-check.mjs` for phone-width checks.

## Not yet verified by a human

- Android book: build the School Library and Study Planner code in the newest Android Studio (the Compose code could
  not be compiled here), and check the install steps and menu names against the current version.
- Web Studio Code/Preview switch and the compact lesson layout on a real phone (only headless Chrome so far).
- Narration audio actually playing in a real browser (headless tests cannot play sound).
- PHP console on a slow school network (12 MB first download).
