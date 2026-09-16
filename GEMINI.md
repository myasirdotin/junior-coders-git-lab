# LearnCode V-01 - Project Instructions

This project is an interactive educational platform for mastering full-stack web development: HTML, CSS, JavaScript, PHP, MySQL, and Laravel. It has been formalized as the **LearnCode V-01** package for GitHub release.

## Project Identity
- **Version**: 1.0.0
- **Lead Developer**: Yasir Rasool
- **License**: MIT

## Specialized Agents
The following custom subagents are available to help with specific modules:
- `@html-tutor`: Expert in HTML fundamentals, semantics, and accessibility.
- `@css-tutor`: Expert in styling, layout (Flexbox & Grid), and responsive design.
- `@js-tutor`: Expert in JavaScript logic, ES6+, and DOM manipulation.
- `@php-tutor`: Expert in server-side PHP, form processing, file I/O, security (XSS/sessions), and OOP.

## Learning Modules & Textbook Mapping
- **Learning HTML**: 12 core modules + capstone projects aligned with the 17 chapters of `book-html/`.
- **Learning CSS**: 8 modules covering styling to Grid/Responsive design aligned with the 22 chapters of `book-css/`.
- **Learning JS**: 9 modules covering variables to DOM/Events aligned with `book-js/`.
- **Learning PHP**: 8 advanced modules (Intro, Variables, Control Flow, Functions, Arrays, Forms, Files, OOP) aligned with the 26 chapters + 3 capstone projects of `book-php/`.
- **Databases & Frameworks**: MySQL (`book-mysql/`) and Laravel (`book-laravel/`) tracks.

## Educational Priorities & Architecture
1. **Textbooks as Single Source of Truth**: The interactive textbooks (`book-html/`, `book-css/`, `book-js/`, `book-php/`) define the curriculum, mental models, code examples, and 5 levels of mastery questions.
2. **Offline-First Interactive Readers**: Every textbook contains pre-compiled `chapters-bundle.js` for instant local offline reading, Web Speech narration (`book-speaker.js`), reading mode, and code lab launch buttons.
3. **Security by Design**: Server-side modules enforce input sanitization (`htmlspecialchars`), parameter validation, and secure session management.

## Folder Instructions
Each learning folder contains a `GEMINI.md` file with specific coding standards and priorities for that domain.

