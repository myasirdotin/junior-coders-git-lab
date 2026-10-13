# Chapter 12: Loops & Conditionals

## 🌟 Real-Life Story

Every morning the library assistant reads the **returns list** aloud. For each book on the list she says its title. If a book is late, she adds, "Please remind this member." If the list is empty, she says, "No returns today." She repeats one action for every item, and makes small decisions along the way. Blade's loops and conditionals do exactly this inside your HTML.

## 🎯 What You Will Learn

- Make decisions in a view with `@if`, `@elseif`, `@else` and `@unless`.
- Check for missing or empty values with `@isset` and `@empty`.
- Repeat HTML for every item with `@foreach`.
- Handle an empty list neatly with `@forelse`.
- Use the `$loop` variable to number rows and spot the first and last item.

## Today's Data

We still use sample data from the controller. Part 5 brings real database rows.

```php
// app/Http/Controllers/BookController.php
public function index()
{
    $books = [
        ['title' => 'Clean Water for Every Village', 'copies' => 3],
        ['title' => 'The Story of Numbers', 'copies' => 0],
        ['title' => 'Bees and Their Hives', 'copies' => 1],
    ];

    return view('books.index', ['books' => $books]);
}
```

## Conditionals

### `@if`, `@elseif`, `@else`

```blade
@php $copies = 1; @endphp

@if ($copies > 2)
    <p>Plenty of copies on the shelf.</p>
@elseif ($copies > 0)
    <p>Only a few left. Borrow soon!</p>
@else
    <p>All copies are out. Please check back later.</p>
@endif
```

Output with `$copies = 1`:

```text
Only a few left. Borrow soon!
```

(`@php ... @endphp` runs plain PHP. We use it here only to set a test value. In real views, data comes from the controller.)

### `@unless`

`@unless` is the opposite of `@if`. It runs when the condition is **false**:

```blade
@unless ($libraryOpen)
    <p>The library is closed today.</p>
@endunless
```

Read it as "unless the library is open, show this".

### `@isset` and `@empty`

```blade
@isset($notice)
    <div class="notice">{{ $notice }}</div>
@endisset

@empty($books)
    <p>No books yet.</p>
@endempty
```

- `@isset($notice)` runs if `$notice` exists and is not `null`.
- `@empty($books)` runs if `$books` is empty, such as `[]`.

## Loops

### `@foreach`

```blade
<ul>
@foreach ($books as $book)
    <li>{{ $book['title'] }} ({{ $book['copies'] }} on the shelf)</li>
@endforeach
</ul>
```

Output:

```text
• Clean Water for Every Village (3 on the shelf)
• The Story of Numbers (0 on the shelf)
• Bees and Their Hives (1 on the shelf)
```

### `@forelse`: a loop with an empty message

Lists are often empty: no loans today, no search results. `@forelse` handles that in one block:

```blade
@forelse ($books as $book)
    <li>{{ $book['title'] }}</li>
@empty
    <li>The library has no books yet.</li>
@endforelse
```

If `$books` is `[]`, the output is:

```text
• The library has no books yet.
```

### `@for` and `@while`

These work like PHP's `for` and `while`:

```blade
@for ($shelf = 1; $shelf <= 3; $shelf++)
    <p>Shelf {{ $shelf }}</p>
@endfor
```

Output:

```text
Shelf 1
Shelf 2
Shelf 3
```

You will use `@foreach` far more than `@for`, because data usually arrives as a list.

## The `$loop` Variable

Inside `@foreach` and `@forelse`, Blade gives you a free variable called `$loop`:

| Property | Meaning |
|----------|---------|
| `$loop->iteration` | Which round, starting at 1 |
| `$loop->index` | Which round, starting at 0 |
| `$loop->count` | How many items in total |
| `$loop->first` | `true` on the first round |
| `$loop->last` | `true` on the last round |
| `$loop->remaining` | Rounds still to go |

Number the rows and mark the last one:

```blade
@foreach ($books as $book)
    <p>
        {{ $loop->iteration }} of {{ $loop->count }}: {{ $book['title'] }}
        @if ($loop->last) (end of list) @endif
    </p>
@endforeach
```

Output:

```text
1 of 3: Clean Water for Every Village
2 of 3: The Story of Numbers
3 of 3: Bees and Their Hives (end of list)
```

## Putting It Together

A real book table with a status column:

```blade
{{-- resources/views/books/index.blade.php --}}
@extends('layouts.app')

@section('content')
<table>
    <tr><th>#</th><th>Title</th><th>Status</th></tr>
    @forelse ($books as $book)
        <tr>
            <td>{{ $loop->iteration }}</td>
            <td>{{ $book['title'] }}</td>
            <td>
                @if ($book['copies'] > 0)
                    Available ({{ $book['copies'] }})
                @else
                    All borrowed
                @endif
            </td>
        </tr>
    @empty
        <tr><td colspan="3">No books yet.</td></tr>
    @endforelse
</table>
@endsection
```

Output:

```text
#  Title                          Status
1  Clean Water for Every Village  Available (3)
2  The Story of Numbers           All borrowed
3  Bees and Their Hives           Available (1)
```

### Adding a CSS class with `@class`

`@class` adds CSS classes only when a condition is true:

```blade
<tr @class(['row', 'row-empty' => $book['copies'] === 0])>
```

For "The Story of Numbers" this prints `<tr class="row row-empty">`. For the others it prints `<tr class="row">`.

## ⚠️ Common Mistake

**Forgetting the closing directive.**

```blade
@foreach ($books as $book)
    <li>{{ $book['title'] }}</li>
{{-- forgot @endforeach --}}
```

What happens: an error page such as `syntax error, unexpected end of file`. Every `@if` needs `@endif`, every `@foreach` needs `@endforeach`, and so on. Indent the inside of each block, so a missing end is easy to spot.

**Using `$loop` outside a loop.** `$loop->iteration` only exists between `@foreach` and `@endforeach`. Outside, you get `Undefined variable $loop`.

## ✍️ Try It

Pass a list of four members (name and grade) to a view. Show them in a numbered list, and add `(Grade 10 leaver)` after members in Grade 10. If the list is empty, show `No members yet.`

*Hint:* use `@forelse`, `$loop->iteration` and `@if ($member['grade'] === 10)`.

## 📝 Recap

- `@if / @elseif / @else / @endif` make decisions; `@unless` is the opposite of `@if`.
- `@isset` and `@empty` check for missing or empty values.
- `@foreach` repeats HTML for every item; `@forelse ... @empty` adds an empty message.
- `$loop` gives `iteration`, `count`, `first`, `last` and more inside loops.
- Every directive block needs its matching `@end...`.

## 🏆 Practice

### 🟢 Level 1: Recall
What is the difference between `$loop->index` and `$loop->iteration`?

<details>
<summary>Show answer</summary>

`$loop->index` starts counting at **0**; `$loop->iteration` starts at **1**. On the first round, index is 0 and iteration is 1.

</details>

### 🟡 Level 2: Apply
Rewrite this with `@forelse`:

```blade
@if (count($loans) > 0)
    @foreach ($loans as $loan)
        <li>{{ $loan['title'] }}</li>
    @endforeach
@else
    <li>No books borrowed.</li>
@endif
```

<details>
<summary>Show answer</summary>

```blade
@forelse ($loans as $loan)
    <li>{{ $loan['title'] }}</li>
@empty
    <li>No books borrowed.</li>
@endforelse
```

</details>

### 🔴 Level 3: Challenge
Build a "Due Today" board.

1. The controller passes `$loans`: each has `member`, `title` and `days_late` (0 means due today).
2. Show a numbered list of loans.
3. If `days_late` is more than 0, show `Late by N days`; otherwise show `Due today`.
4. After the last item, show `Total: N books`.
5. If there are no loans, show `Nothing due today. Thank you, readers!`

<details>
<summary>Show one possible answer</summary>

```blade
@forelse ($loans as $loan)
    <p>
        {{ $loop->iteration }}. {{ $loan['title'] }} ({{ $loan['member'] }}):
        @if ($loan['days_late'] > 0)
            Late by {{ $loan['days_late'] }} days
        @else
            Due today
        @endif
    </p>
    @if ($loop->last)
        <p><strong>Total: {{ $loop->count }} books</strong></p>
    @endif
@empty
    <p>Nothing due today. Thank you, readers!</p>
@endforelse
```

With two loans (Omar, 0 days late; Fatima, 2 days late) the output is:

```text
1. The Story of Numbers (Omar): Due today
2. Bees and Their Hives (Fatima): Late by 2 days
Total: 2 books
```

</details>
