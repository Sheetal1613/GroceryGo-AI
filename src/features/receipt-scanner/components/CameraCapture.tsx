import { Camera } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import styles from './CameraCapture.module.css'

type CameraCaptureProps = {
  onUseFilePicker: () => void
  disabled?: boolean
}

export function CameraCapture({
  onUseFilePicker,
  disabled = false,
}: CameraCaptureProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Camera size={20} aria-hidden />
        <span className={styles.title}>Camera capture</span>
        <Badge variant="neutral">Coming soon</Badge>
      </div>
      <div className={styles.viewport}>
        <div className={styles.frame}>
          <Camera size={40} className={styles.placeholderIcon} aria-hidden />
          <p className={styles.placeholderText}>
            Point your camera at a receipt
          </p>
        </div>
      </div>
      <p className={styles.note}>
        Mobile camera scanning will be available in a future update. For now,
        upload a photo from your device.
      </p>
      <Button
        variant="secondary"
        className={styles.btn}
        onClick={onUseFilePicker}
        disabled={disabled}
      >
        Upload photo instead
      </Button>
    </div>
  )
}
