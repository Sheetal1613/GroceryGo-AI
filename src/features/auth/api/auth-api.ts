const API_URL = 'http://localhost:5000/api/auth'

export type AuthUser = {
  id: number
  name: string
  email: string
}

export type AuthResponse = {
  message: string
  user: AuthUser
  token: string
}

export async function registerUser(data: {
  name: string
  email: string
  password: string
}): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Registration failed')
  }

  return result
}

export async function loginUser(data: {
  email: string
  password: string
}): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Login failed')
  }

  return result
}