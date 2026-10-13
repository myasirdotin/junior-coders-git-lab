# Chapter 23: Login & Register

## 🌟 Real-Life Story

To join the library, you fill in a **membership form** and the librarian gives you a card. Next time, you show the card at the gate. The gatekeeper checks it, nods, and lets you in. When you leave, you collect your card from the desk and go. Register, log in, log out: three steps every website with accounts has. In this chapter you build all three by hand, so you understand what the starter kits do for you.

## 🎯 What You Will Learn

- Build a **register** page that creates a user with a hashed password.
- Build a **login** page with `Auth::attempt()`.
- Build a **logout** button as a POST form with `@csrf`.
- Show different links to guests and logged-in users with `@guest` and `@auth`.
- Slow down password guessing with `throttle`.

> We build this inside your `library-app` to learn how login works. For a real school app, use a starter kit (Chapter 22). It also handles password resets, email checks and many edge cases.

## 🗺️ The Routes

```php
// routes/web.php
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;

Route::middleware('guest')->group(function () {
    Route::get('/register', [RegisterController::class, 'create'])->name('register');
    Route::post('/register', [RegisterController::class, 'store']);

    Route::get('/login', [LoginController::class, 'create'])->name('login');
    Route::post('/login', [LoginController::class, 'store'])->middleware('throttle:5,1');
});

Route::post('/logout', [LoginController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');
```

- The `guest` middleware sends logged-in users away from the login and register pages.
- The login page **must** be named `login`. The `auth` middleware sends visitors there by that name (Chapter 24).
- `throttle:5,1` allows 5 login attempts per minute. After that, Laravel answers **429 Too Many Requests**. This slows down anyone guessing passwords.
- Logout is POST, for the reasons in Chapter 21.

Create the controllers in an `Auth` folder:

```bash
php artisan make:controller Auth/RegisterController
php artisan make:controller Auth/LoginController
```

## 📝 Register

```php
// app/Http/Controllers/Auth/RegisterController.php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RegisterController extends Controller
{
    public function create()
    {
        return view('auth.register');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create($validated);   // the 'hashed' cast hashes the password

        Auth::login($user);
        $request->session()->regenerate();

        return redirect()->route('books.index')
            ->with('status', "Welcome, {$user->name}!");
    }
}
```

- `confirmed` means the form must also have a field `password_confirmation` with the same value.
- `User::create()` saves the user. The `'hashed'` cast from Chapter 22 hashes the password first.
- `Auth::login($user)` logs the new user in straight away.
- `session()->regenerate()` gives the visitor a **new session id**. This blocks an attack where someone plants a session id before login.

The view:

```blade
{{-- resources/views/auth/register.blade.php --}}
@extends('layouts.app')

@section('content')
<h2>Join the Library</h2>
<form method="POST" action="{{ route('register') }}">
    @csrf
    <label for="name">Name</label>
    <input id="name" name="name" value="{{ old('name') }}" required>
    @error('name') <p class="error">{{ $message }}</p> @enderror

    <label for="email">Email</label>
    <input id="email" type="email" name="email" value="{{ old('email') }}" required>
    @error('email') <p class="error">{{ $message }}</p> @enderror

    <label for="password">Password</label>
    <input id="password" type="password" name="password" required>
    @error('password') <p class="error">{{ $message }}</p> @enderror

    <label for="password_confirmation">Type the password again</label>
    <input id="password_confirmation" type="password" name="password_confirmation" required>

    <button type="submit">Register</button>
</form>
@endsection
```

Notice: **no** `old('password')`. Never send a password back to the page.

If the two passwords differ, the form returns with:

```text
The password field confirmation does not match.
```

## 🔑 Log In

```php
// app/Http/Controllers/Auth/LoginController.php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function create()
    {
        return view('auth.login');
    }

    public function store(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if (Auth::attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();

            return redirect()->intended(route('books.index'));
        }

        return back()
            ->withErrors(['email' => 'These credentials do not match our records.'])
            ->onlyInput('email');
    }
}
```

- `Auth::attempt()` finds the user by email, hashes the typed password, and compares. It returns `true` and logs them in, or returns `false`.
- The second argument turns on **"Remember me"**: the user stays logged in after closing the browser.
- `redirect()->intended(...)` sends the user to the page they were trying to reach before login, or to the book list.
- On failure, we give **one** message for both "wrong email" and "wrong password". Saying "no account with that email" would tell a stranger which emails are members. Protecting that is part of *amānah*.
- `onlyInput('email')` refills the email field but not the password.

The form:

```blade
{{-- resources/views/auth/login.blade.php --}}
<form method="POST" action="{{ route('login') }}">
    @csrf
    <label for="email">Email</label>
    <input id="email" type="email" name="email" value="{{ old('email') }}" required>
    @error('email') <p class="error">{{ $message }}</p> @enderror

    <label for="password">Password</label>
    <input id="password" type="password" name="password" required>

    <label><input type="checkbox" name="remember"> Remember me</label>

    <button type="submit">Log in</button>
</form>
```

A wrong password shows:

```text
These credentials do not match our records.
```

## 🚪 Log Out

```php
// app/Http/Controllers/Auth/LoginController.php
public function destroy(Request $request)
{
    Auth::logout();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return redirect('/');
}
```

`invalidate()` empties the session. `regenerateToken()` makes a new CSRF token, so old forms cannot be reused.

## 👀 Who is Logged In?

| Code | Gives |
|------|-------|
| `Auth::check()` | `true` if someone is logged in |
| `Auth::user()` or `auth()->user()` | the logged-in `User`, or `null` |
| `Auth::id()` | the user's id |
| `$request->user()` | the same user, inside a controller |

In Blade, `@auth` and `@guest` show different things:

```blade
{{-- resources/views/partials/nav.blade.php --}}
@auth
    <span>Hello, {{ auth()->user()->name }}</span>
    <form method="POST" action="{{ route('logout') }}">
        @csrf
        <button type="submit">Log out</button>
    </form>
@endauth

@guest
    <a href="{{ route('login') }}">Log in</a>
    <a href="{{ route('register') }}">Join</a>
@endguest
```

When Aisha is logged in, the menu shows:

```text
Hello, Aisha  [Log out]
```

## ⚠️ Common Mistake

**Not naming the login route `login`.**

```php
Route::get('/sign-in', [LoginController::class, 'create']);   // no name
```

What happens: when a guest opens a page protected by `auth`, Laravel tries to send them to the route named `login` and shows `Route [login] not defined.` Fix: add `->name('login')` to the login page route.

**Forgetting `regenerate()` after login.** The login seems to work, but the visitor keeps the session id from before login. An attacker who had planted that id could share the logged-in session. Always call `$request->session()->regenerate()` after `Auth::attempt()` or `Auth::login()`.

## ✍️ Try It

Add the register, login and logout pages to `library-app`. Register yourself with a made-up email, log out, then try logging in with a wrong password six times in one minute. What happens on the sixth try?

*Hint:* the sixth try shows **429 | Too Many Requests**. Wait a minute and try again.

## 📝 Recap

- Register: validate (with `confirmed`), `User::create()`, `Auth::login()`, regenerate the session.
- Log in: validate, `Auth::attempt($credentials, $remember)`, regenerate, `redirect()->intended()`.
- Give one vague error for wrong email or password; never refill the password field.
- Log out with a POST form: `Auth::logout()`, `invalidate()`, `regenerateToken()`.
- `@auth` / `@guest` and `auth()->user()` show who is logged in; `throttle` slows down guessing.

## 🏆 Practice

### 🟢 Level 1: Recall
What does `Auth::attempt()` do, and what does it return?

<details>
<summary>Show answer</summary>

It looks up the user by email, hashes the typed password and compares it with the stored hash. If they match, it logs the user in and returns `true`; otherwise it returns `false`.

</details>

### 🟡 Level 2: Apply
Why does the login error say "These credentials do not match our records." instead of "No member uses that email"?

<details>
<summary>Show answer</summary>

A specific message would tell a stranger which emails belong to members. That leaks private information. One vague message for both cases protects members' privacy (*amānah*).

</details>

### 🔴 Level 3: Challenge
Link users to library members.

1. Write a migration that adds a nullable `user_id` foreign key to `members`.
2. Add `member()` to `User` (`hasOne`) and `user()` to `Member` (`belongsTo`).
3. Make a "My loans" page at `/my-loans` that shows the logged-in user's loans, or `You have no books borrowed.`

<details>
<summary>Show one possible answer</summary>

```php
// database/migrations/..._add_user_id_to_members_table.php
public function up(): void
{
    Schema::table('members', function (Blueprint $table) {
        $table->foreignId('user_id')->nullable()->constrained();
    });
}

public function down(): void
{
    Schema::table('members', function (Blueprint $table) {
        $table->dropConstrainedForeignId('user_id');
    });
}
```

```php
// app/Models/User.php
public function member(): HasOne
{
    return $this->hasOne(Member::class);
}

// app/Models/Member.php
public function user(): BelongsTo
{
    return $this->belongsTo(User::class);
}
```

```php
// routes/web.php
Route::get('/my-loans', function () {
    $member = auth()->user()->member;
    $loans = $member ? $member->loans()->with('book')->get() : collect();

    return view('loans.mine', ['loans' => $loans]);
})->middleware('auth')->name('loans.mine');
```

```blade
{{-- resources/views/loans/mine.blade.php --}}
@forelse ($loans as $loan)
    <p>{{ $loan->book->title }}, due {{ $loan->due_on->format('d M Y') }}</p>
@empty
    <p>You have no books borrowed.</p>
@endforelse
```

`collect()` makes an empty collection, so `@forelse` works even for users with no member card.

</details>
