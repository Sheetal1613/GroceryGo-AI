export function generateLineId(): string {
  return `line-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export function generateReceiptId(): string {
  return `rcpt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function formatReceiptDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diff / 86_400_000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  return formatReceiptDate(iso)
}

export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/') || /\.(jpe?g|png|webp|heic)$/i.test(file.name)
}

export const ACCEPTED_RECEIPT_TYPES = 'image/jpeg,image/png,image/webp,image/heic,.jpg,.jpeg,.png,.webp'
