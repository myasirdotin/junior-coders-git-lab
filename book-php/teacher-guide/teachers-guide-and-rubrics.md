# Teacher's Guide & Assessment Rubrics 🍎📋

---

## 1. 🎓 Course Philosophy & Class 9 Standards

The **Class 9 PHP Server-Side Curriculum** is designed to transition secondary school students from passive consumer developers (building static HTML/CSS brochure pages) into true software architects capable of building dynamic, data-driven, and secure web applications.

### Core Pedagogical Pillars:
1. **Mental Models First**: Every chapter begins with an intuitive real-life metaphor (the restaurant kitchen, the PA system, the ATM machine) before introducing abstract code syntax.
2. **Security by Design**: Students are taught input sanitization, strict equality, XSS prevention, and session guards from Week 1.
3. **Dual-Track Synergy**: Theory covered in this textbook integrates directly with the interactive coding challenges in `Learning PHP/` and the Junior Coders Master Playground.

---

## 2. 📅 12-Week Curriculum Schedule

| Week | Chapters Covered | Core Topics & Milestones | Laboratory Practical |
| :--- | :--- | :--- | :--- |
| **Week 1** | Chapters 1 – 3 | Client vs Server Architecture, First Script, PHP in HTML | Dynamic Welcome Badge |
| **Week 2** | Chapters 4 – 5 | Variables, $ Naming Rules, 8 Data Types, `var_dump()` | Student Data Inspector |
| **Week 3** | Chapters 6 – 7 | Strings, Concatenation (`.`), Arithmetic & Math Functions | Currency & Math Calculator |
| **Week 4** | Chapters 8 – 9 | Conditionals, Comparison Operators, Switch Statements | Exam Grade Decider |
| **Week 5** | Chapter 10 | While, For, Foreach, Nested Loops, Break & Continue | 10x10 Multiplication Matrix |
| **Week 6** | Chapters 11 – 13 | Custom Functions, Scope, Default Parameters, Date/Time | Reusable UI Component Library |
| **Week 7** | Chapters 14 – 16 | Indexed & Associative Arrays, Stacks, Queues, Sorting | Student Roster & Leaderboard |
| **Week 8** | Chapters 17 – 19 | Forms, GET vs POST, Input Sanitization & XSS Defense | Secure Event RSVP Form |
| **Week 9** | Chapters 20 – 22 | File Reading, Appending with Locks, File Upload Validation| Digital Guestbook & Photo Uploader |
| **Week 10**| Chapters 23 – 24 | Classes, Objects, `$this`, Public/Private Encapsulation | Bank Account Model |
| **Week 11**| Chapters 25 – 26 | Class Inheritance (`extends`), Overriding, Constructors | School Directory OOP Tree |
| **Week 12**| Capstone Projects | Contact Form, JSON Mini Blog, or Session Login Portal | Capstone Exhibition & Review |

---

## 3. 📊 Project Assessment Rubric

Use this 100-point rubric to evaluate student capstone projects and lab challenges:

```text
┌──────────────────────────────────────┬────────┬────────────────────────────────────────────┐
│ Criterion                            │ Points │ Exemplary Performance Indicators           │
├──────────────────────────────────────┼────────┼────────────────────────────────────────────┤
│ 1. Logic & Algorithm Correctness     │ 30 pts │ Correct control flow; zero infinite loops; │
│                                      │        │ proper conditional branching and data flow │
│ 2. Security & Sanitization           │ 25 pts │ Uses htmlspecialchars(); validates input;  │
│                                      │        │ guards against undefined keys and notices  │
│ 3. Code Architecture & DRY           │ 20 pts │ Effective use of functions/OOP classes;    │
│                                      │        │ zero repeated blocks; clean indentation    │
│ 4. User Experience & Feedback        │ 15 pts │ Sticky forms preserve input on error;      │
│                                      │        │ descriptive success and error messages     │
│ 5. Code Documentation & Comments     │ 10 pts │ Clear descriptive comments explaining      │
│                                      │        │ rationale behind algorithms and functions  │
├──────────────────────────────────────┴────────┼────────────────────────────────────────────┤
│ TOTAL                                │ 100 pts│ Mastery: 90-100 | Proficient: 75-89        │
└───────────────────────────────────────────────┴────────────────────────────────────────────┘
```

---

## 4. 💡 Classroom Engagement & Differentiated Learning

- **For Struggling Students**: Emphasize Section 8 (*Predict the Output*) and Section 9 (*Code Detective*) in each chapter before writing code from scratch. Debugging broken code builds confidence faster than staring at a blank screen.
- **For Advanced Students**: Challenge them to add password hashing (`password_hash()`) to Project 3, or build search filtering into the JSON Blog in Project 2!
