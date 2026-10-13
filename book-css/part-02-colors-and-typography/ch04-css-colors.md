# Chapter 4: CSS Colors 🌈

---

## 🌟 Real-Life Story

**The Master Painter's Palette**

Imagine you are standing in an art studio preparing to paint a sunset:
- You could tell your assistant: *"Hand me the red tube!"* That works, but which red? Fire engine red? Cherry red? Warm ruby red?
- A master painter doesn't rely on vague names. Instead, they mix precise amounts of pigments: *"Mix 8 drops of crimson with 3 drops of golden yellow and 1 drop of pure white."*
- Now you get the **exact, perfect sunset coral shade** every single time!

**In CSS, computers give you three precise ways to speak about color!**
You can use simple everyday color names, high-tech Hex codes (used by digital designers everywhere), or RGB color mixing (based on red, green, and blue light rays)!

---

## 🎯 What You Will Learn

By the end of this chapter, you will be able to:
- Apply colours with **colour names** (like `tomato` and `navy`).
- Read and write **hex colours** (`#ff0000`, `#2563eb`) and **RGB colours** (`rgb(255, 0, 0)`).
- Tell the difference between `color` (text) and `background-color` (the box behind it).
- Build a small, readable colour palette for your own website.

---

## 👁️ Visual Concept Explanation

### The Three Ways to Write Colors in CSS

```text
1. COLOUR NAMES (about 140)
   color: tomato;
   color: dodgerblue;

2. HEX CODES (# + 6 digits)
   # RR GG BB
   # FF 00 00  = pure red
   # 00 FF 00  = pure green
   # 00 00 FF  = pure blue
   # 25 63 EB  = royal blue

3. RGB (each part 0 to 255)
   rgb(255, 0, 0)    = pure red
   rgb(0, 255, 0)    = pure green
   rgb(0, 0, 255)    = pure blue
   rgb(37, 99, 235)  = royal blue
```

### Text Color vs. Background Color

```text
p {
  color: #ffffff;
  /* paints the WORDS white */

  background-color: #1e293b;
  /* paints the BOX dark slate */
}
```

---

## 💻 Code Example: The Color Palette Showcase

Type this into your editor and save it as `colors.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>The Color Lab</title>
    <style>
      body {
        background-color: #f1f5f9; /* Soft cool gray */
        font-family: Arial, sans-serif;
        padding: 30px;
      }

      /* Box 1: Named Colors */
      .card-named {
        background-color: lightcoral;
        color: darkred;
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 20px;
      }

      /* Box 2: Hex Colors */
      .card-hex {
        background-color: #0284c7; /* Ocean Blue */
        color: #ffffff;            /* Pure White */
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 20px;
      }

      /* Box 3: RGB Colors */
      .card-rgb {
        background-color: rgb(16, 185, 129); /* Emerald Green */
        color: rgb(6, 78, 59);               /* Deep Forest Green */
        padding: 20px;
        border-radius: 8px;
      }
    </style>
  </head>
  <body>
    <h1>Exploring CSS Color Systems</h1>

    <div class="card-named">
      <h2>Box 1: Named Colors</h2>
      <p>Background: lightcoral | Text: darkred</p>
    </div>

    <div class="card-hex">
      <h2>Box 2: Hexadecimal Colors</h2>
      <p>Background: #0284c7 | Text: #ffffff</p>
    </div>

    <div class="card-rgb">
      <h2>Box 3: RGB Color Values</h2>
      <p>Background: rgb(16, 185, 129) | Text: rgb(6, 78, 59)</p>
    </div>
  </body>
</html>
```

---

## 🔍 Code Explanation: How Colors Work

- `lightcoral` and `darkred`: Browsers recognise about **140 named colours**, including `rebeccapurple`, `papayawhip`, `seashell`, and `midnightblue`!
- `#0284c7`: Hexadecimal numbers count from `0` to `9`, and then use letters `A, B, C, D, E, F` (where `F` represents the maximum number, 15). The first pair of characters is Red, the second is Green, and the third is Blue.
- `rgb(16, 185, 129)`: Instead of letters, RGB uses numbers from `0` (none of that light) to `255` (maximum beam of that light). When you turn all three lights to maximum (`rgb(255, 255, 255)`), you get **pure white**! When you turn all lights off (`rgb(0, 0, 0)`), you get **pitch black**!

---

## 🌍 Real-World Connection: Brand Identity

Most organisations choose a few signature colours and always use the same hex codes. Here is a made-up example for a town library:
- **Library Navy** (headings): `#1e3a8a`
- **Reading Lamp Gold** (buttons): `#f59e0b`
- **Paper Cream** (backgrounds): `#fffbeb`
- Designers write these codes in a **brand guide** (a short document of colours and fonts). Then every web page, poster and app button matches.

---

## 🔮 Predict the Output

Look at this Hex code:

```css
h1 {
  color: #000000;
  background-color: #ffffff;
}
```

**Question**: What color will the text and the background be?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> The text will be pitch black (<code>#000000</code>) and the background will be pure white (<code>#ffffff</code>)! This is the highest contrast combination in computer science.
</details>

---

## 🕵️ Code Detective: The Missing Pound Sign

A student tried to give their heading an electric purple color, but the color refused to change:

```css
/* Broken Code */
h1 {
  color: 8b5cf6;
}
```

- **Find the mistake**: Look in front of `8b5cf6`!
- **Explain the mistake**: Hex codes MUST always begin with a hashtag/pound symbol (`#`). Without the `#`, the browser thinks it's an unrecognized English color name and ignores it!
- **Fix the code**:
  ```css
  /* Fixed Code */
  h1 {
    color: #8b5cf6;
  }
  ```

---

## 🎨 Think Like a Web Designer: The 60-30-10 Rule

How do professional interior designers and web artists choose colors that look stunning together?
They use the **60-30-10 Rule**:
- **60% Dominant Color**: Usually a calm, clean background (like warm white or soft off-gray).
- **30% Secondary Color**: For cards, headers, and text (like slate navy or charcoal).
- **10% Accent Color**: A vibrant "pop" of color used ONLY for buttons, links, and badges to guide the user's attention!

---

## 🚀 Mini Challenge: Design Your Personal Palette

Design a 4-color palette for your dream website! Pick one color for each category:
1. **Canvas Background**: A calm, soft tone (e.g. `#f8fafc`).
2. **Main Headings**: A bold, confident color (e.g. `#1e3a8a` - deep royal navy).
3. **Body Paragraphs**: An easy-to-read dark tone (e.g. `#334155`).
4. **Call to Action Button**: A bright accent that jumps out (e.g. `#f59e0b` - warm amber gold).

Write an HTML page called `my-palette.html` displaying four colored boxes showing off your signature colors!

---

## ⚠️ Common Mistake

A common mistake is writing `background` colour with the wrong property name, `color`, and expecting the box to change.

```css
/* Wrong: the student wants a yellow box */
.notice {
  color: #fef08a;
}
```

**What happens:** `color` changes only the **text**. The words turn pale yellow on a white page and become very hard to read. The box stays white.

```css
/* Fixed */
.notice {
  background-color: #fef08a;
  color: #1e293b;
}
```

A second slip is a hex code with the wrong number of digits, such as `#12345`. Hex codes need 3 or 6 digits after the `#` (8 if you add transparency). A wrong length is ignored.

---

## ✍️ Try It

**The RGB Light Mixer**

Open your browser's Developer Tools or an editor with the file `colors.html`:
1. Change Box 3's background to `rgb(255, 255, 0)`.
2. Notice what happens when you mix maximum Red (255) and maximum Green (255) with zero Blue: **You get brilliant sunny yellow!**
3. Now try `rgb(255, 0, 255)`. Maximum Red and Blue make **vibrant magenta**!

---

## 📝 Recap

- CSS provides three primary ways to define color: **Names**, **Hex Codes**, and **RGB**.
- Named colors (`tomato`, `navy`) are great for quick tests.
- Hexadecimal codes (`#2563eb`) use `#` followed by 6 hex characters for Red, Green, and Blue.
- RGB values (`rgb(r, g, b)`) mix light levels from 0 to 255.
- Use `color` to style text, and `background-color` to style the element container.
- Always ensure strong contrast between text and background for accessibility.

---

## 📖 Key Terms

| Term | What It Means |
| :--- | :--- |
| **Hex Code** | A 6-character code starting with `#` representing Red, Green, and Blue values in base-16. |
| **RGB** | Red, Green, Blue — a color model based on mixing colored light from 0 to 255. |
| **`color`** | The CSS property used to set foreground/text color. |
| **`background-color`**| The CSS property used to fill the background of an element. |
| **Contrast** | The brightness difference between foreground text and its background. |

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. What character must always come before a hex colour code?
2. What RGB value makes pure white?
3. Which CSS property changes the colour of the text in a paragraph?

<details>
<summary>Show answer</summary>

1. The hash sign `#`.
2. `rgb(255, 255, 255)`: all three lights fully on.
3. `color`.

</details>

### 🟡 Level 2: Apply
4. Write a CSS rule that gives all `<h2>` headings a deep purple background (`#581c87`) and white text (`#ffffff`).
5. Explain why `#ff0000` is pure red.

<details>
<summary>Show answer</summary>

4.
```css
h2 {
  background-color: #581c87;
  color: #ffffff;
}
```

5. A hex code has three pairs: red, green, blue. `ff` is the biggest value (255), so red is fully on. Green `00` and blue `00` are off. Only red light is left.

</details>

### 🔴 Level 3: Challenge
Make a see-through notice card.
1. Find out what the **a** in `rgba()` means.
2. Give the page `body` a bright background colour, such as `#0ea5e9`.
3. Make a `.card` with a half-transparent black background using `rgba()`.
4. Give the card white text and some padding, and check you can still see the page colour through it.

<details>
<summary>Show one possible answer</summary>

The **a** stands for **alpha**, which means transparency. `0` is fully see-through and `1` is fully solid.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Science Fair Notice</title>
    <style>
      body {
        background-color: #0ea5e9;
      }
      .card {
        background-color: rgba(0, 0, 0, 0.6);
        color: #ffffff;
        padding: 20px;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <h2>Science Fair</h2>
      <p>Bring your project to the hall by 9 am.</p>
    </div>
  </body>
</html>
```

The card looks dark blue-grey, because 60% black mixes with the blue page behind it.

</details>
