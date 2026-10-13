# Chapter 15: Restaurant Website 🍕

---

## 🌟 Real-Life Story

Imagine walking down a cobblestone street on a rainy evening:
- You look through the warm glass window of *Luigi’s Trattoria*.
- Inside, the lights are soft and golden. You smell wood-fired pizza dough, bubbling tomato sauce, and fresh basil leaves.
- On the chalkboard easel outside the doorway, the chef has sketched tonight’s specials in chalk: *Handmade Truffle Gnocchi* and *Crispy Brick-Oven Margherita*.
- A framed menu displays mouth-watering photos of pastas, desserts, and fresh salads, complete with prices and dietary tags (*Vegetarian*, *Gluten-Free*).

When people visit a restaurant website, they want to feel that exact same appetite and warmth! 
**A great restaurant website makes your mouth water at first glance!**
In this project chapter, you will build a complete restaurant website with a digital menu, food cards, a chef's story and a table booking form!

> 🎨 **About the `<style>` block:** the page comes with ready-made CSS so it looks polished. You will learn to write CSS like this in the CSS track. For now, copy it as it is and focus on the HTML.

---

## 🎯 What You Will Learn

By the end of this chapter, you will be able to:
- Establish a warm, appetizing visual theme using rustic earthy colors.
- Build a hero header featuring bold typography and restaurant taglines.
- Construct an organized **Digital Menu** divided into categories (*Starters*, *Mains*, *Desserts*).
- Create detailed **Food Cards** with high-resolution food photography, prices, and dietary badges.
- Embed a **Table Reservation Booking Form**.
- Add location maps and opening hours for hungry guests.

---

## 👁️ Visual Concept Explanation

### The Restaurant Website Architecture

```text
┌──────────────────────────────────────┐
│ <header> 🍕 Bella Vista              │
│   <nav> Menu  Story  Book  Hours     │
├──────────────────────────────────────┤
│ HERO: "Handmade Italian Tradition"   │
│   [ Reserve Your Table ]             │
├──────────────────────────────────────┤
│ <section id="menu">  3 food cards    │
│ ┌──────────┐┌──────────┐┌──────────┐ │
│ │Margherita││Tagliatell││Tiramisù  │ │
│ │ $15.50   ││ $18.90   ││ $8.50    │ │
│ └──────────┘└──────────┘└──────────┘ │
├──────────────────────────────────────┤
│ <section id="book">  booking form    │
│   name, phone, date, guests, submit  │
├──────────────────────────────────────┤
│ <footer id="contact">  address, hours│
└──────────────────────────────────────┘
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
      <p>Wood-fired artisan pizzas, hand-rolled pasta, and organic ingredients from sunny Tuscany.</p>
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
            <img src="https://images.unsplash.com/photo-1621996346565-e3d5d628169b?w=500" alt="A plate of ribbon pasta">
            <div class="food-info">
              <div class="food-header">
                <span class="food-name">Tagliatelle al Tartufo</span>
                <span class="food-price">$18.90</span>
              </div>
              <p class="food-desc">Fresh egg ribbon pasta tossed in rich black truffle butter with shaved Parmigiano-Reggiano.</p>
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
                <input type="text" id="bookName" name="bookName" placeholder="Full Name" required>
              </div>
              <div class="form-field">
                <label for="bookPhone">Phone Number</label>
                <input type="tel" id="bookPhone" name="bookPhone" placeholder="+91-12345-67890" required>
              </div>
            </div>

            <div class="form-row">
              <div class="form-field">
                <label for="bookDate">Date</label>
                <input type="date" id="bookDate" name="bookDate" required>
              </div>
              <div class="form-field">
                <label for="guests">Guests</label>
                <select id="guests" name="guests">
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

- **Warm Colour Palette**: Warm tones (terracotta orange `#ea580c`, golden yellow `#fef08a`, and vanilla cream `#fffbeb`) are often chosen by food businesses because they feel cosy and inviting.
- `font-family: Georgia, serif;`: Traditional serif typography on restaurant titles suggests timeless recipe heritage, artisan quality, and elegance.
- Dietary Badges: Small pill tags (`🌱 Vegetarian`, `🌾 Gluten-Free`) help guests with dietary needs spot safe dishes instantly.

---

## 🌍 Real-World Connection: Menu Scanning Habits

Think about how you read a menu yourself:
- Most people look at the food photo first, then the dish name, then the price.
- Tiny or blurry photos make it hard to choose, so visitors may leave.
- Clear, honest photos (showing the real dish) and readable text build trust.

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

Many people book a table on their phone, often with one hand.
- Ensure the reservation date picker and submit button are easy to tap with one thumb!
- Keep form fields stacked in 1 column on screens under 600px!

---

## 🚀 Mini Challenge: Add a Customer Reviews Section

Add a testimonial section:
- 3 customer review quote cards.
- Star rating emojis (⭐⭐⭐⭐⭐).
- Guest name: *"The crispiest crust in the city!" — Marco T.* (Label these as sample reviews. A real site must only show reviews from real guests.)

---

## ⚠️ Common Mistake

**Using a `<div>` and plain text instead of a real form control.**

❌ Wrong:

```html
<div>Guests: 2 / 4 / 6</div>
<div>Book Now</div>
```

What happens: it looks like a form, but visitors cannot choose anything or press anything. Keyboard and screen reader users cannot reach it at all.

✅ Fixed: use real controls inside a `<form>`, each with a label and a name.

```html
<form>
  <label for="guests">Guests</label>
  <select id="guests" name="guests">
    <option>2 Guests</option>
    <option>4 Guests</option>
  </select>
  <button type="submit">Book Now</button>
</form>
```

---

## ✍️ Try It

**Add a Dessert Card**

Open `restaurant.html` and add a fourth dish to the `.menu-grid`:
- Photo: Homemade Gelato
- Name: *Artisan Pistachio Gelato*
- Price: *$6.50*
- Tag: *🌱 Vegetarian*

> 💡 **Hint:** Copy one whole `<div class="food-card">` block, from its opening tag to its matching `</div>`, paste it after the third card, and change the text, price and `alt`.

---

## 📝 Recap

- A restaurant site needs a clear outline: header and nav, hero, menu, booking form, footer with hours.
- Each food card groups a photo (with honest `alt` text), a dish name, a price, a description and a dietary tag.
- Where an element sits in the HTML decides where the ready-made CSS can place it.
- The booking form uses `type="tel"`, `type="date"` and `<select>`, each with a label and a name; PHP will process it later.

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
1. Which input type shows a calendar to pick a date?
2. Which input type is meant for phone numbers?
3. Which tag makes a drop-down list of choices?

<details>
<summary>Show answer</summary>

1. `type="date"`
2. `type="tel"`
3. `<select>` with `<option>` items inside.

</details>

### 🟡 Level 2: Apply
1. Write a dietary badge reading "🌾 Gluten-Free" using the same class as the existing badges.
2. Why should a food photo's `alt` describe the real dish, and why should the photo show the real dish?

<details>
<summary>Show answer</summary>

1.

```html
<span class="badge-vegan">🌾 Gluten-Free</span>
```

2. The `alt` tells screen reader users what the dish looks like. An honest photo (and honest alt) means guests get what they expected. Showing a different or "improved" dish would mislead people, and truthfulness (*Ṣidq*) matters in business.

</details>

### 🔴 Level 3: Challenge
Add an "Opening Hours" section to the restaurant:
1. Add `<section id="hours">` inside `<main>`, after the booking form, with an `<h2>`.
2. Build a table with the columns Day and Hours (Monday to Thursday in one row, Friday, and Saturday to Sunday).
3. Change the nav link "Hours" so it points to `#hours`.
4. Test the link.

<details>
<summary>Show one possible answer</summary>

```html
<!-- in the nav -->
<li><a href="#hours">Hours</a></li>

<!-- inside <main>, after the booking section -->
<section id="hours">
  <h2 class="section-title">Opening Hours</h2>
  <table border="1">
    <tr><th>Day</th><th>Hours</th></tr>
    <tr><td>Monday to Thursday</td><td>11:30 AM – 10:00 PM</td></tr>
    <tr><td>Friday</td><td>2:30 PM – 10:30 PM</td></tr>
    <tr><td>Saturday to Sunday</td><td>11:00 AM – 11:00 PM</td></tr>
  </table>
</section>
```

</details>
