# Chapter 17: Events — Listening and Reacting to the User

---

## 🌟 Real-Life Story

Think about a doorbell:
1. The doorbell sits quietly on the door frame.
2. It waits patiently...
3. A visitor approaches and **presses the button**!
4. The bell chime rings inside the house!

In the browser, your code can install "doorbell listeners" on buttons, keys, text boxes, and images. Whenever the user does something, JavaScript immediately executes a reaction!

---

## 🎯 What You Will Learn

By the end of this chapter, you will be able to:
- Explain what an event is in the web browser.
- Attach event listeners to elements using `addEventListener()`.
- Handle `click` events on buttons, and `input` / `change` events on text fields and dropdowns.
- Read what a user typed with `.value`.
- Build responsive interactive widgets like click counters, theme switchers, and calculators.

---

## Concept Explanation

### What Is an Event?

![The Event-Driven Lifecycle: Listen, Trigger, and React](../assets/diagrams/js/event-listener-cycle.svg)

An **Event** is an action that happens in the browser that your program can detect:
- A user clicks a button (`click`)
- A user types into a text box (`input`)
- A user moves their mouse over an image (`mouseover`)
- A user submits a form (`submit`)
- A user presses a key on their keyboard (`keydown`)

### The Event Listener Formula
```javascript
targetElement.addEventListener("eventName", functionName);
```

```javascript
let myButton = document.getElementById("hello-btn");

myButton.addEventListener("click", function() {
    alert("Button was clicked! ✨");
});
```

### Reading Input Fields on the Fly
For text boxes (`<input type="text">`), we read user keystrokes using `.value`:
```html
<input type="text" id="user-input" placeholder="Type something...">
<p id="preview-text"></p>
```
```javascript
let inputField = document.getElementById("user-input");
let preview = document.getElementById("preview-text");

inputField.addEventListener("input", function() {
    preview.textContent = "You typed: " + inputField.value;
});
```

---

## Real-World Example

Think of the "Save for later" button on a school library website:
1. The bookmark icon has a click listener: `saveBtn.addEventListener("click", toggleSave)`.
2. When tapped:
   - The bookmark turns gold!
   - Your "Saved books" count increments by 1.
   - A small "Saved!" message appears on screen.

---

## Code Example

### The Interactive Click Counter Widget

```html
<!DOCTYPE html>
<html>
<head>
    <title>Click Counter</title>
    <style>
        body { font-family: sans-serif; text-align: center; padding-top: 50px; }
        #count-display { font-size: 4rem; margin: 20px; }
        button { font-size: 1.5rem; padding: 10px 20px; margin: 5px; cursor: pointer; }
        .positive { color: #16a34a; }
        .negative { color: #dc2626; }
    </style>
</head>
<body>
    <h1>Tally Counter ⏱️</h1>
    <div id="count-display">0</div>
    <button id="btn-minus">-1</button>
    <button id="btn-reset">Reset</button>
    <button id="btn-plus">+1</button>

    <script>
        let count = 0;
        const display = document.getElementById("count-display");
        const btnMinus = document.getElementById("btn-minus");
        const btnReset = document.getElementById("btn-reset");
        const btnPlus = document.getElementById("btn-plus");

        function updateScreen() {
            display.textContent = count;
            if (count > 0) {
                display.className = "positive";
            } else if (count < 0) {
                display.className = "negative";
            } else {
                display.className = "";
            }
        }

        btnPlus.addEventListener("click", function() {
            count++;
            updateScreen();
        });

        btnMinus.addEventListener("click", function() {
            count--;
            updateScreen();
        });

        btnReset.addEventListener("click", function() {
            count = 0;
            updateScreen();
        });
    </script>
</body>
</html>
```

---

## Line-by-Line Explanation

- `let count = 0;`: Holds the single source of truth for the current count value.
- `const display = ...`: Caches references to the HTML elements so we don't query the DOM repeatedly.
- `function updateScreen()`: A helper function that synchronizes the JavaScript state to the visual HTML and updates color classes.
- `btnPlus.addEventListener("click", ...)`: Attaches a listener. When the `+1` button is clicked, `count` increases by 1 and the screen updates.
- `btnMinus.addEventListener("click", ...)`: Decrements `count` and refreshes the display.
- `btnReset.addEventListener("click", ...)`: Restores `count` back to 0.

---

## 🔮 Predict the Output

```javascript
let btn = document.createElement("button");
btn.textContent = "Click Me";
document.body.appendChild(btn);

let totalClicks = 0;
btn.addEventListener("click", function() {
    totalClicks += 5;
});

// If the user clicks the button 3 times, what is totalClicks?
```

(`document.createElement("button")` makes a new button in memory, and `appendChild` puts it on the page.)

<details>
<summary>👀 Click to check your answer</summary>

**Answer: `15`.** The function inside the listener runs once for every click. Each run adds 5: 5 + 5 + 5 = 15.

</details>

---

## Think Like a Programmer: Programs That Wait

Most programs in this book ran from top to bottom: line 1, then line 2, then line 3. Then they finished.

A web page works differently. Its JavaScript does **not** finish when the last line has run. It keeps waiting, like a shopkeeper waiting for customers:

1. First, the script runs once and sets up its listeners.
2. Then it waits quietly. It does nothing until something happens.
3. When the user clicks or types, the browser runs the matching function.
4. Then it goes back to waiting for the next action.

This way of writing programs is called **event-driven programming**: the user's actions decide what runs and when.

---

## Coding Challenge

Build a "Color Palette Generator":
- Place 4 buttons on a page: "Sky Blue", "Emerald Green", "Sunset Orange", "Rose Pink".
- When any button is clicked, change a showcase `<div>` box to that color and print its hex code.

---

## Mini Project: Interactive Currency Converter Widget

Create an interactive mini-app:
- HTML inputs:
  - Input field for Amount (USD).
  - Select dropdown for Currency (EUR, GBP, INR, AED, JPY).
  - Convert Button.
  - Result paragraph `<p id="conversion-result"></p>`.
- JavaScript holds an exchange rate object. (These are sample rates. Real rates change every day.)
  ```javascript
  const rates = {
      EUR: 0.92,
      GBP: 0.79,
      INR: 83.20,
      AED: 3.67,
      JPY: 154.60
  };
  ```
- When the user types or clicks "Convert", compute and display the converted sum!

---

## ⚠️ Common Mistake

Find the 3 errors in this code:
```javascript
let myBtn = document.getElementById("submit-btn");

myBtn.addListener("onclick", handleClick());

function handleClick {
    console.log("Submitted successfully!");
}
```

- **What happens**: JavaScript refuses to run it: `SyntaxError: Unexpected token '{'`.
- **Error 1**: The method is `addEventListener`, and the event name is `"click"` (no `on` in front). `addListener` would give `TypeError: myBtn.addListener is not a function`.
- **Error 2**: `handleClick()` with brackets runs the function **at once** and passes its result. Pass the function's name without brackets, so the browser can run it later.
- **Error 3**: A function declaration needs brackets after its name: `function handleClick() {`.
- **Fix the code**:
  ```javascript
  let myBtn = document.getElementById("submit-btn");
  myBtn.addEventListener("click", handleClick);

  function handleClick() {
      console.log("Submitted successfully!");
  }
  ```
  Each click now prints `Submitted successfully!`.

---

## ✍️ Try It

1. In any browser DevTools console, run:
   ```javascript
   window.addEventListener("click", function() {
       console.log("You clicked somewhere on the screen!");
   });
   ```
2. Click around the page and see the messages appear in real-time!

> 💡 **Hint:** Each click prints one message. Chrome groups repeated messages and shows a small counter next to them instead of a new line. Refresh the page to remove the listener.

---

## 📝 Recap

- Events allow JavaScript to respond to user interactions.
- Attach listeners using `.addEventListener(eventType, callbackFunction)`.
- Common events: `click`, `input`, `change`, `keydown`.
- Read text inputs using `inputElement.value`.
- Event-driven programming lets apps wait efficiently for user actions.

**Check yourself:**

- [ ] I can add a `click` listener to a button.
- [ ] I can retrieve the text inside an `<input>` field using `.value`.
- [ ] I know how to update the webpage in response to a user click.
- [ ] I understand what an event callback is.

---

## 📖 Key Terms

- **Event:** A notification sent by the browser that something took place.
- **Event Listener:** A routine that waits for an event to occur.
- **Callback Function:** A function passed into another function to be executed later.
- **Event-Driven:** A way of writing programs where the user's actions (events) decide which code runs and when.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which method attaches an event listener to an HTML element?
2. What is the difference between an `input` event and a `click` event?

<details>
<summary>Show answer</summary>

1. `addEventListener()`
2. `click` fires when the user clicks or taps an element. `input` fires every time the text in a field changes, for example with each key typed.

</details>

### 🟡 Level 2: Apply
Make a button with the text `"Turn Light On"`. When it is clicked, change `document.body.style.backgroundColor` to `"yellow"` and the button text to `"Turn Light Off"`. Clicking again should switch everything back.

Extra: why is calling `updateScreen()` in each button handler of the Tally Counter better than writing the update code three times?

<details>
<summary>Show answer</summary>

```html
<button id="light-btn">Turn Light On</button>
```

```javascript
let lightBtn = document.getElementById("light-btn");
let isLightOn = false;

lightBtn.addEventListener("click", function() {
    if (isLightOn === false) {
        document.body.style.backgroundColor = "yellow";
        lightBtn.textContent = "Turn Light Off";
        isLightOn = true;
    } else {
        document.body.style.backgroundColor = "";
        lightBtn.textContent = "Turn Light On";
        isLightOn = false;
    }
});
```

First click: the page turns yellow and the button says **Turn Light Off**. Second click: back to normal.

Extra: it follows DRY (Don't Repeat Yourself). If the display needs to change, you fix it in one place, not three.

</details>

### 🔴 Level 3: Challenge
Build a live word and character counter:
1. Add `<textarea id="essay"></textarea>`.
2. Add `<span id="char-count">0</span> characters` and `<span id="word-count">0</span> words`.
3. Listen for the `input` event on the textarea.
4. Show the number of characters with `.length`.
5. Count words: `trim()` the text, `split(" ")` it, and count only the pieces that are not empty.

<details>
<summary>Show one possible answer</summary>

```javascript
let essay = document.getElementById("essay");
let charCount = document.getElementById("char-count");
let wordCount = document.getElementById("word-count");

essay.addEventListener("input", function() {
    let text = essay.value;
    charCount.textContent = text.length;

    let words = text.trim().split(" ");
    let total = 0;
    for (let i = 0; i < words.length; i++) {
        if (words[i] !== "") {
            total++;
        }
    }
    wordCount.textContent = total;
});
```

If you type `Trees  give us clean air` (with two spaces after "Trees"), the page shows `24 characters` and `5 words`. The empty piece between the two spaces is not counted.

</details>
