import { useEffect } from 'react'
import { X } from 'lucide-react'
import { APP_NAME } from '@/lib/constants'
import { useIsMobile } from '@/hooks/use-media-query'
import { useUIStore } from '@/stores/ui-store'
import { SidebarNav } from './SidebarNav'
import shared from './layout.module.css'
import styles from './MobileNav.module.css'

export function MobileNav() {
  const mobileNavOpen = useUIStore((s) => s.mobileNavOpen)
  const setMobileNavOpen = useUIStore((s) => s.setMobileNavOpen)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (!mobileNavOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileNavOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [mobileNavOpen, setMobileNavOpen])

  useEffect(() => {
    if (!isMobile && mobileNavOpen) {
      setMobileNavOpen(false)
    }
  }, [isMobile, mobileNavOpen, setMobileNavOpen])

  if (!mobileNavOpen) return null

  return (
    <div className={styles.root} role="dialog" aria-modal="true" aria-label="Mobile navigation">
      <button
        type="button"
        className={styles.backdrop}
        onClick={() => setMobileNavOpen(false)}
        aria-label="Close navigation"
      />
      <aside className={styles.drawer}>
        <div className={styles.header}>
          <div className={shared.logo}>
            <span className={shared.logoMark} aria-hidden>
              G
            </span>
            <span>{APP_NAME}</span>
          </div>
          <button
            type="button"
            className={shared.iconButton}
            onClick={() => setMobileNavOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} aria-hidden />
          </button>
        </div>
        <SidebarNav onNavigate={() => setMobileNavOpen(false)} collapsed={false} />
      </aside>
    </div>
  )
}
