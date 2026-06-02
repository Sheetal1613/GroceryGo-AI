import { PageHeader } from '@/components/layout/PageHeader'
import { Skeleton } from '@/components/feedback/LoadingSkeleton'
import { InventoryStats } from './InventoryStats'
import styles from '../Inventory.module.css'

export function InventorySkeleton() {
  return (
    <div className={styles.page}>
      <PageHeader
        title="Inventory"
        description="Manage pantry items, stock levels, and expiry dates."
        actions={<Skeleton className={styles.headerSkeleton} variant="rounded" />}
      />
      <InventoryStats total={0} lowStock={0} outOfStock={0} expiringSoon={0} loading />
      <Skeleton className={styles.toolbarSkeleton} variant="rounded" />
      <Skeleton className={styles.tableSkeleton} variant="rounded" />
    </div>
  )
}
