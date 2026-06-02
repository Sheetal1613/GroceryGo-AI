import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import styles from './FilterBar.module.css'

type FilterBarProps = {
  children: ReactNode
  className?: string
}

export function FilterBar({ children, className }: FilterBarProps) {
  return <div className={cn(styles.bar, className)}>{children}</div>
}

type FilterGroupProps = {
  label?: string
  children: ReactNode
}

export function FilterGroup({ label, children }: FilterGroupProps) {
  return (
    <div className={styles.group}>
      {label && <span className={styles.groupLabel}>{label}</span>}
      {children}
    </div>
  )
}
