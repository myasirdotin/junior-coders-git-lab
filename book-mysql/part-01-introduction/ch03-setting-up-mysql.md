# Chapter 3: Setting Up MySQL & phpMyAdmin

> **Key Idea**: MySQL runs in the background as a server daemon. You can interact with it using either a graphic user interface (like phpMyAdmin) or directly via the command-line interface (CLI).

---

## 1. Starting the MySQL Service in XAMPP

Since you are learning web development with a standard local stack, **XAMPP** bundles Apache, PHP, and MySQL together.

```
┌────────────────────────────────────────────────────────┐
│               XAMPP Control Panel                      │
├──────────────┬────────────┬─────────────┬──────────────┤
│ Module       │ Status     │ Actions     │ Ports        │
├──────────────┼────────────┼─────────────┼──────────────┤
│ Apache       │ Running    │ [Stop]      │ 80, 443      │
│ MySQL        │ Running    │ [Stop]      │ 3306         │
└──────────────┴────────────┴─────────────┴──────────────┘
```

### Steps to Start MySQL:
1. Open the **XAMPP Control Panel** from your Windows Start menu.
2. Next to **MySQL**, click the green **Start** button.
3. Once running, the text will turn green and display port **3306** (the default communication port for MySQL).

---

## 2. Using phpMyAdmin (Web Graphical Interface)

**phpMyAdmin** is a full-featured web-based dashboard for managing MySQL databases visually without typing CLI terminal commands:

1. Open your web browser and navigate to:
   ```
   http://localhost/phpmyadmin
   ```
2. You will see:
   - **Left Sidebar**: A tree listing all existing databases (`information_schema`, `mysql`, `phpmyadmin`, `test`).
   - **Top Navigation Tabs**: **Databases**, **SQL**, **Status**, **Export**, **Import**, **Settings**.
   - **SQL Tab**: An interactive editor where you can type raw SQL queries and execute them with the **Go** button.

```
phpMyAdmin Web Interface:
┌──────────────────────────────────────────────────────────────┐
│ [Databases]  [SQL]  [Status]  [Users]  [Export]  [Import]    │
├─────────────────┬────────────────────────────────────────────┤
│ 📁 school_db    │ Run SQL query/queries on server "localhost"│
│  ├── 📄 students│ SELECT * FROM students;                    │
│  └── 📄 courses │                                            │
│ 📁 mysql        │                                            │
│                 │                                   [ Go ]   │
└─────────────────┴────────────────────────────────────────────┘
```

---

## 3. Using the MySQL Command-Line Interface (CLI)

Real developers, DevOps engineers, and server administrators frequently use the command-line shell to manage databases quickly.

To open the MySQL CLI in XAMPP:
1. In the XAMPP Control Panel, click the **Shell** button on the right side.
2. Type the following command and press **Enter**:
   ```bash
   mysql -u root -p
   ```
3. When prompted for `Enter password:`, simply press **Enter** (by default, fresh XAMPP local installations have no password for the `root` administrative user).
4. You will see the MySQL command prompt:
   ```sql
   MariaDB [(none)]>
   ```

---

## 4. Your First Interactive SQL Commands

Let's test our connection with three standard diagnostic commands:

```sql
-- 1. View the current date and time on the database server
SELECT NOW();

-- 2. View which user is currently logged in
SELECT CURRENT_USER();

-- 3. View the list of all databases currently on this server
SHOW DATABASES;
```

> 💡 **Important Rule**: In SQL, statements terminate with a semicolon (`;`). If you forget the semicolon, MySQL will assume you are continuing onto a new line and show `->`. Type `;` and press Enter to complete the command.

---

## 5. Review & Hands-On Practice

### 🟢 Level 1: Recall
1. What is the default networking port number used by MySQL?
2. What URL do you type in your browser to open phpMyAdmin in XAMPP?
3. What punctuation mark must be placed at the end of every SQL statement?

### 🟡 Level 2: Command Practice
Log into the MySQL CLI and execute `SHOW DATABASES;`. List three default system databases that appear in the output list.

### 🔴 Level 3: Troubleshooting Scenario
A student clicks **Start** next to MySQL in XAMPP, but it turns red and immediately shuts down with the message: *"Port 3306 in use by another program"*. 
What does this mean, and what would you check to resolve this conflict?
