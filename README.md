# 🛒 GroceryGo AI

A modern full-stack grocery inventory and expense management platform that helps users organize pantry items, monitor expiry dates, manage shopping lists, analyze grocery spending, and leverage AI-powered features to reduce food waste and shop smarter.

> **Status:** 🚧 Under Active Development

---

# ✨ Features

## ✅ Implemented

### Frontend
- Modern responsive UI built with React and TypeScript
- Beautiful SaaS-inspired dashboard
- Inventory management interface
- Analytics dashboard
- Receipt Scanner UI
- Shopping List UI
- Dark/Light theme support
- Reusable UI components
- Responsive design for desktop and mobile
- Mock data integration for frontend development

### Backend
- Express.js REST API setup
- PostgreSQL database integration
- Prisma ORM integration
- Inventory database schema
- Database migrations
- Centralized Prisma Client configuration
- Scalable backend architecture (Route → Controller → Service)

---

# 🚀 Tech Stack

## Frontend

- React 19
- TypeScript
- Vite
- React Router
- CSS Modules
- Recharts
- Zustand
- Lucide React

## Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL

## Development Tools

- Git
- GitHub
- ESLint
- VS Code

---

# 🏗 Project Architecture

```
                Browser
                   │
                   ▼
          React Frontend (Vite)
                   │
             HTTP REST API
                   │
                   ▼
            Express Routes
                   │
                   ▼
             Controllers
                   │
                   ▼
               Services
                   │
                   ▼
             Prisma Client
                   │
                   ▼
             PostgreSQL Database
```

---

# 📂 Project Structure

```
AI-Grocery-Go
│
├── backend
│   ├── prisma
│   │   ├── migrations
│   │   └── schema.prisma
│   │
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── routes
│   │   ├── services
│   │   ├── types
│   │   ├── utils
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
├── src
│   ├── app
│   ├── routes
│   ├── features
│   ├── components
│   ├── stores
│   ├── styles
│   └── types
│
└── README.md
```

---

# 🗄 Database

The application currently contains one database model.

## Inventory

| Field | Type |
|--------|------|
| id | Int |
| name | String |
| category | String |
| quantity | Int |
| unit | String |
| price | Float |
| expiryDate | DateTime |
| purchaseDate | DateTime |
| createdAt | DateTime |
| updatedAt | DateTime |

---

# 📸 Screenshots

## Landing Page

> *(Add screenshot here)*

---

## Dashboard

> *(Add screenshot here)*

---

## Inventory

> *(Add screenshot here)*

---

## Analytics

> *(Add screenshot here)*

---

## Receipt Scanner

> *(Add screenshot here)*

---

# ⚙ Installation

## 1 Clone Repository

```bash
git clone https://github.com/Sheetal1613/GroceryGo-AI.git
```

```
cd GroceryGo-AI
```

---

## 2 Install Frontend

```bash
npm install
```

---

## 3 Install Backend

```bash
cd backend

npm install
```

---

## 4 Configure Environment Variables

Create a `.env` file inside the `backend` folder.

```
PORT=5000

DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/grocerygo?schema=public"

GROQ_API_KEY=YOUR_GROQ_API_KEY
```

---

## 5 Run Backend

```bash
cd backend

npm run dev
```

Runs on

```
http://localhost:5000
```

---

## 6 Run Frontend

```bash
npm run dev
```

Runs on

```
http://localhost:5173
```

---

# 📈 Current Progress

## Frontend

- ✅ Landing Page
- ✅ Dashboard
- ✅ Inventory UI
- ✅ Shopping List UI
- ✅ Receipt Scanner UI
- ✅ Analytics Dashboard
- ✅ Responsive Layout
- ✅ Theme Support

## Backend

- ✅ Express Server
- ✅ PostgreSQL Integration
- ✅ Prisma ORM
- ✅ Inventory Database Model
- ✅ Database Migration
- ✅ Prisma Client Configuration

---

# 🚧 Upcoming Features

- Inventory CRUD APIs
- Shopping List CRUD APIs
- User Authentication
- JWT Authorization
- Receipt OCR Integration
- AI Shopping Assistant
- Grocery Expense Prediction
- Smart Expiry Notifications
- Cloud Deployment
- CI/CD Pipeline

---

# 🎯 Learning Objectives

This project is being built to strengthen practical knowledge of:

- Full-Stack Web Development
- REST API Design
- PostgreSQL Database Design
- Prisma ORM
- Express.js
- React
- TypeScript
- Authentication
- AI Integration
- Software Architecture
- Git & GitHub Workflow

---

# 📄 License

This project is currently under active development for educational and portfolio purposes.