import { Check, Loader2, PackagePlus, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import type { SaveStatus } from '../types'
import styles from './SaveToInventoryBar.module.css'

type SaveToInventoryBarProps = {
  itemCount: number
  total: number
  saveStatus: SaveStatus
  onSave: () => void
  onReset: () => void
  formatCurrency: (n: number) => string
}

export function SaveToInventoryBar({
  itemCount,
  total,
  saveStatus,
  onSave,
  onReset,
  formatCurrency,
}: SaveToInventoryBarProps) {
  const isSaving = saveStatus === 'saving'
  const isSaved = saveStatus === 'saved'

  return (
    <div className={cn(styles.bar, isSaved && styles.barSaved)}>
      <div className={styles.info}>
        {isSaved ? (
          <>
            <Check size={20} className={styles.successIcon} aria-hidden />
            <div>
              <p className={styles.title}>Saved to inventory</p>
              <p className={styles.subtitle}>
                {itemCount} items · {formatCurrency(total)}
              </p>
            </div>
          </>
        ) : (
          <div>
            <p className={styles.title}>Ready to save</p>
            <p className={styles.subtitle}>
              {itemCount} items will be added · {formatCurrency(total)}
            </p>
          </div>
        )}
      </div>
      <div className={styles.actions}>
        <Button variant="ghost" onClick={onReset} disabled={isSaving}>
          <RotateCcw size={16} aria-hidden />
          Scan another
        </Button>
        <Button onClick={onSave} disabled={isSaving || isSaved || itemCount === 0}>
          {isSaving ? (
            <>
              <Loader2 size={16} className={styles.spinner} aria-hidden />
              Saving…
            </>
          ) : isSaved ? (
            <>
              <Check size={16} aria-hidden />
              Saved
            </>
          ) : (
            <>
              <PackagePlus size={16} aria-hidden />
              Save to inventory
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
