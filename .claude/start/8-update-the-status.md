# 8. Update the work log (the session-keeper)

1. **Run the `session-keeper` agent** (`.claude/agents/session-keeper.md`) with what is known from today's `start` and the owner's answers; or follow `docs/SESSION-HANDOFF.md` by hand.
2. **It brings `docs/BACKLOG.md` up to date:** what was completed, what is in progress, the next agreed item.
3. **Check its lines** against `git log --oneline -10` before repeating them to the owner.
4. **`ROADMAP.md` and the README:** say whether their facts are now out of date; change them only where the owner agrees.
5. **Show the owner** the lines before and after. Commit and push only on the owner's yes, both branches as the handoff note says.
