export const INVENTORY_CATEGORIES = [
  'Produce',
  'Dairy & Eggs',
  'Meat & Seafood',
  'Pantry',
  'Frozen',
  'Beverages',
  'Bakery',
  'Snacks',
] as const

export type InventoryCategory = (typeof INVENTORY_CATEGORIES)[number]

export type ExpiryStatus = 'safe' | 'expiring_soon' | 'critical' | 'expired'

export type StockStatus = 'healthy' | 'low' | 'out'

export type InventoryItem = {
  id: string
  name: string
  category: InventoryCategory
  quantity: number
  unit: string
  lowStockThreshold: number
  purchaseDate: string
  expiryDate: string | null
}

export type InventoryItemWithStatus = InventoryItem & {
  expiryStatus: ExpiryStatus
  stockStatus: StockStatus
}

export type SortField = 'name' | 'quantity' | 'expiryDate'
export type SortDirection = 'asc' | 'desc'

export type CategoryFilter = 'all' | InventoryCategory
export type ExpiryFilter = 'all' | ExpiryStatus
export type StockFilter = 'all' | StockStatus

export type InventoryFilters = {
  search: string
  category: CategoryFilter
  expiry: ExpiryFilter
  stock: StockFilter
}

export type InventoryFormData = {
  name: string
  category: InventoryCategory
  quantity: number
  unit: string
  lowStockThreshold: number
  purchaseDate: string
  expiryDate: string
}

export type ModalMode = 'add' | 'edit' | 'delete' | null
