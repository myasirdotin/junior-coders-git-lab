# Chapter 11: Local Development Servers & The Emergency Brake (<kbd>Ctrl</kbd> + <kbd>C</kbd>)

## 🌟 Real-Life Story

During the school book fair, Khadija runs the information desk. While the desk is open, she is busy answering visitors. She cannot leave to do other jobs. At the end of the day, the teacher rings a bell. Khadija closes the desk, tidies up, and is free again. A local web server is like that desk. While it runs, it is busy answering your browser. <kbd>Ctrl</kbd> + <kbd>C</kbd> is the bell that closes it.

> **Key Idea**: Some web pages, such as PHP pages, need a **web server** to work. The terminal can start a small server in seconds. <kbd>Ctrl</kbd> + <kbd>C</kbd> stops it and gives you your prompt back.

## 🎯 What You Will Learn

- Explain what a local web server is, and what `localhost` means.
- Start PHP's built-in server and Python's simple server.
- Read the lines a server prints while it works.
- Stop a server, or any stuck command, with <kbd>Ctrl</kbd> + <kbd>C</kbd>.

## What Is a Local Server?

A **web server** is a program that sends web pages to browsers. Big websites use servers on computers far away. A **local server** runs on **your own** computer, just for you to test your work.

Its address is `localhost`. That name always means *"this computer"*. After it comes a **port** number, like `:8000`. A port is like a numbered door. It lets several programs on one computer receive messages without mixing them up.

Plain HTML pages open fine with a double-click. But a **PHP** page needs a server to run its PHP code first. Without a server, the browser only shows the raw code, or offers to download the file.

## Starting PHP's Built-In Server

PHP comes with a small server for testing. First go to your website folder. Make sure it has an `index.html` (or `index.php`). Then start the server with `php -S localhost:8000`. The `-S` must be a **capital** S. It means **S**erver.

**CMD**:

```text
C:\JuniorCoders\practice>cd my-site

C:\JuniorCoders\practice\my-site>php -S localhost:8000
[Tue Oct 13 08:05:19 2026] PHP 8.3.31 Development Server (http://localhost:8000) started
```

**PowerShell** uses the same command:

```text
PS C:\JuniorCoders\practice\my-site> php -S localhost:8000
[Tue Oct 13 08:05:19 2026] PHP 8.3.31 Development Server (http://localhost:8000) started
```

Your date and PHP version will be different. Notice: **the prompt does not come back.** The server is now running in this window.

Open your browser and go to `http://localhost:8000`. Your page appears! Look back at the terminal. The server has written a few new lines:

```text
[Tue Oct 13 08:05:22 2026] [::1]:54938 Accepted
[Tue Oct 13 08:05:22 2026] [::1]:54938 [200]: GET /
[Tue Oct 13 08:05:22 2026] [::1]:54938 Closing
```

- **Accepted**: a browser connected. `::1` is another way to write "this computer".
- **`[200]: GET /`**: the browser asked (`GET`) for the main page (`/`). The code `200` means *"OK, here it is"*.
- **Closing**: the answer was sent.

Each time you refresh the page, more lines appear. This list is called a **log**. It is a diary of every visit.

> [!NOTE]
> **Git Bash / macOS**: the command is the same, `php -S localhost:8000`, if PHP is installed.

## Python's Simple Server

If Python is installed, it can also serve plain HTML, CSS and JavaScript files (but not PHP). The command is the same in CMD and PowerShell:

```text
C:\JuniorCoders\practice\my-site>python -m http.server 8000
Serving HTTP on :: port 8000 (http://[::]:8000/) ...
```

`-m http.server` means *"run Python's built-in **http.server** tool"*. Open `http://localhost:8000` in the browser. Each visit adds a log line like this:

```text
::1 - - [13/Oct/2026 08:05:22] "GET / HTTP/1.1" 200 -
```

> [!NOTE]
> **Git Bash / macOS**: the same command works. On a Mac, type `python3` instead of `python`.

> [!TIP]
> Windows may show a firewall question the first time. You do not need to allow anything to visit `localhost`. If you are not sure, ask your teacher before clicking.

## The Emergency Brake: <kbd>Ctrl</kbd> + <kbd>C</kbd>

While a server runs, you **cannot type new commands** in that window. The terminal is busy listening for browsers.

To stop it, click inside the terminal window and press <kbd>Ctrl</kbd> + <kbd>C</kbd>. The server stops and the prompt returns.

**PHP server in CMD**:

```text
[Tue Oct 13 08:05:22 2026] [::1]:54938 Closing
^C
C:\JuniorCoders\practice\my-site>
```

**Python server**:

```text
::1 - - [13/Oct/2026 08:05:22] "GET / HTTP/1.1" 200 -
^C
Keyboard interrupt received, exiting.

C:\JuniorCoders\practice\my-site>
```

`^C` is how the terminal shows that you pressed <kbd>Ctrl</kbd> + <kbd>C</kbd>. In PowerShell you may not see `^C`, but the prompt `PS ...>` comes back the same way. Now refresh the browser. The page no longer loads, because the server is closed.

### Other times to use <kbd>Ctrl</kbd> + <kbd>C</kbd>

- A program keeps printing lines and will not stop.
- A command is waiting for something, and you want to cancel it.
- A command is taking far too long.

<kbd>Ctrl</kbd> + <kbd>C</kbd> works in CMD, PowerShell, Git Bash and macOS. It is the most important "stop" key in the terminal.

## ⚠️ Common Mistake

**A small `s` instead of a capital `S`.**

```text
C:\JuniorCoders\practice\my-site>php -s localhost:8000
Could not open input file: localhost:8000
```

Small `-s` is a different option. PHP thinks `localhost:8000` is a file name. Fixed: `php -S localhost:8000`.

**Starting the server in the wrong folder.** Bilal starts the server in an empty folder. His browser shows **Not Found**, and the log says:

```text
[Tue Oct 13 08:18:56 2026] [::1]:57871 [404]: GET / - No such file or directory
```

`404` means *"I cannot find that page"*. The server serves the folder you **started it in**. Fix: press <kbd>Ctrl</kbd> + <kbd>C</kbd>, `cd` into the website folder, then press <kbd>↑</kbd> to bring back the start command and press <kbd>Enter</kbd>.

## ✍️ Try It

1. In `C:\JuniorCoders\practice`, make a folder `my-site` and go into it.
2. Run `echo ^<h1^>Hello from Localhost^</h1^> > index.html` in CMD, or `echo '<h1>Hello from Localhost</h1>' > index.html` in PowerShell.
3. Start a server with `php -S localhost:8000` (or `python -m http.server 8000`).
4. Visit `http://localhost:8000`. Then read the new log lines.
5. Stop the server with <kbd>Ctrl</kbd> + <kbd>C</kbd>. Refresh the browser to prove it stopped.

*Hint*: In CMD, `<` and `>` are special signs. The `^` in front of each one tells CMD to treat it as normal text.

## 📝 Recap

- A **web server** sends pages to browsers. A **local server** runs on your own computer at `localhost`.
- `php -S localhost:8000` starts PHP's server (capital `S`). `python -m http.server 8000` starts Python's.
- While a server runs, the prompt does not come back. The window shows a log of every visit.
- `200` means OK. `404` means not found.
- <kbd>Ctrl</kbd> + <kbd>C</kbd> stops the server, or any stuck command, and returns the prompt.

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which command starts PHP's built-in server on port 8000?
2. Which keys stop a running server?
3. What happens to the prompt while a server is running?

<details>
<summary>Show answer</summary>

1. `php -S localhost:8000`
2. <kbd>Ctrl</kbd> + <kbd>C</kbd>.
3. It does not come back. The window is busy with the server until you stop it.

</details>

### 🟡 Level 2: Apply
Read this server log:

```text
[Tue Oct 13 09:10:02 2026] [::1]:60110 [200]: GET /
[Tue Oct 13 09:10:02 2026] [::1]:60111 [200]: GET /style.css
[Tue Oct 13 09:10:03 2026] [::1]:60112 [404]: GET /logo.png - No such file or directory
```

1. Which files did the browser receive?
2. Which file was missing?
3. Suggest two reasons why it was missing.

<details>
<summary>Show answer</summary>

1. The main page (`/`) and `style.css`.
2. `logo.png` (code `404`).
3. For example: the picture is in a different folder, such as `images\logo.png`; the name is spelled differently (`Logo.png` or `logo.jpg`); or the file was never copied into the site folder. Use `dir` to check.

</details>

### 🔴 Level 3: Challenge
Mariam has a page `index.php` that shows today's date using PHP.

1. She double-clicks the file in File Explorer. What does she see, and why?
2. Write the steps (with commands) to view it properly, in CMD or PowerShell.
3. When she has finished, how does she shut everything down correctly?

<details>
<summary>Show one possible answer</summary>

1. The browser shows the raw PHP code, or offers to download the file. A browser cannot run PHP. Only a server with PHP can run it and send back the finished HTML.
2. Steps:

```text
cd C:\JuniorCoders\practice\mariam-site
php -S localhost:8000
```

Then open `http://localhost:8000` in the browser. (Python's server would not work here, because it does not run PHP.)

3. Click in the terminal window and press <kbd>Ctrl</kbd> + <kbd>C</kbd>. The prompt comes back. Refresh the browser to check the server has stopped.

</details>
