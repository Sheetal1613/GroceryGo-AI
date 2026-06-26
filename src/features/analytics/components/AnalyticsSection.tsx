import type { ReactNode } from 'react'
import { Card, CardHeader } from '@/components/ui/Card'
import { cn } from '@/lib/utils'
import styles from '../Analytics.module.css'

type AnalyticsSectionProps = {
  title: string
  description: string
  contentClassName?: string
  children?: ReactNode
  className?: string
}

export function AnalyticsSection({
  title,
  description,
  contentClassName,
  children,
  className,
}: AnalyticsSectionProps) {
  return (
    <Card className={className}>
      <CardHeader title={title} description={description} />
      <div className={cn(styles.contentArea, contentClassName)}>
        {children}
      </div>
    </Card>
  )
}
