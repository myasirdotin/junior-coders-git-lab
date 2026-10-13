# Chapter 8: Resource Controllers

## 🌟 Real-Life Story

Every library in the world does the same few things with its books. It shows the list of books. It adds a new book. It shows one book's details. It fixes a book's record. It removes a lost book. Because these jobs are always the same, librarians use the same forms for them everywhere. Laravel noticed this too. A **resource controller** gives you all these standard jobs in one go, with standard names.

## 🎯 What You Will Learn

- Explain the idea of **CRUD**: Create, Read, Update, Delete.
- Create a resource controller with `--resource`.
- Register all seven routes with one line: `Route::resource()`.
- Read the table of the seven actions, their URLs and route names.
- Keep only the actions you need with `only()` and `except()`.

## 🔄 CRUD: The Four Jobs

Almost every part of a data app does four things. Together they are called **CRUD**:

| Letter | Job | Library example |
|--------|-----|-----------------|
| **C** | Create | Add a new book |
| **R** | Read | List books, view one book |
| **U** | Update | Fix a misspelled author |
| **D** | Delete | Remove a book that was lost |

Books need CRUD. Members need CRUD. Loans need CRUD. Writing every route and method by hand would be slow and easy to get wrong.

## 🛠️ Make a Resource Controller

Add `--resource` to the Artisan command. (If you already made `BookController` in Chapter 7, delete that file first, or use a new name to practise.)

```bash
php artisan make:controller BookController --resource
```

Output:

```text
   INFO  Controller [C:\xampp\htdocs\library-app\app\Http\Controllers\BookController.php] created successfully.
```

The new file already has seven empty methods (comments shortened here):

```php
class BookController extends Controller
{
    public function index() { }                                  // list all
    public function create() { }                                 // show "add" form
    public function store(Request $request) { }                  // save new
    public function show(string $id) { }                         // show one
    public function edit(string $id) { }                         // show "edit" form
    public function update(Request $request, string $id) { }     // save changes
    public function destroy(string $id) { }                      // delete
}
```

`Request $request` gives the method the submitted form data. You will use it in Part 7.

## 🔗 One Line, Seven Routes

```php
// routes/web.php
use App\Http\Controllers\BookController;

Route::resource('books', BookController::class);
```

That one line creates all of these:

| Method | URL | Action | Route name |
|--------|-----|--------|------------|
| GET | `/books` | `index` | `books.index` |
| GET | `/books/create` | `create` | `books.create` |
| POST | `/books` | `store` | `books.store` |
| GET | `/books/{book}` | `show` | `books.show` |
| GET | `/books/{book}/edit` | `edit` | `books.edit` |
| PUT/PATCH | `/books/{book}` | `update` | `books.update` |
| DELETE | `/books/{book}` | `destroy` | `books.destroy` |

Notice three things:

1. The parameter is called `{book}`, the singular of `books`.
2. `create` and `edit` only **show forms**. `store` and `update` **save** what the forms send.
3. The same URL `/books/{book}` does three jobs, decided by the HTTP method: GET shows, PUT updates, DELETE removes.

Check it with Artisan:

```bash
php artisan route:list --name=books
```

Output (spacing depends on your window):

```text
  GET|HEAD   books ......... books.index › BookController@index
  POST       books ......... books.store › BookController@store
  GET|HEAD   books/create  books.create › BookController@create
  GET|HEAD   books/{book} .... books.show › BookController@show
  PUT|PATCH  books/{book}  books.update › BookController@update
  DELETE     books/{book}  books.destroy › BookController@destroy
  GET|HEAD   books/{book}/edit . books.edit › BookController@edit

                            Showing [7] routes
```

## ✏️ Fill In Two Methods

We still have no database, so return simple text to test the routes:

```php
// app/Http/Controllers/BookController.php
public function index()
{
    return 'List of all books';
}

public function show(string $id)
{
    return "Details of book $id";
}
```

Visit `/books/3`. The browser shows:

```text
Details of book 3
```

## ✂️ Only the Actions You Need

The library has no page to edit members' loan history, and loans are never deleted (they are records). Keep only what you need:

```php
Route::resource('loans', LoanController::class)->only(['index', 'create', 'store', 'show']);
```

Or list the ones to leave out:

```php
Route::resource('members', MemberController::class)->except(['destroy']);
```

Use **only** when you need a few actions, and **except** when you need most of them.

### Add a model hint

When you have models (Part 5), add `--model=Book`. Then the methods receive a `Book` object instead of a plain `$id`:

```bash
php artisan make:controller BookController --resource --model=Book
```

You will use this in Chapter 14.

## 🌐 But Forms Only Send GET and POST

An HTML form can only use `method="GET"` or `method="POST"`. So how does a browser send PUT or DELETE? Laravel's answer is a hidden field written with `@method('PUT')` or `@method('DELETE')` inside a POST form. Chapter 19 shows it step by step.

## ⚠️ Common Mistake

**Adding a custom route below the resource.**

```php
Route::resource('books', BookController::class);
Route::get('/books/popular', [BookController::class, 'popular']);   // never reached
```

What happens: visiting `/books/popular` runs `show` with `$id = 'popular'`, because `/books/{book}` matched first. Put extra routes **above** the resource line:

```php
Route::get('/books/popular', [BookController::class, 'popular'])->name('books.popular');
Route::resource('books', BookController::class);
```

**Plural controller URLs, singular controller names.** It is `Route::resource('books', BookController::class)`, not `'book'` and not `BooksController`.

## ✍️ Try It

Create `MemberController` with `--resource`, register it with `Route::resource('members', ...)` but without `destroy`, and run `php artisan route:list --name=members`. Count the routes.

*Hint:* you should see six routes.

## 📝 Recap

- CRUD means Create, Read, Update, Delete.
- `php artisan make:controller BookController --resource` writes the seven CRUD methods.
- `Route::resource('books', BookController::class)` registers all seven routes with standard names.
- `create`/`edit` show forms; `store`/`update` save them; `destroy` deletes.
- `->only([...])` and `->except([...])` trim the list.

## 🏆 Practice

### 🟢 Level 1: Recall
Name the seven resource actions in order, and say which two only show forms.

<details>
<summary>Show answer</summary>

`index`, `create`, `store`, `show`, `edit`, `update`, `destroy`. The two that only show forms are `create` and `edit`.

</details>

### 🟡 Level 2: Apply
Fill the table for `Route::resource('members', MemberController::class)`: what are the method and URL for `members.update` and `members.create`?

<details>
<summary>Show answer</summary>

- `members.update`: PUT or PATCH to `/members/{member}`
- `members.create`: GET to `/members/create`

</details>

### 🔴 Level 3: Challenge
Plan the loan routes.

1. Loans can be listed, created and shown, but not edited or deleted.
2. There is also a page `/loans/overdue` handled by `LoanController@overdue`, named `loans.overdue`.
3. Write the routes in the right order.
4. Write how many routes `php artisan route:list --name=loans` should show.

<details>
<summary>Show one possible answer</summary>

```php
// routes/web.php
use App\Http\Controllers\LoanController;

Route::get('/loans/overdue', [LoanController::class, 'overdue'])->name('loans.overdue');
Route::resource('loans', LoanController::class)->only(['index', 'create', 'store', 'show']);
```

It shows **5** routes: `loans.overdue`, `loans.index`, `loans.create`, `loans.store` and `loans.show`.

</details>
