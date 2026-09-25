# LearnCode V-01 - Project Instructions & Core Guidelines

This project is an interactive educational platform for mastering full-stack web development: HTML, CSS, JavaScript, PHP, MySQL, and Laravel. It has been formalized as the **LearnCode V-01** package for GitHub release.

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
- **Encouraged Real-World Scenarios**:
  - Ethical e-commerce (halal bakeries, bookshops, artisan crafts, organic farms).
  - Charitable giving, *Zakat* calculators, and humanitarian donation trackers.
  - Community service portals, student study organizers, prayer time / calendar apps, hospital appointment schedulers, and clean energy monitors.
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
- [ ] Does the project cultivate beneficial skills that serve people and communities?
- [ ] Are digital trust (*Amānah*), privacy, security, and data protection upheld?
- [ ] Is the language respectful, constructive, and pedagogical?

---

## 2. Specialized Agents
The following custom subagents are configured to assist across each domain:
- `@html-tutor`: Expert in HTML fundamentals, semantics, structure, and accessibility.
- `@css-tutor`: Expert in CSS architecture, modern layout (Flexbox & Grid), typography, and responsive design.
- `@js-tutor`: Expert in JavaScript logic, ES6+, data structures, and DOM manipulation.
- `@php-tutor`: Expert in server-side PHP, form processing, file I/O, security (XSS/CSRF/sessions), and OOP.
- `@mysql-tutor`: Expert in relational schema design, data normalization, SQL queries, indexing, and data integrity.
- `@laravel-tutor`: Expert in MVC architecture, Eloquent ORM, Blade templating, migrations, and robust web applications.
- `@python-tutor`: Expert in Python syntax, data structures, scripting, clean OOP, and data handling.
- `@ml-tutor`: Expert in machine learning fundamentals, dataset curation, supervised algorithms, and ethical AI stewardship (*Amānah*).

---

## 3. Educational Priorities & Pedagogical Architecture

1. **Textbooks as Single Source of Truth**: The interactive textbooks (`book-html/`, `book-css/`, `book-js/`, `book-cmd/`, `book-git/`, `book-php/`, `book-mysql/`, `book-laravel/`, `book-python/`) define the curriculum, mental models, code examples, and mastery questions. Interactive learning pages (`Learning HTML/`, `Learning CSS/`, `Learning Python/`, etc.) directly mirror textbook chapters.
2. **Scaffolded Learning Flow (No Leaps, No Premature Concepts)**:
   - Concepts must be taught in strict prerequisite order. Never use a concept, syntax, or method before it has been formally introduced.
   - Always bridge the gap from *mental analogy* $\rightarrow$ *syntax breakdown* $\rightarrow$ *isolated example* $\rightarrow$ *interactive practice* $\rightarrow$ *real-world application*.
3. **Mastery-Based Multi-Tier Practice**:
   - Every module must feature 3 tiers of exercises:
     - 🟢 **Level 1 (Recall / Warmup)**: Simple syntax reproduction and fill-in-the-blanks.
     - 🟡 **Level 2 (Application / Modification)**: Extending code and combining two concepts.
     - 🔴 **Level 3 (Creative Challenge / Problem-Solving)**: Building a complete miniature feature independently.
4. **Offline-First Interactive Readers**: Every textbook contains pre-compiled `chapters-bundle.js` for instant local offline reading, Web Speech narration (`book-speaker.js`), reading mode, and code lab launch buttons.
5. **Security & Ethical Stewardship by Design**: Server-side and AI modules enforce input sanitization, data privacy (*Amānah*), transparent decision-making, and parameterized statements from the very first lesson.

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

---

## 5. Directory Instructions
Each learning folder contains a `GEMINI.md` file with specific coding standards and curriculum mappings for that domain. All sub-guidelines inherit and adhere to this root document.

