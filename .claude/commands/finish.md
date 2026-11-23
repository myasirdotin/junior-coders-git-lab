---
description: End of a session - list what was done, what is unsaved, what has no second copy and what is still open, then ask the owner before saving or pushing
---

The owner typed **finish** (owner, 24/11/2026: the pair of `start`). Before the session closes, show what this session did on Junior Coders and what would be lost or forgotten if the owner closed now, and ask before saving or pushing anything. Anything the owner typed after the word: $ARGUMENTS

## Rules

- **Check first, change nothing.** No commit, push, merge or delete until the owner answers. An earlier "yes" in this session does not count for a new commit, push or deletion.
- Every tick comes from a check made now. Where a check could not be made, write "not checked" and why.
- Plain words, short lines, dates as DD/MM/YYYY.

## 1. Check

1. **What this session did.** From this conversation and `git log` since it began: commits, branches, files changed. Only what really happened.
2. **Unsaved work.** `git status --short` here and in every folder of `git worktree list`.
3. **This PC and GitHub.** `git fetch --quiet origin`; `main` and every branch: the same on both, only here, only on GitHub.
4. **Was the work checked?** `node scripts/validate-scripts.js`; the changed pages through `scripts/render-check.mjs` at 390 px; every changed code example run. Say what was not run.
5. **Generated files.** Made again where a source changed; no bundle committed for line endings only.
6. **The students' exercise files** (`../junior-coders-exercises`): behind what changed here, or current?
7. **The paperwork:** this is the project's own end-of-session handoff (`docs/SESSION-HANDOFF.md`, `/handoff`): `docs/BACKLOG.md` updated; both branches pushed on the owner's yes.
8. **Promises left open.** Anything this session said it would do and has not, and any question still unanswered.

## 2. Show

**Done today**: a few lines.

**Before you close**: one line per check: ✅ fine, ⚠️ needs attention (say what), or "not checked". The ⚠️ lines first.

**Questions for you**: numbered, at most three: what to save, what to push, which check to run, what to leave. Recommend an answer for each.

**For next time**: two or three lines the next session should start from.

Then wait. Do only what the owner says yes to, one thing at a time, and report each result.
