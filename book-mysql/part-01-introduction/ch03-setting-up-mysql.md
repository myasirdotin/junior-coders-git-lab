# Chapter 3: Setting Up MySQL & phpMyAdmin

> **Key Idea**: MySQL runs quietly in the background as a server. You talk to it in two ways: with a web page called phpMyAdmin, or by typing commands in a terminal.

---

## 🌟 Real-Life Story

A school library has a librarian who sits behind the desk all day. Students do not walk into the store room themselves. They come to the desk and ask: "Do you have *Clean Code*?" The librarian fetches the answer. The MySQL server is that librarian. It waits all day for questions, and phpMyAdmin or the terminal is the desk where you ask them.

## 🎯 What You Will Learn

- Start the MySQL server from the XAMPP Control Panel.
- Open phpMyAdmin and find its SQL tab.
- Log in to MySQL from the command line.
- Run your first three SQL commands and read their results.
- Fix the most common start-up problem: a busy port.

---

## 🟢 Starting MySQL in XAMPP

**XAMPP** is a free package that installs a web server (Apache), PHP and a database server on your computer. The database server in XAMPP is **MariaDB**, MySQL's close cousin. It understands the same SQL, so this book calls it "MySQL".

```
XAMPP Control Panel
┌─────────┬─────────┬────────┬───────┐
│ Module  │ Status  │ Action │ Port  │
├─────────┼─────────┼────────┼───────┤
│ Apache  │ Running │ Stop   │ 80    │
│ MySQL   │ Running │ Stop   │ 3306  │
└─────────┴─────────┴────────┴───────┘
```

Steps:

1. Open the **XAMPP Control Panel** from the Start menu.
2. Click **Start** next to **Apache** (phpMyAdmin needs it).
3. Click **Start** next to **MySQL**.
4. The name turns green and shows port **3306**.

A **port** is a numbered door on your computer. Each server program listens at its own door. MySQL's usual door is 3306.

---

## 🖥️ Using phpMyAdmin

**phpMyAdmin** is a web page for managing MySQL with buttons and forms.

1. Open your browser and go to `http://localhost/phpmyadmin`
2. On the **left** you see a tree of databases.
3. Along the **top** are tabs: **Databases**, **SQL**, **Status**, **Export**, **Import** and more.
4. The **SQL** tab has a big text box. Type a command and press **Go**.

```
phpMyAdmin
┌──────────────────────────────────────┐
│ Databases  SQL  Export  Import       │
├────────────┬─────────────────────────┤
│ school_db  │ SELECT NOW();           │
│  ├ books   │                         │
│  └ students│                  [ Go ] │
└────────────┴─────────────────────────┘
```

Throughout this book, **"run this in phpMyAdmin"** means: open the SQL tab, paste the command, press Go.

---

## ⌨️ Using the Command Line

The **command line** (or **CLI**, command-line interface) is a text window where you type commands. Many developers prefer it because it is fast.

1. In the XAMPP Control Panel, click **Shell** on the right.
2. Type this and press **Enter**:

   ```bash
   mysql -u root -p
   ```

   `-u root` means "log in as the user called root". `-p` means "ask me for a password".
3. At `Enter password:` just press **Enter**. A fresh XAMPP has no password for `root`.
4. You now see the MySQL prompt:

   ```
   MariaDB [(none)]>
   ```

   `(none)` means you have not picked a database yet. You will do that in Chapter 4.

To leave, type `exit` and press Enter.

> 🔐 **Amānah note:** "root with no password" is only safe on your own practice computer. A real server must always have a strong password.

---

## 🧪 Your First SQL Commands

Type each command and press Enter. Every SQL **statement** (one complete command) ends with a semicolon `;`.

### ➗ Do a sum

```sql
SELECT 7 * 6;
```

| 7 * 6 |
| ---: |
| 42 |

`SELECT` asks the server to give something back. Here it is just a calculation.

### 👤 Who am I?

```sql
SELECT CURRENT_USER();
```

| CURRENT_USER() |
| :--- |
| root@localhost |

You are the `root` user, connected from this same computer (`localhost`).

### 📚 Which databases exist?

```sql
SHOW DATABASES;
```

On a fresh XAMPP you will see something like:

| Database |
| :--- |
| information_schema |
| mysql |
| performance_schema |
| phpmyadmin |
| test |

These are **system databases** the server uses for itself. Do not delete them. Your own `school_db` will join this list in the next chapter.

You can also try `SELECT NOW();`. It shows the server's current date and time, so your answer will be different from anyone else's.

> 🧪 **Sandbox note:** The site's SQL Sandbox uses SQLite, not MySQL. `SELECT 7 * 6;` works there, but `SHOW DATABASES` and `CURRENT_USER()` do not.

---

## ⚠️ Common Mistake

**Mistake 1: forgetting the semicolon.**

```
MariaDB [(none)]> SELECT 7 * 6
    ->
```

What happens: MySQL shows `->` and waits. It thinks your command continues on the next line.

**Fix:** type `;` and press Enter. The command runs.

**Mistake 2: "Port 3306 in use by another program."**

What happens: MySQL turns red and stops. Another program is already using door 3306. Often it is a second copy of MySQL installed earlier.

**Fix:** close the other database program (or stop its Windows service). Then press Start again.

---

## ✍️ Try It

1. Start Apache and MySQL in XAMPP.
2. Open phpMyAdmin, click the **SQL** tab, and run `SELECT 12 * 12;`
3. Then run `SHOW DATABASES;` and count the databases.

*Hint: if the page does not load, check that Apache is green, not only MySQL.*

---

## 📝 Recap

- XAMPP's database server is MariaDB, which speaks the same SQL as MySQL.
- Start it in the XAMPP Control Panel; it listens on port 3306.
- phpMyAdmin (`http://localhost/phpmyadmin`) lets you run SQL in a browser.
- `mysql -u root -p` opens the command line.
- Every SQL statement ends with `;`.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. What port does MySQL use by default?
2. What address opens phpMyAdmin in XAMPP?
3. What must end every SQL statement?

<details>
<summary>Show answer</summary>

1. **3306**
2. `http://localhost/phpmyadmin`
3. A semicolon `;`

</details>

### 🟡 Level 2: Apply
Log in with the command line and run `SHOW DATABASES;`. Name three system databases you see. What does the prompt `MariaDB [(none)]>` tell you?

<details>
<summary>Show answer</summary>

Any three of: `information_schema`, `mysql`, `performance_schema`, `phpmyadmin`, `test`.

`(none)` means no database is selected yet. The prompt shows the current database inside the square brackets.

</details>

### 🔴 Level 3: Challenge
A student clicks **Start** next to MySQL. It turns red and the log says *"Port 3306 in use by another program"*.

1. Explain in one sentence what this means.
2. List two things the student could check.
3. Why should a real school server never keep "root with no password"?

<details>
<summary>Show one possible answer</summary>

1. Another program is already listening on port 3306, so MySQL cannot use it.
2. Check whether another MySQL or MariaDB is installed and running (for example, as a Windows service), and stop it. Or check Task Manager for a running `mysqld.exe` and close it.
3. Anyone who can reach the server could read or delete every record. Student data is an *Amānah*, so it must be protected with a strong password.

</details>
