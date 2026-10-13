# Chapter 13: Models & Eloquent

## 🌟 Real-Life Story

In the old days, finding a book meant walking to the records room, opening a heavy register, and searching page by page. Then the school gave the librarian a helpful **assistant** who knows the register by heart. Now she just says, "Please bring me all science books, newest first," and the assistant does the searching. In Laravel, that assistant is **Eloquent**, and each **model** is the assistant in charge of one table.

## 🎯 What You Will Learn

- Explain what an **ORM** is and what a **model** does.
- Create a model with `php artisan make:model`.
- Know Laravel's naming rules: the `Book` model uses the `books` table.
- Read data with `all()`, `find()`, `findOrFail()`, `where()`, `orderBy()` and `count()`.
- Try queries in **Tinker** and show real rows in a view.

## What is Eloquent?

In the PHP book you wrote SQL by hand with PDO:

```php
$stmt = $pdo->prepare('SELECT * FROM books WHERE id = ?');
$stmt->execute([2]);
$book = $stmt->fetch();
```

**Eloquent** is Laravel's **ORM** (Object-Relational Mapper). An ORM lets you work with database rows as PHP **objects**. The same query becomes:

```php
$book = Book::find(2);
echo $book->title;
```

Eloquent writes the SQL for you and uses **prepared statements**, so values are sent safely. That protects you from SQL injection, as long as you use Eloquent's methods instead of gluing user input into raw SQL.

| Database | Eloquent |
|----------|----------|
| Table `books` | Model class `Book` |
| One row | One `Book` object |
| Column `title` | Property `$book->title` |

## Today the Table Already Exists

Part 6 teaches **migrations**, Laravel's way to create tables with PHP. For now, make the `books` table yourself with SQL, as you did in the MySQL book. Open phpMyAdmin, choose the `library_app` database, open the **SQL** tab and run:

```sql
CREATE TABLE books (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(20) NOT NULL UNIQUE,
    copies INT UNSIGNED NOT NULL DEFAULT 1,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);

INSERT INTO books (title, author, isbn, copies) VALUES
('Clean Water for Every Village', 'Aisha Rahman', '978-0-00-000001-1', 3),
('The Story of Numbers', 'Yusuf Ali Khan', '978-0-00-000002-8', 0),
('Bees and Their Hives', 'Maryam Siddiqui', '978-0-00-000003-5', 1),
('Stars Over the Desert', 'Hamza Qureshi', '978-0-00-000004-2', 2);
```

(These ISBNs are made-up practice numbers.) Notice the columns `created_at` and `updated_at`. Eloquent fills them in automatically when you save rows.

## Create the Model

```bash
php artisan make:model Book
```

Output:

```text
   INFO  Model [C:\xampp\htdocs\library-app\app\Models\Book.php] created successfully.
```

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    //
}
```

That empty class is already enough to read the table. How does it know which table? By **convention** (an agreed naming rule):

| Model (singular, CapitalCase) | Table (plural, lowercase) |
|------|------|
| `Book` | `books` |
| `Member` | `members` |
| `Loan` | `loans` |

Eloquent also expects a primary key called `id`. If your table had a different name, you could write `protected $table = 'library_books';` inside the class. Following the conventions is simpler.

## Try Queries in Tinker

**Tinker** is a PHP command line that already knows your Laravel app. Start it:

```bash
php artisan tinker
```

Type a query after the `>` prompt and press Enter. Results start with `=`:

```text
> Book::count()
[!] Aliasing 'Book' to 'App\Models\Book' for this Tinker session.
= 4

> Book::find(2)->title
= "The Story of Numbers"

> Book::where('copies', '>', 0)->count()
= 3

> Book::orderBy('title')->pluck('title')
= Illuminate\Support\Collection {#6214
    all: [
      "Bees and Their Hives",
      "Clean Water for Every Village",
      "Stars Over the Desert",
      "The Story of Numbers",
    ],
  }
```

(The `#6214` number is an internal id. Yours will differ.) Type `exit` to leave Tinker.

## The Most Useful Read Methods

| Code | What it gives |
|------|---------------|
| `Book::all()` | Every book, as a **collection** (a smart list) |
| `Book::find(2)` | The book with id 2, or `null` |
| `Book::findOrFail(2)` | The book with id 2, or a 404 page |
| `Book::where('author', 'Aisha Rahman')->get()` | All matching books |
| `Book::where('copies', '>', 0)->first()` | The first match, or `null` |
| `Book::orderBy('title')->get()` | All books sorted A to Z |
| `Book::count()` | The number of rows |

A query that starts with `where()` or `orderBy()` must end with `get()`, `first()` or `count()`. Those words actually run it.

## Real Data in the Controller

Replace the sample array from Part 4:

```php
// app/Http/Controllers/BookController.php
use App\Models\Book;

public function index()
{
    $books = Book::orderBy('title')->get();

    return view('books.index', ['books' => $books]);
}
```

In the view, use `->` because each book is now an object:

```blade
{{-- resources/views/books/index.blade.php --}}
@foreach ($books as $book)
    <p>{{ $book->title }} by {{ $book->author }} ({{ $book->copies }} on the shelf)</p>
@endforeach
```

Output:

```text
Bees and Their Hives by Maryam Siddiqui (1 on the shelf)
Clean Water for Every Village by Aisha Rahman (3 on the shelf)
Stars Over the Desert by Hamza Qureshi (2 on the shelf)
The Story of Numbers by Yusuf Ali Khan (0 on the shelf)
```

## Route Model Binding

For one book, Laravel can find it **for you**. Type-hint the model in the method, and give the route parameter the same name:

```php
// routes/web.php
Route::get('/books/{book}', [BookController::class, 'show'])->name('books.show');
```

```php
// app/Http/Controllers/BookController.php
public function show(Book $book)
{
    return view('books.show', ['book' => $book]);
}
```

Visiting `/books/3` gives the method the `Book` with id 3. Visiting `/books/99` shows a 404 page automatically. This is called **route model binding**. The resource routes from Chapter 8 already use `{book}`, so it fits them perfectly.

## ⚠️ Common Mistake

**Forgetting `get()`.**

```php
$books = Book::where('copies', '>', 0);   // no get()
```

What happens: `$books` is a **query builder**, a plan for a query that has not run yet. A `@foreach` over it shows nothing useful. Add `->get()`:

```php
$books = Book::where('copies', '>', 0)->get();
```

**Forgetting the `use` line in the controller.** Without `use App\Models\Book;` at the top, PHP looks for `Book` in the controller's own namespace, and you see `Class "App\Http\Controllers\Book" not found`. Add the `use` line.

## ✍️ Try It

Run the SQL above, create the `Book` model, and in Tinker find (a) how many books have no copies left, (b) the author of book 4.

*Hint:* `Book::where('copies', 0)->count()` and `Book::find(4)->author`.

## 📝 Recap

- Eloquent is Laravel's ORM: tables become model classes, rows become objects.
- `php artisan make:model Book` creates `app/Models/Book.php`, linked to the `books` table.
- Read with `all()`, `find()`, `findOrFail()`, `where()->get()`, `orderBy()`, `count()`.
- Tinker (`php artisan tinker`) lets you test queries quickly.
- Route model binding (`show(Book $book)` with `{book}`) finds the row or shows a 404.

## 🏆 Practice

### 🟢 Level 1: Recall
Which table does a model called `Member` use? What does `findOrFail(7)` do if there is no row 7?

<details>
<summary>Show answer</summary>

The `members` table. `findOrFail(7)` stops the request with a **404 Not Found** page.

</details>

### 🟡 Level 2: Apply
Write the Eloquent code for: all books by `Aisha Rahman`, sorted by title, and the number of books with more than 1 copy.

<details>
<summary>Show answer</summary>

```php
$books = Book::where('author', 'Aisha Rahman')->orderBy('title')->get();
$many = Book::where('copies', '>', 1)->count();
```

With the sample data, `$many` is `2` (3 copies and 2 copies).

</details>

### 🔴 Level 3: Challenge
Build an "Available Now" page.

1. Add a route `/books/available` named `books.available`, above `/books/{book}`.
2. In `BookController@available`, get books with at least one copy, sorted by title.
3. Show them in a view with `@forelse`, and the message `Everything is borrowed right now!` if none.
4. Show the total with `$books->count()`.

<details>
<summary>Show one possible answer</summary>

```php
// routes/web.php
Route::get('/books/available', [BookController::class, 'available'])->name('books.available');
Route::get('/books/{book}', [BookController::class, 'show'])->name('books.show');
```

```php
// app/Http/Controllers/BookController.php
public function available()
{
    $books = Book::where('copies', '>', 0)->orderBy('title')->get();
    return view('books.available', ['books' => $books]);
}
```

```blade
{{-- resources/views/books/available.blade.php --}}
<h2>Available Now ({{ $books->count() }})</h2>
@forelse ($books as $book)
    <p>{{ $book->title }}</p>
@empty
    <p>Everything is borrowed right now!</p>
@endforelse
```

With the sample data the heading is `Available Now (3)`.

</details>
