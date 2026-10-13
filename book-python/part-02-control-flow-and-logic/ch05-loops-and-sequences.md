# Chapter 5: Loops & Sequences (`for` & `while`) 🔁

## 🌟 Real-Life Story

At an organic farm, crates of oranges roll past on a conveyor belt. A worker checks each crate, stamps it and waits for the next one. When the last crate has passed, the job is done. Nobody writes a new instruction for every crate. There is one instruction: "for every crate, check and stamp". In Python, that kind of repeated instruction is called a **loop**.

## 🎯 What You Will Learn

- Repeat code a set number of times with `for` and `range()`.
- Loop over each character of a string.
- Keep running totals and counts inside a loop.
- Repeat code until a condition changes with `while`.
- Control loops with `break` and `continue`, and avoid infinite loops.

## 🔂 The `for` Loop and `range()`

A `for` loop repeats a block once for each value in a **sequence** (an ordered row of values). `range(5)` makes the sequence `0, 1, 2, 3, 4`.

```python
for day in range(5):
    print(f"Day {day}: read one page of the science book")
```

**Output:**

```text
Day 0: read one page of the science book
Day 1: read one page of the science book
Day 2: read one page of the science book
Day 3: read one page of the science book
Day 4: read one page of the science book
```

The variable `day` is the **loop variable**. It takes the next value on each pass. Each pass through the loop is called an **iteration**.

`range(5)` starts at `0` and stops **before** `5`. It gives five numbers, but `5` itself is not one of them.

### Choosing Start, Stop and Step

`range()` can take up to three numbers: `range(start, stop, step)`.

| Code | Numbers produced |
| :--- | :--- |
| `range(4)` | 0, 1, 2, 3 |
| `range(1, 6)` | 1, 2, 3, 4, 5 |
| `range(10, 51, 10)` | 10, 20, 30, 40, 50 |
| `range(5, 0, -1)` | 5, 4, 3, 2, 1 |

```python
for percent in range(10, 51, 10):
    print(f"Upload {percent}% complete")

for count in range(3, 0, -1):
    print(count)
print("Launch the weather balloon!")
```

**Output:**

```text
Upload 10% complete
Upload 20% complete
Upload 30% complete
Upload 40% complete
Upload 50% complete
3
2
1
Launch the weather balloon!
```

A negative step counts down. The stop value is still left out, so `range(3, 0, -1)` ends at `1`.

## 🔤 Looping Over a String

A string is also a sequence: a row of characters. A `for` loop can visit each character in turn.

```python
word = "SALAM"
for letter in word:
    print(letter)
```

**Output:**

```text
S
A
L
A
M
```

This lets us count things inside text. Here we count the vowels in a sentence:

```python
sentence = "Knowledge is light"
vowels = 0

for letter in sentence.lower():
    if letter in "aeiou":
        vowels += 1

print(f"Vowels found: {vowels}")
```

**Output:**

```text
Vowels found: 5
```

The keyword `in` checks whether one piece of text appears inside another. `"e" in "aeiou"` is `True`.

## ➕ Running Totals and Counters

Two loop patterns appear again and again:

- An **accumulator** is a variable that collects a total. Start it at `0` before the loop, then add to it inside.
- A **counter** counts how many times something happened. It also starts at `0`.

```python
total_pages = 0
long_days = 0

for day in range(1, 8):
    pages = day * 5          # day 1 = 5 pages, day 2 = 10 pages...
    total_pages += pages
    if pages > 20:
        long_days += 1
    print(f"Day {day}: {pages} pages (total so far {total_pages})")

print(f"Week total: {total_pages} pages")
print(f"Days with more than 20 pages: {long_days}")
```

**Output:**

```text
Day 1: 5 pages (total so far 5)
Day 2: 10 pages (total so far 15)
Day 3: 15 pages (total so far 30)
Day 4: 20 pages (total so far 50)
Day 5: 25 pages (total so far 75)
Day 6: 30 pages (total so far 105)
Day 7: 35 pages (total so far 140)
Week total: 140 pages
Days with more than 20 pages: 3
```

Watch how `total_pages` grows on every line. Days 5, 6 and 7 had more than 20 pages, so `long_days` is 3.

## ⏳ The `while` Loop

A `while` loop repeats **as long as its condition is `True`**. Use it when you do not know in advance how many passes you need.

```python
battery = 100

while battery > 20:
    print(f"Rover exploring. Battery: {battery}%")
    battery -= 25

print(f"Battery at {battery}%. Returning to the solar charger.")
```

**Output:**

```text
Rover exploring. Battery: 100%
Rover exploring. Battery: 75%
Rover exploring. Battery: 50%
Rover exploring. Battery: 25%
Battery at 0%. Returning to the solar charger.
```

The steps are: check the condition, run the block, check again. After four patrols the battery is `0`, `0 > 20` is `False`, and the loop ends.

### Example: Saving Up for a Donation

Yusuf puts 15 coins a week into a charity box. How many weeks until he reaches 100 coins?

```python
coins = 0
weeks = 0

while coins < 100:
    coins += 15
    weeks += 1

print(f"After {weeks} weeks Yusuf has {coins} coins to donate.")
```

**Output:**

```text
After 7 weeks Yusuf has 105 coins to donate.
```

| | `for` loop | `while` loop |
| :--- | :--- | :--- |
| Use when | You know how many times, or have a sequence | You repeat until something changes |
| Example | Each day of the week | Until the battery is low |
| Danger | Few | Forgetting to change the condition |

## 🛑 Controlling Loops: `break` and `continue`

- `break` stops the loop **immediately**. Python jumps to the first line after the loop.
- `continue` skips the rest of **this** pass and jumps to the next one.

```python
total = 0

for day in range(1, 11):
    if day % 7 == 0:
        print(f"Day {day}: rest day, no collection")
        continue
    total += 30
    print(f"Day {day}: collected 30 bottles, total {total}")
    if total >= 200:
        print("Target of 200 bottles reached!")
        break

print("Recycling drive finished.")
```

**Output:**

```text
Day 1: collected 30 bottles, total 30
Day 2: collected 30 bottles, total 60
Day 3: collected 30 bottles, total 90
Day 4: collected 30 bottles, total 120
Day 5: collected 30 bottles, total 150
Day 6: collected 30 bottles, total 180
Day 7: rest day, no collection
Day 8: collected 30 bottles, total 210
Target of 200 bottles reached!
Recycling drive finished.
```

Day 7 is skipped by `continue`. On day 8 the total reaches 210, so `break` ends the loop early. Days 9 and 10 never run.

## ☀️ Worked Example: Solar Energy Over a Day

A school's solar panels make different amounts of energy at different hours. This loop runs from 6:00 to 18:00 and adds up the energy.

```python
total_kwh = 0

for hour in range(6, 19):
    if 11 <= hour <= 15:
        energy = 4.5
        light = "strong sun"
    elif 9 <= hour <= 17:
        energy = 2.8
        light = "some sun"
    else:
        energy = 0.9
        light = "low light"
    total_kwh += energy
    print(f"{hour}:00  {light}  +{energy} kWh")

print(f"Total clean energy today: {round(total_kwh, 1)} kWh")
```

**Output:**

```text
6:00  low light  +0.9 kWh
7:00  low light  +0.9 kWh
8:00  low light  +0.9 kWh
9:00  some sun  +2.8 kWh
10:00  some sun  +2.8 kWh
11:00  strong sun  +4.5 kWh
12:00  strong sun  +4.5 kWh
13:00  strong sun  +4.5 kWh
14:00  strong sun  +4.5 kWh
15:00  strong sun  +4.5 kWh
16:00  some sun  +2.8 kWh
17:00  some sun  +2.8 kWh
18:00  low light  +0.9 kWh
Total clean energy today: 37.3 kWh
```

`11 <= hour <= 15` is a neat Python shortcut. It means `hour >= 11 and hour <= 15`. We use `round()` at the end because adding decimals can leave tiny leftover digits.

## ⚠️ Common Mistake

**1. A `while` loop that never ends.** If the condition never becomes `False`, the loop runs forever. This is an **infinite loop**.

```python
water_level = 10
while water_level > 0:
    print("Pumping water...")
    # forgot: water_level -= 1
```

This prints "Pumping water..." again and again. Stop it with <kbd>Ctrl</kbd> + <kbd>C</kbd> (on a computer) or the Stop button. **Fix:** make sure the loop changes the variable in its condition, for example `water_level -= 1`.

**2. Expecting `range()` to include the stop number.**

```python
for n in range(1, 5):
    print(n)
```

**Output:**

```text
1
2
3
4
```

There is no `5`. **Fix:** to count 1 to 5, write `range(1, 6)`.

## ✍️ Try It

Print the 7 times table from 7 × 1 to 7 × 10, one line each, like `7 x 3 = 21`. Then print the sum of all ten answers.

**Hint:** use `for n in range(1, 11):` and an accumulator that starts at `0`. The sum should be 385.

## 📝 Recap

- A `for` loop runs once for each value in a sequence, such as `range()` or a string.
- `range(start, stop, step)` stops **before** the stop value.
- Accumulators collect totals; counters count events. Both start at `0` before the loop.
- A `while` loop repeats while its condition is `True`. Always change the condition inside the loop.
- `break` leaves a loop early; `continue` skips to the next pass.

## 🏆 Practice

### 🟢 Level 1: Recall
Which numbers does `range(2, 12, 3)` produce?

<details>
<summary>Show answer</summary>

`2, 5, 8, 11`. It starts at 2, adds 3 each time, and stops before 12.

</details>

### 🟡 Level 2: Apply
A plant is 4 cm tall and grows 3 cm every week. Use a `while` loop to find how many weeks until it is at least 30 cm tall. Print the weeks and the final height.

<details>
<summary>Show answer</summary>

```python
height = 4
weeks = 0

while height < 30:
    height += 3
    weeks += 1

print(f"{weeks} weeks, height {height} cm")
```

Output:

```text
9 weeks, height 31 cm
```

</details>

### 🔴 Level 3: Challenge
Build a "quiet hours" checker for a study hall that is open from 8:00 to 20:00.

1. Loop over the hours 8 to 20 (including 20).
2. Skip 13:00 with `continue` and print `"13:00 lunch break"`.
3. For hours before 12, print `"quiet study"`. For other hours, print `"group study"`.
4. Count how many group study hours there are and print the count at the end.

<details>
<summary>Show one possible answer</summary>

```python
group_hours = 0

for hour in range(8, 21):
    if hour == 13:
        print("13:00 lunch break")
        continue
    if hour < 12:
        print(f"{hour}:00 quiet study")
    else:
        print(f"{hour}:00 group study")
        group_hours += 1

print(f"Group study hours: {group_hours}")
```

The last line prints `Group study hours: 8` (12:00 and 14:00 to 20:00).

</details>
