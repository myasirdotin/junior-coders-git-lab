# Chapter 17: Creating Migrations

## 🌟 Real-Life Story

A carpenter is asked to build the same bookshelf for five schools. He does not guess each time. He writes a **plan**: "Three shelves, each 90 cm wide, the top one for large atlases." Any carpenter can follow the plan and build an identical shelf. When a school later asks for a fourth shelf, he writes a **new note** on the plan instead of rubbing out the old one. You are now going to write the plans for your library's tables.

## 🎯 What You Will Learn

- Create a migration with `php artisan make:migration`.
- Choose column types and modifiers such as `nullable()`, `default()` and `unique()`.
- Link tables with `foreignId()->constrained()`.
- Add a column to an existing table with a new migration.
- Create a model and its migration together with `make:model -m`.

## 🧹 First: Remove the Hand-Made Tables

In Part 5 you created `books`, `members` and `loans` by hand. Now migrations will create them, so remove the old ones. In phpMyAdmin, run this on your **practice** database (loans first, because it points to the other two):

```sql
DROP TABLE loans;
DROP TABLE members;
DROP TABLE books;
```

Your models stay. They do not care how a table was made.

## 🛠️ Make a Migration

```bash
php artisan make:migration create_books_table
```

Output (your date and time will differ):

```text
   INFO  Migration [C:\xampp\htdocs\library-app\database\migrations\2026_10_13_101500_create_books_table.php] created successfully.
```

Laravel reads the name `create_books_table` and guesses you want to create a table called `books`. The new file already contains `Schema::create('books', ...)` with `id()` and `timestamps()`. Fill in the columns:

```php
// database/migrations/2026_10_13_101500_create_books_table.php
public function up(): void
{
    Schema::create('books', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->string('author');
        $table->string('isbn', 20)->unique();
        $table->unsignedInteger('copies')->default(1);
        $table->timestamps();
    });
}

public function down(): void
{
    Schema::dropIfExists('books');
}
```

## 📐 Column Types

| Method | MySQL type | Library example |
|--------|-----------|-----------------|
| `id()` | BIGINT UNSIGNED, auto-increment, primary key | `id` |
| `string('title')` | VARCHAR(255) | title, author, email |
| `string('isbn', 20)` | VARCHAR(20) | a shorter text |
| `text('summary')` | TEXT | a long description |
| `integer('pages')` | INT | number of pages |
| `unsignedInteger('copies')` | INT UNSIGNED (no negatives) | copies |
| `unsignedTinyInteger('grade')` | TINYINT UNSIGNED (0–255) | grade |
| `boolean('is_reference')` | TINYINT(1) | true or false |
| `date('due_on')` | DATE | due date |
| `timestamps()` | two TIMESTAMP columns | `created_at`, `updated_at` |

### Modifiers

Add a **modifier** after the type to change a column's rules:

| Modifier | Meaning |
|----------|---------|
| `->nullable()` | The column may be empty (`NULL`) |
| `->default(1)` | The value to use when none is given |
| `->unique()` | No two rows may share this value |
| `->after('author')` | Place the column after another (MySQL only) |

## 👥 The Members Table

```bash
php artisan make:migration create_members_table
```

```php
Schema::create('members', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('email')->unique();
    $table->unsignedTinyInteger('grade');
    $table->timestamps();
});
```

## 🔗 The Loans Table and Foreign Keys

```bash
php artisan make:migration create_loans_table
```

```php
Schema::create('loans', function (Blueprint $table) {
    $table->id();
    $table->foreignId('book_id')->constrained();
    $table->foreignId('member_id')->constrained();
    $table->date('borrowed_on');
    $table->date('due_on');
    $table->date('returned_on')->nullable();
    $table->timestamps();
});
```

`foreignId('book_id')` makes a BIGINT UNSIGNED column. `constrained()` adds a **foreign key** to the `books` table. Laravel guesses the table from the column name: `book_id` → `books`. Now MySQL refuses a loan for a book that does not exist, and refuses to delete a book that still has loans. That protects your records.

(If you wanted a book's loans deleted together with the book, you would add `->cascadeOnDelete()`. For library records, refusing is safer.)

### Order matters

`loans` points to `books` and `members`, so those must exist first. Migrations run in the order of their date stamps. Because you made `loans` last, it runs last. 

## ▶️ Run Them

```bash
php artisan migrate
```

Output (names and times will differ):

```text
   INFO  Running migrations.

  2026_10_13_101500_create_books_table ................. 28.40ms DONE
  2026_10_13_101622_create_members_table ............... 25.13ms DONE
  2026_10_13_101745_create_loans_table ................. 61.77ms DONE
```

Open phpMyAdmin: the three tables are back, empty. Chapter 18 fills them.

## ➕ Changing a Table Later

The library now wants to store each book's **shelf** code, like `B3`. Do not edit the old migration (Chapter 16 explained why). Write a new one:

```bash
php artisan make:migration add_shelf_to_books_table
```

The name ends in `to_books_table`, so Laravel uses `Schema::table('books', ...)`, which **changes** an existing table:

```php
public function up(): void
{
    Schema::table('books', function (Blueprint $table) {
        $table->string('shelf', 10)->nullable()->after('author');
    });
}

public function down(): void
{
    Schema::table('books', function (Blueprint $table) {
        $table->dropColumn('shelf');
    });
}
```

The new column is `nullable()` because existing books have no shelf code yet. Run `php artisan migrate` again. Only the new migration runs. Remember to add `'shelf'` to the `$fillable` list in `Book.php`.

## ⚡ Model and Migration Together

For the next new table, make both in one go:

```bash
php artisan make:model Donation -m
```

Output:

```text
   INFO  Model [C:\xampp\htdocs\library-app\app\Models\Donation.php] created successfully.

   INFO  Migration [C:\xampp\htdocs\library-app\database\migrations\2026_10_13_102210_create_donations_table.php] created successfully.
```

`-m` means "also make a migration". Laravel names the table `donations` for you.

## ⚠️ Common Mistake

**Creating the loans migration before the books migration.**

If `create_loans_table` has an earlier date stamp than `create_books_table`, `migrate` stops with an error. XAMPP's database (MariaDB) says something like:

```text
SQLSTATE[HY000]: General error: 1005 Can't create table `library_app`.`loans` (errno: 150 "Foreign key constraint is incorrectly formed")
```

(MySQL 8 words it differently: `Failed to open the referenced table 'books'`.)

The foreign key points to a table that does not exist yet. Fix it by renaming the loans file so its date stamp is **later** than the books and members files, then run `php artisan migrate` again.

**Forgetting `down()`.** If `down()` is empty, `migrate:rollback` says DONE but the column stays. Always write the opposite of `up()`.

## ✍️ Try It

Drop the hand-made tables, write the three migrations above, and run `php artisan migrate`. Then add the `shelf` column with a second migration and check it in phpMyAdmin.

*Hint:* `php artisan migrate:status` shows which files ran.

## 📝 Recap

- `php artisan make:migration create_books_table` makes a migration file for a new table.
- Columns: `string`, `text`, `integer`, `unsignedInteger`, `boolean`, `date`, `timestamps`; modifiers: `nullable`, `default`, `unique`.
- `foreignId('book_id')->constrained()` links to `books.id` and protects your records.
- Add columns later with a new `add_..._to_books_table` migration and `Schema::table`.
- `php artisan make:model Name -m` makes a model and its migration together.

## 🏆 Practice

### 🟢 Level 1: Recall
Which method creates a new table, and which changes an existing one?

<details>
<summary>Show answer</summary>

`Schema::create('table', ...)` creates a new table. `Schema::table('table', ...)` changes an existing one.

</details>

### 🟡 Level 2: Apply
Write the `up()` method for an `add_pages_to_books_table` migration: a whole-number `pages` column that may be empty, placed after `copies`. Then write `down()`.

<details>
<summary>Show answer</summary>

```php
public function up(): void
{
    Schema::table('books', function (Blueprint $table) {
        $table->unsignedInteger('pages')->nullable()->after('copies');
    });
}

public function down(): void
{
    Schema::table('books', function (Blueprint $table) {
        $table->dropColumn('pages');
    });
}
```

</details>

### 🔴 Level 3: Challenge
The library accepts **book donations** from families and records them.

1. Make the `Donation` model and migration with one command.
2. Columns: `donor_name`, an optional `donor_email`, `book_id` linked to `books`, `quantity` (at least 1 by default), `received_on` (a date), timestamps.
3. Write `down()`.
4. Add a `donations()` relationship to `Book` and a `book()` relationship to `Donation`.

<details>
<summary>Show one possible answer</summary>

```bash
php artisan make:model Donation -m
```

```php
// database/migrations/..._create_donations_table.php
public function up(): void
{
    Schema::create('donations', function (Blueprint $table) {
        $table->id();
        $table->string('donor_name');
        $table->string('donor_email')->nullable();
        $table->foreignId('book_id')->constrained();
        $table->unsignedInteger('quantity')->default(1);
        $table->date('received_on');
        $table->timestamps();
    });
}

public function down(): void
{
    Schema::dropIfExists('donations');
}
```

```php
// app/Models/Book.php
public function donations(): HasMany
{
    return $this->hasMany(Donation::class);
}

// app/Models/Donation.php
public function book(): BelongsTo
{
    return $this->belongsTo(Book::class);
}
```

</details>
