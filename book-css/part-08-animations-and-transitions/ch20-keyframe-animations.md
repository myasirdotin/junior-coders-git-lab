# Chapter 20: Animations with @keyframes 🎞️

---

## 🌟 Real-Life Story

**The Flip-Book in the Back of Your Notebook**

Have you ever drawn a tiny stick figure in the corner of every page of a notebook? On page 1 the figure stands. On page 10 it raises an arm. On page 20 it waves. When you flip the pages quickly, the figure moves all by itself.

You did not draw every tiny step perfectly. You drew a few **key pages**, and your eyes filled in the rest.

A transition (Chapter 19) is like a light dimmer: it only moves when someone turns the knob, and it goes from one state to one other state. **A CSS animation is like the flip-book.** You draw the key moments, called **keyframes**. The browser draws all the frames in between, and the animation can start on its own, have many steps and even repeat forever.

---

## 🎯 What You Will Learn

By the end of this chapter, you will be able to:
- Explain how a `@keyframes` animation differs from a transition.
- Write keyframes with `from`/`to` and with percentages (`0%`, `50%`, `100%`).
- Control an animation with the eight `animation-*` properties and the `animation` shorthand.
- Build a loading spinner and a gentle "New" badge pulse using `transform` and `opacity`.
- Respect visitors with `prefers-reduced-motion` and the "no more than 3 flashes a second" rule.

---

## 👁️ Visual Concept Explanation

### Transition vs. Animation

```text
TRANSITION (Chapter 19)
  needs a trigger (:hover, :focus)
  A ───────────────> B
  two states only, plays once

ANIMATION (@keyframes)
  can start by itself on page load
  0% ──> 30% ──> 70% ──> 100%
  many steps, can repeat or reverse
```

| | Transition | Animation |
| :--- | :--- | :--- |
| Starts | When a state changes (hover, focus) | By itself, as soon as the rule applies |
| Steps | Start and end only | As many keyframes as you like |
| Repeats | No | Yes (`infinite` if you want) |
| Good for | Button hovers, menus opening | Spinners, attention badges, entrance effects |

### Two Parts Every Animation Needs

```text
1. THE KEYFRAMES (the flip-book)
   @keyframes fade-in {
     from { opacity: 0; }
     to   { opacity: 1; }
   }

2. THE ANIMATION (who plays it, how)
   .card {
     animation-name: fade-in;
     animation-duration: 1s;
   }
```

The `@keyframes` rule only **describes** the motion. Nothing moves until an element uses its name in `animation-name` and has a duration.

---

## 🧩 Writing Keyframes

### `from` and `to`

The simplest keyframes have a start and an end:

```css
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

`from` means the start and `to` means the end. The name (`fade-in`) is your choice. Use lowercase words joined by dashes.

### Percentages

For more steps, use percentages of the animation's time. `from` is the same as `0%` and `to` is the same as `100%`.

```css
@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}
```

With a 2-second duration, the element is at its normal place at 0s, 10px higher at 1s, and back again at 2s. It gently floats up and down.

When two keyframes are the same, you can group them with a comma, just like a selector list:

```css
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
```

---

## 🎛️ The Animation Properties

| Property | What it controls | Example values |
| :--- | :--- | :--- |
| `animation-name` | Which `@keyframes` to play | `fade-in` |
| `animation-duration` | How long one cycle takes | `1s`, `400ms` |
| `animation-timing-function` | The speed curve | `ease`, `linear`, `ease-in-out` |
| `animation-delay` | Wait before starting | `0s`, `0.5s` |
| `animation-iteration-count` | How many times to play | `1`, `3`, `infinite` |
| `animation-direction` | Which way each cycle runs | `normal`, `reverse`, `alternate` |
| `animation-fill-mode` | Styles before start / after end | `none`, `forwards`, `backwards`, `both` |
| `animation-play-state` | Pause or play | `running`, `paused` |

The timing functions are the same ones you met in Chapter 19 (`ease`, `linear`, `ease-in`, `ease-out`, `ease-in-out`).

### Direction

```text
normal      0% -> 100%, 0% -> 100%
reverse     100% -> 0%, 100% -> 0%
alternate   0% -> 100%, 100% -> 0%
            (back and forth, smooth)
```

`alternate` is handy for a pulse: it grows, then shrinks, with no jump.

### Fill Mode

By default, an element shows its animation styles **only while it is playing**. Before it starts and after it ends, it uses its normal styles.

```text
forwards   keep the LAST keyframe
           after the end
backwards  use the FIRST keyframe
           during the delay
both       do both
```

Example: a card fades in after a 0.5s delay. Without `backwards`, the card is visible for 0.5s, then vanishes, then fades in. That flicker looks broken. With `both`, it stays hidden during the delay and stays visible at the end.

### The `animation` Shorthand

You can write everything in one line:

```css
.card {
  animation: fade-in 0.6s ease-out 0.5s 1 normal both;
}
```

```text
animation: fade-in  0.6s  ease-out
           name     duration  timing

           0.5s   1      normal     both
           delay  count  direction  fill
```

You may leave out the parts you do not need. Most of the time you write only three or four:

```css
animation: spin 1s linear infinite;
```

**Watch the times:** the **first** time value is always the duration and the **second** is the delay.

---

## 💻 Code Example: The Library Catalogue Page

Type this and save it as `animations.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Library Catalogue</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f8fafc;
        color: #1e293b;
        padding: 30px;
      }

      /* 1. Loading spinner */
      .loading {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .spinner {
        width: 32px;
        height: 32px;
        border: 4px solid #cbd5e1;
        border-top-color: #0f766e;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      /* 2. Gentle "New" badge pulse */
      .badge-new {
        display: inline-block;
        background-color: #b91c1c;
        color: #ffffff;
        font-size: 13px;
        font-weight: bold;
        padding: 2px 10px;
        border-radius: 999px;
        animation: pulse 2s ease-in-out infinite;
      }

      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
          opacity: 1;
        }
        50% {
          transform: scale(1.08);
          opacity: 0.85;
        }
      }

      /* 3. Book cards rise in once */
      .book {
        background-color: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 16px;
        margin-top: 16px;
        animation: rise-in 0.6s ease-out both;
      }

      .book:nth-child(2) {
        animation-delay: 0.15s;
      }

      @keyframes rise-in {
        from {
          opacity: 0;
          transform: translateY(16px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* 4. Respect visitors who want less motion */
      @media (prefers-reduced-motion: reduce) {
        .spinner,
        .badge-new,
        .book {
          animation: none;
        }
      }
    </style>
  </head>
  <body>
    <h1>Green Valley Library Catalogue</h1>

    <div class="loading">
      <div class="spinner"></div>
      <p>Loading the book list…</p>
    </div>

    <section>
      <article class="book">
        <h2>A Young Person's Guide to the Stars <span class="badge-new">New</span></h2>
        <p>Find the constellations from your own rooftop.</p>
      </article>
      <article class="book">
        <h2>Water for Every Village</h2>
        <p>How engineers bring clean water to small towns.</p>
      </article>
    </section>
  </body>
</html>
```

**What you see:**
- A gray ring with one teal edge spins steadily, about once per second, next to the words "Loading the book list…".
- The two book cards slide up 16px and fade in when the page opens. The second card starts a moment after the first.
- The small red "New" badge slowly grows a little and softens, then returns, every 2 seconds. It never stops, but it is gentle.
- If the computer is set to "reduce motion", nothing moves. The ring stays still, the cards simply appear, and the badge stays still. All the information is still there.

---

## 🔍 Code Explanation: How Each Effect Works

- **The spinner** is a round box (`border-radius: 50%`) with a gray border. Only the top border is teal, so you can see it turning. The keyframes have only `to`. When `from` is missing, the browser starts from the element's normal style (no rotation). `linear` keeps the speed even, so the ring does not speed up and slow down.
- **The badge** uses `display: inline-block` (Chapter 10). A `transform` does not work on a plain inline `<span>`, so this line matters. The `0%, 100%` keyframe means it starts and ends at normal size, so each cycle joins smoothly to the next.
- **The cards** use `animation-fill-mode: both` (the word `both` in the shorthand). They stay invisible during the delay and stay visible at the end.
- **`.book:nth-child(2)`** (the second child, from Chapter 19) gets a small extra delay, so the cards arrive one after the other.
- **The `@media` block** (Chapter 14) switches all three animations off for people who asked for less motion.

---

## 🚀 Smooth Animations: Use `transform` and `opacity`

You learned in Chapter 19 that browsers draw changes to `transform` and `opacity` very quickly. This matters even more for animations, because they often run for a long time or forever.

```text
SMOOTH (no layout work)
  transform: translate, scale, rotate
  opacity

CAN STUTTER (layout redone each frame)
  width, height, margin, top, left
```

- To move something, animate `transform: translateX()` instead of `left` or `margin-left`.
- To grow something, animate `transform: scale()` instead of `width` and `height`.
- To fade something, animate `opacity`.

---

## ♿ Animations and Kindness: Accessibility

Movement on a screen is not pleasant for everyone. Some people feel dizzy or sick when things slide, zoom or spin. Others find constant movement makes it hard to read. Treating every visitor with care is part of doing good work (*Iḥsān*).

### Reduced Motion

Phones and computers have a setting to **reduce motion**. CSS can read it:

```css
@media (prefers-reduced-motion: reduce) {
  .badge-new {
    animation: none;
  }
}
```

- Keep important information visible without the animation. The spinner page above still says "Loading…" in words.
- Big movements (sliding, zooming, spinning) should be switched off or made very small.

### Never Flash More Than 3 Times a Second

Fast flashing light can trigger **seizures** (sudden attacks) in some people with photosensitive epilepsy. The international web accessibility guidelines (WCAG) say: nothing on a page should **flash more than three times in any one second**.

So an animation that switches a bright colour on and off with a duration like `0.1s` (ten flashes every second) must **never** be used. Check the duration of every blinking or pulsing effect: one cycle should last well over one third of a second, and a calm effect usually lasts 1 second or more.

To get attention, use a slow, soft pulse (2 seconds or more) like the "New" badge, or simply clear words and good colour.

### Use Animation with Purpose

- Use motion to **explain**: something is loading, something new has arrived, a card has opened.
- Do not use motion to pressure people, like a fake "hurry!" shaking button. That is a deceptive pattern.
- One or two moving things on a page is plenty.

---

## 🌍 Real-World Connection: Loading Spinners Everywhere

When you submit a form on a hospital booking website, or a library catalogue searches for a book, you often see a spinner. It tells you: "the computer is working, please wait". Many of these spinners are a single element with a border and a `rotate` keyframe, just like the one you built. Good sites also show words like "Searching…", so people who cannot see the animation still know what is happening.

---

## 🔮 Predict the Output

```css
@keyframes slide {
  from { transform: translateX(0); }
  to   { transform: translateX(100px); }
}

.box {
  animation: slide 2s ease-in-out 3 alternate;
}
```

**Question**: How many times does the box move, which way, and where does it end?

<details>
<summary>👀 Click to check your answer</summary>

It plays **3 cycles** of 2 seconds (6 seconds in total). With `alternate`, cycle 1 goes right, cycle 2 comes back left, cycle 3 goes right again.

When it ends, there is no `forwards` fill mode, so the box **jumps back** to its normal place (`translateX(0)`). Add `forwards` to make it stay 100px to the right.

</details>

---

## ⚠️ Common Mistake

**Mistake 1: no duration.**

```css
/* Wrong */
.spinner {
  animation-name: spin;
}
```

**What happens:** the default duration is `0s`. The animation finishes instantly, so nothing seems to move.

```css
/* Fixed */
.spinner {
  animation: spin 1s linear infinite;
}
```

**Mistake 2: the names do not match.**

```css
/* Wrong */
@keyframes pulse { 50% { opacity: 0.6; } }

.badge-new {
  animation: puls 2s infinite;
}
```

**What happens:** the browser looks for keyframes called `puls`, finds none, and nothing moves. There is no error message. Check the spelling in both places.

---

## ✍️ Try It

**Tune the Catalogue Page**

1. Open `animations.html`.
2. Change the spinner's `1s` to `3s`. Does it feel calm or too slow? Now try `0.4s`. Choose the speed that feels right.
3. Change the badge pulse from `2s` to `0.2s`. Notice how stressful it feels. Change it back to `2s`.
4. Turn on "reduce motion" on your device (Windows: Settings → Accessibility → Visual effects → Animation effects off). Reload the page and check that nothing moves.

*Hint:* If step 4 still shows movement, check that the selectors in the `@media` block match your class names exactly.

---

## 📝 Recap

- A transition needs a trigger and has two states. An animation can start by itself, has many keyframes and can repeat.
- `@keyframes name { from {} to {} }` or with percentages describes the motion. `animation-name` and `animation-duration` make it play.
- The shorthand `animation: name duration timing delay count direction fill;` sets everything; the first time is the duration.
- `animation-fill-mode: both` avoids flicker before a delayed start and keeps the end state.
- Animate `transform` and `opacity` for smooth motion.
- Respect `prefers-reduced-motion`, keep the information visible without motion, and never flash more than 3 times a second.

---

## 📖 Key Terms

| Term | What It Means |
| :--- | :--- |
| **`@keyframes`** | A rule that names an animation and lists its key moments. |
| **Keyframe** | One step of an animation, written as `from`, `to` or a percentage. |
| **`animation`** | The shorthand that attaches keyframes to an element and sets their timing. |
| **Iteration** | One full cycle of an animation; `infinite` repeats forever. |
| **Fill mode** | Whether the first/last keyframe styles apply before the start or after the end. |
| **`prefers-reduced-motion`** | A media feature that is `reduce` when a person asks their device for less motion. |

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Give two differences between a transition and a `@keyframes` animation.
2. What do `from` and `to` mean as percentages?
3. Which value of `animation-iteration-count` makes an animation repeat forever?

<details>
<summary>Show answer</summary>

1. Any two: a transition needs a trigger such as `:hover`, an animation can start by itself; a transition has only a start and end, an animation can have many keyframes; an animation can repeat, a transition plays once per change.
2. `from` is `0%` and `to` is `100%`.
3. `infinite`.

</details>

### 🟡 Level 2: Apply
4. Write keyframes called `fade-in` that go from `opacity: 0` to `opacity: 1`. Then make `.notice` play it once over 0.8 seconds, after a 1-second delay, staying invisible during the delay.
5. Explain what this line does, part by part: `animation: float 3s ease-in-out infinite alternate;`

<details>
<summary>Show answer</summary>

4.
```css
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.notice {
  animation: fade-in 0.8s ease 1s both;
}
```

`both` (or `backwards`) keeps the notice at `opacity: 0` during the 1-second delay. `both` also keeps it at `opacity: 1` after the end.

5. `float` is the keyframes name. `3s` is the duration of one cycle. `ease-in-out` starts slowly, speeds up, then slows down. `infinite` repeats forever. `alternate` plays forwards, then backwards, so there is no jump between cycles.

</details>

### 🔴 Level 3: Challenge
Build a "Charity Drive" notice board with kind motion.
1. Make an `<h1>` and three notice cards (for example: clothes collection, book donation, tree planting).
2. Make each card fade and slide up into place when the page opens, one after another (0s, 0.15s, 0.3s delays). Use only `opacity` and `transform`.
3. Add a small "Today" badge to one card that pulses gently every 2 seconds.
4. Add a `prefers-reduced-motion` rule that turns all the motion off.
5. Check: does any part flash more than 3 times a second?

<details>
<summary>Show one possible answer</summary>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Charity Drive Notices</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f0fdfa;
        color: #134e4a;
        padding: 24px;
      }

      .notice {
        background-color: #ffffff;
        border-radius: 12px;
        padding: 16px;
        margin-bottom: 16px;
        animation: rise-in 0.6s ease-out both;
      }

      .notice:nth-child(2) {
        animation-delay: 0.15s;
      }

      .notice:nth-child(3) {
        animation-delay: 0.3s;
      }

      .badge {
        display: inline-block;
        background-color: #0f766e;
        color: #ffffff;
        font-size: 13px;
        padding: 2px 10px;
        border-radius: 999px;
        animation: pulse 2s ease-in-out infinite;
      }

      @keyframes rise-in {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.08);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .notice,
        .badge {
          animation: none;
        }
      }
    </style>
  </head>
  <body>
    <h1>Charity Drive Notices</h1>
    <section>
      <article class="notice">
        <h2>Winter clothes collection <span class="badge">Today</span></h2>
        <p>Bring clean coats and sweaters to the school gate.</p>
      </article>
      <article class="notice">
        <h2>Book donation week</h2>
        <p>Share storybooks you have finished with younger readers.</p>
      </article>
      <article class="notice">
        <h2>Tree planting day</h2>
        <p>Join us in the park on Sunday morning.</p>
      </article>
    </section>
  </body>
</html>
```

**What you see:** the three cards rise into place one after another. The "Today" badge grows slightly and shrinks every 2 seconds, which is far below 3 flashes a second. With reduce motion turned on, the cards simply appear and the badge stays still.

</details>
