# JavaScript Learning Context & Standards

The single source of truth for all JavaScript concepts, terminology, syntax, exercises, and challenges is the official textbook in `book-js/` (**JavaScript for Class 7 & 8: Dynamic Client-Side Programming**).

---

## 1. Ethical Alignment (*'Ilm Nāfi'* & *Amānah*)

All JavaScript lessons, exercises, challenges, and DOM mini-projects must adhere strictly to Islamic principles:
- **Beneficial Web Applications (*'Ilm Nāfi'*)**: Teach front-end interactive engineering as a beneficial skill for education, community well-being, accessible utilities, and halal commerce.
- **Strictly Prohibited Domains**:
  - **No Entertainment / Movie Streaming**: Never use commercial video/movie streaming portals (e.g., Netflix, cinema booking, pop celebrity tracking) in examples, decision trees, or projects.
  - **No Usury / Interest (*Ribā*)**: No interest rate calculations or debt engines.
  - **No Gambling (*Maysir*)**: No dice games of chance, coin flips used for gambling, lottery pickers, or casino games.
  - **No Deceptive UX (*Gharar*)**: No deceptive popups, fake countdown timers, or artificial scarcity tricks.
- **Encouraged Wholesome Scenarios**:
  - Educational tools: Science quiz engines, flashcard memorizers, study session timers, library book searches, math tutors.
  - Ethical ticketing & admission: Science museum & planetarium ticket calculators, botanical garden passes, student bus transit cards.
  - Charity & community tools: Sadaqah/Zakat goal trackers, water well donation calculators, prayer time dashboards.
  - Wholesome commerce: Bookstores, organic farm markets, educational supply stores.

---

## 2. Curriculum & Module Mapping
All learning modules and interactive pages in `Learning JS/` mirror the curriculum in `book-js/`:
Module pages as they are on the site (`Learning JS/moduleN.html`), with the textbook chapters each one covers:
- **Module 1**: Variables & Data Types (Book Part 1: Ch 1–2 intro; Book Part 2: Ch 3–5)
- **Module 2**: Operators & Expressions (Book Part 2: Ch 3–5)
- **Module 3**: Conditionals & Decision Making (Book Part 3: Ch 6–7)
- **Module 4**: Functions (Book Part 5: Ch 10–11)
- **Module 5**: JavaScript Arrays (Book Part 6: Ch 12–13)
- **Module 6**: Loops (Book Part 4: Ch 8–9)
- **Module 7**: Introduction to the DOM (Book Part 9: Ch 17–20)
- **Module 8**: Objects & Data Structures (Book Part 7: Ch 14)
- **Module 9**: Events & Interactivity (Book Part 8: Ch 15–16)

**Differences from the textbook (owner to decide; checked 2026-10-11):** the book order is Loops → Functions → Arrays →
Objects → Input/Events → DOM. The pages teach Functions and Arrays **before** Loops, and the DOM **before** Objects and
Events. A check on 2026-10-11 found no student-facing loops or objects in Modules 4, 5 and 7 (only in the pages' own
grading scripts), so this is an order difference, not a broken lesson. Keep it that way: under the "no premature concepts"
rule (root `GEMINI.md` §3) those modules must not use loops or objects in examples. Either reorder the pages or record the
page order as official, then update this list and `.gemini/agents/js-tutor.md` in the same change.

---

## 3. Educational Priorities & Coding Standards
When developing or modifying pages in this directory:
1. **Source of Truth**: Draw code examples, mental models, and terminology directly from `book-js/`.
2. **Modern ES6+ Syntax**: Enforce `let` and `const` (never `var`), arrow functions where appropriate, template literals, and strict equality (`===`).
3. **Pedagogical Structure**: Every module contains:
   - Clear learning goals with real-world analogies.
   - Interactive live code playground.
   - Multi-tier exercises: 🟢 Easy (Recall), 🟡 Medium (Application), 🔴 Challenge (Creative Problem-Solving).
   - Instant-feedback comprehension quiz.
   - Direct link to corresponding textbook chapter (`../book-js/#ch*`).
4. **Clean Code (*Iḥsān*)**: Meaningful variable names, well-commented logic, accessible DOM elements, and robust input handling.
