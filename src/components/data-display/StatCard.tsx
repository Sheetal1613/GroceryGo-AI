import type { LucideIcon } from 'lucide-react'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Skeleton } from '@/components/feedback/LoadingSkeleton'
import { cn } from '@/lib/utils'
import styles from './StatCard.module.css'

export type StatTrend = {
  value: string
  direction: 'up' | 'down' | 'neutral'
  label?: string
}

type StatCardProps = {
  title: string
  value: string
  icon: LucideIcon
  trend?: StatTrend
  iconTone?: 'accent' | 'success' | 'warning' | 'danger' | 'neutral'
  loading?: boolean
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  iconTone = 'accent',
  loading = false,
}: StatCardProps) {
  if (loading) {
    return (
      <Card className={styles.card}>
        <div className={styles.loadingInner}>
          <Skeleton className={styles.skeletonIcon} variant="rounded" />
          <div className={styles.loadingText}>
            <Skeleton className={styles.skeletonTitle} />
            <Skeleton className={styles.skeletonValue} />
            <Skeleton className={styles.skeletonTrend} />
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className={styles.card}>
      <div className={styles.inner}>
        <div className={cn(styles.iconWrap, styles[iconTone])}>
          <Icon size={20} aria-hidden />
        </div>
        <div className={styles.content}>
          <p className={styles.label}>{title}</p>
          <p className={styles.value}>{value}</p>
          {trend && (
            <div
              className={cn(
                styles.trend,
                trend.direction === 'up' && styles.trendUp,
                trend.direction === 'down' && styles.trendDown,
              )}
            >
              {trend.direction === 'up' && (
                <TrendingUp size={14} aria-hidden />
              )}
              {trend.direction === 'down' && (
                <TrendingDown size={14} aria-hidden />
              )}
              <span>{trend.value}</span>
              {trend.label && (
                <span className={styles.trendLabel}>{trend.label}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
