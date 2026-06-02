import { Link } from 'react-router-dom'
import styles from './AuthPage.module.css'

export default function ForgotPasswordPage() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Reset password</h1>
        <p className={styles.hint}>Password reset coming soon.</p>
        <Link to="/login" className={styles.button}>
          Back to login
        </Link>
      </div>
    </div>
  )
}
