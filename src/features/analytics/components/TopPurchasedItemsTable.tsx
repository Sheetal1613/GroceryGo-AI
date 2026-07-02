import { ArrowDown, ArrowUp, Minus } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { TOP_PURCHASED_ITEMS } from '../data/mock-top-purchased-items'
import type { PurchaseTrend } from '../data/mock-top-purchased-items'
import styles from './TopPurchasedItemsTable.module.css'

function formatCurrency(value: number) {
  return `₹${value.toLocaleString('en-IN')}`
}

function TrendBadge({ trend }: { trend: PurchaseTrend }) {
  if (trend === 'up') {
    return (
      <Badge variant="success" className={styles.trendBadge}>
        <ArrowUp size={12} aria-hidden />
        Up
      </Badge>
    )
  }

  if (trend === 'down') {
    return (
      <Badge variant="warning" className={styles.trendBadge}>
        <ArrowDown size={12} aria-hidden />
        Down
      </Badge>
    )
  }

  return (
    <Badge variant="neutral" className={styles.trendBadge}>
      <Minus size={12} aria-hidden />
      Stable
    </Badge>
  )
}

export function TopPurchasedItemsTable() {
  return (
    <div className={styles.root}>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Times Purchased</th>
              <th className={styles.hideMobile}>Total Spent</th>
              <th className={styles.hideMobile}>Category</th>
              <th>Trend</th>
            </tr>
          </thead>
          <tbody>
            {TOP_PURCHASED_ITEMS.map((row) => (
              <tr key={row.id}>
                <td>
                  <span className={styles.itemName}>{row.item}</span>
                </td>
                <td className={styles.numeric}>{row.timesPurchased}</td>
                <td className={`${styles.numeric} ${styles.hideMobile}`}>
                  {formatCurrency(row.totalSpent)}
                </td>
                <td className={styles.hideMobile}>
                  <span className={styles.category}>{row.category}</span>
                </td>
                <td>
                  <TrendBadge trend={row.trend} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.mobileList}>
        {TOP_PURCHASED_ITEMS.map((row) => (
          <article key={row.id} className={styles.mobileCard}>
            <div className={styles.mobileHeader}>
              <h3 className={styles.itemName}>{row.item}</h3>
              <TrendBadge trend={row.trend} />
            </div>
            <dl className={styles.mobileMeta}>
              <div>
                <dt>Times Purchased</dt>
                <dd>{row.timesPurchased}</dd>
              </div>
              <div>
                <dt>Total Spent</dt>
                <dd>{formatCurrency(row.totalSpent)}</dd>
              </div>
              <div>
                <dt>Category</dt>
                <dd>{row.category}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  )
}
