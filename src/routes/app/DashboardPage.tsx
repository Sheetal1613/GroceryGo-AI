import { Link } from 'react-router-dom'
import { RefreshCw } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { CategoryChart } from '@/features/dashboard/components/CategoryChart'
import { DashboardSkeleton } from '@/features/dashboard/components/DashboardSkeleton'
import { LowStockAlerts } from '@/features/dashboard/components/LowStockAlerts'
import { OverviewStats } from '@/features/dashboard/components/OverviewStats'
import { QuickActions } from '@/features/dashboard/components/QuickActions'
import { RecentActivity } from '@/features/dashboard/components/RecentActivity'
import { SpendChart } from '@/features/dashboard/components/SpendChart'
import { useDashboard } from '@/features/dashboard/hooks/use-dashboard'
import styles from '@/features/dashboard/Dashboard.module.css'

export default function DashboardPage() {
  const { data, isLoading, error, refetch } = useDashboard()

  if (isLoading) {
    return <DashboardSkeleton />
  }

  if (error || !data) {
    return (
      <div className={styles.dashboard}>
        <PageHeader
          title="Dashboard"
          description="Something went wrong loading your data."
        />
        <div className={styles.errorCard}>
          <p>{error ?? 'Unable to load dashboard'}</p>
          <button type="button" className={styles.retryBtn} onClick={refetch}>
            <RefreshCw size={16} aria-hidden />
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.dashboard}>
      <PageHeader
        title="Dashboard"
        description="Welcome back — here's what's happening with your groceries."
        actions={
          <button
            type="button"
            className={styles.refreshBtn}
            onClick={refetch}
            aria-label="Refresh dashboard"
          >
            <RefreshCw size={16} aria-hidden />
            Refresh
          </button>
        }
      />

      <OverviewStats kpis={data.kpis} />

      <section className={styles.analyticsGrid} aria-label="Analytics">
        <SpendChart data={data.spending} />
        <CategoryChart data={data.categories} />
      </section>

      <section className={styles.bottomGrid} aria-label="Activity and alerts">
        <RecentActivity activities={data.activities} />
        <QuickActions />
        <LowStockAlerts items={data.lowStock} />
      </section>

      <p className={styles.footerNote}>
        Data synced from your household inventory ·{' '}
        <Link to="/app/analytics">View full analytics</Link>
      </p>
    </div>
  )
}
