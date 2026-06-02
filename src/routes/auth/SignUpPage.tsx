import { Link } from 'react-router-dom'
import { APP_NAME, ROUTES } from '@/lib/constants'
import styles from './AuthPage.module.css'

export default function SignUpPage() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Sign up for {APP_NAME}</h1>
        <p className={styles.hint}>Auth UI coming soon.</p>
        <Link to={ROUTES.dashboard} className={styles.button}>
          Continue to app
        </Link>
        <p className={styles.footer}>
          <Link to="/login">Already have an account?</Link>
        </p>
      </div>
    </div>
  )
}
