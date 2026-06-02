import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card, CardHeader } from '@/components/ui/Card'
import { EmptyState } from '@/components/data-display/EmptyState'
import { Skeleton } from '@/components/feedback/LoadingSkeleton'
import { BarChart3 } from 'lucide-react'
import type { SpendingDataPoint } from '../types'
import styles from './Charts.module.css'

type SpendChartProps = {
  data: SpendingDataPoint[]
  loading?: boolean
}

function formatCurrency(value: number) {
  return `$${value.toLocaleString()}`
}

export function SpendChart({ data, loading = false }: SpendChartProps) {
  if (loading) {
    return (
      <Card className={styles.chartCard}>
        <CardHeader title="Monthly Spending" />
        <Skeleton className={styles.chartSkeleton} variant="rounded" />
      </Card>
    )
  }

  if (data.length === 0) {
    return (
      <Card className={styles.chartCard}>
        <CardHeader
          title="Monthly Spending"
          description="Track spending against your budget"
        />
        <EmptyState
          compact
          icon={BarChart3}
          title="No spending data yet"
          description="Scan a receipt or add purchases to see your spending trends."
        />
      </Card>
    )
  }

  return (
    <Card className={styles.chartCard}>
      <CardHeader
        title="Monthly Spending"
        description="Actual spend vs. $1,300 monthly budget"
      />
      <div className={styles.chartWrap}>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--gg-border)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fill: 'var(--gg-text-tertiary)', fontSize: 12 }}
              axisLine={{ stroke: 'var(--gg-border)' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: 'var(--gg-text-tertiary)', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip
              contentStyle={{
                background: 'var(--gg-bg-elevated)',
                border: '1px solid var(--gg-border)',
                borderRadius: '8px',
                fontSize: '13px',
              }}
              labelStyle={{ color: 'var(--gg-text-primary)', fontWeight: 600 }}
              formatter={(value, name) => [
                formatCurrency(Number(value)),
                name === 'amount' ? 'Spent' : 'Budget',
              ]}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }}
              formatter={(value) =>
                value === 'amount' ? 'Spent' : 'Budget'
              }
            />
            <Bar
              dataKey="budget"
              fill="var(--gg-border)"
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
            <Bar
              dataKey="amount"
              fill="var(--gg-accent)"
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
