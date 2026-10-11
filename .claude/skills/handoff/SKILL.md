---
name: handoff
description: Save the session — update docs/BACKLOG.md (done / in progress / next / decisions), commit and push both branches, and print the summary the next session will see. Use when the owner says "/handoff", "save our progress", "we'll continue later" or is ending the session.
---

Run the end-of-session procedure in `docs/SESSION-HANDOFF.md`:

1. Compare `docs/BACKLOG.md` with what actually happened this session (`git status`, `git log --oneline -10`,
   the conversation). Move completed items to **Done** with today's date and key file paths; describe unfinished
   work under **Now** with the exact stopping point; add new requests under **Next** in the agreed order; record
   decisions; update the `_Last updated_` line.
2. If code changed and is not committed: run the checks in `GEMINI.md` §7.8, then commit (conventional message)
   and push both branches: `git push origin main && git push origin main:master && git branch -f master main`.
   If only the backlog changed, commit it as `docs: session handoff <date>` and push the same way.
3. Reply with exactly three lines: **Last completed**, **In progress**, **Next** — this is what the next session reads first.
