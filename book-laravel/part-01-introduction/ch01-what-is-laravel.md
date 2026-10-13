# Chapter 1: What is Laravel?

## 🌟 Real-Life Story

Imagine your school decides to open a new library. You could cut the wood, build every shelf and print every library card yourself. Or you could start with ready-made shelves, a card system and a front desk, and spend your energy on choosing good books. Laravel is the second choice for web apps. It gives you the shelves and the front desk, so you can focus on what your app is for.

## 🎯 What You Will Learn

- Explain what a **framework** is and how Laravel helps a PHP developer.
- Compare writing an app in plain PHP with writing it in Laravel.
- Install the tools you need on your own computer (XAMPP, Composer).
- Create your first Laravel project and see it running in the browser.
- Meet the school library app that you will build across this book.

## What is Laravel?

**Laravel** is a free, open-source **PHP web framework**. Taylor Otwell first released it in 2011. Today it is one of the most popular ways to build websites with PHP.

A **framework** is a ready-made structure for an app. It gives you folders, tools and rules. You fill in the parts that are special to your app. **Open source** means anyone can read the code and help improve it.

You already know PHP and MySQL. Laravel does not replace them. It is written in PHP, and it talks to MySQL. It simply organises your work.

## Plain PHP vs Laravel

| Task | Plain PHP | Laravel |
|------|-----------|---------|
| Page addresses (URLs) | One `.php` file per page | Clean routes in `routes/web.php` |
| Database queries | Write SQL by hand with PDO | **Eloquent** models, plus SQL when you need it |
| HTML pages | PHP mixed into HTML | **Blade** templates |
| Checking form input | Many `if` statements | One `$request->validate([...])` call |
| Login system | Build it all yourself | Starter kits give you a tested one |
| Form security | You must remember it | `@csrf` tokens built in |

Laravel helps protect your app from common attacks when you use its tools. It does not make every app safe by itself. You still need to think carefully about every page you build.

## The Tools You Need

You will build every example on **your own computer**. Laravel cannot run inside a web page, so this book has no in-browser lab. Your computer is the lab.

1. **XAMPP**: gives you PHP and MySQL. Laravel 12 needs **PHP 8.2 or newer**.
2. **Composer**: the PHP package manager. A **package** is code someone else wrote that you can reuse. Install Composer from getcomposer.org with the Windows installer.
3. **A code editor**, such as VS Code.
4. **A terminal**: Command Prompt, PowerShell or Git Bash.

Check your versions in the terminal:

```bash
php -v
composer --version
```

Output (your numbers may be different or higher):

```text
PHP 8.2.12 (cli) (built: Oct 24 2023 21:15:15) (ZTS Visual C++ 2019 x64)
Composer version 2.8.12 2025-09-19 13:41:59
```

If you see `'php' is not recognized`, add `C:\xampp\php` to your Windows PATH, then open a new terminal.

## Create Your First Project

Go to the XAMPP web folder and ask Composer to create a new Laravel app called `library-app`:

```bash
cd C:\xampp\htdocs
composer create-project laravel/laravel library-app
```

Composer downloads Laravel and the packages it needs. This takes a few minutes the first time. When it finishes, go into the folder and check the version:

```bash
cd library-app
php artisan --version
```

Output (your number may be higher):

```text
Laravel Framework 12.61.0
```

**Artisan** is Laravel's command-line helper. You will use it in almost every chapter. Every Artisan command starts with `php artisan`.

## See It in the Browser

Start Laravel's small development server:

```bash
php artisan serve
```

Output:

```text
   INFO  Server running on [http://127.0.0.1:8000].

  Press Ctrl+C to stop the server
```

Open `http://127.0.0.1:8000` in your browser. You will see the Laravel welcome page. Keep this terminal open while you work. Press **Ctrl+C** to stop the server.

## Our Project: The School Library App

In this book you will build one app, step by step: a **school library app**. It has three main parts:

```text
+---------+    +---------+    +---------+
|  Books  |    |  Loans  |    | Members |
| title   |<---| book    |--->| name    |
| author  |    | member  |    | grade   |
| copies  |    | due on  |    | email   |
+---------+    +---------+    +---------+
```

- **Books**: what the library owns.
- **Members**: the students and teachers who borrow books.
- **Loans**: a record that a member borrowed a book, and when it is due back. (In this book, a "loan" always means borrowing a library book.)

By Chapter 24 the app will list books, let librarians add and edit them, record loans, check form input, and keep the librarian pages behind a login.

## ⚠️ Common Mistake

**Running Artisan in the wrong folder.**

```bash
C:\xampp\htdocs> php artisan serve
```

What happens:

```text
Could not open input file: artisan
```

The `artisan` file lives inside your project folder. Fix it by moving into the project first:

```bash
C:\xampp\htdocs> cd library-app
C:\xampp\htdocs\library-app> php artisan serve
```

## ✍️ Try It

Create the `library-app` project on your own computer. Run `php artisan --version` and `php artisan serve`, then open the welcome page in your browser.

*Hint:* if Composer seems slow, wait. It is downloading many packages. Do not close the terminal halfway.

## 📝 Recap

- Laravel is a free PHP framework. It gives your app a clear structure and ready-made tools.
- It still uses the PHP and MySQL you already know.
- Composer installs Laravel; Artisan (`php artisan ...`) is its command-line helper.
- `php artisan serve` runs your app at `http://127.0.0.1:8000`.
- This book builds one app: a school library with books, members and loans.

## 🏆 Practice

### 🟢 Level 1: Recall
What is a framework, and which two tools do you use to create and run a Laravel project?

<details>
<summary>Show answer</summary>

A framework is a ready-made structure (folders, tools and rules) for building an app. You create the project with **Composer** (`composer create-project laravel/laravel library-app`) and run it with **Artisan** (`php artisan serve`).

</details>

### 🟡 Level 2: Apply
A classmate types `php artisan serve` and sees `Could not open input file: artisan`. What two things should they check?

<details>
<summary>Show answer</summary>

1. Are they inside the project folder? Run `cd library-app` first.
2. Did `composer create-project` finish without errors? If it stopped halfway, the `artisan` file may be missing. Delete the half-made folder and run the command again.

</details>

### 🔴 Level 3: Challenge
Plan your library app before you code it.

1. Write the three main parts of the app.
2. For each part, list three facts the app should store.
3. Write two things a librarian should be able to do that a student should not.

<details>
<summary>Show one possible answer</summary>

1. Books, members, loans.
2. Books: title, author, number of copies. Members: name, grade, email. Loans: which book, which member, due date.
3. Only a librarian should add or delete books, and only a librarian should mark a book as returned.

You will build all of this. Chapter 24 shows how to keep librarian pages behind a login.

</details>
