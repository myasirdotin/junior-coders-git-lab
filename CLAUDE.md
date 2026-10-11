# CLAUDE.md — Junior Coders

**Read this file and `GEMINI.md` before making any change.** `GEMINI.md` is the single rulebook for every AI tool:
ethics framework (§1), subject tutors (§2), curriculum order (§3–4), hosting (§5) and **engineering rules (§7)**.
It is imported below so Claude always loads it; other tools reach it through `AGENTS.md`. Do not copy its rules into
this file. Change them in `GEMINI.md`.

@GEMINI.md

## Quick facts for working here

- **What it is:** a static, offline-first computer-science learning site for school students (Grades 6–10) and their
  teachers: 11 interactive textbooks (`book-*/`), interactive modules (`Learning */`), cheatsheets, studios
  (web, SQL, Python), practice arena, learning paths and a teacher hub.
- **Repo:** `github.com/myasirdotin/junior-coders-git-lab` (branch `main`), deployed on Vercel.
  Local: `C:\xampp\htdocs\junior-coders-git-lab` → `http://localhost/junior-coders-git-lab/`.
- **No build step.** Plain HTML/CSS/JS. The only generated files are the textbook bundles (`book-*/chapters-bundle.js`).
- **Folder rules:** most `Learning */` folders have their own `GEMINI.md`; read it before editing that folder.
- **Subject tutors** (`.gemini/agents/*-tutor.md`) are written for Gemini CLI. In Claude, read the matching file as the
  subject expert's brief when writing or reviewing content.
- **Line endings:** files are checked out with Windows line endings. Rebuilding the textbook bundles can change every line
  of a bundle with no real change; check `git diff --stat` and do not commit bundles whose only change is line endings.

## Status & open items (keep this current)

_Last updated 2026-10-11._

- Full-site audit at 390px (all 175 pages): no page scrolls sideways; fixed print-stylesheet 404, three pages broken by an
  earlier bulk edit, Teacher Hub overflow, 67 literal `*Amānah*`-style asterisks (now italics).
- Brand renamed to **Junior Coders** in all visible text (owner's decision).
- All 11 textbooks share one reader control bar (see `GEMINI.md` §7.5–7.6); chapter text starts about 260–310px down on
  phones; the Cybersecurity/Networks/Python phone menu and chapter drawer work; Git gained chapter narration.
- `scripts/render-check.mjs` added (phone-width checks + screenshots; output in git-ignored `.render/`).
- Curriculum order: the module *page* order is official for HTML, CSS and JS (decided 2026-10-11); it differs from the
  textbook order on purpose. See each folder's `GEMINI.md` §2.
- **Open — not yet checked:** narration audio playback in a real browser (headless tests cannot play sound).
