import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import styles from './PageContainer.module.css'

type PageContainerProps = {
  children: ReactNode
  className?: string
}

export function PageContainer({ children, className }: PageContainerProps) {
  return <div className={cn(styles.container, className)}>{children}</div>
}
