# Chapter 7: CSS Variables (Custom Properties) 🧪

---

## 🌟 Real-Life Story

**The School Colour on the Notice Board**

Green Valley School has a school colour: deep teal. It is on the sports kit, the library signs, the certificates and the website. One year the school decides to change it to a darker green.

Imagine every poster said "paint this #0f766e". Someone would have to find and repaint hundreds of things. Now imagine every poster simply said "paint this **the school colour**". The office writes the new colour in **one** place, and everyone uses it.

**CSS variables work like "the school colour".** You give a value a name once, at the top of your stylesheet. Every rule uses the name. To change the whole theme, you change one line.

---

## 🎯 What You Will Learn

By the end of this chapter, you will be able to:
- Create CSS variables (custom properties) such as `--brand: #0f766e;` on `:root`.
- Use them with `var(--brand)` and give a fallback with `var(--brand, teal)`.
- Explain how variables are inherited and override one inside a class.
- Build a light and dark theme by changing only the variables.
- Choose clear names for your variables.

---

## 👁️ Visual Concept Explanation

### Define Once, Use Everywhere

```text
:root {
  --brand: #0f766e;   <- defined ONCE
}
        │
        ├──> h1      { color: var(--brand); }
        ├──> .button { background-color:
        │               var(--brand); }
        └──> a       { color: var(--brand); }

Change #0f766e to #166534 in ONE line
=> all three update together.
```

### The Two Parts

```text
1. DEFINE (two dashes + a name)
   --brand: #0f766e;

2. USE (inside var())
   color: var(--brand);
```

---

## 🧩 Creating and Using a Variable

A **CSS variable** (official name: **custom property**) is a property you invent yourself. Its name must start with two dashes `--`.

```css
:root {
  --brand: #0f766e;
  --page-bg: #f8fafc;
  --text-size: 18px;
}
```

- `:root` is a pseudo-class (Chapter 3) that picks the top element of the page, the `<html>` tag. Everything on the page is inside it.
- Variables defined on `:root` can therefore be used **everywhere**. They are sometimes called "global" variables.
- A variable can hold any value: a colour, a size, a font list.

To use a variable, write `var()` with the name inside:

```css
body {
  background-color: var(--page-bg);
  font-size: var(--text-size);
}

h1 {
  color: var(--brand);
}
```

**What you see:** a very light gray page, 18px text, and a deep teal heading. It looks exactly as if you had typed the values directly. The difference shows up when you need to change something.

Two rules to remember:
- Names are **case-sensitive**: `--brand` and `--Brand` are two different variables.
- `var()` works only **inside a property value**. You cannot use it as a property name or a selector.

---

## 💻 Code Example: The Food Drive Page

Type this and save it as `variables.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Community Food Drive</title>
    <style>
      /* 1. All the design decisions live here */
      :root {
        --color-bg: #f8fafc;
        --color-text: #1e293b;
        --color-accent: #0f766e;
        --color-on-accent: #ffffff;
        --font-main: 'Segoe UI', Arial, sans-serif;
        --font-size-body: 18px;
      }

      /* 2. The rules only USE the variables */
      body {
        background-color: var(--color-bg);
        color: var(--color-text);
        font-family: var(--font-main);
        font-size: var(--font-size-body);
      }

      h1, h2 {
        color: var(--color-accent);
      }

      .highlight {
        background-color: var(--color-accent);
        color: var(--color-on-accent);
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <h1>Green Valley Community Food Drive</h1>
    <p>Bring rice, lentils, flour or tinned vegetables to the school hall.</p>
    <h2>When</h2>
    <p class="highlight">Every Saturday, 9 am to 12 noon</p>
    <p>Everything collected goes to families in our neighbourhood.</p>
  </body>
</html>
```

**What you see:** a light gray page with dark slate text in Segoe UI (or Arial). Both headings are deep teal. The "Every Saturday" line is a teal strip with bold white words. Deep teal on white has a contrast of about 5.5 : 1, so it is easy to read. For normal text, aim for at least 4.5 : 1 (Chapter 4 introduced contrast).

---

## 🔍 Code Explanation: Why This Is Better

- **One place to change.** Change `--color-accent` to `#166534` (forest green). The headings **and** the highlight strip change together.
- **The rules describe meaning.** `color: var(--color-accent)` says *why* the colour is used, not just which colour it is.
- **Fewer typing mistakes.** Typing `#0f766e` ten times invites a slip like `#0f776e`. A wrong variable name is easier to spot.

---

## 🛟 Fallback Values

What if a variable does not exist? You can give `var()` a second value, after a comma. It is used only when the variable is missing:

```css
.notice {
  color: var(--notice-color, navy);
}
```

- If `--notice-color` is defined, the notice uses it.
- If nobody defined `--notice-color`, the notice is **navy**.

A fallback is a safety net, like "if the school colour is not decided yet, use navy".

Be careful: the fallback is **not** used when the variable exists but holds a wrong kind of value. If `--notice-color: 20px;`, the browser does not use navy. It treats the `color` line as if it were not there, so the text keeps its inherited colour.

---

## 🌳 Scope: Variables Are Inherited

Variables follow the same **inheritance** you learned in Chapter 3. A variable set on an element passes down to everything inside it.

That means you can **override** a variable for one part of the page:

```css
:root {
  --accent: #0f766e;   /* teal everywhere */
}

.urgent-box {
  --accent: #b91c1c;   /* red, but only inside this box */
}

h2, p {
  color: var(--accent);
}
```

```html
<h2>Library News</h2>
<p>New atlases have arrived.</p>

<section class="urgent-box">
  <h2>Important</h2>
  <p>The library is closed on Thursday.</p>
</section>
```

```text
:root            --accent = teal
 ├── h2  Library News      -> teal
 ├── p   New atlases...    -> teal
 └── .urgent-box --accent = red
      ├── h2 Important     -> red
      └── p  The library...-> red
```

**What you see:** "Library News" and its paragraph are teal. "Important" and the closing notice are red. The `h2, p` rule never changed. Only the variable changed inside `.urgent-box`.

This is very useful for things like cards. Each card type sets its own `--accent`, and one shared rule does the rest.

---

## 🌗 Light and Dark Themes

A **dark theme** shows light text on a dark background. Many people prefer it at night, and it can be gentler on the eyes in a dark room. With variables, a theme is just **a second set of values**.

### Method 1: A `data-theme` Attribute

In HTML you may add your own attributes that start with `data-`. Put one on the `<html>` tag:

```html
<html lang="en" data-theme="dark">
```

Then use an attribute selector (Chapter 3) to swap the values:

```css
:root {
  --color-bg: #f8fafc;
  --color-text: #1e293b;
  --color-accent: #0f766e;
  --color-on-accent: #ffffff;
}

[data-theme="dark"] {
  --color-bg: #0f172a;
  --color-text: #e2e8f0;
  --color-accent: #5eead4;
  --color-on-accent: #0f172a;
}
```

Add this to the food drive page. **What you see:** a deep navy page with light gray text. The headings become bright mint. The "Every Saturday" strip is mint with dark navy words. You did not touch a single rule in `body`, `h1, h2` or `.highlight`.

Why does the dark set win? `:root` scores 0-1-0 (a pseudo-class). `[data-theme="dark"]` also scores 0-1-0 (an attribute). It is a tie, so the **later** rule wins. Always write the dark set after the light set.

Remove `data-theme="dark"` from `<html>` and the light theme returns. Later, in the JavaScript book, you will learn to add a button that switches this attribute.

### Method 2: Follow the Device Setting

Phones and computers have a light or dark setting. CSS can ask the device which one the person chose. It uses `@media`, a way to say "only use these rules when...". Chapter 14 teaches `@media` fully.

```css
:root {
  --color-bg: #f8fafc;
  --color-text: #1e293b;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #0f172a;
    --color-text: #e2e8f0;
  }
}
```

**What you see:** if your device is set to dark mode, the page is dark. If it is set to light mode, the page is light. The visitor did nothing on your page; the page simply respects their choice.

### Checking Both Themes

| Pair | Light theme | Dark theme |
| :--- | :--- | :--- |
| Text on page | `#1e293b` on `#f8fafc` (about 14 : 1) | `#e2e8f0` on `#0f172a` (about 14.5 : 1) |
| Accent on page | `#0f766e` on `#f8fafc` (about 5.2 : 1) | `#5eead4` on `#0f172a` (about 12 : 1) |

Both themes pass the 4.5 : 1 minimum for normal text. Notice that the dark accent is a **lighter** teal. The same dark teal on a navy page would be very hard to read.

---

## 🏷️ Naming Tips

Good names make a stylesheet easy to read months later.

| Avoid | Prefer | Why |
| :--- | :--- | :--- |
| `--blue` | `--color-accent` | In dark mode the accent may not be blue at all. |
| `--c1` | `--color-text` | Anyone can guess what it is for. |
| `--BigText` | `--font-size-large` | Lowercase with dashes, like CSS itself. |
| `--x` | `--color-card-bg` | Short is good; mysterious is not. |

- **Name by purpose, not by look.** `--color-danger` stays correct even if you change it from red to dark orange.
- **Group with a prefix:** `--color-...`, `--font-...`, `--size-...`. Related variables then sit together.
- **Keep the list at the top.** Put all global variables in one `:root` rule at the start of your CSS. It becomes your design "control panel".

---

## 🌍 Real-World Connection: Design Tokens

Large websites and apps keep their colours, fonts and sizes in a list of named values called **design tokens**. Designers and programmers both use the same names, such as `color-accent` or `size-large`. On websites, these tokens usually become CSS variables. The Junior Coders site you are reading works the same way: its dark and light themes swap a set of CSS variables.

---

## 🔮 Predict the Output

```css
:root   { --accent: green; }
.box    { --accent: purple; }
.box p  { color: var(--accent, orange); }
.note   { color: var(--title-color, orange); }
```

```html
<div class="box">
  <p>Paragraph A</p>
</div>
<p class="note">Paragraph B</p>
```

**Question**: What colour are A and B?

<details>
<summary>👀 Click to check your answer</summary>

**A is purple.** The paragraph is inside `.box`, which overrides `--accent` to purple. The variable exists, so the fallback (orange) is not used.

**B is orange.** Nobody defined `--title-color`, so the fallback is used.

</details>

---

## ⚠️ Common Mistake

**Mistake 1: forgetting `var()`.**

```css
/* Wrong */
h1 {
  color: --brand;
}
```

**What happens:** `--brand` on its own is not a colour, so the browser ignores the whole line. The heading keeps its normal colour.

```css
/* Fixed */
h1 {
  color: var(--brand);
}
```

**Mistake 2: defining a variable in the wrong place.**

```css
/* Wrong */
.header {
  --brand: #0f766e;
}

.footer {
  color: var(--brand);
}
```

**What happens:** `--brand` is inherited only by elements **inside** `.header`. The footer is not inside the header, so for the footer `--brand` does not exist. The colour line has no effect.

**Fix:** define shared variables on `:root`, so every element can reach them.

---

## ✍️ Try It

**Repaint the Food Drive in One Line**

1. Open `variables.html` from this chapter.
2. Change only `--color-accent` to `#7c2d12` (a deep brown). Reload. How many things changed colour?
3. Add `data-theme="dark"` to the `<html>` tag and add the dark `[data-theme="dark"]` rule from this chapter at the end of the `<style>`. Reload.
4. Remove the attribute again and check that the light theme is back.

*Hint:* In step 2, the two headings and the "Every Saturday" strip should change. If nothing changes, check that you edited inside `:root` and kept the two dashes.

---

## 📝 Recap

- A CSS variable (custom property) has a name starting with `--`, for example `--brand: #0f766e;`.
- Define global variables on `:root`. Use them with `var(--brand)`.
- `var(--name, fallback)` uses the fallback only when the variable does not exist.
- Variables are inherited. Set a new value inside a class to change it for that part of the page only.
- A theme is just a second set of variable values, switched with `[data-theme="dark"]` or `@media (prefers-color-scheme: dark)`.
- Name variables by purpose (`--color-accent`), not by appearance (`--blue`).

---

## 📖 Key Terms

| Term | What It Means |
| :--- | :--- |
| **CSS variable / custom property** | A named value you create, such as `--brand`, and reuse with `var()`. |
| **`var()`** | The function that reads a variable's value. |
| **`:root`** | A pseudo-class that selects the `<html>` element, the top of the page. |
| **Fallback** | The second value in `var(--x, fallback)`, used when `--x` is missing. |
| **Theme** | A full set of colours (and sometimes fonts) for a site, such as light or dark. |
| **`prefers-color-scheme`** | A media feature that tells CSS whether the device is set to light or dark. |

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. What must every CSS variable name start with?
2. Which selector is usually used for variables that the whole page needs?
3. In `color: var(--heading, navy);`, when is `navy` used?

<details>
<summary>Show answer</summary>

1. Two dashes: `--`.
2. `:root`.
3. Only when `--heading` is not defined.

</details>

### 🟡 Level 2: Apply
4. Write a `:root` rule with three variables: a page background `#fefce8`, a text colour `#422006` and an accent `#a16207`. Then write a `body` rule that uses the first two.
5. A card should use red as its accent, but every other part of the page keeps teal. Without writing a new `color` rule, how do you do it?

<details>
<summary>Show answer</summary>

4.
```css
:root {
  --color-bg: #fefce8;
  --color-text: #422006;
  --color-accent: #a16207;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
}
```

5. Override the variable inside the card's class, for example `.card-urgent { --color-accent: #b91c1c; }`. Every rule that uses `var(--color-accent)` inside that card now gets red, because variables are inherited.

</details>

### 🔴 Level 3: Challenge
Build a "Prayer Times" page with a light and a dark theme.
1. Make a page with an `<h1>`, a short paragraph and a list of the five daily prayers with times.
2. Put **all** colours and the font in variables on `:root`. No colour may be written directly inside another rule.
3. Give the list a `.times` class with its own background colour variable.
4. Add a `[data-theme="dark"]` rule that changes only the variables.
5. Test both themes by adding and removing `data-theme="dark"` on `<html>`.

<details>
<summary>Show one possible answer</summary>

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prayer Times</title>
    <style>
      :root {
        --color-bg: #f8fafc;
        --color-text: #1e293b;
        --color-accent: #0f766e;
        --color-list-bg: #ffffff;
        --font-main: 'Segoe UI', Arial, sans-serif;
      }

      [data-theme="dark"] {
        --color-bg: #0f172a;
        --color-text: #e2e8f0;
        --color-accent: #5eead4;
        --color-list-bg: #1e293b;
      }

      body {
        background-color: var(--color-bg);
        color: var(--color-text);
        font-family: var(--font-main);
      }

      h1 {
        color: var(--color-accent);
      }

      .times {
        background-color: var(--color-list-bg);
      }
    </style>
  </head>
  <body>
    <h1>Prayer Times Today</h1>
    <p>Times for Green Valley Masjid. Please arrive a few minutes early.</p>
    <ul class="times">
      <li>Fajr: 5:10 am</li>
      <li>Dhuhr: 12:35 pm</li>
      <li>Asr: 3:50 pm</li>
      <li>Maghrib: 6:05 pm</li>
      <li>Isha: 7:25 pm</li>
    </ul>
  </body>
</html>
```

**What you see (dark):** a navy page, light gray text, a mint heading and the list on a slightly lighter slate background. Remove `data-theme="dark"` and the page becomes light gray with dark slate text, a teal heading and a white list. The times shown are example values.

</details>
