# MarkupHive Website

A responsive, static multi-page website made with HTML, CSS and JavaScript. No build process or backend required.

## Open locally

Open `index.html` in your browser. For best results, use VS Code Live Server or `python -m http.server 8000` in this folder and visit http://localhost:8000.

## Change your details

1. Open `js/data.js` and replace `YOUR_PAGE_USERNAME` in the Facebook and Messenger URLs. Replace `hello@example.com` with your actual email.
2. In `js/data.js`, replace sample projects and template products: names, categories, prices, images, descriptions and `https://example.com/...` demo links.
3. Replace sample testimonials in `MH_REVIEWS` with **real** reviews before publishing. The current testimonials are labeled as samples.
4. Replace `assets/about-placeholder.svg` with your portrait, then update its filename in `about.html` if necessary.
5. The exact original uploads are included in `assets/`: `logo-original.png`, `favicon.png`, and `hero-photo.png`. `logo-wordmark.png` is a crop of your exact wordmark image (no redrawing) to remove unnecessary white margins.
6. Edit text in the HTML pages. Edit site colors in `css/style.css` under `:root`.
7. Customize `policies.html` to reflect your actual business and legal requirements.

## How checkout works

When a customer clicks **Purchase Template**, a modal collects their name, email, optional brand name, preferred contact and customization notes. The template name and price are filled automatically. **Generate Order Summary** creates text locally in the browser. **Copy Order** copies it; **Send to Messenger** opens your configured Messenger page, where the customer must paste and send the message. No order is sent automatically and no payment is processed.

The made-to-order form follows the same pattern. This website does not save customer information to a database. To add online payments, automated orders, or a product admin panel, a backend/service will be needed.

## Deployment

Upload the **contents** of this folder to your GitHub Pages repository (with `index.html` at the root), or deploy the folder to another static hosting service. Google Fonts are loaded over the internet; all sample illustrations and logos are local files.

## Files

- `index.html` — home, hero and review carousel
- `about.html` — introduction and skills
- `projects.html` — filterable portfolio
- `offers.html` — service selection
- `ready-made.html` — templates, filters, checkout modal
- `made-to-order.html` — custom project request form
- `policies.html` — editable policy drafts
- `js/data.js` — central editable project, template, review and contact data
- `js/main.js` — navigation, footer, filtering, reviews, checkout and inquiry functionality
- `css/style.css` — styling and responsive layout
