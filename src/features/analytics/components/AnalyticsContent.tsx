import { PageHeader } from '@/components/layout/PageHeader'
import { AnalyticsOverviewKpis } from './AnalyticsOverviewKpis'
import { AnalyticsSection } from './AnalyticsSection'
import { SpendingTrendsChart } from './SpendingTrendsChart'
import styles from '../Analytics.module.css'

export function AnalyticsContent() {
  return (
    <div className={styles.analytics}>
      <PageHeader
        title="Analytics"
        description="Track spending, inventory health, and grocery insights across your household."
      />

      <AnalyticsSection
        title="Overview"
        description="High-level summary of your grocery activity and key metrics."
        contentClassName={styles.overviewContent}
      >
        <AnalyticsOverviewKpis />
      </AnalyticsSection>

      <section className={styles.trendsGrid} aria-label="Spending and categories">
        <AnalyticsSection
          title="Spending Trends"
          description="Monthly and weekly spending patterns over time."
          contentClassName={styles.spendingTrendsContent}
        >
          <SpendingTrendsChart />
        </AnalyticsSection>
        <AnalyticsSection
          title="Category Breakdown"
          description="How your grocery budget is distributed across categories."
          contentClassName={styles.chartContent}
        />
      </section>

      <section className={styles.dualGrid} aria-label="Budget and inventory">
        <AnalyticsSection
          title="Budget vs Actual"
          description="Compare planned grocery budgets against actual spending."
          contentClassName={styles.panelContent}
        />
        <AnalyticsSection
          title="Inventory Health"
          description="Stock levels, expiring items, and replenishment signals."
          contentClassName={styles.panelContent}
        />
      </section>

      <section className={styles.dualGrid} aria-label="Waste and purchases">
        <AnalyticsSection
          title="Food Waste Analytics"
          description="Track discarded items and waste reduction opportunities."
          contentClassName={styles.panelContent}
        />
        <AnalyticsSection
          title="Top Purchased Items"
          description="Most frequently bought products and purchase frequency."
          contentClassName={styles.panelContent}
        />
      </section>

      <AnalyticsSection
        title="Monthly Insights"
        description="Automated highlights and recommendations based on your grocery data."
        contentClassName={styles.insightsContent}
      />
    </div>
  )
}
