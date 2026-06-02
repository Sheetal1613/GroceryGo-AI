import { cn } from '@/lib/utils'
import type { StockStatus } from '../types'
import styles from './QuantityIndicator.module.css'

type QuantityIndicatorProps = {
  quantity: number
  unit: string
  stockStatus: StockStatus
}

export function QuantityIndicator({
  quantity,
  unit,
  stockStatus,
}: QuantityIndicatorProps) {
  return (
    <div className={styles.wrap}>
      <span
        className={cn(
          styles.bar,
          stockStatus === 'healthy' && styles.healthy,
          stockStatus === 'low' && styles.low,
          stockStatus === 'out' && styles.out,
        )}
        aria-hidden
      />
      <span className={styles.text}>
        <strong>{quantity}</strong> {unit}
      </span>
    </div>
  )
}
