# Chapter 15: Relationships

## 🌟 Real-Life Story

Every loan slip in the library connects two things: a **member** and a **book**. From a member's card, the librarian can list all the slips that member has. From a slip, she can see the book's title and the member's name. Nothing is written twice; each slip just points to the right card and the right book. Eloquent **relationships** let your models point to each other in the same way.

## 🎯 What You Will Learn

- Explain **one-to-many** relationships with foreign keys.
- Write `hasMany()` and `belongsTo()` methods in models.
- Read related data, such as `$member->loans` and `$loan->book->title`.
- Filter related rows, such as loans not yet returned.
- Avoid the "N+1" slowdown with eager loading: `with()`.

## One-to-Many

Look at our three tables:

```text
members       loans            books
+-------+     +-----------+    +-------+
| id    |<----| member_id |    | id    |
| name  |     | book_id   |--->| title |
+-------+     +-----------+    +-------+
```

- One **member** can have **many** loans.
- One **book** can have **many** loans (over time).
- Each **loan** belongs to **one** member and **one** book.

The columns `member_id` and `book_id` are **foreign keys**: they store the id of a row in another table. You met them in the MySQL book.

## Create the Tables (by Hand for Now)

As in Chapter 13, run this SQL in phpMyAdmin. Part 6 shows the Laravel way.

```sql
CREATE TABLE members (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    grade TINYINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);

CREATE TABLE loans (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    book_id BIGINT UNSIGNED NOT NULL,
    member_id BIGINT UNSIGNED NOT NULL,
    borrowed_on DATE NOT NULL,
    due_on DATE NOT NULL,
    returned_on DATE NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (member_id) REFERENCES members(id)
);

INSERT INTO members (name, email, grade) VALUES
('Aisha Khan', 'aisha@example.org', 9),
('Omar Siddiqui', 'omar@example.org', 10),
('Fatima Noor', 'fatima@example.org', 9);

INSERT INTO loans (book_id, member_id, borrowed_on, due_on, returned_on) VALUES
(2, 1, '2026-10-01', '2026-10-15', NULL),
(1, 1, '2026-09-10', '2026-09-24', '2026-09-20'),
(3, 2, '2026-10-05', '2026-10-19', NULL);
```

Then make the two models:

```bash
php artisan make:model Member
php artisan make:model Loan
```

## Write the Relationships

A relationship is a **method** in the model that returns `hasMany(...)` or `belongsTo(...)`.

```php
// app/Models/Member.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Member extends Model
{
    protected $fillable = ['name', 'email', 'grade'];

    public function loans(): HasMany
    {
        return $this->hasMany(Loan::class);
    }
}
```

```php
// app/Models/Loan.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Loan extends Model
{
    protected $fillable = ['book_id', 'member_id', 'borrowed_on', 'due_on', 'returned_on'];

    protected function casts(): array
    {
        return [
            'borrowed_on' => 'date',
            'due_on' => 'date',
            'returned_on' => 'date',
        ];
    }

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }

    public function member(): BelongsTo
    {
        return $this->belongsTo(Member::class);
    }
}
```

```php
// app/Models/Book.php (add inside the class)
public function loans(): HasMany
{
    return $this->hasMany(Loan::class);
}
```

(Add `use Illuminate\Database\Eloquent\Relations\HasMany;` at the top of `Book.php` too.)

How does Eloquent know the column names? Convention again. `belongsTo(Book::class)` looks for `book_id` in the `loans` table. `hasMany(Loan::class)` in `Member` looks for `member_id` in `loans`.

The `casts()` method tells Eloquent to turn the date columns into date objects. Then you can write `$loan->due_on->format('d M Y')`.

## Use the Relationships

Call the method **without brackets** to get the related data:

```text
> $aisha = Member::find(1)
> $aisha->loans->count()
= 2

> Loan::find(1)->book->title
= "The Story of Numbers"

> Loan::find(3)->member->name
= "Omar Siddiqui"

> Loan::find(1)->due_on->format('d M Y')
= "15 Oct 2026"
```

- `$aisha->loans` gives a collection of `Loan` objects.
- `$loan->book` gives one `Book` object.

### With brackets: keep building the query

Call the method **with brackets** to add conditions before running it:

```text
> $aisha->loans()->whereNull('returned_on')->count()
= 1
```

This counts Aisha's books that are still out. `whereNull('returned_on')` means "the return date is empty".

### Create through a relationship

```php
$aisha->loans()->create([
    'book_id' => 4,
    'borrowed_on' => '2026-10-13',
    'due_on' => '2026-10-27',
]);
```

Eloquent fills `member_id` with Aisha's id for you.

## In a View

```php
// app/Http/Controllers/MemberController.php
public function show(Member $member)
{
    return view('members.show', ['member' => $member]);
}
```

```blade
{{-- resources/views/members/show.blade.php --}}
<h2>{{ $member->name }} (Grade {{ $member->grade }})</h2>
<ul>
@forelse ($member->loans as $loan)
    <li>
        {{ $loan->book->title }}, due {{ $loan->due_on->format('d M Y') }}
        @if ($loan->returned_on) (returned) @endif
    </li>
@empty
    <li>No books borrowed yet.</li>
@endforelse
</ul>
```

For `/members/1` the browser shows:

```text
Aisha Khan (Grade 9)
• The Story of Numbers, due 15 Oct 2026
• Clean Water for Every Village, due 24 Sep 2026 (returned)
```

## The N+1 Problem and `with()`

Look at this loans page:

```php
$loans = Loan::all();               // 1 query
```

```blade
@foreach ($loans as $loan)
    {{ $loan->book->title }}        {{-- 1 more query per loan! --}}
@endforeach
```

With 3 loans, that is 1 + 3 = 4 queries. With 500 loans, it is 501. This is called the **N+1 problem**. Fix it with **eager loading**, which fetches all the related rows at once:

```php
$loans = Loan::with(['book', 'member'])->get();   // 3 queries in total
```

Now there is one query for loans, one for all their books and one for all their members, however many loans there are.

## ⚠️ Common Mistake

**Mixing up brackets.**

```php
$count = $member->loans->whereNull('returned_on')->count();   // works, but slow
$title = $loan->book()->title;                                // error
```

`$loan->book()` returns a **relationship object**, not a book, so `->title` fails with `Undefined property`. Use `$loan->book->title`. And `$member->loans` loads every loan before filtering in PHP. For big lists, use `$member->loans()->whereNull('returned_on')->count()`, which filters in SQL.

**Wrong foreign key name.** If the column is `student_id` instead of `member_id`, `hasMany(Loan::class)` finds nothing. Either rename the column, or pass it: `hasMany(Loan::class, 'student_id')`.

## ✍️ Try It

Create the tables and models above. In Tinker, find how many loans book 2 has, and the name of the member who borrowed it.

*Hint:* `Book::find(2)->loans->count()` and `Book::find(2)->loans->first()->member->name`.

## 📝 Recap

- One-to-many: a member has many loans; a loan belongs to one member.
- `hasMany(Loan::class)` and `belongsTo(Book::class)` define relationships, using `*_id` columns by convention.
- `$member->loans` (no brackets) gives data; `$member->loans()` (brackets) lets you add conditions.
- `casts()` can turn date columns into date objects.
- `with([...])` loads related rows in advance and avoids the N+1 problem.

## 🏆 Practice

### 🟢 Level 1: Recall
Which relationship method goes in `Loan` to reach its book, and which column does it use?

<details>
<summary>Show answer</summary>

`belongsTo(Book::class)` in a method called `book()`. It uses the `book_id` column in the `loans` table.

</details>

### 🟡 Level 2: Apply
Write code that lists the titles of all books Omar (member 2) has **not** returned yet.

<details>
<summary>Show answer</summary>

```php
$loans = Member::find(2)->loans()->whereNull('returned_on')->with('book')->get();

foreach ($loans as $loan) {
    echo $loan->book->title . "\n";
}
```

Output with the sample data:

```text
Bees and Their Hives
```

</details>

### 🔴 Level 3: Challenge
Build the **overdue loans** page planned in Chapter 2.

1. Route `/loans/overdue` → `LoanController@overdue`, named `loans.overdue`.
2. Find loans with no return date and a due date before today. (Hint: `->where('due_on', '<', today())`.)
3. Eager load the book and member, sort by due date.
4. Show "Title, borrowed by Name, due date" for each, or `No overdue books. Thank you, readers!`

<details>
<summary>Show one possible answer</summary>

```php
// app/Http/Controllers/LoanController.php
use App\Models\Loan;

public function overdue()
{
    $loans = Loan::with(['book', 'member'])
        ->whereNull('returned_on')
        ->where('due_on', '<', today())
        ->orderBy('due_on')
        ->get();

    return view('loans.overdue', ['loans' => $loans]);
}
```

```blade
{{-- resources/views/loans/overdue.blade.php --}}
@forelse ($loans as $loan)
    <p>{{ $loan->book->title }}, borrowed by {{ $loan->member->name }},
       due {{ $loan->due_on->format('d M Y') }}</p>
@empty
    <p>No overdue books. Thank you, readers!</p>
@endforelse
```

`today()` is a Laravel helper for today's date at midnight. On 16 October 2026, the sample data shows `The Story of Numbers, borrowed by Aisha Khan, due 15 Oct 2026`.

</details>
