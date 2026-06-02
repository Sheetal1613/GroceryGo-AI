# GroceryGo AI — Frontend Architecture

Project scaffold. See prior architecture discussion for routing, decisions, and implementation order.

## Folder structure

```
src/
├── main.tsx
├── app/
│   ├── App.tsx
│   ├── providers.tsx
│   └── router.tsx
├── routes/
│   ├── marketing/
│   │   └── LandingPage.tsx
│   ├── auth/
│   │   ├── LoginPage.tsx
│   │   ├── SignUpPage.tsx
│   │   └── ForgotPasswordPage.tsx
│   └── app/
│       ├── AppLayout.tsx
│       ├── DashboardPage.tsx
│       ├── InventoryPage.tsx
│       ├── ShoppingListPage.tsx
│       ├── ReceiptScannerPage.tsx
│       ├── ReceiptDetailPage.tsx
│       ├── AnalyticsPage.tsx
│       ├── AiAssistantPage.tsx
│       ├── NotificationsPage.tsx
│       ├── SettingsPage.tsx
│       ├── ProfilePage.tsx
│       └── NotFoundPage.tsx
├── features/
│   ├── dashboard/
│   ├── inventory/
│   ├── shopping-list/
│   ├── receipt-scanner/
│   ├── analytics/
│   ├── ai-assistant/
│   ├── notifications/
│   ├── settings/
│   └── profile/
├── components/
│   ├── layout/
│   ├── data-display/
│   ├── feedback/
│   └── ui/          (.gitkeep — shadcn primitives)
├── lib/
├── hooks/
├── stores/
├── types/
├── styles/
└── assets/          (existing Vite assets)
```

## Route map

| Path | Page file |
|------|-----------|
| `/` | `routes/marketing/LandingPage.tsx` |
| `/login` | `routes/auth/LoginPage.tsx` |
| `/signup` | `routes/auth/SignUpPage.tsx` |
| `/forgot-password` | `routes/auth/ForgotPasswordPage.tsx` |
| `/app/dashboard` | `routes/app/DashboardPage.tsx` |
| `/app/inventory` | `routes/app/InventoryPage.tsx` |
| `/app/shopping-list` | `routes/app/ShoppingListPage.tsx` |
| `/app/receipts` | `routes/app/ReceiptScannerPage.tsx` |
| `/app/receipts/:receiptId` | `routes/app/ReceiptDetailPage.tsx` |
| `/app/analytics` | `routes/app/AnalyticsPage.tsx` |
| `/app/assistant` | `routes/app/AiAssistantPage.tsx` |
| `/app/notifications` | `routes/app/NotificationsPage.tsx` |
| `/app/settings/:section?` | `routes/app/SettingsPage.tsx` |
| `/app/profile` | `routes/app/ProfilePage.tsx` |
| `*` | `routes/app/NotFoundPage.tsx` |

## Notes

- Legacy Vite entry (`src/main.jsx`, `src/App.jsx`) remains until wiring step.
- All scaffold files are empty placeholders.
- Next step: TypeScript, Tailwind, shadcn, router, app shell.
