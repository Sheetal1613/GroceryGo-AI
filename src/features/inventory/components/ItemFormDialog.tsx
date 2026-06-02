import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { Select } from '@/components/ui/Select'
import {
  INVENTORY_CATEGORIES,
  type InventoryFormData,
  type InventoryItem,
} from '../types'
import styles from './ItemFormDialog.module.css'

const CATEGORY_OPTIONS = INVENTORY_CATEGORIES.map((c) => ({
  value: c,
  label: c,
}))

const UNIT_OPTIONS = [
  { value: 'units', label: 'units' },
  { value: 'carton', label: 'carton' },
  { value: 'cartons', label: 'cartons' },
  { value: 'bag', label: 'bag' },
  { value: 'bags', label: 'bags' },
  { value: 'lb', label: 'lb' },
  { value: 'lbs', label: 'lbs' },
  { value: 'bottle', label: 'bottle' },
  { value: 'box', label: 'box' },
  { value: 'boxes', label: 'boxes' },
  { value: 'can', label: 'can' },
  { value: 'cans', label: 'cans' },
  { value: 'loaf', label: 'loaf' },
  { value: 'tub', label: 'tub' },
  { value: 'tubs', label: 'tubs' },
  { value: 'jar', label: 'jar' },
  { value: 'pack', label: 'pack' },
  { value: 'packs', label: 'packs' },
]

function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

function emptyForm(): InventoryFormData {
  return {
    name: '',
    category: 'Produce',
    quantity: 1,
    unit: 'units',
    lowStockThreshold: 2,
    purchaseDate: todayIso(),
    expiryDate: '',
  }
}

function itemToForm(item: InventoryItem): InventoryFormData {
  return {
    name: item.name,
    category: item.category,
    quantity: item.quantity,
    unit: item.unit,
    lowStockThreshold: item.lowStockThreshold,
    purchaseDate: item.purchaseDate,
    expiryDate: item.expiryDate ?? '',
  }
}

type ItemFormDialogProps = {
  open: boolean
  mode: 'add' | 'edit'
  item: InventoryItem | null
  onClose: () => void
  onSubmit: (data: InventoryFormData) => void
}

export function ItemFormDialog({
  open,
  mode,
  item,
  onClose,
  onSubmit,
}: ItemFormDialogProps) {
  const [form, setForm] = useState<InventoryFormData>(emptyForm)
  const [errors, setErrors] = useState<Partial<Record<keyof InventoryFormData, string>>>({})

  useEffect(() => {
    if (!open) return
    setForm(item ? itemToForm(item) : emptyForm())
    setErrors({})
  }, [open, item])

  const validate = (): boolean => {
    const next: Partial<Record<keyof InventoryFormData, string>> = {}
    if (!form.name.trim()) next.name = 'Product name is required'
    if (form.quantity < 0) next.quantity = 'Quantity cannot be negative'
    if (form.lowStockThreshold < 0) {
      next.lowStockThreshold = 'Threshold cannot be negative'
    }
    if (!form.purchaseDate) next.purchaseDate = 'Purchase date is required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit(form)
  }

  const update = <K extends keyof InventoryFormData>(
    key: K,
    value: InventoryFormData[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) {
      setErrors((prev) => {
        const copy = { ...prev }
        delete copy[key]
        return copy
      })
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={mode === 'add' ? 'Add Item' : 'Edit Item'}
      description={
        mode === 'add'
          ? 'Add a new product to your household inventory.'
          : `Update details for ${item?.name ?? 'this item'}.`
      }
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="inventory-item-form">
            {mode === 'add' ? 'Add Item' : 'Save Changes'}
          </Button>
        </>
      }
    >
      <form id="inventory-item-form" className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="Product Name"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          placeholder="e.g. Organic Whole Milk"
          error={errors.name}
          required
        />
        <div className={styles.row}>
          <Select
            label="Category"
            options={CATEGORY_OPTIONS}
            value={form.category}
            onChange={(e) =>
              update('category', e.target.value as InventoryFormData['category'])
            }
          />
          <Select
            label="Unit"
            options={UNIT_OPTIONS}
            value={form.unit}
            onChange={(e) => update('unit', e.target.value)}
          />
        </div>
        <div className={styles.row}>
          <Input
            label="Quantity"
            type="number"
            min={0}
            step={1}
            value={String(form.quantity)}
            onChange={(e) => update('quantity', Number(e.target.value))}
            error={errors.quantity}
          />
          <Input
            label="Low Stock Threshold"
            type="number"
            min={0}
            step={1}
            value={String(form.lowStockThreshold)}
            onChange={(e) =>
              update('lowStockThreshold', Number(e.target.value))
            }
            error={errors.lowStockThreshold}
          />
        </div>
        <div className={styles.row}>
          <Input
            label="Purchase Date"
            type="date"
            value={form.purchaseDate}
            onChange={(e) => update('purchaseDate', e.target.value)}
            error={errors.purchaseDate}
          />
          <Input
            label="Expiry Date"
            type="date"
            value={form.expiryDate}
            onChange={(e) => update('expiryDate', e.target.value)}
          />
        </div>
        <p className={styles.hint}>
          Leave expiry blank for non-perishable items (e.g. beverages).
        </p>
      </form>
    </Modal>
  )
}
