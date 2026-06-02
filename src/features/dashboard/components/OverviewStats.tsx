import { AlertTriangle, DollarSign, Leaf, Package } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { StatCard } from '@/components/data-display/StatCard'
import type { KpiMetric } from '../types'
import styles from './OverviewStats.module.css'

const KPI_ICONS: Record<string, LucideIcon> = {
  inventory: Package,
  expiring: AlertTriangle,
  spending: DollarSign,
  waste: Leaf,
}

type OverviewStatsProps = {
  kpis: KpiMetric[]
  loading?: boolean
}

export function OverviewStats({ kpis, loading = false }: OverviewStatsProps) {
  return (
    <div className={styles.grid}>
      {loading
        ? Array.from({ length: 4 }).map((_, i) => (
            <StatCard
              key={i}
              title=""
              value=""
              icon={Package}
              loading
            />
          ))
        : kpis.map((kpi) => {
            const Icon = KPI_ICONS[kpi.id] ?? Package
            return (
              <StatCard
                key={kpi.id}
                title={kpi.title}
                value={kpi.value}
                icon={Icon}
                iconTone={kpi.iconTone}
                trend={kpi.trend}
              />
            )
          })}
    </div>
  )
}
