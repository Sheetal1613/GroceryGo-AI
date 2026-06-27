import type { LucideIcon } from 'lucide-react'
import {
  IndianRupee,
  Leaf,
  Package,
  PiggyBank,
  TrendingDown,
  TrendingUp,
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'
import styles from './AnalyticsOverviewKpis.module.css'

type KpiIconTone = 'accent' | 'success' | 'warning' | 'danger' | 'neutral'

type KpiTrend = {
  value: string
  direction: 'up' | 'down' | 'neutral'
  variant: 'success' | 'danger' | 'neutral' | 'warning' | 'accent'
}

type KpiMetric = {
  id: string
  title: string
  value: string
  description: string
  icon: LucideIcon
  iconTone: KpiIconTone
  trend: KpiTrend
}

const OVERVIEW_KPIS: KpiMetric[] = [
  {
    id: 'monthly-spending',
    title: 'Monthly Spending',
    value: '₹8,420',
    description: 'Total grocery spend so far this month.',
    icon: IndianRupee,
    iconTone: 'accent',
    trend: { value: '+12%', direction: 'up', variant: 'warning' },
  },
  {
    id: 'budget-remaining',
    title: 'Budget Remaining',
    value: '₹3,580',
    description: 'Available balance before hitting your monthly cap.',
    icon: PiggyBank,
    iconTone: 'success',
    trend: { value: '18% remaining', direction: 'neutral', variant: 'success' },
  },
  {
    id: 'food-waste-saved',
    title: 'Food Waste Saved',
    value: '₹1,240',
    description: 'Estimated value kept out of the bin this month.',
    icon: Leaf,
    iconTone: 'success',
    trend: { value: '+9%', direction: 'up', variant: 'success' },
  },
  {
    id: 'inventory-health',
    title: 'Inventory Health Score',
    value: '92%',
    description: 'Based on stock levels, expiry dates, and coverage.',
    icon: Package,
    iconTone: 'neutral',
    trend: { value: 'Excellent', direction: 'neutral', variant: 'success' },
  },
]

type AnalyticsKpiCardProps = KpiMetric

function AnalyticsKpiCard({
  title,
  value,
  description,
  icon: Icon,
  iconTone,
  trend,
}: AnalyticsKpiCardProps) {
  return (
    <Card className={styles.card}>
      <div className={styles.inner}>
        <div className={cn(styles.iconWrap, styles[iconTone])}>
          <Icon size={20} aria-hidden />
        </div>
        <div className={styles.content}>
          <p className={styles.label}>{title}</p>
          <p className={styles.value}>{value}</p>
          <div className={styles.trendRow}>
            <Badge variant={trend.variant} className={styles.trendBadge}>
              {trend.direction === 'up' && (
                <TrendingUp size={12} aria-hidden className={styles.trendIcon} />
              )}
              {trend.direction === 'down' && (
                <TrendingDown size={12} aria-hidden className={styles.trendIcon} />
              )}
              {trend.value}
            </Badge>
          </div>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </Card>
  )
}

export function AnalyticsOverviewKpis() {
  return (
    <div className={styles.grid}>
      {OVERVIEW_KPIS.map((kpi) => (
        <AnalyticsKpiCard key={kpi.id} {...kpi} />
      ))}
    </div>
  )
}
