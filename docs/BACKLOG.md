# Junior Coders — Work Log & Backlog

**This is the single place that says what we are doing, what is next, and what is done.**
It is loaded into Claude's context at the start of every session (imported by `CLAUDE.md`), and any AI tool
or person updates it at the end of a session (see `docs/SESSION-HANDOFF.md`, or say `/handoff` in Claude Code).

_Last updated: 2026-10-13 (JavaScript book aligned with the other books)._

## 🔧 Now (in progress)

- Nothing in progress. Last completed: the textbook overhaul (all five steps, all 11 books).

## ⏭️ Next (agreed order)

1. **Laravel practice, remaining part**: quiz, glossary and tiers now exist. Still to do: `exercises.html` with
   arrange-the-steps, fill-in Blade/Eloquent snippets, fix-the-bug, plus a "build it on your own XAMPP" checklist.
2. **Practice Arena**: only 5 challenges, all JS/HTML/CSS. Add Python, PHP and SQL challenges (engines exist).
3. **Teacher Hub data**: now clearly labelled "Sample data". Next step, if wanted: a student progress export file
   a teacher can import.
4. **Leftover content gaps** found in the review:
   - JS modules 4–6: the practice textareas already contain the full solutions.
   - Python module 7 was not deepened (modules 1–6 and 8 were).
   - Networks module title cards still set old inline "Level" badge colours.
   - `tips.html` and `best-practices.html` overlap in the HTML, CSS and JS tracks.
5. **Pre-recorded narration**: generate neural MP3s for chapter 1 of each book, play when present, fall back to Web Speech.
6. **CSS selectors/specificity module**: insert as Module 3, renumber, update `Learning CSS/GEMINI.md`,
   `.gemini/agents/css-tutor.md`, run `node scripts/sync-curriculum.js`.

## ❓ Decisions pending from the owner

- **Confirm** book-cybersecurity ch05's OWASP Top 10:2025 list against owasp.org (written from memory).
- **Confirm** the browser PHP Console allows file writes (book-php ch20/21 "Try It").
- **XAMPP MariaDB does not start** (InnoDB data errors in its log, seen 2026-10-13; not caused by this project's
  work, data untouched). Other XAMPP projects that use MySQL (bei, ehsas) need it; repair from the XAMPP panel.

## ✅ Done (most recent first)

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

## 🧪 Not yet verified by a human

- Web Studio Code/Preview switch and the compact lesson layout on a real phone (only headless Chrome so far).
- Narration audio actually playing in a real browser (headless tests cannot play sound).
- PHP console on a slow school network (12 MB first download).
