# AGENTS.md

Instructions for AI coding agents (Codex, Copilot, Cursor and others) working on Junior Coders.

1. **Read `GEMINI.md` first.** It is the rulebook for every AI tool, not only Gemini: the ethics framework that every
   lesson and example must follow (§1), the subject tutors (§2), the curriculum order (§3–4), hosting (§5) and the
   **engineering rules (§7)**: brand name, mobile-first, relative paths, the shared textbook control bar, and the checks to run.
2. **Read `CLAUDE.md`** for quick facts and the current status / open items.
3. Before editing a `Learning */` folder, read its own `GEMINI.md`. For subject content, read the matching
   `.gemini/agents/<subject>-tutor.md` as the subject expert's brief.
4. Before you finish, run the checks in `GEMINI.md` §7.8, including
   `node scripts/render-check.mjs .render 390 844 1 <page urls>` and a look at the screenshots.
5. Commit and push only when the owner asks; `main` deploys to Vercel.
