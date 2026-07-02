import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'
import { MONTHLY_INSIGHTS } from '../data/mock-monthly-insights'
import styles from './MonthlyInsightsCards.module.css'

export function MonthlyInsightsCards() {
  return (
    <div className={styles.grid}>
      {MONTHLY_INSIGHTS.map((insight) => {
        const Icon = insight.icon

        return (
          <Card key={insight.id} className={styles.card}>
            <div className={styles.inner}>
              <div className={cn(styles.iconWrap, styles[insight.tone])}>
                <Icon size={22} aria-hidden />
              </div>
              <div className={styles.content}>
                <h3 className={styles.title}>{insight.title}</h3>
                <p className={styles.description}>{insight.description}</p>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
