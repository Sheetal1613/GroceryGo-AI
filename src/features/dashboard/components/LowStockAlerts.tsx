import { Link } from 'react-router-dom'
import { AlertTriangle, Package } from 'lucide-react'
import { Card, CardHeader } from '@/components/ui/Card'
import { EmptyState } from '@/components/data-display/EmptyState'
import { Skeleton } from '@/components/feedback/LoadingSkeleton'
import { ROUTES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import type { LowStockItem } from '../types'
import styles from './LowStockAlerts.module.css'

type LowStockAlertsProps = {
  items: LowStockItem[]
  loading?: boolean
}

export function LowStockAlerts({ items, loading = false }: LowStockAlertsProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader title="Low Stock Alerts" />
        <ul className={styles.list}>
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i} className={styles.skeletonRow}>
              <Skeleton className={styles.skeletonBadge} variant="rounded" />
              <div className={styles.skeletonText}>
                <Skeleton />
                <Skeleton className={styles.skeletonSub} />
              </div>
            </li>
          ))}
        </ul>
      </Card>
    )
  }

  if (items.length === 0) {
    return (
      <Card>
        <CardHeader
          title="Low Stock Alerts"
          description="Items below your restock threshold"
        />
        <EmptyState
          compact
          icon={Package}
          title="All stocked up"
          description="No items are below your restock threshold right now."
        />
      </Card>
    )
  }

  const criticalCount = items.filter((i) => i.urgency === 'critical').length

  return (
    <Card>
      <CardHeader
        title="Low Stock Alerts"
        description={
          criticalCount > 0
            ? `${criticalCount} critical · ${items.length} total`
            : `${items.length} items need restocking`
        }
        action={
          <Link to={ROUTES.inventory} className={styles.viewAll}>
            Manage
          </Link>
        }
      />
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id} className={styles.item}>
            <span
              className={cn(
                styles.badge,
                item.urgency === 'critical' && styles.badgeCritical,
              )}
            >
              {item.urgency === 'critical' ? (
                <AlertTriangle size={14} aria-hidden />
              ) : (
                <Package size={14} aria-hidden />
              )}
            </span>
            <div className={styles.content}>
              <p className={styles.name}>{item.name}</p>
              <p className={styles.meta}>
                {item.category} · {item.quantity} {item.unit}
                {item.quantity <= item.threshold && (
                  <span className={styles.threshold}>
                    {' '}
                    (min {item.threshold})
                  </span>
                )}
              </p>
            </div>
            <span
              className={cn(
                styles.status,
                item.urgency === 'critical' && styles.statusCritical,
              )}
            >
              {item.urgency === 'critical' ? 'Critical' : 'Low'}
            </span>
          </li>
        ))}
      </ul>
      <Link to={ROUTES.shoppingList} className={styles.restokeBtn}>
        Generate shopping list
      </Link>
    </Card>
  )
}
