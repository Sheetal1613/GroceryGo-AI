import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'
import { INVENTORY_HEALTH_DATA } from '../data/mock-inventory-health'
import styles from './InventoryHealthCards.module.css'

export function InventoryHealthCards() {
  return (
    <div className={styles.grid}>
      {INVENTORY_HEALTH_DATA.map((metric) => {
        const Icon = metric.icon

        return (
          <Card key={metric.id} className={styles.card}>
            <div className={styles.inner}>
              <div className={cn(styles.iconWrap, styles[metric.tone])}>
                <Icon size={20} aria-hidden />
              </div>
              <div className={styles.content}>
                <p className={styles.label}>{metric.title}</p>
                <p className={styles.count}>{metric.count}</p>
                <div className={styles.progressWrap}>
                  <div
                    className={cn(styles.progressTrack, styles[`track_${metric.tone}`])}
                    role="progressbar"
                    aria-valuenow={metric.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${metric.title}: ${metric.progress}% of inventory`}
                  >
                    <div
                      className={cn(styles.progressFill, styles[`fill_${metric.tone}`])}
                      style={{ width: `${metric.progress}%` }}
                    />
                  </div>
                  <span className={styles.progressLabel}>{metric.progress}%</span>
                </div>
                <p className={styles.description}>{metric.description}</p>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
