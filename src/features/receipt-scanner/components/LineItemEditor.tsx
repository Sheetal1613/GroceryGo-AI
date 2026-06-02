import { Plus, Receipt, Trash2 } from 'lucide-react'
import { EmptyState } from '@/components/data-display/EmptyState'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { INVENTORY_CATEGORIES } from '@/features/inventory/types'
import { formatCurrency } from '../lib/receipt-utils'
import type { ReceiptDraft, ReceiptLineItem } from '../types'
import styles from './LineItemEditor.module.css'

const CATEGORY_OPTIONS = INVENTORY_CATEGORIES.map((c) => ({
  value: c,
  label: c,
}))

type LineItemEditorProps = {
  draft: ReceiptDraft
  onUpdateItem: (id: string, patch: Partial<ReceiptLineItem>) => void
  onDeleteItem: (id: string) => void
  onAddItem: () => void
  onUpdateMeta: (patch: Partial<Pick<ReceiptDraft, 'storeName' | 'receiptDate'>>) => void
}

export function LineItemEditor({
  draft,
  onUpdateItem,
  onDeleteItem,
  onAddItem,
  onUpdateMeta,
}: LineItemEditorProps) {
  if (draft.lineItems.length === 0) {
    return (
      <Card>
        <EmptyState
          compact
          icon={Receipt}
          title="No line items"
          description="Add items manually or rescan the receipt."
          action={<Button onClick={onAddItem}>Add line item</Button>}
        />
      </Card>
    )
  }

  return (
    <Card padding="none" className={styles.card}>
      <div className={styles.metaSection}>
        <CardHeader
          title="Extracted items"
          description="Review and edit before saving to inventory"
        />
        <div className={styles.metaFields}>
          <Input
            label="Store"
            value={draft.storeName}
            onChange={(e) => onUpdateMeta({ storeName: e.target.value })}
          />
          <Input
            label="Receipt date"
            type="date"
            value={draft.receiptDate}
            onChange={(e) => onUpdateMeta({ receiptDate: e.target.value })}
          />
        </div>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th className={styles.numCol}>Qty</th>
              <th className={styles.numCol}>Unit price</th>
              <th className={styles.numCol}>Line total</th>
              <th className={styles.actionCol}>
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {draft.lineItems.map((item) => {
              const lineTotal = item.quantity * item.unitPrice
              return (
                <tr key={item.id}>
                  <td>
                    <input
                      type="text"
                      className={styles.cellInput}
                      value={item.name}
                      onChange={(e) =>
                        onUpdateItem(item.id, { name: e.target.value })
                      }
                      aria-label="Item name"
                    />
                  </td>
                  <td>
                    <select
                      className={styles.cellSelect}
                      value={item.category}
                      onChange={(e) =>
                        onUpdateItem(item.id, {
                          category: e.target
                            .value as ReceiptLineItem['category'],
                        })
                      }
                      aria-label="Category"
                    >
                      {CATEGORY_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className={styles.numCol}>
                    <input
                      type="number"
                      min={0}
                      step={1}
                      className={styles.cellInputNum}
                      value={item.quantity}
                      onChange={(e) =>
                        onUpdateItem(item.id, {
                          quantity: Math.max(0, Number(e.target.value)),
                        })
                      }
                      aria-label="Quantity"
                    />
                  </td>
                  <td className={styles.numCol}>
                    <input
                      type="number"
                      min={0}
                      step={0.01}
                      className={styles.cellInputNum}
                      value={item.unitPrice}
                      onChange={(e) =>
                        onUpdateItem(item.id, {
                          unitPrice: Math.max(0, Number(e.target.value)),
                        })
                      }
                      aria-label="Unit price"
                    />
                  </td>
                  <td className={styles.numCol}>
                    <span className={styles.lineTotal}>
                      {formatCurrency(lineTotal)}
                    </span>
                  </td>
                  <td className={styles.actionCol}>
                    <button
                      type="button"
                      className={styles.deleteBtn}
                      onClick={() => onDeleteItem(item.id)}
                      aria-label={`Delete ${item.name}`}
                    >
                      <Trash2 size={16} aria-hidden />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className={styles.mobileList}>
        {draft.lineItems.map((item) => {
          const lineTotal = item.quantity * item.unitPrice
          return (
            <article key={item.id} className={styles.mobileCard}>
              <input
                type="text"
                className={styles.cellInput}
                value={item.name}
                onChange={(e) =>
                  onUpdateItem(item.id, { name: e.target.value })
                }
              />
              <Select
                label="Category"
                options={CATEGORY_OPTIONS}
                value={item.category}
                onChange={(e) =>
                  onUpdateItem(item.id, { category: e.target.value })
                }
              />
              <div className={styles.mobileRow}>
                <Input
                  label="Qty"
                  type="number"
                  min={0}
                  value={String(item.quantity)}
                  onChange={(e) =>
                    onUpdateItem(item.id, {
                      quantity: Math.max(0, Number(e.target.value)),
                    })
                  }
                />
                <Input
                  label="Unit price"
                  type="number"
                  min={0}
                  step={0.01}
                  value={String(item.unitPrice)}
                  onChange={(e) =>
                    onUpdateItem(item.id, {
                      unitPrice: Math.max(0, Number(e.target.value)),
                    })
                  }
                />
              </div>
              <div className={styles.mobileFooter}>
                <span className={styles.lineTotal}>
                  {formatCurrency(lineTotal)}
                </span>
                <button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={() => onDeleteItem(item.id)}
                  aria-label={`Delete ${item.name}`}
                >
                  <Trash2 size={16} aria-hidden />
                </button>
              </div>
            </article>
          )
        })}
      </div>

      <div className={styles.tableFooter}>
        <Button variant="secondary" size="sm" onClick={onAddItem}>
          <Plus size={16} aria-hidden />
          Add line item
        </Button>
        <dl className={styles.totals}>
          <div>
            <dt>Subtotal</dt>
            <dd>{formatCurrency(draft.subtotal)}</dd>
          </div>
          <div>
            <dt>Tax (est.)</dt>
            <dd>{formatCurrency(draft.tax)}</dd>
          </div>
          <div className={styles.totalRow}>
            <dt>Total</dt>
            <dd>{formatCurrency(draft.total)}</dd>
          </div>
        </dl>
      </div>
    </Card>
  )
}
