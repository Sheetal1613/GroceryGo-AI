import { useEffect } from 'react'
import { applyTheme, useUIStore } from '@/stores/ui-store'

/** Applies persisted theme to document on mount and when theme changes */
export function ThemeSync() {
  const theme = useUIStore((s) => s.theme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  return null
}
