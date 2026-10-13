# Chapter 10: CSS Grid 🧇

---

## 🌟 Real-Life Story

**The Picture Book Page & The Waffle Iron**

Imagine opening a colorful picture book about the solar system:
- On the page, the artist doesn't just draw one long line of pictures.
- The page is divided into a **2-dimensional grid of panels**:
  - Two panels across the top.
  - Three smaller panels in the middle row.
  - One wide panoramic panel of the night sky stretching across the entire bottom!

Or think of a hot waffle iron: it has rows and columns crossing each other, stamping perfect square pockets into the waffle batter.

**Flexbox was designed for 1 dimension (either a single row OR a single column).**
**CSS Grid is designed for 2 dimensions (rows AND columns at the exact same time)!**
With CSS Grid, you can build photo galleries, magazine layouts and dashboard cards quickly.

---

## 🎯 What You Will Learn

By the end of this chapter, you will be able to:
- Turn on CSS Grid with `display: grid;` and set columns with `grid-template-columns`.
- Share space with the `fr` unit (a fraction of the free space).
- Write repeated columns quickly with `repeat()`.
- Space rows and columns evenly with `gap` and build a photo gallery.

---

## 👁️ Visual Concept Explanation

### CSS Grid 2D Track System

![CSS Grid 2D Architecture](../assets/diagrams/css/css-grid-2d.svg)

### Flexbox (1D) vs. CSS Grid (2D)

```text
FLEXBOX: one direction at a time
┌───┐ ┌───┐ ┌───┐ ┌───┐
│ 1 │ │ 2 │ │ 3 │ │ 4 │
└───┘ └───┘ └───┘ └───┘
(a row OR a column)

GRID: rows AND columns together
┌────────┬────────┬────────┐
│ row 1  │ row 1  │ row 1  │
├────────┼────────┼────────┤
│ row 2  │ row 2  │ row 2  │
└────────┴────────┴────────┘
```

### The `fr` Unit (Free Space Fraction)

Instead of calculating percentages like `33.333%`, Grid gives us the `fr` unit:

```text
grid-template-columns: 1fr 1fr 1fr;
  3 equal slices of the width
  [  1fr  ][  1fr  ][  1fr  ]

grid-template-columns: 1fr 2fr 1fr;
  the middle one gets twice as much
  [ 1fr ][    2fr     ][ 1fr ]
```

---

## 💻 Code Example: The Photo Gallery

We will build `gallery-grid.html` in four small steps. Type each part into the same file, in order.

### Step 1: The Page Skeleton

Start with the page frame. The `<style>` tag is empty for now; Steps 3 and 4 go inside it.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Grid Photo Gallery</title>
    <style>
      /* Step 3 and Step 4 go here */
    </style>
  </head>
  <body>
    <header class="gallery-header">
      <h1>Wonders of Architecture</h1>
      <p>A photo gallery built with CSS Grid.</p>
    </header>

    <!-- Step 2 goes here -->
  </body>
</html>
```

If you open the file now, you see only a heading and one line of text.

### Step 2: The Six Gallery Cards

Each card is a `<div>` with a photo and a caption. Put this where it says `<!-- Step 2 goes here -->`.

```html
<main class="grid-gallery">
  <div class="gallery-card">
    <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400" alt="A bright, simple room">
    <div class="card-caption">Minimalist Interior</div>
  </div>
  <div class="gallery-card">
    <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400" alt="A tall glass building">
    <div class="card-caption">Glass Skyscraper</div>
  </div>
  <div class="gallery-card">
    <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400" alt="A white house at sunset">
    <div class="card-caption">Sunset Villa</div>
  </div>
  <div class="gallery-card">
    <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400" alt="An open city apartment">
    <div class="card-caption">Urban Loft</div>
  </div>
  <div class="gallery-card">
    <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400" alt="A modern family house">
    <div class="card-caption">Suburban Haven</div>
  </div>
  <div class="gallery-card">
    <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400" alt="A house with a garden">
    <div class="card-caption">Garden House</div>
  </div>
</main>
```

Refresh the page. The six photos sit in one long column, one under another, at different sizes. That is normal: we have not added any layout yet.

### Step 3: The Base Styles

These rules reset the spacing and style the header. Put them inside `<style>`.

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f8fafc;
  padding: 40px 20px;
}

.gallery-header {
  text-align: center;
  margin-bottom: 32px;
}

.gallery-header h1 {
  color: #1e293b;
  margin-bottom: 8px;
}

.gallery-header p {
  color: #64748b;
}
```

The heading is now centred on a soft grey page. The photos are still in one column.

### Step 4: The Grid and the Cards

Now the important part. Add these rules below Step 3, still inside `<style>`.

```css
/* THE GRID CONTAINER */
.grid-gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
  gap: 20px;          /* space between rows and columns */
  max-width: 1000px;
  margin: 0 auto;     /* centre the grid on the page */
}

/* ONE CARD */
.gallery-card {
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;   /* keeps the photo inside the round corners */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.06);
}

.gallery-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;  /* crops instead of squashing */
  display: block;
}

.card-caption {
  padding: 16px;
  font-weight: 600;
  color: #334155;
  font-size: 15px;
}
```

Refresh once more. The six cards snap into **3 columns and 2 rows**, with even 20px gaps. Every photo is the same height.

> 📱 On a narrow phone, three columns are very thin. In Chapter 12 you will learn media queries, which let the grid show 1 column on phones and 3 on wide screens.

---

## 🔍 Code Explanation: Breaking Down the Grid

- `display: grid;`: Declares that `.grid-gallery` is now a 2D Grid container.
- `grid-template-columns: repeat(3, 1fr);`:
  - `repeat(3, 1fr)` is a clean shortcut for writing `1fr 1fr 1fr`.
  - It commands the browser: *"Create 3 equal columns side-by-side!"*
  - If you put 6 items inside the container, the browser places the first 3 on Row 1, and automatically drops the remaining 3 onto Row 2!
- `gap: 20px;`: Automatically inserts an even 20-pixel moat between every column and row.
- `object-fit: cover;` on the image: **A web developer's best friend!** If some of your photos are tall and others are wide, `object-fit: cover` trims them smartly so every image fills its 200px box without looking squished or distorted!

---

## 🌍 Real-World Connection: Digital Libraries & Specimen Galleries

Open a modern **Digital Library Catalog** or **Wikimedia Commons**:
- The clean, responsive grid of book covers, historic manuscripts, or nature photos is built using CSS Grid!
- With Grid, no matter how many books or items exist in a collection, they line up in crisp columns and rows with uniform gaps.

---

## 🔮 Predict the Output

Look at this CSS:

```css
.dashboard {
  display: grid;
  grid-template-columns: 200px 1fr;
}
```

**Question**: How will the space be divided between Column 1 and Column 2?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> Column 1 will have a fixed width of exactly 200px (perfect for a sidebar menu!), and Column 2 (<code>1fr</code>) will stretch to absorb 100% of all remaining space on the screen!
</details>

---

## 🕵️ Code Detective: The Broken Fr Units

A student tried to write a 3-column grid, but the layout broke into a single column:

```css
/* Broken Code */
.gallery {
  display: grid;
  grid-template-columns: 1fr, 1fr, 1fr;
}
```

- **Find the mistake**: Look between the `1fr` values—there are commas!
- **Explain the mistake**: In CSS Grid syntax, column values must be separated by **spaces**, NOT commas! Commas make the entire rule invalid.
- **Fix the code**:
  ```css
  /* Fixed Code */
  .gallery {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  ```

---

## 🎨 Think Like a Web Designer: Consistency in Cards

When building grid galleries, cards look sloppy if one card has 10 lines of text and another has 2 lines, making them mismatched heights.
- Use `object-fit: cover` with fixed heights on images so every picture aligns on the same baseline.
- CSS Grid automatically stretches all cards in a row to match the height of the tallest card in that row!

---

## 🚀 Mini Challenge: The Science Lab Supply Shelf

Build a Science Lab Supply Shelf:
- A container with `display: grid;`, `grid-template-columns: repeat(4, 1fr);`, and `gap: 12px;`.
- Add 8 supply slots with dark square backgrounds (`height: 80px;`).
- Add item emojis inside: 🔬 (Microscope), 🧪 (Test Tube), 🧲 (Magnet), 🌡️ (Thermometer), 🔭 (Telescope), 🧫 (Petri Dish), ⚖️ (Scale), 🔋 (Battery).

---

## ⚠️ Common Mistake

A common mistake is adding a fixed `width` to every grid card.

```css
/* Wrong */
.grid-gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.gallery-card {
  width: 400px;
}
```

**What happens:** the grid already decides each column's width. A fixed 400px card is wider than its column on smaller screens, so cards overlap each other or stick out of the page.

```css
/* Fixed: remove the width and let the grid size the cards */
.gallery-card {
  background-color: #ffffff;
}
```

A second slip is putting `display: grid` on the cards instead of on their **parent**. Like Flexbox, Grid is switched on in the container, and the children become the grid items.

---

## ✍️ Try It

**The 4-Column Upgrade**

Open `gallery-grid.html` in your editor:
1. Change `repeat(3, 1fr)` to `repeat(4, 1fr)`.
2. Save and refresh your browser.
3. **Instantly**, the gallery adapts into 4 columns without changing a single line of HTML!
4. Now change it to `repeat(2, 1fr)` and see how easily it converts into 2 columns!

---

## 📝 Recap

- CSS Grid is a 2-dimensional layout system managing rows and columns simultaneously.
- `display: grid;` turns an element into a grid container.
- `grid-template-columns` defines the number and widths of columns.
- The `fr` unit represents a fraction of free space.
- `repeat(count, size)` provides a concise way to define multiple identical columns.
- `gap` sets gutters between both rows and columns.

---

## 📖 Key Terms

| Term | What It Means |
| :--- | :--- |
| **CSS Grid** | A 2-dimensional grid-based layout system for CSS. |
| **`fr` (Fraction)** | A flexible unit representing a share of available space in a grid container. |
| **`repeat()`** | A CSS function that simplifies repeating column/row definitions. |
| **`grid-template-columns`** | Property defining track sizes of columns in a grid. |
| **`object-fit`** | Specifies how an image or video should resize to fit its container box. |

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. How many dimensions does CSS Grid handle at the same time?
2. What does `repeat(4, 1fr)` mean in plain words?
3. Which unit means "a fraction of the free space"?

<details>
<summary>Show answer</summary>

1. **Two**: rows and columns.
2. "Make 4 columns that each get one equal share of the space", the same as `1fr 1fr 1fr 1fr`.
3. The `fr` unit.

</details>

### 🟡 Level 2: Apply
4. Write CSS for a 2-column layout: the left column is fixed at `250px` and the right column fills the rest.
5. Why is `gap: 15px;` better than adding margins to each grid card?

<details>
<summary>Show answer</summary>

4.
```css
.layout {
  display: grid;
  grid-template-columns: 250px 1fr;
}
```

5. `gap` puts space only **between** the cards, never on the outside edges. Margins add space on every side of every card, so the edges get extra space and the spacing is harder to keep even.

</details>

### 🔴 Level 3: Challenge
Make a featured article.
1. Look up `grid-column: span 2;`.
2. Build a 3-column grid with 5 article cards and a `gap`.
3. Give the first card a class `featured` that stretches across 2 columns.
4. Check that the other cards each take 1 column.

<details>
<summary>Show one possible answer</summary>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>School News Grid</title>
    <style>
      .news {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
      }
      .news article {
        background-color: #f1f5f9;
        padding: 16px;
        border-radius: 8px;
      }
      .featured {
        grid-column: span 2;
        background-color: #dbeafe;
      }
    </style>
  </head>
  <body>
    <div class="news">
      <article class="featured">Featured: Our Science Fair Winners</article>
      <article>Library Week</article>
      <article>New Garden Beds</article>
      <article>Charity Book Drive</article>
      <article>Sports Day Plans</article>
    </div>
  </body>
</html>
```

The featured card fills the first two columns of row 1, and "Library Week" takes the third. The other three cards fill row 2, one column each.

</details>
