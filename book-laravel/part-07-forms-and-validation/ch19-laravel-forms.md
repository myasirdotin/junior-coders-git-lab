# Chapter 19: Laravel Forms

## 🌟 Real-Life Story

When a family donates a book, the librarian hands them a **paper form**: title, author, number of copies. They fill it in and drop it in the tray at the desk. The librarian reads the form, adds the book to the register, and smiles: "Thank you, it has been added!" Web forms work the same way. The browser fills the tray (sends a request), the controller reads it, Eloquent saves it, and the page says thank you.

## 🎯 What You Will Learn

- Build an "Add a book" form that sends a POST request to `books.store`.
- Read the submitted data in the controller with `$request`.
- Save it with Eloquent, redirect, and show a **flash message**.
- Build an "Edit" form that sends PUT with `@method('PUT')`.
- Build a safe "Delete" button that sends DELETE.

## 🗺️ The Plan

We use the resource routes from Chapter 8:

```php
// routes/web.php
Route::resource('books', BookController::class);
```

| Step | Route | Method |
|------|-------|--------|
| Show the empty form | GET `/books/create` | `create` |
| Save the new book | POST `/books` | `store` |
| Show the filled form | GET `/books/{book}/edit` | `edit` |
| Save the changes | PUT `/books/{book}` | `update` |
| Delete the book | DELETE `/books/{book}` | `destroy` |

## ➕ The "Add a Book" Form

```php
// app/Http/Controllers/BookController.php
public function create()
{
    return view('books.create');
}
```

```blade
{{-- resources/views/books/create.blade.php --}}
@extends('layouts.app')

@section('title', 'Add a Book')

@section('content')
<h2>Add a Book</h2>

<form method="POST" action="{{ route('books.store') }}">
    @csrf

    <label for="title">Title</label>
    <input type="text" id="title" name="title">

    <label for="author">Author</label>
    <input type="text" id="author" name="author">

    <label for="isbn">ISBN</label>
    <input type="text" id="isbn" name="isbn">

    <label for="copies">Copies</label>
    <input type="number" id="copies" name="copies" value="1" min="0">

    <button type="submit">Save book</button>
</form>
@endsection
```

Three things to notice:

1. `method="POST"`: adding data is never a GET.
2. `action="{{ route('books.store') }}"`: use the route **name**, not a typed URL.
3. **`@csrf`**: every Laravel form needs this line. It adds a hidden security token. Without it, Laravel rejects the form with a "419 Page Expired" error. Chapter 21 explains why.

Each `<label for="...">` matches an input's `id`, so screen readers and taps on the label work.

## 📥 Read and Save in `store`

```php
// app/Http/Controllers/BookController.php
use App\Models\Book;
use Illuminate\Http\Request;

public function store(Request $request)
{
    $data = $request->only(['title', 'author', 'isbn', 'copies']);

    Book::create($data);

    return redirect()
        ->route('books.index')
        ->with('status', 'Thank you! The book has been added.');
}
```

- `Request $request` gives you everything the browser sent. Laravel fills it in automatically.
- `$request->input('title')` reads one field. `$request->only([...])` reads several as an array, and **ignores any other fields**. That works with `$fillable` to block sneaky extras.
- After saving, we **redirect**. If we showed a page straight away, pressing the browser's refresh button would send the form again and add the book twice. This pattern is called **Post/Redirect/Get**.

> ⚠️ This `store` saves whatever was typed, even an empty title. Chapter 20 adds **validation**. Never put a form online without it.

## 💬 Flash Messages

`->with('status', '...')` stores a message in the session for **one** page view only. This is called a **flash** message. Show it in your layout, so every page can use it:

```blade
{{-- resources/views/layouts/app.blade.php, above @yield('content') --}}
@if (session('status'))
    <div class="alert">{{ session('status') }}</div>
@endif
```

After saving, the book list shows:

```text
Thank you! The book has been added.
```

Refresh the page, and the message is gone, because flash messages last for one visit.

## ✏️ The Edit Form

```php
public function edit(Book $book)
{
    return view('books.edit', ['book' => $book]);
}
```

```blade
{{-- resources/views/books/edit.blade.php --}}
<h2>Edit: {{ $book->title }}</h2>

<form method="POST" action="{{ route('books.update', $book) }}">
    @csrf
    @method('PUT')

    <label for="title">Title</label>
    <input type="text" id="title" name="title" value="{{ $book->title }}">

    <label for="copies">Copies</label>
    <input type="number" id="copies" name="copies" value="{{ $book->copies }}" min="0">

    <button type="submit">Save changes</button>
</form>
```

- `route('books.update', $book)` builds `/books/3` from the book object.
- HTML forms can only send GET or POST. `@method('PUT')` adds a hidden field, `<input type="hidden" name="_method" value="PUT">`. Laravel reads it and treats the request as PUT, so it reaches `update`.
- `value="{{ $book->title }}"` fills in the current values, safely escaped.

```php
public function update(Request $request, Book $book)
{
    $book->update($request->only(['title', 'copies']));

    return redirect()
        ->route('books.show', $book)
        ->with('status', 'Book updated.');
}
```

## 🗑️ The Delete Button

Deleting changes data, so it must **not** be a link. Use a small form with `@method('DELETE')`:

```blade
<form method="POST" action="{{ route('books.destroy', $book) }}"
      onsubmit="return confirm('Remove this book from the library?');">
    @csrf
    @method('DELETE')
    <button type="submit">Delete</button>
</form>
```

```php
public function destroy(Book $book)
{
    $book->delete();

    return redirect()
        ->route('books.index')
        ->with('status', 'Book removed.');
}
```

`confirm()` shows an "Are you sure?" box in the browser. It is a kindness to the user, not a security check. The real protection is that only librarians may reach this route (Chapter 24).

## ⚠️ Common Mistake

**Forgetting `@csrf`.**

```blade
<form method="POST" action="{{ route('books.store') }}">
    <input type="text" name="title">
    <button>Save</button>
</form>
```

What happens: after pressing Save, Laravel shows **419 | Page Expired**. Add `@csrf` as the first line inside every POST form.

**Forgetting `@method('PUT')` in the edit form.** The browser sends POST to `/books/3`, but no POST route exists for that URL. With `APP_DEBUG=true`, Laravel shows `The POST method is not supported for route books/3. Supported methods: GET, HEAD, PUT, PATCH, DELETE.` (HTTP code 405). Add `@method('PUT')`.

## ✍️ Try It

Add the create, edit and delete forms to your library app. Add a book, change its copies, then delete it. Watch the flash messages and phpMyAdmin.

*Hint:* add links to the forms in your book list: `<a href="{{ route('books.create') }}">Add a book</a>` and `<a href="{{ route('books.edit', $book) }}">Edit</a>`.

## 📝 Recap

- Forms use `method="POST"`, `action="{{ route(...) }}"` and always `@csrf`.
- `Request $request` holds the submitted data; `$request->only([...])` takes just the fields you want.
- Save, then **redirect** with `->with('status', '...')` for a one-time flash message.
- `@method('PUT')` and `@method('DELETE')` let a POST form reach `update` and `destroy`.
- Deleting is always a form, never a link. Validation comes next, in Chapter 20.

## 🏆 Practice

### 🟢 Level 1: Recall
Why do we redirect after saving a form instead of showing a page straight away?

<details>
<summary>Show answer</summary>

So that refreshing the page does not send the form again. Without the redirect, a refresh would save the book a second time. This is the Post/Redirect/Get pattern.

</details>

### 🟡 Level 2: Apply
Fix this edit form. It has two problems.

```blade
<form method="PUT" action="/books/{{ $book->id }}">
    <input type="text" name="title" value="{{ $book->title }}">
    <button>Save</button>
</form>
```

<details>
<summary>Show answer</summary>

```blade
<form method="POST" action="{{ route('books.update', $book) }}">
    @csrf
    @method('PUT')
    <input type="text" name="title" value="{{ $book->title }}">
    <button>Save</button>
</form>
```

1. HTML forms cannot use `method="PUT"`; use POST plus `@method('PUT')`.
2. `@csrf` was missing. (Using `route()` instead of a typed URL is also better.)

</details>

### 🔴 Level 3: Challenge
Build a "New Member" form.

1. Fields: name, email (use `type="email"`), grade (a `<select>` with grades 6 to 10).
2. `MemberController@store` saves with `only()` and redirects to `members.index` with `Welcome to the library, NAME!`
3. Show the flash message in the layout.

<details>
<summary>Show one possible answer</summary>

```blade
{{-- resources/views/members/create.blade.php --}}
<form method="POST" action="{{ route('members.store') }}">
    @csrf
    <label for="name">Name</label>
    <input type="text" id="name" name="name">

    <label for="email">Email</label>
    <input type="email" id="email" name="email">

    <label for="grade">Grade</label>
    <select id="grade" name="grade">
        @for ($g = 6; $g <= 10; $g++)
            <option value="{{ $g }}">Grade {{ $g }}</option>
        @endfor
    </select>

    <button type="submit">Join the library</button>
</form>
```

```php
// app/Http/Controllers/MemberController.php
public function store(Request $request)
{
    $member = Member::create($request->only(['name', 'email', 'grade']));

    return redirect()
        ->route('members.index')
        ->with('status', "Welcome to the library, {$member->name}!");
}
```

The flash message is printed with `{{ session('status') }}`, so a name with HTML in it is shown safely as text.

</details>
