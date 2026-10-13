# Chapter 8: Links 🔗

---

## 🌟 Real-Life Story

Imagine stepping into the lift of a tall city library. Next to the doors is a panel of labelled buttons.
- One button reads: **“Floor 3: Astronomy Books”**.
- Another reads: **“Floor 5: Reading Garden”**.
- A third reads: **“Floor 7: Science Lab”**.

You press one button, and a moment later the doors open on exactly that floor. You never had to search the stairs!

**Links work the same way, and they are what made the World Wide Web famous!**
Before hyperlinks, computer files sat alone on single hard drives. The letter **"H"** in HTML stands for **HyperText**: text that contains links. One click takes you to another page on your own website, or to a website on the other side of the planet.

---

## 🎯 What You Will Learn

By the end of this chapter, you will be able to:
- Understand the anatomy of the anchor tag (`<a>`) and the `href` attribute.
- Differentiate between **External Links** (pointing to other websites) and **Internal Links** (pointing between your own pages).
- Use `target="_blank"` to open links safely in a new browser tab.
- Write clear, accessible link text (and avoid bad links like "click here").
- Build an organized Educational Links Portal page.

---

## 👁️ Visual Concept Explanation

### Anatomy of an Anchor Tag

```text
 tag   attribute   destination (URL)
  │       │            │
  ▼       ▼            ▼
 <a  href="https://www.nasa.gov">

      Explore NASA     </a>
           ▲             ▲
      link text     closing tag
   (what users see)
```

### Internal vs. External Links

```text
1. INTERNAL LINK (your own folder)
   index.html ──────> about.html
   href="about.html"
   (no https:// needed)

2. EXTERNAL LINK (another website)
   my-page.html ────> wikipedia.org
   href="https://www.wikipedia.org"
   (full address with https://)
```

### Target Attribute: Same Tab vs. New Tab

```text
<a href="page.html">
   -> opens in the SAME tab
      (replaces your page)

<a href="page.html" target="_blank">
   -> opens in a NEW tab
      (your page stays open)
```

---

## 💻 Code Example: Educational Links Directory

Type this into an editor and save it as `links.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Great Learning Portals</title>
  </head>
  <body>
    <h1>My Favorite Educational Websites</h1>
    <p>Click on any of the resources below to start exploring:</p>

    <h2>Space & Science</h2>
    <p>
      <a href="https://www.nasa.gov" target="_blank">
        Visit NASA Official Website
      </a> 
      - Discover live astronaut missions and Mars rover pictures!
    </p>

    <h2>Coding for Kids</h2>
    <p>
      <a href="https://scratch.mit.edu" target="_blank">
        Scratch by MIT
      </a>
      - Build interactive stories and science animations with blocks.
    </p>

    <h2>Internal Navigation</h2>
    <p>
      Ready to go back? Return to our 
      <a href="index.html">Class 7 Home Page</a>.
    </p>
  </body>
</html>
```

---

## 🔍 Code Explanation: Breaking Down Attributes

Look closely at how attributes work:
- `<a>`: Stands for **anchor**. It anchors a link to text or images.
- `href="..."`: Stands for **Hypertext Reference**. This is an **HTML attribute**. Attributes live inside the opening tag and give the tag extra instructions or superpower settings!
- `href="https://www.nasa.gov"`: Always wrap the destination address inside quotation marks (`"..."`). For external websites, you must include `https://` at the start!
- `target="_blank"`: Tells the browser: *"Do not replace my current website! Open this destination in a fresh new browser tab so visitors don't lose their place!"*
- `href="index.html"`: This is an **internal link**. Because `index.html` is in the same folder on your computer, you don't need `https://`—just type the file name!

---

## 🌍 Real-World Connection: How Wikipedia Connects Knowledge

Open any article on **Wikipedia** (e.g., *Dinosaurs*):
- Within the first paragraph, you will see blue underlined words like *Fossils*, *Mesozoic Era*, *Reptiles*, and *Extinction*.
- Each one of those words is wrapped in an `<a href="...">` tag!
- Hyperlinks turn reading into an interactive journey of curiosity, where you can follow your interests wherever they lead.

> 🌟 **Did You Know?**
> By default, browsers paint unvisited links **blue with an underline**, and links you have already visited **purple**! With CSS (which you will learn in the CSS track), you can make links look like modern rounded buttons with glowing hover effects!

---

## 🔮 Predict the Output

Look at this line of code:

```html
<p>To learn more about lions, <a href="https://nationalgeographic.com">click here</a>.</p>
```

**Question**: Will the words "To learn more about lions" be clickable, or will only the words "click here" be clickable?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> ONLY the words <em>"click here"</em> will be clickable, because only those two words are placed inside the <code>&lt;a&gt;</code> and <code>&lt;/a&gt;</code> tags!
</details>

---

## 🕵️ Code Detective: The Missing Attribute

A student was confused because the text turned blue, but clicking it didn't take them anywhere!

```html
<!-- Broken Code -->
<a>Visit the National Zoo</a>
```

- **Find the mistake**: Look at the opening `<a>` tag—there is no `href` attribute!
- **Explain the mistake**: An anchor tag without an `href` attribute is like an envelope with no mailing address. The browser knows it's a link, but has nowhere to take the user!
- **Fix the code**:
  ```html
  <!-- Fixed Code -->
  <a href="https://nationalzoo.si.edu" target="_blank">Visit the National Zoo</a>
  ```

---

## 🎨 Think Like a Web Designer: The "Click Here" Trap

Have you ever seen a page that says:
*"To see our timetable click here. For teacher emails click here. For lunch menu click here."*

**This is poor web design!**
- Visually impaired users using screen readers often pull up a list of all links on a page. If the list just repeats *"click here, click here, click here"*, they have no idea where any link leads!
- **The Golden Rule of Link Design**: Make your link text descriptive!
  - ❌ Bad: *"To see our school lunch schedule, [click here]."*
  - ✅ Great: *"View our [weekly school lunch schedule]."*

---

## 🚀 Mini Challenge: The Classroom Resource Launchpad

Create an HTML page titled `my-launchpad.html`. Include:
- A prominent `<h1>` headline: `My Learning Launchpad`
- 3 categories using `<h2>` tags:
  - *Math & Puzzles*
  - *Science & Nature*
  - *Art & Calligraphy*
- Under each category, add at least 2 descriptive links to real websites that open in a new tab (`target="_blank"`).

---

## ⚠️ Common Mistake

**Leaving out `https://` on an external link.**

❌ Wrong:

```html
<a href="www.wikipedia.org">Wikipedia</a>
```

What happens: without `https://`, the browser thinks `www.wikipedia.org` is a **file in your own folder**. It looks for it next to your page and shows a "file not found" error.

✅ Fixed: external links need the full address.

```html
<a href="https://www.wikipedia.org">Wikipedia</a>
```

---

## ✍️ Try It

**The 2-Page Website**

Let's build a real 2-page connected website!
1. In your project folder, create `page1.html` with:
   ```html
   <h1>This is Page 1</h1>
   <p>Welcome! Click to travel to <a href="page2.html">Go to Page 2</a></p>
   ```
2. In the same folder, create `page2.html` with:
   ```html
   <h1>This is Page 2</h1>
   <p>You made it! Click here to <a href="page1.html">Go back to Page 1</a></p>
   ```
3. Open `page1.html` in your browser and click the link. You can now surf back and forth between your own pages!

> 💡 **Hint:** If the link says "file not found", check that both files are in the **same folder** and that the spelling in `href` matches the file name exactly.

---

## 📝 Recap

- The anchor element (`<a>`) creates clickable hyperlinks.
- The `href` attribute specifies the destination URL or file path.
- **External links** connect to other websites and need full URLs with `https://`.
- **Internal links** connect to other HTML files inside your own project folder.
- `target="_blank"` instructs the browser to open the link in a new tab.
- Always use descriptive, meaningful link text instead of generic words like "click here".

---

## 📖 Key Terms

| Term | What It Means |
| :--- | :--- |
| **Hyperlink (`<a>`)** | An interactive element that connects one web resource to another. |
| **Attribute** | Extra information placed inside an opening tag (e.g., `href=""`). |
| **`href`** | Hypertext Reference — the address where the link sends the user. |
| **`target="_blank"`** | An attribute value that opens the destination in a new browser tab. |
| **Internal Link** | A link pointing to another page within the same website. |
| **External Link** | A link pointing to a page on an entirely different website. |

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. What does the `href` attribute stand for?
2. Which attribute makes a link open in a new tab?
3. What happens if you forget to close an `<a>` tag with `</a>`?

<details>
<summary>Show answer</summary>

1. **H**ypertext **Ref**erence.
2. `target="_blank"`
3. The link does not stop where you wanted. The text after it also becomes part of the link.

</details>

### 🟡 Level 2: Apply
1. Many sites open external links in a new tab but keep links between their own pages in the same tab. Why?
2. Write a link to `contact.html` with the link text "Get in Touch With Our Team".

<details>
<summary>Show answer</summary>

1. A new tab keeps your site open, so visitors can come back after reading the other site. Inside your own site, a new tab for every click would fill the screen with tabs, so the same tab is better.
2.

```html
<a href="contact.html">Get in Touch With Our Team</a>
```

</details>

### 🔴 Level 3: Challenge
1. Write a link that has an `<em>` or `<strong>` tag inside the `<a>` tag.
2. Test it in your browser.
3. Answer: does the link still work? Does the bold or italic style show?

<details>
<summary>Show one possible answer</summary>

```html
<p>Read the <a href="rules.html">library <strong>borrowing rules</strong></a> first.</p>
```

Yes, it works. The whole text "library borrowing rules" is one link, and "borrowing rules" is also bold. Formatting tags can sit inside a link, as long as they close **before** `</a>`.

</details>
