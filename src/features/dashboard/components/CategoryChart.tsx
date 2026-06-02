import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { Card, CardHeader } from '@/components/ui/Card'
import { EmptyState } from '@/components/data-display/EmptyState'
import { Skeleton } from '@/components/feedback/LoadingSkeleton'
import { PieChart as PieChartIcon } from 'lucide-react'
import type { CategorySlice } from '../types'
import styles from './Charts.module.css'

type CategoryChartProps = {
  data: CategorySlice[]
  loading?: boolean
}

export function CategoryChart({ data, loading = false }: CategoryChartProps) {
  if (loading) {
    return (
      <Card className={styles.chartCard}>
        <CardHeader title="Category Distribution" />
        <Skeleton className={styles.chartSkeleton} variant="rounded" />
      </Card>
    )
  }

  if (data.length === 0) {
    return (
      <Card className={styles.chartCard}>
        <CardHeader
          title="Category Distribution"
          description="Spending breakdown by category"
        />
        <EmptyState
          compact
          icon={PieChartIcon}
          title="No category data"
          description="Add receipts to see how your spending is distributed."
        />
      </Card>
    )
  }

  return (
    <Card className={styles.chartCard}>
      <CardHeader
        title="Category Distribution"
        description="Share of grocery spend this month"
      />
      <div className={styles.pieLayout}>
        <div className={styles.pieWrap}>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={56}
                outerRadius={88}
                paddingAngle={2}
                dataKey="value"
                nameKey="name"
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'var(--gg-bg-elevated)',
                  border: '1px solid var(--gg-border)',
                  borderRadius: '8px',
                  fontSize: '13px',
                }}
                formatter={(value) => [`${Number(value)}%`, 'Share']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className={styles.legend}>
          {data.map((item) => (
            <li key={item.name} className={styles.legendItem}>
              <span
                className={styles.legendDot}
                style={{ background: item.color }}
              />
              <span className={styles.legendName}>{item.name}</span>
              <span className={styles.legendValue}>{item.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}
