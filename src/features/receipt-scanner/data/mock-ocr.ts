import type { ReceiptLineItem } from '../types'

export type MockOcrResult = {
  storeName: string
  receiptDate: string
  lineItems: ReceiptLineItem[]
  subtotal: number
  tax: number
  total: number
}

function line(
  id: string,
  name: string,
  quantity: number,
  unitPrice: number,
  category: string,
): ReceiptLineItem {
  return { id, name, quantity, unitPrice, category }
}

/** Whole Foods–style receipt */
export const MOCK_OCR_WHOLE_FOODS: MockOcrResult = {
  storeName: 'Whole Foods Market',
  receiptDate: new Date().toISOString().slice(0, 10),
  lineItems: [
    line('l1', 'Organic Whole Milk ½ gal', 1, 4.99, 'Dairy & Eggs'),
    line('l2', 'Large Brown Eggs 12ct', 1, 5.49, 'Dairy & Eggs'),
    line('l3', 'Organic Baby Spinach', 1, 3.99, 'Produce'),
    line('l4', 'Hass Avocados', 3, 1.49, 'Produce'),
    line('l5', 'Wild Atlantic Salmon', 1, 12.99, 'Meat & Seafood'),
    line('l6', 'Sourdough Boule', 1, 4.49, 'Bakery'),
    line('l7', 'Greek Yogurt Plain 32oz', 2, 5.29, 'Dairy & Eggs'),
    line('l8', 'Organic Bananas', 1, 2.19, 'Produce'),
    line('l9', 'Sparkling Water 12pk', 1, 5.99, 'Beverages'),
    line('l10', 'Dark Chocolate Bar 85%', 2, 3.49, 'Snacks'),
  ],
  subtotal: 58.67,
  tax: 4.69,
  total: 63.36,
}

/** Trader Joe's–style receipt (alternate mock) */
export const MOCK_OCR_TRADER_JOES: MockOcrResult = {
  storeName: "Trader Joe's",
  receiptDate: new Date().toISOString().slice(0, 10),
  lineItems: [
    line('t1', 'Mandarin Orange Chicken', 1, 5.49, 'Frozen'),
    line('t2', 'Everything But Bagel Seasoning', 1, 2.99, 'Pantry'),
    line('t3', 'Unexpected Cheddar', 1, 3.99, 'Dairy & Eggs'),
    line('t4', 'Hold the Cone! Mini Cones', 1, 3.99, 'Frozen'),
    line('t5', 'Organic Arugula', 1, 2.49, 'Produce'),
    line('t6', 'Sparkling Ginger Beer 4pk', 1, 4.49, 'Beverages'),
  ],
  subtotal: 23.44,
  tax: 1.88,
  total: 25.32,
}

export function pickMockOcr(fileName: string): MockOcrResult {
  const lower = fileName.toLowerCase()
  if (lower.includes('trader')) return MOCK_OCR_TRADER_JOES
  return MOCK_OCR_WHOLE_FOODS
}

export function recalculateTotals(items: ReceiptLineItem[]) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0,
  )
  const tax = Math.round(subtotal * 0.08 * 100) / 100
  const total = Math.round((subtotal + tax) * 100) / 100
  return { subtotal, tax, total }
}
