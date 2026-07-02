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
import {
  BUDGET_VS_ACTUAL_DATA,
  BUDGET_VS_ACTUAL_SERIES,
} from '../data/mock-budget-vs-actual'
import styles from './BudgetVsActualChart.module.css'

function formatCurrency(value: number) {
  return `₹${value.toLocaleString('en-IN')}`
}

export function BudgetVsActualChart() {
  return (
    <div className={styles.root}>
      <div className={styles.chartWrap}>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={BUDGET_VS_ACTUAL_DATA}
            margin={{ top: 8, right: 12, left: 0, bottom: 8 }}
            barGap={4}
            barCategoryGap="20%"
          >
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
              label={{
                value: 'Amount (₹)',
                angle: -90,
                position: 'insideLeft',
                fill: 'var(--gg-text-tertiary)',
                fontSize: 12,
                dx: 8,
              }}
              tick={{ fill: 'var(--gg-text-tertiary)', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `₹${(Number(value) / 1000).toFixed(0)}k`}
              width={52}
            />
            <Tooltip
              cursor={{ fill: 'var(--gg-border-subtle)' }}
              contentStyle={{
                background: 'var(--gg-bg-elevated)',
                border: '1px solid var(--gg-border)',
                borderRadius: '8px',
                fontSize: '13px',
                boxShadow: 'var(--gg-shadow-md)',
              }}
              labelStyle={{ color: 'var(--gg-text-primary)', fontWeight: 600 }}
              formatter={(value, name) => {
                const series = BUDGET_VS_ACTUAL_SERIES.find((s) => s.key === name)
                return [formatCurrency(Number(value)), series?.label ?? name]
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }}
              formatter={(value) => {
                const series = BUDGET_VS_ACTUAL_SERIES.find((s) => s.key === value)
                return series?.label ?? value
              }}
            />
            {BUDGET_VS_ACTUAL_SERIES.map((series) => (
              <Bar
                key={series.key}
                dataKey={series.key}
                fill={series.color}
                radius={[4, 4, 0, 0]}
                maxBarSize={28}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
