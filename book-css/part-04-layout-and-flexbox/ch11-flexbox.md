# Chapter 11: Flexbox

---

## 🌟 Real-Life Story

**Arranging Books on a Smart Shelf**

Imagine you have a smart wooden bookshelf with a row of buttons:
- When you place 4 books on the shelf, you can press a button and tell the shelf: *"Push all books to the right side!"* Swish—they slide to the right!
- Press another button: *"Center all books directly in the middle of the room!"* Glide—they center perfectly!
- Press a third button: *"Spread out with equal breathing room between every single book!"* Click—they space themselves out with mathematical perfection!
- Even better, if you turn the shelf sideways into a tall tower, all the books automatically stack into a neat vertical column!

For over twenty years, web developers struggled to align things horizontally and center items vertically. Then, **CSS Flexbox** was invented! 

Flexbox (short for **Flexible Box Layout**) is the greatest superpower in modern web design. With just two or three lines of CSS, you can arrange, align, center, and distribute elements with effortless grace!

---

## 🎯 What You Will Learn

By the end of this chapter, you will be able to:
- Turn on Flexbox with `display: flex;` on a **flex container** (the parent) to arrange its **flex items** (the children).
- Change the direction with `flex-direction: row` or `column`.
- Place items along the **main axis** with `justify-content` and across the **cross axis** with `align-items`.
- Space items evenly with `gap` and build a navigation bar.

---

## Visual Concept Explanation

### The Flexbox Axes Architecture

![Flexbox Axes Diagram](../assets/diagrams/css/flexbox-axes.svg)

### The Flexbox Parent-Child Relationship

```text
┌──────────────────────────────────┐
│ FLEX CONTAINER (display: flex;)  │
│                                  │
│ ┌────────┐ ┌────────┐ ┌────────┐ │
│ │ item 1 │ │ item 2 │ │ item 3 │ │
│ └────────┘ └────────┘ └────────┘ │
│ ── main axis (in a row) ──────>  │
└──────────────────────────────────┘
```

### The 4 Most Popular `justify-content` Alignments

```text
flex-start (the default)
[1][2][3]─────────────────

center
────────[1][2][3]────────

flex-end
─────────────────[1][2][3]

space-between
[1]──────────[2]──────────[3]
```

### Centering Anything Perfectly in 3 Lines of Code!

```css
.parent-box {
  display: flex;
  justify-content: center; /* centres along the main axis */
  align-items: center;     /* centres along the cross axis */
}
```

In the default `flex-direction: row`, the **main axis** runs left to right and the **cross axis** runs top to bottom. So here `justify-content` centres across and `align-items` centres up and down. If you change to `flex-direction: column`, the axes swap.

---

## Code Example: The Modern Navigation Bar

Type this into your editor and save it as `navbar-flex.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Flexbox Navigation Bar</title>
    <style>
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      body {
        font-family: Arial, sans-serif;
        background-color: #f1f5f9;
      }

      /* The Master Flexbox Navigation Bar */
      .navbar {
        display: flex;
        justify-content: space-between; /* Logo on left, links on right! */
        align-items: center;            /* Center vertically */
        background-color: #ffffff;
        padding: 16px 32px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      }

      /* Logo */
      .nav-logo {
        font-size: 20px;
        font-weight: 800;
        color: #2563eb;
        text-decoration: none;
      }

      /* Nav Links Container (Also a Flex Container!) */
      .nav-links {
        display: flex;
        list-style: none;
        gap: 24px; /* Clean modern gap between links */
      }

      .nav-links a {
        text-decoration: none;
        color: #475569;
        font-weight: 600;
        font-size: 15px;
        transition: color 0.2s;
      }

      .nav-links a:hover {
        color: #2563eb;
      }

      /* Action Button */
      .btn-signup {
        background-color: #2563eb;
        color: white !important;
        padding: 8px 18px;
        border-radius: 999px;
      }
    </style>
  </head>
  <body>
    <header>
      <nav class="navbar">
        <!-- Brand Logo on the Far Left -->
        <a href="#" class="nav-logo">🚀 CodeAcademy</a>

        <!-- Navigation Links on the Far Right -->
        <ul class="nav-links">
          <li><a href="#">Courses</a></li>
          <li><a href="#">Projects</a></li>
          <li><a href="#">Community</a></li>
          <li><a href="#" class="btn-signup">Sign Up Free</a></li>
        </ul>
      </nav>
    </header>
  </body>
</html>
```

---

## Code Explanation: How the Navbar Works

- `display: flex;` on `.navbar`: Instantly converts `.navbar` into a Flex container. The logo and the `<ul>` list automatically pop side-by-side!
- `justify-content: space-between;`: Takes whatever spare whitespace exists in the browser window and distributes it between the logo and the link list, shoving the logo to the far left and the links to the far right!
- `align-items: center;`: Aligns everything along the cross axis (top to bottom in a row) so the logo and links are balanced and centered from top to bottom.
- `display: flex;` and `gap: 24px;` on `.nav-links`: Flex containers can be nested inside other Flex containers! By applying `display: flex` to the `<ul>`, all the `<li>` items lay out horizontally, and `gap: 24px` puts an exact 24px space between them without needing messy margins!

---

## 🌍 Real-World Connection: How Top Apps Use Flexbox

Every single navigation bar on **Wikipedia**, **GitHub**, **BBC Bitesize**, and **Khan Academy** is powered by Flexbox!
- On **BBC News** and **Al Jazeera**, the top navigation bar uses `justify-content: space-between;`:
  - Left item: News logo and category icon.
  - Middle item: Breaking news headline ticker.
  - Right item: Search bar and language switcher.
- Flexbox makes sure this layout stays balanced whether your browser window is narrow or wide!

---

## 🔮 Predict the Output

Look at this CSS:

```css
.container {
  display: flex;
  justify-content: center;
}
```

**Question**: If you have 3 cards inside `.container`, will they stick to the left, stick to the right, or gather together in the exact middle of the screen?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> They will gather together in the exact middle of the screen! <code>justify-content: center;</code> collects all child items and centers them horizontally along the main row axis.
</details>

---

## 🕵️ Code Detective: The Childish Mistake

A student wanted to center three cards, so they wrote this CSS:

```css
/* Broken Code */
.card {
  display: flex;
  justify-content: center;
}
```

- **Find the mistake**: The student applied `display: flex` to the individual `.card` children instead of the parent container!
- **Explain the mistake**: Flex properties MUST be applied to the **Parent Container** (the shelf), not the individual children! The parent controls the layout of its children.
- **Fix the code**:
  ```css
  /* Fixed Code */
  .cards-container {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  ```

---

## Think Like a Web Designer: The Power of `gap`

In the old days of CSS, developers had to write `margin-right: 15px;` on every child item, and then write `margin-right: 0;` on the very last item to prevent overflow.
- Modern CSS introduced the **`gap` property**:
  ```css
  gap: 20px;
  ```
- It only places spacing **between** items, never adding unwanted outer margins to the edges! It is clean, elegant, and effortless.

---

## Mini Challenge: The 3-Button Club Bar

Build a strip of club buttons:
- Create a parent container with `display: flex;`, `justify-content: center;`, and `gap: 15px;`.
- Add 3 buttons inside: *Library*, *Science Club* and *Eco Club*.
- Give each button a smooth border radius, padding, and its own colour!

---

## ⚠️ Common Mistake

A common mistake is using `justify-content` to centre items up and down in a row.

```css
/* Wrong: the student wants the logo centred top to bottom */
.header {
  display: flex;
  height: 80px;
  justify-content: center;
}
```

**What happens:** in a row, `justify-content` works along the **main axis**, which runs left to right. The logo moves to the middle of the width, but it still sits at the top.

```css
/* Fixed */
.header {
  display: flex;
  height: 80px;
  align-items: center; /* cross axis: top to bottom in a row */
}
```

A second slip: after switching to `flex-direction: column`, students still expect `justify-content` to move items sideways. In a column the axes swap: now `align-items` moves items sideways.

---

## ✍️ Try It

**The Column Switch**

Open `navbar-flex.html` in your editor:
1. In the `.navbar` CSS, add:
   ```css
   flex-direction: column;
   gap: 16px;
   ```
2. Save and refresh your browser.
3. **Look at what happened!** The navigation bar instantly transformed into a mobile-style vertical stack with the logo sitting right above the links!

---

## 📝 Recap

- Flexbox is enabled by setting `display: flex;` on a parent container.
- The parent is the **Flex Container**; direct children are **Flex Items**.
- `flex-direction: row` arranges items horizontally (default).
- `flex-direction: column` arranges items vertically.
- `justify-content` aligns items along the main axis (`flex-start`, `center`, `flex-end`, `space-between`).
- `align-items: center` centers items along the cross axis.
- `gap` creates uniform spacing strictly between items.

---

## 📖 Key Terms

| Term | What It Means |
| :--- | :--- |
| **Flexbox** | Flexible Box Layout: A 1-dimensional CSS layout model. |
| **Flex Container** | The parent element that has `display: flex;` applied. |
| **Flex Item** | Any direct child element inside a flex container. |
| **Main Axis** | The primary direction items flow (horizontal in row mode). |
| **Cross Axis** | The perpendicular direction (vertical in row mode). |
| **`gap`** | CSS property defining the gutters between flex items. |

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which CSS property and value turn on Flexbox?
2. Which `justify-content` value pushes the first and last items to the two ends, with space between?
3. Which property sets the space between flex items without margins?

<details>
<summary>Show answer</summary>

1. `display: flex;` on the parent container.
2. `space-between`.
3. `gap` (for example `gap: 16px;`).

</details>

### 🟡 Level 2: Apply
4. Write the three lines of CSS that centre an item in both directions inside its parent.
5. What happens when you add `flex-direction: column;` to a flex container?

<details>
<summary>Show answer</summary>

4.
```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

The parent also needs a height (for example `min-height: 300px;`), or there is no extra space to centre in.

5. The items stack **top to bottom** instead of side by side. The main axis now runs downwards, so `justify-content` works up and down and `align-items` works side to side.

</details>

### 🔴 Level 3: Challenge
Stop cards from being squashed.
1. Make a flex container with 10 cards, each `width: 150px;`.
2. Make the window narrow and watch the cards get thinner.
3. Add `flex-wrap: wrap;` to the container and try again.
4. Describe the difference.

<details>
<summary>Show one possible answer</summary>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flex Wrap Test</title>
    <style>
      .shelf {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
      }
      .card {
        width: 150px;
        padding: 16px;
        background-color: #dbeafe;
        border-radius: 8px;
      }
    </style>
  </head>
  <body>
    <div class="shelf">
      <div class="card">Book 1</div>
      <div class="card">Book 2</div>
      <div class="card">Book 3</div>
      <div class="card">Book 4</div>
      <div class="card">Book 5</div>
      <div class="card">Book 6</div>
      <div class="card">Book 7</div>
      <div class="card">Book 8</div>
      <div class="card">Book 9</div>
      <div class="card">Book 10</div>
    </div>
  </body>
</html>
```

Without `flex-wrap`, all 10 cards stay on one line: they shrink below 150px, and the words get squashed. With `flex-wrap: wrap;`, cards that do not fit move down to a new line, so every card keeps its 150px width.

</details>
