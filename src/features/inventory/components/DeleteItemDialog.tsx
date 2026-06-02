import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import type { InventoryItem } from '../types'
import styles from './DeleteItemDialog.module.css'

type DeleteItemDialogProps = {
  open: boolean
  item: InventoryItem | null
  onClose: () => void
  onConfirm: () => void
}

export function DeleteItemDialog({
  open,
  item,
  onClose,
  onConfirm,
}: DeleteItemDialogProps) {
  if (!item) return null

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Delete item?"
      size="sm"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Delete
          </Button>
        </>
      }
    >
      <div className={styles.body}>
        <div className={styles.iconWrap}>
          <AlertTriangle size={22} aria-hidden />
        </div>
        <p className={styles.message}>
          Are you sure you want to remove <strong>{item.name}</strong> from your
          inventory? This action cannot be undone.
        </p>
      </div>
    </Modal>
  )
}
