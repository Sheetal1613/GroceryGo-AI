import { Link } from 'react-router-dom'
import { APP_NAME, ROUTES } from '@/lib/constants'
import styles from './LandingPage.module.css'

export default function LandingPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.logo}>{APP_NAME}</span>
        <div className={styles.links}>
          <Link to="/login" className={styles.link}>
            Log in
          </Link>
          <Link to={ROUTES.dashboard} className={styles.cta}>
            Open app
          </Link>
        </div>
      </header>
      <main className={styles.hero}>
        <h1 className={styles.title}>Smart grocery management, powered by AI</h1>
        <p className={styles.subtitle}>
          Track inventory, scan receipts, and shop smarter — all in one place.
        </p>
        <Link to={ROUTES.dashboard} className={styles.ctaLarge}>
          Get started
        </Link>
      </main>
    </div>
  )
}
