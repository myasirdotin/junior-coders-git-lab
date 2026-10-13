# Chapter 24: Portfolio Website

---

## 🌟 Real-Life Story

**The Architect's Blueprint Gallery**

Imagine an architect applying to design a new science museum:
- They don't just hand the committee a sheet of paper with their name on it.
- They arrive with a sleek leather-bound **Design Portfolio**:
  - Full-color photographs of buildings they have already constructed.
  - 3D blueprints of futuristic solar-powered bridges.
  - Interactive models showing how visitors enter the lobby.
  - Awards and engineering credentials.

When employers, clients, or judges want to know if you can truly code, they don't test you with paper exams. **They look at your Web Developer Portfolio!**
Your portfolio is the single most valuable project you will build in this entire book—it proves with live, working code that you are a genuine web creator!

---

## 🎯 What You Will Learn

By the end of this chapter, you will be able to:
- Build a dark-themed developer portfolio with a hero and two call-to-action buttons.
- Show your projects as cards with tech badges and "Live Demo" and "View Code" links.
- Lay out a skills grid and a contact section.
- Make the hero title and grid fit phone screens with media queries.

---

## Visual Concept Explanation

### The Developer Portfolio Blueprint

```text
┌─────────────────────────────────┐
│ HEADER: LeoVance.dev            │
│ Projects  Skills  Contact       │
├─────────────────────────────────┤
│ HERO: "Hi, I'm Leo! I build     │
│ clean, accessible web pages."   │
│ [View My Work] [Contact Me]     │
├─────────────────────────────────┤
│ PROJECTS (2 x 2 grid)           │
│ ┌──────────────┐┌─────────────┐ │
│ │ [preview]    ││ [preview]   │ │
│ │ Halal        ││ School      │ │
│ │ Restaurant   ││ Portal      │ │
│ │ [HTML][Grid] ││ [HTML][CSS] │ │
│ │ [Demo][Code] ││ [Demo][Code]│ │
│ └──────────────┘└─────────────┘ │
├─────────────────────────────────┤
│ SKILLS: [HTML5] [CSS3] [Git]    │
│ [VS Code] [DevTools]            │
├─────────────────────────────────┤
│ CONTACT: form, email, GitHub    │
└─────────────────────────────────┘
```

---

## Code Example: The Complete Developer Portfolio

Type this into your editor and save it as `portfolio.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leo Vance | Junior Web Developer Portfolio</title>
    <style>
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      html {
        scroll-behavior: smooth;
      }

      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #0f172a; /* Deep Slate Dark Mode */
        color: #e2e8f0;
        line-height: 1.6;
      }

      /* Navbar */
      .nav-wrapper {
        position: sticky;
        top: 0;
        z-index: 100;
        background-color: rgba(15, 23, 42, 0.9);
        backdrop-filter: blur(8px);
        border-bottom: 1px solid #1e293b;
      }

      .nav-content {
        max-width: 1100px;
        margin: 0 auto;
        padding: 18px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .brand {
        font-size: 20px;
        font-weight: 800;
        color: #38bdf8; /* Cyan Glow */
        text-decoration: none;
      }

      .nav-links {
        display: flex;
        list-style: none;
        gap: 24px;
      }

      .nav-links a {
        text-decoration: none;
        color: #94a3b8;
        font-weight: 600;
        transition: color 0.2s;
      }

      .nav-links a:hover {
        color: #38bdf8;
      }

      /* Hero Section */
      .hero {
        max-width: 900px;
        margin: 0 auto;
        padding: 100px 24px 60px 24px;
        text-align: center;
      }

      .hero-greeting {
        font-size: 16px;
        color: #38bdf8;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 2px;
        margin-bottom: 16px;
      }

      .hero-title {
        font-size: 48px;
        font-weight: 800;
        color: #ffffff;
        margin-bottom: 20px;
        line-height: 1.2;
      }

      .hero-subtitle {
        font-size: 20px;
        color: #94a3b8;
        max-width: 650px;
        margin: 0 auto 36px auto;
      }

      .hero-buttons {
        display: flex;
        justify-content: center;
        gap: 16px;
      }

      .btn-primary {
        background-color: #38bdf8;
        color: #0f172a;
        padding: 12px 28px;
        border-radius: 8px;
        font-weight: 700;
        text-decoration: none;
        transition: transform 0.2s, background-color 0.2s;
      }

      .btn-primary:hover {
        background-color: #0ea5e9;
        transform: translateY(-2px);
      }

      .btn-secondary {
        background-color: transparent;
        color: #e2e8f0;
        border: 2px solid #334155;
        padding: 12px 28px;
        border-radius: 8px;
        font-weight: 700;
        text-decoration: none;
        transition: border-color 0.2s;
      }

      .btn-secondary:hover {
        border-color: #38bdf8;
      }

      /* Container */
      .container {
        max-width: 1100px;
        margin: 0 auto;
        padding: 60px 24px;
      }

      .section-header {
        text-align: center;
        margin-bottom: 48px;
      }

      .section-header h2 {
        font-size: 32px;
        color: #ffffff;
        margin-bottom: 8px;
      }

      /* Projects Grid */
      .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 32px;
      }

      .project-card {
        background-color: #1e293b;
        border: 1px solid #334155;
        border-radius: 16px;
        overflow: hidden;
        transition: transform 0.3s, border-color 0.3s;
      }

      .project-card:hover {
        transform: translateY(-8px);
        border-color: #38bdf8;
      }

      .project-card img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        display: block;
      }

      .project-body {
        padding: 24px;
      }

      .project-title {
        font-size: 20px;
        font-weight: 700;
        color: #ffffff;
        margin-bottom: 8px;
      }

      .project-desc {
        color: #94a3b8;
        font-size: 14px;
        margin-bottom: 16px;
        line-height: 1.5;
      }

      .tech-tags {
        display: flex;
        gap: 8px;
        margin-bottom: 20px;
        flex-wrap: wrap;
      }

      .tag {
        background-color: #0f172a;
        color: #38bdf8;
        font-size: 12px;
        font-weight: 600;
        padding: 4px 10px;
        border-radius: 6px;
        border: 1px solid #334155;
      }

      .project-links {
        display: flex;
        gap: 16px;
      }

      .project-links a {
        text-decoration: none;
        color: #38bdf8;
        font-size: 14px;
        font-weight: 700;
      }

      .project-links a:hover {
        text-decoration: underline;
      }

      /* Contact Footer */
      footer {
        background-color: #0b1120;
        border-top: 1px solid #1e293b;
        padding: 60px 24px;
        text-align: center;
      }
    </style>
  </head>
  <body>

    <!-- Sticky Navigation -->
    <div class="nav-wrapper">
      <nav class="nav-content">
        <a href="#" class="brand">⚡ LeoVance.dev</a>
        <ul class="nav-links">
          <li><a href="#projects">Projects</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </div>

    <!-- Hero Section -->
    <header class="hero">
      <div class="hero-greeting">Hi there! 👋 I am Leo Vance</div>
      <h1 class="hero-title">Building Modern, Responsive Websites from Scratch</h1>
      <p class="hero-subtitle">
        Class 7 Web Developer passionate about clean semantic HTML5, modern CSS3 Flexbox/Grid layouts, and interactive design.
      </p>
      <div class="hero-buttons">
        <a href="#projects" class="btn-primary">View My Projects 🚀</a>
        <a href="#contact" class="btn-secondary">Let's Connect 💬</a>
      </div>
    </header>

    <!-- Projects Section -->
    <main class="container" id="projects">
      <div class="section-header">
        <h2>Featured Creations</h2>
        <p style="color: #94a3b8;">Real websites designed and coded by me.</p>
      </div>

      <div class="projects-grid">
        <!-- Project 1 -->
        <div class="project-card">
          <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500" alt="Restaurant Project">
          <div class="project-body">
            <h3 class="project-title">Bella Vista Trattoria</h3>
            <p class="project-desc">
              A responsive halal family restaurant site with a digital menu, chef specials and a table booking form.
            </p>
            <div class="tech-tags">
              <span class="tag">HTML5</span>
              <span class="tag">CSS Grid</span>
              <span class="tag">Responsive</span>
            </div>
            <div class="project-links">
              <a href="restaurant.html" target="_blank">Live Demo 🔗</a>
              <a href="#">View Code 💻</a>
            </div>
          </div>
        </div>

        <!-- Project 2 -->
        <div class="project-card">
          <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500" alt="School Project">
          <div class="project-body">
            <h3 class="project-title">Greenwood Academy Portal</h3>
            <p class="project-desc">
              An educational school website with faculty directories, academic program cards, and interactive navigation.
            </p>
            <div class="tech-tags">
              <span class="tag">HTML5</span>
              <span class="tag">Flexbox</span>
              <span class="tag">Cards</span>
            </div>
            <div class="project-links">
              <a href="school-website.html" target="_blank">Live Demo 🔗</a>
              <a href="#">View Code 💻</a>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer id="contact">
      <h2 style="color: white; margin-bottom: 8px;">Let's Build Something Great Together</h2>
      <p style="color: #94a3b8; max-width: 500px; margin: 0 auto 24px auto;">
        Have a question or want to collaborate on a coding project? Feel free to reach out!
      </p>
      <a href="mailto:leo@juniordev.com" class="btn-primary" style="display: inline-block;">Email Me Directly 📬</a>
      <p style="margin-top: 40px; color: #64748b; font-size: 13px;">
        &copy; 2026 Leo Vance. Handcrafted with semantic HTML & CSS.
      </p>
    </footer>

  </body>
</html>
```

---

## Code Explanation: Agency-Grade Dark Mode

- **Dark Theme Palette**: Dark slate background (`#0f172a`), lighter card container (`#1e293b`), borders (`#334155`), and vibrant cyan accents (`#38bdf8`). Dark mode saves battery on OLED screens and looks ultra-modern!
- Tech Tags: Small pills showing the technologies used (`<span class="tag">HTML5</span>`) communicate technical competence to recruiters and teachers.
- Interactive Project Links: Providing "Live Demo" and "View Code" links allows visitors to test your creations in real time.

---

## 🌍 Real-World Connection: GitHub Pages & Hosting

How do web developers share their portfolios with the world?
- You can upload your code repository to **GitHub** and turn on **GitHub Pages** with one click!
- GitHub gives you a free live web address (e.g. `yourname.github.io`) so anyone with an internet connection can view your portfolio live!
- GitHub accounts are for people aged 13 and over. If you are younger, ask a teacher or parent to publish it with you.

---

## 🔮 Predict the Output

What will happen when you hover over any project card?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> The card will smoothly float upward by 8 pixels (<code>transform: translateY(-8px);</code>) and its border will ignite in bright cyan (<code>border-color: #38bdf8;</code>) over 0.3 seconds!
</details>

---

## 🕵️ Code Detective: The Squashed Hero Title

A student tested their portfolio on an iPhone, but the giant 48px hero title was so wide that it broke through the screen edges:

```css
/* Broken Code */
.hero-title {
  font-size: 48px;
}
```

- **Find the mistake**: Fixed 48px text on small mobile screens causes line overflow!
- **Explain the mistake**: On mobile screens (<600px), headline font sizes should scale down gracefully.
- **Fix the code**: Add a media query!
  ```css
  /* Fixed Code */
  @media (max-width: 600px) {
    .hero-title {
      font-size: 32px;
    }
  }
  ```

---

## Think Like a Web Designer: Show, Don't Just Tell!

Anyone can write on a resume: *"I know how to code websites."*
A portfolio allows you to **PROVE IT** visually:
- Show screenshots of what you built.
- Explain what challenges you solved.
- Let users click the buttons and experience the quality of your code firsthand!

---

## Mini Challenge: Add a "Testimonials" Quote Box

Add a recommendation quote underneath your projects:
- Ask a real teacher or club leader for one honest sentence, and quote it exactly. For practice, use a clearly marked sample: *"Leo built our science club website, and it is easy to use on phones." (sample quote)*

---

## ⚠️ Common Mistake

A common mistake on dark pages is grey text that is too dark to read.

```css
/* Wrong: on a #0f172a background */
.project-desc {
  color: #334155;
}
```

**What happens:** dark grey on dark navy has very low contrast, far under 4.5 : 1. The project descriptions almost vanish, especially on a phone outside.

```css
/* Fixed */
.project-desc {
  color: #cbd5e1; /* light grey: easy to read on navy */
}
```

A second slip is project links that go nowhere, like `href="#"`. Visitors click "Live Demo" and nothing happens. Link only to pages that really exist, or leave the button out until the project is online.

---

## ✍️ Try It

**Link Your Real Chapter Projects**

Look inside the `.projects-grid` in `portfolio.html`:
1. Change the links on Project 1 to point directly to the files you created in Chapter 22 and Chapter 23!
2. Click the "Live Demo" link: Watch your browser seamlessly launch your actual restaurant and school websites!

---

## 📝 Recap

- A developer portfolio is your primary showcase of technical and design competence.
- Dark mode interfaces use deep slates (`#0f172a`) paired with bright, glowing accents (`#38bdf8`).
- Project cards combine imagery, descriptions, technology badges, and demo links.
- Dual CTAs in hero sections guide visitors toward exploring work or initiating contact.

---

## 📖 Key Terms

| Term | What It Means |
| :--- | :--- |
| **Portfolio** | A curated collection of an individual's best work demonstrating skills and capabilities. |
| **Tech Stack Badges** | Visual labels listing tools used to construct a project (e.g., HTML, CSS, Flexbox). |
| **Dual CTA** | Two complementary action buttons offering primary and secondary conversion paths. |
| **Live Demo** | A functional, clickable deployment of a web project for evaluation. |

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. What is the main purpose of a web developer portfolio?
2. Which hex colour did we use for the portfolio's dark background?
3. Name two links every project card should include.

<details>
<summary>Show answer</summary>

1. To show your best work in one place, so teachers, clubs or future employers can see what you can build.
2. `#0f172a` (a dark navy slate). Check your `body` rule if you changed it.
3. "Live Demo" (the working page) and "View Code" (the source code, for example on GitHub).

</details>

### 🟡 Level 2: Apply
4. The hero title is 30px on phones. Write mobile-first CSS that makes it 48px on screens 550px and wider.
5. Why are tech-stack badges helpful for people looking at your projects?

<details>
<summary>Show answer</summary>

4.
```css
.hero-title {
  font-size: 30px;
}

@media (min-width: 550px) {
  .hero-title {
    font-size: 48px;
  }
}
```

5. They show at a glance which tools you used (for example HTML, Grid, Forms). A reader can quickly find the project that shows the skill they care about.

</details>

### 🔴 Level 3: Challenge
Add a row of category buttons above the projects.
1. Add a `<div class="filters">` with four buttons: *All*, *Websites*, *Tools*, *School Projects*.
2. Lay them out with Flexbox, `gap` and `flex-wrap: wrap;`.
3. Give one button the class `active` and style it with a glowing blue border.
4. Check that the buttons wrap neatly on a 390px-wide screen.

<details>
<summary>Show one possible answer</summary>

```html
<div class="filters">
  <button class="filter active">All</button>
  <button class="filter">Websites</button>
  <button class="filter">Tools</button>
  <button class="filter">School Projects</button>
</div>
```

```css
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
}
.filter {
  background-color: transparent;
  color: #e2e8f0;
  border: 1px solid #334155;
  padding: 8px 16px;
  border-radius: 999px;
  cursor: pointer;
}
.filter.active {
  border-color: #38bdf8;
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.6);
  color: #ffffff;
}
```

The "All" button has a bright blue border with a soft glow. The buttons only look selectable for now; making them actually filter the cards needs JavaScript, which you will learn later.

</details>
