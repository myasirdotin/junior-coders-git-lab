# Chapter 9: Images

---

## 🌟 Real-Life Story

Have you ever flipped through a children's wildlife encyclopedia filled with full-color photos of Siberian tigers, deep-sea jellyfish, and towering giraffes? 

Now imagine that same encyclopedia had zero photographs—just endless columns of tiny, dense black text. It would feel dull, exhausting, and hard to imagine what the animals actually look like!

An old proverb says: *"A picture is worth a thousand words."*
On the web, images bring life, emotion, color, and excitement to your pages. Whether you are showcasing artwork, explaining a science experiment, or displaying a photo of your school garden, learning how to add and format images is a vital skill for every web creator!

---

## 🎯 What You Will Learn

By the end of this chapter, you will be able to:
- Use the `<img>` tag to embed pictures onto any web page.
- Understand the two essential attributes: `src` (Source) and `alt` (Alternative Text).
- Control image dimensions using `width` and `height` attributes.
- Understand why the `alt` attribute is critical for accessibility and broken links.
- Know the difference between local image files and web image URLs.
- Build an organized, attractive Photo Gallery page.

---

## Visual Concept Explanation

### Anatomy of an Image Tag

Unlike paragraphs or headings, the `<img>` tag is a **void (self-closing) element**. It does NOT have a closing `</img>` tag!

```text
<img              <- tag name
  src="puppy.jpg" <- the image file
  alt="A golden retriever puppy
       playing on green grass"
                  <- description
  width="300"     <- width in pixels
>                 <- no </img> needed
```

### Where Does the Browser Find the Image?

```text
A: Same folder as the page
  my-folder/
    ├── gallery.html
    └── sunset.jpg
  <img src="sunset.jpg" alt="...">

B: An images subfolder (tidiest!)
  my-folder/
    ├── gallery.html
    └── images/
          └── sunset.jpg
  <img src="images/sunset.jpg"
       alt="...">

C: A web address (another server)
  <img src="https://example.com/
            photos/tiger.jpg"
       alt="...">
```

(In real code, case C is written on one line, with no spaces in the address.)

---

## Code Example: The Wildlife Photo Gallery

Type this into an editor and save it as `gallery.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nature Discovery Gallery</title>
  </head>
  <body>
    <h1>Wildlife of Planet Earth</h1>
    <p>Explore stunning photography from around our natural world.</p>

    <!-- Photo 1: Using an external test image -->
    <h2>The Monarch Butterfly</h2>
    <img 
      src="https://images.unsplash.com/photo-1557008075-7f2c5efa4cfd?w=400" 
      alt="Close-up of an orange and black monarch butterfly resting on a purple flower"
      width="400"
    >
    <p>Some monarch butterflies fly up to 4,800 km (3,000 miles) on their yearly migration!</p>

    <!-- Photo 2: Mountain landscape -->
    <h2>The Rocky Mountains</h2>
    <img 
      src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400" 
      alt="Snow covered mountain peaks under a clear blue sky"
      width="400"
    >
    <p>Majestic alpine peaks rising above the morning mist.</p>
  </body>
</html>
```

---

## Code Explanation: Key Attributes Explained

- `<img>`: The image tag.
- `src="..."`: Stands for **source**. This tells the browser: *"Go find the image file at this exact location or web address!"* If the file path is misspelled by even one letter, the image will fail to load and show a broken icon.
- `alt="..."`: Stands for **alternative text**. This is the text the browser shows if the image cannot be loaded (e.g. slow internet or missing file). It is also read aloud by screen readers for blind users!
- `width="400"`: Sets the width to 400 pixels on screen. When you set only `width`, the browser automatically calculates the correct `height` to prevent the photo from getting squished or stretched out of proportion!

---

## 🌍 Real-World Connection: The Alt Text Superpower

Why do careful web teams always write `alt` text?
1. **Accessibility**: Millions of people around the world are blind or have low vision. A screen reader reads `alt="A tray of fresh bread rolls at the school bake sale"` aloud, so a blind student knows what the picture shows!
2. **Slow Internet**: When internet connections are weak or data is limited, browsers display the `alt` text box instead of downloading heavy pictures.
3. **Google Image Search**: Google’s search engine cannot look at pixels with human eyes; it uses your `alt` text to understand what the photo shows and index it in image search results!

---

## 🔮 Predict the Output

What will happen if you set `width="500"` and `height="100"` on a tall, vertical portrait photo of a giraffe?

- **Option A**: The giraffe will look perfectly normal.
- **Option B**: The giraffe will look horribly squashed and flattened horizontally like a pancake!
- **Option C**: The computer will explode.

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer: Option B!</strong> If you force mismatched width and height attributes, the browser will distort the natural proportions (aspect ratio) of the image. It is usually best to specify EITHER width OR height, and let the browser scale the other automatically!
</details>

---

## 🕵️ Code Detective: The Case of the Missing Quote

A student's photo shows up, but when a screen reader reads it, it only says **"A"**:

```html
<!-- Broken Code -->
<img src=my-dog.jpg alt=A fluffy golden retriever playing fetch width=300>
```

- **Find the mistake**: Look at the values for `src`, `alt`, and `width`—there are NO quotation marks!
- **Explain the mistake**: Without quotes, a value stops at the first space. So `alt` is only `"A"`, and the browser thinks `fluffy`, `golden` and `retriever` are new, unknown attributes! Always wrap attribute values in quotes (`"..."`).
- **Fix the code**:
  ```html
  <!-- Fixed Code -->
  <img src="my-dog.jpg" alt="A fluffy golden retriever playing fetch" width="300">
  ```

---

## Think Like a Web Designer: Good Alt Text vs. Bad Alt Text

Writing great alternative text is an art form. Check out these examples for a photo of a kitten sleeping in a red teacup:

| Rating | Alt Text Example | Why It Works / Fails |
| :--- | :--- | :--- |
| ❌ **Terrible** | `alt="image"` or `alt="photo.jpg"` | Tells the user nothing useful. |
| 🟡 **Mediocre** | `alt="cat"` | Too vague—what kind of cat? What is it doing? |
| ✅ **Excellent** | `alt="A tiny sleeping gray kitten curled up inside a bright red ceramic teacup"` | Vivid, concise, and paints a clear mental picture! |

---

## Mini Challenge: The 3-Photo Hobby Showcase

Create a new file named `my-hobbies.html`:
- Give it an `<h1>`: `My Favorite Weekend Activities`
- Add 3 hobbies (e.g. Football, Drawing, Baking, Robotics, Skateboarding).
- For each hobby, add an `<h2>`, an `<img>` with realistic dimensions (`width="350"`), a detailed `alt` description, and a short paragraph describing why you love that activity.

---

## ⚠️ Common Mistake

**Leaving out `alt`, or writing a useless one.**

❌ Wrong:

```html
<img src="images/library.jpg">
<img src="images/library.jpg" alt="image">
```

What happens: a screen reader may read out the file name, "library dot jpg", or just "image". If the picture fails to load, nothing useful appears.

✅ Fixed: describe what the picture shows, in one short sentence.

```html
<img src="images/library.jpg" alt="Students reading at long tables in the school library">
```

---

## ✍️ Try It

**The Broken Image Test**

Want to see how `alt` text saves the day?
1. Open your code and intentionally misspell the `src` attribute:
   ```html
   <img src="missing-telescope.jpg" alt="A student looking at the Moon through a telescope">
   ```
2. Save and refresh your browser.
3. You will see a small broken image icon, and your descriptive `alt` text will appear on the screen instead of the picture!

> 💡 **Hint:** Different browsers draw the broken image a little differently. Some show only the `alt` text, with no icon at all.

---

## 📝 Recap

- The `<img>` tag embeds pictures into HTML documents.
- `<img>` is a self-closing void element (no `</img>` closing tag).
- The `src` attribute gives the exact file location or URL of the image.
- The `alt` attribute provides accessible descriptive text for screen readers and broken links.
- `width` and `height` adjust display size in pixels.
- Always preserve the natural aspect ratio so images do not appear squashed or stretched.

---

## 📖 Key Terms

| Term | What It Means |
| :--- | :--- |
| **`<img>`** | The image element used to embed graphics on a page. |
| **`src` (Source)** | The file path or web URL where the image is stored. |
| **`alt` (Alternative Text)** | A written description of an image for accessibility and SEO. |
| **Pixel (px)** | A tiny single dot of light on a computer display screen. |
| **Aspect Ratio** | The proportional relationship between an image's width and its height. |

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. True or false: the `<img>` tag needs a closing `</img>` tag.
2. What does the `src` attribute tell the browser?
3. What unit do the numbers in `width="300"` use?

<details>
<summary>Show answer</summary>

1. False. `<img>` is a void element.
2. Where to find the image file (a file path or a web address).
3. Pixels.

</details>

### 🟡 Level 2: Apply
1. Write the tag for an image named `dinosaur.png` inside an `assets` folder, with the alt text "A Tyrannosaurus Rex skeleton in a museum", and a width of 450 pixels.
2. Why is it risky to set both a fixed `width` and a fixed `height` without checking the image's real size?

<details>
<summary>Show answer</summary>

1.

```html
<img src="assets/dinosaur.png" alt="A Tyrannosaurus Rex skeleton in a museum" width="450">
```

2. If the two numbers do not match the image's real shape (aspect ratio), the picture is squashed or stretched. Setting only `width` lets the browser work out the height.

</details>

### 🔴 Level 3: Challenge
Make a picture that works as a link:
1. Put an `<img>` of a rocket inside an `<a>` tag.
2. The link goes to `https://www.nasa.gov` and opens in a new tab.
3. Write `alt` text that tells a screen reader user where the link goes.
4. Test it: click the picture.

<details>
<summary>Show one possible answer</summary>

```html
<a href="https://www.nasa.gov" target="_blank">
  <img src="images/rocket.jpg" alt="Visit the NASA website" width="300">
</a>
```

When an image is the only thing inside a link, its `alt` text becomes the link's name. So it should say where the link goes, not only what the picture shows.

</details>
