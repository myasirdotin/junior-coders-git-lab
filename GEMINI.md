# Junior Coders - Project Instructions & Core Guidelines

This project is an interactive educational platform for mastering full-stack web development: HTML, CSS, JavaScript, PHP, MySQL, and Laravel. It has been formalized as the **Junior Coders** package for GitHub release.

## Project Identity
- **Version**: 1.0.0
- **Lead Developer**: Yasir Rasool
- **License**: MIT
- **Target Audience**: Students, aspiring developers, and junior coders seeking clear, rigorous, and ethically grounded full-stack engineering skills.

---

## 1. Core Ethical Framework: Islamic Principles in Education & Technology

All lessons, examples, exercises, mini-projects, capstones, explanations, visual assets, and educational content across every module must strictly embody the values and ethical teachings of Islam. This is a permanent, non-negotiable core rule that Gemini and all contributors must follow whenever creating, modifying, reviewing, or compiling lessons.

### 1.1 Beneficial Knowledge (*'Ilm Nāfi'*)
- Technology and programming must be framed as instruments for positive, constructive, and ethical contribution to society.
- Focus projects and lessons on solving genuine human problems, supporting families and communities, protecting public well-being, and advancing education, health, environmental stewardship, and economic fairness.
- Avoid vanity metrics, time-wasting trivialities, addictive design patterns, or harmful digital practices.

### 1.2 Modesty, Decency & Wholesome Content (*Ḥayā' & Adab*)
- **Respectful Tone**: All written tutorials, comments, and instructions must maintain a respectful, dignified, and encouraging tone. Prohibit vulgarity, sarcasm, disrespectful humor, or disparagement of elders, teachers, or peers.
- **Media & Visual Assets**: All placeholder imagery, diagrams, illustrations, and user avatars must be modest, family-friendly, and culturally respectful. Avoid any immodest, provocative, or inappropriate imagery or themes.
- **Wholesome Storylines**: Exercise prompts, fictional company names, and project user personas must reflect positive, ethical values (e.g., charity initiatives, educational academies, science laboratories, ethical commerce, neighborhood libraries).

### 1.3 Halal Financial & Real-World Contexts (*Halal vs. Haram*)
When teaching database schemas, forms, arithmetic logic, e-commerce, APIs, or business apps:
- **Strictly Prohibited Domains**:
  - **No Interest / Usury (*Ribā*)**: Do not build compound interest loan simulators, conventional banking calculators, credit card debt engines, or mortgage interest tools.
  - **No Gambling or Games of Chance (*Maysir*)**: Do not create casino games, lottery pickers, betting platforms, dice gambling, or loot box mechanics.
  - **No Prohibited Goods (*Ḥarām*)**: Do not use examples involving alcohol, intoxicants, pork/illicit foods, night clubs, or unethical entertainment venues.
  - **No Deceptive Patterns (*Gharar* & Fraud)**: No fake countdown timers, hidden checkout fees, deceptive popups, or privacy-invading spyware techniques.
  - **No Entertainment Media Streaming or Cinema Themes**: Do not reference commercial movie/series streaming platforms (such as Netflix, Hulu, or film streaming portals), movie theaters, cinema box offices, movie ticket pricing, celebrity gossip, or pop music streaming. Entertainment media containing unwholesome themes, immodesty, or music/film consumption contrary to Islamic modesty (*Ḥayā'*) must never be normalized or used as teaching examples.
- **Encouraged Real-World Scenarios**:
  - Educational knowledge platforms (online academies, digital research libraries, university portals, Quran/tafsir lecture archives, educational science documentaries).
  - Ethical e-commerce (halal bakeries, bookshops, artisan crafts, organic farms, educational software).
  - Charitable giving, *Zakat* calculators, and humanitarian donation trackers.
  - Community service portals, student study organizers, prayer time / calendar apps, hospital appointment schedulers, and clean energy monitors.
  - Wholesome admission & ticketing: Science exhibition passes, planetarium tickets, botanical garden admissions, community educational conference registrations, or public transit passes (instead of movie/cinema tickets).
  - Transparent pricing, fair trade inventory management, and partnership-based profit/loss sharing models.

### 1.4 Truthfulness, Trust & Digital Stewardship (*Ṣidq & Amānah*)
- **Data Privacy as a Sacred Trust (*Amānah*)**: Teach students that user data, passwords, and personal details are entrusted secrets. Emphasize hashing passwords (`password_hash`), avoiding data leaks, and never collecting unnecessary personal information.
- **Academic & Intellectual Integrity**: Teach proper attribution, open-source licensing respect, honest coding practices, and avoidance of plagiarism or false claims.
- **Truthful User Interfaces**: Forms and interfaces must present accurate information without deceit, misleading claims, or dark UX patterns.

### 1.5 Quality, Excellence & Diligence (*Iḥsān*)
- Code examples must exemplify *Iḥsān*—doing work with thoroughness, care, and beauty.
- Clean code architecture, clear variable naming, well-structured indentation, proper error handling, semantic markup, and accessible designs are moral responsibilities of a craftsman.

### AI Compliance Checklist Before Writing or Modifying Any Lesson:
- [ ] Is the theme, narrative, or scenario clean, modest, and ethically sound?
- [ ] Is it free of *Ribā* (interest), *Maysir* (gambling), *Ḥarām* substances, and deceptive mechanics?
- [ ] Is it free of commercial movie/series streaming (e.g., Netflix), cinema ticket sales, or unwholesome media entertainment?
- [ ] Does the project cultivate beneficial skills that serve people and communities (*'Ilm Nāfi'*)?
- [ ] Are digital trust (*Amānah*), privacy, security, and data protection upheld?
- [ ] Is the language respectful, constructive, and pedagogical?

---

## 2. Specialized Agents
Subject tutors live in `.gemini/agents/` (one file each). They are read-only advisors: use them to review or explain
content for their subject, then make edits yourself following this file.
- `@html-tutor`: HTML fundamentals, semantics, structure, and accessibility (`Learning HTML/`, `book-html/`).
- `@css-tutor`: CSS architecture, modern layout (Flexbox & Grid), typography, and responsive design (`Learning CSS/`, `book-css/`).
- `@js-tutor`: JavaScript logic, ES6+, data structures, and DOM manipulation (`Learning JS/`, `book-js/`).
- `@cmd-tutor`: Terminal & command line: CMD, PowerShell, Git Bash, navigation, developer CLI workflows (`book-cmd/`).
- `@git-tutor`: Git & GitHub: commits, branches, merges, conflicts, pull requests, remotes (`book-git/`).
- `@php-tutor`: Server-side PHP, form processing, file I/O, security (XSS/CSRF/sessions), and OOP (`Learning PHP/`, `book-php/`).
- `@mysql-tutor`: Relational schema design, normalization, SQL queries, indexing, and data integrity (`Learning MySQL/`, `book-mysql/`).
- `@laravel-tutor`: MVC, routing, controllers, Blade, migrations, Eloquent ORM, validation, auth (`Learning Laravel/`, `book-laravel/`).
- `@python-tutor`: Python syntax, data structures, scripting, clean OOP, data handling, **and** machine-learning fundamentals and ethical AI stewardship (*Amānah*) (`Learning Python/`, `book-python/`).
- `@network-tutor`: OSI & TCP/IP models, IP subnetting & CIDR, DNS, HTTP/3, TLS, and web diagnostics (`Learning Networks/`, `book-networks/`).
- `@security-tutor`: Defensive cybersecurity, threat modeling, hashing & key derivation, OWASP Top 10 mitigation, security headers, and digital stewardship (*Amānah*) (`Learning Cybersecurity/`, `book-cybersecurity/`).

---

## 3. Educational Priorities & Pedagogical Architecture

1. **Textbooks as Single Source of Truth**: The interactive textbooks (`book-html/`, `book-css/`, `book-js/`, `book-cmd/`, `book-git/`, `book-php/`, `book-mysql/`, `book-laravel/`, `book-python/`, `book-networks/`, `book-cybersecurity/`) define the curriculum, mental models, code examples, and mastery questions. Interactive learning pages (`Learning HTML/`, `Learning CSS/`, `Learning Python/`, `Learning Networks/`, `Learning Cybersecurity/`, etc.) directly mirror textbook chapters.
2. **Scaffolded Learning Flow (No Leaps, No Premature Concepts)**:
   - Concepts must be taught in strict prerequisite order. Never use a concept, syntax, or method before it has been formally introduced.
   - Always bridge the gap from *mental analogy* $\rightarrow$ *syntax breakdown* $\rightarrow$ *isolated example* $\rightarrow$ *interactive practice* $\rightarrow$ *real-world application*.
3. **Mastery-Based Multi-Tier Practice**:
   - Every module must feature 3 tiers of exercises:
     - 🟢 **Level 1 (Recall / Warmup)**: Simple syntax reproduction and fill-in-the-blanks.
     - 🟡 **Level 2 (Application / Modification)**: Extending code and combining two concepts.
     - 🔴 **Level 3 (Creative Challenge / Problem-Solving)**: Building a complete miniature feature independently.
4. **Offline-First Interactive Readers**: Every textbook contains pre-compiled `chapters-bundle.js` for instant local offline reading, Web Speech narration (`book-speaker.js`), reading mode, and code lab launch buttons.
5. **Security & Ethical Stewardship by Design**: Server-side, AI, networking, and security modules enforce input sanitization, data privacy (*Amānah*), transparent decision-making, and cryptographic security from the very first lesson.

---

## 4. Learning Modules & Curriculum Roadmap

- **Learning HTML**: 12 core modules + capstone projects aligned with `book-html/`.
- **Learning CSS**: 8 modules covering styling to Grid/Responsive design aligned with `book-css/`.
- **Learning JS**: 9 core modules covering variables to DOM/Events aligned with `book-js/`.
- **Terminal & Command Prompt**: 14 chapters covering dual-shell navigation, file operations, and developer workflows aligned with `book-cmd/`.
- **Git & Version Control**: 20 chapters covering version tracking, branching, and team collaboration aligned with `book-git/`.
- **Learning PHP**: 8 advanced modules (Intro, Variables, Control Flow, Functions, Arrays, Forms, Files, OOP) aligned with `book-php/`.
- **Learning MySQL**: 6 modules covering database fundamentals, schemas, queries, joins, and relationships aligned with `book-mysql/`.
- **Learning Laravel**: 8 modules covering MVC, routing, controllers, Blade, migrations, Eloquent, validation, and authentication aligned with `book-laravel/`.
- **Learning Python & Machine Learning**: 8 core modules + 15 textbook chapters covering Python foundations, data processing, machine learning concepts, ethical AI stewardship (*Amānah*), and capstone classifiers aligned with `book-python/`.
- **Computer Networking & Web Protocols**: 8 interactive modules + 14 textbook chapters covering OSI/TCP-IP models, IP subnetting, TCP/UDP, DNS, HTTP/3, TLS 1.3 encryption, and diagnostic tools aligned with `book-networks/`.
- **Cybersecurity & Digital Hygiene**: 8 interactive modules + 14 textbook chapters covering CIA Triad, cryptographic primitives, authentication & password derivation, OWASP Top 10 web defenses, security headers, anti-phishing hygiene, and 3-2-1 backup resilience aligned with `book-cybersecurity/`.

---

## 5. Hosting, URL Resolution & Offline Reader Architecture

1. **Vercel Routing & Trailing Slashes**:
   - Do NOT set `"trailingSlash": false` in `vercel.json`. Forcing `trailingSlash: false` strips slashes from directory paths (`/book-xyz/` -> `/book-xyz`), breaking browser relative asset resolution (`<script src="chapters-bundle.js">` and chapter fetches resolve to domain root `/` resulting in `404 Not Found`).
   - Clean URLs (`"cleanUrls": true`) should remain enabled for extensionless `.html` pages.
2. **Textbook Base URI Resilience**:
   - Every textbook reader (`book-*/index.html`) must include the dynamic `<base>` tag injector in `<head>` so that relative assets resolve to the book folder under any server configuration or iframe embedding.
3. **Dual-Tier Chapter Loading Fallback**:
   - Textbooks must load from pre-bundled offline cache (`chapters-bundle.js` / `window.BOOK_<NAME>_CHAPTERS`) first.
   - If offline cache is unavailable, readers execute directory-resilient network fetch (`fetch(path)`, with fallback to `folder + '/' + path`).
4. **Maintenance & Verification Commands**:
   - Run `node scripts/bundle-books.js` whenever markdown chapters are edited or added to keep offline bundles in sync.
   - Run `powershell .\audit.ps1` to verify chapter integrity, bundle coverage, and parser health across all 11 books.

---

## 6. Directory Instructions
Each learning folder contains a `GEMINI.md` file with specific coding standards and curriculum mappings for that domain. All sub-guidelines inherit and adhere to this root document.

---

## 7. Engineering Rules (every AI tool and contributor)

These rules come from real bugs found in this site. Follow them for every change.

1. **Brand name is "Junior Coders".** Never write "BEI Coders" or "LearnCode" in visible text. Code identifiers keep the
   `bei-` prefix (`styles/bei-core.css`, `.bei-nav`, `js/bei-*.js`); do not rename them.
2. **Mobile first.** Every page must work at **390px wide**: no horizontal page scroll, header buttons visible,
   tap targets about 38–44px. Long rows of links scroll sideways in one row rather than wrapping into many rows.
3. **Relative paths only.** The site runs at a domain root (Vercel) *and* in a subfolder
   (`http://localhost/junior-coders-git-lab/`). Never use root-absolute paths like `/styles/...` or `/js/...`.
   If a script needs the site root, derive it from its own URL (see `js/pdf-download.js`).
4. **Never bulk-insert markup blindly.** A script once inserted a `<script>` tag before every `</body>` it found,
   including ones inside JavaScript strings and exercise answers, and broke three pages. After any scripted edit across
   many files, search for the inserted text appearing more than once per file and run the checks below.
5. **One reader control bar for all textbooks.** Every `book-*/index.html` uses the same markup:
   `header.book-reader-header#bookReaderHeader > .reader-header-main` containing `.reader-controls-left` (Read / Stop),
   `.reader-status-center` (Prev/Next is injected here by `js/book-pagination.js`, plus the chapter badge) and
   `.reader-controls-right` (speed, optional `.reader-font-size` A-/A+, Reading Mode, Download PDF). Keep the element IDs
   (`book-speaker-main-btn`, `book-speaker-stop-btn`, `book-speaker-speed-select`, `book-speaker-status-text`,
   `book-reading-mode-btn`, `book-download-pdf-btn`); `js/book-speaker.js` and `js/pdf-download.js` depend on them.
   Copy the bar from an existing book; do not invent a new one.
6. **Refresh the bar after loading a chapter.** Each book's `loadChapter()` must call
   `if (window.initBookSpeaker) window.initBookSpeaker();` after the chapter HTML is rendered. It fills the badge with the
   chapter title and reading time and adds the section 🔊 buttons.
7. **Module lists must match the pages.** If you add, remove or reorder a module, update that folder's `GEMINI.md`
   module mapping and the matching `.gemini/agents/*-tutor.md` in the same change, then run
   `node scripts/sync-curriculum.js` (it regenerates the module switcher list in `js/bei-nav.js` from the pages' titles).
7b. **One site navigation.** Every page except the textbook readers (`book-*/index.html`) loads
   `styles/bei-core.css` and `js/bei-nav.js`; the script renders the header, the phone drawer, the phone tab bar,
   and on `moduleN.html` pages the breadcrumb, module switcher and bottom pager. Do not hand-write a `<nav>` or header
   in a page, and do not re-enable the old header in `js/core.js` (`injectNavigation`, `injectModuleNavigator`, the
   `.bottom-nav`): it is kept only as a fallback for pages without the shared nav. To add a menu item, edit
   `renderGlobalNav()` / `renderTabBar()` in `js/bei-nav.js` once.
8. **Check before you finish:**
   ```bash
   node scripts/bundle-books.js          # after editing textbook chapters (.md)
   powershell .udit.ps1                # all 11 books: chapters, bundles, parser
   node scripts/validate-scripts.js      # JavaScript syntax in the book readers
   node scripts/render-check.mjs .render 390 844 1 <page urls...>   # phone width: scroll, JS errors, 404s, screenshots
   ```
   Open the screenshots in `.render/` and look at them. `audit.ps1` rewrites `book-audit-report.md` with a new date;
   do not commit that file if nothing else in it changed.
9. **Commits:** clear conventional messages (`fix:`, `feat:`, `docs:`...). Push to `main` only when the owner asks;
   `main` deploys to Vercel.

