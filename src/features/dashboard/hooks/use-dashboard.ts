import { useEffect, useState } from 'react'
import {
  EMPTY_DASHBOARD_DATA,
  MOCK_DASHBOARD_DATA,
} from '../data/mock-dashboard'
import type { DashboardData } from '../types'

const LOAD_DELAY_MS = 900

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
  options: UseDashboardOptions = {},
): UseDashboardResult {
  const { simulateEmpty = false } = options
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)
    setError(null)

    const timer = window.setTimeout(() => {
      if (cancelled) return
      try {
        setData(simulateEmpty ? EMPTY_DASHBOARD_DATA : MOCK_DASHBOARD_DATA)
      } catch {
        setError('Failed to load dashboard data')
      } finally {
        setIsLoading(false)
      }
    }, LOAD_DELAY_MS)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [simulateEmpty, tick])

  const refetch = () => {
    setData(null)
    setTick((t) => t + 1)
  }

  return { data, isLoading, error, refetch }
}
