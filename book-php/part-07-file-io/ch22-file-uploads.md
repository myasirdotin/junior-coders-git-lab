# Chapter 22: File Uploads in PHP 📤

---

## 🌟 Real-Life Story

Your school is running a digital science fair. You drew a poster in a drawing app and saved it as `solar_cells.png`. You choose the file, attach it to a form and click Upload. Before keeping it, the school server must ask three questions. Is this really an image, or a harmful program in disguise? Is it under the size limit? Where should it be stored, and under what name?

---

## 🎯 What You Will Learn

- Set up an HTML form with `method="POST"` and `enctype="multipart/form-data"`.
- Read uploaded file details from the `$_FILES` superglobal.
- Check the size and the real file type (MIME type) of an upload.
- Save the file safely with a new random name using `move_uploaded_file()`.

---

## 👁️ Visual Concept Explanation

A **MIME type** is a short label that says what kind of data a file holds, such as `image/png` or `application/pdf`.

### The Lifecycle of an Uploaded File

```text
1. VISITOR picks photo.jpg (1.5 MB)
   |  sent over HTTP (POST)
   v
2. SERVER keeps it in a temp folder
   e.g. C:\xampp\tmp\phpA8.tmp
   details go into $_FILES
   |  your script checks size + type
   v
3. move_uploaded_file() copies it to
   uploads/ with a new random name
   |
   v
4. Saved for good. Ready to show.
```

### The `$_FILES` Superglobal Anatomy

```text
$_FILES['user_file'] = [
  'name'     => 'profile.png',
  'type'     => 'image/png',
  'tmp_name' => 'C:\xampp\tmp\phpA8.tmp',
  'error'    => 0,
  'size'     => 148200
];
```

| Key | Meaning |
| :--- | :--- |
| `name` | The file's name on the visitor's computer |
| `type` | The MIME type the **browser claims** (it can lie) |
| `tmp_name` | Where the server holds the file for now |
| `error` | `0` (`UPLOAD_ERR_OK`) means no error |
| `size` | Size in bytes (148200 bytes is about 145 KB) |

### Checking the Real Type with `finfo`

The `type` value comes from the visitor's browser, so a trickster can fake it. A file's name can lie too: `virus.php` can be renamed `cat.png`. PHP can look **inside** the file instead. The `finfo` tool (short for *file information*) reads the first bytes of a file and reports its real MIME type:

```php
<?php
$finfo = new finfo(FILEINFO_MIME_TYPE);
echo $finfo->file($tmpPath); // e.g. image/png
```

For a real PNG picture this prints `image/png`. For a PHP file that was renamed `cat.png`, it prints `text/x-php`, so the trick is caught.

`new finfo(...)` creates a helper object, and `->file()` asks it about one file. You will learn how objects work in Chapter 23; for now, copy this pattern.

---

## 💻 Code Example: Secure Profile Avatar Uploader

Save this as `upload.php`:

```php
<?php
  $message = "";
  $uploadedFilePath = "";

  if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_FILES["avatar"])) {
    $file = $_FILES["avatar"];

    // 1. Check for upload errors
    if ($file["error"] !== UPLOAD_ERR_OK) {
      $message = "Upload failed with error code: " . $file["error"];
    } else {
      $tmpPath = $file["tmp_name"];

      // 2. Check the size (maximum 2 MB = 2 * 1024 * 1024 bytes)
      $maxSize = 2 * 1024 * 1024;
      if ($file["size"] > $maxSize) {
        $message = "Error: File is bigger than 2 MB.";
      } else {
        // 3. Check the REAL type by looking inside the file
        $allowedTypes = [
          "image/jpeg" => "jpg",
          "image/png"  => "png",
          "image/gif"  => "gif",
          "image/webp" => "webp",
        ];
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $realType = $finfo->file($tmpPath);

        if (!array_key_exists($realType, $allowedTypes)) {
          $message = "Error: Only JPG, PNG, GIF and WEBP images are allowed.";
        } else {
          // 4. Create the uploads folder if it does not exist
          $targetDir = "uploads/";
          if (!is_dir($targetDir)) {
            mkdir($targetDir, 0755, true);
          }

          // 5. Make a new random name; the extension comes from the real type
          $newFileName = "avatar_" . bin2hex(random_bytes(8))
            . "." . $allowedTypes[$realType];
          $destination = $targetDir . $newFileName;

          // 6. Move the file out of the temp folder
          if (move_uploaded_file($tmpPath, $destination)) {
            $message = "Success! Avatar uploaded.";
            $uploadedFilePath = $destination;
          } else {
            $message = "Error moving file to the uploads folder.";
          }
        }
      }
    }
  }
?>
<!DOCTYPE html>
<html>
<head>
  <title>Avatar Uploader</title>
  <style>
    body { font-family: sans-serif; max-width: 450px; margin: 30px auto; }
    .preview { max-width: 150px; border-radius: 8px;
               border: 2px solid #7c3aed; margin-top: 15px; }
    button { background: #7c3aed; color: #fff; padding: 10px 18px;
             border: none; border-radius: 6px; cursor: pointer; }
  </style>
</head>
<body>

  <h2>Upload Profile Picture</h2>

  <?php if ($message): ?>
    <p style="font-weight:bold;"><?= htmlspecialchars($message) ?></p>
  <?php endif; ?>

  <?php if ($uploadedFilePath): ?>
    <img src="<?= htmlspecialchars($uploadedFilePath) ?>"
         class="preview" alt="Avatar preview">
  <?php endif; ?>

  <!-- REQUIRED: enctype="multipart/form-data" -->
  <form action="" method="POST" enctype="multipart/form-data">
    <label for="avatar">Select image (max 2 MB):</label><br><br>
    <input type="file" id="avatar" name="avatar" accept="image/*" required>
    <br><br>
    <button type="submit">Upload Avatar</button>
  </form>

</body>
</html>
```

---

## 🔍 Code Explanation: Breaking It Down Line by Line

- `enctype="multipart/form-data"`: **Essential.** Without it, the browser sends only the file's name as text, not the file itself.
- `$_FILES["avatar"]["tmp_name"]`: Where the server holds the uploaded file while your script runs. PHP deletes it when the script ends unless you move it.
- `$file["size"] > $maxSize`: Rejects files bigger than 2 MB.
- `$finfo->file($tmpPath)`: Looks inside the file and returns its real MIME type, for example `image/png`.
- `array_key_exists($realType, $allowedTypes)`: An **allow-list**. Only the four image types we named are accepted; everything else is refused.
- `bin2hex(random_bytes(8))`: Makes 16 random characters (digits and the letters a to f), such as `9f3a1c0b7e2d4a6f`. We never keep the visitor's own file name. Two students could both upload `photo.jpg`, and a name like `../index.php` could be harmful.
- `move_uploaded_file($tmpPath, $destination)`: The safe way to keep an upload. It checks that the file really arrived through an HTTP POST upload before moving it.
- `htmlspecialchars($uploadedFilePath)`: We escape every value we print, even our own.

---

## 🌍 Real-World Connection: Keeping Attackers Out

Why do security teams look so carefully at file uploaders?
- If a website lets someone upload `attack.php` and then visit `example.org/uploads/attack.php`, the server would **run** that file. The attacker could take control of the site.
- That is why you check the real type with an allow-list, rename every file and choose the extension yourself.
- Professional servers also switch off PHP inside the `uploads/` folder, as an extra lock.

---

## 🔮 Predict the Output

What does `$_FILES['doc']['error'] === 0` mean?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> It means <code>UPLOAD_ERR_OK</code>: the file arrived in the server's temporary folder with no errors. You still need to check its size and type.
</details>

---

## 🕵️ Code Detective: The Missing Enctype

```html
<form action="upload.php" method="POST">
  <input type="file" name="doc">
  <button type="submit">Upload</button>
</form>
```

- **Find the bug**: In `upload.php`, `var_dump($_FILES)` shows an empty array.
- **Explain**: The form has no `enctype="multipart/form-data"`, so the file itself was never sent.
- **Fix**: Add `enctype="multipart/form-data"` to the `<form>` tag.

---

## ⚠️ Common Mistake

**Trusting the file name or the browser's `type`.**

- ❌ *Wrong*:
  ```php
  if ($_FILES["pic"]["type"] === "image/png") {
    move_uploaded_file($_FILES["pic"]["tmp_name"],
      "uploads/" . $_FILES["pic"]["name"]);
  }
  ```
- 😕 *What happens*: The browser's `type` can be faked. A harmful `attack.php` could be saved with its own name and then run on your server.
- ✅ *Fixed*: Check the real type with `finfo`, then save under a random name with an extension you choose:
  ```php
  $finfo = new finfo(FILEINFO_MIME_TYPE);
  if ($finfo->file($_FILES["pic"]["tmp_name"]) === "image/png") {
    $name = bin2hex(random_bytes(8)) . ".png";
    move_uploaded_file($_FILES["pic"]["tmp_name"], "uploads/" . $name);
  }
  ```

A second common surprise: big uploads fail silently. PHP has its own limits in `php.ini`: `upload_max_filesize` (2 MB by default) and `post_max_size` (8 MB by default).

---

## ✍️ Try It

Open the [PHP Console](../studios/php-console/). There is no real upload there, so test the **checks** with sample values:

```php
<?php
$allowedTypes = ["image/jpeg" => "jpg", "image/png" => "png"];
$maxSize = 2 * 1024 * 1024;

$realType = "image/png";
$size = 3500000;

if ($size > $maxSize) {
  echo "Too big: $size bytes (limit $maxSize)";
} elseif (!array_key_exists($realType, $allowedTypes)) {
  echo "Type not allowed: $realType";
} else {
  $newName = bin2hex(random_bytes(4)) . "." . $allowedTypes[$realType];
  echo "OK, save as: $newName";
}
```

Output:

```text
Too big: 3500000 bytes (limit 2097152)
```

*Hint*: Change `$size` to `150000`. Then change `$realType` to `"text/x-php"` (what `finfo` reports for a PHP file renamed to `.png`). Which message do you get each time? (The random name will be different on every run.)

---

## 📝 Recap

- A file upload form needs `method="POST"` and `enctype="multipart/form-data"`.
- PHP puts the file's details in `$_FILES`; the file waits in a temporary folder.
- Check `error`, then the size, then the **real** type with `finfo` and an allow-list.
- Never keep the visitor's file name: make a random one and pick the extension yourself.
- Finish with `move_uploaded_file()`, and escape anything you print with `htmlspecialchars()`.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which form attribute must you add for file uploads?
2. Which superglobal array holds uploaded file information?
3. Which function moves a file from the temporary folder to its permanent place?

<details>
<summary>Show answer</summary>

1. `enctype="multipart/form-data"` (with `method="POST"`).
2. `$_FILES`.
3. `move_uploaded_file()`.

</details>

### 🟡 Level 2: Apply
1. What is the difference between `$_FILES['pic']['name']` and `$_FILES['pic']['tmp_name']`?
2. Why is it dangerous to save an upload with the visitor's own file name?
3. Why is `finfo` safer than checking `$_FILES['pic']['type']` or the file extension?

<details>
<summary>Show answer</summary>

1. `name` is the original name on the visitor's computer (for example `photo.jpg`). `tmp_name` is the temporary path on the server where the file is waiting right now.
2. Two visitors could upload the same name and overwrite each other. A visitor could also choose a harmful name, such as `attack.php`, which the server might run.
3. The `type` and the extension both come from the visitor and can be faked. `finfo` reads the bytes inside the file and reports what it really is.

</details>

### 🔴 Level 3: Challenge
Build `homework.php`, a PDF uploader for homework.

1. Make a form with `enctype="multipart/form-data"` and a file input named `homework`.
2. Refuse the file if `error` is not `UPLOAD_ERR_OK` or it is bigger than 5 MB.
3. Accept it only if `finfo` says `application/pdf`.
4. Save it in `homework/` with a random name ending in `.pdf`.
5. Print a message, escaped with `htmlspecialchars()`.
6. Extra: allow up to 3 images at once with `<input type="file" name="photos[]" multiple>`. Then `$_FILES['photos']['name']` becomes an array. Loop over it and check each file the same way.

<details>
<summary>Show one possible answer</summary>

```php
<?php
$message = "";
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_FILES["homework"])) {
  $file = $_FILES["homework"];
  if ($file["error"] !== UPLOAD_ERR_OK) {
    $message = "Upload failed (code " . $file["error"] . ").";
  } elseif ($file["size"] > 5 * 1024 * 1024) {
    $message = "The file is bigger than 5 MB.";
  } else {
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    if ($finfo->file($file["tmp_name"]) !== "application/pdf") {
      $message = "Only PDF files are accepted.";
    } else {
      if (!is_dir("homework")) {
        mkdir("homework", 0755, true);
      }
      $name = "homework/" . bin2hex(random_bytes(8)) . ".pdf";
      if (move_uploaded_file($file["tmp_name"], $name)) {
        $message = "Thank you! Your homework was received.";
      } else {
        $message = "Could not save the file.";
      }
    }
  }
}
?>
<form method="POST" enctype="multipart/form-data">
  <label for="homework">Homework (PDF, max 5 MB):</label>
  <input type="file" id="homework" name="homework" accept="application/pdf" required>
  <button type="submit">Send</button>
</form>
<p><?= htmlspecialchars($message) ?></p>
```

</details>
