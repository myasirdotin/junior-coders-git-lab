const fs = require('fs');
const path = require('path');

const dirs = ['Learning HTML', 'Learning CSS', 'Learning JS'];

dirs.forEach(dir => {
    const fullPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(fullPath)) return;

    const files = fs.readdirSync(fullPath).filter(f => f.endsWith('.html'));

    files.forEach(file => {
        const filePath = path.join(fullPath, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // Updated regex to optionally catch leading whitespace and a trailing newline
        const navRegex = /^[ \t]*<nav\b[^>]*>([\s\S]*?Playground[\s\S]*?)<\/nav>[ \t]*\r?\n?/gm;

        let changed = false;
        const newContent = content.replace(navRegex, (match, p1, offset) => {
            // Check if this match is inside a forbidden tag.
            const beforeMatch = content.substring(0, offset);
            const openPre = (beforeMatch.match(/<pre\b/gi) || []).length;
            const closePre = (beforeMatch.match(/<\/pre>/gi) || []).length;
            const openCode = (beforeMatch.match(/<code\b/gi) || []).length;
            const closeCode = (beforeMatch.match(/<\/code>/gi) || []).length;
            const openTextarea = (beforeMatch.match(/<textarea\b/gi) || []).length;
            const closeTextarea = (beforeMatch.match(/<\/textarea>/gi) || []).length;

            if (openPre > closePre || openCode > closeCode || openTextarea > closeTextarea) {
                return match;
            }

            if (p1.includes('Playground') && (p1.includes('Exercises') || p1.includes('Glossary') || p1.includes('Learning'))) {
                changed = true;
                return '';
            }

            return match;
        });

        if (changed) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Updated: ${filePath}`);
        }
    });
});
