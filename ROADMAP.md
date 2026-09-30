# 🗺️ LearnCode / BEI Coders — Curriculum & Development Roadmap

Welcome to the **LearnCode / BEI Coders** official project roadmap. This document outlines our curriculum progression, current release milestones, and forward-looking developmental roadmap for school students, educators, and open-source contributors.

---

## 🌟 Core Pedagogical & Ethical Foundation

All educational content, interactive studios, textbook chapters, and milestone capstones adhere to our foundational philosophy:
- **Beneficial Knowledge (*'Ilm Nāfi'*)**: Technology is taught as a moral instrument to solve genuine human problems, support family and community well-being, protect the vulnerable, and advance science, education, health, and economic justice.
- **Digital Stewardship & Trust (*Amānah*)**: User data, passwords, and digital communications are treated as sacred trusts. Security, encryption, and privacy by design are taught from lesson one.
- **Modesty & Visual Decency (*Ḥayā' & Adab*)**: Family-friendly, respectful, dignified themes across all user interfaces, avoiding vanity metrics, addictive design, or unwholesome media entertainment (no Netflix, movie box offices, or cinema themes).
- **Technical Excellence (*Iḥsān*)**: Craftsmanship in code—clean indentation, semantic markup, robust validation, descriptive naming, and resilient error handling.

---

## 🎓 5-Tier Guided Learning Pathways

```text
┌────────────────────────────────────────────────────────────────────────┐
│  Tier 1: Beginner Explorer (Grades 6–7 • 4 Weeks)                      │
│  Hardware Anatomy ──> Terminal Navigation ──> HTML5 ──> Git Snapshots  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
        ┌───────────────────────────┴───────────────────────────┐
        ▼                                                       ▼
┌───────────────────────────────────────┐   ┌───────────────────────────────────────┐
│ Tier 2: Junior Web Developer          │   │ Tier 3: Python & AI Pioneer           │
│ (Grades 7–9 • 8 Weeks)                │   │ (Grades 8–10 • 8 Weeks)               │
│ Modern HTML5 ──> CSS Grid/Flex ──>    │   │ Python Syntax ──> Algorithmic Logic   │
│ Dynamic JavaScript DOM ──> Web Studio │   │ ──> Data Handling ──> Ethical AI      │
└───────────────────┬───────────────────┘   └───────────────────┬───────────────────┘
                    │                                           │
                    └───────────────────────────┬───────────────┘
                                                ▼
┌────────────────────────────────────────────────────────────────────────┐
│ Tier 4: Enterprise Full-Stack Engineer (Grades 9–10 • 10 Weeks)        │
│ Server-side PHP ──> MySQL Relational Schemas ──> Laravel 11 MVC       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ Tier 5: Cybersecurity & Network Defender (Grades 9–12 • 8 Weeks)       │
│ OSI & TCP/IP ──> IP Subnetting & DNS ──> HTTP/3 & TLS 1.3 Encryption   │
│ ──> OWASP Web Defenses (SQLi/XSS/CSRF) ──> 3-2-1 Digital Resilience    │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Release Milestones & Version Roadmap

### ✅ Version 1.0.0 (Current Stable Release) — Complete School Package
- [x] **11 Offline-Ready Textbooks**:
  - `book-html/`: HTML for Class 6 & 7 (17 chapters)
  - `book-css/`: CSS for Class 6 & 7 (18 chapters)
  - `book-js/`: JavaScript for Class 7 & 8 (20 chapters)
  - `book-cmd/`: Command Prompt & Terminal (14 chapters)
  - `book-git/`: Git Version Control (20 chapters)
  - `book-php/`: PHP for Class 9 (26 chapters)
  - `book-mysql/`: Relational Database Engineering (14 chapters)
  - `book-laravel/`: Modern Laravel 11 Web Architecture (16 chapters)
  - `book-python/`: Python & Applied Machine Learning (15 chapters)
  - `book-networks/`: Computer Networking & Web Protocols (14 chapters)
  - `book-cybersecurity/`: Defensive Cybersecurity & Digital Hygiene (14 chapters)
- [x] **Zero-Setup In-Browser Studios**:
  - Web Studio (live HTML/CSS/JS sandbox with instant preview).
  - Python Console (interactive script runner).
  - SQL Sandbox (live SQLite/SQL relational queries in browser).
- [x] **Offline Reading & Narration**:
  - Pre-compiled offline chapter bundles (`chapters-bundle.js`).
  - Web Speech API integration (`book-speaker.js`) for audio narration.
- [x] **Teacher Hub**:
  - Syllabus progression timelines, pedagogical guides, assessment rubrics, and offline lesson materials.
- [x] **Islamic Ethical Framework**:
  - Root and module-level `GEMINI.md` standardizing beneficial knowledge (*'Ilm Nāfi'*), modesty (*Ḥayā'*), data stewardship (*Amānah*), and prohibition of usury (*Ribā*), gambling (*Maysir*), and unwholesome media streaming.

---

### ⏳ Version 1.1.0 (Target: Q2 2026) — Interactive Assessment & Lab Simulators
- [ ] **Interactive Code Evaluator (Auto-Grader)**:
  - Client-side unit test runners inside Web Studio and Python Console to validate student solutions against exercise requirements.
- [ ] **Visual Network Packet Simulator**:
  - Interactive packet tracer illustrating TCP 3-way handshakes, DNS hierarchy lookups, and CIDR subnet masking visually in the browser.
- [ ] **Cybersecurity Defense Sandbox**:
  - Interactive input sanitization and password entropy visualizer demonstrating how bcrypt/Argon2id stretch against dictionary attacks.
- [ ] **Unified Guided Pathway Navigation**:
  - Dedicated interactive pathway pages for all 5 tracks including the newly finalized Cybersecurity & Network Defender track.
- [ ] **Theme Preference Persistence**:
  - Global `localStorage` synchronization for dark/light themes and textbook font size adjustments across all learning pages.

---

### ⏳ Version 1.2.0 (Target: Q3 2026) — Classroom Tooling & Multilingual Glossaries
- [ ] **Teacher Presentation Mode**:
  - Fullscreen slide deck mode for textbook chapters to enable frictionless classroom projector display without internet access.
- [ ] **Printable Pocket Cheatsheets**:
  - High-resolution, print-optimized PDF/HTML cards for CMD/Bash, Git, HTML5, CSS Grid, and SQL queries.
- [ ] **Multilingual Pedagogical Glossaries**:
  - English-Arabic and English-Urdu technical terminology reference tooltips for ESL students and regional schools.
- [ ] **Student Milestone Portfolio Exporter**:
  - One-click tool allowing students to bundle and download their completed studio projects as a standalone portfolio website.

---

### 🔮 Version 2.0.0 (Long-Term Vision) — Desktop LMS & Standalone Distribution
- [ ] **Air-Gapped Desktop Distribution (PWA / Electron)**:
  - Single-file installer for schools with zero internet access, packaging all textbooks, studios, and exercises into an air-gapped desktop app.
- [ ] **Local Progress Sync & Gradebook**:
  - USB-compatible, JSON-based student progress export so teachers can collect homework and project checkpoints without cloud accounts.
- [ ] **In-Browser WebAssembly Edge AI**:
  - Local neural network training and computer vision classification running 100% on the client device via WebAssembly (Wasm) and TensorFlow.js.

---

## 🤝 Contribution & Feedback

We welcome contributions from school teachers, software engineers, and curriculum designers who share our commitment to academic rigor and ethical digital stewardship.

To propose curriculum improvements or report issues:
1. Review [`GEMINI.md`](GEMINI.md) for our non-negotiable ethical guidelines and coding standards.
2. Fork the repository and create a feature branch (`git checkout -b feature/topic-name`).
3. Commit your changes with clear, descriptive messages following conventional commits.
4. Submit a Pull Request for review.
