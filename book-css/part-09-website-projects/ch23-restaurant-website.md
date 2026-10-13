# Chapter 23: Restaurant Website 🍽️

---

## 🌟 Real-Life Story

**The Cosy Family Restaurant**

Imagine walking down a cobblestone street on a rainy evening:
- You look through the warm glass window of *Luigi’s Trattoria*.
- Inside, the lights are soft and golden. You smell wood-fired pizza dough, bubbling tomato sauce, and fresh basil leaves.
- On the chalkboard easel outside the doorway, the chef has sketched tonight’s specials in chalk: *Handmade Spinach Gnocchi* and *Crispy Brick-Oven Margherita*.
- A framed menu displays mouth-watering photos of pastas, desserts, and fresh salads, complete with prices and dietary tags (*Halal*, *Vegetarian*, *Gluten-Free*).

When people visit a restaurant website, they want to feel that exact same appetite and warmth! 
**A great restaurant website makes visitors hungry within a few seconds!**
In this capstone chapter, you will build a complete, appetite-inducing restaurant website with a digital menu, mouth-watering food cards, chef story, and table reservation form!

---

## 🎯 What You Will Learn

By the end of this chapter, you will be able to:
- Choose a warm colour theme and bold typography for a family restaurant.
- Build a digital menu of food cards with photos, prices and dietary badges (*Halal*, *Vegetarian*).
- Line up dish names and prices with Flexbox.
- Style a table reservation form and an opening-hours section.

---

## 👁️ Visual Concept Explanation

### The Restaurant Website Architecture

```text
┌─────────────────────────────────┐
│ HEADER: Bella Vista             │
│ Home  Menu  Story  Book         │
├─────────────────────────────────┤
│ HERO: "Handmade Italian         │
│ Tradition", 100% halal          │
│ [Reserve a Table]               │
├─────────────────────────────────┤
│ CHEF'S DISHES (3 food cards)    │
│ ┌─────────┐┌─────────┐┌───────┐ │
│ │🍕 Pizza ││🍝 Pasta ││🍰 Date│ │
│ │ $15.50  ││ $18.90  ││ Cake  │ │
│ └─────────┘└─────────┘└───────┘ │
├─────────────────────────────────┤
│ OUR STORY: family recipes       │
├─────────────────────────────────┤
│ BOOKING FORM: date, time,       │
│ guests, [Submit]                │
└─────────────────────────────────┘
```

---

## 💻 Code Example: Complete Restaurant Website

Type this into your editor and save it as `restaurant.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bella Vista Trattoria | Italian Kitchen</title>
    <style>
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #fffbeb; /* Warm vanilla cream */
        color: #292524;            /* Warm charcoal */
        line-height: 1.6;
      }

      /* Navigation */
      header {
        background-color: #ffffff;
        border-bottom: 2px solid #ea580c; /* Warm terracotta orange */
        position: sticky;
        top: 0;
        z-index: 100;
      }

      .nav-container {
        max-width: 1100px;
        margin: 0 auto;
        padding: 16px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .logo {
        font-family: Georgia, serif;
        font-size: 24px;
        font-weight: bold;
        color: #c2410c;
        text-decoration: none;
      }

      .nav-links {
        display: flex;
        list-style: none;
        gap: 24px;
      }

      .nav-links a {
        text-decoration: none;
        color: #44403c;
        font-weight: 600;
        transition: color 0.2s;
      }

      .nav-links a:hover {
        color: #ea580c;
      }

      /* Hero Banner */
      .hero {
        background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
                    url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200');
        background-size: cover;
        background-position: center;
        color: #ffffff;
        text-align: center;
        padding: 100px 20px;
      }

      .hero h1 {
        font-family: Georgia, serif;
        font-size: 48px;
        margin-bottom: 12px;
      }

      .hero p {
        font-size: 20px;
        color: #fef08a; /* Warm golden light */
        max-width: 600px;
        margin: 0 auto 24px auto;
      }

      .btn-cta {
        display: inline-block;
        background-color: #ea580c;
        color: white;
        padding: 14px 32px;
        border-radius: 999px;
        text-decoration: none;
        font-weight: 700;
        transition: background-color 0.2s, transform 0.2s;
      }

      .btn-cta:hover {
        background-color: #c2410c;
        transform: translateY(-2px);
      }

      /* Main Content */
      .container {
        max-width: 1100px;
        margin: 0 auto;
        padding: 60px 20px;
      }

      .section-title {
        text-align: center;
        font-family: Georgia, serif;
        font-size: 32px;
        color: #9a3412;
        margin-bottom: 8px;
      }

      .section-sub {
        text-align: center;
        color: #78716c;
        margin-bottom: 40px;
      }

      /* Menu Grid */
      .menu-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 28px;
        margin-bottom: 60px;
      }

      .food-card {
        background: #ffffff;
        border-radius: 16px;
        overflow: hidden;
        border: 1px solid #fed7aa;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.04);
        transition: transform 0.3s;
      }

      .food-card:hover {
        transform: translateY(-6px);
      }

      .food-card img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        display: block;
      }

      .food-info {
        padding: 20px;
      }

      .food-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
      }

      .food-name {
        font-weight: 700;
        font-size: 18px;
        color: #1c1917;
      }

      .food-price {
        font-weight: 800;
        color: #ea580c;
        font-size: 18px;
      }

      .food-desc {
        color: #78716c;
        font-size: 14px;
        line-height: 1.5;
        margin-bottom: 12px;
      }

      .badge-vegan {
        background-color: #dcfce7;
        color: #15803d;
        font-size: 11px;
        font-weight: 700;
        padding: 3px 8px;
        border-radius: 6px;
      }

      /* Reservation Section */
      .booking-box {
        background-color: #ffffff;
        border: 2px solid #fed7aa;
        border-radius: 20px;
        padding: 40px;
        max-width: 650px;
        margin: 0 auto;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.04);
      }

      .form-row {
        display: flex;
        gap: 16px;
        margin-bottom: 16px;
      }

      .form-field {
        flex: 1;
      }

      .form-field label {
        display: block;
        font-weight: 600;
        font-size: 13px;
        margin-bottom: 6px;
      }

      .form-field input,
      .form-field select {
        width: 100%;
        padding: 10px 14px;
        border: 1px solid #d6d3d1;
        border-radius: 8px;
        font-family: inherit;
      }

      /* Footer */
      footer {
        background-color: #292524;
        color: #d6d3d1;
        padding: 40px 20px;
        text-align: center;
        font-size: 14px;
      }
    </style>
  </head>
  <body>

    <!-- Navigation -->
    <header>
      <nav class="nav-container">
        <a href="#" class="logo">🍕 Bella Vista</a>
        <ul class="nav-links">
          <li><a href="#menu">Menu</a></li>
          <li><a href="#story">Our Story</a></li>
          <li><a href="#book">Book a Table</a></li>
          <li><a href="#contact">Hours</a></li>
        </ul>
      </nav>
    </header>

    <!-- Hero Banner -->
    <section class="hero">
      <h1>Handmade Italian Tradition</h1>
      <p>A 100% halal family kitchen: wood-fired pizzas, hand-rolled pasta and organic ingredients.</p>
      <a href="#book" class="btn-cta">Reserve Your Table 🍽️</a>
    </section>

    <!-- Main Menu -->
    <main class="container">
      <section id="menu">
        <h2 class="section-title">Chef's Signature Dishes</h2>
        <p class="section-sub">Baked to crisp perfection in our authentic 800-degree stone oven.</p>

        <div class="menu-grid">
          <!-- Dish 1 -->
          <div class="food-card">
            <img src="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500" alt="Margherita Pizza">
            <div class="food-info">
              <div class="food-header">
                <span class="food-name">Margherita Antica</span>
                <span class="food-price">$15.50</span>
              </div>
              <p class="food-desc">San Marzano tomato sauce, fresh buffalo mozzarella, virgin olive oil, and sweet basil.</p>
              <span class="badge-vegan">🌱 Vegetarian</span>
            </div>
          </div>

          <!-- Dish 2 -->
          <div class="food-card">
            <img src="https://images.unsplash.com/photo-1621996346565-e3d5d628169b?w=500" alt="Ribbon pasta in tomato sauce">
            <div class="food-info">
              <div class="food-header">
                <span class="food-name">Halal Beef Tagliatelle</span>
                <span class="food-price">$18.90</span>
              </div>
              <p class="food-desc">Fresh egg ribbon pasta in a slow-cooked tomato sauce with halal beef and basil.</p>
            </div>
          </div>

          <!-- Dish 3 -->
          <div class="food-card">
            <img src="https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500" alt="Chocolate and date layer cake">
            <div class="food-info">
              <div class="food-header">
                <span class="food-name">Chocolate &amp; Date Layer Cake</span>
                <span class="food-price">$8.50</span>
              </div>
              <p class="food-desc">Soft chocolate sponge layered with date cream and a dusting of cocoa.</p>
              <span class="badge-vegan">🌱 Vegetarian</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Reservation Booking Section -->
      <section id="book">
        <h2 class="section-title">Reserve a Table</h2>
        <p class="section-sub">Join us for lunch or dinner. We look forward to hosting your family!</p>

        <div class="booking-box">
          <form>
            <div class="form-row">
              <div class="form-field">
                <label for="bookName">Guest Name</label>
                <input type="text" id="bookName" placeholder="Full Name" required>
              </div>
              <div class="form-field">
                <label for="bookPhone">Phone Number</label>
                <input type="tel" id="bookPhone" placeholder="+91-94190-00000" required>
              </div>
            </div>

            <div class="form-row">
              <div class="form-field">
                <label for="bookDate">Date</label>
                <input type="date" id="bookDate" required>
              </div>
              <div class="form-field">
                <label for="guests">Guests</label>
                <select id="guests">
                  <option>2 Guests</option>
                  <option>4 Guests</option>
                  <option>6 Guests</option>
                  <option>8+ Party</option>
                </select>
              </div>
            </div>

            <button type="submit" class="btn-cta" style="width: 100%; border: none; cursor: pointer; font-size: 16px;">
              Confirm Reservation ✔️
            </button>
          </form>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer id="contact">
      <p style="font-weight: bold; margin-bottom: 6px;">Bella Vista Trattoria</p>
      <p style="margin-bottom: 12px;">Boulevard Road, Dal Lake, Srinagar • Open Daily 11:30 AM - 10:00 PM</p>
      <p>&copy; 2026 Bella Vista. Authentic Hospitality & Passion.</p>
    </footer>

  </body>
</html>
```

---

## 🔍 Code Explanation: Food Psychology in Web Design

- **Appetite Color Palette**: Warm tones (warm terracotta orange `#ea580c`, golden yellow `#fef08a`, and vanilla cream `#fffbeb`) are proven by psychology to stimulate hunger and comfort!
- `font-family: Georgia, serif;`: Traditional serif typography on restaurant titles suggests timeless recipe heritage, artisan quality, and elegance.
- Dietary Badges: Small pill tags (`🌱 Vegetarian`, `🌾 Gluten-Free`) help guests with dietary needs spot safe dishes instantly.

---

## 🌍 Real-World Connection: Menu Scanning Habits

Watch how people read an online menu:
- Most visitors look at the food photo first, then the dish name, then the price.
- Blurry or missing photos make it hard to decide, so people may leave the page.
- Clear, honest photos and easy-to-read text help guests choose quickly.

---

## 🔮 Predict the Output

If you place 4 food cards in the `.menu-grid`, how will they arrange themselves on a wide 1200px desktop screen?

<details>
<summary>👀 Click to check your answer</summary>
<strong>Answer:</strong> They will arrange into a neat 4-column row or 2-by-2 grid! Because of <code>minmax(300px, 1fr)</code>, on a 1200px monitor, four 300px cards fit across the row!
</details>

---

## 🕵️ Code Detective: The Misaligned Prices

A student created food cards, but the prices appeared under the dish description instead of next to the title:

```html
<!-- Broken Code -->
<div class="food-header">
  <span class="food-name">Margherita</span>
</div>
<p class="food-desc">Tomato and cheese.</p>
<span class="food-price">$15.00</span>
```

- **Find the mistake**: Look where `.food-price` is placed!
- **Explain the mistake**: To make the dish name sit on the left and price sit on the right, both MUST be inside the `.food-header` that has `display: flex; justify-content: space-between;`!
- **Fix the code**: Put the price inside the header:
  ```html
  <!-- Fixed Code -->
  <div class="food-header">
    <span class="food-name">Margherita</span>
    <span class="food-price">$15.00</span>
  </div>
  <p class="food-desc">Tomato and cheese.</p>
  ```

---

## 🎨 Think Like a Web Designer: Mobile Table Reservations

Over 70% of restaurant reservations happen on a smartphone while people are walking or riding in a car.
- Ensure the reservation date picker and submit button are easy to tap with one thumb!
- Keep form fields stacked in 1 column on screens under 600px!

---

## 🚀 Mini Challenge: Add a Customer Reviews Section

Add a testimonial section:
- 3 customer review quote cards.
- Star rating emojis (⭐⭐⭐⭐⭐).
- Use clearly labelled **sample** reviews, e.g. *"Lovely family dinner!" — Sample Guest*. Never invent reviews for a real business.

---

## ⚠️ Common Mistake

A common mistake is putting a price in a long text line instead of its own element.

```html
<!-- Wrong -->
<p class="food-name">Margherita Antica - $15.50</p>
```

**What happens:** the price is glued to the name. You cannot push it to the right, colour it, or keep all prices lined up in a column.

```html
<!-- Fixed -->
<div class="food-header">
  <span class="food-name">Margherita Antica</span>
  <span class="food-price">$15.50</span>
</div>
```

```css
.food-header {
  display: flex;
  justify-content: space-between;
}
```

A second slip is food photos without `width: 100%` and `object-fit: cover`. Photos of different sizes make the cards uneven, and large photos can stick out of the card on a phone.

---

## ✍️ Try It

**Add a Dessert Card**

Open `restaurant.html` and add a fourth dish to the `.menu-grid`:
- Photo: Homemade Gelato
- Name: *Artisan Pistachio Gelato*
- Price: *$6.50*
- Tag: *🌱 Vegetarian*

---

## 📝 Recap

- Restaurant websites succeed through mouth-watering imagery and warm color palettes.
- Food cards combine high-resolution photography, dish titles, prices, and dietary tags.
- Internal Flexbox keeps prices aligned horizontally with dish names.
- Reservation forms allow two-way customer engagement directly from the site.

---

## 📖 Key Terms

| Term | What It Means |
| :--- | :--- |
| **Dietary Badge** | A small visual chip indicating vegetarian, vegan, or allergy status. |
| **Warm Palette** | Red, orange, and golden hues known to evoke warmth and stimulate appetite. |
| **Date Input (`<input type="date">`)** | Native browser calendar picker for scheduling bookings. |
| **Food Card** | A specialized UI card presenting culinary items, ingredients, and prices. |

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which input type shows a calendar date picker?
2. Which colours are usually used to make food look appetising: cool blues or warm reds and oranges?
3. Which Flexbox property puts a dish name on the left and its price on the right?

<details>
<summary>Show answer</summary>

1. `<input type="date">`.
2. **Warm** colours: reds, oranges and golden yellows.
3. `justify-content: space-between;` on a `display: flex;` container.

</details>

### 🟡 Level 2: Apply
4. Write HTML and CSS for a green badge that says "Halal".
5. Why are clear food photos so important on a restaurant website?

<details>
<summary>Show answer</summary>

4.
```html
<span class="badge-halal">✅ Halal</span>
```

```css
.badge-halal {
  display: inline-block;
  background-color: #dcfce7;
  color: #166534;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: bold;
}
```

Dark green text on pale green has strong contrast, and the word "Halal" carries the meaning, not just the colour.

5. Guests decide with their eyes first. Clear, honest photos show what they will get, so they can choose quickly and trust the restaurant.

</details>

### 🔴 Level 3: Challenge
Make menu tabs with no JavaScript.
1. Add three radio buttons (`name="meal"`) with labels *Breakfast*, *Lunch* and *Dinner*, each followed by a `<div class="panel">`.
2. Hide every panel with `display: none;`.
3. Use `input:checked + label + .panel` to show only the panel after the checked button.
4. Style the checked label so it looks selected.

<details>
<summary>Show one possible answer</summary>

```html
<div class="tabs">
  <input type="radio" name="meal" id="b" checked>
  <label for="b">Breakfast</label>
  <div class="panel">Eggs, fresh bread and fruit.</div>

  <input type="radio" name="meal" id="l">
  <label for="l">Lunch</label>
  <div class="panel">Margherita pizza and salad.</div>

  <input type="radio" name="meal" id="d">
  <label for="d">Dinner</label>
  <div class="panel">Halal beef tagliatelle.</div>
</div>
```

```css
.tabs input {
  position: absolute;
  opacity: 0; /* hidden but still usable by keyboard */
}
.tabs label {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 999px;
  cursor: pointer;
}
.tabs .panel {
  display: none;
  padding: 16px 0;
}
.tabs input:checked + label {
  background-color: #b45309;
  color: #ffffff;
}
.tabs input:checked + label + .panel {
  display: block;
}
```

`+` selects the element **right after** another. Clicking a label checks its radio button, so its label turns brown and the panel after it appears. Only one panel shows at a time, right after its own label. (Real tab bars often use a little JavaScript to put all panels below the tabs.)

</details>
