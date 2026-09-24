import {
  Bar,
  BarChart,
  CartesianGrid,
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
  return `₹${value.toLocaleString('en-IN')}`
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
          description="Your grocery spending over the last 6 months"
        />
        <EmptyState
          compact
          icon={BarChart3}
          title="No spending data yet"
          description="Add purchases to see your spending trends."
        />
      </Card>
    )
  }

  return (
    <Card className={styles.chartCard}>
      <CardHeader
        title="Monthly Spending"
        description="Your grocery spending over the last 6 months"
      />

      <div className={styles.chartWrap}>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={data}
            margin={{ top: 8, right: 8, left: -8, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--gg-border)"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tick={{
                fill: 'var(--gg-text-tertiary)',
                fontSize: 12,
              }}
              axisLine={{ stroke: 'var(--gg-border)' }}
              tickLine={false}
            />

            <YAxis
              tick={{
                fill: 'var(--gg-text-tertiary)',
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `₹${value}`}
            />

            <Tooltip
              contentStyle={{
                background: 'var(--gg-bg-elevated)',
                border: '1px solid var(--gg-border)',
                borderRadius: '8px',
                fontSize: '13px',
              }}
              labelStyle={{
                color: 'var(--gg-text-primary)',
                fontWeight: 600,
              }}
              formatter={(value) => [
                formatCurrency(Number(value)),
                'Spent',
              ]}
            />

            <Bar
              dataKey="amount"
              name="Spent"
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