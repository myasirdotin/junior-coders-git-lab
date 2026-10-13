# Chapter 19: School Website 🏫

---

## 🌟 Real-Life Story

**Open House Day**

Imagine your school is hosting an annual Open House for new families:
- Parents and students arrive at the front gates. The school principal greets them in the auditorium with an inspiring welcome address explaining the school’s history and core values.
- Next, student ambassadors guide the families along the hallways to visit different subject departments: the high-tech computer science lab, the vibrant visual arts studio, and the biology greenhouse.
- In each room, friendly teachers introduce themselves, showcase student science projects, and answer questions about homework and clubs.
- Finally, families receive an information packet with contact numbers, office hours, and enrollment forms.

**A School Website serves as your school’s 24/7 digital Open House!**
Parents, teachers, and students visit every day to check announcements, explore courses, learn about teachers, and stay connected. In this chapter, you will build a complete, welcoming, professional school portal!

---

## 🎯 What You Will Learn

By the end of this chapter, you will be able to:
- Plan a school website with a header, banner, courses, teachers and contact sections.
- Build a banner with a darkened photo so white text stays readable.
- Make a courses grid and a teacher directory that adapt to the screen with `auto-fit` and `minmax()`.
- Use school colours as accents while keeping good contrast.

---

## 👁️ Visual Concept Explanation

### The School Website Blueprint

```text
┌─────────────────────────────────┐
│ HEADER: crest, Greenwood        │
│ Academy, nav links              │
├─────────────────────────────────┤
│ BANNER: "Inspiring Curiosity"   │
│ [Enrol Now] [Virtual Tour]      │
├─────────────────────────────────┤
│ ABOUT: history, values, motto   │
├─────────────────────────────────┤
│ COURSES (3-column grid)         │
│ ┌─────────┐┌─────────┐┌───────┐ │
│ │ Coding  ││ Ecology ││ Art   │ │
│ └─────────┘└─────────┘└───────┘ │
├─────────────────────────────────┤
│ MEET OUR TEACHERS               │
│ (•) Ms. Davies  (•) Mr. Zhang   │
├─────────────────────────────────┤
│ CONTACT FOOTER: address,        │
│ office hours, phone             │
└─────────────────────────────────┘
```

---

## 💻 Code Example: The Complete School Website

Type this code into an editor and save it as `school-website.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Greenwood Junior Academy</title>
    <style>
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f8fafc;
        color: #1e293b;
        line-height: 1.6;
      }

      /* Header & Nav */
      .school-header {
        background-color: #ffffff;
        border-bottom: 2px solid #059669; /* School Green */
        position: sticky;
        top: 0;
        z-index: 100;
      }

      .nav-bar {
        max-width: 1100px;
        margin: 0 auto;
        padding: 16px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .school-brand {
        display: flex;
        align-items: center;
        gap: 12px;
        text-decoration: none;
        color: #065f46;
        font-size: 22px;
        font-weight: 800;
      }

      .nav-menu {
        display: flex;
        list-style: none;
        gap: 24px;
      }

      .nav-menu a {
        text-decoration: none;
        color: #334155;
        font-weight: 600;
        font-size: 15px;
        transition: color 0.2s;
      }

      .nav-menu a:hover {
        color: #059669;
      }

      /* Hero Banner */
      .hero-banner {
        background: linear-gradient(rgba(6, 78, 59, 0.85), rgba(6, 78, 59, 0.85)),
                    url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200');
        background-size: cover;
        background-position: center;
        color: #ffffff;
        text-align: center;
        padding: 80px 20px;
      }

      .hero-banner h1 {
        font-size: 40px;
        margin-bottom: 12px;
        font-weight: 800;
      }

      .hero-banner p {
        font-size: 18px;
        max-width: 650px;
        margin: 0 auto 24px auto;
        color: #d1fae5;
      }

      .btn-tour {
        display: inline-block;
        background-color: #f59e0b; /* Golden Amber */
        color: #ffffff;
        padding: 12px 28px;
        border-radius: 999px;
        text-decoration: none;
        font-weight: 700;
        transition: transform 0.2s;
      }

      .btn-tour:hover {
        transform: scale(1.05);
      }

      /* Content Container */
      .content-wrapper {
        max-width: 1100px;
        margin: 0 auto;
        padding: 60px 20px;
      }

      .section-heading {
        text-align: center;
        font-size: 28px;
        color: #065f46;
        margin-bottom: 12px;
      }

      .section-sub {
        text-align: center;
        color: #64748b;
        margin-bottom: 40px;
      }

      /* Courses Grid */
      .course-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 24px;
        margin-bottom: 60px;
      }

      .course-card {
        background-color: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 16px;
        padding: 24px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.03);
        transition: transform 0.3s;
      }

      .course-card:hover {
        transform: translateY(-6px);
      }

      .course-icon {
        font-size: 32px;
        margin-bottom: 12px;
      }

      .course-card h3 {
        color: #1e293b;
        margin-bottom: 8px;
      }

      /* Teachers Section */
      .teacher-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 24px;
        margin-bottom: 60px;
      }

      .teacher-card {
        background-color: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 16px;
        padding: 20px;
        text-align: center;
      }

      .teacher-img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 12px;
        border: 3px solid #059669;
      }

      .teacher-name {
        font-weight: 700;
        font-size: 16px;
      }

      .teacher-role {
        font-size: 13px;
        color: #059669;
        font-weight: 600;
      }

      /* Footer */
      footer {
        background-color: #064e3b;
        color: #d1fae5;
        padding: 40px 20px;
        text-align: center;
        font-size: 14px;
      }
    </style>
  </head>
  <body>

    <!-- Header -->
    <header class="school-header">
      <nav class="nav-bar">
        <a href="#" class="school-brand">
          <span>🎓</span> Greenwood Academy
        </a>
        <ul class="nav-menu">
          <li><a href="#about">About</a></li>
          <li><a href="#courses">Courses</a></li>
          <li><a href="#faculty">Faculty</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>

    <!-- Hero Banner -->
    <section class="hero-banner">
      <h1>Inspiring Tomorrow's Leaders</h1>
      <p>A welcoming environment dedicated to academic excellence, creative discovery, and scientific exploration.</p>
      <a href="#courses" class="btn-tour">Explore Our Programs 🚀</a>
    </section>

    <main class="content-wrapper">

      <!-- About Section -->
      <section id="about" style="margin-bottom: 60px; text-align: center; max-width: 750px; margin-left: auto; margin-right: auto;">
        <h2 class="section-heading">About Our School</h2>
        <p style="color: #475569; font-size: 17px;">
          Founded in 1994, Greenwood Junior Academy fosters curiosity, critical thinking, and empathy. 
          Our students engage in hands-on robotics workshops, outdoor ecological studies, and arts education.
        </p>
      </section>

      <!-- Courses Section -->
      <section id="courses">
        <h2 class="section-heading">Academic Programs</h2>
        <p class="section-sub">Discover the exciting subjects available for Class 7 students.</p>

        <div class="course-grid">
          <div class="course-card">
            <div class="course-icon">💻</div>
            <h3>Computer Science</h3>
            <p style="color: #64748b; font-size: 14px;">Master web programming with HTML5, modern CSS layouts, and basic algorithmic logic.</p>
          </div>

          <div class="course-card">
            <div class="course-icon">🌿</div>
            <h3>Ecological Biology</h3>
            <p style="color: #64748b; font-size: 14px;">Explore plant biodiversity and care for our campus hydroponic organic gardens.</p>
          </div>

          <div class="course-card">
            <div class="course-icon">🎨</div>
            <h3>Digital Media & Art</h3>
            <p style="color: #64748b; font-size: 14px;">Learn graphic design, photography principles, animation, and color theory.</p>
          </div>
        </div>
      </section>

      <!-- Teachers Section -->
      <section id="faculty">
        <h2 class="section-heading">Meet Our Instructors</h2>
        <p class="section-sub">Dedicated educators passionate about inspiring every student.</p>

        <div class="teacher-grid">
          <div class="teacher-card">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200" alt="Ms. Robinson" class="teacher-img">
            <div class="teacher-name">Ms. Elena Robinson</div>
            <div class="teacher-role">Head of Computer Science</div>
          </div>

          <div class="teacher-card">
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200" alt="Mr. Chen" class="teacher-img">
            <div class="teacher-name">Mr. David Chen</div>
            <div class="teacher-role">Mathematics & Robotics</div>
          </div>

          <div class="teacher-card">
            <img src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=200" alt="Dr. Aris" class="teacher-img">
            <div class="teacher-name">Dr. Sarah Aris</div>
            <div class="teacher-role">Environmental Sciences</div>
          </div>
        </div>
      </section>

    </main>

    <!-- Footer -->
    <footer id="contact">
      <p style="font-weight: 700; margin-bottom: 8px;">Greenwood Junior Academy</p>
      <p style="margin-bottom: 16px;">Rajbagh, Srinagar, Jammu and Kashmir • +91-94190-12345 • admissions@greenwood.edu.in</p>
      <p>&copy; 2026 Greenwood Academy. All rights reserved.</p>
    </footer>

  </body>
</html>
```

---

## 🔍 Code Explanation: Visual Hierarchy & School Branding

- **School Color Palette**: Notice how the primary color is a calm, academic forest green (`#059669`), paired with a warm golden amber CTA button (`#f59e0b`). Colors create instant identity and trustworthiness!
- `background: linear-gradient(...), url(...)`: Combines a dark translucent green wash with a campus photo backdrop so white headline text remains 100% readable!
- Teacher Cards: Circular portraits with `border: 3px solid #059669;` highlight each teacher’s smile and role.

---

## 🌍 Real-World Connection: School Portals Everywhere

Visit top educational websites like *Stanford Online*, *MIT OpenCourseWare*, or your local district school board:
- Notice how every page clearly divides into: **School Brand -> Hero Announcement -> Courses -> Staff -> Contact**.
- Clear layout prevents confusion for busy parents and students!

---

## 🔮 Predict the Output

If a parent opens this school site on a smartphone (390px wide), what will happen to the 3 course cards?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> The course cards will automatically collapse into a neat, 1-column vertical stack! Because we used <code>grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));</code>, each card refuses to get smaller than 280px, forcing them onto separate rows on narrow screens!
</details>

---

## 🕵️ Code Detective: The Broken Background Wash

A student tried to create a darkened photo banner, but the photo showed with no dark tint, and the white heading was hard to read:

```css
/* Broken Code */
.hero {
  background: url('photo.jpg'), linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5));
}
```

- **Find the mistake**: Look at the order of the background layers!
- **Explain the mistake**: In CSS multi-backgrounds, the layer written **FIRST** sits on top! If you put the photo first, it covers the gradient. To put the tint ON TOP of the photo, write the `linear-gradient` first!
- **Fix the code**: Put the gradient before the URL:
  ```css
  /* Fixed Code */
  .hero {
    background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('photo.jpg');
  }
  ```

---

## 🎨 Think Like a Web Designer: Trust and Accessibility

Educational websites serve diverse audiences: children, elderly grandparents, and visitors with disabilities.
- Use high contrast text.
- Ensure all teacher photos have descriptive `alt` tags (`alt="Portrait of Ms. Elena Robinson smiling"`).
- Make phone numbers and email links clickable with `href="tel:..."` and `href="mailto:..."`!

---

## 🚀 Mini Challenge: The School Mascot Badge

Add a floating school mascot crest in the top right corner:
- Create a badge reading: `🦅 Home of the Golden Eagles`.
- Use a gold background (`#f59e0b`) with navy text.
- Pin it in the hero banner!

---

## ⚠️ Common Mistake

A common mistake is choosing school colours that look nice but are hard to read.

```css
/* Wrong: pale gold text on white */
.announcement {
  background-color: #ffffff;
  color: #facc15;
}
```

**What happens:** the **contrast ratio** (how different the text and background colours are in brightness) is far below 4.5 : 1, the minimum for normal text. Many visitors, including grandparents and people with weak eyesight, cannot read it.

```css
/* Fixed: keep gold as a border accent, use dark text */
.announcement {
  background-color: #fefce8;
  border-left: 6px solid #facc15;
  color: #1e293b;
}
```

A second slip is a fixed number of columns, such as `repeat(3, 1fr)`, for the course cards. On a phone each card becomes very thin. `repeat(auto-fit, minmax(280px, 1fr))` lets the grid choose how many columns fit.

---

## ✍️ Try It

**Add an "Events Notice Board"**

Open `school-website.html` in your editor:
1. Add an `<h2>Campus Announcements</h2>` section.
2. Build an HTML table listing:
   - Date: *October 15* | Event: *Annual Science Fair* | Location: *Gymnasium*
   - Date: *November 3* | Event: *Robotics Tournament* | Location: *Lab 4*
3. Save and refresh: You just gave the school an interactive calendar!

---

## 📝 Recap

- School portals require clean, welcoming visual structure and clear navigation.
- Consistent school branding is maintained through thematic colors (e.g., forest green and gold).
- Grids dynamically arrange academic courses and faculty profiles.
- Translucent gradient overlays keep text legible over background images.
- Comprehensive footers store vital contact information and office hours.

---

## 📖 Key Terms

| Term | What It Means |
| :--- | :--- |
| **Portal** | A website functioning as a primary gateway to information and services. |
| **Faculty Directory** | A structured showcase of teachers, staff, and their roles. |
| **Color Wash** | A semi-transparent color gradient layered over a photographic background. |
| **Brand Identity** | The visual elements (colors, logos, fonts) that represent an institution. |
| **`auto-fit`** | A CSS Grid keyword that fits as many tracks into a row as possible. |

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. When you list several backgrounds in one declaration, which layer is on top?
2. Which grid setting keeps course cards at least 280px wide while filling the row?
3. Which HTML tag holds the contact and copyright details at the bottom of the page?

<details>
<summary>Show answer</summary>

1. The **first** one written.
2. `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));`
3. `<footer>`.

</details>

### 🟡 Level 2: Apply
4. Write a link that lets phone users call the school office at `+91-94190-12345` with one tap.
5. Why should you add a dark overlay when you put white text on a photo?

<details>
<summary>Show answer</summary>

4.
```html
<a href="tel:+919419012345">+91-94190-12345</a>
```

The `tel:` link opens the phone's dialler. Remove spaces and dashes inside `href`.

5. Photos have light and dark areas. White text on a bright sky or white wall almost disappears. A half-dark layer makes the whole photo darker, so the white text always has strong contrast.

</details>

### 🔴 Level 3: Challenge
Add a "Daily Lunch Specials" card with a striped table.
1. Make a card with an `<h3>` and a `<table>` of 5 days and their dishes.
2. Give the table `width: 100%` and `border-collapse: collapse;` (this joins the cell borders into single lines).
3. Use `tr:nth-child(even)` to give every second row a light background ("zebra stripes").
4. Add padding to the cells.

<details>
<summary>Show one possible answer</summary>

```html
<div class="lunch-card">
  <h3>Daily Lunch Specials</h3>
  <table>
    <tr><th>Day</th><th>Dish</th></tr>
    <tr><td>Monday</td><td>Vegetable biryani</td></tr>
    <tr><td>Tuesday</td><td>Lentil soup and bread</td></tr>
    <tr><td>Wednesday</td><td>Chicken wrap</td></tr>
    <tr><td>Thursday</td><td>Pasta with tomato sauce</td></tr>
    <tr><td>Friday</td><td>Rice, beans and salad</td></tr>
  </table>
</div>
```

```css
.lunch-card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
.lunch-card table {
  width: 100%;
  border-collapse: collapse;
}
.lunch-card th,
.lunch-card td {
  padding: 10px;
  text-align: left;
}
.lunch-card tr:nth-child(even) {
  background-color: #f1f5f9;
}
```

The header row is row 1, so rows 2, 4 and 6 (Monday, Wednesday, Friday) get the light grey stripe. Stripes help the eye follow each line across.

</details>
