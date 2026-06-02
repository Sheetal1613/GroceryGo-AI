import { useCallback, useRef, useState } from 'react'
import { FileImage, Upload } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ACCEPTED_RECEIPT_TYPES } from '../lib/receipt-utils'
import styles from './UploadDropzone.module.css'

type UploadDropzoneProps = {
  onFileSelect: (file: File) => void
  disabled?: boolean
}

export function UploadDropzone({ onFileSelect, disabled = false }: UploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFiles = useCallback(
    (files: FileList | null) => {
      const file = files?.[0]
      if (file) onFileSelect(file)
    },
    [onFileSelect],
  )

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) setIsDragging(true)
  }

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (!disabled) handleFiles(e.dataTransfer.files)
  }

  return (
    <div
      className={cn(
        styles.zone,
        isDragging && styles.dragging,
        disabled && styles.disabled,
      )}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_RECEIPT_TYPES}
        className={styles.hiddenInput}
        onChange={(e) => handleFiles(e.target.files)}
        disabled={disabled}
        aria-label="Upload receipt image"
      />
      <div className={styles.iconWrap}>
        <Upload size={28} aria-hidden />
      </div>
      <p className={styles.title}>
        Drag & drop your receipt
      </p>
      <p className={styles.subtitle}>
        or{' '}
        <button
          type="button"
          className={styles.browseBtn}
          onClick={() => inputRef.current?.click()}
          disabled={disabled}
        >
          browse files
        </button>
      </p>
      <p className={styles.hint}>
        <FileImage size={14} aria-hidden />
        JPEG, PNG, WebP up to 10MB
      </p>
    </div>
  )
}
