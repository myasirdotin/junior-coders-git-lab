# Chapter 6: Backgrounds 🖼️

---

## 🌟 Real-Life Story

**The Themed Birthday Party**

Imagine you are planning an underwater ocean-themed birthday party in your school auditorium:
- If the walls are plain, boring beige concrete, it doesn't feel like the deep sea.
- First, you can paint the walls a deep, calm oceanic teal-blue.
- Next, you hang a giant wall mural showing swimming blue whales and sunbeams piercing through the crystal water.
- You make sure the mural stretches across the entire wall without repeating in ugly, choppy tiles, and you center the giant whale right in the middle where everyone can see it!

**CSS background properties give you the exact same stage-decorating power for any box on your website!**

---

## 🎯 What You Will Learn

By the end of this chapter, you will be able to:
- Fill boxes with `background-color` and add photos with `background-image: url(...)`.
- Stop tiling with `background-repeat: no-repeat`.
- Fit and place photos with `background-size: cover` and `background-position: center`.
- Combine everything in the `background` shorthand (one property that sets many at once).

---

## 👁️ Visual Concept Explanation

### The Background Properties Toolkit

```text
1. background-color: #0f172a;
   fills the box with one colour

2. background-image: url('ocean.jpg');
   paints a picture behind the content

3. background-repeat: no-repeat;
   stops the picture tiling like a floor
   (repeat, repeat-x, repeat-y,
    no-repeat)

4. background-size: cover;
   scales the picture to fill the box
   (auto, contain, cover)

5. background-position: center;
   puts the middle of the picture in
   the middle of the box
```

### Visualizing `background-size: cover` vs. `contain`

```text
contain: the WHOLE picture shows.
Empty bars may appear at the sides.
┌──────────────────────────┐
│   ┌──────────────────┐   │
│   │   whole image    │   │
│   └──────────────────┘   │
└──────────────────────────┘

cover: the picture fills EVERY corner.
Some edges may be cut off.
┌──────────────────────────┐
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│▓▓▓ image fills the box ▓▓│
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
└──────────────────────────┘
```

---

## 💻 Code Example: The Hero Banner

Type this into your editor and save it as `hero-banner.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Starlight Observatory</title>
    <style>
      body {
        margin: 0;
        font-family: Arial, sans-serif;
      }

      /* Giant Full-Width Hero Section */
      .hero-section {
        /* 1. Fallback background color if image is loading */
        background-color: #0b132b;

        /* 2. Photo backdrop */
        background-image: url('https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1200');

        /* 3. Do not tile the photo */
        background-repeat: no-repeat;

        /* 4. Center the focal point */
        background-position: center center;

        /* 5. Scale to fill the whole area */
        background-size: cover;

        /* Dimensions & Content alignment */
        height: 450px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: #ffffff;
      }

      .hero-title {
        font-size: 48px;
        margin-bottom: 12px;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7); /* Adds shadow for contrast */
      }

      .hero-subtitle {
        font-size: 20px;
        max-width: 600px;
        text-shadow: 0 2px 6px rgba(0, 0, 0, 0.7);
      }
    </style>
  </head>
  <body>
    <header class="hero-section">
      <h1 class="hero-title">Reach for the Stars</h1>
      <p class="hero-subtitle">
        Join our youth astronomy observatory and map the constellations of the deep universe.
      </p>
    </header>
  </body>
</html>
```

---

## 🔍 Code Explanation: Building the Hero Banner

- `background-color: #0b132b;`: **Always provide a background color!** If the user is on a slow cell connection and the image takes 3 seconds to download, they won't see white text on a white screen—they will see white text on dark blue!
- `background-image: url('...');`: The `url('...')` function tells the browser where to fetch the wallpaper image.
- `background-size: cover;`: The golden standard for banner images. Whether the user opens the site on an ultrawide desktop monitor or a skinny smartphone, the image scales gracefully to cover every pixel without ugly blank spaces!
- `text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);`: When placing white text on top of an image, photos often have bright spots (like clouds or sun). A subtle dark text shadow makes sure your words remain readable over any photo!

---

## 🌍 Real-World Connection: Website Hero Sections

Visit **National Geographic**, **Khan Academy**, or **Wikimedia**:
- The very first thing you see at the top of their home page is a huge, high-resolution, full-width photo banner.
- Web designers call this the **Hero Section** because it is the "hero" of the page that captures your attention and sets the mood within two seconds!

---

## 🔮 Predict the Output

What will happen if you forget to write `background-repeat: no-repeat` when using a small photo as a background on a giant 27-inch desktop monitor?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> The browser will automatically tile and repeat the photo over and over like bathroom tiles until the entire screen is covered! By default in CSS, all background images repeat!
</details>

---

## 🕵️ Code Detective: The Broken URL Path

A student tried to load an image, but the background remained plain white:

```css
/* Broken Code */
.banner {
  background-image: 'nature.jpg';
}
```

- **Find the mistake**: Look at how the image path is written!
- **Explain the mistake**: In CSS, you cannot just write a bare filename string for `background-image`. You MUST wrap it inside the `url(...)` function!
- **Fix the code**:
  ```css
  /* Fixed Code */
  .banner {
    background-image: url('nature.jpg');
  }
  ```

---

## 🎨 Think Like a Web Designer: The Readability Test

Placing text directly over photographic backgrounds can be risky:
- If a photo has light and dark patches, white text will disappear when it passes over a white cloud.
- Web designers fix this using a **dark tint overlay** or `rgba()` semi-transparent wash:
  ```css
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('hero.jpg');
  ```
  This creates a sunglasses tint over the photo so white text shines through crisp and readable!

---

## 🚀 Mini Challenge: The Rainforest Sanctuary Banner

Create a web page named `rainforest.html`:
- Build a `.banner` container with a height of `400px`.
- Use a lush green or jungle photo backdrop with `background-size: cover;` and `background-position: center;`.
- Add a bold `<h1>`: `Save the Amazon Rainforest`.
- Add an action button: `Adopt a Tree 🌳`.
- Ensure the text has high contrast and is readable over the leaves!

---

## ⚠️ Common Mistake

A common mistake is putting light text on a busy photo with no dark layer.

```css
/* Wrong */
.hero {
  background-image: url('forest.jpg');
  background-size: cover;
  color: white;
}
```

**What happens:** where the photo has bright sky or white flowers, the white words almost disappear. Many readers cannot read them.

```css
/* Fixed: a half-dark layer on top of the photo */
.hero {
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
    url('forest.jpg');
  background-size: cover;
  color: white;
}
```

A second slip is a background image on an **empty** box. A `<div>` with no content and no `height` is 0 pixels tall, so the picture has nowhere to show. Give it content, padding or a `min-height`.

---

## ✍️ Try It

**The Tiling Pattern Experiment**

1. Find a tiny 50x50 pixel icon or pattern image.
2. Set `background-repeat: repeat;` on your `body`.
3. Notice how the browser multiplies the tiny image across the screen like a seamless checkerboard or wallpaper pattern!
4. Now change it to `background-repeat: no-repeat;` and watch it shrink back to a single solitary icon in the top-left corner!

---

## 📝 Recap

- `background-color` fills elements with a solid tint.
- `background-image: url(...)` attaches image backdrops.
- `background-repeat: no-repeat` prevents wallpaper tiling.
- `background-size: cover` scales photos proportionally to cover the full container.
- `background-position: center` centers the image focal point.
- Always include a matching `background-color` fallback for when images load slowly.

---

## 📖 Key Terms

| Term | What It Means |
| :--- | :--- |
| **`background-image`** | CSS property to set one or more background images. |
| **`url()`** | CSS function used to specify the location of an image file. |
| **`background-repeat`**| Controls if and how a background image tiles across an element. |
| **`background-size`**  | Defines the size of background images (e.g., `cover`, `contain`). |
| **Hero Section**       | A large, prominent banner positioned at the top of a web page. |

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which CSS function must wrap the file path in `background-image`?
2. What does a background image do if you do not set `background-repeat`?
3. Which property moves the focus point of a background image to the centre?

<details>
<summary>Show answer</summary>

1. `url(...)`, for example `url('waves.jpg')`.
2. It **repeats** (tiles) across and down to fill the box. The default is `repeat`.
3. `background-position` (for example `background-position: center;`).

</details>

### 🟡 Level 2: Apply
4. Write CSS for `.ocean-card` with a dark blue fallback colour, the image `waves.jpg`, no repeat and `cover` sizing.
5. What is the difference between `background-size: cover` and `background-size: contain`?

<details>
<summary>Show answer</summary>

4.
```css
.ocean-card {
  background-color: #1e3a8a;
  background-image: url('waves.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
```

The colour shows while the picture loads, or if it fails to load.

5. `cover` fills the whole box, even if some edges of the picture are cut off. `contain` shows the whole picture, even if empty space is left around it.

</details>

### 🔴 Level 3: Challenge
Make a "still background" effect.
1. Make a page with three tall sections (use `min-height: 100vh;`, which means the full height of the screen).
2. Give the middle section a background image with `background-attachment: fixed;`.
3. Scroll the page slowly on a computer and describe what you see.

<details>
<summary>Show one possible answer</summary>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mountain Trip</title>
    <style>
      section {
        min-height: 100vh;
        padding: 40px;
      }
      .still {
        background-image: url('mountains.jpg');
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        color: white;
      }
    </style>
  </head>
  <body>
    <section><h2>Our School Trip</h2></section>
    <section class="still"><h2>The Mountains</h2></section>
    <section><h2>What We Learned</h2></section>
  </body>
</html>
```

As you scroll, the text moves but the mountain picture stays still, like looking through a window. This is often called a **parallax** effect. Many phone browsers ignore `fixed`, so the picture simply scrolls there.

</details>
