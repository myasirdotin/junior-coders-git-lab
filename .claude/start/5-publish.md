# 5. Publish (push to GitHub; Vercel publishes)

1. **What would go live:** `git log --oneline origin/main..main`, in plain words.
2. **Read-only check, each ✅ or ❌:** the folder is on `main` with nothing unsaved; `node scripts/validate-scripts.js` passes; the changed pages pass `scripts/render-check.mjs` at 390 px; the generated files are current; no bundle is in the commits for line endings only.
3. **Stop at any ❌ and ask.**
4. **On the owner's yes, push as `docs/SESSION-HANDOFF.md` says** (the project keeps two branches in step). Vercel publishes by itself from GitHub; it is the owner's account and Claude does not open it.
5. **After it is live:** ask the owner to open the changed page on a phone and say what they see.
6. **Paperwork:** `docs/BACKLOG.md` with what was published and when; then number 3 if the students' files are behind.
