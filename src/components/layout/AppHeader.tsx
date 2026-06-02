import { Link, useLocation } from 'react-router-dom'
import { Bell, Menu, Search } from 'lucide-react'
import { PAGE_TITLES, ROUTES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/stores/ui-store'
import { DarkModeToggle } from './DarkModeToggle'
import { UserMenu } from './UserMenu'
import shared from './layout.module.css'
import styles from './AppHeader.module.css'

function resolvePageTitle(pathname: string): string {
  if (pathname.startsWith(ROUTES.receipts) && pathname !== ROUTES.receipts) {
    return 'Receipt Detail'
  }
  const match = Object.entries(PAGE_TITLES).find(([path]) =>
    pathname.startsWith(path),
  )
  return match?.[1] ?? 'GroceryGo AI'
}

export function AppHeader() {
  const location = useLocation()
  const setMobileNavOpen = useUIStore((s) => s.setMobileNavOpen)
  const title = resolvePageTitle(location.pathname)

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button
          type="button"
          className={cn(shared.iconButton, styles.menuBtn)}
          onClick={() => setMobileNavOpen(true)}
          aria-label="Open navigation menu"
        >
          <Menu size={20} aria-hidden />
        </button>
        <div className={styles.titleBlock}>
          <h1 className={styles.title}>{title}</h1>
        </div>
      </div>

      <div className={styles.center}>
        <div className={styles.search}>
          <Search size={16} className={styles.searchIcon} aria-hidden />
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Search inventory, lists, receipts…"
            aria-label="Search"
          />
          <kbd className={styles.searchKbd} aria-hidden>
            ⌘K
          </kbd>
        </div>
      </div>

      <div className={styles.right}>
        <DarkModeToggle />
        <Link
          to={ROUTES.notifications}
          className={shared.iconButton}
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell size={18} aria-hidden />
        </Link>
        <UserMenu />
      </div>
    </header>
  )
}
