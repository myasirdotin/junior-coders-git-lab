# Chapter 5: Route Parameters

## 🌟 Real-Life Story

In a library, every book has a number on its spine. You do not need a separate sign for each book. You just say, "Please bring me book number 42," and the librarian finds it. The *request* stays the same; only the *number* changes. Route parameters work the same way. One route can serve book 1, book 42 and book 300.

## 🎯 What You Will Learn

- Capture part of a URL with a **route parameter** like `{id}`.
- Use two parameters in one route.
- Make a parameter optional and give it a default value.
- Limit a parameter to numbers or letters with constraints.

## Your First Parameter

Put a name inside curly braces in the route's address. Laravel passes that part of the URL to your function:

```php
// routes/web.php
Route::get('/books/{id}', function ($id) {
    return "You asked for book number $id.";
});
```

| You visit | The browser shows |
|-----------|-------------------|
| `/books/1` | You asked for book number 1. |
| `/books/42` | You asked for book number 42. |

A **route parameter** is a changing part of the URL. The name in braces (`{id}`) and the function's variable (`$id`) should match. It makes the code easy to read.

## Two Parameters

A route can capture more than one part:

```php
Route::get('/members/{member}/loans/{loan}', function ($member, $loan) {
    return "Member $member, loan $loan.";
});
```

Visit `/members/7/loans/3`. The browser shows:

```text
Member 7, loan 3.
```

Laravel fills the parameters **in order**. The first `{...}` goes to the first variable.

## Optional Parameters

Add `?` after the name to make a parameter optional. Then give the variable a default value:

```php
Route::get('/shelf/{subject?}', function ($subject = 'general') {
    return "Showing the $subject shelf.";
});
```

| You visit | The browser shows |
|-----------|-------------------|
| `/shelf/science` | Showing the science shelf. |
| `/shelf` | Showing the general shelf. |

Without the default value, `/shelf` would cause an error, because PHP would have no value for `$subject`.

## Constraints: Only Allow Good Values

Right now `/books/hello` also matches `/books/{id}`. That makes no sense. A book number should be a number. Add a **constraint**, a rule the parameter must follow:

```php
Route::get('/books/{id}', function ($id) {
    return "You asked for book number $id.";
})->whereNumber('id');
```

| You visit | Result |
|-----------|--------|
| `/books/42` | You asked for book number 42. |
| `/books/hello` | 404 Not Found |

**404** is the HTTP code for "page not found". Laravel shows its own 404 page when no route matches.

Laravel has a few ready-made constraints:

| Method | Allows |
|--------|--------|
| `->whereNumber('id')` | Digits only: `42` |
| `->whereAlpha('subject')` | Letters only: `science` |
| `->whereAlphaNumeric('code')` | Letters and digits: `B12` |
| `->whereIn('shelf', ['a', 'b'])` | Only the listed values |

You can also write your own pattern with `where()` and a **regular expression** (a short pattern that describes text). This one allows a grade from 6 to 10:

```php
Route::get('/grade/{grade}', function ($grade) {
    return "Books for grade $grade.";
})->where('grade', '[6-9]|10');
```

`/grade/9` shows `Books for grade 9.` and `/grade/12` shows the 404 page.

## Order Matters

Laravel checks routes from top to bottom. Look at this file:

```php
Route::get('/books/{id}', function ($id) {
    return "Book $id";
});

Route::get('/books/new', function () {
    return 'Add a new book';
});
```

Visiting `/books/new` shows `Book new`. The first route matched, because `new` filled `{id}`. There are two fixes:

1. Put the fixed route `/books/new` **above** the route with the parameter.
2. Add `->whereNumber('id')`, so `new` can never match `{id}`.

Using both is the safest choice.

## Never Trust a Parameter

A parameter comes from the address bar. Anyone can type anything there. Remember what you learned in PHP: never put user input straight into SQL or HTML. Constraints are a first fence. In later chapters, Eloquent (Part 5) and Blade's `{{ }}` (Part 4) add more protection.

## ⚠️ Common Mistake

**Forgetting the default value for an optional parameter.**

```php
Route::get('/shelf/{subject?}', function ($subject) {   // wrong
    return "Showing the $subject shelf.";
});
```

Visiting `/shelf` gives an error page: `Too few arguments to function`. Fix it with a default:

```php
Route::get('/shelf/{subject?}', function ($subject = 'general') {   // right
    return "Showing the $subject shelf.";
});
```

**Using a parameter without braces.** `Route::get('/books/id', ...)` only matches the exact word `id`. Write `{id}`.

## ✍️ Try It

Add a route `/members/{id}` that shows `Member card number 15.` for `/members/15`. Make it reject letters.

*Hint:* chain `->whereNumber('id')` after the closing `)` of `Route::get`.

## 📝 Recap

- `{name}` in a route captures part of the URL and passes it to your function.
- Parameters are filled in order.
- `{name?}` makes it optional; give the variable a default value.
- Constraints like `whereNumber()` reject bad values with a 404.
- Fixed routes like `/books/new` go above routes with parameters.

## 🏆 Practice

### 🟢 Level 1: Recall
What does `?` after a parameter name do, and what else must you add?

<details>
<summary>Show answer</summary>

`?` makes the parameter optional. You must also give the function's variable a default value, such as `$subject = 'general'`.

</details>

### 🟡 Level 2: Apply
Write a route `/authors/{name}` that shows `Books by Maryam.` for `/authors/Maryam`, and returns 404 for `/authors/123`.

<details>
<summary>Show answer</summary>

```php
// routes/web.php
Route::get('/authors/{name}', function ($name) {
    return "Books by $name.";
})->whereAlpha('name');
```

</details>

### 🔴 Level 3: Challenge
The library groups books by year of publishing.

1. Write a route `/books/year/{year}` that shows `Books published in 2024.`
2. Allow only four digits.
3. Make the year optional, with `2026` as the default.
4. Make sure `/books/42` (from this chapter) still works. Where should each route go?

<details>
<summary>Show one possible answer</summary>

```php
// routes/web.php
Route::get('/books/year/{year?}', function ($year = '2026') {
    return "Books published in $year.";
})->where('year', '[0-9]{4}');

Route::get('/books/{id}', function ($id) {
    return "You asked for book number $id.";
})->whereNumber('id');
```

`/books/year` shows `Books published in 2026.` and `/books/year/2024` shows `Books published in 2024.` The two routes do not clash, because `year` is not a number. Keeping the more specific route first is still a good habit.

</details>
