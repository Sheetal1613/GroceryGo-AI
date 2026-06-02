import { Link } from 'react-router-dom'
import { PackagePlus, ScanLine, ShoppingCart, Sparkles } from 'lucide-react'
import { Card, CardHeader } from '@/components/ui/Card'
import { ROUTES } from '@/lib/constants'
import styles from './QuickActions.module.css'

const ACTIONS = [
  {
    label: 'Add Item',
    description: 'Add to inventory',
    href: ROUTES.inventory,
    icon: PackagePlus,
    tone: 'accent' as const,
  },
  {
    label: 'Scan Receipt',
    description: 'Import purchases',
    href: ROUTES.receipts,
    icon: ScanLine,
    tone: 'neutral' as const,
  },
  {
    label: 'Generate Shopping List',
    description: 'AI-powered suggestions',
    href: ROUTES.shoppingList,
    icon: ShoppingCart,
    tone: 'success' as const,
  },
]

type QuickActionsProps = {
  loading?: boolean
}

export function QuickActions({ loading = false }: QuickActionsProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader title="Quick Actions" />
        <div className={styles.skeletonGrid}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={styles.skeletonAction} />
          ))}
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader
        title="Quick Actions"
        description="Common tasks to stay on top of groceries"
        action={
          <Link to={ROUTES.assistant} className={styles.aiLink}>
            <Sparkles size={14} aria-hidden />
            Ask AI
          </Link>
        }
      />
      <div className={styles.grid}>
        {ACTIONS.map((action) => {
          const Icon = action.icon
          return (
            <Link
              key={action.label}
              to={action.href}
              className={styles.action}
            >
              <span className={`${styles.icon} ${styles[action.tone]}`}>
                <Icon size={18} aria-hidden />
              </span>
              <span className={styles.text}>
                <span className={styles.label}>{action.label}</span>
                <span className={styles.desc}>{action.description}</span>
              </span>
            </Link>
          )
        })}
      </div>
    </Card>
  )
}
