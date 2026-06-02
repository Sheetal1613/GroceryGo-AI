import { AlertTriangle, Package, PackageX, Timer } from 'lucide-react'
import { StatCard } from '@/components/data-display/StatCard'
import styles from './InventoryStats.module.css'

type InventoryStatsProps = {
  total: number
  lowStock: number
  outOfStock: number
  expiringSoon: number
  loading?: boolean
}

export function InventoryStats({
  total,
  lowStock,
  outOfStock,
  expiringSoon,
  loading = false,
}: InventoryStatsProps) {
  return (
    <div className={styles.grid}>
      <StatCard
        title="Total Items"
        value={String(total)}
        icon={Package}
        iconTone="accent"
        loading={loading}
      />
      <StatCard
        title="Low Stock"
        value={String(lowStock)}
        icon={AlertTriangle}
        iconTone="warning"
        loading={loading}
      />
      <StatCard
        title="Out of Stock"
        value={String(outOfStock)}
        icon={PackageX}
        iconTone="danger"
        loading={loading}
      />
      <StatCard
        title="Expiring Soon"
        value={String(expiringSoon)}
        icon={Timer}
        iconTone="warning"
        loading={loading}
      />
    </div>
  )
}
