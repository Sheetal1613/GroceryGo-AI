import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'
import {
  FOOD_WASTE_DATA,
  FOOD_WASTE_TREND_ICONS,
} from '../data/mock-food-waste'
import styles from './FoodWasteAnalyticsCards.module.css'

export function FoodWasteAnalyticsCards() {
  return (
    <div className={styles.grid}>
      {FOOD_WASTE_DATA.map((metric) => {
        const Icon = metric.icon
        const TrendIcon = FOOD_WASTE_TREND_ICONS[metric.trend.direction]

        return (
          <Card key={metric.id} className={styles.card}>
            <div className={styles.inner}>
              <div className={cn(styles.iconWrap, styles[metric.iconTone])}>
                <Icon size={20} aria-hidden />
              </div>
              <div className={styles.content}>
                <p className={styles.label}>{metric.title}</p>
                <p className={styles.value}>{metric.value}</p>
                <div className={styles.trendRow}>
                  <Badge variant={metric.trend.variant} className={styles.trendBadge}>
                    <TrendIcon size={12} aria-hidden className={styles.trendIcon} />
                    {metric.trend.value}
                  </Badge>
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
