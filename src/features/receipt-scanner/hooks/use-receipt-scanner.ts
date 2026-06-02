import { useCallback, useEffect, useRef, useState } from 'react'
import { MOCK_RECEIPT_HISTORY } from '../data/mock-history'
import { pickMockOcr, recalculateTotals } from '../data/mock-ocr'
import { generateLineId, generateReceiptId, isImageFile } from '../lib/receipt-utils'
import type {
  ReceiptDraft,
  ReceiptHistoryEntry,
  ReceiptLineItem,
  SaveStatus,
  ScanPhase,
  ScanStep,
} from '../types'

const HISTORY_LOAD_MS = 500
const SCAN_DURATION_MS = 2800

const SCAN_STEPS: { step: ScanStep; progress: number; label: string }[] = [
  { step: 'uploading', progress: 15, label: 'Uploading image…' },
  { step: 'detecting', progress: 45, label: 'Detecting text regions…' },
  { step: 'parsing', progress: 78, label: 'Parsing line items…' },
  { step: 'done', progress: 100, label: 'Scan complete' },
]

type UseReceiptScannerOptions = {
  simulateEmptyHistory?: boolean
}

export function useReceiptScanner(options: UseReceiptScannerOptions = {}) {
  const { simulateEmptyHistory = false } = options

  const [history, setHistory] = useState<ReceiptHistoryEntry[]>([])
  const [historyLoading, setHistoryLoading] = useState(true)
  const [phase, setPhase] = useState<ScanPhase>('idle')
  const [scanStep, setScanStep] = useState<ScanStep>('uploading')
  const [scanProgress, setScanProgress] = useState(0)
  const [scanLabel, setScanLabel] = useState('')
  const [draft, setDraft] = useState<ReceiptDraft | null>(null)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [activeHistoryId, setActiveHistoryId] = useState<string | null>(null)

  const imageUrlRef = useRef<string | null>(null)
  const scanIntervalRef = useRef<number | null>(null)

  const clearScanInterval = useCallback(() => {
    if (scanIntervalRef.current !== null) {
      window.clearInterval(scanIntervalRef.current)
      scanIntervalRef.current = null
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    setHistoryLoading(true)
    const t = window.setTimeout(() => {
      if (!cancelled) {
        setHistory(simulateEmptyHistory ? [] : [...MOCK_RECEIPT_HISTORY])
        setHistoryLoading(false)
      }
    }, HISTORY_LOAD_MS)
    return () => {
      cancelled = true
      window.clearTimeout(t)
    }
  }, [simulateEmptyHistory])

  const revokeImageUrl = useCallback(() => {
    if (imageUrlRef.current) {
      URL.revokeObjectURL(imageUrlRef.current)
      imageUrlRef.current = null
    }
  }, [])

  useEffect(
    () => () => {
      clearScanInterval()
      revokeImageUrl()
    },
    [clearScanInterval, revokeImageUrl],
  )

  const setFile = useCallback(
    (file: File) => {
      if (!isImageFile(file)) {
        setErrorMessage('Please upload a JPEG, PNG, or WebP image.')
        setPhase('error')
        return
      }

      revokeImageUrl()
      const url = URL.createObjectURL(file)
      imageUrlRef.current = url

      setDraft({
        fileName: file.name,
        imageUrl: url,
        storeName: '',
        receiptDate: new Date().toISOString().slice(0, 10),
        lineItems: [],
        subtotal: 0,
        tax: 0,
        total: 0,
      })
      setPhase('ready')
      setActiveHistoryId(null)
      setErrorMessage(null)
      setSaveStatus('idle')
    },
    [revokeImageUrl],
  )

  const startScan = useCallback(() => {
    if (!draft?.imageUrl) return

    clearScanInterval()
    setPhase('scanning')
    setScanProgress(0)
    setScanStep('uploading')
    setScanLabel(SCAN_STEPS[0].label)

    const fileName = draft.fileName
    const imageUrl = draft.imageUrl
    const start = Date.now()

    scanIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - start
      const pct = Math.min(100, (elapsed / SCAN_DURATION_MS) * 100)
      setScanProgress(pct)

      const stepIndex = SCAN_STEPS.findIndex((s) => pct <= s.progress)
      const idx = stepIndex === -1 ? SCAN_STEPS.length - 1 : stepIndex
      setScanStep(SCAN_STEPS[idx].step)
      setScanLabel(SCAN_STEPS[idx].label)

      if (elapsed >= SCAN_DURATION_MS) {
        clearScanInterval()
        const ocr = pickMockOcr(fileName)
        const lineItems = ocr.lineItems.map((item) => ({
          ...item,
          id: generateLineId(),
        }))
        const totals = recalculateTotals(lineItems)

        setDraft({
          fileName,
          imageUrl,
          storeName: ocr.storeName,
          receiptDate: ocr.receiptDate,
          lineItems,
          ...totals,
        })
        setPhase('complete')
        setScanProgress(100)
        setScanStep('done')
        setScanLabel('Scan complete')
      }
    }, 50)
  }, [draft, clearScanInterval])

  const resetScan = useCallback(() => {
    clearScanInterval()
    revokeImageUrl()
    setDraft(null)
    setPhase('idle')
    setScanProgress(0)
    setActiveHistoryId(null)
    setErrorMessage(null)
    setSaveStatus('idle')
  }, [clearScanInterval, revokeImageUrl])

  const updateLineItem = useCallback(
    (id: string, patch: Partial<ReceiptLineItem>) => {
      setDraft((prev) => {
        if (!prev) return prev
        const lineItems = prev.lineItems.map((item) =>
          item.id === id ? { ...item, ...patch } : item,
        )
        const totals = recalculateTotals(lineItems)
        return { ...prev, lineItems, ...totals }
      })
    },
    [],
  )

  const deleteLineItem = useCallback((id: string) => {
    setDraft((prev) => {
      if (!prev) return prev
      const lineItems = prev.lineItems.filter((item) => item.id !== id)
      const totals = recalculateTotals(lineItems)
      return { ...prev, lineItems, ...totals }
    })
  }, [])

  const addLineItem = useCallback(() => {
    setDraft((prev) => {
      if (!prev) return prev
      const lineItems = [
        ...prev.lineItems,
        {
          id: generateLineId(),
          name: 'New item',
          quantity: 1,
          unitPrice: 0,
          category: 'Pantry',
        },
      ]
      const totals = recalculateTotals(lineItems)
      return { ...prev, lineItems, ...totals }
    })
  }, [])

  const updateDraftMeta = useCallback(
    (patch: Partial<Pick<ReceiptDraft, 'storeName' | 'receiptDate'>>) => {
      setDraft((prev) => (prev ? { ...prev, ...patch } : prev))
    },
    [],
  )

  const loadFromHistory = useCallback(
    (entry: ReceiptHistoryEntry) => {
      revokeImageUrl()
      setDraft({
        fileName: `${entry.storeName}-receipt.jpg`,
        imageUrl: entry.imageUrl,
        storeName: entry.storeName,
        receiptDate: entry.date,
        lineItems: entry.lineItems.map((i) => ({ ...i })),
        ...recalculateTotals(entry.lineItems),
      })
      setPhase('complete')
      setActiveHistoryId(entry.id)
      setSaveStatus('idle')
      setErrorMessage(null)
    },
    [revokeImageUrl],
  )

  const saveToInventory = useCallback(async () => {
    if (!draft || draft.lineItems.length === 0) return

    setSaveStatus('saving')
    await new Promise((r) => window.setTimeout(r, 1200))

    const entry: ReceiptHistoryEntry = {
      id: activeHistoryId ?? generateReceiptId(),
      storeName: draft.storeName,
      date: draft.receiptDate,
      total: draft.total,
      itemCount: draft.lineItems.length,
      imageUrl: draft.imageUrl,
      lineItems: draft.lineItems.map((i) => ({ ...i })),
      savedAt: new Date().toISOString(),
    }

    setHistory((prev) => {
      const exists = prev.some((h) => h.id === entry.id)
      if (exists) {
        return prev.map((h) => (h.id === entry.id ? entry : h))
      }
      return [entry, ...prev]
    })

    setSaveStatus('saved')
    setActiveHistoryId(entry.id)
  }, [draft, activeHistoryId])

  const getHistoryById = useCallback(
    (id: string) => history.find((h) => h.id === id),
    [history],
  )

  return {
    history,
    historyLoading,
    phase,
    scanStep,
    scanProgress,
    scanLabel,
    draft,
    saveStatus,
    errorMessage,
    activeHistoryId,
    setFile,
    startScan,
    resetScan,
    updateLineItem,
    deleteLineItem,
    addLineItem,
    updateDraftMeta,
    loadFromHistory,
    saveToInventory,
    getHistoryById,
  }
}
