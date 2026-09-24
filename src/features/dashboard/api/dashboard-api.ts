import { getAuthToken } from '@/hooks/use-auth'

const API_URL = 'http://localhost:5000/api/dashboard'

function getAuthHeaders() {
  const token = getAuthToken()

  return {
    Authorization: `Bearer ${token}`,
  }
}

export type DashboardApiResponse = {
  totalInventoryItems: number
  expiringSoonCount: number
  monthlySpending: number
  lowStockItems: {
    id: number
    name: string
    category: string
    quantity: number
    unit: string
    price: number
    lowStockThreshold: number
    expiryDate: string | null
    purchaseDate: string
  }[]
  lowStockCount: number
  outOfStockCount: number
  categorySpending: {
    name: string
    value: number
  }[]
}

export async function getDashboardData(): Promise<DashboardApiResponse> {
  const response = await fetch(API_URL, {
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data')
  }

  return response.json()
}