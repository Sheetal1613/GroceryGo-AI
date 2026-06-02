import { cn } from '@/lib/utils'
import styles from './LoadingSkeleton.module.css'

type SkeletonProps = {
  className?: string
  variant?: 'text' | 'rounded' | 'circle'
}

export function Skeleton({ className, variant = 'text' }: SkeletonProps) {
  return (
    <div
      className={cn(styles.skeleton, styles[variant], className)}
      aria-hidden
    />
  )
}

type SkeletonBlockProps = {
  lines?: number
  className?: string
}

export function SkeletonBlock({ lines = 3, className }: SkeletonBlockProps) {
  return (
    <div className={cn(styles.block, className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(styles.line, i === lines - 1 && styles.lineShort)}
        />
      ))}
    </div>
  )
}
