import { Link } from 'react-router-dom'
import { ChevronRight, Receipt } from 'lucide-react'
import { EmptyState } from '@/components/data-display/EmptyState'
import { Skeleton } from '@/components/feedback/LoadingSkeleton'
import { Card, CardHeader } from '@/components/ui/Card'
import { ROUTES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { formatCurrency, formatRelativeTime } from '../lib/receipt-utils'
import type { ReceiptHistoryEntry } from '../types'
import styles from './ReceiptHistoryPanel.module.css'

type ReceiptHistoryPanelProps = {
  history: ReceiptHistoryEntry[]
  activeId: string | null
  loading?: boolean
  onSelect: (entry: ReceiptHistoryEntry) => void
}

export function ReceiptHistoryPanel({
  history,
  activeId,
  loading = false,
  onSelect,
}: ReceiptHistoryPanelProps) {
  if (loading) {
    return (
      <Card className={styles.card}>
        <CardHeader title="Receipt history" />
        <ul className={styles.list}>
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i} className={styles.skeletonItem}>
              <Skeleton variant="rounded" className={styles.skeletonIcon} />
              <div className={styles.skeletonText}>
                <Skeleton />
                <Skeleton className={styles.skeletonSub} />
              </div>
            </li>
          ))}
        </ul>
      </Card>
    )
  }

  if (history.length === 0) {
    return (
      <Card className={styles.card}>
        <CardHeader
          title="Receipt history"
          description="Previously scanned receipts"
        />
        <EmptyState
          compact
          icon={Receipt}
          title="No receipts yet"
          description="Scan your first receipt to build purchase history."
        />
      </Card>
    )
  }

  return (
    <Card className={styles.card}>
      <CardHeader
        title="Receipt history"
        description={`${history.length} saved receipt${history.length === 1 ? '' : 's'}`}
      />
      <ul className={styles.list}>
        {history.map((entry) => (
          <li key={entry.id}>
            <button
              type="button"
              className={cn(
                styles.item,
                activeId === entry.id && styles.itemActive,
              )}
              onClick={() => onSelect(entry)}
            >
              <span className={styles.itemIcon}>
                <Receipt size={18} aria-hidden />
              </span>
              <span className={styles.itemBody}>
                <span className={styles.store}>{entry.storeName}</span>
                <span className={styles.meta}>
                  {entry.itemCount} items · {formatCurrency(entry.total)}
                </span>
                <span className={styles.date}>
                  {formatRelativeTime(entry.savedAt)}
                </span>
              </span>
              <ChevronRight size={16} className={styles.chevron} aria-hidden />
            </button>
            <Link
              to={`${ROUTES.receipts}/${entry.id}`}
              className={styles.detailLink}
            >
              View details
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  )
}
