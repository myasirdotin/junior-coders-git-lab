# Chapter 3: Laravel Project Structure

## 🌟 Real-Life Story

On your first day in a new school library, everything feels confusing. Then a kind librarian shows you around. "Science books are here. The front desk is there. The records room is at the back." After the tour, you can find anything. A new Laravel project has many folders too. This chapter is your tour, so you always know where to look.

## 🎯 What You Will Learn

- Name the main folders of a Laravel project and what goes in each.
- Find the four MVC places: routes, controllers, models and views.
- Use the `.env` file to connect Laravel to a MySQL database in XAMPP.
- Run your first migration to create Laravel's starter tables.

## 🗺️ The Folder Map

Open `C:\xampp\htdocs\library-app` in your code editor. You will see this (some small files are left out):

```text
library-app/
├── app/
│   ├── Http/Controllers/
│   ├── Models/
│   └── Providers/
├── bootstrap/
├── config/
├── database/
│   ├── factories/
│   ├── migrations/
│   └── seeders/
├── public/
├── resources/
│   ├── css/  js/
│   └── views/
├── routes/
│   ├── web.php
│   └── console.php
├── storage/
├── tests/
├── vendor/
├── .env
├── artisan
└── composer.json
```

## 📂 What Each Folder Is For

| Folder or file | What lives there |
|----------------|------------------|
| `app/` | Your app's PHP classes: controllers, models, middleware |
| `app/Http/Controllers/` | **Controllers** (the C in MVC) |
| `app/Models/` | **Models** (the M in MVC). A `User` model is already there |
| `bootstrap/` | Start-up code. `bootstrap/app.php` sets up routes and middleware |
| `config/` | Settings files, such as `database.php` and `app.php` |
| `database/` | Migrations, seeders and factories (Part 6) |
| `public/` | The only folder visitors reach. Holds `index.php`, images, built CSS |
| `resources/views/` | **Views**: Blade templates (the V in MVC) |
| `routes/web.php` | **Routes** for web pages |
| `storage/` | Logs, uploaded files and cached views. Laravel writes here |
| `vendor/` | Packages Composer downloaded. **Never edit it** |
| `.env` | Secret settings for this computer |
| `artisan` | The file behind every `php artisan` command |

### Why `public/` matters

Every request enters through `public/index.php`. That file starts Laravel and hands the request to your routes. Your other folders stay hidden from visitors. This is safer, because nobody can download your `.env` file or your code. When you use `php artisan serve`, Laravel points the server at `public/` for you.

## 🔑 The `.env` File

`.env` (say "dot env") holds settings that change from one computer to another. Here are some important lines:

```ini
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:...a long random string...
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=sqlite
```

- `APP_KEY` is a secret key Laravel uses to encrypt data. Composer made it for you.
- `APP_DEBUG=true` shows detailed error pages. That is helpful while learning. A live website must use `false`, because error pages can reveal secrets.

### Keep it secret (*Amānah*)

The `.env` file holds passwords and keys. They are a trust (*amānah*) you must protect. Laravel's `.gitignore` already stops Git from uploading `.env`. Never paste it online or share it in a group chat. Share `.env.example` instead; it has the names but no secrets.

## 🐬 Connect to MySQL in XAMPP

A new Laravel 12 project uses **SQLite**, a database stored in one file. We want MySQL, because you already know it and phpMyAdmin shows the tables.

1. Start **Apache** and **MySQL** in the XAMPP Control Panel.
2. In `.env`, change the database lines to this:

```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=library_app
DB_USERNAME=root
DB_PASSWORD=
```

XAMPP's MySQL user is `root` with an empty password. That is fine on your own computer only.

3. Save the file. Laravel reads `.env` on every request, so there is nothing to restart. (If you ever run `php artisan config:cache`, run `php artisan config:clear` after changing `.env`.)

## 🏗️ Your First Migration

A **migration** is a PHP file that creates or changes database tables. Part 6 explains migrations in full. For now, run the ones Laravel already wrote:

```bash
php artisan migrate
```

If the `library_app` database does not exist yet, Laravel asks:

```text
 WARN  The database 'library_app' does not exist on the 'mysql' connection.

 ┌ Would you like to create it? ────────────────────────────────┐
 │ Yes                                                          │
 └──────────────────────────────────────────────────────────────┘
```

Choose **Yes**. Then you see something like this (times will differ):

```text
   INFO  Preparing database.

  Creating migration table ............................. 12.30ms DONE

   INFO  Running migrations.

  0001_01_01_000000_create_users_table ................. 41.85ms DONE
  0001_01_01_000001_create_cache_table ................. 12.07ms DONE
  0001_01_01_000002_create_jobs_table .................. 33.62ms DONE
```

Open phpMyAdmin. The `library_app` database now has tables such as `users`, `sessions`, `cache`, `jobs` and `migrations`. Laravel keeps its login sessions in the `sessions` table, so this step matters even before you write any code.

## 🏠 Where the Welcome Page Comes From

Open `routes/web.php`:

```php
<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
```

This route says: when someone visits `/`, show the view called `welcome`. That view is the file `resources/views/welcome.blade.php`. You will learn routes in Chapter 4.

## ⚠️ Common Mistake

**Editing files inside `vendor/`.**

A student wants to change a Laravel message, finds it in `vendor/laravel/framework/...`, and edits it. It works today. Next week, `composer update` downloads fresh files, and the change disappears. Worse, a teammate never had the change at all.

Fix: never edit `vendor/`. Put your own code in `app/`, `routes/`, `resources/` and `config/`. Laravel gives you proper ways to change its behaviour from there.

**Wrong database name in `.env`.** If you see `SQLSTATE[HY000] [1049] Unknown database 'library_ap'`, check the spelling of `DB_DATABASE`.

## ✍️ Try It

Switch your `library-app` to MySQL and run `php artisan migrate`. Then open phpMyAdmin and count the tables in `library_app`.

*Hint:* if you see `SQLSTATE[HY000] [2002]`, MySQL is not running. Start it in the XAMPP Control Panel.

## 📝 Recap

- Routes are in `routes/web.php`, controllers in `app/Http/Controllers`, models in `app/Models`, views in `resources/views`.
- Visitors only reach `public/`; everything else stays hidden.
- `.env` holds this computer's settings and secrets. Never share it or commit it.
- Set `DB_CONNECTION=mysql` and `DB_DATABASE=library_app` to use XAMPP's MySQL.
- `php artisan migrate` creates Laravel's starter tables, including `users` and `sessions`.

## 🏆 Practice

### 🟢 Level 1: Recall
In which folder do you put (a) a view, (b) a controller, (c) a model? Which folder must you never edit?

<details>
<summary>Show answer</summary>

(a) `resources/views/`, (b) `app/Http/Controllers/`, (c) `app/Models/`. Never edit `vendor/`; Composer manages it.

</details>

### 🟡 Level 2: Apply
Write the six `.env` lines that connect Laravel to a MySQL database called `school_library` on XAMPP.

<details>
<summary>Show answer</summary>

```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=school_library
DB_USERNAME=root
DB_PASSWORD=
```

</details>

### 🔴 Level 3: Challenge
Your friend wants to share their project on GitHub so you can help.

1. Which file must **not** be uploaded, and why?
2. Which file should they upload instead so you know the setting names?
3. After you download the project, which two commands set it up? (Hint: one installs packages, one creates tables.)

<details>
<summary>Show one possible answer</summary>

1. `.env`, because it holds secret keys and passwords. Protecting them is an *amānah*.
2. `.env.example`. You copy it to `.env` and fill in your own values.
3. `composer install` (downloads the `vendor/` packages) and `php artisan migrate` (creates the tables). You also run `php artisan key:generate` once to make your own `APP_KEY`.

</details>
