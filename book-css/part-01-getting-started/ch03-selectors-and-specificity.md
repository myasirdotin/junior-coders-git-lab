# Chapter 3: Selectors & Specificity 🎯

---

## 🌟 Real-Life Story

**Who Gets the Message?**

Picture the morning assembly at Green Valley School. The principal can speak to people in three ways.
1. **"All students, please sit down."** This message is for everyone.
2. **"Class 7B, please stay after assembly."** This message is for one group.
3. **"Amina Yusuf, please come to the office."** This message is for one person only.

Now imagine two messages disagree. "All students, go to class" and "Amina, come to the office." Amina follows the message that named her. The more exact message wins.

**CSS works the same way.** A **selector** is the part of a rule that says *who* gets the style. Some selectors speak to every tag, some to a group, and some to one element. When two rules disagree, the browser picks the more exact one. That idea is called **specificity**.

---

## 🎯 What You Will Learn

By the end of this chapter, you will be able to:
- Write type, class, id, universal and grouped selectors.
- Pick elements inside other elements with descendant (`nav a`) and child (`ul > li`) selectors.
- Use attribute selectors and preview pseudo-classes such as `:hover` and `:first-child`.
- Work out which rule wins using the cascade and a simple specificity score.
- Explain which styles are inherited and why to avoid `!important` and ids for styling.

---

## 👁️ Visual Concept Explanation

### Five Basic Selectors

```text
SELECTOR    PICKS                EXAMPLE
p           every <p>            p { }
.notice     class="notice"       .notice { }
#top        id="top"             #top { }
*           every element        * { }
h1, h2      every h1 AND h2      h1, h2 { }
```

- A **type selector** (also called an element selector) is just the tag name: `p`, `h1`, `li`.
- A **class selector** starts with a dot. It picks every element with that `class`. Many elements can share a class.
- An **id selector** starts with `#`. An id must be **unique**: only one element on a page may have it.
- The **universal selector** `*` picks every element on the page.
- A **selector list** (grouping) puts selectors together with commas. The same style goes to all of them.

### One Element, Many Classes

An element may have more than one class. Separate them with spaces:

```html
<p class="notice urgent">Library closes early today.</p>
```

This paragraph matches `.notice` **and** `.urgent`.

---

## 💻 Code Example: The Library Notice Board

Type this and save it as `selectors.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Library Notice Board</title>
    <style>
      /* Type selector */
      body {
        background-color: whitesmoke;
        color: #1e293b;
      }

      /* Grouping: both headings get this */
      h1, h2 {
        color: teal;
        text-align: center;
      }

      /* Class selector */
      .notice {
        background-color: lightyellow;
        font-size: 18px;
      }

      /* A second class on the same element */
      .urgent {
        color: firebrick;
      }

      /* Id selector (only one element has this id) */
      #opening-hours {
        background-color: honeydew;
      }
    </style>
  </head>
  <body>
    <h1>Green Valley Library</h1>
    <h2>This Week</h2>
    <p class="notice">New science books arrive on Monday.</p>
    <p class="notice urgent">The library closes at 1 pm on Thursday.</p>
    <p id="opening-hours">Open 8 am to 4 pm, Saturday to Thursday.</p>
    <p>Please return books on time so others can read them.</p>
  </body>
</html>
```

**What you see:**
- Both headings are teal and centred.
- The first notice has a light yellow background, larger text and dark slate words.
- The second notice is light yellow, larger, and its words are **firebrick red** (it has both classes).
- The opening-hours paragraph has a pale green background.
- The last paragraph has no class or id, so it only gets the `body` colours.

---

## 🧭 Selecting Elements Inside Other Elements

HTML elements live inside each other, like boxes inside boxes. CSS can use that.

### Descendant Selector (a space)

`nav a` means: *"every `<a>` that is somewhere inside a `<nav>`"*. It can be a child, a grandchild or deeper.

### Child Selector (`>`)

`ul > li` means: *"every `<li>` whose **direct parent** is a `<ul>`"*. Grandchildren do not count.

```text
<div class="box">
 ├── <p> A          (child of .box)
 └── <section>
      └── <p> B     (grandchild of .box)

.box p    picks A and B
.box > p  picks A only
```

Try it:

```html
<style>
  .box > p {
    color: crimson;
  }
</style>

<div class="box">
  <p>A: Science fair on Sunday.</p>
  <section>
    <p>B: Bring your project poster.</p>
  </section>
</div>
```

**What you see:** paragraph A is crimson. Paragraph B stays the normal body colour, because it is a grandchild, not a direct child. Change `.box > p` to `.box p` and both turn crimson.

### Two Selectors with No Space

`p.notice` (no space) means: *"a `<p>` that **also** has the class `notice`"*. Both must be true for the same element. Compare:

```text
p.notice    a <p> with class="notice"
p .notice   something with class="notice"
            INSIDE a <p>
```

One small space changes the meaning completely.

---

## 🔖 Attribute Selectors

An **attribute** is extra information inside a tag, like `type="email"`. Square brackets select by attribute:

```css
input[type="email"] {
  background-color: aliceblue;
}

input[type="password"] {
  background-color: lavenderblush;
}
```

```html
<input type="email" placeholder="Your school email">
<input type="password" placeholder="Password">
<input type="text" placeholder="Your name">
```

**What you see:** the email box is pale blue, the password box is pale pink, and the name box stays white. You did not need to add a single class.

---

## 👆 A First Look at Pseudo-Classes

A **pseudo-class** starts with a colon `:`. It selects an element when it is in a special state or position. You will use them a lot in later chapters. Here are two:

```css
/* When the mouse is over a button */
button:hover {
  background-color: gold;
}

/* The first <li> inside its parent */
li:first-child {
  font-size: 22px;
}
```

```html
<button>Borrow this book</button>
<ul>
  <li>Monday: Astronomy club</li>
  <li>Tuesday: Quran recitation circle</li>
  <li>Wednesday: Robotics club</li>
</ul>
```

**What you see:** the button turns gold only while the mouse is over it. "Monday: Astronomy club" is bigger than the other two items, because it is the first child of the list. Chapter 18 (Hover Effects) explores `:hover` in depth.

---

## ⚖️ When Rules Disagree: The Cascade

Often two rules try to set the same property on the same element. The browser must choose one. It asks these questions in order:

```text
1. Is one rule MORE SPECIFIC?
   Yes -> the more specific rule wins.
2. Same specificity?
   -> the rule written LATER wins.
```

You met step 2 in Chapter 1:

```css
p { color: red; }
p { color: blue; }
```

Both selectors are equal, so the later rule wins. Paragraphs are **blue**. This "later rule wins" order is the **cascade** (the "C" in CSS).

---

## 🔢 Specificity as a Score

Think of specificity as a score with three columns: **ids – classes – elements**.

```text
  ids - classes - elements
   1  -    0    -    0      #title
   0  -    1    -    0      .notice
   0  -    0    -    1      p
```

How to count:
- Each **id** adds 1 to the first column.
- Each **class**, **attribute** (`[type="email"]`) or **pseudo-class** (`:hover`) adds 1 to the middle column.
- Each **element** name (`p`, `nav`, `li`) adds 1 to the last column.
- The universal selector `*` and the `>` sign add nothing.

### Worked Examples

| Selector | ids | classes | elements | Score |
| :--- | :---: | :---: | :---: | :---: |
| `*` | 0 | 0 | 0 | 0-0-0 |
| `p` | 0 | 0 | 1 | 0-0-1 |
| `nav a` | 0 | 0 | 2 | 0-0-2 |
| `.notice` | 0 | 1 | 0 | 0-1-0 |
| `p.notice` | 0 | 1 | 1 | 0-1-1 |
| `input[type="email"]` | 0 | 1 | 1 | 0-1-1 |
| `ul > li:first-child` | 0 | 1 | 2 | 0-1-2 |
| `#opening-hours` | 1 | 0 | 0 | 1-0-0 |
| `#menu .link` | 1 | 1 | 0 | 1-1-0 |

### Comparing Scores

Compare the **first column first**. Only if it is a tie, look at the next column. It works like sorting words in a dictionary: the first letter decides before the second.

```text
0-1-0  vs  0-0-5
 ^          ^
first columns tie (0 and 0)
middle: 1 beats 0
=> 0-1-0 wins
```

So one class beats any number of element names. One id beats any number of classes.

### Worked Example: Which Colour?

```html
<h1 id="page-title" class="title">Green Valley Library</h1>
```

```css
#page-title { color: teal; }     /* 1-0-0 */
.title      { color: purple; }   /* 0-1-0 */
h1          { color: navy; }     /* 0-0-1 */
```

**Answer:** the heading is **teal**. The id rule scores 1-0-0, the highest. It wins even though it is written first.

### Worked Example: Same Score

```css
.notice { color: green; }   /* 0-1-0 */
.urgent { color: red; }     /* 0-1-0 */
```

```html
<p class="notice urgent">Library closes early.</p>
```

**Answer:** **red**. Both scores are 0-1-0, so the later rule wins. The order of the classes inside `class="..."` does not matter. Only the order of the rules in the CSS matters.

### And Inline Styles?

In Chapter 2 you saw that `style="..."` on a tag beats internal and external rules. An inline style is even stronger than an id. Think of it as a fourth column on the far left. That is one more reason to keep styles in a stylesheet: inline styles are very hard to override.

---

## 🧬 Inheritance: Styles Children Receive

Some properties pass down from a parent element to everything inside it. This is called **inheritance**.

```css
body {
  color: darkslategray;
  font-size: 18px;
}
```

Every paragraph, list item and heading inside `<body>` now uses dark slate gray text. You did not write a rule for each one. Text properties such as `color`, `font-size`, `font-family` and `text-align` are inherited.

Box properties are **not** inherited. For example, `background-color` stays on the box you set it on. A **border** (a line drawn around a box, coming in Chapter 9) is not inherited either. Imagine a border on `<body>` copied onto every paragraph and word inside it. The page would be full of boxes!

```text
INHERITED          NOT INHERITED
color              background-color
font-size          border
font-family        width, height
text-align         padding, margin
```

Two things to remember:
- **Any rule that targets an element beats inheritance.** Even `p { color: black; }` (0-0-1) beats a colour inherited from `body`.
- **Links have their own colour.** The browser gives `<a>` its own blue, so a link does not inherit the body colour. Style `a` directly.

---

## 🌍 Real-World Connection: Big Teams, Calm Stylesheets

Large websites have thousands of lines of CSS written by many people.
- If people style with ids and `!important`, every new change needs an even stronger selector to win.
- The stylesheet turns into a "tug of war" that nobody can predict.
- Most teams agree on a simple rule: **style with classes**, keep selectors short, and let the cascade do its job.

---

## 🔮 Predict the Output

```css
p        { color: blue; }    /* rule A */
.intro p { color: green; }   /* rule B */
p        { color: orange; }  /* rule C */
```

```html
<div class="intro">
  <p>Welcome to the science club.</p>
</div>
<p>Meetings are on Tuesday.</p>
```

**Question**: What colour is each paragraph?

<details>
<summary>👀 Click to check your answer</summary>

**Paragraph 1 is green.** Rule B (0-1-1) is more specific than rules A and C (0-0-1), so it wins even though rule C is later.

**Paragraph 2 is orange.** Only rules A and C match it. They tie at 0-0-1, so the later one, rule C, wins.

</details>

---

## 🚫 Why Avoid `!important` and Ids for Styling

You may see this in other people's CSS:

```css
p {
  color: navy !important;
}
```

`!important` tells the browser: *"ignore specificity, this one wins."* It feels powerful, but:
- Later, when you want one paragraph in red, a normal rule cannot win.
- The only way to beat `!important` is another `!important`. Soon everything shouts.
- It hides the real problem, which is usually a selector that is too strong.

**Ids** cause a smaller version of the same problem:
- An id scores 1-0-0. A class (0-1-0) can never override it.
- An id may be used only once per page, so its style cannot be reused.

**Good habit:** style with **classes**. Keep ids for page links (`href="#contact"`) and for connecting a `<label>` to its input.

---

## ⚠️ Common Mistake

**Mistake 1: forgetting the dot or hash.**

```css
/* Wrong */
notice {
  color: firebrick;
}
```

**What happens:** without a dot, `notice` is a type selector. It looks for a `<notice>` tag, which does not exist. Nothing changes.

```css
/* Fixed */
.notice {
  color: firebrick;
}
```

**Mistake 2: expecting the later rule to win against a stronger one.**

```css
#welcome { color: navy; }   /* 1-0-0 */
.highlight { color: crimson; } /* 0-1-0 */
```

```html
<h1 id="welcome" class="highlight">Welcome</h1>
```

**What happens:** the heading stays navy. The class rule is later, but "later wins" is only for a **tie**. The id is stronger.

**Fix:** do not style with the id. Use two classes instead, such as `.welcome` and `.highlight`. Now both score 0-1-0 and the later rule (crimson) wins.

---

## ✍️ Try It

**The Specificity Detective**

1. Open `selectors.html` from this chapter.
2. Add `class="notice"` to the opening-hours paragraph, so it has both an id and a class.
3. Add this rule at the very end of the `<style>`: `.notice { background-color: lavender; }`
4. Reload. Which background does the opening-hours paragraph show?
5. Now change `#opening-hours` to `.hours` in the CSS, and `id="opening-hours"` to a second class `hours` in the HTML. Reload again.

*Hint:* In step 4 the id (1-0-0) beats the class, so it stays pale green. In step 5, both are 0-1-0. Which rule is written later?

---

## 📝 Recap

- Selectors choose **who** gets a style: type (`p`), class (`.notice`), id (`#top`), universal (`*`) and lists (`h1, h2`).
- A space means "inside" (`nav a`). `>` means "direct child" (`ul > li`). No space means "the same element" (`p.notice`).
- Attribute selectors use square brackets (`input[type="email"]`). Pseudo-classes use a colon (`:hover`, `:first-child`).
- When rules disagree, the higher **specificity** score (ids – classes – elements) wins. On a tie, the **later** rule wins.
- Text properties like `color` and `font-size` are **inherited**. Box properties like `background-color` and `border` are not.
- Style with classes. Avoid `!important` and id selectors for styling.

---

## 📖 Key Terms

| Term | What It Means |
| :--- | :--- |
| **Selector** | The part of a CSS rule that chooses which elements get the style. |
| **Class selector** | A selector starting with `.` that picks every element with that class. |
| **Id selector** | A selector starting with `#` that picks the one element with that id. |
| **Descendant selector** | Two selectors with a space; picks elements anywhere inside another. |
| **Child selector** | Two selectors with `>`; picks only direct children. |
| **Pseudo-class** | A keyword after `:` that selects by state or position (`:hover`, `:first-child`). |
| **Cascade** | The rule that, between equal rules, the later one wins. |
| **Specificity** | A score (ids – classes – elements) that decides which rule is stronger. |
| **Inheritance** | Children receiving some styles, like `color`, from their parent. |

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which symbol starts a class selector, and which starts an id selector?
2. What does the selector `h1, h2, h3` do?
3. What is the specificity score of `.menu`, of `li`, and of `#footer`?

<details>
<summary>Show answer</summary>

1. A class starts with a dot (`.notice`). An id starts with a hash (`#top`).
2. It is a selector list. It gives the same style to every `<h1>`, `<h2>` and `<h3>`.
3. `.menu` is 0-1-0. `li` is 0-0-1. `#footer` is 1-0-0.

</details>

### 🟡 Level 2: Apply
4. Write the score for each selector: `nav a`, `.card p`, `ul > li:first-child`, `input[type="email"]`.
5. A paragraph has `class="tip"`. The CSS is below. What colour is it, and why?

```css
.tip { color: green; }
p    { color: gray; }
```

<details>
<summary>Show answer</summary>

4. `nav a` = 0-0-2. `.card p` = 0-1-1. `ul > li:first-child` = 0-1-2 (`:first-child` counts as a class; `>` counts nothing). `input[type="email"]` = 0-1-1.

5. **Green.** `.tip` scores 0-1-0 and `p` scores 0-0-1. The class rule is more specific, so it wins even though `p` is written later.

</details>

### 🔴 Level 3: Challenge
Build a small "Class 7 Timetable" page.
1. Make a `<ul class="timetable">` with four `<li>` items (four school subjects).
2. Give the whole list dark teal text with **one** rule on `.timetable`. Do not style each `<li>`.
3. Make the first subject bigger using a pseudo-class.
4. Give one `<li>` a second class `today` with a light yellow background.
5. Add an email `<input>` below the list and give it a pale blue background with an attribute selector.
6. Write the score of every selector you used as a CSS comment.

<details>
<summary>Show one possible answer</summary>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Class 7 Timetable</title>
    <style>
      /* 0-1-0: colour is inherited by every li */
      .timetable {
        color: #115e59;
      }

      /* 0-1-1 */
      .timetable li:first-child {
        font-size: 22px;
      }

      /* 0-1-0 */
      .today {
        background-color: lightyellow;
      }

      /* 0-1-1 */
      input[type="email"] {
        background-color: aliceblue;
      }
    </style>
  </head>
  <body>
    <h1>Class 7 Timetable</h1>
    <ul class="timetable">
      <li>Mathematics</li>
      <li class="today">Science</li>
      <li>English</li>
      <li>Computer Studies</li>
    </ul>
    <input type="email" placeholder="Parent email for updates">
  </body>
</html>
```

**What you see:** all four subjects are dark teal, because `color` is inherited from the list. "Mathematics" is larger. "Science" has a light yellow background. The email box is pale blue.

</details>
