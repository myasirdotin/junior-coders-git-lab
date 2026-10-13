# Chapter 31: Project: JSON File-Based Mini Blog 📰

---

## 🌟 Real-Life Story

Our school has a class noticeboard in the corridor. Students pin up short articles: a science fair report, a book review, news from the charity drive. The newest article goes at the top, so everyone sees it first. A teacher checks that each paper has a title and the writer's name before it goes up. In this project you build that noticeboard as a web page, and PHP keeps the papers in a file.

---

## 🎯 What You Will Learn

- Store a list of posts in a `posts.json` file and load it again.
- Add a new post to the top of the list with `array_unshift()`.
- Validate a form and choose a category from an allow-list.
- Escape every saved value when you print it, not when you save it.
- Use **Post/Redirect/Get** so a refresh does not publish a post twice.

---

## 🧱 What You Will Build

One file, `blog.php`, with two parts:

- **A writing form**: title, author, category and article text.
- **A feed**: all posts, newest first, each with its date and a reading-time estimate.
- **A post counter** at the top: how many articles are published.
- **A data file**, `posts.json`, which keeps the posts after the page closes.

It uses ideas from earlier chapters:

| Chapter | Idea used here |
| :--- | :--- |
| 6–7 | `str_word_count()`, `ceil()` for reading time |
| 13 | `header("Location: ...")` and `exit` |
| 15 | An associative array for each post |
| 16 | `array_unshift()`, `in_array()` |
| 19 | `trim()`, length checks, `htmlspecialchars()` |
| 20–21 | `file_get_contents()`, `file_put_contents()`, JSON |

---

## 🗺️ Build Steps

```text
+--------------------------------+
| Step 1: load posts.json        |
|         (or start with [])     |
+---------------+----------------+
                v
+---------------+----------------+
| Step 2: on POST, check fields  |
+---------------+----------------+
                v
+---------------+----------------+
| Step 3: add post to the top,   |
|         save, redirect         |
+---------------+----------------+
                v
+---------------+----------------+
| Step 4: show form + feed,      |
|         escaping every value   |
+--------------------------------+
```

1. **Load.** If `posts.json` exists, read it and turn the JSON back into an array with `json_decode(..., true)`. If not, start with an empty array.
2. **Check.** On `POST`, trim each field. Title, author and text must not be empty, and must not be too long. The category must be one of ours.
3. **Save.** Build the new post as an associative array. Put it first with `array_unshift()`. Write the whole list back to the file. Then redirect.
4. **Show.** Print the count, the form and each post. Every value goes through `htmlspecialchars()`.

---

## 💻 Complete Code: blog.php

Save this file as `C:\xampp\htdocs\blog-project\blog.php`.

```php
<?php
  $dataFile = "posts.json";
  $categories = ["PHP Lessons", "Science Club", "Student Life"];
  $error = "";

  // Step 1: load existing posts
  $posts = [];
  if (file_exists($dataFile)) {
    $posts = json_decode(file_get_contents($dataFile), true) ?? [];
  }

  // Step 2: check a new post
  if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $title = trim($_POST["title"] ?? "");
    $author = trim($_POST["author"] ?? "");
    $category = trim($_POST["category"] ?? "");
    $content = trim($_POST["content"] ?? "");

    if ($title === "" || $author === "" || $content === "") {
      $error = "Please fill in the title, your name and the article.";
    } elseif (strlen($title) > 100 || strlen($author) > 50) {
      $error = "Title or name is too long.";
    } elseif (strlen($content) > 5000) {
      $error = "Article must be 5000 characters or fewer.";
    } elseif (!in_array($category, $categories, true)) {
      $error = "Please choose a category from the list.";
    } else {
      // Step 3: build the post (store the REAL text, escape later)
      $words = str_word_count($content);
      $newPost = [
        "title"        => $title,
        "author"       => $author,
        "category"     => $category,
        "content"      => $content,
        "created_at"   => date("M j, Y - g:i A"),
        "reading_time" => ceil($words / 200) . " min read",
      ];

      array_unshift($posts, $newPost);   // newest first
      file_put_contents(
        $dataFile,
        json_encode($posts, JSON_PRETTY_PRINT),
        LOCK_EX
      );

      // Post/Redirect/Get: a refresh will not post it twice
      header("Location: blog.php");
      exit;
    }
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Junior Coders Class Blog</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      max-width: 700px;
      margin: 30px auto;
      padding: 0 15px;
      color: #1e293b;
      line-height: 1.6;
    }
    header {
      border-bottom: 2px solid #1d4ed8;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
    }
    .author-card, .post-card {
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
    }
    .author-card { background: #f8fafc; }
    input, select, textarea {
      width: 100%;
      padding: 8px;
      margin: 6px 0 14px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      box-sizing: border-box;
      font: inherit;
    }
    button {
      background: #1d4ed8;
      color: #fff;
      border: none;
      border-radius: 6px;
      padding: 10px 20px;
      font-weight: bold;
      cursor: pointer;
    }
    .post-meta { font-size: 0.85rem; color: #64748b; }
    .post-tag {
      background: #eff6ff;
      color: #1d4ed8;
      border-radius: 99px;
      padding: 3px 8px;
      font-size: 0.75rem;
      font-weight: 700;
    }
    .error { color: #dc2626; }
  </style>
</head>
<body>
  <header>
    <h1>Junior Coders Class Blog</h1>
    <strong><?= count($posts) ?></strong> published articles
  </header>

  <section class="author-card">
    <h2>Write a New Article</h2>
    <?php if ($error): ?>
      <p class="error"><?= $error ?></p>
    <?php endif; ?>
    <form action="blog.php" method="POST">
      <label for="title">Title</label>
      <input type="text" id="title" name="title" maxlength="100" required
             value="<?= htmlspecialchars($title ?? '') ?>">

      <label for="author">Your name</label>
      <input type="text" id="author" name="author" maxlength="50" required
             value="<?= htmlspecialchars($author ?? '') ?>">

      <label for="category">Category</label>
      <select id="category" name="category">
        <?php foreach ($categories as $c): ?>
          <option value="<?= htmlspecialchars($c) ?>">
            <?= htmlspecialchars($c) ?>
          </option>
        <?php endforeach; ?>
      </select>

      <label for="content">Article</label>
      <textarea id="content" name="content" rows="5" required
      ><?= htmlspecialchars($content ?? '') ?></textarea>

      <button type="submit">Publish Article</button>
    </form>
  </section>

  <h2>Recent Articles</h2>
  <?php if (empty($posts)): ?>
    <p>No articles yet. Be the first to write one above!</p>
  <?php else: ?>
    <?php foreach ($posts as $p): ?>
      <article class="post-card">
        <span class="post-tag"><?= htmlspecialchars($p['category']) ?></span>
        <h3><?= htmlspecialchars($p['title']) ?></h3>
        <div class="post-meta">
          By <strong><?= htmlspecialchars($p['author']) ?></strong>
          &bull; <?= htmlspecialchars($p['created_at']) ?>
          &bull; <?= htmlspecialchars($p['reading_time']) ?>
        </div>
        <p><?= nl2br(htmlspecialchars($p['content'])) ?></p>
      </article>
    <?php endforeach; ?>
  <?php endif; ?>
</body>
</html>
```

After Maryam publishes one article, `posts.json` looks like this (your date will differ):

```json
[
    {
        "title": "Our Solar Oven Test",
        "author": "Maryam",
        "category": "Science Club",
        "content": "We cooked rice with sunlight & a box.",
        "created_at": "Oct 13, 2026 - 9:15 AM",
        "reading_time": "1 min read"
    }
]
```

Notice the `&` is stored as a real `&`. It becomes `&amp;` only when it is printed into HTML.

---

## 🔍 How the Code Works

- `json_decode(..., true) ?? []`: the `true` gives back associative arrays. If the file is broken, `json_decode()` returns `null`, and `?? []` gives an empty list instead.
- `in_array($category, $categories, true)`: the visitor could send any category with browser tools. Only our three are accepted.
- `array_unshift($posts, $newPost)`: puts the new post at index 0, so the feed shows it first.
- `file_put_contents(..., LOCK_EX)`: rewrites the whole file with the full list. `LOCK_EX` stops two saves happening at the same moment. (No `FILE_APPEND` here: we want to replace the old list with the new, longer one.)
- `header("Location: blog.php"); exit;`: after saving, the browser is sent to the page again with a `GET`. Pressing Refresh now only reloads, it does not publish twice.
- `$title ?? ''`: on the first visit `$title` does not exist yet. `??` gives an empty string instead of a warning.
- `nl2br(htmlspecialchars(...))`: escape first, then turn line breaks into `<br>`. The other order would escape the `<br>` tags too.

Here is the reading-time sum on its own:

```php
<?php
$content = "We cooked rice with sunlight & a box.";
$words = str_word_count($content);
echo $words . " words, " . ceil($words / 200) . " min read\n";

$longArticle = str_repeat("word ", 450);
$words = str_word_count($longArticle);
echo $words . " words, " . ceil($words / 200) . " min read";
```

Output:

```text
7 words, 1 min read
450 words, 3 min read
```

`ceil()` rounds **up**, so 450 ÷ 200 = 2.25 becomes 3 minutes.

---

## ⚠️ Common Mistake

**Escaping when saving instead of when printing.**

- ❌ *Wrong*: `$title = htmlspecialchars(trim($_POST["title"]));` before saving, and `<?= htmlspecialchars($p['title']) ?>` when printing.
- 😕 *What happens*: The title `Sun & Shade` is saved as `Sun &amp; Shade`. When printed, it is escaped again and the page shows `Sun &amp; Shade`.
- ✅ *Fixed*: Save the real text. Escape **once**, at the moment you print it into HTML.

```php
<?php
$title = "Sun & Shade";
$twice = htmlspecialchars(htmlspecialchars($title));
$once = htmlspecialchars($title);
echo "Twice: $twice\n";
echo "Once:  $once";
```

Output (this is the HTML source; the browser shows the "Once" line as `Sun & Shade`):

```text
Twice: Sun &amp;amp; Shade
Once:  Sun &amp; Shade
```

A second mistake: forgetting the redirect. Without it, pressing Refresh after publishing sends the form again and the post appears twice.

---

## ✍️ Try It

Save `blog.php` in `C:\xampp\htdocs\blog-project\`, start Apache, and open `http://localhost/blog-project/blog.php`.

- [ ] Publish an article with a title, your name and some text. It appears at the top of the feed.
- [ ] Publish a second one. It now sits above the first, and the counter says 2.
- [ ] Press Refresh. No third copy appears.
- [ ] Use the title `<b>Hello</b>`. The page shows the tags as plain text, not bold.
- [ ] Open `posts.json` in your editor. You can read every post in tidy JSON.

*Hint*: If you see "Failed to open stream: Permission denied", PHP cannot write in that folder. On XAMPP for Windows this is rare; check that the folder is not read-only.

---

## 📝 Recap

- A JSON file can store a list of associative arrays between visits.
- Load with `file_get_contents()` + `json_decode(..., true)`; save with `json_encode()` + `file_put_contents()`.
- `array_unshift()` adds the newest post to the front of the list.
- Store the real text; escape with `htmlspecialchars()` only when you print.
- Redirect after a successful `POST` (Post/Redirect/Get) so a refresh does not repeat it.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which function turns a PHP array into JSON text?
2. What does the second argument `true` do in `json_decode($json, true)`?
3. Which array function adds an item to the **start** of an array?

<details>
<summary>Show answer</summary>

1. `json_encode()`.
2. It returns **associative arrays** instead of objects, so you can write `$p['title']`.
3. `array_unshift()`.

</details>

### 🟡 Level 2: Apply
The feed is getting long. Show only the **5 newest** posts, and print "Showing 5 of 12" above them. Write the PHP.

<details>
<summary>Show answer</summary>

```php
<?php
$posts = [];
for ($i = 12; $i >= 1; $i--) {
  $posts[] = ["title" => "Article $i"];
}

$latest = array_slice($posts, 0, 5);
echo "Showing " . count($latest) . " of " . count($posts) . "\n";
foreach ($latest as $p) {
  echo htmlspecialchars($p["title"]) . "\n";
}
```

Output:

```text
Showing 5 of 12
Article 12
Article 11
Article 10
Article 9
Article 8
```

Because new posts are already at the front, the first five are the newest. In `blog.php`, loop over `$latest` instead of `$posts`.

</details>

### 🔴 Level 3: Challenge
Add a **category filter**.

1. Above the feed, show one link per category: `blog.php?cat=Science Club` and so on, plus an "All" link.
2. Read `$_GET["cat"]`. If it is one of `$categories`, show only posts in that category.
3. Escape the category inside each link with `urlencode()` (a built-in function that makes text safe inside a URL).
4. Extra: add a "Delete" button for each post. Think first: who should be allowed to press it? (Chapter 32 adds logins.)

<details>
<summary>Show one possible answer</summary>

```php
<?php
$categories = ["PHP Lessons", "Science Club", "Student Life"];
$posts = [
  ["title" => "Our Solar Oven Test", "category" => "Science Club"],
  ["title" => "Loops Made Easy", "category" => "PHP Lessons"],
  ["title" => "Seeds for the Garden", "category" => "Science Club"],
];
$_GET["cat"] = "Science Club";   // pretend the visitor clicked this link

foreach ($categories as $c) {
  echo '<a href="blog.php?cat=' . urlencode($c) . '">'
     . htmlspecialchars($c) . "</a>\n";
}

$cat = $_GET["cat"] ?? "";
$shown = [];
foreach ($posts as $p) {
  if (!in_array($cat, $categories, true) || $p["category"] === $cat) {
    $shown[] = $p;
  }
}
foreach ($shown as $p) {
  echo "- " . htmlspecialchars($p["title"]) . "\n";
}
```

Output:

```text
<a href="blog.php?cat=PHP+Lessons">PHP Lessons</a>
<a href="blog.php?cat=Science+Club">Science Club</a>
<a href="blog.php?cat=Student+Life">Student Life</a>
- Our Solar Oven Test
- Seeds for the Garden
```

An unknown or missing `cat` shows every post. For the extra task: a delete button must only work for the author or a teacher, so it needs a login (Chapter 32). Use a `POST` form for deleting, never a plain link.

</details>
