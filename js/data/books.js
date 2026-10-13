// THE LIST OF TEXTBOOKS: the one place where book information is written.
//
// Edit a book here, then run `node scripts/bundle-books.js`. It rebuilds from this list and the chapter files:
//   - each book's page (book-KEY/index.html) and its offline chapter bundle
//   - the cards and chapter counts on the Textbooks page (library/books/index.html)
//   - the textbook line on the Library page, the textbook entries in the site search (js/bei-nav.js)
//   - the "11 Textbooks" numbers on the hub pages
// `node scripts/check-books.js` reports anything that is out of date.
//
// Fields: key (folder book-KEY), stage (Textbooks page group: first | web | python), title, short (phone bar),
// grades, subtitle, icon (inside the book), cardIcon (Textbooks page, optional), color/colorDark/colorSoft, links (top link row), parts (folder: [title, filter group]),
// groups (filter buttons), extras (files that are not chNN chapters: projects, reference, teacher guide),
// oldKeys (old #links mapped to new chapter keys), practice (end-of-chapter "Practise this chapter" box, or null), scratchpad (JS book), moreTitle,
// card (Textbooks page text), metaDescription (search engines), lessonsFolder (its Learning track, if any),
// search (extra words for the site search).
window.JC_BOOKS = [
  {
    "key": "cmd",
    "cardIcon": "⌨️",
    "stage": "first",
    "title": "Terminal & Command Prompt",
    "short": "Terminal",
    "subtitle": "Work without a mouse",
    "icon": ">_",
    "color": "#059669",
    "colorDark": "#047857",
    "colorSoft": "#ecfdf5",
    "links": [
      {
        "href": "../cheatsheet-cmd.html",
        "label": "📋 Cheat sheet"
      },
      {
        "href": "../paths/beginner/index.html",
        "label": "🗺️ Beginner path"
      }
    ],
    "parts": {
      "part-01-foundations": [
        "Foundations & Orientation",
        "foundations"
      ],
      "part-02-navigation-mastery": [
        "Spatial Navigation Mastery",
        "nav"
      ],
      "part-03-managing-files-and-folders": [
        "Managing Files & Folders",
        "files"
      ],
      "part-04-the-web-developer-workflow": [
        "Web Developer Workflow",
        "workflow"
      ],
      "part-05-capstone-challenges": [
        "Capstone Challenges",
        "capstones"
      ]
    },
    "groups": {
      "foundations": "Foundations",
      "nav": "Navigation",
      "files": "Files",
      "workflow": "Workflow",
      "capstones": "Capstones"
    },
    "extras": [],
    "practice": null,
    "grades": "Grades 6–7",
    "card": "Move around your computer by typing commands. Make folders and files without a mouse.",
    "metaDescription": "The Junior Coders Terminal textbook for Grades 6–7: moving between folders, making and moving files safely, and developer workflows in CMD and PowerShell.",
    "lessonsFolder": null,
    "search": "cmd terminal powershell bash shell"
  },
  {
    "key": "html",
    "stage": "first",
    "title": "HTML: Structure the Web",
    "short": "HTML",
    "subtitle": "Build real web pages",
    "icon": "🌐",
    "color": "#ea580c",
    "colorDark": "#c2410c",
    "colorSoft": "#fff7ed",
    "links": [
      {
        "href": "../Learning%20HTML/learninghtml.html",
        "label": "📚 HTML lessons"
      },
      {
        "href": "../cheatsheet-html.html",
        "label": "📋 Cheat sheet"
      }
    ],
    "parts": {
      "part-01-getting-started": [
        "Getting Started",
        "starter"
      ],
      "part-02-headings-and-text": [
        "Headings & Text",
        "starter"
      ],
      "part-03-links-and-images": [
        "Links & Media",
        "tags"
      ],
      "part-04-lists-and-tables": [
        "Lists & Tables",
        "tags"
      ],
      "part-05-forms-and-input": [
        "Forms & User Input",
        "tags"
      ],
      "part-06-layout-and-semantics": [
        "Layout & Semantics",
        "tags"
      ],
      "part-07-website-projects": [
        "Website Projects",
        "projects"
      ],
      "part-08-capstone-project": [
        "Final Capstone",
        "projects"
      ]
    },
    "groups": {
      "starter": "Basics",
      "tags": "Content",
      "projects": "Projects"
    },
    "extras": [
      {
        "file": "reference/quick-reference-and-glossary.md",
        "key": "ref",
        "label": "Quick Reference & Glossary"
      },
      {
        "file": "teacher-guide/teachers-guide-and-rubrics.md",
        "key": "teacher",
        "label": "Teacher's Guide & Rubrics"
      }
    ],
    "practice": {
      "href": "../studios/web-studio/index.html",
      "label": "Open the Web Studio",
      "icon": "🌐",
      "text": "Type this chapter’s examples in the Web Studio and watch the page change."
    },
    "grades": "Grades 6–7",
    "card": "Build web pages with headings, links, images, tables and forms. Ends with five small projects.",
    "metaDescription": "The Junior Coders HTML textbook for Grades 6–7: headings, links, images, lists, tables, forms and semantic page layout, with five website projects.",
    "lessonsFolder": "Learning HTML",
    "search": "html website tags"
  },
  {
    "key": "css",
    "stage": "first",
    "title": "CSS: Styling & Layouts",
    "short": "CSS",
    "subtitle": "Colours, layout and phones",
    "icon": "🎨",
    "color": "#7c3aed",
    "colorDark": "#6d28d9",
    "colorSoft": "#f5f3ff",
    "links": [
      {
        "href": "../Learning%20CSS/learningcss.html",
        "label": "📚 CSS lessons"
      },
      {
        "href": "../cheatsheet-css.html",
        "label": "📋 Cheat sheet"
      }
    ],
    "parts": {
      "part-01-getting-started": [
        "Getting Started",
        "basics"
      ],
      "part-02-colors-and-typography": [
        "Colors & Typography",
        "basics"
      ],
      "part-03-box-model-and-borders": [
        "Box Model & Borders",
        "basics"
      ],
      "part-04-layout-and-flexbox": [
        "Layout & Flexbox",
        "layout"
      ],
      "part-05-grid-and-positioning": [
        "Grid & Positioning",
        "layout"
      ],
      "part-06-responsive-design": [
        "Responsive Design",
        "layout"
      ],
      "part-07-ui-components-and-cards": [
        "UI Components & Cards",
        "ui"
      ],
      "part-08-animations-and-transitions": [
        "Animations & Transitions",
        "ui"
      ],
      "part-09-website-projects": [
        "Website Projects",
        "projects"
      ],
      "part-10-capstone-project": [
        "Capstone Project",
        "projects"
      ]
    },
    "groups": {
      "basics": "Basics",
      "layout": "Layout",
      "ui": "UI & FX",
      "projects": "Projects"
    },
    "extras": [
      {
        "file": "reference/quick-reference-and-glossary.md",
        "key": "ref",
        "label": "Quick Reference & Glossary"
      },
      {
        "file": "teacher-guide/teachers-guide-and-rubrics.md",
        "key": "teacher",
        "label": "Teacher's Guide & Rubrics"
      }
    ],
    "practice": {
      "href": "../studios/web-studio/index.html",
      "label": "Open the Web Studio",
      "icon": "🎨",
      "text": "Add this chapter’s CSS in the Web Studio’s style.css tab and see it live."
    },
    "grades": "Grade 7",
    "card": "Add colours, fonts and spacing. Line things up with Flexbox and Grid, and make pages fit phones.",
    "metaDescription": "The Junior Coders CSS textbook for Grade 7: colours, fonts, the box model, Flexbox, Grid, responsive design and website projects.",
    "lessonsFolder": "Learning CSS",
    "search": "css style design layout"
  },
  {
    "key": "git",
    "stage": "first",
    "title": "Git & GitHub",
    "short": "Git & GitHub",
    "subtitle": "Save versions, work as a team",
    "icon": "🗂️",
    "color": "#f05032",
    "colorDark": "#c2410c",
    "colorSoft": "#fff7ed",
    "links": [
      {
        "href": "../cheatsheet-git.html",
        "label": "📋 Cheat sheet"
      },
      {
        "href": "../book-cmd/index.html",
        "label": "⌨️ Terminal book"
      }
    ],
    "parts": {
      "part-01-introduction": [
        "Foundations of Version Control",
        "basics"
      ],
      "part-02-essential-workflow": [
        "Essential Day-to-Day Workflow",
        "workflow"
      ],
      "part-03-undoing-and-stashing": [
        "Time Travel & Safety Nets",
        "undoing"
      ],
      "part-04-branching-and-merging": [
        "Branching & Merging",
        "branching"
      ],
      "part-05-github-and-remotes": [
        "GitHub & Remote Repositories",
        "github"
      ],
      "part-06-collaboration-and-pages": [
        "Collaboration & Publishing",
        "collab"
      ],
      "part-07-capstone-projects": [
        "Capstone Projects",
        "collab"
      ]
    },
    "groups": {
      "basics": "Basics",
      "workflow": "Workflow",
      "undoing": "Safety",
      "branching": "Branching",
      "github": "GitHub",
      "collab": "Collab"
    },
    "extras": [
      {
        "file": "reference/git-cheatsheet.md",
        "key": "ref",
        "label": "Git Command Cheatsheet"
      },
      {
        "file": "part-07-capstone-projects/proj01-solo-portfolio-repo.md",
        "key": "proj1",
        "label": "Project 1: Portfolio Repository"
      },
      {
        "file": "part-07-capstone-projects/proj02-team-collaboration-lab.md",
        "key": "proj2",
        "label": "Project 2: Team Collaboration Lab"
      }
    ],
    "practice": null,
    "grades": "Grades 7–8",
    "card": "Save versions of your work, try ideas on branches, and share projects on GitHub.",
    "metaDescription": "The Junior Coders Git and GitHub textbook for Grades 7–8: commits, history, undoing safely, branches, merging, GitHub and Pages.",
    "lessonsFolder": null,
    "search": "git github commit branch"
  },
  {
    "key": "js",
    "cardIcon": "⚡",
    "stage": "web",
    "title": "JavaScript: Learn, Think, Create",
    "short": "JavaScript",
    "subtitle": "Logic, functions and the DOM",
    "icon": "JS",
    "color": "#d97706",
    "colorDark": "#b45309",
    "colorSoft": "#fffbeb",
    "links": [
      {
        "href": "../Learning%20JS/learningjs.html",
        "label": "📚 JavaScript lessons"
      },
      {
        "href": "../cheatsheet-js.html",
        "label": "📋 Cheat sheet"
      },
      {
        "href": "../studios/web-studio/index.html",
        "label": "🌐 Web Studio"
      }
    ],
    "parts": {
      "part-01-getting-started": [
        "Getting Started",
        "basics"
      ],
      "part-02-variables-and-data": [
        "Variables and Data",
        "basics"
      ],
      "part-03-making-decisions": [
        "Making Decisions",
        "logic"
      ],
      "part-04-repetition-and-logic": [
        "Repetition and Logic",
        "logic"
      ],
      "part-05-functions": [
        "Functions",
        "data"
      ],
      "part-06-arrays-and-data": [
        "Arrays and Data",
        "data"
      ],
      "part-07-strings-and-text": [
        "Strings and Text",
        "data"
      ],
      "part-08-objects": [
        "Objects",
        "data"
      ],
      "part-09-user-input": [
        "User Input & Interaction",
        "web"
      ],
      "part-10-dom-and-web": [
        "DOM & Web Interaction",
        "web"
      ],
      "part-11-think-like-a-programmer": [
        "Think Like a Programmer",
        "skills"
      ],
      "part-12-debugging": [
        "Debugging",
        "skills"
      ],
      "part-13-mathematics": [
        "Maths in JavaScript",
        "skills"
      ],
      "part-14-mini-projects": [
        "Mini Projects",
        "projects"
      ],
      "part-15-creative-coding": [
        "Creative Coding",
        "projects"
      ],
      "part-16-capstone-project": [
        "Final Capstone",
        "projects"
      ]
    },
    "groups": {
      "basics": "Basics",
      "logic": "Logic",
      "data": "Data",
      "web": "Web Pages",
      "skills": "Skills",
      "projects": "Projects"
    },
    "extras": [
      {
        "file": "reference/quick-reference-and-glossary.md",
        "key": "ref",
        "label": "Quick Reference & Glossary"
      },
      {
        "file": "teacher-guide/teachers-guide-and-rubrics.md",
        "key": "teacher",
        "label": "Teacher's Guide & Rubrics"
      }
    ],
    "practice": {
      "href": "../studios/web-studio/index.html",
      "label": "Open the Web Studio",
      "icon": "🌐",
      "text": "Build this chapter’s examples into a real page in the Web Studio, or run small pieces in the scratchpad above."
    },
    "scratchpad": true,
    "grades": "Grades 7–8",
    "card": "Make pages respond to clicks and typing. Learn variables, decisions, loops and functions.",
    "metaDescription": "The Junior Coders JavaScript textbook for Grades 7–8: variables, decisions, loops, functions, arrays, objects, the DOM and events, with a live scratchpad.",
    "lessonsFolder": "Learning JS",
    "search": "javascript js",
    "oldKeys": {
      "p11": "ch18",
      "p12": "ch19",
      "p13": "ch20",
      "p14": "ch21",
      "p15": "ch22",
      "final": "ch23"
    }
  },
  {
    "key": "php",
    "stage": "web",
    "title": "PHP: Server Scripting",
    "short": "PHP",
    "subtitle": "Forms, files and safe code",
    "icon": "🐘",
    "color": "#7c3aed",
    "colorDark": "#5b21b6",
    "colorSoft": "#f5f3ff",
    "links": [
      {
        "href": "../Learning%20PHP/learningphp.html",
        "label": "📚 PHP lessons"
      },
      {
        "href": "../cheatsheet-php.html",
        "label": "📋 Cheat sheet"
      },
      {
        "href": "../Learning%20PHP/exercises.html",
        "label": "✅ Exercises"
      }
    ],
    "parts": {
      "part-01-introduction": [
        "Introduction to PHP",
        "basics"
      ],
      "part-02-variables-and-data-types": [
        "Variables & Data Types",
        "basics"
      ],
      "part-03-control-flow": [
        "Control Flow",
        "logic"
      ],
      "part-04-functions": [
        "Functions",
        "logic"
      ],
      "part-05-arrays": [
        "Arrays",
        "data"
      ],
      "part-06-forms-and-input": [
        "Forms & User Input",
        "data"
      ],
      "part-07-file-io": [
        "File I/O",
        "data"
      ],
      "part-08-oop": [
        "Object-Oriented PHP",
        "oop"
      ],
      "part-09-projects": [
        "Capstone Projects & Reference",
        "projects"
      ]
    },
    "groups": {
      "basics": "Basics",
      "logic": "Logic",
      "data": "Data & Files",
      "oop": "OOP",
      "projects": "Projects"
    },
    "extras": [
      {
        "file": "reference/quick-reference-and-glossary.md",
        "key": "ref",
        "label": "Quick Reference & Glossary"
      },
      {
        "file": "teacher-guide/teachers-guide-and-rubrics.md",
        "key": "teacher",
        "label": "Teacher's Guide & Rubrics"
      }
    ],
    "practice": {
      "href": "../studios/php-console/index.html",
      "label": "Open the PHP Console",
      "icon": "🐘",
      "text": "Run this chapter’s PHP examples in your browser and change them."
    },
    "grades": "Grades 9–10",
    "card": "Write code that runs on the server: handle forms, keep data safe, and build small web apps.",
    "metaDescription": "The Junior Coders PHP textbook for Grades 9–10: variables, decisions, functions, arrays, forms, files, classes and three projects, written for PHP 8.3.",
    "lessonsFolder": "Learning PHP",
    "search": "php server forms"
  },
  {
    "key": "mysql",
    "stage": "web",
    "title": "MySQL: Databases",
    "short": "MySQL",
    "subtitle": "Tables and SQL questions",
    "icon": "🗄️",
    "color": "#0284c7",
    "colorDark": "#0369a1",
    "colorSoft": "#f0f9ff",
    "links": [
      {
        "href": "../Learning%20MySQL/learningmysql.html",
        "label": "📚 MySQL lessons"
      },
      {
        "href": "../cheatsheet-mysql.html",
        "label": "📋 Cheat sheet"
      },
      {
        "href": "../Learning%20MySQL/exercises.html",
        "label": "✅ Exercises"
      }
    ],
    "parts": {
      "part-01-introduction": [
        "Introduction to Databases",
        "basics"
      ],
      "part-02-creating-databases-and-tables": [
        "Creating Databases & Tables",
        "ddl"
      ],
      "part-03-insert-and-select": [
        "INSERT & SELECT",
        "queries"
      ],
      "part-04-update-and-delete": [
        "UPDATE & DELETE",
        "updates"
      ],
      "part-05-joins-and-relationships": [
        "Table Relationships & JOINs",
        "joins"
      ],
      "part-06-advanced-queries": [
        "Aggregations & Advanced Queries",
        "advanced"
      ],
      "part-07-projects": [
        "Capstones & Reference",
        "projects"
      ]
    },
    "groups": {
      "basics": "Basics",
      "ddl": "DDL",
      "queries": "Queries",
      "updates": "Updates",
      "joins": "JOINs",
      "advanced": "Advanced",
      "projects": "Projects"
    },
    "extras": [
      {
        "file": "part-07-projects/proj01-student-management-db.md",
        "key": "proj1",
        "label": "Project 1: Student Database"
      },
      {
        "file": "part-07-projects/proj02-library-lending-db.md",
        "key": "proj2",
        "label": "Project 2: Library Lending System"
      },
      {
        "file": "reference/mysql-cheatsheet.md",
        "key": "ref",
        "label": "MySQL Quick Reference"
      }
    ],
    "practice": {
      "href": "../studios/sql-sandbox/index.html",
      "label": "Open the SQL Sandbox",
      "icon": "🗄️",
      "text": "Run this chapter’s queries on the same school library database."
    },
    "grades": "Grades 9–10",
    "card": "Store data in tables and ask questions with SQL, using a school library database.",
    "metaDescription": "The Junior Coders MySQL textbook for Grades 9–10: tables, SELECT, INSERT, UPDATE, DELETE, JOINs and totals, using one school library database.",
    "lessonsFolder": "Learning MySQL",
    "search": "mysql sql database"
  },
  {
    "key": "laravel",
    "stage": "web",
    "title": "Laravel: PHP Framework",
    "short": "Laravel",
    "subtitle": "Build a library app",
    "icon": "🔥",
    "color": "#dc2626",
    "colorDark": "#b91c1c",
    "colorSoft": "#fef2f2",
    "links": [
      {
        "href": "../Learning%20Laravel/learninglaravel.html",
        "label": "📚 Laravel lessons"
      },
      {
        "href": "../cheatsheet-laravel.html",
        "label": "📋 Cheat sheet"
      },
      {
        "href": "../Learning%20Laravel/quiz.html",
        "label": "📝 Quiz"
      }
    ],
    "parts": {
      "part-01-introduction": [
        "Introduction to Laravel",
        "basics"
      ],
      "part-02-routing": [
        "Routing",
        "basics"
      ],
      "part-03-controllers": [
        "Controllers",
        "basics"
      ],
      "part-04-blade-templates": [
        "Blade Templates",
        "data"
      ],
      "part-05-eloquent-orm": [
        "Eloquent ORM",
        "data"
      ],
      "part-06-migrations": [
        "Migrations",
        "data"
      ],
      "part-07-forms-and-validation": [
        "Forms & Validation",
        "secure"
      ],
      "part-08-authentication": [
        "Authentication",
        "secure"
      ]
    },
    "groups": {
      "basics": "Basics",
      "data": "Views & Data",
      "secure": "Forms & Auth"
    },
    "extras": [],
    "practice": null,
    "grades": "Grades 9–10",
    "card": "Routes, Blade pages, databases, forms and logins, built step by step as a school library app.",
    "metaDescription": "The Junior Coders Laravel textbook for Grades 9–10: routes, controllers, Blade, Eloquent, migrations, forms, validation and logins, building one school library app.",
    "lessonsFolder": "Learning Laravel",
    "search": "laravel framework mvc"
  },
  {
    "key": "python",
    "stage": "python",
    "title": "Python & Machine Learning",
    "short": "Python",
    "subtitle": "From first code to simple AI",
    "icon": "🐍",
    "color": "#2563eb",
    "colorDark": "#1d4ed8",
    "colorSoft": "#eff6ff",
    "links": [
      {
        "href": "../Learning%20Python/learningpython.html",
        "label": "📚 Python lessons"
      },
      {
        "href": "../cheatsheet-python.html",
        "label": "📋 Cheat sheet"
      }
    ],
    "parts": {
      "part-01-python-foundations": [
        "Python Foundations",
        "foundations"
      ],
      "part-02-control-flow-and-logic": [
        "Logic & Loops",
        "foundations"
      ],
      "part-03-data-structures-and-functions": [
        "Structures & Functions",
        "data"
      ],
      "part-04-data-and-files": [
        "Data & File Systems",
        "data"
      ],
      "part-05-machine-learning-foundations": [
        "Machine Learning",
        "ml"
      ],
      "part-06-ethical-ai-and-capstones": [
        "Ethical AI & Capstone",
        "ml"
      ]
    },
    "groups": {
      "foundations": "Python",
      "data": "Data",
      "ml": "ML & AI"
    },
    "extras": [],
    "practice": {
      "href": "../studios/python-console/index.html",
      "label": "Open the Python Console",
      "icon": "🐍",
      "text": "Run this chapter’s Python examples in your browser and try your own changes."
    },
    "grades": "Grades 8–10",
    "card": "Learn Python step by step, work with data files, then see how simple AI learns, and how to use it honestly.",
    "metaDescription": "The Junior Coders Python textbook for Grades 8–10: variables, decisions, loops, lists, functions, files, and how simple machine learning works and is used honestly.",
    "lessonsFolder": "Learning Python",
    "search": "python ml ai"
  },
  {
    "key": "networks",
    "stage": "python",
    "title": "Networks & Web Protocols",
    "short": "Networks",
    "subtitle": "How messages travel",
    "icon": "📡",
    "color": "#0284c7",
    "colorDark": "#075985",
    "colorSoft": "#f0f9ff",
    "links": [
      {
        "href": "../Learning%20Networks/learningnetworks.html",
        "label": "📚 Networks lessons"
      },
      {
        "href": "../cheatsheet-networks.html",
        "label": "📋 Cheat sheet"
      }
    ],
    "parts": {
      "part-01-network-foundations": [
        "Foundations & Layer Models",
        "foundations"
      ],
      "part-02-transport-and-ports": [
        "Transport & Sockets",
        "transport"
      ],
      "part-03-the-domain-system": [
        "The Domain System",
        "foundations"
      ],
      "part-04-http-and-the-web": [
        "HTTP & The Web",
        "web"
      ],
      "part-05-securing-the-wire": [
        "Securing the Wire",
        "security"
      ],
      "part-06-modern-web-and-diagnostics": [
        "Modern Web & Capstone",
        "web"
      ]
    },
    "groups": {
      "foundations": "Layers & IP",
      "transport": "Transport",
      "web": "HTTP & Web",
      "security": "Security"
    },
    "extras": [],
    "practice": {
      "href": "../Learning%20Networks/playground.html",
      "label": "Open the Network Studio",
      "icon": "📡",
      "text": "See this chapter in action: requests, DNS lookups, handshakes and subnets."
    },
    "grades": "Grades 9–10",
    "card": "How messages travel across the internet: IP addresses, DNS, HTTP and secure HTTPS.",
    "metaDescription": "The Junior Coders networking textbook for Grades 9–10: packets, layers, IP addresses, TCP and UDP, DNS, HTTP and HTTPS, with real command output.",
    "lessonsFolder": "Learning Networks",
    "search": "network internet dns http tcp"
  },
  {
    "key": "cybersecurity",
    "stage": "python",
    "title": "Cybersecurity & Digital Safety",
    "short": "Cybersecurity",
    "subtitle": "Protect people and websites",
    "icon": "🛡️",
    "color": "#059669",
    "colorDark": "#047857",
    "colorSoft": "#ecfdf5",
    "links": [
      {
        "href": "../Learning%20Cybersecurity/learningcybersecurity.html",
        "label": "📚 Security lessons"
      },
      {
        "href": "../cheatsheet-cybersecurity.html",
        "label": "📋 Cheat sheet"
      }
    ],
    "parts": {
      "part-01-foundations-of-security": [
        "Foundations of Security",
        "foundations"
      ],
      "part-02-social-engineering-and-phishing": [
        "Social Engineering & Phishing",
        "phishing"
      ],
      "part-03-web-application-vulnerabilities": [
        "Web Defense & OWASP",
        "owasp"
      ],
      "part-04-cryptography-and-secure-channels": [
        "Cryptography & Channels",
        "foundations"
      ],
      "part-05-digital-hygiene-and-privacy": [
        "Digital Hygiene & Privacy",
        "hygiene"
      ],
      "part-06-incident-response-and-capstone": [
        "Forensics & Capstone",
        "hygiene"
      ]
    },
    "groups": {
      "foundations": "Foundations",
      "phishing": "Phishing",
      "owasp": "OWASP Web",
      "hygiene": "Hygiene"
    },
    "extras": [],
    "practice": {
      "href": "../Learning%20Cybersecurity/playground.html",
      "label": "Open the Cyber Defense Studio",
      "icon": "🛡️",
      "text": "Try this chapter’s ideas safely in the Cyber Defense Studio."
    },
    "grades": "Grades 9–10",
    "card": "Strong passwords, spotting scam messages, protecting websites, and keeping backups.",
    "metaDescription": "The Junior Coders cybersecurity textbook for Grades 9–10: strong passwords, spotting scams, protecting websites, encryption and backups. Defence only.",
    "lessonsFolder": "Learning Cybersecurity",
    "search": "security password phishing"
  }
];
