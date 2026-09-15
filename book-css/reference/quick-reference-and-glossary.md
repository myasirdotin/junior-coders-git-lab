# CSS Reference & Glossary
# Quick Reference Cheat Sheet and CSS Property Dictionary 🎨📖

---

## 1. CSS Syntax Anatomy 📐

```css
selector {
    property: value;
    another-property: value;
}
```

---

## 2. Core CSS Properties 🎨

### Colors & Backgrounds
- `color: #7c3aed;`: Text foreground color
- `background-color: #f8fafc;`: Solid background color
- `background: linear-gradient(135deg, #7c3aed, #4f46e5);`: Gradient background
- `background-image: url('pattern.png');`: Image backdrop
- `background-size: cover | contain;`: Background scaling

### Typography
- `font-family: 'Outfit', sans-serif;`: Font family
- `font-size: 1.25rem | 20px;`: Font size
- `font-weight: 400 (normal) | 700 (bold) | 800;`: Font weight
- `text-align: left | center | right;`: Text alignment
- `line-height: 1.6;`: Vertical distance between lines
- `letter-spacing: 0.05em;`: Kerning spacing between letters

### Box Model & Spacing
- `width`, `height`, `max-width`, `min-height`: Dimensions
- `padding: 1rem 1.5rem;`: Internal breathing space inside border
- `margin: 1rem auto;`: External spacing outside border
- `border: 1px solid #e2e8f0;`: Border stroke
- `border-radius: 8px | 50%;`: Rounded corners or circular avatars
- `box-shadow: 0 4px 16px rgba(0,0,0,0.15);`: Elevation shadow

### Layout & Flexbox
- `display: flex;`: Activates flexible container layout
- `flex-direction: row | column;`: Direction of flex flow
- `justify-content: space-between | center | flex-start;`: Main-axis alignment
- `align-items: center | stretch;`: Cross-axis alignment
- `gap: 1rem;`: Space between flex/grid items

### CSS Grid
- `display: grid;`: Activates grid container
- `grid-template-columns: repeat(3, 1fr);`: 3 equal-width columns
- `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));`: Auto-responsive grid

### Positioning
- `position: static | relative | absolute | fixed | sticky;`
- `top`, `bottom`, `left`, `right`: Offset coordinates
- `z-index: 100;`: Stacking order layer

### Transitions & Effects
- `transition: all 0.25s ease;`: Smooth property animation
- `transform: translateY(-4px) scale(1.02);`: Spatial translation
- `opacity: 0.85;`: Transparency
- `cursor: pointer;`: Interactive hand cursor

---

## 3. CSS Glossary 📚

| Term | Definition |
| :--- | :--- |
| **Selector** | Targets the HTML elements to style (e.g. `.class`, `#id`, `element`). |
| **Specificity** | Priority system browsers use to decide which CSS rule wins when conflicts occur. |
| **Box Model** | The 4-layer box around every element: Content, Padding, Border, Margin. |
| **Flexbox** | 1-dimensional layout engine for arranging items in a row or column. |
| **CSS Grid** | 2-dimensional layout engine for arranging items in both rows and columns simultaneously. |
| **Media Query** | Rule `@media (max-width: 768px)` that applies styles only on specific screen sizes. |
