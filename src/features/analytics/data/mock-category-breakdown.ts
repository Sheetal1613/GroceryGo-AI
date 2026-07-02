export type CategoryBreakdownItem = {
  name: string
  amount: number
  color: string
}

export const CATEGORY_BREAKDOWN_DATA: CategoryBreakdownItem[] = [
  { name: 'Fruits', amount: 1840, color: '#5e6ad2' },
  { name: 'Vegetables', amount: 1620, color: '#30a46c' },
  { name: 'Dairy', amount: 1480, color: '#f5a623' },
  { name: 'Meat', amount: 1320, color: '#e5484d' },
  { name: 'Snacks', amount: 980, color: '#9b59b6' },
  { name: 'Beverages', amount: 760, color: '#3498db' },
  { name: 'Household', amount: 420, color: '#8b939e' },
]

export function getCategoryBreakdownWithPercentages() {
  const total = CATEGORY_BREAKDOWN_DATA.reduce((sum, item) => sum + item.amount, 0)

  return CATEGORY_BREAKDOWN_DATA.map((item) => ({
    ...item,
    percentage: Math.round((item.amount / total) * 100),
  }))
}
