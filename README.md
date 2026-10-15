# SOLEVAULT — Interactive Premium Sneaker Store

**SOLEVAULT** is a modern, visually striking, fully responsive sneaker e-commerce destination built with Next.js (App Router), React, TypeScript, and Tailwind CSS. The storefront combines a streetwear editorial boutique aesthetic with high-performance shopping interactions.

---

## ⚡ Tech Stack & Architecture

- **Framework**: Next.js 16 (App Router with SSR & Static Pre-rendering)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 with custom editorial display design tokens & electric lime highlights
- **Typography**: Display typography (Syne), technical tags (Space Mono), clean sans (Plus Jakarta Sans)
- **Icons**: Lucide React
- **Animations & Interactivity**: Motion / Framer Motion, canvas-confetti, custom CSS micro-animations
- **Global State & Persistence**: Zustand with `localStorage` persistence for cart, wishlist, recently viewed, and search query history
- **Deployment Target**: Vercel (Edge ready, zero paid third-party dependencies required for demonstration)

---

## 👟 Features & Functionality

### 1. Homepage & Editorial Storytelling
- **Announcement Banner**: Slim dismissible promotional bar with responsive controls.
- **Sticky Header**: Includes SOLEVAULT wordmark, desktop mega-menus for *Sneakers* and *Brands*, live wishlist counter, live cart drawer counter, and keyboard-accessible search trigger (`⌘K`).
- **Hero Section**: Full-width streetwear editorial featuring the oversized headline *"STEP INTO YOUR NEXT ERA."*, interactive silhouette switcher, and dual CTAs.
- **Featured Brand Matrix**: Direct clickable filters for Nike, Jordan, Adidas, New Balance, ASICS, Puma, and Converse.
- **Trending Sneakers**: 8+ product grid featuring secondary angle reveal on hover, instant size modal, and animated wishlist toggle.
- **Editorial Campaign Banner**: *"BUILT FOR THE STREETS"* lookbook story.
- **New Drops Section**: Curated releases with release dates, availability tags, and live inventory remaining indicators.
- **Brand Story Manifesto**: Architectural curation philosophy, physical authentication protocol, and concept stores.
- **Interactive Newsletter**: *"FIRST IN LINE"* drop notification signup with client validation and loading feedback.
- **Footer**: Curated brand navigation, policies, security seals, and oversized watermark anchor.

### 2. Full Catalog Experience (`/sneakers`)
- Multi-filter sidebar (multi-brand selection, silhouette categories, US Men sizes 7–13, color tone swatches, max price slider, in-stock only, and sale items).
- Dynamic sorting: Featured, Newest, Price (Low to High), Price (High to Low), Popularity.
- URL search parameter synchronization for shareable and bookmarkable filtered views.
- Active filter chips with individual dismiss and *Clear All* actions.
- Layout toggle (3-column and 4-column responsive grid).
- Incremental *Load More Drops* pagination.

### 3. Product Details Page (`/product/[slug]`)
- Multi-angle thumbnail gallery with main zoom viewer.
- Full product specifications, material breakdown, and historical heritage story.
- Real-time stock status (highlighting low-stock scarcity).
- Colorway selector and interactive US Men shoe size picker (disabling out-of-stock sizes).
- International size conversion guide modal (US Men, US Women, UK, EU, CM).
- Quantity adjuster, Add to Bag with instant validation, and Wishlist toggle.
- Expandable accordions for Material Specs, Shipping & Return Protocol, and 6-Point Physical Authentication.
- Related products and recently viewed silhouettes.

### 4. Slide-Out Vault Bag (Cart Drawer)
- Slide-over cart drawer accessible from any page.
- Item thumbnail, brand, silhouette name, selected size, and colorway.
- Real-time quantity adjustments and item deletion.
- Free Express Shipping milestone progress bar ($200 threshold).
- Working sample promo codes:
  - `VAULT10` (10% off entire order)
  - `SOLE20` (20% off VIP discount)
  - `FIRSTDROP` (15% off welcome offer)
- Accurately calculated subtotal, discounts, shipping, and order total.

### 5. Instant Search Experience
- Live debounced search overlay matching silhouettes by name, brand, category, colorway, and SKU.
- Keyboard navigation (Esc to close, `⌘K` / `Ctrl+K` shortcut).
- Persistent search history with individual delete and clear all.
- Curated trending search tags (Jordan, Samba, 9060, Kayano, Air Max).

### 6. Wishlist Management (`/wishlist`)
- Dedicated wishlist page displaying all saved silhouettes.
- Quick size selector and direct add to bag.
- One-click remove or clear entire wishlist.
- Empty state with direct route to catalog.

### 7. Brand Showcases & Collections
- `/brands`: In-depth history, heritage taglines, flagship models, and direct catalog links for Nike, Jordan, Adidas, New Balance, ASICS, Puma, and Converse.
- `/collections`: Curated seasonal drops (*Built for the Streets*, *Y2K Tech Runners*, *Hardcourt Royalty*, *Minimalist Rotation*).
- `/about`: Brand manifesto, 6-point physical verification protocol, and concept spaces in Tokyo, London, and New York.

### 8. Checkout Demonstration (`/checkout`)
- Two-column responsive checkout interface.
- Contact information and shipping address form with validation.
- Shipping speed selector (Standard Ground, Express Priority Air, Vault White-Glove VIP).
- Demo payment simulation (no real card details collected or stored).
- Convenient **1-Click Demo Fill** button for rapid testing.
- Celebratory confetti on order completion with a unique order confirmation number (e.g. `#SV-98421`) and itemized receipt breakdown.

---

## 🛠️ Local Development

1. **Clone the repository and enter directory**:
   ```bash
   cd SOLEVAULT
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Run a production build**:
   ```bash
   npm run build
   ```

5. **Start the production server locally**:
   ```bash
   npm start
   ```

---

## 🚀 Vercel Deployment

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Import the project into the [Vercel Dashboard](https://vercel.com).
3. Framework Preset: **Next.js**.
4. Root Directory: `./` (or `SOLEVAULT` if in a monorepo).
5. Build Command: `npm run build` (default).
6. Output Directory: `.next` (default).
7. Deploy. The application has zero hard runtime database dependencies and builds cleanly out of the box.

---

## 📄 Demonstration Disclaimer

SOLEVAULT is a demonstration e-commerce concept project. All product records, pricing, inventory figures, and promo codes are simulated for portfolio demonstration. No real financial transactions are executed, and no card data is stored.
