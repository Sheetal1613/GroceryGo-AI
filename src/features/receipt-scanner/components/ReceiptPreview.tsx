import { RotateCcw, ScanLine, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader } from '@/components/ui/Card'
import styles from './ReceiptPreview.module.css'

type ReceiptPreviewProps = {
  imageUrl: string
  fileName: string
  onScan: () => void
  onReset: () => void
  scanning?: boolean
}

export function ReceiptPreview({
  imageUrl,
  fileName,
  onScan,
  onReset,
  scanning = false,
}: ReceiptPreviewProps) {
  return (
    <Card padding="none" className={styles.card}>
      <div className={styles.toolbar}>
        <CardHeader
          title="Receipt preview"
          description={fileName}
          className={styles.header}
        />
        <div className={styles.actions}>
          <Button variant="ghost" size="sm" onClick={onReset} disabled={scanning}>
            <X size={16} aria-hidden />
            Remove
          </Button>
          <Button onClick={onScan} disabled={scanning}>
            <ScanLine size={16} aria-hidden />
            {scanning ? 'Scanning…' : 'Scan receipt'}
          </Button>
        </div>
      </div>
      <div className={styles.imageWrap}>
        <img src={imageUrl} alt={`Receipt: ${fileName}`} className={styles.image} />
      </div>
      <div className={styles.footer}>
        <Button variant="ghost" size="sm" onClick={onReset} disabled={scanning}>
          <RotateCcw size={14} aria-hidden />
          Upload different image
        </Button>
      </div>
    </Card>
  )
}
