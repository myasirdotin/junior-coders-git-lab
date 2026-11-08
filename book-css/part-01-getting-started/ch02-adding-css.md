# Chapter 2: Adding CSS

---

## Teacher Lesson Plan

### Classroom Planning & Logistics
| Field | Detail | Field | Detail |
| :--- | :--- | :--- | :--- |
| **Grade / Class** | Grade 7 | **Period Duration** | 45 minutes |
| **Unit / Topic** | Getting Started | **Setting** | Computer Lab & Projector |
| **Teacher Name** | ____________________ | **Date / Session** | ____ / ____ / 2026 |

### Learning Objectives (SWBAT)
By the end of this 45-minute lesson, students will be able to:
1. Compare the three ways to add CSS: inline, internal and external.
2. Write inline styles with the style='...' attribute and internal styles in a <style> tag.
3. Create a separate .css file and connect it with <link rel='stylesheet'>.
4. Explain why professional developers usually choose external CSS.

### Required Materials & Setup
- Computer lab with web browsers installed (Chrome, Edge, or Firefox).
- Teacher projector displaying Web Studio (`../studios/web-studio/index.html`) for live modeling.
- Student notebooks for recording key syntax rules, vocabulary, and reflections.

### 45-Minute Instructional Delivery Plan
| Time | Phase | Teacher Activity | Student Activity |
| :--- | :--- | :--- | :--- |
| **0–8 min** | **Hook & Analogy** | Share the chapter opening analogy: *"Three Ways to Add Seasoning to Food"* Connect to today's topic. | Discuss in pairs; volunteer real-life parallels and note the learning target. |
| **8–20 min** | **Direct Instruction** | Model core concepts on the screen. Break down syntax line-by-line; explain architectural structure. | Follow along on screens/notebooks; observe syntax rules and active demonstration. |
| **20–26 min** | **Misconceptions & Diagnostics** | Address Common Mistake: *"A common mistake is putting a <style> tag inside a .css file."* Conduct rapid check for understanding. | Identify faulty patterns in sample snippets; explain correct approach verbally. |
| **26–38 min** | **Guided Lab Practice** | Circulate lab while students execute the hands-on task: *"Create a folder called css-project."* | Code independently or in pairs using Web Studio (`../studios/web-studio/index.html`); test variations. |
| **38–45 min** | **Plenary & Exit Ticket** | Review key takeaways. Pose exit question: *"Where in an HTML document should the <link> tag go?"* Collect summary tickets. | Answer plenary questions; record homework task; submit exit ticket. |

### Differentiated Instruction
- **Support (Struggling Learners):** Provide starter boilerplate or pair with a peer navigator; focus on Level 1 recall and syntax verification.
- **Extension (Fast Finishers):** Assign Level 3 Challenge from the Practice section; encourage adding creative styling or feature extensions.

### Homework & Notebook Task
- Complete Level 2 Apply questions from the chapter Practice section into class notebooks.
- Write a 2-sentence personal explanation of the primary concept taught in this lesson.

### Ethical Stewardship & Digital Values (Amānah & Beneficial Knowledge)
- Emphasize digital trust (*Amānah*): respect school lab hardware, cite code honestly, and apply programming skills toward beneficial knowledge (*'Ilm Nāfi'*).

### Teacher Sign-off & Reflection
- **Teacher Signature:** ___________________________  **HOD / Coordinator Signature:** ___________________________
- **Lesson Reflection / Notes:** _______________________________________________________________________________

---

## Real-Life Story

**Three Ways to Add Seasoning to Food**

Imagine you are preparing a delicious meal and you want to add flavour:
1. **Method 1: Sprinkling a pinch of salt directly onto one bite before eating it.** It works for that one mouthful instantly, but you have to season every single bite individually — exhausting and inconsistent!
2. **Method 2: Placing a small seasoning bowl on the dining table.** Everyone sitting at that one table can use it, but guests in the kitchen or on the patio cannot reach it — it only serves one room at a time.
3. **Method 3: Running a professional kitchen with one master recipe sheet pinned on the wall.** Every chef in every corner of the restaurant follows the exact same flavour instructions at once! If the head chef wants to reduce the salt, they update the one master sheet — and the whole restaurant adjusts instantly!

**CSS can be attached to your web pages in three exact matching ways:**
1. **Inline CSS** (a pinch of seasoning on one single HTML tag).
2. **Internal CSS** (a seasoning bowl for a single page only).
3. **External CSS** (the master recipe sheet that styles 50 pages from one central file)!

---

## What You Will Learn

By the end of this chapter, you will be able to:
- Compare the three ways to add CSS: **inline**, **internal** and **external**.
- Write inline styles with the `style="..."` attribute and internal styles in a `<style>` tag.
- Create a separate `.css` file and connect it with `<link rel="stylesheet">`.
- Explain why professional developers usually choose **external CSS**.

---

## Visual Concept Explanation

### The Three Methods Compared

```text
1. INLINE (inside the tag)
   <h1 style="color: blue;">Hi</h1>
   + quick for a small test
   - messy; hard to change later

2. INTERNAL (<style> in <head>)
   <style>
     h1 { color: blue; }
   </style>
   + one place for one page
   - copy it again for every page

3. EXTERNAL (a separate .css file)
   index.html   ─┐
   about.html   ─┼─> style.css
   contact.html ─┘
   + change one file, every page
     updates (best choice)
```

---

## Code Example: Linking HTML and External CSS

### File 1: `index.html`
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>External Styling Academy</title>
    
    <!-- Connect to external stylesheet -->
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Cosmic Explorers Club</h1>
    <p>We study astronomy, rocket science, and astrophotography.</p>
    <a href="#" class="cta-button">Join the Mission</a>
  </body>
</html>
```

### File 2: `style.css` (Saved in the exact same folder!)
```css
/* =========================================
   Universal External Stylesheet
   ========================================= */

body {
  background-color: #0b132b; /* Deep Space Midnight */
  color: #e0e1dd;            /* Starlight Silver */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 40px;
}

h1 {
  color: #48cae4;            /* Nebula Cyan */
  border-bottom: 2px solid #1c2541;
  padding-bottom: 12px;
}

p {
  font-size: 18px;
  line-height: 1.7;
}

.cta-button {
  display: inline-block;
  background-color: #f72585; /* Cosmic Neon Pink */
  color: white;
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: bold;
  margin-top: 15px;
}
```

---

## Code Explanation: How the `<link>` Tag Works

Look at line 8 of `index.html`:
```html
<link rel="stylesheet" href="style.css">
```
- `<link>`: An HTML tag placed inside `<head>` to connect external resources. (It is a self-closing void tag).
- `rel="stylesheet"`: Stands for **Relationship**. It tells the browser: *"The file I am linking is a Cascading Style Sheet!"*
- `href="style.css"`: The path to your CSS file. If `style.css` is in the same folder as `index.html`, you just write its name!
- Notice that in `style.css`, there are **NO `<style>` tags**! A `.css` file contains pure, 100% CSS rules!

---

## Real-World Connection: How Big Sites Redesign Overnight

Imagine you are a web designer for **Wikipedia**, the free online encyclopedia:
- Wikipedia has **millions** of article pages.
- If every page had its own inline or internal CSS, changing the heading colour would mean editing millions of pages by hand. That could take years!
- Because the pages share **External CSS** files, the team changes one rule in one stylesheet.
- The next time readers open any article, they all see the new look.

---

## Predict the Output

What will happen if you apply two different colors using different methods:

```html
<!-- In style.css -->
h1 { color: blue; }

<!-- In index.html -->
<h1 style="color: red;">Hello World</h1>
```

**Question**: Will the heading be Blue or Red? Why?

<details>
<summary>Click to check your answer</summary>
<strong>Answer: Red!</strong> Inline CSS (written directly on the tag with <code>style="..."</code>) has the highest specificity/priority of all. It overrules both internal and external CSS rules!
</details>

---

## Code Detective: The Mismatched Link

A student created their HTML and CSS files, but the web page remained plain black and white with no styles applied:

```html
<!-- Inside index.html -->
<link rel="stylesheet" href="styles.css">
```
```text
Filename in folder: style.css
```

- **Find the mistake**: Look at the file name: `styles.css` vs `style.css`!
- **Explain the mistake**: Notice the extra letter **"s"**! Computers are literal. If the file is named `style.css` (singular) and your code asks for `styles.css` (plural), the browser cannot find it and ignores the stylesheet!
- **Fix the code**: Change the href to `href="style.css"`!

---

## Think Like a Web Designer: Clean Project Folders

As your websites grow, having 20 HTML files, 5 CSS files, and 30 photos in one messy folder gets overwhelming.
Professional web designers use clean folder organization:

```text
my-website/
  ├── index.html
  ├── about.html
  ├── css/
  │    └── style.css
  └── images/
       └── logo.png

In index.html:
<link rel="stylesheet"
      href="css/style.css">
```

> **Think Before You Code**:
> Keep your stylesheets tucked inside a neat `css/` subfolder. It makes your project look like it was built by a seasoned software engineer!

---

## Mini Challenge: The Multi-Page Style Test

Create a mini 2-page website:
- `page1.html`: "Page 1 - Home"
- `page2.html`: "Page 2 - About Us"
- Link **BOTH** files to the exact same `style.css`.
- In `style.css`, give the `body` a calm mint background (`#ecfdf5`), a forest green heading (`#065f46`), and a styled navigation bar.
- Open both pages in your browser and click between them. Notice how your design stays unified across both pages!

---

## Common Mistake

A common mistake is putting a `<style>` tag inside a `.css` file.

```css
/* Wrong: inside style.css */
<style>
  h1 { color: teal; }
</style>
```

**What happens:** a `.css` file may only contain CSS. The browser reads `<style>` as broken CSS, so the first rule is thrown away. Your heading does not turn teal.

```css
/* Fixed: inside style.css */
h1 {
  color: teal;
}
```

A second slip is writing `<link>` in the `<body>` or forgetting `rel="stylesheet"`. Put the `<link>` inside `<head>` and always include `rel="stylesheet"`.

---

## Try It

**Create the Connection**

1. Create a folder called `css-project`.
2. Inside it, create `index.html` and copy the code from File 1.
3. Inside the same folder, create `style.css` and copy the code from File 2.
4. Double-click `index.html` to open it in your browser.
5. **It works!** You will see your dark space theme with cyan headings and a hot pink pill button!

---

## Recap

- There are three ways to add CSS: **Inline**, **Internal**, and **External**.
- Inline CSS uses the `style="..."` attribute inside individual HTML tags.
- Internal CSS uses the `<style>` tag inside the `<head>` of an HTML document.
- External CSS stores styles in an independent `.css` file linked via `<link rel="stylesheet" href="...">`.
- External CSS is the industry standard because it allows you to style dozens of pages from one single file!

---

## Key Terms

| Term | What It Means |
| :--- | :--- |
| **Inline CSS** | CSS written directly on an HTML element using the `style` attribute. |
| **Internal CSS** | CSS written inside `<style>` tags within the `<head>` of an HTML document. |
| **External CSS** | CSS written in a separate `.css` file and linked into HTML pages. |
| **`<link>`** | The HTML element used to connect external stylesheets. |
| **Specificity** | The priority ranking system browsers use to determine which CSS rule wins. |

---

## Practice

### Level 1: Recall
1. Where in an HTML document should the `<link>` tag go?
2. Which attribute in a `<link>` tag says that the file is a stylesheet?
3. True or false: you should put `<style>` tags inside a `.css` file.

<details>
<summary>Show answer</summary>

1. Inside the `<head>` section.
2. `rel="stylesheet"`.
3. **False.** A `.css` file contains only CSS rules. `<style>` tags belong inside an HTML file.

</details>

### Level 2: Apply
4. Give two reasons why developers prefer external CSS over inline CSS.
5. Write the `<link>` tag that connects an HTML file to `theme.css` inside a subfolder named `assets`.

<details>
<summary>Show answer</summary>

4. Any two of these: one file styles every page; changing one rule updates the whole site; the HTML stays clean and easy to read; the browser can save (cache) the CSS file and load pages faster.

5.
```html
<link rel="stylesheet" href="assets/theme.css">
```

</details>

### Level 3: Challenge
Find out which style wins.
1. Make an HTML file with an internal stylesheet that makes every `<p>` blue.
2. Add three paragraphs.
3. Give the second paragraph an inline style that makes it red.
4. Open the page and explain why only that paragraph is red.

<details>
<summary>Show one possible answer</summary>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Which Style Wins?</title>
    <style>
      p {
        color: blue;
      }
    </style>
  </head>
  <body>
    <p>The library opens at 8 am.</p>
    <p style="color: red;">The library is closed on Friday.</p>
    <p>New books arrive every Monday.</p>
  </body>
</html>
```

The first and third paragraphs are blue. The second is red. An inline style is written on the element itself, so it is the most specific and wins over the internal rule.

</details>
