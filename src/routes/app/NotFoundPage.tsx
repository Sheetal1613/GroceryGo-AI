import { Link } from 'react-router-dom'
import { ROUTES } from '@/lib/constants'
import styles from './NotFoundPage.module.css'

export default function NotFoundPage() {
  return (
    <div className={styles.root}>
      <h2 className={styles.code}>404</h2>
      <p className={styles.text}>Page not found</p>
      <Link to={ROUTES.dashboard} className={styles.link}>
        Back to Dashboard
      </Link>
    </div>
  )
}
