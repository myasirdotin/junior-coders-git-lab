# Chapter 10: Blade Syntax

## 🌟 Real-Life Story

The library prints a **reading certificate** for every student who finishes ten books. The certificate design is the same for everyone. Only a few blanks change: the name, the class and the date. The librarian does not redesign the certificate each time. She fills in the blanks. A **Blade template** is that certificate design. Your controller fills in the blanks.

## 🎯 What You Will Learn

- Explain what Blade is and where Blade files live.
- Print variables and PHP expressions with `{{ }}`.
- Explain why `{{ }}` is safe, and when (rarely) to use `{!! !!}`.
- Write Blade comments that never reach the browser.
- Recognise Blade **directives** like `@if` and `@foreach`.

## 📋 What is Blade?

**Blade** is Laravel's **template engine**: a tool that mixes HTML with small pieces of data. Blade files:

- end in **`.blade.php`**,
- live in **`resources/views/`**,
- are loaded with `view('name')`.

Behind the scenes, Laravel turns each Blade file into plain PHP and saves it in `storage/framework/views/`. That is why Blade is fast. You never edit those saved files.

## 🖨️ Printing Data with `{{ }}`

Double curly braces print a value. The controller passes the data:

```php
// app/Http/Controllers/CertificateController.php
public function show()
{
    return view('certificate', [
        'name' => 'Aisha',
        'grade' => 9,
        'books' => 10,
    ]);
}
```

```blade
{{-- resources/views/certificate.blade.php --}}
<h1>Reading Certificate</h1>
<p>This is to certify that {{ $name }} of Grade {{ $grade }}</p>
<p>has read {{ $books }} books this term.</p>
```

The browser shows:

```text
Reading Certificate
This is to certify that Aisha of Grade 9
has read 10 books this term.
```

### Any PHP expression works

Inside `{{ }}` you can put any PHP **expression** (a piece of code that gives a value):

```blade
<p>{{ strtoupper($name) }}</p>
<p>Next target: {{ $books + 5 }} books</p>
<p>Total pages read: {{ number_format(1250) }}</p>
<p>Library: {{ $library ?? 'Crescent Valley School Library' }}</p>
```

Output (here `$library` was not passed):

```text
AISHA
Next target: 15 books
Total pages read: 1,250
Library: Crescent Valley School Library
```

The `??` operator from PHP gives a default when a variable is missing or `null`.

## 🛡️ Why `{{ }}` is Safe

Imagine a book review form. A visitor types this as their review:

```text
<b>Science Fair</b>
```

If you printed it as raw HTML, the browser would follow the tags. A harmful visitor could type a `<script>` tag instead, and run their code in other people's browsers. This attack is called **XSS** (cross-site scripting).

`{{ }}` **escapes** the text first. Escaping turns special characters like `<` into safe codes like `&lt;`. So this view:

```blade
<p>{{ $review }}</p>
```

sends this HTML:

```html
<p>&lt;b&gt;Science Fair&lt;/b&gt;</p>
```

and the browser shows the tags as plain text:

```text
<b>Science Fair</b>
```

Nothing runs. Behind the scenes `{{ $review }}` becomes `<?php echo e($review); ?>`. The `e()` helper calls PHP's `htmlspecialchars()`, which you met in the PHP book.

### `{!! !!}`: only for trusted HTML

Sometimes you *want* HTML to work, such as a notice that **you** wrote with bold text:

```blade
{!! $noticeHtml !!}
```

`{!! !!}` prints **without** escaping. Use it only for HTML that you or your app made and fully trust. **Never** use it for anything a visitor typed: names, reviews, search words, form fields. When unsure, use `{{ }}`.

## 💬 Blade Comments

```blade
{{-- This note is for developers only. --}}
<!-- This HTML comment is sent to the browser. -->
```

A **Blade comment** `{{-- --}}` is removed before the page is sent. Visitors cannot see it, even with "View Source". An HTML comment `<!-- -->` *is* sent, so never put secrets in it.

## 🧭 Directives: A Preview

Words that start with `@` are **directives**: short Blade commands that stand for PHP code.

```blade
@if ($books >= 10)
    <p>Well done! You earned the certificate.</p>
@else
    <p>Keep reading. Only {{ 10 - $books }} more to go!</p>
@endif
```

With `$books = 10`, the browser shows:

```text
Well done! You earned the certificate.
```

Every opening directive has a matching end: `@if` ... `@endif`, `@foreach` ... `@endforeach`. Chapter 12 covers loops and conditions in depth. Chapter 11 covers layouts.

### Printing curly braces

Some JavaScript tools also use `{{ }}`. To print the braces themselves, add `@` in front: `@{{ name }}` shows `{{ name }}` in the browser, and Blade leaves it alone.

## 🔄 Plain PHP vs Blade

| Plain PHP | Blade |
|-----------|-------|
| `<?php echo htmlspecialchars($name); ?>` | `{{ $name }}` |
| `<?php if ($x): ?> ... <?php endif; ?>` | `@if ($x) ... @endif` |
| `<?php // note ?>` | `{{-- note --}}` |

Blade is shorter, and it escapes by default, so the safe choice is also the easy one.

## ⚠️ Common Mistake

**Using `{!! !!}` for user input "to make the formatting work".**

```blade
<p>{!! $member->bio !!}</p>   {{-- wrong: a member typed this --}}
```

What happens: if a member types a script into their bio, it runs for every visitor who opens the page. That breaks the trust (*amānah*) of everyone using the library app. Fix:

```blade
<p>{{ $member->bio }}</p>     {{-- right --}}
```

**Forgetting `.blade.php`.** A file named `certificate.php` will not understand `{{ }}`. You will see the braces printed on the page. Rename it to `certificate.blade.php`.

## ✍️ Try It

Make a `certificate` view and a route that passes your own name, grade and number of books. Add a Blade comment and an HTML comment, then use "View Source" in the browser. Which comment can you see?

*Hint:* only the HTML comment appears in the source.

## 📝 Recap

- Blade files end in `.blade.php` and live in `resources/views/`.
- `{{ $value }}` prints a value and escapes it, which blocks XSS.
- `{!! $html !!}` prints raw HTML. Use it only for trusted HTML you made.
- `{{-- --}}` comments never reach the browser.
- Directives like `@if` and `@foreach` replace PHP tags; each has an `@end...`.

## 🏆 Practice

### 🟢 Level 1: Recall
What is the difference between `{{ $text }}` and `{!! $text !!}`?

<details>
<summary>Show answer</summary>

`{{ $text }}` escapes special characters, so any HTML in the text is shown as plain text. `{!! $text !!}` prints it as real HTML, with no escaping. Use `{!! !!}` only for HTML you fully trust.

</details>

### 🟡 Level 2: Apply
`$title` is `Bees & Their Hives`. What HTML does `<h1>{{ $title }}</h1>` send, and what does the browser show?

<details>
<summary>Show answer</summary>

It sends `<h1>Bees &amp; Their Hives</h1>`. The browser shows `Bees & Their Hives`. Escaping changed `&` to `&amp;`, and the browser turns it back into `&` for display.

</details>

### 🔴 Level 3: Challenge
Build a "Book of the Week" card.

1. A controller passes `title`, `author`, `pages` and `review` (typed by a student).
2. The view shows the title in capitals, "by" the author, the pages with a thousands comma, and the review safely.
3. If `pages` is over 300, show `A long read: take your time!`; otherwise show `A quick read for the weekend.`
4. Add a developer note that visitors cannot see.

<details>
<summary>Show one possible answer</summary>

```blade
{{-- resources/views/book-of-week.blade.php --}}
{{-- Data comes from BookOfWeekController@show --}}
<div class="card">
    <h2>{{ strtoupper($title) }}</h2>
    <p>by {{ $author }}</p>
    <p>{{ number_format($pages) }} pages</p>
    <blockquote>{{ $review }}</blockquote>

    @if ($pages > 300)
        <p>A long read: take your time!</p>
    @else
        <p>A quick read for the weekend.</p>
    @endif
</div>
```

The review uses `{{ }}` because a student typed it.

</details>
