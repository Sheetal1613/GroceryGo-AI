import type { LucideIcon } from 'lucide-react'
import {
  Leaf,
  Recycle,
  Trash2,
  TrendingDown,
  TrendingUp,
  Wallet,
} from 'lucide-react'

export type FoodWasteMetric = {
  id: string
  title: string
  value: string
  description: string
  icon: LucideIcon
  iconTone: 'success' | 'warning' | 'danger' | 'accent'
  trend: {
    value: string
    direction: 'up' | 'down'
    variant: 'success' | 'warning' | 'danger' | 'accent'
  }
}

export const FOOD_WASTE_DATA: FoodWasteMetric[] = [
  {
    id: 'waste-saved',
    title: 'Food Waste Saved',
    value: '12.4 kg',
    description: 'Estimated food diverted from waste this month.',
    icon: Leaf,
    iconTone: 'success',
    trend: { value: '+15%', direction: 'up', variant: 'success' },
  },
  {
    id: 'money-saved',
    title: 'Money Saved',
    value: '₹1,240',
    description: 'Value recovered by using items before they expired.',
    icon: Wallet,
    iconTone: 'accent',
    trend: { value: '+9%', direction: 'up', variant: 'success' },
  },
  {
    id: 'items-expired',
    title: 'Items Expired',
    value: '3',
    description: 'Products discarded due to expiry this month.',
    icon: Trash2,
    iconTone: 'danger',
    trend: { value: '-25%', direction: 'down', variant: 'success' },
  },
  {
    id: 'waste-reduction',
    title: 'Waste Reduction',
    value: '24%',
    description: 'Improvement in waste reduction compared to last month.',
    icon: Recycle,
    iconTone: 'success',
    trend: { value: '+6%', direction: 'up', variant: 'success' },
  },
]

export const FOOD_WASTE_TREND_ICONS = {
  up: TrendingUp,
  down: TrendingDown,
} as const
