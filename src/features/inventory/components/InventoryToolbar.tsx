import { Plus, Search, X } from 'lucide-react'
import { FilterBar, FilterGroup } from '@/components/data-display/FilterBar'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import {
  INVENTORY_CATEGORIES,
  type CategoryFilter,
  type ExpiryFilter,
  type StockFilter,
} from '../types'
import styles from './InventoryToolbar.module.css'

type InventoryToolbarProps = {
  search: string
  category: CategoryFilter
  expiry: ExpiryFilter
  stock: StockFilter
  hasActiveFilters: boolean
  onSearchChange: (value: string) => void
  onCategoryChange: (value: CategoryFilter) => void
  onExpiryChange: (value: ExpiryFilter) => void
  onStockChange: (value: StockFilter) => void
  onClearFilters: () => void
  onAddItem: () => void
  loading?: boolean
}

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All categories' },
  ...INVENTORY_CATEGORIES.map((c) => ({ value: c, label: c })),
]

const EXPIRY_OPTIONS = [
  { value: 'all', label: 'All expiry' },
  { value: 'safe', label: 'Safe' },
  { value: 'expiring_soon', label: 'Expiring Soon' },
  { value: 'critical', label: 'Critical' },
  { value: 'expired', label: 'Expired' },
]

const STOCK_OPTIONS = [
  { value: 'all', label: 'All stock' },
  { value: 'healthy', label: 'Healthy Stock' },
  { value: 'low', label: 'Low Stock' },
  { value: 'out', label: 'Out of Stock' },
]

export function InventoryToolbar({
  search,
  category,
  expiry,
  stock,
  hasActiveFilters,
  onSearchChange,
  onCategoryChange,
  onExpiryChange,
  onStockChange,
  onClearFilters,
  onAddItem,
  loading = false,
}: InventoryToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.searchRow}>
        <div className={styles.searchWrap}>
          <Search size={16} className={styles.searchIcon} aria-hidden />
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Search products…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            disabled={loading}
            aria-label="Search inventory"
          />
        </div>
        <Button onClick={onAddItem} disabled={loading}>
          <Plus size={16} aria-hidden />
          Add Item
        </Button>
      </div>

      <FilterBar>
        <FilterGroup label="Category">
          <Select
            options={CATEGORY_OPTIONS}
            value={category}
            onChange={(e) =>
              onCategoryChange(e.target.value as CategoryFilter)
            }
            disabled={loading}
            aria-label="Filter by category"
          />
        </FilterGroup>
        <FilterGroup label="Expiry">
          <Select
            options={EXPIRY_OPTIONS}
            value={expiry}
            onChange={(e) => onExpiryChange(e.target.value as ExpiryFilter)}
            disabled={loading}
            aria-label="Filter by expiry"
          />
        </FilterGroup>
        <FilterGroup label="Stock">
          <Select
            options={STOCK_OPTIONS}
            value={stock}
            onChange={(e) => onStockChange(e.target.value as StockFilter)}
            disabled={loading}
            aria-label="Filter by stock status"
          />
        </FilterGroup>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className={styles.clearBtn}
          >
            <X size={14} aria-hidden />
            Clear filters
          </Button>
        )}
      </FilterBar>
    </div>
  )
}
