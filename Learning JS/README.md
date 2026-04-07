# JavaScript Learning Platform

A self-contained, interactive JavaScript learning platform for beginners. No external dependencies required - just open in a browser and start learning.

## Getting Started

1. Open `index.html` in your browser (or serve via XAMPP at `/junior-coders-git-lab/Learning JS/`)
2. Start with the **Learning JS** page for the full course syllabus
3. Work through modules 1-9 at your own pace
4. Practice in the **Playground** and complete **Exercises**

## Project Structure

```
Learning JS/
├── index.html          # Interactive code playground
├── exercises.html      # 9 exercises (beginner to advanced) with hints & solutions
├── learningjs.html     # Course syllabus with 9 modules across 6 weeks
├── glossary.html       # Searchable glossary of JavaScript terms
├── module1-9.html      # Individual lesson modules with reading, quizzes, practice
├── README.md           # This file
├── css/
│   └── style.css       # Main stylesheet (CSS variables, dark mode, responsive)
└── js/
    └── script.js       # Core functionality (editor, dark mode, quizzes, shortcuts)
```

## Features

- **Interactive Code Playground** - Write and run JavaScript directly in the browser
- **9 Learning Modules** - Covering variables, math, strings, conditionals, arrays, loops, functions, objects, and DOM/events
- **Exercises with Hints & Solutions** - 3-level hint system and toggle-able solutions
- **Quizzes** - Multiple-choice questions after each module with instant feedback
- **Progress Tracking** - Tracks completed modules using localStorage
- **Dark Mode** - Toggle between light and dark themes (saved in localStorage)
- **Keyboard Shortcuts** - `Ctrl+Enter` to run code, `Ctrl+L` to clear
- **Searchable Glossary** - Quick reference for JavaScript terminology
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Accessible** - ARIA labels, keyboard navigation, focus indicators

## Course Outline

| Week | Module | Topic | Duration |
|------|--------|-------|----------|
| 1 | Module 1 | Variables & Data Types | 45 min |
| 1 | Module 2 | Math Operations | 40 min |
| 2 | Module 3 | String Manipulation | 50 min |
| 2 | Module 4 | Conditional Logic | 55 min |
| 3 | Module 5 | Arrays | 60 min |
| 3 | Module 6 | Loops | 60 min |
| 4 | Module 7 | Functions | 70 min |
| 5 | Module 8 | Objects | 65 min |
| 6 | Module 9 | DOM & Events | 80 min |

## Technical Details

- **No external dependencies** - fully self-contained HTML/CSS/JS
- **CSS Variables** for theming (light/dark mode)
- **localStorage** for progress tracking and theme persistence
- **Responsive** with mobile-first breakpoints at 768px and 480px
- Uses system fonts (`Segoe UI`, `system-ui`) for fast loading

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge).
