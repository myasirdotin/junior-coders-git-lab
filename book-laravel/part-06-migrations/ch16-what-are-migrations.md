# Chapter 16: What are Migrations?

## 🌟 Real-Life Story

When the library rearranges its shelves, the head librarian writes each change in a **logbook**: "Monday: added a shelf for science magazines. Tuesday: moved poetry to room 2." A new helper can read the logbook from the first page and set up an identical library somewhere else. If a change was a mistake, the logbook also says how to undo it. **Migrations** are that logbook for your database.

## 🎯 What You Will Learn

- Explain what a migration is and why teams use them.
- Read a migration file and its `up()` and `down()` methods.
- Run migrations and check their status with Artisan.
- Undo the last batch with `migrate:rollback`.
- Know which commands delete data, and use them with care.

## 🤔 The Problem with Clicking

In Chapters 13 and 15 you created tables by running SQL in phpMyAdmin. That works on **your** computer. Now imagine:

- Your teammate downloads the project. Their database is empty. Which SQL should they run, and in what order?
- You add a `shelf` column next week. How does everyone else find out?
- The school puts the app on a real server. Someone must repeat every click exactly.

Clicks and pasted SQL leave no record. Mistakes creep in.

## 📒 What is a Migration?

A **migration** is a PHP file that describes **one change** to the database: create a table, add a column, rename something. Migrations live in `database/migrations/`, and they are saved with the rest of your code in Git.

Anyone can rebuild the whole database with one command:

```bash
php artisan migrate
```

Think of migrations as **version control for your database**. Git tracks changes to code; migrations track changes to tables.

## 🔍 Read a Real Migration

Laravel already gave you some. Open `database/migrations/0001_01_01_000000_create_users_table.php` (the first part is shown, shortened):

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
```

| Part | Meaning |
|------|---------|
| File name | A date-time stamp, then a description. The stamp sets the **order** |
| `return new class extends Migration` | An **anonymous class**: a class with no name, used once |
| `up()` | What to do: create the `users` table |
| `down()` | How to undo it: drop the table |
| `Schema::create('users', ...)` | Make a new table called `users` |
| `$table->id()` | An auto-increment `BIGINT UNSIGNED` primary key called `id` |
| `$table->string('name')` | A `VARCHAR(255)` column |
| `->unique()` | No two rows may share this value |
| `->nullable()` | The column may be empty (`NULL`) |
| `$table->timestamps()` | The `created_at` and `updated_at` columns |

Compare it with the SQL you wrote in Chapter 13. It is the same idea, written in PHP. Laravel turns it into the right SQL for MySQL, SQLite and other databases.

## 🧾 How Laravel Remembers

When you ran `php artisan migrate` in Chapter 3, Laravel made a table called `migrations`. It records every migration that has run, and in which **batch** (group run together):

| id | migration | batch |
|----|-----------|-------|
| 1 | `0001_01_01_000000_create_users_table` | 1 |
| 2 | `0001_01_01_000001_create_cache_table` | 1 |
| 3 | `0001_01_01_000002_create_jobs_table` | 1 |

Next time you run `migrate`, Laravel skips those and only runs **new** files. That is why it is safe to run `migrate` again and again.

## 🧰 The Main Commands

Check what has run:

```bash
php artisan migrate:status
```

Output (dots and spacing depend on your window):

```text
  Migration name .................................. Batch / Status
  0001_01_01_000000_create_users_table ................... [1] Ran
  0001_01_01_000001_create_cache_table ................... [1] Ran
  0001_01_01_000002_create_jobs_table .................... [1] Ran
```

A file that has not run yet shows `Pending`.

| Command | What it does | Deletes data? |
|---------|--------------|---------------|
| `migrate` | Run new migrations | No |
| `migrate:status` | List each migration and whether it ran | No |
| `migrate:rollback` | Run `down()` for the **last batch** | Yes, for those tables |
| `migrate:rollback --step=1` | Undo only the last single migration | Yes, for that table |
| `migrate:refresh` | Roll back everything, then migrate again | **Yes, all** |
| `migrate:fresh` | **Drop every table**, then migrate | **Yes, all** |

### Rolling back

```bash
php artisan migrate:rollback
```

Output (times will differ):

```text
   INFO  Rolling back migrations.

  0001_01_01_000002_create_jobs_table .................. 21.45ms DONE
  0001_01_01_000001_create_cache_table .................. 9.87ms DONE
  0001_01_01_000000_create_users_table ................. 18.02ms DONE
```

All three ran in batch 1, so all three are undone, newest first. Run `php artisan migrate` to bring them back (empty).

## 🛡️ Data is a Trust (*Amānah*)

`migrate:fresh` and `migrate:refresh` delete **every row** in your database. On your practice computer, that is fine; you can add sample data again (Chapter 18). On a real school server, those rows are real members' records. Losing them breaks a trust. Before any command that deletes data:

1. Check **which** database `.env` points to.
2. Make a backup (phpMyAdmin → Export).
3. Never run `migrate:fresh` on a live server.

Laravel helps: when `APP_ENV=production`, it asks you to confirm before running destructive migration commands.

## ⚠️ Common Mistake

**Editing a migration that already ran.**

You open `create_users_table.php`, add `$table->string('phone');` and run `php artisan migrate`. The output is:

```text
   INFO  Nothing to migrate.
```

Laravel sees the file in the `migrations` table and skips it. Your new column never appears. Your teammates have the same problem. The rule: **once a migration has run and been shared, never edit it. Write a new migration** that adds the column (Chapter 17).

(On your own practice project, before sharing, `migrate:rollback` and then `migrate` is fine.)

## ✍️ Try It

Run `php artisan migrate:status`, then `php artisan migrate:rollback`, then `migrate:status` again. What changed? Finish with `php artisan migrate`.

*Hint:* after the rollback, the status column shows `Pending`.

## 📝 Recap

- A migration is a PHP file that describes one change to the database, kept in `database/migrations/`.
- `up()` makes the change; `down()` undoes it.
- The `migrations` table remembers what has run, in batches.
- `migrate` runs new files; `migrate:rollback` undoes the last batch.
- `migrate:fresh` and `migrate:refresh` delete all data: back up first, never on a live server.
- Never edit a migration that has run and been shared; write a new one.

## 🏆 Practice

### 🟢 Level 1: Recall
What is the job of `up()` and of `down()` in a migration?

<details>
<summary>Show answer</summary>

`up()` makes the change, such as creating a table. `down()` undoes it, such as dropping that table. `migrate` runs `up()`; `migrate:rollback` runs `down()`.

</details>

### 🟡 Level 2: Apply
Your teammate runs `php artisan migrate` and sees `Nothing to migrate.`, but the new `phone` column is missing. What went wrong, and what should they do?

<details>
<summary>Show answer</summary>

Someone edited an old migration that had already run, so Laravel skipped it. They should undo that edit and create a **new** migration that adds the `phone` column, then run `php artisan migrate`.

</details>

### 🔴 Level 3: Challenge
Write a short "Database Safety Card" for your class, in five steps, for anyone about to change the library database on the school server.

<details>
<summary>Show one possible answer</summary>

1. Check `.env`: which database am I connected to?
2. Export a backup in phpMyAdmin and keep it safe.
3. Run `php artisan migrate:status` to see what will run.
4. Only use `php artisan migrate` on the server. Never `migrate:fresh` or `migrate:refresh`.
5. Check the app afterwards. If something broke, `migrate:rollback --step=1` and restore the backup if needed.

</details>
