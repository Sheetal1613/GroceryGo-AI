import { PageHeader } from '@/components/layout/PageHeader'
import { DeleteItemDialog } from '@/features/inventory/components/DeleteItemDialog'
import { InventorySkeleton } from '@/features/inventory/components/InventorySkeleton'
import { InventoryStats } from '@/features/inventory/components/InventoryStats'
import { InventoryTable } from '@/features/inventory/components/InventoryTable'
import { InventoryToolbar } from '@/features/inventory/components/InventoryToolbar'
import { ItemFormDialog } from '@/features/inventory/components/ItemFormDialog'
import { useInventory } from '@/features/inventory/hooks/use-inventory'
import styles from '@/features/inventory/Inventory.module.css'

export default function InventoryPage() {
  const inv = useInventory()

  if (inv.isLoading) {
    return <InventorySkeleton />
  }

  if (inv.error) {
    return (
      <div className={styles.page}>
        <PageHeader title="Inventory" description="Unable to load inventory." />
        <div className={styles.errorCard}>
          <p>{inv.error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <PageHeader
        title="Inventory"
        description="Manage pantry items, stock levels, and expiry dates."
      />

      <InventoryStats
        total={inv.stats.total}
        lowStock={inv.stats.lowStock}
        outOfStock={inv.stats.outOfStock}
        expiringSoon={inv.stats.expiringSoon}
      />

      <InventoryToolbar
        search={inv.filters.search}
        category={inv.filters.category}
        expiry={inv.filters.expiry}
        stock={inv.filters.stock}
        hasActiveFilters={inv.hasActiveFilters}
        onSearchChange={inv.updateSearch}
        onCategoryChange={inv.updateCategory}
        onExpiryChange={inv.updateExpiry}
        onStockChange={inv.updateStock}
        onClearFilters={inv.clearFilters}
        onAddItem={inv.openAdd}
      />

      <InventoryTable
        items={inv.items}
        sortField={inv.sortField}
        sortDirection={inv.sortDirection}
        page={inv.page}
        pageSize={inv.pageSize}
        totalItems={inv.totalItems}
        hasActiveFilters={inv.hasActiveFilters}
        onSort={inv.toggleSort}
        onPageChange={inv.setPage}
        onEdit={inv.openEdit}
        onDelete={inv.openDelete}
        onAddItem={inv.openAdd}
        onClearFilters={inv.clearFilters}
      />

      <ItemFormDialog
        open={inv.modalMode === 'add' || inv.modalMode === 'edit'}
        mode={inv.modalMode === 'edit' ? 'edit' : 'add'}
        item={inv.selectedItem}
        onClose={inv.closeModal}
        onSubmit={(data) => {
          if (inv.modalMode === 'edit' && inv.selectedItem) {
            inv.updateItem(inv.selectedItem.id, data)
          } else {
            inv.addItem(data)
          }
        }}
      />

      <DeleteItemDialog
        open={inv.modalMode === 'delete'}
        item={inv.selectedItem}
        onClose={inv.closeModal}
        onConfirm={() => {
          if (inv.selectedItem) inv.deleteItem(inv.selectedItem.id)
        }}
      />
    </div>
  )
}
