# Chapter 20: Validation Rules

## 🌟 Real-Life Story

A careful librarian never adds a donation form to the register without checking it first. Is the title filled in? Is the number of copies a real number, not "lots"? Is this ISBN already in our register? If something is wrong, she hands the form back with a kind note: "Please fill in the author." She does not make you write everything again; she circles only the problem. Laravel **validation** does exactly this for your forms.

## 🎯 What You Will Learn

- Check form input with `$request->validate([...])`.
- Use common rules: `required`, `string`, `max`, `integer`, `min`, `email`, `unique`, `exists`, `date`.
- Show error messages with `@error` and `$errors`.
- Keep what the user typed with `old()`.
- Allow a record's own value in `unique` when updating.

## Why Validate on the Server?

You can add `required` to an HTML input, and the browser will check it. That is helpful, but it is **not** protection. Anyone can switch off browser checks or send a request without a browser. **The server must always check.** Validation is part of the trust (*amānah*) of keeping the library's records correct.

## `$request->validate()`

Replace `$request->only(...)` in `store` from Chapter 19:

```php
// app/Http/Controllers/BookController.php
public function store(Request $request)
{
    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'author' => 'required|string|max:255',
        'isbn' => 'required|string|max:20|unique:books,isbn',
        'copies' => 'required|integer|min:0',
    ]);

    Book::create($validated);

    return redirect()
        ->route('books.index')
        ->with('status', 'Thank you! The book has been added.');
}
```

How it works:

```text
Form sent
    |
    v
validate() checks every rule
    |
    +-- all pass --> returns clean data
    |                -> create() -> redirect
    |
    +-- any fail --> goes BACK to the form
                     with errors + old input
```

- If every rule passes, `validate()` returns an array of **only the validated fields**. Extra fields are dropped.
- If any rule fails, Laravel **stops** the method, sends the user back to the form, and stores the error messages and the typed values for one page view.

Rules are joined with `|`. You can also write them as an array: `'title' => ['required', 'string', 'max:255']`.

## Common Rules

| Rule | Passes when the value… |
|------|-------------------------|
| `required` | is present and not empty |
| `string` | is text |
| `max:255` | is at most 255 characters (or at most 255 for numbers) |
| `min:0` | is at least 0 (for numbers) or 0 characters |
| `integer` | is a whole number |
| `email` | looks like an email address |
| `date` | is a valid date |
| `after_or_equal:today` | is today or later |
| `unique:books,isbn` | is not already in the `isbn` column of `books` |
| `exists:members,id` | **is** in the `id` column of `members` |
| `nullable` | may be empty (other rules then skip it) |

## Showing Errors

Laravel puts the messages in a variable called `$errors`, which every view has. Show them next to each field with `@error`:

```blade
{{-- resources/views/books/create.blade.php --}}
<form method="POST" action="{{ route('books.store') }}">
    @csrf

    <label for="title">Title</label>
    <input type="text" id="title" name="title" value="{{ old('title') }}">
    @error('title')
        <p class="error">{{ $message }}</p>
    @enderror

    <label for="copies">Copies</label>
    <input type="number" id="copies" name="copies" value="{{ old('copies', 1) }}">
    @error('copies')
        <p class="error">{{ $message }}</p>
    @enderror

    {{-- author and isbn fields follow the same pattern --}}

    <button type="submit">Save book</button>
</form>
```

- `@error('title') ... @enderror` runs only if `title` has an error. Inside, `$message` holds the text.
- `old('title')` puts back what the user typed, so they do not have to type it again. `old('copies', 1)` uses `1` when there is no old value.

Suppose a student leaves the title empty, types `-2` for copies, and enters an ISBN that already exists. The form comes back showing:

```text
The title field is required.
The copies field must be at least 0.
The isbn has already been taken.
```

### All errors at the top

To list every error in one box, use `$errors->any()` and `$errors->all()`:

```blade
@if ($errors->any())
    <div class="error-box">
        <p>Please fix these:</p>
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif
```

## Friendlier Messages

Pass your own messages as a second array. The key is `field.rule`:

```php
$validated = $request->validate([
    'title' => 'required|string|max:255',
    'isbn' => 'required|string|max:20|unique:books,isbn',
], [
    'title.required' => 'Please write the book title.',
    'isbn.unique' => 'This ISBN is already in our library.',
]);
```

Now an empty title shows `Please write the book title.`

## Updating: Unique, but Not Against Itself

When you edit book 3 and keep its ISBN, `unique:books,isbn` fails, because book 3 itself already has that ISBN. Tell the rule to **ignore** the book being edited:

```php
use Illuminate\Validation\Rule;

public function update(Request $request, Book $book)
{
    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'isbn' => ['required', 'string', 'max:20', Rule::unique('books', 'isbn')->ignore($book)],
        'copies' => 'required|integer|min:0',
    ]);

    $book->update($validated);

    return redirect()->route('books.show', $book)->with('status', 'Book updated.');
}
```

In the edit form, use `old()` with the current value as the default:

```blade
<input type="text" id="title" name="title" value="{{ old('title', $book->title) }}">
```

## Validating a Loan

```php
// app/Http/Controllers/LoanController.php
$validated = $request->validate([
    'book_id' => 'required|exists:books,id',
    'member_id' => 'required|exists:members,id',
    'due_on' => 'required|date|after_or_equal:today',
]);
```

`exists` makes sure nobody borrows a book or uses a member number that is not in the database. If someone picks yesterday as the due date, they see:

```text
The due on field must be a date after or equal to today.
```

Laravel turns `due_on` into `due on` for messages.

## Bigger Forms: Form Requests

When rules grow long, move them out of the controller into a **Form Request** class:

```bash
php artisan make:request StoreBookRequest
```

Put the rules in its `rules()` method, return `true` from its `authorize()` method for now, and type-hint it: `public function store(StoreBookRequest $request)`. Then `$request->validated()` gives the clean data. It works the same way, just tidier.

## ⚠️ Common Mistake

**Saving `$request->all()` instead of the validated data.**

```php
$request->validate([...]);
Book::create($request->all());   // wrong
```

What happens: every field the browser sent is passed to `create()`, including extra ones you never checked. `$fillable` catches some, but it is easy to slip. Save what `validate()` returned:

```php
$validated = $request->validate([...]);
Book::create($validated);         // right
```

**Missing `old()`.** The form comes back with errors, and every field is empty. Users must type everything again. Add `value="{{ old('field') }}"` to every input.

## ✍️ Try It

Add validation to your book `store` and `update` methods. Then try to save an empty form, a negative number of copies and a duplicate ISBN. Check each message appears next to the right field.

*Hint:* one book from your seeder has ISBN `978-0-00-000001-1`.

## 📝 Recap

- Always validate on the server with `$validated = $request->validate([...])`.
- If a rule fails, Laravel goes back to the form with `$errors` and the old input.
- Show messages with `@error('field') {{ $message }} @enderror`; refill fields with `old()`.
- `unique` and `exists` check the database; use `Rule::unique(...)->ignore($book)` when updating.
- Save only the validated data.

## 🏆 Practice

### 🟢 Level 1: Recall
What does `$request->validate()` do when a rule fails, and what does it return when all rules pass?

<details>
<summary>Show answer</summary>

When a rule fails, it stops the method and sends the user back to the form with error messages and their old input. When all rules pass, it returns an array with only the validated fields.

</details>

### 🟡 Level 2: Apply
Write rules for a new member: name required, at most 100 characters; email required, a valid email, not already used in `members`; grade required, a whole number from 6 to 10.

<details>
<summary>Show answer</summary>

```php
$validated = $request->validate([
    'name' => 'required|string|max:100',
    'email' => 'required|email|unique:members,email',
    'grade' => 'required|integer|min:6|max:10',
]);
```

(`between:6,10` would also work for the grade.)

</details>

### 🔴 Level 3: Challenge
Build the "Borrow a book" form with full validation.

1. The form has a `<select>` of members and a `<select>` of books with copies left, plus a due date.
2. Validate with `exists` and `after_or_equal:today`.
3. After saving the loan with `borrowed_on` set to today, decrease the book's copies by one.
4. Show `old()` values so a mistake does not reset the choices.

<details>
<summary>Show one possible answer</summary>

```php
// app/Http/Controllers/LoanController.php
public function create()
{
    return view('loans.create', [
        'members' => Member::orderBy('name')->get(),
        'books' => Book::where('copies', '>', 0)->orderBy('title')->get(),
    ]);
}

public function store(Request $request)
{
    $validated = $request->validate([
        'member_id' => 'required|exists:members,id',
        'book_id' => 'required|exists:books,id',
        'due_on' => 'required|date|after_or_equal:today',
    ]);

    $validated['borrowed_on'] = today();
    $loan = Loan::create($validated);
    $loan->book->decrement('copies');

    return redirect()->route('loans.index')->with('status', 'Happy reading!');
}
```

```blade
{{-- resources/views/loans/create.blade.php --}}
<form method="POST" action="{{ route('loans.store') }}">
    @csrf
    <label for="member_id">Member</label>
    <select id="member_id" name="member_id">
        @foreach ($members as $member)
            <option value="{{ $member->id }}" @selected(old('member_id') == $member->id)>
                {{ $member->name }}
            </option>
        @endforeach
    </select>
    @error('member_id') <p class="error">{{ $message }}</p> @enderror

    {{-- the book select follows the same pattern --}}

    <label for="due_on">Due on</label>
    <input type="date" id="due_on" name="due_on" value="{{ old('due_on') }}">
    @error('due_on') <p class="error">{{ $message }}</p> @enderror

    <button type="submit">Borrow</button>
</form>
```

`@selected(...)` adds `selected` to the option when the condition is true. A stronger version would also check that the book still has a copy left at the moment of saving.

</details>
