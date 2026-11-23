# 2. Fix a mistake in a book or a page

1. **Ask what is wrong**, unless the owner said: which book, chapter or page, what it says or does, and what is right.
2. **Check it is not already fixed:** `git log --oneline -i --grep=<word>` on `main` and the unmerged branches.
3. **Find the source, not the generated file:** a mistake seen in a bundle or a book page is fixed in what `scripts/bundle-books.js` reads.
4. **Work on a branch** made from `main`'s last commit.
5. **Fix it;** a code example is run again and its output checked. A fact is checked before it is changed.
6. **Make the generated files again** where the source changed, then `node scripts/validate-scripts.js` and the page through `scripts/render-check.mjs` at 390 px.
7. **Does the same mistake sit in the students' exercise files?** If so, number 3 after this.
8. **Report** the old line, the new line and what was run. Commit and merge on the owner's yes. Publishing is number 5.
