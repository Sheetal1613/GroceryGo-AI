import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import styles from './Badge.module.css'

type BadgeVariant =
  | 'neutral'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger'

type BadgeProps = {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

export function Badge({
  children,
  variant = 'neutral',
  className,
}: BadgeProps) {
  return (
    <span className={cn(styles.badge, styles[variant], className)}>
      {children}
    </span>
  )
}
