import type { ReactNode } from 'react'
import { ThemeSync } from '@/components/layout/ThemeSync'

type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <>
      <ThemeSync />
      {children}
    </>
  )
}
