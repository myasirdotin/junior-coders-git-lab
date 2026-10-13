*Part 15 · Creative Coding*
# Creative Coding with JavaScript & HTML5 Canvas 🎨

---

## 🎯 What You Will Learn

- Set up an HTML `<canvas>` and get its 2D drawing context.
- Draw rectangles, outlines and circles in any colour.
- Use loops to make patterns of shapes.
- Animate a moving shape with `requestAnimationFrame()`.

---

## ✨ Welcome to the World of Creative Coding!

Who said coding is only about business spreadsheets and math quizzes?
JavaScript can also be used like a digital paintbrush, an animator's studio, and a science lab! 
With the **HTML5 `<canvas>` element**, you can draw shapes, paint rainbow spirals, create bouncy physics particles, and even program your own 2D science simulations!

---

## 🖼️ Setting Up the Canvas Playground

The `<canvas>` tag provides a blank rectangular pixel grid. We use JavaScript to get its **2D Context** (`ctx`), which acts like our paintbrush.

### `canvas-demo.html`
```html
<!DOCTYPE html>
<html>
<head>
    <title>Canvas Playground</title>
    <style>
        body { margin: 0; background: #0f172a; display: flex; justify-content: center; align-items: center; height: 100vh; }
        canvas { background: #1e293b; border: 3px solid #38bdf8; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
    </style>
</head>
<body>
    <canvas id="artCanvas" width="500" height="500"></canvas>
    <script src="art.js"></script>
</body>
</html>
```

---

## 🖌️ Basic Shapes and Colors

### Drawing Rectangles and Circles
```javascript
const canvas = document.getElementById("artCanvas");
const ctx = canvas.getContext("2d");

// 1. Draw a filled blue rectangle
ctx.fillStyle = "#3b82f6";
ctx.fillRect(50, 50, 150, 100); // (x, y, width, height)

// 2. Draw an outlined yellow square
ctx.strokeStyle = "#eab308";
ctx.lineWidth = 4;
ctx.strokeRect(250, 50, 100, 100);

// 3. Draw a glowing circle / arc
ctx.beginPath();
ctx.arc(250, 300, 60, 0, Math.PI * 2); // (x, y, radius, startAngle, endAngle)
ctx.fillStyle = "#ec4899";
ctx.fill();
ctx.closePath();
```

---

## 🌀 Algorithmic Art: Rainbow Rings

When you combine loops and colours, a few lines of code create beautiful patterns. Each round of this loop draws a bigger ring in a new colour. (`hsl(...)` picks a colour by its position on the colour wheel, from 0 to 360.)

```javascript
// Draw concentric colorful rings
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

---

## ⚽ Animation: The Bouncing Ball Simulation

Animations in JavaScript use a built-in function called `requestAnimationFrame()`.
It asks the browser to run our drawing function again before the next screen refresh. On most screens that is about 60 times every second (60 FPS, frames per second):

```javascript
let x = 100;
let y = 100;
let dx = 4; // horizontal speed
let dy = 3; // vertical speed
let radius = 20;

function animate() {
    // 1. Clear previous frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Draw ball
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = "#22c55e";
    ctx.fill();
    ctx.closePath();

    // 3. Bounce off walls
    if (x + radius > canvas.width || x - radius < 0) {
        dx = -dx; // reverse horizontal direction
    }
    if (y + radius > canvas.height || y - radius < 0) {
        dy = -dy; // reverse vertical direction
    }

    // 4. Update position
    x += dx;
    y += dy;

    // 5. Ask browser to render next frame
    requestAnimationFrame(animate);
}

// Start animation!
animate();
```

---

## 📝 Recap

- `<canvas>` is a blank grid of pixels. `canvas.getContext("2d")` gives the "paintbrush" called `ctx`.
- `fillRect`, `strokeRect` and `arc` draw shapes. `fillStyle` and `strokeStyle` choose colours.
- Loops repeat drawings to make patterns.
- An animation clears the canvas, draws, moves the shape, then asks for the next frame.

---

## 🏆 Practice

### 🟢 Level 1: Recall
In `ctx.fillRect(50, 50, 150, 100)`, what do the four numbers mean?

<details>
<summary>Show answer</summary>

`x` (50 pixels from the left), `y` (50 pixels from the top), `width` (150) and `height` (100).

</details>

### 🟡 Level 2: Apply
Starry Night Sky: fill the canvas dark blue, then draw 200 tiny white stars at random places with a `for` loop and `Math.random()`.

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
1. Listen for the `mousemove` event on the canvas.
2. Draw a small circle where the mouse is, in a random pastel colour.
3. Make old circles fade by painting a see-through dark layer over the canvas each time.

Extra idea: make a circle grow and shrink like a heartbeat using `Math.sin(Date.now() / 200)` inside an animation.

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

`event.offsetX` and `event.offsetY` give the mouse position inside the canvas. The see-through layer (`0.1` means 10% solid) makes older circles slowly disappear.

</details>

---

## ✅ Summary Checklist

- [ ] I know how to add a `<canvas>` element to HTML.
- [ ] I can obtain the 2D rendering context using `canvas.getContext("2d")`.
- [ ] I can draw rectangles, lines, and circles.
- [ ] I understand how `requestAnimationFrame()` creates smooth animations (usually about 60 frames per second).
