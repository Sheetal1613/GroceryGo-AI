import type {
  ExpiryStatus,
  InventoryItem,
  InventoryItemWithStatus,
  SortDirection,
  SortField,
} from '../types'

const MS_PER_DAY = 86_400_000

export function getExpiryStatus(expiryDate: string | null): ExpiryStatus {
  if (!expiryDate) return 'safe'

  const today = startOfDay(new Date())
  const expiry = startOfDay(new Date(expiryDate))
  const daysUntil = Math.ceil((expiry.getTime() - today.getTime()) / MS_PER_DAY)

  if (daysUntil < 0) return 'expired'
  if (daysUntil <= 2) return 'critical'
  if (daysUntil <= 7) return 'expiring_soon'
  return 'safe'
}

export function getStockStatus(
  quantity: number,
  threshold: number,
): 'healthy' | 'low' | 'out' {
  if (quantity <= 0) return 'out'
  if (quantity <= threshold) return 'low'
  return 'healthy'
}

export function enrichItem(item: InventoryItem): InventoryItemWithStatus {
  return {
    ...item,
    expiryStatus: getExpiryStatus(item.expiryDate),
    stockStatus: getStockStatus(item.quantity, item.lowStockThreshold),
  }
}

export function enrichItems(items: InventoryItem[]): InventoryItemWithStatus[] {
  return items.map(enrichItem)
}

export function sortItems(
  items: InventoryItemWithStatus[],
  field: SortField,
  direction: SortDirection,
): InventoryItemWithStatus[] {
  const sorted = [...items].sort((a, b) => {
    let cmp = 0
    switch (field) {
      case 'name':
        cmp = a.name.localeCompare(b.name)
        break
      case 'quantity':
        cmp = a.quantity - b.quantity
        break
      case 'expiryDate': {
        const aDate = a.expiryDate ? new Date(a.expiryDate).getTime() : Infinity
        const bDate = b.expiryDate ? new Date(b.expiryDate).getTime() : Infinity
        cmp = aDate - bDate
        break
      }
    }
    return direction === 'asc' ? cmp : -cmp
  })
  return sorted
}

export function formatDisplayDate(iso: string | null): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function generateId(): string {
  return `inv-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

function startOfDay(date: Date): Date {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

export const EXPIRY_LABELS: Record<ExpiryStatus, string> = {
  safe: 'Safe',
  expiring_soon: 'Expiring Soon',
  critical: 'Critical',
  expired: 'Expired',
}

export const STOCK_LABELS: Record<
  'healthy' | 'low' | 'out',
  string
> = {
  healthy: 'Healthy Stock',
  low: 'Low Stock',
  out: 'Out of Stock',
}
