# Chapter 22: File Uploads in PHP 📤🖼️

---

## 1. 🌟 Real-Life Situation: Submitting Your Science Fair Poster

Imagine your school's digital science fair:
- You didn't just type 3 sentences of text into a form.
- You designed a poster in Photoshop, saved it as a high-resolution PNG image, and need to upload it.
- You browse your computer files, attach `solar_cells.png`, and click Upload.
- The school server checks:
  1. Is this actually an image, or is it a disguised virus program?
  2. Is it under the 5MB file limit?
  3. Where on the school hard drive should it be stored?

Handling **File Uploads** is one of the most powerful—and security-critical—tasks in backend web development!

---

## 2. 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- Configure an HTML form with `enctype="multipart/form-data"` and `method="POST"`.
- Access uploaded file data through the `$_FILES` superglobal array.
- Understand the 5 properties of `$_FILES['upload']['name', 'type', 'tmp_name', 'error', 'size']`.
- Validate file size limits and MIME types safely.
- Move temporary uploads to permanent storage using `move_uploaded_file()`.

---

## 3. 👁️ Visual Concept Explanation

### The Lifecycle of an Uploaded File

```text
1. VISITOR SELECTS FILE: photo.jpg (1.5 MB)
   |
   | Transmitted over HTTP
   v
2. WEB SERVER STORES TEMPORARILY:
   Saved in server's temp folder: /tmp/phpY7kX9a
   Metadata loaded into $_FILES superglobal
   |
   | PHP Script validates: Size OK? Image type OK?
   v
3. YOUR PHP SCRIPT MOVES FILE:
   move_uploaded_file($_FILES['pic']['tmp_name'], "uploads/avatar_101.jpg");
   |
   v
4. PERMANENT STORAGE: Ready to display on website! 🎉
```

### The `$_FILES` Superglobal Anatomy

```text
$_FILES['user_file'] = [
  'name'     => 'profile.png',       // Original filename on user's computer
  'type'     => 'image/png',          // MIME type sent by browser
  'tmp_name' => 'C:\xampp\tmp\phpA8.tmp', // Temporary path on server
  'error'    => 0,                    // 0 = UPLOAD_ERR_OK (No errors!)
  'size'     => 148200                // File size in bytes (~148 KB)
];
```

---

## 4. 💻 Code Example: Secure Profile Avatar Uploader

Save this as `upload.php`:

```php
<?php
  $message = "";
  $uploadedFilePath = "";

  if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_FILES["avatar"])) {
    $file = $_FILES["avatar"];

    // 1. Check for system upload errors
    if ($file["error"] !== UPLOAD_ERR_OK) {
      $message = "Upload failed with error code: " . $file["error"];
    } else {
      $fileName = $file["name"];
      $fileSize = $file["size"];
      $tmpPath  = $file["tmp_name"];

      // 2. Validate File Size (Maximum 2MB: 2 * 1024 * 1024 bytes)
      $maxSize = 2 * 1024 * 1024;
      if ($fileSize > $maxSize) {
        $message = "Error: File exceeds the maximum 2MB size limit!";
      } else {
        // 3. Validate File Extension & MIME Type
        $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        $allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp"];

        if (!in_array($fileExt, $allowedExtensions)) {
          $message = "Error: Only JPG, PNG, GIF, and WEBP images are allowed!";
        } else {
          // 4. Create destination directory if not existing
          $targetDir = "uploads/";
          if (!is_dir($targetDir)) {
            mkdir($targetDir, 0755, true);
          }

          // 5. Generate a unique, safe filename to prevent overwriting
          $newFileName = "avatar_" . time() . "_" . bin2hex(random_bytes(4)) . "." . $fileExt;
          $destination = $targetDir . $newFileName;

          // 6. Safely move the file
          if (move_uploaded_file($tmpPath, $destination)) {
            $message = "Success! Avatar uploaded successfully.";
            $uploadedFilePath = $destination;
          } else {
            $message = "Error moving file to uploads folder.";
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
    .preview { max-width: 150px; border-radius: 8px; border: 2px solid #7c3aed; margin-top: 15px; }
  </style>
</head>
<body>

  <h2>Upload Profile Picture</h2>

  <?php if ($message): ?>
    <p style="font-weight:bold;"><?= htmlspecialchars($message) ?></p>
  <?php endif; ?>

  <?php if ($uploadedFilePath): ?>
    <img src="<?= $uploadedFilePath ?>" class="preview" alt="Avatar Preview">
  <?php endif; ?>

  <!-- REQUIRED: enctype="multipart/form-data" -->
  <form action="" method="POST" enctype="multipart/form-data">
    <label>Select image (Max 2MB):</label><br><br>
    <input type="file" name="avatar" accept="image/*" required><br><br>
    <button type="submit" style="background:#7c3aed;color:#fff;padding:10px 18px;border:none;border-radius:6px;cursor:pointer;">
      Upload Avatar
    </button>
  </form>

</body>
</html>
```

---

## 5. 🔍 Code Explanation: Breaking It Down Line by Line

- `enctype="multipart/form-data"`: **CRUCIAL!** Without this attribute, the browser sends only the filename as plain text and drops the actual file binary data!
- `$_FILES["avatar"]["tmp_name"]`: Where the web server holds the uploaded file in temporary RAM/storage while your script runs.
- `pathinfo($fileName, PATHINFO_EXTENSION)`: Extracts `"png"` or `"jpg"` from `"my_photo.png"`.
- `$newFileName = "avatar_" . time() . ...`: Never keep the user's original filename directly! If two users upload `photo.jpg`, one will overwrite the other. Renaming with `time()` and random bytes keeps files unique and safe.
- `move_uploaded_file($tmpPath, $destination)`: The only safe way to finalize an upload. It verifies that the file was genuinely uploaded via HTTP POST before moving it.

---

## 6. 🌍 Real-World Connection: The Hacker's Worst Nightmare

Why do cybersecurity teams scrutinize file uploaders?
- If a website allows uploading `evil.php`, a hacker could visit `yoursite.com/uploads/evil.php` and take complete control of the server!
- That is why you **must strictly whitelist file extensions** (`["jpg", "png"]`) and disable PHP execution inside the `uploads/` folder!

---

## 7. ⚠️ Common Beginner Traps

1. **Forgetting `enctype="multipart/form-data"`**:
   If omitted, `$_FILES` will be completely empty!
2. **Forgetting Server Limits in `php.ini`**:
   If you try to upload a 50MB video and it fails silently, check `upload_max_filesize` and `post_max_size` inside `php.ini`!

---

## 8. 🔮 Predict the Output

What does `$_FILES['doc']['error'] === 0` mean?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> It means <code>UPLOAD_ERR_OK</code> — the file was successfully uploaded to the server's temporary directory with zero errors!
</details>

---

## 9. 🕵️ Code Detective: The Missing Enctype

```html
<form action="upload.php" method="POST">
  <input type="file" name="doc">
  <button type="submit">Upload</button>
</form>
```

- **Find the bug**: In `upload.php`, `var_dump($_FILES)` is empty!
- **Explain**: Missing `enctype="multipart/form-data"`.
- **Fix**: Add `enctype="multipart/form-data"` to the `<form>` tag.

---

## 10. 🏆 5 Levels of Mastery Exercises

### 🟢 Level 1: Recall
1. What form attribute is mandatory for handling file uploads?
2. Which superglobal array stores uploaded file information?
3. What function moves a file from temporary storage to its permanent destination?

### 🟡 Level 2: Understand
4. What is the difference between `$_FILES['pic']['name']` and `$_FILES['pic']['tmp_name']`?
5. Why is it dangerous to save an uploaded file with the exact filename provided by the visitor?

### 🟠 Level 3: Apply
6. Write a PDF uploader script for student homework assignments: only allow files ending in `.pdf` with a maximum size of 5MB.

### 🔵 Level 4: Think & Troubleshoot
7. How does `mime_content_type($tmpPath)` provide stronger security than just inspecting the file extension?

### 🟣 Level 5: Create & Build
8. Build a Multi-File Photo Gallery: allow visitors to upload up to 3 images at once using `<input type="file" name="photos[]" multiple>`. Loop through and display a responsive photo album grid of all uploaded images.
