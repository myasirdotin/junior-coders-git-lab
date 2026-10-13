# Chapter 16: JavaScript in a Web Page — Bringing HTML & CSS to Life

---

## 🌟 Real-Life Story

Think of a home:
- **HTML** is the concrete foundation, brick walls, doors, and windows (Structure).
- **CSS** is the paint on the walls, curtains, carpets, and lighting fixtures (Style).
- **JavaScript** is the electrical wiring, smart thermostat, remote garage door opener, and automated robot vacuum (Behavior!).

When JavaScript connects to your HTML, static web pages turn into living, breathing software!

---

## 🎯 What You Will Learn

By the end of this chapter, you will be able to:
- Explain what the DOM (Document Object Model) is.
- Link an external JavaScript file to an HTML document using the `<script>` tag.
- Select HTML elements using `document.getElementById()` and `document.querySelector()`.
- Read and modify text content using `.textContent` and `.innerHTML`.
- Change the look of elements with `.style` and with `.classList.add()` / `.classList.remove()`.

---

## 💡 Concept Explanation

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

### Linking JavaScript to HTML
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

### Selecting Elements
- By ID: `let title = document.getElementById("main-heading");`
- By CSS Selector: `let button = document.querySelector(".btn-submit");`

### Changing Text and HTML
- `.textContent`: Safely changes the inner text.
- `.innerHTML`: Changes the inner content, including nested HTML tags.
```javascript
let heading = document.getElementById("main-heading");
heading.textContent = "Welcome to Junior Coders! 🚀";
```

> 🔒 **Safety rule:** Put anything a user typed on the page with `.textContent`, never `.innerHTML`. With `.innerHTML`, typed text could be read as real HTML code, and someone could sneak a harmful script into your page. This attack is called **XSS** (cross-site scripting).

### Changing Styles Dynamically
You can edit CSS properties using camelCase:
```javascript
heading.style.color = "royalblue";
heading.style.backgroundColor = "#fffae6";
heading.style.fontSize = "36px";
```

### Better Practice: Toggling Classes
Instead of writing inline CSS, toggle CSS classes defined in your stylesheet:
```javascript
heading.classList.add("highlight");
heading.classList.remove("dimmed");
```

---

## 🌍 Real-World Example

Think of "Dark Mode" in a reading app or on your school website:
When you flip the switch to Dark Mode:
1. JavaScript finds the `<body>` element: `let body = document.body;`
2. It toggles a class: `body.classList.toggle("dark-theme");`
3. CSS rules instantly recolor the background to black and the text to white!

---

## 💻 Code Example

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
        <h2 id="team-name">Blue House</h2>
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

## 🔍 Line-by-Line Explanation

- `document.getElementById("team-name")`: Finds the `<h2>` tag whose ID attribute is `"team-name"`.
- `teamHeading.textContent = "Golden Eagles 🦅"`: Replaces `"Blue House"` with `"Golden Eagles 🦅"`.
- `teamHeading.style.color = "#d97706"`: Directly applies an inline CSS amber gold color.
- `scoreSpan.textContent = currentScore`: Replaces `"0"` with `"10"`.
- `scoreSpan.classList.add("winner")`: Adds the `.winner` CSS class so it turns bold green.

**Result on the page:** the box now shows the heading **Golden Eagles 🦅** in amber, and `Score: 10` with the 10 in bold green.

---

## 🔮 Predict the Output

```html
<p id="msg">Hello <b>World</b></p>
```
```javascript
let p = document.getElementById("msg");
console.log(p.textContent);
console.log(p.innerHTML);
```
*What is the difference between what `textContent` and `innerHTML` return?*

<details>
<summary>👀 Click to check your answer</summary>

```text
Hello World
Hello <b>World</b>
```

`textContent` gives only the words. `innerHTML` gives the words **and** the HTML tags inside the element.

</details>

---

## 🧭 Think Like a Programmer: Separation of Concerns

Good web developers keep three layers distinct:
1. **HTML:** Content and semantic hierarchy.
2. **CSS:** Presentation, layout, and colors.
3. **JavaScript:** Logic, calculation, and interaction.

Avoid hardcoding complex styles inside JavaScript. Instead, write the visual design in CSS under class names (like `.is-active`, `.has-error`, `.hidden`), and let JavaScript simply toggle those classes!

---

## 🚀 Coding Challenge

Write a script that selects all `<p>` tags on a page using `document.querySelectorAll("p")` and loops through them with a `for` loop, adding a numbered prefix to each paragraph. (`querySelectorAll` gives back a list that works like an array: it has `.length` and items at `[0]`, `[1]` and so on.)
- `"Paragraph 1: ..."`
- `"Paragraph 2: ..."`

---

## 🛠️ Mini Project: Interactive Digital Business Card

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

## ⚠️ Common Mistake

Find the 3 errors in this code:
```javascript
let myTitle = document.getElementByID("page-title");
myTitle.text = "Welcome to my website";
myTitle.style.background-color = "blue";
```

- **What happens**: JavaScript refuses to run it: `SyntaxError: Invalid left-hand side in assignment`.
- **Error 1**: The method is `getElementById`, with a small `d` at the end. `getElementByID` would give `TypeError: document.getElementByID is not a function`.
- **Error 2**: There is no `.text` property for changing words. Use `.textContent`.
- **Error 3**: In JavaScript, CSS names with dashes become camelCase: `background-color` becomes `backgroundColor`. A dash would mean "minus".
- **Fix the code**:
  ```javascript
  let myTitle = document.getElementById("page-title");
  myTitle.textContent = "Welcome to my website";
  myTitle.style.backgroundColor = "blue";
  ```

---

## ✍️ Try It

1. Open any web page in your browser (for example, `https://example.org`).
2. Right-click anywhere and select **Inspect** to open DevTools.
3. Switch to the **Console** tab.
4. Type:
   ```javascript
   document.body.style.backgroundColor = "lightyellow";
   document.querySelector("h1").textContent = "I Changed This Heading!";
   ```
5. Press Enter and watch the live website change instantly before your eyes!

> 💡 **Hint:** The change happens only in **your** browser, not on the real website. Refresh the page and everything goes back. If you see `Cannot set properties of null`, that page has no `<h1>`: try `"h2"` instead.

---

## 📝 Recap

- The DOM is the browser's JavaScript representation of HTML.
- Select elements using `getElementById` or `querySelector`.
- Modify text with `.textContent`.
- Update inline styles using `.style.propertyName`.
- Add, remove, or toggle CSS classes with `.classList`.
- Keep scripts at the bottom of the `<body>` so elements exist before they are selected.

**Check yourself:**

- [ ] I can select an element by its ID.
- [ ] I know how to update the text of an `<h1>` tag with JavaScript.
- [ ] I can change the background color of an element.
- [ ] I understand the difference between HTML, CSS, and JS roles.

---

## 📖 Key Terms

- **DOM:** Document Object Model.
- **Node / Element:** An individual HTML tag inside the DOM tree.
- **querySelector:** Flexible method to select elements using CSS selector syntax.
- **textContent:** The plain text contained within an element.
- **innerHTML:** The raw HTML markup inside an element.
- **classList:** An interface allowing addition and removal of CSS classes.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. What does DOM stand for?
2. Which property safely changes only the text inside an element?

<details>
<summary>Show answer</summary>

1. **Document Object Model.**
2. `.textContent`

</details>

### 🟡 Level 2: Apply
Given `<p id="status">Loading...</p>`, write JavaScript that changes its text to `"Complete!"` and its colour to green.

Extra: why do we put the `<script>` tag at the bottom of the `<body>`?

<details>
<summary>Show answer</summary>

```javascript
let status = document.getElementById("status");
status.textContent = "Complete!";
status.style.color = "green";
```

The page now shows **Complete!** in green.

Extra: the browser reads HTML from top to bottom. If the script runs first, the element does not exist yet. `getElementById` then gives `null`, and changing it causes an error.

</details>

### 🔴 Level 3: Challenge
Build a student profile card:
1. Write HTML with empty elements for name, class and school, each with an `id`.
2. In `script.js`, create a `student` object with those three values.
3. Fill every element from the object using `.textContent`.
4. Add a CSS class to the card with `.classList.add()`.

<details>
<summary>Show one possible answer</summary>

```html
<div id="card" class="card">
    <h2 id="name"></h2>
    <p>Class: <span id="class-name"></span></p>
    <p>School: <span id="school"></span></p>
</div>
<script src="script.js"></script>
```

```javascript
let student = {
    name: "Hamza Ali",
    className: "7-B",
    school: "Green Valley Academy"
};

document.getElementById("name").textContent = student.name;
document.getElementById("class-name").textContent = student.className;
document.getElementById("school").textContent = student.school;
document.getElementById("card").classList.add("highlight");
```

The card shows **Hamza Ali**, `Class: 7-B` and `School: Green Valley Academy`.

</details>
