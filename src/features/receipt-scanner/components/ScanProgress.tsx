import { Check, FileSearch, ScanLine, Upload } from 'lucide-react'
import { Card, CardHeader } from '@/components/ui/Card'
import type { ScanStep } from '../types'
import styles from './ScanProgress.module.css'

const STEPS: { key: ScanStep; label: string; icon: typeof Upload }[] = [
  { key: 'uploading', label: 'Upload', icon: Upload },
  { key: 'detecting', label: 'Detect', icon: FileSearch },
  { key: 'parsing', label: 'Parse', icon: ScanLine },
  { key: 'done', label: 'Done', icon: Check },
]

type ScanProgressProps = {
  progress: number
  currentStep: ScanStep
  statusLabel: string
  imageUrl?: string | null
}

export function ScanProgress({
  progress,
  currentStep,
  statusLabel,
  imageUrl,
}: ScanProgressProps) {
  const stepOrder = STEPS.findIndex((s) => s.key === currentStep)

  return (
    <Card className={styles.card}>
      <CardHeader
        title="Scanning receipt"
        description={statusLabel}
      />
      <div className={styles.body}>
        {imageUrl && (
          <div className={styles.thumbWrap}>
            <img src={imageUrl} alt="" className={styles.thumb} />
            <div className={styles.scanLine} aria-hidden />
          </div>
        )}
        <div className={styles.progressWrap}>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressBar}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className={styles.progressPct}>{Math.round(progress)}%</span>
        </div>
        <ol className={styles.steps}>
          {STEPS.map((step, i) => {
            const Icon = step.icon
            const isDone = i < stepOrder || currentStep === 'done'
            const isActive = step.key === currentStep && currentStep !== 'done'
            return (
              <li
                key={step.key}
                className={`${styles.step} ${isDone ? styles.stepDone : ''} ${isActive ? styles.stepActive : ''}`}
              >
                <span className={styles.stepIcon}>
                  <Icon size={16} aria-hidden />
                </span>
                <span className={styles.stepLabel}>{step.label}</span>
              </li>
            )
          })}
        </ol>
      </div>
    </Card>
  )
}
