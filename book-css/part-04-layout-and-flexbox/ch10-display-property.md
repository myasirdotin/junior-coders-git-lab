# Chapter 10: Display Property

---

## 🌟 Real-Life Story

**Heavy Wooden Blocks vs. Rolling Marbles**

Imagine sitting at a craft table with two types of toys:
1. **Large Heavy Wooden Building Blocks**: Each block is wide and solid. If you put one block down on the table, it claims the entire width of that row. If you want to place a second block, you cannot squeeze it beside the first—you have to place it on a new row below!
2. **Smooth Rolling Marbles**: Marbles are small and flexible. You can place three, four, or five marbles right next to each other on the exact same line. They gladly share space side-by-side until the line is full!

**In CSS, every HTML element is either a heavy block or a rolling marble!**
Understanding the `display` property—`block`, `inline`, and `inline-block`—is the master key to controlling how elements sit next to each other or stack on top of each other on your screen!

---

## 🎯 What You Will Learn

By the end of this chapter, you will be able to:
- Identify common **block** elements (`<div>`, `<h1>`, `<p>`, `<ul>`) and **inline** elements (`<span>`, `<a>`, `<strong>`).
- Use `display: inline-block` to place boxes side by side that still accept a width and height.
- Switch an element between block and inline with the `display` property.
- Hide an element completely with `display: none`.

---

## Visual Concept Explanation

### The Three Core Display Personalities

```text
1. display: block  (<div>, <h1>, <p>)
   - starts on a NEW line
   - fills the full width of its parent
   - accepts width, height, padding,
     margin
   ┌──────────────────────────────┐
   │ block: takes the whole row   │
   └──────────────────────────────┘

2. display: inline  (<span>, <a>)
   - sits on the SAME line as text
   - only as wide as its words
   - IGNORES width and height
   [word] [word] [word]

3. display: inline-block
   - sits side by side like inline
   - BUT accepts width and height
   ┌────────┐ ┌────────┐ ┌────────┐
   │ 120px  │ │ 120px  │ │ 120px  │
   └────────┘ └────────┘ └────────┘
```

---

## Code Example: The Display Trio Laboratory

Type this into your editor and save it as `display.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Display Property Lab</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f8fafc;
        padding: 30px;
      }

      /* 1. Block Elements */
      .box-block {
        display: block;
        background-color: #dbeafe; /* Soft blue */
        border: 2px solid #2563eb;
        padding: 12px;
        margin-bottom: 12px;
      }

      /* 2. Inline Elements */
      .tag-inline {
        display: inline;
        background-color: #fef3c7; /* Soft yellow */
        border: 2px solid #d97706;
        padding: 8px;
        /* Note: width and height will be ignored here! */
      }

      /* 3. Inline-Block Elements */
      .card-inline-block {
        display: inline-block;
        width: 140px;
        height: 100px;
        background-color: #d1fae5; /* Soft green */
        border: 2px solid #059669;
        padding: 12px;
        margin-right: 12px;
        vertical-align: top;
        border-radius: 8px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <h1>Testing CSS Display Modes</h1>

    <!-- 1. Block Elements -->
    <h2>1. Block Elements (Stack vertically)</h2>
    <div class="box-block">Block Box 1 (Takes full row)</div>
    <div class="box-block">Block Box 2 (Pushed to new row)</div>

    <!-- 2. Inline Elements -->
    <h2>2. Inline Elements (Flow side-by-side)</h2>
    <p>
      Here is a paragraph with 
      <span class="tag-inline">Inline Tag A</span> and 
      <span class="tag-inline">Inline Tag B</span> sitting right inside the sentence.
    </p>

    <!-- 3. Inline-Block Elements -->
    <h2>3. Inline-Block Elements (Side-by-side with fixed sizes!)</h2>
    <div class="card-inline-block">Card 1<br>(140x100px)</div>
    <div class="card-inline-block">Card 2<br>(140x100px)</div>
    <div class="card-inline-block">Card 3<br>(140x100px)</div>
  </body>
</html>
```

---

## Code Explanation: Observing Behaviors

- `.box-block`: Notice how Block Box 1 and Block Box 2 refuse to sit next to each other! Even though their text is short, each `<div>` expands to fill the entire horizontal screen, pushing the next box downward.
- `.tag-inline`: The `<span>` elements only occupy as many pixels as their letters need. They flow seamlessly inside the paragraph without breaking the sentence!
- `.card-inline-block`: **The hero of early web layouts!** Notice that all 3 green cards sit side-by-side on the same horizontal row, yet they obey our `width: 140px;` and `height: 100px;` rules perfectly!

---

## 🌍 Real-World Connection: Turning Links into Buttons

By default, an anchor tag (`<a>`) is an **inline element**:
- If you try to give an `<a>` tag `padding-top: 20px;` or `width: 200px;`, it will look glitchy and weird because inline tags don't respect vertical block spacing.
- Every professional button on the web uses:
  ```css
  a.btn {
    display: inline-block;
    padding: 12px 24px;
  }
  ```
- Changing `display` to `inline-block` transforms the delicate inline text link into a sturdy, click-friendly physical button!

---

## 🔮 Predict the Output

Look at this CSS:

```css
span {
  width: 300px;
  height: 200px;
}
```

**Question**: Will the `<span>` turn into a large 300x200 rectangle on your screen?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer: NO!</strong> Because <code>&lt;span&gt;</code> is an <strong>inline element</strong> by default, browsers completely ignore <code>width</code> and <code>height</code> properties! To make it resize, you must add <code>display: inline-block;</code> or <code>display: block;</code>!
</details>

---

## 🕵️ Code Detective: The Broken Button Size

A student wanted to make an anchor link button bigger, but setting `width: 200px;` did nothing:

```css
/* Broken Code */
a.buy-btn {
  width: 200px;
  height: 50px;
  background-color: blue;
}
```

- **Find the mistake**: Anchor tags (`<a>`) are inline by default!
- **Explain the mistake**: Inline elements cannot have their width or height controlled.
- **Fix the code**: Add `display: inline-block;`!
  ```css
  /* Fixed Code */
  a.buy-btn {
    display: inline-block;
    width: 200px;
    height: 50px;
    background-color: blue;
  }
  ```

---

## Think Like a Web Designer: Horizontal Navigation

Before modern layout engines, how did designers turn a vertical list of links into a horizontal top bar?
They targeted the `<li>` items and wrote:
```css
li {
  display: inline-block;
}
```
Instantly, the bulleted list lined up horizontally like soldiers!

---

## Mini Challenge: The 3-Tier Pricing Table

Create a web page named `pricing-table.html`:
- Build 3 pricing boxes: *Starter*, *Pro*, and *Legend*.
- Use `display: inline-block;` with `width: 200px;` and `margin: 10px;`.
- Watch them align neatly side-by-side in the center of the screen!
- Add a pill button inside each box using `display: inline-block;`.

---

## ⚠️ Common Mistake

A common mistake is adding top and bottom **margin** to an inline element and expecting it to move away from the lines above and below.

```css
/* Wrong */
span.tag {
  margin-top: 20px;
  margin-bottom: 20px;
}
```

**What happens:** nothing moves. Inline elements ignore top and bottom margin. Their vertical padding is painted, but it does not push other lines away, so it can overlap the text above.

```css
/* Fixed */
span.tag {
  display: inline-block;
  margin-top: 20px;
  margin-bottom: 20px;
}
```

A second slip: using `display: none` to hide text "for later" and forgetting it. Screen readers and search engines also skip hidden content, so do not hide important information.

---

## ✍️ Try It

**The Invisible Element**

Did you know there is a fourth display value called `display: none;`?
1. Open `display.html` in your editor.
2. Add `display: none;` to `.box-block`.
3. Save and refresh your browser.
4. **Whoa!** Both block boxes have completely vanished! The browser removes them from the page as if they never existed! (This is how popups and dropdown menus hide before you click them!).

---

## 📝 Recap

- The `display` property dictates how an element behaves in the document flow.
- `display: block` elements begin on a new line and expand to 100% width.
- `display: inline` elements sit side-by-side and ignore width/height.
- `display: inline-block` combines the side-by-side flow of inline with the sizing controls of block.
- `display: none` completely hides an element from the page layout.

---

## 📖 Key Terms

| Term | What It Means |
| :--- | :--- |
| **`display`** | The CSS property specifying the rendering box type of an element. |
| **Block** | Element type starting on a new line and occupying full available width. |
| **Inline** | Element type flowing horizontally without breaking the line. |
| **Inline-Block** | Hybrid element type that flows horizontally while honoring width/height. |
| **Document Flow** | The default order in which browsers arrange elements down the page. |

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Name two HTML elements that are `block` by default.
2. Name two HTML elements that are `inline` by default.
3. What happens to an element when you set `display: none;`?

<details>
<summary>Show answer</summary>

1. Any two of: `<div>`, `<p>`, `<h1>` to `<h6>`, `<ul>`, `<li>`, `<section>`.
2. Any two of: `<span>`, `<a>`, `<strong>`, `<em>`, `<img>` (an image is inline but can take a width and height).
3. It disappears completely. It takes up no space, and the elements around it close the gap.

</details>

### 🟡 Level 2: Apply
4. Why does `height: 100px;` on a `<strong>` tag do nothing? How can you fix it?
5. Write CSS that turns a `<ul>` list into a row of menu items that sit side by side.

<details>
<summary>Show answer</summary>

4. `<strong>` is inline, and inline elements ignore `width` and `height`. Fix it with `display: inline-block;` (or `block`).

5.
```css
ul {
  list-style: none;
  padding: 0;
}
li {
  display: inline-block;
  margin-right: 16px;
}
```

</details>

### 🔴 Level 3: Challenge
Compare two ways of hiding.
1. Make three coloured boxes in a row (use `display: inline-block;`).
2. Give the second box `display: none;` and look at the gap.
3. Change it to `visibility: hidden;` and look again.
4. Write one sentence about the difference.

<details>
<summary>Show one possible answer</summary>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hiding Test</title>
    <style>
      .box {
        display: inline-block;
        width: 80px;
        height: 80px;
        background-color: #60a5fa;
      }
      .gone {
        display: none;
      }
      .invisible {
        visibility: hidden;
      }
    </style>
  </head>
  <body>
    <p>Test 1: display: none</p>
    <div class="box">1</div>
    <div class="box gone">2</div>
    <div class="box">3</div>

    <p>Test 2: visibility: hidden</p>
    <div class="box">1</div>
    <div class="box invisible">2</div>
    <div class="box">3</div>
  </body>
</html>
```

In Test 1, box 3 moves next to box 1: the hidden box takes **no space**. In Test 2, there is an empty gap where box 2 was: it is invisible but **still takes up its space**.

</details>
