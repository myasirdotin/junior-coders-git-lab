# CLAUDE.md — Junior Coders

**Read this file and `GEMINI.md` before making any change.** `GEMINI.md` is the project's rulebook (ethics framework,
curriculum order, textbook architecture, hosting rules). It is imported below so Claude always loads it; other AI tools
reach it through `AGENTS.md`. Do not duplicate its rules here. Change them in `GEMINI.md`.

@GEMINI.md

## Quick facts for working here

- **What it is:** a static, offline-first computer-science learning site for school students (Grades 6–10) and their
  teachers: 11 interactive textbooks (`book-*/`), interactive modules (`Learning */`), cheatsheets, studios
  (web, SQL, Python), practice arena, learning paths and a teacher hub.
- **Repo:** `github.com/myasirdotin/junior-coders-git-lab` (branch `main`), deployed on Vercel.
  Local: `C:\xampp\htdocs\junior-coders-git-lab` → `http://localhost/junior-coders-git-lab/`.
- **No build step.** Plain HTML/CSS/JS. The only generated files are the textbook bundles.
- **Folder-level rules:** most `Learning */` folders have their own `GEMINI.md`. Read it before editing that folder.
- **Domain tutors:** `.gemini/agents/*-tutor.md` describe the expert persona for each subject. Read the relevant one
  when writing or reviewing content for that subject.

## Must stay true

- **Works in a subfolder and at a domain root.** Never use root-absolute paths (`/styles/...`, `/js/...`). Use relative
  paths, or derive the site root from a script's own URL (see `js/pdf-download.js`).
- **Mobile first.** Every page must work at 390px wide: no horizontal scroll, header buttons visible, tap targets ≥ 44px.
- **Ethics checklist** in `GEMINI.md` §1 applies to every example, exercise and image.
- **Do not inject markup into pages with scripts** without checking the result. A bulk script once put a `<script>` tag
  inside a JavaScript template string in `Learning CSS/playground.html` and broke the page.

## Checking your work

```bash
node scripts/bundle-books.js        # after editing any textbook chapter (.md)
powershell .\audit.ps1              # chapter integrity, bundle coverage, parser health (all 11 books)
node scripts/validate-scripts.js    # script checks
# phone-width render check (JS errors, 404s, elements wider than the screen, screenshots):
node ../commerce-lab/tools/render-check.mjs <outDir> 390 844 1 http://localhost/junior-coders-git-lab/index.html [more urls]
```

Look at screenshots, not just numbers. Commit with clear conventional messages; push to `main` only when the user asks.

## Status & open items (keep this current)

_Last updated 2026-10-11._

- 2026-10-11 audit (all 175 pages at 390px): no page scrolls sideways. Fixed: print stylesheet 404 under a subfolder
  (`js/pdf-download.js`); script errors in `Learning CSS/playground.html`, `Learning HTML/playground.html` and
  `Learning HTML/exercises.html` (a bulk edit had injected `<script>` tags inside JS strings and exercise answers);
  Teacher Hub header and class selector overflowing on phones; 67 literal `*Amānah*`-style asterisks now render as italics.
- **Brand name is "Junior Coders"** (owner's decision, 2026-10-11). The old names "BEI Coders" and "LearnCode V-01" were
  replaced in all visible text. Code identifiers keep the `bei-` prefix (`bei-core.css`, `.bei-nav`, `js/bei-*.js`); do not rename them.
- **Reader controls are one shared markup in all 11 books** (2026-10-11): `header.book-reader-header > .reader-header-main`
  with `.reader-controls-left` (Read/Stop), `.reader-status-center` (Prev/Next from `js/book-pagination.js` + chapter badge),
  `.reader-controls-right` (speed, optional A-/A+ `.reader-font-size`, Reading Mode, PDF). Copy it from any book; do not
  invent a new bar. Each book's `loadChapter()` must call `window.initBookSpeaker()` after rendering a chapter (it fills the
  badge with title + read time and adds section 🔊 buttons). Layout: one row on wide screens, two rows at 901-1440px,
  compact one row on phones (rules at the end of `styles/book-theme.css`).
- Phone fixes (2026-10-11): chapter text starts ~260-310px down (was 360-440px); the `.book-mobile-header` variant
  (Cybersecurity, Networks, Python) is now styled and its chapter drawer closes on pick / outside tap / Escape.
