# Receipt Web (Frontend)

This is the frontend application for the **Receipt Generator** project.  
It is built with **React**, **Vite**, and **TypeScript**, and allows users to browse products, add them to a cart, checkout, and download receipts.

---

## Features
- Modern **React (Vite + TypeScript)** setup
- Context API for **cart state management**
- Separate pages for:
  - Product listing
  - Cart
  - Checkout
  - Order placed + receipt download
- Clean UI with **CSS Modules**
- Floating cart button with dynamic item count
- Global dismissible **alert banner** on all pages

---

## Project Structure
```

receipt-web/
├── src/
│   ├── pages/            # ProductsPage, CartPage, CheckoutPage, OrderPlacedPage
│   ├── context/          # CartContext for global state
│   ├── api/              # Axios API functions
│   ├── App.tsx
│   └── App.module.css
├── public/
├── package.json
└── README.md

````

---

## Tech Stack
- **React** + **TypeScript** with **Vite**
- **Axios** for API requests
- **React Router** for routing
- **CSS Modules** for scoped, minimalist styles

---

## Installation
1. Clone this repository:
   ```bash
   git clone <repo-url>
   cd receipt-web

2. Install dependencies:

   ```bash
   npm install

3. Create a `.env` file:

   ```
   VITE_API_BASE=https://<your-backend-domain.com>
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

---


