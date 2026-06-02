import { Link } from 'react-router-dom'
import {
  AlertCircle,
  Bot,
  Package,
  Receipt,
  ShoppingCart,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Card, CardHeader } from '@/components/ui/Card'
import { EmptyState } from '@/components/data-display/EmptyState'
import { Skeleton } from '@/components/feedback/LoadingSkeleton'
import { ROUTES } from '@/lib/constants'
import type { ActivityItem } from '../types'
import styles from './RecentActivity.module.css'

const ACTIVITY_ICONS: Record<ActivityItem['type'], LucideIcon> = {
  receipt: Receipt,
  inventory: Package,
  list: ShoppingCart,
  alert: AlertCircle,
  ai: Bot,
}

const ACTIVITY_TONES: Record<ActivityItem['type'], string> = {
  receipt: styles.toneReceipt,
  inventory: styles.toneInventory,
  list: styles.toneList,
  alert: styles.toneAlert,
  ai: styles.toneAi,
}

type RecentActivityProps = {
  activities: ActivityItem[]
  loading?: boolean
}

export function RecentActivity({ activities, loading = false }: RecentActivityProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader title="Recent Activity" />
        <ul className={styles.list}>
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i} className={styles.skeletonRow}>
              <Skeleton className={styles.skeletonIcon} variant="rounded" />
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

  if (activities.length === 0) {
    return (
      <Card>
        <CardHeader
          title="Recent Activity"
          description="Latest updates across your household"
        />
        <EmptyState
          compact
          icon={Receipt}
          title="No activity yet"
          description="Actions like scanning receipts or updating inventory will appear here."
          action={
            <Link to={ROUTES.receipts} className={styles.emptyLink}>
              Scan your first receipt
            </Link>
          }
        />
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader
        title="Recent Activity"
        description="Latest updates across your household"
        action={
          <Link to={ROUTES.notifications} className={styles.viewAll}>
            View all
          </Link>
        }
      />
      <ul className={styles.list}>
        {activities.map((item) => {
          const Icon = ACTIVITY_ICONS[item.type]
          return (
            <li key={item.id} className={styles.item}>
              <span
                className={`${styles.icon} ${ACTIVITY_TONES[item.type]}`}
              >
                <Icon size={16} aria-hidden />
              </span>
              <div className={styles.content}>
                <p className={styles.title}>{item.title}</p>
                <p className={styles.description}>{item.description}</p>
              </div>
              <time className={styles.time} dateTime={item.timestamp}>
                {item.relativeTime}
              </time>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
