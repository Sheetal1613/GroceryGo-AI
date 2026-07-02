import { useMemo } from 'react'
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { getCategoryBreakdownWithPercentages } from '../data/mock-category-breakdown'
import styles from './CategoryBreakdownChart.module.css'

function formatCurrency(value: number) {
  return `₹${value.toLocaleString('en-IN')}`
}

export function CategoryBreakdownChart() {
  const data = useMemo(() => getCategoryBreakdownWithPercentages(), [])
  const total = useMemo(
    () => data.reduce((sum, item) => sum + item.amount, 0),
    [data],
  )

  return (
    <div className={styles.root}>
      <div className={styles.pieLayout}>
        <div className={styles.pieWrap}>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={88}
                paddingAngle={2}
                dataKey="amount"
                nameKey="name"
                label={({ percent }) => `${Math.round(percent * 100)}%`}
                labelLine={false}
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={entry.color}
                    stroke="var(--gg-bg-surface)"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'var(--gg-bg-elevated)',
                  border: '1px solid var(--gg-border)',
                  borderRadius: '8px',
                  fontSize: '13px',
                  boxShadow: 'var(--gg-shadow-md)',
                }}
                labelStyle={{ color: 'var(--gg-text-primary)', fontWeight: 600 }}
                formatter={(value, _name, item) => {
                  const payload = item?.payload as (typeof data)[number] | undefined
                  return [
                    `${formatCurrency(Number(value))} (${payload?.percentage ?? 0}%)`,
                    payload?.name ?? 'Category',
                  ]
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <ul className={styles.legend} aria-label="Category legend">
          {data.map((item) => (
            <li key={item.name} className={styles.legendItem}>
              <span
                className={styles.legendDot}
                style={{ background: item.color }}
                aria-hidden
              />
              <span className={styles.legendName}>{item.name}</span>
              <span className={styles.legendValue}>{item.percentage}%</span>
            </li>
          ))}
        </ul>
      </div>

      <p className={styles.total}>
        Total spending: <strong>{formatCurrency(total)}</strong>
      </p>
    </div>
  )
}
