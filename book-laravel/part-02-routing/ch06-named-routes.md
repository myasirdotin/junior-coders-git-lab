# Chapter 6: Named Routes

## 🌟 Real-Life Story

Your school library moves from the first floor to a new building. If every poster in school says "Library: Room 104", someone must find and fix every single poster. But if the posters just say "Library", and only the front office map shows the room number, you change one map and you are done. **Named routes** are like that. Your pages say "the books page", and only one line says where it lives.

## 🎯 What You Will Learn

- Give a route a name with `->name()`.
- Build URLs from route names with the `route()` helper.
- Pass parameters to a named route.
- Redirect to a named route.
- Group routes that share a URL prefix and a name prefix.

## Naming a Route

Add `->name('...')` to the end of a route:

```php
// routes/web.php
Route::get('/books', function () {
    return 'All library books';
})->name('books.index');

Route::get('/books/{id}', function ($id) {
    return "Book $id";
})->name('books.show');
```

Names usually use dots: **thing.action**. So `books.index` means "the list of books" and `books.show` means "one book". Chapter 8 uses exactly these names, so it is a good habit to start now.

## Making URLs with `route()`

The `route()` helper turns a name into a full URL:

```php
Route::get('/test-links', function () {
    return route('books.index');
});
```

Visit `/test-links` while `php artisan serve` is running. The browser shows:

```text
http://127.0.0.1:8000/books
```

### Passing parameters

If the route has a parameter, give its value as the second argument. Use an array with the parameter's name:

```php
return route('books.show', ['id' => 42]);
```

Output:

```text
http://127.0.0.1:8000/books/42
```

If the route has only one parameter, you can pass just the value: `route('books.show', 42)` gives the same URL.

### In a view

Inside a Blade view, `{{ ... }}` prints a PHP value (Chapter 10 explains it fully). Use it to build links:

```blade
<a href="{{ route('books.index') }}">All books</a>
<a href="{{ route('books.show', ['id' => 42]) }}">Book 42</a>
```

The browser receives:

```html
<a href="http://127.0.0.1:8000/books">All books</a>
<a href="http://127.0.0.1:8000/books/42">Book 42</a>
```

## Why Names Beat Typed URLs

Suppose the library decides that `/books` should become `/catalogue`. You change one line:

```php
Route::get('/catalogue', function () {
    return 'All library books';
})->name('books.index');
```

Every `route('books.index')` in your app now gives `http://127.0.0.1:8000/catalogue`. No link breaks. If you had typed `href="/books"` in twenty views, you would need to find and fix all twenty.

## Redirecting to a Named Route

After an action, you often send the visitor to another page. Use `redirect()->route()`:

```php
Route::get('/old-catalogue', function () {
    return redirect()->route('books.index');
});
```

Visiting `/old-catalogue` jumps to `/books`. Later, after saving a new book, you will write `return redirect()->route('books.index');` many times.

## Route Groups

Librarian pages often share the same start, like `/librarian/...`. A **route group** lets you write the shared parts once:

```php
Route::prefix('librarian')->name('librarian.')->group(function () {
    Route::get('/reports', function () {
        return 'Monthly reports';
    })->name('reports');

    Route::get('/overdue', function () {
        return 'Overdue books';
    })->name('overdue');
});
```

| Name | URL |
|------|-----|
| `librarian.reports` | `/librarian/reports` |
| `librarian.overdue` | `/librarian/overdue` |

`prefix()` adds to the URL. `name()` adds to the start of each name. Notice the dot at the end of `'librarian.'`. Chapter 9 adds a third shared part to groups: middleware.

## Check Names with `route:list`

```bash
php artisan route:list --name=books
```

Output (spacing depends on your window):

```text
  GET|HEAD   books ................ books.index
  GET|HEAD   books/{id} ........... books.show

                            Showing [2] routes
```

The name appears on the right. The `--name` option shows only routes whose name contains `books`.

## ⚠️ Common Mistake

**Using a name that does not exist.**

```php
return route('book.index');   // typo: "book", not "books"
```

What happens: Laravel shows an error page: `Route [book.index] not defined.` Check the exact name with `php artisan route:list`.

**Forgetting a required parameter.**

```php
return route('books.show');   // which book?
```

What happens: `Missing required parameter for [Route: books.show] [URI: books/{id}] [Missing parameter: id].` Pass the value: `route('books.show', ['id' => 42])`.

## ✍️ Try It

Name your `/about` and `/rules` routes `about` and `rules`. Then add a route `/links` that returns both URLs joined with a space.

*Hint:* `return route('about') . ' ' . route('rules');`

## 📝 Recap

- `->name('books.index')` gives a route a name.
- `route('name')` builds the URL; pass parameters as a second argument.
- `redirect()->route('name')` sends the visitor to a named route.
- Names keep links working when URLs change.
- `Route::prefix()->name()->group()` shares a URL start and name start.

## 🏆 Practice

### 🟢 Level 1: Recall
What does `route('books.show', ['id' => 5])` return while `php artisan serve` is running, if the route is `/books/{id}`?

<details>
<summary>Show answer</summary>

`http://127.0.0.1:8000/books/5`

</details>

### 🟡 Level 2: Apply
Write a route `/members/{id}` named `members.show`, and a Blade link to member 12.

<details>
<summary>Show answer</summary>

```php
// routes/web.php
Route::get('/members/{id}', function ($id) {
    return "Member $id";
})->whereNumber('id')->name('members.show');
```

```blade
<a href="{{ route('members.show', ['id' => 12]) }}">Member 12</a>
```

</details>

### 🔴 Level 3: Challenge
Build the librarian area with a group.

1. Use the prefix `librarian` and the name prefix `librarian.`.
2. Add `/dashboard` (named `librarian.dashboard`) and `/returns` (named `librarian.returns`).
3. Add a route `/staff` outside the group that redirects to the librarian dashboard by name.
4. Change the prefix to `staff-area`. What happens to `/staff`?

<details>
<summary>Show one possible answer</summary>

```php
// routes/web.php
Route::prefix('librarian')->name('librarian.')->group(function () {
    Route::get('/dashboard', function () {
        return 'Librarian dashboard';
    })->name('dashboard');

    Route::get('/returns', function () {
        return 'Books returned today';
    })->name('returns');
});

Route::get('/staff', function () {
    return redirect()->route('librarian.dashboard');
});
```

4. After the change, `/staff` redirects to `/staff-area/dashboard`. You did not touch the redirect, because it uses the name.

</details>
