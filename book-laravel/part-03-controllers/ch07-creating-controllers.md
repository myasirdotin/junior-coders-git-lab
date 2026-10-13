# Chapter 7: Creating Controllers

## 🌟 Real-Life Story

When the library was small, one teacher handled everything from her own desk. Now the library has hundreds of books and a whole school of members. So it has a proper **front desk** with trays: one for new books, one for returns, one for questions. Each request goes to the right tray. Routes written as closures are like the small desk. A **controller** is the proper front desk, with one method for each kind of job.

## 🎯 What You Will Learn

- Explain why we move code from route closures into controllers.
- Create a controller with `php artisan make:controller`.
- Write controller methods and connect routes to them.
- Pass data from a controller to a view and print it.
- Stop with a 404 page when something is not found, using `abort()`.

## Why Controllers?

In Part 2 you wrote code inside routes:

```php
Route::get('/books', function () {
    return 'All library books';
});
```

That is fine for five routes. A real app has fifty. If all the code sits in `routes/web.php`, the file becomes a long, messy list. A **controller** is a PHP class that groups the actions for one part of the app. `BookController` holds the book actions, and `MemberController` holds the member actions. The routes file stays short: it only says which method handles which URL.

## Make a Controller

Artisan writes the empty class for you:

```bash
php artisan make:controller BookController
```

Output (the path is the full path on your computer):

```text
   INFO  Controller [C:\xampp\htdocs\library-app\app\Http\Controllers\BookController.php] created successfully.
```

Open the new file:

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BookController extends Controller
{
    //
}
```

- `namespace` is the class's "address" inside the app (you met namespaces in PHP OOP).
- `extends Controller` means it inherits from Laravel's base `Controller` class.
- Controller names are singular and end in `Controller`: `BookController`, not `BooksController`.

## Add Methods

Each public method is an **action**. We have no database yet, so we keep a small sample list inside the class. Part 5 replaces it with real data.

```php
// app/Http/Controllers/BookController.php
class BookController extends Controller
{
    private array $books = [
        1 => ['title' => 'Clean Water for Every Village', 'author' => 'Aisha Rahman'],
        2 => ['title' => 'The Story of Numbers', 'author' => 'Yusuf Ali Khan'],
        3 => ['title' => 'Bees and Their Hives', 'author' => 'Maryam Siddiqui'],
    ];

    public function index()
    {
        return view('books.index', [
            'count' => count($this->books),
        ]);
    }

    public function show($id)
    {
        if (! isset($this->books[$id])) {
            abort(404);
        }

        return view('books.show', [
            'book' => $this->books[$id],
        ]);
    }
}
```

`abort(404)` stops the request and shows Laravel's "404 Not Found" page. Use it whenever a visitor asks for something that does not exist.

## Connect the Routes

```php
// routes/web.php
use App\Http\Controllers\BookController;

Route::get('/books', [BookController::class, 'index'])->name('books.index');
Route::get('/books/{id}', [BookController::class, 'show'])
    ->whereNumber('id')
    ->name('books.show');
```

The route parameter `{id}` arrives as the method's `$id`, just like with closures.

## Pass Data to a View

The second argument of `view()` is an array. Each **key** becomes a variable inside the view: the key `'book'` becomes `$book`.

Views can live in folders. `view('books.show')` means the file `resources/views/books/show.blade.php`. The dot stands for a folder.

Inside a view, `{{ $variable }}` prints a value safely. Chapter 10 explains it in detail.

```blade
{{-- resources/views/books/show.blade.php --}}
<h1>{{ $book['title'] }}</h1>
<p>Written by {{ $book['author'] }}</p>
<a href="{{ route('books.index') }}">Back to all books</a>
```

```blade
{{-- resources/views/books/index.blade.php --}}
<h1>Library Books</h1>
<p>We have {{ $count }} titles on the shelf.</p>
```

Visit `/books/2`. The browser shows:

```text
The Story of Numbers
Written by Yusuf Ali Khan
Back to all books
```

Visit `/books`. The browser shows:

```text
Library Books
We have 3 titles on the shelf.
```

Visit `/books/9`. You see the **404 Not Found** page.

### A shortcut: `compact()`

PHP's `compact()` builds the same array from variable names:

```php
$book = $this->books[$id];
return view('books.show', compact('book'));   // same as ['book' => $book]
```

## Single-Action Controllers

Some controllers do only one job, like showing opening hours. Make an **invokable** controller. It has one method called `__invoke`:

```bash
php artisan make:controller OpeningHoursController --invokable
```

```php
// app/Http/Controllers/OpeningHoursController.php
public function __invoke()
{
    return 'Open 8:00 to 15:00, Sunday to Thursday.';
}
```

```php
// routes/web.php
use App\Http\Controllers\OpeningHoursController;

Route::get('/hours', OpeningHoursController::class);
```

There is no method name in the route, because there is only one.

## ⚠️ Common Mistake

**Variable name in the view does not match the key.**

```php
return view('books.show', ['item' => $this->books[$id]]);
```

```blade
<h1>{{ $book['title'] }}</h1>
```

What happens: an error page with `Undefined variable $book`. The key was `item`, so the view only has `$item`. Make them match:

```php
return view('books.show', ['book' => $this->books[$id]]);
```

**Missing `use` line** in `routes/web.php` gives `Target class [BookController] does not exist.`

## ✍️ Try It

Create a `MemberController` with an `index` method that passes `'school' => 'Crescent Valley School'` to a view `members.index`. The view prints `Members of Crescent Valley School`.

*Hint:* the view file is `resources/views/members/index.blade.php`.

## 📝 Recap

- A controller is a class in `app/Http/Controllers` that groups related actions.
- `php artisan make:controller BookController` creates one.
- Routes point to methods: `[BookController::class, 'index']`.
- `view('books.show', ['book' => $book])` passes data; the key becomes `$book` in the view.
- `abort(404)` shows the "Not Found" page.

## 🏆 Practice

### 🟢 Level 1: Recall
Which file does `view('members.show')` load? Which Artisan command creates `MemberController`?

<details>
<summary>Show answer</summary>

`resources/views/members/show.blade.php`. The command is `php artisan make:controller MemberController`.

</details>

### 🟡 Level 2: Apply
Add a method `about` to `BookController` that returns the view `books.about` with a variable `$shelves` set to `12`. Write the route `/books/about`. Where must this route go in the file?

<details>
<summary>Show answer</summary>

```php
// app/Http/Controllers/BookController.php
public function about()
{
    return view('books.about', ['shelves' => 12]);
}
```

```php
// routes/web.php
Route::get('/books/about', [BookController::class, 'about'])->name('books.about');
```

Put it **above** `/books/{id}`. Our `{id}` route also has `whereNumber`, so `about` cannot match it anyway, but fixed routes first is a safe habit.

</details>

### 🔴 Level 3: Challenge
Build a `MemberController` with sample data.

1. Keep a private array of three members (name and grade), with keys 1, 2 and 3. Use names such as Bilal Ahmed, Zainab Hussain and Ibrahim Noor.
2. Add `index` (shows how many members) and `show` (shows one member, or 404).
3. Add named routes `members.index` and `members.show`.
4. In the `show` view, add a link back to the list using `route()`.

<details>
<summary>Show one possible answer</summary>

```php
// app/Http/Controllers/MemberController.php
class MemberController extends Controller
{
    private array $members = [
        1 => ['name' => 'Bilal Ahmed', 'grade' => 9],
        2 => ['name' => 'Zainab Hussain', 'grade' => 10],
        3 => ['name' => 'Ibrahim Noor', 'grade' => 9],
    ];

    public function index()
    {
        return view('members.index', ['count' => count($this->members)]);
    }

    public function show($id)
    {
        if (! isset($this->members[$id])) {
            abort(404);
        }
        return view('members.show', ['member' => $this->members[$id]]);
    }
}
```

```php
// routes/web.php
use App\Http\Controllers\MemberController;

Route::get('/members', [MemberController::class, 'index'])->name('members.index');
Route::get('/members/{id}', [MemberController::class, 'show'])
    ->whereNumber('id')->name('members.show');
```

```blade
{{-- resources/views/members/show.blade.php --}}
<h1>{{ $member['name'] }}</h1>
<p>Grade {{ $member['grade'] }}</p>
<a href="{{ route('members.index') }}">All members</a>
```

</details>
