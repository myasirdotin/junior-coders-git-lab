# Chapter 14: CRUD with Eloquent

## 🌟 Real-Life Story

A new box of donated books arrives at the library. The librarian **adds** each one to the register. A week later she notices a spelling mistake in an author's name and **fixes** it. One book is damaged by rain, so she **removes** it from the register. Every day she **looks up** books for students. Add, look up, fix, remove: these are the four jobs of every register, and Eloquent can do all four.

## 🎯 What You Will Learn

- Create rows with `create()` and with `new` plus `save()`.
- Protect your models with the `$fillable` list (mass assignment).
- Update rows with `update()` or by changing properties and calling `save()`.
- Delete rows with `delete()` and `destroy()`.
- Change a number safely with `increment()` and `decrement()`.

## 🔄 CRUD Reminder

In Chapter 8 you met **CRUD**: Create, Read, Update, Delete. Chapter 13 covered **Read**. This chapter covers the other three. We test everything in **Tinker** first. Chapter 19 connects it to real forms.

## ➕ Create: Two Ways

### Way 1: `new` and `save()`

```php
$book = new Book;
$book->title = "A Young Gardener's Guide";
$book->author = 'Fatima Zahra';
$book->isbn = '978-0-00-000005-9';
$book->copies = 2;
$book->save();
```

In Tinker, the last line shows:

```text
= true
```

`save()` runs an SQL `INSERT`. Eloquent fills `id`, `created_at` and `updated_at` for you.

### Way 2: `create()` with an array

`create()` does it in one step. But first you must tell the model which columns may be filled this way:

```php
// app/Models/Book.php
class Book extends Model
{
    protected $fillable = ['title', 'author', 'isbn', 'copies'];
}
```

Restart Tinker (it only loads code when it starts), then:

```text
> Book::create(['title' => 'Solar Power at School', 'author' => 'Omar Farooq', 'isbn' => '978-0-00-000006-6', 'copies' => 1])
= App\Models\Book {#6231
    title: "Solar Power at School",
    author: "Omar Farooq",
    isbn: "978-0-00-000006-6",
    copies: 1,
    updated_at: "2026-10-13 09:15:42",
    created_at: "2026-10-13 09:15:42",
    id: 6,
  }
```

Your times will differ.

## 🛡️ Why `$fillable`? Mass Assignment

Filling many columns from one array is called **mass assignment**. It is handy, and a little risky. Later, `create()` will receive the array of data a visitor sent from a form. Suppose the `members` table had a column `is_librarian`. A sneaky visitor could add a hidden field `is_librarian=1` to the form. Without protection, they would become a librarian!

`$fillable` is a **guest list**. Only the columns on the list are filled by `create()` and `update()`. Anything else is ignored. Keep the list to columns a normal form should change.

## ✏️ Update: Two Ways

### Change properties, then `save()`

```text
> $book = Book::find(2)
> $book->copies = 4
> $book->save()
= true
```

(Tinker also prints the value of lines like `$book = Book::find(2)`. We leave those printouts out to keep the examples short.)

### `update()` with an array

```text
> Book::find(3)->update(['author' => 'Maryam Siddiqui-Ahmed'])
= true
```

Both run an SQL `UPDATE` and refresh `updated_at`. `update()` uses `$fillable` too.

### Counting up and down

When a member borrows a book, one copy leaves the shelf. When it returns, one comes back:

```text
> $book = Book::find(1)
> $book->decrement('copies')
= 1
> $book->copies
= 2
> $book->increment('copies')
= 1
> $book->copies
= 3
```

The `= 1` means one row changed. `decrement()` and `increment()` change the number inside the database in one step. That is safer than reading the number, changing it in PHP and saving it, because two librarians at two desks could overwrite each other.

## 🗑️ Delete

```text
> Book::find(6)->delete()
= true

> Book::destroy(5)
= 1
```

- `$book->delete()` deletes a model you already have.
- `Book::destroy(5)` deletes by id. It returns how many rows it deleted. `Book::destroy([5, 6])` deletes several.

A deleted row is gone. There is no "undo" in the database. Real apps ask "Are you sure?" before deleting.

## 🔍 Find or Create

Sometimes you want "find this row, and if it is not there, add it":

```php
$member = Member::firstOrCreate(
    ['email' => 'zainab@example.org'],      // look for this
    ['name' => 'Zainab Hussain', 'grade' => 10]  // add these if new
);
```

This needs a `Member` model and table; you will make them in Chapter 15.

## 🧭 Where CRUD Goes in the Controller

In the app, each Eloquent call lives in a resource controller method from Chapter 8:

| Action | Eloquent inside |
|--------|----------------|
| `index` | `Book::orderBy('title')->get()` |
| `show(Book $book)` | (route model binding finds it) |
| `store` | `Book::create($data)` |
| `update(Book $book)` | `$book->update($data)` |
| `destroy(Book $book)` | `$book->delete()` |

`$data` will come from a checked form. Chapters 19 and 20 build that. For example, `destroy` will be:

```php
// app/Http/Controllers/BookController.php
public function destroy(Book $book)
{
    $book->delete();

    return redirect()->route('books.index');
}
```

## ⚠️ Common Mistake

**Calling `create()` without `$fillable`.**

```text
> Book::create(['title' => 'Plants of the Valley', 'author' => 'Ali Hassan', 'isbn' => '978-0-00-000007-3'])
```

What happens:

```text
   Illuminate\Database\Eloquent\MassAssignmentException  Add [title] to fillable property to allow mass assignment on [App\Models\Book].
```

Fix: add the columns to `protected $fillable` in the model, then restart Tinker.

**Deleting with a GET link.** `<a href="/books/3/delete">Delete</a>` is dangerous. Search engines and browser previews follow links, and could delete books. Deleting must use a form that sends `DELETE` (Chapter 19).

## ✍️ Try It

In Tinker: add a book with `create()`, change its copies to 5 with `update()`, take one copy out with `decrement()`, then delete it. Check phpMyAdmin after each step.

*Hint:* save the new book in a variable first: `$b = Book::create([...])`.

## 📝 Recap

- Create with `new` + `save()`, or `Model::create([...])`.
- `$fillable` lists the columns that `create()` and `update()` may fill. It blocks sneaky extra fields.
- Update with `$model->save()` after changing properties, or `$model->update([...])`.
- `increment()` and `decrement()` change numbers safely in one step.
- Delete with `$model->delete()` or `Model::destroy($id)`; never with a GET link.

## 🏆 Practice

### 🟢 Level 1: Recall
What is mass assignment, and which model property controls it?

<details>
<summary>Show answer</summary>

Mass assignment is filling many columns at once from an array, as `create()` and `update()` do. The `$fillable` property lists which columns are allowed.

</details>

### 🟡 Level 2: Apply
Write Eloquent code that (a) finds the book with ISBN `978-0-00-000002-8`, (b) adds 3 copies to it.

<details>
<summary>Show answer</summary>

```php
$book = Book::where('isbn', '978-0-00-000002-8')->first();
$book->increment('copies', 3);
```

`increment()` takes an optional second argument: how much to add.

</details>

### 🔴 Level 3: Challenge
A box of donated books arrives.

1. Write code that adds three books in a loop from an array of arrays.
2. For each, if a book with the same ISBN already exists, add its copies instead of creating a duplicate.
3. At the end, print the total number of books with `Book::count()`.

<details>
<summary>Show one possible answer</summary>

```php
$donations = [
    ['title' => 'Clean Water for Every Village', 'author' => 'Aisha Rahman', 'isbn' => '978-0-00-000001-1', 'copies' => 2],
    ['title' => 'Rivers and Rain', 'author' => 'Sara Malik', 'isbn' => '978-0-00-000008-0', 'copies' => 1],
    ['title' => 'Kind Words', 'author' => 'Hassan Javed', 'isbn' => '978-0-00-000009-7', 'copies' => 4],
];

foreach ($donations as $item) {
    $book = Book::where('isbn', $item['isbn'])->first();

    if ($book) {
        $book->increment('copies', $item['copies']);
    } else {
        Book::create($item);
    }
}

echo Book::count();
```

The first book already exists, so its copies go up by 2. The other two are new rows.

</details>
