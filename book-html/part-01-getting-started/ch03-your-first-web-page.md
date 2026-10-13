# Chapter 3: Your First Web Page

---

## 🌟 Real-Life Story

Remember the very first time you were handed a blank sheet of drawing paper and a fresh set of colored pencils? Before you drew your first line, the page had limitless possibilities. You could draw a spaceship cruising past Saturn, a cozy treehouse in a quiet forest, or a futuristic race car.

Today is that day for your digital journey! We are going to take a completely blank text document, write your very first real web page instructions, save it with the secret key that computers recognize, and open it inside your web browser. 

When you see your words glowing on your screen inside a browser window, you won't just be an internet visitor anymore—**you will officially become a web creator!**

---

## 🎯 What You Will Learn

By the end of this chapter, you will be able to:
- Choose and use a beginner-friendly code editor (like VS Code, Notepad, or TextEdit).
- Create and save a file with the proper `.html` file extension.
- Understand why file naming conventions (lowercase, no spaces) matter in coding.
- Type the modern HTML5 boilerplate structure accurately.
- Open your HTML file directly in any browser and use the Refresh button to preview updates.

---

## Visual Concept Explanation

### The 4-Step Cycle of Web Coding

```text
┌────────────────────────────────────┐
│ 1. WRITE CODE                      │
│ type tags in VS Code or Notepad    │
└─────────────────┬──────────────────┘
                  ▼
┌────────────────────────────────────┐
│ 2. SAVE FILE                       │
│ Ctrl + S (Windows) / Cmd + S (Mac) │
└─────────────────┬──────────────────┘
                  ▼
┌────────────────────────────────────┐
│ 3. OPEN IN BROWSER                 │
│ double-click index.html            │
└─────────────────┬──────────────────┘
                  ▼
┌────────────────────────────────────┐
│ 4. REFRESH                         │
│ edit, save, press F5 to see it     │
└────────────────────────────────────┘
```

### Anatomical Map of the HTML5 Boilerplate

```text
<!DOCTYPE html>        <- "HTML5 ahead!"
<html>                 <- root container
  <head>               <- brain: settings
    <meta ...>         <- charset, viewport
    <title>..</title>  <- name on the tab
  </head>
  <body>               <- canvas: all the
    <h1>Hi!</h1>          VISIBLE content
  </body>
</html>                <- end of document
```

---

## Code Example: Your First Program

Here is the exact code for your very first web page. Type this into your code editor:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Website</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    <p>My name is Alex, and this is my very first web page created from scratch.</p>
    <p>I am learning HTML and CSS to build awesome websites!</p>
  </body>
</html>
```

---

## Code Explanation: Visual Labels for Every Tag

Let's dissect every piece of this code so there are no mysteries:

1. `<!DOCTYPE html>`:
   - **Pronunciation**: *"Doc-type HTML"*
   - **Role**: It is not a tag; it is an announcement. It tells the browser to render the page in standard modern HTML5 mode so it doesn't look distorted.

2. `<html lang="en">` and `</html>`:
   - The **root element**. Every single piece of HTML code in your file must live between these two boundary lines.
   - `lang="en"` tells screen readers and search engines that this page is in English.

3. `<head>` and `</head>`:
   - The backstage area or "brain". Visitors do not see this content on the page, but the browser reads it for instructions.

4. `<meta charset="UTF-8">`:
   - A vital character-encoding instruction that allows the page to display letters, numbers, punctuation, and even emojis (like 🚀, 🌟, 🍕) correctly without turning into weird scrambled symbols!

5. `<meta name="viewport" ...>`:
   - Tells phones to show the page at the phone's real width. Without it, a phone shows a tiny zoomed-out page.

6. `<title>My First Website</title>`:
   - Look at the very top of your browser window where you see tabs. The text inside `<title>` is what appears on that tab!

7. `<body>` and `</body>`:
   - The stage! Every visible element—headings, paragraphs, pictures, links, buttons—lives inside the `<body>` element.

8. `<h1>Hello World!</h1>`:
   - A primary headline. In computer programming history, it is an ancient tradition that your very first program always says *"Hello World!"*.

9. `<p>...</p>`:
   - Paragraph tags. They hold standard reading text and automatically leave a comfortable blank line beneath them.

---

## 🌍 Real-World Connection: The "index.html" Secret

Why do professional web developers almost always name their main home page `index.html`?

- When someone visits `www.google.com` or `www.yourschool.edu.in`, they don't type `www.google.com/home.html`.
- Web servers are programmed automatically to search for a file called **`index.html`** whenever a visitor arrives at a folder.
- If your file is named `index.html`, the server greets the visitor instantly with your home page!

---

## 🔮 Predict the Output

Look at this small change inside the `<body>`:

```html
<body>
  <h1>Welcome to Mars!</h1>
  <p>Bring a warm jacket.</p>
  <h1>Rocket Launch Schedule</h1>
</body>
```

**Question**: Will "Rocket Launch Schedule" appear on the same line as "Bring a warm jacket", or will it automatically start on a fresh new line below it?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> It will start on a brand-new line! Heading tags (<code>&lt;h1&gt;</code>) are block elements—they take up the full width of the line and push everything after them down to the next row!
</details>

---

## 🕵️ Code Detective: The Broken Extension

Sarah created her first page in Notepad, but when she double-clicked the file, it opened in Notepad again instead of Google Chrome!

Here was her file name:
```text
my-page.html.txt
```

- **Find the mistake**: The file ended with `.txt` instead of `.html`!
- **Explain the mistake**: Notepad often secretly adds `.txt` to the end of files if you don't select "All Files (*.*)" when saving. The computer thinks it's a plain text memo, not a web page!
- **Fix the mistake**: 
  > Right-click the file, choose **Rename**, and delete the `.txt` so the filename is strictly `my-page.html`. Now double-click it, and it will immediately launch in your browser!

---

## Think Like a Web Designer: The Browser Tab Matters

Look at your open browser right now. You probably have 5 or 10 tabs open!
How do you know which tab is the online dictionary and which tab is your homework?

**By the Tab Title!**
- A lazy title: `<title>Document</title>` or `<title>Untitled</title>`
- A professional title: `<title>Cosmic Space Adventures | Home</title>`

> 💡 **Think Before You Code**:
> Always give your web pages descriptive, exciting `<title>` tags so visitors can find your tab instantly among their open windows!

---

## Mini Challenge: Personalize Your Page

Open your `index.html` file and customize it:
1. Change the `<title>` to: `[Your Name]'s Creative Workshop`
2. Change the `<h1>` to your favorite motto or hobby (e.g., *"Welcome to Leo's Robot Lab!"*).
3. Add two paragraphs describing your favorite hobby, favorite science topic, or favorite book.
4. Save the file (`Ctrl + S`), switch to your browser, and hit **F5 (Refresh)** to see your changes appear instantly!

---

## ⚠️ Common Mistake

**Spaces and capital letters in file names.**

❌ Wrong:

```text
My First Page.HTML
```

What happens: on your own computer it may open fine. But many web servers treat `Page.html` and `page.html` as two different files. A space becomes `%20` in the address. Links break easily.

✅ Fixed: use lowercase letters, numbers and hyphens only.

```text
my-first-page.html
```

---

## ✍️ Try It

**Create It In 5 Minutes!**

Follow these exact steps on your computer right now:

1. **Create a Folder**: Make a new folder on your computer desktop named `web-projects`.
2. **Open Your Editor**: Open VS Code (or Notepad on Windows / TextEdit in plain text mode on Mac).
3. **Type the Code**: Carefully type the code from the Code Example above. (Don't copy-paste—typing builds muscle memory!)
4. **Save the File**: 
   - Click **File -> Save As**.
   - Navigate to your `web-projects` folder.
   - In the filename box, type: `index.html`
   - Ensure the file type is set to **All Files** (if using Notepad).
5. **Open in Browser**:
   - Open your file manager, find `index.html`, and double-click it.
   - Look at your browser: **You just launched your first website! 🎉**

> 💡 **Hint:** If the file opens in Notepad instead of the browser, its name probably ends in `.txt`. Check the Code Detective above.

---

## 📝 Recap

- Web pages are written in plain text files saved with the `.html` extension.
- The standard structure includes `<!DOCTYPE html>`, `<html>`, `<head>`, `<title>`, and `<body>`.
- Code inside `<head>` holds information for the browser (like the tab title).
- Code inside `<body>` is what visitors actually see and read on the page.
- Always name your primary home page `index.html` in lowercase without spaces.
- The workflow of a web developer is: **Code -> Save -> Refresh!**

---

## 📖 Key Terms

| Term | What It Means |
| :--- | :--- |
| **Code Editor** | A software program designed specifically for writing code (e.g., VS Code). |
| **File Extension** | The letters after the dot in a filename (e.g., `.html`, `.css`, `.png`) that tell the computer what kind of file it is. |
| **Boilerplate** | Standard starter code required at the beginning of every HTML document. |
| **Doctype** | The declaration at line 1 specifying which version of HTML is being used. |
| **Refresh / Reload** | Updating the browser screen to show the latest saved changes in your code. |

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. What extension must every HTML file have?
2. Which HTML tag holds the text that appears on the browser's top tab?
3. What keyboard shortcut saves a file on Windows? On Mac?

<details>
<summary>Show answer</summary>

1. `.html`
2. `<title>` (it sits inside `<head>`).
3. `Ctrl + S` on Windows, `Cmd + S` on Mac.

</details>

### 🟡 Level 2: Apply
1. What is the difference between `<head>` and `<body>`?
2. Why is `my first website.html` a poor choice for a file name? What should you name it instead?

<details>
<summary>Show answer</summary>

1. `<head>` holds information for the browser (title, character set, viewport). Visitors do not see it on the page. `<body>` holds everything visitors see.
2. It has spaces, which turn into `%20` in web addresses and break links easily. Use `my-first-website.html` (or `index.html` for a home page).

</details>

### 🔴 Level 3: Challenge
1. Without looking at the book, write the complete HTML5 starter page: doctype, `html` with `lang`, `head` with charset, viewport and title, and `body` with one heading and one paragraph.
2. Save it as `about-me.html` and open it in your browser.
3. Check that your title shows on the tab.

<details>
<summary>Show one possible answer</summary>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Me</title>
  </head>
  <body>
    <h1>About Me</h1>
    <p>I am learning HTML at school.</p>
  </body>
</html>
```

The tab shows **About Me**. The page shows a big heading and one paragraph.

</details>
