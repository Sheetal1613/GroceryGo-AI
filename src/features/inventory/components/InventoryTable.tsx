import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Package,
  Pencil,
  Trash2,
} from 'lucide-react'
import { EmptyState } from '@/components/data-display/EmptyState'
import { Pagination } from '@/components/data-display/Pagination'
import { Skeleton } from '@/components/feedback/LoadingSkeleton'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'
import { formatDisplayDate } from '../lib/inventory-utils'
import type {
  InventoryItemWithStatus,
  SortDirection,
  SortField,
} from '../types'
import { ExpiryBadge } from './ExpiryBadge'
import { QuantityIndicator } from './QuantityIndicator'
import { StockBadge } from './StockBadge'
import styles from './InventoryTable.module.css'

type InventoryTableProps = {
  items: InventoryItemWithStatus[]
  sortField: SortField
  sortDirection: SortDirection
  page: number
  pageSize: number
  totalItems: number
  loading?: boolean
  hasActiveFilters?: boolean
  onSort: (field: SortField) => void
  onPageChange: (page: number) => void
  onEdit: (item: InventoryItemWithStatus) => void
  onDelete: (item: InventoryItemWithStatus) => void
  onAddItem: () => void
  onClearFilters: () => void
}

function SortIcon({
  field,
  sortField,
  sortDirection,
}: {
  field: SortField
  sortField: SortField
  sortDirection: SortDirection
}) {
  if (sortField !== field) {
    return <ArrowUpDown size={14} className={styles.sortIdle} aria-hidden />
  }
  return sortDirection === 'asc' ? (
    <ArrowUp size={14} aria-hidden />
  ) : (
    <ArrowDown size={14} aria-hidden />
  )
}

export function InventoryTable({
  items,
  sortField,
  sortDirection,
  page,
  pageSize,
  totalItems,
  loading = false,
  hasActiveFilters = false,
  onSort,
  onPageChange,
  onEdit,
  onDelete,
  onAddItem,
  onClearFilters,
}: InventoryTableProps) {
  if (loading) {
    return (
      <Card padding="none" className={styles.card}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {['Product', 'Category', 'Quantity', 'Purchased', 'Expires', 'Status', ''].map(
                  (h) => (
                    <th key={h}>{h}</th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 8 }).map((_, i) => (
                <tr key={i}>
                  {Array.from({ length: 7 }).map((__, j) => (
                    <td key={j}>
                      <Skeleton />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    )
  }

  if (totalItems === 0) {
    return (
      <Card>
        <EmptyState
          icon={Package}
          title={hasActiveFilters ? 'No matching items' : 'No inventory yet'}
          description={
            hasActiveFilters
              ? 'Try adjusting your search or filters to find what you need.'
              : 'Add your first grocery item to start tracking stock and expiry dates.'
          }
          action={
            hasActiveFilters ? (
              <Button variant="secondary" onClick={onClearFilters}>
                Clear filters
              </Button>
            ) : (
              <Button onClick={onAddItem}>Add your first item</Button>
            )
          }
        />
      </Card>
    )
  }

  return (
    <Card padding="none" className={styles.card}>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <button
                  type="button"
                  className={styles.sortBtn}
                  onClick={() => onSort('name')}
                >
                  Product Name
                  <SortIcon
                    field="name"
                    sortField={sortField}
                    sortDirection={sortDirection}
                  />
                </button>
              </th>
              <th>Category</th>
              <th>
                <button
                  type="button"
                  className={styles.sortBtn}
                  onClick={() => onSort('quantity')}
                >
                  Quantity
                  <SortIcon
                    field="quantity"
                    sortField={sortField}
                    sortDirection={sortDirection}
                  />
                </button>
              </th>
              <th className={styles.hideMobile}>Purchased</th>
              <th>
                <button
                  type="button"
                  className={styles.sortBtn}
                  onClick={() => onSort('expiryDate')}
                >
                  Expiry Date
                  <SortIcon
                    field="expiryDate"
                    sortField={sortField}
                    sortDirection={sortDirection}
                  />
                </button>
              </th>
              <th>Status</th>
              <th className={styles.actionsCol}>
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <span className={styles.productName}>{item.name}</span>
                </td>
                <td>
                  <span className={styles.category}>{item.category}</span>
                </td>
                <td>
                  <QuantityIndicator
                    quantity={item.quantity}
                    unit={item.unit}
                    stockStatus={item.stockStatus}
                  />
                </td>
                <td className={styles.hideMobile}>
                  {formatDisplayDate(item.purchaseDate)}
                </td>
                <td>{formatDisplayDate(item.expiryDate)}</td>
                <td>
                  <div className={styles.statusCell}>
                    <ExpiryBadge status={item.expiryStatus} />
                    <StockBadge status={item.stockStatus} />
                  </div>
                </td>
                <td className={styles.actionsCol}>
                  <div className={styles.actions}>
                    <button
                      type="button"
                      className={styles.actionBtn}
                      onClick={() => onEdit(item)}
                      aria-label={`Edit ${item.name}`}
                    >
                      <Pencil size={16} aria-hidden />
                    </button>
                    <button
                      type="button"
                      className={cn(styles.actionBtn, styles.deleteBtn)}
                      onClick={() => onDelete(item)}
                      aria-label={`Delete ${item.name}`}
                    >
                      <Trash2 size={16} aria-hidden />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.mobileList}>
        {items.map((item) => (
          <article key={item.id} className={styles.mobileCard}>
            <div className={styles.mobileHeader}>
              <h3 className={styles.productName}>{item.name}</h3>
              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.actionBtn}
                  onClick={() => onEdit(item)}
                  aria-label={`Edit ${item.name}`}
                >
                  <Pencil size={16} aria-hidden />
                </button>
                <button
                  type="button"
                  className={cn(styles.actionBtn, styles.deleteBtn)}
                  onClick={() => onDelete(item)}
                  aria-label={`Delete ${item.name}`}
                >
                  <Trash2 size={16} aria-hidden />
                </button>
              </div>
            </div>
            <p className={styles.category}>{item.category}</p>
            <QuantityIndicator
              quantity={item.quantity}
              unit={item.unit}
              stockStatus={item.stockStatus}
            />
            <dl className={styles.mobileMeta}>
              <div>
                <dt>Purchased</dt>
                <dd>{formatDisplayDate(item.purchaseDate)}</dd>
              </div>
              <div>
                <dt>Expires</dt>
                <dd>{formatDisplayDate(item.expiryDate)}</dd>
              </div>
            </dl>
            <div className={styles.statusCell}>
              <ExpiryBadge status={item.expiryStatus} />
              <StockBadge status={item.stockStatus} />
            </div>
          </article>
        ))}
      </div>

      <div className={styles.paginationWrap}>
        <Pagination
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={onPageChange}
        />
      </div>
    </Card>
  )
}
