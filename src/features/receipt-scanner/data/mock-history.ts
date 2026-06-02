import type { ReceiptHistoryEntry } from '../types'
import { MOCK_OCR_TRADER_JOES, MOCK_OCR_WHOLE_FOODS } from './mock-ocr'

function daysAgo(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d.toISOString()
}

export const MOCK_RECEIPT_HISTORY: ReceiptHistoryEntry[] = [
  {
    id: 'rcpt-001',
    storeName: MOCK_OCR_WHOLE_FOODS.storeName,
    date: '2026-05-28',
    total: MOCK_OCR_WHOLE_FOODS.total,
    itemCount: MOCK_OCR_WHOLE_FOODS.lineItems.length,
    imageUrl: null,
    lineItems: MOCK_OCR_WHOLE_FOODS.lineItems.map((i) => ({ ...i })),
    savedAt: daysAgo(5),
  },
  {
    id: 'rcpt-002',
    storeName: "Trader Joe's",
    date: '2026-05-24',
    total: MOCK_OCR_TRADER_JOES.total,
    itemCount: MOCK_OCR_TRADER_JOES.lineItems.length,
    imageUrl: null,
    lineItems: MOCK_OCR_TRADER_JOES.lineItems.map((i) => ({ ...i })),
    savedAt: daysAgo(9),
  },
  {
    id: 'rcpt-003',
    storeName: 'Kroger',
    date: '2026-05-18',
    total: 42.15,
    itemCount: 8,
    imageUrl: null,
    lineItems: [
      {
        id: 'k1',
        name: 'Ground Beef 85% 1lb',
        quantity: 2,
        unitPrice: 6.49,
        category: 'Meat & Seafood',
      },
      {
        id: 'k2',
        name: 'Whole Wheat Bread',
        quantity: 1,
        unitPrice: 3.29,
        category: 'Bakery',
      },
      {
        id: 'k3',
        name: 'Shredded Cheddar 8oz',
        quantity: 1,
        unitPrice: 4.19,
        category: 'Dairy & Eggs',
      },
    ],
    savedAt: daysAgo(15),
  },
]
