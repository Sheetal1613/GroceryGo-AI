import type { LucideIcon } from 'lucide-react'
import {
  BarChart3,
  Bell,
  Bot,
  LayoutDashboard,
  Package,
  Receipt,
  ScanLine,
  Settings,
  ShoppingCart,
  User,
} from 'lucide-react'

export const APP_NAME = 'GroceryGo AI'

export const ROUTES = {
  dashboard: '/app/dashboard',
  inventory: '/app/inventory',
  shoppingList: '/app/shopping-list',
  receipts: '/app/receipts',
  analytics: '/app/analytics',
  assistant: '/app/assistant',
  notifications: '/app/notifications',
  settings: '/app/settings',
  profile: '/app/profile',
} as const

export type NavItem = {
  label: string
  href: string
  icon: LucideIcon
}

export type NavGroup = {
  title: string
  items: NavItem[]
}

export const NAV_GROUPS: NavGroup[] = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', href: ROUTES.dashboard, icon: LayoutDashboard },
    ],
  },
  {
    title: 'Grocery',
    items: [
      { label: 'Inventory', href: ROUTES.inventory, icon: Package },
      { label: 'Shopping List', href: ROUTES.shoppingList, icon: ShoppingCart },
      { label: 'Receipt Scanner', href: ROUTES.receipts, icon: ScanLine },
    ],
  },
  {
    title: 'Insights',
    items: [
      { label: 'Analytics', href: ROUTES.analytics, icon: BarChart3 },
    ],
  },
  {
    title: 'AI',
    items: [
      { label: 'AI Assistant', href: ROUTES.assistant, icon: Bot },
    ],
  },
  {
    title: 'System',
    items: [
      { label: 'Notifications', href: ROUTES.notifications, icon: Bell },
    ],
  },
]

export const FOOTER_NAV: NavItem[] = [
  { label: 'Settings', href: ROUTES.settings, icon: Settings },
  { label: 'Profile', href: ROUTES.profile, icon: User },
]

export const MOCK_USER = {
  name: 'Alex Morgan',
  email: 'alex@example.com',
  initials: 'AM',
}

/** Page titles keyed by pathname prefix */
export const PAGE_TITLES: Record<string, string> = {
  [ROUTES.dashboard]: 'Dashboard',
  [ROUTES.inventory]: 'Inventory',
  [ROUTES.shoppingList]: 'Shopping List',
  [ROUTES.receipts]: 'Receipt Scanner',
  [ROUTES.analytics]: 'Analytics',
  [ROUTES.assistant]: 'AI Assistant',
  [ROUTES.notifications]: 'Notifications',
  [ROUTES.settings]: 'Settings',
  [ROUTES.profile]: 'Profile',
}
