import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import styles from './Card.module.css'

type CardProps = {
  children: ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export function Card({ children, className, padding = 'md' }: CardProps) {
  return (
    <div className={cn(styles.card, styles[padding], className)}>{children}</div>
  )
}

type CardHeaderProps = {
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function CardHeader({
  title,
  description,
  action,
  className,
}: CardHeaderProps) {
  return (
    <div className={cn(styles.header, className)}>
      <div className={styles.headerText}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {action && <div className={styles.headerAction}>{action}</div>}
    </div>
  )
}
