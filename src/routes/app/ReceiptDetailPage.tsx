import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { LineItemEditor } from '@/features/receipt-scanner/components/LineItemEditor'
import { SaveToInventoryBar } from '@/features/receipt-scanner/components/SaveToInventoryBar'
import { MOCK_RECEIPT_HISTORY } from '@/features/receipt-scanner/data/mock-history'
import { recalculateTotals } from '@/features/receipt-scanner/data/mock-ocr'
import { formatCurrency } from '@/features/receipt-scanner/lib/receipt-utils'
import type { ReceiptDraft, ReceiptLineItem, SaveStatus } from '@/features/receipt-scanner/types'
import { ROUTES } from '@/lib/constants'
import styles from '@/features/receipt-scanner/ReceiptScanner.module.css'

export default function ReceiptDetailPage() {
  const { receiptId } = useParams<{ receiptId: string }>()
  const navigate = useNavigate()
  const entry = useMemo(
    () => MOCK_RECEIPT_HISTORY.find((h) => h.id === receiptId),
    [receiptId],
  )

  const [draft, setDraft] = useState<ReceiptDraft | null>(() => {
    if (!entry) return null
    const totals = recalculateTotals(entry.lineItems)
    return {
      fileName: `${entry.storeName}-receipt.jpg`,
      imageUrl: entry.imageUrl,
      storeName: entry.storeName,
      receiptDate: entry.date,
      lineItems: entry.lineItems.map((i) => ({ ...i })),
      ...totals,
    }
  })
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('saved')

  if (!entry || !draft) {
    return (
      <div className={styles.page}>
        <PageHeader title="Receipt not found" />
        <p style={{ color: 'var(--gg-text-secondary)' }}>
          This receipt may have been removed.
        </p>
        <Link to={ROUTES.receipts}>
          <Button variant="secondary">Back to scanner</Button>
        </Link>
      </div>
    )
  }

  const updateLineItem = (id: string, patch: Partial<ReceiptLineItem>) => {
    setDraft((prev) => {
      if (!prev) return prev
      const lineItems = prev.lineItems.map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      )
      return { ...prev, lineItems, ...recalculateTotals(lineItems) }
    })
    setSaveStatus('idle')
  }

  const deleteLineItem = (id: string) => {
    setDraft((prev) => {
      if (!prev) return prev
      const lineItems = prev.lineItems.filter((item) => item.id !== id)
      return { ...prev, lineItems, ...recalculateTotals(lineItems) }
    })
    setSaveStatus('idle')
  }

  const addLineItem = () => {
    setDraft((prev) => {
      if (!prev) return prev
      const lineItems = [
        ...prev.lineItems,
        {
          id: `line-${Date.now()}`,
          name: 'New item',
          quantity: 1,
          unitPrice: 0,
          category: 'Pantry' as const,
        },
      ]
      return { ...prev, lineItems, ...recalculateTotals(lineItems) }
    })
    setSaveStatus('idle')
  }

  const handleSave = async () => {
    setSaveStatus('saving')
    await new Promise((r) => window.setTimeout(r, 800))
    setSaveStatus('saved')
  }

  return (
    <div className={styles.page}>
      <PageHeader
        title={entry.storeName}
        description={`Receipt · ${entry.date} · ${entry.itemCount} items`}
        actions={
          <Button variant="secondary" onClick={() => navigate(ROUTES.receipts)}>
            <ArrowLeft size={16} aria-hidden />
            Back
          </Button>
        }
      />
      <div className={styles.completeLayout}>
        <LineItemEditor
          draft={draft}
          onUpdateItem={updateLineItem}
          onDeleteItem={deleteLineItem}
          onAddItem={addLineItem}
          onUpdateMeta={(patch) => {
            setDraft((prev) => (prev ? { ...prev, ...patch } : prev))
            setSaveStatus('idle')
          }}
        />
        <SaveToInventoryBar
          itemCount={draft.lineItems.length}
          total={draft.total}
          saveStatus={saveStatus}
          onSave={handleSave}
          onReset={() => navigate(ROUTES.receipts)}
          formatCurrency={formatCurrency}
        />
      </div>
    </div>
  )
}
