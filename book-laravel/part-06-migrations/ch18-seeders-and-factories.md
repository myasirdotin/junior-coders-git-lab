# Chapter 18: Seeders & Factories

## 🌟 Real-Life Story

Before a new library opens, the staff practise. They fill the shelves with **practice books**, make **sample library cards** for pretend members, and rehearse lending them. That way they can test the system before real students arrive. Seeders and factories do the same for your app. They fill an empty database with sample data in seconds, so you can test every page.

## 🎯 What You Will Learn

- Explain the difference between a **seeder** and a **factory**.
- Write a seeder that adds fixed rows, and run it with `db:seed`.
- Write a factory that makes many realistic fake rows with `fake()`.
- Call seeders from `DatabaseSeeder` and rebuild everything with `migrate:fresh --seed`.
- Keep sample data honest and free of real people's details.

## 🌱 Seeders and Factories

| Tool | What it does | Library example |
|------|--------------|-----------------|
| **Seeder** | A class that puts rows into the database | "Add these 4 known books" |
| **Factory** | A recipe for making **one** fake row, used many times | "Make 30 pretend members" |

Seeders often **use** factories: "make 20 books using the book recipe."

## 📗 A Seeder with Fixed Rows

```bash
php artisan make:seeder BookSeeder
```

Output:

```text
   INFO  Seeder [C:\xampp\htdocs\library-app\database\seeders\BookSeeder.php] created successfully.
```

Fill in `run()`:

```php
// database/seeders/BookSeeder.php
namespace Database\Seeders;

use App\Models\Book;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    public function run(): void
    {
        Book::create(['title' => 'Clean Water for Every Village', 'author' => 'Aisha Rahman', 'isbn' => '978-0-00-000001-1', 'copies' => 3]);
        Book::create(['title' => 'The Story of Numbers', 'author' => 'Yusuf Ali Khan', 'isbn' => '978-0-00-000002-8', 'copies' => 0]);
        Book::create(['title' => 'Bees and Their Hives', 'author' => 'Maryam Siddiqui', 'isbn' => '978-0-00-000003-5', 'copies' => 1]);
        Book::create(['title' => 'Stars Over the Desert', 'author' => 'Hamza Qureshi', 'isbn' => '978-0-00-000004-2', 'copies' => 2]);
    }
}
```

`create()` works because `Book` has `$fillable` (Chapter 14). Run just this seeder:

```bash
php artisan db:seed --class=BookSeeder
```

Output:

```text
   INFO  Seeding database.
```

Check in Tinker: `Book::count()` gives `= 4`.

## 🏭 A Factory for Many Rows

Typing 30 members by hand is slow. A **factory** describes what one member looks like, using **fake** values:

```bash
php artisan make:factory MemberFactory
```

```php
// database/factories/MemberFactory.php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class MemberFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'grade' => fake()->numberBetween(6, 10),
        ];
    }
}
```

`fake()` gives you **Faker**, a tool that invents realistic data:

| Code | Example value |
|------|---------------|
| `fake()->name()` | `Lina Hart` |
| `fake()->safeEmail()` | `lina.hart@example.org` |
| `fake()->numberBetween(6, 10)` | `8` |
| `fake()->sentence(4)` | `Quia et sunt autem.` |
| `fake()->isbn13()` | `9781234567897` |
| `fake()->dateTimeBetween('-1 month')` | a date in the last month |

The values are random, so yours will differ. `unique()` makes sure no two members get the same email. `safeEmail()` only uses example domains, so no real inbox ever receives mail from your tests.

### Let the model use its factory

Add the `HasFactory` trait to the model. (A **trait** is a bundle of methods you can add to a class; you met it in PHP OOP.)

```php
// app/Models/Member.php
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Member extends Model
{
    use HasFactory;

    // ... $fillable and loans() as before
}
```

Laravel finds `MemberFactory` by its name. Try it in Tinker:

```text
> Member::factory()->count(3)->create()->pluck('grade')
= Illuminate\Support\Collection {#6340
    all: [
      9,
      6,
      10,
    ],
  }
```

(Your grades will differ.) `make()` instead of `create()` builds the objects **without** saving them, which is handy for tests.

You can fix some values and leave the rest random:

```php
Member::factory()->count(5)->create(['grade' => 10]);
```

## 🧺 `DatabaseSeeder`: Run Everything

`database/seeders/DatabaseSeeder.php` is the main seeder. `php artisan db:seed` runs it. Make it call the others in the right order:

```php
// database/seeders/DatabaseSeeder.php
use App\Models\Book;
use App\Models\Loan;
use App\Models\Member;

public function run(): void
{
    $this->call(BookSeeder::class);        // 4 known books

    Member::factory()->count(30)->create(); // 30 pretend members

    // 10 sample loans, each for a random book and member
    for ($i = 0; $i < 10; $i++) {
        Loan::create([
            'book_id' => Book::inRandomOrder()->first()->id,
            'member_id' => Member::inRandomOrder()->first()->id,
            'borrowed_on' => now()->subDays(10),
            'due_on' => now()->addDays(4),
        ]);
    }
}
```

`inRandomOrder()->first()` picks one random row. `now()->subDays(10)` means "10 days ago".

(Laravel's starter `DatabaseSeeder` also makes one test user. You can keep that part; you will need a user in Part 8.)

## 🔄 Start Fresh with Sample Data

While building, you often want a clean database full of sample data. One command does it:

```bash
php artisan migrate:fresh --seed
```

It **drops every table**, runs all migrations, then runs `DatabaseSeeder`. Output (shortened, times differ):

```text
  Dropping all tables .................................. 92.40ms DONE

   INFO  Preparing database.

  Creating migration table ............................. 14.02ms DONE

   INFO  Running migrations.

  0001_01_01_000000_create_users_table ................. 40.11ms DONE
  ...

   INFO  Seeding database.

  Database\Seeders\BookSeeder ............................ RUNNING
  Database\Seeders\BookSeeder ........................ 12.84 ms DONE
```

Remember Chapter 16: this deletes all data. Use it only on your practice database.

## 🤝 Honest Sample Data (*Amānah*)

- **Never seed real people.** Do not copy your classmates' names, emails or phone numbers into a seeder. Seeders live in Git, and Git is shared. Use `fake()` or clearly made-up names.
- **Label it.** If you show the app to your teacher with sample data, say that it is sample data.
- **Keep it out of real servers.** Seeders that make fake members are for practice databases only.

## ⚠️ Common Mistake

**Forgetting `HasFactory` on the model.**

```text
> Member::factory()->count(3)->create()
   BadMethodCallException  Call to undefined method App\Models\Member::factory().
```

Fix: add `use HasFactory;` inside the class and the matching `use` line at the top. Then restart Tinker.

**Unique fields without `unique()`.** If the factory used `fake()->safeEmail()` without `unique()`, two members might get the same email. The database's `unique` rule would stop the seeder with `Integrity constraint violation: 1062 Duplicate entry`.

## ✍️ Try It

Write `BookSeeder` and `MemberFactory`, update `DatabaseSeeder`, then run `php artisan migrate:fresh --seed`. Check how many rows each table has in phpMyAdmin.

*Hint:* you should see 4 books, 30 members and 10 loans (plus the test user).

## 📝 Recap

- A **seeder** puts rows into the database; a **factory** is a recipe for one fake row.
- `php artisan db:seed` runs `DatabaseSeeder`; `--class=BookSeeder` runs one seeder.
- `fake()` makes realistic random values; `unique()` avoids duplicates.
- Models need `use HasFactory;` to use `Model::factory()`.
- `php artisan migrate:fresh --seed` rebuilds everything with sample data. Practice databases only.

## 🏆 Practice

### 🟢 Level 1: Recall
What is the difference between `Member::factory()->make()` and `Member::factory()->create()`?

<details>
<summary>Show answer</summary>

`make()` builds a `Member` object but does **not** save it. `create()` builds it **and** saves it to the database.

</details>

### 🟡 Level 2: Apply
Write a `BookFactory` `definition()` that makes a title of three words with capital letters, a fake name as author, a unique ISBN-13, and 0 to 5 copies.

<details>
<summary>Show answer</summary>

```php
// database/factories/BookFactory.php
public function definition(): array
{
    return [
        'title' => ucwords(fake()->words(3, true)),
        'author' => fake()->name(),
        'isbn' => fake()->unique()->isbn13(),
        'copies' => fake()->numberBetween(0, 5),
    ];
}
```

`words(3, true)` returns the words as one string; `ucwords()` capitalises each word. Remember `use HasFactory;` in `Book`.

</details>

### 🔴 Level 3: Challenge
Make the sample data more realistic.

1. Use `BookFactory` to add 20 more books after the 4 known ones.
2. Make 25 student members, plus 5 staff members. Staff have no grade, so give them grade `0` to mean "staff".
3. Make 15 loans where about a third are already returned.
4. Rebuild with `migrate:fresh --seed`.

<details>
<summary>Show one possible answer</summary>

```php
// database/seeders/DatabaseSeeder.php
public function run(): void
{
    $this->call(BookSeeder::class);
    Book::factory()->count(20)->create();

    Member::factory()->count(25)->create();
    Member::factory()->count(5)->create(['grade' => 0]);   // staff

    for ($i = 1; $i <= 15; $i++) {
        $borrowed = now()->subDays(fake()->numberBetween(1, 20));

        Loan::create([
            'book_id' => Book::inRandomOrder()->first()->id,
            'member_id' => Member::inRandomOrder()->first()->id,
            'borrowed_on' => $borrowed,
            'due_on' => $borrowed->copy()->addDays(14),
            'returned_on' => $i % 3 === 0 ? now() : null,
        ]);
    }
}
```

Every third loan (`$i % 3 === 0`) is marked as returned, so 5 of the 15 are returned. `copy()` makes a separate date, so adding 14 days does not change `$borrowed`. A clearer design for staff would be a separate `role` column; you could add it with a migration.

</details>
