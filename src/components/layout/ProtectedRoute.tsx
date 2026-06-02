import { Navigate, Outlet } from 'react-router-dom'

/** Placeholder auth guard — always allows access until auth is implemented */
export function ProtectedRoute() {
  const isAuthenticated = true

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
