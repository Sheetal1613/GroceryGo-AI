import { useCallback, useState } from 'react'
import {
  loginUser,
  registerUser,
  type AuthUser,
} from '@/features/auth/api/auth-api'

const TOKEN_KEY = 'grocerygo_token'
const USER_KEY = 'grocerygo_user'

function getStoredUser(): AuthUser | null {
  const storedUser = localStorage.getItem(USER_KEY)

  if (!storedUser) {
    return null
  }

  try {
    return JSON.parse(storedUser) as AuthUser
  } catch {
    localStorage.removeItem(USER_KEY)
    return null
  }
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(getStoredUser)

  const login = useCallback(
    async (email: string, password: string) => {
      const result = await loginUser({
        email,
        password,
      })

      localStorage.setItem(TOKEN_KEY, result.token)
      localStorage.setItem(USER_KEY, JSON.stringify(result.user))

      setUser(result.user)

      return result
    },
    [],
  )

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const result = await registerUser({
        name,
        email,
        password,
      })

      localStorage.setItem(TOKEN_KEY, result.token)
      localStorage.setItem(USER_KEY, JSON.stringify(result.user))

      setUser(result.user)

      return result
    },
    [],
  )

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setUser(null)
  }, [])

  return {
    user,
    isAuthenticated: user !== null,
    login,
    register,
    logout,
  }
}

export function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}