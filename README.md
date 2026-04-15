# E-Commerce Frontend

Frontend application for a portfolio e-commerce project built with React, TypeScript, and Vite. This repository focuses on the customer shopping journey, authenticated account features, and lightweight admin tools for product and order management.

Companion backend repository: [ecommerce-backend](https://github.com/ahtashammuzamal/ecommerce-backend)

## Portfolio Context

This project was built to demonstrate practical frontend engineering skills in a real product workflow rather than a static UI mockup. It highlights the ability to:

- Build a production-style React application with TypeScript
- Integrate a separate REST API from a different repository
- Manage authenticated, protected, and admin-facing flows
- Handle server state, forms, validation, and user feedback
- Structure a frontend codebase in a maintainable way for growth

## Key Features

### Customer Experience

- Browse products with search, category filters, price filters, and sorting
- View product details, stock information, and image galleries
- Register and log in with protected account flows
- Add items to cart, update quantities, remove products, and clear the cart
- Complete checkout with shipping form validation
- View order history, track order status, and cancel pending orders
- Update the account password from the settings page

### Admin Experience

- Open an admin dashboard from the authenticated account menu
- Create, edit, and delete products
- Upload multiple product images
- Review customer orders and update order status

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router 7
- TanStack Query
- React Hook Form
- Zod
- Tailwind CSS 4
- Shadcn UI
- Axios

## Repository Relationship

This project is intentionally separated into two repositories to reflect a real-world frontend/backend split.

- Frontend repository: [ecommerce-frontend](https://github.com/ahtashammuzamal/ecommerce-frontend)
- Backend repository: [ecommerce-backend](https://github.com/ahtashammuzamal/ecommerce-backend)
- **Live Demo:** [https://atelier-goods.vercel.app/](https://atelier-goods.vercel.app/)
- **Production API:** [https://ecommerce-backend-e5lf.onrender.com/api](https://ecommerce-backend-e5lf.onrender.com/api)
- Expected local backend API base URL: `http://localhost:5000/api`

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ahtashammuzamal/ecommerce-frontend.git
cd ecommerce-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Set the backend API URL:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 4. Start the backend

Run the companion backend project first so the frontend can connect to the API:

[Backend setup guide](https://github.com/ahtashammuzamal/ecommerce-backend)

### 5. Start the frontend

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Available Scripts

- `npm run dev` starts the local development server
- `npm run build` creates a production build
- `npm run lint` runs ESLint
- `npm run preview` previews the production build locally

## Deployment

The application is deployed on **Vercel**.

- **Live URL:** [https://atelier-goods.vercel.app/](https://atelier-goods.vercel.app/)

## What This Repository Demonstrates

- API integration against a separately maintained backend
- Protected routing and authenticated user flows
- Form handling and schema validation
- Query-based data fetching and cache invalidation
- Reusable UI composition for customer and admin interfaces

## Next Improvements

- Add automated tests for critical user journeys
- Add deployment links and CI checks
- Add payment gateway integration beyond cash on delivery

## Notes

- This repository contains the frontend only.
- Product, cart, order, and authentication data are served by the backend API.
- For the complete full-stack setup, use this repository together with the linked backend repository.
