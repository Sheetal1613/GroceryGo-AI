import { NavLink } from 'react-router-dom'
import { FOOTER_NAV, NAV_GROUPS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/stores/ui-store'
import shared from './layout.module.css'
import styles from './SidebarNav.module.css'

type SidebarNavProps = {
  onNavigate?: () => void
  collapsed?: boolean
}

export function SidebarNav({ onNavigate, collapsed = false }: SidebarNavProps) {
  const sidebarCollapsed = useUIStore((s) => s.sidebarCollapsed)
  const isCollapsed = collapsed ?? sidebarCollapsed

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      {NAV_GROUPS.map((group) => (
        <div key={group.title} className={styles.group}>
          {!isCollapsed && (
            <div className={shared.navGroupTitle}>{group.title}</div>
          )}
          <ul className={styles.list}>
            {group.items.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      cn(shared.navLink, isActive && styles.activeNav)
                    }
                    onClick={onNavigate}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon aria-hidden />
                    {!isCollapsed && (
                      <span className={shared.navLabel}>{item.label}</span>
                    )}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </div>
      ))}

      <div className={styles.footer}>
        {!isCollapsed && (
          <div className={shared.navGroupTitle}>Account</div>
        )}
        <ul className={styles.list}>
          {FOOTER_NAV.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                    className={({ isActive }) =>
                      cn(shared.navLink, isActive && styles.activeNav)
                    }
                  onClick={onNavigate}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon aria-hidden />
                  {!isCollapsed && (
                    <span className={shared.navLabel}>{item.label}</span>
                  )}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
