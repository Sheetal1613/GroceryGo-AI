import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut, Settings, User } from 'lucide-react'
import { ROUTES } from '@/lib/constants'
import { useAuth } from '@/hooks/use-auth'
import { cn } from '@/lib/utils'
import shared from './layout.module.css'
import styles from './UserMenu.module.css'

export function UserMenu() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const { user, logout } = useAuth()

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

  const getInitials = (name: string) => {
    return name
      .trim()
      .split(/\s+/)
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  }

  const handleSignOut = () => {
    setOpen(false)
    logout()
    navigate('/login', { replace: true })
  }

  if (!user) {
    return null
  }

  const initials = getInitials(user.name)

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
          {initials}
        </span>

        <span className={styles.triggerText}>
          <span className={styles.name}>{user.name}</span>
          <span className={styles.email}>{user.email}</span>
        </span>
      </button>

      {open && (
        <div className={shared.dropdown} role="menu">
          <div className={shared.dropdownHeader}>
            <div className={shared.dropdownName}>{user.name}</div>
            <div className={shared.dropdownEmail}>{user.email}</div>
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