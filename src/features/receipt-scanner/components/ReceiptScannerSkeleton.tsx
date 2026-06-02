import { PageHeader } from '@/components/layout/PageHeader'
import { Skeleton } from '@/components/feedback/LoadingSkeleton'
import styles from '../ReceiptScanner.module.css'

export function ReceiptScannerSkeleton() {
  return (
    <div className={styles.page}>
      <PageHeader
        title="Receipt Scanner"
        description="Upload or scan receipts to track purchases automatically."
      />
      <div className={styles.layout}>
        <div className={styles.main}>
          <Skeleton className={styles.uploadSkeleton} variant="rounded" />
          <Skeleton className={styles.editorSkeleton} variant="rounded" />
        </div>
        <Skeleton className={styles.historySkeleton} variant="rounded" />
      </div>
    </div>
  )
}
