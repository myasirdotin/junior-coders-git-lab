# Chapter 22: Auth Scaffolding

## 🌟 Real-Life Story

When a new school opens, nobody builds the front gate's lock from scratch. The school buys a **tested lock** from a trusted maker, fits it, and gives keys to the right people. Making your own lock is a great way to *learn* how locks work, but the gate itself should use one that experts have tested for years. Laravel's **starter kits** are that tested lock for logins. In this chapter you meet them; in Chapter 23 you build a simple lock by hand to see how it works inside.

## 🎯 What You Will Learn

- Explain **authentication** and how it differs from **authorization**.
- Describe what Laravel already has for users: the `users` table, the `User` model and password hashing.
- Create a project with a Laravel 12 **starter kit** (React, Vue or Livewire).
- Know that **Breeze** was the starter kit for Laravel 11 and earlier.
- Protect passwords as an *amānah*.

## 🔑 Authentication vs Authorization

| Word | Question it answers | Library example |
|------|--------------------|-----------------|
| **Authentication** | *Who are you?* | Mrs Rahman logs in with her email and password |
| **Authorization** | *What may you do?* | Only librarians may delete books |

This chapter and the next cover authentication. Chapter 24 covers both: keeping pages for logged-in users, and keeping some pages for librarians only.

## 🧱 What Laravel Already Gives You

Even a brand-new project is ready for users:

- **The `users` table**, made by the first migration (Chapter 16): `name`, `email`, `password`, `remember_token` and more.
- **The `User` model** in `app/Models/User.php`.
- **The `sessions` table**, where Laravel remembers who is logged in.
- **The `auth` and `guest` middleware** (Chapter 9).

Look inside `User.php` (shortened):

```php
class User extends Authenticatable
{
    protected $fillable = ['name', 'email', 'password'];

    protected $hidden = ['password', 'remember_token'];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
```

- `$hidden` keeps the password out of arrays and JSON, so it is never sent to a browser by accident.
- The `'password' => 'hashed'` cast means: whenever a password is saved, **hash** it first.

## 🔒 Hashing Passwords

A **hash** is a one-way scramble. You can turn a password into a hash, but you cannot turn the hash back into the password. Laravel uses **bcrypt**, the same method as PHP's `password_hash()`, which you met in the PHP book.

Try it in Tinker:

```text
> $hash = Hash::make('river-stone-42')
= "$2y$12$2DhQkYLOxAFvDwUqSsKMHeehLomC1q5eNSd9ntNn2NB8iZLctXWma"

> Hash::check('river-stone-42', $hash)
= true

> Hash::check('river-stone-43', $hash)
= false
```

Your hash will look different every time, even for the same password, because bcrypt adds a random **salt**. `$2y$` means bcrypt and `12` is how hard it works. To log someone in, Laravel hashes what they typed and compares; it never needs the real password.

### Passwords are an *amānah*

People often reuse passwords. If your app leaked them, a member's other accounts could be at risk. So:

- **Never** store a plain password, print it, log it, or email it.
- **Never** put real people's passwords in seeders or Git.
- Use the tools that hash for you, and let users reset forgotten passwords instead of "telling" them their old one.

## 🚀 Laravel 12 Starter Kits

A **starter kit** is a ready-made app with login, registration, password reset, email verification, a dashboard and profile settings. You start a **new** project with it. In Laravel 12 the kits are:

| Kit | Front end | Good for |
|-----|-----------|----------|
| **Livewire** | Blade + Livewire components | Students who know Blade (closest to this book) |
| **React** | React + Inertia | Teams that use React |
| **Vue** | Vue + Inertia | Teams that use Vue |

(Newer versions of the installer may offer more choices.) The kits also need **Node.js** and **npm**, which build the CSS and JavaScript.

### Try one in a practice project

Install the Laravel installer once:

```bash
composer global require laravel/installer
```

Then create a new practice project (not your `library-app`):

```bash
cd C:\xampp\htdocs
laravel new library-portal
```

The installer asks a few questions. Choose the **Livewire** starter kit and Laravel's built-in authentication, and say yes to installing npm packages. For the database you can keep SQLite for this practice project, or pick MySQL and set it up like Chapter 3. Then:

```bash
cd library-portal
npm install
npm run build
php artisan migrate
php artisan serve
```

Visit `http://127.0.0.1:8000/register`, create an account with a made-up email such as `test@example.org`, and you land on `/dashboard`. Log out and log in again at `/login`. Open phpMyAdmin (or the SQLite file): your password is stored as a long `$2y$12$...` hash.

### What the kit added

Explore the new project. You will find:

- routes for login, register, logout, password reset and email verification,
- Blade or JavaScript pages for each form,
- a `dashboard` route protected by the `auth` middleware,
- tests that check it all works.

All of it uses the same ideas as this book: routes, controllers or components, validation, `@csrf`, the `auth` middleware and the `User` model. Logout is a **POST** form with `@csrf`, as Chapter 21 explained.

## 🕰️ Laravel 11 and Earlier: Breeze

You will still find older tutorials and school projects using **Laravel Breeze**. Breeze was the simple starter kit for Laravel 11 and earlier. You added it to an existing project:

```bash
composer require laravel/breeze --dev
php artisan breeze:install
npm install
npm run build
php artisan migrate
```

For a new Laravel 12 project, use the starter kits above instead. If you see `breeze:install` in a tutorial, check which Laravel version it was written for.

## ⚠️ Common Mistake

**Saving a password without hashing it.**

```php
// a model WITHOUT the 'hashed' cast
User::create([
    'name' => 'Hamza',
    'email' => 'hamza@example.org',
    'password' => $request->password,   // stored as plain text!
]);
```

What happens: the password sits in the database as plain text, and logging in fails, because Laravel compares the typed password against a hash. Keep the `'password' => 'hashed'` cast in `User`, or hash it yourself:

```php
'password' => Hash::make($request->password),
```

Do **not** do both, or the password is hashed twice and nobody can log in.

**Skipping `npm run build`.** A starter-kit page with no styling, or a "Vite manifest not found" error, means the front-end files were never built. Run `npm install` and `npm run build`.

## ✍️ Try It

Create the `library-portal` practice project with the Livewire kit. Register two made-up users, then find them in the `users` table. Are the two hashes the same length? Do they start the same way?

*Hint:* both start with `$2y$12$` and are 60 characters long.

## 📝 Recap

- Authentication asks *who are you?*; authorization asks *what may you do?*
- Laravel ships with a `users` table, a `User` model, sessions, and `auth`/`guest` middleware.
- The `'password' => 'hashed'` cast hashes passwords with bcrypt; `Hash::check()` compares them.
- Laravel 12 starter kits (Livewire, React, Vue) give you a tested login system in a new project.
- Breeze was the starter kit for Laravel 11 and earlier.

## 🏆 Practice

### 🟢 Level 1: Recall
What is the difference between authentication and authorization? Give a library example of each.

<details>
<summary>Show answer</summary>

Authentication checks **who** you are (logging in with email and password). Authorization checks **what you may do** (only librarians may delete books).

</details>

### 🟡 Level 2: Apply
A student says: "Hashing is like locking the password in a box. The app can unlock it to check it." What is wrong with this idea?

<details>
<summary>Show answer</summary>

A hash cannot be "unlocked". It is one-way. To check a password, Laravel hashes what the user typed and compares the result with the stored hash (`Hash::check()`). The real password is never stored and never recovered.

</details>

### 🔴 Level 3: Challenge
Write a one-page "Login Safety Plan" for the library app.

1. Which starter kit would you choose for a team that knows Blade, and why?
2. List three things the app must **never** do with passwords.
3. Which pages should only logged-in users see? Which only librarians?
4. What should happen when a member forgets their password?

<details>
<summary>Show one possible answer</summary>

1. The Livewire kit, because its pages are Blade templates, which the team already knows.
2. Never store passwords as plain text, never show or email them, never put real passwords in seeders or Git.
3. Logged-in users: "My loans", profile. Librarians only: add/edit/delete books, record returns, member list.
4. They use "Forgot password?": the app emails a reset link with a token that expires, and they choose a new password. Nobody ever sees the old one.

</details>
