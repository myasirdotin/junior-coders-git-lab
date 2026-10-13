# Chapter 9: Middleware Basics

## 🌟 Real-Life Story

Before you reach the library's front desk, you pass the **door attendant**. He checks a few things. Is the library open right now? Do you have your library card? Are you carrying food that could damage the books? If something is wrong, he politely stops you at the door. If all is well, he lets you walk on to the desk. In Laravel, that door attendant is called **middleware**.

## 🎯 What You Will Learn

- Explain what middleware is and where it sits in the request journey.
- Name a few middleware that Laravel already has, such as `auth` and `throttle`.
- Create your own middleware with `php artisan make:middleware`.
- Attach middleware to one route or to a group of routes.
- Give your middleware a short alias in `bootstrap/app.php`.

## 🚪 Where Middleware Sits

**Middleware** is code that runs **before** (and sometimes after) your controller. It can let the request continue, or stop it and send a different response.

```text
Browser request
      |
      v
+-------------+
| Route match |
+-------------+
      |
      v
+-------------+   stop? -> "Closed" page
| Middleware  |----------------------->
+-------------+
      | continue
      v
+-------------+
| Controller  |
+-------------+
      |
      v
   Response
```

Many middleware can stand in a line, like several checkpoints. The request passes through each one in turn.

## 🧰 Middleware Laravel Already Has

You will use these often:

| Alias | What it checks |
|-------|----------------|
| `auth` | Is the visitor logged in? If not, send them to the login page |
| `guest` | Is the visitor logged **out**? (For login and register pages) |
| `verified` | Has the user confirmed their email address? |
| `throttle:60,1` | No more than 60 requests per minute |

Laravel also runs some middleware on **every** web route automatically. One starts the **session** (the memory of a visitor between pages). Another checks **CSRF tokens** on forms (Chapter 21).

Using built-in middleware takes one word:

```php
// routes/web.php
Route::get('/librarian/reports', [ReportController::class, 'index'])
    ->middleware('auth');
```

We have no login yet; Part 8 adds it. Today we build our own door attendant.

## 🛠️ Make Your Own Middleware

The library desk is open from 8:00 to 15:00. Outside those hours, the borrowing pages should show a polite message.

```bash
php artisan make:middleware EnsureLibraryIsOpen
```

Output:

```text
   INFO  Middleware [C:\xampp\htdocs\library-app\app\Http\Middleware\EnsureLibraryIsOpen.php] created successfully.
```

Open the file and fill in `handle`:

```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureLibraryIsOpen
{
    public function handle(Request $request, Closure $next): Response
    {
        $hour = now()->hour;   // 0 to 23

        if ($hour < 8 || $hour >= 15) {
            return response('The library desk is closed. Please come back at 8:00.', 403);
        }

        return $next($request);
    }
}
```

Read it slowly:

- `handle()` runs for every request that uses this middleware.
- `now()` is a Laravel helper that gives the current date and time. `->hour` is the hour as a number.
- If the desk is closed, we **return a response** straight away. The controller never runs. `403` is the HTTP code for "Forbidden".
- `return $next($request);` means "all is well, pass the request on". Forgetting this line is the most common middleware bug.

### Check the clock

`now()` uses the timezone in `config/app.php`, which is `'UTC'` by default. Set it to your own, for example `'timezone' => 'Asia/Kolkata'`, or the hours will be wrong.

## 🔗 Attach It to Routes

You can use the class name directly:

```php
// routes/web.php
use App\Http\Middleware\EnsureLibraryIsOpen;

Route::get('/borrow', [LoanController::class, 'create'])
    ->middleware(EnsureLibraryIsOpen::class);
```

Visit `/borrow` at 16:30. The browser shows:

```text
The library desk is closed. Please come back at 8:00.
```

Visit it at 10:00, and the controller runs as normal.

### Give it a short alias

Long class names are tiring to type. Register an **alias** (a short nickname) in `bootstrap/app.php`. Find the `withMiddleware` part and add this:

```php
// bootstrap/app.php
->withMiddleware(function (Middleware $middleware): void {
    $middleware->alias([
        'library.open' => \App\Http\Middleware\EnsureLibraryIsOpen::class,
    ]);
})
```

Now you can write `->middleware('library.open')`.

### Protect a whole group

Add middleware to a group, and every route inside gets it:

```php
Route::middleware('library.open')->group(function () {
    Route::get('/borrow', [LoanController::class, 'create'])->name('loans.create');
    Route::post('/borrow', [LoanController::class, 'store'])->name('loans.store');
});
```

You can join it with the prefix and name you learned in Chapter 6:

```php
Route::middleware('library.open')
    ->prefix('desk')
    ->name('desk.')
    ->group(function () {
        // routes...
    });
```

You can also list several middleware: `->middleware(['auth', 'library.open'])`. They run in the order you list them.

## ⚠️ Common Mistake

**Forgetting `return $next($request);`.**

```php
public function handle(Request $request, Closure $next): Response
{
    if (now()->hour < 8) {
        return response('Closed.', 403);
    }
    // forgot to pass the request on
}
```

What happens: during opening hours you get an error page, because `handle()` returned nothing instead of a `Response`. Always end with `return $next($request);`.

**Using an alias you never registered.** `->middleware('library-open')` (dash instead of dot) gives `Target class [library-open] does not exist.` Check the spelling in `bootstrap/app.php`.

## ✍️ Try It

Change `EnsureLibraryIsOpen` so the desk is also closed on Fridays. Test it by temporarily changing the condition.

*Hint:* `now()->isFriday()` returns `true` on Fridays.

## 📝 Recap

- Middleware runs before the controller and can stop a request.
- Built-in aliases include `auth`, `guest`, `verified` and `throttle`.
- `php artisan make:middleware Name` creates a class with a `handle()` method.
- Return a response to stop; `return $next($request);` to continue.
- Attach with `->middleware(...)` on a route or a group; add aliases in `bootstrap/app.php`.

## 🏆 Practice

### 🟢 Level 1: Recall
What does `return $next($request);` do in middleware?

<details>
<summary>Show answer</summary>

It passes the request on to the next middleware, or to the controller if this was the last one. Without it, the request never reaches the controller.

</details>

### 🟡 Level 2: Apply
Write a route group that applies the `library.open` middleware to `/borrow` and `/return`, both handled by `LoanController` (methods `create` and `returnForm`).

<details>
<summary>Show answer</summary>

```php
// routes/web.php
Route::middleware('library.open')->group(function () {
    Route::get('/borrow', [LoanController::class, 'create'])->name('loans.create');
    Route::get('/return', [LoanController::class, 'returnForm'])->name('loans.return');
});
```

</details>

### 🔴 Level 3: Challenge
During exam week, the library is for **quiet study only**, and borrowing stops.

1. Create middleware `EnsureNotExamWeek`.
2. Read a setting from `.env` with `env('EXAM_WEEK')`. (Strictly, Laravel prefers reading `.env` through a config file, but `env()` is fine for practice.)
3. If it is `true`, return `Borrowing is paused during exam week. Quiet study is welcome!` with code 403.
4. Give it the alias `not.exam` and add it to the borrowing group from Level 2.

<details>
<summary>Show one possible answer</summary>

```php
// app/Http/Middleware/EnsureNotExamWeek.php
public function handle(Request $request, Closure $next): Response
{
    if (env('EXAM_WEEK') === true) {
        return response('Borrowing is paused during exam week. Quiet study is welcome!', 403);
    }

    return $next($request);
}
```

```ini
# .env
EXAM_WEEK=true
```

```php
// bootstrap/app.php
$middleware->alias([
    'library.open' => \App\Http\Middleware\EnsureLibraryIsOpen::class,
    'not.exam' => \App\Http\Middleware\EnsureNotExamWeek::class,
]);
```

```php
// routes/web.php
Route::middleware(['library.open', 'not.exam'])->group(function () {
    // borrowing routes
});
```

Laravel's `env()` turns the text `true` into the PHP value `true`, so `=== true` works.

</details>
