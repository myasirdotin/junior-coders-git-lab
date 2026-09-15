# HTML Reference & Glossary
# Quick Reference Cheat Sheet and HTML Tag Dictionary 📖

---

## 1. Document Skeleton Boilerplate 🧱

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
</head>
<body>
    <h1>Welcome to My Website</h1>
    <p>This is my first web page.</p>
</body>
</html>
```

---

## 2. Core HTML Tags 🏷️

### Headings & Text
- `<h1>` to `<h6>`: Headings from largest/most important (`<h1>`) to smallest (`<h6>`)
- `<p>`: Paragraph block of text
- `<strong>` or `<b>`: Bold / important emphasis
- `<em>` or `<i>`: Italic / idiomatic text
- `<mark>`: Highlighted yellow text
- `<del>`: Strikethrough deleted text
- `<br>`: Line break (self-closing)
- `<hr>`: Horizontal dividing line (self-closing)

### Links & Media
- `<a href="url" target="_blank">`: Hyperlink anchor
- `<img src="path.jpg" alt="Description" width="300">`: Image embed
- `<audio controls src="audio.mp3">`: Audio player
- `<video controls width="400" src="movie.mp4">`: Video player

### Lists
- `<ol>`: Numbered ordered list
- `<ul>`: Bulleted unordered list
- `<li>`: List item element

### Tables
- `<table>`: Table wrapper container
- `<tr>`: Table row
- `<th>`: Header cell (bold & centered by default)
- `<td>`: Standard data cell

### Forms & User Input
- `<form action="submit.php" method="POST">`: Interactive form container
- `<label for="id">`: Accessible form label
- `<input type="text">`: Single-line text box
- `<input type="email">`: Email input with validation
- `<input type="password">`: Masked password input
- `<textarea rows="4">`: Multi-line text field
- `<select>` & `<option>`: Dropdown menu
- `<button type="submit">`: Clickable submit button

### Semantic Layout Elements
- `<header>`: Top masthead or banner
- `<nav>`: Primary navigation links
- `<main>`: Main unique content of the page
- `<section>`: Thematic grouping of content
- `<article>`: Self-contained independent composition
- `<aside>`: Sidebar or tangential notes
- `<footer>`: Bottom copyright and footer links
- `<div>`: Generic container block
- `<span>`: Generic inline phrase container

---

## 3. HTML Glossary 📚

| Term | Definition |
| :--- | :--- |
| **Tag** | Code keyword wrapped in angle brackets, e.g. `<p>` and `</p>`. |
| **Element** | An entire HTML component consisting of the opening tag, content, and closing tag. |
| **Attribute** | Additional key-value properties inside opening tags, e.g. `href="..."` or `class="..."`. |
| **Boilerplate** | Standard starter code required for every valid HTML document. |
| **Semantics** | Using tags that clearly convey meaning to both humans and browser engines (e.g. `<nav>` instead of `<div>`). |
| **Accessibility (a11y)** | Designing web pages so people with disabilities can read them (e.g. using `alt` on images). |
