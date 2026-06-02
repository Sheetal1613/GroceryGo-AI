import { Badge } from '@/components/ui/Badge'
import { STOCK_LABELS } from '../lib/inventory-utils'
import type { StockStatus } from '../types'

const VARIANTS: Record<StockStatus, 'success' | 'warning' | 'danger'> = {
  healthy: 'success',
  low: 'warning',
  out: 'danger',
}

type StockBadgeProps = {
  status: StockStatus
}

export function StockBadge({ status }: StockBadgeProps) {
  return <Badge variant={VARIANTS[status]}>{STOCK_LABELS[status]}</Badge>
}
