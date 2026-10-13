# Chapter 25: CSS Capstone: Style Your Own Website

---

## 🌟 Real-Life Story

**Furnishing the New Library**

Imagine your school has just finished building a new library. The walls, doors and shelves are all in place. That is like your **HTML capstone**: the structure is done.

But the library is still grey and bare. Now the design team chooses calm wall colours, clear signs and comfortable reading corners. They make sure the signs are big enough to read from the door, and that the aisles are wide enough for a wheelchair.

That is your job in this chapter. You will take the website you built in the HTML book's capstone (Chapter 18) and **style and lay it out with CSS**, step by step, until it looks good and works for everyone on every screen.

---

## 🎯 What You Will Learn

By the end of this chapter, you will be able to:
- Plan a colour palette and check that its text colours have enough contrast.
- Choose and style fonts for headings and body text.
- Lay out your pages with Flexbox and Grid, starting with the phone layout.
- Add media queries so the site adapts to tablets and computers.
- Check your finished site against a CSS rubric before you share it.

---

## The CSS Capstone Workflow

Work in this order. Each step builds on the one before.

```text
1. COLLECT   your HTML capstone files
      │
      ▼
2. PALETTE   3 to 5 colours + contrast
      │
      ▼
3. FONTS     headings, body text, sizes
      │
      ▼
4. BOX MODEL spacing, borders, cards
      │
      ▼
5. LAYOUT    Flexbox (rows) + Grid
             (cards), phone first
      │
      ▼
6. RESPONSIVE media queries for wider
             screens
      │
      ▼
7. POLISH    hover, focus, transitions
      │
      ▼
8. CHECK     rubric + test at 390px
```

Before you start, make sure your HTML capstone has a `<link rel="stylesheet" href="css/style.css">` in the `<head>` of **every** page, and the viewport meta tag:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Without the viewport tag, your media queries will not work on phones (Chapter 14).

---

## Step 1: Choose a Colour Palette

A **palette** is the small set of colours your whole site uses. Five is plenty. Write your palette as a comment at the top of `style.css`, so you use the same codes everywhere:

```css
/* =========================================
   MY PALETTE: Green Valley Eco Club
   text         #1e293b  (dark slate)
   background   #f8fafc  (near white)
   main colour  #0f766e  (deep teal)
   accent       #f59e0b  (warm amber)
   soft text    #475569  (grey for captions)
   ========================================= */
```

Use the **60-30-10 rule** from Chapter 4: about 60% background, 30% main colour, 10% accent.

### Check the contrast

**Contrast ratio** compares how light two colours are, from 1 : 1 (the same) to 21 : 1 (black on white). Normal text needs **at least 4.5 : 1**; large headings need at least 3 : 1. You can measure pairs with a free online contrast checker or in browser DevTools (inspect some text and click its colour swatch).

| Text colour | Background | Ratio | Normal text OK? |
| :--- | :--- | :--- | :--- |
| `#1e293b` | `#ffffff` | 14.63 : 1 | ✅ Yes |
| `#475569` | `#ffffff` | 7.58 : 1 | ✅ Yes |
| `#ffffff` | `#0f766e` | 5.47 : 1 | ✅ Yes |
| `#ffffff` | `#2563eb` | 5.17 : 1 | ✅ Yes |
| `#94a3b8` | `#ffffff` | 2.56 : 1 | ❌ No |
| `#facc15` | `#ffffff` | 1.53 : 1 | ❌ No |

A pale colour like `#facc15` can still be used, but as a border or background, **not** as text on white. And never use colour alone to show meaning: write "Closed" as a word, not only as red.

---

## Step 2: Style the Text

Pick **two fonts at most**: one for headings and one for body text (Chapter 5). Give each a fallback.

```css
body {
  font-family: 'Inter', Arial, sans-serif;
  font-size: 17px;
  line-height: 1.6;
  color: #1e293b;
  background-color: #f8fafc;
  margin: 0;
}

h1,
h2,
h3 {
  font-family: 'Merriweather', Georgia, serif;
  color: #0f766e;
  line-height: 1.2;
}

h1 {
  font-size: 32px;
}

h2 {
  font-size: 24px;
}
```

You will see calm, readable body text and coloured serif headings. Body text of 16px or more is comfortable on phones.

---

## Step 3: Spacing and Cards

Start every stylesheet with `box-sizing: border-box` (Chapter 8), so widths stay the size you set. Then style your repeated blocks, such as cards, once with a class.

```css
* {
  box-sizing: border-box;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 16px;
}

.card {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
}

.card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
}
```

The `.container` keeps lines from becoming too long on wide screens, and its 16px side padding stops text touching the edge of a phone screen.

---

## Step 4: Lay Out the Page, Phone First

Write the **phone layout first**. Most things simply stack, so you need little CSS. Use Flexbox for one row of items (the header) and Grid for groups of cards.

```css
/* Header: logo and menu */
.site-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background-color: #0f766e;
}

.site-header a {
  color: #ffffff;
  text-decoration: none;
  padding: 10px 8px; /* bigger tap area */
}

/* Cards: one column on phones */
.card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}
```

At 390px wide, you see the logo with the links wrapping beneath it, and the cards stacked one under another.

---

## Step 5: Add Breakpoints

Now add `min-width` media queries at the **end** of your stylesheet (Chapter 14). A **breakpoint** is the width where your layout changes. Choose it where your design starts to look stretched, not for a particular device.

```css
/* Tablets: 600px and wider */
@media (min-width: 600px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Computers: 960px and wider */
@media (min-width: 960px) {
  h1 {
    font-size: 44px;
  }

  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

Drag your browser narrower and wider: 1 column, then 2, then 3.

---

## Step 6: Polish and Accessibility

Small details make a site feel finished, and some of them help people who use a keyboard.

```css
.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

a:focus-visible,
button:focus-visible {
  outline: 3px solid #f59e0b;
  outline-offset: 2px;
}
```

`:focus-visible` shows a clear amber ring when someone moves through links with the **Tab** key. Try it: press Tab on your page and check you can always see where you are.

---

## 🌍 Real-World Connection: Design Reviews

Professional teams rarely publish a design without a **review**: someone else checks it against a list before it goes live. They test it on real phones, check the contrast, and try it with only a keyboard. Doing the same with a classmate is good practice, and it is also *iḥsān*: doing your work with care and excellence.

---

## 🕵️ Code Detective: The Page That Scrolls Sideways

A student's site scrolls left and right on a phone. Find the cause:

```css
/* Broken Code */
.banner {
  width: 1000px;
  padding: 40px;
}
```

- **Find the mistake**: The banner has a fixed `width: 1000px`.
- **Explain the mistake**: A phone screen is about 390px wide. A 1000px box is far wider, so the whole page can be scrolled sideways.
- **Fix the code**:
  ```css
  /* Fixed Code */
  .banner {
    max-width: 1000px; /* never wider than 1000px... */
    width: 100%;       /* ...but shrinks to fit */
    padding: 40px 16px;
  }
  ```

---

## ⚠️ Common Mistake

A common capstone mistake is styling each page separately with internal `<style>` tags.

```html
<!-- Wrong: in index.html, about.html and contact.html -->
<style>
  h1 { color: #0f766e; }
</style>
```

**What happens:** the three pages slowly drift apart. You change the heading colour on one page and forget the others, so the site looks like three different websites.

```html
<!-- Fixed: every page links the same file -->
<link rel="stylesheet" href="css/style.css">
```

A second mistake is copying a whole stylesheet from another website. It breaks your layout in ways you cannot explain, and it is not your own work. Learn from other sites, then write your CSS yourself (*amānah* and honesty).

---

## ✍️ Try It

**The 390px Check**

1. Open your styled capstone in Chrome or Edge.
2. Press **F12** and turn on device mode (the phone icon).
3. Set the width to **390px**.
4. Scroll every page. Is there any sideways scrolling? Is any text too small or any button too small to tap?
5. Fix one problem you find, then check again.

Hint: if the page scrolls sideways, look for a fixed `width` in pixels or an image without `max-width: 100%`.

---

## 📝 Recap

- Style your HTML capstone in order: palette, fonts, spacing, layout, breakpoints, polish.
- Keep one external stylesheet for every page, with your palette written at the top.
- Normal text needs a contrast ratio of at least 4.5 : 1. Never show meaning by colour alone.
- Build the phone layout first, then add `min-width` media queries for wider screens.
- Check the finished site at 390px wide and with only the keyboard.

---

## 📖 Key Terms

| Term | What It Means |
| :--- | :--- |
| **Palette** | The small set of colours a website uses everywhere. |
| **Contrast ratio** | How different two colours are in lightness, from 1 : 1 to 21 : 1. |
| **Breakpoint** | The screen width where a media query changes the layout. |
| **Mobile-first** | Writing the phone styles first, then adding rules for wider screens. |
| **`:focus-visible`** | A pseudo-class that styles an element when it is reached with the keyboard. |
| **Design review** | Checking a design against a list, often with another person, before publishing. |

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. What is the minimum contrast ratio for normal text?
2. In a mobile-first stylesheet, do you use `min-width` or `max-width` media queries?
3. Name the two layout tools you use for a row of links and for a group of cards.

<details>
<summary>Show answer</summary>

1. **4.5 : 1** (large headings: at least 3 : 1).
2. `min-width`: the phone styles come first, and each query adds rules for wider screens.
3. **Flexbox** for a single row (like the header links) and **Grid** for groups of cards in rows and columns.

</details>

### 🟡 Level 2: Apply
4. Your palette's grey caption colour `#94a3b8` on white has a ratio of 2.56 : 1. What should you do?
5. Write CSS for a `.gallery` that shows 1 column on phones, 2 from 600px and 4 from 1000px.

<details>
<summary>Show answer</summary>

4. It fails for normal text. Choose a darker grey, such as `#475569` (7.58 : 1 on white), or use the pale grey only for borders and decorations.

5.
```css
.gallery {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 600px) {
  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1000px) {
  .gallery {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

</details>

### 🔴 Level 3: Challenge
Finish and review your capstone with this **CSS rubric**. Score each line from 0 to 2 (0 = not yet, 1 = partly, 2 = fully), for a total out of 20.

1. **One stylesheet**: every page links the same external CSS file; no inline styles.
2. **Palette**: 3 to 5 colours, written as a comment and used consistently.
3. **Contrast**: all body text is at least 4.5 : 1; meaning never relies on colour alone.
4. **Typography**: at most two fonts with fallbacks; body text at least 16px; comfortable `line-height`.
5. **Box model**: `box-sizing: border-box`; even spacing; text never touches the screen edge.
6. **Layout**: Flexbox and/or Grid used correctly (no floats or absolute positioning for page layout).
7. **Mobile-first**: works at 390px with no sideways scrolling; tap targets about 44px tall.
8. **Breakpoints**: at least two `min-width` media queries that improve wider screens.
9. **Polish and focus**: gentle hover effects, smooth transitions and a visible `:focus-visible` style.
10. **Clean code**: clear class names, comments for each section, consistent indentation.

Then swap with a classmate, score each other's sites honestly, and fix your two lowest lines.

<details>
<summary>Show one possible answer</summary>

There is no single right website, but a strong stylesheet is usually organised like this outline:

```css
/* 1. PALETTE (comment with 3 to 5 colours) */

/* 2. BASE */
* {
  box-sizing: border-box;
}
body {
  font-family: 'Inter', Arial, sans-serif;
  font-size: 17px;
  line-height: 1.6;
  color: #1e293b;
  background-color: #f8fafc;
  margin: 0;
}

/* 3. HEADER (Flexbox) */
/* 4. CARDS and GRID (one column) */
/* 5. FORMS and BUTTONS */
/* 6. HOVER and FOCUS */

/* 7. BREAKPOINTS (at the end) */
@media (min-width: 600px) {
  /* 2 columns */
}
@media (min-width: 960px) {
  /* 3 columns, bigger headings */
}
```

A site that scores 16 or more out of 20 is ready to share. Congratulations: you have finished the CSS book! 🎉

</details>
