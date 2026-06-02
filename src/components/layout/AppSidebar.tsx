import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { APP_NAME } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/stores/ui-store'
import { SidebarNav } from './SidebarNav'
import shared from './layout.module.css'
import styles from './AppSidebar.module.css'

export function AppSidebar() {
  const sidebarCollapsed = useUIStore((s) => s.sidebarCollapsed)
  const toggleSidebarCollapsed = useUIStore((s) => s.toggleSidebarCollapsed)

  return (
    <aside
      className={cn(styles.sidebar, sidebarCollapsed && styles.collapsed)}
      aria-label="Sidebar"
    >
      <div className={styles.header}>
        <div className={shared.logo}>
          <span className={shared.logoMark} aria-hidden>
            G
          </span>
          {!sidebarCollapsed && <span>{APP_NAME}</span>}
        </div>
        <button
          type="button"
          className={cn(shared.iconButton, styles.collapseBtn)}
          onClick={toggleSidebarCollapsed}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? (
            <PanelLeftOpen size={18} aria-hidden />
          ) : (
            <PanelLeftClose size={18} aria-hidden />
          )}
        </button>
      </div>

      <SidebarNav collapsed={sidebarCollapsed} />
    </aside>
  )
}
