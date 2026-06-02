# GroceryGo AI

GroceryGo AI is a modern SaaS-style grocery operations platform that helps households manage inventory, scan receipts, track spending, and make smarter shopping decisions with AI-assisted workflows.

---

## Project Overview

GroceryGo AI is designed with product quality inspired by Linear, Notion, and Stripe Dashboard:

- Fast, clean, responsive app shell
- Feature-first architecture for scale
- Strong UX patterns for productivity (filters, sorting, quick actions, inline edits)
- Polished dashboards and workflow-centric pages

Current implementation includes:

- Production-grade app shell (sidebar, navbar, theme toggle, user menu, mobile nav)
- Dashboard with analytics, KPI cards, alerts, activity feed, and quick actions
- Inventory management with CRUD-style modals, filters, sorting, pagination, and status badges
- Receipt scanning experience with upload, preview, mock OCR pipeline, editable line items, and history panel

---

## Features

### Core Product

- Dashboard insights for grocery operations
- Inventory management with smart statuses:
  - Expiry: Safe, Expiring Soon, Critical, Expired
  - Stock: Healthy, Low, Out of Stock
- Receipt scanner workflow with premium UX (no OCR engine integration yet)
- Receipt history and detail review
- Save scanned line items to inventory (mock flow)

### UX & Platform

- Responsive layout for desktop, tablet, and mobile
- Light/Dark mode with persisted theme state
- Reusable design system components (cards, buttons, modals, badges, inputs, tables)
- Loading skeletons and empty states across major screens
- Route-driven SPA architecture with nested layouts

---

## Screenshots

> Add your product screenshots in a `docs/screenshots` folder and update the paths below.

### Dashboard

![Dashboard](docs/screenshots/dashboard.png)

### Inventory

![Inventory](docs/screenshots/inventory.png)

### Receipt Scanner

![Receipt Scanner](docs/screenshots/receipt-scanner.png)

---

## Tech Stack

### Frontend

- React 19
- React Router DOM 7
- TypeScript
- Vite 8
- CSS Modules + design tokens

### State & Data

- Zustand (UI state)
- Mock feature hooks for async workflows

### UI & Visualization

- Lucide React (icons)
- Recharts (analytics charts)
- clsx (class composition)

### Tooling

- ESLint
- Vite build pipeline

---

## Architecture

Feature-sliced structure with reusable shared UI and route-level composition:

```text
src/
├── app/                  # App bootstrap, providers, router
├── routes/               # Route-level pages
├── features/             # Domain modules (dashboard, inventory, receipt-scanner, ...)
├── components/           # Shared UI/layout/data-display/feedback components
├── stores/               # Global UI store(s)
├── styles/               # Tokens + global styling
└── types/                # Shared exported types
```

High-level design principles:

- Feature-first modules for maintainability
- Shared reusable components for consistent UX
- Mocked data/hook boundaries ready for API integration
- Route-based layout composition for scalable navigation

---

## Installation Steps

### 1) Clone repository

```bash
git clone <your-repo-url>
cd AI-Grocery-Go
```

### 2) Install dependencies

```bash
npm install
```

### 3) Start development server

```bash
npm run dev
```

App runs at:

- [http://localhost:5173](http://localhost:5173)

### 4) Production build

```bash
npm run build
```

### 5) Preview production build

```bash
npm run preview
```

---

## Future Roadmap

### Product

- Real OCR integration (Tesseract.js or API provider)
- AI-powered shopping recommendations and meal planning
- Multi-household / workspace support
- Budget goals and advanced analytics
- Notifications and automations (expiry, low stock, spending anomalies)

### Platform

- Backend API + authentication integration
- Real-time sync and cloud persistence
- Test suite expansion (unit + integration + e2e)
- Accessibility hardening and performance budgets
- CI/CD and release workflows

---

## Demo

### Local Demo Routes

- Landing: [http://localhost:5173/](http://localhost:5173/)
- Dashboard: [http://localhost:5173/app/dashboard](http://localhost:5173/app/dashboard)
- Inventory: [http://localhost:5173/app/inventory](http://localhost:5173/app/inventory)
- Receipt Scanner: [http://localhost:5173/app/receipts](http://localhost:5173/app/receipts)

### Hosted Demo

- Web App: _Coming soon_
- Product Walkthrough Video: _Coming soon_

---

## License

This project is currently private and intended for active product development.
