# Chapter 4: Basic Routes

## 🌟 Real-Life Story

At the entrance of a big school there is a signboard. "Library: first floor, left. Science lab: second floor. Office: ground floor." Without it, visitors would wander around lost. In Laravel, **routes** are that signboard. Each route says, "If someone asks for this address, here is what to do."

## 🎯 What You Will Learn

- Explain what a route is and where routes are written.
- Write GET routes that return text, data and views.
- Use the shortcuts `Route::view()` and `Route::redirect()`.
- Name the main HTTP methods: GET, POST, PUT, PATCH and DELETE.
- Connect a route to a controller method.

## What is a Route?

A **route** links a URL to some code. When a browser visits a URL, Laravel looks through your routes from top to bottom. It runs the first route that matches.

All the routes for web pages live in **`routes/web.php`**.

```php
// routes/web.php
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
```

Read it like a sentence: "When the browser **gets** the address `/`, run this function." The function is a **closure**, which means a function with no name, written right where it is used.

## Basic GET Routes

A route can return plain text:

```php
// routes/web.php
Route::get('/hello', function () {
    return 'Welcome to the school library!';
});
```

Visit `http://127.0.0.1:8000/hello`. The browser shows:

```text
Welcome to the school library!
```

A route can return a PHP array. Laravel turns it into **JSON** (a text format for data) for you:

```php
Route::get('/status', function () {
    return ['library' => 'open', 'books' => 120];
});
```

Visit `/status`. The browser shows:

```text
{"library":"open","books":120}
```

## Returning a View

Most pages are HTML. A **view** is an HTML file in `resources/views/` whose name ends in `.blade.php`. (Blade is Laravel's template language. Chapter 10 teaches it.)

Create `resources/views/about.blade.php`:

```html
<!DOCTYPE html>
<html>
<head><title>About</title></head>
<body>
    <h1>About Our Library</h1>
    <p>We lend books to every student, free of charge.</p>
</body>
</html>
```

Add a route:

```php
// routes/web.php
Route::get('/about', function () {
    return view('about');
});
```

Notice you write `view('about')`, not `view('about.blade.php')`. Laravel adds the ending for you. Visit `/about`. The browser shows:

```text
About Our Library
We lend books to every student, free of charge.
```

### Two handy shortcuts

If a route only shows a view, use `Route::view()`:

```php
Route::view('/rules', 'rules');   // shows resources/views/rules.blade.php
```

If an old address should send visitors to a new one, use `Route::redirect()`:

```php
Route::redirect('/library-home', '/');
```

Visiting `/library-home` now jumps to `/`.

## HTTP Methods

Every request has a **method** that says what kind of action it is. You know GET and POST from HTML forms in PHP.

| Method | Meaning | Library example |
|--------|---------|-----------------|
| `GET` | Read a page | Show the book list |
| `POST` | Send new data | Add a new book |
| `PUT` / `PATCH` | Change data | Fix a book's title |
| `DELETE` | Remove data | Remove a lost book |

Laravel has a route function for each:

```php
Route::get('/books', ...);
Route::post('/books', ...);
Route::put('/books/1', ...);
Route::delete('/books/1', ...);
```

The same address can have different routes for different methods. A GET to `/books` and a POST to `/books` run different code. GET routes must never change data. Part 7 explains why.

## Route to a Controller

Closures are fine for tiny pages. Real pages use a **controller**, a class that groups related actions (Chapter 7). The route names the class and the method:

```php
// routes/web.php
use App\Http\Controllers\HomeController;

Route::get('/', [HomeController::class, 'index']);
Route::get('/about', [HomeController::class, 'about']);
```

`HomeController::class` gives the full class name, `App\Http\Controllers\HomeController`. The `use` line at the top lets you write the short name.

## See All Your Routes

Artisan can list every route:

```bash
php artisan route:list
```

Output (the dots stretch to fit your window, and Laravel may list a few of its own routes too):

```text
  GET|HEAD   / ............................
  GET|HEAD   about ........................
  GET|HEAD   hello ........................
  GET|HEAD   status .......................

                            Showing [4] routes
```

`HEAD` is a GET request that only asks for the page's headers. Laravel adds it to every GET route.

## ⚠️ Common Mistake

**Writing the file ending in `view()`.**

```php
return view('about.blade.php');   // wrong
```

What happens: Laravel shows an error page saying `View [about.blade.php] not found.` It reads each dot as a folder, so it looks for `about/blade/php.blade.php`.

```php
return view('about');             // right
```

**Forgetting the `use` line** for a controller gives `Target class [HomeController] does not exist.` Add `use App\Http\Controllers\HomeController;` at the top of `routes/web.php`.

## ✍️ Try It

Add three routes to your `library-app`: `/hello` returns a welcome sentence, `/status` returns an array with the opening hours, and `/about` shows a view. Visit each one.

*Hint:* the array could be `['opens' => '8:00', 'closes' => '15:00']`.

## 📝 Recap

- Routes live in `routes/web.php` and link a URL to code.
- `Route::get('/path', function () { ... })` answers GET requests.
- A route can return text, an array (sent as JSON) or `view('name')`.
- `Route::view()` and `Route::redirect()` are shortcuts.
- `php artisan route:list` shows every route.

## 🏆 Practice

### 🟢 Level 1: Recall
Which file holds the web routes? What does `view('about')` look for?

<details>
<summary>Show answer</summary>

`routes/web.php`. `view('about')` looks for the file `resources/views/about.blade.php`.

</details>

### 🟡 Level 2: Apply
Write a route for `/opening-hours` that returns the text `Open 8:00 to 15:00, Sunday to Thursday.` and a route `/timings` that redirects to `/opening-hours`.

<details>
<summary>Show answer</summary>

```php
// routes/web.php
Route::get('/opening-hours', function () {
    return 'Open 8:00 to 15:00, Sunday to Thursday.';
});

Route::redirect('/timings', '/opening-hours');
```

</details>

### 🔴 Level 3: Challenge
Build the library's simple pages.

1. Create views `home`, `about`, `rules` and `contact` in `resources/views/`.
2. Add a route for each page. Use `Route::view()` where you can.
3. Add a `/status` route that returns `['library' => 'open', 'members' => 85]`.
4. Run `php artisan route:list` and check you see all five.

<details>
<summary>Show one possible answer</summary>

```php
// routes/web.php
use Illuminate\Support\Facades\Route;

Route::view('/', 'home');
Route::view('/about', 'about');
Route::view('/rules', 'rules');
Route::view('/contact', 'contact');

Route::get('/status', function () {
    return ['library' => 'open', 'members' => 85];
});
```

Visiting `/status` shows `{"library":"open","members":85}`.

</details>
