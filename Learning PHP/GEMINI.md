# PHP Learning Context & Standards

The single source of truth for all PHP concepts, terminology, syntax, exercises, and capstone projects is the official textbook in `book-php/` (**PHP for Class 9: Server-Side Programming**).

## Curriculum & Module Mapping
All learning modules and practice pages in `Learning PHP/` maintain direct alignment with the 26 chapters and 3 capstone projects in `book-php/`:
- **Module 1**: Introduction, Web Architecture, PHP Tags & Echo (Book Part 1: Ch 1–3)
- **Module 2**: Variables, Naming Rules, 8 Data Types, Strings & Math (Book Part 2: Ch 4–7)
- **Module 3**: Control Flow, If/Else Decisions, Switch & Loops (Book Part 3: Ch 8–10)
- **Module 4**: Functions, Scope, Parameters, Return & Built-in Utilities (Book Part 4: Ch 11–13)
- **Module 5**: Arrays (Indexed, Associative & Array Functions) (Book Part 5: Ch 14–16)
- **Module 6**: Forms, GET vs POST & Validation / XSS Security (Book Part 6: Ch 17–19)
- **Module 7**: File I/O, Appending & Secure File Uploads (Book Part 7: Ch 20–22)
- **Module 8**: Object-Oriented PHP (Classes, Objects, Encapsulation, Inheritance, Constructors) (Book Part 8: Ch 23–26)
- **Capstone Projects**: Dynamic Contact Form, JSON Mini Blog, and Authentication Session System (Book Part 9: Ch 27–29)

## Educational Priorities
When developing or modifying pages in this directory:
1. **Source of Truth**: Draw code examples, mental models, and terminology directly from `book-php/`.
2. **Security by Design**: Always demonstrate input sanitization with `htmlspecialchars()`, data validation with `filter_var()`, and secure session handling.
3. **Pedagogical Structure**: Every module contains:
   - Clear learning objectives with real-world analogies.
   - Live code editor and server simulation.
   - Multi-tier exercises: 🟢 Easy (Recall), 🟡 Medium (Application), 🔴 Challenge (Creative Problem-Solving).
   - Instant-feedback comprehension quiz.
   - Direct link to corresponding textbook chapter (`../book-php/#ch*`).
4. **Theme Consistency**: Inherit centralized platform styling and typography from `../styles/main.css` and `../styles/book-theme.css`.\n