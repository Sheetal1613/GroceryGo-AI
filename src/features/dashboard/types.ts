export type KpiMetric = {
  id: string
  title: string
  value: string
  trend?: {
    value: string
    direction: 'up' | 'down' | 'neutral'
    label?: string
  }
  iconTone: 'accent' | 'success' | 'warning' | 'danger' | 'neutral'
}

export type SpendingDataPoint = {
  month: string
  amount: number
  budget: number
}

export type CategorySlice = {
  name: string
  value: number
  color: string
}

export type ActivityItem = {
  id: string
  type: 'receipt' | 'inventory' | 'list' | 'alert' | 'ai'
  title: string
  description: string
  timestamp: string
  relativeTime: string
}

export type LowStockItem = {
  id: string
  name: string
  category: string
  quantity: number
  unit: string
  threshold: number
  urgency: 'critical' | 'low'
}

export type DashboardData = {
  kpis: KpiMetric[]
  spending: SpendingDataPoint[]
  categories: CategorySlice[]
  activities: ActivityItem[]
  lowStock: LowStockItem[]
}
