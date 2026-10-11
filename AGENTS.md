# AGENTS.md

Instructions for AI coding agents (Codex, Copilot, Cursor and others) working on Junior Coders Git Lab.

1. **Read `GEMINI.md` first.** It is the rulebook for every AI tool, not only Gemini: the ethics framework that every
   lesson and example must follow, the curriculum order, the textbook architecture and the hosting rules.
2. **Read `CLAUDE.md`** for quick facts, the checks to run, and the current status / open items.
3. Before editing a `Learning */` folder, read its own `GEMINI.md`. For subject content, read the matching
   `.gemini/agents/<subject>-tutor.md`.
4. After editing textbook chapters run `node scripts/bundle-books.js`, then `powershell .\audit.ps1`.
5. Commit and push only when the user asks.
