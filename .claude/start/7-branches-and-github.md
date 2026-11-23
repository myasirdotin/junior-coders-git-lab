# 7. Branches and GitHub: tidy up and sync

1. **Bring the picture up to date:** `git fetch origin --prune`, `git worktree list`.
2. **This folder:** is `main` here behind GitHub's? If so, say by how much and what is unsaved, and ask before bringing it up to date (`git pull --ff-only origin main`); never with unsaved work in the way.
3. **Sort every branch**, local and on GitHub, against `origin/main`: finished (`git rev-list --count origin/main..<branch>` is 0) can be deleted; one that still holds work: how many commits, the last date, what it is, whether it would merge cleanly (`git merge-tree --write-tree origin/main <branch>`). A branch named `backup/…` was kept on purpose: ask what it was for.
4. **Every worktree:** `git status --short` in each. Unsaved work is never removed and its branch never switched: show what it is and ask whose it is.
5. **Show three lists:** can be deleted; still holds work; unsaved work.
6. **For a branch that holds work, ask:** merge it, keep it, or drop it. Before a merge: `node scripts/validate-scripts.js` on the result.
7. **Deleting:** `git worktree remove` first, never deleting the folder by hand. A branch is deleted only when `main` contains it (`git merge-base --is-ancestor <branch> origin/main`), here and on GitHub. Each deletion on the owner's yes.
8. **Sync:** push `main` and any branch that is only on this PC, on the owner's yes. Say what is still on one side.
9. **Report** what was merged, deleted and pushed, with the commit ids, and what was left and why.
