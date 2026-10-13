# Chapter 1: Welcome to Python — The Language of AI

## 🌟 Real-Life Story

A new student joins your class and asks the way to the library. You could give a long, confusing speech. Or you could say: "Go down the stairs. Turn left. It is the second door." Short, clear steps are easy to follow. Python is a programming language built on that idea. Its instructions are short and read almost like plain English.

## 🎯 What You Will Learn

- Explain what Python is and why scientists and AI engineers use it.
- Write and run your first program with `print()`.
- Add comments that explain your code to other people.
- Use indentation (spaces at the start of a line) to group code.
- Describe how the Python interpreter runs a program line by line.

## Why Python?

Imagine you want to tell a friend how to make tea:

- In some computer languages, you write: *"Initialize hot water vessel, create tea leaf object, attach event listener for boiling point, allocate memory for mug..."*
- In **Python**, you write: *"Boil water. Add tea. Serve."*

Python was created by Guido van Rossum and first released in 1991. Today we use **Python 3**. Its main idea is simple: **code is read much more often than it is written.** So Python code should be easy to read.

That is why scientists, doctors, space engineers and AI researchers use Python. They can focus on their problem instead of on tricky punctuation.

```
Other languages: lots of { } ; and setup
Python:          clean lines, plain words
```

| Python is used for… | Example |
| :--- | :--- |
| Data science | Studying rainfall records |
| Machine learning (AI) | Sorting healthy and sick plant leaves |
| Automation | Renaming 500 homework files at once |
| Web servers | Running a school library website |

## Your Very First Python Program

Every programmer begins with a greeting. In Python, one line is enough:

```python
print("Bismillah! Welcome to Python.")
```

**Output:**

```text
Bismillah! Welcome to Python.
```

### Breaking Down the Line

1. `print` is a **function**: a named action the computer already knows how to do.
2. The round brackets `()` hold the **argument**: the information you give the function.
3. The quotation marks `" "` mark a **string**: a piece of text.
4. There is **no semicolon** `;` at the end. Python knows a command ends when the line ends.

### Printing More Than One Thing

You can call `print()` many times. Each call prints a new line. You can also give `print()` several items separated by commas. Python puts a space between them.

```python
print("Junior Coders Science Club")
print("Members:", 24)
print("Meeting day:", "Thursday", "after school")
print()
print("Numbers need no quotes:", 7 + 5)
```

**Output:**

```text
Junior Coders Science Club
Members: 24
Meeting day: Thursday after school

Numbers need no quotes: 12
```

Notice three things. `print()` with nothing inside prints an empty line. Numbers do not need quotes. And `7 + 5` was worked out before printing, so we see `12`.

## Comments: Notes for Humans

A line that starts with `#` is a **comment**. Python skips it completely. Comments explain *why* the code does something. They help your teacher, your classmates and your future self.

```python
# This program prints the club timetable
print("Robotics: Monday")    # a comment can sit after code too
# print("This line is switched off")
print("Astronomy: Wednesday")
```

**Output:**

```text
Robotics: Monday
Astronomy: Wednesday
```

The third line did not print. Putting `#` in front of code is a handy way to switch it off while testing.

## The Power of Indentation

In JavaScript or PHP, a group of lines is wrapped in curly braces `{ }`:

```javascript
// JavaScript
if (isSunny) {
    console.log("Go for a morning walk!");
}
```

Python does **not** use curly braces. It uses **indentation**: spaces at the start of a line. Lines with the same indentation belong to the same group. (The `if` keyword makes a decision. You will learn it properly in Chapter 4.)

```python
is_sunny = True

if is_sunny:
    print("Go for a morning walk!")
    print("Breathe fresh air and be grateful.")
print("This line always runs.")
```

**Output:**

```text
Go for a morning walk!
Breathe fresh air and be grateful.
This line always runs.
```

The two indented lines belong to the `if`. The last line is not indented, so it runs no matter what.

> ⚠️ **Golden Rule**: use **4 spaces** for each level of indentation. Neat, consistent code is part of *Iḥsān*: doing work with care.

## How Python Runs: The Interpreter

Python is an **interpreted** language. An **interpreter** is a program that reads your code and runs it straight away, one line at a time.

```
[hello.py] --> [Interpreter] --> [Output]
```

On a computer with Python installed, you save your code in a file ending in `.py` and type:

```bash
python hello.py
```

On this website, you can type code into the **Python Console** studio and press Run. It works in your browser.

Because Python goes line by line, earlier lines run before a mistake is found. Here, line 3 has a spelling mistake:

```python
print("Step 1: open the lab")
print("Step 2: check the sensors")
pirnt("Step 3: write the report")
```

**Output:**

```text
Step 1: open the lab
Step 2: check the sensors
NameError: name 'pirnt' is not defined. Did you mean: 'print'?
```

Lines 1 and 2 printed. Then Python stopped at line 3. A `NameError` means Python does not know the name `pirnt`. It even suggests the right word.

## 🔮 Predict the Output

Read this code. Decide what it prints before you run it.

```python
# Library opening times
print("Library")
print("Open from", 8, "to", 4)
# print("Closed on Friday")
print(10 + 20)
```

<details>
<summary>Show answer</summary>

```text
Library
Open from 8 to 4
30
```

The comment line does not run. `10 + 20` is calculated first.

</details>

## ⚠️ Common Mistake

**Forgetting the quotes around text.** Without quotes, Python thinks the word is the name of something it should already know.

```python
print(Hello)
```

**Output:**

```text
NameError: name 'Hello' is not defined
```

**Fixed version:** put text inside quotes.

```python
print("Hello")
```

**Output:**

```text
Hello
```

A second common slip is a capital letter. `Print("Hi")` fails too, because Python is **case-sensitive**: `print` and `Print` are different names.

## ✍️ Try It

Open the Python Console (or Python on your computer). Write a 3-line program that introduces you:

```python
print("My name is Tariq.")
print("I am learning Python to build helpful tools.")
print("Seeking beneficial knowledge is my goal!")
```

Change the name and the sentences to your own. **Hint:** every line needs `print`, round brackets and quotes.

## 📝 Recap

- Python is a readable language used in science, data and AI.
- `print()` shows text or numbers on the screen. Text goes in quotes.
- `#` starts a comment. Python ignores comments.
- Python groups lines with indentation, not curly braces. Use 4 spaces.
- The interpreter runs code line by line and stops at the first error.

## 🏆 Practice

### 🟢 Level 1: Recall
What does Python use instead of curly braces `{ }` to group lines of code? How many spaces is the standard?

<details>
<summary>Show answer</summary>

Python uses **indentation** (spaces at the start of a line). The standard is **4 spaces** per level.

</details>

### 🟡 Level 2: Apply
This program has two mistakes. Find and fix them.

```python
Print("School clean-up day")
print(Saturday at 9)
```

<details>
<summary>Show answer</summary>

`Print` must be lowercase, and the text needs quotes:

```python
print("School clean-up day")
print("Saturday at 9")
```

</details>

### 🔴 Level 3: Challenge
Make a small notice board for a science fair.

1. Add a comment on the first line saying what the program does.
2. Print a title line.
3. Print the number of projects using a sum, such as `12 + 9`.
4. Print an empty line, then a thank-you message.

<details>
<summary>Show one possible answer</summary>

```python
# Science fair notice board
print("Junior Coders Science Fair")
print("Projects on show:", 12 + 9)
print()
print("Thank you to all our volunteers!")
```

Output:

```text
Junior Coders Science Fair
Projects on show: 21

Thank you to all our volunteers!
```

</details>
