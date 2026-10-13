# Chapter 22: Creative Coding with Canvas 🎨

## 🌟 Real-Life Story

Zainab's science teacher draws a planet diagram on squared paper.
She says, "Start 3 squares from the left and 2 squares down, then draw a circle 4 squares wide."
Every student who follows those exact steps draws the same picture.
A computer screen is squared paper too, made of tiny dots called pixels.
In this chapter you give JavaScript exact drawing steps, and it paints shapes, patterns and even moving pictures.

---

## 🎯 What You Will Learn

- Set up an HTML `<canvas>` and get its 2D drawing context.
- Draw rectangles, outlines and circles in any colour.
- Use loops to make patterns of shapes.
- Animate a moving shape with `requestAnimationFrame()`.

---

## ✨ Code as a Paintbrush

Code is not only for lists and calculations.
JavaScript can also work like a paintbrush, an animator's desk and a science lab.
With the HTML **`<canvas>` element**, you can draw shapes, paint colourful patterns and build small science simulations, such as a ball bouncing inside a box.

---

## 🖼️ Setting Up the Canvas

A `<canvas>` is a blank rectangle of pixels on the page. You choose its size with `width` and `height`.
On its own it shows nothing. JavaScript does all the drawing.

### `canvas-demo.html`
```html
<!DOCTYPE html>
<html>
<head>
    <title>Canvas Playground</title>
    <style>
        body { margin: 0; background: #0f172a; display: flex; justify-content: center; align-items: center; height: 100vh; }
        canvas { background: #1e293b; border: 3px solid #38bdf8; border-radius: 12px; }
    </style>
</head>
<body>
    <canvas id="artCanvas" width="500" height="500"></canvas>
    <script src="art.js"></script>
</body>
</html>
```

### The 2D context: your paintbrush

In `art.js`, you find the canvas with `document.getElementById()`, as you did in Chapter 16.
Then you ask it for its **2D context**: an object full of drawing commands. We store it in a variable called `ctx` (short for context).

```javascript
const canvas = document.getElementById("artCanvas");
const ctx = canvas.getContext("2d");
```

### How positions work

Every point on the canvas has two numbers:
- `x`: how many pixels from the **left** edge.
- `y`: how many pixels down from the **top** edge.

So `(0, 0)` is the top-left corner. On a 500 × 500 canvas, the bottom-right corner is `(500, 500)`.
Watch out: `y` grows **downwards**, the opposite of a maths graph.

```text
(0,0) ------- x grows -------> (500,0)
  |
  |   y grows downwards
  v
(0,500)                     (500,500)
```

---

## 🖌️ Basic Shapes and Colours

```javascript
const canvas = document.getElementById("artCanvas");
const ctx = canvas.getContext("2d");

// 1. A filled blue rectangle
ctx.fillStyle = "#3b82f6";
ctx.fillRect(50, 50, 150, 100); // (x, y, width, height)

// 2. An outlined yellow square
ctx.strokeStyle = "#eab308";
ctx.lineWidth = 4;
ctx.strokeRect(250, 50, 100, 100);

// 3. A filled pink circle
ctx.beginPath();
ctx.arc(250, 300, 60, 0, Math.PI * 2); // (x, y, radius, startAngle, endAngle)
ctx.fillStyle = "#ec4899";
ctx.fill();
```

What each command does:
- `fillStyle` sets the paint colour for filled shapes. `fillRect()` paints a solid rectangle.
- `strokeStyle` and `lineWidth` set the colour and thickness of outlines. `strokeRect()` draws only the outline.
- A circle takes three steps. `beginPath()` starts a new shape. `arc()` traces the circle. `fill()` paints it (or `stroke()` outlines it).
- Angles in `arc()` are measured in **radians**, not degrees. A full circle is `Math.PI * 2` (about 6.28), so `0` to `Math.PI * 2` draws the whole circle.

---

## 🌀 Patterns with Loops: Rainbow Rings

Loops and colours together make patterns with very little code. Each round of this loop draws a bigger ring in a new colour.

`hsl(...)` is another way to write a colour. The first number is the position on the colour wheel, from 0 to 360 (0 is red, 120 is green, 240 is blue). The other two set how strong and how light the colour is.

```javascript
// Draw rings that share one centre
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

for (let i = 1; i <= 20; i++) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, i * 10, 0, Math.PI * 2);
    ctx.strokeStyle = `hsl(${i * 18}, 100%, 60%)`;
    ctx.lineWidth = 3;
    ctx.stroke();
}
```

The result is 20 rings, from radius 10 to radius 200, whose colours move all the way round the colour wheel (20 × 18 = 360).

---

## ⚽ Animation: The Bouncing Ball Simulation

A flip book is a stack of still drawings flipped quickly. Each picture is called a **frame**.
Animation in code works the same way: clear the canvas, draw, move a little, and repeat.

The browser gives us a built-in function for the "repeat" part: `requestAnimationFrame(functionName)`.
It asks the browser to run that function once more, just before the screen next refreshes.
Most screens refresh about 60 times every second (60 FPS, frames per second).
If the function asks again at its end, it keeps running smoothly, frame after frame.

```javascript
let x = 100;
let y = 100;
let dx = 4; // horizontal speed (pixels per frame)
let dy = 3; // vertical speed (pixels per frame)
let radius = 20;

function animate() {
    // 1. Clear the previous frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Draw the ball
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = "#22c55e";
    ctx.fill();

    // 3. Bounce off the walls
    if (x + radius > canvas.width || x - radius < 0) {
        dx = -dx; // reverse horizontal direction
    }
    if (y + radius > canvas.height || y - radius < 0) {
        dy = -dy; // reverse vertical direction
    }

    // 4. Move the ball
    x += dx;
    y += dy;

    // 5. Ask the browser to run animate() again for the next frame
    requestAnimationFrame(animate);
}

// Start the animation
animate();
```

The ball's edge is at `x + radius` on the right and `x - radius` on the left. When an edge passes a wall, the speed flips sign, so the ball turns back, just like a real ball bouncing in a box.

---

## ⚠️ Common Mistake

**Forgetting to clear the canvas in an animation**

```javascript
function animate() {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    x += dx;
    requestAnimationFrame(animate);
}
```

- **What happens:** instead of a moving ball, you see a thick smeared line. Every old frame stays on the canvas.
- **Fix:** start each frame with `ctx.clearRect(0, 0, canvas.width, canvas.height);` so only the newest ball is visible.

**Forgetting `beginPath()` before a new circle:** the new `arc()` joins onto the old shape, so a later `fill()` or `stroke()` repaints earlier circles too, sometimes with stray lines between them. Call `beginPath()` before every new circle.

---

## ✍️ Try It

Use the `canvas-demo.html` page above and draw a simple school building in `art.js`:
1. A large rectangle for the building.
2. A smaller, darker rectangle at the bottom for the door.
3. Two square windows.
4. A yellow sun (a filled circle) in the top-right corner.

> 💡 **Hint:** set `fillStyle` before each shape. Remember that `y` counts down from the top, so the door needs a bigger `y` than the windows.

---

## 📝 Recap

- `<canvas>` is a blank grid of pixels. `canvas.getContext("2d")` gives the "paintbrush" called `ctx`.
- Positions are `(x, y)`: pixels from the left, and pixels down from the top.
- `fillRect`, `strokeRect` and `arc` draw shapes. `fillStyle` and `strokeStyle` choose colours.
- Loops repeat drawings to make patterns.
- An animation clears the canvas, draws, moves the shape, then calls `requestAnimationFrame()` for the next frame.

**Check yourself:**

- [ ] I can add a `<canvas>` element to an HTML page.
- [ ] I can get the 2D drawing context with `canvas.getContext("2d")`.
- [ ] I can draw rectangles, outlines and circles.
- [ ] I can explain how `requestAnimationFrame()` makes smooth animation (usually about 60 frames per second).

---

## 🏆 Practice

### 🟢 Level 1: Recall
In `ctx.fillRect(50, 50, 150, 100)`, what do the four numbers mean?

<details>
<summary>Show answer</summary>

`x` (50 pixels from the left), `y` (50 pixels down from the top), `width` (150) and `height` (100).

</details>

### 🟡 Level 2: Apply
Planetarium Night Sky: fill the canvas dark blue, then draw 200 tiny white stars at random places with a `for` loop and `Math.random()`.

<details>
<summary>Show answer</summary>

```javascript
const canvas = document.getElementById("artCanvas");
const ctx = canvas.getContext("2d");

// Dark night background
ctx.fillStyle = "#0f172a";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// 200 tiny stars at random places
ctx.fillStyle = "white";
for (let i = 0; i < 200; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let size = Math.random() * 2 + 1; // 1 to 3 pixels
    ctx.fillRect(x, y, size, size);
}
```

Each time you reload, the stars appear in new places.

</details>

### 🔴 Level 3: Challenge
Pastel Particle Trail:
1. Listen for the `mousemove` event on the canvas. It fires every time the mouse moves over it.
2. Give the listener function a parameter called `event`. The browser fills it with details of the event. `event.offsetX` and `event.offsetY` are the mouse position inside the canvas.
3. Draw a small circle where the mouse is, in a pastel colour picked at random from an array.
4. Make old circles fade by painting a see-through dark layer over the canvas each time.

<details>
<summary>Show one possible answer</summary>

```javascript
const canvas = document.getElementById("artCanvas");
const ctx = canvas.getContext("2d");
const pastels = ["#fbcfe8", "#bfdbfe", "#bbf7d0", "#fde68a", "#ddd6fe"];

canvas.addEventListener("mousemove", function(event) {
    // Paint a see-through layer to slowly fade old circles
    ctx.fillStyle = "rgba(15, 23, 42, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Pick a random pastel colour
    let colour = pastels[Math.floor(Math.random() * pastels.length)];

    // Draw a circle where the mouse is
    ctx.beginPath();
    ctx.arc(event.offsetX, event.offsetY, 10, 0, Math.PI * 2);
    ctx.fillStyle = colour;
    ctx.fill();
});
```

`rgba(15, 23, 42, 0.1)` is a dark blue colour with a fourth number for how solid it is: `0.1` means 10% solid. Painting it again and again makes older circles slowly disappear.

</details>
