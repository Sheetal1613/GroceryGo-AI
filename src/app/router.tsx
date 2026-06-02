import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { ProtectedRoute } from '@/components/layout/ProtectedRoute'
import { ROUTES } from '@/lib/constants'
import AiAssistantPage from '@/routes/app/AiAssistantPage'
import AnalyticsPage from '@/routes/app/AnalyticsPage'
import DashboardPage from '@/routes/app/DashboardPage'
import InventoryPage from '@/routes/app/InventoryPage'
import NotFoundPage from '@/routes/app/NotFoundPage'
import NotificationsPage from '@/routes/app/NotificationsPage'
import ProfilePage from '@/routes/app/ProfilePage'
import ReceiptDetailPage from '@/routes/app/ReceiptDetailPage'
import ReceiptScannerPage from '@/routes/app/ReceiptScannerPage'
import SettingsPage from '@/routes/app/SettingsPage'
import ShoppingListPage from '@/routes/app/ShoppingListPage'
import ForgotPasswordPage from '@/routes/auth/ForgotPasswordPage'
import LoginPage from '@/routes/auth/LoginPage'
import SignUpPage from '@/routes/auth/SignUpPage'
import LandingPage from '@/routes/marketing/LandingPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/app',
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { index: true, element: <Navigate to={ROUTES.dashboard} replace /> },
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'inventory', element: <InventoryPage /> },
          { path: 'shopping-list', element: <ShoppingListPage /> },
          { path: 'receipts', element: <ReceiptScannerPage /> },
          { path: 'receipts/:receiptId', element: <ReceiptDetailPage /> },
          { path: 'analytics', element: <AnalyticsPage /> },
          { path: 'assistant', element: <AiAssistantPage /> },
          { path: 'notifications', element: <NotificationsPage /> },
          { path: 'settings', element: <SettingsPage /> },
          { path: 'settings/:section', element: <SettingsPage /> },
          { path: 'profile', element: <ProfilePage /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
