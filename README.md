# 28 South - Beauty E-commerce Storefront (React)

Frontend-only, Nykaa-style beauty store for **28 SOUTH VENTURES LLP**, built with
**React 18 + Vite + React Router**. No backend: bag, wishlist, coupon, sign-in and
orders are saved in the browser (`localStorage`).

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run preview
```

Requires Node 18+.

## Pages
Home, category / sub-category / group listings, brand pages and A-Z brand directory,
search, New In, Sale, Offers & Coupons, product detail (gallery zoom, pincode check, tabs,
reviews), bag, wishlist, checkout, order confirmation, track order, My Account (profile,
orders, addresses), Beauty Book (blog + articles), About, Contact, Careers, FAQs,
Store Locator, Shipping, Returns, Privacy and Terms pages.

## Navigation
Hover any top menu item for a mega menu: groups on the left (submenu), links in the
middle, featured banner on the right. On mobile it becomes a slide-in accordion drawer.
Edit it in `src/data/menu.js`.

## Customise
| What | Where |
|---|---|
| Company name, address, LLPIN, GSTIN, email, phone, stores, job roles | `src/data/company.js` |
| Menu, categories and sub-categories | `src/data/menu.js` |
| Products (demo catalog is generated from the menu) | `src/data/products.js` |
| Hero slides, coupons, blog posts, FAQs | `src/data/content.js` |
| Policy text | `src/data/policies.js` |
| Colours, spacing, animations | `src/index.css` (variables at the top) |

Images are Unsplash URLs. To use your own, put files in `public/` and reference them as
`/your-image.jpg`. If a remote image fails, an emoji placeholder is shown.

## Demo details
- Coupons: `SOUTH10` (10% off), `BEAUTY200` (Rs 200 off above Rs 1,499)
- Sign-in uses mobile + OTP; the demo OTP is `123456` and no SMS is sent
- Payments are not processed; "Place Order" only records an order locally
- Order tracking status advances automatically every 20 seconds for demonstration

## Before going live
This is a front-end demo. Replace sample content before launching: placeholder store locations
and job openings (`company.js`), generated products, ratings and sample reviews, and the policy
templates (have them reviewed by a legal professional). Real payments, accounts, OTP and order
management need a backend.
