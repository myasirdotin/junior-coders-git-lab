---
description: Start of a session - check where Junior Coders stands, show a checklist, ask the owner what only the owner knows, then a numbered menu
---

The owner typed **start** (owner, 24/11/2026; the same shape in every project of the owner's). Check where Junior Coders stands, show it as a short checklist, ask the owner the questions only the owner can answer, then show the numbered menu. Anything the owner typed after the word: $ARGUMENTS

## Rules

- **Read only.** Change nothing: no edit, commit, push, merge, delete or build.
- Every tick comes from a check made now, never from memory. Where a check could not be made, write "not checked" and why. Never show ✅ for something you did not look at.
- Plain words, short lines, dates as DD/MM/YYYY. The owner is not a programmer.
- Quick and cheap: this is a small project, so run the commands yourself, in one or two calls.

## 1. Check

1. **The folder.** `git rev-parse --abbrev-ref HEAD`, `git fetch --quiet origin`, then `git rev-list --left-right --count origin/main...main`. Is the folder on `main`, and is `main` the same here and on GitHub? **If the folder is behind GitHub, say so first, in bold: nothing is built in it until it is brought up to date.**
2. **Unsaved work.** `git status --short` here and in every folder of `git worktree list`.
3. **Branches.** For each local and `origin/` branch other than `main`: `git rev-list --count origin/main..<branch>`. 0: finished, can be deleted. More: still holds work, with its last date and one line on what it is.
4. **The work log.** `docs/BACKLOG.md` and `docs/SESSION-HANDOFF.md`: what was last completed, what is in progress, the next agreed item. This is the start-of-session summary CLAUDE.md already asks for: give it in three or four lines.
5. **Both branches.** The project pushes two branches (`main` and `master`, see `docs/SESSION-HANDOFF.md`): are they at the same commit on GitHub (`git rev-parse origin/main origin/master`)? The handoff note's way to push is `git push origin main && git push origin main:master`.
6. **The students' exercise files are current?** In `../junior-coders-exercises`: its last commit date against the last change to what it is made from here (`git log -1 --format=%cs -- scripts/build-exercises-repo.js book-*`). Older is a ⚠️: number 3.
7. **Bundles with only line-ending changes.** `git status --short` and `git diff --stat`: a `chapters-bundle.js` that shows every line changed with no real change must not be committed (CLAUDE.md "Line endings").
8. **If the owner named work after the word** (for example "start the new page"): look for it before anything is built: `git log --oneline -i --grep=<word>` and `git grep -n -i <word>`. Say ALREADY BUILT, PARTLY BUILT, NOT BUILT or NOT SURE, and where it is.

## 2. Show

Three parts, in this order, and nothing else (the third ends with the numbered menu):

**Checked by me**: one line per check: ✅ fine, ⚠️ needs attention (say what, in a few words), or "not checked". The ⚠️ lines first.

**Questions for you**: numbered, at most three, the most pressing first. Only what the owner must say or decide: what happened in class with the last lesson, which chapter the students are on, whether the next agreed item in the backlog is still the next one. Never ask what you could check yourself.

**What shall we work on today?**: one line saying which number you recommend today and why. Then the menu, exactly these numbers and names, every time:

```
1  Write or change a chapter, cheatsheet or module
2  Fix a mistake in a book or a page
3  Make the students' exercise files again
4  Check: scripts and the phone layout
5  Publish (push to GitHub; Vercel publishes)
7  Branches and GitHub: tidy up and sync
8  Update the work log (the session-keeper)
9  Finish for today
```

(This is a small project, so it has no number 6. 7, 8 and 9 mean the same in every project of the owner's.)

End with: "Reply with a number, or tell me in your own words."

Then stop and wait. Record nothing and change nothing until the owner says so.

## 3. When the owner replies with a number

A reply that is just a number (or "1.", "number 1", "one", or a number followed by words) chooses that line, as long as this session's last `start` showed the menu. Open its steps file, read it, and follow its steps in order, exactly as written:

| Number | Steps file |
|---|---|
| 1 | `.claude/start/1-write.md` |
| 2 | `.claude/start/2-fix.md` |
| 3 | `.claude/start/3-exercise-files.md` |
| 4 | `.claude/start/4-check.md` |
| 5 | `.claude/start/5-publish.md` |
| 7 | `.claude/start/7-branches-and-github.md` |
| 8 | `.claude/start/8-update-the-status.md` |
| 9 | `.claude/commands/finish.md` |

- Say first, in one line, which number was chosen and what it will do, then begin at its step 1.
- The steps are required, in their order. Do not skip one silently: if a step cannot be done or does not apply, say which and why, and carry on only if the later steps do not depend on it.
- Where a step says "ask", ask and wait. Where it says "on the owner's yes", wait for that yes.
- If the steps file is missing, say which file and stop: do not improvise the task.
- The checklist's ⚠️ lines still count: if one stands in the way of the chosen number, say so before step 1.
- When the task is finished, show the menu again in one short block and ask: another number, or 9 to finish.
- Words instead of a number are fine: find the line they mean, say which, and follow it; if none fits, do what the owner asked under CLAUDE.md's rules.
