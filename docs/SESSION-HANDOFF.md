# Session handoff (any AI tool)

The owner works on this site in short sessions with different AI tools. So that nothing is forgotten between
sessions, `docs/BACKLOG.md` is the single work log: **Now / Next / Decisions pending / Done / Not yet verified**.

## At the start of a session

1. Read `docs/BACKLOG.md` (Claude loads it automatically through `CLAUDE.md`).
2. Tell the owner in three or four lines: what was last completed, what is in progress, and the next agreed item.
   Ask only if a listed decision is still pending.
3. Check `git status` and `git log --oneline -5`: uncommitted work or commits newer than the backlog mean the last
   session ended without a handoff — reconcile the backlog first.

## At the end of a session (or whenever the owner says "save", "handoff" or "/handoff")

1. Move finished items to **Done** with today's date and the key file paths.
2. Put unfinished work under **Now** with a precise "where I stopped" line (file, what works, what does not).
3. Add anything the owner asked for later under **Next**, keeping the agreed order.
4. Record any decision the owner made under the relevant item, and open questions under **Decisions pending**.
5. Update the `_Last updated_` line.
6. If code changed: run the checks in `GEMINI.md` §7.8, commit, and push **both** `main` and `master`
   (`git push origin main && git push origin main:master`). The backlog update goes in the same commit as the work,
   or in its own `docs:` commit.
7. Reply with the three-line summary the next session will see.

Keep entries short and concrete. The backlog is a list, not a diary.
