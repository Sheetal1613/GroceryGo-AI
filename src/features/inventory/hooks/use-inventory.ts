import { useCallback, useEffect, useMemo, useState } from 'react'
import { MOCK_INVENTORY_ITEMS } from '../data/mock-inventory'
import {
  enrichItems,
  generateId,
  sortItems,
} from '../lib/inventory-utils'
import type {
  CategoryFilter,
  ExpiryFilter,
  InventoryFilters,
  InventoryFormData,
  InventoryItem,
  InventoryItemWithStatus,
  ModalMode,
  SortDirection,
  SortField,
  StockFilter,
} from '../types'

const LOAD_DELAY_MS = 700
const DEFAULT_PAGE_SIZE = 10

type UseInventoryOptions = {
  simulateEmpty?: boolean
}

export function useInventory(options: UseInventoryOptions = {}) {
  const { simulateEmpty = false } = options

  const [items, setItems] = useState<InventoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<CategoryFilter>('all')
  const [expiry, setExpiry] = useState<ExpiryFilter>('all')
  const [stock, setStock] = useState<StockFilter>('all')
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [page, setPage] = useState(1)
  const [pageSize] = useState(DEFAULT_PAGE_SIZE)

  const [modalMode, setModalMode] = useState<ModalMode>(null)
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)
    setError(null)

    const timer = window.setTimeout(() => {
      if (cancelled) return
      setItems(simulateEmpty ? [] : [...MOCK_INVENTORY_ITEMS])
      setIsLoading(false)
    }, LOAD_DELAY_MS)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [simulateEmpty])

  const enriched = useMemo(() => enrichItems(items), [items])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return enriched.filter((item) => {
      if (q && !item.name.toLowerCase().includes(q)) return false
      if (category !== 'all' && item.category !== category) return false
      if (expiry !== 'all' && item.expiryStatus !== expiry) return false
      if (stock !== 'all' && item.stockStatus !== stock) return false
      return true
    })
  }, [enriched, search, category, expiry, stock])

  const sorted = useMemo(
    () => sortItems(filtered, sortField, sortDirection),
    [filtered, sortField, sortDirection],
  )

  const totalItems = sorted.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))

  const paginatedItems = useMemo(() => {
    const safePage = Math.min(page, totalPages)
    const start = (safePage - 1) * pageSize
    return sorted.slice(start, start + pageSize)
  }, [sorted, page, pageSize, totalPages])

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])

  const resetPage = useCallback(() => setPage(1), [])

  const updateSearch = useCallback((value: string) => {
    setSearch(value)
    setPage(1)
  }, [])

  const updateCategory = useCallback((value: CategoryFilter) => {
    setCategory(value)
    setPage(1)
  }, [])

  const updateExpiry = useCallback((value: ExpiryFilter) => {
    setExpiry(value)
    setPage(1)
  }, [])

  const updateStock = useCallback((value: StockFilter) => {
    setStock(value)
    setPage(1)
  }, [])

  const toggleSort = useCallback((field: SortField) => {
    setSortField((prev) => {
      if (prev === field) {
        setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'))
        return prev
      }
      setSortDirection('asc')
      return field
    })
    setPage(1)
  }, [])

  const openAdd = useCallback(() => {
    setSelectedItem(null)
    setModalMode('add')
  }, [])

  const openEdit = useCallback((item: InventoryItem) => {
    setSelectedItem(item)
    setModalMode('edit')
  }, [])

  const openDelete = useCallback((item: InventoryItem) => {
    setSelectedItem(item)
    setModalMode('delete')
  }, [])

  const closeModal = useCallback(() => {
    setModalMode(null)
    setSelectedItem(null)
  }, [])

  const addItem = useCallback((data: InventoryFormData) => {
    const newItem: InventoryItem = {
      id: generateId(),
      name: data.name.trim(),
      category: data.category,
      quantity: data.quantity,
      unit: data.unit.trim(),
      lowStockThreshold: data.lowStockThreshold,
      purchaseDate: data.purchaseDate,
      expiryDate: data.expiryDate || null,
    }
    setItems((prev) => [newItem, ...prev])
    closeModal()
    setPage(1)
  }, [closeModal])

  const updateItem = useCallback(
    (id: string, data: InventoryFormData) => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                name: data.name.trim(),
                category: data.category,
                quantity: data.quantity,
                unit: data.unit.trim(),
                lowStockThreshold: data.lowStockThreshold,
                purchaseDate: data.purchaseDate,
                expiryDate: data.expiryDate || null,
              }
            : item,
        ),
      )
      closeModal()
    },
    [closeModal],
  )

  const deleteItem = useCallback(
    (id: string) => {
      setItems((prev) => prev.filter((item) => item.id !== id))
      closeModal()
    },
    [closeModal],
  )

  const clearFilters = useCallback(() => {
    setSearch('')
    setCategory('all')
    setExpiry('all')
    setStock('all')
    setPage(1)
  }, [])

  const filters: InventoryFilters = { search, category, expiry, stock }
  const hasActiveFilters =
    search.trim() !== '' ||
    category !== 'all' ||
    expiry !== 'all' ||
    stock !== 'all'

  const stats = useMemo(() => {
    const all = enrichItems(items)
    return {
      total: all.length,
      lowStock: all.filter((i) => i.stockStatus === 'low').length,
      outOfStock: all.filter((i) => i.stockStatus === 'out').length,
      expiringSoon: all.filter(
        (i) => i.expiryStatus === 'expiring_soon' || i.expiryStatus === 'critical',
      ).length,
    }
  }, [items])

  return {
    items: paginatedItems,
    allItems: enriched,
    isLoading,
    error,
    filters,
    hasActiveFilters,
    sortField,
    sortDirection,
    page,
    pageSize,
    totalItems,
    totalPages,
    stats,
    modalMode,
    selectedItem,
    setPage,
    updateSearch,
    updateCategory,
    updateExpiry,
    updateStock,
    toggleSort,
    clearFilters,
    openAdd,
    openEdit,
    openDelete,
    closeModal,
    addItem,
    updateItem,
    deleteItem,
    resetPage,
  }
}

export type UseInventoryReturn = ReturnType<typeof useInventory>
