# Project 2: JSON File-Based Mini Blog 📰💾

---

## 1. 🌟 Project Overview

In this capstone project, you will build a complete **File-Based Blog Engine**.
Instead of setting up complex database servers, you will persist blog posts into a local `posts.json` file using PHP's file I/O and JSON functions.

### Key Features You Will Build:
- **Article Authoring Form**: Add new blog entries with Title, Author Name, Category, and Body.
- **JSON File Persistence**: Read and write articles to `posts.json` with `json_encode()` and `json_decode()`.
- **Chronological Feed**: Display articles in reverse chronological order (newest articles first).
- **Post Counter**: Dynamically show total articles published.
- **Reading Time Estimator**: Calculate approximate reading time based on word count!

---

## 2. 🎯 Learning Outcomes Applied

- Chapter 6: Word count calculations (`str_word_count`).
- Chapter 15: Associative arrays representing structured posts.
- Chapter 20 & 21: `file_get_contents()` and `file_put_contents()` with file locking.
- Chapter 16: `array_unshift()` to insert newest items at the top of the feed.

---

## 3. 💻 Complete Production Code

Save this complete file as `blog.php`:

```php
<?php
  $dataFile = "posts.json";
  $error = "";

  // 1. Load existing posts from JSON storage
  $posts = [];
  if (file_exists($dataFile)) {
    $rawJson = file_get_contents($dataFile);
    $posts = json_decode($rawJson, true) ?? [];
  }

  // 2. Handle New Post Submission
  if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $title = trim(htmlspecialchars($_POST["title"] ?? ""));
    $author = trim(htmlspecialchars($_POST["author"] ?? ""));
    $category = trim(htmlspecialchars($_POST["category"] ?? "General"));
    $content = trim(htmlspecialchars($_POST["content"] ?? ""));

    if (!empty($title) && !empty($author) && !empty($content)) {
      $newPost = [
        "id"           => time(),
        "title"        => $title,
        "author"       => $author,
        "category"     => $category,
        "content"      => $content,
        "created_at"   => date("M j, Y - g:i A"),
        "reading_time" => ceil(str_word_count($content) / 200) . " min read"
      ];

      // Insert new post at the BEGINNING of the array (Newest First!)
      array_unshift($posts, $newPost);

      // Save back to JSON file with lock
      file_put_contents($dataFile, json_encode($posts, JSON_PRETTY_PRINT), LOCK_EX);

      // Redirect to prevent duplicate post on browser refresh!
      header("Location: blog.php");
      exit;
    } else {
      $error = "Please fill in all required post fields!";
    }
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Junior Coders Blog</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 700px; margin: 30px auto; padding: 0 15px; color: #1e293b; line-height: 1.6; }
    header { border-bottom: 2px solid #7c3aed; padding-bottom: 1rem; margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center; }
    .author-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 3rem; }
    input, select, textarea { width: 100%; padding: 8px; margin: 6px 0 14px; border: 1px solid #cbd5e1; border-radius: 6px; box-sizing: border-box; font-family: inherit; }
    button { background: #7c3aed; color: #fff; border: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; cursor: pointer; }
    .post-card { background: white; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.03); }
    .post-meta { font-size: 0.85rem; color: #64748b; margin-bottom: 12px; }
    .post-tag { background: #f5f3ff; color: #7c3aed; padding: 3px 8px; border-radius: 99px; font-weight: 700; font-size: 0.75rem; }
  </style>
</head>
<body>

  <header>
    <div>
      <h1 style="margin:0; color:#7c3aed;">🚀 Junior Coders Blog</h1>
      <span style="font-size:0.9rem; color:#64748b;">Class 9 Server-Side Publication</span>
    </div>
    <div><strong><?= count($posts) ?></strong> Published Articles</div>
  </header>

  <!-- Publisher Form -->
  <section class="author-card">
    <h3 style="margin-top:0;">Publish a New Article</h3>
    <?php if ($error): ?>
      <p style="color:red;"><?= $error ?></p>
    <?php endif; ?>
    <form action="blog.php" method="POST">
      <input type="text" name="title" placeholder="Article Headline..." required>
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
        <input type="text" name="author" placeholder="Author Name..." required>
        <select name="category">
          <option value="PHP Tutorials">PHP Tutorials</option>
          <option value="Web Development">Web Development</option>
          <option value="Student Life">Student Life</option>
        </select>
      </div>
      <textarea name="content" rows="4" placeholder="Write your article content here..." required></textarea>
      <button type="submit">Publish Article</button>
    </form>
  </section>

  <!-- Feed Section -->
  <h2>Recent Stories</h2>
  <?php if (empty($posts)): ?>
    <p style="color:#64748b;">No articles published yet. Be the first to write a story above!</p>
  <?php else: ?>
    <?php foreach ($posts as $p): ?>
      <article class="post-card">
        <span class="post-tag"><?= htmlspecialchars($p['category']) ?></span>
        <h2 style="margin: 8px 0 4px;"><?= htmlspecialchars($p['title']) ?></h2>
        <div class="post-meta">
          By <strong><?= htmlspecialchars($p['author']) ?></strong> &bull; <?= $p['created_at'] ?> &bull; ⏱️ <?= $p['reading_time'] ?>
        </div>
        <p><?= nl2br(htmlspecialchars($p['content'])) ?></p>
      </article>
    <?php endforeach; ?>
  <?php endif; ?>

</body>
</html>
```

---

## 4. 🧪 Project Verification Checklist

- [ ] Open `blog.php` in your browser.
- [ ] Publish an article with Title, Author, and Content.
- [ ] Verify the article instantly appears at the top of the feed.
- [ ] Inspect your file directory: verify `posts.json` was created and contains valid, pretty-printed JSON data!
