import type { LucideIcon } from 'lucide-react'
import {
  AlertCircle,
  IndianRupee,
  Leaf,
  TrendingDown,
} from 'lucide-react'

export type MonthlyInsight = {
  id: string
  title: string
  description: string
  icon: LucideIcon
  tone: 'accent' | 'success' | 'warning' | 'neutral'
}

export const MONTHLY_INSIGHTS: MonthlyInsight[] = [
  {
    id: 'spending-down',
    title: 'You spent 18% less than last month',
    description:
      'Your grocery spending dropped from ₹10,280 to ₹8,420 compared to May.',
    icon: TrendingDown,
    tone: 'success',
  },
  {
    id: 'top-category',
    title: 'Dairy is your highest expense',
    description:
      'Dairy accounts for 18% of total spending — consider bulk buying to save more.',
    icon: IndianRupee,
    tone: 'accent',
  },
  {
    id: 'expiring-items',
    title: 'Three items expire this week',
    description:
      'Yogurt, spinach, and paneer are expiring soon. Plan meals to use them first.',
    icon: AlertCircle,
    tone: 'warning',
  },
  {
    id: 'waste-savings',
    title: 'You saved ₹1,240 by reducing food waste',
    description:
      'Using expiring items and better meal planning kept more food out of the bin.',
    icon: Leaf,
    tone: 'success',
  },
]
