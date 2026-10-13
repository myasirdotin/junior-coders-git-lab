# Chapter 16: Website Cards

---

## 🌟 Real-Life Story

**Fact Cards and Museum Plaques**

Think about printed fact cards—like animal fact cards, planet cards, or revision flash cards:
- Every card is an individual, self-contained package:
  - At the top, there is a vivid picture of the animal or planet.
  - Below the picture is its name in bold letters.
  - Below the name is a short description of where it lives, its size, and a fun fact.
  - At the bottom, there is a small badge, such as "Endangered" or "Gas Giant".
- You can shuffle them, place three of them side-by-side on your desk, or browse through a binder of dozens.

In modern web design, **the card pattern** is one of the most common ways to show information.
Whether you are browsing products on an online bookstore, research articles in a digital library, or courses in an academy portal, almost everything you click on is a **Card**!

---

## 🎯 What You Will Learn

By the end of this chapter, you will be able to:
- Name the 4 usual parts of a card: **image**, **title**, **description** and **action button**.
- Give cards depth with padding, borders, rounded corners and shadows.
- Keep photos neat with `object-fit: cover` and clip them to round corners with `overflow: hidden`.
- Line up the card footer with Flexbox and lift the card on hover.

---

## Visual Concept Explanation

### Anatomy of a High-Converting Modern Card

```text
┌─ .card ──────────────────────────┐
│ border-radius: 16px;             │
│ overflow: hidden; box-shadow     │
│ ┌──────────────────────────────┐ │
│ │        IMAGE HEADER          │ │
│ │ object-fit: cover;           │ │
│ │ height: 200px;               │ │
│ └──────────────────────────────┘ │
│ ┌─ .card-body (padding: 20px) ─┐ │
│ │ [category tag]               │ │
│ │ <h3> Card title </h3>        │ │
│ │ <p> A short description,     │ │
│ │     easy to read. </p>       │ │
│ │ ┌──────────┐ ┌─────────────┐ │ │
│ │ │ $29.99   │ │ ADD TO CART │ │ │
│ │ └──────────┘ └─────────────┘ │ │
│ └──────────────────────────────┘ │
└──────────────────────────────────┘
```

---

## Code Example: The Smart Gadget Product Card

Type this into your editor and save it as `product-card.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Modern Product Card</title>
    <style>
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      body {
        font-family: Arial, sans-serif;
        background-color: #f1f5f9;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        padding: 20px;
      }

      /* =========================================
         THE MASTER CARD CONTAINER
         ========================================= */
      .product-card {
        width: 320px;
        background-color: #ffffff;
        border-radius: 20px;
        overflow: hidden; /* Clips image corners to match 20px radius! */
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
        border: 1px solid #e2e8f0;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      /* Hover Elevation Effect */
      .product-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
      }

      /* Card Top Image */
      .card-media {
        position: relative;
        height: 220px;
        background-color: #e2e8f0;
      }

      .card-media img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      /* Floating Category Tag */
      .category-badge {
        position: absolute;
        top: 14px;
        left: 14px;
        background-color: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(4px);
        color: #2563eb;
        font-size: 11px;
        font-weight: 800;
        text-transform: uppercase;
        padding: 4px 10px;
        border-radius: 999px;
      }

      /* Card Body (Padding & Content) */
      .card-body {
        padding: 24px;
      }

      .product-title {
        font-size: 18px;
        font-weight: 700;
        color: #1e293b;
        margin-bottom: 8px;
        line-height: 1.3;
      }

      .product-desc {
        font-size: 14px;
        color: #64748b;
        line-height: 1.5;
        margin-bottom: 20px;
      }

      /* Bottom Action Bar */
      .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #f1f5f9;
        padding-top: 16px;
      }

      .price-tag {
        font-size: 22px;
        font-weight: 800;
        color: #059669;
      }

      .btn-cart {
        background-color: #2563eb;
        color: white;
        border: none;
        padding: 10px 18px;
        border-radius: 10px;
        font-weight: 700;
        font-size: 14px;
        cursor: pointer;
        transition: background-color 0.2s;
      }

      .btn-cart:hover {
        background-color: #1d4ed8;
      }
    </style>
  </head>
  <body>
    <div class="product-card">
      <!-- Media Area -->
      <div class="card-media">
        <span class="category-badge">Audio Tech</span>
        <img 
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" 
          alt="Wireless Studio Headphones"
        >
      </div>

      <!-- Content Area -->
      <div class="card-body">
        <h3 class="product-title">SonicPro Wireless Headphones</h3>
        <p class="product-desc">
          Active noise cancellation with 40-hour battery life and ultra-comfortable memory foam cushions.
        </p>

        <!-- Footer Action -->
        <div class="card-footer">
          <div class="price-tag">$79.99</div>
          <button class="btn-cart">Add to Cart 🛒</button>
        </div>
      </div>
    </div>
  </body>
</html>
```

---

## Code Explanation: The Craft of Card Building

- `overflow: hidden;` on `.product-card`:
  - When you give `.product-card` a `border-radius: 20px;`, the square corners of the image at the top would normally poke out past the rounded corners of the card!
  - `overflow: hidden;` acts like a cookie cutter, trimming the top-left and top-right edges of the image to match the card's 20px curve perfectly!
- `.card-footer`:
  - Uses `display: flex; justify-content: space-between; align-items: center;`.
  - Automatically pins the price tag to the left and the "Add to Cart" button to the right!
- `.category-badge`:
  - Uses `position: absolute; top: 14px; left: 14px;` hovering over the image, anchored by the `position: relative;` on `.card-media`.

---

## 🌍 Real-World Connection: Component-Driven Web Design

Why is every big tech framework (React, Vue, Tailwind) built around cards?
- Because a card is a **Reusable Component**!
- Once you write the CSS for `.product-card`, you can display 1 product, 10 products, or 10,000 products by simply feeding new titles and pictures into the exact same HTML template!

---

## 🔮 Predict the Output

What will happen if you forget `overflow: hidden;` on `.product-card`?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> The top-left and top-right corners of the image will poke out with sharp 90-degree points, ruining the smooth rounded look of your card! <code>overflow: hidden</code> is the rule that clips everything inside the card boundaries!
</details>

---

## 🕵️ Code Detective: The Squashed Image

A student tried to build a card, but the photo of a tall lighthouse got squashed down like a flat pancake:

```css
/* Broken Code */
.card img {
  width: 100%;
  height: 200px;
}
```

- **Find the mistake**: Look at what property is missing from the image rule!
- **Explain the mistake**: Forcing a fixed width AND fixed height without `object-fit` stretches and distorts image aspect ratios!
- **Fix the code**: Add `object-fit: cover;`!
  ```css
  /* Fixed Code */
  .card img {
    width: 100%;
    height: 200px;
    object-fit: cover; /* Keeps proportions crisp! */
  }
  ```

---

## Think Like a Web Designer: Card Breathing Room

Look inside `.card-body`:
- Many beginners put `padding: 5px;` and smash the text against the card borders.
- Professional designs use generous `padding: 20px;` to `24px;`.
- Padding gives content elegance, dignity, and readability!

---

## Mini Challenge: The Recipe Card

Create a recipe card for *Homemade Berry Pancakes*:
- Top image of golden pancakes with syrup.
- Badge hovering on image: `⏱️ 15 Mins`.
- Title: *Fluffy Blueberry Pancakes*.
- Short description with prep notes.
- Footer with *Difficulty: Easy* and a green button saying *View Recipe 📖*.

---

## ⚠️ Common Mistake

A common mistake is giving cards a fixed `height` so they "line up".

```css
/* Wrong */
.card {
  height: 350px;
}
```

**What happens:** when a title or description is longer, or the text is bigger on a phone, the words spill out of the bottom of the card and cover the next one.

```css
/* Fixed: let the content decide the height */
.card {
  min-height: 350px; /* at least 350px, but can grow */
}
```

A second slip is forgetting `alt` text on card images. Every card photo needs a short `alt` that says what it shows, such as `alt="Solar desk lamp"`, so screen-reader users know what the card is about.

---

## ✍️ Try It

**The 3-Card Storefront**

Wrap the `.product-card` inside a container:
```html
<div class="store-grid" style="display: flex; gap: 24px; flex-wrap: wrap;">
  <!-- Duplicate the product card 3 times with different headphones or watches! -->
</div>
```
Preview in browser: You now have a complete, professional e-commerce product row ready for customers!

---

## 📝 Recap

- The Card Pattern is the foundational layout building block of modern web applications.
- The 4 core components are Media Header, Title, Description, and Action Footer.
- `overflow: hidden;` on the card container cleanly clips nested media to rounded corners.
- `object-fit: cover;` prevents image stretching and distortion.
- Internal Flexbox keeps prices and buttons balanced along the bottom baseline.
- Subtle hover transformations give cards tactile depth.

---

## 📖 Key Terms

| Term | What It Means |
| :--- | :--- |
| **Card Pattern** | A self-contained UI container grouping related information and actionable triggers. |
| **`overflow: hidden`** | Clips any child content that exceeds the container boundaries or border-radius curves. |
| **`object-fit: cover`**| Scales an image to maintain aspect ratio while filling the allotted frame entirely. |
| **Media Area** | The top portion of a card designated for photographic or video previews. |
| **Action Footer** | The bottom section of a card reserved for prices, ratings, and action buttons. |

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which property stops a photo's corners poking out of a rounded card?
2. Which property makes an image fill its height without stretching?
3. Name the 4 usual parts of a web card.

<details>
<summary>Show answer</summary>

1. `overflow: hidden;` on the card.
2. `object-fit: cover;`
3. Image, title, description and action button.

</details>

### 🟡 Level 2: Apply
4. Write CSS for a `.card-footer` that puts a reading time on the left and a "Read More" button on the right using Flexbox.
5. Why do cards work so well on phones?

<details>
<summary>Show answer</summary>

4.
```css
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

5. Each card is a small, complete block of information. On a wide screen cards sit side by side; on a phone they simply stack in one column, and each one still makes sense on its own.

</details>

### 🔴 Level 3: Challenge
Build a course progress card.
1. Make a `.card` with a photo at the top and a body with a title and short text.
2. Between the photo and the body, add a grey track `<div>` 8px tall.
3. Inside the track, add a blue bar that is 75% wide.
4. Under the bar, write "75% completed" in text, so the meaning does not rely on colour alone.

<details>
<summary>Show one possible answer</summary>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Course Card</title>
    <style>
      .card {
        max-width: 320px;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        font-family: Arial, sans-serif;
      }
      .card img {
        width: 100%;
        height: 180px;
        object-fit: cover;
        display: block;
      }
      .track {
        height: 8px;
        background-color: #e2e8f0;
      }
      .bar {
        width: 75%;
        height: 8px;
        background-color: #2563eb;
      }
      .card-body {
        padding: 20px;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <img src="microscope.jpg" alt="A student looking into a microscope">
      <div class="track"><div class="bar"></div></div>
      <div class="card-body">
        <h3>Biology Basics</h3>
        <p>75% completed: 6 of 8 lessons done.</p>
      </div>
    </div>
  </body>
</html>
```

You see a blue bar across three quarters of the grey track, right under the photo, and the text below says the same thing in words.

</details>
