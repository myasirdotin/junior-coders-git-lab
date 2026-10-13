# Chapter 7: Special Characters & Comments

---

## 🌟 Real-Life Story

Imagine borrowing a book from your school library. In the margins, a teacher has written small pencil notes: *"Explain this part slowly"* or *"Check this date."* Most readers skip over them, because they are not part of the story. But anyone who looks closely can still read them!

Now imagine the library's computer uses the symbol `#` to mean "start of a book number". If a book title contains a real `#`, the computer gets confused. So the librarian types a special code instead, and the computer prints the symbol correctly.

**HTML has both of these ideas:** comments are the pencil notes in the margin, and character entities are the special codes for symbols that HTML keeps for itself.

---

## 🎯 What You Will Learn

By the end of this chapter, you will be able to:
- Write HTML comments with `<!-- -->` and explain why they are never secret.
- Explain why `<` and `&` must be written as codes when you want them as plain text.
- Use named and numeric character entities such as `&lt;`, `&amp;`, `&copy;` and `&#169;`.
- Use `<meta charset="UTF-8">` so you can type symbols like é, ٱ and ✓ directly.
- Show HTML code on a web page with `<code>` and `<pre>`.

---

## HTML Comments: Notes for People, Not for the Page

A **comment** is a note you write inside your code for yourself or your teammates. The browser does not show it on the page.

A comment starts with `<!--` and ends with `-->`. Everything in between is ignored by the browser.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Science Club</title>
  </head>
  <body>
    <!-- Main title of the page -->
    <h1>Science Club Notice Board</h1>

    <!-- TODO: add the date of the next meeting -->
    <p>We meet every Thursday in Lab 2.</p>
  </body>
</html>
```

**What the browser shows:**

```text
Science Club Notice Board

We meet every Thursday in Lab 2.
```

The two comments are invisible. You have already met comments in Chapter 6, such as `<!-- Horizontal divider line -->`.

### What Are Comments Good For?

| Use | Example |
| :--- | :--- |
| Label a part of the page | `<!-- Contact section -->` |
| Leave a reminder | `<!-- TODO: add the club logo -->` |
| Explain a choice | `<!-- One h1 only: the page title -->` |
| Switch code off for a while | `<!-- <p>Old notice</p> -->` |

**TODO** is a common word programmers use in comments. It means "something still to do".

### Comments Can Cover Many Lines

A comment does not need to fit on one line. It ends only when the browser reaches `-->`.

```html
<!--
  Notice board page
  Made by: Grade 7 Science Club
  Last checked: Monday
-->
<h1>Science Club Notice Board</h1>
```

**What the browser shows:**

```text
Science Club Notice Board
```

### Two Rules for Safe Comments

1. **Do not put a comment inside another comment.** The first `-->` ends the comment, and the rest leaks onto the page.
2. **Do not write two dashes `--` inside a comment.** Use words or a single dash instead.

---

## Comments Are NOT Secret

This is the most important idea in this chapter.

Comments are hidden from the **page**, but they are **not** hidden from people. Every visitor can open your full HTML code. In most browsers, right-click the page and choose **View Page Source**, or press **Ctrl + U**.

```text
 What visitors SEE    What visitors CAN READ
 ─────────────────    ──────────────────────
 Science Club         <!-- Main title -->
 Notice Board         <h1>Science Club ...
                      <!-- TODO: date -->
```

So a comment is like a pencil note in a library book: anyone who looks closely can read it.

> 🛡️ **Amānah (trust) rule:** never write a password, a phone number, an exam answer or any private detail in a comment. If it should be secret, it must not be in the HTML at all.

---

## Why `<` and `&` Are Special

The browser reads your HTML like a detective. When it sees `<`, it thinks: *"A tag starts here!"* When it sees `&`, it thinks: *"A special code starts here!"*

That is a problem when you want those symbols as **plain text**.

### The `<` Problem

A student writes a page about HTML:

```html
<p>Use the <p> tag for paragraphs.</p>
```

**What the browser shows:**

```text
Use the

tag for paragraphs.
```

The browser read `<p>` as a real tag and started a new paragraph. The tag name vanished from the sentence.

### The `&` Problem

Another student wants to explain a code they have just learned:

```html
<p>Type &nbsp; for a space that does not break.</p>
```

**What the browser shows:**

```text
Type   for a space that does not break.
```

The browser turned the code into a space, so the reader never sees it. (You will learn what `&nbsp;` does later in this chapter.)

### The Fix: Character Entities

A **character entity** is a short code that stands for one symbol. Every entity starts with `&` and ends with `;`.

```html
<p>Use the &lt;p&gt; tag for paragraphs.</p>
<p>Type &amp;nbsp; for a space that does not break.</p>
```

**What the browser shows:**

```text
Use the <p> tag for paragraphs.

Type &nbsp; for a space that does not break.
```

Now the reader sees exactly what you meant.

---

## Named and Numeric Entities

There are two ways to write an entity.

- A **named entity** uses an easy word: `&copy;` means ©.
- A **numeric entity** uses the symbol's number: `&#169;` also means ©.

Every symbol in the world has its own number in a big list called **Unicode**. The © sign is number 169. That is why `&#169;` works.

### The Entities You Will Use Most

| You type | Browser shows | Name and use |
| :--- | :--- | :--- |
| `&lt;` | < | **l**ess **t**han: start of a tag |
| `&gt;` | > | **g**reater **t**han: end of a tag |
| `&amp;` | & | **amp**ersand: the "and" sign |
| `&quot;` | " | **quot**ation mark |
| `&nbsp;` | (a space) | **n**on-**b**reaking **sp**ace |
| `&copy;` | © | **copy**right sign |
| `&mdash;` | — | a long dash, about the width of an "m" |
| `&#169;` | © | copyright, written as a number |

### Example: A Library Footer

```html
<p>Opening hours: 8:00 &mdash; 2:00</p>
<p>Books &amp; Journals | Ages 10 &gt; 16</p>
<p>&copy; 2026 Green Valley School Library</p>
<p>&#169; 2026 also works with a number.</p>
```

**What the browser shows:**

```text
Opening hours: 8:00 — 2:00

Books & Journals | Ages 10 > 16

© 2026 Green Valley School Library

© 2026 also works with a number.
```

### Which Ones Must I Use?

You do not need an entity for every symbol. Remember these simple rules:

- **Always** write `&lt;` for a `<` that is plain text.
- **Always** write `&amp;` for an `&` that is plain text.
- Writing `&gt;` for `>` is a good habit. It keeps your code easy to read.
- `&quot;` is needed inside an attribute value that is wrapped in double quotes. In normal paragraph text, a plain `"` is fine.

---

## The Non-Breaking Space `&nbsp;`

In Chapter 6 you learned that browsers squeeze many spaces into one. They also break a long line wherever there is a space.

Sometimes two words must stay together on the same line. A **non-breaking space** is a space where the browser will never break the line.

```html
<p>The charity walk is 5&nbsp;km long and starts at 7&nbsp;a.m.</p>
<p>Speaker: Dr.&nbsp;Amina Qureshi</p>
```

**What the browser shows:**

```text
The charity walk is 5 km long and starts at 7 a.m.

Speaker: Dr. Amina Qureshi
```

It looks like normal text. The difference appears on a narrow phone screen: "5" and "km" will never be split across two lines.

### Use It Sparingly

Do **not** use `&nbsp;` to push text sideways or make gaps:

```html
<!-- Not like this -->
<p>&nbsp;&nbsp;&nbsp;&nbsp;Name: Bilal</p>
```

Lots of `&nbsp;` makes code hard to read and can look messy on phones. Spacing and layout are jobs for **CSS**, which you will learn in the CSS track. Use `&nbsp;` only to keep a number with its unit, or a title with a name.

---

## UTF-8: Type Most Symbols Directly

Do you remember this line from your very first web page?

```html
<meta charset="UTF-8">
```

**UTF-8** is a way of saving text that can store letters and symbols from every language. This line tells the browser: *"This file is saved as UTF-8."*

Because of it, you can type most symbols straight into your code. No entity is needed:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>World Words</title>
  </head>
  <body>
    <h1>Words From Around the World</h1>
    <p>French: café, élève</p>
    <p>Arabic letter: ٱ</p>
    <p>Homework done ✓</p>
    <p>Book price: ₹250</p>
  </body>
</html>
```

**What the browser shows:**

```text
Words From Around the World

French: café, élève

Arabic letter: ٱ

Homework done ✓

Book price: ₹250
```

Two things must match for this to work:
1. The file is **saved** as UTF-8. Most code editors, such as VS Code, do this by default.
2. The page **says** so with `<meta charset="UTF-8">` near the top of the `<head>`.

If the meta line is missing, a browser may guess wrongly. Then "café" can appear as **cafÃ©**. Strange letters like these are a sign that the charset is wrong.

> 💡 **So when do I still need entities?** Only for the characters HTML keeps for itself: `<` and `&` (and `"` inside attributes). Everything else, like é, ✓ and ₹, you can simply type.

---

## Showing Code on a Page: `<code>` and `<pre>`

When you write about HTML, you often want to show code to your readers. Two tags help.

- `<code>` marks a **short piece of code** inside a sentence. Browsers show it in a **monospace** font, where every letter is the same width.
- `<pre>` stands for **preformatted**. It keeps every space and every line break exactly as you typed them. (Normally the browser squeezes them, as you saw in Chapter 6.)

Put `<code>` inside `<pre>` for a block of code with many lines.

> ⚠️ `<code>` and `<pre>` change the font and keep the spaces. They do **not** stop the browser from reading tags! You still need `&lt;` and `&amp;` inside them.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Help Sheet</title>
  </head>
  <body>
    <h1>HTML Help Sheet</h1>
    <p>A line break uses the <code>&lt;br&gt;</code> tag.</p>
    <p>A small page looks like this:</p>
    <pre><code>&lt;h1&gt;Reading Club&lt;/h1&gt;
&lt;p&gt;Books &amp;amp; tea every Friday.&lt;/p&gt;</code></pre>
  </body>
</html>
```

**What the browser shows** (the code parts in a monospace font):

```text
HTML Help Sheet

A line break uses the <br> tag.

A small page looks like this:

<h1>Reading Club</h1>
<p>Books &amp; tea every Friday.</p>
```

Look closely at `&amp;amp;`. The reader should see the code `&amp;`, so its own `&` must be escaped too. That is why it looks doubled.

### Line-by-Line Breakdown

- `<code>&lt;br&gt;</code>`: shows the text `<br>` in a code font, without making a line break.
- `<pre><code>`: starts a code block that keeps line breaks.
- The second line of the block starts at the left edge on purpose. Inside `<pre>`, any spaces you type at the start of a line appear on the page too.

---

## 🔮 Predict the Output

What will the browser show for this code?

```html
<p>5 &lt; 8 &amp;&amp; 9 &gt; 2</p>
<!-- <p>This is a draft line.</p> -->
<p>&copy; Hilltop Science Fair</p>
```

<details>
<summary>Show answer</summary>

```text
5 < 8 && 9 > 2

© Hilltop Science Fair
```

The middle line is inside a comment, so it is not shown at all.

</details>

---

## 🕵️ Code Detective: The Leaking Comment

A student wanted to hide two lines while testing:

```html
<!-- Old menu
<!-- Old notice -->
<p>Library closed on Friday.</p>
-->
<p>Library open every day.</p>
```

- **Find the mistake:** there is a comment inside another comment.
- **Explain the mistake:** the browser ends the comment at the **first** `-->`. So "Library closed on Friday." appears on the page, and so does the stray `-->` text.
- **Fix the code:** use one comment only.

```html
<!-- Old menu
<p>Library closed on Friday.</p>
-->
<p>Library open every day.</p>
```

---

## ⚠️ Common Mistake

**Mistake 1: putting private information in a comment.**

❌ Wrong:

```html
<!-- Admin password is GreenValley2026 -->
<h1>Class 7B Homework Page</h1>
```

What happens: the page looks fine, but anyone who presses **Ctrl + U** can read the password.

✅ Fixed: delete it. Private details never belong in HTML, not even in comments.

```html
<!-- Homework page for Class 7B -->
<h1>Class 7B Homework Page</h1>
```

**Mistake 2: forgetting to escape `<` when showing a tag.**

❌ Wrong:

```html
<p>Use <hr> to draw a line.</p>
```

What happens: the browser draws a real line. The reader sees "Use", then a line, then "to draw a line."

✅ Fixed:

```html
<p>Use <code>&lt;hr&gt;</code> to draw a line.</p>
```

---

## ✍️ Try It

**Make a Mini Help Sheet**

Create a file named `help-sheet.html` with the usual page skeleton. Inside the `<body>`:
1. Add a comment at the top that says what the page is for.
2. Add an `<h1>` with the title "My HTML Help Sheet".
3. Add a paragraph that explains the `<strong>` tag, showing the tag itself with `<code>`.
4. End with a footer paragraph: `© 2026` and your name, with a non-breaking space between your first and last name.

> 💡 **Hint:** write the tag as `<code>&lt;strong&gt;</code>`. Then open the page and press **Ctrl + U** to find your comment in the source.

---

## 📝 Recap

- A comment `<!-- ... -->` is a note for people. The browser does not show it on the page.
- Comments are **not** secret: anyone can read them with View Page Source.
- `<` and `&` have special jobs in HTML, so write `&lt;` and `&amp;` when you mean them as text.
- Entities can be named (`&copy;`) or numeric (`&#169;`); both start with `&` and end with `;`.
- `&nbsp;` keeps two words together on one line; do not use it for spacing.
- With `<meta charset="UTF-8">` you can type é, ٱ, ✓ and ₹ directly; use `<code>` and `<pre>` (plus entities) to show code.

---

## 📖 Key Terms

| Term | What It Means |
| :--- | :--- |
| **Comment** | A note in the code, between `<!--` and `-->`, that the browser does not show. |
| **View Page Source** | A browser tool (Ctrl + U) that shows the full HTML of any page. |
| **Character entity** | A code such as `&lt;` that stands for one symbol. |
| **Unicode** | The world list that gives every letter and symbol its own number. |
| **UTF-8** | A way of saving text that can store every Unicode symbol. |
| **`&nbsp;`** | A non-breaking space: a space where a line never breaks. |
| **`<code>`** | Marks a short piece of code, shown in a monospace font. |
| **`<pre>`** | Preformatted text: keeps spaces and line breaks exactly as typed. |

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. How does an HTML comment start and end?
2. Which entity shows the `&` sign?
3. Which line in the `<head>` lets you type symbols like é and ✓ directly?

<details>
<summary>Show answer</summary>

1. It starts with `<!--` and ends with `-->`.
2. `&amp;`
3. `<meta charset="UTF-8">`

</details>

### 🟡 Level 2: Apply
1. Write the HTML for this sentence so the browser shows it exactly: **Fruit & Vegetables < 50 rupees**
2. A classmate says: "I put the quiz answers in a comment, so students cannot see them." Explain why this is wrong.

<details>
<summary>Show answer</summary>

1.

```html
<p>Fruit &amp; Vegetables &lt; 50 rupees</p>
```

2. Comments are only hidden from the page. Anyone can press **Ctrl + U** (View Page Source) and read every comment. Answers and private details must not be in the HTML at all.

</details>

### 🔴 Level 3: Challenge
Build a "Tag of the Day" card for a school coding club page:
1. Start with a comment that names the club and the page.
2. Add an `<h2>` that shows the text `Tag of the Day: <em>` (the tag must be visible, not used).
3. Add a paragraph that explains the tag in one sentence.
4. Add a `<pre><code>` block with a two-line example that uses `<em>`.
5. End with a footer line with the copyright sign written as a **numeric** entity.

<details>
<summary>Show one possible answer</summary>

```html
<!-- Hilltop Coding Club: Tag of the Day card -->
<h2>Tag of the Day: &lt;em&gt;</h2>
<p>The <code>&lt;em&gt;</code> tag stresses a word, and browsers show it in italics.</p>
<pre><code>&lt;p&gt;Please read the
&lt;em&gt;whole&lt;/em&gt; question.&lt;/p&gt;</code></pre>
<p>&#169; 2026 Hilltop Coding Club</p>
```

**What the browser shows:**

```text
Tag of the Day: <em>

The <em> tag stresses a word, and browsers show it in italics.

<p>Please read the
<em>whole</em> question.</p>

© 2026 Hilltop Coding Club
```

</details>
