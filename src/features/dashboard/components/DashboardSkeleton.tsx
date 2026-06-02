import { PageHeader } from '@/components/layout/PageHeader'
import { Skeleton } from '@/components/feedback/LoadingSkeleton'
import { OverviewStats } from './OverviewStats'
import { QuickActions } from './QuickActions'
import styles from '../Dashboard.module.css'

export function DashboardSkeleton() {
  return (
    <div className={styles.dashboard}>
      <PageHeader
        title="Dashboard"
        description="Welcome back — here's what's happening with your groceries."
        actions={<Skeleton className={styles.headerActionSkeleton} variant="rounded" />}
      />
      <OverviewStats kpis={[]} loading />
      <div className={styles.analyticsGrid}>
        <div className={styles.chartSkeletonCard} />
        <div className={styles.chartSkeletonCard} />
      </div>
      <div className={styles.bottomGrid}>
        <div className={styles.feedSkeletonCard} />
        <QuickActions loading />
        <div className={styles.feedSkeletonCard} />
      </div>
    </div>
  )
}
