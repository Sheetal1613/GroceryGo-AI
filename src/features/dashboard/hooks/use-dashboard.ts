import { useCallback, useEffect, useState } from 'react'
import { getDashboardData } from '../api/dashboard-api'
import type { DashboardData } from '../types'

type UseDashboardOptions = {
  /** Simulate empty lists (activities, charts, low stock) */
  simulateEmpty?: boolean
}

type UseDashboardResult = {
  data: DashboardData | null
  isLoading: boolean
  error: string | null
  refetch: () => void
}

export function useDashboard(
  _options: UseDashboardOptions = {},
): UseDashboardResult {
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tick, setTick] = useState(0)

  const loadDashboard = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await getDashboardData()

      const dashboardData: DashboardData = {
        kpis: [
          {
            id: 'inventory',
            title: 'Total Inventory Items',
            value: String(result.totalInventoryItems),
            iconTone: 'accent',
          },
          {
            id: 'expiring',
            title: 'Expiring Soon',
            value: String(result.expiringSoonCount),
            iconTone: 'warning',
          },
          {
            id: 'spending',
            title: 'Monthly Spending',
            value: `₹${result.monthlySpending.toLocaleString('en-IN')}`,
            iconTone: 'neutral',
          },
          {
            id: 'waste',
            title: 'Food Waste Saved',
            value: '—',
            iconTone: 'success',
          },
        ],
        spending: [],
       categories: result.categorySpending.map((category) => ({
  name: category.name,
 value:
  result.monthlySpending > 0
    ? Number(
        ((category.value / result.monthlySpending) * 100).toFixed(1),
      )
    : 0,
  color: '',
})),
        activities: [],
        lowStock: result.lowStockItems.map((item) => ({
          id: String(item.id),
          name: item.name,
          category: item.category,
          quantity: item.quantity,
          unit: item.unit,
          threshold: item.lowStockThreshold,
          urgency: item.quantity <= 0 ? 'critical' : 'low',
        })),
      }

      setData(dashboardData)
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to load dashboard data',
      )
      setData(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadDashboard()
  }, [loadDashboard, tick])

  const refetch = () => {
    setData(null)
    setTick((current) => current + 1)
  }

  return {
    data,
    isLoading,
    error,
    refetch,
  }
}