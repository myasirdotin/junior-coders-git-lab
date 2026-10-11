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
            "extras": []
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
            "extras": []
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
            "extras": []
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
                    <li><a href="${ROOT}learn/index.html" class="bei-nav-link ${activeKey === 'learn' ? 'active' : ''}"><span class="nav-icon">📚</span><span>Learn</span></a></li>
                    <li><a href="${ROOT}practice-arena.html" class="bei-nav-link ${activeKey === 'arena' ? 'active' : ''}"><span class="nav-icon">⚔️</span><span>Arena</span></a></li>
                    <li><a href="${ROOT}studios/index.html" class="bei-nav-link ${activeKey === 'studios' ? 'active' : ''}"><span class="nav-icon">⚡</span><span>Studios</span></a></li>
                    <li><a href="${ROOT}library/books/index.html" class="bei-nav-link ${activeKey === 'textbooks' ? 'active' : ''}"><span class="nav-icon">📖</span><span>Textbooks</span></a></li>
                    <li><a href="${ROOT}library/cheatsheets/index.html" class="bei-nav-link ${activeKey === 'cheatsheets' ? 'active' : ''}"><span class="nav-icon">📋</span><span>Cheatsheets</span></a></li>
                    <li><a href="${ROOT}projects/index.html" class="bei-nav-link ${activeKey === 'projects' ? 'active' : ''}"><span class="nav-icon">🏆</span><span>Projects</span></a></li>
                    <li><a href="${ROOT}paths/index.html" class="bei-nav-link ${activeKey === 'paths' ? 'active' : ''}"><span class="nav-icon">🗺️</span><span>Pathways</span></a></li>
                    <li><a href="${ROOT}teacher-hub/index.html" class="bei-nav-link ${activeKey === 'teachers' ? 'active' : ''}"><span class="nav-icon">🍎</span><span>Teachers</span></a></li>
                </ul>

                <div class="bei-nav-actions">
                    <button class="theme-toggle-btn" aria-label="Toggle dark/light theme" title="Toggle theme">☀️</button>
                    <a href="${ROOT}studios/web-studio/index.html" class="btn-nav-primary">Launch Studio ⚡</a>
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
            nav.querySelectorAll('.bei-nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    nav.classList.remove('mobile-active');
                    toggle.classList.remove('active');
                    toggle.innerHTML = '☰';
                    toggle.setAttribute('aria-expanded', 'false');
                });
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
                <a href="${m.file}" class="switcher-module-item ${isActive ? 'active' : ''}">
                    <span class="switcher-mod-number">${m.num}</span>
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
                    <span>${track.name} (1 to ${track.modules.length})</span>
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

        document.addEventListener('click', (e) => {
            if (!switcherWrap.contains(e.target)) {
                switcherWrap.classList.remove('open');
                switcherBtn.setAttribute('aria-expanded', 'false');
            }
        });

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
        const completeHtml = (typeof window.markComplete === 'function')
            ? `<button type="button" class="pager-btn-link pager-complete" onclick="window.markComplete('${currentMod.num}')" title="Record this module as finished (local progress + XP)"><span>✓</span> <span>Mark complete</span></button>`
            : '';

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
    }

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

    function init() {
        renderGlobalNav();
        setupModuleNavigation();
        renderTabBar();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
