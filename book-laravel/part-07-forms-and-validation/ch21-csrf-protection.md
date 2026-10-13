# Chapter 21: CSRF Protection

## 🌟 Real-Life Story

The library only accepts official request slips that carry the librarian's **secret stamp**. One day, a slip appears in the tray: "Remove all science books from the register." It looks real, but it has no stamp. Someone else wrote it and slipped it in. The librarian refuses it, and the books stay safe. Laravel stamps every form it makes with a secret **token**, and refuses any form that arrives without the right one. That protection is called **CSRF protection**.

## 🎯 What You Will Learn

- Explain what a **CSRF attack** is, in plain words.
- Describe how Laravel's CSRF token stops it.
- Use `@csrf` in every form and understand the "419 Page Expired" error.
- Send the token with JavaScript requests.
- Explain why GET requests must never change data, and why logout is a POST form.

## 🎭 What is CSRF?

**CSRF** stands for **Cross-Site Request Forgery**. "Forgery" means a fake made to look real. "Cross-site" means it comes from a different website.

Here is how an attack could work against a library app **without** protection:

1. Mrs Rahman, the librarian, logs in to the library app. Her browser keeps a **session cookie**, so the app knows it is her.
2. Later, in another tab, she opens a harmful page on a different website.
3. That page contains a hidden form that sends `DELETE /books/3` to the library app, and submits itself with JavaScript.
4. Her browser sends the request **with her cookie**, because cookies go with every request to that site.
5. The app sees a logged-in librarian asking to delete a book, and does it.

```text
 Harmful site           Library app
+------------+         +-------------+
| hidden form|-------->| DELETE      |
| auto-submit| cookie  | /books/3    |
+------------+  sent   | "it's her!" |
                       +-------------+
```

She never clicked "Delete". The other site **forged** the request, using her login.

Modern browsers make this harder: Laravel's session cookie is marked `SameSite=Lax`, which stops browsers sending it with most requests started by other sites. But older browsers and some tricks get around that, so Laravel adds a stronger guard: the token.

## 🔐 How the Token Stops It

Laravel gives each visitor's session a long random **CSRF token**. Every form made by your app includes that token in a hidden field. When a POST, PUT, PATCH or DELETE request arrives, Laravel compares the token in the form with the one in the session:

```text
Form token == session token?
    |
    +-- yes --> continue to the route
    |
    +-- no  --> stop: 419 Page Expired
```

The harmful site **cannot read** the token. Browsers do not let one website read another website's pages. So its forged form has no token, or a wrong one, and Laravel refuses it.

This check is done by middleware called `ValidateCsrfToken`. Laravel runs it on every web route automatically. You do not add it yourself.

## 🏷️ `@csrf` in Every Form

```blade
<form method="POST" action="{{ route('books.store') }}">
    @csrf
    ...
</form>
```

`@csrf` prints a hidden input. View the page source and you will see something like:

```html
<input type="hidden" name="_token" value="kQ3vX9...a long random string..." autocomplete="off">
```

Your token will be different, and it changes when your session changes. Keep `@csrf` in **every** form that uses POST, including forms with `@method('PUT')` or `@method('DELETE')`.

## ⛔ The 419 Error

If the token is missing or wrong, Laravel shows:

```text
419 | Page Expired
```

You will see this in three common cases:

| Cause | Fix |
|-------|-----|
| You forgot `@csrf` in the form | Add `@csrf` |
| The page was open so long that the session expired | Reload the page and submit again |
| You cleared cookies, or logged in on another tab | Reload the page |

The default session lasts 120 minutes (`SESSION_LIFETIME=120` in `.env`).

## 📡 Tokens with JavaScript

If your page sends data with JavaScript's `fetch()`, it must send the token too. Put it in a `<meta>` tag in the layout:

```blade
{{-- layouts/app.blade.php, inside <head> --}}
<meta name="csrf-token" content="{{ csrf_token() }}">
```

Then read it and send it as a header:

```js
const token = document.querySelector('meta[name="csrf-token"]').content;

fetch('/loans/7/return', {
    method: 'POST',
    headers: { 'X-CSRF-TOKEN': token },
});
```

Laravel accepts the token from the `_token` field **or** the `X-CSRF-TOKEN` header.

## 🚫 GET Must Never Change Data

CSRF checks only run on POST, PUT, PATCH and DELETE. GET requests are not checked, because GET is supposed to only **read**. So a GET route that changes data has no protection:

```php
// DANGEROUS: any website can trigger it with a simple link
Route::get('/books/{book}/delete', [BookController::class, 'destroy']);
```

A harmful page could show a friendly-looking link to `http://library.example.org/books/3/delete`. One click by a logged-in librarian, and the book is gone. Browsers send the session cookie with links like this, and GET has no token check. Use the proper resource route with a DELETE form (Chapter 19).

### Logout is a POST form

Logging out changes the session, so it is a POST too. Starter kits (Chapter 22) do it like this:

```blade
<form method="POST" action="{{ route('logout') }}">
    @csrf
    <button type="submit">Log out</button>
</form>
```

If logout were a plain link, any website could log your users out with one link.

## 🧩 Excluding a Route (Rarely)

Sometimes another **server** (not a browser) must send POST requests to your app, such as an online donation service reporting a gift. It cannot know your token. You can exclude that one URL in `bootstrap/app.php`:

```php
->withMiddleware(function (Middleware $middleware): void {
    $middleware->validateCsrfTokens(except: [
        'webhooks/donations',
    ]);
})
```

Such routes need **another** way to prove who is calling, such as a secret signature. Never exclude routes just to make a 419 error go away.

## 🛡️ What CSRF Protection Does Not Do

CSRF protection checks **where a request came from**. It does not:

- check whether the data is correct (that is **validation**, Chapter 20),
- stop harmful text being shown on a page (that is **escaping** with `{{ }}`, Chapter 10),
- decide who is allowed to do what (that is **authorization**, Chapter 24).

Laravel gives you each tool. A safe app uses all of them.

## ⚠️ Common Mistake

**"Fixing" a 419 error by turning protection off.**

```php
$middleware->validateCsrfTokens(except: ['*']);   // wrong: protection gone
```

The error disappears, and so does the protection for every form. Fix the real cause instead:

```blade
<form method="POST" action="{{ route('books.store') }}">
    @csrf        {{-- right: the missing line --}}
```

**Putting `@csrf` outside the form.** If `@csrf` sits above `<form>`, the hidden input is not part of the form, and the token is not sent. Put it **inside**, just after the opening tag.

## ✍️ Try It

Open your "Add a Book" page and view the source. Find the `_token` input. Then remove `@csrf`, submit the form, and see the 419 page. Put `@csrf` back.

*Hint:* in most browsers, **Ctrl+U** opens the page source.

## 📝 Recap

- CSRF is a forged request from another site that uses a logged-in user's cookie.
- Laravel puts a secret token in each form and checks it on POST, PUT, PATCH and DELETE.
- Put `@csrf` inside every POST form; a missing or old token gives **419 Page Expired**.
- JavaScript sends the token in the `X-CSRF-TOKEN` header.
- GET must never change data; logout is a POST form with `@csrf`.

## 🏆 Practice

### 🟢 Level 1: Recall
What does CSRF stand for, and what HTTP code does Laravel show when the token is missing?

<details>
<summary>Show answer</summary>

Cross-Site Request Forgery. Laravel shows **419 Page Expired**.

</details>

### 🟡 Level 2: Apply
A classmate writes this logout link. Explain the problem and rewrite it.

```blade
<a href="/logout">Log out</a>
```

<details>
<summary>Show answer</summary>

A link sends GET, which has no CSRF check, so any website could log users out with a link of its own. And logging out changes data (the session). Use a POST form:

```blade
<form method="POST" action="{{ route('logout') }}">
    @csrf
    <button type="submit">Log out</button>
</form>
```

</details>

### 🔴 Level 3: Challenge
Audit your library app for CSRF safety.

1. List every form in your views and check each has `@csrf` inside it.
2. Run `php artisan route:list --method=GET` and check that no GET route creates, changes or deletes data.
3. If your app uses `fetch()` anywhere, check it sends `X-CSRF-TOKEN`.
4. Write one sentence for each finding: what you checked and what you fixed.

<details>
<summary>Show one possible answer</summary>

1. `books/create`, `books/edit`, the delete button, `members/create` and `loans/create` all have `@csrf` inside `<form>`. Fixed: the delete button had `@csrf` above `<form>`; moved inside.
2. All GET routes only show pages. Fixed: an old `/books/{book}/delete` GET route was removed; the DELETE form is used instead.
3. The "Mark returned" button used `fetch()` without the header; added the `<meta name="csrf-token">` tag and the `X-CSRF-TOKEN` header.
4. These sentences are the report.

</details>
