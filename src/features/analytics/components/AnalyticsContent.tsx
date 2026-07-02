import { PageHeader } from '@/components/layout/PageHeader'
import { AnalyticsOverviewKpis } from './AnalyticsOverviewKpis'
import { AnalyticsSection } from './AnalyticsSection'
import { BudgetVsActualChart } from './BudgetVsActualChart'
import { CategoryBreakdownChart } from './CategoryBreakdownChart'
import { FoodWasteAnalyticsCards } from './FoodWasteAnalyticsCards'
import { InventoryHealthCards } from './InventoryHealthCards'
import { MonthlyInsightsCards } from './MonthlyInsightsCards'
import { SpendingTrendsChart } from './SpendingTrendsChart'
import { TopPurchasedItemsTable } from './TopPurchasedItemsTable'
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
          contentClassName={styles.filledContent}
        >
          <CategoryBreakdownChart />
        </AnalyticsSection>
      </section>

      <section className={styles.dualGrid} aria-label="Budget and inventory">
        <AnalyticsSection
          title="Budget vs Actual"
          description="Compare planned grocery budgets against actual spending."
          contentClassName={styles.filledContent}
        >
          <BudgetVsActualChart />
        </AnalyticsSection>
        <AnalyticsSection
          title="Inventory Health"
          description="Stock levels, expiring items, and replenishment signals."
          contentClassName={styles.filledContent}
        >
          <InventoryHealthCards />
        </AnalyticsSection>
      </section>

      <section className={styles.dualGrid} aria-label="Waste and purchases">
        <AnalyticsSection
          title="Food Waste Analytics"
          description="Track discarded items and waste reduction opportunities."
          contentClassName={styles.filledContent}
        >
          <FoodWasteAnalyticsCards />
        </AnalyticsSection>
        <AnalyticsSection
          title="Top Purchased Items"
          description="Most frequently bought products and purchase frequency."
          contentClassName={styles.filledContent}
        >
          <TopPurchasedItemsTable />
        </AnalyticsSection>
      </section>

      <AnalyticsSection
        title="Monthly Insights"
        description="Automated highlights and recommendations based on your grocery data."
        contentClassName={styles.filledContent}
      >
        <MonthlyInsightsCards />
      </AnalyticsSection>
    </div>
  )
}
