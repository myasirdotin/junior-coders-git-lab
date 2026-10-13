# Chapter 11: Layouts & Sections

## 🌟 Real-Life Story

Look at your school's printed notices. Every notice has the same school logo at the top and the same address at the bottom. Only the middle part changes: one is about the science fair, another about library week. The office keeps one **letterhead** and prints each new notice on it. In Blade, a **layout** is the letterhead. Each page only writes its own middle part.

## 🎯 What You Will Learn

- Explain why repeating the same HTML in every view causes problems.
- Build a layout file with `@yield`.
- Make pages that use the layout with `@extends` and `@section`.
- Reuse small pieces such as a navigation bar with `@include`.
- Recognise Blade **components** (`<x-...>`), which starter kits use.

## The Problem: Copy and Paste

So far each view has its own `<html>`, `<head>` and menu. With three pages, that is three copies. If the library changes its menu, you must edit every copy. Miss one, and the site looks broken. Layouts solve this: **write the shared parts once**.

## Step 1: The Layout

Create a folder `resources/views/layouts/` and a file `app.blade.php` inside it:

```blade
{{-- resources/views/layouts/app.blade.php --}}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', 'School Library')</title>
</head>
<body>
    <header>
        <h1>Crescent Valley School Library</h1>
    </header>

    <main>
        @yield('content')
    </main>

    <footer>
        <p>Open 8:00 to 15:00, Sunday to Thursday</p>
    </footer>
</body>
</html>
```

`@yield('content')` is a **blank to fill**. It says, "a page will put its content here". `@yield('title', 'School Library')` has a **default**: if a page gives no title, the tab shows `School Library`.

## Step 2: A Page That Uses It

```blade
{{-- resources/views/books/index.blade.php --}}
@extends('layouts.app')

@section('title', 'All Books')

@section('content')
    <h2>Library Books</h2>
    <p>We have 3 titles on the shelf.</p>
@endsection
```

- `@extends('layouts.app')` means "print me on the `layouts/app.blade.php` letterhead". It must be the **first line**.
- `@section('title', 'All Books')` is the short form for a small value.
- `@section('content') ... @endsection` holds a longer block of HTML.

The browser tab shows **All Books**, and the page shows:

```text
Crescent Valley School Library
Library Books
We have 3 titles on the shelf.
Open 8:00 to 15:00, Sunday to Thursday
```

Here is how the pieces fit together:

```text
layouts/app.blade.php
+--------------------------+
| header: library name     |
+--------------------------+
| @yield('content')        |
|   ^ filled by the page's |
|   @section('content')    |
+--------------------------+
| footer: opening hours    |
+--------------------------+
```

A second page, `members/index.blade.php`, uses the same layout with its own content. Change the footer once in the layout, and every page changes.

## Including Small Pieces

The menu is a small piece of HTML that many layouts might share. Put it in its own file and pull it in with `@include`:

```blade
{{-- resources/views/partials/nav.blade.php --}}
<nav>
    <a href="{{ route('books.index') }}">Books</a>
    <a href="{{ route('members.index') }}">Members</a>
    <a href="{{ route('loans.index') }}">Loans</a>
</nav>
```

```blade
{{-- inside layouts/app.blade.php, under the <h1> --}}
@include('partials.nav')
```

The dot means a folder, just like in `view()`. Files used only by `@include` are often called **partials**, because they are part of a page.

An included file can see the page's variables. You can also pass extra ones:

```blade
@include('partials.notice', ['message' => 'Library week starts on Monday!'])
```

```blade
{{-- resources/views/partials/notice.blade.php --}}
<div class="notice">{{ $message }}</div>
```

Output:

```text
Library week starts on Monday!
```

## Adding to a Section: `@parent`

Sometimes a page wants to *add* to a layout's section instead of replacing it. In the layout, write a section with `@show` instead of `@yield`:

```blade
{{-- layouts/app.blade.php --}}
@section('sidebar')
    <p>Today's tip: return books on time.</p>
@show
```

```blade
{{-- a page --}}
@section('sidebar')
    @parent
    <p>New: science magazines on shelf B.</p>
@endsection
```

`@parent` keeps the layout's content. The page shows both lines:

```text
Today's tip: return books on time.
New: science magazines on shelf B.
```

## Components: The Other Style

Laravel has a second way to build layouts: **components**. You will see them in starter kits (Chapter 22). A component file lives in `resources/views/components/` and is used like an HTML tag that starts with `x-`:

```blade
{{-- resources/views/components/layout.blade.php --}}
<html>
<body>
    <h1>Crescent Valley School Library</h1>
    {{ $slot }}
</body>
</html>
```

```blade
{{-- resources/views/about.blade.php --}}
<x-layout>
    <p>We lend books to every student.</p>
</x-layout>
```

`{{ $slot }}` is filled with whatever sits between `<x-layout>` and `</x-layout>`. Both styles work. This book uses `@extends` because it shows clearly how the blanks are filled. Pick one style per project and keep it.

## ⚠️ Common Mistake

**Writing content outside any section.**

```blade
@extends('layouts.app')

<h2>Library Books</h2>      {{-- outside a section --}}

@section('content')
    <p>We have 3 titles.</p>
@endsection
```

What happens: the `<h2>` does not appear where you expect. With `@extends`, only content inside sections is placed into the layout's blanks. Move it inside:

```blade
@section('content')
    <h2>Library Books</h2>
    <p>We have 3 titles.</p>
@endsection
```

**Mismatched names.** `@yield('content')` in the layout and `@section('main')` in the page do not connect. The page shows an empty middle. The names must match exactly.

## ✍️ Try It

Create `layouts/app.blade.php` and change your `about` and `books.index` views to use it. Then change the footer text once and check that both pages update.

*Hint:* each page starts with `@extends('layouts.app')`.

## 📝 Recap

- A layout holds the shared HTML; `@yield('name')` marks the blanks.
- Pages use `@extends('layouts.app')` and fill blanks with `@section ... @endsection`.
- `@yield('title', 'Default')` gives a default value.
- `@include('partials.nav')` pulls in a small reusable file.
- Components (`<x-layout>` with `{{ $slot }}`) are another layout style used by starter kits.

## 🏆 Practice

### 🟢 Level 1: Recall
Which directive goes in the layout to mark a blank, and which two directives does a page use to fill it?

<details>
<summary>Show answer</summary>

The layout uses `@yield('content')`. The page uses `@extends('layouts.app')` and `@section('content') ... @endsection`.

</details>

### 🟡 Level 2: Apply
Write a page `members/index.blade.php` that uses `layouts.app`, sets the title to `Members`, and shows a heading `Library Members` with the paragraph `85 students and teachers.`

<details>
<summary>Show answer</summary>

```blade
@extends('layouts.app')

@section('title', 'Members')

@section('content')
    <h2>Library Members</h2>
    <p>85 students and teachers.</p>
@endsection
```

</details>

### 🔴 Level 3: Challenge
Improve the library layout.

1. Move the menu into `partials/nav.blade.php` and include it in the layout.
2. In the layout, show a notice box only on pages that fill a section called `notice`. (Hint: `@hasSection('notice')` ... `@endif` checks whether a page filled a section.)
3. Make the books page fill the `notice` section with `New arrivals this week!`
4. Check that the members page shows no empty notice box.

<details>
<summary>Show one possible answer</summary>

```blade
{{-- layouts/app.blade.php (body part) --}}
<header>
    <h1>Crescent Valley School Library</h1>
    @include('partials.nav')
</header>

@hasSection('notice')
    <div class="notice">@yield('notice')</div>
@endif

<main>
    @yield('content')
</main>
```

```blade
{{-- books/index.blade.php --}}
@extends('layouts.app')

@section('notice', 'New arrivals this week!')

@section('content')
    <h2>Library Books</h2>
@endsection
```

The books page shows the notice box. The members page does not fill `notice`, so `@hasSection` is false and no box appears.

</details>
