# Chapter 18: Personal Profile Website 🌐

---

## 🌟 Real-Life Story

**The Digital Astronaut Badge**

Imagine being selected as a student astronaut for a mission to Mars:
- Before the rocket lifts off, mission control publishes an official astronaut biography page on the space agency website:
  - At the top: Your official mission portrait wearing your space flight suit.
  - A summary of who you are and why you were chosen.
  - A breakdown of your special skills: *Orbital Navigation*, *Botany*, *Robotics*, and *Problem Solving*.
  - A showcase of your personal hobbies so kids around the world get to know the real you: *Growing vegetables*, *Astrophotography* and *Chess*.
  - A message portal where students can send radio questions to your spacecraft!

**A Personal Profile Website is your digital passport to the world!**
In this capstone project chapter, you will take everything you learned about HTML semantic structure, CSS styling, the Box Model, Flexbox, and buttons, and combine them to build a complete, professional personal profile website from scratch!

---

## 🎯 What You Will Learn

By the end of this chapter, you will be able to:
- Plan a one-page personal profile with hero, about, skills, hobbies and contact sections.
- Build a hero header with a round avatar and a short badge.
- Show skills as badges and bars, and hobbies as a grid of cards that lift on hover.
- Style a contact form and link sections with in-page links (`href="#skills"`).

---

## 👁️ Visual Concept Explanation

### The Personal Profile Architecture

```text
┌─────────────────────────────────┐
│ HERO                            │
│  (round avatar, 50% radius)     │
│  <h1> Alex Rivera </h1>         │
│  [Class 7 Junior Coder] badge   │
├─────────────────────────────────┤
│ ABOUT ME: two short paragraphs  │
├─────────────────────────────────┤
│ SKILLS (Flexbox badges)         │
│  [HTML5] [CSS3] [Robotics]      │
├─────────────────────────────────┤
│ HOBBIES (3-column grid)         │
│ ┌─────────┐┌─────────┐┌───────┐ │
│ │Stargaze ││ Skating ││ Chess │ │
│ └─────────┘└─────────┘└───────┘ │
├─────────────────────────────────┤
│ CONTACT FORM & FOOTER           │
│  [Name] [Email] [Message]       │
│  [ Send Message ]               │
└─────────────────────────────────┘
```

---

## 💻 Code Example: Complete Personal Profile Website

Create a file named `personal-profile.html` and write the complete production code:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alex Rivera | Personal Profile</title>
    <style>
      /* Global Reset */
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      html {
        scroll-behavior: smooth; /* Silky in-page anchor jumps! */
      }

      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f8fafc;
        color: #1e293b;
        line-height: 1.6;
      }

      /* Navigation */
      nav {
        background-color: #ffffff;
        border-bottom: 1px solid #e2e8f0;
        position: sticky;
        top: 0;
        z-index: 100;
        display: flex;
        justify-content: center;
        gap: 30px;
        padding: 16px;
      }

      nav a {
        text-decoration: none;
        color: #64748b;
        font-weight: 600;
        font-size: 15px;
        transition: color 0.2s;
      }

      nav a:hover {
        color: #2563eb;
      }

      /* Container Utility */
      .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 60px 20px;
      }

      /* Hero Section */
      .hero {
        text-align: center;
        background: linear-gradient(180deg, #eff6ff 0%, #f8fafc 100%);
        padding: 60px 20px 40px 20px;
      }

      .avatar {
        width: 130px;
        height: 130px;
        border-radius: 50%;
        border: 4px solid #ffffff;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        object-fit: cover;
        margin-bottom: 16px;
      }

      .hero h1 {
        font-size: 32px;
        margin-bottom: 8px;
        color: #0f172a;
      }

      .tagline {
        display: inline-block;
        background-color: #dbeafe;
        color: #1d4ed8;
        padding: 6px 16px;
        border-radius: 999px;
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 16px;
      }

      /* Section Headers */
      .section-title {
        font-size: 24px;
        color: #0f172a;
        margin-bottom: 20px;
        border-left: 4px solid #2563eb;
        padding-left: 12px;
      }

      /* Skills Badges */
      .skills-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-top: 16px;
      }

      .skill-pill {
        background-color: #ffffff;
        border: 1px solid #cbd5e1;
        padding: 10px 20px;
        border-radius: 12px;
        font-weight: 600;
        font-size: 14px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      }

      /* Hobbies Cards Grid */
      .hobbies-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 20px;
        margin-top: 20px;
      }

      .hobby-card {
        background: #ffffff;
        border-radius: 16px;
        padding: 24px;
        border: 1px solid #e2e8f0;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.03);
        transition: transform 0.3s, box-shadow 0.3s;
      }

      .hobby-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 12px 20px rgba(0, 0, 0, 0.08);
      }

      .hobby-icon {
        font-size: 32px;
        margin-bottom: 12px;
      }

      /* Contact Form */
      .contact-card {
        background-color: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 16px;
        padding: 32px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.03);
      }

      .form-group {
        margin-bottom: 20px;
      }

      .form-group label {
        display: block;
        font-weight: 600;
        margin-bottom: 6px;
        font-size: 14px;
      }

      .form-group input,
      .form-group textarea {
        width: 100%;
        padding: 12px 16px;
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        font-family: inherit;
        font-size: 14px;
      }

      .btn-submit {
        background-color: #2563eb;
        color: white;
        border: none;
        padding: 14px 28px;
        border-radius: 8px;
        font-weight: 700;
        font-size: 15px;
        cursor: pointer;
        transition: background-color 0.2s;
      }

      .btn-submit:hover {
        background-color: #1d4ed8;
      }

      /* Footer */
      footer {
        text-align: center;
        padding: 40px 20px;
        color: #94a3b8;
        font-size: 14px;
        border-top: 1px solid #e2e8f0;
      }
    </style>
  </head>
  <body>

    <!-- Sticky Navigation -->
    <nav>
      <a href="#about">About</a>
      <a href="#skills">Skills</a>
      <a href="#hobbies">Hobbies</a>
      <a href="#contact">Contact</a>
    </nav>

    <!-- Hero Header -->
    <header class="hero">
      <img 
        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300" 
        alt="Alex Rivera Portrait" 
        class="avatar"
      >
      <h1>Alex Rivera</h1>
      <span class="tagline">Class 7 Junior Web Creator 🚀</span>
      <p style="max-width: 500px; margin: 0 auto; color: #64748b;">
        Passionate about crafting colourful websites, science club projects and exploring astronomy.
      </p>
    </header>

    <!-- Main Content -->
    <main class="container">

      <!-- 1. About Section -->
      <section id="about" style="margin-bottom: 50px;">
        <h2 class="section-title">About Me</h2>
        <p style="margin-bottom: 16px;">
          Welcome to my digital corner of the web! I began my coding journey this year in Class 7. 
          When I wrote my very first <code>&lt;h1&gt;Hello World!&lt;/h1&gt;</code> tag, I was instantly hooked on 
          the power of building things for the screen.
        </p>
        <p>
          My dream is to become a front-end web designer and software engineer who creates educational tools 
          that help kids around the world learn maths and science!
        </p>
      </section>

      <!-- 2. Skills Section -->
      <section id="skills" style="margin-bottom: 50px;">
        <h2 class="section-title">My Toolkit & Skills</h2>
        <div class="skills-grid">
          <div class="skill-pill">🌐 HTML5 Semantics</div>
          <div class="skill-pill">🎨 CSS3 & Flexbox</div>
          <div class="skill-pill">📱 Responsive Design</div>
          <div class="skill-pill">🤖 Lego Mindstorms</div>
          <div class="skill-pill">🐍 Python Basics</div>
        </div>
      </section>

      <!-- 3. Hobbies Section -->
      <section id="hobbies" style="margin-bottom: 50px;">
        <h2 class="section-title">When I'm Not Coding...</h2>
        <div class="hobbies-grid">
          <div class="hobby-card">
            <div class="hobby-icon">🔭</div>
            <h3>Stargazing</h3>
            <p style="color:#64748b; font-size:14px;">Tracking the moons of Jupiter with my backyard telescope.</p>
          </div>
          <div class="hobby-card">
            <div class="hobby-icon">🛹</div>
            <h3>Skateboarding</h3>
            <p style="color:#64748b; font-size:14px;">Practicing kickflips and cruising through the local park.</p>
          </div>
          <div class="hobby-card">
            <div class="hobby-icon">♟️</div>
            <h3>Chess Strategy</h3>
            <p style="color:#64748b; font-size:14px;">Solving a chess puzzle every day with my grandfather.</p>
          </div>
        </div>
      </section>

      <!-- 4. Contact Section -->
      <section id="contact">
        <h2 class="section-title">Get In Touch</h2>
        <div class="contact-card">
          <form>
            <div class="form-group">
              <label for="name">Your Name</label>
              <input type="text" id="name" placeholder="e.g. Maya Chen" required>
            </div>
            <div class="form-group">
              <label for="email">Your Email</label>
              <input type="email" id="email" placeholder="maya@srinagar.edu.in" required>
            </div>
            <div class="form-group">
              <label for="msg">Message</label>
              <textarea id="msg" rows="4" placeholder="Say hello or suggest a project idea!"></textarea>
            </div>
            <button type="submit" class="btn-submit">Send Message 🚀</button>
          </form>
        </div>
      </section>

    </main>

    <!-- Footer -->
    <footer>
      <p>&copy; 2026 Alex Rivera. Built with clean HTML & CSS. All rights reserved.</p>
    </footer>

  </body>
</html>
```

---

## 🔍 Code Explanation: Key Project Techniques

- `html { scroll-behavior: smooth; }`: **A delightful modern touch!** When a visitor taps `<a href="#hobbies">Hobbies</a>` in the top navbar, the browser glides down smoothly to the section instead of teleporting abruptly!
- `grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));`:
  - The ultimate responsive grid trick!
  - On a wide laptop screen, it places all 3 hobby cards in a single row.
  - As the screen narrows, cards automatically wrap onto new rows without needing media queries!
- `.avatar`: Combines `width: 130px; height: 130px; border-radius: 50%;` and `object-fit: cover;` to produce a portrait circle.

---

## 🌍 Real-World Connection: Professional Resumes & Portfolios

Every web designer, engineer, and digital creator has their own personal website:
- When you apply for a high school robotics team, a summer coding camp, or a university scholarship, sending a link to your live, custom-built website makes you stand out miles ahead of everyone else!

---

## 🔮 Predict the Output

If you click `<a href="#contact">Contact</a>` in the navigation bar, how does the browser know where on the page to jump?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer: Through the <code>id</code> attribute!</strong> 
The link has <code>href="#contact"</code>, and the section has <code>id="contact"</code>. The hashtag symbol <code>#</code> instructs the browser to find the element whose unique ID matches that exact word!
</details>

---

## 🕵️ Code Detective: The Mismatched Anchor Link

A student clicked their "About" link, but nothing happened:

```html
<!-- Broken Code -->
<a href="#about-me">About</a>

<section id="aboutme">
  <h2>About Me</h2>
</section>
```

- **Find the mistake**: Look at the spelling of the ID: `#about-me` vs `aboutme`!
- **Explain the mistake**: Anchor jump links are case-sensitive and must match character-for-character! The hyphen in `#about-me` caused the link to fail.
- **Fix the code**: Make both IDs match: `href="#about-me"` and `id="about-me"`!

---

## 🎨 Think Like a Web Designer: Color Palette Harmony

Notice the colors used in Alex's profile:
- Primary Blue: `#2563eb`
- Soft Tint: `#eff6ff`
- Deep Charcoal: `#0f172a`
- Neutral Canvas: `#f8fafc`
- **Result**: The entire page feels calm, unified, clean, and modern!

---

## 🚀 Mini Challenge: Add a "Project Showcase" Section

Add a new `<section id="projects">` between Skills and Hobbies:
- Add an `<h2>Projects I've Built</h2>`.
- Add 2 project cards showing websites or school projects you have made.
- Add an anchor link in the top `<nav>`: `<a href="#projects">Projects</a>`.

---

## ⚠️ Common Mistake

A common mistake is forgetting `box-sizing: border-box` on form fields that are `width: 100%`.

```css
/* Wrong */
.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #cbd5e1;
}
```

**What happens:** the box is 100% wide **plus** 24px of padding and 2px of border. The fields stick out past the right edge of the form, and on a phone the page scrolls sideways.

```css
/* Fixed */
.form-group input {
  box-sizing: border-box;
  width: 100%;
  padding: 12px;
  border: 1px solid #cbd5e1;
}
```

A second, very important point: a profile page is **public**. Never put your home address, phone number, school timetable or a photo in school uniform on it. Use a first name or nickname and a contact form or a parent-approved email. Your personal data is an *amānah* (a trust) to protect.

---

## ✍️ Try It

**Personalize Alex's Page**

Open `personal-profile.html` and make it your own:
1. Change the `<h1>` to your real name.
2. Update the tagline to your favorite interest (e.g., *"Junior Web Developer & Football Player"*).
3. Replace the 3 hobbies with your actual favorite weekend passions!

---

## 📝 Recap

- A personal profile site integrates all foundational HTML and CSS skills into a coherent project.
- Use semantic `<nav>`, `<header>`, `<main>`, `<section>`, and `<footer>` containers.
- `scroll-behavior: smooth` creates elegant internal link navigation.
- Flexbox and CSS Grid organize skills badges and hobby cards effortlessly.
- Forms collect visitor messages with clean inputs and action buttons.

---

## 📖 Key Terms

| Term | What It Means |
| :--- | :--- |
| **Personal Profile Site** | A digital presence showcasing an individual's background, skills, and projects. |
| **In-Page Anchor** | A link using `#id` that scrolls directly to a specific section on the same page. |
| **`scroll-behavior: smooth`**| CSS property enabling animated scrolling when clicking anchor links. |
| **Hero Section** | The prominent top header introducing the page topic and identity. |
| **Pill Badge** | A compact chip element used to display tags, categories, or skills. |

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which CSS property makes in-page link jumps scroll smoothly?
2. How do you link to a section with `id="skills"`?
3. Which `border-radius` percentage turns a square photo into a circle?

<details>
<summary>Show answer</summary>

1. `scroll-behavior: smooth;` on the `html` element.
2. `<a href="#skills">Skills</a>`.
3. `50%`.

</details>

### 🟡 Level 2: Apply
4. Write HTML and CSS for a row of 3 badges, "HTML", "CSS" and "JavaScript", with soft blue backgrounds.
5. Why do the `<section>` elements of a one-page site need `id` attributes?

<details>
<summary>Show answer</summary>

4.
```html
<div class="badges">
  <span class="badge">HTML</span>
  <span class="badge">CSS</span>
  <span class="badge">JavaScript</span>
</div>
```

```css
.badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.badge {
  background-color: #dbeafe;
  color: #1e40af;
  padding: 6px 14px;
  border-radius: 999px;
  font-weight: bold;
}
```

5. An `id` gives each section a unique name. Menu links such as `href="#contact"` use that name to jump to the right place on the page.

</details>

### 🔴 Level 3: Challenge
Add a row of link buttons under the avatar.
1. Under the avatar in the hero, add a `<div class="links">` with three links: GitHub, Scratch and Email.
2. Use Flexbox to centre them in a row with a `gap`.
3. Make each link a rounded button with padding.
4. On hover, grow the button a little with `transform: scale(1.08);` and a smooth `transition`.

<details>
<summary>Show one possible answer</summary>

```html
<div class="links">
  <a href="https://github.com/">GitHub</a>
  <a href="https://scratch.mit.edu/">Scratch</a>
  <a href="mailto:alex@example.org">Email</a>
</div>
```

```css
.links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 16px;
}
.links a {
  background-color: #1e293b;
  color: #ffffff;
  text-decoration: none;
  padding: 10px 18px;
  border-radius: 999px;
  transition: transform 0.2s;
}
.links a:hover {
  transform: scale(1.08);
}
```

Three dark pill buttons sit in a centred row under the photo. Each grows slightly when the mouse is over it. The email uses an example address; for a real page, ask a parent or teacher which contact is safe to share.

</details>
