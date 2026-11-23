# 1. Write or change a chapter, cheatsheet or module

1. **Ask what is wanted**, unless the owner said: which book or module, which grade (6 to 10), and what the students should be able to do after it. Say it back in two lines and wait for the owner's yes.
2. **Check it is not already there:** `js/data/books.js`, the book's folder, `docs/BACKLOG.md`, `git log --oneline -i --grep=<word>` on `main` and the unmerged branches.
3. **Read before writing:** `GEMINI.md` (the rulebook: ethics §1, the subject tutors §2, the curriculum order §3–4, engineering rules §7), the folder's own `GEMINI.md` if it has one, and the matching subject tutor in `.gemini/agents/` as the subject expert's brief.
4. **Work on a branch** made from `main`'s last commit.
5. **Write it** in the order and style the rulebook sets. Every code example is run and gives the output shown. Content is right for the grade and suitable for school students; nothing copied from a textbook or another site.
6. **Textbooks are generated:** change the source and `js/data/books.js`, then `node scripts/bundle-books.js` makes the pages, bundles, cards and search entries. Navigation's module list comes from `node scripts/sync-curriculum.js`. Never edit a generated file by hand.
7. **Check:** `node scripts/validate-scripts.js`; `node scripts/render-check.mjs <out> 390 844 1 <addresses>` and look at the screenshots; for Kotlin exercises `node scripts/check-kotlin-exercises.js`.
8. **Before committing:** `git diff --stat`. Leave out bundles whose only change is line endings.
9. **Paperwork:** `docs/BACKLOG.md`. **Report**, then commit and merge on the owner's yes. Publishing is number 5; the students' files are number 3.
