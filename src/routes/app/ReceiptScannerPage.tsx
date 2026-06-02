import { useRef } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { CameraCapture } from '@/features/receipt-scanner/components/CameraCapture'
import { LineItemEditor } from '@/features/receipt-scanner/components/LineItemEditor'
import { ReceiptHistoryPanel } from '@/features/receipt-scanner/components/ReceiptHistoryPanel'
import { ReceiptPreview } from '@/features/receipt-scanner/components/ReceiptPreview'
import { ReceiptScannerSkeleton } from '@/features/receipt-scanner/components/ReceiptScannerSkeleton'
import { SaveToInventoryBar } from '@/features/receipt-scanner/components/SaveToInventoryBar'
import { ScanProgress } from '@/features/receipt-scanner/components/ScanProgress'
import { UploadDropzone } from '@/features/receipt-scanner/components/UploadDropzone'
import { useReceiptScanner } from '@/features/receipt-scanner/hooks/use-receipt-scanner'
import { ACCEPTED_RECEIPT_TYPES, formatCurrency } from '@/features/receipt-scanner/lib/receipt-utils'
import styles from '@/features/receipt-scanner/ReceiptScanner.module.css'

export default function ReceiptScannerPage() {
  const scanner = useReceiptScanner()
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (scanner.historyLoading) {
    return <ReceiptScannerSkeleton />
  }

  const isScanning = scanner.phase === 'scanning'
  const isReady = scanner.phase === 'ready'
  const isComplete = scanner.phase === 'complete'
  const isIdle = scanner.phase === 'idle' || scanner.phase === 'error'

  const renderMain = () => {
    if (scanner.phase === 'error' && scanner.errorMessage) {
      return (
        <div className={styles.errorBanner} role="alert">
          {scanner.errorMessage}
        </div>
      )
    }

    if (isIdle) {
      return (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_RECEIPT_TYPES}
            className={styles.hiddenFileInput}
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) scanner.setFile(file)
              e.target.value = ''
            }}
            aria-hidden
          />
          <div className={styles.uploadGrid}>
            <UploadDropzone onFileSelect={scanner.setFile} />
            <CameraCapture
              onUseFilePicker={() => fileInputRef.current?.click()}
            />
          </div>
        </>
      )
    }

    if (isReady && scanner.draft?.imageUrl) {
      return (
        <ReceiptPreview
          imageUrl={scanner.draft.imageUrl}
          fileName={scanner.draft.fileName}
          onScan={scanner.startScan}
          onReset={scanner.resetScan}
        />
      )
    }

    if (isScanning && scanner.draft) {
      return (
        <ScanProgress
          progress={scanner.scanProgress}
          currentStep={scanner.scanStep}
          statusLabel={scanner.scanLabel}
          imageUrl={scanner.draft.imageUrl}
        />
      )
    }

    if (isComplete && scanner.draft) {
      return (
        <div className={styles.completeLayout}>
          {scanner.draft.imageUrl && (
            <div className={styles.previewCompact}>
              <img
                src={scanner.draft.imageUrl}
                alt="Receipt"
                className={styles.compactImage}
              />
            </div>
          )}
          <LineItemEditor
            draft={scanner.draft}
            onUpdateItem={scanner.updateLineItem}
            onDeleteItem={scanner.deleteLineItem}
            onAddItem={scanner.addLineItem}
            onUpdateMeta={scanner.updateDraftMeta}
          />
          <SaveToInventoryBar
            itemCount={scanner.draft.lineItems.length}
            total={scanner.draft.total}
            saveStatus={scanner.saveStatus}
            onSave={scanner.saveToInventory}
            onReset={scanner.resetScan}
            formatCurrency={formatCurrency}
          />
        </div>
      )
    }

    return null
  }

  return (
    <div className={styles.page}>
      <PageHeader
        title="Receipt Scanner"
        description="Upload a receipt photo to extract items automatically. Review, edit, and save to inventory."
      />

      <div className={styles.layout}>
        <main className={styles.main}>{renderMain()}</main>
        <aside>
          <ReceiptHistoryPanel
            history={scanner.history}
            activeId={scanner.activeHistoryId}
            onSelect={scanner.loadFromHistory}
          />
        </aside>
      </div>
    </div>
  )
}
