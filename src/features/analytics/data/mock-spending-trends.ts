export type SpendingTrendRange = 'weekly' | 'monthly' | 'yearly'

export type SpendingTrendPoint = {
  label: string
  amount: number
}

export const SPENDING_TRENDS_DATA: Record<
  SpendingTrendRange,
  SpendingTrendPoint[]
> = {
  weekly: [
    { label: 'Mon', amount: 420 },
    { label: 'Tue', amount: 610 },
    { label: 'Wed', amount: 380 },
    { label: 'Thu', amount: 700 },
    { label: 'Fri', amount: 540 },
    { label: 'Sat', amount: 820 },
    { label: 'Sun', amount: 460 },
  ],
  monthly: [
    { label: 'Week 1', amount: 3200 },
    { label: 'Week 2', amount: 4100 },
    { label: 'Week 3', amount: 3700 },
    { label: 'Week 4', amount: 4600 },
  ],
  yearly: [
    { label: 'Jan', amount: 7200 },
    { label: 'Feb', amount: 6800 },
    { label: 'Mar', amount: 7400 },
    { label: 'Apr', amount: 7100 },
    { label: 'May', amount: 6900 },
    { label: 'Jun', amount: 7500 },
    { label: 'Jul', amount: 7800 },
    { label: 'Aug', amount: 7200 },
    { label: 'Sep', amount: 7600 },
    { label: 'Oct', amount: 8000 },
    { label: 'Nov', amount: 8500 },
    { label: 'Dec', amount: 9100 },
  ],
}

export const SPENDING_TREND_RANGES: {
  id: SpendingTrendRange
  label: string
}[] = [
  { id: 'weekly', label: 'Weekly' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'yearly', label: 'Yearly' },
]
