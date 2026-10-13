# Chapter 11: Forms 📝

---

## 🌟 Real-Life Story

When you want to sign up for your school soccer team, the coach hands you a registration clipboard with a paper form:
- You write your full name in a blank box.
- You check a box next to your shirt size: *Small*, *Medium*, or *Large*.
- You pick your favorite position from a list: *Goalkeeper*, *Defender*, *Midfielder*, or *Striker*.
- You choose either *Morning Practice* or *Afternoon Practice* (you can only pick one!).
- You write any medical notes or allergies in a larger comment box at the bottom.
- Finally, you hand the form to the coach!

**HTML Forms allow websites to have this exact two-way conversation with visitors!**
Without forms, you could never log in to your email, search a library catalogue, or register for a science fair online. Forms let users send information back to the website!

---

## 🎯 What You Will Learn

By the end of this chapter, you will be able to:
- Understand the `<form>` wrapper element.
- Use `<label>` to explain what each input field is for.
- Master different types of `<input>`: `type="text"`, `type="email"`, `type="password"`, `type="number"`.
- Use `<input type="checkbox">` for multi-select options.
- Use `<input type="radio">` with matching `name` attributes for single-choice questions.
- Create dropdown menus with `<select>` and `<option>`.
- Build a multi-line message box with `<textarea>`.
- Create a complete Student Registration Form.

---

## 👁️ Visual Concept Explanation

### The Form Element Family

```text
┌─ <form> ──────────────────────────────┐
│ Text:     [ Maya Lin             ]    │
│ Email:    [ maya@example.org     ]    │
│                                       │
│ Checkboxes (pick ANY number):         │
│   [✓] Coding [ ] Robotics [✓] Art     │
│                                       │
│ Radio buttons (pick ONLY ONE):        │
│   (•) Grade 7 ( ) Grade 8 ( ) Grade 9 │
│                                       │
│ Dropdown: [ Choose a club...   ▼ ]    │
│                                       │
│ Text area (many lines):               │
│   ┌──────────────────────────┐        │
│   │ Tell us about yourself   │        │
│   └──────────────────────────┘        │
│                                       │
│ [ Submit Registration ]               │
└───────────────────────────────────────┘
```

---

## 💻 Code Example: Student Club Registration

Type this into your editor and save it as `registration.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Club Registration Form</title>
  </head>
  <body>
    <h1>Junior Coders Club Registration</h1>
    <p>Complete this form to join our weekly after-school coding circle.</p>

    <form>
      <!-- 1. Text Field with Label -->
      <p>
        <label for="studentName">Full Student Name:</label><br>
        <input type="text" id="studentName" name="studentName" placeholder="e.g. Maya Lin" required>
      </p>

      <!-- 2. Email Field -->
      <p>
        <label for="studentEmail">Parent / Student Email:</label><br>
        <input type="email" id="studentEmail" name="studentEmail" placeholder="student@example.org" required>
      </p>

      <!-- 3. Radio Buttons (Select ONLY ONE grade) -->
      <p>
        <strong>Your Current Grade Level:</strong><br>
        <input type="radio" id="grade6" name="grade" value="6">
        <label for="grade6">Grade 6</label><br>

        <input type="radio" id="grade7" name="grade" value="7" checked>
        <label for="grade7">Grade 7</label><br>

        <input type="radio" id="grade8" name="grade" value="8">
        <label for="grade8">Grade 8</label>
      </p>

      <!-- 4. Checkboxes (Select multiple interests) -->
      <p>
        <strong>Interests (Pick any that apply):</strong><br>
        <input type="checkbox" id="web" name="interests" value="web">
        <label for="web">Website Design (HTML & CSS)</label><br>

        <input type="checkbox" id="apps" name="interests" value="apps">
        <label for="apps">Educational App Programming</label><br>

        <input type="checkbox" id="robot" name="interests" value="robot">
        <label for="robot">Robotics Kits</label>
      </p>

      <!-- 5. Dropdown Menu -->
      <p>
        <label for="experience">Coding Experience Level:</label><br>
        <select id="experience" name="experience">
          <option value="none">Total Beginner (Brand new!)</option>
          <option value="scratch">I have made Scratch projects</option>
          <option value="html">I have written some HTML before</option>
        </select>
      </p>

      <!-- 6. Multi-line Text Area -->
      <p>
        <label for="notes">Tell us why you want to join:</label><br>
        <textarea id="notes" name="notes" rows="4" cols="40" placeholder="I love technology because..."></textarea>
      </p>

      <!-- 7. Submit Button -->
      <p>
        <button type="submit">Submit Registration 🚀</button>
      </p>
    </form>
  </body>
</html>
```

---

## 🔍 Code Explanation: Key Form Attributes

- `<label for="studentName">`: Labels make forms accessible. When you click the label text with your mouse, the browser automatically jumps the cursor into the matching input box (connected via the `id` attribute)!
- `placeholder="..."`: The faint light-gray hint text that appears inside an empty box to show students what to type.
- `required`: A superpower attribute! If a student tries to click Submit while the box is empty, modern browsers automatically stop them and show a polite warning bubble: *"Please fill out this field."*
- `name="grade"` on radio buttons: **This is critical!** Giving all three radio buttons the exact same `name="grade"` binds them into a team, ensuring the user can only choose ONE option at a time!
- `<select>` and `<option>`: Creates a neat dropdown menu that expands when clicked.
- `<textarea>`: Unlike `<input>`, which is only one single line, `<textarea>` can stretch into multiple rows and columns for paragraphs and feedback.
- `name="..."`: The name the data travels under when the form is sent. Without a `name`, a field's value is **not sent** at all.

> 📬 **Where does the data go?** In this book we only *build* the form. Clicking Submit here just reloads the page. Receiving and saving the data is done later on the server, with PHP, in the PHP track.

---

## 🌍 Real-World Connection: How Google & GitHub Use Forms

- **Google Search**: The giant search bar on `google.com` is simply an `<input type="text">` inside a `<form>`! When you press Enter, the form submits your query to Google's server.
- **GitHub & University Portals**: The login screen is an `<input type="email">` and an `<input type="password">`! The password input hides characters as black dots (••••••) so nobody standing behind you can steal your password!

---

## 🔮 Predict the Output

Look at these two radio buttons:

```html
<input type="radio" name="lunch" value="pizza"> Pizza
<input type="radio" name="dinner" value="pasta"> Pasta
```

**Question**: If you click Pizza, and then you click Pasta, will Pizza turn off, or will BOTH circles stay selected? Why?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> BOTH will stay selected! Because their <code>name</code> attributes are different (<code>name="lunch"</code> and <code>name="dinner"</code>), the browser thinks they are from two different questions! To make them mutually exclusive, they must have the exact same <code>name</code>!
</details>

---

## 🕵️ Code Detective: The Un-clickable Label

A student wrote a form, but clicking on the text "I agree to the rules" does not check the box:

```html
<!-- Broken Code -->
<input type="checkbox" id="rules">
<label>I agree to the rules</label>
```

- **Find the mistake**: The `<label>` is missing the `for` attribute!
- **Explain the mistake**: To connect a label to an input, the label's `for="..."` must match the input's `id="..."`!
- **Fix the code**:
  ```html
  <!-- Fixed Code -->
  <input type="checkbox" id="rules">
  <label for="rules">I agree to the rules</label>
  ```

---

## 🎨 Think Like a Web Designer: Friendly Forms

Have you ever opened a form with 60 required questions in tiny font? You immediately close the tab!
- **Good Form Design**: Only ask for the information you truly need.
- Provide clear `placeholder` examples so users know the expected format.
- Group related fields together with comforting whitespace!

---

## 🚀 Mini Challenge: The Pizza Ordering Form

Create a web page named `pizza-order.html`:
- `<h1>`: `Luigi's Custom Pizzeria`
- Radio buttons for **Pizza Crust** (Thin Crust, Deep Dish, Stuffed Crust).
- Checkboxes for **Toppings** (Grilled Chicken, Mushrooms, Olives, Extra Cheese).
- A `<select>` dropdown for **Delivery Time** (ASAP, In 30 Mins, In 1 Hour).
- A `<button type="submit">`: `Place My Order! 🍕`

---

## ⚠️ Common Mistake

**Forgetting the `name` attribute.**

❌ Wrong:

```html
<label for="city">City:</label>
<input type="text" id="city">
```

What happens: the box looks perfect and you can type in it. But when the form is sent, this value is left out, because it has no name to travel under. The server (PHP, later) never receives the city.

✅ Fixed: give every field a `name`. Keep the `id` too, so the label still works.

```html
<label for="city">City:</label>
<input type="text" id="city" name="city">
```

---

## ✍️ Try It

**The Password Shield**

Create a secret password box:
```html
<label for="secret">Enter Your Secret Clubhouse Password:</label><br>
<input type="password" id="secret" placeholder="Enter password...">
```
Open it in your browser and type some letters. Notice how the browser automatically disguises your letters into dots!

> 💡 **Hint:** The dots only hide the password from people looking at the screen. Keeping passwords safe on the server is a trust (*Amānah*), and you will learn how to do it properly in the PHP track.

---

## 📝 Recap

- Forms collect information from users through interactive controls.
- `<form>` holds all form inputs.
- `<input type="text">` creates single-line text boxes.
- `<input type="radio">` allows selecting only one choice from a group.
- `<input type="checkbox">` allows selecting multiple choices.
- `<select>` and `<option>` build dropdown menus.
- `<textarea>` builds expandable multi-line text boxes.
- Always pair `<label for="...">` with `<input id="...">` for great accessibility.

---

## 📖 Key Terms

| Term | What It Means |
| :--- | :--- |
| **`<form>`** | The outer wrapper for interactive user input fields. |
| **`<input>`** | The versatile tag used to collect text, passwords, checkboxes, and radio buttons. |
| **`<label>`** | A readable description paired with a specific form control. |
| **Radio Button** | A round option button where only one choice can be picked in a group. |
| **Checkbox** | A square box that can be toggled on or off independently. |
| **Dropdown (`<select>`)** | A menu that reveals a list of choices when clicked. |

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which input type hides typed characters with dots?
2. Which attribute makes a field required before the form can be sent?
3. How do you group radio buttons so only one can be checked?

<details>
<summary>Show answer</summary>

1. `type="password"`
2. `required`
3. Give them all the **same** `name`, e.g. `name="grade"`.

</details>

### 🟡 Level 2: Apply
1. Write a labelled search box with the placeholder "Search tutorials...".
2. What is the difference between `<input type="checkbox">` and `<input type="radio">`?

<details>
<summary>Show answer</summary>

1.

```html
<label for="search">Search:</label>
<input type="text" id="search" name="search" placeholder="Search tutorials...">
```

(HTML also has `type="search"`, which works the same way.)

2. Checkboxes are independent: you can tick any number. Radio buttons in the same group allow only **one** choice.

</details>

### 🔴 Level 3: Challenge
Build a "Student Council Voting Ballot" form:
1. A text box for the Student ID.
2. Radio buttons to vote for one of three Class President candidates.
3. Checkboxes for favourite school clubs.
4. A `<textarea>` for one suggestion to improve the school.
5. A submit button. Every field needs a `<label for>` and a `name`.

<details>
<summary>Show one possible answer</summary>

```html
<form>
  <p>
    <label for="sid">Student ID:</label><br>
    <input type="text" id="sid" name="sid" required>
  </p>

  <p>
    <strong>Class President:</strong><br>
    <input type="radio" id="c1" name="president" value="amina">
    <label for="c1">Amina</label><br>
    <input type="radio" id="c2" name="president" value="bilal">
    <label for="c2">Bilal</label><br>
    <input type="radio" id="c3" name="president" value="sara">
    <label for="c3">Sara</label>
  </p>

  <p>
    <strong>Favourite clubs:</strong><br>
    <input type="checkbox" id="k1" name="clubs" value="science">
    <label for="k1">Science Club</label><br>
    <input type="checkbox" id="k2" name="clubs" value="library">
    <label for="k2">Library Helpers</label>
  </p>

  <p>
    <label for="idea">One suggestion for our school:</label><br>
    <textarea id="idea" name="idea" rows="4" cols="40"></textarea>
  </p>

  <p><button type="submit">Cast My Vote</button></p>
</form>
```

</details>
