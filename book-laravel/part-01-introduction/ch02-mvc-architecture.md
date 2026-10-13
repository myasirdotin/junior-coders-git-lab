# Chapter 2: MVC Architecture

## 🌟 Real-Life Story

Think about how your school library works. A student walks up to the **front desk** and asks for a book. The librarian at the desk does not hold every book in her hands. She checks the **shelves and records**, finds the book, and hands it over with a neat **issue slip**. Three jobs, three places: the desk decides, the shelves store, the slip shows. Laravel organises every web app in the same way. We call it **MVC**.

## 🎯 What You Will Learn

- Name the three parts of MVC: Model, View and Controller.
- Describe what each part does in the school library app.
- Follow one request on its journey: route → controller → model → view.
- Find where each part lives in a Laravel project.

## The Three Parts of MVC

**MVC** stands for **Model, View, Controller**. It is a way to split an app into three parts, each with one job.

| Part | Job | In the library |
|------|-----|----------------|
| **Model** | Talks to the database | The shelves and record book |
| **View** | Shows HTML to the user | The issue slip or notice board |
| **Controller** | Decides what to do | The librarian at the desk |

Laravel adds one more piece: the **route**. A route is like the signboard at the library door. It says, "Questions about books? Go to the books desk."

## The Request Journey

When someone visits a page, a **request** travels through your app. A request is the message a browser sends to a server, such as "please give me `/books`". The server sends back a **response**, usually an HTML page.

```text
Browser asks for /books
        |
        v
+----------------+
| Route          |  routes/web.php
+----------------+
        |
        v
+----------------+
| Controller     |  BookController
+----------------+
     |      ^
     v      | books
+----------------+
| Model          |  Book (books table)
+----------------+
        |
        v
+----------------+
| View           |  books/index.blade.php
+----------------+
        |
        v
Browser shows the HTML page
```

1. The **route** matches the address `/books` and calls a controller method.
2. The **controller** asks the **model** for the books.
3. The **model** runs a database query and gives the books back.
4. The controller passes the books to a **view**.
5. The view turns them into HTML, and the browser shows it.

## Where Each Part Lives

Here is a sneak peek at the real files. You will write each one properly in later chapters, so do not worry about every word yet. Just notice where each file lives.

**The route** (Chapter 4):

```php
// routes/web.php
use App\Http\Controllers\BookController;

Route::get('/books', [BookController::class, 'index']);
```

**The controller** (Chapter 7):

```php
// app/Http/Controllers/BookController.php
public function index()
{
    $books = Book::all();                            // ask the model
    return view('books.index', ['books' => $books]); // hand to the view
}
```

**The model** (Chapter 13):

```php
// app/Models/Book.php
class Book extends Model
{
    // Laravel links this class to the "books" table.
}
```

**The view** (Chapter 10):

```blade
{{-- resources/views/books/index.blade.php --}}
<h1>Library Books</h1>
@foreach ($books as $book)
    <p>{{ $book->title }}</p>
@endforeach
```

If the `books` table holds two books, the browser shows:

```text
Library Books
Clean Water for Every Village
The Story of Numbers
```

## Why Split the Work?

In plain PHP, one file often does everything. It connects to MySQL, runs SQL, loops through rows and prints HTML. That works for a tiny page. As the app grows, the file becomes long and hard to fix.

MVC helps in three ways:

- **Easy to find things.** A wrong colour? Look in the view. Wrong data? Look in the model or controller.
- **Easy to share work.** One student designs views while another writes controllers.
- **Easy to reuse.** The same `Book` model serves the book list, the search page and the loan form.

## 🕵️ Code Detective

Which part of the app should do each job?

| Job | Part |
|-----|------|
| Save a new loan in the `loans` table | Model |
| Decide to show the "Book returned" message | Controller |
| Draw the table of books with HTML | View |
| Send `/members` to the members controller | Route |

## ⚠️ Common Mistake

**Putting database work inside the view.**

```blade
{{-- resources/views/books/index.blade.php (wrong) --}}
@php
    $books = \App\Models\Book::all();
@endphp
```

It runs, but now the view does the controller's job. Later, when you want only the books that are on the shelf, you must dig through HTML to change it. Keep the view for showing data. Fetch the data in the controller:

```php
// app/Http/Controllers/BookController.php (right)
$books = Book::all();
return view('books.index', ['books' => $books]);
```

## ✍️ Try It

On paper, draw the journey of a request for `/members`. Label the route, the controller (`MemberController`), the model (`Member`) and the view (`members/index.blade.php`).

*Hint:* copy the journey diagram above and change each name.

## 📝 Recap

- MVC splits an app into Model (data), View (HTML) and Controller (decisions).
- In Laravel a **route** sends each address to a controller method.
- The journey is always: route → controller → model → view.
- Routes live in `routes/web.php`, controllers in `app/Http/Controllers`, models in `app/Models`, views in `resources/views`.

## 🏆 Practice

### 🟢 Level 1: Recall
What do the letters M, V and C stand for, and what is the job of each?

<details>
<summary>Show answer</summary>

- **Model**: talks to the database (reads and saves data).
- **View**: shows the HTML page.
- **Controller**: receives the request, asks the model, and picks the view.

</details>

### 🟡 Level 2: Apply
A member opens `/members/7`. Put these steps in the right order: (a) the view prints the member's name, (b) the route matches `/members/7`, (c) the model finds member 7 in the database, (d) the controller method `show` runs.

<details>
<summary>Show answer</summary>

**b → d → c → a.** Route, then controller, then model, then view.

</details>

### 🔴 Level 3: Challenge
The library wants a page that lists **overdue loans**: books not returned by their due date.

1. Name the route address you would use.
2. Name the controller and method.
3. Say which model the controller asks.
4. Name the view file.

<details>
<summary>Show one possible answer</summary>

1. `/loans/overdue`
2. `LoanController`, method `overdue`
3. The `Loan` model. It finds loans whose due date has passed and that have no return date.
4. `resources/views/loans/overdue.blade.php`

</details>
