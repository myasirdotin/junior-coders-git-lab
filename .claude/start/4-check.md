# 4. Check: scripts and the phone layout

1. **Ask what to check**, unless the owner said: everything, one book, or what changed since the last publish.
2. **The checks the project has:** `node scripts/validate-scripts.js`; `powershell ./audit.ps1`; `node scripts/check-kotlin-exercises.js` when Kotlin exercises are in question. Give each one's real result.
3. **The phone layout:** `node scripts/render-check.mjs <out> 390 844 1 <addresses>` (it needs Apache and Chrome). **Look at the screenshots.**
4. **Generated files are current:** run `node scripts/bundle-books.js` and `node scripts/sync-curriculum.js`, then `git diff --stat`: a real difference means a source was changed without making them again. Line-ending-only differences are put back, not committed.
5. **Offline:** the pages still open with the network off.
6. **Report one short table:** check, PASS or FAIL, then each fault with the page and how serious. Nothing is fixed here: a fault becomes number 2. **Ask** which to fix first.
