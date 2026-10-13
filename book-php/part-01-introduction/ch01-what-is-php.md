# Chapter 1: What is PHP?

---

## 🌟 Real-Life Story

Think about a restaurant. You sit at a table and read a nicely printed menu. A waiter takes your order into the kitchen. Behind the swinging doors, the chef cooks your meal where you cannot see. The waiter brings back the finished plate, and you never touch the kitchen. A website works the same way: HTML and CSS are the menu, and **PHP is the chef** working on the server.

---

## 🎯 What You Will Learn

- Explain what **PHP** stands for and where it came from.
- Compare **client-side** code (runs in the browser) with **server-side** code (runs on the server).
- Trace the journey of a `.php` page from the address bar to the screen.
- Describe why visitors see only the HTML that PHP produces, never the PHP itself.

---

## Visual Concept Explanation

A **server** is a computer that stores websites and sends pages to visitors. A **client** is the visitor's browser that asks for those pages.

### The Client-Server Architecture

![The PHP Client-Server Request Lifecycle](../assets/diagrams/php/client-server-cycle.svg)

### The Journey of a PHP Page Request

```text
+------------------------+
| 1. BROWSER (visitor)   |
| asks for profile.php   |
+-----------+------------+
            | HTTP request
            v
+-----------+------------+
| 2. WEB SERVER (Apache) |
| sees ".php", calls PHP |
+-----------+------------+
            |
            v
+-----------+------------+
| 3. PHP ENGINE          |
| runs the code, builds  |
| plain HTML             |
+-----------+------------+
            | HTML only
            v
+-----------+------------+
| 4. BROWSER shows page  |
| (no PHP code visible)  |
+------------------------+
```

An **HTTP request** is the message a browser sends to ask a server for a page.

### Client-Side vs. Server-Side Comparison

| Feature | Client-Side (HTML / CSS / JS) | Server-Side (PHP) |
| :--- | :--- | :--- |
| **Where It Runs** | Inside the visitor's web browser | On the web server |
| **Source Visibility** | Anyone can click "View Page Source" | Stays on the server; visitors see only the output |
| **Database Access** | Cannot safely talk to a database | Can talk to databases such as MySQL |
| **Primary Job** | Layout, design, animations, user input | Logins, saving data, page building |
| **File Extension** | `.html`, `.css`, `.js` | `.php` |

> 💡 **Private is not the same as safe.** Keeping PHP code on the server keeps it private. It does not make the code secure by itself. Later chapters teach how to write safe code.

---

## Code Example: Peeking Behind the Server Curtain

When a visitor requests a PHP page, the server runs the PHP code and sends only the result:

```php
<!-- index.php on the server -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>PHP Welcome</title>
</head>
<body>
  <h1>Welcome to Class 9 Server Programming!</h1>
  <?php
    $studentName = "Zainab";
    $serverTime = date("l, F j, Y - H:i:s");
    echo "<p>Hello, <strong>$studentName</strong>!</p>";
    echo "<p>Server time: <em>$serverTime</em></p>";
  ?>
</body>
</html>
```

What the visitor's browser actually receives (the time depends on when the page is opened):

```html
<!-- What the browser receives (View Page Source) -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>PHP Welcome</title>
</head>
<body>
  <h1>Welcome to Class 9 Server Programming!</h1>
  <p>Hello, <strong>Zainab</strong>!</p><p>Server time: <em>Wednesday, September 16, 2026 - 08:50:00</em></p></body>
</html>
```

Notice that the two `<p>` lines arrive side by side. `echo` prints exactly what you give it. It does not add new lines for you. The browser still shows two separate paragraphs.

---

## Code Explanation: Breaking It Down Line by Line

- `<?php`: The **PHP opening tag**. It tells the server: *"Start running PHP code here."*
- `$studentName = "Zainab";`: Creates a **variable** (a named box in memory) that stores a name. Chapter 4 explains variables.
- `$serverTime = date(...);`: Calls PHP's built-in `date()` function to read the server's clock.
- `echo "<p>Hello, ...</p>";`: `echo` prints text and HTML tags into the page that goes to the browser.
- `?>`: The **PHP closing tag**. It tells the server: *"Stop running PHP and send the normal HTML again."*

---

## 🌍 Real-World Connection: The Giant Engines of the Web

- **WordPress** runs a large share of all websites (about 4 in 10), and it is written in **PHP**.
- **Wikipedia**, the free online encyclopedia, runs on **MediaWiki**, which is written in PHP.
- Many school portals, library catalogues and online shops also run on PHP.
- Among websites whose server language is known, about three out of four use PHP.

> 💡 **Fun Fact**:
> PHP first stood for **Personal Home Page** tools. Rasmus Lerdorf created it in 1994. Today the name means **PHP: Hypertext Preprocessor**. The name contains itself, which is called a **recursive acronym**.

---

## 🔮 Predict the Output

Look at this server code:

```php
<p>2 + 2 = <?php echo 2 + 2; ?></p>
```

**Question**: What will the visitor see in their browser, and what will they see if they click "View Page Source"?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> On the screen they see <code>2 + 2 = 4</code>. In "View Page Source" they see <code>&lt;p&gt;2 + 2 = 4&lt;/p&gt;</code>. The PHP code <code>&lt;?php echo 2 + 2; ?&gt;</code> runs on the server and is replaced by <code>4</code>.
</details>

---

## 🕵️ Code Detective: The Broken File

A junior coder created a file named `contact.html` and typed:

```html
<h1>Contact Us</h1>
<p><?php echo "Email us at office@example.org"; ?></p>
```

When they opened the page, the email address was missing.

- **Find the mistake**: The file ends in `.html`.
- **Explain the mistake**: The web server does not start the PHP engine for `.html` files. It sends the `<?php ... ?>` text straight to the browser. The browser treats it as an unknown tag and hides it.
- **Fix**: Rename the file to `contact.php` and open it through `http://localhost/...`.

---

## ⚠️ Common Mistake

**Opening a `.php` file by double-clicking it.**

- ❌ *Wrong*: You double-click `hello.php` in File Explorer. The browser opens `file:///C:/xampp/htdocs/hello.php`.
- 😕 *What happens*: No server runs the code. You see raw PHP text, or the browser offers to download the file.
- ✅ *Fixed*: Start Apache in XAMPP, then open `http://localhost/hello.php`. Now the server runs PHP and sends back HTML.

The same rule explains a second mistake: PHP inside a `.html` file does not run. Only files that end in `.php` are sent to the PHP engine.

---

## ✍️ Try It

Open the [PHP Console](../studios/php-console/) and type:

```php
<?php
echo "<p>Today our class starts PHP!</p>";
echo 5 + 3;
```

Output:

```text
<p>Today our class starts PHP!</p>8
```

*Hint*: The console shows the HTML that PHP produced. That is exactly what a browser would receive. `echo 5 + 3;` works out the sum on the server and prints only `8`.

---

## 📝 Recap

- PHP is a **server-side** language: it runs on the web server, not in the browser.
- The browser asks for a page; the server runs the PHP; only plain HTML comes back.
- Visitors never see your PHP code, only its output.
- PHP files must end in `.php` and be opened through a server such as `http://localhost/`.
- PHP means **PHP: Hypertext Preprocessor**. It was created by Rasmus Lerdorf in 1994.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. What does the name PHP stand for today?
2. Who created PHP, and in what year?
3. What file extension must a file have for its PHP code to run?

<details>
<summary>Show answer</summary>

1. **PHP: Hypertext Preprocessor** (a recursive acronym). It first meant *Personal Home Page* tools.
2. **Rasmus Lerdorf**, in **1994**.
3. **`.php`**.

</details>

### 🟡 Level 2: Apply
1. Why can visitors see your HTML with "View Page Source" but never your PHP code?
2. Your Apache server is switched off. Can the browser still run a `.php` file? Explain.

<details>
<summary>Show answer</summary>

1. PHP runs on the server first. The server sends only the **output** (plain HTML) to the browser. The PHP code itself never leaves the server.
2. **No.** The browser cannot run PHP. Only the server's PHP engine can. With Apache off, nothing runs the code, so you see raw text or an error.

</details>

### 🔴 Level 3: Challenge
A student logs into the school portal. Explain the journey of that request.

1. Draw four boxes: browser, web server (Apache), PHP engine, database (MySQL).
2. Add arrows with a short label for each step: what is sent, and what comes back.
3. Mark the one box where the visitor can see the code.
4. Extra: write five sentences for a classmate on why a school portal needs PHP and not only HTML.

<details>
<summary>Show one possible answer</summary>

```text
[Browser] --request: login page-->  [Apache]
[Apache]  --.php file-->            [PHP engine]
[PHP engine] --"find this student"--> [MySQL]
[MySQL]   --student's details-->    [PHP engine]
[PHP engine] --plain HTML-->        [Apache]
[Apache]  --HTML page-->            [Browser]
```

Only the **browser** box shows code to the visitor, and only the HTML.

Five sentences: *An HTML page is the same for every visitor. A school portal must show each student their own timetable and marks. PHP runs on the server and builds a page for each student. It can check a password and read records from a database. HTML alone cannot do any of this.*

</details>
