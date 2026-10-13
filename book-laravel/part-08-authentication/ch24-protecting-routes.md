# Chapter 24: Protecting Routes

## 🌟 Real-Life Story

The school library has three kinds of spaces. The **reading hall** is open to every visitor. The **borrowing desk** needs a library card. The **records room**, where the register is kept, is only for librarians. Nobody would put the register in the reading hall. Your app needs the same three levels: pages for everyone, pages for logged-in users, and pages for librarians only.

## 🎯 What You Will Learn

- Protect routes and groups with the `auth` middleware.
- Explain what happens to a guest who opens a protected page.
- Split a resource into public and protected actions, in the right order.
- Give librarians extra rights with a **Gate** and `->can()`.
- Show or hide buttons in Blade with `@can`.

## Logged-in Users Only

The `auth` middleware (Chapter 9) lets a request through only if someone is logged in:

```php
// routes/web.php
Route::get('/my-loans', [LoanController::class, 'mine'])
    ->middleware('auth')
    ->name('loans.mine');
```

When a **guest** opens `/my-loans`:

1. `auth` sees nobody is logged in.
2. It remembers the page they wanted.
3. It redirects them to the route named `login` (Chapter 23).
4. After they log in, `redirect()->intended(...)` sends them back to `/my-loans`.

```text
Guest -> /my-loans
           |
       auth: who are you?
           |
           v
        /login  -- correct password --+
                                      |
        /my-loans  <-- intended() ----+
```

### Protect a whole group

```php
Route::middleware('auth')->group(function () {
    Route::get('/my-loans', [LoanController::class, 'mine'])->name('loans.mine');
    Route::get('/profile', [ProfileController::class, 'show'])->name('profile');
});
```

Starter kits also use `verified` (`->middleware(['auth', 'verified'])`) for pages that need a confirmed email address.

## Public and Protected Parts of One Resource

Everyone may **browse** books. Only logged-in staff may **add, edit or delete** them. Split the resource:

```php
// routes/web.php
use App\Http\Controllers\BookController;

// Protected: register FIRST, because it contains /books/create
Route::middleware('auth')->group(function () {
    Route::resource('books', BookController::class)->except(['index', 'show']);
});

// Public
Route::resource('books', BookController::class)->only(['index', 'show']);
```

Check it with `php artisan route:list --name=books -v`. The `-v` option shows each route's middleware. The create, store, edit, update and destroy routes list `auth`; index and show do not.

## Librarians Only (Authorization)

Being logged in is not enough to delete books. Members log in too. We need **authorization**: deciding what a logged-in user may do.

### Step 1: mark librarians

Add a column with a migration:

```bash
php artisan make:migration add_is_librarian_to_users_table
```

```php
public function up(): void
{
    Schema::table('users', function (Blueprint $table) {
        $table->boolean('is_librarian')->default(false);
    });
}

public function down(): void
{
    Schema::table('users', function (Blueprint $table) {
        $table->dropColumn('is_librarian');
    });
}
```

Run `php artisan migrate`. In `User.php`, add `'is_librarian' => 'boolean'` to `casts()`. Do **not** add it to `$fillable`: no form should ever be able to set it (Chapter 14).

Make one user a librarian in Tinker. A query-builder `update()` does not use `$fillable`, so it works here:

```text
> User::where('email', 'rahman@example.org')->update(['is_librarian' => true])
= 1
```

### Step 2: define a Gate

A **Gate** is a named yes-or-no rule about a user. Define it in `app/Providers/AppServiceProvider.php`:

```php
// app/Providers/AppServiceProvider.php
use App\Models\User;
use Illuminate\Support\Facades\Gate;

public function boot(): void
{
    Gate::define('manage-books', function (User $user) {
        return $user->is_librarian;
    });
}
```

Now `manage-books` is true for librarians and false for everyone else.

### Step 3: use it on routes

Add the `can:manage-books` middleware after `auth`. It asks the gate before the controller runs:

```php
Route::middleware('auth')->group(function () {
    Route::resource('books', BookController::class)
        ->except(['index', 'show'])
        ->middleware('can:manage-books');
});
```

On a single route there is a shorter way to write the same check: `->can('manage-books')`.

When a logged-in member who is not a librarian opens `/books/create`, Laravel shows:

```text
403 | This action is unauthorized.
```

**403 Forbidden** means "I know who you are, but you may not do this". Compare: a guest gets sent to the login page instead.

### Checking inside a controller

You can also check in a method:

```php
public function destroy(Book $book)
{
    Gate::authorize('manage-books');   // 403 if not allowed

    $book->delete();

    return redirect()->route('books.index')->with('status', 'Book removed.');
}
```

Checking in **both** the route and the controller is fine. Extra care with the library's records is never wasted.

## Hide Buttons People Cannot Use

Protecting the route is what keeps the app safe. Hiding the button keeps the page tidy and honest. Use `@can`:

```blade
{{-- resources/views/books/show.blade.php --}}
<h2>{{ $book->title }}</h2>

@can('manage-books')
    <a href="{{ route('books.edit', $book) }}">Edit</a>
    <form method="POST" action="{{ route('books.destroy', $book) }}">
        @csrf
        @method('DELETE')
        <button type="submit">Delete</button>
    </form>
@endcan
```

A librarian sees the buttons; a member does not. Remember: hiding a button is **not** protection. Someone could still type the URL. The route's `can` check is what stops them.

## Your Finished Library App

Look how far you have come. Your app now has:

| Part | Chapters |
|------|----------|
| Routes, names, groups | 4–6 |
| Controllers, resources, middleware | 7–9 |
| Blade layouts, loops, safe output | 10–12 |
| Eloquent models and relationships | 13–15 |
| Migrations, seeders, factories | 16–18 |
| Forms, validation, CSRF | 19–21 |
| Login, logout, protected routes | 22–24 |

Ideas to keep growing: a "Mark returned" button that increments copies, a search box with `where('title', 'like', ...)`, email reminders for overdue books, and tests with `php artisan test`. The official documentation at laravel.com/docs is your next textbook.

## ⚠️ Common Mistake

**Registering the public `show` route before the protected `create` route.**

```php
Route::resource('books', BookController::class)->only(['index', 'show']);   // first

Route::middleware('auth')->group(function () {
    Route::resource('books', BookController::class)->except(['index', 'show']);
});
```

What happens: `/books/create` matches `/books/{book}` first. Route model binding looks for a book with id `create`, finds none, and shows **404 Not Found**. Put the group with `create` **first**, as shown above.

**Only hiding buttons.** If `@can` hides the Delete button but the route has no `can:manage-books`, any logged-in member can still send a DELETE request and remove books. Always protect the **route**.

## ✍️ Try It

Add `is_librarian`, the `manage-books` gate and the protected book routes to your app. Make two users: one librarian, one member. Log in as each and try `/books/create`.

*Hint:* the member should see 403, a guest should be sent to `/login`, and the librarian should see the form.

## 📝 Recap

- `->middleware('auth')` lets only logged-in users through; guests go to the `login` route and come back with `intended()`.
- Split resources with `only()` / `except()`, and register the group containing `create` first.
- Authorization decides what a user may do: define a Gate in `AppServiceProvider`.
- Use `can:manage-books` on routes and `Gate::authorize()` in controllers; failures give 403.
- `@can` hides buttons, but only route checks give real protection.

## 🏆 Practice

### 🟢 Level 1: Recall
What is the difference between being sent to `/login` and seeing a 403 page?

<details>
<summary>Show answer</summary>

Being sent to `/login` means the app does not know who you are (you are a guest), which is authentication. A **403** means the app knows who you are, but you are not allowed to do this, which is authorization.

</details>

### 🟡 Level 2: Apply
Write the routes so that everyone can see `/loans/overdue`, logged-in users can see `/my-loans`, and only librarians can open `/loans/create`.

<details>
<summary>Show answer</summary>

```php
// routes/web.php
Route::get('/loans/overdue', [LoanController::class, 'overdue'])->name('loans.overdue');

Route::middleware('auth')->group(function () {
    Route::get('/my-loans', [LoanController::class, 'mine'])->name('loans.mine');

    Route::get('/loans/create', [LoanController::class, 'create'])
        ->can('manage-books')
        ->name('loans.create');
});
```

(You could define a separate gate such as `manage-loans` with the same rule.)

</details>

### 🔴 Level 3: Challenge
Finish the library app's security.

1. Protect every librarian action (books, members, loans) with `auth` and a gate.
2. Show a "Librarian" link in the menu only to librarians.
3. Make `members.show` visible to librarians **and** to the member who owns that card. (Hint: define a gate `view-member` that receives the user and the member.)
4. Test with three accounts: a guest, a member and a librarian. Write down what each sees.

<details>
<summary>Show one possible answer</summary>

```php
// app/Providers/AppServiceProvider.php
Gate::define('view-member', function (User $user, Member $member) {
    return $user->is_librarian || $member->user_id === $user->id;
});
```

```php
// app/Http/Controllers/MemberController.php
public function show(Member $member)
{
    Gate::authorize('view-member', $member);

    return view('members.show', ['member' => $member]);
}
```

```blade
{{-- resources/views/partials/nav.blade.php --}}
@can('manage-books')
    <a href="{{ route('books.create') }}">Librarian</a>
@endcan
```

Results: the guest is sent to `/login`; the member sees only their own member page and gets 403 on others; the librarian sees everything. (`user_id` comes from the Chapter 23 challenge.)

</details>
