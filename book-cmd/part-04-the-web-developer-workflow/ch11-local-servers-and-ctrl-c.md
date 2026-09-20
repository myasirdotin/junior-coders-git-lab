# Chapter 11: Local Development Servers & The Emergency Brake (<kbd>Ctrl</kbd> + <kbd>C</kbd>)

> **Key Idea**: Static HTML files can be opened by double-clicking them, but full-stack web applications (PHP, MySQL, APIs) need a live web server. The terminal allows you to spin up a local server in seconds and halt it safely when you are done.

---

## 1. Running a Local Web Server from the Terminal

Instead of opening the heavy XAMPP control panel every time you want to test a simple PHP script, PHP includes its own lightning-fast built-in web server!

### Starting PHP Built-in Server:
1. Navigate to your website folder:
   ```text
   cd C:\xampp\htdocs\my-site
   ```
2. Start the server:
   ```text
   php -S localhost:8000
   ```
3. You will see output like this:
   ```text
   [Sat Sep 19 12:00:00 2026] PHP 8.2.12 Development Server (http://localhost:8000) started
   ```
4. Open your web browser and visit `http://localhost:8000`. Your website is alive!

### What about Python?
If you have Python installed, you can launch an instant static HTTP server for any HTML/CSS project:
```text
python -m http.server 8080
```

---

## 2. The Emergency Brake: <kbd>Ctrl</kbd> + <kbd>C</kbd>

Notice something when your local server is running: **you cannot type any new commands** in that terminal window! The terminal is actively listening for web browser traffic and logging incoming requests.

How do you safely shut down the server and regain control of your prompt?

> [!IMPORTANT]
> **The Universal Halt Shortcut**: Press <kbd>Ctrl</kbd> + <kbd>C</kbd>.
> 
> In both Windows CMD and Git Bash / Linux, pressing <kbd>Ctrl</kbd> + <kbd>C</kbd> sends an **interrupt signal** (`SIGINT`) to the running process. The server terminates gracefully and your command prompt immediately returns:
> ```text
> ^C
> C:\xampp\htdocs\my-site> _
> ```

### When Else Should You Use <kbd>Ctrl</kbd> + <kbd>C</kbd>?
- If an accidental infinite loop in a script causes your terminal to scroll endlessly.
- If a command is downloading a huge file and you want to abort.
- If a command is frozen and waiting for input you don't have.

---

## 3. Review & Practice

### 🟢 Level 1: Recall
1. What command starts PHP's built-in development server on port 8000?
2. What keyboard shortcut terminates a running server or stuck script in the terminal?
3. What happens to the prompt while a development server is actively running?

### 🟡 Level 2: Hands-On Server Drill
1. In your `practice-lab` folder, ensure you have an `index.html` file that says `<h1>Hello from Localhost</h1>`.
2. Start a local server (using `php -S localhost:8000` or `python -m http.server 8000`).
3. Open your browser and navigate to `http://localhost:8000`. Confirm the page loads!
4. Return to your terminal and stop the server with <kbd>Ctrl</kbd> + <kbd>C</kbd>. Refresh your browser to verify it has stopped.

### 🔴 Level 3: Architecture Analysis
Why is a local development server like `localhost:8000` necessary when testing backend PHP scripts, whereas double-clicking `index.html` directly in File Explorer only shows raw PHP code?
