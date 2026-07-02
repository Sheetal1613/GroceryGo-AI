export type BudgetVsActualPoint = {
  month: string
  budget: number
  actual: number
  remaining: number
}

export const BUDGET_VS_ACTUAL_DATA: BudgetVsActualPoint[] = [
  { month: 'Jan', budget: 12000, actual: 10540, remaining: 1460 },
  { month: 'Feb', budget: 12000, actual: 11820, remaining: 180 },
  { month: 'Mar', budget: 12500, actual: 11280, remaining: 1220 },
  { month: 'Apr', budget: 12500, actual: 12160, remaining: 340 },
  { month: 'May', budget: 13000, actual: 10980, remaining: 2020 },
  { month: 'Jun', budget: 13000, actual: 8420, remaining: 4580 },
]

export const BUDGET_VS_ACTUAL_SERIES = [
  { key: 'budget', label: 'Budget', color: 'var(--gg-accent-muted)' },
  { key: 'actual', label: 'Actual Spending', color: 'var(--gg-accent)' },
  { key: 'remaining', label: 'Remaining Budget', color: 'var(--gg-success)' },
] as const
