const fs = require('fs');
const path = require('path');

const tracks = [
    { dir: 'Learning JS', modules: 9 },
    { dir: 'Learning HTML', modules: 12 },
    { dir: 'Learning CSS', modules: 8 },
    { dir: 'Learning Python', modules: 8 }
];

tracks.forEach(track => {
    const fullDir = path.join(process.cwd(), track.dir);
    if (!fs.existsSync(fullDir)) return;

    for (let i = 1; i <= track.modules; i++) {
        const file = path.join(fullDir, `module${i}.html`);
        if (!fs.existsSync(file)) continue;

        let content = fs.readFileSync(file, 'utf8');
        let modified = false;

        // 1. Ensure bei-core.css is linked in head
        if (!content.includes('styles/bei-core.css')) {
            content = content.replace(
                /<link\s+rel=["']stylesheet["']\s+href=["']\.\.\/styles\/main\.css["']\s*>/i,
                '<link rel="stylesheet" href="../styles/main.css">\n    <link rel="stylesheet" href="../styles/bei-core.css">'
            );
            modified = true;
        }

        // 2. Ensure bei-nav.js is included before </body>
        if (!content.includes('js/bei-nav.js')) {
            if (content.includes('../js/core.js')) {
                content = content.replace(
                    /<script\s+src=["']\.\.\/js\/core\.js["']><\/script>/i,
                    '<script src="../js/bei-nav.js"></script>\n    <script src="../js/core.js"></script>'
                );
            } else if (content.includes('</body>')) {
                content = content.replace(
                    '</body>',
                    '    <script src="../js/bei-nav.js"></script>\n</body>'
                );
            }
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Updated navigation for: ${track.dir}/module${i}.html`);
        }
    }
});
