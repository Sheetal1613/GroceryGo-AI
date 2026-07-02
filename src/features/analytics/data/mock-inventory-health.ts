import type { LucideIcon } from 'lucide-react'
import { AlertTriangle, CheckCircle2, Clock, XCircle } from 'lucide-react'

export type InventoryHealthMetric = {
  id: string
  title: string
  count: number
  progress: number
  description: string
  icon: LucideIcon
  tone: 'success' | 'warning' | 'danger' | 'neutral'
}

export const INVENTORY_HEALTH_DATA: InventoryHealthMetric[] = [
  {
    id: 'healthy',
    title: 'Healthy Items',
    count: 47,
    progress: 78,
    description: 'Well-stocked items with comfortable expiry windows.',
    icon: CheckCircle2,
    tone: 'success',
  },
  {
    id: 'low-stock',
    title: 'Low Stock',
    count: 8,
    progress: 13,
    description: 'Items running low and likely to need replenishment soon.',
    icon: AlertTriangle,
    tone: 'warning',
  },
  {
    id: 'expiring-soon',
    title: 'Expiring Soon',
    count: 4,
    progress: 7,
    description: 'Products expiring within the next 5 days.',
    icon: Clock,
    tone: 'warning',
  },
  {
    id: 'expired',
    title: 'Expired',
    count: 2,
    progress: 3,
    description: 'Items past expiry that should be removed or replaced.',
    icon: XCircle,
    tone: 'danger',
  },
]
