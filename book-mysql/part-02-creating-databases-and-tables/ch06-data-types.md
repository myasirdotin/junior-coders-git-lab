# Chapter 6: SQL Data Types

> **Key Idea**: Choosing the right data type ensures storage efficiency, prevents invalid data from entering the database, and guarantees accurate mathematical calculations.

---

## 1. Why Data Types Matter

Computers treat numbers differently from text. If you store product prices as text (`"1500"`), you cannot accurately calculate total sums or averages. If you store dates as plain words (`"Next Tuesday"`), you cannot sort records chronologically.

By assigning a specific **data type** to each column, MySQL strictly enforces data validity:

```
Column: age INT
Input: 15       ──► ✅ Accepted
Input: "Fifteen"──► ❌ Rejected with Data Type Error!
```

---

## 2. Core SQL Data Types

MySQL categorizes data types into four main families:

### Family 1: Numeric Types

| Data Type | Description | Size / Range | Typical Use Case |
| :--- | :--- | :--- | :--- |
| `INT` | Standard 32-bit whole number | -2.1 billion to +2.1 billion | Record IDs, student counts, quantity |
| `BIGINT` | Large 64-bit whole number | Massive values | High-traffic transaction IDs |
| `DECIMAL(M, D)` | **Exact fixed-point decimal** | $M$ total digits, $D$ decimal places | **Financial amounts, currency, prices** |
| `FLOAT` / `DOUBLE` | Approximate floating-point numbers | Scientific floating values | Sensor readings, scientific measurements |

> ⚠️ **Financial Rule (*Halal Commerce*)**: Never use `FLOAT` or `DOUBLE` for financial pricing or charitable donations! Floats suffer from internal rounding errors (e.g., $0.1 + 0.2 = 0.30000000000000004$). Always use `DECIMAL(10, 2)` for currency to maintain exact monetary fairness and precision.

---

### Family 2: String & Text Types

| Data Type | Description | Max Length | Typical Use Case |
| :--- | :--- | :--- | :--- |
| `VARCHAR(N)` | Variable-length text up to $N$ chars | Up to 65,535 chars | Names, emails, titles, usernames |
| `CHAR(N)` | Fixed-length text | 1 to 255 chars | Country codes (`'IN'`, `'US'`), postal codes |
| `TEXT` | Long paragraph text | Up to 64 KB | Book summaries, blog article bodies |
| `LONGTEXT` | Very large text | Up to 4 GB | Complete electronic book manuscripts |

```sql
-- VARCHAR only uses as much storage as the string requires:
name VARCHAR(100) -- Storing "Aisha" uses 5 bytes + 1 length byte (6 bytes total)

-- CHAR always reserves the exact specified width:
country_code CHAR(2) -- Storing "IN" uses exactly 2 bytes
```


---

### Family 3: Date and Time Types

| Data Type | Format | Typical Use Case |
| :--- | :--- | :--- |
| `DATE` | `YYYY-MM-DD` | Date of birth, enrollment date, publication date |
| `TIME` | `HH:MM:SS` | Class start time, store opening hours |
| `DATETIME` | `YYYY-MM-DD HH:MM:SS` | Exact order timestamp, account creation time |
| `TIMESTAMP` | UTC timestamp with auto-update | `created_at`, `updated_at` system logs |

```sql
-- Automatic timestamp columns in modern tables
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
```

---

### Family 4: Boolean Type

| Data Type | Underlying Implementation | Allowed Values | Typical Use Case |
| :--- | :--- | :--- | :--- |
| `BOOLEAN` / `BOOL` | Stored internally as `TINYINT(1)` | `1` (TRUE) or `0` (FALSE) | `is_active`, `is_published`, `paid` |

---

## 3. Real-World Schema Demonstration: Ethical Organic Farm

Let's see all four families working together in an ethical farm inventory table:

```sql
CREATE TABLE IF NOT EXISTS honey_products (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    product_name   VARCHAR(120) NOT NULL,
    category       VARCHAR(50) NOT NULL DEFAULT 'Organic Honey',
    weight_grams   INT NOT NULL,
    retail_price   DECIMAL(8, 2) NOT NULL,
    harvest_date   DATE NOT NULL,
    is_in_stock    BOOLEAN NOT NULL DEFAULT TRUE,
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 4. Review & Practice

### 🟢 Level 1: Recall
1. Why is `DECIMAL(10, 2)` preferred over `FLOAT` when storing currency or Zakat amounts?
2. What date format does MySQL expect for a `DATE` column?
3. What is the difference between `VARCHAR(50)` and `CHAR(50)`?

### 🟡 Level 2: Type Selection
For each of the following real-world values, choose the most appropriate MySQL data type:
- A student's birth date (`2008-04-15`)
- A phone number (`"+91-94190-12345"`)
- Whether a book is currently borrowed (`TRUE` / `FALSE`)
- Price of an educational textbook in rupees (`1450.75`)
- The full chapter text of an encyclopedia article

### 🔴 Level 3: Design Evaluation
A developer stores phone numbers as `INT`. What two serious problems will happen when users enter phone numbers like `"+919419012345"` or numbers starting with a leading zero like `"09419012345"`?

