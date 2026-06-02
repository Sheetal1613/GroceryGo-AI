import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut, Settings, User } from 'lucide-react'
import { MOCK_USER, ROUTES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import shared from './layout.module.css'
import styles from './UserMenu.module.css'

export function UserMenu() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const handleSignOut = () => {
    setOpen(false)
    navigate('/login')
  }

  return (
    <div className={styles.root} ref={containerRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="User menu"
      >
        <span className={styles.avatar} aria-hidden>
          {MOCK_USER.initials}
        </span>
        <span className={styles.triggerText}>
          <span className={styles.name}>{MOCK_USER.name}</span>
          <span className={styles.email}>{MOCK_USER.email}</span>
        </span>
      </button>

      {open && (
        <div className={shared.dropdown} role="menu">
          <div className={shared.dropdownHeader}>
            <div className={shared.dropdownName}>{MOCK_USER.name}</div>
            <div className={shared.dropdownEmail}>{MOCK_USER.email}</div>
          </div>
          <div className={shared.dropdownDivider} />
          <Link
            to={ROUTES.profile}
            className={shared.dropdownItem}
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            <User aria-hidden />
            Profile
          </Link>
          <Link
            to={ROUTES.settings}
            className={shared.dropdownItem}
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            <Settings aria-hidden />
            Settings
          </Link>
          <div className={shared.dropdownDivider} />
          <button
            type="button"
            className={cn(shared.dropdownItem, shared.dropdownDanger)}
            role="menuitem"
            onClick={handleSignOut}
          >
            <LogOut aria-hidden />
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}
