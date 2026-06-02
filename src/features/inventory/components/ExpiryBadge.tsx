import { Badge } from '@/components/ui/Badge'
import { EXPIRY_LABELS } from '../lib/inventory-utils'
import type { ExpiryStatus } from '../types'

const VARIANTS: Record<
  ExpiryStatus,
  'success' | 'warning' | 'danger' | 'neutral'
> = {
  safe: 'success',
  expiring_soon: 'warning',
  critical: 'danger',
  expired: 'danger',
}

type ExpiryBadgeProps = {
  status: ExpiryStatus
}

export function ExpiryBadge({ status }: ExpiryBadgeProps) {
  return <Badge variant={VARIANTS[status]}>{EXPIRY_LABELS[status]}</Badge>
}
