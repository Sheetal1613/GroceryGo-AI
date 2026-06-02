export type ScanPhase = 'idle' | 'ready' | 'scanning' | 'complete' | 'error'

export type ScanStep = 'uploading' | 'detecting' | 'parsing' | 'done'

export type ReceiptLineItem = {
  id: string
  name: string
  quantity: number
  unitPrice: number
  category: string
}

export type ReceiptDraft = {
  fileName: string
  imageUrl: string | null
  storeName: string
  receiptDate: string
  lineItems: ReceiptLineItem[]
  subtotal: number
  tax: number
  total: number
}

export type ReceiptHistoryEntry = {
  id: string
  storeName: string
  date: string
  total: number
  itemCount: number
  imageUrl: string | null
  lineItems: ReceiptLineItem[]
  savedAt: string
}

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'
