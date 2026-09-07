# Part 10: DOM and Web
# Chapter 16: JavaScript in a Web Page — Bringing HTML & CSS to Life

---

## 1. Learning Objectives 🎯

By the end of this chapter, you will be able to:
- Explain what the DOM (Document Object Model) is.
- Link an external JavaScript file to an HTML document using the `<script>` tag.
- Select HTML elements using `document.getElementById()` and `document.querySelector()`.
- Read and modify text content using `.textContent` and `.innerHTML`.
- Change CSS styles directly through JavaScript with `.style`.
- Add and remove CSS classes using `.classList.add()` and `.classList.remove()`.

---

## 2. Warm-Up Activity 💡

Think of a home:
- **HTML** is the concrete foundation, brick walls, doors, and windows (Structure).
- **CSS** is the paint on the walls, curtains, carpets, and lighting fixtures (Style).
- **JavaScript** is the electrical wiring, smart thermostat, remote garage door opener, and automated robot vacuum (Behavior!).

When JavaScript connects to your HTML, static web pages turn into living, breathing software!

---

## 3. Concept Explanation 💡

### What is the DOM?
When a browser loads an HTML file, it translates the raw code into a tree of JavaScript objects called the **DOM** (**Document Object Model**).

```text
              window
                 |
              document
                 |
               <html>
              /      \
          <head>    <body>
                     /   \
                   <h1>   <button>
```

Through the built-in `document` object, JavaScript can inspect, alter, add, or delete any HTML tag on the page!

### 1. Linking JavaScript to HTML:
Place the `<script>` tag right before the closing `</body>` tag:
```html
<!DOCTYPE html>
<html>
<head><title>My Web Page</title></head>
<body>
    <h1 id="main-heading">Hello World</h1>
    <script src="script.js"></script>
</body>
</html>
```

### 2. Selecting Elements:
- By ID: `let title = document.getElementById("main-heading");`
- By CSS Selector: `let button = document.querySelector(".btn-submit");`

### 3. Changing Text and HTML:
- `.textContent`: Safely changes the inner text.
- `.innerHTML`: Changes the inner content, including nested HTML tags.
```javascript
let heading = document.getElementById("main-heading");
heading.textContent = "Welcome to Junior Coders! 🚀";
```

### 4. Changing Styles Dynamically:
You can edit CSS properties using camelCase:
```javascript
heading.style.color = "royalblue";
heading.style.backgroundColor = "#fffae6";
heading.style.fontSize = "36px";
```

### 5. Better Practice: Toggling Classes:
Instead of writing inline CSS, toggle CSS classes defined in your stylesheet:
```javascript
heading.classList.add("highlight");
heading.classList.remove("dimmed");
```

---

## 4. Real-World Example 🌙

Think of "Dark Mode" on YouTube or Discord:
When you flip the switch to Dark Mode:
1. JavaScript finds the `<body>` element: `let body = document.body;`
2. It toggles a class: `body.classList.toggle("dark-theme");`
3. CSS rules instantly recolor the background to black and the text to white!

---

## 5. Code Example 💻

### `index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Scorekeeper</title>
    <style>
        .winner { color: green; font-weight: bold; }
        .box { padding: 15px; border: 2px solid #ccc; width: 250px; text-align: center; }
    </style>
</head>
<body>
    <div class="box">
        <h2 id="team-name">Gryffindor</h2>
        <p>Score: <span id="score-counter">0</span></p>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

### `script.js`
```javascript
// Selecting elements
let teamHeading = document.getElementById("team-name");
let scoreSpan = document.getElementById("score-counter");

// Updating content
teamHeading.textContent = "Golden Eagles 🦅";
teamHeading.style.color = "#d97706";

// Awarding 10 points
let currentScore = 0;
currentScore += 10;
scoreSpan.textContent = currentScore;
scoreSpan.classList.add("winner");
```

---

## 6. Line-by-Line Explanation 🔍

- `document.getElementById("team-name")`: Finds the `<h2>` tag whose ID attribute is `"team-name"`.
- `teamHeading.textContent = "Golden Eagles 🦅"`: Replaces `"Gryffindor"` with `"Golden Eagles 🦅"`.
- `teamHeading.style.color = "#d97706"`: Directly applies an inline CSS amber gold color.
- `scoreSpan.textContent = currentScore`: Replaces `"0"` with `"10"`.
- `scoreSpan.classList.add("winner")`: Adds the `.winner` CSS class so it turns bold green.

---

## 7. Try It Yourself 🚀

1. Open any web page in Google Chrome (like Wikipedia).
2. Right-click anywhere and select **Inspect** to open DevTools.
3. Switch to the **Console** tab.
4. Type:
   ```javascript
   document.body.style.backgroundColor = "lightyellow";
   document.querySelector("h1").textContent = "I Hacked This Heading!";
   ```
5. Press Enter and watch the live website change instantly before your eyes!

---

## 8. Practice Exercises 📝

### Level 1: Remember
What does DOM stand for?

### Level 2: Understand
Why is it usually better to add a CSS class (`element.classList.add(...)`) rather than writing styles directly with `.style`?

### Level 3: Apply
Given `<p id="status">Loading...</p>`, write JavaScript to change its text to `"Complete!"` and text color to `"green"`.

### Level 4: Think
What happens if you run `document.getElementById("banner")` before the HTML `<body>` has finished loading? Why do we put `<script>` at the bottom?

### Level 5: Create ⭐
Create a small web page with a profile card (Name, Age, School, Avatar). Write a JavaScript script that loads a student object and populates every HTML element on the page using its values!

---

## 9. Predict the Output 🔮

```html
<p id="msg">Hello <b>World</b></p>
```
```javascript
let p = document.getElementById("msg");
console.log(p.textContent);
console.log(p.innerHTML);
```
*What is the difference between what `textContent` and `innerHTML` return?*

---

## 10. Debug It 🐞

Find the 3 errors in this code:
```javascript
let myTitle = document.getElementByID("page-title");
myTitle.text = "Welcome to my website";
myTitle.style.background-color = "blue";
```

---

## 11. Think Like a Programmer 🧠: Separation of Concerns

Good web developers keep three layers distinct:
1. **HTML:** Content and semantic hierarchy.
2. **CSS:** Presentation, layout, and colors.
3. **JavaScript:** Logic, calculation, and interaction.

Avoid hardcoding complex styles inside JavaScript. Instead, write the visual design in CSS under class names (like `.is-active`, `.has-error`, `.hidden`), and let JavaScript simply toggle those classes!

---

## 12. Coding Challenge ⭐

Write a script that selects all `<p>` tags on a page using `document.querySelectorAll("p")` and loops through them with a `for` loop, adding a numbered prefix to each paragraph:
- `"Paragraph 1: ..."`
- `"Paragraph 2: ..."`

---

## 13. Mini Project: Interactive Digital Business Card 📇

Build a single-page business card:
- HTML has a card box with avatar placeholder, name, bio, and badge.
- JavaScript creates a `developerProfile` object:
  ```javascript
  let coder = {
      name: "Aliya Farooq",
      title: "Full Stack Junior Developer",
      bio: "12-year-old passionate coder building web apps with HTML, CSS, and JS!",
      badge: "JavaScript Novice 🌟"
  };
  ```
- JavaScript updates all HTML fields dynamically on page load.

---

## 14. Chapter Recap 📌

- The DOM is the browser's JavaScript representation of HTML.
- Select elements using `getElementById` or `querySelector`.
- Modify text with `.textContent`.
- Update inline styles using `.style.propertyName`.
- Add, remove, or toggle CSS classes with `.classList`.
- Keep scripts at the bottom of the `<body>` so elements exist before they are selected.

---

## 15. Key Terms 📖

- **DOM:** Document Object Model.
- **Node / Element:** An individual HTML tag inside the DOM tree.
- **querySelector:** Flexible method to select elements using CSS selector syntax.
- **textContent:** The plain text contained within an element.
- **innerHTML:** The raw HTML markup inside an element.
- **classList:** An interface allowing addition and removal of CSS classes.

---

## 16. Self-Assessment Checklist ✅

- [ ] I can select an element by its ID.
- [ ] I know how to update the text of an `<h1>` tag with JavaScript.
- [ ] I can change the background color of an element.
- [ ] I understand the difference between HTML, CSS, and JS roles.

---

## 17. Homework 📚

1. Create an HTML file with 3 colored boxes. Use JavaScript to change their labels to `"Box 1"`, `"Box 2"`, and `"Box 3"`.
2. Build an announcement banner that JavaScript hides by applying `display = "none"`.
3. Experiment with `.classList.toggle()` in the console.

---

## 18. Teacher Discussion Questions 💬

1. Why is `.textContent` much safer against security vulnerabilities (like XSS / Cross-Site Scripting) than `.innerHTML`?
2. How does the browser know how to redraw the screen when a DOM property changes?
