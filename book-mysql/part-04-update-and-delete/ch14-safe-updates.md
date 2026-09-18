# Chapter 14: Safe Updates, Transactions & Data Protection

> **Key Idea**: Data is a trust (*Amānah*). Database transactions guarantee that multiple linked changes either succeed together completely or fail together without leaving corrupted records.

---

## 1. What is a Database Transaction?

Imagine you are transferring Rs 1,000 from a school library fund into a book-purchasing account:
1. **Step 1**: Deduct Rs 1,000 from `Account A`.
2. **Step 2**: Add Rs 1,000 to `Account B`.

What happens if a power failure or network crash occurs right after Step 1?
- Rs 1,000 vanished from Account A, but never arrived at Account B! The financial record is corrupted.

A **Transaction** bundles multiple SQL operations into a single atomic unit:
- If all steps succeed: **`COMMIT`** (Permanently save changes).
- If any step fails: **`ROLLBACK`** (Revert everything back to the exact moment before the transaction started).

```
┌────────────────────────────────────────────────────────┐
│                   START TRANSACTION;                   │
├────────────────────────────────────────────────────────┤
│ 1. UPDATE accounts SET balance = balance - 1000 ...   │
│ 2. UPDATE accounts SET balance = balance + 1000 ...   │
├────────────────────────────────────────────────────────┤
│   If Successful: COMMIT;   │   If Error: ROLLBACK;     │
│   (Saved permanently)      │   (Zero money is lost!)   │
└────────────────────────────┴───────────────────────────┘
```

---

## 2. Using Transactions in MySQL (InnoDB)

Transactions require the `InnoDB` storage engine (MySQL's default).

```sql
-- Step 1: Begin the transaction
START TRANSACTION;

-- Step 2: Perform the first modification
UPDATE community_funds 
SET balance = balance - 5000.00 
WHERE fund_name = 'General Welfare';

-- Step 3: Perform the second modification
UPDATE community_funds 
SET balance = balance + 5000.00 
WHERE fund_name = 'Winter Warmth Project';

-- Step 4: If no errors occurred, permanently commit the changes
COMMIT;
```

If something went wrong during Step 3, you simply issue:
```sql
-- Reverses Step 2 and Step 3 entirely!
ROLLBACK;
```

---

## 3. The ACID Principles

Reliable relational databases adhere to the four **ACID** properties:

1. **Atomicity (All or Nothing)**: Either the entire transaction succeeds, or nothing changes at all.
2. **Consistency (Rules are Respected)**: Constraints (Foreign Keys, NOT NULL, CHECK) are never violated.
3. **Isolation (No Interference)**: Transactions running simultaneously do not corrupt or read each other's half-finished work.
4. **Durability (Permanent Once Saved)**: Once `COMMIT` is executed, the data is guaranteed to survive power outages and crashes.

---

## 4. Enabling Safe Updates Mode in MySQL

To prevent disastrous `UPDATE` or `DELETE` queries that forget a `WHERE` clause, MySQL provides `SQL_SAFE_UPDATES`:

```sql
-- Turn ON safe updates mode
SET sql_safe_updates = 1;

-- Now, this query will be safely BLOCKED by MySQL:
-- ERROR 1175: You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column.
UPDATE students SET grade_level = 10;
```

---

## 5. Review & Practice

### 🟢 Level 1: Recall
1. What does the `COMMIT` statement do in a database transaction?
2. What does `ROLLBACK` do if an error occurs during a transaction?
3. What does each letter in **ACID** stand for?

### 🟡 Level 2: Transaction Script
Write a transaction block that transfers 3 copies of `"Web Development Book"` from `warehouse_stock` to `library_shelf_stock`.

### 🔴 Level 3: Ethical Responsibility (*Amānah*)
Explain why financial transactions and student mark alterations must always be recorded with audit timestamps and user IDs.
