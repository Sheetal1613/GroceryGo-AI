import type { InventoryCategory } from '@/features/inventory/types'

export type ItemPriority = 'high' | 'medium' | 'low'
export type ListStatus = 'active' | 'completed'

export type ShoppingListItem = {
  id: string
  name: string
  category: InventoryCategory
  quantity: number
  unit: string
  priority: ItemPriority
  completed: boolean
  note?: string
}

export type ShoppingList = {
  id: string
  name: string
  status: ListStatus
  createdAt: string
  updatedAt: string
  items: ShoppingListItem[]
}

export type SuggestionItem = {
  id: string
  name: string
  category: InventoryCategory
  reason: string
  quantity: number
  unit: string
  priority: ItemPriority
}

export type ShoppingListModalMode =
  | null
  | 'create-list'
  | 'rename-list'
  | 'delete-list'
  | 'add-item'
  | 'edit-item'
  | 'delete-item'
