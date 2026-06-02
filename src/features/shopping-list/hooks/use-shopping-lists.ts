import { useCallback, useEffect, useMemo, useState } from 'react'
import type {
  ItemPriority,
  ShoppingList,
  ShoppingListItem,
  ShoppingListModalMode,
  SuggestionItem,
} from '../types'

const LOAD_DELAY_MS = 700

function nowIso() {
  return new Date().toISOString()
}

function id(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
}

const MOCK_LISTS: ShoppingList[] = [
  {
    id: 'list-weekly',
    name: 'Weekly Essentials',
    status: 'active',
    createdAt: '2026-06-01T09:00:00Z',
    updatedAt: '2026-06-02T08:30:00Z',
    items: [
      { id: 'i1', name: 'Whole Milk', category: 'Dairy & Eggs', quantity: 2, unit: 'cartons', priority: 'high', completed: false },
      { id: 'i2', name: 'Eggs', category: 'Dairy & Eggs', quantity: 1, unit: 'carton', priority: 'high', completed: false },
      { id: 'i3', name: 'Bananas', category: 'Produce', quantity: 2, unit: 'bunches', priority: 'medium', completed: true },
      { id: 'i4', name: 'Chicken Breast', category: 'Meat & Seafood', quantity: 2, unit: 'lbs', priority: 'medium', completed: false },
      { id: 'i5', name: 'Sparkling Water', category: 'Beverages', quantity: 1, unit: 'pack', priority: 'low', completed: false },
    ],
  },
  {
    id: 'list-mealprep',
    name: 'Meal Prep Sunday',
    status: 'active',
    createdAt: '2026-05-30T10:00:00Z',
    updatedAt: '2026-06-01T11:00:00Z',
    items: [
      { id: 'm1', name: 'Brown Rice', category: 'Pantry', quantity: 1, unit: 'bag', priority: 'medium', completed: true },
      { id: 'm2', name: 'Broccoli', category: 'Produce', quantity: 3, unit: 'heads', priority: 'high', completed: false },
      { id: 'm3', name: 'Greek Yogurt', category: 'Dairy & Eggs', quantity: 2, unit: 'tubs', priority: 'low', completed: false },
    ],
  },
  {
    id: 'list-bbq',
    name: 'Backyard BBQ',
    status: 'completed',
    createdAt: '2026-05-23T14:30:00Z',
    updatedAt: '2026-05-25T18:00:00Z',
    items: [
      { id: 'b1', name: 'Burger Buns', category: 'Bakery', quantity: 2, unit: 'packs', priority: 'high', completed: true },
      { id: 'b2', name: 'Ground Beef', category: 'Meat & Seafood', quantity: 3, unit: 'lbs', priority: 'high', completed: true },
      { id: 'b3', name: 'Cheddar Slices', category: 'Dairy & Eggs', quantity: 1, unit: 'pack', priority: 'medium', completed: true },
    ],
  },
]

const MOCK_SUGGESTIONS: SuggestionItem[] = [
  { id: 's1', name: 'Sourdough Bread', category: 'Bakery', reason: 'Out of stock in inventory', quantity: 1, unit: 'loaf', priority: 'high' },
  { id: 's2', name: 'Organic Spinach', category: 'Produce', reason: 'Low stock: 2 bags left', quantity: 2, unit: 'bags', priority: 'medium' },
  { id: 's3', name: 'Whole Milk', category: 'Dairy & Eggs', reason: 'Recurring weekly purchase', quantity: 2, unit: 'cartons', priority: 'high' },
  { id: 's4', name: 'Frozen Pizza', category: 'Frozen', reason: 'Frequently bought on Fridays', quantity: 1, unit: 'pizza', priority: 'low' },
]

function completionPercent(items: ShoppingListItem[]) {
  if (!items.length) return 0
  const done = items.filter((i) => i.completed).length
  return Math.round((done / items.length) * 100)
}

export function useShoppingLists() {
  const [lists, setLists] = useState<ShoppingList[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeListId, setActiveListId] = useState<string | null>(null)
  const [modalMode, setModalMode] = useState<ShoppingListModalMode>(null)
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)
    const t = window.setTimeout(() => {
      if (cancelled) return
      setLists(MOCK_LISTS)
      setActiveListId(MOCK_LISTS[0]?.id ?? null)
      setIsLoading(false)
    }, LOAD_DELAY_MS)
    return () => {
      cancelled = true
      window.clearTimeout(t)
    }
  }, [])

  const activeList = useMemo(
    () => lists.find((l) => l.id === activeListId) ?? null,
    [lists, activeListId],
  )

  const recentLists = useMemo(
    () => [...lists].sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt)).slice(0, 4),
    [lists],
  )

  const selectedItem = useMemo(
    () => activeList?.items.find((i) => i.id === selectedItemId) ?? null,
    [activeList, selectedItemId],
  )

  const activeCompletion = useMemo(
    () => (activeList ? completionPercent(activeList.items) : 0),
    [activeList],
  )

  const openModal = useCallback((mode: ShoppingListModalMode, itemId?: string) => {
    setModalMode(mode)
    setSelectedItemId(itemId ?? null)
  }, [])

  const closeModal = useCallback(() => {
    setModalMode(null)
    setSelectedItemId(null)
  }, [])

  const createList = useCallback((name: string) => {
    const next: ShoppingList = {
      id: id('list'),
      name: name.trim(),
      status: 'active',
      createdAt: nowIso(),
      updatedAt: nowIso(),
      items: [],
    }
    setLists((prev) => [next, ...prev])
    setActiveListId(next.id)
    closeModal()
  }, [closeModal])

  const renameActiveList = useCallback((name: string) => {
    if (!activeListId) return
    setLists((prev) => prev.map((l) => (l.id === activeListId ? { ...l, name: name.trim(), updatedAt: nowIso() } : l)))
    closeModal()
  }, [activeListId, closeModal])

  const deleteActiveList = useCallback(() => {
    if (!activeListId) return
    setLists((prev) => {
      const next = prev.filter((l) => l.id !== activeListId)
      setActiveListId(next[0]?.id ?? null)
      return next
    })
    closeModal()
  }, [activeListId, closeModal])

  const addItem = useCallback((payload: Omit<ShoppingListItem, 'id' | 'completed'>) => {
    if (!activeListId) return
    const nextItem: ShoppingListItem = { ...payload, id: id('item'), completed: false }
    setLists((prev) =>
      prev.map((l) =>
        l.id === activeListId ? { ...l, items: [nextItem, ...l.items], updatedAt: nowIso() } : l,
      ),
    )
    closeModal()
  }, [activeListId, closeModal])

  const editItem = useCallback((itemId: string, patch: Partial<ShoppingListItem>) => {
    if (!activeListId) return
    setLists((prev) =>
      prev.map((l) =>
        l.id === activeListId
          ? { ...l, items: l.items.map((i) => (i.id === itemId ? { ...i, ...patch } : i)), updatedAt: nowIso() }
          : l,
      ),
    )
    closeModal()
  }, [activeListId, closeModal])

  const deleteItem = useCallback((itemId: string) => {
    if (!activeListId) return
    setLists((prev) =>
      prev.map((l) =>
        l.id === activeListId ? { ...l, items: l.items.filter((i) => i.id !== itemId), updatedAt: nowIso() } : l,
      ),
    )
    closeModal()
  }, [activeListId, closeModal])

  const toggleComplete = useCallback((itemId: string) => {
    if (!activeListId) return
    setLists((prev) =>
      prev.map((l) => {
        if (l.id !== activeListId) return l
        const items = l.items.map((i) => (i.id === itemId ? { ...i, completed: !i.completed } : i))
        const status = items.every((i) => i.completed) && items.length > 0 ? 'completed' : 'active'
        return { ...l, items, status, updatedAt: nowIso() }
      }),
    )
  }, [activeListId])

  const addSuggestion = useCallback((suggestion: SuggestionItem) => {
    addItem({
      name: suggestion.name,
      category: suggestion.category,
      quantity: suggestion.quantity,
      unit: suggestion.unit,
      priority: suggestion.priority,
      note: 'Added from Smart Suggestions',
    })
  }, [addItem])

  return {
    lists,
    activeList,
    activeListId,
    recentLists,
    suggestions: MOCK_SUGGESTIONS,
    isLoading,
    error,
    activeCompletion,
    modalMode,
    selectedItem,
    setActiveListId,
    openModal,
    closeModal,
    createList,
    renameActiveList,
    deleteActiveList,
    addItem,
    editItem,
    deleteItem,
    toggleComplete,
    addSuggestion,
  }
}

export type UseShoppingListsReturn = ReturnType<typeof useShoppingLists>
