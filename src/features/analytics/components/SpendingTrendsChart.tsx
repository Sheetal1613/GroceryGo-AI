import { useMemo, useState } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { cn } from '@/lib/utils'
import {
  SPENDING_TREND_RANGES,
  SPENDING_TRENDS_DATA,
  type SpendingTrendRange,
} from '../data/mock-spending-trends'
import styles from './SpendingTrendsChart.module.css'

function formatCurrency(value: number) {
  return `₹${value.toLocaleString('en-IN')}`
}

function getAxisLabel(range: SpendingTrendRange) {
  switch (range) {
    case 'weekly':
      return 'Day'
    case 'monthly':
      return 'Week'
    case 'yearly':
      return 'Month'
  }
}

export function SpendingTrendsChart() {
  const [range, setRange] = useState<SpendingTrendRange>('weekly')
  const data = SPENDING_TRENDS_DATA[range]

  const { total, average } = useMemo(() => {
    const sum = data.reduce((acc, point) => acc + point.amount, 0)
    return {
      total: sum,
      average: Math.round(sum / data.length),
    }
  }, [data])

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <div
          className={styles.rangeGroup}
          role="group"
          aria-label="Spending time range"
        >
          {SPENDING_TREND_RANGES.map((option) => (
            <button
              key={option.id}
              type="button"
              className={cn(
                styles.rangeBtn,
                range === option.id && styles.rangeBtnActive,
              )}
              aria-pressed={range === option.id}
              onClick={() => setRange(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.chartWrap}>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart
            key={range}
            data={data}
            margin={{ top: 8, right: 12, left: 0, bottom: 8 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--gg-border)"
              vertical={false}
            />
            <XAxis
              dataKey="label"
              label={{
                value: getAxisLabel(range),
                position: 'insideBottom',
                offset: -4,
                fill: 'var(--gg-text-tertiary)',
                fontSize: 12,
              }}
              tick={{ fill: 'var(--gg-text-tertiary)', fontSize: 12 }}
              axisLine={{ stroke: 'var(--gg-border)' }}
              tickLine={false}
              interval={range === 'yearly' ? 0 : 'preserveStartEnd'}
              angle={range === 'yearly' ? -35 : 0}
              textAnchor={range === 'yearly' ? 'end' : 'middle'}
              height={range === 'yearly' ? 52 : 32}
            />
            <YAxis
              label={{
                value: 'Spending (₹)',
                angle: -90,
                position: 'insideLeft',
                fill: 'var(--gg-text-tertiary)',
                fontSize: 12,
                dx: 8,
              }}
              tick={{ fill: 'var(--gg-text-tertiary)', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `₹${value}`}
              width={56}
            />
            <Tooltip
              cursor={{
                stroke: 'var(--gg-accent)',
                strokeWidth: 1,
                strokeDasharray: '4 4',
              }}
              contentStyle={{
                background: 'var(--gg-bg-elevated)',
                border: '1px solid var(--gg-border)',
                borderRadius: '8px',
                fontSize: '13px',
                boxShadow: 'var(--gg-shadow-md)',
              }}
              labelStyle={{ color: 'var(--gg-text-primary)', fontWeight: 600 }}
              formatter={(value) => [formatCurrency(Number(value)), 'Spending']}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="var(--gg-accent)"
              strokeWidth={2.5}
              dot={{
                r: 4,
                fill: 'var(--gg-accent)',
                stroke: 'var(--gg-bg-surface)',
                strokeWidth: 2,
              }}
              activeDot={{
                r: 7,
                fill: 'var(--gg-accent)',
                stroke: 'var(--gg-bg-surface)',
                strokeWidth: 3,
              }}
              animationDuration={900}
              animationEasing="ease-in-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.summary}>
        <div className={styles.summaryItem}>
          <p className={styles.summaryLabel}>Total Spending</p>
          <p className={styles.summaryValue}>{formatCurrency(total)}</p>
        </div>
        <div className={styles.summaryItem}>
          <p className={styles.summaryLabel}>Average Spending</p>
          <p className={styles.summaryValue}>{formatCurrency(average)}</p>
        </div>
      </div>
    </div>
  )
}
