/**
 * Junior Coders - Unified Navigation System (bei-nav.js)
 * Provides global navigation standardization, mobile drawer toggle, theme management,
 * track-aware quick module switcher, and responsive bottom lesson pagers.
 */

(function () {
    'use strict';

    // ═════════════════════════════════════════════════════════════════
    // 1. CURRICULUM REGISTRY (Single Source of Truth)
    // ═════════════════════════════════════════════════════════════════
    // CURRICULUM-START (generated: run `node scripts/sync-curriculum.js` after adding/renaming module pages; do not edit by hand)
    const CURRICULUM = {
        "html": {
            "name": "HTML5 Foundations",
            "shortName": "HTML Track",
            "dir": "Learning HTML",
            "syllabus": "learninghtml.html",
            "bookDir": "book-html",
            "accent": "#ea580c",
            "modules": [
                {
                    "num": 1,
                    "title": "Welcome to HTML & Page Anatomy",
                    "file": "module1.html"
                },
                {
                    "num": 2,
                    "title": "Tags & Attribute Superpowers",
                    "file": "module2.html"
                },
                {
                    "num": 3,
                    "title": "Headings & Paragraphs",
                    "file": "module3.html"
                },
                {
                    "num": 4,
                    "title": "Text Formatting",
                    "file": "module4.html"
                },
                {
                    "num": 5,
                    "title": "Links & Navigation",
                    "file": "module5.html"
                },
                {
                    "num": 6,
                    "title": "Images & Media",
                    "file": "module6.html"
                },
                {
                    "num": 7,
                    "title": "Tables & Data Grids",
                    "file": "module7.html"
                },
                {
                    "num": 8,
                    "title": "Lists & Grouping",
                    "file": "module8.html"
                },
                {
                    "num": 9,
                    "title": "Block vs Inline",
                    "file": "module9.html"
                },
                {
                    "num": 10,
                    "title": "Classes & IDs",
                    "file": "module10.html"
                },
                {
                    "num": 11,
                    "title": "Forms & User Interaction",
                    "file": "module11.html"
                },
                {
                    "num": 12,
                    "title": "Semantic HTML5 & Modern Layout",
                    "file": "module12.html"
                }
            ],
            "extras": [
                {
                    "file": "playground.html",
                    "icon": "🧪",
                    "title": "Playground"
                },
                {
                    "file": "exercises.html",
                    "icon": "✍️",
                    "title": "Exercises"
                },
                {
                    "file": "quiz.html",
                    "icon": "❓",
                    "title": "Quiz"
                },
                {
                    "file": "glossary.html",
                    "icon": "📖",
                    "title": "Glossary"
                },
                {
                    "file": "best-practices.html",
                    "icon": "⭐",
                    "title": "Best Practices"
                },
                {
                    "file": "tips.html",
                    "icon": "💡",
                    "title": "Tips"
                }
            ]
        },
        "css": {
            "name": "Modern CSS & Layouts",
            "shortName": "CSS Track",
            "dir": "Learning CSS",
            "syllabus": "learningcss.html",
            "bookDir": "book-css",
            "accent": "#3b82f6",
            "modules": [
                {
                    "num": 1,
                    "title": "Intro to CSS",
                    "file": "module1.html"
                },
                {
                    "num": 2,
                    "title": "Colors & Text",
                    "file": "module2.html"
                },
                {
                    "num": 3,
                    "title": "The Box Model",
                    "file": "module3.html"
                },
                {
                    "num": 4,
                    "title": "Display & Positioning",
                    "file": "module4.html"
                },
                {
                    "num": 5,
                    "title": "Intro to Flexbox",
                    "file": "module5.html"
                },
                {
                    "num": 6,
                    "title": "Advanced Flexbox",
                    "file": "module6.html"
                },
                {
                    "num": 7,
                    "title": "CSS Grid",
                    "file": "module7.html"
                },
                {
                    "num": 8,
                    "title": "Responsive Design",
                    "file": "module8.html"
                }
            ],
            "extras": [
                {
                    "file": "playground.html",
                    "icon": "🧪",
                    "title": "Playground"
                },
                {
                    "file": "exercises.html",
                    "icon": "✍️",
                    "title": "Exercises"
                },
                {
                    "file": "quiz.html",
                    "icon": "❓",
                    "title": "Quiz"
                },
                {
                    "file": "glossary.html",
                    "icon": "📖",
                    "title": "Glossary"
                },
                {
                    "file": "best-practices.html",
                    "icon": "⭐",
                    "title": "Best Practices"
                },
                {
                    "file": "tips.html",
                    "icon": "💡",
                    "title": "Tips"
                }
            ]
        },
        "js": {
            "name": "JavaScript Track",
            "shortName": "JS Track",
            "dir": "Learning JS",
            "syllabus": "learningjs.html",
            "bookDir": "book-js",
            "accent": "#6366f1",
            "modules": [
                {
                    "num": 1,
                    "title": "Variables & Data Types",
                    "file": "module1.html"
                },
                {
                    "num": 2,
                    "title": "Operators & Expressions",
                    "file": "module2.html"
                },
                {
                    "num": 3,
                    "title": "Conditionals & Decision Making",
                    "file": "module3.html"
                },
                {
                    "num": 4,
                    "title": "Functions",
                    "file": "module4.html"
                },
                {
                    "num": 5,
                    "title": "JavaScript Arrays",
                    "file": "module5.html"
                },
                {
                    "num": 6,
                    "title": "Loops",
                    "file": "module6.html"
                },
                {
                    "num": 7,
                    "title": "Introduction to the DOM",
                    "file": "module7.html"
                },
                {
                    "num": 8,
                    "title": "Objects & Data Structures",
                    "file": "module8.html"
                },
                {
                    "num": 9,
                    "title": "Events & Interactivity",
                    "file": "module9.html"
                }
            ],
            "extras": [
                {
                    "file": "playground.html",
                    "icon": "🧪",
                    "title": "Playground"
                },
                {
                    "file": "exercises.html",
                    "icon": "✍️",
                    "title": "Exercises"
                },
                {
                    "file": "quiz.html",
                    "icon": "❓",
                    "title": "Quiz"
                },
                {
                    "file": "glossary.html",
                    "icon": "📖",
                    "title": "Glossary"
                },
                {
                    "file": "best-practices.html",
                    "icon": "⭐",
                    "title": "Best Practices"
                },
                {
                    "file": "tips.html",
                    "icon": "💡",
                    "title": "Tips"
                }
            ]
        },
        "php": {
            "name": "Server-Side PHP",
            "shortName": "PHP Track",
            "dir": "Learning PHP",
            "syllabus": "learningphp.html",
            "bookDir": "book-php",
            "accent": "#7c3aed",
            "modules": [
                {
                    "num": 1,
                    "title": "Introduction to PHP",
                    "file": "module1.html"
                },
                {
                    "num": 2,
                    "title": "Variables & Data Types",
                    "file": "module2.html"
                },
                {
                    "num": 3,
                    "title": "Control Flow",
                    "file": "module3.html"
                },
                {
                    "num": 4,
                    "title": "Functions",
                    "file": "module4.html"
                },
                {
                    "num": 5,
                    "title": "Arrays",
                    "file": "module5.html"
                },
                {
                    "num": 6,
                    "title": "Forms & POST/GET",
                    "file": "module6.html"
                },
                {
                    "num": 7,
                    "title": "File System",
                    "file": "module7.html"
                },
                {
                    "num": 8,
                    "title": "OOP Basics",
                    "file": "module8.html"
                }
            ],
            "extras": [
                {
                    "file": "playground.html",
                    "icon": "🧪",
                    "title": "Playground"
                },
                {
                    "file": "exercises.html",
                    "icon": "✍️",
                    "title": "Exercises"
                },
                {
                    "file": "quiz.html",
                    "icon": "❓",
                    "title": "Quiz"
                },
                {
                    "file": "glossary.html",
                    "icon": "📖",
                    "title": "Glossary"
                }
            ]
        },
        "mysql": {
            "name": "MySQL & Databases",
            "shortName": "MySQL Track",
            "dir": "Learning MySQL",
            "syllabus": "learningmysql.html",
            "bookDir": "book-mysql",
            "accent": "#0ea5e9",
            "modules": [
                {
                    "num": 1,
                    "title": "Intro to Databases",
                    "file": "module1.html"
                },
                {
                    "num": 2,
                    "title": "CREATE TABLE",
                    "file": "module2.html"
                },
                {
                    "num": 3,
                    "title": "INSERT & SELECT",
                    "file": "module3.html"
                },
                {
                    "num": 4,
                    "title": "UPDATE & DELETE",
                    "file": "module4.html"
                },
                {
                    "num": 5,
                    "title": "JOINs",
                    "file": "module5.html"
                },
                {
                    "num": 6,
                    "title": "Advanced Queries",
                    "file": "module6.html"
                }
            ],
            "extras": [
                {
                    "file": "playground.html",
                    "icon": "🧪",
                    "title": "Playground"
                },
                {
                    "file": "exercises.html",
                    "icon": "✍️",
                    "title": "Exercises"
                },
                {
                    "file": "quiz.html",
                    "icon": "❓",
                    "title": "Quiz"
                },
                {
                    "file": "glossary.html",
                    "icon": "📖",
                    "title": "Glossary"
                }
            ]
        },
        "laravel": {
            "name": "Laravel Framework",
            "shortName": "Laravel Track",
            "dir": "Learning Laravel",
            "syllabus": "learninglaravel.html",
            "bookDir": "book-laravel",
            "accent": "#ef4444",
            "modules": [
                {
                    "num": 1,
                    "title": "Introduction to Laravel",
                    "file": "module1.html"
                },
                {
                    "num": 2,
                    "title": "Routing",
                    "file": "module2.html"
                },
                {
                    "num": 3,
                    "title": "Controllers",
                    "file": "module3.html"
                },
                {
                    "num": 4,
                    "title": "Blade Templates",
                    "file": "module4.html"
                },
                {
                    "num": 5,
                    "title": "Eloquent ORM",
                    "file": "module5.html"
                },
                {
                    "num": 6,
                    "title": "Migrations",
                    "file": "module6.html"
                },
                {
                    "num": 7,
                    "title": "Forms & Validation",
                    "file": "module7.html"
                },
                {
                    "num": 8,
                    "title": "Authentication",
                    "file": "module8.html"
                }
            ],
            "extras": [
                {
                    "file": "quiz.html",
                    "icon": "❓",
                    "title": "Quiz"
                },
                {
                    "file": "glossary.html",
                    "icon": "📖",
                    "title": "Glossary"
                }
            ]
        },
        "python": {
            "name": "Python & Ethical AI",
            "shortName": "Python Track",
            "dir": "Learning Python",
            "syllabus": "learningpython.html",
            "bookDir": "book-python",
            "accent": "#10b981",
            "modules": [
                {
                    "num": 1,
                    "title": "Python Foundations & Variables",
                    "file": "module1.html"
                },
                {
                    "num": 2,
                    "title": "Decisions & Logic",
                    "file": "module2.html"
                },
                {
                    "num": 3,
                    "title": "Loops & Sequences",
                    "file": "module3.html"
                },
                {
                    "num": 4,
                    "title": "Collections & Records",
                    "file": "module4.html"
                },
                {
                    "num": 5,
                    "title": "Functions & Modularity",
                    "file": "module5.html"
                },
                {
                    "num": 6,
                    "title": "Files & Datasets",
                    "file": "module6.html"
                },
                {
                    "num": 7,
                    "title": "What is Machine Learning?",
                    "file": "module7.html"
                },
                {
                    "num": 8,
                    "title": "Supervised AI & Ethical Stewardship",
                    "file": "module8.html"
                }
            ],
            "extras": [
                {
                    "file": "playground.html",
                    "icon": "🧪",
                    "title": "Playground"
                },
                {
                    "file": "exercises.html",
                    "icon": "✍️",
                    "title": "Exercises"
                },
                {
                    "file": "quiz.html",
                    "icon": "❓",
                    "title": "Quiz"
                },
                {
                    "file": "glossary.html",
                    "icon": "📖",
                    "title": "Glossary"
                },
                {
                    "file": "best-practices.html",
                    "icon": "⭐",
                    "title": "Best Practices"
                }
            ]
        },
        "networks": {
            "name": "Networking & Web Protocols",
            "shortName": "Networks Track",
            "dir": "Learning Networks",
            "syllabus": "learningnetworks.html",
            "bookDir": "book-networks",
            "accent": "#0284c7",
            "modules": [
                {
                    "num": 1,
                    "title": "The Internet Highway & Packets",
                    "file": "module1.html"
                },
                {
                    "num": 2,
                    "title": "OSI & TCP/IP Layer Models",
                    "file": "module2.html"
                },
                {
                    "num": 3,
                    "title": "IP Addressing, CIDR & NAT",
                    "file": "module3.html"
                },
                {
                    "num": 4,
                    "title": "Transport Layer: TCP vs. UDP",
                    "file": "module4.html"
                },
                {
                    "num": 5,
                    "title": "DNS: The Global Phonebook",
                    "file": "module5.html"
                },
                {
                    "num": 6,
                    "title": "HTTP Deep Dive & Wire Format",
                    "file": "module6.html"
                },
                {
                    "num": 7,
                    "title": "HTTPS, TLS 1.3 & Amānah",
                    "file": "module7.html"
                },
                {
                    "num": 8,
                    "title": "WebSockets, REST & Diagnostics",
                    "file": "module8.html"
                }
            ],
            "extras": [
                {
                    "file": "playground.html",
                    "icon": "🧪",
                    "title": "Playground"
                },
                {
                    "file": "exercises.html",
                    "icon": "✍️",
                    "title": "Exercises"
                },
                {
                    "file": "quiz.html",
                    "icon": "❓",
                    "title": "Quiz"
                },
                {
                    "file": "glossary.html",
                    "icon": "📖",
                    "title": "Glossary"
                },
                {
                    "file": "best-practices.html",
                    "icon": "⭐",
                    "title": "Best Practices"
                }
            ]
        },
        "cybersecurity": {
            "name": "Cybersecurity & Hygiene",
            "shortName": "Security Track",
            "dir": "Learning Cybersecurity",
            "syllabus": "learningcybersecurity.html",
            "bookDir": "book-cybersecurity",
            "accent": "#059669",
            "modules": [
                {
                    "num": 1,
                    "title": "The Defender's Mindset & CIA Triad",
                    "file": "module1.html"
                },
                {
                    "num": 2,
                    "title": "Passwords, Entropy & MFA",
                    "file": "module2.html"
                },
                {
                    "num": 3,
                    "title": "Social Engineering & Phishing",
                    "file": "module3.html"
                },
                {
                    "num": 4,
                    "title": "Stopping XSS & Code Injection",
                    "file": "module4.html"
                },
                {
                    "num": 5,
                    "title": "Database Defense & SQLi",
                    "file": "module5.html"
                },
                {
                    "num": 6,
                    "title": "Broken Access Control & CSRF",
                    "file": "module6.html"
                },
                {
                    "num": 7,
                    "title": "Cryptography & Secure Channels",
                    "file": "module7.html"
                },
                {
                    "num": 8,
                    "title": "Hygiene, Backups & Forensics",
                    "file": "module8.html"
                }
            ],
            "extras": [
                {
                    "file": "playground.html",
                    "icon": "🧪",
                    "title": "Playground"
                },
                {
                    "file": "exercises.html",
                    "icon": "✍️",
                    "title": "Exercises"
                },
                {
                    "file": "quiz.html",
                    "icon": "❓",
                    "title": "Quiz"
                },
                {
                    "file": "glossary.html",
                    "icon": "📖",
                    "title": "Glossary"
                },
                {
                    "file": "best-practices.html",
                    "icon": "⭐",
                    "title": "Best Practices"
                }
            ]
        }
    };
    // CURRICULUM-END
    window.BEI_CURRICULUM = CURRICULUM;   // read-only view for pages (e.g. the home page's continue card)

    // ═════════════════════════════════════════════════════════════════
    // 2. ROOT PATH RESOLUTION
    // ═════════════════════════════════════════════════════════════════
    function computeRootPath() {
        if (document.currentScript && document.currentScript.src) {
            try { return new URL('../', document.currentScript.src).href; } catch (e) { /* fall through */ }
        }
        if (document.body && document.body.dataset.root) {
            return document.body.dataset.root;
        }
        const explicitNav = document.querySelector('.bei-nav, [data-root]');
        if (explicitNav && explicitNav.dataset && explicitNav.dataset.root) {
            return explicitNav.dataset.root;
        }

        // Auto-detect based on script tag source location
        const scripts = document.querySelectorAll('script[src*="bei-nav.js"]');
        if (scripts.length > 0) {
            const src = scripts[scripts.length - 1].getAttribute('src');
            const idx = src.indexOf('js/bei-nav.js');
            if (idx !== -1) {
                return src.substring(0, idx);
            }
        }

        // Fallback: analyze location.pathname depth
        const path = window.location.pathname.replace(/\\/g, '/');
        const segments = path.split('/').filter(Boolean);
        
        // Find if any known parent directory is present
        const knownDirs = ['Learning JS', 'Learning HTML', 'Learning CSS', 'Learning Python', 'studios', 'paths', 'library', 'learn', 'teacher-hub', 'projects', 'book-js', 'book-html', 'book-css', 'book-python'];
        for (let i = 0; i < segments.length; i++) {
            const seg = decodeURIComponent(segments[i]);
            if (knownDirs.some(k => k.toLowerCase() === seg.toLowerCase())) {
                const depth = segments.length - 1 - i;
                return depth === 1 ? '../' : depth === 2 ? '../../' : depth === 3 ? '../../../' : './';
            }
        }

        return './';
    }

    const ROOT = computeRootPath();

    // Site icons (favicon.svg, favicon.ico, apple-touch-icon.png from scripts/build-favicons.py), linked from the
    // site root worked out from this script's own address, so they work on Vercel and in a local subfolder.
    (function addSiteIcons() {
        if (document.querySelector('link[rel~="icon"]')) return;
        const me = document.currentScript && document.currentScript.src;
        const root = me ? me.replace(/js\/[^/]+\.js(\?.*)?$/, '') : '';
        [['icon', 'favicon.svg', 'image/svg+xml'], ['alternate icon', 'favicon.ico', 'image/x-icon'], ['apple-touch-icon', 'apple-touch-icon.png', '']]
            .forEach(([rel, file, type]) => {
                const link = document.createElement('link');
                link.rel = rel; link.href = root + file;
                if (type) link.type = type;
                document.head.appendChild(link);
            });
    })();

    // ═════════════════════════════════════════════════════════════════
    // 3. GLOBAL TOP NAVBAR RENDERER & ENHANCER
    // ═════════════════════════════════════════════════════════════════
    function renderGlobalNav() {
        let nav = document.querySelector('.bei-nav');
        if (!nav) {
            const placeholder = document.getElementById('bei-global-nav');
            if (placeholder) {
                nav = document.createElement('nav');
                nav.className = 'bei-nav';
                placeholder.parentNode.replaceChild(nav, placeholder);
            } else {
                // If body has no nav, inject at the top
                nav = document.createElement('nav');
                nav.className = 'bei-nav';
                document.body.insertBefore(nav, document.body.firstChild);
            }
        }

        // Determine current active section
        const path = window.location.pathname.replace(/\\/g, '/').toLowerCase();
        let activeKey = '';
        if (path.includes('practice-arena.html')) activeKey = 'arena';
        else if (path.includes('/studios/')) activeKey = 'studios';
        else if (path.includes('/books/') || path.includes('/book-')) activeKey = 'textbooks';
        else if (path.includes('/cheatsheet')) activeKey = 'cheatsheets';
        else if (path.includes('/projects/')) activeKey = 'projects';
        else if (path.includes('/paths/')) activeKey = 'paths';
        else if (path.includes('/teacher-hub/')) activeKey = 'teachers';
        else if (path.includes('/learn/') || path.includes('learning')) activeKey = 'learn';

        // Grouped menus (desktop: dropdown panels; phone drawer: sections that open on tap)
        const group = ({ learn: 'learn', studios: 'practice', arena: 'practice', projects: 'practice',
                         textbooks: 'library', cheatsheets: 'library' })[activeKey] || '';
        const item = (href, icon, label, sub) =>
            `<a class="bei-dd-item" href="${ROOT}${href}"><span class="bei-dd-ico" aria-hidden="true">${icon}</span>` +
            `<span><span class="bei-dd-label">${label}</span>${sub ? `<span class="bei-dd-sub">${sub}</span>` : ''}</span></a>`;
        const section = (title, items) => `<div class="bei-dd-section"><p class="bei-dd-title">${title}</p>${items.join('')}</div>`;
        const footer = (links) => `<div class="bei-dd-footer">${links.join('')}</div>`;
        const dropdown = (key, icon, label, body, active) => `
                    <li class="bei-dd" data-dd="${key}">
                        <button type="button" class="bei-nav-link bei-dd-btn ${active ? 'active' : ''}" aria-expanded="false" aria-controls="bei-dd-${key}">
                            <span class="nav-icon">${icon}</span><span>${label}</span><span class="bei-dd-caret" aria-hidden="true">▾</span>
                        </button>
                        <div class="bei-dd-menu bei-dd-${key}" id="bei-dd-${key}">${body}</div>
                    </li>`;

        const trackOrder = ['html', 'css', 'js', 'python', 'php', 'mysql', 'laravel', 'networks', 'cybersecurity'];
        const learnMenu =
            section('Subjects', trackOrder.filter(k => CURRICULUM[k]).map(k =>
                item(encodeURI(CURRICULUM[k].dir) + '/' + CURRICULUM[k].syllabus, TRACK_ICONS[k] || '📚',
                     CURRICULUM[k].shortName.replace(/ Track$/, ''), CURRICULUM[k].modules.length + ' lessons'))) +
            footer([item('learn/index.html', '🧭', 'All subjects', ''), item('paths/index.html', '🗺️', 'Learning paths', 'Week-by-week plans')]);
        const practiceMenu =
            section('Code studios', [
                item('studios/web-studio/index.html', '🌐', 'Web Studio', 'HTML, CSS, JavaScript'),
                item('studios/python-console/index.html', '🐍', 'Python Console', 'Run Python'),
                item('studios/php-console/index.html', '🐘', 'PHP Console', 'Run PHP 8.3'),
                item('studios/sql-sandbox/index.html', '🗄️', 'SQL Sandbox', 'School library database')]) +
            section('Labs and challenges', [
                item('Learning%20Cybersecurity/playground.html', '🛡️', 'Cyber Defense Studio', 'Security experiments'),
                item('Learning%20Networks/playground.html', '📡', 'Network Studio', 'See packets travel'),
                item('practice-arena.html', '⚔️', 'Practice Arena', 'Coding challenges'),
                item('projects/index.html', '🏆', 'Projects', '10 real project briefs')]) +
            footer([item('studios/index.html', '⚡', 'All studios', '')]);
        const libraryMenu =
            section('Read and look up', [
                item('library/books/index.html', '📖', 'Textbooks', '12 books that read aloud'),
                item('library/cheatsheets/index.html', '📋', 'Cheat sheets', 'Search all 11 at once')]) +
            footer([item('library/index.html', '🏛️', 'Library home', '')]);

        const navHtml = `
            <div class="container bei-nav-inner">
                <a href="${ROOT}index.html" class="bei-logo">
                    <div class="bei-logo-icon">💻</div>
                    <div class="bei-logo-text">
                        <span class="bei-brand-name">Junior Coders</span>
                        <span class="bei-logo-sub">School Computer Science</span>
                    </div>
                </a>

                <ul class="bei-nav-links">
                    <li><a href="${ROOT}paths/index.html" class="bei-nav-link ${activeKey === 'paths' ? 'active' : ''}"><span class="nav-icon">🗺️</span><span>Start here</span></a></li>
                    ${dropdown('learn', '📚', 'Learn', learnMenu, group === 'learn')}
                    ${dropdown('practice', '⚡', 'Practice', practiceMenu, group === 'practice')}
                    ${dropdown('library', '📖', 'Library', libraryMenu, group === 'library')}
                    <li><a href="${ROOT}teacher-hub/index.html" class="bei-nav-link ${activeKey === 'teachers' ? 'active' : ''}"><span class="nav-icon">🍎</span><span>Teachers</span></a></li>
                </ul>

                <div class="bei-nav-actions">
                    <button type="button" class="bei-search-btn" aria-label="Search the site" title="Search (Ctrl+K)">
                        <span class="bei-search-ico" aria-hidden="true">🔍</span><span class="bei-search-text">Search</span><kbd class="bei-search-kbd">Ctrl K</kbd>
                    </button>
                    <button class="theme-toggle-btn" aria-label="Toggle dark/light theme" title="Toggle theme">☀️</button>
                    <button class="mobile-toggle" aria-label="Toggle navigation menu" aria-expanded="false">☰</button>
                </div>
            </div>
        `;

        nav.innerHTML = navHtml;
        setupNavInteractions(nav);
    }

    // ═════════════════════════════════════════════════════════════════
    // 4. NAVBAR INTERACTION HANDLERS (Theme & Mobile Toggle)
    // ═════════════════════════════════════════════════════════════════
    function setupNavInteractions(nav) {
        // Theme Toggle Sync
        const currentTheme = localStorage.getItem('bei_theme') || document.documentElement.getAttribute('data-theme') || 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
        const themeBtn = nav.querySelector('.theme-toggle-btn');
        if (themeBtn) {
            themeBtn.innerHTML = currentTheme === 'dark' ? '☀️' : '🌙';
            themeBtn.onclick = () => {
                const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                const nextTheme = isDark ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', nextTheme);
                localStorage.setItem('bei_theme', nextTheme);
                themeBtn.innerHTML = nextTheme === 'dark' ? '☀️' : '🌙';
            };
        }

        // Grouped menus. Desktop: click (or hover with a mouse) opens a panel; Escape or a click outside closes it.
        // Phone drawer (≤1180px): the same buttons open the group as a section inside the drawer.
        const dds = Array.from(nav.querySelectorAll('.bei-dd'));
        const isDrawer = () => window.matchMedia('(max-width: 1180px)').matches;
        const setOpen = (dd, open) => {
            dd.classList.toggle('open', open);
            dd.querySelector('.bei-dd-btn').setAttribute('aria-expanded', open ? 'true' : 'false');
        };
        const closeAll = (except) => dds.forEach(d => { if (d !== except) setOpen(d, false); });
        dds.forEach(dd => {
            const btn = dd.querySelector('.bei-dd-btn');
            let hoverTimer = null;
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const open = !dd.classList.contains('open');
                if (!isDrawer()) closeAll(dd);
                setOpen(dd, open);
            });
            // Mouse users on a wide screen: open on hover, close shortly after leaving
            dd.addEventListener('mouseenter', () => {
                if (isDrawer() || !window.matchMedia('(hover: hover)').matches) return;
                clearTimeout(hoverTimer); closeAll(dd); setOpen(dd, true);
            });
            dd.addEventListener('mouseleave', () => {
                if (isDrawer() || !window.matchMedia('(hover: hover)').matches) return;
                hoverTimer = setTimeout(() => setOpen(dd, false), 180);
            });
            dd.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && dd.classList.contains('open')) { setOpen(dd, false); btn.focus(); }
            });
            // Leaving the panel with Tab closes it
            dd.addEventListener('focusout', (e) => {
                if (!isDrawer() && !dd.contains(e.relatedTarget)) setOpen(dd, false);
            });
        });
        document.addEventListener('click', (e) => { if (!isDrawer() && !nav.contains(e.target)) closeAll(); });
        window.addEventListener('pageshow', (e) => { if (e.persisted) closeAll(); });

        // Mobile Toggle & Responsive Drawer
        const toggle = nav.querySelector('.mobile-toggle');
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = nav.classList.toggle('mobile-active');
                toggle.classList.toggle('active', isOpen);
                toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
                toggle.innerHTML = isOpen ? '✕' : '☰';
            });

            // Close when clicking nav links
            nav.querySelectorAll('a.bei-nav-link, a.bei-dd-item').forEach(link => {
                link.addEventListener('click', () => {
                    nav.classList.remove('mobile-active');
                    toggle.classList.remove('active');
                    toggle.innerHTML = '☰';
                    toggle.setAttribute('aria-expanded', 'false');
                });
            });

            // Back button restores the page from memory with the drawer still open: close it
            window.addEventListener('pageshow', (e) => {
                if (!e.persisted) return;
                nav.classList.remove('mobile-active');
                toggle.classList.remove('active');
                toggle.innerHTML = '☰';
                toggle.setAttribute('aria-expanded', 'false');
            });

            // Close on click outside
            document.addEventListener('click', (e) => {
                if (!nav.contains(e.target)) {
                    nav.classList.remove('mobile-active');
                    toggle.classList.remove('active');
                    toggle.innerHTML = '☰';
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });

            // Close on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && nav.classList.contains('mobile-active')) {
                    nav.classList.remove('mobile-active');
                    toggle.classList.remove('active');
                    toggle.innerHTML = '☰';
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }

    // ═════════════════════════════════════════════════════════════════
    // 4.5 LOCAL PROGRESS (shared with js/core.js: key 'jc_user_state';
    //     completed modules are stored as "<Learning Dir>_<n>")
    // ═════════════════════════════════════════════════════════════════
    const Progress = {
        KEY: 'jc_user_state',
        load() {
            try { return Object.assign({ completedModules: [], completedChapters: [], totalXP: 0 }, JSON.parse(localStorage.getItem(this.KEY) || '{}')); }
            catch (e) { return { completedModules: [], completedChapters: [], totalXP: 0 }; }
        },
        save(state) {
            try {
                localStorage.setItem(this.KEY, JSON.stringify(state));
                localStorage.setItem('jc_completed_modules', JSON.stringify(state.completedModules || []));
                localStorage.setItem('jc_total_xp', String(state.totalXP || 0));
                if (state.lastModule) localStorage.setItem('jc_last_module', state.lastModule);
                if (state.lastModulePath) localStorage.setItem('jc_last_module_path', state.lastModulePath);
            } catch (e) { /* storage unavailable */ }
        },
        key(track, num) { return track.dir + '_' + num; },
        isDone(track, num) { return this.load().completedModules.includes(this.key(track, num)); },
        doneCount(track) { const c = this.load().completedModules; return track.modules.filter(m => c.includes(this.key(track, m.num))).length; },
        complete(track, num) {
            const state = this.load();
            const k = this.key(track, num);
            if (state.completedModules.includes(k)) return false;
            state.completedModules.push(k);
            state.totalXP = Math.max(state.totalXP || 0, state.completedModules.length * 100 + (state.completedChapters || []).length * 25);
            state.lastActiveDay = new Date().toISOString().split('T')[0];
            this.save(state);
            return true;
        },
        visit(track, num, file) {
            const state = this.load();
            state.lastModule = file;
            state.lastModulePath = window.location.pathname;
            this.save(state);
        },
        // Practice exercises (e.g. "mysql:join-loans"): first solve earns XP; later solves are free
        isExerciseDone(key) { return (this.load().completedExercises || []).includes(key); },
        completeExercise(key, xp) {
            const state = this.load();
            state.completedExercises = state.completedExercises || [];
            if (state.completedExercises.includes(key)) return false;
            state.completedExercises.push(key);
            state.totalXP = (state.totalXP || 0) + (xp || 25);
            state.lastActiveDay = new Date().toISOString().split('T')[0];
            this.save(state);
            return true;
        }
    };
    window.beiProgress = Progress;

    // ═════════════════════════════════════════════════════════════════
    // 5. IN-MODULE NAVIGATION: QUICK SWITCHER & BOTTOM PAGER
    // ═════════════════════════════════════════════════════════════════
    function detectTrackInfo() {
        const body = document.body;
        let trackKey = body ? body.dataset.track : null;
        let moduleNum = body ? parseInt(body.dataset.module, 10) : null;

        const path = window.location.pathname.replace(/\\/g, '/');
        const filename = path.split('/').pop().toLowerCase();

        // If not specified in body data attributes, infer from directory and filename
        if (!trackKey) {
            const decoded = decodeURIComponent(path).toLowerCase();
            for (const key of Object.keys(CURRICULUM)) {
                if (decoded.includes('/' + CURRICULUM[key].dir.toLowerCase() + '/')) { trackKey = key; break; }
            }
        }

        if (!moduleNum && filename.startsWith('module')) {
            const match = filename.match(/module(\d+)\.html/);
            if (match) moduleNum = parseInt(match[1], 10);
        }

        if (trackKey && CURRICULUM[trackKey]) {
            return {
                track: CURRICULUM[trackKey],
                trackKey,
                moduleNum: moduleNum || 1
            };
        }
        return null;
    }

    function setupModuleNavigation() {
        const info = detectTrackInfo();
        if (!info) return;

        const { track, trackKey, moduleNum } = info;
        const filename = window.location.pathname.split('/').pop().toLowerCase();
        if (!/^module\d+\.html$/.test(filename)) return;   // syllabus, playground, quiz... keep their own layout
        const currentMod = track.modules.find(m => m.num === moduleNum) || track.modules[0];
        const extrasHtml = (track.extras || []).map(x => `<a href="${x.file}" class="switcher-extra-link">${x.icon} ${x.title}</a>`).join('');
        Progress.visit(track, currentMod.num, currentMod.file);
        const doneCount = Progress.doneCount(track);
        const prevMod = track.modules.find(m => m.num === moduleNum - 1);
        const nextMod = track.modules.find(m => m.num === moduleNum + 1);

        // 5.1 Build Quick Module Switcher
        const switcherWrap = document.createElement('div');
        switcherWrap.className = 'bei-module-switcher';
        switcherWrap.id = 'beiModuleSwitcher';

        let listItemsHtml = '';
        track.modules.forEach(m => {
            const isActive = m.num === moduleNum;
            listItemsHtml += `
                <a href="${m.file}" class="switcher-module-item ${isActive ? 'active' : ''} ${Progress.isDone(track, m.num) ? 'done' : ''}">
                    <span class="switcher-mod-number">${Progress.isDone(track, m.num) ? '✓' : m.num}</span>
                    <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${m.title}</span>
                    ${isActive ? '<span style="color: #818cf8; font-size: 0.75rem;">●</span>' : ''}
                </a>
            `;
        });

        switcherWrap.innerHTML = `
            <button class="bei-module-switcher-btn" id="moduleSwitcherToggle" aria-haspopup="true" aria-expanded="false" title="Switch lesson module">
                <span class="switcher-badge">${track.shortName}</span>
                <span>Mod ${currentMod.num}: ${currentMod.title.split('&')[0].trim()}</span>
                <span class="switcher-arrow">▾</span>
            </button>
            <div class="bei-module-switcher-menu" id="moduleSwitcherMenu">
                <div class="switcher-menu-header">
                    <span>${track.name} · <span id="beiDoneCount">${doneCount}</span> of ${track.modules.length} done</span>
                    <a href="${track.syllabus}">All Modules ↗</a>
                </div>
                <div class="switcher-list">
                    ${listItemsHtml}
                </div>
                ${extrasHtml ? `<div class="switcher-extras">${extrasHtml}</div>` : ''}
            </div>
        `;

        // Switcher click interaction
        const switcherBtn = switcherWrap.querySelector('#moduleSwitcherToggle');
        switcherBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = switcherWrap.classList.toggle('open');
            switcherBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        const closeSwitcher = () => {
            switcherWrap.classList.remove('open');
            switcherBtn.setAttribute('aria-expanded', 'false');
        };
        document.addEventListener('click', (e) => {
            if (!switcherWrap.contains(e.target)) closeSwitcher();
        });
        // Picking a module closes the list straight away (it used to stay open while the next page loaded)
        switcherWrap.addEventListener('click', (e) => { if (e.target.closest('a[href]')) closeSwitcher(); });
        // Back button: phones restore the previous page from memory, menus and all; show it closed
        window.addEventListener('pageshow', (e) => { if (e.persisted) closeSwitcher(); });

        // 5.2 Build Breadcrumb Header Bar
        const topBar = document.createElement('div');
        topBar.className = 'bei-module-nav-bar-top';
        topBar.innerHTML = `
            <div class="bei-track-breadcrumb">
                <a href="${ROOT}index.html"><span>🏠</span> Home</a>
                <span class="breadcrumb-separator">/</span>
                <a href="${track.syllabus}">${track.shortName}</a>
                <span class="breadcrumb-separator">/</span>
                <span class="current-module">Module ${currentMod.num}: ${currentMod.title}</span>
            </div>
        `;
        topBar.appendChild(switcherWrap);

        // Insert at the top of main or module-container
        const main = document.querySelector('main.module-container, main');
        if (main) {
            // Replace any existing lone breadcrumb link
            const oldBreadcrumb = main.querySelector('div[style*="margin-bottom: 1.5rem"] a[href*="learning"], .breadcrumbs');
            if (oldBreadcrumb && oldBreadcrumb.parentElement) {
                oldBreadcrumb.parentElement.replaceWith(topBar);
            } else {
                main.insertBefore(topBar, main.firstChild);
            }
        }

        // 5.3 Build Bottom Lesson Pager Bar
        const pager = document.createElement('nav');
        pager.className = 'bei-lesson-pager';
        pager.setAttribute('aria-label', 'Module lesson pagination');

        const prevHtml = prevMod ? `
            <a href="${prevMod.file}" class="pager-card prev">
                <span class="pager-card-dir">← Previous Module</span>
                <span class="pager-card-title">Module ${prevMod.num}: ${prevMod.title}</span>
            </a>
        ` : `
            <a href="${track.syllabus}" class="pager-card prev" style="opacity: 0.85;">
                <span class="pager-card-dir">← Course Syllabus</span>
                <span class="pager-card-title">${track.name} Overview</span>
            </a>
        `;

        const nextHtml = nextMod ? `
            <a href="${nextMod.file}" class="pager-card next">
                <span class="pager-card-dir">Next Module →</span>
                <span class="pager-card-title">Module ${nextMod.num}: ${nextMod.title}</span>
            </a>
        ` : `
            <a href="${track.syllabus}#cert" class="pager-card next" style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(19, 29, 50, 0.9) 100%); border-color: rgba(16, 185, 129, 0.4);">
                <span class="pager-card-dir" style="color: #34d399;">Track Complete 🎓</span>
                <span class="pager-card-title">Claim Track Certificate →</span>
            </a>
        `;

        const companionBookUrl = `${ROOT}${track.bookDir}/index.html`;
        const alreadyDone = Progress.isDone(track, currentMod.num);
        const completeHtml = `<button type="button" class="pager-btn-link pager-complete${alreadyDone ? ' done' : ''}" id="beiCompleteBtn" data-track="${trackKey}" data-num="${currentMod.num}" title="Record this module as finished on this device"><span>✓</span> <span>${alreadyDone ? 'Completed' : 'Mark complete'}</span></button>`;

        pager.innerHTML = `
            <div class="pager-col prev">${prevHtml}</div>
            <div class="pager-col center">
                <a href="${track.syllabus}" class="pager-btn-link" title="View all modules in ${track.name}">
                    <span>📚</span> <span>All Modules</span>
                </a>
                <a href="${companionBookUrl}" target="_blank" class="pager-btn-link" title="Open companion textbook in reader">
                    <span>📖</span> <span>Book Companion ↗</span>
                </a>
                ${completeHtml}
            </div>
            <div class="pager-col next">${nextHtml}</div>
        `;

        // Replace any existing module nav footer or append to main
        const existingFooter = document.querySelector('.module-nav-bar, .bei-lesson-pager');
        if (existingFooter) {
            existingFooter.replaceWith(pager);
        } else if (main) {
            main.appendChild(pager);
        }

        const completeBtn = pager.querySelector('#beiCompleteBtn');
        completeBtn.addEventListener('click', () => {
            const isNew = Progress.complete(track, currentMod.num);
            completeBtn.classList.add('done');
            completeBtn.querySelector('span:last-child').textContent = 'Completed';
            const counter = document.getElementById('beiDoneCount');
            if (counter) counter.textContent = Progress.doneCount(track);
            const item = document.querySelector(`.switcher-module-item.active`);
            if (item) { item.classList.add('done'); item.querySelector('.switcher-mod-number').textContent = '✓'; }
            if (typeof window.showToast === 'function') window.showToast(isNew ? `Module ${currentMod.num} completed! 🎉` : 'Module already completed!');
        });
    }

    window.beiMarkComplete = (trackKey, num) => { const t = CURRICULUM[trackKey]; return t ? Progress.complete(t, num) : false; };

    // ═════════════════════════════════════════════════════════════════
    // 6. INITIALIZATION ON DOM READY
    // ═════════════════════════════════════════════════════════════════
    // ═════════════════════════════════════════════════════════════════
    // 5.5 PHONE TAB BAR (fixed at the bottom; "Menu" opens the drawer)
    // ═════════════════════════════════════════════════════════════════
    function renderTabBar() {
        if (document.querySelector('.bei-tab-bar')) return;
        const path = decodeURIComponent(window.location.pathname).toLowerCase();
        let rootPath = '';
        try { rootPath = new URL(ROOT, window.location.href).pathname.toLowerCase(); } catch (e) { /* ignore */ }
        const isHome = path === rootPath || path === rootPath + 'index.html';
        const active = isHome ? 'home'
            : (path.includes('/learn/') || path.includes('/learning ') || path.includes('/paths/')) ? 'learn'
            : (path.includes('/studios/') || path.includes('playground')) ? 'studios'
            : (path.includes('/library/') || path.includes('/book') || path.includes('cheatsheet')) ? 'books' : '';
        const tab = (key, href, icon, label) => `<a href="${ROOT}${href}" class="bei-tab-item${active === key ? ' active' : ''}"${active === key ? ' aria-current="page"' : ''}><span class="bei-tab-icon" aria-hidden="true">${icon}</span><span>${label}</span></a>`;
        const bar = document.createElement('nav');
        bar.className = 'bei-tab-bar';
        bar.setAttribute('aria-label', 'Quick navigation');
        bar.innerHTML = tab('home', 'index.html', '🏠', 'Home') + tab('learn', 'learn/index.html', '📚', 'Learn')
            + tab('studios', 'studios/index.html', '⚡', 'Studios') + tab('books', 'library/books/index.html', '📖', 'Books')
            + `<button type="button" class="bei-tab-item bei-tab-menu" aria-label="Open menu"><span class="bei-tab-icon" aria-hidden="true">☰</span><span>Menu</span></button>`;
        document.body.appendChild(bar);
        bar.querySelector('.bei-tab-menu').addEventListener('click', (e) => {
            e.stopPropagation();
            const toggle = document.querySelector('.bei-nav .mobile-toggle');
            if (toggle) { window.scrollTo({ top: 0, behavior: 'smooth' }); toggle.click(); }
        });
    }

    // ═════════════════════════════════════════════════════════════════
    // 5.6 SITE SEARCH (Ctrl+K or "/"): tracks, modules, practice pages,
    //     textbooks, cheatsheets, studios and hub pages
    // ═════════════════════════════════════════════════════════════════
    const SEARCH_PAGES = [
        // BOOKS-SEARCH:START generated by scripts/build-books.js
        ['book-cmd/index.html', '📖', "Terminal & Command Prompt (textbook)", 'Textbook', "cmd terminal powershell bash shell"],
        ['book-html/index.html', '📖', "HTML: Structure the Web (textbook)", 'Textbook', "html website tags"],
        ['book-css/index.html', '📖', "CSS: Styling & Layouts (textbook)", 'Textbook', "css style design layout"],
        ['book-git/index.html', '📖', "Git & GitHub (textbook)", 'Textbook', "git github commit branch"],
        ['book-js/index.html', '📖', "JavaScript: Learn, Think, Create (textbook)", 'Textbook', "javascript js"],
        ['book-php/index.html', '📖', "PHP: Server Scripting (textbook)", 'Textbook', "php server forms"],
        ['book-mysql/index.html', '📖', "MySQL: Databases (textbook)", 'Textbook', "mysql sql database"],
        ['book-laravel/index.html', '📖', "Laravel: PHP Framework (textbook)", 'Textbook', "laravel framework mvc"],
        ['book-python/index.html', '📖', "Python & Machine Learning (textbook)", 'Textbook', "python ml ai"],
        ['book-networks/index.html', '📖', "Networks & Web Protocols (textbook)", 'Textbook', "network internet dns http tcp"],
        ['book-cybersecurity/index.html', '📖', "Cybersecurity & Digital Safety (textbook)", 'Textbook', "security password phishing"],
        ['book-android/index.html', '📖', "Android Apps with Kotlin (textbook)", 'Textbook', "android app kotlin compose mobile phone"],
        // BOOKS-SEARCH:END
        ['cheatsheet-html.html', '📋', 'HTML Cheat Sheet', 'Cheat sheet', 'html'],
        ['cheatsheet-css.html', '📋', 'CSS Cheat Sheet', 'Cheat sheet', 'css'],
        ['cheatsheet-js.html', '📋', 'JavaScript Cheat Sheet', 'Cheat sheet', 'javascript js'],
        ['cheatsheet-cmd.html', '📋', 'Command Line & Terminal Cheat Sheet', 'Cheat sheet', 'cmd terminal'],
        ['cheatsheet-git.html', '📋', 'Git & GitHub Cheat Sheet', 'Cheat sheet', 'git'],
        ['cheatsheet-php.html', '📋', 'PHP Cheat Sheet', 'Cheat sheet', 'php'],
        ['cheatsheet-mysql.html', '📋', 'MySQL Cheat Sheet', 'Cheat sheet', 'mysql sql'],
        ['cheatsheet-laravel.html', '📋', 'Laravel Cheat Sheet', 'Cheat sheet', 'laravel'],
        ['cheatsheet-python.html', '📋', 'Python & Machine Learning Cheat Sheet', 'Cheat sheet', 'python'],
        ['cheatsheet-networks.html', '📋', 'Networking & Web Protocols Cheat Sheet', 'Cheat sheet', 'network'],
        ['cheatsheet-cybersecurity.html', '📋', 'Cybersecurity & Digital Hygiene Cheat Sheet', 'Cheat sheet', 'security'],
        ['studios/web-studio/index.html', '⚡', 'Web Studio (HTML, CSS & JS Lab)', 'Studio', 'playground ide code'],
        ['studios/sql-sandbox/index.html', '🗄️', 'SQL Sandbox', 'Studio', 'mysql database query'],
        ['studios/python-console/index.html', '🐍', 'Python Console', 'Studio', 'python run'],
        ['practice-arena.html', '⚔️', 'Practice Arena', 'Practice', 'challenges exercises xp'],
        ['learn/index.html', '📚', 'Learn: Curriculum & Pathways', 'Page', 'courses tracks'],
        ['paths/index.html', '🗺️', 'Start here: pick your path', 'Page', 'start begin pathways beginner web developer full stack'],
        ['library/books/index.html', '📖', 'All Textbooks', 'Page', 'books library'],
        ['library/cheatsheets/index.html', '📋', 'All Cheat Sheets', 'Page', 'reference'],
        ['projects/index.html', '🏆', 'Graded Project Catalog', 'Page', 'projects capstone'],
        ['teacher-hub/index.html', '🍎', 'Teacher Hub & Educator Resources', 'Page', 'teachers lesson plans rubrics'],
        ['ai-roadmap.html', '🤖', 'AI Roadmap', 'Page', 'ai machine learning'],
        ['getting-started.html', '🚀', 'Getting Started', 'Page', 'start setup']
    ];
    const TRACK_ICONS = { html: '🌐', css: '🎨', js: '⚡', php: '🐘', mysql: '🗄️', laravel: '🔥', python: '🐍', networks: '🌍', cybersecurity: '🛡️' };

    function buildSearchIndex() {
        const items = [];
        Object.keys(CURRICULUM).forEach(key => {
            const t = CURRICULUM[key], icon = TRACK_ICONS[key] || '📚', dir = encodeURI(t.dir) + '/';
            items.push({ url: ROOT + dir + t.syllabus, icon, label: t.name + ': all modules', sub: 'Course', keys: key + ' ' + t.dir });
            t.modules.forEach(m => items.push({ url: ROOT + dir + m.file, icon, label: 'Module ' + m.num + ': ' + m.title, sub: t.shortName, keys: key + ' ' + t.dir }));
            (t.extras || []).forEach(x => items.push({ url: ROOT + dir + x.file, icon: x.icon, label: t.shortName + ' ' + x.title, sub: t.shortName, keys: key + ' ' + t.dir + ' practice' }));
        });
        SEARCH_PAGES.forEach(([href, icon, label, sub, keys]) => items.push({ url: ROOT + href, icon, label, sub, keys }));
        items.forEach(i => { i.hay = (i.label + ' ' + i.sub + ' ' + (i.keys || '')).toLowerCase(); i.lab = i.label.toLowerCase(); });
        return items;
    }

    function renderSearch() {
        if (document.getElementById('beiSearch')) return;
        const overlay = document.createElement('div');
        overlay.className = 'bei-search-overlay';
        overlay.id = 'beiSearch';
        overlay.hidden = true;
        overlay.innerHTML = `
            <div class="bei-search-panel" role="dialog" aria-modal="true" aria-label="Search the site">
                <div class="bei-search-row">
                    <span aria-hidden="true">🔍</span>
                    <input type="search" id="beiSearchInput" class="bei-search-input" placeholder="Search lessons, textbooks, cheat sheets..." autocomplete="off" spellcheck="false">
                    <button type="button" class="bei-search-close" aria-label="Close search">✕</button>
                </div>
                <div class="bei-search-results" id="beiSearchResults" role="listbox"></div>
                <div class="bei-search-foot">↑ ↓ to move · Enter to open · Esc to close</div>
            </div>`;
        document.body.appendChild(overlay);

        const input = overlay.querySelector('#beiSearchInput');
        const results = overlay.querySelector('#beiSearchResults');
        let index = null, selected = -1;
        const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;');

        const open = () => { overlay.hidden = false; document.body.classList.add('bei-search-open'); input.value = ''; render(''); setTimeout(() => input.focus(), 30); };
        const close = () => { overlay.hidden = true; document.body.classList.remove('bei-search-open'); };

        const render = (q) => {
            if (!index) index = buildSearchIndex();
            const term = q.trim().toLowerCase();
            selected = -1;
            if (!term) {
                results.innerHTML = '<div class="bei-search-hint">Try "loops", "forms", "sql", "git" or a module number.</div>';
                return;
            }
            const words = term.split(/\s+/);
            const hits = index
                .map(i => { let sc = 0; for (const w of words) { if (!i.hay.includes(w)) return null; sc += i.lab.startsWith(w) ? 3 : i.lab.includes(w) ? 2 : 1; } return { i, sc }; })
                .filter(Boolean).sort((a, b) => b.sc - a.sc).slice(0, 10);
            results.innerHTML = hits.length
                ? hits.map((h, n) => `<a href="${h.i.url}" class="bei-search-item" role="option" data-n="${n}"><span class="bei-search-item-ico">${h.i.icon}</span><span class="bei-search-item-label">${esc(h.i.label)}</span><span class="bei-search-item-sub">${esc(h.i.sub)}</span></a>`).join('')
                : '<div class="bei-search-hint">No results. Try another word.</div>';
        };
        const move = (d) => {
            const items = results.querySelectorAll('.bei-search-item');
            if (!items.length) return;
            selected = (selected + d + items.length) % items.length;
            items.forEach((el, n) => el.classList.toggle('selected', n === selected));
            items[selected].scrollIntoView({ block: 'nearest' });
        };

        input.addEventListener('input', () => render(input.value));
        input.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
            else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
            else if (e.key === 'Enter') { const el = results.querySelector('.bei-search-item.selected') || results.querySelector('.bei-search-item'); if (el) { e.preventDefault(); el.click(); } }
        });
        overlay.querySelector('.bei-search-close').addEventListener('click', close);
        overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
        document.querySelectorAll('.bei-search-btn').forEach(b => b.addEventListener('click', (e) => { e.stopPropagation(); open(); }));
        document.addEventListener('keydown', (e) => {
            if (!overlay.hidden && e.key === 'Escape') { close(); return; }
            const tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
            const typing = tag === 'input' || tag === 'textarea' || tag === 'select' || (document.activeElement && document.activeElement.isContentEditable);
            if (((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') || (!typing && e.key === '/')) { e.preventDefault(); open(); }
        });
        if (/Mac|iPhone|iPad/.test(navigator.platform)) document.querySelectorAll('.bei-search-kbd').forEach(k => k.textContent = '⌘ K');
    }

    function init() {
        renderGlobalNav();
        setupModuleNavigation();
        renderTabBar();
        renderSearch();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
